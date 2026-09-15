"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
Data BPS & Formula Estimasi Cukai (CHT & APBN) Router
==============================================================================
REST API endpoints for BPS indicators matrix and econometric simulation of
next-year excise revenue targets (Cukai Hasil Tembakau & APBN).
==============================================================================
"""

from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query, Response
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from backend.services.cukai_bps_service import CukaiBpsService

router = APIRouter(tags=["Data BPS & Formula Estimasi Cukai"])


class CukaiSimulateRequest(BaseModel):
    base_year: int = Field(2025, ge=1990, le=2026, description="Tahun basis perhitungan realisasi")
    target_year: int = Field(2026, ge=1991, le=2030, description="Tahun proyeksi target cukai")
    g_pdb: float = Field(5.2, ge=-20.0, le=20.0, description="Asumsi pertumbuhan PDB riil BPS (% YoY)")
    inflation: float = Field(2.5, ge=-5.0, le=100.0, description="Asumsi inflasi IHK BPS (% YoY)")
    tariff_hike_pct: float = Field(10.0, ge=0.0, le=50.0, description="Rencana penyesuaian tarif cukai rata-rata (% YoY)")
    elasticity_income: float = Field(0.45, ge=-2.0, le=2.0, description="Elastisitas pendapatan terhadap permintaan rokok")
    elasticity_price: float = Field(-0.38, ge=-2.0, le=2.0, description="Elastisitas harga terhadap permintaan rokok")
    pass_through_rate: float = Field(0.85, ge=0.0, le=1.5, description="Transmisi kenaikan tarif ke harga eceran")
    custom_base_revenue: Optional[float] = Field(None, ge=0.0, description="Kustomisasi realisasi CHT tahun basis (Triliun Rp)")
    custom_base_volume: Optional[float] = Field(None, ge=0.0, description="Kustomisasi volume rokok tahun basis (Miliar Batang)")


@router.get("/api/cukai-bps/matrix")
def get_cukai_bps_matrix(
    category: str = Query("ALL", description="ALL | BPS_MAKRO | BPS_SUSENAS | BPS_INDUSTRI | BPS_PERKEBUNAN | BPS_EKSPOR_IMPOR | BPS_SAKERNAS | DJBC_LKPP"),
    start_year: int = Query(1990, ge=1990, le=2026, description="Tahun awal"),
    end_year: int = Query(2026, ge=1990, le=2026, description="Tahun akhir"),
    q: Optional[str] = Query(None, description="Pencarian nama atau kode indikator")
):
    """
    Returns matrix of statutory BPS indicators (1990 - 2026) supporting excise estimation formula.
    """
    try:
        return CukaiBpsService.get_full_matrix(
            category=category,
            start_year=start_year,
            end_year=end_year,
            q=q or ""
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/cukai-bps/indicators")
def get_cukai_bps_indicators():
    """
    Returns list of indicators, statutory sources, categories, and their role in the excise formula.
    """
    try:
        return CukaiBpsService.get_indicator_metadata()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/api/cukai-bps/simulate")
def simulate_cukai_projection(request: CukaiSimulateRequest):
    """
    Computes real-time econometric projection of next-year excise revenue (CHT & APBN).
    """
    try:
        return CukaiBpsService.simulate_cukai_projection(
            base_year=request.base_year,
            target_year=request.target_year,
            g_pdb=request.g_pdb,
            inflation=request.inflation,
            tariff_hike_pct=request.tariff_hike_pct,
            elasticity_income=request.elasticity_income,
            elasticity_price=request.elasticity_price,
            pass_through_rate=request.pass_through_rate,
            custom_base_revenue=request.custom_base_revenue,
            custom_base_volume=request.custom_base_volume
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/cukai-bps/export/excel")
def export_cukai_bps_excel(
    category: str = Query("ALL"),
    start_year: int = Query(1990, ge=1990, le=2026),
    end_year: int = Query(2026, ge=1990, le=2026),
    base_year: int = Query(2025),
    target_year: int = Query(2026),
    g_pdb: float = Query(5.2),
    inflation: float = Query(2.5),
    tariff_hike_pct: float = Query(10.0),
    elasticity_income: float = Query(0.45),
    elasticity_price: float = Query(-0.38),
    pass_through_rate: float = Query(0.85)
):
    """
    Generates downloadable Excel workbook (.xlsx) containing BPS indicators matrix and formula simulation results.
    """
    try:
        sim_params = {
            "base_year": base_year,
            "target_year": target_year,
            "g_pdb": g_pdb,
            "inflation": inflation,
            "tariff_hike_pct": tariff_hike_pct,
            "elasticity_income": elasticity_income,
            "elasticity_price": elasticity_price,
            "pass_through_rate": pass_through_rate
        }
        excel_stream = CukaiBpsService.export_excel(
            category=category,
            start_year=start_year,
            end_year=end_year,
            sim_params=sim_params
        )
        filename = f"INDOEKONOMI_BPS_Estimasi_Cukai_{start_year}_{end_year}.xlsx"
        headers = {
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
        return StreamingResponse(
            excel_stream,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers=headers
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal menghasilkan berkas Excel: {str(e)}")


@router.get("/api/cukai-bps/export/csv")
def export_cukai_bps_csv(
    category: str = Query("ALL"),
    start_year: int = Query(1990, ge=1990, le=2026),
    end_year: int = Query(2026, ge=1990, le=2026)
):
    """
    Generates tabular CSV export for BPS indicators matrix.
    """
    try:
        csv_data = CukaiBpsService.export_csv(category=category, start_year=start_year, end_year=end_year)
        filename = f"INDOEKONOMI_BPS_Estimasi_Cukai_{start_year}_{end_year}.csv"
        headers = {
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
        return Response(
            content=csv_data,
            media_type="text/csv; charset=utf-8",
            headers=headers
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal menghasilkan berkas CSV: {str(e)}")
