-- ==============================================================================
-- PUSAT BASIS DATA DATA SEKUNDER: PERGERAKAN EKONOMI INDONESIA
-- Database Schema: SQLite DDL (11 Core Entities)
-- Geographic Scope: NATIONAL ONLY (Indonesia)
-- Data Governance & Provenance Compliant
-- ==============================================================================

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- 1. SOURCES (Source Registry Catalog)
CREATE TABLE IF NOT EXISTS sources (
    id TEXT PRIMARY KEY,                       -- e.g., 'SRC-BPS', 'SRC-KEMENKEU-DJP'
    institution_name TEXT NOT NULL,           -- e.g., 'Badan Pusat Statistik'
    institution_type TEXT NOT NULL,           -- e.g., 'Lembaga Pemerintah Non-Kementerian'
    dataset_name TEXT NOT NULL,               -- e.g., 'Statistik Makroekonomi & PDRB'
    publication_name TEXT NOT NULL,           -- e.g., 'Berita Resmi Statistik (BRS)'
    source_url TEXT NOT NULL,                 -- Official URL
    source_type TEXT NOT NULL CHECK(source_type IN ('API', 'Excel', 'CSV', 'PDF', 'HTML/Web', 'Other')),
    frequency TEXT NOT NULL,                  -- 'Bulanan', 'Triwulanan', 'Tahunan'
    geographic_scope TEXT NOT NULL DEFAULT 'Indonesia / National',
    last_publication_date TEXT,
    last_retrieval_date TEXT,
    last_successful_update TEXT,
    update_method TEXT NOT NULL,              -- 'Automated Ingestion', 'Batch Import', 'Manual Audit'
    data_owner TEXT NOT NULL,                 -- Ministry/Agency name
    status TEXT NOT NULL DEFAULT 'Active' CHECK(status IN ('Active', 'Monitoring', 'Deprecated', 'Maintenance')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PUBLICATIONS (Official Publication Documents & Legal Statutory Citations)
CREATE TABLE IF NOT EXISTS publications (
    id TEXT PRIMARY KEY,                       -- e.g., 'PUB-UU-APBN-2023', 'PUB-LKPP-2023-AUDITED'
    source_id TEXT NOT NULL,
    publication_title TEXT NOT NULL,          -- e.g., 'Undang-Undang Republik Indonesia Nomor 28 Tahun 2022 tentang APBN TA 2023'
    document_number TEXT,                     -- e.g., 'UU No. 28/2022', 'BRS No. 12/02/Th. XXVII'
    publication_date TEXT NOT NULL,           -- ISO date 'YYYY-MM-DD'
    edition_period TEXT NOT NULL,             -- e.g., 'TA 2023', 'Q3 2023', 'Januari 2024'
    document_url TEXT NOT NULL,
    retrieval_date TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE RESTRICT
);

-- 3. DATASETS (Thematic Dataset Groupings)
CREATE TABLE IF NOT EXISTS datasets (
    id TEXT PRIMARY KEY,                       -- e.g., 'DS-FISCAL-NAT', 'DS-MACRO-GDP'
    code TEXT NOT NULL UNIQUE,                -- e.g., 'FISCAL_APBN_NAT'
    name TEXT NOT NULL,                       -- e.g., 'Fiskal & Keuangan Negara (APBN)'
    sector TEXT NOT NULL,                     -- e.g., 'Fiskal & Moneter'
    category TEXT NOT NULL,                   -- e.g., 'Anggaran Pendapatan dan Belanja Negara'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. INDICATORS (National Indicator Master Registry)
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

-- 5. METADATA (Standardized 24-Attribute Metadata Dictionary)
CREATE TABLE IF NOT EXISTS metadata (
    indicator_id TEXT PRIMARY KEY,
    definition TEXT NOT NULL,
    sector TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    source_data TEXT NOT NULL,
    publishing_institution TEXT NOT NULL,
    publication_document_name TEXT NOT NULL,
    data_period_coverage TEXT NOT NULL,       -- e.g., '1993 - 2024'
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

-- 6. OBSERVATIONS (National Level Observations Only - Strict Geography)
CREATE TABLE IF NOT EXISTS observations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    indicator_id TEXT NOT NULL,
    period TEXT NOT NULL,                     -- 'YYYY', 'YYYY-Q#', 'YYYY-MM'
    period_type TEXT NOT NULL CHECK(period_type IN ('Annual', 'Quarterly', 'Monthly')),
    value REAL,                               -- NULL if status is 'N/A'
    unit TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Observed', 'Provisional', 'Revised', 'N/A', 'Validation Failed')),
    geography TEXT NOT NULL DEFAULT 'Indonesia', -- STRICT NATIONAL LEVEL ONLY
    publication_id TEXT NOT NULL,
    page_reference TEXT,
    table_reference TEXT,
    version_id INTEGER DEFAULT 1,
    is_current INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (indicator_id) REFERENCES indicators(id) ON DELETE RESTRICT,
    FOREIGN KEY (publication_id) REFERENCES publications(id) ON DELETE RESTRICT,
    CONSTRAINT uq_indicator_period_version UNIQUE (indicator_id, period, version_id)
);

CREATE INDEX IF NOT EXISTS idx_obs_indicator_period ON observations (indicator_id, period);
CREATE INDEX IF NOT EXISTS idx_obs_period ON observations (period);
CREATE INDEX IF NOT EXISTS idx_obs_status ON observations (status);

-- 7. CONTEXTUAL DRIVER INFORMATION (Explanatory Provincial Drivers, NOT Provincial DB)
CREATE TABLE IF NOT EXISTS contextual_driver_information (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    indicator_id TEXT NOT NULL,
    period TEXT NOT NULL,
    province_name TEXT NOT NULL,              -- Mentioned Province (e.g. 'Maluku Utara')
    province_code TEXT NOT NULL,              -- BPS Province Code e.g. '82'
    geo_level TEXT DEFAULT 'Provinsi',        -- 'Provinsi', 'Kabupaten/Kota', 'Desa/Kawasan'
    geo_target_name TEXT,                     -- Specific administrative unit (e.g. 'Kab. Halmahera Tengah / Weda Bay')
    latitude REAL,                            -- Centroid latitude
    longitude REAL,                           -- Centroid longitude
    zoom_level INTEGER DEFAULT 7,             -- Optimized map zoom level (4-5 National, 7-8 Province, 10-12 Regency/City)
    driver_role TEXT NOT NULL,                -- e.g., 'Pendorong Utama Kenaikan Produksi', 'Sentra Pasokan Panen'
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

-- 8. CLASSIFICATION CROSSWALK (Harmonization of Historical APBN / LKPP Classifications)
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
    mapping_version TEXT NOT NULL DEFAULT 'v1.0-GFS-Harmonized',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE RESTRICT
);

-- 9. DATA VERSIONS (Immutable Audit Lineage for Revisions)
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

-- 10. UPDATE LOGS (System Data Ingestion Audit Trail)
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

-- 11. VALIDATION LOGS (Data Quality and Governance Audit Log)
CREATE TABLE IF NOT EXISTS validation_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id TEXT NOT NULL,
    indicator_id TEXT,
    period TEXT,
    validation_rule TEXT NOT NULL,            -- e.g., 'NationalGeographyValidator', 'StatusValidator'
    severity TEXT NOT NULL CHECK(severity IN ('CRITICAL', 'WARNING', 'INFO')),
    status TEXT NOT NULL CHECK(status IN ('PASSED', 'FAILED', 'FLAGGED')),
    error_details TEXT,
    original_payload TEXT,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
