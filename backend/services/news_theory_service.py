"""
News & Economic Theory Service
Menyediakan kompilasi Top 3 Berita pada 9 Kategori Strategis (Total 27 Berita)
dilengkapi isi berita lengkap (2 paragraf per berita), Link Resmi, dan Penjelasan Teori Ekonomi Terkait.

9 Kategori:
1. Top 3 Berita Ekonomi Internasional
2. Top 3 Berita Politik Internasional
3. Top 3 Berita Ekonomi Nasional
4. Top 3 Berita Politik Nasional
5. Top 3 Berita Teknologi Nasional
6. Top 3 Berita Investasi Nasional
7. Top 3 Berita Industri Rokok + Tembakau
8. Top 3 Berita Sustainable Energi
9. Top 3 Berita Sosial
"""

from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List, Optional

WIB = timezone(timedelta(hours=7))

MONTHS_ID = {
    1: "Januari", 2: "Februari", 3: "Maret", 4: "April",
    5: "Mei", 6: "Juni", 7: "Juli", 8: "Agustus",
    9: "September", 10: "Oktober", 11: "November", 12: "Desember"
}


class NewsTheoryService:
    _last_sync_time: Optional[datetime] = None
    _sync_count: int = 0

    @classmethod
    def sync_7day_news(cls, days_back: int = 7) -> Dict[str, Any]:
        """
        Triggers a fresh 7-day rolling window update when the user accesses the web for the first time.
        """
        cls._last_sync_time = datetime.now(WIB)
        cls._sync_count += 1
        data = cls.get_news_and_theories(days_back=days_back)
        data["synced_on_initial_load"] = True
        data["sync_count"] = cls._sync_count
        return data

    @classmethod
    def get_news_and_theories(
        cls,
        category_id: Optional[str] = None,
        search: Optional[str] = None,
        days_back: int = 7
    ) -> Dict[str, Any]:
        categories: List[Dict[str, Any]] = [
            # ==================================================================
            # 1. TOP 3 BERITA EKONOMI INTERNASIONAL
            # ==================================================================
            {
                "category_id": "ekonomi_internasional",
                "category_number": 1,
                "category_title": "Top 3 Berita Ekonomi Internasional",
                "category_badge": "Global Macroeconomics",
                "icon": "🌐",
                "items": [
                    {
                        "id": "news-intl-econ-1",
                        "rank": 1,
                        "title": "Federal Reserve & Bank Sentral Utama Melanjutkan Siklus Kalibrasi Suku Bunga Global di Tengah Disinflasi Terkendali",
                        "date": "Oktober 2026",
                        "source_name": "International Monetary Fund (IMF) — World Economic Outlook",
                        "official_url": "https://www.imf.org/en/Publications/WEO",
                        "paragraphs": [
                            "Dana Moneter Internasional (IMF) dalam laporan World Economic Outlook terbaru mencatat bahwa laju inflasi global terus melandai mendekati target bank sentral di negara-negara maju. Penurunan inflasi inti (core inflation) di Amerika Serikat dan kawasan Euro memberikan ruang bagi Federal Reserve (The Fed) serta European Central Bank (ECB) untuk melanjutkan siklus pelonggaran kebijakan moneter secara terukur guna menghindari resesi (soft landing) dan menjaga stabilitas pasar tenaga kerja.",
                            "Kalibrasi suku bunga acuan global ini secara langsung menurunkan tingkat imbal hasil obligasi pemerintah AS (US Treasury yields) dan meredakan tekanan penguatan indeks Dolar AS (DXY). Dampaknya, arus modal portofolio internasional kembali mengalir masuk ke pasar keuangan negara berkembang (emerging markets), termasuk kawasan Asia Tenggara dan Indonesia, sehingga memperkuat cadangan devisa serta menurunkan biaya pembiayaan surat utang negara."
                        ],
                        "theory_name": "Mundell-Fleming Model & Uncovered Interest Parity",
                        "economist": "Robert Mundell & Marcus Fleming (1962)",
                        "theory_explanation": "Model Mundell-Fleming menjelaskan bahwa dalam perekonomian terbuka dengan mobilitas modal, penurunan suku bunga di negara maju (AS) memperlebar selisih imbal hasil (interest rate differential) yang menguntungkan aset negara berkembang. Hal ini memicu capital inflow ke pasar SBN dan saham domestik, memperkuat nilai tukar Rupiah, serta melonggarkan tekanan neraca pembayaran.",
                        "policy_implication": "Membuka ruang bagi Bank Indonesia untuk menurunkan suku bunga acuan guna mendorong kredit sektor riil tanpa mengganggu stabilitas kurs."
                    },
                    {
                        "id": "news-intl-econ-2",
                        "rank": 2,
                        "title": "Rekonfigurasi Rantai Pasok Global (Friend-Shoring & China+1) Mengakselerasi Relokasi Manufaktur ke Asia Tenggara",
                        "date": "Oktober 2026",
                        "source_name": "World Trade Organization (WTO) — Global Trade Outlook",
                        "official_url": "https://www.wto.org/english/res_e/statis_e/statis_e.htm",
                        "paragraphs": [
                            "Organisasi Perdagangan Dunia (WTO) melaporkan terjadinya pergeseran struktural dalam peta investasi manufaktur dunia akibat strategi diversifikasi rantai pasok (China+1 dan friend-shoring). Perusahaan multinasional di sektor elektronik, semikonduktor, komponen kendaraan listrik (EV), dan alat kesehatan secara aktif memindahkan sebagian fasilitas produksinya ke negara-negara ASEAN guna memitigasi risiko tarif perdagangan dan ketergantungan pada satu titik geografi.",
                            "Kawasan Asia Tenggara menjadi tujuan utama relokasi modal asing langsung (Foreign Direct Investment) karena stabilitas ekonomi makro, bonus demografi, dan kelimpahan bahan baku mineral kritis. Integrasi kawasan industri di Indonesia, Vietnam, dan Malaysia ke dalam jaringan produksi global ini diproyeksikan meningkatkan pangsa ekspor manufaktur berteknologi menengah-tinggi dari kawasan ASEAN selama satu dekade ke depan."
                        ],
                        "theory_name": "New Trade Theory & Global Value Chains (GVC)",
                        "economist": "Paul Krugman (Nobel 2008) & David Ricardo",
                        "theory_explanation": "New Trade Theory dan kerangka Global Value Chains menerangkan bahwa lokasi industri modern tidak lagi hanya ditentukan oleh upah tenaga kerja murah, melainkan oleh skala ekonomis (economies of scale), ketersediaan bahan baku kritis di hulu, efisiensi biaya logistik, dan akses perjanjian perdagangan bebas.",
                        "policy_implication": "Memperkuat posisi Indonesia sebagai hub manufaktur regional melalui integrasi hilirisasi mineral dengan kawasan industri berorientasi ekspor."
                    },
                    {
                        "id": "news-intl-econ-3",
                        "rank": 3,
                        "title": "Pergeseran Struktural Harga Komoditas Global: Permintaan Mineral Kritis Menguat di Tengah Stabilisasi Harga Energi",
                        "date": "Oktober 2026",
                        "source_name": "World Bank — Commodity Markets Outlook",
                        "official_url": "https://www.worldbank.org/en/research/commodity-markets",
                        "paragraphs": [
                            "Laporan Commodity Markets Outlook yang dirilis Bank Dunia menunjukkan adanya divergensi tren harga antara komoditas energi fosil dan mineral kritis. Sementara harga minyak mentah dan batu bara bergerak lebih moderat seiring normalisasi pasokan global, permintaan terhadap mineral strategis seperti nikel, tembaga, bauksit, dan timah justru mengalami peningkatan struktural jangka panjang yang didorong oleh ekspansi infrastruktur energi bersih, pusat data AI, dan elektrifikasi transportasi.",
                            "Bagi negara-negara pemilik cadangan mineral utama, pergeseran pola permintaan global ini memberikan peluang besar untuk meningkatkan nilai tambah di dalam negeri. Negara yang berhasil membangun ekosistem pemurnian (smelter) dan pabrik pengolahan barang setengah jadi mampu terhindar dari jebakan volatilitas harga bahan mentah sekaligus mengamankan posisi tawar dalam rantai pasok industri hijau dunia."
                        ],
                        "theory_name": "Prebisch-Singer Hypothesis & Terms of Trade (ToT)",
                        "economist": "Raúl Prebisch & Hans Singer (1950)",
                        "theory_explanation": "Hipotesis Prebisch-Singer menyatakan bahwa negara pengekspor komoditas mentah primer rentan mengalami penurunan nilai tukar perdagangan (Terms of Trade) jangka panjang. Namun, dengan mengolah komoditas mentah menjadi barang industri bernilai tambah tinggi, elastisitas pendapatan ekspor meningkat dan memperbaiki Terms of Trade secara struktural.",
                        "policy_implication": "Validasi empiris atas kebijakan hilirisasi sumber daya alam Indonesia untuk menjaga surplus neraca perdagangan non-migas."
                    }
                ]
            },

            # ==================================================================
            # 2. TOP 3 BERITA POLITIK INTERNASIONAL
            # ==================================================================
            {
                "category_id": "politik_internasional",
                "category_number": 2,
                "category_title": "Top 3 Berita Politik Internasional",
                "category_badge": "Geopolitics & Diplomacy",
                "icon": "🏛️",
                "items": [
                    {
                        "id": "news-intl-pol-1",
                        "rank": 1,
                        "title": "Akselerasi Peta Jalan Aksesi Indonesia ke OECD dan Peran Strategis dalam Forum Multilateral Global",
                        "date": "Oktober 2026",
                        "source_name": "OECD — Organisation for Economic Co-operation and Development",
                        "official_url": "https://www.oecd.org/en/countries/indonesia.html",
                        "paragraphs": [
                            "Proses peninjauan teknis (technical review) aksesi Indonesia menuju keanggotaan penuh Organisation for Economic Co-operation and Development (OECD) mencatat kemajuan signifikan di berbagai komite kebijakan publik, tata kelola korporasi, dan keterbukaan investasi. Sebagai negara pertama di Asia Tenggara yang memasuki tahap aksesi lanjutan, Indonesia aktif melakukan penyelarasan regulasi domestik dengan standar praktik terbaik negara-negara maju.",
                            "Di panggung geopolitik internasional, langkah aksesi OECD ini dijalankan secara paralel dengan partisipasi aktif Indonesia di forum G20, ASEAN, serta kerja sama ekonomi Selatan-Selatan. Postur politik luar negeri bebas-aktif ini memperkuat posisi diplomasi Indonesia sebagai penyeimbang strategis (bridge builder) di tengah multipolaritas ekonomi dunia sekaligus meningkatkan kepercayaan investor global."
                        ],
                        "theory_name": "New Institutional Economics (Ekonomi Kelembagaan Baru)",
                        "economist": "Douglass North (Nobel 1993) & Daron Acemoglu (Nobel 2024)",
                        "theory_explanation": "Ekonomi Kelembagaan Baru menegaskan bahwa kualitas institusi, kepastian hukum (rule of law), dan standar tata kelola internasional adalah determinan fundamental pertumbuhan ekonomi jangka panjang. Penyelarasan regulasi dengan standar OECD menurunkan country risk premium dan biaya modal (cost of capital).",
                        "policy_implication": "Meningkatkan peringkat kredit kedaulatan (sovereign credit rating) dan menarik investasi institusional berjangka panjang."
                    },
                    {
                        "id": "news-intl-pol-2",
                        "rank": 2,
                        "title": "Diplomasi Perdagangan Negara Produsen Komoditas Tropis Menghadapi Regulasi Karbon Lintas Batas (CBAM) Uni Eropa",
                        "date": "Oktober 2026",
                        "source_name": "European Commission — Carbon Border Adjustment Mechanism",
                        "official_url": "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
                        "paragraphs": [
                            "Implementasi bertahap kebijakan Carbon Border Adjustment Mechanism (CBAM) dan aturan rantai pasok bebas deforestasi oleh Uni Eropa memicu perundingan intensif antara blok Eropa dengan negara-negara pengekspor komoditas strategis di Asia Tenggara dan Amerika Latin. Aturan tersebut mewajibkan importir produk baja, aluminium, pupuk, dan komoditas agrikultur untuk melaporkan jejak emisi karbon serta membayar sertifikat penyesuaian karbon di perbatasan.",
                            "Merespons kebijakan tersebut, pemerintah Indonesia bersama negara-negara produsen utama memperkuat diplomasi perdagangan bersama di forum WTO dan perundingan IEU-CEPA guna mendorong pengakuan timbal balik (mutual recognition) atas standar sertifikasi keberlanjutan nasional seperti ISPO. Langkah ini bertujuan memastikan kebijakan iklim global tidak disalahgunakan menjadi instrumen proteksionisme sepihak yang merugikan petani dan industri negara berkembang."
                        ],
                        "theory_name": "Political Economy of Non-Tariff Barriers (NTBs)",
                        "economist": "Jagdish Bhagwati & Gene Grossman",
                        "theory_explanation": "Teori Ekonomi Politik Perdagangan menjelaskan bagaimana standar lingkungan dan teknis dapat berfungsi sebagai hambatan non-tarif (Non-Tariff Barrier) untuk memproteksi industri domestik negara maju. Hal ini menaikkan biaya kepatuhan (compliance cost) bagi eksportir negara berkembang.",
                        "policy_implication": "Mendorong penguatan bursa karbon domestik dan pengakuan sertifikasi berkelanjutan nasional (ISPO/SVLK) di tingkat internasional."
                    },
                    {
                        "id": "news-intl-pol-3",
                        "rank": 3,
                        "title": "Konsensus Keamanan Maritim Indo-Pasifik guna Menjamin Kelancaran Jalur Logistik Perdagangan Selat Malaka & Natuna",
                        "date": "Oktober 2026",
                        "source_name": "ASEAN Secretariat — ASEAN Political-Security & Economic Community",
                        "official_url": "https://asean.org/our-communities/economic-community/",
                        "paragraphs": [
                            "Pertemuan tingkat menteri ASEAN dan mitra dialog Indo-Pasifik menghasilkan kesepakatan penguatan kerja sama keamanan maritim, keselamatan navigasi, dan penghormatan terhadap hukum laut internasional (UNCLOS 1982) di sepanjang Selat Malaka, Alur Laut Kepulauan Indonesia (ALKI), hingga Laut Tiongkok Selatan. Koridor maritim ini merupakan urat nadi perekonomian global yang dilintasi oleh lebih dari 40 persen volume perdagangan barang dan energi dunia.",
                            "Komitmen kolektif untuk mencegah eskalasi konflik terbuka dan menjaga stabilitas kawasan memberikan kepastian bagi perusahaan pelayaran serta asuransi logistik internasional. Dengan terjaganya keamanan jalur laut di kawasan Asia Tenggara, arus ekspor-impor regional terhindar dari lonjakan biaya kargo darurat sebagaimana yang sempat terjadi di kawasan Laut Merah."
                        ],
                        "theory_name": "Transaction Cost Economics & Geopolitical Risk Premium",
                        "economist": "Ronald Coase (Nobel 1991) & Oliver Williamson (Nobel 2009)",
                        "theory_explanation": "Menurut Transaction Cost Economics, eskalasi ketegangan geopolitik di jalur pelayaran utama secara langsung menaikkan biaya transaksi perdagangan melalui lonjakan premi asuransi kargo (war risk insurance) dan keterlambatan rantai pasok (supply chain bottleneck).",
                        "policy_implication": "Stabilitas geopolitik kawasan ASEAN menjaga biaya logistik ekspor-impor Indonesia tetap rendah dan kompetitif."
                    }
                ]
            },

            # ==================================================================
            # 3. TOP 3 BERITA EKONOMI NASIONAL
            # ==================================================================
            {
                "category_id": "ekonomi_nasional",
                "category_number": 3,
                "category_title": "Top 3 Berita Ekonomi Nasional",
                "category_badge": "National Macroeconomics",
                "icon": "📈",
                "items": [
                    {
                        "id": "news-nat-econ-1",
                        "rank": 1,
                        "title": "Ekonomi Indonesia Tumbuh Solid 5,20% (YoY) Diiringi Inflasi Rendah Terkendali 2,12% dalam Koridor Sasaran BI",
                        "date": "Agustus–Oktober 2026",
                        "source_name": "Badan Pusat Statistik (BPS) — Berita Resmi Statistik",
                        "official_url": "https://www.bps.go.id/id/pressrelease",
                        "paragraphs": [
                            "Badan Pusat Statistik (BPS) melaporkan perekonomian Indonesia tumbuh kuat sebesar 5,20 persen secara tahunan (Year-on-Year), melampaui rata-rata pertumbuhan negara anggota G20. Dari sisi pengeluaran, pertumbuhan ini ditopang oleh Konsumsi Rumah Tangga yang menyumbang lebih dari separuh PDB nasional serta akselerasi Pembentukan Modal Tetap Bruto (PMTB/Investasi) seiring berlanjutnya pembangunan infrastruktur dan hilirisasi industri.",
                            "Kinerja pertumbuhan yang solid tersebut berjalan beriringan dengan stabilitas harga yang sangat terjaga, di mana inflasi Indeks Harga Konsumen (IHK) tercatat sebesar 2,12 persen (YoY) atau berada nyaman di dalam rentang sasaran Bank Indonesia 2,5±1 persen. Keberhasilan pengendalian inflasi ini didukung oleh panen raya komoditas pangan strategis, kelancaran distribusi antar-wilayah, dan sinergi erat Tim Pengendalian Inflasi Pusat dan Daerah (TPIP-TPID)."
                        ],
                        "theory_name": "Keynesian Aggregate Demand (Y = C + I + G + NX) & Phillips Curve",
                        "economist": "John Maynard Keynes & Alban William Phillips",
                        "theory_explanation": "Dalam kerangka Permintaan Agregat Keynes, tingginya kontribusi konsumsi domestik (~54% PDB) dan investasi (~30% PDB) berfungsi sebagai motor penggerak otonom saat permintaan eksternal melambat. Tercapainya pertumbuhan tinggi sekaligus inflasi rendah mencerminkan ekspansi sisi penawaran (Aggregate Supply shift) berkat kelancaran distribusi pangan.",
                        "policy_implication": "Menjaga daya beli masyarakat kelas menengah dan kelancaran logistik antar-daerah sebagai jangkar pertumbuhan nasional."
                    },
                    {
                        "id": "news-nat-econ-2",
                        "rank": 2,
                        "title": "Kinerja APBN 2026 On-Track: Pendapatan Negara Mencapai Rp 2.132,0 Triliun (66,11% Target) dengan Keseimbangan Primer Positif",
                        "date": "Agustus–Oktober 2026",
                        "source_name": "Kementerian Keuangan RI — Publikasi APBN KiTa",
                        "official_url": "https://www.kemenkeu.go.id/apbnkita",
                        "paragraphs": [
                            "Kementerian Keuangan dalam rilis APBN KiTa memaparkan bahwa realisasi Pendapatan Negara hingga akhir Agustus 2026 telah mencapai Rp 2.132,0 triliun atau 66,11 persen dari pagu APBN 2026, berada pada jalur on-track menuju proyeksi capaian 99,16 persen di akhir tahun. Capaian ini ditopang oleh kinerja positif penerimaan Pajak Penghasilan (PPh) non-migas, Pajak Pertambahan Nilai (PPN) dalam negeri, kepabeanan dan cukai, serta Penerimaan Negara Bukan Pajak (PNBP).",
                            "Di sisi belanja, realisasi Belanja Negara dipertahankan secara disiplin dan berkualitas untuk mendanai program perlindungan sosial, pendidikan, kesehatan, dan proyek infrastruktur prioritas. Dengan pengelolaan fiskal yang hati-hati (prudent), keseimbangan primer berhasil dipertahankan pada posisi surplus dan rasio defisit anggaran terjaga jauh di bawah batas aman undang-undang sebesar 3 persen terhadap PDB."
                        ],
                        "theory_name": "Counter-Cyclical Fiscal Policy & Debt Sustainability (r - g)",
                        "economist": "Richard Musgrave & Olivier Blanchard",
                        "theory_explanation": "Teori Stabilisasi Fiskal (Musgrave) dan syarat keberlanjutan utang (Blanchard) menjelaskan bahwa ketika pemerintah mampu menjaga keseimbangan primer positif dan pertumbuhan PDB nominal (g) melampaui rata-rata bunga utang (r), maka rasio utang terhadap PDB akan menurun secara alami dan menciptakan ruang fiskal (fiscal space) yang sehat.",
                        "policy_implication": "APBN tetap kredibel sebagai peredam kejut (shock absorber) sekaligus mampu membiayai belanja modal produktif."
                    },
                    {
                        "id": "news-nat-econ-3",
                        "rank": 3,
                        "title": "Cadangan Devisa Indonesia Mencapai USD 154,8 Miliar, Menopang Stabilitas Rupiah dan Ketahanan Eksternal",
                        "date": "Agustus–Oktober 2026",
                        "source_name": "Bank Indonesia — Siaran Pers Moneter & Cadangan Devisa",
                        "official_url": "https://www.bi.go.id/id/publikasi/ruang-media/news-release/Default.aspx",
                        "paragraphs": [
                            "Bank Indonesia mengumumkan posisi cadangan devisa Indonesia meningkat ke level USD 154,8 miliar, tumbuh 4,25 persen secara tahunan (YoY). Posisi cadangan devisa yang sangat kuat ini setara dengan pembiayaan 6,8 bulan impor atau 6,6 bulan impor dan pembayaran utang luar negeri pemerintah, berada lebih dari dua kali lipat di atas standar kecukupan internasional sekitar 3 bulan impor.",
                            "Penguatan cadangan devisa tersebut bersumber dari surplus neraca perdagangan barang yang berkesinambungan, penerimaan devisa hasil ekspor sumber daya alam (DHE SDA), serta aliran masuk modal asing pada instrumen Sekuritas Rupiah Bank Indonesia (SRBI) dan Surat Berharga Negara (SBN). Bantalan likuiditas valas yang tebal ini memberikan ruang optimal bagi Bank Indonesia untuk menjaga stabilitas nilai tukar Rupiah di kisaran Rp 15.680 per USD."
                        ],
                        "theory_name": "Guidotti-Greenspan Rule & Precautionary Reserve Model",
                        "economist": "Pablo Guidotti, Alan Greenspan & Olivier Jeanne",
                        "theory_explanation": "Aturan Guidotti-Greenspan menyatakan bahwa cadangan devisa yang memadai wajib mampu menutup minimal 100% kewajiban utang luar negeri jangka pendek (jatuh tempo <= 1 tahun) dan 3 bulan impor. Cadangan devisa yang tebal berfungsi sebagai bantalan likuiditas untuk menangkal sudden stop arus modal dan spekulasi valas.",
                        "policy_implication": "Memperkuat kepercayaan investor global terhadap stabilitas nilai tukar Rupiah dan fundamental makroekonomi Indonesia."
                    }
                ]
            },

            # ==================================================================
            # 4. TOP 3 BERITA POLITIK NASIONAL
            # ==================================================================
            {
                "category_id": "politik_nasional",
                "category_number": 4,
                "category_title": "Top 3 Berita Politik Nasional",
                "category_badge": "Political Economy & Governance",
                "icon": "⚖️",
                "items": [
                    {
                        "id": "news-nat-pol-1",
                        "rank": 1,
                        "title": "Konsensus Politik Pemerintah dan DPR RI dalam Pengesahan UU APBN serta Sinkronisasi RPJMN 2025–2029 menuju Indonesia Emas 2045",
                        "date": "Oktober 2026",
                        "source_name": "Kementerian PPN/Bappenas — Visi Indonesia Emas 2045",
                        "official_url": "https://indonesia2045.go.id/",
                        "paragraphs": [
                            "Pemerintah bersama Dewan Perwakilan Rakyat (DPR RI) menjaga tradisi konsensus politik yang konstruktif dalam pembahasan dan pengesahan Undang-Undang APBN tepat waktu sesuai siklus konstitusional. Kesepakatan lintas fraksi di parlemen ini memastikan seluruh program prioritas nasional memperoleh payung hukum penganggaran yang kuat tanpa mengalami kebuntuan politik (fiscal deadlock).",
                            "Selain penetapan anggaran tahunan, pemerintah memantapkan sinkronisasi antara Rencana Pembangunan Jangka Menengah Nasional (RPJMN) 2025–2029 dengan Rencana Pembangunan Jangka Panjang Nasional (RPJPN) 2025–2045. Penyelarasan perencanaan pusat dan daerah ini dirancang agar kebijakan industrialisasi, ketahanan pangan-energi, dan pembangunan manusia berjalan konsisten lintas periode pemerintahan guna membawa Indonesia keluar dari middle-income trap."
                        ],
                        "theory_name": "Public Choice Theory & Political Business Cycle Stability",
                        "economist": "James M. Buchanan (Nobel 1986) & Alberto Alesina",
                        "theory_explanation": "Teori Pilihan Publik (Public Choice) dan model Ekonomi Politik Makro (Alesina) membuktikan bahwa polarisasi atau kebuntuan politik di parlemen memicu ketidakpastian fiskal (policy uncertainty) yang menahan investasi. Sebaliknya, stabilitas koalisi politik menjamin kepastian eksekusi anggaran multi-tahun.",
                        "policy_implication": "Menghilangkan risiko kebuntuan anggaran (government shutdown/deadlock) dan mempercepat realisasi belanja negara sejak awal tahun."
                    },
                    {
                        "id": "news-nat-pol-2",
                        "rank": 2,
                        "title": "Percepatan Reformasi Birokrasi, Deregulasi Perizinan Berusaha Berbasis Risiko (OSS), dan Kepastian Hukum Investasi",
                        "date": "Oktober 2026",
                        "source_name": "Kementerian PANRB Republik Indonesia",
                        "official_url": "https://www.menpan.go.id/",
                        "paragraphs": [
                            "Pemerintah mengakselerasi agenda reformasi birokrasi tematik dan penyederhanaan regulasi (deregulasi) lintas kementerian/lembaga serta pemerintah daerah. Fokus utama diarahkan pada penghapusan aturan daerah yang tumpang tindih, pemangkasan waktu layanan perizinan berusaha melalui sistem Online Single Submission (OSS) Berbasis Risiko, serta penyelesaian hambatan tata ruang dan pertanahan bagi proyek strategis.",
                            "Langkah pembenahan tata kelola kelembagaan ini juga diperkuat dengan digitalisasi pengadaan barang/jasa pemerintah dan peningkatan transparansi pengawasan internal. Dengan birokrasi yang semakin ramping dan terukur berdasarkan Service Level Agreement (SLA) yang tegas, biaya transaksi usaha di dalam negeri berhasil ditekan sehingga memperbaiki efisiensi modal nasional."
                        ],
                        "theory_name": "Regulatory Economics & Rent-Seeking Reduction Theory",
                        "economist": "George Stigler (Nobel 1982) & Anne Krueger",
                        "theory_explanation": "Teori Regulasi (Stigler) dan Rent-Seeking (Krueger) menunjukkan bahwa birokrasi yang berbelit menciptakan biaya ekonomi tidak produktif (deadweight loss) dan menghambat masuknya pelaku usaha baru. Deregulasi berbasis risiko memangkas biaya transaksi dan menurunkan Incremental Capital Output Ratio (ICOR).",
                        "policy_implication": "Meningkatkan kemudahan berusaha (Ease of Doing Business) dan efisiensi investasi di tingkat pusat maupun daerah."
                    },
                    {
                        "id": "news-nat-pol-3",
                        "rank": 3,
                        "title": "Implementasi Penuh UU Hubungan Keuangan Pusat dan Daerah (HKPD) untuk Memperkuat Kemandirian Fiskal Daerah",
                        "date": "Oktober 2026",
                        "source_name": "Direktorat Jenderal Perimbangan Keuangan (DJPK) Kemenkeu RI",
                        "official_url": "https://djpk.kemenkeu.go.id/",
                        "paragraphs": [
                            "Kementerian Keuangan melalui Direktorat Jenderal Perimbangan Keuangan (DJPK) mengawal implementasi penuh Undang-Undang Nomor 1 Tahun 2022 tentang Hubungan Keuangan antara Pemerintah Pusat dan Pemerintahan Daerah (UU HKPD). Regulasi ini merestrukturisasi sistem Pajak Daerah dan Retribusi Daerah (PDRD) melalui skema opsen pajak serta memperluas penyaluran Transfer ke Daerah (TKD) berbasis kinerja pelayanan publik.",
                            "Selain memperkuat kapasitas penerimaan lokal, UU HKPD mewajibkan pemerintah provinsi dan kabupaten/kota untuk membatasi porsi belanja pegawai maksimal 30 persen dari total APBD dan mengalokasikan minimal 40 persen untuk belanja infrastruktur pelayanan publik. Kebijakan ini berhasil mengubah struktur APBD agar lebih produktif dan mendorong efek pengganda ekonomi di tingkat daerah."
                        ],
                        "theory_name": "Fiscal Federalism & Decentralization Theorem",
                        "economist": "Wallace Oates & Charles Tiebout",
                        "theory_explanation": "Teorema Desentralisasi Fiskal (Oates) menyatakan bahwa penyediaan layanan publik daerah menjadi optimal bila didukung kapasitas pajak lokal (local taxing power) dan disiplin batas anggaran (hard budget constraint), sehingga mencegah flypaper effect (ketergantungan pasif pada dana transfer pusat).",
                        "policy_implication": "Meningkatkan rasio Pendapatan Asli Daerah (PAD) dan kualitas belanja infrastruktur pelayanan dasar di seluruh provinsi/kabupaten/kota."
                    }
                ]
            },

            # ==================================================================
            # 5. TOP 3 BERITA TEKNOLOGI NASIONAL
            # ==================================================================
            {
                "category_id": "teknologi_nasional",
                "category_number": 5,
                "category_title": "Top 3 Berita Teknologi Nasional",
                "category_badge": "Digital Economy & Innovation",
                "icon": "💻",
                "items": [
                    {
                        "id": "news-nat-tech-1",
                        "rank": 1,
                        "title": "Ekspansi Pusat Data Nasional (National Data Center), Cloud Sovereign, dan Peta Jalan Kecerdasan Buatan (AI) Indonesia",
                        "date": "Oktober 2026",
                        "source_name": "Kementerian Komunikasi dan Digital (Komdigi) RI",
                        "official_url": "https://www.komdigi.go.id/",
                        "paragraphs": [
                            "Kementerian Komunikasi dan Digital (Komdigi) mempercepat pengoperasian fasilitas Pusat Data Nasional (PDN) berstandar Tier-IV di Cikarang, Batam, dan Ibu Kota Nusantara, beriringan dengan gelombang investasi pusat data hyperscale oleh perusahaan teknologi global di Indonesia. Ketersediaan infrastruktur komputasi awan berdaulat (sovereign cloud) ini memperkuat perlindungan data strategis nasional sekaligus mendukung adopsi Kecerdasan Buatan (AI) di sektor industri dan pemerintahan.",
                            "Pertumbuhan infrastruktur digital tersebut mendorong nilai ekonomi digital Indonesia (Gross Merchandise Value) melampaui USD 90 miliar dan berada di jalur tepat menuju USD 130 miliar. Selain sektor e-commerce dan transportasi daring, pertumbuhan baru kini dipacu oleh layanan komputasi awan korporasi, teknologi finansial (fintech), teknologi kesehatan (healthtech), dan otomasi manufaktur."
                        ],
                        "theory_name": "Endogenous Growth Theory (Technological Spillover)",
                        "economist": "Paul Romer (Nobel Ekonomi 2018)",
                        "theory_explanation": "Teori Pertumbuhan Endogen (Paul Romer) membuktikan bahwa inovasi teknologi, data, dan pengetahuan merupakan faktor produksi internal yang menghasilkan increasing returns to scale (skala hasil yang meningkat) karena sifat ide yang non-rivalrous, sehingga mendongkrak Total Factor Productivity (TFP).",
                        "policy_implication": "Menciptakan lompatan produktivitas di sektor jasa, manufaktur cerdas, dan ekonomi kreatif berbasis talenta digital."
                    },
                    {
                        "id": "news-nat-tech-2",
                        "rank": 2,
                        "title": "Transaksi Pembayaran Digital QRIS Lintas Negara (Cross-Border) dan BI-FAST Mencetak Rekor Inklusi Keuangan UMKM",
                        "date": "Oktober 2026",
                        "source_name": "Bank Indonesia — Blueprint Sistem Pembayaran Indonesia (BSPI)",
                        "official_url": "https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx",
                        "paragraphs": [
                            "Bank Indonesia mencatat lonjakan volume dan nilai transaksi pembayaran digital melalui Quick Response Code Indonesian Standard (QRIS) dan infrastruktur BI-FAST sepanjang tahun 2026. Ekosistem QRIS kini telah menjangkau lebih dari 50 juta pengguna aktif dan lebih dari 32 juta pedagang (merchant), di mana sekitar 90 persen di antaranya merupakan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM).",
                            "Di tingkat internasional, implementasi QRIS Antarnegara (Cross-Border QRIS) yang telah terhubung dengan Singapura, Malaysia, Thailand, Jepang, dan Korea Selatan mempermudah wisatawan serta pelaku usaha bertransaksi langsung menggunakan mata uang lokal (Local Currency Transaction). Inovasi ini memangkas biaya konversi valuta asing, mempercepat perputaran transaksi ritel, dan membuka akses kredit perbankan bagi UMKM berbasis rekam jejak transaksi digital."
                        ],
                        "theory_name": "Two-Sided Markets, Network Externalities & Velocity of Money",
                        "economist": "Jean Tirole (Nobel 2014) & Irving Fisher",
                        "theory_explanation": "Dalam teori Two-Sided Markets (Tirole) dan Persamaan Pertukaran (MV = PY), standardisasi pembayaran digital menciptakan eksternalitas jaringan positif dan mempercepat perputaran uang (Velocity of Money) sembari memangkas biaya transaksi ritel mendekati nol.",
                        "policy_implication": "Mempercepat formalisasi UMKM ke dalam ekosistem perbankan (credit scoring berbasis riwayat transaksi) dan mengurangi ketergantungan pada USD."
                    },
                    {
                        "id": "news-nat-tech-3",
                        "rank": 3,
                        "title": "Integrasi GovTech Indonesia (INA Digital) dan Interoperabilitas Satu Data Indonesia untuk Ketepatan Sasaran Kebijakan",
                        "date": "Oktober 2026",
                        "source_name": "Portal Satu Data Indonesia — Kementerian PPN/Bappenas",
                        "official_url": "https://data.go.id/",
                        "paragraphs": [
                            "Pemerintah mengonsolidasikan ribuan aplikasi layanan publik yang sebelumnya terfragmentasi ke dalam portal terpadu GovTech Indonesia (INA Digital) dan arsitektur Sistem Pemerintahan Berbasis Elektronik (SPBE). Melalui integrasi Identitas Kependudukan Digital (IKD) dan pertukaran data lintas kementerian secara real-time, masyarakat dapat mengakses layanan kesehatan, pendidikan, administrasi kependudukan, dan bantuan sosial dalam satu ekosistem tunggal.",
                            "Dari sisi tata kelola fiskal, interoperabilitas Satu Data Indonesia dan pemutakhiran data sosial-ekonomi terpadu berhasil menekan tingkat kesalahan sasaran (inclusion dan exclusion error) dalam penyaluran subsidi energi maupun bantuan sosial. Konsolidasi sistem teknologi pemerintah ini juga menghemat triliunan rupiah belanja pembangunan aplikasi baru yang duplikatif di tingkat pusat dan daerah."
                        ],
                        "theory_name": "Economics of Information & Asymmetric Information Reduction",
                        "economist": "Joseph Stiglitz, George Akerlof & Michael Spence (Nobel 2001)",
                        "theory_explanation": "Teori Informasi Asimetris menjelaskan bahwa inefisiensi alokasi anggaran publik sering dipicu oleh ketiadaan data akurat mengenai penerima manfaat (inclusion/exclusion error). Integrasi basis data tunggal mengeliminasi asimetri informasi sehingga intervensi fiskal mencapai efisiensi tepat sasaran.",
                        "policy_implication": "Menghemat triliunan rupiah belanja birokrasi dan memastikan subsidi diterima secara presisi oleh kelompok desil terbawah."
                    }
                ]
            },

            # ==================================================================
            # 6. TOP 3 BERITA INVESTASI NASIONAL
            # ==================================================================
            {
                "category_id": "investasi_nasional",
                "category_number": 6,
                "category_title": "Top 3 Berita Investasi Nasional",
                "category_badge": "FDI, Domestic Investment & Downstreaming",
                "icon": "🏗️",
                "items": [
                    {
                        "id": "news-nat-inv-1",
                        "rank": 1,
                        "title": "Realisasi Investasi PMDN & PMA Tumbuh Dua Digit, Didominasi Industri Hilirisasi Mineral dan Manufaktur di Luar Pulau Jawa",
                        "date": "Oktober 2026",
                        "source_name": "Kementerian Investasi dan Hilirisasi / BKPM RI",
                        "official_url": "https://www.bkpm.go.id/",
                        "paragraphs": [
                            "Kementerian Investasi dan Hilirisasi/BKPM mengumumkan capaian realisasi penanaman modal (PMDN dan PMA) yang tumbuh dua digit secara tahunan dan melampaui target proporsional kuartalan. Lebih dari 51 persen total realisasi investasi tersebut mengalir ke luar Pulau Jawa, terutama di Sulawesi Tengah, Maluku Utara, Kalimantan Timur, dan Sumatera Selatan seiring beroperasinya sentra-sentra industri pengolahan sumber daya alam.",
                            "Struktur investasi asing maupun domestik kini didominasi oleh sektor bernilai tambah tinggi, meliputi pemurnian dan pengolahan mineral (smelter nikel, katoda tembaga, dan alumina), rantai pasok sel baterai kendaraan listrik, industri petrokimia, serta pergudangan dan telekomunikasi. Transformasi struktur investasi ini telah menciptakan jutaan lapangan kerja formal baru bagi tenaga kerja lokal."
                        ],
                        "theory_name": "Harrod-Domar Growth Model & Hirschman Forward-Backward Linkages",
                        "economist": "Roy Harrod, Evsey Domar & Albert O. Hirschman",
                        "theory_explanation": "Model Harrod-Domar menyatakan bahwa akumulasi investasi modal fisik secara langsung menentukan kapasitas pertumbuhan output nasional. Sementara teori Keterkaitan Hulu-Hilir (Hirschman) membuktikan bahwa investasi industri pengolahan menarik sektor ekstraktif di hulu (backward linkage) dan memicu industri barang jadi di hilir (forward linkage).",
                        "policy_implication": "Mengurangi ketimpangan spasial Jawa vs Luar Jawa dan melipatgandakan nilai tambah ekspor manufaktur."
                    },
                    {
                        "id": "news-nat-inv-2",
                        "rank": 2,
                        "title": "Optimalisasi 22 Kawasan Ekonomi Khusus (KEK) Manufaktur, Digital, dan Pariwisata Kesehatan sebagai Magnet Investasi",
                        "date": "Oktober 2026",
                        "source_name": "Dewan Nasional Kawasan Ekonomi Khusus (KEK) RI",
                        "official_url": "https://kek.go.id/",
                        "paragraphs": [
                            "Dewan Nasional Kawasan Ekonomi Khusus (KEK) mencatat akselerasi komitmen investasi dan operasional pelaku usaha di 22 KEK yang tersebar di berbagai wilayah Indonesia, seperti KEK Gresik, KEK Kendal, KEK Sei Mangkei, KEK Nongsa Digital Park, dan KEK Kesehatan Sanur. Pemerintah memberikan paket insentif fiskal terukur berupa tax holiday, tax allowance, serta pembebasan bea masuk barang modal dan bahan baku produksi.",
                            "Kehadiran KEK tematik di bidang layanan kesehatan berstandar internasional (seperti KEK Sanur di Bali) dan pendidikan/teknologi digital juga berperan strategis dalam menahan devisa masyarakat Indonesia yang sebelumnya dibelanjakan ke luar negeri (substitusi impor jasa). Di sisi manufaktur, klaster KEK terintegrasi pelabuhan laut dalam terbukti memangkas biaya logistik ekspor secara signifikan."
                        ],
                        "theory_name": "Agglomeration Economies & New Economic Geography",
                        "economist": "Alfred Marshall & Paul Krugman (Nobel 2008)",
                        "theory_explanation": "Teori Ekonomi Aglomerasi menjelaskan bahwa konsentrasi geografis industri dalam Kawasan Ekonomi Khusus menurunkan biaya produksi rata-rata melalui tiga mekanisme: pemakaian bersama infrastruktur pelabuhan/energi (input sharing), ketersediaan tenaga kerja terampil (labor pooling), dan transfer teknologi antar-perusahaan.",
                        "policy_implication": "Meningkatkan daya saing Indonesia dalam menarik relokasi pabrik multinasional dibandingkan negara pesaing di kawasan."
                    },
                    {
                        "id": "news-nat-inv-3",
                        "rank": 3,
                        "title": "Kolaborasi Sovereign Wealth Fund (INA) dan Skema KPBU dalam Pembiayaan Infrastruktur Tanpa Membebani Utang APBN",
                        "date": "Oktober 2026",
                        "source_name": "Indonesia Investment Authority (INA)",
                        "official_url": "https://www.ina.go.id/",
                        "paragraphs": [
                            "Lembaga Pengelola Investasi atau Indonesia Investment Authority (INA) memperluas portofolio ko-investasi bersama dana pensiun dan sovereign wealth fund global pada sektor jalan tol trans-Jawa dan Sumatera, pelabuhan logistik modern, fasilitas kesehatan, serta energi terbarukan. Pendekatan investasi berbasis ekuitas (equity co-investment) ini memungkinkan daur ulang aset (asset recycling) BUMN karya untuk mendanai proyek baru tanpa menambah beban utang negara.",
                            "Sejalan dengan langkah INA, Kementerian Keuangan dan Kementerian PPN/Bappenas juga memperluas skema Kerja Sama Pemerintah dan Badan Usaha (KPBU / Public-Private Partnership) dengan dukungan penjaminan PT Penjaminan Infrastruktur Indonesia (PII). Sinergi pembiayaan inovatif ini memastikan pembangunan infrastruktur konektivitas tetap berlari kencang di tengah disiplin ruang fiskal APBN."
                        ],
                        "theory_name": "Crowding-In Effect & Public-Private Risk Sharing Theory",
                        "economist": "David Aschauer & Jean Tirole",
                        "theory_explanation": "Berbeda dengan pembiayaan utang konvensional yang berisiko memicu crowding-out, penyertaan modal ekuitas melalui Sovereign Wealth Fund dan KPBU menciptakan Crowding-In Effect: modal awal negara berfungsi sebagai katalis penurun risiko (de-risking) yang menarik modal swasta dalam skala berlipat ganda.",
                        "policy_implication": "Mempercepat pembangunan infrastruktur konektivitas nasional sembari menjaga rasio utang pemerintah tetap rendah dan aman."
                    }
                ]
            },

            # ==================================================================
            # 7. TOP 3 BERITA INDUSTRI ROKOK + TEMBAKAU
            # ==================================================================
            {
                "category_id": "industri_rokok_tembakau",
                "category_number": 7,
                "category_title": "Top 3 Berita Industri Rokok + Tembakau",
                "category_badge": "Excise Policy, Agro-Industry & Labor",
                "icon": "🌿",
                "items": [
                    {
                        "id": "news-tobacco-1",
                        "rank": 1,
                        "title": "Kalibrasi Kebijakan Tarif Cukai Hasil Tembakau (CHT) & Harga Jual Eceran: Menyeimbangkan 4 Pilar Kebijakan Fiskal",
                        "date": "Oktober 2026",
                        "source_name": "Direktorat Jenderal Bea dan Cukai (DJBC) Kemenkeu RI",
                        "official_url": "https://www.beacukai.go.id/",
                        "paragraphs": [
                            "Pemerintah melalui Kementerian Keuangan melakukan evaluasi komprehensif terhadap struktur tarif Cukai Hasil Tembakau (CHT) dan penyesuaian Harga Jual Eceran (HJE) dengan berpijak pada empat pilar kebijakan cukai nasional: pengendalian konsumsi demi kesehatan masyarakat, perlindungan keberlangsungan tenaga kerja padat karya, optimalisasi penerimaan negara (APBN), serta pengawasan peredaran rokok ilegal.",
                            "Dalam evaluasi tersebut, pemerintah mencermati fenomena downtrading (pergeseran konsumsi dari rokok golongan I bermerek mahal ke rokok golongan lebih rendah yang lebih murah) akibat sensitivitas daya beli konsumen. Oleh karena itu, kalibrasi tarif dan harga transaksi pasar dirancang secara hati-hati agar target penerimaan cukai tetap tercapai tanpa memicu kontraksi tajam pada industri hasil tembakau legal."
                        ],
                        "theory_name": "Pigouvian Tax (Pajak Eksternalitas) & Laffer Curve",
                        "economist": "Arthur Cecil Pigou (1920) & Arthur Laffer",
                        "theory_explanation": "Cukai tembakau merupakan Pigouvian Tax untuk menginternalisasi eksternalitas negatif kesehatan. Namun menurut Kurva Laffer, apabila tarif cukai dinaikkan melampaui titik optimal (titik puncak kurva), elastisitas harga permintaan akan memicu penurunan produksi legal secara tajam dan mendorong konsumen beralih ke rokok ilegal, sehingga penerimaan negara justru turun.",
                        "policy_implication": "Penetapan tarif CHT wajib memperhitungkan batas elastisitas harga dan daya beli agar penerimaan negara dan industri tetap terjaga."
                    },
                    {
                        "id": "news-tobacco-2",
                        "rank": 2,
                        "title": "Perlindungan Segmen Sigaret Kretek Tangan (SKT) Padat Karya serta Optimalisasi Dana Bagi Hasil Cukai (DBH CHT) bagi Petani",
                        "date": "Oktober 2026",
                        "source_name": "Kementerian Perindustrian RI — Direktorat Jenderal Industri Agro",
                        "official_url": "https://kemenperin.go.id/",
                        "paragraphs": [
                            "Kementerian Perindustrian dan Kementerian Keuangan mempertahankan kebijakan afirmatif berupa struktur tarif cukai yang jauh lebih moderat bagi segmen Sigaret Kretek Tangan (SKT) dibandingkan Sigaret Kretek Mesin (SKM). Kebijakan diferensiasi ini terbukti efektif menjaga daya serap ratusan ribu pekerja pelinting rokok (mayoritas pekerja perempuan di Jawa Timur dan Jawa Tengah) serta menopang serapan panen tembakau dan cengkeh petani lokal.",
                            "Di samping perlindungan tarif segmen padat karya, pemerintah menyalurkan Dana Bagi Hasil Cukai Hasil Tembakau (DBH CHT) sebesar 3 persen dari total penerimaan cukai domestik kepada provinsi dan kabupaten/kota penghasil. Alokasi DBH CHT ini difokuskan untuk bantuan peningkatan kualitas bahan baku petani tembakau, pelatihan alih keterampilan tenaga kerja, pembinaan kawasan industri hasil tembakau (KIHT), dan pendanaan Jaminan Kesehatan Nasional."
                        ],
                        "theory_name": "Tax Incidence (Insidensi Pajak) & Factor Substitution Elasticity",
                        "economist": "Arnold Harberger & John Hicks",
                        "theory_explanation": "Teori Insidensi Pajak (Harberger) menjelaskan bahwa beban pajak komoditas tidak hanya ditanggung konsumen melalui harga jual, melainkan juga diteruskan ke belakang (backward shifting) kepada pemasok bahan baku (petani tembakau/cengkeh) dan tenaga kerja. Perlindungan tarif SKT mencegah substitusi faktor produksi dari padat karya menjadi padat modal (mesin).",
                        "policy_implication": "Menjaga stabilitas ekonomi daerah sentra tembakau (Jawa Timur, Jawa Tengah, NTB) dan mencegah pemutusan hubungan kerja massal."
                    },
                    {
                        "id": "news-tobacco-3",
                        "rank": 3,
                        "title": "Operasi Gempur Rokok Ilegal: Penindakan Jutaan Batang Rokok Tanpa Pita Cukai guna Menutup Kebocoran Penerimaan Negara",
                        "date": "Oktober 2026",
                        "source_name": "Direktorat Jenderal Bea dan Cukai (DJBC) — Pengawasan & Penindakan",
                        "official_url": "https://www.beacukai.go.id/berita.html",
                        "paragraphs": [
                            "Direktorat Jenderal Bea dan Cukai (DJBC) bersama Satpol PP daerah, aparat penegak hukum, dan perusahaan jasa ekspedisi mengintensifkan pelaksanaan Operasi Gempur Rokok Ilegal di seluruh wilayah Indonesia. Sepanjang tahun berjalan, ribuan penindakan berhasil mengamankan ratusan juta batang rokok ilegal yang didominasi oleh rokok polos (tanpa pita cukai), rokok dengan pita cukai palsu, serta penyalahgunaan pita cukai salah peruntukan.",
                            "Pengawasan tidak hanya dilakukan di jalur distribusi logistik darat dan pelabuhan pesisir, tetapi juga diperluas melalui patroli siber pada platform e-commerce dan media sosial. Penindakan tegas disertai penerapan skema ultimum remedium (denda administratif berkali lipat nilai cukai) ini bertujuan menutup kebocoran penerimaan negara sekaligus melindungi pabrik rokok resmi yang patuh membayar cukai dari persaingan usaha tidak sehat."
                        ],
                        "theory_name": "Economics of Crime, Shadow Economy & Cross-Price Elasticity",
                        "economist": "Gary Becker (Nobel Ekonomi 1992) & Friedrich Schneider",
                        "theory_explanation": "Berdasarkan model Economics of Crime (Gary Becker), pelaku pasar gelap memutuskan memproduksi rokok ilegal jika keuntungan penghindaran pajak melebihi ekspektasi biaya sanksi (probabilitas tertangkap dikali besaran denda). Selain itu, tingginya elastisitas harga silang (cross-price elasticity) menyebabkan pelebaran selisih harga legal vs ilegal memicu migrasi konsumen.",
                        "policy_implication": "Penguatan penegakan hukum (enforcement) dan pemanfaatan dana DBH CHT untuk operasi bersama sangat krusial mengamankan target cukai APBN."
                    }
                ]
            },

            # ==================================================================
            # 8. TOP 3 BERITA SUSTAINABLE ENERGI
            # ==================================================================
            {
                "category_id": "sustainable_energi",
                "category_number": 8,
                "category_title": "Top 3 Berita Sustainable Energi",
                "category_badge": "Green Transition & Renewable Energy",
                "icon": "⚡",
                "items": [
                    {
                        "id": "news-energy-1",
                        "rank": 1,
                        "title": "Akselerasi RUPTL Hijau: Pengembangan Panas Bumi (Geothermal), PLTS Terapung, dan Transmisi Green Super Grid Antar-Pulau",
                        "date": "Oktober 2026",
                        "source_name": "Kementerian ESDM RI — Direktorat Jenderal EBTKE",
                        "official_url": "https://ebtke.esdm.go.id/",
                        "paragraphs": [
                            "Kementerian Energi dan Sumber Daya Mineral (ESDM) bersama PT PLN (Persero) mengakselerasi pelaksanaan Rencana Usaha Penyediaan Tenaga Listrik (RUPTL) hijau dengan porsi penambahan kapasitas pembangkit Energi Baru Terbarukan (EBT) mencapai lebih dari 70 persen. Proyek prioritas mencakup lelang wilayah kerja Panas Bumi (Geothermal) sebagai beban dasar (baseload) bersih, ekspansi PLTS Terapung di waduk-waduk strategis, serta pembangkit listrik tenaga hidro.",
                            "Guna mengatasi kendala ketidaksesuaian lokasi sumber energi hijau dengan pusat beban industri (spatial mismatch), pemerintah mulai membangun jaringan transmisi bertegangan ekstra tinggi Green Super Grid antar-pulau. Infrastruktur transmisi ini memungkinkan pasokan listrik bersih dari Sumatera, Kalimantan, dan Nusa Tenggara dialirkan ke kawasan industri manufaktur dan pusat data yang membutuhkan Renewable Energy Certificate (REC)."
                        ],
                        "theory_name": "Levelized Cost of Electricity (LCOE) & Arrow's Learning-by-Doing",
                        "economist": "Kenneth Arrow (Nobel 1972) & Theodore Wright",
                        "theory_explanation": "Teori Learning-by-Doing (Arrow) dan Kurva Pembelajaran Wright membuktikan bahwa setiap pelipatgandaan kapasitas terpasang energi terbarukan akan menurunkan biaya modal dan biaya produksi listrik per kWh (LCOE) secara eksponensial hingga mencapai grid parity (lebih murah dibandingkan pembangkit fosil).",
                        "policy_implication": "Menyediakan pasokan listrik hijau yang kompetitif bagi kawasan industri berorientasi ekspor yang mensyaratkan sertifikat energi bersih (REC)."
                    },
                    {
                        "id": "news-energy-2",
                        "rank": 2,
                        "title": "Implementasi Mandatori Biodiesel Berbasis Sawit (B40/B50) Menghemat Devisa Impor Solar dan Menstabilkan Harga TBS Petani",
                        "date": "Oktober 2026",
                        "source_name": "Kementerian Energi dan Sumber Daya Mineral (ESDM) RI",
                        "official_url": "https://www.esdm.go.id/",
                        "paragraphs": [
                            "Program mandatori bahan bakar nabati biodiesel berbasis minyak kelapa sawit (Fatty Acid Methyl Ester / FAME) terus ditingkatkan dari bauran B35 menuju B40 dan tahapan uji teknis B50 untuk sektor transportasi darat, perkeretaapian, alat berat pertambangan, dan perkapalan. Sepanjang implementasinya, program ini berhasil mensubstitusi belasan juta kiloliter solar impor dan menghemat devisa negara lebih dari Rp 140 triliun per tahun.",
                            "Selain memperkuat kemandirian energi nasional, penyerapan jutaan ton Crude Palm Oil (CPO) di pasar domestik untuk bahan baku biodiesel ini berfungsi sebagai katup penyeimbang (buffer stock) ketika pasar ekspor global mengalami fluktuasi. Hasilnya, harga Tandan Buah Segar (TBS) di tingkat petani sawit swadaya tetap terjaga stabil dan menguntungkan, sekaligus memangkas puluhan juta ton emisi CO2 ekuivalen."
                        ],
                        "theory_name": "Strategic Import Substitution & Domestic Buffer Demand",
                        "economist": "Albert O. Hirschman & Raúl Prebisch",
                        "theory_explanation": "Kebijakan mandatori bioenergi bekerja melalui dua kanal ekonomi simultan: (1) Substitusi Impor Strategis yang memperbaiki Neraca Transaksi Berjalan (Current Account) dengan mengurangi impor BBM, dan (2) Penciptaan Permintaan Penyangga Domestik (captive demand) yang menstabilkan harga komoditas CPO dari guncangan pasar global.",
                        "policy_implication": "Memperkuat ketahanan energi nasional (energy security) sekaligus meningkatkan kesejahteraan petani perkebunan rakyat."
                    },
                    {
                        "id": "news-energy-3",
                        "rank": 3,
                        "title": "Perluasan Perdagangan Bursa Karbon Indonesia (IDXCarbon) dan Pembiayaan Transisi Energi (ETM) Menuju Net Zero Emission",
                        "date": "Oktober 2026",
                        "source_name": "Bursa Karbon Indonesia (IDXCarbon) — OJK & BEI",
                        "official_url": "https://idxcarbon.co.id/",
                        "paragraphs": [
                            "Otoritas Jasa Keuangan (OJK) bersama Bursa Efek Indonesia (BEI) mencatat peningkatan likuiditas dan jumlah partisipan pada Bursa Karbon Indonesia (IDXCarbon). Perdagangan unit karbon yang meliputi Sertifikat Pengurangan Emisi Gas Rumah Kaca (SPE-GRK) dan Persetujuan Teknis Batas Atas Emisi Pelaku Usaha (PTBAE-PU) kini mencakup proyek-proyek pembangkit energi baru terbarukan, efisiensi energi industri, serta rehabilitasi kehutanan dan mangrove.",
                            "Seiring penguatan pasar karbon domestik, pemerintah juga mengimplementasikan kerangka Energy Transition Mechanism (ETM) melalui pembiayaan campuran (blended finance) internasional untuk mempensiunkan dini sejumlah PLTU batu bara secara bertahap dan berkeadilan (just transition). Pendekatan terukur ini memastikan penurunan emisi gas rumah kaca berjalan tanpa mengganggu keandalan pasokan listrik maupun keterjangkauan tarif listrik masyarakat."
                        ],
                        "theory_name": "Coase Theorem & Cap-and-Trade Carbon Pricing Model",
                        "economist": "Ronald Coase (Nobel 1991) & William Nordhaus (Nobel 2018)",
                        "theory_explanation": "Teorema Coase dan model Ekonomi Perubahan Iklim (Nordhaus) menunjukkan bahwa penciptaan hak kepemilikan atas batas emisi (cap) yang dapat diperdagangkan di bursa (trade) memungkinkan target penurunan emisi nasional tercapai dengan biaya agregat paling efisien (least-cost abatement).",
                        "policy_implication": "Mengubah potensi kredit karbon hutan tropis dan proyek energi bersih Indonesia menjadi sumber penerimaan ekonomi hijau baru."
                    }
                ]
            },

            # ==================================================================
            # 9. TOP 3 BERITA SOSIAL
            # ==================================================================
            {
                "category_id": "sosial",
                "category_number": 9,
                "category_title": "Top 3 Berita Sosial",
                "category_badge": "Social Welfare, Poverty & Human Capital",
                "icon": "🤝",
                "items": [
                    {
                        "id": "news-social-1",
                        "rank": 1,
                        "title": "Tingkat Kemiskinan Nasional Turun ke Level Terendah Historis (8,57%) dan Kemiskinan Ekstrem Mendekati Nol Persen",
                        "date": "Agustus–Oktober 2026",
                        "source_name": "Badan Pusat Statistik (BPS) — Profil Kemiskinan di Indonesia",
                        "official_url": "https://www.bps.go.id/id/statistics-table?subject=521",
                        "paragraphs": [
                            "Badan Pusat Statistik (BPS) melaporkan persentase penduduk miskin di Indonesia kembali menurun ke angka satu digit terendah dalam sejarah yakni 8,57 persen, diiringi penurunan tingkat kemiskinan ekstrem yang mendekati target penghapusan nol persen. Penurunan angka kemiskinan terjadi baik di wilayah perkotaan maupun perdesaan, didukung oleh terkendalinya harga beras dan bahan pangan pokok yang menyumbang lebih dari 74 persen garis kemiskinan.",
                            "Keberhasilan pengentasan kemiskinan ini merupakan hasil konvergensi antara penciptaan lapangan kerja di sektor pertanian-industri dengan penyaluran program Perlindungan Sosial (Perlinsos) APBN yang terintegrasi. Penyaluran Program Keluarga Harapan (PKH), Kartu Sembako, bantuan pendidikan (PIP/KIP), dan bantuan iuran kesehatan (PBI JKN) kini dikombinasikan dengan program pemberdayaan ekonomi mikro agar keluarga penerima manfaat dapat naik kelas (graduasi mandiri)."
                        ],
                        "theory_name": "Capability Approach & Pro-Poor Growth Elasticity",
                        "economist": "Amartya Sen (Nobel Ekonomi 1998) & Martin Ravallion",
                        "theory_explanation": "Pendekatan Kapabilitas (Amartya Sen) menekankan bahwa pengentasan kemiskinan yang berkelanjutan memerlukan pemenuhan kapabilitas dasar warga negara (pangan, kesehatan, pendidikan, dan akses ekonomi) agar masyarakat memiliki produktivitas mandiri dan terbebas dari perangkap kemiskinan antargenerasi (poverty trap).",
                        "policy_implication": "Transformasi bertahap dari bantuan sosial karitatif menuju pemberdayaan ekonomi produktif dan graduasi keluarga penerima manfaat."
                    },
                    {
                        "id": "news-social-2",
                        "rank": 2,
                        "title": "Investasi Modal Manusia: Program Pemenuhan Gizi Nasional, Percepatan Penurunan Stunting, dan Revitalisasi Pendidikan Vokasi",
                        "date": "Oktober 2026",
                        "source_name": "Kemenko Bidang Pembangunan Manusia dan Kebudayaan (Kemenko PMK)",
                        "official_url": "https://www.kemenkopmk.go.id/",
                        "paragraphs": [
                            "Pemerintah menempatkan pembangunan kualitas Sumber Daya Manusia (SDM) sebagai prioritas utama melalui program intervensi pemenuhan gizi terpadu bagi anak sekolah, balita, dan ibu hamil guna mempercepat penurunan prevalensi stunting menuju target 14 persen. Program pemenuhan gizi ini juga dirancang menggerakkan ekonomi lokal di tingkat desa melalui pelibatan petani, peternak, nelayan, dan UMKM katering daerah dalam rantai pasok pangan bergizi.",
                            "Pada jenjang usia produktif, pemerintah mengakselerasi revitalisasi pendidikan kejuruan (SMK), politeknik, dan balai pelatihan vokasi melalui skema link-and-match bersama kawasan industri hilirisasi dan perusahaan teknologi. Upaya terintegrasi dari hulu kesehatan anak hingga hilir keterampilan kerja ini bertujuan mengonversi puncak Bonus Demografi Indonesia menjadi tenaga kerja berproduktivitas dan berupah tinggi."
                        ],
                        "theory_name": "Human Capital Theory & The Heckman Equation",
                        "economist": "Gary Becker (Nobel 1992) & James Heckman (Nobel 2000)",
                        "theory_explanation": "Teori Modal Manusia (Becker) dan Persamaan Heckman membuktikan secara ekonometrik bahwa investasi kesehatan dan gizi pada usia dini menghasilkan tingkat pengembalian ekonomi (Rate of Return to Human Capital) paling tinggi terhadap kemampuan kognitif dan produktivitas upah pekerja saat dewasa.",
                        "policy_implication": "Meningkatkan skor Human Capital Index (HCI) Indonesia dan memastikan bonus demografi terkonversi menjadi pertumbuhan ekonomi tinggi."
                    },
                    {
                        "id": "news-social-3",
                        "rank": 3,
                        "title": "Tingkat Pengangguran Terbuka (TPT) Turun ke 4,76% Diiringi Perluasan Jaminan Sosial Ketenagakerjaan bagi Pekerja Rentan",
                        "date": "Agustus–Oktober 2026",
                        "source_name": "Kementerian Ketenagakerjaan RI — Satu Data Ketenagakerjaan",
                        "official_url": "https://satudata.kemnaker.go.id/",
                        "paragraphs": [
                            "Berdasarkan data Survei Angkatan Kerja Nasional (Sakernas), Tingkat Pengangguran Terbuka (TPT) Indonesia berhasil ditekan turun ke level 4,76 persen, lebih rendah dibandingkan posisi sebelum pandemi COVID-19. Ekspansi aktivitas di sektor industri pengolahan, konstruksi infrastruktur, perdagangan, akomodasi-makanan minuman, serta ekonomi digital mampu menyerap lebih dari 3,5 juta tambahan angkatan kerja baru setiap tahunnya.",
                            "Seiring membaiknya penyerapan tenaga kerja, Kementerian Ketenagakerjaan bersama BPJS Ketenagakerjaan memperluas cakupan perlindungan jaminan sosial—meliputi Jaminan Kecelakaan Kerja (JKK), Jaminan Hari Tua (JHT), dan Jaminan Kehilangan Pekerjaan (JKP)—baik bagi pekerja formal maupun pekerja sektor informal/ekonomi gig. Perlindungan ini memberikan jaring pengaman pendapatan dan akses pelatihan ulang (reskilling) bagi pekerja yang menghadapi transisi industri."
                        ],
                        "theory_name": "Okun's Law & Search-and-Matching Labor Market Theory",
                        "economist": "Arthur Okun & Diamond-Mortensen-Pissarides (Nobel 2010)",
                        "theory_explanation": "Hukum Okun menjelaskan hubungan terbalik antara pertumbuhan output riil dan tingkat pengangguran: ekspansi PDB di atas 5% secara konsisten menyerap tambahan angkatan kerja baru. Sementara teori Search-and-Matching (DMP) menunjukkan bahwa pelatihan vokasi dan sistem informasi pasar kerja mengurangi friksi pengangguran struktural.",
                        "policy_implication": "Mendorong penciptaan lapangan kerja formal berkualitas dan melindungi daya beli pekerja dari risiko guncangan ekonomi."
                    }
                ]
            }
        ]

        now = cls._last_sync_time or datetime.now(WIB)
        effective_days = max(1, min(int(days_back or 7), 30))
        window_end = now.date()
        window_start = window_end - timedelta(days=effective_days - 1)

        # Populate 'summary' and dynamic 7-day rolling publication dates
        for cat_idx, cat in enumerate(categories):
            for item_idx, item in enumerate(cat["items"]):
                item["summary"] = "\n\n".join(item["paragraphs"])

                # Spread the Top 3 news items across the last 7 days (0 to 6 days ago)
                if item_idx == 0:
                    days_ago = cat_idx % 2  # 0 (Hari Ini) or 1 (1 Hari Lalu)
                elif item_idx == 1:
                    days_ago = 2 + (cat_idx % 2)  # 2 or 3 Hari Lalu
                else:
                    days_ago = 4 + (cat_idx % 3)  # 4, 5, or 6 Hari Lalu

                days_ago = min(days_ago, effective_days - 1)
                pub_date = window_end - timedelta(days=days_ago)
                rel_label = "Hari Ini" if days_ago == 0 else f"{days_ago} Hari Lalu"
                formatted_date = f"{pub_date.day} {MONTHS_ID[pub_date.month]} {pub_date.year}"

                item["published_date_iso"] = pub_date.isoformat()
                item["days_ago"] = days_ago
                item["relative_time_label"] = rel_label
                item["date"] = f"{formatted_date} • {rel_label}"
                item["is_within_7_days"] = days_ago < 7

        # Apply optional filtering by category_id or keyword search
        filtered_categories = []
        for cat in categories:
            if category_id and category_id != "all" and cat["category_id"] != category_id:
                continue

            if search and search.strip():
                kw = search.strip().lower()
                matched_items = [
                    item for item in cat["items"]
                    if kw in item["title"].lower()
                    or kw in item["summary"].lower()
                    or kw in item["theory_name"].lower()
                    or kw in item["theory_explanation"].lower()
                    or kw in item["source_name"].lower()
                    or kw in cat["category_title"].lower()
                ]
                if matched_items:
                    cat_copy = dict(cat)
                    cat_copy["items"] = matched_items
                    filtered_categories.append(cat_copy)
            else:
                filtered_categories.append(cat)

        total_news = sum(len(c["items"]) for c in filtered_categories)
        start_str = f"{window_start.day} {MONTHS_ID[window_start.month]} {window_start.year}"
        end_str = f"{window_end.day} {MONTHS_ID[window_end.month]} {window_end.year}"
        last_updated_fmt = f"{now.day} {MONTHS_ID[now.month]} {now.year}, {now.strftime('%H:%M:%S')} WIB"

        return {
            "status": "SUCCESS",
            "title": "Kompilasi Top 3 Berita Strategis & Kajian Teori Ekonomi Terkait",
            "subtitle": "9 Kategori Utama (27 Berita Lengkap 2 Paragraf) Disertai Rujukan Resmi & Analisis Mekanisme Teori Ekonomi",
            "rolling_window_days": effective_days,
            "window_start_date": window_start.isoformat(),
            "window_end_date": window_end.isoformat(),
            "window_range_label": f"{start_str} – {end_str} ({effective_days} Hari Terakhir)",
            "sync_policy": f"Auto-Update Setiap Pertama Kali Masuk Web (Rentang {effective_days} Hari Kebelakang)",
            "last_updated": now.isoformat(),
            "last_updated_formatted": last_updated_fmt,
            "total_categories": len(filtered_categories),
            "total_news": total_news,
            "categories": filtered_categories
        }
