"""
System Health & Status Router
"""

from typing import Optional
from fastapi import APIRouter, Query
from backend.config import (
    APP_BRAND,
    APP_WEB_IDENTIFIER,
    APP_DOMAIN,
    APP_TITLE,
    APP_SUBTITLE,
    APP_VERSION,
    DEMO_DATA_DISCLAIMER,
)
from backend.services.search_service import SearchService
from backend.services.rolling_kpi_service import RollingKPIService
from backend.services.news_theory_service import NewsTheoryService

router = APIRouter(tags=["System"])


@router.get("/api/health")
def health_check():
    """Health check endpoint and system status with lightweight metrics."""
    metrics = SearchService.get_system_metrics()
    return {
        "status": "HEALTHY",
        "app_name": APP_TITLE,
        "brand": APP_BRAND,
        "web_identifier": APP_WEB_IDENTIFIER,
        "domain": APP_DOMAIN,
        "subtitle": APP_SUBTITLE,
        "version": APP_VERSION,
        "geographic_scope": "Indonesia / National",
        "total_observations": metrics["total_observations"],
        "total_indicators": metrics["total_indicators"],
        "total_datasets": metrics["total_datasets"],
        "disclaimer": DEMO_DATA_DISCLAIMER
    }


@router.get("/api/rolling-kpi")
def get_rolling_kpis():
    """Returns 8 key high-frequency indicators updated every 3 days."""
    return RollingKPIService.get_rolling_kpis()


@router.get("/api/news-theory")
def get_news_and_theories(
    category_id: Optional[str] = Query(None, description="Filter kategori berita"),
    search: Optional[str] = Query(None, description="Kata kunci pencarian berita atau teori ekonomi")
):
    """Returns Top 3 News across 9 categories with official links and related economic theories."""
    return NewsTheoryService.get_news_and_theories(category_id=category_id, search=search)

