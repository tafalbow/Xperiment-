import sqlite3
from contextlib import contextmanager
from typing import Generator
from backend.config import DATABASE_PATH, SCHEMA_PATH

def get_db_connection() -> sqlite3.Connection:
    """Create a thread-safe SQLite connection with dict rows and foreign keys enabled."""
    conn = sqlite3.connect(DATABASE_PATH, timeout=20.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.execute("PRAGMA journal_mode = WAL;")
    return conn

@contextmanager
def get_db() -> Generator[sqlite3.Connection, None, None]:
    """Context manager for SQLite transaction management."""
    conn = get_db_connection()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_database():
    """Initialize SQLite database with schema DDL and apply column migrations."""
    with get_db() as conn:
        cur = conn.cursor()

        # Check if observations table exists and migrate columns before index creation
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='observations'")
        if cur.fetchone():
            cur.execute("PRAGMA table_info(observations)")
            obs_cols = [r["name"] for r in cur.fetchall()]

            if "provenance_id" not in obs_cols:
                cur.execute("ALTER TABLE observations ADD COLUMN provenance_id TEXT")
            if "publication_date" not in obs_cols:
                cur.execute("ALTER TABLE observations ADD COLUMN publication_date TEXT")
            if "extraction_method" not in obs_cols:
                cur.execute("ALTER TABLE observations ADD COLUMN extraction_method TEXT")
            if "transformation_status" not in obs_cols:
                cur.execute("ALTER TABLE observations ADD COLUMN transformation_status TEXT")
            if "notes" not in obs_cols:
                cur.execute("ALTER TABLE observations ADD COLUMN notes TEXT")
            if "source_document_id" not in obs_cols:
                cur.execute("ALTER TABLE observations ADD COLUMN source_document_id TEXT")

        # Check if datasets table exists and migrate columns
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='datasets'")
        if cur.fetchone():
            cur.execute("PRAGMA table_info(datasets)")
            ds_cols = [r["name"] for r in cur.fetchall()]

            if "access_status" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN access_status TEXT DEFAULT 'PUBLIC_DOWNLOAD_OPEN'")
            if "download_allowed" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN download_allowed INTEGER DEFAULT 1")
            if "download_requires_login" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN download_requires_login INTEGER DEFAULT 0")
            if "license_type" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN license_type TEXT DEFAULT 'Government Open Data (Pemerintah RI)'")
            if "access_notes" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN access_notes TEXT")
            if "latest_period" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN latest_period TEXT")
            if "latest_value" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN latest_value REAL")
            if "latest_status" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN latest_status TEXT")
            if "frequency" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN frequency TEXT DEFAULT 'Tahunan'")
            if "unit" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN unit TEXT")
            if "coverage" not in ds_cols:
                cur.execute("ALTER TABLE datasets ADD COLUMN coverage TEXT DEFAULT 'Indonesia / National'")

        with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
            schema_sql = f.read()
        conn.executescript(schema_sql)

        # Backfill observations provenance_id and publication_date if null
        cur.execute("""
            UPDATE observations
            SET provenance_id = 'PRV-' || indicator_id || '-' || period
            WHERE provenance_id IS NULL OR provenance_id = ''
        """)
        cur.execute("""
            UPDATE observations
            SET publication_date = (SELECT publication_date FROM publications WHERE publications.id = observations.publication_id)
            WHERE publication_date IS NULL OR publication_date = ''
        """)
        cur.execute("""
            UPDATE observations
            SET extraction_method = 'Extracted and harmonized by INDOEKONOMI data from official source'
            WHERE extraction_method IS NULL OR extraction_method = ''
        """)
        cur.execute("""
            UPDATE observations
            SET transformation_status = 'Harmonized Standard'
            WHERE transformation_status IS NULL OR transformation_status = ''
        """)
