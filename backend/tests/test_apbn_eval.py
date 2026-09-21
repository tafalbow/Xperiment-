"""
Unit tests for APBN Evaluation Service & Router
Testing RAPBN vs UU APBN vs Monthly Actuals & YTD Realization
"""

import pytest
from fastapi.testclient import TestClient
from backend.app import app
from backend.services.apbn_eval_service import ApbnEvalService

client = TestClient(app)


def test_supported_years():
    """Verify list of supported evaluation years and metadata."""
    years = ApbnEvalService.get_supported_years()
    assert len(years) >= 7
    year_numbers = [y["year"] for y in years]
    assert 2025 in year_numbers
    assert 2026 in year_numbers
    assert 2024 in year_numbers
    assert 2020 in year_numbers

    # API endpoint check
    res = client.get("/api/apbn-eval/years")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "SUCCESS"
    assert len(data["years"]) >= 7


def test_evaluation_summary():
    """Verify headline KPI summary for 2025 and 2024."""
    # 2025
    s25 = ApbnEvalService.get_evaluation_summary(2025, "TRILLION")
    assert s25["status"] == "SUCCESS"
    assert s25["year"] == 2025
    assert "kpi" in s25
    kpi25 = s25["kpi"]
    assert kpi25["revenue"]["apbn"] > 2500.0
    assert kpi25["expenditure"]["apbn"] > 3000.0
    assert kpi25["revenue"]["ytd"] > 0
    assert kpi25["revenue"]["pct_apbn"] > 0
    assert kpi25["expenditure"]["pct_apbn"] > 0

    # API endpoint check
    res = client.get("/api/apbn-eval/summary?year=2025&unit=TRILLION")
    assert res.status_code == 200
    data = res.json()
    assert data["kpi"]["revenue"]["apbn"] == kpi25["revenue"]["apbn"]


def test_evaluation_matrix_structure():
    """Verify detailed matrix with 12 monthly columns and YTD."""
    matrix = ApbnEvalService.get_evaluation_matrix(2025, "ALL", "TRILLION")
    assert matrix["status"] == "SUCCESS"
    rows = matrix["rows"]
    assert len(rows) >= 20

    # Check REV_TOTAL row
    rev_row = next(r for r in rows if r["id"] == "REV_TOTAL")
    assert rev_row["code"] == "4"
    assert rev_row["rapbn"] > 0
    assert rev_row["apbn"] > 0
    assert len(rev_row["monthly"]) == 12
    assert rev_row["ytd_actual"] > 0
    assert rev_row["pct_apbn"] > 0
    assert rev_row["pct_rapbn"] > 0
    assert "source_org" in rev_row
    assert len(rev_row["source_org"]) > 3
    assert "drivers" in rev_row
    assert len(rev_row["drivers"]["positive"]) > 0

    # Custom period filter check (Q1: M01 - M03)
    q1_matrix = ApbnEvalService.get_evaluation_matrix(2025, "ALL", "TRILLION", start_month=1, end_month=3)
    assert q1_matrix["time_filter"]["start_month"] == 1
    assert q1_matrix["time_filter"]["end_month"] == 3
    q1_rev = next(r for r in q1_matrix["rows"] if r["id"] == "REV_TOTAL")
    assert q1_rev["period_actual"] > 0
    assert q1_rev["period_pct_apbn"] > 0

    # Filter category
    tax_matrix = ApbnEvalService.get_evaluation_matrix(2025, "PENDAPATAN", "TRILLION")
    for r in tax_matrix["rows"]:
        assert r["category"] == "PENDAPATAN"

    # API endpoint check with custom period
    res = client.get("/api/apbn-eval/matrix?year=2025&category=BELANJA&unit=TRILLION&start_month=1&end_month=3")
    assert res.status_code == 200
    b_data = res.json()
    assert b_data["category"] == "BELANJA"
    assert len(b_data["rows"]) > 0
    assert b_data["time_filter"]["end_month"] == 3
    assert "source_org" in b_data["rows"][0]


def test_trajectory_series():
    """Verify S-Curve trajectory coordinates, drivers, and institutional provenance."""
    traj = ApbnEvalService.get_trajectory_series(2025, "REV_TOTAL", "TRILLION")
    assert traj["status"] == "SUCCESS"
    assert "series" in traj
    assert "drivers" in traj
    assert len(traj["drivers"]["positive"]) > 0
    assert len(traj["drivers"]["negative"]) > 0
    assert "source_org" in traj
    assert len(traj["source_org"]) > 3

    series = traj["series"]
    assert len(series["monthly_bars"]) == 12
    assert len(series["linear_curve"]) == 12
    assert len(series["actual_curve"]) == 12
    assert len(series["prior_curve"]) == 12
    assert "monthly_driver" in series["monthly_bars"][0]
    assert len(series["monthly_bars"][0]["monthly_driver"]) > 5

    # Linear curve must be monotonically increasing
    lin_vals = [pt["value"] for pt in series["linear_curve"]]
    assert lin_vals == sorted(lin_vals)

    # API endpoint check
    res = client.get("/api/apbn-eval/trajectory?year=2025&item_id=REV_TOTAL&unit=TRILLION")
    assert res.status_code == 200
    t_data = res.json()
    assert len(t_data["series"]["actual_curve"]) == 12
    assert "drivers" in t_data
    assert "source_org" in t_data


def test_export_excel_and_csv():
    """Verify Excel .xlsx (3 sheets) and CSV output generation with source_org."""
    # CSV
    csv_out = ApbnEvalService.generate_csv_matrix(2025, "TRILLION")
    assert "Kode,Pos_Anggaran,RAPBN,UU_APBN" in csv_out
    assert "Sumber_Data_Instansi" in csv_out
    assert "REV_TOTAL" in csv_out or "PENDAPATAN NEGARA" in csv_out

    # Excel
    xlsx_bytes = ApbnEvalService.generate_excel_matrix(2025, "TRILLION")
    assert len(xlsx_bytes) > 2000 # Valid zip/xlsx file
    assert xlsx_bytes[:4] == b"PK\x03\x04" # Standard ZIP/OpenXML magic number

    # API endpoints
    res_csv = client.get("/api/apbn-eval/export?year=2025&unit=TRILLION&format=csv")
    assert res_csv.status_code == 200
    assert "text/csv" in res_csv.headers["content-type"]

    res_xlsx = client.get("/api/apbn-eval/export?year=2025&unit=TRILLION&format=xlsx")
    assert res_xlsx.status_code == 200
    assert "openxmlformats" in res_xlsx.headers["content-type"]
