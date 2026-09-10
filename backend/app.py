import os
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Query, BackgroundTasks, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

from backend.config import (
    APP_BRAND,
    APP_WEB_IDENTIFIER,
    APP_DOMAIN,
    APP_TITLE,
    APP_SUBTITLE,
    APP_VERSION,
    DEMO_DATA_DISCLAIMER,
    STATIC_DIR,
    DEFAULT_WINDOW_MONTHLY,
    DEFAULT_WINDOW_ANNUAL
)
from backend.models.schemas import (
    ObservationListResponse,
    KPISummaryResponse,
    MetadataResponse,
    ProvenanceTraceResponse,
    SourceResponse,
    ContextualDriverItem,
    ClassificationCrosswalkItem,
    ValidationLogItem,
    UpdateLogItem,
    IngestionBatchRequest,
    GlobalSearchResponse,
    DatasetResponse,
    AgriculturalCalendarItem,
    ClassificationDocumentResponse
)
from backend.services.search_service import SearchService
from backend.services.metadata_service import MetadataService
from backend.services.crosswalk_service import CrosswalkService
from backend.services.audit_service import AuditService
from backend.services.sync_schedule_service import SyncScheduleService
from backend.services.commodity_service import CommodityService
from backend.services.agri_calendar_service import AgriCalendarService
from backend.services.lkpp_service import LKPPService
from backend.services.weekly_service import WeeklyService
from backend.services.custom_chart_service import CustomChartService, custom_chart_service
from backend.services.export_service import ExportService
from backend.ingestion.pipeline import IngestionPipeline

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
# 1. SYSTEM HEALTH & METRICS
# ------------------------------------------------------------------------------
@app.get("/api/health", tags=["System"])
def health_check():
    """Health check endpoint and system status."""
    opts = SearchService.get_filter_options()
    return {
        "status": "HEALTHY",
        "app_name": APP_TITLE,
        "brand": APP_BRAND,
        "web_identifier": APP_WEB_IDENTIFIER,
        "domain": APP_DOMAIN,
        "subtitle": APP_SUBTITLE,
        "version": APP_VERSION,
        "geographic_scope": "Indonesia / National",
        "total_observations": opts["statistics"]["total_observations"],
        "total_indicators": opts["statistics"]["total_indicators"],
        "total_datasets": opts["statistics"]["total_datasets"],
        "disclaimer": DEMO_DATA_DISCLAIMER
    }

# ------------------------------------------------------------------------------
# 2. GLOBAL SEARCH & FILTERING (Section 5)
# ------------------------------------------------------------------------------
@app.get("/api/search/global", response_model=GlobalSearchResponse, tags=["Search & Filtering"])
def global_search(
    q: str = Query(..., min_length=1, description="Kata kunci pencarian (dataset, indikator, publikasi, dokumen, institusi)"),
    limit: int = Query(15, ge=1, le=50)
):
    """
    Unified global search across 5 distinct entity types:
    1. Dataset
    2. Indicator
    3. Publication
    4. Source Document
    5. Institution
    """
    return SearchService.global_search(query=q, limit=limit)

@app.get("/api/datasets", response_model=List[DatasetResponse], tags=["Datasets"])
def get_datasets():
    """Returns registered analytical datasets with access governance and coverage information."""
    return SearchService.get_datasets()

@app.get("/api/filter-options", tags=["Search & Filtering"])
def get_filter_options():
    """Returns cascading multidimensional filter hierarchy and metadata."""
    return SearchService.get_filter_options()

@app.get("/api/observations", tags=["Observations"])
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

# ------------------------------------------------------------------------------
# 3. DESCRIPTIVE KPI MODULE
# ------------------------------------------------------------------------------
@app.get("/api/kpi/{indicator_id}", response_model=KPISummaryResponse, tags=["Analytics & KPIs"])
def get_kpi_summary(indicator_id: str):
    """
    Calculates strictly descriptive KPIs for a given national indicator.
    Prohibits predictive surplus/deficit where irrelevant.
    """
    kpi = SearchService.get_descriptive_kpi(indicator_id)
    if not kpi:
        raise HTTPException(status_code=404, detail=f"Indicator '{indicator_id}' not found.")
    return kpi

