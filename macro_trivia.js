/**
 * MACROMASTER DEN - 5 LEVELS x 36 QUESTIONS = 180 QUESTIONS TOTAL
 * Random 6 questions per session with min 80% passing grade requirement.
 */

const MACRO_TRIVIA_STAGES = [
    {
        "id": 1,
        "title": "Level 1: 🛒 Pasar Kaget & Warung Kopi",
        "subtitle": "Memahami Uang, Inflasi, dan Daya Beli Belanja Harian",
        "theme": "market",
        "unlocks": "Gelar: Pahlawan Belanja Cerdas 🛒",
        "questionPool": [
            {
                "id": "s1_q1",
                "scenario": "🏪 Bu Tejo di Pasar Tradisional",
                "question": "Menjelang hari raya, harga cabai, beras, dan daging sapi serempak naik tajam di berbagai pasar. Dari kacamata ekonomi makro, mekanisme utama apakah yang memicu kenaikan harga tersebut?",
                "options": [
                    "Bank sentral meningkatkan suku bunga acuan sehingga biaya distribusi logistik pangan menjadi lebih mahal",
                    "Praktek kartel monopoli pedagang eceran pasar yang menaikkan margin keuntungan sepihak tanpa adanya perubahan permintaan",
                    "Nilai tukar mata uang rupiah melemah seketika terhadap seluruh komoditas pangan domestik",
                    "Lonjakan belanja konsumsi masyarakat yang meningkat drastis melampaui pasokan fisik pangan jangka pendek (Demand-Pull Inflation)"
                ],
                "correct": 3,
                "hint": "Pikirkan lonjakan serempak pada sisi permintaan konsumsi agregat di saat pasokan panen belum bisa bertambah seketika!",
                "debrief": "Tepat sekali! Ini adalah fenomena <span class='econ-jargon' data-term='inflasi_ihk'>Inflasi IHK</span> jenis <em>Demand-Pull</em>. Ketika permintaan agregat masyarakat melonjak tajam dalam waktu singkat sementara pasokan pangan biologis membutuhkan waktu untuk panen/tumbuh, harga keseimbangan pasar otomatis terkerek naik."
            },
            {
                "id": "s1_q2",
                "scenario": "💸 Kebijakan Moneter & Kapasitas Riil",
                "question": "Mengapa bank sentral tidak boleh mencetak uang kartal dalam jumlah berlipat ganda untuk melunasi seluruh utang negara dan dibagikan secara gratis kepada warga?",
                "options": [
                    "Karena pencetakan uang baru hanya diperbolehkan oleh undang-undang jika neraca transaksi berjalan negara mengalami surplus besar",
                    "Karena penambahan uang kartal baru secara otomatis akan menurunkan suku bunga perbankan hingga batas negatif permanen",
                    "Uang adalah alat tukar nominal; mencetak uang tanpa penambahan output fisik hanya melipatgandakan harga barang (Hiperinflasi) dan merusak daya beli",
                    "Karena emisi pencetakan uang kartal baru secara hukum internasional wajib dijamin 100% dengan cadangan emas fisik di brankas bank sentral"
                ],
                "correct": 2,
                "hint": "Kekayaan riil suatu bangsa diukur dari jumlah barang dan jasa yang diproduksi, bukan dari lembaran kertas uang yang dicetak!",
                "debrief": "Hebat! Persamaan kuantitas uang Fisher ($M \\cdot V = P \\cdot Y$) membuktikan bahwa mencetak uang ($M$) tanpa kenaikan produksi riil ($Y$) hanya akan melesatkan tingkat harga ($P$) alias <span class='econ-jargon' data-term='teori_kuantitas_uang'>Hiperinflasi</span>. Uang banyak tapi tidak bisa membeli apa-apa!"
            },
            {
                "id": "s1_q3",
                "scenario": "⛽ Kenaikan BBM Bersubsidi",
                "question": "Ketika pemerintah menaikkan harga solar dan bensin subsidi, tarif angkutan umum dan harga sembako di warung-warung langsung terkerek naik. Fenomena inflasi ini dikategorikan sebagai:",
                "options": [
                    "Demand-Pull Inflation, karena masyarakat berebut membeli bensin dalam jumlah lebih banyak dari biasanya",
                    "Hyperinflation, karena sistem pembayaran tunai di warung tidak lagi dipercaya oleh masyarakat",
                    "Built-in Inflation, karena para pekerja pabrik secara otomatis menuntut kenaikan upah bulanan setiap tanggal satu",
                    "Cost-Push Inflation, karena kenaikan biaya input energi mendorong biaya produksi dan logistik di seluruh rantai pasok"
                ],
                "correct": 3,
                "hint": "Kenaikan harga terjadi dari sisi biaya produksi dan transportasi barang, bukan karena orang tiba-tiba ingin makan lebih banyak!",
                "debrief": "Tepat! Kenaikan harga BBM merupakan guncangan biaya penawaran (<span class='econ-jargon' data-term='inflasi_ihk'>Cost-Push Inflation</span>). Energi adalah input dasar logistik, sehingga lonjakannya merambat ke seluruh barang di pasar."
            },
            {
                "id": "s1_q4",
                "scenario": "📊 Mengukur PDB Riil vs Nominal",
                "question": "Jika Produk Domestik Bruto (PDB) nominal suatu negara naik 10% dalam setahun, tetapi inflasi pada tahun yang sama mencapai 8%, berapakah taksiran pertumbuhan PDB riil negara tersebut?",
                "options": [
                    "Sekitar 18%, karena inflasi menjumlahkan nilai nominal dan daya beli masyarakat di pasar",
                    "Tetap 10%, karena PDB selalu mengukur output barang fisik tanpa terpengaruh oleh kenaikan harga",
                    "Sekitar 2%, karena pertumbuhan riil dihitung dengan mengurangkan laju inflasi dari pertumbuhan nominal",
                    "Sekitar 1,25%, yaitu hasil bagi langsung antara pertumbuhan nominal dengan tingkat inflasi tahunan"
                ],
                "correct": 2,
                "hint": "PDB nominal memuat kenaikan harga; hilangkan komponen kenaikan harga untuk mendapatkan pertumbuhan barang fisik yang sesungguhnya!",
                "debrief": "Tepat sekali! PDB Nominal mengukur output dengan harga berlaku. Pertumbuhan <span class='econ-jargon' data-term='pdb_riil'>PDB Riil</span> diperoleh dengan mendiskontokan inflasi (PDB Deflator): $10\\% - 8\\% \\approx 2\\%$. Pertumbuhan fisik barang dan jasa sebenarnya hanyalah 2%!"
            },
            {
                "id": "s1_q5",
                "scenario": "🛍️ Komponen Formula PDB Nasional",
                "question": "Dalam persamaan identitas Produk Domestik Bruto pendekatan pengeluaran: $Y = C + I + G + (X - M)$, komponen apakah yang mencerminkan belanja mesin pabrik baru dan pembangunan gudang oleh dunia usaha?",
                "options": [
                    "Konsumsi Rumah Tangga (C), karena pabrik dibeli dari uang kas milik pengusaha",
                    "Belanja Pengeluaran Pemerintah (G), karena pembangunan industri diawasi langsung oleh kementerian",
                    "Ekspor Neto (X - M), karena mesin pabrik modern umumnya didatangkan dari produsen luar negeri",
                    "Investasi Domestik Swasta (I), yaitu penambahan barang modal fisik untuk kapasitas produksi masa depan"
                ],
                "correct": 3,
                "hint": "Dalam kacamata makroekonomi, 'Investasi' bukanlah membeli saham di aplikasi ponsel, melainkan belanja modal fisik untuk berproduksi!",
                "debrief": "Benar sekali! Komponen $I$ (<span class='econ-jargon' data-term='keseimbangan_ad_as'>Investasi</span>) mencakup Pembentukan Modal Tetap Bruto (PMTB) seperti mesin, gedung pabrik, dan inventori yang akan melipatgandakan output barang di masa depan."
            },
            {
                "id": "s1_q6",
                "scenario": "🛒 Tulang Punggung Ekonomi Indonesia",
                "question": "Secara struktur statistik, lebih dari 53% Produk Domestik Bruto Indonesia disokong oleh Konsumsi Rumah Tangga (C). Mengapa menjaga daya beli masyarakat kelas menengah-bawah menjadi prioritas tertinggi teknokrat makro?",
                "options": [
                    "Karena masyarakat kelas menengah-bawah merupakan pembeli utama obligasi negara Surat Berharga Negara (SBN)",
                    "Karena belanja konsumsi rumah tangga secara otomatis meningkatkan cadangan devisa bank sentral",
                    "Karena konsumsi kelompok bawah tidak pernah terpengaruh oleh fluktuasi harga beras dan tarif listrik",
                    "Karena kelompok berpenghasilan menengah-bawah memiliki Marginal Propensity to Consume (MPC) sangat tinggi, di mana hampir seluruh uangnya langsung dibelanjakan kembali ke pasar riil"
                ],
                "correct": 3,
                "hint": "Bagi orang berpenghasilan pas-pasan, setiap tambahan rupiah langsung dibelanjakan untuk makanan dan kebutuhan harian, menggerakkan roda ekonomi warung!",
                "debrief": "Sangat jitu! Kelompok menengah-bawah memiliki nilai <em>MPC</em> mendekati 1. Setiap bantuan atau stabilitas harga beras menjaga konsumsi mereka tetap berputar di sektor riil, menopang lebih dari separuh pertumbuhan PDB nasional!"
            },
            {
                "id": "s1_q7",
                "scenario": "💰 Marginal Propensity to Consume (MPC)",
                "question": "Jika seseorang menerima kenaikan upah sebesar Rp 1.000.000 dan memutuskan untuk membelanjakan Rp 800.000 serta menabung Rp 200.000, berapakah nilai Marginal Propensity to Consume (MPC)-nya?",
                "options": [
                    "1,25, yaitu rasio antara pengeluaran konsumsi terhadap sisa tabungan bank",
                    "0,20 (atau 20%), karena tabungan adalah sisa pendapatan yang paling aman",
                    "0,80 (atau 80%), menunjukkan 80% dari setiap tambahan pendapatan dialokasikan untuk konsumsi",
                    "4,0, karena uang yang dibelanjakan berputar empat kali lipat di warung makan"
                ],
                "correct": 2,
                "hint": "Bagi jumlah tambahan belanja dengan jumlah tambahan penghasilan yang diterima!",
                "debrief": "Tepat! $MPC = \\frac{\\Delta C}{\\Delta Y} = \\frac{800.000}{1.000.000} = 0,8$. Sisanya sebesar $0,2$ adalah <span class='econ-jargon' data-term='multiplier_effect'>Marginal Propensity to Save (MPS)</span>."
            },
            {
                "id": "s1_q8",
                "scenario": "🏭 Batas Kapasitas Produksi Nasional (Y*)",
                "question": "Apa yang terjadi pada perekonomian jika permintaan agregat (AD) terus dipacu melampaui kapasitas produksi potensial nasional ($Y^*$) saat pabrik-pabrik sudah beroperasi 100% dan pekerja sudah lembur penuh?",
                "options": [
                    "Perekonomian otomatis memasuki masa deflasi karena penawaran barang menjadi terlalu melimpah ruah",
                    "Nilai tukar mata uang domestik menguat tajam karena semua orang ingin berbelanja di dalam negeri",
                    "Terjadi Overheating perekonomian, di mana output tidak bisa bertambah lagi sehingga kelebihan permintaan meledak menjadi lonjakan inflasi yang tinggi",
                    "Impor barang seketika terhenti karena produsen domestik sanggup memenuhi seluruh pesanan pasar"
                ],
                "correct": 2,
                "hint": "Ibarat mesin mobil yang digas terus sampai jarum merah mentok: laju mobil tidak bertambah, tetapi mesinnya mengepul kepanasan!",
                "debrief": "Jenius! Ketika ekonomi melewati $Y^*$ (<span class='econ-jargon' data-term='keseimbangan_ad_as'>Output Potensial</span>), kurva AS menjadi sangat curam/tegak lurus. Setiap stimulus tambahan hanya menciptakan inflasi murni tanpa menambah barang riil."
            },
            {
                "id": "s1_q9",
                "scenario": "🌾 Panen Raya & Penurunan Harga Pangan",
                "question": "Saat panen raya serentak di Jawa dan Sulawesi, harga gabah dan beras di tingkat petani anjlok tajam. Dari analisis kurva AD-AS, pergeseran apakah yang sedang terjadi?",
                "options": [
                    "Kurva Penawaran Agregat Jangka Pendek (SRAS) bergeser ke kanan, meningkatkan kuantitas pasokan dan menurunkan tingkat harga keseimbangan",
                    "Kurva Penawaran Agregat bergeser ke kiri karena ongkos panen petani menjadi terlalu murah",
                    "Kurva Permintaan Agregat (AD) bergeser ke kiri tajam karena masyarakat berhenti mengonsumsi nasi",
                    "Kurva Keseimbangan Uang Beredar (LM) runtuh akibat kelebihan produksi komoditas pangan"
                ],
                "correct": 0,
                "hint": "Pasokan melimpah ruah di pasar mendorong penawaran bertambah, sehingga harga tertekan turun!",
                "debrief": "Tepat sekali! Panen raya adalah <em>Positive Supply Shock</em>. Kurva <span class='econ-jargon' data-term='keseimbangan_ad_as'>SRAS</span> bergeser ke kanan, meningkatkan output pangan riil dan meredakan tekanan inflasi pangan (Volatile Foods)."
            },
            {
                "id": "s1_q10",
                "scenario": "📦 Penimbunan Barang & Distorsi Pasar",
                "question": "Di tengah isu kelangkaan minyak goreng, sebagian pedagang besar menahan stok di gudang demi menjualnya dengan harga dua kali lipat pekan depan. Mengapa tindakan spekulasi ini merusak mekanisme pasar makro?",
                "options": [
                    "Karena pedagang yang menimbun barang wajib membayar pajak penghasilan dua kali lebih besar kepada kas negara",
                    "Karena barang yang disimpan di gudang secara otomatis kehilangan nilai guna fisik menurut hukum Gossen",
                    "Karena menahan pasokan secara artifisial menggeser kurva penawaran ke kiri, menciptakan kelangkaan buatan dan memicu kepanikan inflasi di masyarakat",
                    "Karena penimbunan barang secara langsung mengurangi cadangan devisa bank sentral di luar negeri"
                ],
                "correct": 2,
                "hint": "Menyembunyikan barang dari pasar membuat barang langka dan memaksa pembeli membayar harga selangit!",
                "debrief": "Tepat! Spekulasi penimbunan menahan pasokan fisik beredar, menciptakan kelangkaan semu yang memeras daya beli rakyat. Di sinilah Satgas Pangan dan kebijakan operasi pasar murah pemerintah turun tangan."
            },
            {
                "id": "s1_q11",
                "scenario": "📉 Inflasi Inti vs Inflasi Bergejolak",
                "question": "Bank Indonesia membagi inflasi IHK menjadi Inflasi Inti (Core), Inflasi Harga Diatur (Administered), dan Inflasi Bergejolak (Volatile). Manakah komponen yang mencerminkan murni tren fundamental permintaan-penawaran jangka panjang tanpa gangguan cuaca?",
                "options": [
                    "Inflasi Diatur Pemerintah (Administered Prices), karena nilainya ditetapkan melalui Keputusan Presiden",
                    "Inflasi Bergejolak (Volatile Food), karena mencerminkan harga harian cabai rawit dan bawang merah",
                    "Inflasi Musiman, yang hanya dihitung saat musim liburan sekolah dan tahun baru",
                    "Inflasi Inti (Core Inflation), yang membersihkan komponen harga pangan rentan cuaca dan harga energi yang dipatok pemerintah"
                ],
                "correct": 3,
                "hint": "Cari komponen yang stabil, tidak naik-turun karena hujan deras atau gagal panen cabai!",
                "debrief": "Benar! <span class='econ-jargon' data-term='inflasi_ihk'>Inflasi Inti</span> mengeluarkan komoditas yang harganya sangat berfluktuasi (pangan rentan cuaca) dan komoditas bersubsidi. Komponen inilah yang menjadi jangkar utama kebijakan suku bunga Bank Indonesia."
            },
            {
                "id": "s1_q12",
                "scenario": "🍞 Efek Substitusi Konsumen",
                "question": "Ketika harga daging sapi melonjak drastis, ibu rumah tangga beralih membeli daging ayam, ikan lele, dan telur sebagai lauk keluarga. Dalam ekonomi makro, perilaku ini mencerminkan:",
                "options": [
                    "Ilusi Uang (Money Illusion), di mana konsumen mengira nilai gizi ikan lele lebih tinggi daripada daging sapi",
                    "Hukum Penurunan Nilai Guna Marginal (Law of Diminishing Marginal Utility)",
                    "Efek Pendapatan Absolut, di mana keluarga tiba-tiba merasa pendapatannya bertambah banyak",
                    "Efek Substitusi (Substitution Effect), di mana konsumen mengganti barang yang mahal dengan barang pengganti yang harganya relatif lebih terjangkau"
                ],
                "correct": 3,
                "hint": "Mengganti barang mahal dengan alternatif yang fungsinya mirip untuk menghemat uang belanja!",
                "debrief": "Tepat! Efek substitusi adalah mekanisme pertahanan alami rumah tangga untuk menjaga kecukupan konsumsi riil saat salah satu komoditas mengalami lonjakan harga."
            },
            {
                "id": "s1_q13",
                "scenario": "💵 Gaji Naik tapi Daya Beli Turun",
                "question": "Pak Joko mendapat kenaikan gaji dari kantornya sebesar 5% tahun ini. Namun, tingkat inflasi tahunan di kotanya tercatat sebesar 7%. Apakah yang sebenarnya terjadi pada upah riil Pak Joko?",
                "options": [
                    "Upah riil Pak Joko turun sebesar 35% karena dihitung dari hasil perkalian gaji dan inflasi",
                    "Upah riil Pak Joko meningkat sebesar 12% karena efek akumulasi upah dan inflasi",
                    "Upah riil Pak Joko mengalami penurunan sekitar 2%, sehingga daya beli keranjang belanja fisiknya justru berkurang",
                    "Upah riil Pak Joko tidak berubah karena nominal gaji di rekening banknya tetap bertambah 5%"
                ],
                "correct": 2,
                "hint": "Uang nominal di dompet bertambah, tetapi harga barang di toko naik lebih cepat daripada kenaikan uangmu!",
                "debrief": "Tepat! Upah riil = Upah Nominal - Inflasi: $5\\% - 7\\% = -2\\%$. Kenaikan gaji Pak Joko tergerus oleh <span class='econ-jargon' data-term='daya_beli'>Inflasi</span>, sehingga jumlah barang fisik yang bisa dibelinya justru lebih sedikit daripada tahun lalu."
            },
            {
                "id": "s1_q14",
                "scenario": "🚚 Rantai Pasok Logistik Antar-Pulau",
                "question": "Indonesia adalah negara kepulauan. Mengapa disparitas harga cabai atau semen antara pulau Jawa dan pulau terluar (seperti Papua) bisa sangat tinggi padahal uang yang digunakan sama-sama Rupiah?",
                "options": [
                    "Tingkat suku bunga kredit perbankan di pulau Jawa dipatok nol persen oleh pemerintah",
                    "Penduduk pulau terluar memiliki kebiasaan menolak membeli barang yang diproduksi di luar daerahnya",
                    "Adanya perbedaan nilai tukar mata uang Rupiah khusus Papua terhadap Rupiah pulau Jawa",
                    "Tingginya biaya logistik dan transportasi laut antar-pulau serta belum meratanya konektivitas rantai pasok (Supply Chain Frictions)"
                ],
                "correct": 3,
                "hint": "Membawa barang menyeberangi lautan butuh kapal kargo, bahan bakar, dan waktu tempuh yang memakan biaya!",
                "debrief": "Benar! Konektivitas maritim dan tol laut adalah kunci integrasi pasar nasional. Biaya logistik yang mahal menggeser kurva penawaran lokal ke kiri, melipatgandakan harga barang di wilayah terluar."
            },
            {
                "id": "s1_q15",
                "scenario": "⚖️ Hukum Engel & Pengeluaran Pangan",
                "question": "Menurut Hukum Engel (Engel's Law) dalam teori konsumsi, apa yang terjadi pada proporsi pengeluaran untuk makanan ketika pendapatan suatu keluarga meningkat pesat?",
                "options": [
                    "Persentase pendapatan yang dihabiskan untuk membeli makanan cenderung menurun, sementara proporsi untuk pendidikan, rekreasi, dan tabungan meningkat",
                    "Persentase pengeluaran untuk makanan akan meningkat tajam melampaui seluruh pos pengeluaran lainnya",
                    "Seluruh tambahan pendapatan otomatis dibelanjakan untuk bahan pangan pokok pokok bersubsidi",
                    "Jumlah uang nominal yang dibelanjakan untuk makanan akan berkurang hingga menyentuh angka nol"
                ],
                "correct": 0,
                "hint": "Orang kaya makan makanan enak, tetapi perut mereka punya batas kenyang; sisa kekayaannya lari ke investasi, gadget, dan liburan!",
                "debrief": "Luar biasa! Hukum Engel membuktikan bahwa seiring naiknya kemakmuran, porsi belanja pangan dalam total anggaran keluarga menyusut, dialihkan ke barang tersier dan investasi."
            },
            {
                "id": "s1_q16",
                "scenario": "🛒 QRIS & Perputaran Uang Harian",
                "question": "Dalam persamaan kuantitas uang $M \\cdot V = P \\cdot Y$, adopsi massal pembayaran digital seperti QRIS di warung-warung dan UMKM secara teoritis berdampak pada variabel apa?",
                "options": [
                    "Menghilangkan komponen Jumlah Uang Beredar (M) dari sistem perbankan nasional",
                    "Meningkatkan Kecepatan Perputaran Uang (Velocity of Money / V), karena transaksi berlangsung seketika tanpa jeda uang kembalian tunai",
                    "Menurunkan Tingkat Harga (P) hingga mendekati nol persen secara otomatis di seluruh pedagang",
                    "Menurunkan Output Riil Nasional (Y) karena uang digital dianggap tidak memiliki wujud fisik nyata"
                ],
                "correct": 1,
                "hint": "Uang digital berpindah tangan dalam hitungan detik dari pembeli ke penjual lalu ke pemasok bahan baku!",
                "debrief": "Tepat! Digitalisasi pembayaran melipatgandakan <span class='econ-jargon' data-term='teori_kuantitas_uang'>Kecepatan Perputaran Uang (Velocity / V)</span>. Uang berpindah tangan jauh lebih efisien, memperlancar peredaran transaksi sektor riil."
            },
            {
                "id": "s1_q17",
                "scenario": "🏘️ Tabungan Nasional & Investasi",
                "question": "Dalam perekonomian tertutup tanpa perdagangan luar negeri, keseimbangan pasar dana pinjaman (Loanable Funds) menyatakan bahwa total Investasi riil (I) harus didanai oleh:",
                "options": [
                    "Pencetakan uang kertas baru oleh kementerian perindustrian",
                    "Peningkatan suku bunga deposito perbankan hingga batas tertinggi",
                    "Penarikan utang luar negeri dalam mata uang Dolar Amerika Serikat",
                    "Total Tabungan Nasional (S), yang merupakan gabungan tabungan swasta dan tabungan pemerintah"
                ],
                "correct": 3,
                "hint": "Untuk membangun pabrik atau jembatan, harus ada dana tabungan yang dihimpun dari masyarakat dan surplus anggaran negara!",
                "debrief": "Tepat! Identitas makro dasar: $S = I$. Investasi fisik membutuhkan penundaan konsumsi saat ini (Tabungan) untuk diubah menjadi modal produktif yang menghasilkan di masa depan."
            },
            {
                "id": "s1_q18",
                "scenario": "📈 Indeks Harga Konsumen (IHK)",
                "question": "Bagaimanakah Badan Pusat Statistik (BPS) menghitung laju inflasi bulanan dan tahunan di Indonesia?",
                "options": [
                    "Menghitung rata-rata kenaikan harga seluruh saham yang terdaftar di Bursa Efek Indonesia",
                    "Mengukur selisih antara nilai ekspor batu bara dan nilai impor minyak mentah internasional",
                    "Mencatat perubahan harga dari sekeranjang paket komoditas barang dan jasa yang paling sering dikonsumsi rumah tangga perkotaan dan perdesaan",
                    "Menjumlahkan total kenaikan gaji pegawai negeri sipil dan anggota militer dalam satu tahun fiskal"
                ],
                "correct": 2,
                "hint": "BPS memantau ratusan barang belanjaan dapur, tarif sewa, biaya sekolah, dan ongkos angkutan di puluhan kota!",
                "debrief": "Benar! <span class='econ-jargon' data-term='inflasi_ihk'>Indeks Harga Konsumen (IHK)</span> memantau keranjang belanja representatif keluarga Indonesia. Kenaikan persentase IHK dari waktu ke waktu itulah yang disebut angka Inflasi resmi."
            },
            {
                "id": "s1_q19",
                "scenario": "⚠️ Ilusi Uang (Money Illusion)",
                "question": "Seorang buruh merasa dirinya jauh lebih kaya karena upahnya naik 10%, padahal di saat bersamaan harga seluruh barang di pasar naik 15%. Buruh tersebut sedang mengalami fenomena psikologis ekonomi yang disebut:",
                "options": [
                    "Risk Aversion (Penghindaran Risiko), di mana buruh takut menyimpan uangnya di bank pemerintah",
                    "Rasionalitas Terikat (Bounded Rationality), di mana buruh menolak membelanjakan uangnya di warung",
                    "Hyper-Rationality, yaitu kalkulasi matematis yang melampaui kemampuan analitis pasar",
                    "Money Illusion (Ilusi Uang), yaitu kecenderungan memandang uang dari nilai nominalnya ketimbang daya beli riilnya"
                ],
                "correct": 3,
                "hint": "Tertipu oleh angka nominal di slip gaji yang bertambah, tanpa menyadari tas belanjaannya justru makin kosong!",
                "debrief": "Tepat! Ekonom Irving Fisher memperkenalkan konsep <em>Money Illusion</em>: manusia sering terpukau oleh angka nominal uang, lupa bahwa yang menentukan kesejahteraan adalah jumlah barang fisik yang bisa dibeli."
            },
            {
                "id": "s1_q20",
                "scenario": "🏗️ Investasi Swasta & Suku Bunga",
                "question": "Jika bank sentral menaikkan suku bunga acuan secara signifikan, bagaimana pengaruh langsungnya terhadap rencana pengusaha membuka cabang toko atau pabrik baru (Investasi / I)?",
                "options": [
                    "Rencana investasi cenderung ditunda atau dikurangi karena biaya bunga pinjaman bank (Cost of Capital) menjadi lebih mahal",
                    "Pengusaha akan meminjam uang sebanyak-banyaknya karena bunga bank yang tinggi dianggap sebagai simbol prestise bisnis",
                    "Investasi fisik pabrik otomatis melonjak karena mesin-mesin produksi menjadi lebih murah harganya",
                    "Pengusaha tidak terpengaruh sama sekali karena seluruh modal bisnis di Indonesia berasal dari hibah cuma-cuma"
                ],
                "correct": 0,
                "hint": "Meminjam modal kerja di bank jadi lebih mahal bunganya, sehingga proyek yang untungnya tipis jadi tidak layak jalan!",
                "debrief": "Benar! Suku bunga adalah harga dari modal kerja (<span class='econ-jargon' data-term='transmisi_moneter'>Cost of Capital</span>). Bunga tinggi menaikkan beban cicilan kredit investasi ($I$), menahan laju ekspansi fisik dunia usaha."
            },
            {
                "id": "s1_q21",
                "scenario": "🥛 Barang Inferior di Masa Sulit",
                "question": "Ketika terjadi resesi dan pendapatan riil masyarakat menurun, penjualan ikan sarden kalengan dan mi instan justru melonjak tajam. Dalam klasifikasi ekonomi mikro-makro, barang-barang tersebut digolongkan sebagai:",
                "options": [
                    "Barang Inferior (Inferior Goods), yaitu barang yang permintaannya justru naik ketika pendapatan masyarakat menurun",
                    "Barang Publik (Public Goods), yang disediakan gratis oleh pemerintah daerah di balai desa",
                    "Barang Komplementer Sempurna, yang wajib dikonsumsi bersamaan dengan emas batangan",
                    "Barang Mewah (Veblen Goods), yang dibeli masyarakat demi memamerkan status sosial di lingkungan sekitar"
                ],
                "correct": 0,
                "hint": "Saat kantong menipis, orang beralih dari makan di restoran steak mewah ke mi instan dan makanan kaleng murah!",
                "debrief": "Tepat sekali! Barang inferior memiliki elastisitas pendapatan negatif. Saat resesi melanda, konsumen menurunkan standar belanjanya ke komoditas murah yang mengenyangkan."
            },
            {
                "id": "s1_q22",
                "scenario": "🛡️ Pasar Monopoli Alami & Tarif PLN",
                "question": "Mengapa tarif listrik untuk rumah tangga dan industri tidak diserahkan pada mekanisme pasar bebas multi-operator, melainkan diatur tunggal oleh PT PLN dengan persetujuan pemerintah?",
                "options": [
                    "Transmisi listrik adalah Monopoli Alami (Natural Monopoly) dengan biaya investasi jaringan tiang kawat raksasa yang tidak efisien diduplikasi oleh banyak perusahaan swasta",
                    "Karena pasokan listrik di Indonesia 100% diproduksi dari pembangkit tenaga nuklir swasta luar negeri",
                    "Agar pemerintah dapat menaikkan tarif listrik setiap pekan tanpa perlu berkonsultasi dengan DPR",
                    "Karena listrik dianggap sebagai barang mewah yang hanya boleh dikonsumsi oleh kalangan berpenghasilan tinggi"
                ],
                "correct": 0,
                "hint": "Bayangkan jika setiap rumah punya 5 kabel tiang listrik dari 5 perusahaan berbeda di depan pagarnya—sangat boros dan berantakan!",
                "debrief": "Sangat tepat! <span class='econ-jargon' data-term='monopoli_alami'>Monopoli Alami</span> terjadi ketika skala ekonomi (Economies of Scale) begitu besar sehingga satu produsen tunggal lebih efisien melayani seluruh pasar, namun wajib diregulasi ketat oleh negara."
            },
            {
                "id": "s1_q23",
                "scenario": "🍎 Kegagalan Pasar (Market Failure) & Eksternalitas",
                "question": "Sebuah pabrik tapioka membuang limbah cair ke sungai desa tanpa pengolahan, mencemari air minum dan mematikan kolam ikan warga sekitar. Dalam analisis ekonomi, fenomena ini disebut:",
                "options": [
                    "Efisiensi Alokasi Pareto Optimal, di mana keuntungan pabrik secara otomatis mengganti rugi warga desa",
                    "Keseimbangan Pasar Bersih, di mana harga tapioka di pasar menjadi terlalu mahal akibat denda pemerintah",
                    "Tragedi Barang Bebas (Tragedy of Commons), di mana warga desa secara sengaja mencemari air minumnya sendiri",
                    "Eksternalitas Negatif (Negative Externality), di mana biaya sosial polusi ditanggung masyarakat tanpa dibayar oleh pabrik"
                ],
                "correct": 3,
                "hint": "Pabrik yang untung dapat uang, tetapi warga yang rugi menanggung bau busuk dan penyakit tanpa kompensasi!",
                "debrief": "Benar! Polusi adalah contoh klasik eksternalitas negatif. Mekanisme pasar bebas gagal memperhitungkan biaya lingkungan, sehingga pemerintah wajib mengenakan pajak polusi atau denda Amdal."
            },
            {
                "id": "s1_q24",
                "scenario": "📉 Paradoks Berhemat (Paradox of Thrift)",
                "question": "Jika seluruh warga negara secara serentak memutuskan untuk memangkas belanja konsumsi dan menabung 90% dari pendapatannya saat ancaman resesi tiba, apa yang akan terjadi pada PDB nasional menurut teori Keynesian?",
                "options": [
                    "Pengangguran seketika hilang karena bank akan menggunakan uang tabungan untuk mempekerjakan seluruh warga",
                    "Perekonomian otomatis mencapai keseimbangan emas tanpa perlu adanya produksi barang fisik lagi",
                    "Total PDB dan pendapatan nasional justru akan anjlok tajam karena belanja satu orang adalah pendapatan bagi orang lain, sehingga toko-toko bangkrut massal",
                    "PDB nasional akan langsung melonjak dua kali lipat karena bank memiliki cadangan uang kertas yang tak terbatas"
                ],
                "correct": 2,
                "hint": "Bila tidak ada satu pun orang yang mau jajan di warung, warung tutup, pekerjanya di-PHK, dan ekonomi lumpuh total!",
                "debrief": "Jenius! Ini adalah <span class='econ-jargon' data-term='keseimbangan_ad_as'>Paradox of Thrift</span> John Maynard Keynes. Menabung itu bijak bagi individu, tetapi jika seluruh masyarakat menolak belanja serempak, permintaan agregat ($AD$) runtuh dan memicu resesi hebat."
            },
            {
                "id": "s1_q25",
                "scenario": "🌾 Operasi Pasar Bulog & Stabilisasi Harga",
                "question": "Menjelang panen yang tertunda akibat kekeringan, Perum Bulog menggelar Operasi Pasar Murah dengan menjual beras cadangan pemerintah (CBP) langsung ke konsumen. Dari sisi kurva pasar, tindakan ini bertujuan untuk:",
                "options": [
                    "Memaksa pedagang beras tradisional menutup tokonya secara permanen",
                    "Menambah pasokan beras fisik di pasar (menggeser penawaran ke kanan) guna meredam kenaikan harga spekulatif",
                    "Menarik seluruh peredaran uang kertas Rupiah dari dompet ibu rumah tangga",
                    "Membeli beras dari luar negeri dengan harga setinggi-tingginya untuk disimpan di gudang"
                ],
                "correct": 1,
                "hint": "Mengguyur pasar dengan beras stok gudang agar barang melimpah dan harga tidak melambung liar!",
                "debrief": "Tepat! Bulog bertindak sebagai <em>Stabilizer</em> pasokan pangan. Guyuran pasokan fisik meredam kepanikan pasar dan menggeser penawaran ke kanan, menjaga stabilitas harga pangan pokok."
            },
            {
                "id": "s1_q26",
                "scenario": "📊 Indeks Keyakinan Konsumen (IKK)",
                "question": "Bank Indonesia rutin merilis Indeks Keyakinan Konsumen (IKK). Jika angka IKK berada di atas level 100 (misalnya 124,5), apakah arti ekonomi dari data tersebut?",
                "options": [
                    "Konsumen sedang dalam kondisi panik dan bersiap menarik seluruh tabungannya dari perbankan nasional",
                    "Pemerintah diwajibkan menyalurkan bantuan sosial tunai darurat kepada seluruh lapisan masyarakat",
                    "Konsumen berada di zona optimis terhadap kondisi ekonomi dan ketersediaan lapangan kerja, sehingga belanja konsumsi diperkirakan tumbuh solid",
                    "Tingkat inflasi di pasar telah melampaui batas toleransi 100% per tahun"
                ],
                "correct": 2,
                "hint": "Angka di atas 100 berarti kelompok yang optimis jauh lebih banyak daripada kelompok yang pesimis!",
                "debrief": "Tepat! Angka 100 adalah garis batas netral. IKK > 100 mengindikasikan optimisme konsumen, yang menjadi sinyal kuat bahwa motor konsumsi rumah tangga ($C$) akan terus berputar kencang."
            },
            {
                "id": "s1_q27",
                "scenario": "🏛️ Barang Publik (Public Goods) & Jalan Raya",
                "question": "Mengapa jalan raya nasional, lampu penerangan jalan, dan mercusuar di laut digolongkan sebagai Barang Publik murni?",
                "options": [
                    "Karena barang-barang tersebut hanya boleh dilewati oleh kendaraan dinas milik pejabat kementerian",
                    "Karena setiap orang yang melintas di jalan raya wajib membayar tiket retribusi per meter jalan",
                    "Karena jalan raya diproduksi langsung oleh perusahaan swasta untuk diperjualbelikan dengan keuntungan maksimal",
                    "Karena bersifat Non-Rival (penggunaan oleh satu orang tidak mengurangi jatah orang lain) dan Non-Excludable (sulit melarang orang lain memanfaatkannya)"
                ],
                "correct": 3,
                "hint": "Satu kapal melihat cahaya mercusuar tidak membuat kapal lain kehilangan cahaya, dan tidak bisa dipungut karcis di tengah laut!",
                "debrief": "Benar! Dua sifat utama barang publik: <em>Non-Rival</em> dan <em>Non-Excludable</em>. Karena pasar swasta tidak bisa menarik untung langsung, barang publik harus dibiayai oleh pajak negara melalui APBN."
            },
            {
                "id": "s1_q28",
                "scenario": "📈 Elastisitas Permintaan Beras",
                "question": "Beras di Indonesia merupakan makanan pokok utama dengan elastisitas harga permintaan yang inelastis ($|E_d| < 1$). Apa artinya hal ini bagi anggaran belanja keluarga ketika harga beras naik 20%?",
                "options": [
                    "Keluarga akan langsung berhenti mengonsumsi beras dan menggantinya 100% dengan roti gandum impor",
                    "Total pengeluaran keluarga untuk pos beras justru menyusut drastis karena menolak makan",
                    "Keluarga tetap akan membeli beras dalam jumlah yang relatif sama, sehingga mereka terpaksa mengorbankan pos pengeluaran lain seperti rekreasi atau pakaian",
                    "Keluarga akan melipatgandakan pembelian beras hingga tiga kali lipat dari kebutuhan biasanya"
                ],
                "correct": 2,
                "hint": "Orang Indonesia merasa 'belum makan kalau belum makan nasi', jadi harga beras naik pun tetap harus dibeli!",
                "debrief": "Tepat! Permintaan inelastis berarti persentase penurunan jumlah yang dibeli jauh lebih kecil dibanding persentase kenaikan harga. Inilah mengapa inflasi beras sangat memukul daya beli rakyat miskin."
            },
            {
                "id": "s1_q29",
                "scenario": "👥 Rasio Gini & Ketimpangan Pengeluaran",
                "question": "Badan Pusat Statistik (BPS) merilis angka Rasio Gini (Gini Coefficient) Indonesia sebesar 0,381. Apakah makna dari koefisien Gini dalam kacamata pembangunan ekonomi makro?",
                "options": [
                    "Mengukur persentase penerimaan pajak negara yang berhasil dikumpulkan oleh Direktorat Jenderal Pajak",
                    "Mengukur persentase jumlah pengangguran terbuka yang belum mendapatkan pekerjaan tetap di sektor formal",
                    "Mengukur derajat ketimpangan distribusi pendapatan/pengeluaran antar-penduduk, di mana angka 0 berarti merata sempurna dan 1 berarti timpang mutlak",
                    "Mengukur rasio antara total utang luar negeri pemerintah terhadap Produk Domestik Bruto tahunan"
                ],
                "correct": 2,
                "hint": "Makin mendekati angka 0 makin merata, makin mendekati angka 1 berarti kekayaan menumpuk di segelintir konglomerat!",
                "debrief": "Tepat sekali! <span class='econ-jargon' data-term='rasio_gini'>Rasio Gini</span> adalah tolok ukur kesenjangan sosial. Pertumbuhan PDB tinggi tidak bermakna banyak jika rasio Gini melebar tajam, yang berarti hasil kue pembangunan hanya dinikmati segelintir orang kaya."
            },
            {
                "id": "s1_q30",
                "scenario": "🏪 Sektor Informal & Bantalan Sosial",
                "question": "Di Indonesia, lebih dari 59% tenaga kerja bekerja di sektor informal (pedagang kaki lima, warung kelontong, ojek daring). Apa fungsi makro terpenting dari sektor informal saat ekonomi formal dilanda krisis PHK massal?",
                "options": [
                    "Bertindak sebagai bantalan penyerap tenaga kerja darurat (Shock Absorber) yang mencegah jutaan orang kehilangan seluruh mata pencaharian seketika",
                    "Menyumbang devisa ekspor terbesar bagi cadangan devisa bank sentral di luar negeri",
                    "Menjadi pembeli utama surat utang negara tenor jangka panjang di pasar modal",
                    "Menghilangkan kebutuhan pemerintah untuk menyalurkan beras bantuan sosial di daerah rawan pangan"
                ],
                "correct": 0,
                "hint": "Saat pabrik garmen tutup dan merumahkan ribuan buruh, mereka membuka warung kopi atau jualan gorengan agar dapur tetap ngebul!",
                "debrief": "Luar biasa! Sektor informal adalah <em>Safety Net</em> alami bangsa. Kelenturannya menyerap limpahan tenaga kerja korban PHK pabrik formal menjaga stabilitas sosial dan perputaran konsumsi di tingkat akar rumput."
            },
            {
                "id": "s1_q31",
                "scenario": "💡 Biaya Menu (Menu Costs) & Friksi Harga",
                "question": "Mengapa pedagang warteg atau kedai kopi tidak menaikkan harga secangkir kopi setiap jam saat harga gula di pasar berfluktuasi naik-turun beberapa rupiah?",
                "options": [
                    "Karena bank sentral melarang pedagang makanan eceran mengubah harga sebelum mendapat izin bupati",
                    "Adanya Biaya Menu (Menu Costs), yaitu biaya mencetak daftar harga baru, risiko komplain pelanggan, dan friksi operasional penyesuaian harga",
                    "Karena harga gula pasir tidak memiliki korelasi apa pun terhadap biaya produksi secangkir kopi manis",
                    "Karena pedagang kopi diwajibkan oleh undang-undang mempertahankan harga tetap selama sepuluh tahun"
                ],
                "correct": 1,
                "hint": "Mengganti spanduk daftar menu dan menjelaskan harga baru ke pelanggan setiap hari itu merepotkan dan bisa bikin pembeli kabur!",
                "debrief": "Tepat! Teori Keynesian Baru menjelaskan kekakuan harga (Price Stickiness) salah satunya melalui <em>Menu Costs</em>. Biaya administrasi dan reputasi membuat pengusaha menahan penyesuaian harga hingga ambang batas tertentu."
            },
            {
                "id": "s1_q32",
                "scenario": "🌧️ Fenomena El Nino & Siklus Pangan",
                "question": "Anomali cuaca El Nino ekstrem yang memicu kemarau panjang berkepanjangan di Asia Tenggara berdampak pada perekonomian makro melalui jalur:",
                "options": [
                    "Guncangan Penawaran Agregat Negatif (Negative Supply Shock), menyebabkan gagal panen padi dan lonjakan harga pangan pokok secara serempak",
                    "Penurunan rasio utang luar negeri pemerintah akibat berkurangnya konsumsi air bersih masyarakat",
                    "Kenaikan suku bunga acuan bank sentral Amerika Serikat The Fed secara otomatis",
                    "Lonjakan Permintaan Agregat (Demand Shock) karena masyarakat ingin membeli lebih banyak beras saat cuaca panas"
                ],
                "correct": 0,
                "hint": "Kemarau panjang membakar sawah, panen gagal, gabah langka di pasar, harga beras melonjak tinggi!",
                "debrief": "Benar! El Nino adalah guncangan pasokan fisik riil. Dalam jangka pendek, ini mendorong kurva AS ke kiri, memicu inflasi pangan yang harus diantisipasi pemerintah melalui manajemen cadangan pangan."
            },
            {
                "id": "s1_q33",
                "scenario": "🌾 Subsidi Pupuk & Kurva Penawaran",
                "question": "Pemerintah mengucurkan subsidi pupuk kimia dan bibit unggul kepada jutaan petani padi di pedesaan. Bagaimana dampak fiskal ini terhadap kurva penawaran agregat pangan nasional?",
                "options": [
                    "Menurunkan biaya produksi petani, sehingga menggeser kurva penawaran pangan ke kanan dan menahan kenaikan harga beras di pasar",
                    "Menggeser kurva penawaran ke kiri karena petani menjadi malas menanam padi setelah mendapat pupuk murah",
                    "Mengurangi total output panen nasional karena pupuk subsidi dilarang digunakan untuk tanaman pangan pokok",
                    "Menaikkan tingkat inflasi pangan hingga dua kali lipat akibat bertambahnya jumlah uang beredar di desa"
                ],
                "correct": 0,
                "hint": "Bantuan pupuk murah memangkas ongkos tanam petani, membuat hasil panen lebih melimpah dan harga jual lebih bersahabat!",
                "debrief": "Tepat sekali! Subsidi input produksi bekerja langsung pada sisi penawaran (Supply-Side Policy). Penurunan ongkos produksi menggeser kurva penawaran ke kanan, meningkatkan output panen sekaligus menekan inflasi."
            },
            {
                "id": "s1_q34",
                "scenario": "📈 PDB Per Kapita vs Kesejahteraan Nyata",
                "question": "PDB per kapita Indonesia mencapai sekitar US$ 4.900 per tahun. Mengapa angka rata-rata matematis ini tidak serta-merta mencerminkan bahwa setiap individu warga negara menikmati penghasilan setara nilai tersebut?",
                "options": [
                    "Karena nilai PDB per kapita selalu dihitung menggunakan mata uang palsu yang tidak diakui dunia internasional",
                    "Karena PDB per kapita hanya mencatat penghasilan pegawai kementerian dan aparat penegak hukum saja",
                    "Karena PDB per kapita hanyalah rata-rata agregat yang mengabaikan ketimpangan distribusi pendapatan antara kelompok konglomerat dan rakyat miskin",
                    "Karena seluruh PDB per kapita secara otomatis dipotong oleh kas negara sebagai pungutan pajak wajib"
                ],
                "correct": 2,
                "hint": "Bila ada 1 orang berpenghasilan Rp 1 miliar dan 99 orang berpenghasilan Rp 1 juta, rata-ratanya tampak tinggi padahal 99 orang hidup pas-pasan!",
                "debrief": "Sangat tepat! Rata-rata matematis dapat mengaburkan realitas. Inilah mengapa selain PDB per kapita, teknokrat wajib memantau <span class='econ-jargon' data-term='rasio_gini'>Rasio Gini</span>, Indeks Pembangunan Manusia (IPM), dan tingkat kemiskinan ekstrem."
            },
            {
                "id": "s1_q35",
                "scenario": "🏦 Inklusi Keuangan & Tabungan Formal",
                "question": "Pemerintah gencar mendorong program inklusi keuangan, seperti pembukaan rekening bank bagi pelajar dan agen bank laku pandai di pelosok desa. Dari kacamata intermediasi makro, apa manfaat utamanya?",
                "options": [
                    "Memaksa masyarakat pedesaan meminjam uang berbunga tinggi untuk kebutuhan konsumtif semata",
                    "Menghapus seluruh peredaran uang kertas Rupiah dan menggantinya dengan koin emas murni",
                    "Memobilisasi dana idle yang sebelumnya disimpan di bawah bantal ke dalam sistem perbankan resmi untuk disalurkan menjadi kredit produktif UMKM",
                    "Menjamin bahwa seluruh warga desa otomatis terbebas dari pembayaran pajak selamanya"
                ],
                "correct": 2,
                "hint": "Uang receh yang mengendap di kaleng biskuit disatukan ke bank, menjadi triliunan rupiah modal kerja bagi pembangunan pabrik dan usaha rakyat!",
                "debrief": "Tepat! Inklusi keuangan mengubah <em>Dead Capital</em> menjadi modal aktif. Dana masyarakat yang terhimpun di bank memperbesar kapasitas penyaluran kredit investasi ($I$) bagi perekonomian nasional."
            },
            {
                "id": "s1_q36",
                "scenario": "👑 Sasaran Pamungkas Keseimbangan Makro",
                "question": "Di akhir pembelajaran Level 1, apakah tujuan pamungkas dari upaya menjaga stabilitas harga (inflasi rendah) dan pertumbuhan Produk Domestik Bruto (PDB) yang berkelanjutan?",
                "options": [
                    "Memastikan kas bendahara kementerian keuangan selalu mencatatkan keuntungan investasi terbesar di dunia",
                    "Menghapus seluruh kegiatan perdagangan internasional agar bangsa hidup mandiri tanpa berhubungan dengan bangsa lain",
                    "Menjaga agar seluruh harga barang dan jasa di pasar tidak pernah bergerak naik maupun turun selamanya",
                    "Melindungi daya beli riil rakyat banyak, menciptakan lapangan kerja produktif yang luas, dan mengentaskan kemiskinan menuju kemakmuran bersama"
                ],
                "correct": 3,
                "hint": "Ekonomi tumbuh bukan untuk angka statistik semata, melainkan agar dapur rakyat terus mengepul dan anak bangsa punya masa depan cerah!",
                "debrief": "Luar biasa! Inilah esensi sejati ilmu ekonomi makro: bukan sekadar angka dan grafik di atas kertas, melainkan mandat moral untuk memakmurkan kehidupan seluruh rakyat Indonesia!"
            }
        ]
    },
    {
        "id": 2,
        "title": "Level 2: 🏦 Markas Rahasia Bank Sentral",
        "subtitle": "Mengendalikan Suku Bunga BI-Rate, Bunga Bank, dan Nilai Rupiah",
        "theme": "central_bank",
        "unlocks": "Gelar: Ahli Moneter & Perbankan 🏦",
        "questionPool": [
            {
                "id": "s2_q1",
                "scenario": "🎯 Mandat Tunggal Bank Indonesia",
                "question": "Menurut Undang-Undang Bank Indonesia dan UU P2SK, apakah tujuan utama dan tunggal dari Bank Indonesia sebagai bank sentral Republik Indonesia?",
                "options": [
                    "Mencetak keuntungan laba deviden sebesar-besarnya untuk disetorkan langsung ke kas pendapatan negara APBN",
                    "Mencapai dan memelihara kestabilan nilai Rupiah (stabilitas harga/inflasi dan stabilitas nilai tukar terhadap mata uang lain)",
                    "Memberikan pinjaman kredit konsumsi langsung dengan bunga nol persen kepada seluruh pengusaha swasta nasional",
                    "Mengambil alih kepemilikan seluruh bank umum swasta nasional dan mengelolanya sebagai badan usaha milik negara"
                ],
                "correct": 1,
                "hint": "Fokus utama bank sentral adalah menjaga agar uang tidak kehilangan nilainya akibat digerogoti inflasi atau kurs yang ambruk!",
                "debrief": "Tepat sekali! Mandat konstitusional Bank Indonesia adalah mencapai dan memelihara <span class='econ-jargon' data-term='transmisi_moneter'>Kestabilan Nilai Rupiah</span>, baik terhadap keranjang barang domestik (Inflasi IHK) maupun terhadap mata uang asing (Kurs Valas)."
            },
            {
                "id": "s2_q2",
                "scenario": "🏦 Efek Kenaikan BI-Rate pada Tabungan",
                "question": "Ketika Rapat Dewan Gubernur Bank Indonesia memutuskan menaikkan BI-Rate sebesar 50 basis poin (0,50%), bagaimana respon tipikal nasabah perbankan terhadap keputusan tersebut?",
                "options": [
                    "Masyarakat cenderung menambah simpanan deposito karena imbal hasil bunga tabungan lebih memikat, sehingga menahan laju belanja konsumsi berlebih",
                    "Masyarakat menolak menyimpan uang di bank karena bunga simpanan yang tinggi dianggap membebani kas tabungan",
                    "Masyarakat berbondong-bondong menarik seluruh uang tabungannya untuk dibelanjakan barang mewah secara tunai",
                    "Nasabah secara otomatis mengonversi seluruh tabungan rupiahnya menjadi mata uang kripto luar negeri"
                ],
                "correct": 0,
                "hint": "Bunga tabungan naik membuat orang lebih bersemangat menabung di bank ketimbang menghabiskan uang untuk foya-foya!",
                "debrief": "Benar! Kenaikan suku bunga acuan menaikkan suku bunga simpanan/deposito. Ini meredam konsumsi agregat ($C$), mengerem laju peredaran uang, dan menstabilkan inflasi."
            },
            {
                "id": "s2_q3",
                "scenario": "⚙️ Saluran Transmisi Suku Bunga",
                "question": "Jelaskan urutan transmisi kebijakan moneter sejak Bank Indonesia menaikkan BI-Rate hingga terasa dampaknya pada penurunan inflasi di warung pasar tradisional!",
                "options": [
                    "BI-Rate naik $\\to$ Harga beras di warung langsung diturunkan oleh polisi $\\to$ Gaji buruh pabrik dinaikkan $\\to$ Inflasi selesai",
                    "BI-Rate naik $\\to$ Bunga Pasar Uang & Deposito naik $\\to$ Bunga Kredit Bank naik $\\to$ Permintaan pinjaman modal turun $\\to$ Belanja agregat melambat $\\to$ Tekanan inflasi mereda",
                    "BI-Rate naik $\\to$ Kementerian Keuangan mencetak obligasi gratis $\\to$ Bunga bank turun nol persen $\\to$ Inflasi terkendali",
                    "BI-Rate naik $\\to$ Seluruh uang kertas di masyarakat ditarik dan dibakar $\\to$ Kurs dolar menguat $\\to$ Pasar tutup"
                ],
                "correct": 1,
                "hint": "Kenaikan suku bunga merambat pelan-pelan dari bank sentral, ke bank umum, ke peminjam kredit, lalu ke toko-toko!",
                "debrief": "Sangat tepat! Ini adalah <span class='econ-jargon' data-term='transmisi_moneter'>Jalur Transmisi Suku Bunga</span> (Interest Rate Channel). Butuh waktu tenggang (time lag 1-4 kuartal) bagi kebijakan moneter untuk merambat penuh ke sektor riil."
            },
            {
                "id": "s2_q4",
                "scenario": "📉 Menolong Resesi: Moneter Ekspansif",
                "question": "Ketika perekonomian dilanda resesi berat dan banyak pabrik merumahkan pekerja, kebijakan moneter apakah yang seharusnya diambil oleh Bank Indonesia untuk memulihkan ekonomi?",
                "options": [
                    "Melarang bank menyalurkan kredit perumahan dan kredit usaha rakyat ke sektor riil",
                    "Kebijakan Moneter Ketat (Hawkish / Contractionary), dengan menaikkan suku bunga hingga setinggi-tingginya",
                    "Membekukan seluruh rekening giro dan tabungan perbankan swasta agar uang tidak keluar dari bank",
                    "Kebijakan Moneter Longgar (Dovish / Expansionary), dengan menurunkan suku bunga acuan dan melonggarkan likuiditas perbankan"
                ],
                "correct": 3,
                "hint": "Saat ekonomi lesu darah, bank sentral harus menyuntikkan vitamin: bunga diturunkan agar pengusaha berani pinjam modal dan menyerap pekerja!",
                "debrief": "Tepat! Kebijakan moneter ekspansif memangkas biaya modal (<span class='econ-jargon' data-term='transmisi_moneter'>Cost of Capital</span>), memicu gairah investasi ($I$) dan konsumsi ($C$) untuk mengangkat kembali ekonomi dari jurang resesi."
            },
            {
                "id": "s2_q5",
                "scenario": "🪤 Perangkap Likuiditas (Liquidity Trap)",
                "question": "Mengapa ketika suku bunga acuan sudah dipangkas hingga menyentuh angka 0% (Zero Lower Bound), kebijakan penurunan bunga lebih lanjut tidak lagi efektif memicu pinjaman baru?",
                "options": [
                    "Karena pemerintah kehilangan wewenang untuk menerbitkan obligasi negara saat bunga menyentuh angka nol",
                    "Karena sistem komputer bank sentral tidak mampu memproses angka suku bunga di bawah satu persen",
                    "Karena perekonomian terjebak Liquidity Trap, di mana pelaku usaha sangat pesimis sehingga lebih memilih memegang uang tunai ketimbang meminjam untuk berinvestasi",
                    "Karena penurunan suku bunga hingga nol persen secara otomatis memicu pelarian modal keluar negeri secara permanen"
                ],
                "correct": 2,
                "hint": "Ibarat mendorong tali: kamu bisa menarik tali untuk mengerem laju mobil, tapi kamu tidak bisa mendorong tali ke depan kalau roda bisnis macet ketakutan!",
                "debrief": "Jenius! Ini adalah fenomena <span class='econ-jargon' data-term='perangkap_likuiditas'>Perangkap Likuiditas (Liquidity Trap)</span> Keynes. Ketika bunga sudah nol dan optimisme runtuh, kebijakan moneter mandul. Satu-satunya jurus penyelamat adalah kebijakan fiskal belanja pemerintah!"
            },
            {
                "id": "s2_q6",
                "scenario": "🌐 Selisih Suku Bunga & Kurs Rupiah",
                "question": "Jika Bank Indonesia menaikkan BI-Rate saat suku bunga bank sentral Amerika Serikat (The Fed) tetap rendah, mengapa nilai tukar Rupiah cenderung menguat terhadap Dolar AS?",
                "options": [
                    "Bank sentral Amerika Serikat secara otomatis menarik peredaran mata uang dolarnya dari seluruh negara berkembang",
                    "Eksportir domestik secara sukarela menurunkan harga jual barangnya di pasar luar negeri untuk memperbesar pangsa pasar",
                    "Melebarnya selisih suku bunga (yield spread) memikat investor global membeli obligasi SBN domestik (Capital Inflow), sehingga permintaan penukaran Dolar ke Rupiah meningkat",
                    "Importir Indonesia menunda seluruh pembelian bahan baku luar negeri karena biaya valuta asing dipatok tetap oleh pemerintah"
                ],
                "correct": 2,
                "hint": "Uang modal global selalu mengalir mencari negara yang menawarkan imbal hasil bunga paling tinggi dan aman!",
                "debrief": "Tepat! Selisih suku bunga (<span class='econ-jargon' data-term='transmisi_moneter'>Interest Rate Differential</span>) memicu <em>Capital Inflow</em> ke aset berdenominasi Rupiah. Permintaan Rupiah melonjak di pasar valas, menopang nilai tukar menguat."
            },
            {
                "id": "s2_q7",
                "scenario": "🏛️ Giro Wajib Minimum (GWM)",
                "question": "Bank Indonesia menaikkan rasio Giro Wajib Minimum (GWM) perbankan dari 5% menjadi 9%. Apa dampak langsung instrumen kuantitatif ini terhadap kapasitas kredit bank umum?",
                "options": [
                    "Tingkat suku bunga kredit perbankan seketika turun ke angka nol persen di seluruh kantor cabang",
                    "Bank umum otomatis memperoleh dana segar berlimpah untuk disalurkan ke proyek-proyek properti berisiko tinggi",
                    "Nasabah perbankan dilarang menarik uang tunai dari anjungan tunai mandiri (ATM) lebih dari satu kali sepekan",
                    "Kapasitas penyaluran kredit bank umum menyusut karena porsi dana nasabah yang wajib dikunci mengendap di rekening BI menjadi lebih besar"
                ],
                "correct": 3,
                "hint": "GWM adalah porsi dana tabungan yang wajib 'disimpan di brankas bank sentral' dan tidak boleh dipinjamkan ke siapa pun!",
                "debrief": "Benar sekali! Kenaikan <span class='econ-jargon' data-term='gwm'>Giro Wajib Minimum</span> menyerap likuiditas perbankan secara langsung. Dana yang bisa dipinjamkan ke masyarakat berkurang, mengerem pertumbuhan kredit dan meredam inflasi."
            },
            {
                "id": "s2_q8",
                "scenario": "🔄 Efek Pengganda Uang (Money Multiplier)",
                "question": "Dalam sistem perbankan cadangan fraksional (Fractional Reserve Banking), jika rasio cadangan wajib perbankan adalah 10% (0,10), berapakah nilai pengganda uang (Money Multiplier) teoretis maksimum?",
                "options": [
                    "1 kali lipat, karena setiap rupiah uang tabungan hanya boleh dipinjamkan kepada satu orang peminjam saja",
                    "10 kali lipat, dihitung dari formula $m = 1 / GWM = 1 / 0,10$",
                    "100 kali lipat, karena bank diperbolehkan mencetak uang kertas sendiri tanpa batasan izin",
                    "0,1 kali lipat, karena uang tabungan akan terus menyusut setiap kali dipinjamkan ke nasabah baru"
                ],
                "correct": 1,
                "hint": "Bagi angka 1 dengan persentase rasio cadangan wajib perbankan!",
                "debrief": "Tepat! Money Multiplier $m = \\frac{1}{rr}$. Dari Rp 1 juta uang primer yang disetor, sistem perbankan dapat menciptakan hingga Rp 10 juta uang beredar luas melalui siklus kredit dan simpanan berulang."
            },
            {
                "id": "s2_q9",
                "scenario": "📜 Operasi Pasar Terbuka (SRBI)",
                "question": "Bank Indonesia secara rutin menerbitkan instrumen Sekuritas Rupiah Bank Indonesia (SRBI) di pasar uang. Apa tujuan strategis BI menjual instrumen SRBI kepada perbankan dan investor global?",
                "options": [
                    "Membiayai pembangunan gedung perkantoran baru kementerian dan lembaga pemerintah pusat",
                    "Menyerap kelebihan likuiditas Rupiah di pasar uang domestik sekaligus menarik aliran modal asing (inflow) guna memperkuat stabilitas nilai tukar Rupiah",
                    "Menurunkan suku bunga perbankan secara paksa agar perbankan tidak memperoleh keuntungan usaha",
                    "Menggantikan uang kertas Rupiah yang beredar di masyarakat dengan sertifikat berjangka"
                ],
                "correct": 1,
                "hint": "Menjual surat berharga dengan bunga menarik menyedot uang berlebih di pasar sekaligus memikat dolar masuk ke Indonesia!",
                "debrief": "Luar biasa! SRBI adalah instrumen <span class='econ-jargon' data-term='transmisi_moneter'>Operasi Pasar Terbuka (OPT)</span> pro-market. Dengan yield yang menarik, SRBI menyerap likuiditas berlebih dan menjadi magnet penarik devisa modal asing."
            },
            {
                "id": "s2_q10",
                "scenario": "🏦 Fasilitas Diskonto (Lending Facility)",
                "question": "Jika sebuah bank umum mengalami kesulitan likuiditas jangka sangat pendek pada akhir hari kerja (clearing mismatch), fasilitas apa yang disediakan BI untuk meminjamkan likuiditas darurat?",
                "options": [
                    "Penerbitan saham baru bank umum tersebut yang dibeli langsung oleh masyarakat di bursa efek",
                    "Lending Facility (Fasilitas Pinjaman Diskonto) dengan agunan surat berharga yang berkualitas tinggi",
                    "Pemberian izin kepada bank untuk tidak mengembalikan uang nasabah yang ingin menarik tabungan",
                    "Bantuan modal cuma-cuma dari kas cadangan devisa internasional tanpa jaminan apa pun"
                ],
                "correct": 1,
                "hint": "Fasilitas pinjaman semalam (overnight) dari bank sentral kepada bank yang butuh uang tunai darurat dengan jaminan obligasi!",
                "debrief": "Tepat! <em>Lending Facility</em> (Fasilitas Diskonto) adalah salah satu pilar koridor suku bunga BI (Standing Facilities) untuk memastikan pasar uang antar-bank tetap likuid dan tertib."
            },
            {
                "id": "s2_q11",
                "scenario": "🔒 Fasilitas Simpanan BI (Deposit Facility)",
                "question": "Sebaliknya, jika sebuah bank umum memiliki kelebihan likuiditas kas di sore hari dan ingin menempatkannya dengan aman di bank sentral semalam (overnight), fasilitas apakah yang digunakan?",
                "options": [
                    "Pemberian kredit mikro tanpa agunan kepada pelaku usaha informal di sekitar kantor bank",
                    "Pasar Uang Valas Internasional tanpa perantara lembaga kliring",
                    "Lelang obligasi korporasi swasta yang berisiko gagal bayar tinggi",
                    "Deposit Facility (FasBI), di mana bank umum menaruh dananya di BI dan memperoleh imbalan suku bunga batas bawah koridor"
                ],
                "correct": 3,
                "hint": "Tempat bank umum menitipkan uang nganggurnya semalam di bank sentral agar tetap dapat bunga aman!",
                "debrief": "Benar! <em>Deposit Facility</em> (FasBI) menjadi batas bawah (floor) dari koridor suku bunga BI, mencegah suku bunga pasar uang antar-bank anjlok terlalu dalam saat likuiditas melimpah."
            },
            {
                "id": "s2_q12",
                "scenario": "🛡️ Lender of Last Resort",
                "question": "Dalam situasi krisis perbankan sistemik di mana terjadi kepanikan penarikan dana massal (Bank Run), apa peran vital Bank Indonesia sebagai 'Lender of Last Resort'?",
                "options": [
                    "Mengambil alih seluruh kerugian investasi spekulatif pemilik bank tanpa perlu verifikasi kesehatan aset",
                    "Menutup seluruh kantor cabang perbankan di tanah air secara permanen untuk menghentikan transaksi uang",
                    "Menyediakan fasilitas likuiditas darurat kepada bank yang solven (asetnya sehat) namun mengalami krisis likuiditas sesaat demi mencegah kepanikan merambat luas",
                    "Mengubah seluruh simpanan tabungan nasabah menjadi obligasi swasta berisiko tinggi tanpa persetujuan"
                ],
                "correct": 2,
                "hint": "Menjadi benteng pertahanan terakhir yang meminjamkan uang tunai darurat kepada bank yang sehat agar nasabah tenang dan tidak panik!",
                "debrief": "Tepat sekali! Doktrin Walter Bagehot: Sebagai <span class='econ-jargon' data-term='lender_of_last_resort'>Lender of Last Resort</span>, bank sentral harus meminjamkan likuiditas secara bebas kepada bank yang solven, dengan jaminan yang baik, namun pada tingkat bunga penalti."
            },
            {
                "id": "s2_q13",
                "scenario": "🎯 Inflation Targeting Framework (ITF)",
                "question": "Sejak tahun 2005, Bank Indonesia secara konsisten menerapkan kerangka kebijakan moneter berbasis penargetan inflasi (ITF). Ciri utama dari kerangka ITF ini adalah:",
                "options": [
                    "Menghapuskan fungsi suku bunga acuan dan menggantinya dengan kuota penjatahan kredit fisik",
                    "Menetapkan sasaran inflasi kuantitatif ke depan (misal: 2,5% ± 1%) dan mengumumkan arah kebijakan moneter secara transparan kepada publik",
                    "Mematok nilai tukar Rupiah secara kaku pada kurs tetap Rp 10.000 per Dolar AS tanpa kompromi",
                    "Menjamin bahwa seluruh harga barang di pasar tidak boleh naik lebih dari satu rupiah dalam setahun"
                ],
                "correct": 1,
                "hint": "Bank sentral mengumumkan target angka inflasi ke publik, lalu mengarahkan instrumen moneter agar target tersebut tercapai!",
                "debrief": "Tepat! Dalam <span class='econ-jargon' data-term='itf'>Inflation Targeting Framework</span>, sasaran inflasi adalah jangkar nominal utama. Kredibilitas dan transparansi komunikasi bank sentral mengarahkan ekspektasi inflasi masyarakat."
            },
            {
                "id": "s2_q14",
                "scenario": "💵 Agregat Moneter M1 vs M2",
                "question": "Dalam statistik moneter Bank Indonesia, apakah perbedaan mendasar antara komponen Uang Beredar Sempit (M1) dan Uang Beredar Luas (M2)?",
                "options": [
                    "M1 adalah seluruh uang tunai milik orang kaya, sedangkan M2 adalah uang tunai milik masyarakat kelas bawah",
                    "M1 adalah uang kertas Rupiah buatan Peruri, sedangkan M2 adalah seluruh mata uang asing yang beredar di Indonesia",
                    "M1 mencatat utang obligasi pemerintah, sedangkan M2 mencatat pinjaman kredit perbankan kepada perusahaan swasta",
                    "M1 terdiri dari uang kartal dan uang giral (rekening giro yang siap dibelanjakan seketika), sedangkan M2 mencakup M1 ditambah uang kuasi (deposito berjangka dan tabungan valas)"
                ],
                "correct": 3,
                "hint": "M1 adalah uang yang langsung bisa dipakai belanja detik ini juga; M2 mencakup simpanan berjangka yang butuh waktu untuk dicairkan!",
                "debrief": "Benar sekali! M1 adalah aset paling likuid untuk transaksi langsung. M2 (<span class='econ-jargon' data-term='teori_kuantitas_uang'>Likuiditas Perekonomian</span>) mencakup M1 ditambah simpanan berjangka yang berfungsi sebagai penyimpan nilai."
            },
            {
                "id": "s2_q15",
                "scenario": "🏠 Kebijakan Rasio Loan to Value (LTV)",
                "question": "Jika terjadi lonjakan spekulasi harga properti (Housing Bubble) di mana harga rumah melonjak tidak wajar, instrumen makroprudensial apakah yang dapat diketatkan oleh Bank Indonesia?",
                "options": [
                    "Memaksa bank sentral membeli seluruh unit apartemen yang belum laku terjual di pasar",
                    "Menaikkan pajak pertambahan nilai bahan bangunan hingga batas maksimal",
                    "Melarang seluruh kontraktor membangun rumah dan gedung perkantoran di wilayah perkotaan",
                    "Menurunkan rasio Loan to Value (LTV), sehingga pembeli rumah wajib menyediakan uang muka (Down Payment / DP) yang lebih besar"
                ],
                "correct": 3,
                "hint": "Mewajibkan uang muka (DP) KPR lebih besar agar para spekulan tidak gampang meminjam uang bank untuk memborong rumah!",
                "debrief": "Tepat! Rasio LTV adalah instrumen makroprudensial penjinak risiko kredit properti. Mengetatkan LTV meredam laju spekulasi dan mencegah kredit macet sistemik perbankan."
            },
            {
                "id": "s2_q16",
                "scenario": "🧱 Countercyclical Capital Buffer (CCB)",
                "question": "Bank Indonesia mewajibkan perbankan memupuk modal tambahan melalui instrumen Countercyclical Capital Buffer (CCB) saat ekonomi sedang mengalami ekspansi kredit yang sangat kencang. Apa tujuannya?",
                "options": [
                    "Membagikan dividen keuntungan tahunan yang berlipat ganda kepada seluruh pemegang saham pengendali bank",
                    "Menghentikan seluruh layanan perbankan digital dan kembali menggunakan pembukuan kertas manual",
                    "Memaksa bank umum memindahkan kantor pusat operasionalnya ke luar negeri demi efisiensi biaya",
                    "Menyimpan bantalan modal ekstra di saat kondisi makmur, agar cadangan modal tersebut dapat dicairkan saat krisis ekonomi melanda untuk menyerap kerugian kredit"
                ],
                "correct": 3,
                "hint": "Ibarat kisah Nabi Yusuf: menyimpan gandum cadangan di lumbung saat 7 tahun masa subur, agar tidak kelaparan saat 7 tahun masa paceklik!",
                "debrief": "Luar biasa! Konsep Makroprudensial Countercyclical: bank dipaksa memperkuat benteng modal saat ekonomi sedang ekspansif, sehingga saat resesi tiba perbankan tidak rapuh dan tetap sanggup menyalurkan kredit."
            },
            {
                "id": "s2_q17",
                "scenario": "📈 Inversi Kurva Imbal Hasil (Yield Curve Inversion)",
                "question": "Mengapa fenomena Inversi Kurva Imbal Hasil—di mana yield obligasi pemerintah jangka pendek (2 tahun) justru lebih tinggi dibanding obligasi jangka panjang (10 tahun)—sering dianggap sinyal kuat akan datangnya resesi?",
                "options": [
                    "Karena investor memperkirakan ekonomi masa depan akan memburuk, sehingga mereka berebut mengunci obligasi jangka panjang yang aman dan memicu penurunan suku bunga jangka panjang",
                    "Karena investor asing secara serempak menolak menerima pembayaran kupon obligasi dalam mata uang domestik",
                    "Karena bank sentral secara sengaja menaikkan suku bunga jangka panjang untuk mematikan pasar obligasi",
                    "Karena pemerintah dinyatakan tidak sanggup membayar utang jangka pendek dalam kurun waktu satu pekan ke depan"
                ],
                "correct": 0,
                "hint": "Pasar bertaruh bahwa ekonomi masa depan bakal suram dan bank sentral nanti pasti terpaksa memangkas suku bunga drastis!",
                "debrief": "Jenius! Inversi kurva yield adalah salah satu indikator awal (leading indicator) resesi paling akurat dalam sejarah keuangan global, mencerminkan pesimisme pasar terhadap prospek pertumbuhan jangka menengah-panjang."
            },
            {
                "id": "s2_q18",
                "scenario": "📢 Forward Guidance & Manajemen Ekspektasi",
                "question": "Selain mengutak-atik suku bunga acuan secara riil, bank sentral modern sangat mengandalkan instrumen komunikasi 'Forward Guidance'. Apakah esensi dari strategi komunikasi ini?",
                "options": [
                    "Mengarahkan ekspektasi pasar dan pelaku usaha mengenai arah suku bunga masa depan melalui pernyataan resmi dewan gubernur yang kredibel",
                    "Membuat pengumuman palsu di media sosial untuk menguji reaksi emosional investor pasar saham",
                    "Memerintahkan seluruh analis keuangan perbankan membuat laporan proyeksi yang selalu bernada optimis",
                    "Menyembunyikan seluruh data ekonomi nasional agar spekulan tidak dapat menebak arah kebijakan moneter"
                ],
                "correct": 0,
                "hint": "Membimbing pasar secara transparan: 'Suku bunga kemungkinan akan tetap tinggi sampai inflasi benar-benar jinak!', agar dunia usaha tidak kaget!",
                "debrief": "Tepat! Kebijakan moneter modern adalah seni mengelola ekspektasi publik. Kredibilitas <em>Forward Guidance</em> membuat pasar keuangan melakukan penyesuaian secara teratur tanpa memicu gejolak pasar dadakan."
            },
            {
                "id": "s2_q19",
                "scenario": "⚠️ Bahaya Monetisasi Utang Langsung",
                "question": "Mengapa dalam kondisi normal, undang-undang melarang keras Bank Indonesia membeli Surat Berharga Negara (SBN) langsung di pasar perdana (Direct Debt Monetization) dari Kementerian Keuangan?",
                "options": [
                    "Karena kementerian keuangan dilarang oleh konstitusi bekerja sama dalam bentuk apa pun dengan bank sentral",
                    "Mencegah pemerintah mencetak obligasi semaunya untuk dibeli BI dengan uang baru (mencetak uang untuk belanja negara), yang berisiko merusak disiplin fiskal dan memicu hiperinflasi",
                    "Karena seluruh pembelian obligasi pemerintah wajib mendapatkan persetujuan tertulis dari Bank Dunia",
                    "Karena bank sentral secara teknis tidak memiliki rekening penyimpanan surat berharga negara"
                ],
                "correct": 1,
                "hint": "Bila menteri keuangan bisa menyuruh bank sentral langsung mencetak uang untuk menambal belanja APBN, disiplin anggaran runtuh dan uang akan kehilangan nilainya!",
                "debrief": "Sangat tepat! Pemisahan tegas (independensi) antara otoritas fiskal dan moneter adalah benteng utama pencegah kehancuran nilai mata uang suatu negara."
            },
            {
                "id": "s2_q20",
                "scenario": "🌊 Quantitative Easing (QE)",
                "question": "Ketika bank sentral negara maju (seperti The Fed AS) melakukan pelonggaran kuantitatif (Quantitative Easing / QE) pasca-krisis keuangan, instrumen apakah yang mereka operasikan?",
                "options": [
                    "Membeli obligasi pemerintah dan sekuritas jangka panjang dari pasar perbankan dalam jumlah raksasa untuk membanjiri sistem keuangan dengan likuiditas segar",
                    "Menghapuskan seluruh sistem pencatatan perbankan digital dan kembali menggunakan koin tembaga",
                    "Mencetak uang kertas fisik dan menyebarkannya dari helikopter ke pemukiman penduduk",
                    "Menaikkan suku bunga acuan pinjaman hingga menyentuh angka 20% dalam tempo semalam"
                ],
                "correct": 0,
                "hint": "Membeli aset obligasi besar-besaran di pasar untuk menyuntikkan triliunan dolar likuiditas saat suku bunga sudah mentok nol persen!",
                "debrief": "Benar! <em>Quantitative Easing</em> adalah kebijakan moneter non-konvensional. Neraca bank sentral membengkak drastis demi menekan suku bunga jangka panjang dan memulihkan intermediasi kredit pasar."
            },
            {
                "id": "s2_q21",
                "scenario": "🧊 Quantitative Tightening (QT)",
                "question": "Sebaliknya, ketika bank sentral menjalankan pengetatan kuantitatif (Quantitative Tightening / QT), apa yang mereka lakukan terhadap neraca keuangannya?",
                "options": [
                    "Mengurangi kepemilikan aset obligasi di neraca (tidak memperpanjang obligasi yang jatuh tempo), sehingga likuiditas uang berlebih terserap kembali",
                    "Membeli kembali seluruh emas batangan yang disimpan oleh warga negara di brankas rumah tangga",
                    "Menurunkan giro wajib minimum perbankan hingga batas terendah dalam sejarah",
                    "Mengganti mata uang resmi negara dengan sistem barter barang komoditas tambang"
                ],
                "correct": 0,
                "hint": "Membiarkan obligasi jatuh tempo tanpa membeli lagi, sehingga triliunan uang tersedot keluar dari sistem keuangan!",
                "debrief": "Tepat! QT adalah kebalikan dari QE. Likuiditas moneter global ditarik kembali, yang seringkali memicu gejolak pembalikan modal (capital outflow) di negara-negara berkembang."
            },
            {
                "id": "s2_q22",
                "scenario": "🪞 Efek Fisher: Bunga Riil vs Nominal",
                "question": "Menurut Persamaan Fisher (Fisher Effect), jika suku bunga deposito perbankan adalah 6% per tahun sementara ekspektasi inflasi adalah 4% per tahun, berapakah tingkat suku bunga riil yang dinikmati nasabah?",
                "options": [
                    "Sekitar 10% per tahun, karena bunga deposito dan inflasi saling menjumlahkan keuntungan nasabah",
                    "Sekitar 24% per tahun, hasil kali antara suku bunga nominal dengan ekspektasi inflasi pasar",
                    "Nol persen, karena inflasi selalu menghapus seluruh pokok simpanan uang nasabah di bank",
                    "Sekitar 2% per tahun, dihitung dari suku bunga nominal dikurangi tingkat inflasi ($r \\approx i - \\pi$)"
                ],
                "correct": 3,
                "hint": "Kurangkan bunga yang kamu terima dengan laju kenaikan harga barang untuk mengetahui pertumbuhan daya beli tabunganmu!",
                "debrief": "Tepat sekali! Persamaan Fisher: $r = i - \\pi$. Jika bunga nominal $6\\%$ dan inflasi $4\\%$, imbal hasil riil tabunganmu secara fisik hanyalah $2\\%$. Bila inflasi lebih tinggi dari bunga bank, bunga riilmu menjadi negatif!"
            },
            {
                "id": "s2_q23",
                "scenario": "🛡️ Triple Intervention Bank Indonesia",
                "question": "Dalam menjaga stabilitas nilai tukar Rupiah dari tekanan gejolak eksternal, Bank Indonesia menerapkan strategi 'Triple Intervention'. Di pasar mana sajakah BI melakukan intervensi simultan tersebut?",
                "options": [
                    "Pasar e-commerce ritel, pasar tradisional induk beras, dan pasar lelang mobil bekas",
                    "Pasar valas London, pasar bursa berjangka Tokyo, dan pasar komoditas pertanian Chicago",
                    "Pasar Saham LQ45, pasar komoditas timah Bangka, dan pasar properti Jabodetabek",
                    "Pasar Spot Valas, pasar Domestic Non-Deliverable Forward (DNDF), dan pasar sekunder Surat Berharga Negara (SBN)"
                ],
                "correct": 3,
                "hint": "Tiga lini pertahanan: pasar tunai (spot), pasar kontrak lindung nilai (DNDF), dan pasar obligasi negara (SBN)!",
                "debrief": "Jenius! Strategi <span class='econ-jargon' data-term='kurs_valas'>Triple Intervention</span> mengamankan stabilitas nilai tukar secara komprehensif, menjaga likuiditas valas sekaligus mencegah imbal hasil SBN melonjak liar saat terjadi capital outflow."
            },
            {
                "id": "s2_q24",
                "scenario": "🤝 Koordinasi TPID (Pengendalian Inflasi)",
                "question": "Mengapa Bank Indonesia tidak bisa sendirian mengendalikan inflasi dan harus bekerja sama erat dengan pemerintah daerah melalui Tim Pengendalian Inflasi Daerah (TPID)?",
                "options": [
                    "Karena anggota dewan gubernur BI dilarang oleh undang-undang mengunjungi pasar tradisional di pedesaan",
                    "Karena inflasi di Indonesia sangat dipengaruhi oleh komponen pangan bergejolak (Volatile Food) akibat masalah pasokan dan distribusi logistik fisik di daerah, yang merupakan kewenangan pemerintah",
                    "Karena bupati dan walikota memiliki wewenang untuk mencetak uang Rupiah khusus daerahnya masing-masing",
                    "Karena bank sentral tidak memiliki wewenang hukum untuk mengatur suku bunga di luar wilayah DKI Jakarta"
                ],
                "correct": 1,
                "hint": "Bank sentral mengatur bunga uang, tetapi yang punya wewenang membangun jalan, mengontrol truk cabai, dan menggelar pasar murah adalah kepala daerah!",
                "debrief": "Tepat! Inflasi pangan butuh intervensi rantai pasok fisik (Kerja Sama Antar-Daerah / KAD, subsidi ongkos angkut). Sinergi BI dan Pemerintah Daerah lewat <span class='econ-jargon' data-term='itf'>TPID</span> menjadi kunci sukses stabilitas pangan nasional."
            },
            {
                "id": "s2_q25",
                "scenario": "🏃‍♂️ Pelarian Modal (Capital Flight) & Bunga",
                "question": "Jika inflasi di dalam negeri melonjak tinggi sementara Bank Indonesia terlambat menaikkan suku bunga (suku bunga riil menjadi negatif), bahaya moneter apakah yang mengancam sistem keuangan?",
                "options": [
                    "Perekonomian domestik akan dibanjiri uang Dolar AS secara gratis dari para investor asing",
                    "Tingkat cadangan devisa bank sentral akan melonjak drastis hingga melampaui batas kebutuhan nasional",
                    "Seluruh bank umum swasta akan secara otomatis menutup layanan simpanan mata uang asing",
                    "Investor asing dan konglomerat domestik akan melarikan dananya ke luar negeri (Capital Flight) untuk mencari imbal hasil riil yang positif, memicu depresiasi Rupiah tajam"
                ],
                "correct": 3,
                "hint": "Siapa yang mau menaruh uang di negara yang bunganya lebih kecil dibanding laju inflasinya? Modal akan kabur ke luar negeri!",
                "debrief": "Benar! Suku bunga riil negatif menghukum penabung dan investor. Dana akan kabur (<span class='econ-jargon' data-term='kurs_valas'>Capital Flight</span>) ke aset yang lebih aman, menghantam cadangan devisa dan menenggelamkan nilai tukar Rupiah."
            },
            {
                "id": "s2_q26",
                "scenario": "💳 Uang Primer (Base Money / M0)",
                "question": "Apakah yang dimaksud dengan Uang Primer (Base Money / Reserve Money / M0) dalam neraca Bank Indonesia?",
                "options": [
                    "Jumlah uang tabungan deposito berjangka milik seluruh warga negara di bank perkreditan rakyat",
                    "Nilai estimasi total kekayaan sumber daya tambang minyak dan batu bara yang belum digali di perut bumi",
                    "Total uang kartal (kertas dan logam) yang beredar di masyarakat ditambah saldo rekening giro bank-bank umum yang mengendap di Bank Indonesia",
                    "Seluruh pinjaman utang luar negeri yang diterima oleh korporasi swasta dalam satu dekade"
                ],
                "correct": 2,
                "hint": "Liabilitas moneter paling murni dari bank sentral: uang tunai fisik yang dipegang rakyat plus simpanan cadangan bank di rekening BI!",
                "debrief": "Tepat! Uang Primer ($M_0$) adalah fondasi dari seluruh piramida uang beredar. Melalui mekanisme perbankan, uang primer ini digandakan menjadi $M_1$ dan $M_2$ di sektor riil."
            },
            {
                "id": "s2_q27",
                "scenario": "🪙 Seigniorage: Laba Emisi Uang",
                "question": "Dalam sejarah ekonomi, apakah yang dimaksud dengan konsep keuntungan Seigniorage bagi otoritas moneter pencetak uang?",
                "options": [
                    "Pajak penghasilan yang ditarik bank sentral dari keuntungan perusahaan multinasional",
                    "Keuntungan yang diperoleh dari hasil perdagangan valuta asing di bursa saham internasional",
                    "Selisih antara nilai nominal uang yang dicetak dengan biaya fisik bahan baku pembuatan uang tersebut",
                    "Biaya bunga penalti yang dikenakan kepada bank yang terlambat mengembalikan pinjaman clearing"
                ],
                "correct": 2,
                "hint": "Ongkos mencetak selembar uang Rp 100.000 kertas hanyalah beberapa ratus rupiah; selisih nilainya itulah seigniorage!",
                "debrief": "Tepat! <em>Seigniorage</em> adalah keuntungan ekonomi dari monopoli hak mencetak uang. Namun jika hak ini disalahgunakan untuk mencetak uang tanpa kendali, nilainya akan hancur oleh hiperinflasi."
            },
            {
                "id": "s2_q28",
                "scenario": "📱 Central Bank Digital Currency (CBDC)",
                "question": "Bank Indonesia sedang mengembangkan proyek 'Digital Rupiah' (CBDC). Apa perbedaan fundamental antara Digital Rupiah dengan saldo dompet digital komersial (seperti GoPay/OVO)?",
                "options": [
                    "Digital Rupiah merupakan kewajiban moneter langsung (direct liability) Bank Indonesia yang berfungsi sebagai uang kartal digital resmi yang bebas risiko kredit",
                    "Digital Rupiah adalah mata uang kripto swasta tanpa otoritas pengendali yang nilainya ditentukan oleh spekulasi pasar",
                    "Digital Rupiah mengenakan biaya bunga pinjaman sebesar 10% setiap kali nasabah melakukan transaksi belanja",
                    "Digital Rupiah hanya boleh digunakan untuk membeli barang-barang impor dari negara anggota G20"
                ],
                "correct": 0,
                "hint": "Digital Rupiah adalah uang kartal resmi negara dalam bentuk kode digital terenkripsi langsung dari BI, bukan uang giral perusahaan fintech!",
                "debrief": "Sangat tepat! CBDC (Digital Rupiah) adalah uang berdaulat (Sovereign Currency) berdaya laku sah (Legal Tender) dalam format digital, memperkuat kedaulatan moneter di era ekonomi digital."
            },
            {
                "id": "s2_q29",
                "scenario": "⚖️ Sifat Asimetris Kebijakan Moneter",
                "question": "Ekonom sering mengibaratkan kebijakan moneter seperti 'tali': menarik tali sangat efektif untuk mengerem inflasi (moneter ketat), tetapi mendorong tali sangat sulit untuk memicu pemulihan saat resesi. Mengapa terjadi asimetri ini?",
                "options": [
                    "Karena suku bunga perbankan di Indonesia hanya diperbolehkan bergerak naik dan dilarang bergerak turun",
                    "Karena bank sentral dapat memaksa bank menaikkan bunga pinjaman saat inflasi, namun bank sentral tidak bisa memaksa pengusaha meminjam uang jika mereka tidak melihat peluang pasar yang menguntungkan",
                    "Karena kementerian keuangan memiliki wewenang membatalkan seluruh keputusan rapat dewan gubernur bank sentral",
                    "Karena uang kertas Rupiah memiliki batas kadaluarsa fisik yang membuatnya tidak laku setelah satu tahun"
                ],
                "correct": 1,
                "hint": "Kamu bisa menarik rem kuda untuk berhenti, tetapi kamu tidak bisa mendorong tali kekang kalau kudanya menolak jalan!",
                "debrief": "Luar biasa! Konsep 'Pushing on a string'. Moneter kontraktif sangat ampuh mengerem permintaan, tetapi saat krisis melanda, moneter ekspansif butuh sokongan stimulus belanja fiskal pemerintah agar ekonomi bergerak."
            },
            {
                "id": "s2_q30",
                "scenario": "🏦 Stabilitas Sistem Keuangan (SSK)",
                "question": "Selain menjaga stabilitas moneter (inflasi), Bank Indonesia juga mengemban mandat menjaga Stabilitas Sistem Keuangan (SSK). Mengapa stabilitas moneter saja tidak cukup tanpa stabilitas sistem perbankan?",
                "options": [
                    "Karena perbankan nasional tidak memiliki hubungan apa pun dengan saluran peredaran uang di masyarakat",
                    "Karena undang-undang melarang bank sentral mengumumkan angka inflasi jika ada satu bank yang mencatatkan kerugian usaha",
                    "Karena meskipun inflasi rendah, kebangkrutan bank-bank besar dapat membekukan sistem pembayaran, menghancurkan likuiditas, dan menyeret ekonomi ke dalam jurang krisis",
                    "Karena seluruh aset perbankan nasional wajib disimpan dalam bentuk fisik di ruang bawah tanah istana kepresidenan"
                ],
                "correct": 2,
                "hint": "Inflasi tenang pun tidak ada gunanya jika tiba-tiba sistem perbankan kolaps dan tabungan jutaan rakyat terkunci!",
                "debrief": "Tepat sekali! Krisis Keuangan Global 2008 membuktikan: stabilitas harga tidak menjamin stabilitas keuangan. Oleh karena itu, kebijakan moneter harus berjalan beriringan dengan kebijakan makroprudensial SSK."
            },
            {
                "id": "s2_q31",
                "scenario": "🌱 Green Financing & Taksonomi Hijau",
                "question": "Bank Indonesia memberikan kelonggaran uang muka (LTV 0%) untuk kredit pembelian Kendaraan Bermotor Listrik Berbasis Baterai (KBLBB). Kebijakan makroprudensial ini mencerminkan komitmen bank sentral terhadap:",
                "options": [
                    "Peningkatan impor minyak mentah dari luar negeri guna menghabiskan cadangan devisa negara",
                    "Penghapusan seluruh angkutan transportasi umum konvensional di seluruh wilayah kabupaten",
                    "Pembiayaan Berkelanjutan (Green Financing) guna mempercepat transisi energi bersih dan menurunkan emisi karbon nasional",
                    "Kewajiban bagi seluruh pengusaha otomotif untuk menyetorkan keuntungan laba ke bank sentral"
                ],
                "correct": 2,
                "hint": "Memberikan insentif kemudahan kredit untuk barang ramah lingkungan agar industri hijau tumbuh pesat!",
                "debrief": "Benar! Bank sentral modern kini mengintegrasikan risiko perubahan iklim ke dalam kerangka makroprudensial melalui insentif pembiayaan hijau (Green Financing)."
            },
            {
                "id": "s2_q32",
                "scenario": "📈 Suku Bunga Acuan BI-Rate vs PUAB",
                "question": "Di pasar uang antar-bank (PUAB), bank-bank umum saling meminjamkan kelebihan likuiditas jangka pendek semalam. Bagaimana posisi suku bunga PUAB (IndONIA) terhadap suku bunga acuan BI-Rate?",
                "options": [
                    "Suku bunga PUAB tidak memiliki keterkaitan apa pun dengan kebijakan yang diputuskan bank sentral",
                    "Suku bunga PUAB selalu berada tepat di angka nol persen setiap hari kerja",
                    "Suku bunga PUAB dipatok wajib dua kali lipat lebih tinggi dari suku bunga kredit perumahan rakyat",
                    "Suku bunga PUAB (IndONIA) bergerak fleksibel di sekitar suku bunga BI-Rate di dalam batas koridor suku bunga (standing facilities) BI"
                ],
                "correct": 3,
                "hint": "Suku bunga pasar uang bergerak lincah naik-turun di sekitar BI-Rate, seperti kapal yang berlabuh di dermaga yang dijaga bank sentral!",
                "debrief": "Tepat! Operasi moneter Bank Indonesia dirancang agar suku bunga pasar uang antar-bank (<span class='econ-jargon' data-term='transmisi_moneter'>IndONIA</span>) bergerak simetris di sekitar BI-Rate sebagai wujud efektivitas transmisi moneter."
            },
            {
                "id": "s2_q33",
                "scenario": "💵 Sterilisasi Intervensi Valas",
                "question": "Ketika Bank Indonesia membeli Dolar AS di pasar valas untuk memperkuat cadangan devisa, BI sekaligus menyuntikkan likuiditas Rupiah ke sistem perbankan. Apa yang dilakukan BI dalam 'Sterilisasi Moneter' agar rupiah baru tersebut tidak memicu inflasi?",
                "options": [
                    "Menyerap kembali kelebihan likuiditas Rupiah tersebut melalui penjualan surat berharga (seperti SRBI) di pasar uang domestik",
                    "Menaikkan batas tarif pajak penghasilan badan secara sepihak tanpa undang-undang",
                    "Melarang seluruh masyarakat menukarkan kembali uang Rupiahnya ke mata uang asing",
                    "Membakar seluruh uang kertas Dolar AS yang baru saja dibeli di depan umum"
                ],
                "correct": 0,
                "hint": "Membeli dolar menambah rupiah di pasar; agar tidak kelebihan rupiah dan bikin inflasi, rupiahnya disedot balik pakai surat berharga!",
                "debrief": "Jenius! <em>Sterilized Intervention</em> memungkinkan bank sentral memupuk cadangan devisa atau menstabilkan kurs tanpa mengorbankan sasaran jumlah uang beredar dan target inflasi domestik."
            },
            {
                "id": "s2_q34",
                "scenario": "🌪️ Tapering The Fed & Respon Moneter",
                "question": "Ketika bank sentral Amerika Serikat (The Fed) mengumumkan rencana pengurangan stimulus (Tapering Off) dan kenaikan Fed Funds Rate (FFR), respon moneter preventif apakah yang umumnya disiapkan oleh Bank Indonesia?",
                "options": [
                    "Memangkas suku bunga acuan BI-Rate hingga menyentuh angka nol persen dalam waktu semalam",
                    "Menaikkan suku bunga acuan dan memperkuat bauran instrumen penarik devisa (seperti SRBI/DHE) demi menjaga daya tarik imbal hasil aset Rupiah",
                    "Menjual seluruh cadangan devisa negara untuk membeli properti di kota New York",
                    "Mengumumkan bahwa Indonesia berhenti menggunakan mata uang Dolar dalam perdagangan dunia"
                ],
                "correct": 1,
                "hint": "Saat suku bunga Dolar naik, bunga Rupiah harus dijaga tetap kompetitif agar investor tidak kabur membawa pulang dolarnya!",
                "debrief": "Sangat tepat! Tindakan <em>Pre-emptive, Front-Loading, and Ahead of the Curve</em> sering diambil BI untuk membentengi stabilitas nilai tukar Rupiah dari ancaman gejolak moneter global."
            },
            {
                "id": "s2_q35",
                "scenario": "📊 Ekspektasi Inflasi Adaptif vs Rasional",
                "question": "Mengapa ekspektasi inflasi masyarakat yang tidak terkendali (Unanchored Inflation Expectations) sangat ditakuti oleh bank sentral?",
                "options": [
                    "Karena undang-undang melarang masyarakat memiliki opini pribadi mengenai harga barang kebutuhan pokok",
                    "Karena ekspektasi masyarakat secara otomatis menghapus pencatatan saldo tabungan di sistem perbankan",
                    "Karena ekspektasi inflasi yang tinggi secara otomatis memicu penurunan produksi beras di sawah",
                    "Karena jika masyarakat percaya harga akan naik tinggi di masa depan, buruh akan menuntut kenaikan upah tinggi dan pedagang menaikkan harga lebih cepat, menciptakan lingkaran setan inflasi nyata (Self-Fulfilling Prophecy)"
                ],
                "correct": 3,
                "hint": "Keyakinan bahwa besok harga barang pasti naik membuat orang menaikkan harga hari ini—ketakutan itu sendiri yang menciptakan inflasi!",
                "debrief": "Tepat! Ekspektasi yang tidak terjangkar memicu <em>Wage-Price Spiral</em>. Tugas terpenting bank sentral adalah menjaga ekspektasi publik tetap tenang dan percaya bahwa inflasi akan selalu terkendali."
            },
            {
                "id": "s2_q36",
                "scenario": "👑 Mahakarya Kebijakan Moneter",
                "question": "Di akhir Level 2, kesimpulan fundamental apakah yang harus dipahami oleh calon teknokrat mengenai kebijakan moneter modern?",
                "options": [
                    "Kebijakan moneter adalah mesin pencetak kekayaan instan tanpa perlu adanya pabrik dan kerja keras rakyat",
                    "Kebijakan moneter bertujuan untuk menghapuskan seluruh peranan bank umum swasta di dalam perekonomian",
                    "Kebijakan moneter adalah penjaga stabilitas nilai mata uang; ia menciptakan fondasi kepastian makro yang memungkinkan dunia usaha berinvestasi dan rakyat berbelanja dengan rasa aman",
                    "Kebijakan moneter bertugas menggantikan seluruh fungsi kementerian keuangan dalam memungut pajak dan menyusun APBN"
                ],
                "correct": 2,
                "hint": "Moneter yang sehat adalah seperti udara bersih: saat ada kita tidak menyadarinya, tapi saat ia rusak seluruh ekonomi akan tercekik!",
                "debrief": "Luar biasa! Selamat! Anda telah menuntaskan Level 2 Kebijakan Moneter. Anda kini memahami bagaimana transmisi suku bunga, instrumen makroprudensial, dan stabilitas nilai tukar menjaga detak jantung perekonomian bangsa!"
            }
        ]
    },
    {
        "id": 3,
        "title": "Level 3: 🏛️ Gedung Menteri Keuangan",
        "subtitle": "Meramu APBN, Pajak, Subsidi, dan Batas Utang Negara",
        "theme": "fiscal",
        "unlocks": "Gelar: Bendahara Negara Tangguh 🏛️",
        "questionPool": [
            {
                "id": "s3_q1",
                "scenario": "🏗️ Belanja Infrastruktur & Angka Pengganda",
                "question": "Kementerian Keuangan mengalokasikan anggaran Rp 400 triliun untuk membangun jalan tol, pelabuhan, dan bendungan irigasi. Dari analisis fiskal, mengapa belanja modal fisik ini memiliki multiplier effect lebih tinggi dibanding belanja operasional birokrasi?",
                "options": [
                    "Karena belanja infrastruktur tidak menggunakan dana APBN melainkan dibiayai 100% dari pinjaman bank luar negeri",
                    "Karena seluruh material pembangunan jalan tol wajib diimpor bebas bea masuk dari negara mitra dagang",
                    "Karena proyek fisik menyerap jutaan tenaga kerja, membeli semen dan baja lokal, serta memangkas biaya logistik pengusaha secara permanen",
                    "Karena pembangunan jalan tol menghasilkan dividen tunai harian yang disetorkan langsung ke rekening menteri keuangan"
                ],
                "correct": 2,
                "hint": "Membangun jembatan bukan hanya mempekerjakan kuli hari ini, tapi membuat truk sayur bisa lewat lebih cepat dan murah selamanya!",
                "debrief": "Tepat sekali! Belanja modal menghasilkan <span class='econ-jargon' data-term='multiplier_effect'>Angka Pengganda Fiskal (Fiscal Multiplier)</span> yang tinggi. Efek bergandanya memicu aktivitas ekonomi turunan di sektor konstruksi, manufaktur, dan efisiensi logistik jangka panjang."
            },
            {
                "id": "s3_q2",
                "scenario": "⚖️ Batas Hukum Defisit APBN 3%",
                "question": "Undang-Undang Keuangan Negara No. 17 Tahun 2003 secara tegas membatasi defisit anggaran APBN maksimal 3% dari Produk Domestik Bruto (PDB). Apakah filosofi utama di balik batasan hukum yang ketat ini?",
                "options": [
                    "Memenuhi syarat mutlak untuk menjadi anggota tetap Dewan Keamanan Perserikatan Bangsa-Bangsa",
                    "Menjaga disiplin fiskal agar pemerintah tidak ugal-ugalan berutang melebihi kapasitas pembayaran ekonomi nasional demi menjaga keberlanjutan fiskal lintas generasi",
                    "Melarang kementerian dan lembaga melakukan pengadaan barang dan jasa pada kuartal keempat tahun berjalan",
                    "Memastikan bahwa pemerintah selalu mencatatkan keuntungan laba tunai absolut di akhir tahun anggaran"
                ],
                "correct": 1,
                "hint": "Batas rambu lalu lintas: boleh berutang sedikit untuk modal kerja produktif, tapi jangan ugal-ugalan sampai membebani anak cucu!",
                "debrief": "Sangat tepat! Pembatasan defisit maksimal 3% PDB adalah jangkar <span class='econ-jargon' data-term='defisit_apbn'>Disiplin Fiskal</span> Indonesia pasca-krisis 1998, mencegah spiral jebakan utang dan membangun reputasi kredibilitas fiskal di mata dunia internasional."
            },
            {
                "id": "s3_q3",
                "scenario": "📜 Batas Rasio Utang 60% PDB",
                "question": "Selain batas defisit 3%, undang-undang juga menetapkan batas maksimal rasio total utang pemerintah sebesar 60% dari PDB. Mengapa rasio utang Indonesia (sekitar 38-39% PDB) dinilai relatif sehat dibanding banyak negara maju yang rasionya melampaui 100% PDB?",
                "options": [
                    "Karena negara maju secara hukum internasional dilarang menagih utang pokok kepada negara berkembang",
                    "Karena rasio utang Indonesia berada jauh di bawah ambang batas bahaya 60%, sehingga risiko gagal bayar (sovereign default) sangat rendah dan peringkat kredit internasional tetap kuat",
                    "Karena utang pemerintah Indonesia tidak dikenakan kewajiban membayar bunga kupon tahunan",
                    "Karena seluruh utang luar negeri Indonesia dapat dilunasi kapan saja menggunakan uang cetakan baru"
                ],
                "correct": 1,
                "hint": "Beban utang Indonesia terkendali di bawah 40% PDB, jauh lebih aman dibanding Amerika Serikat atau Jepang yang utangnya tembus 120-250% PDB!",
                "debrief": "Tepat! Rasio utang yang konservatif memberikan ruang manuver fiskal (Fiscal Space) saat krisis tak terduga melanda, serta menjaga peringkat kredit <em>Investment Grade</em> Indonesia."
            },
            {
                "id": "s3_q4",
                "scenario": "🏢 Efek Crowding-Out",
                "question": "Jika pemerintah menerbitkan Surat Berharga Negara (SBN) dalam jumlah yang terlampau masif dengan imbal hasil (yield) yang sangat tinggi, bahaya 'Crowding-Out Effect' apakah yang dapat menimpa sektor swasta?",
                "options": [
                    "Tingkat suku bunga perbankan untuk nasabah perorangan akan langsung anjlok ke angka nol persen",
                    "Pemerintah akan dipaksa membagikan keuntungan obligasi negara kepada seluruh pemegang saham swasta",
                    "Perusahaan swasta akan secara otomatis dinasionalisasi oleh kementerian badan usaha milik negara",
                    "Likuiditas dana perbankan tersedot habis untuk membeli obligasi negara yang bebas risiko, sehingga perusahaan swasta kesulitan meminjam modal kerja atau terpaksa membayar bunga kredit yang mencekik"
                ],
                "correct": 3,
                "hint": "Ibarat orang raksasa melompat ke dalam kolam renang kecil: airnya tumpah keluar semua, membuat perenang kecil (swasta) kehabisan air!",
                "debrief": "Jenius! Ini adalah <span class='econ-jargon' data-term='crowding_out'>Crowding-Out Effect</span>. Ketika pemerintah meminjam terlalu rakus dengan bunga tinggi, dana simpanan masyarakat disedot ke kas negara, mencekik ruang kredit investasi swasta."
            },
            {
                "id": "s3_q5",
                "scenario": "🎯 Reformasi Subsidi: Barang vs Orang",
                "question": "Teknokrat ekonomi makro merekomendasikan transformasi subsidi harga komoditas (seperti subsidi terbuka elpiji 3 kg atau BBM) menjadi Bantuan Sosial Tunai Langsung (BLT) berbasis data identitas. Apa keunggulan fundamental reformasi ini?",
                "options": [
                    "Subsidi langsung menghapuskan seluruh kewajiban pemerintah untuk mengimpor minyak mentah dari luar negeri",
                    "Subsidi langsung mewajibkan penerima bantuan bekerja tanpa upah di kantor dinas sosial setempat",
                    "Subsidi komoditas terbukti menurunkan harga beli barang di seluruh pasar internasional secara permanen",
                    "Subsidi langsung kepada orang miskin menjamin alokasi tepat sasaran (Targeted), mencegah kebocoran subsidi dinikmati oleh orang kaya yang mampu membeli barang murah dalam jumlah banyak"
                ],
                "correct": 3,
                "hint": "Subsidi harga barang dinikmati orang kaya yang punya mobil dan restoran; subsidi langsung masuk ke rekening keluarga prasejahtera yang berhak!",
                "debrief": "Sangat tepat! Subsidi berbasis barang bersifat regresif karena orang kaya yang mengonsumsi lebih banyak justru menyerap porsi subsidi terbesar. Transformasi ke bantuan tunai bersyarat (<span class='econ-jargon' data-term='subsidi_tepat_sasaran'>Targeted Transfer</span>) jauh lebih adil dan efisien."
            },
            {
                "id": "s3_q6",
                "scenario": "📜 Menutup Defisit dengan SBN",
                "question": "Ketika pendapatan negara dari pajak tercatat Rp 2.800 triliun sementara belanja negara mencapai Rp 3.300 triliun, terdapat defisit anggaran Rp 500 triliun. Bagaimanakah Kementerian Keuangan membiayai defisit tersebut secara sah dan prudent?",
                "options": [
                    "Memerintahkan bank sentral mencetak uang tunai kertas senilai Rp 500 triliun secara diam-diam di malam hari",
                    "Menjual pulau-pulau terluar wilayah kedaulatan negara kepada negara tetangga",
                    "Memotong saldo tabungan seluruh nasabah perbankan sebesar defisit anggaran yang dibutuhkan",
                    "Menerbitkan Surat Berharga Negara (SBN) seperti ORI, Sukuk Negara, dan SUN kepada investor ritel domestik maupun institusi di pasar modal"
                ],
                "correct": 3,
                "hint": "Pemerintah meminjam modal dari masyarakat dan investor secara transparan lewat surat obligasi negara yang menjanjikan imbalan kupon!",
                "debrief": "Tepat! Penerbitan <span class='econ-jargon' data-term='sbn'>Surat Berharga Negara (SBN)</span> adalah instrumen pembiayaan utang modern yang transparan, diawasi DPR, dan menjadi wadah investasi aman bagi masyarakat."
            },
            {
                "id": "s3_q7",
                "scenario": "🔄 Kebijakan Fiskal Kontrasiklikal",
                "question": "Ketika ekonomi sedang menghadapi resesi global dan konsumsi swasta anjlok, Kementerian Keuangan menerapkan kebijakan 'Fiskal Kontrasiklikal' (Countercyclical Fiscal Policy). Apakah wujud konkret dari kebijakan ini?",
                "options": [
                    "Pemerintah justru sengaja memperbesar belanja negara dan memberikan insentif pajak untuk menopang daya beli, meskipun defisit anggaran membengkak sementara",
                    "Pemerintah membubarkan seluruh badan usaha milik negara dan menghentikan pembayaran gaji pegawai",
                    "Pemerintah langsung memangkas seluruh anggaran belanja dan menaikkan tarif pajak setinggi-tingginya untuk mengejar surplus",
                    "Pemerintah mengalihkan seluruh anggaran negara untuk membeli mata uang kripto luar negeri"
                ],
                "correct": 0,
                "hint": "Saat swasta dan masyarakat mengerem belanja karena takut, pemerintah justru harus menginjak gas belanja agar mesin ekonomi tidak mogok!",
                "debrief": "Luar biasa! Kontrasiklikal berarti bergerak melawan arah siklus bisnis. Saat ekonomi lesu, belanja negara menjadi lokomotif penyelamat; sebaliknya saat ekonomi booming (<span class='econ-jargon' data-term='fiskal_kontrasiklikal'>Overheating</span>), pemerintah mengerem belanja untuk konsolidasi."
            },
            {
                "id": "s3_q8",
                "scenario": "📊 Rasio Pajak terhadap PDB (Tax Ratio)",
                "question": "Rasio Pajak (Tax Ratio) Indonesia saat ini berada di kisaran 10% - 10,5% dari PDB, relatif lebih rendah dibanding rata-rata negara berpendapatan menengah di ASEAN. Apa konsekuensi jangka panjang dari rendahnya Tax Ratio ini?",
                "options": [
                    "Perekonomian nasional akan mengalami inflasi tinggi hingga mencapai batas hiperinflasi",
                    "Ruang fiskal negara terbatas untuk mendanai sektor krusial seperti riset, pendidikan unggul, dan infrastruktur tanpa menambah utang baru",
                    "Pemerintah dilarang menyusun anggaran pendapatan dan belanja negara untuk tahun berikutnya",
                    "Seluruh perusahaan asing akan secara otomatis membatalkan investasinya di wilayah Republik Indonesia"
                ],
                "correct": 1,
                "hint": "Uang pajak yang terkumpul sedikit membuat kas negara pas-pasan, sehingga belanja sekolah dan jembatan jadi terbatas atau terpaksa berutang!",
                "debrief": "Tepat! <span class='econ-jargon' data-term='tax_ratio'>Tax Ratio</span> mengukur kemampuan negara menghimpun penerimaan pajak dari kue ekonominya. Menaikkan tax ratio melalui reformasi perpajakan adalah kunci kemandirian pembiayaan pembangunan bangsa."
            },
            {
                "id": "s3_q9",
                "scenario": "⚖️ Pajak Progresif PPh Orang Pribadi",
                "question": "Sistem perpajakan Indonesia mengenakan tarif Pajak Penghasilan (PPh) Orang Pribadi berjenjang: 5% untuk penghasilan terbawah hingga 35% untuk penghasilan di atas Rp 5 miliar. Filosofi keadilan apakah yang mendasari tarif progresif ini?",
                "options": [
                    "Prinsip kesetaraan mutlak di mana setiap warga negara wajib menyetorkan nominal rupiah yang persis sama",
                    "Prinsip Keadilan Kemampuan Membayar (Ability-to-Pay Principle) dan pemerataan, di mana kelompok berpenghasilan super kaya memikul kontribusi persentase lebih besar untuk membiayai fasilitas publik bagi warga kurang mampu",
                    "Prinsip acak di mana tarif pajak ditentukan melalui undian berhadiah setiap awal tahun anggaran",
                    "Prinsip hukuman finansial kepada warga negara yang berhasil membangun bisnis besar dan sukses"
                ],
                "correct": 1,
                "hint": "Mereka yang memetik keuntungan miliaran dari pasar Indonesia wajib menyumbang porsi lebih besar untuk membiayai sekolah dan rumah sakit rakyat!",
                "debrief": "Tepat! Pajak progresif adalah alat redistribusi pendapatan paling ampuh untuk mempersempit jurang kesenjangan sosial (<span class='econ-jargon' data-term='rasio_gini'>Rasio Gini</span>)."
            },
            {
                "id": "s3_q10",
                "scenario": "🛒 Karakteristik Pajak Pertambahan Nilai (PPN)",
                "question": "Pajak Pertambahan Nilai (PPN) yang dipungut dari setiap transaksi barang dan jasa di minimarket sering dikritik ekonom karena memiliki sifat 'Regresif'. Mengapa PPN dikatakan regresif?",
                "options": [
                    "Karena tarif persentasenya sama bagi semua orang, sehingga membebani porsi persentase pendapatan yang jauh lebih besar bagi warga miskin dibanding orang kaya",
                    "Karena hasil pungutan PPN tidak pernah disetorkan oleh kasir toko ke kas penerimaan negara",
                    "Karena PPN hanya dipungut dari transaksi penjualan bahan pangan pokok di pasar tradisional",
                    "Karena PPN secara otomatis menurunkan omzet penjualan barang ekspor Indonesia di luar negeri"
                ],
                "correct": 0,
                "hint": "Tarif PPN 11% untuk sebotol sabun terasa sangat berat bagi buruh bergaji pas-pasan, tetapi sama sekali tidak terasa bagi seorang miliarder!",
                "debrief": "Benar! Pajak tidak langsung atas konsumsi bersifat regresif terhadap pendapatan. Untuk mengimbanginya, pemerintah membebaskan sembako pokok dan kebutuhan dasar rakyat dari pengenaan PPN."
            },
            {
                "id": "s3_q11",
                "scenario": "💼 Pajak Penghasilan Badan & Investasi",
                "question": "Banyak negara bersaing menurunkan tarif Pajak Penghasilan (PPh) Badan Korporasi untuk menarik minat penanaman modal. Namun mengapa penurunan tarif PPh Badan yang terlampau drastis dapat menjadi bumerang (Race to the Bottom)?",
                "options": [
                    "Penerimaan kas negara dari sektor korporasi anjlok drastis, memaksa pemerintah memotong belanja publik atau menaikkan pajak konsumsi yang membebani rakyat biasa",
                    "Tingkat suku bunga perbankan komersial akan langsung melonjak hingga menyentuh batas tertinggi",
                    "Perusahaan multinasional akan menolak berinvestasi karena menganggap tarif pajak murah sebagai tanda kebangkrutan negara",
                    "Karyawan perusahaan secara otomatis akan menuntut kenaikan gaji bulanan hingga lima kali lipat"
                ],
                "correct": 0,
                "hint": "Perang diskon pajak antar-negara membuat kas negara boncos, sementara perusahaan multinasional meraup untung jumbo tanpa membayar pajak yang adil!",
                "debrief": "Tepat! Fenomena <em>Race to the Bottom</em> mengikis penerimaan negara. Inilah alasan mengapa kesepakatan pajak global (OECD Global Minimum Tax 15%) digagas untuk mencegah perang tarif pajak korporasi."
            },
            {
                "id": "s3_q12",
                "scenario": "🛡️ Penstabil Otomatis (Automatic Stabilizers)",
                "question": "Dalam struktur APBN modern, instrumen apakah yang bekerja secara otomatis meredam gejolak ekonomi tanpa memerlukan undang-undang baru dari DPR saat terjadi resesi?",
                "options": [
                    "Penetapan harga pagu tertinggi untuk seluruh barang dagangan di toko kelontong swasta",
                    "Pembagian dividen laba tunai badan usaha milik negara kepada seluruh pemilih terdaftar",
                    "Pajak penghasilan progresif (otomatis menyusut saat laba turun) dan belanja jaring pengaman sosial/bansos (otomatis meningkat saat angka kemiskinan naik)",
                    "Pencetakan obligasi perang darurat yang diterbitkan langsung oleh komisi pemilihan umum"
                ],
                "correct": 2,
                "hint": "Saat krisis, setoran pajak otomatis berkurang dan pengeluaran bansos otomatis bertambah, langsung menjadi peredam kejut tanpa perlu rapat berbulan-bulan!",
                "debrief": "Jenius! <span class='econ-jargon' data-term='automatic_stabilizers'>Penstabil Otomatis (Automatic Stabilizers)</span> langsung menyerap guncangan resesi secara mandiri, menopang konsumsi agregat di saat sektor swasta tertekan."
            },
            {
                "id": "s3_q13",
                "scenario": "🏦 Keseimbangan Primer (Primary Balance)",
                "question": "Dalam laporan realisasi APBN, Kementerian Keuangan membedakan antara 'Defisit Total' dan 'Keseimbangan Primer'. Apakah yang dimaksud dengan Keseimbangan Primer mencatat surplus?",
                "options": [
                    "Cadangan kas kementerian keuangan disimpan dalam bentuk mata uang emas batangan murni",
                    "Seluruh penerimaan pajak negara berasal dari sektor industri pertambangan minyak dan gas",
                    "Total pendapatan negara melampaui total belanja negara sebelum memperhitungkan pembayaran kewajiban bunga utang",
                    "Pemerintah berhasil melunasi seluruh pokok utang luar negeri dalam satu hari kerja"
                ],
                "correct": 2,
                "hint": "Pendapatan negara sudah sanggup menutup seluruh belanja operasional dan proyek, tanpa perlu berutang baru untuk membayar bunga pinjaman lama!",
                "debrief": "Sangat tepat! Surplus <span class='econ-jargon' data-term='keseimbangan_primer'>Keseimbangan Primer</span> adalah indikator kesehatan fiskal tertinggi. Artinya, pemerintah tidak perlu berutang baru hanya untuk membayar cicilan bunga utang lama (gali lubang tutup lubang)."
            },
            {
                "id": "s3_q14",
                "scenario": "🏛️ Belanja Transfer ke Daerah (TKD)",
                "question": "Sekitar sepertiga dari total belanja APBN disalurkan ke pemerintah provinsi dan kabupaten/kota melalui Transfer ke Daerah (TKD) seperti DAU, DAK, dan Dana Desa. Apa tujuan makroekonomi utama dari transfer fiskal ini?",
                "options": [
                    "Membiayai kampanye politik para calon kepala daerah yang akan bertarung dalam pilkada serentak",
                    "Membeli saham perusahaan asing yang beroperasi di kawasan ekonomi khusus luar negeri",
                    "Mengurangi ketimpangan fiskal horizontal antar-daerah dan menjamin pemerataan pelayanan publik dasar di seluruh pelosok Nusantara",
                    "Memaksa pemerintah daerah menyerahkan seluruh pendapatan asli daerahnya ke kas kementerian keuangan"
                ],
                "correct": 2,
                "hint": "Daerah terpencil dengan PAD kecil tetap bisa membangun puskesmas, jembatan desa, dan menggaji guru berkat transfer dana dari APBN pusat!",
                "debrief": "Tepat! Transfer ke Daerah (TKD) adalah instrumen desentralisasi fiskal untuk mewujudkan sila kelima keadilan sosial, menutup kesenjangan kapasitas fiskal antar-wilayah di Indonesia."
            },
            {
                "id": "s3_q15",
                "scenario": "💎 Dana Abadi Pendidikan (LPDP) & Danantara",
                "question": "Pemerintah mengalokasikan ratusan triliun rupiah ke dalam Dana Abadi Pendidikan (LPDP) dan Sovereign Wealth Fund. Mengapa dana ini diinvestasikan secara permanen dan hanya imbal hasil investasinya yang dibelanjakan?",
                "options": [
                    "Menyembunyikan sisa anggaran APBN agar tidak diaudit oleh Badan Pemeriksa Keuangan (BPK)",
                    "Menjaga keadilan antargenerasi (Intergenerational Equity), sehingga rezeki penerimaan negara saat ini dapat dinikmati manfaatnya oleh generasi anak cucu di masa depan secara abadi",
                    "Membayar gaji pejabat pengelola dana abadi dengan nominal persentase keuntungan tertinggi di dunia",
                    "Menghindari kewajiban menyalurkan beasiswa kepada putra-putri berprestasi dari keluarga kurang mampu"
                ],
                "correct": 1,
                "hint": "Uang pokoknya disimpan abadi di lumbung investasi, bunganya yang ratusan triliun dipakai menyekolahkan puluhan ribu anak bangsa ke universitas terbaik dunia!",
                "debrief": "Luar biasa! Konsep <em>Sovereign Wealth Fund</em> dan Dana Abadi memastikan bahwa kekayaan bangsa tidak habis dihabiskan untuk konsumsi sesaat, melainkan menjadi warisan modal abadi lintas generasi."
            },
            {
                "id": "s3_q16",
                "scenario": "📑 Belanja Wajib Pendidikan 20% (Mandatory Spending)",
                "question": "UUD 1945 mengamanatkan pemerintah mengalokasikan minimal 20% dari total APBN untuk sektor pendidikan. Dari perspektif teori pertumbuhan ekonomi Solow, belanja pendidikan ini merupakan investasi pada:",
                "options": [
                    "Barang modal mesin pabrik yang mengalami penyusutan nilai fisik dalam kurun waktu lima tahun",
                    "Pembayaran bunga kupon obligasi Surat Berharga Negara yang jatuh tempo pada tahun berjalan",
                    "Cadangan likuiditas darurat untuk mengintervensi nilai tukar mata uang di pasar uang internasional",
                    "Modal Manusia (Human Capital), yang meningkatkan produktivitas tenaga kerja, kapasitas inovasi, dan potensi output riil jangka panjang"
                ],
                "correct": 3,
                "hint": "Mencerdaskan manusia Indonesia adalah investasi terbaik: tenaga kerja terampil dan inovatif menghasilkan output ekonomi berlipat ganda!",
                "debrief": "Tepat! Dalam model pertumbuhan ekonomi, <span class='econ-jargon' data-term='human_capital'>Human Capital</span> adalah pendorong utama kemajuan teknologi dan produktivitas total faktor (TFP) yang membebaskan bangsa dari jebakan pendapatan menengah."
            },
            {
                "id": "s3_q17",
                "scenario": "📜 Peringkat Kredit (Sovereign Credit Rating)",
                "question": "Lembaga pemeringkat internasional (seperti Moody's, S&P, Fitch) menyematkan peringkat 'Investment Grade' (Baa2 / BBB) pada surat utang pemerintah Indonesia. Mengapa peringkat ini sangat penting bagi kementerian keuangan?",
                "options": [
                    "Mewajibkan seluruh bank asing menyetorkan 50% modalnya ke kas rekening kementerian keuangan",
                    "Mengizinkan pemerintah mencetak uang kertas Dolar Amerika Serikat di percetakan nasional",
                    "Menurunkan suku bunga (yield) yang diminta investor saat membeli SBN, sehingga biaya pembayaran bunga utang yang ditanggung APBN menjadi jauh lebih murah",
                    "Membebaskan kementerian keuangan dari kewajiban mengembalikan uang pokok pinjaman obligasi negara"
                ],
                "correct": 2,
                "hint": "Peringkat kredit bagus ibarat reputasi orang jujur: dipinjamkan uang dengan bunga murah. Kalau peringkat sampah (junk), investor menuntut bunga selangit!",
                "debrief": "Sangat tepat! Status <em>Investment Grade</em> mencerminkan persepsi risiko gagal bayar yang rendah. Setiap perbaikan peringkat memangkas beban kupon bunga utang APBN hingga puluhan triliun rupiah."
            },
            {
                "id": "s3_q18",
                "scenario": "🏭 Insentif Tax Holiday untuk Hilirisasi",
                "question": "Pemerintah memberikan fasilitas Tax Holiday (pembebasan PPh Badan selama 5-20 tahun) kepada investor yang membangun smelter nikel dan pabrik baterai mobil listrik di dalam negeri. Apa pertimbangan kalkulasi makroekonominya?",
                "options": [
                    "Menghapuskan keterlibatan tenaga kerja lokal dalam operasional industri pengolahan mineral strategis",
                    "Meskipun kehilangan penerimaan pajak jangka pendek, negara memperoleh transfer teknologi, penyerapan tenaga kerja lokal, dan devisa ekspor bernilai tambah tinggi berlipat ganda",
                    "Memastikan bahwa hasil tambang mentah dapat diekspor bebas tanpa perlu diolah di dalam negeri",
                    "Membantu pemilik modal asing membawa seluruh keuntungan tambang ke luar negeri tanpa kewajiban apa pun"
                ],
                "correct": 1,
                "hint": "Mengorbankan sedikit setoran pajak di awal demi mendapatkan pabrik raksasa yang menyerap puluhan ribu pekerja dan melipatgandakan devisa ekspor!",
                "debrief": "Benar! Kebijakan insentif pajak selektif adalah instrumen kebijakan industri (Industrial Policy) untuk mendorong hilirisasi komoditas dan memperkuat struktur manufaktur nasional."
            },
            {
                "id": "s3_q19",
                "scenario": "🚬 Cukai Rokok & Eksternalitas Negatif",
                "question": "Setiap tahun pemerintah menaikkan tarif cukai hasil tembakau (rokok) rata-rata 10-15%. Selain menyumbang penerimaan kas negara lebih dari Rp 200 triliun, apa fungsi regulasi (Pigouvian Tax) dari cukai rokok?",
                "options": [
                    "Memberikan subsidi cuma-cuma kepada konglomerat pemilik pabrik rokok multinasional",
                    "Menginternalisasi biaya eksternalitas negatif (beban kesehatan penyakit kronis akibat rokok) dan mengendalikan konsumsi rokok pada anak muda",
                    "Memaksa petani tembakau memusnahkan seluruh hasil panen daun tembakaunya di ladang",
                    "Mendorong masyarakat beralih mengonsumsi rokok ilegal tanpa pita cukai resmi"
                ],
                "correct": 1,
                "hint": "Mengenakan pungutan tambahan pada barang yang merusak kesehatan untuk membiayai pengobatan BPJS dan membuat orang berpikir dua kali sebelum merokok!",
                "debrief": "Tepat! Cukai adalah <span class='econ-jargon' data-term='pajak_pigouvian'>Pajak Pigouvian</span> untuk mengoreksi kegagalan pasar. Beban penyakit akibat rokok membebani anggaran kesehatan BPJS, sehingga konsumen rokok dikompensasikan melalui cukai."
            },
            {
                "id": "s3_q20",
                "scenario": "🌱 Pajak Karbon (Carbon Tax) & Transisi Energi",
                "question": "Indonesia telah merancang regulasi pengenaan Pajak Karbon atas emisi gas rumah kaca yang dihasilkan pembangkit listrik tenaga uap (PLTU) batu bara. Tujuan strategis jangka panjang kebijakan fiskal ini adalah:",
                "options": [
                    "Mengalihkan kepemilikan tambang batu bara nasional ke tangan perusahaan negara asing",
                    "Melarang pabrik manufaktur mengekspor barang produksinya ke negara-negara maju di Eropa",
                    "Mematikan seluruh pasokan listrik nasional dan memaksa warga kembali menggunakan lampu minyak tanah",
                    "Menciptakan insentif finansial agar pelaku industri beralih ke energi baru terbarukan (EBT) dan mendukung target Net Zero Emission 2060"
                ],
                "correct": 3,
                "hint": "Membuat emisi polusi jadi mahal, sehingga perusahaan terpacu berinvestasi pada teknologi ramah lingkungan dan energi surya/angin!",
                "debrief": "Tepat sekali! Pajak Karbon memanfaatkan mekanisme harga pasar (Market-Based Instrument) untuk mempercepat dekarbonisasi ekonomi dan membuka peluang perdagangan bursa karbon internasional."
            },
            {
                "id": "s3_q21",
                "scenario": "🤝 Kerjasama Pemerintah & Badan Usaha (KPBU)",
                "question": "Pembangunan sistem penyediaan air minum dan bandara baru sering menggunakan skema KPBU (Public-Private Partnership) ketimbang 100% didanai APBN. Apa keuntungan utama skema pembiayaan kreatif ini bagi kementerian keuangan?",
                "options": [
                    "Menjamin bahwa seluruh tarif pemanfaatan layanan air minum digratiskan tanpa batas waktu",
                    "Menghapuskan seluruh kepemilikan aset infrastruktur publik dan menyerahkannya permanen kepada swasta",
                    "Mengurangi beban langsung kas APBN, membagi risiko proyek dengan pihak swasta, dan meningkatkan efisiensi operasional layanan publik",
                    "Membebaskan kementerian keuangan dari kewajiban mematuhi undang-undang pengadaan barang dan jasa"
                ],
                "correct": 2,
                "hint": "APBN tidak sanggup menanggung semua proyek sekaligus; swasta diajak bermitra membangun dengan jaminan hukum dan bagi hasil yang adil!",
                "debrief": "Benar! Skema KPBU adalah jalan keluar keterbatasan ruang fiskal APBN (Creative Financing). Infrastruktur terbangun lebih cepat dengan standar manajemen swasta profesional."
            },
            {
                "id": "s3_q22",
                "scenario": "🛡️ KSSK: Komite Stabilitas Sistem Keuangan",
                "question": "Ketika stabilitas ekonomi terancam oleh guncangan krisis finansial, menteri keuangan memimpin rapat koordinasi KSSK bersama Gubernur BI, Ketua OJK, dan Ketua LPS. Mengapa koordinasi 4 lembaga ini mutlak diperlukan?",
                "options": [
                    "Memastikan bauran kebijakan fiskal, moneter, pengawasan perbankan, dan penjaminan simpanan bergerak seirama tanpa ego sektoral demi mencegah kebangkrutan sistemik",
                    "Memutuskan pembagian laba kas negara kepada para direktur perbankan swasta yang mengalami kebangkrutan",
                    "Menyusun undang-undang baru tanpa perlu melibatkan pembahasan bersama anggota Dewan Perwakilan Rakyat",
                    "Mengambil alih kekuasaan yudikatif mahkamah agung dan mahkamah konstitusi di bidang sengketa pemilu"
                ],
                "correct": 0,
                "hint": "Empat pilar penjaga benteng ekonomi bangsa: Menteri Keuangan (Fiskal), Gubernur BI (Moneter), OJK (Pengawasan Bank), dan LPS (Penjamin Tabungan)!",
                "debrief": "Luar biasa! Lembaga <span class='econ-jargon' data-term='kssk'>KSSK</span> adalah benteng komando penanganan krisis. Sinergi 4 pilar otoritas keuangan ini mencegah krisis likuiditas satu bank merembet menjadi krisis ekonomi nasional."
            },
            {
                "id": "s3_q23",
                "scenario": "🔄 Sisa Lebih Pembiayaan Anggaran (SiLPA)",
                "question": "Di akhir tahun anggaran, realisasi defisit APBN ternyata lebih kecil dari proyeksi awal, menyisakan saldo kas yang disebut SiLPA. Bagaimana pemanfaatan terbaik saldo kas SiLPA ini oleh kementerian keuangan?",
                "options": [
                    "Digunakan sebagai bantalan kas (Fiscal Buffer) untuk mengantisipasi ketidakpastian awal tahun dan mengurangi penerbitan utang baru di tahun berikutnya",
                    "Dihapuskan dari pencatatan neraca perbendaharaan negara karena dianggap sebagai sisa dana basi",
                    "Dihibahkan kepada bank-bank swasta internasional untuk ditukarkan dengan obligasi negara asing",
                    "Dibagikan secara tunai sebagai bonus akhir tahun kepada seluruh pegawai kementerian keuangan"
                ],
                "correct": 0,
                "hint": "Sisa uang belanja yang tidak terpakai disimpan di brankas kas negara sebagai cadangan darurat, mengurangi kebutuhan meminjam utang baru tahun depan!",
                "debrief": "Tepat! SiLPA bertindak sebagai <em>Cash Buffer</em> kas negara. Pengelolaan SiLPA yang cermat memperkuat likuiditas pemerintah saat menghadapi guncangan awal tahun."
            },
            {
                "id": "s3_q24",
                "scenario": "💼 Efisiensi Belanja Barang (Spending Better)",
                "question": "Kementerian Keuangan meluncurkan kebijakan efisiensi 'Spending Better' dengan memangkas pos belanja perjalanan dinas, rapat konsumsi di hotel mewah, dan pengadaan seremonial. Dampak positifnya terhadap struktur APBN adalah:",
                "options": [
                    "Pemerintah terpaksa menurunkan gaji pokok seluruh aparatur sipil negara dan anggota kepolisian",
                    "Ruang fiskal yang dihemat dapat dialihkan untuk memperbesar pos belanja modal produktif, bantuan sosial gizi anak, dan beasiswa pendidikan",
                    "Perekonomian perhotelan swasta akan langsung mengalami kebangkrutan total secara permanen",
                    "Kementerian dan lembaga dilarang menggunakan sambungan listrik dan internet di kantor operasionalnya"
                ],
                "correct": 1,
                "hint": "Hentikan pemborosan rapat seremonial di hotel; alihkan uangnya untuk bangun puskesmas dan beasiswa anak miskin!",
                "debrief": "Benar! Kualitas belanja (Quality of Spending) jauh lebih penting dibanding kuantitas nominal. Memangkas inefisiensi birokrasi melipatgandakan daya ungkit APBN bagi kesejahteraan rakyat."
            },
            {
                "id": "s3_q25",
                "scenario": "💰 Struktur Utang: Domestik vs Valas",
                "question": "Kementerian Keuangan menggeser komposisi utang pemerintah dari pinjaman valas luar negeri menjadi dominan SBN berdenominasi Rupiah (lebih dari 70%). Apa keuntungan strategis dari portofolio utang Rupiah ini?",
                "options": [
                    "Imbal hasil kupon obligasi Rupiah otomatis menjadi nol persen sepanjang masa tenor utang berjalan",
                    "Membuat utang pemerintah tidak dapat dilihat oleh lembaga pemeringkat kredit internasional",
                    "Pemerintah dibebaskan dari kewajiban mengembalikan dana pokok utang kepada para investor dalam negeri",
                    "Meminimalkan risiko nilai tukar (Currency Risk), sehingga jika Rupiah terdepresiasi terhadap Dolar AS, beban pokok dan bunga utang pemerintah tidak membengkak secara mendadak"
                ],
                "correct": 3,
                "hint": "Bila berutang dalam Rupiah, pelemahan kurs Dolar tidak membuat utang kita mendadak melonjak seperti yang terjadi pada krisis 1998!",
                "debrief": "Jenius! Pelajaran berharga dari krisis 1998 adalah bahaya utang valas asing. Dominasi utang berdenominasi mata uang domestik (Rupiah) membentengi APBN dari petaka lonjakan kurs valuta asing."
            },
            {
                "id": "s3_q26",
                "scenario": "💻 Digitalisasi Core Tax & Shadow Economy",
                "question": "Direktorat Jenderal Pajak mengimplementasikan pembaruan sistem teknologi perpajakan canggih (Core Tax System). Manfaat makroekonomi terbesar dari integrasi data digital perpajakan ini adalah:",
                "options": [
                    "Menaikkan tarif persentase pajak penghasilan buruh secara otomatis setiap awal bulan",
                    "Menjamin bahwa seluruh pengusaha kaya dibebaskan dari kewajiban menyampaikan Surat Pemberitahuan (SPT) tahunan",
                    "Memaksa seluruh pedagang eceran pasar tradisional menyerahkan buku kas dagangnya ke kantor polisi",
                    "Memperluas basis pajak dan memperkecil ekonomi bayangan (Shadow Economy) melalui pengawasan kepatuhan wajib pajak yang transparan dan akurat"
                ],
                "correct": 3,
                "hint": "Membongkar persembunyian penghasilan ilegal dan shadow economy agar semua pihak membayar pajak secara adil dan transparan!",
                "debrief": "Tepat! Digitalisasi perpajakan (<span class='econ-jargon' data-term='core_tax'>Core Tax System</span>) meningkatkan efisiensi kepatuhan sukarela dan menekan kebocoran penerimaan negara secara sistematis."
            },
            {
                "id": "s3_q27",
                "scenario": "🌊 Pooling Fund Bencana Alam",
                "question": "Sebagai negara di jalur cincin api (Ring of Fire), Indonesia membentuk Dana Bersama Penanggulangan Bencana (Pooling Fund Bencana). Mengapa instrumen mitigasi fiskal ini sangat penting?",
                "options": [
                    "Mengharuskan korban bencana alam menanggung sendiri biaya rekonstruksi rumah dan fasilitas umumnya",
                    "Membeli seluruh peralatan peramalan cuaca satelit milik badan antariksa negara adidaya",
                    "Menyediakan dana cadangan siap pakai seketika untuk rekonstruksi pasca-gempa atau tsunami tanpa perlu merombak atau memangkas anggaran proyek strategis APBN yang sedang berjalan",
                    "Membayar premi asuransi kendaraan pribadi milik seluruh pejabat kementerian dan lembaga"
                ],
                "correct": 2,
                "hint": "Saat bencana alam tiba-tiba melanda, kas rekonstruksi langsung cair dari dana abadi bencana tanpa mengorbankan anggaran sekolah dan rumah sakit!",
                "debrief": "Benar! <em>Disaster Risk Financing</em> melindungi stabilitas APBN dari guncangan bencana alam tak terduga, mempercepat pemulihan fisik dan ekonomi para korban bencana."
            },
            {
                "id": "s3_q28",
                "scenario": "📈 Konsolidasi Fiskal Pasca-Pandemi",
                "question": "Ketika krisis pandemi Covid-19 mereda, pemerintah Indonesia berhasil mengembalikan defisit APBN ke bawah 3% PDB pada tahun 2022—satu tahun lebih cepat dari jadwal UU. Mengapa prestasi konsolidasi fiskal ini dipuji dunia internasional?",
                "options": [
                    "Pemerintah menyetop seluruh proyek infrastruktur jalan dan pelabuhan secara permanen di seluruh pulau",
                    "Pemerintah berhasil menghapuskan seluruh pos bantuan sosial dan layanan kesehatan masyarakat miskin",
                    "Kementerian Keuangan menaikkan tarif pajak bumi dan bangunan sebesar seribu persen secara serentak",
                    "Membuktikan disiplin fiskal dan ketangguhan penerimaan negara (windfall komoditas dan pemulihan ekonomi), memulihkan kepercayaan investor terhadap keberlanjutan keuangan jangka panjang"
                ],
                "correct": 3,
                "hint": "Mengembalikan rem defisit ke bawah 3% dengan cepat membuktikan bahwa kas negara dikelola secara profesional dan bertanggung jawab!",
                "debrief": "Luar biasa! Konsolidasi fiskal yang cepat membentengi Indonesia dari ancaman krisis utang yang melanda banyak negara berkembang lain pasca-pandemi."
            },
            {
                "id": "s3_q29",
                "scenario": "⚖️ Belanja Perlindungan Sosial (Perlinsos)",
                "question": "Anggaran Perlindungan Sosial (Perlinsos) dialokasikan mendekati Rp 500 triliun per tahun untuk Program Keluarga Harapan (PKH), Kartu Sembako, dan PIP. Dari kacamata ekonomi makro, belanja ini berfungsi sebagai:",
                "options": [
                    "Hadiah uang tunai tahunan yang dibagikan acak melalui undian nomor induk kependudukan di televisi",
                    "Pinjaman komersial berbunga tinggi yang wajib dicicil kembali oleh keluarga penerima manfaat kepada kas negara",
                    "Bantalan penopang daya beli kelompok 40% terbawah agar tidak jatuh ke jurang kemiskinan ekstrem sekaligus menjaga konsumsi agregat nasional",
                    "Ganti rugi tunai kepada pengusaha swasta yang mengalami penurunan omzet bisnis akibat persaingan pasar"
                ],
                "correct": 2,
                "hint": "Menjaga agar jutaan anak-anak keluarga miskin tetap bisa makan bergizi dan bersekolah, menopang perputaran belanja warung sembako!",
                "debrief": "Tepat! Perlinsos adalah fondasi stabilitas sosial dan ekonomi. Kelompok miskin yang terlindungi menjaga angka konsumsi dasar ($C$) nasional tetap stabil dan inklusif."
            },
            {
                "id": "s3_q30",
                "scenario": "📦 Penerimaan Negara Bukan Pajak (PNBP)",
                "question": "Selain dari sektor perpajakan, kas negara menerima ratusan triliun rupiah dari PNBP Sumber Daya Alam (royalti minyak, gas, batu bara, emas). Mengapa pengelolaan pos PNBP komoditas ini membutuhkan kehati-hatian ekstra?",
                "options": [
                    "Karena dana PNBP secara hukum internasional dilarang dibelanjakan untuk keperluan dalam negeri",
                    "Karena penerimaan PNBP komoditas bersifat sangat volatil mengikuti fluktuasi siklus harga bahan mentah dunia (Commodity Boom and Bust)",
                    "Karena penerimaan PNBP komoditas secara otomatis memicu defisit neraca pembayaran internasional",
                    "Karena royalti tambang hanya boleh disetorkan dalam bentuk karung batu bara fisik ke kantor kementerian"
                ],
                "correct": 1,
                "hint": "Saat harga tambang dunia meroket, kas negara banjir rezeki; tapi saat harga tambang anjlok, penerimaan bisa menyusut drastis!",
                "debrief": "Benar! Fenomena <em>Windfall Revenue</em> menuntut manajemen fiskal yang disiplin agar rezeki nomplok komoditas dialokasikan ke dana abadi, bukan dibakar untuk belanja konsumtif rutin."
            },
            {
                "id": "s3_q31",
                "scenario": "🏛️ Belanja Modal vs Belanja Barang",
                "question": "Dalam penyusunan postur APBN yang berkualitas, menteri keuangan selalu berupaya memperbesar proporsi Belanja Modal dibanding Belanja Barang. Apakah perbedaan fundamental dari kedua pos belanja ini?",
                "options": [
                    "Belanja Modal dibagikan langsung kepada masyarakat miskin, sedangkan Belanja Barang disimpan di gudang kementerian",
                    "Belanja Modal menghasilkan aset tetap berumur lebih dari satu tahun (gedung, jembatan, irigasi), sedangkan Belanja Barang habis pakai untuk operasional birokrasi (alat tulis, konsumsi, perjalanan dinas)",
                    "Belanja Modal diwajibkan diaudit oleh dewan perwakilan rakyat, sedangkan Belanja Barang tidak perlu pembukuan kas",
                    "Belanja Modal hanya boleh menggunakan mata uang asing, sedangkan Belanja Barang menggunakan mata uang lokal"
                ],
                "correct": 1,
                "hint": "Belanja modal meninggalkan warisan fisik bernilai puluhan tahun; belanja barang habis terpakai dalam hitungan hari!",
                "debrief": "Sangat tepat! Belanja Modal menambah stok modal kapital nasional ($K$), meningkatkan kapasitas output potensial ($Y^*$) perekonomian jangka panjang."
            },
            {
                "id": "s3_q32",
                "scenario": "🌾 Subsidi Pupuk vs Bantuan Alat Mesin Pertanian (Alsintan)",
                "question": "Pemerintah menggabungkan subsidi pupuk dengan bantuan alsintan (traktor, combine harvester) kepada kelompok tani. Dari perspektif fungsi produksi Cobb-Douglas $Y = A \\cdot K^\\alpha \\cdot L^\\beta$, bantuan alsintan meningkatkan komponen:",
                "options": [
                    "Tingkat suku bunga simpanan perbankan yang ditanggung oleh petani di pedesaan",
                    "Stok Kapital Fisik Pertanian (K) dan Efisiensi Teknologi (A), melipatgandakan produktivitas gabah per hektar sawah",
                    "Jumlah uang kartal beredar yang dicetak oleh pabrik uang peruri di kawasan industri",
                    "Jumlah tenaga kerja manual petani (L) yang mencangkul sawah dengan tangan kosong"
                ],
                "correct": 1,
                "hint": "Mesin traktor dan pemanen padi modern memangkas waktu panen dan melipatgandakan hasil gabah tanpa buang banyak bulir!",
                "debrief": "Tepat! Peningkatan modal alat ($K$) dan mekanisasi ($A$) melipatgandakan produktivitas sektor pertanian, memperkuat ketahanan pangan dan menaikkan taraf hidup petani."
            },
            {
                "id": "s3_q33",
                "scenario": "💵 Pembiayaan Utang Luar Negeri vs Domestik",
                "question": "Ketika pemerintah menerbitkan Samurai Bond (berdenominasi Yen di Jepang) atau Global Sukuk (berdenominasi USD), apa pertimbangan teknokrat selain memperluas diversifikasi basis investor internasional?",
                "options": [
                    "Menghapuskan kewajiban mengembalikan dana pinjaman jika terjadi perselisihan politik bilateral",
                    "Menjamin bahwa seluruh pekerja proyek infrastruktur wajib didatangkan dari negara kreditur",
                    "Memaksa bank sentral Jepang dan Amerika Serikat menghapus seluruh utang masa lalu Indonesia",
                    "Menyediakan tambahan likuiditas devisa bagi cadangan devisa nasional sekaligus menjadi acuan (benchmark) peringkat kredit bagi korporasi Indonesia yang ingin ekspansi global"
                ],
                "correct": 3,
                "hint": "Obligasi global menjadi jembatan diplomasi finansial dan benchmark kredibilitas instrumen investasi Indonesia di bursa dunia!",
                "debrief": "Benar! Diversifikasi instrumen utang valas global secara terukur memperkuat cadangan devisa dan membangun reputasi korporasi Indonesia di panggung keuangan dunia."
            },
            {
                "id": "s3_q34",
                "scenario": "⚖️ Evaluasi Spending Review Kementerian",
                "question": "Setiap semester, Direktorat Jenderal Anggaran menggelar evaluasi 'Spending Review' terhadap seluruh kementerian dan lembaga. Apa indikator utama keberhasilan penyerapan anggaran yang sehat?",
                "options": [
                    "Keberhasilan kementerian menolak diaudit oleh Badan Pemeriksa Keuangan dan Komisi Pemberantasan Korupsi",
                    "Bukan sekadar mengejar penyerapan anggaran 100% di akhir tahun, melainkan tercapainya output dan outcome fisik yang direncanakan secara efisien dan tepat waktu",
                    "Kemampuan kementerian menghabiskan seluruh sisa anggaran kas dalam kurun waktu satu malam sebelum tutup buku",
                    "Jumlah laporan rapat perjalanan dinas yang paling banyak disusun oleh para staf birokrasi"
                ],
                "correct": 1,
                "hint": "Bukan soal asal habiskan uang di bulan Desember, tapi apakah uang triliunan itu benar-benar jadi jalan tol yang mulus dan sekolah yang kokoh!",
                "debrief": "Tepat sekali! Paradigma <em>Performance-Based Budgeting</em>: penyerapan anggaran harus mencerminkan hasil nyata (Outcome) di lapangan, bukan sekadar laporan formalitas habis belanja."
            },
            {
                "id": "s3_q35",
                "scenario": "🏭 Ketahanan Fiskal Menghadapi Resesi",
                "question": "Dalam menghadapi risiko krisis ekonomi global, apakah pilar utama yang menjamin ketahanan fiskal (Fiscal Resilience) Republik Indonesia tetap kokoh?",
                "options": [
                    "Penjualan seluruh aset badan usaha milik negara kepada investor swasta asing tanpa syarat",
                    "Pencetakan uang kertas Rupiah tanpa batas oleh bank sentral untuk membiayai seluruh proyek kementerian",
                    "Defisit APBN yang terkendali, rasio utang yang konservatif, bantalan kas SiLPA yang memadai, serta komposisi utang yang didominasi mata uang domestik tenor panjang",
                    "Penolakan total membayar seluruh cicilan utang pokok kepada lembaga keuangan internasional"
                ],
                "correct": 2,
                "hint": "Empat pilar benteng pertahanan fiskal: defisit kecil, utang terkendali, cadangan kas siap pakai, dan utang dalam mata uang sendiri!",
                "debrief": "Luar biasa! Inilah rumus benteng ketahanan fiskal Indonesia yang teruji dalam berbagai guncangan krisis global."
            },
            {
                "id": "s3_q36",
                "scenario": "👑 Mahakarya Pengelola Keuangan Negara",
                "question": "Di akhir Level 3, apa esensi filosofis tertinggi dari penyusunan Anggaran Pendapatan dan Belanja Negara (APBN) bagi sebuah bangsa berdaulat?",
                "options": [
                    "APBN adalah dokumen administratif rahasia yang tidak boleh diketahui oleh masyarakat pembayar pajak",
                    "APBN adalah instrumen keadilan sosial dan kedaulatan bangsa; ia menghimpun gotong royong penerimaan negara untuk melindungi rakyat yang lemah, membangun fondasi masa depan, dan menjaga keutuhan NKRI",
                    "APBN adalah instrumen bisnis untuk memaksimalisasi dividen tunai bagi pejabat kementerian keuangan",
                    "APBN adalah alat politik untuk memenangkan pemilihan umum dengan cara membagikan uang kas negara tanpa pertanggungjawaban"
                ],
                "correct": 1,
                "hint": "APBN adalah wujud gotong royong 280 juta rakyat Indonesia: yang kuat membantu yang lemah, bersama membangun peradaban bangsa yang adil dan makmur!",
                "debrief": "Selamat! Anda telah menuntaskan seluruh 36 Soal Level 3 Kebijakan Fiskal dengan predikat gemilang! Pemahaman Anda mengenai arsitektur APBN, batas defisit, dan instrumen SBN kini setara teknokrat fiskal sejati!"
            }
        ]
    },
    {
        "id": 4,
        "title": "Level 4: 🚢 Pelabuhan Internasional & Valas",
        "subtitle": "Ekspor-Impor, Kurs Rupiah, Neraca Pembayaran & Devisa",
        "theme": "foreign_exchange",
        "unlocks": "Gelar: Nakhoda Perdagangan Global 🚢",
        "questionPool": [
            {
                "id": "s4_q1",
                "scenario": "🚢 Mengapa Rupiah Melemah saat Impor Lebih Besar?",
                "question": "Ketika nilai impor barang dan jasa melampaui nilai ekspor, mengapa nilai tukar Rupiah cenderung mengalami tekanan depresiasi terhadap Dolar AS?",
                "options": [
                    "Karena harga barang buatan dalam negeri secara sepihak dinaikkan oleh kementerian perdagangan luar negeri",
                    "Karena eksportir domestik menolak menerima pembayaran dalam mata uang Dolar Amerika Serikat",
                    "Karena bank sentral asing secara otomatis menyita uang kertas Rupiah yang beredar di pelabuhan",
                    "Karena importir membutuhkan dan memburu banyak Dolar AS untuk membayar pemasok luar negeri, melebihi devisa Dolar yang masuk dari hasil penjualan ekspor"
                ],
                "correct": 3,
                "hint": "Hukum permintaan dan penawaran: banyak yang butuh Dolar untuk bayar impor, Dolar jadi mahal dan Rupiah tertekan!",
                "debrief": "Tepat sekali! Transaksi impor membutuhkan penukaran Rupiah ke Dolar AS. Jika permintaan Dolar meluap melampaui pasokan devisa ekspor, nilai tukar Dolar terkerek naik dan <span class='econ-jargon' data-term='kurs_valas'>Nilai Tukar Rupiah</span> terdepresiasi."
            },
            {
                "id": "s4_q2",
                "scenario": "📉 Neraca Transaksi Berjalan (CAD)",
                "question": "Defisit Neraca Transaksi Berjalan (Current Account Deficit / CAD) yang melebihi 3% dari PDB sering dianggap sebagai zona merah kerentanan makro. Apa yang dicatat dalam Neraca Transaksi Berjalan ini?",
                "options": [
                    "Penjualan obligasi Surat Berharga Negara kepada investor institusi perbankan domestik",
                    "Total nilai aset tanah dan bangunan milik kedutaan besar luar negeri di ibu kota negara",
                    "Gabungan transaksi perdagangan barang (ekspor-impor), perdagangan jasa (transportasi & pariwisata), pendapatan primer (dividen/bunga modal), dan pendapatan sekunder (remitansi)",
                    "Selisih antara belanja kementerian dengan penerimaan pajak daerah di seluruh provinsi"
                ],
                "correct": 2,
                "hint": "Mencatat seluruh arus barang, jasa, dan pendapatan harian riil yang keluar-masuk menyeberangi perbatasan negara!",
                "debrief": "Benar! <span class='econ-jargon' data-term='neraca_pembayaran'>Neraca Transaksi Berjalan (Current Account)</span> mencerminkan daya saing riil bangsa. Defisit yang terlalu lebar menandakan negara hidup melebihi kemampuannya dan bergantung pada utang/modal luar negeri."
            },
            {
                "id": "s4_q3",
                "scenario": "💵 Neraca Transaksi Finansial (Capital Account)",
                "question": "Ketika terjadi defisit transaksi berjalan (CAD), bagaimanakah perekonomian Indonesia menyeimbangkan Neraca Pembayaran keseluruhan agar cadangan devisa tidak terkuras?",
                "options": [
                    "Mengurangi total pengeluaran belanja APBN hingga menyentuh angka nol persen dalam satu kuartal",
                    "Membeli seluruh mata uang Dolar milik bank sentral Amerika Serikat menggunakan uang pinjaman darurat",
                    "Menarik surplus pada Neraca Modal dan Finansial melalui Penanaman Modal Asing langsung (FDI) dan investasi portofolio (pembelian saham & SBN)",
                    "Melarang seluruh kapal kargo pengangkut barang impor bersandar di perairan teritorial Indonesia"
                ],
                "correct": 2,
                "hint": "Bila belanja barang impor lebih besar dari ekspor, kekurangannya harus ditambal oleh aliran modal asing (FDI & investasi modal) yang masuk!",
                "debrief": "Tepat! Keseimbangan dasar: $Current\\ Account + Financial\\ Account = \\Delta Reserves$. Aliran masuk modal asing (<span class='econ-jargon' data-term='neraca_pembayaran'>Capital Inflow</span>) menjadi penyangga penutup defisit transaksi berjalan."
            },
            {
                "id": "s4_q4",
                "scenario": "🛡️ Standar Cadangan Devisa Internasional",
                "question": "Bank Indonesia mengumumkan cadangan devisa sebesar US$ 140 miliar, setara dengan pembiayaan 6,5 bulan impor. Mengapa angka ini dinilai sangat aman oleh Dana Moneter Internasional (IMF)?",
                "options": [
                    "Karena standar kecukupan internasional mensyaratkan cadangan devisa minimal setara 3 bulan kebutuhan impor dan pembayaran utang luar negeri jangka pendek",
                    "Karena cadangan devisa sebesar itu secara otomatis menghapuskan seluruh pungutan pajak di dalam negeri",
                    "Karena seluruh cadangan devisa tersebut secara otomatis dibagi rata kepada seluruh warga negara di akhir tahun",
                    "Karena cadangan devisa diwajibkan oleh hukum internasional disimpan dalam bentuk koin emas batangan murni di brankas istana"
                ],
                "correct": 0,
                "hint": "Standar kecukupan cadangan devisa dunia adalah minimal 3 bulan impor; Indonesia punya 6,5 bulan impor—sangat tebal dan kokoh!",
                "debrief": "Sangat tepat! <span class='econ-jargon' data-term='cadangan_devisa'>Cadangan Devisa</span> adalah bantalan devisa moneter untuk mengintervensi pasar valas saat terjadi badai pelarian modal dan menjamin kelancaran impor pangan/energi."
            },
            {
                "id": "s4_q5",
                "scenario": "🔺 Trilema Moneter Mundell-Fleming",
                "question": "Teori Trilema Mundell-Fleming (The Impossible Trinity) menyatakan bahwa sebuah negara tidak mungkin mencapai tiga target kebijakan sekaligus secara bersamaan. Manakah kombinasi 3 target yang mustahil diraih serentak tersebut?",
                "options": [
                    "Inflasi Nol Persen, Pajak Nol Persen, dan Belanja Infrastruktur Tak Terbatas",
                    "Nilai Tukar Tetap (Fixed Exchange Rate), Lalu Lintas Modal Bebas (Free Capital Mobility), dan Kebijakan Moneter yang Independen",
                    "Pertumbuhan PDB 10%, Pengangguran Nol Persen, dan Surplus Neraca Perdagangan 100%",
                    "Pencetakan Uang Tanpa Batas, Suku Bunga Bebas Risiko, dan Cadangan Emas Terbesar di Dunia"
                ],
                "correct": 1,
                "hint": "Kamu hanya bisa memilih dua dari tiga pilar: kurs tetap, uang bebas keluar-masuk, atau bebas mengatur suku bunga sendiri!",
                "debrief": "Jenius! Ini adalah <span class='econ-jargon' data-term='trilema_mundell_fleming'>Trilema Mundell-Fleming</span>. Indonesia memilih: Arus Modal Bebas + Kebijakan Moneter Independen, sehingga harus merelakan Nilai Tukar bergerak mengambang fleksibel (Floating Exchange Rate)."
            },
            {
                "id": "s4_q6",
                "scenario": "🌊 Kurs Mengambang Bebas vs Kurs Tetap",
                "question": "Mengapa pada krisis moneter 1997-1998, rezim Kurs Mengambang Terkendali (yang dipatok kaku di kisaran Rp 2.500 per USD) akhirnya jebol dan memaksa Indonesia beralih ke Kurs Mengambang Bebas?",
                "options": [
                    "Karena seluruh uang kertas Dolar AS di dunia mendadak ditarik kembali oleh bank sentral Amerika Serikat",
                    "Karena pemerintah Indonesia secara sukarela ingin nilai tukar Rupiah melemah hingga level Rp 16.000 per USD",
                    "Karena bursa saham Wall Street di New York melarang perdagangan mata uang negara-negara Asia Tenggara",
                    "Karena cadangan devisa bank sentral habis terkuras akibat terus-menerus digelontorkan untuk membendung serangan spekulan pasar yang melepas Rupiah"
                ],
                "correct": 3,
                "hint": "Mempertahankan kurs tetap saat modal asing kabur masif ibarat menahan bendungan jebol dengan tangan kosong—cadangan devisa habis terbakar!",
                "debrief": "Tepat sekali! Pelajaran pahit 1997: Rezim kurs mengambang fleksibel (Managed Floating) saat ini bertindak sebagai <em>Shock Absorber</em> alami. Kurs melemah menyerap guncangan tanpa menghanguskan seluruh cadangan devisa."
            },
            {
                "id": "s4_q7",
                "scenario": "🦅 Kenaikan Suku Bunga The Fed AS",
                "question": "Ketika bank sentral Amerika Serikat (The Fed) menaikkan suku bunga acuannya secara agresif (Hawkish Fed), mengapa mata uang negara berkembang (Emerging Markets) serempak melemah?",
                "options": [
                    "Pemerintah Amerika Serikat melarang seluruh kegiatan ekspor impor dengan negara-negara berkembang",
                    "Seluruh bank komersial di Asia diwajibkan menutup rekening tabungan milik nasabah asing",
                    "Ekonomi negara-negara berkembang secara otomatis mengalami gagal panen pertanian serentak",
                    "Aset keuangan berdenominasi Dolar (seperti US Treasury) menawarkan imbal hasil lebih menarik dan aman, memicu fenomena 'Flight to Quality' di mana modal global pulang kampung ke AS"
                ],
                "correct": 3,
                "hint": "Saat bank sentral adidaya menaikkan bunga, investor sedunia menarik dolarnya dari pasar berkembang untuk ditabung di obligasi pemerintah AS yang aman!",
                "debrief": "Benar! Fenomena <em>Flight to Quality / Safety</em>. Dolar AS menguat perkasa (King Dollar), menekan mata uang seluruh dunia termasuk Rupiah, menuntut respon kebijakan moneter yang sigap."
            },
            {
                "id": "s4_q8",
                "scenario": "🏃 Pelarian Modal Asing (Capital Flight)",
                "question": "Apa dampak makroekonomi langsung yang terjadi di pasar keuangan domestik saat investor asing melakukan aksi jual massal (Sudden Stop / Capital Flight) di pasar saham dan obligasi Indonesia?",
                "options": [
                    "Nilai tukar Rupiah seketika menguat tajam terhadap seluruh mata uang negara tetangga",
                    "Cadangan devisa bank sentral melonjak berlipat ganda karena bertambahnya dana kas domestik",
                    "Indeks harga saham anjlok, yield obligasi SBN melonjak tajam (biaya utang naik), dan nilai tukar Rupiah tertekan depresiasi hebat di pasar valas",
                    "Tingkat inflasi di pasar tradisional langsung turun menyentuh angka deflasi ekstrem"
                ],
                "correct": 2,
                "hint": "Saham dibanting, obligasi dilepas, rupiah ditukar ke dolar lalu dibawa kabur ke luar negeri—pasar bergolak hebat!",
                "debrief": "Tepat! <span class='econ-jargon' data-term='kurs_valas'>Capital Flight</span> mengeringkan likuiditas valas, merontokkan harga aset domestik, dan menekan nilai tukar Rupiah hingga membutuhkan intervensi stabilisasi otoritas moneter."
            },
            {
                "id": "s4_q9",
                "scenario": "💎 Devisa Hasil Ekspor (DHE) di Dalam Negeri",
                "question": "Pemerintah menerbitkan Peraturan Pemerintah mengenai Devisa Hasil Ekspor (DHE) yang mewajibkan eksportir komoditas sumber daya alam (SDA) menempatkan minimal 30% devisanya di perbankan domestik selama 3 bulan. Mengapa kebijakan ini penting?",
                "options": [
                    "Memaksa negara pembeli komoditas membayar transaksi menggunakan mata uang emas batangan kuno",
                    "Memastikan hasil penjualan kekayaan bumi Indonesia benar-benar mengendap di dalam negeri untuk memperkuat cadangan devisa dan likuiditas valas nasional, bukan diparkir di perbankan Singapura",
                    "Menyita 30% kekayaan eksportir untuk dibagikan secara cuma-cuma kepada para menteri kabinet",
                    "Melarang seluruh kegiatan ekspor tambang dan perkebunan ke pasar internasional secara permanen"
                ],
                "correct": 1,
                "hint": "Nikel dan sawitnya dari tanah air kita, masak uang hasil ekspornya diparkir di bank luar negeri? Wajib menginap di dalam negeri untuk menjaga stabilitas Rupiah!",
                "debrief": "Luar biasa! Kebijakan DHE SDA memperkuat ketahanan moneter eksternal. Pasokan valas yang menetap di perbankan nasional mempertebal cadangan devisa dan menopang stabilitas kurs Rupiah."
            },
            {
                "id": "s4_q10",
                "scenario": "📦 Imported Inflation (Inflasi Impor)",
                "question": "Indonesia mengimpor gandum untuk bahan baku mi instan dan kedelai untuk tahu-tempe. Ketika kurs Rupiah melemah dari Rp 15.000 menjadi Rp 16.500 per Dolar AS, bagaimana dampaknya terhadap harga mi dan tahu di warung?",
                "options": [
                    "Harga mi instan dan tahu-tempe otomatis turun 50% karena importir mendapat subsidi dari negara pengekspor",
                    "Konsumen dilarang oleh pemerintah membeli produk makanan yang mengandung bahan baku impor",
                    "Harga mi instan dan tahu-tempe di warung ikut naik karena biaya impor bahan baku dalam rupiah menjadi lebih mahal (Imported Inflation)",
                    "Rasa tahu dan mi instan berubah menjadi hambar akibat pengaruh penurunan nilai mata uang rupiah"
                ],
                "correct": 2,
                "hint": "Membeli gandum pakai dolar yang makin mahal membuat ongkos bikin mi instan naik, alhasil harga jual di warteg ikut terkerek!",
                "debrief": "Tepat! Ini adalah fenomena <span class='econ-jargon' data-term='imported_inflation'>Imported Inflation</span> melalui saluran nilai tukar (Exchange Rate Pass-Through). Pelemahan kurs merambat ke harga barang konsumsi berbahan baku impor."
            },
            {
                "id": "s4_q11",
                "scenario": "🤝 Dedolarisasi & Local Currency Settlement (LCS)",
                "question": "Bank Indonesia aktif menjalin kerja sama Local Currency Settlement (LCS) dengan China, Jepang, Malaysia, Thailand, dan Korea Selatan. Apa manfaat strategis transaksi bilateral menggunakan mata uang lokal masing-masing tanpa lewat Dolar AS?",
                "options": [
                    "Menjamin bahwa seluruh importir dibebaskan dari kewajiban membayar bea masuk kepabeanan",
                    "Menggantikan sistem perdagangan ekspor-impor modern dengan sistem barter beras dan minyak mentah",
                    "Memaksa negara mitra dagang menghapus penggunaan mata uang nasionalnya masing-masing",
                    "Mengurangi ketergantungan ekstrem terhadap mata uang Dolar AS, menghemat biaya konversi kurs ganda, dan memitigasi risiko gejolak pasar keuangan global"
                ],
                "correct": 3,
                "hint": "Dagang dengan China bayar langsung pakai Yuan dan Rupiah, dagang dengan Jepang pakai Yen dan Rupiah—tidak perlu repot tukar ke Dolar AS dulu!",
                "debrief": "Sangat tepat! Diversifikasi mata uang perdagangan bilateral (<span class='econ-jargon' data-term='lcs'>Local Currency Settlement</span>) memperkokoh ketahanan moneter nasional dari guncangan hegemoni Dolar AS."
            },
            {
                "id": "s4_q12",
                "scenario": "🛡️ Hedging / Lindung Nilai Valas Korporasi",
                "question": "Mengapa Bank Indonesia dan Otoritas Jasa Keuangan (OJK) mewajibkan korporasi yang memiliki utang luar negeri dalam Dolar AS untuk melakukan Lindung Nilai (Hedging)?",
                "options": [
                    "Memindahkan seluruh kewajiban pembayaran utang swasta menjadi tanggungan anggaran kas APBN",
                    "Melarang korporasi domestik melakukan kerja sama investasi dengan perusahaan multinasional",
                    "Melindungi korporasi dari ancaman kebangkrutan mendadak saat kurs Rupiah anjlok, dengan mengunci kurs pembayaran utang di masa depan melalui kontrak pasar derivatif",
                    "Memastikan bahwa korporasi tidak perlu membayar pokok pinjaman utang luar negerinya kepada kreditur"
                ],
                "correct": 2,
                "hint": "Kunci kurs di awal lewat asuransi kontrak forward, agar jika kurs Rupiah ambruk besok, perusahaan tidak langsung kolaps!",
                "debrief": "Tepat! Pelajaran berharga 1998: Banyak perusahaan swasta bangkrut karena utang valasnya tidak dilindung nilai (Unhedged Foreign Debt). <span class='econ-jargon' data-term='hedging'>Hedging</span> adalah benteng stabilitas neraca keuangan korporasi."
            },
            {
                "id": "s4_q13",
                "scenario": "⚠️ Currency Mismatch (Ketidakcocokan Mata Uang)",
                "question": "Sebuah perusahaan pengembang properti lokal membangun perumahan di Bekasi dengan pendapatan 100% dalam Rupiah, namun mendanai proyek tersebut dengan meminjam utang US$ 100 juta tanpa lindung nilai. Mengapa perusahaan ini menghadapi risiko maut 'Currency Mismatch'?",
                "options": [
                    "Bank sentral Amerika Serikat akan secara sepihak menyita seluruh sertifikat tanah perumahan di Bekasi",
                    "Pendapatan perusahaan bernilai Rupiah yang fluktuatif, sedangkan beban cicilan utang bernilai Dolar; jika Rupiah melemah tajam, nilai cicilan utang melonjak melampaui seluruh omzet pendapatannya",
                    "Tingkat suku bunga pinjaman luar negeri secara otomatis naik menjadi seribu persen per tahun",
                    "Perusahaan secara otomatis diwajibkan oleh undang-undang menjual seluruh unit rumahnya kepada warga negara asing"
                ],
                "correct": 1,
                "hint": "Pemasukan dalam Rupiah tetapi cicilan utang dalam Dolar AS: begitu Dolar meroket, uang kas Rupiahmu tidak cukup lagi bayar cicilan utang!",
                "debrief": "Benar sekali! <em>Currency Mismatch</em> adalah biang keladi utama krisis perbankan dan kebangkrutan massal dunia usaha pada krisis 1997-1998."
            },
            {
                "id": "s4_q14",
                "scenario": "📈 Fenomena Kurva J (J-Curve Effect)",
                "question": "Ketika nilai tukar Rupiah terdepresiasi, teori perdagangan menyatakan ekspor akan naik dan impor turun sehingga neraca perdagangan membaik. Namun mengapa pada bulan-bulan awal, neraca perdagangan justru sering memburuk sebelum akhirnya membaik (Kurva J)?",
                "options": [
                    "Kontrak impor lama yang sudah diteken bernilai tetap dan butuh waktu bagi eksportir untuk meningkatkan kapasitas produksi pabriknya (Volume Adjustment Lag)",
                    "Kementerian perdagangan mewajibkan seluruh eksportir menimbun barang produksinya di gudang dermaga",
                    "Pemerintah secara otomatis melarang seluruh kegiatan pengiriman barang di pelabuhan selama enam bulan",
                    "Masyarakat luar negeri menolak membeli barang buatan Indonesia jika harganya menjadi lebih murah"
                ],
                "correct": 0,
                "hint": "Bentuk kurva menyerupai huruf 'J': turun dulu sesaat karena harga barang impor langsung mahal, baru kemudian naik kencang setelah pesanan ekspor bertambah!",
                "debrief": "Tepat! Efek <span class='econ-jargon' data-term='neraca_pembayaran'>Kurva J</span>: penyesuaian volume perdagangan membutuhkan waktu (time lag). Setelah kontrak baru dinegosiasikan, keunggulan harga murah mulai mendongkrak surplus neraca dagang."
            },
            {
                "id": "s4_q15",
                "scenario": "🚢 Neraca Perdagangan: Surplus vs Defisit",
                "question": "Badan Pusat Statistik (BPS) mengumumkan neraca perdagangan Indonesia mencatatkan surplus selama 50 bulan berturut-turut. Apakah makna ekonomi positif dari surplus perdagangan beruntun ini bagi makroekonomi?",
                "options": [
                    "Pemerintah dilarang mengimpor mesin pabrik dan bahan baku obat yang tidak diproduksi di dalam negeri",
                    "Aliran masuk devisa hasil ekspor neto terus bertambah, mempertebal cadangan devisa dan menjadi bantalan pertahanan yang menjaga stabilitas nilai tukar Rupiah",
                    "Tingkat pengangguran terbuka di seluruh wilayah Indonesia secara otomatis terhapus seketika",
                    "Seluruh utang luar negeri pemerintah dinyatakan lunas dan bebas kewajiban pembayaran bunga"
                ],
                "correct": 1,
                "hint": "Uang dari penjualan barang ke luar negeri lebih banyak dibanding uang yang kita keluarkan untuk belanja impor—kantong devisa negara surplus!",
                "debrief": "Benar! Surplus neraca perdagangan yang konsisten memperkuat transaksi berjalan, mempertebal cadangan devisa, dan menjaga kestabilan nilai tukar Rupiah dari tekanan eksternal."
            },
            {
                "id": "s4_q16",
                "scenario": "👷 Remitansi Pekerja Migran Indonesia (PMI)",
                "question": "Jutaan Pekerja Migran Indonesia (PMI) di luar negeri mengirimkan uang ratusan triliun rupiah ke kampung halamannya setiap tahun. Dalam struktur Neraca Pembayaran Indonesia, aliran devisa ini dicatat sebagai:",
                "options": [
                    "Investasi Asing Langsung (Foreign Direct Investment) pada Neraca Finansial",
                    "Penerimaan Pajak Pertambahan Nilai yang dipungut oleh Direktorat Jenderal Pajak",
                    "Pendapatan Sekunder (Secondary Income) pada Neraca Transaksi Berjalan, yang langsung menopang daya beli keluarga di pedesaan",
                    "Belanja Pengeluaran Pemerintah Pusat pada pos anggaran Kementerian Pertahanan"
                ],
                "correct": 2,
                "hint": "Pahlawan devisa: uang hasil jerih payah keringat buruh migran mengalir langsung ke desa, membiayai sekolah adik-adiknya dan membangun rumah!",
                "debrief": "Luar biasa! Remitansi PMI adalah devisa riil yang langsung dinikmati masyarakat akar rumput, menopang konsumsi daerah dan menyumbang surplus pada pendapatan sekunder neraca pembayaran."
            },
            {
                "id": "s4_q17",
                "scenario": "🏭 Ekspor Bernilai Tambah Tinggi vs Mentah",
                "question": "Mengapa kebijakan hilirisasi (melarang ekspor bijih nikel mentah dan mewajibkan smelter mengolahnya menjadi feronikel atau baterai) secara struktural menyehatkan Neraca Pembayaran Indonesia?",
                "options": [
                    "Menurunkan tarif bea cukai impor barang-barang mewah dari negara pengekspor mobil listrik",
                    "Menghilangkan kebutuhan tenaga kerja manusia di kawasan industri pertambangan nasional",
                    "Nilai jual ekspor produk olahan nikel berlipat ganda hingga belasan kali lipat dibanding tanah bijih mentah, melipatgandakan devisa ekspor dan menciptakan efek rantai industri bernilai tinggi",
                    "Membuat seluruh cadangan bijih nikel di dalam perut bumi habis dalam kurun waktu satu tahun"
                ],
                "correct": 2,
                "hint": "Menjual baterai mobil listrik menghasilkan ratusan juta rupiah devisa, dibanding hanya menjual tanah lumpur mentah seharga ratusan ribu rupiah!",
                "debrief": "Tepat! Hilirisasi industri memperkokoh <em>Terms of Trade</em> Indonesia, mendiversifikasi struktur ekspor dari komoditas mentah bergejolak menjadi produk manufaktur bernilai tambah tinggi."
            },
            {
                "id": "s4_q18",
                "scenario": "📉 Defisit Neraca Jasa (Service Balance Deficit)",
                "question": "Meskipun neraca perdagangan barang Indonesia sering mencatat surplus besar, Neraca Jasa (Services Account) Indonesia hampir selalu mencatat defisit kronis. Apa biang keladi utama defisit neraca jasa ini?",
                "options": [
                    "Pemerintah Indonesia dilarang oleh hukum maritim internasional memiliki kapal penyeberangan feri antar-pulau",
                    "Seluruh transaksi perbankan di Indonesia menggunakan jasa perusahaan konsultan hukum luar negeri",
                    "Ketergantungan tinggi pada penggunaan kapal kargo kontainer asing (freight) untuk angkutan ekspor-impor dan pembayaran asuransi maritim internasional",
                    "Terlalu banyaknya wisatawan mancanegara yang berlibur dan membelanjakan uang dolarnya di pulau Bali"
                ],
                "correct": 2,
                "hint": "Barangnya kita ekspor, tapi kapal pengangkut raksasa dan asuransi pelayarannya milik perusahaan asing—kita tekor bayar ongkos sewa kapalnya!",
                "debrief": "Benar sekali! Defisit jasa logistik maritim (freight charges) dan jasa asuransi internasional adalah kelemahan struktural yang harus diatasi dengan memperkuat armada perkapalan nasional."
            },
            {
                "id": "s4_q19",
                "scenario": "📊 Real Effective Exchange Rate (REER)",
                "question": "Apa yang diukur oleh indeks Real Effective Exchange Rate (REER) yang dipantau oleh Bank Indonesia dan Dana Moneter Internasional (IMF)?",
                "options": [
                    "Tingkat bunga deposito perbankan swasta yang berlaku di kawasan pelabuhan bebas Batam",
                    "Daya saing harga relatif mata uang Rupiah terhadap sekeranjang mata uang mitra dagang utama, yang telah disesuaikan dengan perbedaan laju inflasi antar-negara",
                    "Perbandingan nominal langsung antara lembaran uang kertas Rupiah dengan selembar uang Dolar Zimbabwe",
                    "Total nilai emas batangan yang disimpan di brankas kantor pusat bank sentral dunia"
                ],
                "correct": 1,
                "hint": "Mengukur apakah produk buatan Indonesia masih kompetitif dan murah di mata pembeli global setelah memperhitungkan perbedaan inflasi!",
                "debrief": "Tepat! Indeks <span class='econ-jargon' data-term='kurs_valas'>REER</span> adalah indikator daya saing eksternal. Jika REER terlalu tinggi (terapresiasi riil), harga barang ekspor menjadi mahal dan produk lokal kalah bersaing melawan barang impor."
            },
            {
                "id": "s4_q20",
                "scenario": "🔥 Hot Money vs Foreign Direct Investment (FDI)",
                "question": "Mengapa penanaman modal asing langsung (FDI) jauh lebih disukai oleh teknokrat makroekonomi ketimbang aliran dana investasi portofolio jangka pendek (Hot Money)?",
                "options": [
                    "Hot Money diwajibkan oleh undang-undang membayar pajak penghasilan sepuluh kali lipat lebih tinggi",
                    "FDI hanya diperbolehkan beroperasi di sektor pertambangan emas dan intan permata",
                    "FDI tertanam dalam bentuk aset fisik pabrik, mesin, dan penyerapan tenaga kerja yang tidak bisa ditarik pulang dalam tempo semalam saat terjadi kepanikan pasar",
                    "Hot Money memberikan pinjaman uang gratis tanpa kewajiban membayar kembali kepada pemerintah"
                ],
                "correct": 2,
                "hint": "Membangun pabrik semen butuh waktu bertahun-tahun dan tidak bisa diangkut lari saat krisis; tapi dana saham dan obligasi bisa kabur lewat satu klik tombol komputer!",
                "debrief": "Sangat tepat! <em>Hot Money</em> sangat labil dan mudah berbalik arah (Capital Reversal). FDI adalah modal jangka panjang yang kokoh, mentransfer teknologi, dan memperkuat kapasitas produktif bangsa."
            },
            {
                "id": "s4_q21",
                "scenario": "🏝️ Pariwisata Internasional sebagai Devisa Jasa",
                "question": "Ketika turis mancanegara dari Australia dan Eropa berlibur ke Bali, Labuan Bajo, atau Raja Ampat dan membelanjakan Dolar mereka untuk hotel dan kuliner lokal, transaksi ini dicatat sebagai:",
                "options": [
                    "Ekspor Jasa (Service Export) pada Neraca Transaksi Berjalan yang menyumbangkan devisa segar bagi perbankan nasional",
                    "Pinjaman Utang Luar Negeri Jangka Pendek yang wajib dicicil oleh pengelola hotel",
                    "Impor Barang Mewah pada Neraca Perdagangan Barang Kementerian Keuangan",
                    "Bantuan Hibah Internasional tanpa kompensasi apa pun dari Perserikatan Bangsa-Bangsa"
                ],
                "correct": 0,
                "hint": "Turis asing menikmati indahnya pantai dan keramahan hotel lokal lalu membayar pakai devisa—itu adalah ekspor jasa pariwisata!",
                "debrief": "Tepat! Pariwisata adalah pundi devisa jasa terbesar bangsa. Devisa turis langsung mengalir ke pengusaha hotel, pemandu wisata, perajin suvenir, dan UMKM kuliner lokal."
            },
            {
                "id": "s4_q22",
                "scenario": "🛡️ Bilateral Swap Arrangement (BSA)",
                "question": "Bank Indonesia menjalin kerja sama Bilateral Swap Arrangement (BSA) dengan bank sentral negara mitra (seperti Bank of Japan dan Bank of Korea). Apa fungsi utama jaring pengaman moneter bilateral ini?",
                "options": [
                    "Melarang seluruh maskapai penerbangan komersial terbang melintasi batas udara kedua negara",
                    "Menghapuskan kewajiban pembayaran tarif kepabeanan pada seluruh barang dagangan bilateral",
                    "Menggabungkan neraca keuangan kedua negara menjadi satu kesatuan mata uang tunggal",
                    "Menyediakan fasilitas pertukaran likuiditas mata uang darurat antar-bank sentral untuk saling meminjamkan devisa saat menghadapi krisis likuiditas neraca pembayaran"
                ],
                "correct": 3,
                "hint": "Pakta tolong-menolong antar-bank sentral: jika salah satu negara kehabisan likuiditas valas darurat, negara mitra siap menukarkan likuiditas mata uang seketika!",
                "debrief": "Benar! <em>Bilateral Swap Arrangement (BSA)</em> adalah lapis kedua jaring pengaman keuangan (Financial Safety Net) kawasan untuk menangkal krisis likuiditas global."
            },
            {
                "id": "s4_q23",
                "scenario": "🚢 Tarif Impor & Proteksionisme Dagang",
                "question": "Pemerintah mengenakan Bea Masuk Tindakan Pengamanan (BMTP) atau tarif impor tinggi terhadap produk pakaian jadi dan keramik dari luar negeri. Apa motif dan konsekuensi makro dari kebijakan proteksionisme ini?",
                "options": [
                    "Melindungi industri manufaktur dan tenaga kerja lokal dari gempuran barang impor murah (dumping), namun berisiko memicu retaliasi perang dagang dan menaikkan harga bagi konsumen",
                    "Menjamin bahwa seluruh pabrik pakaian di luar negeri akan memindahkan operasionalnya ke Indonesia",
                    "Menghapuskan seluruh pungutan pajak penghasilan bagi para pengusaha keramik domestik",
                    "Menurunkan nilai tukar Dolar Amerika Serikat terhadap seluruh mata uang dunia"
                ],
                "correct": 0,
                "hint": "Membentengi pabrik lokal agar tidak gulung tikar diserbu barang murah asing, tapi konsumen harus rela membayar harga barang sedikit lebih mahal!",
                "debrief": "Tepat! Kebijakan proteksionisme adalah pisau bermata dua: melindungi industri bayi (Infant Industry) dan lapangan kerja, tetapi mendistorsi efisiensi pasar dan membebani konsumen."
            },
            {
                "id": "s4_q24",
                "scenario": "💵 Pasar Valas Spot vs Forward",
                "question": "Seorang importir laptop dari Taiwan harus melunasi pembayaran US$ 1 juta dalam waktu 6 bulan ke depan. Mengapa importir tersebut memilih membeli kontrak Forward Valas ketimbang membeli di pasar Spot saat ini?",
                "options": [
                    "Menghapuskan kewajiban membayar bea masuk kepabeanan di pelabuhan Tanjung Priok",
                    "Memperoleh potongan harga diskon 90% dari kementerian perdagangan luar negeri",
                    "Memastikan bahwa barang laptop yang dipesan dikirim menggunakan pesawat ruang angkasa",
                    "Mengunci kurs nilai tukar Dolar AS sejak hari ini untuk pembayaran 6 bulan mendatang, sehingga terbebas dari risiko kerugian jika kurs Rupiah melemah drastis"
                ],
                "correct": 3,
                "hint": "Kontrak Forward mengunci harga dolar hari ini: tidur tenang tanpa takut besok dolar mendadak meroket!",
                "debrief": "Benar! Pasar <em>Forward</em> dan DNDF adalah instrumen lindung nilai (hedging) yang memberikan kepastian kalkulasi biaya bagi pelaku usaha yang bertransaksi dengan valuta asing."
            },
            {
                "id": "s4_q25",
                "scenario": "📉 Beban Utang Luar Negeri (DSR)",
                "question": "Indikator Debt Service Ratio (DSR) Tier-1 mengukur persentase penerimaan devisa ekspor yang harus dihabiskan untuk membayar pokok dan bunga utang luar negeri. Mengapa DSR yang melebihi batas 30% dianggap membahayakan?",
                "options": [
                    "Karena sepertiga devisa hasil kerja keras ekspor habis terkuras hanya untuk menyicil utang luar negeri, menyisakan sedikit ruang untuk membiayai impor barang modal pembangunan",
                    "Karena eksportir domestik dilarang oleh hukum memproduksi barang bernilai tambah tinggi",
                    "Karena bank sentral internasional berhak menyita seluruh cadangan emas yang disimpan di pegadaian",
                    "Karena negara peminjam secara otomatis kehilangan hak kedaulatan atas wilayah perairannya"
                ],
                "correct": 0,
                "hint": "Jika dari setiap Rp 100 devisa ekspor, Rp 30-nya habis hanya buat bayar cicilan utang luar negeri, kantong devisa bangsa sangat rapuh!",
                "debrief": "Tepat! Rasio DSR adalah barometer beban utang eksternal. DSR yang terkendali menjamin bahwa devisa hasil ekspor tetap dominan berputar untuk menopang pertumbuhan ekonomi riil domestik."
            },
            {
                "id": "s4_q26",
                "scenario": "🌊 Gejolak Global: Taper Tantrum 2013",
                "question": "Pada peristiwa 'Taper Tantrum' tahun 2013, pernyataan Ketua The Fed Ben Bernanke memicu depresiasi Rupiah hingga melampaui Rp 12.000 per USD dan IHSG anjlok tajam. Pelajaran makro terpenting dari krisis ini adalah:",
                "options": [
                    "Bank sentral seharusnya mencetak uang tunai Dolar palsu untuk menipu investor internasional",
                    "Pemerintah seharusnya melarang seluruh perdagangan internasional dan menutup kantor bursa efek",
                    "Krisis keuangan global hanya menimpa negara-negara yang tidak memiliki tambang minyak mentah",
                    "Negara dengan defisit transaksi berjalan (CAD) yang lebar dan cadangan devisa tipis sangat rentan dihantam pembalikan modal mendadak (sudden capital reversal)"
                ],
                "correct": 3,
                "hint": "Pelajaran berharga 2013: jangan biarkan defisit transaksi berjalan melebar dan cadangan devisa tipis saat suku bunga dunia mau naik!",
                "debrief": "Sangat tepat! Kerentanan internal (CAD lebar dan inflasi tinggi) adalah magnet badai. Memperkuat fondasi fundamental makro adalah obat terbaik menangkal penularan krisis global."
            },
            {
                "id": "s4_q27",
                "scenario": "🏛️ Chiang Mai Initiative (CMIM)",
                "question": "Negara-negara ASEAN+3 (ASEAN bersama China, Jepang, dan Korea Selatan) membentuk kesepakatan jaring pengaman keuangan regional Chiang Mai Initiative Multilateralisation (CMIM). Apa mandat utama lembaga ini?",
                "options": [
                    "Menyediakan fasilitas dana siaga likuiditas valas darurat multilateral untuk membantu negara anggota yang mengalami krisis neraca pembayaran tanpa tergantung sepenuhnya pada IMF",
                    "Mendirikan markas tentara gabungan untuk mengawal kapal kargo niaga di laut Natuna utara",
                    "Menghapuskan seluruh sistem perbankan komersial swasta di kawasan Asia Pasifik",
                    "Menyeragamkan mata uang seluruh negara Asia Tenggara menjadi satu mata uang tunggal bernama Asian Dollar"
                ],
                "correct": 0,
                "hint": "Bila ada negara tetangga kehabisan likuiditas valas akibat serangan spekulan, dana bersama ratusan miliar dolar siap disuntikkan seketika!",
                "debrief": "Benar! CMIM adalah pilar stabilitas keuangan regional Asia Timur dan Tenggara, mengurangi ketergantungan pada program penyesuaian struktural IMF yang seringkali menyakitkan."
            },
            {
                "id": "s4_q28",
                "scenario": "📦 Aturan Ketentuan Asal Barang (Rules of Origin)",
                "question": "Dalam perjanjian perdagangan bebas Regional Comprehensive Economic Partnership (RCEP), mengapa aturan 'Rules of Origin' (Ketentuan Asal Barang) sangat diperiksa ketat oleh petugas bea cukai?",
                "options": [
                    "Memastikan bahwa seluruh barang yang diperdagangkan wajib diberi label dalam bahasa kuno",
                    "Mencegah negara non-anggota memanfaatkan tarif bea masuk 0% dengan cara menyelundupkan barang lewat negara anggota tanpa adanya penambahan nilai proses manufaktur lokal",
                    "Mengharuskan setiap kemasan barang dibubuhi tanda tangan basah oleh kepala bea cukai pelabuhan",
                    "Melarang seluruh perusahaan swasta nasional mengekspor barang elektronik dan komponen otomotif"
                ],
                "correct": 1,
                "hint": "Mencegah barang luar negeri 'numpang lewat stempel' di negara tetangga agar dapat diskon tarif bea masuk gratisan!",
                "debrief": "Tepat! <em>Rules of Origin</em> menetapkan syarat kandungan nilai lokal (Local Value Added) minimal agar suatu produk berhak menikmati pembebasan tarif bea masuk perjanjian perdagangan bebas."
            },
            {
                "id": "s4_q29",
                "scenario": "💰 Devaluasi Mata Uang secara Sengaja",
                "question": "Dalam sejarah ekonomi, beberapa negara pengekspor besar pernah sengaja mendevaluasi (melemahkan) nilai mata uangnya secara drastis (Competitive Devaluation). Apa tujuan tersembunyi dari kebijakan agresif ini?",
                "options": [
                    "Memaksa warga negaranya berhenti mengonsumsi produk barang dan jasa buatan dalam negeri",
                    "Membuat harga barang ekspornya menjadi super murah di pasar global demi merebut pangsa pasar dunia dan mematikan industri manufaktur negara pesaing",
                    "Menghapuskan seluruh cadangan devisa yang tersimpan di brankas bank sentral internasional",
                    "Menaikkan biaya hidup dan inflasi rakyatnya sendiri setinggi-tingginya demi kepuasan para menteri"
                ],
                "correct": 1,
                "hint": "Sengaja melemahkan mata uang agar barang dagangannya tampak sangat murah di mata pembeli luar negeri dan mematikan pabrik lawan!",
                "debrief": "Benar! Devaluasi kompetitif (sering disebut <em>Beggar-Thy-Neighbour Policy</em>) dapat memicu perang mata uang global (Currency Wars) yang merusak tatanan perdagangan internasional."
            },
            {
                "id": "s4_q30",
                "scenario": "🚢 Neraca Finansial: Investasi Portofolio",
                "question": "Selain Penanaman Modal Asing (PMA/FDI), Neraca Finansial Indonesia sangat dipengaruhi oleh Investasi Portofolio. Instrumen pasar modal apa sajakah yang dibeli oleh investor asing dalam investasi portofolio ini?",
                "options": [
                    "Kapal perang patroli pantai milik komando armada kawasan timur angkatan laut",
                    "Gedung pabrik peleburan aluminium dan kawasan pergudangan industri berat di Morowali",
                    "Saham di Bursa Efek Indonesia (BEI) dan obligasi Surat Berharga Negara (SBN) serta obligasi korporasi",
                    "Lahan perkebunan kelapa sawit seluas puluhan ribu hektar di pedalaman Kalimantan"
                ],
                "correct": 2,
                "hint": "Investasi kertas di layar monitor: saham emiten di bursa efek dan obligasi SBN negara!",
                "debrief": "Tepat! Investasi portofolio mencakup aset-aset likuid di pasar modal. Keuntungannya adalah cepat mendatangkan devisa modal, namun kelemahannya sangat rentan terhadap penarikan mendadak saat sentimen memburuk."
            },
            {
                "id": "s4_q31",
                "scenario": "🌐 Fenomena Dutch Disease di Sektor Valas",
                "question": "Ketika ekspor batu bara dan kelapa sawit melonjak masif, devisa Dolar mengalir deras ke Indonesia dan mengapresiasi nilai tukar Rupiah secara tajam. Mengapa penguatan Rupiah yang terlalu ekstrem ini justru mematikan industri garmen dan mebel lokal?",
                "options": [
                    "Karena para pekerja pabrik garmen menolak menerima upah dalam mata uang Rupiah yang bernilai kuat",
                    "Karena kementerian perdagangan melarang ekspor pakaian jadi ke seluruh negara mitra dagang",
                    "Karena pabrik garmen diwajibkan oleh undang-undang menutup usahanya saat harga batu bara naik",
                    "Rupiah yang terlalu kuat membuat harga barang garmen dan mebel Indonesia menjadi mahal dan kalah bersaing di luar negeri, serta membuat barang impor membanjiri pasar domestik"
                ],
                "correct": 3,
                "hint": "Rupiah yang terlalu perkasa membuat baju dan mebel buatan kita jadi kemahalan di luar negeri, sementara pakaian impor murah membanjiri pasar lokal!",
                "debrief": "Jenius! Ini adalah sisi moneter dari <span class='econ-jargon' data-term='dutch_disease'>Dutch Disease</span>: apresiasi mata uang akibat ledakan komoditas mentah merusak daya saing sektor industri manufaktur dan pertanian bernilai tambah."
            },
            {
                "id": "s4_q32",
                "scenario": "📈 Suku Bunga Bebas Risiko (Risk-Free Rate)",
                "question": "Dalam penentuan arus modal valas global, imbal hasil obligasi pemerintah Amerika Serikat (US Treasury Bills) selalu dijadikan acuan 'Risk-Free Rate' dunia. Mengapa investor global menjadikannya tolok ukur utama?",
                "options": [
                    "Karena obligasi US Treasury tidak dapat diperjualbelikan kembali di pasar sekunder internasional",
                    "Karena obligasi pemerintah AS dianggap memiliki risiko gagal bayar (default risk) paling mendekati nol persen di dunia, didukung oleh status Dolar AS sebagai mata uang cadangan devisa utama global",
                    "Karena bank sentral Amerika Serikat menjamin keuntungan bunga pasti 100% setiap hari kerja",
                    "Karena seluruh penerbitan obligasi US Treasury ditandatangani oleh seluruh presiden negara anggota G20"
                ],
                "correct": 1,
                "hint": "Standar emas imbal hasil aman dunia: jika obligasi AS naik bunganya, semua aset investasi di negara lain harus menawarkan bunga lebih tinggi agar dilirik!",
                "debrief": "Tepat! <em>Risk-Free Rate</em> US Treasury adalah tolok ukur dasar penentuan premi risiko (Risk Premium) bagi instrumen keuangan di seluruh negara berkembang."
            },
            {
                "id": "s4_q33",
                "scenario": "🌾 Ketahanan Pangan & Kedaulatan Valas",
                "question": "Mengapa ketergantungan kronis pada impor pangan pokok (seperti beras, kedelai, dan daging sapi) bukan hanya masalah pertanian semata, melainkan ancaman langsung terhadap ketahanan moneter dan valas?",
                "options": [
                    "Lonjakan harga pangan dunia langsung menguras cadangan devisa bank sentral dan mengimpor inflasi ke dalam negeri, memperlemah nilai tukar Rupiah seketika",
                    "Karena petani luar negeri berhak menolak menjual hasil panennya jika dibayar menggunakan uang kertas Dolar AS",
                    "Karena seluruh kapal pengangkut bahan pangan wajib didaftarkan sebagai kapal milik kementerian pertahanan",
                    "Karena ketergantungan impor pangan secara otomatis memicu penurunan suku bunga perbankan nasional"
                ],
                "correct": 0,
                "hint": "Bila perut bangsa bergantung pada pasokan impor, lonjakan harga dunia langsung menghabisi cadangan devisa dan menenggelamkan kurs Rupiah!",
                "debrief": "Sangat tepat! Kedaulatan pangan adalah pilar ketahanan eksternal. Swasembada pangan melindungi cadangan devisa dan memutus transmisi inflasi pangan impor."
            },
            {
                "id": "s4_q34",
                "scenario": "🏢 Utang Luar Negeri Swasta Non-Bank",
                "question": "Kementerian Keuangan dan Bank Indonesia memantau secara ketat rasio Utang Luar Negeri (ULN) swasta non-bank. Apa bahaya terbesar dari lonjakan utang valas korporasi swasta yang tidak terkontrol?",
                "options": [
                    "Pemerintah Indonesia dilarang menerbitkan paspor internasional bagi karyawan perusahaan peminjam",
                    "Perusahaan swasta tersebut secara otomatis disita oleh pemerintah negara pemberi pinjaman",
                    "Seluruh komisaris perusahaan swasta diwajibkan menjadi pegawai negeri sipil kementerian keuangan",
                    "Ketika jatuh tempo serentak di saat kurs Rupiah melemah, permintaan panik atas valas untuk membayar utang dapat memicu krisis likuiditas dan gelombang kebangkrutan massal"
                ],
                "correct": 3,
                "hint": "Jika ribuan perusahaan swasta ramai-ramai panik memburu Dolar untuk bayar utang jatuh tempo, pasar valas jebol dan ekonomi nasional bisa terseret krisis!",
                "debrief": "Benar! Salah satu pemicu utama kedalaman krisis 1998 adalah membengkaknya utang valas swasta tanpa lindung nilai yang tidak terpantau oleh otoritas makroekonomi."
            },
            {
                "id": "s4_q35",
                "scenario": "📊 Derivatif DNDF (Domestic Non-Deliverable Forward)",
                "question": "Bank Indonesia meluncurkan instrumen lindung nilai Domestic Non-Deliverable Forward (DNDF). Apa keunggulan transaksi DNDF dibanding transaksi forward valas konvensional?",
                "options": [
                    "Penyelesaian transaksi (settlement) dilakukan dalam mata uang Rupiah tanpa perlu perpindahan fisik Dolar AS, sehingga tidak menguras cadangan devisa bank sentral",
                    "Transaksi DNDF membebaskan importir dari kewajiban membayar utang kepada pemasok luar negeri",
                    "Seluruh keuntungan transaksi DNDF secara otomatis disumbangkan ke kas penanganan bencana daerah",
                    "DNDF menjamin bahwa nilai tukar Dolar AS akan selalu berada di angka Rp 10.000 per USD selamanya"
                ],
                "correct": 0,
                "hint": "Lindung nilai pintar: jika kurs meleset dari kontrak, yang dibayarkan hanya selisihnya dalam mata uang Rupiah—dolar fisik di brankas devisa tetap aman!",
                "debrief": "Jenius! Instrumen <span class='econ-jargon' data-term='dndf'>DNDF</span> adalah inovasi moneter Bank Indonesia untuk memberikan kepastian lindung nilai bagi pelaku pasar di dalam negeri tanpa mengorbankan cadangan devisa fisik."
            },
            {
                "id": "s4_q36",
                "scenario": "👑 Mahakarya Ketahanan Eksternal Bangsa",
                "question": "Di akhir Level 4, apa ikhtisar pamungkas yang harus dikuasai oleh seorang teknokrat makroekonomi dalam mengelola hubungan ekonomi internasional?",
                "options": [
                    "Keterbukaan ekonomi internasional memberikan peluang pasar raksasa, namun menuntut benteng ketahanan eksternal yang tangguh: neraca dagang surplus, cadangan devisa tebal, utang terkelola prudent, dan kemandirian pangan-energi",
                    "Pemerintah harus membiarkan nilai tukar Rupiah berfluktuasi bebas tanpa perlu adanya campur tangan bank sentral",
                    "Indonesia harus menutup diri sepenuhnya dari perdagangan dunia dan hidup mengisolasi diri seperti zaman kuno",
                    "Indonesia harus menyerahkan seluruh kedaulatan ekonominya kepada arahan lembaga keuangan multilateral internasional"
                ],
                "correct": 0,
                "hint": "Menari di tengah badai ombak global: kita rangkul pasar dunia untuk memajukan bangsa, namun benteng devisa dan kedaulatan moneter tetap kokoh tak tergoyahkan!",
                "debrief": "Selamat! Anda telah menuntaskan seluruh 36 Soal Level 4 Valas & Hubungan Internasional! Pemahaman Anda mengenai dinamika transaksi berjalan, devisa, dan trilema moneter kini setara analis makroekonomi global sejati!"
            }
        ]
    },
    {
        "id": 5,
        "title": "Level 5: 🌪️ Badai Krisis Ekonomi",
        "subtitle": "Menjinakkan Stagflasi, Pandemi, dan Bauran Kebijakan Pamungkas",
        "theme": "crisis",
        "unlocks": "Gelar: Teknokrat Tertinggi Dewan Ekonomi Nasional 👑",
        "questionPool": [
            {
                "id": "s5_q1",
                "scenario": "🌪️ Anatomi Krisis Moneter 1997-1998",
                "question": "Pada Krisis Keuangan Asia 1997-1998, nilai tukar Rupiah ambruk dari Rp 2.500 menjadi Rp 16.000 per USD, memicu kebangkrutan massal perbankan dan resesi minus 13% PDB. Faktor kerentanan struktural apakah yang menjadi sumbu ledak krisis tersebut?",
                "options": [
                    "Kegagalan panen perkebunan kelapa sawit di seluruh pulau Sumatera dan Kalimantan secara serentak",
                    "Keputusan kementerian keuangan menghentikan seluruh penerbitan Surat Berharga Negara di pasar modal",
                    "Kombinasi rezim kurs tetap buatan, membengkaknya utang luar negeri valas jangka pendek swasta tanpa lindung nilai, dan rapuhnya pengawasan tata kelola perbankan domestik",
                    "Pemberlakuan undang-undang ketenagakerjaan yang melipatgandakan upah minimum buruh pabrik"
                ],
                "correct": 2,
                "hint": "Tiga serangkai petaka: kurs dipatok kaku, utang swasta dalam Dolar membludak tanpa asuransi, dan bank-bank meminjamkan uang ke kroni sendiri tanpa agunan sehat!",
                "debrief": "Tepat sekali! Krisis 1998 adalah pelajaran paling berharga dalam sejarah makroekonomi Indonesia. Kolapsnya nilai tukar melipatgandakan beban utang valas swasta, meruntuhkan likuiditas perbankan, dan menghanguskan stabilitas sosial."
            },
            {
                "id": "s5_q2",
                "scenario": "💎 Penyakit Belanda (Dutch Disease)",
                "question": "Ketika harga batu bara dan minyak sawit global melonjak tinggi, devisa ekspor mengalir deras ke Indonesia. Mengapa teknokrat ekonomi sangat mewaspadai bahaya 'Dutch Disease' (Penyakit Belanda) di saat booming komoditas?",
                "options": [
                    "Kenaikan harga komoditas tambang global secara otomatis menurunkan penerimaan royalti dan pajak penghasilan badan di sektor energi",
                    "Derasnya aliran devisa mengapresiasi nilai tukar Rupiah secara tajam, yang melemahkan daya saing harga sektor industri manufaktur dan pertanian lokal, sehingga ekonomi menjadi kecanduan bahan mentah",
                    "Tingginya harga komoditas primer memaksa perbankan menaikkan suku bunga kredit perumahan rakyat (KPR) secara tajam",
                    "Ledakan ekspor komoditas secara otomatis memicu defisit neraca pembayaran internasional akibat pelarian modal spekulatif"
                ],
                "correct": 1,
                "hint": "Ibarat orang yang mendadak menang undian miliaran rupiah lalu malas bekerja dan hidup boros, hingga saat uangnya habis ia tidak punya keahlian apa pun!",
                "debrief": "Jenius! <span class='econ-jargon' data-term='dutch_disease'>Dutch Disease</span> adalah sindrom ketergantungan komoditas mentah. Obat penawarnya adalah kebijakan hilirisasi industri dan mengalokasikan rezeki nomplok ke Sovereign Wealth Fund / Danantara untuk investasi jangka panjang."
            },
            {
                "id": "s5_q3",
                "scenario": "📉 Dilema Stagflasi (Stagflation)",
                "question": "Perekonomian global dilanda 'Stagflasi' ketika terjadi guncangan kenaikan harga minyak mentah perang dunia (Supply Shock). Mengapa stagflasi merupakan mimpi buruk terburuk bagi teknokrat ekonomi makro?",
                "options": [
                    "Seluruh investor pasar modal secara otomatis menarik dananya untuk disimpan di rekening kas kementerian kesehatan",
                    "Terjadi kombinasi mematikan: Inflasi melonjak tinggi di saat bersamaan Pertumbuhan Ekonomi macet/stagnan dan Pengangguran meningkat, sehingga instrumen kebijakan standar menghadapi dilema besar",
                    "Perekonomian mencatatkan pertumbuhan PDB dua digit sementara seluruh harga barang di pasar mengalami penurunan ekstrem",
                    "Bank sentral kehilangan wewenang untuk mengatur suku bunga dan kementerian keuangan dilarang memungut pajak"
                ],
                "correct": 1,
                "hint": "Dilema mematikan: kalau suku bunga dinaikkan untuk jinakkan inflasi, ekonomi makin anjlok dan PHK meluas; kalau bunga diturunkan untuk tolong PHK, inflasi makin membakar rakyat!",
                "debrief": "Sangat tepat! <span class='econ-jargon' data-term='stagflasi'>Stagflasi</span> mematahkan kurva Phillips tradisional. Menghadapi guncangan penawaran (Supply Shock), obat mujarabnya adalah reformasi struktural, subsidi energi terarah, dan pembenahan rantai pasok."
            },
            {
                "id": "s5_q4",
                "scenario": "📈 Kurva Phillips & Batas NAIRU",
                "question": "Konsep NAIRU (Non-Accelerating Inflation Rate of Unemployment) menyatakan bahwa ada batas pengangguran alami dalam perekonomian. Apa yang terjadi jika pemerintah memaksakan menurunkan pengangguran di bawah tingkat NAIRU melalui stimulus moneter-fiskal terus-menerus?",
                "options": [
                    "Perekonomian secara otomatis mencapai surplus neraca transaksi berjalan tanpa perlu ekspor barang",
                    "Penurunan pengangguran hanya bersifat sesaat, namun memicu spiral percepatan inflasi yang terus melonjak tinggi di masa depan",
                    "Tingkat inflasi secara permanen akan turun menyentuh angka nol persen di seluruh sektor industri",
                    "Seluruh pekerja pabrik secara sukarela menolak menerima upah lembur bulanan dari pemilik modal"
                ],
                "correct": 1,
                "hint": "Memaksa mempekerjakan semua orang melewati batas kapasitas alamiah pasar tenaga kerja membuat pengusaha saling membajak pekerja dengan upah tinggi, menyalakan api inflasi!",
                "debrief": "Tepat! Dalam jangka panjang, <span class='econ-jargon' data-term='kurva_phillips'>Kurva Phillips</span> berbentuk tegak lurus pada tingkat NAIRU. Menurunkan pengangguran secara permanen harus lewat peningkatan keterampilan pekerja (Human Capital) dan iklim usaha, bukan sekadar stimulus uang."
            },
            {
                "id": "s5_q5",
                "scenario": "🦠 Guncangan Ganda Pandemi Covid-19",
                "question": "Pada tahun 2020, pandemi Covid-19 menghantam perekonomian Indonesia sebagai 'Double Shock' (Guncangan Ganda). Mengapa krisis ini berbeda dari krisis finansial konvensional?",
                "options": [
                    "Terjadi guncangan simultan: Sisi Penawaran lumpuh akibat pembatasan fisik pabrik (lockdown), dan Sisi Permintaan runtuh karena masyarakat tidak bisa keluar rumah untuk berbelanja dan berwisata",
                    "Krisis terjadi murni akibat kebangkrutan perbankan swasta yang menyalurkan kredit fiktif ke sektor pertambangan",
                    "Krisis dipicu oleh kelebihan produksi beras yang membusuk di gudang-gudang penyimpanan pelabuhan",
                    "Krisis hanya menimpa sektor perdagangan saham di bursa efek tanpa menyentuh kehidupan para pedagang pasar"
                ],
                "correct": 0,
                "hint": "Pabrik tidak bisa berproduksi karena buruh harus di rumah (Supply Shock), sementara mall dan pasar sepi karena pembeli dilarang keluar (Demand Shock)!",
                "debrief": "Benar! Pandemi adalah guncangan kemanusiaan dan ekonomi multidimensi. Respon kebijakannya menuntut keselamatan jiwa di atas segalanya, ditopang jaring pengaman sosial masif dan kelonggaran regulasi darurat."
            },
            {
                "id": "s5_q6",
                "scenario": "🏛️ Bauran Kebijakan Terpadu (Policy Mix DEN)",
                "question": "Di ruang sidang kabinet, instrumen kebijakan moneter Bank Indonesia dan instrumen fiskal Kementerian Keuangan diramu secara terkoordinasi (Policy Mix). Apakah sasaran pamungkas dari bauran kebijakan makroekonomi yang sehat bagi suatu bangsa?",
                "options": [
                    "Mencapai pertumbuhan PDB riil optimal yang inklusif, stabilitas harga dengan inflasi rendah terjangkau, penciptaan lapangan kerja produktif, serta kesinambungan fiskal dan eksternal jangka panjang",
                    "Mempertahankan nilai tukar mata uang domestik pada level setinggi-tingginya terhadap seluruh mata uang negara mitra dagang",
                    "Memastikan bahwa penerimaan pajak negara selalu melampaui total belanja APBN agar kas pemerintah selalu mencatatkan surplus anggaran absolut",
                    "Memaksimalkan cadangan devisa bank sentral dengan cara melarang seluruh kegiatan impor barang modal dan barang konsumsi dari luar negeri"
                ],
                "correct": 0,
                "hint": "Pertumbuhan ekonomi yang dinikmati rakyat banyak, harga kebutuhan pokok terjangkau, dan keuangan negara tetap sehat jangka panjang!",
                "debrief": "Selamat Yang Mulia Teknokrat! <span class='econ-jargon' data-term='policy_mix'>Policy Mix</span> terpadu adalah orkestrasi tertinggi kepemimpinan ekonomi bangsa: mensinergikan gas dan rem antara moneter dan fiskal demi kemakmuran rakyat banyak!"
            },
            {
                "id": "s5_q7",
                "scenario": "🤝 Skema Berbagi Beban (Burden Sharing) 2020",
                "question": "Saat pandemi Covid-19 melanda, pemerintah menerbitkan Perppu No. 1/2020 (UU No. 2/2020) yang mengizinkan skema 'Burden Sharing' antara Kemenkeu dan BI. Bagaimana mekanisme luar biasa ini bekerja secara darurat?",
                "options": [
                    "Bank Indonesia membeli SBN langsung di pasar perdana dengan bunga 0% untuk mendanai pos belanja kesehatan publik dan bansos (Public Goods) tanpa membebani kas APBN dengan bunga komersial",
                    "Pemerintah menghapuskan seluruh sistem perbankan swasta nasional dan menyita saldo tabungan para konglomerat",
                    "Bank sentral mencetak uang tunai dan membagikannya langsung lewat helikopter ke perkampungan kumuh di seluruh kota",
                    "Kementerian Keuangan menyerahkan seluruh kepemilikan gedung perkantoran pemerintah kepada Bank Indonesia sebagai jaminan utang"
                ],
                "correct": 0,
                "hint": "Kondisi darurat perang kesehatan: bank sentral dan kementerian keuangan bahu-membahu menanggung biaya rumah sakit dan bansos rakyat tanpa bunga mencekik!",
                "debrief": "Tepat! Skema <em>Burden Sharing</em> adalah terobosan kebijakan darurat yang menyelamatkan jutaan nyawa dan mencegah kehancuran ekonomi nasional di masa tergelap pandemi Covid-19."
            },
            {
                "id": "s5_q8",
                "scenario": "🏦 Penanganan Bank 'Too Big To Fail'",
                "question": "Ketika sebuah bank sistemik raksasa terancam gagal bayar akibat kredit macet, otoritas keuangan menghadapi dilema moral dan sistemik. Mengapa pemerintah tidak bisa begitu saja membiarkan bank sistemik tersebut bangkrut seketika?",
                "options": [
                    "Karena bank sistemik diwajibkan oleh undang-undang menyumbangkan seluruh labanya kepada partai politik penguasa",
                    "Kebangkrutan bank sistemik dapat memicu efek domino kepanikan penarikan dana massal di seluruh perbankan lain (Contagion Effect) dan melumpuhkan sistem pembayaran nasional",
                    "Karena seluruh aset bank sistemik dijamin oleh kementerian pertahanan menggunakan anggaran persenjataan militer",
                    "Karena pemilik bank sistemik secara otomatis memiliki kekebalan hukum dari segala tuntutan tindak pidana perbankan"
                ],
                "correct": 1,
                "hint": "Jika raksasa jatuh menimpa rumah-rumah di sekitarnya, seluruh kampung bisa hancur tertimpa reruntuhan sistemik!",
                "debrief": "Benar! Konsep <span class='econ-jargon' data-term='too_big_to_fail'>Too Big To Fail</span>. Namun untuk mencegah bahaya Moral Hazard, pemilik lama harus bertanggung jawab penuh (Bail-in) dan penyehatan bank diawasi ketat oleh KSSK."
            },
            {
                "id": "s5_q9",
                "scenario": "🛡️ Lembaga Penjamin Simpanan (LPS) & Bank Run",
                "question": "Ketika beredar rumor bohong bahwa sebuah bank swasta akan bangkrut, nasabah mulai antre panik di depan kantor cabang untuk menarik tabungannya (Bank Run). Bagaimana peran LPS dalam memadamkan kepanikan ini?",
                "options": [
                    "Menjamin simpanan tabungan nasabah (hingga Rp 2 miliar per nasabah per bank) sesuai ketentuan, sehingga masyarakat tenang dan tidak perlu panik menarik uangnya",
                    "Membekukan seluruh anjungan tunai mandiri (ATM) dan mengerahkan aparat militer untuk membubarkan antrean nasabah",
                    "Mengubah seluruh saldo tabungan nasabah yang antre menjadi saham kepemilikan bank yang bermasalah tersebut",
                    "Memaksa pemilik bank menjual seluruh aset tanah pribadinya di pasar lelang dalam kurun waktu satu jam"
                ],
                "correct": 0,
                "hint": "LPS hadir sebagai payung pelindung: 'Uang tabunganmu dijamin aman oleh negara, jangan panik, jangan ikut antre menarik uang!'",
                "debrief": "Tepat! Lembaga Penjamin Simpanan (<span class='econ-jargon' data-term='lps'>LPS</span>) adalah pemutus rantai kepanikan psikologis (Bank Run). Keberadaan LPS menjaga kepercayaan deposan dan memelihara stabilitas sistem perbankan."
            },
            {
                "id": "s5_q10",
                "scenario": "⚠️ Bahaya Moral Hazard dalam Penyelamatan Bank",
                "question": "Mengapa skema penyelamatan bank bermasalah menggunakan dana talangan negara (Bail-out APBN) sangat dihindari pasca-krisis BLBI 1998?",
                "options": [
                    "Karena dana talangan APBN secara otomatis menurunkan nilai tukar mata uang negara-negara tetangga",
                    "Karena kementerian keuangan secara teknis dilarang memiliki hubungan rekening dengan bank sentral internasional",
                    "Karena seluruh bank yang menerima dana talangan wajib mengubah nama perusahaannya menjadi badan usaha milik daerah",
                    "Menciptakan Moral Hazard: pemilik dan manajemen bank akan berani mengambil risiko investasi ugal-ugalan karena tahu jika rugi akan ditanggung oleh uang pajak rakyat"
                ],
                "correct": 3,
                "hint": "Bila pemilik bank tahu kerugiannya bakal ditalangi uang rakyat, mereka akan seenaknya judi investasi berisiko tinggi!",
                "debrief": "Sangat tepat! <span class='econ-jargon' data-term='moral_hazard'>Moral Hazard</span> merusak disiplin pasar. Kini UU Penanganan Krisis (UU PPKSK) mengedepankan skema <em>Bail-In</em>: modal pemegang saham dan kreditur lama yang dihapusbukukan terlebih dahulu sebelum ada intervensi negara."
            },
            {
                "id": "s5_q11",
                "scenario": "💸 Hiperinflasi & Kehancuran Kepercayaan Uang",
                "question": "Di Zimbabwe (2008) dan Republik Weimar Jerman (1923), uang dicetak dengan pecahan triliunan namun tidak laku dibelanjakan sekeranjang roti. Apa obat pamungkas paling radikal untuk menghentikan petaka hiperinflasi?",
                "options": [
                    "Menutup seluruh akses perdagangan luar negeri dan melarang penggunaan teknologi komputer di perbankan",
                    "Menetapkan hukuman penjara bagi pedagang yang menolak menerima pembayaran uang kertas lama",
                    "Menerbitkan mata uang baru dengan jangkar kredibel (Redenominasi/Currency Reform), menghentikan total monetisasi utang, dan menerapkan disiplin fiskal-moneter ketat",
                    "Mencetak uang kertas baru dalam jumlah lima kali lipat lebih banyak dan membagikannya gratis kepada seluruh rakyat"
                ],
                "correct": 2,
                "hint": "Saat uang kertas kehilangan kepercayaan publik menjadi sampah, kamu harus ganti mata uang baru dengan jangkar disiplin yang kredibel!",
                "debrief": "Tepat! Hiperinflasi adalah krisis hilangnya kepercayaan total pada mata uang. Penanganannya membutuhkan reformasi moneter radikal, disiplin anggaran mutlak, dan komitmen independensi bank sentral."
            },
            {
                "id": "s5_q12",
                "scenario": "🏠 Krisis Subprime Mortgage Global 2008",
                "question": "Krisis Keuangan Global 2008 bermula dari kejatuhan sektor perumahan di Amerika Serikat (Subprime Mortgage) yang disulap menjadi surat berharga beracun (CDO). Mengapa dampaknya merambat ke seluruh dunia termasuk Indonesia?",
                "options": [
                    "Seluruh bank komersial di Indonesia memiliki kepemilikan langsung atas perumahan kumuh di pinggiran kota New York",
                    "Pemerintah Amerika Serikat menyita seluruh cadangan beras dan minyak kelapa sawit milik negara-negara berkembang",
                    "Sistem perbankan internasional secara serempak melarang warga negara Asia Tenggara menggunakan kartu kredit",
                    "Krisis likuiditas Wall Street membekukan pasar kredit global, memicu kejatuhan harga komoditas ekspor dan penarikan modal asing dari negara-negara berkembang"
                ],
                "correct": 3,
                "hint": "Wall Street pilek berat, pasar keuangan sedunia kena flu: modal asing kabur, harga komoditas jatuh, dan ekspor terpukul!",
                "debrief": "Benar! Transmisi krisis 2008 berjalan lewat saluran keuangan dan perdagangan (Global Contagion). Untungnya, perbankan Indonesia kala itu sangat minim terpapar aset beracun berkat kepatuhan prinsip kehati-hatian."
            },
            {
                "id": "s5_q13",
                "scenario": "🔥 Spiral Upah-Harga (Wage-Price Spiral)",
                "question": "Ketika inflasi naik, serikat buruh menuntut kenaikan upah tinggi. Pengusaha menyetujui upah naik namun menaikkan harga jual produknya untuk menutup biaya, yang kemudian memicu tuntutan upah baru. Lingkaran setan ini disebut:",
                "options": [
                    "Keseimbangan Pasar Tenaga Kerja Klasik menurut hukum penawaran Say",
                    "Wage-Price Spiral (Spiral Upah-Harga), yang dapat mengunci perekonomian dalam tren inflasi tinggi yang berkepanjangan",
                    "Efisiensi Upah Relatif (Efficiency Wage Theory) dalam produktivitas industri modern",
                    "Hukum Okun Mengenai Penurunan Pengangguran dan Pertumbuhan PDB Riil"
                ],
                "correct": 1,
                "hint": "Upah naik mendorong harga naik, harga naik memicu upah minta naik lagi—lingkaran setan yang membakar daya beli!",
                "debrief": "Tepat! <em>Wage-Price Spiral</em> adalah musuh laten stabilitas makro. Tanpa jangkar ekspektasi inflasi yang kredibel dan peningkatan produktivitas riil, kenaikan upah nominal hanya akan berujung pada inflasi yang makin beringas."
            },
            {
                "id": "s5_q14",
                "scenario": "🏛️ Skema Resolusi Bail-In vs Bail-Out",
                "question": "Dalam kerangka regulasi penanganan bank bermasalah saat ini, apakah perbedaan mendasar antara skema 'Bail-In' dan skema 'Bail-Out'?",
                "options": [
                    "Bail-In hanya berlaku untuk bank syariah, sedangkan Bail-Out hanya berlaku untuk bank konvensional",
                    "Bail-In menyerap kerugian menggunakan modal pemilik bank, pemegang saham, dan kreditur institusi terlebih dahulu; sedangkan Bail-Out menggunakan uang kas pembayar pajak dari APBN",
                    "Bail-In membagikan uang tunai kepada masyarakat, sedangkan Bail-Out menyimpan uang di bank sentral",
                    "Bail-In disahkan oleh mahkamah internasional, sedangkan Bail-Out diputuskan langsung oleh bupati daerah"
                ],
                "correct": 1,
                "hint": "Bail-in: pemilik dan investor bank yang rugi harus tombok sendiri; Bail-out: kas negara rakyat yang dipaksa nomboki!",
                "debrief": "Tepat sekali! Doktrin reformasi perbankan global (UU P2SK): Tidak boleh lagi ada penyelamatan bank yang membebani uang pajak rakyat (<span class='econ-jargon' data-term='bail_in'>Bail-In First</span>). Pemilik dan pemodal harus menanggung risiko bisnisnya sendiri."
            },
            {
                "id": "s5_q15",
                "scenario": "📉 Histeresis Pengangguran (Unemployment Hysteresis)",
                "question": "Dalam krisis resesi yang berkepanjangan, mengapa pengangguran jangka panjang dapat memicu 'Histeresis'—di mana tingkat pengangguran alami meningkat secara permanen bahkan setelah krisis selesai?",
                "options": [
                    "Pekerja yang menganggur terlalu lama mengalami penurunan keahlian (Skill Decay), kehilangan jaringan kerja, dan dicap negatif oleh pemberi kerja, sehingga sulit diserap kembali",
                    "Pemerintah melarang perusahaan merekrut karyawan baru selama lima tahun setelah resesi berakhir",
                    "Pabrik-pabrik manufaktur secara permanen menghapuskan seluruh lini produksi barang konsumsi",
                    "Pekerja secara sukarela menolak menerima upah bulanan karena terbiasa menerima hibah bantuan sosial"
                ],
                "correct": 0,
                "hint": "Menganggur terlalu lama membuat keahlian berkarat, mental jatuh, dan perusahaan enggan merekrut kembali—krisis usai tapi pengangguran tetap membatu!",
                "debrief": "Sangat tepat! Histeresis adalah kerusakan permanen (Scars of Recession). Menyelamatkan lapangan kerja secepat mungkin saat krisis jauh lebih murah dibanding memulihkan pengangguran yang sudah terlanjur berakar."
            },
            {
                "id": "s5_q16",
                "scenario": "⚠️ Krisis Utang Berdaulat (Sovereign Debt Crisis) Yunani",
                "question": "Pada tahun 2010, negara Yunani dilanda Krisis Utang Berdaulat yang menghancurkan sistem perbankannya. Faktor fiskal apakah yang menyeret Yunani ke jurang kebangkrutan tersebut?",
                "options": [
                    "Penolakan kementerian keuangan Yunani menggunakan bantuan dana beasiswa dari uni eropa",
                    "Keputusan pemerintah Yunani melarang investor asing membeli obligasi surat berharga negaranya",
                    "Defisit anggaran yang dimanipulasi bertahun-tahun, rasio utang melampaui 170% PDB untuk belanja konsumtif rutin, dan tidak adanya kemandirian mata uang untuk mendevaluasi kurs",
                    "Keberhasilan Yunani mencatatkan surplus neraca perdagangan selama dua dekade berturut-turut"
                ],
                "correct": 2,
                "hint": "Pelajaran dari Yunani: belanja ugal-ugalan dibiayai utang jumbo tanpa diimbangi penerimaan pajak, begitu pasar hilang percaya, negara langsung bangkrut!",
                "debrief": "Tepat! Pelajaran berharga bagi teknokrat Indonesia: Disiplin batas defisit 3% dan rasio utang < 60% PDB adalah perisai pelindung agar Indonesia tidak pernah mengalami nasib tragis krisis utang seperti Yunani."
            },
            {
                "id": "s5_q17",
                "scenario": "🛡️ Stress Test Makroprudensial Perbankan",
                "question": "Setiap semester, Bank Indonesia dan OJK melakukan 'Macro Stress Test' terhadap seluruh bank umum. Bagaimana simulasi ketahanan perbankan ini dijalankan?",
                "options": [
                    "Menghitung jumlah antrean nasabah yang datang menyetorkan uang tabungan di loket teller",
                    "Memeriksa kesesuaian seragam kerja para karyawan perbankan dengan standar kementerian tenaga kerja",
                    "Menguji kekuatan fisik gedung kantor cabang bank dalam menghadapi gempa bumi tektonik",
                    "Menguji ketahanan modal dan likuiditas bank di bawah simulasi skenario terburuk ekstrem (misal: PDB minus 5%, kurs melonjak ke Rp 20.000, dan suku bunga naik tajam)"
                ],
                "correct": 3,
                "hint": "Uji tabrak perbankan: apakah bank-bank kita masih sanggup berdiri tegak jika badai ekonomi terburuk menghantam serempak?",
                "debrief": "Benar! <span class='econ-jargon' data-term='stress_test'>Stress Test</span> mendeteksi kerentanan laten sejak dini. Bank yang modalnya rapuh dalam skenario krisis diwajibkan menambah modal sebelum bencana nyata benar-benar terjadi."
            },
            {
                "id": "s5_q18",
                "scenario": "🫧 Gelembung Aset (Asset Price Bubble Collapse)",
                "question": "Dalam sejarah krisis perbankan Jepang 1990 dan krisis properti China baru-baru ini, bagaimana mekanisme meletusnya gelembung harga aset (Bubble Burst) merusak sektor riil?",
                "options": [
                    "Harga properti spekulatif anjlok tajam, memicu ledakan kredit macet perbankan, menyusutkan kekayaan riil masyarakat (Balance Sheet Recession), dan memicu deflasi berkepanjangan",
                    "Perusahaan pengembang properti secara otomatis melunasi seluruh kewajiban pinjaman utang banknya",
                    "Nilai tukar mata uang domestik menguat hingga menyentuh batas tertinggi dalam sejarah dunia",
                    "Pemerintah secara sepihak membagikan seluruh unit apartemen kepada keluarga pra-sejahtera"
                ],
                "correct": 0,
                "hint": "Saat harga rumah yang digoreng spekulan meletus anjlok, pembeli bangkrut, bank macet kreditnya, dan roda ekonomi mogok bertahun-tahun!",
                "debrief": "Tepat! Krisis neraca (Balance Sheet Recession) Richard Koo: pelaku usaha dan rumah tangga sibuk membayar utang alih-alih berinvestasi, membekukan pertumbuhan ekonomi selama bertahun-tahun."
            },
            {
                "id": "s5_q19",
                "scenario": "🔄 Restrukturisasi Kredit Darurat OJK",
                "question": "Saat pandemi Covid-19 melumpuhkan aktivitas usaha, OJK menerbitkan POJK No. 11/2020 mengenai restrukturisasi kredit perbankan bagi debitur terdampak. Mengapa relaksasi regulasi ini menyelamatkan sektor riil dan perbankan sekaligus?",
                "options": [
                    "Menghapuskan seluruh sisa utang pokok nasabah dan melarang bank menagih pinjaman selamanya",
                    "Mengalihkan seluruh kepemilikan aset bisnis debitur kepada kementerian koperasi dan UKM",
                    "Memaksa bank umum membagikan dana modalnya secara tunai kepada seluruh pemilik kartu debit",
                    "Memberikan napas bagi debitur UMKM melalui penundaan cicilan pokok dan perpanjangan tenor tanpa langsung digolongkan sebagai kredit macet (NPL) yang mengharuskan bank mencadangkan kerugian modal besar"
                ],
                "correct": 3,
                "hint": "Memberi waktu bernapas bagi pengusaha yang tokonya tutup agar tidak langsung divonis bangkrut, sembari menjaga kesehatan buku neraca bank!",
                "debrief": "Tepat! Restrukturisasi kredit darurat adalah jembatan likuiditas penyelamat. Debitur selamat dari jurang kebangkrutan dan sistem perbankan terhindar dari ledakan kredit macet sistemik."
            },
            {
                "id": "s5_q20",
                "scenario": "🌾 Manajemen Cadangan Beras Pemerintah (CBP)",
                "question": "Dalam menghadapi ancaman gejolak krisis pangan global, pemerintah menetapkan batas aman Cadangan Beras Pemerintah (CBP) di gudang Bulog minimal 1,5 - 2 juta ton. Apa fungsi strategis cadangan fisik ini?",
                "options": [
                    "Membuat seluruh pabrik penggilingan padi swasta di pedesaan menghentikan operasional usahanya",
                    "Memastikan bahwa seluruh beras cadangan dapat diekspor ke pasar internasional demi mengejar devisa",
                    "Menimbun beras sebanyak-banyaknya untuk dijual kembali dengan harga setinggi-tingginya kepada rakyat miskin",
                    "Memiliki kekuatan intervensi fisik seketika untuk meredam lonjakan harga pangan di pasar dan menjamin pasokan darurat bencana tanpa bergantung pada impor beras saat negara lain menutup ekspor"
                ],
                "correct": 3,
                "hint": "Lumbung pangan darurat bangsa: jika krisis pangan dunia meledak dan negara lain tutup keran ekspor, rakyat Indonesia tetap kenyang dan aman!",
                "debrief": "Luar biasa! Ketahanan fisik pangan adalah fondasi kedaulatan nasional. Memegang cadangan pangan fisik menjamin stabilitas sosial dan membentengi stabilitas makro dari guncangan global."
            },
            {
                "id": "s5_q21",
                "scenario": "⚡ Krisis Energi & Subsidi Kompensasi APBN",
                "question": "Ketika harga minyak mentah dunia melonjak hingga US$ 120 per barel akibat perang geopolitik, kuota subsidi energi BBM dan listrik dalam APBN membengkak ratusan triliun rupiah. Pilihan kebijakan sulit apakah yang dihadapi teknokrat?",
                "options": [
                    "Menimbang antara membiarkan subsidi membengkak (mengorbankan ruang fiskal dan menambah utang) vs menaikkan harga BBM eceran (menekan daya beli rakyat dan memicu lonjakan inflasi sesaat)",
                    "Memerintahkan Pertamina membagikan bensin secara cuma-cuma kepada seluruh pemilik kendaraan pribadi",
                    "Menutup seluruh stasiun pengisian bahan bakar umum di tanah air untuk menghemat stok minyak",
                    "Menyerahkan pengelolaan seluruh ladang minyak nasional kepada perusahaan minyak negara tetangga"
                ],
                "correct": 0,
                "hint": "Pilihan simalakamanya menteri keuangan: tahan harga BBM kas negara jebol, naikkan harga BBM rakyat tercekik inflasi. Di sinilah seni menyeimbangkan subsidi dan bansos terarah!",
                "debrief": "Sangat tepat! Dilema fiskal energi membutuhkan penyesuaian bertahap yang presisi: bantalan bansos tunai (BLT) dipertebal bagi warga rentan sebelum harga BBM subsidi disesuaikan secara terukur."
            },
            {
                "id": "s5_q22",
                "scenario": "🛡️ Early Warning System (EWS) Kerentanan",
                "question": "Bank Indonesia dan Kementerian Keuangan membangun sistem peringatan dini (Early Warning System / EWS). Indikator makroekonomi utama apakah yang dipantau setiap hari untuk mendeteksi ancaman krisis sebelum meledak?",
                "options": [
                    "Defisit transaksi berjalan (CAD), kecukupan cadangan devisa, rasio utang luar negeri jangka pendek, premi risiko CDS (Credit Default Swap), dan pertumbuhan kredit perbankan",
                    "Jumlah berita ekonomi di surat kabar harian yang memuat kata-kata bernada pesimis",
                    "Rata-rata kehadiran absensi harian para pegawai kementerian dan lembaga pemerintah",
                    "Perbandingan jumlah mobil baru dan sepeda motor yang melintas di jalan tol ibu kota"
                ],
                "correct": 0,
                "hint": "Radar pemantau badai makro: memantau CAD, cadangan devisa, utang valas, dan premi risiko sebelum gejolak berubah menjadi krisis nyata!",
                "debrief": "Tepat! <span class='econ-jargon' data-term='early_warning'>Early Warning System</span> memberikan sinyal bahaya dini (pre-emptive signal), memungkinkan otoritas mengambil tindakan pengetatan atau injeksi likuiditas sebelum krisis meluas."
            },
            {
                "id": "s5_q23",
                "scenario": "🌱 Just Energy Transition Partnership (JETP)",
                "question": "Indonesia menandatangani kesepakatan JETP senilai puluhan miliar dolar untuk memensiunkan dini PLTU batu bara dan membangun pembangkit energi terbarukan. Mengapa transisi energi ini harus dijalankan secara 'Berkeadilan' (Just Transition)?",
                "options": [
                    "Mengharuskan masyarakat membayar tarif listrik sepuluh kali lipat lebih mahal demi melunasi utang luar negeri",
                    "Memaksa seluruh pembangkit listrik batu bara ditutup seketika dalam tempo 24 jam tanpa ada pengganti",
                    "Menjamin bahwa penutupan tambang batu bara tidak memicu pengangguran massal mendadak bagi ratusan ribu pekerja lokal, melainkan disertai pelatihan kerja baru dan pembangunan ekonomi alternatif",
                    "Menyerahkan seluruh pengelolaan sumber daya energi nasional kepada konsorsium perusahaan asing"
                ],
                "correct": 2,
                "hint": "Transisi hijau harus manusiawi: kita kurangi polusi karbon, tapi para pekerja tambang dan keluarganya tidak boleh dibiarkan terlantar kehilangan nafkah!",
                "debrief": "Luar biasa! Transisi energi berkeadilan menyeimbangkan komitmen iklim global dengan keberlangsungan ekonomi sosial rakyat lokal dan keandalan pasokan listrik nasional."
            },
            {
                "id": "s5_q24",
                "scenario": "📉 Bahaya Deflasi Kronis (Deflationary Spiral)",
                "question": "Orang awam sering mengira harga barang yang terus turun (Deflasi) selalu menguntungkan. Mengapa bagi teknokrat makroekonomi, deflasi kronis yang berkepanjangan (seperti fenomena Dekade yang Hilang di Jepang) justru sangat mematikan?",
                "options": [
                    "Bank sentral kehilangan seluruh cadangan uang kertas yang tersimpan di brankas kas",
                    "Konsumen menunda belanja karena yakin harga besok akan lebih murah lagi, omzet toko anjlok, perusahaan mem-PHK buruh, pendapatan merosot, dan beban utang riil justru membengkak",
                    "Perekonomian secara otomatis mencatatkan pertumbuhan PDB tertinggi di dunia",
                    "Masyarakat secara serempak menolak menerima pembagian dividen laba tunai badan usaha milik negara"
                ],
                "correct": 1,
                "hint": "Bila kamu tahu harga laptop atau baju bulan depan bakal turun lagi, kamu tunda belanja. Jika semua orang menunda belanja, toko tutup dan ekonomi mati suri!",
                "debrief": "Tepat sekali! Spiral Deflasi (Deflationary Spiral) sangat sulit disembuhkan. Inilah alasan mengapa bank sentral dunia menargetkan inflasi positif yang rendah dan stabil (2-3%), bukan inflasi nol atau deflasi."
            },
            {
                "id": "s5_q25",
                "scenario": "🛡️ Ketahanan Pangan: Food Estate & Produktivitas",
                "question": "Dalam jangka panjang, apa strategi struktural paling berkelanjutan untuk melindungi ekonomi Indonesia dari ancaman krisis pangan global selain mengandalkan cadangan impor?",
                "options": [
                    "Meningkatkan produktivitas hasil tani per hektar melalui riset bibit unggul, modernisasi irigasi, kepastian kepemilikan lahan petani, dan efisiensi rantai pasok pascapanen",
                    "Melarang seluruh masyarakat mengonsumsi beras dan mewajibkan memakan umbi-umbian liar",
                    "Menaikkan tarif bea masuk impor beras hingga seribu persen tanpa memperbaiki produksi sawah lokal",
                    "Membakar seluruh persediaan bahan pangan impor yang masuk melalui pelabuhan niaga"
                ],
                "correct": 0,
                "hint": "Solusi sejati bukan terus-menerus impor, tapi memodernisasi sawah, irigasi, dan bibit petani agar panen padi lokal melimpah ruah!",
                "debrief": "Tepat! Kebijakan struktural di sisi penawaran pertanian adalah kunci ketahanan jangka panjang. Produktivitas yang tinggi menjamin swasembada pangan yang berkelanjutan."
            },
            {
                "id": "s5_q26",
                "scenario": "🏦 Rasio Kecukupan Modal Bank (CAR)",
                "question": "Rasio Kecukupan Modal (Capital Adequacy Ratio / CAR) industri perbankan Indonesia berada di atas 26%, jauh melampaui standar Basel III minimal 8%. Mengapa modal perbankan yang tebal ini menjadi pahlawan saat badai krisis global melanda?",
                "options": [
                    "Bank memiliki bantalan modal penyerap kerugian yang sangat tebal, sehingga lonjakan kredit macet saat krisis tidak mengancam dana tabungan nasabah maupun kelangsungan hidup bank",
                    "Tingkat suku bunga pinjaman kredit perbankan secara otomatis menjadi nol persen di seluruh kantor cabang",
                    "Seluruh bank umum swasta secara otomatis dibebaskan dari audit laporan keuangan oleh OJK",
                    "Bank diwajibkan oleh undang-undang membagikan seluruh modalnya kepada masyarakat miskin"
                ],
                "correct": 0,
                "hint": "Bantalan pengaman mobil yang sangat tebal: jika terjadi tabrakan krisis ekonomi yang keras, para penumpang di dalam mobil (tabungan nasabah) tetap selamat terlindungi!",
                "debrief": "Benar sekali! Modal perbankan (CAR) yang kokoh adalah benteng utama stabilitas sistem keuangan (SSK), memastikan perbankan Indonesia tetap resilien menghadapi guncangan global."
            },
            {
                "id": "s5_q27",
                "scenario": "🤝 Peran Koperasi & UMKM dalam Ketahanan",
                "question": "Saat krisis moneter 1998 meruntuhkan konglomerasi besar yang sarat utang valas, mengapa sektor UMKM dan koperasi justru terbukti paling tangguh bertahan?",
                "options": [
                    "Bank sentral melarang bank komersial menagih utang pinjaman modal kepada pengusaha besar",
                    "Pemerintah memberikan subsidi dana tunai ratusan triliun rupiah khusus untuk para pedagang kelontong",
                    "Seluruh konglomerasi besar diwajibkan menyerahkan aset pabriknya kepada koperasi pedesaan",
                    "UMKM tidak memiliki utang luar negeri dalam mata uang Dolar AS, menggunakan bahan baku lokal, dan memiliki kelenturan tinggi dalam menyesuaikan produk dengan kebutuhan pasar harian"
                ],
                "correct": 3,
                "hint": "UMKM tidak berutang Dolar, belanja bahan lokal, dan lincah beradaptasi: inilah pahlawan penyelamat ekonomi rakyat di saat konglomerat bertumbangan!",
                "debrief": "Tepat! UMKM adalah tulang punggung ketahanan ekonomi Indonesia. Menghubungkan UMKM ke rantai pasok industri modern memperkuat fondasi ekonomi bangsa agar tidak rapuh dihantam guncangan eksternal."
            },
            {
                "id": "s5_q28",
                "scenario": "📈 Penurunan Kemiskinan Ekstrem & Stunting",
                "question": "Mengapa target penghapusan kemiskinan ekstrem dan penurunan angka stunting gizi balita menjadi indikator makro prioritas dalam dokumen Rencana Pembangunan Jangka Panjang Nasional (RPJPN)?",
                "options": [
                    "Anak yang bergizi baik dan cerdas adalah modal manusia (Human Capital) masa depan; mencegah stunting menyelamatkan potensi produktivitas PDB dan memutus rantai kemiskinan antargenerasi",
                    "Balita yang bebas stunting secara hukum diwajibkan membayar pajak penghasilan sejak usia dini",
                    "Target kemiskinan adalah syarat formalitas administratif untuk memperoleh pinjaman dari bank komersial",
                    "Menghapuskan stunting secara otomatis melunasi seluruh kewajiban utang luar negeri pemerintah"
                ],
                "correct": 0,
                "hint": "Kekayaan terhebat bangsa bukan nikel atau batu bara di perut bumi, melainkan anak-anak Indonesia yang sehat, cerdas, dan siap memimpin dunia!",
                "debrief": "Luar biasa! Investasi pada anak balita dan gizi ibu hamil adalah investasi makroekonomi dengan imbal hasil (Rate of Return) tertinggi dalam pembangunan peradaban bangsa."
            },
            {
                "id": "s5_q29",
                "scenario": "⚖️ Reformasi Birokrasi & Kemudahan Berusaha (EoDB)",
                "question": "Banyak investor mengeluhkan tumpang tindih perizinan antara pemerintah pusat dan daerah. Mengapa reformasi birokrasi dan penyederhanaan regulasi izin usaha menjadi instrumen penarik investasi yang lebih ampuh dibanding sekadar obral diskon pajak?",
                "options": [
                    "Penyederhanaan regulasi secara otomatis membebaskan perusahaan asing dari pengawasan amdal lingkungan",
                    "Kepastian hukum, birokrasi yang bersih dari pungutan liar, dan kecepatan perizinan memangkas biaya ekonomi biaya tinggi (High-Cost Economy) secara permanen",
                    "Pengusaha swasta diberikan wewenang untuk mencetak undang-undang ketenagakerjaannya sendiri",
                    "Pemerintah diwajibkan menggaji seluruh manajer ekspatriat yang bekerja di kawasan ekonomi khusus"
                ],
                "correct": 1,
                "hint": "Investor butuh kepastian hukum dan proses izin yang cepat tanpa suap; kepastian aturan jauh lebih berharga daripada iming-iming diskon pajak sesaat!",
                "debrief": "Tepat! Efisiensi birokrasi memangkas biaya transaksi (Transaction Costs). Iklim investasi yang ramah dan berkepastian hukum adalah magnet penarik modal produktif jangka panjang."
            },
            {
                "id": "s5_q30",
                "scenario": "🪙 Dedolarisasi & Ketahanan Finansial Multilateral",
                "question": "Tren global terkini menunjukkan peningkatan diversifikasi cadangan devisa dunia dari Dolar AS ke mata uang lain (Euro, Yuan, Emas). Apa hikmah strategis dari diversifikasi aset cadangan devisa bagi Indonesia?",
                "options": [
                    "Menghapus seluruh peranan lembaga perbankan komersial swasta di dalam negeri",
                    "Menjamin bahwa seluruh utang luar negeri Indonesia dapat dilunasi menggunakan mata uang lokal",
                    "Mengurangi kerentanan ekonomi nasional dari risiko sanksi finansial sepihak dan gejolak volatilitas siklus suku bunga bank sentral satu negara adidaya",
                    "Memaksa seluruh transaksi perdagangan di pasar tradisional Indonesia menggunakan dinar emas"
                ],
                "correct": 2,
                "hint": "Jangan menaruh semua telur dalam satu keranjang: diversifikasi devisa dan mitra dagang membentengi bangsa dari gejolak satu negara adidaya!",
                "debrief": "Benar! Diversifikasi cadangan devisa dan sistem pembayaran multilateral memperkokoh kedaulatan ekonomi nasional di tengah lanskap geopolitik multipolar global."
            },
            {
                "id": "s5_q31",
                "scenario": "🏛️ Kedaulatan Fiskal & Kemandirian APBN",
                "question": "Dalam jangka panjang menuju Indonesia Emas 2045, mengapa ketergantungan APBN pada pembiayaan utang neto harus terus ditekan melalui peningkatan Tax Ratio dan efisiensi belanja?",
                "options": [
                    "Agar pemerintah tidak perlu lagi menyusun dokumen laporan keuangan negara di akhir tahun",
                    "Agar APBN mandiri dan berdaulat penuh mendanai masa depan bangsa dari keringat penerimaan sendiri, tanpa didikte oleh sentimen volatilitas pasar keuangan internasional",
                    "Agar seluruh menteri kabinet dibebaskan dari kewajiban mengikuti rapat kerja anggaran bersama DPR",
                    "Agar kementerian keuangan dapat membagikan seluruh uang kas negara kepada pemegang saham swasta"
                ],
                "correct": 1,
                "hint": "Bangsa yang mandiri membiayai rumah tangganya sendiri adalah bangsa yang tegak berdiri berdaulat tanpa bisa didikte oleh siapa pun!",
                "debrief": "Tepat sekali! Kemandirian fiskal adalah pilar kedaulatan bangsa. APBN yang sehat dan kokoh menjamin keberlanjutan pembangunan peradaban Indonesia lintas generasi."
            },
            {
                "id": "s5_q32",
                "scenario": "🌐 Krisis Geopolitik & Rantai Pasok Chip Semikonduktor",
                "question": "Ketegangan geopolitik global mengancam rantai pasok chip semikonduktor dunia yang memicu kelangkaan komponen industri otomotif dan elektronik. Bagaimana strategi makro mitigasi risiko rantai pasok industri ini?",
                "options": [
                    "Menutup seluruh pabrik perakitan mobil dan motor listrik di wilayah kawasan industri Jabodetabek",
                    "Mengalihkan seluruh anggaran riset universitas untuk membeli saham perusahaan tambang batu bara",
                    "Membangun ekosistem industri hulu-hilir di dalam negeri (Friend-Shoring / Near-Shoring) dan menjalin kemitraan strategis pasokan bahan baku dengan banyak negara sahabat",
                    "Melarang seluruh rakyat menggunakan telepon pintar dan komputer jinjing buatan luar negeri"
                ],
                "correct": 2,
                "hint": "Diversifikasi pemasok dan bangun ekosistem industri komponen di dalam negeri agar pabrik tidak mati kutu saat perang pecah di belahan dunia lain!",
                "debrief": "Benar! Resiliensi rantai pasok (Supply Chain Resilience) kini menjadi pilar keamanan ekonomi nasional (Economic Security) di era fragmentasi geopolitik global."
            },
            {
                "id": "s5_q33",
                "scenario": "💼 Peran BUMN sebagai Agen Pembangunan",
                "question": "Badan Usaha Milik Negara (BUMN) di Indonesia mengemban peran ganda: sebagai entitas bisnis pencetak laba sekaligus Agen Pembangunan (Agent of Development). Mengapa peran ganda ini vital saat menghadapi krisis?",
                "options": [
                    "BUMN dapat ditugaskan membangun infrastruktur perintis di daerah terpencil dan menyalurkan stimulus saat sektor swasta tiarap menahan investasi",
                    "BUMN berhak menyita aset seluruh perusahaan swasta yang menjadi kompetitor bisnisnya di pasar",
                    "BUMN dibebaskan dari seluruh kewajiban mematuhi undang-undang perpajakan dan audit keuangan negara",
                    "BUMN diwajibkan membagi-bagikan seluruh produk barangnya secara cuma-cuma kepada para anggota DPR"
                ],
                "correct": 0,
                "hint": "Saat pihak swasta takut menanam modal di daerah terpencil yang belum untung, BUMN hadir membuka jalan tol dan listrik perintis demi kemajuan rakyat!",
                "debrief": "Tepat! BUMN adalah tangan kanan pembangunan pemerintah. Keseimbangan antara profesionalisme tata kelola bisnis dan mandat pembangunan sosial menjadikannya lokomotif penggerak ekonomi nasional."
            },
            {
                "id": "s5_q34",
                "scenario": "🌪️ Resiliensi Makroekonomi Menghadapi 'Black Swan'",
                "question": "Peristiwa 'Black Swan' (kejadian langka berdampak dahsyat yang tidak terduga, seperti pandemi global atau krisis geopolitik besar) menuntut kapasitas resiliensi makro. Apa definisi sejati dari resiliensi ekonomi sebuah bangsa?",
                "options": [
                    "Kemampuan pemerintah menjamin bahwa perekonomian tidak akan pernah mengalami penurunan pertumbuhan selamanya",
                    "Kondisi di mana sebuah negara berhasil menghentikan seluruh transaksi perdagangan internasional secara mutlak",
                    "Kemampuan sistem ekonomi untuk menyerap guncangan dahsyat, membatasi kerusakan sosial, dan bangkit kembali (Bounce Back) lebih kuat dengan fondasi yang lebih kokoh",
                    "Penetapan undang-undang darurat yang membubarkan seluruh fungsi kementerian dan lembaga negara"
                ],
                "correct": 2,
                "hint": "Bukan berarti tidak pernah terkena badai, melainkan punya akar yang begitu kuat dan lentur sehingga saat badai menerpa kita tidak tumbang, dan begitu badai usai kita tegak kembali!",
                "debrief": "Luar biasa! Resiliensi makroekonomi adalah kapasitas adaptasi dan daya lenting bangsa. Mengintegrasikan manajemen risiko ke dalam seluruh kebijakan publik menjamin kelangsungan hidup peradaban bangsa."
            },
            {
                "id": "s5_q35",
                "scenario": "👥 Visi Indonesia Emas 2045: Menembus Middle-Income Trap",
                "question": "Indonesia menargetkan keluar dari Jebakan Pendapatan Menengah (Middle-Income Trap) menjadi negara maju sebelum tahun 2045. Kunci transformasi struktural apakah yang mutlak harus dimenangkan?",
                "options": [
                    "Mengandalkan penjualan ekspor bahan mentah tambang tanpa perlu mengolahnya di dalam negeri",
                    "Peningkatan kualitas pendidikan dan riset (Human Capital), industrialisasi manufaktur bernilai tambah tinggi, kepastian hukum institusi, dan transisi ekonomi hijau berkeadilan",
                    "Mencetak uang kertas Rupiah sebanyak-banyaknya untuk dibagikan secara cuma-cuma kepada setiap rumah tangga",
                    "Menutup seluruh pintu kerja sama perdagangan dan investasi dengan negara-negara maju di dunia"
                ],
                "correct": 1,
                "hint": "Keluar dari jebakan negara berkembang butuh lompatan produktivitas: SDM yang pintar dan inovatif, industri berteknologi tinggi, serta hukum yang bersih dan adil!",
                "debrief": "Sangat tepat! Lolos dari <em>Middle-Income Trap</em> menuntut transformasi dari ekonomi berbasis bahan mentah murah menjadi ekonomi berbasis inovasi, pengetahuan, dan industri berdaya saing global."
            },
            {
                "id": "s5_q36",
                "scenario": "👑 Mahakarya Teknokrat Dewan Ekonomi Nasional",
                "question": "Sebagai ujian pamungkas seluruh petualangan Trivia Quest, apakah warisan kepemimpinan teragung yang harus diperjuangkan oleh seorang Teknokrat Dewan Ekonomi Nasional bagi tumpah darah Indonesia?",
                "options": [
                    "Menjaga agar seluruh data neraca keuangan negara dirahasiakan rapat-rapat dari pengawasan publik",
                    "Merancang bauran kebijakan makroekonomi yang adil, tangguh, dan berpandangan jauh ke depan; menjaga amanah APBN dan stabilitas moneter agar kekayaan nusantara bermuara pada kecerdasan, kesehatan, dan kesejahteraan seluruh rakyat Indonesia",
                    "Memaksimalkan kekayaan pribadi dan kelompok golongan dengan memanfaatkan wewenang jabatan kementerian",
                    "Membuat regulasi yang mengutamakan keuntungan konglomerat asing di atas keselamatan rakyat jelata"
                ],
                "correct": 1,
                "hint": "Selamat Yang Mulia Teknokrat Dewan Ekonomi Nasional! Inilah sumpah pengabdian tertinggi: ilmu, nurani, dan dedikasi seutuhnya untuk kejayaan, kemakmuran, dan kedaulatan abadi Republik Indonesia!",
                "debrief": "👑 MAHA KARYA CUM LAUDE TEKNOKRAT DEWAN EKONOMI NASIONAL! Anda telah berhasil menuntaskan seluruh 36 Soal Level 5! Seluruh penguasaan instrumen krisis, moneter, fiskal, dan bauran kebijakan kini ada di tangan Anda. Pintu Sidang Kabinet 7 Tuas, Krisis Sejarah, dan Lab Pasar kini TERBUKA PENUH untuk Anda pimpin!"
            }
        ]
    }
];


