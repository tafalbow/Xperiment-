import uuid
import json
import sqlite3
from typing import List, Dict, Any, Tuple
from backend.validation.rules import (
    validate_national_geography,
    validate_status,
    validate_period_format,
    validate_number_and_value,
    validate_logical_consistency,
    ValidationResult
)
from backend.database.connection import get_db

class DataValidator:
    """Orchestrates comprehensive data quality validation for national secondary observations."""

    @staticmethod
    def validate_record(record: Dict[str, Any], conn: sqlite3.Connection = None) -> List[ValidationResult]:
        """Runs all validation rules on a single record."""
        results: List[ValidationResult] = []

        # 1. Geographic Scope
        geo = record.get("geography", "Indonesia")
        results.append(validate_national_geography(geo))

        # 2. Data Status
        status = record.get("status", "Observed")
        results.append(validate_status(status))

        # 3. Period Format
        period = record.get("period")
        period_type = record.get("period_type", "Annual")
        results.append(validate_period_format(period, period_type))

        # 4. Number Format & N/A
        val = record.get("value")
        results.append(validate_number_and_value(val, status))

        # 5. Logical Consistency
        unit = record.get("unit", "")
        ind_id = record.get("indicator_id", "")
        val_float = None
        try:
            if val is not None:
                val_float = float(val)
        except Exception:
            pass
        results.append(validate_logical_consistency(ind_id, val_float, unit))

        # 6. Database Integrity (if connection provided)
        if conn and ind_id:
            cur = conn.cursor()
            cur.execute("SELECT id FROM indicators WHERE id = ?", (ind_id,))
            if not cur.fetchone():
                results.append(ValidationResult(
                    False, 
                    "IndicatorIntegrityValidator", 
                    "CRITICAL", 
                    f"Indicator ID '{ind_id}' does not exist in master indicator registry."
                ))

            pub_id = record.get("publication_id")
            if pub_id:
                cur.execute("SELECT id FROM publications WHERE id = ?", (pub_id,))
                if not cur.fetchone():
                    results.append(ValidationResult(
                        False,
                        "PublicationIntegrityValidator",
                        "CRITICAL",
                        f"Publication ID '{pub_id}' does not exist in publication registry."
                    ))

        return results

    @classmethod
    def validate_and_log_batch(cls, records: List[Dict[str, Any]], batch_id: str = None) -> Tuple[bool, List[Dict[str, Any]], List[Dict[str, Any]]]:
        """Validates a batch of records and writes audit logs for any violations."""
        if not batch_id:
            batch_id = f"BATCH-{uuid.uuid4().hex[:8].upper()}"

        passed_records = []
        failed_records = []

        with get_db() as conn:
            cur = conn.cursor()
            for rec in records:
                results = cls.validate_record(rec, conn)
                critical_errors = [r for r in results if not r.is_valid and r.severity == "CRITICAL"]
                warnings = [r for r in results if not r.is_valid and r.severity == "WARNING"]

                if critical_errors:
                    err_msg = "; ".join([r.error_message for r in critical_errors])
                    rule_names = ", ".join([r.rule_name for r in critical_errors])
                    cur.execute("""
                        INSERT INTO validation_logs (batch_id, indicator_id, period, validation_rule, severity, status, error_details, original_payload)
                        VALUES (?, ?, ?, ?, 'CRITICAL', 'FAILED', ?, ?)
                    """, (batch_id, rec.get("indicator_id"), rec.get("period"), rule_names, err_msg, json.dumps(rec)))
                    
                    failed_records.append({
                        "record": rec,
                        "errors": [r.error_message for r in critical_errors]
                    })
                else:
                    if warnings:
                        warn_msg = "; ".join([r.error_message for r in warnings])
                        cur.execute("""
                            INSERT INTO validation_logs (batch_id, indicator_id, period, validation_rule, severity, status, error_details, original_payload)
                            VALUES (?, ?, ?, 'ValidationWarning', 'WARNING', 'FLAGGED', ?, ?)
                        """, (batch_id, rec.get("indicator_id"), rec.get("period"), warn_msg, json.dumps(rec)))
                    
                    # Passed record
                    cur.execute("""
                        INSERT INTO validation_logs (batch_id, indicator_id, period, validation_rule, severity, status, error_details, original_payload)
                        VALUES (?, ?, ?, 'AllRules', 'INFO', 'PASSED', 'Validation successful', ?)
                    """, (batch_id, rec.get("indicator_id"), rec.get("period"), json.dumps(rec)))
                    passed_records.append(rec)

        is_all_valid = (len(failed_records) == 0)
        return is_all_valid, passed_records, failed_records
