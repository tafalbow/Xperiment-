"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
Unit Tests: Data BPS & Formula Estimasi Cukai (CHT & APBN)
==============================================================================
"""

import pytest
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.cukai_bps_service import CukaiBpsService

client = TestClient(app)


def test_service_matrix_structure():
    """Verify CukaiBpsService returns 25 indicators with full 1990-2026 range."""
    res = CukaiBpsService.get_full_matrix(category="ALL", start_year=1990, end_year=2026)
    assert res["status"] == "SUCCESS"
    assert res["total_indicators"] == 25
    assert len(res["years"]) == 37
    assert res["years"][0] == "1990"
    assert res["years"][-1] == "2026"
    assert len(res["categories"]) == 8


def test_service_category_filtering():
    """Verify filtering by category works properly."""
    res_susenas = CukaiBpsService.get_full_matrix(category="BPS_SUSENAS")
    assert res_susenas["status"] == "SUCCESS"
    assert res_susenas["total_indicators"] == 5
    ids = [ind["id"] for ind in res_susenas["indicators"]]
    assert "BPS_SUSENAS_PREVALENSI" in ids
    assert "BPS_SUSENAS_PREVALENSI_ANAK" in ids
    for ind in res_susenas["indicators"]:
        assert ind["category"] == "BPS_SUSENAS"

    res_makro = CukaiBpsService.get_full_matrix(category="BPS_MAKRO")
    assert res_makro["total_indicators"] == 4
    for ind in res_makro["indicators"]:
        assert ind["category"] == "BPS_MAKRO"


def test_service_search():
    """Verify text search in indicators."""
    res_search = CukaiBpsService.get_full_matrix(q="prevalensi")
    assert res_search["total_indicators"] >= 2
    for ind in res_search["indicators"]:
        assert "prevalensi" in ind["name"].lower()


def test_service_descriptive_metrics():
    """Verify descriptive statistics calculated for BPS indicators."""
    res = CukaiBpsService.get_full_matrix(category="BPS_MAKRO", start_year=1990, end_year=2026)
    assert res["status"] == "SUCCESS"
    for ind in res["indicators"]:
        assert "min_val" in ind
        assert "max_val" in ind
        assert "latest_val" in ind
        assert "l3y_avg" in ind
        assert "yoy_growth" in ind
        assert ind["min_val"] <= ind["max_val"]
        assert isinstance(ind["l3y_avg"], (int, float))
        assert isinstance(ind["yoy_growth"], (int, float))


def test_api_get_matrix():
    """Verify GET /api/cukai-bps/matrix endpoint."""
    response = client.get("/api/cukai-bps/matrix?category=ALL&start_year=2000&end_year=2026")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["total_indicators"] == 25
    assert len(data["years"]) == 27
    assert "2000" in data["years"]
    assert "2026" in data["years"]


def test_api_get_indicators():
    """Verify GET /api/cukai-bps/indicators endpoint."""
    response = client.get("/api/cukai-bps/indicators")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["total_indicators"] == 25
    assert data["total_categories"] == 8


def test_api_simulate():
    """Verify POST /api/cukai-bps/simulate endpoint returns success."""
    payload = {
        "base_year": 2025,
        "target_year": 2026,
        "g_pdb": 5.0,
        "inflation": 2.0,
        "tariff_hike_pct": 12.0
    }
    response = client.post("/api/cukai-bps/simulate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"


def test_api_export_excel():
    """Verify GET /api/cukai-bps/export/excel endpoint returns valid xlsx."""
    response = client.get("/api/cukai-bps/export/excel?category=ALL&start_year=2020&end_year=2026")
    assert response.status_code == 200
    assert "spreadsheetml" in response.headers["content-type"]
    assert len(response.content) > 1000


def test_api_export_csv():
    """Verify GET /api/cukai-bps/export/csv endpoint returns valid csv."""
    response = client.get("/api/cukai-bps/export/csv?category=ALL&start_year=2020&end_year=2026")
    assert response.status_code == 200
    assert "text/csv" in response.headers["content-type"]
    assert "Nama Indikator" in response.text
