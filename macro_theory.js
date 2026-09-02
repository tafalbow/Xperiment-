/**
 * ==============================================================================
 * MACROMASTER DEN - TEORI & BASIS PENGETAHUAN EKONOMI MAKRO
 * Pustaka Data Teori, Skenario Krisis Bersejarah, Bank Soal Kuis,
 * Peristiwa Berita (Shocks), dan Glosarium Teori vs Praktek
 * ==============================================================================
 */

const MACRO_THEORY_DATA = {
    // --------------------------------------------------------------------------
    // 0. JEMBATAN KONSEP: MIKROEKONOMI VS MAKROEKONOMI UNTUK ORANG MANAJEMEN
    // --------------------------------------------------------------------------
    managementBridge: {
        title: "Kacamata Manajer: Membedakan Mikroekonomi vs Makroekonomi",
        subtitle: "Mengapa Strategi Perusahaan Terbaik (Mikro) Sangat Bergantung pada Iklim Bisnis Nasional (Makro)?",
        micro: {
            scope: "Level Mikroekonomi (Di Dalam Kendali Perusahaan Anda)",
            role: "Peran: Manajer Operasional, Pemasaran, HRD, atau Keuangan (CFO)",
            focus: "Keputusan Bisnis & Efisiensi Internal:",
            items: [
                "Berapa harga jual produk agar margin laba optimal? (Pricing Strategy)",
                "Bagaimana menekan Biaya Pokok Penjualan? (HPP / Cost of Goods Sold)",
                "Berapa gaji dan bonus karyawan untuk menarik talent? (Compensation)",
                "Berapa anggaran investasi mesin pabrik baru? (Capex / Budgeting)",
                "Bagaimana memenangkan persaingan melawan kompetitor di industri yang sama?"
            ],
            motto: "Fokus: Mengoptimalkan Efisiensi Internal, Kepuasan Pelanggan, dan Profit Perusahaan."
        },
        macro: {
            scope: "Level Makroekonomi (Iklim Eksternal Tempat Bisnis Anda Beroperasi)",
            role: "Peran: Pembuat Kebijakan Nasional / Dewan Ekonomi Nasional (DEN)",
            focus: "Faktor Eksternal (Lingkungan PESTEL - Economic Factor):",
            items: [
                "Berapa suku bunga acuan BI? Ini menentukan biaya bunga pinjaman modal kerja (Cost of Capital) pabrik Anda.",
                "Berapa inflasi nasional? Ini menentukan kenaikan biaya bahan baku dan tuntutan kenaikan UMR buruh.",
                "Bagaimana daya beli pasar (PDB)? Apakah konsumen punya uang belanja atau pasar sedang lesu?",
                "Berapa kurs Rupiah/USD? Ini menentukan HPP bahan baku impor dan daya saing ekspor Anda.",
                "Bagaimana APBN dan pajak? Apakah ada proyek belanja pemerintah (tender) yang bisa dimenangkan?"
            ],
            motto: "Fokus: Menjaga Stabilitas Harga, Pertumbuhan Lapangan Kerja, dan Kesehatan Sistem Moneter."
        },
        keyInsight: "Sebagai seorang manajer bisnis, Anda tidak bisa mengatur suku bunga bank sentral atau kurs dolar. Namun dengan memahami makroekonomi, Anda bisa memprediksi arah pasar, mengamankan cash flow, melakukan lindung nilai (hedging), dan berekspansi di waktu yang tepat!"
    },

    // --------------------------------------------------------------------------
    // 1. KURIKULUM BELAJAR TEORI BERJENJANG (STEP-BY-STEP ACADEMY)
    // --------------------------------------------------------------------------
    learningModules: [
        {
            id: 1,
            code: "mod1",
            title: "Modul 1: PDB & Model AD-AS",
            subtitle: "Total Omzet Penjualan Nasional, Kapasitas Pabrik & Bahaya Over-Capacity",
            icon: "⚖️",
            badge: "Tingkat 1: Fondasi Bisnis & Pasar",
            formula: "\\text{PDB} = C + I + G + (X - M) \\quad \\text{vs} \\quad Y^* \\text{ (Kapasitas Maksimal Industri)}",
            analogy: `
                <div style="font-weight:700; margin-bottom:6px;">🏢 Analogi Manajer Pabrik / Restoran:</div>
                <p style="margin-bottom:8px;">Bayangkan Anda adalah Manajer Pabrik dengan kapasitas produksi maksimal 10.000 baju per bulan (ini adalah Penawaran Agregat / Kapasitas Potensial $Y^*$). Jumlah pesanan (order) yang masuk dari pembeli adalah Permintaan Agregat ($AD$).</p>
                <ul class="academy-bullet-list">
                    <li><strong>Saat order 7.000 baju ($AD < Y^*$):</strong> Pabrik masih punya kapasitas menganggur. Tambahan pesanan akan menambah omzet dan laba tanpa kendala biaya.</li>
                    <li><strong>Saat order membeludak 25.000 baju ($AD > Y^*$, Overheating):</strong> Mesin dipaksa lembur 24 jam dan mulai rusak, kain langka sehingga supplier menaikkan harga bahan baku 40%, dan buruh menuntut uang lembur berlipat. Hasilnya bukan efisiensi, melainkan lonjakan biaya produksi dan kenaikan harga jual ke konsumen (Inflasi Demand-Pull)!</li>
                </ul>
            `,
            theoryText: `
                <div style="font-weight:600; margin-bottom:6px;">Dalam kacamata manajemen bisnis dan teori pasar:</div>
                <ul class="academy-bullet-list">
                    <li><strong>PDB (Produk Domestik Bruto):</strong> Total 'Omzet Penjualan' seluruh barang dan jasa akhir yang diproduksi di Indonesia dalam setahun.</li>
                    <li><strong>Permintaan Agregat (AD):</strong> Total daya beli / belanja dari konsumen rumah tangga ($C$), belanja modal investasi perusahaan ($I$), belanja pengadaan tender pemerintah ($G$), dan ekspor neto ($X - M$).</li>
                    <li><strong>Output Potensial ($Y^*$):</strong> Kapasitas terpasang maksimal seluruh pabrik, infrastruktur, dan angkatan kerja riil di tanah air.</li>
                </ul>
            `,
            practiceText: `
                <div style="font-weight:700; color:#0369a1; margin-bottom:6px;">⚖️ Dilema Manajemen di Dunia Riil:</div>
                <p style="margin:0; line-height:1.5;">Pemerintah sering tergoda memacu anggaran belanja proyek ($G$) setinggi-tingginya demi mengejar angka pertumbuhan. Namun jika kapasitas pasokan pabrik semen, baja, dan pelabuhan lokal belum siap ($AD > Y^*$), pesanan proyek pemerintah justru memicu banjir impor bahan baku dari luar negeri yang menguras cadangan devisa dan melambungkan harga-harga.</p>
            `,
            miniLabPrompt: "Uji Eksperimen: Coba naikkan Belanja Pemerintah (G) secara wajar dan amati omzet PDB naik. Lalu coba naikkan ekstrem melampaui kapasitas terpasang (LRAS Y*) untuk melihat terjadinya Overheating dan lonjakan inflasi!",
            checkpointQuestions: [
                {
                    q: "Suatu perekonomian mencatat data PDB Nominal tahun 2024 sebesar Rp 2.000 Triliun dan PDB Riil (berdasarkan harga konstan tahun dasar 2020) sebesar Rp 1.600 Triliun. Berapakah nilai Deflator PDB negara tersebut, dan bagaimana interpretasi akademisnya?",
                    options: [
                        "125; menunjukkan bahwa tingkat harga barang dan jasa domestik telah mengalami inflasi rata-rata sebesar 25% dibandingkan tahun dasar 2020",
                        "80; menunjukkan bahwa perekonomian mengalami deflasi umum sebesar 20%",
                        "160; menunjukkan bahwa kuantitas output fisik nasional tumbuh sebesar 60%",
                        "400; menunjukkan bahwa daya beli mata uang domestik naik berlipat ganda"
                    ],
                    correct: 0,
                    explanation: "Formula Deflator PDB: (PDB Nominal / PDB Riil) * 100 = (2.000 / 1.600) * 100 = 125. Angka indeks 125 menunjukkan bahwa tingkat harga agregat barang dan jasa akhir yang diproduksi di dalam negeri mengalami kenaikan sebesar (125 - 100) = 25% relatif terhadap tahun dasar 2020."
                },
                {
                    q: "Dalam model Keseimbangan Makroekonomi AD-AS modern, mengapa Kurva Penawaran Agregat Jangka Panjang (LRAS) digambarkan berbentuk garis vertikal tegak lurus pada tingkat output potensial (Y* / Full Employment)?",
                    options: [
                        "Karena dalam jangka panjang, upah nominal dan seluruh harga bersifat fleksibel penuh, sehingga tingkat harga nominal tidak memengaruhi output riil (Prinsip Netralitas Uang & Classical Dichotomy)",
                        "Karena pemerintah memberlakukan undang-undang kuota produksi fisik maksimum bagi seluruh sektor industri manufaktur",
                        "Karena kurva permintaan agregat (AD) selalu bernilai tetap dan tidak dapat bergeser dalam jangka panjang",
                        "Karena suku bunga perbankan dipatok secara permanen oleh bank sentral pada tingkat nol persen"
                    ],
                    correct: 0,
                    explanation: "Dalam jangka panjang (LRAS), asumsi kekakuan harga dan upah nominal tidak berlaku lagi (flexible prices and wages). Output riil murni ditentukan oleh ketersediaan faktor-faktor produksi riil (stok modal K, tenaga kerja L, dan kemajuan teknologi A), bukan oleh tingkat harga nominal (Monetary Neutrality)."
                }
            ]
        },
        {
            id: 2,
            code: "mod2",
            title: "Modul 2: Kebijakan Moneter & BI-Rate",
            subtitle: "Suku Bunga Acuan, Transmisi Moneter, Persamaan Fisher & Teori Kuantitas",
            icon: "🏦",
            badge: "Tingkat 2: Perbankan & Suku Bunga",
            formula: "\\text{Persamaan Fisher: } i = r + \\pi^e \\quad | \\quad \\text{Teori Kuantitas: } M \\cdot V = P \\cdot Y",
            analogy: `
                <div style="font-weight:700; margin-bottom:6px;">🚗 Analogi Sederhana: Pedal Gas dan Rem pada Mobil</div>
                <p style="margin-bottom:8px;">Kebijakan moneter Bank Indonesia ibarat pedal gas dan rem pada mobil perekonomian:</p>
                <ul class="academy-bullet-list">
                    <li><strong>Saat BI-Rate Diturunkan (Pedal Gas):</strong> Suku bunga pinjaman bank menjadi lebih murah. Pengusaha bersemangat meminjam modal untuk ekspansi, dan masyarakat mencicil rumah/kendaraan. Perekonomian melaju cepat dan lapangan kerja bertambah.</li>
                    <li><strong>Saat BI-Rate Dinaikkan (Pedal Rem):</strong> Suku bunga pinjaman naik dan bunga tabungan menjadi lebih menarik. Masyarakat memilih menabung di bank dan pengusaha menahan pinjaman baru. Belanja masyarakat melambat, sehingga kenaikan harga barang (inflasi) berhasil diredam.</li>
                </ul>
            `,
            theoryText: `
                <div style="font-weight:600; margin-bottom:6px;">Dalam buku teks Pengantar Makroekonomi (Mankiw / Krugman):</div>
                <ul class="academy-bullet-list">
                    <li><strong>Persamaan Pertukaran Fisher ($M \\cdot V = P \\cdot Y$):</strong> Jika kecepatan perputaran uang ($V$) konstan, laju pertumbuhan uang berlebih di atas pertumbuhan output riil akan bermuara langsung pada inflasi $(\\%\\Delta P = \\%\\Delta M - \\%\\Delta Y)$.</li>
                    <li><strong>Persamaan Fisher ($i = r + \\pi^e$):</strong> Suku bunga nominal ($i$) adalah penjumlahan suku bunga riil ($r$) dan ekspektasi inflasi ($\\pi^e$).</li>
                    <li><strong>Penciptaan Uang Giral (Money Multiplier):</strong> Melalui sistem perbankan cadangan fraksional (*fractional-reserve banking*), penawaran uang berlipat ganda dengan rasio pengganda uang $m = 1 / rr$.</li>
                </ul>
            `,
            practiceText: `
                <div style="font-weight:700; color:#0369a1; margin-bottom:6px;">⏳ Jeda Transmisi Moneter (Policy Lag) di Indonesia:</div>
                <p style="margin:0; line-height:1.5;">Kebijakan kenaikan BI-Rate hari ini memerlukan waktu 6 hingga 18 bulan (*Outside Lag*) untuk terserap penuh ke suku bunga kredit perbankan komersial, mempengaruhi belanja modal (*Capex*), hingga akhirnya menurunkan laju inflasi IHK.</p>
            `,
            miniLabPrompt: "Uji Eksperimen: Coba naikkan BI-Rate sebesar 2.00% (+200 bps). Perhatikan bagaimana bunga pinjaman menjadi lebih mahal, pertumbuhan kredit perbankan melambat, dan laju inflasi mereda!",
            checkpointQuestions: [
                {
                    q: "Berdasarkan Teori Kuantitas Uang (M * V = P * Y), jika kecepatan perputaran uang (V) diasumsikan konstan dan output riil (Y) tumbuh 5% per tahun, berapakah pertumbuhan jumlah uang beredar (M) yang harus dijaga bank sentral agar target laju inflasi (P) tercapai persis 3% per tahun?",
                    options: [
                        "8% per tahun (karena %ΔM = Inflasi + Pertumbuhan Output Riil)",
                        "2% per tahun (%ΔM = 5% - 3%)",
                        "15% per tahun (%ΔM = 5% * 3%)",
                        "0,6% per tahun (%ΔM = 3% / 5%)"
                    ],
                    correct: 0,
                    explanation: "Dalam bentuk laju persentase: %ΔM + %ΔV = %ΔP + %ΔY. Karena perputaran uang V diasumsikan konstan (%ΔV = 0), maka persamaannya menjadi %ΔM = %ΔP + %ΔY. Dengan target inflasi 3% dan pertumbuhan output 5%, maka %ΔM = 3% + 5% = 8% per tahun."
                },
                {
                    q: "Bank sentral menetapkan Giro Wajib Minimum (GWM / reserve requirement) perbankan sebesar 10%. Jika bank sentral menyuntikkan uang primer sebesar Rp 20 Triliun ke sistem perbankan melalui operasi pasar terbuka (tanpa ada kebocoran uang kartal/currency drain), berapa potensi pertambahan maksimal jumlah uang beredar (M1)?",
                    options: [
                        "Rp 200 Triliun (dengan angka pengganda uang m = 1 / rr = 1 / 0,10 = 10)",
                        "Rp 20 Triliun (tidak terjadi pelipatgandaan uang giral)",
                        "Rp 2 Triliun (berkurang karena disisihkan sebagai cadangan wajib)",
                        "Rp 100 Triliun (dikalikan faktor lima)"
                    ],
                    correct: 0,
                    explanation: "Angka Pengganda Uang Sederhana (Money Multiplier) dirumuskan: m = 1 / rr = 1 / 0,10 = 10. Maka potensi penambahan jumlah uang beredar adalah ΔM = m * ΔBasis = 10 * Rp 20 Triliun = Rp 200 Triliun."
                }
            ]
        },
        {
            id: 3,
            code: "mod3",
            title: "Modul 3: Kebijakan Fiskal, Pajak & Batas APBN",
            subtitle: "Pengganda Keynesian, Keseimbangan Pasar Dana Pinjaman & Efek Crowding-Out",
            icon: "🏛️",
            badge: "Tingkat 3: Keuangan Negara & APBN",
            formula: "k_G = \\frac{1}{1 - MPC} \\quad | \\quad k_T = \\frac{-MPC}{1 - MPC} \\quad | \\quad \\text{Defisit APBN} \\le 3\\% \\text{ PDB}",
            analogy: `
                <div style="font-weight:700; margin-bottom:6px;">💳 Analogi Sederhana: Anggaran Keuangan Keluarga</div>
                <p style="margin-bottom:8px;">APBN pada dasarnya mirip seperti anggaran belanja dalam rumah tangga:</p>
                <ul class="academy-bullet-list">
                    <li><strong>Pemasukan Keluarga (Pajak):</strong> Pendapatan kas negara yang dihimpun dari pajak penghasilan, PPN, dan bea cukai.</li>
                    <li><strong>Pengeluaran Keluarga (Belanja Negara):</strong> Anggaran untuk makan, sekolah anak, subsidi, dan proyek infrastruktur.</li>
                    <li><strong>Defisit Anggaran:</strong> Terjadi jika belanja lebih besar dari pemasukan, sehingga pemerintah menerbitkan Surat Berharga Negara (SBN/obligasi).</li>
                    <li><strong>Disiplin Utang:</strong> Pinjaman harus dibatasi dengan bijak agar cicilan bunga utang tidak membebani masa depan keluarga!</li>
                </ul>
            `,
            theoryText: `
                <div style="font-weight:600; margin-bottom:6px;">Dalam materi Ujian Semester Makroekonomi:</div>
                <ul class="academy-bullet-list">
                    <li><strong>Multiplier Belanja Pemerintah ($k_G$):</strong> Menunjukkan kelipatan kenaikan pendapatan nasional dari setiap rupiah belanja negara: $k_G = 1 / (1 - MPC)$.</li>
                    <li><strong>Multiplier Pajak ($k_T$):</strong> Berdampak lebih kecil daripada belanja karena sebagian pemotongan pajak akan ditabung: $k_T = -MPC / (1 - MPC)$.</li>
                    <li><strong>Efek Desakan (Crowding-Out):</strong> Defisit anggaran negara yang dibiayai penerbitan obligasi mengurangi pasokan dana pinjaman nasional ($S = Y - C - G$), menaikkan suku bunga riil ($r$), dan menekan investasi swasta ($I$).</li>
                </ul>
            `,
            practiceText: `
                <div style="font-weight:700; color:#0369a1; margin-bottom:6px;">📜 Aturan Disiplin Fiskal UU No. 17/2003 di Indonesia:</div>
                <p style="margin:0; line-height:1.5;">Pasal 12 UU Keuangan Negara membatasi defisit APBN maksimal 3,0% dari PDB dan akumulasi rasio utang pemerintah maksimal 60,0% dari PDB. Aturan ini menjaga kredibilitas surat utang negara (*sovereign credit rating*) dan stabilitas nilai tukar Rupiah.</p>
            `,
            miniLabPrompt: "Uji Eksperimen: Coba naikkan Belanja Negara (G) hingga defisit melampaui 3% PDB. Perhatikan bagaimana muncul peringatan pelanggaran undang-undang dan beban imbal hasil surat utang melonjak!",
            checkpointQuestions: [
                {
                    q: "Dalam model Makroekonomi Keynes Sederhana pada perekonomian tertutup, fungsi konsumsi diketahui C = 150 + 0,80(Y - T). Pemerintah berencana menutup kesenjangan resesi (recessionary gap) sebesar Rp 500 Triliun. Berapakah stimulus belanja negara (ΔG) yang dibutuhkan untuk mencapai target tersebut?",
                    options: [
                        "Rp 100 Triliun (karena angka pengganda belanja k_G = 1 / (1 - 0,80) = 5)",
                        "Rp 500 Triliun (belanja harus bernilai persis sama dengan celah resesi)",
                        "Rp 400 Triliun (sebesar nilai MPC dikalikan celah resesi)",
                        "Rp 62,5 Triliun (dikalikan angka pengganda pajak)"
                    ],
                    correct: 0,
                    explanation: "Rumus angka pengganda belanja pemerintah: k_G = 1 / (1 - MPC) = 1 / (1 - 0,80) = 1 / 0,20 = 5. Karena ΔY = k_G * ΔG, maka stimulus belanja yang dibutuhkan adalah ΔG = ΔY / k_G = Rp 500 Triliun / 5 = Rp 100 Triliun."
                },
                {
                    q: "Berdasarkan model Pasar Dana Pinjaman (Loanable Funds Market), bagaimana mekanisme transmisi terjadinya Efek Desakan (Crowding-Out Effect) akibat defisit anggaran pemerintah yang dibiayai penerbitan obligasi utang negara?",
                    options: [
                        "Defisit anggaran menurunkan tabungan publik (S_public = T - G < 0), sehingga kurva penawaran dana pinjaman bergeser ke kiri, mengerek suku bunga riil naik, dan memotong pengeluaran investasi swasta (I)",
                        "Pemerintah secara otomatis melarang perbankan menyalurkan kredit kepada pengusaha swasta",
                        "Suku bunga riil di pasar modal jatuh mendekati nol sehingga masyarakat enggan menabung",
                        "Nilai tukar rupiah langsung terdepresiasi sebesar 100% terhadap seluruh mata uang dunia"
                    ],
                    correct: 0,
                    explanation: "Tabungan Nasional adalah S = S_private + S_public. Ketika defisit pemerintah melebar (G > T), tabungan publik negatif sehingga penawaran dana pinjaman nasional berkurang. Keseimbangan di pasar dana pinjaman menghasilkan kenaikan suku bunga riil (r naik), yang menaikkan biaya pinjaman bagi sektor bisnis dan mendesak keluar pengeluaran investasi swasta (I turun)."
                }
            ]
        },
        {
            id: 4,
            code: "mod4",
            title: "Modul 4: Ketenagakerjaan & Kurva Phillips",
            subtitle: "Pengangguran Alami (NAIRU), Hukum Okun, Ekspektasi Inflasi & Stagflasi",
            icon: "📉",
            badge: "Tingkat 4: Ketenagakerjaan & Upah",
            formula: "\\pi = \\pi^e - \\beta(u - u_n) + v \\quad | \\quad \\Delta u = -0.5(g_Y - g_{Y^*})",
            analogy: `
                <div style="font-weight:700; margin-bottom:6px;">🌾 Analogi Sederhana: Mencari Pekerja di Musim Panen</div>
                <ul class="academy-bullet-list">
                    <li><strong>Saat Pengangguran Sangat Rendah:</strong> Hampir semua orang sudah bekerja. Pemilik sawah atau pabrik yang butuh pekerja tambahan harus menawarkan upah harian lebih tinggi agar orang mau bekerja. Karena upah naik, harga jual barang terpaksa dinaikkan (Wage-Push Inflation).</li>
                    <li><strong>Saat Terjadi Stagflasi:</strong> Bayangkan harga pupuk dan solar naik berlipat ganda karena guncangan pasokan global, namun pembeli sepi karena daya beli turun. Pengusaha rugi, harga barang mahal, dan pekerja terpaksa dirumahkan secara bersamaan.</li>
                </ul>
            `,
            theoryText: `
                <div style="font-weight:600; margin-bottom:6px;">Dalam silabus Ujian Semester Makroekonomi:</div>
                <ul class="academy-bullet-list">
                    <li><strong>Kurva Phillips Ekspektasi (Friedman-Phelps):</strong> $\\pi = \\pi^e - \\beta(u - u_n) + v$. Dalam jangka pendek ada *trade-off* antara inflasi dan pengangguran.</li>
                    <li><strong>Kurva Phillips Jangka Panjang:</strong> Berbentuk vertikal pada tingkat pengangguran alamiah ($u_n$ / NAIRU) karena ekspektasi inflasi beradaptasi penuh ($\pi^e = \pi$).</li>
                    <li><strong>Hukum Okun (Okun's Law):</strong> Setiap pertumbuhan PDB riil 2% di atas tren output potensial akan menurunkan tingkat pengangguran sebesar 1%.</li>
                    <li><strong>Stagflasi:</strong> Guncangan penawaran negatif ($v > 0$) yang menggeser kurva SRAS ke kiri atas (inflasi naik bersamaan dengan naiknya pengangguran).</li>
                </ul>
            `,
            practiceText: `
                <div style="font-weight:700; color:#0369a1; margin-bottom:6px;">👷 Karakteristik Ketenagakerjaan Sektor Informal di Indonesia:</div>
                <p style="margin:0; line-height:1.5;">Sekitar 55%–60% tenaga kerja Indonesia berada di sektor informal. Saat krisis ekonomi terjadi, pekerja formal yang terkena PHK sering terserap ke sektor informal berpendapatan rendah, sehingga data pengangguran terbuka resmi tidak melonjak drastis, namun tingkat kemiskinan dan ketimpangan meningkat.</p>
            `,
            miniLabPrompt: "Uji Eksperimen: Coba naikkan tingkat guncangan harga minyak dunia (Supply Shock). Amati bagaimana kurva bergeser ke area Stagflasi: laju inflasi melonjak tinggi sementara penyerapan tenaga kerja merosot!",
            checkpointQuestions: [
                {
                    q: "Berdasarkan Hukum Okun (Okun's Law) dengan rasio elastisitas 0,5: jika output potensial jangka panjang tumbuh 3% per tahun dan PDB riil aktual tumbuh sebesar 5% pada tahun berjalan, apa dampak yang diprediksi terjadi pada angka pengangguran?",
                    options: [
                        "Tingkat pengangguran diprediksi turun sebesar 1,0 persentase poin [Δu = -0,5 * (5% - 3%) = -1,0%]",
                        "Tingkat pengangguran diprediksi naik sebesar 2,0 persentase poin",
                        "Tingkat pengangguran tidak berubah karena pasar tenaga kerja bersifat kaku penuh",
                        "Tingkat pengangguran langsung jatuh menjadi nol persen (full employment mutlak)"
                    ],
                    correct: 0,
                    explanation: "Formula Hukum Okun: Δu = -0,5 * (g_Y - g_Y*). Dengan pertumbuhan aktual g_Y = 5% dan pertumbuhan potensial g_Y* = 3%, maka selisih pertumbuhan ekonomi di atas kapasitas tren adalah +2%. Penyerapan tenaga kerja ekstra ini menurunkan tingkat pengangguran sebesar: -0,5 * (2%) = -1,0 persen poin."
                },
                {
                    q: "Menurut Teori Hipotesis Tingkat Alamiah (Friedman & Phelps), mengapa dalam jangka panjang Kurva Phillips berbentuk garis lurus vertikal pada tingkat pengangguran alamiah (NAIRU)?",
                    options: [
                        "Karena dalam jangka panjang, ekspektasi inflasi pekerja dan dunia usaha akan menyesuaikan diri secara penuh dengan inflasi aktual (π^e = π), melenyapkan trade-off antara inflasi dan pengangguran",
                        "Karena upah nominal buruh dibekukan secara permanen oleh pengadilan hubungan industrial",
                        "Karena bank sentral dilarang mengumumkan target inflasi kepada masyarakat",
                        "Karena seluruh angkatan kerja beralih menjadi pegawai negeri sipil"
                    ],
                    correct: 0,
                    explanation: "Dalam jangka pendek, kenaikan inflasi yang tidak terantisipasi dapat menurunkan pengangguran sementara. Namun dalam jangka panjang, pekerja menuntut kenaikan upah nominal untuk menutup penurunan daya beli (ekspektasi inflasi naik menyesuaikan inflasi aktual, π^e = π). Akibatnya upah riil kembali ke titik awal dan pengangguran kembali ke tingkat alamiahnya (NAIRU), membuktikan ketiadaan trade-off permanen (Kurva Phillips Jangka Panjang vertikal)."
                }
            ]
        },
        {
            id: 5,
            code: "mod5",
            title: "Modul 5: Ekonomi Terbuka & Valas",
            subtitle: "Model Mundell-Fleming, Trilema Kebijakan, Kondisi Marshall-Lerner & PPP",
            icon: "🔺",
            badge: "Tingkat 5: Valuta Asing & Perdagangan Global",
            formula: "\\text{Trilema Mundell-Fleming: Pilih Maksimal 2 dari 3 Pilar Moneter}",
            analogy: `
                <div style="font-weight:700; margin-bottom:6px;">💻 Analogi Sederhana: Membeli Laptop & Barang Impor</div>
                <p style="margin-bottom:8px;">Bayangkan Anda ingin membeli laptop atau bahan baku impor seharga 100 Dolar AS:</p>
                <ul class="academy-bullet-list">
                    <li><strong>Saat Kurs Rp 15.000 / USD:</strong> Anda membutuhkan dana rupiah sebesar Rp 1.500.000.</li>
                    <li><strong>Saat Rupiah Melemah ke Rp 17.000 / USD:</strong> Anda harus membayar Rp 1.700.000 untuk barang yang persis sama!</li>
                </ul>
                <p style="margin:6px 0 0 0; line-height:1.45;">Inilah sebabnya nilai tukar rupiah sangat krusial bagi harga kebutuhan pokok impor (kedelai, gandum, BBM) di dalam negeri.</p>
            `,
            theoryText: `
                <div style="font-weight:600; margin-bottom:6px;">Dalam silabus Makroekonomi Terbuka (Mundell-Fleming):</div>
                <ul class="academy-bullet-list">
                    <li><strong>Trilema Kebijakan (The Impossible Trinity):</strong> Negara mustahil menerapkan secara bersamaan: (1) Kurs Tetap, (2) Mobilitas Modal Bebas, dan (3) Moneter Independen.</li>
                    <li><strong>Efektivitas Kebijakan pada Kurs Mengambang:</strong> Kebijakan moneter sangat efektif (karena depresiasi kurs menambah ekspor neto $NX$), sedangkan kebijakan fiskal tidak efektif (karena apresiasi kurs melenyapkan stimulus belanja).</li>
                    <li><strong>Kondisi Marshall-Lerner:</strong> Depresiasi kurs riil hanya memperbaiki neraca perdagangan jika jumlah elastisitas ekspor dan impor melebihi satu ($|\\epsilon_x| + |\\epsilon_m| > 1$).</li>
                </ul>
            `,
            practiceText: `
                <div style="font-weight:700; color:#0369a1; margin-bottom:6px;">🌐 Pilihan Sistem Moneter Indonesia:</div>
                <p style="margin:0; line-height:1.5;">Indonesia menganut sistem kurs mengambang bebas terkendali (*managed floating*) dengan lalu lintas devisa bebas. Bank Indonesia melakukan intervensi pasar valas secara terukur menggunakan Cadangan Devisa untuk menjaga stabilitas nilai tukar agar tidak bergejolak liar.</p>
            `,
            miniLabPrompt: "Uji Eksperimen: Perhatikan pergerakan kurs Rupiah. Coba gunakan slider Operasi Pasar Valas untuk menyuntikkan cadangan devisa dan amati bagaimana pelemahan kurs tertahan stabil!",
            checkpointQuestions: [
                {
                    q: "Berdasarkan Model Mundell-Fleming dengan sistem Kurs Mengambang Bebas (Floating Exchange Rate) dan Mobilitas Modal Sempurna, mengapa kebijakan fiskal ekspansif (menaikkan belanja G) TIDAK EFEKTIF dalam meningkatkan output nasional (Y)?",
                    options: [
                        "Karena stimulus belanja pemerintah menaikkan suku bunga domestik, memicu aliran modal asing masuk (capital inflow), mengapresiasi nilai tukar rupiah, sehingga ekspor neto (NX) anjlok dan menetralkan seluruh ekspansi output",
                        "Karena bank sentral secara otomatis menyita seluruh anggaran belanja kementerian",
                        "Karena kurva LM langsung bergeser ke kiri hingga seluruh tabungan masyarakat habis",
                        "Karena eksportir domestik menolak menerima mata uang asing dalam perdagangan internasional"
                    ],
                    correct: 0,
                    explanation: "Dalam kurs mengambang dan mobilitas modal sempurna: Kenaikan belanja pemerintah (G) menggeser kurva IS ke kanan, mendorong suku bunga domestik naik di atas suku bunga dunia (r > r*). Investor global memburu aset rupiah, memicu apresiasi mata uang domestik. Apresiasi kurs membuat produk ekspor mahal dan produk impor murah, sehingga ekspor neto (NX) turun persis sebesar kenaikan G, mengembalikan kurva IS ke posisi semula (ΔY = 0)."
                },
                {
                    q: "Menurut Kondisi Marshall-Lerner dalam teori perdagangan internasional, devaluasi atau depresiasi mata uang domestik HANYA akan berhasil memperbaiki Neraca Transaksi Berjalan / Ekspor Neto (NX) apabila...",
                    options: [
                        "Jumlah elastisitas harga permintaan ekspor dan impor bernilai absolut lebih besar dari satu (|ε_x| + |ε_m| > 1)",
                        "Pemerintah menetapkan bea masuk impor sebesar 100% untuk seluruh barang konsumsi",
                        "Tingkat inflasi di dalam negeri lebih tinggi secara permanen daripada inflasi negara mitra dagang",
                        "Cadangan devisa negara dialihkan seluruhnya ke dalam bentuk komoditas emas batangan"
                    ],
                    correct: 0,
                    explanation: "Depresiasi mata uang memiliki dua efek berlawanan: Efek Harga (harga unit impor menjadi lebih mahal dalam mata uang lokal) dan Efek Volume (volume ekspor naik, volume impor turun). Neraca perdagangan hanya akan membaik jika efek volume lebih besar daripada efek harga, yang secara matematis disyaratkan oleh Kondisi Marshall-Lerner: |ε_x| + |ε_m| > 1."
                }
            ]
        }
    ],

    // --------------------------------------------------------------------------
    // 2. ENSIKLOPEDIA & GLOSARIUM TEORI VS PRAKTEK
    // --------------------------------------------------------------------------
    encyclopedia: [
        {
            id: "ad_as",
            title: "Model Permintaan & Penawaran Agregat (AD-AS)",
            category: "Teori Utama",
            icon: "⚖️",
            formula: "AD = C + I + G + (X - M) \\quad \\text{vs} \\quad AS = f(K, L, \\text{Teknologi}, \\text{Biaya Input})",
            theory: `
                Model AD-AS adalah fondasi utama ekonomi makro modern yang menjelaskan bagaimana PDB riil ($Y$) 
                dan tingkat harga umum ($P$) ditentukan secara simultan.
                - **Kurva AD (Aggregate Demand)** melandai ke bawah: ketika tingkat harga turun, daya beli riil naik (efek kekayaan Pigou), suku bunga turun (efek Keynes), dan ekspor neto meningkat (efek nilai tukar).
                - **Kurva SRAS (Short-Run Aggregate Supply)** melandai ke atas: dalam jangka pendek, upah dan harga input bersifat kaku (sticky wages/prices). Jika harga output naik, margin laba produsen meningkat sehingga output ditambah.
                - **Kurva LRAS (Long-Run Aggregate Supply)** tegak lurus pada tingkat Output Potensial ($Y^*$): dalam jangka panjang, output ditentukan oleh modal fisik, angkatan kerja, dan produktivitas/teknologi, bukan oleh tingkat harga nominal.
            `,
            practice: `
                **Realita di Lapangan (Indonesia & Dunia):**
                1. **Output Gap & Overheating**: Jika pemerintah terus memacu AD melampaui kapasitas potensial ($Y > Y^*$), ekonomi mengalami *overheating*. Hasilnya bukan lagi lonjakan pertumbuhan riil, melainkan lonjakan inflasi (*demand-pull*) dan defisit neraca dagang karena banjir impor.
                2. **Supply Shock (Kejutan Penawaran)**: Ketika harga minyak dunia atau pangan melonjak (seperti perang energi 2022 atau El Nino), kurva SRAS terdorong bergeser ke kiri. Ini menciptakan dilema terburuk bagi pengambil kebijakan: output turun (resesi) sementara harga-harga naik (inflasi), yang dikenal sebagai **Stagflasi**.
            `,
            keyTakeaway: "Kebijakan sisi permintaan (moneter/fiskal) hanya efektif menutup kesenjangan jangka pendek (output gap). Untuk mendorong pertumbuhan jangka panjang yang berkelanjutan tanpa inflasi, negara harus menggeser LRAS melalui reformasi struktural, pendidikan, dan infrastruktur produktif."
        },
        {
            id: "monetary_transmission",
            title: "Transmisi Kebijakan Moneter & BI-Rate",
            category: "Kebijakan Moneter",
            icon: "🏦",
            formula: "r_{riil} = i_{nominal} - \\pi^e \\quad \\text{(Fisher Effect)}",
            theory: `
                Bank sentral (seperti Bank Indonesia) mengendalikan likuiditas dan stabilitas harga terutama melalui 
                instrumen suku bunga kebijakan (BI-Rate) dan Giro Wajib Minimum (GWM).
                - **Suku Bunga Rendah (Ekspansif)**: Menurunkan biaya pinjaman, merangsang kredit investasi ($I$) dan konsumsi ($C$), serta mendorong pertumbuhan ekonomi.
                - **Suku Bunga Tinggi (Kontraktif)**: Mengerem ekspansi kredit, mendorong masyarakat menabung, menstabilkan kurs mata uang, dan meredam laju inflasi.
            `,
            practice: `
                **Realita di Lapangan (Policy Lag & Pass-Through):**
                1. **Keterlambatan Waktu (Outside Lag)**: Perubahan suku bunga acuan bank sentral tidak seketika mengubah inflasi besok pagi. Butuh waktu **6 hingga 18 bulan (2-4 kuartal)** untuk menjalar dari pasar uang antarbank ke bunga kredit komersial, kemudian ke keputusan belanja dunia usaha.
                2. **Asimetri Perbankan**: Bunga deposito perbankan biasanya cepat naik ketika BI-rate naik, namun bunga kredit perbankan seringkali lambat turun (*sticky downward*) saat BI-rate dipangkas karena bank memperhitungkan premi risiko kredit macet (NPL).
            `,
            keyTakeaway: "Bank sentral harus bersikap *forward-looking* (melihat proyeksi ke depan), bukan reaktif terhadap apa yang terjadi hari ini saja, karena tindakan hari ini baru akan berdampak penuh tahun depan."
        },
        {
            id: "fiscal_debt",
            title: "Kebijakan Fiskal, Pengali & Batas Utang",
            category: "Kebijakan Fiskal",
            icon: "🏛️",
            formula: "k = \\frac{1}{1 - MPC(1 - t)} \\quad \\text{(Pengali Belanja)} \\quad | \\quad \\text{Defisit} = G - T",
            theory: `
                Kebijakan fiskal dikelola oleh Kementerian Keuangan melalui Anggaran Pendapatan dan Belanja Negara (APBN).
                - **Pengali Fiskal (Fiscal Multiplier)**: Belanja pemerintah ($G$) menciptakan efek berantai. Rp 1 triliun belanja infrastruktur dibayarkan ke pekerja & pemasok, yang kemudian membelanjakan sebagian penghasilannya ($MPC$) untuk konsumsi lain.
                - **Penstabil Otomatis (Automatic Stabilizers)**: Saat resesi, penerimaan pajak otomatis menyusut dan belanja bantuan sosial otomatis meningkat, menahan ekonomi agar tidak jatuh lebih dalam.
            `,
            practice: `
                **Realita di Lapangan (Disiplin Fiskal & Crowding Out):**
                1. **Batas Legal APBN Indonesia**: Berdasarkan UU No. 17/2003 tentang Keuangan Negara, defisit anggaran dibatasi maksimal **3% dari PDB** dan rasio total utang pemerintah dibatasi maksimal **60% dari PDB**. Pembatasan ini lahir dari trauma krisis 1998 guna mencegah kebangkrutan fiskal.
                2. **Efek Crowding-Out**: Jika negara berutang terlalu agresif dengan menerbitkan Surat Berharga Negara (SBN) berbunga tinggi, investor swasta akan lebih memilih memarkir uangnya di SBN ketimbang meminjamkannya ke pengusaha lokal atau sektor swasta riil.
            `,
            keyTakeaway: "Defisit belanja efektif saat krisis untuk menopang daya beli, namun di masa normal fiskal harus dikonsolidasikan agar pemerintah memiliki bantalan (*fiscal buffer*) saat badai krisis berikutnya datang."
        },
        {
            id: "phillips_okun",
            title: "Kurva Phillips & Hukum Okun",
            category: "Ketenagakerjaan & Inflasi",
            icon: "📉",
            formula: "\\pi = \\pi^e - \\beta(u - u_n) + \\nu \\quad | \\quad \\Delta u = -0.4 \\times (g_{PDB} - g_{potensial})",
            theory: `
                - **Kurva Phillips Klasik**: Menggambarkan trade-off jangka pendek antara inflasi ($\pi$) dan pengangguran ($u$). Ketika ekonomi tumbuh pesat, pengangguran rendah, namun persaingan tenaga kerja menaikkan upah dan memicu inflasi.
                - **NAIRU (Non-Accelerating Inflation Rate of Unemployment)**: Tingkat pengangguran alami di mana inflasi stabil. Menekan pengangguran di bawah NAIRU secara paksa akan memicu spiral inflasi yang terus berakselerasi.
                - **Hukum Okun (Okun's Law)**: Setiap pertumbuhan ekonomi riil di atas kapasitas pertumbuhan tren potensial akan menurunkan tingkat pengangguran secara proporsional.
            `,
            practice: `
                **Realita di Lapangan (Mengapa Trade-off Bisa Rusak?):**
                1. **Stagflasi Merusak Kurva Phillips**: Pada tahun 1970-an (dan krisis energi global), terjadi inflasi tinggi bersamaan dengan melonjaknya pengangguran. Penyebabnya adalah *supply shock* ($\nu > 0$) yang menggeser seluruh kurva Phillips ke kanan atas.
                2. **Struktur Tenaga Kerja Informal**: Di Indonesia, sekitar 55-60% tenaga kerja berada di sektor informal. Saat terjadi perlambatan ekonomi, pekerja formal yang terkena PHK sering beralih menjadi pedagang kecil atau pekerja informal, sehingga angka pengangguran terbuka resmi tidak selalu melonjak setinggi di negara maju, namun angka kemiskinan dan kualitas hidup merosot drastis.
            `,
            keyTakeaway: "Target pertumbuhan tinggi tanpa inflasi hanya bisa dicapai bila kapasitas penyerapan tenaga kerja formal dan produktivitas riil dinaikkan secara bersamaan."
        },
        {
            id: "trilemma",
            title: "Trilema Kebijakan (The Impossible Trinity)",
            category: "Ekonomi Terbuka & Valas",
            icon: "🔺",
            formula: "\\text{Pilih maksimal 2 dari 3:} \\quad 1.\\text{Kurs Tetap} \\quad 2.\\text{Arus Modal Bebas} \\quad 3.\\text{Moneter Independen}",
            theory: `
                Dirumuskan oleh Robert Mundell dan Marcus Fleming. Suatu perekonomian terbuka tidak dapat memiliki 
                ketiga hal berikut secara bersamaan:
                1. Nilai tukar mata uang yang stabil/tetap (*Fixed Exchange Rate*).
                2. Arus lalu lintas modal keuangan bebas antarnegara (*Free Capital Mobility*).
                3. Kebijakan moneter independen untuk mengatur suku bunga domestik (*Autonomous Monetary Policy*).
            `,
            practice: `
                **Realita di Lapangan (Dilema Rupiah & The Fed AS):**
                Indonesia menganut rezim devisa bebas dan kebijakan moneter independen (mengejar target inflasi domestik). Konsekuensinya, nilai tukar Rupiah terhadap Dolar AS harus dibiarkan mengambang (*floating*).
                - Jika Bank Sentral AS (The Fed) menaikkan suku bunga secara agresif, terjadi *capital flight* (aliran modal kabur ke AS).
                - Jika Bank Indonesia tidak menaikkan BI-Rate, selisih imbal hasil (*yield spread*) mengecil, Rupiah tertekan drastis, memicu *imported inflation* (harga kedelai, BBM, gandum impor meroket).
                - Jika BI menaikkan suku bunga untuk membela Rupiah, ekonomi domestik dan dunia usaha lokal bisa tercekik. Inilah seni bauran kebijakan moneter (*policy mix*).
            `,
            keyTakeaway: "Cadangan devisa yang tebal dan fundamental ekspor yang kuat adalah benteng utama agar suatu negara tidak mudah dipermainkan oleh gejolak suku bunga global."
        },
        {
            id: "fisher_money",
            title: "Persamaan Fisher & Jebakan Cetak Uang",
            category: "Uang & Inflasi",
            icon: "💸",
            formula: "M \\cdot V = P \\cdot Y \\quad \\implies \\quad \\%\\Delta M + \\%\\Delta V = \\%\\Delta P + \\%\\Delta Y",
            theory: `
                Persamaan Kuantitas Uang oleh Irving Fisher menyatakan bahwa jumlah uang beredar ($M$) dikalikan 
                dengan kecepatan perputaran uang ($V$) selalu sama dengan tingkat harga ($P$) dikalikan output riil ($Y$).
                Jika kecepatan perputaran uang ($V$) diasumsikan konstan dalam jangka pendek dan output riil ($Y$) 
                terbatas oleh kapasitas fisik pabrik dan tenaga kerja, maka setiap pencetakan uang baru ($M$) secara 
                berlebihan akan langsung berubah 100% menjadi kenaikan harga ($P$) alias inflasi!
            `,
            practice: `
                **Realita di Lapangan (Mengapa Negara Tidak Boleh Asal Cetak Uang?):**
                Banyak orang awam bertanya: *“Kenapa pemerintah tidak cetak uang saja sebanyak-banyaknya untuk lunasi utang dan bagikan ke rakyat?”*
                - Sejarah membuktikan dalam kasus Weimar Jerman (1923), Zimbabwe (2008), dan Venezuela (2018): mencetak uang tanpa didasari pertambahan barang riil menyebabkan nilai uang lenyap, rakyat membawa segerobak uang hanya untuk membeli sebutir telur (Hiperinflasi).
                - Skema *Burden Sharing* Bank Indonesia dan Kemenkeu pada masa Pandemi COVID-19 (UU No. 2/2020) diperbolehkan hanya dalam status kedaruratan luar biasa, dengan batas waktu tegas dan tata kelola ketat agar kepercayaan pasar terhadap mata uang Garuda tetap terjaga.
            `,
            keyTakeaway: "Uang hanyalah cerminan alat tukar dari nilai barang dan jasa riil. Kesejahteraan sejati dibangun dari peningkatan produksi dan inovasi, bukan dari mesin cetak uang."
        }
    ],

    // --------------------------------------------------------------------------
    // 2. SKENARIO KRISIS & TANTANGAN BERSEJARAH (6 SCENARIOS)
    // --------------------------------------------------------------------------
    scenarios: [
        {
            id: "sc_tutorial",
            name: "Skenario 1: Era Normalisasi & Fondasi Teknokrat",
            difficulty: "Pemula (Tutorial Interaktif)",
            badge: "🟢 Mudah",
            duration: 8, // 8 Kuartal = 2 Tahun
            description: "Perekonomian berada dalam kondisi stabil namun lambat. Tugas Anda adalah memacu pertumbuhan PDB menuju 5.3% tanpa memicu inflasi di atas 3.5% dan menjaga defisit APBN di bawah batas aman 2.8%.",
            historicalContext: "Terinspirasi dari periode konsolidasi ekonomi Indonesia, di mana stabilitas makroekonomi menjadi prasyarat ekspansi investasi riil.",
            initialState: {
                quarter: 1,
                year: 1,
                gdpGrowth: 4.8,          // % YoY
                potentialGrowth: 5.2,    // % Potensial
                inflation: 2.8,          // % YoY
                unemployment: 5.8,       // %
                biRate: 6.0,             // % BI-Rate
                fedRate: 5.25,           // % US Fed Fund
                exchangeRate: 15600,     // IDR / USD
                fxReserves: 138,         // Miliar USD
                taxRate: 11.0,           // % Efektif
                govSpending: 3100,       // Triliun IDR/tahun
                energySubsidy: 320,      // Triliun IDR/tahun
                debtToGdp: 39.2,         // % PDB
                deficitToGdp: 2.2,       // % PDB
                approvalRating: 68       // % Kepuasan Publik
            },
            targetGoals: {
                minGdpGrowth: 5.3,
                maxInflation: 3.5,
                maxDeficit: 2.8,
                minApproval: 65
            },
            tips: "Gunakan penurunan BI-rate secara bertahap untuk memancing gairah kredit swasta, lalu jaga belanja pemerintah pada pos infrastruktur produktif."
        },
        {
            id: "sc_1998",
            name: "Skenario 2: Badai Krisis Nilai Tukar (Mirip 1998)",
            difficulty: "Sangat Menantang",
            badge: "🔴 Sulit",
            duration: 8,
            description: "Sentimen investor global anjlok, terjadi pelarian modal besar-besaran (sudden capital outflow). Kurs Rupiah terjun bebas, inflasi barang impor melonjak tinggi, dan perbankan terancam krisis likuiditas.",
            historicalContext: "Berdasarkan Krisis Finansial Asia 1997/1998. Menunjukkan betapa rentannya ekonomi terbuka terhadap kepanikan valuta asing dan bahaya 'Trilema Mundell-Fleming'.",
            initialState: {
                quarter: 1,
                year: 1,
                gdpGrowth: -1.5,
                potentialGrowth: 4.8,
                inflation: 14.5,
                unemployment: 9.2,
                biRate: 12.0,
                fedRate: 5.5,
                exchangeRate: 17800,
                fxReserves: 98,
                taxRate: 10.0,
                govSpending: 3300,
                energySubsidy: 480,
                debtToGdp: 54.0,
                deficitToGdp: 4.8,
                approvalRating: 34
            },
            targetGoals: {
                minGdpGrowth: 2.5,
                maxInflation: 6.5,
                maxExchangeRate: 16000,
                maxDebtToGdp: 58.0
            },
            tips: "Naikkan suku bunga untuk menahan pelarian modal, gunakan intervensi valas terukur dari cadangan devisa, dan jaga kepercayaan publik pada sektor perbankan."
        },
        {
            id: "sc_stagflation",
            name: "Skenario 3: Badai Stagflasi Energi Dunia",
            difficulty: "Menengah-Tinggi",
            badge: "🟠 Sedang",
            duration: 8,
            description: "Perang geopolitik memicu lonjakan harga minyak mentah dan pangan dunia. Biaya produksi meroket (Supply Shock). Memangkas subsidi akan memicu protes rakyat, namun membiarkannya akan menjebol APBN.",
            historicalContext: "Menggambarkan fenomena krisis pasokan energi global tahun 1973 dan 2022. Kurva Penawaran Agregat (AS) terdorong ke kiri atas.",
            initialState: {
                quarter: 1,
                year: 1,
                gdpGrowth: 3.2,
                potentialGrowth: 5.0,
                inflation: 7.8,
                unemployment: 6.9,
                biRate: 6.75,
                fedRate: 5.5,
                exchangeRate: 16200,
                fxReserves: 132,
                taxRate: 11.5,
                govSpending: 3200,
                energySubsidy: 550,
                debtToGdp: 42.5,
                deficitToGdp: 3.6,
                approvalRating: 52
            },
            targetGoals: {
                maxInflation: 4.5,
                minGdpGrowth: 4.5,
                maxDeficit: 3.0,
                minApproval: 50
            },
            tips: "Lakukan realokasi subsidi dari yang bersifat umum (BBM) ke bantuan langsung tunai (BLT) targeted agar daya beli kelompok rentan tetap terlindungi tanpa membakar kas negara."
        },
        {
            id: "sc_covid",
            name: "Skenario 4: Pandemi & Resesi Global (Double Shock)",
            difficulty: "Tinggi",
            badge: "🔴 Sulit",
            duration: 8,
            description: "Aktivitas masyarakat terhenti, konsumsi anjlok (Demand Shock) dan rantai pasok terputus (Supply Shock). Penerimaan pajak terjun bebas, angka kemiskinan dan pengangguran mengancam.",
            historicalContext: "Berdasarkan krisis Pandemi Covid-19 tahun 2020. Diperlukan respon bauran fiskal dan moneter terkoordinasi (kebijakan countercyclical) yang luar biasa.",
            initialState: {
                quarter: 1,
                year: 1,
                gdpGrowth: -2.1,
                potentialGrowth: 5.0,
                inflation: 1.6,
                unemployment: 7.9,
                biRate: 4.5,
                fedRate: 0.25,
                exchangeRate: 16300,
                fxReserves: 125,
                taxRate: 9.5,
                govSpending: 3600,
                energySubsidy: 280,
                debtToGdp: 40.8,
                deficitToGdp: 5.8,
                approvalRating: 48
            },
            targetGoals: {
                minGdpGrowth: 4.0,
                maxUnemployment: 5.8,
                maxDebtToGdp: 48.0,
                minApproval: 60
            },
            tips: "Gunakan pelonggaran moneter agresif (turunkan suku bunga & GWM), gelontorkan bansos penyelamat daya beli, dan dukung restrukturisasi kredit bagi UMKM."
        },
        {
            id: "sc_dutch_disease",
            name: "Skenario 5: Commodity Boom & Ancaman Penyakit Belanda",
            difficulty: "Menengah",
            badge: "🟠 Sedang",
            duration: 8,
            description: "Harga nikel, tembaga, dan batubara meroket. Ekspor melonjak, devisa membanjiri kas negara, Rupiah menguat sangat tajam. Namun sektor industri manufaktur dalam negeri terancam mati karena barang lokal menjadi mahal di pasar global!",
            historicalContext: "Terinspirasi dari fenomena 'Dutch Disease' tahun 1960-an di Belanda (gas alam) dan siklus superkomoditas di Indonesia tahun 2008 & 2021.",
            initialState: {
                quarter: 1,
                year: 1,
                gdpGrowth: 6.4,
                potentialGrowth: 5.3,
                inflation: 5.2,
                unemployment: 5.1,
                biRate: 5.75,
                fedRate: 4.0,
                exchangeRate: 13900,
                fxReserves: 165,
                taxRate: 11.0,
                govSpending: 3400,
                energySubsidy: 300,
                debtToGdp: 35.0,
                deficitToGdp: 1.1,
                approvalRating: 75
            },
            targetGoals: {
                maxInflation: 3.5,
                minGdpGrowth: 5.0,
                minFxReserves: 170
            },
            tips: "Jangan hamburkan windfall pendapatan komoditas untuk konsumsi sesaat. Alokasikan ke Sovereign Wealth Fund (SWF) / Danantara dan dorong hilirisasi industri manufaktur."
        },
        {
            id: "sc_hyperinflation",
            name: "Skenario 6: Tantangan Menjinakkan Api Hiperinflasi",
            difficulty: "Ekstrem",
            badge: "🟣 Hardcore",
            duration: 8,
            description: "Pemerintah sebelumnya mencetak uang secara serampangan untuk menutup defisit kronis. Kepercayaan pada uang kertas runtuh, inflasi menembus 35% per kuartal, dan masyarakat beralih menimbun barang!",
            historicalContext: "Pelajaran dari tragedi hiperinflasi Weimar 1923, Indonesia 1965 (inflasi 650%), dan Zimbabwe 2008. Teori Kuantitas Uang Fisher M*V = P*Y bekerja secara brutal.",
            initialState: {
                quarter: 1,
                year: 1,
                gdpGrowth: -5.0,
                potentialGrowth: 4.5,
                inflation: 38.0,
                unemployment: 12.5,
                biRate: 24.0,
                fedRate: 5.0,
                exchangeRate: 22000,
                fxReserves: 65,
                taxRate: 12.0,
                govSpending: 4200,
                energySubsidy: 600,
                debtToGdp: 68.0,
                deficitToGdp: 7.5,
                approvalRating: 20
            },
            targetGoals: {
                maxInflation: 8.0,
                minGdpGrowth: 1.0,
                maxDeficit: 3.0,
                minApproval: 40
            },
            tips: "Disiplin fiskal mati-matian: hentikan cetak uang moneter, pangkas pemborosan APBN, naikkan suku bunga setinggi mungkin untuk memulihkan daya simpan, dan pulihkan independensi bank sentral."
        }
    ],

    // --------------------------------------------------------------------------
    // 3. FLASH POLICY DILEMMAS (PERISTIWA MENDADAK DI SIDANG KABINET)
    // --------------------------------------------------------------------------
    flashDilemmas: [
        {
            id: "fed_hike",
            headline: "⚡ THE FED AS MENAIKKAN SUKU BUNGA SECARA AGRESIF (+75 bps)!",
            description: "Inflasi tinggi di Amerika Serikat memaksa Bank Sentral AS mengerek bunga tajam. Imbal hasil obligasi AS (US Treasury) melonjak, memicu kepanikan modal kabur dari negara berkembang. Rupiah melemah cepat!",
            theoryContext: "Trilema Mundell-Fleming & Interest Rate Parity: Selisih bunga menyempit mendorong arus modal keluar.",
            options: [
                {
                    text: "Ikut Kerek BI-Rate (+50 bps) untuk Pertahankan Selisih Imbal Hasil",
                    fxImpact: -150,
                    growthImpact: -0.3,
                    inflationImpact: -0.4,
                    approvalImpact: -2,
                    explanation: "Keputusan ortodoks moneter: Rupiah terselamatkan dari kejatuhan parah, namun sektor riil lokal tertekan oleh bunga pinjaman yang lebih mahal."
                },
                {
                    text: "Tahan Suku Bunga & Guyur Cadangan Devisa untuk Intervensi Pasar",
                    fxImpact: 250,
                    growthImpact: 0.1,
                    inflationImpact: 0.2,
                    approvalImpact: 1,
                    reservesDrain: 8,
                    explanation: "Melindungi pertumbuhan domestik jangka pendek, namun mengorbankan bantalan devisa negara. Jika tekanan Fed berlanjut, devisa bisa habis!"
                },
                {
                    text: "Biarkan Kurs Melemah Bebas (Depresiasi) Demi Menjaga Daya Saing Ekspor",
                    fxImpact: 600,
                    growthImpact: 0.2,
                    inflationImpact: 1.2,
                    approvalImpact: -6,
                    explanation: "Eksportir diuntungkan, namun harga kedelai, gandum, dan BBM impor melonjak, memicu lonjakan inflasi yang memukul daya beli masyarakat."
                }
            ]
        },
        {
            id: "oil_spike",
            headline: "🛢️ KONFLIK GEOPOLITIK: HARGA MINYAK DUNIA MENEMBUS $110/BAREL!",
            description: "Pasokan minyak dunia terganggu. Biaya impor minyak mentah Indonesia membengkak. Beban subsidi BBM di APBN terancam membengkak puluhan triliun rupiah.",
            theoryContext: "Supply Shock & Fiscal Space Dilemma: Pilihan antara stabilitas inflasi konsumen vs defisit anggaran negara.",
            options: [
                {
                    text: "Taikkan Harga BBM Bersubsidi (Menjaga Kesehatan APBN)",
                    fxImpact: 0,
                    growthImpact: -0.5,
                    inflationImpact: 2.1,
                    deficitImpact: -0.8,
                    approvalImpact: -12,
                    explanation: "Langkah pahit yang bertanggung jawab secara fiskal: APBN aman dari kebangkrutan, namun inflasi melompat seketika dan popularitas Anda anjlok drastis."
                },
                {
                    text: "Tambah Anggaran Subsidi BBM (Menahan Harga di Tingkat Konsumen)",
                    fxImpact: 100,
                    growthImpact: 0.1,
                    inflationImpact: 0.2,
                    deficitImpact: 1.2,
                    approvalImpact: 5,
                    explanation: "Masyarakat senang dan inflasi tetap terkendali sesaat, namun ruang fiskal untuk infrastruktur dan pendidikan tergerus habis."
                },
                {
                    text: "Batasi Pembelian BBM Subsidi untuk Mobil Mewah & Perkuat Bansos",
                    fxImpact: 50,
                    growthImpact: -0.1,
                    inflationImpact: 0.8,
                    deficitImpact: -0.2,
                    approvalImpact: -2,
                    explanation: "Solusi jalan tengah yang cerdas: Subsidi lebih tepat sasaran, beban APBN tertahan, dan kelompok miskin mendapatkan kompensasi tunai."
                }
            ]
        },
        {
            id: "crop_failure",
            headline: "🌾 GELOMBANG PANAS EL NINO: PANEN PADI ANJLOK 25%!",
            description: "Kekeringan berkepanjangan memicu kelangkaan beras dan bahan pangan pokok. Harga beras melonjak di seluruh pasar tradisional (Volatile Food Inflation).",
            theoryContext: "Volatile Food Shock: Bobot pangan sangat besar dalam keranjang konsumsi masyarakat berpenghasilan rendah.",
            options: [
                {
                    text: "Buka Kran Impor Beras Skala Besar & Operasi Pasar Murah",
                    fxImpact: 100,
                    growthImpact: 0.0,
                    inflationImpact: -1.2,
                    approvalImpact: 4,
                    tradeBalanceImpact: -1.5,
                    explanation: "Pasokan cepat pulih dan inflasi pangan mereda dalam hitungan minggu, meski ada protes dari asosiasi petani lokal."
                },
                {
                    text: "Taikkan Suku Bunga BI-Rate untuk Meredam Inflasi",
                    fxImpact: -50,
                    growthImpact: -0.4,
                    inflationImpact: -0.1,
                    approvalImpact: -5,
                    explanation: "Kesalahan teori klasik: Menjawab masalah kekurangan pasokan fisik (supply shock) dengan instrumen moneter! Bunga naik tidak bisa menumbuhkan padi di sawah."
                },
                {
                    text: "Gelontorkan Bantuan Pangan Beras Gratis dari Cadangan Pemerintah",
                    fxImpact: 0,
                    growthImpact: 0.1,
                    inflationImpact: -0.6,
                    deficitImpact: 0.3,
                    approvalImpact: 7,
                    explanation: "Sangat efektif menjaga daya beli kelompok rentan terbawah, meski sedikit menambah pos belanja darurat APBN."
                }
            ]
        },
        {
            id: "sovereign_downgrade",
            headline: "⚠️ LEMBAGA PEMERINGKAT INTERNASIONAL MEMPERINGATKAN UTANG NEGARA!",
            description: "Lembaga rating kredit global menyoroti lonjakan defisit APBN dan penerimaan pajak yang lesu. Rating obligasi negara terancam diturunkan ke status rawan spekulasi.",
            theoryContext: "Sovereign Risk Premium & Fiscal Credibility: Persepsi risiko menentukan bunga utang yang harus dibayar negara.",
            options: [
                {
                    text: "Umumkan Paket Konsolidasi Fiskal & Efisiensi Belanja Non-Prioritas",
                    growthImpact: -0.2,
                    inflationImpact: -0.3,
                    deficitImpact: -0.6,
                    approvalImpact: -3,
                    explanation: "Mengembalikan kepercayaan investor internasional, imbal hasil SBN turun, dan kredibilitas fiskal Indonesia terjaga kokoh."
                },
                {
                    text: "Naikkan Tarif PPh Badan dan Pajak Orang Kaya (Pajak Progresif)",
                    growthImpact: -0.3,
                    inflationImpact: 0.0,
                    deficitImpact: -0.5,
                    approvalImpact: 1,
                    explanation: "Meningkatkan rasio pajak secara adil, meski ada kekhawatiran sebagian pengusaha menahan ekspansi investasi baru."
                },
                {
                    text: "Abaikan Peringatan Rating & Terus Geber Belanja Utang",
                    growthImpact: 0.4,
                    inflationImpact: 0.5,
                    deficitImpact: 0.8,
                    approvalImpact: 3,
                    riskWarning: true,
                    explanation: "Populer sesaat, namun investor asing mulai menuntut bunga utang jauh lebih tinggi (yield lonjak), memperbesar bom waktu beban bunga APBN."
                }
            ]
        }
    ],

    // --------------------------------------------------------------------------
    // 4. BANK SOAL KUIS UJIAN SEMESTER MAKROEKONOMI (25 SOAL UTS & UAS)
    // --------------------------------------------------------------------------
    quizQuestions: [
        {
            id: "q1",
            category: "PDB & Pendapatan Nasional",
            question: "Mengapa transaksi jual beli saham bekas atau obligasi lama di pasar modal sekunder TIDAK dimasukkan ke dalam perhitungan Produk Domestik Bruto (PDB) tahun berjalan?",
            options: [
                "Karena transaksi tersebut hanyalah transfer kepemilikan aset finansial yang sudah ada, bukan penciptaan barang atau jasa baru pada periode berjalan",
                "Karena seluruh keuntungan transaksi di bursa saham telah dibebaskan dari pengenaan pajak penghasilan",
                "Karena harga saham selalu berfluktuasi harian sehingga tidak memiliki nilai nominal yang pasti",
                "Karena transaksi pasar modal hanya melibatkan mata uang asing dan bukan mata uang rupiah"
            ],
            correct: 0,
            explanation: "PDB mengukur nilai pasar dari seluruh barang dan jasa akhir yang diproduksi di dalam negeri dalam suatu periode tertentu. Pembelian surat berharga lama di pasar sekunder hanyalah perpindahan hak milik (pure financial transfer), sehingga tidak menambah output fisik baru dan tidak dihitung dalam PDB agar terhindar dari perhitungan ganda (double counting)."
        },
        {
            id: "q2",
            category: "PDB Riil vs Nominal",
            question: "Pada tahun 2023, PDB Nominal suatu negara adalah Rp 1.000 Triliun dengan Deflator PDB sebesar 100. Pada tahun 2024, PDB Nominal naik menjadi Rp 1.260 Triliun dan Deflator PDB naik menjadi 120. Berapakah laju pertumbuhan ekonomi riil negara tersebut pada tahun 2024?",
            options: [
                "5,0% (PDB Riil 2023 = Rp 1.000 T, PDB Riil 2024 = Rp 1.260 T / 1,20 = Rp 1.050 T)",
                "26,0% (berdasarkan pertumbuhan nilai PDB nominal murni)",
                "20,0% (berdasarkan persentase kenaikan deflator harga)",
                "6,0% (selisih pengurangan antara pertumbuhan nominal dan inflasi deflator)"
            ],
            correct: 0,
            explanation: "Formula PDB Riil = PDB Nominal / (Deflator / 100). PDB Riil 2023 = 1.000 / 1,00 = Rp 1.000 T. PDB Riil 2024 = 1.260 / 1,20 = Rp 1.050 T. Laju pertumbuhan ekonomi riil = [(1.050 - 1.000) / 1.000] * 100% = 5,0%."
        },
        {
            id: "q3",
            category: "Keseimbangan Pasar Barang Keynesian",
            question: "Dalam model perekonomian tertutup sederhana tanpa sektor pemerintah (Y = C + I), fungsi konsumsi adalah C = 200 + 0,75Y dan investasi otonom I = 100. Berapakah tingkat pendapatan nasional ekuilibrium (Y) dan besarnya tabungan (S) pada titik keseimbangan tersebut?",
            options: [
                "Y = 1.200 dan S = 100 (karena pada ekuilibrium pasar barang S = I)",
                "Y = 300 dan S = 0",
                "Y = 800 dan S = 200",
                "Y = 1.500 dan S = 300"
            ],
            correct: 0,
            explanation: "Keseimbangan pasar barang: Y = C + I => Y = 200 + 0,75Y + 100 => 0,25Y = 300 => Y = 1.200. Pada pendapatan Y = 1.200, pengeluaran konsumsi C = 200 + 0,75(1.200) = 1.100. Maka Tabungan S = Y - C = 1.200 - 1.100 = 100, yang tepat sama dengan nilai investasi I = 100 (S = I)."
        },
        {
            id: "q4",
            category: "Teori Multiplier Anggaran Berimbang",
            question: "Mengapa dalam model Makroekonomi Keynes, kebijakan anggaran berimbang di mana pemerintah menaikkan belanja negara (ΔG) dan menaikkan pajak (ΔT) dalam jumlah nominal yang sama persis (ΔG = ΔT) tetap menghasilkan efek ekspansi terhadap output nasional (ΔY = ΔG, atau angka pengganda = 1)?",
            options: [
                "Karena seluruh belanja negara (G) langsung menjadi permintaan agregat, sedangkan kenaikan pajak (T) sebagian diserap dari pemotongan tabungan masyarakat, bukan dari konsumsi seluruhnya",
                "Karena bank sentral mencetak uang kartal baru untuk mendanai pengadaan proyek pemerintah",
                "Karena suku bunga perbankan komersial otomatis turun drastis saat tarif pajak dinaikkan",
                "Karena sektor swasta menggandakan investasinya untuk meminimalkan beban pajak"
            ],
            correct: 0,
            explanation: "Multiplier Belanja adalah k_G = 1 / (1 - MPC) dan Multiplier Pajak adalah k_T = -MPC / (1 - MPC). Total dampak: ΔY = k_G * ΔG + k_T * ΔT. Karena ΔG = ΔT, maka ΔY = [(1 - MPC) / (1 - MPC)] * ΔG = 1 * ΔG. Kenaikan belanja 100% masuk ke sirkulasi output, sedangkan kenaikan pajak hanya memotong konsumsi sebesar MPC * ΔT (sisanya memotong tabungan MPS * ΔT)."
        },
        {
            id: "q5",
            category: "Paradoks Berhemat (Keynes)",
            question: "Apakah yang dimaksud dengan 'Paradoks Berhemat' (Paradox of Thrift) yang dikemukakan oleh John Maynard Keynes dalam konteks resesi ekonomi?",
            options: [
                "Upaya serentak seluruh masyarakat untuk meningkatkan tabungan saat resesi justru memangkas pengeluaran konsumsi agregat, memperparah penurunan PDB, sehingga total tabungan nasional akhir masyarakat tidak bertambah",
                "Pemerintah yang melakukan penghematan anggaran belanja akan selalu mengalami surplus perdagangan luar negeri",
                "Bank komersial yang menahan cadangan likuiditas tinggi akan memperoleh margin bunga bersih terbesar",
                "Masyarakat yang membelanjakan seluruh pendapatannya akan selalu terbebas dari ancaman inflasi"
            ],
            correct: 0,
            explanation: "Saat resesi, jika masyarakat secara serentak meningkatkan porsi tabungan (marginal propensity to save naik), pengeluaran konsumsi (C) merosot drastis. Penjualan industri anjlok, gelombang PHK meluas, dan pendapatan nasional (Y) menyusut tajam. Akibat pendapatan agregat yang anjlok, jumlah absolut uang yang berhasil ditabung masyarakat pada akhirnya tetap sama atau justru berkurang."
        },
        {
            id: "q6",
            category: "Model AD-AS: Kemiringan Kurva AD",
            question: "Manakah di bawah ini yang BUKAN merupakan salah satu dari tiga alasan teoretis mengapa Kurva Permintaan Agregat (AD) memiliki kemiringan negatif (downward sloping)?",
            options: [
                "Efek Biaya Produksi Marjinal (Marginal Cost Effect), di mana penurunan harga bahan baku mendorong pabrik merekrut lebih banyak buruh",
                "Efek Kekayaan Pigou (Wealth Effect), di mana penurunan tingkat harga meningkatkan nilai riil uang yang dipegang konsumen sehingga konsumsi meningkat",
                "Efek Suku Bunga Keynes (Interest Rate Effect), di mana penurunan harga menurunkan kebutuhan memegang uang riil, menekan suku bunga, dan memacu investasi",
                "Efek Nilai Tukar Mundell-Fleming (Exchange Rate Effect), di mana penurunan suku bunga mendepresiasi mata uang domestik dan mendorong ekspor neto"
            ],
            correct: 0,
            explanation: "Tiga fondasi teoretis kemiringan negatif kurva AD adalah: (1) Efek Kekayaan Pigou (P turun => nilai riil uang naik => C naik), (2) Efek Suku Bunga Keynes (P turun => permintaan uang turun => r turun => I naik), dan (3) Efek Nilai Tukar Mundell-Fleming (r turun => modal keluar => kurs depresiasi => NX naik). Konsep biaya marjinal pabrik adalah konsep kurva penawaran mikro, bukan penentu kurva AD makro."
        },
        {
            id: "q7",
            category: "Model AD-AS: Kurva SRAS",
            question: "Menurut Teori Upah Kaku (Sticky-Wage Theory), mengapa Kurva Penawaran Agregat Jangka Pendek (SRAS) memiliki kemiringan positif (upward sloping)?",
            options: [
                "Karena upah nominal lambat menyesuaikan diri akibat kontrak kerja, sehingga kenaikan harga barang yang tak terduga menurunkan upah riil, melebarkan margin laba produsen, dan mendorong penambahan output fisik",
                "Karena serikat buruh selalu bersedia memotong upah nominal saat harga-harga barang kebutuhan pokok naik",
                "Karena kapasitas fisik mesin pabrik otomatis bertambah saat terjadi inflasi harga barang",
                "Karena pemerintah menetapkan harga jual seluruh barang konsumsi melalui undang-undang"
            ],
            correct: 0,
            explanation: "Dalam jangka pendek, upah nominal bersifat kaku (sticky) karena kontrak kerja dan norma sosial. Jika tingkat harga umum (P) naik di atas ekspektasi sementara upah nominal (W) tetap, upah riil pekerja (W/P) turun. Biaya riil tenaga kerja menjadi lebih murah bagi perusahaan, meningkatkan profitabilitas, sehingga perusahaan mempekerjakan lebih banyak buruh dan menambah output produksi (Y naik)."
        },
        {
            id: "q8",
            category: "Model IS-LM: Keseimbangan Pasar Barang",
            question: "Dalam model IS-LM, kurva IS merepresentasikan keseimbangan di pasar barang. Mengapa kurva IS memiliki kemiringan negatif (downward sloping) dalam diagram suku bunga riil (r) vs output nasional (Y)?",
            options: [
                "Kenaikan suku bunga riil menaikkan biaya pinjaman modal, menekan pengeluaran investasi terencana (I), yang melalui proses multiplier memotong output ekuilibrium agregat (Y)",
                "Kenaikan suku bunga riil secara otomatis meningkatkan jumlah uang kartal yang beredar di masyarakat",
                "Penurunan output nasional secara otomatis mendorong pemerintah melipatgandakan belanja infrastruktur",
                "Kenaikan suku bunga riil menggeser kurva penawaran agregat jangka panjang ke kanan"
            ],
            correct: 0,
            explanation: "Kurva IS (Investment-Saving) diturunkan dari ekuilibrium pasar barang Y = C(Y - T) + I(r) + G. Hubungan negatif terjadi karena investasi terencana (I) berbanding terbalik dengan suku bunga (r). Kenaikan r menaikkan hurdle rate proyek bisnis, memotong belanja modal (I turun), yang melalui multiplier Keynesian menurunkan output nasional agregat (Y turun)."
        },
        {
            id: "q9",
            category: "Model IS-LM: Keseimbangan Pasar Uang",
            question: "Kurva LM merepresentasikan keseimbangan di pasar uang riil (M/P = L(r, Y)). Mengapa kurva LM memiliki kemiringan positif (upward sloping)?",
            options: [
                "Kenaikan output nasional (Y) meningkatkan volume transaksi dan permintaan uang riil, sehingga pada jumlah penawaran uang yang tetap, suku bunga riil (r) harus naik agar pasar uang kembali ekuilibrium",
                "Bank sentral diwajibkan menyita cadangan devisa setiap kali perekonomian mengalami pertumbuhan",
                "Masyarakat lebih memilih memegang uang tunai saat suku bunga tabungan dan obligasi sangat tinggi",
                "Tingkat inflasi selalu bernilai persis nol di sepanjang garis kurva LM"
            ],
            correct: 0,
            explanation: "Permintaan uang riil L(r, Y) dipengaruhi positif oleh pendapatan Y (motif transaksi) dan negatif oleh suku bunga r (biaya peluang memegang uang tunai). Ketika Y meningkat, kebutuhan likuiditas transaksi naik. Karena penawaran uang riil (M/P) dipatok tetap oleh bank sentral, suku bunga (r) harus naik untuk menekan permintaan uang spekulasi hingga penawaran kembali sama dengan permintaan."
        },
        {
            id: "q10",
            category: "Perangkap Likuiditas (Liquidity Trap)",
            question: "Apakah yang dimaksud dengan fenomena 'Perangkap Likuiditas' (Liquidity Trap), dan bagaimana efektivitas bauran kebijakan makroekonomi pada kondisi tersebut?",
            options: [
                "Kondisi saat suku bunga nominal mendekati batas nol (Zero Lower Bound) dan kurva LM horizontal; kebijakan moneter konvensional menjadi tidak berdaya, sementara kebijakan fiskal memiliki efektivitas pengganda maksimum tanpa efek crowding-out",
                "Kondisi saat seluruh sistem perbankan komersial kehabisan dana tunai dan dinyatakan bangkrut",
                "Keadaan di mana kebijakan fiskal dilarang oleh mahkamah konstitusi",
                "Kondisi saat laju inflasi melonjak liar di atas 1.000% per tahun (hiperinflasi)"
            ],
            correct: 0,
            explanation: "Pada perangkap likuiditas (Liquidity Trap), suku bunga sudah sangat rendah sehingga elastisitas permintaan uang terhadap suku bunga menjadi tak terhingga (kurva LM horizontal). Penambahan uang beredar oleh bank sentral hanya akan ditimbun masyarakat tanpa mampu menurunkan bunga lebih jauh. Kebijakan fiskal ekspansif (G naik) sangat efektif karena pergeseran kurva IS ke kanan melipatgandakan output tanpa memicu kenaikan suku bunga (crowding-out = 0)."
        },
        {
            id: "q11",
            category: "Teori Permintaan Uang Keynes",
            question: "Menurut Teori Preferensi Likuiditas Keynes, masyarakat memegang uang tunai karena tiga motif: Transaksi, Berjaga-jaga, dan Spekulasi. Motif manakah yang paling sensitif dan berhubungan terbalik secara langsung dengan tingkat suku bunga pasar?",
            options: [
                "Motif Spekulasi, karena suku bunga obligasi mencerminkan biaya peluang (opportunity cost) dari memegang uang tunai yang tidak menghasilkan imbal hasil",
                "Motif Transaksi, karena harga barang-barang pokok ditentukan langsung oleh suku bunga acuan",
                "Motif Berjaga-jaga, karena biaya darurat kecelakaan mengikuti pergerakan suku bunga perbankan",
                "Ketiga motif sama sekali tidak dipengaruhi oleh fluktuasi suku bunga pasar"
            ],
            correct: 0,
            explanation: "Motif spekulasi timbul karena memegang uang kas tidak menghasilkan bunga. Suku bunga obligasi adalah opportunity cost dari memegang uang likuid. Saat suku bunga pasar tinggi, publik lebih memilih membeli obligasi/deposito berbunga. Saat suku bunga pasar sangat rendah, biaya memegang uang tunai menjadi sangat murah sehingga permintaan uang kas spekulasi melonjak tinggi."
        },
        {
            id: "q12",
            category: "Teori Kuantitas Uang & Netralitas Uang",
            question: "Doktrin 'Netralitas Uang' (Monetary Neutrality) dalam teori ekonomi makro klasik menyatakan bahwa penambahan jumlah uang beredar dalam jangka panjang akan...",
            options: [
                "Hanya melipatgandakan variabel-variabel nominal (seperti tingkat harga umum dan upah nominal), tanpa mengubah variabel-variabel riil (seperti output riil, penyerapan tenaga kerja, dan suku bunga riil)",
                "Meningkatkan kapasitas produksi fisik pabrik secara permanen",
                "Menghapuskan angka pengangguran friksional dan struktural untuk selamanya",
                "Menurunkan suku bunga riil perbankan menjadi negatif secara permanen"
            ],
            correct: 0,
            explanation: "Menurut Classical Dichotomy, variabel nominal (dinyatakan dalam satuan moneter) dan variabel riil (dinyatakan dalam satuan output fisik) terpisah dalam jangka panjang. Karena uang hanyalah alat hitung transaksi (alat tukar), penambahan jumlah uang beredar (M) dalam jangka panjang hanya akan menaikkan tingkat harga (P) dan upah nominal (W) secara proporsional, meninggalkan output fisik (Y) dan upah riil (W/P) tidak berubah."
        },
        {
            id: "q13",
            category: "Penciptaan Uang & Money Multiplier",
            question: "Jika masyarakat mulai kehilangan kepercayaan pada perbankan dan menarik simpanannya menjadi uang tunai di rumah (rasio uang kartal terhadap giral atau Currency-Deposit Ratio / cr meningkat drastis), apa dampak yang terjadi pada Money Multiplier dan Jumlah Uang Beredar?",
            options: [
                "Money Multiplier menyusut drastis dan Jumlah Uang Beredar (M1) terkontraksi tajam karena basis cadangan perbankan untuk menyalurkan kredit tergerus",
                "Money Multiplier melonjak tinggi karena uang tunai berputar lebih cepat di pasar tradisional",
                "Jumlah uang beredar tidak berubah karena bank sentral otomatis mencetak uang pengganti secara instan",
                "Suku bunga kredit perbankan langsung jatuh mendekati nol persen"
            ],
            correct: 0,
            explanation: "Formula pengganda uang adalah m = (cr + 1) / (cr + rr). Ketika preferensi memegang uang kartal (cr) melonjak saat kepanikan perbankan (bank run), penyebut bertambah lebih besar secara proporsional sehingga angka m anjlok. Bank umum kehilangan likuiditas cadangan untuk menciptakan kredit giral baru, memicu kontraksi moneter parah (sebagaimana analisis Friedman & Schwartz pada krisis 1930)."
        },
        {
            id: "q14",
            category: "Persamaan Fisher & Suku Bunga Riil",
            question: "Jika suku bunga nominal deposito di bank adalah 5% per tahun dan laju inflasi aktual tercatat mencapai 9% per tahun, berapakah tingkat suku bunga riil yang diterima penabung, dan apa implikasi redistribusi kemakmurannya?",
            options: [
                "-4% per tahun; daya beli riil tabungan menyusut dan terjadi transfer kemakmuran riil dari kreditur (penabung) kepada debitur (peminjam)",
                "+4% per tahun; penabung memperoleh keuntungan riil bersih di atas laju inflasi",
                "+14% per tahun; penabung dilindungi penuh dari depresiasi mata uang",
                "-45% per tahun; saldo rekening tabungan nasabah otomatis berkurang setengahnya"
            ],
            correct: 0,
            explanation: "Persamaan Fisher: r = i - π = 5% - 9% = -4% per tahun. Suku bunga riil bernilai negatif berarti nilai riil simpanan penabung tergerus 4% per tahun. Peminjam (debitur) diuntungkan karena membayar kembali pinjaman dengan uang yang daya belinya telah merosot akibat inflasi, sedangkan penabung (kreditur) menanggung kerugian daya beli riil."
        },
        {
            id: "q15",
            category: "Efek Desakan (Crowding-Out)",
            question: "Derajat Efek Desakan (Crowding-Out Effect) dari kebijakan fiskal ekspansif akan bernilai MAKSIMAL (Crowding-Out Penuh di mana output PDB riil tidak bertambah sama sekali) apabila...",
            options: [
                "Kurva LM berbentuk garis lurus vertikal sempurna (permintaan uang sama sekali tidak sensitif terhadap suku bunga, pandangan Klasik Murni)",
                "Kurva LM berbentuk garis horizontal sempurna (kondisi Liquidity Trap Keynesian)",
                "Pengeluaran investasi swasta sama sekali tidak terpengaruh oleh kenaikan suku bunga (kurva IS vertikal)",
                "Pemerintah menerapkan anggaran belanja berimbang setiap kuartal"
            ],
            correct: 0,
            explanation: "Jika kurva LM vertikal sempurna (permintaan uang murni untuk transaksi dan tidak elastis terhadap suku bunga), pergeseran kurva IS ke kanan akibat kenaikan belanja pemerintah (G) hanya akan mendongkrak suku bunga pasar riil naik setinggi-tingginya tanpa mengubah output ekuilibrium Y. Penurunan investasi swasta (ΔI) persis menyamai kenaikan belanja pemerintah (ΔG), sehingga crowding-out terjadi 100%."
        },
        {
            id: "q16",
            category: "Ekuivalensi Ricardian (Barro-Ricardo)",
            question: "Menurut Teorema Ekuivalensi Ricardian (Ricardian Equivalence), mengapa pemotongan pajak yang dibiayai dengan penerbitan obligasi utang negara TIDAK MAMPU menstimulasi pengeluaran konsumsi agregat masyarakat?",
            options: [
                "Konsumen yang berpandangan ke depan (forward-looking) menyadari bahwa penerbitan utang hari ini akan dibayar dengan kenaikan pajak di masa depan, sehingga mereka menabung seluruh uang hasil pemotongan pajak",
                "Karena uang hasil pemotongan pajak secara otomatis disita oleh bank sentral untuk membeli valas",
                "Karena masyarakat meyakini pemotongan pajak adalah tanda kebangkrutan kementerian keuangan",
                "Karena tarif pajak pertambahan nilai secara otomatis dinaikkan secara seimbang"
            ],
            correct: 0,
            explanation: "Teorema Ekuivalensi Ricardian (Robert Barro) berasumsi bahwa konsumen bersifat rasional dan mempertimbangkan anggaran antargenerasi (intertemporal budget constraint). Pemotongan pajak yang dibiayai utang hanyalah penundaan waktu pembayaran pajak. Konsumen menyisihkan seluruh potongan pajak ke dalam tabungan untuk persiapan membayar pajak masa depan, sehingga konsumsi agregat (C) dan permintaan agregat (AD) tidak bergeser."
        },
        {
            id: "q17",
            category: "Hukum Disiplin Fiskal APBN",
            question: "Di Indonesia, Undang-Undang No. 17 Tahun 2003 tentang Keuangan Negara membatasi defisit APBN maksimal 3,0% dari PDB dan akumulasi rasio utang pemerintah maksimal 60,0% dari PDB. Apa landasan filosofis dari aturan keramat ini?",
            options: [
                "Menjaga keberlanjutan fiskal jangka panjang (debt sustainability), mempertahankan peringkat kredit sovereign di mata investor global, dan mencegah terulangnya krisis utang dan krisis moneter 1998",
                "Memaksa pemerintah selalu memotong anggaran subsidi bahan bakar minyak dan pendidikan setiap kuartal",
                "Sebagai prasyarat administratif mutlak agar Indonesia dapat bergabung ke dalam mata uang Euro",
                "Untuk melarang pemerintah menerbitkan Surat Utang Negara dalam mata uang rupiah"
            ],
            correct: 0,
            explanation: "Aturan batas defisit 3% PDB dan utang 60% PDB dalam UU No. 17/2003 dirumuskan pasca-krisis moneter 1998 (mengadopsi rasio Maastricht Treaty) untuk mencegah pemerintah membiayai belanja berlebihan melalui defisit liar yang memicu ledakan utang, pelemahan kurs rupiah, dan krisis kepercayaan sovereign."
        },
        {
            id: "q18",
            category: "Klasifikasi Pengangguran",
            question: "Seorang sarjana baru yang sedang menunggu proses wawancara kerja selama 2 bulan, dan seorang buruh pabrik tekstil yang kehilangan pekerjaan karena pabriknya bangkrut akibat serbuan impor kain otomatis, secara berurutan diklasifikasikan sebagai...",
            options: [
                "Pengangguran Friksional dan Pengangguran Struktural",
                "Pengangguran Siklikal dan Pengangguran Friksional",
                "Pengangguran Musiman dan Pengangguran Terbuka",
                "Pengangguran Struktural dan Pengangguran Siklikal"
            ],
            correct: 0,
            explanation: "Pengangguran Friksional adalah pengangguran sementara yang terjadi karena proses pencarian kerja dan pencocokan keahlian (job search lag). Pengangguran Struktural timbul akibat ketidakcocokan mendasar (mismatch) antara keahlian tenaga kerja dengan struktur industri yang berubah akibat kemajuan teknologi atau persaingan global."
        },
        {
            id: "q19",
            category: "Kurva Phillips & Konsep NAIRU",
            question: "Apakah yang dimaksud dengan konsep NAIRU (Non-Accelerating Inflation Rate of Unemployment) dalam teori makroekonomi modern?",
            options: [
                "Tingkat pengangguran alamiah di mana laju inflasi berada dalam kondisi stabil konstan (tidak mengalami akselerasi kenaikan maupun penurunan)",
                "Tingkat pengangguran nol persen mutlak yang dicapai saat seluruh pabrik beroperasi penuh",
                "Persentase angkatan kerja yang menolak bekerja karena standar upah dianggap terlalu rendah",
                "Batas maksimum angka pengangguran yang ditoleransi oleh undang-undang ketenagakerjaan"
            ],
            correct: 0,
            explanation: "NAIRU adalah tingkat pengangguran alamiah (u_n) di mana laju inflasi stabil. Jika pembuat kebijakan memaksakan pengangguran turun di bawah NAIRU melalui stimulus moneter ekspansif (u < u_n), pasar tenaga kerja yang ketat memicu spiral upah-harga sehingga inflasi tidak hanya tinggi tetapi akan terus berakselerasi makin cepat setiap periodenya (accelerating inflation)."
        },
        {
            id: "q20",
            category: "Stagflasi & Guncangan Penawaran",
            question: "Ketika terjadi lonjakan harga minyak mentah dan energi global sebesar 150% akibat konflik geopolitik (Guncangan Penawaran Negatif / Adverse Supply Shock), bagaimanakah pergeseran kurva dalam model AD-AS dan dampaknya terhadap perekonomian?",
            options: [
                "Kurva SRAS bergeser ke kiri atas; tingkat harga umum melonjak (inflasi) sementara output PDB riil menyusut dan pengangguran meningkat (kondisi Stagflasi)",
                "Kurva AD bergeser ke kanan atas; output riil melonjak pesat dan inflasi melandai",
                "Kurva LRAS bergeser ke kanan; daya beli upah riil buruh meningkat drastis",
                "Kurva SRAS bergeser ke kanan bawah; memicu penurunan biaya pokok produksi secara umum"
            ],
            correct: 0,
            explanation: "Kenaikan harga energi melambungkan biaya input bagi seluruh sektor industri, menggeser kurva Penawaran Agregat Jangka Pendek (SRAS) ke kiri atas. Ekuilibrium makro baru terjadi pada tingkat harga yang lebih tinggi (P naik) dan output riil yang lebih rendah (Y turun), menghasilkan fenomena Stagflasi (stagnasi pertumbuhan ditambah inflasi tinggi) yang merusak stabilitas ekonomi."
        },
        {
            id: "q21",
            category: "Paritas Daya Beli (PPP)",
            question: "Menurut Teori Paritas Daya Beli Absolut (Absolute Purchasing Power Parity) yang didasarkan pada Hukum Satu Harga (Law of One Price), nilai tukar nominal antara dua mata uang (e) mencerminkan...",
            options: [
                "Rasio antara tingkat harga umum barang di dalam negeri (P) terhadap tingkat harga umum barang di luar negeri (P*), sehingga nilai tukar riil bernilai konstan sama dengan satu",
                "Perbandingan volume cadangan emas fisik yang tersimpan di bank sentral kedua negara",
                "Rasio antara total utang luar negeri pemerintah kedua negara",
                "Perbedaan besaran tarif pajak pertambahan nilai yang berlaku di kedua negara"
            ],
            correct: 0,
            explanation: "Teori Paritas Daya Beli (PPP) menyatakan bahwa satu unit mata uang harus memiliki daya beli yang sama di seluruh dunia setelah dikonversi. Dengan tiadanya biaya transportasi dan hambatan dagang, kurs nominal e = P / P*, yang menjamin bahwa nilai tukar riil ε = e * (P* / P) bernilai tepat sama dengan satu (Hukum Satu Harga)."
        },
        {
            id: "q22",
            category: "Identitas Makroekonomi Terbuka",
            question: "Dari identitas akuntansi perekonomian terbuka, diketahui S - I = NX (Arus Keluar Modal Neto = Ekspor Neto). Jika suatu negara mengalami Defisit Transaksi Berjalan (NX < 0), kondisi mendasar apa yang sedang terjadi dalam perekonomian negara tersebut?",
            options: [
                "Total tabungan nasional domestik (S) lebih kecil daripada kebutuhan investasi fisik domestik (I), sehingga negara tersebut harus menyerap modal pinjaman asing dari luar negeri",
                "Pemerintah negara tersebut mengalami surplus anggaran belanja yang terlampau besar",
                "Masyarakat domestik berhenti mengonsumsi seluruh barang buatan pabrik dalam negeri",
                "Bank sentral negara tersebut diwajibkan memusnahkan separuh cadangan devisanya"
            ],
            correct: 0,
            explanation: "Identitas dasar ekonomi terbuka: S - I = NX. Defisit transaksi berjalan (NX < 0) ekuivalen secara matematis dengan S < I. Ini membuktikan bahwa tabungan domestik (swasta + pemerintah) tidak mencukupi untuk mendanai seluruh pembentukan modal investasi domestik (I). Selisih kekurangan dana ini ditutup oleh aliran modal masuk dari luar negeri (net capital inflow)."
        },
        {
            id: "q23",
            category: "Kondisi Marshall-Lerner & J-Curve",
            question: "Mengapa sesaat setelah terjadinya depresiasi mata uang, Neraca Perdagangan seringkali MEMBURUK terlebih dahulu sebelum akhirnya berbalik membaik beberapa kuartal kemudian (Fenomena Kurva-J / J-Curve Effect)?",
            options: [
                "Karena dalam jangka sangat pendek, volume kontrak ekspor dan impor bersifat kaku (inelastic), sehingga kenaikan nilai tagihan impor langsung membebani neraca sebelum volume perdagangan sempat menyesuaikan diri",
                "Karena seluruh importir domestik langsung membatalkan pesanan barang modal dari luar negeri",
                "Karena bank sentral sengaja menaikkan suku bunga acuan ke tingkat tertinggi untuk mematikan ekspor",
                "Karena para eksportir menolak menaikkan volume pengiriman barang ke pasar internasional"
            ],
            correct: 0,
            explanation: "Dalam jangka sangat pendek (1-2 kuartal), elastisitas harga permintaan ekspor dan impor masih sangat rendah (|ε_x| + |ε_m| < 1) karena kontrak pengiriman sudah ditandatangani. Akibatnya, pelemahan kurs langsung melambungkan biaya impor dalam rupiah (efek harga negatif). Setelah beberapa kuartal, pembeli beralih ke barang domestik dan ekspor meningkat (|ε_x| + |ε_m| > 1), neraca perdagangan surplus membentuk kurva 'J'."
        },
        {
            id: "q24",
            category: "Model Pertumbuhan Solow: Steady-State",
            question: "Dalam Model Pertumbuhan Solow-Swan tanpa pertumbuhan populasi dan kemajuan teknologi (y = f(k)), perekonomian akan mencapai kondisi ekuilibrium jangka panjang yang mantap (Steady-State) ketika...",
            options: [
                "Tingkat investasi per pekerja sama persis dengan tingkat depresiasi modal per pekerja [s * f(k) = δ * k], sehingga stok modal per pekerja (k) tidak mengalami perubahan lagi",
                "Tingkat tabungan masyarakat dinaikkan hingga mencapai 100% dari total pendapatan nasional",
                "Seluruh stok mesin dan gedung pabrik telah habis terdepresiasi menjadi nol",
                "Tingkat suku bunga riil sama persis dengan laju pertumbuhan jumlah uang beredar"
            ],
            correct: 0,
            explanation: "Persamaan akumulasi modal Solow: Δk = s * f(k) - δ * k. Kondisi steady-state tercapai saat perubahan stok modal per pekerja Δk = 0, yaitu ketika investasi riil baru s * f(k) tepat mencukupi untuk menggantikan modal yang terdepresiasi δ * k. Pada titik ini, modal per pekerja (k*) dan output per pekerja (y*) berada dalam kondisi konstan."
        },
        {
            id: "q25",
            category: "Model Pertumbuhan Solow: Golden Rule",
            question: "Menurut Model Pertumbuhan Solow, tingkat modal Aturan Emas (Golden Rule Level of Capital / k*_gold) adalah tingkat modal steady-state yang...",
            options: [
                "Memaksimalkan tingkat konsumsi per pekerja dalam kondisi mantap, yang tercapai saat Produk Marjinal Modal sama dengan tingkat depresiasi (MPK = δ)",
                "Menghasilkan penerimaan pajak pendapatan per kapita tertinggi bagi kas negara",
                "Menghilangkan seluruh kewajiban utang luar negeri pemerintah dalam satu dekade",
                "Menyamakan laju inflasi domestik dengan laju inflasi rata-rata global"
            ],
            correct: 0,
            explanation: "Kesejahteraan ekonomi diukur dari tingkat konsumsi, bukan sekadar menimbun modal. Dalam kondisi mantap, konsumsi per pekerja adalah c* = f(k*) - δk*. Untuk memaksimalkan c*, turunan pertama terhadap k* harus sama dengan nol: dc*/dk* = f'(k*) - δ = 0 => MPK = δ. Pada titik Golden Rule ini, setiap rupiah modal menghasilkan output marjinal yang tepat menutup biaya depresiasinya."
        }
    ]
};

// Export to global window
if (typeof window !== 'undefined') {
    window.MACRO_THEORY_DATA = MACRO_THEORY_DATA;
}
