import time
import uuid
import datetime
from typing import List, Dict, Any, Tuple
from backend.database.connection import get_db
from backend.validation.validator import DataValidator
from backend.ingestion.api_connector import ApiConnector
from backend.ingestion.csv_connector import CsvExcelConnector
from backend.ingestion.pdf_connector import PdfDocumentConnector

class IngestionPipeline:
    """
    End-to-End Orchestrator:
    Source Registry -> Retrieval -> Parsing -> Validation -> Versioning -> Database Commit -> Audit Logging.
    """

    CONNECTORS = {
        "api": ApiConnector,
        "csv": CsvExcelConnector,
        "pdf": PdfDocumentConnector
    }

    @classmethod
    def run_connector_ingestion(cls, source_id: str, connector_type: str = "api") -> Dict[str, Any]:
        """Runs automated ingestion from a registered connector."""
        start_time = time.time()
        connector_cls = cls.CONNECTORS.get(connector_type.lower(), ApiConnector)
        connector = connector_cls(source_id=source_id)

        try:
            raw_data = connector.fetch_raw_data()
            records = connector.parse_records(raw_data)
            return cls.process_records(source_id=source_id, records=records, start_time=start_time, update_type=f"Connector Ingestion ({connector_type.upper()})")
        except Exception as e:
            elapsed_ms = int((time.time() - start_time) * 1000)
            cls._log_update(source_id=source_id, update_type=f"Connector Ingestion ({connector_type.upper()})", status="FAILED", fetched=0, inserted=0, updated=0, duration_ms=elapsed_ms, message=str(e))
            return {
                "success": False,
                "message": f"Ingestion connector failed: {str(e)}",
                "records_processed": 0
            }

    @classmethod
    def process_records(cls, source_id: str, records: List[Dict[str, Any]], start_time: float = None, update_type: str = "Manual API Ingestion") -> Dict[str, Any]:
        """Validates, versions, and commits observation records into national database."""
        if start_time is None:
            start_time = time.time()

        batch_id = f"INGEST-{uuid.uuid4().hex[:8].upper()}"
        is_all_valid, passed_records, failed_records = DataValidator.validate_and_log_batch(records, batch_id)

        inserted_count = 0
        updated_count = 0

        with get_db() as conn:
            cur = conn.cursor()

            for rec in passed_records:
                ind_id = rec["indicator_id"]
                period = rec["period"]
                period_type = rec.get("period_type", "Annual")
                val = rec.get("value")
                unit = rec["unit"]
                status = rec.get("status", "Observed")
                geography = rec.get("geography", "Indonesia")
                pub_id = rec["publication_id"]
                page_ref = rec.get("page_reference", "")
                table_ref = rec.get("table_reference", "")

                # Check existing observation
                cur.execute("""
                    SELECT id, value, status, version_id, publication_id 
                    FROM observations 
                    WHERE indicator_id = ? AND period = ? AND is_current = 1
                """, (ind_id, period))
                existing = cur.fetchone()

                if existing:
                    existing_id = existing["id"]
                    old_val = existing["value"]
                    old_status = existing["status"]
                    old_version = existing["version_id"] or 1

                    # If value or status has changed, version it!
                    if (old_val != val) or (old_status != status):
                        new_version = old_version + 1
                        change_reason = f"Data revision from {old_status} ({old_val}) to {status} ({val}) cited in {pub_id}"
                        today_str = datetime.date.today().isoformat()

                        # Record revision in data_versions
                        cur.execute("""
                            INSERT INTO data_versions (indicator_id, period, version_number, previous_value, new_value, previous_status, new_status, change_reason, revised_by_publication_id, revision_date)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (ind_id, period, old_version, old_val, val, old_status, status, change_reason, pub_id, today_str))

                        # Update observation
                        cur.execute("""
                            UPDATE observations
                            SET value = ?, status = ?, publication_id = ?, page_reference = ?, table_reference = ?, version_id = ?, updated_at = CURRENT_TIMESTAMP
                            WHERE id = ?
                        """, (val, status, pub_id, page_ref, table_ref, new_version, existing_id))
                        updated_count += 1
                else:
                    # New observation record
                    cur.execute("""
                        INSERT INTO observations (indicator_id, period, period_type, value, unit, status, geography, publication_id, page_reference, table_reference, version_id, is_current)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)
                    """, (ind_id, period, period_type, val, unit, status, geography, pub_id, page_ref, table_ref))
                    inserted_count += 1

            # Update Source Registry last_successful_update
            cur.execute("""
                UPDATE sources 
                SET last_successful_update = CURRENT_TIMESTAMP, last_retrieval_date = CURRENT_TIMESTAMP 
                WHERE id = ?
            """, (source_id,))

        elapsed_ms = int((time.time() - start_time) * 1000)
        overall_status = "SUCCESS" if len(failed_records) == 0 else ("PARTIAL" if inserted_count + updated_count > 0 else "FAILED")
        log_msg = f"Processed {len(records)} records: {inserted_count} inserted, {updated_count} revised/updated, {len(failed_records)} validation failures."

        cls._log_update(
            source_id=source_id,
            update_type=update_type,
            status=overall_status,
            fetched=len(records),
            inserted=inserted_count,
            updated=updated_count,
            duration_ms=elapsed_ms,
            message=log_msg
        )

        return {
            "success": overall_status in ["SUCCESS", "PARTIAL"],
            "batch_id": batch_id,
            "status": overall_status,
            "records_total": len(records),
            "records_inserted": inserted_count,
            "records_updated": updated_count,
            "records_failed": len(failed_records),
            "failed_details": failed_records,
            "execution_time_ms": elapsed_ms,
            "disclaimer": "DEMO DATA — NOT OFFICIAL DATA"
        }

    @staticmethod
    def _log_update(source_id: str, update_type: str, status: str, fetched: int, inserted: int, updated: int, duration_ms: int, message: str):
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("""
                INSERT INTO update_logs (source_id, update_type, status, records_fetched, records_inserted, records_updated, execution_time_ms, log_message)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (source_id, update_type, status, fetched, inserted, updated, duration_ms, message))
