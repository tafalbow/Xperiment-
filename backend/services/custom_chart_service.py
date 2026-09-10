"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
Custom Chart Studio & Contextual Driver Analysis Service (1990 – 2026)
Provides multi-variable aggregation, custom transformations (YoY, 3Y-MA, Base 100),
and historical contextual driver intelligence based on official statutory documents.
==============================================================================
"""

import math
from typing import Dict, Any, List, Optional
from backend.services.lkpp_service import LKPPService
from backend.services.weekly_service import WeeklyService

class CustomChartService:
    """
    Backend engine for Custom Chart Studio.
    """

    # --------------------------------------------------------------------------
    # 1. HISTORICAL CONTEXTUAL DRIVER KNOWLEDGE BASE (1990 – 2026)
    # --------------------------------------------------------------------------
    HISTORICAL_MACRO_DRIVERS = {
        1990: {
            "title": "Era Pertumbuhan Deregulasi Perbankan (Pakto 1988) & Repelita V",
            "summary": "Perekonomian tumbuh pesat pasca Paket Kebijakan Oktober 1988 (Pakto 88). APBN dikelola dengan prinsip anggaran berimbang dinamis (ICW 1925) dengan ketergantungan pada penerimaan migas dan bantuan luar negeri.",
            "doc": "UU No. 1/1990 tentang APBN TA 1990/1991 & Lampiran Pidato Kenegaraan",
            "tags": ["Pakto 88", "Deregulasi", "Anggaran Berimbang"]
        },
        1997: {
            "title": "Awal Krisis Moneter Asia & Depresiasi Rupiah",
            "summary": "Pelemahan tajam mata uang Baht Thailand merembet ke Rupiah pada pertengahan 1997. Bank Indonesia memperlebar rentang intervensi hingga melepas sistem floating Rupiah. Beban subsidi BBM dan bunga utang valas melonjak tajam.",
            "doc": "Laporan Perhitungan Anggaran Negara (PAN) TA 1997/1998 & LHP BPK RI",
            "tags": ["Krisis 1997", "Depresiasi Rupiah", "Tekanan Fiskal"]
        },
        1998: {
            "title": "Puncak Krisis Finansial Asia: Kontraksi PDB -13.1% & Bailout Perbankan",
            "summary": "Krisis multidimensi menyebabkan kontraksi ekonomi terdalam dalam sejarah modern. Kurs Rupiah anjlok ke Rp 16.000/USD. Pemerintah menerbitkan Obligasi Rekapitulasi Perbankan (BLBI/BPPN) senilai >Rp 600 Triliun yang membebani neraca utang dan belanja bunga selama beberapa dekade.",
            "doc": "UU No. 3/1998 tentang Perhitungan Anggaran Negara TA 1998/1999 (Audited BPK)",
            "tags": ["Krisis 1998", "Obligasi Rekap", "Kontraksi Fiskal"]
        },
        1999: {
            "title": "Awal Pemulihan Pasca-Krisis & Penataan Kelembagaan Moneter",
            "summary": "Mulai berlakunya independensi Bank Indonesia melalui UU No. 23/1999. Pengalihan fungsi pengawasan fiskal dan awal penyusunan reformasi desentralisasi fiskal daerah.",
            "doc": "Laporan Keuangan PAN TA 1999/2000 Audited BPK RI",
            "tags": ["Independensi BI", "Pemulihan Awal"]
        },
        2001: {
            "title": "Implementasi Otonomi Daerah & Dana Perimbangan (Big Bang Decentralization)",
            "summary": "Pemberlakuan UU No. 22/1999 dan UU No. 25/1999. Porsi Belanja Negara dialihkan secara signifikan ke Transfer ke Daerah (DAU, DAK, DBH), mentransformasi struktur belanja pemerintah pusat.",
            "doc": "UU APBN TA 2001 & LHP BPK atas LKPP 2001",
            "tags": ["Otonomi Daerah", "Desentralisasi Fiskal", "DAU"]
        },
        2004: {
            "title": "Tonggak Reformasi Pengelolaan Keuangan Negara (UU 17/2003 & UU 1/2004)",
            "summary": "Penyusunan LKPP pertama kali berbasis standar akuntansi perbendaharaan modern. Penghentian sistem dual budgeting (RUT & Pembangunan) menjadi klasifikasi terpadu. Ditetapkannya batas defisit legal APBN maksimal 3% dan rasio utang maksimal 60% PDB.",
            "doc": "LHP BPK RI atas Laporan Keuangan Pemerintah Pusat (LKPP) TA 2004 (Pertama Audited)",
            "tags": ["Paket UU Keuangan Negara", "Disiplin Fiskal 3%", "Unifikasi Anggaran"]
        },
        2005: {
            "title": "Reformasi Subsidi BBM & Pengenalan BLT Pertama",
            "summary": "Kenaikan harga minyak mentah dunia mendorong pemerintah menaikkan harga BBM bersubsidi lebih dari 100%. Penghematan subsidi dialihkan ke program kompensasi sosial pertama berupa Bantuan Langsung Tunai (BLT). Standar Akuntansi Kas Menuju Akrual (PP 24/2005) mulai berlaku.",
            "doc": "LHP BPK RI atas LKPP TA 2005 & Nota Keuangan APBN-P 2005",
            "tags": ["Kenaikan BBM", "Kompensasi BLT", "PP 24/2005"]
        },
        2008: {
            "title": "Krisis Keuangan Global (GFC) & Lonjakan Harga Komoditas Energi",
            "summary": "Krisis subprime mortgage AS memicu kepanikan pasar keuangan global. Namun penerimaan negara Indonesia melonjak akibat rekor harga minyak mentah ICP ($140/barel) dan komoditas batubara/sawit, menopang penerimaan pajak dan PNBP migas.",
            "doc": "LHP BPK RI atas LKPP TA 2008 (Opini WDP)",
            "tags": ["GFC 2008", "Komoditas Boom", "ICP Peak"]
        },
        2009: {
            "title": "Stimulus Fiskal Pemulihan Krisis Global & Reformasi Perpajakan",
            "summary": "Pemerintah menggulirkan paket stimulus fiskal sebesar Rp 73,3 Triliun untuk menjaga daya beli masyarakat dan insentif perpajakan. Indonesia berhasil mempertahankan pertumbuhan ekonomi positif 4,6% di tengah resesi global.",
            "doc": "LHP BPK RI atas LKPP TA 2009 & UU No. 36/2008 PPh Baru",
            "tags": ["Stimulus Fiskal", "Daya Beli", "Tax Cut"]
        },
        2012: {
            "title": "Penguatan Belanja Infrastruktur & Eskalasi Beban Subsidi BBM",
            "summary": "Konsumsi BBM bersubsidi melampaui kuota kuantitas APBN akibat disparitas harga yang lebar. Belanja subsidi melonjak melampaui Rp 300 Triliun, mendesak ruang fiskal belanja produktif.",
            "doc": "LHP BPK RI atas LKPP TA 2012",
            "tags": ["Subsidi Membengkak", "Ruang Fiskal Ketat"]
        },
        2014: {
            "title": "Transisi Pemerintahan & Awal Penataan Ruang Fiskal",
            "summary": "Penyesuaian harga BBM bersubsidi di akhir 2014 untuk membebaskan ruang fiskal belanja infrastruktur nasional. Persiapan transisi menuju Standar Akuntansi Pemerintahan (SAP) Akrual Penuh PP 71/2010.",
            "doc": "LHP BPK RI atas LKPP TA 2014 (Opini WDP)",
            "tags": ["Transisi Fiskal", "Realokasi Subsidi"]
        },
        2015: {
            "title": "Implementasi Penuh SAP Akrual (PP 71/2010) & Realokasi Subsidi ke Infrastruktur",
            "summary": "Pertama kalinya LKPP menyajikan Laporan Operasional (LO), Neraca Akrual Penuh, dan Laporan Perubahan Ekuitas (LPE). Belanja subsidi BBM dipangkas drastis >Rp 200 Triliun dan dialihkan ke Belanja Modal Infrastruktur konektivitas dan Dana Desa.",
            "doc": "LHP BPK RI atas LKPP TA 2015 (Akrual Penuh Pertama)",
            "tags": ["SAP Akrual Penuh", "Dana Desa", "Boom Infrastruktur"]
        },
        2016: {
            "title": "Program Tax Amnesty (Pengampunan Pajak) Jilid 1",
            "summary": "Pemberlakuan UU No. 11/2016 tentang Pengampunan Pajak menghasilkan uang tebusan >Rp 114 Triliun dan repatriasi/deklarasi harta >Rp 4.800 Triliun, memperluas basis data perpajakan nasional.",
            "doc": "LHP BPK RI atas LKPP TA 2016 (Pertama Kali Meraih Opini WTP)",
            "tags": ["Tax Amnesty", "WTP Pertama", "Basis Pajak"]
        },
        2017: {
            "title": "Awal Revaluasi BMN Nasional & Opini Wajar Tanpa Pengecualian (WTP)",
            "summary": "Dimulainya inventarisasi dan penilaian kembali Barang Milik Negara (BMN) di seluruh kementerian/lembaga yang melipatgandakan nilai aset tetap dan ekuitas negara di Neraca Pemerintah Pusat.",
            "doc": "LHP BPK RI atas LKPP TA 2017 (Opini WTP Berturut-turut)",
            "tags": ["Revaluasi BMN", "WTP", "Aset Negara"]
        },
        2019: {
            "title": "Penyelesaian Revaluasi BMN: Aset Negara Tembus >Rp 10.400 Triliun",
            "summary": "Penyelesaian penilaian kembali aset BMN menghasilkan lonjakan revaluasi pada Laporan Perubahan Ekuitas dan Neraca, memperkuat posisi solvabilitas dan kredibilitas neraca keuangan negara.",
            "doc": "LHP BPK RI atas LKPP TA 2019 (Opini WTP)",
            "tags": ["Aset >Rp 10 Ribu Triliun", "Revaluasi Tuntas"]
        },
        2020: {
            "title": "Pandemi COVID-19: Pelebaran Defisit Melebihi 3% (UU 2/2020) & Program PEN",
            "summary": "Pemerintah mengesahkan Perppu 1/2020 (UU 2/2020) yang merelaksasi batas defisit legal di atas 3% PDB selama 3 tahun. Pendapatan negara anjlok -16% akibat restriksi ekonomi, sementara belanja kesehatan, perlindungan sosial, dan Program Pemulihan Ekonomi Nasional (PEN) mencapai Rp 695 Triliun. Defisit anggaran mencapai 6,14% PDB.",
            "doc": "LHP BPK RI atas LKPP TA 2020 & UU No. 2/2020 tentang Kebijakan Keuangan Negara Penanganan Pandemi",
            "tags": ["COVID-19", "Defisit 6.14%", "Program PEN", "Bansos Masif"]
        },
        2021: {
            "title": "Akselerasi Vaksinasi, Pemulihan Ekonomi & Pengesahan UU HPP",
            "summary": "Perekonomian rebound tumbuh +3.7%. Pemerintah mengesahkan UU No. 7/2021 tentang Harmonisasi Peraturan Perpajakan (HPP) yang menaikkan tarif PPN menjadi 11%, menambah bracket PPh 35%, serta Program Pengungkapan Sukarela (PPS).",
            "doc": "LHP BPK RI atas LKPP TA 2021 (Opini WTP) & UU No. 7/2021 HPP",
            "tags": ["UU HPP", "PPN 11%", "Pemulihan Ekonomi"]
        },
        2022: {
            "title": "Windfall Profit Komoditas Global & Konsolidasi Fiskal Cepat",
            "summary": "Konflik geopolitik global memicu lonjakan rekor harga batubara, CPO, dan gas bumi. Penerimaan perpajakan dan PNBP melampaui target UU APBN hingga surplus penerimaan mencapai ratusan triliun. Defisit berhasil ditekan kembali ke bawah 3% PDB (2,38%) satu tahun lebih cepat dari mandat UU 2/2020.",
            "doc": "LHP BPK RI atas LKPP TA 2022 & Realisasi APBN KiTa 2022",
            "tags": ["Commodity Boom", "Konsolidasi Fiskal", "Defisit <3%"]
        },
        2023: {
            "title": "Penerapan UU HKPD No. 1/2022 & Penyesuaian Tarif CHT Multi-Year",
            "summary": "Implementasi UU No. 1/2022 tentang Hubungan Keuangan Pusat dan Daerah (HKPD). DBH CHT dinaikkan menjadi 3% dengan earmarking 50% kesehatan, 40% kesejahteraan, 10% hukum. Kenaikan tarif cukai hasil tembakau rata-rata 10% memicu fenomena downtrading rokok.",
            "doc": "LHP BPK RI atas LKPP TA 2023 (Opini WTP ke-8 Berturut-turut)",
            "tags": ["UU HKPD", "DBH-CHT 3%", "Tarif Cukai 10%", "Downtrading"]
        },
        2024: {
            "title": "Penyelenggaraan Pemilu Serentak & Belanja Prioritas Bansos/IKN",
            "summary": "Peningkatan belanja pemerintah pusat untuk alokasi Pemilu Serentak 2024, penebalan bantuan pangan El Nino, serta percepatan penyelesaian infrastruktur dasar Ibu Kota Nusantara (IKN).",
            "doc": "LHP BPK RI atas LKPP TA 2024 (WTP) & UU APBN TA 2024",
            "tags": ["Pemilu 2024", "IKN", "Penebalan Bansos"]
        },
        2025: {
            "title": "Tahun Pertama Pemerintahan Baru & Prognosa APBN KiTa",
            "summary": "Realisasi sementara mencerminkan transisi program prioritas nasional baru, peningkatan belanja pendidikan dan kesehatan, stabilisasi harga pangan pokok melalui intervensi Bapanas/Bulog, serta efisiensi belanja operasional K/L.",
            "doc": "Laporan Realisasi Sementara APBN KiTa Semester II TA 2025 Kemenkeu RI",
            "tags": ["Transisi 2025", "Angka Sementara", "Program Prioritas"]
        },
        2026: {
            "title": "Target & Alokasi Pagu Statutori UU APBN 2026",
            "summary": "Pagu anggaran disahkan oleh DPR RI dengan target pendapatan perpajakan >Rp 2.400 Triliun, alokasi transfer ke daerah >Rp 900 Triliun, pembiayaan investasi, dan batas defisit terukur di kisaran 2,5% PDB.",
            "doc": "Undang-Undang Republik Indonesia tentang Anggaran Pendapatan dan Belanja Negara TA 2026",
            "tags": ["UU APBN 2026", "Pagu Anggaran", "Target DPR"]
        }
    }

    _VARIABLES_CACHE: Optional[List[Dict[str, Any]]] = None
    _VARIABLES_MAP_CACHE: Optional[Dict[str, Dict[str, Any]]] = None

    # --------------------------------------------------------------------------
    # 2. VARIABLE REGISTRY COMPILER (WITH IN-MEMORY CACHING)
    # --------------------------------------------------------------------------
    @classmethod
    def get_all_variables(cls, force_refresh: bool = False) -> List[Dict[str, Any]]:
        """
        Gathers and returns all selectable variables from Trend Keuangan Negara (9 tables)
        plus high-frequency Weekly indicators with instant in-memory memoization.
        """
        if cls._VARIABLES_CACHE is not None and not force_refresh:
            return cls._VARIABLES_CACHE

        variables = []
        var_map = {}

        # From LKPP 9 Tables
        for table in LKPPService.TABLE_REGISTRY:
            t_id = table["id"]
            rows = LKPPService.get_table_rows(t_id)
            for r in rows:
                item = {
                    "id": f"{t_id}__{r['id']}",
                    "raw_id": r["id"],
                    "code": r.get("code", ""),
                    "name": r["name"],
                    "category": r.get("category", ""),
                    "table_id": t_id,
                    "table_name": table["short_name"],
                    "source_type": "KEUANGAN_NEGARA",
                    "default_unit": "Triliun Rp",
                    "unit_short": "Rp T",
                    "default_axis": "left",
                    "default_chart_type": "line" if "DEFISIT" in r["id"] or "RASIO" in r["id"] else "bar",
                    "is_header": r.get("is_header", False),
                    "series_values": r["values"] # Dict { "1990": float, ..., "2026": float }
                }
                variables.append(item)
                var_map[item["id"]] = item
                var_map[item["raw_id"]] = item

        # From Weekly indicators
        weekly_indicators = WeeklyService._init_indicators()
        for w_ind in weekly_indicators:
            annual_vals = {}
            for y_int in WeeklyService.YEARS:
                y_str = str(y_int)
                w_data = w_ind["series"].get(y_str, {})
                vals = list(w_data.values())
                annual_vals[y_str] = round(sum(vals) / len(vals), 2) if vals else 0.0

            w_item = {
                "id": f"WEEKLY__{w_ind['id']}",
                "raw_id": w_ind["id"],
                "code": w_ind["code"],
                "name": f"{w_ind['name']} (Mingguan {w_ind['institution_name']})",
                "category": w_ind["category"],
                "table_id": "WEEKLY",
                "table_name": f"Weekly {w_ind['institution_name']}",
                "source_type": "WEEKLY",
                "default_unit": w_ind["unit"],
                "unit_short": w_ind["unit_short"],
                "default_axis": "right" if "%" in w_ind["unit"] or "Poin" in w_ind["unit"] else "left",
                "default_chart_type": "line",
                "is_header": False,
                "series_values": annual_vals
            }
            variables.append(w_item)
            var_map[w_item["id"]] = w_item
            var_map[w_item["raw_id"]] = w_item

        cls._VARIABLES_CACHE = variables
        cls._VARIABLES_MAP_CACHE = var_map
        return cls._VARIABLES_CACHE

    @classmethod
    def get_variable_by_id(cls, variable_id: str) -> Optional[Dict[str, Any]]:
        """O(1) instant dictionary lookup for a single variable."""
        if cls._VARIABLES_MAP_CACHE is None:
            cls.get_all_variables()
        return cls._VARIABLES_MAP_CACHE.get(variable_id) if cls._VARIABLES_MAP_CACHE else None

    # --------------------------------------------------------------------------
    # 3. TRANSFORMATION ENGINE
    # --------------------------------------------------------------------------
    @classmethod
    def calculate_series(cls, variable_id: str, transformation: str = "RAW", start_year: int = 1990, end_year: int = 2026) -> Dict[str, Any]:
        """
        Calculates transformed series (RAW, YOY, AVG_3Y, BASE_100) for the given variable with O(1) variable lookup.
        """
        var_meta = cls.get_variable_by_id(variable_id)
        if not var_meta:
            raise ValueError(f"Variabel '{variable_id}' tidak ditemukan.")

        raw_values = var_meta["series_values"]
        years = sorted([int(y) for y in raw_values.keys() if start_year <= int(y) <= end_year])

        transformed_points = []
        prev_val = None
        base_val = None

        # Look up baseline before start_year for smooth YoY if available
        if start_year > 1990:
            y_prior = str(start_year - 1)
            if y_prior in raw_values:
                prev_val = raw_values[y_prior]

        for idx, y in enumerate(years):
            y_str = str(y)
            raw_v = raw_values.get(y_str, 0.0)
            if base_val is None and raw_v != 0:
                base_val = raw_v

            calc_v = raw_v
            unit_display = var_meta["unit_short"]

            if transformation == "YOY":
                unit_display = "% YoY"
                if prev_val is not None and prev_val != 0:
                    calc_v = round(((raw_v - prev_val) / abs(prev_val)) * 100.0, 2)
                else:
                    calc_v = 0.0
            elif transformation == "AVG_3Y":
                # 3-Year moving average
                y1 = raw_values.get(str(y - 1), raw_v)
                y2 = raw_values.get(str(y - 2), y1)
                calc_v = round((raw_v + y1 + y2) / 3.0, 2)
            elif transformation == "BASE_100":
                unit_display = "Indeks (100)"
                if base_val and base_val != 0:
                    calc_v = round((raw_v / base_val) * 100.0, 2)
                else:
                    calc_v = 100.0

            prev_val = raw_v
            transformed_points.append({
                "year": y,
                "value": calc_v,
                "raw_value": raw_v
            })

        return {
            "variable_id": var_meta["id"],
            "code": var_meta["code"],
            "name": var_meta["name"],
            "category": var_meta["category"],
            "table_name": var_meta["table_name"],
            "transformation": transformation,
            "unit": unit_display,
            "series": transformed_points
        }

    # --------------------------------------------------------------------------
    # 4. CONTEXTUAL DRIVER RETRIEVAL
    # --------------------------------------------------------------------------
    @classmethod
    def get_contextual_driver(cls, year: int, variable_ids: List[str]) -> Dict[str, Any]:
        """
        Retrieves in-depth explanation of why indicators moved YoY at the hovered year.
        Combines statutory macro context with indicator-specific policy / market drivers.
        """
        macro_driver = cls.HISTORICAL_MACRO_DRIVERS.get(year, {
            "title": f"Dinamika Fiskal & Kebijakan Ekonomi Nasional TA {year}",
            "summary": f"Pergerakan pos keuangan negara TA {year} mengikuti perkembangan makroekonomi dan pelaksanaan alokasi APBN.",
            "doc": f"Laporan Keuangan Pemerintah Pusat (LKPP) TA {year} Audited BPK RI",
            "tags": ["Fiskal", "APBN"]
        })

        var_drivers = []

        for vid in variable_ids:
            v_meta = cls.get_variable_by_id(vid)
            if not v_meta:
                continue

            vals = v_meta["series_values"]
            cur_v = vals.get(str(year), 0.0)
            prev_v = vals.get(str(year - 1), None)
            
            yoy_change = None
            diff = None
            direction = "TETAP"
            
            if prev_v is not None and prev_v != 0:
                diff = round(cur_v - prev_v, 2)
                yoy_change = round((diff / abs(prev_v)) * 100.0, 2)
                if yoy_change > 0.5:
                    direction = "NAIK"
                elif yoy_change < -0.5:
                    direction = "TURUN"

            # Contextual specific reasoning generator based on domain rules
            specific_reason = cls._generate_variable_driver_reason(v_meta, year, yoy_change, direction)

            var_drivers.append({
                "variable_id": v_meta["id"],
                "code": v_meta["code"],
                "name": v_meta["name"],
                "unit": v_meta["unit_short"],
                "current_value": cur_v,
                "previous_value": prev_v,
                "diff": diff,
                "yoy_change_percent": yoy_change,
                "direction": direction,
                "explanation": specific_reason
            })

        return {
            "year": year,
            "macro_context": macro_driver,
            "variable_drivers": var_drivers
        }

    @classmethod
    def _generate_variable_driver_reason(cls, v_meta: Dict[str, Any], year: int, yoy_pct: Optional[float], direction: str) -> str:
        """Generates grounded contextual reason for a specific variable at a specific year."""
        name_lower = v_meta["name"].lower()
        id_upper = v_meta["id"].upper()

        if "cukai" in name_lower or "cht" in name_lower:
            if year in [2020, 2021]:
                return f"Penyesuaian tarif CHT sebesar rata-rata 23% (2020) dan 12.5% (2021) di tengah pelemahan daya beli akibat pandemi, disertai lonjakan penindakan rokok ilegal oleh DJBC."
            elif year in [2022, 2023]:
                return f"Kenaikan tarif CHT multi-year rata-rata 10% per tahun berdasarkan PMK 191/2022, diiringi fenomena peralihan konsumsi perokok (downtrading) ke rokok golongan II dan III yang bertarif lebih rendah."
            elif year >= 2024:
                return f"Stabilitas penerimaan cukai tembakau dipengaruhi kebijakan moratorium kenaikan tarif 2025-2026 dan intensifikasi ekstensifikasi cukai MBDK serta pengawasan rokok polos."
            else:
                return f"Perubahan tarif spesifik cukai hasil tembakau tahunan dan pertumbuhan volume produksi rokok nasional."

        elif "pegawai" in name_lower:
            if year in [2020, 2021]:
                return "Pengendalian belanja pegawai akibat pandemi, pembatasan perjalanan dinas, serta penundaan pembayaran THR/Gaji-13 untuk pejabat eselon."
            elif year == 2024:
                return "Kenaikan gaji pokok ASN/TNI/Polri sebesar 8% dan pensiunan sebesar 12% sesuai Perpres penyesuaian gaji awal 2024."
            else:
                return "Kenaikan gaji berkala, penyesuaian formasi CASN/PPPK, dan pemberian tunjangan kinerja kementerian/lembaga."

        elif "modal" in name_lower or "infrastruktur" in name_lower:
            if year in [2015, 2016, 2017]:
                return "Akselerasi masif belanja infrastruktur konektivitas (jalan tol Trans-Jawa, pelabuhan, bandara baru) pasca-pemangkasan subsidi BBM."
            elif year == 2020:
                return "Refocussing dan realokasi anggaran belanja modal K/L untuk dialihkan ke penanganan darurat kesehatan COVID-19 dan bansos."
            elif year in [2023, 2024]:
                return "Peningkatan belanja modal untuk penyelesaian Proyek Strategis Nasional (PSN) dan pembangunan infrastruktur dasar KIPP IKN Nusantara."
            else:
                return "Realisasi proyek multiyears belanja modal fisik, pembebasan lahan, dan alokasi SBSN proyek kementerian teknis."

        elif "pajak" in name_lower:
            if year in [2016, 2017]:
                return "Dukungan penerimaan dari Program Pengampunan Pajak (Tax Amnesty) dan repatriasi aset luar negeri."
            elif year == 2020:
                return "Penurunan aktivitas ekonomi domestik dan pemberian insentif perpajakan dunia usaha (PPh 21 DTP, pengurangan PPh 25, restitusi dipercepat)."
            elif year in [2021, 2022]:
                return "Kenaikan harga komoditas ekspor (windfall profit) serta implementasi UU HPP No. 7/2021 (kenaikan tarif PPN 11% dan pajak natura)."
            else:
                return "Pertumbuhan basis pajak sejalan dengan pertumbuhan ekonomi nominal dan efektivitas sistem Core Tax Administration System (CTAS)."

        elif "defisit" in name_lower:
            if year in [2020, 2021]:
                return "Pelebaran defisit di atas 3% PDB disahkan berdasarkan UU No. 2/2020 guna mendanai penanganan pandemi dan program PEN."
            elif year in [2022, 2023]:
                return "Konsolidasi fiskal kembali ke bawah 3% PDB dicapai lebih cepat dari rencana awal karena lonjakan penerimaan komoditas ekspor."
            else:
                return "Target defisit dijaga disiplin di bawah ambang batas statutori 3% Produk Domestik Bruto."

        elif "bunga" in name_lower or "utang" in name_lower:
            if year in [2020, 2021, 2022]:
                return "Peningkatan beban bunga utang konsekuensi dari akumulasi penerbitan SBN untuk mendanai pembiayaan penanganan pandemi (burden sharing dengan BI)."
            else:
                return "Pergerakan imbal hasil (yield) obligasi acuan pemerintah 10-tahun dan dinamika suku bunga acuan global/domestik."

        else:
            yoy_txt = f"bergerak {direction.lower()} {abs(yoy_pct)}%" if yoy_pct is not None else "tercatat stabil"
            return f"Realisasi pos {v_meta['name']} pada TA {year} {yoy_txt} selaras dengan dinamika siklus anggaran dan perkembangan makroekonomi nasional."

custom_chart_service = CustomChartService()
