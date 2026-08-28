import sqlite3
from typing import Dict, Any, Optional, List
from backend.database.connection import get_db

class MetadataService:
    """Manages standardized 24-attribute metadata dictionary and complete data provenance lineage."""

    @staticmethod
    def get_indicator_metadata(indicator_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves full 24-point standardized metadata for a specific national indicator."""
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    m.*,
                    i.unique_variable_code,
                    i.name as indicator_name,
                    i.frequency as base_frequency,
                    d.name as dataset_name
                FROM metadata m
                JOIN indicators i ON m.indicator_id = i.id
                JOIN datasets d ON i.dataset_id = d.id
                WHERE m.indicator_id = ?
            """, (indicator_id,))
            row = cur.fetchone()
            if not row:
                return None
            return dict(row)

    @staticmethod
    def get_all_metadata_catalog() -> List[Dict[str, Any]]:
        """Retrieves all indicators' standardized metadata for data dictionary catalog view."""
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("""
                SELECT 
                    m.indicator_id,
                    i.unique_variable_code,
                    i.name as indicator_name,
                    m.sector,
                    m.category,
                    m.subcategory,
                    m.publishing_institution,
                    m.unit,
                    m.frequency,
                    m.geographic_scope,
                    m.data_period_coverage,
                    m.definition,
                    m.methodology,
                    m.calculation_formula,
                    m.source_url
                FROM metadata m
                JOIN indicators i ON m.indicator_id = i.id
                ORDER BY m.sector, m.category, i.name
            """)
            return [dict(r) for r in cur.fetchall()]

    @staticmethod
    def trace_data_provenance(observation_id: int) -> Optional[Dict[str, Any]]:
        """
        Traces complete lineage of an observation:
        Observation -> Indicator -> Dataset -> Publication -> Source Institution -> URL -> Page/Table -> Retrieval Date -> Version History.
        """
        with get_db() as conn:
            cur = conn.cursor()

            # Main observation + publication + source details
            cur.execute("""
                SELECT 
                    o.id as observation_id,
                    o.indicator_id,
                    i.name as indicator_name,
                    i.unique_variable_code,
                    d.name as dataset_name,
                    d.sector,
                    d.category,
                    o.period,
                    o.value,
                    o.unit,
                    o.status,
                    o.geography,
                    o.version_id,
                    o.page_reference,
                    o.table_reference,
                    o.created_at,
                    o.updated_at,
                    p.id as publication_id,
                    p.publication_title,
                    p.document_number,
                    p.publication_date,
                    p.document_url,
                    p.document_url as source_url,
                    p.retrieval_date,
                    s.id as source_id,
                    s.institution_name as source_institution,
                    s.institution_type,
                    s.source_url as official_institution_url,
                    s.data_owner,
                    m.methodology,
                    m.data_status_policy
                FROM observations o
                JOIN indicators i ON o.indicator_id = i.id
                JOIN datasets d ON i.dataset_id = d.id
                JOIN metadata m ON i.id = m.indicator_id
                JOIN publications p ON o.publication_id = p.id
                JOIN sources s ON p.source_id = s.id
                WHERE o.id = ?
            """, (observation_id,))
            obs = cur.fetchone()
            if not obs:
                return None

            obs_dict = dict(obs)

            # Revision history from data_versions
            cur.execute("""
                SELECT 
                    dv.version_number,
                    dv.previous_value,
                    dv.new_value,
                    dv.previous_status,
                    dv.new_status,
                    dv.change_reason,
                    dv.revision_date,
                    p.publication_title as revised_in_publication
                FROM data_versions dv
                LEFT JOIN publications p ON dv.revised_by_publication_id = p.id
                WHERE dv.indicator_id = ? AND dv.period = ?
                ORDER BY dv.version_number ASC
            """, (obs_dict["indicator_id"], obs_dict["period"]))
            revisions = [dict(r) for r in cur.fetchall()]

            obs_dict["revision_history"] = revisions
            return obs_dict
