"""
INDOEKONOMI data — Modular API Routers
Provides clean separation of concerns across analytical domain modules.
"""

from backend.routers.system import router as system_router
from backend.routers.search import router as search_router
from backend.routers.metadata import router as metadata_router
from backend.routers.lkpp import router as lkpp_router
from backend.routers.weekly import router as weekly_router
from backend.routers.custom_chart import router as custom_chart_router
from backend.routers.commodities import router as commodities_router
from backend.routers.agri_calendar import router as agri_calendar_router
from backend.routers.crosswalk import router as crosswalk_router
from backend.routers.audit_export import router as audit_export_router
from backend.routers.ingestion import router as ingestion_router

__all__ = [
    "system_router",
    "search_router",
    "metadata_router",
    "lkpp_router",
    "weekly_router",
    "custom_chart_router",
    "commodities_router",
    "agri_calendar_router",
    "crosswalk_router",
    "audit_export_router",
    "ingestion_router"
]