# ------------------------------------------------------------------------------
# 4. DATA DICTIONARY & METADATA
# ------------------------------------------------------------------------------
@app.get("/api/metadata/catalog", tags=["Data Dictionary"])
def get_metadata_catalog():
    """Returns standardized 24-point metadata catalog for all indicators."""
    return MetadataService.get_all_metadata_catalog()

@app.get("/api/sync-schedule", tags=["Release Schedule & Sync Policy"])
def get_sync_schedule():
    """
    Returns official data synchronization policy and scheduled release calendar (Tanggal 8, 17, dan 28).
    Live real-time auto-updates are strictly disabled to ensure statutory audit compliance.
    """
    return SyncScheduleService.get_next_scheduled_release()

@app.get("/api/variables-inventory", tags=["Release Schedule & Sync Policy"])
def get_variables_inventory():
    """
    Returns comprehensive inventory of all data variables with their hierarchy level,
    source institution, canonical document, exact last updated date, and tri-monthly release cycle.
    """
    return SyncScheduleService.get_variables_inventory()

@app.get("/api/metadata/{indicator_id}", tags=["Data Dictionary"])
def get_indicator_metadata(indicator_id: str):
    """Returns comprehensive 24-point standardized metadata for a specific indicator."""
    meta = MetadataService.get_indicator_metadata(indicator_id)
    if not meta:
        raise HTTPException(status_code=404, detail=f"Metadata for indicator '{indicator_id}' not found.")
    return meta

# ------------------------------------------------------------------------------
# 5. DATA PROVENANCE & LINEAGE
# ------------------------------------------------------------------------------
@app.get("/api/provenance/{observation_id}", tags=["Data Governance & Provenance"])
def trace_provenance(observation_id: int):
    """
    Traces complete provenance lineage for a specific observation record:
    Observation -> Indicator -> Dataset -> Publication -> Source Institution -> Page/Table -> Retrieval Date -> Version History.
    """
    trace = MetadataService.trace_data_provenance(observation_id)
    if not trace:
        raise HTTPException(status_code=404, detail=f"Observation record ID {observation_id} not found.")
    return trace

# ------------------------------------------------------------------------------
# 6. SOURCE REGISTRY
# ------------------------------------------------------------------------------
@app.get("/api/sources", tags=["Source Registry"])
def get_sources_registry():
    """Returns official source registry list with institutions, types, update frequencies and methods."""
    from backend.database.connection import get_db
    with get_db() as conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM sources ORDER BY institution_name ASC")
        return [dict(r) for r in cur.fetchall()]

# ------------------------------------------------------------------------------
# 7. CONTEXTUAL GIS & REGIONAL DRIVERS
# ------------------------------------------------------------------------------
@app.get("/api/contextual-drivers", tags=["Contextual GIS"])
def get_contextual_drivers(
    indicator_id: Optional[str] = Query(None, description="ID Indikator"),
    period: Optional[str] = Query(None, description="Periode data (misal: 2023)")
):
    """
    Retrieves contextual driver notes citing specific provinces from official publications.
    Note: These are explanatory notes only, NOT provincial observation records.
    """
    return AuditService.get_contextual_drivers(indicator_id, period)

# ------------------------------------------------------------------------------
# 8. CLASSIFICATION CROSSWALK (HARMONISASI APBN)
# ------------------------------------------------------------------------------
@app.get("/api/crosswalk", tags=["Classification Crosswalk"])
def get_classification_crosswalk(sector: Optional[str] = Query(None)):
    """
    Returns harmonization crosswalk rules bridging historical classifications (e.g. pre-2005 APBN)
    to standardized national modern classifications.
    """
    return CrosswalkService.get_all_crosswalk_rules(sector)

@app.get("/api/lkpp/financial-statements", tags=["Classification Crosswalk & LKPP Statements"])
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

@app.get("/api/crosswalk/document", response_model=ClassificationDocumentResponse, tags=["Classification Crosswalk"])
def get_classification_evolution_document():
    """
    Returns full statutory document of historical classification changes (Section 13 requirement).
    Accessible via the clickable info link in dataset headers.
    """
    return CrosswalkService.get_classification_evolution_document()

