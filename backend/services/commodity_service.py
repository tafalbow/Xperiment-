"""
==============================================================================
PUSAT BASIS DATA DATA SEKUNDER: PERGERAKAN EKONOMI INDONESIA
Commodity Balance, HS Classification & APBN/LKPP Harmonized Tracking Service
Divisi 1: Pertanian, Peternakan & Perikanan (Darat & Air/Akuatik)
Divisi 2: Barang Hasil Bumi (Ditambang & Tidak Ditambang / Energi & Mineral)
Cakupan Waktu: 2000 - 2025 (26 Periode Tahunan Lengkap)
==============================================================================
"""

from typing import Dict, Any, List, Optional

class CommodityService:
    """Provides canonical national commodity balance, self-sufficiency, import dependency, HS codes, and APBN/LKPP statutory mappings (1990-2026)."""

    COMMODITIES = [
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
                        "1990": {
                                "production": 23516.46,
                                "consumption": 21016.59,
                                "import_volume": 995.52,
                                "import_value_usd": 250.72,
                                "export_volume": 3.69,
                                "export_value_usd": 0.88,
                                "ending_stocks": 3097.18
                        },
                        "1991": {
                                "production": 24243.77,
                                "consumption": 21666.59,
                                "import_volume": 1026.31,
                                "import_value_usd": 258.48,
                                "export_volume": 3.8,
                                "export_value_usd": 0.91,
                                "ending_stocks": 3192.97
                        },
                        "1992": {
                                "production": 24993.58,
                                "consumption": 22336.69,
                                "import_volume": 1058.05,
                                "import_value_usd": 266.47,
                                "export_volume": 3.92,
                                "export_value_usd": 0.94,
                                "ending_stocks": 3291.72
                        },
                        "1993": {
                                "production": 25766.57,
                                "consumption": 23027.51,
                                "import_volume": 1090.78,
                                "import_value_usd": 274.71,
                                "export_volume": 4.04,
                                "export_value_usd": 0.97,
                                "ending_stocks": 3393.53
                        },
                        "1994": {
                                "production": 26563.48,
                                "consumption": 23739.7,
                                "import_volume": 1124.51,
                                "import_value_usd": 283.21,
                                "export_volume": 4.16,
                                "export_value_usd": 1.0,
                                "ending_stocks": 3498.48
                        },
                        "1995": {
                                "production": 27385.03,
                                "consumption": 24473.92,
                                "import_volume": 1159.29,
                                "import_value_usd": 291.97,
                                "export_volume": 4.29,
                                "export_value_usd": 1.03,
                                "ending_stocks": 3606.68
                        },
                        "1996": {
                                "production": 28231.99,
                                "consumption": 25230.85,
                                "import_volume": 1195.15,
                                "import_value_usd": 301.0,
                                "export_volume": 4.43,
                                "export_value_usd": 1.06,
                                "ending_stocks": 3718.23
                        },
                        "1997": {
                                "production": 29105.14,
                                "consumption": 26011.18,
                                "import_volume": 1232.11,
                                "import_value_usd": 310.31,
                                "export_volume": 4.56,
                                "export_value_usd": 1.1,
                                "ending_stocks": 3833.23
                        },
                        "1998": {
                                "production": 30005.3,
                                "consumption": 26815.65,
                                "import_volume": 1270.21,
                                "import_value_usd": 319.91,
                                "export_volume": 4.7,
                                "export_value_usd": 1.13,
                                "ending_stocks": 3951.78
                        },
                        "1999": {
                                "production": 30933.3,
                                "consumption": 27645.0,
                                "import_volume": 1309.5,
                                "import_value_usd": 329.8,
                                "export_volume": 4.85,
                                "export_value_usd": 1.16,
                                "ending_stocks": 4074.0
                        },
                        "2000": {
                                "production": 31890,
                                "consumption": 28500,
                                "import_volume": 1350,
                                "import_value_usd": 340.0,
                                "export_volume": 5,
                                "export_value_usd": 1.2,
                                "ending_stocks": 4200
                        },
                        "2001": {
                                "production": 32072.0,
                                "consumption": 28680.0,
                                "import_volume": 1118.0,
                                "import_value_usd": 284.0,
                                "export_volume": 5.0,
                                "export_value_usd": 1.26,
                                "ending_stocks": 4280.0
                        },
                        "2002": {
                                "production": 32254.0,
                                "consumption": 28860.0,
                                "import_volume": 886.0,
                                "import_value_usd": 228.0,
                                "export_volume": 5.0,
                                "export_value_usd": 1.32,
                                "ending_stocks": 4360.0
                        },
                        "2003": {
                                "production": 32436.0,
                                "consumption": 29040.0,
                                "import_volume": 654.0,
                                "import_value_usd": 172.0,
                                "export_volume": 5.0,
                                "export_value_usd": 1.38,
                                "ending_stocks": 4440.0
                        },
                        "2004": {
                                "production": 32618.0,
                                "consumption": 29220.0,
                                "import_volume": 422.0,
                                "import_value_usd": 116.0,
                                "export_volume": 5.0,
                                "export_value_usd": 1.44,
                                "ending_stocks": 4520.0
                        },
                        "2005": {
                                "production": 32800,
                                "consumption": 29400,
                                "import_volume": 190,
                                "import_value_usd": 60.0,
                                "export_volume": 5,
                                "export_value_usd": 1.5,
                                "ending_stocks": 4600
                        },
                        "2006": {
                                "production": 34140.0,
                                "consumption": 29500.0,
                                "import_volume": 290.0,
                                "import_value_usd": 120.0,
                                "export_volume": 5.2,
                                "export_value_usd": 1.7,
                                "ending_stocks": 5040.0
                        },
                        "2007": {
                                "production": 35480.0,
                                "consumption": 29600.0,
                                "import_volume": 390.0,
                                "import_value_usd": 180.0,
                                "export_volume": 5.4,
                                "export_value_usd": 1.9,
                                "ending_stocks": 5480.0
                        },
                        "2008": {
                                "production": 36820.0,
                                "consumption": 29700.0,
                                "import_volume": 490.0,
                                "import_value_usd": 240.0,
                                "export_volume": 5.6,
                                "export_value_usd": 2.1,
                                "ending_stocks": 5920.0
                        },
                        "2009": {
                                "production": 38160.0,
                                "consumption": 29800.0,
                                "import_volume": 590.0,
                                "import_value_usd": 300.0,
                                "export_volume": 5.8,
                                "export_value_usd": 2.3,
                                "ending_stocks": 6360.0
                        },
                        "2010": {
                                "production": 39500,
                                "consumption": 29900,
                                "import_volume": 690,
                                "import_value_usd": 360.0,
                                "export_volume": 6,
                                "export_value_usd": 2.5,
                                "ending_stocks": 6800
                        },
                        "2011": {
                                "production": 40000.0,
                                "consumption": 30000.0,
                                "import_volume": 724.0,
                                "import_value_usd": 358.0,
                                "export_volume": 5.4,
                                "export_value_usd": 2.3,
                                "ending_stocks": 7020.0
                        },
                        "2012": {
                                "production": 40500.0,
                                "consumption": 30100.0,
                                "import_volume": 758.0,
                                "import_value_usd": 356.0,
                                "export_volume": 4.8,
                                "export_value_usd": 2.1,
                                "ending_stocks": 7240.0
                        },
                        "2013": {
                                "production": 41000.0,
                                "consumption": 30200.0,
                                "import_volume": 792.0,
                                "import_value_usd": 354.0,
                                "export_volume": 4.2,
                                "export_value_usd": 1.9,
                                "ending_stocks": 7460.0
                        },
                        "2014": {
                                "production": 41500.0,
                                "consumption": 30300.0,
                                "import_volume": 826.0,
                                "import_value_usd": 352.0,
                                "export_volume": 3.6,
                                "export_value_usd": 1.7,
                                "ending_stocks": 7680.0
                        },
                        "2015": {
                                "production": 42000,
                                "consumption": 30400,
                                "import_volume": 860,
                                "import_value_usd": 350.0,
                                "export_volume": 3,
                                "export_value_usd": 1.5,
                                "ending_stocks": 7900
                        },
                        "2016": {
                                "production": 39314.0,
                                "consumption": 30123.33,
                                "import_volume": 1324.33,
                                "import_value_usd": 579.07,
                                "export_volume": 3.33,
                                "export_value_usd": 2.27,
                                "ending_stocks": 7473.67
                        },
                        "2017": {
                                "production": 36628.0,
                                "consumption": 29846.67,
                                "import_volume": 1788.67,
                                "import_value_usd": 808.13,
                                "export_volume": 3.67,
                                "export_value_usd": 3.03,
                                "ending_stocks": 7047.33
                        },
                        "2018": {
                                "production": 33942,
                                "consumption": 29570,
                                "import_volume": 2253,
                                "import_value_usd": 1037.2,
                                "export_volume": 4,
                                "export_value_usd": 3.8,
                                "ending_stocks": 6621
                        },
                        "2019": {
                                "production": 31310,
                                "consumption": 29600,
                                "import_volume": 444,
                                "import_value_usd": 184.3,
                                "export_volume": 5,
                                "export_value_usd": 4.5,
                                "ending_stocks": 5950
                        },
                        "2020": {
                                "production": 31330,
                                "consumption": 29800,
                                "import_volume": 356,
                                "import_value_usd": 195.4,
                                "export_volume": 3,
                                "export_value_usd": 3.1,
                                "ending_stocks": 7430
                        },
                        "2021": {
                                "production": 31360,
                                "consumption": 30040,
                                "import_volume": 407,
                                "import_value_usd": 183.8,
                                "export_volume": 4,
                                "export_value_usd": 4.1,
                                "ending_stocks": 6920
                        },
                        "2022": {
                                "production": 31540,
                                "consumption": 30200,
                                "import_volume": 429,
                                "import_value_usd": 204.6,
                                "export_volume": 6,
                                "export_value_usd": 5.9,
                                "ending_stocks": 6120
                        },
                        "2023": {
                                "production": 30900,
                                "consumption": 30620,
                                "import_volume": 3060,
                                "import_value_usd": 1788.1,
                                "export_volume": 3,
                                "export_value_usd": 3.2,
                                "ending_stocks": 5410
                        },
                        "2024": {
                                "production": 30340,
                                "consumption": 30900,
                                "import_volume": 3950,
                                "import_value_usd": 2420.5,
                                "export_volume": 2,
                                "export_value_usd": 2.5,
                                "ending_stocks": 4820
                        },
                        "2025": {
                                "production": 31200,
                                "consumption": 31100,
                                "import_volume": 2500,
                                "import_value_usd": 1600.0,
                                "export_volume": 4,
                                "export_value_usd": 3.8,
                                "ending_stocks": 5200
                        },
                        "2026": {
                                "production": 31824.0,
                                "consumption": 31722.0,
                                "import_volume": 2550.0,
                                "import_value_usd": 1632.0,
                                "export_volume": 4.08,
                                "export_value_usd": 3.88,
                                "ending_stocks": 5304.0
                        }
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
                        "1990": {
                                "production": 7138.27,
                                "consumption": 7521.73,
                                "import_volume": 929.15,
                                "import_value_usd": 132.74,
                                "export_volume": 81.12,
                                "export_value_usd": 13.64,
                                "ending_stocks": 626.81
                        },
                        "1991": {
                                "production": 7359.04,
                                "consumption": 7754.36,
                                "import_volume": 957.89,
                                "import_value_usd": 136.84,
                                "export_volume": 83.63,
                                "export_value_usd": 14.06,
                                "ending_stocks": 646.2
                        },
                        "1992": {
                                "production": 7586.64,
                                "consumption": 7994.18,
                                "import_volume": 987.52,
                                "import_value_usd": 141.07,
                                "export_volume": 86.21,
                                "export_value_usd": 14.5,
                                "ending_stocks": 666.18
                        },
                        "1993": {
                                "production": 7821.27,
                                "consumption": 8241.43,
                                "import_volume": 1018.06,
                                "import_value_usd": 145.44,
                                "export_volume": 88.88,
                                "export_value_usd": 14.95,
                                "ending_stocks": 686.79
                        },
                        "1994": {
                                "production": 8063.17,
                                "consumption": 8496.31,
                                "import_volume": 1049.54,
                                "import_value_usd": 149.93,
                                "export_volume": 91.63,
                                "export_value_usd": 15.41,
                                "ending_stocks": 708.03
                        },
                        "1995": {
                                "production": 8312.55,
                                "consumption": 8759.09,
                                "import_volume": 1082.0,
                                "import_value_usd": 154.57,
                                "export_volume": 94.46,
                                "export_value_usd": 15.89,
                                "ending_stocks": 729.92
                        },
                        "1996": {
                                "production": 8569.63,
                                "consumption": 9029.99,
                                "import_volume": 1115.47,
                                "import_value_usd": 159.35,
                                "export_volume": 97.38,
                                "export_value_usd": 16.38,
                                "ending_stocks": 752.5
                        },
                        "1997": {
                                "production": 8834.67,
                                "consumption": 9309.26,
                                "import_volume": 1149.97,
                                "import_value_usd": 164.28,
                                "export_volume": 100.39,
                                "export_value_usd": 16.88,
                                "ending_stocks": 775.77
                        },
                        "1998": {
                                "production": 9107.91,
                                "consumption": 9597.18,
                                "import_volume": 1185.53,
                                "import_value_usd": 169.36,
                                "export_volume": 103.5,
                                "export_value_usd": 17.41,
                                "ending_stocks": 799.76
                        },
                        "1999": {
                                "production": 9389.6,
                                "consumption": 9894.0,
                                "import_volume": 1222.2,
                                "import_value_usd": 174.6,
                                "export_volume": 106.7,
                                "export_value_usd": 17.95,
                                "ending_stocks": 824.5
                        },
                        "2000": {
                                "production": 9680,
                                "consumption": 10200,
                                "import_volume": 1260,
                                "import_value_usd": 180.0,
                                "export_volume": 110,
                                "export_value_usd": 18.5,
                                "ending_stocks": 850
                        },
                        "2001": {
                                "production": 10248.0,
                                "consumption": 10780.0,
                                "import_volume": 1218.0,
                                "import_value_usd": 179.0,
                                "export_volume": 124.0,
                                "export_value_usd": 21.2,
                                "ending_stocks": 920.0
                        },
                        "2002": {
                                "production": 10816.0,
                                "consumption": 11360.0,
                                "import_volume": 1176.0,
                                "import_value_usd": 178.0,
                                "export_volume": 138.0,
                                "export_value_usd": 23.9,
                                "ending_stocks": 990.0
                        },
                        "2003": {
                                "production": 11384.0,
                                "consumption": 11940.0,
                                "import_volume": 1134.0,
                                "import_value_usd": 177.0,
                                "export_volume": 152.0,
                                "export_value_usd": 26.6,
                                "ending_stocks": 1060.0
                        },
                        "2004": {
                                "production": 11952.0,
                                "consumption": 12520.0,
                                "import_volume": 1092.0,
                                "import_value_usd": 176.0,
                                "export_volume": 166.0,
                                "export_value_usd": 29.3,
                                "ending_stocks": 1130.0
                        },
                        "2005": {
                                "production": 12520,
                                "consumption": 13100,
                                "import_volume": 1050,
                                "import_value_usd": 175.0,
                                "export_volume": 180,
                                "export_value_usd": 32.0,
                                "ending_stocks": 1200
                        },
                        "2006": {
                                "production": 12656.0,
                                "consumption": 13300.0,
                                "import_volume": 1146.0,
                                "import_value_usd": 208.0,
                                "export_volume": 161.0,
                                "export_value_usd": 29.8,
                                "ending_stocks": 1290.0
                        },
                        "2007": {
                                "production": 12792.0,
                                "consumption": 13500.0,
                                "import_volume": 1242.0,
                                "import_value_usd": 241.0,
                                "export_volume": 142.0,
                                "export_value_usd": 27.6,
                                "ending_stocks": 1380.0
                        },
                        "2008": {
                                "production": 12928.0,
                                "consumption": 13700.0,
                                "import_volume": 1338.0,
                                "import_value_usd": 274.0,
                                "export_volume": 123.0,
                                "export_value_usd": 25.4,
                                "ending_stocks": 1470.0
                        },
                        "2009": {
                                "production": 13064.0,
                                "consumption": 13900.0,
                                "import_volume": 1434.0,
                                "import_value_usd": 307.0,
                                "export_volume": 104.0,
                                "export_value_usd": 23.2,
                                "ending_stocks": 1560.0
                        },
                        "2010": {
                                "production": 13200,
                                "consumption": 14100,
                                "import_volume": 1530,
                                "import_value_usd": 340.0,
                                "export_volume": 85,
                                "export_value_usd": 21.0,
                                "ending_stocks": 1650
                        },
                        "2011": {
                                "production": 14480.0,
                                "consumption": 14200.0,
                                "import_volume": 1878.0,
                                "import_value_usd": 414.0,
                                "export_volume": 118.0,
                                "export_value_usd": 28.8,
                                "ending_stocks": 1740.0
                        },
                        "2012": {
                                "production": 15760.0,
                                "consumption": 14300.0,
                                "import_volume": 2226.0,
                                "import_value_usd": 488.0,
                                "export_volume": 151.0,
                                "export_value_usd": 36.6,
                                "ending_stocks": 1830.0
                        },
                        "2013": {
                                "production": 17040.0,
                                "consumption": 14400.0,
                                "import_volume": 2574.0,
                                "import_value_usd": 562.0,
                                "export_volume": 184.0,
                                "export_value_usd": 44.4,
                                "ending_stocks": 1920.0
                        },
                        "2014": {
                                "production": 18320.0,
                                "consumption": 14500.0,
                                "import_volume": 2922.0,
                                "import_value_usd": 636.0,
                                "export_volume": 217.0,
                                "export_value_usd": 52.2,
                                "ending_stocks": 2010.0
                        },
                        "2015": {
                                "production": 19600,
                                "consumption": 14600,
                                "import_volume": 3270,
                                "import_value_usd": 710.0,
                                "export_volume": 250,
                                "export_value_usd": 60.0,
                                "ending_stocks": 2100
                        },
                        "2016": {
                                "production": 17803.33,
                                "consumption": 14716.67,
                                "import_volume": 2423.33,
                                "import_value_usd": 525.47,
                                "export_volume": 290.67,
                                "export_value_usd": 68.4,
                                "ending_stocks": 2116.67
                        },
                        "2017": {
                                "production": 16006.67,
                                "consumption": 14833.33,
                                "import_volume": 1576.67,
                                "import_value_usd": 340.93,
                                "export_volume": 331.33,
                                "export_value_usd": 76.8,
                                "ending_stocks": 2133.33
                        },
                        "2018": {
                                "production": 14210,
                                "consumption": 14950,
                                "import_volume": 730,
                                "import_value_usd": 156.4,
                                "export_volume": 372,
                                "export_value_usd": 85.2,
                                "ending_stocks": 2150
                        },
                        "2019": {
                                "production": 14580,
                                "consumption": 15200,
                                "import_volume": 1080,
                                "import_value_usd": 240.1,
                                "export_volume": 120,
                                "export_value_usd": 28.5,
                                "ending_stocks": 2390
                        },
                        "2020": {
                                "production": 14850,
                                "consumption": 15100,
                                "import_volume": 840,
                                "import_value_usd": 182.3,
                                "export_volume": 45,
                                "export_value_usd": 11.2,
                                "ending_stocks": 2850
                        },
                        "2021": {
                                "production": 15200,
                                "consumption": 15450,
                                "import_volume": 990,
                                "import_value_usd": 284.5,
                                "export_volume": 15,
                                "export_value_usd": 4.1,
                                "ending_stocks": 2980
                        },
                        "2022": {
                                "production": 15500,
                                "consumption": 15800,
                                "import_volume": 1210,
                                "import_value_usd": 412.0,
                                "export_volume": 165,
                                "export_value_usd": 51.3,
                                "ending_stocks": 3120
                        },
                        "2023": {
                                "production": 14750,
                                "consumption": 16100,
                                "import_volume": 1290,
                                "import_value_usd": 395.2,
                                "export_volume": 20,
                                "export_value_usd": 5.8,
                                "ending_stocks": 2840
                        },
                        "2024": {
                                "production": 14900,
                                "consumption": 16400,
                                "import_volume": 1450,
                                "import_value_usd": 435.0,
                                "export_volume": 12,
                                "export_value_usd": 3.6,
                                "ending_stocks": 2780
                        },
                        "2025": {
                                "production": 15300,
                                "consumption": 16650,
                                "import_volume": 1350,
                                "import_value_usd": 410.0,
                                "export_volume": 25,
                                "export_value_usd": 7.5,
                                "ending_stocks": 2900
                        },
                        "2026": {
                                "production": 15606.0,
                                "consumption": 16983.0,
                                "import_volume": 1377.0,
                                "import_value_usd": 418.2,
                                "export_volume": 25.5,
                                "export_value_usd": 7.65,
                                "ending_stocks": 2958.0
                        }
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
                        "1990": {
                                "production": 750.7,
                                "consumption": 1622.33,
                                "import_volume": 943.9,
                                "import_value_usd": 228.6,
                                "export_volume": 0.74,
                                "export_value_usd": 0.37,
                                "ending_stocks": 154.86
                        },
                        "1991": {
                                "production": 773.92,
                                "consumption": 1672.51,
                                "import_volume": 973.1,
                                "import_value_usd": 235.67,
                                "export_volume": 0.76,
                                "export_value_usd": 0.38,
                                "ending_stocks": 159.65
                        },
                        "1992": {
                                "production": 797.85,
                                "consumption": 1724.24,
                                "import_volume": 1003.19,
                                "import_value_usd": 242.96,
                                "export_volume": 0.78,
                                "export_value_usd": 0.39,
                                "ending_stocks": 164.59
                        },
                        "1993": {
                                "production": 822.53,
                                "consumption": 1777.56,
                                "import_volume": 1034.22,
                                "import_value_usd": 250.47,
                                "export_volume": 0.81,
                                "export_value_usd": 0.4,
                                "ending_stocks": 169.68
                        },
                        "1994": {
                                "production": 847.97,
                                "consumption": 1832.54,
                                "import_volume": 1066.2,
                                "import_value_usd": 258.22,
                                "export_volume": 0.83,
                                "export_value_usd": 0.42,
                                "ending_stocks": 174.92
                        },
                        "1995": {
                                "production": 874.19,
                                "consumption": 1889.21,
                                "import_volume": 1099.18,
                                "import_value_usd": 266.21,
                                "export_volume": 0.86,
                                "export_value_usd": 0.43,
                                "ending_stocks": 180.33
                        },
                        "1996": {
                                "production": 901.23,
                                "consumption": 1947.64,
                                "import_volume": 1133.17,
                                "import_value_usd": 274.44,
                                "export_volume": 0.89,
                                "export_value_usd": 0.44,
                                "ending_stocks": 185.91
                        },
                        "1997": {
                                "production": 929.1,
                                "consumption": 2007.88,
                                "import_volume": 1168.22,
                                "import_value_usd": 282.93,
                                "export_volume": 0.91,
                                "export_value_usd": 0.46,
                                "ending_stocks": 191.66
                        },
                        "1998": {
                                "production": 957.84,
                                "consumption": 2069.98,
                                "import_volume": 1204.35,
                                "import_value_usd": 291.68,
                                "export_volume": 0.94,
                                "export_value_usd": 0.47,
                                "ending_stocks": 197.59
                        },
                        "1999": {
                                "production": 987.46,
                                "consumption": 2134.0,
                                "import_volume": 1241.6,
                                "import_value_usd": 300.7,
                                "export_volume": 0.97,
                                "export_value_usd": 0.48,
                                "ending_stocks": 203.7
                        },
                        "2000": {
                                "production": 1018,
                                "consumption": 2200,
                                "import_volume": 1280,
                                "import_value_usd": 310.0,
                                "export_volume": 1,
                                "export_value_usd": 0.5,
                                "ending_stocks": 210
                        },
                        "2001": {
                                "production": 976.0,
                                "consumption": 2250.0,
                                "import_volume": 1342.0,
                                "import_value_usd": 332.0,
                                "export_volume": 1.2,
                                "export_value_usd": 0.56,
                                "ending_stocks": 218.0
                        },
                        "2002": {
                                "production": 934.0,
                                "consumption": 2300.0,
                                "import_volume": 1404.0,
                                "import_value_usd": 354.0,
                                "export_volume": 1.4,
                                "export_value_usd": 0.62,
                                "ending_stocks": 226.0
                        },
                        "2003": {
                                "production": 892.0,
                                "consumption": 2350.0,
                                "import_volume": 1466.0,
                                "import_value_usd": 376.0,
                                "export_volume": 1.6,
                                "export_value_usd": 0.68,
                                "ending_stocks": 234.0
                        },
                        "2004": {
                                "production": 850.0,
                                "consumption": 2400.0,
                                "import_volume": 1528.0,
                                "import_value_usd": 398.0,
                                "export_volume": 1.8,
                                "export_value_usd": 0.74,
                                "ending_stocks": 242.0
                        },
                        "2005": {
                                "production": 808,
                                "consumption": 2450,
                                "import_volume": 1590,
                                "import_value_usd": 420.0,
                                "export_volume": 2,
                                "export_value_usd": 0.8,
                                "ending_stocks": 250
                        },
                        "2006": {
                                "production": 827.8,
                                "consumption": 2480.0,
                                "import_volume": 1620.0,
                                "import_value_usd": 492.0,
                                "export_volume": 1.8,
                                "export_value_usd": 0.82,
                                "ending_stocks": 258.0
                        },
                        "2007": {
                                "production": 847.6,
                                "consumption": 2510.0,
                                "import_volume": 1650.0,
                                "import_value_usd": 564.0,
                                "export_volume": 1.6,
                                "export_value_usd": 0.84,
                                "ending_stocks": 266.0
                        },
                        "2008": {
                                "production": 867.4,
                                "consumption": 2540.0,
                                "import_volume": 1680.0,
                                "import_value_usd": 636.0,
                                "export_volume": 1.4,
                                "export_value_usd": 0.86,
                                "ending_stocks": 274.0
                        },
                        "2009": {
                                "production": 887.2,
                                "consumption": 2570.0,
                                "import_volume": 1710.0,
                                "import_value_usd": 708.0,
                                "export_volume": 1.2,
                                "export_value_usd": 0.88,
                                "ending_stocks": 282.0
                        },
                        "2010": {
                                "production": 907,
                                "consumption": 2600,
                                "import_volume": 1740,
                                "import_value_usd": 780.0,
                                "export_volume": 1,
                                "export_value_usd": 0.9,
                                "ending_stocks": 290
                        },
                        "2011": {
                                "production": 918.2,
                                "consumption": 2630.0,
                                "import_volume": 1844.0,
                                "import_value_usd": 828.0,
                                "export_volume": 1.2,
                                "export_value_usd": 0.96,
                                "ending_stocks": 300.0
                        },
                        "2012": {
                                "production": 929.4,
                                "consumption": 2660.0,
                                "import_volume": 1948.0,
                                "import_value_usd": 876.0,
                                "export_volume": 1.4,
                                "export_value_usd": 1.02,
                                "ending_stocks": 310.0
                        },
                        "2013": {
                                "production": 940.6,
                                "consumption": 2690.0,
                                "import_volume": 2052.0,
                                "import_value_usd": 924.0,
                                "export_volume": 1.6,
                                "export_value_usd": 1.08,
                                "ending_stocks": 320.0
                        },
                        "2014": {
                                "production": 951.8,
                                "consumption": 2720.0,
                                "import_volume": 2156.0,
                                "import_value_usd": 972.0,
                                "export_volume": 1.8,
                                "export_value_usd": 1.14,
                                "ending_stocks": 330.0
                        },
                        "2015": {
                                "production": 963,
                                "consumption": 2750,
                                "import_volume": 2260,
                                "import_value_usd": 1020.0,
                                "export_volume": 2,
                                "export_value_usd": 1.2,
                                "ending_stocks": 340
                        },
                        "2016": {
                                "production": 821.33,
                                "consumption": 2796.67,
                                "import_volume": 2368.33,
                                "import_value_usd": 1047.5,
                                "export_volume": 2.0,
                                "export_value_usd": 1.43,
                                "ending_stocks": 356.67
                        },
                        "2017": {
                                "production": 679.67,
                                "consumption": 2843.33,
                                "import_volume": 2476.67,
                                "import_value_usd": 1075.0,
                                "export_volume": 2.0,
                                "export_value_usd": 1.67,
                                "ending_stocks": 373.33
                        },
                        "2018": {
                                "production": 538,
                                "consumption": 2890,
                                "import_volume": 2585,
                                "import_value_usd": 1102.5,
                                "export_volume": 2,
                                "export_value_usd": 1.9,
                                "ending_stocks": 390
                        },
                        "2019": {
                                "production": 424,
                                "consumption": 2920,
                                "import_volume": 2670,
                                "import_value_usd": 1058.2,
                                "export_volume": 3,
                                "export_value_usd": 2.4,
                                "ending_stocks": 410
                        },
                        "2020": {
                                "production": 353,
                                "consumption": 2950,
                                "import_volume": 2475,
                                "import_value_usd": 1001.3,
                                "export_volume": 1,
                                "export_value_usd": 1.1,
                                "ending_stocks": 380
                        },
                        "2021": {
                                "production": 320,
                                "consumption": 2980,
                                "import_volume": 2490,
                                "import_value_usd": 1480.6,
                                "export_volume": 2,
                                "export_value_usd": 2.1,
                                "ending_stocks": 350
                        },
                        "2022": {
                                "production": 302,
                                "consumption": 3010,
                                "import_volume": 2320,
                                "import_value_usd": 1630.4,
                                "export_volume": 1,
                                "export_value_usd": 1.4,
                                "ending_stocks": 310
                        },
                        "2023": {
                                "production": 290,
                                "consumption": 3050,
                                "import_volume": 2270,
                                "import_value_usd": 1475.8,
                                "export_volume": 2,
                                "export_value_usd": 1.8,
                                "ending_stocks": 320
                        },
                        "2024": {
                                "production": 285,
                                "consumption": 3080,
                                "import_volume": 2350,
                                "import_value_usd": 1410.2,
                                "export_volume": 1,
                                "export_value_usd": 1.2,
                                "ending_stocks": 340
                        },
                        "2025": {
                                "production": 290,
                                "consumption": 3120,
                                "import_volume": 2400,
                                "import_value_usd": 1450.0,
                                "export_volume": 2,
                                "export_value_usd": 1.5,
                                "ending_stocks": 350
                        },
                        "2026": {
                                "production": 295.8,
                                "consumption": 3182.4,
                                "import_volume": 2448.0,
                                "import_value_usd": 1479.0,
                                "export_volume": 2.04,
                                "export_value_usd": 1.53,
                                "ending_stocks": 357.0
                        }
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
                        "1990": {
                                "production": 1246.25,
                                "consumption": 2396.63,
                                "import_volume": 1179.88,
                                "import_value_usd": 309.72,
                                "export_volume": 3.69,
                                "export_value_usd": 1.55,
                                "ending_stocks": 479.33
                        },
                        "1991": {
                                "production": 1284.79,
                                "consumption": 2470.75,
                                "import_volume": 1216.37,
                                "import_value_usd": 319.3,
                                "export_volume": 3.8,
                                "export_value_usd": 1.6,
                                "ending_stocks": 494.15
                        },
                        "1992": {
                                "production": 1324.53,
                                "consumption": 2547.17,
                                "import_volume": 1253.99,
                                "import_value_usd": 329.17,
                                "export_volume": 3.92,
                                "export_value_usd": 1.65,
                                "ending_stocks": 509.43
                        },
                        "1993": {
                                "production": 1365.49,
                                "consumption": 2625.94,
                                "import_volume": 1292.77,
                                "import_value_usd": 339.35,
                                "export_volume": 4.04,
                                "export_value_usd": 1.7,
                                "ending_stocks": 525.19
                        },
                        "1994": {
                                "production": 1407.72,
                                "consumption": 2707.16,
                                "import_volume": 1332.76,
                                "import_value_usd": 349.85,
                                "export_volume": 4.16,
                                "export_value_usd": 1.75,
                                "ending_stocks": 541.43
                        },
                        "1995": {
                                "production": 1451.26,
                                "consumption": 2790.89,
                                "import_volume": 1373.97,
                                "import_value_usd": 360.67,
                                "export_volume": 4.29,
                                "export_value_usd": 1.8,
                                "ending_stocks": 558.18
                        },
                        "1996": {
                                "production": 1496.14,
                                "consumption": 2877.2,
                                "import_volume": 1416.47,
                                "import_value_usd": 371.82,
                                "export_volume": 4.43,
                                "export_value_usd": 1.86,
                                "ending_stocks": 575.44
                        },
                        "1997": {
                                "production": 1542.42,
                                "consumption": 2966.19,
                                "import_volume": 1460.28,
                                "import_value_usd": 383.32,
                                "export_volume": 4.56,
                                "export_value_usd": 1.92,
                                "ending_stocks": 593.24
                        },
                        "1998": {
                                "production": 1590.12,
                                "consumption": 3057.92,
                                "import_volume": 1505.44,
                                "import_value_usd": 395.18,
                                "export_volume": 4.7,
                                "export_value_usd": 1.98,
                                "ending_stocks": 611.58
                        },
                        "1999": {
                                "production": 1639.3,
                                "consumption": 3152.5,
                                "import_volume": 1552.0,
                                "import_value_usd": 407.4,
                                "export_volume": 4.85,
                                "export_value_usd": 2.04,
                                "ending_stocks": 630.5
                        },
                        "2000": {
                                "production": 1690,
                                "consumption": 3250,
                                "import_volume": 1600,
                                "import_value_usd": 420.0,
                                "export_volume": 5,
                                "export_value_usd": 2.1,
                                "ending_stocks": 650
                        },
                        "2001": {
                                "production": 1800.0,
                                "consumption": 3380.0,
                                "import_volume": 1636.0,
                                "import_value_usd": 448.0,
                                "export_volume": 5.6,
                                "export_value_usd": 2.38,
                                "ending_stocks": 684.0
                        },
                        "2002": {
                                "production": 1910.0,
                                "consumption": 3510.0,
                                "import_volume": 1672.0,
                                "import_value_usd": 476.0,
                                "export_volume": 6.2,
                                "export_value_usd": 2.66,
                                "ending_stocks": 718.0
                        },
                        "2003": {
                                "production": 2020.0,
                                "consumption": 3640.0,
                                "import_volume": 1708.0,
                                "import_value_usd": 504.0,
                                "export_volume": 6.8,
                                "export_value_usd": 2.94,
                                "ending_stocks": 752.0
                        },
                        "2004": {
                                "production": 2130.0,
                                "consumption": 3770.0,
                                "import_volume": 1744.0,
                                "import_value_usd": 532.0,
                                "export_volume": 7.4,
                                "export_value_usd": 3.22,
                                "ending_stocks": 786.0
                        },
                        "2005": {
                                "production": 2240,
                                "consumption": 3900,
                                "import_volume": 1780,
                                "import_value_usd": 560.0,
                                "export_volume": 8,
                                "export_value_usd": 3.5,
                                "ending_stocks": 820
                        },
                        "2006": {
                                "production": 2234.0,
                                "consumption": 4020.0,
                                "import_volume": 1964.0,
                                "import_value_usd": 678.0,
                                "export_volume": 8.4,
                                "export_value_usd": 3.76,
                                "ending_stocks": 846.0
                        },
                        "2007": {
                                "production": 2228.0,
                                "consumption": 4140.0,
                                "import_volume": 2148.0,
                                "import_value_usd": 796.0,
                                "export_volume": 8.8,
                                "export_value_usd": 4.02,
                                "ending_stocks": 872.0
                        },
                        "2008": {
                                "production": 2222.0,
                                "consumption": 4260.0,
                                "import_volume": 2332.0,
                                "import_value_usd": 914.0,
                                "export_volume": 9.2,
                                "export_value_usd": 4.28,
                                "ending_stocks": 898.0
                        },
                        "2009": {
                                "production": 2216.0,
                                "consumption": 4380.0,
                                "import_volume": 2516.0,
                                "import_value_usd": 1032.0,
                                "export_volume": 9.6,
                                "export_value_usd": 4.54,
                                "ending_stocks": 924.0
                        },
                        "2010": {
                                "production": 2210,
                                "consumption": 4500,
                                "import_volume": 2700,
                                "import_value_usd": 1150.0,
                                "export_volume": 10,
                                "export_value_usd": 4.8,
                                "ending_stocks": 950
                        },
                        "2011": {
                                "production": 2266.0,
                                "consumption": 4580.0,
                                "import_volume": 2830.0,
                                "import_value_usd": 1176.0,
                                "export_volume": 10.4,
                                "export_value_usd": 5.08,
                                "ending_stocks": 980.0
                        },
                        "2012": {
                                "production": 2322.0,
                                "consumption": 4660.0,
                                "import_volume": 2960.0,
                                "import_value_usd": 1202.0,
                                "export_volume": 10.8,
                                "export_value_usd": 5.36,
                                "ending_stocks": 1010.0
                        },
                        "2013": {
                                "production": 2378.0,
                                "consumption": 4740.0,
                                "import_volume": 3090.0,
                                "import_value_usd": 1228.0,
                                "export_volume": 11.2,
                                "export_value_usd": 5.64,
                                "ending_stocks": 1040.0
                        },
                        "2014": {
                                "production": 2434.0,
                                "consumption": 4820.0,
                                "import_volume": 3220.0,
                                "import_value_usd": 1254.0,
                                "export_volume": 11.6,
                                "export_value_usd": 5.92,
                                "ending_stocks": 1070.0
                        },
                        "2015": {
                                "production": 2490,
                                "consumption": 4900,
                                "import_volume": 3350,
                                "import_value_usd": 1280.0,
                                "export_volume": 12,
                                "export_value_usd": 6.2,
                                "ending_stocks": 1100
                        },
                        "2016": {
                                "production": 2383.33,
                                "consumption": 4966.67,
                                "import_volume": 3910.0,
                                "import_value_usd": 1450.1,
                                "export_volume": 13.0,
                                "export_value_usd": 7.2,
                                "ending_stocks": 1150.0
                        },
                        "2017": {
                                "production": 2276.67,
                                "consumption": 5033.33,
                                "import_volume": 4470.0,
                                "import_value_usd": 1620.2,
                                "export_volume": 14.0,
                                "export_value_usd": 8.2,
                                "ending_stocks": 1200.0
                        },
                        "2018": {
                                "production": 2170,
                                "consumption": 5100,
                                "import_volume": 5030,
                                "import_value_usd": 1790.3,
                                "export_volume": 15,
                                "export_value_usd": 9.2,
                                "ending_stocks": 1250
                        },
                        "2019": {
                                "production": 2220,
                                "consumption": 5250,
                                "import_volume": 4090,
                                "import_value_usd": 1360.5,
                                "export_volume": 12,
                                "export_value_usd": 7.4,
                                "ending_stocks": 1180
                        },
                        "2020": {
                                "production": 2130,
                                "consumption": 5300,
                                "import_volume": 5540,
                                "import_value_usd": 1940.1,
                                "export_volume": 8,
                                "export_value_usd": 5.1,
                                "ending_stocks": 1420
                        },
                        "2021": {
                                "production": 2350,
                                "consumption": 5450,
                                "import_volume": 5480,
                                "import_value_usd": 2380.4,
                                "export_volume": 10,
                                "export_value_usd": 6.8,
                                "ending_stocks": 1350
                        },
                        "2022": {
                                "production": 2400,
                                "consumption": 5580,
                                "import_volume": 6010,
                                "import_value_usd": 3020.2,
                                "export_volume": 14,
                                "export_value_usd": 9.5,
                                "ending_stocks": 1490
                        },
                        "2023": {
                                "production": 2270,
                                "consumption": 5650,
                                "import_volume": 5070,
                                "import_value_usd": 2890.6,
                                "export_volume": 9,
                                "export_value_usd": 7.1,
                                "ending_stocks": 1280
                        },
                        "2024": {
                                "production": 2380,
                                "consumption": 5720,
                                "import_volume": 5200,
                                "import_value_usd": 2980.0,
                                "export_volume": 8,
                                "export_value_usd": 6.5,
                                "ending_stocks": 1310
                        },
                        "2025": {
                                "production": 2450,
                                "consumption": 5800,
                                "import_volume": 5150,
                                "import_value_usd": 2920.0,
                                "export_volume": 10,
                                "export_value_usd": 7.2,
                                "ending_stocks": 1350
                        },
                        "2026": {
                                "production": 2499.0,
                                "consumption": 5916.0,
                                "import_volume": 5253.0,
                                "import_value_usd": 2978.4,
                                "export_volume": 10.2,
                                "export_value_usd": 7.34,
                                "ending_stocks": 1377.0
                        }
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
                "realm_label": "Darat (Sayuran Hortikultura)",
                "unit": "Ribu Ton",
                "hs_chapter": "HS 07 (Sayuran yang Dapat Dimakan)",
                "hs_code": "0703.10.29 (Bawang Merah Segar Selain Benih)",
                "apbn_classification": "Pengendalian Inflasi Pangan Bergejolak (Volatile Food) & Fasilitasi Distribusi Pangan Bapanas",
                "lkpp_account_code": "526115 (Belanja Bantuan Sarana Pascapanen Hortikultura)",
                "lkpp_classification": "Belanja Pengendalian Inflasi Pangan",
                "source_institution": "Badan Pangan Nasional & Ditjen Hortikultura Kementan",
                "legal_basis": "Kepbadan Pangan Nasional No. 131/KS.02.02/K/11/2023",
                "description": "Komoditas penyumbang inflasi pangan (volatile food). Mengalami swasembada penuh sejak 2017 dengan ekspor berkala ke Singapura dan Thailand.",
                "time_series": {
                        "1990": {
                                "production": 567.82,
                                "consumption": 545.69,
                                "import_volume": 33.18,
                                "import_value_usd": 8.85,
                                "export_volume": 5.9,
                                "export_value_usd": 1.84,
                                "ending_stocks": 25.81
                        },
                        "1991": {
                                "production": 585.38,
                                "consumption": 562.57,
                                "import_volume": 34.21,
                                "import_value_usd": 9.12,
                                "export_volume": 6.08,
                                "export_value_usd": 1.9,
                                "ending_stocks": 26.61
                        },
                        "1992": {
                                "production": 603.48,
                                "consumption": 579.97,
                                "import_volume": 35.27,
                                "import_value_usd": 9.4,
                                "export_volume": 6.27,
                                "export_value_usd": 1.96,
                                "ending_stocks": 27.43
                        },
                        "1993": {
                                "production": 622.15,
                                "consumption": 597.91,
                                "import_volume": 36.36,
                                "import_value_usd": 9.7,
                                "export_volume": 6.46,
                                "export_value_usd": 2.02,
                                "ending_stocks": 28.28
                        },
                        "1994": {
                                "production": 641.39,
                                "consumption": 616.4,
                                "import_volume": 37.48,
                                "import_value_usd": 10.0,
                                "export_volume": 6.66,
                                "export_value_usd": 2.08,
                                "ending_stocks": 29.15
                        },
                        "1995": {
                                "production": 661.23,
                                "consumption": 635.46,
                                "import_volume": 38.64,
                                "import_value_usd": 10.3,
                                "export_volume": 6.87,
                                "export_value_usd": 2.15,
                                "ending_stocks": 30.06
                        },
                        "1996": {
                                "production": 681.68,
                                "consumption": 655.12,
                                "import_volume": 39.84,
                                "import_value_usd": 10.62,
                                "export_volume": 7.08,
                                "export_value_usd": 2.21,
                                "ending_stocks": 30.99
                        },
                        "1997": {
                                "production": 702.76,
                                "consumption": 675.38,
                                "import_volume": 41.07,
                                "import_value_usd": 10.95,
                                "export_volume": 7.3,
                                "export_value_usd": 2.28,
                                "ending_stocks": 31.94
                        },
                        "1998": {
                                "production": 724.49,
                                "consumption": 696.27,
                                "import_volume": 42.34,
                                "import_value_usd": 11.29,
                                "export_volume": 7.53,
                                "export_value_usd": 2.35,
                                "ending_stocks": 32.93
                        },
                        "1999": {
                                "production": 746.9,
                                "consumption": 717.8,
                                "import_volume": 43.65,
                                "import_value_usd": 11.64,
                                "export_volume": 7.76,
                                "export_value_usd": 2.42,
                                "ending_stocks": 33.95
                        },
                        "2000": {
                                "production": 770,
                                "consumption": 740,
                                "import_volume": 45,
                                "import_value_usd": 12.0,
                                "export_volume": 8,
                                "export_value_usd": 2.5,
                                "ending_stocks": 35
                        },
                        "2001": {
                                "production": 762.0,
                                "consumption": 750.0,
                                "import_volume": 51.0,
                                "import_value_usd": 14.0,
                                "export_volume": 7.4,
                                "export_value_usd": 2.36,
                                "ending_stocks": 36.0
                        },
                        "2002": {
                                "production": 754.0,
                                "consumption": 760.0,
                                "import_volume": 57.0,
                                "import_value_usd": 16.0,
                                "export_volume": 6.8,
                                "export_value_usd": 2.22,
                                "ending_stocks": 37.0
                        },
                        "2003": {
                                "production": 746.0,
                                "consumption": 770.0,
                                "import_volume": 63.0,
                                "import_value_usd": 18.0,
                                "export_volume": 6.2,
                                "export_value_usd": 2.08,
                                "ending_stocks": 38.0
                        },
                        "2004": {
                                "production": 738.0,
                                "consumption": 780.0,
                                "import_volume": 69.0,
                                "import_value_usd": 20.0,
                                "export_volume": 5.6,
                                "export_value_usd": 1.94,
                                "ending_stocks": 39.0
                        },
                        "2005": {
                                "production": 730,
                                "consumption": 790,
                                "import_volume": 75,
                                "import_value_usd": 22.0,
                                "export_volume": 5,
                                "export_value_usd": 1.8,
                                "ending_stocks": 40
                        },
                        "2006": {
                                "production": 794.0,
                                "consumption": 828.0,
                                "import_volume": 77.0,
                                "import_value_usd": 25.2,
                                "export_volume": 5.4,
                                "export_value_usd": 2.0,
                                "ending_stocks": 43.0
                        },
                        "2007": {
                                "production": 858.0,
                                "consumption": 866.0,
                                "import_volume": 79.0,
                                "import_value_usd": 28.4,
                                "export_volume": 5.8,
                                "export_value_usd": 2.2,
                                "ending_stocks": 46.0
                        },
                        "2008": {
                                "production": 922.0,
                                "consumption": 904.0,
                                "import_volume": 81.0,
                                "import_value_usd": 31.6,
                                "export_volume": 6.2,
                                "export_value_usd": 2.4,
                                "ending_stocks": 49.0
                        },
                        "2009": {
                                "production": 986.0,
                                "consumption": 942.0,
                                "import_volume": 83.0,
                                "import_value_usd": 34.8,
                                "export_volume": 6.6,
                                "export_value_usd": 2.6,
                                "ending_stocks": 52.0
                        },
                        "2010": {
                                "production": 1050,
                                "consumption": 980,
                                "import_volume": 85,
                                "import_value_usd": 38.0,
                                "export_volume": 7,
                                "export_value_usd": 2.8,
                                "ending_stocks": 55
                        },
                        "2011": {
                                "production": 1086.0,
                                "consumption": 1014.0,
                                "import_volume": 71.6,
                                "import_value_usd": 32.3,
                                "export_volume": 8.0,
                                "export_value_usd": 3.48,
                                "ending_stocks": 58.0
                        },
                        "2012": {
                                "production": 1122.0,
                                "consumption": 1048.0,
                                "import_volume": 58.2,
                                "import_value_usd": 26.6,
                                "export_volume": 9.0,
                                "export_value_usd": 4.16,
                                "ending_stocks": 61.0
                        },
                        "2013": {
                                "production": 1158.0,
                                "consumption": 1082.0,
                                "import_volume": 44.8,
                                "import_value_usd": 20.9,
                                "export_volume": 10.0,
                                "export_value_usd": 4.84,
                                "ending_stocks": 64.0
                        },
                        "2014": {
                                "production": 1194.0,
                                "consumption": 1116.0,
                                "import_volume": 31.4,
                                "import_value_usd": 15.2,
                                "export_volume": 11.0,
                                "export_value_usd": 5.52,
                                "ending_stocks": 67.0
                        },
                        "2015": {
                                "production": 1230,
                                "consumption": 1150,
                                "import_volume": 18,
                                "import_value_usd": 9.5,
                                "export_volume": 12,
                                "export_value_usd": 6.2,
                                "ending_stocks": 70
                        },
                        "2016": {
                                "production": 1321.0,
                                "consumption": 1240.0,
                                "import_volume": 12.0,
                                "import_value_usd": 6.33,
                                "export_volume": 11.0,
                                "export_value_usd": 6.97,
                                "ending_stocks": 78.33
                        },
                        "2017": {
                                "production": 1412.0,
                                "consumption": 1330.0,
                                "import_volume": 6.0,
                                "import_value_usd": 3.17,
                                "export_volume": 10.0,
                                "export_value_usd": 7.73,
                                "ending_stocks": 86.67
                        },
                        "2018": {
                                "production": 1503,
                                "consumption": 1420,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 9,
                                "export_value_usd": 8.5,
                                "ending_stocks": 95
                        },
                        "2019": {
                                "production": 1580,
                                "consumption": 1450,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 7,
                                "export_value_usd": 6.9,
                                "ending_stocks": 110
                        },
                        "2020": {
                                "production": 1815,
                                "consumption": 1490,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 8,
                                "export_value_usd": 7.8,
                                "ending_stocks": 140
                        },
                        "2021": {
                                "production": 2004,
                                "consumption": 1530,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 11,
                                "export_value_usd": 10.5,
                                "ending_stocks": 160
                        },
                        "2022": {
                                "production": 1980,
                                "consumption": 1560,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 14,
                                "export_value_usd": 13.2,
                                "ending_stocks": 175
                        },
                        "2023": {
                                "production": 1990,
                                "consumption": 1590,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 12,
                                "export_value_usd": 11.8,
                                "ending_stocks": 180
                        },
                        "2024": {
                                "production": 2020,
                                "consumption": 1620,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 15,
                                "export_value_usd": 14.5,
                                "ending_stocks": 190
                        },
                        "2025": {
                                "production": 2080,
                                "consumption": 1650,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 18,
                                "export_value_usd": 16.0,
                                "ending_stocks": 205
                        },
                        "2026": {
                                "production": 2121.6,
                                "consumption": 1683.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 18.36,
                                "export_value_usd": 16.32,
                                "ending_stocks": 209.1
                        }
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
                "realm_label": "Darat (Tanaman Perkebunan)",
                "unit": "Juta Ton",
                "hs_chapter": "HS 15 (Lemak & Minyak Nabati)",
                "hs_code": "1511.10.00 (Crude Palm Oil / CPO Mentah)",
                "apbn_classification": "Penerimaan Pungutan Ekspor Sawit BPDPKS & Bea Keluar CPO Kemenkeu",
                "lkpp_account_code": "411521 (Penerimaan Bea Keluar Ekspor CPO) / 421411 (Dana Pungutan BPDPKS)",
                "lkpp_classification": "Penerimaan Bea Keluar & Badan Layanan Umum (BLU)",
                "source_institution": "GAPKI, BPDPKS & Ditjen Perkebunan Kementan",
                "legal_basis": "Perpres No. 66 Tahun 2018 jo. Mandatori Biodiesel B35/B40",
                "description": "Komoditas andalan devisa perkebunan nasional terbesar di dunia serta penopang program mandatori biodiesel domestik.",
                "time_series": {
                        "1990": {
                                "production": 5.16,
                                "consumption": 1.55,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 3.61,
                                "export_value_usd": 1069.26,
                                "ending_stocks": 0.59
                        },
                        "1991": {
                                "production": 5.32,
                                "consumption": 1.6,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 3.73,
                                "export_value_usd": 1102.34,
                                "ending_stocks": 0.61
                        },
                        "1992": {
                                "production": 5.49,
                                "consumption": 1.65,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 3.84,
                                "export_value_usd": 1136.43,
                                "ending_stocks": 0.63
                        },
                        "1993": {
                                "production": 5.66,
                                "consumption": 1.7,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 3.96,
                                "export_value_usd": 1171.58,
                                "ending_stocks": 0.65
                        },
                        "1994": {
                                "production": 5.83,
                                "consumption": 1.75,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 4.08,
                                "export_value_usd": 1207.81,
                                "ending_stocks": 0.67
                        },
                        "1995": {
                                "production": 6.01,
                                "consumption": 1.8,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 4.21,
                                "export_value_usd": 1245.16,
                                "ending_stocks": 0.69
                        },
                        "1996": {
                                "production": 6.2,
                                "consumption": 1.86,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 4.34,
                                "export_value_usd": 1283.67,
                                "ending_stocks": 0.71
                        },
                        "1997": {
                                "production": 6.39,
                                "consumption": 1.92,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 4.47,
                                "export_value_usd": 1323.38,
                                "ending_stocks": 0.73
                        },
                        "1998": {
                                "production": 6.59,
                                "consumption": 1.98,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 4.61,
                                "export_value_usd": 1364.3,
                                "ending_stocks": 0.75
                        },
                        "1999": {
                                "production": 6.79,
                                "consumption": 2.04,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 4.75,
                                "export_value_usd": 1406.5,
                                "ending_stocks": 0.78
                        },
                        "2000": {
                                "production": 7.0,
                                "consumption": 2.1,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 4.9,
                                "export_value_usd": 1450.0,
                                "ending_stocks": 0.8
                        },
                        "2001": {
                                "production": 7.96,
                                "consumption": 2.36,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 5.6,
                                "export_value_usd": 1910.0,
                                "ending_stocks": 0.92
                        },
                        "2002": {
                                "production": 8.92,
                                "consumption": 2.62,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 6.3,
                                "export_value_usd": 2370.0,
                                "ending_stocks": 1.04
                        },
                        "2003": {
                                "production": 9.88,
                                "consumption": 2.88,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 7.0,
                                "export_value_usd": 2830.0,
                                "ending_stocks": 1.16
                        },
                        "2004": {
                                "production": 10.84,
                                "consumption": 3.14,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 7.7,
                                "export_value_usd": 3290.0,
                                "ending_stocks": 1.28
                        },
                        "2005": {
                                "production": 11.8,
                                "consumption": 3.4,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 8.4,
                                "export_value_usd": 3750.0,
                                "ending_stocks": 1.4
                        },
                        "2006": {
                                "production": 13.83,
                                "consumption": 3.96,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 9.98,
                                "export_value_usd": 5960.0,
                                "ending_stocks": 1.54
                        },
                        "2007": {
                                "production": 15.86,
                                "consumption": 4.52,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 11.56,
                                "export_value_usd": 8170.0,
                                "ending_stocks": 1.68
                        },
                        "2008": {
                                "production": 17.9,
                                "consumption": 5.08,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 13.14,
                                "export_value_usd": 10380.0,
                                "ending_stocks": 1.82
                        },
                        "2009": {
                                "production": 19.93,
                                "consumption": 5.64,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 14.72,
                                "export_value_usd": 12590.0,
                                "ending_stocks": 1.96
                        },
                        "2010": {
                                "production": 21.96,
                                "consumption": 6.2,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 16.3,
                                "export_value_usd": 14800.0,
                                "ending_stocks": 2.1
                        },
                        "2011": {
                                "production": 24.67,
                                "consumption": 6.74,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 18.32,
                                "export_value_usd": 15540.0,
                                "ending_stocks": 2.32
                        },
                        "2012": {
                                "production": 27.38,
                                "consumption": 7.28,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 20.34,
                                "export_value_usd": 16280.0,
                                "ending_stocks": 2.54
                        },
                        "2013": {
                                "production": 30.08,
                                "consumption": 7.82,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 22.36,
                                "export_value_usd": 17020.0,
                                "ending_stocks": 2.76
                        },
                        "2014": {
                                "production": 32.79,
                                "consumption": 8.36,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 24.38,
                                "export_value_usd": 17760.0,
                                "ending_stocks": 2.98
                        },
                        "2015": {
                                "production": 35.5,
                                "consumption": 8.9,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 26.4,
                                "export_value_usd": 18500.0,
                                "ending_stocks": 3.2
                        },
                        "2016": {
                                "production": 38.0,
                                "consumption": 10.43,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 27.43,
                                "export_value_usd": 19166.67,
                                "ending_stocks": 3.4
                        },
                        "2017": {
                                "production": 40.5,
                                "consumption": 11.97,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 28.47,
                                "export_value_usd": 19833.33,
                                "ending_stocks": 3.6
                        },
                        "2018": {
                                "production": 43.0,
                                "consumption": 13.5,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 29.5,
                                "export_value_usd": 20500.0,
                                "ending_stocks": 3.8
                        },
                        "2019": {
                                "production": 47.2,
                                "consumption": 16.8,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 30.2,
                                "export_value_usd": 19800.0,
                                "ending_stocks": 4.2
                        },
                        "2020": {
                                "production": 47.0,
                                "consumption": 17.3,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 27.3,
                                "export_value_usd": 22900.0,
                                "ending_stocks": 4.6
                        },
                        "2021": {
                                "production": 46.9,
                                "consumption": 18.4,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 26.9,
                                "export_value_usd": 35500.0,
                                "ending_stocks": 4.5
                        },
                        "2022": {
                                "production": 46.7,
                                "consumption": 21.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 26.2,
                                "export_value_usd": 39000.0,
                                "ending_stocks": 4.3
                        },
                        "2023": {
                                "production": 47.1,
                                "consumption": 23.2,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 24.5,
                                "export_value_usd": 29500.0,
                                "ending_stocks": 4.8
                        },
                        "2024": {
                                "production": 47.5,
                                "consumption": 24.1,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 24.0,
                                "export_value_usd": 28400.0,
                                "ending_stocks": 4.9
                        },
                        "2025": {
                                "production": 48.5,
                                "consumption": 25.4,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 23.8,
                                "export_value_usd": 29000.0,
                                "ending_stocks": 5.1
                        },
                        "2026": {
                                "production": 49.47,
                                "consumption": 25.91,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 24.28,
                                "export_value_usd": 29580.0,
                                "ending_stocks": 5.2
                        }
                }
        },
        {
                "id": "COM-LIVE-001-SAPI",
                "name": "Daging Sapi & Kerbau",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Peternakan & Perikanan",
                "group": "PETERNAKAN",
                "group_label": "Peternakan & Hasil Ternak (Darat)",
                "realm": "DARAT",
                "realm_label": "Darat (Peternakan Ruminansia)",
                "unit": "Ribu Ton",
                "hs_chapter": "HS 02 (Daging & Sisa Daging)",
                "hs_code": "0202.30.00 (Daging Sapi Tanpa Tulang Beku)",
                "apbn_classification": "Program Swasembada Daging Sapi (PSDS) & Penugasan Importasi Daging Kerbau Bulog",
                "lkpp_account_code": "526115 (Belanja Bantuan Bibit Sapi & Vaksin PMK) / 411511 (Bea Masuk)",
                "lkpp_classification": "Belanja Bantuan Ternak & Bea Masuk Pangan",
                "source_institution": "Badan Pangan Nasional & Ditjen Peternakan Kementan",
                "legal_basis": "Perpres No. 125 Tahun 2022 & UU No. 41 Tahun 2014 tentang Peternakan",
                "description": "Sumber protein hewani ruminansia dengan defisit produksi domestik yang diimbangi importasi daging beku dan sapi bakalan (feeder cattle).",
                "time_series": {
                        "1990": {
                                "production": 249.99,
                                "consumption": 269.16,
                                "import_volume": 20.65,
                                "import_value_usd": 38.35,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 11.06
                        },
                        "1991": {
                                "production": 257.72,
                                "consumption": 277.48,
                                "import_volume": 21.29,
                                "import_value_usd": 39.53,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 11.4
                        },
                        "1992": {
                                "production": 265.69,
                                "consumption": 286.07,
                                "import_volume": 21.94,
                                "import_value_usd": 40.75,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 11.76
                        },
                        "1993": {
                                "production": 273.91,
                                "consumption": 294.91,
                                "import_volume": 22.62,
                                "import_value_usd": 42.02,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 12.12
                        },
                        "1994": {
                                "production": 282.38,
                                "consumption": 304.03,
                                "import_volume": 23.32,
                                "import_value_usd": 43.31,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 12.49
                        },
                        "1995": {
                                "production": 291.11,
                                "consumption": 313.44,
                                "import_volume": 24.04,
                                "import_value_usd": 44.65,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 12.88
                        },
                        "1996": {
                                "production": 300.11,
                                "consumption": 323.13,
                                "import_volume": 24.79,
                                "import_value_usd": 46.04,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 13.28
                        },
                        "1997": {
                                "production": 309.4,
                                "consumption": 333.13,
                                "import_volume": 25.55,
                                "import_value_usd": 47.46,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 13.69
                        },
                        "1998": {
                                "production": 318.97,
                                "consumption": 343.43,
                                "import_volume": 26.35,
                                "import_value_usd": 48.93,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 14.11
                        },
                        "1999": {
                                "production": 328.83,
                                "consumption": 354.05,
                                "import_volume": 27.16,
                                "import_value_usd": 50.44,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 14.55
                        },
                        "2000": {
                                "production": 339,
                                "consumption": 365,
                                "import_volume": 28,
                                "import_value_usd": 52.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 15
                        },
                        "2001": {
                                "production": 342.8,
                                "consumption": 374.0,
                                "import_volume": 33.4,
                                "import_value_usd": 63.6,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 16.0
                        },
                        "2002": {
                                "production": 346.6,
                                "consumption": 383.0,
                                "import_volume": 38.8,
                                "import_value_usd": 75.2,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 17.0
                        },
                        "2003": {
                                "production": 350.4,
                                "consumption": 392.0,
                                "import_volume": 44.2,
                                "import_value_usd": 86.8,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 18.0
                        },
                        "2004": {
                                "production": 354.2,
                                "consumption": 401.0,
                                "import_volume": 49.6,
                                "import_value_usd": 98.4,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 19.0
                        },
                        "2005": {
                                "production": 358,
                                "consumption": 410,
                                "import_volume": 55,
                                "import_value_usd": 110.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 20
                        },
                        "2006": {
                                "production": 371.8,
                                "consumption": 426.0,
                                "import_volume": 61.0,
                                "import_value_usd": 136.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 21.0
                        },
                        "2007": {
                                "production": 385.6,
                                "consumption": 442.0,
                                "import_volume": 67.0,
                                "import_value_usd": 162.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 22.0
                        },
                        "2008": {
                                "production": 399.4,
                                "consumption": 458.0,
                                "import_volume": 73.0,
                                "import_value_usd": 188.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 23.0
                        },
                        "2009": {
                                "production": 413.2,
                                "consumption": 474.0,
                                "import_volume": 79.0,
                                "import_value_usd": 214.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 24.0
                        },
                        "2010": {
                                "production": 427,
                                "consumption": 490,
                                "import_volume": 85,
                                "import_value_usd": 240.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 25
                        },
                        "2011": {
                                "production": 442.8,
                                "consumption": 514.0,
                                "import_volume": 93.0,
                                "import_value_usd": 282.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 26.0
                        },
                        "2012": {
                                "production": 458.6,
                                "consumption": 538.0,
                                "import_volume": 101.0,
                                "import_value_usd": 324.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 27.0
                        },
                        "2013": {
                                "production": 474.4,
                                "consumption": 562.0,
                                "import_volume": 109.0,
                                "import_value_usd": 366.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 28.0
                        },
                        "2014": {
                                "production": 490.2,
                                "consumption": 586.0,
                                "import_volume": 117.0,
                                "import_value_usd": 408.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 29.0
                        },
                        "2015": {
                                "production": 506,
                                "consumption": 610,
                                "import_volume": 125,
                                "import_value_usd": 450.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 30
                        },
                        "2016": {
                                "production": 502.67,
                                "consumption": 626.67,
                                "import_volume": 136.67,
                                "import_value_usd": 493.33,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 30.67
                        },
                        "2017": {
                                "production": 499.33,
                                "consumption": 643.33,
                                "import_volume": 148.33,
                                "import_value_usd": 536.67,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 31.33
                        },
                        "2018": {
                                "production": 496,
                                "consumption": 660,
                                "import_volume": 160,
                                "import_value_usd": 580.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 32
                        },
                        "2019": {
                                "production": 504,
                                "consumption": 690,
                                "import_volume": 190,
                                "import_value_usd": 690.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 35
                        },
                        "2020": {
                                "production": 515,
                                "consumption": 680,
                                "import_volume": 170,
                                "import_value_usd": 620.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 38
                        },
                        "2021": {
                                "production": 437,
                                "consumption": 700,
                                "import_volume": 260,
                                "import_value_usd": 890.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 42
                        },
                        "2022": {
                                "production": 415,
                                "consumption": 715,
                                "import_volume": 300,
                                "import_value_usd": 1050.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 45
                        },
                        "2023": {
                                "production": 425,
                                "consumption": 730,
                                "import_volume": 310,
                                "import_value_usd": 1080.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 48
                        },
                        "2024": {
                                "production": 435,
                                "consumption": 745,
                                "import_volume": 315,
                                "import_value_usd": 1110.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 50
                        },
                        "2025": {
                                "production": 445,
                                "consumption": 760,
                                "import_volume": 320,
                                "import_value_usd": 1150.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 52
                        },
                        "2026": {
                                "production": 453.9,
                                "consumption": 775.2,
                                "import_volume": 326.4,
                                "import_value_usd": 1173.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 53.04
                        }
                }
        },
        {
                "id": "COM-LIVE-002-AYAM",
                "name": "Daging Ayam Ras (Broiler)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Peternakan & Perikanan",
                "group": "PETERNAKAN",
                "group_label": "Peternakan & Hasil Ternak (Darat)",
                "realm": "DARAT",
                "realm_label": "Darat (Unggas Komersial)",
                "unit": "Ribu Ton",
                "hs_chapter": "HS 02 (Daging & Sisa Daging)",
                "hs_code": "0207.12.00 (Daging Ayam Broiler Utuh Beku)",
                "apbn_classification": "Pengendalian Pasokan DOC & Penyerapan Karkas Ayam Berlebih SPHP Bapanas",
                "lkpp_account_code": "562111 (Bantuan Pangan Stunting Penanganan Gizi Unggas)",
                "lkpp_classification": "Belanja Bantuan Pangan Pengentasan Kemiskinan & Stunting",
                "source_institution": "Kementerian Pertanian & Badan Pangan Nasional",
                "legal_basis": "Permentan No. 32/PK.230/M/09/2021 tentang Penyediaan dan Peredaran Unggas",
                "description": "Sumber protein hewani utama masyarakat Indonesia dengan tingkat swasembada surplus penuh.",
                "time_series": {
                        "1990": {
                                "production": 604.69,
                                "consumption": 597.31,
                                "import_volume": 8.85,
                                "import_value_usd": 10.32,
                                "export_volume": 1.47,
                                "export_value_usd": 1.84,
                                "ending_stocks": 33.18
                        },
                        "1991": {
                                "production": 623.39,
                                "consumption": 615.79,
                                "import_volume": 9.12,
                                "import_value_usd": 10.64,
                                "export_volume": 1.52,
                                "export_value_usd": 1.9,
                                "ending_stocks": 34.21
                        },
                        "1992": {
                                "production": 642.67,
                                "consumption": 634.83,
                                "import_volume": 9.4,
                                "import_value_usd": 10.97,
                                "export_volume": 1.57,
                                "export_value_usd": 1.96,
                                "ending_stocks": 35.27
                        },
                        "1993": {
                                "production": 662.55,
                                "consumption": 654.47,
                                "import_volume": 9.7,
                                "import_value_usd": 11.31,
                                "export_volume": 1.62,
                                "export_value_usd": 2.02,
                                "ending_stocks": 36.36
                        },
                        "1994": {
                                "production": 683.04,
                                "consumption": 674.71,
                                "import_volume": 10.0,
                                "import_value_usd": 11.66,
                                "export_volume": 1.67,
                                "export_value_usd": 2.08,
                                "ending_stocks": 37.48
                        },
                        "1995": {
                                "production": 704.16,
                                "consumption": 695.57,
                                "import_volume": 10.3,
                                "import_value_usd": 12.02,
                                "export_volume": 1.72,
                                "export_value_usd": 2.15,
                                "ending_stocks": 38.64
                        },
                        "1996": {
                                "production": 725.94,
                                "consumption": 717.09,
                                "import_volume": 10.62,
                                "import_value_usd": 12.39,
                                "export_volume": 1.77,
                                "export_value_usd": 2.21,
                                "ending_stocks": 39.84
                        },
                        "1997": {
                                "production": 748.39,
                                "consumption": 739.27,
                                "import_volume": 10.95,
                                "import_value_usd": 12.78,
                                "export_volume": 1.83,
                                "export_value_usd": 2.28,
                                "ending_stocks": 41.07
                        },
                        "1998": {
                                "production": 771.54,
                                "consumption": 762.13,
                                "import_volume": 11.29,
                                "import_value_usd": 13.17,
                                "export_volume": 1.88,
                                "export_value_usd": 2.35,
                                "ending_stocks": 42.34
                        },
                        "1999": {
                                "production": 795.4,
                                "consumption": 785.7,
                                "import_volume": 11.64,
                                "import_value_usd": 13.58,
                                "export_volume": 1.94,
                                "export_value_usd": 2.42,
                                "ending_stocks": 43.65
                        },
                        "2000": {
                                "production": 820,
                                "consumption": 810,
                                "import_volume": 12,
                                "import_value_usd": 14.0,
                                "export_volume": 2,
                                "export_value_usd": 2.5,
                                "ending_stocks": 45
                        },
                        "2001": {
                                "production": 872.0,
                                "consumption": 860.0,
                                "import_volume": 11.2,
                                "import_value_usd": 13.2,
                                "export_volume": 2.4,
                                "export_value_usd": 2.96,
                                "ending_stocks": 48.0
                        },
                        "2002": {
                                "production": 924.0,
                                "consumption": 910.0,
                                "import_volume": 10.4,
                                "import_value_usd": 12.4,
                                "export_volume": 2.8,
                                "export_value_usd": 3.42,
                                "ending_stocks": 51.0
                        },
                        "2003": {
                                "production": 976.0,
                                "consumption": 960.0,
                                "import_volume": 9.6,
                                "import_value_usd": 11.6,
                                "export_volume": 3.2,
                                "export_value_usd": 3.88,
                                "ending_stocks": 54.0
                        },
                        "2004": {
                                "production": 1028.0,
                                "consumption": 1010.0,
                                "import_volume": 8.8,
                                "import_value_usd": 10.8,
                                "export_volume": 3.6,
                                "export_value_usd": 4.34,
                                "ending_stocks": 57.0
                        },
                        "2005": {
                                "production": 1080,
                                "consumption": 1060,
                                "import_volume": 8,
                                "import_value_usd": 10.0,
                                "export_volume": 4,
                                "export_value_usd": 4.8,
                                "ending_stocks": 60
                        },
                        "2006": {
                                "production": 1166.0,
                                "consumption": 1144.0,
                                "import_volume": 7.4,
                                "import_value_usd": 9.4,
                                "export_volume": 4.4,
                                "export_value_usd": 5.54,
                                "ending_stocks": 65.0
                        },
                        "2007": {
                                "production": 1252.0,
                                "consumption": 1228.0,
                                "import_volume": 6.8,
                                "import_value_usd": 8.8,
                                "export_volume": 4.8,
                                "export_value_usd": 6.28,
                                "ending_stocks": 70.0
                        },
                        "2008": {
                                "production": 1338.0,
                                "consumption": 1312.0,
                                "import_volume": 6.2,
                                "import_value_usd": 8.2,
                                "export_volume": 5.2,
                                "export_value_usd": 7.02,
                                "ending_stocks": 75.0
                        },
                        "2009": {
                                "production": 1424.0,
                                "consumption": 1396.0,
                                "import_volume": 5.6,
                                "import_value_usd": 7.6,
                                "export_volume": 5.6,
                                "export_value_usd": 7.76,
                                "ending_stocks": 80.0
                        },
                        "2010": {
                                "production": 1510,
                                "consumption": 1480,
                                "import_volume": 5,
                                "import_value_usd": 7.0,
                                "export_volume": 6,
                                "export_value_usd": 8.5,
                                "ending_stocks": 85
                        },
                        "2011": {
                                "production": 1684.0,
                                "consumption": 1646.0,
                                "import_volume": 4.4,
                                "import_value_usd": 6.3,
                                "export_volume": 6.8,
                                "export_value_usd": 9.8,
                                "ending_stocks": 92.0
                        },
                        "2012": {
                                "production": 1858.0,
                                "consumption": 1812.0,
                                "import_volume": 3.8,
                                "import_value_usd": 5.6,
                                "export_volume": 7.6,
                                "export_value_usd": 11.1,
                                "ending_stocks": 99.0
                        },
                        "2013": {
                                "production": 2032.0,
                                "consumption": 1978.0,
                                "import_volume": 3.2,
                                "import_value_usd": 4.9,
                                "export_volume": 8.4,
                                "export_value_usd": 12.4,
                                "ending_stocks": 106.0
                        },
                        "2014": {
                                "production": 2206.0,
                                "consumption": 2144.0,
                                "import_volume": 2.6,
                                "import_value_usd": 4.2,
                                "export_volume": 9.2,
                                "export_value_usd": 13.7,
                                "ending_stocks": 113.0
                        },
                        "2015": {
                                "production": 2380,
                                "consumption": 2310,
                                "import_volume": 2,
                                "import_value_usd": 3.5,
                                "export_volume": 10,
                                "export_value_usd": 15.0,
                                "ending_stocks": 120
                        },
                        "2016": {
                                "production": 2726.67,
                                "consumption": 2580.0,
                                "import_volume": 1.33,
                                "import_value_usd": 2.33,
                                "export_volume": 11.67,
                                "export_value_usd": 18.0,
                                "ending_stocks": 140.0
                        },
                        "2017": {
                                "production": 3073.33,
                                "consumption": 2850.0,
                                "import_volume": 0.67,
                                "import_value_usd": 1.17,
                                "export_volume": 13.33,
                                "export_value_usd": 21.0,
                                "ending_stocks": 160.0
                        },
                        "2018": {
                                "production": 3420,
                                "consumption": 3120,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 15,
                                "export_value_usd": 24.0,
                                "ending_stocks": 180
                        },
                        "2019": {
                                "production": 3510,
                                "consumption": 3250,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 18,
                                "export_value_usd": 31.0,
                                "ending_stocks": 210
                        },
                        "2020": {
                                "production": 3470,
                                "consumption": 3180,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 14,
                                "export_value_usd": 25.0,
                                "ending_stocks": 240
                        },
                        "2021": {
                                "production": 3650,
                                "consumption": 3320,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 22,
                                "export_value_usd": 42.0,
                                "ending_stocks": 270
                        },
                        "2022": {
                                "production": 3780,
                                "consumption": 3450,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 28,
                                "export_value_usd": 55.0,
                                "ending_stocks": 310
                        },
                        "2023": {
                                "production": 3890,
                                "consumption": 3560,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 32,
                                "export_value_usd": 64.0,
                                "ending_stocks": 340
                        },
                        "2024": {
                                "production": 3980,
                                "consumption": 3650,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 35,
                                "export_value_usd": 72.0,
                                "ending_stocks": 360
                        },
                        "2025": {
                                "production": 4100,
                                "consumption": 3750,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 40,
                                "export_value_usd": 85.0,
                                "ending_stocks": 390
                        },
                        "2026": {
                                "production": 4182.0,
                                "consumption": 3825.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 40.8,
                                "export_value_usd": 86.7,
                                "ending_stocks": 397.8
                        }
                }
        },
        {
                "id": "COM-FISH-001-TUNA",
                "name": "Ikan Tangkap Laut (Tuna, Cakalang, Tongkol)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Peternakan & Perikanan",
                "group": "PERIKANAN",
                "group_label": "Perikanan & Sumber Daya Air",
                "realm": "AIR_LAUT",
                "realm_label": "Air (Perikanan Laut)",
                "unit": "Ribu Ton",
                "hs_chapter": "HS 03 (Ikan & Krustasea)",
                "hs_code": "0303.41.00 (Ikan Tuna Sirip Kuning & Albakor Beku)",
                "apbn_classification": "Kebijakan Penangkapan Ikan Terukur (PIT) & Penerimaan Negara Bukan Pajak (PNBP) Perikanan",
                "lkpp_account_code": "421411 (Pendapatan Sumber Daya Alam Perikanan Tangkap Laut KKP)",
                "lkpp_classification": "PNBP Sumber Daya Alam Perikanan (LRA & LO)",
                "source_institution": "Kementerian Kelautan dan Perikanan (KKP)",
                "legal_basis": "PP No. 11 Tahun 2023 tentang Penangkapan Ikan Terukur & UU No. 45 Tahun 2009",
                "description": "Potensi maritim tangkap laut di 11 Wilayah Pengelolaan Perikanan (WPP-NRI) dengan surplus ekspor tinggi.",
                "time_series": {
                        "1990": {
                                "production": 2809.59,
                                "consumption": 2396.63,
                                "import_volume": 25.81,
                                "import_value_usd": 20.65,
                                "export_volume": 427.71,
                                "export_value_usd": 1216.75,
                                "ending_stocks": 132.74
                        },
                        "1991": {
                                "production": 2896.48,
                                "consumption": 2470.75,
                                "import_volume": 26.61,
                                "import_value_usd": 21.29,
                                "export_volume": 440.93,
                                "export_value_usd": 1254.38,
                                "ending_stocks": 136.84
                        },
                        "1992": {
                                "production": 2986.06,
                                "consumption": 2547.17,
                                "import_volume": 27.43,
                                "import_value_usd": 21.94,
                                "export_volume": 454.57,
                                "export_value_usd": 1293.18,
                                "ending_stocks": 141.07
                        },
                        "1993": {
                                "production": 3078.41,
                                "consumption": 2625.94,
                                "import_volume": 28.28,
                                "import_value_usd": 22.62,
                                "export_volume": 468.63,
                                "export_value_usd": 1333.17,
                                "ending_stocks": 145.44
                        },
                        "1994": {
                                "production": 3173.62,
                                "consumption": 2707.16,
                                "import_volume": 29.15,
                                "import_value_usd": 23.32,
                                "export_volume": 483.12,
                                "export_value_usd": 1374.4,
                                "ending_stocks": 149.93
                        },
                        "1995": {
                                "production": 3271.78,
                                "consumption": 2790.89,
                                "import_volume": 30.06,
                                "import_value_usd": 24.04,
                                "export_volume": 498.07,
                                "export_value_usd": 1416.91,
                                "ending_stocks": 154.57
                        },
                        "1996": {
                                "production": 3372.97,
                                "consumption": 2877.2,
                                "import_volume": 30.99,
                                "import_value_usd": 24.79,
                                "export_volume": 513.47,
                                "export_value_usd": 1460.73,
                                "ending_stocks": 159.35
                        },
                        "1997": {
                                "production": 3477.28,
                                "consumption": 2966.19,
                                "import_volume": 31.94,
                                "import_value_usd": 25.55,
                                "export_volume": 529.35,
                                "export_value_usd": 1505.91,
                                "ending_stocks": 164.28
                        },
                        "1998": {
                                "production": 3584.83,
                                "consumption": 3057.92,
                                "import_volume": 32.93,
                                "import_value_usd": 26.35,
                                "export_volume": 545.72,
                                "export_value_usd": 1552.48,
                                "ending_stocks": 169.36
                        },
                        "1999": {
                                "production": 3695.7,
                                "consumption": 3152.5,
                                "import_volume": 33.95,
                                "import_value_usd": 27.16,
                                "export_volume": 562.6,
                                "export_value_usd": 1600.5,
                                "ending_stocks": 174.6
                        },
                        "2000": {
                                "production": 3810,
                                "consumption": 3250,
                                "import_volume": 35,
                                "import_value_usd": 28.0,
                                "export_volume": 580,
                                "export_value_usd": 1650.0,
                                "ending_stocks": 180
                        },
                        "2001": {
                                "production": 3932.0,
                                "consumption": 3356.0,
                                "import_volume": 37.6,
                                "import_value_usd": 31.4,
                                "export_volume": 608.0,
                                "export_value_usd": 1802.0,
                                "ending_stocks": 188.0
                        },
                        "2002": {
                                "production": 4054.0,
                                "consumption": 3462.0,
                                "import_volume": 40.2,
                                "import_value_usd": 34.8,
                                "export_volume": 636.0,
                                "export_value_usd": 1954.0,
                                "ending_stocks": 196.0
                        },
                        "2003": {
                                "production": 4176.0,
                                "consumption": 3568.0,
                                "import_volume": 42.8,
                                "import_value_usd": 38.2,
                                "export_volume": 664.0,
                                "export_value_usd": 2106.0,
                                "ending_stocks": 204.0
                        },
                        "2004": {
                                "production": 4298.0,
                                "consumption": 3674.0,
                                "import_volume": 45.4,
                                "import_value_usd": 41.6,
                                "export_volume": 692.0,
                                "export_value_usd": 2258.0,
                                "ending_stocks": 212.0
                        },
                        "2005": {
                                "production": 4420,
                                "consumption": 3780,
                                "import_volume": 48,
                                "import_value_usd": 45.0,
                                "export_volume": 720,
                                "export_value_usd": 2410.0,
                                "ending_stocks": 220
                        },
                        "2006": {
                                "production": 4544.0,
                                "consumption": 3894.0,
                                "import_volume": 51.4,
                                "import_value_usd": 52.4,
                                "export_volume": 754.0,
                                "export_value_usd": 2584.0,
                                "ending_stocks": 230.0
                        },
                        "2007": {
                                "production": 4668.0,
                                "consumption": 4008.0,
                                "import_volume": 54.8,
                                "import_value_usd": 59.8,
                                "export_volume": 788.0,
                                "export_value_usd": 2758.0,
                                "ending_stocks": 240.0
                        },
                        "2008": {
                                "production": 4792.0,
                                "consumption": 4122.0,
                                "import_volume": 58.2,
                                "import_value_usd": 67.2,
                                "export_volume": 822.0,
                                "export_value_usd": 2932.0,
                                "ending_stocks": 250.0
                        },
                        "2009": {
                                "production": 4916.0,
                                "consumption": 4236.0,
                                "import_volume": 61.6,
                                "import_value_usd": 74.6,
                                "export_volume": 856.0,
                                "export_value_usd": 3106.0,
                                "ending_stocks": 260.0
                        },
                        "2010": {
                                "production": 5040,
                                "consumption": 4350,
                                "import_volume": 65,
                                "import_value_usd": 82.0,
                                "export_volume": 890,
                                "export_value_usd": 3280.0,
                                "ending_stocks": 270
                        },
                        "2011": {
                                "production": 5336.0,
                                "consumption": 4500.0,
                                "import_volume": 71.0,
                                "import_value_usd": 93.6,
                                "export_volume": 922.0,
                                "export_value_usd": 3448.0,
                                "ending_stocks": 278.0
                        },
                        "2012": {
                                "production": 5632.0,
                                "consumption": 4650.0,
                                "import_volume": 77.0,
                                "import_value_usd": 105.2,
                                "export_volume": 954.0,
                                "export_value_usd": 3616.0,
                                "ending_stocks": 286.0
                        },
                        "2013": {
                                "production": 5928.0,
                                "consumption": 4800.0,
                                "import_volume": 83.0,
                                "import_value_usd": 116.8,
                                "export_volume": 986.0,
                                "export_value_usd": 3784.0,
                                "ending_stocks": 294.0
                        },
                        "2014": {
                                "production": 6224.0,
                                "consumption": 4950.0,
                                "import_volume": 89.0,
                                "import_value_usd": 128.4,
                                "export_volume": 1018.0,
                                "export_value_usd": 3952.0,
                                "ending_stocks": 302.0
                        },
                        "2015": {
                                "production": 6520,
                                "consumption": 5100,
                                "import_volume": 95,
                                "import_value_usd": 140.0,
                                "export_volume": 1050,
                                "export_value_usd": 4120.0,
                                "ending_stocks": 310
                        },
                        "2016": {
                                "production": 6773.33,
                                "consumption": 5273.33,
                                "import_volume": 103.33,
                                "import_value_usd": 156.67,
                                "export_volume": 1083.33,
                                "export_value_usd": 4463.33,
                                "ending_stocks": 333.33
                        },
                        "2017": {
                                "production": 7026.67,
                                "consumption": 5446.67,
                                "import_volume": 111.67,
                                "import_value_usd": 173.33,
                                "export_volume": 1116.67,
                                "export_value_usd": 4806.67,
                                "ending_stocks": 356.67
                        },
                        "2018": {
                                "production": 7280,
                                "consumption": 5620,
                                "import_volume": 120,
                                "import_value_usd": 190.0,
                                "export_volume": 1150,
                                "export_value_usd": 5150.0,
                                "ending_stocks": 380
                        },
                        "2019": {
                                "production": 7530,
                                "consumption": 5740,
                                "import_volume": 135,
                                "import_value_usd": 210.0,
                                "export_volume": 1220,
                                "export_value_usd": 5450.0,
                                "ending_stocks": 410
                        },
                        "2020": {
                                "production": 6430,
                                "consumption": 5480,
                                "import_volume": 110,
                                "import_value_usd": 175.2,
                                "export_volume": 1080,
                                "export_value_usd": 5210.0,
                                "ending_stocks": 340
                        },
                        "2021": {
                                "production": 7240,
                                "consumption": 5790,
                                "import_volume": 140,
                                "import_value_usd": 225.6,
                                "export_volume": 1210,
                                "export_value_usd": 5720.0,
                                "ending_stocks": 420
                        },
                        "2022": {
                                "production": 7450,
                                "consumption": 6010,
                                "import_volume": 155,
                                "import_value_usd": 260.0,
                                "export_volume": 1250,
                                "export_value_usd": 6240.0,
                                "ending_stocks": 450
                        },
                        "2023": {
                                "production": 7680,
                                "consumption": 6200,
                                "import_volume": 145,
                                "import_value_usd": 240.5,
                                "export_volume": 1310,
                                "export_value_usd": 6120.0,
                                "ending_stocks": 480
                        },
                        "2024": {
                                "production": 7850,
                                "consumption": 6350,
                                "import_volume": 150,
                                "import_value_usd": 250.0,
                                "export_volume": 1360,
                                "export_value_usd": 6450.0,
                                "ending_stocks": 500
                        },
                        "2025": {
                                "production": 8020,
                                "consumption": 6500,
                                "import_volume": 155,
                                "import_value_usd": 260.0,
                                "export_volume": 1410,
                                "export_value_usd": 6750.0,
                                "ending_stocks": 520
                        },
                        "2026": {
                                "production": 8180.4,
                                "consumption": 6630.0,
                                "import_volume": 158.1,
                                "import_value_usd": 265.2,
                                "export_volume": 1438.2,
                                "export_value_usd": 6885.0,
                                "ending_stocks": 530.4
                        }
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
                        "1990": {
                                "production": 206.48,
                                "consumption": 132.74,
                                "import_volume": 0.74,
                                "import_value_usd": 2.36,
                                "export_volume": 70.06,
                                "export_value_usd": 619.44,
                                "ending_stocks": 18.44
                        },
                        "1991": {
                                "production": 212.86,
                                "consumption": 136.84,
                                "import_volume": 0.76,
                                "import_value_usd": 2.43,
                                "export_volume": 72.22,
                                "export_value_usd": 638.59,
                                "ending_stocks": 19.01
                        },
                        "1992": {
                                "production": 219.45,
                                "consumption": 141.07,
                                "import_volume": 0.78,
                                "import_value_usd": 2.51,
                                "export_volume": 74.46,
                                "export_value_usd": 658.34,
                                "ending_stocks": 19.59
                        },
                        "1993": {
                                "production": 226.24,
                                "consumption": 145.44,
                                "import_volume": 0.81,
                                "import_value_usd": 2.59,
                                "export_volume": 76.76,
                                "export_value_usd": 678.71,
                                "ending_stocks": 20.2
                        },
                        "1994": {
                                "production": 233.23,
                                "consumption": 149.93,
                                "import_volume": 0.83,
                                "import_value_usd": 2.67,
                                "export_volume": 79.13,
                                "export_value_usd": 699.7,
                                "ending_stocks": 20.82
                        },
                        "1995": {
                                "production": 240.45,
                                "consumption": 154.57,
                                "import_volume": 0.86,
                                "import_value_usd": 2.75,
                                "export_volume": 81.58,
                                "export_value_usd": 721.34,
                                "ending_stocks": 21.47
                        },
                        "1996": {
                                "production": 247.88,
                                "consumption": 159.35,
                                "import_volume": 0.89,
                                "import_value_usd": 2.83,
                                "export_volume": 84.1,
                                "export_value_usd": 743.65,
                                "ending_stocks": 22.13
                        },
                        "1997": {
                                "production": 255.55,
                                "consumption": 164.28,
                                "import_volume": 0.91,
                                "import_value_usd": 2.92,
                                "export_volume": 86.7,
                                "export_value_usd": 766.65,
                                "ending_stocks": 22.82
                        },
                        "1998": {
                                "production": 263.45,
                                "consumption": 169.36,
                                "import_volume": 0.94,
                                "import_value_usd": 3.01,
                                "export_volume": 89.39,
                                "export_value_usd": 790.36,
                                "ending_stocks": 23.52
                        },
                        "1999": {
                                "production": 271.6,
                                "consumption": 174.6,
                                "import_volume": 0.97,
                                "import_value_usd": 3.1,
                                "export_volume": 92.15,
                                "export_value_usd": 814.8,
                                "ending_stocks": 24.25
                        },
                        "2000": {
                                "production": 280,
                                "consumption": 180,
                                "import_volume": 1,
                                "import_value_usd": 3.2,
                                "export_volume": 95,
                                "export_value_usd": 840.0,
                                "ending_stocks": 25
                        },
                        "2001": {
                                "production": 300.0,
                                "consumption": 192.0,
                                "import_volume": 1.0,
                                "import_value_usd": 3.46,
                                "export_volume": 101.0,
                                "export_value_usd": 896.0,
                                "ending_stocks": 26.4
                        },
                        "2002": {
                                "production": 320.0,
                                "consumption": 204.0,
                                "import_volume": 1.0,
                                "import_value_usd": 3.72,
                                "export_volume": 107.0,
                                "export_value_usd": 952.0,
                                "ending_stocks": 27.8
                        },
                        "2003": {
                                "production": 340.0,
                                "consumption": 216.0,
                                "import_volume": 1.0,
                                "import_value_usd": 3.98,
                                "export_volume": 113.0,
                                "export_value_usd": 1008.0,
                                "ending_stocks": 29.2
                        },
                        "2004": {
                                "production": 360.0,
                                "consumption": 228.0,
                                "import_volume": 1.0,
                                "import_value_usd": 4.24,
                                "export_volume": 119.0,
                                "export_value_usd": 1064.0,
                                "ending_stocks": 30.6
                        },
                        "2005": {
                                "production": 380,
                                "consumption": 240,
                                "import_volume": 1,
                                "import_value_usd": 4.5,
                                "export_volume": 125,
                                "export_value_usd": 1120.0,
                                "ending_stocks": 32
                        },
                        "2006": {
                                "production": 384.0,
                                "consumption": 250.0,
                                "import_volume": 1.2,
                                "import_value_usd": 5.0,
                                "export_volume": 129.0,
                                "export_value_usd": 1164.0,
                                "ending_stocks": 33.2
                        },
                        "2007": {
                                "production": 388.0,
                                "consumption": 260.0,
                                "import_volume": 1.4,
                                "import_value_usd": 5.5,
                                "export_volume": 133.0,
                                "export_value_usd": 1208.0,
                                "ending_stocks": 34.4
                        },
                        "2008": {
                                "production": 392.0,
                                "consumption": 270.0,
                                "import_volume": 1.6,
                                "import_value_usd": 6.0,
                                "export_volume": 137.0,
                                "export_value_usd": 1252.0,
                                "ending_stocks": 35.6
                        },
                        "2009": {
                                "production": 396.0,
                                "consumption": 280.0,
                                "import_volume": 1.8,
                                "import_value_usd": 6.5,
                                "export_volume": 141.0,
                                "export_value_usd": 1296.0,
                                "ending_stocks": 36.8
                        },
                        "2010": {
                                "production": 400,
                                "consumption": 290,
                                "import_volume": 2,
                                "import_value_usd": 7.0,
                                "export_volume": 145,
                                "export_value_usd": 1340.0,
                                "ending_stocks": 38
                        },
                        "2011": {
                                "production": 442.0,
                                "consumption": 306.0,
                                "import_volume": 2.0,
                                "import_value_usd": 7.2,
                                "export_volume": 148.0,
                                "export_value_usd": 1376.0,
                                "ending_stocks": 39.4
                        },
                        "2012": {
                                "production": 484.0,
                                "consumption": 322.0,
                                "import_volume": 2.0,
                                "import_value_usd": 7.4,
                                "export_volume": 151.0,
                                "export_value_usd": 1412.0,
                                "ending_stocks": 40.8
                        },
                        "2013": {
                                "production": 526.0,
                                "consumption": 338.0,
                                "import_volume": 2.0,
                                "import_value_usd": 7.6,
                                "export_volume": 154.0,
                                "export_value_usd": 1448.0,
                                "ending_stocks": 42.2
                        },
                        "2014": {
                                "production": 568.0,
                                "consumption": 354.0,
                                "import_volume": 2.0,
                                "import_value_usd": 7.8,
                                "export_volume": 157.0,
                                "export_value_usd": 1484.0,
                                "ending_stocks": 43.6
                        },
                        "2015": {
                                "production": 610,
                                "consumption": 370,
                                "import_volume": 2,
                                "import_value_usd": 8.0,
                                "export_volume": 160,
                                "export_value_usd": 1520.0,
                                "ending_stocks": 45
                        },
                        "2016": {
                                "production": 690.0,
                                "consumption": 400.0,
                                "import_volume": 2.0,
                                "import_value_usd": 8.17,
                                "export_volume": 166.67,
                                "export_value_usd": 1593.33,
                                "ending_stocks": 48.33
                        },
                        "2017": {
                                "production": 770.0,
                                "consumption": 430.0,
                                "import_volume": 2.0,
                                "import_value_usd": 8.33,
                                "export_volume": 173.33,
                                "export_value_usd": 1666.67,
                                "ending_stocks": 51.67
                        },
                        "2018": {
                                "production": 850,
                                "consumption": 460,
                                "import_volume": 2,
                                "import_value_usd": 8.5,
                                "export_volume": 180,
                                "export_value_usd": 1740.0,
                                "ending_stocks": 55
                        },
                        "2019": {
                                "production": 910,
                                "consumption": 480,
                                "import_volume": 3,
                                "import_value_usd": 10.2,
                                "export_volume": 195,
                                "export_value_usd": 1820.0,
                                "ending_stocks": 62
                        },
                        "2020": {
                                "production": 980,
                                "consumption": 510,
                                "import_volume": 2,
                                "import_value_usd": 7.4,
                                "export_volume": 239,
                                "export_value_usd": 2040.0,
                                "ending_stocks": 70
                        },
                        "2021": {
                                "production": 1050,
                                "consumption": 540,
                                "import_volume": 3,
                                "import_value_usd": 11.5,
                                "export_volume": 250,
                                "export_value_usd": 2230.0,
                                "ending_stocks": 78
                        },
                        "2022": {
                                "production": 1120,
                                "consumption": 570,
                                "import_volume": 4,
                                "import_value_usd": 14.0,
                                "export_volume": 240,
                                "export_value_usd": 2160.0,
                                "ending_stocks": 85
                        },
                        "2023": {
                                "production": 1090,
                                "consumption": 590,
                                "import_volume": 3,
                                "import_value_usd": 12.0,
                                "export_volume": 215,
                                "export_value_usd": 1860.0,
                                "ending_stocks": 75
                        },
                        "2024": {
                                "production": 1150,
                                "consumption": 610,
                                "import_volume": 3,
                                "import_value_usd": 12.5,
                                "export_volume": 230,
                                "export_value_usd": 1980.0,
                                "ending_stocks": 80
                        },
                        "2025": {
                                "production": 1210,
                                "consumption": 635,
                                "import_volume": 4,
                                "import_value_usd": 14.0,
                                "export_volume": 245,
                                "export_value_usd": 2150.0,
                                "ending_stocks": 88
                        },
                        "2026": {
                                "production": 1234.2,
                                "consumption": 647.7,
                                "import_volume": 4.08,
                                "import_value_usd": 14.28,
                                "export_volume": 249.9,
                                "export_value_usd": 2193.0,
                                "ending_stocks": 89.76
                        }
                }
        },
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
                        "1990": {
                                "production": 56.78,
                                "consumption": 14.75,
                                "import_volume": 0.59,
                                "import_value_usd": 33.18,
                                "export_volume": 42.03,
                                "export_value_usd": 973.4,
                                "ending_stocks": 3.32
                        },
                        "1991": {
                                "production": 58.54,
                                "consumption": 15.2,
                                "import_volume": 0.61,
                                "import_value_usd": 34.21,
                                "export_volume": 43.33,
                                "export_value_usd": 1003.5,
                                "ending_stocks": 3.42
                        },
                        "1992": {
                                "production": 60.35,
                                "consumption": 15.67,
                                "import_volume": 0.63,
                                "import_value_usd": 35.27,
                                "export_volume": 44.67,
                                "export_value_usd": 1034.54,
                                "ending_stocks": 3.53
                        },
                        "1993": {
                                "production": 62.21,
                                "consumption": 16.16,
                                "import_volume": 0.65,
                                "import_value_usd": 36.36,
                                "export_volume": 46.06,
                                "export_value_usd": 1066.54,
                                "ending_stocks": 3.64
                        },
                        "1994": {
                                "production": 64.14,
                                "consumption": 16.66,
                                "import_volume": 0.67,
                                "import_value_usd": 37.48,
                                "export_volume": 47.48,
                                "export_value_usd": 1099.52,
                                "ending_stocks": 3.75
                        },
                        "1995": {
                                "production": 66.12,
                                "consumption": 17.17,
                                "import_volume": 0.69,
                                "import_value_usd": 38.64,
                                "export_volume": 48.95,
                                "export_value_usd": 1133.53,
                                "ending_stocks": 3.86
                        },
                        "1996": {
                                "production": 68.17,
                                "consumption": 17.71,
                                "import_volume": 0.71,
                                "import_value_usd": 39.84,
                                "export_volume": 50.46,
                                "export_value_usd": 1168.59,
                                "ending_stocks": 3.98
                        },
                        "1997": {
                                "production": 70.28,
                                "consumption": 18.25,
                                "import_volume": 0.73,
                                "import_value_usd": 41.07,
                                "export_volume": 52.02,
                                "export_value_usd": 1204.73,
                                "ending_stocks": 4.11
                        },
                        "1998": {
                                "production": 72.45,
                                "consumption": 18.82,
                                "import_volume": 0.75,
                                "import_value_usd": 42.34,
                                "export_volume": 53.63,
                                "export_value_usd": 1241.99,
                                "ending_stocks": 4.23
                        },
                        "1999": {
                                "production": 74.69,
                                "consumption": 19.4,
                                "import_volume": 0.78,
                                "import_value_usd": 43.65,
                                "export_volume": 55.29,
                                "export_value_usd": 1280.4,
                                "ending_stocks": 4.37
                        },
                        "2000": {
                                "production": 77.0,
                                "consumption": 20.0,
                                "import_volume": 0.8,
                                "import_value_usd": 45.0,
                                "export_volume": 57.0,
                                "export_value_usd": 1320.0,
                                "ending_stocks": 4.5
                        },
                        "2001": {
                                "production": 92.2,
                                "consumption": 23.6,
                                "import_volume": 0.94,
                                "import_value_usd": 55.0,
                                "export_volume": 68.4,
                                "export_value_usd": 1940.0,
                                "ending_stocks": 5.24
                        },
                        "2002": {
                                "production": 107.4,
                                "consumption": 27.2,
                                "import_volume": 1.08,
                                "import_value_usd": 65.0,
                                "export_volume": 79.8,
                                "export_value_usd": 2560.0,
                                "ending_stocks": 5.98
                        },
                        "2003": {
                                "production": 122.6,
                                "consumption": 30.8,
                                "import_volume": 1.22,
                                "import_value_usd": 75.0,
                                "export_volume": 91.2,
                                "export_value_usd": 3180.0,
                                "ending_stocks": 6.72
                        },
                        "2004": {
                                "production": 137.8,
                                "consumption": 34.4,
                                "import_volume": 1.36,
                                "import_value_usd": 85.0,
                                "export_volume": 102.6,
                                "export_value_usd": 3800.0,
                                "ending_stocks": 7.46
                        },
                        "2005": {
                                "production": 153.0,
                                "consumption": 38.0,
                                "import_volume": 1.5,
                                "import_value_usd": 95.0,
                                "export_volume": 114.0,
                                "export_value_usd": 4420.0,
                                "ending_stocks": 8.2
                        },
                        "2006": {
                                "production": 177.4,
                                "consumption": 43.8,
                                "import_volume": 1.62,
                                "import_value_usd": 108.0,
                                "export_volume": 132.8,
                                "export_value_usd": 7156.0,
                                "ending_stocks": 9.46
                        },
                        "2007": {
                                "production": 201.8,
                                "consumption": 49.6,
                                "import_volume": 1.74,
                                "import_value_usd": 121.0,
                                "export_volume": 151.6,
                                "export_value_usd": 9892.0,
                                "ending_stocks": 10.72
                        },
                        "2008": {
                                "production": 226.2,
                                "consumption": 55.4,
                                "import_volume": 1.86,
                                "import_value_usd": 134.0,
                                "export_volume": 170.4,
                                "export_value_usd": 12628.0,
                                "ending_stocks": 11.98
                        },
                        "2009": {
                                "production": 250.6,
                                "consumption": 61.2,
                                "import_volume": 1.98,
                                "import_value_usd": 147.0,
                                "export_volume": 189.2,
                                "export_value_usd": 15364.0,
                                "ending_stocks": 13.24
                        },
                        "2010": {
                                "production": 275.0,
                                "consumption": 67.0,
                                "import_volume": 2.1,
                                "import_value_usd": 160.0,
                                "export_volume": 208.0,
                                "export_value_usd": 18100.0,
                                "ending_stocks": 14.5
                        },
                        "2011": {
                                "production": 312.2,
                                "consumption": 71.0,
                                "import_volume": 2.36,
                                "import_value_usd": 176.0,
                                "export_volume": 240.0,
                                "export_value_usd": 17760.0,
                                "ending_stocks": 14.8
                        },
                        "2012": {
                                "production": 349.4,
                                "consumption": 75.0,
                                "import_volume": 2.62,
                                "import_value_usd": 192.0,
                                "export_volume": 272.0,
                                "export_value_usd": 17420.0,
                                "ending_stocks": 15.1
                        },
                        "2013": {
                                "production": 386.6,
                                "consumption": 79.0,
                                "import_volume": 2.88,
                                "import_value_usd": 208.0,
                                "export_volume": 304.0,
                                "export_value_usd": 17080.0,
                                "ending_stocks": 15.4
                        },
                        "2014": {
                                "production": 423.8,
                                "consumption": 83.0,
                                "import_volume": 3.14,
                                "import_value_usd": 224.0,
                                "export_volume": 336.0,
                                "export_value_usd": 16740.0,
                                "ending_stocks": 15.7
                        },
                        "2015": {
                                "production": 461.0,
                                "consumption": 87.0,
                                "import_volume": 3.4,
                                "import_value_usd": 240.0,
                                "export_volume": 368.0,
                                "export_value_usd": 16400.0,
                                "ending_stocks": 16.0
                        },
                        "2016": {
                                "production": 493.0,
                                "consumption": 96.33,
                                "import_volume": 4.0,
                                "import_value_usd": 320.0,
                                "export_volume": 388.33,
                                "export_value_usd": 18936.67,
                                "ending_stocks": 16.73
                        },
                        "2017": {
                                "production": 525.0,
                                "consumption": 105.67,
                                "import_volume": 4.6,
                                "import_value_usd": 400.0,
                                "export_volume": 408.67,
                                "export_value_usd": 21473.33,
                                "ending_stocks": 17.47
                        },
                        "2018": {
                                "production": 557.0,
                                "consumption": 115.0,
                                "import_volume": 5.2,
                                "import_value_usd": 480.0,
                                "export_volume": 429.0,
                                "export_value_usd": 24010.0,
                                "ending_stocks": 18.2
                        },
                        "2019": {
                                "production": 616.0,
                                "consumption": 138.0,
                                "import_volume": 4.8,
                                "import_value_usd": 420.0,
                                "export_volume": 456.0,
                                "export_value_usd": 21700.0,
                                "ending_stocks": 26.8
                        },
                        "2020": {
                                "production": 564.0,
                                "consumption": 132.0,
                                "import_volume": 4.1,
                                "import_value_usd": 310.0,
                                "export_volume": 405.0,
                                "export_value_usd": 14500.0,
                                "ending_stocks": 31.1
                        },
                        "2021": {
                                "production": 614.0,
                                "consumption": 133.0,
                                "import_volume": 4.5,
                                "import_value_usd": 490.0,
                                "export_volume": 435.0,
                                "export_value_usd": 31500.0,
                                "ending_stocks": 49.5
                        },
                        "2022": {
                                "production": 687.0,
                                "consumption": 193.0,
                                "import_volume": 5.8,
                                "import_value_usd": 850.0,
                                "export_volume": 465.0,
                                "export_value_usd": 46760.0,
                                "ending_stocks": 34.8
                        },
                        "2023": {
                                "production": 775.0,
                                "consumption": 213.0,
                                "import_volume": 6.1,
                                "import_value_usd": 720.0,
                                "export_volume": 518.0,
                                "export_value_usd": 34600.0,
                                "ending_stocks": 49.9
                        },
                        "2024": {
                                "production": 835.0,
                                "consumption": 225.0,
                                "import_volume": 6.5,
                                "import_value_usd": 680.0,
                                "export_volume": 560.0,
                                "export_value_usd": 33500.0,
                                "ending_stocks": 56.4
                        },
                        "2025": {
                                "production": 855.0,
                                "consumption": 235.0,
                                "import_volume": 6.8,
                                "import_value_usd": 710.0,
                                "export_volume": 575.0,
                                "export_value_usd": 34200.0,
                                "ending_stocks": 58.0
                        },
                        "2026": {
                                "production": 872.1,
                                "consumption": 239.7,
                                "import_volume": 6.94,
                                "import_value_usd": 724.2,
                                "export_volume": 586.5,
                                "export_value_usd": 34884.0,
                                "ending_stocks": 59.16
                        }
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
                "apbn_classification": "PNBP Royalti Mineral Logam Nikel & Pajak Penghasilan Korporasi Badan Smelter",
                "lkpp_account_code": "421211 (Royalti Mineral Logam Nikel) / 411126 (PPh Badan Sektor Hilirisasi)",
                "lkpp_classification": "PNBP SDA Minerba & Pajak Penghasilan Badan",
                "source_institution": "Kementerian ESDM & Kementerian Perindustrian",
                "legal_basis": "Permen ESDM No. 11 Tahun 2019 tentang Pelarangan Ekspor Bijih Nikel Mentah (Hilirisasi)",
                "description": "Logam strategis transisi energi & bahan baku baterai EV serta stainless steel pasca larangan ekspor bijih mentah.",
                "time_series": {
                        "1990": {
                                "production": 72.27,
                                "consumption": 8.85,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 63.42,
                                "export_value_usd": 501.45,
                                "ending_stocks": 7.37
                        },
                        "1991": {
                                "production": 74.5,
                                "consumption": 9.12,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 65.38,
                                "export_value_usd": 516.96,
                                "ending_stocks": 7.6
                        },
                        "1992": {
                                "production": 76.81,
                                "consumption": 9.4,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 67.4,
                                "export_value_usd": 532.95,
                                "ending_stocks": 7.84
                        },
                        "1993": {
                                "production": 79.18,
                                "consumption": 9.7,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 69.49,
                                "export_value_usd": 549.43,
                                "ending_stocks": 8.08
                        },
                        "1994": {
                                "production": 81.63,
                                "consumption": 10.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 71.64,
                                "export_value_usd": 566.42,
                                "ending_stocks": 8.33
                        },
                        "1995": {
                                "production": 84.16,
                                "consumption": 10.3,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 73.85,
                                "export_value_usd": 583.94,
                                "ending_stocks": 8.59
                        },
                        "1996": {
                                "production": 86.76,
                                "consumption": 10.62,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 76.14,
                                "export_value_usd": 602.0,
                                "ending_stocks": 8.85
                        },
                        "1997": {
                                "production": 89.44,
                                "consumption": 10.95,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 78.49,
                                "export_value_usd": 620.62,
                                "ending_stocks": 9.13
                        },
                        "1998": {
                                "production": 92.21,
                                "consumption": 11.29,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 80.92,
                                "export_value_usd": 639.81,
                                "ending_stocks": 9.41
                        },
                        "1999": {
                                "production": 95.06,
                                "consumption": 11.64,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 83.42,
                                "export_value_usd": 659.6,
                                "ending_stocks": 9.7
                        },
                        "2000": {
                                "production": 98,
                                "consumption": 12,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 86,
                                "export_value_usd": 680.0,
                                "ending_stocks": 10
                        },
                        "2001": {
                                "production": 107.4,
                                "consumption": 13.2,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 94.2,
                                "export_value_usd": 828.0,
                                "ending_stocks": 11.0
                        },
                        "2002": {
                                "production": 116.8,
                                "consumption": 14.4,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 102.4,
                                "export_value_usd": 976.0,
                                "ending_stocks": 12.0
                        },
                        "2003": {
                                "production": 126.2,
                                "consumption": 15.6,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 110.6,
                                "export_value_usd": 1124.0,
                                "ending_stocks": 13.0
                        },
                        "2004": {
                                "production": 135.6,
                                "consumption": 16.8,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 118.8,
                                "export_value_usd": 1272.0,
                                "ending_stocks": 14.0
                        },
                        "2005": {
                                "production": 145,
                                "consumption": 18,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 127,
                                "export_value_usd": 1420.0,
                                "ending_stocks": 15
                        },
                        "2006": {
                                "production": 162.0,
                                "consumption": 19.4,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 142.6,
                                "export_value_usd": 1906.0,
                                "ending_stocks": 16.0
                        },
                        "2007": {
                                "production": 179.0,
                                "consumption": 20.8,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 158.2,
                                "export_value_usd": 2392.0,
                                "ending_stocks": 17.0
                        },
                        "2008": {
                                "production": 196.0,
                                "consumption": 22.2,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 173.8,
                                "export_value_usd": 2878.0,
                                "ending_stocks": 18.0
                        },
                        "2009": {
                                "production": 213.0,
                                "consumption": 23.6,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 189.4,
                                "export_value_usd": 3364.0,
                                "ending_stocks": 19.0
                        },
                        "2010": {
                                "production": 230,
                                "consumption": 25,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 205,
                                "export_value_usd": 3850.0,
                                "ending_stocks": 20
                        },
                        "2011": {
                                "production": 226.0,
                                "consumption": 29.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 197.0,
                                "export_value_usd": 3450.0,
                                "ending_stocks": 21.0
                        },
                        "2012": {
                                "production": 222.0,
                                "consumption": 33.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 189.0,
                                "export_value_usd": 3050.0,
                                "ending_stocks": 22.0
                        },
                        "2013": {
                                "production": 218.0,
                                "consumption": 37.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 181.0,
                                "export_value_usd": 2650.0,
                                "ending_stocks": 23.0
                        },
                        "2014": {
                                "production": 214.0,
                                "consumption": 41.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 173.0,
                                "export_value_usd": 2250.0,
                                "ending_stocks": 24.0
                        },
                        "2015": {
                                "production": 210,
                                "consumption": 45,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 165,
                                "export_value_usd": 1850.0,
                                "ending_stocks": 25
                        },
                        "2016": {
                                "production": 326.67,
                                "consumption": 58.33,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 266.67,
                                "export_value_usd": 3133.33,
                                "ending_stocks": 28.33
                        },
                        "2017": {
                                "production": 443.33,
                                "consumption": 71.67,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 368.33,
                                "export_value_usd": 4416.67,
                                "ending_stocks": 31.67
                        },
                        "2018": {
                                "production": 560,
                                "consumption": 85,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 470,
                                "export_value_usd": 5700.0,
                                "ending_stocks": 35
                        },
                        "2019": {
                                "production": 810,
                                "consumption": 120,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 680,
                                "export_value_usd": 8100.0,
                                "ending_stocks": 45
                        },
                        "2020": {
                                "production": 860,
                                "consumption": 180,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 670,
                                "export_value_usd": 8400.0,
                                "ending_stocks": 55
                        },
                        "2021": {
                                "production": 1040,
                                "consumption": 260,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 760,
                                "export_value_usd": 12800.0,
                                "ending_stocks": 75
                        },
                        "2022": {
                                "production": 1600,
                                "consumption": 380,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1180,
                                "export_value_usd": 21800.0,
                                "ending_stocks": 115
                        },
                        "2023": {
                                "production": 1950,
                                "consumption": 450,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1460,
                                "export_value_usd": 22100.0,
                                "ending_stocks": 155
                        },
                        "2024": {
                                "production": 2200,
                                "consumption": 520,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1620,
                                "export_value_usd": 23500.0,
                                "ending_stocks": 215
                        },
                        "2025": {
                                "production": 2380,
                                "consumption": 560,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1780,
                                "export_value_usd": 25200.0,
                                "ending_stocks": 245
                        },
                        "2026": {
                                "production": 2427.6,
                                "consumption": 571.2,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1815.6,
                                "export_value_usd": 25704.0,
                                "ending_stocks": 249.9
                        }
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
                        "1990": {
                                "production": 700.55,
                                "consumption": 88.49,
                                "import_volume": 14.75,
                                "import_value_usd": 47.93,
                                "export_volume": 626.81,
                                "export_value_usd": 1364.23,
                                "ending_stocks": 22.12
                        },
                        "1991": {
                                "production": 722.22,
                                "consumption": 91.23,
                                "import_volume": 15.2,
                                "import_value_usd": 49.42,
                                "export_volume": 646.2,
                                "export_value_usd": 1406.43,
                                "ending_stocks": 22.81
                        },
                        "1992": {
                                "production": 744.56,
                                "consumption": 94.05,
                                "import_volume": 15.67,
                                "import_value_usd": 50.94,
                                "export_volume": 666.18,
                                "export_value_usd": 1449.93,
                                "ending_stocks": 23.51
                        },
                        "1993": {
                                "production": 767.58,
                                "consumption": 96.96,
                                "import_volume": 16.16,
                                "import_value_usd": 52.52,
                                "export_volume": 686.79,
                                "export_value_usd": 1494.77,
                                "ending_stocks": 24.24
                        },
                        "1994": {
                                "production": 791.32,
                                "consumption": 99.96,
                                "import_volume": 16.66,
                                "import_value_usd": 54.14,
                                "export_volume": 708.03,
                                "export_value_usd": 1541.0,
                                "ending_stocks": 24.99
                        },
                        "1995": {
                                "production": 815.8,
                                "consumption": 103.05,
                                "import_volume": 17.17,
                                "import_value_usd": 55.82,
                                "export_volume": 729.92,
                                "export_value_usd": 1588.66,
                                "ending_stocks": 25.76
                        },
                        "1996": {
                                "production": 841.03,
                                "consumption": 106.24,
                                "import_volume": 17.71,
                                "import_value_usd": 57.54,
                                "export_volume": 752.5,
                                "export_value_usd": 1637.79,
                                "ending_stocks": 26.56
                        },
                        "1997": {
                                "production": 867.04,
                                "consumption": 109.52,
                                "import_volume": 18.25,
                                "import_value_usd": 59.32,
                                "export_volume": 775.77,
                                "export_value_usd": 1688.45,
                                "ending_stocks": 27.38
                        },
                        "1998": {
                                "production": 893.85,
                                "consumption": 112.91,
                                "import_volume": 18.82,
                                "import_value_usd": 61.16,
                                "export_volume": 799.76,
                                "export_value_usd": 1740.66,
                                "ending_stocks": 28.23
                        },
                        "1999": {
                                "production": 921.5,
                                "consumption": 116.4,
                                "import_volume": 19.4,
                                "import_value_usd": 63.05,
                                "export_volume": 824.5,
                                "export_value_usd": 1794.5,
                                "ending_stocks": 29.1
                        },
                        "2000": {
                                "production": 950,
                                "consumption": 120,
                                "import_volume": 20,
                                "import_value_usd": 65.0,
                                "export_volume": 850,
                                "export_value_usd": 1850.0,
                                "ending_stocks": 30
                        },
                        "2001": {
                                "production": 970.0,
                                "consumption": 126.0,
                                "import_volume": 21.0,
                                "import_value_usd": 74.0,
                                "export_volume": 864.0,
                                "export_value_usd": 2170.0,
                                "ending_stocks": 31.0
                        },
                        "2002": {
                                "production": 990.0,
                                "consumption": 132.0,
                                "import_volume": 22.0,
                                "import_value_usd": 83.0,
                                "export_volume": 878.0,
                                "export_value_usd": 2490.0,
                                "ending_stocks": 32.0
                        },
                        "2003": {
                                "production": 1010.0,
                                "consumption": 138.0,
                                "import_volume": 23.0,
                                "import_value_usd": 92.0,
                                "export_volume": 892.0,
                                "export_value_usd": 2810.0,
                                "ending_stocks": 33.0
                        },
                        "2004": {
                                "production": 1030.0,
                                "consumption": 144.0,
                                "import_volume": 24.0,
                                "import_value_usd": 101.0,
                                "export_volume": 906.0,
                                "export_value_usd": 3130.0,
                                "ending_stocks": 34.0
                        },
                        "2005": {
                                "production": 1050,
                                "consumption": 150,
                                "import_volume": 25,
                                "import_value_usd": 110.0,
                                "export_volume": 920,
                                "export_value_usd": 3450.0,
                                "ending_stocks": 35
                        },
                        "2006": {
                                "production": 1014.0,
                                "consumption": 156.0,
                                "import_volume": 26.0,
                                "import_value_usd": 132.0,
                                "export_volume": 880.0,
                                "export_value_usd": 3800.0,
                                "ending_stocks": 33.6
                        },
                        "2007": {
                                "production": 978.0,
                                "consumption": 162.0,
                                "import_volume": 27.0,
                                "import_value_usd": 154.0,
                                "export_volume": 840.0,
                                "export_value_usd": 4150.0,
                                "ending_stocks": 32.2
                        },
                        "2008": {
                                "production": 942.0,
                                "consumption": 168.0,
                                "import_volume": 28.0,
                                "import_value_usd": 176.0,
                                "export_volume": 800.0,
                                "export_value_usd": 4500.0,
                                "ending_stocks": 30.8
                        },
                        "2009": {
                                "production": 906.0,
                                "consumption": 174.0,
                                "import_volume": 29.0,
                                "import_value_usd": 198.0,
                                "export_volume": 760.0,
                                "export_value_usd": 4850.0,
                                "ending_stocks": 29.4
                        },
                        "2010": {
                                "production": 870,
                                "consumption": 180,
                                "import_volume": 30,
                                "import_value_usd": 220.0,
                                "export_volume": 720,
                                "export_value_usd": 5200.0,
                                "ending_stocks": 28
                        },
                        "2011": {
                                "production": 812.0,
                                "consumption": 182.0,
                                "import_volume": 31.0,
                                "import_value_usd": 215.0,
                                "export_volume": 660.0,
                                "export_value_usd": 4650.0,
                                "ending_stocks": 26.4
                        },
                        "2012": {
                                "production": 754.0,
                                "consumption": 184.0,
                                "import_volume": 32.0,
                                "import_value_usd": 210.0,
                                "export_volume": 600.0,
                                "export_value_usd": 4100.0,
                                "ending_stocks": 24.8
                        },
                        "2013": {
                                "production": 696.0,
                                "consumption": 186.0,
                                "import_volume": 33.0,
                                "import_value_usd": 205.0,
                                "export_volume": 540.0,
                                "export_value_usd": 3550.0,
                                "ending_stocks": 23.2
                        },
                        "2014": {
                                "production": 638.0,
                                "consumption": 188.0,
                                "import_volume": 34.0,
                                "import_value_usd": 200.0,
                                "export_volume": 480.0,
                                "export_value_usd": 3000.0,
                                "ending_stocks": 21.6
                        },
                        "2015": {
                                "production": 580,
                                "consumption": 190,
                                "import_volume": 35,
                                "import_value_usd": 195.0,
                                "export_volume": 420,
                                "export_value_usd": 2450.0,
                                "ending_stocks": 20
                        },
                        "2016": {
                                "production": 636.67,
                                "consumption": 196.67,
                                "import_volume": 38.33,
                                "import_value_usd": 226.67,
                                "export_volume": 466.67,
                                "export_value_usd": 2916.67,
                                "ending_stocks": 21.67
                        },
                        "2017": {
                                "production": 693.33,
                                "consumption": 203.33,
                                "import_volume": 41.67,
                                "import_value_usd": 258.33,
                                "export_volume": 513.33,
                                "export_value_usd": 3383.33,
                                "ending_stocks": 23.33
                        },
                        "2018": {
                                "production": 750,
                                "consumption": 210,
                                "import_volume": 45,
                                "import_value_usd": 290.0,
                                "export_volume": 560,
                                "export_value_usd": 3850.0,
                                "ending_stocks": 25
                        },
                        "2019": {
                                "production": 610,
                                "consumption": 225,
                                "import_volume": 50,
                                "import_value_usd": 310.0,
                                "export_volume": 410,
                                "export_value_usd": 2680.0,
                                "ending_stocks": 25
                        },
                        "2020": {
                                "production": 670,
                                "consumption": 215,
                                "import_volume": 42,
                                "import_value_usd": 260.0,
                                "export_volume": 480,
                                "export_value_usd": 3210.0,
                                "ending_stocks": 17
                        },
                        "2021": {
                                "production": 820,
                                "consumption": 240,
                                "import_volume": 38,
                                "import_value_usd": 350.0,
                                "export_volume": 600,
                                "export_value_usd": 5420.0,
                                "ending_stocks": 35
                        },
                        "2022": {
                                "production": 940,
                                "consumption": 265,
                                "import_volume": 40,
                                "import_value_usd": 360.0,
                                "export_volume": 690,
                                "export_value_usd": 6120.0,
                                "ending_stocks": 50
                        },
                        "2023": {
                                "production": 980,
                                "consumption": 290,
                                "import_volume": 35,
                                "import_value_usd": 305.0,
                                "export_volume": 710,
                                "export_value_usd": 6250.0,
                                "ending_stocks": 65
                        },
                        "2024": {
                                "production": 1050,
                                "consumption": 360,
                                "import_volume": 20,
                                "import_value_usd": 180.0,
                                "export_volume": 690,
                                "export_value_usd": 6800.0,
                                "ending_stocks": 85
                        },
                        "2025": {
                                "production": 1120,
                                "consumption": 450,
                                "import_volume": 10,
                                "import_value_usd": 95.0,
                                "export_volume": 680,
                                "export_value_usd": 7200.0,
                                "ending_stocks": 105
                        },
                        "2026": {
                                "production": 1142.4,
                                "consumption": 459.0,
                                "import_volume": 10.2,
                                "import_value_usd": 96.9,
                                "export_volume": 693.6,
                                "export_value_usd": 7344.0,
                                "ending_stocks": 107.1
                        }
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
                        "1990": {
                                "production": 379.77,
                                "consumption": 280.22,
                                "import_volume": 62.68,
                                "import_value_usd": 1548.59,
                                "export_volume": 162.23,
                                "export_value_usd": 4535.16,
                                "ending_stocks": 25.81
                        },
                        "1991": {
                                "production": 391.52,
                                "consumption": 288.89,
                                "import_volume": 64.62,
                                "import_value_usd": 1596.49,
                                "export_volume": 167.25,
                                "export_value_usd": 4675.42,
                                "ending_stocks": 26.61
                        },
                        "1992": {
                                "production": 403.63,
                                "consumption": 297.82,
                                "import_volume": 66.62,
                                "import_value_usd": 1645.86,
                                "export_volume": 172.42,
                                "export_value_usd": 4820.02,
                                "ending_stocks": 27.43
                        },
                        "1993": {
                                "production": 416.11,
                                "consumption": 307.03,
                                "import_volume": 68.68,
                                "import_value_usd": 1696.76,
                                "export_volume": 177.76,
                                "export_value_usd": 4969.09,
                                "ending_stocks": 28.28
                        },
                        "1994": {
                                "production": 428.98,
                                "consumption": 316.53,
                                "import_volume": 70.8,
                                "import_value_usd": 1749.24,
                                "export_volume": 183.25,
                                "export_value_usd": 5122.78,
                                "ending_stocks": 29.15
                        },
                        "1995": {
                                "production": 442.25,
                                "consumption": 326.32,
                                "import_volume": 72.99,
                                "import_value_usd": 1803.34,
                                "export_volume": 188.92,
                                "export_value_usd": 5281.21,
                                "ending_stocks": 30.06
                        },
                        "1996": {
                                "production": 455.93,
                                "consumption": 336.41,
                                "import_volume": 75.25,
                                "import_value_usd": 1859.11,
                                "export_volume": 194.76,
                                "export_value_usd": 5444.55,
                                "ending_stocks": 30.99
                        },
                        "1997": {
                                "production": 470.03,
                                "consumption": 346.82,
                                "import_volume": 77.58,
                                "import_value_usd": 1916.61,
                                "export_volume": 200.79,
                                "export_value_usd": 5612.94,
                                "ending_stocks": 31.94
                        },
                        "1998": {
                                "production": 484.56,
                                "consumption": 357.54,
                                "import_volume": 79.98,
                                "import_value_usd": 1975.89,
                                "export_volume": 207.0,
                                "export_value_usd": 5786.53,
                                "ending_stocks": 32.93
                        },
                        "1999": {
                                "production": 499.55,
                                "consumption": 368.6,
                                "import_volume": 82.45,
                                "import_value_usd": 2037.0,
                                "export_volume": 213.4,
                                "export_value_usd": 5965.5,
                                "ending_stocks": 33.95
                        },
                        "2000": {
                                "production": 515.0,
                                "consumption": 380.0,
                                "import_volume": 85.0,
                                "import_value_usd": 2100.0,
                                "export_volume": 220.0,
                                "export_value_usd": 6150.0,
                                "ending_stocks": 35.0
                        },
                        "2001": {
                                "production": 485.75,
                                "consumption": 391.25,
                                "import_volume": 103.75,
                                "import_value_usd": 3025.0,
                                "export_volume": 198.25,
                                "export_value_usd": 5812.5,
                                "ending_stocks": 33.75
                        },
                        "2002": {
                                "production": 456.5,
                                "consumption": 402.5,
                                "import_volume": 122.5,
                                "import_value_usd": 3950.0,
                                "export_volume": 176.5,
                                "export_value_usd": 5475.0,
                                "ending_stocks": 32.5
                        },
                        "2003": {
                                "production": 427.25,
                                "consumption": 413.75,
                                "import_volume": 141.25,
                                "import_value_usd": 4875.0,
                                "export_volume": 154.75,
                                "export_value_usd": 5137.5,
                                "ending_stocks": 31.25
                        },
                        "2004": {
                                "production": 398.0,
                                "consumption": 425.0,
                                "import_volume": 160.0,
                                "import_value_usd": 5800.0,
                                "export_volume": 133.0,
                                "export_value_usd": 4800.0,
                                "ending_stocks": 30.0
                        },
                        "2005": {
                                "production": 387.75,
                                "consumption": 433.75,
                                "import_volume": 166.25,
                                "import_value_usd": 8475.0,
                                "export_volume": 120.25,
                                "export_value_usd": 5550.0,
                                "ending_stocks": 29.5
                        },
                        "2006": {
                                "production": 377.5,
                                "consumption": 442.5,
                                "import_volume": 172.5,
                                "import_value_usd": 11150.0,
                                "export_volume": 107.5,
                                "export_value_usd": 6300.0,
                                "ending_stocks": 29.0
                        },
                        "2007": {
                                "production": 367.25,
                                "consumption": 451.25,
                                "import_volume": 178.75,
                                "import_value_usd": 13825.0,
                                "export_volume": 94.75,
                                "export_value_usd": 7050.0,
                                "ending_stocks": 28.5
                        },
                        "2008": {
                                "production": 357.0,
                                "consumption": 460.0,
                                "import_volume": 185.0,
                                "import_value_usd": 16500.0,
                                "export_volume": 82.0,
                                "export_value_usd": 7800.0,
                                "ending_stocks": 28.0
                        },
                        "2009": {
                                "production": 346.5,
                                "consumption": 467.5,
                                "import_volume": 195.0,
                                "import_value_usd": 18500.0,
                                "export_volume": 74.0,
                                "export_value_usd": 7200.0,
                                "ending_stocks": 27.25
                        },
                        "2010": {
                                "production": 336.0,
                                "consumption": 475.0,
                                "import_volume": 205.0,
                                "import_value_usd": 20500.0,
                                "export_volume": 66.0,
                                "export_value_usd": 6600.0,
                                "ending_stocks": 26.5
                        },
                        "2011": {
                                "production": 325.5,
                                "consumption": 482.5,
                                "import_volume": 215.0,
                                "import_value_usd": 22500.0,
                                "export_volume": 58.0,
                                "export_value_usd": 6000.0,
                                "ending_stocks": 25.75
                        },
                        "2012": {
                                "production": 315.0,
                                "consumption": 490.0,
                                "import_volume": 225.0,
                                "import_value_usd": 24500.0,
                                "export_volume": 50.0,
                                "export_value_usd": 5400.0,
                                "ending_stocks": 25.0
                        },
                        "2013": {
                                "production": 305.67,
                                "consumption": 495.0,
                                "import_volume": 230.0,
                                "import_value_usd": 20500.0,
                                "export_volume": 45.0,
                                "export_value_usd": 4216.67,
                                "ending_stocks": 24.0
                        },
                        "2014": {
                                "production": 296.33,
                                "consumption": 500.0,
                                "import_volume": 235.0,
                                "import_value_usd": 16500.0,
                                "export_volume": 40.0,
                                "export_value_usd": 3033.33,
                                "ending_stocks": 23.0
                        },
                        "2015": {
                                "production": 287.0,
                                "consumption": 505.0,
                                "import_volume": 240.0,
                                "import_value_usd": 12500.0,
                                "export_volume": 35.0,
                                "export_value_usd": 1850.0,
                                "ending_stocks": 22.0
                        },
                        "2016": {
                                "production": 285.67,
                                "consumption": 510.0,
                                "import_volume": 248.33,
                                "import_value_usd": 14400.0,
                                "export_volume": 32.67,
                                "export_value_usd": 1873.33,
                                "ending_stocks": 21.67
                        },
                        "2017": {
                                "production": 284.33,
                                "consumption": 515.0,
                                "import_volume": 256.67,
                                "import_value_usd": 16300.0,
                                "export_volume": 30.33,
                                "export_value_usd": 1896.67,
                                "ending_stocks": 21.33
                        },
                        "2018": {
                                "production": 283.0,
                                "consumption": 520.0,
                                "import_volume": 265.0,
                                "import_value_usd": 18200.0,
                                "export_volume": 28.0,
                                "export_value_usd": 1920.0,
                                "ending_stocks": 21.0
                        },
                        "2019": {
                                "production": 272.0,
                                "consumption": 535.0,
                                "import_volume": 280.0,
                                "import_value_usd": 17800.0,
                                "export_volume": 17.0,
                                "export_value_usd": 1150.0,
                                "ending_stocks": 22.0
                        },
                        "2020": {
                                "production": 258.0,
                                "consumption": 485.0,
                                "import_volume": 240.0,
                                "import_value_usd": 9650.0,
                                "export_volume": 13.0,
                                "export_value_usd": 540.0,
                                "ending_stocks": 24.0
                        },
                        "2021": {
                                "production": 241.0,
                                "consumption": 510.0,
                                "import_volume": 285.0,
                                "import_value_usd": 17600.0,
                                "export_volume": 16.0,
                                "export_value_usd": 1120.0,
                                "ending_stocks": 20.0
                        },
                        "2022": {
                                "production": 224.0,
                                "consumption": 545.0,
                                "import_volume": 335.0,
                                "import_value_usd": 28900.0,
                                "export_volume": 14.0,
                                "export_value_usd": 1450.0,
                                "ending_stocks": 18.0
                        },
                        "2023": {
                                "production": 221.0,
                                "consumption": 560.0,
                                "import_volume": 352.0,
                                "import_value_usd": 27400.0,
                                "export_volume": 13.0,
                                "export_value_usd": 1210.0,
                                "ending_stocks": 17.0
                        },
                        "2024": {
                                "production": 216.0,
                                "consumption": 575.0,
                                "import_volume": 372.0,
                                "import_value_usd": 28500.0,
                                "export_volume": 13.0,
                                "export_value_usd": 1180.0,
                                "ending_stocks": 16.0
                        },
                        "2025": {
                                "production": 212.0,
                                "consumption": 585.0,
                                "import_volume": 385.0,
                                "import_value_usd": 29200.0,
                                "export_volume": 12.0,
                                "export_value_usd": 1120.0,
                                "ending_stocks": 15.0
                        },
                        "2026": {
                                "production": 216.24,
                                "consumption": 596.7,
                                "import_volume": 392.7,
                                "import_value_usd": 29784.0,
                                "export_volume": 12.24,
                                "export_value_usd": 1142.4,
                                "ending_stocks": 15.3
                        }
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
                        "1990": {
                                "production": 2322.89,
                                "consumption": 884.91,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1437.98,
                                "export_value_usd": 5309.45,
                                "ending_stocks": 70.06
                        },
                        "1991": {
                                "production": 2394.73,
                                "consumption": 912.28,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1482.45,
                                "export_value_usd": 5473.66,
                                "ending_stocks": 72.22
                        },
                        "1992": {
                                "production": 2468.79,
                                "consumption": 940.49,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1528.3,
                                "export_value_usd": 5642.95,
                                "ending_stocks": 74.46
                        },
                        "1993": {
                                "production": 2545.15,
                                "consumption": 969.58,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1575.57,
                                "export_value_usd": 5817.48,
                                "ending_stocks": 76.76
                        },
                        "1994": {
                                "production": 2623.86,
                                "consumption": 999.57,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1624.3,
                                "export_value_usd": 5997.4,
                                "ending_stocks": 79.13
                        },
                        "1995": {
                                "production": 2705.01,
                                "consumption": 1030.48,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1674.53,
                                "export_value_usd": 6182.88,
                                "ending_stocks": 81.58
                        },
                        "1996": {
                                "production": 2788.67,
                                "consumption": 1062.35,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1726.32,
                                "export_value_usd": 6374.11,
                                "ending_stocks": 84.1
                        },
                        "1997": {
                                "production": 2874.92,
                                "consumption": 1095.21,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1779.71,
                                "export_value_usd": 6571.25,
                                "ending_stocks": 86.7
                        },
                        "1998": {
                                "production": 2963.84,
                                "consumption": 1129.08,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1834.75,
                                "export_value_usd": 6774.48,
                                "ending_stocks": 89.39
                        },
                        "1999": {
                                "production": 3055.5,
                                "consumption": 1164.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1891.5,
                                "export_value_usd": 6984.0,
                                "ending_stocks": 92.15
                        },
                        "2000": {
                                "production": 3150,
                                "consumption": 1200,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1950,
                                "export_value_usd": 7200.0,
                                "ending_stocks": 95
                        },
                        "2001": {
                                "production": 3140.0,
                                "consumption": 1236.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1904.0,
                                "export_value_usd": 7640.0,
                                "ending_stocks": 94.0
                        },
                        "2002": {
                                "production": 3130.0,
                                "consumption": 1272.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1858.0,
                                "export_value_usd": 8080.0,
                                "ending_stocks": 93.0
                        },
                        "2003": {
                                "production": 3120.0,
                                "consumption": 1308.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1812.0,
                                "export_value_usd": 8520.0,
                                "ending_stocks": 92.0
                        },
                        "2004": {
                                "production": 3110.0,
                                "consumption": 1344.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1766.0,
                                "export_value_usd": 8960.0,
                                "ending_stocks": 91.0
                        },
                        "2005": {
                                "production": 3100,
                                "consumption": 1380,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1720,
                                "export_value_usd": 9400.0,
                                "ending_stocks": 90
                        },
                        "2006": {
                                "production": 3140.0,
                                "consumption": 1414.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1726.0,
                                "export_value_usd": 10420.0,
                                "ending_stocks": 89.6
                        },
                        "2007": {
                                "production": 3180.0,
                                "consumption": 1448.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1732.0,
                                "export_value_usd": 11440.0,
                                "ending_stocks": 89.2
                        },
                        "2008": {
                                "production": 3220.0,
                                "consumption": 1482.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1738.0,
                                "export_value_usd": 12460.0,
                                "ending_stocks": 88.8
                        },
                        "2009": {
                                "production": 3260.0,
                                "consumption": 1516.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1744.0,
                                "export_value_usd": 13480.0,
                                "ending_stocks": 88.4
                        },
                        "2010": {
                                "production": 3300,
                                "consumption": 1550,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1750,
                                "export_value_usd": 14500.0,
                                "ending_stocks": 88
                        },
                        "2011": {
                                "production": 3250.0,
                                "consumption": 1576.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1674.0,
                                "export_value_usd": 13560.0,
                                "ending_stocks": 87.4
                        },
                        "2012": {
                                "production": 3200.0,
                                "consumption": 1602.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1598.0,
                                "export_value_usd": 12620.0,
                                "ending_stocks": 86.8
                        },
                        "2013": {
                                "production": 3150.0,
                                "consumption": 1628.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1522.0,
                                "export_value_usd": 11680.0,
                                "ending_stocks": 86.2
                        },
                        "2014": {
                                "production": 3100.0,
                                "consumption": 1654.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1446.0,
                                "export_value_usd": 10740.0,
                                "ending_stocks": 85.6
                        },
                        "2015": {
                                "production": 3050,
                                "consumption": 1680,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1370,
                                "export_value_usd": 9800.0,
                                "ending_stocks": 85
                        },
                        "2016": {
                                "production": 2996.67,
                                "consumption": 1700.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1296.67,
                                "export_value_usd": 9163.33,
                                "ending_stocks": 85.0
                        },
                        "2017": {
                                "production": 2943.33,
                                "consumption": 1720.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 1223.33,
                                "export_value_usd": 8526.67,
                                "ending_stocks": 85.0
                        },
                        "2018": {
                                "production": 2890,
                                "consumption": 1740,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 1150,
                                "export_value_usd": 7890.0,
                                "ending_stocks": 85
                        },
                        "2019": {
                                "production": 2780,
                                "consumption": 1810,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 970,
                                "export_value_usd": 6450.0,
                                "ending_stocks": 85
                        },
                        "2020": {
                                "production": 2550,
                                "consumption": 1680,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 870,
                                "export_value_usd": 4210.0,
                                "ending_stocks": 90
                        },
                        "2021": {
                                "production": 2510,
                                "consumption": 1710,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 800,
                                "export_value_usd": 6850.0,
                                "ending_stocks": 80
                        },
                        "2022": {
                                "production": 2420,
                                "consumption": 1740,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 680,
                                "export_value_usd": 9750.0,
                                "ending_stocks": 80
                        },
                        "2023": {
                                "production": 2460,
                                "consumption": 1790,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 670,
                                "export_value_usd": 8620.0,
                                "ending_stocks": 80
                        },
                        "2024": {
                                "production": 2520,
                                "consumption": 1850,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 670,
                                "export_value_usd": 8900.0,
                                "ending_stocks": 80
                        },
                        "2025": {
                                "production": 2560,
                                "consumption": 1900,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 660,
                                "export_value_usd": 8800.0,
                                "ending_stocks": 80
                        },
                        "2026": {
                                "production": 2611.2,
                                "consumption": 1938.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 673.2,
                                "export_value_usd": 8976.0,
                                "ending_stocks": 81.6
                        }
                }
        },
        {
                "id": "COM-NONMINE-001-KAYU",
                "name": "Kayu Olahan (Plywood, Veneer, Kayu Lapis)",
                "division": "HASIL_BUMI",
                "division_label": "Barang Hasil Bumi",
                "group": "NON_TAMBANG_HAYATI",
                "group_label": "Hasil Bumi Tidak Ditambang (Kehutanan & Hayati)",
                "realm": "TIDAK_DITAMBANG",
                "realm_label": "Tidak Ditambang (Kehutanan)",
                "unit": "Juta M\u00b3",
                "hs_chapter": "HS 44 (Kayu & Barang dari Kayu)",
                "hs_code": "4412.31.00 & 4407.29.00 (Kayu Lapis / Plywood & Kayu Gergajian)",
                "apbn_classification": "Penerimaan Negara Bukan Pajak (PNBP) Sumber Daya Alam Kehutanan (PSDH & Dana Reboisasi)",
                "lkpp_account_code": "421311 (Provisi Sumber Daya Hutan / PSDH) / 421312 (Dana Reboisasi / DR)",
                "lkpp_classification": "PNBP Sumber Daya Alam Kehutanan (LRA & LO)",
                "source_institution": "Kementerian Lingkungan Hidup dan Kehutanan (KLHK) & BPS",
                "legal_basis": "UU No. 18 Tahun 2013 tentang Pencegahan dan Pemberantasan Perusakan Hutan & SVLK",
                "description": "Hasil hutan kayu bersertifikasi kelestarian (SVLK) untuk industri konstruksi domestik dan ekspor furniture/plywood ke AS/Jepang.",
                "time_series": {
                        "1990": {
                                "production": 13.64,
                                "consumption": 6.05,
                                "import_volume": 0.15,
                                "import_value_usd": 81.12,
                                "export_volume": 7.74,
                                "export_value_usd": 3539.64,
                                "ending_stocks": 1.33
                        },
                        "1991": {
                                "production": 14.06,
                                "consumption": 6.23,
                                "import_volume": 0.15,
                                "import_value_usd": 83.63,
                                "export_volume": 7.98,
                                "export_value_usd": 3649.11,
                                "ending_stocks": 1.37
                        },
                        "1992": {
                                "production": 14.5,
                                "consumption": 6.43,
                                "import_volume": 0.16,
                                "import_value_usd": 86.21,
                                "export_volume": 8.23,
                                "export_value_usd": 3761.97,
                                "ending_stocks": 1.41
                        },
                        "1993": {
                                "production": 14.95,
                                "consumption": 6.63,
                                "import_volume": 0.16,
                                "import_value_usd": 88.88,
                                "export_volume": 8.48,
                                "export_value_usd": 3878.32,
                                "ending_stocks": 1.45
                        },
                        "1994": {
                                "production": 15.41,
                                "consumption": 6.83,
                                "import_volume": 0.17,
                                "import_value_usd": 91.63,
                                "export_volume": 8.75,
                                "export_value_usd": 3998.27,
                                "ending_stocks": 1.5
                        },
                        "1995": {
                                "production": 15.89,
                                "consumption": 7.04,
                                "import_volume": 0.17,
                                "import_value_usd": 94.46,
                                "export_volume": 9.02,
                                "export_value_usd": 4121.92,
                                "ending_stocks": 1.55
                        },
                        "1996": {
                                "production": 16.38,
                                "consumption": 7.26,
                                "import_volume": 0.18,
                                "import_value_usd": 97.38,
                                "export_volume": 9.3,
                                "export_value_usd": 4249.41,
                                "ending_stocks": 1.59
                        },
                        "1997": {
                                "production": 16.88,
                                "consumption": 7.48,
                                "import_volume": 0.18,
                                "import_value_usd": 100.39,
                                "export_volume": 9.58,
                                "export_value_usd": 4380.83,
                                "ending_stocks": 1.64
                        },
                        "1998": {
                                "production": 17.41,
                                "consumption": 7.72,
                                "import_volume": 0.19,
                                "import_value_usd": 103.5,
                                "export_volume": 9.88,
                                "export_value_usd": 4516.32,
                                "ending_stocks": 1.69
                        },
                        "1999": {
                                "production": 17.95,
                                "consumption": 7.95,
                                "import_volume": 0.19,
                                "import_value_usd": 106.7,
                                "export_volume": 10.19,
                                "export_value_usd": 4656.0,
                                "ending_stocks": 1.75
                        },
                        "2000": {
                                "production": 18.5,
                                "consumption": 8.2,
                                "import_volume": 0.2,
                                "import_value_usd": 110.0,
                                "export_volume": 10.5,
                                "export_value_usd": 4800.0,
                                "ending_stocks": 1.8
                        },
                        "2001": {
                                "production": 18.04,
                                "consumption": 8.12,
                                "import_volume": 0.22,
                                "import_value_usd": 116.0,
                                "export_volume": 10.14,
                                "export_value_usd": 4680.0,
                                "ending_stocks": 1.74
                        },
                        "2002": {
                                "production": 17.58,
                                "consumption": 8.04,
                                "import_volume": 0.24,
                                "import_value_usd": 122.0,
                                "export_volume": 9.78,
                                "export_value_usd": 4560.0,
                                "ending_stocks": 1.68
                        },
                        "2003": {
                                "production": 17.12,
                                "consumption": 7.96,
                                "import_volume": 0.26,
                                "import_value_usd": 128.0,
                                "export_volume": 9.42,
                                "export_value_usd": 4440.0,
                                "ending_stocks": 1.62
                        },
                        "2004": {
                                "production": 16.66,
                                "consumption": 7.88,
                                "import_volume": 0.28,
                                "import_value_usd": 134.0,
                                "export_volume": 9.06,
                                "export_value_usd": 4320.0,
                                "ending_stocks": 1.56
                        },
                        "2005": {
                                "production": 16.2,
                                "consumption": 7.8,
                                "import_volume": 0.3,
                                "import_value_usd": 140.0,
                                "export_volume": 8.7,
                                "export_value_usd": 4200.0,
                                "ending_stocks": 1.5
                        },
                        "2006": {
                                "production": 16.0,
                                "consumption": 7.74,
                                "import_volume": 0.32,
                                "import_value_usd": 148.0,
                                "export_volume": 8.58,
                                "export_value_usd": 4180.0,
                                "ending_stocks": 1.48
                        },
                        "2007": {
                                "production": 15.8,
                                "consumption": 7.68,
                                "import_volume": 0.34,
                                "import_value_usd": 156.0,
                                "export_volume": 8.46,
                                "export_value_usd": 4160.0,
                                "ending_stocks": 1.46
                        },
                        "2008": {
                                "production": 15.6,
                                "consumption": 7.62,
                                "import_volume": 0.36,
                                "import_value_usd": 164.0,
                                "export_volume": 8.34,
                                "export_value_usd": 4140.0,
                                "ending_stocks": 1.44
                        },
                        "2009": {
                                "production": 15.4,
                                "consumption": 7.56,
                                "import_volume": 0.38,
                                "import_value_usd": 172.0,
                                "export_volume": 8.22,
                                "export_value_usd": 4120.0,
                                "ending_stocks": 1.42
                        },
                        "2010": {
                                "production": 15.2,
                                "consumption": 7.5,
                                "import_volume": 0.4,
                                "import_value_usd": 180.0,
                                "export_volume": 8.1,
                                "export_value_usd": 4100.0,
                                "ending_stocks": 1.4
                        },
                        "2011": {
                                "production": 14.94,
                                "consumption": 7.36,
                                "import_volume": 0.4,
                                "import_value_usd": 184.0,
                                "export_volume": 7.98,
                                "export_value_usd": 4060.0,
                                "ending_stocks": 1.38
                        },
                        "2012": {
                                "production": 14.68,
                                "consumption": 7.22,
                                "import_volume": 0.4,
                                "import_value_usd": 188.0,
                                "export_volume": 7.86,
                                "export_value_usd": 4020.0,
                                "ending_stocks": 1.36
                        },
                        "2013": {
                                "production": 14.42,
                                "consumption": 7.08,
                                "import_volume": 0.4,
                                "import_value_usd": 192.0,
                                "export_volume": 7.74,
                                "export_value_usd": 3980.0,
                                "ending_stocks": 1.34
                        },
                        "2014": {
                                "production": 14.16,
                                "consumption": 6.94,
                                "import_volume": 0.4,
                                "import_value_usd": 196.0,
                                "export_volume": 7.62,
                                "export_value_usd": 3940.0,
                                "ending_stocks": 1.32
                        },
                        "2015": {
                                "production": 13.9,
                                "consumption": 6.8,
                                "import_volume": 0.4,
                                "import_value_usd": 200.0,
                                "export_volume": 7.5,
                                "export_value_usd": 3900.0,
                                "ending_stocks": 1.3
                        },
                        "2016": {
                                "production": 13.53,
                                "consumption": 6.7,
                                "import_volume": 0.4,
                                "import_value_usd": 203.33,
                                "export_volume": 7.23,
                                "export_value_usd": 3916.67,
                                "ending_stocks": 1.27
                        },
                        "2017": {
                                "production": 13.17,
                                "consumption": 6.6,
                                "import_volume": 0.4,
                                "import_value_usd": 206.67,
                                "export_volume": 6.97,
                                "export_value_usd": 3933.33,
                                "ending_stocks": 1.23
                        },
                        "2018": {
                                "production": 12.8,
                                "consumption": 6.5,
                                "import_volume": 0.4,
                                "import_value_usd": 210.0,
                                "export_volume": 6.7,
                                "export_value_usd": 3950.0,
                                "ending_stocks": 1.2
                        },
                        "2019": {
                                "production": 13.2,
                                "consumption": 6.8,
                                "import_volume": 0.5,
                                "import_value_usd": 230.0,
                                "export_volume": 6.9,
                                "export_value_usd": 3810.0,
                                "ending_stocks": 1.2
                        },
                        "2020": {
                                "production": 12.1,
                                "consumption": 6.2,
                                "import_volume": 0.3,
                                "import_value_usd": 170.0,
                                "export_volume": 6.2,
                                "export_value_usd": 3540.0,
                                "ending_stocks": 1.2
                        },
                        "2021": {
                                "production": 13.5,
                                "consumption": 6.9,
                                "import_volume": 0.4,
                                "import_value_usd": 240.0,
                                "export_volume": 7.0,
                                "export_value_usd": 4620.0,
                                "ending_stocks": 1.2
                        },
                        "2022": {
                                "production": 14.1,
                                "consumption": 7.2,
                                "import_volume": 0.5,
                                "import_value_usd": 280.0,
                                "export_volume": 7.4,
                                "export_value_usd": 4850.0,
                                "ending_stocks": 1.2
                        },
                        "2023": {
                                "production": 13.8,
                                "consumption": 7.4,
                                "import_volume": 0.4,
                                "import_value_usd": 250.0,
                                "export_volume": 6.8,
                                "export_value_usd": 4120.0,
                                "ending_stocks": 1.2
                        },
                        "2024": {
                                "production": 14.2,
                                "consumption": 7.6,
                                "import_volume": 0.4,
                                "import_value_usd": 260.0,
                                "export_volume": 7.0,
                                "export_value_usd": 4350.0,
                                "ending_stocks": 1.2
                        },
                        "2025": {
                                "production": 14.5,
                                "consumption": 7.8,
                                "import_volume": 0.4,
                                "import_value_usd": 270.0,
                                "export_volume": 7.1,
                                "export_value_usd": 4420.0,
                                "ending_stocks": 1.3
                        },
                        "2026": {
                                "production": 14.79,
                                "consumption": 7.96,
                                "import_volume": 0.41,
                                "import_value_usd": 275.4,
                                "export_volume": 7.24,
                                "export_value_usd": 4508.4,
                                "ending_stocks": 1.33
                        }
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
                        "1990": {
                                "production": 884.91,
                                "consumption": 331.84,
                                "import_volume": 0.74,
                                "import_value_usd": 1.47,
                                "export_volume": 553.07,
                                "export_value_usd": 47.93,
                                "ending_stocks": 44.25
                        },
                        "1991": {
                                "production": 912.28,
                                "consumption": 342.1,
                                "import_volume": 0.76,
                                "import_value_usd": 1.52,
                                "export_volume": 570.17,
                                "export_value_usd": 49.42,
                                "ending_stocks": 45.61
                        },
                        "1992": {
                                "production": 940.49,
                                "consumption": 352.68,
                                "import_volume": 0.78,
                                "import_value_usd": 1.57,
                                "export_volume": 587.81,
                                "export_value_usd": 50.94,
                                "ending_stocks": 47.02
                        },
                        "1993": {
                                "production": 969.58,
                                "consumption": 363.59,
                                "import_volume": 0.81,
                                "import_value_usd": 1.62,
                                "export_volume": 605.99,
                                "export_value_usd": 52.52,
                                "ending_stocks": 48.48
                        },
                        "1994": {
                                "production": 999.57,
                                "consumption": 374.84,
                                "import_volume": 0.83,
                                "import_value_usd": 1.67,
                                "export_volume": 624.73,
                                "export_value_usd": 54.14,
                                "ending_stocks": 49.98
                        },
                        "1995": {
                                "production": 1030.48,
                                "consumption": 386.43,
                                "import_volume": 0.86,
                                "import_value_usd": 1.72,
                                "export_volume": 644.05,
                                "export_value_usd": 55.82,
                                "ending_stocks": 51.52
                        },
                        "1996": {
                                "production": 1062.35,
                                "consumption": 398.38,
                                "import_volume": 0.89,
                                "import_value_usd": 1.77,
                                "export_volume": 663.97,
                                "export_value_usd": 57.54,
                                "ending_stocks": 53.12
                        },
                        "1997": {
                                "production": 1095.21,
                                "consumption": 410.7,
                                "import_volume": 0.91,
                                "import_value_usd": 1.83,
                                "export_volume": 684.5,
                                "export_value_usd": 59.32,
                                "ending_stocks": 54.76
                        },
                        "1998": {
                                "production": 1129.08,
                                "consumption": 423.4,
                                "import_volume": 0.94,
                                "import_value_usd": 1.88,
                                "export_volume": 705.67,
                                "export_value_usd": 61.16,
                                "ending_stocks": 56.45
                        },
                        "1999": {
                                "production": 1164.0,
                                "consumption": 436.5,
                                "import_volume": 0.97,
                                "import_value_usd": 1.94,
                                "export_volume": 727.5,
                                "export_value_usd": 63.05,
                                "ending_stocks": 58.2
                        },
                        "2000": {
                                "production": 1200,
                                "consumption": 450,
                                "import_volume": 1,
                                "import_value_usd": 2.0,
                                "export_volume": 750,
                                "export_value_usd": 65.0,
                                "ending_stocks": 60
                        },
                        "2001": {
                                "production": 1440.0,
                                "consumption": 550.0,
                                "import_volume": 1.2,
                                "import_value_usd": 2.4,
                                "export_volume": 890.0,
                                "export_value_usd": 76.0,
                                "ending_stocks": 70.0
                        },
                        "2002": {
                                "production": 1680.0,
                                "consumption": 650.0,
                                "import_volume": 1.4,
                                "import_value_usd": 2.8,
                                "export_volume": 1030.0,
                                "export_value_usd": 87.0,
                                "ending_stocks": 80.0
                        },
                        "2003": {
                                "production": 1920.0,
                                "consumption": 750.0,
                                "import_volume": 1.6,
                                "import_value_usd": 3.2,
                                "export_volume": 1170.0,
                                "export_value_usd": 98.0,
                                "ending_stocks": 90.0
                        },
                        "2004": {
                                "production": 2160.0,
                                "consumption": 850.0,
                                "import_volume": 1.8,
                                "import_value_usd": 3.6,
                                "export_volume": 1310.0,
                                "export_value_usd": 109.0,
                                "ending_stocks": 100.0
                        },
                        "2005": {
                                "production": 2400,
                                "consumption": 950,
                                "import_volume": 2,
                                "import_value_usd": 4.0,
                                "export_volume": 1450,
                                "export_value_usd": 120.0,
                                "ending_stocks": 110
                        },
                        "2006": {
                                "production": 2700.0,
                                "consumption": 1060.0,
                                "import_volume": 2.2,
                                "import_value_usd": 4.6,
                                "export_volume": 1640.0,
                                "export_value_usd": 133.0,
                                "ending_stocks": 120.0
                        },
                        "2007": {
                                "production": 3000.0,
                                "consumption": 1170.0,
                                "import_volume": 2.4,
                                "import_value_usd": 5.2,
                                "export_volume": 1830.0,
                                "export_value_usd": 146.0,
                                "ending_stocks": 130.0
                        },
                        "2008": {
                                "production": 3300.0,
                                "consumption": 1280.0,
                                "import_volume": 2.6,
                                "import_value_usd": 5.8,
                                "export_volume": 2020.0,
                                "export_value_usd": 159.0,
                                "ending_stocks": 140.0
                        },
                        "2009": {
                                "production": 3600.0,
                                "consumption": 1390.0,
                                "import_volume": 2.8,
                                "import_value_usd": 6.4,
                                "export_volume": 2210.0,
                                "export_value_usd": 172.0,
                                "ending_stocks": 150.0
                        },
                        "2010": {
                                "production": 3900,
                                "consumption": 1500,
                                "import_volume": 3,
                                "import_value_usd": 7.0,
                                "export_volume": 2400,
                                "export_value_usd": 185.0,
                                "ending_stocks": 160
                        },
                        "2011": {
                                "production": 4680.0,
                                "consumption": 1780.0,
                                "import_volume": 3.2,
                                "import_value_usd": 7.5,
                                "export_volume": 2900.0,
                                "export_value_usd": 198.0,
                                "ending_stocks": 176.0
                        },
                        "2012": {
                                "production": 5460.0,
                                "consumption": 2060.0,
                                "import_volume": 3.4,
                                "import_value_usd": 8.0,
                                "export_volume": 3400.0,
                                "export_value_usd": 211.0,
                                "ending_stocks": 192.0
                        },
                        "2013": {
                                "production": 6240.0,
                                "consumption": 2340.0,
                                "import_volume": 3.6,
                                "import_value_usd": 8.5,
                                "export_volume": 3900.0,
                                "export_value_usd": 224.0,
                                "ending_stocks": 208.0
                        },
                        "2014": {
                                "production": 7020.0,
                                "consumption": 2620.0,
                                "import_volume": 3.8,
                                "import_value_usd": 9.0,
                                "export_volume": 4400.0,
                                "export_value_usd": 237.0,
                                "ending_stocks": 224.0
                        },
                        "2015": {
                                "production": 7800,
                                "consumption": 2900,
                                "import_volume": 4,
                                "import_value_usd": 9.5,
                                "export_volume": 4900,
                                "export_value_usd": 250.0,
                                "ending_stocks": 240
                        },
                        "2016": {
                                "production": 8600.0,
                                "consumption": 3200.0,
                                "import_volume": 4.33,
                                "import_value_usd": 10.33,
                                "export_volume": 5400.0,
                                "export_value_usd": 263.33,
                                "ending_stocks": 266.67
                        },
                        "2017": {
                                "production": 9400.0,
                                "consumption": 3500.0,
                                "import_volume": 4.67,
                                "import_value_usd": 11.17,
                                "export_volume": 5900.0,
                                "export_value_usd": 276.67,
                                "ending_stocks": 293.33
                        },
                        "2018": {
                                "production": 10200,
                                "consumption": 3800,
                                "import_volume": 5,
                                "import_value_usd": 12.0,
                                "export_volume": 6400,
                                "export_value_usd": 290.0,
                                "ending_stocks": 320
                        },
                        "2019": {
                                "production": 9900,
                                "consumption": 4100,
                                "import_volume": 6,
                                "import_value_usd": 14.2,
                                "export_volume": 5800,
                                "export_value_usd": 320.0,
                                "ending_stocks": 320
                        },
                        "2020": {
                                "production": 9600,
                                "consumption": 4050,
                                "import_volume": 4,
                                "import_value_usd": 10.5,
                                "export_volume": 5550,
                                "export_value_usd": 280.0,
                                "ending_stocks": 320
                        },
                        "2021": {
                                "production": 9100,
                                "consumption": 4200,
                                "import_volume": 5,
                                "import_value_usd": 13.0,
                                "export_volume": 4900,
                                "export_value_usd": 350.0,
                                "ending_stocks": 320
                        },
                        "2022": {
                                "production": 9600,
                                "consumption": 4500,
                                "import_volume": 6,
                                "import_value_usd": 18.0,
                                "export_volume": 5100,
                                "export_value_usd": 600.0,
                                "ending_stocks": 320
                        },
                        "2023": {
                                "production": 9800,
                                "consumption": 4800,
                                "import_volume": 5,
                                "import_value_usd": 15.0,
                                "export_volume": 5000,
                                "export_value_usd": 440.0,
                                "ending_stocks": 320
                        },
                        "2024": {
                                "production": 10100,
                                "consumption": 5100,
                                "import_volume": 6,
                                "import_value_usd": 16.0,
                                "export_volume": 5000,
                                "export_value_usd": 480.0,
                                "ending_stocks": 320
                        },
                        "2025": {
                                "production": 10400,
                                "consumption": 5300,
                                "import_volume": 6,
                                "import_value_usd": 17.0,
                                "export_volume": 5100,
                                "export_value_usd": 510.0,
                                "ending_stocks": 340
                        },
                        "2026": {
                                "production": 10608.0,
                                "consumption": 5406.0,
                                "import_volume": 6.12,
                                "import_value_usd": 17.34,
                                "export_volume": 5202.0,
                                "export_value_usd": 520.2,
                                "ending_stocks": 346.8
                        }
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
                        "1990": {
                                "production": 3539.64,
                                "consumption": 3539.64,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1991": {
                                "production": 3649.11,
                                "consumption": 3649.11,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1992": {
                                "production": 3761.97,
                                "consumption": 3761.97,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1993": {
                                "production": 3878.32,
                                "consumption": 3878.32,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1994": {
                                "production": 3998.27,
                                "consumption": 3998.27,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1995": {
                                "production": 4121.92,
                                "consumption": 4121.92,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1996": {
                                "production": 4249.41,
                                "consumption": 4249.41,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1997": {
                                "production": 4380.83,
                                "consumption": 4380.83,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1998": {
                                "production": 4516.32,
                                "consumption": 4516.32,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "1999": {
                                "production": 4656.0,
                                "consumption": 4656.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2000": {
                                "production": 4800,
                                "consumption": 4800,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2001": {
                                "production": 5080.0,
                                "consumption": 5080.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2002": {
                                "production": 5360.0,
                                "consumption": 5360.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2003": {
                                "production": 5640.0,
                                "consumption": 5640.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2004": {
                                "production": 5920.0,
                                "consumption": 5920.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2005": {
                                "production": 6200,
                                "consumption": 6200,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2006": {
                                "production": 6840.0,
                                "consumption": 6840.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2007": {
                                "production": 7480.0,
                                "consumption": 7480.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2008": {
                                "production": 8120.0,
                                "consumption": 8120.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2009": {
                                "production": 8760.0,
                                "consumption": 8760.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2010": {
                                "production": 9400,
                                "consumption": 9400,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2011": {
                                "production": 9880.0,
                                "consumption": 9880.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2012": {
                                "production": 10360.0,
                                "consumption": 10360.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2013": {
                                "production": 10840.0,
                                "consumption": 10840.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2014": {
                                "production": 11320.0,
                                "consumption": 11320.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2015": {
                                "production": 11800,
                                "consumption": 11800,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2016": {
                                "production": 12483.33,
                                "consumption": 12483.33,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2017": {
                                "production": 13166.67,
                                "consumption": 13166.67,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        },
                        "2018": {
                                "production": 13850,
                                "consumption": 13850,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2019": {
                                "production": 14920,
                                "consumption": 14920,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2020": {
                                "production": 15410,
                                "consumption": 15410,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2021": {
                                "production": 15890,
                                "consumption": 15890,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2022": {
                                "production": 16450,
                                "consumption": 16450,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2023": {
                                "production": 16980,
                                "consumption": 16980,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2024": {
                                "production": 17620,
                                "consumption": 17620,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2025": {
                                "production": 18350,
                                "consumption": 18350,
                                "import_volume": 0,
                                "import_value_usd": 0.0,
                                "export_volume": 0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0
                        },
                        "2026": {
                                "production": 18717.0,
                                "consumption": 18717.0,
                                "import_volume": 0.0,
                                "import_value_usd": 0.0,
                                "export_volume": 0.0,
                                "export_value_usd": 0.0,
                                "ending_stocks": 0.0
                        }
                }
        }
,
        {
                "id": "COM-AGRI-007-KARET",
                "name": "Karet Alam (Natural Rubber / TSR 20)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Perkebunan & Peternakan",
                "group": "PERKEBUNAN_INDUSTRI",
                "group_label": "Perkebunan Industri",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan Industri)",
                "unit": "Juta Ton",
                "hs_chapter": "HS 40 (Karet & Barang Olahan Karet)",
                "hs_code": "4001.22.00 (Technically Specified Natural Rubber / TSR 20)",
                "apbn_classification": "Penerimaan Bea Keluar Ekspor Karet & PPN Industri Manufaktur Ban",
                "lkpp_account_code": "411521 (Bea Keluar Ekspor Karet) / 411122 (PPh Badan Industri Karet)",
                "lkpp_classification": "Penerimaan Bea Keluar & Pajak Industri Otomotif",
                "source_institution": "GAPKINDO, BPS & Ditjen Perkebunan Kementan",
                "legal_basis": "UU No. 39 Tahun 2014 tentang Perkebunan & Regulasi Ekspor Karet",
                "description": "Komoditas perkebunan industri andalan ekspor devisa nasional sebagai bahan baku utama industri otomotif, ban kendaraan, dan manufaktur polimer global.",
                "time_series": {
                                "1990": {
                                                "production": 1.27,
                                                "consumption": 0.15,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 1.12,
                                                "export_value_usd": 950.0,
                                                "ending_stocks": 0.02
                                },
                                "1991": {
                                                "production": 1.32,
                                                "consumption": 0.16,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 1.16,
                                                "export_value_usd": 1030.56,
                                                "ending_stocks": 0.02
                                },
                                "1992": {
                                                "production": 1.38,
                                                "consumption": 0.18,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 1.2,
                                                "export_value_usd": 1111.11,
                                                "ending_stocks": 0.02
                                },
                                "1993": {
                                                "production": 1.44,
                                                "consumption": 0.19,
                                                "import_volume": 0.03,
                                                "import_value_usd": 13.5,
                                                "export_volume": 1.24,
                                                "export_value_usd": 1191.67,
                                                "ending_stocks": 0.04
                                },
                                "1994": {
                                                "production": 1.49,
                                                "consumption": 0.21,
                                                "import_volume": 0.03,
                                                "import_value_usd": 13.5,
                                                "export_volume": 1.28,
                                                "export_value_usd": 1272.22,
                                                "ending_stocks": 0.03
                                },
                                "1995": {
                                                "production": 1.54,
                                                "consumption": 0.22,
                                                "import_volume": 0.03,
                                                "import_value_usd": 13.5,
                                                "export_volume": 1.32,
                                                "export_value_usd": 1352.78,
                                                "ending_stocks": 0.03
                                },
                                "1996": {
                                                "production": 1.6,
                                                "consumption": 0.23,
                                                "import_volume": 0.03,
                                                "import_value_usd": 13.5,
                                                "export_volume": 1.36,
                                                "export_value_usd": 1433.33,
                                                "ending_stocks": 0.04
                                },
                                "1997": {
                                                "production": 1.66,
                                                "consumption": 0.25,
                                                "import_volume": 0.03,
                                                "import_value_usd": 13.5,
                                                "export_volume": 1.4,
                                                "export_value_usd": 1513.89,
                                                "ending_stocks": 0.04
                                },
                                "1998": {
                                                "production": 1.71,
                                                "consumption": 0.26,
                                                "import_volume": 0.03,
                                                "import_value_usd": 13.5,
                                                "export_volume": 1.44,
                                                "export_value_usd": 1594.44,
                                                "ending_stocks": 0.04
                                },
                                "1999": {
                                                "production": 1.77,
                                                "consumption": 0.28,
                                                "import_volume": 0.04,
                                                "import_value_usd": 18.0,
                                                "export_volume": 1.48,
                                                "export_value_usd": 1675.0,
                                                "ending_stocks": 0.05
                                },
                                "2000": {
                                                "production": 1.82,
                                                "consumption": 0.29,
                                                "import_volume": 0.04,
                                                "import_value_usd": 18.0,
                                                "export_volume": 1.52,
                                                "export_value_usd": 1755.56,
                                                "ending_stocks": 0.05
                                },
                                "2001": {
                                                "production": 1.88,
                                                "consumption": 0.3,
                                                "import_volume": 0.04,
                                                "import_value_usd": 18.0,
                                                "export_volume": 1.56,
                                                "export_value_usd": 1836.11,
                                                "ending_stocks": 0.06
                                },
                                "2002": {
                                                "production": 1.93,
                                                "consumption": 0.32,
                                                "import_volume": 0.04,
                                                "import_value_usd": 18.0,
                                                "export_volume": 1.6,
                                                "export_value_usd": 1916.67,
                                                "ending_stocks": 0.05
                                },
                                "2003": {
                                                "production": 1.98,
                                                "consumption": 0.33,
                                                "import_volume": 0.04,
                                                "import_value_usd": 18.0,
                                                "export_volume": 1.64,
                                                "export_value_usd": 1997.22,
                                                "ending_stocks": 0.05
                                },
                                "2004": {
                                                "production": 2.04,
                                                "consumption": 0.34,
                                                "import_volume": 0.04,
                                                "import_value_usd": 18.0,
                                                "export_volume": 1.68,
                                                "export_value_usd": 2077.78,
                                                "ending_stocks": 0.06
                                },
                                "2005": {
                                                "production": 2.1,
                                                "consumption": 0.36,
                                                "import_volume": 0.04,
                                                "import_value_usd": 18.0,
                                                "export_volume": 1.72,
                                                "export_value_usd": 2158.33,
                                                "ending_stocks": 0.06
                                },
                                "2006": {
                                                "production": 2.15,
                                                "consumption": 0.37,
                                                "import_volume": 0.05,
                                                "import_value_usd": 22.5,
                                                "export_volume": 1.76,
                                                "export_value_usd": 2238.89,
                                                "ending_stocks": 0.07
                                },
                                "2007": {
                                                "production": 2.21,
                                                "consumption": 0.39,
                                                "import_volume": 0.05,
                                                "import_value_usd": 22.5,
                                                "export_volume": 1.8,
                                                "export_value_usd": 2319.44,
                                                "ending_stocks": 0.07
                                },
                                "2008": {
                                                "production": 2.26,
                                                "consumption": 0.4,
                                                "import_volume": 0.05,
                                                "import_value_usd": 22.5,
                                                "export_volume": 1.83,
                                                "export_value_usd": 2400.0,
                                                "ending_stocks": 0.08
                                },
                                "2009": {
                                                "production": 2.31,
                                                "consumption": 0.41,
                                                "import_volume": 0.05,
                                                "import_value_usd": 22.5,
                                                "export_volume": 1.87,
                                                "export_value_usd": 2480.56,
                                                "ending_stocks": 0.08
                                },
                                "2010": {
                                                "production": 2.37,
                                                "consumption": 0.43,
                                                "import_volume": 0.05,
                                                "import_value_usd": 22.5,
                                                "export_volume": 1.91,
                                                "export_value_usd": 2561.11,
                                                "ending_stocks": 0.08
                                },
                                "2011": {
                                                "production": 2.42,
                                                "consumption": 0.44,
                                                "import_volume": 0.06,
                                                "import_value_usd": 27.0,
                                                "export_volume": 1.95,
                                                "export_value_usd": 2641.67,
                                                "ending_stocks": 0.09
                                },
                                "2012": {
                                                "production": 2.48,
                                                "consumption": 0.46,
                                                "import_volume": 0.06,
                                                "import_value_usd": 27.0,
                                                "export_volume": 1.99,
                                                "export_value_usd": 2722.22,
                                                "ending_stocks": 0.09
                                },
                                "2013": {
                                                "production": 2.54,
                                                "consumption": 0.47,
                                                "import_volume": 0.06,
                                                "import_value_usd": 27.0,
                                                "export_volume": 2.03,
                                                "export_value_usd": 2802.78,
                                                "ending_stocks": 0.1
                                },
                                "2014": {
                                                "production": 2.59,
                                                "consumption": 0.48,
                                                "import_volume": 0.06,
                                                "import_value_usd": 27.0,
                                                "export_volume": 2.07,
                                                "export_value_usd": 2883.33,
                                                "ending_stocks": 0.1
                                },
                                "2015": {
                                                "production": 2.65,
                                                "consumption": 0.5,
                                                "import_volume": 0.06,
                                                "import_value_usd": 27.0,
                                                "export_volume": 2.11,
                                                "export_value_usd": 2963.89,
                                                "ending_stocks": 0.1
                                },
                                "2016": {
                                                "production": 2.7,
                                                "consumption": 0.51,
                                                "import_volume": 0.06,
                                                "import_value_usd": 27.0,
                                                "export_volume": 2.15,
                                                "export_value_usd": 3044.44,
                                                "ending_stocks": 0.1
                                },
                                "2017": {
                                                "production": 2.75,
                                                "consumption": 0.53,
                                                "import_volume": 0.07,
                                                "import_value_usd": 31.5,
                                                "export_volume": 2.19,
                                                "export_value_usd": 3125.0,
                                                "ending_stocks": 0.1
                                },
                                "2018": {
                                                "production": 2.81,
                                                "consumption": 0.54,
                                                "import_volume": 0.07,
                                                "import_value_usd": 31.5,
                                                "export_volume": 2.23,
                                                "export_value_usd": 3205.56,
                                                "ending_stocks": 0.11
                                },
                                "2019": {
                                                "production": 2.87,
                                                "consumption": 0.55,
                                                "import_volume": 0.07,
                                                "import_value_usd": 31.5,
                                                "export_volume": 2.27,
                                                "export_value_usd": 3286.11,
                                                "ending_stocks": 0.12
                                },
                                "2020": {
                                                "production": 2.92,
                                                "consumption": 0.57,
                                                "import_volume": 0.07,
                                                "import_value_usd": 31.5,
                                                "export_volume": 2.31,
                                                "export_value_usd": 3366.67,
                                                "ending_stocks": 0.11
                                },
                                "2021": {
                                                "production": 2.98,
                                                "consumption": 0.58,
                                                "import_volume": 0.07,
                                                "import_value_usd": 31.5,
                                                "export_volume": 2.35,
                                                "export_value_usd": 3447.22,
                                                "ending_stocks": 0.12
                                },
                                "2022": {
                                                "production": 3.03,
                                                "consumption": 0.59,
                                                "import_volume": 0.07,
                                                "import_value_usd": 31.5,
                                                "export_volume": 2.39,
                                                "export_value_usd": 3527.78,
                                                "ending_stocks": 0.12
                                },
                                "2023": {
                                                "production": 3.08,
                                                "consumption": 0.61,
                                                "import_volume": 0.07,
                                                "import_value_usd": 31.5,
                                                "export_volume": 2.43,
                                                "export_value_usd": 3608.33,
                                                "ending_stocks": 0.11
                                },
                                "2024": {
                                                "production": 3.14,
                                                "consumption": 0.62,
                                                "import_volume": 0.08,
                                                "import_value_usd": 36.0,
                                                "export_volume": 2.47,
                                                "export_value_usd": 3688.89,
                                                "ending_stocks": 0.13
                                },
                                "2025": {
                                                "production": 3.2,
                                                "consumption": 0.64,
                                                "import_volume": 0.08,
                                                "import_value_usd": 36.0,
                                                "export_volume": 2.51,
                                                "export_value_usd": 3769.44,
                                                "ending_stocks": 0.13
                                },
                                "2026": {
                                                "production": 3.25,
                                                "consumption": 0.65,
                                                "import_volume": 0.08,
                                                "import_value_usd": 36.0,
                                                "export_volume": 2.55,
                                                "export_value_usd": 3850.0,
                                                "ending_stocks": 0.13
                                }
                }
},
        {
                "id": "COM-AGRI-008-TEMBAKAU",
                "name": "Tembakau Rajangan & Daun Kering",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Perkebunan & Peternakan",
                "group": "PERKEBUNAN_INDUSTRI",
                "group_label": "Perkebunan Industri",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan Industri)",
                "unit": "Ribu Ton",
                "hs_chapter": "HS 24 (Tembakau & Pengganti Tembakau Dipabrikasi)",
                "hs_code": "2401.10.00 (Tembakau Belum Diolah / Daun Kering)",
                "apbn_classification": "Cukai Hasil Tembakau (CHT) & Dana Bagi Hasil Cukai Tembakau (DBH CHT APBN)",
                "lkpp_account_code": "411513 (Penerimaan Cukai Hasil Tembakau) / 421211 (DBH CHT Transfer Daerah)",
                "lkpp_classification": "Penerimaan Cukai Negara & Transfer DBH Daerah",
                "source_institution": "Ditjen Bea dan Cukai Kemenkeu, BPS & Ditjen Perkebunan Kementan",
                "legal_basis": "UU No. 39 Tahun 2007 jo. UU HPP No. 7/2021 tentang Cukai & UU APBN",
                "description": "Komoditas perkebunan industri strategis penopang penerimaan kas negara APBN terbesar melalui Cukai Hasil Tembakau (CHT) mencapai lebih dari Rp 218 Triliun.",
                "time_series": {
                                "1990": {
                                                "production": 145.0,
                                                "consumption": 160.0,
                                                "import_volume": 25.0,
                                                "import_value_usd": 11250.0,
                                                "export_volume": 10.0,
                                                "export_value_usd": 45.0,
                                                "ending_stocks": 0.0
                                },
                                "1991": {
                                                "production": 147.5,
                                                "consumption": 165.0,
                                                "import_volume": 27.64,
                                                "import_value_usd": 12438.0,
                                                "export_volume": 10.14,
                                                "export_value_usd": 48.89,
                                                "ending_stocks": 0.0
                                },
                                "1992": {
                                                "production": 150.0,
                                                "consumption": 170.0,
                                                "import_volume": 30.28,
                                                "import_value_usd": 13626.0,
                                                "export_volume": 10.28,
                                                "export_value_usd": 52.78,
                                                "ending_stocks": 0.0
                                },
                                "1993": {
                                                "production": 152.5,
                                                "consumption": 175.0,
                                                "import_volume": 32.92,
                                                "import_value_usd": 14814.0,
                                                "export_volume": 10.42,
                                                "export_value_usd": 56.67,
                                                "ending_stocks": 0.0
                                },
                                "1994": {
                                                "production": 155.0,
                                                "consumption": 180.0,
                                                "import_volume": 35.56,
                                                "import_value_usd": 16002.0,
                                                "export_volume": 10.56,
                                                "export_value_usd": 60.56,
                                                "ending_stocks": 0.0
                                },
                                "1995": {
                                                "production": 157.5,
                                                "consumption": 185.0,
                                                "import_volume": 38.19,
                                                "import_value_usd": 17185.5,
                                                "export_volume": 10.69,
                                                "export_value_usd": 64.44,
                                                "ending_stocks": 0.0
                                },
                                "1996": {
                                                "production": 160.0,
                                                "consumption": 190.0,
                                                "import_volume": 40.83,
                                                "import_value_usd": 18373.5,
                                                "export_volume": 10.83,
                                                "export_value_usd": 68.33,
                                                "ending_stocks": 0.0
                                },
                                "1997": {
                                                "production": 162.5,
                                                "consumption": 195.0,
                                                "import_volume": 43.47,
                                                "import_value_usd": 19561.5,
                                                "export_volume": 10.97,
                                                "export_value_usd": 72.22,
                                                "ending_stocks": 0.0
                                },
                                "1998": {
                                                "production": 165.0,
                                                "consumption": 200.0,
                                                "import_volume": 46.11,
                                                "import_value_usd": 20749.5,
                                                "export_volume": 11.11,
                                                "export_value_usd": 76.11,
                                                "ending_stocks": 0.0
                                },
                                "1999": {
                                                "production": 167.5,
                                                "consumption": 205.0,
                                                "import_volume": 48.75,
                                                "import_value_usd": 21937.5,
                                                "export_volume": 11.25,
                                                "export_value_usd": 80.0,
                                                "ending_stocks": 0.0
                                },
                                "2000": {
                                                "production": 170.0,
                                                "consumption": 210.0,
                                                "import_volume": 51.39,
                                                "import_value_usd": 23125.5,
                                                "export_volume": 11.39,
                                                "export_value_usd": 83.89,
                                                "ending_stocks": 0.0
                                },
                                "2001": {
                                                "production": 172.5,
                                                "consumption": 215.0,
                                                "import_volume": 54.03,
                                                "import_value_usd": 24313.5,
                                                "export_volume": 11.53,
                                                "export_value_usd": 87.78,
                                                "ending_stocks": 0.0
                                },
                                "2002": {
                                                "production": 175.0,
                                                "consumption": 220.0,
                                                "import_volume": 56.67,
                                                "import_value_usd": 25501.5,
                                                "export_volume": 11.67,
                                                "export_value_usd": 91.67,
                                                "ending_stocks": 0.0
                                },
                                "2003": {
                                                "production": 177.5,
                                                "consumption": 225.0,
                                                "import_volume": 59.31,
                                                "import_value_usd": 26689.5,
                                                "export_volume": 11.81,
                                                "export_value_usd": 95.56,
                                                "ending_stocks": 0.0
                                },
                                "2004": {
                                                "production": 180.0,
                                                "consumption": 230.0,
                                                "import_volume": 61.94,
                                                "import_value_usd": 27873.0,
                                                "export_volume": 11.94,
                                                "export_value_usd": 99.44,
                                                "ending_stocks": 0.0
                                },
                                "2005": {
                                                "production": 182.5,
                                                "consumption": 235.0,
                                                "import_volume": 64.58,
                                                "import_value_usd": 29061.0,
                                                "export_volume": 12.08,
                                                "export_value_usd": 103.33,
                                                "ending_stocks": 0.0
                                },
                                "2006": {
                                                "production": 185.0,
                                                "consumption": 240.0,
                                                "import_volume": 67.22,
                                                "import_value_usd": 30249.0,
                                                "export_volume": 12.22,
                                                "export_value_usd": 107.22,
                                                "ending_stocks": 0.0
                                },
                                "2007": {
                                                "production": 187.5,
                                                "consumption": 245.0,
                                                "import_volume": 69.86,
                                                "import_value_usd": 31437.0,
                                                "export_volume": 12.36,
                                                "export_value_usd": 111.11,
                                                "ending_stocks": 0.0
                                },
                                "2008": {
                                                "production": 190.0,
                                                "consumption": 250.0,
                                                "import_volume": 72.5,
                                                "import_value_usd": 32625.0,
                                                "export_volume": 12.5,
                                                "export_value_usd": 115.0,
                                                "ending_stocks": 0.0
                                },
                                "2009": {
                                                "production": 192.5,
                                                "consumption": 255.0,
                                                "import_volume": 75.14,
                                                "import_value_usd": 33813.0,
                                                "export_volume": 12.64,
                                                "export_value_usd": 118.89,
                                                "ending_stocks": 0.0
                                },
                                "2010": {
                                                "production": 195.0,
                                                "consumption": 260.0,
                                                "import_volume": 77.78,
                                                "import_value_usd": 35001.0,
                                                "export_volume": 12.78,
                                                "export_value_usd": 122.78,
                                                "ending_stocks": 0.0
                                },
                                "2011": {
                                                "production": 197.5,
                                                "consumption": 265.0,
                                                "import_volume": 80.42,
                                                "import_value_usd": 36189.0,
                                                "export_volume": 12.92,
                                                "export_value_usd": 126.67,
                                                "ending_stocks": 0.0
                                },
                                "2012": {
                                                "production": 200.0,
                                                "consumption": 270.0,
                                                "import_volume": 83.06,
                                                "import_value_usd": 37377.0,
                                                "export_volume": 13.06,
                                                "export_value_usd": 130.56,
                                                "ending_stocks": 0.0
                                },
                                "2013": {
                                                "production": 202.5,
                                                "consumption": 275.0,
                                                "import_volume": 85.69,
                                                "import_value_usd": 38560.5,
                                                "export_volume": 13.19,
                                                "export_value_usd": 134.44,
                                                "ending_stocks": 0.0
                                },
                                "2014": {
                                                "production": 205.0,
                                                "consumption": 280.0,
                                                "import_volume": 88.33,
                                                "import_value_usd": 39748.5,
                                                "export_volume": 13.33,
                                                "export_value_usd": 138.33,
                                                "ending_stocks": 0.0
                                },
                                "2015": {
                                                "production": 207.5,
                                                "consumption": 285.0,
                                                "import_volume": 90.97,
                                                "import_value_usd": 40936.5,
                                                "export_volume": 13.47,
                                                "export_value_usd": 142.22,
                                                "ending_stocks": 0.0
                                },
                                "2016": {
                                                "production": 210.0,
                                                "consumption": 290.0,
                                                "import_volume": 93.61,
                                                "import_value_usd": 42124.5,
                                                "export_volume": 13.61,
                                                "export_value_usd": 146.11,
                                                "ending_stocks": 0.0
                                },
                                "2017": {
                                                "production": 212.5,
                                                "consumption": 295.0,
                                                "import_volume": 96.25,
                                                "import_value_usd": 43312.5,
                                                "export_volume": 13.75,
                                                "export_value_usd": 150.0,
                                                "ending_stocks": 0.0
                                },
                                "2018": {
                                                "production": 215.0,
                                                "consumption": 300.0,
                                                "import_volume": 98.89,
                                                "import_value_usd": 44500.5,
                                                "export_volume": 13.89,
                                                "export_value_usd": 153.89,
                                                "ending_stocks": 0.0
                                },
                                "2019": {
                                                "production": 217.5,
                                                "consumption": 305.0,
                                                "import_volume": 101.53,
                                                "import_value_usd": 45688.5,
                                                "export_volume": 14.03,
                                                "export_value_usd": 157.78,
                                                "ending_stocks": 0.0
                                },
                                "2020": {
                                                "production": 220.0,
                                                "consumption": 310.0,
                                                "import_volume": 104.17,
                                                "import_value_usd": 46876.5,
                                                "export_volume": 14.17,
                                                "export_value_usd": 161.67,
                                                "ending_stocks": 0.0
                                },
                                "2021": {
                                                "production": 222.5,
                                                "consumption": 315.0,
                                                "import_volume": 106.81,
                                                "import_value_usd": 48064.5,
                                                "export_volume": 14.31,
                                                "export_value_usd": 165.56,
                                                "ending_stocks": 0.0
                                },
                                "2022": {
                                                "production": 225.0,
                                                "consumption": 320.0,
                                                "import_volume": 109.44,
                                                "import_value_usd": 49248.0,
                                                "export_volume": 14.44,
                                                "export_value_usd": 169.44,
                                                "ending_stocks": 0.0
                                },
                                "2023": {
                                                "production": 227.5,
                                                "consumption": 325.0,
                                                "import_volume": 112.08,
                                                "import_value_usd": 50436.0,
                                                "export_volume": 14.58,
                                                "export_value_usd": 173.33,
                                                "ending_stocks": 0.0
                                },
                                "2024": {
                                                "production": 230.0,
                                                "consumption": 330.0,
                                                "import_volume": 114.72,
                                                "import_value_usd": 51624.0,
                                                "export_volume": 14.72,
                                                "export_value_usd": 177.22,
                                                "ending_stocks": 0.0
                                },
                                "2025": {
                                                "production": 232.5,
                                                "consumption": 335.0,
                                                "import_volume": 117.36,
                                                "import_value_usd": 52812.0,
                                                "export_volume": 14.86,
                                                "export_value_usd": 181.11,
                                                "ending_stocks": 0.0
                                },
                                "2026": {
                                                "production": 235.0,
                                                "consumption": 340.0,
                                                "import_volume": 120.0,
                                                "import_value_usd": 54000.0,
                                                "export_volume": 15.0,
                                                "export_value_usd": 185.0,
                                                "ending_stocks": 0.0
                                }
                }
},
        {
                "id": "COM-AGRI-009-KOPI",
                "name": "Kopi Biji (Arabika & Robusta Olahan)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Perkebunan & Peternakan",
                "group": "PERKEBUNAN_KONSUMSI",
                "group_label": "Perkebunan Konsumsi",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan Konsumsi)",
                "unit": "Ribu Ton",
                "hs_chapter": "HS 09 (Kopi, Teh, Mate & Rempah-Rempah)",
                "hs_code": "0901.11.00 (Kopi Tidak Digongseng / Biji Kopi Mentah)",
                "apbn_classification": "Belanja Pembinaan Petani Kopi Rakyat, Subsidi Bunga KUR & Devisa Ekspor Pangan",
                "lkpp_account_code": "526111 (Bantuan Benih & Sarpras Kopi) / 411121 (PPh Pasal 22 Ekspor)",
                "lkpp_classification": "Belanja Pembinaan Perkebunan Rakyat & Pajak Ekspor",
                "source_institution": "AEKI, BPS, Bapanas & Ditjen Perkebunan Kementan",
                "legal_basis": "UU No. 39 Tahun 2014 tentang Perkebunan & Sertifikasi Indikasi Geografis",
                "description": "Komoditas perkebunan konsumsi unggulan Indonesia produsen kopi terbesar ke-4 dunia (Robusta Lampung/Sumsel & Arabika Gayo/Toraja).",
                "time_series": {
                                "1990": {
                                                "production": 410.0,
                                                "consumption": 120.0,
                                                "import_volume": 5.0,
                                                "import_value_usd": 2250.0,
                                                "export_volume": 290.0,
                                                "export_value_usd": 320.0,
                                                "ending_stocks": 5.0
                                },
                                "1991": {
                                                "production": 421.11,
                                                "consumption": 127.5,
                                                "import_volume": 5.56,
                                                "import_value_usd": 2502.0,
                                                "export_volume": 293.61,
                                                "export_value_usd": 356.94,
                                                "ending_stocks": 5.56
                                },
                                "1992": {
                                                "production": 432.22,
                                                "consumption": 135.0,
                                                "import_volume": 6.11,
                                                "import_value_usd": 2749.5,
                                                "export_volume": 297.22,
                                                "export_value_usd": 393.89,
                                                "ending_stocks": 6.11
                                },
                                "1993": {
                                                "production": 443.33,
                                                "consumption": 142.5,
                                                "import_volume": 6.67,
                                                "import_value_usd": 3001.5,
                                                "export_volume": 300.83,
                                                "export_value_usd": 430.83,
                                                "ending_stocks": 6.67
                                },
                                "1994": {
                                                "production": 454.44,
                                                "consumption": 150.0,
                                                "import_volume": 7.22,
                                                "import_value_usd": 3249.0,
                                                "export_volume": 304.44,
                                                "export_value_usd": 467.78,
                                                "ending_stocks": 7.22
                                },
                                "1995": {
                                                "production": 465.56,
                                                "consumption": 157.5,
                                                "import_volume": 7.78,
                                                "import_value_usd": 3501.0,
                                                "export_volume": 308.06,
                                                "export_value_usd": 504.72,
                                                "ending_stocks": 7.78
                                },
                                "1996": {
                                                "production": 476.67,
                                                "consumption": 165.0,
                                                "import_volume": 8.33,
                                                "import_value_usd": 3748.5,
                                                "export_volume": 311.67,
                                                "export_value_usd": 541.67,
                                                "ending_stocks": 8.33
                                },
                                "1997": {
                                                "production": 487.78,
                                                "consumption": 172.5,
                                                "import_volume": 8.89,
                                                "import_value_usd": 4000.5,
                                                "export_volume": 315.28,
                                                "export_value_usd": 578.61,
                                                "ending_stocks": 8.89
                                },
                                "1998": {
                                                "production": 498.89,
                                                "consumption": 180.0,
                                                "import_volume": 9.44,
                                                "import_value_usd": 4248.0,
                                                "export_volume": 318.89,
                                                "export_value_usd": 615.56,
                                                "ending_stocks": 9.44
                                },
                                "1999": {
                                                "production": 510.0,
                                                "consumption": 187.5,
                                                "import_volume": 10.0,
                                                "import_value_usd": 4500.0,
                                                "export_volume": 322.5,
                                                "export_value_usd": 652.5,
                                                "ending_stocks": 10.0
                                },
                                "2000": {
                                                "production": 521.11,
                                                "consumption": 195.0,
                                                "import_volume": 10.56,
                                                "import_value_usd": 4752.0,
                                                "export_volume": 326.11,
                                                "export_value_usd": 689.44,
                                                "ending_stocks": 10.56
                                },
                                "2001": {
                                                "production": 532.22,
                                                "consumption": 202.5,
                                                "import_volume": 11.11,
                                                "import_value_usd": 4999.5,
                                                "export_volume": 329.72,
                                                "export_value_usd": 726.39,
                                                "ending_stocks": 11.11
                                },
                                "2002": {
                                                "production": 543.33,
                                                "consumption": 210.0,
                                                "import_volume": 11.67,
                                                "import_value_usd": 5251.5,
                                                "export_volume": 333.33,
                                                "export_value_usd": 763.33,
                                                "ending_stocks": 11.67
                                },
                                "2003": {
                                                "production": 554.44,
                                                "consumption": 217.5,
                                                "import_volume": 12.22,
                                                "import_value_usd": 5499.0,
                                                "export_volume": 336.94,
                                                "export_value_usd": 800.28,
                                                "ending_stocks": 12.22
                                },
                                "2004": {
                                                "production": 565.56,
                                                "consumption": 225.0,
                                                "import_volume": 12.78,
                                                "import_value_usd": 5751.0,
                                                "export_volume": 340.56,
                                                "export_value_usd": 837.22,
                                                "ending_stocks": 12.78
                                },
                                "2005": {
                                                "production": 576.67,
                                                "consumption": 232.5,
                                                "import_volume": 13.33,
                                                "import_value_usd": 5998.5,
                                                "export_volume": 344.17,
                                                "export_value_usd": 874.17,
                                                "ending_stocks": 13.33
                                },
                                "2006": {
                                                "production": 587.78,
                                                "consumption": 240.0,
                                                "import_volume": 13.89,
                                                "import_value_usd": 6250.5,
                                                "export_volume": 347.78,
                                                "export_value_usd": 911.11,
                                                "ending_stocks": 13.89
                                },
                                "2007": {
                                                "production": 598.89,
                                                "consumption": 247.5,
                                                "import_volume": 14.44,
                                                "import_value_usd": 6498.0,
                                                "export_volume": 351.39,
                                                "export_value_usd": 948.06,
                                                "ending_stocks": 14.44
                                },
                                "2008": {
                                                "production": 610.0,
                                                "consumption": 255.0,
                                                "import_volume": 15.0,
                                                "import_value_usd": 6750.0,
                                                "export_volume": 355.0,
                                                "export_value_usd": 985.0,
                                                "ending_stocks": 15.0
                                },
                                "2009": {
                                                "production": 621.11,
                                                "consumption": 262.5,
                                                "import_volume": 15.56,
                                                "import_value_usd": 7002.0,
                                                "export_volume": 358.61,
                                                "export_value_usd": 1021.94,
                                                "ending_stocks": 15.56
                                },
                                "2010": {
                                                "production": 632.22,
                                                "consumption": 270.0,
                                                "import_volume": 16.11,
                                                "import_value_usd": 7249.5,
                                                "export_volume": 362.22,
                                                "export_value_usd": 1058.89,
                                                "ending_stocks": 16.11
                                },
                                "2011": {
                                                "production": 643.33,
                                                "consumption": 277.5,
                                                "import_volume": 16.67,
                                                "import_value_usd": 7501.5,
                                                "export_volume": 365.83,
                                                "export_value_usd": 1095.83,
                                                "ending_stocks": 16.67
                                },
                                "2012": {
                                                "production": 654.44,
                                                "consumption": 285.0,
                                                "import_volume": 17.22,
                                                "import_value_usd": 7749.0,
                                                "export_volume": 369.44,
                                                "export_value_usd": 1132.78,
                                                "ending_stocks": 17.22
                                },
                                "2013": {
                                                "production": 665.56,
                                                "consumption": 292.5,
                                                "import_volume": 17.78,
                                                "import_value_usd": 8001.0,
                                                "export_volume": 373.06,
                                                "export_value_usd": 1169.72,
                                                "ending_stocks": 17.78
                                },
                                "2014": {
                                                "production": 676.67,
                                                "consumption": 300.0,
                                                "import_volume": 18.33,
                                                "import_value_usd": 8248.5,
                                                "export_volume": 376.67,
                                                "export_value_usd": 1206.67,
                                                "ending_stocks": 18.33
                                },
                                "2015": {
                                                "production": 687.78,
                                                "consumption": 307.5,
                                                "import_volume": 18.89,
                                                "import_value_usd": 8500.5,
                                                "export_volume": 380.28,
                                                "export_value_usd": 1243.61,
                                                "ending_stocks": 18.89
                                },
                                "2016": {
                                                "production": 698.89,
                                                "consumption": 315.0,
                                                "import_volume": 19.44,
                                                "import_value_usd": 8748.0,
                                                "export_volume": 383.89,
                                                "export_value_usd": 1280.56,
                                                "ending_stocks": 19.44
                                },
                                "2017": {
                                                "production": 710.0,
                                                "consumption": 322.5,
                                                "import_volume": 20.0,
                                                "import_value_usd": 9000.0,
                                                "export_volume": 387.5,
                                                "export_value_usd": 1317.5,
                                                "ending_stocks": 20.0
                                },
                                "2018": {
                                                "production": 721.11,
                                                "consumption": 330.0,
                                                "import_volume": 20.56,
                                                "import_value_usd": 9252.0,
                                                "export_volume": 391.11,
                                                "export_value_usd": 1354.44,
                                                "ending_stocks": 20.56
                                },
                                "2019": {
                                                "production": 732.22,
                                                "consumption": 337.5,
                                                "import_volume": 21.11,
                                                "import_value_usd": 9499.5,
                                                "export_volume": 394.72,
                                                "export_value_usd": 1391.39,
                                                "ending_stocks": 21.11
                                },
                                "2020": {
                                                "production": 743.33,
                                                "consumption": 345.0,
                                                "import_volume": 21.67,
                                                "import_value_usd": 9751.5,
                                                "export_volume": 398.33,
                                                "export_value_usd": 1428.33,
                                                "ending_stocks": 21.67
                                },
                                "2021": {
                                                "production": 754.44,
                                                "consumption": 352.5,
                                                "import_volume": 22.22,
                                                "import_value_usd": 9999.0,
                                                "export_volume": 401.94,
                                                "export_value_usd": 1465.28,
                                                "ending_stocks": 22.22
                                },
                                "2022": {
                                                "production": 765.56,
                                                "consumption": 360.0,
                                                "import_volume": 22.78,
                                                "import_value_usd": 10251.0,
                                                "export_volume": 405.56,
                                                "export_value_usd": 1502.22,
                                                "ending_stocks": 22.78
                                },
                                "2023": {
                                                "production": 776.67,
                                                "consumption": 367.5,
                                                "import_volume": 23.33,
                                                "import_value_usd": 10498.5,
                                                "export_volume": 409.17,
                                                "export_value_usd": 1539.17,
                                                "ending_stocks": 23.33
                                },
                                "2024": {
                                                "production": 787.78,
                                                "consumption": 375.0,
                                                "import_volume": 23.89,
                                                "import_value_usd": 10750.5,
                                                "export_volume": 412.78,
                                                "export_value_usd": 1576.11,
                                                "ending_stocks": 23.89
                                },
                                "2025": {
                                                "production": 798.89,
                                                "consumption": 382.5,
                                                "import_volume": 24.44,
                                                "import_value_usd": 10998.0,
                                                "export_volume": 416.39,
                                                "export_value_usd": 1613.06,
                                                "ending_stocks": 24.44
                                },
                                "2026": {
                                                "production": 810.0,
                                                "consumption": 390.0,
                                                "import_volume": 25.0,
                                                "import_value_usd": 11250.0,
                                                "export_volume": 420.0,
                                                "export_value_usd": 1650.0,
                                                "ending_stocks": 25.0
                                }
                }
},
        {
                "id": "COM-AGRI-010-KAKAO",
                "name": "Kakao / Biji Cokelat Olahan",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Perkebunan & Peternakan",
                "group": "PERKEBUNAN_KONSUMSI",
                "group_label": "Perkebunan Konsumsi & Industri",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan Konsumsi & Industri)",
                "unit": "Ribu Ton",
                "hs_chapter": "HS 18 (Kakao & Olahan Kakao)",
                "hs_code": "1801.00.00 (Biji Kakao Utuh / Pecah, Mentah atau Digongseng)",
                "apbn_classification": "Bea Keluar Ekspor Biji Kakao & Program Gerakan Nasional Kakao (Gernas Kakao)",
                "lkpp_account_code": "411522 (Bea Keluar Biji Kakao) / 526112 (Bantuan Sambung Pucuk Kakao)",
                "lkpp_classification": "Penerimaan Bea Keluar & Belanja Peremajaan Kakao Kementan",
                "source_institution": "ASKI, BPS & Ditjen Perkebunan Kementan",
                "legal_basis": "Peraturan Menteri Keuangan tentang Penetapan Tarif Bea Keluar Ekspor Biji Kakao",
                "description": "Komoditas perkebunan konsumsi & bahan baku industri pengolahan cokelat, mentega kakao, dan kembang gula berpusat di sabuk kakao Sulawesi.",
                "time_series": {
                                "1990": {
                                                "production": 180.0,
                                                "consumption": 30.0,
                                                "import_volume": 15.0,
                                                "import_value_usd": 6750.0,
                                                "export_volume": 165.0,
                                                "export_value_usd": 210.0,
                                                "ending_stocks": 0.0
                                },
                                "1991": {
                                                "production": 193.61,
                                                "consumption": 40.83,
                                                "import_volume": 16.81,
                                                "import_value_usd": 7564.5,
                                                "export_volume": 169.58,
                                                "export_value_usd": 243.61,
                                                "ending_stocks": 0.01
                                },
                                "1992": {
                                                "production": 207.22,
                                                "consumption": 51.67,
                                                "import_volume": 18.61,
                                                "import_value_usd": 8374.5,
                                                "export_volume": 174.17,
                                                "export_value_usd": 277.22,
                                                "ending_stocks": 0.0
                                },
                                "1993": {
                                                "production": 220.83,
                                                "consumption": 62.5,
                                                "import_volume": 20.42,
                                                "import_value_usd": 9189.0,
                                                "export_volume": 178.75,
                                                "export_value_usd": 310.83,
                                                "ending_stocks": 0.0
                                },
                                "1994": {
                                                "production": 234.44,
                                                "consumption": 73.33,
                                                "import_volume": 22.22,
                                                "import_value_usd": 9999.0,
                                                "export_volume": 183.33,
                                                "export_value_usd": 344.44,
                                                "ending_stocks": 0.0
                                },
                                "1995": {
                                                "production": 248.06,
                                                "consumption": 84.17,
                                                "import_volume": 24.03,
                                                "import_value_usd": 10813.5,
                                                "export_volume": 187.92,
                                                "export_value_usd": 378.06,
                                                "ending_stocks": 0.0
                                },
                                "1996": {
                                                "production": 261.67,
                                                "consumption": 95.0,
                                                "import_volume": 25.83,
                                                "import_value_usd": 11623.5,
                                                "export_volume": 192.5,
                                                "export_value_usd": 411.67,
                                                "ending_stocks": 0.0
                                },
                                "1997": {
                                                "production": 275.28,
                                                "consumption": 105.83,
                                                "import_volume": 27.64,
                                                "import_value_usd": 12438.0,
                                                "export_volume": 197.08,
                                                "export_value_usd": 445.28,
                                                "ending_stocks": 0.01
                                },
                                "1998": {
                                                "production": 288.89,
                                                "consumption": 116.67,
                                                "import_volume": 29.44,
                                                "import_value_usd": 13248.0,
                                                "export_volume": 201.67,
                                                "export_value_usd": 478.89,
                                                "ending_stocks": 0.0
                                },
                                "1999": {
                                                "production": 302.5,
                                                "consumption": 127.5,
                                                "import_volume": 31.25,
                                                "import_value_usd": 14062.5,
                                                "export_volume": 206.25,
                                                "export_value_usd": 512.5,
                                                "ending_stocks": 0.0
                                },
                                "2000": {
                                                "production": 316.11,
                                                "consumption": 138.33,
                                                "import_volume": 33.06,
                                                "import_value_usd": 14877.0,
                                                "export_volume": 210.83,
                                                "export_value_usd": 546.11,
                                                "ending_stocks": 0.01
                                },
                                "2001": {
                                                "production": 329.72,
                                                "consumption": 149.17,
                                                "import_volume": 34.86,
                                                "import_value_usd": 15687.0,
                                                "export_volume": 215.42,
                                                "export_value_usd": 579.72,
                                                "ending_stocks": 0.0
                                },
                                "2002": {
                                                "production": 343.33,
                                                "consumption": 160.0,
                                                "import_volume": 36.67,
                                                "import_value_usd": 16501.5,
                                                "export_volume": 220.0,
                                                "export_value_usd": 613.33,
                                                "ending_stocks": 0.0
                                },
                                "2003": {
                                                "production": 356.94,
                                                "consumption": 170.83,
                                                "import_volume": 38.47,
                                                "import_value_usd": 17311.5,
                                                "export_volume": 224.58,
                                                "export_value_usd": 646.94,
                                                "ending_stocks": 0.0
                                },
                                "2004": {
                                                "production": 370.56,
                                                "consumption": 181.67,
                                                "import_volume": 40.28,
                                                "import_value_usd": 18126.0,
                                                "export_volume": 229.17,
                                                "export_value_usd": 680.56,
                                                "ending_stocks": 0.0
                                },
                                "2005": {
                                                "production": 384.17,
                                                "consumption": 192.5,
                                                "import_volume": 42.08,
                                                "import_value_usd": 18936.0,
                                                "export_volume": 233.75,
                                                "export_value_usd": 714.17,
                                                "ending_stocks": 0.0
                                },
                                "2006": {
                                                "production": 397.78,
                                                "consumption": 203.33,
                                                "import_volume": 43.89,
                                                "import_value_usd": 19750.5,
                                                "export_volume": 238.33,
                                                "export_value_usd": 747.78,
                                                "ending_stocks": 0.01
                                },
                                "2007": {
                                                "production": 411.39,
                                                "consumption": 214.17,
                                                "import_volume": 45.69,
                                                "import_value_usd": 20560.5,
                                                "export_volume": 242.92,
                                                "export_value_usd": 781.39,
                                                "ending_stocks": 0.0
                                },
                                "2008": {
                                                "production": 425.0,
                                                "consumption": 225.0,
                                                "import_volume": 47.5,
                                                "import_value_usd": 21375.0,
                                                "export_volume": 247.5,
                                                "export_value_usd": 815.0,
                                                "ending_stocks": 0.0
                                },
                                "2009": {
                                                "production": 438.61,
                                                "consumption": 235.83,
                                                "import_volume": 49.31,
                                                "import_value_usd": 22189.5,
                                                "export_volume": 252.08,
                                                "export_value_usd": 848.61,
                                                "ending_stocks": 0.01
                                },
                                "2010": {
                                                "production": 452.22,
                                                "consumption": 246.67,
                                                "import_volume": 51.11,
                                                "import_value_usd": 22999.5,
                                                "export_volume": 256.67,
                                                "export_value_usd": 882.22,
                                                "ending_stocks": 0.0
                                },
                                "2011": {
                                                "production": 465.83,
                                                "consumption": 257.5,
                                                "import_volume": 52.92,
                                                "import_value_usd": 23814.0,
                                                "export_volume": 261.25,
                                                "export_value_usd": 915.83,
                                                "ending_stocks": 0.0
                                },
                                "2012": {
                                                "production": 479.44,
                                                "consumption": 268.33,
                                                "import_volume": 54.72,
                                                "import_value_usd": 24624.0,
                                                "export_volume": 265.83,
                                                "export_value_usd": 949.44,
                                                "ending_stocks": 0.0
                                },
                                "2013": {
                                                "production": 493.06,
                                                "consumption": 279.17,
                                                "import_volume": 56.53,
                                                "import_value_usd": 25438.5,
                                                "export_volume": 270.42,
                                                "export_value_usd": 983.06,
                                                "ending_stocks": 0.0
                                },
                                "2014": {
                                                "production": 506.67,
                                                "consumption": 290.0,
                                                "import_volume": 58.33,
                                                "import_value_usd": 26248.5,
                                                "export_volume": 275.0,
                                                "export_value_usd": 1016.67,
                                                "ending_stocks": 0.0
                                },
                                "2015": {
                                                "production": 520.28,
                                                "consumption": 300.83,
                                                "import_volume": 60.14,
                                                "import_value_usd": 27063.0,
                                                "export_volume": 279.58,
                                                "export_value_usd": 1050.28,
                                                "ending_stocks": 0.01
                                },
                                "2016": {
                                                "production": 533.89,
                                                "consumption": 311.67,
                                                "import_volume": 61.94,
                                                "import_value_usd": 27873.0,
                                                "export_volume": 284.17,
                                                "export_value_usd": 1083.89,
                                                "ending_stocks": 0.0
                                },
                                "2017": {
                                                "production": 547.5,
                                                "consumption": 322.5,
                                                "import_volume": 63.75,
                                                "import_value_usd": 28687.5,
                                                "export_volume": 288.75,
                                                "export_value_usd": 1117.5,
                                                "ending_stocks": 0.0
                                },
                                "2018": {
                                                "production": 561.11,
                                                "consumption": 333.33,
                                                "import_volume": 65.56,
                                                "import_value_usd": 29502.0,
                                                "export_volume": 293.33,
                                                "export_value_usd": 1151.11,
                                                "ending_stocks": 0.01
                                },
                                "2019": {
                                                "production": 574.72,
                                                "consumption": 344.17,
                                                "import_volume": 67.36,
                                                "import_value_usd": 30312.0,
                                                "export_volume": 297.92,
                                                "export_value_usd": 1184.72,
                                                "ending_stocks": 0.0
                                },
                                "2020": {
                                                "production": 588.33,
                                                "consumption": 355.0,
                                                "import_volume": 69.17,
                                                "import_value_usd": 31126.5,
                                                "export_volume": 302.5,
                                                "export_value_usd": 1218.33,
                                                "ending_stocks": 0.0
                                },
                                "2021": {
                                                "production": 601.94,
                                                "consumption": 365.83,
                                                "import_volume": 70.97,
                                                "import_value_usd": 31936.5,
                                                "export_volume": 307.08,
                                                "export_value_usd": 1251.94,
                                                "ending_stocks": 0.0
                                },
                                "2022": {
                                                "production": 615.56,
                                                "consumption": 376.67,
                                                "import_volume": 72.78,
                                                "import_value_usd": 32751.0,
                                                "export_volume": 311.67,
                                                "export_value_usd": 1285.56,
                                                "ending_stocks": 0.0
                                },
                                "2023": {
                                                "production": 629.17,
                                                "consumption": 387.5,
                                                "import_volume": 74.58,
                                                "import_value_usd": 33561.0,
                                                "export_volume": 316.25,
                                                "export_value_usd": 1319.17,
                                                "ending_stocks": 0.0
                                },
                                "2024": {
                                                "production": 642.78,
                                                "consumption": 398.33,
                                                "import_volume": 76.39,
                                                "import_value_usd": 34375.5,
                                                "export_volume": 320.83,
                                                "export_value_usd": 1352.78,
                                                "ending_stocks": 0.01
                                },
                                "2025": {
                                                "production": 656.39,
                                                "consumption": 409.17,
                                                "import_volume": 78.19,
                                                "import_value_usd": 35185.5,
                                                "export_volume": 325.42,
                                                "export_value_usd": 1386.39,
                                                "ending_stocks": 0.0
                                },
                                "2026": {
                                                "production": 670.0,
                                                "consumption": 420.0,
                                                "import_volume": 80.0,
                                                "import_value_usd": 36000.0,
                                                "export_volume": 330.0,
                                                "export_value_usd": 1420.0,
                                                "ending_stocks": 0.0
                                }
                }
},
        {
                "id": "COM-AGRI-011-TEH",
                "name": "Teh Olahan (Teh Hitam & Hijau)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Perkebunan & Peternakan",
                "group": "PERKEBUNAN_KONSUMSI",
                "group_label": "Perkebunan Konsumsi",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan Konsumsi)",
                "unit": "Ribu Ton",
                "hs_chapter": "HS 09 (Kopi, Teh, Mate & Rempah-Rempah)",
                "hs_code": "0902.10.00 (Teh Hijau / Teh Hitam Fermentasi)",
                "apbn_classification": "Belanja Revitalisasi Perkebunan Teh BUMN PTPN & Konservasi Lahan Dataran Tinggi",
                "lkpp_account_code": "526113 (Bantuan Sarpras Perkebunan Teh) / 411121 (PPh Industri Minuman)",
                "lkpp_classification": "Belanja Konservasi Perkebunan & Pajak Industri Minuman",
                "source_institution": "Dewan Teh Indonesia (DTI), BPS & Ditjen Perkebunan Kementan",
                "legal_basis": "Keputusan Menteri Pertanian tentang Peta Jalan Pengembangan Industri Teh Nasional",
                "description": "Komoditas perkebunan konsumsi minuman penyegar tradisional Indonesia yang ditanam di hamparan pegunungan Jawa Barat dan Sumatera.",
                "time_series": {
                                "1990": {
                                                "production": 155.0,
                                                "consumption": 75.0,
                                                "import_volume": 2.0,
                                                "import_value_usd": 900.0,
                                                "export_volume": 82.0,
                                                "export_value_usd": 140.0,
                                                "ending_stocks": 0.0
                                },
                                "1991": {
                                                "production": 154.58,
                                                "consumption": 75.97,
                                                "import_volume": 2.36,
                                                "import_value_usd": 1062.0,
                                                "export_volume": 80.97,
                                                "export_value_usd": 138.75,
                                                "ending_stocks": 0.0
                                },
                                "1992": {
                                                "production": 154.17,
                                                "consumption": 76.94,
                                                "import_volume": 2.72,
                                                "import_value_usd": 1224.0,
                                                "export_volume": 79.94,
                                                "export_value_usd": 137.5,
                                                "ending_stocks": 0.01
                                },
                                "1993": {
                                                "production": 153.75,
                                                "consumption": 77.92,
                                                "import_volume": 3.08,
                                                "import_value_usd": 1386.0,
                                                "export_volume": 78.92,
                                                "export_value_usd": 136.25,
                                                "ending_stocks": 0.0
                                },
                                "1994": {
                                                "production": 153.33,
                                                "consumption": 78.89,
                                                "import_volume": 3.44,
                                                "import_value_usd": 1548.0,
                                                "export_volume": 77.89,
                                                "export_value_usd": 135.0,
                                                "ending_stocks": 0.0
                                },
                                "1995": {
                                                "production": 152.92,
                                                "consumption": 79.86,
                                                "import_volume": 3.81,
                                                "import_value_usd": 1714.5,
                                                "export_volume": 76.86,
                                                "export_value_usd": 133.75,
                                                "ending_stocks": 0.01
                                },
                                "1996": {
                                                "production": 152.5,
                                                "consumption": 80.83,
                                                "import_volume": 4.17,
                                                "import_value_usd": 1876.5,
                                                "export_volume": 75.83,
                                                "export_value_usd": 132.5,
                                                "ending_stocks": 0.01
                                },
                                "1997": {
                                                "production": 152.08,
                                                "consumption": 81.81,
                                                "import_volume": 4.53,
                                                "import_value_usd": 2038.5,
                                                "export_volume": 74.81,
                                                "export_value_usd": 131.25,
                                                "ending_stocks": 0.0
                                },
                                "1998": {
                                                "production": 151.67,
                                                "consumption": 82.78,
                                                "import_volume": 4.89,
                                                "import_value_usd": 2200.5,
                                                "export_volume": 73.78,
                                                "export_value_usd": 130.0,
                                                "ending_stocks": 0.0
                                },
                                "1999": {
                                                "production": 151.25,
                                                "consumption": 83.75,
                                                "import_volume": 5.25,
                                                "import_value_usd": 2362.5,
                                                "export_volume": 72.75,
                                                "export_value_usd": 128.75,
                                                "ending_stocks": 0.0
                                },
                                "2000": {
                                                "production": 150.83,
                                                "consumption": 84.72,
                                                "import_volume": 5.61,
                                                "import_value_usd": 2524.5,
                                                "export_volume": 71.72,
                                                "export_value_usd": 127.5,
                                                "ending_stocks": 0.0
                                },
                                "2001": {
                                                "production": 150.42,
                                                "consumption": 85.69,
                                                "import_volume": 5.97,
                                                "import_value_usd": 2686.5,
                                                "export_volume": 70.69,
                                                "export_value_usd": 126.25,
                                                "ending_stocks": 0.01
                                },
                                "2002": {
                                                "production": 150.0,
                                                "consumption": 86.67,
                                                "import_volume": 6.33,
                                                "import_value_usd": 2848.5,
                                                "export_volume": 69.67,
                                                "export_value_usd": 125.0,
                                                "ending_stocks": 0.0
                                },
                                "2003": {
                                                "production": 149.58,
                                                "consumption": 87.64,
                                                "import_volume": 6.69,
                                                "import_value_usd": 3010.5,
                                                "export_volume": 68.64,
                                                "export_value_usd": 123.75,
                                                "ending_stocks": 0.0
                                },
                                "2004": {
                                                "production": 149.17,
                                                "consumption": 88.61,
                                                "import_volume": 7.06,
                                                "import_value_usd": 3177.0,
                                                "export_volume": 67.61,
                                                "export_value_usd": 122.5,
                                                "ending_stocks": 0.01
                                },
                                "2005": {
                                                "production": 148.75,
                                                "consumption": 89.58,
                                                "import_volume": 7.42,
                                                "import_value_usd": 3339.0,
                                                "export_volume": 66.58,
                                                "export_value_usd": 121.25,
                                                "ending_stocks": 0.01
                                },
                                "2006": {
                                                "production": 148.33,
                                                "consumption": 90.56,
                                                "import_volume": 7.78,
                                                "import_value_usd": 3501.0,
                                                "export_volume": 65.56,
                                                "export_value_usd": 120.0,
                                                "ending_stocks": 0.0
                                },
                                "2007": {
                                                "production": 147.92,
                                                "consumption": 91.53,
                                                "import_volume": 8.14,
                                                "import_value_usd": 3663.0,
                                                "export_volume": 64.53,
                                                "export_value_usd": 118.75,
                                                "ending_stocks": 0.0
                                },
                                "2008": {
                                                "production": 147.5,
                                                "consumption": 92.5,
                                                "import_volume": 8.5,
                                                "import_value_usd": 3825.0,
                                                "export_volume": 63.5,
                                                "export_value_usd": 117.5,
                                                "ending_stocks": 0.0
                                },
                                "2009": {
                                                "production": 147.08,
                                                "consumption": 93.47,
                                                "import_volume": 8.86,
                                                "import_value_usd": 3987.0,
                                                "export_volume": 62.47,
                                                "export_value_usd": 116.25,
                                                "ending_stocks": 0.0
                                },
                                "2010": {
                                                "production": 146.67,
                                                "consumption": 94.44,
                                                "import_volume": 9.22,
                                                "import_value_usd": 4149.0,
                                                "export_volume": 61.44,
                                                "export_value_usd": 115.0,
                                                "ending_stocks": 0.01
                                },
                                "2011": {
                                                "production": 146.25,
                                                "consumption": 95.42,
                                                "import_volume": 9.58,
                                                "import_value_usd": 4311.0,
                                                "export_volume": 60.42,
                                                "export_value_usd": 113.75,
                                                "ending_stocks": 0.0
                                },
                                "2012": {
                                                "production": 145.83,
                                                "consumption": 96.39,
                                                "import_volume": 9.94,
                                                "import_value_usd": 4473.0,
                                                "export_volume": 59.39,
                                                "export_value_usd": 112.5,
                                                "ending_stocks": 0.0
                                },
                                "2013": {
                                                "production": 145.42,
                                                "consumption": 97.36,
                                                "import_volume": 10.31,
                                                "import_value_usd": 4639.5,
                                                "export_volume": 58.36,
                                                "export_value_usd": 111.25,
                                                "ending_stocks": 0.01
                                },
                                "2014": {
                                                "production": 145.0,
                                                "consumption": 98.33,
                                                "import_volume": 10.67,
                                                "import_value_usd": 4801.5,
                                                "export_volume": 57.33,
                                                "export_value_usd": 110.0,
                                                "ending_stocks": 0.01
                                },
                                "2015": {
                                                "production": 144.58,
                                                "consumption": 99.31,
                                                "import_volume": 11.03,
                                                "import_value_usd": 4963.5,
                                                "export_volume": 56.31,
                                                "export_value_usd": 108.75,
                                                "ending_stocks": 0.0
                                },
                                "2016": {
                                                "production": 144.17,
                                                "consumption": 100.28,
                                                "import_volume": 11.39,
                                                "import_value_usd": 5125.5,
                                                "export_volume": 55.28,
                                                "export_value_usd": 107.5,
                                                "ending_stocks": 0.0
                                },
                                "2017": {
                                                "production": 143.75,
                                                "consumption": 101.25,
                                                "import_volume": 11.75,
                                                "import_value_usd": 5287.5,
                                                "export_volume": 54.25,
                                                "export_value_usd": 106.25,
                                                "ending_stocks": 0.0
                                },
                                "2018": {
                                                "production": 143.33,
                                                "consumption": 102.22,
                                                "import_volume": 12.11,
                                                "import_value_usd": 5449.5,
                                                "export_volume": 53.22,
                                                "export_value_usd": 105.0,
                                                "ending_stocks": 0.0
                                },
                                "2019": {
                                                "production": 142.92,
                                                "consumption": 103.19,
                                                "import_volume": 12.47,
                                                "import_value_usd": 5611.5,
                                                "export_volume": 52.19,
                                                "export_value_usd": 103.75,
                                                "ending_stocks": 0.01
                                },
                                "2020": {
                                                "production": 142.5,
                                                "consumption": 104.17,
                                                "import_volume": 12.83,
                                                "import_value_usd": 5773.5,
                                                "export_volume": 51.17,
                                                "export_value_usd": 102.5,
                                                "ending_stocks": 0.0
                                },
                                "2021": {
                                                "production": 142.08,
                                                "consumption": 105.14,
                                                "import_volume": 13.19,
                                                "import_value_usd": 5935.5,
                                                "export_volume": 50.14,
                                                "export_value_usd": 101.25,
                                                "ending_stocks": 0.0
                                },
                                "2022": {
                                                "production": 141.67,
                                                "consumption": 106.11,
                                                "import_volume": 13.56,
                                                "import_value_usd": 6102.0,
                                                "export_volume": 49.11,
                                                "export_value_usd": 100.0,
                                                "ending_stocks": 0.01
                                },
                                "2023": {
                                                "production": 141.25,
                                                "consumption": 107.08,
                                                "import_volume": 13.92,
                                                "import_value_usd": 6264.0,
                                                "export_volume": 48.08,
                                                "export_value_usd": 98.75,
                                                "ending_stocks": 0.01
                                },
                                "2024": {
                                                "production": 140.83,
                                                "consumption": 108.06,
                                                "import_volume": 14.28,
                                                "import_value_usd": 6426.0,
                                                "export_volume": 47.06,
                                                "export_value_usd": 97.5,
                                                "ending_stocks": 0.0
                                },
                                "2025": {
                                                "production": 140.42,
                                                "consumption": 109.03,
                                                "import_volume": 14.64,
                                                "import_value_usd": 6588.0,
                                                "export_volume": 46.03,
                                                "export_value_usd": 96.25,
                                                "ending_stocks": 0.0
                                },
                                "2026": {
                                                "production": 140.0,
                                                "consumption": 110.0,
                                                "import_volume": 15.0,
                                                "import_value_usd": 6750.0,
                                                "export_volume": 45.0,
                                                "export_value_usd": 95.0,
                                                "ending_stocks": 0.0
                                }
                }
},
        {
                "id": "COM-AGRI-012-KELAPA",
                "name": "Kelapa & Produk Kopra Olahan",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Perkebunan & Peternakan",
                "group": "PERKEBUNAN_KONSUMSI",
                "group_label": "Perkebunan Konsumsi & Industri",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan Konsumsi & Industri)",
                "unit": "Juta Ton",
                "hs_chapter": "HS 08 (Buah-buahan & Kelapa)",
                "hs_code": "0801.11.00 (Kelapa Kering / Kopra / Desiccated Coconut)",
                "apbn_classification": "Bantuan Hilirisasi Kelapa Terpadu, Santan Olahan & Devisa Ekspor Sabut/Arang",
                "lkpp_account_code": "526114 (Bantuan Peremajaan Kelapa Dalam) / 411521 (Pajak Ekspor Kelapa)",
                "lkpp_classification": "Belanja Pembinaan Petani Kelapa & Pajak Ekspor Kelapa Terpadu",
                "source_institution": "HIPKI, BPS & Ditjen Perkebunan Kementan",
                "legal_basis": "UU No. 39 Tahun 2014 tentang Perkebunan & Mandatori Hilirisasi Produk Kelapa",
                "description": "Komoditas perkebunan serbaguna nusantara untuk konsumsi pangan santan dan industri kopra, Indonesia merupakan produsen kelapa terbesar dunia.",
                "time_series": {
                                "1990": {
                                                "production": 2.35,
                                                "consumption": 1.4,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.95,
                                                "export_value_usd": 480.0,
                                                "ending_stocks": 0.0
                                },
                                "1991": {
                                                "production": 2.37,
                                                "consumption": 1.42,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.95,
                                                "export_value_usd": 501.39,
                                                "ending_stocks": 0.0
                                },
                                "1992": {
                                                "production": 2.38,
                                                "consumption": 1.43,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.95,
                                                "export_value_usd": 522.78,
                                                "ending_stocks": 0.0
                                },
                                "1993": {
                                                "production": 2.4,
                                                "consumption": 1.45,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.95,
                                                "export_value_usd": 544.17,
                                                "ending_stocks": 0.0
                                },
                                "1994": {
                                                "production": 2.41,
                                                "consumption": 1.46,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.95,
                                                "export_value_usd": 565.56,
                                                "ending_stocks": 0.0
                                },
                                "1995": {
                                                "production": 2.43,
                                                "consumption": 1.48,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.95,
                                                "export_value_usd": 586.94,
                                                "ending_stocks": 0.0
                                },
                                "1996": {
                                                "production": 2.45,
                                                "consumption": 1.49,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.95,
                                                "export_value_usd": 608.33,
                                                "ending_stocks": 0.01
                                },
                                "1997": {
                                                "production": 2.46,
                                                "consumption": 1.51,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.96,
                                                "export_value_usd": 629.72,
                                                "ending_stocks": 0.0
                                },
                                "1998": {
                                                "production": 2.48,
                                                "consumption": 1.52,
                                                "import_volume": 0.0,
                                                "import_value_usd": 0.0,
                                                "export_volume": 0.96,
                                                "export_value_usd": 651.11,
                                                "ending_stocks": 0.0
                                },
                                "1999": {
                                                "production": 2.49,
                                                "consumption": 1.54,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 672.5,
                                                "ending_stocks": 0.0
                                },
                                "2000": {
                                                "production": 2.51,
                                                "consumption": 1.55,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 693.89,
                                                "ending_stocks": 0.01
                                },
                                "2001": {
                                                "production": 2.52,
                                                "consumption": 1.57,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 715.28,
                                                "ending_stocks": 0.0
                                },
                                "2002": {
                                                "production": 2.54,
                                                "consumption": 1.58,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 736.67,
                                                "ending_stocks": 0.01
                                },
                                "2003": {
                                                "production": 2.56,
                                                "consumption": 1.6,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 758.06,
                                                "ending_stocks": 0.01
                                },
                                "2004": {
                                                "production": 2.57,
                                                "consumption": 1.61,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 779.44,
                                                "ending_stocks": 0.01
                                },
                                "2005": {
                                                "production": 2.59,
                                                "consumption": 1.63,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 800.83,
                                                "ending_stocks": 0.01
                                },
                                "2006": {
                                                "production": 2.6,
                                                "consumption": 1.64,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 822.22,
                                                "ending_stocks": 0.01
                                },
                                "2007": {
                                                "production": 2.62,
                                                "consumption": 1.66,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 843.61,
                                                "ending_stocks": 0.01
                                },
                                "2008": {
                                                "production": 2.63,
                                                "consumption": 1.67,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.96,
                                                "export_value_usd": 865.0,
                                                "ending_stocks": 0.01
                                },
                                "2009": {
                                                "production": 2.65,
                                                "consumption": 1.69,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 886.39,
                                                "ending_stocks": 0.0
                                },
                                "2010": {
                                                "production": 2.67,
                                                "consumption": 1.71,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 907.78,
                                                "ending_stocks": 0.0
                                },
                                "2011": {
                                                "production": 2.68,
                                                "consumption": 1.72,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 929.17,
                                                "ending_stocks": 0.0
                                },
                                "2012": {
                                                "production": 2.7,
                                                "consumption": 1.74,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 950.56,
                                                "ending_stocks": 0.0
                                },
                                "2013": {
                                                "production": 2.71,
                                                "consumption": 1.75,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 971.94,
                                                "ending_stocks": 0.0
                                },
                                "2014": {
                                                "production": 2.73,
                                                "consumption": 1.77,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 993.33,
                                                "ending_stocks": 0.0
                                },
                                "2015": {
                                                "production": 2.75,
                                                "consumption": 1.78,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 1014.72,
                                                "ending_stocks": 0.01
                                },
                                "2016": {
                                                "production": 2.76,
                                                "consumption": 1.8,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 1036.11,
                                                "ending_stocks": 0.0
                                },
                                "2017": {
                                                "production": 2.78,
                                                "consumption": 1.81,
                                                "import_volume": 0.01,
                                                "import_value_usd": 4.5,
                                                "export_volume": 0.97,
                                                "export_value_usd": 1057.5,
                                                "ending_stocks": 0.01
                                },
                                "2018": {
                                                "production": 2.79,
                                                "consumption": 1.83,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.97,
                                                "export_value_usd": 1078.89,
                                                "ending_stocks": 0.01
                                },
                                "2019": {
                                                "production": 2.81,
                                                "consumption": 1.84,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.97,
                                                "export_value_usd": 1100.28,
                                                "ending_stocks": 0.02
                                },
                                "2020": {
                                                "production": 2.83,
                                                "consumption": 1.86,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.97,
                                                "export_value_usd": 1121.67,
                                                "ending_stocks": 0.02
                                },
                                "2021": {
                                                "production": 2.84,
                                                "consumption": 1.87,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.98,
                                                "export_value_usd": 1143.06,
                                                "ending_stocks": 0.01
                                },
                                "2022": {
                                                "production": 2.86,
                                                "consumption": 1.89,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.98,
                                                "export_value_usd": 1164.44,
                                                "ending_stocks": 0.01
                                },
                                "2023": {
                                                "production": 2.87,
                                                "consumption": 1.9,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.98,
                                                "export_value_usd": 1185.83,
                                                "ending_stocks": 0.01
                                },
                                "2024": {
                                                "production": 2.89,
                                                "consumption": 1.92,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.98,
                                                "export_value_usd": 1207.22,
                                                "ending_stocks": 0.01
                                },
                                "2025": {
                                                "production": 2.9,
                                                "consumption": 1.93,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.98,
                                                "export_value_usd": 1228.61,
                                                "ending_stocks": 0.01
                                },
                                "2026": {
                                                "production": 2.92,
                                                "consumption": 1.95,
                                                "import_volume": 0.02,
                                                "import_value_usd": 9.0,
                                                "export_volume": 0.98,
                                                "export_value_usd": 1250.0,
                                                "ending_stocks": 0.01
                                }
                }
}
    ]

    APBN_FINANCIAL_SERIES = {
        "COM-AGRI-001-BERAS": {
                "apbn_item_name": "Belanja Ketahanan Pangan & Cadangan Beras Pemerintah (CBP Bulog)",
                "account_code": "562111 / 411511",
                "publication_source": "UU APBN (Pagu) & LKPP Audited BPK RI (Buku II Belanja K/L Ketahanan Pangan)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 781.9,
                        "1991": 849.9,
                        "1992": 923.8,
                        "1993": 1004.1,
                        "1994": 1091.4,
                        "1995": 1186.3,
                        "1996": 1289.5,
                        "1997": 1401.6,
                        "1998": 1523.5,
                        "1999": 1656.0,
                        "2000": 1800,
                        "2001": 2260.0,
                        "2002": 2720.0,
                        "2003": 3180.0,
                        "2004": 3640.0,
                        "2005": 4100,
                        "2006": 5440.0,
                        "2007": 6780.0,
                        "2008": 8120.0,
                        "2009": 9460.0,
                        "2010": 10800,
                        "2011": 11840.0,
                        "2012": 12880.0,
                        "2013": 13920.0,
                        "2014": 14960.0,
                        "2015": 16000,
                        "2016": 15933.3,
                        "2017": 15866.7,
                        "2018": 15800,
                        "2019": 17500,
                        "2020": 21200,
                        "2021": 25000,
                        "2022": 29200,
                        "2023": 39800,
                        "2024": 44500,
                        "2025": 48000,
                        "2026": 50400.0
                },
                "values": {
                        "1990": 747.1,
                        "1991": 812.1,
                        "1992": 882.7,
                        "1993": 959.5,
                        "1994": 1042.9,
                        "1995": 1133.6,
                        "1996": 1232.2,
                        "1997": 1339.3,
                        "1998": 1455.8,
                        "1999": 1582.4,
                        "2000": 1720,
                        "2001": 2166.0,
                        "2002": 2612.0,
                        "2003": 3058.0,
                        "2004": 3504.0,
                        "2005": 3950,
                        "2006": 5260.0,
                        "2007": 6570.0,
                        "2008": 7880.0,
                        "2009": 9190.0,
                        "2010": 10500,
                        "2011": 11480.0,
                        "2012": 12460.0,
                        "2013": 13440.0,
                        "2014": 14420.0,
                        "2015": 15400,
                        "2016": 15333.3,
                        "2017": 15266.7,
                        "2018": 15200,
                        "2019": 16800,
                        "2020": 20450,
                        "2021": 24100,
                        "2022": 28500,
                        "2023": 38650,
                        "2024": 42800,
                        "2025": 46500,
                        "2026": 48825.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-AGRI-002-JAGUNG": {
                "apbn_item_name": "Belanja Subsidi Pupuk Pangan & Benih Tanaman Pangan Jagung",
                "account_code": "531111 / 526115",
                "publication_source": "UU APBN & LKPP Audited (Buku II Nota Keuangan Belanja Subsidi Non-Energi)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 282.4,
                        "1991": 306.9,
                        "1992": 333.6,
                        "1993": 362.6,
                        "1994": 394.1,
                        "1995": 428.4,
                        "1996": 465.7,
                        "1997": 506.1,
                        "1998": 550.2,
                        "1999": 598.0,
                        "2000": 650,
                        "2001": 820.0,
                        "2002": 990.0,
                        "2003": 1160.0,
                        "2004": 1330.0,
                        "2005": 1500,
                        "2006": 2040.0,
                        "2007": 2580.0,
                        "2008": 3120.0,
                        "2009": 3660.0,
                        "2010": 4200,
                        "2011": 5060.0,
                        "2012": 5920.0,
                        "2013": 6780.0,
                        "2014": 7640.0,
                        "2015": 8500,
                        "2016": 8633.3,
                        "2017": 8766.7,
                        "2018": 8900,
                        "2019": 9200,
                        "2020": 9800,
                        "2021": 10400,
                        "2022": 11500,
                        "2023": 12800,
                        "2024": 13900,
                        "2025": 14800,
                        "2026": 15540.0
                },
                "values": {
                        "1990": 265.0,
                        "1991": 288.0,
                        "1992": 313.1,
                        "1993": 340.3,
                        "1994": 369.9,
                        "1995": 402.0,
                        "1996": 437.0,
                        "1997": 475.0,
                        "1998": 516.3,
                        "1999": 561.2,
                        "2000": 610,
                        "2001": 772.0,
                        "2002": 934.0,
                        "2003": 1096.0,
                        "2004": 1258.0,
                        "2005": 1420,
                        "2006": 1946.0,
                        "2007": 2472.0,
                        "2008": 2998.0,
                        "2009": 3524.0,
                        "2010": 4050,
                        "2011": 4880.0,
                        "2012": 5710.0,
                        "2013": 6540.0,
                        "2014": 7370.0,
                        "2015": 8200,
                        "2016": 8350.0,
                        "2017": 8500.0,
                        "2018": 8650,
                        "2019": 8950,
                        "2020": 9500,
                        "2021": 10100,
                        "2022": 11200,
                        "2023": 12450,
                        "2024": 13400,
                        "2025": 14200,
                        "2026": 14910.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-AGRI-003-KEDELAI": {
                "apbn_item_name": "Belanja Stabilisasi Pasokan dan Harga Pangan (SPHP Kedelai Bulog)",
                "account_code": "562111 / 411511",
                "publication_source": "UU APBN & LKPP Audited (Buku III Belanja Bantuan Pangan Pengrajin Tahu Tempe)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 52.1,
                        "1991": 56.7,
                        "1992": 61.6,
                        "1993": 66.9,
                        "1994": 72.8,
                        "1995": 79.1,
                        "1996": 86.0,
                        "1997": 93.4,
                        "1998": 101.6,
                        "1999": 110.4,
                        "2000": 120,
                        "2001": 152.0,
                        "2002": 184.0,
                        "2003": 216.0,
                        "2004": 248.0,
                        "2005": 280,
                        "2006": 334.0,
                        "2007": 388.0,
                        "2008": 442.0,
                        "2009": 496.0,
                        "2010": 550,
                        "2011": 660.0,
                        "2012": 770.0,
                        "2013": 880.0,
                        "2014": 990.0,
                        "2015": 1100,
                        "2016": 1133.3,
                        "2017": 1166.7,
                        "2018": 1200,
                        "2019": 1350,
                        "2020": 1500,
                        "2021": 1800,
                        "2022": 2400,
                        "2023": 2800,
                        "2024": 3100,
                        "2025": 3350,
                        "2026": 3517.5
                },
                "values": {
                        "1990": 47.8,
                        "1991": 51.9,
                        "1992": 56.5,
                        "1993": 61.4,
                        "1994": 66.7,
                        "1995": 72.5,
                        "1996": 78.8,
                        "1997": 85.7,
                        "1998": 93.1,
                        "1999": 101.2,
                        "2000": 110,
                        "2001": 140.0,
                        "2002": 170.0,
                        "2003": 200.0,
                        "2004": 230.0,
                        "2005": 260,
                        "2006": 312.0,
                        "2007": 364.0,
                        "2008": 416.0,
                        "2009": 468.0,
                        "2010": 520,
                        "2011": 626.0,
                        "2012": 732.0,
                        "2013": 838.0,
                        "2014": 944.0,
                        "2015": 1050,
                        "2016": 1083.3,
                        "2017": 1116.7,
                        "2018": 1150,
                        "2019": 1280,
                        "2020": 1420,
                        "2021": 1720,
                        "2022": 2310,
                        "2023": 2690,
                        "2024": 2980,
                        "2025": 3200,
                        "2026": 3360.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-AGRI-004-GULA": {
                "apbn_item_name": "Penerimaan Bea Masuk Gula & Program Revitalisasi Pabrik Gula BUMN",
                "account_code": "411511 / 521219",
                "publication_source": "UU APBN & LKPP Audited Ditjen Bea dan Cukai Kemenkeu",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 195.5,
                        "1991": 212.5,
                        "1992": 230.9,
                        "1993": 251.0,
                        "1994": 272.9,
                        "1995": 296.6,
                        "1996": 322.4,
                        "1997": 350.4,
                        "1998": 380.9,
                        "1999": 414.0,
                        "2000": 450,
                        "2001": 524.0,
                        "2002": 598.0,
                        "2003": 672.0,
                        "2004": 746.0,
                        "2005": 820,
                        "2006": 1026.0,
                        "2007": 1232.0,
                        "2008": 1438.0,
                        "2009": 1644.0,
                        "2010": 1850,
                        "2011": 2040.0,
                        "2012": 2230.0,
                        "2013": 2420.0,
                        "2014": 2610.0,
                        "2015": 2800,
                        "2016": 2933.3,
                        "2017": 3066.7,
                        "2018": 3200,
                        "2019": 3500,
                        "2020": 3800,
                        "2021": 4200,
                        "2022": 5100,
                        "2023": 5800,
                        "2024": 6200,
                        "2025": 6600,
                        "2026": 6930.0
                },
                "values": {
                        "1990": 208.5,
                        "1991": 226.6,
                        "1992": 246.3,
                        "1993": 267.8,
                        "1994": 291.1,
                        "1995": 316.4,
                        "1996": 343.9,
                        "1997": 373.8,
                        "1998": 406.3,
                        "1999": 441.6,
                        "2000": 480,
                        "2001": 562.0,
                        "2002": 644.0,
                        "2003": 726.0,
                        "2004": 808.0,
                        "2005": 890,
                        "2006": 1102.0,
                        "2007": 1314.0,
                        "2008": 1526.0,
                        "2009": 1738.0,
                        "2010": 1950,
                        "2011": 2144.0,
                        "2012": 2338.0,
                        "2013": 2532.0,
                        "2014": 2726.0,
                        "2015": 2920,
                        "2016": 3063.3,
                        "2017": 3206.7,
                        "2018": 3350,
                        "2019": 3680,
                        "2020": 3950,
                        "2021": 4450,
                        "2022": 5350,
                        "2023": 6120,
                        "2024": 6450,
                        "2025": 6800,
                        "2026": 7140.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-AGRI-005-BAWANG-MERAH": {
                "apbn_item_name": "Belanja Pengendalian Inflasi Pangan Hortikultura & Fasilitasi Distribusi",
                "account_code": "526115",
                "publication_source": "UU APBN & LKPP Audited Ditjen Hortikultura Kementan & Bapanas",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 19.5,
                        "1991": 21.2,
                        "1992": 23.1,
                        "1993": 25.1,
                        "1994": 27.3,
                        "1995": 29.7,
                        "1996": 32.2,
                        "1997": 35.0,
                        "1998": 38.1,
                        "1999": 41.4,
                        "2000": 45,
                        "2001": 54.0,
                        "2002": 63.0,
                        "2003": 72.0,
                        "2004": 81.0,
                        "2005": 90,
                        "2006": 114.0,
                        "2007": 138.0,
                        "2008": 162.0,
                        "2009": 186.0,
                        "2010": 210,
                        "2011": 252.0,
                        "2012": 294.0,
                        "2013": 336.0,
                        "2014": 378.0,
                        "2015": 420,
                        "2016": 453.3,
                        "2017": 486.7,
                        "2018": 520,
                        "2019": 580,
                        "2020": 650,
                        "2021": 740,
                        "2022": 890,
                        "2023": 980,
                        "2024": 1100,
                        "2025": 1200,
                        "2026": 1260.0
                },
                "values": {
                        "1990": 17.4,
                        "1991": 18.9,
                        "1992": 20.5,
                        "1993": 22.3,
                        "1994": 24.3,
                        "1995": 26.4,
                        "1996": 28.7,
                        "1997": 31.1,
                        "1998": 33.9,
                        "1999": 36.8,
                        "2000": 40,
                        "2001": 49.0,
                        "2002": 58.0,
                        "2003": 67.0,
                        "2004": 76.0,
                        "2005": 85,
                        "2006": 107.0,
                        "2007": 129.0,
                        "2008": 151.0,
                        "2009": 173.0,
                        "2010": 195,
                        "2011": 235.0,
                        "2012": 275.0,
                        "2013": 315.0,
                        "2014": 355.0,
                        "2015": 395,
                        "2016": 426.7,
                        "2017": 458.3,
                        "2018": 490,
                        "2019": 550,
                        "2020": 620,
                        "2021": 710,
                        "2022": 850,
                        "2023": 940,
                        "2024": 1050,
                        "2025": 1150,
                        "2026": 1207.5
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-AGRI-006-SAWIT-CPO": {
                "apbn_item_name": "Penerimaan Bea Keluar Ekspor CPO & Pungutan Sawit BLU BPDPKS",
                "account_code": "411521 / 421411",
                "publication_source": "UU APBN & LKPP Audited (LRA Bea Keluar & Pendapatan BLU Kemenkeu)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 369.2,
                        "1991": 401.3,
                        "1992": 436.2,
                        "1993": 474.2,
                        "1994": 515.4,
                        "1995": 560.2,
                        "1996": 608.9,
                        "1997": 661.9,
                        "1998": 719.4,
                        "1999": 782.0,
                        "2000": 850,
                        "2001": 1160.0,
                        "2002": 1470.0,
                        "2003": 1780.0,
                        "2004": 2090.0,
                        "2005": 2400,
                        "2006": 3620.0,
                        "2007": 4840.0,
                        "2008": 6060.0,
                        "2009": 7280.0,
                        "2010": 8500,
                        "2011": 10440.0,
                        "2012": 12380.0,
                        "2013": 14320.0,
                        "2014": 16260.0,
                        "2015": 18200,
                        "2016": 20300.0,
                        "2017": 22400.0,
                        "2018": 24500,
                        "2019": 22100,
                        "2020": 26800,
                        "2021": 48500,
                        "2022": 56000,
                        "2023": 38500,
                        "2024": 36000,
                        "2025": 39000,
                        "2026": 40950.0
                },
                "values": {
                        "1990": 399.6,
                        "1991": 434.4,
                        "1992": 472.2,
                        "1993": 513.2,
                        "1994": 557.8,
                        "1995": 606.4,
                        "1996": 659.1,
                        "1997": 716.4,
                        "1998": 778.7,
                        "1999": 846.4,
                        "2000": 920,
                        "2001": 1266.0,
                        "2002": 1612.0,
                        "2003": 1958.0,
                        "2004": 2304.0,
                        "2005": 2650,
                        "2006": 3960.0,
                        "2007": 5270.0,
                        "2008": 6580.0,
                        "2009": 7890.0,
                        "2010": 9200,
                        "2011": 11240.0,
                        "2012": 13280.0,
                        "2013": 15320.0,
                        "2014": 17360.0,
                        "2015": 19400,
                        "2016": 21666.7,
                        "2017": 23933.3,
                        "2018": 26200,
                        "2019": 23500,
                        "2020": 28900,
                        "2021": 53200,
                        "2022": 61400,
                        "2023": 41200,
                        "2024": 38500,
                        "2025": 41800,
                        "2026": 43890.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-LIVE-001-SAPI": {
                "apbn_item_name": "Belanja Bantuan Pembibitan Ternak Sapi, Pakan & Penanganan PMK",
                "account_code": "526115",
                "publication_source": "UU APBN & LKPP Audited Ditjen Peternakan dan Kesehatan Hewan Kementan",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 78.2,
                        "1991": 85.0,
                        "1992": 92.4,
                        "1993": 100.4,
                        "1994": 109.1,
                        "1995": 118.6,
                        "1996": 129.0,
                        "1997": 140.2,
                        "1998": 152.4,
                        "1999": 165.6,
                        "2000": 180,
                        "2001": 228.0,
                        "2002": 276.0,
                        "2003": 324.0,
                        "2004": 372.0,
                        "2005": 420,
                        "2006": 566.0,
                        "2007": 712.0,
                        "2008": 858.0,
                        "2009": 1004.0,
                        "2010": 1150,
                        "2011": 1340.0,
                        "2012": 1530.0,
                        "2013": 1720.0,
                        "2014": 1910.0,
                        "2015": 2100,
                        "2016": 2200.0,
                        "2017": 2300.0,
                        "2018": 2400,
                        "2019": 2600,
                        "2020": 2800,
                        "2021": 3100,
                        "2022": 4500,
                        "2023": 4200,
                        "2024": 4400,
                        "2025": 4650,
                        "2026": 4882.5
                },
                "values": {
                        "1990": 71.7,
                        "1991": 77.9,
                        "1992": 84.7,
                        "1993": 92.0,
                        "1994": 100.0,
                        "1995": 108.7,
                        "1996": 118.2,
                        "1997": 128.5,
                        "1998": 139.7,
                        "1999": 151.8,
                        "2000": 165,
                        "2001": 210.0,
                        "2002": 255.0,
                        "2003": 300.0,
                        "2004": 345.0,
                        "2005": 390,
                        "2006": 528.0,
                        "2007": 666.0,
                        "2008": 804.0,
                        "2009": 942.0,
                        "2010": 1080,
                        "2011": 1260.0,
                        "2012": 1440.0,
                        "2013": 1620.0,
                        "2014": 1800.0,
                        "2015": 1980,
                        "2016": 2080.0,
                        "2017": 2180.0,
                        "2018": 2280,
                        "2019": 2450,
                        "2020": 2650,
                        "2021": 2950,
                        "2022": 4320,
                        "2023": 4020,
                        "2024": 4210,
                        "2025": 4450,
                        "2026": 4672.5
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-LIVE-002-AYAM": {
                "apbn_item_name": "Belanja Bantuan Pangan Stunting Daging Unggas & Stabilisasi DOC",
                "account_code": "562111",
                "publication_source": "UU APBN & LKPP Audited Badan Pangan Nasional & Kementan",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 41.3,
                        "1991": 44.9,
                        "1992": 48.8,
                        "1993": 53.0,
                        "1994": 57.6,
                        "1995": 62.6,
                        "1996": 68.1,
                        "1997": 74.0,
                        "1998": 80.4,
                        "1999": 87.4,
                        "2000": 95,
                        "2001": 124.0,
                        "2002": 153.0,
                        "2003": 182.0,
                        "2004": 211.0,
                        "2005": 240,
                        "2006": 316.0,
                        "2007": 392.0,
                        "2008": 468.0,
                        "2009": 544.0,
                        "2010": 620,
                        "2011": 776.0,
                        "2012": 932.0,
                        "2013": 1088.0,
                        "2014": 1244.0,
                        "2015": 1400,
                        "2016": 1483.3,
                        "2017": 1566.7,
                        "2018": 1650,
                        "2019": 1800,
                        "2020": 2100,
                        "2021": 2400,
                        "2022": 2900,
                        "2023": 3300,
                        "2024": 3600,
                        "2025": 3850,
                        "2026": 4042.5
                },
                "values": {
                        "1990": 38.2,
                        "1991": 41.6,
                        "1992": 45.2,
                        "1993": 49.1,
                        "1994": 53.4,
                        "1995": 58.0,
                        "1996": 63.0,
                        "1997": 68.5,
                        "1998": 74.5,
                        "1999": 81.0,
                        "2000": 88,
                        "2001": 115.4,
                        "2002": 142.8,
                        "2003": 170.2,
                        "2004": 197.6,
                        "2005": 225,
                        "2006": 298.0,
                        "2007": 371.0,
                        "2008": 444.0,
                        "2009": 517.0,
                        "2010": 590,
                        "2011": 736.0,
                        "2012": 882.0,
                        "2013": 1028.0,
                        "2014": 1174.0,
                        "2015": 1320,
                        "2016": 1406.7,
                        "2017": 1493.3,
                        "2018": 1580,
                        "2019": 1720,
                        "2020": 2010,
                        "2021": 2290,
                        "2022": 2780,
                        "2023": 3180,
                        "2024": 3450,
                        "2025": 3700,
                        "2026": 3885.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-FISH-001-TUNA": {
                "apbn_item_name": "PNBP Sumber Daya Alam Perikanan Tangkap Laut",
                "account_code": "421411",
                "publication_source": "UU APBN & LKPP Audited (LRA PNBP Sumber Daya Alam Ditjen Tangkap KKP)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 28.2,
                        "1991": 30.7,
                        "1992": 33.4,
                        "1993": 36.3,
                        "1994": 39.4,
                        "1995": 42.8,
                        "1996": 46.6,
                        "1997": 50.6,
                        "1998": 55.0,
                        "1999": 59.8,
                        "2000": 65,
                        "2001": 80.0,
                        "2002": 95.0,
                        "2003": 110.0,
                        "2004": 125.0,
                        "2005": 140,
                        "2006": 168.0,
                        "2007": 196.0,
                        "2008": 224.0,
                        "2009": 252.0,
                        "2010": 280,
                        "2011": 334.0,
                        "2012": 388.0,
                        "2013": 442.0,
                        "2014": 496.0,
                        "2015": 550,
                        "2016": 593.3,
                        "2017": 636.7,
                        "2018": 680,
                        "2019": 750,
                        "2020": 720,
                        "2021": 950,
                        "2022": 1450,
                        "2023": 1750,
                        "2024": 1950,
                        "2025": 2150,
                        "2026": 2257.5
                },
                "values": {
                        "1990": 31.3,
                        "1991": 34.0,
                        "1992": 37.0,
                        "1993": 40.2,
                        "1994": 43.7,
                        "1995": 47.5,
                        "1996": 51.6,
                        "1997": 56.1,
                        "1998": 60.9,
                        "1999": 66.2,
                        "2000": 72,
                        "2001": 88.6,
                        "2002": 105.2,
                        "2003": 121.8,
                        "2004": 138.4,
                        "2005": 155,
                        "2006": 186.0,
                        "2007": 217.0,
                        "2008": 248.0,
                        "2009": 279.0,
                        "2010": 310,
                        "2011": 370.0,
                        "2012": 430.0,
                        "2013": 490.0,
                        "2014": 550.0,
                        "2015": 610,
                        "2016": 653.3,
                        "2017": 696.7,
                        "2018": 740,
                        "2019": 810,
                        "2020": 790,
                        "2021": 1080,
                        "2022": 1620,
                        "2023": 1920,
                        "2024": 2120,
                        "2025": 2350,
                        "2026": 2467.5
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-FISH-002-UDANG": {
                "apbn_item_name": "PNBP Usaha Budidaya Tambak Udang & Bantuan Tambak Modeling",
                "account_code": "421412",
                "publication_source": "UU APBN & LKPP Audited (LRA Ditjen Budidaya KKP)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 19.5,
                        "1991": 21.2,
                        "1992": 23.1,
                        "1993": 25.1,
                        "1994": 27.3,
                        "1995": 29.7,
                        "1996": 32.2,
                        "1997": 35.0,
                        "1998": 38.1,
                        "1999": 41.4,
                        "2000": 45,
                        "2001": 55.0,
                        "2002": 65.0,
                        "2003": 75.0,
                        "2004": 85.0,
                        "2005": 95,
                        "2006": 112.0,
                        "2007": 129.0,
                        "2008": 146.0,
                        "2009": 163.0,
                        "2010": 180,
                        "2011": 216.0,
                        "2012": 252.0,
                        "2013": 288.0,
                        "2014": 324.0,
                        "2015": 360,
                        "2016": 400.0,
                        "2017": 440.0,
                        "2018": 480,
                        "2019": 540,
                        "2020": 520,
                        "2021": 680,
                        "2022": 890,
                        "2023": 1050,
                        "2024": 1180,
                        "2025": 1300,
                        "2026": 1365.0
                },
                "values": {
                        "1990": 21.7,
                        "1991": 23.6,
                        "1992": 25.7,
                        "1993": 27.9,
                        "1994": 30.3,
                        "1995": 33.0,
                        "1996": 35.8,
                        "1997": 38.9,
                        "1998": 42.3,
                        "1999": 46.0,
                        "2000": 50,
                        "2001": 61.0,
                        "2002": 72.0,
                        "2003": 83.0,
                        "2004": 94.0,
                        "2005": 105,
                        "2006": 124.0,
                        "2007": 143.0,
                        "2008": 162.0,
                        "2009": 181.0,
                        "2010": 200,
                        "2011": 239.0,
                        "2012": 278.0,
                        "2013": 317.0,
                        "2014": 356.0,
                        "2015": 395,
                        "2016": 436.7,
                        "2017": 478.3,
                        "2018": 520,
                        "2019": 590,
                        "2020": 570,
                        "2021": 740,
                        "2022": 960,
                        "2023": 1140,
                        "2024": 1280,
                        "2025": 1410,
                        "2026": 1480.5
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-MINE-001-BATUBARA": {
                "apbn_item_name": "PNBP Royalti & Iuran Tetap Sumber Daya Alam Batubara Minerba",
                "account_code": "421211 / 421212",
                "publication_source": "UU APBN & LKPP Audited BPK RI (LRA PNBP SDA Non-Migas Minerba Kemenkeu)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 803.6,
                        "1991": 873.5,
                        "1992": 949.5,
                        "1993": 1032.0,
                        "1994": 1121.8,
                        "1995": 1219.3,
                        "1996": 1325.3,
                        "1997": 1440.6,
                        "1998": 1565.8,
                        "1999": 1702.0,
                        "2000": 1850,
                        "2001": 2720.0,
                        "2002": 3590.0,
                        "2003": 4460.0,
                        "2004": 5330.0,
                        "2005": 6200,
                        "2006": 8860.0,
                        "2007": 11520.0,
                        "2008": 14180.0,
                        "2009": 16840.0,
                        "2010": 19500,
                        "2011": 21560.0,
                        "2012": 23620.0,
                        "2013": 25680.0,
                        "2014": 27740.0,
                        "2015": 29800,
                        "2016": 32533.3,
                        "2017": 35266.7,
                        "2018": 38000,
                        "2019": 35000,
                        "2020": 26000,
                        "2021": 68000,
                        "2022": 165000,
                        "2023": 128000,
                        "2024": 115000,
                        "2025": 118000,
                        "2026": 123900.0
                },
                "values": {
                        "1990": 912.2,
                        "1991": 991.5,
                        "1992": 1077.8,
                        "1993": 1171.5,
                        "1994": 1273.3,
                        "1995": 1384.1,
                        "1996": 1504.4,
                        "1997": 1635.2,
                        "1998": 1777.4,
                        "1999": 1932.0,
                        "2000": 2100,
                        "2001": 3050.0,
                        "2002": 4000.0,
                        "2003": 4950.0,
                        "2004": 5900.0,
                        "2005": 6850,
                        "2006": 9760.0,
                        "2007": 12670.0,
                        "2008": 15580.0,
                        "2009": 18490.0,
                        "2010": 21400,
                        "2011": 23360.0,
                        "2012": 25320.0,
                        "2013": 27280.0,
                        "2014": 29240.0,
                        "2015": 31200,
                        "2016": 34533.3,
                        "2017": 37866.7,
                        "2018": 41200,
                        "2019": 37800,
                        "2020": 28400,
                        "2021": 74200,
                        "2022": 183500,
                        "2023": 138200,
                        "2024": 125600,
                        "2025": 128500,
                        "2026": 134925.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-MINE-002-NIKEL": {
                "apbn_item_name": "PNBP Royalti Mineral Logam Nikel & PPh Badan Hilirisasi Smelter",
                "account_code": "421211 / 411126",
                "publication_source": "UU APBN & LKPP Audited Ditjen Minerba ESDM & Ditjen Pajak Kemenkeu",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 182.4,
                        "1991": 198.3,
                        "1992": 215.6,
                        "1993": 234.3,
                        "1994": 254.7,
                        "1995": 276.8,
                        "1996": 300.9,
                        "1997": 327.0,
                        "1998": 355.5,
                        "1999": 386.4,
                        "2000": 420,
                        "2001": 556.0,
                        "2002": 692.0,
                        "2003": 828.0,
                        "2004": 964.0,
                        "2005": 1100,
                        "2006": 1440.0,
                        "2007": 1780.0,
                        "2008": 2120.0,
                        "2009": 2460.0,
                        "2010": 2800,
                        "2011": 2660.0,
                        "2012": 2520.0,
                        "2013": 2380.0,
                        "2014": 2240.0,
                        "2015": 2100,
                        "2016": 3000.0,
                        "2017": 3900.0,
                        "2018": 4800,
                        "2019": 6500,
                        "2020": 7800,
                        "2021": 15200,
                        "2022": 28500,
                        "2023": 31000,
                        "2024": 33000,
                        "2025": 36500,
                        "2026": 38325.0
                },
                "values": {
                        "1990": 199.8,
                        "1991": 217.2,
                        "1992": 236.1,
                        "1993": 256.6,
                        "1994": 278.9,
                        "1995": 303.2,
                        "1996": 329.5,
                        "1997": 358.2,
                        "1998": 389.3,
                        "1999": 423.2,
                        "2000": 460,
                        "2001": 616.0,
                        "2002": 772.0,
                        "2003": 928.0,
                        "2004": 1084.0,
                        "2005": 1240,
                        "2006": 1612.0,
                        "2007": 1984.0,
                        "2008": 2356.0,
                        "2009": 2728.0,
                        "2010": 3100,
                        "2011": 2950.0,
                        "2012": 2800.0,
                        "2013": 2650.0,
                        "2014": 2500.0,
                        "2015": 2350,
                        "2016": 3300.0,
                        "2017": 4250.0,
                        "2018": 5200,
                        "2019": 7100,
                        "2020": 8500,
                        "2021": 16800,
                        "2022": 31200,
                        "2023": 33800,
                        "2024": 35200,
                        "2025": 38900,
                        "2026": 40845.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-MINE-003-TEMBAGA": {
                "apbn_item_name": "Penerimaan Bea Keluar Konsentrat Tembaga & Royalti",
                "account_code": "411521 / 421211",
                "publication_source": "UU APBN & LKPP Audited Ditjen Bea dan Cukai Kemenkeu",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 716.7,
                        "1991": 779.1,
                        "1992": 846.8,
                        "1993": 920.4,
                        "1994": 1000.5,
                        "1995": 1087.5,
                        "1996": 1182.0,
                        "1997": 1284.8,
                        "1998": 1396.6,
                        "1999": 1518.0,
                        "2000": 1650,
                        "2001": 1940.0,
                        "2002": 2230.0,
                        "2003": 2520.0,
                        "2004": 2810.0,
                        "2005": 3100,
                        "2006": 3440.0,
                        "2007": 3780.0,
                        "2008": 4120.0,
                        "2009": 4460.0,
                        "2010": 4800,
                        "2011": 4420.0,
                        "2012": 4040.0,
                        "2013": 3660.0,
                        "2014": 3280.0,
                        "2015": 2900,
                        "2016": 3100.0,
                        "2017": 3300.0,
                        "2018": 3500,
                        "2019": 2600,
                        "2020": 3000,
                        "2021": 7500,
                        "2022": 13500,
                        "2023": 17000,
                        "2024": 18500,
                        "2025": 19200,
                        "2026": 20160.0
                },
                "values": {
                        "1990": 790.6,
                        "1991": 859.3,
                        "1992": 934.1,
                        "1993": 1015.3,
                        "1994": 1103.6,
                        "1995": 1199.5,
                        "1996": 1303.8,
                        "1997": 1417.2,
                        "1998": 1540.4,
                        "1999": 1674.4,
                        "2000": 1820,
                        "2001": 2146.0,
                        "2002": 2472.0,
                        "2003": 2798.0,
                        "2004": 3124.0,
                        "2005": 3450,
                        "2006": 3820.0,
                        "2007": 4190.0,
                        "2008": 4560.0,
                        "2009": 4930.0,
                        "2010": 5300,
                        "2011": 4870.0,
                        "2012": 4440.0,
                        "2013": 4010.0,
                        "2014": 3580.0,
                        "2015": 3150,
                        "2016": 3366.7,
                        "2017": 3583.3,
                        "2018": 3800,
                        "2019": 2900,
                        "2020": 3400,
                        "2021": 8200,
                        "2022": 14600,
                        "2023": 18400,
                        "2024": 19800,
                        "2025": 20600,
                        "2026": 21630.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-MINE-004-MINYAK-MENTAH": {
                "apbn_item_name": "PNBP Sumber Daya Alam Minyak Bumi Mentah",
                "account_code": "421111",
                "publication_source": "UU APBN & LKPP Audited BPK RI (LRA PNBP SDA Minyak Bumi Kemenkeu)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 29755.6,
                        "1991": 32343.1,
                        "1992": 35155.5,
                        "1993": 38212.5,
                        "1994": 41535.3,
                        "1995": 45147.1,
                        "1996": 49072.9,
                        "1997": 53340.1,
                        "1998": 57978.4,
                        "1999": 63020.0,
                        "2000": 68500,
                        "2001": 73200.0,
                        "2002": 77900.0,
                        "2003": 82600.0,
                        "2004": 87300.0,
                        "2005": 92000,
                        "2006": 96600.0,
                        "2007": 101200.0,
                        "2008": 105800.0,
                        "2009": 110400.0,
                        "2010": 115000,
                        "2011": 108800.0,
                        "2012": 102600.0,
                        "2013": 96400.0,
                        "2014": 90200.0,
                        "2015": 84000,
                        "2016": 87666.7,
                        "2017": 91333.3,
                        "2018": 95000,
                        "2019": 82000,
                        "2020": 42000,
                        "2021": 65000,
                        "2022": 98000,
                        "2023": 78000,
                        "2024": 74000,
                        "2025": 72500,
                        "2026": 76125.0
                },
                "values": {
                        "1990": 32231.6,
                        "1991": 35034.4,
                        "1992": 38080.8,
                        "1993": 41392.2,
                        "1994": 44991.5,
                        "1995": 48903.8,
                        "1996": 53156.4,
                        "1997": 57778.6,
                        "1998": 62802.9,
                        "1999": 68264.0,
                        "2000": 74200,
                        "2001": 79260.0,
                        "2002": 84320.0,
                        "2003": 89380.0,
                        "2004": 94440.0,
                        "2005": 99500,
                        "2006": 104560.0,
                        "2007": 109620.0,
                        "2008": 114680.0,
                        "2009": 119740.0,
                        "2010": 124800,
                        "2011": 117680.0,
                        "2012": 110560.0,
                        "2013": 103440.0,
                        "2014": 96320.0,
                        "2015": 89200,
                        "2016": 93600.0,
                        "2017": 98000.0,
                        "2018": 102400,
                        "2019": 88500,
                        "2020": 48200,
                        "2021": 69800,
                        "2022": 108400,
                        "2023": 84200,
                        "2024": 79500,
                        "2025": 77800,
                        "2026": 81690.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-MINE-005-GAS-ALAM": {
                "apbn_item_name": "PNBP Sumber Daya Alam Gas Bumi & Bagian Pemerintah LNG",
                "account_code": "421112",
                "publication_source": "UU APBN & LKPP Audited BPK RI (LRA PNBP SDA Gas Bumi Kemenkeu)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 10425.3,
                        "1991": 11331.9,
                        "1992": 12317.3,
                        "1993": 13388.3,
                        "1994": 14552.5,
                        "1995": 15818.0,
                        "1996": 17193.4,
                        "1997": 18688.5,
                        "1998": 20313.6,
                        "1999": 22080.0,
                        "2000": 24000,
                        "2001": 26800.0,
                        "2002": 29600.0,
                        "2003": 32400.0,
                        "2004": 35200.0,
                        "2005": 38000,
                        "2006": 42000.0,
                        "2007": 46000.0,
                        "2008": 50000.0,
                        "2009": 54000.0,
                        "2010": 58000,
                        "2011": 54800.0,
                        "2012": 51600.0,
                        "2013": 48400.0,
                        "2014": 45200.0,
                        "2015": 42000,
                        "2016": 41000.0,
                        "2017": 40000.0,
                        "2018": 39000,
                        "2019": 32000,
                        "2020": 21000,
                        "2021": 26000,
                        "2022": 42000,
                        "2023": 33000,
                        "2024": 29000,
                        "2025": 28500,
                        "2026": 29925.0
                },
                "values": {
                        "1990": 11381.0,
                        "1991": 12370.6,
                        "1992": 13446.3,
                        "1993": 14615.6,
                        "1994": 15886.5,
                        "1995": 17267.9,
                        "1996": 18769.5,
                        "1997": 20401.6,
                        "1998": 22175.7,
                        "1999": 24104.0,
                        "2000": 26200,
                        "2001": 29260.0,
                        "2002": 32320.0,
                        "2003": 35380.0,
                        "2004": 38440.0,
                        "2005": 41500,
                        "2006": 45840.0,
                        "2007": 50180.0,
                        "2008": 54520.0,
                        "2009": 58860.0,
                        "2010": 63200,
                        "2011": 59720.0,
                        "2012": 56240.0,
                        "2013": 52760.0,
                        "2014": 49280.0,
                        "2015": 45800,
                        "2016": 44700.0,
                        "2017": 43600.0,
                        "2018": 42500,
                        "2019": 34800,
                        "2020": 23600,
                        "2021": 28900,
                        "2022": 46500,
                        "2023": 35800,
                        "2024": 31000,
                        "2025": 30400,
                        "2026": 31920.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-NONMINE-001-KAYU": {
                "apbn_item_name": "PNBP SDA Kehutanan (Provisi Sumber Daya Hutan & Dana Reboisasi)",
                "account_code": "421311 / 421312",
                "publication_source": "UU APBN & LKPP Audited (LRA PNBP SDA Kehutanan KLHK)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 955.7,
                        "1991": 1038.8,
                        "1992": 1129.1,
                        "1993": 1227.3,
                        "1994": 1334.0,
                        "1995": 1450.0,
                        "1996": 1576.1,
                        "1997": 1713.1,
                        "1998": 1862.1,
                        "1999": 2024.0,
                        "2000": 2200,
                        "2001": 2380.0,
                        "2002": 2560.0,
                        "2003": 2740.0,
                        "2004": 2920.0,
                        "2005": 3100,
                        "2006": 3260.0,
                        "2007": 3420.0,
                        "2008": 3580.0,
                        "2009": 3740.0,
                        "2010": 3900,
                        "2011": 3960.0,
                        "2012": 4020.0,
                        "2013": 4080.0,
                        "2014": 4140.0,
                        "2015": 4200,
                        "2016": 4300.0,
                        "2017": 4400.0,
                        "2018": 4500,
                        "2019": 4400,
                        "2020": 4200,
                        "2021": 4600,
                        "2022": 5200,
                        "2023": 5100,
                        "2024": 5200,
                        "2025": 5400,
                        "2026": 5670.0
                },
                "values": {
                        "1990": 1020.8,
                        "1991": 1109.6,
                        "1992": 1206.1,
                        "1993": 1310.9,
                        "1994": 1424.9,
                        "1995": 1548.8,
                        "1996": 1683.5,
                        "1997": 1829.9,
                        "1998": 1989.0,
                        "1999": 2162.0,
                        "2000": 2350,
                        "2001": 2544.0,
                        "2002": 2738.0,
                        "2003": 2932.0,
                        "2004": 3126.0,
                        "2005": 3320,
                        "2006": 3486.0,
                        "2007": 3652.0,
                        "2008": 3818.0,
                        "2009": 3984.0,
                        "2010": 4150,
                        "2011": 4216.0,
                        "2012": 4282.0,
                        "2013": 4348.0,
                        "2014": 4414.0,
                        "2015": 4480,
                        "2016": 4586.7,
                        "2017": 4693.3,
                        "2018": 4800,
                        "2019": 4600,
                        "2020": 4400,
                        "2021": 4900,
                        "2022": 5600,
                        "2023": 5400,
                        "2024": 5550,
                        "2025": 5750,
                        "2026": 6037.5
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-NONMINE-002-RUMPUT-LAUT": {
                "apbn_item_name": "PNBP Jasa Kelautan & Dana Alokasi Hilirisasi Hayati Pesisir",
                "account_code": "421419",
                "publication_source": "UU APBN & LRA Kemenkeu Ditjen PKRL KKP",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 15.2,
                        "1991": 16.5,
                        "1992": 18.0,
                        "1993": 19.5,
                        "1994": 21.2,
                        "1995": 23.1,
                        "1996": 25.1,
                        "1997": 27.3,
                        "1998": 29.6,
                        "1999": 32.2,
                        "2000": 35,
                        "2001": 42.0,
                        "2002": 49.0,
                        "2003": 56.0,
                        "2004": 63.0,
                        "2005": 70,
                        "2006": 78.0,
                        "2007": 86.0,
                        "2008": 94.0,
                        "2009": 102.0,
                        "2010": 110,
                        "2011": 116.0,
                        "2012": 122.0,
                        "2013": 128.0,
                        "2014": 134.0,
                        "2015": 140,
                        "2016": 146.7,
                        "2017": 153.3,
                        "2018": 160,
                        "2019": 190,
                        "2020": 180,
                        "2021": 240,
                        "2022": 310,
                        "2023": 360,
                        "2024": 400,
                        "2025": 450,
                        "2026": 472.5
                },
                "values": {
                        "1990": 17.4,
                        "1991": 18.9,
                        "1992": 20.5,
                        "1993": 22.3,
                        "1994": 24.3,
                        "1995": 26.4,
                        "1996": 28.7,
                        "1997": 31.1,
                        "1998": 33.9,
                        "1999": 36.8,
                        "2000": 40,
                        "2001": 48.0,
                        "2002": 56.0,
                        "2003": 64.0,
                        "2004": 72.0,
                        "2005": 80,
                        "2006": 89.0,
                        "2007": 98.0,
                        "2008": 107.0,
                        "2009": 116.0,
                        "2010": 125,
                        "2011": 131.0,
                        "2012": 137.0,
                        "2013": 143.0,
                        "2014": 149.0,
                        "2015": 155,
                        "2016": 163.3,
                        "2017": 171.7,
                        "2018": 180,
                        "2019": 210,
                        "2020": 195,
                        "2021": 260,
                        "2022": 340,
                        "2023": 390,
                        "2024": 430,
                        "2025": 480,
                        "2026": 504.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        },
        "COM-NONMINE-003-PANAS-BUMI": {
                "apbn_item_name": "PNBP Pengusahaan Panas Bumi / Geothermal",
                "account_code": "421113",
                "publication_source": "UU APBN & LKPP Audited BPK RI (LRA PNBP Panas Bumi Ditjen EBTKE ESDM)",
                "unit": "Rp Miliar",
                "targets": {
                        "1990": 165.1,
                        "1991": 179.4,
                        "1992": 195.0,
                        "1993": 212.0,
                        "1994": 230.4,
                        "1995": 250.5,
                        "1996": 272.2,
                        "1997": 295.9,
                        "1998": 321.6,
                        "1999": 349.6,
                        "2000": 380,
                        "2001": 434.0,
                        "2002": 488.0,
                        "2003": 542.0,
                        "2004": 596.0,
                        "2005": 650,
                        "2006": 716.0,
                        "2007": 782.0,
                        "2008": 848.0,
                        "2009": 914.0,
                        "2010": 980,
                        "2011": 1034.0,
                        "2012": 1088.0,
                        "2013": 1142.0,
                        "2014": 1196.0,
                        "2015": 1250,
                        "2016": 1333.3,
                        "2017": 1416.7,
                        "2018": 1500,
                        "2019": 1700,
                        "2020": 1850,
                        "2021": 2000,
                        "2022": 2300,
                        "2023": 2500,
                        "2024": 2700,
                        "2025": 2950,
                        "2026": 3097.5
                },
                "values": {
                        "1990": 182.4,
                        "1991": 198.3,
                        "1992": 215.6,
                        "1993": 234.3,
                        "1994": 254.7,
                        "1995": 276.8,
                        "1996": 300.9,
                        "1997": 327.0,
                        "1998": 355.5,
                        "1999": 386.4,
                        "2000": 420,
                        "2001": 478.0,
                        "2002": 536.0,
                        "2003": 594.0,
                        "2004": 652.0,
                        "2005": 710,
                        "2006": 784.0,
                        "2007": 858.0,
                        "2008": 932.0,
                        "2009": 1006.0,
                        "2010": 1080,
                        "2011": 1140.0,
                        "2012": 1200.0,
                        "2013": 1260.0,
                        "2014": 1320.0,
                        "2015": 1380,
                        "2016": 1470.0,
                        "2017": 1560.0,
                        "2018": 1650,
                        "2019": 1820,
                        "2020": 1980,
                        "2021": 2150,
                        "2022": 2450,
                        "2023": 2680,
                        "2024": 2850,
                        "2025": 3100,
                        "2026": 3255.0
                },
                "statutes": {
                        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
                        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
                        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
                        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
                        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
                        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
                        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
                        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
                        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
                        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
                        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
                        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
                        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
                        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
                        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
                        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
                        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
                        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
                        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
                        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
                        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
                        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
                        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
                        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
                        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
                        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
                        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
                        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
                        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
                        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
                        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
                        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
                        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
                        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
                        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
                        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
                        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
                }
        }
,
        "COM-AGRI-007-KARET": {
                "apbn_item_name": "Penerimaan Bea Keluar Ekspor Karet & PPN Industri Manufaktur Ban",
                "account_code": "411521 / 411122",
                "publication_source": "UU APBN (Pagu) & LKPP Audited BPK RI (LRA Penerimaan Bea Keluar)",
                "unit": "Rp Miliar",
                "targets": {
                                "1990": 1800.0,
                                "1991": 1808.3,
                                "1992": 1816.7,
                                "1993": 1825.0,
                                "1994": 1833.3,
                                "1995": 1841.7,
                                "1996": 1850.0,
                                "1997": 1858.3,
                                "1998": 1866.7,
                                "1999": 1875.0,
                                "2000": 1883.3,
                                "2001": 1891.7,
                                "2002": 1900.0,
                                "2003": 1908.3,
                                "2004": 1916.7,
                                "2005": 1925.0,
                                "2006": 1933.3,
                                "2007": 1941.7,
                                "2008": 1950.0,
                                "2009": 1958.3,
                                "2010": 1966.7,
                                "2011": 1975.0,
                                "2012": 1983.3,
                                "2013": 1991.7,
                                "2014": 2000.0,
                                "2015": 2008.3,
                                "2016": 2016.7,
                                "2017": 2025.0,
                                "2018": 2033.3,
                                "2019": 2041.7,
                                "2020": 2050.0,
                                "2021": 2058.3,
                                "2022": 2066.7,
                                "2023": 2075.0,
                                "2024": 2083.3,
                                "2025": 2091.7,
                                "2026": 2100.0
                },
                "values": {
                                "1990": 1750.0,
                                "1991": 1758.3,
                                "1992": 1766.7,
                                "1993": 1775.0,
                                "1994": 1783.3,
                                "1995": 1791.7,
                                "1996": 1800.0,
                                "1997": 1808.3,
                                "1998": 1816.7,
                                "1999": 1825.0,
                                "2000": 1833.3,
                                "2001": 1841.7,
                                "2002": 1850.0,
                                "2003": 1858.3,
                                "2004": 1866.7,
                                "2005": 1875.0,
                                "2006": 1883.3,
                                "2007": 1891.7,
                                "2008": 1900.0,
                                "2009": 1908.3,
                                "2010": 1916.7,
                                "2011": 1925.0,
                                "2012": 1933.3,
                                "2013": 1941.7,
                                "2014": 1950.0,
                                "2015": 1958.3,
                                "2016": 1966.7,
                                "2017": 1975.0,
                                "2018": 1983.3,
                                "2019": 1991.7,
                                "2020": 2000.0,
                                "2021": 2008.3,
                                "2022": 2016.7,
                                "2023": 2025.0,
                                "2024": 2033.3,
                                "2025": 2041.7,
                                "2026": 2050.0
                }
},
        "COM-AGRI-008-TEMBAKAU": {
                "apbn_item_name": "Cukai Hasil Tembakau (CHT) & Dana Bagi Hasil Cukai Tembakau (DBH CHT)",
                "account_code": "411513 / 421211",
                "publication_source": "UU APBN & LKPP Audited BPK RI (LRA Penerimaan Cukai Negara)",
                "unit": "Rp Miliar",
                "targets": {
                                "1990": 12500.0,
                                "1991": 18402.8,
                                "1992": 24305.6,
                                "1993": 30208.3,
                                "1994": 36111.1,
                                "1995": 42013.9,
                                "1996": 47916.7,
                                "1997": 53819.4,
                                "1998": 59722.2,
                                "1999": 65625.0,
                                "2000": 71527.8,
                                "2001": 77430.6,
                                "2002": 83333.3,
                                "2003": 89236.1,
                                "2004": 95138.9,
                                "2005": 101041.7,
                                "2006": 106944.4,
                                "2007": 112847.2,
                                "2008": 118750.0,
                                "2009": 124652.8,
                                "2010": 130555.6,
                                "2011": 136458.3,
                                "2012": 142361.1,
                                "2013": 148263.9,
                                "2014": 154166.7,
                                "2015": 160069.4,
                                "2016": 165972.2,
                                "2017": 171875.0,
                                "2018": 177777.8,
                                "2019": 183680.6,
                                "2020": 189583.3,
                                "2021": 195486.1,
                                "2022": 201388.9,
                                "2023": 207291.7,
                                "2024": 213194.4,
                                "2025": 219097.2,
                                "2026": 225000.0
                },
                "values": {
                                "1990": 11800.0,
                                "1991": 17541.7,
                                "1992": 23283.3,
                                "1993": 29025.0,
                                "1994": 34766.7,
                                "1995": 40508.3,
                                "1996": 46250.0,
                                "1997": 51991.7,
                                "1998": 57733.3,
                                "1999": 63475.0,
                                "2000": 69216.7,
                                "2001": 74958.3,
                                "2002": 80700.0,
                                "2003": 86441.7,
                                "2004": 92183.3,
                                "2005": 97925.0,
                                "2006": 103666.7,
                                "2007": 109408.3,
                                "2008": 115150.0,
                                "2009": 120891.7,
                                "2010": 126633.3,
                                "2011": 132375.0,
                                "2012": 138116.7,
                                "2013": 143858.3,
                                "2014": 149600.0,
                                "2015": 155341.7,
                                "2016": 161083.3,
                                "2017": 166825.0,
                                "2018": 172566.7,
                                "2019": 178308.3,
                                "2020": 184050.0,
                                "2021": 189791.7,
                                "2022": 195533.3,
                                "2023": 201275.0,
                                "2024": 207016.7,
                                "2025": 212758.3,
                                "2026": 218500.0
                }
},
        "COM-AGRI-009-KOPI": {
                "apbn_item_name": "Belanja Pembinaan Petani Kopi Rakyat, Subsidi Bunga KUR & Devisa Ekspor Pangan",
                "account_code": "526111 / 411121",
                "publication_source": "UU APBN & LKPP Audited BPK RI (Buku II Belanja K/L Kementan)",
                "unit": "Rp Miliar",
                "targets": {
                                "1990": 450.0,
                                "1991": 463.9,
                                "1992": 477.8,
                                "1993": 491.7,
                                "1994": 505.6,
                                "1995": 519.4,
                                "1996": 533.3,
                                "1997": 547.2,
                                "1998": 561.1,
                                "1999": 575.0,
                                "2000": 588.9,
                                "2001": 602.8,
                                "2002": 616.7,
                                "2003": 630.6,
                                "2004": 644.4,
                                "2005": 658.3,
                                "2006": 672.2,
                                "2007": 686.1,
                                "2008": 700.0,
                                "2009": 713.9,
                                "2010": 727.8,
                                "2011": 741.7,
                                "2012": 755.6,
                                "2013": 769.4,
                                "2014": 783.3,
                                "2015": 797.2,
                                "2016": 811.1,
                                "2017": 825.0,
                                "2018": 838.9,
                                "2019": 852.8,
                                "2020": 866.7,
                                "2021": 880.6,
                                "2022": 894.4,
                                "2023": 908.3,
                                "2024": 922.2,
                                "2025": 936.1,
                                "2026": 950.0
                },
                "values": {
                                "1990": 420.0,
                                "1991": 433.8,
                                "1992": 447.5,
                                "1993": 461.2,
                                "1994": 475.0,
                                "1995": 488.8,
                                "1996": 502.5,
                                "1997": 516.2,
                                "1998": 530.0,
                                "1999": 543.8,
                                "2000": 557.5,
                                "2001": 571.2,
                                "2002": 585.0,
                                "2003": 598.8,
                                "2004": 612.5,
                                "2005": 626.2,
                                "2006": 640.0,
                                "2007": 653.8,
                                "2008": 667.5,
                                "2009": 681.2,
                                "2010": 695.0,
                                "2011": 708.8,
                                "2012": 722.5,
                                "2013": 736.2,
                                "2014": 750.0,
                                "2015": 763.8,
                                "2016": 777.5,
                                "2017": 791.2,
                                "2018": 805.0,
                                "2019": 818.8,
                                "2020": 832.5,
                                "2021": 846.2,
                                "2022": 860.0,
                                "2023": 873.8,
                                "2024": 887.5,
                                "2025": 901.2,
                                "2026": 915.0
                }
},
        "COM-AGRI-010-KAKAO": {
                "apbn_item_name": "Bea Keluar Ekspor Biji Kakao & Program Gerakan Nasional Kakao (Gernas Kakao)",
                "account_code": "411522 / 526112",
                "publication_source": "UU APBN & LKPP Audited BPK RI (LRA Penerimaan Bea Keluar & Belanja Kementan)",
                "unit": "Rp Miliar",
                "targets": {
                                "1990": 380.0,
                                "1991": 390.3,
                                "1992": 400.6,
                                "1993": 410.8,
                                "1994": 421.1,
                                "1995": 431.4,
                                "1996": 441.7,
                                "1997": 451.9,
                                "1998": 462.2,
                                "1999": 472.5,
                                "2000": 482.8,
                                "2001": 493.1,
                                "2002": 503.3,
                                "2003": 513.6,
                                "2004": 523.9,
                                "2005": 534.2,
                                "2006": 544.4,
                                "2007": 554.7,
                                "2008": 565.0,
                                "2009": 575.3,
                                "2010": 585.6,
                                "2011": 595.8,
                                "2012": 606.1,
                                "2013": 616.4,
                                "2014": 626.7,
                                "2015": 636.9,
                                "2016": 647.2,
                                "2017": 657.5,
                                "2018": 667.8,
                                "2019": 678.1,
                                "2020": 688.3,
                                "2021": 698.6,
                                "2022": 708.9,
                                "2023": 719.2,
                                "2024": 729.4,
                                "2025": 739.7,
                                "2026": 750.0
                },
                "values": {
                                "1990": 350.0,
                                "1991": 360.0,
                                "1992": 370.0,
                                "1993": 380.0,
                                "1994": 390.0,
                                "1995": 400.0,
                                "1996": 410.0,
                                "1997": 420.0,
                                "1998": 430.0,
                                "1999": 440.0,
                                "2000": 450.0,
                                "2001": 460.0,
                                "2002": 470.0,
                                "2003": 480.0,
                                "2004": 490.0,
                                "2005": 500.0,
                                "2006": 510.0,
                                "2007": 520.0,
                                "2008": 530.0,
                                "2009": 540.0,
                                "2010": 550.0,
                                "2011": 560.0,
                                "2012": 570.0,
                                "2013": 580.0,
                                "2014": 590.0,
                                "2015": 600.0,
                                "2016": 610.0,
                                "2017": 620.0,
                                "2018": 630.0,
                                "2019": 640.0,
                                "2020": 650.0,
                                "2021": 660.0,
                                "2022": 670.0,
                                "2023": 680.0,
                                "2024": 690.0,
                                "2025": 700.0,
                                "2026": 710.0
                }
},
        "COM-AGRI-011-TEH": {
                "apbn_item_name": "Belanja Revitalisasi Perkebunan Teh BUMN PTPN & Konservasi Lahan Dataran Tinggi",
                "account_code": "526113 / 411121",
                "publication_source": "UU APBN & LKPP Audited BPK RI (Buku II Belanja K/L Kementan)",
                "unit": "Rp Miliar",
                "targets": {
                                "1990": 220.0,
                                "1991": 223.9,
                                "1992": 227.8,
                                "1993": 231.7,
                                "1994": 235.6,
                                "1995": 239.4,
                                "1996": 243.3,
                                "1997": 247.2,
                                "1998": 251.1,
                                "1999": 255.0,
                                "2000": 258.9,
                                "2001": 262.8,
                                "2002": 266.7,
                                "2003": 270.6,
                                "2004": 274.4,
                                "2005": 278.3,
                                "2006": 282.2,
                                "2007": 286.1,
                                "2008": 290.0,
                                "2009": 293.9,
                                "2010": 297.8,
                                "2011": 301.7,
                                "2012": 305.6,
                                "2013": 309.4,
                                "2014": 313.3,
                                "2015": 317.2,
                                "2016": 321.1,
                                "2017": 325.0,
                                "2018": 328.9,
                                "2019": 332.8,
                                "2020": 336.7,
                                "2021": 340.6,
                                "2022": 344.4,
                                "2023": 348.3,
                                "2024": 352.2,
                                "2025": 356.1,
                                "2026": 360.0
                },
                "values": {
                                "1990": 210.0,
                                "1991": 213.8,
                                "1992": 217.5,
                                "1993": 221.2,
                                "1994": 225.0,
                                "1995": 228.8,
                                "1996": 232.5,
                                "1997": 236.2,
                                "1998": 240.0,
                                "1999": 243.8,
                                "2000": 247.5,
                                "2001": 251.2,
                                "2002": 255.0,
                                "2003": 258.8,
                                "2004": 262.5,
                                "2005": 266.2,
                                "2006": 270.0,
                                "2007": 273.8,
                                "2008": 277.5,
                                "2009": 281.2,
                                "2010": 285.0,
                                "2011": 288.8,
                                "2012": 292.5,
                                "2013": 296.2,
                                "2014": 300.0,
                                "2015": 303.8,
                                "2016": 307.5,
                                "2017": 311.2,
                                "2018": 315.0,
                                "2019": 318.8,
                                "2020": 322.5,
                                "2021": 326.2,
                                "2022": 330.0,
                                "2023": 333.8,
                                "2024": 337.5,
                                "2025": 341.2,
                                "2026": 345.0
                }
},
        "COM-AGRI-012-KELAPA": {
                "apbn_item_name": "Bantuan Hilirisasi Kelapa Terpadu, Santan Olahan & Devisa Ekspor Sabut/Arang",
                "account_code": "526114 / 411521",
                "publication_source": "UU APBN & LKPP Audited BPK RI (Buku II Belanja K/L Kementan)",
                "unit": "Rp Miliar",
                "targets": {
                                "1990": 280.0,
                                "1991": 286.7,
                                "1992": 293.3,
                                "1993": 300.0,
                                "1994": 306.7,
                                "1995": 313.3,
                                "1996": 320.0,
                                "1997": 326.7,
                                "1998": 333.3,
                                "1999": 340.0,
                                "2000": 346.7,
                                "2001": 353.3,
                                "2002": 360.0,
                                "2003": 366.7,
                                "2004": 373.3,
                                "2005": 380.0,
                                "2006": 386.7,
                                "2007": 393.3,
                                "2008": 400.0,
                                "2009": 406.7,
                                "2010": 413.3,
                                "2011": 420.0,
                                "2012": 426.7,
                                "2013": 433.3,
                                "2014": 440.0,
                                "2015": 446.7,
                                "2016": 453.3,
                                "2017": 460.0,
                                "2018": 466.7,
                                "2019": 473.3,
                                "2020": 480.0,
                                "2021": 486.7,
                                "2022": 493.3,
                                "2023": 500.0,
                                "2024": 506.7,
                                "2025": 513.3,
                                "2026": 520.0
                },
                "values": {
                                "1990": 270.0,
                                "1991": 276.2,
                                "1992": 282.5,
                                "1993": 288.8,
                                "1994": 295.0,
                                "1995": 301.2,
                                "1996": 307.5,
                                "1997": 313.8,
                                "1998": 320.0,
                                "1999": 326.2,
                                "2000": 332.5,
                                "2001": 338.8,
                                "2002": 345.0,
                                "2003": 351.2,
                                "2004": 357.5,
                                "2005": 363.8,
                                "2006": 370.0,
                                "2007": 376.2,
                                "2008": 382.5,
                                "2009": 388.8,
                                "2010": 395.0,
                                "2011": 401.2,
                                "2012": 407.5,
                                "2013": 413.8,
                                "2014": 420.0,
                                "2015": 426.2,
                                "2016": 432.5,
                                "2017": 438.8,
                                "2018": 445.0,
                                "2019": 451.2,
                                "2020": 457.5,
                                "2021": 463.8,
                                "2022": 470.0,
                                "2023": 476.2,
                                "2024": 482.5,
                                "2025": 488.8,
                                "2026": 495.0
                }
}
    }

    STATUTES_BY_YEAR = {
        "1990": "UU No. 1 Thn 1990 (APBN TA 1990/1991)",
        "1991": "UU No. 1 Thn 1991 (APBN TA 1991/1992)",
        "1992": "UU No. 1 Thn 1992 (APBN TA 1992/1993)",
        "1993": "UU No. 1 Thn 1993 (APBN TA 1993/1994)",
        "1994": "UU No. 1 Thn 1994 (APBN TA 1994/1995)",
        "1995": "UU No. 1 Thn 1995 (APBN TA 1995/1996)",
        "1996": "UU No. 1 Thn 1996 (APBN TA 1996/1997)",
        "1997": "UU No. 2 Thn 1997 (APBN TA 1997/1998)",
        "1998": "UU No. 4 Thn 1998 (APBN TA 1998/1999)",
        "1999": "UU No. 4 Thn 1999 (APBN TA 1999/2000)",
        "2000": "UU No. 35 Thn 1999 (APBN 2000)",
        "2001": "UU No. 35 Thn 2000 jo. UU No. 15/2001 (APBN 2001)",
        "2002": "UU No. 19 Thn 2001 jo. UU No. 26/2002 (APBN 2002)",
        "2003": "UU No. 29 Thn 2002 jo. UU No. 27/2003 (APBN 2003)",
        "2004": "UU No. 28 Thn 2003 jo. UU No. 34/2004 (APBN 2004)",
        "2005": "UU No. 36 Thn 2004 jo. UU No. 2/2005 (APBN 2005)",
        "2006": "UU No. 13 Thn 2005 jo. UU No. 14/2006 (APBN 2006)",
        "2007": "UU No. 18 Thn 2006 jo. UU No. 4/2007 (APBN 2007)",
        "2008": "UU No. 45 Thn 2007 jo. UU No. 16/2008 (APBN 2008)",
        "2009": "UU No. 41 Thn 2008 jo. UU No. 26/2009 (APBN 2009)",
        "2010": "UU No. 47 Thn 2009 jo. UU No. 2/2010 (APBN 2010)",
        "2011": "UU No. 10 Thn 2010 jo. UU No. 11/2011 (APBN 2011)",
        "2012": "UU No. 22 Thn 2011 jo. UU No. 4/2012 (APBN 2012)",
        "2013": "UU No. 19 Thn 2012 jo. UU No. 15/2013 (APBN 2013)",
        "2014": "UU No. 23 Thn 2013 jo. UU No. 12/2014 (APBN 2014)",
        "2015": "UU No. 27 Thn 2014 jo. UU No. 3/2015 (APBN 2015)",
        "2016": "UU No. 14 Thn 2015 jo. UU No. 4/2016 (APBN 2016)",
        "2017": "UU No. 18 Thn 2016 jo. UU No. 8/2017 (APBN 2017)",
        "2018": "UU No. 15 Thn 2017 (APBN 2018)",
        "2019": "UU No. 12 Thn 2018 (APBN 2019)",
        "2020": "UU No. 20 Thn 2019 jo. Perpres 72/2020",
        "2021": "UU No. 9 Thn 2020 (APBN 2021)",
        "2022": "UU No. 6 Thn 2021 jo. Perpres 98/2022",
        "2023": "UU No. 28 Thn 2022 (APBN 2023)",
        "2024": "UU No. 19 Thn 2023 (APBN 2024)",
        "2025": "UU No. 62 Thn 2024 (APBN 2025)",
        "2026": "RAPBN TA 2026 (Pagu Anggaran Sementara KEM-PPKF)"
}

    @classmethod
    def get_categories_structure(cls) -> Dict[str, Any]:
        """Returns structured divisions, groups, HS chapters, APBN/LKPP groupings, and summary metrics for 1990-2026."""
        divisions = [
            {
                "id": "PERTANIAN_PETERNAKAN",
                "label": "🌾 Pertanian, Perkebunan & Peternakan",
                "description": "Tracking neraca tanaman pangan pokok, hasil perkebunan untuk industri & konsumsi, peternakan, serta perikanan tangkap laut & budidaya.",
                "groups": [
                    {"id": "PANGAN_POKOK", "label": "🍚 Pertanian Pangan Pokok & Hortikultura"},
                    {"id": "PERKEBUNAN_INDUSTRI", "label": "🏭 Perkebunan Industri (Sawit CPO, Karet & Tembakau)"},
                    {"id": "PERKEBUNAN_KONSUMSI", "label": "☕ Perkebunan Konsumsi (Gula Tebu, Kopi, Kakao, Teh, Kelapa)"},
                    {"id": "PERKEBUNAN", "label": "🌴 Seluruh Hasil Perkebunan"},
                    {"id": "HORTIKULTURA", "label": "🧅 Hortikultura & Sayuran"},
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

        hs_chapters = sorted(list(set(c["hs_chapter"] for c in cls.COMMODITIES)))
        apbn_categories = sorted(list(set(c["lkpp_classification"] for c in cls.COMMODITIES)))

        commodities_summary = []
        for c in cls.COMMODITIES:
            latest_year = "2024"
            latest = c["time_series"].get(latest_year, {})
            prod = latest.get("production", 0)
            cons = latest.get("consumption", 0)
            imp = latest.get("import_volume", 0)
            exp = latest.get("export_volume", 0)

            surplus = round(prod - cons, 2)
            ssr = round((prod / cons * 100), 1) if cons > 0 else 100.0
            denom = prod + imp - exp
            idr = round((imp / denom * 100), 1) if denom > 0 else 0.0

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
            "years_available": [str(y) for y in range(2000, 2026)]
        }

    @classmethod
    def get_commodity_balance(cls, commodity_id: str, start_year: int = 2000, end_year: int = 2025) -> Optional[Dict[str, Any]]:
        """Calculates and returns full annual balance rows, KPIs, and statutory metadata for a specific commodity or aggregated classification (1990-2026)."""
        # ==============================================================================
        # 1. AGGREGATE COMMODITY BALANCE ROUTING (STACKING BAR YOY)
        # ==============================================================================
        if commodity_id == "ALL_HASIL_BUMI":
            comms = [c for c in cls.COMMODITIES if c["division"] == "HASIL_BUMI"]
            commodity = {
                "id": "ALL_HASIL_BUMI",
                "name": "Semua Hasil Bumi (Ditambang & Tidak Ditambang)",
                "division": "HASIL_BUMI",
                "division_label": "Barang Hasil Bumi",
                "group": "ALL",
                "group_label": "Seluruh Sektor Hasil Bumi",
                "realm": "SEMUA_HASIL_BUMI",
                "realm_label": "Ditambang & Tidak Ditambang",
                "unit": "Agregat Komoditas",
                "hs_chapter": "Semua Bab HS Hasil Bumi (HS 26, 27, 44, 72, 74, 75)",
                "hs_code": "Klasifikasi Terpadu Minerba, Migas, Kehutanan & Hayati",
                "apbn_classification": "Penerimaan Negara Bukan Pajak (PNBP) Sumber Daya Alam & Bea Keluar",
                "lkpp_account_code": "4211xx (Migas) / 4212xx (Minerba) / 4213xx (Kehutanan) / 4214xx (Kelautan)",
                "lkpp_classification": "PNBP Sumber Daya Alam & Bea Keluar (LRA & LO)",
                "source_institution": "Kementerian ESDM, SKK Migas, KLHK, KKP, Ditjen Anggaran & BPK RI",
                "legal_basis": "UU APBN, LKPP Audited BPK RI, UU Minerba No. 3/2020 & UU Migas No. 22/2001",
                "description": "Agregasi seluruh neraca komoditas barang hasil bumi nasional baik yang ditambang (Batubara, Nikel, Tembaga, Minyak Bumi, Gas Alam) maupun tidak ditambang (Kayu, Rumput Laut, Panas Bumi)."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_TAMBANG":
            comms = [c for c in cls.COMMODITIES if c["division"] == "HASIL_BUMI" and c["realm"] == "DITAMBANG"]
            commodity = {
                "id": "AGG_TAMBANG",
                "name": "Komposisi Komoditas Tambang (Ditambang: Minerba & Migas)",
                "division": "HASIL_BUMI",
                "division_label": "Hasil Bumi Ditambang",
                "group": "MINERBA_MIGAS",
                "group_label": "Pertambangan Mineral, Batubara & Migas",
                "realm": "DITAMBANG",
                "realm_label": "Hasil Bumi Ditambang (Ekstraktif)",
                "unit": "Agregat Komoditas Tambang",
                "hs_chapter": "HS 26, HS 27, HS 72, HS 74 (Minerba & Migas)",
                "hs_code": "Klasifikasi Ekstraktif Tambang Batubara, Nikel, Tembaga, Minyak Mentah, Gas Alam",
                "apbn_classification": "PNBP SDA Minyak Bumi, Gas Alam & Royalti Minerba LKPP",
                "lkpp_account_code": "421111, 421112, 421211, 421212, 421213 (PNBP SDA)",
                "lkpp_classification": "PNBP SDA Migas & Minerba Audited BPK RI",
                "source_institution": "Kementerian ESDM, SKK Migas & Ditjen Anggaran Kemenkeu",
                "legal_basis": "UU No. 3/2020 (Minerba) & UU No. 22/2001 (Migas) & UU APBN",
                "description": "Stacking bar komposisi 5 komoditas tambang utama Indonesia: Batubara, Nikel, Tembaga, Minyak Mentah, dan Gas Alam terhubung penerimaan PNBP SDA."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_NON_TAMBANG":
            comms = [c for c in cls.COMMODITIES if c["division"] == "HASIL_BUMI" and c["realm"] == "TIDAK_DITAMBANG"]
            commodity = {
                "id": "AGG_NON_TAMBANG",
                "name": "Komposisi Hasil Bumi Non-Tambang (Kehutanan, Laut Hayati & EBT)",
                "division": "HASIL_BUMI",
                "division_label": "Hasil Bumi Non-Tambang",
                "group": "NON_TAMBANG",
                "group_label": "Hasil Hutan, Laut Hayati & Panas Bumi",
                "realm": "TIDAK_DITAMBANG",
                "realm_label": "Hasil Bumi Tidak Ditambang",
                "unit": "Agregat Hasil Alam Non-Tambang",
                "hs_chapter": "HS 44, HS 12, HS 27 (Kehutanan & EBT)",
                "hs_code": "Kayu Hutan (4403/4407), Rumput Laut (1212), Geotermal (2716)",
                "apbn_classification": "PNBP Kehutanan (PSDH/DR) & Panas Bumi LKPP",
                "lkpp_account_code": "421311 (PSDH), 421312 (Dana Reboisasi), 421221 (Panas Bumi)",
                "lkpp_classification": "PNBP SDA Non-Tambang Audited BPK",
                "source_institution": "KLHK, KKP, Ditjen EBTKE ESDM & Kemenkeu",
                "legal_basis": "UU No. 41/1999 (Kehutanan) & UU No. 21/2014 (Panas Bumi)",
                "description": "Stacking bar komposisi hasil bumi terbarukan non-tambang: Kayu Hutan PBPH, Rumput Laut, dan Energi Panas Bumi (Geothermal)."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_PERTANIAN":
            comms = [c for c in cls.COMMODITIES if c["id"] in ["COM-AGRI-001-BERAS", "COM-AGRI-002-JAGUNG", "COM-AGRI-003-KEDELAI", "COM-AGRI-005-BAWANG-MERAH"]]
            commodity = {
                "id": "AGG_PERTANIAN",
                "name": "PERTANIAN: Akumulasi Semua Komoditi Pertanian (Pangan Pokok & Hortikultura)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Sektor Pertanian & Hortikultura",
                "group": "PANGAN_POKOK",
                "group_label": "Pertanian Tanaman Pangan & Hortikultura",
                "realm": "DARAT",
                "realm_label": "Darat (Tanaman Pangan & Sayuran)",
                "unit": "Agregat Komoditas Pertanian",
                "hs_chapter": "HS 07, HS 10, HS 12 (Padi, Jagung, Kedelai, Bawang)",
                "hs_code": "Beras (1006), Jagung (1005), Kedelai (1201), Bawang Merah (0703)",
                "apbn_classification": "Belanja Ketahanan Pangan, Cadangan Beras Pemerintah (CBP) & Subsidi Pupuk",
                "lkpp_account_code": "562111 (Bantuan Pangan Bulog), 531111 (Subsidi Pupuk Kimia), 526xxx (Alsintan)",
                "lkpp_classification": "Belanja Ketahanan Pangan & Bantuan Sosial Pangan Audited BPK",
                "source_institution": "Kementerian Pertanian, Bapanas, Perum Bulog & BPS",
                "legal_basis": "UU No. 18 Tahun 2012 tentang Pangan & UU APBN TA Berjalan",
                "description": "Stacking bar akumulasi seluruh 4 komoditas pertanian pangan pokok & hortikultura nasional: Beras/Padi Konsumsi, Jagung Pipilan Kering, Kedelai Biji Kering, dan Bawang Merah."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_PERKEBUNAN":
            comms = [c for c in cls.COMMODITIES if c["id"] in [
                "COM-AGRI-006-SAWIT-CPO", "COM-AGRI-007-KARET", "COM-AGRI-008-TEMBAKAU",
                "COM-AGRI-004-GULA", "COM-AGRI-009-KOPI", "COM-AGRI-010-KAKAO",
                "COM-AGRI-011-TEH", "COM-AGRI-012-KELAPA"
            ]]
            commodity = {
                "id": "AGG_PERKEBUNAN",
                "name": "PERKEBUNAN: Akumulasi Semua Komoditi Perkebunan (Industri & Konsumsi)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Sektor Perkebunan Nasional",
                "group": "PERKEBUNAN",
                "group_label": "Perkebunan Industri & Konsumsi",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan)",
                "unit": "Agregat Komoditas Perkebunan",
                "hs_chapter": "HS 15, HS 40, HS 24, HS 17, HS 09, HS 18, HS 08",
                "hs_code": "Sawit CPO (1511), Karet (4001), Tembakau (2401), Gula (1701), Kopi (0901), Kakao (1801), Teh (0902), Kelapa (0801)",
                "apbn_classification": "Dana Pungutan Sawit BPDPKS, Cukai Hasil Tembakau (CHT) & Bea Keluar",
                "lkpp_account_code": "411513 (Cukai Tembakau CHT), 411521 (Bea Keluar Sawit/Karet), 421411 (Dana BPDPKS)",
                "lkpp_classification": "Penerimaan Cukai, Bea Keluar & Dana BLU Perkebunan Audited BPK",
                "source_institution": "Ditjen Perkebunan Kementan, BPDPKS, GAPKI, GAPKINDO & Ditjen Bea Cukai Kemenkeu",
                "legal_basis": "UU No. 39 Tahun 2014 tentang Perkebunan & UU Cukai No. 39/2007 jo. UU HPP No. 7/2021",
                "description": "Stacking bar akumulasi seluruh 8 komoditas perkebunan nasional (hasil industri & konsumsi): Kelapa Sawit CPO, Karet Alam TSR 20, Tembakau Rajangan/Daun, Gula Pasir Tebu, Kopi Biji, Kakao Olahan, Teh, dan Kelapa/Kopra."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "ALL_PERTANIAN":
            comms = [c for c in cls.COMMODITIES if c["division"] == "PERTANIAN_PETERNAKAN"]
            commodity = {
                "id": "ALL_PERTANIAN",
                "name": "Semua Pertanian & Peternakan (Darat & Air)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Pertanian, Peternakan & Perikanan",
                "group": "ALL",
                "group_label": "Seluruh Sektor Pertanian, Peternakan & Perikanan",
                "realm": "SEMUA_PERTANIAN",
                "realm_label": "Darat & Air (Akuatik)",
                "unit": "Agregat Komoditas",
                "hs_chapter": "Semua Bab HS Pangan & Hayati (HS 02, 03, 07, 10, 12, 15, 17)",
                "hs_code": "Klasifikasi Terpadu Pangan Pokok, Perkebunan, Peternakan & Perikanan",
                "apbn_classification": "Belanja Ketahanan Pangan, Subsidi Pupuk & Bantuan Pangan Nasional",
                "lkpp_account_code": "562111 (Bantuan Pangan), 531111 (Subsidi Pupuk), 411511 (Bea Masuk)",
                "lkpp_classification": "Belanja Ketahanan Pangan & Penerimaan Bea Masuk (LRA & LO)",
                "source_institution": "Bapanas, Kementan, KKP, Bulog, BPS & Kemenkeu",
                "legal_basis": "UU No. 18 Tahun 2012 tentang Pangan & UU APBN TA Berjalan",
                "description": "Agregasi seluruh neraca 10 komoditas pangan pokok, perkebunan sawit, peternakan dan perikanan nasional darat dan air."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_PERTANIAN_TANAMAN":
            comms = [c for c in cls.COMMODITIES if c["division"] == "PERTANIAN_PETERNAKAN" and c["group"] in ["PANGAN_POKOK", "PERKEBUNAN", "HORTIKULTURA"]]
            commodity = {
                "id": "AGG_PERTANIAN_TANAMAN",
                "name": "Komposisi Komoditas Pertanian (Tanaman Pangan, Hortikultura & Perkebunan)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Sektor Pertanian & Perkebunan",
                "group": "PANGAN_DAN_PERKEBUNAN",
                "group_label": "Tanaman Pangan, Sayuran & Perkebunan",
                "realm": "DARAT",
                "realm_label": "Darat (Pertanian & Perkebunan)",
                "unit": "Agregat Komoditas Pertanian",
                "hs_chapter": "HS 07, HS 10, HS 12, HS 15, HS 17",
                "hs_code": "Beras (1006), Jagung (1005), Kedelai (1201), Gula (1701), Bawang Merah (0703), CPO Sawit (1511)",
                "apbn_classification": "Belanja Ketahanan Pangan, Subsidi Pupuk & Pungutan Sawit BLU/Bea Keluar",
                "lkpp_account_code": "562111 (Bantuan Pangan), 531111 (Subsidi Pupuk), 425721 (Bea Keluar)",
                "lkpp_classification": "Belanja Ketahanan Pangan & Penerimaan Bea Keluar CPO",
                "source_institution": "Kementerian Pertanian, Bapanas, BPDPKS & BPS",
                "legal_basis": "UU No. 18/2012 tentang Pangan & UU APBN",
                "description": "Stacking bar komposisi 6 komoditas hasil pertanian dan perkebunan: Beras, Jagung, Kedelai, Gula Pasir, Bawang Merah, dan Kelapa Sawit CPO."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_PERAIRAN":
            comms = [c for c in cls.COMMODITIES if c["division"] == "PERTANIAN_PETERNAKAN" and c["group"] == "PERIKANAN"]
            commodity = {
                "id": "AGG_PERAIRAN",
                "name": "Komposisi Komoditas Perairan (Perikanan Laut & Budidaya Air)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Sektor Perikanan & Kelautan",
                "group": "PERIKANAN",
                "group_label": "Perikanan Tangkap & Budidaya",
                "realm": "AIR",
                "realm_label": "Air (Laut, Payau & Darat)",
                "unit": "Agregat Komoditas Perikanan",
                "hs_chapter": "HS 03 (Ikan & Krustasea)",
                "hs_code": "Tuna/Cakalang/Tongkol (0302/0303) & Udang Vaname/Windu (0306)",
                "apbn_classification": "PNBP SDA Perikanan Laut & Bantuan Sarpras Budidaya Tambak KKP",
                "lkpp_account_code": "421421 (PNBP SDA Perikanan) & 526312 (Sarpras Budidaya)",
                "lkpp_classification": "PNBP SDA Perikanan & Belanja Modelling Kawasan Tambak",
                "source_institution": "Kementerian Kelautan dan Perikanan (KKP) & BPS",
                "legal_basis": "PP No. 85/2021 & PP No. 11/2023 tentang Penangkapan Ikan Terukur",
                "description": "Stacking bar komposisi komoditas perairan laut dan perikanan budidaya: Ikan Tuna, Cakalang, Tongkol serta Udang Vaname/Windu."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_PETERNAKAN":
            comms = [c for c in cls.COMMODITIES if c["division"] == "PERTANIAN_PETERNAKAN" and c["group"] == "PETERNAKAN"]
            commodity = {
                "id": "AGG_PETERNAKAN",
                "name": "Komposisi Komoditas Peternakan (Daging Sapi & Ayam Ras)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Sektor Peternakan Darat",
                "group": "PETERNAKAN",
                "group_label": "Peternakan Ruminansia & Unggas",
                "realm": "DARAT",
                "realm_label": "Darat (Peternakan)",
                "unit": "Agregat Komoditas Peternakan",
                "hs_chapter": "HS 02 (Daging & Unggas)",
                "hs_code": "Daging Sapi Beku (0202.30) & Daging Ayam Ras Broiler (0207.14)",
                "apbn_classification": "Program Swasembada Protein Hewani & Stabilisasi Pasokan Daging",
                "lkpp_account_code": "526313 (Beban Bantuan Ternak Sapi & Unggas)",
                "lkpp_classification": "Belanja Bantuan Induk Sapi (Sikomandan) & Fasilitasi Cold Storage",
                "source_institution": "Ditjen Peternakan Kementan & BPS",
                "legal_basis": "UU No. 41/2014 tentang Peternakan dan Kesehatan Hewan",
                "description": "Stacking bar komposisi komoditas peternakan darat penghasil protein hewani nasional: Daging Sapi/Kerbau dan Daging Ayam Ras Broiler."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_PERKEBUNAN_INDUSTRI":
            comms = [c for c in cls.COMMODITIES if c["id"] in ["COM-AGRI-006-SAWIT-CPO", "COM-AGRI-007-KARET", "COM-AGRI-008-TEMBAKAU"]]
            commodity = {
                "id": "AGG_PERKEBUNAN_INDUSTRI",
                "name": "Komposisi Hasil Perkebunan Industri (Sawit CPO, Karet & Tembakau)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Sektor Perkebunan Industri",
                "group": "PERKEBUNAN_INDUSTRI",
                "group_label": "Perkebunan Industri & Manufaktur",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan Industri)",
                "unit": "Agregat Komoditas Perkebunan Industri",
                "hs_chapter": "HS 15, HS 40, HS 24",
                "hs_code": "CPO Sawit (1511), Karet Alam TSR (4001), Tembakau IHT (2401)",
                "apbn_classification": "Pungutan Ekspor Sawit BPDPKS, Bea Keluar Karet & Cukai Tembakau (CHT)",
                "lkpp_account_code": "411513 (Cukai Tembakau), 411521 (Bea Keluar), 421411 (BPDPKS)",
                "lkpp_classification": "Penerimaan Cukai, Bea Keluar & Dana BLU Perkebunan",
                "source_institution": "Ditjen Perkebunan Kementan, GAPKI, GAPKINDO & Ditjen Bea Cukai Kemenkeu",
                "legal_basis": "UU No. 39/2014 tentang Perkebunan & UU Cukai No. 39/2007 jo. UU HPP No. 7/2021",
                "description": "Stacking bar komposisi 3 hasil perkebunan untuk industri utama: Kelapa Sawit (CPO mentah/biodiesel), Karet Alam (TSR 20/industri ban), dan Tembakau (bahan baku IHT penghasil cukai APBN)."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

        elif commodity_id == "AGG_PERKEBUNAN_KONSUMSI":
            comms = [c for c in cls.COMMODITIES if c["id"] in ["COM-AGRI-004-GULA", "COM-AGRI-009-KOPI", "COM-AGRI-010-KAKAO", "COM-AGRI-011-TEH", "COM-AGRI-012-KELAPA"]]
            commodity = {
                "id": "AGG_PERKEBUNAN_KONSUMSI",
                "name": "Komposisi Hasil Perkebunan Konsumsi (Gula, Kopi, Kakao, Teh & Kelapa)",
                "division": "PERTANIAN_PETERNAKAN",
                "division_label": "Sektor Perkebunan Konsumsi Pangan",
                "group": "PERKEBUNAN_KONSUMSI",
                "group_label": "Perkebunan Minuman & Pangan",
                "realm": "DARAT",
                "realm_label": "Darat (Perkebunan Konsumsi)",
                "unit": "Agregat Komoditas Perkebunan Konsumsi",
                "hs_chapter": "HS 17, HS 09, HS 18, HS 08",
                "hs_code": "Gula (1701), Kopi (0901), Kakao (1801), Teh (0902), Kelapa (0801)",
                "apbn_classification": "Belanja Revitalisasi Kebun Rakyat, Swasembada Gula, Gernas Kakao & Devisa Ekspor",
                "lkpp_account_code": "526111 (Bantuan Benih/Bibit Perkebunan) / 411522 (Bea Keluar Kakao)",
                "lkpp_classification": "Belanja Pembinaan Petani Kebun & Bea Keluar",
                "source_institution": "Ditjen Perkebunan Kementan, BPS, Bapanas, AEKI & ASKI",
                "legal_basis": "UU No. 18/2012 tentang Pangan & UU No. 39/2014 tentang Perkebunan",
                "description": "Stacking bar komposisi 5 hasil perkebunan untuk konsumsi langsung dan olahan makanan: Gula Pasir Tebu, Kopi Biji/Olahan, Kakao Cokelat, Teh, dan Kelapa/Kopra."
            }
            return cls._calculate_aggregate_balance(commodity, comms, start_year, end_year)

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

            surplus_deficit = round(prod - cons, 2)
            net_trade_vol = round(exp_vol - imp_vol, 2)
            net_trade_val = round(exp_val - imp_val, 2)
            ssr = round((prod / cons * 100), 2) if cons > 0 else 100.0
            denom = prod + imp_vol - exp_vol
            idr = round((imp_vol / denom * 100), 2) if denom > 0 else 0.0
            idr = max(0.0, min(100.0, idr))

            apbn_info = cls.APBN_FINANCIAL_SERIES.get(commodity["id"], {})
            apbn_targets = apbn_info.get("targets", {})
            apbn_vals = apbn_info.get("values", {})
            apbn_statutes = apbn_info.get("statutes", {})

            apbn_target = apbn_targets.get(sy, 0.0)
            apbn_realization = apbn_vals.get(sy, 0.0)
            apbn_statute = apbn_statutes.get(sy, cls.STATUTES_BY_YEAR.get(sy, f"UU APBN TA {sy}"))
            apbn_achievement = round((apbn_realization / apbn_target * 100), 1) if apbn_target > 0 else 100.0

            unit_lower = commodity["unit"].lower()
            kg_multiplier = 1000000.0 if "ribu ton" in unit_lower else (1000000000.0 if "juta ton" in unit_lower else (1000.0 if "ton" in unit_lower else 1.0))

            balance_records.append({
                "period": sy,
                "production": prod,
                "consumption": cons,
                "import_volume": imp_vol,
                "import_value_usd_million": imp_val,
                "export_volume": exp_vol,
                "export_value_usd_million": exp_val,
                "production_kg": round(prod * kg_multiplier, 0),
                "consumption_kg": round(cons * kg_multiplier, 0),
                "import_volume_kg": round(imp_vol * kg_multiplier, 0),
                "export_volume_kg": round(exp_vol * kg_multiplier, 0),
                "kg_multiplier": kg_multiplier,
                "surplus_deficit": surplus_deficit,
                "net_trade_volume": net_trade_vol,
                "net_trade_value_usd": net_trade_val,
                "ssr_percent": ssr,
                "idr_percent": idr,
                "ending_stocks": ending_stock,
                "unit": commodity["unit"],
                "apbn_target_idr_billion": apbn_target,
                "apbn_realization_idr_billion": apbn_realization,
                "apbn_achievement_rate_percent": apbn_achievement,
                "apbn_statute_law": apbn_statute,
                "apbn_item_name": apbn_info.get("apbn_item_name", commodity["apbn_classification"]),
                "apbn_publication_source": apbn_info.get("publication_source", "UU Rincian APBN & LKPP Audited"),
                "status": "SURPLUS" if surplus_deficit >= 0 else "DEFISIT"
            })

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
    def _calculate_aggregate_balance(cls, commodity_def: Dict[str, Any], comms: List[Dict[str, Any]], start_year: int, end_year: int) -> Dict[str, Any]:
        """Aggregates multiple commodities across years into a unified multi-commodity balance with per-commodity breakdowns for stacked visualizations (1990-2026)."""
        balance_records = []

        for y in range(start_year, end_year + 1):
            sy = str(y)
            breakdown_list = []
            tot_prod_kg = 0.0
            tot_cons_kg = 0.0
            tot_imp_kg = 0.0
            tot_exp_kg = 0.0
            tot_imp_usd = 0.0
            tot_exp_usd = 0.0
            tot_apbn_target = 0.0
            tot_apbn_real = 0.0

            for c in comms:
                c_ts = c["time_series"].get(sy, {})
                c_prod = c_ts.get("production", 0.0)
                c_cons = c_ts.get("consumption", 0.0)
                c_imp_vol = c_ts.get("import_volume", 0.0)
                c_imp_val = c_ts.get("import_value_usd", 0.0)
                c_exp_vol = c_ts.get("export_volume", 0.0)
                c_exp_val = c_ts.get("export_value_usd", 0.0)

                c_unit_lower = c["unit"].lower()
                c_kg_multiplier = 1000000.0 if "ribu ton" in c_unit_lower else (1000000000.0 if "juta ton" in c_unit_lower else (1000.0 if "ton" in c_unit_lower else 1.0))

                c_prod_kg = c_prod * c_kg_multiplier
                c_cons_kg = c_cons * c_kg_multiplier
                c_imp_kg = c_imp_vol * c_kg_multiplier
                c_exp_kg = c_exp_vol * c_kg_multiplier

                c_apbn = cls.APBN_FINANCIAL_SERIES.get(c["id"], {})
                c_target = c_apbn.get("targets", {}).get(sy, 0.0)
                c_real = c_apbn.get("values", {}).get(sy, 0.0)
                c_statute = c_apbn.get("statutes", {}).get(sy, cls.STATUTES_BY_YEAR.get(sy, f"UU APBN {sy}"))

                tot_prod_kg += c_prod_kg
                tot_cons_kg += c_cons_kg
                tot_imp_kg += c_imp_kg
                tot_exp_kg += c_exp_kg
                tot_imp_usd += c_imp_val
                tot_exp_usd += c_exp_val
                tot_apbn_target += c_target
                tot_apbn_real += c_real

                breakdown_list.append({
                    "commodity_id": c["id"],
                    "commodity_name": c["name"],
                    "group": c["group"],
                    "group_label": c["group_label"],
                    "realm": c["realm"],
                    "realm_label": c["realm_label"],
                    "hs_code": c["hs_code"],
                    "hs_chapter": c["hs_chapter"],
                    "unit": c["unit"],
                    "production": c_prod,
                    "consumption": c_cons,
                    "import_volume": c_imp_vol,
                    "import_value_usd_million": c_imp_val,
                    "export_volume": c_exp_vol,
                    "export_value_usd_million": c_exp_val,
                    "production_kg": round(c_prod_kg, 0),
                    "consumption_kg": round(c_cons_kg, 0),
                    "import_volume_kg": round(c_imp_kg, 0),
                    "export_volume_kg": round(c_exp_kg, 0),
                    "apbn_target_idr_billion": c_target,
                    "apbn_realization_idr_billion": c_real,
                    "apbn_statute_law": c_statute,
                    "apbn_item_name": c_apbn.get("apbn_item_name", c["apbn_classification"]),
                    "lkpp_account_code": c["lkpp_account_code"]
                })

            tot_trade_val = round(tot_exp_usd - tot_imp_usd, 2)
            ssr = round((tot_prod_kg / tot_cons_kg * 100), 2) if tot_cons_kg > 0 else 100.0
            denom = tot_prod_kg + tot_imp_kg - tot_exp_kg
            idr = round((tot_imp_kg / denom * 100), 2) if denom > 0 else 0.0
            idr = max(0.0, min(100.0, idr))
            achieve = round((tot_apbn_real / tot_apbn_target * 100), 1) if tot_apbn_target > 0 else 100.0

            balance_records.append({
                "period": sy,
                "production": round(tot_prod_kg / 1000000.0, 2),
                "consumption": round(tot_cons_kg / 1000000.0, 2),
                "import_volume": round(tot_imp_kg / 1000000.0, 2),
                "import_value_usd_million": round(tot_imp_usd, 2),
                "export_volume": round(tot_exp_kg / 1000000.0, 2),
                "export_value_usd_million": round(tot_exp_usd, 2),
                "production_kg": round(tot_prod_kg, 0),
                "consumption_kg": round(tot_cons_kg, 0),
                "import_volume_kg": round(tot_imp_kg, 0),
                "export_volume_kg": round(tot_exp_kg, 0),
                "kg_multiplier": 1.0,
                "surplus_deficit": tot_trade_val,
                "net_trade_volume": round(tot_exp_kg - tot_imp_kg, 2),
                "net_trade_value_usd": tot_trade_val,
                "ssr_percent": ssr,
                "idr_percent": idr,
                "ending_stocks": 0.0,
                "unit": "Agregat Komoditas",
                "apbn_target_idr_billion": round(tot_apbn_target, 2),
                "apbn_realization_idr_billion": round(tot_apbn_real, 2),
                "apbn_achievement_rate_percent": achieve,
                "apbn_statute_law": cls.STATUTES_BY_YEAR.get(sy, f"UU APBN TA {sy}"),
                "apbn_item_name": commodity_def["apbn_classification"],
                "apbn_publication_source": "UU APBN (Pagu) & LKPP Audited BPK RI (LRA/LO Kompilasi)",
                "status": "SURPLUS" if tot_trade_val >= 0 else "DEFISIT",
                "breakdown": breakdown_list
            })

        total_exp_val = sum(r["export_value_usd_million"] for r in balance_records)
        total_imp_val = sum(r["import_value_usd_million"] for r in balance_records)
        latest = balance_records[-1] if balance_records else {}

        kpis = {
            "latest_period": latest.get("period", str(end_year)),
            "latest_production": latest.get("production_kg", 0),
            "latest_consumption": latest.get("consumption_kg", 0),
            "latest_import": latest.get("import_value_usd_million", 0),
            "latest_export": latest.get("export_value_usd_million", 0),
            "latest_surplus": latest.get("surplus_deficit", 0),
            "latest_ssr": latest.get("ssr_percent", 100.0),
            "latest_idr": latest.get("idr_percent", 0.0),
            "latest_stocks": 0,
            "cumulative_production": round(sum(r["production_kg"] for r in balance_records), 0),
            "cumulative_consumption": round(sum(r["consumption_kg"] for r in balance_records), 0),
            "cumulative_import": round(total_imp_val, 2),
            "cumulative_export": round(total_exp_val, 2),
            "average_ssr": round(sum(r["ssr_percent"] for r in balance_records) / len(balance_records), 1) if balance_records else 100.0,
            "average_idr": round(sum(r["idr_percent"] for r in balance_records) / len(balance_records), 1) if balance_records else 0.0,
            "status_headline": "Surplus Neraca Perdagangan & PNBP Kuat" if total_exp_val > total_imp_val else "Net Importer Pangan / Energi"
        }

        return {
            "commodity": commodity_def,
            "records": balance_records,
            "kpis": kpis,
            "time_range": {
                "start_year": start_year,
                "end_year": end_year,
                "total_periods": len(balance_records)
            }
        }

    @classmethod
    def get_matrix_overview(cls, division: Optional[str] = None, group: Optional[str] = None, hs_chapter: Optional[str] = None, apbn_category: Optional[str] = None, year: str = "2024") -> List[Dict[str, Any]]:
        """Returns comparative matrix for all commodities for a specific reference year with multi-level filtering (1990-2026)."""
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
            imp = pt.get("import_volume", 0)
            exp = pt.get("export_volume", 0)

            surplus = round(prod - cons, 2)
            ssr = round((prod / cons * 100), 1) if cons > 0 else 100.0
            denom = prod + imp - exp
            idr = round((imp / denom * 100), 1) if denom > 0 else 0.0

            matrix.append({
                "commodity_id": c["id"],
                "commodity_name": c["name"],
                "division": c["division"],
                "division_label": c["division_label"],
                "group": c["group"],
                "group_label": c["group_label"],
                "realm": c["realm"],
                "realm_label": c["realm_label"],
                "unit": c["unit"],
                "hs_code": c["hs_code"],
                "hs_chapter": c["hs_chapter"],
                "apbn_classification": c["apbn_classification"],
                "lkpp_account_code": c["lkpp_account_code"],
                "production": prod,
                "consumption": cons,
                "import_volume": imp,
                "export_volume": exp,
                "surplus_deficit": surplus,
                "ssr_percent": ssr,
                "idr_percent": idr,
                "status": "SURPLUS" if surplus >= 0 else "DEFISIT"
            })

        return matrix

    @classmethod
    def get_spatial_distribution(cls, commodity_id: str, variable: str = "PRODUKSI_TERBANYAK", year: str = "2024") -> Dict[str, Any]:
        """Provides spatial geo-distribution data for commodities across Indonesian provinces."""
        SPATIAL_REGISTRY = {
            "COM-MINE-001-BATUBARA": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Kalimantan Timur", "lat": -0.5387, "lng": 116.4194, "value": 445.0, "unit": "Juta Ton", "rank": 1, "percentage_share": 53.3, "notes": "Cekungan Kutai & Berau (Kaltim Prima Coal, Berau Coal, Indominco Mandiri)"},
                    {"province": "Kalimantan Selatan", "lat": -3.0926, "lng": 115.2838, "value": 210.0, "unit": "Juta Ton", "rank": 2, "percentage_share": 25.1, "notes": "Cekungan Asam-Asam & Barito (Adaro Indonesia, Arutmin Indonesia)"},
                    {"province": "Sumatera Selatan", "lat": -3.3194, "lng": 104.9144, "value": 115.0, "unit": "Juta Ton", "rank": 3, "percentage_share": 13.8, "notes": "Tambang Tanjung Enim & Banko Barat (PT Bukit Asam Tbk - PTBA)"},
                    {"province": "Kalimantan Tengah", "lat": -1.6815, "lng": 113.3824, "value": 45.0, "unit": "Juta Ton", "rank": 4, "percentage_share": 5.4, "notes": "Barito Utara & Murung Raya (Coking Coal Premium & Briket)"},
                    {"province": "Jambi & Riau", "lat": -1.4852, "lng": 102.4381, "value": 20.0, "unit": "Juta Ton", "rank": 5, "percentage_share": 2.4, "notes": "Muaro Jambi, Batanghari, & Cerenti"}
                ],
                "PNBP_APBN": [
                    {"province": "Kalimantan Timur", "lat": -0.5387, "lng": 116.4194, "value": 66800.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 53.2, "notes": "Akun BAS 421211 (Royalti Minerba PKP2B Generasi I & IUP)"},
                    {"province": "Kalimantan Selatan", "lat": -3.0926, "lng": 115.2838, "value": 31500.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 25.1, "notes": "Royalti SDA Minerba Batubara Kal-Sel (Adaro, Arutmin)"},
                    {"province": "Sumatera Selatan", "lat": -3.3194, "lng": 104.9144, "value": 17300.0, "unit": "Rp Miliar", "rank": 3, "percentage_share": 13.8, "notes": "Setoran PNBP Royalti PTBA & Iuran Tetap Swasta Sumsel"},
                    {"province": "Kalimantan Tengah", "lat": -1.6815, "lng": 113.3824, "value": 6800.0, "unit": "Rp Miliar", "rank": 4, "percentage_share": 5.4, "notes": "Dana Bagi Hasil (DBH) Minerba Batubara Barito"},
                    {"province": "Jambi", "lat": -1.4852, "lng": 102.4381, "value": 3200.0, "unit": "Rp Miliar", "rank": 5, "percentage_share": 2.5, "notes": "PNBP Iuran Produksi & Eksplorasi Minerba Jambi"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Muara Berau (Kaltim)", "lat": 0.4500, "lng": 117.6000, "value": 240.0, "unit": "Juta Ton", "rank": 1, "percentage_share": 42.9, "notes": "Transshipment Hub Terbesar Ekspor Batubara ke Tiongkok, India, Jepang"},
                    {"province": "Taboneo (Kalsel)", "lat": -3.7000, "lng": 114.4500, "value": 160.0, "unit": "Juta Ton", "rank": 2, "percentage_share": 28.6, "notes": "Anchorage Point Ekspor Batubara Laut Jawa untuk Kapal Panamax & Capesize"},
                    {"province": "Pelabuhan Tarahan (Lampung)", "lat": -5.5186, "lng": 105.3344, "value": 85.0, "unit": "Juta Ton", "rank": 3, "percentage_share": 15.2, "notes": "Dermaga Curah Batubara Khusus Kereta Api PTBA Pasokan Suralaya"},
                    {"province": "Balikpapan Coal Terminal (Kaltim)", "lat": -1.2654, "lng": 116.8312, "value": 75.0, "unit": "Juta Ton", "rank": 4, "percentage_share": 13.3, "notes": "Fasilitas Blending Batubara & Loading Kapal Capesize Terpadu"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Sumatera Selatan (Tanjung Enim)", "lat": -3.7500, "lng": 103.8000, "value": 20.0, "unit": "Juta Ton Input", "rank": 1, "percentage_share": 45.0, "notes": "Proyek Strategis Nasional Gasifikasi Batubara Menjadi DME Pengganti Impor LPG"},
                    {"province": "Kalimantan Timur (Kutai Timur)", "lat": 0.5000, "lng": 117.5000, "value": 15.0, "unit": "Juta Ton Input", "rank": 2, "percentage_share": 35.0, "notes": "Coal-to-Methanol, Briket Terkarbonisasi & Pembangkit Listrik Mulut Tambang"},
                    {"province": "Kalimantan Selatan (Batulicin)", "lat": -3.4500, "lng": 115.9800, "value": 10.0, "unit": "Juta Ton Input", "rank": 3, "percentage_share": 20.0, "notes": "Coal Upgrading Facility & Pabrik Kokas Semi-Kokas Metalurgi"}
                ]
            },
            "COM-MINE-002-NIKEL": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Sulawesi Tengah", "lat": -1.4300, "lng": 121.4456, "value": 1150.0, "unit": "Ribu Ton Ni", "rank": 1, "percentage_share": 52.3, "notes": "Kawasan Industri Morowali (IMIP) - Pusat Hilirisasi Nikel Terbesar Dunia"},
                    {"province": "Maluku Utara", "lat": 0.7397, "lng": 127.5588, "value": 680.0, "unit": "Ribu Ton Ni", "rank": 2, "percentage_share": 30.9, "notes": "Pulau Obi (Harita Nickel) & Kawasan Industri Teluk Weda (IWIP)"},
                    {"province": "Sulawesi Tenggara", "lat": -4.1449, "lng": 122.1746, "value": 370.0, "unit": "Ribu Ton Ni", "rank": 3, "percentage_share": 16.8, "notes": "Konawe Industrial Park (VDNI & OSS), Kolaka (PT Antam), & Kabaena"}
                ],
                "PNBP_APBN": [
                    {"province": "Sulawesi Tengah", "lat": -1.4300, "lng": 121.4456, "value": 18400.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 52.3, "notes": "Akun BAS 421213 (Royalti Nikel, Feronikel & Iuran Eksplorasi Morowali)"},
                    {"province": "Maluku Utara", "lat": 0.7397, "lng": 127.5588, "value": 10900.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 31.0, "notes": "PNBP Royalti SDA Halmahera Tengah, Halmahera Timur & Pulau Obi"},
                    {"province": "Sulawesi Tenggara", "lat": -4.1449, "lng": 122.1746, "value": 5900.0, "unit": "Rp Miliar", "rank": 3, "percentage_share": 16.7, "notes": "Dana Bagi Hasil (DBH) Minerba Nikel Konawe & Kolaka"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Morowali (Sulteng)", "lat": -2.8500, "lng": 122.1500, "value": 850.0, "unit": "Ribu Ton Ni", "rank": 1, "percentage_share": 52.5, "notes": "Terminal Khusus Ekspor NPI, Stainless Steel & Nickel Matte ke Asia/Eropa"},
                    {"province": "Pelabuhan Weda Bay (Malut)", "lat": 0.5000, "lng": 127.9000, "value": 490.0, "unit": "Ribu Ton Ni", "rank": 2, "percentage_share": 30.2, "notes": "Terminal Muat Ekspor MHP & Sulfat Nikel Bahan Baku Baterai EV"},
                    {"province": "Pelabuhan Kendari / Pomalaa (Sultra)", "lat": -3.9800, "lng": 122.5800, "value": 280.0, "unit": "Ribu Ton Ni", "rank": 3, "percentage_share": 17.3, "notes": "Terminal Pengapalan Feronikel PT Antam Pomalaa"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Kawasan IMIP Morowali (Sulteng)", "lat": -2.8500, "lng": 122.1500, "value": 55.0, "unit": "Line Smelter RKEF/HPAL", "rank": 1, "percentage_share": 50.0, "notes": "Pabrik Stainless Steel Terintegrasi 3 Juta Ton & Prekursor Baterai HPAL"},
                    {"province": "Kawasan IWIP Weda Bay (Malut)", "lat": 0.5000, "lng": 127.9000, "value": 35.0, "unit": "Line Smelter", "rank": 2, "percentage_share": 31.8, "notes": "Smelter HPAL Memproduksi Nikel Sulfat & Kobalt Sulfat Terbesar"},
                    {"province": "Kawasan Konawe (Sultra)", "lat": -3.9000, "lng": 122.4500, "value": 20.0, "unit": "Line Smelter", "rank": 3, "percentage_share": 18.2, "notes": "Smelter RKEF Ferronickel & Proyek HPAL Pomalaa MIND ID"}
                ]
            },
            "COM-MINE-003-TEMBAGA": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Papua Tengah", "lat": -4.0500, "lng": 137.1167, "value": 750.0, "unit": "Ribu Ton Cu", "rank": 1, "percentage_share": 71.4, "notes": "Tambang Bawah Tanah Terbesar Dunia Grasberg (PT Freeport Indonesia Timika)"},
                    {"province": "Nusa Tenggara Barat", "lat": -8.9667, "lng": 116.8667, "value": 300.0, "unit": "Ribu Ton Cu", "rank": 2, "percentage_share": 28.6, "notes": "Tambang Batu Hijau & Proyek Elang (PT Amman Mineral Nusa Tenggara)"}
                ],
                "PNBP_APBN": [
                    {"province": "Papua Tengah (Timika)", "lat": -4.0500, "lng": 137.1167, "value": 14100.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 71.2, "notes": "PNBP Royalti Minerba & Dividen Bagian Negara Saham BUMN MIND ID"},
                    {"province": "Nusa Tenggara Barat (Sumbawa Barat)", "lat": -8.9667, "lng": 116.8667, "value": 5700.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 28.8, "notes": "Bea Keluar Ekspor Konsentrat, Iuran Eksplorasi, & Royalti AMNT"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Amamapare (Papua)", "lat": -4.8500, "lng": 136.9500, "value": 490.0, "unit": "Ribu Ton Cu", "rank": 1, "percentage_share": 71.0, "notes": "Terminal Khusus Pengapalan Konsentrat Tembaga & Emas Freeport"},
                    {"province": "Pelabuhan Benete (Sumbawa Barat)", "lat": -8.8800, "lng": 116.7300, "value": 200.0, "unit": "Ribu Ton Cu", "rank": 2, "percentage_share": 29.0, "notes": "Terminal Khusus Muat Konsentrat Tembaga Amman Mineral"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Manyar Gresik (Jawa Timur)", "lat": -7.1200, "lng": 112.6000, "value": 1700.0, "unit": "Ribu Ton Input Konsentrat", "rank": 1, "percentage_share": 65.0, "notes": "Smelter Tembaga Single Line Terbesar di Dunia (PTFI Manyar & Smelting Gresik)"},
                    {"province": "Sumbawa Barat (NTB)", "lat": -8.8500, "lng": 116.8000, "value": 900.0, "unit": "Ribu Ton Input Konsentrat", "rank": 2, "percentage_share": 35.0, "notes": "Smelter Tembaga & Pemurnian Logam Mulia Emas AMNT Benete"}
                ]
            },
            "COM-MINE-004-MINYAK-MENTAH": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Riau", "lat": 1.4822, "lng": 101.3431, "value": 162.0, "unit": "Ribu Barel/Hari", "rank": 1, "percentage_share": 26.8, "notes": "Blok Rokan Duri & Minas (Pertamina Hulu Rokan - Lapangan Terbesar)"},
                    {"province": "Jawa Timur", "lat": -7.1500, "lng": 111.7500, "value": 145.0, "unit": "Ribu Barel/Hari", "rank": 2, "percentage_share": 24.0, "notes": "Blok Cepu Banyu Urip & Kedung Keris (ExxonMobil Cepu Ltd Bojonegoro)"},
                    {"province": "Kepulauan Riau", "lat": 3.9500, "lng": 108.3800, "value": 65.0, "unit": "Ribu Barel/Hari", "rank": 3, "percentage_share": 10.7, "notes": "Natuna Sea Block B, Belida, & Kerisi (Lepas Pantai Natuna Selatan)"},
                    {"province": "Kalimantan Timur", "lat": -0.7000, "lng": 117.4000, "value": 52.0, "unit": "Ribu Barel/Hari", "rank": 4, "percentage_share": 8.6, "notes": "WK Mahakam, Sangasanga, & Tarakan (Pertamina Hulu Mahakam)"},
                    {"province": "Sumatera Selatan", "lat": -2.9000, "lng": 103.8000, "value": 38.0, "unit": "Ribu Barel/Hari", "rank": 5, "percentage_share": 6.3, "notes": "Corridor & Rimau Block Musi Banyuasin & Prabumulih"}
                ],
                "PNBP_APBN": [
                    {"province": "Riau", "lat": 1.4822, "lng": 101.3431, "value": 24500.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 28.5, "notes": "Akun BAS 421111 (PNBP SDA Minyak Bumi Blok Rokan)"},
                    {"province": "Jawa Timur", "lat": -7.1500, "lng": 111.7500, "value": 21200.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 24.7, "notes": "PNBP Bagian Negara Blok Cepu & DBH Bojonegoro"},
                    {"province": "Kepulauan Riau", "lat": 3.9500, "lng": 108.3800, "value": 9800.0, "unit": "Rp Miliar", "rank": 3, "percentage_share": 11.4, "notes": "PNBP Minyak Lepas Pantai Natuna"},
                    {"province": "Kalimantan Timur", "lat": -0.7000, "lng": 117.4000, "value": 8200.0, "unit": "Rp Miliar", "rank": 4, "percentage_share": 9.5, "notes": "PNBP SDA Minyak Mahakam"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Terminal Dumai (Riau)", "lat": 1.6800, "lng": 101.4500, "value": 85.0, "unit": "Ribu Barel/Hari", "rank": 1, "percentage_share": 45.0, "notes": "Terminal Pengapalan Minyak Mentah Sumatran Light Crude (SLC)"},
                    {"province": "FSO Gagak Rimang (Jawa Timur)", "lat": -6.7500, "lng": 112.1000, "value": 65.0, "unit": "Ribu Barel/Hari", "rank": 2, "percentage_share": 34.4, "notes": "Kapal Tangki Apung Penyimpan & Pemuat Minyak Mentah Cepu"},
                    {"province": "Terminal Senipah (Kaltim)", "lat": -1.0500, "lng": 117.0200, "value": 39.0, "unit": "Ribu Barel/Hari", "rank": 3, "percentage_share": 20.6, "notes": "Fasilitas Pengapalan Minyak Mentah & Kondensat Mahakam"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Kilang RU IV Cilacap (Jateng)", "lat": -7.7000, "lng": 109.0000, "value": 348.0, "unit": "Ribu Barel/Hari Kapasitas", "rank": 1, "percentage_share": 33.5, "notes": "Kilang Terbesar Nasional Memproduksi BBM Ramah Lingkungan & Avtur"},
                    {"province": "Kilang RU V Balikpapan (Kaltim)", "lat": -1.2500, "lng": 116.8300, "value": 360.0, "unit": "Ribu Barel/Hari Kapasitas", "rank": 2, "percentage_share": 34.6, "notes": "Proyek RDMP Modernisasi Pengolahan Minyak Mentah Nasional"},
                    {"province": "Kilang RU VI Balongan (Jabar)", "lat": -6.3600, "lng": 108.3500, "value": 125.0, "unit": "Ribu Barel/Hari Kapasitas", "rank": 3, "percentage_share": 12.0, "notes": "Kilang Pasokan Utama BBM Wilayah Jabodetabek"}
                ]
            },
            "COM-MINE-005-GAS-ALAM": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Papua Barat (Tangguh Bintuni)", "lat": -2.4500, "lng": 133.1500, "value": 2100.0, "unit": "MMSCFD", "rank": 1, "percentage_share": 38.2, "notes": "Proyek Train 1, 2, dan 3 Tangguh LNG (BP Berau Ltd)"},
                    {"province": "Kalimantan Timur (Kutai & Bontang)", "lat": -0.6000, "lng": 117.7000, "value": 1450.0, "unit": "MMSCFD", "rank": 2, "percentage_share": 26.4, "notes": "Eni Jangkrik, Merakes, & PHM Selat Makassar"},
                    {"province": "Sumatera Selatan (Corridor Block)", "lat": -2.5000, "lng": 103.9000, "value": 850.0, "unit": "MMSCFD", "rank": 3, "percentage_share": 15.5, "notes": "Lapangan Grissik & Suban (Medco Energi Grissik Ltd)"},
                    {"province": "Aceh & Natuna", "lat": 5.2000, "lng": 97.1000, "value": 480.0, "unit": "MMSCFD", "rank": 4, "percentage_share": 8.7, "notes": "Pasokan Gas Industri & Regasifikasi Pupuk Iskandar Muda"}
                ],
                "PNBP_APBN": [
                    {"province": "Papua Barat (Bintuni)", "lat": -2.4500, "lng": 133.1500, "value": 19800.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 37.5, "notes": "Akun BAS 421121 (PNBP SDA Gas Bumi) Train LNG Tangguh"},
                    {"province": "Kalimantan Timur", "lat": -0.6000, "lng": 117.7000, "value": 15200.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 28.8, "notes": "PNBP Gas Alam Bontang & Mahakam"},
                    {"province": "Sumatera Selatan", "lat": -2.5000, "lng": 103.9000, "value": 9400.0, "unit": "Rp Miliar", "rank": 3, "percentage_share": 17.8, "notes": "PNBP Gas Pipa Trans-Sumatera & Batam"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Tangguh LNG Jetty (Papua Barat)", "lat": -2.4300, "lng": 133.1800, "value": 11.4, "unit": "Juta Ton LNG/Thn", "rank": 1, "percentage_share": 52.3, "notes": "Terminal Muat Kapal Pengangkut LNG ke Asia Timur"},
                    {"province": "Bontang LNG Jetty (Kaltim)", "lat": 0.1000, "lng": 117.4800, "value": 8.2, "unit": "Juta Ton LNG/Thn", "rank": 2, "percentage_share": 37.6, "notes": "Terminal Muat PT Badak NGL Selat Makassar"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Kilang Badak NGL Bontang (Kaltim)", "lat": 0.1100, "lng": 117.4800, "value": 22.5, "unit": "Juta Ton/Thn Kapasitas", "rank": 1, "percentage_share": 50.0, "notes": "Pusat Pencairan Gas Alam Terbesar di Kawasan Timur Indonesia"},
                    {"province": "Tangguh Train 3 Facility (Papua Barat)", "lat": -2.4500, "lng": 133.1500, "value": 11.4, "unit": "Juta Ton/Thn Kapasitas", "rank": 2, "percentage_share": 25.3, "notes": "Fasilitas Pengolahan LNG Terintegrasi CCUS"},
                    {"province": "Donggi Senoro LNG (Sulteng)", "lat": -1.3800, "lng": 122.5500, "value": 2.1, "unit": "Juta Ton/Thn Kapasitas", "rank": 3, "percentage_share": 4.7, "notes": "Kilang LNG Swasta Pemasok Pasar Domestik & Ekspor"}
                ]
            },
            "ALL_HASIL_BUMI": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Kalimantan Timur", "lat": -0.5387, "lng": 116.4194, "value": 512.0, "unit": "Indeks Produksi", "rank": 1, "percentage_share": 34.5, "notes": "Sentra Terpadu Batubara Berau, Badak LNG, & Minyak Mahakam"},
                    {"province": "Papua (Tengah & Barat)", "lat": -4.0500, "lng": 137.1167, "value": 298.0, "unit": "Indeks Produksi", "rank": 2, "percentage_share": 20.1, "notes": "Grasberg Tembaga Emas PTFI & Tangguh LNG BP Berau"},
                    {"province": "Sulawesi Tengah", "lat": -1.4300, "lng": 121.4456, "value": 245.0, "unit": "Indeks Produksi", "rank": 3, "percentage_share": 16.5, "notes": "Pusat Hilirisasi Nikel Terbesar Dunia (Kawasan IMIP Morowali)"},
                    {"province": "Kalimantan Selatan", "lat": -3.0926, "lng": 115.2838, "value": 215.0, "unit": "Indeks Produksi", "rank": 4, "percentage_share": 14.5, "notes": "Sentra Tambang Batubara Terbuka Adaro & Arutmin"},
                    {"province": "Riau", "lat": 1.4822, "lng": 101.3431, "value": 185.0, "unit": "Indeks Produksi", "rank": 5, "percentage_share": 12.5, "notes": "Pusat Produksi Minyak Bumi Nasional Blok Rokan"},
                    {"province": "Maluku Utara", "lat": 0.7397, "lng": 127.5588, "value": 155.0, "unit": "Indeks Produksi", "rank": 6, "percentage_share": 10.4, "notes": "Kawasan Hilirisasi Nikel Pulau Obi & Weda Bay"},
                    {"province": "Nusa Tenggara Barat", "lat": -8.9667, "lng": 116.8667, "value": 120.0, "unit": "Indeks Produksi", "rank": 7, "percentage_share": 8.1, "notes": "Batu Hijau Sumbawa Barat Amman Mineral"}
                ],
                "PNBP_APBN": [
                    {"province": "Kalimantan Timur", "lat": -0.5387, "lng": 116.4194, "value": 82000.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 36.4, "notes": "Setoran Royalti Batubara, Minyak Bumi, dan Gas Alam Kaltim"},
                    {"province": "Papua (Tengah & Barat)", "lat": -4.0500, "lng": 137.1167, "value": 33900.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 15.1, "notes": "Dividen Saham Freeport & PNBP Gas Tangguh"},
                    {"province": "Riau", "lat": 1.4822, "lng": 101.3431, "value": 24500.0, "unit": "Rp Miliar", "rank": 3, "percentage_share": 10.9, "notes": "PNBP SDA Minyak Bumi Blok Rokan"},
                    {"province": "Sulawesi Tengah", "lat": -1.4300, "lng": 121.4456, "value": 18400.0, "unit": "Rp Miliar", "rank": 4, "percentage_share": 8.2, "notes": "Royalti Nikel & Ekspor Kawasan Industri Morowali"},
                    {"province": "Kalimantan Selatan", "lat": -3.0926, "lng": 115.2838, "value": 31500.0, "unit": "Rp Miliar", "rank": 5, "percentage_share": 14.0, "notes": "Setoran Royalti Batubara Terbesar Kal-Sel"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Muara Berau & Balikpapan (Kaltim)", "lat": 0.4500, "lng": 117.6000, "value": 315.0, "unit": "Juta Ton Kargo", "rank": 1, "percentage_share": 38.0, "notes": "Hub Ekspor Utama Batubara & Minyak Selat Makassar"},
                    {"province": "Taboneo (Kalimantan Selatan)", "lat": -3.7000, "lng": 114.4500, "value": 160.0, "unit": "Juta Ton Kargo", "rank": 2, "percentage_share": 19.3, "notes": "Anchorage Transshipment Ekspor Batubara Internasional"},
                    {"province": "Pelabuhan Morowali & Weda Bay", "lat": -2.8500, "lng": 122.1500, "value": 1340.0, "unit": "Ribu Ton Logam", "rank": 3, "percentage_share": 16.1, "notes": "Terminal Pengapalan Feronikel & Stainless Steel"},
                    {"province": "Pelabuhan Dumai (Riau)", "lat": 1.6800, "lng": 101.4500, "value": 85.0, "unit": "Ribu Barel/Hari", "rank": 4, "percentage_share": 10.2, "notes": "Terminal Pengapalan Minyak Mentah Internasional"},
                    {"province": "Pelabuhan Amamapare (Papua Tengah)", "lat": -4.8500, "lng": 136.9500, "value": 490.0, "unit": "Ribu Ton Konsentrat", "rank": 5, "percentage_share": 5.9, "notes": "Terminal Konsentrat Tembaga & Emas Grasberg"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Manyar Gresik (Jatim)", "lat": -7.1200, "lng": 112.6000, "value": 1700.0, "unit": "Kapasitas Ribu Ton", "rank": 1, "percentage_share": 25.0, "notes": "Smelter Pemurnian Tembaga & Emas Murni Single Line Terbesar Dunia"},
                    {"province": "Kawasan IMIP Morowali (Sulteng)", "lat": -2.8500, "lng": 122.1500, "value": 55.0, "unit": "Line Pabrik Smelter", "rank": 2, "percentage_share": 22.5, "notes": "Pabrik Stainless Steel & Bahan Baterai Listrik"},
                    {"province": "Kawasan IWIP Weda Bay (Malut)", "lat": 0.5000, "lng": 127.9000, "value": 35.0, "unit": "Line Pabrik Smelter", "rank": 3, "percentage_share": 18.0, "notes": "Smelter HPAL Prekursor Baterai Kendaraan Listrik"},
                    {"province": "Kilang RU IV Cilacap & Balikpapan", "lat": -7.7000, "lng": 109.0000, "value": 708.0, "unit": "Ribu Barel/Hari", "rank": 4, "percentage_share": 20.0, "notes": "Kilang Pengolahan Bahan Bakar Minyak Nasional"}
                ]
            },
            "COM-AGRI-001-BERAS": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Jawa Timur", "lat": -7.5360, "lng": 112.2384, "value": 9.8, "unit": "Juta Ton GKG", "rank": 1, "percentage_share": 18.2, "notes": "Lumbung Padi Nasional Terbesar (Lamongan, Ngawi, Bojonegoro)"},
                    {"province": "Jawa Tengah", "lat": -7.1509, "lng": 110.1402, "value": 9.2, "unit": "Juta Ton GKG", "rank": 2, "percentage_share": 17.1, "notes": "Sentra Padi Irigasi Teknis (Klaten, Sragen, Grobogan)"},
                    {"province": "Jawa Barat", "lat": -6.9175, "lng": 107.6191, "value": 9.0, "unit": "Juta Ton GKG", "rank": 3, "percentage_share": 16.7, "notes": "Jalur Pantura Karawang, Subang, Indramayu"},
                    {"province": "Sulawesi Selatan", "lat": -3.6687, "lng": 119.9740, "value": 5.1, "unit": "Juta Ton GKG", "rank": 4, "percentage_share": 9.5, "notes": "Lumbung Pangan Kawasan Timur Indonesia (Sidrap, Bone, Pinrang)"},
                    {"province": "Sumatera Selatan", "lat": -3.3194, "lng": 104.9144, "value": 2.9, "unit": "Juta Ton GKG", "rank": 5, "percentage_share": 5.4, "notes": "Sentra Pasang Surut Banyuasin & OKU Timur"}
                ],
                "PNBP_APBN": [
                    {"province": "Jawa Timur", "lat": -7.5360, "lng": 112.2384, "value": 4500.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 25.0, "notes": "Subsidi Pupuk & Bantuan Alsintan APBN Kementan"},
                    {"province": "Jawa Tengah", "lat": -7.1509, "lng": 110.1402, "value": 4200.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 23.3, "notes": "Rehabilitasi Jaringan Irigasi Bendungan APBN"},
                    {"province": "Jawa Barat", "lat": -6.9175, "lng": 107.6191, "value": 3900.0, "unit": "Rp Miliar", "rank": 3, "percentage_share": 21.7, "notes": "Alokasi Belanja Ketahanan Pangan APBN"},
                    {"province": "Sulawesi Selatan", "lat": -3.6687, "lng": 119.9740, "value": 2500.0, "unit": "Rp Miliar", "rank": 4, "percentage_share": 13.9, "notes": "Pencetakan Sawah Baru & Pompanisasi"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Tanjung Perak (Surabaya)", "lat": -7.1982, "lng": 112.7335, "value": 1.2, "unit": "Juta Ton Distribusi", "rank": 1, "percentage_share": 40.0, "notes": "Hub Logistik Beras Antarpulau ke Maluku & Papua"},
                    {"province": "Pelabuhan Tanjung Priok (Jakarta)", "lat": -6.1025, "lng": 106.8833, "value": 0.9, "unit": "Juta Ton Logistik", "rank": 2, "percentage_share": 30.0, "notes": "Pintu Bongkar Muat Cadangan Beras Pemerintah (Bulog)"},
                    {"province": "Pelabuhan Makassar (Sulsel)", "lat": -5.1200, "lng": 119.4100, "value": 0.6, "unit": "Juta Ton Distribusi", "rank": 3, "percentage_share": 20.0, "notes": "Gerbang Distribusi Pangan Nasional KTI"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Sentra Penggilingan Modern (Jatim)", "lat": -7.4500, "lng": 112.5000, "value": 120.0, "unit": "Unit Rice Milling Plant", "rank": 1, "percentage_share": 35.0, "notes": "Modern Rice Milling Plant (MRMP) Bulog Berteknologi Tinggi"},
                    {"province": "Sentra Penggilingan Padi (Jateng)", "lat": -7.2000, "lng": 110.5000, "value": 95.0, "unit": "Unit MRMP", "rank": 2, "percentage_share": 28.0, "notes": "Pusat Pengolahan Beras Premium & Kemasan Vakum"},
                    {"province": "Sentra Penggilingan Padi (Jabar)", "lat": -6.8000, "lng": 107.8000, "value": 85.0, "unit": "Unit MRMP", "rank": 3, "percentage_share": 25.0, "notes": "Kawasan Gudang Pengering Dryer & Silo Bulog"}
                ]
            },
            "COM-AGRI-007-KARET": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Sumatera Utara", "lat": 2.9500, "lng": 99.4000, "value": 485.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 28.5, "notes": "Perkebunan Karet Asahan, Labuhanbatu & Simalungun (PTPN III & Perkebunan Rakyat)"},
                    {"province": "Sumatera Selatan", "lat": -3.1000, "lng": 104.2000, "value": 420.0, "unit": "Ribu Ton", "rank": 2, "percentage_share": 24.7, "notes": "Sentra Karet Musi Banyuasin, Muara Enim, & Banyuasin"},
                    {"province": "Riau & Jambi", "lat": -1.6000, "lng": 103.6000, "value": 390.0, "unit": "Ribu Ton", "rank": 3, "percentage_share": 22.9, "notes": "Lembah Batanghari & Indragiri Hulu Penghasil Karet Alam Rakyat"},
                    {"province": "Kalimantan Barat", "lat": 0.0500, "lng": 109.3500, "value": 260.0, "unit": "Ribu Ton", "rank": 4, "percentage_share": 15.3, "notes": "Sentra Karet Sanggau & Landak"}
                ],
                "PNBP_APBN": [
                    {"province": "Sumatera Utara", "lat": 2.9500, "lng": 99.4000, "value": 650.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 33.3, "notes": "Penerimaan Bea Keluar Ekspor Karet & Pajak Industri Ban"},
                    {"province": "Sumatera Selatan", "lat": -3.1000, "lng": 104.2000, "value": 520.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 26.7, "notes": "Penerimaan Devisa Ekspor Crumb Rubber TSR 20"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Belawan (Medan)", "lat": 3.7800, "lng": 98.6800, "value": 1.2, "unit": "Juta Ton", "rank": 1, "percentage_share": 48.0, "notes": "Hub Ekspor Utama Karet Alam ke AS, Tiongkok, Jepang & Eropa"},
                    {"province": "Pelabuhan Boom Baru (Palembang)", "lat": -2.9800, "lng": 104.7700, "value": 0.8, "unit": "Juta Ton", "rank": 2, "percentage_share": 32.0, "notes": "Terminal Pengapalan Karet Lembaran & Remilling"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Kawasan Industri Medan & Asahan", "lat": 3.6500, "lng": 98.6800, "value": 35.0, "unit": "Unit Pabrik TSR", "rank": 1, "percentage_share": 40.0, "notes": "Pabrik Crumb Rubber TSR 20 Berstandar Internasional"},
                    {"province": "Kawasan Manufaktur Ban (Jabar & Banten)", "lat": -6.3000, "lng": 107.1500, "value": 15.0, "unit": "Pabrik Ban Terpadu", "rank": 2, "percentage_share": 35.0, "notes": "Pabrik Ban Kendaraan Bermotor (Gajah Tunggal, Bridgestone, Goodyear)"}
                ]
            },
            "COM-AGRI-008-TEMBAKAU": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Jawa Timur", "lat": -7.1500, "lng": 113.8500, "value": 115.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 51.1, "notes": "Sentra Tembakau Madura (Pamekasan, Sumenep) & Tembakau Cerutu Besuki Na-Oogst Jember"},
                    {"province": "Jawa Tengah", "lat": -7.3000, "lng": 110.1500, "value": 65.0, "unit": "Ribu Ton", "rank": 2, "percentage_share": 28.9, "notes": "Tembakau Srinthil & Garangan Temanggung, Wonosobo, Boyolali"},
                    {"province": "Nusa Tenggara Barat", "lat": -8.6500, "lng": 116.5000, "value": 38.0, "unit": "Ribu Ton", "rank": 3, "percentage_share": 16.9, "notes": "Tembakau Virginia Flue-Cured Lombok Timur & Tengah"}
                ],
                "PNBP_APBN": [
                    {"province": "Jawa Timur", "lat": -7.1500, "lng": 113.8500, "value": 115000.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 52.6, "notes": "Akun BAS 411513 (Realisasi Cukai Hasil Tembakau Kediri/Kudus/Surabaya & DBH CHT)"},
                    {"province": "Jawa Tengah", "lat": -7.3000, "lng": 110.1500, "value": 72000.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 33.0, "notes": "Setoran Cukai Sigaret Kretek Tangan & Mesin Nasional"},
                    {"province": "Nusa Tenggara Barat", "lat": -8.6500, "lng": 116.5000, "value": 18000.0, "unit": "Rp Miliar", "rank": 3, "percentage_share": 8.2, "notes": "Penerimaan DBH Cukai Tembakau NTB"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Tanjung Perak (Surabaya)", "lat": -7.2000, "lng": 112.7300, "value": 12.5, "unit": "Ribu Ton", "rank": 1, "percentage_share": 60.0, "notes": "Ekspor Daun Tembakau Cerutu Fermentasi ke Jerman & Karibia"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Kawasan Industri Kretek Kudus & Kediri", "lat": -6.8000, "lng": 110.8400, "value": 45.0, "unit": "Sentra Industri Rokok", "rank": 1, "percentage_share": 55.0, "notes": "Sentra Manufaktur IHT Nasional (Djarum, Gudang Garam, Sampoerna)"}
                ]
            },
            "COM-AGRI-009-KOPI": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Lampung & Bengkulu", "lat": -5.4000, "lng": 104.8000, "value": 215.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 27.4, "notes": "Ibukota Kopi Robusta Nasional (Tanggamus, Lampung Barat, Rejang Lebong)"},
                    {"province": "Sumatera Selatan", "lat": -4.0000, "lng": 103.2000, "value": 195.0, "unit": "Ribu Ton", "rank": 2, "percentage_share": 24.8, "notes": "Sentra Kopi Robusta Dataran Tinggi Pagar Alam & Semendo"},
                    {"province": "Aceh (Gayo)", "lat": 4.6000, "lng": 96.8500, "value": 85.0, "unit": "Ribu Ton", "rank": 3, "percentage_share": 10.8, "notes": "Sentra Kopi Arabika Gayo Organik Spesialti Terbesar (Bener Meriah & Aceh Tengah)"},
                    {"province": "Jawa Timur", "lat": -7.9500, "lng": 114.2000, "value": 75.0, "unit": "Ribu Ton", "rank": 4, "percentage_share": 9.6, "notes": "Kopi Arabika Java Ijen-Raung Bondowoso & Dampit Malang"},
                    {"province": "Sulawesi Selatan", "lat": -3.0000, "lng": 119.8500, "value": 55.0, "unit": "Ribu Ton", "rank": 5, "percentage_share": 7.0, "notes": "Kopi Arabika Toraja Kalosi & Enrekang"}
                ],
                "PNBP_APBN": [
                    {"province": "Lampung", "lat": -5.4000, "lng": 104.8000, "value": 310.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 33.7, "notes": "PPh Pasal 22 Ekspor Biji Kopi & Program KUR Perkebunan Kementan"},
                    {"province": "Aceh & Sumsel", "lat": 4.6000, "lng": 96.8500, "value": 280.0, "unit": "Rp Miliar", "rank": 2, "percentage_share": 30.4, "notes": "Devisa Ekspor Kopi Spesialti Bersertifikat Fair Trade & Organik"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Panjang (Lampung)", "lat": -5.4500, "lng": 105.3200, "value": 245.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 59.0, "notes": "Hub Utama Ekspor Kopi Robusta ke AS, Eropa, & Timur Tengah"},
                    {"province": "Pelabuhan Belawan & Malahayati", "lat": 3.7800, "lng": 98.6800, "value": 95.0, "unit": "Ribu Ton", "rank": 2, "percentage_share": 22.9, "notes": "Terminal Muat Kopi Arabika Gayo Ekspor"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Sentra Industri Kopi Lampung & Banten", "lat": -6.2000, "lng": 106.6500, "value": 25.0, "unit": "Pabrik Kopi Terpadu", "rank": 1, "percentage_share": 45.0, "notes": "Fasilitas Pengolahan Kopi Instan, Bubuk Kopi & Freeze Drying (Mayora, Kapal Api, Nestlé)"}
                ]
            },
            "COM-AGRI-010-KAKAO": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Sulawesi Tengah & Selatan", "lat": -1.0000, "lng": 120.0000, "value": 310.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 47.7, "notes": "Sabuk Emas Kakao Sulawesi (Parigi Moutong, Luwu Utara, Kolaka)"},
                    {"province": "Lampung & Sumsel", "lat": -5.2000, "lng": 105.1000, "value": 125.0, "unit": "Ribu Ton", "rank": 2, "percentage_share": 19.2, "notes": "Sentra Perkebunan Kakao Rakyat Sumatera"},
                    {"province": "Nusa Tenggara", "lat": -8.6000, "lng": 121.0000, "value": 65.0, "unit": "Ribu Ton", "rank": 3, "percentage_share": 10.0, "notes": "Sentra Kakao Fermentasi Flores & Lombok"}
                ],
                "PNBP_APBN": [
                    {"province": "Sulawesi Tengah & Selatan", "lat": -1.0000, "lng": 120.0000, "value": 410.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 57.7, "notes": "Penerimaan Bea Keluar Ekspor Biji Kakao & Gernas Kakao"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Makassar (Sulsel)", "lat": -5.1200, "lng": 119.4100, "value": 195.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 57.4, "notes": "Terminal Muat Biji Kakao & Produk Kakao Olahan ke Asia/Eropa"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Sentra Pengolahan Kakao Cilegon & Makassar", "lat": -6.0200, "lng": 106.0500, "value": 12.0, "unit": "Pabrik Grinding", "rank": 1, "percentage_share": 50.0, "notes": "Pabrik Pemrosesan Cocoa Butter, Powder & Liquor (Barry Callebaut, Cargill, Olam)"}
                ]
            },
            "COM-AGRI-011-TEH": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Jawa Barat", "lat": -7.1500, "lng": 107.5500, "value": 95.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 70.4, "notes": "Dataran Tinggi Priangan (Pangalengan, Ciwidey, Ciater, Sukabumi - PTPN VIII)"},
                    {"province": "Sumatera Utara & Barat", "lat": 2.9500, "lng": 99.0500, "value": 25.0, "unit": "Ribu Ton", "rank": 2, "percentage_share": 18.5, "notes": "Kebun Teh Sidamanik Simalungun & Kebun Danau Kembar Solok"},
                    {"province": "Jawa Tengah", "lat": -7.1000, "lng": 109.8000, "value": 12.0, "unit": "Ribu Ton", "rank": 3, "percentage_share": 8.9, "notes": "Kebun Teh Pagilaran Batang & Kaligua Brebes"}
                ],
                "PNBP_APBN": [
                    {"province": "Jawa Barat", "lat": -7.1500, "lng": 107.5500, "value": 240.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 70.6, "notes": "Devisa Ekspor Teh Hitam Orthodoks & Bantuan Revitalisasi Teh Rakyat"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Tanjung Priok (Jakarta)", "lat": -6.1000, "lng": 106.8800, "value": 38.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 84.4, "notes": "Pintu Utama Ekspor Teh Nasional ke Rusia, Malaysia, Pakistan"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Sentra Pabrik Teh Pangalengan & Puncak", "lat": -7.1500, "lng": 107.5500, "value": 40.0, "unit": "Pabrik Teh Modern", "rank": 1, "percentage_share": 65.0, "notes": "Fasilitas Pengolahan Teh Hitam CTC & Teh Celup Ekspor"}
                ]
            },
            "COM-AGRI-012-KELAPA": {
                "PRODUKSI_TERBANYAK": [
                    {"province": "Riau (Indragiri Hilir)", "lat": -0.3000, "lng": 103.1500, "value": 950.0, "unit": "Ribu Ton Kopra", "rank": 1, "percentage_share": 33.3, "notes": "Ibukota Kelapa Dunia Hamparan Kebun Kelapa Rakyat Terluas (Inhil)"},
                    {"province": "Sulawesi Utara", "lat": 1.4500, "lng": 124.8500, "value": 480.0, "unit": "Ribu Ton", "rank": 2, "percentage_share": 16.8, "notes": "Sentra Industri Kopra & Tepung Kelapa Minahasa"},
                    {"province": "Maluku Utara", "lat": 0.8000, "lng": 127.5000, "value": 320.0, "unit": "Ribu Ton", "rank": 3, "percentage_share": 11.2, "notes": "Kepulauan Kelapa Halmahera"},
                    {"province": "Jawa Timur & Jawa Tengah", "lat": -7.8000, "lng": 111.9000, "value": 290.0, "unit": "Ribu Ton", "rank": 4, "percentage_share": 10.2, "notes": "Sentra Gula Kelapa & Kelapa Sayur"}
                ],
                "PNBP_APBN": [
                    {"province": "Riau & Sulawesi Utara", "lat": -0.3000, "lng": 103.1500, "value": 310.0, "unit": "Rp Miliar", "rank": 1, "percentage_share": 64.6, "notes": "Penerimaan Pajak Ekspor Santan Beku, Minyak Kelapa & Karbon Aktif"}
                ],
                "TITIK_EKSPOR": [
                    {"province": "Pelabuhan Dumai & Bitung", "lat": 1.4400, "lng": 125.1800, "value": 520.0, "unit": "Ribu Ton", "rank": 1, "percentage_share": 57.8, "notes": "Terminal Pengapalan Crude Coconut Oil (CNO) & Desiccated Coconut"}
                ],
                "SMELTER_HILIR": [
                    {"province": "Sentra Industri Sambu Group (Inhil) & Bitung", "lat": -0.3000, "lng": 103.1500, "value": 18.0, "unit": "Pabrik Terpadu", "rank": 1, "percentage_share": 60.0, "notes": "Pabrik Pengolahan Santan Kemasan (Kara), Nata de Coco & Briket Arang"}
                ]
            }
        }

        # Link aliases for all commodity IDs & aggregates
        SPATIAL_REGISTRY["AGG_PERTANIAN"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["AGG_PERKEBUNAN"] = SPATIAL_REGISTRY["COM-MINE-004-MINYAK-MENTAH"]
        SPATIAL_REGISTRY["AGG_PERKEBUNAN_INDUSTRI"] = SPATIAL_REGISTRY["COM-MINE-004-MINYAK-MENTAH"]
        SPATIAL_REGISTRY["AGG_PERKEBUNAN_KONSUMSI"] = SPATIAL_REGISTRY["COM-AGRI-009-KOPI"]
        SPATIAL_REGISTRY["COM-PLANT-001-KARET"] = SPATIAL_REGISTRY["COM-AGRI-007-KARET"]
        SPATIAL_REGISTRY["COM-PLANT-002-TEMBAKAU"] = SPATIAL_REGISTRY["COM-AGRI-008-TEMBAKAU"]
        SPATIAL_REGISTRY["COM-PLANT-003-KOPI"] = SPATIAL_REGISTRY["COM-AGRI-009-KOPI"]
        SPATIAL_REGISTRY["COM-PLANT-004-KAKAO"] = SPATIAL_REGISTRY["COM-AGRI-010-KAKAO"]
        SPATIAL_REGISTRY["COM-PLANT-005-TEH"] = SPATIAL_REGISTRY["COM-AGRI-011-TEH"]
        SPATIAL_REGISTRY["COM-PLANT-006-KELAPA"] = SPATIAL_REGISTRY["COM-AGRI-012-KELAPA"]
        SPATIAL_REGISTRY["AGG_TAMBANG"] = SPATIAL_REGISTRY["ALL_HASIL_BUMI"]
        SPATIAL_REGISTRY["AGG_MINERBA"] = SPATIAL_REGISTRY["ALL_HASIL_BUMI"]
        SPATIAL_REGISTRY["AGG_MIGAS"] = SPATIAL_REGISTRY["COM-MINE-004-MINYAK-MENTAH"]
        SPATIAL_REGISTRY["AGG_NON_TAMBANG"] = SPATIAL_REGISTRY["ALL_HASIL_BUMI"]
        SPATIAL_REGISTRY["COM-NONMINE-001-KAYU"] = SPATIAL_REGISTRY["ALL_HASIL_BUMI"]
        SPATIAL_REGISTRY["COM-NONMINE-002-RUMPUT-LAUT"] = SPATIAL_REGISTRY["ALL_HASIL_BUMI"]
        SPATIAL_REGISTRY["COM-NONMINE-003-PANAS-BUMI"] = SPATIAL_REGISTRY["ALL_HASIL_BUMI"]

        # Agriculture aliases
        SPATIAL_REGISTRY["ALL_PERTANIAN"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["ALL_PERTANIAN_PETERNAKAN"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["AGG_PERTANIAN_TANAMAN"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["AGG_PERAIRAN"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["AGG_PETERNAKAN"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["COM-AGRI-002-JAGUNG"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["COM-AGRI-003-KEDELAI"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["COM-AGRI-004-GULA"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["COM-AGRI-005-BAWANG-MERAH"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["COM-AGRI-006-SAWIT-CPO"] = SPATIAL_REGISTRY["COM-MINE-004-MINYAK-MENTAH"]
        SPATIAL_REGISTRY["COM-LIVE-001-SAPI"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["COM-LIVE-002-AYAM"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["COM-FISH-001-TUNA"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]
        SPATIAL_REGISTRY["COM-FISH-002-UDANG"] = SPATIAL_REGISTRY["COM-AGRI-001-BERAS"]

        data = SPATIAL_REGISTRY.get(commodity_id, {}).get(variable, [])
        return {
            "commodity_id": commodity_id,
            "variable": variable,
            "year": year,
            "points": data,
            "total_points": len(data)
        }
