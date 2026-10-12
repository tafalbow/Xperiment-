"""
News & Economic Theory Service
Menyediakan kompilasi Top 3 Berita pada 9 Kategori Strategis (Total 27 Berita)
beserta Link Resmi dan Penjelasan Teori Ekonomi yang Terkait.

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

from typing import Dict, Any, List, Optional


class NewsTheoryService:
    @staticmethod
    def get_news_and_theories(category_id: Optional[str] = None, search: Optional[str] = None) -> Dict[str, Any]:
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
                        "summary": "Penurunan inflasi inti di Amerika Serikat dan Zona Euro membuka ruang pelonggaran moneter bertahap (soft landing). Kebijakan ini menurunkan imbal hasil obligasi global (US Treasury) dan mendorong aliran modal portofolio kembali ke negara berkembang (emerging markets), termasuk kawasan ASEAN dan Indonesia.",
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
                        "summary": "Korporasi multinasional di sektor semikonduktor, baterai kendaraan listrik, dan manufaktur strategis melakukan diversifikasi basis produksi menuju kawasan ASEAN guna memitigasi risiko fragmentasi tarif perdagangan dan ketergantungan rantai pasok tunggal.",
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
                        "summary": "Laporan Bank Dunia menunjukkan permintaan jangka panjang untuk mineral transisi energi (nikel, tembaga, bauksit, timah) mengalami penguatan struktural, sementara harga minyak mentah dan pangan global bergerak lebih terkendali pasca penyesuaian kuota pasokan global.",
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
                        "summary": "Proses teknis aksesi Indonesia menjadi anggota penuh OECD berjalan progresif seiring keterlibatan aktif diplomasi ekonomi bebas-aktif di G20, ASEAN, dan kerja sama Selatan-Selatan. Langkah ini menempatkan Indonesia sebagai jembatan strategis antara negara maju dan berkembang.",
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
                        "summary": "Penerapan instrumen pajak karbon lintas batas (CBAM) dan standar keberlanjutan rantai pasok oleh Uni Eropa mendorong negara-negara produsen di Asia Tenggara memperkuat negosiasi bilateral dan pengakuan kesetaraan standar sertifikasi nasional.",
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
                        "summary": "Forum tingkat tinggi ASEAN dan mitra dialog menyepakati penguatan stabilitas maritim dan kebebasan navigasi di koridor Indo-Pasifik, tempat mengalirnya lebih dari 40% volume perdagangan kontainer dan energi maritim dunia.",
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
                        "summary": "BPS mencatat pertumbuhan PDB Indonesia mencapai 5,20% YoY yang ditopang oleh ketangguhan Konsumsi Rumah Tangga dan Pembentukan Modal Tetap Bruto (PMTB). Pada saat bersamaan, inflasi IHK terjaga di level 2,12% YoY berkat stabilitas harga pangan pokok.",
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
                        "summary": "Realisasi pendapatan negara hingga Agustus 2026 mencapai 66,11% dari target APBN, didukung pertumbuhan penerimaan pajak, bea cukai, dan PNBP. Keseimbangan primer tercatat surplus dan defisit anggaran terjaga jauh di bawah ambang batas 3% PDB.",
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
                        "summary": "Bank Indonesia melaporkan posisi cadangan devisa mencapai USD 154,8 miliar, setara dengan pembiayaan 6,8 bulan impor atau 6,6 bulan impor dan pembayaran utang luar negeri pemerintah, jauh di atas standar kecukupan internasional sekitar 3 bulan impor.",
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
                        "summary": "Sinergi politik antara eksekutif dan legislatif memastikan ketepatan waktu penetapan anggaran negara serta penyelarasan program prioritas pembangunan jangka menengah dengan peta jalan transformasi ekonomi keluar dari middle-income trap.",
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
                        "summary": "Pemerintah melakukan penyederhanaan regulasi lintas kementerian dan pemerintah daerah guna memangkas tumpang tindih aturan, mempercepat layanan perizinan berusaha digital terintegrasi, dan memperkuat kepastian hukum kontrak bisnis.",
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
                        "summary": "Penerapan kerangka UU HKPD menyelaraskan belanja pemerintah daerah dengan prioritas nasional, memperluas basis Pajak Daerah dan Retribusi Daerah (PDRD), serta menegakkan batas maksimal belanja pegawai daerah sebesar 30% guna memperbesar porsi belanja modal infrastruktur publik.",
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
                        "summary": "Pengoperasian ekosistem Pusat Data Nasional dan pusat komputasi hyperscale di Batam, Cikarang, dan IKN beserta kerangka tata kelola Kecerdasan Buatan (AI) nasional mengakselerasi nilai Gross Merchandise Value (GMV) ekonomi digital Indonesia menuju USD 130 miliar.",
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
                        "summary": "Adopsi QRIS telah melampaui 50 juta pengguna dan puluhan juta merchant UMKM di seluruh Indonesia, dilengkapi konektivitas pembayaran lintas negara dengan Singapura, Malaysia, Thailand, Jepang, dan Korea Selatan menggunakan mata uang lokal (Local Currency Transaction).",
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
                        "summary": "Implementasi arsitektur Sistem Pemerintahan Berbasis Elektronik (SPBE) terpadu melalui Identitas Kependudukan Digital dan interoperabilitas Satu Data Indonesia meningkatkan akurasi penyaluran subsidi/bantuan sosial serta memangkas duplikasi anggaran aplikasi pemerintah.",
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
                        "summary": "Realisasi investasi nasional melampaui target dengan distribusi investasi di luar Pulau Jawa mencapai lebih dari 51%. Sektor pengolahan mineral (smelter nikel, tembaga, bauksit), ekosistem baterai EV, dan industri kimia menjadi motor utama penyerapan tenaga kerja.",
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
                        "summary": "Pemberian insentif fiskal terukur (tax holiday dan pembebasan bea masuk barang modal) serta kemudahan layanan satu pintu di KEK Gresik, Kendal, Sei Mangkei, Nongsa, dan Sanur berhasil menarik komitmen investasi baru dan menahan devisa layanan kesehatan di dalam negeri.",
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
                        "summary": "Indonesia Investment Authority (INA) bersama investor institusional global memperluas ko-investasi pada aset jalan tol, pelabuhan logistik, infrastruktur digital, dan energi hijau, bersinergi dengan skema Kerja Sama Pemerintah dan Badan Usaha (KPBU).",
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
                        "summary": "Pemerintah mengevaluasi struktur tarif Cukai Hasil Tembakau (CHT) dan batasan Harga Jual Eceran (HJE) dengan menyelaraskan empat pilar utama: pengendalian konsumsi (kesehatan), keberlangsungan tenaga kerja industri padat karya, optimalisasi penerimaan APBN, dan pemberantasan rokok ilegal.",
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
                        "summary": "Pemerintah menjaga diferensiasi tarif cukai yang moderat pada segmen Sigaret Kretek Tangan (SKT) guna melindungi ratusan ribu pekerja pelinting perempuan dan penyerapan panen petani tembakau serta cengkeh nusantara, didukung penyaluran DBH CHT sebesar 3% ke daerah penghasil.",
                        "theory_name": "Tax Incidence (Insidensi Pajak) & Factor Substitution Elasticity",
                        "economist": "Arnold Harberger & Johnicks",
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
                        "summary": "Bea Cukai bersama aparat penegak hukum dan pemerintah daerah mengintensifkan Operasi Gempur Rokok Ilegal di jalur distribusi darat, pelabuhan rakyat, dan lokapasar daring terhadap rokok polos (tanpa pita cukai) dan pita cukai palsu/bekas.",
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
                        "summary": "Pemerintah mempercepat penambahan kapasitas pembangkit Energi Baru Terbarukan (EBT) melalui lelang wilayah kerja panas bumi, perluasan PLTS Terapung di waduk strategis, serta pembangunan jaringan transmisi Green Super Grid untuk mengalirkan listrik bersih ke pusat industri.",
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
                        "summary": "Program pencampuran bahan bakar nabati biodiesel berbasis kelapa sawit domestik berhasil memangkas ketergantungan impor solar, menghemat devisa negara ratusan triliun rupiah per tahun, sekaligus menjaga serapan pasar domestik bagi jutaan petani sawit.",
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
                        "summary": "Perdagangan Sertifikat Pengurangan Emisi Gas Rumah Kaca (SPE-GRK) dan Persetujuan Teknis Batas Atas Emisi (PTBAE-PU) di IDXCarbon semakin likuid, memberikan insentif finansial nyata bagi perusahaan yang melakukan dekarbonisasi dan konservasi hutan.",
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
                        "summary": "BPS mencatat angka kemiskinan nasional terus menurun secara konsisten berkat sinergi stabilisasi harga pangan pokok di tingkat konsumen, perluasan kesempatan kerja sektor riil, serta ketepatan sasaran program perlindungan sosial adaptif.",
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
                        "summary": "Pemerintah mengintegrasikan intervensi pemenuhan gizi anak dan ibu hamil untuk menekan prevalensi stunting dengan program link-and-match pendidikan vokasi guna menyiapkan angkatan kerja berkeahlian tinggi menyongsong puncak Bonus Demografi.",
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
                        "summary": "Data Sakernas menunjukkan penyerapan jutaan tenaga kerja baru per tahun yang menurunkan Tingkat Pengangguran Terbuka (TPT) ke bawah level pra-pandemi, disertai perluasan cakupan perlindungan jaminan kecelakaan kerja dan jaminan kehilangan pekerjaan.",
                        "theory_name": "Okun's Law & Search-and-Matching Labor Market Theory",
                        "economist": "Arthur Okun & Diamond-Mortensen-Pissarides (Nobel 2010)",
                        "theory_explanation": "Hukum Okun menjelaskan hubungan terbalik antara pertumbuhan output riil dan tingkat pengangguran: ekspansi PDB di atas 5% secara konsisten menyerap tambahan angkatan kerja baru. Sementara teori Search-and-Matching (DMP) menunjukkan bahwa pelatihan vokasi dan sistem informasi pasar kerja mengurangi friksi pengangguran struktural.",
                        "policy_implication": "Mendorong penciptaan lapangan kerja formal berkualitas dan melindungi daya beli pekerja dari risiko guncangan ekonomi."
                    }
                ]
            }
        ]

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

        return {
            "status": "SUCCESS",
            "title": "Kompilasi Top 3 Berita Strategis & Kajian Teori Ekonomi Terkait",
            "subtitle": "9 Kategori Utama (27 Berita Terkurasi) Disertai Rujukan Resmi & Analisis Mekanisme Teori Ekonomi",
            "last_updated": "2026-10-12T09:00:00+07:00",
            "total_categories": len(filtered_categories),
            "total_news": total_news,
            "categories": filtered_categories
        }