# ------------------------------------------------------------------------------
# 8.5 LKPP TIME-SERIES STATUTORY STATEMENTS OBSERVATORY (1990 - 2026)
# ------------------------------------------------------------------------------
@app.get("/api/lkpp/tables", tags=["LKPP Financial Statements Observatory (1990 - 2026)"])
def get_lkpp_tables():
    """
    Returns registry of 6 statutory LKPP financial statement tables and legal bases:
    1. LRA (Laporan Realisasi Anggaran)
    2. LPSAL (Laporan Perubahan Saldo Anggaran Lebih)
    3. Neraca Pemerintah Pusat
    4. LO (Laporan Operasional)
    5. LAK (Laporan Arus Kas)
    6. LPE (Laporan Perubahan Ekuitas)
    """
    return {
        "status": "SUCCESS",
        "total_tables": len(LKPPService.TABLE_REGISTRY),
        "tables": LKPPService.TABLE_REGISTRY
    }

@app.get("/api/lkpp/matrix", tags=["LKPP Financial Statements Observatory (1990 - 2026)"])
def get_lkpp_matrix(
    table_id: str = Query("LRA", description="Kode tabel LKPP: LRA, LPSAL, NERACA, LO, LAK, LPE"),
    start_year: int = Query(1990, ge=1990, le=2026, description="Tahun awal deret waktu (1990 - 2026)"),
    end_year: int = Query(2026, ge=1990, le=2026, description="Tahun akhir deret waktu (1990 - 2026)"),
    unit: str = Query("TRILLION", description="Satuan nilai: TRILLION (Rp T), BILLION (Rp M), MILLION (Rp Juta)"),
    q: Optional[str] = Query(None, description="Kata kunci pencarian akun/kelompok biaya")
):
    """
    Returns horizontal pivot data matrix where columns are years (1990 - 2026)
    and rows are standardized modern Bagan Akun Standar (BAS) cost groups.
    """
    try:
        return LKPPService.get_table_matrix(table_id, start_year, end_year, unit, q)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/lkpp/trend", tags=["LKPP Financial Statements Observatory (1990 - 2026)"])
def get_lkpp_line_item_trend(
    table_id: str = Query("LRA", description="Kode tabel LKPP: LRA, LPSAL, NERACA, LO, LAK, LPE"),
    item_id: str = Query("EXP_PEGAWAI", description="ID atau Kode Akun kelompok biaya"),
    unit: str = Query("TRILLION", description="Satuan nilai: TRILLION, BILLION, MILLION")
):
    """
    Returns multi-year time-series trend data and analytics (CAGR, YoY %, peak value)
    for interactive Chart.js line graph and KPI modal.
    """
    try:
        return LKPPService.get_line_item_trend(table_id, item_id, unit)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/lkpp/glossary", tags=["LKPP Financial Statements Observatory (1990 - 2026)"])
def get_lkpp_nomenclature_glossary():
    """
    Returns statutory crosswalk glossary tracking terminology evolution from 1990 to 2026
    across Dual Budgeting, Kas Menuju Akrual (CTA), and SAP Akrual Penuh.
    """
    return LKPPService.get_terminology_glossary()

@app.get("/api/lkpp/export", tags=["LKPP Financial Statements Observatory (1990 - 2026)"])
def export_lkpp_matrix(
    table_id: str = Query("LRA", description="Kode tabel LKPP"),
    start_year: int = Query(1990, ge=1990, le=2026),
    end_year: int = Query(2026, ge=1990, le=2026),
    unit: str = Query("TRILLION", description="TRILLION | BILLION | MILLION"),
    format: str = Query("xlsx", description="Format file ekspor: xlsx atau csv")
):
    """
    Downloads full pivot data matrix as multi-sheet Excel (.xlsx) or CSV file.
    """
    clean_fmt = format.lower().strip()
    table_code = table_id.upper().strip()
    filename_base = f"INDOEKONOMI_LKPP_{table_code}_{start_year}-{end_year}_{unit}"
    
    if clean_fmt == "csv":
        csv_text = LKPPService.generate_csv_matrix(table_id, start_year, end_year, unit)
        return Response(
            content=csv_text,
            media_type="text/csv; charset=utf-8",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.csv"'}
        )
    else:
        excel_bytes = LKPPService.generate_excel_matrix(table_id, start_year, end_year, unit)
        return Response(
            content=excel_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.xlsx"'}
        )

