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
    """Initialize SQLite database with schema DDL if not already created."""
    with get_db() as conn:
        with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
            schema_sql = f.read()
        conn.executescript(schema_sql)
