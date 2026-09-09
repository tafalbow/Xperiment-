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
        formula: "r (riil) = i (nominal) - πᵉ | (Persamaan Fisher: Bunga Riil = Bunga Nominal - Inflasi)",
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
        formula: "Lag Waktu Kebijakan: 6 s/d 18 bulan (Outside Lag)",
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
        formula: "PDB Riil = (PDB Nominal / Deflator PDB) × 100",
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
        formula: "PDB Nominal = Total Σ (P × Q_t) = C + I + G + (X - M)",
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
        formula: "Deflator PDB = (PDB Nominal / PDB Riil) × 100",
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
        formula: "Inflasi (π) = ((IHK_t - IHK_t-1) / (IHK_t-1)) × 100%",
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
        formula: "ΔG ↑ → Permintaan Dana ↑ → r ↑ → I_swasta ↓",
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
        formula: "Rasio Defisit = ((Belanja Negara - Penerimaan Pajak) / PDB Nominal) × 100% ≤ 3.0%",
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
        formula: "Debt-to-GDP = (Total Utang Pemerintah / PDB Nominal) × 100% ≤ 60.0%",
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
        formula: "AD = C + I + G + (X - M) | vs | AS = f(K, L, A)",
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
        formula: "π = πᵉ - β (u - un (alamiah)) + v | (Ekspektasi Inflasi, Pengangguran, dan Guncangan Pasokan)",
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
        formula: "un (alamiah) = Tingkat Pengangguran Alamiah (di Indonesia sekitar 4.5% - 5.5%)",
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
        formula: "ΔU = -β (g - g^*) | dengan β ≈ 0.3 - 0.5",
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
        formula: "i = r + πᵉ ⇔ r = i - πᵉ",
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
        formula: "M × V = P × Y ⇔ %ΔM + %ΔV = %ΔP + %ΔY",
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
        formula: "k_G = (1 / (1 - MPC)) = 1 / MPS",
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
        formula: "Pilihan Indonesia: Devisa Bebas + Moneter Independen → Kurs Mengambang (Floating)",
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
        formula: "Stagflasi: Y ↓ (PDB Anjlok) | & | P ↑ (Harga Melonjak)",
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
        formula: "Risiko: Utang Valas (USD) >> Pendapatan Ekspor (USD)",
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
        formula: "GWM (%) = (Saldo Giro Wajib di BI / Dana Pihak Ketiga (DPK)) × 100%",
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
        formula: "Kurs Kuotasi Langsung: e = Rp 15.650 / USD",
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
        formula: "Kecukupan Devisa: Minimal setara 3 bulan pembiayaan impor dan pembayaran utang luar negeri",
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
        formula: "|ε_x| + |ε_m| > 1 | (Kondisi Marshall-Lerner)",
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
        formula: "i → 0% → Kurva LM berbentuk horizontal sempurna (Keynesian Trap)",
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
        formula: "P ↓ → (M / P) ↑ → Wealth ↑ → C ↑ → Y ↑",
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
        formula: "Y* = A × f(K, L) | (Fungsi Produksi Agregat Solow-Cobb Douglas)",
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
        formula: "PDB Riil 1998: -13.1% | Inflasi: 77.6% | Rasio Utang: >90% PDB",
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
        formula: "Pemicu: Gelembung Spekulasi Properti (Asset Bubble) + Deregulasi Derivatif Finansial",
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
        formula: "Mikro: max Profit(π = TR - TC) | vs | Makro: max Welfare(Y, Inflasi, Tenaga Kerja)",
        realImpact: "Membantu para manajer bisnis memprediksi waktu yang tepat untuk ekspansi modal, merekrut karyawan, atau mengamankan arus kas sebelum badai krisis melanda.",
        related: ["pdb_riil", "bi_rate", "inflasi_ihk"]
    },
    pajak_pigouvian: {
        name: "Pajak Pigouvian (Pigouvian Tax / Cukai Korektif)",
        category: "Kebijakan Fiskal & Eksternalitas",
        icon: "🚬",
        simpleDef: "Pajak atau pungutan cukai khusus yang dikenakan pada barang atau kegiatan ekonomi yang menimbulkan dampak buruk (eksternalitas negatif) bagi masyarakat, seperti rokok, minuman beralkohol, polusi pabrik, dan emisi karbon.",
        analogy: "Ibarat denda ganti rugi: Perokok berisiko tinggi terkena penyakit kronis yang membebani anggaran BPJS Kesehatan yang dibayar rakyat. Melalui cukai rokok yang tinggi, konsumen rokok dipaksa 'mengganti biaya sosial' kerusakan yang mereka timbulkan kepada orang lain.",
        mechanism: "Harga rokok naik drastis akibat cukai → Konsumsi rokok (terutama di kalangan remaja dan keluarga rentan) berkurang → Beban pembiayaan penyakit paru/jantung berkurang → Kas penerimaan cukai (Rp 200+ triliun) dipakai membiayai fasilitas kesehatan dan jaminan sosial.",
        formula: "t^* = MEC | (Tarif Pajak Optimal = Marginal External Cost / Biaya Kerusakan Eksternal)",
        realImpact: "Di Indonesia, Cukai Hasil Tembakau (CHT) menyumbang lebih dari Rp 210 triliun per tahun bagi APBN. Minimal 50% Dana Bagi Hasil Cukai (DBH CHT) wajib dialokasikan pemda untuk fasilitas kesehatan dan jaminan sosial petani tembakau.",
        related: ["tax_ratio", "subsidi_tepat_sasaran", "apbn_defisit", "defisit_apbn"]
    },
    keseimbangan_primer: {
        name: "Keseimbangan Primer APBN",
        category: "Kebijakan Fiskal & APBN",
        icon: "⚖️",
        simpleDef: "Selisih antara total Pendapatan Negara dengan Belanja Negara di luar pembayaran bunga utang. Jika surplus, berarti pendapatan negara mampu membiayai seluruh belanja operasional tanpa berutang untuk membayar cicilan bunga.",
        analogy: "Sama seperti keuangan keluarga: Gaji bulanan Anda cukup untuk membiayai makan, sekolah anak, dan listrik, tanpa harus berutang baru hanya demi menutup tagihan cicilan bunga utang lama (bebas gali lubang tutup lubang).",
        mechanism: "Keseimbangan Primer = Pendapatan Negara - (Belanja Total - Bunga Utang). Keseimbangan primer surplus menandakan posisi utang pemerintah bergerak aman dan rasio utang/PDB akan menurun secara berkelanjutan.",
        formula: "Keseimbangan Primer = Pendapatan Total - (Belanja Total - Bunga Utang)",
        realImpact: "Kementerian Keuangan RI terus menjaga agar Keseimbangan Primer berada di zona surplus (seperti surplus pada APBN 2022 dan 2023) sebagai bukti kemandirian dan kesehatan fiskal Indonesia.",
        related: ["apbn_defisit", "defisit_apbn", "utang_negara", "sbn"]
    },
    defisit_apbn: {
        name: "Defisit APBN & Disiplin Batas 3% PDB",
        category: "Kebijakan Fiskal & Utang",
        icon: "📜",
        simpleDef: "Kondisi saat pengeluaran belanja negara melampaui penerimaan kas negara, yang sesuai UU No. 17/2003 tentang Keuangan Negara dibatasi maksimal 3,0% dari PDB.",
        analogy: "Batas plafon utang darurat: Negara boleh meminjam uang untuk membiayai pembangunan rel kereta, jembatan, dan pelabuhan produktif, namun dibatasi maksimal 3% agar utang tidak menumpuk liar hingga negara bangkrut.",
        mechanism: "Defisit ditutup melalui penerbitan Surat Berharga Negara (SBN) atau pinjaman program. Pengetatan batas 3% menjaga kredibilitas dan reputasi investasi Indonesia di mata dunia internasional.",
        formula: "(Defisit APBN / PDB Nominal) × 100% ≤ 3.0%",
        realImpact: "Hanya pada masa darurat pandemi Covid-19 (2020-2022) batas 3% dilonggarkan melalui Perppu No. 1/2020, dan Indonesia berhasil mengembalikannya ke bawah 3% lebih cepat dari target pada tahun 2022.",
        related: ["apbn_defisit", "keseimbangan_primer", "utang_negara", "crowding_out", "sbn"]
    },
    kssk: {
        name: "KSSK (Komite Stabilitas Sistem Keuangan)",
        category: "Arsitektur & Stabilitas Sistem Keuangan",
        icon: "🏛️",
        simpleDef: "Lembaga koordinasi empat pilar otoritas tertinggi keuangan Indonesia yang dibentuk berdasarkan UU No. 9/2016 (UU PPKSK) untuk mencegah dan menangani krisis sistem keuangan.",
        analogy: "Pusat Komando Tanggap Darurat Nasional: Berisi 4 komandan penanggung jawab (Menteri Keuangan, Gubernur BI, Ketua OJK, Ketua LPS) yang duduk satu meja agar penanganan krisis berlangsung kilat tanpa saling lempar tanggung jawab.",
        mechanism: "KSSK memantau indikator makro dan perbankan secara triwulanan. Dalam kondisi krisis, Menteri Keuangan mengoordinasikan penetapan status sistemik bank dan langkah penyehatan.",
        formula: "KSSK = Kemenkeu (Fiskal) + Bank Indonesia (Moneter) + OJK (Pengawasan) + LPS (Penjamin Simpanan)",
        realImpact: "KSSK menggelar simulasi krisis berkala untuk memastikan jika bank besar goyah, skema resolusi penyelamatan (seperti bail-in dan purchase & assumption) dapat dieksekusi tanpa memicu kepanikan nasabah.",
        related: ["lps", "lender_of_last_resort", "bail_in", "too_big_to_fail"]
    },
    lps: {
        name: "LPS (Lembaga Penjamin Simpanan)",
        category: "Arsitektur & Stabilitas Sistem Keuangan",
        icon: "🛡️",
        simpleDef: "Lembaga independen yang menjamin simpanan nasabah perbankan hingga Rp 2 miliar per nasabah per bank untuk menjaga kepercayaan masyarakat dan mencegah kepanikan penarikan dana massal (bank run).",
        analogy: "Ibarat sabuk pengaman dan asuransi kecelakaan bagi uang tabungan Anda: Jika bank tempat Anda menabung bangkrut atau dicabut izinnya, LPS yang langsung mencairkan dan mengganti uang tabungan Anda.",
        mechanism: "Syarat 3T LPS agar simpanan dijamin: (1) Tercatat dalam pembukuan bank, (2) Tingkat bunga tidak melebihi suku bunga penjaminan LPS, (3) Tidak melakukan tindakan yang merugikan bank.",
        formula: "Batas Penjaminan Maksimal = Rp 2.000.000.000 per nasabah per bank",
        realImpact: "Sejak beroperasi tahun 2005, LPS telah melikuidasi dan membayar klaim ratusan BPR/BPRS bermasalah di Indonesia tanpa memicu gejolak sistemik di sektor perbankan.",
        related: ["kssk", "moral_hazard", "lender_of_last_resort"]
    },
    lender_of_last_resort: {
        name: "Lender of Last Resort (Fasilitas Pembiayaan Darurat BI)",
        category: "Kebijakan Moneter & Perbankan",
        icon: "🚨",
        simpleDef: "Fungsi bank sentral sebagai penolong terakhir yang menyediakan pinjaman likuiditas darurat kepada bank yang mengalami krisis likuiditas jangka pendek namun masih memiliki kondisi modal yang solven.",
        analogy: "Ibarat ambulans darurat: Memberikan tabung oksigen bantuan napas kepada orang yang tersedak sesaat, bukan menyuntikkan obat kepada orang yang sudah meninggal.",
        mechanism: "Doktrin Klasik Walter Bagehot: Berikan pinjaman secara bebas pada tingkat bunga penalti yang tinggi (penalty rate) dan hanya dengan jaminan agunan aset berkualitas tinggi (high-quality collateral).",
        formula: "Pinjaman Likuiditas Jangka Pendek (PLJP) → Bank Solven, Agunan Prima, Bunga Penalti",
        realImpact: "Diatur dalam UU Bank Indonesia dan UU P2SK untuk menghindari penyalahgunaan dana talangan seperti tragedi BLBI pada krisis moneter 1998.",
        related: ["bi_rate", "kssk", "moral_hazard", "gwm"]
    },
    bail_in: {
        name: "Bail-In (Resolusi Beban Internal Bank)",
        category: "Resolusi Perbankan & Mitigasi Krisis",
        icon: "🔒",
        simpleDef: "Mekanisme penyehatan bank bermasalah di mana kerugian bank diserap terlebih dahulu oleh modal pemilik saham dan kreditur bank itu sendiri (mengonversi utang menjadi modal), bukan menggunakan uang APBN/pajak rakyat (Bail-Out).",
        analogy: "Ibarat kapal bocor: Pemilik kapal dan penumpang kelas satu yang memegang saham wajib merelakan barang bawaannya untuk menambal lambung kapal, bukan meminta warga di daratan membayar kapal baru.",
        mechanism: "Modal saham dihapusbukukan → Utang subordinasi dikonversi menjadi saham baru → Manajemen diganti → Bank kembali sehat tanpa menyedot sepeser pun uang pajak rakyat.",
        formula: "Piramida Penyerapan Rugi: Modal Saham → Obligasi Subordinasi → Kreditur Tanpa Jaminan",
        realImpact: "Diadopsi secara ketat dalam UU PPKSK No. 9/2016 agar negara Indonesia tidak pernah lagi menanggung skandal 'Bail-Out' seperti kasus Bank Century 2008 atau BLBI 1998.",
        related: ["too_big_to_fail", "moral_hazard", "kssk", "lps"]
    },
    too_big_to_fail: {
        name: "Too Big to Fail (Bank Berdampak Sistemik)",
        category: "Arsitektur & Stabilitas Sistem Keuangan",
        icon: "🏦",
        simpleDef: "Istilah untuk bank-bank raksasa yang skala aset, interkoneksi, dan perannya di sistem pembayaran begitu besar sehingga jika satu bank ini runtuh, seluruh perekonomian nasional ikut terseret ke dalam krisis.",
        analogy: "Ibarat tiang pancang utama sebuah gedung pencakar langit: Jika tiang ini retak, seluruh lantai gedung terancam roboh seketika.",
        mechanism: "Karena memiliki risiko sistemik, bank-bank kategori ini dikenakan pengawasan ekstra ketat oleh OJK dan BI, serta diwajibkan memiliki bantalan modal tambahan (Capital Surcharge) sebesar 1% - 2,5%.",
        formula: "Bantalan Modal Ekstra = CAR Minimum + Systemic Capital Surcharge (1,0% - 2,5%)",
        realImpact: "Di Indonesia terdapat lebih dari 15 bank yang dikategorikan sebagai Bank Berdampak Sistemik (Domestic Systemically Important Banks / D-SIBs) yang wajib memiliki Rencana Aksi Pemulihan (Recovery Plan) mandiri.",
        related: ["bail_in", "kssk", "moral_hazard", "stress_test"]
    },
    moral_hazard: {
        name: "Moral Hazard (Bahaya Moral)",
        category: "Perilaku Pasar & Regulasi",
        icon: "🎭",
        simpleDef: "Kecenderungan seseorang, bankir, atau perusahaan untuk mengambil risiko yang ugal-ugalan atau tidak berhati-hati karena merasa konsekuensi kerugiannya akan ditanggung atau ditalangi oleh pihak lain/pemerintah.",
        analogy: "Orang yang menyetir mobil sewaan dengan ugal-ugalan menabrak trotoar hanya karena ia membeli asuransi ganti rugi penuh tanpa biaya sendiri.",
        mechanism: "Janji talangan (bailout) pemerintah membuat bankir berani menyalurkan kredit spekulatif berbunga tinggi demi bonus pribadi. Jika untung mereka nikmati sendiri, jika rugi mereka minta APBN menalangi.",
        formula: "Asymmetric Information + Protection Guarantee → Excessive Risk-Taking",
        realImpact: "Alasan mengapa bantuan likuiditas bank sentral dan regulasi perbankan selalu menetapkan penalti, syarat agunan ketat, dan ancaman pemecatan bagi direksi bank yang ceroboh.",
        related: ["bail_in", "lender_of_last_resort", "too_big_to_fail"]
    },
    sbn: {
        name: "SBN (Surat Berharga Negara)",
        category: "Kebijakan Fiskal & Utang",
        icon: "📜",
        simpleDef: "Surat pengakuan utang resmi yang diterbitkan oleh Pemerintah Republik Indonesia, terdiri dari Surat Utang Negara (SUN konvensional) dan Surat Berharga Syariah Negara (SBSN / Sukuk Negara).",
        analogy: "Surat pinjaman negara kepada warganya: Pemerintah meminjam Rp 10 juta dari Anda untuk membangun jembatan, dan berjanji membayar imbalan bunga/kupon rutin setiap bulan serta mengembalikan pokok pinjaman secara utuh saat jatuh tempo.",
        mechanism: "Kemenkeu menerbitkan SBN melalui lelang pasar perdana dan ritel (ORI, Sukuk Ritel, SBR). Hasil dana masuk kas APBN untuk membiayai belanja produktif negara.",
        formula: "Yield SBN = ((Kupon Tahunan + (Nilai Pari - Harga Beli)/t) / Harga Beli)",
        realImpact: "SBN ritel Indonesia sangat diminati milenial dan generasi muda sebagai instrumen investasi yang dijamin 100% oleh undang-undang dengan imbal hasil di atas bunga deposito.",
        related: ["apbn_defisit", "defisit_apbn", "crowding_out", "utang_negara"]
    },
    fiskal_kontrasiklikal: {
        name: "Kebijakan Fiskal Kontrasiklikal (Counter-cyclical)",
        category: "Kebijakan Fiskal & APBN",
        icon: "🔄",
        simpleDef: "Strategi pengelolaan APBN yang bergerak berlawanan arah dengan siklus ekonomi: belanja dinaikkan saat ekonomi sedang resesi, dan belanja dikurangi/pajak dinaikkan saat ekonomi mengalami overheating (kepanasan).",
        analogy: "Ibarat menyimpan lumbung padi di tahun panen raya dan membuka lumbung padi membagikan beras saat musim kemarau dan paceklik tiba.",
        mechanism: "Resesi: Belanja naik, pajak dipotong untuk memompa daya beli. Overheating: Belanja direm, pajak dinaikkan untuk meredam lonjakan inflasi dan memperkuat saldo tabungan kas negara.",
        formula: "ΔG = -k × (Y - Y*) | (Belanja berlawanan arah dengan selisih Output Gap)",
        realImpact: "Paket pemulihan ekonomi nasional (PEN) saat pandemi Covid-19 adalah bukti nyata manuver fiskal kontrasiklikal Indonesia yang sukses mencegah ekonomi masuk ke depresi berkepanjangan.",
        related: ["automatic_stabilizers", "keseimbangan_ad_as", "multiplier_effect"]
    },
    automatic_stabilizers: {
        name: "Penstabil Otomatis (Automatic Stabilizers)",
        category: "Kebijakan Fiskal & APBN",
        icon: "⚙️",
        simpleDef: "Fitur dalam struktur anggaran pemerintah yang secara otomatis meredam gejolak resesi atau inflasi tanpa perlu menunggu persetujuan undang-undang baru dari parlemen/DPR.",
        analogy: "Thermostat otomatis AC: Ketika ruangan mendadak panas, AC otomatis mendinginkan tanpa perlu Anda bangun mencari remote control.",
        mechanism: "Saat resesi: Penerimaan pajak otomatis anjlok karena pendapatan warga turun, sementara pencairan bantuan sosial dan subsidi otomatis melonjak. Hal ini secara mandiri menopang daya beli konsumsi.",
        formula: "Y ↓ → Penerimaan Pajak T ↓ dan Belanja Transfer TR ↑ → Konsumsi Agregat Tertahan",
        realImpact: "Pajak penghasilan (PPh) progresif dan skema bansos bersyarat (PKH, BPNT) di Indonesia bekerja sebagai penstabil otomatis penyerap guncangan ekonomi.",
        related: ["fiskal_kontrasiklikal", "daya_beli", "apbn_defisit"]
    },
    multiplier_effect: {
        name: "Angka Pengganda (Multiplier Effect)",
        category: "Kebijakan Fiskal & Moneter",
        icon: "⚡",
        simpleDef: "Faktor kelipatan di mana penambahan Rp 1 belanja pemerintah atau investasi akan menghasilkan penambahan pendapatan nasional (PDB) yang berlipat ganda di masyarakat.",
        analogy: "Efek riak gelombang di kolam: Pemerintah menyewa kontraktor membangun jalan Rp 1 miliar → Buruh digaji lalu belanja beras di warung → Warung beli motor baru → Pabrik motor merekrut pekerja baru. Uang Rp 1 miliar bergulir menjadi transaksi bernilai Rp 3 miliar!",
        mechanism: "Ditentukan oleh Marginal Propensity to Consume (MPC). Semakin tinggi porsi pendapatan yang dibelanjakan masyarakat, semakin raksasa angka pengganda ekonominya.",
        formula: "k = (1 / (1 - MPC)) = 1 / MPS | (Pengganda Belanja Pemerintah)",
        realImpact: "Belanja infrastruktur logistik di Indonesia memiliki angka pengganda fiskal di atas 1,4x karena membuka akses pasar baru bagi ribuan pelaku UMKM daerah.",
        related: ["keseimbangan_ad_as", "pdb_riil", "daya_beli"]
    },
    daya_beli: {
        name: "Daya Beli Masyarakat (Purchasing Power)",
        category: "Konsumsi & Kesejahteraan",
        icon: "🛒",
        simpleDef: "Kemampuan finansial riil masyarakat untuk membeli sejumlah barang dan jasa dengan penghasilan yang mereka peroleh setelah memperhitungkan laju kenaikan harga (inflasi).",
        analogy: "Jika gaji Anda Rp 3 juta dan harga sepiring nasi Rp 15 ribu, Anda bisa membeli 200 piring nasi. Jika tahun depan gaji naik jadi Rp 3,2 juta tapi harga nasi melonjak jadi Rp 20 ribu, Anda hanya bisa membeli 160 piring. Gaji nominal naik tapi daya beli Anda anjlok!",
        mechanism: "Daya beli riil adalah rasio pendapatan terhadap indeks harga: Upah Riil = Upah Nominal / IHK. Jika inflasi pangan meroket, daya beli masyarakat kelas menengah-bawah tergerus drastis.",
        formula: "Daya Beli Riil = (Pendapatan Nominal / Tingkat Harga (IHK))",
        realImpact: "Konsumsi rumah tangga menyumbang lebih dari 53% PDB Indonesia, sehingga menjaga daya beli pangan adalah prioritas nomor wahid stabilitas nasional.",
        related: ["inflasi_ihk", "pdb_riil", "rasio_gini"]
    },
    rasio_gini: {
        name: "Rasio Gini (Indeks Ketimpangan Pendapatan)",
        category: "Distribusi Pendapatan & Kesejahteraan",
        icon: "📊",
        simpleDef: "Tolok ukur statistik ketimpangan pengeluaran/pendapatan masyarakat dengan rentang nilai 0 (pemerataan sempurna: semua orang setara) hingga 1 (ketimpangan absolut: seluruh kekayaan dikuasai 1 orang).",
        analogy: "Kue ulang tahun yang dibagikan ke 100 orang: Jika setiap orang mendapat potongan kue sama besar, Gini = 0. Jika 1 orang melahap seluruh kue sementara 99 orang lainnya hanya menonton gigit jari, Gini = 1.",
        mechanism: "Dihitung dari luas area antara Kurva Lorenz dan garis pemerataan diagonal sempurna. Nilai di atas 0,4 menandakan ketimpangan yang rawan memicu konflik sosial.",
        formula: "G = 1 - Total Σ_i=1^n (X_i - X_i-1)(Y_i + Y_i-1) | (Formula Kurva Lorenz)",
        realImpact: "BPS melaporkan Rasio Gini Indonesia berada di kisaran 0,381. Penyaluran bantuan sosial, pembangunan infrastruktur desa, dan beasiswa KIP Kuliah bertujuan menurunkan angka rasio ini.",
        related: ["daya_beli", "tax_ratio", "subsidi_tepat_sasaran"]
    },
    subsidi_tepat_sasaran: {
        name: "Subsidi Tepat Sasaran (Targeted Subsidies)",
        category: "Kebijakan Fiskal & Kesejahteraan",
        icon: "🎯",
        simpleDef: "Transformasi kebijakan bantuan negara dari subsidi berbasis komoditas (harga barang dibuat murah untuk semua orang) menjadi bantuan tunai langsung berbasis data penerima manfaat (hanya keluarga miskin).",
        analogy: "Subsidi BBM di SPBU: Orang kaya pemilik mobil mewah ikut menikmati bensin subsidi murah yang disubsidi negara. Subsidi tepat sasaran mengubahnya menjadi transfer uang digital langsung ke dompet keluarga miskin.",
        mechanism: "Menggunakan Data Terpadu Kesejahteraan Sosial (DTKS) dan identitas NIK agar subsidi tidak bocor dinikmati golongan berada.",
        formula: "Efisiensi Fiskal = (Bantuan Dinikmati 40% Warga Termiskin / Total Anggaran Subsidi) × 100%",
        realImpact: "Peralihan subsidi BBM ke BLT (Bantuan Langsung Tunai) menghemat puluhan triliun rupiah kas APBN untuk dialihkan ke pembangunan fasilitas kesehatan dan pendidikan.",
        related: ["apbn_defisit", "rasio_gini", "automatic_stabilizers"]
    },
    tax_ratio: {
        name: "Tax Ratio (Rasio Penerimaan Pajak terhadap PDB)",
        category: "Kebijakan Fiskal & Penerimaan",
        icon: "📈",
        simpleDef: "Persentase perbandingan antara total penerimaan pajak yang berhasil dikumpulkan negara terhadap nilai Produk Domestik Bruto (PDB) nominalnya.",
        analogy: "Seberapa banyak porsi panen yang disisihkan warga untuk lumbung bersama desa: Jika ekonomi desa menghasilkan 100 karung padi dan terkumpul 10 karung untuk kas desa, tax ratio desa adalah 10%.",
        mechanism: "Mencerminkan efektivitas sistem administrasi perpajakan, tingkat kepatuhan wajib pajak, serta besarnya sektor informal (shadow economy) yang belum terjangkau pajak.",
        formula: "Tax Ratio = ((Total Penerimaan Pajak (Pusat + Bea Cukai)) / PDB Nominal) × 100%",
        realImpact: "Tax ratio Indonesia saat ini berkisar 10% - 11%, masih di bawah rata-rata negara OECD (34%) dan negara emerging market sepadan (15%). Meningkatkan tax ratio adalah syarat mutlak menuju Indonesia Emas 2045.",
        related: ["core_tax", "apbn_defisit", "pajak_pigouvian"]
    },
    core_tax: {
        name: "Core Tax Administration System (PSIAP DJP)",
        category: "Transformasi Digital Perpajakan",
        icon: "💻",
        simpleDef: "Sistem teknologi informasi inti perpajakan modern terintegrasi milik Direktorat Jenderal Pajak Kementerian Keuangan yang mengotomatisasi seluruh proses bisnis layanan pajak, pengawasan, dan penegakan hukum.",
        analogy: "Ibarat sistem operasi perbankan digital mutakhir: Semua data faktur, rekening, transaksi aset, dan pelaporan SPT tersambung otomatis dalam satu layar tanpa perlu berkas kertas bertumpuk.",
        mechanism: "Data transaksi pihak ketiga (perbankan, bea cukai, BPN, kepolisian) dicocokkan otomatis (auto-matching) dengan pelaporan SPT wajib pajak, mendeteksi ketidakwajaran secara instan.",
        formula: "Kepatuhan Pajak ↑ → Tax Gap ↓ → Penerimaan APBN ↑",
        realImpact: "Diluncurkan untuk merevolusi kepatuhan sukarela, menutup kebocoran pajak, dan mendongkrak Tax Ratio Indonesia menuju target 12% - 14%.",
        related: ["tax_ratio", "apbn_defisit"]
    },
    neraca_pembayaran: {
        name: "Neraca Pembayaran Indonesia (NPI / Balance of Payments)",
        category: "Ekonomi Terbuka & Perdagangan Internasional",
        icon: "🌐",
        simpleDef: "Catatan statistik sistematis seluruh transaksi ekonomi dan keuangan antara penduduk Indonesia dengan penduduk negara lain di seluruh dunia dalam periode tertentu.",
        analogy: "Buku kas transaksi luar negeri bangsa: Mencatat arus devisa masuk (dari ekspor barang, devisa turis, utang/investasi asing) dan arus devisa keluar (untuk bayar impor, jalan-jalan ke luar negeri, bayar bunga utang).",
        mechanism: "Terdiri dari dua pos utama: Transaksi Berjalan (ekspor-impor barang/jasa) dan Transaksi Finansial (investasi langsung FDI dan portofolio saham/obligasi).",
        formula: "NPI = Neraca Transaksi Berjalan (CAB) + Neraca Modal & Finansial (FAB) = ΔCadangan Devisa",
        realImpact: "Jika NPI mengalami defisit berkepanjangan, cadangan devisa Bank Indonesia akan terkuras dan nilai tukar Rupiah rentan terhadap tekanan depresiasi tajam.",
        related: ["cadangan_devisa", "kurs_valas", "trilema_mundell_fleming"]
    },
    itf: {
        name: "Inflation Targeting Framework (ITF / Bauran Moneter)",
        category: "Kebijakan Moneter & Perbankan",
        icon: "🎯",
        simpleDef: "Kerangka kerja kebijakan moneter Bank Indonesia di mana stabilitas inflasi ditetapkan secara eksplisit di awal sebagai target/jangkar utama, didukung transparansi dan komunikasi publik yang kredibel.",
        analogy: "Ibarat kompas pemandu kapal: Kapal bank sentral mengarahkan seluruh instrumen (suku bunga, intervensi valas, likuiditas) ke satu titik sasaran yaitu angka inflasi 2,5% ± 1%.",
        mechanism: "BI mengumumkan sasaran inflasi → Memantau proyeksi inflasi ke depan → Menyesuaikan BI-Rate jika proyeksi melenceng dari target → Masyarakat yakin harga stabil (ekspektasi inflasi terjangkar).",
        formula: "i_t = r^* + π_t + 0.5(π_t - π^*) + 0.5(y_t - y^*) | (Taylor Rule Framework)",
        realImpact: "Penerapan ITF sejak 2005 berhasil menjinakkan inflasi liar Indonesia dari semula belasan persen pasca-krisis menjadi stabil di kisaran 2% - 3% dalam satu dekade terakhir.",
        related: ["bi_rate", "transmisi_moneter", "inflasi_ihk"]
    },
    keseimbangan_ad_as: {
        name: "Model Keseimbangan Agregat AD-AS",
        category: "Teori Makroekonomi Dasar",
        icon: "📈",
        simpleDef: "Model utama ekonomi makro yang mempertemukan kurva Permintaan Agregat (Aggregate Demand / AD) dengan Penawaran Agregat (Aggregate Supply / AS) untuk menentukan titik keseimbangan output PDB dan tingkat harga nasional.",
        analogy: "Titik temu tawar-menawar skala raksasa seisi negeri: Total hasrat belanja seluruh rakyat dan pemerintah (AD) bertemu dengan total kesiapan pabrik dan petani memproduksi barang fisik (AS).",
        mechanism: "Pergeseran AD (akibat stimulus belanja/suku bunga) atau pergeseran AS (akibat guncangan panen/kenaikan harga minyak) akan menggeser PDB riil dan inflasi secara simultan.",
        formula: "AD = C + I + G + (X - M) = AS(P, W, Teknologi)",
        realImpact: "Menjadi peta kompas utama teknokrat Bappenas dan Kemenkeu dalam memprediksi dampak kebijakan stimulus sebelum diputuskan di sidang kabinet.",
        related: ["pdb_riil", "output_potensial", "stagflasi"]
    },
    dndf: {
        name: "DNDF (Domestic Non-Deliverable Forward)",
        category: "Pasar Valuta Asing & Moneter",
        icon: "💱",
        simpleDef: "Instrumen transaksi derivatif valuta asing standar Bank Indonesia di pasar domestik, di mana penyelesaian transaksinya tidak menukarkan fisik Dolar AS, melainkan hanya selisih nilai kursnya dalam mata uang Rupiah.",
        analogy: "Kontrak taruhan lindung nilai cuaca: Anda mengunci harga beli beras Rp 15.000 untuk bulan depan. Jika bulan depan harga pasar jadi Rp 16.000, penjual hanya mentransfer selisih Rp 1.000 ke rekening Anda tanpa perlu mengangkut fisik beras.",
        mechanism: "Pelaku usaha importir mengunci kurs forward di bank domestik → Kebutuhan memburu fisik Dolar di pasar spot berkurang → Tekanan volatilitas kurs Rupiah mereda tanpa menguras cadangan devisa fisik BI.",
        formula: "Settlement DNDF = (Kurs Acuan JISDOR - Kurs Kontrak DNDF) × Nominal USD (Dibayar dalam IDR)",
        realImpact: "Diperkenalkan BI pada 2018 sebagai instrumen penyelamat stabilitas Rupiah saat The Fed menaikkan suku bunga agresif, memangkas ketergantungan pada pasar NDF Singapura.",
        related: ["kurs_valas", "cadangan_devisa", "hedging"]
    },
    lcs: {
        name: "LCS (Local Currency Settlement) / LCT",
        category: "Ekonomi Internasional & Dedolarisasi",
        icon: "🤝",
        simpleDef: "Kerja sama penyelesaian transaksi perdagangan bilateral dan investasi antar-negara menggunakan mata uang lokal masing-masing tanpa perlu lagi menukarkannya terlebih dahulu ke mata uang Dolar AS (Dedolarisasi).",
        analogy: "Jika pengusaha Indonesia bertransaksi dengan pengusaha Malaysia, eksportir menerima Ringgit dan importir membayar Rupiah langsung, tanpa harus repot menukar Rupiah ke Dolar AS lalu Dolar ke Ringgit.",
        mechanism: "Mengurangi biaya konversi ganda (kurs ganda), mempercepat transaksi antar-negara, dan melindungi neraca perdagangan dari goncangan fluktuasi nilai tukar Dolar AS.",
        formula: "IDR ↔ Mata Uang Mitra (CNY, JPY, MYR, THB, KRW) | (Tanpa Melalui USD)",
        realImpact: "Bank Indonesia telah menjalin kemitraan LCT dengan Tiongkok, Jepang, Malaysia, Thailand, dan Korea Selatan, mencatatkan nilai transaksi setara miliaran Dolar AS per tahun.",
        related: ["kurs_valas", "neraca_pembayaran", "trilema_mundell_fleming"]
    },
    hedging: {
        name: "Hedging (Lindung Nilai Valas)",
        category: "Manajemen Risiko & Keuangan Korporasi",
        icon: "🛡️",
        simpleDef: "Tindakan pengamanan keuangan yang dilakukan perusahaan atau pemerintah untuk melindungi diri dari potensi kerugian akibat pergerakan liar nilai tukar mata uang asing di masa depan.",
        analogy: "Membeli asuransi kebakaran untuk gudang: Anda membayar sedikit premi kontrak di awal agar jika terjadi kebakaran (Rupiah anjlok tajam), bisnis Anda tidak langsung gulung tikar.",
        mechanism: "BUMN yang berutang Dolar AS membeli kontrak forward/swap valas dari perbankan domestik, mengunci kurs pembayaran utang di masa mendatang.",
        formula: "Rasio Lindung Nilai Wajib BUMN ≥ 25% dari Selisih Bersih Kewajiban Valas Jangka Pendek",
        realImpact: "BUMN seperti PLN dan Pertamina diwajibkan melakukan hedging valas untuk memastikan lonjakan kurs USD tidak menghancurkan arus kas operasional pasokan listrik dan BBM nasional.",
        related: ["dndf", "currency_mismatch", "kurs_valas"]
    },
    dutch_disease: {
        name: "Dutch Disease (Penyakit Belanda)",
        category: "Struktur Industri & Komoditas",
        icon: "🛢️",
        simpleDef: "Kondisi paradoks di mana lonjakan ekspor sumber daya alam (seperti minyak, gas, batu bara, atau nikel) menyebabkan mata uang domestik menguat terlalu drastis, yang justru menghancurkan daya saing ekspor sektor manufaktur dan pertanian.",
        analogy: "Seseorang yang mendadak menang undian warisan triliunan rupiah: Ia menjadi malas bekerja, berhenti bertani, dan mematikan usaha toko kerajinannya. Ketika uang warisan habis, ia tidak lagi memiliki keahlian produktif untuk bertahan hidup.",
        mechanism: "Booming komoditas → Devisanya membanjiri pasar → Kurs Rupiah menguat tajam → Harga barang pabrik lokal jadi mahal bagi pembeli asing → Pabrik tekstil & elektronik domestik gulung tikar.",
        formula: "Ekspor Komoditas ↑ → Nilai Tukar Riil Menguat → Daya Saing Manufaktur ↓",
        realImpact: "Pelajaran berharga bagi Indonesia agar tidak terjebak kutukan sumber daya mentah, yang melahirkan kebijakan Hilirisasi Mineral untuk membangun industri pengolahan bernilai tambah tinggi di dalam negeri.",
        related: ["kurs_valas", "pdb_riil", "tax_ratio"]
    },
    imported_inflation: {
        name: "Imported Inflation (Inflasi Impor)",
        category: "Tingkat Harga & Valas",
        icon: "🚢",
        simpleDef: "Kenaikan harga barang dan jasa di dalam negeri yang dipicu oleh kenaikan harga komoditas global di luar negeri atau akibat pelemahan nilai tukar mata uang domestik yang membuat biaya impor membengkak.",
        analogy: "Kenaikan harga gandum di Amerika Serikat: Indonesia tidak memproduksi gandum lokal. Ketika harga gandum dunia naik atau Dolar menguat, harga mie instan dan roti di warung lokal otomatis ikut naik.",
        mechanism: "Rupiah melemah terhadap USD → Importir membayar harga bahan baku (kedelai, BBM, gandum, obat) lebih mahal dalam Rupiah → Beban biaya diteruskan ke konsumen akhir dalam bentuk lonjakan harga jual.",
        formula: "ΔP_domestik = α × Δe + β × ΔP^* | (Exchange Rate Pass-Through)",
        realImpact: "Alasan Bank Indonesia selalu siaga mempertahankan stabilitas Rupiah, karena setiap pelemahan kurs Rp 1.000 terhadap USD akan merambat menaikkan angka inflasi domestik.",
        related: ["inflasi_ihk", "kurs_valas", "bi_rate"]
    },
    policy_mix: {
        name: "Policy Mix (Bauran Kebijakan Nasional)",
        category: "Strategi Makroekonomi Nasional",
        icon: "🎼",
        simpleDef: "Kombinasi sinergis dan harmonis antara instrumen kebijakan moneter Bank Indonesia (suku bunga, kurs, makroprudensial) dan kebijakan fiskal Kementerian Keuangan (pajak, belanja, pembiayaan) untuk mencapai pertumbuhan ekonomi tinggi sekaligus menjaga stabilitas harga.",
        analogy: "Ibarat orkestra musik simfoni: Drum dan gitar bas (fiskal & moneter) harus bertempo selaras. Jika moneter menginjak rem sementara fiskal menginjak gas tanpa koordinasi, mobil ekonomi akan oleng dan terbalik.",
        mechanism: "Moneter menjaga stabilitas harga & kurs (Pro-Stability), sementara Fiskal dan Makroprudensial mendorong akselerasi pertumbuhan kredit dan hilirisasi riil (Pro-Growth).",
        formula: "Policy Mix = Monetary Policy + Fiscal Policy + Macroprudential",
        realImpact: "Sinergi erat antara Menkeu dan Gubernur BI (termasuk skema burden sharing pembiayaan darurat) diakui dunia internasional sebagai model bauran kebijakan terbaik di kawasan Asia.",
        related: ["bi_rate", "apbn_defisit", "kssk"]
    },
    stress_test: {
        name: "Stress Test (Uji Ketahanan Modal Perbankan)",
        category: "Pengawasan Perbankan & Mitigasi Risiko",
        icon: "🔬",
        simpleDef: "Simulasi komputasi kuantitatif yang dijalankan oleh regulator untuk menguji apakah bank memiliki modal dan likuiditas yang cukup tangguh jika terjadi skenario terburuk (misal: ekonomi anjlok -5%, kurs melorot ke Rp 18.000/USD, dan kredit macet NPL melonjak).",
        analogy: "Crash test tabrakan mobil di pabrik: Mobil dihempaskan ke tembok beton berkecepatan 100 km/jam untuk memastikan airbag dan sabuk pengaman berfungsi menyelamatkan nyawa penumpang di dalamnya.",
        mechanism: "Data portofolio kredit dan surat berharga bank dimasukkan ke model simulasi krisis makro. Jika rasio modal (CAR) bank jatuh di bawah batas minimum regulator, bank diwajibkan menambah setoran modal darurat.",
        formula: "CAR Post-Shock = ((Modal Awal - Proyeksi Kerugian Skenario Ekstrem) / ATMR Baru) ≥ 8% - 12%",
        realImpact: "OJK dan Bank Indonesia melakukan stress test perbankan setiap semester untuk memastikan tidak ada bank sistemik yang tumbang saat terjadi gejolak global.",
        related: ["too_big_to_fail", "kssk", "gwm"]
    },
    human_capital: {
        name: "Human Capital (Modal Manusia)",
        category: "Pertumbuhan Ekonomi Jangka Panjang",
        icon: "🎓",
        simpleDef: "Akumulasi pengetahuan, keahlian, keterampilan teknis, kreativitas, dan status kesehatan yang melekat pada tenaga kerja suatu bangsa, yang menentukan produktivitas total faktor (TFP) perekonomian.",
        analogy: "Memiliki komputer tercanggih di dunia tidak berguna jika penggunanya tidak bisa mengetik atau memprogram. Komputer adalah modal fisik, sementara keahlian sang insinyur adalah modal manusia.",
        mechanism: "Peningkatan mutu sekolah, vokasi, dan nutrisi gizi anak (cegah stunting) → Produktivitas pekerja naik berlipat ganda → Inovasi teknologi lokal bermunculan → Negara lolos dari Middle-Income Trap.",
        formula: "Y = A × K^α × (h × L)^(1-α) | (Model Pertumbuhan Solow-Mankiw-Romer)",
        realImpact: "Konstitusi UUD 1945 mengamanatkan minimal 20% anggaran APBN wajib dialokasikan untuk sektor pendidikan guna mencetak generasi unggul Indonesia.",
        related: ["pdb_riil", "hukum_okun", "tax_ratio"]
    },
    early_warning: {
        name: "Early Warning System (EWS / Sistem Peringatan Dini)",
        category: "Manajemen Krisis Sistem Keuangan",
        icon: "🚨",
        simpleDef: "Perangkat indikator statistik dan sinyal kuantitatif yang memantau anomali di pasar uang, perbankan, pasar modal, dan sektor eksternal untuk mendeteksi kerentanan krisis sebelum bencana ekonomi benar-benar meledak.",
        analogy: "Alat seismograf pendeteksi getaran gempa bumi dan sirine tsunami di tepi pantai: Berbunyi beberapa menit sebelum gelombang raksasa menghantam daratan, memberi waktu bagi warga untuk evakuasi ke tempat aman.",
        mechanism: "Indikator yang dipantau meliputi lonjakan spread imbal hasil obligasi, deviasi kurs riil, rasio kecukupan cadangan devisa, pertumbuhan kredit berlebih (Credit Boom), dan penarikan simpanan valas.",
        formula: "Sinyal Krisis = Total Σ w_i × I(X_i,t > θ_i) | (Indikator melampaui ambang batas deviasi standar)",
        realImpact: "Bank Indonesia dan KSSK mengoperasikan Financial Vulnerability Index (FVI) sebagai radar peringatan dini mingguan untuk menjaga stabilitas makroekonomi nasional.",
        related: ["kssk", "stress_test", "kurs_valas"]
    },
    monopoli_alami: {
        name: "Monopoli Alami (Natural Monopoly)",
        category: "Struktur Pasar & Kebijakan Publik",
        icon: "⚡",
        simpleDef: "Kondisi industri di mana satu perusahaan tunggal mampu melayani seluruh kebutuhan pasar dengan biaya per unit yang jauh lebih murah dan efisien dibandingkan jika ada banyak perusahaan yang bersaing, biasanya karena membutuhkan biaya investasi infrastruktur awal (biaya tetap) yang sangat raksasa.",
        analogy: "Jaringan pipa air PDAM atau kabel transmisi listrik PLN: Tidak masuk akal jika ada 5 perusahaan berbeda menggali jalan raya yang sama untuk menanam 5 pipa air paralel ke rumah Anda. Cukup satu jaringan pipa yang dikelola secara profesional.",
        mechanism: "Kurva biaya rata-rata jangka panjang (LRAC) terus menurun seiring bertambahnya output (skala ekonomis raksasa). Namun, karena tidak ada saingan, negara wajib meregulasi harga/tarifnya agar perusahaan tidak memeras rakyat.",
        formula: "(∂ ATC / ∂ Q) < 0 | pada seluruh rentang permintaan pasar (Subadditivity of Cost)",
        realImpact: "Dasar hukum dari Pasal 33 UUD 1945: Cabang-cabang produksi yang penting bagi negara dan menguasai hajat hidup orang banyak (seperti PLN, KAI, Pertamina) dikuasai oleh negara untuk kemakmuran rakyat.",
        related: ["keseimbangan_ad_as", "pajak_pigouvian"]
    },
    demand_pull_inflation: {
        name: "Inflasi Tarikan Permintaan (Demand-Pull Inflation)",
        category: "Tingkat Harga & Inflasi",
        icon: "🔥",
        simpleDef: "Kenaikan harga-harga umum yang dipicu oleh lonjakan daya beli atau permintaan belanja total masyarakat yang melampaui kemampuan produksi barang di pasar.",
        analogy: "Ibarat 100 orang lapar berebut 10 piring nasi goreng di sebuah warung; siapa yang berani membayar lebih mahal yang akan mendapatkannya.",
        mechanism: "Permintaan Agregat (AD) naik tajam melampaui Output Potensial (Y*) → Terjadi celah inflasi (Inflationary Gap) → Produsen menaikkan harga jual demi menyeimbangkan pasar.",
        formula: "AD > AS → P ↑ | pada kondisi Y ≈ Y*",
        realImpact: "Kerap terjadi di Indonesia menjelang Hari Raya Idul Fitri saat pencairan THR melipatgandakan belanja konsumsi masyarakat secara serentak.",
        related: ["cost_push_inflation", "inflasi_ihk", "output_potensial"]
    },
    cost_push_inflation: {
        name: "Inflasi Dorongan Biaya (Cost-Push Inflation)",
        category: "Tingkat Harga & Inflasi",
        icon: "⚡",
        simpleDef: "Kenaikan harga barang dan jasa yang bersumber dari lonjakan biaya produksi atau terganggunya pasokan bahan baku dasar (seperti energi atau pangan).",
        analogy: "Ibarat tarif bensin naik drastis; supir angkot, pabrik roti, hingga kurir paket terpaksa menaikkan tarif layanan karena biaya operasional membengkak.",
        mechanism: "Biaya input naik → Kurva Penawaran Agregat Jangka Pendek (SRAS) bergeser ke kiri → Harga naik (P naik) sementara output ekonomi riil melambat (Y turun).",
        formula: "Δ Biaya Input → SRAS geser kiri → P ↑, Y ↓",
        realImpact: "Kenaikan harga BBM bersubsidi (Solar & Pertalite) secara historis langsung memicu efek domino kenaikan inflasi IHK di seluruh pelosok Indonesia.",
        related: ["demand_pull_inflation", "stagflasi", "supply_shock_elnino"]
    },
    mpc_konsumsi: {
        name: "Marginal Propensity to Consume (MPC)",
        category: "Perilaku Konsumsi & Rumah Tangga",
        icon: "🛒",
        simpleDef: "Bagian atau proporsi dari setiap tambahan satu rupiah pendapatan yang langsung digunakan oleh rumah tangga untuk berbelanja barang konsumsi.",
        analogy: "Jika Anda mendapat bonus gaji Rp 1.000.000 dan langsung membelanjakan Rp 800.000 untuk kebutuhan bulanan, maka nilai MPC Anda adalah 0,8 (80%).",
        mechanism: "Pendapatan disposabel (Yd) naik → Belanja konsumsi (C) meningkat sebesar MPC * ΔYd → Mendorong perputaran ekonomi sektor riil dan omzet UMKM.",
        formula: "MPC = ΔC / ΔY_d | | MPC + MPS = 1",
        realImpact: "Masyarakat berpenghasilan rendah di Indonesia memiliki MPC mendekati 0,9-1,0. Bantuan sosial tunai (BLT) terbukti langsung menggerakkan pasar lokal karena hampir 100% langsung dibelanjakan.",
        related: ["multiplier_effect", "paradox_of_thrift", "daya_beli"]
    },
    distorsi_pasar: {
        name: "Distorsi Pasar & Spekulasi Penimbunan",
        category: "Mekanisme Pasar & Harga",
        icon: "📦",
        simpleDef: "Penyimpangan kondisi pasar dari mekanisme persaingan sehat yang memicu ketidakefisienan, kelangkaan buatan, dan lonjakan harga yang merugikan konsumen.",
        analogy: "Ibarat seseorang memborong seluruh payung di satu kota saat hujan badai tiba, lalu menjualnya dengan harga 5 kali lipat kepada orang yang kehujanan.",
        mechanism: "Spekulan menahan pasokan fisik → Pasokan efektif di pasar anjlok tajam → Terjadi kelangkaan semu → Harga meroket jauh di atas biaya produksi wajar.",
        formula: "Q_pasar < Q_keseimbangan → P_pasar >> P_wajar",
        realImpact: "Kerap terjadi pada komoditas pangan pokok dan minyak goreng di Indonesia, yang memicu Satgas Pangan Polri dan Kemendag turun tangan menindak spekulan nakal.",
        related: ["buffer_stock", "monopoli_alami", "eksternalitas_negatif"]
    },
    efek_substitusi: {
        name: "Efek Substitusi Konsumen",
        category: "Perilaku Konsumsi & Rumah Tangga",
        icon: "🍞",
        simpleDef: "Kecenderungan konsumen untuk mengganti barang yang harganya menjadi relatif lebih mahal dengan barang lain yang fungsinya serupa namun berharga lebih terjangkau.",
        analogy: "Ketika harga daging sapi melonjak menjelang lebaran, para ibu rumah tangga beralih membeli daging ayam atau ikan sebagai lauk pengganti yang lebih hemat.",
        mechanism: "Harga barang X naik relatif terhadap Y → Daya tarik marginal per rupiah barang X turun → Konsumen mengalihkan porsi belanjanya ke barang Y → Menstabilkan pengeluaran total.",
        formula: "P_X / P_Y ↑ → Q_X ↓, Q_Y ↑ | (Efek Substitusi Murni)",
        realImpact: "Badan Pangan Nasional memanfaatkan efek substitusi dengan mengampanyekan diversifikasi konsumsi pangan lokal (ubi, jagung, sagu) saat pasokan gandum global terganggu.",
        related: ["barang_inferior", "elastisitas_permintaan", "daya_beli"]
    },
    biaya_logistik: {
        name: "Konektivitas Logistik & Integrasi Pasar",
        category: "Struktur Pasar & Distribusi",
        icon: "🚚",
        simpleDef: "Total ongkos pengangkutan, pergudangan, dan distribusi barang dari produsen ke konsumen yang menentukan seberapa terjangkau dan meratanya harga barang antar-wilayah.",
        analogy: "Ibarat membeli semen Rp 50.000 di Jawa tapi menjadi Rp 150.000 di pedalaman Papua murni karena biaya carter pesawat angkut barang dan bahan bakar.",
        mechanism: "Biaya logistik tinggi menambah beban 'iceberg transport cost' → Harga barang di daerah terpencil melambung → Daya beli masyarakat tertekan dan inflasi regional melebar.",
        formula: "P_konsumen = P_produsen + Biaya Transportasi + Margin Distribusi",
        realImpact: "Program Tol Laut dan pembangunan Jalan Tol Trans-Sumatera di Indonesia ditujukan secara strategis untuk menekan disparitas harga antar-daerah dan mengintegrasikan rantai pasok nasional.",
        related: ["supply_shock_elnino", "kebijakan_penawaran", "belanja_infrastruktur"]
    },
    hukum_engel: {
        name: "Hukum Engel (Engel's Law)",
        category: "Perilaku Konsumsi & Rumah Tangga",
        icon: "⚖️",
        simpleDef: "Hukum ekonomi empiris yang menyatakan bahwa semakin sejahtera suatu keluarga atau bangsa, persentase pengeluarannya untuk membeli makanan pokok justru semakin kecil.",
        analogy: "Keluarga miskin menghabiskan 65% penghasilannya hanya untuk makan nasi dan lauk. Ketika gajinya naik 10 kali lipat, mereka belanja pendidikan, gadget, dan liburan.",
        mechanism: "Kebutuhan perut memiliki batasan biologis fisik → Elastisitas pendapatan untuk makanan < 1 (inelastic) → Pangsa makanan menurun seiring kenaikan PDB per kapita.",
        formula: "Pangsa Pangan = (Belanja Makanan / Total Pengeluaran) ↓ | saat Pendapatan Y ↑",
        realImpact: "BPS mencatat porsi belanja makanan penduduk miskin di Indonesia mencapai >60% pengeluaran. Kenaikan harga beras sekecil apa pun langsung memukul garis kemiskinan nasional.",
        related: ["daya_beli", "barang_inferior", "rasio_gini"]
    },
    tabungan_investasi: {
        name: "Identitas Tabungan & Investasi Makro (S = I)",
        category: "Keseimbangan Agregat",
        icon: "🏘️",
        simpleDef: "Prinsip dasar ekonomi makro bahwa seluruh investasi fisik nasional (pabrik, mesin, infrastruktur) pada akhirnya harus didanai oleh akumulasi tabungan masyarakat dan negara.",
        analogy: "Jika sebuah keluarga ingin membangun rumah baru (investasi), mereka harus menahan belanja jajan hari ini dan menaruh uangnya di celengan atau bank (menabung).",
        mechanism: "Pendapatan Nasional Y = C + I + G. Tabungan Nasional S = Y - C - G. Dalam perekonomian tertutup: S = I. Jika S domestik kurang, negara harus meminjam tabungan asing (Capital Inflow).",
        formula: "S_nasional = S_swasta + S_pemerintah = (Y - T - C) + (T - G) = I + NX",
        realImpact: "Rasio tabungan domestik Indonesia yang berkisar ~32% PDB menuntut pemerintah menjaga iklim investasi agar mampu menarik tabungan asing (FDI) guna membiayai proyek infrastruktur strategis.",
        related: ["pdb_riil", "keseimbangan_ad_as", "neraca_pembayaran"]
    },
    ilusi_uang: {
        name: "Ilusi Uang (Money Illusion)",
        category: "Perilaku Konsumsi & Ekspektasi",
        icon: "⚠️",
        simpleDef: "Kecenderungan psikologis masyarakat untuk melihat kekayaan dari angka nominal uang yang dipegang, bukan dari daya beli riil barang yang bisa dibeli dengan uang tersebut.",
        analogy: "Merasa jauh lebih kaya karena gaji naik 10% dari Rp 5 juta ke Rp 5,5 juta, padahal harga seluruh kebutuhan dapur pada saat yang sama naik 15%. Secara riil, Anda justru bertambah miskin!",
        mechanism: "Individu mengabaikan inflasi (P) saat mengevaluasi nilai upah (W) → Mengambil keputusan konsumsi atau pinjaman berlebih berdasarkan W nominal daripada upah riil W/P.",
        formula: "W_riil = W_nominal / P | | %ΔW_riil ≈ %ΔW - π",
        realImpact: "Konsep yang dicetuskan Irving Fisher ini menjadi alasan mengapa serikat buruh di Indonesia menuntut kenaikan Upah Minimum Provinsi (UMP) selalu memperhitungkan angka inflasi tahunan.",
        related: ["persamaan_fisher", "daya_beli", "inflasi_ihk"]
    },
    barang_inferior: {
        name: "Barang Inferior & Elastisitas Pendapatan",
        category: "Perilaku Konsumsi & Pasar",
        icon: "🥛",
        simpleDef: "Barang yang permintaannya justru meningkat ketika pendapatan riil masyarakat menurun (atau sebaliknya, penjualannya turun saat masyarakat bertambah kaya).",
        analogy: "Ikan asin atau mie instan murah: saat ekonomi sulit dan gaji terpotong, orang makan mie instan lebih sering. Namun saat ekonomi membaik dan gaji melesat, mereka beralih makan steak daging.",
        mechanism: "Elastisitas pendapatan permintaan (Income Elasticity) bernilai negatif (Ei < 0). Konsumen menurunkan standar konsumsi ke opsi paling hemat saat daya beli tertekan.",
        formula: "E_I = %ΔQ / %ΔY < 0 | → | Y ↓ → Q ↑",
        realImpact: "Saat krisis ekonomi melanda, penjualan komoditas pangan murah dan pakaian bekas di pasar tradisional Indonesia melonjak tajam sebagai strategi bertahan hidup rakyat.",
        related: ["hukum_engel", "efek_substitusi", "daya_beli"]
    },
    eksternalitas_negatif: {
        name: "Kegagalan Pasar & Eksternalitas Negatif",
        category: "Ekonomi Publik & Lingkungan",
        icon: "🍎",
        simpleDef: "Biaya atau kerugian yang dialami oleh masyarakat atau pihak ketiga akibat aktivitas produksi/konsumsi pihak lain tanpa adanya kompensasi ganti rugi.",
        analogy: "Pabrik membuang limbah beracun ke sungai desa; pemilik pabrik untung besar, tetapi warga desa menderita penyakit gatal dan kehilangan sumber air bersih.",
        mechanism: "Biaya Sosial Marginal (SMC) melebihi Biaya Privat Marginal (PMC) → Pasar bebas memproduksi barang berbahaya terlalu banyak → Menghasilkan kerugian kesejahteraan (Deadweight Loss).",
        formula: "SMC = PMC + Eksternalitas Negatif | (SMC > PMC)",
        realImpact: "Pemerintah Indonesia menerapkan pajak rokok, cukai plastik, dan pajak emisi PLTU batubara untuk memaksa pelaku industri menanggung biaya sosial yang ditimbulkannya.",
        related: ["pajak_pigouvian", "pajak_karbon", "barang_publik"]
    },
    buffer_stock: {
        name: "Buffer Stock & Stabilisasi Pasokan Pangan",
        category: "Kebijakan Pangan & Stabilisasi",
        icon: "🌾",
        simpleDef: "Penyimpanan cadangan komoditas fisik strategis oleh negara yang dibeli saat panen raya berlimpah dan dilepas ke pasar saat terjadi paceklik untuk menjaga kestabilan harga.",
        analogy: "Ibarat memiliki toren tandon air di atap rumah: diisi penuh saat air PAM mengalir deras di malam hari, dan digunakan saat pasokan PAM mati di siang hari.",
        mechanism: "Pemerintah menyerap gabah petani saat harga anjlok (mencegah kebangkrutan petani), lalu menggelar Operasi Pasar saat harga beras melambung (mencegah inflasi konsumen).",
        formula: "Keseimbangan Pasar: S_total = S_petani + Δ Buffer Stock Pemerintah",
        realImpact: "Perum Bulog di Indonesia mengelola Cadangan Beras Pemerintah (CBP) minimal 1,5 - 2 juta ton guna memastikan keamanan pasokan beras dan menstabilkan gejolak harga pangan nasional.",
        related: ["cadangan_beras_pemerintah", "distorsi_pasar", "inflasi_ihk"]
    },
    indeks_keyakinan_konsumen: {
        name: "Indeks Keyakinan Konsumen (IKK)",
        category: "Indikator Utama & Ekspektasi",
        icon: "📊",
        simpleDef: "Survei bulanan yang mengukur seberapa optimis atau pesimis masyarakat terhadap kondisi ekonomi saat ini dan prospek lapangan kerja 6 bulan ke depan.",
        analogy: "Ibarat barometer cuaca ekonomi: jika jarum menunjukkan cuaca cerah, orang berani merencanakan belanja barang baru. Jika mendung tebal, orang memilih menahan uang di rumah.",
        mechanism: "IKK > 100 menunjukkan zona optimis. Konsumen yang optimis cenderung melonggarkan dompet untuk belanja barang tahan lama (mobil, rumah), mendongkrak pertumbuhan PDB.",
        formula: "IKK = ((Indeks Kondisi Saat Ini (IKE) + Indeks Ekspektasi Konsumen (IEK)) / 2) | (>100 = Optimis)",
        realImpact: "Bank Indonesia merilis data IKK setiap bulan sebagai indikator terdepan (leading indicator) untuk memprediksi arah konsumsi rumah tangga pada kuartal berjalan.",
        related: ["mpc_konsumsi", "pdb_riil", "transmisi_moneter"]
    },
    barang_publik: {
        name: "Barang Publik (Non-Rival & Non-Excludable)",
        category: "Ekonomi Publik & Fiskal",
        icon: "🏛️",
        simpleDef: "Barang atau layanan yang dapat dinikmati bersama oleh seluruh warga negara tanpa mengurangi manfaat bagi orang lain dan mustahil mengecualikan orang yang tidak membayar.",
        analogy: "Mercusuar di tengah lautan atau lampu penerangan jalan: setiap kapal di laut bebas melihat cahayanya tanpa mengurangi terang lampu bagi kapal lain, dan mustahil ditarik karcis.",
        mechanism: "Sektor swasta enggan memproduksi barang publik karena adanya fenomena penumpang gratis (Free Rider Problem) → Mengharuskan pemerintah mendanainya melalui pungutan pajak.",
        formula: "Ciri Barang Publik: Non-Rivalry (MC=0) | & | Non-Excludability",
        realImpact: "Pertahanan negara TNI, penegakan hukum kepolisian, dan pembangunan jaringan jalan arteri nasional di Indonesia didanai 100% dari APBN sebagai penyediaan barang publik.",
        related: ["eksternalitas_negatif", "belanja_infrastruktur", "kedaulatan_fiskal"]
    },
    elastisitas_permintaan: {
        name: "Elastisitas Harga Permintaan Inelastis",
        category: "Struktur Pasar & Harga",
        icon: "📈",
        simpleDef: "Derajat kepekaan jumlah barang yang dibeli konsumen terhadap perubahan harga, di mana persentase perubahan jumlah beli jauh lebih kecil daripada persentase kenaikan harga.",
        analogy: "Jika harga beras atau obat jantung naik 30%, orang tidak bisa serta merta memotong konsumsi makannya 30%; mereka tetap harus membeli beras demi bertahan hidup.",
        mechanism: "Nilai mutlak elastisitas |Ed| < 1. Ketiadaan barang pengganti yang sempurna membuat produsen dapat menaikkan harga tanpa takut kehilangan banyak pembeli.",
        formula: "Ed = %ΔQ / %ΔP | |Ed| < 1 → Inelastis Sempurna / Parsial",
        realImpact: "Beras, listrik, dan BBM memiliki permintaan inelastis di Indonesia. Kenaikan tarif komoditas ini langsung memicu gejolak sosial sehingga harganya diatur dan disubsidi oleh pemerintah.",
        related: ["inflasi_ihk", "daya_beli", "hukum_engel"]
    },
    sektor_informal: {
        name: "Sektor Informal sebagai Bantalan Sosial (Safety Net)",
        category: "Ketenagakerjaan & Struktur Ekonomi",
        icon: "🏪",
        simpleDef: "Kegiatan usaha rakyat berskala mikro yang tidak berbadan hukum resmi (seperti pedagang kaki lima, warung kelontong, ojek) yang menyerap mayoritas angkatan kerja nasional.",
        analogy: "Ibarat spons busa penyerap air: saat terjadi badai PHK di pabrik-pabrik besar, para pekerja langsung membuka usaha gorengan atau warung kopi keliling agar dapur tetap ngebul.",
        mechanism: "Hambatan masuk rendah dan fleksibilitas upah tinggi membuat sektor informal mampu mencegah lonjakan drastis angka pengangguran terbuka saat terjadi resesi.",
        formula: "Tingkat Pengangguran Terbuka Rendah ⇔ Pangsa Tenaga Kerja Informal Tinggi (~55-60%)",
        realImpact: "BPS mencatat lebih dari 59% tenaga kerja Indonesia (~84 juta orang) bekerja di sektor informal, menjadikannya pahlawan penopang stabilitas sosial politik bangsa.",
        related: ["hukum_okun", "umkm_ketahanan", "daya_beli"]
    },
    menu_costs: {
        name: "Biaya Menu (Menu Costs) & Kekakuan Harga",
        category: "Teori Keynesian Baru",
        icon: "💡",
        simpleDef: "Biaya riil yang harus dikeluarkan perusahaan untuk mengubah harga jual produknya (seperti mencetak ulang buku menu, memperbarui sistem kasir, atau risiko komplain pelanggan).",
        analogy: "Pemilik restoran tidak mengganti harga di buku menu mewahnya setiap hari hanya karena harga cabai naik Rp 500 per ons, karena biaya cetak buku menu baru jauh lebih mahal.",
        mechanism: "Biaya menu menciptakan kekakuan harga (Price Stickiness) jangka pendek → Harga tidak bergerak seketika menyesuaikan guncangan moneter → Output riil berfluktuasi.",
        formula: "Harga disesuaikan HANYA JIKA: Δ Laba Tambahan > Menu Costs",
        realImpact: "Kekakuan harga ini menjelaskan mengapa penurunan BI-Rate membutuhkan waktu berbulan-bulan (outside lag) sebelum akhirnya dirasakan oleh konsumen di toko eceran.",
        related: ["transmisi_moneter", "keseimbangan_ad_as", "inflasi_ihk"]
    },
    supply_shock_elnino: {
        name: "Guncangan Penawaran Pertanian & Anomali El Nino",
        category: "Siklus Bisnis & Ketahanan Pangan",
        icon: "🌧️",
        simpleDef: "Peristiwa alam berupa kekeringan berkepanjangan akibat pemanasan suhu permukaan laut Pasifik yang memicu gagal panen masal dan memangkas produksi pangan nasional.",
        analogy: "Ibarat sawah petani mendadak retak-retak kekeringan selama berbulan-bulan; tanaman padi mati sebelum berbuah sehingga hasil panen anjlok separuh.",
        mechanism: "Guncangan pasokan negatif menggeser kurva Penawaran Agregat (AS) ke kiri → Terjadi kelangkaan pangan fisik → Memicu lonjakan inflasi pangan bergejolak (Volatile Foods).",
        formula: "El Nino → Y_pangan ↓ → P_beras ↑ → Inflasi Volatile Foods ↑",
        realImpact: "El Nino kuat tahun 2023-2024 memundurkan musim panen raya Indonesia hingga 2 bulan dan mendongkrak harga gabah kering panen (GKP) ke level tertinggi dalam sejarah.",
        related: ["buffer_stock", "cadangan_beras_pemerintah", "cost_push_inflation"]
    },
    kebijakan_penawaran: {
        name: "Kebijakan Sisi Penawaran (Supply-Side Policy)",
        category: "Kebijakan Pertumbuhan Struktural",
        icon: "🌾",
        simpleDef: "Kebijakan pemerintah yang difokuskan untuk meningkatkan efisiensi produksi, produktivitas kerja, dan kapasitas output fisik perekonomian secara berkelanjutan.",
        analogy: "Bukan dengan membagi-bagikan uang jajan kepada anak, melainkan dengan membelikannya buku pelajaran dan vitamin agar ia bertambah pintar dan sehat dalam jangka panjang.",
        mechanism: "Deregulasi, insentif riset, pembangunan irigasi, dan subsidi benih unggul menggeser kurva Penawaran Agregat Jangka Panjang (LRAS) ke kanan → Output naik tanpa memicu inflasi.",
        formula: "Supply-Side Reform → LRAS geser kanan → Y* ↑ & P ↓",
        realImpact: "Subsidi pupuk, pompanisasi sawah tadah hujan, dan pembangunan bendungan raksasa di Indonesia adalah wujud nyata kebijakan sisi penawaran di sektor pangan.",
        related: ["belanja_infrastruktur", "output_potensial", "human_capital"]
    },
    inklusi_keuangan: {
        name: "Inklusi Keuangan & Intermediasi Perbankan",
        category: "Sistem Finansial & Perbankan",
        icon: "🏦",
        simpleDef: "Kondisi di mana seluruh lapisan masyarakat memiliki akses terhadap produk dan layanan keuangan formal yang terjangkau, aman, dan tepat guna.",
        analogy: "Daripada menyimpan uang arisan di bawah bantal kasur yang rawan dicuri tikus, warga desa kini memiliki rekening bank digital di ponselnya yang berbunga dan dijamin LPS.",
        mechanism: "Mengubah 'dead capital' menjadi dana pihak ketiga (DPK) di perbankan → Bank menyalurkan kredit produktif ke UMKM → Melipatgandakan perputaran uang dan output nasional.",
        formula: "Rasio Inklusi Keuangan = (Penduduk Dewasa Memiliki Rekening / Total Penduduk Dewasa) × 100%",
        realImpact: "Program Agen BRILink dan pembayaran QRIS berhasil mendongkrak indeks inklusi keuangan Indonesia melampaui 88%, menggerakkan likuiditas hingga ke pelosok pelosok desa.",
        related: ["teori_kuantitas_uang", "gwm", "transmisi_moneter"]
    },
    kesejahteraan_sosial: {
        name: "Keseimbangan Makro & Kesejahteraan Rakyat",
        category: "Tujuan Akhir Kebijakan Ekonomi",
        icon: "👑",
        simpleDef: "Tujuan pamungkas dari seluruh teori dan instrumen ekonomi makro: memastikan pertumbuhan ekonomi yang adil, stabil, menyerap tenaga kerja, dan menuntaskan kemiskinan.",
        analogy: "Ibarat merawat kesehatan tubuh manusia seutuhnya: tekanan darah normal (inflasi stabil), otot kuat bertenaga (pertumbuhan PDB), dan makanan bergizi merata ke seluruh sel tubuh (keadilan sosial).",
        mechanism: "Sinergi bauran kebijakan fiskal, moneter, dan struktural menciptakan stabilitas harga, iklim investasi sehat, perluasan lapangan kerja, dan jaring pengaman bagi yang rentan.",
        formula: "max W = f(PDB Riil, Stabilitas Harga, Penyerapan Kerja, 1 - Gini)",
        realImpact: "Amanat Pasal 33 UUD 1945: Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan untuk sebesar-besar kemakmuran dan kesejahteraan rakyat.",
        related: ["rasio_gini", "pdb_riil", "teknokrat_den"]
    },
    forward_guidance: {
        name: "Panduan Kebijakan Masa Depan (Forward Guidance)",
        category: "Komunikasi Moneter & Ekspektasi",
        icon: "🧭",
        simpleDef: "Komunikasi resmi bank sentral mengenai arah dan proyeksi suku bunga serta kebijakan moneter di masa depan guna membentuk ekspektasi pasar keuangan.",
        analogy: "Ibarat kapten kapal yang mengumumkan kepada penumpang bahwa kapal akan melaju tenang selama 2 jam ke depan sebelum berbelok ke pelabuhan, agar penumpang tidak panik.",
        mechanism: "Transparansi bank sentral mengurangi ketidakpastian pasar → Menurunkan premi risiko suku bunga jangka panjang → Memperkuat transmisi moneter.",
        formula: "i_t+k^e = E_t[i_t+k mid Forward Guidance]",
        realImpact: "Bank Indonesia menggunakan Pernyataan RDG Bulanan untuk memberikan sinyal stance moneter (pre-emptive & forward-looking) kepada pelaku pasar valas dan perbankan.",
        related: ["bi_rate", "jangkar_inflasi", "transmisi_moneter"]
    },
    transmisi_kredit: {
        name: "Jalur Kredit Perbankan (Bank Lending Channel)",
        category: "Transmisi Moneter",
        icon: "💳",
        simpleDef: "Mekanisme transmisi moneter di mana perubahan likuiditas dan suku bunga acuan bank sentral memengaruhi kemauan dan kemampuan bank umum dalam mengucurkan kredit.",
        analogy: "Jika pasokan air dari PDAM (bank sentral) melimpah dan murah, perusahaan air isi ulang (bank umum) dapat menjual galon air lebih banyak dan murah ke warga.",
        mechanism: "BI-Rate turun / likuiditas dilonggarkan → Dana Pihak Ketiga (DPK) bertambah & biaya dana turun → Bank lebih berani menyalurkan kredit investasi dan modal kerja.",
        formula: "ΔLikuiditas Bank → ΔPenyaluran Kredit (Lending) → ΔI, ΔC",
        realImpact: "BI memonitor pertumbuhan kredit perbankan nasional (target 10-12% per tahun) sebagai indikator efektivitas intermediasi perbankan menopang PDB.",
        related: ["transmisi_moneter", "gwm", "car_perbankan"]
    },
    makroprudensial_ltv: {
        name: "Rasio Pinjaman terhadap Nilai Agunan (Loan-to-Value / LTV)",
        category: "Kebijakan Makroprudensial",
        icon: "🏡",
        simpleDef: "Batas maksimal persentase kredit properti atau kendaraan bermotor yang boleh dibiayai oleh bank dibandingkan dengan nilai total harga aset agunan.",
        analogy: "Jika Anda membeli rumah seharga Rp 1 miliar dengan aturan LTV maksimal 80%, bank hanya boleh meminjamkan Rp 800 juta, dan Anda wajib membayar DP Rp 200 juta tunai.",
        mechanism: "Pengetatan LTV meredam spekulasi pembelian properti berlebih (mencegah bubble properti); pelonggaran LTV (LTV 100% / DP 0%) mendorong sektor properti saat lesu.",
        formula: "LTV = (Plafon Kredit / Nilai Taksasi Agunan) × 100%",
        realImpact: "Bank Indonesia menerapkan kebijakan pelonggaran rasio LTV/FTV hingga 100% (DP 0%) untuk rumah berwawasan lingkungan dan menggerakkan sektor perumahan pasca-pandemi.",
        related: ["kebijakan_makroprudensial", "stabilitas_sistem_keuangan", "kontrasiklikal_makroprudensial"]
    },
    pengetatan_kuantitatif: {
        name: "Pengetatan Kuantitatif (Quantitative Tightening / QT)",
        category: "Kebijakan Moneter Lanjutan",
        icon: "📉",
        simpleDef: "Langkah bank sentral menyusutkan neraca keuangannya dengan tidak memperpanjang atau menjual kembali obligasi pemerintah yang dimilikinya guna menyerap likuiditas masal.",
        analogy: "Ibarat menguras kelebihan air di dalam kolam renang setelah sebelumnya menyemprotkan air besar-besaran (Quantitative Easing) saat kemarau.",
        mechanism: "Bank sentral menjual obligasi ke pasar → Likuiditas kas perbankan terserap ke bank sentral → Suku bunga jangka panjang naik dan pertumbuhan uang melambat.",
        formula: "ΔNeraca Bank Sentral < 0 → ΔUang Primer (M0) < 0",
        realImpact: "Langkah Quantitative Tightening (QT) oleh Federal Reserve AS sejak 2022 menyedot likuiditas dolar global dan memicu tekanan depresiasi pada mata uang negara berkembang termasuk Rupiah.",
        related: ["transmisi_moneter", "bi_rate", "taper_tantrum"]
    },
    taylor_rule: {
        name: "Aturan Suku Bunga Taylor (Taylor Rule)",
        category: "Formula Moneter",
        icon: "📐",
        simpleDef: "Formula matematis yang memandu bank sentral menentukan suku bunga acuan ideal berdasarkan selisih inflasi terhadap target dan selisih output PDB terhadap potensinya.",
        analogy: "Ibarat thermostat pintar pada AC ruangan: jika suhu lebih panas dari target atau orang di ruangan terlalu banyak, pendingin bekerja lebih kuat secara otomatis.",
        mechanism: "Jika inflasi melampaui target atau ekonomi terlalu panas (output gap positif), formula menuntut kenaikan suku bunga nominal lebih dari 1-ke-1 (Taylor Principle).",
        formula: "i_t = r^* + π_t + 0.5(π_t - π^*) + 0.5(y_t - y^*)",
        realImpact: "Para ekonom Bank Indonesia menggunakan Taylor Rule sebagai salah satu model acuan benchmarking dalam Rapat Dewan Gubernur (RDG) sebelum memutuskan BI-Rate.",
        related: ["bi_rate", "output_potensial", "itf"]
    },
    transmisi_nilai_tukar: {
        name: "Jalur Nilai Tukar Transmisi Moneter",
        category: "Transmisi Moneter & Valas",
        icon: "💱",
        simpleDef: "Saluran bagaimana perubahan suku bunga bank sentral memengaruhi arus modal valas, nilai tukar mata uang, dan pada akhirnya harga barang impor serta ekspor netto.",
        analogy: "Kenaikan suku bunga deposito di Indonesia menarik bule memarkir dolarnya di bank lokal; mereka menukar dolar ke rupiah sehingga rupiah menjadi perkasa.",
        mechanism: "BI-Rate naik → Selisih imbal hasil memikat capital inflow → Rupiah menguat → Harga barang impor turun (menekan imported inflation) namun ekspor menjadi lebih mahal.",
        formula: "i ↑ → Capital Inflow → E (Rupiah) ↑ → P_impor ↓, NX ↓",
        realImpact: "Kenaikan BI-Rate seringkali diambil bukan semata meredam inflasi domestik, melainkan untuk menjaga kestabilan nilai tukar Rupiah dari ancaman pelemahan global.",
        related: ["kurs_valas", "imported_inflation", "trilema_mundell_fleming"]
    },
    jangkar_inflasi: {
        name: "Jangkar Ekspektasi Inflasi (Anchoring Expectations)",
        category: "Komunikasi Moneter & Kredibilitas",
        icon: "⚓",
        simpleDef: "Kondisi di mana masyarakat dan pelaku bisnis sangat percaya pada target bank sentral sehingga tidak panik menaikkan harga atau upah secara liar saat ada guncangan sementara.",
        analogy: "Ibarat jangkar kapal yang kokoh menancap di dasar karang: meski ada ombak laut besar menggoyang kapal, posisinya tidak bergeser jauh terbawa arus.",
        mechanism: "Kredibilitas bank sentral tinggi → Ekspektasi inflasi jangka panjang tetap terkunci pada target (misal 2,5%) → Menghilangkan spiral upah-harga dan menstabilkan inflasi riil.",
        formula: "E_t[π_t+1] = π^* | (Ekspektasi Inflasi Terjangkar Penuh)",
        realImpact: "Keberhasilan Bank Indonesia menurunkan rentang target inflasi dari 5% ke kisaran 2,5% ± 1% mencerminkan semakin kuatnya jangkar kredibilitas moneter nasional.",
        related: ["itf", "forward_guidance", "wage_price_spiral"]
    },
    uang_primer: {
        name: "Uang Primer / Basis Moneter (M0)",
        category: "Agregat Moneter & Neraca BI",
        icon: "🪙",
        simpleDef: "Total uang kartal yang dipegang masyarakat dan kas bank ditambah saldo giro wajib perbankan yang tersimpan di rekening bank sentral.",
        analogy: "Ibarat bibit benih tanaman: dari segenggam benih uang primer M0, sistem perbankan komersial dapat melipatgandakannya menjadi pohon rimbun uang giral M1 dan M2.",
        mechanism: "Bank umum menerima simpanan M0, menyisihkan cadangan wajib (GWM), lalu meminjamkan sisanya ke debitur → Terjadi proses penciptaan uang giral berganda (Money Multiplier).",
        formula: "M0 = C + R | M1 = M0 × mm | (mm = Money Multiplier)",
        realImpact: "Operasi Pasar Terbuka Bank Indonesia mengontrol kuantitas uang primer M0 untuk menjaga kecukupan likuiditas sistem keuangan tanpa memicu ekses inflasi.",
        related: ["teori_kuantitas_uang", "gwm", "bi_rate"]
    },
    beban_bunga_perbankan: {
        name: "Margin Bunga Bersih (Net Interest Margin / NIM)",
        category: "Stabilitas Perbankan & Intermediasi",
        icon: "🏦",
        simpleDef: "Selisih antara pendapatan bunga yang diterima bank dari kredit debitur dikurangi beban bunga yang harus dibayarkan bank kepada nasabah penyimpan dana deposito.",
        analogy: "Ibarat margin keuntungan pedagang grosir: membeli beras dari petani seharga Rp 10.000 per kg dan menjualnya ke toko ritel seharga Rp 14.000 per kg.",
        mechanism: "Suku bunga acuan naik → Beban bunga simpanan naik lebih cepat daripada bunga kredit → Margin bank tertekan jika bank tidak mampu meneruskan kenaikan bunga ke debitur.",
        formula: "NIM = (Pendapatan Bunga Bersih / (Total Rata-rata Aset Produktif)) × 100%",
        realImpact: "Industri perbankan Indonesia secara historis memiliki NIM yang relatif tinggi (~4,5% - 5%), memberikan bantalan laba yang tebal namun kerap disorot otoritas agar efisiensi kredit ditingkatkan.",
        related: ["transmisi_moneter", "car_perbankan", "transmisi_kredit"]
    },
    pasar_repo: {
        name: "Transaksi Repo (Repurchase Agreement)",
        category: "Pasar Uang & Operasi Moneter",
        icon: "🔄",
        simpleDef: "Transaksi penjualan surat berharga (seperti SBN) dengan perjanjian pasti untuk membeli kembali pada tanggal dan harga yang telah disepakati di masa depan.",
        analogy: "Ibarat menggadaikan sertifikat emas ke sahabat untuk meminjam uang tunai seminggu, dengan janji menebus kembali sertifikat tersebut ditambah sedikit uang kopi.",
        mechanism: "Bank yang butuh likuiditas harian merepokan SBN miliknya ke Bank Indonesia atau bank lain → Mendapatkan likuiditas tunai instan dengan jaminan kolateral aset bebas risiko.",
        formula: "Repo Rate = ((P_beli kembali - P_jual awal) / P_jual awal) × (360 / Tenor (hari))",
        realImpact: "Pasar Repo SBN antar-bank dan Reverse Repo BI merupakan instrumen utama pendalaman pasar keuangan di Indonesia guna menyalurkan likuiditas jangka pendek secara efisien.",
        related: ["transmisi_moneter", "sbn", "gwm"]
    },
    kontrasiklikal_makroprudensial: {
        name: "Penyangga Modal Kontrasiklikal (Countercyclical Capital Buffer / CCyB)",
        category: "Kebijakan Makroprudensial",
        icon: "🛡️",
        simpleDef: "Kewajiban tambahan modal yang harus disisihkan bank saat ekonomi sedang melesat (booming kredit), yang boleh dicairkan dan dipakai saat ekonomi terpuruk dalam krisis.",
        analogy: "Ibarat menabung cadangan lemak saat musim panen berlimpah agar tubuh memiliki cadangan energi saat musim dingin paceklik melanda.",
        mechanism: "Saat pertumbuhan kredit berlebih (credit boom) → BI menaikkan rasio CCyB (misal 0,5% - 2,5%) → Mengerem nafsu kredit bank; saat krisis → CCyB dilonggarkan ke 0% agar bank tetap bisa menyalurkan kredit.",
        formula: "Penyangga Tambahan: 0% ≤ CCyB ≤ 2.5% × Aset Tertimbang Menurut Risiko (ATMR)",
        realImpact: "Bank Indonesia mempertahankan CCyB pada level 0% pasca-pandemi untuk memberi keleluasaan penuh bagi perbankan menyalurkan kredit pemulihan ekonomi nasional.",
        related: ["car_perbankan", "makroprudensial_ltv", "stress_test"]
    },
    cbdc_rupiah_digital: {
        name: "Rupiah Digital (Central Bank Digital Currency / CBDC)",
        category: "Inovasi Moneter & Pembayaran",
        icon: "💻",
        simpleDef: "Uang rupiah resmi berbentuk digital yang diterbitkan langsung oleh Bank Indonesia dan menjadi kewajiban moneter sah bank sentral (berbeda dari uang elektronik komersial).",
        analogy: "Sama persis seperti uang kertas pecahan Rp 100.000 bergambar Soekarno-Hatta di dompet Anda, namun wujud fisiknya berupa kode kriptografis unik resmi dari negara.",
        mechanism: "CBDC mengintegrasikan sistem pembayaran wholesale dan ritel berbasis distributed ledger / blockchain → Meningkatkan efisiensi settlement, menekan biaya cetak uang, dan mempercepat inklusi.",
        formula: "Total Basis Moneter = Uang Kartal Fisik + Giro Bank di BI + Rupiah Digital",
        realImpact: "Bank Indonesia meluncurkan Proyek Garuda (Whitepaper Rupiah Digital) untuk menegakkan kedaulatan moneter nasional di era tokenisasi aset dan mata uang kripto global.",
        related: ["teori_kuantitas_uang", "uang_primer", "inklusi_keuangan"]
    },
    kurva_imbal_hasil: {
        name: "Kurva Imbal Hasil Obligasi & Inversi (Yield Curve)",
        category: "Pasar Keuangan & Prediktor Resesi",
        icon: "📈",
        simpleDef: "Grafik yang menghubungkan imbal hasil (yield) obligasi pemerintah dari berbagai jangka waktu jatuh tempo, mulai dari 1 bulan hingga 30 tahun.",
        analogy: "Meminjamkan uang selama 10 tahun sewajarnya meminta bunga lebih tinggi dibanding meminjamkan sebulan. Jika bunga jangka pendek justru lebih mahal daripada jangka panjang, pasar sedang mencium bahaya.",
        mechanism: "Kurva terbalik (Inverted Yield Curve) terjadi ketika yield obligasi tenor pendek > tenor panjang → Sinyal historis paling akurat bahwa investor memprediksi resesi dan pemangkasan suku bunga.",
        formula: "Spread Imbal Hasil = Y_10Y - Y_2Y | (<0 → Inversi Kurva)",
        realImpact: "Kementerian Keuangan dan BI memantau kurva imbal hasil Surat Berharga Negara (SBN) 10 tahun sebagai tolok ukur biaya utang negara dan persepsi risiko pasar modal.",
        related: ["sbn", "crowding_out", "transmisi_moneter"]
    },
    moral_suasion: {
        name: "Himbauan Moral (Moral Suasion)",
        category: "Instrumen Kebijakan Moneter",
        icon: "🗣️",
        simpleDef: "Pendekatan persuasif informal oleh bank sentral melalui pidato, pertemuan tertutup, atau arahan etis kepada pimpinan bank umum agar sejalan dengan arah kebijakan pemerintah.",
        analogy: "Ibarat teguran halus orang tua kepada anak-anaknya di meja makan tanpa harus menggunakan hukuman fisik atau mencabut uang saku.",
        mechanism: "Otoritas menyampaikan arahan (misalnya meminta bank menahan kenaikan suku bunga kredit mikro) → Mengandalkan reputasi dan kepatuhan perbankan tanpa perlu merilis peraturan formal baru.",
        formula: "Kepatuhan Sektor Perbankan = f(Kredibilitas Otoritas, Sanksi Reputasi)",
        realImpact: "Gubernur Bank Indonesia rutin menggelar pertemuan makan siang dengan para Direktur Utama bank besar tanah air untuk menghimbau penyaluran kredit ke sektor hijau dan hilirisasi.",
        related: ["bi_rate", "forward_guidance", "kebijakan_makroprudensial"]
    },
    kebijakan_makroprudensial: {
        name: "Kebijakan Makroprudensial & Rasio Intermediasi (RIM)",
        category: "Kebijakan Makroprudensial",
        icon: "⚖️",
        simpleDef: "Kebijakan yang dirancang khusus untuk membatasi risiko sistemik dan mencegah krisis keuangan meluas di seluruh sistem perbankan secara terpadu.",
        analogy: "Jika mikroprudensial memeriksa kesehatan satu per satu pohon di hutan, makroprudensial menjaga agar seluruh hutan tidak terbakar secara serempak.",
        mechanism: "Mengatur indikator perbankan seperti Rasio Intermediasi Makroprudensial (RIM target 84-94%) agar bank tidak terlalu pelit menyalurkan kredit dan tidak pula terlalu ugal-ugalan.",
        formula: "RIM = ((Kredit + Surat Berharga Korporasi) / (Dana Pihak Ketiga (DPK) + Surat Berharga yang Diterbitkan)) × 100%",
        realImpact: "Pasca-krisis 2008, Bank Indonesia memfokuskan mandat makroprudensial, sementara pengawasan kesehatan mikro individual bank diserahkan kepada OJK.",
        related: ["makroprudensial_ltv", "kssk", "stabilitas_sistem_keuangan"]
    },
    independensi_bank_sentral: {
        name: "Independensi Bank Sentral & Kredibilitas Moneter",
        category: "Kelembagaan Moneter",
        icon: "🏛️",
        simpleDef: "Kemandirian bank sentral dari campur tangan politik pemerintah atau pihak lain dalam menetapkan dan melaksanakan kebijakan moneternya.",
        analogy: "Ibarat wasit sepak bola yang tidak boleh disuap atau diperintah oleh pemilik klub yang sedang bertanding di lapangan hijau.",
        mechanism: "Mencegah fenomena Political Business Cycle (politisi tergoda mencetak uang/memangkas bunga sebelum pemilu demi popularitas semu) → Menjaga inflasi rendah jangka panjang.",
        formula: "Indeks Independensi Tinggi ⇔ Rata-rata Inflasi Jangka Panjang Rendah",
        realImpact: "UU No. 23/1999 dan UU No. 4/2023 (UU P2SK) menegaskan status Bank Indonesia sebagai lembaga negara yang independen dan bebas dari campur tangan pemerintah.",
        related: ["itf", "transmisi_moneter", "kssk"]
    },
    transmisi_aset: {
        name: "Jalur Harga Aset Transmisi Moneter",
        category: "Transmisi Moneter",
        icon: "📈",
        simpleDef: "Saluran bagaimana perubahan suku bunga acuan memengaruhi harga saham, obligasi, dan real estat, yang kemudian mengubah kekayaan bersih masyarakat (Wealth Effect).",
        analogy: "Suku bunga bank turun drastis; orang kaya memindahkan uangnya ke bursa saham dan properti, membuat harga saham melonjak dan mereka merasa bertambah kaya untuk belanja barang mewah.",
        mechanism: "BI-Rate turun → Imbal hasil deposito turun → Investor memburu saham & obligasi → Harga aset naik → Kekayaan rumah tangga naik (Wealth Effect) & Tobin's q perusahaan naik → Investasi terstimulasi.",
        formula: "Tobin's q = (Nilai Pasar Perusahaan / Biaya Penggantian Modal Fisik) | (q > 1 → Investasi Pabrik Baru Untung)",
        realImpact: "Pelonggaran moneter BI mendorong IHSG bursa saham mencetak rekor baru, membuka peluang bagi emiten industri untuk menghimpun modal rights issue dan ekspansi fisik.",
        related: ["transmisi_moneter", "crowding_out", "pdb_riil"]
    },
    fasilitas_simpanan_bi: {
        name: "Fasilitas Simpanan Bank Indonesia (Deposit Facility)",
        category: "Operasi Pasar Uang",
        icon: "🏦",
        simpleDef: "Fasilitas penempatan dana berlebih perbankan di Bank Indonesia dengan tenor overnight untuk membentuk batas bawah (floor) koridor suku bunga pasar uang.",
        analogy: "Ibarat celengan darurat harian di brankas BI: jika bank kelebihan uang kas sore hari dan tidak ada bank lain yang mau meminjam, bank bisa menaruhnya di BI dan mendapat bunga pasti.",
        mechanism: "Deposit Facility (DF Rate) disetel di bawah BI-Rate (misal -75 bps) → Menjamin suku bunga pasar uang antar-bank tidak pernah jatuh di bawah batas dasar tersebut.",
        formula: "Koridor Suku Bunga: DF Rate ≤ IndONIA ≤ Lending Facility Rate",
        realImpact: "Operasi harian BI memastikan suku bunga overnight pasar uang IndONIA bergerak rapat di sekitar BI-Rate dengan batas bawah FasBI/Deposit Facility.",
        related: ["bi_rate", "gwm", "transmisi_moneter"]
    },
    seigniorage: {
        name: "Hak Emisi & Keuntungan Seigniorage",
        category: "Keuangan Bank Sentral",
        icon: "💵",
        simpleDef: "Keuntungan finansial yang diperoleh otoritas penerbit uang dari selisih antara nilai nominal uang yang dicetak dengan biaya fisik pencetakan dan distribusinya.",
        analogy: "Mencetak selembar uang kertas Rp 100.000 hanya butuh biaya kertas dan tinta khusus sebesar Rp 1.500; selisih Rp 98.500 itulah keuntungan seigniorage bagi kas negara.",
        mechanism: "Bank sentral mengedarkan uang kartal baru dan membeli aset berbunga (seperti SBN) → Menghasilkan surplus penerimaan yang disetorkan ke kas negara sebagai dividen.",
        formula: "Seigniorage = ΔM × P / M | atau | Nilai Nominal - Biaya Produksi Fisik",
        realImpact: "Bank Indonesia menyetorkan sebagian sisa surplus anggarannya ke kas negara APBN setiap tahun setelah memenuhi cadangan tujuan sesuai amanat undang-undang.",
        related: ["teori_kuantitas_uang", "uang_primer", "apbn_defisit"]
    },
    shadow_banking: {
        name: "Sistem Perbankan Bayangan (Shadow Banking)",
        category: "Sistem Keuangan & Risiko Sistemik",
        icon: "👥",
        simpleDef: "Lembaga perantara keuangan non-bank yang menjalankan aktivitas mirip bank (menghimpun dana dan memberi pinjaman) namun tidak tunduk pada regulasi perbankan ketat.",
        analogy: "Ibarat taksi gelap tanpa izin trayek dan tanpa uji kelaikan rem: tarifnya fleksibel dan cepat, namun risikonya sangat fatal jika terjadi kecelakaan.",
        mechanism: "Entitas non-bank (seperti fintech lending ilegal, hedge funds, reksadana pasar uang tertentu) melakukan transformasi likuiditas tanpa memiliki jaminan LPS atau akses dana darurat BI.",
        formula: "Risiko Sistemik = f(Ukuran Shadow Banking, Tingkat Leverage, Interkonektivitas)",
        realImpact: "OJK dan Satgas PASTI memperketat pengawasan fintech P2P lending dan koperasi simpan pinjam ilegal di Indonesia agar tidak memicu kegagalan bayar berantai di masyarakat.",
        related: ["stabilitas_sistem_keuangan", "kssk", "lps"]
    },
    intervensi_sterilisasi: {
        name: "Intervensi Sterilisasi Valas Pasar Uang",
        category: "Operasi Valas & Moneter",
        icon: "🛡️",
        simpleDef: "Operasi moneter di mana bank sentral membeli atau menjual valuta asing untuk menstabilkan kurs, lalu secara bersamaan menyerap atau menyuntik likuiditas rupiah agar inflasi tidak terganggu.",
        analogy: "Ibarat menyedot keluar air kotor dari bak mandi dan seketika mengisi ulang dengan air bersih dalam volume yang persis sama agar tinggi air di bak tidak berubah.",
        mechanism: "BI menjual Dolar AS untuk menahan depresiasi Rupiah (Rupiah terserap) → BI menyuntikkan kembali Rupiah lewat reverse repo agar pasar uang tidak kekeringan likuiditas.",
        formula: "ΔCadangan Devisa + ΔAset Domestik Bersih = 0 → ΔM0 = 0",
        realImpact: "BI secara rutin melakukan sterilisasi pasar uang agar intervensi menjaga kurs Rupiah tidak mengacaukan target suku bunga acuan dan pertumbuhan uang beredar di dalam negeri.",
        related: ["kurs_valas", "cadangan_devisa", "trilema_mundell_fleming"]
    },
    stabilitas_sistem_keuangan: {
        name: "Arsitektur Stabilitas Sistem Keuangan (SSK)",
        category: "Ketahanan Sistemik Nasional",
        icon: "🏛️",
        simpleDef: "Kondisi di mana seluruh sistem keuangan (pasar modal, perbankan, asuransi, dan sistem pembayaran) berfungsi efektif mengalokasikan dana dan tahan terhadap guncangan berat.",
        analogy: "Ibarat sistem kekebalan tubuh (antibodi): ketika virus penyakit (guncangan ekonomi global) menyerang, tubuh tidak langsung kolaps melainkan mampu bertahan dan pulih cepat.",
        mechanism: "Sinergi empat pilar KSSK (Kemenkeu, BI, OJK, LPS) memitigasi transmisi krisis keuangan merembet ke sektor riil dan mengamankan tabungan rakyat.",
        formula: "SSK Terjaga ⇔ Risiko Sistemik Terkendali & Fungsi Intermediasi Berjalan Normal",
        realImpact: "Pengesahan UU Pengembangan dan Penguatan Sektor Keuangan (UU P2SK No. 4/2023) menjadi tonggak pembaharuan arsitektur stabilitas sistem keuangan modern Indonesia.",
        related: ["kssk", "lps", "lender_of_last_resort"]
    },
    dana_alokasi_khusus: {
        name: "Transfer ke Daerah (TKD) & Dana Alokasi Khusus (DAK)",
        category: "Hubungan Keuangan Pusat & Daerah",
        icon: "🏛️",
        simpleDef: "Alokasi anggaran APBN dari pemerintah pusat yang disalurkan kepada pemerintah daerah khusus untuk mendanai kegiatan fisik prioritas nasional (seperti puskesmas dan jalan daerah).",
        analogy: "Ibarat orang tua memberikan uang saku bersyarat kepada anaknya: uang ini HANYA boleh dipakai untuk membeli buku pelajaran dan kacamata minus, tidak boleh untuk jajan es krim.",
        mechanism: "Desentralisasi fiskal mempercepat pemerataan pembangunan antar-daerah dan mempersempit ketimpangan infrastruktur antara pulau Jawa dan luar Jawa.",
        formula: "TKD = DAU + DAK Fisik/Non-Fisik + DBH + Dana Desa + Dana Otonomi Khusus",
        realImpact: "Porsi Transfer ke Daerah (TKD) mencapai lebih dari sepertiga belanja APBN (~Rp 850 triliun per tahun), menjadikannya urat nadi pembangunan di 500+ kabupaten/kota se-Indonesia.",
        related: ["pajak_daerah", "fiskal_kontrasiklikal", "kedaulatan_fiskal"]
    },
    anggaran_kesehatan: {
        name: "Alokasi Anggaran Kesehatan & JKN",
        category: "Kebijakan Fiskal Sosial",
        icon: "🏥",
        simpleDef: "Alokasi belanja APBN untuk pembiayaan fasilitas kesehatan, penurunan stunting gizi, pengadaan vaksin, dan pembayaran iuran BPJS Kesehatan bagi masyarakat miskin.",
        analogy: "Membayar asuransi kesehatan dan menyediakan kotak P3K lengkap di rumah agar saat ada anggota keluarga yang jatuh sakit parah, tabungan keluarga tidak ludes bangkrut.",
        mechanism: "Masyarakat yang sehat memiliki produktivitas kerja lebih tinggi (human capital) dan terlindung dari risiko jatuh miskin akibat biaya pengobatan darurat (catastrophic health expenditure).",
        formula: "PBI JKN = Subsidi Iuran Kas Negara × 96.8 Juta Jiwa Warga Miskin",
        realImpact: "Pemerintah Indonesia mengalokasikan anggaran kesehatan APBN untuk Penerima Bantuan Iuran (PBI) BPJS Kesehatan sehingga puluhan juta rakyat miskin berobat gratis di rumah sakit.",
        related: ["human_capital", "kemiskinan_stunting", "belanja_bansos"]
    },
    rasio_utang_negara: {
        name: "Batas Rasio Utang Negara 60% PDB",
        category: "Keberlanjutan Fiskal",
        icon: "📜",
        simpleDef: "Batas aman maksimal jumlah akumulasi utang pemerintah dibandingkan dengan nilai Produk Domestik Bruto tahunan sebagaimana diatur dalam UU Keuangan Negara No. 17/2003.",
        analogy: "Jika total omzet toko Anda Rp 100 juta setahun, total pinjaman bank yang Anda tanggung tidak boleh melebihi Rp 60 juta agar Anda tidak terjerat gagal bayar bunga pinjaman.",
        mechanism: "Menjaga rasio utang di bawah 60% PDB (standar Maastricht Treaty) membatasi risiko krisis utang dan membangun kepercayaan lembaga pemeringkat kredit global.",
        formula: "Debt-to-GDP Ratio = (Total Utang Pemerintah / PDB Nominal) × 100% | ( ≤ 60%)",
        realImpact: "Rasio utang pemerintah Indonesia konsisten terjaga aman di kisaran 38-39% PDB, jauh lebih sehat dibanding rata-rata negara maju (AS >120%, Jepang >260%).",
        related: ["apbn_defisit", "defisit_apbn", "debt_sustainability"]
    },
    anggaran_berimbang: {
        name: "Teorema Multiplier Anggaran Berimbang",
        category: "Teori Makroekonomi Fiskal",
        icon: "⚖️",
        simpleDef: "Teorema Keynesian yang membuktikan bahwa jika pemerintah menaikkan belanja (G) dan menaikkan pajak (T) dalam jumlah persis sama, output PDB tetap bertambah sebesar kenaikan belanja tersebut.",
        analogy: "Pemerintah memungut pajak Rp 100 dari orang kaya yang tadinya hanya akan membelanjakan Rp 80 (karena Rp 20 ditabung), lalu pemerintah membelanjakan seluruh Rp 100 untuk membangun jembatan.",
        mechanism: "Angka pengganda belanja (+1 / (1-MPC)) lebih besar daripada angka pengganda pajak (-MPC / (1-MPC)) → Multiplier bersih anggaran berimbang persis sama dengan satu (Multiplier = 1).",
        formula: "ΔY = ( (1 / (1 - MPC)) ) ΔG - ( (MPC / (1 - MPC)) ) ΔT = ΔG | (jika ΔG = ΔT)",
        realImpact: "Bahkan tanpa menambah utang baru atau defisit, redistribusi anggaran dari tabungan mengendap ke belanja produktif riil tetap mampu menstimulasi ekonomi nasional.",
        related: ["multiplier_effect", "fiskal_kontrasiklikal", "apbn_defisit"]
    },
    dana_abadi: {
        name: "Sovereign Wealth Fund & Dana Abadi (LPDP & INA)",
        category: "Manajemen Aset Negara",
        icon: "💎",
        simpleDef: "Kumpulan modal investasi negara yang pokok dananya diabadikan dan tidak boleh berkurang, di mana hasil imbal hasil investasinya dipakai mendanai beasiswa dan proyek strategis jangka panjang.",
        analogy: "Ibarat pohon emas yang tidak boleh ditebang; yang dipetik dan dibagikan hanyalah buah-buah emas yang tumbuh setiap musim semi.",
        mechanism: "Menghindarkan pemborosan rejeki nomplok komoditas (windfall profit) saat harga minyak/batu bara tinggi, mengamankan kesejahteraan lintas-generasi anak cucu bangsa.",
        formula: "Dana Abadi_t = Dana Abadi_t-1 + Akumulasi Hasil Kelolaan Bersih - Penyaluran Manfaat",
        realImpact: "Indonesia memiliki LPDP dengan dana kelolaan abadi >Rp 140 triliun yang menyekolahkan puluhan ribu putra-putri bangsa ke kampus terbaik dunia, serta INA (Indonesia Investment Authority).",
        related: ["human_capital", "sal_apbn", "kedaulatan_fiskal"]
    },
    pembelian_sbn_bi: {
        name: "Pembelian SBN oleh BI di Pasar Perdana (Kondisi Krisis)",
        category: "Koordinasi Fiskal-Moneter",
        icon: "🤝",
        simpleDef: "Kewenangan luar biasa di mana Bank Indonesia diizinkan membeli Surat Berharga Negara langsung dari Kementerian Keuangan saat terjadi krisis darurat nasional yang mengancam stabilitas.",
        analogy: "Dalam situasi perang atau pandemi darurat ketika pasar modal umum panik membeku, kasir BI langsung menalangi pembelian surat utang pemerintah agar gaji dokter dan bansos rakyat tertolong.",
        mechanism: "Menghindarkan lonjakan imbal hasil (yield) SBN yang bisa membangkrutkan kas negara → Menjamin ketersediaan likuiditas fiskal darurat tanpa perantara spekulan pasar.",
        formula: "Pasar Perdana: Kemenkeu Terbitkan SBN → BI Beli Langsung → Dana Mengalir ke Belanja Darurat",
        realImpact: "Diterapkan melalui skema 'Burden Sharing' dalam UU No. 2/2020 selama pandemi Covid-19, dan kini dipermanenkan dengan batasan ketat dalam UU P2SK No. 4/2023.",
        related: ["burden_sharing", "relaksasi_defisit", "sbn"]
    },
    kurva_laffer: {
        name: "Kurva Laffer (Laffer Curve)",
        category: "Teori Perpajakan Sisi Penawaran",
        icon: "📉",
        simpleDef: "Kurva ekonomi yang menggambarkan hubungan antara tarif pajak dengan total penerimaan kas negara, yang membuktikan bahwa menaikkan tarif pajak terlalu tinggi justru menurunkan total setoran pajak.",
        analogy: "Jika Anda mengenakan tiket masuk warung Rp 1.000, orang ramai datang; jika dinaikkan jadi Rp 100.000, orang malas datang dan memilih makan di rumah, sehingga omzet tiket Anda anjlok jadi nol.",
        mechanism: "Tarif pajak yang mencekik mematikan gairah usaha dan mendorong penggelapan pajak (tax evasion) → Basis pajak menyusut drastis melampaui kenaikan persentase tarifnya.",
        formula: "Penerimaan Pajak T = t × B(t) | ∃ t^* di mana dT / dt = 0",
        realImpact: "Mendasari kehati-hatian pemerintah Indonesia dalam menaikkan tarif PPN atau PPh Badan, agar kepatuhan sukarela tetap terjaga dan dunia usaha tidak gulung tikar.",
        related: ["tax_ratio", "core_tax", "kepatuhan_pajak"]
    },
    fiskal_ruang_gerak: {
        name: "Ruang Fiskal (Fiscal Space)",
        category: "Kapasitas Anggaran Negara",
        icon: "🚀",
        simpleDef: "Keluasan ruang manuver dalam APBN yang tersedia bagi pemerintah untuk mendanai program-program prioritas baru tanpa membahayakan keberlanjutan utang dan stabilitas ekonomi.",
        analogy: "Ibarat sisa gaji bulanan Anda setelah dipotong cicilan KPR rumah, uang sekolah anak, dan beras dapur: sisa dana bebas inilah yang bisa dipakai untuk kursus baru atau renovasi rumah.",
        mechanism: "Penerimaan pajak naik dan belanja subsidi boros dipangkas → Porsi belanja diskresioner membesar → Pemerintah leluasa meluncurkan program hilirisasi dan perlindungan sosial.",
        formula: "Fiscal Space = Total Pendapatan Negara - Belanja Mengikat (Mandatory Spending) - Cicilan Bunga Utang",
        realImpact: "Pemerintah Indonesia memperluas fiscal space melalui reformasi subsidi energi dan integrasi sistem pajak Core Tax agar mampu membiayai program Makan Bergizi Gratis dan IKN.",
        related: ["belanja_mengikat", "tax_ratio", "subsidi_tepat_sasaran"]
    },
    belanja_mengikat: {
        name: "Belanja Wajib / Mengikat (Mandatory Spending)",
        category: "Struktur Anggaran APBN",
        icon: "🔒",
        simpleDef: "Pengeluaran negara yang besaran minimal persentasenya telah diwajibkan secara kaku oleh undang-undang atau konstitusi, sehingga tidak bisa dialihkan sembarangan oleh pemerintah.",
        analogy: "Kewajiban membayar tagihan listrik PLN dan kontrakan rumah setiap tanggal 1: suka atau tidak suka, dana tersebut wajib disisihkan terlebih dahulu sebelum belanja hal lain.",
        mechanism: "Mengamankan sektor strategis jangka panjang dari pemotongan politis jangka pendek, namun di sisi lain mengurangi fleksibilitas manuver anggaran APBN saat terjadi krisis darurat.",
        formula: "Mandatory Spending Target: Pendidikan ≥ 20% APBN (UUD 1945)",
        realImpact: "Kewajiban alokasi anggaran pendidikan minimal 20% APBN (~Rp 665 triliun) mengunci sepertiga ruang belanja pemerintah pusat untuk gaji guru, BOS, dan beasiswa.",
        related: ["human_capital", "fiskal_ruang_gerak", "anggaran_kesehatan"]
    },
    efisiensi_birokrasi: {
        name: "Reformasi Belanja Pegawai & Efisiensi Birokrasi",
        category: "Kualitas Belanja Negara",
        icon: "✂️",
        simpleDef: "Upaya rasionalisasi dan digitalisasi administrasi birokrasi pemerintahan agar belanja negara tidak habis sia-sia untuk rapat seremonial, dinas fiktif, dan tumpang tindih lembaga.",
        analogy: "Daripada menggaji 10 orang juru ketik mesin manual yang lambat, kantor membeli 1 laptop canggih terintegrasi sehingga 9 orang lainnya dapat dialihkan menjadi pelayan masyarakat di garda depan.",
        mechanism: "Penerapan sistem pemerintahan berbasis elektronik (SPBE) memangkas biaya operasional rutin → Mengalihkan penghematan kas negara ke belanja modal infrastruktur fisik.",
        formula: "Efisiensi = (Output Layanan Publik / Belanja Barang & Pegawai (APBN)) ↑",
        realImpact: "Kemenkeu dan KemenPAN-RB menerapkan moratorium penerimaan pegawai administratif rutin dan memangkas anggaran seminar demi mengoptimalkan belanja modal fisik.",
        related: ["biaya_transaksi_eodb", "core_tax", "fiskal_ruang_gerak"]
    },
    sal_apbn: {
        name: "Saldo Anggaran Lebih (SAL) Kas Negara",
        category: "Likuiditas Perbendaharaan Negara",
        icon: "💰",
        simpleDef: "Akumulasi sisa lebih pembiayaan anggaran (SiLPA) tahun-tahun sebelumnya yang tersimpan aman di rekening kas umum negara sebagai bantalan likuiditas darurat (Shock Absorber).",
        analogy: "Ibarat tabungan cadangan darurat di rekening bank keluarga: jika di pertengahan bulan genteng rumah bocor atau ada musibah sakit, tabungan ini bisa langsung ditarik tanpa perlu meminjam utang ke tetangga.",
        mechanism: "Saat penerimaan pajak melimpah atau belanja kementerian belum terserap penuh → Menghasilkan SAL tebal → Dapat dicairkan sewaktu-waktu untuk menambal lonjakan subsidi atau melunasi utang jatuh tempo.",
        formula: "SAL_t = SAL_t-1 + SiLPA_t - Penggunaan SAL_t",
        realImpact: "Kementerian Keuangan memanfaatkan saldo kas SAL yang mencapai >Rp 400 triliun pasca-lonjakan harga komoditas untuk membiayai belanja darurat tanpa perlu menerbitkan utang SBN baru yang mahal.",
        related: ["fiskal_ruang_gerak", "apbn_defisit", "sbn"]
    },
    pajak_karbon: {
        name: "Pajak Karbon & Nilai Ekonomi Karbon (Carbon Pricing)",
        category: "Fiskal Hijau & Lingkungan",
        icon: "🌱",
        simpleDef: "Pungutan pajak yang dikenakan atas emisi gas rumah kaca (karbon dioksida ekuivalen) yang dihasilkan oleh aktivitas industri dan pembangkit listrik.",
        analogy: "Ibarat membebankan denda kebersihan bagi siapa saja yang membuang sampah sembarangan di taman kota; semakin banyak asap hitam yang Anda buang ke langit, semakin besar Anda harus membayar ke kas negara.",
        mechanism: "Menginternalisasi biaya pencemaran iklim ke dalam neraca keuangan perusahaan (Polluter Pays Principle) → Mendorong pelaku industri beralih ke teknologi energi bersih terbarukan.",
        formula: "Tarif Minimal di Indonesia: Rp 30 per kilogram CO_2e | (UU HPP No. 7/2021)",
        realImpact: "Indonesia meluncurkan Bursa Karbon (IDXCarbon) dan bersiap menerapkan pajak karbon bertahap pada PLTU batubara guna memenuhi komitmen Enhanced NDC menuju Net Zero Emission 2060.",
        related: ["pajak_pigouvian", "just_energy_transition", "eksternalitas_negatif"]
    },
    pembiayaan_kreatif: {
        name: "Pembiayaan Infrastruktur Kreatif Non-Utang",
        category: "Pembiayaan Pembangunan",
        icon: "💡",
        simpleDef: "Strategi penghimpunan dana pembangunan infrastruktur besar dengan menggandeng swasta dan pasar modal tanpa membebani defisit utang langsung di buku APBN.",
        analogy: "Alih-alih menguras tabungan keluarga untuk membangun garasi sewa mobil, Anda mengajak mitra pemodal patungan: mitra yang membangun, dan hasil sewa dibagi bersama selama 10 tahun.",
        mechanism: "Penerapan instrumen seperti Sekuritisasi Aset (KIK-EBA), Hak Pengelolaan Terbatas (Limited Concession Scheme / LCS), dan obligasi daerah menyalurkan likuiditas swasta ke proyek infrastruktur.",
        formula: "Kebutuhan Pembiayaan = APBN + Investasi BUMN + Pembiayaan Kreatif Swasta (PINA/KPBU)",
        realImpact: "Kementerian PPN/Bappenas memfasilitasi skema Pembiayaan Investasi Non-Anggaran Pemerintah (PINA) untuk proyek jalan tol dan bandara agar pembangunan tetap melaju tanpa memperlebar defisit APBN.",
        related: ["skema_kpbu", "belanja_infrastruktur", "kedaulatan_fiskal"]
    },
    kepatuhan_pajak: {
        name: "Kepatuhan Pajak Sukarela (Voluntary Compliance)",
        category: "Administrasi Perpajakan",
        icon: "📋",
        simpleDef: "Kesadaran dan kemauan sukarela para wajib pajak (orang pribadi dan perusahaan) untuk melaporkan seluruh penghasilannya dengan jujur dan menyetor pajaknya tepat waktu sesuai ketentuan.",
        analogy: "Ibarat membayar iuran kebersihan RT secara mandiri dan tepat waktu di awal bulan karena menyadari kebersihan jalan kampung adalah demi kenyamanan bersama seluruh warga.",
        mechanism: "Penyederhanaan regulasi, transparansi penggunaan uang pajak, dan kemudahan aplikasi digital menumbuhkan rasa percaya (trust) masyarakat → Menaikkan tax ratio secara organik.",
        formula: "Tingkat Kepatuhan = (Jumlah SPT Tahunan Disampaikan / Wajib Pajak Wajib SPT) × 100%",
        realImpact: "Ditjen Pajak menjalankan Program Pengungkapan Sukarela (PPS) dan implementasi NIK menjadi NPWP untuk memperluas basis data kepatuhan pajak di seluruh Indonesia.",
        related: ["tax_ratio", "core_tax", "kurva_laffer"]
    },
    belanja_bansos: {
        name: "Bantalan Sosial & Jaring Pengaman Kemiskinan",
        category: "Kebijakan Redistribusi Fiskal",
        icon: "🛡️",
        simpleDef: "Belanja negara dalam bentuk bantuan tunai, sembako pangan, subsidi premi kesehatan, dan beasiswa untuk menjaga daya beli kelompok masyarakat termiskin dari ancaman kemiskinan ekstrem.",
        analogy: "Ibarat jaring pengaman sirkus: saat pemain akrobat terpeleset jatuh dari tali tinggi, jaring di bawah menahan tubuhnya agar tidak membentur lantai semen yang keras.",
        mechanism: "Bansos tunai langsung masuk ke kantong keluarga miskin yang memiliki MPC tinggi → Memastikan asupan kalori terjaga, mencegah gizi buruk, sekaligus menopang konsumsi agregat domestik.",
        formula: "ΔKonsumsi Desil 1-2 ≈ Nilai Transfer Bansos × MPC_miskin | (MPC ≈ 1.0)",
        realImpact: "Alokasi Perlindungan Sosial (Perlinsos) di APBN Indonesia menembus Rp 490 triliun mencakup PKH, Program Sembako, BLT El Nino, dan Program Indonesia Pintar (PIP).",
        related: ["subsidi_tepat_sasaran", "rasio_gini", "mpc_konsumsi"]
    },
    audit_bpk: {
        name: "Pengawasan Anggaran & Opini WTP BPK",
        category: "Akuntabilitas Keuangan Negara",
        icon: "🔍",
        simpleDef: "Pemeriksaan resmi dan independen oleh Badan Pemeriksa Keuangan (BPK) atas laporan pertanggungjawaban APBN guna memastikan kepatuhan hukum, efektivitas, dan bebas dari korupsi.",
        analogy: "Ibarat dokter pemeriksa kesehatan yang memeriksa hasil lab darah dan rontgen tubuh: memastikan tidak ada penyakit tersembunyi atau penyalahgunaan obat di dalam tubuh pasien.",
        mechanism: "Audit eksternal yang ketat meningkatkan transparansi fiskal → Mencegah kebocoran dana negara → Meraih opini Wajar Tanpa Pengecualian (WTP) yang mendongkrak kredibilitas sovereign rating.",
        formula: "Opini Audit: WTP (Terbaik) > WDP > Tidak Wajar (TW) > Menolak Berpendapat (Disclaimer)",
        realImpact: "Pemerintah Pusat berhasil mempertahankan Opini WTP dari BPK atas Laporan Keuangan Pemerintah Pusat (LKPP) selama 8 tahun berturut-turut sebagai bukti kredibilitas tata kelola APBN.",
        related: ["kedaulatan_fiskal", "efisiensi_birokrasi", "sal_apbn"]
    },
    debt_sustainability: {
        name: "Analisis Keberlanjutan Utang (Debt Sustainability)",
        category: "Manajemen Utang Negara",
        icon: "📊",
        simpleDef: "Penilaian apakah suatu negara mampu melunasi seluruh cicilan pokok dan bunga utangnya di masa depan tanpa harus memangkas belanja pokok atau meminta penundaan bayar (restrukturisasi).",
        analogy: "Memastikan kenaikan gaji tahunan Anda selalu lebih besar daripada pertumbuhan bunga cicilan utang, sehingga utang tersebut tidak pernah menjerat leher Anda di masa tua.",
        mechanism: "Syarat keberlanjutan utang: Pertumbuhan ekonomi riil (g) harus lebih tinggi dari tingkat bunga riil obligasi (r), atau negara harus menghasilkan surplus keseimbangan primer.",
        formula: "Δd = (r - g) d - pb | d = Rasio Utang/PDB, pb = Keseimbangan Primer/PDB",
        realImpact: "Kemenkeu secara berkala merilis dokumen Debt Sustainability Analysis (DSA) bekerja sama dengan IMF dan World Bank untuk membuktikan utang Indonesia aman dan berkelanjutan.",
        related: ["rasio_utang_negara", "keseimbangan_primer", "defisit_apbn"]
    },
    belanja_infrastruktur: {
        name: "Multiplier Belanja Infrastruktur Fisik",
        category: "Investasi Publik & Pertumbuhan",
        icon: "🏗️",
        simpleDef: "Alokasi anggaran negara untuk pembangunan jalan tol, jembatan, bandara, pelabuhan, waduk, dan jaringan irigasi yang melipatgandakan kapasitas produksi jangka panjang.",
        analogy: "Membangun jalan aspal mulus dari sawah petani ke kota; truk sayur dapat mengantar hasil panen 5 kali lebih cepat tanpa ada sayur busuk di jalan, membuat petani dan pembeli sama-sama untung.",
        mechanism: "Menciptakan stimulus langsung di sektor konstruksi dalam jangka pendek (Demand Side) dan memangkas biaya logistik serta memicu investasi swasta baru dalam jangka panjang (Supply Side).",
        formula: "Multiplier Fiskal Infrastruktur Jangka Panjang: ΔY / ΔG_infra ≈ 1.5 - 2.0",
        realImpact: "Pembangunan ribuan kilometer jalan tol, puluhan bendungan baru, dan pelabuhan laut di era Presiden Jokowi dan Prabowo dibiayai APBN demi mendongkrak daya saing logistik Indonesia.",
        related: ["multiplier_effect", "biaya_logistik", "kebijakan_penawaran"]
    },
    pajak_daerah: {
        name: "Harmonisasi Pajak Daerah & Retribusi (UU HKPD)",
        category: "Keuangan Daerah",
        icon: "🏢",
        simpleDef: "Penyederhanaan dan penguatan kewenangan pemungutan pajak oleh pemerintah provinsi dan kabupaten/kota (seperti PBB, PKB, BPHTB) untuk meningkatkan Pendapatan Asli Daerah (PAD).",
        analogy: "Pemerintah desa kini diperbolehkan mengelola objek wisata lokal dan memungut retribusi parkirnya sendiri, sehingga kas desa bertambah tanpa harus selalu meminta bantuan pusat.",
        mechanism: "Penyederhanaan jenis retribusi mencegah pungutan liar yang membebani dunia usaha, sekaligus memperkuat porsi bagi hasil pajak (Pajak Kendaraan Bermotor) bagi daerah.",
        formula: "Kemandirian Fiskal Daerah = (Pendapatan Asli Daerah (PAD) / Total Pendapatan APBD) × 100%",
        realImpact: "Diterapkannya UU Hubungan Keuangan antara Pemerintah Pusat dan Pemerintahan Daerah (UU HKPD No. 1/2022) merombak tata kelola perpajakan daerah agar lebih adil dan efisien.",
        related: ["dana_alokasi_khusus", "tax_ratio", "kedaulatan_fiskal"]
    },
    skema_kpbu: {
        name: "Kerjasama Pemerintah dan Badan Usaha (KPBU / PPP)",
        category: "Pembiayaan Pembangunan",
        icon: "🤝",
        simpleDef: "Kemitraan formal antara pemerintah dan investor swasta dalam merancang, mendanai, membangun, dan mengoperasikan proyek infrastruktur publik dengan pembagian risiko yang adil.",
        analogy: "Investor swasta yang merogoh kocek triliunan rupiah untuk mengebor terowongan MRT; setelah beroperasi, swasta mendapat pengembalian dana berkala dari pemerintah (Availability Payment).",
        mechanism: "Pemerintah menyediakan jaminan proyek (lewat PT PII) dan pengadaan lahan; swasta menyediakan modal investasi dan keahlian teknologi konstruksi mutakhir.",
        formula: "Total Biaya Investasi = Ekuitas Swasta + Pinjaman Sindikasi Bank + VGF (Dukungan Kelayakan Pemerintah)",
        realImpact: "Proyek Palapa Ring (tol langit serat optik) dan pembangunan Sistem Penyediaan Air Minum (SPAM) Umbulan di Jawa Timur sukses diwujudkan melalui skema KPBU.",
        related: ["pembiayaan_kreatif", "belanja_infrastruktur", "risiko_kontinjensi"]
    },
    risiko_kontinjensi: {
        name: "Kewajiban Kontinjensi & Penjaminan Negara",
        category: "Manajemen Risiko Fiskal",
        icon: "⚠️",
        simpleDef: "Kewajiban finansial potensial yang baru akan menjadi beban riil kas negara HANYA JIKA peristiwa tertentu di masa depan benar-benar terjadi (misal BUMN infrastruktur gagal bayar utang).",
        analogy: "Ibarat menjadi penjamin kredit (co-signer) bagi adik yang meminjam modal usaha di bank: Anda tidak perlu membayar cicilannya hari ini, kecuali jika adik Anda bangkrut dan angkat tangan.",
        mechanism: "Kemenkeu menghitung batas plafon penjaminan dan membentuk dana cadangan penjaminan agar klaim gagal bayar debitur tidak menjebol pagu defisit APBN berjalan.",
        formula: "Total Beban Kontinjensi = Total Σ (Nilai Penjaminan_i × Probabilitas Gagal Bayar_i)",
        realImpact: "Pemerintah Indonesia melalui PT Penjaminan Infrastruktur Indonesia (PT PII) memberikan penjaminan pemerintah atas proyek strategis nasional seperti Kereta Cepat dan Tol Trans-Sumatera.",
        related: ["skema_kpbu", "rasio_utang_negara", "debt_sustainability"]
    },
    kedaulatan_fiskal: {
        name: "Kedaulatan Fiskal & Kemandirian APBN",
        category: "Ketahanan Fiskal Jangka Panjang",
        icon: "🇮🇩",
        simpleDef: "Kondisi di mana sebuah negara mampu membiayai seluruh roda pemerintahan, pertahanan, dan pembangunan nasionalnya secara mandiri dari penerimaan dalam negeri tanpa didikte pihak asing.",
        analogy: "Ibarat keluarga yang hidup mandiri dari penghasilan keringat sendiri: tidak perlu mengemis belas kasihan utang rentenir dan bebas menentukan cita-cita masa depan anak-anaknya.",
        mechanism: "Kenaikan tax ratio, kepemilikan mayoritas SBN oleh investor domestik, dan surplus keseimbangan primer membebaskan negara dari jebakan utang luar negeri.",
        formula: "Tingkat Kemandirian Fiskal = (Pendapatan Pajak Domestik / Total Belanja Negara) × 100%",
        realImpact: "Indonesia berhasil melunasi seluruh utang pinjaman darurat IMF pasca-krisis 1998, dan kini lebih dari 85% Surat Berharga Negara berdenominasi Rupiah yang dipegang investor domestik.",
        related: ["tax_ratio", "keseimbangan_primer", "kemandirian_fiskal"]
    },
    hilirisasi_komoditas: {
        name: "Hilirisasi Komoditas & Peningkatan Nilai Tambah Ekspor",
        category: "Kebijakan Industri & Ekspor",
        icon: "🏭",
        simpleDef: "Kebijakan mengolah bahan mentah tambang atau perkebunan di dalam negeri menjadi barang setengah jadi atau barang jadi sebelum diekspor ke luar negeri.",
        analogy: "Alih-alih menjual gelondongan kayu jati mentah seharga Rp 1 juta, kayu tersebut diukir di Jepara menjadi meja antik seharga Rp 30 juta sehingga keuntungannya berlipat ganda.",
        mechanism: "Larangan ekspor bijih mentah memaksa pembangunan smelter di dalam negeri → Menghasilkan devisa ekspor berlipat, menyerap tenaga kerja lokal, dan memperkuat neraca dagang.",
        formula: "Nilai Tambah = Harga Jual Produk Olahan (O) - Biaya Bahan Mentah (I) >> 0",
        realImpact: "Hilirisasi nikel Indonesia melipatgandakan nilai ekspor turunan nikel dari US$ 3 miliar pada 2017 menjadi lebih dari US$ 33 miliar pada 2023, mengubah neraca dagang RI menjadi surplus.",
        related: ["larangan_ekspor_mentah", "dutch_disease", "neraca_pembayaran"]
    },
    dhe_sda: {
        name: "Devisa Hasil Ekspor Sumber Daya Alam (DHE SDA)",
        category: "Regulasi Valas & Devisa",
        icon: "💵",
        simpleDef: "Kewajiban hukum bagi para eksportir sektor pertambangan, perkebunan, kehutanan, dan perikanan untuk memasukkan uang devisa dolarnya ke perbankan di dalam negeri.",
        analogy: "Ibarat nelayan yang menangkap ikan di laut kampung halamannya sendiri: hasil penjualan ikannya wajib dibawa pulang ke rumah untuk belanja keluarga, bukan disimpan di bank desa sebelah.",
        mechanism: "Eksportir wajib menempatkan minimal 30% DHE SDA di perbankan domestik selama minimal 3 bulan (PP 36/2023) → Menambah pasokan likuiditas valas di pasar domestik.",
        formula: "Penempatan Wajib DHE ≥ 30% × Nilai Devisa Ekspor | (Tenor Minimal 3 Bulan)",
        realImpact: "Kebijakan DHE SDA Bank Indonesia dan Kemenkeu mempertebal cadangan devisa nasional dan meredam spekulasi dolar di pasar valas valuta asing domestik.",
        related: ["cadangan_devisa", "kurs_valas", "neraca_pembayaran"]
    },
    terms_of_trade: {
        name: "Ketentuan Perdagangan (Terms of Trade / ToT)",
        category: "Ekonomi Internasional",
        icon: "⚖️",
        simpleDef: "Rasio perbandingan antara indeks harga barang yang diekspor suatu negara terhadap indeks harga barang yang diimpor dari luar negeri.",
        analogy: "Berapa ton minyak kelapa sawit yang harus Anda jual ke luar negeri agar bisa membeli 1 unit mobil buatan Jepang: jika harganya makin mahal, Anda butuh menjual lebih sedikit sawit.",
        mechanism: "ToT > 100 menandakan perbaikan (favorable): negara menjadi lebih kaya karena harga ekspornya melambung lebih cepat dibanding harga impor barang modal dan energi.",
        formula: "ToT = P_ekspor / P_impor × 100",
        realImpact: "Lonjakan harga batu bara dan CPO dunia pada 2022 mendongkrak ToT Indonesia ke level rekor, menciptakan rejeki nomplok penerimaan pajak dan surplus neraca berjalan.",
        related: ["komoditas_supercycle", "neraca_pembayaran", "dutch_disease"]
    },
    interest_rate_parity: {
        name: "Paritas Suku Bunga (Interest Rate Parity / IRP)",
        category: "Teori Valas & Keuangan Internasional",
        icon: "💱",
        simpleDef: "Teori keseimbangan pasar keuangan yang menyatakan bahwa selisih suku bunga deposito antara dua negara harus mencerminkan perkiraan perubahan nilai tukar mata uangnya.",
        analogy: "Jika bunga bank di Jakarta 6% dan di New York 5%, keuntungan bunga 1% ekstra di Indonesia akan diimbangi oleh ekspektasi depresiasi Rupiah terhadap Dolar AS sebesar 1%.",
        mechanism: "Peluang arbitrase modal bebas memaksa selisih imbal hasil tertutup (Covered IRP) menyamai premi/diskon kurs forward di pasar valas.",
        formula: "((F - S) / S) ≈ i_domestik - i_asing | (F = Forward Kurs, S = Spot Kurs)",
        realImpact: "Bank Indonesia mempertimbangkan suku bunga The Fed (Fed Funds Rate) dan kondisi IRP dalam menentukan BI-Rate guna mencegah keluarnya modal asing (capital outflow).",
        related: ["kurs_valas", "transmisi_moneter", "dndf"]
    },
    fdi_investasi: {
        name: "Penanaman Modal Asing Langsung (Foreign Direct Investment / FDI)",
        category: "Arus Modal Riil & Investasi",
        icon: "🏗️",
        simpleDef: "Investasi jangka panjang yang ditanamkan oleh investor atau perusahaan multinasional asing dalam bentuk fisik nyata (seperti membangun pabrik, jalan tol, dan instalasi mesin).",
        analogy: "Investor Korea atau Jepang datang ke Cikarang dan membangun pabrik baterai mobil listrik: pabrik dan mesin tersebut menancap permanen di tanah dan tidak bisa kabur dalam semalam.",
        mechanism: "Berbeda dari modal portofolio (hot money), FDI membawa transfer teknologi, menciptakan lapangan kerja permanen, dan memperkokoh struktur Neraca Finansial.",
        formula: "Arus FDI Bersih = Modal Masuk Pembelian Aset Fisik Asing - Divestasi Keluar",
        realImpact: "Kementerian Investasi/BKPM mencatat realisasi PMA di Indonesia konsisten tumbuh >15% per tahun, didominasi oleh industri logam dasar dan hilirisasi kendaraan listrik.",
        related: ["investasi_portofolio", "neraca_pembayaran", "hilirisasi_komoditas"]
    },
    repatriasi_keuntungan: {
        name: "Defisit Pendapatan Primer & Repatriasi Laba Asing",
        category: "Neraca Pembayaran",
        icon: "💸",
        simpleDef: "Aliran keluar devisa valas akibat perusahaan asing di dalam negeri mengirimkan keuntungan dividen dan bunga utangnya kembali ke kantor pusat mereka di luar negeri.",
        analogy: "Toko waralaba asing yang laris manis di mal Jakarta mengirimkan seluruh laba bersihnya di akhir tahun ke rekening pemilik waralaba di Tokyo atau New York.",
        mechanism: "Investasi asing yang besar di masa lalu menghasilkan kewajiban repatriasi dividen secara berkala → Menyebabkan Neraca Pendapatan Primer Indonesia selalu mengalami defisit struktural.",
        formula: "Neraca Pendapatan Primer = Pendapatan WNI di Luar Negeri - Repatriasi Laba/Bunga Asing",
        realImpact: "Setiap kuartal II (musim bagi dividen), tekanan permintaan dolar AS di pasar valas Indonesia meningkat tajam karena banyak korporasi membagikan dividen ke investor asing.",
        related: ["neraca_pembayaran", "fdi_investasi", "cadangan_devisa"]
    },
    currency_swap: {
        name: "Bilateral Currency Swap Arrangement (BCSA)",
        category: "Jaring Pengaman Keuangan Regional",
        icon: "🤝",
        simpleDef: "Perjanjian pertukaran mata uang antara dua bank sentral yang memungkinkan suatu negara meminjam likuiditas valas negara mitra dengan menyerahkan mata uang domestiknya saat darurat.",
        analogy: "Ibarat perjanjian darurat dengan tetangga sebelah rumah: jika mendadak Anda kehabisan uang pecahan dolar untuk belanja obat darurat, Anda bisa menukar rupiah ke dolarnya seketika.",
        mechanism: "Menyediakan bantalan likuiditas valas lapis kedua (Second Line of Defense) tanpa harus menguras cadangan devisa resmi negara di saat terjadi krisis likuiditas global.",
        formula: "Fasilitas BCSA = BI Menyerahkan Rupiah ⇔ Bank Sentral Mitra Menyediakan Valas",
        realImpact: "Bank Indonesia memiliki fasilitas BCSA dengan bank sentral Tiongkok (PBOC), Jepang (BOJ), Korea Selatan (BOK), dan Chiang Mai Initiative Multilateralisation (CMIM).",
        related: ["cadangan_devisa", "kurs_valas", "lcs"]
    },
    remitansi_tki: {
        name: "Remitansi Pekerja Migran & Pendapatan Sekunder",
        category: "Neraca Pembayaran & Devisa",
        icon: "💌",
        simpleDef: "Kiriman uang gaji dalam mata uang asing yang ditransfer oleh para pekerja migran Indonesia (PMI) di luar negeri kepada sanak saudaranya di kampung halaman.",
        analogy: "Uang kiriman bulanan dari seorang ibu yang bekerja di Hong Kong ke rekening keluarganya di Indramayu untuk biaya sekolah anak dan merenovasi rumah.",
        mechanism: "Remitansi valas dicatat sebagai surplus pada Neraca Pendapatan Sekunder (Secondary Income) → Mengalir langsung ke kantong rumah tangga desa dan mempertebal cadangan devisa.",
        formula: "ΔNeraca Pendapatan Sekunder = Remitansi PMI Masuk - Transfer Keluar WNA",
        realImpact: "Pekerja Migran Indonesia dijuluki 'Pahlawan Devisa' karena menyumbang aliran devisa remitansi masif lebih dari US$ 14 miliar (sekitar Rp 220 triliun) setiap tahunnya.",
        related: ["neraca_pembayaran", "cadangan_devisa", "daya_beli"]
    },
    perjanjian_fta: {
        name: "Perjanjian Perdagangan Bebas (FTA & RCEP)",
        category: "Integrasi Ekonomi Regional",
        icon: "🌐",
        simpleDef: "Perjanjian bilateral atau multilateral antar-negara untuk menurunkan atau menghapus tarif bea masuk impor dan hambatan non-tarif guna memperlancar arus barang.",
        analogy: "Membuka pagar pembatas antar-dua ruko toko bertetangga: pelanggan bebas berlalu lalang belanja ke kedua toko tanpa harus membayar tiket gerbang parkir berulang kali.",
        mechanism: "Menurunkan tarif bea masuk mendekati 0% → Membuka akses pasar ekspor bagi produk manufaktur nasional, namun menuntut industri domestik meningkatkan daya saingnya.",
        formula: "Tarif Bea Masuk → 0% → Trade Creation > Trade Diversion",
        realImpact: "Indonesia meratifikasi Regional Comprehensive Economic Partnership (RCEP) yang merupakan blok perdagangan bebas terbesar di dunia yang mencakup 30% populasi dan PDB global.",
        related: ["terms_of_trade", "global_value_chains", "neraca_pembayaran"]
    },
    taper_tantrum: {
        name: "Fenomena Taper Tantrum",
        category: "Guncangan Moneter Global",
        icon: "🌪️",
        simpleDef: "Gejolak kepanikan di pasar modal dan valas global yang dipicu oleh sinyal bank sentral AS (The Fed) bahwa mereka akan mulai mengerem pembelian obligasi (tapering).",
        analogy: "Ibarat pesta anak-anak yang gaduh ketika sang tuan rumah tiba-tiba mematikan musik dan mulai membereskan toples permen: anak-anak langsung panik berebut pintu keluar.",
        mechanism: "Sinyal tapering The Fed melesatkan imbal hasil US Treasury → Investor global menarik modalnya dari pasar berkembang (Sudden Stop / Capital Flight) → Kurs mata uang berkembang anjlok.",
        formula: "ΔYield US Treasury ↑ → Capital Outflow dari Emerging Markets → Kurs Depresiasi Tajam",
        realImpact: "Pada peristiwa Taper Tantrum 2013, nilai tukar Rupiah terdepresiasi lebih dari 20%, memaksa Bank Indonesia mengerek BI-Rate ratusan basis poin untuk membendung arus modal kabur.",
        related: ["kurs_valas", "transmisi_moneter", "cadangan_devisa"]
    },
    peringkat_utang: {
        name: "Peringkat Utang Negara (Sovereign Credit Rating)",
        category: "Pasar Modal & Risiko Negara",
        icon: "⭐",
        simpleDef: "Penilaian resmi atas kelayakan kredit dan kemampuan suatu negara melunasi utangnya yang dirilis oleh lembaga pemeringkat internasional (S&P, Moody's, Fitch).",
        analogy: "Ibarat skor BI Checking / SLIK OJK pada individu: orang yang riwayat cicilannya bersih mendapat peringkat A dan bunga pinjaman murah; yang riwayatnya macet ditolak bank.",
        mechanism: "Status Layak Investasi (Investment Grade) menurunkan premi risiko (yield) yang diminta investor saat membeli SBN → Menghemat ratusan triliun beban bunga utang APBN.",
        formula: "Kategori Rating: AAA > AA > A > BBB (Batas Investment Grade) mid BB > B > CCC (Junk Bond)",
        realImpact: "Indonesia mempertahankan peringkat utang BBB (Investment Grade dengan outlook stabil) dari lembaga pemeringkat dunia berkat disiplin fiskal defisit di bawah 3% PDB.",
        related: ["premi_cds", "sbn", "debt_sustainability"]
    },
    premi_cds: {
        name: "Premi Risiko Credit Default Swap (CDS 5-Tahun)",
        category: "Indikator Risiko Keuangan",
        icon: "🛡️",
        simpleDef: "Biaya premi tahunan yang harus dibayar investor untuk mengasuransikan surat utang pemerintah (SBN) suatu negara terhadap risiko gagal bayar (default).",
        analogy: "Ibarat premi asuransi kebakaran rumah: semakin rawan rumah Anda terbakar (semakin gonjang-ganjing kondisi politik negara), semakin mahal premi polis asuransi yang diminta.",
        mechanism: "Angka CDS yang rendah (misal < 80 bps) mencerminkan persepsi pasar bahwa risiko gagal bayar negara sangat kecil → Mendorong masuknya investasi asing.",
        formula: "Spread CDS ∝ Probabilitas Default Negara × (1 - Tingkat Pemulihan Aset)",
        realImpact: "Kemenkeu memantau angka CDS 5-tahun Indonesia sebagai kompas harian sentimen risiko pasar internasional terhadap stabilitas makroekonomi dan politik nasional.",
        related: ["peringkat_utang", "sbn", "kurs_valas"]
    },
    hukum_satu_harga: {
        name: "Hukum Satu Harga & Paritas Daya Beli (PPP)",
        category: "Teori Penentuan Kurs Valas",
        icon: "🍔",
        simpleDef: "Teori ekonomi yang menyatakan bahwa tanpa hambatan dagang dan ongkos kirim, barang yang identik harus dijual dengan harga riil yang sama di seluruh dunia setelah dikonversi ke satu mata uang.",
        analogy: "Ibarat Indeks Big Mac: harga sepotong burger Big Mac di Jakarta jika dikonversi ke Dolar AS sewajarnya setara dengan harga Big Mac di New York.",
        mechanism: "Jika kurs nominal menyimpang jauh dari Paritas Daya Beli (PPP), peluang perdagangan arbitrase barang akan mendorong kurs bergerak kembali ke nilai keseimbangan wajarnya.",
        formula: "e = P_domestik / P_asing | ⇔ | Nilai Tukar Riil ε = e × P^* / P = 1",
        realImpact: "Bank Dunia menggunakan PDB berbasis Keseimbangan Kemampuan Berbelanja (PPP) untuk membandingkan ukuran ekonomi sejati Indonesia yang menempati peringkat 7 terbesar dunia.",
        related: ["kurs_valas", "kurs_reer", "daya_beli"]
    },
    kurs_reer: {
        name: "Real Effective Exchange Rate (Kurs REER)",
        category: "Indikator Daya Saing Valas",
        icon: "📊",
        simpleDef: "Nilai tukar mata uang domestik terhadap sekeranjang mata uang mitra dagang utama yang telah disesuaikan dengan selisih inflasi antar-negara.",
        analogy: "Bukan sekadar membandingkan Rupiah terhadap Dolar AS saja, melainkan mengukur kekuatan daya saing Rupiah terhadap mata uang Tiongkok, Jepang, Uni Eropa, dan Singapura secara serempak.",
        mechanism: "REER di bawah 100 (undervalued) menunjukkan produk ekspor manufaktur Indonesia memiliki daya saing harga yang lebih murah dan kompetitif di pasar global.",
        formula: "REER = Total Π_i=1^N (S_i × P / P_i^*)^(w_i) | (w_i = Bobot Perdagangan Mitra i)",
        realImpact: "Bank Indonesia menghitung indeks REER secara bulanan guna memastikan nilai tukar Rupiah tidak terlalu kemahalan (overvalued) yang dapat mematikan daya saing ekspor produk tekstil dan alas kaki.",
        related: ["kurs_valas", "hukum_satu_harga", "neraca_pembayaran"]
    },
    komoditas_supercycle: {
        name: "Siklus Super Komoditas (Commodity Supercycle)",
        category: "Siklus Perdagangan Global",
        icon: "⛏️",
        simpleDef: "Periode ekspansi jangka panjang (bisa berlangsung lebih dari 1 dekade) di mana harga aneka komoditas mentah dunia bertahan tinggi secara struktural akibat lonjakan permintaan global.",
        analogy: "Ibarat musim panas panjang berlimpah buah-buahan di mana hasil kebun petani selalu laris manis diborong pembeli kota dengan harga mahal tanpa henti bertahun-tahun.",
        mechanism: "Dipicu oleh industrialisasi masif (seperti era kebangkitan Tiongkok tahun 2000-an dan era revolusi transisi energi hijau nikel/tembaga saat ini).",
        formula: "Durasi Siklus: 10 - 20 Tahun (Fase Ekspansi Melampaui Siklus Bisnis Biasa)",
        realImpact: "Indonesia sebagai eksportir utama batu bara, nikel, dan kelapa sawit selalu menikmati lonjakan penerimaan APBN dan surplus perdagangan saat Supercycle komoditas berlangsung.",
        related: ["terms_of_trade", "dutch_disease", "hilirisasi_komoditas"]
    },
    larangan_ekspor_mentah: {
        name: "Larangan Ekspor Bijih Mentah & Kedaulatan Sumber Daya",
        category: "Kebijakan Industri Strategis",
        icon: "🛑",
        simpleDef: "Kebijakan perdagangan luar negeri yang melarang pengapalan bijih mineral mentah (raw minerals) keluar negeri guna memaksa pembangunan industri pengolahan di tanah air.",
        analogy: "Ibarat pabrik gula yang melarang tebu mentah diangkut keluar pabrik; tebu wajib diperas menjadi gula pasir kristal putih di dalam pabrik agar menghasilkan keuntungan maksimal.",
        mechanism: "Meskipun sempat digugat di World Trade Organization (WTO), kebijakan ini berhasil menarik ratusan triliun investasi smelter asing dan melipatgandakan nilai ekspor.",
        formula: "Kebijakan Larangan: Ekspor Bijih Mentah = 0 → Investasi Smelter Masuk → Ekspor Olahan Metal ↑",
        realImpact: "Presiden Jokowi memberlakukan larangan ekspor bijih nikel mentah sejak 1 Januari 2020 (UU Minerba), yang kini diperluas ke komoditas bauksit dan tembaga.",
        related: ["hilirisasi_komoditas", "fdi_investasi", "neraca_pembayaran"]
    },
    devaluasi_kompetitif: {
        name: "Devaluasi Kompetitif (Beggar-Thy-Neighbour)",
        category: "Strategi Perang Mata Uang",
        icon: "📉",
        simpleDef: "Langkah suatu negara yang sengaja melemahkan nilai tukar mata uangnya sendiri agar barang ekspornya menjadi tampak sangat murah di luar negeri dan memukul produsen negara tetangga.",
        analogy: "Ibarat seorang pedagang toko yang sengaja membanting harga jual dagangannya di bawah modal demi merebut seluruh pembeli dari toko tetangga hingga tetangga tersebut bangkrut.",
        mechanism: "Dapat memicu 'Perang Mata Uang' (Currency Wars) di mana negara-negara lain membalas dengan devaluasi serupa, yang akhirnya merusak kestabilan sistem perdagangan dunia.",
        formula: "e ↓ → P_ekspor dalam USD ↓ → NX ↑ | (Memancing Pembalasan Negara Lain)",
        realImpact: "Indonesia menolak praktik manipulasi mata uang dan membiarkan nilai tukar Rupiah bergerak fleksibel sesuai mekanisme pasar berpedoman pada fundamental ekonomi riil.",
        related: ["marshall_lerner", "kurs_valas", "perjanjian_fta"]
    },
    investasi_portofolio: {
        name: "Arus Modal Panas (Hot Money) & Portofolio",
        category: "Arus Modal Finansial",
        icon: "⚡",
        simpleDef: "Investasi asing pada aset-aset keuangan likuid (seperti saham dan obligasi SBN) yang dapat dicairkan dan ditarik keluar negeri dalam hitungan detik saat terjadi kepanikan sentimen.",
        analogy: "Ibarat tamu hotel yang menginap semalam: mereka cepat membawa devisa masuk, namun koper mereka selalu siap berkemas untuk check-out kapan saja ada kegaduhan.",
        mechanism: "Sangat sensitif terhadap selisih suku bunga global dan persepsi risiko; aliran masuk memperkuat rupiah seketika, namun pembalikan arus modal (Sudden Reversal) memicu gejolak kurs.",
        formula: "Arus Portofolio Bersih = Beli Bersih Asing di Saham & SBN - Jual Bersih Asing",
        realImpact: "Bank Indonesia menerbitkan instrumen SRBI dan SVBI untuk mengelola pergerakan modal portofolio agar devisa modal asing betah parkir lebih lama di pasar keuangan domestik.",
        related: ["kurs_valas", "cadangan_devisa", "taper_tantrum"]
    },
    global_value_chains: {
        name: "Rantai Nilai Global (Global Value Chains / GVC)",
        category: "Perdagangan Industri Modern",
        icon: "🔗",
        simpleDef: "Proses produksi barang modern yang dipecah menjadi berbagai tahapan berbeda di berbagai negara di dunia sebelum dirakit menjadi barang utuh siap pakai.",
        analogy: "Sebuah ponsel pintar: layarnya dirancang di California, chip memori dibuat di Taiwan, baterai dirakit di Indonesia, dan casing dirakit di Vietnam.",
        mechanism: "Partisipasi dalam rantai nilai global menuntut efisiensi logistik tinggi dan tarif bea masuk komponen yang rendah agar industri domestik tidak terisolasi dari jaringan produksi dunia.",
        formula: "Partisipasi GVC = ((Kandungan Asing dalam Ekspor + Kandungan Domestik dalam Ekspor Negara Lain) / Total Ekspor)",
        realImpact: "Indonesia berambisi menjadi pemain kunci rantai pasok ekosistem baterai kendaraan listrik (EV) dunia dengan mengintegrasikan tambang nikel, alumina, dan perakitan mobil.",
        related: ["hilirisasi_komoditas", "perjanjian_fta", "resiliensi_rantai_pasok"]
    },
    risk_free_rate: {
        name: "Suku Bunga Bebas Risiko (Risk-Free Rate)",
        category: "Pasar Keuangan Global",
        icon: "📈",
        simpleDef: "Tingkat imbal hasil obligasi pemerintah negara adidaya (US Treasury) yang dianggap memiliki probabilitas gagal bayar 0% dan menjadi patokan dasar biaya modal di seluruh dunia.",
        analogy: "Ibarat patokan ketinggian air laut (permukaan laut nol meter): tinggi semua gunung dan bukit di dunia diukur dari jaraknya di atas permukaan laut tersebut.",
        mechanism: "Jika imbal hasil US Treasury naik dari 2% ke 5% → Seluruh aset keuangan di negara berkembang harus menawarkan bunga jauh lebih tinggi agar investor tidak kabur ke Amerika.",
        formula: "Yield SBN Indonesia = US Treasury Rate (Risk-Free) + Premi Risiko Negara (CDS / Spread)",
        realImpact: "Kenaikan suku bunga US Treasury memaksa Kemenkeu menerbitkan obligasi negara SBN dengan yield yang kompetitif agar tetap laku diborong investor institusi global.",
        related: ["premi_cds", "peringkat_utang", "taper_tantrum"]
    },
    swasembada_pangan: {
        name: "Swasembada Pangan & Kedaulatan Devisa",
        category: "Ketahanan Pangan & Eksternal",
        icon: "🌾",
        simpleDef: "Kemampuan suatu bangsa mencukupi seluruh kebutuhan pangan pokok rakyatnya dari hasil bumi sendiri tanpa bergantung pada impor negara lain.",
        analogy: "Ibarat keluarga yang memiliki kebun sayur, kolam ikan, dan lumbung padi sendiri: saat pasar kota tutup atau jalanan diblokade, seisi rumah tetap kenyang dan tenang.",
        mechanism: "Menghilangkan kebocoran devisa ratusan triliun untuk impor beras, jagung, dan gula → Memperkokoh Neraca Perdagangan dan melindungi rakyat dari inflasi pangan impor dunia.",
        formula: "Tingkat Swasembada (SSR) = (Produksi Domestik / (Produksi Domestik + Impor - Ekspor)) × 100% | ( ≥ 100%)",
        realImpact: "Presiden Prabowo Subianto menetapkan swasembada pangan dalam waktu 4-5 tahun sebagai prioritas tertinggi guna menjamin kedaulatan bangsa dan ketahanan eksternal negara.",
        related: ["cadangan_beras_pemerintah", "buffer_stock", "neraca_pembayaran"]
    },
    utang_valas_swasta: {
        name: "Mitigasi Risiko Utang Valas Swasta Non-Bank",
        category: "Stabilitas Eksternal & Korporasi",
        icon: "🏢",
        simpleDef: "Kewajiban pengawasan dan lindung nilai (hedging) atas pinjaman luar negeri dalam mata uang asing yang ditarik oleh korporasi swasta agar tidak memicu krisis valas.",
        analogy: "Perusahaan berpendapatan rupiah tetapi meminjam utang dolar dalam jumlah masif; saat kurs dolar melonjak dari Rp 10.000 ke Rp 16.000, beban utang membengkak seketika hingga bangkrut.",
        mechanism: "Pemicu utama kedalaman krisis moneter 1998 (Currency Mismatch) → BI menerbitkan PBI yang mewajibkan korporasi swasta non-bank memenuhi Rasio Lindung Nilai dan Rasio Likuiditas Valas.",
        formula: "Rasio Lindung Nilai Wajib ≥ 25% × Selisih Negatif Aset Valas vs Kewajiban Valas Jatuh Tempo 6 Bulan",
        realImpact: "Regulasi ketat utang luar negeri swasta oleh Bank Indonesia berhasil membuat korporasi nasional kebal saat Rupiah bergejolak pasca-pandemi dan krisis geopolitik.",
        related: ["hedging", "currency_mismatch", "krismon_1998"]
    },
    diversifikasi_mitra: {
        name: "Diversifikasi Pasar Ekspor Non-Tradisional",
        category: "Strategi Perdagangan Internasional",
        icon: "🗺️",
        simpleDef: "Strategi memperluas tujuan ekspor ke negara-negara baru di kawasan Timur Tengah, Afrika, Asia Selatan, dan Amerika Latin agar tidak bergantung hanya pada AS dan Tiongkok.",
        analogy: "Jangan menaruh semua telur belanjaan dalam satu keranjang yang sama; jika keranjang itu jatuh (misal ekonomi Tiongkok lesu), telur di keranjang lain (India dan Afrika) tetap utuh.",
        mechanism: "Mengurangi kerentanan neraca perdagangan domestik terhadap resesi ekonomi di negara mitra dagang tradisional tertentu melalui perjanjian dagang preferensial (PTA).",
        formula: "Indeks Diversifikasi Pasar: Penurunan Konsentrasi Ekspor Herfindahl-Hirschman (HHI)",
        realImpact: "Kementerian Perdagangan membuka jalur ekspor baru komoditas sawit, otomotif, dan furnitur ke India, Pakistan, Mesir, dan Afrika Selatan guna mendiversifikasi pasar ekspor RI.",
        related: ["perjanjian_fta", "terms_of_trade", "neraca_pembayaran"]
    },
    ketahanan_eksternal: {
        name: "Benteng Ketahanan Sektor Eksternal Indonesia",
        category: "Ketahanan Ekonomi Terpadu",
        icon: "🛡️",
        simpleDef: "Kombinasi kekuatan cadangan devisa, neraca perdagangan yang surplus, utang luar negeri terkendali, dan bauran instrumen valas yang melindungi kedaulatan ekonomi dari badai global.",
        analogy: "Ibarat kapal samudera berlambung baja tebal dengan sistem navigasi radar canggih: mampu menerjang badai topan gelombang laut global tanpa khawatir oleng karam.",
        mechanism: "Sinergi kebijakan eksternal memastikan pasokan devisa mengalir lancar, stabilitas nilai tukar Rupiah terjaga, dan kewajiban internasional bangsa selalu terbayar terhormat.",
        formula: "Ketahanan Eksternal = f(Kecukupan Cadev, Surplus Neraca Dagang, Rasio ULN Sehat, DHE SDA Kuat)",
        realImpact: "Ketahanan eksternal yang kokoh membuat ekonomi Indonesia tetap tumbuh di atas 5% dan nilai tukar relatif stabil di tengah lonjakan suku bunga The Fed dan eskalasi perang geopolitik.",
        related: ["cadangan_devisa", "kurs_valas", "trilema_mundell_fleming"]
    },
    pandemi_shock: {
        name: "Guncangan Ganda Pandemi Covid-19 (Double Shock)",
        category: "Krisis Luar Biasa & Resesi",
        icon: "🦠",
        simpleDef: "Bencana kesehatan dan kemanusiaan global yang memicu guncangan serentak pada sisi penawaran (pabrik dan toko tutup) dan sisi permintaan (warga berdiam di rumah).",
        analogy: "Ibarat badai dahsyat yang membuat para nelayan dilarang melaut (pasokan nol) dan sekaligus seluruh pasar ikan di darat ditutup (permintaan nol) secara bersamaan.",
        mechanism: "Pembatasan Sosial Berskala Besar (PSBB) melumpuhkan mobilitas fisik → Pertumbuhan PDB Indonesia kuartal II-2020 anjlok ke -5,32% → Menuntut respon stimulus darurat terbesar dalam sejarah.",
        formula: "Double Shock = Supply Shock (AS anjlok) + Demand Shock (AD runtuh)",
        realImpact: "Pemerintah meluncurkan Program Pemulihan Ekonomi Nasional (PEN) senilai hampir Rp 700 triliun per tahun untuk menyelamatkan nyawa, UMKM, dan dunia usaha.",
        related: ["relaksasi_defisit", "burden_sharing", "restrukturisasi_kredit"]
    },
    relaksasi_defisit: {
        name: "Relaksasi Batas Defisit APBN Darurat Pandemi",
        category: "Fiskal Luar Biasa & Hukum",
        icon: "📜",
        simpleDef: "Pelepasan sementara batas kaku defisit APBN 3% PDB selama maksimal 3 tahun (2020-2022) melalui Perppu No. 1/2020 (UU No. 2/2020) guna menyelamatkan keselamatan rakyat.",
        analogy: "Ibarat menerobos lampu merah saat sedang membawa anggota keluarga yang sekarat menuju ruang gawat darurat rumah sakit: nyawa manusia adalah hukum tertinggi (Salus Populi Suprema Lex Esto).",
        mechanism: "Defisit APBN diperlebar hingga 6,14% PDB pada 2020 untuk mendanai vaksin gratis, bansos jumbo, dan insentif pajak, lalu berhasil dikonsolidasikan kembali ke bawah 3% lebih cepat dari target.",
        formula: "Defisit APBN 2020 = 6.14% PDB → Konsolidasi Fiskal 2022: 2.38% PDB (Kembali <3%)",
        realImpact: "Keberhasilan konsolidasi fiskal Indonesia kembali ke batas <3% PDB setahun lebih cepat dari jadwal menuai pujian luas dari IMF, World Bank, dan pasar keuangan internasional.",
        related: ["defisit_apbn", "apbn_defisit", "burden_sharing"]
    },
    burden_sharing: {
        name: "Skema Berbagi Beban (Burden Sharing) BI-Kemenkeu",
        category: "Kerjasama Fiskal-Moneter Luar Biasa",
        icon: "🤝",
        simpleDef: "Kesepakatan bersejarah di mana Bank Indonesia membeli Surat Berharga Negara (SBN) langsung di pasar perdana dan menanggung sebagian beban bunganya demi membiayai belanja kesehatan rakyat.",
        analogy: "Dua saudara kandung menghadapi musibah: sang adik (Kemenkeu) menyiapkan obat dan makanan untuk keluarga, sementara sang kakak (BI) ikut patungan membayar bon tagihannya tanpa memungut bunga.",
        mechanism: "BI menanggung 100% beban bunga untuk belanja public goods (vaksin, rumah sakit darurat) dan menanggung selisih bunga untuk non-public goods (dukungan UMKM) → Meringankan beban utang kas negara.",
        formula: "Beban Bunga Ditanggung BI: Kupon 0% untuk Belanja Public Goods (SKB I, II, & III)",
        realImpact: "Melalui tiga Surat Keputusan Bersama (SKB), BI menyerap ratusan triliun rupiah SBN pemerintah tanpa memicu hiperinflasi berkat penyerapan likuiditas yang terukur.",
        related: ["pembelian_sbn_bi", "relaksasi_defisit", "kssk"]
    },
    wage_price_spiral: {
        name: "Spiral Upah-Harga (Wage-Price Spiral)",
        category: "Dinamika Inflasi Kronis",
        icon: "🔥",
        simpleDef: "Lingkaran setan makroekonomi di mana kenaikan harga barang memicu buruh menuntut kenaikan upah, lalu pengusaha menaikkan harga jual produk lagi untuk menutup biaya upah tersebut.",
        analogy: "Dua anjing yang saling mengejar ekornya sendiri berputar-putar semakin kencang: kenaikan harga mengejar kenaikan gaji, dan kenaikan gaji mengejar harga barang.",
        mechanism: "Ekspektasi inflasi lepas jangkar → Upah nominal naik → Biaya produksi naik → Harga barang melonjak lagi → Inflasi kronis berakar kuat dalam perekonomian.",
        formula: "P ↑ → W_t+1 ↑ → Biaya Produksi ↑ → P_t+2 ↑ | (Spiral Tak Berujung)",
        realImpact: "Pemerintah Indonesia merumuskan formula kenaikan UMP berbasis inflasi + pertumbuhan ekonomi dengan alfa tertentu (PP 51/2023) guna mencegah terjadinya spiral upah-harga.",
        related: ["jangkar_inflasi", "inflasi_ihk", "kurva_phillips"]
    },
    histeresis_pengangguran: {
        name: "Histeresis Pengangguran (Unemployment Hysteresis)",
        category: "Teori Ketenagakerjaan",
        icon: "📉",
        simpleDef: "Kondisi di mana pengangguran yang terjadi akibat resesi sementara justru berubah menjadi permanen karena para pencari kerja kehilangan keterampilan, modal sosial, dan semangat kerja.",
        analogy: "Ibarat mobil yang dibiarkan mogok berbulan-bulan di garasi: mesinnya berkarat, akinya mati, dan bannya kempes, sehingga tidak bisa langsung melaju meski bensin sudah diisi penuh.",
        mechanism: "Pengangguran jangka panjang merusak human capital tenaga kerja → Tingkat pengangguran alamiah (NAIRU) bergeser naik secara permanen walau krisis ekonomi sudah berakhir.",
        formula: "ΔNAIRU > 0 | setelah krisis berkepanjangan (Bekas Luka Resesi / Scarring Effects)",
        realImpact: "Pemerintah meluncurkan Program Kartu Prakerja untuk melakukan upskilling dan reskilling bagi jutaan korban PHK agar terhindar dari jebakan histeresis pengangguran.",
        related: ["nairu", "hukum_okun", "human_capital"]
    },
    sovereign_debt_crisis: {
        name: "Krisis Utang Berdaulat (Sovereign Debt Crisis)",
        category: "Krisis Fiskal & Kebangkrutan Negara",
        icon: "⚠️",
        simpleDef: "Situasi di mana pemerintah suatu negara tidak lagi mampu membayar cicilan bunga dan pokok utang luar negerinya, dan pasar menolak memberikan pinjaman baru.",
        analogy: "Ibarat negara Yunani pada tahun 2010: kas negara kosong melompong, mesin ATM dibatasi penarikannya, dan pemerintah terpaksa memotong dana pensiun dan gaji PNS demi penghematan ekstrem.",
        mechanism: "Defisit anggaran yang ugal-ugalan menumpuk utang hingga >100% PDB → Investor panik dan menuntut bunga selangit → Terjadi krisis solvabilitas dan gagal bayar nasional.",
        formula: "Default Risk → 100% → Yield SBN Meroket → Pemerintah Kehilangan Akses Pasar Keuangan",
        realImpact: "Menjadi pelajaran paling berharga mengapa Indonesia mewajibkan batas defisit APBN maksimal 3% dan rasio utang < 60% PDB dalam UU Keuangan Negara sejak 2003.",
        related: ["rasio_utang_negara", "defisit_apbn", "debt_sustainability"]
    },
    balance_sheet_recession: {
        name: "Resesi Neraca (Balance Sheet Recession) & Gelembung Aset",
        category: "Teori Krisis Richard Koo",
        icon: "🫧",
        simpleDef: "Resesi di mana pelaku usaha dan rumah tangga fokus menggunakan seluruh pemasukannya untuk melunasi tumpukan utang (deleteraging), bukan untuk berbelanja atau meminjam kredit baru.",
        analogy: "Ibarat seseorang yang membeli rumah seharga Rp 1 miliar dengan utang Rp 800 juta, lalu harga rumah tersebut anjlok menjadi Rp 400 juta; seisi keluarga mati-matian berhemat demi mencicil utang lama.",
        mechanism: "Pecahnya gelembung harga aset menghancurkan neraca keuangan swasta → Kebijakan moneter suku bunga nol persen menjadi mandul → Hanya belanja fiskal pemerintah yang bisa menyelamatkan ekonomi.",
        formula: "min Utang (Debt Minimization) >> max Laba (Profit Maximization)",
        realImpact: "Jepang mengalami 'Dekade yang Hilang' (Lost Decades) sejak 1990 akibat resesi neraca, pelajaran yang diantisipasi ketat oleh BI dan OJK agar perbankan tanah air tidak menimbun kredit macet.",
        related: ["perangkap_likuiditas", "krisis_2008", "restrukturisasi_kredit"]
    },
    restrukturisasi_kredit: {
        name: "Restrukturisasi Kredit Darurat Perbankan OJK",
        category: "Kebijakan Penyelamatan Perbankan",
        icon: "🔄",
        simpleDef: "Kelonggaran regulasi yang mengizinkan bank memberikan perpanjangan tenor, penurunan bunga, atau penundaan cicilan pokok bagi debitur yang usahanya terdampak bencana krisis.",
        analogy: "Ibarat dokter yang memasangkan tabung oksigen bantuan pernapasan bagi pasien yang sesak napas; memberi waktu bagi tubuh pasien untuk sembuh tanpa memvonisnya meninggal dunia.",
        mechanism: "POJK No. 11/2020 menetapkan kredit yang direstrukturisasi tetap dinilai lancar (Kolektibilitas 1) → Mencegah lonjakan NPL perbankan dan mencegah kebangkrutan masal jutaan debitur UMKM.",
        formula: "NPL Terjaga Rendah (<3%) ⇔ Plafon Restrukturisasi OJK Menampung Debitur Terdampak",
        realImpact: "Skema restrukturisasi kredit Covid-19 di Indonesia mencapai puncaknya di atas Rp 830 triliun (melibatkan >6 juta debitur), berhasil menyelamatkan sistem perbankan nasional tanpa krisis.",
        related: ["car_perbankan", "umkm_ketahanan", "stabilitas_sistem_keuangan"]
    },
    cadangan_beras_pemerintah: {
        name: "Manajemen Cadangan Beras Pemerintah (CBP)",
        category: "Ketahanan Pangan Strategis",
        icon: "🌾",
        simpleDef: "Stok beras fisik milik negara yang dikuasai dan dikelola oleh Perum Bulog minimal 1,5 hingga 2 juta ton untuk keperluan operasi pasar, tanggap darurat bencana, dan bantuan sosial.",
        analogy: "Ibarat lumbung padi desa adat zaman dahulu: setiap panen disisihkan sebagian untuk disimpan di lumbung bersama agar warga desa tidak kelaparan jika terjadi bencana banjir atau paceklik.",
        mechanism: "Memastikan negara memiliki 'amunisi pangan fisik' langsung di gudang → Mampu mengguyur pasar seketika saat ada lonjakan harga tanpa harus menunggu proses tender impor yang lama.",
        formula: "Stok Akhir Bulog = Stok Awal + Serapan Petani Domestik + Impor Penugasan - Penyaluran SPHP/Bansos ≥ 1.5 Juta Ton",
        realImpact: "Bulog menyalurkan Bantuan Pangan Beras 10 kg kepada 22 juta Keluarga Penerima Manfaat (KPM) secara rutin di Indonesia, terbukti efektif menahan laju kemiskinan saat beras mahal.",
        related: ["buffer_stock", "swasembada_pangan", "ketahanan_pangan"]
    },
    subsidi_energi: {
        name: "Guncangan Minyak Dunia & Subsidi Kompensasi Energi",
        category: "Dilema Fiskal Energi",
        icon: "⚡",
        simpleDef: "Dilema berat APBN ketika harga minyak mentah dunia melonjak tinggi: memilih menambah ratusan triliun belanja subsidi energi atau menaikkan harga BBM eceran yang memicu inflasi rakyat.",
        analogy: "Ibarat kepala keluarga yang melihat tarif token listrik rumahnya naik 3 kali lipat; ia harus memilih memotong jatah uang belanja dapur atau merelakan tabungan ludes untuk membayar listrik.",
        mechanism: "Indonesia adalah net importer minyak → Kenaikan harga ICP (Indonesian Crude Price) dan pelemahan Rupiah otomatis melipatgandakan beban subsidi BBM, LPG, dan listrik di APBN.",
        formula: "ΔICP = +US$ 1/barel → Beban Belanja Subsidi & Kompensasi Energi Naik Triliunan Rupiah",
        realImpact: "Pada tahun 2022 saat perang Ukraina melesatkan minyak ke US$ 120/barel, pagu subsidi dan kompensasi energi APBN melonjak tiga kali lipat hingga menembus rekor Rp 551 triliun.",
        related: ["cost_push_inflation", "subsidi_tepat_sasaran", "fiskal_ruang_gerak"]
    },
    just_energy_transition: {
        name: "Kemitraan Transisi Energi Berkeadilan (JETP)",
        category: "Ekonomi Hijau & Pembiayaan Iklim",
        icon: "🌱",
        simpleDef: "Kerjasama pendanaan iklim bernilai miliaran dolar antara negara donor maju (IPG) dan Indonesia untuk mendanai pemensiunan dini PLTU batubara dan percepatan energi terbarukan.",
        analogy: "Membeli motor listrik baru ramah lingkungan dengan bantuan patungan modal dari komunitas pencinta lingkungan agar Anda tidak lagi mengendarai motor tua berasap pekat.",
        mechanism: "Memadukan hibah, pinjaman lunak, dan investasi ekuitas swasta internasional untuk mendanai infrastruktur transmisi listrik hijau tanpa merugikan pekerja tambang yang terdampak (transisi adil).",
        formula: "Komitmen Pendanaan JETP Indonesia = US$ 20 Miliar (Campuran Hibah, Pinjaman Lunak, & Investasi Swasta)",
        realImpact: "Indonesia merilis dokumen Comprehensive Investment and Policy Plan (CIPP) JETP untuk mempensiunkan dini PLTU Pelabuhan Ratu dan mempercepat porsi bauran EBT nasional.",
        related: ["pajak_karbon", "pajak_pigouvian", "fdi_investasi"]
    },
    deflationary_spiral: {
        name: "Bahaya Spiral Deflasi Kronis (Deflationary Spiral)",
        category: "Patologi Makroekonomi",
        icon: "📉",
        simpleDef: "Jebakan ekonomi berbahaya di mana harga-harga terus menerus turun, menyebabkan konsumen menunda belanja karena menunggu harga lebih murah, yang akhirnya membangkrutkan pabrik.",
        analogy: "Ibarat pembeli yang menahan diri tidak membeli laptop hari ini karena yakin minggu depan harganya diskon lagi; toko sepi pembeli, pemilik toko memecat karyawan, dan ekonomi mati suri.",
        mechanism: "Deflasi berkepanjangan → Tingkat suku bunga riil menjadi sangat tinggi (r = i - π, dengan π negatif) → Beban utang riil membengkak (Debt Deflation) → Memicu gelombang kebangkrutan masal.",
        formula: "π < 0 → r (riil) = i - (-π) = i + |π| >> 0 → C ↓, I ↓",
        realImpact: "Inilah alasan utama bank sentral di seluruh dunia menetapkan target inflasi positif rendah (seperti BI: 2,5% ± 1%), bukan target inflasi nol atau deflasi yang mematikan.",
        related: ["perangkap_likuiditas", "itf", "persamaan_fisher"]
    },
    ketahanan_pangan: {
        name: "Ketahanan Pangan Struktural & Produktivitas Pertanian",
        category: "Transformasi Struktural Pertanian",
        icon: "🛡️",
        simpleDef: "Kondisi terpenuhinya pangan bagi negara sampai dengan perseorangan yang tercermin dari tersedianya pangan yang cukup, aman, bergizi, merata, dan terjangkau secara berkelanjutan.",
        analogy: "Bukan sekadar memiliki beras di dapur untuk makan hari ini, melainkan memastikan sawah irigasi, pabrik pupuk, dan jalan logistik siap menjamin panen beras tetap melimpah 20 tahun ke depan.",
        mechanism: "Meningkatkan produktivitas per hektar (intensifikasi) dan memperluas lahan pertanian baru (ekstensifikasi) guna mengimbangi laju pertumbuhan populasi dan alih fungsi lahan sawah.",
        formula: "Indeks Ketahanan Pangan (IKP) = f(Ketersediaan, Keterjangkauan Harga, Kualitas & Pemanfaatan Gizi)",
        realImpact: "Program Food Estate, cetak sawah baru di Merauke dan Kalimantan Tengah, serta modernisasi alat mesin pertanian (alsintan) digulirkan pemerintah demi kemandirian pangan nasional.",
        related: ["cadangan_beras_pemerintah", "swasembada_pangan", "kebijakan_penawaran"]
    },
    car_perbankan: {
        name: "Rasio Kecukupan Modal Bank (Capital Adequacy Ratio / CAR)",
        category: "Kesehatan & Regulasi Perbankan",
        icon: "🏦",
        simpleDef: "Rasio modal sendiri yang wajib dimiliki bank untuk menyerap potensi kerugian akibat kredit macet atau penurunan nilai aset sebelum dana simpanan nasabah ikut terancam.",
        analogy: "Ibarat bantalan helm pengaman yang tebal bagi pengendara motor: semakin tebal busa helm (semakin tinggi CAR), semakin aman kepala Anda dari benturan saat motor terjatuh.",
        mechanism: "Standar internasional Basel III mewajibkan CAR minimal 8%; modal yang tebal menjamin bank tetap kokoh menyalurkan kredit walau ada debitur besar yang gagal bayar.",
        formula: "CAR = ((Modal Bank (Tier 1 + Tier 2)) / Aset Tertimbang Menurut Risiko (ATMR)) × 100% | ( ≥ 8%)",
        realImpact: "Industri perbankan Indonesia memiliki rasio CAR rata-rata sangat kokoh di atas 26-27%, menjadikannya salah satu sistem perbankan dengan bantalan permodalan terkuat di dunia.",
        related: ["stabilitas_sistem_keuangan", "kontrasiklikal_makroprudensial", "stress_test"]
    },
    umkm_ketahanan: {
        name: "Ketahanan Ekonomi UMKM sebagai Tulang Punggung Bangsa",
        category: "Ekonomi Kerakyatan & Ketahanan",
        icon: "🤝",
        simpleDef: "Daya tahan dan kelenturan jutaan pelaku Usaha Mikro, Kecil, dan Menengah yang menyumbang lebih dari 61% PDB dan menyerap 97% total tenaga kerja di Indonesia.",
        analogy: "Ibarat hutan rumput ilalang: saat badai topan merobohkan pohon-pohon beringin raksasa (konglomerasi sarat utang valas), rumput ilalang UMKM tetap lentur berdiri dan hidup.",
        mechanism: "Mayoritas UMKM menggunakan bahan baku lokal dan tidak memiliki utang valas, sehingga menjadi penyelamat saat krisis 1998 dan motor pemulihan tercepat pasca-pandemi.",
        formula: "Pangsa UMKM: 61% PDB & 97% Tenaga Kerja Nasional",
        realImpact: "Pemerintah mengalokasikan Kredit Usaha Rakyat (KUR) bersubsidi bunga senilai ratusan triliun per tahun untuk mempermudah permodalan jutaan pedagang dan perajin kecil.",
        related: ["sektor_informal", "inklusi_keuangan", "restrukturisasi_kredit"]
    },
    kemiskinan_stunting: {
        name: "Pengentasan Kemiskinan Ekstrem & Penurunan Stunting",
        category: "Pembangunan Manusia & Kesejahteraan",
        icon: "📈",
        simpleDef: "Program prioritas nasional untuk menghapus kemiskinan ekstrem (pendapatan di bawah US$ 2,15 PPP) dan memangkas angka gagal tumbuh balita akibat kekurangan gizi kronis.",
        analogy: "Menyiram dan memupuk bibit pohon jati sejak hari pertama bertunas; anak yang sehat dan cerdas di 1.000 hari pertama kehidupannya akan tumbuh menjadi teknokrat hebat di masa dewasa.",
        mechanism: "Stunting merusak perkembangan kognitif otak anak → Menurunkan kapasitas belajar dan potensi upah masa dewasa → Memperangkap generasi berikutnya dalam kemiskinan antargenerasi.",
        formula: "Target Nasional: Kemiskinan Ekstrem → 0% | & | Prevalensi Stunting < 14%",
        realImpact: "Program Makan Bergizi Gratis bagi anak sekolah dan ibu hamil diluncurkan Presiden Prabowo Subianto sebagai investasi makroekonomi jangka panjang untuk mencetak Generasi Emas 2045.",
        related: ["human_capital", "anggaran_kesehatan", "belanja_bansos"]
    },
    biaya_transaksi_eodb: {
        name: "Reformasi Birokrasi & Kemudahan Berusaha (EoDB)",
        category: "Iklim Usaha & Regulasi",
        icon: "⚖️",
        simpleDef: "Penyederhanaan regulasi dan digitalisasi perizinan usaha untuk memangkas ongkos tidak resmi, pungutan liar, dan waktu tunggu birokrasi (Transaction Costs) bagi para investor.",
        analogy: "Mengurus izin buka warung makan yang dulunya butuh waktu 6 bulan bolak-balik ke 10 kantor dinas berbeda, kini cukup 15 menit melalui aplikasi online di rumah.",
        mechanism: "Biaya transaksi yang rendah mendorong pengusaha informal mendaftarkan izin usaha resmi (formal) → Meningkatkan investasi produktif dan memperluas basis penerimaan pajak.",
        formula: "Biaya Transaksi Turun → Efisiensi Modal Meningkat (ICOR Turun) → Pertumbuhan PDB Melaju",
        realImpact: "Pemberlakuan Online Single Submission (OSS) Berbasis Risiko dan implementasi UU Cipta Kerja ditujukan untuk mendongkrak peringkat Ease of Doing Business (EoDB) Indonesia.",
        related: ["fdi_investasi", "efisiensi_birokrasi", "hukum_okun"]
    },
    dedolarisasi: {
        name: "Diversifikasi Cadangan Devisa & Dedolarisasi Multilateral",
        category: "Arsitektur Moneter Global",
        icon: "🪙",
        simpleDef: "Strategi mengurangi ketergantungan sepihak pada mata uang Dolar Amerika Serikat dalam transaksi perdagangan luar negeri dan portofolio cadangan devisa negara.",
        analogy: "Jika Anda menyimpan seluruh bekal uang perjalanan dalam satu jenis uang koin saja, Anda akan celaka jika toko di kota tujuan menolak koin tersebut; simpanlah beberapa mata uang berbeda.",
        mechanism: "Mengembangkan transaksi Local Currency Settlement (LCS), penerbitan Sukuk global berdenominasi non-USD, dan investasi cadangan emas batangan → Melindungi perekonomian dari sanksi ekstrateritorial.",
        formula: "% Pangsa USD dalam Transaksi Eksternal ↓ ⇔ % Pangsa Yuan, Yen, Won, & Mata Uang Lokal ↑",
        realImpact: "Bank Indonesia membentuk Satgas Nasional Local Currency Transaction (LCT) bekerja sama dengan Malaysia, Thailand, Jepang, Tiongkok, dan Korea Selatan.",
        related: ["lcs", "cadangan_devisa", "kurs_valas"]
    },
    kemandirian_fiskal: {
        name: "Kemandirian Fiskal & Kedaulatan APBN Jangka Panjang",
        category: "Ketahanan Fiskal Jangka Panjang",
        icon: "🏛️",
        simpleDef: "Kapasitas pembiayaan APBN yang bertumpu pada kekuatan penerimaan pajak dan tabungan domestik bangsa sendiri sehingga tidak mudah goyah oleh tekanan geopolitik asing.",
        analogy: "Rumah tangga yang mandiri secara finansial; bebas merencanakan pendidikan anak-anaknya setinggi mungkin tanpa harus tunduk pada syarat dan dikte pinjaman dari orang lain.",
        mechanism: "Kenaikan tax ratio menuju 14-16% PDB dan pendalaman pasar SBN domestik menekan ketergantungan utang luar negeri valas hingga batas minimal.",
        formula: "Rasio Kemandirian = (Penerimaan Perpajakan Domestik / Total Belanja Negara) → 100%",
        realImpact: "Target transformasi fiskal Indonesia Emas 2045 adalah mencapai APBN yang berimbang dan mandiri dengan penerimaan negara yang cukup untuk membiayai seluruh kebutuhan rakyat.",
        related: ["kedaulatan_fiskal", "tax_ratio", "sbn"]
    },
    resiliensi_rantai_pasok: {
        name: "Resiliensi Rantai Pasok Global & Keamanan Industri",
        category: "Ketahanan Industri & Geopolitik",
        icon: "🌐",
        simpleDef: "Kemampuan rantai pasok industri nasional bertahan dan beradaptasi cepat saat terjadi disrupsi pasokan komponen kritis global (seperti chip semikonduktor atau pupuk).",
        analogy: "Pabrik roti yang memiliki pasokan tepung terigu dari 3 pabrik giling berbeda; jika satu pabrik terbakar, produksi roti tetap berjalan lancar dari pasokan pabrik lainnya.",
        mechanism: "Menerapkan strategi 'Nearshoring' dan 'Friendshoring', meningkatkan Tingkat Komponen Dalam Negeri (TKDN), dan memproduksi bahan baku substitusi impor di dalam negeri.",
        formula: "TKDN ≥ 40% → Kekebalan Industri Manufaktur terhadap Disrupsi Global",
        realImpact: "Kementerian Perindustrian mewajibkan sertifikasi TKDN pada proyek-proyek strategis negara guna memastikan belanja pemerintah menumbuhkan ekosistem industri manufaktur dalam negeri.",
        related: ["global_value_chains", "hilirisasi_komoditas", "terms_of_trade"]
    },
    peran_bumn: {
        name: "Peran BUMN sebagai Agen Pembangunan & Stabilisator",
        category: "Kebijakan Sektor Strategis",
        icon: "💼",
        simpleDef: "Peran ganda Badan Usaha Milik Negara di Indonesia: beroperasi mencari laba komersial secara profesional, sekaligus bertindak sebagai lokomotif penugasan pembangunan dan stabilisator harga pangan/energi.",
        analogy: "Ibarat truk garda depan yang bertugas membuka jalan terjal di tengah hutan belantara tempat mobil-mobil pribadi swasta belum berani masuk melintas.",
        mechanism: "Mengatasi kegagalan pasar di sektor-sektor berisiko tinggi dengan masa balik modal lama (seperti transmisi listrik PLN, kilang Pertamina, dan jalan tol perintis Hutama Karya).",
        formula: "Nilai Tambah BUMN = Dividen Kas Negara + Setoran Pajak + Dampak Kemanfaatan Sosial (Public Service Obligation)",
        realImpact: "Holding BUMN menyumbangkan dividen dan pajak lebih dari Rp 80 triliun per tahun ke kas negara APBN, membuktikan perannya sebagai mesin pertumbuhan dan benteng stabilitas nasional.",
        related: ["monopoli_alami", "belanja_infrastruktur", "kesejahteraan_sosial"]
    },
    black_swan_resilience: {
        name: "Resiliensi Makroekonomi Menghadapi 'Black Swan'",
        category: "Manajemen Risiko Makroekonomi",
        icon: "🌪️",
        simpleDef: "Kapasitas kelentingan suatu negara menyerap dan pulih cepat dari peristiwa langka berdampak katastropik ekstrem yang tidak terprediksi sebelumnya (seperti pandemi global atau perang dunia).",
        analogy: "Ibarat mendesain gedung pencakar langit yang memiliki peredam gempa bumi raksasa: dirancang khusus agar gedung tidak roboh meskipun diguncang gempa dahsyat yang belum pernah tercatat sejarah.",
        mechanism: "Membangun bantalan penyangga ganda (cadangan devisa tebal, SAL kas negara kuat, perbankan dengan modal CAR tinggi) yang siap dipakai saat krisis tak terduga datang.",
        formula: "Resiliensi = f(Bantalan Fiskal (SAL), Bantalan Moneter (Cadev), Ketahanan Modal Bank (CAR), Kecepatan Respon Kebijakan)",
        realImpact: "Ketangguhan fundamental ekonomi Indonesia yang teruji melewati krisis moneter 1998, krisis global 2008, dan pandemi 2020 membuktikan daya tahan resiliensi makroekonomi bangsa.",
        related: ["early_warning", "stress_test", "sal_apbn"]
    },
    middle_income_trap: {
        name: "Jebakan Pendapatan Menengah (Middle-Income Trap)",
        category: "Teori Pembangunan Jangka Panjang",
        icon: "👥",
        simpleDef: "Fenomena di mana negara berkembang berhasil naik kelas dari negara miskin menjadi negara berpendapatan menengah, namun tersendat puluhan tahun dan gagal menembus status negara maju.",
        analogy: "Ibarat atlet lari yang berhasil lolos kualifikasi tingkat daerah, namun kehabisan nafas dan terhenti tidak pernah mampu menembus ajang medali Olimpiade dunia.",
        mechanism: "Upah buruh tidak lagi murah untuk bersaing dengan negara miskin, namun produktivitas dan inovasi teknologinya belum cukup canggih untuk menyaingi negara maju.",
        formula: "Lolos MIT ⇔ PDB per Kapita > US$ 13.845 & TFP (Total Factor Productivity) ↑",
        realImpact: "Visi Indonesia Emas 2045 dirancang Bappenas untuk meloloskan Indonesia dari Middle-Income Trap sebelum bonus demografi berakhir pada dekade 2030-an.",
        related: ["human_capital", "hilirisasi_komoditas", "kebijakan_penawaran"]
    },
    teknokrat_den: {
        name: "Kepemimpinan Teknokratik Dewan Ekonomi Nasional",
        category: "Pengambilan Keputusan Makroekonomi",
        icon: "👑",
        simpleDef: "Seni kepemimpinan teknokratik tertinggi yang memadukan ketajaman teori ekonomi, kehati-hatian kalkulasi data empiris, dan keberanian eksekusi kebijakan demi kedaulatan bangsa.",
        analogy: "Ibarat konduktor orkestra simfoni musik: memastikan alat tiup (fiskal), gesek (moneter), dan perkusi (sektor riil) bersuara harmonis menghasilkan nada lagu kebangsaan yang megah.",
        mechanism: "Mengintegrasikan bauran kebijakan (policy mix) lintas kementerian dan lembaga otoritas untuk mengatasi dilema stabilitas jangka pendek dan pertumbuhan jangka panjang.",
        formula: "Mahakarya Teknokrat = Integritas Moral + Kompetensi Ilmiah + Keberanian Eksekusi → Indonesia Maju 2045",
        realImpact: "Dewan Ekonomi Nasional (DEN) bertindak sebagai dapur pemikir strategis Presiden dalam merumuskan arah peta jalan ekonomi makro dan menjaga stabilitas nasional.",
        related: ["policy_mix", "kesejahteraan_sosial", "kemandirian_fiskal"]
    }
};

