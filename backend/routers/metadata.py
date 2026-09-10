"""
Metadata Catalog, Release Schedule, Provenance Lineage, and Sources Router
"""

from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
from backend.services.metadata_service import MetadataService
from backend.services.sync_schedule_service import SyncScheduleService
from backend.database.connection import get_db

router = APIRouter()


@router.get("/api/metadata/catalog", tags=["Data Dictionary"])
def get_metadata_catalog():
    """Returns standardized 24-point metadata catalog for all indicators."""
    return MetadataService.get_all_metadata_catalog()


@router.get("/api/sync-schedule", tags=["Release Schedule & Sync Policy"])
def get_sync_schedule():
    """
    Returns official data synchronization policy and scheduled release calendar (Tanggal 8, 17, dan 28).
    Live real-time auto-updates are strictly disabled to ensure statutory audit compliance.
    """
    return SyncScheduleService.get_next_scheduled_release()


@router.get("/api/variables-inventory", tags=["Release Schedule & Sync Policy"])
def get_variables_inventory():
    """
    Returns comprehensive inventory of all data variables with their hierarchy level,
    source institution, canonical document, exact last updated date, and tri-monthly release cycle.
    """
    return SyncScheduleService.get_variables_inventory()


@router.get("/api/metadata/{indicator_id}", tags=["Data Dictionary"])
def get_indicator_metadata(indicator_id: str):
    """Returns comprehensive 24-point standardized metadata for a specific indicator."""
    meta = MetadataService.get_indicator_metadata(indicator_id)
    if not meta:
        raise HTTPException(status_code=404, detail=f"Metadata for indicator '{indicator_id}' not found.")
    return meta


@router.get("/api/provenance/{observation_id}", tags=["Data Governance & Provenance"])
def trace_provenance(observation_id: int):
    """
    Traces complete provenance lineage for a specific observation record:
    Observation -> Indicator -> Dataset -> Publication -> Source Institution -> Page/Table -> Retrieval Date -> Version History.
    """
    trace = MetadataService.trace_data_provenance(observation_id)
    if not trace:
        raise HTTPException(status_code=404, detail=f"Observation record ID {observation_id} not found.")
    return trace


@router.get("/api/sources", tags=["Source Registry"])
def get_sources_registry():
    """Returns official source registry list with institutions, types, update frequencies and methods."""
    with get_db() as conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM sources ORDER BY institution_name ASC")
        return [dict(r) for r in cur.fetchall()]
