"""
Unit tests for Rolling KPI 8 Key Indicators (3-Day Update Cycle)
"""
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.rolling_kpi_service import RollingKPIService

client = TestClient(app)


def test_rolling_kpi_service_data():
    res = RollingKPIService.get_rolling_kpis()
    assert res["status"] == "SUCCESS"
    assert "Update Setiap 3 Hari Sekali" in res["cycle_label"]
    assert "22 September 2026" in res["edition_note"]
    assert len(res["kpis"]) == 8

    kpi_ids = [k["id"] for k in res["kpis"]]
    expected_ids = [
        "bi_rate",
        "inflasi",
        "ikk",
        "pmi_manufaktur",
        "rupiah",
        "ihsg",
        "emas_antam",
        "emas_buyback",
    ]
    for eid in expected_ids:
        assert eid in kpi_ids

    # Validate each KPI has required movement & diagnostic verdict
    for k in res["kpis"]:
        assert "value" in k and k["value"]
        assert "movement_vs_ly" in k
        assert "movement_vs_lm" in k
        assert "status_verdict" in k
        assert "situation_note" in k


def test_api_rolling_kpi_endpoint():
    response = client.get("/api/rolling-kpi")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert len(data["kpis"]) == 8
    titles = [k["title"] for k in data["kpis"]]
    assert any("BI Rate" in t for t in titles)
    assert any("Inflasi" in t for t in titles)
    assert any("IKK" in t for t in titles)
    assert any("PMI Manufaktur" in t for t in titles)
    assert any("Rupiah" in t for t in titles)
    assert any("IHSG" in t for t in titles)
    assert any("Emas Antam" in t for t in titles)
    assert any("Emas Buyback" in t for t in titles)
