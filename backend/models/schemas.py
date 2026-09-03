from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field

# 1. Source Registry Models
class SourceBase(BaseModel):
    id: str
    institution_name: str
    institution_type: str
    dataset_name: str
    publication_name: str
    source_url: str
    source_type: str
    frequency: str
    geographic_scope: str = "Indonesia / National"
    last_publication_date: Optional[str] = None
    last_retrieval_date: Optional[str] = None
    last_successful_update: Optional[str] = None
    update_method: str
    data_owner: str
    status: str = "Active"
    notes: Optional[str] = None

class SourceResponse(SourceBase):
    pass

# 1.1 Institution Models
class InstitutionResponse(BaseModel):
    id: str
    code: str
    name: str
    short_name: str
    institution_type: str
    website_url: str
    contact_email: Optional[str] = None

# 1.2 Source Document Models
class SourceDocumentResponse(BaseModel):
    id: str
    publication_id: str
    document_title: str
    document_type: str
    edition: Optional[str] = None
    file_type: str
    file_url: str
    access_status: str = "PUBLIC_DOWNLOAD_OPEN"
    source_page_count: Optional[int] = None

# 2. Publication Models
class PublicationBase(BaseModel):
    id: str
    source_id: str
    publication_title: str
    document_number: Optional[str] = None
    series_name: Optional[str] = None
    publication_date: str
    edition_period: str
    document_url: str
    retrieval_date: str

class PublicationResponse(PublicationBase):
    pass

# 3. Dataset & Indicator Models
class DatasetResponse(BaseModel):
    id: str
    code: str
    name: str
    sector: str
    category: str
    description: Optional[str] = None
    access_status: str = "PUBLIC_DOWNLOAD_OPEN"
    download_allowed: bool = True
    download_requires_login: bool = False
    license_type: Optional[str] = "Government Open Data (Pemerintah RI)"
    access_notes: Optional[str] = None
    latest_period: Optional[str] = None
    latest_value: Optional[float] = None
    latest_status: Optional[str] = None
    frequency: Optional[str] = "Tahunan"
    unit: Optional[str] = None
    coverage: Optional[str] = "Indonesia / National"

class IndicatorResponse(BaseModel):
    id: str
    dataset_id: str
    unique_variable_code: str
    name: str
    unit: str
    frequency: str
    default_aggregation: str
    sector: Optional[str] = None
    category: Optional[str] = None
    source_name: Optional[str] = None

# 4. Standardized 24-Attribute Metadata Model
class MetadataResponse(BaseModel):
    indicator_id: str
    unique_variable_code: Optional[str] = None
    indicator_name: Optional[str] = None
    definition: str
    sector: str
    category: str
    subcategory: str
    source_data: str
    publishing_institution: str
    publication_document_name: str
    data_period_coverage: str
    frequency: str
    geographic_scope: str = "Indonesia / National"
    unit: str
    methodology: str
    calculation_formula: Optional[str] = None
    publication_date: Optional[str] = None
    retrieval_date: Optional[str] = None
    last_updated_date: Optional[str] = None
    data_status_policy: str
    source_url: str
    reference_page_table: Optional[str] = None
    methodology_notes: Optional[str] = None
    revision_notes: Optional[str] = None
    data_limitations: Optional[str] = None

class ObservationItem(BaseModel):
    id: Optional[int] = None
    indicator_id: str
    indicator_name: Optional[str] = None
    unique_variable_code: Optional[str] = None
    sector: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    period: str
    period_type: str
    value: Optional[float] = None
    unit: str
    status: str
    geography: str = "Indonesia"
    publication_id: str
    publication_title: Optional[str] = None
    document_number: Optional[str] = None
    document_url: Optional[str] = None
    publication_date: Optional[str] = None
    edition_period: Optional[str] = None
    source_id: Optional[str] = None
    source_institution: Optional[str] = None
    source_url: Optional[str] = None
    data_owner: Optional[str] = None
    page_reference: Optional[str] = None
    version_id: int = 1
    is_current: int = 1
    provenance_id: Optional[str] = None
    extraction_method: Optional[str] = None
    transformation_status: Optional[str] = None
    notes: Optional[str] = None
    updated_at: Optional[str] = None

class ObservationQueryFilter(BaseModel):
    sector: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    indicator_id: Optional[str] = None
    start_year: Optional[int] = None
    end_year: Optional[int] = None
    source_id: Optional[str] = None
    status: Optional[str] = None
    search_keyword: Optional[str] = None
    limit: int = 50
    offset: int = 0
    sort_by: str = "period"
    sort_order: str = "DESC"

class ObservationListResponse(BaseModel):
    total_records: int
    page: int
    page_size: int
    total_pages: int
    records: List[ObservationItem]
    disclaimer: str = "DEMO DATA — NOT OFFICIAL DATA"

