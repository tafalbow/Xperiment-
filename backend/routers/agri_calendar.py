"""
Agricultural Calendar & Regency Crop GIS Recommendations Router
"""

from typing import Optional
from fastapi import APIRouter, Query
from backend.services.agri_calendar_service import AgriCalendarService

router = APIRouter(tags=["Agricultural Calendar"])


@router.get("/api/agricultural-calendar")
def get_agricultural_calendar(
    commodity_id: Optional[str] = Query(None, description="Filter ID Komoditas"),
    crop_category: Optional[str] = Query(None, description="Filter Kategori Tanaman"),
    month: Optional[int] = Query(None, ge=1, le=12, description="Bulan (1-12)")
):
    """
    Returns monthly national agricultural calendar matrix: planting seasons (MT 1 / MT 2),
    harvesting peaks (panen raya), lean seasons (paceklik), regional centers, and agroclimatic contexts.
    """
    return AgriCalendarService.get_calendar_matrix(commodity_id, crop_category, month)


@router.get("/api/agricultural-calendar/summary")
def get_agricultural_calendar_summary():
    """Returns high-level summary and seasonal highlights for the Agricultural Calendar tab."""
    return AgriCalendarService.get_calendar_summary()


@router.get("/api/agricultural-calendar/regencies")
def get_agricultural_calendar_regencies(
    commodity_id: Optional[str] = Query("JAGUNG", description="Filter bahan baku komoditas: JAGUNG, PADI_BERAS, CABAI_RAWIT, BAWANG_MERAH, KEDELAI, BAWANG_PUTIH, KELAPA_SAWIT, TEBU, UBI_KAYU, KOPI"),
    month: Optional[int] = Query(9, ge=1, le=12, description="Bulan penanaman (1-12, default 9/September)"),
    status: Optional[str] = Query(None, description="Filter status rekomendasi: RECOMMENDED_PRIME, RECOMMENDED_CONDITIONAL, GROWING, HARVESTING"),
    island: Optional[str] = Query(None, description="Filter pulau: JAWA, SUMATERA, SULAWESI, BALI_NUSA_TENGGARA, KALIMANTAN, MALUKU_PAPUA")
):
    """
    Returns GIS regency-level crop planting recommendations across Indonesia for the
    selected commodity and planting month, including suitability scores, potential acreage (Ha),
    varieties, and projected harvest windows.
    """
    return AgriCalendarService.get_regency_planting_recommendations(commodity_id, month, status, island)