# ------------------------------------------------------------------------------
# 8B. WEEKLY HIGH-FREQUENCY OBSERVATORY (2014 - 2026)
# ------------------------------------------------------------------------------
@app.get("/api/weekly/institutions", tags=["Weekly High-Frequency Observatory (2014 - 2026)"])
def get_weekly_institutions():
    """
    Returns list of government institutions and ministries with regular weekly data releases:
    1. Bank Indonesia (BI): ITEMs Indikator Terpilih Moneter & Sistem Pembayaran
    2. Kementerian Keuangan RI (DJPb): Kinerja APBN & Kas BUN Mingguan
    3. Otoritas Jasa Keuangan (OJK): Statistik Pasar Modal Mingguan
    4. Badan Pangan Nasional (Bapanas): Harga Pangan Strategis Nasional (Daily -> Weekly)
    """
    return {
        "status": "SUCCESS",
        "total_institutions": len(WeeklyService.get_institutions()),
        "institutions": WeeklyService.get_institutions()
    }

@app.get("/api/weekly/matrix", tags=["Weekly High-Frequency Observatory (2014 - 2026)"])
def get_weekly_matrix(
    institution_id: str = Query("ALL", description="ALL | BI | DJPB | OJK | BAPANAS"),
    view_mode: str = Query("annual", description="annual (2014-2026) | weekly (W01-W52)"),
    year: int = Query(2026, ge=2014, le=2026, description="Tahun untuk mode weekly"),
    q: Optional[str] = Query(None, description="Pencarian nama atau kode indikator")
):
    """
    Returns pivot table data matrix of weekly indicators across institutions.
    """
    try:
        return WeeklyService.get_weekly_matrix(
            institution_id=institution_id,
            view_mode=view_mode,
            year=year,
            q=q or ""
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/weekly/trend", tags=["Weekly High-Frequency Observatory (2014 - 2026)"])
def get_weekly_trend(
    indicator_id: str = Query(..., description="Kode indikator mingguan (misal: BI_M0, OJK_IHSG_CLOSE)"),
    year: Optional[int] = Query(None, ge=2014, le=2026, description="Filter tahun spesifik (opsional)")
):
    """
    Returns chronological time series, WoW changes, and descriptive stats for a weekly indicator.
    """
    try:
        return WeeklyService.get_weekly_trend(indicator_id=indicator_id, year=year)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/weekly/export", tags=["Weekly High-Frequency Observatory (2014 - 2026)"])
def export_weekly_matrix(
    institution_id: str = Query("ALL", description="ALL | BI | DJPB | OJK | BAPANAS"),
    view_mode: str = Query("annual", description="annual | weekly"),
    year: int = Query(2026, ge=2014, le=2026),
    format: str = Query("xlsx", description="Format file: xlsx atau csv")
):
    """
    Downloads weekly data matrix in Excel (.xlsx) or CSV format.
    """
    clean_fmt = format.lower().strip()
    filename_base = f"INDOEKONOMI_WEEKLY_{institution_id}_{view_mode}_{year if view_mode == 'weekly' else '2014-2026'}"
    
    if clean_fmt == "csv":
        csv_text = WeeklyService.export_csv(institution_id=institution_id, view_mode=view_mode, year=year)
        return Response(
            content=csv_text,
            media_type="text/csv; charset=utf-8",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.csv"'}
        )
    else:
        excel_bytes = WeeklyService.export_excel(institution_id=institution_id, view_mode=view_mode, year=year)
        return Response(
            content=excel_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.xlsx"'}
        )

# ------------------------------------------------------------------------------
# 8C. CUSTOM CHART STUDIO & CONTEXTUAL DRIVER ANALYSIS (1990 - 2026)
# ------------------------------------------------------------------------------
@app.get("/api/custom-chart/variables", tags=["Custom Chart Studio & Contextual Driver"])
def get_custom_chart_variables():
    """
    Returns all selectable indicators from 9 Trend Keuangan Negara tables + Weekly indicators,
    including table tags, units, and default visualization configurations.
    """
    variables = custom_chart_service.get_all_variables()
    return {
        "status": "SUCCESS",
        "total_variables": len(variables),
        "variables": variables
    }

@app.get("/api/custom-chart/series", tags=["Custom Chart Studio & Contextual Driver"])
def get_custom_chart_series(
    variable_id: str = Query(..., description="ID variabel (misal: LRA__REV_TOTAL, APBN__APBN_REV, WEEKLY__BI_M0)"),
    transformation: str = Query("RAW", description="Transformasi hitungan: RAW, YOY, AVG_3Y, BASE_100"),
    start_year: int = Query(1990, ge=1990, le=2026, description="Tahun awal"),
    end_year: int = Query(2026, ge=1990, le=2026, description="Tahun akhir")
):
    """
    Computes time-series data with requested mathematical transformation:
    - RAW: Nilai asli nominal
    - YOY: Pertumbuhan tahunan YoY (%)
    - AVG_3Y: Rata-rata bergerak 3 tahun (3-Year Moving Average)
    - BASE_100: Normalisasi indeks dasar 100
    """
    try:
        return custom_chart_service.calculate_series(
            variable_id=variable_id,
            transformation=transformation,
            start_year=start_year,
            end_year=end_year
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/custom-chart/driver", tags=["Custom Chart Studio & Contextual Driver"])
def get_custom_chart_driver(
    year: int = Query(2020, ge=1990, le=2026, description="Tahun yang disorot oleh pointer pengguna"),
    variable_ids: str = Query(..., description="Daftar ID variabel yang dipisahkan koma (maksimal 5 variabel)")
):
    """
    Retrieves grounded contextual driver intelligence explaining why active variables moved YoY
    from the previous year, backed by statutory audit documents and official public records.
    """
    try:
        v_ids = [vid.strip() for vid in variable_ids.split(",") if vid.strip()][:5]
        return custom_chart_service.get_contextual_driver(year=year, variable_ids=v_ids)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ------------------------------------------------------------------------------
# 9. AUDIT TRAILS & LOGS
# ------------------------------------------------------------------------------
@app.get("/api/revision-history", tags=["Audit & Logs"])
def get_revision_history(indicator_id: Optional[str] = Query(None)):
    """Returns data version revision history snapshots."""
    return AuditService.get_revision_history(indicator_id)

@app.get("/api/validation-logs", tags=["Audit & Logs"])
def get_validation_logs(
    limit: int = Query(50, ge=1, le=200),
    status: Optional[str] = Query(None, description="Filter status (PASSED, FAILED, FLAGGED)")
):
    """Returns data quality validation logs."""
    return AuditService.get_validation_logs(limit, status)

@app.get("/api/update-logs", tags=["Audit & Logs"])
def get_update_logs(limit: int = Query(50, ge=1, le=200)):
    """Returns data ingestion and connector update logs."""
    return AuditService.get_update_logs(limit)

@app.post("/api/audit/download-log", tags=["Audit & Logs"])
def record_download_log(payload: Dict[str, Any]):
    """Records download audit log and quota tracking into backend database."""
    return AuditService.record_download_audit(payload)

@app.get("/api/audit/download-logs", tags=["Audit & Logs"])
def get_download_logs(limit: int = Query(50, ge=1, le=200)):
    """Returns download audit logs."""
    return AuditService.get_download_logs(limit)

@app.get("/api/download/{dataset_id}", tags=["Export & Download"])
def download_dataset(
    dataset_id: str,
    format: str = Query("xlsx", description="Format: xlsx atau csv"),
    email: Optional[str] = Query(None, description="Email pengguna untuk verifikasi unduh"),
    indicator_id: Optional[str] = Query(None),
    start_year: Optional[int] = Query(None),
    end_year: Optional[int] = Query(None)
):
    """
    Authorized multi-tab Excel (.xlsx) and RFC-4180 CSV export with independent provenance traceability (Rules 9, 10, 11, 12).
    Generates Sheet 1: Data (with provenance_id), Sheet 2: Metadata, Sheet 3: Source & Provenance.
    Standard filename: INDOEKONOMI_[DATASET TITLE]_[TIMEFRAME].[EXT]
    """
    # 1. Access Governance Check (Backend Authorization Enforcement)
    perm = AuditService.check_download_permission(dataset_id=dataset_id, user_email=email)
    if not perm["allowed"]:
        raise HTTPException(
            status_code=403,
            detail={
                "message": perm["reason"],
                "access_status": perm.get("access_status"),
                "dataset_id": dataset_id,
                "requires_login": perm.get("requires_login", False),
                "original_url": perm.get("original_url")
            }
        )

    # 2. Query dataset metadata
    datasets = SearchService.get_datasets()
    dataset_meta = next((d for d in datasets if d["id"] == dataset_id), {
        "id": dataset_id,
        "name": dataset_id.replace("DS-", "").replace("-", " ").title(),
        "sector": "Ekonomi Nasional",
        "category": "Statistik Terpadu",
        "frequency": "Tahunan",
        "unit": "Standar Nasional"
    })

    # 3. Query all structured observations for dataset (full historical series)
    obs_res = SearchService.query_observations(
        indicator_id=indicator_id,
        start_year=start_year,
        end_year=end_year,
        limit=5000,
        sort_by="period",
        sort_order="ASC"
    )
    observations = obs_res.get("records", [])

    timeframe_label = f"{observations[0]['period']}-{observations[-1]['period']}" if observations else "ALL"
    dataset_title = dataset_meta.get("name") or dataset_id

    # 4. Generate File Stream
    file_fmt = format.lower()
    if file_fmt == "csv":
        file_bytes = ExportService.generate_csv_bytes(observations)
        media_type = "text/csv; charset=utf-8"
        filename = ExportService.generate_filename(dataset_title, timeframe_label, "csv")
    else:
        file_bytes = ExportService.generate_excel_bytes(dataset_meta, observations, observations)
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        filename = ExportService.generate_filename(dataset_title, timeframe_label, "xlsx")

    # 5. Log download audit
    AuditService.record_download_audit({
        "email": email or "guest-public@dewanekonomi.go.id",
        "download_type": f"DATASET_{file_fmt.upper()}",
        "variables_count": 1,
        "total_points": len(observations),
        "file_name": filename
    })

    return Response(
        content=file_bytes,
        media_type=media_type,
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )

# ------------------------------------------------------------------------------
# 10. COMMODITY TRACKING & BALANCE (PERTANIAN, PETERNAKAN, PERIKANAN, HASIL BUMI)
# ------------------------------------------------------------------------------
@app.get("/api/commodities/categories", tags=["Commodity Tracking"])
def get_commodity_categories():
    """
    Returns structured divisions, groups, HS chapters, APBN/LKPP categories, and summary metrics for all commodities.
    """
    return CommodityService.get_categories_structure()

@app.get("/api/commodities/balance", tags=["Commodity Tracking"])
def get_commodity_balance(
    commodity_id: str = Query("COM-AGRI-001-BERAS", description="Unique Commodity ID"),
    start_year: int = Query(1990, ge=1990, le=2035),
    end_year: int = Query(2026, ge=1990, le=2035)
):
    """
    Returns detailed time-series balance (Production, Consumption, Import, Export, SSR, IDR), KPIs, and HS/APBN mapping (1990-2026).
    """
    balance = CommodityService.get_commodity_balance(commodity_id, start_year, end_year)
    if not balance:
        raise HTTPException(status_code=404, detail=f"Commodity with ID '{commodity_id}' not found.")
    return balance

@app.get("/api/commodities/matrix", tags=["Commodity Tracking"])
def get_commodity_matrix(
    division: Optional[str] = Query(None, description="PERTANIAN_PETERNAKAN or HASIL_BUMI"),
    group: Optional[str] = Query(None, description="Group ID filter"),
    hs_chapter: Optional[str] = Query(None, description="HS Chapter filter e.g. 'HS 10'"),
    apbn_category: Optional[str] = Query(None, description="LKPP/APBN classification category"),
    year: str = Query("2024", description="Reference year (1990-2026)")
):
    """
    Returns comparative matrix of all commodities for benchmarking with HS codes and APBN classifications.
    """
    return CommodityService.get_matrix_overview(division, group, hs_chapter, apbn_category, year)

@app.get("/api/commodities/spatial-distribution", tags=["Commodity Tracking & GeoMap"])
def get_commodity_spatial_distribution(
    commodity_id: str = Query("COM-MINE-001-BATUBARA", description="Unique Commodity ID"),
    variable: str = Query("PRODUKSI_TERBANYAK", description="Variable: PRODUKSI_TERBANYAK, PNBP_APBN, TITIK_EKSPOR, SMELTER_HILIR")
):
    """
    Returns spatial GeoMap points, top regional producers, PNBP APBN contribution by region, and export terminals.
    """
    spatial = CommodityService.get_spatial_distribution(commodity_id, variable)
    if not spatial:
        raise HTTPException(status_code=404, detail=f"Spatial data for commodity '{commodity_id}' not found.")
    return spatial

# ------------------------------------------------------------------------------
# 10.1 AGRICULTURAL CALENDAR (KALENDER MUSIM TANAM & POLA PANEN)
# ------------------------------------------------------------------------------
@app.get("/api/agricultural-calendar", tags=["Agricultural Calendar"])
def get_agricultural_calendar(
    commodity_id: Optional[str] = Query(None, description="Filter ID Komoditas"),
    crop_category: Optional[str] = Query(None, description="Filter Kategori Tanaman"),
    month: Optional[int] = Query(None, ge=1, le=12, description="Bulan (1-12)")
):
    """
    Returns monthly national agricultural calendar matrix: planting seasons (MT 1 / MT 2),
    harvesting peaks (panen raya), lean seasons (paceklik), regional centers, and agroclimatic contexts.
    """
    return AgriCalendarService.get_calendar_matrix(commodity_id, crop_category, month)

@app.get("/api/agricultural-calendar/summary", tags=["Agricultural Calendar"])
def get_agricultural_calendar_summary():
    """Returns high-level summary and seasonal highlights for the Agricultural Calendar tab."""
    return AgriCalendarService.get_calendar_summary()

@app.get("/api/agricultural-calendar/regencies", tags=["Agricultural Calendar"])
def get_agricultural_calendar_regencies(
    commodity_id: Optional[str] = Query("JAGUNG", description="Filter bahan baku komoditas: JAGUNG, PADI_BERAS, CABAI_RAWIT, BAWANG_MERAH, KEDELAI, BAWANG_PUTIH, KELAPA_SAWIT, TEBU, UBI_KAYU, KOPI"),
    month: Optional[int] = Query(9, ge=1, le=12, description="Bulan penanaman (1-12, default 9/September)"),
    status: Optional[str] = Query(None, description="Filter status rekomendasi: RECOMMENDED_PRIME, RECOMMENDED_CONDITIONAL, GROWING, HARVESTING"),
    island: Optional[str] = Query(None, description="Filter pulau: JAWA, SUMATERA, SULAWESI, BALI_NUSA_TENGGARA, KALIMANTAN, MALUKU_PAPUA")
):
    """
    Returns GIS regency-level crop planting recommendations across Indonesia for the
    selected commodity and planting month, including suitability scores, potential acreage (Ha),
    varieties, and projected harvest windows.
    """
    return AgriCalendarService.get_regency_planting_recommendations(commodity_id, month, status, island)

# ------------------------------------------------------------------------------
# 11. INGESTION PIPELINE TRIGGER & SANDBOX
# ------------------------------------------------------------------------------
@app.post("/api/ingestion/run", tags=["Data Ingestion"])
def run_connector_ingestion(
    source_id: str = Query("SRC-BPS", description="ID Sumber resmi"),
    connector_type: str = Query("api", description="Tipe konektor: api, csv, pdf")
):
    """Executes ingestion connector pipeline with validation, versioning, and update logging."""
    return IngestionPipeline.run_connector_ingestion(source_id, connector_type)

@app.post("/api/ingestion/batch", tags=["Data Ingestion"])
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

# ------------------------------------------------------------------------------
# FRONTEND STATIC FILES SERVING
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
        # Serve frontend index or static files
        file_path = STATIC_DIR / full_path
        if file_path.is_file():
            return FileResponse(file_path, headers={"Cache-Control": "no-cache, no-store, must-revalidate"})
        return FileResponse(STATIC_DIR / "index.html", headers={"Cache-Control": "no-cache, no-store, must-revalidate"})
