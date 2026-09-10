"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
Strategic Enterprise FastAPI Application Entrypoint
==============================================================================
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.config import (
    APP_BRAND,
    APP_WEB_IDENTIFIER,
    APP_DOMAIN,
    APP_TITLE,
    APP_VERSION,
    DEMO_DATA_DISCLAIMER,
    STATIC_DIR
)
from backend.routers import (
    system_router,
    search_router,
    metadata_router,
    lkpp_router,
    weekly_router,
    custom_chart_router,
    commodities_router,
    agri_calendar_router,
    crosswalk_router,
    audit_export_router,
    ingestion_router
)

# Application Factory
app = FastAPI(
    title=f"{APP_BRAND} — {APP_WEB_IDENTIFIER}",
    description=f"{APP_TITLE} ({APP_DOMAIN}). Repositori Terpusat Data Sekunder Nasional Indonesia. {DEMO_DATA_DISCLAIMER}",
    version=APP_VERSION
)

# CORS middleware for development and deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------------------
# Modular Domain Routers
# ------------------------------------------------------------------------------
app.include_router(system_router)
app.include_router(search_router)
app.include_router(metadata_router)
app.include_router(lkpp_router)
app.include_router(weekly_router)
app.include_router(custom_chart_router)
app.include_router(commodities_router)
app.include_router(agri_calendar_router)
app.include_router(crosswalk_router)
app.include_router(audit_export_router)
app.include_router(ingestion_router)

# ------------------------------------------------------------------------------
# Frontend Static Files & SPA Fallback Serving
# ------------------------------------------------------------------------------
if os.path.exists(STATIC_DIR):
    @app.middleware("http")
    async def add_no_cache_header(request, call_next):
        response = await call_next(request)
        if request.url.path.startswith("/static") or request.url.path == "/" or request.url.path.endswith(".html"):
            response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
        return response

    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        if full_path.startswith("api/") or full_path == "api":
            raise HTTPException(status_code=404, detail=f"API endpoint '/{full_path}' not found.")
        file_path = STATIC_DIR / full_path
        if file_path.is_file():
            return FileResponse(file_path, headers={"Cache-Control": "no-cache, no-store, must-revalidate"})
        return FileResponse(STATIC_DIR / "index.html", headers={"Cache-Control": "no-cache, no-store, must-revalidate"})
