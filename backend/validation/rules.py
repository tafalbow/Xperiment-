import re
from typing import Tuple, Optional, Any, Dict

class ValidationResult:
    def __init__(self, is_valid: bool, rule_name: str, severity: str = "CRITICAL", error_message: str = ""):
        self.is_valid = is_valid
        self.rule_name = rule_name
        self.severity = severity
        self.error_message = error_message

    def to_dict(self) -> Dict[str, Any]:
        return {
            "is_valid": self.is_valid,
            "rule_name": self.rule_name,
            "severity": self.severity,
            "error_message": self.error_message
        }

# 1. National Geography Validator
def validate_national_geography(geography: Optional[str]) -> ValidationResult:
    """Ensure observation geographic scope is strictly Indonesia / National."""
    if not geography:
        return ValidationResult(False, "NationalGeographyValidator", "CRITICAL", "Geographic scope cannot be empty. Must be 'Indonesia' or 'National'.")
    
    clean_geo = str(geography).strip().lower()
    valid_scopes = ["indonesia", "national", "indonesia / national", "tingkat nasional"]
    
    if clean_geo not in valid_scopes:
        return ValidationResult(
            False, 
            "NationalGeographyValidator", 
            "CRITICAL", 
            f"Scope '{geography}' is not allowed. Observation database only accepts national-level data ('Indonesia'). Sub-national or provincial observations must be stored as contextual driver notes."
        )
    return ValidationResult(True, "NationalGeographyValidator")

# 2. Status Validator (Strict Prohibition of Estimated / Forecast)
def validate_status(status: Optional[str]) -> ValidationResult:
    """Ensure data status complies with GovTech standards (NO Estimated/Forecast)."""
    if not status:
        return ValidationResult(False, "StatusValidator", "CRITICAL", "Data status is required.")
        
    allowed_statuses = ["Observed", "Provisional", "Revised", "N/A", "Validation Failed"]
    prohibited_terms = ["estimate", "forecast", "prediction", "proyeksi", "estimasi", "synthetic", "imputed"]
    
    clean_status = str(status).strip()
    
    for term in prohibited_terms:
        if term in clean_status.lower():
            return ValidationResult(
                False,
                "StatusValidator",
                "CRITICAL",
                f"Status '{status}' violates national data governance rules. Projections, forecasts, and AI estimations are strictly prohibited in the observation database."
            )
            
    if clean_status not in allowed_statuses:
        return ValidationResult(
            False,
            "StatusValidator",
            "CRITICAL",
            f"Invalid status '{status}'. Must be one of: {', '.join(allowed_statuses)}."
        )
    return ValidationResult(True, "StatusValidator")

# 3. Period Format Validator
def validate_period_format(period: Optional[str], period_type: Optional[str]) -> ValidationResult:
    """Validate temporal period syntax (YYYY, YYYY-Q#, YYYY-MM)."""
    if not period:
        return ValidationResult(False, "PeriodFormatValidator", "CRITICAL", "Period string is required.")
        
    p = str(period).strip()
    pt = str(period_type).strip().lower() if period_type else "annual"
    
    annual_pattern = r"^\d{4}$"
    quarterly_pattern = r"^\d{4}-Q[1-4]$"
    monthly_pattern = r"^\d{4}-(0[1-9]|1[0-2])$"
    
    if pt in ["annual", "tahunan"]:
        if not re.match(annual_pattern, p):
            return ValidationResult(False, "PeriodFormatValidator", "CRITICAL", f"Invalid annual period format '{p}'. Expected 'YYYY' (e.g., 2024).")
    elif pt in ["quarterly", "triwulanan"]:
        if not re.match(quarterly_pattern, p):
            return ValidationResult(False, "PeriodFormatValidator", "CRITICAL", f"Invalid quarterly period format '{p}'. Expected 'YYYY-Q#' (e.g., 2023-Q3).")
    elif pt in ["monthly", "bulanan"]:
        if not re.match(monthly_pattern, p):
            return ValidationResult(False, "PeriodFormatValidator", "CRITICAL", f"Invalid monthly period format '{p}'. Expected 'YYYY-MM' (e.g., 2024-05).")
    else:
        # Generic match across any standard
        if not (re.match(annual_pattern, p) or re.match(quarterly_pattern, p) or re.match(monthly_pattern, p)):
            return ValidationResult(False, "PeriodFormatValidator", "CRITICAL", f"Unrecognized period format '{p}'.")
            
    return ValidationResult(True, "PeriodFormatValidator")

# 4. Number Format & Missing Value Validator
def validate_number_and_value(value: Any, status: str) -> ValidationResult:
    """Validate numerical integrity and ensure N/A consistency."""
    if status == "N/A":
        if value is not None:
            return ValidationResult(False, "MissingValueValidator", "WARNING", f"Status is 'N/A' but numeric value {value} was provided. Value should be NULL/None.")
        return ValidationResult(True, "MissingValueValidator")
        
    if value is None:
        if status in ["Observed", "Provisional", "Revised"]:
            return ValidationResult(False, "NumberFormatValidator", "CRITICAL", f"Missing numeric value for status '{status}'. Status should be marked 'N/A'.")
        return ValidationResult(True, "NumberFormatValidator")
        
    try:
        val_float = float(value)
        import math
        if math.isnan(val_float) or math.isinf(val_float):
            return ValidationResult(False, "NumberFormatValidator", "CRITICAL", f"Invalid numeric value (NaN or Inf) detected: {value}.")
    except (ValueError, TypeError):
        return ValidationResult(False, "NumberFormatValidator", "CRITICAL", f"Value '{value}' could not be converted to a valid number.")
        
    return ValidationResult(True, "NumberFormatValidator")

# 5. Logical Consistency Validator
def validate_logical_consistency(indicator_id: str, value: Optional[float], unit: str) -> ValidationResult:
    """Check domain-specific logical boundaries (e.g. non-negative volume)."""
    if value is None:
        return ValidationResult(True, "LogicalConsistencyValidator")
        
    # Physical production volumes, headcounts, areas cannot be negative
    lower_unit = unit.lower()
    non_negative_units = ["ribu ton", "ton", "hektar", "juta jiwa", "barel/hari", "mw", "gwh"]
    
    if any(u in lower_unit for u in non_negative_units):
        if value < 0:
            return ValidationResult(
                False,
                "LogicalConsistencyValidator",
                "CRITICAL",
                f"Negative value {value} is mathematically impossible for physical unit '{unit}'."
            )
            
    return ValidationResult(True, "LogicalConsistencyValidator")
