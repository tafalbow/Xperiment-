"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
APBN Evaluation Router:
Komparasi RAPBN vs Target UU APBN vs Realisasi Bulanan & YTD (2020 - 2026)
Source: Publikasi Resmi APBN KiTa Kementerian Keuangan RI
==============================================================================
"""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Response
from backend.services.apbn_eval_service import ApbnEvalService

router = APIRouter(tags=["APBN KiTa & RAPBN Evaluation Observatory (2020 - 2026)"])


@router.get("/api/apbn-eval/years")
def get_supported_years():
    """
    Mengembalikan daftar tahun anggaran yang didukung (2020 - 2026),
    status audit (Audited BPK / Angka Sementara APBN KiTa), dan bulan rilis terakhir.
    """
    return {
        "status": "SUCCESS",
        "years": ApbnEvalService.get_supported_years()
    }


@router.get("/api/apbn-eval/summary")
def get_evaluation_summary(
    year: int = Query(2025, ge=2020, le=2026, description="Tahun anggaran (2020 - 2026)"),
    unit: str = Query("TRILLION", description="Satuan nilai: TRILLION (Rp T) atau BILLION (Rp M)")
):
    """
    Mengembalikan ringkasan KPI eksekutif komparasi RAPBN, UU APBN, Realisasi Bulan Berjalan,
    serta akumulasi realisasi YTD dan % capaian.
    """
    try:
        return ApbnEvalService.get_evaluation_summary(year, unit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memuat ringkasan evaluasi APBN: {str(e)}")


@router.get("/api/apbn-eval/matrix")
def get_evaluation_matrix(
    year: int = Query(2025, ge=2020, le=2026, description="Tahun anggaran (2020 - 2026)"),
    category: str = Query("ALL", description="Filter kategori: ALL, PENDAPATAN, BELANJA, KESEIMBANGAN, PEMBIAYAAN"),
    unit: str = Query("TRILLION", description="Satuan nilai: TRILLION atau BILLION"),
    q: Optional[str] = Query(None, description="Pencarian nama pos anggaran atau kode akun")
):
    """
    Mengembalikan matriks komparasi lengkap: Pos Anggaran, RAPBN, UU APBN,
    Realisasi Bulanan M01 s.d. M12, Akumulasi YTD, % APBN, % RAPBN, Sisa Pagu, dan Status Kinerja.
    """
    try:
        return ApbnEvalService.get_evaluation_matrix(year, category, unit, q)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memuat matriks evaluasi APBN: {str(e)}")


@router.get("/api/apbn-eval/trajectory")
def get_trajectory_series(
    year: int = Query(2025, ge=2020, le=2026, description="Tahun anggaran"),
    item_id: str = Query("REV_TOTAL", description="ID Pos Anggaran (contoh: REV_TOTAL, EXP_TOTAL, REV_TAX, EXP_BPP, DEFISIT_ANGGARAN)"),
    unit: str = Query("TRILLION", description="Satuan nilai: TRILLION atau BILLION")
):
    """
    Mengembalikan deret data kurva S-Curve akumulatif Jan-Des:
    Target Linier APBN vs Realisasi YTD vs Realisasi Bulanan vs Realisasi Tahun Lalu.
    """
    try:
        return ApbnEvalService.get_trajectory_series(year, item_id, unit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memuat trajectory kurva APBN: {str(e)}")


@router.get("/api/apbn-eval/export")
def export_evaluation_data(
    year: int = Query(2025, ge=2020, le=2026),
    unit: str = Query("TRILLION", description="TRILLION atau BILLION"),
    format: str = Query("xlsx", description="Format unduhan: xlsx atau csv")
):
    """
    Mengunduh buku kerja Excel 3-Sheet (.xlsx) atau file CSV RFC-4180
    komparasi RAPBN vs UU APBN vs Realisasi Bulanan APBN KiTa.
    """
    clean_fmt = format.lower().strip()
    filename_base = f"INDOEKONOMI_KOMPARASI_RAPBN_APBN_{year}_{unit}"

    if clean_fmt == "csv":
        csv_data = ApbnEvalService.generate_csv_matrix(year, unit)
        return Response(
            content=csv_data,
            media_type="text/csv; charset=utf-8",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.csv"'}
        )
    else:
        excel_bytes = ApbnEvalService.generate_excel_matrix(year, unit)
        return Response(
            content=excel_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f'attachment; filename="{filename_base}.xlsx"'}
        )
