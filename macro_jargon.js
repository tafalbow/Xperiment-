/**
 * ==============================================================================
 * MACROMASTER DEN - INTERACTIVE ECONOMIC JARGON & GLOSSARY INSPECTOR
 * (macro_jargon.js)
 * Fitur: Mengubah setiap istilah/jargon ekonomi di seluruh game menjadi interaktif
 * dan dapat diklik. Saat diklik, muncul modal penjelasan bahasa sederhana,
 * analogi manajerial/bisnis, formula matematika, dan praktik lapangan.
 * ==============================================================================
 */

const MACRO_JARGON_DATA = {
    bi_rate: {
        name: "BI-Rate (Suku Bunga Acuan)",
        category: "Kebijakan Moneter & Perbankan",
        icon: "🏦",
        simpleDef: "Suku bunga resmi yang ditetapkan oleh Bank Indonesia sebagai pedoman atau patokan biaya bunga bagi seluruh bank di Indonesia.",
        analogy: "Ibarat pedal gas dan rem pada mobil: Jika ekonomi terlalu ngebut dan kepanasan (inflasi tinggi), BI menginjak rem (menaikkan BI-Rate). Jika ekonomi lesu dan mogok, BI menginjak gas (menurunkan BI-Rate).",
        mechanism: "BI-Rate naik → Bunga deposito dan kredit bank umum ikut naik → Masyarakat menahan belanja konsumsi dan pengusaha menunda ekspansi → Belanja total melambat → Kenaikan harga-harga (inflasi) berhasil diredam.",
        formula: "r_{riil} = i_{nominal} - \\pi^e \\quad \\text{(Persamaan Fisher: Bunga Riil = Bunga Nominal - Inflasi)}",
        realImpact: "Di Indonesia, BI-Rate diputuskan setiap bulan dalam Rapat Dewan Gubernur (RDG) BI untuk menjaga inflasi di kisaran 2,5% ± 1% dan menjaga stabilitas nilai tukar Rupiah terhadap Dolar AS.",
        related: ["transmisi_moneter", "inflasi_ihk", "persamaan_fisher", "kurs_valas"]
    },
    transmisi_moneter: {
        name: "Transmisi Kebijakan Moneter",
        category: "Kebijakan Moneter & Perbankan",
        icon: "⚡",
        simpleDef: "Rantai proses atau tahapan bagaimana keputusan suku bunga Bank Indonesia merambat dari pasar perbankan hingga akhirnya memengaruhi harga barang dan belanja masyarakat di dunia nyata.",
        analogy: "Ibarat menyiram air di hulu sungai: Air tidak seketika membasahi sawah di hilir besok pagi, melainkan butuh waktu berbulan-bulan mengalir melalui kanal-kanal perbankan, pasar valas, dan toko ritel.",
        mechanism: "Keputusan BI-Rate (Bulan 1) → Bunga pasar uang PUAB & deposito naik (Bulan 1-3) → Bunga kredit bank komersial naik (Bulan 3-6) → Penurunan pengajuan kredit usaha (Bulan 6-12) → Inflasi melandai (Bulan 12-18).",
        formula: "\\text{Lag Waktu Kebijakan: } 6 \\text{ s/d } 18 \\text{ bulan (Outside Lag)}",
        realImpact: "Bank sentral harus selalu bersikap 'forward-looking' (melihat ke masa depan), karena tindakan menaikkan suku bunga hari ini baru terasa dampaknya 1 tahun ke depan.",
        related: ["bi_rate", "crowding_out", "gwm"]
    },
    pdb_riil: {
        name: "PDB Riil (Produk Domestik Bruto Riil)",
        category: "Output & Pertumbuhan Nasional",
        icon: "📈",
        simpleDef: "Total nilai seluruh barang dan jasa fisik yang dihasilkan di dalam negeri dalam setahun, dihitung menggunakan harga tetap (konstan) agar kenaikan harga/inflasi tidak menipu angka pertumbuhan sejati.",
        analogy: "Jika toko roti Anda memproduksi 100 roti tahun lalu dan 100 roti tahun ini, tapi harga roti naik 2 kali lipat, omzet Anda tampak naik padahal jumlah roti yang dimakan pembeli sama sekali tidak bertambah. PDB Riil mengukur jumlah rotinya, bukan lonjakan harganya.",
        mechanism: "PDB Riil membagi PDB Nominal dengan angka indeks harga (Deflator PDB), sehingga pertumbuhannya murni mencerminkan pertambahan kuantitas barang fisik dan lapangan kerja.",
        formula: "\\text{PDB Riil} = \\frac{\\text{PDB Nominal}}{\\text{Deflator PDB} / 100}",
        realImpact: "Pertumbuhan ekonomi 5% Indonesia yang diumumkan BPS setiap kuartal selalu mengacu pada pertumbuhan PDB Riil, bukan PDB Nominal.",
        related: ["pdb_nominal", "deflator_pdb", "hukum_okun"]
    },
    pdb_nominal: {
        name: "PDB Nominal (Harga Berlaku)",
        category: "Output & Pertumbuhan Nasional",
        icon: "💵",
        simpleDef: "Total nilai pasar barang dan jasa akhir yang diproduksi di dalam negeri, dihitung berdasarkan tingkat harga yang sedang berlaku pada tahun berjalan.",
        analogy: "Omzet kotor kasir yang tercatat di struk belanja tahun ini tanpa memperhitungkan apakah barang-barang tersebut sebenarnya sedang naik harga atau tidak.",
        mechanism: "Dipengaruhi oleh dua hal sekaligus: pertambahan jumlah barang fisik DAN kenaikan harga (inflasi). Bisa tampak tumbuh sangat tinggi hanya karena terjadi hiperinflasi.",
        formula: "\\text{PDB Nominal} = \\sum (P_t \\times Q_t) = C + I + G + (X - M)",
        realImpact: "Digunakan sebagai dasar penyebut untuk menghitung rasio utang pemerintah (Utang / PDB Nominal) dan rasio defisit anggaran (Defisit / PDB Nominal).",
        related: ["pdb_riil", "deflator_pdb", "apbn_defisit"]
    },
    deflator_pdb: {
        name: "Deflator PDB",
        category: "Tingkat Harga & Inflasi",
        icon: "🧮",
        simpleDef: "Angka indeks yang membandingkan nilai PDB Nominal terhadap PDB Riil untuk mengukur seberapa besar tingkat inflasi barang-barang produksi dalam negeri.",
        analogy: "Alat timbangan pembersih: memisahkan 'lemak' kenaikan harga dari 'daging' pertambahan fisik barang yang diproduksi.",
        mechanism: "Jika Deflator bernilai 125, artinya harga rata-rata seluruh barang yang diproduksi di Indonesia telah naik 25% dibandingkan tahun dasar acuan.",
        formula: "\\text{Deflator PDB} = \\left( \\frac{\\text{PDB Nominal}}{\\text{PDB Riil}} \\right) \\times 100",
        realImpact: "Berbeda dengan IHK yang hanya menghitung keranjang barang belanjaan konsumen, Deflator PDB mencakup mesin pabrik, jembatan tol, kapal kargo, hingga bangunan gedung.",
        related: ["pdb_riil", "pdb_nominal", "inflasi_ihk"]
    },
    inflasi_ihk: {
        name: "Inflasi IHK (Indeks Harga Konsumen)",
        category: "Tingkat Harga & Inflasi",
        icon: "🏷️",
        simpleDef: "Persentase kenaikan harga rata-rata sekelompok barang dan jasa kebutuhan pokok (keranjang belanja) yang rutin dibeli oleh rumah tangga sehari-hari.",
        analogy: "Kenaikan total tagihan belanja bulanan keluarga Anda: jika tahun lalu uang Rp 1 juta bisa membeli beras, telur, minyak, pulsa, dan bensin, tahun ini Anda butuh Rp 1,05 juta untuk isi keranjang belanja yang persis sama.",
        mechanism: "Jika inflasi terlalu tinggi (di atas 5%), daya beli upah pekerja tergerus dan biaya hidup membengkak. Jika deflasi (inflasi negatif), pedagang merugi dan menunda produksi.",
        formula: "\\text{Inflasi } (\\pi) = \\frac{\\text{IHK}_t - \\text{IHK}_{t-1}}{\\text{IHK}_{t-1}} \\times 100\\%",
        realImpact: "Target inflasi resmi pemerintah dan Bank Indonesia saat ini adalah 2,5% dengan toleransi ±1% (antara 1,5% hingga 3,5% per tahun).",
        related: ["bi_rate", "deflator_pdb", "kurva_phillips", "stagflasi"]
    },
    crowding_out: {
        name: "Efek Desakan (Crowding-Out Effect)",
        category: "Kebijakan Fiskal & Utang",
        icon: "⚖️",
        simpleDef: "Kondisi ketika pemerintah menerbitkan surat utang (obligasi negara) dalam jumlah terlalu besar, sehingga menyedot dana tabungan di perbankan dan menaikkan suku bunga, yang akhirnya mendesak keluar (mengurangi) pinjaman investasi bagi pengusaha swasta.",
        analogy: "Ibarat antrean prasmanan: Ketika pejabat berbadan besar mengambil porsi makanan dalam jumlah raksasa di piringnya, tamu-tamu lain (pengusaha swasta) hanya kebagian sisa makanan sedikit dengan harga lebih mahal.",
        mechanism: "Pemerintah defisit besar → Terbitkan SBN masif berbunga menarik → Bank lebih suka beli SBN daripada salurkan kredit usaha → Likuiditas swasta menipis → Suku bunga pinjaman pasar naik → Investasi swasta melambat.",
        formula: "\\Delta G \\uparrow \\implies \\text{Permintaan Dana } \\uparrow \\implies r \\uparrow \\implies I_{\\text{swasta}} \\downarrow",
        realImpact: "Di Indonesia, Kemenkeu harus sangat cermat mengatur waktu dan volume lelang SBN agar tidak 'mengeringkan' likuiditas kredit perbankan untuk sektor UMKM.",
        related: ["apbn_defisit", "utang_negara", "angka_pengganda"]
    },
    apbn_defisit: {
        name: "Defisit APBN & Batas 3% UU No. 17/2003",
        category: "Kebijakan Fiskal & Utang",
        icon: "📜",
        simpleDef: "Kondisi saat belanja negara lebih besar daripada penerimaan pajak, yang dibatasi maksimal 3,0% dari PDB sesuai Undang-Undang Keuangan Negara.",
        analogy: "Sama seperti anggaran keluarga: Jika penghasilan Anda Rp 10 juta tapi Anda belanja Rp 10,3 juta, defisit Rp 300 ribu ditutup dengan meminjam uang. Batas 3% memastikan utang tidak menumpuk liar hingga Anda bangkrut.",
        mechanism: "Defisit ditoleransi untuk mendanai infrastruktur produktif (jalan, sekolah, rumah sakit). Namun jika melampaui 3% PDB, risiko gagal bayar dan penurunan peringkat investasi meningkat drastis.",
        formula: "\\text{Rasio Defisit} = \\frac{\\text{Belanja Negara} - \\text{Penerimaan Pajak}}{\\text{PDB Nominal}} \\times 100\\% \\le 3.0\\%",
        realImpact: "Aturan 3% disahkan setelah trauma Krisis Moneter 1998 untuk memastikan disiplin fiskal dan mencegah politisi menghamburkan anggaran negara tanpa kendali.",
        related: ["utang_negara", "crowding_out", "angka_pengganda"]
    },
    utang_negara: {
        name: "Rasio Utang Pemerintah (Batas 60% PDB)",
        category: "Kebijakan Fiskal & Utang",
        icon: "🏛️",
        simpleDef: "Total akumulasi kewajiban pinjaman pemerintah (dalam dan luar negeri) dibandingkan dengan total omzet PDB nasional, dibatasi maksimal 60% dari PDB.",
        analogy: "Batas plafon pinjaman kredit rumah (KPR) terhadap total penghasilan tahunan Anda agar Anda tetap mampu membayar cicilan pokok dan bunga tanpa kelaparan.",
        mechanism: "Rasio utang yang sehat (di bawah 40% di Indonesia) memberikan ruang gerak saat krisis tiba (seperti saat pandemi Covid-19 ketika defisit sempat diperbolehkan melebar darurat).",
        formula: "\\text{Debt-to-GDP} = \\frac{\\text{Total Utang Pemerintah}}{\\text{PDB Nominal}} \\times 100\\% \\le 60.0\\%",
        realImpact: "Rasio utang Indonesia saat ini berada di kisaran 39% PDB, jauh lebih disiplin dan aman dibandingkan negara maju seperti AS (>120%) atau Jepang (>250%).",
        related: ["apbn_defisit", "crowding_out", "krismon_1998"]
    },
    model_ad_as: {
        name: "Model Keseimbangan AD-AS",
        category: "Teori Pasar Agregat",
        icon: "⚖️",
        simpleDef: "Kerangka utama ekonomi makro yang mempertemukan total belanja seluruh bangsa (Permintaan Agregat / AD) dengan total kemampuan produksi seluruh pabrik (Penawaran Agregat / AS).",
        analogy: "Pertemuan antara total pesanan pembeli baju di pasar dengan total kapasitas kain dan mesin jahit seluruh penjahit di kota.",
        mechanism: "Jika pesanan belanja melebihi kapasitas pabrik (AD > Y*), terjadi lonjakan harga (Overheating). Jika pesanan lesu (AD < Y*), terjadi resesi dan pabrik merumahkan pekerja.",
        formula: "AD = C + I + G + (X - M) \\quad \\text{vs} \\quad AS = f(K, L, A)",
        realImpact: "Digunakan oleh Bank Sentral dan Menteri Keuangan untuk mendiagnosis apakah masalah ekonomi saat ini berasal dari kelesuan daya beli (AD) atau kendala pasokan fisik (AS).",
        related: ["efek_pigou", "stagflasi", "output_potensial"]
    },
    kurva_phillips: {
        name: "Kurva Phillips & NAIRU",
        category: "Ketenagakerjaan & Inflasi",
        icon: "📉",
        simpleDef: "Teori yang menunjukkan adanya hubungan tarik-menarik terbalik (trade-off) antara inflasi dan pengangguran dalam jangka pendek, namun hilang dalam jangka panjang.",
        analogy: "Ibarat meminum kopi: Dalam jangka pendek, kopi membuat Anda bersemangat dan tidak mengantuk (pengangguran turun, ekonomi ramai). Tapi dalam jangka panjang, tubuh Anda kebal dan Anda harus tidur pada jam normal (kembali ke NAIRU).",
        mechanism: "Stimulus moneter membuat pabrik merekrut buruh baru (pengangguran turun), namun harga barang naik (inflasi naik). Di jangka panjang, buruh menuntut kenaikan upah, dan pengangguran kembali ke tingkat alamiah (NAIRU).",
        formula: "\\pi = \\pi^e - \\beta (u - u_n) + v \\quad \\text{(Ekspektasi Inflasi, Pengangguran, dan Guncangan Pasokan)}",
        realImpact: "Membuktikan bahwa pemerintah tidak bisa terus-menerus menekan pengangguran hingga nol hanya dengan memompa uang, karena hasilnya hanyalah ledakan inflasi murni.",
        related: ["nairu", "hukum_okun", "inflasi_ihk", "stagflasi"]
    },
    nairu: {
        name: "NAIRU (Tingkat Pengangguran Alamiah)",
        category: "Ketenagakerjaan & Inflasi",
        icon: "🎯",
        simpleDef: "Tingkat pengangguran terendah yang dapat dicapai suatu negara tanpa memicu lonjakan percepatan inflasi liar (Non-Accelerating Inflation Rate of Unemployment).",
        analogy: "Kecepatan aman mobil di jalan tol: Jika batas aman adalah 100 km/jam (NAIRU), memaksakan mobil melaju 180 km/jam akan membuat mesin berasap dan jebol (hiperinflasi).",
        mechanism: "Pengangguran di level NAIRU bukan berarti orang malas, melainkan pengangguran friksional (orang yang sedang pindah kerja) dan struktural (peralihan teknologi).",
        formula: "u_n = \\text{Tingkat Pengangguran Alamiah (di Indonesia sekitar 4.5% - 5.5%)}",
        realImpact: "Jika angka pengangguran terbuka Indonesia di kisaran 5,3%, maka perekonomian berada dekat dengan kondisi 'Full Employment' yang stabil.",
        related: ["kurva_phillips", "hukum_okun", "output_potensial"]
    },
    hukum_okun: {
        name: "Hukum Okun (Okun's Law)",
        category: "Ketenagakerjaan & Inflasi",
        icon: "👥",
        simpleDef: "Korelasi empiris bahwa setiap pertumbuhan ekonomi PDB riil tumbuh 1% di atas tren potensialnya, angka pengangguran akan turun sekitar 0,3% hingga 0,5%.",
        analogy: "Setiap pertambahan omzet restoran sebesar 10 meja baru, manajer restoran butuh merekrut 3 pelayan baru untuk melayani pesanan tambahan tersebut.",
        mechanism: "PDB tumbuh tinggi → Pabrik butuh menambah kapasitas fisik → Merekrut ribuan buruh baru → Jumlah pengangguran berkurang.",
        formula: "\\Delta U = -\\beta (g - g^*) \\quad \\text{dengan } \\beta \\approx 0.3 - 0.5",
        realImpact: "Di Indonesia, ekonomi harus tumbuh minimal 5% per tahun hanya untuk menyerap sekitar 2,5-3 juta lulusan sekolah dan sarjana baru yang masuk ke pasar kerja setiap tahunnya.",
        related: ["pdb_riil", "nairu", "kurva_phillips"]
    },
    persamaan_fisher: {
        name: "Persamaan Fisher (Fisher Effect)",
        category: "Kebijakan Moneter & Perbankan",
        icon: "📐",
        simpleDef: "Persamaan yang membedah bahwa suku bunga nominal yang kita lihat di bank terdiri dari dua komponen: suku bunga riil ditambah ekspektasi laju inflasi.",
        analogy: "Jika Anda meminjamkan 1 karung beras ke tetangga dan minta dikembalikan 1 karung beras ditambah 1 mangkuk kecil (bunga riil). Jika harga beras tahun depan naik, nilai uangnya harus disesuaikan agar mangkuk kecil tersebut tetap senilai.",
        mechanism: "Ketika masyarakat memperkirakan inflasi tahun depan akan naik dari 3% ke 6%, bank otomatis menaikkan suku bunga nominal simpanan dan pinjaman agar imbal hasil riilnya tidak tekor.",
        formula: "i = r + \\pi^e \\iff r = i - \\pi^e",
        realImpact: "Menjelaskan mengapa negara dengan inflasi tinggi (seperti Turki atau Argentina) selalu memiliki suku bunga bank yang luar biasa tinggi (bisa di atas 40%).",
        related: ["bi_rate", "inflasi_ihk", "teori_kuantitas_uang"]
    },
    teori_kuantitas_uang: {
        name: "Teori Kuantitas Uang (M x V = P x Y)",
        category: "Kebijakan Moneter & Perbankan",
        icon: "🪙",
        simpleDef: "Hukum pertukaran Irving Fisher yang menyatakan bahwa nilai total uang yang beredar dikalikan kecepatan perputarannya selalu sama dengan nilai total transaksi barang yang diproduksi.",
        analogy: "Jika dalam satu kelas hanya ada 1 lembar uang Rp 10.000, tapi uang itu berpindah tangan 5 kali untuk membeli gorengan, total nilai gorengan yang terjual adalah Rp 50.000.",
        mechanism: "Jika perputaran uang (V) dan jumlah barang fisik (Y) stabil, maka mencetak uang berlebih (M naik) secara matematis HANYA akan menaikkan tingkat harga (P naik / inflasi).",
        formula: "M \\cdot V = P \\cdot Y \\iff \\%\\Delta M + \\%\\Delta V = \\%\\Delta P + \\%\\Delta Y",
        realImpact: "Menjadi alasan utama mengapa Bank Indonesia tidak boleh mencetak uang sembarangan untuk membiayai belanja negara.",
        related: ["persamaan_fisher", "bi_rate", "inflasi_ihk"]
    },
    angka_pengganda: {
        name: "Angka Pengganda (Spending Multiplier)",
        category: "Kebijakan Fiskal & Utang",
        icon: "✖️",
        simpleDef: "Efek berantai di mana setiap Rp 1 stimulus belanja pemerintah dapat menghasilkan pertambahan PDB nasional lebih dari Rp 1 karena uang tersebut dibelanjakan kembali berulang-ulang oleh masyarakat.",
        analogy: "Efek riak batu di kolam air: Melempar batu menghasilkan riak lingkaran yang membesar ke sekeliling kolam. Pemerintah menggaji buruh proyek, buruh belanja ke warung nasi, pemilik warung belanja baju ke pasar, penjahit beli kain, dan seterusnya.",
        mechanism: "Tergantung pada kecenderungan masyarakat untuk membelanjakan uangnya (MPC / Marginal Propensity to Consume). Semakin gemar belanja, semakin besar angka penggandanya.",
        formula: "k_G = \\frac{1}{1 - MPC} = \\frac{1}{MPS}",
        realImpact: "Jika MPC orang Indonesia adalah 0,80, maka multiplier belanja adalah 1 / (1 - 0,80) = 5. Belanja proyek Rp 10 Triliun akan melipatgandakan PDB nasional hingga Rp 50 Triliun.",
        related: ["apbn_defisit", "crowding_out", "pdb_riil"]
    },
    trilema_mundell_fleming: {
        name: "Trilema Mundell-Fleming (The Impossible Trinity)",
        category: "Ekonomi Terbuka & Valas",
        icon: "🌐",
        simpleDef: "Hukum moneter internasional yang menyatakan bahwa suatu negara hanya bisa memilih 2 dari 3 target kebijakan: (1) Arus Modal Bebas, (2) Kurs Tetap, dan (3) Kebijakan Moneter Independen.",
        analogy: "Ibarat memilih pacar: Pintar, Kaya, dan Setia — dalam teori ekonomi terbuka, Anda mustahil mendapatkan ketiganya sekaligus, Anda harus mengorbankan salah satunya!",
        mechanism: "Jika Indonesia memilih modal devisa bebas dan ingin suku bunga independen, Indonesia harus merelakan nilai tukar Rupiah berfluktuasi bebas di pasar sesuai mekanisme penawaran dan permintaan.",
        formula: "\\text{Pilihan Indonesia: Devisa Bebas } + \\text{ Moneter Independen } \\implies \\text{Kurs Mengambang (Floating)}",
        realImpact: "Krisis 1998 terjadi karena Indonesia memaksakan kurs tetap semu padahal modal asing bebas keluar masuk. Saat spekulan menyerang, cadangan devisa habis dan sistem kurs jebol.",
        related: ["kurs_valas", "cadangan_devisa", "krismon_1998"]
    },
    stagflasi: {
        name: "Stagflasi (Stagnasi + Inflasi)",
        category: "Teori Pasar Agregat",
        icon: "💥",
        simpleDef: "Mimpi terburuk ekonomi makro di mana pertumbuhan ekonomi mandek dan pengangguran tinggi (stagnasi), namun pada saat yang sama harga barang-barang melonjak mahal (inflasi).",
        analogy: "Ibarat tubuh terserang demam tinggi menggigil sekaligus diare parah: Diberi obat penurun panas bisa memperparah diare, diberi obat diare bisa menaikkan demam.",
        mechanism: "Dipicu oleh Guncangan Pasokan Negatif (Adverse Supply Shock), seperti lonjakan harga minyak dunia 150% atau gagal panen pangan global yang menggeser kurva SRAS ke kiri atas.",
        formula: "\\text{Stagflasi: } Y \\downarrow \\text{ (PDB Anjlok)} \\quad \\& \\quad P \\uparrow \\text{ (Harga Melonjak)}",
        realImpact: "Terjadi di dunia barat pada krisis minyak 1973 dan kembali mengancam dunia pasca-perang Rusia-Ukraina 2022 akibat krisis energi dan pangan.",
        related: ["model_ad_as", "inflasi_ihk", "kurva_phillips"]
    },
    currency_mismatch: {
        name: "Ketidaksesuaian Mata Uang (Currency Mismatch)",
        category: "Krisis & Kebijakan Valas",
        icon: "⚠️",
        simpleDef: "Kondisi berbahaya di mana perusahaan berutang dalam mata uang asing (seperti Dolar AS) tetapi pendapatan pemasukannya dalam mata uang lokal (Rupiah), tanpa perlindungan lindung nilai (hedging).",
        analogy: "Anda bergaji Rupiah Rp 10 juta per bulan, tapi menyicil mobil mewah dengan tagihan Dolar AS sebesar $500 per bulan. Saat kurs Dolar melonjak dari Rp 10.000 ke Rp 16.000, cicilan Anda melompat dari Rp 5 juta ke Rp 8 juta hingga gaji Anda ludes.",
        mechanism: "Ketika nilai tukar Rupiah anjlok, beban utang luar negeri swasta membengkak berlipat ganda dalam hitungan hari, memicu kebangkrutan massal perusahaan dan perbankan.",
        formula: "\\text{Risiko: } \\text{Utang Valas (USD)} \\gg \\text{Pendapatan Ekspor (USD)}",
        realImpact: "Akar penyebab paling mematikan yang menenggelamkan ribuan korporasi Indonesia saat Krisis Moneter 1998.",
        related: ["krismon_1998", "kurs_valas", "trilema_mundell_fleming"]
    },
    gwm: {
        name: "Giro Wajib Minimum (GWM)",
        category: "Kebijakan Moneter & Perbankan",
        icon: "🛡️",
        simpleDef: "Persentase minimal simpanan dana nasabah yang wajib ditahan oleh bank umum sebagai cadangan likuiditas di rekening Bank Indonesia, dan tidak boleh dipinjamkan ke publik.",
        analogy: "Uang tabungan darurat di dompet Anda yang tidak boleh dibelanjakan apa pun yang terjadi, agar jika ada anggota keluarga sakit mendadak, Anda punya uang tunai seketika.",
        mechanism: "Jika BI menaikkan GWM dari 5% ke 9%, bank umum terpaksa menyedot dan menahan uangnya di BI, sehingga dana pinjaman yang bisa disalurkan ke masyarakat berkurang (mengerem laju kredit).",
        formula: "\\text{GWM } (\\%) = \\frac{\\text{Saldo Giro Wajib di BI}}{\\text{Dana Pihak Ketiga (DPK)}} \\times 100\\%",
        realImpact: "Instrumen likuiditas yang ampuh digunakan BI untuk menyerap kelebihan likuiditas perbankan pasca-pandemi tanpa harus terburu-buru menaikkan suku bunga kredit.",
        related: ["bi_rate", "transmisi_moneter", "teori_kuantitas_uang"]
    },
    kurs_valas: {
        name: "Kurs Valas (Nilai Tukar Rupiah / USD)",
        category: "Ekonomi Terbuka & Valas",
        icon: "💱",
        simpleDef: "Harga atau perbandingan nilai satu mata uang asing (seperti 1 Dolar Amerika Serikat) jika ditukarkan dengan mata uang Rupiah.",
        analogy: "Harga tiket barter antarnegara: berapa lembar Rupiah yang harus Anda serahkan untuk mendapatkan 1 lembar uang hijau Dolar AS.",
        mechanism: "Ditentukan oleh supply dan demand di pasar valas: ekspor dan modal asing masuk memperkuat Rupiah (apresiasi), sedangkan impor dan pelarian modal ke luar negeri melemahkan Rupiah (depresiasi).",
        formula: "\\text{Kurs Kuotasi Langsung: } e = \\text{Rp } 15.650 / \\text{USD}",
        realImpact: "Pelemahan kurs memukul importir bahan baku dan APBN subsidi BBM, namun menguntungkan eksportir kelapa sawit, batu bara, nikel, dan pariwisata lokal.",
        related: ["cadangan_devisa", "trilema_mundell_fleming", "marshall_lerner"]
    },
    cadangan_devisa: {
        name: "Cadangan Devisa (Forex Reserves)",
        category: "Ekonomi Terbuka & Valas",
        icon: "🏦",
        simpleDef: "Simpanan aset berharga dalam valuta asing (Dolar AS, Euro, Yen, Emas) yang dimiliki oleh Bank Indonesia untuk membiayai impor dan menjaga stabilitas kurs mata uang nasional.",
        analogy: "Bantalan tabungan darurat devisa negara: ibarat stok beras di lumbung untuk memastikan keluarga Anda bisa tetap makan jika paceklik menyerang selama berbulan-bulan.",
        mechanism: "Saat Rupiah diserang spekulan atau modal asing keluar mendadak, BI menggelontorkan sebagian cadangan devisanya ke pasar (intervensi) untuk membeli Rupiah agar nilainya tidak runtuh.",
        formula: "\\text{Kecukupan Devisa: Minimal setara 3 bulan pembiayaan impor dan pembayaran utang luar negeri}",
        realImpact: "Cadangan devisa Indonesia saat ini berada di atas $140 Miliar Dolar AS (setara 6 bulan impor), jauh di atas standar kecukupan internasional.",
        related: ["kurs_valas", "trilema_mundell_fleming", "krismon_1998"]
    },
    marshall_lerner: {
        name: "Kondisi Marshall-Lerner & Kurva-J",
        category: "Ekonomi Terbuka & Valas",
        icon: "📉",
        simpleDef: "Kondisi teoritis bahwa pelemahan kurs mata uang hanya akan memperbaiki neraca perdagangan jika jumlah elastisitas ekspor dan impor melebihi 1, di mana neraca biasanya memburuk terlebih dahulu sebelum membaik (membentuk huruf J).",
        analogy: "Saat harga diskon baru dipasang di etalase toko: Pembeli butuh waktu beberapa hari untuk menyadari diskon tersebut. Di hari pertama omzet toko bisa tampak turun, namun minggu depan pembeli membeludak dan keuntungan berlipat.",
        mechanism: "Jangka sangat pendek (1-2 kuartal): Kontrak impor sudah terlanjur ditandatangani sehingga tagihan dolar melonjak (neraca memburuk). Jangka menengah: Pembeli luar negeri beralih ke barang lokal karena murah, ekspor melonjak (neraca surplus).",
        formula: "|\\varepsilon_x| + |\\varepsilon_m| > 1 \\quad \\text{(Kondisi Marshall-Lerner)}",
        realImpact: "Menjelaskan mengapa setelah Rupiah melemah, neraca perdagangan Indonesia seringkali tidak langsung surplus seketika di bulan yang sama.",
        related: ["kurs_valas", "trilema_mundell_fleming", "pdb_riil"]
    },
    perangkap_likuiditas: {
        name: "Perangkap Likuiditas (Liquidity Trap)",
        category: "Kebijakan Moneter & Perbankan",
        icon: "🕳️",
        simpleDef: "Kondisi ekstrem di mana suku bunga bank sentral sudah dipangkas hingga mendekati nol persen (0%), namun masyarakat dan dunia usaha tetap menolak meminjam atau belanja karena pesimis terhadap masa depan.",
        analogy: "Mendorong tali: Anda bisa menarik tali dengan mudah (menaikkan bunga untuk mengerem), tetapi Anda tidak bisa mendorong tali (menurunkan bunga tidak otomatis membuat orang meminjam jika mereka ketakutan).",
        mechanism: "Pada titik ini, kebijakan moneter konvensional lumpuh total. Satu-satunya jalan keluar adalah kebijakan fiskal langsung: pemerintah harus turun tangan membelanjakan uang APBN secara masif.",
        formula: "i \\to 0\\% \\implies \\text{Kurva LM berbentuk horizontal sempurna (Keynesian Trap)}",
        realImpact: "Dialami oleh Jepang selama puluhan tahun (Lost Decades) dan Amerika Serikat pasca-krisis finansial 2008 yang memaksa bank sentral meluncurkan Quantitative Easing (QE).",
        related: ["bi_rate", "angka_pengganda", "crowding_out"]
    },
    efek_pigou: {
        name: "Efek Kekayaan Pigou (Wealth Effect)",
        category: "Teori Pasar Agregat",
        icon: "🛒",
        simpleDef: "Alasan mengapa kurva Permintaan Agregat (AD) miring ke bawah: saat harga-harga barang turun, nilai riil uang tunai yang dipegang masyarakat meningkat, membuat mereka merasa lebih kaya dan belanja lebih banyak.",
        analogy: "Jika uang Rp 100 ribu di dompet Anda tadinya hanya cukup membeli 2 kg daging, lalu harga daging turun separuh sehingga uang yang sama bisa membeli 4 kg daging, Anda merasa lebih makmur dan terdorong berbelanja lebih banyak.",
        mechanism: "Tingkat harga umum P turun → Nilai riil uang (M/P) naik → Kekayaan riil konsumen bertambah → Belanja konsumsi C meningkat → Permintaan output nasional Y naik.",
        formula: "P \\downarrow \\implies \\left(\\frac{M}{P}\\right) \\uparrow \\implies \\text{Wealth} \\uparrow \\implies C \\uparrow \\implies Y \\uparrow",
        realImpact: "Merupakan fondasi teoritis utama dalam buku teks makroekonomi karya N. Gregory Mankiw untuk menjelaskan kurva AD.",
        related: ["model_ad_as", "pdb_riil", "inflasi_ihk"]
    },
    output_potensial: {
        name: "Output Potensial (Y* / Kapasitas Maksimal)",
        category: "Output & Pertumbuhan Nasional",
        icon: "🏭",
        simpleDef: "Tingkat produksi PDB tertinggi yang dapat dicapai suatu negara secara berkelanjutan apabila seluruh pabrik, mesin, modal, dan tenaga kerja dimanfaatkan secara optimal tanpa memicu inflasi.",
        analogy: "Kapasitas terpasang pabrik baju: jika mesin dirancang menghasilkan 10.000 baju per bulan secara normal, memaksakan produksi 25.000 baju per bulan akan membuat mesin meledak dan biaya lembur melambung.",
        mechanism: "Dalam model AD-AS, Output Potensial digambarkan sebagai garis vertikal tegak lurus Kurva Penawaran Agregat Jangka Panjang (LRAS).",
        formula: "Y^* = A \\cdot f(K, L) \\quad \\text{(Fungsi Produksi Agregat Solow-Cobb Douglas)}",
        realImpact: "Untuk menaikkan Y* dalam jangka panjang, negara tidak bisa hanya mengandalkan cetak uang, melainkan harus membangun jalan tol, pelabuhan, menyekolahkan anak bangsa, dan riset teknologi.",
        related: ["model_ad_as", "nairu", "hukum_okun"]
    },
    krismon_1998: {
        name: "Krisis Moneter Asia 1998 (Krismon)",
        category: "Krisis & Kebijakan Valas",
        icon: "🌪️",
        simpleDef: "Krisis multidimensi terdahsyat dalam sejarah modern Indonesia di mana nilai tukar Rupiah ambruk dari Rp 2.500 ke Rp 16.000 per USD, memicu kebangkrutan perbankan massal dan kontraksi PDB hingga -13%.",
        analogy: "Ibarat bendungan air yang bocor parah: Pemerintah bertahun-tahun berpura-pura bendungan kokoh dengan mematok kurs semu, padahal air utang luar negeri swasta di baliknya sudah meluap deras hingga bendungan jebol menghanyutkan seluruh kota.",
        mechanism: "Dipicu oleh penularan krisis Baht Thailand, kepanikan penarikan dana massal di perbankan (bank run), dan tumpukan utang luar negeri swasta tanpa lindung nilai (currency mismatch).",
        formula: "\\text{PDB Riil 1998: } -13.1\\% \\quad | \\quad \\text{Inflasi: } 77.6\\% \\quad | \\quad \\text{Rasio Utang: } >90\\% \\text{ PDB}",
        realImpact: "Melahirkan tatanan institusi modern: Bank Indonesia dijadikan lembaga independen, Badan Penyehatan Perbankan Nasional (BPPN), OJK, dan batas disiplin APBN 3% disahkan.",
        related: ["currency_mismatch", "trilema_mundell_fleming", "apbn_defisit", "cadangan_devisa"]
    },
    krisis_2008: {
        name: "Krisis Keuangan Global 2008 (Subprime Mortgage)",
        category: "Krisis & Kebijakan Valas",
        icon: "📉",
        simpleDef: "Krisis finansial global yang bermula dari runtuhnya pasar kredit perumahan berisiko tinggi (subprime mortgage) di Amerika Serikat, menyeret bank investasi Lehman Brothers bangkrut dan membekukan likuiditas dunia.",
        analogy: "Ibarat kartu domino yang roboh: KPR macet di Amerika merobohkan surat berharga derivatif Wall Street, yang membekukan aliran kredit bank global, hingga memotong permintaan ekspor komoditas dari Indonesia.",
        mechanism: "Penyebaran krisis terjadi melalui jalur perdagangan (ekspor anjlok) dan jalur keuangan (pelarian modal global ke safe-haven Dolar AS).",
        formula: "\\text{Pemicu: Gelembung Spekulasi Properti (Asset Bubble) } + \\text{ Deregulasi Derivatif Finansial}",
        realImpact: "Indonesia selamat relatif baik (pertumbuhan tetap positif ~4,6%) berkat sistem perbankan pasca-1998 yang berhati-hati dan konsumsi domestik yang kuat.",
        related: ["trilema_mundell_fleming", "transmisi_moneter", "bi_rate"]
    },
    mikro_vs_makro: {
        name: "Mikroekonomi vs Makroekonomi (Kacamata Manajer)",
        category: "Fondasi Bisnis & Manajemen",
        icon: "💼",
        simpleDef: "Perbedaan sudut pandang antara keputusan internal satu perusahaan/individu (Mikro) dengan lingkungan iklim ekonomi nasional secara agregat (Makro).",
        analogy: "Mikroekonomi mempelajari kesehatan satu pohon (toko/pabrik Anda), sedangkan Makroekonomi mempelajari iklim, cuaca, dan kesehatan seluruh hutan belantara (perekonomian negara).",
        mechanism: "Strategi mikro terbaik (misal: produk unggul dan harga bersaing) bisa tetap gagal jika makroekonomi sedang hancur (misal: suku bunga melonjak 30% dan daya beli masyarakat ambruk karena hiperinflasi).",
        formula: "\\text{Mikro: } \\max \\text{Profit}(\\pi = TR - TC) \\quad \\text{vs} \\quad \\text{Makro: } \\max \\text{Welfare}(Y, \\text{Inflasi}, \\text{Tenaga Kerja})",
        realImpact: "Membantu para manajer bisnis memprediksi waktu yang tepat untuk ekspansi modal, merekrut karyawan, atau mengamankan arus kas sebelum badai krisis melanda.",
        related: ["pdb_riil", "bi_rate", "inflasi_ihk"]
    }
};