# 6. Descriptive KPI Model (No predictive Surplus/Deficit)
class KPISummaryResponse(BaseModel):
    indicator_id: str
    indicator_name: str
    unit: str
    latest_period: Optional[str] = None
    latest_value: Optional[float] = None
    latest_status: Optional[str] = None
    previous_period: Optional[str] = None
    previous_value: Optional[float] = None
    yoy_change_pct: Optional[float] = None
    yoy_change_abs: Optional[float] = None
    highest_value: Optional[float] = None
    highest_period: Optional[str] = None
    lowest_value: Optional[float] = None
    lowest_period: Optional[str] = None
    national_mean: Optional[float] = None
    total_observed_periods: int = 0
    missing_periods_count: int = 0

# 7. Contextual Driver Information (Explanatory GIS notes)
class ContextualDriverItem(BaseModel):
    id: int
    indicator_id: str
    indicator_name: Optional[str] = None
    period: str
    province_name: str
    province_code: str
    driver_role: str
    explanation: str
    publication_id: str
    publication_title: Optional[str] = None
    page_reference: Optional[str] = None
    table_reference: Optional[str] = None
    source_name: Optional[str] = None
    created_at: Optional[str] = None

# 8. Classification Crosswalk Model
class ClassificationCrosswalkItem(BaseModel):
    id: int
    sector: str
    original_classification: str
    standardized_classification: str
    mapping_rule: str
    effective_start_year: int
    effective_end_year: int
    source_id: Optional[str] = "SRC-KEMENKEU-LKPP"
    source_institution: Optional[str] = "Kementerian Keuangan RI"
    transformation_note: str
    mapping_version: str

# 9. Provenance & Lineage Model
class ProvenanceTraceResponse(BaseModel):
    observation_id: int
    indicator_id: str
    indicator_name: str
    period: str
    value: Optional[float]
    unit: str
    status: str
    geography: str
    version_id: int
    publication_id: str
    publication_title: str
    document_number: Optional[str]
    source_institution: str
    source_url: str
    page_reference: Optional[str]
    table_reference: Optional[str]
    retrieval_date: str
    last_updated: str
    revision_history: List[Dict[str, Any]] = []

# 10. Audit & Validation Logs
class ValidationLogItem(BaseModel):
    id: int
    batch_id: str
    indicator_id: Optional[str] = None
    period: Optional[str] = None
    validation_rule: str
    severity: str
    status: str
    error_details: Optional[str] = None
    checked_at: str

class UpdateLogItem(BaseModel):
    id: int
    source_id: str
    update_type: str
    status: str
    records_fetched: int
    records_inserted: int
    records_updated: int
    execution_time_ms: int
    log_message: Optional[str] = None
    timestamp: str

# 11. Ingestion Payload Request
class IngestionRecord(BaseModel):
    indicator_id: str
    period: str
    period_type: str
    value: Optional[float] = None
    unit: str
    status: str = "Observed"
    geography: str = "Indonesia"
    publication_id: str
    page_reference: Optional[str] = None
    table_reference: Optional[str] = None

class IngestionBatchRequest(BaseModel):
    source_id: str
    connector_type: str
    records: List[IngestionRecord]

# 12. Global Search Model (5 Distinct Entity Types - Section 5)
class GlobalSearchResultItem(BaseModel):
    id: str
    entity_type: str           # 'dataset', 'indicator', 'publication', 'source_document', 'institution'
    title: str
    subtitle: Optional[str] = None
    snippet: Optional[str] = None
    sector: Optional[str] = None
    institution: Optional[str] = None
    url: Optional[str] = None
    access_status: Optional[str] = None
    extra: Optional[Dict[str, Any]] = None

class GlobalSearchResponse(BaseModel):
    query: str
    total_matches: int
    datasets: List[GlobalSearchResultItem] = []
    indicators: List[GlobalSearchResultItem] = []
    publications: List[GlobalSearchResultItem] = []
    source_documents: List[GlobalSearchResultItem] = []
    institutions: List[GlobalSearchResultItem] = []

# 13. Agricultural Seasonal Calendar Model
class AgriculturalCalendarItem(BaseModel):
    id: int
    commodity_id: str
    commodity_name: str
    crop_category: str
    month: int
    month_name: str
    season_stage: str
    activity_intensity: str
    production_share_pct: float
    key_regions: str
    agroclimatic_factors: Optional[str] = None
    source_document: Optional[str] = None

# 14. Classification History Document Model (Section 13)
class ClassificationDocumentResponse(BaseModel):
    title: str
    last_updated: str
    statutory_authority: str
    executive_summary: str
    eras: List[Dict[str, Any]]
    crosswalk_rules: List[ClassificationCrosswalkItem]
    methodology_notes: str
