import pytest
from backend.validation.rules import (
    validate_national_geography,
    validate_status,
    validate_period_format,
    validate_number_and_value,
    validate_logical_consistency
)
from backend.validation.validator import DataValidator

def test_national_geography_validator():
    # Valid
    assert validate_national_geography("Indonesia").is_valid is True
    assert validate_national_geography("National").is_valid is True
    assert validate_national_geography("Indonesia / National").is_valid is True

    # Invalid - Provincial scope attempted in observation table
    res = validate_national_geography("Jawa Timur")
    assert res.is_valid is False
    assert "observation database only accepts national-level data" in res.error_message.lower()

    res2 = validate_national_geography("Kabupaten Lamongan")
    assert res2.is_valid is False

def test_status_validator_prohibits_forecast():
    # Valid statuses
    assert validate_status("Observed").is_valid is True
    assert validate_status("Provisional").is_valid is True
    assert validate_status("Revised").is_valid is True
    assert validate_status("N/A").is_valid is True

    # Prohibited statuses
    assert validate_status("Forecast").is_valid is False
    assert validate_status("Estimated").is_valid is False
    assert validate_status("Proyeksi 2026").is_valid is False
    assert validate_status("Synthetic Imputation").is_valid is False

def test_period_format_validator():
    # Annual
    assert validate_period_format("2024", "Annual").is_valid is True
    assert validate_period_format("24", "Annual").is_valid is False
    assert validate_period_format("2024-Q1", "Annual").is_valid is False

    # Quarterly
    assert validate_period_format("2023-Q3", "Quarterly").is_valid is True
    assert validate_period_format("2023-Q5", "Quarterly").is_valid is False

    # Monthly
    assert validate_period_format("2024-05", "Monthly").is_valid is True
    assert validate_period_format("2024-13", "Monthly").is_valid is False

def test_number_and_na_validator():
    # Valid Observed
    assert validate_number_and_value(123.45, "Observed").is_valid is True

    # Valid N/A with None
    assert validate_number_and_value(None, "N/A").is_valid is True

    # Missing value for Observed
    assert validate_number_and_value(None, "Observed").is_valid is False

    # Invalid non-numeric string
    assert validate_number_and_value("not_a_number", "Observed").is_valid is False

def test_logical_consistency_non_negative():
    # Rice production cannot be negative
    assert validate_logical_consistency("IND-RICE-PROD-NAT", 31.5, "Juta Ton").is_valid is True
    assert validate_logical_consistency("IND-RICE-PROD-NAT", -5.0, "Juta Ton").is_valid is False