/**
 * Controller Tampilan Jargon Modal
 */
// Helper: Menjamin rumus selalu tampil rapi dalam notasi buku teks normal
function formatTextbookFormula(formula) {
    if (!formula) return '';
    let res = String(formula).trim();
    if (res.startsWith('$') && res.endsWith('$')) {
        res = res.slice(1, -1).trim();
    }
    return res.replace(/\\cdot/g, ' × ')
              .replace(/\\times/g, ' × ')
              .replace(/\\alpha/g, 'α')
              .replace(/\\beta/g, 'β')
              .replace(/\\pi\^e/g, 'πᵉ')
              .replace(/\\pi/g, 'π')
              .replace(/\\Delta/g, 'Δ')
              .replace(/\\approx/g, ' ≈ ')
              .replace(/\\implies/g, ' → ')
              .replace(/\\le/g, ' ≤ ')
              .replace(/\\ge/g, ' ≥ ')
              .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
              .replace(/\\text\{([^}]+)\}/g, '$1')
              .replace(/\\/g, '')
              .replace(/\s+/g, ' ')
              .trim();
}

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
                                <span class="jargon-textbook-formula" id="jargonFormula"></span>
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

    inspect(termKey, fallbackText = '') {
        let cleanKey = (termKey || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
        let data = MACRO_JARGON_DATA[cleanKey] || MACRO_JARGON_DATA[termKey];

        // Jika tidak langsung cocok, coba pencarian kemiripan key
        if (!data) {
            const foundKey = Object.keys(MACRO_JARGON_DATA).find(k => k === cleanKey || k.includes(cleanKey) || cleanKey.includes(k));
            if (foundKey) {
                data = MACRO_JARGON_DATA[foundKey];
                cleanKey = foundKey;
            }
        }

        // Jika masih belum ada, buat kartu penjelasan dinamis agar pop-up PASTI muncul
        if (!data) {
            const displayName = fallbackText || termKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            data = {
                name: displayName,
                category: "Konsep & Istilah Makroekonomi",
                icon: "💡",
                simpleDef: `Istilah "${displayName}" merupakan konsep penting dalam analisis instrumen kebijakan ekonomi makro nasional.`,
                analogy: "Membantu para pembuat kebijakan, teknokrat, dan pelaku bisnis memahami transmisi variabel moneter, fiskal, atau dinamika pasar secara terpadu.",
                mechanism: "Memengaruhi pembentukan harga, alokasi anggaran belanja negara, transmisi likuiditas perbankan, atau stabilitas nilai tukar nasional.",
                formula: "",
                realImpact: "Digunakan secara luas dalam kajian resmi Bank Indonesia, Kementerian Keuangan RI, dan Kementerian PPN/Bappenas.",
                related: ["bi_rate", "inflasi_ihk", "pdb_riil"]
            };
        }

        this.currentTerm = cleanKey;

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
            fText.textContent = formatTextbookFormula(data.formula);
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
            const termKey = target.getAttribute('data-term') || target.textContent.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
            const termText = target.textContent.replace('ℹ️', '').trim();
            if (window.jargonInspector) {
                window.jargonInspector.inspect(termKey, termText);
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
        { regex: /\bUU No\. 17\/2003\b/gi, key: 'apbn_defisit', text: 'UU No. 17/2003' },
        { regex: /\bInflasi\ Tarikan\ Permintaan\b/gi, key: 'demand_pull_inflation', text: 'Inflasi Tarikan Permintaan' },
        { regex: /\bInflasi\ Dorongan\ Biaya\b/gi, key: 'cost_push_inflation', text: 'Inflasi Dorongan Biaya' },
        { regex: /\bMarginal\ Propensity\ to\ Consume\b/gi, key: 'mpc_konsumsi', text: 'Marginal Propensity to Consume' },
        { regex: /\bDistorsi\ Pasar\ \&\ Spekulasi\ Penimbunan\b/gi, key: 'distorsi_pasar', text: 'Distorsi Pasar & Spekulasi Penimbunan' },
        { regex: /\bEfek\ Substitusi\ Konsumen\b/gi, key: 'efek_substitusi', text: 'Efek Substitusi Konsumen' },
        { regex: /\bKonektivitas\ Logistik\ \&\ Integrasi\ Pasar\b/gi, key: 'biaya_logistik', text: 'Konektivitas Logistik & Integrasi Pasar' },
        { regex: /\bHukum\ Engel\b/gi, key: 'hukum_engel', text: 'Hukum Engel' },
        { regex: /\bIdentitas\ Tabungan\ \&\ Investasi\ Makro\b/gi, key: 'tabungan_investasi', text: 'Identitas Tabungan & Investasi Makro' },
        { regex: /\bIlusi\ Uang\b/gi, key: 'ilusi_uang', text: 'Ilusi Uang' },
        { regex: /\bBarang\ Inferior\ \&\ Elastisitas\ Pendapatan\b/gi, key: 'barang_inferior', text: 'Barang Inferior & Elastisitas Pendapatan' },
        { regex: /\bKegagalan\ Pasar\ \&\ Eksternalitas\ Negatif\b/gi, key: 'eksternalitas_negatif', text: 'Kegagalan Pasar & Eksternalitas Negatif' },
        { regex: /\bBuffer\ Stock\ \&\ Stabilisasi\ Pasokan\ Pangan\b/gi, key: 'buffer_stock', text: 'Buffer Stock & Stabilisasi Pasokan Pangan' },
        { regex: /\bIndeks\ Keyakinan\ Konsumen\b/gi, key: 'indeks_keyakinan_konsumen', text: 'Indeks Keyakinan Konsumen' },
        { regex: /\bBarang\ Publik\b/gi, key: 'barang_publik', text: 'Barang Publik' },
        { regex: /\bElastisitas\ Harga\ Permintaan\ Inelastis\b/gi, key: 'elastisitas_permintaan', text: 'Elastisitas Harga Permintaan Inelastis' },
        { regex: /\bSektor\ Informal\ sebagai\ Bantalan\ Sosial\b/gi, key: 'sektor_informal', text: 'Sektor Informal sebagai Bantalan Sosial' },
        { regex: /\bBiaya\ Menu\ \ \&\ Kekakuan\ Harga\b/gi, key: 'menu_costs', text: 'Biaya Menu  & Kekakuan Harga' },
        { regex: /\bGuncangan\ Penawaran\ Pertanian\ \&\ Anomali\ El\ Nino\b/gi, key: 'supply_shock_elnino', text: 'Guncangan Penawaran Pertanian & Anomali El Nino' },
        { regex: /\bKebijakan\ Sisi\ Penawaran\b/gi, key: 'kebijakan_penawaran', text: 'Kebijakan Sisi Penawaran' },
        { regex: /\bInklusi\ Keuangan\ \&\ Intermediasi\ Perbankan\b/gi, key: 'inklusi_keuangan', text: 'Inklusi Keuangan & Intermediasi Perbankan' },
        { regex: /\bKeseimbangan\ Makro\ \&\ Kesejahteraan\ Rakyat\b/gi, key: 'kesejahteraan_sosial', text: 'Keseimbangan Makro & Kesejahteraan Rakyat' },
        { regex: /\bPanduan\ Kebijakan\ Masa\ Depan\b/gi, key: 'forward_guidance', text: 'Panduan Kebijakan Masa Depan' },
        { regex: /\bJalur\ Kredit\ Perbankan\b/gi, key: 'transmisi_kredit', text: 'Jalur Kredit Perbankan' },
        { regex: /\bRasio\ Pinjaman\ terhadap\ Nilai\ Agunan\b/gi, key: 'makroprudensial_ltv', text: 'Rasio Pinjaman terhadap Nilai Agunan' },
        { regex: /\bPengetatan\ Kuantitatif\b/gi, key: 'pengetatan_kuantitatif', text: 'Pengetatan Kuantitatif' },
        { regex: /\bAturan\ Suku\ Bunga\ Taylor\b/gi, key: 'taylor_rule', text: 'Aturan Suku Bunga Taylor' },
        { regex: /\bJalur\ Nilai\ Tukar\ Transmisi\ Moneter\b/gi, key: 'transmisi_nilai_tukar', text: 'Jalur Nilai Tukar Transmisi Moneter' },
        { regex: /\bJangkar\ Ekspektasi\ Inflasi\b/gi, key: 'jangkar_inflasi', text: 'Jangkar Ekspektasi Inflasi' },
        { regex: /\bUang\ Primer\ /\ Basis\ Moneter\b/gi, key: 'uang_primer', text: 'Uang Primer / Basis Moneter' },
        { regex: /\bMargin\ Bunga\ Bersih\b/gi, key: 'beban_bunga_perbankan', text: 'Margin Bunga Bersih' },
        { regex: /\bTransaksi\ Repo\b/gi, key: 'pasar_repo', text: 'Transaksi Repo' },
        { regex: /\bPenyangga\ Modal\ Kontrasiklikal\b/gi, key: 'kontrasiklikal_makroprudensial', text: 'Penyangga Modal Kontrasiklikal' },
        { regex: /\bRupiah\ Digital\b/gi, key: 'cbdc_rupiah_digital', text: 'Rupiah Digital' },
        { regex: /\bKurva\ Imbal\ Hasil\ Obligasi\ \&\ Inversi\b/gi, key: 'kurva_imbal_hasil', text: 'Kurva Imbal Hasil Obligasi & Inversi' },
        { regex: /\bHimbauan\ Moral\b/gi, key: 'moral_suasion', text: 'Himbauan Moral' },
        { regex: /\bKebijakan\ Makroprudensial\ \&\ Rasio\ Intermediasi\b/gi, key: 'kebijakan_makroprudensial', text: 'Kebijakan Makroprudensial & Rasio Intermediasi' },
        { regex: /\bIndependensi\ Bank\ Sentral\ \&\ Kredibilitas\ Moneter\b/gi, key: 'independensi_bank_sentral', text: 'Independensi Bank Sentral & Kredibilitas Moneter' },
        { regex: /\bJalur\ Harga\ Aset\ Transmisi\ Moneter\b/gi, key: 'transmisi_aset', text: 'Jalur Harga Aset Transmisi Moneter' },
        { regex: /\bFasilitas\ Simpanan\ Bank\ Indonesia\b/gi, key: 'fasilitas_simpanan_bi', text: 'Fasilitas Simpanan Bank Indonesia' },
        { regex: /\bHak\ Emisi\ \&\ Keuntungan\ Seigniorage\b/gi, key: 'seigniorage', text: 'Hak Emisi & Keuntungan Seigniorage' },
        { regex: /\bSistem\ Perbankan\ Bayangan\b/gi, key: 'shadow_banking', text: 'Sistem Perbankan Bayangan' },
        { regex: /\bIntervensi\ Sterilisasi\ Valas\ Pasar\ Uang\b/gi, key: 'intervensi_sterilisasi', text: 'Intervensi Sterilisasi Valas Pasar Uang' },
        { regex: /\bArsitektur\ Stabilitas\ Sistem\ Keuangan\b/gi, key: 'stabilitas_sistem_keuangan', text: 'Arsitektur Stabilitas Sistem Keuangan' },
        { regex: /\bTransfer\ ke\ Daerah\ \ \&\ Dana\ Alokasi\ Khusus\b/gi, key: 'dana_alokasi_khusus', text: 'Transfer ke Daerah  & Dana Alokasi Khusus' },
        { regex: /\bAlokasi\ Anggaran\ Kesehatan\ \&\ JKN\b/gi, key: 'anggaran_kesehatan', text: 'Alokasi Anggaran Kesehatan & JKN' },
        { regex: /\bBatas\ Rasio\ Utang\ Negara\ 60%\ PDB\b/gi, key: 'rasio_utang_negara', text: 'Batas Rasio Utang Negara 60% PDB' },
        { regex: /\bTeorema\ Multiplier\ Anggaran\ Berimbang\b/gi, key: 'anggaran_berimbang', text: 'Teorema Multiplier Anggaran Berimbang' },
        { regex: /\bSovereign\ Wealth\ Fund\ \&\ Dana\ Abadi\b/gi, key: 'dana_abadi', text: 'Sovereign Wealth Fund & Dana Abadi' },
        { regex: /\bPembelian\ SBN\ oleh\ BI\ di\ Pasar\ Perdana\b/gi, key: 'pembelian_sbn_bi', text: 'Pembelian SBN oleh BI di Pasar Perdana' },
        { regex: /\bKurva\ Laffer\b/gi, key: 'kurva_laffer', text: 'Kurva Laffer' },
        { regex: /\bRuang\ Fiskal\b/gi, key: 'fiskal_ruang_gerak', text: 'Ruang Fiskal' },
        { regex: /\bBelanja\ Wajib\ /\ Mengikat\b/gi, key: 'belanja_mengikat', text: 'Belanja Wajib / Mengikat' },
        { regex: /\bReformasi\ Belanja\ Pegawai\ \&\ Efisiensi\ Birokrasi\b/gi, key: 'efisiensi_birokrasi', text: 'Reformasi Belanja Pegawai & Efisiensi Birokrasi' },
        { regex: /\bSaldo\ Anggaran\ Lebih\ \ Kas\ Negara\b/gi, key: 'sal_apbn', text: 'Saldo Anggaran Lebih  Kas Negara' },
        { regex: /\bPajak\ Karbon\ \&\ Nilai\ Ekonomi\ Karbon\b/gi, key: 'pajak_karbon', text: 'Pajak Karbon & Nilai Ekonomi Karbon' },
        { regex: /\bPembiayaan\ Infrastruktur\ Kreatif\ Non\-Utang\b/gi, key: 'pembiayaan_kreatif', text: 'Pembiayaan Infrastruktur Kreatif Non-Utang' },
        { regex: /\bKepatuhan\ Pajak\ Sukarela\b/gi, key: 'kepatuhan_pajak', text: 'Kepatuhan Pajak Sukarela' },
        { regex: /\bBantalan\ Sosial\ \&\ Jaring\ Pengaman\ Kemiskinan\b/gi, key: 'belanja_bansos', text: 'Bantalan Sosial & Jaring Pengaman Kemiskinan' },
        { regex: /\bPengawasan\ Anggaran\ \&\ Opini\ WTP\ BPK\b/gi, key: 'audit_bpk', text: 'Pengawasan Anggaran & Opini WTP BPK' },
        { regex: /\bAnalisis\ Keberlanjutan\ Utang\b/gi, key: 'debt_sustainability', text: 'Analisis Keberlanjutan Utang' },
        { regex: /\bMultiplier\ Belanja\ Infrastruktur\ Fisik\b/gi, key: 'belanja_infrastruktur', text: 'Multiplier Belanja Infrastruktur Fisik' },
        { regex: /\bHarmonisasi\ Pajak\ Daerah\ \&\ Retribusi\b/gi, key: 'pajak_daerah', text: 'Harmonisasi Pajak Daerah & Retribusi' },
        { regex: /\bKerjasama\ Pemerintah\ dan\ Badan\ Usaha\b/gi, key: 'skema_kpbu', text: 'Kerjasama Pemerintah dan Badan Usaha' },
        { regex: /\bKewajiban\ Kontinjensi\ \&\ Penjaminan\ Negara\b/gi, key: 'risiko_kontinjensi', text: 'Kewajiban Kontinjensi & Penjaminan Negara' },
        { regex: /\bKedaulatan\ Fiskal\ \&\ Kemandirian\ APBN\b/gi, key: 'kedaulatan_fiskal', text: 'Kedaulatan Fiskal & Kemandirian APBN' },
        { regex: /\bHilirisasi\ Komoditas\ \&\ Peningkatan\ Nilai\ Tambah\ Ekspor\b/gi, key: 'hilirisasi_komoditas', text: 'Hilirisasi Komoditas & Peningkatan Nilai Tambah Ekspor' },
        { regex: /\bDevisa\ Hasil\ Ekspor\ Sumber\ Daya\ Alam\b/gi, key: 'dhe_sda', text: 'Devisa Hasil Ekspor Sumber Daya Alam' },
        { regex: /\bKetentuan\ Perdagangan\b/gi, key: 'terms_of_trade', text: 'Ketentuan Perdagangan' },
        { regex: /\bParitas\ Suku\ Bunga\b/gi, key: 'interest_rate_parity', text: 'Paritas Suku Bunga' },
        { regex: /\bPenanaman\ Modal\ Asing\ Langsung\b/gi, key: 'fdi_investasi', text: 'Penanaman Modal Asing Langsung' },
        { regex: /\bDefisit\ Pendapatan\ Primer\ \&\ Repatriasi\ Laba\ Asing\b/gi, key: 'repatriasi_keuntungan', text: 'Defisit Pendapatan Primer & Repatriasi Laba Asing' },
        { regex: /\bBilateral\ Currency\ Swap\ Arrangement\b/gi, key: 'currency_swap', text: 'Bilateral Currency Swap Arrangement' },
        { regex: /\bRemitansi\ Pekerja\ Migran\ \&\ Pendapatan\ Sekunder\b/gi, key: 'remitansi_tki', text: 'Remitansi Pekerja Migran & Pendapatan Sekunder' },
        { regex: /\bPerjanjian\ Perdagangan\ Bebas\b/gi, key: 'perjanjian_fta', text: 'Perjanjian Perdagangan Bebas' },
        { regex: /\bFenomena\ Taper\ Tantrum\b/gi, key: 'taper_tantrum', text: 'Fenomena Taper Tantrum' },
        { regex: /\bPeringkat\ Utang\ Negara\b/gi, key: 'peringkat_utang', text: 'Peringkat Utang Negara' },
        { regex: /\bPremi\ Risiko\ Credit\ Default\ Swap\b/gi, key: 'premi_cds', text: 'Premi Risiko Credit Default Swap' },
        { regex: /\bHukum\ Satu\ Harga\ \&\ Paritas\ Daya\ Beli\b/gi, key: 'hukum_satu_harga', text: 'Hukum Satu Harga & Paritas Daya Beli' },
        { regex: /\bReal\ Effective\ Exchange\ Rate\b/gi, key: 'kurs_reer', text: 'Real Effective Exchange Rate' },
        { regex: /\bSiklus\ Super\ Komoditas\b/gi, key: 'komoditas_supercycle', text: 'Siklus Super Komoditas' },
        { regex: /\bLarangan\ Ekspor\ Bijih\ Mentah\ \&\ Kedaulatan\ Sumber\ Daya\b/gi, key: 'larangan_ekspor_mentah', text: 'Larangan Ekspor Bijih Mentah & Kedaulatan Sumber Daya' },
        { regex: /\bDevaluasi\ Kompetitif\b/gi, key: 'devaluasi_kompetitif', text: 'Devaluasi Kompetitif' },
        { regex: /\bArus\ Modal\ Panas\ \ \&\ Portofolio\b/gi, key: 'investasi_portofolio', text: 'Arus Modal Panas  & Portofolio' },
        { regex: /\bRantai\ Nilai\ Global\b/gi, key: 'global_value_chains', text: 'Rantai Nilai Global' },
        { regex: /\bSuku\ Bunga\ Bebas\ Risiko\b/gi, key: 'risk_free_rate', text: 'Suku Bunga Bebas Risiko' },
        { regex: /\bSwasembada\ Pangan\ \&\ Kedaulatan\ Devisa\b/gi, key: 'swasembada_pangan', text: 'Swasembada Pangan & Kedaulatan Devisa' },
        { regex: /\bMitigasi\ Risiko\ Utang\ Valas\ Swasta\ Non\-Bank\b/gi, key: 'utang_valas_swasta', text: 'Mitigasi Risiko Utang Valas Swasta Non-Bank' },
        { regex: /\bDiversifikasi\ Pasar\ Ekspor\ Non\-Tradisional\b/gi, key: 'diversifikasi_mitra', text: 'Diversifikasi Pasar Ekspor Non-Tradisional' },
        { regex: /\bBenteng\ Ketahanan\ Sektor\ Eksternal\ Indonesia\b/gi, key: 'ketahanan_eksternal', text: 'Benteng Ketahanan Sektor Eksternal Indonesia' },
        { regex: /\bGuncangan\ Ganda\ Pandemi\ Covid\-19\b/gi, key: 'pandemi_shock', text: 'Guncangan Ganda Pandemi Covid-19' },
        { regex: /\bRelaksasi\ Batas\ Defisit\ APBN\ Darurat\ Pandemi\b/gi, key: 'relaksasi_defisit', text: 'Relaksasi Batas Defisit APBN Darurat Pandemi' },
        { regex: /\bSkema\ Berbagi\ Beban\ \ BI\-Kemenkeu\b/gi, key: 'burden_sharing', text: 'Skema Berbagi Beban  BI-Kemenkeu' },
        { regex: /\bSpiral\ Upah\-Harga\b/gi, key: 'wage_price_spiral', text: 'Spiral Upah-Harga' },
        { regex: /\bHisteresis\ Pengangguran\b/gi, key: 'histeresis_pengangguran', text: 'Histeresis Pengangguran' },
        { regex: /\bKrisis\ Utang\ Berdaulat\b/gi, key: 'sovereign_debt_crisis', text: 'Krisis Utang Berdaulat' },
        { regex: /\bResesi\ Neraca\ \ \&\ Gelembung\ Aset\b/gi, key: 'balance_sheet_recession', text: 'Resesi Neraca  & Gelembung Aset' },
        { regex: /\bRestrukturisasi\ Kredit\ Darurat\ Perbankan\ OJK\b/gi, key: 'restrukturisasi_kredit', text: 'Restrukturisasi Kredit Darurat Perbankan OJK' },
        { regex: /\bManajemen\ Cadangan\ Beras\ Pemerintah\b/gi, key: 'cadangan_beras_pemerintah', text: 'Manajemen Cadangan Beras Pemerintah' },
        { regex: /\bGuncangan\ Minyak\ Dunia\ \&\ Subsidi\ Kompensasi\ Energi\b/gi, key: 'subsidi_energi', text: 'Guncangan Minyak Dunia & Subsidi Kompensasi Energi' },
        { regex: /\bKemitraan\ Transisi\ Energi\ Berkeadilan\b/gi, key: 'just_energy_transition', text: 'Kemitraan Transisi Energi Berkeadilan' },
        { regex: /\bBahaya\ Spiral\ Deflasi\ Kronis\b/gi, key: 'deflationary_spiral', text: 'Bahaya Spiral Deflasi Kronis' },
        { regex: /\bKetahanan\ Pangan\ Struktural\ \&\ Produktivitas\ Pertanian\b/gi, key: 'ketahanan_pangan', text: 'Ketahanan Pangan Struktural & Produktivitas Pertanian' },
        { regex: /\bRasio\ Kecukupan\ Modal\ Bank\b/gi, key: 'car_perbankan', text: 'Rasio Kecukupan Modal Bank' },
        { regex: /\bKetahanan\ Ekonomi\ UMKM\ sebagai\ Tulang\ Punggung\ Bangsa\b/gi, key: 'umkm_ketahanan', text: 'Ketahanan Ekonomi UMKM sebagai Tulang Punggung Bangsa' },
        { regex: /\bPengentasan\ Kemiskinan\ Ekstrem\ \&\ Penurunan\ Stunting\b/gi, key: 'kemiskinan_stunting', text: 'Pengentasan Kemiskinan Ekstrem & Penurunan Stunting' },
        { regex: /\bReformasi\ Birokrasi\ \&\ Kemudahan\ Berusaha\b/gi, key: 'biaya_transaksi_eodb', text: 'Reformasi Birokrasi & Kemudahan Berusaha' },
        { regex: /\bDiversifikasi\ Cadangan\ Devisa\ \&\ Dedolarisasi\ Multilateral\b/gi, key: 'dedolarisasi', text: 'Diversifikasi Cadangan Devisa & Dedolarisasi Multilateral' },
        { regex: /\bKemandirian\ Fiskal\ \&\ Kedaulatan\ APBN\ Jangka\ Panjang\b/gi, key: 'kemandirian_fiskal', text: 'Kemandirian Fiskal & Kedaulatan APBN Jangka Panjang' },
        { regex: /\bResiliensi\ Rantai\ Pasok\ Global\ \&\ Keamanan\ Industri\b/gi, key: 'resiliensi_rantai_pasok', text: 'Resiliensi Rantai Pasok Global & Keamanan Industri' },
        { regex: /\bPeran\ BUMN\ sebagai\ Agen\ Pembangunan\ \&\ Stabilisator\b/gi, key: 'peran_bumn', text: 'Peran BUMN sebagai Agen Pembangunan & Stabilisator' },
        { regex: /\bResiliensi\ Makroekonomi\ Menghadapi\ 'Black\ Swan'\b/gi, key: 'black_swan_resilience', text: 'Resiliensi Makroekonomi Menghadapi 'Black Swan'' },
        { regex: /\bJebakan\ Pendapatan\ Menengah\b/gi, key: 'middle_income_trap', text: 'Jebakan Pendapatan Menengah' },
        { regex: /\bKepemimpinan\ Teknokratik\ Dewan\ Ekonomi\ Nasional\b/gi, key: 'teknokrat_den', text: 'Kepemimpinan Teknokratik Dewan Ekonomi Nasional' },
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
