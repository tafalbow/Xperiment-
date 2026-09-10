"""
==============================================================================
INDOEKONOMI data — Unit & Integration Tests
Custom Chart Studio & Contextual Driver Analysis Service (1990 - 2026)
==============================================================================
"""

import pytest
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.custom_chart_service import custom_chart_service

client = TestClient(app)

def test_custom_chart_service_variables():
    """Tests variable retrieval across 9 tables of LKPP + Weekly indicators."""
    variables = custom_chart_service.get_all_variables()
    assert len(variables) >= 100, f"Expected >= 100 variables, got {len(variables)}"
    
    # Check that key tables are represented
    table_names = {v["table_name"] for v in variables}
    assert any("LRA" in t for t in table_names)
    assert any("APBN" in t for t in table_names)
    assert any("Cukai" in t or "CUKAI" in t for t in table_names)
    assert any("Neraca" in t for t in table_names)
    assert any("Weekly" in t for t in table_names)

def test_custom_chart_transformations():
    """Tests RAW, YOY, AVG_3Y, and BASE_100 calculations."""
    vars_list = custom_chart_service.get_all_variables()
    sample_var = vars_list[0]["id"]

    # RAW
    raw_res = custom_chart_service.calculate_series(sample_var, "RAW", 2015, 2024)
    assert raw_res["transformation"] == "RAW"
    assert len(raw_res["series"]) == 10
    
    # YOY
    yoy_res = custom_chart_service.calculate_series(sample_var, "YOY", 2015, 2024)
    assert yoy_res["transformation"] == "YOY"
    assert yoy_res["unit"] == "% YoY"
    assert len(yoy_res["series"]) == 10

    # AVG_3Y
    ma_res = custom_chart_service.calculate_series(sample_var, "AVG_3Y", 2015, 2024)
    assert ma_res["transformation"] == "AVG_3Y"
    assert len(ma_res["series"]) == 10

    # BASE_100
    b100_res = custom_chart_service.calculate_series(sample_var, "BASE_100", 2015, 2024)
    assert b100_res["transformation"] == "BASE_100"
    assert b100_res["unit"] == "Indeks (100)"
    assert b100_res["series"][0]["value"] == 100.0

def test_custom_chart_contextual_driver():
    """Tests statutory contextual driver generation for specific years."""
    # Test COVID-19 pandemic year 2020
    driver_2020 = custom_chart_service.get_contextual_driver(2020, ["LRA__REV_TOTAL", "LRA__DEFISIT_ANGGARAN"])
    assert driver_2020["year"] == 2020
    assert "Pandemi" in driver_2020["macro_context"]["title"] or "COVID" in driver_2020["macro_context"]["title"]
    assert "UU" in driver_2020["macro_context"]["doc"]
    assert len(driver_2020["variable_drivers"]) == 2
    for vd in driver_2020["variable_drivers"]:
        assert vd["explanation"]
        assert vd["direction"] in ["NAIK", "TURUN", "TETAP"]

    # Test Commodity Windfall year 2022
    driver_2022 = custom_chart_service.get_contextual_driver(2022, ["LRA__REV_TOTAL"])
    assert driver_2022["year"] == 2022
    assert "Windfall" in driver_2022["macro_context"]["title"] or "Komoditas" in driver_2022["macro_context"]["title"]

def test_api_custom_chart_variables():
    """Tests GET /api/custom-chart/variables."""
    res = client.get("/api/custom-chart/variables")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "SUCCESS"
    assert data["total_variables"] >= 100

def test_api_custom_chart_series():
    """Tests GET /api/custom-chart/series."""
    res = client.get("/api/custom-chart/series?variable_id=LRA__REV_TOTAL&transformation=YOY&start_year=2010&end_year=2024")
    assert res.status_code == 200
    data = res.json()
    assert data["variable_id"] == "LRA__REV_TOTAL"
    assert data["transformation"] == "YOY"
    assert len(data["series"]) == 15

    # Invalid variable
    err_res = client.get("/api/custom-chart/series?variable_id=NON_EXISTENT")
    assert err_res.status_code == 404

def test_api_custom_chart_driver():
    """Tests GET /api/custom-chart/driver."""
    res = client.get("/api/custom-chart/driver?year=2023&variable_ids=CUKAI__CUKAI_TOTAL,LRA__EXP_PEGAWAI")
    assert res.status_code == 200
    data = res.json()
    assert data["year"] == 2023
    assert "macro_context" in data
    assert len(data["variable_drivers"]) == 2
