"""
Commodity Tracking, Balance, and Spatial Distribution Router
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from backend.services.commodity_service import CommodityService

router = APIRouter(tags=["Commodity Tracking"])


@router.get("/api/commodities/categories")
def get_commodity_categories():
    """
    Returns structured divisions, groups, HS chapters, APBN/LKPP categories, and summary metrics for all commodities.
    """
    return CommodityService.get_categories_structure()


@router.get("/api/commodities/balance")
def get_commodity_balance(
    commodity_id: str = Query("COM-AGRI-001-BERAS", description="Unique Commodity ID"),
    start_year: int = Query(1990, ge=1990, le=2035),
    end_year: int = Query(2026, ge=1990, le=2035)
):
    """
    Returns detailed time-series balance (Production, Consumption, Import, Export, SSR, IDR), KPIs, and HS/APBN mapping (1990-2026).
    """
    balance = CommodityService.get_commodity_balance(commodity_id, start_year, end_year)
    if not balance:
        raise HTTPException(status_code=404, detail=f"Commodity with ID '{commodity_id}' not found.")
    return balance


@router.get("/api/commodities/matrix")
def get_commodity_matrix(
    division: Optional[str] = Query(None, description="PERTANIAN_PETERNAKAN or HASIL_BUMI"),
    group: Optional[str] = Query(None, description="Group ID filter"),
    hs_chapter: Optional[str] = Query(None, description="HS Chapter filter e.g. 'HS 10'"),
    apbn_category: Optional[str] = Query(None, description="LKPP/APBN classification category"),
    year: str = Query("2024", description="Reference year (1990-2026)")
):
    """
    Returns comparative matrix of all commodities for benchmarking with HS codes and APBN classifications.
    """
    return CommodityService.get_matrix_overview(division, group, hs_chapter, apbn_category, year)


@router.get("/api/commodities/spatial-distribution", tags=["Commodity Tracking & GeoMap"])
def get_commodity_spatial_distribution(
    commodity_id: str = Query("COM-MINE-001-BATUBARA", description="Unique Commodity ID"),
    variable: str = Query("PRODUKSI_TERBANYAK", description="Variable: PRODUKSI_TERBANYAK, PNBP_APBN, TITIK_EKSPOR, SMELTER_HILIR")
):
    """
    Returns spatial GeoMap points, top regional producers, PNBP APBN contribution by region, and export terminals.
    """
    spatial = CommodityService.get_spatial_distribution(commodity_id, variable)
    if not spatial:
        raise HTTPException(status_code=404, detail=f"Spatial data for commodity '{commodity_id}' not found.")
    return spatial
