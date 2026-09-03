-- ==============================================================================
-- INDOEKONOMI data — Indonesia Economic Data Observatory
-- Database Schema: SQLite DDL (Comprehensive 15 Core Entities)
-- Geographic Scope: NATIONAL ONLY (Indonesia) with Contextual Geo Drivers
-- Data Governance & Provenance Compliant
-- ==============================================================================

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- 1. INSTITUTIONS (Official Publishing Government Bodies & Central Banks)
CREATE TABLE IF NOT EXISTS institutions (
    id TEXT PRIMARY KEY,                       -- e.g., 'INST-KEMENKEU', 'INST-BPS', 'INST-BI'
    code TEXT NOT NULL UNIQUE,                -- e.g., 'KEMENKEU', 'BPS', 'BI', 'ESDM', 'KEMENTAN'
    name TEXT NOT NULL,                       -- e.g., 'Kementerian Keuangan Republik Indonesia'
    short_name TEXT NOT NULL,                 -- e.g., 'Kemenkeu RI'
    institution_type TEXT NOT NULL,           -- 'Kementerian Negara', 'Lembaga Pemerintah Non-Kementerian', 'Bank Sentral'
    website_url TEXT NOT NULL,
    contact_email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. SOURCES (Source Registry Catalog / Information Systems)
CREATE TABLE IF NOT EXISTS sources (
    id TEXT PRIMARY KEY,                       -- e.g., 'SRC-BPS', 'SRC-KEMENKEU-DJP'
    institution_id TEXT,                      -- Reference to institutions(id)
    institution_name TEXT NOT NULL,           -- e.g., 'Badan Pusat Statistik'
    institution_type TEXT NOT NULL,           -- e.g., 'Lembaga Pemerintah Non-Kementerian'
    dataset_name TEXT NOT NULL,               -- e.g., 'Statistik Makroekonomi & PDRB'
    publication_name TEXT NOT NULL,           -- e.g., 'Berita Resmi Statistik (BRS)'
    source_url TEXT NOT NULL,                 -- Official URL
    source_type TEXT NOT NULL,                -- 'API', 'Excel', 'CSV', 'PDF', 'HTML/Web', 'Publication', 'Budget Document', 'Other'
    frequency TEXT NOT NULL,                  -- 'Bulanan', 'Triwulanan', 'Tahunan'
    geographic_scope TEXT NOT NULL DEFAULT 'Indonesia / National',
    last_publication_date TEXT,
    last_retrieval_date TEXT,
    last_successful_update TEXT,
    update_method TEXT NOT NULL,              -- 'Automated Ingestion', 'Batch Import', 'Manual Audit', 'Document Extraction'
    data_owner TEXT NOT NULL,                 -- Ministry/Agency name
    status TEXT NOT NULL DEFAULT 'Active' CHECK(status IN ('Active', 'Monitoring', 'Deprecated', 'Maintenance')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE SET NULL
);

-- 3. PUBLICATIONS (Official Publication Documents & Legal Statutory Citations)
CREATE TABLE IF NOT EXISTS publications (
    id TEXT PRIMARY KEY,                       -- e.g., 'PUB-UU-APBN-2026', 'PUB-LKPP-2024-AUDITED'
    source_id TEXT NOT NULL,
    publication_title TEXT NOT NULL,          -- e.g., 'Undang-Undang RI tentang APBN TA 2026'
    document_number TEXT,                     -- e.g., 'UU No. 28/2022', 'BRS No. 12/02/Th. XXVII'
    series_name TEXT,                         -- e.g., 'APBN Kita', 'LKPP Audited', 'BRS PDB'
    publication_date TEXT NOT NULL,           -- ISO date 'YYYY-MM-DD'
    edition_period TEXT NOT NULL,             -- e.g., 'TA 2026', 'Juni 2026', 'Q1 2026'
    document_url TEXT NOT NULL,
    retrieval_date TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE RESTRICT
);

-- 4. SOURCE DOCUMENTS (Discovered & Permitted Official Source Documents)
CREATE TABLE IF NOT EXISTS source_documents (
    id TEXT PRIMARY KEY,                       -- e.g., 'DOC-APBN-2026-LAW', 'DOC-LKPP-2024-PDF'
    publication_id TEXT NOT NULL,
    document_title TEXT NOT NULL,
    document_type TEXT NOT NULL,              -- 'Undang-Undang', 'Laporan Keuangan Audited', 'Buletin Bulanan', 'Berita Resmi Statistik'
    edition TEXT,
    file_type TEXT NOT NULL,                  -- 'PDF', 'XLSX', 'CSV', 'API'
    file_url TEXT NOT NULL,
    access_status TEXT DEFAULT 'PUBLIC_DOWNLOAD_OPEN',
    source_page_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publication_id) REFERENCES publications(id) ON DELETE RESTRICT
);

-- 5. DATASETS (Thematic Dataset Groupings with Access Governance)
CREATE TABLE IF NOT EXISTS datasets (
    id TEXT PRIMARY KEY,                       -- e.g., 'DS-FISCAL-NAT', 'DS-MACRO-GDP'
    code TEXT NOT NULL UNIQUE,                -- e.g., 'FISCAL_APBN_NAT'
    name TEXT NOT NULL,                       -- e.g., 'Fiskal & Keuangan Negara (APBN)'
    sector TEXT NOT NULL,                     -- e.g., 'Fiskal & Keuangan Negara', 'Makroekonomi'
    category TEXT NOT NULL,                   -- e.g., 'Anggaran Pendapatan dan Belanja Negara'
    description TEXT,
    access_status TEXT NOT NULL DEFAULT 'PUBLIC_DOWNLOAD_OPEN', -- PUBLIC_DOWNLOAD_OPEN, PUBLIC_DOWNLOAD_AFTER_LOGIN, PUBLIC_VIEW_ONLY, etc.
    download_allowed INTEGER DEFAULT 1,
    download_requires_login INTEGER DEFAULT 0,
    license_type TEXT DEFAULT 'Government Open Data (Pemerintah RI)',
    access_notes TEXT,
    latest_period TEXT,
    latest_value REAL,
    latest_status TEXT,
    frequency TEXT DEFAULT 'Tahunan',
    unit TEXT,
    coverage TEXT DEFAULT 'Indonesia / National',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. INDICATORS (National Indicator Master Registry)
CREATE TABLE IF NOT EXISTS indicators (
    id TEXT PRIMARY KEY,                       -- e.g., 'IND-APBN-REV-TOT', 'IND-GDP-GROWTH-YOY'
    dataset_id TEXT NOT NULL,
    unique_variable_code TEXT NOT NULL UNIQUE,-- e.g., 'VAR_APBN_PENDAPATAN_TOTAL'
    name TEXT NOT NULL,                       -- e.g., 'Pendapatan Negara dan Hibah'
    unit TEXT NOT NULL,                       -- e.g., 'Triliun Rupiah', 'Persen (%)', 'Ribu Ton'
    frequency TEXT NOT NULL CHECK(frequency IN ('Bulanan', 'Triwulanan', 'Tahunan')),
    default_aggregation TEXT DEFAULT 'SUM',   -- 'SUM', 'AVG', 'END_OF_PERIOD', 'GROWTH_RATE'
    is_active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE RESTRICT
);

-- 7. METADATA (Standardized 24-Attribute Metadata Dictionary)
CREATE TABLE IF NOT EXISTS metadata (
    indicator_id TEXT PRIMARY KEY,
    definition TEXT NOT NULL,
    sector TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    source_data TEXT NOT NULL,
    publishing_institution TEXT NOT NULL,
    publication_document_name TEXT NOT NULL,
    data_period_coverage TEXT NOT NULL,       -- e.g., '1993 - 2026'
    frequency TEXT NOT NULL,
    geographic_scope TEXT NOT NULL DEFAULT 'Indonesia / National',
    unit TEXT NOT NULL,
    methodology TEXT NOT NULL,
    calculation_formula TEXT,
    publication_date TEXT,
    retrieval_date TEXT,
    last_updated_date TEXT,
    data_status_policy TEXT NOT NULL,         -- e.g., 'Final Audited LKPP / Provisional APBN Kita'
    source_url TEXT NOT NULL,
    reference_page_table TEXT,                -- e.g., 'Lampiran 1.A, Halaman 45-52'
    methodology_notes TEXT,
    revision_notes TEXT,
    data_limitations TEXT,
    is_national_standard INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (indicator_id) REFERENCES indicators(id) ON DELETE CASCADE
);

-- 8. OBSERVATIONS (National Level Time-Series Observations with Provenance)
CREATE TABLE IF NOT EXISTS observations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    indicator_id TEXT NOT NULL,
    period TEXT NOT NULL,                     -- 'YYYY', 'YYYY-Q#', 'YYYY-MM'
    period_type TEXT NOT NULL CHECK(period_type IN ('Annual', 'Quarterly', 'Monthly')),
    value REAL,                               -- NULL if status is 'N/A'
    unit TEXT NOT NULL,
    status TEXT NOT NULL,                     -- PROPOSED, APPROVED, REVISED, REALIZED, REALIZED_PRELIMINARY, REALIZED_AUDITED, Observed, Provisional, etc.
    geography TEXT NOT NULL DEFAULT 'Indonesia', -- STRICT NATIONAL LEVEL ONLY
    publication_id TEXT NOT NULL,
    source_document_id TEXT,
    page_reference TEXT,
    table_reference TEXT,
    provenance_id TEXT,                       -- Unique citation trace key
    publication_date TEXT,                    -- Strict separate publication date
    extraction_method TEXT,                   -- 'Extracted and harmonized by INDOEKONOMI data from official source'
    transformation_status TEXT,               -- 'Harmonized to modern BAS (PP 71/2010)'
    notes TEXT,
    version_id INTEGER DEFAULT 1,
    is_current INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (indicator_id) REFERENCES indicators(id) ON DELETE RESTRICT,
    FOREIGN KEY (publication_id) REFERENCES publications(id) ON DELETE RESTRICT,
    FOREIGN KEY (source_document_id) REFERENCES source_documents(id) ON DELETE SET NULL,
    CONSTRAINT uq_indicator_period_status_version UNIQUE (indicator_id, period, status, version_id)
);

CREATE INDEX IF NOT EXISTS idx_obs_indicator_period ON observations (indicator_id, period);
CREATE INDEX IF NOT EXISTS idx_obs_period ON observations (period);
CREATE INDEX IF NOT EXISTS idx_obs_status ON observations (status);
CREATE INDEX IF NOT EXISTS idx_obs_prov ON observations (provenance_id);

-- 9. CONTEXTUAL DRIVER INFORMATION (Explanatory Provincial Drivers, NOT Provincial DB)
CREATE TABLE IF NOT EXISTS contextual_driver_information (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    indicator_id TEXT NOT NULL,
    period TEXT NOT NULL,
    province_name TEXT NOT NULL,              -- Mentioned Province (e.g. 'Maluku Utara')
    province_code TEXT NOT NULL,              -- BPS Province Code e.g. '82'
    geo_level TEXT DEFAULT 'Provinsi',        -- 'Provinsi', 'Kabupaten/Kota', 'Desa/Kawasan'
    geo_target_name TEXT,                     -- Specific administrative unit
    latitude REAL,                            -- Centroid latitude
    longitude REAL,                           -- Centroid longitude
    zoom_level INTEGER DEFAULT 7,             -- Map zoom level
    driver_role TEXT NOT NULL,                -- e.g., 'Pendorong Utama Kenaikan Produksi'
    explanation TEXT NOT NULL,                -- Contextual narrative from official doc
    publication_id TEXT NOT NULL,
    page_reference TEXT,
    table_reference TEXT,
    source_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (indicator_id) REFERENCES indicators(id) ON DELETE RESTRICT,
    FOREIGN KEY (publication_id) REFERENCES publications(id) ON DELETE RESTRICT,
    FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_ctx_indicator_period ON contextual_driver_information (indicator_id, period);
CREATE INDEX IF NOT EXISTS idx_ctx_province ON contextual_driver_information (province_code);

-- 10. CLASSIFICATION CROSSWALK (Harmonization of Historical APBN / LKPP Classifications)
CREATE TABLE IF NOT EXISTS classification_crosswalk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sector TEXT NOT NULL,                     -- e.g., 'Fiskal / Belanja Negara'
    original_classification TEXT NOT NULL,   -- e.g., 'Belanja Rutin & Belanja Pembangunan (Pra-2005)'
    standardized_classification TEXT NOT NULL,-- e.g., 'Belanja Pegawai, Barang, Modal, Bunga, Subsidi, Bansos, Hibah, TKD'
    mapping_rule TEXT NOT NULL,               -- e.g., 'UU 17/2003 Unified Budget Harmonization'
    effective_start_year INTEGER NOT NULL,    -- 1993
    effective_end_year INTEGER NOT NULL,      -- 2004 or 9999
    source_id TEXT NOT NULL,
    transformation_note TEXT NOT NULL,
    mapping_version TEXT NOT NULL DEFAULT 'v2.0-GFS-BAS-Harmonized',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE RESTRICT
);

-- 11. AGRICULTURAL CALENDAR (Kalender Musim Tanam & Pola Panen Komoditas Strategis Nasional)
CREATE TABLE IF NOT EXISTS agricultural_calendar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commodity_id TEXT NOT NULL,
    commodity_name TEXT NOT NULL,             -- e.g., 'Padi / Beras', 'Jagung', 'Cabai Rawit', 'Bawang Merah'
    crop_category TEXT NOT NULL,               -- 'Tanaman Pangan', 'Hortikultura', 'Perkebunan'
    month INTEGER NOT NULL,                    -- 1 to 12
    month_name TEXT NOT NULL,                  -- 'Januari' to 'Desember'
    season_stage TEXT NOT NULL,                -- 'Musim Tanam 1 (Rendeng)', 'Panen Raya', 'Musim Tanam 2 (Gadu)', 'Masa Paceklik'
    activity_intensity TEXT NOT NULL,          -- 'Puncak Panen', 'Tinggi', 'Sedang', 'Rendah'
    production_share_pct REAL,                 -- Kontribusi bulanan terhadap estimasi produksi tahunan
    key_regions TEXT NOT NULL,                 -- Sentra Wilayah (misal 'Jawa Timur, Jawa Tengah, Jawa Barat, Sulawesi Selatan')
    agroclimatic_factors TEXT,                 -- Faktor Iklim / Curah Hujan
    source_document TEXT,                      -- Dokumen Sumber Resmi (Kementan / BPS)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_agri_cal_commodity ON agricultural_calendar (commodity_id, month);

-- 12. DOWNLOAD LOGS (Audit Trails for Access Governance & Rate Limiting)
CREATE TABLE IF NOT EXISTS download_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT DEFAULT 'guest',
    user_email TEXT,
    dataset_id TEXT,
    indicator_id TEXT,
    timeframe TEXT,
    file_format TEXT,                         -- 'XLSX', 'CSV', 'JSON'
    status TEXT NOT NULL DEFAULT 'ALLOWED',     -- 'ALLOWED', 'DENIED', 'AUTHENTICATED'
    ip_hash TEXT,
    notes TEXT,
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_download_logs_dataset ON download_logs (dataset_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_time ON download_logs (downloaded_at);

-- 13. DATA VERSIONS (Immutable Audit Lineage for Revisions)
CREATE TABLE IF NOT EXISTS data_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    indicator_id TEXT NOT NULL,
    period TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    previous_value REAL,
    new_value REAL,
    previous_status TEXT,
    new_status TEXT,
    change_reason TEXT NOT NULL,              -- e.g., 'Revisi final LKPP Audited oleh BPK RI menggantikan APBN Kita'
    revised_by_publication_id TEXT NOT NULL,
    revision_date TEXT NOT NULL,              -- ISO date
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (indicator_id) REFERENCES indicators(id) ON DELETE RESTRICT,
    FOREIGN KEY (revised_by_publication_id) REFERENCES publications(id) ON DELETE RESTRICT
);

-- 14. UPDATE LOGS (System Data Ingestion Audit Trail)
CREATE TABLE IF NOT EXISTS update_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id TEXT NOT NULL,
    update_type TEXT NOT NULL,                -- 'Automated Cron', 'Manual Trigger', 'Batch Ingest'
    status TEXT NOT NULL CHECK(status IN ('SUCCESS', 'FAILED', 'PARTIAL', 'RUNNING')),
    records_fetched INTEGER DEFAULT 0,
    records_inserted INTEGER DEFAULT 0,
    records_updated INTEGER DEFAULT 0,
    execution_time_ms INTEGER DEFAULT 0,
    log_message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE RESTRICT
);

-- 15. VALIDATION LOGS (Data Quality and Governance Audit Log)
CREATE TABLE IF NOT EXISTS validation_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id TEXT NOT NULL,
    indicator_id TEXT,
    period TEXT,
    validation_rule TEXT NOT NULL,
    severity TEXT NOT NULL CHECK(severity IN ('CRITICAL', 'WARNING', 'INFO')),
    status TEXT NOT NULL CHECK(status IN ('PASSED', 'FAILED', 'FLAGGED')),
    error_details TEXT,
    original_payload TEXT,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
