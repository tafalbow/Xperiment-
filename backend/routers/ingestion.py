"""
Data Ingestion Pipeline Trigger & Batch Sandbox Router
"""

from fastapi import APIRouter, Query
from backend.models.schemas import IngestionBatchRequest
from backend.ingestion.pipeline import IngestionPipeline

router = APIRouter(tags=["Data Ingestion"])


@router.post("/api/ingestion/run")
def run_connector_ingestion(
    source_id: str = Query("SRC-BPS", description="ID Sumber resmi"),
    connector_type: str = Query("api", description="Tipe konektor: api, csv, pdf")
):
    """Executes ingestion connector pipeline with validation, versioning, and update logging."""
    return IngestionPipeline.run_connector_ingestion(source_id, connector_type)


@router.post("/api/ingestion/batch")
def ingest_custom_batch(payload: IngestionBatchRequest):
    """
    Ingests a custom batch of observation records into national repository with strict data governance validation.
    """
    records_dict = [r.dict() for r in payload.records]
    return IngestionPipeline.process_records(
        source_id=payload.source_id,
        records=records_dict,
        update_type=f"Batch Ingest ({payload.connector_type})"
    )
