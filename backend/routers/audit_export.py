"""
Audit Trails, Quality Logs, Download Governance, and Export Router
"""

from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query, Response
from backend.services.audit_service import AuditService
from backend.services.search_service import SearchService
from backend.services.export_service import ExportService

router = APIRouter()


@router.get("/api/revision-history", tags=["Audit & Logs"])
def get_revision_history(indicator_id: Optional[str] = Query(None)):
    """Returns data version revision history snapshots."""
    return AuditService.get_revision_history(indicator_id)


@router.get("/api/validation-logs", tags=["Audit & Logs"])
def get_validation_logs(
    limit: int = Query(50, ge=1, le=200),
    status: Optional[str] = Query(None, description="Filter status (PASSED, FAILED, FLAGGED)")
):
    """Returns data quality validation logs."""
    return AuditService.get_validation_logs(limit, status)


@router.get("/api/update-logs", tags=["Audit & Logs"])
def get_update_logs(limit: int = Query(50, ge=1, le=200)):
    """Returns data ingestion and connector update logs."""
    return AuditService.get_update_logs(limit)


@router.post("/api/audit/download-log", tags=["Audit & Logs"])
def record_download_log(payload: Dict[str, Any]):
    """Records download audit log and quota tracking into backend database."""
    return AuditService.record_download_audit(payload)


@router.get("/api/audit/download-logs", tags=["Audit & Logs"])
def get_download_logs(limit: int = Query(50, ge=1, le=200)):
    """Returns download audit logs."""
    return AuditService.get_download_logs(limit)


@router.get("/api/download/{dataset_id}", tags=["Export & Download"])
def download_dataset(
    dataset_id: str,
    format: str = Query("xlsx", description="Format: xlsx atau csv"),
    email: Optional[str] = Query(None, description="Email pengguna untuk verifikasi unduh"),
    indicator_id: Optional[str] = Query(None),
    start_year: Optional[int] = Query(None),
    end_year: Optional[int] = Query(None)
):
    """
    Authorized multi-tab Excel (.xlsx) and RFC-4180 CSV export with independent provenance traceability.
    Generates Sheet 1: Data (with provenance_id), Sheet 2: Metadata, Sheet 3: Source & Provenance.
    """
    # 1. Access Governance Check (Backend Authorization Enforcement)
    perm = AuditService.check_download_permission(dataset_id=dataset_id, user_email=email)
    if not perm["allowed"]:
        raise HTTPException(
            status_code=403,
            detail={
                "message": perm["reason"],
                "access_status": perm.get("access_status"),
                "dataset_id": dataset_id,
                "requires_login": perm.get("requires_login", False),
                "original_url": perm.get("original_url")
            }
        )

    # 2. Query dataset metadata
    datasets = SearchService.get_datasets()
    dataset_meta = next((d for d in datasets if d["id"] == dataset_id), {
        "id": dataset_id,
        "name": dataset_id.replace("DS-", "").replace("-", " ").title(),
        "sector": "Ekonomi Nasional",
        "category": "Statistik Terpadu",
        "frequency": "Tahunan",
        "unit": "Standar Nasional"
    })

    # 3. Query all structured observations for dataset (full historical series)
    obs_res = SearchService.query_observations(
        indicator_id=indicator_id,
        start_year=start_year,
        end_year=end_year,
        limit=5000,
        sort_by="period",
        sort_order="ASC"
    )
    observations = obs_res.get("records", [])

    timeframe_label = f"{observations[0]['period']}-{observations[-1]['period']}" if observations else "ALL"
    dataset_title = dataset_meta.get("name") or dataset_id

    # 4. Generate File Stream
    file_fmt = format.lower()
    if file_fmt == "csv":
        file_bytes = ExportService.generate_csv_bytes(observations)
        media_type = "text/csv; charset=utf-8"
        filename = ExportService.generate_filename(dataset_title, timeframe_label, "csv")
    else:
        file_bytes = ExportService.generate_excel_bytes(dataset_meta, observations, observations)
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        filename = ExportService.generate_filename(dataset_title, timeframe_label, "xlsx")

    # 5. Log download audit
    AuditService.record_download_audit({
        "email": email or "guest-public@dewanekonomi.go.id",
        "download_type": f"DATASET_{file_fmt.upper()}",
        "variables_count": 1,
        "total_points": len(observations),
        "file_name": filename
    })

    return Response(
        content=file_bytes,
        media_type=media_type,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )
