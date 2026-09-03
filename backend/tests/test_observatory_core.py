import pytest
from fastapi.testclient import TestClient
from backend.app import app

client = TestClient(app)

def test_health_check_branding():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["brand"] == "INDOEKONOMI data"
    assert "INDOEKONOMI" in data["web_identifier"]
    assert "indoekonomi" in data["domain"]

def test_global_search_five_entities():
    response = client.get("/api/search/global?q=Pajak")
    assert response.status_code == 200
    data = response.json()
    assert "datasets" in data
    assert "indicators" in data
    assert "publications" in data
    assert "source_documents" in data
    assert "institutions" in data
    assert data["total_matches"] > 0

def test_datasets_list():
    response = client.get("/api/datasets")
    assert response.status_code == 200
    datasets = response.json()
    assert len(datasets) > 0
    first = datasets[0]
    assert "id" in first
    assert "access_status" in first
    assert "download_allowed" in first

def test_classification_evolution_document_section13():
    response = client.get("/api/crosswalk/document")
    assert response.status_code == 200
    doc = response.json()
    assert "Dokumen Riwayat" in doc["title"]
    assert len(doc["eras"]) == 4
    assert doc["eras"][0]["period_range"] == "1945 – 2004"
    assert "Dual Budgeting" in doc["eras"][0]["title"]
    assert len(doc["crosswalk_rules"]) > 0

def test_agricultural_calendar():
    response = client.get("/api/agricultural-calendar")
    assert response.status_code == 200
    calendar = response.json()
    assert len(calendar) > 0
    first = calendar[0]
    assert "commodity_name" in first
    assert "season_stage" in first
    assert "month" in first

def test_agricultural_calendar_summary():
    response = client.get("/api/agricultural-calendar/summary")
    assert response.status_code == 200
    summary = response.json()
    assert "Kalender Musim Tanam" in summary["title"]
    assert "commodities_covered" in summary
    assert "current_season_narrative" in summary

def test_download_endpoint_access_control():
    # Test public open download
    response = client.get("/api/download/DS-FISCAL-NAT?format=csv")
    assert response.status_code == 200
    assert "text/csv" in response.headers["content-type"]
    assert "INDOEKONOMI_" in response.headers["content-disposition"]
    assert "observation_id" in response.text
    assert "provenance_id" in response.text

    # Test excel download
    response_xlsx = client.get("/api/download/DS-FISCAL-NAT?format=xlsx")
    assert response_xlsx.status_code == 200
    assert "spreadsheetml" in response_xlsx.headers["content-type"]
    assert len(response_xlsx.content) > 1000
