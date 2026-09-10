"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
Weekly High-Frequency Observatory Unit Tests (2014 - 2026)
==============================================================================
"""

import pytest
from fastapi.testclient import TestClient
from backend.app import app

client = TestClient(app)

def test_get_weekly_institutions():
    """Verify endpoint returns 4 government institutions plus ALL."""
    res = client.get("/api/weekly/institutions")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "SUCCESS"
    assert data["total_institutions"] == 5
    inst_ids = [i["id"] for i in data["institutions"]]
    for expected in ["ALL", "BI", "DJPB", "OJK", "BAPANAS"]:
        assert expected in inst_ids

def test_get_weekly_matrix_annual_mode():
    """Verify default annual matrix returns 13 years (2014-2026) and 29 indicators."""
    res = client.get("/api/weekly/matrix?institution_id=ALL&view_mode=annual")
    assert res.status_code == 200
    data = res.json()
    assert data["view_mode"] == "annual"
    assert data["total_columns"] == 13
    assert data["columns"][0]["id"] == "2014"
    assert data["columns"][-1]["id"] == "2026"
    assert data["total_rows"] == 29
    
    first_row = data["rows"][0]
    assert "id" in first_row
    assert "name" in first_row
    assert "values" in first_row
    assert "2014" in first_row["values"]
    assert "2026" in first_row["values"]

def test_get_weekly_matrix_weekly_mode():
    """Verify weekly matrix returns 52 weeks (W01 to W52) for target year 2026."""
    res = client.get("/api/weekly/matrix?institution_id=ALL&view_mode=weekly&year=2026")
    assert res.status_code == 200
    data = res.json()
    assert data["view_mode"] == "weekly"
    assert data["year"] == 2026
    assert data["total_columns"] == 52
    assert data["columns"][0]["id"] == "W01"
    assert data["columns"][-1]["id"] == "W52"
    assert data["total_rows"] == 29

def test_get_weekly_matrix_by_institution():
    """Verify institution filtering returns exact indicator counts."""
    # Bank Indonesia (8 indicators)
    res_bi = client.get("/api/weekly/matrix?institution_id=BI&view_mode=annual")
    assert res_bi.status_code == 200
    assert res_bi.json()["total_rows"] == 8
    
    # Kemenkeu DJPb (5 indicators)
    res_djpb = client.get("/api/weekly/matrix?institution_id=DJPB&view_mode=annual")
    assert res_djpb.status_code == 200
    assert res_djpb.json()["total_rows"] == 5
    
    # OJK Pasar Modal (5 indicators)
    res_ojk = client.get("/api/weekly/matrix?institution_id=OJK&view_mode=annual")
    assert res_ojk.status_code == 200
    assert res_ojk.json()["total_rows"] == 5
    
    # Bapanas Pangan (11 indicators)
    res_bap = client.get("/api/weekly/matrix?institution_id=BAPANAS&view_mode=annual")
    assert res_bap.status_code == 200
    assert res_bap.json()["total_rows"] == 11

def test_get_weekly_trend():
    """Verify weekly trend calculations, statistics, median trend olahan, and 676 weekly points."""
    res = client.get("/api/weekly/trend?indicator_id=BI_M0")
    assert res.status_code == 200
    data = res.json()
    assert data["indicator"]["id"] == "BI_M0"
    assert data["statistics"]["total_observations"] == 676 # 13 years * 52 weeks
    assert data["statistics"]["latest_value"] > 0
    assert data["statistics"]["min_value"] > 0
    assert data["statistics"]["max_value"] >= data["statistics"]["min_value"]
    # New refined statistics (L3M, L12W, WoW, MoM, YoY, Median)
    assert "average_l3m" in data["statistics"]
    assert data["statistics"]["average_l3m"] > 0
    assert "max_l12w" in data["statistics"]
    assert "min_l12w" in data["statistics"]
    assert data["statistics"]["max_l12w"] >= data["statistics"]["min_l12w"]
    assert "wow_percent" in data["statistics"]
    assert "mom_percent" in data["statistics"]
    assert "yoy_percent" in data["statistics"]
    assert "latest_median_trend" in data["statistics"]
    assert len(data["series"]) == 676
    assert data["series"][0]["period_label"] == "2014-W01"
    assert data["series"][-1]["period_label"] == "2026-W52"
    # Series points contain median trend olahan & deviation
    assert "median_trend" in data["series"][-1]
    assert data["series"][-1]["median_trend"] > 0
    assert "deviation_to_median_percent" in data["series"][-1]

def test_export_weekly_excel_and_csv():
    """Verify Excel and CSV exports for weekly data."""
    res_xlsx = client.get("/api/weekly/export?institution_id=ALL&view_mode=annual&format=xlsx")
    assert res_xlsx.status_code == 200
    assert res_xlsx.headers["content-type"] == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    assert len(res_xlsx.content) > 1000

    res_csv = client.get("/api/weekly/export?institution_id=BI&view_mode=weekly&year=2026&format=csv")
    assert res_csv.status_code == 200
    assert "text/csv" in res_csv.headers["content-type"]
    lines = res_csv.text.strip().split("\n")
    assert len(lines) == 9 # 1 header + 8 BI rows
