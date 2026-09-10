"""
System Health & Status Router
"""

from fastapi import APIRouter
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
