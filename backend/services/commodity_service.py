"""
==============================================================================
PUSAT BASIS DATA DATA SEKUNDER: PERGERAKAN EKONOMI INDONESIA
Commodity Balance, HS Classification & APBN/LKPP Harmonized Tracking Service
Divisi 1: Pertanian, Peternakan & Perikanan (Darat & Air/Akuatik)
Divisi 2: Barang Hasil Bumi (Ditambang & Tidak Ditambang / Energi & Mineral)
==============================================================================
"""

from typing import Dict, Any, List, Optional

class CommodityService:
    """Provides canonical national commodity balance, self-sufficiency, import dependency, HS codes, and APBN/LKPP statutory mappings."""

    # --------------------------------------------------------------------------
    # MASTER COMMODITIES REGISTRY WITH HS CODE & APBN / LKPP CLASSIFICATION
    # --------------------------------------------------------------------------
    COMMODITIES = [
        # ======================================================================
        # DIVISI 1: PERTANIAN, PETERNAKAN & PERIKANAN (PANGAN & HAYATI)
        # ======================================================================
        # 1.1 Pertanian Pangan Pokok & Hortikultura (Darat)
        {
            "id": "COM-AGRI-001-BERAS",
            "name": "Beras / Padi Konsumsi",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PANGAN_POKOK",
            "group_label": "Pertanian Pangan Pokok",
            "realm": "DARAT",
            "realm_label": "Darat (Tanaman Pangan)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 10 (Serealia)",
            "hs_code": "1006.30.99 (Beras Setengah Giling / Digiling Seluruhnya)",
            "apbn_classification": "Belanja Ketahanan Pangan & Cadangan Beras Pemerintah (CBP Bulog)",
            "lkpp_account_code": "562111 (Belanja Bantuan Pangan) / 411511 (Bea Masuk Beras Impor)",
            "lkpp_classification": "Belanja Bansos Pangan & Penerimaan Bea Masuk",
            "source_institution": "Badan Pangan Nasional (Bapanas), BPS RI & Perum Bulog",
            "legal_basis": "UU No. 18 Tahun 2012 tentang Pangan & Neraca Pangan Nasional Bapanas",
            "description": "Komoditas pangan pokok utama nasional. Neraca mencakup produksi gabah kering giling dikonversi ke beras, konsumsi rumah tangga/restoran, dan stabilisasi CBP.",
            "time_series": {
                "2018": {"production": 33942, "consumption": 29570, "import_volume": 2253, "import_value_usd": 1037.2, "export_volume": 4, "export_value_usd": 3.8, "ending_stocks": 6621},
                "2019": {"production": 31310, "consumption": 29600, "import_volume": 444, "import_value_usd": 184.3, "export_volume": 5, "export_value_usd": 4.5, "ending_stocks": 5950},
                "2020": {"production": 31330, "consumption": 29800, "import_volume": 356, "import_value_usd": 195.4, "export_volume": 3, "export_value_usd": 3.1, "ending_stocks": 7430},
                "2021": {"production": 31360, "consumption": 30040, "import_volume": 407, "import_value_usd": 183.8, "export_volume": 4, "export_value_usd": 4.1, "ending_stocks": 6920},
                "2022": {"production": 31540, "consumption": 30200, "import_volume": 429, "import_value_usd": 204.6, "export_volume": 6, "export_value_usd": 5.9, "ending_stocks": 6120},
                "2023": {"production": 30900, "consumption": 30620, "import_volume": 3060, "import_value_usd": 1788.1, "export_volume": 3, "export_value_usd": 3.2, "ending_stocks": 5410},
                "2024": {"production": 30340, "consumption": 30900, "import_volume": 3950, "import_value_usd": 2420.5, "export_volume": 2, "export_value_usd": 2.5, "ending_stocks": 4820}
            }
        },
        {
            "id": "COM-AGRI-002-JAGUNG",
            "name": "Jagung Pipilan Kering",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PANGAN_POKOK",
            "group_label": "Pertanian Pangan Pokok",
            "realm": "DARAT",
            "realm_label": "Darat (Tanaman Pangan)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 10 (Serealia)",
            "hs_code": "1005.90.90 (Jagung Pipilan Selain Benih)",
            "apbn_classification": "Belanja Subsidi Pupuk Pertanian & Pengendalian Bahan Pakan Ternak",
            "lkpp_account_code": "531111 (Belanja Subsidi Pupuk Pangan) / 411511 (Bea Masuk)",
            "lkpp_classification": "Belanja Subsidi Non-Energi Pertanian",
            "source_institution": "Kementerian Pertanian & BPS RI",
            "legal_basis": "UU No. 22 Tahun 2019 tentang Sistem Budi Daya Pertanian Berkelanjutan",
            "description": "Bahan baku utama industri pakan ternak unggas nasional (feedmill) dan konsumsi industri olahan pangan.",
            "time_series": {
                "2018": {"production": 14210, "consumption": 14950, "import_volume": 730, "import_value_usd": 156.4, "export_volume": 372, "export_value_usd": 85.2, "ending_stocks": 2150},
                "2019": {"production": 14580, "consumption": 15200, "import_volume": 1080, "import_value_usd": 240.1, "export_volume": 120, "export_value_usd": 28.5, "ending_stocks": 2390},
                "2020": {"production": 14850, "consumption": 15100, "import_volume": 840, "import_value_usd": 182.3, "export_volume": 45, "export_value_usd": 11.2, "ending_stocks": 2850},
                "2021": {"production": 15200, "consumption": 15450, "import_volume": 990, "import_value_usd": 284.5, "export_volume": 15, "export_value_usd": 4.1, "ending_stocks": 2980},
                "2022": {"production": 15500, "consumption": 15800, "import_volume": 1210, "import_value_usd": 412.0, "export_volume": 165, "export_value_usd": 51.3, "ending_stocks": 3120},
                "2023": {"production": 14750, "consumption": 16100, "import_volume": 1290, "import_value_usd": 395.2, "export_volume": 20, "export_value_usd": 5.8, "ending_stocks": 2840},
                "2024": {"production": 14900, "consumption": 16400, "import_volume": 1450, "import_value_usd": 435.0, "export_volume": 12, "export_value_usd": 3.6, "ending_stocks": 2780}
            }
        },
        {
            "id": "COM-AGRI-003-KEDELAI",
            "name": "Kedelai Biji Kering",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PANGAN_POKOK",
            "group_label": "Pertanian Pangan Pokok",
            "realm": "DARAT",
            "realm_label": "Darat (Tanaman Pangan)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 12 (Biji Mengandung Minyak)",
            "hs_code": "1201.90.00 (Kacang Kedelai Biji Kering)",
            "apbn_classification": "Program Stabilisasi Pasokan dan Harga Pangan (SPHP Kedelai Pengrajin)",
            "lkpp_account_code": "562111 (Belanja Bantuan Pangan Pengrajin Tahu Tempe) / 411511 (Bea Masuk)",
            "lkpp_classification": "Belanja Bantuan SPHP & Pajak Impor",
            "source_institution": "Badan Pangan Nasional (Bapanas) & BPS RI",
            "legal_basis": "Perpres No. 125 Tahun 2022 tentang Penyelenggaraan Cadangan Pangan Pemerintah",
            "description": "Bahan baku pengrajin tahu & tempe nasional dengan ketergantungan impor struktural di atas 85%.",
            "time_series": {
                "2018": {"production": 538, "consumption": 2890, "import_volume": 2585, "import_value_usd": 1102.5, "export_volume": 2, "export_value_usd": 1.9, "ending_stocks": 390},
                "2019": {"production": 424, "consumption": 2920, "import_volume": 2670, "import_value_usd": 1058.2, "export_volume": 3, "export_value_usd": 2.4, "ending_stocks": 410},
                "2020": {"production": 353, "consumption": 2950, "import_volume": 2475, "import_value_usd": 1001.3, "export_volume": 1, "export_value_usd": 1.1, "ending_stocks": 380},
                "2021": {"production": 320, "consumption": 2980, "import_volume": 2490, "import_value_usd": 1480.6, "export_volume": 2, "export_value_usd": 2.1, "ending_stocks": 350},
                "2022": {"production": 302, "consumption": 3010, "import_volume": 2320, "import_value_usd": 1630.4, "export_volume": 1, "export_value_usd": 1.4, "ending_stocks": 310},
                "2023": {"production": 290, "consumption": 3050, "import_volume": 2270, "import_value_usd": 1475.8, "export_volume": 2, "export_value_usd": 1.8, "ending_stocks": 320},
                "2024": {"production": 285, "consumption": 3080, "import_volume": 2350, "import_value_usd": 1410.2, "export_volume": 1, "export_value_usd": 1.2, "ending_stocks": 340}
            }
        },
        {
            "id": "COM-AGRI-004-GULA",
            "name": "Gula Pasir (Kristal Putih & Rafinasi)",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PANGAN_POKOK",
            "group_label": "Pertanian Pangan Pokok",
            "realm": "DARAT",
            "realm_label": "Darat (Tanaman Perkebunan Tebu)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 17 (Gula & Kembang Gula)",
            "hs_code": "1701.99.10 (Gula Tebu Kristal Putih & Raw Sugar Rafinasi)",
            "apbn_classification": "Program Percepatan Swasembada Gula Nasional & Penerimaan Bea Masuk Gula",
            "lkpp_account_code": "411511 (Bea Masuk Gula Impor) / 521219 (Belanja Bantuan Benih Tebu)",
            "lkpp_classification": "Penerimaan Kepabeanan & Belanja Program Swasembada",
            "source_institution": "Kementerian Pertanian & Ditjen Bea dan Cukai Kemenkeu",
            "legal_basis": "Perpres No. 40 Tahun 2023 tentang Percepatan Swasembada Gula Nasional",
            "description": "Gula kristal putih untuk konsumsi rumah tangga serta raw sugar impor untuk kebutuhan industri makanan dan minuman.",
            "time_series": {
                "2018": {"production": 2170, "consumption": 5100, "import_volume": 5030, "import_value_usd": 1790.3, "export_volume": 15, "export_value_usd": 9.2, "ending_stocks": 1250},
                "2019": {"production": 2220, "consumption": 5250, "import_volume": 4090, "import_value_usd": 1360.5, "export_volume": 12, "export_value_usd": 7.4, "ending_stocks": 1180},
                "2020": {"production": 2130, "consumption": 5300, "import_volume": 5540, "import_value_usd": 1940.1, "export_volume": 8, "export_value_usd": 5.1, "ending_stocks": 1420},
                "2021": {"production": 2350, "consumption": 5450, "import_volume": 5480, "import_value_usd": 2380.4, "export_volume": 10, "export_value_usd": 6.8, "ending_stocks": 1350},
                "2022": {"production": 2400, "consumption": 5580, "import_volume": 6010, "import_value_usd": 3020.2, "export_volume": 14, "export_value_usd": 9.5, "ending_stocks": 1490},
                "2023": {"production": 2270, "consumption": 5650, "import_volume": 5070, "import_value_usd": 2890.6, "export_volume": 9, "export_value_usd": 7.1, "ending_stocks": 1280},
                "2024": {"production": 2380, "consumption": 5720, "import_volume": 5200, "import_value_usd": 2980.0, "export_volume": 8, "export_value_usd": 6.5, "ending_stocks": 1310}
            }
        },
        {
            "id": "COM-AGRI-005-BAWANG-MERAH",
            "name": "Bawang Merah",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "HORTIKULTURA",
            "group_label": "Hortikultura & Sayuran",
            "realm": "DARAT",
            "realm_label": "Darat (Hortikultura)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 07 (Sayuran yang Dapat Dimakan)",
            "hs_code": "0703.10.19 (Bawang Merah Segar)",
            "apbn_classification": "Pengendalian Inflasi Pangan Daerah & Fasilitasi Distribusi Bapanas",
            "lkpp_account_code": "526115 (Belanja Bantuan Pengendalian Inflasi Pangan Bapanas)",
            "lkpp_classification": "Belanja Barang Ketahanan Pangan",
            "source_institution": "Badan Pangan Nasional & BPS RI",
            "legal_basis": "Statistik Hortikultura Nasional BPS & Neraca Pangan Bapanas",
            "description": "Komoditas penyumbang inflasi pangan (volatile food). Produksi domestik relatif swasembada dengan surplus ekspor musiman ke ASEAN.",
            "time_series": {
                "2018": {"production": 1503, "consumption": 1380, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 8.5, "export_value_usd": 9.8, "ending_stocks": 150},
                "2019": {"production": 1580, "consumption": 1410, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 9.2, "export_value_usd": 11.2, "ending_stocks": 180},
                "2020": {"production": 1815, "consumption": 1450, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 8.0, "export_value_usd": 10.4, "ending_stocks": 220},
                "2021": {"production": 2004, "consumption": 1490, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 9.8, "export_value_usd": 13.5, "ending_stocks": 260},
                "2022": {"production": 1980, "consumption": 1520, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 12.4, "export_value_usd": 17.8, "ending_stocks": 240},
                "2023": {"production": 1990, "consumption": 1540, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 10.1, "export_value_usd": 14.2, "ending_stocks": 230},
                "2024": {"production": 2020, "consumption": 1560, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 11.5, "export_value_usd": 16.0, "ending_stocks": 250}
            }
        },
        {
            "id": "COM-AGRI-006-SAWIT-CPO",
            "name": "Minyak Kelapa Sawit (Crude Palm Oil / CPO)",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PERKEBUNAN",
            "group_label": "Perkebunan Komersial",
            "realm": "DARAT",
            "realm_label": "Darat (Perkebunan)",
            "unit": "Juta Ton",
            "hs_chapter": "HS 15 (Lemak & Minyak Nabati)",
            "hs_code": "1511.10.00 (Minyak Kelapa Sawit Mentah / CPO)",
            "apbn_classification": "Penerimaan Bea Keluar Sawit & Pungutan Ekspor Sawit BPDPKS",
            "lkpp_account_code": "411521 (Bea Keluar Ekspor CPO) / 424111 (Pendapatan Badan Layanan Umum BPDPKS)",
            "lkpp_classification": "Penerimaan Bea Keluar & Pendapatan BLU",
            "source_institution": "GAPKI, BPDPKS & BPS RI",
            "legal_basis": "Perpres No. 66 Tahun 2018 tentang Penghimpunan dan Penggunaan Dana Perkebunan Kelapa Sawit",
            "description": "Komoditas ekspor andalan Indonesia terbesar di dunia. Penopang utama devisa dan program mandatori Biodiesel (B35/B40).",
            "time_series": {
                "2018": {"production": 43.0, "consumption": 13.5, "import_volume": 0.0, "import_value_usd": 0.0, "export_volume": 29.5, "export_value_usd": 17890.0, "ending_stocks": 3.2},
                "2019": {"production": 47.1, "consumption": 16.7, "import_volume": 0.0, "import_value_usd": 0.0, "export_volume": 30.2, "export_value_usd": 15580.0, "ending_stocks": 4.6},
                "2020": {"production": 47.0, "consumption": 17.3, "import_volume": 0.0, "import_value_usd": 0.0, "export_volume": 29.8, "export_value_usd": 18440.0, "ending_stocks": 4.8},
                "2021": {"production": 46.9, "consumption": 18.4, "import_volume": 0.0, "import_value_usd": 0.0, "export_volume": 28.5, "export_value_usd": 28520.0, "ending_stocks": 4.1},
                "2022": {"production": 46.7, "consumption": 20.9, "import_volume": 0.0, "import_value_usd": 0.0, "export_volume": 25.8, "export_value_usd": 29620.0, "ending_stocks": 3.6},
                "2023": {"production": 47.1, "consumption": 23.2, "import_volume": 0.0, "import_value_usd": 0.0, "export_volume": 23.9, "export_value_usd": 24850.0, "ending_stocks": 3.1},
                "2024": {"production": 47.8, "consumption": 24.5, "import_volume": 0.0, "import_value_usd": 0.0, "export_volume": 23.3, "export_value_usd": 25600.0, "ending_stocks": 3.0}
            }
        },
        # 1.2 Peternakan (Darat)
        {
            "id": "COM-LIVE-001-DAGING-SAPI",
            "name": "Daging Sapi & Kerbau",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PETERNAKAN",
            "group_label": "Peternakan & Hasil Ternak",
            "realm": "DARAT",
            "realm_label": "Darat (Peternakan)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 02 (Daging & Sisa Daging)",
            "hs_code": "0201.30.00 & 0202.30.00 (Daging Sapi Segar & Beku)",
            "apbn_classification": "Pengendalian Pasokan Daging Nasional & Penerimaan Bea Masuk Impor Ternak",
            "lkpp_account_code": "411511 (Bea Masuk Daging & Sapi Bakalan) / 526115 (Stabilisasi Pasokan Bapanas)",
            "lkpp_classification": "Penerimaan Bea Masuk & Belanja Stabilisasi Pangan",
            "source_institution": "Badan Pangan Nasional & Ditjen PKH Kementan",
            "legal_basis": "Permentan No. 17 Tahun 2020 tentang Pemasukan Hewan Ruminansia Besar",
            "description": "Kebutuhan protein hewani nasional dengan pasokan domestik ditopang impor sapi bakalan Australia dan daging beku India/Brasil.",
            "time_series": {
                "2018": {"production": 496, "consumption": 663, "import_volume": 160, "import_value_usd": 590.2, "export_volume": 0.1, "export_value_usd": 0.5, "ending_stocks": 45},
                "2019": {"production": 504, "consumption": 686, "import_volume": 185, "import_value_usd": 685.4, "export_volume": 0.1, "export_value_usd": 0.6, "ending_stocks": 52},
                "2020": {"production": 515, "consumption": 690, "import_volume": 168, "import_value_usd": 612.0, "export_volume": 0.1, "export_value_usd": 0.4, "ending_stocks": 55},
                "2021": {"production": 437, "consumption": 706, "import_volume": 211, "import_value_usd": 820.5, "export_volume": 0.1, "export_value_usd": 0.5, "ending_stocks": 48},
                "2022": {"production": 398, "consumption": 718, "import_volume": 225, "import_value_usd": 915.2, "export_volume": 0.1, "export_value_usd": 0.4, "ending_stocks": 40},
                "2023": {"production": 420, "consumption": 735, "import_volume": 235, "import_value_usd": 940.0, "export_volume": 0.1, "export_value_usd": 0.4, "ending_stocks": 42},
                "2024": {"production": 435, "consumption": 750, "import_volume": 240, "import_value_usd": 965.0, "export_volume": 0.1, "export_value_usd": 0.4, "ending_stocks": 45}
            }
        },
        {
            "id": "COM-LIVE-002-DAGING-AYAM",
            "name": "Daging Ayam Ras Pedaging (Broiler)",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PETERNAKAN",
            "group_label": "Peternakan & Hasil Ternak",
            "realm": "DARAT",
            "realm_label": "Darat (Peternakan)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 02 (Daging & Sisa Daging)",
            "hs_code": "0207.12.00 (Daging Ayam Segar / Beku Tidak Dipotong)",
            "apbn_classification": "Pengendalian Pasokan Unggas Nasional & Fasilitasi Ekspor Unggas Kementan",
            "lkpp_account_code": "411121 (PPh Pasal 22 Industri Unggas) / 521219 (Fasilitasi Peternak Rakyat)",
            "lkpp_classification": "Penerimaan Pajak Domestik & Belanja Fasilitasi Peternakan",
            "source_institution": "Ditjen Peternakan dan Kesehatan Hewan Kementan & BPS",
            "legal_basis": "Statistik Peternakan & Kesehatan Hewan Kementan",
            "description": "Sumber protein utama masyarakat dengan kondisi surplus produksi nasional dan ekspor ke Singapura dan Jepang.",
            "time_series": {
                "2018": {"production": 3138, "consumption": 2980, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 1.2, "export_value_usd": 3.8, "ending_stocks": 180},
                "2019": {"production": 3495, "consumption": 3120, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 1.5, "export_value_usd": 4.9, "ending_stocks": 250},
                "2020": {"production": 3220, "consumption": 3050, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 1.1, "export_value_usd": 3.2, "ending_stocks": 210},
                "2021": {"production": 3426, "consumption": 3190, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 1.8, "export_value_usd": 5.4, "ending_stocks": 290},
                "2022": {"production": 3670, "consumption": 3310, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 2.4, "export_value_usd": 7.2, "ending_stocks": 340},
                "2023": {"production": 3810, "consumption": 3450, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 3.1, "export_value_usd": 9.8, "ending_stocks": 370},
                "2024": {"production": 3950, "consumption": 3580, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 4.0, "export_value_usd": 12.5, "ending_stocks": 400}
            }
        },
        # 1.3 Perikanan & Sumber Daya Air (Air Laut & Tawar/Payau)
        {
            "id": "COM-FISH-001-IKAN-LAUT",
            "name": "Ikan Tangkap Laut (Tuna, Cakalang, Tongkol)",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PERIKANAN",
            "group_label": "Perikanan & Sumber Daya Air",
            "realm": "AIR_LAUT",
            "realm_label": "Air (Perikanan Laut)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 03 (Ikan & Krustasea)",
            "hs_code": "0302.31 / 0303.41 (Tuna, Cakalang, Tongkol Segar & Beku)",
            "apbn_classification": "Penerimaan Negara Bukan Pajak (PNBP) Sumber Daya Alam Perikanan",
            "lkpp_account_code": "421411 (Pendapatan Pungutan Hasil Perikanan / PHP Tangkap)",
            "lkpp_classification": "PNBP Sumber Daya Alam Perikanan (LRA & LO)",
            "source_institution": "Kementerian Kelautan dan Perikanan (KKP) & BPS",
            "legal_basis": "UU No. 45 Tahun 2009 tentang Perikanan & PP No. 85 Tahun 2021 Jenis Tarif PNBP KKP",
            "description": "Hasil tangkapan laut nasional dari 11 Wilayah Pengelolaan Perikanan Negara RI (WPPNRI) dengan kontribusi devisa ekspor ikan segar & kaleng.",
            "time_series": {
                "2018": {"production": 6710, "consumption": 5420, "import_volume": 120, "import_value_usd": 185.0, "export_volume": 1050, "export_value_usd": 4820.0, "ending_stocks": 360},
                "2019": {"production": 6980, "consumption": 5610, "import_volume": 135, "import_value_usd": 210.4, "export_volume": 1120, "export_value_usd": 5150.0, "ending_stocks": 380},
                "2020": {"production": 6430, "consumption": 5480, "import_volume": 110, "import_value_usd": 175.2, "export_volume": 1080, "export_value_usd": 5210.0, "ending_stocks": 340},
                "2021": {"production": 7240, "consumption": 5790, "import_volume": 140, "import_value_usd": 225.6, "export_volume": 1210, "export_value_usd": 5720.0, "ending_stocks": 420},
                "2022": {"production": 7450, "consumption": 6010, "import_volume": 155, "import_value_usd": 260.0, "export_volume": 1250, "export_value_usd": 6240.0, "ending_stocks": 450},
                "2023": {"production": 7680, "consumption": 6200, "import_volume": 145, "import_value_usd": 240.5, "export_volume": 1310, "export_value_usd": 6120.0, "ending_stocks": 480},
                "2024": {"production": 7850, "consumption": 6350, "import_volume": 150, "import_value_usd": 250.0, "export_volume": 1360, "export_value_usd": 6450.0, "ending_stocks": 500}
            }
        },
        {
            "id": "COM-FISH-002-UDANG",
            "name": "Udang Budidaya (Vaname & Windu)",
            "division": "PERTANIAN_PETERNAKAN",
            "division_label": "Pertanian, Peternakan & Perikanan",
            "group": "PERIKANAN",
            "group_label": "Perikanan & Sumber Daya Air",
            "realm": "AIR_PAYAU",
            "realm_label": "Air (Budidaya Tambak)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 03 (Ikan & Krustasea)",
            "hs_code": "0306.17.00 (Udang Air Payau Lainnya Beku)",
            "apbn_classification": "Program Revitalisasi Tambak Udang Nasional & PNBP Budidaya Perikanan",
            "lkpp_account_code": "421412 (Pendapatan Hasil Usaha Budidaya Ikan & Krustasea KKP)",
            "lkpp_classification": "PNBP Sumber Daya Alam Perikanan",
            "source_institution": "Kementerian Kelautan dan Perikanan (KKP)",
            "legal_basis": "Kepmen KP No. 28/KEPMEN-KP/2021 tentang Rencana Aksi Budidaya Udang Nasional",
            "description": "Komoditas perikanan bernilai ekonomi tinggi untuk pasar ekspor AS, Jepang, dan Uni Eropa.",
            "time_series": {
                "2018": {"production": 850, "consumption": 460, "import_volume": 2, "import_value_usd": 8.5, "export_volume": 180, "export_value_usd": 1740.0, "ending_stocks": 55},
                "2019": {"production": 910, "consumption": 480, "import_volume": 3, "import_value_usd": 10.2, "export_volume": 195, "export_value_usd": 1820.0, "ending_stocks": 62},
                "2020": {"production": 980, "consumption": 510, "import_volume": 2, "import_value_usd": 7.4, "export_volume": 239, "export_value_usd": 2040.0, "ending_stocks": 70},
                "2021": {"production": 1050, "consumption": 540, "import_volume": 3, "import_value_usd": 11.5, "export_volume": 250, "export_value_usd": 2230.0, "ending_stocks": 78},
                "2022": {"production": 1120, "consumption": 570, "import_volume": 4, "import_value_usd": 14.0, "export_volume": 240, "export_value_usd": 2160.0, "ending_stocks": 85},
                "2023": {"production": 1090, "consumption": 590, "import_volume": 3, "import_value_usd": 12.0, "export_volume": 215, "export_value_usd": 1860.0, "ending_stocks": 75},
                "2024": {"production": 1150, "consumption": 610, "import_volume": 3, "import_value_usd": 12.5, "export_volume": 230, "export_value_usd": 1980.0, "ending_stocks": 80}
            }
        },

        # ======================================================================
        # DIVISI 2: BARANG HASIL BUMI (DITAMBANG & TIDAK DITAMBANG)
        # ======================================================================
        # 2.1 Hasil Bumi Ditambang (Mineral Logam & Batubara / Energi Fosil)
        {
            "id": "COM-MINE-001-BATUBARA",
            "name": "Batubara (Thermal & Coking Coal)",
            "division": "HASIL_BUMI",
            "division_label": "Barang Hasil Bumi",
            "group": "TAMBANG_MINERAL_ENERGI",
            "group_label": "Hasil Bumi Ditambang (Energi & Mineral)",
            "realm": "DITAMBANG",
            "realm_label": "Ditambang (Energi Fosil)",
            "unit": "Juta Ton",
            "hs_chapter": "HS 27 (Bahan Bakar Mineral)",
            "hs_code": "2701.12.00 (Batubara Bituminus & Non-Bituminus)",
            "apbn_classification": "Penerimaan Negara Bukan Pajak (PNBP) Royalti & Iuran Tetap Sumber Daya Alam Minerba",
            "lkpp_account_code": "421211 (Pendapatan Royalti Minerba) / 421212 (Pendapatan Iuran Tetap Eksplorasi)",
            "lkpp_classification": "PNBP Sumber Daya Alam Non-Migas (LRA & LO)",
            "source_institution": "Kementerian ESDM & Ditjen Minerba",
            "legal_basis": "UU No. 3 Tahun 2020 tentang Pertambangan Minerba & Kepmen ESDM DMO Batubara 25%",
            "description": "Bahan bakar pembangkit listrik PLTU PLN dan komoditas ekspor energi terbesar nasional dengan kewajiban pasokan domestik (DMO).",
            "time_series": {
                "2018": {"production": 557.0, "consumption": 115.0, "import_volume": 5.2, "import_value_usd": 480.0, "export_volume": 429.0, "export_value_usd": 24010.0, "ending_stocks": 18.2},
                "2019": {"production": 616.0, "consumption": 138.0, "import_volume": 4.8, "import_value_usd": 420.0, "export_volume": 456.0, "export_value_usd": 21700.0, "ending_stocks": 26.8},
                "2020": {"production": 564.0, "consumption": 132.0, "import_volume": 4.1, "import_value_usd": 310.0, "export_volume": 405.0, "export_value_usd": 14500.0, "ending_stocks": 31.1},
                "2021": {"production": 614.0, "consumption": 133.0, "import_volume": 4.5, "import_value_usd": 490.0, "export_volume": 435.0, "export_value_usd": 31500.0, "ending_stocks": 49.5},
                "2022": {"production": 687.0, "consumption": 193.0, "import_volume": 5.8, "import_value_usd": 850.0, "export_volume": 465.0, "export_value_usd": 46760.0, "ending_stocks": 34.8},
                "2023": {"production": 775.0, "consumption": 213.0, "import_volume": 6.1, "import_value_usd": 720.0, "export_volume": 518.0, "export_value_usd": 34600.0, "ending_stocks": 49.9},
                "2024": {"production": 835.0, "consumption": 225.0, "import_volume": 6.5, "import_value_usd": 680.0, "export_volume": 560.0, "export_value_usd": 33500.0, "ending_stocks": 56.4}
            }
        },
        {
            "id": "COM-MINE-002-NIKEL",
            "name": "Nikel Olahan (NPI, Ferronickel, Nickel Matte)",
            "division": "HASIL_BUMI",
            "division_label": "Barang Hasil Bumi",
            "group": "TAMBANG_MINERAL_ENERGI",
            "group_label": "Hasil Bumi Ditambang (Energi & Mineral)",
            "realm": "DITAMBANG",
            "realm_label": "Ditambang (Mineral Logam)",
            "unit": "Ribu Ton Ni",
            "hs_chapter": "HS 72 & 75 (Besi Baja & Nikel)",
            "hs_code": "7202.60.00 (Ferronickel / NPI) & 7501.10.00 (Nickel Matte)",
            "apbn_classification": "PNBP Royalti Mineral Logam & Pajak Penghasilan Korporasi Badan Smelter",
            "lkpp_account_code": "421211 (Royalti Mineral Logam Nikel) / 411126 (PPh Badan Sektor Hilirisasi)",
            "lkpp_classification": "PNBP SDA Minerba & Pajak Penghasilan Badan",
            "source_institution": "Kementerian ESDM & Kementerian Perindustrian",
            "legal_basis": "Permen ESDM No. 11 Tahun 2019 tentang Pelarangan Ekspor Bijih Nikel Mentah (Hilirisasi)",
            "description": "Logam strategis transisi energi & bahan baku baterai EV serta stainless steel pasca larangan ekspor bijih mentah.",
            "time_series": {
                "2018": {"production": 560, "consumption": 85, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 470, "export_value_usd": 5700.0, "ending_stocks": 35},
                "2019": {"production": 810, "consumption": 120, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 680, "export_value_usd": 8100.0, "ending_stocks": 45},
                "2020": {"production": 860, "consumption": 180, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 670, "export_value_usd": 8400.0, "ending_stocks": 55},
                "2021": {"production": 1040, "consumption": 260, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 760, "export_value_usd": 12800.0, "ending_stocks": 75},
                "2022": {"production": 1600, "consumption": 380, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 1180, "export_value_usd": 21800.0, "ending_stocks": 115},
                "2023": {"production": 1950, "consumption": 450, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 1460, "export_value_usd": 22100.0, "ending_stocks": 155},
                "2024": {"production": 2200, "consumption": 520, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 1620, "export_value_usd": 23500.0, "ending_stocks": 215}
            }
        },
        {
            "id": "COM-MINE-003-TEMBAGA",
            "name": "Konsentrat & Katoda Tembaga",
            "division": "HASIL_BUMI",
            "division_label": "Barang Hasil Bumi",
            "group": "TAMBANG_MINERAL_ENERGI",
            "group_label": "Hasil Bumi Ditambang (Energi & Mineral)",
            "realm": "DITAMBANG",
            "realm_label": "Ditambang (Mineral Logam)",
            "unit": "Ribu Ton Cu",
            "hs_chapter": "HS 26 & 74 (Bijih Logam & Tembaga)",
            "hs_code": "2603.00.00 (Konsentrat Tembaga) & 7403.11.00 (Katoda Tembaga Murni)",
            "apbn_classification": "Penerimaan Bea Keluar Konsentrat Mineral & PNBP Royalti SDA Minerba",
            "lkpp_account_code": "411521 (Bea Keluar Ekspor Konsentrat) / 421211 (Royalti Tembaga)",
            "lkpp_classification": "Penerimaan Bea Keluar & PNBP SDA Minerba",
            "source_institution": "Kementerian ESDM & PT Freeport Indonesia / Amman",
            "legal_basis": "UU No. 3 Tahun 2020 & Perizinan Operasional Smelter Manyar Gresik",
            "description": "Logam konduktor utama untuk industri kabel, infrastruktur kelistrikan dan komponen EV.",
            "time_series": {
                "2018": {"production": 750, "consumption": 210, "import_volume": 45, "import_value_usd": 290.0, "export_volume": 560, "export_value_usd": 3850.0, "ending_stocks": 25},
                "2019": {"production": 610, "consumption": 225, "import_volume": 50, "import_value_usd": 310.0, "export_volume": 410, "export_value_usd": 2680.0, "ending_stocks": 25},
                "2020": {"production": 670, "consumption": 215, "import_volume": 42, "import_value_usd": 260.0, "export_volume": 480, "export_value_usd": 3210.0, "ending_stocks": 17},
                "2021": {"production": 820, "consumption": 240, "import_volume": 38, "import_value_usd": 350.0, "export_volume": 600, "export_value_usd": 5420.0, "ending_stocks": 35},
                "2022": {"production": 940, "consumption": 265, "import_volume": 40, "import_value_usd": 360.0, "export_volume": 690, "export_value_usd": 6120.0, "ending_stocks": 50},
                "2023": {"production": 980, "consumption": 290, "import_volume": 35, "import_value_usd": 305.0, "export_volume": 710, "export_value_usd": 6250.0, "ending_stocks": 65},
                "2024": {"production": 1050, "consumption": 360, "import_volume": 20, "import_value_usd": 180.0, "export_volume": 690, "export_value_usd": 6800.0, "ending_stocks": 85}
            }
        },
        {
            "id": "COM-MINE-004-MINYAK-MENTAH",
            "name": "Minyak Bumi Mentah (Crude Oil)",
            "division": "HASIL_BUMI",
            "division_label": "Barang Hasil Bumi",
            "group": "TAMBANG_MINERAL_ENERGI",
            "group_label": "Hasil Bumi Ditambang (Energi & Mineral)",
            "realm": "DITAMBANG",
            "realm_label": "Ditambang (Minyak & Gas Bumi)",
            "unit": "Juta Barel (MMbbl)",
            "hs_chapter": "HS 27 (Minyak Mineral)",
            "hs_code": "2709.00.10 (Minyak Mentah Bumi / Crude Petroleum Oil)",
            "apbn_classification": "Penerimaan Negara Bukan Pajak (PNBP) Sumber Daya Alam Minyak Bumi & Belanja Subsidi BBM",
            "lkpp_account_code": "421111 (Pendapatan Bagian Pemerintah Minyak Bumi) / 531112 (Belanja Subsidi BBM)",
            "lkpp_classification": "PNBP SDA Minyak Bumi (LRA & LO) & Belanja Subsidi Energi",
            "source_institution": "SKK Migas, Kementerian ESDM & PT Pertamina",
            "legal_basis": "UU No. 22 Tahun 2001 tentang Minyak dan Gas Bumi & Asumsi Makro ICP APBN",
            "description": "Lifting minyak bumi domestik untuk kilang BBM Pertamina. Indonesia menjadi net-importer minyak mentah sejak 2004.",
            "time_series": {
                "2018": {"production": 283.0, "consumption": 520.0, "import_volume": 265.0, "import_value_usd": 18200.0, "export_volume": 28.0, "export_value_usd": 1920.0, "ending_stocks": 21.0},
                "2019": {"production": 272.0, "consumption": 535.0, "import_volume": 280.0, "import_value_usd": 17800.0, "export_volume": 17.0, "export_value_usd": 1150.0, "ending_stocks": 22.0},
                "2020": {"production": 258.0, "consumption": 485.0, "import_volume": 240.0, "import_value_usd": 9650.0, "export_volume": 13.0, "export_value_usd": 540.0, "ending_stocks": 24.0},
                "2021": {"production": 241.0, "consumption": 510.0, "import_volume": 285.0, "import_value_usd": 17600.0, "export_volume": 16.0, "export_value_usd": 1120.0, "ending_stocks": 20.0},
                "2022": {"production": 224.0, "consumption": 545.0, "import_volume": 335.0, "import_value_usd": 28900.0, "export_volume": 14.0, "export_value_usd": 1450.0, "ending_stocks": 18.0},
                "2023": {"production": 221.0, "consumption": 560.0, "import_volume": 352.0, "import_value_usd": 27400.0, "export_volume": 13.0, "export_value_usd": 1210.0, "ending_stocks": 17.0},
                "2024": {"production": 216.0, "consumption": 575.0, "import_volume": 372.0, "import_value_usd": 28500.0, "export_volume": 13.0, "export_value_usd": 1180.0, "ending_stocks": 16.0}
            }
        },
        {
            "id": "COM-MINE-005-GAS-ALAM",
            "name": "Gas Bumi & LNG (Liquefied Natural Gas)",
            "division": "HASIL_BUMI",
            "division_label": "Barang Hasil Bumi",
            "group": "TAMBANG_MINERAL_ENERGI",
            "group_label": "Hasil Bumi Ditambang (Energi & Mineral)",
            "realm": "DITAMBANG",
            "realm_label": "Ditambang (Minyak & Gas Bumi)",
            "unit": "Triliun BTU (TBTU)",
            "hs_chapter": "HS 27 (Gas Bumi)",
            "hs_code": "2711.11.00 (Gas Alam Cair / LNG) & 2711.21.00 (Gas Bumi Bentuk Gas)",
            "apbn_classification": "Penerimaan Negara Bukan Pajak (PNBP) Sumber Daya Alam Gas Bumi",
            "lkpp_account_code": "421112 (Pendapatan Bagian Pemerintah Gas Bumi / LNG)",
            "lkpp_classification": "PNBP Sumber Daya Alam Gas Bumi (LRA & LO)",
            "source_institution": "SKK Migas & Kementerian ESDM",
            "legal_basis": "Rencana Induk Gas Bumi Nasional (RI-GBN) & Kepmen ESDM Alokasi Gas Domestik",
            "description": "Pasokan gas pipa industri pupuk, listrik PLN dan ekspor LNG dari Kilang Tangguh, Bontang, dan Donggi Senoro.",
            "time_series": {
                "2018": {"production": 2890, "consumption": 1740, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 1150, "export_value_usd": 7890.0, "ending_stocks": 85},
                "2019": {"production": 2780, "consumption": 1810, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 970, "export_value_usd": 6450.0, "ending_stocks": 85},
                "2020": {"production": 2550, "consumption": 1680, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 870, "export_value_usd": 4210.0, "ending_stocks": 90},
                "2021": {"production": 2510, "consumption": 1710, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 800, "export_value_usd": 6850.0, "ending_stocks": 80},
                "2022": {"production": 2420, "consumption": 1740, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 680, "export_value_usd": 9750.0, "ending_stocks": 80},
                "2023": {"production": 2460, "consumption": 1790, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 670, "export_value_usd": 8620.0, "ending_stocks": 80},
                "2024": {"production": 2520, "consumption": 1850, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 670, "export_value_usd": 8900.0, "ending_stocks": 80}
            }
        },
        # 2.2 Hasil Bumi Tidak Ditambang (Kehutanan & Sumber Daya Alam / Hayati)
        {
            "id": "COM-NONMINE-001-KAYU",
            "name": "Kayu Olahan (Plywood, Veneer, Kayu Lapis)",
            "division": "HASIL_BUMI",
            "division_label": "Barang Hasil Bumi",
            "group": "NON_TAMBANG_HAYATI",
            "group_label": "Hasil Bumi Tidak Ditambang (Kehutanan & Hayati)",
            "realm": "TIDAK_DITAMBANG",
            "realm_label": "Tidak Ditambang (Kehutanan)",
            "unit": "Juta M³",
            "hs_chapter": "HS 44 (Kayu & Barang dari Kayu)",
            "hs_code": "4412.31.00 & 4407.29.00 (Kayu Lapis / Plywood & Kayu Gergajian)",
            "apbn_classification": "Penerimaan Negara Bukan Pajak (PNBP) Sumber Daya Alam Kehutanan (PSDH & Dana Reboisasi)",
            "lkpp_account_code": "421311 (Provisi Sumber Daya Hutan / PSDH) / 421312 (Dana Reboisasi / DR)",
            "lkpp_classification": "PNBP Sumber Daya Alam Kehutanan (LRA & LO)",
            "source_institution": "Kementerian Lingkungan Hidup dan Kehutanan (KLHK) & BPS",
            "legal_basis": "UU No. 18 Tahun 2013 tentang Pencegahan dan Pemberantasan Perusakan Hutan & SVLK",
            "description": "Hasil hutan kayu bersertifikasi kelestarian (SVLK) untuk industri konstruksi domestik dan ekspor furniture/plywood ke AS/Jepang.",
            "time_series": {
                "2018": {"production": 12.8, "consumption": 6.5, "import_volume": 0.4, "import_value_usd": 210.0, "export_volume": 6.7, "export_value_usd": 3950.0, "ending_stocks": 1.2},
                "2019": {"production": 13.2, "consumption": 6.8, "import_volume": 0.5, "import_value_usd": 230.0, "export_volume": 6.9, "export_value_usd": 3810.0, "ending_stocks": 1.2},
                "2020": {"production": 12.1, "consumption": 6.2, "import_volume": 0.3, "import_value_usd": 170.0, "export_volume": 6.2, "export_value_usd": 3540.0, "ending_stocks": 1.2},
                "2021": {"production": 13.5, "consumption": 6.9, "import_volume": 0.4, "import_value_usd": 240.0, "export_volume": 7.0, "export_value_usd": 4620.0, "ending_stocks": 1.2},
                "2022": {"production": 14.1, "consumption": 7.2, "import_volume": 0.5, "import_value_usd": 280.0, "export_volume": 7.4, "export_value_usd": 4850.0, "ending_stocks": 1.2},
                "2023": {"production": 13.8, "consumption": 7.4, "import_volume": 0.4, "import_value_usd": 250.0, "export_volume": 6.8, "export_value_usd": 4120.0, "ending_stocks": 1.2},
                "2024": {"production": 14.2, "consumption": 7.6, "import_volume": 0.4, "import_value_usd": 260.0, "export_volume": 7.0, "export_value_usd": 4350.0, "ending_stocks": 1.2}
            }
        },
        {
            "id": "COM-NONMINE-002-RUMPUT-LAUT",
            "name": "Rumput Laut Kering & Karagenan",
            "division": "HASIL_BUMI",
            "division_label": "Barang Hasil Bumi",
            "group": "NON_TAMBANG_HAYATI",
            "group_label": "Hasil Bumi Tidak Ditambang (Kehutanan & Hayati)",
            "realm": "TIDAK_DITAMBANG",
            "realm_label": "Tidak Ditambang (Kelautan & Hayati Pesisir)",
            "unit": "Ribu Ton",
            "hs_chapter": "HS 12 & 13 (Rumput Laut & Karagenan)",
            "hs_code": "1212.21.00 (Rumput Laut Kering) & 1302.39.10 (Karagenan Murni)",
            "apbn_classification": "Program Hilirisasi Rumput Laut Nasional & PNBP Jasa Kelautan",
            "lkpp_account_code": "421419 (Pendapatan Jasa Pemanfaatan Sumber Daya Pesisir KKP)",
            "lkpp_classification": "PNBP Sumber Daya Alam Kelautan & Perikanan",
            "source_institution": "Kementerian Kelautan dan Perikanan & BPS",
            "legal_basis": "Perpres No. 51 Tahun 2024 tentang Hilirisasi Rumput Laut Nasional",
            "description": "Hasil sumber daya hayati laut pesisir non-tambang. Bahan baku industri makanan, farmasi, kosmetik dan bioplastik ramah lingkungan.",
            "time_series": {
                "2018": {"production": 10200, "consumption": 3800, "import_volume": 5, "import_value_usd": 12.0, "export_volume": 6400, "export_value_usd": 290.0, "ending_stocks": 320},
                "2019": {"production": 9900, "consumption": 4100, "import_volume": 6, "import_value_usd": 14.2, "export_volume": 5800, "export_value_usd": 320.0, "ending_stocks": 320},
                "2020": {"production": 9600, "consumption": 4050, "import_volume": 4, "import_value_usd": 10.5, "export_volume": 5550, "export_value_usd": 280.0, "ending_stocks": 320},
                "2021": {"production": 9100, "consumption": 4200, "import_volume": 5, "import_value_usd": 13.0, "export_volume": 4900, "export_value_usd": 350.0, "ending_stocks": 320},
                "2022": {"production": 9600, "consumption": 4500, "import_volume": 6, "import_value_usd": 18.0, "export_volume": 5100, "export_value_usd": 600.0, "ending_stocks": 320},
                "2023": {"production": 9800, "consumption": 4800, "import_volume": 5, "import_value_usd": 15.0, "export_volume": 5000, "export_value_usd": 440.0, "ending_stocks": 320},
                "2024": {"production": 10100, "consumption": 5100, "import_volume": 6, "import_value_usd": 16.0, "export_volume": 5000, "export_value_usd": 480.0, "ending_stocks": 320}
            }
        },
        {
            "id": "COM-NONMINE-003-PANAS-BUMI",
            "name": "Energi Panas Bumi (Geothermal Electricity)",
            "division": "HASIL_BUMI",
            "division_label": "Barang Hasil Bumi",
            "group": "NON_TAMBANG_HAYATI",
            "group_label": "Hasil Bumi Tidak Ditambang (Energi Bersih Terbarukan)",
            "realm": "TIDAK_DITAMBANG",
            "realm_label": "Tidak Ditambang (Energi Terbarukan)",
            "unit": "GWh (GigaWatt-hour)",
            "hs_chapter": "HS 27 (Energi Listrik)",
            "hs_code": "2716.00.00 (Energi Listrik Tenaga Panas Bumi)",
            "apbn_classification": "Penerimaan Negara Bukan Pajak (PNBP) Pengusahaan Panas Bumi",
            "lkpp_account_code": "421113 (Pendapatan Bagian Pemerintah Panas Bumi / Geothermal)",
            "lkpp_classification": "PNBP Sumber Daya Alam Panas Bumi (LRA & LO)",
            "source_institution": "Ditjen EBTKE Kementerian ESDM & PT PLN",
            "legal_basis": "UU No. 21 Tahun 2014 tentang Panas Bumi & RUPTL PLN 2021-2030",
            "description": "Pemanfaatan uap panas bumi alami non-tambang untuk pembangkit listrik baseload bebas emisi karbon.",
            "time_series": {
                "2018": {"production": 13850, "consumption": 13850, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 0, "export_value_usd": 0.0, "ending_stocks": 0},
                "2019": {"production": 14920, "consumption": 14920, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 0, "export_value_usd": 0.0, "ending_stocks": 0},
                "2020": {"production": 15410, "consumption": 15410, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 0, "export_value_usd": 0.0, "ending_stocks": 0},
                "2021": {"production": 15890, "consumption": 15890, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 0, "export_value_usd": 0.0, "ending_stocks": 0},
                "2022": {"production": 16450, "consumption": 16450, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 0, "export_value_usd": 0.0, "ending_stocks": 0},
                "2023": {"production": 16980, "consumption": 16980, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 0, "export_value_usd": 0.0, "ending_stocks": 0},
                "2024": {"production": 17620, "consumption": 17620, "import_volume": 0, "import_value_usd": 0.0, "export_volume": 0, "export_value_usd": 0.0, "ending_stocks": 0}
            }
        }
    ]

    # --------------------------------------------------------------------------
    # APBN & LKPP FINANCIAL REALIZATION TIME SERIES (Rp Miliar)
    # Sumber: LKPP Audited BPK RI, LRA Kemenkeu, Nota Keuangan RAPBN
    # --------------------------------------------------------------------------
    APBN_FINANCIAL_SERIES = {
        "COM-AGRI-001-BERAS": {
            "apbn_item_name": "Belanja Ketahanan Pangan & Cadangan Beras Pemerintah (CBP Bulog)",
            "account_code": "562111 / 411511",
            "publication_source": "LRA APBN Kemenkeu & LKPP Audited (Buku II Belanja K/L Ketahanan Pangan)",
            "unit": "Rp Miliar",
            "values": {"2018": 15200, "2019": 16800, "2020": 20450, "2021": 24100, "2022": 28500, "2023": 38650, "2024": 42800}
        },
        "COM-AGRI-002-JAGUNG": {
            "apbn_item_name": "Belanja Subsidi Pupuk Pangan & Fasilitasi Pasokan Pakan Jagung",
            "account_code": "531111",
            "publication_source": "LKPP Audited - Laporan Realisasi Anggaran Subsidi Non-Energi Kemenkeu",
            "unit": "Rp Miliar",
            "values": {"2018": 31200, "2019": 29500, "2020": 34200, "2021": 28600, "2022": 25300, "2023": 26800, "2024": 33500}
        },
        "COM-AGRI-003-KEDELAI": {
            "apbn_item_name": "Belanja Bantuan SPHP Pengrajin Tahu Tempe & Bantuan Benih Kedelai",
            "account_code": "562111 / 526115",
            "publication_source": "Laporan Kinerja Badan Pangan Nasional & Ditjen Anggaran Kemenkeu",
            "unit": "Rp Miliar",
            "values": {"2018": 850, "2019": 920, "2020": 1100, "2021": 1450, "2022": 3200, "2023": 2850, "2024": 3100}
        },
        "COM-AGRI-004-GULA": {
            "apbn_item_name": "Penerimaan Bea Masuk Impor Gula & PMN Revitalisasi Pabrik Gula",
            "account_code": "411511 / 54",
            "publication_source": "LKPP Audited & Laporan Kinerja DJBC Kemenkeu",
            "unit": "Rp Miliar",
            "values": {"2018": 2400, "2019": 2150, "2020": 2300, "2021": 2850, "2022": 3600, "2023": 4100, "2024": 4450}
        },
        "COM-AGRI-005-BAWANG-MERAH": {
            "apbn_item_name": "Belanja Pengendalian Inflasi Volatile Food Bapanas & Kementan",
            "account_code": "526115",
            "publication_source": "LRA APBN Pos Dukungan Pengendalian Inflasi Daerah (TPID/Kemenkeu)",
            "unit": "Rp Miliar",
            "values": {"2018": 480, "2019": 510, "2020": 640, "2021": 720, "2022": 1250, "2023": 1420, "2024": 1580}
        },
        "COM-AGRI-006-CPO": {
            "apbn_item_name": "Penerimaan Bea Keluar Ekspor CPO & Pungutan Ekspor BPDPKS",
            "account_code": "411521 / 424111",
            "publication_source": "LKPP Audited - Laporan Operasional BLU BPDPKS & DJBC Kemenkeu",
            "unit": "Rp Miliar",
            "values": {"2018": 14800, "2019": 12100, "2020": 18500, "2021": 71600, "2022": 45800, "2023": 32400, "2024": 36200}
        },
        "COM-LIVE-001-DAGING-SAPI": {
            "apbn_item_name": "Penerimaan Bea Masuk Sapi Bakalan & Stabilisasi Pasokan Daging",
            "account_code": "411511 / 526115",
            "publication_source": "LRA APBN & Ditjen Peternakan dan Kesehatan Hewan Kementan",
            "unit": "Rp Miliar",
            "values": {"2018": 820, "2019": 950, "2020": 890, "2021": 1150, "2022": 1320, "2023": 1410, "2024": 1480}
        },
        "COM-LIVE-002-DAGING-AYAM": {
            "apbn_item_name": "Fasilitasi Peternakan Rakyat Unggas & Pajak Domestik",
            "account_code": "411121 / 526",
            "publication_source": "LKPP Audited & Ditjen PKH Kementerian Pertanian",
            "unit": "Rp Miliar",
            "values": {"2018": 1120, "2019": 1280, "2020": 1350, "2021": 1540, "2022": 1820, "2023": 1950, "2024": 2100}
        },
        "COM-FISH-001-IKAN-LAUT": {
            "apbn_item_name": "PNBP Sumber Daya Alam Perikanan (Pungutan Hasil Perikanan/PHP)",
            "account_code": "421411",
            "publication_source": "LKPP Audited BPK RI (LRA PNBP SDA Perikanan Kementerian Kelautan dan Perikanan)",
            "unit": "Rp Miliar",
            "values": {"2018": 640, "2019": 580, "2020": 600, "2021": 1070, "2022": 1260, "2023": 1580, "2024": 1820}
        },
        "COM-FISH-002-UDANG-BUDIDAYA": {
            "apbn_item_name": "PNBP Usaha Budidaya Ikan & Devisa Ekspor Komoditas Kelautan",
            "account_code": "421412",
            "publication_source": "LRA LKPP Kemenkeu & Ditjen Perikanan Budidaya KKP",
            "unit": "Rp Miliar",
            "values": {"2018": 210, "2019": 245, "2020": 280, "2021": 340, "2022": 420, "2023": 490, "2024": 550}
        },
        "COM-MINE-001-BATUBARA": {
            "apbn_item_name": "PNBP Royalti SDA Batubara Minerba",
            "account_code": "421211",
            "publication_source": "LKPP Audited BPK RI & Ditjen Anggaran Kemenkeu (Realisasi PNBP SDA Minerba)",
            "unit": "Rp Miliar",
            "values": {"2018": 41800, "2019": 35200, "2020": 24600, "2021": 75300, "2022": 183500, "2023": 138200, "2024": 125600}
        },
        "COM-MINE-002-NIKEL": {
            "apbn_item_name": "PNBP Royalti Nikel & PPh Badan Smelter Hilirisasi",
            "account_code": "421211 / 411126",
            "publication_source": "LRA LKPP Audited & Ditjen Minerba Kementerian ESDM",
            "unit": "Rp Miliar",
            "values": {"2018": 2300, "2019": 3800, "2020": 5600, "2021": 14200, "2022": 24800, "2023": 31500, "2024": 35200}
        },
        "COM-MINE-003-TEMBAGA": {
            "apbn_item_name": "Penerimaan Bea Keluar Konsentrat Tembaga & Royalti",
            "account_code": "411521 / 421211",
            "publication_source": "LKPP Audited & Laporan Tahunan Ditjen Bea dan Cukai Kemenkeu",
            "unit": "Rp Miliar",
            "values": {"2018": 3800, "2019": 2900, "2020": 3400, "2021": 8200, "2022": 14600, "2023": 18400, "2024": 19800}
        },
        "COM-MINE-004-MINYAK-BUMI": {
            "apbn_item_name": "PNBP Sumber Daya Alam Minyak Bumi Mentah",
            "account_code": "421111",
            "publication_source": "LKPP Audited BPK RI (LRA PNBP SDA Minyak Bumi Kemenkeu)",
            "unit": "Rp Miliar",
            "values": {"2018": 102400, "2019": 88500, "2020": 48200, "2021": 69800, "2022": 108400, "2023": 84200, "2024": 79500}
        },
        "COM-MINE-005-GAS-ALAM": {
            "apbn_item_name": "PNBP Sumber Daya Alam Gas Bumi & Bagian Pemerintah LNG",
            "account_code": "421112",
            "publication_source": "LKPP Audited BPK RI (LRA PNBP SDA Gas Bumi Kemenkeu)",
            "unit": "Rp Miliar",
            "values": {"2018": 40400, "2019": 31900, "2020": 20900, "2021": 28600, "2022": 40300, "2023": 33000, "2024": 31000}
        },
        "COM-NONMINE-001-KAYU-OLAHAN": {
            "apbn_item_name": "PNBP SDA Kehutanan (Provisi Sumber Daya Hutan & Dana Reboisasi)",
            "account_code": "421311 / 421312",
            "publication_source": "LKPP Audited (LRA PNBP SDA Kehutanan Kementerian Lingkungan Hidup dan Kehutanan)",
            "unit": "Rp Miliar",
            "values": {"2018": 4800, "2019": 4600, "2020": 4400, "2021": 4900, "2022": 5600, "2023": 5400, "2024": 5550}
        },
        "COM-NONMINE-002-RUMPUT-LAUT": {
            "apbn_item_name": "PNBP Jasa Kelautan & Dana Alokasi Hilirisasi Hayati Pesisir",
            "account_code": "421419",
            "publication_source": "LRA Kemenkeu & Ditjen Pengelolaan Kelautan dan Ruang Laut KKP",
            "unit": "Rp Miliar",
            "values": {"2018": 180, "2019": 210, "2020": 195, "2021": 260, "2022": 340, "2023": 390, "2024": 430}
        },
        "COM-NONMINE-003-PANAS-BUMI": {
            "apbn_item_name": "PNBP Pengusahaan Panas Bumi / Geothermal",
            "account_code": "421113",
            "publication_source": "LKPP Audited BPK RI (LRA PNBP Panas Bumi Ditjen EBTKE Kementerian ESDM)",
            "unit": "Rp Miliar",
            "values": {"2018": 1650, "2019": 1820, "2020": 1980, "2021": 2150, "2022": 2450, "2023": 2680, "2024": 2850}
        }
    }

    @classmethod
    def get_categories_structure(cls) -> Dict[str, Any]:
        """Returns structured divisions, groups, HS chapters, APBN/LKPP groupings, and summary metrics."""
        divisions = [
            {
                "id": "PERTANIAN_PETERNAKAN",
                "label": "🌾 Pertanian & Peternakan",
                "description": "Tracking neraca pangan pokok, tanaman pangan darat, peternakan, serta perikanan tangkap laut & budidaya air.",
                "groups": [
                    {"id": "PANGAN_POKOK", "label": "🍚 Pertanian Pangan Pokok"},
                    {"id": "HORTIKULTURA", "label": "🧅 Hortikultura & Sayuran"},
                    {"id": "PERKEBUNAN", "label": "🌴 Perkebunan Komersial"},
                    {"id": "PETERNAKAN", "label": "🥩 Peternakan & Hasil Ternak (Darat)"},
                    {"id": "PERIKANAN", "label": "🐟 Perikanan & Akuatik (Air Laut & Tawar)"}
                ]
            },
            {
                "id": "HASIL_BUMI",
                "label": "⛏️ Hasil Bumi",
                "description": "Tracking sumber daya alam ditambang (batubara, nikel, tembaga, migas) dan tidak ditambang (kehutanan, rumput laut, panas bumi).",
                "groups": [
                    {"id": "TAMBANG_MINERAL_ENERGI", "label": "💎 Hasil Bumi Ditambang (Mineral, Batubara, Migas)"},
                    {"id": "NON_TAMBANG_HAYATI", "label": "🌲 Hasil Bumi Tidak Ditambang (Kehutanan, Laut & Panas Bumi)"}
                ]
            }
        ]

        # Extract unique HS chapters and APBN/LKPP categories
        hs_chapters = sorted(list(set(c["hs_chapter"] for c in cls.COMMODITIES)))
        apbn_categories = sorted(list(set(c["lkpp_classification"] for c in cls.COMMODITIES)))

        commodities_summary = []
        for c in cls.COMMODITIES:
            # Latest 2024 data point
            latest_year = "2024"
            latest = c["time_series"].get(latest_year, {})
            prod = latest.get("production", 0)
            cons = latest.get("consumption", 0)
            imp = latest.get("import_volume", 0)
            exp = latest.get("export_volume", 0)

            # Metrics
            surplus = round(prod - cons, 2)
            ssr = round((prod / cons * 100), 1) if cons > 0 else 100.0
            idr = round((imp / (prod + imp - exp) * 100), 1) if (prod + imp - exp) > 0 else 0.0

            status_badge = "SWASEMBADA_SURPLUS" if ssr >= 100 and idr <= 10 else (
                "NET_EKSPORTIR" if exp > imp else (
                    "KETERGANTUNGAN_IMPOR_TINGGI" if idr > 40 else "DEFISIT_MODERAT"
                )
            )

            commodities_summary.append({
                "id": c["id"],
                "name": c["name"],
                "division": c["division"],
                "group": c["group"],
                "realm": c["realm"],
                "unit": c["unit"],
                "hs_chapter": c["hs_chapter"],
                "hs_code": c["hs_code"],
                "apbn_classification": c["apbn_classification"],
                "lkpp_account_code": c["lkpp_account_code"],
                "lkpp_classification": c["lkpp_classification"],
                "latest_production": prod,
                "latest_consumption": cons,
                "latest_import": imp,
                "latest_export": exp,
                "latest_surplus": surplus,
                "ssr_percent": ssr,
                "idr_percent": idr,
                "status_badge": status_badge,
                "source": c["source_institution"]
            })

        return {
            "divisions": divisions,
            "hs_chapters": hs_chapters,
            "apbn_categories": apbn_categories,
            "commodities": commodities_summary,
            "total_commodities": len(cls.COMMODITIES),
            "years_available": ["2018", "2019", "2020", "2021", "2022", "2023", "2024"]
        }

    @classmethod
    def get_commodity_balance(cls, commodity_id: str, start_year: int = 2018, end_year: int = 2024) -> Optional[Dict[str, Any]]:
        """Calculates and returns full annual balance rows, KPIs, and statutory metadata for a specific commodity."""
        commodity = next((c for c in cls.COMMODITIES if c["id"] == commodity_id), None)
        if not commodity:
            return None

        balance_records = []
        raw_ts = commodity["time_series"]

        for y in range(start_year, end_year + 1):
            sy = str(y)
            if sy not in raw_ts:
                continue

            pt = raw_ts[sy]
            prod = pt["production"]
            cons = pt["consumption"]
            imp_vol = pt["import_volume"]
            imp_val = pt.get("import_value_usd", 0.0)
            exp_vol = pt["export_volume"]
            exp_val = pt.get("export_value_usd", 0.0)
            ending_stock = pt.get("ending_stocks", 0.0)

            # Formulas:
            surplus_deficit = round(prod - cons, 2)
            net_trade_vol = round(exp_vol - imp_vol, 2)
            net_trade_val = round(exp_val - imp_val, 2)
            ssr = round((prod / cons * 100), 2) if cons > 0 else 100.0
            denom = prod + imp_vol - exp_vol
            idr = round((imp_vol / denom * 100), 2) if denom > 0 else 0.0
            idr = max(0.0, min(100.0, idr))

            # APBN Financial figures from canonical registry
            apbn_info = cls.APBN_FINANCIAL_SERIES.get(commodity["id"], {})
            apbn_vals = apbn_info.get("values", {})
            apbn_realization = apbn_vals.get(sy, 0.0)

            balance_records.append({
                "period": sy,
                "production": prod,
                "consumption": cons,
                "import_volume": imp_vol,
                "import_value_usd_million": imp_val,
                "export_volume": exp_vol,
                "export_value_usd_million": exp_val,
                "surplus_deficit": surplus_deficit,
                "net_trade_volume": net_trade_vol,
                "net_trade_value_usd": net_trade_val,
                "ssr_percent": ssr,
                "idr_percent": idr,
                "ending_stocks": ending_stock,
                "unit": commodity["unit"],
                "apbn_realization_idr_billion": apbn_realization,
                "apbn_item_name": apbn_info.get("apbn_item_name", commodity["apbn_classification"]),
                "apbn_publication_source": apbn_info.get("publication_source", "LRA APBN Kemenkeu & LKPP Audited"),
                "status": "SURPLUS" if surplus_deficit >= 0 else "DEFISIT"
            })

        # Calculate Summary KPI Aggregate
        if balance_records:
            latest = balance_records[-1]
            total_prod = sum(r["production"] for r in balance_records)
            total_cons = sum(r["consumption"] for r in balance_records)
            total_imp = sum(r["import_volume"] for r in balance_records)
            total_exp = sum(r["export_volume"] for r in balance_records)
            avg_ssr = round(sum(r["ssr_percent"] for r in balance_records) / len(balance_records), 1)
            avg_idr = round(sum(r["idr_percent"] for r in balance_records) / len(balance_records), 1)

            kpis = {
                "latest_period": latest["period"],
                "latest_production": latest["production"],
                "latest_consumption": latest["consumption"],
                "latest_import": latest["import_volume"],
                "latest_export": latest["export_volume"],
                "latest_surplus": latest["surplus_deficit"],
                "latest_ssr": latest["ssr_percent"],
                "latest_idr": latest["idr_percent"],
                "latest_stocks": latest["ending_stocks"],
                "cumulative_production": round(total_prod, 2),
                "cumulative_consumption": round(total_cons, 2),
                "cumulative_import": round(total_imp, 2),
                "cumulative_export": round(total_exp, 2),
                "average_ssr": avg_ssr,
                "average_idr": avg_idr,
                "status_headline": "Swasembada Nasional Penuh" if latest["ssr_percent"] >= 100 and latest["idr_percent"] <= 10 else (
                    "Net Eksportir Terbesar" if latest["export_volume"] > latest["import_volume"] else (
                        "Ketergantungan Impor Tinggi (>40%)" if latest["idr_percent"] > 40 else "Defisit Pasokan dengan Dukungan Impor"
                    )
                )
            }
        else:
            kpis = {}

        return {
            "commodity": {
                "id": commodity["id"],
                "name": commodity["name"],
                "division": commodity["division"],
                "division_label": commodity["division_label"],
                "group": commodity["group"],
                "group_label": commodity["group_label"],
                "realm": commodity["realm"],
                "realm_label": commodity["realm_label"],
                "unit": commodity["unit"],
                "hs_chapter": commodity["hs_chapter"],
                "hs_code": commodity["hs_code"],
                "apbn_classification": commodity["apbn_classification"],
                "lkpp_account_code": commodity["lkpp_account_code"],
                "lkpp_classification": commodity["lkpp_classification"],
                "source_institution": commodity["source_institution"],
                "legal_basis": commodity["legal_basis"],
                "description": commodity["description"]
            },
            "kpis": kpis,
            "records": balance_records
        }

    @classmethod
    def get_matrix_overview(cls, division: Optional[str] = None, group: Optional[str] = None, hs_chapter: Optional[str] = None, apbn_category: Optional[str] = None, year: str = "2024") -> List[Dict[str, Any]]:
        """Returns comparative matrix for all commodities for a specific reference year with multi-level filtering."""
        filtered = cls.COMMODITIES
        if division:
            filtered = [c for c in filtered if c["division"] == division]
        if group:
            filtered = [c for c in filtered if c["group"] == group]
        if hs_chapter:
            filtered = [c for c in filtered if c["hs_chapter"] == hs_chapter]
        if apbn_category:
            filtered = [c for c in filtered if c["lkpp_classification"] == apbn_category]

        matrix = []
        for c in filtered:
            pt = c["time_series"].get(year, {})
            prod = pt.get("production", 0)
            cons = pt.get("consumption", 0)
            imp_vol = pt.get("import_volume", 0)
            imp_val = pt.get("import_value_usd", 0.0)
            exp_vol = pt.get("export_volume", 0)
            exp_val = pt.get("export_value_usd", 0.0)
            stocks = pt.get("ending_stocks", 0)

            surplus = round(prod - cons, 2)
            ssr = round((prod / cons * 100), 1) if cons > 0 else 100.0
            denom = prod + imp_vol - exp_vol
            idr = round((imp_vol / denom * 100), 1) if denom > 0 else 0.0
            idr = max(0.0, min(100.0, idr))

            matrix.append({
                "commodity_id": c["id"],
                "commodity_name": c["name"],
                "division": c["division"],
                "division_label": c["division_label"],
                "group": c["group"],
                "group_label": c["group_label"],
                "realm_label": c["realm_label"],
                "unit": c["unit"],
                "hs_chapter": c["hs_chapter"],
                "hs_code": c["hs_code"],
                "apbn_classification": c["apbn_classification"],
                "lkpp_account_code": c["lkpp_account_code"],
                "lkpp_classification": c["lkpp_classification"],
                "year": year,
                "production": prod,
                "consumption": cons,
                "import_volume": imp_vol,
                "import_value_usd": imp_val,
                "export_volume": exp_vol,
                "export_value_usd": exp_val,
                "surplus_deficit": surplus,
                "ssr_percent": ssr,
                "idr_percent": idr,
                "ending_stocks": stocks,
                "source": c["source_institution"],
                "legal_basis": c["legal_basis"]
            })

        return matrix

    # ==========================================================================
    # SPATIAL REGIONAL REGISTRY (GEOMAP HASIL BUMI & KOMODITAS)
    # Lokasi Sentra Produksi Terbanyak, PNBP APBN Wilayah, Titik Ekspor & Smelter
    # ==========================================================================
    SPATIAL_REGISTRY: Dict[str, Dict[str, Any]] = {
        "COM-MINE-001-BATUBARA": {
            "PRODUKSI_TERBANYAK": {
                "variable_name": "Sentra Produksi Batubara Terbanyak (2024)",
                "unit": "Juta Ton",
                "source": "Ditjen Minerba Kementerian ESDM & MOMS Nasional",
                "points": [
                    {"rank": 1, "province": "Kalimantan Timur", "regency": "Kutai Timur, Kutai Kartanegara, Berau", "lat": 0.5387, "lng": 116.4194, "value": 450.0, "percentage_share": 53.9, "notes": "Cekungan Kutai & Pasir. Lokasi tambang raksasa PT KPC, PT Kideco Jaya Agung, PT Berau Coal.", "color": "#059669"},
                    {"rank": 2, "province": "Kalimantan Selatan", "regency": "Tanah Bumbu, Kotabaru, Tabalong", "lat": -3.0926, "lng": 115.2838, "value": 185.0, "percentage_share": 22.2, "notes": "Cekungan Asam-Asam & Barito. Lokasi PT Arutmin Indonesia, PT Adaro Indonesia.", "color": "#10b981"},
                    {"rank": 3, "province": "Sumatera Selatan", "regency": "Muara Enim, Lahat", "lat": -3.6554, "lng": 103.7744, "value": 110.0, "percentage_share": 13.2, "notes": "Cekungan Sumatera Selatan. Tambang Tanjung Enim PT Bukit Asam Tbk (PTBA).", "color": "#34d399"},
                    {"rank": 4, "province": "Kalimantan Tengah", "regency": "Barito Utara, Murung Raya", "lat": -0.6833, "lng": 114.5500, "value": 58.0, "percentage_share": 6.9, "notes": "Endapan batubara kalori tinggi (coking coal) PT Maruwai Coal (Adaro MetCoal).", "color": "#6ee7b7"},
                    {"rank": 5, "province": "Jambi", "regency": "Sarolangun, Tebo, Batanghari", "lat": -1.6101, "lng": 102.7797, "value": 32.0, "percentage_share": 3.8, "notes": "Batubara sub-bituminus untuk pasokan PLTU domestik Sumatera dan ekspor Asia Selatan.", "color": "#a7f3d0"}
                ]
            },
            "PNBP_APBN": {
                "variable_name": "Kontribusi Setoran PNBP Royalti SDA Minerba (2024)",
                "unit": "Rp Miliar",
                "source": "LRA APBN Kemenkeu & LKPP Audited (Akun BAS 421211)",
                "points": [
                    {"rank": 1, "province": "Kalimantan Timur", "regency": "Kaltim (Provinsi & Daerah Penghasil)", "lat": 0.5387, "lng": 116.4194, "value": 48600.0, "percentage_share": 58.3, "notes": "Setoran PNBP royalti batubara terbesar nasional dan basis perhitungan DBH SDA Kemenkeu.", "color": "#4f46e5"},
                    {"rank": 2, "province": "Kalimantan Selatan", "regency": "Kalsel (Tanah Bumbu, Tabalong)", "lat": -3.0926, "lng": 115.2838, "value": 19800.0, "percentage_share": 23.8, "notes": "Penyumbang royalti PKP2B dan IUP nasional.", "color": "#6366f1"},
                    {"rank": 3, "province": "Sumatera Selatan", "regency": "Sumsel (Muara Enim, Lahat)", "lat": -3.6554, "lng": 103.7744, "value": 9200.0, "percentage_share": 11.0, "notes": "Royalti PTBA & IUP swasta wilayah Sumatera Selatan.", "color": "#818cf8"},
                    {"rank": 4, "province": "Kalimantan Tengah", "regency": "Kalteng (Barito Raya)", "lat": -0.6833, "lng": 114.5500, "value": 4100.0, "percentage_share": 4.9, "notes": "Royalti batubara metalurgi bernilai tinggi.", "color": "#a5b4fc"},
                    {"rank": 5, "province": "Jambi", "regency": "Jambi (Sarolangun)", "lat": -1.6101, "lng": 102.7797, "value": 1650.0, "percentage_share": 2.0, "notes": "PNBP royalti minerba wilayah Sumbagsel.", "color": "#c7d2fe"}
                ]
            },
            "TITIK_EKSPOR": {
                "variable_name": "Pelabuhan & Terminal Pengapalan Ekspor Utama",
                "unit": "Juta Ton / Tahun",
                "source": "Kementerian Perhubungan & Asosiasi Pertambangan Batubara (APBI)",
                "points": [
                    {"rank": 1, "province": "Kalimantan Timur", "regency": "Muara Berau & Muara Jawa STS", "lat": -0.5830, "lng": 117.3830, "value": 180.0, "percentage_share": 32.1, "notes": "Titik alih muat kapal laut (Ship-to-Ship Transfer) terbesar untuk kapal Capesize ke Tiongkok & India.", "color": "#0284c7"},
                    {"rank": 2, "province": "Kalimantan Selatan", "regency": "Muara Satui & Tanjung Pemancingan", "lat": -3.7830, "lng": 115.7500, "value": 115.0, "percentage_share": 20.5, "notes": "Terminal ekspor kapal tongkang & bulk carrier rute Selat Makassar.", "color": "#0ea5e9"},
                    {"rank": 3, "province": "Kalimantan Timur", "regency": "Tanjung Bara Coal Terminal (TBCT)", "lat": 0.5180, "lng": 117.6250, "value": 65.0, "percentage_share": 11.6, "notes": "Pelabuhan batubara dedicated laut dalam milik PT KPC di Sangatta.", "color": "#38bdf8"},
                    {"rank": 4, "province": "Sumatera Selatan / Lampung", "regency": "Pelabuhan Tarahan Bandar Lampung", "lat": -5.5170, "lng": 105.3330, "value": 35.0, "percentage_share": 6.3, "notes": "Terminal ekspor & DMO terintegrasi jalur kereta api Babaranjang PTBA.", "color": "#7dd3fc"}
                ]
            },
            "SMELTER_HILIR": {
                "variable_name": "Konsumsi Domestik & Kawasan Pembangkit Listrik PLTU",
                "unit": "Juta Ton / Tahun",
                "source": "PT PLN (Persero) & Ditjen Ketenagalistrikan ESDM (DMO 25%)",
                "points": [
                    {"rank": 1, "province": "Banten", "regency": "PLTU Suralaya & Jawa 7 (Cilegon)", "lat": -5.8830, "lng": 106.0330, "value": 35.0, "percentage_share": 15.6, "notes": "Kompleks PLTU batu bara terbesar di barat Jawa pemasok beban listrik Jamali.", "color": "#d97706"},
                    {"rank": 2, "province": "Jawa Tengah & Jatim", "regency": "PLTU Tanjung Jati B (Jepara) & Paiton (Probolinggo)", "lat": -6.4500, "lng": 110.7500, "value": 28.0, "percentage_share": 12.4, "notes": "Konsumen DMO batubara utama pembangkit listrik Jawa.", "color": "#f59e0b"},
                    {"rank": 3, "province": "Sumatera Selatan", "regency": "PLTU Mulut Tambang Sumsel-8 & Hilirisasi DME", "lat": -3.7330, "lng": 103.8000, "value": 15.0, "percentage_share": 6.7, "notes": "Pembangkit mulut tambang 2x660 MW dan kawasan hilirisasi batubara menjadi Dimethyl Ether (DME).", "color": "#fbbf24"}
                ]
            }
        },
        "COM-MINE-002-NIKEL": {
            "PRODUKSI_TERBANYAK": {
                "variable_name": "Sentra Produksi Nikel Olahan Terbanyak (2024)",
                "unit": "Ribu Ton Ni",
                "source": "Kementerian ESDM & Kementerian Perindustrian (Ditjen ILMATE)",
                "points": [
                    {"rank": 1, "province": "Sulawesi Tengah", "regency": "Morowali (Kawasan Industri IMIP & Bahodopi)", "lat": -2.8167, "lng": 122.1500, "value": 924.0, "percentage_share": 42.0, "notes": "Pusat hilirisasi nikel terpadu terbesar di Asia Tenggara (NPI, Ferronickel, Stainless Steel Slab & HPAL).", "color": "#059669"},
                    {"rank": 2, "province": "Maluku Utara", "regency": "Halmahera Tengah (Kawasan Industri IWIP, Weda Bay)", "lat": 0.4833, "lng": 127.8833, "value": 682.0, "percentage_share": 31.0, "notes": "Kawasan industri nikel terpadu Pulau Halmahera & pemurnian MHP bahan baku baterai kendaraan listrik.", "color": "#10b981"},
                    {"rank": 3, "province": "Sulawesi Tenggara", "regency": "Konawe (VDNI/OSS Morosi) & Kolaka (Pomalaa)", "lat": -3.9500, "lng": 122.5000, "value": 462.0, "percentage_share": 21.0, "notes": "Sentra peleburan nikel pig iron dan proyek HPAL Pomalaa Antam/Vale.", "color": "#34d399"},
                    {"rank": 4, "province": "Sulawesi Selatan", "regency": "Luwu Timur (Sorowako PT Vale Indonesia)", "lat": -2.5500, "lng": 121.3500, "value": 132.0, "percentage_share": 6.0, "notes": "Pabrik pengolahan Nickel Matte terintegrasi tertua dan berefisiensi tinggi.", "color": "#6ee7b7"}
                ]
            },
            "PNBP_APBN": {
                "variable_name": "Setoran PNBP Royalti Nikel & PPh Badan Hilirisasi (2024)",
                "unit": "Rp Miliar",
                "source": "LKPP Audited BPK RI & LRA Kemenkeu (Akun BAS 421211 & 411126)",
                "points": [
                    {"rank": 1, "province": "Sulawesi Tengah", "regency": "Sulteng (Morowali)", "lat": -2.8167, "lng": 122.1500, "value": 12800.0, "percentage_share": 45.7, "notes": "Penerimaan PNBP royalti dan pajak korporasi hilirisasi nikel Morowali.", "color": "#4f46e5"},
                    {"rank": 2, "province": "Maluku Utara", "regency": "Malut (Halmahera Tengah & Halmahera Timur)", "lat": 0.4833, "lng": 127.8833, "value": 8900.0, "percentage_share": 31.8, "notes": "Penerimaan royalti tambang nikel Weda Bay & Buli.", "color": "#6366f1"},
                    {"rank": 3, "province": "Sulawesi Tenggara", "regency": "Sultra (Konawe & Kolaka)", "lat": -3.9500, "lng": 122.5000, "value": 5100.0, "percentage_share": 18.2, "notes": "PNBP royalti minerba nikel dan DBH SDA Sultra.", "color": "#818cf8"},
                    {"rank": 4, "province": "Sulawesi Selatan", "regency": "Sulsel (Luwu Timur)", "lat": -2.5500, "lng": 121.3500, "value": 1200.0, "percentage_share": 4.3, "notes": "Royalti PT Vale Indonesia & DBH SDA Sulsel.", "color": "#a5b4fc"}
                ]
            },
            "TITIK_EKSPOR": {
                "variable_name": "Pelabuhan Ekspor Produk Olahan Nikel",
                "unit": "Ribu Ton Ni / Tahun",
                "source": "Direktorat Jenderal Bea dan Cukai (DJBC) Kemenkeu",
                "points": [
                    {"rank": 1, "province": "Sulawesi Tengah", "regency": "Pelabuhan Morowali (IMIP Port)", "lat": -2.8100, "lng": 122.1600, "value": 900.0, "percentage_share": 55.6, "notes": "Pengapalan ekspor Ferronickel, NPI, Stainless Steel Hot Rolled Coil (HRC) ke Tiongkok, India, dan AS.", "color": "#0284c7"},
                    {"rank": 2, "province": "Maluku Utara", "regency": "Pelabuhan Teluk Weda (IWIP Port)", "lat": 0.4900, "lng": 127.8900, "value": 520.0, "percentage_share": 32.1, "notes": "Pengapalan ekspor MHP (Mixed Hydroxide Precipitate) dan Ferronickel.", "color": "#0ea5e9"},
                    {"rank": 3, "province": "Sulawesi Tenggara", "regency": "Pelabuhan Bungkutoko & Morosi Port", "lat": -3.9700, "lng": 122.6000, "value": 200.0, "percentage_share": 12.3, "notes": "Terminal ekspor NPI Kawasan Industri Konawe.", "color": "#38bdf8"}
                ]
            },
            "SMELTER_HILIR": {
                "variable_name": "Fasilitas Pemurnian Smelter Nikel & Rantai Pasok EV",
                "unit": "Kapasitas Ribu Ton Ni / Thn",
                "source": "Kementerian ESDM & Asosiasi Penambang Nikel Indonesia (APNI)",
                "points": [
                    {"rank": 1, "province": "Sulawesi Tengah", "regency": "Smelter RKEF & HPAL Kawasan IMIP Morowali", "lat": -2.8167, "lng": 122.1500, "value": 1200.0, "percentage_share": 45.3, "notes": "54 lini smelter RKEF (Rotary Kiln Electric Furnace) dan pabrik HPAL baterai mobil listrik (PT QMB, PT Huayue).", "color": "#d97706"},
                    {"rank": 2, "province": "Maluku Utara", "regency": "Smelter PT Weda Bay Nickel & PT Yashi IWIP", "lat": 0.4833, "lng": 127.8833, "value": 800.0, "percentage_share": 30.2, "notes": "Smelter pirometalurgi & hidrometalurgi nikel berkapasitas raksasa.", "color": "#f59e0b"},
                    {"rank": 3, "province": "Sulawesi Tenggara", "regency": "Smelter PT Virtue Dragon & Obsidian Stainless Steel", "lat": -3.8833, "lng": 122.4500, "value": 450.0, "percentage_share": 17.0, "notes": "Peleburan Ferronickel di Morosi Konawe.", "color": "#fbbf24"},
                    {"rank": 4, "province": "Sulawesi Selatan", "regency": "Smelter PT Vale Indonesia Sorowako", "lat": -2.5500, "lng": 121.3500, "value": 200.0, "percentage_share": 7.5, "notes": "Fasilitas peleburan nickel matte terintegrasi PLTA Larona & Karebbe.", "color": "#fcd34d"}
                ]
            }
        },
        "COM-MINE-003-TEMBAGA": {
            "PRODUKSI_TERBANYAK": {
                "variable_name": "Sentra Produksi Konsentrat & Katoda Tembaga (2024)",
                "unit": "Ribu Ton Konsentrat",
                "source": "Kementerian ESDM (Ditjen Minerba) & PT Freeport Indonesia",
                "points": [
                    {"rank": 1, "province": "Papua Tengah", "regency": "Mimika (Tambang Grasberg Block Cave & Deep Mill)", "lat": -4.0500, "lng": 137.1167, "value": 2176.0, "percentage_share": 68.0, "notes": "Tambang tembaga & emas bawah tanah (underground mine) terbesar di dunia yang dikelola PT Freeport Indonesia.", "color": "#059669"},
                    {"rank": 2, "province": "Nusa Tenggara Barat", "regency": "Sumbawa Barat (Tambang Batu Hijau PT Amman Mineral)", "lat": -8.9667, "lng": 116.8667, "value": 896.0, "percentage_share": 28.0, "notes": "Tambang tembaga-emas pit terbuka Batu Hijau & prospek eksplorasi Elang.", "color": "#10b981"},
                    {"rank": 3, "province": "Jawa Timur", "regency": "Gresik (Kawasan Ekonomi Khusus JIIPE Manyar)", "lat": -7.1500, "lng": 112.6500, "value": 128.0, "percentage_share": 4.0, "notes": "Pusat pemurnian katoda tembaga murni 99,99% Cu (Smelter Freeport Manyar & PT Smelting).", "color": "#34d399"}
                ]
            },
            "PNBP_APBN": {
                "variable_name": "Setoran PNBP Royalti Tembaga & Dividen BUMN MIND ID (2024)",
                "unit": "Rp Miliar",
                "source": "LRA APBN Kemenkeu & LKPP Audited (Akun 421211 & 424111)",
                "points": [
                    {"rank": 1, "province": "Papua Tengah", "regency": "Mimika / Papua Tengah", "lat": -4.0500, "lng": 137.1167, "value": 18400.0, "percentage_share": 68.1, "notes": "Setoran royalti tembaga-emas PTFI dan bagian penerimaan dividen pemerintah melalui holding BUMN MIND ID.", "color": "#4f46e5"},
                    {"rank": 2, "province": "Nusa Tenggara Barat", "regency": "Sumbawa Barat / NTB", "lat": -8.9667, "lng": 116.8667, "value": 7500.0, "percentage_share": 27.8, "notes": "Royalti minerba PT Amman Mineral Nusa Tenggara & DBH SDA NTB.", "color": "#6366f1"},
                    {"rank": 3, "province": "Jawa Timur", "regency": "Gresik / Jawa Timur", "lat": -7.1500, "lng": 112.6500, "value": 1100.0, "percentage_share": 4.1, "notes": "Pajak penghasilan korporasi & PPh hilirisasi industri peleburan tembaga.", "color": "#818cf8"}
                ]
            },
            "TITIK_EKSPOR": {
                "variable_name": "Pelabuhan Pengapalan Ekspor Konsentrat & Katoda",
                "unit": "Ribu Ton / Tahun",
                "source": "DJBC Kemenkeu & Otoritas Pelabuhan",
                "points": [
                    {"rank": 1, "province": "Papua Tengah", "regency": "Pelabuhan Portsite Amamapare (Mimika)", "lat": -4.8330, "lng": 136.8500, "value": 1400.0, "percentage_share": 63.6, "notes": "Dermaga pengeringan & pengapalan konsentrat tembaga dari pipa konsentrat pipa Grasberg sejauh 115 km.", "color": "#0284c7"},
                    {"rank": 2, "province": "Nusa Tenggara Barat", "regency": "Pelabuhan Khusus Benete (Sumbawa Barat)", "lat": -8.9000, "lng": 116.7330, "value": 650.0, "percentage_share": 29.5, "notes": "Terminal muat kapal curah konsentrat tembaga PT Amman Mineral.", "color": "#0ea5e9"},
                    {"rank": 3, "province": "Jawa Timur", "regency": "Pelabuhan JIIPE Manyar Gresik", "lat": -7.1167, "lng": 112.5833, "value": 150.0, "percentage_share": 6.9, "notes": "Pelabuhan laut dalam terpadu KEK JIIPE untuk ekspor katoda tembaga murni dan anoda slime emas.", "color": "#38bdf8"}
                ]
            },
            "SMELTER_HILIR": {
                "variable_name": "Fasilitas Smelter Pemurnian Tembaga (Hilirisasi UU Minerba)",
                "unit": "Kapasitas Input Konsentrat (Ribu Ton/Thn)",
                "source": "Kementerian ESDM & PT Freeport Indonesia",
                "points": [
                    {"rank": 1, "province": "Jawa Timur", "regency": "Smelter PT Freeport Indonesia (JIIPE Manyar Gresik)", "lat": -7.1167, "lng": 112.5833, "value": 1700.0, "percentage_share": 58.6, "notes": "Smelter single line tembaga terbesar di dunia dengan kapasitas produksi 600 ribu ton katoda tembaga murni per tahun.", "color": "#d97706"},
                    {"rank": 2, "province": "Nusa Tenggara Barat", "regency": "Smelter PT Amman Mineral Industri (Maluk, Sumbawa Barat)", "lat": -8.9333, "lng": 116.7500, "value": 900.0, "percentage_share": 31.0, "notes": "Smelter tembaga modern berkategori Proyek Strategis Nasional (PSN).", "color": "#f59e0b"},
                    {"rank": 3, "province": "Jawa Timur", "regency": "Smelter PT Smelting (Gresik)", "lat": -7.1667, "lng": 112.6667, "value": 300.0, "percentage_share": 10.4, "notes": "Pabrik peleburan dan pemurnian tembaga pertama di Indonesia hasil ekspansi.", "color": "#fbbf24"}
                ]
            }
        },
        "COM-MINE-004-MINYAK-BUMI": {
            "PRODUKSI_TERBANYAK": {
                "variable_name": "Sentra Produksi Minyak Bumi Mentah Terbanyak (2024)",
                "unit": "Ribu Barel / Hari (BOPD)",
                "source": "SKK Migas (Satuan Kerja Khusus Pelaksana Kegiatan Usaha Hulu Migas)",
                "points": [
                    {"rank": 1, "province": "Riau", "regency": "Blok Rokan (Minas, Duri, Bekasap)", "lat": 0.5071, "lng": 101.4478, "value": 175.0, "percentage_share": 29.2, "notes": "Wilayah Kerja Rokan Pertamina Hulu Rokan (PHR). Sentra minyak mentah berat (Duri Heavy) & ringan (Minas SLC).", "color": "#059669"},
                    {"rank": 2, "province": "Jawa Timur", "regency": "Blok Cepu (Lapangan Banyu Urip Bojonegoro)", "lat": -7.1500, "lng": 111.8833, "value": 157.0, "percentage_share": 26.2, "notes": "Lapangan minyak darat berproduksi terbesar di Indonesia yang dikelola ExxonMobil Cepu Ltd.", "color": "#10b981"},
                    {"rank": 3, "province": "Kepulauan Riau", "regency": "Natuna Sea Basin (Blok Kakap, Anambas)", "lat": 3.9000, "lng": 108.2500, "value": 72.0, "percentage_share": 12.0, "notes": "Wilayah kerja lepas pantai (offshore) Laut Natuna.", "color": "#34d399"},
                    {"rank": 4, "province": "Sumatera Selatan", "regency": "Cekungan Sumatera Selatan (Blok Limau & Corridor)", "lat": -3.3167, "lng": 104.0500, "value": 66.0, "percentage_share": 11.0, "notes": "Lapangan tua teroptimasi teknologi EOR (Enhanced Oil Recovery) Pertamina Hulu Rokan Zona 4.", "color": "#6ee7b7"},
                    {"rank": 5, "province": "Kalimantan Timur", "regency": "Kutai Basin (Mahakam, Sanga-Sanga)", "lat": -0.5000, "lng": 117.1500, "value": 54.0, "percentage_share": 9.0, "notes": "Wilayah Kerja Mahakam Pertamina Hulu Mahakam.", "color": "#a7f3d0"},
                    {"rank": 6, "province": "Papua Barat & PBD", "regency": "Cekungan Salawati & Kepala Burung", "lat": -0.8833, "lng": 131.2500, "value": 30.0, "percentage_share": 5.0, "notes": "Lapangan minyak Petrogas Kasuari & Sele Klamono.", "color": "#d1fae5"}
                ]
            },
            "PNBP_APBN": {
                "variable_name": "Setoran PNBP SDA Minyak Bumi ke APBN (2024)",
                "unit": "Rp Miliar",
                "source": "LRA APBN Kemenkeu & LKPP Audited (Akun BAS 421111)",
                "points": [
                    {"rank": 1, "province": "Riau", "regency": "Riau (Bengkalis, Rokan Hilir, Siak)", "lat": 0.5071, "lng": 101.4478, "value": 32500.0, "percentage_share": 31.2, "notes": "Bagian Pemerintah (Government Lifting Take) dan DBH Migas Riau.", "color": "#4f46e5"},
                    {"rank": 2, "province": "Jawa Timur", "regency": "Jawa Timur (Bojonegoro, Tuban)", "lat": -7.1500, "lng": 111.8833, "value": 28200.0, "percentage_share": 27.1, "notes": "Setoran PNBP minyak Blok Cepu dan dana bagi hasil SDA Bojonegoro.", "color": "#6366f1"},
                    {"rank": 3, "province": "Kepulauan Riau", "regency": "Kepulauan Riau (Natuna & Anambas)", "lat": 3.9000, "lng": 108.2500, "value": 13400.0, "percentage_share": 12.9, "notes": "Penerimaan lifting migas lepas pantai Natuna.", "color": "#818cf8"},
                    {"rank": 4, "province": "Sumatera Selatan", "regency": "Sumsel (Muara Enim, Muba, Prabumulih)", "lat": -3.3167, "lng": 104.0500, "value": 11900.0, "percentage_share": 11.4, "notes": "PNBP minyak bumi dan DBH migas Sumsel.", "color": "#a5b4fc"},
                    {"rank": 5, "province": "Kalimantan Timur", "regency": "Kaltim (Kutai Kartanegara)", "lat": -0.5000, "lng": 117.1500, "value": 9800.0, "percentage_share": 9.4, "notes": "Penerimaan migas WK Mahakam & Attaka.", "color": "#c7d2fe"}
                ]
            },
            "TITIK_EKSPOR": {
                "variable_name": "Terminal Muat Lifting & Pengapalan Minyak Mentah",
                "unit": "Kapasitas Lifting (BOPD)",
                "source": "SKK Migas & PT Pertamina International Shipping",
                "points": [
                    {"rank": 1, "province": "Riau", "regency": "Terminal Minyak Dumai (Riau)", "lat": 1.6830, "lng": 101.4500, "value": 180000.0, "percentage_share": 36.7, "notes": "Terminal darat penampung minyak mentah pipa Minas & Duri terbesar.", "color": "#0284c7"},
                    {"rank": 2, "province": "Jawa Timur", "regency": "FSO Gagak Rimang (Offshore Tuban)", "lat": -6.7500, "lng": 112.0830, "value": 160000.0, "percentage_share": 32.7, "notes": "Kapal penampung terapung raksasa (Floating Storage and Offloading) minyak Cepu.", "color": "#0ea5e9"},
                    {"rank": 3, "province": "Kalimantan Timur", "regency": "Terminal Senipah & Tanjung Santan (Kaltim)", "lat": -1.0500, "lng": 117.0330, "value": 75000.0, "percentage_share": 15.3, "notes": "Terminal lifting minyak mentah dan kondensat Blok Mahakam.", "color": "#38bdf8"}
                ]
            },
            "SMELTER_HILIR": {
                "variable_name": "Kilang Pengolahan Minyak Bumi Domestik (Refinery Unit)",
                "unit": "Kapasitas Olah (Ribu Barel/Hari)",
                "source": "PT Kilang Pertamina Internasional (KPI)",
                "points": [
                    {"rank": 1, "province": "Kalimantan Timur", "regency": "Kilang Pertamina RU V Balikpapan (RDMP)", "lat": -1.2667, "lng": 116.8333, "value": 360.0, "percentage_share": 34.0, "notes": "Kilang minyak terbesar di Indonesia pasca modernisasi RDMP menghasilkan BBM standar Euro 5.", "color": "#d97706"},
                    {"rank": 2, "province": "Jawa Tengah", "regency": "Kilang Pertamina RU IV Cilacap", "lat": -7.7000, "lng": 109.0167, "value": 348.0, "percentage_share": 32.8, "notes": "Pemasok 60% kebutuhan BBM pulau Jawa dan 100% kebutuhan aspal nasional.", "color": "#f59e0b"},
                    {"rank": 3, "province": "Jawa Barat", "regency": "Kilang Pertamina RU VI Balongan (Indramayu)", "lat": -6.3667, "lng": 108.3833, "value": 150.0, "percentage_share": 14.2, "notes": "Kilang berteknologi Residue Catalytic Cracking (RCC) pemasok BBM DKI Jakarta.", "color": "#fbbf24"},
                    {"rank": 4, "province": "Riau", "regency": "Kilang Pertamina RU II Dumai & Sungai Pakning", "lat": 1.6667, "lng": 101.4333, "value": 170.0, "percentage_share": 16.0, "notes": "Kilang pengolah minyak berat Sumatera.", "color": "#fcd34d"}
                ]
            }
        },
        "COM-MINE-005-GAS-ALAM": {
            "PRODUKSI_TERBANYAK": {
                "variable_name": "Sentra Produksi Gas Alam & LNG Terbanyak (2024)",
                "unit": "Juta Standar Kaki Kubik/Hari (MMSCFD)",
                "source": "SKK Migas (Laporan Tahunan Kinerja Hulu Migas)",
                "points": [
                    {"rank": 1, "province": "Papua Barat", "regency": "Teluk Bintuni (Kilang Tangguh LNG Train 1, 2, 3)", "lat": -2.3500, "lng": 133.1500, "value": 1560.0, "percentage_share": 24.0, "notes": "Pusat pencairan gas alam cair (LNG) terbesar nasional yang dioperasikan bp Berau Ltd.", "color": "#059669"},
                    {"rank": 2, "province": "Sumatera Selatan", "regency": "Musi Banyuasin (Blok Corridor / Lapangan Grissik)", "lat": -2.6500, "lng": 103.9500, "value": 1365.0, "percentage_share": 21.0, "notes": "Pemasok gas pipa utama industri Jawa Barat, Sumatera, dan ekspor pipa Singapura (Medco E&P).", "color": "#10b981"},
                    {"rank": 3, "province": "Kalimantan Timur", "regency": "Bontang & Kutai Basin (Badak LNG & Mahakam)", "lat": 0.1333, "lng": 117.5000, "value": 1235.0, "percentage_share": 19.0, "notes": "Pusat kilang pencairan Badak LNG dan pemasok gas industri pupuk Kaltim.", "color": "#34d399"},
                    {"rank": 4, "province": "Kepulauan Riau", "regency": "Natuna Sea (Natuna Block B & Sea)", "lat": 4.1000, "lng": 108.3000, "value": 910.0, "percentage_share": 14.0, "notes": "Gas lepas pantai untuk jaringan pipa West Natuna Transportation System.", "color": "#6ee7b7"},
                    {"rank": 5, "province": "Sulawesi Tengah", "regency": "Banggai (Donggi Senoro LNG)", "lat": -1.4500, "lng": 122.5500, "value": 780.0, "percentage_share": 12.0, "notes": "Kilang DSLNG pengolah gas Blok Senoro-Toili dan Matindok.", "color": "#a7f3d0"},
                    {"rank": 6, "province": "Jawa Barat", "regency": "Offshore Northwest Java (ONWJ)", "lat": -5.9500, "lng": 107.5500, "value": 650.0, "percentage_share": 10.0, "notes": "Pasokan gas pipa pembangkit listrik Muara Karang & Tanjung Priok.", "color": "#d1fae5"}
                ]
            },
            "PNBP_APBN": {
                "variable_name": "Setoran PNBP SDA Gas Alam ke APBN (2024)",
                "unit": "Rp Miliar",
                "source": "LRA APBN Kemenkeu & LKPP Audited (Akun BAS 421112)",
                "points": [
                    {"rank": 1, "province": "Papua Barat", "regency": "Papua Barat (Teluk Bintuni)", "lat": -2.3500, "lng": 133.1500, "value": 21600.0, "percentage_share": 26.3, "notes": "Setoran PNBP SDA gas alam Tangguh LNG Train 1-3 dan DBH migas otsus Papua Barat.", "color": "#4f46e5"},
                    {"rank": 2, "province": "Sumatera Selatan", "regency": "Sumsel (Muba, Muara Enim)", "lat": -2.6500, "lng": 103.9500, "value": 18200.0, "percentage_share": 22.2, "notes": "PNBP gas pipa Blok Corridor dan DBH gas Sumsel.", "color": "#6366f1"},
                    {"rank": 3, "province": "Kalimantan Timur", "regency": "Kaltim (Bontang, Kukar)", "lat": 0.1333, "lng": 117.5000, "value": 16500.0, "percentage_share": 20.1, "notes": "Penerimaan negara gas alam Mahakam & Badak LNG.", "color": "#818cf8"},
                    {"rank": 4, "province": "Kepulauan Riau", "regency": "Kepri (Natuna)", "lat": 4.1000, "lng": 108.3000, "value": 11800.0, "percentage_share": 14.4, "notes": "PNBP gas pipa ekspor WNTS Natuna.", "color": "#a5b4fc"},
                    {"rank": 5, "province": "Sulawesi Tengah", "regency": "Sulteng (Banggai)", "lat": -1.4500, "lng": 122.5500, "value": 9400.0, "percentage_share": 11.5, "notes": "PNBP gas kilang Donggi Senoro LNG.", "color": "#c7d2fe"}
                ]
            },
            "TITIK_EKSPOR": {
                "variable_name": "Kilang Pencairan LNG & Terminal Pipa Ekspor Gas",
                "unit": "Juta Ton LNG / Tahun",
                "source": "SKK Migas & Kementerian ESDM",
                "points": [
                    {"rank": 1, "province": "Papua Barat", "regency": "Terminal Tangguh LNG (Teluk Bintuni)", "lat": -2.3600, "lng": 133.1600, "value": 11.4, "percentage_share": 45.6, "notes": "Terminal ekspor kargo LNG ke Tiongkok, Jepang, Korea Selatan, dan pasokan PLN.", "color": "#0284c7"},
                    {"rank": 2, "province": "Kalimantan Timur", "regency": "Kilang Badak LNG Bontang", "lat": 0.1000, "lng": 117.4830, "value": 11.0, "percentage_share": 44.0, "notes": "Kilang LNG legendaris pemasok kontrak jangka panjang Asia Pasifik.", "color": "#0ea5e9"},
                    {"rank": 3, "province": "Sulawesi Tengah", "regency": "Kilang Donggi Senoro LNG (Banggai)", "lat": -1.4600, "lng": 122.5600, "value": 2.1, "percentage_share": 8.4, "notes": "Ekspor kargo LNG rute Asia Timur (JERA, Kyushu Electric, KOGAS).", "color": "#38bdf8"}
                ]
            },
            "SMELTER_HILIR": {
                "variable_name": "Jaringan Pipa Transmisi & Konsumsi Industri Pupuk/Petrokimia",
                "unit": "MMSCFD",
                "source": "PT Perusahaan Gas Negara Tbk (PGN) & Pupuk Indonesia",
                "points": [
                    {"rank": 1, "province": "Sumatera Selatan / Riau / Batam", "regency": "Pipa Transmisi Grissik-Duri & Grissik-Batam-Singapura", "lat": -0.5000, "lng": 102.5000, "value": 1200.0, "percentage_share": 48.0, "notes": "Pipa transmisi gas bertekanan tinggi pemasok pembangkit listrik dan kawasan industri Batam.", "color": "#d97706"},
                    {"rank": 2, "province": "Kalimantan Timur", "regency": "Pabrik Pupuk Kaltim (Bontang)", "lat": 0.1667, "lng": 117.4833, "value": 350.0, "percentage_share": 14.0, "notes": "Konsumen gas domestik bahan baku pembuatan Urea & Amonia terbesar nasional.", "color": "#f59e0b"},
                    {"rank": 3, "province": "Jawa Timur", "regency": "Pipa Trans-Jawa Porong-Grati & Pupuk Petrokimia Gresik", "lat": -7.1500, "lng": 112.6500, "value": 280.0, "percentage_share": 11.2, "notes": "Jaringan gas bumi industri Jawa Timur.", "color": "#fbbf24"}
                ]
            }
        },
        "COM-AGRI-007-KAYU-PLYWOOD": {
            "PRODUKSI_TERBANYAK": {
                "variable_name": "Sentra Produksi Kayu Olahan Plywood & Lumber (2024)",
                "unit": "Juta M3",
                "source": "Kementerian Lingkungan Hidup dan Kehutanan (KLHK)",
                "points": [
                    {"rank": 1, "province": "Kalimantan Timur", "regency": "Samarinda, Kutai Kartanegara, Berau", "lat": -0.5000, "lng": 117.1500, "value": 1.47, "percentage_share": 32.0, "notes": "Sentra industri pengolahan kayu lapis (plywood) dan veneer bersertifikasi SVLK.", "color": "#059669"},
                    {"rank": 2, "province": "Kalimantan Barat", "regency": "Pontianak, Ketapang, Kubu Raya", "lat": -0.0200, "lng": 109.3400, "value": 1.10, "percentage_share": 24.0, "notes": "Industri kayu olahan dari Hutan Tanaman Industri (HTI) berkelanjutan.", "color": "#10b981"},
                    {"rank": 3, "province": "Papua & Papua Barat", "regency": "Sorong, Jayapura, Manokwari", "lat": -0.8833, "lng": 131.2500, "value": 0.92, "percentage_share": 20.0, "notes": "Hasil kayu rimba bersertifikat legalitas kayu nasional.", "color": "#34d399"},
                    {"rank": 4, "province": "Riau & Sumatera Utara", "regency": "Siak, Pelalawan, Medan", "lat": 0.8000, "lng": 101.8000, "value": 0.69, "percentage_share": 15.0, "notes": "Industri kayu lapis dan pulp & paper terpadu.", "color": "#6ee7b7"},
                    {"rank": 5, "province": "Jawa Tengah", "regency": "Kendal, Jepara, Semarang", "lat": -6.9167, "lng": 110.2000, "value": 0.42, "percentage_share": 9.0, "notes": "Sentra hilirisasi kayu mebel, furnitur ukir, dan plywood laminasi.", "color": "#a7f3d0"}
                ]
            },
            "PNBP_APBN": {
                "variable_name": "Setoran PNBP Kehutanan (Dana Reboisasi & PSDH) (2024)",
                "unit": "Rp Miliar",
                "source": "LRA APBN Kemenkeu & LKPP Audited (Akun BAS 421311 & 421312)",
                "points": [
                    {"rank": 1, "province": "Kalimantan Timur", "regency": "Kaltim", "lat": -0.5000, "lng": 117.1500, "value": 1850.0, "percentage_share": 34.0, "notes": "Setoran PNBP Dana Reboisasi (DR) dan Provisi Sumber Daya Hutan (PSDH).", "color": "#4f46e5"},
                    {"rank": 2, "province": "Kalimantan Barat", "regency": "Kalbar", "lat": -0.0200, "lng": 109.3400, "value": 1320.0, "percentage_share": 24.2, "notes": "PNBP hasil hutan bukan kayu dan hasil hutan kayu alam/HTI.", "color": "#6366f1"},
                    {"rank": 3, "province": "Papua", "regency": "Papua & Papua Barat", "lat": -0.8833, "lng": 131.2500, "value": 1150.0, "percentage_share": 21.1, "notes": "Setoran DR & PSDH wilayah Indonesia Timur.", "color": "#818cf8"},
                    {"rank": 4, "province": "Riau", "regency": "Riau", "lat": 0.8000, "lng": 101.8000, "value": 780.0, "percentage_share": 14.3, "notes": "PSDH pemanfaatan kayu HTI industri akasia/eukaliptus.", "color": "#a5b4fc"}
                ]
            },
            "TITIK_EKSPOR": {
                "variable_name": "Pelabuhan Pengapalan Ekspor Kayu Lapis",
                "unit": "Juta M3 / Tahun",
                "source": "Asosiasi Panel Kayu Indonesia (APKINDO) & Kemendag",
                "points": [
                    {"rank": 1, "province": "Kalimantan Timur", "regency": "Pelabuhan Palaran Samarinda & Balikpapan", "lat": -0.5100, "lng": 117.1600, "value": 1.20, "percentage_share": 44.4, "notes": "Ekspor plywood dan fancy wood ke Jepang, Korea, dan Timur Tengah.", "color": "#0284c7"},
                    {"rank": 2, "province": "Kalimantan Barat", "regency": "Pelabuhan Dwikora & Kijing Port (Mempawah)", "lat": -0.0300, "lng": 109.3300, "value": 0.85, "percentage_share": 31.5, "notes": "Pengapalan kayu olahan Kalbar.", "color": "#0ea5e9"},
                    {"rank": 3, "province": "Jawa Tengah / Jatim", "regency": "Pelabuhan Tanjung Emas Semarang & Tanjung Perak", "lat": -6.9500, "lng": 110.4200, "value": 0.45, "percentage_share": 16.7, "notes": "Ekspor produk furnitur kayu olahan ke Uni Eropa dan Amerika Serikat.", "color": "#38bdf8"}
                ]
            },
            "SMELTER_HILIR": {
                "variable_name": "Kawasan Industri Pengolahan Kayu & Plywood Terpadu",
                "unit": "Kapasitas Olah (Ribu M3/Thn)",
                "source": "Kementerian Perindustrian & KLHK",
                "points": [
                    {"rank": 1, "province": "Kalimantan Timur", "regency": "Sentra Industri Kayu Lapis Sungai Mahakam (Samarinda)", "lat": -0.5333, "lng": 117.1833, "value": 1200.0, "percentage_share": 48.0, "notes": "18 pabrik plywood besar terintegrasi log pond Mahakam.", "color": "#d97706"},
                    {"rank": 2, "province": "Kalimantan Barat", "regency": "Kawasan Industri Siantan & Jungkat (Pontianak)", "lat": -0.0500, "lng": 109.3500, "value": 850.0, "percentage_share": 34.0, "notes": "Pabrik blockboard, barecore, dan film-faced plywood.", "color": "#f59e0b"},
                    {"rank": 3, "province": "Jawa Tengah", "regency": "Kawasan Industri Kendal & Jepara Furnitur", "lat": -6.9167, "lng": 110.2000, "value": 450.0, "percentage_share": 18.0, "notes": "Hilirisasi produk kayu bernilai tambah tinggi.", "color": "#fbbf24"}
                ]
            }
        },
        "COM-FISH-003-RUMPUT-LAUT": {
            "PRODUKSI_TERBANYAK": {
                "variable_name": "Sentra Produksi Rumput Laut Terbanyak (2024)",
                "unit": "Ribu Ton Basah",
                "source": "Kementerian Kelautan dan Perikanan (KKP - Ditjen Perikanan Budidaya)",
                "points": [
                    {"rank": 1, "province": "Sulawesi Selatan", "regency": "Takalar, Jeneponto, Bone, Bantaeng", "lat": -5.4167, "lng": 119.5833, "value": 3680.0, "percentage_share": 38.0, "notes": "Sentra budidaya Eucheuma cottonii dan Gracilaria terbesar nasional di pesisir Selat Makassar & Teluk Bone.", "color": "#059669"},
                    {"rank": 2, "province": "Nusa Tenggara Timur", "regency": "Sumba Timur, Rote Ndao, Kupang", "lat": -9.6500, "lng": 120.2667, "value": 2130.0, "percentage_share": 22.0, "notes": "Kawasan budidaya rumput laut perairan jernih bernilai karagenan tinggi.", "color": "#10b981"},
                    {"rank": 3, "province": "Kalimantan Utara", "regency": "Nunukan (Pulau Nunukan & Sebatik), Tarakan", "lat": 4.1333, "lng": 117.6500, "value": 1745.0, "percentage_share": 18.0, "notes": "Sentra budidaya bentang tali tambak & laut lepas perbatasan RI-Malaysia.", "color": "#34d399"},
                    {"rank": 4, "province": "Nusa Tenggara Barat", "regency": "Sumbawa (Teluk Saleh), Lombok Timur", "lat": -8.5000, "lng": 117.4167, "value": 1160.0, "percentage_share": 12.0, "notes": "Sentra budidaya rumput laut kualitas ekspor.", "color": "#6ee7b7"},
                    {"rank": 5, "province": "Maluku & Papua Barat", "regency": "Tual, Maluku Tenggara, Kaimana", "lat": -5.6333, "lng": 132.7500, "value": 970.0, "percentage_share": 10.0, "notes": "Kawasan konservasi budidaya laut timur Indonesia.", "color": "#a7f3d0"}
                ]
            },
            "PNBP_APBN": {
                "variable_name": "Setoran PNBP Perikanan Budidaya Rumput Laut (2024)",
                "unit": "Rp Miliar",
                "source": "LRA APBN Kemenkeu & LKPP Audited (Akun BAS 421412)",
                "points": [
                    {"rank": 1, "province": "Sulawesi Selatan", "regency": "Sulsel", "lat": -5.4167, "lng": 119.5833, "value": 340.0, "percentage_share": 41.0, "notes": "PNBP hasil usaha pemanfaatan ruang laut budidaya KKP.", "color": "#4f46e5"},
                    {"rank": 2, "province": "Nusa Tenggara Timur", "regency": "NTT", "lat": -9.6500, "lng": 120.2667, "value": 195.0, "percentage_share": 23.5, "notes": "Penerimaan PNBP perizinan pemanfaatan pesisir.", "color": "#6366f1"},
                    {"rank": 3, "province": "Kalimantan Utara", "regency": "Kaltara", "lat": 4.1333, "lng": 117.6500, "value": 150.0, "percentage_share": 18.1, "notes": "PNBP pengujian mutu dan sertifikasi hasil perikanan.", "color": "#818cf8"},
                    {"rank": 4, "province": "Nusa Tenggara Barat", "regency": "NTB", "lat": -8.5000, "lng": 117.4167, "value": 95.0, "percentage_share": 11.4, "notes": "PNBP laboratorium perikanan budidaya NTB.", "color": "#a5b4fc"}
                ]
            },
            "TITIK_EKSPOR": {
                "variable_name": "Pelabuhan Hub Pengapalan Ekspor Rumput Laut Kering",
                "unit": "Ribu Ton / Tahun",
                "source": "Asosiasi Rumput Laut Indonesia (ARLI) & KKP",
                "points": [
                    {"rank": 1, "province": "Sulawesi Selatan", "regency": "Pelabuhan Soekarno-Hatta Makassar", "lat": -5.1200, "lng": 119.4100, "value": 150.0, "percentage_share": 65.2, "notes": "Hub konsolidasi ekspor rumput laut kering terbesar ke Tiongkok, Vietnam, dan Cile.", "color": "#0284c7"},
                    {"rank": 2, "province": "Nusa Tenggara Timur", "regency": "Pelabuhan Tenau Kupang", "lat": -10.1800, "lng": 123.5500, "value": 45.0, "percentage_share": 19.6, "notes": "Pengapalan kontainer ekspor rumput laut NTT.", "color": "#0ea5e9"},
                    {"rank": 3, "province": "Kalimantan Utara", "regency": "Pelabuhan Tunon Taka Nunukan", "lat": 4.1400, "lng": 117.6600, "value": 35.0, "percentage_share": 15.2, "notes": "Ekspor perbatasan dan perdagangan antar-pulau rute Surabaya.", "color": "#38bdf8"}
                ]
            },
            "SMELTER_HILIR": {
                "variable_name": "Pabrik Pengolahan Karagenan / Agar-Agar (Hilirisasi Rumput Laut)",
                "unit": "Kapasitas Produksi (Ribu Ton ATC/Thn)",
                "source": "Kementerian Perindustrian & KKP",
                "points": [
                    {"rank": 1, "province": "Sulawesi Selatan", "regency": "Pabrik Karagenan Makassar & Maros", "lat": -5.0000, "lng": 119.5330, "value": 120.0, "percentage_share": 57.1, "notes": "Pabrik pengolahan Alkali Treated Cottonii (ATC) dan Refined Carrageenan bahan pengental makanan & kosmetik.", "color": "#d97706"},
                    {"rank": 2, "province": "Jawa Timur", "regency": "Industri Pengolahan Agar & Karagenan Pasuruan/Surabaya", "lat": -7.6500, "lng": 112.9000, "value": 65.0, "percentage_share": 31.0, "notes": "Pengolahan bahan baku makanan dan kapsul farmasi.", "color": "#f59e0b"},
                    {"rank": 3, "province": "Kalimantan Utara", "regency": "Sentra Pengolahan Semi-Refined Carrageenan (SRC) Tarakan", "lat": 3.3000, "lng": 117.6000, "value": 25.0, "percentage_share": 11.9, "notes": "Sentra hilirisasi perikanan perbatasan.", "color": "#fbbf24"}
                ]
            }
        },
        "COM-MINE-006-PANAS-BUMI": {
            "PRODUKSI_TERBANYAK": {
                "variable_name": "Sentra Produksi Listrik Geothermal / PLTP Terbanyak (2024)",
                "unit": "Gigawatt Hour (GWh)",
                "source": "Kementerian ESDM (Ditjen EBTKE - Energi Baru Terbarukan)",
                "points": [
                    {"rank": 1, "province": "Jawa Barat", "regency": "Wayang Windu, Kamojang, Gunung Salak, Drajat", "lat": -7.1667, "lng": 107.6333, "value": 8420.0, "percentage_share": 52.0, "notes": "Pusat pembangkit listrik tenaga panas bumi terbesar nasional (Star Energy Geothermal & PT Pertamina Geothermal Energy).", "color": "#059669"},
                    {"rank": 2, "province": "Lampung", "regency": "WKP Ulubelu (Tanggamus)", "lat": -5.3000, "lng": 104.5833, "value": 2260.0, "percentage_share": 14.0, "notes": "Penyuplai 25% kebutuhan listrik sistem interkoneksi Sumatera Bagian Selatan.", "color": "#10b981"},
                    {"rank": 3, "province": "Sumatera Utara", "regency": "WKP Sarulla (Tapanuli Utara)", "lat": 1.9500, "lng": 99.1167, "value": 2100.0, "percentage_share": 13.0, "notes": "PLTP single-contract terbesar di dunia yang dikelola konsorsium Sarulla Operations Ltd.", "color": "#34d399"},
                    {"rank": 4, "province": "Sulawesi Utara", "regency": "WKP Lahendong & Tompaso (Minahasa)", "lat": 1.3000, "lng": 124.8333, "value": 1460.0, "percentage_share": 9.0, "notes": "Tulang punggung listrik EBT sistem Minahasa-Kotamobagu.", "color": "#6ee7b7"},
                    {"rank": 5, "province": "Sumatera Barat", "regency": "WKP Muara Laboh (Solok Selatan)", "lat": -1.5000, "lng": 101.2000, "value": 1130.0, "percentage_share": 7.0, "notes": "Pembangkit geothermal Supreme Energy Muara Laboh.", "color": "#a7f3d0"},
                    {"rank": 6, "province": "Nusa Tenggara Timur", "regency": "WKP Ulumbu (Manggarai) & Mataloko (Ngada)", "lat": -8.6500, "lng": 120.4500, "value": 810.0, "percentage_share": 5.0, "notes": "Pengembangan Flores Geothermal Island menuju 100% energi bersih.", "color": "#d1fae5"}
                ]
            },
            "PNBP_APBN": {
                "variable_name": "Setoran PNBP Panas Bumi Kementerian ESDM (2024)",
                "unit": "Rp Miliar",
                "source": "LRA APBN Kemenkeu & LKPP Audited (Akun BAS 421213)",
                "points": [
                    {"rank": 1, "province": "Jawa Barat", "regency": "Jabar (Bandung, Garut, Sukabumi)", "lat": -7.1667, "lng": 107.6333, "value": 1420.0, "percentage_share": 53.4, "notes": "Setoran PNBP royalti dan bonus produksi panas bumi Jabar.", "color": "#4f46e5"},
                    {"rank": 2, "province": "Lampung", "regency": "Lampung (Tanggamus)", "lat": -5.3000, "lng": 104.5833, "value": 380.0, "percentage_share": 14.3, "notes": "PNBP royalti WKP Ulubelu PGE.", "color": "#6366f1"},
                    {"rank": 3, "province": "Sumatera Utara", "regency": "Sumut (Tapanuli Utara)", "lat": 1.9500, "lng": 99.1167, "value": 350.0, "percentage_share": 13.2, "notes": "PNBP royalti Sarulla Operations.", "color": "#818cf8"},
                    {"rank": 4, "province": "Sulawesi Utara", "regency": "Sulut (Minahasa)", "lat": 1.3000, "lng": 124.8333, "value": 245.0, "percentage_share": 9.2, "notes": "PNBP panas bumi Lahendong PGE.", "color": "#a5b4fc"},
                    {"rank": 5, "province": "Sumatera Barat", "regency": "Sumbar (Solok Selatan)", "lat": -1.5000, "lng": 101.2000, "value": 185.0, "percentage_share": 7.0, "notes": "PNBP royalti Muara Laboh.", "color": "#c7d2fe"}
                ]
            },
            "TITIK_EKSPOR": {
                "variable_name": "Jaringan Transmisi Interkoneksi Listrik (Grid Nasional)",
                "unit": "Kapasitas Penyaluran (MW)",
                "source": "PT PLN (Persero) Pusat Pengatur Beban",
                "points": [
                    {"rank": 1, "province": "Jawa Barat", "regency": "Gardu Induk Tegangan Ekstra Tinggi (GITET) Saguling / Mandirancan", "lat": -6.9000, "lng": 107.4500, "value": 1200.0, "percentage_share": 52.2, "notes": "Evakuasi daya listrik panas bumi ke Grid Transmisi 500 kV Jawa-Madura-Bali.", "color": "#0284c7"},
                    {"rank": 2, "province": "Sumatera Bagian Selatan", "regency": "Transmisi Tol Listrik Sumatera 275 kV (Ulubelu-Muara Enim)", "lat": -4.5000, "lng": 104.2000, "value": 600.0, "percentage_share": 26.1, "notes": "Penyaluran energi bersih panas bumi di pulau Sumatera.", "color": "#0ea5e9"},
                    {"rank": 3, "province": "Sumatera Utara", "regency": "Transmisi 150 kV Sarulla - Simangkuk", "lat": 2.0000, "lng": 99.1500, "value": 330.0, "percentage_share": 14.3, "notes": "Penyuplai beban listrik Sumatera Bagian Utara.", "color": "#38bdf8"}
                ]
            },
            "SMELTER_HILIR": {
                "variable_name": "Pusat Pembangkit Listrik Tenaga Panas Bumi (PLTP)",
                "unit": "Kapasitas Terpasang (Megawatt / MW)",
                "source": "Ditjen EBTKE Kementerian ESDM",
                "points": [
                    {"rank": 1, "province": "Jawa Barat", "regency": "PLTP Wayang Windu & Kamojang (Pangalengan & Garut)", "lat": -7.1833, "lng": 107.6500, "value": 462.0, "percentage_share": 33.7, "notes": "Kompleks PLTP pertama Indonesia beroperasi sejak 1982 dengan keandalan operasi tertinggi.", "color": "#d97706"},
                    {"rank": 2, "province": "Sumatera Utara", "regency": "PLTP Sarulla Unit 1, 2, 3 (Pahae Jae)", "lat": 1.9667, "lng": 99.1333, "value": 330.0, "percentage_share": 24.1, "notes": "Salah satu PLTP tercanggih dunia yang menggunakan sistem siklus biner gabungan.", "color": "#f59e0b"},
                    {"rank": 3, "province": "Jawa Barat", "regency": "PLTP Salak & Gunung Drajat (Sukabumi & Garut)", "lat": -6.7167, "lng": 106.6500, "value": 647.0, "percentage_share": 47.2, "notes": "Pembangkit geothermal swasta terbesar Star Energy.", "color": "#fbbf24"}
                ]
            }
        }
    }

    @classmethod
    def get_spatial_distribution(cls, commodity_id: str, variable_type: str = "PRODUKSI_TERBANYAK") -> Optional[Dict[str, Any]]:
        """
        Returns regional spatial distribution data (points, rankings, coordinates, and notes) for GeoMap visualization.
        """
        comm_entry = next((c for c in cls.COMMODITIES if c["id"] == commodity_id), None)
        if not comm_entry:
            return None

        commodity_spatial = cls.SPATIAL_REGISTRY.get(commodity_id)
        if not commodity_spatial:
            # Fallback default spatial structure
            return {
                "commodity_id": commodity_id,
                "commodity_name": comm_entry["name"],
                "unit": comm_entry["unit"],
                "active_variable": variable_type,
                "variable_name": f"Sebaran Spasial: {comm_entry['name']}",
                "source": comm_entry["source_institution"],
                "points": []
            }

        var_data = commodity_spatial.get(variable_type) or commodity_spatial.get("PRODUKSI_TERBANYAK")
        return {
            "commodity_id": commodity_id,
            "commodity_name": comm_entry["name"],
            "unit": var_data.get("unit", comm_entry["unit"]),
            "active_variable": variable_type,
            "variable_name": var_data.get("variable_name", ""),
            "source": var_data.get("source", comm_entry["source_institution"]),
            "points": var_data.get("points", []),
            "available_variables": [
                {"id": "PRODUKSI_TERBANYAK", "label": "🏭 1. Sentra Produksi Terbanyak"},
                {"id": "PNBP_APBN", "label": "🏛️ 2. Setoran PNBP SDA APBN"},
                {"id": "TITIK_EKSPOR", "label": "🚢 3. Pelabuhan / Terminal Ekspor"},
                {"id": "SMELTER_HILIR", "label": "⚡ 4. Smelter & Fasilitas Hilir"}
            ]
        }

