import sqlite3
from typing import Dict, Any, List, Optional
from backend.database.connection import get_db

class AuditService:
    """Manages update logs, validation logs, data revision versions, and contextual driver notes."""

    @staticmethod
    def get_contextual_drivers(indicator_id: Optional[str] = None, period: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Retrieves contextual explanatory driver notes (provincial mentions in official documents).
        Note: These are explanatory notes only, NOT provincial observation database.
        """
        with get_db() as conn:
            cur = conn.cursor()
            conditions = []
            params = []

            if indicator_id:
                conditions.append("cd.indicator_id = ?")
                params.append(indicator_id)
            if period:
                conditions.append("cd.period = ?")
                params.append(period)

            where_clause = " WHERE " + " AND ".join(conditions) if conditions else ""

            cur.execute(f"""
                SELECT 
                    cd.id,
                    cd.indicator_id,
                    i.name as indicator_name,
                    cd.period,
                    cd.province_name,
                    cd.province_code,
                    cd.geo_level,
                    cd.geo_target_name,
                    cd.latitude,
                    cd.longitude,
                    cd.zoom_level,
                    cd.driver_role,
                    cd.explanation,
                    cd.page_reference,
                    cd.table_reference,
                    p.id as publication_id,
                    p.publication_title,
                    s.institution_name as source_name,
                    cd.created_at
                FROM contextual_driver_information cd
                JOIN indicators i ON cd.indicator_id = i.id
                JOIN publications p ON cd.publication_id = p.id
                JOIN sources s ON cd.source_id = s.id
                {where_clause}
                ORDER BY cd.period DESC, cd.province_name ASC
            """, params)
            return [dict(r) for r in cur.fetchall()]

    @staticmethod
    def get_validation_logs(limit: int = 50, status_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        """Retrieves data quality validation logs."""
        with get_db() as conn:
            cur = conn.cursor()
            if status_filter:
                cur.execute("""
                    SELECT * FROM validation_logs
                    WHERE status = ?
                    ORDER BY checked_at DESC
                    LIMIT ?
                """, (status_filter, limit))
            else:
                cur.execute("""
                    SELECT * FROM validation_logs
                    ORDER BY checked_at DESC
                    LIMIT ?
                """, (limit,))
            return [dict(r) for r in cur.fetchall()]

    @staticmethod
    def get_update_logs(limit: int = 50) -> List[Dict[str, Any]]:
        """Retrieves automated and manual data ingestion update logs."""
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT ul.*, s.institution_name, s.dataset_name
                FROM update_logs ul
                JOIN sources s ON ul.source_id = s.id
                ORDER BY ul.timestamp DESC
                LIMIT ?
            """, (limit,))
            return [dict(r) for r in cur.fetchall()]

    @staticmethod
    def get_revision_history(indicator_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """Retrieves version revision audit trail."""
        with get_db() as conn:
            cur = conn.cursor()
            if indicator_id:
                cur.execute("""
                    SELECT dv.*, i.name as indicator_name, p.publication_title
                    FROM data_versions dv
                    JOIN indicators i ON dv.indicator_id = i.id
                    JOIN publications p ON dv.revised_by_publication_id = p.id
                    WHERE dv.indicator_id = ?
                    ORDER BY dv.revision_date DESC, dv.version_number DESC
                """, (indicator_id,))
            else:
                cur.execute("""
                    SELECT dv.*, i.name as indicator_name, p.publication_title
                    FROM data_versions dv
                    JOIN indicators i ON dv.indicator_id = i.id
                    JOIN publications p ON dv.revised_by_publication_id = p.id
                    ORDER BY dv.revision_date DESC, dv.version_number DESC
                    LIMIT 100
                """)
            return [dict(r) for r in cur.fetchall()]

    @staticmethod
    def record_download_audit(payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Records data download audit trail and enforces backend quota recording:
        Max 3x per session, Max 5x per day. Sole Admin: lubis.tania@dewanekonomi.go.id (Unlimited).
        """
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("""
                CREATE TABLE IF NOT EXISTS download_audit_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL,
                    is_admin INTEGER NOT NULL DEFAULT 0,
                    download_type TEXT NOT NULL,
                    variables_count INTEGER DEFAULT 1,
                    total_points INTEGER DEFAULT 0,
                    session_count INTEGER DEFAULT 1,
                    daily_count INTEGER DEFAULT 1,
                    file_name TEXT,
                    download_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            email = (payload.get("email") or "lubis.tania@dewanekonomi.go.id").strip().lower()
            is_admin = 1 if email == "lubis.tania@dewanekonomi.go.id" else 0
            
            cur.execute("""
                INSERT INTO download_audit_logs (
                    email, is_admin, download_type, variables_count, total_points, session_count, daily_count, file_name
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                email,
                is_admin,
                payload.get("download_type", "CHART_SERIES_EXPORT"),
                payload.get("variables_count", 1),
                payload.get("total_points", 0),
                payload.get("session_count", 1),
                payload.get("daily_count", 1),
                payload.get("file_name", "")
            ))
            conn.commit()
            return {"status": "RECORDED", "log_id": cur.lastrowid, "is_admin": bool(is_admin)}

    @staticmethod
    def get_download_logs(limit: int = 50) -> List[Dict[str, Any]]:
        """Retrieves download audit logs for governance oversight."""
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("""
                CREATE TABLE IF NOT EXISTS download_audit_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL,
                    is_admin INTEGER NOT NULL DEFAULT 0,
                    download_type TEXT NOT NULL,
                    variables_count INTEGER DEFAULT 1,
                    total_points INTEGER DEFAULT 0,
                    session_count INTEGER DEFAULT 1,
                    daily_count INTEGER DEFAULT 1,
                    file_name TEXT,
                    download_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            cur.execute("SELECT * FROM download_audit_logs ORDER BY download_timestamp DESC LIMIT ?", (limit,))
            return [dict(r) for r in cur.fetchall()]

    @staticmethod
    def check_download_permission(dataset_id: str, user_email: Optional[str] = None) -> Dict[str, Any]:
        """
        Enforces backend access governance (Rules 10, 11, 12, Section 27-30).
        Evaluates dataset-level access permissions before allowing data stream generation.
        """
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    d.id, d.name, d.access_status, d.download_allowed, d.download_requires_login,
                    s.source_url
                FROM datasets d
                LEFT JOIN indicators i ON i.dataset_id = d.id
                LEFT JOIN metadata m ON m.indicator_id = i.id
                LEFT JOIN publications p ON p.publication_title = m.publication_document_name
                LEFT JOIN sources s ON p.source_id = s.id
                WHERE d.id = ?
                LIMIT 1
            """, (dataset_id,))
            row = cur.fetchone()

            if not row:
                # If dataset not directly found by id, allow standard public download
                return {"allowed": True, "access_status": "PUBLIC_DOWNLOAD_OPEN", "reason": "Authorized"}

            status = row["access_status"] or "PUBLIC_DOWNLOAD_OPEN"
            download_allowed = bool(row["download_allowed"])
            requires_login = bool(row["download_requires_login"])

            # Rule 10: Discoverability != Downloadability
            if not download_allowed or status in ("PUBLIC_VIEW_ONLY", "METADATA_ONLY", "RESTRICTED", "UNDER_REVIEW", "ARCHIVED"):
                return {
                    "allowed": False,
                    "access_status": status,
                    "reason": f"Unduh data dilarang oleh regulasi statutori ({status}). Data hanya dapat diinspeksi secara visual.",
                    "dataset_name": row["name"]
                }

            if status == "LINK_TO_ORIGINAL_ONLY":
                return {
                    "allowed": False,
                    "access_status": status,
                    "reason": "Data ini hanya dapat diunduh langsung melalui repositori resmi instansi penerbit.",
                    "dataset_name": row["name"],
                    "original_url": row["source_url"] or "https://www.bps.go.id"
                }

            if (requires_login or status == "PUBLIC_DOWNLOAD_AFTER_LOGIN") and not user_email:
                return {
                    "allowed": False,
                    "access_status": status,
                    "reason": "Unduh dataset ini memerlukan verifikasi sesi login resmi terdaftar.",
                    "dataset_name": row["name"],
                    "requires_login": True
                }

            return {
                "allowed": True,
                "access_status": status,
                "reason": "Authorized for export",
                "dataset_name": row["name"]
            }
