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
    assert rec_2024["apbn_target_idr_billion"] > 0
    assert rec_2024["apbn_realization_idr_billion"] > 0
    assert "UU No. 19 Thn 2023" in rec_2024["apbn_statute_law"]
    assert rec_2024["production_kg"] == prod * 1000000.0

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

def test_commodity_balance_all_hasil_bumi():
    """Verify aggregated multi-commodity balance for ALL_HASIL_BUMI with breakdowns."""
    response = client.get("/api/commodities/balance?commodity_id=ALL_HASIL_BUMI&start_year=2018&end_year=2024")
    assert response.status_code == 200
    data = response.json()
    assert data["commodity"]["id"] == "ALL_HASIL_BUMI"
    assert len(data["records"]) == 7
    rec_2024 = next(r for r in data["records"] if r["period"] == "2024")
    assert "breakdown" in rec_2024
    assert len(rec_2024["breakdown"]) == 8  # 8 commodities in Hasil Bumi
    assert rec_2024["apbn_realization_idr_billion"] > 100000  # Total PNBP SDA in Rp Miliar

def test_commodity_balance_1990_2026_full_range():
    """Verify 37-year full time-series span from 1990 to 2026."""
    response = client.get("/api/commodities/balance?commodity_id=ALL_HASIL_BUMI&start_year=1990&end_year=2026")
    assert response.status_code == 200
    data = response.json()
    assert len(data["records"]) == 37
    assert data["records"][0]["period"] == "1990"
    assert data["records"][-1]["period"] == "2026"
    assert "RAPBN TA 2026" in data["records"][-1]["apbn_statute_law"]

def test_commodity_balance_all_pertanian():
    """Verify aggregated multi-commodity balance for ALL_PERTANIAN with breakdowns."""
    response = client.get("/api/commodities/balance?commodity_id=ALL_PERTANIAN&start_year=2018&end_year=2024")
    assert response.status_code == 200
    data = response.json()
    assert data["commodity"]["id"] == "ALL_PERTANIAN"
    assert len(data["records"]) == 7
    rec_2024 = next(r for r in data["records"] if r["period"] == "2024")
    assert "breakdown" in rec_2024
    assert len(rec_2024["breakdown"]) == 16  # 16 commodities in Pertanian, Perkebunan & Peternakan

def test_commodity_balance_sub_aggregates():
    """Verify sub-sector aggregate balances: Tambang, Pertanian, Perairan, Peternakan."""
    # 1. Tambang (5 commodities: Batubara, Nikel, Tembaga, Minyak, Gas)
    res_tambang = client.get("/api/commodities/balance?commodity_id=AGG_TAMBANG&start_year=1990&end_year=2026")
    assert res_tambang.status_code == 200
    d_tambang = res_tambang.json()
    assert d_tambang["commodity"]["id"] == "AGG_TAMBANG"
    assert len(d_tambang["records"]) == 37
    assert len(d_tambang["records"][-1]["breakdown"]) == 5

    # 2. Pertanian Tanaman (6 commodities: Beras, Jagung, Kedelai, Gula, Bawang, Sawit)
    res_tanaman = client.get("/api/commodities/balance?commodity_id=AGG_PERTANIAN_TANAMAN&start_year=1990&end_year=2026")
    assert res_tanaman.status_code == 200
    d_tanaman = res_tanaman.json()
    assert d_tanaman["commodity"]["id"] == "AGG_PERTANIAN_TANAMAN"
    assert len(d_tanaman["records"]) == 37
    assert len(d_tanaman["records"][-1]["breakdown"]) == 6

    # 3. Perairan (2 commodities: Tuna & Udang)
    res_air = client.get("/api/commodities/balance?commodity_id=AGG_PERAIRAN&start_year=1990&end_year=2026")
    assert res_air.status_code == 200
    d_air = res_air.json()
    assert d_air["commodity"]["id"] == "AGG_PERAIRAN"
    assert len(d_air["records"]) == 37
    assert len(d_air["records"][-1]["breakdown"]) == 2

    # 4. Peternakan (2 commodities: Sapi & Ayam)
    res_ternak = client.get("/api/commodities/balance?commodity_id=AGG_PETERNAKAN&start_year=1990&end_year=2026")
    assert res_ternak.status_code == 200
    d_ternak = res_ternak.json()
    assert d_ternak["commodity"]["id"] == "AGG_PETERNAKAN"
    assert len(d_ternak["records"]) == 37
    assert len(d_ternak["records"][-1]["breakdown"]) == 2

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

def test_commodity_balance_three_aggregates():
    """Verify the 3 primary aggregates: PERTANIAN (4 comms), PERKEBUNAN (8 comms), PETERNAKAN (2 comms)."""
    # 1. PERTANIAN (Beras, Jagung, Kedelai, Bawang Merah)
    r_pertanian = client.get("/api/commodities/balance?commodity_id=AGG_PERTANIAN&start_year=2024&end_year=2024")
    assert r_pertanian.status_code == 200
    d_pertanian = r_pertanian.json()
    assert d_pertanian["commodity"]["id"] == "AGG_PERTANIAN"
    assert len(d_pertanian["records"][0]["breakdown"]) == 4

    # 2. PERKEBUNAN (Sawit, Karet, Tembakau, Gula, Kopi, Kakao, Teh, Kelapa)
    r_kebun = client.get("/api/commodities/balance?commodity_id=AGG_PERKEBUNAN&start_year=2024&end_year=2024")
    assert r_kebun.status_code == 200
    d_kebun = r_kebun.json()
    assert d_kebun["commodity"]["id"] == "AGG_PERKEBUNAN"
    assert len(d_kebun["records"][0]["breakdown"]) == 8

    # 3. PETERNAKAN (Sapi, Ayam)
    r_ternak = client.get("/api/commodities/balance?commodity_id=AGG_PETERNAKAN&start_year=2024&end_year=2024")
    assert r_ternak.status_code == 200
    d_ternak = r_ternak.json()
    assert d_ternak["commodity"]["id"] == "AGG_PETERNAKAN"
    assert len(d_ternak["records"][0]["breakdown"]) == 2


