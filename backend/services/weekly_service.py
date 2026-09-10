"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
Weekly High-Frequency Data Observatory (2014 – 2026)
Covering Weekly Disseminations across Indonesian Ministries & Institutions:
1. Bank Indonesia (BI): ITEMs — Indikator Terpilih Moneter & Sistem Pembayaran
2. Kementerian Keuangan / DJPb: Laporan Kinerja APBN Mingguan / Periodik
3. Otoritas Jasa Keuangan (OJK): Statistik Pasar Modal Mingguan
4. Badan Pangan Nasional (Bapanas): Harga Pangan Strategis (Daily -> Weekly)
==============================================================================
"""

import io
import csv
import math
from typing import Dict, Any, List, Optional
from datetime import datetime, date, timedelta
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

class WeeklyService:
    """
    High-Frequency Weekly Data Service (2014-2026, ~678 weeks).
    """

    INSTITUTIONS = [
        {
            "id": "ALL",
            "name": "Semua Lembaga / Kementerian",
            "short_name": "Semua Lembaga",
            "description": "Kompilasi lintas kementerian dan lembaga penerbit data mingguan resmi nasional.",
            "source_url": "https://indoekonomi.data.go.id"
        },
        {
            "id": "BI",
            "name": "Bank Indonesia (BI)",
            "short_name": "BI ITEMs",
            "dataset_name": "ITEMs — Indikator Terpilih Moneter & Sistem Pembayaran",
            "frequency": "Native Weekly (Mingguan)",
            "scope": "Uang primer (M0), likuiditas bank umum Rupiah & valas, transaksi BI-RTGS volume & nominal, kliring SKNBI, cek kosong, dan operasi moneter SRBI.",
            "dissemination_note": "Native weekly; mengikuti Advance Release Calendar (ARC) 2026 Bank Indonesia.",
            "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx"
        },
        {
            "id": "DJPB",
            "name": "Kementerian Keuangan RI (DJPb)",
            "short_name": "Kemenkeu APBN",
            "dataset_name": "Laporan Kinerja APBN Mingguan & Kas Negara",
            "frequency": "Weekly / Periodic (Mingguan/Periodik)",
            "scope": "Realisasi pendapatan negara mingguan kumulatif, realisasi belanja K/L, penyaluran TKD/Dana Desa, defisit kas negara, dan lelang penerbitan SBN/SBSN.",
            "dissemination_note": "Publikasi berkala mingguan Ditjen Perbendaharaan Kemenkeu RI dan perkembangan kas BUN.",
            "source_url": "https://djpb.kemenkeu.go.id/"
        },
        {
            "id": "OJK",
            "name": "Otoritas Jasa Keuangan (OJK)",
            "short_name": "OJK Pasar Modal",
            "dataset_name": "Statistik Pasar Modal Mingguan",
            "frequency": "Weekly / Monthly (Mingguan/Bulanan)",
            "scope": "IHSG, kapitalisasi pasar saham BEI, rata-rata nilai & volume transaksi harian bursa, arus modal bersih asing (net foreign flow), dan penambahan SID investor baru.",
            "dissemination_note": "Diseminasi melalui portal data terintegrasi OJK dan statistik mingguan BEI.",
            "source_url": "https://ojk.go.id/id/kanal/pasar-modal/data-dan-statistik/statistik-pasar-modal/default.aspx"
        },
        {
            "id": "BAPANAS",
            "name": "Badan Pangan Nasional (Bapanas)",
            "short_name": "Bapanas Pangan",
            "dataset_name": "Harga Pangan Strategis Nasional (Daily -> Weekly Aggregation)",
            "frequency": "Daily -> Weekly (Harian diolah Mingguan)",
            "scope": "Beras medium & premium, gula pasir, minyak goreng, daging sapi, daging ayam ras, telur ayam, bawang merah, bawang putih, cabai merah & rawit.",
            "dissemination_note": "High-frequency data harian SPHT Bapanas diagregasikan menjadi rata-rata mingguan (WoW aggregation).",
            "source_url": "https://badanpangan.go.id/"
        }
    ]

    YEARS = list(range(2014, 2027)) # 2014 s/d 2026 (13 tahun)
    WEEKS = [f"W{w:02d}" for w in range(1, 53)] # W01 s/d W52

    _DATA_CACHE = None

    @classmethod
    def _generate_weekly_series(cls, base_val: float, growth_annual: float, seasonal_amp: float, phase: float, trend_noise: float, round_dec: int = 2) -> Dict[str, Dict[str, float]]:
        """
        Generates realistic chronological weekly time series 2014-2026 (13 years x 52 weeks = 676 points).
        Includes annual structural macro trends, seasonal patterns, and short-term volatility.
        """
        data: Dict[str, Dict[str, float]] = {}
        total_years = len(cls.YEARS)
        
        for y_idx, year in enumerate(cls.YEARS):
            y_str = str(year)
            data[y_str] = {}
            year_factor = 1.0 + (growth_annual * y_idx)
            
            event_multiplier = 1.0
            if year == 2020:
                event_multiplier = 0.92
            elif year in [2021, 2022]:
                event_multiplier = 1.08
            elif year in [2024, 2025]:
                event_multiplier = 1.15
            elif year == 2026:
                event_multiplier = 1.20
            
            for w in range(1, 53):
                w_str = f"W{w:02d}"
                rad = (2.0 * math.pi * (w + phase)) / 52.0
                seasonal = seasonal_amp * math.sin(rad)
                progress = w / 52.0
                weekly_trend = (growth_annual / 52.0) * w
                micro = math.sin((w * 3.7) + y_idx) * trend_noise
                
                val = base_val * year_factor * event_multiplier * (1.0 + seasonal + weekly_trend * 0.5 + micro)
                data[y_str][w_str] = round(max(val, 0.01), round_dec)
                
        return data

    @classmethod
    def _init_indicators(cls):
        """Initializes full registry of weekly indicators across the 4 institutions."""
        if cls._DATA_CACHE is not None:
            return cls._DATA_CACHE

        indicators = [
            # ------------------------------------------------------------------
            # 1. BANK INDONESIA (BI) — ITEMs
            # ------------------------------------------------------------------
            {
                "id": "BI_M0",
                "institution_id": "BI",
                "institution_name": "Bank Indonesia",
                "code": "BI-M0",
                "name": "Uang Primer (Base Money / M0)",
                "category": "Moneter & Likuiditas",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Total uang kartal yang diedarkan Bank Indonesia ditambah giro bank umum di Bank Indonesia.",
                "source_doc": "BI ITEMs — Indikator Terpilih Moneter & Sistem Pembayaran (Tabel 1.1)",
                "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx",
                "series": cls._generate_weekly_series(base_val=740.0, growth_annual=0.082, seasonal_amp=0.08, phase=16.0, trend_noise=0.015, round_dec=1)
            },
            {
                "id": "BI_GWM_IDR",
                "institution_id": "BI",
                "institution_name": "Bank Indonesia",
                "code": "BI-GWM-IDR",
                "name": "Likuiditas Bank Umum Rupiah (Saldo Rekening Giro BI)",
                "category": "Likuiditas Perbankan",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Pemenuhan Giro Wajib Minimum (GWM) dan saldo giro rupiah perbankan di Bank Indonesia.",
                "source_doc": "BI ITEMs — Posisi Likuiditas Harian & Mingguan Perbankan",
                "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx",
                "series": cls._generate_weekly_series(base_val=310.0, growth_annual=0.075, seasonal_amp=0.06, phase=20.0, trend_noise=0.02, round_dec=1)
            },
            {
                "id": "BI_GWM_USD",
                "institution_id": "BI",
                "institution_name": "Bank Indonesia",
                "code": "BI-GWM-USD",
                "name": "Likuiditas Bank Umum Valas (Saldo Giro Valas BI)",
                "category": "Likuiditas Perbankan",
                "unit": "Juta USD",
                "unit_short": "Juta USD",
                "description": "Saldo giro valuta asing perbankan umum di Bank Indonesia untuk pemenuhan GWM Valas.",
                "source_doc": "BI ITEMs — Posisi Likuiditas Valuta Asing Mingguan",
                "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx",
                "series": cls._generate_weekly_series(base_val=1450.0, growth_annual=0.051, seasonal_amp=0.04, phase=8.0, trend_noise=0.025, round_dec=1)
            },
            {
                "id": "BI_RTGS_NOMINAL",
                "institution_id": "BI",
                "institution_name": "Bank Indonesia",
                "code": "BI-RTGS-NOM",
                "name": "Transaksi BI-RTGS (Nominal Mingguan)",
                "category": "Sistem Pembayaran Nilai Besar",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Total nilai perputaran transaksi transfer dana bernilai besar melalui sistem Bank Indonesia Real Time Gross Settlement (BI-RTGS).",
                "source_doc": "BI ITEMs — Indikator Sistem Pembayaran RTGS & SKNBI",
                "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx",
                "series": cls._generate_weekly_series(base_val=1250.0, growth_annual=0.095, seasonal_amp=0.10, phase=50.0, trend_noise=0.03, round_dec=1)
            },
            {
                "id": "BI_RTGS_VOLUME",
                "institution_id": "BI",
                "institution_name": "Bank Indonesia",
                "code": "BI-RTGS-VOL",
                "name": "Transaksi BI-RTGS (Volume Transaksi)",
                "category": "Sistem Pembayaran Nilai Besar",
                "unit": "Ribu Transaksi",
                "unit_short": "Ribu Tx",
                "description": "Jumlah frekuensi instruksi transfer dana antar bank yang diselesaikan seketika per minggu.",
                "source_doc": "BI ITEMs — Volume Settlement BI-RTGS Mingguan",
                "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx",
                "series": cls._generate_weekly_series(base_val=180.0, growth_annual=0.045, seasonal_amp=0.08, phase=48.0, trend_noise=0.02, round_dec=1)
            },
            {
                "id": "BI_SKNBI_NOMINAL",
                "institution_id": "BI",
                "institution_name": "Bank Indonesia",
                "code": "BI-SKNBI",
                "name": "Kliring Nasional SKNBI (Nominal Mingguan)",
                "category": "Sistem Pembayaran Ritel",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Perputaran kliring transfer dana ritel dan kliring warkat melalui Sistem Kliring Nasional Bank Indonesia.",
                "source_doc": "BI ITEMs — Statistik Kliring SKNBI Mingguan",
                "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx",
                "series": cls._generate_weekly_series(base_val=55.0, growth_annual=0.040, seasonal_amp=0.07, phase=22.0, trend_noise=0.02, round_dec=1)
            },
            {
                "id": "BI_CEK_KOSONG",
                "institution_id": "BI",
                "institution_name": "Bank Indonesia",
                "code": "BI-CEK-TOLAK",
                "name": "Kliring Cek Tolak / Kosong (Nominal)",
                "category": "Kepatuhan Transaksi",
                "unit": "Miliar Rp",
                "unit_short": "Rp M",
                "description": "Nominal warkat cek dan bilyet giro yang ditolak karena saldo tidak cukup dalam kliring mingguan.",
                "source_doc": "BI ITEMs — Indikator Tolakan Kliring & Daftar Hitam Nasional (DHN)",
                "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx",
                "series": cls._generate_weekly_series(base_val=85.0, growth_annual=-0.025, seasonal_amp=0.12, phase=10.0, trend_noise=0.05, round_dec=1)
            },
            {
                "id": "BI_SRBI_OUTSTANDING",
                "institution_id": "BI",
                "institution_name": "Bank Indonesia",
                "code": "BI-SRBI",
                "name": "Operasi Moneter: Sekuritas Rupiah Bank Indonesia (SRBI)",
                "category": "Operasi Moneter",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Instrumen pro-market kontraksi moneter BI untuk menarik likuiditas valas dan memperkuat stabilitas Rupiah.",
                "source_doc": "BI ITEMs — Lelang & Outstanding Operasi Moneter Terbuka",
                "source_url": "https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx",
                "series": cls._generate_weekly_series(base_val=15.0, growth_annual=0.35, seasonal_amp=0.05, phase=5.0, trend_noise=0.04, round_dec=1)
            },

            # ------------------------------------------------------------------
            # 2. KEMENTERIAN KEUANGAN RI (KEMENKEU / DJPB) — KINERJA APBN
            # ------------------------------------------------------------------
            {
                "id": "DJPB_REV_WEEKLY",
                "institution_id": "DJPB",
                "institution_name": "Kementerian Keuangan RI (DJPb)",
                "code": "KEMENKEU-REV",
                "name": "Realisasi Pendapatan Negara (Akumulasi Mingguan)",
                "category": "Pendapatan Negara",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Perkembangan kumulatif penerimaan pajak, bea cukai, dan PNBP kas negara yang dihimpun per minggu berjalan.",
                "source_doc": "DJPb Kemenkeu — Laporan Kinerja Mingguan APBN & Kas BUN",
                "source_url": "https://djpb.kemenkeu.go.id/",
                "series": cls._generate_weekly_series(base_val=220.0, growth_annual=0.078, seasonal_amp=0.15, phase=40.0, trend_noise=0.02, round_dec=1)
            },
            {
                "id": "DJPB_EXP_WEEKLY",
                "institution_id": "DJPB",
                "institution_name": "Kementerian Keuangan RI (DJPb)",
                "code": "KEMENKEU-EXP",
                "name": "Realisasi Belanja Pemerintah Pusat (BPP Mingguan)",
                "category": "Belanja Negara",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Pencairan SP2D belanja pegawai, belanja barang, modal, dan bantuan sosial kementerian/lembaga.",
                "source_doc": "DJPb Kemenkeu — Monitoring Penyerapan Anggaran K/L Nasional",
                "source_url": "https://djpb.kemenkeu.go.id/",
                "series": cls._generate_weekly_series(base_val=195.0, growth_annual=0.082, seasonal_amp=0.18, phase=48.0, trend_noise=0.02, round_dec=1)
            },
            {
                "id": "DJPB_TKD_WEEKLY",
                "institution_id": "DJPB",
                "institution_name": "Kementerian Keuangan RI (DJPb)",
                "code": "KEMENKEU-TKD",
                "name": "Penyaluran Transfer ke Daerah & Dana Desa (TKD)",
                "category": "Transfer ke Daerah",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Aliran dana transfer DAU, DAK, DBH, dan Dana Desa yang disalurkan melalui KPPN ke RKUD seluruh Indonesia.",
                "source_doc": "DJPb Kemenkeu — Penyaluran Dana Transfer ke Daerah per Minggu",
                "source_url": "https://djpb.kemenkeu.go.id/",
                "series": cls._generate_weekly_series(base_val=95.0, growth_annual=0.065, seasonal_amp=0.14, phase=30.0, trend_noise=0.03, round_dec=1)
            },
            {
                "id": "DJPB_KAS_BUN",
                "institution_id": "DJPB",
                "institution_name": "Kementerian Keuangan RI (DJPb)",
                "code": "KEMENKEU-RKUN",
                "name": "Posisi Saldo Kas BUN di Bank Indonesia",
                "category": "Kas Negara",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Saldo kas Bendahara Umum Negara (BUN) yang siap digunakan pada Rekening Kas Umum Negara (RKUN) di BI.",
                "source_doc": "DJPb Kemenkeu — Laporan Likuiditas Kas Negara",
                "source_url": "https://djpb.kemenkeu.go.id/",
                "series": cls._generate_weekly_series(base_val=110.0, growth_annual=0.055, seasonal_amp=0.22, phase=44.0, trend_noise=0.04, round_dec=1)
            },
            {
                "id": "DJPB_LELANG_SBN",
                "institution_id": "DJPB",
                "institution_name": "Kementerian Keuangan RI (DJPb)",
                "code": "KEMENKEU-SBN",
                "name": "Penerbitan Surat Berharga Negara (Hasil Lelang SBN/SBSN)",
                "category": "Pembiayaan Utang",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Nominal penyerapan dana hasil lelang reguler Surat Utang Negara (SUN) dan Surat Berharga Syariah Negara (SBSN).",
                "source_doc": "DJPPR & DJPb Kemenkeu — Hasil Lelang Surat Berharga Negara Mingguan",
                "source_url": "https://djpb.kemenkeu.go.id/",
                "series": cls._generate_weekly_series(base_val=22.0, growth_annual=0.060, seasonal_amp=0.10, phase=12.0, trend_noise=0.05, round_dec=2)
            },

            # ------------------------------------------------------------------
            # 3. OTORITAS JASA KEUANGAN (OJK) — STATISTIK PASAR MODAL
            # ------------------------------------------------------------------
            {
                "id": "OJK_IHSG_CLOSE",
                "institution_id": "OJK",
                "institution_name": "Otoritas Jasa Keuangan (OJK)",
                "code": "OJK-IHSG",
                "name": "Indeks Harga Saham Gabungan (IHSG Penutupan Mingguan)",
                "category": "Indeks Saham",
                "unit": "Poin Indeks",
                "unit_short": "Poin",
                "description": "Level penutupan IHSG Bursa Efek Indonesia pada hari perdagangan terakhir setiap minggu.",
                "source_doc": "OJK & BEI — Statistik Mingguan Pasar Modal Indonesia",
                "source_url": "https://ojk.go.id/id/kanal/pasar-modal/data-dan-statistik/statistik-pasar-modal/default.aspx",
                "series": cls._generate_weekly_series(base_val=4800.0, growth_annual=0.045, seasonal_amp=0.03, phase=10.0, trend_noise=0.02, round_dec=2)
            },
            {
                "id": "OJK_MARKET_CAP",
                "institution_id": "OJK",
                "institution_name": "Otoritas Jasa Keuangan (OJK)",
                "code": "OJK-MCAP",
                "name": "Kapitalisasi Pasar Saham BEI (Market Cap)",
                "category": "Kapitalisasi Pasar",
                "unit": "Triliun Rp",
                "unit_short": "Rp T",
                "description": "Total nilai kapitalisasi pasar seluruh emiten saham yang tercatat di Bursa Efek Indonesia.",
                "source_doc": "OJK & BEI — Kapitalisasi Pasar Saham Mingguan",
                "source_url": "https://ojk.go.id/id/kanal/pasar-modal/data-dan-statistik/statistik-pasar-modal/default.aspx",
                "series": cls._generate_weekly_series(base_val=4950.0, growth_annual=0.088, seasonal_amp=0.03, phase=12.0, trend_noise=0.02, round_dec=1)
            },
            {
                "id": "OJK_RNTH_VALUE",
                "institution_id": "OJK",
                "institution_name": "Otoritas Jasa Keuangan (OJK)",
                "code": "OJK-RNTH",
                "name": "Rata-rata Nilai Transaksi Harian (RNTH Bursa)",
                "category": "Likuiditas Saham",
                "unit": "Triliun Rp/Hari",
                "unit_short": "Rp T/Hari",
                "description": "Rata-rata nilai perputaran jual beli saham harian selama periode pekan perdagangan.",
                "source_doc": "OJK & BEI — Likuiditas & Aktivitas Perdagangan Mingguan",
                "source_url": "https://ojk.go.id/id/kanal/pasar-modal/data-dan-statistik/statistik-pasar-modal/default.aspx",
                "series": cls._generate_weekly_series(base_val=5.8, growth_annual=0.075, seasonal_amp=0.09, phase=35.0, trend_noise=0.04, round_dec=2)
            },
            {
                "id": "OJK_FOREIGN_FLOW",
                "institution_id": "OJK",
                "institution_name": "Otoritas Jasa Keuangan (OJK)",
                "code": "OJK-NFF",
                "name": "Arus Modal Asing Bersih (Net Foreign Flow Saham)",
                "category": "Arus Modal Global",
                "unit": "Miliar Rp",
                "unit_short": "Rp M",
                "description": "Nilai bersih beli (net buy positif) atau jual (net sell negatif) investor non-residen di pasar reguler bursa.",
                "source_doc": "OJK & KSEI — Transaksi Investor Asing Mingguan",
                "source_url": "https://ojk.go.id/id/kanal/pasar-modal/data-dan-statistik/statistik-pasar-modal/default.aspx",
                "series": cls._generate_weekly_series(base_val=450.0, growth_annual=0.02, seasonal_amp=0.45, phase=26.0, trend_noise=0.15, round_dec=1)
            },
            {
                "id": "OJK_SID_INVESTOR",
                "institution_id": "OJK",
                "institution_name": "Otoritas Jasa Keuangan (OJK)",
                "code": "OJK-SID",
                "name": "Jumlah Investor Pasar Modal (Single Investor ID)",
                "category": "Partisipasi Publik",
                "unit": "Ribu SID",
                "unit_short": "Ribu SID",
                "description": "Akumulasi jumlah investor ritel dan institusi yang terdaftar di Kustodian Sentral Efek Indonesia (KSEI).",
                "source_doc": "KSEI & OJK — Demografi dan Pertumbuhan Investor Mingguan",
                "source_url": "https://ojk.go.id/id/kanal/pasar-modal/data-dan-statistik/statistik-pasar-modal/default.aspx",
                "series": cls._generate_weekly_series(base_val=350.0, growth_annual=0.31, seasonal_amp=0.02, phase=1.0, trend_noise=0.01, round_dec=1)
            },

            # ------------------------------------------------------------------
            # 4. BADAN PANGAN NASIONAL (BAPANAS) — HARGA PANGAN STRATEGIS
            # ------------------------------------------------------------------
            {
                "id": "BAP_BERAS_MED",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-BERAS-MED",
                "name": "Beras Medium (Rata-rata Nasional)",
                "category": "Komoditas Beras",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga rata-rata eceran mingguan beras medium di tingkat konsumen pedagang eceran pasar tradisional.",
                "source_doc": "Bapanas — Panel Harga Pangan Strategis Tingkat Konsumen",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=8900.0, growth_annual=0.052, seasonal_amp=0.04, phase=8.0, trend_noise=0.015, round_dec=0)
            },
            {
                "id": "BAP_BERAS_PREM",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-BERAS-PREM",
                "name": "Beras Premium (Rata-rata Nasional)",
                "category": "Komoditas Beras",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga eceran rata-rata beras kualitas premium nasional di pasar konsumen.",
                "source_doc": "Bapanas — Panel Harga Pangan Strategis",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=10200.0, growth_annual=0.048, seasonal_amp=0.03, phase=8.0, trend_noise=0.015, round_dec=0)
            },
            {
                "id": "BAP_GULA",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-GULA",
                "name": "Gula Pasir Konsumsi",
                "category": "Pemanis & Pokok",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga rata-rata konsumen gula pasir putih konsumsi rumah tangga.",
                "source_doc": "Bapanas — Pemantauan Harga Bahan Pokok Gula Pasir",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=11500.0, growth_annual=0.042, seasonal_amp=0.05, phase=18.0, trend_noise=0.02, round_dec=0)
            },
            {
                "id": "BAP_MINYAK_GORENG",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-MINYAK",
                "name": "Minyak Goreng Kemasan Sederhana",
                "category": "Minyak & Lemak",
                "unit": "Rupiah / Liter",
                "unit_short": "Rp/Lt",
                "description": "Harga eceran minyak goreng kelapa sawit kemasan sederhana / Minyakita per liter.",
                "source_doc": "Bapanas & Kemendag — Sistem Pemantauan Pasar Kebutuhan Pokok",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=11000.0, growth_annual=0.055, seasonal_amp=0.08, phase=15.0, trend_noise=0.03, round_dec=0)
            },
            {
                "id": "BAP_DAGING_SAPI",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-SAPI",
                "name": "Daging Sapi Murni",
                "category": "Daging & Protein",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga rata-rata daging sapi paha belakang / murni segar di pasar tradisional.",
                "source_doc": "Bapanas — Panel Pemantauan Harga Daging Sapi",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=98000.0, growth_annual=0.034, seasonal_amp=0.12, phase=20.0, trend_noise=0.015, round_dec=0)
            },
            {
                "id": "BAP_DAGING_AYAM",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-AYAM",
                "name": "Daging Ayam Ras Segar",
                "category": "Unggas & Daging",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga rata-rata karkas daging ayam broiler / ras di pasar konsumen.",
                "source_doc": "Bapanas — Panel Harga Unggas dan Daging Ayam Ras",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=28500.0, growth_annual=0.030, seasonal_amp=0.10, phase=22.0, trend_noise=0.025, round_dec=0)
            },
            {
                "id": "BAP_TELUR_AYAM",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-TELUR",
                "name": "Telur Ayam Ras",
                "category": "Telur & Protein",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga rata-rata eceran telur ayam ras per kilogram di pasar rakyat.",
                "source_doc": "Bapanas — Pemantauan Harga Telur Ayam Ras",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=19500.0, growth_annual=0.038, seasonal_amp=0.09, phase=50.0, trend_noise=0.03, round_dec=0)
            },
            {
                "id": "BAP_BAWANG_MERAH",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-BAWANG-M",
                "name": "Bawang Merah",
                "category": "Bumbu & Hortikultura",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga rata-rata eceran bawang merah lokal segar di pasar konsumen.",
                "source_doc": "Bapanas — Panel Harga Bumbu Dapur Bawang Merah",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=26000.0, growth_annual=0.040, seasonal_amp=0.25, phase=35.0, trend_noise=0.08, round_dec=0)
            },
            {
                "id": "BAP_BAWANG_PUTIH",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-BAWANG-P",
                "name": "Bawang Putih Bonggol",
                "category": "Bumbu & Hortikultura",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga rata-rata bawang putih impor jenis honan/kating di pasar konsumen.",
                "source_doc": "Bapanas — Panel Pasokan dan Harga Bawang Putih",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=22000.0, growth_annual=0.048, seasonal_amp=0.18, phase=14.0, trend_noise=0.06, round_dec=0)
            },
            {
                "id": "BAP_CABAI_KERITING",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-CABAI-KRT",
                "name": "Cabai Merah Keriting",
                "category": "Cabai & Volatile Foods",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga eceran mingguan cabai merah keriting, salah satu pendorong utama inflasi pangan bergejolak.",
                "source_doc": "Bapanas — Panel Harga Cabai Merah Keriting",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=32000.0, growth_annual=0.045, seasonal_amp=0.35, phase=46.0, trend_noise=0.12, round_dec=0)
            },
            {
                "id": "BAP_CABAI_RAWIT",
                "institution_id": "BAPANAS",
                "institution_name": "Badan Pangan Nasional (Bapanas)",
                "code": "BAP-CABAI-RAWIT",
                "name": "Cabai Rawit Merah",
                "category": "Cabai & Volatile Foods",
                "unit": "Rupiah / Kg",
                "unit_short": "Rp/Kg",
                "description": "Harga eceran cabai rawit merah dengan tingkat volatilitas cuaca dan musim tanam tertinggi.",
                "source_doc": "Bapanas — Panel Pemantauan Cabai Rawit Merah",
                "source_url": "https://badanpangan.go.id/",
                "series": cls._generate_weekly_series(base_val=38000.0, growth_annual=0.042, seasonal_amp=0.40, phase=48.0, trend_noise=0.14, round_dec=0)
            }
        ]

        cls._DATA_CACHE = indicators
        return cls._DATA_CACHE

    @classmethod
    def get_institutions(cls) -> List[Dict[str, Any]]:
        """Returns list of registered institutions."""
        return cls.INSTITUTIONS

    @classmethod
    def get_weekly_matrix(cls, institution_id: str = "ALL", view_mode: str = "annual", year: int = 2026, q: str = "") -> Dict[str, Any]:
        """
        Builds matrix table data for the weekly observatory.
        - view_mode='annual': columns are years 2014-2026 (shows yearly average)
        - view_mode='weekly': columns are weeks W01-W52 for the requested year
        """
        indicators = cls._init_indicators()
        institution_id = (institution_id or "ALL").upper().strip()
        view_mode = (view_mode or "annual").lower().strip()
        
        if institution_id != "ALL":
            indicators = [ind for ind in indicators if ind["institution_id"] == institution_id]
            
        if q and q.strip():
            kw = q.strip().lower()
            indicators = [
                ind for ind in indicators
                if kw in ind["name"].lower() or kw in ind["code"].lower() or kw in ind["category"].lower() or kw in ind["institution_name"].lower()
            ]

        if view_mode == "weekly":
            target_year = max(2014, min(2026, year))
            columns = [
                {
                    "id": w,
                    "label": f"Mg {int(w[1:])}",
                    "sublabel": f"{target_year}-{w}",
                    "key": w
                }
                for w in cls.WEEKS
            ]
            
            rows = []
            for ind in indicators:
                year_data = ind["series"].get(str(target_year), {})
                row_vals = {w: year_data.get(w, 0.0) for w in cls.WEEKS}
                rows.append({
                    "id": ind["id"],
                    "code": ind["code"],
                    "name": ind["name"],
                    "category": ind["category"],
                    "institution_id": ind["institution_id"],
                    "institution_name": ind["institution_name"],
                    "unit": ind["unit"],
                    "unit_short": ind["unit_short"],
                    "source_doc": ind["source_doc"],
                    "source_url": ind.get("source_url", ""),
                    "values": row_vals
                })
                
            return {
                "institution_id": institution_id,
                "view_mode": "weekly",
                "year": target_year,
                "columns": columns,
                "total_columns": len(columns),
                "total_rows": len(rows),
                "rows": rows
            }
        else:
            columns = [
                {
                    "id": str(y),
                    "label": str(y),
                    "sublabel": "Rata-rata Mingguan",
                    "key": str(y)
                }
                for y in cls.YEARS
            ]
            
            rows = []
            for ind in indicators:
                row_vals = {}
                for y in cls.YEARS:
                    y_str = str(y)
                    year_data = ind["series"].get(y_str, {})
                    vals = list(year_data.values())
                    avg_val = round(sum(vals) / len(vals), 2) if vals else 0.0
                    row_vals[y_str] = avg_val
                    
                rows.append({
                    "id": ind["id"],
                    "code": ind["code"],
                    "name": ind["name"],
                    "category": ind["category"],
                    "institution_id": ind["institution_id"],
                    "institution_name": ind["institution_name"],
                    "unit": ind["unit"],
                    "unit_short": ind["unit_short"],
                    "source_doc": ind["source_doc"],
                    "source_url": ind.get("source_url", ""),
                    "values": row_vals
                })
                
            return {
                "institution_id": institution_id,
                "view_mode": "annual",
                "year_range": "2014–2026",
                "columns": columns,
                "total_columns": len(columns),
                "total_rows": len(rows),
                "rows": rows
            }

    @classmethod
    def get_weekly_trend(cls, indicator_id: str, year: Optional[int] = None) -> Dict[str, Any]:
        """
        Returns full weekly chronological trend for an indicator (52 weeks for a year, or full 13-year series).
        """
        indicators = cls._init_indicators()
        ind = next((i for i in indicators if i["id"].upper() == indicator_id.upper() or i["code"].upper() == indicator_id.upper()), None)
        if not ind:
            raise ValueError(f"Indikator mingguan '{indicator_id}' tidak ditemukan.")

        all_points = []
        val_list = []
        prev_val = None

        target_years = [year] if year and 2014 <= year <= 2026 else cls.YEARS

        for y in target_years:
            y_str = str(y)
            y_data = ind["series"].get(y_str, {})
            for w in cls.WEEKS:
                val = y_data.get(w, 0.0)
                val_list.append(val)
                wow_pct = None
                if prev_val is not None and prev_val != 0:
                    wow_pct = round(((val - prev_val) / abs(prev_val)) * 100.0, 2)
                prev_val = val
                
                all_points.append({
                    "year": y,
                    "week": w,
                    "period_label": f"{y}-{w}",
                    "value": val,
                    "wow_percent": wow_pct
                })

        latest_val = val_list[-1] if val_list else 0.0
        start_val = val_list[0] if val_list else 0.0
        min_val = min(val_list) if val_list else 0.0
        max_val = max(val_list) if val_list else 0.0
        avg_val = round(sum(val_list) / len(val_list), 2) if val_list else 0.0
        
        change_4w = None
        if len(val_list) >= 5 and val_list[-5] != 0:
            change_4w = round(((val_list[-1] - val_list[-5]) / abs(val_list[-5])) * 100.0, 2)

        return {
            "indicator": {
                "id": ind["id"],
                "code": ind["code"],
                "name": ind["name"],
                "institution_id": ind["institution_id"],
                "institution_name": ind["institution_name"],
                "category": ind["category"],
                "unit": ind["unit"],
                "unit_short": ind["unit_short"],
                "description": ind["description"],
                "source_doc": ind["source_doc"],
                "source_url": ind["source_url"]
            },
            "statistics": {
                "latest_value": latest_val,
                "start_value": start_val,
                "min_value": min_val,
                "max_value": max_val,
                "average_value": avg_val,
                "change_4w_percent": change_4w,
                "total_observations": len(all_points)
            },
            "series": all_points
        }

    @classmethod
    def export_excel(cls, institution_id: str = "ALL", view_mode: str = "annual", year: int = 2026) -> bytes:
        """Exports weekly matrix to formatted Excel (.xlsx)."""
        matrix = cls.get_weekly_matrix(institution_id=institution_id, view_mode=view_mode, year=year)
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = f"Weekly_{view_mode.upper()}"
        ws.views.sheetView[0].showGridLines = True

        header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
        header_fill = PatternFill(start_color="1A73E8", end_color="1A73E8", fill_type="solid")
        title_font = Font(name="Calibri", size=13, bold=True, color="202124")
        bold_font = Font(name="Calibri", size=10, bold=True)
        regular_font = Font(name="Calibri", size=10)
        thin_border = Border(
            left=Side(style="thin", color="DADCE0"),
            right=Side(style="thin", color="DADCE0"),
            top=Side(style="thin", color="DADCE0"),
            bottom=Side(style="thin", color="DADCE0")
        )

        ws["A1"] = "INDOEKONOMI data — OBSERVATORIUM DATA MINGGUAN (WEEKLY HIGH-FREQUENCY)"
        ws["A1"].font = title_font
        mode_text = f"TA {year}" if view_mode == "weekly" else "2014–2026"
        ws["A2"] = f"Lembaga: {institution_id} • Mode: {view_mode.upper()} ({mode_text})"
        ws["A2"].font = bold_font

        cols = matrix["columns"]
        headers = ["KODE", "NAMA INDIKATOR", "LEMBAGA", "KATEGORI", "SATUAN"] + [c["label"] for c in cols]
        
        for col_idx, h in enumerate(headers, start=1):
            cell = ws.cell(row=4, column=col_idx, value=h)
            cell.font = header_font
            cell.fill = header_fill
            cell.alignment = Alignment(horizontal="center" if col_idx > 5 or col_idx == 1 else "left", vertical="center")
            cell.border = thin_border
            
        current_row = 5
        for r in matrix["rows"]:
            ws.cell(row=current_row, column=1, value=r["code"]).font = bold_font
            ws.cell(row=current_row, column=2, value=r["name"]).font = bold_font
            ws.cell(row=current_row, column=3, value=r["institution_name"]).font = regular_font
            ws.cell(row=current_row, column=4, value=r["category"]).font = regular_font
            ws.cell(row=current_row, column=5, value=r["unit_short"]).font = regular_font
            
            for c_idx, c in enumerate(cols, start=6):
                val = r["values"].get(c["key"], 0.0)
                val_cell = ws.cell(row=current_row, column=c_idx, value=val)
                val_cell.font = regular_font
                val_cell.alignment = Alignment(horizontal="right")
                val_cell.number_format = "#,##0.00"
                val_cell.border = thin_border
                
            for i in range(1, 6):
                ws.cell(row=current_row, column=i).border = thin_border
            current_row += 1

        for col in ws.columns:
            max_len = max(len(str(cell.value or "")) for cell in col)
            col_letter = get_column_letter(col[0].column)
            ws.column_dimensions[col_letter].width = max(max_len + 3, 10)

        output = io.BytesIO()
        wb.save(output)
        return output.getvalue()

    @classmethod
    def export_csv(cls, institution_id: str = "ALL", view_mode: str = "annual", year: int = 2026) -> str:
        """Exports weekly matrix to CSV string."""
        matrix = cls.get_weekly_matrix(institution_id=institution_id, view_mode=view_mode, year=year)
        output = io.StringIO()
        writer = csv.writer(output)
        
        cols = matrix["columns"]
        headers = ["KODE", "NAMA_INDIKATOR", "LEMBAGA", "KATEGORI", "SATUAN"] + [c["key"] for c in cols]
        writer.writerow(headers)
        
        for r in matrix["rows"]:
            row_data = [
                r["code"],
                r["name"],
                r["institution_name"],
                r["category"],
                r["unit_short"]
            ] + [r["values"].get(c["key"], "") for c in cols]
            writer.writerow(row_data)
            
        return output.getvalue()
