/**
 * ==============================================================================
 * MACROMASTER DEN - FUN & CHALLENGING MACRO TRIVIA QUEST (macro_trivia.js)
 * Fitur: Trivia Game Edukatif, Menantang & Penuh Analogi Sehari-hari untuk
 * Memahami Konteks dan Esensi Ekonomi Makro Secara Mendalam.
 * 
 * Catatan Desain Soal:
 * Seluruh opsi salah (distractor) dirancang realistis dan masuk akal (plausible
 * economic misconceptions / competing views) sehingga pemain ditantang untuk
 * benar-benar memahami mekanisme kausalitas ekonomi, bukan sekadar menebak logika.
 * ==============================================================================
 */

const MACRO_TRIVIA_STAGES = [
    {
        id: 1,
        title: "Stage 1: 🛒 Pasar Kaget & Warung Kopi",
        subtitle: "Memahami Uang, Inflasi, dan Daya Beli Belanja Harian",
        theme: "market",
        unlocks: "Gelar: Pahlawan Belanja Cerdas 🛒",
        questions: [
            {
                id: "s1_q1",
                scenario: "🏪 Bu Tejo di Pasar Tradisional",
                question: "Menjelang hari raya, harga cabai, beras, dan daging sapi serempak naik tajam di berbagai pasar. Dari kacamata ekonomi makro, mekanisme utama apakah yang memicu kenaikan harga tersebut?",
                options: [
                    "Lonjakan belanja konsumsi masyarakat yang meningkat drastis melampaui pasokan fisik pangan jangka pendek (Demand-Pull Inflation)",
                    "Praktek kartel monopoli pedagang eceran pasar yang menaikkan margin keuntungan sepihak tanpa adanya perubahan permintaan",
                    "Bank sentral meningkatkan suku bunga acuan sehingga biaya distribusi logistik pangan menjadi lebih mahal",
                    "Nilai tukar mata uang rupiah melemah seketika terhadap seluruh komoditas pangan domestik"
                ],
                correct: 0,
                hint: "Pikirkan lonjakan serempak pada sisi permintaan konsumsi agregat di saat pasokan panen belum bisa bertambah seketika!",
                debrief: "Tepat sekali! Ini adalah fenomena <span class='econ-jargon' data-term='inflasi_ihk'>Inflasi IHK</span> jenis <em>Demand-Pull</em>. Ketika permintaan agregat masyarakat melonjak tajam dalam waktu singkat sementara pasokan pangan biologis membutuhkan waktu untuk panen/tumbuh, harga keseimbangan pasar otomatis terkerek naik."
            },
            {
                id: "s1_q2",
                scenario: "💸 Kebijakan Moneter & Kapasitas Riil",
                question: "Mengapa bank sentral tidak boleh mencetak uang kartal dalam jumlah berlipat ganda untuk melunasi seluruh utang negara dan dibagikan secara gratis kepada warga?",
                options: [
                    "Uang adalah alat tukar nominal; mencetak uang tanpa penambahan output fisik hanya melipatgandakan harga barang (Hiperinflasi) dan merusak daya beli",
                    "Karena emisi pencetakan uang kartal baru secara hukum internasional wajib dijamin 100% dengan cadangan emas fisik di brankas bank sentral",
                    "Karena penambahan uang kartal baru secara otomatis akan menurunkan suku bunga perbankan hingga batas negatif permanen",
                    "Karena pencetakan uang baru hanya diperbolehkan oleh undang-undang jika neraca transaksi berjalan negara mengalami surplus besar"
                ],
                correct: 0,
                hint: "Kekayaan sejati suatu bangsa diukur dari barang fisik yang diproduksi (PDB Riil), bukan lembaran kertas tukarnya!",
                debrief: "Brilian! Konsep ini dijelaskan oleh <span class='econ-jargon' data-term='teori_kuantitas_uang'>Teori Kuantitas Uang</span> ($M \cdot V = P \cdot Y$). Jika penawaran uang ($M$) digandakan tanpa adanya kenaikan output riil ($Y$), seluruh kenaikan tersebut hanya akan terserap menjadi lonjakan harga umum ($P$), berujung pada <span class='econ-jargon' data-term='stagflasi'>Hiperinflasi</span>!"
            },
            {
                id: "s1_q3",
                scenario: "☕ Kafe Kopi Susu Pak Budi",
                question: "Pak Budi menaikkan harga kopi susunya dari Rp 18.000 menjadi Rp 24.000 bukan karena pembelinya bertambah, melainkan karena lonjakan harga biji kopi global dan susu impor. Jenis inflasi apakah ini?",
                options: [
                    "Cost-Push Inflation: kenaikan harga barang akhir akibat lonjakan ongkos bahan baku atau biaya produksi di sisi penawaran",
                    "Demand-Pull Inflation: kenaikan harga akibat kelebihan likuiditas dan daya beli konsumen di pasar barang mewah",
                    "Core Inflation (Inflasi Inti): kenaikan harga komponen yang sangat dipengaruhi oleh kebijakan moneter suku bunga jangka panjang",
                    "Built-in Inflation: kenaikan harga yang secara otomatis ditentukan oleh indeks penyesuaian upah minimum tahunan"
                ],
                correct: 0,
                hint: "Fokus pada sumber pemicunya: apakah dari belanja konsumen yang membludak atau dari lonjakan biaya bahan baku produsen?",
                debrief: "Tepat! Ini adalah <strong>Cost-Push Inflation</strong> (Guncangan Sisi Penawaran). Produsen terpaksa menaikkan harga jual agar tidak merugi akibat mahalnya bahan baku input, menggeser kurva penawaran agregat jangka pendek ke kiri."
            },
            {
                id: "s1_q4",
                scenario: "🏦 Tabungan Deposito vs Inflasi",
                question: "Seorang nasabah menyimpan uang di deposito bank dengan suku bunga 4,0% per tahun, sementara laju inflasi umum selama periode tersebut mencapai 6,0% per tahun. Menurut Persamaan Fisher, bagaimana nilai riil tabungannya?",
                options: [
                    "Daya beli riilnya menyusut sebesar -2,0% karena kenaikan harga kebutuhan hidup melaju lebih cepat daripada akumulasi imbal hasil nominal tabungannya",
                    "Kekayaan riilnya tetap bertambah sebesar +4,0% karena saldo nominal di rekening bank tidak mengalami pemotongan",
                    "Imbal hasil bersih riilnya adalah +10,0% dari penggabungan tingkat bunga nominal bank dengan persentase inflasi tahun berjalan",
                    "Daya belinya tetap stabil (0%) karena perbankan komersial memiliki mekanisme lindung nilai otomatis terhadap inflasi"
                ],
                correct: 0,
                hint: "Gunakan Persamaan Fisher: Suku Bunga Riil = Suku Bunga Nominal - Laju Inflasi!",
                debrief: "Luar biasa! Inilah hukum <span class='econ-jargon' data-term='persamaan_fisher'>Persamaan Fisher</span> ($r = i - \pi$). Jika bunga nominal ($4\%$) lebih kecil dari inflasi ($6\%$), maka <span class='econ-jargon' data-term='bunga_riil'>Suku Bunga Riil</span> menjadi <strong>-2% (negatif)</strong>. Saldo di buku tabungan bertambah, namun jumlah barang fisik yang bisa dibeli justru berkurang."
            },
            {
                id: "s1_q5",
                scenario: "🥖 Evaluasi Output: PDB Riil vs Nominal",
                question: "Sebuah negara memproduksi 1 juta ton beras tahun lalu senilai Rp 10 Triliun. Tahun ini produksinya tetap 1 juta ton, namun nilainya tercatat Rp 15 Triliun karena kenaikan harga. Mengapa ekonom lebih mengutamakan PDB Riil daripada PDB Nominal?",
                options: [
                    "PDB Riil mengukur perubahan volume fisik output sebenarnya dengan harga konstan, mengeliminasi ilusi moneter dari kenaikan harga semata",
                    "PDB Riil memasukkan seluruh transaksi sektor informal dan komoditas pasar gelap yang tidak tercatat dalam PDB Nominal",
                    "PDB Riil dihitung menggunakan standar mata uang Dolar AS sehingga tidak terpengaruh oleh kurs rupiah domestik",
                    "PDB Riil telah dikurangi secara langsung dengan nilai pembayaran cicilan bunga utang luar negeri pemerintah"
                ],
                correct: 0,
                hint: "Kesejahteraan fisik rakyat ditentukan oleh seberapa banyak ton beras yang bisa dimakan, bukan oleh tingginya angka rupiah di kuitansi!",
                debrief: "Sangat tepat! <span class='econ-jargon' data-term='pdb_riil'>PDB Riil</span> menggunakan harga tahun dasar untuk mengisolasi kenaikan volume fisik sesungguhnya, menggunakan <span class='econ-jargon' data-term='deflator_pdb'>Deflator PDB</span>. Tanpa penyesuaian ini, perekonomian yang stagnan bisa terlihat seolah tumbuh 50% hanya karena inflasi harga."
            },
            {
                id: "s1_q6",
                scenario: "📱 Pembelian Barang Bekas di Pasar Sekunder",
                question: "Mengapa transaksi jual-beli mobil atau barang elektronik bekas (second-hand) tidak dihitung ke dalam Produk Domestik Bruto (PDB) tahun berjalan?",
                options: [
                    "Karena nilai barang tersebut sudah dihitung saat pertama kali diproduksi; menghitungnya lagi akan menimbulkan perhitungan ganda (double counting)",
                    "Karena transaksi barang bekas umumnya tidak dikenakan Pajak Pertambahan Nilai (PPN) resmi oleh kementerian keuangan",
                    "Karena nilai penyusutan ekonomis (depresiasi) barang bekas telah membuat nilai tambahnya menjadi nol atau negatif",
                    "Karena transaksi barang bekas diklasifikasikan sebagai pengeluaran konsumsi otonom yang dikecualikan dari formula agregat Keynesian"
                ],
                correct: 0,
                hint: "PDB hanya menghitung nilai tambah dari barang dan jasa BARU yang diproduksi pada periode berjalan!",
                debrief: "Tepat sekali! PDB mengukur nilai pasar barang dan jasa akhir yang <em>baru diciptakan</em> pada tahun berjalan. Jual-beli barang bekas hanyalah transfer kepemilikan aset yang sudah ada, tanpa menambah produksi fisik baru ke dalam perekonomian."
            }
        ]
    },
    {
        id: 2,
        title: "Stage 2: 🏦 Markas Rahasia Bank Sentral",
        subtitle: "Mengendalikan Pedal Gas & Rem Moneter (BI-Rate & Perbankan)",
        theme: "central_bank",
        unlocks: "Gelar: Detektif Moneter 🏦",
        questions: [
            {
                id: "s2_q1",
                scenario: "🚗 Kemudi Moneter Bank Sentral",
                question: "Bank Indonesia menaikkan suku bunga acuan (BI-Rate) ketika inflasi melonjak dan menurunkannya ketika ekonomi lesu. Mengapa perubahan BI-Rate dianalogikan sebagai rem dan gas mobil ekonomi?",
                options: [
                    "Menaikkan bunga menaikkan biaya kredit sehingga menahan laju belanja konsumsi/investasi (mengerem), sedangkan menurunkan bunga memacu kredit dan ekspansi bisnis (menginjak gas)",
                    "Menaikkan bunga langsung menambah penerimaan pajak kas negara, sedangkan menurunkan bunga memangkas subsidi bahan bakar minyak secara otomatis",
                    "Menaikkan bunga memaksa eksportir menjual seluruh dolarnya ke bank sentral, sedangkan menurunkan bunga membatasi volume impor komoditas pangan",
                    "Menaikkan bunga secara otomatis menurunkan upah minimum buruh pabrik, sedangkan menurunkan bunga mewajibkan pengusaha merekrut tenaga kerja baru"
                ],
                correct: 0,
                hint: "Pikirkan bagaimana bank sentral memperlambat atau mempercepat aliran uang di masyarakat!",
                debrief: "Tepat sekali! <span class='econ-jargon' data-term='bi_rate'>BI-Rate</span> adalah instrumen kemudi moneter utama. Saat inflasi melonjak liar di atas target, BI menginjak rem (menaikkan bunga). Saat ekonomi melambat dan pengangguran meningkat, BI melonggarkan rem dan menginjak gas (menurunkan bunga) agar pinjaman modal kerja bergairah kembali."
            },
            {
                id: "s2_q2",
                scenario: "🏍️ Rencana Kredit & Investasi Bisnis",
                question: "Ketika Bank Indonesia menaikkan BI-Rate sebesar 50 bps (+0,5%), bagaimanakah rantai transmisi kebijakan ini mempengaruhi masyarakat dan dunia usaha?",
                options: [
                    "Biaya dana perbankan naik → bunga pinjaman KPR/kredit usaha meningkat → masyarakat menahan belanja cicilan dan pengusaha menunda ekspansi pabrik",
                    "Perbankan komersial kelebihan likuiditas tunai → bank menurunkan bunga pinjaman agar masyarakat lebih terdorong mengambil utang konsumtif",
                    "Daya beli uang tunai masyarakat langsung naik seketika → konsumsi barang impor melonjak dan memicu defisit neraca dagang seketika",
                    "Pemerintah secara otomatis menaikkan tarif pajak penghasilan untuk mengimbangi kenaikan imbal hasil instrumen deposito perbankan"
                ],
                correct: 0,
                hint: "Bank umum meminjam dana dengan biaya lebih mahal dari BI, jadi mereka membebankan bunga pinjaman yang lebih tinggi ke nasabah!",
                debrief: "Benar! Inilah saluran kredit dalam <span class='econ-jargon' data-term='transmisi_moneter'>Transmisi Kebijakan Moneter</span>. Suku bunga naik → Biaya pinjaman mahal → Masyarakat menahan belanja cicilan konsumtif dan pengusaha menunda ekspansi pabrik → Belanja agregat melambat → Inflasi berhasil diredam!"
            },
            {
                id: "s2_q3",
                scenario: "⏳ Efek Outside Lag Kebijakan Moneter",
                question: "Meskipun Bank Indonesia telah mengumumkan kenaikan BI-Rate kemarin, mengapa laju inflasi umum biasanya baru melandai setelah 6 hingga 18 bulan kemudian?",
                options: [
                    "Terdapat jeda waktu transmisi (Time Lag): perbankan butuh waktu menyesuaikan suku bunga deposito/kredit, dan pelaku usaha butuh waktu merevisi rencana kontrak belanja modalnya",
                    "Karena bank sentral dilarang mengubah peredaran uang kartal sebelum tahun anggaran APBN selesai disahkan oleh parlemen",
                    "Karena kurva penawaran agregat jangka pendek bersifat horizontal sempurna sehingga harga tidak dapat berubah sebelum terjadi pergantian upah buruh",
                    "Karena perubahan suku bunga hanya berdampak pada nilai tukar valas tetapi sama sekali tidak mempengaruhi suku bunga riil pinjaman di sektor riil"
                ],
                correct: 0,
                hint: "Kebijakan moneter itu seperti menyiram air di hulu sungai: butuh waktu berminggu-minggu untuk sampai ke muara laut!",
                debrief: "Keren! Di dunia nyata terdapat fenomena <em>Outside Lag</em> (Keterlambatan Waktu). Bank butuh waktu beberapa bulan untuk menyesuaikan bunga deposito dan kredit, kemudian pengusaha butuh waktu untuk mengevaluasi anggaran proyek. Itulah sebabnya Bank Sentral harus selalu bersikap <em>forward-looking</em> (memprediksi 1 tahun ke depan)!"
            },
            {
                id: "s2_q4",
                scenario: "🛡️ Cadangan Likuiditas Perbankan",
                question: "Bank Indonesia menaikkan rasio Giro Wajib Minimum (GWM) perbankan dari 5,0% menjadi 7,5%. Dampak makroekonomi utama apakah yang ditargetkan dari kebijakan pengetatan likuiditas ini?",
                options: [
                    "Bank wajib memarkir lebih banyak cadangan dana di BI, sehingga kapasitas bank menyalurkan kredit pinjaman ke masyarakat berkurang (menekan ekspansi uang beredar)",
                    "Bank umum memperoleh tambahan modal ekuitas baru dari bank sentral untuk memperluas jaringan kantor cabang di daerah terpencil",
                    "Batas maksimal tingkat bunga pinjaman kartu kredit dipatok lebih rendah agar debitur perbankan terhindar dari risiko kredit macet",
                    "Seluruh simpanan nasabah di atas Rp 2 Miliar secara otomatis dialihkan menjadi kepemilikan saham di lembaga penjamin simpanan (LPS)"
                ],
                correct: 0,
                hint: "Ibarat tabungan darurat yang dikunci di brankas: tidak boleh dipakai belanja agar bank tidak kehabisan uang tunai saat ada krisis!",
                debrief: "Mantap! <span class='econ-jargon' data-term='gwm'>Giro Wajib Minimum (GWM)</span> adalah cadangan likuiditas wajib. Jika BI menaikkan GWM, bank umum harus memarkir lebih banyak dana di BI, sehingga kapasitas bank menyalurkan kredit pinjaman ke masyarakat berkurang (mengerem laju uang beredar)."
            },
            {
                id: "s2_q5",
                scenario: "🕳️ Dilema Zero Lower Bound di Negara Maju",
                question: "Di negara yang mengalami depresi ekonomi, suku bunga acuan bank sentral dipangkas hingga mendekati 0% (Zero Lower Bound), namun dunia usaha tetap enggan meminjam modal dan masyarakat tetap menimbun uang tunai. Mengapa fenomena 'Perangkap Likuiditas' ini melumpuhkan kebijakan moneter?",
                options: [
                    "Karena elastisitas permintaan uang terhadap suku bunga menjadi tak terhingga: penambahan likuiditas oleh bank sentral hanya ditimbun masyarakat tanpa mampu menurunkan bunga riil lebih rendah lagi",
                    "Karena perbankan komersial dilarang menyalurkan kredit jika tingkat inflasi berada di bawah batas target 2% tahunan",
                    "Karena penurunan suku bunga hingga nol persen secara otomatis memicu pelarian modal keluar negeri (capital flight) secara permanen",
                    "Karena pemerintah tidak memiliki wewenang untuk menerbitkan obligasi negara saat suku bunga pasar uang menyentuh angka nol"
                ],
                correct: 0,
                hint: "Mendorong tali: kamu bisa menarik tali untuk mengerem, tapi kamu tidak bisa mendorong tali ke depan kalau orang-orang tidak mau jalan!",
                debrief: "Luar biasa! Fenomena ini dinamakan <span class='econ-jargon' data-term='perangkap_likuiditas'>Perangkap Likuiditas (Liquidity Trap)</span>. Saat bunga sudah nol persen, kebijakan moneter kehilangan taringnya. Satu-satunya jurus penyelamat adalah pemerintah yang harus langsung belanja proyek fisik melalui kebijakan fiskal!"
            },
            {
                id: "s2_q6",
                scenario: "🌐 Selisih Suku Bunga & Kurs Valas",
                question: "Jika Bank Indonesia menaikkan BI-Rate saat suku bunga bank sentral Amerika (The Fed) tetap rendah, mengapa nilai tukar Rupiah cenderung menguat terhadap Dolar AS?",
                options: [
                    "Melebarnya selisih suku bunga (yield spread) memikat investor global membeli obligasi SBN domestik (Capital Inflow), sehingga permintaan penukaran Dolar ke Rupiah meningkat",
                    "Eksportir domestik secara sukarela menurunkan harga jual barangnya di pasar luar negeri untuk memperbesar pangsa pasar internasional",
                    "Bank sentral Amerika Serikat secara otomatis menarik peredaran mata uang dolarnya dari seluruh negara berkembang",
                    "Importir Indonesia menunda seluruh pembelian bahan baku luar negeri karena biaya valuta asing dipatok tetap oleh pemerintah"
                ],
                correct: 0,
                hint: "Uang global selalu mengalir ke negara yang memberikan imbal hasil (bunga) paling menarik dan aman!",
                debrief: "Jenius! Selisih suku bunga (<em>interest rate differential</em>) menarik aliran modal asing (<span class='econ-jargon' data-term='transmisi_moneter'>Capital Inflow</span>) masuk ke Surat Berharga Negara (SBN). Untuk membeli obligasi ini, investor asing harus menukar Dolar mereka menjadi Rupiah, sehingga permintaan Rupiah melonjak dan <span class='econ-jargon' data-term='kurs_valas'>Nilai Tukar Rupiah</span> tertopang kokoh!"
            }
        ]
    },
    {
        id: 3,
        title: "Stage 3: 🏛️ Gedung Menteri Keuangan",
        subtitle: "Mengelola Uang Pajak, Bansos, Proyek Tol & Disiplin Utang",
        theme: "fiscal",
        unlocks: "Mode Advance: 🧪 Lab Eksperimen Pasar Unlocked!",
        questions: [
            {
                id: "s3_q1",
                scenario: "🏗️ Pembiayaan Infrastruktur & Belanja Modal",
                question: "Pemerintah membiayai pembangunan jalan tol trans dan pelabuhan peti kemas melalui penerbitan obligasi utang (SBN). Mengapa pemerintah tidak menunggu uang pajak terkumpul penuh bertahun-tahun kemudian baru membangun?",
                options: [
                    "Infrastruktur adalah investasi produktif: proyek yang selesai hari ini langsung memangkas biaya logistik nasional dan menumbuhkan PDB lebih cepat daripada beban bunga utangnya",
                    "Karena imbal hasil kupon bunga obligasi negara dibebaskan sepenuhnya dari kewajiban pembayaran pokok utang di masa depan",
                    "Karena penerbitan utang obligasi tidak menimbulkan risiko fiskal apa pun selama dibeli oleh investor institusi perbankan domestik",
                    "Agar defisit anggaran belanja negara selalu berada di atas batas minimal yang disyaratkan oleh lembaga pemeringkat kredit global"
                ],
                correct: 0,
                hint: "Sama seperti kamu meminjam modal untuk beli laptop kerja vs pinjam uang buat dugem: laptop bikin kamu bisa cari uang lebih banyak untuk bayar cicilannya!",
                debrief: "Tepat sekali! Belanja modal infrastruktur memiliki angka pengganda (<span class='econ-jargon' data-term='angka_pengganda'>Multiplier Effect</span>) yang besar. Jalan tol mempercepat distribusi pangan, menarik pabrik baru, menciptakan ribuan lapangan kerja, dan menghasilkan penerimaan pajak baru di masa depan."
            },
            {
                id: "s3_q2",
                scenario: "📜 Landasan Disiplin Fiskal UU No. 17/2003",
                question: "Undang-Undang Keuangan Negara menetapkan batas maksimal defisit APBN sebesar 3,0% dari PDB dan rasio utang maksimal 60% dari PDB. Pertimbangan fundamental apakah yang mendasari aturan ketat ini?",
                options: [
                    "Mencegah akumulasi utang pemerintah yang tidak terkendali (Fiscal Sustainability), menghindari krisis gagal bayar (debt default), dan menjaga kredibilitas peringkat kredit negara",
                    "Menjaga agar penerimaan pajak negara selalu sama persis dengan total pengeluaran belanja rutin kementerian setiap kuartal",
                    "Memastikan bahwa seluruh utang pemerintah hanya boleh dipinjam dari lembaga moneter internasional seperti IMF dan Bank Dunia",
                    "Membatasi wewenang bank sentral dalam menetapkan cadangan devisa dan tingkat suku bunga acuan pasar uang"
                ],
                correct: 0,
                hint: "Aturan ini dibuat agar kas negara tidak sampai bangkrut dan terjebak gagal bayar utang seperti Yunani atau Sri Lanka!",
                debrief: "Keren! Pasca-krisis 1998 di mana utang meledak di atas 90% PDB, Indonesia menetapkan <span class='econ-jargon' data-term='apbn_defisit'>Batas Defisit APBN 3%</span> dan <span class='econ-jargon' data-term='utang_negara'>Batas Utang 60% PDB</span>. Aturan keramat ini membuat Indonesia diakui dunia internasional sebagai negara dengan pengelolaan fiskal paling hati-hati dan berperingkat <em>Investment Grade</em>!"
            },
            {
                id: "s3_q3",
                scenario: "🌊 Stimulus Belanja Proyek Pemerintah",
                question: "Pemerintah mengalokasikan Rp 20 Triliun untuk program infrastruktur padat karya. Dana ini dibayarkan ke pekerja, pekerja membelanjakannya ke warung makan, dan pemilik warung membeli bahan dari petani. Fenomena pelipatgandaan dampak ekonomi ini disebut apa?",
                options: [
                    "Fiscal Spending Multiplier: setiap penambahan belanja otonom pemerintah menghasilkan perputaran pendapatan dan output nasional dengan nilai akhir yang lebih besar",
                    "Acceleration Principle: percepatan tingkat inflasi umum akibat kelebihan uang tunai yang beredar di pasar komoditas sekunder",
                    "Crowding-In Effect: fenomena penurunan suku bunga perbankan secara otomatis setiap kali pemerintah mencairkan anggaran belanja bantuan sosial",
                    "Fiscal Drag: perlambatan pertumbuhan ekonomi riil yang disebabkan oleh peralihan pembayar pajak ke tarif pajak yang lebih tinggi"
                ],
                correct: 0,
                hint: "Riak gelombang air saat kamu melempar batu ke danau: satu lemparan menciptakan gelombang lingkaran yang terus membesar ke pinggir danau!",
                debrief: "Luar biasa! Ini adalah rumus <span class='econ-jargon' data-term='angka_pengganda'>Multiplier Keynesian</span> ($k_G = 1 / (1 - MPC)$). Jika masyarakat gemar membelanjakan pendapatannya, stimulus belanja negara akan terus bergulir dari satu tangan ke tangan lain, melipatgandakan PDB nasional hingga berlipat ganda!"
            },
            {
                id: "s3_q4",
                scenario: "🥊 Penyerapan Likuiditas Domestik oleh Obligasi Negara",
                question: "Ketika pemerintah menerbitkan Surat Berharga Negara (SBN) dalam jumlah terlampau masif dengan imbal hasil (yield) sangat tinggi, sektor perbankan lebih memilih memborong SBN ketimbang menyalurkan kredit ke pengusaha swasta. Konsekuensi makroekonomi dari 'Crowding-Out' ini adalah apa?",
                options: [
                    "Suku bunga pinjaman pasar terdorong naik dan ketersediaan kredit modal kerja menyusut, sehingga investasi sektor swasta terdesak turun",
                    "Tingkat pengangguran nasional menurun drastis karena seluruh pengusaha swasta beralih menjadi pegawai negeri sipil",
                    "Nilai tukar rupiah mengalami depresiasi tajam akibat hilangnya minat investor terhadap aset keuangan berdenominasi rupiah",
                    "Neraca perdagangan internasional secara otomatis mengalami surplus besar karena impor barang modal swasta berhenti"
                ],
                correct: 0,
                hint: "Ibarat tamu berbadan raksasa yang memborong semua makanan di meja prasmanan, tamu-tamu kecil lainnya tidak kebagian jatah!",
                debrief: "Tepat! <span class='econ-jargon' data-term='crowding_out'>Crowding-Out Effect</span> terjadi saat pemerintah terlalu agresif berutang di pasar domestik. Karena obligasi negara bebas risiko (<em>risk-free</em>) berbunga tinggi, perbankan ogah menyalurkan kredit modal kerja ke swasta, memicu kenaikan suku bunga pinjaman pasar dan menekan investasi riil."
            },
            {
                id: "s3_q5",
                scenario: "⛽ Efisiensi Alokasi Anggaran Energi",
                question: "Banyak ekonom teknokrat menyarankan agar subsidi harga bahan bakar minyak (BBM) dialihkan menjadi Bantuan Langsung Tunai (BLT) atau jaminan sosial bersyarat. Apakah kelemahan utama dari subsidi harga komoditas terbuka?",
                options: [
                    "Bersifat regresif dan salah sasaran: kelompok masyarakat mampu yang mengonsumsi BBM dalam volume lebih besar justru menikmati porsi subsidi terbesar",
                    "Menimbulkan deflasi struktural yang mematikan motivasi industri energi domestik untuk memproduksi minyak mentah",
                    "Menyebabkan penerimaan pajak pertambahan nilai (PPN) dari sektor energi melonjak melampaui kapasitas penyerapan APBN",
                    "Mengharuskan bank sentral mencetak uang kartal baru setiap kali harga minyak mentah internasional mengalami kenaikan"
                ],
                correct: 0,
                hint: "Siapa yang paling banyak menghabiskan liter bensin setiap hari: pemilik mobil mewah ber-AC atau pengendara sepeda motor tua?",
                debrief: "Brilian! Subsidi berbasis harga komoditas bersifat regresif (yang kaya beli bensin lebih banyak dapat subsidi lebih besar). Oleh karena itu, reformasi fiskal modern mengarahkan anggaran APBN ke subsidi tepat sasaran (Bansos tunai, beasiswa KIP, dan jaminan kesehatan BPJS) bagi masyarakat berpenghasilan rendah."
            },
            {
                id: "s3_q6",
                scenario: "☔ Mekanisme Penyeimbang Anggaran Saat Resesi",
                question: "Ketika perekonomian mendadak melambat menuju resesi, penerimaan pajak penghasilan otomatis menyusut sementara pencairan bansos dan klaim jaminan kehilangan pekerjaan otomatis meningkat tanpa menunggu persetujuan undang-undang baru dari DPR. Konsep ini dikenal sebagai apa?",
                options: [
                    "Automatic Stabilizers (Penstabil Otomatis): sistem fiskal bawaan yang secara otomatis menyuntikkan daya beli saat resesi dan mengerem saat ekonomi kepanasan",
                    "Discretionary Fiscal Policy: kebijakan fiskal ad-hoc yang sengaja dirancang oleh menteri keuangan untuk mengubah tarif pajak sewaktu-waktu",
                    "Balanced Budget Rule: keharusan konstitusi agar total pengeluaran belanja negara selalu seimbang dengan penerimaan kas setiap bulan",
                    "Seigniorage: keuntungan finansial yang diperoleh pemerintah dari selisih antara nilai nominal uang kertas dengan biaya cetaknya"
                ],
                correct: 0,
                hint: "Seperti airbag di mobil: otomatis mengembang seketika saat terjadi tabrakan tanpa pengemudi harus memencet tombol manual!",
                debrief: "Sempurna! <strong>Automatic Stabilizers</strong> (Peredam Kejut Otomatis) adalah desain APBN cerdas. Sistem ini otomatis menahan kejatuhan ekonomi saat resesi dan otomatis mengerem ekonomi saat terlalu panas (overheating) melalui pajak progresif."
            }
        ]
    },
    {
        id: 4,
        title: "Stage 4: 🚢 Pelabuhan Internasional",
        subtitle: "Menaklukkan Kurs Rupiah, Ekspor Impor & Valuta Asing",
        theme: "foreign_exchange",
        unlocks: "Mode Advance: ⚔️ Boss Krisis Sejarah Unlocked!",
        questions: [
            {
                id: "s4_q1",
                scenario: "💱 Depresiasi Nilai Tukar Rupiah",
                question: "Nilai tukar Rupiah terdepresiasi dari Rp 15.500 menjadi Rp 16.500 per Dolar AS. Sektor usaha manakah di Indonesia yang memperoleh dampak paling positif dari pergerakan kurs ini?",
                options: [
                    "Eksportir komoditas berorientasi global (sawit, kopi, nikel) dan industri pariwisata domestik yang menerima turis mancanegara",
                    "Produsen makanan olahan berbahan baku gandum dan kedelai impor yang menjual produknya di pasar domestik",
                    "BUMN infrastruktur dan korporasi properti yang memiliki pinjaman obligasi valuta asing dalam denominasi Dolar AS tanpa lindung nilai",
                    "Maskapai penerbangan nasional yang menyewa armada pesawat dan membeli bahan bakar avtur menggunakan mata uang Dolar AS"
                ],
                correct: 0,
                hint: "Siapa yang menerima bayaran dalam Dolar dan menukarnya jadi Rupiah yang jumlahnya mendadak berlipat ganda?",
                debrief: "Tepat! Pelemahan <span class='econ-jargon' data-term='kurs_valas'>Nilai Tukar Rupiah</span> adalah pedang bermata dua. Eksportir dan sektor pariwisata diuntungkan karena produk mereka sangat kompetitif dan devisa Dolar yang dibawa pulang bernilai Rupiah lebih tebal. Sebaliknya, importir bahan baku dan pemilik utang valas harus menanggung tagihan yang membengkak!"
            },
            {
                id: "s4_q2",
                scenario: "🌾 Industri Pangan Domestik Berbahan Baku Impor",
                question: "Ketika kurs Dolar AS menguat tajam terhadap Rupiah, harga tahu dan tempe di pasar tradisional ikut melonjak drastis meskipun diproduksi oleh perajin lokal di desa. Mengapa fenomena 'Imported Inflation' ini terjadi?",
                options: [
                    "Sebagian besar pasokan kedelai nasional masih diimpor dari pasar global menggunakan Dolar AS, sehingga pelemahan kurs langsung menggelembungkan ongkos bahan baku lokal",
                    "Biaya sertifikasi halal dan tarif bea masuk impor kedelai secara otomatis dinaikkan oleh kementerian perdagangan saat rupiah melemah",
                    "Perajin lokal lebih memilih mengekspor tempe ke pasar internasional untuk memperoleh pembayaran dalam mata uang Dolar AS",
                    "Bank Indonesia menaikkan suku bunga kredit usaha rakyat (KUR) sehingga biaya sewa tempat usaha perajin tahu meningkat tajam"
                ],
                correct: 0,
                hint: "Pikirkan barang impor yang dibeli menggunakan Dolar AS: jika Dolar mahal, harga bahan baku impor otomatis ikut selangit!",
                debrief: "Benar sekali! Fenomena ini dinamakan <strong>Imported Inflation</strong> (Inflasi Impor). Ketika mata uang domestik terdepresiasi, seluruh barang impor (mulai dari kedelai, gandum, BBM, hingga suku cadang mesin pabrik) menjadi sangat mahal di pasar domestik."
            },
            {
                id: "s4_q3",
                scenario: "💔 Pilihan Kebijakan Makroekonomi Terbuka",
                question: "Berdasarkan Teori Trilema Moneter Mundell-Fleming, suatu negara yang menganut rezim perekonomian terbuka TIDAK BISA meraih tiga sasaran sekaligus. Kombinasi manakah yang dipilih oleh Indonesia saat ini?",
                options: [
                    "Memilih Lalu Lintas Modal Bebas + Kebijakan Moneter Independen; konsekuensinya harus membiarkan Kurs Rupiah bergerak fleksibel mengikuti pasar (Floating Exchange Rate)",
                    "Memilih Kurs Tetap Terpatok Kaku + Lalu Lintas Modal Bebas; konsekuensinya suku bunga BI-Rate wajib mengikuti suku bunga The Fed secara pasif",
                    "Memilih Kurs Tetap Terpatok Kaku + Moneter Independen; konsekuensinya devisa luar negeri dan modal asing wajib dikontrol ketat dan dilarang keluar bebas",
                    "Menolak ketiga sasaran tersebut dan mengadopsi mata uang tunggal kawasan ASEAN untuk mengeliminasi risiko fluktuasi nilai tukar"
                ],
                correct: 0,
                hint: "Ibarat memilih pasangan hidup: Pintar, Kaya, dan Setia — mustahil dapat ketiganya sekaligus, kamu harus merelakan salah satunya!",
                debrief: "Luar biasa! Inilah hukum <span class='econ-jargon' data-term='trilema_mundell_fleming'>Trilema Mundell-Fleming</span>. Indonesia memilih <strong>Arus Devisa Bebas (#1) + Moneter Independen (#3)</strong>. Konsekuensinya, Indonesia harus rela membiarkan nilai tukar Rupiah berfluktuasi bebas mengikuti pasar (<em>floating exchange rate</em>). Mencoba mengunci kurs kaku sambil membiarkan modal asing bebas keluar-masuk adalah penyebab utama jebolnya cadangan devisa di Krisis 1998!"
            },
            {
                id: "s4_q4",
                scenario: "🏦 Kecukupan Cadangan Devisa Bank Sentral",
                question: "Bank Indonesia mempertahankan posisi cadangan devisa di atas $140 Miliar Dolar AS. Dari perspektif ketahanan ekonomi makro, apakah fungsi terpenting dari tumpukan devisa ini?",
                options: [
                    "Sebagai bantalan likuiditas internasional untuk intervensi menstabilkan volatilitas kurs rupiah saat terjadi guncangan pasar global, serta menjamin kelancaran impor vital energi dan pangan",
                    "Untuk membiayai belanja rutin gaji aparatur sipil negara dan subsidi bantuan sosial tanpa membebani defisit APBN pemerintah",
                    "Sebagai modal pinjaman lunak komersial bagi perbankan swasta nasional yang ingin membuka anak usaha di bursa saham luar negeri",
                    "Untuk membeli kembali seluruh saham perusahaan swasta nasional yang dimiliki oleh pemodal dan korporasi multinasional asing"
                ],
                correct: 0,
                hint: "Ibarat stok beras di lumbung darurat keluarga: menjaga kamu tetap bisa makan jika musim paceklik melanda selama berbulan-bulan!",
                debrief: "Tepat! <span class='econ-jargon' data-term='cadangan_devisa'>Cadangan Devisa</span> adalah bantalan stabilitas makro. Standar kecukupan internasional mensyaratkan minimal cukup membiayai 3 bulan impor. Cadangan devisa Indonesia saat ini mencukupi lebih dari 6 bulan impor dan pembayaran utang luar negeri pemerintah."
            },
            {
                id: "s4_q5",
                scenario: "🎢 Efek Lag Penyesuaian Perdagangan Internasional",
                question: "Setelah mata uang terdepresiasi, neraca perdagangan suatu negara seringkali memburuk (defisit membengkak) pada kuartal pertama sebelum akhirnya berbalik surplus beberapa bulan kemudian. Fenomena yang dikenal sebagai 'Kurva-J' ini terjadi karena apa?",
                options: [
                    "Nilai tagihan impor membengkak seketika karena kontrak harga lama, sementara peningkatan volume ekspor membutuhkan waktu penyesuaian produksi dan kontrak baru pembeli luar negeri",
                    "Eksportir domestik sengaja menahan pengiriman barang ke luar negeri untuk menunggu kurs mata uang rupiah terdepresiasi lebih dalam lagi",
                    "Negara mitra dagang utama secara sepihak memberlakukan tarif bea masuk anti-dumping terhadap seluruh komoditas ekspor manufaktur domestik",
                    "Kapasitas kontainer kapal kargo pelabuhan secara fisik berkurang saat nilai tukar mata uang domestik berada di bawah titik keseimbangan jangka panjang"
                ],
                correct: 0,
                hint: "Sama seperti memasang plang diskon di tokomu: pembeli butuh waktu beberapa hari untuk melihat pengumuman diskon dan datang berbelanja!",
                debrief: "Jenius! Fenomena ini dinamakan <span class='econ-jargon' data-term='marshall_lerner'>Kondisi Marshall-Lerner & Kurva-J</span>. Dalam jangka pendek, nilai impor membengkak seketika karena kontrak lama. Namun dalam jangka menengah (setelah penyesuaian volume perdagangan), ekspor melonjak deras dan neraca dagang berbalik surplus membentuk kurva huruf J!"
            },
            {
                id: "s4_q6",
                scenario: "⚠️ Evaluasi Risiko Krisis Finansial 1998",
                question: "Pada periode menjelang Krisis Moneter 1998, banyak korporasi swasta di Indonesia meminjam utang luar negeri dalam Dolar AS berbunga murah untuk mendanai proyek properti domestik yang pendapatannya dalam Rupiah. Mengapa praktek 'Currency Mismatch' tanpa lindung nilai ini berakibat fatal?",
                options: [
                    "Ketika kurs Dolar melonjak tajam, nilai kewajiban utang dalam Rupiah meledak berlipat ganda melebihi total aset dan arus kas perusahaan, memicu kebangkrutan massal",
                    "Lembaga pemeringkat utang internasional secara otomatis menyita seluruh aset tanah dan bangunan milik perusahaan yang berutang valas",
                    "Tingkat bunga pinjaman Dolar secara otomatis dinaikkan oleh bank kreditur luar negeri menjadi 100% per tahun saat terjadi krisis",
                    "Pemerintah diwajibkan oleh konstitusi untuk menanggung seluruh cicilan pokok utang swasta menggunakan dana cadangan devisa negara"
                ],
                correct: 0,
                hint: "Punya tagihan cicilan dalam Dolar Amerika, tapi gaji harian cuma Rupiah!",
                debrief: "Sangat tepat! <span class='econ-jargon' data-term='currency_mismatch'>Currency Mismatch</span> adalah salah satu biang keladi utama kehancuran ekonomi Indonesia saat <span class='econ-jargon' data-term='krismon_1998'>Krisis Moneter 1998</span>. Kurs melonjak dari Rp 2.500 ke Rp 16.000 per USD, membengkakkan utang swasta hingga memicu kebangkrutan massal dan penutupan bank-bank bermasalah."
            }
        ]
    },
    {
        id: 5,
        title: "Stage 5: 🌪️ Badai Krisis Ekonomi",
        subtitle: "Ujian Boss Teknokrat: Menjinakkan Stagflasi, Pandemi & Guncangan Global",
        theme: "crisis",
        unlocks: "Mode Advance: 🏛️ Sidang Kabinet 7 Tuas Simulator Unlocked!",
        questions: [
            {
                id: "s5_q1",
                scenario: "💥 Dilema Guncangan Sisi Penawaran (Supply Shock)",
                question: "Suatu perekonomian mengalami fenomena 'Stagflasi': pertumbuhan ekonomi mandek dan pengangguran meningkat, namun laju inflasi melonjak tinggi akibat guncangan harga minyak dunia. Mengapa kebijakan moneter konvensional mengalami dilema serba salah dalam kondisi ini?",
                options: [
                    "Menaikkan suku bunga untuk meredam inflasi akan memperparah resesi dan memicu PHK; sedangkan menurunkan bunga untuk memacu pertumbuhan akan membuat inflasi meledak lebih liar",
                    "Bank sentral kehilangan instrumen moneter karena kurva IS dan kurva LM bergeser secara paralel ke arah luar grafik keseimbangan makro",
                    "Pemerintah dilarang menerbitkan surat utang negara saat inflasi dan pengangguran berada di atas target sasaran tahunan",
                    "Menurunkan suku bunga akan memicu apresiasi nilai tukar mata uang domestik yang mematikan kinerja ekspor manufaktur secara serempak"
                ],
                correct: 0,
                hint: "Ibarat pasien demam tinggi sekaligus diare parah: dikasih obat penurun panas memperparah diare, dikasih obat diare menaikkan demam!",
                debrief: "Brilian! Inilah horor dari <span class='econ-jargon' data-term='stagflasi'>Stagflasi</span>. Kebijakan moneter murni tidak bisa menyelesaikan masalah ini sendirian. Pemerintah harus turun tangan dengan kebijakan sisi penawaran (<em>Supply-Side Policies</em>): memotong biaya logistik, memangkas friksi birokrasi, dan subsidi pupuk/energi terarah."
            },
            {
                id: "s5_q2",
                scenario: "🌾 Bencana Kekeringan El Nino & Pasokan Beras",
                question: "Bencana kekeringan panjang menyebabkan gagal panen padi nasional dan memicu lonjakan inflasi harga beras (Volatile Food). Mengapa menaikkan suku bunga BI-Rate secara agresif dinilai sebagai respon kebijakan yang KURANG TEPAT untuk masalah ini?",
                options: [
                    "Karena kenaikan harga dipicu oleh kelangkaan fisik pasokan (Supply Shock); menaikkan bunga bank menekan daya beli masyarakat tanpa mampu menambah kuantitas panen padi di pasar",
                    "Karena kenaikan suku bunga bank sentral hanya berdampak pada komoditas impor dan tidak memiliki pengaruh terhadap harga pangan domestik",
                    "Karena petani padi di pedesaan diwajibkan oleh undang-undang untuk menjual seluruh hasil panennya langsung kepada Perum Bulog",
                    "Karena kebijakan suku bunga moneter hanya efektif digunakan jika neraca pembayaran internasional mengalami defisit transaksi modal"
                ],
                correct: 0,
                hint: "Jangan obati kekurangan barang fisik (supply shock) dengan obat perbankan (moneter)!",
                debrief: "Tepat sekali! Kenaikan harga akibat kelangkaan fisik pangan adalah guncangan penawaran (<em>supply shock</em>). Menaikkan bunga hanya akan menekan daya beli masyarakat miskin tanpa menambah sebutir beras pun di pasar. Solusi teknokratik yang benar adalah penguatan cadangan pangan pemerintah dan kelancaran jalur logistik."
            },
            {
                id: "s5_q3",
                scenario: "🦠 Kedaruratan Luar Biasa Pandemi Covid-19",
                question: "Pada masa pandemi Covid-19 tahun 2020, pemerintah dan DPR mengesahkan payung hukum darurat yang memperbolehkan defisit APBN melampaui batas legal 3,0% PDB selama 3 tahun. Apakah rasionalitas kebijakan di balik langkah luar biasa ini?",
                options: [
                    "Merupakan kebijakan fiskal darurat (counter-cyclical) untuk mendanai penyelamatan nyawa rakyat (kesehatan, bansos masif) dan mencegah kebangkrutan massal dunia usaha saat ekonomi terhenti",
                    "Karena seluruh utang baru yang diterbitkan selama masa pandemi mendapatkan pembebasan bunga pinjaman dari bank sentral secara permanen",
                    "Agar pemerintah dapat meminjam dana darurat dari pasar modal luar negeri tanpa kewajiban melaporkan posisi utang kepada parlemen",
                    "Karena penerimaan pajak negara mengalami surplus besar yang membutuhkan mekanisme belanja darurat untuk menjaga likuiditas pasar"
                ],
                correct: 0,
                hint: "Ibarat ambulans yang boleh menerobos lampu merah saat membawa pasien sekarat ke rumah sakit!",
                debrief: "Luar biasa! Pada kondisi krisis eksistensial, fleksibilitas fiskal sangat krusial. Melalui UU No. 2/2020, defisit diperbolehkan melebar darurat hingga 6% demi mendanai vaksin gratis, bansos sembako, dan insentif UMKM. Setelah krisis mereda di tahun 2023, Indonesia dengan disiplin berhasil mengembalikan defisit di bawah 3% lebih cepat dari target!"
            },
            {
                id: "s5_q4",
                scenario: "📉 Batasan Stimulus Moneter & Pengangguran",
                question: "Pemerintah berencana menekan angka pengangguran mendekati 0% dengan terus-menerus menggelontorkan stimulus moneter dan mencetak uang baru. Mengapa teori ekonomi makro modern (Hipotesis NAIRU) membuktikan rencana ini akan gagal dalam jangka panjang?",
                options: [
                    "Dalam jangka panjang ekspektasi pekerja beradaptasi terhadap inflasi dan menuntut kenaikan upah sepadan; kurva Phillips menjadi vertikal sehingga pengangguran kembali ke tingkat alamiah (NAIRU) dengan inflasi yang membumbung tinggi",
                    "Karena perusahaan manufaktur secara fisik tidak mampu mempekerjakan tenaga kerja melebihi kapasitas jam kerja mesin pabrik yang tersedia",
                    "Karena penurunan tingkat pengangguran hingga nol persen secara otomatis akan menghentikan seluruh perputaran uang kartal di masyarakat",
                    "Karena tingkat upah nominal di sektor swasta dipatok secara kaku oleh kontrak kerja internasional yang tidak dapat dinegosiasikan"
                ],
                correct: 0,
                hint: "Kamu tidak bisa menipu pasar selamanya hanya dengan mencetak inflasi!",
                debrief: "Sempurna! Konsep <span class='econ-jargon' data-term='kurva_phillips'>Kurva Phillips</span> menunjukkan bahwa trade-off antara inflasi dan pengangguran hanya ada dalam jangka pendek. Dalam jangka panjang, ekspektasi pekerja beradaptasi penuh sehingga kurva Phillips menjadi vertikal pada <span class='econ-jargon' data-term='nairu'>NAIRU</span> (~5% di Indonesia)."
            },
            {
                id: "s5_q5",
                scenario: "💎 Manajemen Rezeki Nomplok (Windfall Profit Komoditas)",
                question: "Ketika harga batu bara dan minyak sawit global melonjak tinggi, devisa ekspor mengalir deras ke Indonesia. Mengapa teknokrat ekonomi sangat mewaspadai bahaya 'Dutch Disease' (Penyakit Belanda) di saat booming komoditas?",
                options: [
                    "Derasnya aliran devisa mengapresiasi nilai tukar mata uang domestik secara tajam, yang melemahkan daya saing harga sektor industri manufaktur dan pertanian lokal, sehingga ekonomi menjadi kecanduan bahan mentah",
                    "Karena kenaikan harga komoditas tambang global secara otomatis menurunkan penerimaan royalti dan pajak penghasilan badan di sektor energi",
                    "Karena tingginya harga komoditas primer memaksa perbankan menaikkan suku bunga kredit perumahan rakyat (KPR) secara tajam",
                    "Karena ledakan ekspor komoditas secara otomatis memicu defisit neraca pembayaran internasional akibat pelarian modal spekulatif jangka pendek"
                ],
                correct: 0,
                hint: "Ibarat orang yang mendadak menang undian miliaran rupiah lalu malas bekerja dan hidup boros, hingga saat uangnya habis ia tidak punya keahlian apa pun!",
                debrief: "Jenius! <em>Dutch Disease</em> adalah sindrom ketergantungan komoditas mentah. Obat penawarnya adalah kebijakan **Hilirisasi Industri** (mengolah bijih nikel menjadi baterai dan baja di dalam negeri) serta mengalokasikan rezeki nomplok ke Sovereign Wealth Fund / Danantara untuk investasi jangka panjang."
            },
            {
                id: "s5_q6",
                scenario: "👑 Mandat Dewan Ekonomi Nasional",
                question: "Di ruang sidang kabinet, instrumen kebijakan moneter Bank Indonesia dan instrumen fiskal Kementerian Keuangan diramu secara terkoordinasi (Policy Mix). Apakah sasaran pamungkas dari bauran kebijakan makroekonomi yang sehat bagi suatu bangsa?",
                options: [
                    "Mencapai pertumbuhan PDB riil optimal yang inklusif, stabilitas harga dengan inflasi rendah terjangkau, penciptaan lapangan kerja produktif, serta kesinambungan fiskal dan eksternal jangka panjang",
                    "Memastikan bahwa penerimaan pajak negara selalu melampaui total belanja APBN agar kas pemerintah selalu mencatatkan surplus anggaran absolut",
                    "Mempertahankan nilai tukar mata uang domestik pada level setinggi-tingginya terhadap seluruh mata uang negara mitra dagang",
                    "Memaksimalkan cadangan devisa bank sentral dengan cara melarang seluruh kegiatan impor barang modal dan barang konsumsi dari luar negeri"
                ],
                correct: 0,
                hint: "Pertumbuhan yang dinikmati rakyat banyak, harga kebutuhan pokok terjangkau, dan keuangan negara tetap sehat jangka panjang!",
                debrief: "Selamat Yang Mulia Teknokrat! Anda telah menuntaskan seluruh stage Trivia Quest! Pemahaman makroekonomi Anda kini telah matang. Seluruh simulator tingkat lanjut (Sidang Kabinet 7 Tuas, Krisis Sejarah, dan Lab Eksperimen) kini TERBUKA PENUH untuk Anda kuasai!"
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
        
        // Unlocked stages & advance features
        this.unlockedStageIds = [1];
        this.advanceUnlocked = {
            econGames: false,
            scenarios: false,
            cockpit: false
        };

        // Acak posisi pilihan jawaban untuk semua stage agar jawaban benar tidak selalu di 'A'
        this.stages.forEach(stage => this.shuffleAllStageQuestions(stage));

        this.loadProgress();
    }

    shuffleQuestion(q) {
        if (!q || !q.options) return;
        const indexed = q.options.map((optText, idx) => ({
            text: optText,
            isCorrect: idx === q.correct
        }));
        // Algoritma Fisher-Yates Shuffle
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
                this.score = data.score || 0;
                this.unlockedStageIds = data.unlockedStageIds || [1];
                this.advanceUnlocked = data.advanceUnlocked || { econGames: false, scenarios: false, cockpit: false };
                this.currentStageId = data.currentStageId || 1;
            }
        } catch (e) {}
    }

    saveProgress() {
        try {
            const data = {
                score: this.score,
                unlockedStageIds: this.unlockedStageIds,
                advanceUnlocked: this.advanceUnlocked,
                currentStageId: this.currentStageId
            };
            localStorage.setItem('macromaster_trivia_progress', JSON.stringify(data));
        } catch (e) {}
    }

    getCurrentStage() {
        return this.stages.find(s => s.id === this.currentStageId) || this.stages[0];
    }

    getCurrentQuestion() {
        const stage = this.getCurrentStage();
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
        if (!this.unlockedStageIds.includes(stageId)) return false;
        this.currentStageId = stageId;
        this.currentQuestionIdx = 0;
        this.lives = this.maxLives;
        this.combo = 0;
        this.isAnswered = false;
        this.shieldActive = false;
        this.eliminatedOptions = [];
        this.shuffleAllStageQuestions(this.getCurrentStage());
        this.saveProgress();
        return true;
    }

    answerQuestion(chosenIdx) {
        if (this.isAnswered) return null;
        this.isAnswered = true;

        const q = this.getCurrentQuestion();
        const isCorrect = chosenIdx === q.correct;

        if (isCorrect) {
            this.combo++;
            if (this.combo > this.maxCombo) this.maxCombo = this.combo;
            const points = 100 + (this.combo * 20);
            this.score += points;
        } else {
            if (this.shieldActive) {
                // Shield saves life
                this.shieldActive = false;
            } else {
                this.lives--;
                this.combo = 0;
            }
        }

        const isStageFinished = this.isStageComplete();
        if (isStageFinished && this.lives > 0) {
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
            isStageFinished: isStageFinished
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
        const nextStageId = this.currentStageId + 1;
        if (nextStageId <= this.stages.length && !this.unlockedStageIds.includes(nextStageId)) {
            this.unlockedStageIds.push(nextStageId);
        }

        // Unlocks for Advance Modes
        if (this.currentStageId >= 3) {
            this.advanceUnlocked.econGames = true;
        }
        if (this.currentStageId >= 4) {
            this.advanceUnlocked.scenarios = true;
        }
        if (this.currentStageId >= 5) {
            this.advanceUnlocked.cockpit = true;
        }

        this.saveProgress();
    }

    restartStage() {
        this.currentQuestionIdx = 0;
        this.lives = this.maxLives;
        this.combo = 0;
        this.isAnswered = false;
        this.shieldActive = false;
        this.eliminatedOptions = [];
        this.shuffleAllStageQuestions(this.getCurrentStage());
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
        // Shuffle wrong indices and pick 2
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
