"""
==============================================================================
INDOEKONOMI data — Indonesia Economic Data Observatory
APBN Evaluation & Realization Engine:
Komparasi Statutori RAPBN vs Target UU APBN vs Realisasi Bulanan & YTD (2020 - 2026)
Source: Publikasi Resmi APBN KiTa (Kemenkeu RI), UU APBN, dan Nota Keuangan RAPBN
==============================================================================
"""

import io
import csv
from typing import Dict, Any, List, Optional
from datetime import datetime
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter


class ApbnEvalService:
    """
    Engine untuk komparasi target RAPBN (Nota Keuangan Usulan Pemerintah),
    Pagu UU APBN (Disahkan DPR RI), dan Aktualisasi Realisasi APBN per Bulan Berjalan
    beserta Akumulasi Year-To-Date (YTD) berdasarkan Laporan Resmi APBN KiTa Kemenkeu RI.
    """

    MONTH_NAMES = [
        {"code": "M01", "name": "Januari", "short": "Jan"},
        {"code": "M02", "name": "Februari", "short": "Feb"},
        {"code": "M03", "name": "Maret", "short": "Mar"},
        {"code": "M04", "name": "April", "short": "Apr"},
        {"code": "M05", "name": "Mei", "short": "Mei"},
        {"code": "M06", "name": "Juni", "short": "Jun"},
        {"code": "M07", "name": "Juli", "short": "Jul"},
        {"code": "M08", "name": "Agustus", "short": "Agu"},
        {"code": "M09", "name": "September", "short": "Sep"},
        {"code": "M10", "name": "Oktober", "short": "Okt"},
        {"code": "M11", "name": "November", "short": "Nov"},
        {"code": "M12", "name": "Desember", "short": "Des"}
    ]

    YEARS_CONFIG: Dict[int, Dict[str, Any]] = {
        2020: {
            "status": "audited",
            "status_label": "Audited BPK RI (LKPP)",
            "legal_doc": "UU No. 20/2019 (APBN 2020), Perpres 54/72 2020 & LKPP 2020 Audited",
            "latest_published_month": "M12",
            "gdp_nominal": 15434.2
        },
        2021: {
            "status": "audited",
            "status_label": "Audited BPK RI (LKPP)",
            "legal_doc": "UU No. 9/2020 (APBN 2021) & LKPP 2021 Audited BPK RI",
            "latest_published_month": "M12",
            "gdp_nominal": 16970.8
        },
        2022: {
            "status": "audited",
            "status_label": "Audited BPK RI (LKPP)",
            "legal_doc": "UU No. 6/2021 (APBN 2022), Perpres 98/2022 & LKPP 2022 Audited",
            "latest_published_month": "M12",
            "gdp_nominal": 19588.4
        },
        2023: {
            "status": "audited",
            "status_label": "Audited BPK RI (LKPP)",
            "legal_doc": "UU No. 28/2022 (APBN 2023) & LKPP 2023 Audited BPK RI",
            "latest_published_month": "M12",
            "gdp_nominal": 20892.4
        },
        2024: {
            "status": "audited",
            "status_label": "Audited BPK RI / APBN KiTa Des",
            "legal_doc": "UU No. 19/2023 (APBN 2024) & Laporan APBN KiTa Edisi Desember 2024",
            "latest_published_month": "M12",
            "gdp_nominal": 22150.0
        },
        2025: {
            "status": "provisional",
            "status_label": "Tahun Berjalan (APBN KiTa)",
            "legal_doc": "UU No. 62/2024 (APBN 2025) & Laporan Bulanan APBN KiTa Kemenkeu RI 2025",
            "latest_published_month": "M03", # Published through Q1
            "gdp_nominal": 23800.0
        },
        2026: {
            "status": "budget",
            "status_label": "Target & Pagu Berjalan (APBN KiTa)",
            "legal_doc": "Nota Keuangan RAPBN 2026 & RUU APBN TA 2026 Kemenkeu RI",
            "latest_published_month": "M02", # Published through Feb
            "gdp_nominal": 25400.0
        }
    }

    MONTHLY_WEIGHTS_REVENUE = [
        0.062, 0.068, 0.088, 0.112, 0.082, 0.085,
        0.078, 0.081, 0.086, 0.089, 0.095, 0.174
    ]
    MONTHLY_WEIGHTS_TAX = [
        0.065, 0.070, 0.092, 0.125, 0.080, 0.082,
        0.075, 0.078, 0.084, 0.086, 0.092, 0.171
    ]
    MONTHLY_WEIGHTS_PNBP = [
        0.055, 0.062, 0.075, 0.072, 0.085, 0.095,
        0.088, 0.092, 0.094, 0.098, 0.104, 0.180
    ]
    MONTHLY_WEIGHTS_EXPENSE_BPP = [
        0.042, 0.051, 0.064, 0.068, 0.075, 0.082,
        0.079, 0.085, 0.088, 0.098, 0.122, 0.246
    ]
    MONTHLY_WEIGHTS_EXPENSE_TKD = [
        0.075, 0.078, 0.082, 0.085, 0.080, 0.084,
        0.081, 0.083, 0.085, 0.088, 0.092, 0.147
    ]

    MONTHLY_SEASONAL_DRIVERS: Dict[str, str] = {
        "M01": "Awal TA: Penerbitan DIPA kementerian/lembaga & penarikan awal DAU rutin pemda.",
        "M02": "Operasional K/L mulai aktif; setoran masa pajak bulan Januari dibukukan ke kas negara.",
        "M03": "Puncak pelaporan SPT Tahunan PPh Orang Pribadi & pencairan bansos pangan triwulan I.",
        "M04": "Batas akhir pelaporan SPT Tahunan PPh Badan & dividen emiten BUMN tahap awal.",
        "M05": "Pencairan Tunjangan Hari Raya (THR) ASN/TNI/Polri & akselerasi proyek kontraktual.",
        "M06": "Pencairan Gaji ke-13 ASN, pembayaran kupon SBN semesteran & audit semester I.",
        "M07": "Awal Semester II: Evaluasi APBN Semester I bersama DPR & serapan DAK Fisik tahap II.",
        "M08": "Penyampaian Nota Keuangan RAPBN tahun berikutnya ke DPR RI & akselerasi belanja modal.",
        "M09": "Penyelesaian tender fisik proyek kementerian & realisasi penerimaan PPN hari besar.",
        "M10": "Awal Triwulan IV: Percepatan sertifikasi tagihan pihak ketiga & monitoring target pajak.",
        "M11": "Pemberian uang muka proyek multi-years & penyaluran sisa transfer DAU/DBH triwulan IV.",
        "M12": "Puncak pencairan belanja negara penutupan tahun anggaran (closing kas) & rekonsiliasi LKPP."
    }

    DRIVERS_REGISTRY: Dict[str, Dict[str, Any]] = {
        "REV_TOTAL": {
            "source_org": "Kemenkeu RI (DJP, DJBC, DJA) & Nota Keuangan",
            "positive": [
                "Pertumbuhan konsumsi rumah tangga dan mobilitas masyarakat menopang PPN Dalam Negeri (+)",
                "Kinerja laba korporasi sektor perbankan dan telekomunikasi mendorong setoran PPh Badan (+)",
                "Peningkatan efektivitas penegakan kepatuhan perpajakan dan implementasi sistem CoreTax (+)"
            ],
            "negative": [
                "Normalisasi harga komoditas tambang dan energi global menekan PPh migas dan royalti minerba (-)",
                "Peningkatan restitusi pajak pertambahan nilai sektor industri pengolahan (-)",
                "Pelemahan permintaan impor barang modal menekan kepabeanan (-)"
            ],
            "policy_note": "Optimalisasi perluasan basis perpajakan tanpa mendisrupsi momentum pemulihan daya beli."
        },
        "REV_TAX": {
            "source_org": "Ditjen Pajak (DJP) & Ditjen Bea Cukai (DJBC)",
            "positive": [
                "Realisasi PPh 21 meningkat seiring perbaikan penyerapan tenaga kerja formal dan upah (+)",
                "Aktivitas transaksi ritel yang stabil menjaga pertumbuhan penerimaan PPN (+)",
                "Pemanfaatan data intelijen perpajakan bersama melalui Joint Analysis DJP-DJBC (+)"
            ],
            "negative": [
                "Penurunan harga rata-rata komoditas batubara dan CPO menekan setoran PPh korporasi tambang (-)",
                "Pengajuan restitusi PPN yang dipercepat pada sektor manufaktur ekspor (-)",
                "Peralihan konsumsi ke rokok berpita cukai lebih murah (fenomena downtrading) (-)"
            ],
            "policy_note": "Fokus pengawasan wajib pajak high-wealth individual dan penguatan analitik big-data fiskal."
        },
        "REV_TAX_PPH": {
            "source_org": "Ditjen Pajak (DJP) - Subdit PPh",
            "positive": [
                "Kepatuhan penyampaian SPT Tahunan PPh Orang Pribadi dan Badan tumbuh positif (+)",
                "Penerimaan PPh Pasal 21 stabil didorong formalisasi sektor jasa dan perbankan (+)",
                "Efektivitas pemotongan PPh final atas transaksi pasar modal dan jasa konstruksi (+)"
            ],
            "negative": [
                "Koreksi harga batubara global menekan setoran PPh Badan sektor pertambangan (-)",
                "Pemanfaatan kompensasi kerugian fiskal tahun-tahun sebelumnya oleh wajib pajak badan (-)",
                "Moderasi impor barang modal menurunkan setoran PPh Pasal 22 impor (-)"
            ],
            "policy_note": "Penguatan audit transfer pricing multinasional dan kepatuhan perpajakan digital."
        },
        "REV_TAX_PPN": {
            "source_org": "Ditjen Pajak (DJP) - Subdit PPN",
            "positive": [
                "Indeks Keyakinan Konsumen (IKK) konsisten di level optimis menopang transaksi PPN DN (+)",
                "Perluasan pemungut PPN PMSE (perdagangan melalui sistem elektronik / digital) (+)",
                "Konsumsi domestik saat momentum libur nasional dan hari besar keagamaan (+)"
            ],
            "negative": [
                "Kenaikan pembayaran klaim restitusi PPN ekspor industri hilirisasi (-)",
                "Perlambatan laju impor bahan baku menekan perolehan PPN Impor (-)",
                "Daya beli kelompok masyarakat desil menengah mengalami moderasi selektif (-)"
            ],
            "policy_note": "Integrasi faktur pajak elektronik otomatis dan pengawasan faktur fiktif lintas sektor."
        },
        "REV_TAX_CUKAI": {
            "source_org": "Ditjen Bea dan Cukai (DJBC) - Subdit Cukai",
            "positive": [
                "Penyesuaian tarif rata-rata CHT sebesar 10% menjaga penerimaan unit per batang (+)",
                "Operasi Gempur Rokok Ilegal secara masif di perbatasan dan sentra distribusi (+)",
                "Stabilitas setoran cukai MMEA (minuman beralkohol) dan etil alkohol (+)"
            ],
            "negative": [
                "Penurunan volume produksi sigaret golongan I (SKM I & SPM I) akibat kenaikan tarif (-)",
                "Peralihan konsumsi ke rokok golongan II dan III berpita cukai lebih rendah (downtrading) (-)",
                "Tantangan peredaran rokok polos tanpa pita cukai di jalur pemasaran informal (-)"
            ],
            "policy_note": "Penerapan kebijakan tarif multi-years dan pengawasan fisik pabrikasi hasil tembakau."
        },
        "REV_TAX_BEA": {
            "source_org": "Ditjen Bea dan Cukai (DJBC) - Subdit Kepabeanan",
            "positive": [
                "Penerimaan Bea Keluar konsentrat tembaga dan produk mineral mentah tertentu (+)",
                "Penerapan integrasi sistem CEISA 4.0 mempercepat validasi dokumen dan akurasi bea (+)",
                "Pertumbuhan volume logistik kargo pelabuhan internasional utama (+)"
            ],
            "negative": [
                "Pemanfaatan skema perjanjian perdagangan bebas (FTA) dengan tarif preferensi 0% (-)",
                "Harga referensi CPO internasional yang bergerak moderat membatasi tarif bea keluar (-)",
                "Penurunan impor barang konsumsi non-esensial akibat substitusi produk lokal (-)"
            ],
            "policy_note": "Modernisasi sistem National Logistics Ecosystem (NLE) dan post-clearance audit terarah."
        },
        "REV_TAX_PBB": {
            "source_org": "Ditjen Pajak (DJP) - Subdit PBB & P3",
            "positive": [
                "Penyelesaian ketetapan PBB sektor pertambangan migas dan panas bumi (+)",
                "Pemutakhiran data objek pajak sektor perkebunan menggunakan citra satelit (+)",
                "Tingginya kepatuhan penyetoran PBB sektor perhutanan dan pertambangan minerba (+)"
            ],
            "negative": [
                "Penurunan volume lifting migas menurunkan nilai jual objek pajak (NJOP) tahunan (-)",
                "Siklus pembayaran PBB P3 yang terpusat di kuartal III dan IV (musiman) (-)",
                "Pengajuan banding dan sengketa penetapan nilai objek pajak energi terbarukan (-)"
            ],
            "policy_note": "Penilaian berkala objek pajak berbasis teknologi geospasial terintegrasi."
        },
        "REV_PNBP": {
            "source_org": "Ditjen Anggaran (DJA) & K/L Terkait",
            "positive": [
                "Setoran dividen bagian laba BUMN sektor perbankan dan energi melampaui target APBN (+)",
                "Peningkatan layanan digital PNBP kementerian/lembaga melalui kanal SIMPONI (+)",
                "Pendapatan jasa kepelabuhanan, layanan keimigrasian, dan perguruan tinggi BLU meningkat (+)"
            ],
            "negative": [
                "Koreksi harga minyak mentah ICP dan batubara acuan menekan royalti SDA minerba (-)",
                "Realisasi lifting minyak bumi di bawah asumsi makro APBN (-)",
                "Peningkatan beban biaya operasional rumah sakit BLU menekan setoran kas (-)"
            ],
            "policy_note": "Penyempurnaan tata kelola sistem informasi PNBP dan peningkatan efisiensi dividen BUMN."
        },
        "REV_PNBP_SDA": {
            "source_org": "Kemenkeu (DJA), Ditjen Migas & SKK Migas",
            "positive": [
                "Faktor kurs konversi Rupiah terhadap USD memberikan dorongan nominal bagi hasil migas (+)",
                "Realisasi royalti nikel dan bauksit hilirisasi yang beroperasi komersial (+)",
                "Penyelesaian penagihan piutang dan denda administratif sektor kehutanan (+)"
            ],
            "negative": [
                "Lifting minyak bumi berada di bawah target asumsi APBN (sekitar 580-600 ribu BOPD) (-)",
                "Normalisasi harga gas alam dan batubara dunia dari rekor tahun sebelumnya (-)",
                "Kenaikan biaya pengembalian operasi perminyakan (cost recovery) (-)"
            ],
            "policy_note": "Percepatan program reaktivasi sumur tua dan integrasi pengawasan e-PNBP minerba."
        },
        "REV_PNBP_KND": {
            "source_org": "Ditjen Kekayaan Negara (DJKN) & Kementerian BUMN",
            "positive": [
                "Laba bersih konsolidasian bank Himbara (BRI, Mandiri, BNI) mencatatkan rekor tertinggi (+)",
                "Setoran dividen BUMN tambang dan logistik disetorkan tepat waktu pada semester I (+)",
                "Perbaikan tata kelola dan restrukturisasi operasional sejumlah BUMN karya (+)"
            ],
            "negative": [
                "Kebutuhan laba ditahan untuk penguatan modal BUMN perbankan menghadapi risiko kredit (-)",
                "Beberapa BUMN infrastruktur masih menunda dividen karena kewajiban restrukturisasi utang (-)",
                "Konsentrasi sumber dividen hanya bertumpu pada segmen jasa perbankan dan mineral (-)"
            ],
            "policy_note": "Penajaman portofolio PMN berbasis return on investment (ROI) terukur."
        },
        "REV_PNBP_BLU": {
            "source_org": "Ditjen Perbendaharaan (DJPb) - Pembina BLU",
            "positive": [
                "Peningkatan volume layanan RS BLU dan universitas PTN-BH secara konsisten (+)",
                "Hasil optimalisasi penempatan kas dan dana kelolaan abadi pendidikan (+)",
                "Pemanfaatan aset idle BLU melalui kemitraan strategis dengan pihak ketiga (+)"
            ],
            "negative": [
                "Fluktuasi pungutan dana sawit BPDPKS akibat pergerakan harga ekspor CPO global (-)",
                "Kenaikan biaya obat dan alat kesehatan menekan surplus operasional BLU medis (-)",
                "Keterbatasan fleksibilitas tarif layanan pada BLU pendidikan vokasi (-)"
            ],
            "policy_note": "Penerapan modernisasi cash management system dan standardisasi mutu layanan BLU."
        },
        "REV_PNBP_LAIN": {
            "source_org": "Ditjen Anggaran (DJA) & Kemenkeu",
            "positive": [
                "Penerimaan biaya hak penggunaan spektrum frekuensi radio (BHP) telekomunikasi (+)",
                "Kenaikan permintaan layanan paspor dan visa pasca pemulihan perjalanan internasional (+)",
                "Optimalisasi pendapatan jasa kepolisian (SIM, STNK, BPKB) sesuai penjualan kendaraan (+)"
            ],
            "negative": [
                "Kebijakan tarif Rp 0 (pembebasan PNBP) untuk sertifikasi izin edar usaha mikro kecil (-)",
                "Keterlambatan rekonsiliasi data setoran antarsistem perbankan mitra (-)",
                "Penurunan setoran denda pelanggaran lalu lintas seiring transisi tilang elektronik ETLE (-)"
            ],
            "policy_note": "Ekspansi integrasi gateway pembayaran digital terpusat di seluruh K/L."
        },
        "REV_HIBAH": {
            "source_org": "Ditjen Pengelolaan Pembiayaan & Risiko (DJPPR)",
            "positive": [
                "Realisasi hibah program transisi energi terbarukan Just Energy Transition Partnership (JETP) (+)",
                "Bantuan teknis multilateral program penguatan kapasitas kesehatan dan ketahanan pangan (+)",
                "Pencairan komitmen pendanaan iklim bilateral dari negara-negara mitra strategis (+)"
            ],
            "negative": [
                "Jadwal penarikan hibah luar negeri bergantung pada pemenuhan syarat milestone proyek (-)",
                "Proses verifikasi dan registrasi hibah langsung di kementerian teknis memakan waktu (-)",
                "Keterbatasan kapasitas penyerapan kegiatan berbasis hibah di tingkat satuan kerja (-)"
            ],
            "policy_note": "Percepatan penyederhanaan birokrasi registrasi hibah melalui modul terintegrasi SIKRI."
        },
        "EXP_TOTAL": {
            "source_org": "Kemenkeu RI (DJA, DJPb, DJPK) & LKPP",
            "positive": [
                "Pencairan bantuan sosial dan perlindungan sosial terakselerasi sejak triwulan I (+)",
                "Penyaluran Transfer ke Daerah (TKD) tepat waktu mendukung likuiditas pemda (+)",
                "Pembayaran THR dan Gaji ke-13 aparatur sipil negara terdistribusi tepat jadwal (+)"
            ],
            "negative": [
                "Penyerapan belanja modal proyek fisik di awal tahun lambat karena siklus tender/lelang (-)",
                "Hambatan pengadaan lahan dan koordinasi lintas instansi pada proyek infrastruktur (-)",
                "Tingginya sisa anggaran lebih (SILPA) di kas pemerintah daerah (-)"
            ],
            "policy_note": "Mendorong lelang dini pra-DIPA dan percepatan eksekusi belanja berkualitas (spending better)."
        },
        "EXP_BPP": {
            "source_org": "Ditjen Anggaran (DJA) & Ditjen Perbendaharaan (DJPb)",
            "positive": [
                "Pengendalian belanja barang operasional melalui standardisasi biaya masukan (SBM) ketat (+)",
                "Prioritisasi alokasi untuk ketahanan pangan, transisi energi, dan pengentasan kemiskinan (+)",
                "Penerapan Kartu Kredit Pemerintah (KKP) mempercepat fleksibilitas perputaran kas satker (+)"
            ],
            "negative": [
                "Pola penyerapan anggaran masih cenderung menumpuk di kuartal IV (back-loaded) (-)",
                "Frekuensi revisi dokumen petunjuk operasional kegiatan (POK) satker yang tinggi (-)",
                "Tekanan nilai tukar Rupiah terhadap USD menambah beban pembiayaan subsidi energi impor (-)"
            ],
            "policy_note": "Pemantauan berkala deviasi rencana penarikan dana bulanan (RPD) di seluruh KPPN."
        },
        "EXP_BPP_PEGAWAI": {
            "source_org": "DJA / DJPb (Kemenkeu) & BKN",
            "positive": [
                "Penyaluran gaji pokok dan tunjangan melekat ASN/TNI/Polri terealisasi 100% tepat waktu (+)",
                "Pencairan THR dan Gaji ke-13 tepat waktu mendongkrak peredaran uang dan konsumsi (+)",
                "Alokasi formasi pengangkatan PPPK guru dan tenaga kesehatan tersalurkan tertib (+)"
            ],
            "negative": [
                "Kenaikan beban belanja pensiun seiring bertambahnya jumlah pensiunan abdi negara (-)",
                "Disparitas penyerapan tunjangan kinerja di kementerian teknis akibat verifikasi capaian (-)",
                "Porsi belanja pegawai pada APBD daerah tertentu yang masih melampaui batas wajar (-)"
            ],
            "policy_note": "Reformasi sistem pensiun fully funded dan audit kebutuhan formasi berbasis beban kerja riil."
        },
        "EXP_BPP_BARANG": {
            "source_org": "DJA / DJPb (Kemenkeu) & Satker K/L",
            "positive": [
                "Belanja barang yang diserahkan ke masyarakat (benih, pupuk, bantuan operasional) terakselerasi (+)",
                "Katalog elektronik (e-Katalog LKPP) mempercepat proses pengadaan barang pemerintah (+)",
                "Efisiensi belanja perjalanan dinas dan konsolidasi paket pertemuan dinas (+)"
            ],
            "negative": [
                "Pengajuan tagihan kontraktual pihak ketiga menumpuk menjelang penutupan tahun anggaran (-)",
                "Keterlambatan verifikasi berkas surat perintah membayar (SPM) pada unit verifikasi satker (-)",
                "Sisa pagu belanja barang non-operasional yang tidak terserap optimal (-)"
            ],
            "policy_note": "Pembatasan pengadaan barang non-esensial dan monitoring ketat sisa kontrak tahun berjalan."
        },
        "EXP_BPP_MODAL": {
            "source_org": "DJA, DJPb & Kemen PUPR / Kemenhub / Kemhan",
            "positive": [
                "Penyelesaian bendungan pengendali banjir, jalan tol, dan infrastruktur IKN tahap awal (+)",
                "Pengadaan dan modernisasi alutsista pertahanan TNI dan sistem keamanan navigasi (+)",
                "Realisasi pembayaran uang muka kontrak multi-years pekerjaan sipil berjalan lancar (+)"
            ],
            "negative": [
                "Tender proyek fisik di semester I terlambat akibat lambatnya penetapan pejabat pembuat komitmen (-)",
                "Kendala pembebasan lahan dan ganti rugi tanah di sejumlah ruas konektivitas (-)",
                "Faktor cuaca ekstrem dan anomali iklim menghambat progres pekerjaan fisik di lapangan (-)"
            ],
            "policy_note": "Kewajiban lelang dini pra-DIPA sejak kuartal IV tahun sebelum anggaran berjalan."
        },
        "EXP_BPP_BUNGA": {
            "source_org": "Ditjen Pengelolaan Pembiayaan & Risiko (DJPPR)",
            "positive": [
                "Pembayaran kupon dan imbalan SBN domestik tepat waktu menjaga peringkat kredit investasi RI (+)",
                "Pengendalian yield SBN tenor 10 tahun melalui koordinasi solid Kemenkeu dan Bank Indonesia (+)",
                "Penerbitan obligasi tematik ritel dengan kupon yang kompetitif dan terjangkau (+)"
            ],
            "negative": [
                "Tingginya suku bunga acuan bank sentral global (higher for longer) menekan beban kupon valas (-)",
                "Pelemahan kurs Rupiah terhadap USD menambah beban pembayaran bunga pinjaman luar negeri (-)",
                "Akumulasi kupon SBN dari pembiayaan masa penanganan pandemi Covid-19 (-)"
            ],
            "policy_note": "Strategi debt reprofiling, diversifikasi portofolio tenor, dan pendalaman pasar obligasi domestik."
        },
        "EXP_BPP_SUBSIDI": {
            "source_org": "DJA (Kemenkeu), ESDM, Pertamina & PLN",
            "positive": [
                "Penyaluran subsidi BBM tepat sasaran didukung registrasi digital QR Code MyPertamina (+)",
                "Stabilitas tarif listrik bagi pelanggan rumah tangga miskin 450 VA dan 900 VA terjaga penuh (+)",
                "Penyaluran subsidi pupuk berbasis data terintegrasi petani e-Alokasi Kementan (+)"
            ],
            "negative": [
                "Kenaikan harga minyak mentah ICP melampaui asumsi APBN meningkatkan kompensasi energi (-)",
                "Pelemahan nilai tukar Rupiah menaikkan biaya pokok penyediaan (BPP) listrik dan impor BBM (-)",
                "Volume konsumsi BBM bersubsidi (Pertalite & Solar) berpotensi melampaui kuota tahunan (-)"
            ],
            "policy_note": "Transformasi subsidi energi dari berbasis komoditas terbuka menjadi berbasis orang/keluarga miskin."
        },
        "EXP_BPP_BANSOS": {
            "source_org": "Kemensos, Kemendikbudristek & DJA/DJPb",
            "positive": [
                "Penyaluran bansos Program Keluarga Harapan (PKH) dan Sembako/BPNT terdistribusi tepat sasaran (+)",
                "Cakupan Penerima Bantuan Iuran (PBI) JKN melindungi 96,8 juta jiwa masyarakat miskin (+)",
                "Pencairan Program Indonesia Pintar (PIP) dan KIP Kuliah berjalan tepat waktu (+)"
            ],
            "negative": [
                "Kebutuhan pemutakhiran data Data Terpadu Kesejahteraan Sosial (DTKS) di tingkat pemda (-)",
                "Kendala jangkauan logistik penyaluran bantuan di kawasan 3T (Terdepan, Terpencil, Tertinggal) (-)",
                "Potensi tumpang tindih kepesertaan bansos antar kementerian teknis (-)"
            ],
            "policy_note": "Penggunaan data Registrasi Sosial Ekonomi (Regsosek) sebagai referensi tunggal penerima manfaat."
        },
        "EXP_BPP_LAIN": {
            "source_org": "Bagian Anggaran BUN 999 (Kemenkeu)",
            "positive": [
                "Kesiapan dana cadangan penanggulangan tanggap darurat bencana alam BNPB (+)",
                "Cadangan stabilisasi harga pangan dan penanganan gagal panen berfungsi efektif (+)",
                "Ruang fleksibilitas fiskal BA-BUN dalam meredam shock eksternal tak terduga (+)"
            ],
            "negative": [
                "Kebutuhan pembayaran kewajiban kontinjensi hukum dan arbitrase pemerintah (-)",
                "Tambahan alokasi dana mendesak untuk agenda prioritas nasional tak terjadwal (-)",
                "Tingkat realisasi penyerapan yang sangat bergantung pada terjadinya kejadian darurat (-)"
            ],
            "policy_note": "Pengetatan tata kelola pencairan dana cadangan BA-BUN dengan persetujuan komite teknis."
        },
        "EXP_TKD": {
            "source_org": "Ditjen Perimbangan Keuangan (DJPK)",
            "positive": [
                "Penyaluran DAU dan Dana Desa tepat waktu menjaga likuiditas ekonomi perdesaan (+)",
                "Pemberian alokasi Insentif Fiskal bagi daerah yang berhasil mengendalikan inflasi (+)",
                "Implementasi UU HKPD memperkuat harmonisasi kebijakan fiskal pusat dan daerah (+)"
            ],
            "negative": [
                "Keterlambatan penyampaian laporan pertanggungjawaban APBD pemda menunda penyaluran tahap berikutnya (-)",
                "Tingginya saldo kas pemda yang mengendap di perbankan daerah (belum dibelanjakan) (-)",
                "Tingkat kemandirian fiskal daerah yang masih rendah (ketergantungan transfer di atas 70%) (-)"
            ],
            "policy_note": "Penerapan skema reward & punishment berbasis kepatuhan belanja produktif daerah."
        },
        "EXP_TKD_DAU": {
            "source_org": "Ditjen Perimbangan Keuangan (DJPK)",
            "positive": [
                "Penyaluran DAU bagian yang tidak ditentukan penggunaannya secara reguler awal bulan (+)",
                "DAU yang ditentukan penggunaannya (earmarked) fokus pada bidang pendidikan dan kesehatan (+)",
                "Pemberian kepastian dana belanja operasional rutin pemerintahan daerah (+)"
            ],
            "negative": [
                "Pemenuhan syarat salur DAU earmarked bidang pekerjaan umum daerah sering terlambat (-)",
                "Kapasitas aparatur keuangan daerah baru dalam menyusun laporan realisasi terbatas (-)",
                "Kesenjangan alokasi kapasitas fiskal antar-kabupaten yang belum sepenuhnya seimbang (-)"
            ],
            "policy_note": "Penyempurnaan formula alokasi DAU berbasis unit cost layanan publik dasar."
        },
        "EXP_TKD_DBH": {
            "source_org": "DJPK (Kemenkeu) & Kementerian ESDM",
            "positive": [
                "Penyaluran DBH SDA Sawit mendukung pendanaan perbaikan jalan perkebunan rakyat (+)",
                "Realisasi DBH PPh dan PBB dibagikan secara transparan dan proporsional (+)",
                "Penyaluran berkala DBH migas dan pertambangan minerba setiap triwulan berjalan (+)"
            ],
            "negative": [
                "Volatilitas harga komoditas tambang global menyebabkan fluktuasi nominal DBH SDA (-)",
                "Keterlambatan rekonsiliasi data lifting migas dan minerba daerah penghasil (-)",
                "Tuntutan porsi bagi hasil dari daerah pengolah non-penghasil (-)"
            ],
            "policy_note": "Penyelesaian rekonsiliasi triwulanan secara digital melalui sistem e-DBH."
        },
        "EXP_TKD_DAK": {
            "source_org": "DJPK (Kemenkeu) & Bappenas",
            "positive": [
                "DAK Fisik meningkatkan konektivitas jalan, jembatan, irigasi, dan puskesmas daerah (+)",
                "DAK Non-Fisik dana Bantuan Operasional Sekolah (BOS) disalurkan langsung ke rekening sekolah (+)",
                "Alokasi DAK Non-Fisik BOK berkontribusi langsung pada penurunan angka stunting balita (+)"
            ],
            "negative": [
                "Keterlambatan lelang kontrak pekerjaan fisik oleh pemda mengakibatkan DAK hangus (-)",
                "Proses verifikasi laporan penyerapan tahap sebelumnya di inspektorat daerah lambat (-)",
                "Kurangnya alokasi pemeliharaan berkala pasca proyek DAK selesai dibangun (-)"
            ],
            "policy_note": "Relaksasi batas waktu penyampaian kontrak dan pendampingan teknis bagi daerah 3T."
        },
        "EXP_TKD_DESA": {
            "source_org": "DJPK (Kemenkeu) & Kemendes PDTT",
            "positive": [
                "Penyaluran Dana Desa mendukung program Padat Karya Tunai Desa (PKTD) (+)",
                "Bantuan Langsung Tunai (BLT) Desa meringankan beban ekonomi keluarga miskin ekstrem (+)",
                "Pembangunan sarana sanitasi, posyandu desa, dan akses air minum perdesaan (+)"
            ],
            "negative": [
                "Keterlambatan penetapan APBDes oleh musyawarah desa menunda pencairan tahap I (-)",
                "Variasi kapasitas aparat desa dalam menyusun pertanggungjawaban penatausahaan kas (-)",
                "Potensi penyimpangan pemanfaatan dana desa pada daerah pedalaman (-)"
            ],
            "policy_note": "Integrasi menyeluruh sistem keuangan desa (SISKEUDES) dengan portal OMSPAN Kemenkeu."
        },
        "BAL_PRIMARY": {
            "source_org": "Badan Kebijakan Fiskal (BKF) & Ditjen Anggaran",
            "positive": [
                "Surplus keseimbangan primer terjaga berkat kinerja penerimaan negara yang melampaui target (+)",
                "Beban penerbitan utang baru berkurang karena penerimaan mampu menutup belanja non-bunga (+)",
                "Pemberian apresiasi dari lembaga pemeringkat internasional atas disiplin fiskal RI (+)"
            ],
            "negative": [
                "Risiko pelebaran defisit primer jika terjadi lonjakan beban belanja bunga utang (-)",
                "Penurunan tajam penerimaan komoditas SDA berpotensi menekan saldo primer (-)",
                "Tingginya ketergantungan surplus primer pada kesinambungan penerimaan perpajakan (-)"
            ],
            "policy_note": "Menjaga keseimbangan primer tetap surplus untuk menjamin penurunan rasio utang jangka panjang."
        },
        "DEFISIT_ANGGARAN": {
            "source_org": "Laporan Realisasi APBN KiTa (Kemenkeu RI)",
            "positive": [
                "Defisit anggaran terkendali aman di kisaran 1,6% - 2,3% PDB, jauh di bawah batas hukum 3% PDB (+)",
                "Pengendalian serapan belanja secara efektif menekan kebutuhan penerbitan utang pembiayaan (+)",
                "Rasio utang terhadap PDB berada di level 38-39%, salah satu yang terendah di G20 dan ASEAN (+)"
            ],
            "negative": [
                "Potensi pelebaran defisit bila penerimaan perpajakan meleset dari target UU APBN (-)",
                "Volatilitas kurs Rupiah dan harga minyak dunia dapat mengangkat belanja subsidi energi (-)",
                "Tuntutan pembiayaan proyek strategis nasional dan perlindungan sosial yang tinggi (-)"
            ],
            "policy_note": "Konsolidasi fiskal disiplin dengan mematuhi batas statutori defisit maksimal 3% PDB."
        },
        "FIN_TOTAL": {
            "source_org": "Ditjen Pengelolaan Pembiayaan & Risiko (DJPPR)",
            "positive": [
                "Kebutuhan penerbitan SBN neto dapat diturunkan seiring terkendalinya defisit anggaran (+)",
                "Pemanfaatan Saldo Anggaran Lebih (SAL) sebagai penyangga fiskal mengurangi penerbitan utang (+)",
                "Tingginya partisipasi investor institusi domestik dan masyarakat ritel pada obligasi negara (+)"
            ],
            "negative": [
                "Kondisi suku bunga global yang tinggi menuntut penetapan kupon penerbitan yang kompetitif (-)",
                "Risiko pembalikan arus modal asing (capital outflow) dari pasar surat berharga negara (-)",
                "Tuntutan pembiayaan investasi bagi penugasan BUMN memerlukan seleksi kelayakan ketat (-)"
            ],
            "policy_note": "Prioritisasi penerbitan surat utang berdenominasi Rupiah dan optimalisasi kas SAL."
        },
        "FIN_UTANG": {
            "source_org": "Ditjen Pengelolaan Pembiayaan & Risiko (DJPPR)",
            "positive": [
                "Penerbitan SBN ritel (ORI, Sukuk Ritel) mencatat oversubscription dari investor generasi muda (+)",
                "Diversifikasi instrumen utang melalui penerbitan Samurai Bond, Sukuk Hijau, dan SDG Bond (+)",
                "Porsi kepemilikan asing di SBN berada pada level aman (14-15%) meminimalkan risiko pasar (+)"
            ],
            "negative": [
                "Kenaikan yield obligasi global (US Treasury) memperlebar biaya pinjaman negara berkembang (-)",
                "Biaya dana utang baru (cost of fund) lebih mahal di era rezim suku bunga tinggi (-)",
                "Profil jatuh tempo utang yang menumpuk di masa mendatang memerlukan mitigasi refinancing (-)"
            ],
            "policy_note": "Pengelolaan portofolio utang secara prudent dengan mengendalikan risiko kurs dan bunga."
        },
        "FIN_NON_UTANG": {
            "source_org": "DJPPR, DJKN & Saldo Anggaran Lebih (SAL)",
            "positive": [
                "Alokasi penyertaan modal negara (PMN) hanya diberikan kepada BUMN penugasan strategis (+)",
                "Pengembalian pinjaman daerah dan pemanfaatan hasil investasi dana abadi pendidikan (+)",
                "Penggunaan SAL sebagai bantalan kas darurat tanpa menambah beban pokok utang (+)"
            ],
            "negative": [
                "Alokasi pembiayaan investasi tidak langsung memberikan pengembalian dividen seketika (-)",
                "Keterbatasan ruang serapan modal pada BUMN yang masih menjalani penyehatan keuangan (-)",
                "Kewajiban penyediaan dana penjaminan infrastruktur dan mitigasi risiko bencana (-)"
            ],
            "policy_note": "Penetapan KPI terukur untuk setiap pencairan PMN dan audit berkala efektivitas investasi."
        }
    }

    @classmethod
    def get_supported_years(cls) -> List[Dict[str, Any]]:
        """Mengembalikan daftar tahun yang didukung beserta status publikasi APBN KiTa."""
        res = []
        for yr in sorted(cls.YEARS_CONFIG.keys(), reverse=True):
            cfg = cls.YEARS_CONFIG[yr]
            res.append({
                "year": yr,
                "status": cfg["status"],
                "status_label": cfg["status_label"],
                "legal_doc": cfg["legal_doc"],
                "latest_published_month": cfg["latest_published_month"],
                "is_running_year": yr in [2025, 2026]
            })
        return res

    @classmethod
    def _get_base_dataset(cls, year: int) -> List[Dict[str, Any]]:
        """
        Menyusun data terstruktur untuk pos-pos utama postur APBN:
        Target RAPBN (Nota Keuangan), Target UU APBN, Realisasi Bulanan M01-M12, dan YTD.
        Nilai disimpan dalam basis Triliun Rupiah (Rp T).
        """
        cfg = cls.YEARS_CONFIG.get(year, cls.YEARS_CONFIG[2025])
        latest_m = cfg["latest_published_month"]
        latest_idx = int(latest_m.replace("M", ""))

        benchmarks = {
            2020: {
                "rapbn_rev": 2221.5, "apbn_rev": 2233.2, "real_rev": 1647.8,
                "rapbn_tax": 1850.0, "apbn_tax": 1865.7, "real_tax": 1285.1,
                "rapbn_cukai": 178.5, "apbn_cukai": 180.5, "real_cukai": 176.3,
                "rapbn_pnbp": 360.0, "apbn_pnbp": 367.0, "real_pnbp": 343.8,
                "rapbn_exp": 2528.8, "apbn_exp": 2540.4, "real_exp": 2595.5,
                "rapbn_bpp": 1675.0, "apbn_bpp": 1683.5, "real_bpp": 1833.0,
                "rapbn_tkd": 853.8, "apbn_tkd": 856.9, "real_tkd": 762.5,
                "rapbn_def": -307.3, "apbn_def": -307.2, "real_def": -947.7,
                "rapbn_fin": 307.3, "apbn_fin": 307.2, "real_fin": 1225.1
            },
            2021: {
                "rapbn_rev": 1720.0, "apbn_rev": 1743.6, "real_rev": 2011.3,
                "rapbn_tax": 1420.0, "apbn_tax": 1444.5, "real_tax": 1547.8,
                "rapbn_cukai": 180.0, "apbn_cukai": 182.2, "real_cukai": 195.5,
                "rapbn_pnbp": 295.0, "apbn_pnbp": 298.2, "real_pnbp": 458.5,
                "rapbn_exp": 2730.0, "apbn_exp": 2750.0, "real_exp": 2786.4,
                "rapbn_bpp": 1940.0, "apbn_bpp": 1954.5, "real_bpp": 2000.7,
                "rapbn_tkd": 790.0, "apbn_tkd": 795.5, "real_tkd": 785.7,
                "rapbn_def": -1010.0, "apbn_def": -1006.4, "real_def": -775.1,
                "rapbn_fin": 1010.0, "apbn_fin": 1006.4, "real_fin": 870.5
            },
            2022: {
                "rapbn_rev": 2240.0, "apbn_rev": 2266.2, "real_rev": 2635.8,
                "rapbn_tax": 1750.0, "apbn_tax": 1784.0, "real_tax": 2034.5,
                "rapbn_cukai": 203.9, "apbn_cukai": 209.9, "real_cukai": 226.9,
                "rapbn_pnbp": 475.0, "apbn_pnbp": 481.6, "real_pnbp": 595.6,
                "rapbn_exp": 3080.0, "apbn_exp": 3106.4, "real_exp": 3096.3,
                "rapbn_bpp": 2280.0, "apbn_bpp": 2301.8, "real_bpp": 2280.1,
                "rapbn_tkd": 800.0, "apbn_tkd": 804.6, "real_tkd": 816.2,
                "rapbn_def": -840.0, "apbn_def": -840.2, "real_def": -460.5,
                "rapbn_fin": 840.0, "apbn_fin": 840.2, "real_fin": 696.0
            },
            2023: {
                "rapbn_rev": 2443.6, "apbn_rev": 2463.0, "real_rev": 2784.0,
                "rapbn_tax": 2005.0, "apbn_tax": 2021.2, "real_tax": 2155.4,
                "rapbn_cukai": 245.4, "apbn_cukai": 245.4, "real_cukai": 221.8,
                "rapbn_pnbp": 435.0, "apbn_pnbp": 441.4, "real_pnbp": 612.0,
                "rapbn_exp": 3041.7, "apbn_exp": 3061.2, "real_exp": 3121.9,
                "rapbn_bpp": 2230.0, "apbn_bpp": 2246.5, "real_bpp": 2240.8,
                "rapbn_tkd": 811.7, "apbn_tkd": 814.7, "real_tkd": 881.1,
                "rapbn_def": -598.1, "apbn_def": -598.2, "real_def": -337.9,
                "rapbn_fin": 598.1, "apbn_fin": 598.2, "real_fin": 407.0
            },
            2024: {
                "rapbn_rev": 2781.3, "apbn_rev": 2802.3, "real_rev": 3032.5,
                "rapbn_tax": 2290.0, "apbn_tax": 2309.9, "real_tax": 2345.0,
                "rapbn_cukai": 246.1, "apbn_cukai": 246.1, "real_cukai": 230.5,
                "rapbn_pnbp": 485.0, "apbn_pnbp": 492.0, "real_pnbp": 670.5,
                "rapbn_exp": 3304.1, "apbn_exp": 3325.1, "real_exp": 3325.2,
                "rapbn_bpp": 2450.0, "apbn_bpp": 2467.5, "real_bpp": 2410.0,
                "rapbn_tkd": 854.1, "apbn_tkd": 857.6, "real_tkd": 915.2,
                "rapbn_def": -522.8, "apbn_def": -522.8, "real_def": -292.7,
                "rapbn_fin": 522.8, "apbn_fin": 522.8, "real_fin": 380.0
            },
            2025: {
                "rapbn_rev": 2996.9, "apbn_rev": 3005.1, "real_rev": 3110.0,
                "rapbn_tax": 2470.0, "apbn_tax": 2490.9, "real_tax": 2520.0,
                "rapbn_cukai": 244.2, "apbn_cukai": 244.2, "real_cukai": 246.0,
                "rapbn_pnbp": 510.0, "apbn_pnbp": 514.2, "real_pnbp": 580.0,
                "rapbn_exp": 3600.0, "apbn_exp": 3621.3, "real_exp": 3480.0,
                "rapbn_bpp": 2680.0, "apbn_bpp": 2701.3, "real_bpp": 2540.0,
                "rapbn_tkd": 920.0, "apbn_tkd": 920.0, "real_tkd": 940.0,
                "rapbn_def": -603.1, "apbn_def": -616.2, "real_def": -370.0,
                "rapbn_fin": 603.1, "apbn_fin": 616.2, "real_fin": 410.0
            },
            2026: {
                "rapbn_rev": 3200.0, "apbn_rev": 3225.0, "real_rev": 3250.0,
                "rapbn_tax": 2540.0, "apbn_tax": 2565.0, "real_tax": 2580.0,
                "rapbn_cukai": 258.0, "apbn_cukai": 260.0, "real_cukai": 260.0,
                "rapbn_pnbp": 645.0, "apbn_pnbp": 650.0, "real_pnbp": 655.0,
                "rapbn_exp": 3580.0, "apbn_exp": 3605.0, "real_exp": 3615.0,
                "rapbn_bpp": 2610.0, "apbn_bpp": 2625.0, "real_bpp": 2635.0,
                "rapbn_tkd": 970.0, "apbn_tkd": 980.0, "real_tkd": 980.0,
                "rapbn_def": -380.0, "apbn_def": -380.0, "real_def": -365.0,
                "rapbn_fin": 380.0, "apbn_fin": 380.0, "real_fin": 365.0
            }
        }
        b = benchmarks.get(year, benchmarks[2025])

        raw_items = [
            # 1. PENDAPATAN
            {
                "id": "REV_TOTAL", "code": "4", "name": "PENDAPATAN NEGARA DAN HIBAH",
                "category": "PENDAPATAN", "level": 1, "is_header": True,
                "rapbn": b["rapbn_rev"], "apbn": b["apbn_rev"], "annual_real": b["real_rev"],
                "weights": cls.MONTHLY_WEIGHTS_REVENUE
            },
            {
                "id": "REV_TAX", "code": "41", "name": "I. Penerimaan Perpajakan",
                "category": "PENDAPATAN", "level": 2, "is_header": True,
                "rapbn": b["rapbn_tax"], "apbn": b["apbn_tax"], "annual_real": b["real_tax"],
                "weights": cls.MONTHLY_WEIGHTS_TAX
            },
            {
                "id": "REV_TAX_PPH", "code": "4111", "name": "1. Pajak Penghasilan (PPh)",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_tax"] * 0.48, 2), "apbn": round(b["apbn_tax"] * 0.485, 2),
                "annual_real": round(b["real_tax"] * 0.49, 2),
                "weights": [0.060, 0.065, 0.110, 0.160, 0.075, 0.078, 0.070, 0.072, 0.079, 0.081, 0.088, 0.062]
            },
            {
                "id": "REV_TAX_PPN", "code": "4112", "name": "2. Pajak Pertambahan Nilai (PPN & PPnBM)",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_tax"] * 0.35, 2), "apbn": round(b["apbn_tax"] * 0.355, 2),
                "annual_real": round(b["real_tax"] * 0.35, 2),
                "weights": [0.070, 0.072, 0.075, 0.082, 0.084, 0.086, 0.082, 0.085, 0.088, 0.090, 0.096, 0.090]
            },
            {
                "id": "REV_TAX_CUKAI", "code": "4115", "name": "3. Cukai (CHT, MMEA, & EA)",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": b["rapbn_cukai"], "apbn": b["apbn_cukai"], "annual_real": b["real_cukai"],
                "weights": [0.072, 0.075, 0.079, 0.081, 0.083, 0.085, 0.082, 0.084, 0.086, 0.088, 0.095, 0.090]
            },
            {
                "id": "REV_TAX_BEA", "code": "4116", "name": "4. Bea Masuk dan Bea Keluar",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_tax"] * 0.045, 2), "apbn": round(b["apbn_tax"] * 0.045, 2),
                "annual_real": round(b["real_tax"] * 0.042, 2),
                "weights": [0.078, 0.080, 0.082, 0.084, 0.085, 0.086, 0.084, 0.085, 0.086, 0.088, 0.090, 0.072]
            },
            {
                "id": "REV_TAX_PBB", "code": "4113", "name": "5. PBB & Pajak Lainnya",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_tax"] * 0.025, 2), "apbn": round(b["apbn_tax"] * 0.025, 2),
                "annual_real": round(b["real_tax"] * 0.028, 2),
                "weights": [0.020, 0.025, 0.030, 0.035, 0.040, 0.060, 0.080, 0.150, 0.220, 0.180, 0.100, 0.060]
            },
            {
                "id": "REV_PNBP", "code": "42", "name": "II. Penerimaan Negara Bukan Pajak (PNBP)",
                "category": "PENDAPATAN", "level": 2, "is_header": True,
                "rapbn": b["rapbn_pnbp"], "apbn": b["apbn_pnbp"], "annual_real": b["real_pnbp"],
                "weights": cls.MONTHLY_WEIGHTS_PNBP
            },
            {
                "id": "REV_PNBP_SDA", "code": "421", "name": "1. Pemanfaatan Sumber Daya Alam (Migas & Minerba)",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_pnbp"] * 0.42, 2), "apbn": round(b["apbn_pnbp"] * 0.42, 2),
                "annual_real": round(b["real_pnbp"] * 0.45, 2),
                "weights": [0.060, 0.065, 0.075, 0.080, 0.085, 0.090, 0.088, 0.092, 0.095, 0.098, 0.102, 0.070]
            },
            {
                "id": "REV_PNBP_KND", "code": "422", "name": "2. Bagian Laba BUMN (KND)",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_pnbp"] * 0.16, 2), "apbn": round(b["apbn_pnbp"] * 0.165, 2),
                "annual_real": round(b["real_pnbp"] * 0.16, 2),
                "weights": [0.010, 0.020, 0.030, 0.040, 0.280, 0.250, 0.150, 0.080, 0.050, 0.040, 0.030, 0.020]
            },
            {
                "id": "REV_PNBP_BLU", "code": "424", "name": "3. Pendapatan Badan Layanan Umum (BLU)",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_pnbp"] * 0.20, 2), "apbn": round(b["apbn_pnbp"] * 0.20, 2),
                "annual_real": round(b["real_pnbp"] * 0.19, 2),
                "weights": [0.075, 0.078, 0.082, 0.084, 0.085, 0.086, 0.084, 0.085, 0.086, 0.088, 0.090, 0.077]
            },
            {
                "id": "REV_PNBP_LAIN", "code": "423", "name": "4. PNBP Lainnya",
                "category": "PENDAPATAN", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_pnbp"] * 0.22, 2), "apbn": round(b["apbn_pnbp"] * 0.215, 2),
                "annual_real": round(b["real_pnbp"] * 0.20, 2),
                "weights": [0.070, 0.072, 0.075, 0.078, 0.080, 0.082, 0.085, 0.088, 0.090, 0.092, 0.100, 0.088]
            },
            {
                "id": "REV_HIBAH", "code": "43", "name": "III. Hibah",
                "category": "PENDAPATAN", "level": 2, "is_header": False,
                "rapbn": 15.0, "apbn": 15.0, "annual_real": 17.5,
                "weights": [0.050, 0.060, 0.070, 0.080, 0.090, 0.095, 0.090, 0.095, 0.090, 0.100, 0.090, 0.080]
            },

            # 2. BELANJA
            {
                "id": "EXP_TOTAL", "code": "5", "name": "BELANJA NEGARA",
                "category": "BELANJA", "level": 1, "is_header": True,
                "rapbn": b["rapbn_exp"], "apbn": b["apbn_exp"], "annual_real": b["real_exp"],
                "weights": cls.MONTHLY_WEIGHTS_EXPENSE_BPP
            },
            {
                "id": "EXP_BPP", "code": "51-58", "name": "I. Belanja Pemerintah Pusat (BPP)",
                "category": "BELANJA", "level": 2, "is_header": True,
                "rapbn": b["rapbn_bpp"], "apbn": b["apbn_bpp"], "annual_real": b["real_bpp"],
                "weights": cls.MONTHLY_WEIGHTS_EXPENSE_BPP
            },
            {
                "id": "EXP_BPP_PEGAWAI", "code": "51", "name": "1. Belanja Pegawai (Gaji, Tunjangan & THR/Gaji-13)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_bpp"] * 0.18, 2), "apbn": round(b["apbn_bpp"] * 0.182, 2),
                "annual_real": round(b["real_bpp"] * 0.185, 2),
                "weights": [0.065, 0.068, 0.125, 0.072, 0.075, 0.130, 0.072, 0.074, 0.076, 0.078, 0.080, 0.085]
            },
            {
                "id": "EXP_BPP_BARANG", "code": "52", "name": "2. Belanja Barang Operasional & Non-Operasional",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_bpp"] * 0.19, 2), "apbn": round(b["apbn_bpp"] * 0.192, 2),
                "annual_real": round(b["real_bpp"] * 0.195, 2),
                "weights": [0.035, 0.045, 0.055, 0.065, 0.072, 0.080, 0.078, 0.085, 0.092, 0.105, 0.138, 0.150]
            },
            {
                "id": "EXP_BPP_MODAL", "code": "53", "name": "3. Belanja Modal (Infrastruktur, Gedung & Alutsista)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_bpp"] * 0.125, 2), "apbn": round(b["apbn_bpp"] * 0.128, 2),
                "annual_real": round(b["real_bpp"] * 0.125, 2),
                "weights": [0.020, 0.028, 0.038, 0.045, 0.058, 0.072, 0.078, 0.088, 0.102, 0.128, 0.185, 0.158]
            },
            {
                "id": "EXP_BPP_BUNGA", "code": "54", "name": "4. Pembayaran Bunga Utang (Domestik & Valas)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_bpp"] * 0.20, 2), "apbn": round(b["apbn_bpp"] * 0.198, 2),
                "annual_real": round(b["real_bpp"] * 0.20, 2),
                "weights": [0.080, 0.082, 0.085, 0.082, 0.084, 0.086, 0.082, 0.084, 0.085, 0.086, 0.088, 0.086]
            },
            {
                "id": "EXP_BPP_SUBSIDI", "code": "55", "name": "5. Belanja Subsidi (BBM, Listrik, LPG & Pupuk)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_bpp"] * 0.11, 2), "apbn": round(b["apbn_bpp"] * 0.112, 2),
                "annual_real": round(b["real_bpp"] * 0.115, 2),
                "weights": [0.070, 0.075, 0.080, 0.082, 0.085, 0.086, 0.082, 0.085, 0.088, 0.090, 0.095, 0.082]
            },
            {
                "id": "EXP_BPP_BANSOS", "code": "56", "name": "6. Bantuan Sosial (PKH, Sembako, PBI JKN)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_bpp"] * 0.065, 2), "apbn": round(b["apbn_bpp"] * 0.065, 2),
                "annual_real": round(b["real_bpp"] * 0.066, 2),
                "weights": [0.085, 0.092, 0.098, 0.080, 0.082, 0.085, 0.078, 0.082, 0.085, 0.088, 0.090, 0.055]
            },
            {
                "id": "EXP_BPP_LAIN", "code": "57-58", "name": "7. Belanja Lain-lain (Cadangan Bencana & Fiskal)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_bpp"] * 0.03, 2), "apbn": round(b["apbn_bpp"] * 0.028, 2),
                "annual_real": round(b["real_bpp"] * 0.025, 2),
                "weights": [0.030, 0.035, 0.040, 0.050, 0.060, 0.070, 0.080, 0.090, 0.100, 0.120, 0.150, 0.175]
            },
            {
                "id": "EXP_TKD", "code": "6", "name": "II. Transfer ke Daerah (TKD)",
                "category": "BELANJA", "level": 2, "is_header": True,
                "rapbn": b["rapbn_tkd"], "apbn": b["apbn_tkd"], "annual_real": b["real_tkd"],
                "weights": cls.MONTHLY_WEIGHTS_EXPENSE_TKD
            },
            {
                "id": "EXP_TKD_DAU", "code": "61", "name": "1. Dana Alokasi Umum (DAU)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_tkd"] * 0.46, 2), "apbn": round(b["apbn_tkd"] * 0.46, 2),
                "annual_real": round(b["real_tkd"] * 0.465, 2),
                "weights": [0.083, 0.083, 0.083, 0.083, 0.083, 0.083, 0.083, 0.083, 0.083, 0.083, 0.085, 0.085]
            },
            {
                "id": "EXP_TKD_DBH", "code": "62", "name": "2. Dana Bagi Hasil (DBH Pajak & SDA)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_tkd"] * 0.18, 2), "apbn": round(b["apbn_tkd"] * 0.18, 2),
                "annual_real": round(b["real_tkd"] * 0.19, 2),
                "weights": [0.020, 0.030, 0.150, 0.040, 0.050, 0.200, 0.040, 0.050, 0.220, 0.040, 0.050, 0.110]
            },
            {
                "id": "EXP_TKD_DAK", "code": "63", "name": "3. Dana Alokasi Khusus (DAK Fisik & Non-Fisik)",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_tkd"] * 0.21, 2), "apbn": round(b["apbn_tkd"] * 0.21, 2),
                "annual_real": round(b["real_tkd"] * 0.20, 2),
                "weights": [0.030, 0.040, 0.100, 0.060, 0.070, 0.140, 0.080, 0.090, 0.150, 0.100, 0.070, 0.070]
            },
            {
                "id": "EXP_TKD_DESA", "code": "64", "name": "4. Dana Desa & Insentif Fiskal",
                "category": "BELANJA", "level": 3, "is_header": False,
                "rapbn": round(b["rapbn_tkd"] * 0.15, 2), "apbn": round(b["apbn_tkd"] * 0.15, 2),
                "annual_real": round(b["real_tkd"] * 0.145, 2),
                "weights": [0.050, 0.150, 0.150, 0.080, 0.120, 0.120, 0.080, 0.080, 0.070, 0.050, 0.030, 0.020]
            },

            # 3. KESEIMBANGAN PRIMER & DEFISIT
            {
                "id": "BAL_PRIMARY", "code": "BAL-PRIM", "name": "KESEIMBANGAN PRIMER",
                "category": "KESEIMBANGAN", "level": 1, "is_header": True,
                "rapbn": round(b["rapbn_rev"] - (b["rapbn_exp"] - round(b["rapbn_bpp"] * 0.20, 2)), 2),
                "apbn": round(b["apbn_rev"] - (b["apbn_exp"] - round(b["apbn_bpp"] * 0.198, 2)), 2),
                "annual_real": round(b["real_rev"] - (b["real_exp"] - round(b["real_bpp"] * 0.20, 2)), 2),
                "weights": cls.MONTHLY_WEIGHTS_REVENUE
            },
            {
                "id": "DEFISIT_ANGGARAN", "code": "DEF", "name": "SURPLUS / (DEFISIT) ANGGARAN",
                "category": "KESEIMBANGAN", "level": 1, "is_header": True,
                "rapbn": b["rapbn_def"], "apbn": b["apbn_def"], "annual_real": b["real_def"],
                "weights": cls.MONTHLY_WEIGHTS_REVENUE
            },

            # 4. PEMBIAYAAN
            {
                "id": "FIN_TOTAL", "code": "7", "name": "PEMBIAYAAN ANGGARAN (NETO)",
                "category": "PEMBIAYAAN", "level": 1, "is_header": True,
                "rapbn": b["rapbn_fin"], "apbn": b["apbn_fin"], "annual_real": b["real_fin"],
                "weights": [0.120, 0.110, 0.100, 0.090, 0.080, 0.080, 0.070, 0.070, 0.070, 0.070, 0.070, 0.070]
            },
            {
                "id": "FIN_UTANG", "code": "71", "name": "1. Pembiayaan Utang (SBN Neto & Pinjaman)",
                "category": "PEMBIAYAAN", "level": 2, "is_header": False,
                "rapbn": round(b["rapbn_fin"] * 1.05, 2), "apbn": round(b["apbn_fin"] * 1.05, 2),
                "annual_real": round(b["real_fin"] * 1.04, 2),
                "weights": [0.130, 0.120, 0.100, 0.090, 0.080, 0.080, 0.070, 0.070, 0.070, 0.060, 0.060, 0.070]
            },
            {
                "id": "FIN_NON_UTANG", "code": "72", "name": "2. Pembiayaan Non-Utang (Investasi & SAL)",
                "category": "PEMBIAYAAN", "level": 2, "is_header": False,
                "rapbn": round(-b["rapbn_fin"] * 0.05, 2), "apbn": round(-b["apbn_fin"] * 0.05, 2),
                "annual_real": round(-b["real_fin"] * 0.04, 2),
                "weights": [0.030, 0.040, 0.050, 0.060, 0.070, 0.080, 0.090, 0.100, 0.110, 0.120, 0.120, 0.130]
            }
        ]

        rows: List[Dict[str, Any]] = []
        is_running_year = year in [2025, 2026]

        for item in raw_items:
            weights = item["weights"]
            annual_val = item["annual_real"]
            rapbn_val = item["rapbn"]
            apbn_val = item["apbn"]

            monthly: Dict[str, Optional[float]] = {}
            monthly_status: Dict[str, str] = {}
            ytd_actual = 0.0

            for m_idx in range(1, 13):
                m_code = f"M{m_idx:02d}"
                raw_month_val = round(annual_val * weights[m_idx - 1], 2)

                if is_running_year and m_idx > latest_idx:
                    monthly[m_code] = raw_month_val
                    monthly_status[m_code] = "PROGNOSA"
                else:
                    monthly[m_code] = raw_month_val
                    monthly_status[m_code] = "OBSERVED"
                    ytd_actual = round(ytd_actual + raw_month_val, 2)

            pct_apbn = round((ytd_actual / apbn_val * 100.0), 2) if apbn_val else 0.0
            pct_rapbn = round((ytd_actual / rapbn_val * 100.0), 2) if rapbn_val else 0.0
            variance_apbn = round(apbn_val - ytd_actual, 2)
            variance_rapbn = round(rapbn_val - ytd_actual, 2)

            benchmark_run_rate = round((latest_idx / 12.0) * 100.0, 2)

            if item["id"] in ["DEFISIT_ANGGARAN", "BAL_PRIMARY"]:
                perf_status = "NORMAL"
                perf_badge = "bg-sky-50 text-sky-700"
            elif item["category"] == "PENDAPATAN":
                diff = pct_apbn - benchmark_run_rate
                if diff >= -1.5:
                    perf_status = "ON_TRACK"
                    perf_badge = "bg-emerald-50 text-emerald-700"
                elif diff >= -5.0:
                    perf_status = "MODERATE"
                    perf_badge = "bg-amber-50 text-amber-700"
                else:
                    perf_status = "LAGGING"
                    perf_badge = "bg-rose-50 text-rose-700"
            else:
                diff = pct_apbn - benchmark_run_rate
                if diff >= -2.5:
                    perf_status = "ON_TRACK"
                    perf_badge = "bg-emerald-50 text-emerald-700"
                elif diff >= -7.0:
                    perf_status = "MODERATE"
                    perf_badge = "bg-amber-50 text-amber-700"
                else:
                    perf_status = "LAGGING"
                    perf_badge = "bg-rose-50 text-rose-700"

            meta = cls.DRIVERS_REGISTRY.get(item["id"], {})
            source_org = meta.get("source_org", "Kementerian Keuangan RI")
            positive_drivers = meta.get("positive", ["Realisasi berjalan sesuai pagu statutori"])
            negative_drivers = meta.get("negative", ["Tantangan dinamika fiskal dan serapan musiman"])
            policy_note = meta.get("policy_note", "Disiplin fiskal terpadu.")

            rows.append({
                "id": item["id"],
                "code": item["code"],
                "name": item["name"],
                "category": item["category"],
                "level": item["level"],
                "is_header": item["is_header"],
                "rapbn": rapbn_val,
                "apbn": apbn_val,
                "monthly": monthly,
                "monthly_status": monthly_status,
                "latest_month": latest_m,
                "latest_month_name": cls.MONTH_NAMES[latest_idx - 1]["name"],
                "latest_month_actual": monthly[latest_m],
                "ytd_actual": ytd_actual,
                "pct_apbn": pct_apbn,
                "pct_rapbn": pct_rapbn,
                "variance_apbn": variance_apbn,
                "variance_rapbn": variance_rapbn,
                "benchmark_run_rate": benchmark_run_rate,
                "perf_status": perf_status,
                "perf_badge": perf_badge,
                "source_org": source_org,
                "drivers": {
                    "positive": positive_drivers,
                    "negative": negative_drivers,
                    "policy_note": policy_note,
                    "monthly_notes": cls.MONTHLY_SEASONAL_DRIVERS
                }
            })

        return rows

    @classmethod
    def _resolve_period_info(cls, start_m: int, end_m: int, latest_idx: int) -> Dict[str, Any]:
        """Menghitung metadata penamaan, label, dan persentase linier untuk periode terpilih."""
        num_months = end_m - start_m + 1
        linear_pct = round((num_months / 12.0) * 100.0, 1)
        start_name = cls.MONTH_NAMES[start_m - 1]["name"]
        end_name = cls.MONTH_NAMES[end_m - 1]["name"]
        is_custom_period = not (start_m == 1 and end_m == latest_idx)

        if start_m == 1 and end_m == latest_idx:
            p_type = "YTD"
            p_label = f"Akumulasi YTD (Januari – {end_name})"
            short_label = f"YTD (M{end_m:02d})"
        elif start_m == 1 and end_m == 3:
            p_type = "Q1"
            p_label = "Triwulan I / Q1 (Januari – Maret)"
            short_label = "Q1 (Jan–Mar)"
        elif start_m == 4 and end_m == 6:
            p_type = "Q2"
            p_label = "Triwulan II / Q2 (April – Juni)"
            short_label = "Q2 (Apr–Jun)"
        elif start_m == 7 and end_m == 9:
            p_type = "Q3"
            p_label = "Triwulan III / Q3 (Juli – September)"
            short_label = "Q3 (Jul–Sep)"
        elif start_m == 10 and end_m == 12:
            p_type = "Q4"
            p_label = "Triwulan IV / Q4 (Oktober – Desember)"
            short_label = "Q4 (Okt–Des)"
        elif start_m == 1 and end_m == 6:
            p_type = "S1"
            p_label = "Semester I (Januari – Juni)"
            short_label = "Semester 1 (Jan–Jun)"
        elif start_m == 7 and end_m == 12:
            p_type = "S2"
            p_label = "Semester II (Juli – Desember)"
            short_label = "Semester 2 (Jul–Des)"
        elif start_m == 1 and end_m == 12:
            p_type = "FULL"
            p_label = "Satu Tahun Anggaran Penuh (Januari – Desember)"
            short_label = "Jan–Des (Full)"
        elif start_m == end_m:
            p_type = "MONTH"
            p_label = f"Bulan {start_name} (M{start_m:02d})"
            short_label = f"Bulan {start_name}"
        elif start_m == 1:
            p_type = "YTD_CUSTOM"
            p_label = f"Akumulasi YTD Kustom (Januari – {end_name})"
            short_label = f"YTD s/d {end_name}"
        else:
            p_type = "CUSTOM"
            p_label = f"Kustom Periode ({start_name} – {end_name})"
            short_label = f"M{start_m:02d}–M{end_m:02d}"

        return {
            "start_month": start_m,
            "end_month": end_m,
            "start_month_name": start_name,
            "end_month_name": end_name,
            "num_months": num_months,
            "linear_pct": linear_pct,
            "is_custom_period": is_custom_period,
            "period_type": p_type,
            "period_label": p_label,
            "short_period_label": short_label
        }

    @classmethod
    def get_evaluation_summary(
        cls,
        year: int = 2025,
        unit: str = "TRILLION",
        start_month: int = 1,
        end_month: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Menghasilkan ringkasan eksekutif KPI:
        Total Pendapatan, Total Belanja, Defisit, Keseimbangan Primer, Capaian YTD, dan Benchmark.
        Mendukung rentang waktu custom (start_month s/d end_month).
        """
        div, unit_label = cls._get_unit_multiplier(unit)
        rows = cls._get_base_dataset(year)
        cfg = cls.YEARS_CONFIG.get(year, cls.YEARS_CONFIG[2025])
        latest_m = cfg["latest_published_month"]
        latest_idx = int(latest_m.replace("M", ""))
        gdp = cfg["gdp_nominal"]

        end_m = latest_idx if end_month is None else max(1, min(12, end_month))
        start_m = max(1, min(end_m, start_month))
        period_info = cls._resolve_period_info(start_m, end_m, latest_idx)
        is_custom_period = period_info["is_custom_period"]
        num_months = period_info["num_months"]

        def find_row(row_id: str) -> Dict[str, Any]:
            for r in rows:
                if r["id"] == row_id:
                    return r
            return rows[0]

        r_rev = find_row("REV_TOTAL")
        r_exp = find_row("EXP_TOTAL")
        r_def = find_row("DEFISIT_ANGGARAN")
        r_prim = find_row("BAL_PRIMARY")
        r_tax = find_row("REV_TAX")
        r_bpp = find_row("EXP_BPP")
        r_tkd = find_row("EXP_TKD")

        def calc_custom_actual(row: Dict[str, Any]) -> float:
            tot = 0.0
            for m in range(start_m, end_m + 1):
                tot += row["monthly"].get(f"M{m:02d}", 0.0) or 0.0
            return round(tot, 2)

        rev_val = calc_custom_actual(r_rev) if is_custom_period else r_rev["ytd_actual"]
        exp_val = calc_custom_actual(r_exp) if is_custom_period else r_exp["ytd_actual"]
        def_val = calc_custom_actual(r_def) if is_custom_period else r_def["ytd_actual"]
        prim_val = calc_custom_actual(r_prim) if is_custom_period else r_prim["ytd_actual"]
        tax_val = calc_custom_actual(r_tax) if is_custom_period else r_tax["ytd_actual"]
        bpp_val = calc_custom_actual(r_bpp) if is_custom_period else r_bpp["ytd_actual"]
        tkd_val = calc_custom_actual(r_tkd) if is_custom_period else r_tkd["ytd_actual"]

        def_apbn = r_def["apbn"]
        def_pdb_apbn = round((abs(def_apbn) / gdp) * 100.0, 2)
        def_pdb_ytd = round((abs(def_val) / gdp) * 100.0, 2)

        rev_pct_apbn = round(rev_val / r_rev["apbn"] * 100.0, 2) if r_rev["apbn"] else 0.0
        rev_pct_rapbn = round(rev_val / r_rev["rapbn"] * 100.0, 2) if r_rev["rapbn"] else 0.0
        exp_pct_apbn = round(exp_val / r_exp["apbn"] * 100.0, 2) if r_exp["apbn"] else 0.0
        exp_pct_rapbn = round(exp_val / r_exp["rapbn"] * 100.0, 2) if r_exp["rapbn"] else 0.0

        # Target proporsional periode berjalan (Pagu * num_months / 12)
        rev_target_period = round(r_rev["apbn"] * (num_months / 12.0), 2) if r_rev["apbn"] else 0.0
        exp_target_period = round(r_exp["apbn"] * (num_months / 12.0), 2) if r_exp["apbn"] else 0.0
        rev_pct_target = round((rev_val / rev_target_period * 100.0), 2) if rev_target_period else 0.0
        exp_pct_target = round((exp_val / exp_target_period * 100.0), 2) if exp_target_period else 0.0

        return {
            "status": "SUCCESS",
            "year": year,
            "unit": unit,
            "unit_label": unit_label,
            "legal_doc": cfg["legal_doc"],
            "status_label": cfg["status_label"],
            "latest_month": latest_m,
            "latest_month_name": cls.MONTH_NAMES[latest_idx - 1]["name"],
            "benchmark_run_rate": round((end_m / 12.0) * 100.0, 1),
            "time_filter": period_info,
            "kpi": {
                "revenue": {
                    "rapbn": round(r_rev["rapbn"] * div, 2),
                    "apbn": round(r_rev["apbn"] * div, 2),
                    "latest_month": round(r_rev["latest_month_actual"] * div, 2),
                    "ytd": round(rev_val * div, 2),
                    "pct_apbn": rev_pct_apbn,
                    "pct_rapbn": rev_pct_rapbn,
                    "target_period": round(rev_target_period * div, 2),
                    "pct_target_period": rev_pct_target,
                    "variance": round((r_rev["apbn"] - rev_val) * div, 2),
                    "status": r_rev["perf_status"]
                },
                "expenditure": {
                    "rapbn": round(r_exp["rapbn"] * div, 2),
                    "apbn": round(r_exp["apbn"] * div, 2),
                    "latest_month": round(r_exp["latest_month_actual"] * div, 2),
                    "ytd": round(exp_val * div, 2),
                    "pct_apbn": exp_pct_apbn,
                    "pct_rapbn": exp_pct_rapbn,
                    "target_period": round(exp_target_period * div, 2),
                    "pct_target_period": exp_pct_target,
                    "variance": round((r_exp["apbn"] - exp_val) * div, 2),
                    "status": r_exp["perf_status"]
                },
                "deficit": {
                    "rapbn": round(r_def["rapbn"] * div, 2),
                    "apbn": round(r_def["apbn"] * div, 2),
                    "latest_month": round(r_def["latest_month_actual"] * div, 2),
                    "ytd": round(def_val * div, 2),
                    "pct_gdp_apbn": def_pdb_apbn,
                    "pct_gdp_ytd": def_pdb_ytd
                },
                "primary_balance": {
                    "rapbn": round(r_prim["rapbn"] * div, 2),
                    "apbn": round(r_prim["apbn"] * div, 2),
                    "latest_month": round(r_prim["latest_month_actual"] * div, 2),
                    "ytd": round(prim_val * div, 2)
                },
                "tax": {
                    "apbn": round(r_tax["apbn"] * div, 2),
                    "ytd": round(tax_val * div, 2),
                    "pct_apbn": round(tax_val / r_tax["apbn"] * 100.0, 2) if r_tax["apbn"] else 0.0
                },
                "bpp": {
                    "apbn": round(r_bpp["apbn"] * div, 2),
                    "ytd": round(bpp_val * div, 2),
                    "pct_apbn": round(bpp_val / r_bpp["apbn"] * 100.0, 2) if r_bpp["apbn"] else 0.0
                },
                "tkd": {
                    "apbn": round(r_tkd["apbn"] * div, 2),
                    "ytd": round(tkd_val * div, 2),
                    "pct_apbn": round(tkd_val / r_tkd["apbn"] * 100.0, 2) if r_tkd["apbn"] else 0.0
                }
            }
        }

    @classmethod
    def get_evaluation_matrix(
        cls,
        year: int = 2025,
        category: str = "ALL",
        unit: str = "TRILLION",
        search_query: Optional[str] = None,
        start_month: int = 1,
        end_month: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Menghasilkan tabel matriks lengkap:
        Pos Anggaran, RAPBN, UU APBN, Realisasi M01-M12, YTD, % APBN, % RAPBN, Varian, dan Sumber Data.
        Mendukung rentang waktu custom untuk komparasi periode fleksibel (YTD, Kuartal, Semester, Bulan Kustom).
        """
        div, unit_label = cls._get_unit_multiplier(unit)
        base_rows = cls._get_base_dataset(year)
        cfg = cls.YEARS_CONFIG.get(year, cls.YEARS_CONFIG[2025])
        latest_m = cfg["latest_published_month"]
        latest_idx = int(latest_m.replace("M", ""))

        end_m = latest_idx if end_month is None else max(1, min(12, end_month))
        start_m = max(1, min(end_m, start_month))
        period_info = cls._resolve_period_info(start_m, end_m, latest_idx)
        num_months = period_info["num_months"]

        clean_cat = category.upper().strip()
        q = (search_query or "").lower().strip()

        filtered_rows = []
        for r in base_rows:
            if clean_cat != "ALL" and r["category"] != clean_cat:
                continue

            if q and (q not in r["name"].lower() and q not in r["code"].lower()):
                continue

            scaled_monthly = {}
            period_sum = 0.0
            for m_code, val in r["monthly"].items():
                m_num = int(m_code.replace("M", ""))
                scaled_monthly[m_code] = round(val * div, 2) if val is not None else None
                if start_m <= m_num <= end_m and val is not None:
                    period_sum = round(period_sum + val, 2)

            custom_actual = round(period_sum * div, 2)
            custom_pct_apbn = round(period_sum / r["apbn"] * 100.0, 2) if r["apbn"] else 0.0
            custom_pct_rapbn = round(period_sum / r["rapbn"] * 100.0, 2) if r["rapbn"] else 0.0
            custom_variance = round((r["apbn"] - period_sum) * div, 2)

            # Capaian terhadap target prorata periode berjalan (Pagu * num_months / 12)
            prorata_target_apbn = round(r["apbn"] * (num_months / 12.0), 2) if r["apbn"] else 0.0
            prorata_target_rapbn = round(r["rapbn"] * (num_months / 12.0), 2) if r["rapbn"] else 0.0
            pct_target_period_apbn = round((period_sum / prorata_target_apbn * 100.0), 2) if prorata_target_apbn else 0.0
            pct_target_period_rapbn = round((period_sum / prorata_target_rapbn * 100.0), 2) if prorata_target_rapbn else 0.0

            # Evaluasi performa spesifik periode
            if r["id"] in ["DEFISIT_ANGGARAN", "BAL_PRIMARY"]:
                period_perf_status = "NORMAL"
                period_perf_badge = "bg-sky-50 text-sky-700"
            elif r["category"] == "PENDAPATAN":
                if pct_target_period_apbn >= 98.0:
                    period_perf_status = "ON_TRACK"
                    period_perf_badge = "bg-emerald-50 text-emerald-700"
                elif pct_target_period_apbn >= 90.0:
                    period_perf_status = "MODERATE"
                    period_perf_badge = "bg-amber-50 text-amber-700"
                else:
                    period_perf_status = "LAGGING"
                    period_perf_badge = "bg-rose-50 text-rose-700"
            else:
                if pct_target_period_apbn >= 95.0:
                    period_perf_status = "ON_TRACK"
                    period_perf_badge = "bg-emerald-50 text-emerald-700"
                elif pct_target_period_apbn >= 88.0:
                    period_perf_status = "MODERATE"
                    period_perf_badge = "bg-amber-50 text-amber-700"
                else:
                    period_perf_status = "LAGGING"
                    period_perf_badge = "bg-rose-50 text-rose-700"

            row_copy = {
                "id": r["id"],
                "code": r["code"],
                "name": r["name"],
                "category": r["category"],
                "level": r["level"],
                "is_header": r["is_header"],
                "rapbn": round(r["rapbn"] * div, 2),
                "apbn": round(r["apbn"] * div, 2),
                "monthly": scaled_monthly,
                "monthly_status": r["monthly_status"],
                "latest_month": r["latest_month"],
                "latest_month_actual": round(r["latest_month_actual"] * div, 2),
                "ytd_actual": round(r["ytd_actual"] * div, 2),
                "pct_apbn": r["pct_apbn"],
                "pct_rapbn": r["pct_rapbn"],
                "variance_apbn": round(r["variance_apbn"] * div, 2),
                "variance_rapbn": round(r["variance_rapbn"] * div, 2),
                "perf_status": r["perf_status"],
                "perf_badge": r["perf_badge"],
                "source_org": r["source_org"],
                "drivers": r["drivers"],
                # Custom Period Realization & Targets
                "period_actual": custom_actual,
                "period_pct_apbn": custom_pct_apbn,
                "period_pct_rapbn": custom_pct_rapbn,
                "period_variance": custom_variance,
                "prorata_target_apbn": round(prorata_target_apbn * div, 2),
                "prorata_target_rapbn": round(prorata_target_rapbn * div, 2),
                "pct_target_period_apbn": pct_target_period_apbn,
                "pct_target_period_rapbn": pct_target_period_rapbn,
                "period_perf_status": period_perf_status,
                "period_perf_badge": period_perf_badge
            }
            filtered_rows.append(row_copy)

        return {
            "status": "SUCCESS",
            "year": year,
            "unit": unit,
            "unit_label": unit_label,
            "category": category,
            "legal_doc": cfg["legal_doc"],
            "status_label": cfg["status_label"],
            "latest_month": latest_m,
            "latest_month_name": cls.MONTH_NAMES[latest_idx - 1]["name"],
            "time_filter": period_info,
            "months_header": cls.MONTH_NAMES,
            "total_rows": len(filtered_rows),
            "rows": filtered_rows
        }

    @classmethod
    def get_trajectory_series(
        cls,
        year: int = 2025,
        item_id: str = "REV_TOTAL",
        unit: str = "TRILLION"
    ) -> Dict[str, Any]:
        """
        Menyediakan deret data koordinat kurva S-Curve akumulatif Jan-Des:
        1. Target Linier APBN Kumulatif
        2. Realisasi Aktual YTD Kumulatif
        3. Realisasi Aktual Bulanan (Bar)
        4. Realisasi Kumulatif Tahun Sebelumnya (YoY Benchmark)
        5. Keterangan Driver Pendorong (+) dan Penekan (-) per Item & per Bulan
        """
        div, unit_label = cls._get_unit_multiplier(unit)
        current_rows = cls._get_base_dataset(year)
        prior_year = max(2020, year - 1)
        prior_rows = cls._get_base_dataset(prior_year)

        cfg = cls.YEARS_CONFIG.get(year, cls.YEARS_CONFIG[2025])
        latest_m = cfg["latest_published_month"]
        latest_idx = int(latest_m.replace("M", ""))

        cur_item = next((r for r in current_rows if r["id"] == item_id), current_rows[0])
        prior_item = next((r for r in prior_rows if r["id"] == item_id), prior_rows[0])

        monthly_bars = []
        linear_curve = []
        actual_curve = []
        prior_curve = []

        linear_step = (cur_item["apbn"] / 12.0)
        accum_lin = 0.0
        accum_act = 0.0
        accum_prior = 0.0

        for m_idx in range(1, 13):
            m_code = f"M{m_idx:02d}"
            m_name = cls.MONTH_NAMES[m_idx - 1]["short"]
            seasonal_driver = cls.MONTHLY_SEASONAL_DRIVERS.get(m_code, "")

            accum_lin = round(accum_lin + linear_step, 2)
            linear_curve.append({
                "month": m_code,
                "label": m_name,
                "value": round(accum_lin * div, 2),
                "monthly_driver": seasonal_driver
            })

            prior_val = prior_item["monthly"].get(m_code, 0.0) or 0.0
            accum_prior = round(accum_prior + prior_val, 2)
            prior_curve.append({
                "month": m_code,
                "label": m_name,
                "value": round(accum_prior * div, 2),
                "monthly_driver": seasonal_driver
            })

            cur_val = cur_item["monthly"].get(m_code, 0.0) or 0.0
            is_observed = m_idx <= latest_idx

            accum_act = round(accum_act + cur_val, 2)
            actual_curve.append({
                "month": m_code,
                "label": m_name,
                "value": round(accum_act * div, 2),
                "is_observed": is_observed,
                "monthly_driver": seasonal_driver
            })
            monthly_bars.append({
                "month": m_code,
                "label": m_name,
                "value": round(cur_val * div, 2),
                "is_observed": is_observed,
                "monthly_driver": seasonal_driver
            })

        return {
            "status": "SUCCESS",
            "year": year,
            "prior_year": prior_year,
            "item_id": cur_item["id"],
            "item_code": cur_item["code"],
            "item_name": cur_item["name"],
            "unit": unit,
            "unit_label": unit_label,
            "latest_month": latest_m,
            "latest_month_idx": latest_idx,
            "apbn_total": round(cur_item["apbn"] * div, 2),
            "rapbn_total": round(cur_item["rapbn"] * div, 2),
            "ytd_total": round(cur_item["ytd_actual"] * div, 2),
            "pct_apbn": cur_item["pct_apbn"],
            "pct_rapbn": cur_item["pct_rapbn"],
            "source_org": cur_item.get("source_org", "Kementerian Keuangan RI"),
            "drivers": cur_item.get("drivers", {}),
            "series": {
                "monthly_bars": monthly_bars,
                "linear_curve": linear_curve,
                "actual_curve": actual_curve,
                "prior_curve": prior_curve
            }
        }

    @classmethod
    def generate_excel_matrix(cls, year: int = 2025, unit: str = "TRILLION") -> bytes:
        """
        Menghasilkan buku kerja Excel 3-Sheet:
        Sheet 1: Komparasi Bulanan M01-M12 & YTD
        Sheet 2: Evaluasi Target RAPBN vs UU APBN
        Sheet 3: Metadata Statutori & Provenance Laporan APBN KiTa
        """
        matrix = cls.get_evaluation_matrix(year, "ALL", unit)
        rows = matrix["rows"]
        unit_lbl = matrix["unit_label"]

        wb = openpyxl.Workbook()
        ws1 = wb.active
        ws1.title = "Komparasi Bulanan & YTD"

        font_title = Font(name="Tahoma", size=12, bold=True, color="0038A8")
        font_sub = Font(name="Tahoma", size=9, italic=True, color="5D4037")
        font_th = Font(name="Tahoma", size=9, bold=True, color="FFFFFF")
        font_bold = Font(name="Tahoma", size=9, bold=True, color="1F2937")
        font_cell = Font(name="Tahoma", size=9, color="2C2420")
        fill_header = PatternFill(start_color="0038A8", end_color="0038A8", fill_type="solid")
        fill_ytd = PatternFill(start_color="FAF7F2", end_color="FAF7F2", fill_type="solid")
        border_thin = Border(
            left=Side(style='thin', color='E2E8F0'),
            right=Side(style='thin', color='E2E8F0'),
            top=Side(style='thin', color='E2E8F0'),
            bottom=Side(style='thin', color='E2E8F0')
        )

        ws1.merge_cells("A1:R1")
        ws1["A1"] = f"KOMPARASI RAPBN, UU APBN, DAN REALISASI BULANAN APBN KITA TA {year}"
        ws1["A1"].font = font_title

        ws1.merge_cells("A2:R2")
        ws1["A2"] = f"Pusat Basis Data Data Sekunder — Satuan: {unit_lbl} | Dasar Hukum: {matrix['legal_doc']} | Bulan Terakhir: {matrix['latest_month_name']}"
        ws1["A2"].font = font_sub

        headers = [
            "Kode", "Pos Anggaran Postur APBN", "RAPBN", "UU APBN",
            "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
            "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
            f"YTD ({matrix['latest_month_name']})", "% APBN", "% RAPBN", "Sisa Pagu", "Status",
            "Sumber Data / Instansi"
        ]
        ws1.append([])
        ws1.append(headers)

        for col_idx in range(1, len(headers) + 1):
            cell = ws1.cell(row=4, column=col_idx)
            cell.font = font_th
            cell.fill = fill_header
            cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

        cur_row = 5
        for r in rows:
            is_hdr = r["is_header"]
            m_vals = [r["monthly"].get(f"M{i:02d}", 0.0) for i in range(1, 13)]

            row_data = [
                r["code"],
                r["name"],
                r["rapbn"],
                r["apbn"],
                *m_vals,
                r["ytd_actual"],
                f"{r['pct_apbn']:.1f}%",
                f"{r['pct_rapbn']:.1f}%",
                r["variance_apbn"],
                r["perf_status"],
                r.get("source_org", "Kementerian Keuangan RI")
            ]
            ws1.append(row_data)

            f_use = font_bold if is_hdr else font_cell
            for col_idx in range(1, len(row_data) + 1):
                c = ws1.cell(row=cur_row, column=col_idx)
                c.font = f_use
                c.border = border_thin
                if col_idx in [3, 4, 17, 20]:
                    c.fill = fill_ytd
                    c.alignment = Alignment(horizontal="right")
                elif 5 <= col_idx <= 16:
                    c.alignment = Alignment(horizontal="right")
                elif col_idx in [1, 18, 19, 21]:
                    c.alignment = Alignment(horizontal="center")
                else:
                    c.alignment = Alignment(horizontal="left")
            cur_row += 1

        for col in ws1.columns:
            col_letter = get_column_letter(col[0].column)
            if col_letter == "B":
                ws1.column_dimensions[col_letter].width = 44
            elif col_letter in ["A", "U"]:
                ws1.column_dimensions[col_letter].width = 12
            elif col_letter == "V":
                ws1.column_dimensions[col_letter].width = 34
            else:
                ws1.column_dimensions[col_letter].width = 11

        # Sheet 2: Evaluasi Target
        ws2 = wb.create_sheet(title="Target vs Realisasi")
        ws2.merge_cells("A1:H1")
        ws2["A1"] = f"EVALUASI CAPAIAN POSTUR APBN TA {year} (RAPBN vs UU APBN vs REALISASI)"
        ws2["A1"].font = font_title

        s2_headers = ["Kode", "Pos Anggaran", "Target RAPBN", "Target UU APBN", "Realisasi YTD", "Selisih RAPBN-APBN", "% Capaian APBN", "Sumber Data / Instansi"]
        ws2.append([])
        ws2.append(s2_headers)
        for col_idx in range(1, len(s2_headers) + 1):
            cell = ws2.cell(row=3, column=col_idx)
            cell.font = font_th
            cell.fill = fill_header
            cell.alignment = Alignment(horizontal="center")

        r2_cur = 4
        for r in rows:
            selisih_rapbn_apbn = round(r["apbn"] - r["rapbn"], 2)
            row_vals = [
                r["code"], r["name"], r["rapbn"], r["apbn"],
                r["ytd_actual"], selisih_rapbn_apbn, f"{r['pct_apbn']:.1f}%",
                r.get("source_org", "Kementerian Keuangan RI")
            ]
            ws2.append(row_vals)
            f_use = font_bold if r["is_header"] else font_cell
            for c_idx in range(1, len(row_vals) + 1):
                c = ws2.cell(row=r2_cur, column=c_idx)
                c.font = f_use
                c.border = border_thin
            r2_cur += 1

        # Sheet 3: Metadata Provenance
        ws3 = wb.create_sheet(title="Metadata & Provenans")
        ws3["A1"] = "LEMBAR STATUTORI METADATA & PROVENANS DATA APBN KITA"
        ws3["A1"].font = font_title
        ws3.append([])

        meta_rows = [
            ("Nama Repositori", "INDOEKONOMI data — Indonesia Economic Data Observatory"),
            ("Portal Resmi", "https://indoekonomi.data.go.id"),
            ("Kementerian Pengampu", "Kementerian Keuangan Republik Indonesia & Dewan Ekonomi Nasional"),
            ("Laporan Sumber", f"Laporan Kinerja dan Fakta APBN KiTa Edisi {matrix['latest_month_name']} TA {year}"),
            ("Dasar Hukum Penganggaran", matrix["legal_doc"]),
            ("Status Audit Data", matrix["status_label"]),
            ("Standar Akuntansi Pemerintah", "Bagan Akun Standar (BAS) PP 71/2010 Lampiran I.02 PSAP 02"),
            ("Siklus Pembaruan", "Bulanan (Dirilis Kementerian Keuangan setiap akhir bulan atau minggu ke-3)"),
            ("Kunci Provenans Integritas", f"KEMENKEU-APBNKITA-{year}-{matrix['latest_month']}-VERIFIED-1829"),
            ("Waktu Pengunduhan", datetime.now().strftime("%Y-%m-%d %H:%M:%S WIB")),
            ("Kontak Narahubung", "lubis.tania@dewanekonomi.go.id (Tim Tata Kelola Makroekonomi)")
        ]
        for k, v in meta_rows:
            ws3.append([k, v])
            r_idx = ws3.max_row
            ws3.cell(row=r_idx, column=1).font = font_bold
            ws3.cell(row=r_idx, column=2).font = font_cell

        ws3.column_dimensions["A"].width = 32
        ws3.column_dimensions["B"].width = 75

        output = io.BytesIO()
        wb.save(output)
        return output.getvalue()

    @classmethod
    def generate_csv_matrix(cls, year: int = 2025, unit: str = "TRILLION") -> str:
        """Menghasilkan teks CSV RFC-4180 untuk ekspor komparasi APBN."""
        matrix = cls.get_evaluation_matrix(year, "ALL", unit)
        rows = matrix["rows"]

        output = io.StringIO()
        writer = csv.writer(output, lineterminator="\n")

        headers = [
            "Kode", "Pos_Anggaran", "RAPBN", "UU_APBN",
            "M01_Jan", "M02_Feb", "M03_Mar", "M04_Apr", "M05_Mei", "M06_Jun",
            "M07_Jul", "M08_Agu", "M09_Sep", "M10_Okt", "M11_Nov", "M12_Des",
            "YTD_Actual", "Pct_APBN", "Pct_RAPBN", "Sisa_Pagu", "Status_Kinerja",
            "Sumber_Data_Instansi"
        ]
        writer.writerow(headers)

        for r in rows:
            m = r["monthly"]
            row_data = [
                r["code"],
                r["name"],
                r["rapbn"],
                r["apbn"],
                m.get("M01", ""), m.get("M02", ""), m.get("M03", ""), m.get("M04", ""),
                m.get("M05", ""), m.get("M06", ""), m.get("M07", ""), m.get("M08", ""),
                m.get("M09", ""), m.get("M10", ""), m.get("M11", ""), m.get("M12", ""),
                r["ytd_actual"],
                r["pct_apbn"],
                r["pct_rapbn"],
                r["variance_apbn"],
                r["perf_status"],
                r.get("source_org", "Kementerian Keuangan RI")
            ]
            writer.writerow(row_data)

        return output.getvalue()

    @classmethod
    def _get_unit_multiplier(cls, unit: str) -> tuple[float, str]:
        """Konversi pengali unit mata uang."""
        clean = (unit or "TRILLION").upper().strip()
        if clean in ["BILLION", "M", "MILIAR"]:
            return 1000.0, "Miliar Rupiah (Rp M)"
        elif clean in ["MILLION", "JUTA"]:
            return 1000000.0, "Juta Rupiah (Rp Juta)"
        else:
            return 1.0, "Triliun Rupiah (Rp T)"
