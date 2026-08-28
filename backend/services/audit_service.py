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
