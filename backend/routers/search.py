"""
Search, Datasets, Observations, and KPI Analytics Router
"""

from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query
from backend.models.schemas import (
    GlobalSearchResponse,
    DatasetResponse,
    KPISummaryResponse
)
from backend.services.search_service import SearchService

router = APIRouter()


@router.get("/api/search/global", response_model=GlobalSearchResponse, tags=["Search & Filtering"])
def global_search(
    q: str = Query(..., min_length=1, description="Kata kunci pencarian (dataset, indikator, publikasi, dokumen, institusi)"),
    limit: int = Query(15, ge=1, le=50)
):
    """
    Unified global search across 5 distinct entity types:
    1. Dataset, 2. Indicator, 3. Publication, 4. Source Document, 5. Institution
    """
    return SearchService.global_search(query=q, limit=limit)


@router.get("/api/datasets", response_model=List[DatasetResponse], tags=["Datasets"])
def get_datasets():
    """Returns registered analytical datasets with access governance and coverage information."""
    return SearchService.get_datasets()


@router.get("/api/filter-options", tags=["Search & Filtering"])
def get_filter_options():
    """Returns cascading multidimensional filter hierarchy and metadata."""
    return SearchService.get_filter_options()


@router.get("/api/observations", tags=["Observations"])
def query_observations(
    sector: Optional[str] = Query(None, description="Sektor data (misal: Fiskal & Keuangan Negara, Makroekonomi)"),
    category: Optional[str] = Query(None, description="Kategori dataset"),
    subcategory: Optional[str] = Query(None, description="Subkategori indikator"),
    indicator_id: Optional[str] = Query(None, description="ID Indikator spesifik"),
    start_year: Optional[int] = Query(None, description="Tahun awal deret waktu"),
    end_year: Optional[int] = Query(None, description="Tahun akhir deret waktu"),
    source_id: Optional[str] = Query(None, description="ID Lembaga sumber resmi"),
    status: Optional[str] = Query(None, description="Status data (Observed, Provisional, Revised, N/A)"),
    search_keyword: Optional[str] = Query(None, description="Kata kunci pencarian"),
    limit: int = Query(50, ge=1, le=500, description="Batas baris per halaman"),
    offset: int = Query(0, ge=0, description="Offset paginasi"),
    sort_by: str = Query("period", description="Kolom pengurutan (period, value, indicator_name, status)"),
    sort_order: str = Query("DESC", description="Arah pengurutan (ASC / DESC)")
):
    """
    Returns filtered national-level observations with sorting, pagination, and full citation.
    Strictly restricted to National scope (Indonesia).
    """
    return SearchService.query_observations(
        sector=sector,
        category=category,
        subcategory=subcategory,
        indicator_id=indicator_id,
        start_year=start_year,
        end_year=end_year,
        source_id=source_id,
        status=status,
        search_keyword=search_keyword,
        limit=limit,
        offset=offset,
        sort_by=sort_by,
        sort_order=sort_order
    )


@router.get("/api/kpi/{indicator_id}", response_model=KPISummaryResponse, tags=["Analytics & KPIs"])
def get_kpi_summary(indicator_id: str):
    """
    Calculates strictly descriptive KPIs for a given national indicator.
    Prohibits predictive surplus/deficit where irrelevant.
    """
    kpi = SearchService.get_descriptive_kpi(indicator_id)
    if not kpi:
        raise HTTPException(status_code=404, detail=f"Indicator '{indicator_id}' not found.")
    return kpi
