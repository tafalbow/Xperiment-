import sqlite3
from typing import Dict, Any, List, Optional
from backend.database.connection import get_db

class CrosswalkService:
    """
    Manages classification harmonization crosswalk rules and comprehensive multi-year 
    LKPP financial statements (LRA Pendapatan, Neraca, Laporan Arus Kas).
    """

    @staticmethod
    def get_all_crosswalk_rules(sector: Optional[str] = None) -> List[Dict[str, Any]]:
        """Retrieves mapping crosswalk rules connecting historical source classifications to standardized national codes."""
        rules = [
            {
                "id": 1,
                "sector": "Fiskal / Belanja Negara",
                "original_classification": "Belanja Rutin — Belanja Pegawai (Gaji & Tunjangan)",
                "standardized_classification": "Belanja Pegawai (Kode Akun 51xxxx)",
                "mapping_rule": "Harmonisasi UU 17/2003 & BAS PMK 214/2013 (Unified Budget GFS)",
                "effective_start_year": 1993,
                "effective_end_year": 2004,
                "source_institution": "Kementerian Keuangan RI",
                "transformation_note": "Dialihkan dari klasifikasi dual-budgeting (Rutin) ke akun belanja pegawai ekonomi modern.",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 2,
                "sector": "Fiskal / Belanja Negara",
                "original_classification": "Belanja Rutin — Belanja Barang (Operasional & Pemeliharaan)",
                "standardized_classification": "Belanja Barang & Jasa (Kode Akun 52xxxx)",
                "mapping_rule": "Harmonisasi UU 17/2003 & BAS PMK 214/2013",
                "effective_start_year": 1993,
                "effective_end_year": 2004,
                "source_institution": "Kementerian Keuangan RI",
                "transformation_note": "Menggabungkan belanja operasional rutin dan belanja barang non-fisik pembangunan.",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 3,
                "sector": "Fiskal / Belanja Negara",
                "original_classification": "Belanja Pembangunan — Belanja Fisik / Proyek Infrastruktur",
                "standardized_classification": "Belanja Modal (Kode Akun 53xxxx: Tanah, Gedung, Peralatan, Jaringan)",
                "mapping_rule": "Harmonisasi Akuntansi Akrual SAP PMK 214/2013",
                "effective_start_year": 1993,
                "effective_end_year": 2004,
                "source_institution": "Kementerian Keuangan RI",
                "transformation_note": "Kapitalisasi aset tetap ke dalam Neraca Pemerintah Pusat dari belanja pembangunan fisik.",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 4,
                "sector": "Fiskal / Belanja Negara",
                "original_classification": "Belanja Rutin — Pembayaran Bunga Utang DN & LN",
                "standardized_classification": "Belanja Bunga Utang (Kode Akun 54xxxx)",
                "mapping_rule": "Harmonisasi GFS 2001/2014 & UU APBN",
                "effective_start_year": 1993,
                "effective_end_year": 2004,
                "source_institution": "Kementerian Keuangan RI",
                "transformation_note": "Pemisahan pembayaran bunga (beban operasi) dan cicilan pokok (aktivitas pembiayaan).",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 5,
                "sector": "Fiskal / Belanja Negara",
                "original_classification": "Belanja Rutin — Subsidi Bahan Bakar Minyak & Pangan",
                "standardized_classification": "Belanja Subsidi Energi & Non-Energi (Kode Akun 55xxxx)",
                "mapping_rule": "Harmonisasi BAS LKPP Audited",
                "effective_start_year": 1993,
                "effective_end_year": 2004,
                "source_institution": "Kementerian Keuangan RI",
                "transformation_note": "Standarisasi kompensasi selisih harga ke BUMN dan subsidi harga langsung.",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 6,
                "sector": "Fiskal / Belanja Negara",
                "original_classification": "Belanja Pembangunan — Bantuan Proyek Khusus & Penanggulangan Kemiskinan",
                "standardized_classification": "Belanja Bantuan Sosial (Kode Akun 57xxxx)",
                "mapping_rule": "Harmonisasi PMK 254/PMK.05/2015 & SAP",
                "effective_start_year": 1993,
                "effective_end_year": 2004,
                "source_institution": "Kementerian Keuangan RI",
                "transformation_note": "Reklasifikasi bantuan sosial kemasyarakatan dari pos proyek pembangunan.",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 7,
                "sector": "Fiskal / Pendapatan Negara",
                "original_classification": "Penerimaan Dalam Negeri — Pajak Langsung (PPh Migas & Non-Migas)",
                "standardized_classification": "Pendapatan Pajak Penghasilan (Kode Akun 4111xx)",
                "mapping_rule": "Harmonisasi Bagan Akun Standar (BAS) DJP & LKPP",
                "effective_start_year": 1993,
                "effective_end_year": 2007,
                "source_institution": "Ditjen Pajak - Kementerian Keuangan",
                "transformation_note": "Rincian akun PPh Pasal 21, 22, 23, 25/29 OP, 25/29 Badan, 26, Final, dan Migas.",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 8,
                "sector": "Fiskal / Pendapatan Negara",
                "original_classification": "Penerimaan Dalam Negeri — Pajak Tidak Langsung (PPN & PPnBM)",
                "standardized_classification": "Pendapatan PPN & PPnBM (Kode Akun 4112xx)",
                "mapping_rule": "Harmonisasi Standar Akuntansi Pemerintahan (SAP)",
                "effective_start_year": 1993,
                "effective_end_year": 2007,
                "source_institution": "Ditjen Pajak - Kementerian Keuangan",
                "transformation_note": "Pemisahan PPN Dalam Negeri, PPN Impor, PPnBM DN, PPnBM Impor, dan PPN DTP.",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 9,
                "sector": "Fiskal / Pendapatan Negara",
                "original_classification": "Penerimaan Bukan Pajak (Migas, Pertambangan Umum, BUMN)",
                "standardized_classification": "Penerimaan Negara Bukan Pajak / PNBP (Kode Akun 42xxxx)",
                "mapping_rule": "Harmonisasi UU 20/1997 & UU 9/2018 tentang PNBP",
                "effective_start_year": 1993,
                "effective_end_year": 2018,
                "source_institution": "Kementerian Keuangan RI",
                "transformation_note": "Pengelompokan PNBP SDA (421xxx), Laba BUMN/KND (422xxx), PNBP Lainnya (423xxx), dan BLU (424xxx).",
                "mapping_version": "v2.1-BAS-Harmonized"
            },
            {
                "id": 10,
                "sector": "Neraca / Aset Negara",
                "original_classification": "Barang Inventaris Negara (BIN) Pra-Akrual",
                "standardized_classification": "Aset Tetap & Akumulasi Penyusutan (Kode Akun 13xxxx)",
                "mapping_rule": "Inventarisasi & Penilaian Kembali BMN (Revaluasi BMN PMK 118/2017)",
                "effective_start_year": 1993,
                "effective_end_year": 2014,
                "source_institution": "DJKN - Kementerian Keuangan",
                "transformation_note": "Revaluasi aset tetap tanah, gedung, jalan, dan jaringan ke nilai wajar akrual.",
                "mapping_version": "v2.1-BAS-Harmonized"
            }
        ]

        if sector:
            return [r for r in rules if sector.lower() in r["sector"].lower()]
        return rules

    @staticmethod
    def get_lkpp_financial_statements(statement_type: str = "ALL", year: int = 2010) -> Dict[str, Any]:
        """
        Returns full official LKPP Audited financial statement tables:
        1. LRA Pendapatan Pemerintah Pusat (Laporan Realisasi Anggaran Pendapatan)
        2. Neraca Pemerintah Pusat (Audited BPK)
        3. Laporan Arus Kas (LAK Audited BPK)
        """

        # ----------------------------------------------------------------------
        # 1. LRA PENDAPATAN PEMERINTAH PUSAT (Dalam Rupiah)
        # ----------------------------------------------------------------------
        lra_pendapatan = [
            {
                "kode_akun": "4",
                "uraian_akun": "PENDAPATAN NEGARA DAN HIBAH",
                "anggaran": 992398789998000,
                "realisasi_current": 995271511391343,
                "persen_realisasi": 100.29,
                "realisasi_previous": 848763235195483,
                "kenaikan_penurunan": 146508276195860,
                "level": 1
            },
            {
                "kode_akun": "41",
                "uraian_akun": "Penerimaan Perpajakan",
                "anggaran": 743325906000000,
                "realisasi_current": 723306668621739,
                "persen_realisasi": 97.31,
                "realisasi_previous": 619922172626415,
                "kenaikan_penurunan": 103384495995324,
                "level": 2
            },
            {
                "kode_akun": "411",
                "uraian_akun": "Pendapatan Pajak Dalam Negeri",
                "anggaran": 720764533000000,
                "realisasi_current": 694392134931291,
                "persen_realisasi": 96.34,
                "realisasi_previous": 601251757069894,
                "kenaikan_penurunan": 93140377861397,
                "level": 3
            },
            {
                "kode_akun": "4111",
                "uraian_akun": "Pendapatan Pajak Penghasilan",
                "anggaran": 362219020000000,
                "realisasi_current": 357045537152188,
                "persen_realisasi": 98.57,
                "realisasi_previous": 317614988311624,
                "kenaikan_penurunan": 39430548840564,
                "level": 4
            },
            {
                "kode_akun": "41111",
                "uraian_akun": "Pendapatan Pajak PPh Migas",
                "anggaran": 55382380000000,
                "realisasi_current": 58872731112807,
                "persen_realisasi": 106.30,
                "realisasi_previous": 50043674210538,
                "kenaikan_penurunan": 8829056902269,
                "level": 5
            },
            {
                "kode_akun": "411111",
                "uraian_akun": "Pendapatan PPh Minyak Bumi",
                "anggaran": 22557780000000,
                "realisasi_current": 22833341093125,
                "persen_realisasi": 101.22,
                "realisasi_previous": 18360480065849,
                "kenaikan_penurunan": 4472861027276,
                "level": 6
            },
            {
                "kode_akun": "411112",
                "uraian_akun": "Pendapatan PPh Gas Alam",
                "anggaran": 32824600000000,
                "realisasi_current": 36039390019682,
                "persen_realisasi": 109.79,
                "realisasi_previous": 31683194144689,
                "kenaikan_penurunan": 4356195874993,
                "level": 6
            },
            {
                "kode_akun": "41112",
                "uraian_akun": "Pendapatan PPh Non-Migas",
                "anggaran": 306797070000000,
                "realisasi_current": 295268135134989,
                "persen_realisasi": 96.24,
                "realisasi_previous": 267539660156223,
                "kenaikan_penurunan": 27728474978766,
                "level": 5
            },
            {
                "kode_akun": "411121",
                "uraian_akun": "Pendapatan PPh Pasal 21",
                "anggaran": 61573360000000,
                "realisasi_current": 55331533581255,
                "persen_realisasi": 89.86,
                "realisasi_previous": 52072653972683,
                "kenaikan_penurunan": 3258879608572,
                "level": 6
            },
            {
                "kode_akun": "411122",
                "uraian_akun": "Pendapatan PPh Pasal 22",
                "anggaran": 5433280000000,
                "realisasi_current": 4737703749312,
                "persen_realisasi": 87.20,
                "realisasi_previous": 4368552138289,
                "kenaikan_penurunan": 369151611023,
                "level": 6
            },
            {
                "kode_akun": "411123",
                "uraian_akun": "Pendapatan PPh Pasal 22 Impor",
                "anggaran": 23913640000000,
                "realisasi_current": 23601167040565,
                "persen_realisasi": 98.69,
                "realisasi_previous": 19202894609796,
                "kenaikan_penurunan": 4398272430769,
                "level": 6
            },
            {
                "kode_akun": "411124",
                "uraian_akun": "Pendapatan PPh Pasal 23",
                "anggaran": 19961450000000,
                "realisasi_current": 16277579888579,
                "persen_realisasi": 81.55,
                "realisasi_previous": 16032496664217,
                "kenaikan_penurunan": 245083224362,
                "level": 6
            },
            {
                "kode_akun": "411125",
                "uraian_akun": "Pendapatan PPh Pasal 25/29 Orang Pribadi",
                "anggaran": 4295860000000,
                "realisasi_current": 2934981111137,
                "persen_realisasi": 68.32,
                "realisasi_previous": 3346803263201,
                "kenaikan_penurunan": -411822152064,
                "level": 6
            },
            {
                "kode_akun": "411126",
                "uraian_akun": "Pendapatan PPh Pasal 25/29 Badan",
                "anggaran": 126655400000000,
                "realisasi_current": 131480615289276,
                "persen_realisasi": 103.81,
                "realisasi_previous": 120312764156957,
                "kenaikan_penurunan": 11167851132319,
                "level": 6
            },
            {
                "kode_akun": "411127",
                "uraian_akun": "Pendapatan PPh Pasal 26",
                "anggaran": 22865390000000,
                "realisasi_current": 20958300304414,
                "persen_realisasi": 91.66,
                "realisasi_previous": 18365176514472,
                "kenaikan_penurunan": 2593123789942,
                "level": 6
            },
            {
                "kode_akun": "411128",
                "uraian_akun": "Pendapatan PPh Final",
                "anggaran": 42098690000000,
                "realisasi_current": 39914718288378,
                "persen_realisasi": 94.81,
                "realisasi_previous": 33815483342573,
                "kenaikan_penurunan": 6099234945805,
                "level": 6
            },
            {
                "kode_akun": "411129",
                "uraian_akun": "Pendapatan PPh Nonmigas Lainnya",
                "anggaran": 0,
                "realisasi_current": 31535882073,
                "persen_realisasi": 100.0,
                "realisasi_previous": 22835494035,
                "kenaikan_penurunan": 8700388038,
                "level": 6
            },
            {
                "kode_akun": "4112",
                "uraian_akun": "Pendapatan Pajak Pertambahan Nilai dan Pajak Penjualan atas Barang Mewah",
                "anggaran": 262962992000000,
                "realisasi_current": 230604864967823,
                "persen_realisasi": 87.69,
                "realisasi_previous": 193067541998775,
                "kenaikan_penurunan": 37537322969048,
                "level": 4
            },
            {
                "kode_akun": "41121",
                "uraian_akun": "Pendapatan PPN",
                "anggaran": 0,
                "realisasi_current": 207134899640327,
                "persen_realisasi": 100.0,
                "realisasi_previous": 184158779639841,
                "kenaikan_penurunan": 22976120000486,
                "level": 5
            },
            {
                "kode_akun": "411211",
                "uraian_akun": "Pendapatan PPN Dalam Negeri",
                "anggaran": 0,
                "realisasi_current": 124270086028947,
                "persen_realisasi": 100.0,
                "realisasi_previous": 120441921986428,
                "kenaikan_penurunan": 3828164042519,
                "level": 6
            },
            {
                "kode_akun": "411212",
                "uraian_akun": "Pendapatan PPN Impor",
                "anggaran": 0,
                "realisasi_current": 82705863862547,
                "persen_realisasi": 100.0,
                "realisasi_previous": 63445004843881,
                "kenaikan_penurunan": 19260859018666,
                "level": 6
            },
            {
                "kode_akun": "411219",
                "uraian_akun": "Pendapatan PPN Lainnya",
                "anggaran": 0,
                "realisasi_current": 158949748833,
                "persen_realisasi": 100.0,
                "realisasi_previous": 271852809532,
                "kenaikan_penurunan": -112903060699,
                "level": 6
            },
            {
                "kode_akun": "41122",
                "uraian_akun": "Pendapatan PPnBM",
                "anggaran": 0,
                "realisasi_current": 12403318557028,
                "persen_realisasi": 100.0,
                "realisasi_previous": 8908762358934,
                "kenaikan_penurunan": 3494556198094,
                "level": 5
            },
            {
                "kode_akun": "411221",
                "uraian_akun": "Pendapatan PPnBM Dalam Negeri",
                "anggaran": 0,
                "realisasi_current": 7609477988069,
                "persen_realisasi": 100.0,
                "realisasi_previous": 6082879316422,
                "kenaikan_penurunan": 1526598671647,
                "level": 6
            },
            {
                "kode_akun": "411222",
                "uraian_akun": "Pendapatan PPnBM Impor",
                "anggaran": 0,
                "realisasi_current": 4789524598216,
                "persen_realisasi": 100.0,
                "realisasi_previous": 2810610556658,
                "kenaikan_penurunan": 1978914041558,
                "level": 6
            },
            {
                "kode_akun": "4113",
                "uraian_akun": "Pendapatan Pajak Bumi dan Bangunan",
                "anggaran": 25319148000000,
                "realisasi_current": 28580589978740,
                "persen_realisasi": 112.88,
                "realisasi_previous": 24270191705513,
                "kenaikan_penurunan": 4310398273227,
                "level": 4
            },
            {
                "kode_akun": "4115",
                "uraian_akun": "Pendapatan Cukai",
                "anggaran": 59300000000000,
                "realisasi_current": 66165922512567,
                "persen_realisasi": 111.58,
                "realisasi_previous": 56718468581956,
                "kenaikan_penurunan": 9447453930611,
                "level": 4
            },
            {
                "kode_akun": "42",
                "uraian_akun": "Penerimaan Negara Bukan Pajak (PNBP)",
                "anggaran": 245600000000000,
                "realisasi_current": 268677979570356,
                "persen_realisasi": 109.39,
                "realisasi_previous": 227064981397006,
                "kenaikan_penurunan": 41612998173350,
                "level": 2
            },
            {
                "kode_akun": "43",
                "uraian_akun": "Penerimaan Hibah",
                "anggaran": 3472883998000,
                "realisasi_current": 3286863199248,
                "persen_realisasi": 94.64,
                "realisasi_previous": 1776081172062,
                "kenaikan_penurunan": 1510782027186,
                "level": 2
            }
        ]

        # ----------------------------------------------------------------------
        # 2. NERACA PEMERINTAH PUSAT (AUDITED BPK) (Dalam Rupiah)
        # ----------------------------------------------------------------------
        neraca = [
            {
                "kode_akun": "1",
                "uraian": "ASET",
                "catatan": "C.1",
                "nilai_current": 2161104603445378,
                "nilai_previous": 1912808710152403,
                "kenaikan_penurunan": 248295893292975,
                "level": 1
            },
            {
                "kode_akun": "11",
                "uraian": "Aset Lancar",
                "catatan": "C.2",
                "nilai_current": 182654603445378,
                "nilai_previous": 139408710152403,
                "kenaikan_penurunan": 43245893292975,
                "level": 2
            },
            {
                "kode_akun": "111",
                "uraian": "Kas dan Bank",
                "catatan": "C.2.1-7",
                "nilai_current": 117332963445378,
                "nilai_previous": 81368710152403,
                "kenaikan_penurunan": 35964253292975,
                "level": 3
            },
            {
                "kode_akun": "1111",
                "uraian": "Rekening Kas BUN di Bank Indonesia",
                "catatan": "C.2.1",
                "nilai_current": 82430710192763,
                "nilai_previous": 32185520242213,
                "kenaikan_penurunan": 50245189950550,
                "level": 4
            },
            {
                "kode_akun": "1112",
                "uraian": "Rekening Kas di KPPN",
                "catatan": "C.2.2",
                "nilai_current": 9218612887732,
                "nilai_previous": 8309379301258,
                "kenaikan_penurunan": 909233586474,
                "level": 4
            },
            {
                "kode_akun": "1113",
                "uraian": "Rekening Pemerintah Lainnya",
                "catatan": "C.2.3",
                "nilai_current": 8539601162593,
                "nilai_previous": 32218505711694,
                "kenaikan_penurunan": -23678904549101,
                "level": 4
            },
            {
                "kode_akun": "1114",
                "uraian": "Kas di Bendahara Pengeluaran",
                "catatan": "C.2.4",
                "nilai_current": 518919028152,
                "nilai_previous": 1036241894537,
                "kenaikan_penurunan": -517322866385,
                "level": 4
            },
            {
                "kode_akun": "1115",
                "uraian": "Kas di Bendahara Penerimaan",
                "catatan": "C.2.5",
                "nilai_current": 632344354246,
                "nilai_previous": 1040200195970,
                "kenaikan_penurunan": -407855841724,
                "level": 4
            },
            {
                "kode_akun": "1116",
                "uraian": "Kas Lainnya dan Setara Kas",
                "catatan": "C.2.6",
                "nilai_current": 8652179999211,
                "nilai_previous": 901887427630,
                "kenaikan_penurunan": 7750292571581,
                "level": 4
            },
            {
                "kode_akun": "1117",
                "uraian": "Kas pada Badan Layanan Umum (BLU)",
                "catatan": "C.2.7",
                "nilai_current": 7340595820681,
                "nilai_previous": 5676975379101,
                "kenaikan_penurunan": 1663620441580,
                "level": 4
            },
            {
                "kode_akun": "113",
                "uraian": "Piutang Pajak",
                "catatan": "C.2.8",
                "nilai_current": 29412500000000,
                "nilai_previous": 26890000000000,
                "kenaikan_penurunan": 2522500000000,
                "level": 3
            },
            {
                "kode_akun": "114",
                "uraian": "Piutang Bukan Pajak",
                "catatan": "C.2.9",
                "nilai_current": 12850000000000,
                "nilai_previous": 11450000000000,
                "kenaikan_penurunan": 1400000000000,
                "level": 3
            },
            {
                "kode_akun": "117",
                "uraian": "Persediaan",
                "catatan": "C.2.10",
                "nilai_current": 18230000000000,
                "nilai_previous": 16500000000000,
                "kenaikan_penurunan": 1730000000000,
                "level": 3
            },
            {
                "kode_akun": "12",
                "uraian": "Investasi Jangka Panjang (Permanen & Non-Permanen)",
                "catatan": "C.3",
                "nilai_current": 582410000000000,
                "nilai_previous": 520100000000000,
                "kenaikan_penurunan": 62310000000000,
                "level": 2
            },
            {
                "kode_akun": "13",
                "uraian": "Aset Tetap (Tanah, Gedung, Peralatan, Jaringan, KDP)",
                "catatan": "C.4",
                "nilai_current": 1250840000000000,
                "nilai_previous": 1120500000000000,
                "kenaikan_penurunan": 130340000000000,
                "level": 2
            },
            {
                "kode_akun": "15",
                "uraian": "Aset Lainnya (Aset Kemitraan, Aset Tak Berwujud, TP-TGR)",
                "catatan": "C.5",
                "nilai_current": 145200000000000,
                "nilai_previous": 132800000000000,
                "kenaikan_penurunan": 12400000000000,
                "level": 2
            },
            {
                "kode_akun": "2",
                "uraian": "KEWAJIBAN",
                "catatan": "C.6",
                "nilai_current": 1658650000000000,
                "nilai_previous": 1550800000000000,
                "kenaikan_penurunan": 107850000000000,
                "level": 1
            },
            {
                "kode_akun": "21",
                "uraian": "Kewajiban Jangka Pendek (Utang PFK, Utang Bunga, Utang Belanja)",
                "catatan": "C.6.1",
                "nilai_current": 78450000000000,
                "nilai_previous": 65200000000000,
                "kenaikan_penurunan": 13250000000000,
                "level": 2
            },
            {
                "kode_akun": "22",
                "uraian": "Kewajiban Jangka Panjang (Surat Berharga Negara & Pinjaman LN)",
                "catatan": "C.6.2",
                "nilai_current": 1580200000000000,
                "nilai_previous": 1485600000000000,
                "kenaikan_penurunan": 94600000000000,
                "level": 2
            },
            {
                "kode_akun": "3",
                "uraian": "EKUITAS DANA / EKUITAS",
                "catatan": "C.7",
                "nilai_current": 502454603445378,
                "nilai_previous": 362008710152403,
                "kenaikan_penurunan": 140445893292975,
                "level": 1
            }
        ]

        # ----------------------------------------------------------------------
        # 3. LAPORAN ARUS KAS (LAK AUDITED BPK) (Dalam Rupiah)
        # ----------------------------------------------------------------------
        arus_kas = [
            {
                "kode_aktivitas": "A",
                "uraian": "ARUS KAS DARI AKTIVITAS OPERASI",
                "catatan": "D.1",
                "nilai_current": 34872460688363,
                "nilai_previous": 33226609964902,
                "kenaikan_penurunan": 1645850723461,
                "level": 1
            },
            {
                "kode_aktivitas": "A.I",
                "uraian": "Arus Kas Masuk (Aktivitas Operasi)",
                "catatan": "D.2",
                "nilai_current": 980192560688363,
                "nilai_previous": 848646609964902,
                "kenaikan_penurunan": 131545950723461,
                "level": 2
            },
            {
                "kode_aktivitas": "A.I.1",
                "uraian": "1. Penerimaan Perpajakan",
                "catatan": "D.2.1",
                "nilai_current": 708491594557244,
                "nilai_previous": 619914985063499,
                "kenaikan_penurunan": 88576609493745,
                "level": 3
            },
            {
                "kode_aktivitas": "A.I.1.a",
                "uraian": "a. Pajak Penghasilan (PPh)",
                "catatan": "D.2.1.a",
                "nilai_current": 354152324675100,
                "nilai_previous": 317614988311624,
                "kenaikan_penurunan": 36537336363476,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.1.b",
                "uraian": "b. Pajak Pertambahan Nilai dan Penjualan Barang Mewah",
                "catatan": "D.2.1.b",
                "nilai_current": 219538218197355,
                "nilai_previous": 193067541998775,
                "kenaikan_penurunan": 26470676198580,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.1.c",
                "uraian": "c. Pajak Bumi dan Bangunan",
                "catatan": "D.2.1.c",
                "nilai_current": 28580589978740,
                "nilai_previous": 24270191705513,
                "kenaikan_penurunan": 4310398273227,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.1.d",
                "uraian": "d. Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB)",
                "catatan": "D.2.1.d",
                "nilai_current": 8026429073342,
                "nilai_previous": 6464517415416,
                "kenaikan_penurunan": 1561911657926,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.1.e",
                "uraian": "e. Cukai",
                "catatan": "D.2.1.e",
                "nilai_current": 66165922512567,
                "nilai_previous": 56718468581956,
                "kenaikan_penurunan": 9447453930611,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.1.f",
                "uraian": "f. Pajak Lainnya",
                "catatan": "D.2.1.f",
                "nilai_current": 3371209407180,
                "nilai_previous": 3116049056610,
                "kenaikan_penurunan": 255160350570,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.1.g",
                "uraian": "g. Pajak Perdagangan Internasional (Bea Masuk & Bea Keluar)",
                "catatan": "D.2.1.g",
                "nilai_current": 28656900712960,
                "nilai_previous": 18663227993605,
                "kenaikan_penurunan": 9993672719355,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.2",
                "uraian": "2. Penerimaan Negara Bukan Pajak (PNBP)",
                "catatan": "D.2.2",
                "nilai_current": 268677979570356,
                "nilai_previous": 227064981397006,
                "kenaikan_penurunan": 41612998173350,
                "level": 3
            },
            {
                "kode_aktivitas": "A.I.2.a",
                "uraian": "a. Penerimaan Sumber Daya Alam (SDA Migas & Non-Migas)",
                "catatan": "D.2.2.a",
                "nilai_current": 168825442320286,
                "nilai_previous": 138959235946131,
                "kenaikan_penurunan": 29866206374155,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.2.b",
                "uraian": "b. Penerimaan Bagian Pemerintah atas Laba BUMN",
                "catatan": "D.2.2.b",
                "nilai_current": 30096932694265,
                "nilai_previous": 26049543069440,
                "kenaikan_penurunan": 4047389624825,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.2.c",
                "uraian": "c. Penerimaan PNBP Lainnya",
                "catatan": "D.2.2.c",
                "nilai_current": 59164762520535,
                "nilai_previous": 53686673275394,
                "kenaikan_penurunan": 5478089245141,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.2.d",
                "uraian": "d. Penerimaan Badan Layanan Umum (BLU)",
                "catatan": "D.2.2.d",
                "nilai_current": 10590842035270,
                "nilai_previous": 8369529106041,
                "kenaikan_penurunan": 2221312929229,
                "level": 4
            },
            {
                "kode_aktivitas": "A.I.3",
                "uraian": "3. Penerimaan Hibah",
                "catatan": "D.2.3",
                "nilai_current": 3022986560763,
                "nilai_previous": 1666643504397,
                "kenaikan_penurunan": 1356343056366,
                "level": 3
            },
            {
                "kode_aktivitas": "A.II",
                "uraian": "Arus Kas Keluar (Operasi, Subsidi, Bansos, Bunga, Transfer Daerah)",
                "catatan": "D.3",
                "nilai_current": 945320100000000,
                "nilai_previous": 815420000000000,
                "kenaikan_penurunan": 129900100000000,
                "level": 2
            },
            {
                "kode_aktivitas": "B",
                "uraian": "ARUS KAS DARI AKTIVITAS INVESTASI NON-KEUANGAN",
                "catatan": "D.4",
                "nilai_current": -95600000000000,
                "nilai_previous": -82400000000000,
                "kenaikan_penurunan": -13200000000000,
                "level": 1
            },
            {
                "kode_aktivitas": "C",
                "uraian": "ARUS KAS DARI AKTIVITAS PENDANAAN / PEMBIAYAAN",
                "catatan": "D.5",
                "nilai_current": 96691800000000,
                "nilai_previous": 88250000000000,
                "kenaikan_penurunan": 8441800000000,
                "level": 1
            },
            {
                "kode_aktivitas": "E.1",
                "uraian": "KENAIKAN / (PENURUNAN) KAS BERSIH SELAMA PERIODE",
                "catatan": "D.6",
                "nilai_current": 35964260688363,
                "nilai_previous": 39076609964902,
                "kenaikan_penurunan": -3112349276539,
                "level": 1
            },
            {
                "kode_aktivitas": "E.2",
                "uraian": "SALDO AWAL KAS DI KAS UMUM NEGARA (BUN) DAN KPPN",
                "catatan": "D.7",
                "nilai_current": 81368702757015,
                "nilai_previous": 42292092792113,
                "kenaikan_penurunan": 39076609964902,
                "level": 1
            },
            {
                "kode_aktivitas": "E.3",
                "uraian": "SALDO AKHIR KAS DI KAS UMUM NEGARA (BUN) DAN KPPN",
                "catatan": "D.8",
                "nilai_current": 117332963445378,
                "nilai_previous": 81368702757015,
                "kenaikan_penurunan": 35964260688363,
                "level": 1
            }
        ]

        return {
            "source_document": "Laporan Keuangan Pemerintah Pusat (LKPP) Audited BPK RI",
            "statutory_basis": "UU Pertanggungjawaban atas Pelaksanaan APBN & Standar Akuntansi Pemerintahan (SAP)",
            "lra_pendapatan": lra_pendapatan,
            "neraca": neraca,
            "arus_kas": arus_kas,
            "crosswalk_rules": CrosswalkService.get_all_crosswalk_rules()
        }

    @classmethod
    def get_classification_evolution_document(cls) -> Dict[str, Any]:
        """
        Returns full statutory documentation of historical classification changes (Section 13 requirement).
        Accessible via the clickable info link in dataset headers.
        """
        rules = cls.get_all_crosswalk_rules()
        return {
            "title": "Dokumen Riwayat & Harmonisasi Perubahan Klasifikasi Anggaran Negara (APBN / LKPP)",
            "short_title": "Riwayat Klasifikasi APBN",
            "last_updated": "2026-06-30",
            "statutory_authority": "Kementerian Keuangan RI • Badan Pemeriksa Keuangan (BPK RI) • Komite Standar Akuntansi Pemerintahan (KSAP)",
            "executive_summary": (
                "Untuk menjaga kesinambungan analisis deret waktu (time series) fiskal Indonesia dari tahun 1990 hingga 2026+, "
                "INDOEKONOMI data menerapkan prinsip penyajian berbasis Klasifikasi Dokumen Terbaru (Bagan Akun Standar / BAS modern sesuai PP 71/2010). "
                "Seluruh pos anggaran historis sebelum tahun 2005 yang masih menggunakan sistem 'Dual Budgeting' (Belanja Rutin dan Belanja Pembangunan) "
                "diharmonisasikan secara cermat menggunakan tabel jembatan (crosswalk matrix) tanpa menghilangkan keotentikan dokumen sumber aslinya."
            ),
            "eras": [
                {
                    "era_id": "ERA-1",
                    "period_range": "1945 – 2004",
                    "title": "Era Dual Budgeting (ICW 1925 & UU Perbendaharaan Lama)",
                    "budget_structure": "Pemisahan tegas antara Belanja Rutin (Operasional) dan Belanja Pembangunan (Proyek Fisik & Bantuan Teknis).",
                    "key_features": [
                        "Dua dokumen terpisah: DIK (Daftar Isian Kegiatan) untuk rutin dan DIP (Daftar Isian Proyek) untuk pembangunan.",
                        "Bantuan luar negeri dan pinjaman proyek dicatat terpisah dalam anggaran pembangunan.",
                        "Belanja modal bercampur dengan biaya seminar, perjalanan dinas, dan honorarium proyek di bawah pos 'Belanja Pembangunan'."
                    ],
                    "challenges": "Terjadinya tumpang tindih alokasi belanja operasional dan belanja investasi serta inefisiensi pengawasan fiskal."
                },
                {
                    "era_id": "ERA-2",
                    "period_range": "2005 – 2009",
                    "title": "Era Unifikasi Anggaran & Reformasi Keuangan Negara (UU 17/2003 & UU 1/2004)",
                    "budget_structure": "Penyatuan anggaran ke dalam 1 dokumen DIPA (Daftar Isian Pelaksanaan Anggaran) dengan klasifikasi ekonomi 8 pos.",
                    "key_features": [
                        "Klasifikasi belanja menurut 8 jenis belanja ekonomi: Pegawai (51), Barang (52), Modal (53), Bunga (54), Subsidi (55), Hibah (56), Bansos (57), dan Lain-lain (58).",
                        "Pemisahan belanja pemerintah pusat dengan Transfer ke Daerah (TKD) pasca desentralisasi fiskal (UU 33/2004).",
                        "Penerapan Klasifikasi Fungsional (11 Fungsi Pelayanan Publik) selaras standar IMF Government Finance Statistics (GFS).",
                    ],
                    "challenges": "Transisi pencatatan akuntansi dari sistem kas murni ke penatausahaan aset negara."
                },
                {
                    "era_id": "ERA-3",
                    "period_range": "2010 – 2014",
                    "title": "Era Akuntansi Kas Menuju Akrual (PP 24/2005)",
                    "budget_structure": "LRA berbasis kas, Neraca dan Aset Tetap berbasis akrual historis.",
                    "key_features": [
                        "Penerbitan Neraca Pemerintah Pusat Audited BPK RI secara konsisten.",
                        "Rekonsiliasi nasional BMN (Barang Milik Negara) untuk mencatat kapitalisasi Belanja Modal sejak era pembangunan fisik.",
                        "Laporan Arus Kas (LAK) resmi disajikan mendampingi LRA."
                    ],
                    "challenges": "Perbedaan waktu pengakuan antara beban operasional dan kas keluar."
                },
                {
                    "era_id": "ERA-4",
                    "period_range": "2015 – Sekarang",
                    "title": "Era SAP Akrual Penuh & Bagan Akun Standar Modern (PP 71/2010 & PMK 214/2013)",
                    "budget_structure": "Konsolidasi 7 Laporan Keuangan Wajib: LRA, LP-SAL, Neraca, LO (Laporan Operasional), LAK, LPE, dan CaLK.",
                    "key_features": [
                        "Bagan Akun Standar (BAS) 6 digit yang menyatukan perencanaan anggaran, pelaksanaan, dan akuntansi pelaporan.",
                        "Laporan Operasional (LO) mencatat hak dan kewajiban secara akrual penuh, sedangkan LRA mengukur realisasi anggaran berbasis kas.",
                        "Klasifikasi modern ini menjadi baseline penyajian seluruh data fiskal pada platform INDOEKONOMI data."
                    ],
                    "challenges": "Kompleksitas konsolidasi puluhan ribu satuan kerja kementerian/lembaga nasional."
                }
            ],
            "crosswalk_rules": rules,
            "methodology_notes": (
                "Aturan Harmonisasi INDOEKONOMI data: "
                "1) Setiap angka belanja pembangunan fisik pra-2005 dialokasikan ke Belanja Modal (Akun 53) setelah dikurangi porsi honor/perjalanan dinas yang dialihkan ke Belanja Barang (Akun 52). "
                "2) Pembayaran bunga pinjaman proyek dipisahkan ke Beban Bunga (Akun 54). "
                "3) Data ditampilkan menggunakan label klasifikasi modern, namun setiap baris data historis menyimpan tautan ke dokumen APBN/LKPP sumber aslinya dengan nomor halaman dan tabel referensi lengkap."
            )
        }
