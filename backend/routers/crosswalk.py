"""
Classification Crosswalk, Contextual Regional Drivers, and Harmonization Router
"""

from typing import Optional
from fastapi import APIRouter, Query
from backend.models.schemas import ClassificationDocumentResponse
from backend.services.crosswalk_service import CrosswalkService
from backend.services.audit_service import AuditService

router = APIRouter()


@router.get("/api/contextual-drivers", tags=["Contextual GIS"])
def get_contextual_drivers(
    indicator_id: Optional[str] = Query(None, description="ID Indikator"),
    period: Optional[str] = Query(None, description="Periode data (misal: 2023)")
):
    """
    Retrieves contextual driver notes citing specific provinces from official publications.
    Note: These are explanatory notes only, NOT provincial observation records.
    """
    return AuditService.get_contextual_drivers(indicator_id, period)


@router.get("/api/crosswalk", tags=["Classification Crosswalk"])
def get_classification_crosswalk(sector: Optional[str] = Query(None)):
    """
    Returns harmonization crosswalk rules bridging historical classifications (e.g. pre-2005 APBN)
    to standardized national modern classifications.
    """
    return CrosswalkService.get_all_crosswalk_rules(sector)


@router.get("/api/lkpp/financial-statements", tags=["Classification Crosswalk & LKPP Statements"])
def get_lkpp_financial_statements(
    statement_type: str = Query("ALL", description="Tipe Laporan: ALL, LRA_PENDAPATAN, NERACA, ARUS_KAS"),
    year: int = Query(2010, description="Tahun Anggaran LKPP Audited")
):
    """
    Returns official LKPP Audited financial statement tables:
    1. LRA Pendapatan Pemerintah Pusat
    2. Neraca Pemerintah Pusat (Audited BPK)
    3. Laporan Arus Kas (LAK Audited BPK)
    and consolidated modern BAS account crosswalk rules.
    """
    return CrosswalkService.get_lkpp_financial_statements(statement_type, year)


@router.get("/api/crosswalk/document", response_model=ClassificationDocumentResponse, tags=["Classification Crosswalk"])
def get_classification_evolution_document():
    """
    Returns full statutory document of historical classification changes (Section 13 requirement).
    Accessible via the clickable info link in dataset headers.
    """
    return CrosswalkService.get_classification_evolution_document()
