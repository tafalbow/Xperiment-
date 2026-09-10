"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
LKPP Financial Statement Time-Series Tests
==============================================================================
"""

import pytest
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.lkpp_service import LKPPService

client = TestClient(app)

def test_get_lkpp_tables():
    """Verify registry returns all 9 statutory State Finance tables (APBN, RAPBN, CUKAI & LKPP)."""
    res = client.get("/api/lkpp/tables")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "SUCCESS"
    assert data["total_tables"] == 9
    table_ids = [t["id"] for t in data["tables"]]
    for expected in ["LRA", "APBN", "RAPBN", "CUKAI", "LPSAL", "NERACA", "LO", "LAK", "LPE"]:
        assert expected in table_ids

def test_get_lkpp_matrix_default():
    """Verify default matrix returns LRA 1990-2026 (37 annual points)."""
    res = client.get("/api/lkpp/matrix?table_id=LRA")
    assert res.status_code == 200
    data = res.json()
    assert data["table_meta"]["id"] == "LRA"
    assert data["filter"]["total_years"] == 37
    assert len(data["year_columns"]) == 37
    assert data["year_columns"][0]["year"] == 1990
    assert data["year_columns"][-1]["year"] == 2026
    assert data["total_rows"] > 0
    
    # Check row structure
    first_row = data["rows"][0]
    assert "id" in first_row
    assert "name" in first_row
    assert "values" in first_row
    assert "1990" in first_row["values"]
    assert "2026" in first_row["values"]

def test_get_lkpp_matrix_all_nine_tables():
    """Verify each of the 9 statutory tables can be generated properly."""
    for table_id in ["LRA", "APBN", "RAPBN", "CUKAI", "LPSAL", "NERACA", "LO", "LAK", "LPE"]:
        res = client.get(f"/api/lkpp/matrix?table_id={table_id}")
        assert res.status_code == 200, f"Failed for table {table_id}"
        data = res.json()
        assert data["table_meta"]["id"] == table_id
        assert data["total_rows"] >= 5

def test_cukai_detailed_breakdown():
    """Verify detailed excise tax (cukai) breakdown and related transfers/expenses."""
    res = client.get("/api/lkpp/matrix?table_id=CUKAI")
    assert res.status_code == 200
    data = res.json()
    row_ids = [r["id"] for r in data["rows"]]
    # Required excise sub-lines
    assert "CUKAI_TOTAL" in row_ids
    assert "CUKAI_CHT" in row_ids
    assert "CUKAI_EA" in row_ids
    assert "CUKAI_MMEA" in row_ids
    assert "CUKAI_DENDA" in row_ids
    assert "CUKAI_LAIN" in row_ids
    # Required related cost groups / earmarks
    assert "CUKAI_DBH_CHT" in row_ids
    assert "CUKAI_ALOK_KESEHATAN" in row_ids
    assert "CUKAI_ALOK_KESEJAHTERAAN" in row_ids
    assert "CUKAI_ALOK_PENEGAKAN" in row_ids
    assert "CUKAI_EXP_PENGAWASAN" in row_ids

def test_apbn_and_rapbn_postures():
    """Verify APBN and RAPBN statutory posture tables contain macro and excise items."""
    for table_id in ["APBN", "RAPBN"]:
        res = client.get(f"/api/lkpp/matrix?table_id={table_id}")
        assert res.status_code == 200
        data = res.json()
        row_ids = [r["id"] for r in data["rows"]]
        prefix = f"{table_id}_"
        assert f"{prefix}REV_TOTAL" in row_ids
        assert f"{prefix}REV_TAX" in row_ids
        assert f"{prefix}CUKAI_TOTAL" in row_ids
        assert f"{prefix}CUKAI_CHT" in row_ids
        assert f"{prefix}EXP_TOTAL" in row_ids
        assert f"{prefix}DEFISIT" in row_ids

def test_get_lkpp_matrix_timeframe_filter():
    """Verify filtering from 2015 to 2026 (Full Accrual era)."""
    res = client.get("/api/lkpp/matrix?table_id=NERACA&start_year=2015&end_year=2026")
    assert res.status_code == 200
    data = res.json()
    assert data["filter"]["total_years"] == 12
    assert len(data["year_columns"]) == 12
    assert data["year_columns"][0]["year"] == 2015
    assert data["year_columns"][-1]["year"] == 2026

def test_get_lkpp_matrix_units():
    """Verify unit scaling from TRILLION to BILLION."""
    res_t = client.get("/api/lkpp/matrix?table_id=LRA&start_year=2024&end_year=2024&unit=TRILLION")
    res_m = client.get("/api/lkpp/matrix?table_id=LRA&start_year=2024&end_year=2024&unit=BILLION")
    
    val_t = res_t.json()["rows"][0]["values"]["2024"]
    val_m = res_m.json()["rows"][0]["values"]["2024"]
    # Ratio should be approximately 1000
    assert abs((val_m / val_t) - 1000.0) < 1.0

def test_get_lkpp_matrix_search():
    """Verify quick search filter on line item names."""
    res = client.get("/api/lkpp/matrix?table_id=LRA&q=pegawai")
    assert res.status_code == 200
    data = res.json()
    assert data["total_rows"] >= 1
    assert any("Pegawai" in r["name"] for r in data["rows"])

def test_get_lkpp_trend():
    """Verify line item trend calculation, CAGR, and time points."""
    res = client.get("/api/lkpp/trend?table_id=LRA&item_id=EXP_PEGAWAI")
    assert res.status_code == 200
    data = res.json()
    assert data["item_id"] == "EXP_PEGAWAI"
    assert len(data["series"]) == 37
    assert data["statistics"]["start_year"] == 1990
    assert data["statistics"]["latest_year"] == 2026
    assert data["statistics"]["cagr_percent"] is not None
    assert data["statistics"]["cagr_percent"] > 0

def test_get_lkpp_glossary():
    """Verify statutory terminology evolution glossary."""
    res = client.get("/api/lkpp/glossary")
    assert res.status_code == 200
    data = res.json()
    assert data["total_terms"] >= 10
    assert len(data["eras"]) == 3
    era_ids = [e["id"] for e in data["eras"]]
    assert "DUAL_BUDGETING" in era_ids
    assert "CTA" in era_ids
    assert "FULL_ACCRUAL" in era_ids
    
    # Check first term
    term = data["glossary"][0]
    assert "modern_term" in term
    assert "era_1990_2004" in term
    assert "legal_basis" in term

def test_export_lkpp_excel():
    """Verify Excel export generation and headers."""
    res = client.get("/api/lkpp/export?table_id=LRA&format=xlsx")
    assert res.status_code == 200
    assert res.headers["content-type"] == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    assert "attachment" in res.headers.get("content-disposition", "")
    assert len(res.content) > 1000

def test_export_lkpp_csv():
    """Verify CSV export generation."""
    res = client.get("/api/lkpp/export?table_id=LRA&format=csv")
    assert res.status_code == 200
    assert "text/csv" in res.headers["content-type"]
    lines = res.text.strip().split("\n")
    assert len(lines) > 5
    assert "KODE" in lines[0]
