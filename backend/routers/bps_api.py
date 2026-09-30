"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
BPS Web API Official Router (Badan Pusat Statistik RI)
==============================================================================
Provides endpoints for live connection verification, BRS press release feeds,
direct variable inspection, and on-demand synchronization.
==============================================================================
"""

from typing import Optional, Dict, Any, List
from fastapi import APIRouter, HTTPException, Query
from backend.services.bps_api_service import BpsApiService

router = APIRouter(prefix="/api/bps", tags=["BPS Web API Resmi"])


@router.get("/status")
def get_bps_status(check_live: bool = Query(False, description="Uji koneksi langsung ke server BPS")):
    """
    Returns connection and authentication status with the official BPS Web API.
    """
    try:
        return BpsApiService.check_connection(force=check_live)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/press-releases")
def get_bps_press_releases(
    limit: int = Query(10, ge=1, le=50, description="Jumlah rilis BRS yang ditampilkan"),
    page: int = Query(1, ge=1, description="Nomor halaman"),
    refresh: bool = Query(False, description="Paksa refresh dari server BPS")
):
    """
    Returns the latest official BPS Press Releases (Berita Resmi Statistik / BRS).
    """
    try:
        items = BpsApiService.fetch_press_releases(limit=limit, page=page, force_refresh=refresh)
        return {
            "status": "SUCCESS",
            "source": "Badan Pusat Statistik Republik Indonesia (BPS RI)",
            "api_key_authenticated": True,
            "total_items": len(items),
            "page": page,
            "press_releases": items,
            "items": items
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/data/{var_id}")
def get_bps_variable_data(
    var_id: int,
    years: Optional[str] = Query(None, description="Daftar tahun dipisah koma, contoh: 2020,2021,2022,2023,2024,2025,2026"),
    refresh: bool = Query(False, description="Paksa pembaruan data dari BPS API")
):
    """
    Queries and decodes official BPS time-series data points for a specific variable ID.
    """
    try:
        year_list = None
        if years:
            year_list = [int(y.strip()) for y in years.split(",") if y.strip().isdigit()]
        return BpsApiService.fetch_variable_data(var_id=var_id, years=year_list, force_refresh=refresh)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/sync")
def get_bps_sync_status():
    """
    Returns current sync status and cache metadata for BPS Web API.
    """
    try:
        return BpsApiService.get_sync_status()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/sync")
def trigger_bps_sync():
    """
    Performs on-demand synchronization of core macro & BPS indicators directly from BPS Web API.
    """
    try:
        result = BpsApiService.sync_all_indicators()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

