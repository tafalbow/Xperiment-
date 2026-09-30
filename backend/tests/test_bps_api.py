"""
==============================================================================
INDOEKONOMI data - Indonesia Economic Data Observatory
Unit Tests: BPS Web API Integration (Badan Pusat Statistik RI)
API Key: 1b87dd7ccc268b9b37627a6bc8824af0 (Domain 0000 - Nasional)
==============================================================================
"""

import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.bps_api_service import BpsApiService
from backend.services.cukai_bps_service import CukaiBpsService

client = TestClient(app)


def test_bps_masked_key():
    """Verify that BPS API key is securely masked in outputs."""
    masked = BpsApiService.get_masked_key()
    assert masked.startswith("1b87dd7c")
    assert masked.endswith("24af0")
    assert "..." in masked
    assert len(masked) < 32


def test_bps_check_connection_structure():
    """Verify check_connection returns standard connection metadata."""
    res = BpsApiService.check_connection(force=False)
    assert "status" in res
    assert "is_connected" in res
    assert "api_key_masked" in res
    assert res["domain"] == "0000"
    assert "Badan Pusat Statistik" in res.get("provider", "")


def test_bps_press_releases_structure():
    """Verify fetch_press_releases structure and fields."""
    brs_list = BpsApiService.fetch_press_releases(limit=5, force_refresh=False)
    assert isinstance(brs_list, list)
    if brs_list:
        first = brs_list[0]
        assert "title" in first
        assert "release_date" in first
        assert "pdf_url" in first
        assert "source" in first


def test_bps_endpoint_status():
    """Verify GET /api/bps/status endpoint."""
    response = client.get("/api/bps/status?check_live=false")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "api_key_masked" in data
    assert data["domain"] == "0000"


def test_bps_endpoint_press_releases():
    """Verify GET /api/bps/press-releases endpoint."""
    response = client.get("/api/bps/press-releases?limit=5")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert "press_releases" in data
    assert isinstance(data["press_releases"], list)


def test_bps_endpoint_sync_status():
    """Verify GET /api/bps/sync returns integration status."""
    response = client.get("/api/bps/sync")
    assert response.status_code == 200
    data = response.json()
    assert data["is_configured"] is True
    assert "1b87dd7c" in data["api_key_masked"]
    assert data["domain"] == "0000"


def test_bps_endpoint_sync_post():
    """Verify POST /api/bps/sync triggers sync routine and returns valid payload."""
    with patch.object(BpsApiService, "sync_all_indicators") as mock_sync:
        mock_sync.return_value = {
            "success": True,
            "status": "SYNCHRONIZED",
            "last_synced": "2026-09-30 11:30:00 WIB",
            "duration_seconds": 0.45,
            "api_key_masked": "1b87dd7c...24af0",
            "synced_indicators_count": 5,
            "synced_indicators": ["BPS_PDB_GROWTH", "BPS_PDB_NOMINAL", "BPS_INFLASI_MOM", "BPS_EKSPOR_TOTAL", "BPS_IMPOR_TOTAL"],
            "press_releases_count": 10,
            "errors": [],
            "message": "Sinkronisasi BPS Web API berhasil",
        }
        response = client.post("/api/bps/sync")
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["status"] == "SYNCHRONIZED"
        assert data["synced_indicators_count"] == 5


def test_bps_endpoint_variable_data():
    """Verify GET /api/bps/data/{var_id} returns variable details."""
    response = client.get("/api/bps/data/104")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["var_id"] == 104
    assert "PDB" in data["var_name"] or "Pertumbuhan" in data["var_name"]


def test_cukai_bps_matrix_includes_bps_api_metadata():
    """Verify that CukaiBpsService.get_full_matrix embeds BPS API live metadata."""
    matrix = CukaiBpsService.get_full_matrix(category="BPS_MAKRO")
    assert matrix["status"] == "SUCCESS"
    assert "bps_api" in matrix
    assert matrix["bps_api"]["is_configured"] is True
    assert "1b87dd7c" in matrix["bps_api"]["api_key_masked"]
