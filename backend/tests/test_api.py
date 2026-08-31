import pytest
from fastapi.testclient import TestClient
from backend.app import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "HEALTHY"
    assert data["geographic_scope"] == "Indonesia / National"
    assert "DEMO DATA" in data["disclaimer"]

def test_filter_options():
    response = client.get("/api/filter-options")
    assert response.status_code == 200
    data = response.json()
    assert "hierarchy" in data
    assert "sources" in data
    assert "statistics" in data
    assert data["statistics"]["total_observations"] > 0

def test_query_observations():
    response = client.get("/api/observations?limit=10")
    assert response.status_code == 200
    data = response.json()
    assert "records" in data
    assert len(data["records"]) <= 10
    for r in data["records"]:
        assert r["geography"] == "Indonesia"
        assert r["status"] in ["Observed", "Provisional", "Revised", "N/A", "Validation Failed"]

def test_kpi_summary():
    response = client.get("/api/kpi/IND-GDP-GROWTH-YOY")
    assert response.status_code == 200
    data = response.json()
    assert data["indicator_id"] == "IND-GDP-GROWTH-YOY"
    assert data["unit"] == "Persen (%)"
    assert data["latest_value"] is not None
    assert "national_mean" in data

def test_provenance_trace():
    # First get an observation ID
    obs_res = client.get("/api/observations?limit=1")
    obs_id = obs_res.json()["records"][0]["id"]

    res = client.get(f"/api/provenance/{obs_id}")
    assert res.status_code == 200
    data = res.json()
    assert data["observation_id"] == obs_id
    assert "publication_title" in data
    assert "source_institution" in data
    assert "source_url" in data

def test_contextual_drivers():
    res = client.get("/api/contextual-drivers")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert "province_name" in data[0]
        assert "driver_role" in data[0]
        assert "explanation" in data[0]

def test_sync_schedule():
    res = client.get("/api/sync-schedule")
    assert res.status_code == 200
    data = res.json()
    assert data["scheduled_days"] == [8, 17, 28]
    assert data["auto_update_enabled"] is False
    assert "next_release_date" in data

def test_variables_inventory():
    res = client.get("/api/variables-inventory")
    assert res.status_code == 200
    data = res.json()
    assert "schedule_policy" in data
    assert "statistics" in data
    assert data["statistics"]["total_variables"] >= 40
    assert len(data["variables"]) >= 40
    
    first_var = data["variables"][0]
    assert "indicator_id" in first_var
    assert "unique_variable_code" in first_var
    assert "last_updated_date" in first_var
    assert first_var["scheduled_cycle_day"] in [8, 17, 28]
    assert "official_law_basis" in first_var

def test_sources_registry():
    res = client.get("/api/sources")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 3
    first_src = data[0]
    assert "id" in first_src
    assert "institution_name" in first_src
    assert "source_type" in first_src
    assert "update_method" in first_src

def test_download_audit_logging():
    # Test recording download for normal user
    res1 = client.post("/api/audit/download-log", json={
        "email": "researcher@univ.ac.id",
        "download_type": "CHART_SERIES_EXPORT",
        "variables_count": 2,
        "total_points": 24,
        "session_count": 1,
        "daily_count": 1,
        "file_name": "test_export.xlsx"
    })
    assert res1.status_code == 200
    data1 = res1.json()
    assert data1["status"] == "RECORDED"
    assert data1["is_admin"] is False

    # Test recording download for Sole Admin (lubis.tania@dewanekonomi.go.id)
    res2 = client.post("/api/audit/download-log", json={
        "email": "lubis.tania@dewanekonomi.go.id",
        "download_type": "LKPP_CROSSWALK_EXPORT",
        "variables_count": 4,
        "total_points": 71,
        "session_count": 1,
        "daily_count": 1,
        "file_name": "lkpp_export.xlsx"
    })
    assert res2.status_code == 200
    data2 = res2.json()
    assert data2["status"] == "RECORDED"
    assert data2["is_admin"] is True

    # Test retrieving download logs
    res_logs = client.get("/api/audit/download-logs?limit=10")
    assert res_logs.status_code == 200
    logs = res_logs.json()
    assert len(logs) >= 2
    emails = [l["email"] for l in logs]
    assert "lubis.tania@dewanekonomi.go.id" in emails
