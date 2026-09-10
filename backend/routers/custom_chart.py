"""
Custom Chart Studio & Contextual Driver Analysis Router (1990 - 2026)
"""

from fastapi import APIRouter, HTTPException, Query
from backend.services.custom_chart_service import custom_chart_service

router = APIRouter(tags=["Custom Chart Studio & Contextual Driver"])


@router.get("/api/custom-chart/variables")
def get_custom_chart_variables():
    """
    Returns all selectable indicators from 9 Trend Keuangan Negara tables + Weekly indicators,
    including table tags, units, and default visualization configurations.
    """
    variables = custom_chart_service.get_all_variables()
    return {
        "status": "SUCCESS",
        "total_variables": len(variables),
        "variables": variables
    }


@router.get("/api/custom-chart/series")
def get_custom_chart_series(
    variable_id: str = Query(..., description="ID variabel (misal: LRA__REV_TOTAL, APBN__APBN_REV, WEEKLY__BI_M0)"),
    transformation: str = Query("RAW", description="Transformasi hitungan: RAW, YOY, AVG_3Y, BASE_100"),
    start_year: int = Query(1990, ge=1990, le=2026, description="Tahun awal"),
    end_year: int = Query(2026, ge=1990, le=2026, description="Tahun akhir")
):
    """
    Computes time-series data with requested mathematical transformation:
    - RAW: Nilai asli nominal
    - YOY: Pertumbuhan tahunan YoY (%)
    - AVG_3Y: Rata-rata bergerak 3 tahun (3-Year Moving Average)
    - BASE_100: Normalisasi indeks dasar 100
    """
    try:
        return custom_chart_service.calculate_series(
            variable_id=variable_id,
            transformation=transformation,
            start_year=start_year,
            end_year=end_year
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/custom-chart/driver")
def get_custom_chart_driver(
    year: int = Query(2020, ge=1990, le=2026, description="Tahun yang disorot oleh pointer pengguna"),
    variable_ids: str = Query(..., description="Daftar ID variabel yang dipisahkan koma (maksimal 5 variabel)")
):
    """
    Retrieves grounded contextual driver intelligence explaining why active variables moved YoY
    from the previous year, backed by statutory audit documents and official public records.
    """
    try:
        v_ids = [vid.strip() for vid in variable_ids.split(",") if vid.strip()][:5]
        return custom_chart_service.get_contextual_driver(year=year, variable_ids=v_ids)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
