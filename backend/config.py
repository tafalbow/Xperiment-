import os
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATABASE_PATH = DATA_DIR / "national_data.db"
SCHEMA_PATH = BASE_DIR / "backend" / "database" / "schema.sql"
STATIC_DIR = BASE_DIR / "frontend"

# Ensure data directory exists
DATA_DIR.mkdir(parents=True, exist_ok=True)

# System constants
APP_BRAND = "INDOEKONOMI data"
APP_WEB_IDENTIFIER = "INDOEKONOMI data"
APP_DOMAIN = "indoekonomi.data.go.id"
APP_TITLE = "INDOEKONOMI data — Indonesia Economic Data Observatory"
APP_SUBTITLE = "Pusat Basis Data Sekunder Ekonomi Nasional | INDOEKONOMI data"
APP_VERSION = "2.0.0"
GEOGRAPHIC_SCOPE = "Indonesia / National"
SERVER_PORT = 8028

# Controlled Access Statuses (Section 27)
ACCESS_STATUSES = [
    "PUBLIC_DOWNLOAD_OPEN",
    "PUBLIC_DOWNLOAD_AFTER_LOGIN",
    "PUBLIC_VIEW_ONLY",
    "LINK_TO_ORIGINAL_ONLY",
    "METADATA_ONLY",
    "RESTRICTED",
    "ARCHIVED",
    "UNDER_REVIEW"
]

# Allowed Observation Statuses (Strict Governance - Preserving Fiscal & Analytical Dimensions)
ALLOWED_STATUSES = [
    "PROPOSED",               # RAPBN / Usulan Awal
    "APPROVED",               # APBN Disahkan UU
    "REVISED",                # APBN-P / Revisi Perpres
    "REALIZED",               # Realisasi
    "REALIZED_PRELIMINARY",   # Realisasi Sementara (APBN Kita)
    "REALIZED_AUDITED",       # Realisasi Final Audited BPK RI (LKPP)
    "Observed",               # Angka Realisasi / Teramati
    "Provisional",            # Angka Sementara
    "Estimated",              # Angka Estimasi Resmi
    "Forecast",               # Proyeksi Statutori
    "N/A",                    # Belum Tersedia
    "Validation Failed"
]

# Time-Series Window Constraints (Section 22 & 23)
DEFAULT_WINDOW_MONTHLY = 18   # Maximum 18 months for monthly/higher frequency
DEFAULT_WINDOW_ANNUAL = 12    # Maximum 12 years for annual frequency

# Demo Disclaimer Notice
DEMO_DATA_DISCLAIMER = "DEMO DATA — NOT OFFICIAL DATA. Digunakan semata-mata untuk pengujian dan evaluasi arsitektur sistem INDOEKONOMI data."

