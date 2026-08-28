import sqlite3
from typing import Dict, Any, List, Optional
from backend.database.connection import get_db

class SearchService:
    """Provides high-performance national data filtering, multi-criteria search, and descriptive KPIs."""

    @staticmethod
    def get_filter_options() -> Dict[str, Any]:
        """Returns cascading filter hierarchy: Sektor -> Kategori -> Subkategori -> Indikator, plus sources and periods."""
        with get_db() as conn:
            cur = conn.cursor()

            # Sectors & Datasets Hierarchy (Unique per indicator)
            cur.execute("""
                SELECT DISTINCT 
                    d.sector, 
                    d.category, 
                    m.subcategory, 
                    i.id as indicator_id, 
                    i.name as indicator_name, 
                    i.frequency, 
                    i.unit, 
                    m.publishing_institution as source_name
                FROM indicators i
                JOIN datasets d ON i.dataset_id = d.id
                JOIN metadata m ON i.id = m.indicator_id
                WHERE i.is_active = 1
                ORDER BY d.sector, d.category, m.subcategory, i.name
            """)
            rows = cur.fetchall()

            sectors_map = {}
            seen_indicator_keys = set()

            for r in rows:
                sec = r["sector"]
                cat = r["category"]
                subcat = r["subcategory"]
                ind_id = r["indicator_id"]
                ind_name = r["indicator_name"]

                key = (sec, cat, subcat, ind_id)
                if key in seen_indicator_keys:
                    continue
                seen_indicator_keys.add(key)

                if sec not in sectors_map:
                    sectors_map[sec] = {}
                if cat not in sectors_map[sec]:
                    sectors_map[sec][cat] = {}
                if subcat not in sectors_map[sec][cat]:
                    sectors_map[sec][cat][subcat] = []

                sectors_map[sec][cat][subcat].append({
                    "id": ind_id,
                    "name": ind_name,
                    "unit": r["unit"],
                    "frequency": r["frequency"],
                    "source_name": r["source_name"]
                })

            # Flat unique indicators list
            cur.execute("""
                SELECT DISTINCT i.id, i.name, i.unit, i.frequency, d.sector, d.category, m.subcategory, m.publishing_institution as source_name
                FROM indicators i
                JOIN datasets d ON i.dataset_id = d.id
                JOIN metadata m ON i.id = m.indicator_id
                WHERE i.is_active = 1
                ORDER BY d.sector, i.name
            """)
            flat_indicators = [dict(r) for r in cur.fetchall()]

            # Sources
            cur.execute("SELECT id, institution_name, dataset_name, frequency, update_method, status FROM sources ORDER BY institution_name")
            sources = [dict(r) for r in cur.fetchall()]

            # Min & Max Periods in DB
            cur.execute("SELECT MIN(period) as min_period, MAX(period) as max_period, COUNT(DISTINCT id) as total_obs FROM observations")
            stat = cur.fetchone()

            cur.execute("SELECT COUNT(DISTINCT id) as total_indicators FROM indicators")
            ind_stat = cur.fetchone()

            cur.execute("SELECT COUNT(DISTINCT id) as total_datasets FROM datasets")
            ds_stat = cur.fetchone()

            return {
                "hierarchy": sectors_map,
                "indicators": flat_indicators,
                "sources": sources,
                "statistics": {
                    "min_period": stat["min_period"] if stat else "1993",
                    "max_period": stat["max_period"] if stat else "2024",
                    "total_observations": stat["total_obs"] if stat else 0,
                    "total_indicators": ind_stat["total_indicators"] if ind_stat else 0,
                    "total_datasets": ds_stat["total_datasets"] if ds_stat else 0
                }
            }

    @staticmethod
    def query_observations(
        sector: Optional[str] = None,
        category: Optional[str] = None,
        subcategory: Optional[str] = None,
        indicator_id: Optional[str] = None,
        start_year: Optional[int] = None,
        end_year: Optional[int] = None,
        source_id: Optional[str] = None,
        status: Optional[str] = None,
        search_keyword: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
        sort_by: str = "period",
        sort_order: str = "DESC"
    ) -> Dict[str, Any]:
        """Queries national observations with sorting, pagination, and multi-filter criteria."""
        with get_db() as conn:
            cur = conn.cursor()

            query_conditions = ["o.is_current = 1"]
            params = []

            if indicator_id:
                query_conditions.append("o.indicator_id = ?")
                params.append(indicator_id)

            if sector:
                query_conditions.append("d.sector = ?")
                params.append(sector)

            if category:
                query_conditions.append("d.category = ?")
                params.append(category)

            if subcategory:
                query_conditions.append("m.subcategory = ?")
                params.append(subcategory)

            if source_id:
                query_conditions.append("s.id = ?")
                params.append(source_id)

            if status:
                query_conditions.append("o.status = ?")
                params.append(status)

            if start_year:
                query_conditions.append("CAST(SUBSTR(o.period, 1, 4) AS INTEGER) >= ?")
                params.append(start_year)

            if end_year:
                query_conditions.append("CAST(SUBSTR(o.period, 1, 4) AS INTEGER) <= ?")
                params.append(end_year)

            if search_keyword:
                kw = f"%{search_keyword.strip()}%"
                query_conditions.append("(i.name LIKE ? OR i.unique_variable_code LIKE ? OR d.name LIKE ? OR d.sector LIKE ? OR d.category LIKE ? OR m.subcategory LIKE ? OR s.institution_name LIKE ? OR m.definition LIKE ? OR m.methodology_notes LIKE ? OR p.publication_title LIKE ?)")
                params.extend([kw, kw, kw, kw, kw, kw, kw, kw, kw, kw])

            where_clause = " AND ".join(query_conditions)

            # Count total
            count_sql = f"""
                SELECT COUNT(*) as cnt
                FROM observations o
                JOIN indicators i ON o.indicator_id = i.id
                JOIN datasets d ON i.dataset_id = d.id
                JOIN metadata m ON i.id = m.indicator_id
                JOIN publications p ON o.publication_id = p.id
                JOIN sources s ON p.source_id = s.id
                WHERE {where_clause}
            """
            cur.execute(count_sql, params)
            total_count = cur.fetchone()["cnt"]

            # Sort mapping
            allowed_sorts = {
                "period": "o.period",
                "value": "o.value",
                "indicator_name": "i.name",
                "status": "o.status",
                "updated_at": "o.updated_at"
            }
            order_col = allowed_sorts.get(sort_by.lower(), "o.period")
            order_dir = "ASC" if sort_order.upper() == "ASC" else "DESC"

            # Fetch rows
            select_sql = f"""
                SELECT 
                    o.id,
                    o.indicator_id,
                    i.name as indicator_name,
                    i.unique_variable_code,
                    d.sector,
                    d.category,
                    m.subcategory,
                    o.period,
                    o.period_type,
                    o.value,
                    o.unit,
                    o.status,
                    o.geography,
                    o.version_id,
                    p.id as publication_id,
                    p.publication_title,
                    p.document_number,
                    p.publication_date,
                    p.edition_period,
                    p.document_url,
                    s.id as source_id,
                    s.institution_name as source_institution,
                    s.institution_type,
                    s.source_url,
                    s.data_owner,
                    o.page_reference,
                    o.table_reference,
                    o.updated_at
                FROM observations o
                JOIN indicators i ON o.indicator_id = i.id
                JOIN datasets d ON i.dataset_id = d.id
                JOIN metadata m ON i.id = m.indicator_id
                JOIN publications p ON o.publication_id = p.id
                JOIN sources s ON p.source_id = s.id
                WHERE {where_clause}
                ORDER BY {order_col} {order_dir}
                LIMIT ? OFFSET ?
            """
            cur.execute(select_sql, params + [limit, offset])
            records = [dict(r) for r in cur.fetchall()]

            page = (offset // limit) + 1 if limit > 0 else 1
            total_pages = (total_count + limit - 1) // limit if limit > 0 else 1

            return {
                "total_records": total_count,
                "page": page,
                "page_size": limit,
                "total_pages": total_pages,
                "records": records,
                "disclaimer": "DEMO DATA — NOT OFFICIAL DATA"
            }

    @staticmethod
    def get_descriptive_kpi(indicator_id: str) -> Dict[str, Any]:
        """
        Computes strict descriptive KPIs for a given national indicator.
        No forecasting or synthetic surplus/deficit where irrelevant.
        """
        with get_db() as conn:
            cur = conn.cursor()

            # Indicator master info
            cur.execute("SELECT id, name, unit FROM indicators WHERE id = ?", (indicator_id,))
            ind = cur.fetchone()
            if not ind:
                return {}

            # All time series in chronological order
            cur.execute("""
                SELECT period, value, status 
                FROM observations 
                WHERE indicator_id = ? AND is_current = 1
                ORDER BY period ASC
            """, (indicator_id,))
            rows = [dict(r) for r in cur.fetchall()]

            if not rows:
                return {
                    "indicator_id": ind["id"],
                    "indicator_name": ind["name"],
                    "unit": ind["unit"],
                    "total_observed_periods": 0,
                    "missing_periods_count": 0
                }

            # Filter valid observed/provisional/revised numerical values
            valid_nums = [r for r in rows if r["value"] is not None and r["status"] in ["Observed", "Provisional", "Revised"]]
            missing_count = sum(1 for r in rows if r["status"] == "N/A" or r["value"] is None)

            latest_item = valid_nums[-1] if valid_nums else None
            prev_item = valid_nums[-2] if len(valid_nums) >= 2 else None

            # Calculate YoY Change
            yoy_pct = None
            yoy_abs = None
            if latest_item and prev_item and prev_item["value"] is not None and prev_item["value"] != 0:
                yoy_abs = round(latest_item["value"] - prev_item["value"], 2)
                yoy_pct = round(((latest_item["value"] - prev_item["value"]) / abs(prev_item["value"])) * 100, 2)

            # High, Low, Mean
            highest_item = max(valid_nums, key=lambda x: x["value"]) if valid_nums else None
            lowest_item = min(valid_nums, key=lambda x: x["value"]) if valid_nums else None
            mean_val = round(sum(r["value"] for r in valid_nums) / len(valid_nums), 2) if valid_nums else None

            return {
                "indicator_id": ind["id"],
                "indicator_name": ind["name"],
                "unit": ind["unit"],
                "latest_period": latest_item["period"] if latest_item else None,
                "latest_value": latest_item["value"] if latest_item else None,
                "latest_status": latest_item["status"] if latest_item else "N/A",
                "previous_period": prev_item["period"] if prev_item else None,
                "previous_value": prev_item["value"] if prev_item else None,
                "yoy_change_pct": yoy_pct,
                "yoy_change_abs": yoy_abs,
                "highest_value": highest_item["value"] if highest_item else None,
                "highest_period": highest_item["period"] if highest_item else None,
                "lowest_value": lowest_item["value"] if lowest_item else None,
                "lowest_period": lowest_item["period"] if lowest_item else None,
                "national_mean": mean_val,
                "total_observed_periods": len(valid_nums),
                "missing_periods_count": missing_count
            }