class MacroTriviaEngine {
    constructor() {
        this.stages = MACRO_TRIVIA_STAGES;
        this.currentStageId = 1;
        this.currentQuestionIdx = 0;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.lives = 5;
        this.maxLives = 5;
        this.isAnswered = false;
        this.shieldActive = false;
        this.eliminatedOptions = [];
        this.stageCorrectCount = 0;
        this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 };

        this.unlockedStageIds = [1];
        this.advanceUnlocked = {
            econGames: false,
            scenarios: false,
            cockpit: false
        };

        this.loadProgress();
        // Start active 6-question session from the 36-question pool for current level
        this.startSessionQuestions(this.getCurrentStage());
    }

    startSessionQuestions(stage) {
        if (!stage) return;
        const pool = stage.questionPool || stage.questions || [];
        // Shuffle the pool and pick exactly 6 questions
        const shuffledPool = [...pool];
        for (let i = shuffledPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
        }
        // Take 6 questions for this game session
        stage.questions = shuffledPool.slice(0, 6).map(q => ({ ...q }));
        // Shuffle options for these 6 questions so correct answer is randomly distributed
        this.shuffleAllStageQuestions(stage);
    }

    shuffleQuestion(q) {
        if (!q || !q.options) return;
        const indexed = q.options.map((optText, idx) => ({
            text: optText,
            isCorrect: idx === q.correct
        }));
        // Fisher-Yates Shuffle
        for (let i = indexed.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
        }
        q._shuffledOptions = indexed.map(item => item.text);
        q._shuffledCorrect = indexed.findIndex(item => item.isCorrect);
    }

    shuffleAllStageQuestions(stage) {
        if (!stage || !stage.questions) return;
        stage.questions.forEach(q => this.shuffleQuestion(q));
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('macromaster_trivia_progress');
            if (saved) {
                const data = JSON.parse(saved);
                this.score = Number(data.score) || 0;
                this.unlockedStageIds = (data.unlockedStageIds || [1]).map(Number);
                this.advanceUnlocked = data.advanceUnlocked || { econGames: false, scenarios: false, cockpit: false };
                this.currentStageId = Number(data.currentStageId) || 1;
                if (data.stageResetsRemaining && typeof data.stageResetsRemaining === 'object') {
                    this.stageResetsRemaining = { ...this.stageResetsRemaining, ...data.stageResetsRemaining };
                }
            }
        } catch (e) {}
        this.unlockedStageIds = Array.from(new Set((this.unlockedStageIds || [1]).map(Number)));
        if (!this.unlockedStageIds.includes(1)) this.unlockedStageIds.unshift(1);
    }

    saveProgress() {
        try {
            const data = {
                score: this.score,
                unlockedStageIds: Array.from(new Set(this.unlockedStageIds.map(Number))),
                advanceUnlocked: this.advanceUnlocked,
                currentStageId: Number(this.currentStageId),
                stageResetsRemaining: this.stageResetsRemaining
            };
            localStorage.setItem('macromaster_trivia_progress', JSON.stringify(data));
        } catch (e) {}
    }

    getCurrentStage() {
        const curId = Number(this.currentStageId);
        return this.stages.find(s => Number(s.id) === curId) || this.stages[0];
    }

    getCurrentQuestion() {
        const stage = this.getCurrentStage();
        if (!stage.questions || stage.questions.length === 0) {
            this.startSessionQuestions(stage);
        }
        const q = stage.questions[this.currentQuestionIdx] || stage.questions[0];
        if (!q._shuffledOptions || q._shuffledCorrect === undefined) {
            this.shuffleQuestion(q);
        }
        return {
            ...q,
            options: q._shuffledOptions,
            correct: q._shuffledCorrect
        };
    }

    selectStage(stageId) {
        stageId = Number(stageId);
        const unlockedNums = this.unlockedStageIds.map(Number);
        if (!unlockedNums.includes(stageId)) {
            // Failsafe auto-unlock if selecting next level or within unlocked range
            if (stageId === Number(this.currentStageId) + 1 || stageId <= Math.max(...unlockedNums) + 1) {
                this.unlockedStageIds.push(stageId);
                this.unlockedStageIds = Array.from(new Set(this.unlockedStageIds.map(Number)));
            } else {
                return false;
            }
        }
        this.currentStageId = stageId;
        this.currentQuestionIdx = 0;
        this.stageCorrectCount = 0;
        this.lives = this.maxLives;
        this.combo = 0;
        this.isAnswered = false;
        this.shieldActive = false;
        this.eliminatedOptions = [];
        this.startSessionQuestions(this.getCurrentStage());
        this.saveProgress();
        return true;
    }

    answerQuestion(chosenIdx) {
        if (this.isAnswered) return null;
        this.isAnswered = true;

        const q = this.getCurrentQuestion();
        const isCorrect = (Number(chosenIdx) === Number(q.correct));

        if (isCorrect) {
            this.combo = (this.combo || 0) + 1;
            if (this.combo > (this.maxCombo || 0)) this.maxCombo = this.combo;
            const points = 100 + (this.combo * 20);
            this.score = (this.score || 0) + points;
            this.stageCorrectCount = (Number(this.stageCorrectCount) || 0) + 1;
        } else {
            if (this.shieldActive) {
                this.shieldActive = false;
            } else {
                this.lives = Math.max(0, (this.lives || 5) - 1);
                this.combo = 0;
            }
        }

        const stage = this.getCurrentStage();
        const totalQ = (stage && stage.questions) ? stage.questions.length : 6;
        const isStageFinished = this.isStageComplete();
        const currentCorrect = Number(this.stageCorrectCount) || 0;
        const stageScorePct = Math.round((currentCorrect / totalQ) * 100);

        // Syarat kelulusan: Selesai 6 soal, nilai benar minimal 80% (misal 5 dari 6 soal = 83%), dan nyawa > 0
        const isPassed = isStageFinished && (stageScorePct >= 80) && (this.lives > 0);

        if (isPassed) {
            this.handleStageCompletion();
        }

        this.saveProgress();

        return {
            isCorrect: isCorrect,
            correctIdx: q.correct,
            chosenIdx: chosenIdx,
            debrief: q.debrief,
            lives: this.lives,
            combo: this.combo,
            score: this.score,
            isGameOver: this.lives <= 0,
            isStageFinished: isStageFinished,
            stageCorrectCount: currentCorrect,
            stageTotalQuestions: totalQ,
            stageScorePct: stageScorePct,
            isPassed: isPassed
        };
    }

    getStageEvaluation() {
        const stage = this.getCurrentStage();
        const totalQ = (stage && stage.questions && stage.questions.length) || 6;
        const correct = Number(this.stageCorrectCount) || 0;
        const pct = Math.round((correct / totalQ) * 100);
        const isPassed = pct >= 80 && this.lives > 0;
        const curId = Number(this.currentStageId);
        const nextStageId = curId + 1;
        const nextStage = this.stages.find(s => Number(s.id) === nextStageId);
        return {
            stageId: curId,
            stageTitle: stage.title,
            correctCount: correct,
            totalQuestions: totalQ,
            scorePct: pct,
            isPassed: isPassed,
            nextStageId: nextStageId,
            nextStageTitle: nextStage ? nextStage.title : null,
            isAllStagesCompleted: (curId === this.stages.length) && isPassed
        };
    }

    nextQuestion() {
        const stage = this.getCurrentStage();
        if (this.currentQuestionIdx < stage.questions.length - 1) {
            this.currentQuestionIdx++;
            this.isAnswered = false;
            this.eliminatedOptions = [];
            return true;
        }
        return false;
    }

    isStageComplete() {
        const stage = this.getCurrentStage();
        return this.currentQuestionIdx >= stage.questions.length - 1;
    }

    handleStageCompletion() {
        const curId = Number(this.currentStageId);
        const nextStageId = curId + 1;
        if (nextStageId <= this.stages.length) {
            const unlockedNums = this.unlockedStageIds.map(Number);
            if (!unlockedNums.includes(nextStageId)) {
                this.unlockedStageIds.push(nextStageId);
            }
            if (!this.stageResetsRemaining) this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 };
            this.stageResetsRemaining[nextStageId] = 3;
        }

        // Unlocks for Advance Modes
        if (curId >= 3) {
            this.advanceUnlocked.econGames = true;
        }
        if (curId >= 4) {
            this.advanceUnlocked.scenarios = true;
        }
        if (curId >= 5) {
            this.advanceUnlocked.cockpit = true;
        }

        this.saveProgress();
    }

    getRemainingResets(stageId) {
        const sId = Number(stageId || this.currentStageId);
        if (this.stageResetsRemaining && typeof this.stageResetsRemaining[sId] === 'number') {
            return Math.max(0, this.stageResetsRemaining[sId]);
        }
        return 3;
    }

    resetCurrentStageWithLimit() {
        const curId = Number(this.currentStageId);
        const remaining = this.getRemainingResets(curId);

        if (remaining > 0) {
            const newRemaining = remaining - 1;
            if (!this.stageResetsRemaining) this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 };
            this.stageResetsRemaining[curId] = newRemaining;
            this.restartStage();
            this.saveProgress();
            return {
                status: 'reset_success',
                remaining: newRemaining,
                stageId: curId,
                message: `Level ${curId} berhasil direset. Sisa kesempatan reset untuk level ini: ${newRemaining} kali.`
            };
        } else {
            // Kuota reset sudah habis (0)
            if (curId > 1) {
                const prevId = curId - 1;
                if (!this.stageResetsRemaining) this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 };
                // Pulihkan kuota level ini agar tersedia saat nanti berhasil kembali ke level ini
                this.stageResetsRemaining[curId] = 3;
                // Kunci level ini kembali (pemain harus mengulang dan lulus level sebelumnya)
                this.unlockedStageIds = this.unlockedStageIds.filter(id => Number(id) < curId);
                if (!this.unlockedStageIds.includes(prevId)) {
                    this.unlockedStageIds.push(prevId);
                }
                this.selectStage(prevId);
                this.saveProgress();
                return {
                    status: 'demoted',
                    remaining: 0,
                    prevStageId: prevId,
                    stageId: prevId,
                    message: `⚠️ Batas reset Level ${curId} telah habis (3/3 kali)! Anda harus mengulang dari Level ${prevId}. Level ${curId} dikunci kembali hingga Anda lulus Level ${prevId} lagi.`
                };
            } else {
                // Level 1: ulang level 1 dari awal dan pulihkan 3 kesempatan
                if (!this.stageResetsRemaining) this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 };
                this.stageResetsRemaining[1] = 3;
                this.restartStage();
                this.saveProgress();
                return {
                    status: 'level1_exhausted',
                    remaining: 3,
                    stageId: 1,
                    message: `⚠️ Batas reset Level 1 telah habis (3/3 kali)! Level 1 diulang kembali dari awal dan kuota 3 kesempatan reset dipulihkan.`
                };
            }
        }
    }

    restartStage() {
        this.currentQuestionIdx = 0;
        this.stageCorrectCount = 0;
        this.lives = this.maxLives;
        this.combo = 0;
        this.isAnswered = false;
        this.shieldActive = false;
        this.eliminatedOptions = [];
        // Draw fresh 6 random questions from the 36-question bank
        this.startSessionQuestions(this.getCurrentStage());
    }

    unlockAllAdvanceModes() {
        this.unlockedStageIds = [1, 2, 3, 4, 5];
        this.advanceUnlocked = {
            econGames: true,
            scenarios: true,
            cockpit: true
        };
        this.saveProgress();
    }

    use5050() {
        if (this.isAnswered || this.eliminatedOptions.length > 0) return [];
        const q = this.getCurrentQuestion();
        const wrongIndices = [0, 1, 2, 3].filter(idx => idx !== q.correct);
        wrongIndices.sort(() => Math.random() - 0.5);
        this.eliminatedOptions = wrongIndices.slice(0, 2);
        return this.eliminatedOptions;
    }

    useHint() {
        const q = this.getCurrentQuestion();
        return q.hint || "Pikirkan logika sederhana dalam kehidupan sehari-hari!";
    }

    useShield() {
        if (this.shieldActive) return false;
        this.shieldActive = true;
        return true;
    }
}

if (typeof window !== 'undefined') {
    window.macroTriviaEngine = new MacroTriviaEngine();
}
