"""
Unit tests for Regency-level Agricultural Calendar & Planting Recommendation Map
"""

import pytest
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.agri_calendar_service import AgriCalendarService

client = TestClient(app)

def test_get_regencies_default():
    """Test getting default planting recommendations (Jagung in September)."""
    response = client.get("/api/agricultural-calendar/regencies")
    assert response.status_code == 200
    data = response.json()
    
    assert "commodity" in data
    assert data["commodity"]["id"] == "JAGUNG"
    assert data["selected_month"] == 9
    assert "summary" in data
    assert data["summary"]["total_regencies_recommended"] > 0
    assert len(data["regencies"]) > 0
    
    # Verify first regency has valid GIS coordinates and recommendations
    first_r = data["regencies"][0]
    assert "lat" in first_r and "lng" in first_r
    assert isinstance(first_r["lat"], float)
    assert isinstance(first_r["lng"], float)
    assert first_r["status"] in ["RECOMMENDED_PRIME", "RECOMMENDED_CONDITIONAL", "GROWING", "HARVESTING"]
    assert "recommended_varieties" in first_r
    assert "projected_harvest_month" in first_r

def test_get_regencies_filter_commodity():
    """Test filtering by Padi / Beras."""
    response = client.get("/api/agricultural-calendar/regencies?commodity_id=PADI_BERAS&month=10")
    assert response.status_code == 200
    data = response.json()
    assert data["commodity"]["id"] == "PADI_BERAS"
    assert data["selected_month"] == 10
    assert len(data["regencies"]) > 0

def test_get_regencies_filter_island():
    """Test filtering by Island JAWA."""
    response = client.get("/api/agricultural-calendar/regencies?commodity_id=JAGUNG&month=9&island=JAWA")
    assert response.status_code == 200
    data = response.json()
    for reg in data["regencies"]:
        assert reg["island"] == "JAWA"

def test_get_regencies_filter_status():
    """Test filtering by status RECOMMENDED_PRIME."""
    response = client.get("/api/agricultural-calendar/regencies?commodity_id=JAGUNG&month=9&status=RECOMMENDED_PRIME")
    assert response.status_code == 200
    data = response.json()
    for reg in data["regencies"]:
        assert reg["status"] == "RECOMMENDED_PRIME"
