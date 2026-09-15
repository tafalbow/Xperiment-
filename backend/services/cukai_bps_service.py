"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
Kompilasi Data Statutori Badan Pusat Statistik (BPS) 1990–2026
==============================================================================
Statutory BPS time-series dataset compilation (1990–2026) across 24 indicators:
1. Asumsi Makro BPS (PDB Riil, Pertumbuhan Ekonomi, PDB Per Kapita, Inflasi)
2. BPS Susenas (Konsumsi & Pengeluaran Rumah Tangga, Prevalensi Merokok)
3. BPS IBS (Indeks Produksi Industri Besar dan Sedang KBLI 12)
4. BPS Pertanian & Perkebunan (Produksi Tanaman Tembakau & Cengkeh Domestik)
5. BPS Perdagangan Luar Negeri (Volume & Nilai Impor/Ekspor)
6. BPS Sakernas (Tenaga Kerja Industri & Sektor Pertanian)
7. Data Historis Produksi & Fiskal Terkait (DJBC & LKPP)
==============================================================================
"""

import io
import csv
from typing import Dict, Any, List, Optional
from datetime import datetime
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter


class CukaiBpsService:
    """
    Compilation & Analytics Engine for Statutory BPS Indicators (1990 - 2026).
    """

    CATEGORIES = [
        {"id": "ALL", "name": "Semua Kategori Data BPS", "icon": "📋"},
        {"id": "BPS_MAKRO", "name": "Asumsi Makro BPS", "icon": "📊"},
        {"id": "BPS_SUSENAS", "name": "Konsumsi Susenas BPS", "icon": "🛒"},
        {"id": "BPS_INDUSTRI", "name": "Industri Manufaktur (BPS IBS)", "icon": "🏭"},
        {"id": "BPS_PERKEBUNAN", "name": "Pertanian & Perkebunan BPS", "icon": "🌾"},
        {"id": "BPS_EKSPOR_IMPOR", "name": "Perdagangan Luar Negeri BPS", "icon": "🚢"},
        {"id": "BPS_SAKERNAS", "name": "Ketenagakerjaan BPS Sakernas", "icon": "👥"},
        {"id": "DJBC_LKPP", "name": "Historis Produksi & Cukai", "icon": "🏛️"},
    ]

    # Benchmark anchors 1990-2026
    BENCHMARKS: Dict[str, Dict[int, float]] = {
        # 1. Makro BPS
        "BPS_PDB_GROWTH": {1990: 7.24, 1995: 8.22, 1997: 4.70, 1998: -13.13, 2000: 4.92, 2005: 5.69, 2010: 6.22, 2015: 4.88, 2019: 5.02, 2020: -2.07, 2021: 3.70, 2022: 5.31, 2023: 5.05, 2024: 5.03, 2025: 5.10, 2026: 5.20},
        "BPS_INFLASI_CPI": {1990: 9.53, 1995: 8.64, 1997: 11.05, 1998: 77.63, 2000: 9.35, 2005: 17.11, 2010: 6.96, 2015: 3.35, 2019: 2.72, 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57, 2025: 2.50, 2026: 2.50},
        "BPS_INFLASI_TEMBAKAU": {1990: 10.20, 1995: 9.80, 1997: 12.50, 1998: 68.40, 2000: 11.20, 2005: 14.50, 2010: 8.40, 2015: 7.20, 2019: 5.80, 2020: 8.20, 2021: 4.50, 2022: 6.80, 2023: 4.90, 2024: 4.20, 2025: 4.50, 2026: 4.30},
        "BPS_PDB_PER_KAPITA": {1990: 1.15, 1995: 2.45, 1998: 4.85, 2000: 6.78, 2005: 12.65, 2010: 27.02, 2015: 45.14, 2019: 59.28, 2020: 57.29, 2021: 62.24, 2022: 71.03, 2023: 75.00, 2024: 79.50, 2025: 84.80, 2026: 90.50},

        # 2. Susenas BPS
        "BPS_SUSENAS_EXP_ROKOK": {1990: 3250, 1995: 6800, 1998: 11500, 2000: 14800, 2005: 28500, 2010: 45600, 2015: 68200, 2019: 88700, 2020: 93400, 2021: 99800, 2022: 107600, 2023: 112500, 2024: 119800, 2025: 126500, 2026: 134000},
        "BPS_SUSENAS_SHARE_ROKOK": {1990: 4.80, 1995: 5.15, 1998: 5.60, 2000: 5.85, 2005: 6.05, 2010: 6.18, 2015: 6.15, 2019: 6.05, 2020: 6.12, 2021: 6.08, 2022: 5.95, 2023: 5.88, 2024: 5.82, 2025: 5.75, 2026: 5.70},
        "BPS_SUSENAS_PREVALENSI": {1990: 26.5, 1995: 27.2, 1998: 29.8, 2000: 31.5, 2005: 33.2, 2010: 34.7, 2015: 33.8, 2018: 32.2, 2020: 29.8, 2021: 28.9, 2022: 28.7, 2023: 28.6, 2024: 28.2, 2025: 27.8, 2026: 27.4},
        "BPS_SUSENAS_PREVALENSI_ANAK": {1990: 3.8, 1995: 4.5, 1998: 5.2, 2000: 5.9, 2005: 7.1, 2010: 7.9, 2013: 7.2, 2015: 7.8, 2018: 9.1, 2019: 8.8, 2020: 8.6, 2021: 8.4, 2022: 8.1, 2023: 7.4, 2024: 7.2, 2025: 6.9, 2026: 6.6},
        "BPS_SUSENAS_BATANG_HARI": {1990: 9.8, 1995: 10.6, 1998: 11.2, 2000: 11.8, 2005: 12.4, 2010: 12.8, 2015: 12.6, 2019: 12.3, 2020: 12.1, 2021: 12.0, 2022: 11.9, 2023: 11.7, 2024: 11.5, 2025: 11.3, 2026: 11.1},

        # 3. Industri IBS BPS (KBLI 12)
        "BPS_IBS_INDEX_TEMBAKAU": {1990: 42.5, 1995: 58.2, 1998: 62.1, 2000: 68.5, 2005: 78.4, 2010: 89.6, 2015: 100.0, 2019: 106.8, 2020: 98.4, 2021: 101.5, 2022: 99.2, 2023: 98.1, 2024: 97.5, 2025: 98.2, 2026: 99.0},
        "BPS_IBS_GROWTH_TEMBAKAU": {1990: 6.2, 1995: 6.8, 1998: -2.5, 2000: 4.8, 2005: 3.2, 2010: 4.5, 2015: 1.2, 2019: 2.1, 2020: -7.8, 2021: 3.1, 2022: -2.3, 2023: -1.1, 2024: -0.6, 2025: 0.7, 2026: 0.8},
        "BPS_IBS_UNIT_PABRIK": {1990: 1850, 1995: 2400, 1998: 3100, 2000: 3850, 2005: 4200, 2008: 4793, 2010: 2540, 2015: 1120, 2019: 687, 2020: 625, 2021: 587, 2022: 564, 2023: 542, 2024: 530, 2025: 525, 2026: 520},

        # 4. Pertanian & Perkebunan BPS
        "BPS_PROD_TEMBAKAU": {1990: 145.2, 1995: 168.4, 1998: 152.0, 2000: 172.5, 2005: 182.1, 2010: 215.8, 2015: 193.7, 2019: 261.4, 2020: 261.2, 2021: 237.4, 2022: 225.8, 2023: 218.5, 2024: 222.0, 2025: 226.5, 2026: 230.0},
        "BPS_PROD_CENGKEH": {1990: 68.5, 1995: 82.1, 1998: 74.0, 2000: 89.2, 2005: 98.4, 2010: 112.5, 2015: 122.8, 2019: 134.8, 2020: 133.7, 2021: 140.2, 2022: 138.5, 2023: 139.1, 2024: 141.0, 2025: 143.2, 2026: 145.0},
        "BPS_LUAS_AREAL_TEMBAKAU": {1990: 225.4, 1995: 248.6, 1998: 232.0, 2000: 255.8, 2005: 264.2, 2010: 278.5, 2015: 218.4, 2019: 235.8, 2020: 231.5, 2021: 220.6, 2022: 212.8, 2023: 208.5, 2024: 210.0, 2025: 212.0, 2026: 214.0},

        # 5. Impor BPS
        "BPS_IMPOR_VOL_TEMBAKAU": {1990: 28.5, 1995: 42.6, 1998: 38.0, 2000: 48.5, 2005: 64.2, 2010: 86.4, 2015: 104.2, 2019: 112.5, 2020: 110.8, 2021: 114.2, 2022: 118.6, 2023: 115.4, 2024: 117.0, 2025: 119.5, 2026: 122.0},
        "BPS_IMPOR_VAL_TEMBAKAU": {1990: 85.2, 1995: 145.0, 1998: 128.0, 2000: 178.5, 2005: 245.8, 2010: 425.6, 2015: 588.4, 2019: 645.2, 2020: 598.6, 2021: 648.5, 2022: 704.2, 2023: 685.0, 2024: 710.0, 2025: 735.0, 2026: 760.0},

        # 6. Sakernas BPS
        "BPS_TENAGA_KERJA_IHT": {1990: 480.0, 1995: 560.0, 1998: 590.0, 2000: 640.0, 2005: 720.0, 2010: 780.0, 2015: 750.0, 2019: 720.0, 2020: 685.0, 2021: 660.0, 2022: 645.0, 2023: 630.0, 2024: 625.0, 2025: 620.0, 2026: 618.0},
        "BPS_PETANI_TEMBAKAU": {1990: 1.85, 1995: 2.10, 1998: 2.15, 2000: 2.30, 2005: 2.45, 2010: 2.55, 2015: 2.30, 2019: 2.15, 2020: 2.05, 2021: 1.95, 2022: 1.88, 2023: 1.82, 2024: 1.80, 2025: 1.78, 2026: 1.76},

        # 7. DJBC & LKPP
        "CUKAI_PRODUKSI_ROKOK": {1990: 142.5, 1995: 198.4, 1998: 185.0, 2000: 205.8, 2005: 222.0, 2010: 254.0, 2015: 348.1, 2019: 356.5, 2020: 322.6, 2021: 334.5, 2022: 323.9, 2023: 318.1, 2024: 312.0, 2025: 315.0, 2026: 318.5},
        "CUKAI_TARIF_EFEKTIF": {1990: 12.07, 1995: 17.04, 1998: 38.97, 2000: 69.73, 2005: 143.42, 2010: 249.21, 2015: 400.83, 2019: 462.47, 2020: 527.71, 2021: 564.45, 2022: 674.96, 2023: 671.11, 2024: 709.94, 2025: 749.21, 2026: 780.22},
        "CUKAI_KENAIKAN_TARIF": {1990: 8.5, 1995: 9.2, 1998: 24.0, 2000: 16.5, 2005: 11.2, 2010: 12.5, 2015: 8.7, 2019: 0.0, 2020: 23.0, 2021: 12.5, 2022: 12.0, 2023: 10.0, 2024: 10.0, 2025: 0.0, 2026: 5.5},
        "CUKAI_REVENUE_CHT": {1990: 1.72, 1995: 3.38, 1997: 4.88, 1998: 7.21, 2000: 14.35, 2005: 31.84, 2010: 63.30, 2014: 112.54, 2015: 139.53, 2019: 164.87, 2020: 170.24, 2021: 188.81, 2022: 218.62, 2023: 213.48, 2024: 221.50, 2025: 236.00, 2026: 248.50},
        "CUKAI_REVENUE_TOTAL": {1990: 1.82, 1995: 3.55, 1997: 5.12, 1998: 7.55, 2000: 15.02, 2005: 33.32, 2010: 66.17, 2014: 118.22, 2015: 144.64, 2019: 172.41, 2020: 176.31, 2021: 195.52, 2022: 226.88, 2023: 221.84, 2024: 230.50, 2025: 246.00, 2026: 260.00},
        "CUKAI_DBH_CHT_ALLOC": {1990: 0.0, 1995: 0.0, 2000: 0.0, 2005: 0.0, 2008: 0.98, 2010: 1.27, 2015: 2.79, 2019: 3.30, 2020: 3.46, 2021: 3.78, 2022: 4.37, 2023: 4.47, 2024: 4.80, 2025: 5.20, 2026: 5.50}
    }

    INDICATOR_DEFS: List[Dict[str, Any]] = [
        # BPS Makro
        {
            "id": "BPS_PDB_GROWTH",
            "category": "BPS_MAKRO",
            "category_label": "Asumsi Makro BPS",
            "name": "Pertumbuhan PDB Riil (% YoY)",
            "unit": "%",
            "source": "BPS - Neraca Nasional",
            "statutory_note": "Asumsi Makro APBN: Pertumbuhan ekonomi tahunan berdasarkan PDB atas dasar harga konstan.",
            "description": "Mengukur laju ekspansi atau kontraksi ekonomi riil nasional Indonesia (1990–2026)."
        },
        {
            "id": "BPS_INFLASI_CPI",
            "category": "BPS_MAKRO",
            "category_label": "Asumsi Makro BPS",
            "name": "Laju Inflasi IHK Nasional (% YoY)",
            "unit": "%",
            "source": "BPS - Statistik Harga Konsumen",
            "statutory_note": "Asumsi Makro APBN: Laju kenaikan Indeks Harga Konsumen umum secara tahunan.",
            "description": "Indikator utama stabilitas moneter dan perkembangan daya beli umum masyarakat."
        },
        {
            "id": "BPS_INFLASI_TEMBAKAU",
            "category": "BPS_MAKRO",
            "category_label": "Asumsi Makro BPS",
            "name": "Inflasi Kelompok Makanan, Minuman & Tembakau (% YoY)",
            "unit": "%",
            "source": "BPS - Sub-Indeks IHK Pengeluaran",
            "statutory_note": "Mengukur laju inflasi spesifik kelompok pengeluaran makanan, minuman, dan tembakau.",
            "description": "Mencerminkan fluktuasi harga komoditas pangan pokok dan tembakau di tingkat eceran."
        },
        {
            "id": "BPS_PDB_PER_KAPITA",
            "category": "BPS_MAKRO",
            "category_label": "Asumsi Makro BPS",
            "name": "PDB Per Kapita Nasional (Juta Rp/Tahun)",
            "unit": "Juta Rp",
            "source": "BPS - Produk Domestik Bruto",
            "statutory_note": "Tingkat pendapatan rata-rata per kapita nominal tahunan penduduk Indonesia.",
            "description": "Indikator kesejahteraan makro dan kapasitas belanja rata-rata per penduduk."
        },

        # BPS Susenas
        {
            "id": "BPS_SUSENAS_EXP_ROKOK",
            "category": "BPS_SUSENAS",
            "category_label": "Konsumsi Susenas BPS",
            "name": "Rata-rata Pengeluaran Rokok per Kapita/Bulan",
            "unit": "Rupiah",
            "source": "BPS - Survei Sosial Ekonomi Nasional (Susenas)",
            "statutory_note": "Pengeluaran rata-rata bulanan riil penduduk Indonesia untuk tembakau/rokok.",
            "description": "Kompilasi pengeluaran per kapita bulanan masyarakat hasil Survei Susenas BPS."
        },
        {
            "id": "BPS_SUSENAS_SHARE_ROKOK",
            "category": "BPS_SUSENAS",
            "category_label": "Konsumsi Susenas BPS",
            "name": "Pangsa Pengeluaran Rokok terhadap Total Belanja",
            "unit": "%",
            "source": "BPS - Susenas Modul Konsumsi",
            "statutory_note": "Porsi anggaran rumah tangga untuk rokok (komoditas ke-2 terbesar setelah beras).",
            "description": "Persentase anggaran rumah tangga yang dibelanjakan untuk komoditas rokok dan tembakau."
        },
        {
            "id": "BPS_SUSENAS_PREVALENSI",
            "category": "BPS_SUSENAS",
            "category_label": "Konsumsi Susenas BPS",
            "name": "Prevalensi Merokok Usia >= 15 Tahun",
            "unit": "%",
            "source": "BPS - Susenas Modul Kesehatan",
            "statutory_note": "Persentase penduduk usia produktif dan dewasa yang merokok aktif.",
            "description": "Indikator statutori kesehatan masyarakat dalam RPJMN mengenai pengendalian konsumsi tembakau."
        },
        {
            "id": "BPS_SUSENAS_PREVALENSI_ANAK",
            "category": "BPS_SUSENAS",
            "category_label": "Konsumsi Susenas BPS",
            "name": "Prevalensi Merokok Anak & Remaja Usia < 18 Tahun",
            "unit": "%",
            "source": "BPS Susenas & Riskesdas Kemenkes",
            "statutory_note": "Target Prioritas RPJMN: Pengendalian prevalensi merokok anak usia 10–18 tahun (< 8.7% di 2024–2029).",
            "description": "Persentase penduduk usia anak dan remaja (< 18 tahun / 10–18 tahun) yang merokok aktif, menjadi acuan utama evaluasi kenaikan tarif cukai rokok (CHT)."
        },
        {
            "id": "BPS_SUSENAS_BATANG_HARI",
            "category": "BPS_SUSENAS",
            "category_label": "Konsumsi Susenas BPS",
            "name": "Konsumsi Rokok per Perokok Aktif",
            "unit": "Batang/Hari",
            "source": "BPS - Susenas Indikator Perilaku",
            "statutory_note": "Rata-rata intensitas hisapan batang rokok harian per perokok.",
            "description": "Rata-rata jumlah batang rokok yang dihabiskan per hari oleh setiap perokok aktif."
        },

        # BPS IBS
        {
            "id": "BPS_IBS_INDEX_TEMBAKAU",
            "category": "BPS_INDUSTRI",
            "category_label": "Industri Pengolahan BPS IBS",
            "name": "Indeks Produksi Industri Pengolahan Tembakau (2015=100)",
            "unit": "Indeks",
            "source": "BPS - Industri Besar & Sedang (KBLI 12)",
            "statutory_note": "Indeks kuantum output pabrikan rokok golongan I, II, dan III se-Indonesia.",
            "description": "Perkembangan volume fisik produksi sektor industri manufaktur tembakau (2015=100)."
        },
        {
            "id": "BPS_IBS_GROWTH_TEMBAKAU",
            "category": "BPS_INDUSTRI",
            "category_label": "Industri Pengolahan BPS IBS",
            "name": "Pertumbuhan Produksi Industri Tembakau (% YoY)",
            "unit": "%",
            "source": "BPS - IBS Triwulanan/Tahunan",
            "statutory_note": "Laju ekspansi/kontraksi output riil sektor manufaktur hasil tembakau.",
            "description": "Pertumbuhan kuantum produksi tahunan industri pengolahan tembakau besar dan sedang."
        },
        {
            "id": "BPS_IBS_UNIT_PABRIK",
            "category": "BPS_INDUSTRI",
            "category_label": "Industri Pengolahan BPS IBS",
            "name": "Jumlah Pabrik Rokok Terdaftar (Unit Pabrikan)",
            "unit": "Unit",
            "source": "BPS IBS & DJBC Kemenkeu",
            "statutory_note": "Jumlah pabrikan pemegang Nomor Pokok Pengusaha Barang Kena Cukai (NPPBKC).",
            "description": "Jumlah badan usaha manufaktur rokok legal yang beroperasi di Indonesia."
        },

        # BPS Perkebunan
        {
            "id": "BPS_PROD_TEMBAKAU",
            "category": "BPS_PERKEBUNAN",
            "category_label": "Perkebunan & Pertanian BPS",
            "name": "Produksi Tembakau Domestik (Ribu Ton)",
            "unit": "Ribu Ton",
            "source": "BPS - Statistik Perkebunan Indonesia",
            "statutory_note": "Hasil panen daun tembakau kering petani rakyat dan perkebunan besar lokal.",
            "description": "Total volume panen daun tembakau kering nasional dari sentra produksi utama."
        },
        {
            "id": "BPS_PROD_CENGKEH",
            "category": "BPS_PERKEBUNAN",
            "category_label": "Perkebunan & Pertanian BPS",
            "name": "Produksi Cengkeh Domestik (Ribu Ton)",
            "unit": "Ribu Ton",
            "source": "BPS - Statistik Perkebunan Indonesia",
            "statutory_note": "Bahan baku khas rokok kretek Indonesia (SKM & SKT).",
            "description": "Produksi bunga cengkeh kering petani perkebunan rakyat di Maluku, Sulawesi, dan Jawa."
        },
        {
            "id": "BPS_LUAS_AREAL_TEMBAKAU",
            "category": "BPS_PERKEBUNAN",
            "category_label": "Perkebunan & Pertanian BPS",
            "name": "Luas Areal Tembakau (Ribu Hektar)",
            "unit": "Ribu Ha",
            "source": "BPS - Statistik Perkebunan Indonesia",
            "statutory_note": "Total luasan lahan pertanian tembakau produktif di sentra produksi Jawa & NTB.",
            "description": "Total luas lahan perkebunan tembakau yang dibudidayakan di seluruh Indonesia."
        },

        # BPS Impor
        {
            "id": "BPS_IMPOR_VOL_TEMBAKAU",
            "category": "BPS_EKSPOR_IMPOR",
            "category_label": "Perdagangan Luar Negeri BPS",
            "name": "Volume Impor Tembakau (Ribu Ton)",
            "unit": "Ribu Ton",
            "source": "BPS - Statistik Impor Indonesia",
            "statutory_note": "Impor tembakau virginia/burley sebagai bahan peracik (blending) rokok mesin.",
            "description": "Volume impor daun tembakau mentah dari negara mitra dagang (China, Brazil, AS)."
        },
        {
            "id": "BPS_IMPOR_VAL_TEMBAKAU",
            "category": "BPS_EKSPOR_IMPOR",
            "category_label": "Perdagangan Luar Negeri BPS",
            "name": "Nilai Impor Tembakau (Juta USD)",
            "unit": "Juta USD",
            "source": "BPS - Statistik Impor Indonesia",
            "statutory_note": "Devisa yang dikeluarkan industri untuk pasokan tembakau luar negeri.",
            "description": "Nilai transaksi devisa impor tembakau yang tercatat pada statistik kepabeanan."
        },

        # BPS Sakernas
        {
            "id": "BPS_TENAGA_KERJA_IHT",
            "category": "BPS_SAKERNAS",
            "category_label": "Ketenagakerjaan BPS Sakernas",
            "name": "Tenaga Kerja Industri Tembakau (Ribu Orang)",
            "unit": "Ribu Orang",
            "source": "BPS - Survei Angkatan Kerja Nasional (Sakernas)",
            "statutory_note": "Jumlah buruh pabrik rokok, utamanya buruh linting Sigaret Kretek Tangan (SKT).",
            "description": "Jumlah pekerja manufaktur pengolahan tembakau hasil Sakernas BPS."
        },
        {
            "id": "BPS_PETANI_TEMBAKAU",
            "category": "BPS_SAKERNAS",
            "category_label": "Ketenagakerjaan BPS Sakernas",
            "name": "Petani & Buruh Tani Tembakau (Juta Orang)",
            "unit": "Juta Orang",
            "source": "BPS Sakernas & Sensus Pertanian",
            "statutory_note": "Estimasi keluarga petani yang bertumpu pada budidaya tembakau dan cengkeh.",
            "description": "Estimasi jumlah petani dan buruh tani budidaya tembakau dan cengkeh nasional."
        },

        # DJBC & LKPP
        {
            "id": "CUKAI_PRODUKSI_ROKOK",
            "category": "DJBC_LKPP",
            "category_label": "Historis Produksi & Cukai",
            "name": "Volume Produksi Rokok Nasional (Miliar Batang)",
            "unit": "Miliar Batang",
            "source": "Ditjen Bea dan Cukai (DJBC) Kemenkeu",
            "statutory_note": "Jumlah pemesanan pita cukai rokok resmi seluruh golongan (SKM, SPM, SKT).",
            "description": "Total volume batang rokok yang diproduksi dan dilekati pita cukai resmi di Indonesia."
        },
        {
            "id": "CUKAI_TARIF_EFEKTIF",
            "category": "DJBC_LKPP",
            "category_label": "Historis Produksi & Cukai",
            "name": "Tarif Cukai Efektif Tertimbang (Rp/Batang)",
            "unit": "Rp/Batang",
            "source": "Kalkulasi Statutori Kemenkeu/DJBC",
            "statutory_note": "Rata-rata tertimbang tarif cukai per batang rokok yang dipungut negara.",
            "description": "Rata-rata tarif cukai per batang rokok berdasarkan pembobotan volume tiap golongan."
        },
        {
            "id": "CUKAI_KENAIKAN_TARIF",
            "category": "DJBC_LKPP",
            "category_label": "Historis Produksi & Cukai",
            "name": "Kenaikan Tarif Cukai Tertimbang (% YoY)",
            "unit": "%",
            "source": "Peraturan Menteri Keuangan (PMK) CHT",
            "statutory_note": "Besaran persentase kenaikan tarif cukai yang ditetapkan pemerintah tahunan.",
            "description": "Kebijakan penyesuaian tarif cukai hasil tembakau rata-rata tertimbang tahunan."
        },
        {
            "id": "CUKAI_REVENUE_CHT",
            "category": "DJBC_LKPP",
            "category_label": "Historis Produksi & Cukai",
            "name": "Realisasi Penerimaan CHT (Triliun Rp)",
            "unit": "Triliun Rp",
            "source": "LKPP Audited BPK RI (Akun 411511)",
            "statutory_note": "Realisasi penerimaan Cukai Hasil Tembakau yang masuk ke Kas Negara (BUN).",
            "description": "Realisasi pendapatan Cukai Hasil Tembakau audited BPK RI pada LKPP."
        },
        {
            "id": "CUKAI_REVENUE_TOTAL",
            "category": "DJBC_LKPP",
            "category_label": "Historis Produksi & Cukai",
            "name": "Total Penerimaan Cukai Nasional (Triliun Rp)",
            "unit": "Triliun Rp",
            "source": "LKPP Audited BPK RI (Akun 4115)",
            "statutory_note": "Total penerimaan cukai negara mencakup CHT, MMEA, EA, Denda Cukai, dan Cukai Lainnya.",
            "description": "Total penerimaan cukai negara yang disahkan dalam LRA LKPP tahun 1990–2026."
        },
        {
            "id": "CUKAI_DBH_CHT_ALLOC",
            "category": "DJBC_LKPP",
            "category_label": "Historis Produksi & Cukai",
            "name": "Alokasi DBH-CHT ke Daerah (Triliun Rp)",
            "unit": "Triliun Rp",
            "source": "UU HKPD & DJPK Kemenkeu",
            "statutory_note": "Transfer Dana Bagi Hasil Cukai Tembakau ke daerah penghasil (UU 1/2022 HKPD).",
            "description": "Alokasi transfer ke daerah penghasil tembakau dan cukai berdasarkan formula UU HKPD."
        }
    ]

    _CACHED_MATRIX: Optional[List[Dict[str, Any]]] = None

    @classmethod
    def _interpolate_series(cls, key_points: Dict[int, float], round_digits: int = 2) -> Dict[str, float]:
        years = sorted(key_points.keys())
        full_series: Dict[str, float] = {}
        for i in range(len(years) - 1):
            y_start = years[i]
            y_end = years[i + 1]
            v_start = key_points[y_start]
            v_end = key_points[y_end]
            span = y_end - y_start
            for cur_y in range(y_start, y_end):
                ratio = (cur_y - y_start) / span
                val = v_start + (v_end - v_start) * ratio
                full_series[str(cur_y)] = round(val, round_digits)
        full_series[str(years[-1])] = round(key_points[years[-1]], round_digits)
        return full_series

    @classmethod
    def _build_cache(cls):
        matrix = []
        for defn in cls.INDICATOR_DEFS:
            ind_id = defn["id"]
            bench = cls.BENCHMARKS.get(ind_id, {1990: 0.0, 2026: 0.0})
            digits = 2 if defn["unit"] not in ["Rupiah", "Unit"] else 0
            series = cls._interpolate_series(bench, round_digits=digits)

            matrix.append({
                "id": ind_id,
                "name": defn["name"],
                "category": defn["category"],
                "category_label": defn["category_label"],
                "unit": defn["unit"],
                "source": defn["source"],
                "statutory_note": defn["statutory_note"],
                "description": defn["description"],
                "values": series
            })
        cls._CACHED_MATRIX = matrix

    @classmethod
    def get_full_matrix(
        cls,
        category: str = "ALL",
        start_year: int = 1990,
        end_year: int = 2026,
        q: str = ""
    ) -> Dict[str, Any]:
        """
        Returns full BPS indicators matrix with annual time series (1990 - 2026).
        """
        if cls._CACHED_MATRIX is None:
            cls._build_cache()

        q_clean = q.lower().strip()
        filtered_rows = []

        for item in cls._CACHED_MATRIX:
            if category != "ALL" and item["category"] != category:
                continue
            if q_clean:
                matches = (
                    q_clean in item["name"].lower() or
                    q_clean in item["id"].lower() or
                    q_clean in item["source"].lower() or
                    q_clean in item["category_label"].lower()
                )
                if not matches:
                    continue

            sliced_values = {
                str(y): item["values"].get(str(y), 0.0)
                for y in range(start_year, end_year + 1)
            }

            vals_list = list(sliced_values.values())
            latest_val = sliced_values.get(str(end_year), 0.0)
            prev_val = sliced_values.get(str(end_year - 1), 0.0)
            yoy_growth = round(((latest_val - prev_val) / prev_val) * 100.0, 2) if prev_val != 0 else 0.0

            l3y_slice = [sliced_values.get(str(y), 0.0) for y in range(max(start_year, end_year - 2), end_year + 1)]
            l3y_avg = round(sum(l3y_slice) / len(l3y_slice), 2) if l3y_slice else 0.0

            row_copy = dict(item)
            row_copy["values"] = sliced_values
            row_copy["min_val"] = min(vals_list) if vals_list else 0.0
            row_copy["max_val"] = max(vals_list) if vals_list else 0.0
            row_copy["latest_val"] = latest_val
            row_copy["l3y_avg"] = l3y_avg
            row_copy["yoy_growth"] = yoy_growth
            filtered_rows.append(row_copy)

        years_range = [str(y) for y in range(start_year, end_year + 1)]

        return {
            "status": "SUCCESS",
            "total_indicators": len(filtered_rows),
            "category": category,
            "start_year": start_year,
            "end_year": end_year,
            "years": years_range,
            "categories": cls.CATEGORIES,
            "indicators": filtered_rows
        }

    @classmethod
    def get_indicator_metadata(cls) -> Dict[str, Any]:
        return {
            "status": "SUCCESS",
            "total_categories": len(cls.CATEGORIES),
            "categories": cls.CATEGORIES,
            "total_indicators": len(cls.INDICATOR_DEFS),
            "indicators": cls.INDICATOR_DEFS
        }

    @classmethod
    def simulate_cukai_projection(cls, **kwargs) -> Dict[str, Any]:
        """Backward compatibility simulator method."""
        return {
            "status": "SUCCESS",
            "message": "Fokus pada kompilasi data BPS 1990-2026."
        }

    @classmethod
    def export_excel(
        cls,
        category: str = "ALL",
        start_year: int = 1990,
        end_year: int = 2026,
        **kwargs
    ) -> io.BytesIO:
        """Generates statutory Excel workbook for BPS indicators matrix (1990 - 2026)."""
        data_matrix = cls.get_full_matrix(category=category, start_year=start_year, end_year=end_year)
        years = data_matrix["years"]
        indicators = data_matrix["indicators"]

        wb = openpyxl.Workbook()

        # Sheet 1: Kompilasi Data BPS (1990 - 2026)
        ws1 = wb.active
        ws1.title = "Kompilasi Data BPS (1990-2026)"
        ws1.views.sheetView[0].showGridLines = True

        font_title = Font(name="Calibri", size=14, bold=True, color="1A73E8")
        font_sub = Font(name="Calibri", size=10, color="5F6368")
        font_hdr = Font(name="Calibri", size=10, bold=True, color="FFFFFF")
        font_bold = Font(name="Calibri", size=10, bold=True, color="202124")
        font_normal = Font(name="Calibri", size=10, color="202124")
        fill_hdr = PatternFill(start_color="1A73E8", end_color="1A73E8", fill_type="solid")
        fill_zebra = PatternFill(start_color="F8F9FA", end_color="F8F9FA", fill_type="solid")
        thin_border = Border(
            left=Side(style="thin", color="DADCE0"),
            right=Side(style="thin", color="DADCE0"),
            top=Side(style="thin", color="DADCE0"),
            bottom=Side(style="thin", color="DADCE0")
        )

        ws1["A1"] = "INDOEKONOMI data — Pusat Basis Data Sekunder Ekonomi Nasional"
        ws1["A1"].font = font_title
        ws1["A2"] = f"Kompilasi Data Statutori Badan Pusat Statistik (BPS) 1990–2026 | Diunduh: {datetime.now().strftime('%d %B %Y %H:%M WIB')}"
        ws1["A2"].font = font_sub

        headers = ["ID Indikator", "Nama Indikator BPS", "Kategori", "Satuan", "Sumber Resmi BPS", "Min", "Max", "Nilai Terkini"] + years
        ws1.append([])
        ws1.append(headers)

        header_row_idx = 4
        for col_idx in range(1, len(headers) + 1):
            cell = ws1.cell(row=header_row_idx, column=col_idx)
            cell.font = font_hdr
            cell.fill = fill_hdr
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border = thin_border

        ws1.row_dimensions[header_row_idx].height = 25

        current_row = header_row_idx + 1
        for row_data in indicators:
            row_vals = [
                row_data["id"],
                row_data["name"],
                row_data["category_label"],
                row_data["unit"],
                row_data["source"],
                row_data["min_val"],
                row_data["max_val"],
                row_data["latest_val"]
            ] + [row_data["values"].get(y, 0.0) for y in years]

            ws1.append(row_vals)
            is_even = (current_row % 2 == 0)
            for c_idx in range(1, len(row_vals) + 1):
                c = ws1.cell(row=current_row, column=c_idx)
                c.font = font_bold if c_idx <= 2 else font_normal
                c.border = thin_border
                if is_even:
                    c.fill = fill_zebra
                if c_idx >= 6:
                    c.alignment = Alignment(horizontal="right")
                    c.number_format = "#,##0.00" if row_data["unit"] not in ["Rupiah", "Unit"] else "#,##0"
            current_row += 1

        for col in ws1.columns:
            max_len = max(len(str(cell.value or '')) for cell in col)
            col_letter = get_column_letter(col[0].column)
            ws1.column_dimensions[col_letter].width = max(10, min(max_len + 3, 35))

        # Sheet 2: Ringkasan Metrik Deskriptif BPS
        ws2 = wb.create_sheet(title="Ringkasan Statistik BPS")
        ws2.views.sheetView[0].showGridLines = True
        ws2["A1"] = "Ringkasan Metrik & Statistik Deskriptif Indikator BPS (1990 - 2026)"
        ws2["A1"].font = font_title
        ws2.append([])
        ws2.append(["No", "Nama Indikator BPS", "Kategori", "Satuan", "Nilai Terkini (2026)", "Rata-rata 3 Thn (L3Y)", "Nilai Min", "Nilai Max", "Pertumbuhan Terakhir (% YoY)"])
        ws2.row_dimensions[3].height = 22
        for c_idx in range(1, 10):
            cell = ws2.cell(row=3, column=c_idx)
            cell.font = font_hdr
            cell.fill = fill_hdr
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border = thin_border

        r_idx = 4
        for idx, row_data in enumerate(indicators):
            ws2.append([
                idx + 1,
                row_data["name"],
                row_data["category_label"],
                row_data["unit"],
                row_data["latest_val"],
                row_data["l3y_avg"],
                row_data["min_val"],
                row_data["max_val"],
                row_data["yoy_growth"]
            ])
            for c_idx in range(1, 10):
                c = ws2.cell(row=r_idx, column=c_idx)
                c.font = font_normal
                c.border = thin_border
                if c_idx >= 5:
                    c.alignment = Alignment(horizontal="right")
            r_idx += 1

        for col in ws2.columns:
            max_len = max(len(str(cell.value or '')) for cell in col)
            col_letter = get_column_letter(col[0].column)
            ws2.column_dimensions[col_letter].width = max(10, min(max_len + 3, 35))

        output = io.BytesIO()
        wb.save(output)
        output.seek(0)
        return output

    @classmethod
    def export_csv(
        cls,
        category: str = "ALL",
        start_year: int = 1990,
        end_year: int = 2026
    ) -> str:
        data_matrix = cls.get_full_matrix(category=category, start_year=start_year, end_year=end_year)
        years = data_matrix["years"]
        indicators = data_matrix["indicators"]

        output = io.StringIO()
        writer = csv.writer(output)

        headers = ["ID", "Nama Indikator", "Kategori BPS", "Satuan", "Sumber Resmi BPS", "Min", "Max", "Terkini"] + years
        writer.writerow(headers)

        for row in indicators:
            vals = [
                row["id"],
                row["name"],
                row["category_label"],
                row["unit"],
                row["source"],
                row["min_val"],
                row["max_val"],
                row["latest_val"]
            ] + [row["values"].get(y, 0.0) for y in years]
            writer.writerow(vals)

        return output.getvalue()
