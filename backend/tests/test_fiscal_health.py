"""
Unit Tests for Fiscal Health Dashboard & Sovereign Budget Sustainability
"""

import pytest
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.fiscal_health_service import FiscalHealthService


@pytest.fixture
def client():
    return TestClient(app)


def test_fiscal_health_10_core_kpis():
    """Verify 10 Core KPIs structure, values, and impact notes."""
    kpis = FiscalHealthService.get_10_core_kpis()
    assert len(kpis) == 10
    
    expected_ids = [
        "FISCAL_BALANCE_GDP", "PRIMARY_BALANCE_GDP", "TAX_RATIO", "REVENUE_GDP",
        "FISCAL_SPACE", "DEBT_GDP", "INTEREST_REVENUE", "DEBT_SERVICE_REVENUE",
        "CAPEX_EXPENDITURE", "SUBSIDY_EXPENDITURE"
    ]
    actual_ids = [k["id"] for k in kpis]
    assert actual_ids == expected_ids

    for k in kpis:
        assert "name" in k
        assert "formula" in k
        assert "guiding_question" in k
        assert "formatted_value" in k
        assert "yoy_formatted" in k
        assert "mom_formatted" in k
        assert "impact_point" in k
        assert len(k["impact_point"]) > 20
        assert "calculation_provenance" in k


def test_api_fiscal_health_kpis_endpoint(client):
    """Test /api/lkpp/fiscal-health/kpis endpoint."""
    response = client.get("/api/lkpp/fiscal-health/kpis")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["total_kpis"] == 10
    assert len(data["kpis"]) == 10


def test_api_fiscal_health_dimensions_endpoint(client):
    """Test /api/lkpp/fiscal-health/dimensions endpoint."""
    response = client.get("/api/lkpp/fiscal-health/dimensions?start_year=1990&end_year=2026")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["total_dimensions"] == 7
    assert len(data["dimensions"]) == 7
    assert len(data["years"]) == 37  # 1990 to 2026

    # Verify each dimension has metrics with calculation provenance
    for dim in data["dimensions"]:
        assert len(dim["metrics"]) >= 2
        for m in dim["metrics"]:
            assert "source_provenance" in m
            assert len(m["values"]) == 37


def test_api_fiscal_health_comparison_variables(client):
    """Test /api/lkpp/fiscal-health/comparison-variables endpoint."""
    response = client.get("/api/lkpp/fiscal-health/comparison-variables")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["total_variables"] >= 20


def test_api_fiscal_health_comparison_data_min_timeline(client):
    """Test multi-variable comparison with minimum 12-year timeline rule."""
    # Test request with less than 12 years (e.g. 2023 - 2026 = 4 years)
    response = client.get("/api/lkpp/fiscal-health/comparison-data?vars=debt_gdp,tax_ratio&start_year=2023&end_year=2026")
    assert response.status_code == 200
    data = response.json()
    # It must auto-clamp start_year to at least 2015 (2026 - 11 = 2015) so span >= 12 years
    assert len(data["years"]) >= 12
    assert data["end_year"] - data["start_year"] >= 11
    assert len(data["datasets"]) == 2