/**
 * Controller Tampilan Jargon Modal
 */
class JargonInspector {
    constructor() {
        this.currentTerm = null;
        this.initDOM();
    }

    initDOM() {
        if (!document.getElementById('jargonModalOverlay')) {
            const modalHTML = `
            <div id="jargonModalOverlay" class="jargon-modal-overlay" style="display:none;">
                <div class="jargon-modal-card" id="jargonModalCard">
                    <!-- Header Modal -->
                    <div class="jargon-modal-header">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <span id="jargonIcon" style="font-size:1.8rem;">💡</span>
                            <div>
                                <span id="jargonCategory" class="badge-tag" style="background:#e0f2fe; color:#0369a1; font-size:0.72rem; font-weight:700;">Kategori</span>
                                <h3 id="jargonTitle" style="margin:2px 0 0; font-family:var(--font-heading); color:var(--text-main); font-size:1.2rem;">Nama Istilah</h3>
                            </div>
                        </div>
                        <button type="button" id="btnCloseJargonModal" class="btn-sidebar-icon" style="font-size:1.1rem; width:32px; height:32px;" title="Tutup">✕</button>
                    </div>

                    <!-- Isi Penjelasan Modal -->
                    <div class="jargon-modal-body" id="jargonModalBody">
                        <!-- 1. Definisi Bahasa Sederhana -->
                        <div class="jargon-section-box" style="background:#f8fafc; border-left:4px solid #0284c7;">
                            <div class="jargon-section-title">📖 Definisi Sederhana (Bahasa Pelajaran):</div>
                            <p id="jargonSimpleDef" class="jargon-section-desc"></p>
                        </div>

                        <!-- 2. Analogi Bisnis & Dunia Nyata -->
                        <div class="jargon-section-box" style="background:#fffbeb; border-left:4px solid #d97706;">
                            <div class="jargon-section-title">💡 Analogi Praktik Bisnis & Dunia Usaha:</div>
                            <p id="jargonAnalogy" class="jargon-section-desc"></p>
                        </div>

                        <!-- 3. Formula & Mekanisme Kerja -->
                        <div class="jargon-section-box" style="background:#f0fdf4; border-left:4px solid #16a34a;">
                            <div class="jargon-section-title">⚙️ Mekanisme Sebab-Akibat & Rumus:</div>
                            <p id="jargonMechanism" class="jargon-section-desc"></p>
                            <div id="jargonFormulaWrap" style="margin-top:8px; display:none;">
                                <code style="background:#dcfce7; color:#166534; padding:3px 8px; border-radius:4px; font-size:0.82rem;"><span id="jargonFormula"></span></code>
                            </div>
                        </div>

                        <!-- 4. Realita Lapangan di Indonesia -->
                        <div class="jargon-section-box" style="background:#faf5ff; border-left:4px solid #9333ea;">
                            <div class="jargon-section-title">🎯 Realita Lapangan di Indonesia:</div>
                            <p id="jargonRealImpact" class="jargon-section-desc"></p>
                        </div>

                        <!-- 5. Istilah Terkait (Quick Jump) -->
                        <div style="margin-top:12px;">
                            <div style="font-size:0.78rem; font-weight:700; color:var(--text-muted); margin-bottom:6px;">🔗 Istilah Terkait Lainnya (Klik untuk Membaca):</div>
                            <div id="jargonRelatedChips" style="display:flex; gap:6px; flex-wrap:wrap;"></div>
                        </div>
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);

            // Pasang event close
            const overlay = document.getElementById('jargonModalOverlay');
            const btnClose = document.getElementById('btnCloseJargonModal');
            if (btnClose) btnClose.onclick = () => this.close();
            if (overlay) {
                overlay.onclick = (e) => {
                    if (e.target === overlay) this.close();
                };
            }
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && overlay.style.display !== 'none') {
                    this.close();
                }
            });
        }
    }

    inspect(termKey) {
        const data = MACRO_JARGON_DATA[termKey];
        if (!data) return;

        this.currentTerm = termKey;

        // Populate elements
        document.getElementById('jargonIcon').textContent = data.icon || '💡';
        document.getElementById('jargonCategory').textContent = data.category || 'Konsep Makro';
        document.getElementById('jargonTitle').textContent = data.name;
        document.getElementById('jargonSimpleDef').textContent = data.simpleDef;
        document.getElementById('jargonAnalogy').textContent = data.analogy;
        document.getElementById('jargonMechanism').textContent = data.mechanism;
        document.getElementById('jargonRealImpact').textContent = data.realImpact;

        const fWrap = document.getElementById('jargonFormulaWrap');
        const fText = document.getElementById('jargonFormula');
        if (data.formula) {
            fText.textContent = data.formula;
            fWrap.style.display = 'block';
        } else {
            fWrap.style.display = 'none';
        }

        // Related chips
        const relatedWrap = document.getElementById('jargonRelatedChips');
        relatedWrap.innerHTML = '';
        if (data.related && data.related.length > 0) {
            data.related.forEach(relKey => {
                const relData = MACRO_JARGON_DATA[relKey];
                if (relData) {
                    const chip = document.createElement('button');
                    chip.type = 'button';
                    chip.className = 'qa-chip-btn';
                    chip.style.fontSize = '0.74rem';
                    chip.textContent = `${relData.icon || '📌'} ${relData.name.split('(')[0].trim()}`;
                    chip.onclick = (e) => {
                        e.stopPropagation();
                        if (window.audio && window.audio.playClick) window.audio.playClick();
                        this.inspect(relKey);
                    };
                    relatedWrap.appendChild(chip);
                }
            });
        }

        // Tampilkan modal
        const overlay = document.getElementById('jargonModalOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            if (window.audio && window.audio.playClick) window.audio.playClick();
        }
    }

    close() {
        const overlay = document.getElementById('jargonModalOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
}

// Inisialisasi global
if (typeof window !== 'undefined') {
    window.jargonInspector = new JargonInspector();
    window.openJargonModal = (key) => window.jargonInspector.inspect(key);

    // Event delegation: klik apa saja yang memiliki class .econ-jargon
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.econ-jargon');
        if (target) {
            e.preventDefault();
            e.stopPropagation();
            const termKey = target.getAttribute('data-term');
            if (termKey && window.jargonInspector) {
                window.jargonInspector.inspect(termKey);
            }
        }
    });
}


// Auto-enhancer: Memindai elemen teks dan mengubah istilah ekonomi menjadi tombol jargon interaktif
function enhanceContainerWithJargon(rootEl) {
    if (!rootEl) return;

    const termMap = [
        { regex: /\bBI-Rate\b/g, key: 'bi_rate', text: 'BI-Rate' },
        { regex: /\btransmisi moneter\b/gi, key: 'transmisi_moneter', text: 'transmisi moneter' },
        { regex: /\bPDB Riil\b/gi, key: 'pdb_riil', text: 'PDB Riil' },
        { regex: /\bPDB Nominal\b/gi, key: 'pdb_nominal', text: 'PDB Nominal' },
        { regex: /\bDeflator PDB\b/gi, key: 'deflator_pdb', text: 'Deflator PDB' },
        { regex: /\bInflasi IHK\b/gi, key: 'inflasi_ihk', text: 'Inflasi IHK' },
        { regex: /\bCrowding-Out\b/gi, key: 'crowding_out', text: 'Crowding-Out' },
        { regex: /\bModel AD-AS\b/gi, key: 'model_ad_as', text: 'Model AD-AS' },
        { regex: /\bKurva Phillips\b/gi, key: 'kurva_phillips', text: 'Kurva Phillips' },
        { regex: /\bNAIRU\b/g, key: 'nairu', text: 'NAIRU' },
        { regex: /\bHukum Okun\b/gi, key: 'hukum_okun', text: 'Hukum Okun' },
        { regex: /\bPersamaan Fisher\b/gi, key: 'persamaan_fisher', text: 'Persamaan Fisher' },
        { regex: /\bTeori Kuantitas Uang\b/gi, key: 'teori_kuantitas_uang', text: 'Teori Kuantitas Uang' },
        { regex: /\bAngka Pengganda\b/gi, key: 'angka_pengganda', text: 'Angka Pengganda' },
        { regex: /\bMultiplier\b/gi, key: 'angka_pengganda', text: 'Multiplier' },
        { regex: /\bTrilema Mundell-Fleming\b/gi, key: 'trilema_mundell_fleming', text: 'Trilema Mundell-Fleming' },
        { regex: /\bThe Impossible Trinity\b/gi, key: 'trilema_mundell_fleming', text: 'The Impossible Trinity' },
        { regex: /\bStagflasi\b/gi, key: 'stagflasi', text: 'Stagflasi' },
        { regex: /\bCurrency Mismatch\b/gi, key: 'currency_mismatch', text: 'Currency Mismatch' },
        { regex: /\bGiro Wajib Minimum\b/gi, key: 'gwm', text: 'Giro Wajib Minimum' },
        { regex: /\bGWM\b/g, key: 'gwm', text: 'GWM' },
        { regex: /\bCadangan Devisa\b/gi, key: 'cadangan_devisa', text: 'Cadangan Devisa' },
        { regex: /\bKondisi Marshall-Lerner\b/gi, key: 'marshall_lerner', text: 'Kondisi Marshall-Lerner' },
        { regex: /\bPerangkap Likuiditas\b/gi, key: 'perangkap_likuiditas', text: 'Perangkap Likuiditas' },
        { regex: /\bEfek Pigou\b/gi, key: 'efek_pigou', text: 'Efek Pigou' },
        { regex: /\bOutput Potensial\b/gi, key: 'output_potensial', text: 'Output Potensial' },
        { regex: /\bKrisis Moneter 1998\b/gi, key: 'krismon_1998', text: 'Krisis Moneter 1998' },
        { regex: /\bKrismon 1998\b/gi, key: 'krismon_1998', text: 'Krismon 1998' },
        { regex: /\bKrisis 2008\b/gi, key: 'krisis_2008', text: 'Krisis 2008' },
        { regex: /\bUU No\. 17\/2003\b/gi, key: 'apbn_defisit', text: 'UU No. 17/2003' }
    ];

    // Walker untuk memproses text nodes murni tanpa merusak tag HTML lain
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            if (node.parentElement && (node.parentElement.closest('.econ-jargon') || node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE' || node.parentElement.tagName === 'CODE' || node.parentElement.tagName === 'BUTTON' || node.parentElement.tagName === 'INPUT')) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    const nodesToReplace = [];
    let currentNode;
    while (currentNode = walker.nextNode()) {
        for (const item of termMap) {
            if (item.regex.test(currentNode.nodeValue)) {
                nodesToReplace.push({ node: currentNode, item });
                break;
            }
        }
    }

    nodesToReplace.forEach(({ node }) => {
        let content = node.nodeValue;
        let modified = false;
        termMap.forEach(item => {
            if (item.regex.test(content)) {
                content = content.replace(item.regex, (match) => {
                    modified = true;
                    return `<span class="econ-jargon" data-term="${item.key}">${match}</span>`;
                });
            }
        });
        if (modified) {
            const span = document.createElement('span');
            span.innerHTML = content;
            if (node.parentNode) {
                node.parentNode.replaceChild(span, node);
            }
        }
    });
}

// Auto-scan setelah DOM siap
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            enhanceContainerWithJargon(document.getElementById('mgmtGuideContent'));
            enhanceContainerWithJargon(document.getElementById('academyContent'));
            enhanceContainerWithJargon(document.getElementById('encyclopediaGrid'));
        }, 500);
    });

    // Observer untuk konten dinamis
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            if (m.addedNodes.length > 0) {
                m.addedNodes.forEach(n => {
                    if (n.nodeType === 1 && !n.classList.contains('jargon-modal-overlay')) {
                        enhanceContainerWithJargon(n);
                    }
                });
            }
        });
    });
    setTimeout(() => {
        const mainContent = document.querySelector('.macro-main-content');
        if (mainContent) {
            observer.observe(mainContent, { childList: true, subtree: true });
        }
    }, 1000);
}
