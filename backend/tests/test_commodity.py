"""
==============================================================================
PUSAT BASIS DATA DATA SEKUNDER: PERGERAKAN EKONOMI INDONESIA
Test Suite: Commodity Balance, HS Classification & APBN/LKPP Mapping
==============================================================================
"""

import pytest
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.commodity_service import CommodityService

client = TestClient(app)

def test_commodity_categories_structure():
    """Verify divisions, HS chapters, APBN categories, and commodities list are returned properly."""
    response = client.get("/api/commodities/categories")
    assert response.status_code == 200
    data = response.json()

    assert "divisions" in data
    assert len(data["divisions"]) == 2
    div_ids = [d["id"] for d in data["divisions"]]
    assert "PERTANIAN_PETERNAKAN" in div_ids
    assert "HASIL_BUMI" in div_ids

    assert "hs_chapters" in data
    assert len(data["hs_chapters"]) > 0

    assert "apbn_categories" in data
    assert len(data["apbn_categories"]) > 0

    assert "commodities" in data
    assert len(data["commodities"]) >= 10

    # Verify every commodity has HS code and APBN/LKPP classification
    for c in data["commodities"]:
        assert "hs_code" in c
        assert "hs_chapter" in c
        assert "apbn_classification" in c
        assert "lkpp_account_code" in c
        assert "lkpp_classification" in c

def test_commodity_balance_beras():
    """Verify detailed time-series balance calculation for Beras (COM-AGRI-001-BERAS)."""
    response = client.get("/api/commodities/balance?commodity_id=COM-AGRI-001-BERAS&start_year=2018&end_year=2024")
    assert response.status_code == 200
    data = response.json()

    assert data["commodity"]["id"] == "COM-AGRI-001-BERAS"
    assert data["commodity"]["realm"] == "DARAT"
    assert data["commodity"]["hs_chapter"].startswith("HS 10")
    assert "records" in data
    assert len(data["records"]) == 7  # 2018-2024

    # Verify mathematical formula consistency
    rec_2024 = next(r for r in data["records"] if r["period"] == "2024")
    prod = rec_2024["production"]
    cons = rec_2024["consumption"]
    imp = rec_2024["import_volume"]
    exp = rec_2024["export_volume"]

    assert rec_2024["surplus_deficit"] == round(prod - cons, 2)
    assert rec_2024["net_trade_volume"] == round(exp - imp, 2)
    assert rec_2024["ssr_percent"] == round((prod / cons * 100), 2)

def test_commodity_balance_batubara():
    """Verify detailed time-series balance for Batubara (COM-MINE-001-BATUBARA) with APBN Royalti classification."""
    response = client.get("/api/commodities/balance?commodity_id=COM-MINE-001-BATUBARA")
    assert response.status_code == 200
    data = response.json()

    assert data["commodity"]["id"] == "COM-MINE-001-BATUBARA"
    assert data["commodity"]["realm"] == "DITAMBANG"
    assert "421211" in data["commodity"]["lkpp_account_code"]
    assert "records" in data
    assert len(data["records"]) > 0

    # Coal should be a massive net exporter
    rec_2024 = [r for r in data["records"] if r["period"] == "2024"][0]
    assert rec_2024["export_volume"] > rec_2024["import_volume"]
    assert rec_2024["surplus_deficit"] > 0

def test_commodity_matrix_filtering():
    """Verify multi-level filtering by division, group, HS chapter, and APBN classification."""
    # Filter by Pertanian & Peternakan division
    res_agri = client.get("/api/commodities/matrix?division=PERTANIAN_PETERNAKAN&year=2024")
    assert res_agri.status_code == 200
    items_agri = res_agri.json()
    assert len(items_agri) > 0
    assert all(item["division"] == "PERTANIAN_PETERNAKAN" for item in items_agri)

    # Filter by Hasil Bumi division
    res_mine = client.get("/api/commodities/matrix?division=HASIL_BUMI&year=2024")
    assert res_mine.status_code == 200
    items_mine = res_mine.json()
    assert len(items_mine) > 0
    assert all(item["division"] == "HASIL_BUMI" for item in items_mine)

def test_commodity_not_found():
    """Verify 404 on invalid commodity ID."""
    response = client.get("/api/commodities/balance?commodity_id=COM-INVALID-999")
    assert response.status_code == 404

def test_commodity_spatial_distribution_batubara():
    """Verify spatial GeoMap endpoints and variables for Batubara."""
    # 1. Produksi Terbanyak
    res_prod = client.get("/api/commodities/spatial-distribution?commodity_id=COM-MINE-001-BATUBARA&variable=PRODUKSI_TERBANYAK")
    assert res_prod.status_code == 200
    data_prod = res_prod.json()
    assert data_prod["commodity_id"] == "COM-MINE-001-BATUBARA"
    assert len(data_prod["points"]) > 0
    # Top 1 should be Kalimantan Timur
    assert data_prod["points"][0]["province"] == "Kalimantan Timur"
    assert data_prod["points"][0]["rank"] == 1
    assert data_prod["points"][0]["percentage_share"] > 50

    # 2. PNBP APBN
    res_pnbp = client.get("/api/commodities/spatial-distribution?commodity_id=COM-MINE-001-BATUBARA&variable=PNBP_APBN")
    assert res_pnbp.status_code == 200
    data_pnbp = res_pnbp.json()
    assert "421211" in data_pnbp["points"][0]["notes"] or "royalti" in data_pnbp["points"][0]["notes"].lower()

    # 3. Titik Ekspor
    res_exp = client.get("/api/commodities/spatial-distribution?commodity_id=COM-MINE-001-BATUBARA&variable=TITIK_EKSPOR")
    assert res_exp.status_code == 200
    assert len(res_exp.json()["points"]) > 0

    # 4. Smelter Hilir
    res_hilir = client.get("/api/commodities/spatial-distribution?commodity_id=COM-MINE-001-BATUBARA&variable=SMELTER_HILIR")
    assert res_hilir.status_code == 200
    assert len(res_hilir.json()["points"]) > 0

def test_commodity_spatial_distribution_nikel_and_tembaga():
    """Verify spatial GeoMap endpoints for Nikel and Tembaga."""
    # Nikel top producer: Morowali / Sulawesi Tengah
    res_nikel = client.get("/api/commodities/spatial-distribution?commodity_id=COM-MINE-002-NIKEL&variable=PRODUKSI_TERBANYAK")
    assert res_nikel.status_code == 200
    assert res_nikel.json()["points"][0]["province"] == "Sulawesi Tengah"

    # Tembaga top producer: Grasberg / Papua Tengah
    res_cu = client.get("/api/commodities/spatial-distribution?commodity_id=COM-MINE-003-TEMBAGA&variable=PRODUKSI_TERBANYAK")
    assert res_cu.status_code == 200
    assert res_cu.json()["points"][0]["province"] == "Papua Tengah"

