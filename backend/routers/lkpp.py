"""
LKPP Statutory Financial Statements Observatory Router (1990 - 2026)
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Response
from backend.services.lkpp_service import LKPPService

router = APIRouter(tags=["LKPP Financial Statements Observatory (1990 - 2026)"])


@router.get("/api/lkpp/tables")
def get_lkpp_tables():
    """
    Returns registry of 6 statutory LKPP financial statement tables and legal bases:
    1. LRA, 2. LPSAL, 3. Neraca, 4. LO, 5. LAK, 6. LPE
    """
    return {
        "status": "SUCCESS",
        "total_tables": len(LKPPService.TABLE_REGISTRY),
        "tables": LKPPService.TABLE_REGISTRY
    }


@router.get("/api/lkpp/matrix")
def get_lkpp_matrix(
    table_id: str = Query("LRA", description="Kode tabel LKPP: LRA, LPSAL, NERACA, LO, LAK, LPE"),
    start_year: int = Query(1990, ge=1990, le=2026, description="Tahun awal deret waktu (1990 - 2026)"),
    end_year: int = Query(2026, ge=1990, le=2026, description="Tahun akhir deret waktu (1990 - 2026)"),
    unit: str = Query("TRILLION", description="Satuan nilai: TRILLION (Rp T), BILLION (Rp M), MILLION (Rp Juta)"),
    q: Optional[str] = Query(None, description="Kata kunci pencarian akun/kelompok biaya")
):
    """
    Returns horizontal pivot data matrix where columns are years (1990 - 2026)
    and rows are standardized modern Bagan Akun Standar (BAS) cost groups.
    """
    try:
        return LKPPService.get_table_matrix(table_id, start_year, end_year, unit, q)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/lkpp/trend")
def get_lkpp_line_item_trend(
    table_id: str = Query("LRA", description="Kode tabel LKPP: LRA, LPSAL, NERACA, LO, LAK, LPE"),
    item_id: str = Query("EXP_PEGAWAI", description="ID atau Kode Akun kelompok biaya"),
    unit: str = Query("TRILLION", description="Satuan nilai: TRILLION, BILLION, MILLION")
):
    """
    Returns multi-year time-series trend data and analytics (CAGR, YoY %, peak value)
    for interactive Chart.js line graph and KPI modal.
    """
    try:
        return LKPPService.get_line_item_trend(table_id, item_id, unit)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/lkpp/glossary")
def get_lkpp_nomenclature_glossary():
    """
    Returns statutory crosswalk glossary tracking terminology evolution from 1990 to 2026
    across Dual Budgeting, Kas Menuju Akrual (CTA), and SAP Akrual Penuh.
    """
    return LKPPService.get_terminology_glossary()


@router.get("/api/lkpp/export")
def export_lkpp_matrix(
    table_id: str = Query("LRA", description="Kode tabel LKPP"),
    start_year: int = Query(1990, ge=1990, le=2026),
    end_year: int = Query(2026, ge=1990, le=2026),
    unit: str = Query("TRILLION", description="TRILLION | BILLION | MILLION"),
    format: str = Query("xlsx", description="Format file ekspor: xlsx atau csv")
):
    """
    Downloads full pivot data matrix as multi-sheet Excel (.xlsx) or CSV file.
    """
    clean_fmt = format.lower().strip()
    table_code = table_id.upper().strip()
    filename_base = f"INDOEKONOMI_LKPP_{table_code}_{start_year}-{end_year}_{unit}"
    
    if clean_fmt == "csv":
        csv_text = LKPPService.generate_csv_matrix(table_id, start_year, end_year, unit)
        return Response(
            content=csv_text,
            media_type="text/csv; charset=utf-8",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.csv"'}
        )
    else:
        excel_bytes = LKPPService.generate_excel_matrix(table_id, start_year, end_year, unit)
        return Response(
            content=excel_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.xlsx"'}
        )


# ==============================================================================
# FISCAL HEALTH DASHBOARD ENDPOINTS
# 10 Core KPIs, 3-Variable Comparison Engine, 7 Statutory Dimensions
# ==============================================================================
from backend.services.fiscal_health_service import FiscalHealthService


@router.get("/api/lkpp/fiscal-health/kpis")
def get_fiscal_health_core_kpis():
    """Returns the 10 Core Fiscal KPIs with 2026 figures, YoY, MoM, and policy impact notes."""
    kpis = FiscalHealthService.get_10_core_kpis()
    return {
        "status": "SUCCESS",
        "period": "APBN 2026 YTD",
        "total_kpis": len(kpis),
        "kpis": kpis
    }


@router.get("/api/lkpp/fiscal-health/dimensions")
def get_fiscal_health_dimensions(
    start_year: int = Query(1990, ge=1990, le=2026),
    end_year: int = Query(2026, ge=1990, le=2026)
):
    """
    Returns annual trend data (1990 - 2026 YTD) across all 7 dimensions
    along with exact calculation sources for on-hover display.
    """
    data = FiscalHealthService.get_all_dimensions_detail(start_year, end_year)
    return {
        "status": "SUCCESS",
        "total_dimensions": len(data["dimensions"]),
        **data
    }


@router.get("/api/lkpp/fiscal-health/comparison-variables")
def get_comparison_variables():
    """Returns catalog of all selectable variables for the comparison chart."""
    variables = FiscalHealthService.get_comparison_variables_list()
    return {
        "status": "SUCCESS",
        "total_variables": len(variables),
        "variables": variables
    }


@router.get("/api/lkpp/fiscal-health/comparison-data")
def get_comparison_data(
    vars: str = Query("fiscal_balance_gdp,debt_gdp,tax_ratio", description="Comma-separated IDs (max 3)"),
    start_year: int = Query(2014, ge=1990, le=2026),
    end_year: int = Query(2026, ge=1990, le=2026)
):
    """
    Returns multi-variable comparison chart dataset.
    Enforces minimum timeline of 12 years.
    """
    var_list = [v.strip() for v in vars.split(",") if v.strip()]
    data = FiscalHealthService.build_comparison_series(var_list, start_year, end_year)
    return {
        "status": "SUCCESS",
        **data
    }

