"""
Weekly High-Frequency Observatory Router (2014 - 2026)
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Response
from backend.services.weekly_service import WeeklyService

router = APIRouter(tags=["Weekly High-Frequency Observatory (2014 - 2026)"])


@router.get("/api/weekly/institutions")
def get_weekly_institutions():
    """
    Returns list of government institutions and ministries with regular weekly data releases:
    1. Bank Indonesia (BI)
    2. Kementerian Keuangan RI (DJPb)
    3. Otoritas Jasa Keuangan (OJK)
    4. Badan Pangan Nasional (Bapanas)
    """
    return {
        "status": "SUCCESS",
        "total_institutions": len(WeeklyService.get_institutions()),
        "institutions": WeeklyService.get_institutions()
    }


@router.get("/api/weekly/matrix")
def get_weekly_matrix(
    institution_id: str = Query("ALL", description="ALL | BI | DJPB | OJK | BAPANAS"),
    view_mode: str = Query("annual", description="annual (2014-2026) | weekly (W01-W52)"),
    year: int = Query(2026, ge=2014, le=2026, description="Tahun untuk mode weekly"),
    q: Optional[str] = Query(None, description="Pencarian nama atau kode indikator")
):
    """
    Returns pivot table data matrix of weekly indicators across institutions.
    """
    try:
        return WeeklyService.get_weekly_matrix(
            institution_id=institution_id,
            view_mode=view_mode,
            year=year,
            q=q or ""
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/weekly/trend")
def get_weekly_trend(
    indicator_id: str = Query(..., description="Kode indikator mingguan (misal: BI_M0, OJK_IHSG_CLOSE)"),
    year: Optional[int] = Query(None, ge=2014, le=2026, description="Filter tahun spesifik (opsional)")
):
    """
    Returns chronological time series, WoW changes, median trend olahan, and descriptive stats for a weekly indicator.
    """
    try:
        return WeeklyService.get_weekly_trend(indicator_id=indicator_id, year=year)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/weekly/export")
def export_weekly_matrix(
    institution_id: str = Query("ALL", description="ALL | BI | DJPB | OJK | BAPANAS"),
    view_mode: str = Query("annual", description="annual | weekly"),
    year: int = Query(2026, ge=2014, le=2026),
    format: str = Query("xlsx", description="Format file: xlsx atau csv")
):
    """
    Downloads weekly data matrix in Excel (.xlsx) or CSV format.
    """
    clean_fmt = format.lower().strip()
    filename_base = f"INDOEKONOMI_WEEKLY_{institution_id}_{view_mode}_{year if view_mode == 'weekly' else '2014-2026'}"
    
    if clean_fmt == "csv":
        csv_text = WeeklyService.export_csv(institution_id=institution_id, view_mode=view_mode, year=year)
        return Response(
            content=csv_text,
            media_type="text/csv; charset=utf-8",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.csv"'}
        )
    else:
        excel_bytes = WeeklyService.export_excel(institution_id=institution_id, view_mode=view_mode, year=year)
        return Response(
            content=excel_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.xlsx"'}
        )
