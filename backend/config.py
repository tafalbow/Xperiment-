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
APP_BRAND = "DEN-DATA"
APP_TITLE = "DEN-DATA"
APP_SUBTITLE = "Pusat Basis Data Sekunder Ekonomi Nasional — Dewan Ekonomi Nasional"
APP_VERSION = "1.1.0"
GEOGRAPHIC_SCOPE = "Indonesia / National"
SERVER_PORT = 8028

# Allowed Data Statuses (Strict Governance - NO Estimated / Forecast)
ALLOWED_STATUSES = ["Observed", "Provisional", "Revised", "N/A", "Validation Failed"]

# Demo Disclaimer Notice
DEMO_DATA_DISCLAIMER = "DEMO DATA — NOT OFFICIAL DATA. Digunakan semata-mata untuk pengujian dan evaluasi arsitektur sistem."

