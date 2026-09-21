/**
 * DIVETOMAKRO - 5 LEVELS x 36 QUESTIONS = 180 QUESTIONS TOTAL
 * Random 6 questions per session with min 80% passing grade requirement.
 */

const MACRO_TRIVIA_STAGES = [
    {
        "id": 1,
        "title": "Level 01: Dasar Pasar & Uang",
        "subtitle": "Uang Kartal, Inflasi Belanja Harian, dan Daya Beli Rumah Tangga",
        "theme": "market",
        "unlocks": "Gelar: Pahlawan Belanja Cerdas",
        "questionPool": [
            {
                "id": "s1_q1",
                "theoryKey": "demand_pull_inflation",
                "theoryTitle": "Inflasi Tarikan Permintaan (Demand-Pull)",
                "scenario": "🏪 Bu Tejo di Pasar Tradisional",
                "question": "Menjelang hari raya, harga cabai, beras, dan daging sapi serempak naik tajam di berbagai pasar. Dari kacamata ekonomi makro, mekanisme utama apakah yang memicu kenaikan harga tersebut?",
                "options": [
                    "Kenaikan suku bunga perbankan yang menaikkan beban pembiayaan modal kerja pedagang",
                    "Lonjakan serentak konsumsi musiman yang melampaui kapasitas produksi pangan jangka pendek",
                    "Penyusutan nilai tukar rupiah yang seketika melipatgandakan seluruh biaya panen domestik",
                    "Penurunan tarif pajak pertambahan nilai yang mendorong produsen menaikkan margin laba"
                ],
                "correct": 1,
                "hint": "Pikirkan pergeseran kurva permintaan agregat ke kanan saat panen biologis membutuhkan waktu untuk bertambah!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Fenomena ini adalah <em>Demand-Pull Inflation</em>. Menjelang hari raya, pencairan THR dan tradisi perayaan memicu lonjakan belanja agregat secara drastis, sementara penawaran pangan bersifat inelastis dalam jangka pendek sehingga harga ekuilibrium terdorong ke atas.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kenaikan suku bunga justru bersifat kontraktif untuk meredam permintaan, bukan pemicu lonjakan harga musiman.</li><li><strong>Opsi C:</strong> Pelemahan kurs berdampak langsung pada barang impor (<em>imported inflation</em>), bukan penyebab utama komoditas pangan lokal yang pasokannya murni domestik.</li><li><strong>Opsi D:</strong> Penurunan tarif PPN secara teoritis menurunkan harga jual akhir konsumen, bukan menaikkannya.</li></ul></div>"
            },
            {
                "id": "s1_q2",
                "theoryKey": "teori_kuantitas_uang",
                "theoryTitle": "Teori Kuantitas Uang (M x V = P x Y)",
                "scenario": "💸 Kebijakan Moneter & Kapasitas Riil",
                "question": "Mengapa bank sentral tidak boleh mencetak uang kartal dalam jumlah berlipat ganda untuk melunasi seluruh utang negara dan dibagikan secara gratis kepada warga?",
                "options": [
                    "Penambahan uang secara otomatis menaikkan suku bunga riil sehingga mematikan investasi",
                    "Pencetakan uang tunai memicu apresiasi nilai tukar nominal yang merugikan ekspor manufaktur",
                    "Uang adalah alat tukar; menambah likuiditas tanpa output riil hanya melahirkan hiperinflasi",
                    "Ekspansi uang tunai baru akan diserap cadangan devisa sehingga likuiditas perbankan kering"
                ],
                "correct": 2,
                "hint": "Kekayaan riil diukur dari output barang fisik (Y), bukan dari jumlah lembaran uang nominal (M)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Sesuai Teori Kuantitas Fisher (<em>M × V = P × Y</em>), jika perputaran uang (V) dan output riil (Y) konstan, pencetakan uang (M) hanya akan menaikkan tingkat harga (P) secara proporsional, menghancurkan daya beli masyarakat melalui hiperinflasi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Penambahan uang dalam jumlah masif justru menurunkan suku bunga nominal perbankan jangka pendek (<em>liquidity effect</em>), bukan menaikkannya.</li><li><strong>Opsi B:</strong> Kelebihan pasokan mata uang domestik menyebabkan depresiasi (pelemahan) nilai tukar rupiah, bukan apresiasi.</li><li><strong>Opsi D:</strong> Cadangan devisa mencatat aset valuta asing, tidak menyerap uang kartal rupiah yang dicetak ke masyarakat.</li></ul></div>"
            },
            {
                "id": "s1_q3",
                "theoryKey": "cost_push_inflation",
                "theoryTitle": "Inflasi Dorongan Biaya (Cost-Push)",
                "scenario": "⛽ Kenaikan BBM Bersubsidi",
                "question": "Ketika pemerintah menaikkan harga solar dan bensin subsidi, tarif angkutan umum dan harga sembako di warung-warung langsung terkerek naik. Fenomena inflasi ini dikategorikan sebagai:",
                "options": [
                    "Demand-Pull Inflation, akibat peningkatan kuantitas konsumsi bensin oleh seluruh warga",
                    "Cost-Push Inflation, karena kenaikan biaya input energi menggeser kurva penawaran ke kiri",
                    "Built-in Inflation, akibat ekspektasi kenaikan upah pekerja yang dinegosiasikan berkala",
                    "Core Inflation, karena mencerminkan tekanan fundamental penawaran uang jangka panjang"
                ],
                "correct": 1,
                "hint": "Guncangan berasal dari sisi ongkos produksi dan transportasi barang, bukan keinginan belanja masyarakat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Ini adalah <em>Cost-Push Inflation</em>. Bahan bakar minyak merupakan input intermediasi vital dalam logistik dan produksi pangan. Kenaikan harga BBM menaikkan biaya marjinal seluruh produsen, menggeser kurva penawaran agregat (AS) ke kiri atas.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kenaikan harga bensin menurunkan daya beli dan volume konsumsi riil, bukan lonjakan permintaan agregat.</li><li><strong>Opsi C:</strong> <em>Built-in inflation</em> (spiral upah-harga) adalah dampak lanjutan ketika pekerja menuntut upah lebih tinggi menyusul inflasi yang sudah terjadi.</li><li><strong>Opsi D:</strong> Kenaikan harga BBM subsidi diklasifikasikan sebagai <em>Administered Prices</em>, bukan inflasi inti (<em>core inflation</em>).</li></ul></div>"
            },
            {
                "id": "s1_q4",
                "theoryKey": "pdb_riil",
                "theoryTitle": "PDB Riil vs Nominal & Deflator",
                "scenario": "📊 Mengukur PDB Riil vs Nominal",
                "question": "Jika Produk Domestik Bruto (PDB) nominal suatu negara naik 10% dalam setahun, tetapi inflasi pada tahun yang sama mencapai 8%, berapakah taksiran pertumbuhan PDB riil negara tersebut?",
                "options": [
                    "Sekitar 18%, karena pertumbuhan ekonomi dihitung dari akumulasi output nominal dan inflasi",
                    "Tetap 10%, karena PDB secara metodologis hanya mencatat volume fisik komoditas primer",
                    "Sekitar 2%, karena pertumbuhan riil mendiskon faktor inflasi dari kenaikan nilai nominal",
                    "Sekitar 1,25%, yang diperoleh dari rasio bagi langsung pertumbuhan nominal terhadap inflasi"
                ],
                "correct": 2,
                "hint": "Kurangkan laju kenaikan harga dari pertumbuhan nilai berlaku untuk memperoleh pertumbuhan fisik murni!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pertumbuhan riil meniadakan ilusi harga. Berdasarkan formula deflator PDB aproksimasi: <em>Pertumbuhan PDB Riil ≈ Pertumbuhan PDB Nominal - Laju Inflasi</em> = 10% - 8% = 2%. Kapasitas produksi fisik barang dan jasa sebenarnya hanya bertumbuh 2%.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menjumlahkan nominal dan inflasi adalah kekeliruan fatal yang menggandakan dampak kenaikan harga.</li><li><strong>Opsi B:</strong> PDB nominal dihitung atas dasar harga berlaku, sehingga sangat dipengaruhi oleh inflasi harga.</li><li><strong>Opsi D:</strong> Hubungan antara PDB nominal, deflator, dan riil adalah rasio indeks (1,10 / 1,08 ≈ 1,0185 atau +1,85% ≈ 2%), bukan pembagian persentase mentah (10 / 8 = 1,25).</li></ul></div>"
            },
            {
                "id": "s1_q5",
                "theoryKey": "keseimbangan_ad_as",
                "theoryTitle": "Komponen Investasi (I) & Agregat Demand",
                "scenario": "🛍️ Komponen Formula PDB Nasional",
                "question": "Dalam persamaan identitas Produk Domestik Bruto pendekatan pengeluaran: Y = C + I + G + (X - M), komponen apakah yang mencerminkan belanja mesin pabrik baru dan pembangunan gudang oleh dunia usaha?",
                "options": [
                    "Konsumsi Rumah Tangga (C), karena bangunan dibeli menggunakan kas internal korporasi",
                    "Pengeluaran Pemerintah (G), karena pembangunan industri mendapat fasilitasi izin kementerian",
                    "Ekspor Neto (X - M), karena mesin pabrik modern sebagian besar didatangkan dari luar negeri",
                    "Investasi Swasta (I), yaitu Pembentukan Modal Tetap Bruto untuk memperluas kapasitas fisik"
                ],
                "correct": 3,
                "hint": "Belanja barang modal tahan lama untuk proses produksi masa depan digolongkan dalam Pembentukan Modal Tetap Bruto!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Komponen <em>I (Investasi)</em> dalam PDB mencakup Pembentukan Modal Tetap Bruto (PMTB) dan perubahan inventori, seperti mesin manufaktur, alat angkut niaga, dan gedung pabrik yang meningkatkan kapasitas produksi riil jangka panjang.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Konsumsi Rumah Tangga (C) hanya mencatat belanja barang dan jasa akhir oleh rumah tangga perorangan.</li><li><strong>Opsi B:</strong> Pengeluaran Pemerintah (G) hanya mencakup belanja modal dan barang yang bersumber langsung dari APBN/APBD.</li><li><strong>Opsi C:</strong> Jika mesin diimpor, nilai impor (M) mencatat pengurang PDB, namun komponen belanja mesinnya tetap dicatat di pos Investasi (I).</li></ul></div>"
            },
            {
                "id": "s1_q6",
                "theoryKey": "mpc_konsumsi",
                "theoryTitle": "Marginal Propensity to Consume (MPC)",
                "scenario": "🛒 Tulang Punggung Ekonomi Indonesia",
                "question": "Secara struktur statistik, lebih dari 53% Produk Domestik Bruto Indonesia disokong oleh Konsumsi Rumah Tangga (C). Mengapa menjaga daya beli masyarakat kelas menengah-bawah menjadi prioritas tertinggi teknokrat makro?",
                "options": [
                    "Kelompok bawah memegang porsi terbesar portofolio instrumen Surat Berharga Negara",
                    "Belanja kelompok bawah memicu surplus neraca perdagangan melalui ekspor komoditas primer",
                    "Kelompok bawah memiliki elastisitas konsumsi inelastis sehingga belanja mereka tidak pernah turun",
                    "Kelompok bawah memiliki Marginal Propensity to Consume sangat tinggi mendekati angka satu"
                ],
                "correct": 3,
                "hint": "Orang dengan pendapatan terbatas membelanjakan hampir 100% uang yang mereka terima untuk kebutuhan pokok!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Masyarakat berpendapatan rendah memiliki <em>Marginal Propensity to Consume (MPC)</em> sangat tinggi (mendekati 1,0). Setiap tambahan pendapatan atau bantalan harga pokok akan langsung dibelanjakan kembali ke perputaran ekonomi sektor riil.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pembeli utama SBN adalah investor institusi (dana pensiun, perbankan, asuransi) dan segmen masyarakat menengah-atas.</li><li><strong>Opsi B:</strong> Belanja konsumsi harian masyarakat bawah menggerakkan pasar domestik, bukan komoditas ekspor mentah.</li><li><strong>Opsi C:</strong> Belanja masyarakat bawah sangat rentan tergerus inflasi; kenaikan harga beras langsung memotong konsumsi gizi lainnya.</li></ul></div>"
            },
            {
                "id": "s1_q7",
                "theoryKey": "multiplier_effect",
                "theoryTitle": "Angka Pengganda (Multiplier Effect)",
                "scenario": "💰 Marginal Propensity to Consume (MPC)",
                "question": "Jika seseorang menerima kenaikan upah sebesar Rp 1.000.000 dan memutuskan untuk membelanjakan Rp 800.000 serta menabung Rp 200.000, berapakah nilai Marginal Propensity to Consume (MPC)-nya?",
                "options": [
                    "1,25, yaitu rasio perbandingan antara belanja konsumsi terhadap sisa dana tabungan di bank",
                    "0,20, karena tabungan merupakan proporsi cadangan likuid yang paling diprioritaskan",
                    "0,80, yang menunjukkan 80% dari setiap unit tambahan pendapatan dialokasikan untuk konsumsi",
                    "4,00, yang merupakan estimasi perputaran uang di sektor perdagangan eceran tradisional"
                ],
                "correct": 2,
                "hint": "Bagi tambahan belanja konsumsi (ΔC) dengan tambahan pendapatan total (ΔY)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>MPC = ΔC / ΔY</em> = Rp 800.000 / Rp 1.000.000 = 0,80 (atau 80%). Artinya, 80 sen dari setiap satu rupiah tambahan pendapatan dikonsumsi, sedangkan 20 sen sisanya ditabung (MPS = 0,20).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Angka 1,25 adalah rasio C terhadap S (800/200), bukan proporsi terhadap tambahan pendapatan total.</li><li><strong>Opsi B:</strong> Angka 0,20 adalah nilai <em>Marginal Propensity to Save (MPS)</em>, bukan MPC.</li><li><strong>Opsi D:</strong> Angka 4,00 tidak relevan; angka pengganda pengeluaran Keynesian dari MPC 0,8 adalah <em>1 / (1 - 0,8) = 5,0</em>.</li></ul></div>"
            },
            {
                "id": "s1_q8",
                "theoryKey": "output_potensial",
                "theoryTitle": "Output Potensial & Batas Kapasitas Perekonomian",
                "scenario": "🏭 Batas Kapasitas Produksi Nasional (Y*)",
                "question": "Apa yang terjadi pada perekonomian jika permintaan agregat (AD) terus dipacu melampaui kapasitas produksi potensial nasional (Y*) saat pabrik-pabrik sudah beroperasi 100% dan pekerja sudah lembur penuh?",
                "options": [
                    "Perekonomian mengalami deflasi karena melimpahnya pasokan barang hasil lembur pabrik",
                    "Nilai tukar rupiah terapresiasi permanen akibat penurunan permintaan barang impor modal",
                    "Ekonomi mengalami overheating di mana kelebihan permintaan murni berubah menjadi inflasi",
                    "Suku bunga pasar uang otomatis jatuh ke nol persen akibat surplus likuiditas perbankan"
                ],
                "correct": 2,
                "hint": "Ketika pabrik dan tenaga kerja sudah mencapai batas maksimum (Y*), kurva penawaran menjadi vertikal!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Saat ekonomi beroperasi melampaui <em>Output Potensial (Y*)</em>, kurva AS menjadi tegak lurus (vertikal). Pabrik tidak dapat lagi menambah output fisik, sehingga setiap dorongan stimulus moneter/fiskal hanya memicu kenaikan harga murni (<em>overheating</em>).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Deflasi terjadi saat terjadi resesi/kelebihan pasokan, bukan saat ekonomi kelebihan permintaan.</li><li><strong>Opsi B:</strong> Overheating justru mendorong impor barang konsumsi melonjak, menekan defisit transaksi berjalan dan melemahkan kurs.</li><li><strong>Opsi D:</strong> Bank sentral akan merespons overheating dengan menaikkan suku bunga acuan untuk mengetatkan likuiditas.</li></ul></div>"
            },
            {
                "id": "s1_q9",
                "theoryKey": "keseimbangan_ad_as",
                "theoryTitle": "Guncangan Penawaran Positif (Positive Supply Shock)",
                "scenario": "🌾 Panen Raya & Penurunan Harga Pangan",
                "question": "Saat panen raya serentak di Jawa dan Sulawesi, harga gabah dan beras di tingkat petani anjlok tajam. Dari analisis kurva AD-AS, pergeseran apakah yang sedang terjadi?",
                "options": [
                    "Kurva Penawaran Agregat Jangka Pendek (SRAS) bergeser ke kanan, menurunkan harga pasar",
                    "Kurva Permintaan Agregat (AD) bergeser ke kiri tajam karena masyarakat menahan konsumsi",
                    "Kurva Biaya Marjinal Pertanian bergeser ke kiri atas akibat bertambahnya upah buruh panen",
                    "Kurva Likuiditas Moneter (LM) bergeser ke kiri akibat penurunan permintaan kredit perbankan"
                ],
                "correct": 0,
                "hint": "Panen raya menambah ketersediaan pasokan fisik di pasar pada tingkat harga yang lebih rendah!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Panen raya adalah <em>Positive Supply Shock</em>. Kurva Penawaran Agregat Jangka Pendek (SRAS) bergeser ke kanan, meningkatkan ketersediaan kuantitas pangan fisik dan menurunkan tingkat harga keseimbangan pasar.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Permintaan beras masyarakat stabil; pergeseran terjadi di sisi penawaran gabah, bukan penurunan selera makan.</li><li><strong>Opsi C:</strong> Pergeseran kurva biaya ke kiri atas menunjukkan kenaikan biaya marjinal (kontraksi penawaran), kebalikan dari panen raya.</li><li><strong>Opsi D:</strong> Kurva LM mencatat keseimbangan pasar uang riil, tidak bergeser langsung akibat siklus panen musiman.</li></ul></div>"
            },
            {
                "id": "s1_q10",
                "theoryKey": "distorsi_pasar",
                "theoryTitle": "Distorsi Pasar & Spekulasi Penimbunan",
                "scenario": "📦 Penimbunan Barang & Distorsi Pasar",
                "question": "Di tengah isu kelangkaan minyak goreng, sebagian pedagang besar menahan stok di gudang demi menjualnya dengan harga dua kali lipat pekan depan. Mengapa tindakan spekulasi ini merusak mekanisme pasar makro?",
                "options": [
                    "Menahan pasokan secara artifisial menggeser penawaran ke kiri dan memicu kepanikan harga",
                    "Penimbunan komoditas pangan secara otomatis meningkatkan penerimaan pajak pertambahan nilai",
                    "Penyimpanan barang di gudang mempercepat depresiasi nilai tukar nominal mata uang rupiah",
                    "Spekulasi pedagang secara sepihak membatasi akses perbankan dalam menyalurkan kredit UMKM"
                ],
                "correct": 0,
                "hint": "Menyembunyikan pasokan fisik menciptakan kelangkaan buatan di pasar yang menaikkan harga keseimbangan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Penimbunan barang menahan aliran pasokan beredar, menggeser kurva penawaran riil di pasar ke kiri (kelangkaan semu). Hal ini melambungkan harga ekuilibrium dan memicu kepanikan belanja (<em>panic buying</em>) yang merugikan konsumen.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Penimbunan justru mengurangi volume transaksi legal di pasar resmi sehingga penerimaan pajak terdisrupsi.</li><li><strong>Opsi C:</strong> Penimbunan komoditas domestik tidak berdampak langsung pada nilai tukar nominal mata uang asing.</li><li><strong>Opsi D:</strong> Penimbunan stok fisik pedagang tidak terkait langsung dengan kapasitas penyaluran kredit perbankan nasional.</li></ul></div>"
            },
            {
                "id": "s1_q11",
                "theoryKey": "inflasi_ihk",
                "theoryTitle": "Komponen Inflasi Inti (Core Inflation)",
                "scenario": "🎯 Analisis Komponen Inflasi IHK",
                "question": "Bank Indonesia membagi inflasi IHK menjadi Inflasi Inti (Core), Inflasi Harga Diatur (Administered), dan Inflasi Bergejolak (Volatile). Manakah komponen yang mencerminkan murni tren fundamental permintaan-penawaran jangka panjang tanpa gangguan cuaca?",
                "options": [
                    "Volatile Foods, karena harga cabai dan bawang mencerminkan transaksi tunai harian rakyat",
                    "Administered Prices, karena tarif listrik dan bensin ditetapkan langsung oleh menteri terkait",
                    "Core Inflation, karena mengecualikan komoditas bergejolak dan harga yang diatur pemerintah",
                    "Headline Inflation, karena mencakup seluruh bobot keranjang komoditas survei biaya hidup"
                ],
                "correct": 2,
                "hint": "Keluarkan komponen makanan yang rentan cuaca dan energi bersubsidi untuk melihat tren inflasi mendasar!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Inflasi Inti (Core Inflation)</em> mengukur pergerakan harga persisten dengan mengeluarkan komoditas yang rentan guncangan cuaca (makanan bergejolak) dan tarif yang diatur pemerintah (BBM/listrik), sehingga menjadi acuan utama kebijakan moneter BI.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> <em>Volatile Foods</em> sangat dipengaruhi faktor cuaca, musim tanam, dan rantai pasok jangka pendek.</li><li><strong>Opsi B:</strong> <em>Administered Prices</em> mencerminkan kebijakan diskresioner subsidi fiskal pemerintah, bukan mekanisme pasar bebas murni.</li><li><strong>Opsi D:</strong> <em>Headline Inflation</em> adalah angka gabungan umum yang masih memuat kebisingan (<em>noise</em>) musiman.</li></ul></div>"
            },
            {
                "id": "s1_q12",
                "theoryKey": "efek_substitusi",
                "theoryTitle": "Efek Substitusi & Perilaku Konsumen",
                "scenario": "🥩 Pilihan Menu Protein Keluarga",
                "question": "Ketika harga daging sapi melonjak drastis, ibu rumah tangga beralih membeli daging ayam, ikan lele, dan telur sebagai lauk keluarga. Dalam ekonomi makro, perilaku ini mencerminkan:",
                "options": [
                    "Efek Pendapatan Murni, di mana daya beli riil melonjak akibat kenaikan harga daging sapi",
                    "Efek Substitusi, konsumen mengganti barang yang relatif mahal dengan komoditas pengganti",
                    "Paradoks Giffen, di mana permintaan daging sapi justru bertambah saat harganya meroket",
                    "Ilusi Moneter, konsumen salah mengira nominal uang belanja berkurang padahal harga stabil"
                ],
                "correct": 1,
                "hint": "Konsumen mencari alternatif barang sejenis yang harganya relatif lebih terjangkau!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Efek Substitusi (Substitution Effect)</em> terjadi ketika kenaikan harga relatif suatu barang mendorong konsumen beralih ke barang alternatif yang fungsinya sejenis (daging ayam/telur sebagai substitusi sumber protein sapi).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> <em>Efek Pendapatan (Income Effect)</em> dari kenaikan harga justru menurunkan daya beli riil keluarga, bukan menaikkannya.</li><li><strong>Opsi C:</strong> Barang Giffen adalah kasus teoritis ekstrim pada barang inferior pokok di mana kenaikan harga menaikkan pembelian, tidak berlaku pada daging sapi.</li><li><strong>Opsi D:</strong> Ilusi uang terjadi bila konsumen terkecoh nilai nominal tanpa melihat inflasi, bukan peralihan antar-komoditas riil.</li></ul></div>"
            },
            {
                "id": "s1_q13",
                "theoryKey": "daya_beli",
                "theoryTitle": "Upah Riil vs Upah Nominal",
                "scenario": "💼 Kenaikan Gaji Tahunan Pekerja",
                "question": "Pak Joko mendapat kenaikan gaji dari kantornya sebesar 5% tahun ini. Namun, tingkat inflasi tahunan di kotanya tercatat sebesar 7%. Apakah yang sebenarnya terjadi pada upah riil Pak Joko?",
                "options": [
                    "Upah riil Pak Joko meningkat 2% karena menerima bonus tunai kenaikan gaji dari pemberi kerja",
                    "Upah riil Pak Joko mengalami penurunan sekitar 2% karena laju inflasi melebihi kenaikan gaji",
                    "Daya beli Pak Joko tidak berubah karena nominal uang di rekening bank bertambah setiap bulan",
                    "Upah riil Pak Joko naik 12% karena persentase kenaikan gaji terakumulasi bersama angka inflasi"
                ],
                "correct": 1,
                "hint": "Upah riil adalah upah nominal dikurangi tingkat inflasi (W/P)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Pertumbuhan Upah Riil ≈ Pertumbuhan Upah Nominal - Laju Inflasi</em> = 5% - 7% = -2%. Meskipun uang nominal yang diterima Pak Joko bertambah, harga barang di pasar naik lebih kencang, sehingga jumlah barang fisik yang dapat dibeli justru berkurang 2%.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menghitung 5% - 7% menghasilkan angka negatif (-2%), bukan positif (+2%).</li><li><strong>Opsi C:</strong> Menganggap daya beli tetap sama adalah jebakan klasik ilusi uang (<em>money illusion</em>).</li><li><strong>Opsi D:</strong> Menjumlahkan 5% + 7% = 12% adalah kekeliruan perhitungan yang membalikkan arah inflasi.</li></ul></div>"
            },
            {
                "id": "s1_q14",
                "theoryKey": "biaya_logistik",
                "theoryTitle": "Biaya Logistik & Konektivitas Kepulauan",
                "scenario": "🚢 Tol Laut & Disparitas Harga Antarpulau",
                "question": "Indonesia adalah negara kepulauan. Mengapa disparitas harga cabai atau semen antara pulau Jawa dan pulau terluar (seperti Papua) bisa sangat tinggi padahal uang yang digunakan sama-sama Rupiah?",
                "options": [
                    "Perbedaan regulasi bea cukai antarpulau yang mengenakan tarif impor antarprovinsi domestik",
                    "Tingginya friksi biaya logistik, ongkos angkut muatan balik kapal, dan rantai pasok maritim",
                    "Nilai kurs transaksi rupiah lokal di Papua mengalami depresiasi terhadap rupiah pulau Jawa",
                    "Bank sentral menetapkan pagu kuota peredaran uang tunai yang jauh lebih ketat di luar Jawa"
                ],
                "correct": 1,
                "hint": "Kapal yang mengangkut barang ke pulau terluar sering kali kembali dalam keadaan kosong tanpa muatan balik!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Disparitas harga geografis dipicu oleh biaya logistik maritim yang mahal, infrastruktur konektivitas pelabuhan yang belum merata, serta masalah muatan balik kapal yang kosong (<em>unbalanced trade flow</em>), yang menaikkan biaya angkut per unit barang.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Tidak ada tarif bea cukai atau bea impor dalam perdagangan antarwilayah domestik di Indonesia.</li><li><strong>Opsi C:</strong> Rupiah berlaku seragam dengan nilai nominal yang sama di seluruh wilayah NKRI (*Single Currency Area*).</li><li><strong>Opsi D:</strong> Bank Indonesia tidak membatasi kuota uang kartal antarpulau untuk memicu disparitas harga komoditas.</li></ul></div>"
            },
            {
                "id": "s1_q15",
                "theoryKey": "hukum_engel",
                "theoryTitle": "Hukum Engel (Engel's Law)",
                "scenario": "🍽️ Pergeseran Keranjang Belanja Keluarga",
                "question": "Menurut Hukum Engel (Engel's Law) dalam teori konsumsi, apa yang terjadi pada proporsi pengeluaran untuk makanan ketika pendapatan suatu keluarga meningkat pesat?",
                "options": [
                    "Proporsi pengeluaran untuk makanan meningkat tajam melampaui seluruh belanja barang sekunder",
                    "Persentase anggaran untuk pangan menurun, beralih ke pos pendidikan, rekreasi, dan tabungan",
                    "Porsi anggaran belanja pangan tetap konstan secara proporsional pada setiap tingkat pendapatan",
                    "Keluarga berhenti membelanjakan uang untuk pos non-pangan demi menambah persediaan makanan"
                ],
                "correct": 1,
                "hint": "Kapasitas lambung manusia terbatas; ketika pendapatan melonjak, porsi belanja bergeser ke kualitas hidup!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Hukum Engel</em> menyatakan bahwa seiring naiknya pendapatan keluarga, persentase (proporsi) pendapatan yang dibelanjakan untuk makanan akan menurun, meskipun nominalnya bertambah. Anggaran selebihnya dialihkan ke pos sekunder, tersier, dan tabungan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pangan adalah kebutuhan dasar; elastisitas pendapatan untuk pangan secara agregat bernilai &lt; 1, sehingga proporsinya menurun.</li><li><strong>Opsi C:</strong> Proporsi belanja tidak konstan; pola konsumsi bertransformasi seiring transisi menuju kelas menengah.</li><li><strong>Opsi D:</strong> Konsumen justru meningkatkan konsumsi barang non-makanan saat pendapatan bertambah.</li></ul></div>"
            },
            {
                "id": "s1_q16",
                "theoryKey": "teori_kuantitas_uang",
                "theoryTitle": "Kecepatan Peredaran Uang (Velocity of Money)",
                "scenario": "📱 QRIS & Transaksi Pembayaran Digital",
                "question": "Dalam persamaan kuantitas uang M × V = P × Y, adopsi massal pembayaran digital seperti QRIS di warung-warung dan UMKM secara teoritis berdampak pada variabel apa?",
                "options": [
                    "Meningkatkan kecepatan perputaran uang (V) karena transaksi setelmen berlangsung seketika",
                    "Mengurangi kapasitas output riil (Y) karena pedagang dikenakan biaya bagi hasil aplikasi",
                    "Menghilangkan kebutuhan bank sentral dalam mengawasi peredaran likuiditas uang beredar",
                    "Menyusutkan jumlah uang primer (M0) hingga mencapai angka nol mutlak di neraca moneter"
                ],
                "correct": 0,
                "hint": "Uang berpindah tangan jauh lebih cepat secara elektronik dibanding menunggu kembalian uang fisik!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pembayaran digital (QRIS, BI-FAST) mempercepat frekuensi perpindahan uang antar-rekening dalam perekonomian, yang secara matematis meningkatkan variabel <em>Velocity of Money (V)</em> dalam persamaan Fisher.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Efisiensi pembayaran digital justru menurunkan biaya transaksi dan memperluas omzet pasar (mendorong Y).</li><li><strong>Opsi C:</strong> Digitalisasi pembayaran menuntut pengawasan sistem pembayaran dan stabilitas moneter BI yang kian cermat.</li><li><strong>Opsi D:</strong> Uang primer tetap eksis dalam bentuk saldo giro bank umum di bank sentral, tidak pernah hilang.</li></ul></div>"
            }
        ]
    },
    {
        "id": 2,
        "title": "Level 02: Agregat PDB & Konsumsi",
        "subtitle": "Pendapatan Nasional, PDB Riil vs Nominal, dan Marginal Propensity to Consume",
        "theme": "national_income",
        "unlocks": "Gelar: Analis Agregat Riil",
        "questionPool": [
            {
                "id": "s1_q17",
                "theoryKey": "tabungan_investasi",
                "theoryTitle": "Identitas Tabungan & Investasi Makro",
                "scenario": "🏦 Keseimbangan Dana Pinjaman (Loanable Funds)",
                "question": "Dalam perekonomian tertutup tanpa perdagangan luar negeri, keseimbangan pasar dana pinjaman (Loanable Funds) menyatakan bahwa total Investasi riil (I) harus didanai oleh:",
                "options": [
                    "Penerbitan utang luar negeri valuta asing yang dijamin langsung oleh pemerintah pusat",
                    "Total Tabungan Nasional (National Saving), gabungan tabungan swasta dan tabungan pemerintah",
                    "Pencetakan surat utang komersial korporasi swasta tanpa memerlukan agunan kredit bank",
                    "Surplus neraca transaksi berjalan yang disimpan di lembaga kliring penjaminan investasi"
                ],
                "correct": 1,
                "hint": "Dalam ekonomi tertutup, dana investasi pabrik dan infrastruktur berasal dari tabungan domestik (S = I)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam identitas makro ekonomi tertutup: <em>Y = C + I + G</em>. Dengan mengurangkan C dan G dari kedua sisi diperoleh <em>Y - C - G = I</em>, di mana sisi kiri adalah Tabungan Nasional (<em>S = I</em>). Investasi riil dibiayai oleh tabungan swasta dan surplus fiskal.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Perekonomian tertutup menurut definisi asumsi tidak memiliki akses utang atau modal luar negeri.</li><li><strong>Opsi C:</strong> Surat utang hanyalah instrumen intermediasi; sumber dananya tetap berasal dari tabungan pemilik modal.</li><li><strong>Opsi D:</strong> Perekonomian tertutup tidak memiliki transaksi perdagangan luar negeri (X = M = 0).</li></ul></div>"
            },
            {
                "id": "s1_q18",
                "theoryKey": "inflasi_ihk",
                "theoryTitle": "Metodologi Survei Indeks Harga Konsumen (IHK)",
                "scenario": "📝 Survei Biaya Hidup BPS",
                "question": "Bagaimanakah Badan Pusat Statistik (BPS) menghitung laju inflasi bulanan dan tahunan di Indonesia?",
                "options": [
                    "Menghitung rata-rata kenaikan harga seluruh saham korporasi yang tercatat di bursa efek",
                    "Memantau perubahan harga keranjang ratusan komoditas barang dan jasa terpilih di puluhan kota",
                    "Mencatat selisih antara nilai ekspor nonmigas dengan nilai impor bahan baku manufaktur",
                    "Menghitung persentase pertumbuhan total uang kartal dan giral yang beredar di masyarakat"
                ],
                "correct": 1,
                "hint": "BPS mensurvei harga keranjang belanja kebutuhan pokok konsumen (IHK) di berbagai kota perwakilan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> BPS menyusun Indeks Harga Konsumen (IHK) menggunakan metode Laspeyres termodifikasi, memantau perubahan harga keranjang ratusan komoditas barang/jasa yang paling banyak dikonsumsi rumah tangga berdasarkan Survei Biaya Hidup (SBH) berkala.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Indeks saham (IHSG) mengukur harga aset finansial pasar modal, bukan inflasi barang kebutuhan riil.</li><li><strong>Opsi C:</strong> Selisih ekspor dan impor mencatat neraca perdagangan, bukan indeks harga konsumen domestik.</li><li><strong>Opsi D:</strong> Pertumbuhan uang beredar (M1/M2) adalah data moneter bank sentral, bukan indeks harga barang BPS.</li></ul></div>"
            },
            {
                "id": "s1_q19",
                "theoryKey": "ilusi_uang",
                "theoryTitle": "Ilusi Uang (Money Illusion)",
                "scenario": "💵 Fenomena Psikologis Kenaikan Upah Nominal",
                "question": "Seorang buruh merasa dirinya jauh lebih kaya karena upahnya naik 10%, padahal di saat bersamaan harga seluruh barang di pasar naik 15%. Buruh tersebut sedang mengalami fenomena psikologis ekonomi yang disebut:",
                "options": [
                    "Ekspektasi Rasional, di mana pekerja mampu memperhitungkan efek inflasi masa depan secara akurat",
                    "Money Illusion (Ilusi Uang), kecenderungan memandang uang dari nilai nominal bukan daya beli riil",
                    "Sticky Wages, kekakuan upah nominal untuk turun mengikuti siklus penurunan kinerja perusahaan",
                    "Risk Aversion, preferensi pekerja untuk menghindari instrumen keuangan berfluktuasi tinggi"
                ],
                "correct": 1,
                "hint": "Terkecoh oleh angka nominal di slip gaji padahal daya beli riilnya justru menyusut!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Money Illusion (Ilusi Uang)</em> adalah bias kognitif ketika individu menilai kekayaannya berdasarkan nilai nominal uang di tangan, bukan dari daya beli riil barang/jasa yang mampu dibeli setelah memperhitungkan inflasi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Ekspektasi rasional justru memprediksi bahwa pekerja menyadari daya beli riilnya turun 5% (10% - 15%).</li><li><strong>Opsi C:</strong> <em>Sticky wages</em> merujuk pada lambatnya penyesuaian nominal upah akibat kontrak kerja dan regulasi UMR.</li><li><strong>Opsi D:</strong> <em>Risk aversion</em> adalah sifat keengganan mengambil risiko investasi, tidak relevan dengan bias harga.</li></ul></div>"
            },
            {
                "id": "s1_q20",
                "theoryKey": "transmisi_moneter",
                "theoryTitle": "Suku Bunga & Keputusan Investasi Riil",
                "scenario": "🏗️ Perluasan Pabrik & Biaya Modal (Cost of Capital)",
                "question": "Jika bank sentral menaikkan suku bunga acuan secara signifikan, bagaimana pengaruh langsungnya terhadap rencana pengusaha membuka cabang toko atau pabrik baru (Investasi / I)?",
                "options": [
                    "Pengusaha mempercepat ekspansi pabrik karena biaya pinjaman kredit modal kerja menurun",
                    "Pengusaha cenderung menunda investasi fisik karena hurdle rate dan beban bunga pinjaman meningkat",
                    "Pengusaha mengabaikan suku bunga karena seluruh investasi fisik dibiayai dari dana hibah sosial",
                    "Pengusaha wajib melipatgandakan belanja modal fisik guna mempertahankan pangsa pasar domestik"
                ],
                "correct": 1,
                "hint": "Bunga kredit yang tinggi menaikkan biaya modal pinjaman (cost of borrowing)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kenaikan suku bunga acuan menaikkan suku bunga kredit perbankan (<em>cost of capital</em>). Proyek investasi baru menjadi kurang layak secara finansial (NPV turun, biaya bunga naik), sehingga korporasi cenderung menunda ekspansi fisik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kenaikan BI-Rate menaikkan bunga kredit perbankan, bukan menurunkannya.</li><li><strong>Opsi C:</strong> Investasi dunia usaha mengandalkan kredit komersial dan laba ditahan, sangat sensitif terhadap suku bunga.</li><li><strong>Opsi D:</strong> Dunia usaha tidak diwajibkan ekspansi saat kondisi pengetatan moneter; justru rasionalitas bisnis menuntut kehati-hatian likuiditas.</li></ul></div>"
            },
            {
                "id": "s1_q21",
                "theoryKey": "barang_inferior",
                "theoryTitle": "Barang Inferior & Elastisitas Pendapatan",
                "scenario": "🥫 Pola Belanja Saat Daya Beli Tertekan",
                "question": "Ketika terjadi resesi dan pendapatan riil masyarakat menurun, penjualan ikan sarden kalengan dan mi instan justru melonjak tajam. Dalam klasifikasi ekonomi mikro-makro, barang-barang tersebut digolongkan sebagai:",
                "options": [
                    "Barang Mewah (Luxury Goods), karena tingkat kepuasan marjinal konsumen bertambah pesat",
                    "Barang Normal, karena konsumsi selalu bergerak searah dengan pertumbuhan pendapatan riil",
                    "Barang Inferior, komoditas yang permintaannya justru meningkat ketika pendapatan riil menurun",
                    "Barang Publik, karena diproduksi secara massal oleh korporasi dengan subsidi pemerintah"
                ],
                "correct": 2,
                "hint": "Elastisitas pendapatan negatif (Ey < 0): saat kantong menipis, orang beralih ke menu hemat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Barang Inferior</em> memiliki elastisitas pendapatan negatif (<em>Ey &lt; 0</em>). Saat pendapatan riil rumah tangga tertekan resesi, mereka memangkas belanja makan di restoran dan beralih mengonsumsi makanan kemasan hemat seperti mi instan dan sarden.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Barang mewah memiliki elastisitas pendapatan &gt; 1; penjualannya anjlok paling pertama saat resesi.</li><li><strong>Opsi B:</strong> Barang normal memiliki elastisitas pendapatan positif; permintaannya turun jika pendapatan turun.</li><li><strong>Opsi D:</strong> Mi instan dan sarden adalah barang privat murni yang diperjualbelikan komersial (<em>rival &amp; excludable</em>).</li></ul></div>"
            },
            {
                "id": "s1_q22",
                "theoryKey": "monopoli_alami",
                "theoryTitle": "Monopoli Alami & Skala Ekonomi",
                "scenario": "⚡ Transmisi Jaringan Listrik Nasional",
                "question": "Mengapa tarif listrik untuk rumah tangga dan industri tidak diserahkan pada mekanisme pasar bebas multi-operator, melainkan diatur tunggal oleh PT PLN dengan persetujuan pemerintah?",
                "options": [
                    "Industri listrik adalah Monopoli Alami dengan skala ekonomi tinggi di mana duplikasi transmisi inefisien",
                    "Pemerintah bermaksud membatasi penggunaan listrik nasional agar masyarakat beralih ke bahan bakar kayu",
                    "Mekanisme pasar bebas secara teknis dilarang oleh hukum perdagangan untuk komoditas energi modern",
                    "Pasokan listrik tidak memerlukan modal investasi jaringan kabel sehingga pasar rentan mengalami kelebihan pasokan"
                ],
                "correct": 0,
                "hint": "Membangun dua atau tiga tiang dan kabel listrik di jalan yang sama adalah pemborosan modal raksasa!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Jaringan transmisi dan distribusi listrik adalah <em>Monopoli Alami (Natural Monopoly)</em>. Biaya investasi awal jaringan kabel sangat masif dengan biaya marjinal rendah. Efisiensi biaya tercapai jika dilayani satu operator terintegrasi di bawah regulasi tarif pemerintah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Kebijakan energi nasional justru mendorong elektrifikasi dan transisi energi bersih, bukan kembali ke biomassa primitif.</li><li><strong>Opsi C:</strong> Mekanisme pasar bebas diterapkan di banyak sektor komoditas; pembatasan pada listrik berdasar pada efisiensi skala ekonomi teknis.</li><li><strong>Opsi D:</strong> Investasi pembangkit dan gardu transmisi listrik membutuhkan modal kapital sangat besar (*capital intensive*).</li></ul></div>"
            },
            {
                "id": "s1_q23",
                "theoryKey": "eksternalitas_negatif",
                "theoryTitle": "Eksternalitas Negatif & Biaya Sosial",
                "scenario": "🏭 Pencemaran Lingkungan & Kegagalan Pasar",
                "question": "Sebuah pabrik tapioka membuang limbah cair ke sungai desa tanpa pengolahan, mencemari air minum dan mematikan kolam ikan warga sekitar. Dalam analisis ekonomi, fenomena ini disebut:",
                "options": [
                    "Free Rider Problem, di mana masyarakat menikmati air sungai bersih tanpa membayar retribusi",
                    "Eksternalitas Negatif, biaya sosial produksi ditanggung pihak ketiga yang tidak terlibat transaksi",
                    "Tragedy of the Commons, pemanfaatan sumber daya milik bersama yang diatur ketat oleh regulasi",
                    "Deadweight Loss Pajak, hilangnya surplus konsumen akibat pemungutan cukai limbah industri"
                ],
                "correct": 1,
                "hint": "Pabrik menghemat biaya pengolahan limbah, tetapi warga sekitar yang harus menanggung kerugian air kotor!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Eksternalitas Negatif</em> terjadi ketika biaya sosial marjinal (<em>Marginal Social Cost</em>) melampaui biaya privat marjinal produsen. Pabrik tidak membayar biaya kerusakan air, sehingga warga sekitar menanggung biaya eksternalitas polusi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> <em>Free-rider problem</em> berkaitan dengan pihak yang menikmati barang publik tanpa berkontribusi biaya.</li><li><strong>Opsi C:</strong> <em>Tragedy of the commons</em> terjadi akibat eksploitasi berlebih atas aset milik bersama tanpa kepemilikan jelas.</li><li><strong>Opsi D:</strong> <em>Deadweight loss</em> adalah inefisiensi surplus ekonomi akibat distorsi harga/pajak, bukan polusi fisik.</li></ul></div>"
            },
            {
                "id": "s1_q24",
                "theoryKey": "keseimbangan_ad_as",
                "theoryTitle": "Paradoks Berhemat (Paradox of Thrift)",
                "scenario": "📉 Kepanikan Resesi & Sikap Menabung",
                "question": "Jika seluruh warga negara secara serentak memutuskan untuk memangkas belanja konsumsi dan menabung 90% dari pendapatannya saat ancaman resesi tiba, apa yang akan terjadi pada PDB nasional menurut teori Keynesian?",
                "options": [
                    "Perekonomian mencapai kemakmuran jangka panjang karena tabungan perbankan otomatis diubah jadi pabrik",
                    "PDB nasional justru anjlok parah karena pengeluaran seseorang merupakan pendapatan bagi orang lain",
                    "Tingkat inflasi melonjak dua digit akibat menumpuknya likuiditas simpanan dana di brankas perbankan",
                    "Neraca perdagangan luar negeri langsung mengalami defisit besar akibat lonjakan pembelian valuta asing"
                ],
                "correct": 1,
                "hint": "Paradox of Thrift: menabung baik bagi individu, tapi jika dilakukan serentak akan mematikan omzet bisnis!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Ini adalah <em>Paradox of Thrift</em>. Jika semua orang menahan belanja secara serempak, pendapatan agregat bisnis runtuh. Perusahaan merumahkan pekerja, yang pada gilirannya menekan total pendapatan nasional dan total tabungan akhir menjadi lebih rendah dari semula.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Saat prospek resesi suram, perbankan enggan menyalurkan kredit dan pengusaha enggan ekspansi (<em>liquidity trap</em>).</li><li><strong>Opsi C:</strong> Pengurangan belanja agregat masif justru memicu spiral deflasi dan kelebihan stok barang, bukan inflasi.</li><li><strong>Opsi D:</strong> Penurunan belanja menekan impor barang konsumsi sehingga neraca perdagangan cenderung mencatat surplus teknis.</li></ul></div>"
            },
            {
                "id": "s1_q25",
                "theoryKey": "buffer_stock",
                "theoryTitle": "Penyangga Pasokan (Buffer Stock) & Operasi Pasar",
                "scenario": "🍚 Cadangan Beras Pemerintah (CBP)",
                "question": "Menjelang panen yang tertunda akibat kekeringan, Perum Bulog menggelar Operasi Pasar Murah dengan menjual beras cadangan pemerintah (CBP) langsung ke konsumen. Dari sisi kurva pasar, tindakan ini bertujuan untuk:",
                "options": [
                    "Menambah pasokan fisik pangan di pasar (menggeser penawaran ke kanan) guna menstabilkan harga beras",
                    "Menggeser kurva permintaan pangan masyarakat ke kiri bawah agar konsumsi karbohidrat menurun",
                    "Memaksa produsen beras swasta menghentikan seluruh aktivitas gilingan padi di sentra produksi",
                    "Menyerap likuiditas uang kartal perbankan untuk memperkuat nilai tukar rupiah terhadap valas"
                ],
                "correct": 0,
                "hint": "Mengucurkan stok gudang ke pasar memperbanyak barang yang tersedia bagi pembeli!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Operasi pasar beras CBP berfungsi sebagai instrumen <em>Buffer Stock</em>. Menggelontorkan stok cadangan ke pasar menambah pasokan fisik (menggeser kurva penawaran ke kanan), meredakan ekspektasi spekulasi kelangkaan, dan meredam lonjakan harga beras.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Operasi pasar beras tidak mengubah selera atau kurva preferensi permintaan pangan masyarakat.</li><li><strong>Opsi C:</strong> CBP bertujuan mengisi defisit pasokan di pasar eceran, bukan mematikan usaha penggilingan beras swasta.</li><li><strong>Opsi D:</strong> Operasi pasar adalah kebijakan stabilisasi pangan riil, bukan operasi moneter penyerapan likuiditas bank sentral.</li></ul></div>"
            },
            {
                "id": "s1_q26",
                "theoryKey": "indeks_keyakinan_konsumen",
                "theoryTitle": "Indeks Keyakinan Konsumen (IKK)",
                "scenario": "📈 Survei Ekspektasi Konsumen Bank Indonesia",
                "question": "Bank Indonesia rutin merilis Indeks Keyakinan Konsumen (IKK). Jika angka IKK berada di atas level 100 (misalnya 124,5), apakah arti ekonomi dari data tersebut?",
                "options": [
                    "Tingkat inflasi kebutuhan pokok masyarakat telah melampaui batas aman target tahunan pemerintah",
                    "Konsumen berada di zona optimis terhadap kondisi ekonomi dan penghasilan sehingga konsumsi menguat",
                    "Pemerintah diwajibkan segera menggelontorkan paket stimulus bansos darurat untuk menjaga daya beli",
                    "Mayoritas konsumen berencana menarik seluruh simpanan perbankan untuk membeli aset safe haven emas"
                ],
                "correct": 1,
                "hint": "Angka 100 adalah ambang batas netral; angka di atas 100 menandakan optimisme masyarakat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Angka indeks 100 memisahkan zona optimis dan pesimis. IKK sebesar 124,5 menunjukkan mayoritas responden rumah tangga meyakini kondisi ekonomi saat ini dan prospek ketersediaan lapangan kerja 6 bulan ke depan cerah, menopang laju konsumsi agregat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> IKK mengukur sentimen keyakinan konsumen, bukan angka persentase laju inflasi IHK.</li><li><strong>Opsi C:</strong> Bansos darurat digelontorkan saat keyakinan konsumen anjlok ke zona pesimis (&lt; 100) saat terjadi krisis.</li><li><strong>Opsi D:</strong> Keyakinan konsumen yang tinggi menandakan kepercayaan stabil terhadap sistem ekonomi dan perbankan domestik.</li></ul></div>"
            },
            {
                "id": "s1_q27",
                "theoryKey": "barang_publik",
                "theoryTitle": "Barang Publik (Non-Rival & Non-Excludable)",
                "scenario": "🛣️ Jalan Raya Nasional & Mercusuar",
                "question": "Mengapa jalan raya nasional, lampu penerangan jalan, dan mercusuar di laut digolongkan sebagai Barang Publik murni?",
                "options": [
                    "Karena biaya pembangunannya diwajibkan memberikan keuntungan dividen tunai bagi APBN",
                    "Karena konsumsi oleh satu orang tidak mengurangi manfaat bagi yang lain dan sulit melarang orang lain",
                    "Karena barang-barang tersebut hanya boleh dioperasikan oleh badan usaha milik swasta multinasional",
                    "Karena setiap pengguna jalan diwajibkan menandatangani kontrak pemeliharaan aset secara individu"
                ],
                "correct": 1,
                "hint": "Non-Rival (tidak berkurang saat dipakai) dan Non-Excludable (tidak bisa mencegah orang ikut memanfaatkan)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Barang Publik murni memenuhi dua syarat: <em>Non-Rival</em> (pemanfaatan oleh seorang pengendara tidak mengurangi kemampuan pengendara lain untuk melintas) dan <em>Non-Excludable</em> (mustahil melarang warga berjalan di bawah lampu penerangan jalan).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Barang publik dibangun untuk memaksimalkan manfaat sosial (*social benefit*), bukan mencari laba komersial langsung.</li><li><strong>Opsi C:</strong> Karakteristik non-excludable membuat swasta enggan membangun barang publik murni karena rawan *free-rider*.</li><li><strong>Opsi D:</strong> Kontrak individual tidak praktis diterapkan untuk barang publik jalan umum tanpa gerbang tol berbayar.</li></ul></div>"
            },
            {
                "id": "s1_q28",
                "theoryKey": "elastisitas_permintaan",
                "theoryTitle": "Elastisitas Harga Permintaan Inelastis",
                "scenario": "🌾 Kenaikan Harga Makanan Pokok",
                "question": "Beras di Indonesia merupakan makanan pokok utama dengan elastisitas harga permintaan yang inelastis (|Ed| < 1). Apa artinya hal ini bagi anggaran belanja keluarga ketika harga beras naik 20%?",
                "options": [
                    "Keluarga langsung memangkas konsumsi beras sebesar 50% dan beralih ke makanan pengganti lain",
                    "Keluarga tetap membeli beras dalam jumlah relatif sama sehingga pos belanja pangan menyedot pos lain",
                    "Total pengeluaran nominal keluarga untuk pos beras justru menyusut drastis mengikuti kenaikan harga",
                    "Keluarga secara otomatis menghentikan konsumsi beras dan menggantinya dengan bahan bakar memasak"
                ],
                "correct": 1,
                "hint": "Inelastis berarti persentase penurunan jumlah barang yang dibeli jauh lebih kecil dibanding kenaikan harga!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Permintaan inelastis (|Ed| &lt; 1) berarti perubahan harga tidak banyak mengubah kuantitas fisik yang dikonsumsi karena sifatnya sebagai kebutuhan primer pokok. Kenaikan harga beras 20% memaksa keluarga menyisihkan porsi uang belanja lebih besar.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pemangkasan kuantitas 50% akibat kenaikan harga 20% menunjukkan sifat elastis (|Ed| = 2,5), bukan inelastis.</li><li><strong>Opsi C:</strong> Pada kurva inelastis, kenaikan harga selalu menaikkan total pengeluaran (<em>Total Revenue / Expenditure</em>) konsumen.</li><li><strong>Opsi D:</strong> Pangan tidak dapat disubstitusi oleh bahan bakar; fungsi biologis makan bersifat mutlak.</li></ul></div>"
            },
            {
                "id": "s1_q29",
                "theoryKey": "rasio_gini",
                "theoryTitle": "Rasio Gini & Kesenjangan Distribusi Pendapatan",
                "scenario": "📐 Indikator Ketimpangan Pembangunan",
                "question": "Badan Pusat Statistik (BPS) merilis angka Rasio Gini (Gini Coefficient) Indonesia sebesar 0,381. Apakah makna dari koefisien Gini dalam kacamata pembangunan ekonomi makro?",
                "options": [
                    "Mengukur persentase realisasi penerimaan pajak penghasilan badan usaha terhadap target tahunan APBN",
                    "Mengukur derajat ketimpangan distribusi pendapatan/pengeluaran antar-penduduk dalam rentang 0 hingga 1",
                    "Mengukur proporsi jumlah angkatan kerja berpendidikan tinggi yang belum terserap di sektor formal",
                    "Mengukur rasio kepemilikan cadangan devisa pemerintah terhadap total kewajiban utang luar negeri"
                ],
                "correct": 1,
                "hint": "Angka 0 berarti merata sempurna, sedangkan angka 1 berarti ketimpangan mutlak!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Rasio Gini</em> adalah indikator ketimpangan pendapatan/pengeluaran berdasarkan Kurva Lorenz, dengan rentang 0 (kemerataan mutlak) hingga 1 (ketimpangan absolut). Angka 0,381 menempatkan Indonesia pada ketimpangan tingkat sedang.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kinerja penerimaan pajak diukur melalui rasio pajak (*Tax Ratio*) terhadap PDB.</li><li><strong>Opsi C:</strong> Pengangguran berpendidikan diukur melalui Tingkat Pengangguran Terbuka (TPT) spesifik jenjang sekolah.</li><li><strong>Opsi D:</strong> Rasio utang terhadap cadangan devisa diukur melalui indikator kecukupan cadangan devisa moneter.</li></ul></div>"
            },
            {
                "id": "s1_q30",
                "theoryKey": "sektor_informal",
                "theoryTitle": "Sektor Informal sebagai Bantalan Sosial (Safety Net)",
                "scenario": "🛵 Warung Kelontong & Ekonomi Informal",
                "question": "Di Indonesia, lebih dari 59% tenaga kerja bekerja di sektor informal (pedagang kaki lima, warung kelontong, ojek daring). Apa fungsi makro terpenting dari sektor informal saat ekonomi formal dilanda krisis PHK massal?",
                "options": [
                    "Bertindak sebagai penyerap tenaga kerja darurat (shock absorber) yang mencegah lonjakan pengangguran",
                    "Menyumbang sumber penerimaan devisa ekspor terbesar bagi cadangan devisa bank sentral nasional",
                    "Menjadi pembeli utama penerbitan Surat Utang Negara bertenor panjang di pasar modal domestik",
                    "Menghilangkan kebutuhan pemerintah pusat dalam menyalurkan program jaring pengaman sosial pangan"
                ],
                "correct": 0,
                "hint": "Pekerja yang terkena PHK di pabrik dapat langsung berdagang atau menjadi ojek daring demi menyambung hidup!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Sektor informal memiliki fleksibilitas tinggi dan hambatan masuk yang rendah, berfungsi sebagai <em>Shock Absorber (Bantalan Sosial)</em> makro. Ketika sektor industri formal mengalami kontraksi, pekerja ter-PHK terserap ke sektor informal sehingga daya beli tidak runtuh total.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Devisa ekspor Indonesia didominasi oleh korporasi komoditas tambang, perkebunan, dan industri manufaktur formal.</li><li><strong>Opsi C:</strong> Sektor informal didominasi transaksi tunai dan belum memiliki akses institusional ke pasar perdana SBN.</li><li><strong>Opsi D:</strong> Bantuan sosial justru semakin krusial karena produktivitas dan kepastian pendapatan sektor informal relatif rendah.</li></ul></div>"
            },
            {
                "id": "s1_q31",
                "theoryKey": "menu_costs",
                "theoryTitle": "Biaya Menu (Menu Costs) & Kekakuan Harga",
                "scenario": "☕ Stabilitas Harga di Kedai Kopi",
                "question": "Mengapa pedagang warteg atau kedai kopi tidak menaikkan harga secangkir kopi setiap jam saat harga gula di pasar berfluktuasi naik-turun beberapa rupiah?",
                "options": [
                    "Bank sentral memberlakukan sanksi denda pembekuan izin usaha bagi kedai yang mengubah harga",
                    "Adanya Menu Costs, meliputi biaya cetak daftar menu baru, friksi kalkulasi kasir, dan risiko komplain",
                    "Harga komoditas gula pasir terbukti secara statistik tidak mempengaruhi biaya pokok secangkir kopi",
                    "Undang-undang perlindungan konsumen mewajibkan harga makanan eceran diikat tetap selama 12 bulan"
                ],
                "correct": 1,
                "hint": "Mengubah label harga dan menghadapi kekecewaan pelanggan membutuhkan biaya dan energi transaksi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Teori Keynesian Baru menjelaskan kekakuan harga jangka pendek melalui <em>Menu Costs</em>: biaya mencetak daftar menu baru, memperbarui sistem kasir, dan friksi risiko kehilangan pelanggan tetap melebihi manfaat penyesuaian harga kecil harian.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Bank sentral mengelola suku bunga moneter makro, tidak mengintervensi atau mendenda harga warung makan.</li><li><strong>Opsi C:</strong> Gula adalah komponen biaya variabel kopi manis; keengganan mengubah harga murni karena friksi biaya menu.</li><li><strong>Opsi D:</strong> Pedagang eceran memiliki kebebasan menetapkan harga tanpa ikatan kontrak harga wajib 12 bulan.</li></ul></div>"
            },
            {
                "id": "s1_q32",
                "theoryKey": "supply_shock_elnino",
                "theoryTitle": "Guncangan Penawaran Pertanian & Anomali El Nino",
                "scenario": "☀️ Kemarau Ekstrem & Ketahanan Pangan",
                "question": "Anomali cuaca El Nino ekstrem yang memicu kemarau panjang berkepanjangan di Asia Tenggara berdampak pada perekonomian makro melalui jalur:",
                "options": [
                    "Guncangan Penawaran Negatif (Negative Supply Shock), memicu gagal panen dan lonjakan inflasi pangan",
                    "Penurunan rasio utang pemerintah akibat penyusutan alokasi belanja operasional saluran irigasi",
                    "Peningkatan suku bunga The Fed di Amerika Serikat secara otomatis akibat fluktuasi iklim tropis",
                    "Lonjakan Permintaan Agregat (Demand Shock) akibat bertambahnya kebutuhan kalori masyarakat di desa"
                ],
                "correct": 0,
                "hint": "Gagal panen mengurangi ketersediaan beras di pasar pada tingkat harga yang berlaku!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> El Nino adalah <em>Negative Supply Shock</em> klasik. Kekeringan memicu gagal panen padi dan hortikultura, menggeser kurva penawaran pangan ke kiri, menaikkan harga bahan pangan pokok, dan memicu inflasi harga bergejolak (<em>volatile foods</em>).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Kemarau justru menuntut peningkatan belanja darurat APBN untuk pompanisasi dan bantuan sosial pangan.</li><li><strong>Opsi C:</strong> Kebijakan moneter The Fed dipandu oleh inflasi domestik dan pasar tenaga kerja AS, bukan cuaca lokal Asia Tenggara.</li><li><strong>Opsi D:</strong> El Nino menekan sisi penawaran fisik panen, bukan lonjakan nafsu konsumsi masyarakat.</li></ul></div>"
            }
        ]
    },
    {
        "id": 3,
        "title": "Level 03: Ekuilibrium AD-AS & Pasar",
        "subtitle": "Keseimbangan Makro, Guncangan Pasokan/Permintaan, dan Efisiensi Pasar",
        "theme": "equilibrium",
        "unlocks": "Gelar: Ahli Ekuilibrium Pasar",
        "questionPool": [
            {
                "id": "s1_q33",
                "theoryKey": "kebijakan_penawaran",
                "theoryTitle": "Kebijakan Sisi Penawaran (Supply-Side Policy)",
                "scenario": "🌱 Subsidi Pupuk & Benih Pertanian",
                "question": "Pemerintah mengucurkan subsidi pupuk kimia dan bibit unggul kepada jutaan petani padi di pedesaan. Bagaimana dampak fiskal ini terhadap kurva penawaran agregat pangan nasional?",
                "options": [
                    "Menurunkan biaya produksi marjinal petani sehingga menggeser kurva penawaran pangan ke kanan",
                    "Menggeser kurva penawaran ke kiri karena subsidi memicu penurunan produktivitas lahan sawah",
                    "Menaikkan tingkat inflasi pangan akibat bertambahnya biaya pembelian input pupuk nonsubsidi",
                    "Menyerap seluruh tenaga kerja sektor manufaktur perkotaan untuk berpindah menjadi buruh tani"
                ],
                "correct": 0,
                "hint": "Subsidi input menurunkan ongkos tanam petani sehingga hasil panen dapat dijual lebih kompetitif!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Subsidi pupuk dan benih adalah <em>Kebijakan Sisi Penawaran (Supply-Side Policy)</em>. Dengan memangkas biaya marjinal petani, kurva penawaran pangan bergeser ke kanan, menambah volume panen nasional dan menjaga stabilitas harga sembako.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Bantuan benih unggul secara agronomis melipatgandakan hasil tonase per hektar lahan sawah.</li><li><strong>Opsi C:</strong> Subsidi pupuk bertujuan menahan ongkos produksi agar inflasi pangan pokok terkendali, bukan menaikkannya.</li><li><strong>Opsi D:</strong> Subsidi pertanian tidak memicu migrasi tenaga kerja manufaktur kota kembali secara masal ke desa.</li></ul></div>"
            },
            {
                "id": "s1_q34",
                "theoryKey": "rasio_gini",
                "theoryTitle": "PDB per Kapita vs Indeks Kesejahteraan Alternatif",
                "scenario": "📊 Analisis PDB per Kapita Nasional",
                "question": "PDB per kapita Indonesia mencapai sekitar US$ 4.900 per tahun. Mengapa angka rata-rata matematis ini tidak serta-merta mencerminkan bahwa setiap individu warga negara menikmati penghasilan setara nilai tersebut?",
                "options": [
                    "Metode penghitungan PDB per kapita secara internasional hanya mencatat penghasilan sektor perbankan",
                    "PDB per kapita adalah rata-rata agregat yang tidak memperhitungkan ketimpangan distribusi pendapatan",
                    "Nilai PDB tahunan secara otomatis dipotong 50% oleh kas kementerian keuangan sebagai cadangan fiskal",
                    "Angka PDB per kapita hanya menghitung nilai transaksi ekspor komoditas mentah tanpa barang konsumsi"
                ],
                "correct": 1,
                "hint": "Rata-rata statistik menyamarkan kesenjangan antara konglomerat dan masyarakat berpenghasilan rendah!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> PDB per kapita hanyalah rata-rata aritmatika sederhana: <em>Total PDB dibagi Total Penduduk</em>. Angka ini mengabaikan sebaran distribusi (skewness). Di negara dengan ketimpangan pendapatan, sebagian besar output dinikmati persentil teratas sementara rakyat bawah berpenghasilan di bawah rata-rata.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> PDB mencakup 17 sektor lapangan usaha (pertanian, industri, jasa, perdagangan), bukan perbankan saja.</li><li><strong>Opsi C:</strong> PDB adalah nilai tambah kotor ekonomi nasional, bukan dana kas yang disita pemerintah.</li><li><strong>Opsi D:</strong> PDB mencakup konsumsi domestik, investasi, dan belanja pemerintah di samping ekspor neto.</li></ul></div>"
            },
            {
                "id": "s1_q35",
                "theoryKey": "inklusi_keuangan",
                "theoryTitle": "Inklusi Keuangan & Intermediasi Perbankan",
                "scenario": "📱 Agen Bank Laku Pandai di Pedesaan",
                "question": "Pemerintah gencar mendorong program inklusi keuangan, seperti pembukaan rekening bank bagi pelajar dan agen bank laku pandai di pelosok desa. Dari kacamata intermediasi makro, apa manfaat utamanya?",
                "options": [
                    "Mewajibkan seluruh transaksi perdagangan tradisional menggunakan instrumen utang berbunga tinggi",
                    "Memobilisasi dana tabungan idle ke sistem keuangan formal untuk disalurkan menjadi kredit produktif",
                    "Mengurangi kapasitas cadangan wajib minimum perbankan agar bank dapat mengambil risiko spekulatif",
                    "Membatasi hak masyarakat pedesaan dalam membelanjakan uang tunai untuk kebutuhan kebutuhan pokok"
                ],
                "correct": 1,
                "hint": "Uang yang disimpan di bawah kasur diubah menjadi dana tabungan bank yang mengalir ke investasi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Inklusi keuangan mentransformasikan dana mengendap (<em>idle money</em>) di bawah kasur menjadi dana pihak ketiga (DPK) resmi. Dana ini kemudian dapat disalurkan oleh fungsi intermediasi perbankan menjadi kredit modal kerja bagi UMKM dan investasi produktif.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Inklusi keuangan justru melindungi masyarakat dari rentenir informal berbiaya tinggi (*loan shark*).</li><li><strong>Opsi C:</strong> Giro Wajib Minimum (GWM) tetap diawasi ketat oleh Bank Indonesia demi kesehatan perbankan.</li><li><strong>Opsi D:</strong> Rekening bank memperluas keleluasaan transaksi dan keamanan aset simpanan warga desa.</li></ul></div>"
            },
            {
                "id": "s1_q36",
                "theoryKey": "kesejahteraan_sosial",
                "theoryTitle": "Keseimbangan Makro & Kesejahteraan Rakyat",
                "scenario": "🏛️ Amanah Konstitusi Perekonomian Nasional",
                "question": "Di akhir pembelajaran Level 1, apakah tujuan pamungkas dari upaya menjaga stabilitas harga (inflasi rendah) dan pertumbuhan Produk Domestik Bruto (PDB) yang berkelanjutan?",
                "options": [
                    "Memastikan bahwa kas negara selalu mencatat saldo surplus likuiditas tanpa perlu belanja publik",
                    "Melindungi daya beli riil rakyat, membuka lapangan kerja layak, dan menopang kesejahteraan umum",
                    "Menghilangkan seluruh mekanisme transaksi pasar bebas demi sentralisasi harga oleh birokrasi",
                    "Mempertahankan tingkat suku bunga acuan perbankan pada angka absolut nol persen sepanjang masa"
                ],
                "correct": 1,
                "hint": "Pasal 33 UUD 1945: Perekonomian disusun untuk sebesar-besar kemakmuran dan kesejahteraan rakyat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Sasaran akhir kebijakan makroekonomi bukan sekadar angka statistik pertumbuhan PDB, melainkan perlindungan daya beli riil masyarakat dari erosi inflasi, pembukaan lapangan kerja berkualitas, pengentasan kemiskinan, dan perwujudan kesejahteraan berkeadilan sosial.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menumpuk kas tanpa belanja publik merugikan ekonomi karena mengabaikan kebutuhan pembangunan infrastruktur dan SDM.</li><li><strong>Opsi C:</strong> Mekanisme pasar tetap menjadi pilar alokasi efisiensi; negara hadir untuk meregulasi dan mengoreksi kegagalan pasar.</li><li><strong>Opsi D:</strong> Suku bunga nol persen permanen dapat memicu gelembung spekulasi aset (*asset bubble*) dan distorsi alokasi modal.</li></ul></div>"
            },
            {
                "id": "s2_q1",
                "theoryKey": "transmisi_moneter",
                "theoryTitle": "Mandat Kestabilan Nilai Rupiah",
                "scenario": "🎯 Mandat Tunggal Bank Indonesia",
                "question": "Menurut Undang-Undang Bank Indonesia dan pembaruan UU P2SK, apakah tujuan utama dari Bank Indonesia sebagai bank sentral Republik Indonesia?",
                "options": [
                    "Memaksimalkan penerimaan dividen BUMN dan mengamankan pembiayaan langsung belanja rutin kementerian",
                    "Mencapai stabilitas nilai Rupiah melalui pengendalian inflasi serta pemeliharaan stabilitas sistem pembayaran",
                    "Menjamin penetapan suku bunga kredit komersial perbankan seragam pada batas terendah bagi seluruh debitur",
                    "Menjaga neraca modal negara agar selalu mencatat surplus mutlak tanpa memedulikan volatilitas kurs valas"
                ],
                "correct": 1,
                "hint": "Fokus utama bank sentral adalah stabilitas harga (daya beli) dan stabilitas nilai tukar!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Sesuai UU No. 23/1999 yang diperbarui UU No. 4/2023 (P2SK), tujuan Bank Indonesia adalah mencapai stabilitas nilai rupiah (laju inflasi rendah dan stabil serta nilai tukar berdaya tahan) serta turut memelihara stabilitas sistem keuangan untuk mendukung pertumbuhan ekonomi berkelanjutan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> BI bukan BUMN pencari dividen komersial dan dilarang membiayai belanja rutin pemerintah secara langsung.</li><li><strong>Opsi C:</strong> BI menetapkan suku bunga kebijakan (BI-Rate), bukan mematok suku bunga kredit komersial secara kaku di perbankan.</li><li><strong>Opsi D:</strong> BI menjaga stabilitas nilai tukar valas dan ketahanan eksternal, bukan memaksakan surplus neraca modal tanpa batas.</li></ul></div>"
            },
            {
                "id": "s2_q2",
                "theoryKey": "transmisi_moneter",
                "theoryTitle": "Jalur Transmisi Suku Bunga (Interest Rate Channel)",
                "scenario": "🏦 Efek Kenaikan BI-Rate pada Tabungan",
                "question": "Ketika Rapat Dewan Gubernur Bank Indonesia memutuskan menaikkan BI-Rate sebesar 50 basis poin (0,50%), bagaimana respon tipikal perilaku simpanan dan konsumsi masyarakat?",
                "options": [
                    "Masyarakat menarik seluruh saldo perbankan untuk dialihkan ke investasi fisik karena biaya simpanan melonjak",
                    "Masyarakat meningkatkan alokasi tabungan dan deposito karena imbal hasil riil menarik, sehingga konsumsi tertahan",
                    "Masyarakat mempercepat belanja barang tahan lama karena memperkirakan suku bunga kredit akan segera dipangkas",
                    "Masyarakat mengabaikan imbal hasil perbankan karena kenaikan suku bunga nominal selalu sebanding dengan inflasi"
                ],
                "correct": 1,
                "hint": "Imbal hasil tabungan yang meningkat menaikkan biaya peluang (opportunity cost) dari membelanjakan uang sekarang!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kenaikan suku bunga acuan menaikkan suku bunga simpanan perbankan. Kenaikan return tabungan ini meningkatkan <em>opportunity cost of consumption</em>, memotivasi masyarakat untuk menunda konsumsi dan memupuk deposito, yang pada akhirnya meredam tekanan permintaan agregat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Biaya simpanan tidak naik bagi deposan; deposan justru memperoleh imbal hasil bunga simpanan yang lebih tinggi.</li><li><strong>Opsi C:</strong> Saat suku bunga naik, bunga kredit pemilikan barang ikut naik, sehingga masyarakat menunda pembelian cicilan.</li><li><strong>Opsi D:</strong> Pengetatan moneter bertujuan menaikkan suku bunga riil di atas ekspektasi inflasi, bukan sekadar penyesuaian nominal pasif.</li></ul></div>"
            },
            {
                "id": "s2_q3",
                "theoryKey": "transmisi_moneter",
                "theoryTitle": "Kebijakan Moneter Ekspansif & Pemulihan Resesi",
                "scenario": "⚙️ Saluran Transmisi Suku Bunga",
                "question": "Manakah urutan transmisi moneter jalur suku bunga yang paling akurat sejak bank sentral menaikkan BI-Rate hingga tercapainya stabilitas harga?",
                "options": [
                    "BI-Rate naik → Suku bunga PUAB & deposito naik → Bunga kredit naik → Permintaan agregat melambat → Tekanan inflasi mereda",
                    "BI-Rate naik → Permintaan kredit investasi melonjak tajam → Kapasitas pabrik meluas seketika → Harga komoditas anjlok",
                    "BI-Rate naik → Pasokan uang primer di bank sentral berlipat ganda → Nilai tukar terdepresiasi → Ekspor neto menekan harga",
                    "BI-Rate naik → Penerimaan pajak pemerintah meningkat drastis → Defisit anggaran tertutup → Inflasi administered turun"
                ],
                "correct": 0,
                "hint": "Transmisi berjalan dari pasar uang perbankan, ke bunga pinjaman riil, ke pelemahan permintaan barang agregat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Transmisi suku bunga dimulai dari kenaikan suku bunga pasar uang antar-bank (IndONIA), merambat ke kenaikan bunga deposito dan kredit perbankan, menurunkan volume kredit dan investasi, mendinginkan permintaan agregat, dan akhirnya menurunkan laju inflasi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Kenaikan suku bunga menaikkan biaya kredit sehingga permintaan pinjaman investasi menurun, bukan melonjak.</li><li><strong>Opsi C:</strong> BI-Rate naik bersifat kontraktif dan menyerap likuiditas, bukan melipatgandakan pasokan uang primer.</li><li><strong>Opsi D:</strong> Kenaikan BI-Rate adalah instrumen kebijakan moneter independen, bukan mekanisme pemungutan pajak fiskal kementerian.</li></ul></div>"
            },
            {
                "id": "s2_q4",
                "theoryKey": "perangkap_likuiditas",
                "theoryTitle": "Perangkap Likuiditas (Liquidity Trap)",
                "scenario": "📉 Menolong Resesi: Moneter Ekspansif",
                "question": "Ketika perekonomian dilanda kelesuan output dan pelemahan daya beli yang parah, respons bauran kebijakan moneter apakah yang ditempuh oleh bank sentral?",
                "options": [
                    "Menaikkan rasio Giro Wajib Minimum dan memperketat persyaratan likuiditas primer seluruh bank umum",
                    "Menurunkan suku bunga kebijakan dan melonggarkan likuiditas makroprudensial untuk menstimulasi kredit riil",
                    "Menjual instrumen surat utang bank sentral secara agresif guna menarik cadangan likuiditas dari sistem perbankan",
                    "Membatasi plafon pemberian kredit produktif korporasi agar tingkat perputaran uang tidak menciptakan deflasi"
                ],
                "correct": 1,
                "hint": "Kebijakan ekspansif (dovish) menurunkan biaya pendanaan dan menyuntikkan likuiditas ke sistem perekonomian!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam menghadapi resesi, bank sentral menerapkan <em>Expansionary Monetary Policy</em> dengan memangkas suku bunga acuan (BI-Rate) dan melonggarkan ketentuan makroprudensial untuk menurunkan bunga kredit dan mendorong perbankan menyalurkan pembiayaan ke dunia usaha.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menaikkan GWM menyedot dana perbankan (kebijakan kontraktif), yang justru memperparah kelesuan ekonomi.</li><li><strong>Opsi C:</strong> Menjual surat utang menyerap likuiditas perbankan, bertentangan dengan kebutuhan stimulus resesi.</li><li><strong>Opsi D:</strong> Membatasi pagu kredit menghambat pertumbuhan sektor riil yang sedang membutuhkan suntikan modal kerja.</li></ul></div>"
            },
            {
                "id": "s2_q5",
                "theoryKey": "transmisi_moneter",
                "theoryTitle": "Selisih Suku Bunga (Interest Rate Differential)",
                "scenario": "🪤 Perangkap Likuiditas (Liquidity Trap)",
                "question": "Mengapa ketika suku bunga acuan nominal telah mendekati batas nol (Zero Lower Bound), penurunan suku bunga lebih lanjut sering kehilangan efektivitasnya?",
                "options": [
                    "Obligasi pemerintah secara hukum kehilangan status bebas risiko sehingga perbankan berhenti beroperasi",
                    "Terjadi perangkap likuiditas di mana pelaku ekonomi menimbun kas karena ekspektasi imbal hasil investasi sangat rendah",
                    "Uang kartal fisik secara otomatis mengalami depresiasi terhadap instrumen uang giral digital perbankan",
                    "Seluruh bank umum dipaksa memindahkan portofolio asetnya ke rekening cadangan devisa internasional"
                ],
                "correct": 1,
                "hint": "Konsep Keynesian: ketika bunga sangat rendah, kurva permintaan uang elastis sempurna sehingga orang memilih memegang kas!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam kondisi <em>Liquidity Trap</em> pada batas <em>Zero Lower Bound</em>, elastisitas permintaan uang terhadap suku bunga menjadi sangat tinggi. Pelaku usaha dan rumah tangga lebih memilih memegang kas likuid karena pesimisme ekonomi, sehingga penurunan suku bunga gagal mendorong ekspansi pinjaman riil.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Surat utang pemerintah tetap memiliki status sovereign debt dan sistem perbankan tetap beroperasi.</li><li><strong>Opsi C:</strong> Nilai nominal uang kartal dan giral tetap paritas 1:1 di bawah sistem moneter legal.</li><li><strong>Opsi D:</strong> Bank umum tidak diwajibkan mengalihkan seluruh portofolionya ke aset valas saat suku bunga domestik rendah.</li></ul></div>"
            },
            {
                "id": "s2_q6",
                "theoryKey": "gwm",
                "theoryTitle": "Giro Wajib Minimum (GWM) Perbankan",
                "scenario": "🌐 Selisih Suku Bunga & Kurs Rupiah",
                "question": "Jika Bank Indonesia menaikkan BI-Rate saat suku bunga bank sentral AS (Fed Funds Rate) tidak berubah, mengapa nilai tukar Rupiah cenderung mengalami apresiasi?",
                "options": [
                    "Kenaikan suku bunga domestik seketika menurunkan nilai impor bahan baku energi tanpa mekanisme pasar",
                    "Pelebaran selisih suku bunga (interest rate differential) menarik aliran masuk modal asing ke instrumen berdenominasi rupiah",
                    "Bank sentral mitra dagang wajib menukarkan cadangan emasnya ke dalam mata uang rupiah secara berkala",
                    "Eksportir domestik secara otomatis menerima pembayaran kontrak perdagangan murni dalam mata uang kartal rupiah"
                ],
                "correct": 1,
                "hint": "Modal portofolio global bergerak mengejar imbal hasil aset yang lebih tinggi dan kompetitif!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kenaikan BI-Rate memperlebar selisih imbal hasil (<em>yield spread</em>) aset keuangan domestik dibandingkan aset luar negeri. Investor global terdorong memarkir dana di obligasi dan sekuritas rupiah (<em>capital inflow</em>), memperbesar permintaan valas untuk dikonversi ke Rupiah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Nilai impor tetap dipengaruhi volume riil dan harga komoditas global, bukan terpangkas seketika tanpa transmisi.</li><li><strong>Opsi C:</strong> Bank sentral negara mitra tidak memiliki kewajiban menukar cadangan emas ke rupiah akibat pergeseran BI-Rate.</li><li><strong>Opsi D:</strong> Mata uang transaksi ekspor ditentukan oleh kontrak komersial internasional, bukan berubah otomatis karena bunga BI.</li></ul></div>"
            },
            {
                "id": "s2_q7",
                "theoryKey": "transmisi_moneter",
                "theoryTitle": "Operasi Pasar Terbuka & Instrumen SRBI",
                "scenario": "🏛️ Giro Wajib Minimum (GWM)",
                "question": "Bank Indonesia memutuskan menaikkan rasio Giro Wajib Minimum (GWM) rupiah bagi bank umum. Bagaimana dampak langsung mekanisme ini terhadap kapasitas intermediasi perbankan?",
                "options": [
                    "Menambah ketersediaan dana menganggur bank untuk disalurkan ke portofolio kredit komersial korporasi",
                    "Mengunci sebagian porsi dana pihak ketiga di rekening giro bank sentral, sehingga likuiditas kredit mengetat",
                    "Menghilangkan kewajiban perbankan dalam memenuhi kecukupan modal minimum menurut pilar Basel III",
                    "Memaksa bank umum menghentikan seluruh transaksi kliring valuta asing dengan lembaga keuangan luar negeri"
                ],
                "correct": 1,
                "hint": "GWM adalah persentase simpanan masyarakat yang wajib disimpan di bank sentral dan tidak boleh dipinjamkan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Giro Wajib Minimum (GWM) adalah simpanan minimum bank umum pada BI yang dihitung dari persentase DPK. Menaikkan rasio GWM mengunci porsi dana yang dapat dipinjamkan, menyerap likuiditas perbankan secara kuantitatif, dan menahan laju ekspansi kredit.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menaikkan GWM justru mengurangi dana menganggur (<em>excess reserves</em>) yang dapat dijadikan kredit.</li><li><strong>Opsi C:</strong> Ketentuan rasio kecukupan modal (CAR Basel III) tetap berlaku terpisah dari persyaratan cadangan likuiditas GWM.</li><li><strong>Opsi D:</strong> Transaksi kliring valas tetap berjalan normal sesuai regulasi sistem pembayaran internasional.</li></ul></div>"
            },
            {
                "id": "s2_q8",
                "theoryKey": "lender_of_last_resort",
                "theoryTitle": "Lender of Last Resort (Fasilitas Likuiditas Terakhir)",
                "scenario": "🔄 Efek Pengganda Uang (Money Multiplier)",
                "question": "Dalam sistem perbankan cadangan fraksional, jika rasio cadangan wajib perbankan (reserve requirement) ditetapkan sebesar 10% dan tidak ada kebocoran uang tunai, berapakah nilai Money Multiplier teoretis?",
                "options": [
                    "Sebesar 1,10, yang dihitung dari penambahan unit cadangan terhadap modal awal perbankan",
                    "Sebesar 10,0, yang merupakan kebalikan matematis langsung dari rasio cadangan wajib perbankan",
                    "Sebesar 0,10, karena kapasitas penciptaan uang giral dibatasi oleh proporsi simpanan wajib",
                    "Sebesar 100,0, karena setiap unit simpanan dapat dipinjamkan berulang tanpa batas kehati-hatian"
                ],
                "correct": 1,
                "hint": "Rumus angka pengganda uang sederhana adalah m = 1 / rr (reserve requirement ratio)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam model perbankan cadangan fraksional dasar tanpa kebocoran uang kartal, angka pengganda uang adalah <em>m = 1 / rr</em> = 1 / 0,10 = 10. Setiap injeksi Rp 1 triliun uang primer teoretis dapat menciptakan total uang beredar hingga Rp 10 triliun melalui ekspansi kredit giral.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Angka 1,10 didapat dari penjumlahan 1 + 0,10, bukan formula pembagian invers cadangan.</li><li><strong>Opsi C:</strong> Angka 0,10 adalah besaran rasio cadangan fraksional itu sendiri, bukan faktor penggandanya.</li><li><strong>Opsi D:</strong> Nilai 100 hanya mungkin tercapai jika rasio cadangan wajib dipangkas hingga 1% (1 / 0,01 = 100).</li></ul></div>"
            },
            {
                "id": "s2_q9",
                "theoryKey": "itf",
                "theoryTitle": "Inflation Targeting Framework (ITF)",
                "scenario": "📜 Operasi Pasar Terbuka (SRBI)",
                "question": "Bank Indonesia menerbitkan instrumen Sekuritas Rupiah Bank Indonesia (SRBI) di pasar uang. Apakah fungsi strategis utama dari penerbitan instrumen operasi moneter pro-market ini?",
                "options": [
                    "Menyediakan pembiayaan utang defisit APBN kementerian secara langsung tanpa persetujuan DPR",
                    "Menyerap kelebihan likuiditas rupiah sekaligus menarik aliran portofolio asing guna memperkuat stabilitas kurs",
                    "Menggantikan seluruh peredaran uang kertas dan logam dengan obligasi jangka menengah perbankan",
                    "Membatasi hak bank umum swasta dalam menyalurkan pembiayaan kredit investasi ke sektor industri"
                ],
                "correct": 1,
                "hint": "SRBI beraset dasar SBN yang dimiliki BI, diterbitkan untuk menyerap likuiditas domestik dan memikat inflow investor asing!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> SRBI diterbitkan dalam rangka operasi moneter kontraktif pro-market yang mengizinkan kepemilikan non-residen. Instrumen ini berfungsi menyerap likuiditas rupiah jangka pendek di pasar uang sekaligus menarik <em>capital inflows</em> untuk memperkokoh stabilitas nilai tukar Rupiah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> SRBI adalah instrumen moneter BI dengan <em>underlying</em> portofolio SBN yang telah dimiliki BI, bukan surat utang pembiayaan APBN.</li><li><strong>Opsi C:</strong> Uang kartal tetap menjadi alat pembayaran tunai yang sah; SRBI adalah instrumen pasar uang wholesale.</li><li><strong>Opsi D:</strong> SRBI mengelola likuiditas makro dan suku bunga pasar, bukan instrumen kuota kredit perbankan swasta.</li></ul></div>"
            },
            {
                "id": "s2_q10",
                "theoryKey": "teori_kuantitas_uang",
                "theoryTitle": "Agregat Moneter M1 vs M2 (Likuiditas Perekonomian)",
                "scenario": "🏦 Fasilitas Diskonto (Lending Facility)",
                "question": "Ketika sebuah bank umum mengalami defisit likuiditas pada akhir hari penyelesaian kliring, fasilitas likuiditas apakah yang disediakan oleh Bank Indonesia sebagai bagian dari koridor suku bunga?",
                "options": [
                    "Fasilitas Simpanan Bank Indonesia (Deposit Facility) untuk menempatkan kelebihan saldo kas",
                    "Lending Facility (Fasilitas Diskonto) yang memberikan pinjaman jangka sangat pendek beragunan",
                    "Penyertaan Modal Sementara oleh Lembaga Penjamin Simpanan guna merestrukturisasi kepemilikan saham",
                    "Penjualan aset produktif kredit perbankan kepada kementerian keuangan dengan potongan harga tetap"
                ],
                "correct": 1,
                "hint": "Fasilitas batas atas koridor bunga di mana bank meminjam likuiditas semalam (overnight) dari bank sentral dengan jaminan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Lending Facility</em> (Fasilitas Penyediaan Dana / Diskonto) adalah fasilitas BI yang meminjamkan likuiditas rupiah overnight kepada bank yang kekurangan dana kliring dengan suku bunga di atas BI-Rate dan dijamin surat berharga berkualitas tinggi (SBN).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> <em>Deposit Facility</em> digunakan saat bank memiliki kelebihan likuiditas untuk ditempatkan di BI, bukan kekurangan dana.</li><li><strong>Opsi C:</strong> Penanganan LPS dilakukan pada bank yang ditetapkan gagal bayar dalam proses resolusi, bukan mismatch kliring harian biasa.</li><li><strong>Opsi D:</strong> Bank umum tidak menjual aset kreditnya ke Kemenkeu untuk menyelesaikan saldo penutupan kliring harian.</li></ul></div>"
            },
            {
                "id": "s2_q11",
                "theoryKey": "kurs_valas",
                "theoryTitle": "Strategi Intervensi Tiga Jalur (Triple Intervention BI)",
                "scenario": "🔒 Fasilitas Simpanan BI (Deposit Facility)",
                "question": "Jika bank umum memiliki surplus likuiditas kas pada sore hari dan bermaksud menempatkan dananya secara aman di bank sentral semalam (overnight), instrumen apakah yang menjadi batas bawah koridor suku bunga?",
                "options": [
                    "Lending Facility, yang mengenakan biaya penalti pinjaman atas kelebihan cadangan perbankan",
                    "Deposit Facility (Fasilitas Simpanan BI), yang memberikan imbal bunga atas penempatan dana semalam",
                    "Giro Wajib Minimum Valas, yang mewajibkan bank mengonversi seluruh kelebihan rupiah ke valas",
                    "Pasar Sekunder SBN, tempat kementerian keuangan membeli kembali obligasi ritel secara diskon"
                ],
                "correct": 1,
                "hint": "Batas bawah suku bunga kebijakan tempat bank menaruh likuiditas berlebih tanpa risiko gagal bayar!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Deposit Facility (FasBI)</em> merupakan batas bawah koridor suku bunga operasional BI (biasanya BI-Rate minus 75 bps). Bank yang mengalami kelebihan likuiditas dapat menempatkan dananya semalam di BI untuk memperoleh imbal hasil bebas risiko kredit.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Lending facility adalah batas atas suku bunga pinjaman bagi bank yang kekurangan likuiditas.</li><li><strong>Opsi C:</strong> GWM Valas adalah ketentuan cadangan simpanan valas, bukan fasilitas penempatan likuiditas surplus rupiah.</li><li><strong>Opsi D:</strong> Pasar sekunder SBN melibatkan perdagangan obligasi antar-investor, bukan fasilitas penempatan dana harian di BI.</li></ul></div>"
            },
            {
                "id": "s2_q12",
                "theoryKey": "itf",
                "theoryTitle": "Tim Pengendalian Inflasi Daerah (TPID)",
                "scenario": "🛡️ Lender of Last Resort",
                "question": "Mengapa dalam prinsip perbankan sentral modern (Bagehot's Dictum), bantuan likuiditas darurat (Lender of Last Resort) hanya boleh disalurkan kepada bank yang mengalami krisis likuiditas, bukan krisis solvabilitas?",
                "options": [
                    "Bank yang tidak solvabel secara otomatis dibebaskan dari pengawasan otoritas jasa keuangan dan hukum kepailitan",
                    "Menyelamatkan bank insolven (modal negatif) dengan pinjaman moneter memicu kerugian negara dan bahaya moral hazard",
                    "Likuiditas darurat hanya diterbitkan dalam bentuk obligasi mata uang asing yang tidak dapat digunakan di pasar domestik",
                    "Bank sentral diwajibkan mengambil alih seluruh saham debitur bermasalah sebelum fasilitas likuiditas dapat dicairkan"
                ],
                "correct": 1,
                "hint": "Bank yang kekurangan uang tunai sementara (illiquid) harus dibantu, tapi bank yang modalnya sudah bangkrut (insolvent) adalah ranah resolusi/likuidasi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Aturan klasik Walter Bagehot menyatakan bank sentral harus meminjamkan secara bebas kepada bank yang likuiditasnya tertekan namun memiliki modal sehat (<em>illiquid but solvent</em>) dengan agunan memadai. Membantu bank bangkrut (<em>insolvent</em>) memicu <em>moral hazard</em> dan berisiko merugikan kas publik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Bank insolven tetap berada di bawah pengawasan ketat OJK dan mekanisme resolusi LPS.</li><li><strong>Opsi C:</strong> Fasilitas likuiditas darurat moneter domestik disalurkan dalam mata uang Rupiah dengan agunan aset berkualitas tinggi.</li><li><strong>Opsi D:</strong> Bank sentral tidak bertindak sebagai pemegang saham ekuitas perbankan komersial dalam skema fasilitas likuiditas.</li></ul></div>"
            }
        ]
    },
    {
        "id": 4,
        "title": "Level 04: Operasi Bank Sentral",
        "subtitle": "Mandat Stabilitas BI, Transmisi Suku Bunga, GWM, dan Pengganda Uang",
        "theme": "centralbank",
        "unlocks": "Gelar: Inisiator Moneter",
        "questionPool": [
            {
                "id": "s2_q13",
                "theoryKey": "kurs_valas",
                "theoryTitle": "Suku Bunga Riil Negatif & Pelarian Modal (Capital Flight)",
                "scenario": "🎯 Inflation Targeting Framework (ITF)",
                "question": "Apakah pilar operasional utama yang membedakan kerangka penargetan inflasi (Inflation Targeting Framework / ITF) dibandingkan rezim moneter berbasis target kuantitas uang beredar murni?",
                "options": [
                    "Penetapan target nilai tukar tetap (fixed peg) terhadap sekeranjang mata uang mitra dagang utama",
                    "Pengumuman target inflasi eksplisit kepada publik serta penggunaan suku bunga kebijakan yang berpandangan ke depan (forward-looking)",
                    "Kewajiban pemerintah menyetorkan seluruh saldo penerimaan cukai ke rekening cadangan devisa bank sentral",
                    "Penghapusan mekanisme pasar modal dan pembatasan konversi valas antar-pelaku usaha swasta domestik"
                ],
                "correct": 1,
                "hint": "ITF menggunakan suku bunga acuan sebagai sinyal kebijakan dengan target inflasi transparan yang diproyeksikan ke depan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Ciri fundamental <em>Inflation Targeting Framework (ITF)</em> adalah pengumuman sasaran inflasi kuantitatif secara eksplisit, komitmen terhadap transparansi dan akuntabilitas, serta penetapan suku bunga kebijakan berorientasi masa depan (<em>forward-looking</em>) sebagai jangkar nominal.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Rezim ITF mengadopsi sistem nilai tukar mengambang (<em>flexible exchange rate</em>), bukan pematokan kurs kaku (<em>fixed peg</em>).</li><li><strong>Opsi C:</strong> Pengelolaan penerimaan cukai adalah otoritas fiskal Kementerian Keuangan dalam struktur kas negara.</li><li><strong>Opsi D:</strong> ITF beroperasi di dalam ekosistem pasar keuangan yang efisien tanpa mematikan mekanisme pasar modal.</li></ul></div>"
            },
            {
                "id": "s2_q14",
                "theoryKey": "transmisi_moneter",
                "theoryTitle": "Suku Bunga Pasar Uang Antar-Bank (IndONIA)",
                "scenario": "💵 Agregat Moneter M1 vs M2",
                "question": "Dalam metodologi pembagian uang beredar di Indonesia, pos keuangan manakah yang membedakan Uang Beredar Luas (M2) dari Uang Beredar Sempit (M1)?",
                "options": [
                    "Uang kartal kertas dan logam yang beredar di luar perbankan serta saldo giro kas negara",
                    "Uang kuasi (deposito berjangka, tabungan, dan rekening giro valas) serta surat berharga selain saham",
                    "Portofolio ekuitas saham dan reksa dana pasar modal yang dimiliki oleh investor perorangan",
                    "Cadangan devisa emas moneter dan hak tarik khusus (SDR) yang dicatat di neraca bank sentral"
                ],
                "correct": 1,
                "hint": "M1 adalah kas fisik + giro rupiah; M2 adalah M1 ditambah uang kuasi (deposito, tabungan berjangka, dll)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>M1</em> hanya mencakup instrumen transaksi paling likuid (uang kartal di luar bank umum dan uang giral rupiah). Sedangkan <em>M2 (Uang Beredar Luas)</em> mencakup M1 ditambah <em>Uang Kuasi</em> (simpanan berjangka/deposito, tabungan rupiah lainnya, giro valas) dan surat berharga yang diterbitkan perbankan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Uang kartal adalah komponen utama pembentuk M1, bukan pos pembeda M2.</li><li><strong>Opsi C:</strong> Saham dan reksa dana adalah aset pasar modal yang tidak diklasifikasikan ke dalam agregat moneter perbankan M2.</li><li><strong>Opsi D:</strong> Emas moneter dan SDR adalah cadangan devisa internasional di neraca BI, bukan komponen uang beredar masyarakat.</li></ul></div>"
            },
            {
                "id": "s2_q15",
                "theoryKey": "forward_guidance",
                "theoryTitle": "Panduan Kebijakan Masa Depan (Forward Guidance)",
                "scenario": "🏠 Kebijakan Rasio Loan to Value (LTV)",
                "question": "Jika bank sentral mendeteksi adanya gelembung spekulasi harga properti residensial (Housing Bubble), instrumen makroprudensial apakah yang paling lazim diketatkan?",
                "options": [
                    "Menurunkan tarif pajak bumi dan bangunan komersial bagi seluruh pengembang perumahan",
                    "Menurunkan plafon rasio Loan-to-Value (LTV) sehingga pembeli wajib menyediakan uang muka (down payment) lebih besar",
                    "Menghapus persyaratan penilaian kelayakan agunan dan batas penghasilan bagi debitur perorangan",
                    "Mewajibkan seluruh bank umum mengalokasikan kredit perumahan bersubsidi tanpa batasan rasio modal"
                ],
                "correct": 1,
                "hint": "Memperketat LTV berarti membatasi porsi pinjaman dari harga rumah, mewajibkan modal sendiri (DP) yang lebih tinggi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Menurunkan rasio <em>Loan-to-Value (LTV)</em> (atau Financing-to-Value) membatasi persentase pembiayaan bank terhadap nilai agunan rumah. Hal ini mewajibkan debitur menyediakan uang muka lebih tinggi, menahan pertumbuhan leverage utang dan meredam laju spekulasi harga properti.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pajak bumi dan bangunan adalah wewenang fiskal pemerintah daerah, bukan instrumen makroprudensial moneter.</li><li><strong>Opsi C:</strong> Menghapus uji agunan justru memicu kredit macet dan melipatgandakan risiko gelembung kredit (*subprime*).</li><li><strong>Opsi D:</strong> Membebaskan rasio permodalan bertentangan dengan prinsip kehati-hatian pengawasan risiko sistemik perbankan.</li></ul></div>"
            },
            {
                "id": "s2_q16",
                "theoryKey": "transmisi_kredit",
                "theoryTitle": "Jalur Kredit Perbankan (Bank Lending Channel)",
                "scenario": "🧱 Countercyclical Capital Buffer (CCB)",
                "question": "Mengapa bank sentral mewajibkan bank umum memupuk modal tambahan melalui instrumen Countercyclical Capital Buffer (CCyB) saat fase ekspansi kredit melaju sangat pesat?",
                "options": [
                    "Memaksa bank menghentikan seluruh penyaluran kredit produktif agar margin laba bersih tidak meningkat",
                    "Membangun bantalan ketahanan modal saat kondisi ekonomi subur untuk menyerap potensi kerugian saat siklus berbalik menurun",
                    "Menjamin pemegang saham pengendali menerima dividen kas bebas pajak selama fase pertumbuhan ekonomi tinggi",
                    "Mengalihkan cadangan modal bank ke rekening kementerian keuangan untuk membiayai pengeluaran APBN"
                ],
                "correct": 1,
                "hint": "Prinsip kontrasiklikal: mengumpulkan cadangan bantalan permodalan saat masa baik agar siap ketika masa sulit datang!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Countercyclical Capital Buffer (CCyB)</em> adalah modal penyangga tambahan (0%–2,5% ATMR) yang diwajibkan saat pertumbuhan kredit berlebihan (<em>excessive credit growth</em>). Tujuannya meredam ekspansi risiko berlebih sekaligus menjadi bantalan modal untuk menyerap kredit macet saat krisis tiba.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> CCyB bertujuan mengelola risiko sistemik dan menyehatkan ekspansi kredit, bukan mematikan total kredit produktif.</li><li><strong>Opsi C:</strong> CCyB justru menahan pembagian dividen laba ditahan untuk dijadikan penguat modal bank.</li><li><strong>Opsi D:</strong> Cadangan CCyB tetap berada di neraca modal bank yang bersangkutan, bukan dialihkan ke kas kementerian keuangan.</li></ul></div>"
            },
            {
                "id": "s2_q17",
                "theoryKey": "makroprudensial_ltv",
                "theoryTitle": "Rasio Pinjaman terhadap Agunan (Loan-to-Value / LTV)",
                "scenario": "📈 Inversi Kurva Imbal Hasil (Yield Curve Inversion)",
                "question": "Dalam analisis pasar keuangan, mengapa fenomena Inversi Kurva Imbal Hasil (Yield Curve Inversion)—di mana yield obligasi tenor pendek melampaui tenor panjang—sering dibaca sebagai sinyal ancaman resesi?",
                "options": [
                    "Pasar memperkirakan inflasi jangka panjang akan melesat tak terkendali melampaui suku bunga bank sentral",
                    "Pasar mengantisipasi pelemahan ekonomi mendatang sehingga bertaruh bank sentral akan terpaksa memangkas suku bunga di masa depan",
                    "Pemerintah mengumumkan pembatalan kewajiban pembayaran bunga kupon bagi seluruh obligasi negara jangka panjang",
                    "Investor institusi beralih memegang aset fisik komoditas primer karena seluruh pasar modal ditutup sementara"
                ],
                "correct": 1,
                "hint": "Investor bersedia mengunci yield jangka panjang yang lebih rendah karena memprediksi ekonomi akan lesu dan bunga acuan akan anjlok!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Inversi kurva terjadi ketika yield obligasi jangka pendek tinggi akibat pengetatan moneter, sementara yield tenor panjang turun karena investor berekspektasi resesi akan terjadi dan memaksa bank sentral memangkas suku bunga di masa depan, mendorong lonjakan permintaan obligasi jangka panjang.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Jika pasar memperkirakan inflasi jangka panjang meroket, yield tenor panjang justru akan melonjak naik (kurva curam).</li><li><strong>Opsi C:</strong> Surat utang negara berstatus sovereign obligator tidak pernah membatalkan kupon bunga secara sepihak dalam kondisi normal.</li><li><strong>Opsi D:</strong> Perdagangan pasar obligasi tetap aktif; inversi adalah fenomena penetapan harga aset, bukan penutupan bursa.</li></ul></div>"
            },
            {
                "id": "s2_q18",
                "theoryKey": "pengetatan_kuantitatif",
                "theoryTitle": "Pengetatan Kuantitatif (Quantitative Tightening / QT)",
                "scenario": "📢 Forward Guidance & Manajemen Ekspektasi",
                "question": "Apakah esensi dari strategi komunikasi kebijakan 'Forward Guidance' yang diterapkan bank sentral modern dalam memandu ekspektasi pasar?",
                "options": [
                    "Merilis keputusan suku bunga acuan secara mendadak di tengah malam tanpa penjelasan analisis resmi",
                    "Menyampaikan indikasi transparan mengenai arah lintasan suku bunga dan kondisi ekonomi yang mendasarinya guna mengurangi ketidakpastian",
                    "Menjamin bahwa tingkat suku bunga acuan tidak akan pernah diubah selama periode kepemimpinan dewan gubernur",
                    "Membagikan data rahasia perbankan individual kepada investor institusi terpilih sebelum pengumuman publik"
                ],
                "correct": 1,
                "hint": "Bank sentral mengomunikasikan arah kebijakan di masa depan agar pasar tidak mengalami gejolak mendadak!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Forward Guidance</em> adalah instrumen komunikasi moneter di mana bank sentral memandu ekspektasi publik mengenai prospek suku bunga kebijakan ke depan berbasis data ekonomi (<em>state-contingent</em>). Langkah ini meminimalkan volatilitas pasar dan meningkatkan efektivitas transmisi moneter.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Mengambil keputusan mendadak tanpa transparansi melanggar prinsip kredibilitas dan memicu kepanikan pasar uang.</li><li><strong>Opsi C:</strong> Bank sentral tidak pernah memberikan garansi mutlak tanpa syarat; kebijakan selalu bergantung pada dinamika data ekonomi riil.</li><li><strong>Opsi D:</strong> Informasi kebijakan moneter dirilis serentak dan setara kepada publik, bukan melalui pembocoran asimetris.</li></ul></div>"
            },
            {
                "id": "s2_q19",
                "theoryKey": "taylor_rule",
                "theoryTitle": "Aturan Suku Bunga Taylor (Taylor Rule)",
                "scenario": "⚠️ Bahaya Monetisasi Utang Langsung",
                "question": "Mengapa undang-undang membatasi secara ketat pembelian Surat Berharga Negara (SBN) langsung di pasar perdana oleh Bank Indonesia (Direct Debt Monetization)?",
                "options": [
                    "Mencegah runtuhnya disiplin fiskal dan risiko ledakan uang beredar yang dapat memicu hiperinflasi serta depresiasi kurs",
                    "Karena kementerian keuangan memiliki cadangan kas valuta asing yang melimpah sehingga tidak memerlukan pembiayaan pasar",
                    "Karena surat berharga negara hanya diizinkan untuk dibeli oleh perbankan swasta asing yang memiliki izin emisi khusus",
                    "Agar seluruh defisit anggaran pemerintah dibiayai murni melalui pinjaman utang luar negeri komersial bilateral"
                ],
                "correct": 0,
                "hint": "Monetisasi utang langsung membuat pencetakan uang dipakai menutup belanja fiskal, merusak kredibilitas nilai uang!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pembelian SBN langsung di pasar perdana oleh bank sentral adalah monetisasi utang (mencetak uang untuk belanja negara). Pembatasan ketat ini esensial untuk menjaga independensi bank sentral, menegakkan disiplin fiskal pemerintah, dan mencegah hilangnya kepercayaan terhadap mata uang (hiperinflasi).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Pemerintah menerbitkan SBN justru untuk membiayai defisit APBN, bukan karena memiliki kas berlebih yang menganggur.</li><li><strong>Opsi C:</strong> SBN pasar perdana dibeli secara lelang terbuka oleh perbankan domestik, dealer utama, dan investor publik.</li><li><strong>Opsi D:</strong> Kebijakan utang negara justru memprioritaskan pembiayaan SBN rupiah domestik dibanding ketergantungan utang valas luar negeri.</li></ul></div>"
            },
            {
                "id": "s2_q20",
                "theoryKey": "transmisi_nilai_tukar",
                "theoryTitle": "Jalur Nilai Tukar Transmisi Moneter",
                "scenario": "🌊 Quantitative Easing (QE)",
                "question": "Ketika bank sentral negara maju menjalankan Pelonggaran Kuantitatif (Quantitative Easing / QE) dalam skala masif, mekanisme operasional apakah yang dijalankan?",
                "options": [
                    "Mencetak uang kertas fisik dan mendistribusikannya secara langsung kepada rumah tangga melalui kantor pos",
                    "Membeli obligasi pemerintah dan sekuritas swasta di pasar sekunder dengan menciptakan saldo cadangan perbankan elektronik",
                    "Memaksa bank umum mengonversi seluruh simpanan nasabah menjadi kepemilikan saham korporasi industri",
                    "Menetapkan larangan impor atas seluruh komoditas konsumsi untuk menaikkan harga pasar domestik"
                ],
                "correct": 1,
                "hint": "QE adalah pembelian aset keuangan jangka panjang di pasar sekunder oleh bank sentral untuk menyuntikkan likuiditas dan menurunkan imbal hasil jangka panjang!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam <em>Quantitative Easing (QE)</em>, bank sentral membeli aset keuangan jangka panjang (seperti obligasi pemerintah dan MBS) di pasar sekunder menggunakan saldo cadangan elektronik yang baru diciptakan. Tujuannya menekan yield jangka panjang dan membanjiri likuiditas sistem perbankan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> QE beroperasi melalui penciptaan cadangan bank sentral elektronik di pasar modal, bukan membagikan uang tunai fisik helikopter.</li><li><strong>Opsi C:</strong> Simpanan nasabah tetap dijamin dan berada di tabungan bank, tidak dikonversi sepihak menjadi ekuitas swasta.</li><li><strong>Opsi D:</strong> Kebijakan kuota impor adalah instrumen perdagangan kementerian perdagangan, bukan operasional moneter QE.</li></ul></div>"
            },
            {
                "id": "s2_q21",
                "theoryKey": "jangkar_inflasi",
                "theoryTitle": "Jangkar Ekspektasi Inflasi (Anchoring Expectations)",
                "scenario": "🧊 Quantitative Tightening (QT)",
                "question": "Sebaliknya, ketika bank sentral mengadopsi Pengetatan Kuantitatif (Quantitative Tightening / QT), bagaimana neraca keuangan bank sentral disesuaikan?",
                "options": [
                    "Mengurangi ukuran neraca dengan membiarkan aset obligasi jatuh tempo tanpa reinvestasi atau menjualnya kembali ke pasar",
                    "Melipatgandakan pembelian aset sekuritas swasta guna menopang lonjakan harga obligasi pasar modal",
                    "Mengalihkan seluruh portofolio obligasi negara kepada lembaga perbankan asing tanpa kompensasi pembayaran",
                    "Mewajibkan kementerian keuangan melunasi seluruh pokok utang negara dalam bentuk emas batangan fisik"
                ],
                "correct": 0,
                "hint": "QT adalah proses normalisasi neraca bank sentral: menyusutkan portofolio obligasi yang dimiliki untuk menyerap likuiditas!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Quantitative Tightening (QT)</em> adalah kebalikan dari QE. Bank sentral menyusutkan neracanya (<em>balance sheet runoff</em>) dengan tidak menginvestasikan kembali pokok obligasi yang jatuh tempo atau secara aktif menjual aset sekuritas ke pasar, sehingga likuiditas perbankan terserap kembali.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Membeli aset sekuritas tambahan adalah karakteristik ekspansi kuantitatif (QE), bukan pengetatan (QT).</li><li><strong>Opsi C:</strong> Aset obligasi diperjualbelikan secara komersial di pasar keuangan, tidak pernah diserahkan gratis tanpa pembayaran.</li><li><strong>Opsi D:</strong> Pelunasan obligasi negara dilakukan sesuai perjanjian kontraktual dengan mata uang resmi, bukan emas fisik paksaan.</li></ul></div>"
            },
            {
                "id": "s2_q22",
                "theoryKey": "uang_primer",
                "theoryTitle": "Uang Primer / Basis Moneter (M0)",
                "scenario": "🪞 Efek Fisher: Bunga Riil vs Nominal",
                "question": "Berdasarkan Persamaan Fisher (Fisher Equation), jika suku bunga deposito nominal perbankan adalah 7% per tahun sementara ekspektasi inflasi sebesar 4% per tahun, berapakah perkiraan suku bunga riil yang diperoleh penabung?",
                "options": [
                    "Sekitar 11%, yang diperoleh dari penjumlahan suku bunga nominal dengan tingkat kenaikan harga barang",
                    "Sekitar 3%, karena suku bunga riil mencerminkan imbal hasil nominal setelah dikurangi laju inflasi",
                    "Sekitar 1,75%, yang dihitung dari rasio bagi langsung antara suku bunga nominal terhadap inflasi",
                    "Tetap 7%, karena nilai bunga yang disepakati dalam kontrak perbankan bersifat mengikat secara hukum"
                ],
                "correct": 1,
                "hint": "Rumus Fisher aproksimasi: r ≈ i - π (Suku Bunga Riil ≈ Suku Bunga Nominal - Laju Inflasi)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Berdasarkan formula <em>Fisher Effect</em>: <em>r ≈ i - π</em> (di mana <em>r</em> = suku bunga riil, <em>i</em> = suku bunga nominal, <em>π</em> = inflasi). Maka <em>r</em> ≈ 7% - 4% = 3%. Daya beli tabungan sebenarnya hanya bertambah 3% per tahun dalam bentuk barang/jasa fisik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menjumlahkan 7% + 4% = 11% mengabaikan fakta bahwa inflasi mengikis daya beli simpanan, bukan menambahkannya.</li><li><strong>Opsi C:</strong> Angka 1,75 adalah hasil bagi 7 / 4, yang merupakan kekeliruan metodologi formula Fisher.</li><li><strong>Opsi D:</strong> Menganggap suku bunga nominal sebagai pertumbuhan daya beli murni adalah bentuk jebakan ilusi uang (<em>money illusion</em>).</li></ul></div>"
            },
            {
                "id": "s2_q23",
                "theoryKey": "beban_bunga_perbankan",
                "theoryTitle": "Margin Bunga Bersih (Net Interest Margin / NIM)",
                "scenario": "🛡️ Triple Intervention Bank Indonesia",
                "question": "Dalam mengawal stabilitas nilai tukar Rupiah di tengah turbulensi pasar keuangan global, strategi 'Triple Intervention' Bank Indonesia dioperasikan secara terpadu pada pasar mana saja?",
                "options": [
                    "Pasar saham IHSG, pasar komoditas beras Bulog, dan pasar lelang properti sitaan perbankan",
                    "Pasar spot valas, pasar valas domestik berjangka (DNDF), serta pembelian SBN di pasar sekunder",
                    "Pasar uang antar-bank syariah, pasar kredit mikro PNM, dan pasar pegadaian emas komersial",
                    "Pasar obligasi luar negeri, pasar bahan bakar subsidi, dan pasar penerimaan tarif cukai rokok"
                ],
                "correct": 1,
                "hint": "Tiga pilar intervensi: pasar tunai (spot), pasar lindung nilai forward (DNDF), dan penyerapan SBN pasar sekunder!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Strategi <em>Triple Intervention</em> Bank Indonesia mencakup: (1) Intervensi di pasar spot valas, (2) Intervensi di pasar DNDF (Domestic Non-Deliverable Forward) untuk memandu ekspektasi forward, dan (3) Pembelian SBN di pasar sekunder untuk menstabilkan yield dan likuiditas.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> BI tidak bertransaksi saham individual, beras konsumsi pangan, maupun lelang fisik properti komersial.</li><li><strong>Opsi C:</strong> Pasar kredit mikro dan pegadaian adalah ranah operasional industri pembiayaan, bukan pasar intervensi kurs BI.</li><li><strong>Opsi D:</strong> Subsidi BBM dan cukai tembakau adalah kewenangan kebijakan fiskal pemerintah di bawah Kementerian Keuangan.</li></ul></div>"
            },
            {
                "id": "s2_q24",
                "theoryKey": "pasar_repo",
                "theoryTitle": "Transaksi Repo (Repurchase Agreement)",
                "scenario": "🤝 Koordinasi TPID (Pengendalian Inflasi)",
                "question": "Mengapa pengendalian inflasi pangan bergejolak (volatile food) di Indonesia menuntut koordinasi erat antara bank sentral dan pemerintah daerah melalui wadah TPID?",
                "options": [
                    "Bank sentral memiliki kewenangan yuridis untuk mematok langsung harga cabai dan bawang merah di kios pasar",
                    "Inflasi pangan dominan dipicu oleh masalah rantai pasok, biaya logistik antardaerah, dan produksi yang merupakan yurisdiksi pemda",
                    "Pemerintah daerah bertindak sebagai pemegang hak cipta tunggal atas emisi uang kartal yang beredar di wilayahnya",
                    "Bank sentral wajib menyalurkan dana bantuan sosial tunai langsung menggunakan anggaran belanja dewan gubernur"
                ],
                "correct": 1,
                "hint": "BI mengelola permintaan agregat dan bunga uang, sedangkan pasokan fisik pangan, infrastruktur jalan, dan distribusi diatur Pemda!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Suku bunga BI-Rate tidak dapat menyelesaikan kelangkaan pupuk, cuaca buruk, atau hambatan jalan daerah. Diperlukan Tim Pengendalian Inflasi Daerah (TPID) dan gerakan GNPIP untuk memperkuat kerja sama antardaerah (KAD), subsidi logistik, dan kelancaran pasokan pangan fisik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> BI tidak memiliki mandat legal maupun instrumen untuk menetapkan harga barang kebutuhan pokok secara administratif.</li><li><strong>Opsi C:</strong> Hak emisi mata uang rupiah adalah hak tunggal bank sentral negara kesatuan Republik Indonesia, bukan daerah.</li><li><strong>Opsi D:</strong> Penyaluran bansos merupakan pos belanja bantuan sosial APBN/APBD yang dialokasikan oleh kementerian terkait.</li></ul></div>"
            },
            {
                "id": "s2_q25",
                "theoryKey": "kontrasiklikal_makroprudensial",
                "theoryTitle": "Penyangga Modal Kontrasiklikal (CCyB)",
                "scenario": "🏃‍♂️ Pelarian Modal (Capital Flight) & Bunga",
                "question": "Jika tingkat inflasi domestik melonjak tinggi melampaui suku bunga simpanan perbankan sehingga suku bunga riil menjadi negatif, risiko makroekonomi apakah yang membayangi sistem finansial?",
                "options": [
                    "Masyarakat terdorong meminjam valas dalam jumlah masif untuk dihibahkan kepada kas bendahara negara",
                    "Terjadinya pelarian modal (capital flight) ke luar negeri dan pelemahan kurs rupiah karena deposan mencari aset berimbal hasil riil positif",
                    "Peningkatan drastis permintaan kredit investasi modal kerja karena perbankan menurunkan suku bunga pinjaman ke nol",
                    "Penghentian otomatis seluruh transaksi perdagangan antar-pedagang di pasar uang domestik secara permanen"
                ],
                "correct": 1,
                "hint": "Suku bunga riil negatif berarti nilai simpanan tergerus inflasi; pemilik modal akan mencari aset asing yang lebih menguntungkan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Suku bunga riil negatif (<em>r &lt; 0</em>) terjadi saat inflasi melebihi suku bunga nominal. Menyimpan aset berdenominasi rupiah mengakibatkan kerugian daya beli riil, memicu deposan dan investor global memindahkan modal ke valas atau aset luar negeri (<em>capital flight</em>) dan mendepresiasi Rupiah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pelaku pasar bersikap rasional melindungi kekayaannya, bukan menghibahkan modal pinjaman ke kas negara.</li><li><strong>Opsi C:</strong> Perbankan akan mengalami pengetatan likuiditas akibat penarikan dana simpanan sehingga kapasitas kredit justru terbatas.</li><li><strong>Opsi D:</strong> Pasar uang tidak berhenti beroperasi, melainkan menuntut premi risiko dan imbal hasil nominal yang lebih tinggi.</li></ul></div>"
            },
            {
                "id": "s2_q26",
                "theoryKey": "cbdc_rupiah_digital",
                "theoryTitle": "Rupiah Digital (Central Bank Digital Currency / CBDC)",
                "scenario": "💳 Uang Primer (Base Money / M0)",
                "question": "Dalam struktur neraca moneter Bank Indonesia, komponen keuangan apakah yang menyusun besaran Uang Primer (Base Money / M0)?",
                "options": [
                    "Total saldo simpanan deposito nasabah korporasi pada seluruh kantor cabang bank swasta dan BUMN",
                    "Uang kartal yang diedarkan (di luar BI) ditambah saldo giro wajib dan rekening simpanan bank umum di Bank Indonesia",
                    "Akumulasi laba ditahan lembaga keuangan non-bank serta portofolio kepemilikan saham reksa dana",
                    "Nilai total pinjaman kredit sindikasi luar negeri yang dijamin oleh lembaga penjamin ekspor pemerintah"
                ],
                "correct": 1,
                "hint": "M0 adalah liabilitas moneter langsung bank sentral: uang kartal beredar ditambah giro simpanan perbankan di bank sentral!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Uang Primer (M0 / Basis Moneter)</em> adalah liabilitas moneter langsung dari neraca Bank Indonesia. Komponennya terdiri dari uang kartal yang diedarkan kepada masyarakat ditambah cadangan perbankan (saldo giro bank umum yang ditempatkan di rekening Bank Indonesia).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Deposito nasabah di bank umum dicatat sebagai liabilitas bank komersial dalam agregat M2, bukan M0 BI.</li><li><strong>Opsi C:</strong> Laba ditahan IKNB dan reksa dana adalah modal swasta pasar modal, bukan liabilitas moneter bank sentral.</li><li><strong>Opsi D:</strong> Pinjaman sindikasi luar negeri dicatat di pos neraca utang luar negeri, bukan basis moneter rupiah primer.</li></ul></div>"
            },
            {
                "id": "s2_q27",
                "theoryKey": "kurva_imbal_hasil",
                "theoryTitle": "Kurva Imbal Hasil Obligasi & Inversi (Yield Curve)",
                "scenario": "🪙 Seigniorage: Laba Emisi Uang",
                "question": "Apakah yang dimaksud dengan konsep keuntungan Seigniorage yang dinikmati oleh bank sentral sebagai otoritas tunggal pencetak mata uang?",
                "options": [
                    "Kenaikan tarif pajak penghasilan yang dipungut otomatis saat masyarakat bertransaksi di gerai ritel modern",
                    "Selisih antara nilai nominal uang yang diterbitkan dengan biaya riil fisik pencetakan dan peredaran uang tersebut",
                    "Margin imbal bunga yang diterima bank sentral dari pinjaman komersial kepada korporasi konglomerasi swasta",
                    "Penerimaan dividen tahunan dari pengelolaan cadangan devisa emas moneter yang disewakan di bursa komoditas"
                ],
                "correct": 1,
                "hint": "Mencetak selembar uang Rp 100.000 kertas hanya butuh biaya beberapa ratus rupiah; selisih nilainya adalah seigniorage!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Seigniorage</em> adalah keuntungan ekonomis yang timbul dari hak monopoli penerbitan uang, yaitu selisih antara nilai nominal uang yang diciptakan dengan biaya riil produksinya (biaya kertas uang, fitur pengaman, dan operasional pencetakan).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pajak penghasilan adalah domain pemungutan fiskal Direktorat Jenderal Pajak, bukan keuntungan emisi uang.</li><li><strong>Opsi C:</strong> Bank sentral tidak menyalurkan pinjaman komersial ritel kepada korporasi swasta untuk mencari margin laba.</li><li><strong>Opsi D:</strong> Cadangan emas moneter dikelola untuk keamanan cadangan devisa likuiditas negara, bukan disewakan komersial.</li></ul></div>"
            },
            {
                "id": "s2_q28",
                "theoryKey": "moral_suasion",
                "theoryTitle": "Himbauan Moral (Moral Suasion) Otoritas Moneter",
                "scenario": "📱 Central Bank Digital Currency (CBDC)",
                "question": "Bank Indonesia merancang pengembangan 'Rupiah Digital' (CBDC Proyek Garuda). Apakah perbedaan fundamental antara Rupiah Digital dengan saldo uang elektronik komersial (e-wallet)?",
                "options": [
                    "Rupiah Digital hanya dapat ditransaksikan di bursa kripto internasional tanpa memerlukan konfirmasi identitas",
                    "Rupiah Digital merupakan kewajiban moneter langsung dari Bank Indonesia (klaim berdaulat), bukan liabilitas penerbit swasta",
                    "Uang elektronik fintech dijamin langsung oleh emas fisik pemerintah sedangkan Rupiah Digital berbasis algoritma mining",
                    "Rupiah Digital memiliki nilai tukar yang berfluktuasi bebas setiap detik terhadap lembaran uang kartal rupiah kertas"
                ],
                "correct": 1,
                "hint": "Uang kartal digital langsung dari bank sentral: liabilitas Bank Indonesia tanpa risiko gagal bayar pihak ketiga!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Saldo e-wallet komersial (GoPay, OVO, dll) adalah uang giral/elektronik yang merupakan liabilitas dari perusahaan penerbit terkait. Sebaliknya, <em>Rupiah Digital (CBDC)</em> adalah uang kartal digital yang merupakan liabilitas langsung Bank Indonesia (<em>risk-free sovereign currency</em>).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Rupiah Digital beroperasi di dalam jaringan teratur di bawah kepatuhan KYC/AML, bukan aset kripto spekulatif anonim.</li><li><strong>Opsi C:</strong> Uang elektronik komersial dijamin oleh simpanan giro di perbankan, bukan cadangan emas fisik langsung.</li><li><strong>Opsi D:</strong> Rupiah Digital memiliki nilai nominal yang identik paritas 1:1 terhadap uang kartal rupiah kertas dan logam.</li></ul></div>"
            }
        ]
    },
    {
        "id": 5,
        "title": "Level 05: Pasar Uang & Inflation Targeting",
        "subtitle": "SRBI, IndONIA, Inflation Targeting Framework (ITF), dan Likuiditas M1/M2",
        "theme": "money_market",
        "unlocks": "Gelar: Ahli Strategi Moneter",
        "questionPool": [
            {
                "id": "s2_q29",
                "theoryKey": "kebijakan_makroprudensial",
                "theoryTitle": "Kebijakan Makroprudensial & Rasio Intermediasi (RIM)",
                "scenario": "⚖️ Sifat Asimetris Kebijakan Moneter",
                "question": "Para ahli moneter sering menyatakan bahwa kebijakan moneter memiliki sifat 'asimetris' (seperti menarik versus mendorong tali). Fenomena apakah yang dimaksud?",
                "options": [
                    "Menaikkan suku bunga sangat efektif untuk mengerem laju inflasi, namun menurunkan bunga saat resesi sulit mendorong pinjaman jika optimisme bisnis padam",
                    "Pengetatan moneter hanya memengaruhi debitur perbankan syariah sementara pelonggaran moneter hanya berlaku bagi perbankan komersial konvensional",
                    "Bank sentral memiliki instrumen untuk menetapkan batas suku bunga simpanan namun dilarang mengatur suku bunga pinjaman kredit perbankan",
                    "Perubahan suku bunga acuan berdampak seketika pada neraca modal luar negeri namun tidak pernah memengaruhi inflasi harga barang domestik"
                ],
                "correct": 0,
                "hint": "Ibarat menarik tali: kamu bisa menarik tali untuk mengerem, tapi kamu tidak bisa mendorong seutas tali ke depan jika pengusaha menolak meminjam!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Analogi *pushing on a string* menjelaskan asimetri kebijakan moneter. Bank sentral dapat dengan mudah mengerem ekonomi yang <em>overheating</em> melalui pengetatan bunga (menarik tali). Namun saat resesi berat, menurunkan bunga belum tentu memicu pinjaman baru bila dunia usaha diliputi pesimisme (mendorong tali).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Transmisi moneter berlaku setara ke seluruh industri keuangan baik perbankan konvensional maupun syariah.</li><li><strong>Opsi C:</strong> BI memandu suku bunga pasar uang melalui koridor operasional, bukan membatasi suku bunga simpanan secara sepihak.</li><li><strong>Opsi D:</strong> Perubahan suku bunga acuan terbukti memengaruhi ekspektasi dan permintaan domestik hingga stabilitas harga barang.</li></ul></div>"
            },
            {
                "id": "s2_q30",
                "theoryKey": "independensi_bank_sentral",
                "theoryTitle": "Independensi Bank Sentral & Kredibilitas Moneter",
                "scenario": "🏦 Stabilitas Sistem Keuangan (SSK)",
                "question": "Mengapa dalam mandat modern, stabilitas moneter (inflasi rendah) dipandang tidak cukup memadai tanpa didampingi oleh Stabilitas Sistem Keuangan (SSK)?",
                "options": [
                    "Karena inflasi rendah secara otomatis menghilangkan peranan pasar saham dalam memfasilitasi pendanaan korporasi nasional",
                    "Karena krisis perbankan atau gagal bayar sistemik dapat melumpuhkan sistem pembayaran dan memicu depresi ekonomi sekalipun inflasi terkendali",
                    "Karena bank sentral diwajibkan oleh regulasi global untuk menutup seluruh kantor cabang perbankan daerah saat inflasi stabil",
                    "Karena stabilitas sistem keuangan semata-mata bertujuan membatasi kepemilikan modal asing pada obligasi negara domestik"
                ],
                "correct": 1,
                "hint": "Pelajaran Krisis Global 2008: inflasi sebelum krisis sangat tenang, namun kerapuhan sistem keuangan memicu kehancuran ekonomi yang parah!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pengalaman Krisis Keuangan Global 2008 membuktikan bahwa lingkungan inflasi yang rendah dapat memicu rasa aman semu (<em>paradox of financial stability</em>) dan penumpukan risiko sistemik tersembunyi. Kegagalan sistemik lembaga perbankan dapat seketika melumpuhkan roda ekonomi riil.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Inflasi rendah justru menciptakan kepastian iklim investasi yang mendukung pendanaan pasar modal.</li><li><strong>Opsi C:</strong> Bank sentral dan OJK tidak menutup perbankan daerah; stabilitas keuangan justru memperkuat inklusi dan jaringan bank.</li><li><strong>Opsi D:</strong> SSK fokus pada ketahanan likuiditas, solvabilitas, dan keterkaitan sistemik perbankan, bukan proteksionisme modal asing.</li></ul></div>"
            },
            {
                "id": "s2_q31",
                "theoryKey": "transmisi_aset",
                "theoryTitle": "Jalur Harga Aset Transmisi Moneter",
                "scenario": "🌱 Green Financing & Taksonomi Hijau",
                "question": "Bank Indonesia memberikan relaksasi berupa pembebasan uang muka (LTV hingga 100%) untuk pembiayaan Kendaraan Bermotor Listrik (KBLBB). Kebijakan makroprudensial ini mencerminkan pendekatan:",
                "options": [
                    "Pemberian subsidi belanja modal langsung dari pos neraca laba operasional bank sentral kepada produsen otomotif",
                    "Pemanfaatan instrumen makroprudensial hijau untuk mengarahkan alokasi kredit perbankan ke sektor berkelanjutan dan ramah lingkungan",
                    "Penghapusan seluruh standar uji kelayakan kredit perbankan komersial bagi seluruh debitur perseorangan",
                    "Kewajiban perbankan untuk menarik kembali pinjaman pada seluruh industri transportasi konvensional dalam tempo 24 jam"
                ],
                "correct": 1,
                "hint": "Bank sentral mengintegrasikan prinsip keberlanjutan iklim ke dalam pelonggaran rasio makroprudensial!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kebijakan LTV/FTV berwawasan lingkungan adalah bagian dari <em>Green Macroprudential Policy</em>. Bank sentral memberikan insentif kehati-hatian guna mempercepat transisi energi hijau dengan memfasilitasi kemudahan akses kredit perbankan untuk kendaraan ramah lingkungan rendah emisi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> BI tidak membagikan subsidi fiskal langsung; pelonggaran LTV adalah instrumen ketentuan rasio kredit perbankan.</li><li><strong>Opsi C:</strong> Bank umum tetap wajib menerapkan analisis kemampuan membayar (5C perbankan) dan manajemen risiko kredit.</li><li><strong>Opsi D:</strong> Kebijakan transisi hijau berlangsung bertahap tanpa penarikan paksa kredit sektor konvensional yang sedang berjalan.</li></ul></div>"
            },
            {
                "id": "s2_q32",
                "theoryKey": "fasilitas_simpanan_bi",
                "theoryTitle": "Fasilitas Simpanan Bank Indonesia (Deposit Facility)",
                "scenario": "📈 Suku Bunga Acuan BI-Rate vs PUAB",
                "question": "Di pasar uang antar-bank (PUAB), suku bunga pinjaman tanpa agunan semalam (IndONIA) berfluktuasi harian. Bagaimana target operasional Bank Indonesia terhadap suku bunga IndONIA ini?",
                "options": [
                    "Membiarkan suku bunga IndONIA bergerak bebas tanpa batas toleransi mengikuti spekulasi pasar valas internasional",
                    "Menjaga agar suku bunga pasar uang bergerak stabil di sekitar suku bunga kebijakan BI-Rate dalam koridor operasional yang terukur",
                    "Memastikan suku bunga pasar uang selalu bernilai absolut lebih rendah dibandingkan tingkat inflasi bulanan terendah",
                    "Mewajibkan seluruh bank umum menyepakati suku bunga pinjaman antar-bank pada angka nol koma nol persen"
                ],
                "correct": 1,
                "hint": "Operasi moneter BI bertujuan mengarahkan suku bunga pasar uang antar-bank (IndONIA) agar mendekati BI-Rate!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Sasaran operasional kebijakan moneter BI adalah mengendalikan suku bunga pasar uang antar-bank semalam (<em>IndONIA</em>) agar bergerak stabil di sekitar <em>BI-Rate</em>, berada di antara batas bawah (Deposit Facility) dan batas atas (Lending Facility) dari koridor moneter.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Membiarkan suku bunga liar tanpa batas koridor akan merusak kredibilitas dan transmisi kebijakan moneter.</li><li><strong>Opsi C:</strong> Posisi bunga pasar uang ditentukan oleh interaksi likuiditas perbankan terhadap BI-Rate, bukan dipaksa di bawah inflasi.</li><li><strong>Opsi D:</strong> Suku bunga pinjaman antar-bank mencerminkan biaya likuiditas komersial dan risiko counterparty, bukan nol persen.</li></ul></div>"
            },
            {
                "id": "s2_q33",
                "theoryKey": "seigniorage",
                "theoryTitle": "Hak Emisi & Keuntungan Seigniorage",
                "scenario": "💵 Sterilisasi Intervensi Valas",
                "question": "Ketika Bank Indonesia membeli Dolar AS dalam jumlah besar untuk memperkuat cadangan devisa, BI secara simultan menyuntikkan likuiditas Rupiah ke perbankan. Operasi apakah yang dilakukan BI untuk 'mensterilkan' kelebihan rupiah tersebut?",
                "options": [
                    "Membagikan rupiah baru tersebut secara cuma-cuma kepada eksportir sebagai hadiah surplus neraca berjalan",
                    "Menjual surat berharga (seperti SRBI/SBN) di pasar uang untuk menyerap kembali likuiditas rupiah agar tidak memicu inflasi",
                    "Menutup akses fasilitas kliring perbankan dan membekukan sementara giro wajib seluruh bank umum",
                    "Mendevaluasi kurs rupiah secara mendadak agar daya beli uang hasil intervensi menyusut separuh"
                ],
                "correct": 1,
                "hint": "Sterilisasi moneter menyerap kembali likuiditas rupiah domestik yang baru disuntikkan saat membeli cadangan dolar!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Sterilized Foreign Exchange Intervention</em> dilakukan ketika BI membeli valas (menambah cadangan devisa dan menginjeksi rupiah), lalu secara bersamaan menerbitkan/menjual instrumen moneter (seperti SRBI/SBN) untuk menyerap kembali pasokan rupiah tersebut dari sistem perbankan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Uang injeksi moneter tidak dihibahkan ke pelaku usaha; pembelian valas adalah transaksi setelmen pasar formal.</li><li><strong>Opsi C:</strong> Penutupan sistem kliring akan melumpuhkan perekonomian nasional dan merusak stabilitas sistem keuangan.</li><li><strong>Opsi D:</strong> Intervensi cadangan devisa justru bertujuan menstabilkan kurs rupiah, bukan mendevaluasinya secara sengaja.</li></ul></div>"
            },
            {
                "id": "s2_q34",
                "theoryKey": "shadow_banking",
                "theoryTitle": "Sistem Perbankan Bayangan (Shadow Banking)",
                "scenario": "🌪️ Tapering The Fed & Respon Moneter",
                "question": "Saat bank sentral AS (The Fed) mengumumkan pengetatan moneter agresif dan kenaikan suku bunga tinggi, respons 'pre-emptive, front-loading, and forward-looking' apakah yang disiapkan oleh Bank Indonesia?",
                "options": [
                    "Memangkas suku bunga BI-Rate ke batas terendah guna mendorong impor barang konsumsi massal",
                    "Menaikkan BI-Rate secara terukur guna menjaga selisih imbal hasil aset rupiah dan mengantisipasi imported inflation",
                    "Mewajibkan warga negara asing menyerahkan seluruh aset portofolionya kepada otoritas perbankan domestik",
                    "Menarik seluruh peredaran obligasi negara berdenominasi rupiah dari kepemilikan investor domestik"
                ],
                "correct": 1,
                "hint": "Menaikkan suku bunga lebih awal (pre-emptive) menjaga daya tarik imbal hasil aset rupiah dari pelarian modal!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kebijakan <em>pre-emptive</em> dan <em>front-loading</em> diterapkan dengan menaikkan BI-Rate sebelum lonjakan ekspektasi inflasi terjadi. Tujuannya adalah mempertahankan diferensial suku bunga aset domestik yang menarik bagi investor global serta mencegah tekanan pelemahan kurs yang tajam.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Memangkas bunga di tengah pengetatan The Fed akan mempersempit yield spread dan memicu <em>capital flight</em> masif.</li><li><strong>Opsi C:</strong> Nasionalisasi paksa aset asing melanggar hukum investasi internasional dan menghancurkan kredibilitas negara.</li><li><strong>Opsi D:</strong> Pembelian paksa seluruh SBN domestik tidak realistis dan akan menghancurkan likuiditas pasar modal negara.</li></ul></div>"
            },
            {
                "id": "s2_q35",
                "theoryKey": "intervensi_sterilisasi",
                "theoryTitle": "Intervensi Sterilisasi Valas Pasar Uang",
                "scenario": "📊 Ekspektasi Inflasi Adaptif vs Rasional",
                "question": "Mengapa ekspektasi inflasi yang terlepas dari jangkarnya (unanchored inflation expectations) sangat berbahaya bagi efektivitas kebijakan moneter?",
                "options": [
                    "Karena masyarakat kehilangan kepercayaan pada target inflasi bank sentral, sehingga perilaku penetapan harga dan upah memicu spiral inflasi riil",
                    "Karena nilai tukar mata uang domestik secara otomatis dilarang untuk diperdagangkan di pasar pertukaran valuta internasional",
                    "Karena perbankan nasional kehilangan kemampuan teknologi untuk mencatat transaksi keuangan dalam denominasi mata uang rupiah",
                    "Karena seluruh perjanjian kontrak bisnis secara hukum internasional diubah menjadi perjanjian barter komoditas tambang"
                ],
                "correct": 0,
                "hint": "Jika masyarakat percaya inflasi akan melonjak tinggi, pedagang langsung menaikkan harga dan buruh menuntut kenaikan gaji—ekspektasi menciptakan kenyataan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Ekspektasi inflasi adalah ramalan yang dapat mewujudkan dirinya sendiri (<em>self-fulfilling prophecy</em>). Ketika ekspektasi <em>unanchored</em>, produsen menaikkan harga di muka dan pekerja menuntut kenaikan upah tinggi, mengunci inflasi pada level tinggi dan menuntut biaya output yang mahal untuk menjinakkannya.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Valas tetap diperdagangkan, namun premi risiko depresiasi mata uang domestik melonjak tajam.</li><li><strong>Opsi C:</strong> Sistem pencatatan akuntansi perbankan tetap berjalan normal menggunakan satuan hitung rupiah.</li><li><strong>Opsi D:</strong> Kontrak bisnis tetap menggunakan uang sebagai satuan transaksi dan pembayaran legal.</li></ul></div>"
            },
            {
                "id": "s2_q36",
                "theoryKey": "stabilitas_sistem_keuangan",
                "theoryTitle": "Arsitektur Stabilitas Sistem Keuangan (SSK)",
                "scenario": "👑 Mahakarya Kebijakan Moneter",
                "question": "Di akhir pembelajaran Level 2, prinsip fundamental apakah yang harus dikuasai oleh pengambil kebijakan makroekonomi mengenai independensi dan mandat bank sentral modern?",
                "options": [
                    "Bank sentral harus tunduk pada instruksi belanja harian kementerian guna menjamin pertumbuhan fiskal tercepat",
                    "Independensi kelembagaan dan instrumen moneter harus dijaga guna mempertahankan kredibilitas jangka panjang, diselaraskan dengan koordinasi bauran kebijakan nasional",
                    "Bank sentral bertugas tunggal menjamin bahwa seluruh korporasi swasta tidak pernah mengalami penurunan laba operasional",
                    "Kebijakan moneter dapat sepenuhnya menggantikan peran anggaran fiskal pemerintah dalam membiayai belanja pembangunan sosial"
                ],
                "correct": 1,
                "hint": "Independensi bank sentral diperlukan agar tidak diganggu kepentingan politik jangka pendek, namun tetap berkoordinasi erat dengan kebijakan ekonomi nasional!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Bank sentral modern memerlukan independensi kelembagaan, tujuan, dan instrumen dari intervensi politik jangka pendek agar kredibilitas stabilitas harga terjaga. Namun, efektivitas optimal tercapai bila diselaraskan dengan bauran kebijakan (<em>policy mix</em>) bersama otoritas fiskal dan sektor riil.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Ketundukan bank sentral pada pembiayaan belanja fiskal jangka pendek historically selalu berujung hiperinflasi.</li><li><strong>Opsi C:</strong> Bank sentral tidak bertugas menjamin laba korporasi swasta; pasar bebas menuntut adanya disiplin laba-rugi bisnis.</li><li><strong>Opsi D:</strong> Kebijakan moneter mengatur likuiditas dan bunga makro, tidak memiliki instrumen alokasi redistribusi belanja sosial seperti APBN.</li></ul></div>"
            },
            {
                "id": "s3_q1",
                "theoryKey": "multiplier_effect",
                "theoryTitle": "Angka Pengganda Fiskal Belanja Modal",
                "scenario": "🏗️ Belanja Infrastruktur & Angka Pengganda",
                "question": "Kementerian Keuangan mengalokasikan ratusan triliun rupiah untuk membangun jalan tol, pelabuhan, dan waduk. Dari analisis fiskal, mengapa belanja modal fisik ini memiliki multiplier effect jangka panjang lebih tinggi dibanding belanja konsumsi birokrasi?",
                "options": [
                    "Belanja modal fisik secara otomatis menghapuskan kewajiban audit laporan keuangan oleh Badan Pemeriksa Keuangan",
                    "Belanja modal menciptakan aset fisik tahan lama yang memangkas biaya logistik dan memperluas kapasitas output riil agregat",
                    "Belanja modal langsung diserap sebagai penerimaan kas dividen tunai tahun berjalan bagi kementerian teknis",
                    "Belanja infrastruktur diwajibkan oleh undang-undang untuk menghasilkan margin keuntungan komersial dalam tempo 30 hari"
                ],
                "correct": 1,
                "hint": "Infrastruktur fisik mempermudah konektivitas logistik, menaikkan produktivitas swasta, dan memperbesar kapasitas penawaran agregat jangka panjang!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Belanja modal (<em>capital expenditure</em>) menghasilkan akumulasi barang modal publik yang menurunkan biaya logistik dan mendorong produktivitas sektor swasta (<em>crowding-in</em>). Multiplier fiskalnya jauh lebih tinggi dan bertahan lama dibanding belanja barang konsumtif yang habis terpakai seketika.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Seluruh belanja APBN tetap wajib diaudit secara ketat dan transparan oleh BPK tanpa pengecualian.</li><li><strong>Opsi C:</strong> Infrastruktur publik dibangun untuk utilitas pelayanan umum, bukan dividen tunai jangka pendek kementerian.</li><li><strong>Opsi D:</strong> Proyek infrastruktur publik memiliki masa pengembalian investasi (<em>payback period</em>) puluhan tahun, bukan 30 hari.</li></ul></div>"
            },
            {
                "id": "s3_q2",
                "theoryKey": "defisit_apbn",
                "theoryTitle": "Batas Defisit Maksimal 3% PDB (UU No. 17/2003)",
                "scenario": "⚖️ Batas Hukum Defisit APBN 3%",
                "question": "Undang-Undang Keuangan Negara No. 17 Tahun 2003 membatasi defisit anggaran APBN maksimal 3% dari Produk Domestik Bruto (PDB). Apakah filosofi kehati-hatian utama di balik penetapan batas hukum tersebut?",
                "options": [
                    "Menjamin pemerintah tidak perlu memungut pajak pertambahan nilai dari peredaran barang kebutuhan pokok rakyat",
                    "Menjaga disiplin fiskal agar penumpukan utang tahunan tidak melaju lebih kencang dibanding pertumbuhan ekonomi riil",
                    "Mengharuskan kementerian keuangan menutup seluruh pos pembiayaan investasi Badan Usaha Milik Negara",
                    "Memastikan bahwa belanja operasional aparatur sipil negara selalu melampaui total belanja program perlindungan sosial"
                ],
                "correct": 1,
                "hint": "Batas defisit 3% menjaga laju pertambahan utang baru tetap terkendali dan sejalan dengan laju pertumbuhan PDB!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Rambu batas defisit 3% PDB (diadopsi dari kriteria Maastricht) bertujuan menegakkan disiplin fiskal, mencegah jebakan utang kronis (<em>debt spiral</em>), dan memastikan keberlanjutan fiskal jangka panjang agar laju akumulasi utang tetap proporsional terhadap kapasitas ekonomi nasional.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> PPN tetap merupakan pilar utama penerimaan pajak negara terlepas dari batas pagu defisit anggaran.</li><li><strong>Opsi C:</strong> Penyertaan Modal Negara (PMN) ke BUMN strategis tetap diizinkan sepanjang dialokasikan dalam APBN yang disetujui DPR.</li><li><strong>Opsi D:</strong> Kebijakan belanja negara justru memprioritaskan efisiensi birokrasi dan peningkatan pos perlindungan sosial.</li></ul></div>"
            },
            {
                "id": "s3_q3",
                "theoryKey": "crowding_out",
                "theoryTitle": "Efek Desakan Investasi Swasta (Crowding-Out Effect)",
                "scenario": "📜 Batas Rasio Utang 60% PDB",
                "question": "Selain batas defisit 3%, regulasi keuangan negara juga menetapkan batas maksimal rasio total utang pemerintah sebesar 60% PDB. Mengapa rasio utang Indonesia (sekitar 38-39% PDB) dikategorikan aman oleh lembaga internasional?",
                "options": [
                    "Karena seluruh pokok utang negara dapat dihapuskan sepihak melalui penerbitan keputusan presiden tahunan",
                    "Karena rasio tersebut berada jauh di bawah ambang batas hukum 60% dan ditopang oleh profil jatuh tempo yang terkelola baik",
                    "Karena pemerintah Indonesia dibebaskan dari kewajiban pembayaran bunga kupon obligasi oleh perbankan global",
                    "Karena seluruh pemegang surat berharga negara diwajibkan mengonversi investasinya menjadi saham jalan tol swasta"
                ],
                "correct": 1,
                "hint": "Rasio utang di bawah 40% PDB memberikan bantalan ruang fiskal yang aman terhadap guncangan eksternal!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Rasio utang pemerintah Indonesia berkisar ~39% PDB, jauh di bawah batas legal 60% PDB dan jauh lebih rendah dibanding rata-rata negara maju (&gt;100% PDB) maupun negara berkembang sepadan. Hal ini mencerminkan manajemen fiskal prudent dan solvabilitas berdaulat yang kuat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pembatalan utang sepihak (<em>sovereign default</em>) akan memicu embargo finansial dan kehancuran ekonomi nasional.</li><li><strong>Opsi C:</strong> Kupon bunga SBN dibayar tepat waktu secara konsisten dari pos belanja bunga utang APBN.</li><li><strong>Opsi D:</strong> SBN adalah instrumen obligasi murni, tidak dikonversi paksa menjadi saham ekuitas korporasi jalan tol.</li></ul></div>"
            },
            {
                "id": "s3_q4",
                "theoryKey": "subsidi_tepat_sasaran",
                "theoryTitle": "Transformasi Subsidi Barang ke Bantuan Tunai",
                "scenario": "🏢 Efek Crowding-Out",
                "question": "Jika pemerintah menerbitkan Surat Berharga Negara (SBN) dalam jumlah terlampau masif dengan imbal hasil (yield) sangat tinggi, fenomena 'Crowding-Out' apakah yang dikhawatirkan menimpa dunia usaha swasta?",
                "options": [
                    "Perbankan memborong SBN dan menaikkan bunga kredit komersial, sehingga korporasi swasta kesulitan memperoleh pinjaman",
                    "Korporasi swasta dipaksa mengambil alih tanggung jawab pengelolaan seluruh proyek infrastruktur milik pemerintah",
                    "Investor asing dilarang menanamkan modal langsung (FDI) pada sektor industri manufaktur dalam negeri",
                    "Tingkat upah tenaga kerja terampil swasta secara otomatis dipotong guna menutupi beban bunga obligasi negara"
                ],
                "correct": 0,
                "hint": "Ketika bank dan pemilik modal memilih memarkir dana di obligasi negara berbunga tinggi, likuiditas kredit untuk swasta tersedot habis!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Crowding-Out Effect</em> terjadi saat penyerapan dana besar-besaran oleh penerbitan utang pemerintah mendongkrak suku bunga pasar. Likuiditas perbankan tersedot ke SBN yang bebas risiko, menyisakan sedikit dana bagi swasta dan menaikkan biaya pinjaman investasi swasta.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Korporasi swasta tidak dipaksa mengambil alih proyek pemerintah akibat tingginya yield SBN.</li><li><strong>Opsi C:</strong> Emisi SBN berkaitan dengan pasar portofolio utang, bukan pelarangan investasi langsung pabrik (FDI).</li><li><strong>Opsi D:</strong> Beban bunga SBN dibayar dari kas APBN pemerintah, bukan melalui pemotongan gaji buruh swasta langsung.</li></ul></div>"
            },
            {
                "id": "s3_q5",
                "theoryKey": "sbn",
                "theoryTitle": "Surat Berharga Negara (SBN) & Pembiayaan",
                "scenario": "🎯 Reformasi Subsidi: Barang vs Orang",
                "question": "Banyak pakar fiskal mendorong transformasi skema subsidi komoditas terbuka (seperti BBM atau LPG 3 kg) menjadi subsidi tertutup berbasis orang (target sasaran). Apakah rasionalitas di balik usulan reformasi ini?",
                "options": [
                    "Meniadakan hak warga miskin untuk mengakses barang konsumsi primer di seluruh wilayah tanah air",
                    "Mengurangi kebocoran anggaran di mana subsidi terbuka lebih banyak dinikmati kelompok mampu, serta mengalihkan dana langsung ke penerima rentan",
                    "Menghapuskan sistem pencatatan nomor induk kependudukan dalam pendistribusian program bantuan sosial nasional",
                    "Mewajibkan seluruh keluarga penerima manfaat membelanjakan dana bantuan tunai hanya untuk komoditas impor mewah"
                ],
                "correct": 1,
                "hint": "Subsidi terbuka pada harga barang dinikmati siapa pun yang membeli paling banyak (sering kali orang kaya); subsidi orang menyasar langsung kantong keluarga prasejahtera!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Subsidi berbasis barang bersifat regresif karena semakin kaya seseorang dan semakin banyak ia mengonsumsi BBM/LPG, semakin besar subsidi fiskal yang dinikmatinya. Subsidi tepat sasaran (berbasis penerima/NIK) menghemat anggaran dan menyalurkan perlindungan langsung ke desil termiskin.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Reformasi bertujuan melindungi kelompok rentan secara lebih efektif dengan bantuan uang tunai/kupon khusus.</li><li><strong>Opsi C:</strong> Transformasi justru mengandalkan data registrasi sosial ekonomi dan NIK yang terverifikasi akurat.</li><li><strong>Opsi D:</strong> Dana bantuan sosial diarahkan untuk memenuhi kebutuhan pokok gizi dan pendidikan keluarga.</li></ul></div>"
            },
            {
                "id": "s3_q6",
                "theoryKey": "fiskal_kontrasiklikal",
                "theoryTitle": "Kebijakan Fiskal Kontrasiklikal",
                "scenario": "📜 Menutup Defisit dengan SBN",
                "question": "Ketika pendapatan negara dari pos perpajakan dan PNBP lebih kecil daripada alokasi belanja negara yang disetujui DPR, mekanisme pembiayaan utang apakah yang paling transparan dan berorientasi pasar?",
                "options": [
                    "Mewajibkan bank sentral mencetak uang fisik baru dan membagikannya langsung ke kas kementerian",
                    "Menerbitkan Surat Berharga Negara (SUN dan SBSN/Sukuk) yang ditawarkan kepada investor melalui lelang pasar terbuka",
                    "Mengambil alih seluruh saldo tabungan giro perbankan swasta tanpa kewajiban pengembalian pokok pinjaman",
                    "Menjual pulau-pulau terluar wilayah kedaulatan negara kepada korporasi konglomerasi multinasional asing"
                ],
                "correct": 1,
                "hint": "Pemerintah menerbitkan obligasi negara (SBN) secara akuntabel di pasar modal domestik dan internasional!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Penutupan defisit APBN dilakukan secara kredibel melalui instrumen pembiayaan utang berbasis pasar, yaitu penerbitan Surat Berharga Negara (SBN) baik konvensional (SUN) maupun syariah (SBSN/Sukuk), dengan tata kelola lelang kompetitif yang diawasi publik dan DPR.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Mencetak uang langsung melanggar independensi moneter dan UU Keuangan Negara serta memicu hiperinflasi.</li><li><strong>Opsi C:</strong> Menyita tabungan nasabah perbankan adalah tindakan inkonstitusional yang melumpuhkan sistem keuangan.</li><li><strong>Opsi D:</strong> Wilayah kedaulatan negara tidak dapat diperjualbelikan berdasarkan konstitusi Republik Indonesia.</li></ul></div>"
            },
            {
                "id": "s3_q7",
                "theoryKey": "tax_ratio",
                "theoryTitle": "Rasio Penerimaan Pajak (Tax Ratio)",
                "scenario": "🔄 Kebijakan Fiskal Kontrasiklikal",
                "question": "Saat perekonomian dilanda penurunan belanja konsumsi dan ancaman resesi, bagaimanakah sikap kebijakan fiskal kontrasiklikal (countercyclical) yang semestinya dijalankan kementerian keuangan?",
                "options": [
                    "Memangkas seluruh anggaran infrastruktur dan menaikkan tarif pajak secara drastis untuk menyeimbangkan anggaran",
                    "Meningkatkan belanja pemerintah dan memberikan insentif fiskal terukur guna menyangga daya beli dan menopang permintaan agregat",
                    "Membekukan pencairan gaji aparatur sipil negara dan menutup layanan administrasi perpajakan publik",
                    "Mewajibkan seluruh korporasi manufaktur swasta membagikan seluruh saldo laba ditahan kepada kas APBN"
                ],
                "correct": 1,
                "hint": "Saat swasta mengerem belanja karena lesu, pemerintah harus menginjak pedal gas belanja agar perputaran ekonomi tidak berhenti!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kebijakan fiskal kontrasiklikal berfungsi sebagai peredam kejut siklus bisnis (<em>shock absorber</em>). Saat sektor swasta lesu, pemerintah melonggarkan defisit, mempercepat belanja bantuan sosial dan infrastruktur, serta memberi keringanan pajak untuk mencegah kejatuhan ekonomi yang lebih dalam.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Memangkas belanja dan menaikkan pajak saat resesi adalah kebijakan prosiklikal kontraktif yang memperburuk depresi.</li><li><strong>Opsi C:</strong> Membekukan gaji dan operasional negara justru merusak rantai pasok dan melumpuhkan kepastian hukum.</li><li><strong>Opsi D:</strong> Pemerintah tidak berhak menyita laba korporasi swasta di luar ketentuan pemungutan tarif pajak resmi.</li></ul></div>"
            },
            {
                "id": "s3_q8",
                "theoryKey": "rasio_gini",
                "theoryTitle": "Pajak Progresif & Redistribusi Pendapatan",
                "scenario": "📊 Rasio Pajak terhadap PDB (Tax Ratio)",
                "question": "Rasio penerimaan perpajakan Indonesia terhadap PDB (Tax Ratio) berada pada rentang 10%–10,5%, tergolong moderat di kawasan regional. Apakah implikasi strategis jangka panjang dari kondisi penerimaan ini?",
                "options": [
                    "Pemerintah memiliki surplus dana fiskal yang melimpah sehingga tidak memerlukan perencanaan anggaran tahunan",
                    "Kapasitas ruang fiskal pemerintah terbatas dalam membiayai belanja layanan publik dasar, riset, dan jaring pengaman sosial",
                    "Mata uang rupiah secara otomatis kehilangan fungsi sebagai alat pembayaran sah dalam transaksi domestik",
                    "Seluruh proyek infrastruktur strategis nasional wajib diserahkan kepada kepemilikan mutlak pemerintah asing"
                ],
                "correct": 1,
                "hint": "Tax ratio yang rendah membatasi ruang fiskal (fiscal space) untuk belanja pembangunan dan pendidikan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Tax ratio yang rendah membatasi ruang fiskal (<em>fiscal space</em>) negara. Akibatnya, alokasi anggaran untuk pendidikan berkualitas, kesehatan, infrastruktur, dan riset menjadi terbatas, atau pemerintah terpaksa lebih banyak bergantung pada pembiayaan utang untuk menutupi defisit.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Tax ratio yang rendah justru mencerminkan keterbatasan penerimaan kas negara, bukan surplus berlebih.</li><li><strong>Opsi C:</strong> Fungsi uang rupiah sebagai alat pembayaran sah tidak ditentukan oleh persentase tax ratio terhadap PDB.</li><li><strong>Opsi D:</strong> Aset infrastruktur strategis tetap berada di bawah kedaulatan hukum dan kepemilikan negara Indonesia.</li></ul></div>"
            }
        ]
    },
    {
        "id": 6,
        "title": "Level 06: Arsitektur Fiskal & APBN",
        "subtitle": "Batas Defisit 3%, Rasio Utang 60% PDB, Keseimbangan Primer, dan Belanja Modal",
        "theme": "fiscal",
        "unlocks": "Gelar: Perancang APBN",
        "questionPool": [
            {
                "id": "s3_q9",
                "theoryKey": "automatic_stabilizers",
                "theoryTitle": "Penstabil Otomatis Fiskal (Automatic Stabilizers)",
                "scenario": "⚖️ Pajak Progresif PPh Orang Pribadi",
                "question": "Sistem Pajak Penghasilan (PPh) Orang Pribadi di Indonesia menerapkan lapisan tarif berjenjang, mulai dari 5% hingga 35% untuk penghasilan tertinggi. Prinsip keadilan perpajakan apakah yang mendasari struktur tarif progresif ini?",
                "options": [
                    "Keadilan Horisontal Murni, di mana setiap warga negara membayar jumlah rupiah pajak yang persis sama rata",
                    "Keadilan Vertikal (Ability-to-Pay Principle), di mana wajib pajak berpenghasilan lebih tinggi memikul porsi kontribusi marjinal lebih besar",
                    "Prinsip Regresifitas Fiskal, yang bertujuan meringankan beban pajak bagi korporasi pemilik modal besar",
                    "Asas Teritorial Khusus, yang membebaskan pajak atas seluruh pendapatan individu yang diperoleh di ibu kota negara"
                ],
                "correct": 1,
                "hint": "Prinsip kemampuan membayar (Ability to Pay): yang berpenghasilan tinggi menanggung beban tarif marjinal lebih besar!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Tarif pajak progresif mencerminkan prinsip <em>Keadilan Vertikal</em> dan <em>Ability to Pay</em>. Wajib pajak dengan kemampuan ekonomi lebih tinggi dikenakan tarif marjinal lebih besar untuk mendukung fungsi redistribusi pendapatan negara dan mempersempit ketimpangan (menurunkan rasio Gini).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Membayar nominal pajak yang sama rata (<em>lump-sum / poll tax</em>) justru sangat tidak adil bagi kelompok miskin.</li><li><strong>Opsi C:</strong> Tarif progresif adalah antitesis dari sistem regresif; sistem progresif menaikkan beban tarif bagi yang kaya.</li><li><strong>Opsi D:</strong> PPh berlaku secara nasional mencakup seluruh yurisdiksi perpajakan Indonesia tanpa diskriminasi wilayah ibu kota.</li></ul></div>"
            },
            {
                "id": "s3_q10",
                "theoryKey": "keseimbangan_primer",
                "theoryTitle": "Keseimbangan Primer APBN",
                "scenario": "🛒 Karakteristik Pajak Pertambahan Nilai (PPN)",
                "question": "Pajak Pertambahan Nilai (PPN) atas transaksi konsumsi barang dan jasa sering diklasifikasikan oleh ekonom sebagai pajak yang berkarakter 'Regresif'. Mengapa timbul penilaian tersebut?",
                "options": [
                    "Karena persentase tarif PPN secara otomatis menurun ketika volume pembelian barang konsumen meningkat",
                    "Karena beban pajak PPN menyerap proporsi persentase yang jauh lebih besar dari total pendapatan rumah tangga berpenghasilan rendah",
                    "Karena PPN hanya dipungut dari pengusaha industri berat dan tidak pernah dibebankan kepada konsumen akhir",
                    "Karena hasil penerimaan PPN tidak pernah disetorkan ke kas umum negara melainkan ditahan oleh kasir ritel"
                ],
                "correct": 1,
                "hint": "Meskipun tarifnya seragam (misal 11%), porsi uang pajak terhadap total penghasilan orang miskin jauh lebih besar dibanding bagi orang kaya!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> PPN bertarif seragam (<em>flat rate</em>) pada barang konsumsi. Karena kelompok berpendapatan rendah membelanjakan hampir 100% pendapatannya untuk konsumsi (MPC tinggi), porsi pajak PPN terhadap total pendapatan mereka jauh lebih besar dibanding orang kaya yang menabung sebagian besar pendapatannya.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Tarif persentase PPN tetap konstan per unit transaksi, tidak menurun otomatis berdasarkan kuantitas beli.</li><li><strong>Opsi C:</strong> Beban PPN secara ekonomis digeserkan ke konsumen akhir sebagai penanggung pajak riil.</li><li><strong>Opsi D:</strong> Pedagang ritel bertindak sebagai Pengusaha Kena Pajak (PKP) yang wajib menyetor PPN ke kas negara.</li></ul></div>"
            },
            {
                "id": "s3_q11",
                "theoryKey": "human_capital",
                "theoryTitle": "Mandat Anggaran Pendidikan 20% & Human Capital",
                "scenario": "💼 Pajak Penghasilan Badan & Investasi",
                "question": "Jika banyak negara di kawasan terlibat dalam perang pemangkasan tarif Pajak Penghasilan (PPh) Badan secara berlebihan untuk berebut investasi asing, risiko 'Race to the Bottom' apakah yang terjadi?",
                "options": [
                    "Peningkatan drastis penerimaan pajak korporasi global yang memicu surplus kas negara permanen",
                    "Tergerusnya basis penerimaan pajak negara-negara berkembang sementara korporasi multinasional menikmati keuntungan tanpa kontribusi fiskal memadai",
                    "Kewajiban seluruh perusahaan multinasional untuk memindahkan kantor pusatnya ke wilayah pedesaan terpencil",
                    "Penghapusan seluruh hak paten dan hak kekayaan intelektual industri manufaktur secara internasional"
                ],
                "correct": 1,
                "hint": "Perang tarif diskon pajak antar-negara menggerus penerimaan kas publik masing-masing negara peserta!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Race to the Bottom</em> terjadi saat negara-negara saling banting tarif pajak badan demi menarik modal asing. Hal ini mengikis basis penerimaan pajak domestik, memicu inefisiensi alokasi modal, dan merugikan pendanaan layanan publik, yang mendorong lahirnya inisiatif Pajak Minimum Global OECD.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Memangkas tarif pajak terlalu rendah justru mengurangi rasio penerimaan kas negara dari sektor korporasi.</li><li><strong>Opsi C:</strong> Lokasi kantor korporasi ditentukan oleh efisiensi logistik dan pasar finansial, bukan paksaan ke pedesaan.</li><li><strong>Opsi D:</strong> Perlindungan hak cipta dan paten diatur terpisah melalui kerangka konvensi WIPO dan WTO.</li></ul></div>"
            },
            {
                "id": "s3_q12",
                "theoryKey": "pajak_pigouvian",
                "theoryTitle": "Pajak Pigouvian & Cukai Koreksi Eksternalitas",
                "scenario": "🛡️ Penstabil Otomatis (Automatic Stabilizers)",
                "question": "Instrumen apakah di dalam APBN yang bekerja meredam gejolak resesi secara otomatis tanpa perlu menunggu persetujuan undang-undang anggaran baru dari parlemen?",
                "options": [
                    "Penerbitan surat utang luar negeri darurat yang mensyaratkan persetujuan seluruh negara kreditur",
                    "Penstabil otomatis (Automatic Stabilizers), seperti penurunan alamiah setoran pajak progresif dan peningkatan otomatis klaim jaring pengaman sosial",
                    "Penutupan sementara seluruh pintu perbatasan ekspor impor barang kebutuhan industri manufaktur",
                    "Penyerahan kewenangan penatausahaan kas negara kepada konsorsium lembaga pemeringkat kredit swasta"
                ],
                "correct": 1,
                "hint": "Saat ekonomi turun, pendapatan orang turun sehingga pajak otomatis terpangkas, dan bantuan perlinsos otomatis terpicu!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Automatic Stabilizers</em> adalah mekanisme bawaan fiskal: saat resesi, pendapatan masyarakat turun sehingga beban pajak otomatis menurun, sementara belanja jaring pengaman sosial otomatis meningkat. Mekanisme ini seketika menyuntikkan daya beli tanpa hambatan birokrasi legislasi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Penarikan pinjaman luar negeri darurat memerlukan proses negosiasi dan ratifikasi hukum formal.</li><li><strong>Opsi C:</strong> Menghentikan perdagangan luar negeri justru memutus pasokan bahan baku dan memperparah resesi.</li><li><strong>Opsi D:</strong> Manajemen kas negara adalah mandat konstitusional Bendahara Umum Negara (Menteri Keuangan).</li></ul></div>"
            },
            {
                "id": "s3_q13",
                "theoryKey": "kssk",
                "theoryTitle": "Komite Stabilitas Sistem Keuangan (KSSK)",
                "scenario": "🏦 Keseimbangan Primer (Primary Balance)",
                "question": "Dalam nota keuangan APBN, apakah indikasi fiskal utama jika pos 'Keseimbangan Primer' (Primary Balance) mencatat angka surplus positif?",
                "options": [
                    "Pemerintah tidak lagi memiliki kewajiban membayar utang pokok dan bunga kepada lembaga donor internasional",
                    "Total pendapatan negara telah melampaui seluruh belanja operasional dan belanja modal sebelum memperhitungkan pembayaran bunga utang",
                    "Pemerintah diwajibkan menutup seluruh rekening bank swasta dan mengalihkan dananya ke kas kementerian",
                    "Seluruh kebutuhan belanja pembangunan nasional pada tahun mendatang tidak memerlukan pemungutan pajak rakyat"
                ],
                "correct": 1,
                "hint": "Keseimbangan primer = Pendapatan Negara - Belanja (di luar pembayaran bunga utang); surplus berarti pendapatan cukup untuk membiayai belanja murni!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Keseimbangan Primer</em> adalah total pendapatan negara dikurangi belanja di luar pembayaran bunga utang. Jika mencatat surplus, berarti pendapatan negara sudah mencukupi untuk membiayai seluruh belanja operasional dan proyek, serta sebagian pendapatan dapat dipakai menyicil beban bunga utang masa lalu.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kewajiban membayar bunga dan pokok utang tetap ada dan harus dilunasi sesuai jadwal perjanjian kredit.</li><li><strong>Opsi C:</strong> Posisi keseimbangan primer APBN tidak berhubungan dengan rekening kepemilikan nasabah bank swasta.</li><li><strong>Opsi D:</strong> Pajak tetap merupakan tulang punggung pendapatan negara yang membiayai belanja tahun berjalan.</li></ul></div>"
            },
            {
                "id": "s3_q14",
                "theoryKey": "dana_alokasi_khusus",
                "theoryTitle": "Transfer ke Daerah (TKD) & Dana Alokasi Khusus (DAK)",
                "scenario": "🏛️ Belanja Transfer ke Daerah (TKD)",
                "question": "Sekitar sepertiga dari total belanja APBN dialokasikan ke pemerintah provinsi dan kabupaten/kota melalui Transfer ke Daerah (TKD). Apakah tujuan makroekonomi utama dari transfer fiskal ini?",
                "options": [
                    "Memusatkan seluruh proses pengadaan barang dan jasa kementerian di kantor sekretariat daerah setempat",
                    "Mengurangi ketimpangan fiskal antardaerah (horizontal fiscal imbalance) dan menjamin standar pelayanan publik minimum di seluruh nusantara",
                    "Menghilangkan wewenang kepala daerah dalam menyusun peraturan daerah terkait retribusi pelayanan kebersihan",
                    "Mewajibkan seluruh pemerintah daerah mendepositokan anggaran kas daerah pada instrumen pasar modal luar negeri"
                ],
                "correct": 1,
                "hint": "Pemerataan kapasitas fiskal: daerah dengan PAD kecil tetap mampu mendanai puskesmas dan jalan daerah berkat transfer DAU dan DAK!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Transfer ke Daerah (TKD)</em>—seperti DAU, DAK, DBH, dan Dana Desa—bertujuan mengatasi ketimpangan fiskal horizontal antardaerah yang memiliki basis PAD berbeda, memastikan terwujudnya standar pelayanan publik minimum (SPM) dan integrasi ekonomi nasional.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pengadaan barang kementerian tetap mengikuti regulasi LKPP sesuai batas yurisdiksi masing-masing satker.</li><li><strong>Opsi C:</strong> Kepala daerah tetap memiliki wewenang memungut pajak dan retribusi daerah sesuai UU HKPD.</li><li><strong>Opsi D:</strong> Rekening kas daerah ditempatkan di bank persepsi/BPD domestik untuk pelayanan publik, bukan spekulasi bursa luar negeri.</li></ul></div>"
            },
            {
                "id": "s3_q15",
                "theoryKey": "dana_alokasi_khusus",
                "theoryTitle": "Dana Alokasi Khusus & Desentralisasi Fiskal",
                "scenario": "💎 Dana Abadi Pendidikan (LPDP) & Danantara",
                "question": "Pemerintah mengalokasikan ratusan triliun rupiah ke dalam Dana Abadi Pendidikan (LPDP) dan Sovereign Wealth Fund. Mengapa dana pokok ini diinvestasikan secara permanen dan hanya imbal hasilnya yang dibelanjakan?",
                "options": [
                    "Mencegah pemborosan habis-pakai dalam satu tahun anggaran serta menjamin keberlanjutan pembiayaan beasiswa antargenerasi (intergenerational equity)",
                    "Memenuhi instruksi lembaga donor internasional yang melarang penggunaan dana APBN untuk sektor pendidikan",
                    "Menjamin perbankan swasta asing memperoleh jaminan likuiditas mutlak dari kas kementerian keuangan",
                    "Menggantikan seluruh peranan universitas swasta dalam menyelenggarakan pendidikan vokasi di dalam negeri"
                ],
                "correct": 0,
                "hint": "Konsep keadilan antargenerasi: uang pokok abadi tidak dihabiskan sekarang agar generasi masa depan terus menikmati beasiswa!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Skema <em>Endowment Fund</em> (Dana Abadi) menerapkan prinsip <em>Intergenerational Equity</em>. Dana pokok diakumulasikan dan diinvestasikan pada instrumen aman agar tidak habis di satu periode anggaran, sehingga imbal hasil investasinya dapat mendanai beasiswa riset dan pendidikan generasi masa depan secara abadi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Konstitusi UUD 1945 secara tegas mewajibkan minimal 20% APBN untuk alokasi pendidikan nasional.</li><li><strong>Opsi C:</strong> Penempatan investasi dana abadi diatur ketat pada instrumen aman berdaulat, bukan penjaminan bank swasta asing.</li><li><strong>Opsi D:</strong> Dana abadi pendidikan justru mendukung mahasiswa dan akademisi dari berbagai perguruan tinggi negeri maupun swasta.</li></ul></div>"
            },
            {
                "id": "s3_q16",
                "theoryKey": "anggaran_kesehatan",
                "theoryTitle": "Alokasi Anggaran Kesehatan & JKN",
                "scenario": "📑 Belanja Wajib Pendidikan 20% (Mandatory Spending)",
                "question": "Konstitusi mengamanatkan alokasi minimal 20% APBN untuk sektor pendidikan. Dari kacamata teori pertumbuhan ekonomi endogen, belanja pendidikan dipandang sebagai investasi strategis pada:",
                "options": [
                    "Penyediaan likuiditas uang kartal perbankan untuk mempercepat transmisi suku bunga moneter",
                    "Akumulasi modal manusia (human capital) yang meningkatkan Total Factor Productivity (TFP) dan kapasitas inovasi nasional",
                    "Pembelian aset tanah spekulatif pemerintah untuk dijual kembali saat harga properti melonjak",
                    "Pemberian jaminan kompensasi keuntungan komersial bagi seluruh penerbit buku komersial swasta"
                ],
                "correct": 1,
                "hint": "Modal manusia (human capital): pendidikan menciptakan tenaga kerja terampil, produktif, dan inovatif!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Teori pertumbuhan endogen (Lucas & Romer) membuktikan bahwa investasi pada pendidikan dan keterampilan membangun <em>Human Capital</em>. Peningkatan mutu SDM mendorong <em>Total Factor Productivity (TFP)</em> dan inovasi teknologi, yang menjadi mesin utama pertumbuhan PDB jangka panjang.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Penyediaan likuiditas uang kartal adalah ranah kebijakan operasional moneter bank sentral, bukan fungsi pendidikan.</li><li><strong>Opsi C:</strong> Anggaran pendidikan dilarang dialihkan untuk aktivitas spekulasi tanah komersial non-pendidikan.</li><li><strong>Opsi D:</strong> Alokasi pendidikan membiayai sarana sekolah, gaji guru, dan beasiswa, bukan jaminan margin laba penerbit swasta.</li></ul></div>"
            },
            {
                "id": "s3_q17",
                "theoryKey": "rasio_utang_negara",
                "theoryTitle": "Batas Rasio Utang Negara 60% PDB",
                "scenario": "📜 Peringkat Kredit (Sovereign Credit Rating)",
                "question": "Lembaga pemeringkat internasional (seperti S&P, Moody's, Fitch) menyematkan peringkat 'Investment Grade' pada surat utang pemerintah Indonesia. Mengapa peringkat ini sangat krusial bagi postur belanja APBN?",
                "options": [
                    "Peringkat tersebut mewajibkan bank sentral luar negeri membeli seluruh emisi obligasi tanpa hak suara",
                    "Peringkat yang baik menurunkan premi risiko sehingga yield kupon utang lebih rendah dan menghemat beban bunga pinjaman APBN",
                    "Pemerintah dibebaskan dari kewajiban melaporkan realisasi belanja pembiayaan kepada badan legislatif",
                    "Seluruh transaksi ekspor produk pertanian domestik secara otomatis dibebaskan dari tarif bea masuk mitra dagang"
                ],
                "correct": 1,
                "hint": "Reputasi kelayakan kredit tinggi menurunkan premi risiko bunga kupon yang harus dibayar kas negara!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Status <em>Investment Grade</em> mencerminkan persepsi risiko gagal bayar yang rendah. Hal ini menekan premi risiko (<em>credit spread</em>), sehingga pemerintah dapat menerbitkan SBN dengan tingkat bunga (yield) yang lebih murah, secara signifikan menghemat pos belanja pembayaran bunga utang dalam APBN.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Keputusan pembelian obligasi oleh investor global bersifat sukarela berdasarkan analisis komersial portofolio.</li><li><strong>Opsi C:</strong> Akuntabilitas kepada DPR merupakan kewajiban konstitusional mutlak yang tidak dipengaruhi peringkat kredit.</li><li><strong>Opsi D:</strong> Tarif bea masuk ekspor diatur dalam perjanjian perdagangan internasional bilateral/multilateral, bukan rating utang.</li></ul></div>"
            },
            {
                "id": "s3_q18",
                "theoryKey": "anggaran_berimbang",
                "theoryTitle": "Teorema Multiplier Anggaran Berimbang",
                "scenario": "🏭 Insentif Tax Holiday untuk Hilirisasi",
                "question": "Pemerintah memberikan fasilitas Tax Holiday (pembebasan PPh Badan bertempo tertentu) kepada investor yang membangun smelter nikel dan ekosistem baterai kendaraan listrik. Apa kalkulasi cost-benefit makro di balik insentif fiskal ini?",
                "options": [
                    "Meniadakan seluruh potensi pemungutan pajak royalti tambang mineral secara permanen bagi kas daerah",
                    "Melepaskan penerimaan PPh jangka pendek demi menarik modal raksasa, transfer teknologi, penyerapan tenaga kerja, dan nilai tambah ekspor",
                    "Memastikan bahwa seluruh hasil produksi mineral nikel langsung dikonsumsi secara cuma-cuma oleh warga sekitar pabrik",
                    "Menghapuskan kewajiban perusahaan dalam mematuhi standar analisis mengenai dampak lingkungan hidup (AMDAL)"
                ],
                "correct": 1,
                "hint": "Pengorbanan pajak jangka pendek untuk memperoleh lompatan nilai tambah ekspor, industri hilir, dan penciptaan lapangan kerja!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Analisis <em>Cost-Benefit</em> fiskal: biaya hilangnya penerimaan PPh Badan sementara (<em>tax expenditure</em>) dikompensasi oleh manfaat yang jauh lebih besar: masuknya investasi padat modal (FDI), penciptaan lapangan kerja, peningkatan nilai tambah ekspor, dan efek pengganda rantai pasok domestik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Penerimaan PNBP royalti tambang dan pajak daerah lainnya tetap dipungut sesuai regulasi yang berlaku.</li><li><strong>Opsi C:</strong> Hasil hilirisasi nikel dan baterai diperdagangkan sebagai input industri manufaktur global dan domestik.</li><li><strong>Opsi D:</strong> Perusahaan penerima fasilitas tetap wajib mematuhi ketentuan perlindungan lingkungan hidup dan AMDAL.</li></ul></div>"
            },
            {
                "id": "s3_q19",
                "theoryKey": "dana_abadi",
                "theoryTitle": "Sovereign Wealth Fund & Dana Abadi (LPDP & INA)",
                "scenario": "🚬 Cukai Rokok & Eksternalitas Negatif",
                "question": "Pemerintah secara berkala menaikkan tarif Cukai Hasil Tembakau (rokok). Selain menyumbang penerimaan kas negara lebih dari Rp 200 triliun, fungsi regulasi (Pigouvian Tax) apakah yang diemban oleh instrumen cukai ini?",
                "options": [
                    "Memberikan subsidi silang bagi industri tembakau agar dapat mengekspor produk secara gratis ke negara maju",
                    "Menginternalisasi biaya eksternalitas negatif kesehatan dan mengendalikan prevalensi konsumsi rokok di masyarakat",
                    "Mewajibkan pabrik rokok mengganti seluruh bahan baku tembakau dengan serat tanaman pangan pokok",
                    "Menghilangkan kewajiban perlindungan jaminan kesehatan nasional bagi pekerja di sektor perkebunan"
                ],
                "correct": 1,
                "hint": "Pajak Pigouvian mengenakan pungutan pada konsumsi yang menimbulkan eksternalitas negatif (biaya penyakit/medis)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Cukai rokok berfungsi sebagai <em>Pigouvian Tax</em> untuk mengoreksi kegagalan pasar akibat eksternalitas negatif konsumsi tembakau (biaya medis penyakit kronis). Kenaikan cukai menaikkan harga jual eceran untuk menekan konsumsi (terutama usia muda) sekaligus membiayai layanan kesehatan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Cukai adalah instrumen disinsentif konsumsi, bukan fasilitas subsidi komersial bagi produsen rokok.</li><li><strong>Opsi C:</strong> Cukai tidak memaksa pergantian formula serat tembakau menjadi bahan pangan.</li><li><strong>Opsi D:</strong> Perlindungan jaminan kesehatan (BPJS) tetap merupakan hak ketenagakerjaan yang wajib dipenuhi.</li></ul></div>"
            },
            {
                "id": "s3_q20",
                "theoryKey": "pembelian_sbn_bi",
                "theoryTitle": "Pembelian SBN oleh BI di Pasar Perdana (Kondisi Krisis)",
                "scenario": "🌱 Pajak Karbon (Carbon Tax) & Transisi Energi",
                "question": "Indonesia merancang penerapan regulasi Nilai Ekonomi Karbon dan Pajak Karbon (Carbon Tax). Apakah mekanisme ekonomi utama yang ingin dicapai melalui instrumen instrumen fiskal lingkungan ini?",
                "options": [
                    "Mewajibkan penutupan seketika seluruh fasilitas industri manufaktur yang menggunakan energi listrik",
                    "Memberi sinyal harga (price signal) pada emisi polusi sehingga dunia usaha terinsentif beralih ke efisiensi dan energi bersih",
                    "Menjamin pembebasan pajak penghasilan permanen bagi korporasi yang menggunakan bahan bakar batu bara murni",
                    "Memindahkan seluruh operasional pembangkit listrik konvensional ke wilayah perairan internasional bebas pajak"
                ],
                "correct": 1,
                "hint": "Menetapkan harga atas emisi polusi mendorong industri berinvestasi pada teknologi ramah lingkungan dan energi terbarukan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pajak Karbon menciptakan <em>Carbon Pricing Signal</em>. Dengan mengenakan biaya atas setiap ton emisi gas rumah kaca, produsen menghadapi biaya marjinal lebih tinggi bila berpolusi, sehingga secara rasional terdorong mengadopsi teknologi rendah emisi dan beralih ke energi baru terbarukan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Transisi energi dilakukan secara terukur dan bertahap tanpa melumpuhkan aktivitas industri nasional.</li><li><strong>Opsi C:</strong> Penggunaan bahan bakar beremisi tinggi justru menjadi objek kena pajak, bukan penerima insentif bebas pajak.</li><li><strong>Opsi D:</strong> Relokasi pembangkit ke laut lepas tidak realistis dan tidak menyelesaikan komitmen penurunan emisi NDC.</li></ul></div>"
            },
            {
                "id": "s3_q21",
                "theoryKey": "kurva_laffer",
                "theoryTitle": "Kurva Laffer (Laffer Curve) & Tarif Pajak Optimal",
                "scenario": "🤝 Kerjasama Pemerintah & Badan Usaha (KPBU)",
                "question": "Pembangunan proyek infrastruktur skala besar (seperti SPAM air minum dan pelabuhan) sering menggunakan skema Kerjasama Pemerintah dan Badan Usaha (KPBU / PPP). Apa manfaat fiskal skema ini bagi kas negara?",
                "options": [
                    "Menghilangkan kebutuhan kementerian keuangan untuk menyusun pembukuan neraca utang berdaulat",
                    "Mengungkit partisipasi modal dan efisiensi teknologi swasta serta membagi risiko proyek tanpa membebani seluruh belanja APBN",
                    "Membebaskan operator swasta dari kewajiban mematuhi standar keselamatan dan tarif batas atas layanan publik",
                    "Mewajibkan pemegang konsesi menyetorkan seluruh pendapatan kotor langsung ke rekening pribadi pejabat daerah"
                ],
                "correct": 1,
                "hint": "KPBU memanfaatkan modal dan keahlian swasta dengan pembagian risiko yang adil tanpa membebani kas APBN 100% di depan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Skema KPBU (<em>Public-Private Partnership</em>) memungkinkan pembangunan infrastruktur terlaksana melalui pembiayaan kreatif tanpa membebani kas APBN di muka. Pemerintah menyediakan dukungan kelayakan/penjaminan, sedangkan badan usaha menanggung pembiayaan, konstruksi, dan efisiensi operasional.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kewajiban kontinjensi penjaminan KPBU tetap wajib dicatat dan dipantau dalam neraca risiko fiskal APBN.</li><li><strong>Opsi C:</strong> Standar mutu layanan dan regulasi tarif tetap diatur ketat oleh regulator pemerintah demi kepentingan publik.</li><li><strong>Opsi D:</strong> Seluruh aliran pendapatan proyek disetorkan ke rekening proyek konsorsium resmi di bawah pengawasan audit legal.</li></ul></div>"
            },
            {
                "id": "s3_q22",
                "theoryKey": "fiskal_ruang_gerak",
                "theoryTitle": "Ruang Fiskal (Fiscal Space)",
                "scenario": "🛡️ KSSK: Komite Stabilitas Sistem Keuangan",
                "question": "Ketika stabilitas sistem keuangan menghadapi ancaman guncangan krisis, Menteri Keuangan mengoordinasikan respon bersama Gubernur BI, Ketua OJK, dan Ketua LPS dalam forum KSSK. Mengapa sinergi kelembagaan ini mutlak diperlukan?",
                "options": [
                    "Menyatukan kewenangan keempat lembaga menjadi satu kementerian tunggal di bawah koordinasi sekretariat jenderal",
                    "Menyelaraskan instrumen fiskal, moneter, pengawasan mikroprudensial, dan penjaminan simpanan guna mencegah krisis sistemik",
                    "Mewajibkan dewan gubernur bank sentral menyerahkan cadangan devisa langsung ke rekening operasional partai politik",
                    "Menghapuskan mekanisme pasar modal dan membekukan seluruh izin usaha perbankan komersial swasta secara permanen"
                ],
                "correct": 1,
                "hint": "Empat pilar arsitektur keuangan: Fiskal (Kemenkeu), Moneter (BI), Pengawasan Mikro (OJK), dan Penjaminan (LPS) harus sinkron saat krisis!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Sesuai mandat UU P2SK, Komite Stabilitas Sistem Keuangan (KSSK) berkoordinasi secara terpadu mengintegrasikan kebijakan fiskal (APBN), kebijakan moneter/makroprudensial (BI), pengawasan kehati-hatian perbankan (OJK), dan resolusi penjaminan simpanan (LPS) untuk meredam risiko sistemik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Keempat lembaga tetap mempertahankan independensi institusional dan mandat fungsinya masing-masing.</li><li><strong>Opsi C:</strong> Cadangan devisa negara dikelola independen oleh BI dan dilarang disalahgunakan untuk kepentingan partai.</li><li><strong>Opsi D:</strong> Koordinasi KSSK justru bertujuan menjaga kelangsungan operasional pasar keuangan dan perbankan yang sehat.</li></ul></div>"
            },
            {
                "id": "s3_q23",
                "theoryKey": "belanja_mengikat",
                "theoryTitle": "Belanja Wajib / Mengikat (Mandatory Spending)",
                "scenario": "🔄 Sisa Lebih Pembiayaan Anggaran (SiLPA)",
                "question": "Di akhir tahun anggaran, realisasi defisit APBN tercatat lebih rendah dari target pembiayaan awal sehingga terbentuk Sisa Lebih Pembiayaan Anggaran (SiLPA). Bagaimanakah fungsi strategis saldo kas SiLPA bagi pengelolaan fiskal tahun berikutnya?",
                "options": [
                    "Membagikan saldo kas tersebut secara tunai sebagai insentif pribadi bagi seluruh pegawai kementerian keuangan",
                    "Ditempatkan sebagai Saldo Anggaran Lebih (SAL) yang berfungsi sebagai penyangga likuiditas (fiscal buffer) dan mengurangi kebutuhan emisi utang baru",
                    "Mewajibkan kementerian membelanjakan seluruh saldo kas tersebut dalam tempo satu malam pada pos jamuan makan hotel",
                    "Mengonversi seluruh saldo rupiah tersebut menjadi obligasi swasta asing berisiko tinggi tanpa persetujuan bendahara negara"
                ],
                "correct": 1,
                "hint": "SiLPA diakumulasikan menjadi Saldo Anggaran Lebih (SAL), menjadi bantalan kas darurat dan mengurangi penarikan utang baru!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> SiLPA tahun berjalan dibukukan ke dalam <em>Saldo Anggaran Lebih (SAL)</em>. Saldo kas likuid ini menjadi bantalan penyangga fiskal (<em>fiscal buffer</em>) yang dapat digunakan sewaktu-waktu untuk menghadapi guncangan ekonomi atau mengurangi target penerbitan utang SBN baru di tahun anggaran berikutnya.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Saldo kas negara adalah milik publik dan tunduk pada pertanggungjawaban hukum keuangan negara, bukan bonus pribadi.</li><li><strong>Opsi C:</strong> Penggunaan anggaran wajib didasarkan pada alokasi DIPA yang disahkan, bukan pemborosan terburu-buru.</li><li><strong>Opsi D:</strong> Penempatan kas negara diatur ketat pada instrumen bebas risiko kredit di bawah kewenangan Bendahara Umum Negara.</li></ul></div>"
            },
            {
                "id": "s3_q24",
                "theoryKey": "efisiensi_birokrasi",
                "theoryTitle": "Reformasi Belanja Pegawai & Efisiensi Birokrasi",
                "scenario": "💼 Efisiensi Belanja Barang (Spending Better)",
                "question": "Kementerian Keuangan mendorong implementasi reformasi 'Spending Better' dengan memangkas pos belanja barang non-prioritas (seperti perjalanan dinas dan seremonial). Dampak positif fundamentalnya terhadap postur APBN adalah:",
                "options": [
                    "Menurunkan kualitas pelayanan publik karena aparatur sipil negara dilarang melakukan pekerjaan dinas",
                    "Meningkatkan ruang fiskal (fiscal space) untuk dialihkan ke belanja produktif seperti infrastruktur dasar, gizi anak, dan perlindungan sosial",
                    "Menghilangkan kewajiban kementerian dan lembaga dalam menyusun laporan kinerja akuntabilitas instansi pemerintah",
                    "Memaksa pemda memungut retribusi tambahan dari setiap warga yang memasuki gedung perkantoran pemerintah"
                ],
                "correct": 1,
                "hint": "Memangkas pemborosan belanja operasional mengalihkan uang negara ke proyek produktif yang dirasakan langsung oleh rakyat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kebijakan <em>Spending Better</em> bertujuan meningkatkan efisiensi alokasi (<em>allocative efficiency</em>). Menghemat belanja barang seremonial dan operasional birokrasi memperluas ruang fiskal untuk belanja bernilai tambah tinggi seperti penanganan stunting, pendidikan vokasi, dan infrastruktur konektivitas.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Digitalisasi administrasi justru meningkatkan efisiensi birokrasi tanpa mengorbankan kualitas pelayanan publik.</li><li><strong>Opsi C:</strong> Pelaporan akuntabilitas kinerja (LAKIP/SAKIP) tetap menjadi instrumen pengawasan wajib yang diperketat.</li><li><strong>Opsi D:</strong> Pemda dilarang memungut retribusi liar di luar ketentuan yang telah disahkan dalam peraturan perundang-undangan.</li></ul></div>"
            }
        ]
    },
    {
        "id": 7,
        "title": "Level 07: Perpajakan & Pembiayaan Negara",
        "subtitle": "Tax Ratio, Pajak Progresif, PPN, Transfer ke Daerah, dan Dana Abadi",
        "theme": "taxation",
        "unlocks": "Gelar: Ahli Kebijakan Fiskal",
        "questionPool": [
            {
                "id": "s3_q25",
                "theoryKey": "sal_apbn",
                "theoryTitle": "Saldo Anggaran Lebih (SAL) Kas Negara",
                "scenario": "💰 Struktur Utang: Domestik vs Valas",
                "question": "Dalam manajemen portofolio utang negara, kementerian keuangan secara konsisten menggeser komposisi utang ke denominasi rupiah (mencapai lebih dari 70%). Apakah keunggulan strategis mitigasi risiko dari portofolio ini?",
                "options": [
                    "Menghilangkan seluruh beban pembayaran bunga kupon obligasi pemerintah bagi investor dalam negeri",
                    "Memitigasi risiko volatilitas nilai tukar (currency mismatch) sehingga pelemahan kurs tidak melipatgandakan beban cicilan pokok utang APBN",
                    "Menjamin bahwa seluruh obligasi negara dapat dilunasi seketika dengan mencetak uang kertas tanpa batas di akhir tahun",
                    "Mewajibkan seluruh investor asing menjual kepemilikan aset sahamnya di bursa efek domestik"
                ],
                "correct": 1,
                "hint": "Utang dalam Rupiah melindungi kas negara dari bahaya lonjakan utang saat kurs Dolar menguat tajam (currency risk)!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Utang luar negeri berdenominasi valas mengandung risiko kurs (<em>exchange rate risk</em>); pelemahan rupiah otomatis membengkakkan beban pembayaran pokok dan bunga dalam APBN. Dominasi SBN rupiah memitigasi bahaya ini dan memperdalam pasar keuangan domestik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kupon SBN rupiah tetap dibayarkan secara rutin sebagai kewajiban kontraktual yang sah kepada investor.</li><li><strong>Opsi C:</strong> Pelunasan utang rupiah dibiayai dari pendapatan pajak dan pembiayaan terencana, bukan pencetakan uang ugal-ugalan.</li><li><strong>Opsi D:</strong> Investor asing tetap disambut baik untuk berinvestasi di pasar obligasi negara maupun pasar modal saham.</li></ul></div>"
            },
            {
                "id": "s3_q26",
                "theoryKey": "pajak_karbon",
                "theoryTitle": "Pajak Karbon & Nilai Ekonomi Karbon (Carbon Pricing)",
                "scenario": "💻 Digitalisasi Core Tax & Shadow Economy",
                "question": "Direktorat Jenderal Pajak meluncurkan integrasi pembaruan sistem teknologi perpajakan (Core Tax Administration System). Manfaat makroekonomi terbesar dari modernisasi administrasi digital ini adalah:",
                "options": [
                    "Mewajibkan seluruh warga negara menyetorkan separuh dari total pendapatannya ke kas negara setiap pekan",
                    "Meningkatkan kepatuhan sukarela, menekan biaya administrasi (compliance cost), dan menyusutkan shadow economy melalui interoperabilitas data",
                    "Menghapuskan seluruh fungsi pemeriksa pajak dan menyerahkan proses penetapan sengketa ke lembaga peradilan internasional",
                    "Membebaskan seluruh korporasi multinasional dari kewajiban pelaporan surat pemberitahuan tahunan (SPT)"
                ],
                "correct": 1,
                "hint": "Digitalisasi perpajakan memudahkan wajib pajak jujur melapor dan mendeteksi sektor ekonomi bayangan (shadow economy) yang mangkir pajak!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Core Tax System</em> mengintegrasikan 21 proses bisnis perpajakan dengan analitik data pihak ketiga (perbankan, pertanahan, instansi lain). Hal ini menurunkan <em>compliance costs</em> bagi wajib pajak, memperluas basis pajak, dan mempersempit ruang gerak ekonomi bawah tanah (<em>shadow economy</em>).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Core Tax adalah sistem administrasi teknologi, bukan regulasi pemotongan tarif pajak ekstrem separuh penghasilan.</li><li><strong>Opsi C:</strong> Pemeriksaan dan penyelesaian sengketa pajak tetap diproses melalui mekanisme Pengadilan Pajak domestik yang sah.</li><li><strong>Opsi D:</strong> Seluruh korporasi tetap diwajibkan menyampaikan SPT tahunan secara elektronik dengan transparansi penuh.</li></ul></div>"
            },
            {
                "id": "s3_q27",
                "theoryKey": "pembiayaan_kreatif",
                "theoryTitle": "Pembiayaan Infrastruktur Kreatif Non-Utang",
                "scenario": "🌊 Pooling Fund Bencana Alam",
                "question": "Sebagai negara yang berada pada jalur Ring of Fire, Indonesia membentuk instrumen Dana Bersama Penanggulangan Bencana (Pooling Fund Bencana). Mengapa instrumen ini penting bagi ketahanan APBN?",
                "options": [
                    "Menghapuskan kewajiban pemerintah daerah dalam menyediakan logistik evakuasi tanggap darurat warga",
                    "Menyediakan skema pendanaan siap pakai dan asuransi risiko bencana guna melindungi APBN dari pembengkakan defisit mendadak akibat gempa/tsunami",
                    "Memaksa warga di wilayah rawan bencana menanggung sendiri seluruh biaya pembangunan kembali fasilitas jembatan",
                    "Mengalihkan seluruh cadangan kas devisa bank sentral ke rekening perusahaan asuransi komersial luar negeri"
                ],
                "correct": 1,
                "hint": "Skema pooling fund mengasuransikan aset negara: jika gempa merusak jembatan/sekolah, klaim asuransi langsung cair tanpa mengacaukan belanja APBN!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Pooling Fund Bencana (PFB)</em> adalah strategi pembiayaan dan asuransi risiko bencana (DRFI). Melalui pengumpulan dana abadi dan pengalihan risiko ke asuransi parametrik, pemerintah dapat merekonstruksi infrastruktur publik secara cepat tanpa merealokasi anggaran belanja prioritas lainnya.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pemerintah daerah dan BNPB tetap memegang peran sentral dalam manajemen tanggap darurat dan logistik.</li><li><strong>Opsi C:</strong> Rekonstruksi sarana umum yang hancur tetap menjadi tanggung jawab belanja pemulihan negara.</li><li><strong>Opsi D:</strong> Cadangan devisa moneter BI terpisah dari pengelolaan dana pooling fund fiskal di Kementerian Keuangan.</li></ul></div>"
            },
            {
                "id": "s3_q28",
                "theoryKey": "kepatuhan_pajak",
                "theoryTitle": "Kepatuhan Pajak Sukarela (Voluntary Compliance)",
                "scenario": "📈 Konsolidasi Fiskal Pasca-Pandemi",
                "question": "Pemerintah Indonesia berhasil mengembalikan defisit APBN ke bawah 3% PDB pada tahun 2022, satu tahun lebih cepat dari tenggat regulasi darurat pandemi. Mengapa capaian konsolidasi fiskal ini diapresiasi oleh investor global?",
                "options": [
                    "Karena pemerintah membuktikan kredibilitas komitmen disiplin fiskal dan kemampuan menormalkan neraca negara pasca-krisis",
                    "Karena kementerian keuangan berhasil melunasi seluruh pokok utang negara tanpa menyisakan saldo kewajiban apa pun",
                    "Karena pemerintah membekukan seluruh kegiatan perekonomian swasta agar impor barang konsumsi mencapai angka nol",
                    "Karena bank sentral mengambil alih seluruh fungsi pemungutan pajak penghasilan dari kementerian teknis"
                ],
                "correct": 0,
                "hint": "Konsolidasi fiskal cepat membuktikan kredibilitas teknokrat pengelola anggaran dalam menyehatkan kembali kas negara!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Mengembalikan defisit ke bawah 3% PDB lebih cepat dari jadwal membuktikan komitmen disiplin fiskal (<em>fiscal discipline credibility</em>). Didukung windfall komoditas dan reformasi perpajakan, langkah ini memperkuat keyakinan investor dan menjaga premi risiko obligasi Indonesia tetap rendah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Utang negara tidak lunas 100% melainkan rasionya terhadap PDB menurun dan terkelola pada level aman berkelanjutan.</li><li><strong>Opsi C:</strong> Konsolidasi fiskal terjadi beriringan dengan pemulihan aktivitas ekonomi riil, bukan melalui pembekuan bisnis swasta.</li><li><strong>Opsi D:</strong> Pemungutan pajak tetap merupakan otoritas tunggal Direktorat Jenderal Pajak Kementerian Keuangan.</li></ul></div>"
            },
            {
                "id": "s3_q29",
                "theoryKey": "belanja_bansos",
                "theoryTitle": "Bantalan Sosial & Jaring Pengaman Kemiskinan",
                "scenario": "⚖️ Belanja Perlindungan Sosial (Perlinsos)",
                "question": "Alokasi pos Belanja Perlindungan Sosial (Perlinsos) mencapai ratusan triliun rupiah per tahun dalam APBN. Dari perspektif makroekonomi, fungsi apakah yang dijalankan oleh jaring pengaman sosial ini?",
                "options": [
                    "Menjadi lantai penyangga daya beli kelompok rentan (consumption floor) agar tidak terperosok ke jurang kemiskinan ekstrem saat terjadi guncangan harga",
                    "Mendorong seluruh masyarakat berhenti mencari pekerjaan formal demi mengandalkan santunan kas negara",
                    "Menjamin nilai tukar rupiah terapresiasi secara mutlak terhadap seluruh mata uang mitra dagang internasional",
                    "Membiayai pembagian dividen tunai bagi seluruh jajaran komisaris korporasi badan usaha milik negara"
                ],
                "correct": 0,
                "hint": "Perlinsos menjaga batas bawah konsumsi (consumption floor) agar keluarga miskin tetap dapat memenuhi gizi dasar!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Belanja Perlinsos (PKH, Sembako, dll) berfungsi sebagai <em>social safety net</em> dan lantai konsumsi dasar (<em>consumption floor</em>). Program ini mencegah naiknya angka kemiskinan ekstrem saat terjadi inflasi pangan, sekaligus mempertahankan perputaran konsumsi di tingkat ekonomi akar rumput.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Bantuan sosial bersyarat (CCT) justru dirancang mendorong anak bersekolah dan ibu memeriksa kesehatan tanpa menciptakan jebakan ketergantungan.</li><li><strong>Opsi C:</strong> Perlinsos fokus pada jaring pengaman domestik, bukan instrumen pengendalian nilai tukar valuta asing.</li><li><strong>Opsi D:</strong> Dana bansos disalurkan langsung ke rekening masyarakat miskin terdata, bukan untuk dividen direksi BUMN.</li></ul></div>"
            },
            {
                "id": "s3_q30",
                "theoryKey": "audit_bpk",
                "theoryTitle": "Pengawasan Anggaran & Opini WTP BPK",
                "scenario": "📦 Penerimaan Negara Bukan Pajak (PNBP)",
                "question": "Kas negara menerima pendapatan ratusan triliun rupiah dari pos PNBP Sumber Daya Alam (migas dan pertambangan mineral). Mengapa pengelolaan pos pendapatan ini memerlukan kehati-hatian ekstra?",
                "options": [
                    "Karena pos PNBP SDA sangat rentan terhadap fluktuasi siklus harga komoditas global sehingga tidak dapat dipatok stabil selamanya",
                    "Karena penerimaan royalti komoditas tambang secara hukum internasional dilarang untuk dibelanjakan di dalam negeri",
                    "Karena seluruh pendapatan PNBP migas wajib dibagikan secara tunai kepada investor swasta pemegang izin eksplorasi",
                    "Karena pendapatan bukan pajak secara otomatis memicu pemutusan hubungan kerja massal pada industri manufaktur"
                ],
                "correct": 0,
                "hint": "Harga minyak dan tambang dunia naik-turun tajam; mengandalkan PNBP SDA tanpa dana penyangga sangat berbahaya!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Penerimaan PNBP komoditas SDA bersifat <em>volatile</em> dan sangat bergantung pada siklus harga komoditas global (<em>commodity boom and bust</em>). Kehati-hatian diperlukan agar belanja rutin yang mengikat tidak dinaikkan saat rezeki nomplok (windfall), yang dapat memicu krisis saat harga komoditas anjlok.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Penerimaan PNBP SDA adalah hak penerimaan sah negara dan disetorkan ke kas APBN untuk mendanai pembangunan publik.</li><li><strong>Opsi C:</strong> Royalti adalah kewajiban setoran perusahaan ke kas negara, bukan dividen yang dikembalikan ke kontraktor swasta.</li><li><strong>Opsi D:</strong> PNBP SDA memperkuat kas negara dan tidak berhubungan langsung dengan PHK industri pengolahan hilir.</li></ul></div>"
            },
            {
                "id": "s3_q31",
                "theoryKey": "debt_sustainability",
                "theoryTitle": "Analisis Keberlanjutan Utang (Debt Sustainability)",
                "scenario": "🏛️ Belanja Modal vs Belanja Barang",
                "question": "Dalam penyusunan arsitektur APBN yang sehat, menteri keuangan berupaya meningkatkan alokasi Belanja Modal dibandingkan Belanja Barang. Apakah perbedaan hakiki dari kedua jenis belanja publik tersebut?",
                "options": [
                    "Belanja modal menghasilkan aset fisik tetap yang meningkatkan kapasitas produksi jangka panjang, sedangkan belanja barang habis terpakai untuk operasional",
                    "Belanja modal hanya boleh digunakan untuk membiayai operasional jamuan dinas sedangkan belanja barang untuk pembangunan jalan tol",
                    "Belanja barang secara otomatis menambah neraca aset berdaulat negara sedangkan belanja modal dihapuskan dari pembukuan fiskal",
                    "Belanja modal dibiayai murni dari pinjaman utang luar negeri sedangkan belanja barang dibiayai dari emisi uang kartal baru"
                ],
                "correct": 0,
                "hint": "Belanja modal menciptakan aset berwujud puluhan tahun (jalan, gedung, jembatan); belanja barang habis untuk operasional rutin!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Belanja Modal</em> menghasilkan aset tetap berwujud (infrastruktur, mesin, jaringan) yang masa manfaatnya lebih dari satu tahun anggaran dan memperluas kapasitas ekonomi. Sebaliknya, <em>Belanja Barang</em> adalah belanja operasional habis pakai untuk mendukung jalannya birokrasi pemerintahan sehari-hari.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Definisi terbalik; belanja modal untuk pembangunan infrastruktur fisik, bukan jamuan operasional dinas.</li><li><strong>Opsi C:</strong> Belanja modal yang menambah neraca aset fisik negara; belanja barang dicatat sebagai beban operasional berjalan.</li><li><strong>Opsi D:</strong> Sumber pembiayaan APBN terpadu dalam satu kas umum (<em>single treasury account</em>) dari pajak dan penerbitan SBN.</li></ul></div>"
            },
            {
                "id": "s3_q32",
                "theoryKey": "belanja_infrastruktur",
                "theoryTitle": "Multiplier Belanja Infrastruktur Fisik",
                "scenario": "🌾 Subsidi Pupuk vs Bantuan Alat Mesin Pertanian (Alsintan)",
                "question": "Pemerintah mengalokasikan bantuan alat dan mesin pertanian modern (traktor dan combine harvester) kepada kelompok tani. Dalam perspektif fungsi produksi ekonomi agregat, kebijakan ini bertujuan memperkuat komponen:",
                "options": [
                    "Tingkat depresiasi aset alamiah yang menurunkan produktivitas tenaga kerja pedesaan secara permanen",
                    "Stok modal fisik (K) dan adopsi teknologi yang mendongkrak produktivitas hasil panen serta menekan susut bulir (losses)",
                    "Jumlah jam kerja buruh manual yang harus dikeluarkan untuk mencangkul lahan sawah secara konvensional",
                    "Tarif bea masuk barang konsumsi pangan dari luar negeri guna membatasi perdagangan domestik"
                ],
                "correct": 1,
                "hint": "Mesin alsintan menambah modal kapital fisik (K) dan teknologi efisiensi di sektor pangan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam fungsi produksi (<em>Y = A × K^α × L^β</em>), bantuan alsintan meningkatkan stok modal fisik (<em>K</em>) dan teknologi pertanian (<em>A</em>). Mekanisasi memangkas waktu olah tanah dan panen serta menekan tingkat susut panen (<em>losses</em>), sehingga produktivitas output pangan per hektar meningkat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Peningkatan modal dan mekanisasi justru mendongkrak produktivitas tenaga kerja tani, bukan menurunkannya.</li><li><strong>Opsi C:</strong> Modernisasi alsintan menghemat tenaga fisik dan waktu kerja buruh, bukan menambah beban jam cangkul manual.</li><li><strong>Opsi D:</strong> Alsintan adalah intervensi peningkatan kapasitas produksi sisi penawaran domestik, bukan instrumen tarif impor.</li></ul></div>"
            },
            {
                "id": "s3_q33",
                "theoryKey": "pajak_daerah",
                "theoryTitle": "Harmonisasi Pajak Daerah & Retribusi (UU HKPD)",
                "scenario": "💵 Pembiayaan Utang Luar Negeri vs Domestik",
                "question": "Ketika pemerintah menerbitkan instrumen obligasi global berdenominasi valas (seperti Global Sukuk atau Samurai Bond), apakah pertimbangan strategis teknokrat fiskal di luar diversifikasi pembiayaan?",
                "options": [
                    "Mendapatkan dana pinjaman tanpa kewajiban mencatatkannya ke dalam laporan neraca pertanggungjawaban APBN",
                    "Membangun patokan imbal hasil (sovereign benchmark) bagi korporasi nasional yang ingin mencari pendanaan valas di pasar modal global",
                    "Menghapuskan wewenang Bank Indonesia dalam mengelola cadangan devisa hasil perdagangan internasional",
                    "Mewajibkan seluruh investor luar negeri menukarkan obligasinya menjadi komoditas mineral mentah domestik"
                ],
                "correct": 1,
                "hint": "Obligasi valas pemerintah menjadi acuan (benchmark) bunga bagi perusahaan-perusahaan Indonesia yang menerbitkan obligasi di luar negeri!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Penerbitan obligasi valas berdaulat (Global Sukuk/Samurai Bond) berfungsi membangun <em>Sovereign Benchmark Yield</em> di pasar global. Patokan ini memudahkan korporasi BUMN dan swasta Indonesia menerbitkan surat utang di luar negeri dengan acuan harga dan premi risiko yang transparan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Seluruh penerbitan surat utang negara wajib tercatat transparan dalam buku laporan pertanggungjawaban APBN.</li><li><strong>Opsi C:</strong> Pengelolaan cadangan devisa tetap merupakan mandat independen Bank Indonesia sesuai undang-undang.</li><li><strong>Opsi D:</strong> Instrumen sukuk global diselesaikan secara finansial dalam valas resmi, bukan barter fisik komoditas tambang.</li></ul></div>"
            },
            {
                "id": "s3_q34",
                "theoryKey": "skema_kpbu",
                "theoryTitle": "Kerjasama Pemerintah dan Badan Usaha (KPBU / PPP)",
                "scenario": "⚖️ Evaluasi Spending Review Kementerian",
                "question": "Direktorat Jenderal Anggaran melaksanakan evaluasi 'Spending Review' berkala terhadap belanja kementerian/lembaga. Apakah kriteria utama penilaian kualitas penyerapan anggaran yang sehat?",
                "options": [
                    "Kemampuan kementerian menghabiskan seluruh pagu kas di pekan terakhir bulan Desember tanpa memedulikan hasil capaian output",
                    "Tercapainya sasaran kinerja keluaran (output) dan dampak nyata (outcome) secara tepat waktu dan efisien sesuai prinsip Value for Money",
                    "Keberhasilan satker dalam menghindari seluruh proses tender pengadaan barang secara elektronik",
                    "Tingginya frekuensi penyelenggaraan rapat koordinasi di hotel berbintang di luar wilayah kantor instansi"
                ],
                "correct": 1,
                "hint": "Anggaran berkualitas diukur dari outcome nyata yang dinikmati rakyat (Value for Money), bukan sekadar habisnya uang di akhir tahun!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Paradigma penganggaran modern berbasis kinerja (<em>Performance-Based Budgeting</em>) tidak sekadar mengukur kecepatan penyerapan serapan kas, melainkan menguji pencapaian hasil nyata (<em>Value for Money: ekonomis, efisien, dan efektif</em>) serta dampak positif program bagi kesejahteraan masyarakat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pola penumpukan belanja di akhir tahun anggaran adalah praktik inefisien yang berusaha dieliminasi oleh spending review.</li><li><strong>Opsi C:</strong> Pengadaan barang wajib melalui sistem e-katalog LKPP untuk transparansi persaingan usaha yang adil.</li><li><strong>Opsi D:</strong> Pemborosan rapat hotel tanpa urgensi substansial merupakan salah satu temuan inefisiensi yang dipangkas.</li></ul></div>"
            },
            {
                "id": "s3_q35",
                "theoryKey": "risiko_kontinjensi",
                "theoryTitle": "Kewajiban Kontinjensi & Penjaminan Negara",
                "scenario": "🏭 Ketahanan Fiskal Menghadapi Resesi",
                "question": "Dalam mengantisipasi ketidakpastian siklus ekonomi global, apakah pilar fundamental yang menjaga Ketahanan Fiskal (Fiscal Resilience) Indonesia tetap berdaya tahan?",
                "options": [
                    "Penetapan target defisit anggaran di atas sepuluh persen PDB guna menjamin belanja proyek mercusuar tanpa kendali",
                    "Disiplin rambu defisit di bawah 3% PDB, rasio utang terkendali, bantalan kas likuid (SAL), serta diversifikasi basis pajak domestik",
                    "Penghapusan seluruh sistem subsidi energi dan penutupan jaringan perlindungan sosial bagi warga miskin",
                    "Ketergantungan pembiayaan APBN seutuhnya pada pinjaman komersial valuta asing bertenor jangka sangat pendek"
                ],
                "correct": 1,
                "hint": "Ketahanan fiskal dibangun atas: disiplin batas defisit, utang yang terkendali di bawah batas legal, dan bantalan cadangan kas SAL!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Ketahanan fiskal (<em>Fiscal Resilience</em>) bersandar pada pilar kehati-hatian: disiplin defisit &lt;3% PDB, rasio utang rendah (~39% PDB), kepemilikan cadangan kas penyangga (SAL), struktur utang dominan rupiah, serta perluasan basis kepatuhan pajak melalui modernisasi Core Tax.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Defisit ugal-ugalan di atas 10% PDB dalam kondisi damai akan memicu krisis utang berdaulat (*debt crisis*).</li><li><strong>Opsi C:</strong> Menghapus jaring pengaman sosial saat krisis justru memicu gejolak instabilitas sosial dan kontraksi konsumsi agregat.</li><li><strong>Opsi D:</strong> Ketergantungan pada utang valas jangka pendek adalah sumber utama kerentanan krisis nilai tukar masa lalu.</li></ul></div>"
            },
            {
                "id": "s3_q36",
                "theoryKey": "kedaulatan_fiskal",
                "theoryTitle": "Kedaulatan Fiskal & Kemandirian APBN",
                "scenario": "👑 Mahakarya Pengelola Keuangan Negara",
                "question": "Di akhir pembelajaran Level 3, apakah esensi filosofis tertinggi dari Anggaran Pendapatan dan Belanja Negara (APBN) dalam mewujudkan cita-cita konstitusi bangsa?",
                "options": [
                    "APBN adalah instrumen akuntansi murni untuk menimbun kas likuid sebanyak-banyaknya di rekening bank sentral tanpa pernah dibelanjakan",
                    "APBN adalah instrumen kedaulatan dan gotong royong nasional dalam meredistribusi kemakmuran, membuka lapangan kerja, dan membangun peradaban bangsa yang adil",
                    "APBN bertugas menjamin bahwa tarif pajak bagi kelompok konglomerasi teratas selalu dipatok lebih rendah dibanding kelompok menengah",
                    "APBN dirancang untuk menggantikan seluruh peran inisiatif usaha swasta dan koperasi dalam menggerakkan kegiatan ekonomi riil"
                ],
                "correct": 1,
                "hint": "APBN adalah wujud gotong royong seluruh rakyat: yang mampu berkontribusi lebih lewat pajak untuk membangun keadilan sosial dan kemakmuran bersama!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> APBN adalah wujud konkret komitmen kebangsaan dan gotong royong bernegara. Melalui fungsi alokasi, distribusi, dan stabilisasi, APBN mengumpulkan penerimaan secara adil untuk membiayai kemajuan SDM, infrastruktur, perlindungan kaum rentan, dan perwujudan keadilan sosial bagi seluruh rakyat Indonesia.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> APBN bukan brankas penimbunan pasif; dana negara harus dibelanjakan secara produktif untuk utilitas publik.</li><li><strong>Opsi C:</strong> Filosofi perpajakan berkeadilan menuntut sistem progresif di mana kelompok berpenghasilan tinggi memikul tarif lebih besar.</li><li><strong>Opsi D:</strong> Sektor swasta dan koperasi tetap menjadi motor utama pertumbuhan ekonomi; APBN berperan sebagai pemungkin (<em>enabler</em>).</li></ul></div>"
            },
            {
                "id": "s4_q1",
                "theoryKey": "kurs_valas",
                "theoryTitle": "Dinamika Permintaan Valas & Depresiasi Rupiah",
                "scenario": "🚢 Mengapa Rupiah Melemah saat Impor Lebih Besar?",
                "question": "Ketika nilai tagihan impor barang dan jasa melampaui penerimaan devisa ekspor, mengapa nilai tukar Rupiah cenderung tertekan melemah terhadap Dolar AS?",
                "options": [
                    "Pemerintah secara otomatis melarang perbankan melayani penukaran valuta asing untuk seluruh transaksi ritel",
                    "Permintaan konversi Rupiah ke valas meningkat drastis guna melunasi impor, melampaui pasokan pasokan valas di pasar",
                    "Bank sentral mitra dagang mencabut peredaran mata uang Dolar AS dari sistem perdagangan internasional secara sepihak",
                    "Perusahaan pelayaran internasional menolak menggunakan kapal kontainer untuk mengangkut barang dari pelabuhan nasional"
                ],
                "correct": 1,
                "hint": "Hukum pasar valas: melonjaknya kebutuhan dolar untuk membayar impor membuat dolar diburu sehingga nilainya menguat terhadap rupiah!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Sesuai mekanisme pasar valas, importir harus menukarkan rupiah ke valas (Dolar AS) untuk melunasi tagihan luar negeri. Jika nilai impor melebihi ekspor, permintaan valas melonjak melampaui pasokan devisa yang masuk, mendepresiasi nilai tukar rupiah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Transaksi valas tetap dilayani perbankan devisa sesuai mekanisme pasar dan underlying transaksi legal.</li><li><strong>Opsi C:</strong> Dolar AS tetap menjadi mata uang utama perdagangan global tanpa ada pencabutan sepihak oleh The Fed.</li><li><strong>Opsi D:</strong> Logistik perkapalan tetap berjalan komersial; masalah utama adalah keseimbangan permintaan dan pasokan valas.</li></ul></div>"
            },
            {
                "id": "s4_q2",
                "theoryKey": "neraca_pembayaran",
                "theoryTitle": "Defisit Transaksi Berjalan (Current Account Deficit)",
                "scenario": "📉 Neraca Transaksi Berjalan (CAD)",
                "question": "Defisit Neraca Transaksi Berjalan (Current Account Deficit / CAD) yang melampaui 3% PDB kerap dipandang sebagai sinyal kerentanan makro. Apa sajakah pos utama yang dicatat dalam neraca ini?",
                "options": [
                    "Arus investasi portofolio saham, pinjaman sindikasi bank komersial, dan emisi obligasi luar negeri",
                    "Arus perdagangan barang, neraca jasa, pendapatan primer (dividen/bunga), dan transfer pendapatan sekunder",
                    "Penyertaan modal langsung korporasi multinasional pada pabrik manufaktur dan akuisisi aset properti",
                    "Pencatatan mutasi cadangan emas moneter dan alokasi hak tarik khusus (Special Drawing Rights) bank sentral"
                ],
                "correct": 1,
                "hint": "Transaksi berjalan mencatat arus riil barang, jasa, repatriasi dividen/bunga, dan transfer uang kiriman buruh migran!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Neraca Transaksi Berjalan (Current Account)</em> mencakup empat komponen riil: Neraca Perdagangan Barang, Neraca Jasa (transportasi/pariwisata), Pendapatan Primer (hasil investasi/dividen/bunga utang), dan Pendapatan Sekunder (remitansi transfer berjalan).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Investasi portofolio dan obligasi dicatat di dalam Neraca Finansial (<em>Financial Account</em>).</li><li><strong>Opsi C:</strong> Penanaman Modal Langsung (FDI) dicatat di dalam Neraca Finansial, bukan Transaksi Berjalan.</li><li><strong>Opsi D:</strong> Emas moneter dan SDR dicatat dalam pos Perubahan Cadangan Devisa (<em>Reserve Assets</em>).</li></ul></div>"
            },
            {
                "id": "s4_q3",
                "theoryKey": "neraca_pembayaran",
                "theoryTitle": "Surplus Neraca Finansial Penutup Defisit Berjalan",
                "scenario": "💵 Neraca Transaksi Finansial (Capital Account)",
                "question": "Ketika Indonesia mencatat defisit transaksi berjalan (CAD), bagaimanakah perekonomian menyeimbangkan Neraca Pembayaran secara agregat agar cadangan devisa tidak tergerus?",
                "options": [
                    "Menghentikan secara sepihak seluruh pembayaran bunga utang luar negeri kepada kreditur internasional",
                    "Menarik surplus aliran modal dari Neraca Finansial (seperti FDI, investasi portofolio, dan pinjaman modal luar negeri)",
                    "Mewajibkan warga negara menjual seluruh kepemilikan aset valas kepada kementerian perdagangan",
                    "Mendevaluasi nilai nominal mata uang rupiah hingga menyentuh angka absolut nol rupiah per dolar"
                ],
                "correct": 1,
                "hint": "Defisit transaksi berjalan (belanja barang/jasa luar negeri) harus ditutup oleh surplus modal finansial yang masuk dari investor asing!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam identitas Neraca Pembayaran (<em>BOP = Current Account + Financial Account + Reserve Changes = 0</em>), defisit transaksi berjalan membutuhkan surplus neraca finansial (masuknya modal FDI dan portofolio) agar cadangan devisa tetap stabil dan tidak terpakai untuk intervensi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Penghentian sepihak pembayaran utang berdaulat memicu sanksi gagal bayar (<em>default</em>) dan pengucilan pasar global.</li><li><strong>Opsi C:</strong> Rezim devisa bebas di Indonesia menjamin hak kepemilikan aset valas legal oleh warga negara.</li><li><strong>Opsi D:</strong> Devaluasi ke angka nol adalah absurditas yang melenyapkan sistem moneter nasional.</li></ul></div>"
            },
            {
                "id": "s4_q4",
                "theoryKey": "cadangan_devisa",
                "theoryTitle": "Cadangan Devisa sebagai Bantalan Stabilitas Eksternal",
                "scenario": "🛡️ Standar Cadangan Devisa Internasional",
                "question": "Bank Indonesia mengumumkan posisi cadangan devisa nasional setara dengan pembiayaan sekitar 6,5 bulan impor. Mengapa posisi ini dinilai sangat berdaya tahan menurut tolok ukur kecukupan internasional?",
                "options": [
                    "Karena melampaui standar kecukupan internasional minimal 3 bulan impor dan mampu mengantisipasi guncangan eksternal",
                    "Karena cadangan devisa diwajibkan oleh IMF untuk selalu berjumlah tepat sama dengan Produk Domestik Bruto tahunan",
                    "Karena seluruh cadangan devisa disimpan dalam bentuk mata uang kartal rupiah di brankas kantor perwakilan daerah",
                    "Karena cadangan tersebut secara hukum dibebaskan dari segala bentuk transaksi intervensi stabilitas nilai tukar"
                ],
                "correct": 0,
                "hint": "Standar kecukupan internasional umum mematok batas minimal 3 bulan impor; posisi di atas 6 bulan memberikan bantalan penyangga tebal!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Standar internasional kecukupan cadangan devisa (<em>Assessing Reserve Adequacy / ARA IMF</em>) mensyaratkan minimum 3 bulan pembiayaan impor dan pembayaran utang luar negeri jangka pendek. Cadangan di kisaran 6,5 bulan impor memberikan ketahanan yang sangat kuat terhadap gejolak arus modal keluar.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Cadangan devisa tidak harus sama dengan 100% PDB; rasio cadangan terhadap PDB biasanya berkisar 10%-20%.</li><li><strong>Opsi C:</strong> Cadangan devisa disimpan dalam bentuk aset valuta asing likuid (US Treasury, emas moneter, SDR), bukan uang kartal rupiah.</li><li><strong>Opsi D:</strong> Cadangan devisa justru berfungsi aktif sebagai bantalan likuiditas untuk intervensi stabilitas nilai tukar saat volatilitas ekstrem.</li></ul></div>"
            }
        ]
    },
    {
        "id": 8,
        "title": "Level 08: Perdagangan Internasional & BOP",
        "subtitle": "Neraca Pembayaran, Defisit Transaksi Berjalan (CAD), dan Hilirisasi Ekspor",
        "theme": "trade",
        "unlocks": "Gelar: Diplomat Perdagangan Global",
        "questionPool": [
            {
                "id": "s4_q5",
                "theoryKey": "trilema_mundell_fleming",
                "theoryTitle": "Trilema Mundell-Fleming (The Impossible Trinity)",
                "scenario": "🔺 Trilema Moneter Mundell-Fleming",
                "question": "Berdasarkan teori Trilema Mundell-Fleming (The Impossible Trinity), kombinasi manakah dari tiga tujuan kebijakan moneter terbuka yang mustahil dicapai secara simultan?",
                "options": [
                    "Pajak progresif tinggi, rasio gini rendah, dan anggaran pendidikan minimal dua puluh persen PDB",
                    "Nilai tukar tetap (fixed exchange rate), arus modal bebas (free capital mobility), dan kebijakan moneter independen",
                    "Stabilitas harga komoditas pangan, swasembada pupuk kimia, dan modernisasi mesin mekanisasi pertanian",
                    "Pertumbuhan ekonomi tinggi, emisi nol bersih (net-zero), dan penutupan seluruh pembangkit tenaga surya"
                ],
                "correct": 1,
                "hint": "Kamu hanya bisa memilih dua dari tiga: kurs tetap, kebebasan arus uang lintas negara, atau kemandirian suku bunga acuan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>The Impossible Trinity</em> membuktikan bahwa sebuah perekonomian terbuka hanya dapat memilih dua dari tiga pilar: (1) Kurs Tetap, (2) Mobilitas Modal Bebas, dan (3) Independensi Kebijakan Moneter. Indonesia memilih membiarkan kurs mengambang agar memiliki moneter independen di tengah arus modal bebas.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kebijakan perpajakan dan rasio Gini adalah domain kebijakan fiskal redistributif, bukan trilema moneter.</li><li><strong>Opsi C:</strong> Ketahanan pangan berkaitan dengan kapasitas produksi riil pertanian, bukan trilema makro ekonomi terbuka.</li><li><strong>Opsi D:</strong> Target transisi energi berkaitan dengan kebijakan dekarbonisasi industri, bukan instrumen moneter valas.</li></ul></div>"
            },
            {
                "id": "s4_q6",
                "theoryKey": "marshall_lerner",
                "theoryTitle": "Kondisi Marshall-Lerner & Depresiasi Mata Uang",
                "scenario": "🌊 Kurs Mengambang Bebas vs Kurs Tetap",
                "question": "Mengapa pada krisis moneter 1997–1998 sistem kurs mengambang terkendali (managed floating dengan rentang intervensi ketat) akhirnya dilepas menjadi kurs mengambang bebas (free floating)?",
                "options": [
                    "Karena cadangan devisa bank sentral terkuras masif saat mempertahankan batas kurs akibat serangan spekulasi dan pelarian modal",
                    "Karena seluruh mata uang mitra dagang internasional secara serentak beralih menggunakan standar pembayaran emas fisik",
                    "Karena pemerintah bermaksud mendorong warga negara memindahkan tabungannya ke perbankan luar negeri",
                    "Karena undang-undang melarang bank sentral melakukan pencatatan nilai tukar rupiah terhadap valas mitra dagang"
                ],
                "correct": 0,
                "hint": "Mempertahankan batas kurs saat arus modal kabur masif menguras habis cadangan devisa untuk intervensi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pada krisis 1997/1998, upaya Bank Indonesia mempertahankan rentang pita intervensi menguras cadangan devisa secara drastis dalam menghadapi arus modal keluar yang dahsyat. Pada 14 Agustus 1997, BI terpaksa melepas rentang intervensi ke sistem <em>free floating</em> agar cadangan devisa tidak habis.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Sistem moneter internasional pasca-Bretton Woods (1971) adalah uang fiat (fiat money), bukan standar emas.</li><li><strong>Opsi C:</strong> Pemerintah berusaha menahan modal tetap di dalam negeri, bukan mendorong kepindahan dana ke luar.</li><li><strong>Opsi D:</strong> BI memiliki kewenangan legal penuh mencatat dan mempublikasikan kurs acuan resmi rupiah (JISDOR).</li></ul></div>"
            },
            {
                "id": "s4_q7",
                "theoryKey": "marshall_lerner",
                "theoryTitle": "Fenomena Kurva J (J-Curve Effect) Neraca Perdagangan",
                "scenario": "🦅 Kenaikan Suku Bunga The Fed AS",
                "question": "Ketika The Fed menaikkan Fed Funds Rate secara agresif, mengapa mata uang negara berkembang (emerging market currencies) termasuk Rupiah serempak mengalami tekanan depresiasi?",
                "options": [
                    "Karena lembaga pemeringkat internasional secara otomatis menurunkan rating seluruh obligasi pemerintah negara berkembang",
                    "Karena terjadi relokasi modal global (capital reversal) menuju aset berdenominasi Dolar AS yang menawarkan imbal hasil lebih menarik dan aman",
                    "Karena seluruh perdagangan ekspor komoditas negara berkembang dihentikan sepihak oleh organisasi perdagangan dunia",
                    "Karena bank sentral negara berkembang dipaksa menyerahkan seluruh aset emasnya kepada perbankan sentral AS"
                ],
                "correct": 1,
                "hint": "Kenaikan bunga di AS memicu aliran uang global pulang kampung (flight to safety) ke aset Dolar AS!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kenaikan suku bunga The Fed mempersempit diferensial imbal hasil antara aset negara berkembang dan aset AS (<em>US Treasuries</em>). Investor global memindahkan modalnya kembali ke Dolar AS (<em>flight to safety/quality</em>), memicu arus modal keluar dan menekan mata uang <em>emerging markets</em>.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Peringkat kredit dinilai berdasarkan kapasitas fundamental fiskal masing-masing negara, bukan turun otomatis.</li><li><strong>Opsi C:</strong> Organisasi perdagangan dunia (WTO) memfasilitasi kelancaran arus dagang, tidak menghentikan ekspor komoditas.</li><li><strong>Opsi D:</strong> Aset cadangan emas moneter tetap berada di bawah kedaulatan kepemilikan masing-masing bank sentral nasional.</li></ul></div>"
            },
            {
                "id": "s4_q8",
                "theoryKey": "dndf",
                "theoryTitle": "Pasar Valas DNDF (Domestic Non-Deliverable Forward)",
                "scenario": "🏃 Pelarian Modal Asing (Capital Flight)",
                "question": "Ketika terjadi fenomena henti mendadak aliran modal masuk (Sudden Stop) dan arus modal keluar masif dari pasar obligasi dan saham domestik, bagaimanakah dampaknya pada stabilitas keuangan domestik?",
                "options": [
                    "Yield obligasi pemerintah turun ke titik terendah sementara indeks bursa saham mencetak rekor kenaikan tertinggi",
                    "Yield obligasi melonjak naik, harga saham terkoreksi tajam, dan likuiditas valas mengetat sehingga menekan nilai tukar Rupiah",
                    "Cadangan devisa negara bertambah secara drastis tanpa memerlukan intervensi stabilisasi oleh bank sentral",
                    "Seluruh bank umum nasional secara otomatis membebaskan bunga pinjaman kredit usaha rakyat bagi debitur mikro"
                ],
                "correct": 1,
                "hint": "Aksi jual investor asing: harga obligasi anjlok (yield naik), rupiah ditukar ke dolar lalu ditarik keluar negeri!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam peristiwa <em>Sudden Stop / Capital Flight</em>, penjualan massal portofolio oleh non-residen menyebabkan penurunan harga obligasi (yield melonjak), penurunan indeks bursa saham, serta lonjakan permintaan valas untuk repatriasi modal yang menekan likuiditas valas dan mendepresiasi Rupiah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Aksi jual asing justru menaikkan yield obligasi (karena harga obligasi jatuh) dan menekan indeks saham.</li><li><strong>Opsi C:</strong> Cadangan devisa justru berkurang jika bank sentral melakukan intervensi valas untuk meredam volatilitas kurs.</li><li><strong>Opsi D:</strong> Kondisi pengetatan likuiditas di pasar keuangan justru cenderung menaikkan biaya dana perbankan komersial.</li></ul></div>"
            },
            {
                "id": "s4_q9",
                "theoryKey": "lcs",
                "theoryTitle": "LCS (Local Currency Settlement) / LCT",
                "scenario": "💎 Devisa Hasil Ekspor (DHE) di Dalam Negeri",
                "question": "Pemerintah mewajibkan eksportir komoditas sumber daya alam (SDA) menempatkan minimal 30% Devisa Hasil Ekspor (DHE) di sistem perbankan domestik selama minimal 3 bulan. Apakah urgensi makroekonomi regulasi ini?",
                "options": [
                    "Menyita secara permanen hasil laba komersial perusahaan swasta untuk disetorkan langsung ke pos penerimaan APBN",
                    "Memastikan aliran likuiditas valas hasil eksploitasi kekayaan alam masuk dan tinggal di dalam negeri guna menopang pasokan valas domestik",
                    "Mewajibkan eksportir menukarkan seluruh hasil penjualannya menjadi mata uang kripto luar negeri tanpa izin",
                    "Menghilangkan kewajiban eksportir dalam membayar pajak royalti pertambangan kepada pemerintah daerah"
                ],
                "correct": 1,
                "hint": "Komoditas berasal dari bumi Indonesia; devisa hasilnya harus diparkir di dalam negeri agar pasokan dolar domestik melimpah dan kurs stabil!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Regulasi DHE SDA (PP No. 36/2023) bertujuan memperkuat pasokan valas domestik dengan menahan devisa ekspor komoditas di dalam sistem perbankan nasional. Keberadaan devisa ini meningkatkan ketersediaan likuiditas valas, memperkokoh cadangan devisa, dan menstabilkan nilai tukar Rupiah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Devisa tetap milik eksportir dan mendapatkan insentif tarif pajak penghasilan atas bunga deposito valas.</li><li><strong>Opsi C:</strong> Transaksi penempatan DHE wajib dilakukan pada instrumen perbankan resmi berizin, bukan aset kripto.</li><li><strong>Opsi D:</strong> Kewajiban pajak penghasilan, bea keluar, dan royalti SDA tetap berlaku penuh sesuai ketentuan hukum.</li></ul></div>"
            },
            {
                "id": "s4_q10",
                "theoryKey": "hedging",
                "theoryTitle": "Lindung Nilai (Hedging) Utang Valas Korporasi",
                "scenario": "📦 Imported Inflation (Inflasi Impor)",
                "question": "Indonesia mengimpor gandum dan kedelai dalam jumlah besar. Ketika nilai tukar Rupiah terdepresiasi tajam terhadap Dolar AS, mekanisme 'Imported Inflation' apakah yang merambat ke harga pangan konsumen?",
                "options": [
                    "Biaya pembelian bahan baku impor dalam rupiah membengkak, sehingga produsen menaikkan harga jual produk olahan ke konsumen",
                    "Pabrik pengolahan pangan domestik secara sukarela menurunkan margin keuntungan demi membagikan subsidi tunai kepada pembeli",
                    "Pemerintah menetapkan larangan mutlak bagi pedagang tradisional dalam menjual makanan berbasis tepung terigu",
                    "Bank sentral mencairkan cadangan emas batangan untuk dibagikan langsung kepada produsen tahu dan tempe"
                ],
                "correct": 0,
                "hint": "Kurs rupiah yang melemah membuat ongkos beli bahan baku impor dalam satuan rupiah jadi lebih mahal!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Imported Inflation</em> terjadi ketika depresiasi kurs menaikkan biaya impor barang input dalam denominasi rupiah (<em>exchange rate pass-through</em>). Biaya produksi mi instan, roti, dan tahu-tempe melonjak, memaksa produsen menaikkan harga jual eceran di tingkat pasar konsumen.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Produsen biasanya meneruskan kenaikan biaya input ke harga konsumen (pass-through) untuk menjaga kelangsungan usaha.</li><li><strong>Opsi C:</strong> Perdagangan komoditas olahan pangan tetap berjalan bebas sesuai kebutuhan konsumsi masyarakat.</li><li><strong>Opsi D:</strong> Cadangan devisa emas dikelola untuk stabilitas moneter, bukan dibagikan langsung ke pelaku industri makanan.</li></ul></div>"
            },
            {
                "id": "s4_q11",
                "theoryKey": "dutch_disease",
                "theoryTitle": "Penyakit Belanda (Dutch Disease) Boom Komoditas",
                "scenario": "🤝 Dedolarisasi & Local Currency Settlement (LCS)",
                "question": "Bank Indonesia aktif memperluas kesepakatan Local Currency Transactions (LCT / LCS) dengan negara mitra seperti China, Jepang, Malaysia, dan Korea Selatan. Apa keunggulan strategis mekanisme penyelesaian ini?",
                "options": [
                    "Meniadakan seluruh bentuk pencatatan bea cukai atas barang impor yang masuk ke pelabuhan domestik",
                    "Mengurangi ketergantungan terhadap Dolar AS, memangkas biaya konversi ganda, dan memitigasi risiko volatilitas kurs global",
                    "Mewajibkan pelaku usaha menggunakan sistem barter barang tambang mentah tanpa melibatkan satuan hitung uang",
                    "Mengharuskan importir membayar seluruh tagihan perdagangan murni menggunakan obligasi pemerintah berjangka panjang"
                ],
                "correct": 1,
                "hint": "Perdagangan langsung menggunakan Rupiah dan mata uang mitra dagang tanpa perlu menukarnya ke Dolar AS terlebih dahulu!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kerja sama <em>Local Currency Transactions (LCT)</em> memungkinkan perdagangan bilateral diselesaikan langsung dengan mata uang lokal (misal IDR-CNY atau IDR-JPY). Hal ini mengurangi ketergantungan pada Dolar AS, menekan biaya transaksi valas (<em>direct quotation</em>), dan mengurangi transmisi gejolak moneter AS.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pengawasan pabean dan pemungutan tarif bea masuk tetap berlaku penuh sesuai regulasi kepabeanan.</li><li><strong>Opsi C:</strong> Transaksi diselesaikan melalui sistem transfer perbankan resmi berlisensi Appointed Cross Currency Dealer (ACCD).</li><li><strong>Opsi D:</strong> Pembayaran dilakukan dengan saldo rekening mata uang lokal yang likuid, bukan obligasi jangka panjang.</li></ul></div>"
            },
            {
                "id": "s4_q12",
                "theoryKey": "imported_inflation",
                "theoryTitle": "Inflasi Terimpor (Imported Inflation)",
                "scenario": "🛡️ Hedging / Lindung Nilai Valas Korporasi",
                "question": "Mengapa otoritas keuangan mewajibkan korporasi yang memiliki liabilitas Utang Luar Negeri (ULN) dalam valas untuk memenuhi rasio Lindung Nilai (Hedging)?",
                "options": [
                    "Memastikan bahwa perusahaan menyalurkan seluruh laba bersih tahunan ke pos bantuan kemanusiaan luar negeri",
                    "Melindungi neraca keuangan korporasi dari lonjakan beban pembayaran utang valas saat kurs rupiah terdepresiasi tajam",
                    "Mengharuskan korporasi mengalihkan kepemilikan seluruh saham pengendali kepada kementerian badan usaha milik negara",
                    "Mewajibkan debitur melunasi seluruh sisa pokok pinjaman dalam tempo 24 jam setelah kontrak ditandatangani"
                ],
                "correct": 1,
                "hint": "Lindung nilai (hedging) mengunci kurs masa depan sehingga korporasi tidak bangkrut bila kurs dolar tiba-tiba melonjak tinggi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Peraturan Bank Indonesia tentang Prinsip Kehati-hatian ULN Korporasi Non-Bank mewajibkan rasio lindung nilai (<em>hedging ratio</em>) minimal. Hal ini mengunci nilai kurs kewajiban masa depan melalui instrumen derivatif (forward/swap), mencegah kebangkrutan massal korporasi saat rupiah melemah tajam.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kebijakan kehati-hatian berfokus pada mitigasi risiko solvabilitas perusahaan, bukan penyerahan laba sosial.</li><li><strong>Opsi C:</strong> Kewajiban hedging berlaku bagi korporasi swasta dan BUMN tanpa mengambil alih kepemilikan saham ekuitas.</li><li><strong>Opsi D:</strong> Pelunasan utang mengikuti jadwal tenor perjanjian kredit komersial yang telah disepakati sebelumnya.</li></ul></div>"
            },
            {
                "id": "s4_q13",
                "theoryKey": "hilirisasi_komoditas",
                "theoryTitle": "Hilirisasi Komoditas & Peningkatan Nilai Tambah Ekspor",
                "scenario": "⚠️ Currency Mismatch (Ketidakcocokan Mata Uang)",
                "question": "Sebuah korporasi properti domestik memperoleh pendapatan sewa 100% dalam mata uang Rupiah, namun meminjam utang US$ 100 juta tanpa kontrak lindung nilai. Mengapa struktur keuangan ini menghadapi bahaya 'Currency Mismatch'?",
                "options": [
                    "Perusahaan diwajibkan oleh undang-undang kepailitan untuk menolak pembayaran uang sewa dari penyewa lokal",
                    "Pelemahan kurs rupiah akan melipatgandakan beban cicilan pokok dan bunga dalam rupiah melampaui kapasitas arus kas pendapatan",
                    "Kementerian keuangan secara otomatis menyita seluruh aset bangunan apartemen yang telah dibangun pengembang",
                    "Bank sentral penerbit valuta asing akan mengambil alih kepemilikan operasional gedung properti secara sepihak"
                ],
                "correct": 1,
                "hint": "Pendapatan dalam Rupiah tetapi cicilan utang dalam Dolar AS: begitu Dolar naik, uang kas Rupiah tidak cukup lagi membeli Dolar untuk cicilan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Currency Mismatch</em> terjadi ketika pendapatan perusahaan berdenominasi mata uang lokal (Rupiah) sedangkan kewajiban utangnya berdenominasi valas (Dolar AS). Saat rupiah melemah, pendapatan sewa tetap namun beban cicilan utang membengkak dalam rupiah, memicu risiko kebangkrutan keuangan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Perusahaan tetap berhak dan berkepentingan menerima pembayaran sewa rupiah dari pelanggan.</li><li><strong>Opsi C:</strong> Penyitaan aset perdata hanya dapat terjadi melalui putusan kepailitan peradilan resmi, bukan otomatis kementerian.</li><li><strong>Opsi D:</strong> Bank sentral luar negeri tidak memiliki wewenang yuridis menyita aset fisik di dalam wilayah kedaulatan Indonesia.</li></ul></div>"
            },
            {
                "id": "s4_q14",
                "theoryKey": "dhe_sda",
                "theoryTitle": "Devisa Hasil Ekspor Sumber Daya Alam (DHE SDA)",
                "scenario": "📈 Fenomena Kurva J (J-Curve Effect)",
                "question": "Menurut teori perdagangan internasional, depresiasi mata uang pada akhirnya memperbaiki neraca perdagangan. Mengapa pada periode awal pasca-depresiasi, neraca perdagangan justru cenderung memburuk (Fenomena Kurva J)?",
                "options": [
                    "Karena pemerintah melarang produsen domestik memproduksi barang pengganti impor selama masa krisis",
                    "Karena kontrak dagang dan volume fisik bersifat kaku jangka pendek sehingga biaya tagihan impor melonjak sebelum volume ekspor sempat merespon",
                    "Karena seluruh pelabuhan peti kemas luar negeri memberlakukan tarif karantina tambahan bagi kapal dari negara berkembang",
                    "Karena bank sentral menurunkan suku bunga acuan ke batas negatif sehingga seluruh kegiatan perdagangan terhenti"
                ],
                "correct": 1,
                "hint": "Efek Kurva J: harga impor naik seketika karena kurs, sementara penyesuaian volume fisik pesanan ekspor butuh waktu berbulan-bulan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>J-Curve Effect</em> terjadi karena kekakuan kontrak perdagangan jangka pendek. Begitu kurs terdepresiasi, nilai tagihan impor seketika melonjak karena harga valas lebih mahal. Sementara itu, volume ekspor membutuhkan waktu berbulan-bulan untuk menyesuaikan kapasitas, sehingga neraca perdagangan memburuk dulu sebelum membaik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Depresiasi justru memberi insentif ekonomi bagi berkembangnya industri substitusi impor domestik.</li><li><strong>Opsi C:</strong> Regulasi karantina pelabuhan bersifat standar higienitas pangan dan tidak berubah mendadak karena kurs.</li><li><strong>Opsi D:</strong> Bank sentral merespons gejolak kurs dengan kebijakan stabilitas moneter terukur, bukan suku bunga negatif ekstrem.</li></ul></div>"
            },
            {
                "id": "s4_q15",
                "theoryKey": "terms_of_trade",
                "theoryTitle": "Ketentuan Perdagangan (Terms of Trade / ToT)",
                "scenario": "🚢 Neraca Perdagangan: Surplus vs Defisit",
                "question": "Ketika neraca perdagangan barang Indonesia mencatat rentetan surplus berturut-turut selama puluhan bulan, apakah implikasi makroekonomi positif terhadap sektor eksternal?",
                "options": [
                    "Meniadakan seluruh kebutuhan perekonomian nasional dalam memproduksi komoditas pangan pokok secara mandiri",
                    "Memperkuat posisi cadangan devisa, mempersempit defisit transaksi berjalan, dan menyediakan bantalan penyangga bagi kurs Rupiah",
                    "Mengharuskan pemerintah menghapuskan seluruh sistem pemungutan bea cukai ekspor komoditas mineral",
                    "Mewajibkan kementerian keuangan menutup seluruh utang luar negeri komersial secara tunai dalam tempo sebulan"
                ],
                "correct": 1,
                "hint": "Surplus perdagangan barang menghasilkan pasokan devisa bersih yang menopang cadangan devisa dan stabilitas kurs rupiah!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Surplus perdagangan barang menghasilkan aliran masuk devisa bersih (<em>net export proceeds</em>). Devisa ini memperkuat posisi cadangan devisa nasional, menyehatkan neraca transaksi berjalan (CAD mendekati nol atau surplus), serta memperkokoh ketahanan stabilitas kurs rupiah dari tekanan eksternal.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kemandirian pangan tetap merupakan pilar kedaulatan esensial yang tidak boleh ditinggalkan.</li><li><strong>Opsi C:</strong> Bea keluar ekspor komoditas mentah tetap menjadi instrumen strategis untuk mendorong hilirisasi dalam negeri.</li><li><strong>Opsi D:</strong> Pelunasan utang luar negeri mengikuti jadwal jatuh tempo kontraktual yang terencana dan prudent.</li></ul></div>"
            },
            {
                "id": "s4_q16",
                "theoryKey": "interest_rate_parity",
                "theoryTitle": "Paritas Suku Bunga (Interest Rate Parity / IRP)",
                "scenario": "👷 Remitansi Pekerja Migran Indonesia (PMI)",
                "question": "Pekerja Migran Indonesia (PMI) mentransfer devisa hasil jerih payahnya dari luar negeri ke keluarga di tanah air. Dalam Neraca Pembayaran Indonesia, aliran dana masuk ini dicatatkan dalam pos:",
                "options": [
                    "Investasi Portofolio pada sub-pos pembelian surat utang korporasi luar negeri",
                    "Pendapatan Sekunder (Secondary Income) pada Neraca Transaksi Berjalan",
                    "Neraca Modal pada sub-pos transfer modal migrasi permanen pemerintah",
                    "Penanaman Modal Asing Langsung (FDI) pada sub-pos kepemilikan saham pabrik"
                ],
                "correct": 1,
                "hint": "Remitansi adalah transfer sepihak tanpa timbal balik barang/jasa langsung: dicatat di Pendapatan Sekunder Transaksi Berjalan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Remitansi tenaga kerja migran adalah transfer berjalan tanpa imbal balik langsung (<em>unilateral transfers</em>). Dalam manual Neraca Pembayaran IMF (BPM6), transaksi ini dicatat di pos <em>Pendapatan Sekunder (Secondary Income)</em> dalam Neraca Transaksi Berjalan, menyumbang surplus devisa rill bagi daerah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Investasi portofolio mencatat pembelian instrumen pasar modal finansial (saham/obligasi).</li><li><strong>Opsi C:</strong> Neraca modal mencatat transfer aset modal non-finansial non-riil, bukan kiriman uang gaji rutin.</li><li><strong>Opsi D:</strong> FDI mencatat kepemilikan modal fisik usaha dengan hak kendali manajerial minimal 10%.</li></ul></div>"
            },
            {
                "id": "s4_q17",
                "theoryKey": "fdi_investasi",
                "theoryTitle": "Penanaman Modal Asing Langsung (FDI)",
                "scenario": "🏭 Ekspor Bernilai Tambah Tinggi vs Mentah",
                "question": "Mengapa transformasi dari ekspor bijih mineral mentah menuju produk olahan hilir (seperti feronikel dan bahan baku baterai) secara fundamental memperkuat struktur neraca eksternal Indonesia?",
                "options": [
                    "Menaikkan nilai ekspor per tonase secara berlipat ganda, memperluas basis industri domestik, dan menurunkan kerentanan volatilitas harga komoditas mentah",
                    "Membebaskan seluruh pengusaha tambang dari kewajiban pembayaran pajak royalti dan pajak penghasilan badan",
                    "Mewajibkan negara pembeli menukarkan seluruh cadangan devisanya menjadi obligasi ritel kementerian keuangan",
                    "Menghilangkan kebutuhan penggunaan armada kapal kargo dalam mendistribusikan hasil produksi ke pasar luar negeri"
                ],
                "correct": 0,
                "hint": "Hilirisasi meningkatkan nilai tambah berkali lipat per ton barang ekspor dan menciptakan ekosistem industri bernilai tinggi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Hilirisasi komoditas meningkatkan <em>Terms of Trade</em> dan nilai tambah ekspor secara eksponensial. Menjual feronikel atau sel baterai menghasilkan devisa berkali-kali lipat dibanding mengekspor tanah bijih mentah, sekaligus menciptakan lapangan kerja manufaktur dan memperkuat ketahanan neraca perdagangan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Industri hilirisasi tetap merupakan objek pemungutan pajak negara dan royalti SDA sesuai ketentuan perundang-undangan.</li><li><strong>Opsi C:</strong> Pembayaran komersial internasional dilakukan dengan mekanisme kliring valas standar, bukan barter obligasi ritel.</li><li><strong>Opsi D:</strong> Pengiriman produk hasil hilirisasi tetap membutuhkan jasa logistik dan transportasi perkapalan internasional.</li></ul></div>"
            },
            {
                "id": "s4_q18",
                "theoryKey": "repatriasi_keuntungan",
                "theoryTitle": "Defisit Pendapatan Primer & Repatriasi Laba Asing",
                "scenario": "📉 Defisit Neraca Jasa (Service Balance Deficit)",
                "question": "Meskipun neraca perdagangan barang kerap mencatat surplus besar, Neraca Jasa (Services Account) Indonesia sering mengalami defisit persisten. Faktor struktural apakah yang menjadi penyebab utama defisit neraca jasa tersebut?",
                "options": [
                    "Ketergantungan tinggi pada penggunaan armada kapal kargo asing dan asuransi pelayaran internasional (freight & insurance)",
                    "Tingginya jumlah wisatawan asing yang berlibur dan membelanjakan valas di destinasi wisata nasional",
                    "Keberhasilan maskapai penerbangan nasional dalam memonopoli seluruh rute penerbangan komersial antar-benua",
                    "Penghapusan seluruh tarif retribusi pelayanan pelabuhan bagi kapal dagang yang berbendera Indonesia"
                ],
                "correct": 0,
                "hint": "Hampir seluruh barang ekspor kita diangkut oleh kapal kontainer berbendera asing dan diasuransikan di luar negeri!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Defisit neraca jasa Indonesia didominasi oleh pos <em>Freight &amp; Insurance</em> jasa transportasi laut. Sebagian besar komoditas ekspor-impor Indonesia diangkut oleh armada kapal asing dan asuransi perkapalan luar negeri, sehingga Indonesia harus membayar devisa jasa angkutan maritim dalam jumlah masif.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Pengeluaran turis asing di destinasi domestik justru dicatat sebagai penerimaan (surplus) ekspor jasa perjalanan (travel).</li><li><strong>Opsi C:</strong> Pangsa pasar maskapai domestik pada penerbangan internasional masih terbatas dibanding operator global.</li><li><strong>Opsi D:</strong> Retribusi pelabuhan adalah penerimaan operasional lokal, bukan penyebab struktural defisit neraca jasa luar negeri.</li></ul></div>"
            },
            {
                "id": "s4_q19",
                "theoryKey": "currency_swap",
                "theoryTitle": "Bilateral Currency Swap Arrangement (BCSA)",
                "scenario": "📊 Real Effective Exchange Rate (REER)",
                "question": "Apakah yang diukur oleh indeks Real Effective Exchange Rate (REER) yang dipantau oleh otoritas moneter dan lembaga keuangan global?",
                "options": [
                    "Tingkat suku bunga simpanan deposito perbankan syariah di kota-kota pelabuhan perdagangan bebas",
                    "Tingkat daya saing harga relatif barang domestik terhadap sekeranjang mitra dagang utama setelah disesuaikan dengan diferensial inflasi",
                    "Persentase kepemilikan modal asing pada perusahaan tambang mineral yang beroperasi di wilayah lepas pantai",
                    "Total nilai nominal uang kartal kertas rupiah yang disimpan di brankas kantor perwakilan luar negeri"
                ],
                "correct": 1,
                "hint": "REER mengukur daya saing harga ekspor terhadap sekeranjang mata uang mitra dagang setelah memperhitungkan inflasi riil!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Real Effective Exchange Rate (REER)</em> mengukur daya saing harga produk domestik terhadap sekeranjang mata uang mitra dagang utama dengan mempertimbangkan bobot volume perdagangan dan perbedaan tingkat inflasi. Angka REER di atas 100 menunjukkan apresiasi riil (daya saing harga menurun).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> REER adalah indikator kurs riil multilateral makro, bukan suku bunga perbankan daerah.</li><li><strong>Opsi C:</strong> Kepemilikan saham asing pada industri tambang dicatat di pos investasi langsung PMA.</li><li><strong>Opsi D:</strong> Fisik uang kartal rupiah di luar negeri tidak mencerminkan daya saing harga komoditas riil.</li></ul></div>"
            },
            {
                "id": "s4_q20",
                "theoryKey": "remitansi_tki",
                "theoryTitle": "Remitansi Pekerja Migran & Pendapatan Sekunder",
                "scenario": "🔥 Hot Money vs Foreign Direct Investment (FDI)",
                "question": "Mengapa Penanaman Modal Asing Langsung (FDI) dipandang jauh lebih kokoh dalam menopang ketahanan eksternal dibanding aliran modal portofolio jangka pendek (Hot Money)?",
                "options": [
                    "Karena modal portofolio diwajibkan oleh bursa efek untuk dikunci selama minimal lima puluh tahun tanpa boleh ditarik",
                    "Karena FDI tertanam dalam bentuk aset fisik pabrik, teknologi, dan tenaga kerja yang tidak dapat ditarik mendadak saat sentimen memburuk",
                    "Karena investor FDI dibebaskan dari segala bentuk kepatuhan hukum ketenagakerjaan dan standar keselamatan kerja",
                    "Karena aliran hot money hanya diizinkan untuk digunakan dalam pembelian produk kerajinan tangan tradisional daerah"
                ],
                "correct": 1,
                "hint": "FDI berwujud pabrik fisik yang tidak gampang kabur saat ada kabar buruk; modal portofolio (hot money) bisa kabur dalam hitungan detik!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>FDI (Foreign Direct Investment)</em> berjangka panjang dan bersifat illikuid karena tertanam dalam aset fisik (pabrik, mesin, infrastruktur) serta menciptakan lapangan kerja. Sebaliknya, modal portofolio (<em>hot money</em>) sangat likuid dan mudah keluar seketika (<em>sudden reversal</em>) saat sentimen global memburuk.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Modal portofolio di pasar saham/obligasi dapat diperjualbelikan setiap detik di jam perdagangan bursa.</li><li><strong>Opsi C:</strong> Perusahaan penanaman modal asing tetap wajib tunduk pada UU Ketenagakerjaan dan AMDAL nasional.</li><li><strong>Opsi D:</strong> Hot money masuk ke instrumen pasar uang, SBN, dan saham emiten bursa, bukan belanja suvenir ritel.</li></ul></div>"
            }
        ]
    },
    {
        "id": 9,
        "title": "Level 09: Dinamika Kurs & Valuta Asing",
        "subtitle": "Trilema Mundell-Fleming, Cadangan Devisa, DHE SDA, Dedolarisasi, dan REER",
        "theme": "forex",
        "unlocks": "Gelar: Ahli Devisa & Valas",
        "questionPool": [
            {
                "id": "s4_q21",
                "theoryKey": "perjanjian_fta",
                "theoryTitle": "Perjanjian Perdagangan Bebas (FTA & RCEP)",
                "scenario": "🏝️ Pariwisata Internasional sebagai Devisa Jasa",
                "question": "Ketika wisatawan mancanegara berlibur ke Indonesia dan membelanjakan valas mereka untuk akomodasi hotel, transportasi, dan kuliner, dalam Neraca Pembayaran transaksi ini diklasifikasikan sebagai:",
                "options": [
                    "Impor Barang Konsumsi pada pos perdagangan perbatasan antarpulau domestik",
                    "Ekspor Jasa Perjalanan (Travel Services Credit) pada Neraca Transaksi Berjalan",
                    "Pinjaman Utang Luar Negeri Jangka Pendek pada pos kewajiban perbankan komersial",
                    "Penyertaan Modal Sementara oleh lembaga multilateral pada kas operasional pemda"
                ],
                "correct": 1,
                "hint": "Orang asing menikmati layanan dan keramahan domestik dengan membayar devisa: itu adalah ekspor jasa pariwisata!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Belanja turis mancanegara di dalam negeri secara konseptual adalah <em>Ekspor Jasa Perjalanan (Travel Services Credit)</em> dalam Neraca Transaksi Berjalan. Warga asing mengonsumsi jasa yang diproduksi di dalam yurisdiksi Indonesia menggunakan devisa, memberikan kontribusi devisa bersih.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Impor barang terjadi bila warga domestik membeli barang dari luar negeri, kebalikan dari kedatangan turis.</li><li><strong>Opsi C:</strong> Belanja pelancong adalah pembayaran konsumsi final langsung, bukan transaksi pinjaman utang komersial.</li><li><strong>Opsi D:</strong> Pengeluaran turis adalah transaksi privat komersial, bukan penyertaan modal lembaga multilateral.</li></ul></div>"
            },
            {
                "id": "s4_q22",
                "theoryKey": "taper_tantrum",
                "theoryTitle": "Fenomena Taper Tantrum",
                "scenario": "🛡️ Bilateral Swap Arrangement (BSA)",
                "question": "Bank Indonesia menjalin kerja sama Bilateral Currency Swap Arrangement (BCSA) dengan bank sentral mitra strategis. Apakah fungsi utama dari jaring pengaman keuangan bilateral ini?",
                "options": [
                    "Memaksa bank sentral mitra dagang menghentikan penggunaan mata uang nasionalnya masing-masing",
                    "Menyediakan akses likuiditas valas darurat yang siap ditarik sewaktu-waktu guna meredam tekanan likuiditas neraca pembayaran saat krisis",
                    "Menjamin perbankan swasta asing memperoleh kewenangan menerbitkan uang kartal rupiah di luar negeri",
                    "Menyerahkan pengelolaan seluruh cadangan emas moneter domestik kepada lembaga peradilan internasional"
                ],
                "correct": 1,
                "hint": "Pakta kesiagaan likuiditas: bila terjadi krisis valas darurat, BI dapat menukar rupiah ke valas mitra seketika sebagai bantalan cadangan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Bilateral Currency Swap Arrangement (BCSA)</em> berfungsi sebagai jaring pengaman likuiditas keuangan lini kedua (<em>second line of defense</em>). Jika terjadi tekanan likuiditas valas ekstrem, BI dapat menukarkan Rupiah dengan mata uang mitra (USD/JPY/CNY) untuk menyokong cadangan devisa dan stabilitas pasar.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kerja sama swap justru menghormati kedaulatan mata uang masing-masing bank sentral yang berpartisipasi.</li><li><strong>Opsi C:</strong> Hak penerbitan rupiah tetap merupakan hak monopoli tunggal Bank Indonesia di bawah UU Mata Uang.</li><li><strong>Opsi D:</strong> Cadangan emas moneter tidak dipindahtangankan melainkan tetap dikelola mandiri oleh bank sentral.</li></ul></div>"
            },
            {
                "id": "s4_q23",
                "theoryKey": "peringkat_utang",
                "theoryTitle": "Peringkat Utang Negara (Sovereign Credit Rating)",
                "scenario": "🚢 Tarif Impor & Proteksionisme Dagang",
                "question": "Pemerintah mengenakan Bea Masuk Tindakan Pengamanan (BMTP) dan tarif impor tinggi pada produk garmen tertentu. Apakah trade-off makroekonomi utama dari kebijakan proteksionisme tarif ini?",
                "options": [
                    "Melindungi produsen lokal dari gempuran harga dumping, namun menaikkan harga yang harus dibayar konsumen domestik dan memicu inefisiensi",
                    "Menghilangkan seluruh kewajiban industri garmen dalam menyerap tenaga kerja lokal dan membayar upah minimum",
                    "Memastikan bahwa seluruh produk garmen luar negeri dibagikan secara gratis kepada masyarakat berpenghasilan rendah",
                    "Menghapuskan wewenang kementerian keuangan dalam menyusun peraturan kepabeanan pelabuhan internasional"
                ],
                "correct": 0,
                "hint": "Proteksionisme melindungi pabrik lokal dan pekerjanya, tetapi konsumen harus menanggung harga barang yang lebih tinggi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Tarif impor proteksionis menciptakan <em>trade-off</em> klasik: di satu sisi melindungi industri manufaktur domestik dan lapangan kerja lokal dari persaingan produk impor murah (dumping), namun di sisi lain menimbulkan kerugian surplus konsumen (<em>deadweight loss</em>) dan menaikkan harga belanja masyarakat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Industri yang dilindungi tetap terikat pada kepatuhan upah minimum regional dan ketentuan ketenagakerjaan.</li><li><strong>Opsi C:</strong> Produk impor yang dikenakan tarif tetap dijual secara komersial di toko dengan harga yang lebih mahal.</li><li><strong>Opsi D:</strong> Kebijakan tarif merupakan kewenangan yuridis sah yang dirumuskan kementerian keuangan dan kementerian perdagangan.</li></ul></div>"
            },
            {
                "id": "s4_q24",
                "theoryKey": "premi_cds",
                "theoryTitle": "Premi Risiko Credit Default Swap (CDS 5-Tahun)",
                "scenario": "💵 Pasar Valas Spot vs Forward",
                "question": "Seorang importir barang modal mesin wajib melunasi pembayaran US$ 2 juta dalam tempo 6 bulan mendatang. Mengapa importir tersebut lebih memilih membeli kontrak Forward Valas ketimbang berspekulasi di pasar Spot saat jatuh tempo?",
                "options": [
                    "Menghilangkan kepastian biaya operasional agar perusahaan dapat membukukan kerugian selisih kurs secara sengaja",
                    "Mengunci tingkat kurs masa depan (hedging) sehingga terlindung dari risiko lonjakan kurs Dolar yang tidak terduga saat jatuh tempo",
                    "Mendapatkan pembebasan tarif pajak penghasilan badan secara permanen dari direktorat jenderal pajak",
                    "Mewajibkan bank sentral menyediakan fasilitas pinjaman tanpa bunga bagi seluruh direksi perusahaan importir"
                ],
                "correct": 1,
                "hint": "Kontrak forward mengunci harga kurs hari ini untuk penyerahan 6 bulan lagi, menghilangkan kecemasan jika dolar melonjak!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pembelian kontrak <em>Forward Valas</em> adalah tindakan lindung nilai (<em>hedging</em>). Importir mengunci kurs penukaran valas di masa depan pada tingkat harga yang disepakati hari ini, memberikan kepastian biaya pengadaan (<em>cash flow certainty</em>) dan mengeliminasi risiko kerugian akibat volatilitas depresiasi rupiah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Manajemen perusahaan yang rasional selalu berusaha meminimalkan ketidakpastian dan kerugian finansial.</li><li><strong>Opsi C:</strong> Transaksi derivatif valas tidak memberikan pembebasan pajak penghasilan badan secara otomatis.</li><li><strong>Opsi D:</strong> Kontrak forward dilakukan dengan bank umum komersial devisa pada harga pasar, bukan pinjaman gratis BI.</li></ul></div>"
            },
            {
                "id": "s4_q25",
                "theoryKey": "hukum_satu_harga",
                "theoryTitle": "Hukum Satu Harga & Paritas Daya Beli (PPP)",
                "scenario": "📉 Beban Utang Luar Negeri (DSR)",
                "question": "Indikator Debt Service Ratio (DSR Tier-1) mengukur rasio pembayaran cicilan pokok dan bunga utang luar negeri terhadap total penerimaan devisa ekspor. Mengapa rasio DSR yang melampaui batas kehati-hatian (misal di atas 30%) dinilai berisiko?",
                "options": [
                    "Karena porsi devisa ekspor yang tersisa untuk membiayai impor bahan baku dan modal semakin tipis, menaikkan kerentanan gagal bayar eksternal",
                    "Karena seluruh pelabuhan ekspor diwajibkan menutup operasionalnya sampai seluruh utang luar negeri terlunasi",
                    "Karena kementerian keuangan dilarang menerbitkan surat berharga negara berdenominasi mata uang rupiah",
                    "Karena lembaga pemeringkat kredit internasional akan membekukan seluruh izin transaksi perbankan komersial swasta"
                ],
                "correct": 0,
                "hint": "Jika sebagian besar devisa hasil ekspor habis tersedot hanya untuk mencicil utang valas, ruang untuk belanja impor barang kebutuhan jadi sangat sempit!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Debt Service Ratio (DSR)</em> menunjukkan seberapa besar kapasitas devisa ekspor yang terserap untuk melunasi cicilan pokok dan bunga utang luar negeri. DSR yang terlalu tinggi berarti devisa terkuras untuk beban masa lalu, menyisakan ruang devisa yang sempit untuk membiayai impor produktif.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Pelabuhan ekspor justru harus dipacu lebih giat agar penerimaan devisa bertambah untuk menurunkan rasio DSR.</li><li><strong>Opsi C:</strong> Penerbitan SBN rupiah tetap dapat dilakukan untuk membiayai belanja dan memperdalam pasar obligasi domestik.</li><li><strong>Opsi D:</strong> Lembaga pemeringkat menilai skor risiko kelayakan utang, bukan memiliki wewenang operasional menutup bank.</li></ul></div>"
            },
            {
                "id": "s4_q26",
                "theoryKey": "kurs_reer",
                "theoryTitle": "Real Effective Exchange Rate (Kurs REER)",
                "scenario": "🌊 Gejolak Global: Taper Tantrum 2013",
                "question": "Pada episode 'Taper Tantrum' tahun 2013, sinyal rencana pengurangan stimulus moneter oleh The Fed memicu pelemahan tajam Rupiah dan IHSG. Pelajaran struktural apakah yang dipetik Indonesia dari peristiwa tersebut?",
                "options": [
                    "Menutup seluruh akses perdagangan luar negeri dan melarang warga negara menggunakan valuta asing",
                    "Pentingnya mempersempit defisit transaksi berjalan (CAD), mempertebal cadangan devisa, dan memperdalam pasar keuangan domestik guna membendung pembalikan modal mendadak",
                    "Mewajibkan seluruh korporasi swasta berutang murni dalam mata uang valuta asing tanpa agunan",
                    "Menetapkan suku bunga kredit perbankan pada angka absolut nol persen secara permanen"
                ],
                "correct": 1,
                "hint": "Pelajaran berharga 2013: jangan biarkan defisit transaksi berjalan melebar dan cadangan devisa tipis saat suku bunga dunia bergejolak naik!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pengalaman <em>Taper Tantrum 2013</em> mengajarkan bahwa ekonomi dengan CAD lebar dan cadangan devisa tipis menjadi sasaran empuk penarikan modal asing. Pasca-2013, Indonesia memperkuat bauran kebijakan: menjaga CAD di bawah 2% PDB, mempertebal cadangan devisa, dan memperkuat basis investor domestik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menutup diri dari perdagangan internasional akan menghancurkan rantai pasok industri manufaktur nasional.</li><li><strong>Opsi C:</strong> Berutang valas tanpa lindung nilai justru memperparah kerentanan saat krisis nilai tukar melanda.</li><li><strong>Opsi D:</strong> Menetapkan bunga nol persen di tengah pengetatan global akan memicu arus modal kabur ke luar negeri lebih cepat.</li></ul></div>"
            },
            {
                "id": "s4_q27",
                "theoryKey": "komoditas_supercycle",
                "theoryTitle": "Siklus Super Komoditas (Commodity Supercycle)",
                "scenario": "🏛️ Chiang Mai Initiative (CMIM)",
                "question": "Negara-negara anggota ASEAN bersama China, Jepang, dan Korea Selatan membentuk kesepakatan Chiang Mai Initiative Multilateralisation (CMIM). Apakah mandat utama dari inisiatif kerja sama multilateral ini?",
                "options": [
                    "Membubarkan seluruh bank sentral nasional di kawasan Asia Timur dan menggantikannya dengan dewan moneter tunggal",
                    "Menyediakan skema penarikan likuiditas valas darurat regional (regional financial safety net) guna mengatasi krisis neraca pembayaran dan likuiditas jangka pendek",
                    "Menyeragamkan tarif pajak pertambahan nilai dan pajak bumi bangunan di seluruh kota metropolitan Asia",
                    "Menghapuskan penggunaan paspor dan visa bagi seluruh pekerja informal yang melintasi perbatasan regional"
                ],
                "correct": 1,
                "hint": "Jaring pengaman keuangan regional Asia: bila ada negara anggota kehabisan likuiditas valas saat krisis, dana bersama siap disalurkan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Chiang Mai Initiative Multilateralisation (CMIM)</em> adalah jaring pengaman keuangan regional (<em>Regional Financing Arrangement</em>) dengan dana komitmen ratusan miliar Dolar. Tujuannya memberikan bantuan likuiditas valas darurat bagi anggota yang mengalami kesulitan neraca pembayaran dalam menghadapi krisis.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Masing-masing negara anggota tetap mempertahankan kedaulatan moneter dan bank sentral nasionalnya.</li><li><strong>Opsi C:</strong> Kebijakan perpajakan domestik adalah kewenangan fiskal otonom masing-masing pemerintah anggota.</li><li><strong>Opsi D:</strong> CMIM bergerak murni di sektor fasilitas likuiditas finansial, bukan kebijakan imigrasi atau ketenagakerjaan bebas.</li></ul></div>"
            },
            {
                "id": "s4_q28",
                "theoryKey": "larangan_ekspor_mentah",
                "theoryTitle": "Larangan Ekspor Bijih Mentah Mineral",
                "scenario": "📦 Aturan Ketentuan Asal Barang (Rules of Origin)",
                "question": "Dalam perjanjian perdagangan bebas internasional (seperti RCEP atau ASEAN FTA), mengapa ketentuan 'Rules of Origin' (Ketentuan Asal Barang) diverifikasi secara ketat oleh otoritas kepabeanan?",
                "options": [
                    "Mencegah praktik re-ekspor atau transshipment barang dari negara non-anggota yang sekadar menumpang lewat demi menikmati fasilitas tarif preferensi khusus",
                    "Mewajibkan seluruh kemasan barang dagangan menggunakan bahan baku plastik sekali pakai yang tidak dapat didaur ulang",
                    "Mengharuskan importir membayar tarif bea masuk dua kali lipat dibanding tarif umum non-perjanjian",
                    "Melarang keterlibatan perusahaan logistik domestik dalam menangani bongkar muat peti kemas di pelabuhan"
                ],
                "correct": 0,
                "hint": "Mencegah barang dari negara luar perjanjian sekadar ditempeli label di negara mitra agar dapat fasilitas bebas bea masuk!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Rules of Origin (ROO)</em> memastikan bahwa fasilitas tarif preferensial nol persen dalam FTA hanya dinikmati oleh barang yang benar-benar memiliki kandungan nilai tambah lokal (<em>Regional Value Content</em>) memadai di negara anggota, mencegah barang pihak ketiga memanipulasi asal usul barang (<em>trade deflection</em>).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Perjanjian perdagangan modern justru mendorong standar keberlanjutan lingkungan dan kemasan ramah lingkungan.</li><li><strong>Opsi C:</strong> Pemanfaatan SKA (Surat Keterangan Asal) bertujuan mendapatkan tarif diskon/preferensial, bukan tarif berlipat ganda.</li><li><strong>Opsi D:</strong> Ketentuan ROO tidak melarang keterlibatan perusahaan forwarder dan jasa bongkar muat domestik legal.</li></ul></div>"
            },
            {
                "id": "s4_q29",
                "theoryKey": "devaluasi_kompetitif",
                "theoryTitle": "Devaluasi Kompetitif (Beggar-Thy-Neighbour)",
                "scenario": "💰 Devaluasi Mata Uang secara Sengaja",
                "question": "Dalam dinamika perang dagang global, beberapa negara pengekspor besar kerap dituding menjalankan 'Devaluasi Kompetitif' (Beggar-thy-Neighbour). Apakah motif strategis di balik kebijakan pelemahan nilai tukar buatan tersebut?",
                "options": [
                    "Membuat harga barang ekspor domestik tampak relatif lebih murah di pasar luar negeri untuk merebut pangsa pasar mitra dagang secara agresif",
                    "Mendorong seluruh produsen dalam negeri menghentikan kegiatan produksi demi beralih ke impor konsumsi",
                    "Menaikkan biaya pinjaman utang luar negeri agar korporasi domestik segera mengalami kebangkrutan terencana",
                    "Memenuhi instruksi organisasi kesehatan dunia terkait pembatasan mobilitas logistik antar-wilayah"
                ],
                "correct": 0,
                "hint": "Sengaja melemahkan mata uang membuat harga barang dagangan tampak sangat murah bagi pembeli luar negeri untuk merebut pasar lawan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kebijakan <em>Competitive Devaluation</em> bertujuan memanipulasi kurs agar terdepresiasi secara artifisial. Hal ini mendongkrak daya saing harga barang ekspor di pasar global dengan memindahkan pengangguran ke negara mitra (<em>Beggar-Thy-Neighbour Policy</em>), yang sering memicu pembalasan tarif dagang.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Pelemahan mata uang justru mendongkrak biaya impor dan memberi insentif pada peningkatan produksi ekspor.</li><li><strong>Opsi C:</strong> Membengkaknya beban utang valas adalah risiko sampingan yang dihindari, bukan tujuan yang disengaja.</li><li><strong>Opsi D:</strong> Kebijakan manipulasi nilai tukar adalah ranah strategi perdagangan makroekonomi, bukan regulasi kesehatan.</li></ul></div>"
            },
            {
                "id": "s4_q30",
                "theoryKey": "investasi_portofolio",
                "theoryTitle": "Arus Modal Panas (Hot Money) & Portofolio",
                "scenario": "🚢 Neraca Finansial: Investasi Portofolio",
                "question": "Selain Penanaman Modal Asing Langsung (FDI), pos Investasi Portofolio memegang peranan besar dalam Neraca Finansial. Aset pasar modal manakah yang mendominasi transaksi portofolio asing di Indonesia?",
                "options": [
                    "Kepemilikan aset fisik lahan pertanian pangan dan perkebunan sawit rakyat",
                    "Pembelian saham emiten di Bursa Efek Indonesia dan instrumen Surat Berharga Negara (SBN)",
                    "Pinjaman tunai bilateral antar-kepala daerah untuk membiayai operasional pilkada",
                    "Setoran modal tunai pendirian koperasi simpan pinjam di tingkat rukun tetangga"
                ],
                "correct": 1,
                "hint": "Investasi portofolio adalah aset finansial likuid yang diperdagangkan di pasar modal: saham bursa dan surat utang negara!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Investasi Portofolio</em> pada neraca finansial mencakup transaksi kepemilikan aset finansial yang likuid dan tidak memberikan kendali manajemen langsung (kepemilikan &lt;10%), terutama saham korporasi terbuka di BEI serta Surat Berharga Negara (SBN SUN/Sukuk) yang diperdagangkan di pasar obligasi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kepemilikan lahan fisik perkebunan komersial dikategorikan ke dalam Penanaman Modal Langsung (FDI).</li><li><strong>Opsi C:</strong> Pinjaman antardaerah tidak masuk dalam pencatatan neraca modal transaksi portofolio asing.</li><li><strong>Opsi D:</strong> Koperasi simpan pinjam adalah entitas keuangan mikro domestik non-bursa modal publik.</li></ul></div>"
            },
            {
                "id": "s4_q31",
                "theoryKey": "global_value_chains",
                "theoryTitle": "Rantai Nilai Global (Global Value Chains / GVC)",
                "scenario": "🌐 Fenomena Dutch Disease di Sektor Valas",
                "question": "Saat booming ekspor tambang dan komoditas melonjak drastis, aliran deras Dolar masuk dapat mengapresiasi nilai tukar Rupiah secara tajam. Mengapa apresiasi ekstrem ini justru dapat memicu fenomena 'Dutch Disease' pada industri manufaktur tradisional?",
                "options": [
                    "Membuat produk manufaktur padat karya domestik (tekstil, mebel) menjadi relatif mahal dan kehilangan daya saing ekspor di pasar dunia",
                    "Memaksa pabrik pengolahan makanan mengganti seluruh mesin produksi dengan tenaga kerja manual tanpa keterampilan",
                    "Menghilangkan seluruh pasokan energi listrik dari jaringan transmisi nasional bagi kawasan industri",
                    "Mewajibkan industri manufaktur menyetorkan seluruh omzet penjualannya ke rekening bursa komoditas luar negeri"
                ],
                "correct": 0,
                "hint": "Rupiah yang terlalu perkasa akibat lonjakan komoditas membuat harga ekspor baju dan mebel buatan kita jadi kemahalan di luar negeri!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Dutch Disease</em> terjadi ketika ledakan penerimaan sektor komoditas mengapresiasi nilai tukar riil mata uang domestik secara tajam. Penguatan kurs ini membuat produk manufaktur padat karya lokal kehilangan daya saing harga di pasar global dan memicu deindustrialisasi dini.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Perusahaan justru terdorong mengadopsi efisiensi mesin impor yang harganya relatif murah akibat rupiah kuat.</li><li><strong>Opsi C:</strong> Pasokan listrik tetap berjalan stabil; ancaman Dutch Disease murni berupa distorsi daya saing harga relatif.</li><li><strong>Opsi D:</strong> Perusahaan manufaktur tetap mencatatkan pembukuan komersial dan laba di rekening perbankan perusahaannya.</li></ul></div>"
            },
            {
                "id": "s4_q32",
                "theoryKey": "risk_free_rate",
                "theoryTitle": "Suku Bunga Bebas Risiko (Risk-Free Rate)",
                "scenario": "📈 Suku Bunga Bebas Risiko (Risk-Free Rate)",
                "question": "Dalam penentuan arus modal portofolio valas global, imbal hasil obligasi pemerintah AS (US Treasury) kerap dijadikan patokan 'Risk-Free Rate' dunia. Mengapa investor global menjadikannya acuan utama?",
                "options": [
                    "Karena pemerintah AS dijamin oleh hukum perdagangan internasional untuk tidak memungut pajak pertambahan nilai",
                    "Karena US Treasury dipandang memiliki probabilitas gagal bayar paling mendekati nol dan Dolar AS merupakan mata uang cadangan devisa utama dunia",
                    "Karena seluruh pembeli obligasi pemerintah AS diberikan hak kepemilikan tanah di wilayah ibu kota Washington DC",
                    "Karena obligasi tersebut secara otomatis melipatgandakan nilai pokok pinjamannya setiap pergantian tahun kabisat"
                ],
                "correct": 1,
                "hint": "Obligasi pemerintah AS berstatus safe haven berdaulat: tolok ukur suku bunga aman yang harus dilampaui instrumen negara lain!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>US Treasuries</em> dipandang sebagai aset acuan bebas risiko (<em>Risk-Free Rate</em>) karena didukung oleh kekuatan ekonomi terbesar dan status Dolar AS sebagai mata uang jangkar global. Seluruh aset di negara berkembang harus menawarkan imbal hasil di atas acuan ini ditambah premi risiko.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Peringkat bebas risiko didasarkan pada kredibilitas penerbit berdaulat, bukan regulasi PPN.</li><li><strong>Opsi C:</strong> Pembelian surat utang tidak memberikan hak kebendaan atas tanah milik pemerintah berdaulat.</li><li><strong>Opsi D:</strong> Nilai pokok obligasi dilunasi pada nilai paritas nominal yang telah ditetapkan dalam prospektus emisi.</li></ul></div>"
            },
            {
                "id": "s4_q33",
                "theoryKey": "swasembada_pangan",
                "theoryTitle": "Swasembada Pangan & Kedaulatan Devisa",
                "scenario": "🌾 Ketahanan Pangan & Kedaulatan Valas",
                "question": "Mengapa ketergantungan kronis pada impor komoditas pangan pokok (seperti beras, gandum, dan daging) dipandang bukan sekadar isu pertanian melainkan ancaman langsung terhadap ketahanan moneter dan valas?",
                "options": [
                    "Lonjakan harga pangan global menyedot cadangan devisa untuk pembiayaan impor dan memicu imported inflation yang menekan kurs rupiah",
                    "Konsumsi pangan impor secara otomatis membatalkan hak perbankan domestik dalam mencairkan kredit usaha rakyat",
                    "Organisasi pangan dunia mewajibkan negara pengimpor pangan menyerahkan hak monopoli pencetakan mata uang",
                    "Impor pangan pokok menghapuskan kewajiban kementerian keuangan dalam menyusun rancangan undang-undang APBN"
                ],
                "correct": 0,
                "hint": "Bila kebutuhan perut bergantung pada barang impor, lonjakan harga dunia langsung menghabisi cadangan devisa dan menenggelamkan kurs!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Ketergantungan pangan impor membuat inflasi dan stabilitas nilai tukar sangat rentan terhadap guncangan rantai pasok global. Saat harga pangan dunia melonjak, devisa terkuras untuk belanja impor pokok dan transmisi <em>imported inflation</em> langsung menggerus daya beli masyarakat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Perbankan tetap dapat menyalurkan KUR; dampak impor pangan terkonsentrasi pada neraca perdagangan dan inflasi.</li><li><strong>Opsi C:</strong> Lembaga pangan PBB (FAO) mempromosikan ketahanan pangan dan tidak mengintervensi hak emisi mata uang.</li><li><strong>Opsi D:</strong> Penyusunan APBN adalah amanah konstitusi tahunan yang tetap wajib dijalankan oleh pemerintah.</li></ul></div>"
            },
            {
                "id": "s4_q34",
                "theoryKey": "utang_valas_swasta",
                "theoryTitle": "Mitigasi Risiko Utang Valas Swasta Non-Bank",
                "scenario": "🏢 Utang Luar Negeri Swasta Non-Bank",
                "question": "Bank Indonesia dan Kementerian Keuangan secara intensif memantau rasio Utang Luar Negeri (ULN) swasta non-bank. Risiko sistemik apakah yang diantisipasi dari lonjakan utang valas korporasi swasta yang tidak terkendali?",
                "options": [
                    "Penumpukan kewajiban jatuh tempo valas dapat memicu kepanikan perburuan Dolar di pasar spot, menjebol stabilitas kurs dan menular ke perbankan",
                    "Korporasi swasta akan dipaksa mengambil alih seluruh beban pembayaran pensiun aparatur sipil negara di daerah",
                    "Seluruh bank komersial swasta nasional dilarang menerima penempatan simpanan dana pihak ketiga masyarakat",
                    "Investor asing diwajibkan menyerahkan seluruh laba dividen kepada kas bendahara kementerian lingkungan hidup"
                ],
                "correct": 0,
                "hint": "Jika ribuan perusahaan panik memburu Dolar untuk bayar utang jatuh tempo, pasar valas jebol dan memicu krisis sistemik!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Utang luar negeri swasta tanpa lindung nilai memicu bahaya penularan sistemik (<em>contagion risk</em>). Saat jatuh tempo serentak, korporasi berebut memburu valas di pasar spot, memicu depresiasi kurs tajam yang menekan kesehatan neraca perbankan dan kestabilan makroekonomi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Beban pensiun ASN adalah kewajiban belanja APBN yang dikelola oleh lembaga pengelola dana pensiun negara.</li><li><strong>Opsi C:</strong> Perbankan komersial tetap beroperasi normal menghimpun dana simpanan masyarakat sesuai regulasi OJK.</li><li><strong>Opsi D:</strong> Pembagian dividen korporasi swasta adalah hak pemegang saham sah setelah memenuhi kewajiban perpajakan.</li></ul></div>"
            },
            {
                "id": "s4_q35",
                "theoryKey": "diversifikasi_mitra",
                "theoryTitle": "Diversifikasi Pasar Ekspor Non-Tradisional",
                "scenario": "📊 Derivatif DNDF (Domestic Non-Deliverable Forward)",
                "question": "Bank Indonesia meluncurkan instrumen derivatif Domestic Non-Deliverable Forward (DNDF). Apakah keunggulan utama penyelesaian transaksi DNDF dibanding kontrak forward valas konvensional?",
                "options": [
                    "Penyelesaian transaksi dilakukan murni melalui penyerahan fisik emas batangan di kantor kas cabang bank sentral",
                    "Penyelesaian pada saat jatuh tempo dilakukan tanpa perpindahan pokok Dolar fisik (net settlement) melainkan hanya selisih kurs dalam Rupiah",
                    "Nasabah dibebaskan dari kewajiban menyediakan dokumen underlying transaksi perdagangan atau investasi legal",
                    "Tingkat kurs penutupan transaksi forward ditentukan secara sepihak oleh asosiasi pedagang valuta asing daerah"
                ],
                "correct": 1,
                "hint": "DNDF adalah lindung nilai pintar: tidak ada Dolar fisik yang berpindah tangan, hanya penyelesaian selisih kurs dalam Rupiah!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Keunggulan instrumen <em>Domestic Non-Deliverable Forward (DNDF)</em> adalah mekanisme <em>net settlement</em> dalam mata uang Rupiah mengacu pada kurs JISDOR. Tidak ada pergerakan fisik Dolar AS yang keluar-masuk, sehingga pelaku usaha terlindungi dari risiko kurs tanpa menguras likuiditas valas fisik.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Transaksi DNDF diselesaikan secara non-tunai melalui rekening perbankan, bukan penyerahan fisik emas.</li><li><strong>Opsi C:</strong> Transaksi DNDF tetap wajib memiliki dokumen underlying ekonomi riil yang valid untuk mencegah spekulasi kosong.</li><li><strong>Opsi D:</strong> Kurs acuan penetapan selisih setelmen menggunakan kurs resmi Jakarta Interbank Spot Dollar Rate (JISDOR) BI.</li></ul></div>"
            },
            {
                "id": "s4_q36",
                "theoryKey": "ketahanan_eksternal",
                "theoryTitle": "Benteng Ketahanan Sektor Eksternal Indonesia",
                "scenario": "👑 Mahakarya Ketahanan Eksternal Bangsa",
                "question": "Di akhir pembelajaran Level 4, bagaimanakah formula strategis komprehensif yang harus dipadukan oleh teknokrat makroekonomi dalam mengawal ketahanan sektor eksternal bangsa?",
                "options": [
                    "Menutup total seluruh pintu perdagangan dan melarang masuknya investasi penanaman modal asing ke tanah air",
                    "Memadukan fleksibilitas kurs sebagai peredam kejut, cadangan devisa tebal, diversifikasi ekspor bernilai tambah, dan kerja sama jaring pengaman valas bilateral",
                    "Mematok kurs rupiah secara kaku pada tingkat tetap dan menguras seluruh cadangan devisa untuk mempertahankannya",
                    "Menggantungkan seluruh kebutuhan pembiayaan neraca berjalan pada pinjaman utang valas komersial jangka sangat pendek"
                ],
                "correct": 1,
                "hint": "Kombinasi benteng eksternal: kurs mengambang fleksibel, cadangan devisa tebal, hilirisasi nilai tambah ekspor, dan jaring pengaman swap bilateral!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Ketahanan sektor eksternal modern bersandar pada integrasi pilar tangguh: (1) Rezim kurs fleksibel sebagai <em>shock absorber</em>, (2) Cadangan devisa memadai (&gt;6 bulan impor), (3) Hilirisasi ekspor bernilai tambah, (4) Penggunaan LCT de-dolarisasi, dan (5) Jaring pengaman keuangan regional (BCSA/CMIM).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menutup diri dari perdagangan dunia (autarki) menghancurkan produktivitas dan memiskinkan perekonomian nasional.</li><li><strong>Opsi C:</strong> Mematok kurs secara kaku adalah kesalahan fatal yang mengulang kerentanan krisis moneter 1997/1998.</li><li><strong>Opsi D:</strong> Ketergantungan pada utang valas jangka pendek memicu kerentanan rollover risk dan krisis likuiditas eksternal.</li></ul></div>"
            },
            {
                "id": "s5_q1",
                "theoryKey": "krismon_1998",
                "theoryTitle": "Krisis Moneter Asia 1997-1998 (Krismon)",
                "scenario": "🌪️ Anatomi Krisis Moneter 1997-1998",
                "question": "Pada Krisis Moneter Asia 1997–1998, nilai tukar Rupiah terpuruk tajam dan memicu kontraksi ekonomi mendalam. Faktor kerentanan struktural manakah yang menjadi pemicu utama cepatnya penularan krisis finansial tersebut?",
                "options": [
                    "Pemerintah menerapkan tarif pajak ekspor manufaktur yang terlampau tinggi bagi seluruh mitra dagang",
                    "Kombinasi rezim kurs kaku, penumpukan utang luar negeri swasta jangka pendek tanpa lindung nilai, dan tata kelola perbankan rapuh",
                    "Penutupan sepihak seluruh pelabuhan perikanan tradisional oleh organisasi maritim internasional",
                    "Ketiadaan instrumen uang kartal rupiah kertas yang diedarkan oleh bank sentral kepada masyarakat"
                ],
                "correct": 1,
                "hint": "Tiga kelemahan fatal: kurs dipatok kaku, utang valas swasta membludak tanpa asuransi hedging, dan kredit perbankan disalurkan ke kroni tanpa kehati-hatian!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Krisis 1997/1998 dipicu oleh kerentanan struktural: rezim kurs mengambang terkendali yang menciptakan ilusi stabilitas semu, penumpukan utang luar negeri valas swasta jangka pendek tanpa lindung nilai (<em>currency & maturity mismatch</em>), serta kelemahan pengawasan perbankan yang melanggar BMPK.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Kebijakan perdagangan masa itu tidak mengenakan pajak ekspor manufaktur ekstrem; krisis berakar di sektor moneter-finansial.</li><li><strong>Opsi C:</strong> Sektor riil perikanan tetap beroperasi; krisis meledak di pasar valas dan sektor perbankan perkotaan.</li><li><strong>Opsi D:</strong> Uang kartal beredar luas; masalahnya adalah depresiasi nilai tukar rupiah dan runtuhnya kepercayaan perbankan.</li></ul></div>"
            }
        ]
    },
    {
        "id": 10,
        "title": "Level 10: Makroprudensial & Stabilitas Keuangan",
        "subtitle": "Arsitektur SSK, Rasio LTV, CCyB, Stress Testing, dan Bank Resolusi Bail-In",
        "theme": "macroprudential",
        "unlocks": "Gelar: Penjaga Stabilitas Sistem",
        "questionPool": [
            {
                "id": "s5_q2",
                "theoryKey": "policy_mix",
                "theoryTitle": "Bauran Kebijakan (Policy Mix) Moneter & Fiskal",
                "scenario": "💎 Penyakit Belanda (Dutch Disease)",
                "question": "Ketika harga komoditas tambang dan perkebunan dunia melambung tinggi, devisa ekspor mengalir deras ke tanah air. Mengapa teknokrat makroekonomi sangat mewaspadai risiko 'Dutch Disease' selama periode ledakan komoditas?",
                "options": [
                    "Ledakan komoditas secara otomatis memicu penurunan produksi pangan pokok hingga mencapai angka nol",
                    "Penguatan kurs rupiah riil yang tajam dapat mengikis daya saing industri manufaktur padat karya dan memicu deindustrialisasi dini",
                    "Seluruh pekerja di perkotaan dipaksa pindah ke daerah pertambangan oleh regulasi kementerian ketenagakerjaan",
                    "Pemerintah kehilangan wewenang dalam memungut penerimaan negara bukan pajak dari perusahaan tambang"
                ],
                "correct": 1,
                "hint": "Banjir devisa komoditas mengapresiasi kurs mata uang, membuat ekspor manufaktur lokal kemahalan dan terancam gulung tikar!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Dutch Disease</em> adalah distorsi di mana lonjakan penerimaan ekspor komoditas mengapresiasi kurs riil mata uang domestik dan menarik sumber daya dari sektor lain. Akibatnya, sektor manufaktur ekspor dan pertanian non-komoditas kehilangan daya saing harga global (deindustrialisasi dini).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Produksi pangan tidak berhenti total ke angka nol, melainkan mengalami tekanan alokasi tenaga kerja dan lahan.</li><li><strong>Opsi C:</strong> Perpindahan tenaga kerja terjadi secara sukarela berdasarkan mekanisme pasar upah, bukan pemaksaan regulasi.</li><li><strong>Opsi D:</strong> Booming komoditas justru meningkatkan penerimaan PNBP dan royalti SDA kas negara secara masif.</li></ul></div>"
            },
            {
                "id": "s5_q3",
                "theoryKey": "kssk",
                "theoryTitle": "Protokol Manajemen Krisis Sistem Keuangan KSSK",
                "scenario": "📉 Dilema Stagflasi (Stagflation)",
                "question": "Perekonomian global dilanda fenomena 'Stagflasi' akibat guncangan pasokan energi global (Negative Supply Shock). Mengapa stagflasi dipandang sebagai dilema kebijakan moneter yang paling rumit?",
                "options": [
                    "Karena bank sentral dilarang oleh hukum perbankan internasional untuk mengumumkan suku bunga acuan baru",
                    "Karena perekonomian mengalami kombinasi laju inflasi tinggi dan kelesuan pertumbuhan ekonomi (pengangguran meningkat) secara bersamaan",
                    "Karena seluruh transaksi pasar modal domestik secara hukum internasional diubah menjadi transaksi tunai kartal",
                    "Karena pemerintah tidak lagi diperkenankan menerbitkan undang-undang anggaran pendapatan dan belanja negara"
                ],
                "correct": 1,
                "hint": "Dilema simalakama: menaikkan suku bunga meredam inflasi tapi memperparah resesi; menurunkan bunga menolong pertumbuhan tapi membakar inflasi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Stagflasi</em> adalah kombinasi dari inflasi tinggi (<em>stagnant economy + inflation</em>) dan kontraksi output riil. Menaikkan suku bunga untuk memerangi inflasi akan semakin memperdalam resesi, sedangkan melonggarkan moneter untuk memulihkan ekonomi akan memicu spiral inflasi yang lebih parah.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Bank sentral tetap memiliki wewenang penuh menetapkan suku bunga kebijakan di bawah mandat hukumnya.</li><li><strong>Opsi C:</strong> Pasar modal tetap beroperasi teratur; masalah stagflasi adalah interaksi output agregat dan tingkat harga riil.</li><li><strong>Opsi D:</strong> Otoritas fiskal tetap menyusun APBN, bahkan stimulus fiskal terarah sangat dibutuhkan saat krisis pasokan.</li></ul></div>"
            },
            {
                "id": "s5_q4",
                "theoryKey": "bail_in",
                "theoryTitle": "Mekanisme Resolusi Bank Bail-In (UU P2SK)",
                "scenario": "📈 Kurva Phillips & Batas NAIRU",
                "question": "Konsep NAIRU (Non-Accelerating Inflation Rate of Unemployment) menyatakan adanya batas pengangguran alamiah. Apa yang terjadi jika pemerintah terus memaksakan stimulus permintaan agregat saat pengangguran sudah di bawah tingkat NAIRU?",
                "options": [
                    "Tingkat pengangguran akan turun permanen ke nol persen tanpa memicu konsekuensi kenaikan biaya apa pun",
                    "Terjadi percepatan laju inflasi (spiral upah-harga) karena persaingan memperebutkan tenaga kerja memicu kenaikan biaya produksi",
                    "Seluruh perusahaan industri manufaktur secara otomatis mengubah status kepemilikannya menjadi koperasi desa",
                    "Nilai Produk Domestik Bruto riil akan melipatgandakan kapasitas fisiknya setiap akhir triwulan berjalan"
                ],
                "correct": 1,
                "hint": "Memaksa mempekerjakan buruh melampaui kapasitas tenaga kerja alamiah membuat perusahaan berebut tenaga kerja dengan menaikkan upah, menyulut inflasi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Berdasarkan Kurva Phillips terakselerasi, <em>NAIRU</em> adalah tingkat pengangguran ekuilibrium jangka panjang. Memaksa pengangguran turun di bawah batas ini melalui stimulus moneter-fiskal berlebih memicu kelangkaan tenaga kerja, lonjakan tuntutan upah, dan akselerasi inflasi yang tidak terkendali.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Pengangguran nol persen absolut secara struktural mustahil karena selalu ada pengangguran friksional alamiah.</li><li><strong>Opsi C:</strong> Struktur badan hukum perusahaan komersial tidak berubah otomatis karena kondisi pasar tenaga kerja yang ketat.</li><li><strong>Opsi D:</strong> PDB riil dibatasi oleh batas kapasitas output potensial (Y*), bukan bertambah tanpa batas matematis.</li></ul></div>"
            },
            {
                "id": "s5_q5",
                "theoryKey": "pandemi_shock",
                "theoryTitle": "Guncangan Ganda Pandemi Covid-19 (Double Shock)",
                "scenario": "🦠 Guncangan Ganda Pandemi Covid-19",
                "question": "Pada krisis pandemi Covid-19 tahun 2020, perekonomian Indonesia mengalami fenomena 'Double Shock' yang tidak biasa. Mengapa krisis ini dikategorikan sebagai guncangan ganda simultan?",
                "options": [
                    "Karena krisis terjadi serentak di sektor pertanian padi basah dan sektor pertambangan pasir laut",
                    "Karena menghantam sisi penawaran (pembatasan operasional pabrik/rantai pasok) dan sisi permintaan agregat (pelemahan belanja) secara serentak",
                    "Karena kementerian keuangan dan bank sentral dibubarkan sementara waktu selama masa karantina wilayah",
                    "Karena seluruh mata uang mitra dagang internasional digantikan oleh kupon bantuan sosial tunai darurat"
                ],
                "correct": 1,
                "hint": "Sisi penawaran terhenti karena pabrik tutup dan karantina; sisi permintaan anjlok karena mall sepi dan orang menahan belanja!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Pandemi Covid-19 adalah <em>Double Shock</em> unik: (1) <em>Negative Supply Shock</em> karena disrupsi rantai pasok global dan penutupan pabrik/mobilitas, serta (2) <em>Negative Demand Shock</em> karena hilangnya pendapatan, penurunan konsumsi, dan anjloknya mobilitas publik secara bersamaan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Guncangan pandemi melanda seluruh sektor industri manufaktur, transportasi, dan ritel secara menyeluruh.</li><li><strong>Opsi C:</strong> Lembaga otoritas makroekonomi (Kemenkeu dan BI) justru bekerja tanpa henti merumuskan paket penyelamatan darurat.</li><li><strong>Opsi D:</strong> Sistem pembayaran dan mata uang resmi tetap berfungsi normal melalui perbankan dan transaksi digital.</li></ul></div>"
            },
            {
                "id": "s5_q6",
                "theoryKey": "relaksasi_defisit",
                "theoryTitle": "Relaksasi Batas Defisit APBN Darurat Pandemi",
                "scenario": "🏛️ Bauran Kebijakan Terpadu (Policy Mix DEN)",
                "question": "Dalam merumuskan bauran kebijakan makroekonomi terpadu (Policy Mix) Dewan Ekonomi Nasional, sinergi harmonis apakah yang harus dibangun antara instrumen fiskal dan moneter?",
                "options": [
                    "Kebijakan fiskal membiayai seluruh spekulasi pasar saham sedangkan bank sentral mematok suku bunga deposito komersial",
                    "Kebijakan fiskal menjaga daya beli dan belanja produktif sementara kebijakan moneter mengawal stabilitas nilai tukar dan inflasi",
                    "Bank sentral mengambil alih seluruh kewenangan penetapan tarif pajak penghasilan dari kementerian keuangan",
                    "Pemerintah melarang seluruh bank umum komersial menyalurkan fasilitas kredit kepada sektor industri manufaktur"
                ],
                "correct": 1,
                "hint": "Kebijakan fiskal mengurus belanja riil rakyat dan perlinsos; kebijakan moneter mengurus stabilitas harga, suku bunga, dan kurs rupiah!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Macroeconomic Policy Mix</em> yang efektif memadukan otoritas fiskal (Kemenkeu) yang fokus pada stimulus daya beli, pembangunan infrastruktur, dan perlindungan sosial melalui APBN, dengan otoritas moneter (BI) yang menjaga stabilitas inflasi, pasar uang, dan nilai tukar Rupiah secara terkoordinasi.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> APBN tidak digunakan untuk membiayai spekulasi pasar finansial swasta.</li><li><strong>Opsi C:</strong> Penetapan tarif pajak tetap merupakan domain wewenang kementerian keuangan bersama Dewan Perwakilan Rakyat.</li><li><strong>Opsi D:</strong> Otoritas justru mendorong penyaluran kredit produktif perbankan ke industri pengolahan guna memacu output nasional.</li></ul></div>"
            },
            {
                "id": "s5_q7",
                "theoryKey": "burden_sharing",
                "theoryTitle": "Skema Berbagi Beban (Burden Sharing) BI-Kemenkeu",
                "scenario": "🤝 Skema Berbagi Beban (Burden Sharing) 2020",
                "question": "Melalui payung hukum UU No. 2 Tahun 2020 saat pandemi Covid-19, pemerintah dan Bank Indonesia menerapkan skema 'Burden Sharing'. Bagaimanakah esensi operasional skema darurat luar biasa tersebut?",
                "options": [
                    "BI menyita seluruh tabungan nasabah perbankan swasta untuk disetorkan langsung ke rekening kas kementerian kesehatan",
                    "BI membeli SBN di pasar perdana secara langsung dengan menanggung sebagian beban kupon bunga untuk pembiayaan public goods dan non-public goods",
                    "Kementerian keuangan menyerahkan seluruh cadangan emas batangan kepada investor pasar modal luar negeri",
                    "Seluruh utang luar negeri komersial korporasi swasta diubah statusnya menjadi beban utang langsung APBN"
                ],
                "correct": 1,
                "hint": "BI membeli SBN langsung di pasar perdana (primary market) dan menanggung kupon bunga untuk mendanai penanganan kesehatan dan bansos darurat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Skema <em>Burden Sharing</em> (SKB I, II, III Kemenkeu-BI) adalah terobosan luar biasa di masa krisis darurat. BI membeli SBN secara langsung di pasar perdana dengan suku bunga 0% untuk belanja <em>Public Goods</em> (kesehatan dan bansos), serta menanggung selisih beban bunga untuk belanja pemulihan UMKM.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Simpanan masyarakat di perbankan tetap aman dan dijamin penuh oleh LPS tanpa penyitaan sepihak.</li><li><strong>Opsi C:</strong> Cadangan emas moneter negara tetap terjaga aman di bawah pengelolaan Bank Indonesia.</li><li><strong>Opsi D:</strong> Beban utang swasta tetap menjadi tanggung jawab perdata korporasi swasta yang bersangkutan.</li></ul></div>"
            },
            {
                "id": "s5_q8",
                "theoryKey": "too_big_to_fail",
                "theoryTitle": "Penanganan Bank Sistemik Too Big To Fail (D-SIB)",
                "scenario": "🏦 Penanganan Bank 'Too Big To Fail'",
                "question": "Ketika bank berskala sistemik (Domestic Systemically Important Bank / D-SIB) mengalami kesulitan likuiditas atau solvabilitas, mengapa otoritas tidak dapat membiarkannya bangkrut secara serampangan?",
                "options": [
                    "Karena kegagalan bank sistemik dapat memicu keruntuhan efek domino (contagion risk) yang melumpuhkan sistem pembayaran dan sektor riil nasional",
                    "Karena seluruh dewan direksi bank sistemik berstatus sebagai anggota kabinet menteri yang memiliki kekebalan hukum",
                    "Karena undang-undang melarang penutupan kantor cabang perbankan di seluruh wilayah kepulauan Indonesia",
                    "Karena kebangkrutan satu bank swasta secara otomatis membatalkan seluruh perjanjian perdagangan ekspor negara"
                ],
                "correct": 0,
                "hint": "Efek domino: jika bank sistemik kolaps, bank-bank lain ikut terseret, sistem pembayaran macet, dan tabungan rakyat terkunci!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Lembaga keuangan sistemik (<em>D-SIB</em>) memiliki ukuran aset masif, keterkaitan antar-bank tinggi (<em>interconnectedness</em>), dan kompleksitas transaksi kliring. Kebangkrutan yang tidak tertata akan memicu efek penularan domino (<em>contagion risk</em>), kepanikan sistemik penarikan dana, dan pembekuan likuiditas ekonomi riil.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Direksi perbankan adalah profesional swasta/BUMN yang tunduk penuh pada hukum perbankan dan tidak memiliki imunitas kabinet.</li><li><strong>Opsi C:</strong> Penutupan atau pembukaan cabang bank diatur berdasarkan analisis kelayakan komersial dan izin OJK.</li><li><strong>Opsi D:</strong> Kontrak ekspor komersial melibatkan banyak pihak dan tidak dibatalkan otomatis oleh kegagalan satu institusi bank.</li></ul></div>"
            },
            {
                "id": "s5_q9",
                "theoryKey": "lps",
                "theoryTitle": "Lembaga Penjamin Simpanan (LPS) & Pencegahan Bank Run",
                "scenario": "🛡️ Lembaga Penjamin Simpanan (LPS) & Bank Run",
                "question": "Ketika beredar disinformasi yang memicu kepanikan penarikan dana massal (Bank Run) di sebuah bank, peran fundamental apakah yang diemban Lembaga Penjamin Simpanan (LPS)?",
                "options": [
                    "Membagikan dana dividen tunai langsung kepada seluruh nasabah yang sedang mengantre di depan kantor bank",
                    "Menjamin simpanan nasabah memenuhi syarat (3T) hingga batas nominal legal guna mengembalikan keyakinan publik dan meredam kepanikan",
                    "Menutup seluruh akses komunikasi telepon dan internet perbankan di kota tempat terjadinya kepanikan",
                    "Mewajibkan seluruh bank umum lain menghentikan penyaluran kredit produktif kepada pelaku usaha mikro"
                ],
                "correct": 1,
                "hint": "LPS menjamin dana tabungan nasabah aman hingga batas legal (syarat 3T), memadamkan api ketakutan sebelum bank run meluas!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> LPS berfungsi menjaga kepercayaan publik melalui skema penjaminan simpanan (hingga Rp 2 miliar per nasabah per bank dengan syarat 3T: Tercatat di pembukuan, Tingkat bunga tidak melebihi batas penjaminan, dan Tidak melakukan perbuatan merugikan bank). Jaminan ini menghentikan kepanikan penarikan massal (<em>bank run</em>).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> LPS membayarkan klaim simpanan jika bank dicabut izin usahanya, bukan membagikan dividen tunai di antrean.</li><li><strong>Opsi C:</strong> Pemadaman jaringan telekomunikasi justru meningkatkan spekulasi liar dan memperparah kepanikan nasabah.</li><li><strong>Opsi D:</strong> Penyaluran kredit bank lain tetap berjalan normal sesuai prinsip tata kelola kehati-hatian.</li></ul></div>"
            },
            {
                "id": "s5_q10",
                "theoryKey": "moral_hazard",
                "theoryTitle": "Bahaya Moral Hazard dalam Penyelamatan Keuangan",
                "scenario": "⚠️ Bahaya Moral Hazard dalam Penyelamatan Bank",
                "question": "Pasca-evaluasi krisis perbankan masa lalu, mengapa penggunaan dana talangan anggaran negara (Bail-Out APBN) untuk menyelamatkan bank swasta bermasalah sangat dihindari dalam regulasi modern?",
                "options": [
                    "Menciptakan bahaya Moral Hazard, di mana pemilik bank terdorong mengambil risiko spekulatif ekstrem karena merasa kerugiannya akan ditalangi uang rakyat",
                    "Karena kementerian keuangan dilarang oleh hukum perbankan memiliki saldo rekening kas di bank umum",
                    "Karena seluruh bank swasta nasional secara otomatis dibebaskan dari kewajiban pembayaran pajak penghasilan",
                    "Karena pembukuan neraca kementerian keuangan tidak mampu mencatat transaksi dalam satuan mata uang rupiah"
                ],
                "correct": 0,
                "hint": "Bail-out memicu moral hazard: untung dinikmati pemilik bank sendiri, tapi kalau rugi disuruh nomboki pakai uang pajak rakyat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Bail-out</em> menggunakan uang pembayar pajak (APBN) memicu <em>Moral Hazard</em> parah. Manajemen bank menjadi ceroboh dan mengambil risiko spekulasi berlebihan (<em>excessive risk-taking</em>) karena meyakini pemerintah pasti akan turun tangan menalangi kerugian mereka saat gagal bayar.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Kas negara secara resmi ditempatkan di rekening Kas Umum Negara di BI dan bank umum persepsi.</li><li><strong>Opsi C:</strong> Bank swasta tetap merupakan badan usaha pembayar pajak penghasilan yang wajib mematuhi ketentuan perpajakan.</li><li><strong>Opsi D:</strong> Laporan keuangan pemerintah pusat disusun dan disajikan dalam satuan resmi mata uang Rupiah.</li></ul></div>"
            },
            {
                "id": "s5_q11",
                "theoryKey": "teori_kuantitas_uang",
                "theoryTitle": "Hiperinflasi & Kehancuran Kepercayaan Mata Uang",
                "scenario": "💸 Hiperinflasi & Kehancuran Kepercayaan Uang",
                "question": "Ketika suatu negara dilanda bencana hiperinflasi jutaan persen akibat pencetakan uang ugal-ugalan, langkah reformasi struktural paling radikal apakah yang terbukti mampu memulihkan stabilitas nilai tukar?",
                "options": [
                    "Menerbitkan pecahan uang kertas baru dengan nominal seratus triliun rupiah setiap pekan",
                    "Reformasi moneter mendasar: penghentian total pencetakan uang defisit, redenominasi/penggantian mata uang baru, dan penegakan jangkar fiskal kredibel",
                    "Menetapkan larangan bagi masyarakat untuk membeli barang kebutuhan pangan pokok di pasar",
                    "Membagikan pinjaman kredit konsumsi tanpa agunan kepada seluruh warga negara melalui aplikasi digital"
                ],
                "correct": 1,
                "hint": "Hentikan pencetakan uang defisit, tegakkan disiplin APBN yang ketat, dan terbitkan mata uang baru yang terikat pada jangkar nilai yang kuat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Mengatasi hiperinflasi menuntut pemulihan kredibilitas (<em>restoring monetary credibility</em>): menghentikan monetisasi defisit fiskal, menyeimbangkan anggaran negara, serta melakukan reformasi mata uang (redenominasi atau pengikatan pada mata uang jangkar/aset berharga) yang didukung komitmen kelembagaan independen.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Mencetak pecahan yang makin besar justru mempercepat hilangnya fungsi uang dan memperparah laju hiperinflasi.</li><li><strong>Opsi C:</strong> Melarang perdagangan pangan pokok akan memicu kelaparan massal dan meledaknya pasar gelap ilegal.</li><li><strong>Opsi D:</strong> Menggelontorkan kredit konsumsi gratis akan melipatgandakan peredaran uang tanpa ada output barang riil.</li></ul></div>"
            },
            {
                "id": "s5_q12",
                "theoryKey": "krisis_2008",
                "theoryTitle": "Krisis Keuangan Global Subprime Mortgage 2008",
                "scenario": "🏠 Krisis Subprime Mortgage Global 2008",
                "question": "Krisis Keuangan Global 2008 bermula dari gagal bayar massal kredit perumahan berisiko tinggi (Subprime Mortgage) di Amerika Serikat. Saluran transmisi utama apakah yang merambat dan menekan perekonomian Indonesia saat itu?",
                "options": [
                    "Pembekuan seluruh layanan jaringan internet komersial yang menghubungkan benua Amerika dan Asia",
                    "Pembalikan arus modal asing (sudden capital reversal), kejatuhan harga komoditas ekspor, dan pengetatan likuiditas pasar modal global",
                    "Penutupan total seluruh rute penerbangan komersial internasional menuju bandara domestik",
                    "Mogok kerja massal seluruh serikat pekerja pelabuhan peti kemas di kawasan Eropa Timur"
                ],
                "correct": 1,
                "hint": "Transmisi krisis 2008: investor global panik menarik modal likuidnya (capital outflow) dan anjloknya permintaan serta harga komoditas ekspor!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Krisis 2008 merambat ke Indonesia melalui saluran keuangan dan perdagangan: penarikan modal asing secara masif (<em>capital flight to safety</em>), anjloknya indeks harga saham dan nilai tukar rupiah, serta penurunan tajam volume dan harga komoditas ekspor unggulan nasional.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Infrastruktur telekomunikasi dan perbankan elektronik internasional tetap beroperasi normal.</li><li><strong>Opsi C:</strong> Layanan transportasi logistik dan penerbangan tidak mengalami penutupan sistemik akibat krisis subprime.</li><li><strong>Opsi D:</strong> Permasalahan krisis berpusat pada solvabilitas institusi keuangan global Wall Street dan Eropa Barat.</li></ul></div>"
            },
            {
                "id": "s5_q13",
                "theoryKey": "wage_price_spiral",
                "theoryTitle": "Spiral Upah-Harga (Wage-Price Spiral)",
                "scenario": "🔥 Spiral Upah-Harga (Wage-Price Spiral)",
                "question": "Ketika ekspektasi inflasi tidak terjangkar, pekerja menuntut kenaikan upah tinggi, dan produsen meneruskan biaya upah tersebut ke harga jual barang, lingkaran setan ekonomi apakah yang sedang terbentuk?",
                "options": [
                    "Spiral Deflasi Kronis, di mana harga barang terus merosot setiap bulan",
                    "Wage-Price Spiral (Spiral Upah-Harga), di mana kenaikan upah nominal dan kenaikan harga saling mengunci dalam eskalasi inflasi persisten",
                    "Paradoks Tabungan Keynesian, di mana masyarakat menahan seluruh pendapatannya di bank",
                    "Keseimbangan Kompetitif Pareto, di mana alokasi sumber daya mencapai titik paling optimal"
                ],
                "correct": 1,
                "hint": "Upah naik membuat ongkos pabrik naik sehingga harga barang dinaikkan, lalu buruh menuntut upah naik lagi—lingkaran setan berputar!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Wage-Price Spiral</em> adalah fenomena saling dorong antara tuntutan upah nominal dan kenaikan harga barang. Saat pekerja menuntut upah lebih tinggi untuk menutup inflasi masa lalu, pengusaha menaikkan harga jual produk guna mempertahankan margin laba, yang pada gilirannya menyulut tuntutan upah berikutnya.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Spiral deflasi adalah kebalikannya, yaitu fenomena penurunan harga barang dan upah yang berkepanjangan.</li><li><strong>Opsi C:</strong> Paradox of thrift terjadi saat konsumsi anjlok karena dorongan menabung berlebih, bukan siklus inflasi.</li><li><strong>Opsi D:</strong> Kondisi spiral upah-harga adalah disekuilibrium makro yang merusak efisiensi alokasi ekonomi.</li></ul></div>"
            },
            {
                "id": "s5_q14",
                "theoryKey": "bail_in",
                "theoryTitle": "Resolusi Bank Bail-In vs Bail-Out Negara",
                "scenario": "🏛️ Skema Resolusi Bail-In vs Bail-Out",
                "question": "Berdasarkan amanah Undang-Undang Pengembangan dan Penguatan Sektor Keuangan (UU P2SK), apakah prinsip pembeda utama antara skema resolusi 'Bail-In' dengan skema 'Bail-Out'?",
                "options": [
                    "Bail-In membebankan penyerapan kerugian dan rekapitalisasi pada pemegang saham serta kreditur bank itu sendiri sebelum menyentuh dana publik",
                    "Bail-In mewajibkan seluruh saldo tabungan nasabah ritel disita dan diserahkan kepada kas kementerian keuangan",
                    "Bail-Out menggunakan modal internal perbankan sedangkan Bail-In menggunakan dana bantuan APBN murni",
                    "Bail-In melarang keterlibatan Lembaga Penjamin Simpanan dalam menangani proses likuidasi institusi keuangan"
                ],
                "correct": 0,
                "hint": "Bail-in: pemilik modal dan investor surat utang bank yang harus nombok menanggung kerugian, bukan meminta talangan kas APBN negara!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Dalam skema <em>Bail-In</em> (UU P2SK), resolusi bank bermasalah dilakukan dengan menyerap kerugian secara internal: modal pemegang saham dihapusbukukan (<em>write-down</em>) dan utang subordinated dikonversi menjadi ekuitas, sehingga menyelamatkan kelangsungan bank tanpa membebani kas APBN (<em>anti-bailout</em>).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Simpanan nasabah yang dijamin LPS (eligible deposits) dilindungi penuh dari pemotongan bail-in.</li><li><strong>Opsi C:</strong> Terbalik; Bail-out adalah penyelamatan memakai dana publik/APBN, sedangkan Bail-in memakai dana internal bank.</li><li><strong>Opsi D:</strong> LPS memegang peranan sentral sebagai eksekutor resolusi bank bermasalah sesuai mandat UU P2SK.</li></ul></div>"
            },
            {
                "id": "s5_q15",
                "theoryKey": "histeresis_pengangguran",
                "theoryTitle": "Histeresis Pengangguran (Unemployment Hysteresis)",
                "scenario": "📉 Histeresis Pengangguran (Unemployment Hysteresis)",
                "question": "Mengapa krisis ekonomi atau resesi yang berlangsung berkepanjangan dapat memicu fenomena 'Histeresis' pada pasar tenaga kerja nasional?",
                "options": [
                    "Karena pekerja yang menganggur lama mengalami degradasi keahlian (skill decay) dan kehilangan keterikatan pasar kerja sehingga tingkat pengangguran alamiah naik permanen",
                    "Karena seluruh lulusan perguruan tinggi secara otomatis dilarang melamar pekerjaan di sektor swasta formal",
                    "Karena kementerian tenaga kerja membekukan seluruh izin pendirian usaha mikro dan koperasi simpan pinjam",
                    "Karena upah nominal buruh pabrik secara hukum internasional diwajibkan naik seratus persen setiap pergantian bulan"
                ],
                "correct": 0,
                "hint": "Menganggur terlalu lama membuat keterampilan memudar dan jaringan kerja hilang, sehingga saat ekonomi pulih mereka tetap sulit terserap!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Histeresis</em> pasar tenaga kerja terjadi ketika pengangguran siklikal akibat resesi berubah menjadi pengangguran struktural jangka panjang. Penganggur yang terlalu lama menganggur mengalami penurunan keahlian (<em>skill atrophy</em>), demoralisasi, dan stigma rekrutmen, sehingga tingkat pengangguran alamiah (NAIRU) meningkat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Tidak ada pelarangan melamar kerja; hambatan bersifat hilangnya daya saing dan keterampilan praktis.</li><li><strong>Opsi C:</strong> Pendirian usaha mikro justru didorong oleh pemerintah untuk menyerap tenaga kerja informal.</li><li><strong>Opsi D:</strong> Regulasi upah minimum disesuaikan dengan formula inflasi dan produktivitas, bukan pelipatgandaan bulanan.</li></ul></div>"
            },
            {
                "id": "s5_q16",
                "theoryKey": "sovereign_debt_crisis",
                "theoryTitle": "Krisis Utang Berdaulat (Sovereign Debt Crisis)",
                "scenario": "⚠️ Krisis Utang Berdaulat (Sovereign Debt Crisis) Yunani",
                "question": "Pada krisis utang Yunani tahun 2010, negara tersebut kehilangan kepercayaan pasar modal internasional dan terancam gagal bayar. Faktor fiskal fundamental apakah yang menyeret Yunani ke dalam krisis utang berdaulat tersebut?",
                "options": [
                    "Pemerintah Yunani menolak mengadopsi mata uang Euro dan mencetak mata uang sendiri tanpa kendali",
                    "Defisit anggaran membengkak kronis, rasio utang melampaui 120% PDB, maraknya manipulasi data statistik, dan rendahnya kepatuhan pajak",
                    "Pemerintah melarang sektor pariwisata internasional menerima kunjungan wisatawan dari negara anggota Uni Eropa",
                    "Bank sentral Eropa menyita seluruh cadangan lahan pertanian gandum Yunani untuk dilelang komersial"
                ],
                "correct": 1,
                "hint": "Belanja negara ugal-ugalan dibiayai utang jumbo, pelaporan anggaran dimanipulasi, dan kebocoran pajak kronis!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Krisis Utang Berdaulat Yunani dipicu oleh defisit fiskal kronis yang ditutup dengan utang masif, maraknya penggelapan pajak, pelaporan akuntansi anggaran yang dimanipulasi, serta ketiadaan otonomi moneter untuk mendepresiasi kurs karena tergabung dalam zona Euro.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Yunani justru menggunakan mata uang tunggal Euro dan tidak dapat mendevaluasi mata uang nasionalnya (Drachma).</li><li><strong>Opsi C:</strong> Sektor pariwisata adalah penopang devisa utama Yunani dan tetap dibuka bagi pelancong internasional.</li><li><strong>Opsi D:</strong> ECB beroperasi di ranah kebijakan moneter dan likuiditas perbankan, bukan menyita lahan pertanian.</li></ul></div>"
            },
            {
                "id": "s5_q17",
                "theoryKey": "stress_test",
                "theoryTitle": "Macro Stress Test Ketahanan Perbankan",
                "scenario": "🛡️ Stress Test Makroprudensial Perbankan",
                "question": "Bank Indonesia dan Otoritas Jasa Keuangan secara berkala menggelar simulasi 'Macro Stress Test' terhadap perbankan nasional. Bagaimanakah metodologi dan tujuan dari simulasi ketahanan ini?",
                "options": [
                    "Mewajibkan seluruh bank memutus hubungan kerja dengan separuh pegawainya untuk menguji efisiensi",
                    "Menguji daya tahan kecukupan modal (CAR) dan likuiditas perbankan terhadap skenario guncangan makro ekstrem (depresiasi kurs, lonjakan NPL, kontraksi PDB)",
                    "Menghentikan sementara operasional seluruh mesin ATM selama satu bulan penuh guna menguji kesabaran nasabah",
                    "Menyerahkan pengelolaan portofolio kredit macet perbankan komersial kepada konsorsium leasing internasional"
                ],
                "correct": 1,
                "hint": "Uji simulasi ketahanan perbankan: apakah modal dan likuiditas bank tetap bertahan aman jika skenario badai ekonomi terburuk terjadi!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Macro Stress Test</em> adalah analisis simulasi kuantitatif untuk menguji ketahanan permodalan (CAR) dan profil likuiditas bank dalam menghadapi skenario guncangan makroekonomi terburuk (misal: depresiasi kurs tajam, kenaikan suku bunga ekstrem, lonjakan NPL, dan resesi).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Uji ketahanan dilakukan secara simulasi analitis matematis/data, bukan pemutusan hubungan kerja nyata.</li><li><strong>Opsi C:</strong> Layanan operasional ATM dan sistem pembayaran perbankan tetap berjalan normal tanpa interupsi.</li><li><strong>Opsi D:</strong> Portofolio kredit bermasalah dikelola oleh unit kerja penagihan internal bank di bawah koridor regulasi OJK.</li></ul></div>"
            },
            {
                "id": "s5_q18",
                "theoryKey": "balance_sheet_recession",
                "theoryTitle": "Resesi Neraca (Balance Sheet Recession) & Gelembung Aset",
                "scenario": "🫧 Gelembung Aset (Asset Price Bubble Collapse)",
                "question": "Ketika gelembung harga aset properti atau saham meletus (Bubble Collapse), sektor korporasi dan rumah tangga kerap terjebak dalam 'Resesi Neraca' (Balance Sheet Recession). Perilaku apakah yang melumpuhkan ekonomi dalam kondisi ini?",
                "options": [
                    "Pelaku usaha agresif meminjam dana kredit bank untuk membangun pabrik manufaktur baru secara masif",
                    "Pelaku usaha dan rumah tangga fokus mengalihkan seluruh arus kas untuk melunasi utang (debt minimization) ketimbang berbelanja atau berinvestasi",
                    "Pemerintah mewajibkan seluruh pengembang properti membagikan unit apartemen gratis kepada masyarakat",
                    "Bank sentral mencabut peredaran seluruh uang giral elektronik dan beralih ke koin tembaga murni"
                ],
                "correct": 1,
                "hint": "Saat nilai aset anjlok sementara utang tetap penuh, perusahaan tidak mau berinvestasi melainkan sibuk memakai seluruh kasnya untuk mencicil utang!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Konsep Richard Koo tentang <em>Balance Sheet Recession</em> (seperti di Jepang pasca-1990): saat nilai aset kolaps namun kewajiban utang tetap utuh, pelaku usaha mengubah prioritas dari memaksimalkan laba (<em>profit maximization</em>) menjadi meminimalkan utang (<em>debt minimization</em>), memicu stagnasi berkepanjangan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Dunia usaha justru menahan diri dari pinjaman baru karena fokus merestrukturisasi utang lama.</li><li><strong>Opsi C:</strong> Unit properti tetap diperdagangkan secara komersial dengan harga yang terkoreksi tajam di pasar.</li><li><strong>Opsi D:</strong> Sistem pembayaran modern tetap menggunakan uang fiat dan perbankan digital.</li></ul></div>"
            }
        ]
    },
    {
        "id": 11,
        "title": "Level 11: Badai Krisis & Teknokrat Tertinggi",
        "subtitle": "Stagflasi, Krisis Finansial, Pandemi Double Shock, Burden Sharing, dan Visi 2045",
        "theme": "crisis",
        "unlocks": "Gelar: Teknokrat Dewan Ekonomi Nasional 👑",
        "questionPool": [
            {
                "id": "s5_q19",
                "theoryKey": "restrukturisasi_kredit",
                "theoryTitle": "Restrukturisasi Kredit Darurat Perbankan OJK",
                "scenario": "🔄 Restrukturisasi Kredit Darurat OJK",
                "question": "Saat pandemi Covid-19 melumpuhkan aktivitas usaha, OJK menerbitkan regulasi restrukturisasi kredit luar biasa (POJK 11/2020). Mengapa kebijakan relaksasi penilaian kualitas kredit ini menjadi penyelamat krusial bagi sistem keuangan?",
                "options": [
                    "Menghapuskan seluruh pokok utang debitur secara permanen tanpa perlu diganti oleh kas perbankan",
                    "Memberi ruang penyesuaian tenor dan penundaan cicilan bagi debitur terdampak sehingga mencegah lonjakan NPL perbankan dan kebangkrutan massal dunia usaha",
                    "Mewajibkan bank umum komersial mengambil alih seluruh kepemilikan saham pengendali pada perusahaan debitur",
                    "Melarang penarikan dana tabungan oleh seluruh nasabah perbankan hingga masa darurat bencana dinyatakan usai"
                ],
                "correct": 1,
                "hint": "Memberikan relaksasi restrukturisasi cicilan: debitur tidak langsung divonis macet (NPL), memberi waktu bernapas bagi dunia usaha dan bank!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> POJK 11/2020 memperbolehkan penetapan kualitas kredit hanya berdasarkan ketepatan pembayaran pokok/bunga bagi debitur terdampak pandemi. Relaksasi ini mencegah lonjakan kredit macet (NPL) secara artifisial, memberi ruang napas bagi sektor riil, dan menjaga solvabilitas perbankan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Restrukturisasi menjadwal ulang kewajiban utang, bukan memutihkan atau menghapus kewajiban pembayaran pokok.</li><li><strong>Opsi C:</strong> Bank tidak mengambil alih kepemilikan ekuitas perusahaan debitur yang direstrukturisasi.</li><li><strong>Opsi D:</strong> Dana tabungan nasabah perbankan tetap likuid dan dapat diakses setiap saat oleh masyarakat.</li></ul></div>"
            },
            {
                "id": "s5_q20",
                "theoryKey": "cadangan_beras_pemerintah",
                "theoryTitle": "Manajemen Cadangan Beras Pemerintah (CBP)",
                "scenario": "🌾 Manajemen Cadangan Beras Pemerintah (CBP)",
                "question": "Pemerintah menetapkan batas aman stok Cadangan Beras Pemerintah (CBP) di gudang Perum Bulog minimal 1,5 hingga 2 juta ton. Apakah fungsi strategis stok cadangan pangan fisik ini dalam arsitektur ketahanan makroekonomi?",
                "options": [
                    "Membatasi hak petani lokal dalam menjual gabah hasil panen kepada pengepul pasar tradisional",
                    "Menjadi instrumen penyangga stabilitas pasokan dan harga pangan serta bantalan darurat saat terjadi bencana alam atau krisis pangan global",
                    "Memastikan bahwa seluruh beras konsumsi masyarakat wajib disalurkan murni melalui sistem jatah kupon daerah",
                    "Menyerap seluruh likuiditas uang kartal perbankan untuk dialihkan ke pos cadangan devisa internasional"
                ],
                "correct": 1,
                "hint": "Lumbung pangan darurat negara: siap digelontorkan untuk operasi pasar murah saat harga beras melonjak atau gagal panen!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Cadangan Beras Pemerintah (CBP)</em> adalah instrumen <em>buffer stock</em> strategis. CBP menjamin ketersediaan beras saat gagal panen/paceklik, menopang bantuan pangan bagi keluarga prasejahtera, dan menjadi amunisi operasi pasar (SPHP) guna meredam lonjakan inflasi pangan (<em>volatile foods</em>).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Petani bebas menjual gabah ke pasar komersial atau ke Bulog sesuai Harga Pembelian Pemerintah (HPP).</li><li><strong>Opsi C:</strong> Mekanisme pasar beras komersial tetap berjalan bebas melayani kebutuhan konsumsi harian masyarakat.</li><li><strong>Opsi D:</strong> Pengadaan CBP menggunakan fasilitas kredit komersial dan pembiayaan fiskal terencana, bukan penyerapan uang paksa.</li></ul></div>"
            },
            {
                "id": "s5_q21",
                "theoryKey": "subsidi_energi",
                "theoryTitle": "Guncangan Minyak Dunia & Subsidi Kompensasi Energi",
                "scenario": "⚡ Krisis Energi & Subsidi Kompensasi APBN",
                "question": "Ketika harga minyak mentah dunia melonjak tajam melampaui asumsi makro APBN, pos subsidi dan kompensasi energi membengkak ratusan triliun rupiah. Bagaimanakah pendekatan bauran kebijakan fiskal yang paling berimbang?",
                "options": [
                    "Menutup seluruh stasiun pengisian bahan bakar umum dan melarang operasional kendaraan bermotor",
                    "Melakukan penyesuaian harga terukur sembari mempertebal bantalan bantuan sosial tunai (BLT) bagi kelompok desil terbawah guna menjaga daya beli",
                    "Meminjam utang valuta asing komersial bertenor semalam tanpa memperhitungkan batas rasio utang undang-undang",
                    "Menghapuskan seluruh sistem perpajakan domestik agar defisit anggaran kas negara mencatat surplus"
                ],
                "correct": 1,
                "hint": "Sesuaikan harga energi secara hati-hati agar APBN tidak jebol, tapi alihkan penghematannya menjadi bansos tunai bagi rakyat miskin!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Mengelola lonjakan harga energi menuntut kehati-hatian: mempertahankan subsidi terbuka tanpa batas akan menjebol ruang fiskal APBN. Solusi berimbang adalah penyesuaian harga secara bertahap yang dibarengi penebalan bantalan bansos tunai (BLT BBM) untuk melindungi daya beli masyarakat miskin.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menghentikan pasokan BBM akan melumpuhkan mobilitas logistik dan mematikan perekonomian riil.</li><li><strong>Opsi C:</strong> Penarikan utang ugal-ugalan tanpa batas kehati-hatian akan memicu krisis utang dan penurunan peringkat kredit.</li><li><strong>Opsi D:</strong> Menghapus pajak justru melenyapkan pendapatan negara dan melipatgandakan defisit anggaran.</li></ul></div>"
            },
            {
                "id": "s5_q22",
                "theoryKey": "early_warning",
                "theoryTitle": "Early Warning System (EWS) Kerentanan Makroekonomi",
                "scenario": "🛡️ Early Warning System (EWS) Kerentanan",
                "question": "Otoritas makroekonomi KSSK memantau Sistem Peringatan Dini (Early Warning System / EWS). Manakah kelompok indikator keuangan yang menjadi radar deteksi utama kerentanan krisis sistemik?",
                "options": [
                    "Jumlah pengikut media sosial kementerian teknis dan volume penjualan tiket konser musik daerah",
                    "Rasio defisit transaksi berjalan (CAD), rasio kecukupan cadangan devisa, pertumbuhan kredit perbankan, yield spread SBN, dan premi CDS",
                    "Persentase curah hujan tahunan di pulau Jawa dan rata-rata suhu udara kawasan pesisir pantai timur",
                    "Total nilai transaksi penjualan mobil mewah impor di gerai pameran otomotif ibu kota negara"
                ],
                "correct": 1,
                "hint": "Indikator radar krisis: defisit transaksi berjalan, ketebalan cadangan devisa, lonjakan kredit berlebih, dan premi risiko obligasi CDS!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Early Warning System (EWS)</em> memantau indikator kerentanan eksternal dan finansial (seperti rasio CAD/PDB, kecukupan cadangan devisa terhadap utang jangka pendek, <em>Credit-to-GDP gap</em>, volatilitas kurs, yield spread obligasi, dan <em>Credit Default Swap / CDS</em>) untuk mendeteksi risiko sebelum menjadi krisis.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Metrik popularitas media sosial tidak relevan dengan indikator stabilitas makroekonomi dan solvabilitas.</li><li><strong>Opsi C:</strong> Variabel cuaca dipantau BMKG untuk pertanian, bukan matriks utama sistem stabilitas sistem keuangan.</li><li><strong>Opsi D:</strong> Penjualan mobil mewah adalah segmen mikro spesifik yang tidak mencerminkan solvabilitas sistemik perbankan.</li></ul></div>"
            },
            {
                "id": "s5_q23",
                "theoryKey": "just_energy_transition",
                "theoryTitle": "Kemitraan Transisi Energi Berkeadilan (JETP)",
                "scenario": "🌱 Just Energy Transition Partnership (JETP)",
                "question": "Indonesia menyepakati pendanaan Kemitraan Transisi Energi Berkeadilan (JETP) untuk mempercepat penghentian dini PLTU batu bara. Mengapa prinsip 'Berkeadilan' (Just Transition) menjadi syarat mutlak dalam transformasi energi ini?",
                "options": [
                    "Memastikan seluruh aset pertambangan batu bara diserahkan secara cuma-cuma kepada lembaga perbankan luar negeri",
                    "Melindungi pekerja tambang dan komunitas lokal terdampak dari risiko hilangnya mata pencaharian melalui pelatihan ulang dan penciptaan lapangan kerja hijau",
                    "Mewajibkan seluruh rumah tangga mematikan aliran listrik selama dua belas jam setiap hari kerja",
                    "Menghilangkan kewajiban industri manufaktur dalam memenuhi standar analisis mengenai dampak lingkungan hidup"
                ],
                "correct": 1,
                "hint": "Transisi hijau yang adil: mengurangi polusi karbon tanpa mengorbankan nasib pekerja tambang dan komunitas daerah setempat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Prinsip <em>Just Transition</em> memastikan bahwa peralihan menuju ekonomi hijau rendah emisi tidak meninggalkan siapa pun di belakang (<em>leave no one behind</em>). Penutupan dini PLTU harus dibarengi program jaring pengaman sosial, alih keterampilan kerja (<em>reskilling</em>), dan investasi pembangunan alternatif bagi masyarakat lokal.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Aset pembangkit dikelola berdasarkan perhitungan kompensasi finansial yang adil, bukan penyerahan gratis.</li><li><strong>Opsi C:</strong> Transisi energi justru bertujuan menjamin keandalan pasokan listrik yang berkelanjutan dan terjangkau.</li><li><strong>Opsi D:</strong> Standar AMDAL dan kepatuhan lingkungan hidup justru diperketat dalam proyek pembangkit terbarukan.</li></ul></div>"
            },
            {
                "id": "s5_q24",
                "theoryKey": "deflationary_spiral",
                "theoryTitle": "Bahaya Spiral Deflasi Kronis (Deflationary Spiral)",
                "scenario": "📉 Bahaya Deflasi Kronis (Deflationary Spiral)",
                "question": "Orang awam sering mengira penurunan harga barang secara terus-menerus (Deflasi) selalu menguntungkan. Mengapa bagi teknokrat makroekonomi, 'Spiral Deflasi' berkepanjangan justru dipandang sangat berbahaya bagi perekonomian?",
                "options": [
                    "Konsumen terus menunda belanja karena berekspektasi harga akan lebih murah esok hari, meruntuhkan omzet bisnis, memicu PHK, dan menaikkan beban riil utang",
                    "Deflasi secara otomatis melipatgandakan penerimaan kas negara dari sektor pajak pertambahan nilai",
                    "Perusahaan industri manufaktur dipaksa merekrut jutaan tenaga kerja baru dengan penawaran gaji berlipat ganda",
                    "Nilai nominal utang korporasi swasta secara otomatis dihapuskan oleh sistem perbankan nasional"
                ],
                "correct": 0,
                "hint": "Jika orang tahu harga besok bakal lebih murah, mereka menunda belanja; jika semua orang menunda belanja, pabrik bangkrut dan PHK massal meledak!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Deflationary Spiral</em> adalah jebakan mematikan: ekspektasi harga turun mendorong konsumen menunda pembelian barang tahan lama. Akibatnya, pendapatan bisnis merosot, pabrik memangkas kapasitas dan merumahkan buruh, sementara beban riil utang (<em>debt deflation</em>) melonjak, mengunci ekonomi dalam resesi berkepanjangan.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Deflasi dan anjloknya konsumsi justru memangkas basis pemungutan pajak pertambahan nilai secara tajam.</li><li><strong>Opsi C:</strong> Perusahaan justru melakukan pemangkasan jam kerja dan perumahan tenaga kerja akibat kelebihan stok barang.</li><li><strong>Opsi D:</strong> Nilai nominal pokok utang bersifat kaku; penurunan harga barang membuat utang riil justru makin berat dibayar.</li></ul></div>"
            },
            {
                "id": "s5_q25",
                "theoryKey": "ketahanan_pangan",
                "theoryTitle": "Ketahanan Pangan Struktural & Produktivitas Pertanian",
                "scenario": "🛡️ Ketahanan Pangan: Food Estate & Produktivitas",
                "question": "Dalam jangka panjang, strategi struktural manakah yang paling berdaya tahan dalam melindungi ekonomi Indonesia dari ancaman krisis pangan global selain mengandalkan kebijakan impor?",
                "options": [
                    "Mewajibkan seluruh petani menghentikan penanaman padi sawah demi beralih ke komoditas tanaman hias",
                    "Modernisasi irigasi, riset bibit unggul tahan iklim, mekanisasi panen, integrasi rantai pasok dingin (cold chain), dan perlindungan lahan produktif",
                    "Menghapuskan seluruh sistem jaring pengaman sosial pangan bagi masyarakat miskin di daerah pedesaan",
                    "Menyerahkan pengelolaan seluruh lumbung pangan desa kepada perusahaan importir swasta asing"
                ],
                "correct": 1,
                "hint": "Solusi berkelanjutan sejati: bangun bendungan irigasi, ciptakan benih unggul tahan kekeringan, dan modernisasi mesin panen petani!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Kedaulatan pangan jangka panjang bersandar pada penguatan kapasitas produksi sisi penawaran domestik: modernisasi bendungan dan jaringan irigasi, riset benih tahan cuaca ekstrem, mekanisasi pascapanen untuk menekan kehilangan hasil (<em>losses</em>), serta kepastian tata ruang lahan pertanian abadi (LP2B).</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Menghentikan penanaman padi sawah akan memicu bencana kelaparan dan krisis moneter pangan nasional.</li><li><strong>Opsi C:</strong> Jaring pengaman pangan bagi kaum rentan tetap esensial untuk menjaga kecukupan gizi balita dan ibu hamil.</li><li><strong>Opsi D:</strong> Lumbung pangan lokal harus dikelola mandiri oleh kelompok tani dan Perum Bulog di bawah kedaulatan negara.</li></ul></div>"
            },
            {
                "id": "s5_q26",
                "theoryKey": "car_perbankan",
                "theoryTitle": "Rasio Kecukupan Modal Bank (CAR)",
                "scenario": "🏦 Rasio Kecukupan Modal Bank (CAR)",
                "question": "Rasio Kecukupan Modal (Capital Adequacy Ratio / CAR) rata-rata industri perbankan Indonesia tercatat di atas 26%, jauh melampaui batas minimum internasional Basel III (8%). Mengapa tebalnya bantalan modal ini sangat vital?",
                "options": [
                    "Memastikan bahwa bank umum tidak perlu lagi menyalurkan kredit komersial kepada sektor riil UMKM",
                    "Menyediakan kapasitas penyerap kerugian (loss-absorbing capacity) yang sangat kokoh sehingga perbankan tetap stabil dan mampu beroperasi saat krisis ekonomi melanda",
                    "Membebaskan dewan komisaris perbankan dari kewajiban mematuhi uji kepatutan dan kelayakan otoritas jasa keuangan",
                    "Mewajibkan seluruh nasabah menukarkan simpanan tabungannya menjadi saham ekuitas perbankan secara berkala"
                ],
                "correct": 1,
                "hint": "Modal tebal ibarat bantalan kejut mobil: jika terjadi tabrakan krisis ekonomi keras, kerugian terserap dan tabungan nasabah tetap selamat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Capital Adequacy Ratio (CAR)</em> adalah ukuran modal bank terhadap aset tertimbang menurut risiko (ATMR). Rasio modal yang tinggi (&gt;26%) memberikan kapasitas penyerap kerugian (<em>loss-absorbing capacity</em>) yang kokoh terhadap lonjakan kredit macet, menjaga solvabilitas bank dan melindungi simpanan masyarakat saat badai krisis.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Modal yang kuat justru menjadi landasan perbankan untuk berani melakukan intermediasi kredit secara sehat.</li><li><strong>Opsi C:</strong> Uji kepatutan dan kelayakan (<em>fit and proper test</em>) OJK tetap berlaku ketat bagi jajaran pengurus bank.</li><li><strong>Opsi D:</strong> Simpanan tabungan nasabah tetap berstatus simpanan dijamin, tidak diubah paksa menjadi saham.</li></ul></div>"
            },
            {
                "id": "s5_q27",
                "theoryKey": "umkm_ketahanan",
                "theoryTitle": "Ketahanan Ekonomi UMKM sebagai Tulang Punggung Bangsa",
                "scenario": "🤝 Peran Koperasi & UMKM dalam Ketahanan",
                "question": "Saat Krisis Moneter 1998 menumbangkan konglomerasi besar yang terbelit utang valas, sektor UMKM dan koperasi terbukti menjadi penyelamat perputaran ekonomi. Karakteristik apakah yang mendasari resiliensi UMKM tersebut?",
                "options": [
                    "Ketergantungan tinggi pada fasilitas pinjaman sindikasi valas luar negeri bertenor sangat pendek",
                    "Ketiadaan utang valuta asing, dominasi penggunaan bahan baku lokal, perputaran kas cepat, dan fleksibilitas adaptasi produk terhadap kebutuhan pasar",
                    "Pembebasan dari kewajiban mematuhi seluruh peraturan hukum perdata dan hukum perdagangan yang sah",
                    "Kepemilikan cadangan emas batangan fisik dalam jumlah tonase besar di kantor sekretariat koperasi"
                ],
                "correct": 1,
                "hint": "UMKM tidak berutang Dolar, memakai bahan lokal, dan perputaran kasnya lincah beradaptasi: pahlawan sejati di masa krisis!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Resiliensi UMKM bersumber dari struktur operasionalnya: tidak memiliki eksposur utang valas (bebas <em>currency mismatch</em>), mengandalkan bahan baku lokal, fleksibel dalam menyesuaikan harga dan produk, serta melayani kebutuhan konsumsi pokok masyarakat yang permintaannya inelastis.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Berutang valas luar negeri adalah biang keladi kebangkrutan korporasi konglomerat besar pada 1998.</li><li><strong>Opsi C:</strong> UMKM tetap beroperasi dalam koridor kepatuhan hukum perniagaan dan perizinan berusaha legal.</li><li><strong>Opsi D:</strong> UMKM mengandalkan modal kerja kas tunai operasional harian, bukan timbunan tonase emas batangan.</li></ul></div>"
            },
            {
                "id": "s5_q28",
                "theoryKey": "kemiskinan_stunting",
                "theoryTitle": "Pengentasan Kemiskinan Ekstrem & Penurunan Stunting",
                "scenario": "📈 Penurunan Kemiskinan Ekstrem & Stunting",
                "question": "Mengapa program percepatan penurunan stunting pada anak dan penghapusan kemiskinan ekstrem ditempatkan sebagai pilar makro prioritas dalam dokumen RPJPN menuju Indonesia Emas 2045?",
                "options": [
                    "Mencegah penurunan permanen kapasitas kognitif dan produktivitas generasi masa depan, guna mengamankan bonus demografi dan modal manusia (human capital)",
                    "Memenuhi target kuota penyaluran bantuan makanan cepat saji impor dari korporasi multinasional",
                    "Mewajibkan seluruh orang tua balita menyetorkan tabungannya ke pos kas cadangan devisa bank sentral",
                    "Menghilangkan kebutuhan kementerian dalam menyelenggarakan fasilitas pendidikan dasar formal"
                ],
                "correct": 0,
                "hint": "Stunting merusak perkembangan otak anak secara permanen; memberantas stunting menyelamatkan kecerdasan dan produktivitas bangsa masa depan!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Stunting mengakibatkan kerusakan permanen pada perkembangan otak dan fungsi kognitif anak. Dari perspektif ekonomi makro, menekan angka stunting adalah investasi <em>Human Capital</em> paling krusial agar bonus demografi menghasilkan tenaga kerja cerdas, produktif, dan mampu mengangkat Indonesia keluar dari <em>Middle-Income Trap</em>.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Penanganan gizi buruk mengandalkan pangan bergizi lokal (telur, ikan, sayur), bukan konsumsi cepat saji impor.</li><li><strong>Opsi C:</strong> Pemerintah justru menyalurkan bantuan tunai dan pangan bergizi gratis, bukan menyita simpanan keluarga miskin.</li><li><strong>Opsi D:</strong> Pendidikan formal dasar tetap menjadi pilar wajib yang diselaraskan dengan pemenuhan gizi anak sekolah.</li></ul></div>"
            },
            {
                "id": "s5_q29",
                "theoryKey": "biaya_transaksi_eodb",
                "theoryTitle": "Reformasi Birokrasi & Kemudahan Berusaha (EoDB)",
                "scenario": "⚖️ Reformasi Birokrasi & Kemudahan Berusaha (EoDB)",
                "question": "Pakar ekonomi kerap menekankan bahwa reformasi birokrasi dan kepastian hukum jauh lebih efektif menarik investasi produktif berkualitas dibanding sekadar obral insentif pemotongan pajak. Mengapa kepastian regulasi lebih unggul?",
                "options": [
                    "Investor lebih memprioritaskan pengurangan biaya transaksi siluman (pungli), kepastian izin berusaha, dan perlindungan kontrak hukum jangka panjang",
                    "Karena korporasi internasional diwajibkan menyumbangkan seluruh aset pabriknya kepada pemerintah daerah",
                    "Karena pengusaha lebih menyukai birokrasi yang rumit agar pesaing baru kesulitan memasuki pasar",
                    "Karena insentif pemotongan pajak secara otomatis membatalkan hak cipta produk yang diproduksi pabrik"
                ],
                "correct": 0,
                "hint": "Investor menanamkan modal puluhan tahun: kepastian hukum yang bersih dan izin yang cepat jauh lebih penting dibanding diskon pajak sesaat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Berdasarkan teori <em>New Institutional Economics</em>, efisiensi ekonomi ditentukan oleh rendahnya biaya transaksi (<em>transaction costs</em>). Kepastian regulasi, kemudahan izin berusaha (EoDB), penegakan hukum kontrak yang adil, dan birokrasi bersih memberikan kepastian investasi yang jauh lebih fundamental bagi investor jangka panjang.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Hak kepemilikan privat (<em>property rights</em>) investor dijamin dilindungi oleh hukum investasi yang beradab.</li><li><strong>Opsi C:</strong> Hambatan birokrasi korup justru mematikan iklim usaha dan memperbesar ekonomi biaya tinggi (<em>high-cost economy</em>).</li><li><strong>Opsi D:</strong> Insentif fiskal resmi tidak berkaitan dengan pembatalan hak kekayaan intelektual (paten/merek).</li></ul></div>"
            },
            {
                "id": "s5_q30",
                "theoryKey": "dedolarisasi",
                "theoryTitle": "Diversifikasi Cadangan Devisa & Dedolarisasi Multilateral",
                "scenario": "🪙 Dedolarisasi & Ketahanan Finansial Multilateral",
                "question": "Tren makroekonomi global terkini menunjukkan peningkatan diversifikasi cadangan devisa dunia ke dalam sekeranjang mata uang beragam dan emas moneter. Apakah keuntungan strategis diversifikasi portofolio cadangan devisa bagi Indonesia?",
                "options": [
                    "Meniadakan seluruh kebutuhan perekonomian dalam melakukan transaksi perdagangan luar negeri",
                    "Mereduksi risiko ketergantungan tunggal pada satu mata uang adidaya (concentration risk) serta melindungi nilai cadangan dari gejolak geopolitik dan sanksi finansial",
                    "Mewajibkan seluruh bank umum menggunakan standar penimbangan fisik emas dalam melayani transaksi setor tunai",
                    "Menghapuskan fungsi mata uang rupiah sebagai satuan hitung dan alat tukar resmi di dalam negeri"
                ],
                "correct": 1,
                "hint": "Prinsip portofolio: jangan taruh semua telur dalam satu keranjang devisa agar terlindung dari risiko gejolak satu negara!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Diversifikasi cadangan devisa (ke dalam USD, EUR, JPY, CNY, dan emas moneter) menerapkan prinsip manajemen risiko portofolio modern. Diversifikasi menekan risiko konsentrasi (<em>concentration risk</em>), mengamankan aset dari risiko geopolitik, dan memperkokoh ketahanan moneter saat volatilitas nilai tukar global meningkat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Perdagangan internasional tetap berlangsung aktif menggunakan mata uang yang disepakati antar-negara mitra.</li><li><strong>Opsi C:</strong> Layanan perbankan ritel tetap berjalan efisien menggunakan sistem non-tunai dan mata uang fiat rupiah.</li><li><strong>Opsi D:</strong> Rupiah tetap berdaulat penuh sebagai satu-satunya alat pembayaran yang sah di wilayah yurisdiksi NKRI.</li></ul></div>"
            },
            {
                "id": "s5_q31",
                "theoryKey": "kemandirian_fiskal",
                "theoryTitle": "Kemandirian Fiskal & Kedaulatan APBN Jangka Panjang",
                "scenario": "🏛️ Kedaulatan Fiskal & Kemandirian APBN",
                "question": "Dalam jangka panjang menuju pencapaian target Indonesia Emas 2045, mengapa ketergantungan pembiayaan APBN pada utang neto harus terus ditekan melalui peningkatan Tax Ratio dan penghematan belanja?",
                "options": [
                    "Membangun kedaulatan fiskal yang mandiri, menurunkan beban warisan bunga cicilan utang bagi generasi muda, dan memperkokoh ketahanan dari guncangan pasar keuangan global",
                    "Memastikan bahwa kementerian keuangan tidak lagi memiliki pegawai yang mengawasi realisasi penerimaan pajak",
                    "Mengharuskan kementerian membatasi pembangunan fasilitas puskesmas dan jalan raya pedesaan",
                    "Mewajibkan pemerintah menjual seluruh badan usaha milik negara kepada konsorsium swasta internasional"
                ],
                "correct": 0,
                "hint": "Kemandirian fiskal sejati: membiayai kemajuan bangsa dari hasil penerimaan sendiri tanpa membebani masa depan anak cucu dengan tumpukan utang!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Kemandirian Fiskal</em> adalah esensi kedaulatan pembangunan bangsa. Dengan mendongkrak tax ratio secara adil dan menjalankan belanja efisien (<em>spending better</em>), ketergantungan pada pembiayaan utang menyusut, menghemat pos bunga utang, dan membuka ruang fiskal lebar untuk membiayai masa depan generasi mendatang.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> Aparatur pengawasan perpajakan justru diperkuat dengan analitik data teknologi Core Tax modern.</li><li><strong>Opsi C:</strong> Kemandirian fiskal justru bertujuan melipatgandakan pembangunan sarana kesehatan dan konektivitas pedesaan.</li><li><strong>Opsi D:</strong> BUMN strategis tetap dipertahankan dan diperkuat sebagai agen pencipta nilai dan pembangunan nasional.</li></ul></div>"
            },
            {
                "id": "s5_q32",
                "theoryKey": "resiliensi_rantai_pasok",
                "theoryTitle": "Resiliensi Rantai Pasok Global & Keamanan Industri",
                "scenario": "🌐 Krisis Geopolitik & Rantai Pasok Chip Semikonduktor",
                "question": "Ketegangan geopolitik global kerap memicu disrupsi pasokan komponen berteknologi tinggi (seperti chip semikonduktor). Bagaimanakah strategi mitigasi makroekonomi industri yang harus ditempuh pemerintah?",
                "options": [
                    "Melarang seluruh perakitan produk elektronik dan kendaraan bermotor modern di dalam negeri",
                    "Diversifikasi mitra rantai pasok global (friend-shoring) sembari membangun ekosistem litbang dan industri hilirisasi komponen manufaktur domestik",
                    "Mewajibkan seluruh korporasi teknologi menghentikan penggunaan energi listrik dalam proses perakitan",
                    "Menghapus seluruh perlindungan hukum kekayaan intelektual bagi industri perangkat lunak nasional"
                ],
                "correct": 1,
                "hint": "Membangun ketahanan rantai pasok: jalin kemitraan multi-negara (friend-shoring) dan bangun ekosistem industri komponen di dalam negeri!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Resiliensi rantai pasok (<em>Supply Chain Resilience</em>) menuntut strategi ganda: diversifikasi sumber pemasok global untuk memitigasi risiko geopolitik (<em>near-shoring / friend-shoring</em>) disertai kebijakan industri proaktif untuk menumbuhkan klaster industri komponen dan litbang bernilai tambah tinggi di dalam negeri.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Melarang perakitan manufaktur akan menghancurkan industri teknologi nasional dan memicu PHK massal.</li><li><strong>Opsi C:</strong> Pabrik semikonduktor dan elektronika modern menuntut pasokan energi listrik yang stabil dan berkualitas tinggi.</li><li><strong>Opsi D:</strong> Perlindungan hak cipta dan paten adalah fondasi mutlak untuk menarik investasi industri semikonduktor global.</li></ul></div>"
            },
            {
                "id": "s5_q33",
                "theoryKey": "peran_bumn",
                "theoryTitle": "Peran BUMN sebagai Agen Pembangunan & Stabilisator",
                "scenario": "💼 Peran BUMN sebagai Agen Pembangunan",
                "question": "Badan Usaha Milik Negara (BUMN) di Indonesia mengemban mandat ganda: sebagai entitas pencetak laba komersial sekaligus Agen Pembangunan (Agent of Development). Mengapa peran ganda ini sangat krusial saat menghadapi guncangan krisis?",
                "options": [
                    "BUMN dapat diterjunkan menjadi pionir penggerak investasi perintis, stabilisator pasokan barang pokok, dan penyerap shock saat swasta menahan diri",
                    "BUMN dibebaskan dari seluruh kewajiban audit laporan keuangan dan evaluasi akuntabilitas oleh publik",
                    "BUMN diwajibkan memonopoli seluruh transaksi penjualan warung sembako tradisional di tingkat kelurahan",
                    "BUMN bertugas menggantikan seluruh fungsi perbankan sentral dalam mengumumkan suku bunga acuan pasar uang"
                ],
                "correct": 0,
                "hint": "Saat swasta takut masuk ke proyek perintis atau saat krisis melanda, BUMN hadir sebagai jangkar penopang ekonomi dan pelayan rakyat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Sebagai <em>Agent of Development</em>, BUMN berperan kontrasiklikal saat krisis melanda: membangun infrastruktur perintis yang belum layak komersial bagi swasta, menjaga ketersediaan pasokan energi/pangan bersubsidi (PLN, Pertamina, Bulog), serta menjadi stabilisator ekonomi nasional.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi B:</strong> BUMN diaudit ketat oleh auditor independen dan BPK serta wajib menerapkan prinsip tata kelola GCG.</li><li><strong>Opsi C:</strong> BUMN bersinergi dengan UMKM dan pasar rakyat, bukan mematikan usaha warung sembako tradisional.</li><li><strong>Opsi D:</strong> Kebijakan moneter dan suku bunga acuan tetap merupakan mandat eksklusif Bank Indonesia.</li></ul></div>"
            },
            {
                "id": "s5_q34",
                "theoryKey": "black_swan_resilience",
                "theoryTitle": "Resiliensi Makroekonomi Menghadapi 'Black Swan'",
                "scenario": "🌪️ Resiliensi Makroekonomi Menghadapi 'Black Swan'",
                "question": "Konsep 'Black Swan' merujuk pada peristiwa langka tak terduga yang berdampak dahsyat pada sistem ekonomi global. Apakah definisi sejati dari resiliensi makroekonomi sebuah bangsa dalam menghadapi peristiwa tersebut?",
                "options": [
                    "Kondisi di mana suatu negara dijamin tidak akan pernah terkena dampak guncangan krisis global apa pun",
                    "Kapasitas struktural perekonomian dalam menyerap kejutan guncangan (absorptive capacity), membatasi kerusakan sistemik, dan pulih melesat kembali secara tangguh",
                    "Penutupan total seluruh perbankan komersial swasta agar likuiditas kas negara tidak berpindah tangan",
                    "Kewajiban seluruh warga negara menyerahkan kepemilikan aset tanah pribadinya kepada kas bendahara negara"
                ],
                "correct": 1,
                "hint": "Resiliensi bukan berarti kebal badai tanpa goyang, melainkan memiliki akar fleksibel yang menyerap guncangan dan bangkit tegak kembali dengan cepat!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> <em>Economic Resilience</em> adalah kemampuan sistemik untuk menahan guncangan tak terduga (<em>absorptive capacity</em>), beradaptasi terhadap perubahan lingkungan secara lincah (<em>adaptive capacity</em>), serta pulih dan bertransformasi lebih kuat pasca-krisis (<em>bounce back better</em>) melalui fondasi makro yang sehat.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Di era globalisasi, tidak ada perekonomian terbuka yang sepenuhnya kebal dari transmisi guncangan global.</li><li><strong>Opsi C:</strong> Membekukan sistem perbankan justru mematikan sirkulasi ekonomi dan memperparah kepanikan resesi.</li><li><strong>Opsi D:</strong> Perlindungan hak kepemilikan tanah warga negara dijamin oleh konstitusi dan hukum pertanahan.</li></ul></div>"
            },
            {
                "id": "s5_q35",
                "theoryKey": "middle_income_trap",
                "theoryTitle": "Jebakan Pendapatan Menengah (Middle-Income Trap)",
                "scenario": "👥 Visi Indonesia Emas 2045: Menembus Middle-Income Trap",
                "question": "Indonesia menargetkan meloloskan diri dari Jebakan Pendapatan Menengah (Middle-Income Trap) menuju negara maju berpendapatan tinggi sebelum 2045. Kunci transformasi struktural apakah yang paling menentukan keberhasilan visi ini?",
                "options": [
                    "Mempertahankan ketergantungan murni pada ekspor sumber daya komoditas mentah tanpa pengolahan industri",
                    "Lompatan produktivitas berbasis riset dan inovasi teknologi, peningkatan kualitas modal manusia (SDM), hilirisasi industri bernilai tambah tinggi, dan institusi hukum yang transparan",
                    "Menetapkan tingkat suku bunga perbankan komersial pada batas seratus persen per tahun secara permanen",
                    "Membatasi akses generasi muda dalam mengenyam pendidikan tinggi dan pelatihan keahlian digital global"
                ],
                "correct": 1,
                "hint": "Kunci lolos dari middle-income trap adalah lompatan produktivitas total (TFP): SDM unggul berpendidikan, riset teknologi canggih, dan industri hilir berdaya saing global!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Menembus <em>Middle-Income Trap</em> mensyaratkan pergeseran dari pertumbuhan berbasis akumulasi faktor produksi murah (upah rendah/ekstraksi mentah) menuju pertumbuhan berbasis inovasi dan produktivitas tinggi (<em>Total Factor Productivity</em>), didukung modal manusia unggul, hilirisasi manufaktur maju, dan reformasi institusi hukum yang kredibel.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Ketergantungan pada komoditas mentah adalah jebakan klasik yang mengunci negara pada siklus boom-and-bust berulang.</li><li><strong>Opsi C:</strong> Suku bunga setinggi 100% akan melumpuhkan total kegiatan investasi dunia usaha dan sektor riil.</li><li><strong>Opsi D:</strong> Membatasi akses pendidikan justru menghancurkan akumulasi modal manusia dan memiskinkan masa depan bangsa.</li></ul></div>"
            },
            {
                "id": "s5_q36",
                "theoryKey": "teknokrat_den",
                "theoryTitle": "Kepemimpinan Teknokratik Dewan Ekonomi Nasional",
                "scenario": "👑 Mahakarya Teknokrat Dewan Ekonomi Nasional",
                "question": "Sebagai penutup seluruh petualangan Trivia Quest Makroekonomi, apakah amanah filosofis dan etika tertinggi yang harus dipegang teguh oleh seorang Teknokrat Dewan Ekonomi Nasional bagi masa depan Republik Indonesia?",
                "options": [
                    "Membuat kebijakan makroekonomi semata-mata untuk mengamankan keuntungan finansial pribadi dan kelompok kepentingan jangka pendek",
                    "Memadukan integritas moral, penguasaan sains ekonomi rigor, keberanian mengambil keputusan berbasis bukti (evidence-based), serta dedikasi mutlak bagi kedaulatan, kesejahteraan, dan keadilan sosial seluruh rakyat",
                    "Menyerahkan seluruh keputusan perumusan kebijakan pembangunan nasional kepada lembaga donor multilateral internasional tanpa telaah kritis",
                    "Menghapuskan sistem koordinasi bauran kebijakan moneter dan fiskal demi mendorong ego sektoral masing-masing kementerian"
                ],
                "correct": 1,
                "hint": "Amanah pamungkas seorang teknokrat sejati: integritas ilmu, keberanian berbasis data, dan dedikasi seutuhnya untuk kemakmuran dan keadilan sosial tumpah darah Indonesia!",
                "debrief": "<div class='debrief-why-correct'><strong>✅ Mengapa Benar:</strong> Esensi kepemimpinan teknokratik Dewan Ekonomi Nasional adalah integritas tanpa kompromi, kecakapan analisis ilmiah yang berorientasi data (<em>evidence-based policy</em>), kerendahan hati untuk terus belajar, serta komitmen kebangsaan sejati dalam merajut kebijakan makroekonomi demi sebesar-besar kemakmuran, martabat, dan kedaulatan abadi rakyat Indonesia.</div><div class='debrief-traps-block'><strong class='traps-title'>🔍 Mengapa Opsi Lain Kurang Tepat?</strong><ul><li><strong>Opsi A:</strong> Mengorbankan kepentingan publik demi rente pribadi adalah pengkhianatan etika etis tertinggi bagi seorang pejabat publik.</li><li><strong>Opsi C:</strong> Kebijakan pembangunan harus berdaulat dan kontekstual sesuai kepentingan nasional, bukan penjiplakan buta arahan luar.</li><li><strong>Opsi D:</strong> Ego sektoral adalah musuh utama pembangunan; bauran kebijakan (policy mix) yang harmonis adalah kunci kejayaan bangsa.</li></ul></div>"
            }
        ]
    }
];


/**
 * ==============================================================================
 * MACRO USER MANAGER: USER REGISTRATION, UNIQUE VALIDATION & TRACK RECORD
 * ==============================================================================
 */
/**
 * ==============================================================================
 * MACRO USER MANAGER: USER REGISTRATION, UNIQUE VALIDATION & TRACK RECORD
 * ==============================================================================
 */
class MacroUserManager {
    static REGISTRY_KEY = 'macromaster_user_registry';
    static ACTIVE_USER_KEY = 'macromaster_active_email';

    static getAllUsers() {
        try {
            const raw = localStorage.getItem(this.REGISTRY_KEY);
            if (!raw) return [];
            const data = JSON.parse(raw);
            return Object.values(data).sort((a, b) => new Date(b.lastActive || 0) - new Date(a.lastActive || 0));
        } catch (e) {
            return [];
        }
    }

    static getUserMap() {
        try {
            const raw = localStorage.getItem(this.REGISTRY_KEY);
            if (raw) {
                const map = JSON.parse(raw);
                if (map && Object.keys(map).length > 0) return map;
            }
            // Seed data default agar akun pengguna dan progres tidak pernah hilang
            const seed = {
                "tafal.limited@gmail.com": {
                    "username": "tafals",
                    "usernameLower": "tafals",
                    "email": "tafal.limited@gmail.com",
                    "createdAt": "2026-09-09T07:18:57.266Z",
                    "lastActive": "2026-09-09T08:23:19.651Z",
                    "highestStage": 3,
                    "totalScore": 2300,
                    "progress": {
                        "currentStageId": 3,
                        "currentQuestionIdx": 1,
                        "stageCorrectCount": 2,
                        "score": 2300,
                        "combo": 2,
                        "lives": 5,
                        "stageResetsRemaining": { "1": 3, "2": 3, "3": 3, "4": 3, "5": 3 },
                        "unlockedStageIds": [1, 2, 3],
                        "advanceUnlocked": { "econGames": false, "scenarios": false, "cockpit": false },
                        "isStageComplete": false
                    }
                }
            };
            this.saveUserMap(seed);
            return seed;
        } catch (e) {
            return {};
        }
    }

    static saveUserMap(map) {
        try {
            localStorage.setItem(this.REGISTRY_KEY, JSON.stringify(map));
        } catch (e) {}
    }

    static getActiveEmail() {
        try {
            // Sesi aktif WAJIB menggunakan sessionStorage agar otomatis logout saat browser / tab dimatikan
            return sessionStorage.getItem(this.ACTIVE_USER_KEY) || null;
        } catch (e) {
            return null;
        }
    }

    static getActiveUser() {
        const email = this.getActiveEmail();
        if (!email) return null;
        const map = this.getUserMap();
        return map[email.toLowerCase()] || null;
    }

    static setActiveEmail(email) {
        try {
            if (email) {
                sessionStorage.setItem(this.ACTIVE_USER_KEY, email.toLowerCase());
                // Bersihkan residu lama di localStorage jika pernah ada
                localStorage.removeItem(this.ACTIVE_USER_KEY);
            } else {
                sessionStorage.removeItem(this.ACTIVE_USER_KEY);
                localStorage.removeItem(this.ACTIVE_USER_KEY);
            }
        } catch (e) {}
    }

    static isUsernameTaken(username, excludeEmail = null) {
        if (!username) return false;
        const cleanName = username.trim().toLowerCase();
        const users = this.getAllUsers();
        const excEmail = excludeEmail ? excludeEmail.trim().toLowerCase() : null;

        return users.some(u => {
            if (excEmail && u.email && u.email.toLowerCase() === excEmail) return false;
            const uName = (u.usernameLower || u.username || '').trim().toLowerCase();
            return uName === cleanName;
        });
    }

    static registerOrLogin(username, email) {
        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanName = (username || '').trim();

        if (!cleanName) {
            return { success: false, error: 'empty_username', message: 'Nama user wajib diisi!' };
        }
        if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
            return { success: false, error: 'invalid_email', message: 'Format email tidak valid (contoh: nama@instansi.go.id)!' };
        }

        const map = this.getUserMap();
        const existing = map[cleanEmail];

        const stageNames = {
            1: 'Pasar & Warung',
            2: 'Bank Sentral',
            3: 'Kemenkeu & APBN',
            4: 'Valas & Kurs',
            5: 'Badai Krisis'
        };

        if (existing) {
            // User sudah terdaftar sebelumnya
            const registeredName = (existing.username || '').trim().toLowerCase();
            if (registeredName !== cleanName.toLowerCase()) {
                return {
                    success: false,
                    error: 'username_mismatch',
                    matchedUsername: existing.username,
                    user: existing,
                    message: `Email '${cleanEmail}' sudah terdaftar dengan nama user '${existing.username}'. Silakan gunakan nama user tersebut atau klik tombol masuk langsung.`
                };
            }

            // Valid login
            existing.lastActive = new Date().toISOString();
            map[cleanEmail] = existing;
            this.saveUserMap(map);
            this.setActiveEmail(cleanEmail);

            const prog = existing.progress || {};
            const qIdx = Number(prog.currentQuestionIdx) || 0;
            const stageNum = Number(prog.currentStageId) || 1;
            const isMidLevel = Boolean(qIdx > 0 && qIdx < 6 && !prog.isStageComplete);

            const entryDesc = `Stage ${stageNum}: ${stageNames[stageNum] || 'Stage ' + stageNum} (Soal ${qIdx + 1}/6)`;
            if (typeof MacroActivityLogger !== 'undefined') {
                MacroActivityLogger.setEntryPage(entryDesc);
                MacroActivityLogger.logActivity('LOGIN', `Pemain terdaftar login ke permainan (Stage ${stageNum}, Soal ${qIdx + 1})`);
            }

            return {
                success: true,
                isNew: false,
                hasMidLevelProgress: isMidLevel,
                user: existing
            };
        } else {
            // User baru: Daftarkan ke sistem & sinkronkan ke Google Doc
            if (this.isUsernameTaken(cleanName)) {
                return {
                    success: false,
                    error: 'username_taken',
                    message: `Nama user '${cleanName}' sudah digunakan oleh pemain lain. Mohon tentukan nama user yang unik!`
                };
            }

            const newUser = {
                username: cleanName,
                usernameLower: cleanName.toLowerCase(),
                email: cleanEmail,
                createdAt: new Date().toISOString(),
                lastActive: new Date().toISOString(),
                highestStage: 1,
                totalScore: 0,
                uniqueCorrect: 0,
                uniqueWrong: 0,
                uniqueAccuracy: 0,
                uniqueAnswers: {},
                progress: {
                    currentStageId: 1,
                    currentQuestionIdx: 0,
                    stageCorrectCount: 0,
                    score: 0,
                    combo: 0,
                    lives: 5,
                    stageResetsRemaining: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3, 11: 3 },
                    unlockedStageIds: [1],
                    advanceUnlocked: { econGames: false, scenarios: false, cockpit: false },
                    uniqueAnswers: {},
                    uniqueCorrect: 0,
                    uniqueWrong: 0
                }
            };

            map[cleanEmail] = newUser;
            this.saveUserMap(map);
            this.setActiveEmail(cleanEmail);

            const entryDesc = 'Stage 1: Pasar & Warung (Soal 1/6)';
            if (typeof MacroActivityLogger !== 'undefined') {
                MacroActivityLogger.setEntryPage(entryDesc);
                MacroActivityLogger.logActivity('REGISTER', 'Pendaftaran akun baru pemain ke sistem & Google Doc');
                MacroActivityLogger.logActivity('LOGIN', 'Sesi login perdana pemain baru');
            }

            return {
                success: true,
                isNew: true,
                hasMidLevelProgress: false,
                user: newUser
            };
        }
    }

    static calculateUniqueStats(uniqueAnswers = {}) {
        const keys = Object.keys(uniqueAnswers);
        let correct = 0;
        let wrong = 0;
        keys.forEach(k => {
            if (uniqueAnswers[k] && uniqueAnswers[k].isCorrect) correct++;
            else wrong++;
        });
        const total = correct + wrong;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
        return {
            totalAnswered: total,
            correctCount: correct,
            wrongCount: wrong,
            accuracyPct: accuracy
        };
    }

    static saveProgress(progressData) {
        const email = this.getActiveEmail();
        if (!email) return;
        const map = this.getUserMap();
        const user = map[email.toLowerCase()];
        if (!user) return;

        user.lastActive = new Date().toISOString();
        const stageNum = Number(progressData.currentStageId) || 1;
        user.highestStage = Math.max(user.highestStage || 1, stageNum);
        if (progressData.unlockedStageIds && Array.isArray(progressData.unlockedStageIds)) {
            user.highestStage = Math.max(user.highestStage, ...progressData.unlockedStageIds.map(Number));
        }
        user.totalScore = Number(progressData.score) || user.totalScore || 0;

        if (progressData.uniqueAnswers && typeof progressData.uniqueAnswers === 'object') {
            user.uniqueAnswers = {
                ...(user.uniqueAnswers || {}),
                ...progressData.uniqueAnswers
            };
        }
        const uStats = MacroUserManager.calculateUniqueStats(user.uniqueAnswers || {});
        user.uniqueCorrect = uStats.correctCount;
        user.uniqueWrong = uStats.wrongCount;
        user.uniqueAccuracy = uStats.accuracyPct;

        user.progress = {
            ...(user.progress || {}),
            ...progressData,
            uniqueAnswers: user.uniqueAnswers,
            uniqueCorrect: uStats.correctCount,
            uniqueWrong: uStats.wrongCount,
            uniqueAccuracy: uStats.accuracyPct
        };

        map[email.toLowerCase()] = user;
        this.saveUserMap(map);
    }

    static findUserByEmail(email) {
        if (!email) return null;
        const cleanEmail = email.trim().toLowerCase();
        const map = this.getUserMap();
        return map[cleanEmail] || null;
    }

    static directLogin(email) {
        const user = this.findUserByEmail(email);
        if (!user) {
            return { success: false, message: 'Email belum terdaftar di sistem divetomakro!' };
        }
        user.lastActive = new Date().toISOString();
        const map = this.getUserMap();
        map[email.trim().toLowerCase()] = user;
        this.saveUserMap(map);
        this.setActiveEmail(user.email);

        const prog = user.progress || {};
        const qIdx = Number(prog.currentQuestionIdx) || 0;
        const stageNum = Number(prog.currentStageId) || 1;
        const isMidLevel = Boolean(qIdx > 0 && qIdx < 6 && !prog.isStageComplete);

        if (typeof MacroActivityLogger !== 'undefined') {
            const entryDesc = `Stage ${stageNum} (Soal ${qIdx + 1}/6)`;
            MacroActivityLogger.setEntryPage(entryDesc);
            MacroActivityLogger.logActivity('LOGIN_RECOVERED', `Login pemulihan akun untuk ${user.username} (${user.email})`);
        }

        return {
            success: true,
            isNew: false,
            hasMidLevelProgress: isMidLevel,
            user: user
        };
    }

    static requestPasswordReset(email) {
        const cleanEmail = (email || '').trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
            return { success: false, error: 'invalid_email', message: 'Format alamat email tidak valid!' };
        }

        const user = this.findUserByEmail(cleanEmail);
        if (!user) {
            const allUsers = this.getAllUsers();
            return {
                success: false,
                error: 'not_found',
                message: `Email '${cleanEmail}' belum terdaftar di permainan ini.`,
                registeredUsers: allUsers.map(u => ({ username: u.username, email: u.email }))
            };
        }

        const stageNames = {
            1: 'Pasar & Warung',
            2: 'Bank Sentral',
            3: 'Kemenkeu & APBN',
            4: 'Valas & Kurs',
            5: 'Badai Krisis'
        };
        const currentStage = user.progress ? (user.progress.currentStageId || 1) : 1;
        const currentQ = user.progress ? ((user.progress.currentQuestionIdx || 0) + 1) : 1;
        const score = user.progress ? (user.progress.score || user.totalScore || 0) : (user.totalScore || 0);

        const subject = `[divetomakro] Pemulihan Akses Akun & Detail Login (${user.username})`;
        const body = `Halo ${user.username},\n\n` +
            `Berikut adalah informasi pemulihan akun permainan divetomakro Anda:\n\n` +
            `• Nama User / Username : ${user.username}\n` +
            `• Alamat Email          : ${user.email}\n` +
            `• Level / Stage         : Level ${currentStage} (${stageNames[currentStage] || 'Stage ' + currentStage})\n` +
            `• Soal Terakhir         : Soal ke-${currentQ} dari 6\n` +
            `• Total Skor (XP)       : ${score} XP\n\n` +
            `Catatan: Sistem divetomakro menggunakan verifikasi tanpa password rumit. Anda cukup memasukkan Nama User dan Email di atas pada form login web untuk langsung melanjutkan permainan!\n\n` +
            `Tautan Web Permainan:\n` +
            `http://localhost:8000/macro_game.html\n\n` +
            `Salam hormat,\n` +
            `Tim Teknokrat divetomakro`;

        const mailtoUrl = `mailto:${encodeURIComponent(user.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        if (typeof MacroActivityLogger !== 'undefined') {
            MacroActivityLogger.logActivity('RESET_PASSWORD_REQUEST', `Permintaan pemulihan akun & kredensial untuk ${user.username} (${user.email})`);
        }

        return {
            success: true,
            user: user,
            mailtoUrl: mailtoUrl,
            subject: subject,
            body: body,
            message: `Detail akun untuk '${user.username}' (${user.email}) berhasil ditemukan!`
        };
    }

    static logout(reason = 'LOGOUT_MANUAL', customExitPage = null) {
        if (typeof MacroActivityLogger !== 'undefined') {
            const exitDesc = customExitPage || MacroActivityLogger.getCurrentPage();
            MacroActivityLogger.logActivity(reason, 'User keluar dari sesi permainan', exitDesc);
        }
        this.setActiveEmail(null);
        try {
            sessionStorage.removeItem('macromaster_current_session_id');
            sessionStorage.removeItem('macromaster_session_start_time');
            sessionStorage.removeItem('macromaster_entry_page');
            sessionStorage.removeItem('macromaster_current_page');
        } catch (e) {}
    }
}


/**
 * ==============================================================================
 * MACRO ACTIVITY LOGGER: 11-PARAMETER USER LOGS & GOOGLE SHEETS SYNC
 * ==============================================================================
 */
class MacroActivityLogger {
    static LOGS_KEY = 'macromaster_activity_logs';
    static WEBHOOK_KEY = 'macromaster_webhook_url';
    static SESSION_ID_KEY = 'macromaster_current_session_id';
    static SESSION_START_KEY = 'macromaster_session_start_time';
    static ENTRY_PAGE_KEY = 'macromaster_entry_page';
    static CURRENT_PAGE_KEY = 'macromaster_current_page';

    static getWebhookUrl() {
        try {
            return localStorage.getItem(this.WEBHOOK_KEY) || '';
        } catch (e) {
            return '';
        }
    }

    static setWebhookUrl(url) {
        try {
            if (url) {
                localStorage.setItem(this.WEBHOOK_KEY, url.trim());
            } else {
                localStorage.removeItem(this.WEBHOOK_KEY);
            }
        } catch (e) {}
    }

    static getOrCreateSessionId(username) {
        try {
            let sessId = sessionStorage.getItem(this.SESSION_ID_KEY);
            if (!sessId) {
                const prefix = (username || 'user').replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10);
                sessId = `SESS_${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
                sessionStorage.setItem(this.SESSION_ID_KEY, sessId);
                sessionStorage.setItem(this.SESSION_START_KEY, String(Date.now()));
            }
            return sessId;
        } catch (e) {
            return `SESS_${Date.now()}`;
        }
    }

    static getSessionDuration() {
        try {
            const start = Number(sessionStorage.getItem(this.SESSION_START_KEY)) || Date.now();
            const diffSec = Math.max(0, Math.floor((Date.now() - start) / 1000));
            const mins = Math.floor(diffSec / 60);
            const secs = diffSec % 60;
            return `${mins}m ${secs}s`;
        } catch (e) {
            return '0m 0s';
        }
    }

    static setEntryPage(pageDesc) {
        try {
            sessionStorage.setItem(this.ENTRY_PAGE_KEY, pageDesc || 'Halaman Utama');
            this.setCurrentPage(pageDesc);
        } catch (e) {}
    }

    static getEntryPage() {
        try {
            return sessionStorage.getItem(this.ENTRY_PAGE_KEY) || 'Halaman Utama';
        } catch (e) {
            return 'Halaman Utama';
        }
    }

    static setCurrentPage(pageDesc) {
        try {
            sessionStorage.setItem(this.CURRENT_PAGE_KEY, pageDesc || 'Halaman Utama');
        } catch (e) {}
    }

    static updateCurrentPage(pageDesc) {
        this.setCurrentPage(pageDesc);
    }

    static getCurrentPage() {
        try {
            return sessionStorage.getItem(this.CURRENT_PAGE_KEY) || this.getEntryPage();
        } catch (e) {
            return 'Halaman Utama';
        }
    }

    static getFormattedWIB(date = new Date()) {
        try {
            // Format WIB (Asia/Jakarta, UTC+7): YYYY-MM-DD HH:mm:ss
            const options = {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const parts = new Intl.DateTimeFormat('id-ID', options).formatToParts(date);
            const p = {};
            parts.forEach(({ type, value }) => { p[type] = value; });
            return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
        } catch (e) {
            return new Date().toISOString();
        }
    }

    static getAllLogs() {
        try {
            const raw = localStorage.getItem(this.LOGS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    static saveLogs(logs) {
        try {
            // Simpan maksimal 1500 log terakhir di storage lokal
            const trimmed = (logs || []).slice(-1500);
            localStorage.setItem(this.LOGS_KEY, JSON.stringify(trimmed));
        } catch (e) {}
    }

    /**
     * Merekam aktivitas user ke bagan detail log (11 Kolom)
     */
    static logActivity(activityType, details = '', customExitPage = null) {
        const user = (typeof MacroUserManager !== 'undefined') ? MacroUserManager.getActiveUser() : null;
        const username = user ? user.username : 'Pemain Belum Login';
        const email = user ? user.email : '-';
        const sessId = this.getOrCreateSessionId(username);
        const timestamp = this.getFormattedWIB();
        const entryPage = this.getEntryPage();
        const exitPage = customExitPage || this.getCurrentPage();
        const duration = this.getSessionDuration();

        let lastQuestion = '-';
        let scoreXp = '-';
        let highestStage = user ? (user.highestStage || 1) : 1;

        if (typeof window !== 'undefined' && window.macroTriviaEngine) {
            const engine = window.macroTriviaEngine;
            const curStage = engine.getCurrentStage ? engine.getCurrentStage() : null;
            const stageNum = engine.currentStageId || 1;
            const qIdx = (engine.currentQuestionIdx || 0) + 1;
            const totalQ = (curStage && curStage.questions) ? curStage.questions.length : 6;
            const uStats = engine.getUniqueStats ? engine.getUniqueStats() : { correctCount: 0, wrongCount: 0 };
            lastQuestion = `Level ${stageNum} - Soal ${qIdx}/${totalQ} (Benar Unik: ${uStats.correctCount})`;
            scoreXp = `${engine.score || 0} XP`;
        } else if (user && user.progress) {
            lastQuestion = `Stage ${user.progress.currentStageId || 1} - Soal ${(user.progress.currentQuestionIdx || 0) + 1}/6`;
            scoreXp = `${user.progress.score || user.totalScore || 0} XP`;
        }

        const logRecord = {
            timestamp: timestamp,
            sessionId: sessId,
            username: username,
            email: email,
            activityType: activityType,
            entryPage: entryPage,
            exitPage: exitPage,
            lastQuestion: lastQuestion,
            scoreXp: scoreXp,
            sessionDuration: duration,
            details: details || '-',
            highestStage: highestStage,
            syncedToSheets: false
        };

        const logs = this.getAllLogs();
        logs.push(logRecord);
        this.saveLogs(logs);

        // Kirim otomatis ke Google Sheets jika Webhook telah diatur
        this.sendRecordToWebhook(logRecord);

        return logRecord;
    }

    static sendRecordToWebhook(record) {
        const webhookUrl = this.getWebhookUrl();
        if (!webhookUrl || !webhookUrl.startsWith('http')) return;

        try {
            // Jika browser sedang ditutup / unload, gunakan sendBeacon untuk keandalan maksimal
            if (typeof navigator !== 'undefined' && navigator.sendBeacon && 
                (record.activityType === 'BROWSER_CLOSED' || record.activityType === 'LOGOUT_MANUAL' || record.activityType === 'IDLE_TIMEOUT')) {
                const blob = new Blob([JSON.stringify(record)], { type: 'application/json' });
                navigator.sendBeacon(webhookUrl, blob);
                record.syncedToSheets = true;
                return;
            }

            if (typeof fetch !== 'undefined') {
                fetch(webhookUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(record)
                }).then(() => {
                    record.syncedToSheets = true;
                }).catch(err => {
                    console.warn('Gagal sinkronisasi otomatis ke Google Sheets:', err);
                });
            }
        } catch (e) {
            console.warn('Dispatch webhook log error:', e);
        }
    }

    static async syncAllPendingLogs() {
        const webhookUrl = this.getWebhookUrl();
        if (!webhookUrl || !webhookUrl.startsWith('http')) {
            return { success: false, message: 'URL Webhook Google Apps Script belum diatur!' };
        }
        const logs = this.getAllLogs();
        if (!logs || logs.length === 0) {
            return { success: true, count: 0, message: 'Belum ada log aktivitas untuk disinkronkan.' };
        }

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    records: logs
                })
            });

            logs.forEach(l => l.syncedToSheets = true);
            this.saveLogs(logs);

            return {
                success: true,
                count: logs.length,
                message: `Berhasil menyinkronkan ${logs.length} baris data aktivitas ke Google Sheets!`
            };
        } catch (e) {
            return { success: false, error: e.toString(), message: 'Gagal mengirim ke Google Sheets: ' + e.message };
        }
    }

    static exportLogsToCsv() {
        const logs = this.getAllLogs();
        if (!logs || logs.length === 0) {
            alert('Belum ada log aktivitas untuk diunduh.');
            return;
        }

        const headers = [
            'Timestamp (WIB)',
            'Session ID',
            'Username',
            'Email',
            'Activity Type',
            'Entry Page / Level',
            'Exit Page / Level',
            'Last Question',
            'Score / XP',
            'Session Duration',
            'Details'
        ];

        const escapeCsv = (str) => {
            const clean = String(str || '').replace(/"/g, '""');
            return `"${clean}"`;
        };

        const rows = [headers.join(',')];
        logs.forEach(l => {
            rows.push([
                escapeCsv(l.timestamp),
                escapeCsv(l.sessionId),
                escapeCsv(l.username),
                escapeCsv(l.email),
                escapeCsv(l.activityType),
                escapeCsv(l.entryPage),
                escapeCsv(l.exitPage),
                escapeCsv(l.lastQuestion),
                escapeCsv(l.scoreXp),
                escapeCsv(l.sessionDuration),
                escapeCsv(l.details)
            ].join(','));
        });

        const csvContent = '\uFEFF' + rows.join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `divetomakro_activity_logs_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}


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
        this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3, 11: 3 };

        this.unlockedStageIds = [1];
        this.advanceUnlocked = {
            econGames: false,
            scenarios: false,
            cockpit: false
        };
        this.uniqueAnswers = {};

        this.loadProgress();
        // Start active 6-question session from the pool for current level
        this.startSessionQuestions(this.getCurrentStage());
    }

    startSessionQuestions(stage) {
        if (!stage) return;
        const pool = stage.questionPool || stage.questions || [];
        const unique = this.uniqueAnswers || {};

        // Separate pool into questions not yet mastered (not answered correctly) vs mastered
        const unmastered = [];
        const mastered = [];
        pool.forEach(q => {
            const qId = q.id || `s${stage.id}_${q.scenario}`;
            if (unique[qId] && unique[qId].isCorrect) {
                mastered.push(q);
            } else {
                unmastered.push(q);
            }
        });

        const shuffle = (arr) => {
            const copy = [...arr];
            for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [copy[i], copy[j]] = [copy[j], copy[i]];
            }
            return copy;
        };

        const shuffledUnmastered = shuffle(unmastered);
        const shuffledMastered = shuffle(mastered);

        // Pick unmastered questions first, then fill up to 6 from mastered if needed
        const chosen = [...shuffledUnmastered];
        if (chosen.length < 6) {
            chosen.push(...shuffledMastered.slice(0, 6 - chosen.length));
        }

        stage.questions = chosen.slice(0, 6).map(q => ({ ...q }));
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

    getUniqueStats() {
        const answers = this.uniqueAnswers || {};
        const keys = Object.keys(answers);
        let correct = 0;
        let wrong = 0;
        keys.forEach(k => {
            if (answers[k] && answers[k].isCorrect) correct++;
            else wrong++;
        });
        const total = correct + wrong;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
        return {
            totalAnswered: total,
            correctCount: correct,
            wrongCount: wrong,
            accuracyPct: accuracy
        };
    }

    loadProgress() {
        try {
            const activeUser = (typeof MacroUserManager !== 'undefined') ? MacroUserManager.getActiveUser() : null;
            let data = null;
            if (activeUser && activeUser.progress) {
                data = activeUser.progress;
            } else {
                const saved = localStorage.getItem('macromaster_trivia_progress');
                if (saved) data = JSON.parse(saved);
            }

            if (data) {
                this.score = Number(data.score) || 0;
                this.unlockedStageIds = (data.unlockedStageIds || [1]).map(Number);
                this.advanceUnlocked = data.advanceUnlocked || { econGames: false, scenarios: false, cockpit: false };
                this.currentStageId = Number(data.currentStageId) || 1;
                this.currentQuestionIdx = Number(data.currentQuestionIdx) || 0;
                this.stageCorrectCount = Number(data.stageCorrectCount) || 0;
                this.lives = (typeof data.lives === 'number') ? data.lives : 5;
                this.combo = Number(data.combo) || 0;
                if (data.stageResetsRemaining && typeof data.stageResetsRemaining === 'object') {
                    this.stageResetsRemaining = { ...this.stageResetsRemaining, ...data.stageResetsRemaining };
                }
                this.uniqueAnswers = (data.uniqueAnswers && typeof data.uniqueAnswers === 'object') ? data.uniqueAnswers : {};
                
                // Restore session questions if available
                if (data.sessionQuestions && Array.isArray(data.sessionQuestions) && data.sessionQuestions.length > 0) {
                    const stage = this.getCurrentStage();
                    if (stage) {
                        stage.questions = data.sessionQuestions;
                    }
                }
            } else {
                this.uniqueAnswers = {};
            }
        } catch (e) {
            this.uniqueAnswers = {};
        }
        this.unlockedStageIds = Array.from(new Set((this.unlockedStageIds || [1]).map(Number)));
        if (!this.unlockedStageIds.includes(1)) this.unlockedStageIds.unshift(1);
    }

    saveProgress() {
        try {
            const stage = this.getCurrentStage();
            const sessionQs = (stage && stage.questions) ? stage.questions.map(q => ({
                id: q.id,
                question: q.question,
                options: q._shuffledOptions || q.options,
                correct: q._shuffledCorrect !== undefined ? q._shuffledCorrect : q.correct,
                scenario: q.scenario,
                debrief: q.debrief,
                theoryKey: q.theoryKey,
                theoryTitle: q.theoryTitle,
                isAnswered: Boolean(q.isAnswered),
                userAnswer: q.userAnswer !== undefined ? q.userAnswer : null,
                isCorrect: q.isCorrect !== undefined ? q.isCorrect : null
            })) : [];

            const uStats = this.getUniqueStats();

            const data = {
                score: this.score,
                unlockedStageIds: Array.from(new Set(this.unlockedStageIds.map(Number))),
                advanceUnlocked: this.advanceUnlocked,
                currentStageId: Number(this.currentStageId),
                currentQuestionIdx: Number(this.currentQuestionIdx),
                stageCorrectCount: Number(this.stageCorrectCount),
                lives: Number(this.lives),
                combo: Number(this.combo),
                stageResetsRemaining: this.stageResetsRemaining,
                isStageComplete: this.isStageComplete(),
                uniqueAnswers: this.uniqueAnswers || {},
                uniqueCorrect: uStats.correctCount,
                uniqueWrong: uStats.wrongCount,
                uniqueAccuracy: uStats.accuracyPct,
                sessionQuestions: sessionQs
            };
            if (typeof MacroUserManager !== 'undefined') {
                MacroUserManager.saveProgress(data);
            }
            localStorage.setItem('macromaster_trivia_progress', JSON.stringify(data));
        } catch (e) {}
    }

    loadActiveUserSession(resumeChoice = 'continue') {
        this.loadProgress();
        const stage = this.getCurrentStage();
        if (resumeChoice === 'restart') {
            this.restartStage();
        } else {
            // Lanjutkan soal yang tersimpan
            if (!stage.questions || stage.questions.length === 0) {
                this.startSessionQuestions(stage);
            }
            this.isAnswered = false;
        }
        this.saveProgress();
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
        const qId = q.id || `s${this.currentStageId}_q${this.currentQuestionIdx + 1}`;
        const isCorrect = (Number(chosenIdx) === Number(q.correct));

        if (!this.uniqueAnswers) this.uniqueAnswers = {};
        const prevAnswer = this.uniqueAnswers[qId];
        const wasAlreadyAnswered = Boolean(prevAnswer);
        const wasAlreadyCorrect = wasAlreadyAnswered && Boolean(prevAnswer.isCorrect);

        let isDuplicate = false;
        let isNewUniqueCorrect = false;
        let isNewUniqueWrong = false;

        if (isCorrect) {
            this.stageCorrectCount = (Number(this.stageCorrectCount) || 0) + 1;
            this.combo = (this.combo || 0) + 1;
            if (this.combo > (this.maxCombo || 0)) this.maxCombo = this.combo;

            if (!wasAlreadyCorrect) {
                // Jawaban Benar Baru / Unik! Tambahkan poin XP
                isNewUniqueCorrect = true;
                const points = 100 + (this.combo * 20);
                this.score = (this.score || 0) + points;
            } else {
                // Soal ini sudah pernah dijawab benar pada sesi/kunjungan sebelumnya.
                // JANGAN hitung dobel ke skor XP atau ke total jawaban benar unik!
                isDuplicate = true;
            }

            this.uniqueAnswers[qId] = {
                id: qId,
                stageId: Number(this.currentStageId),
                isCorrect: true,
                chosenIdx: chosenIdx,
                answeredAt: new Date().toISOString(),
                attempts: (prevAnswer ? (prevAnswer.attempts || 1) : 0) + 1
            };
        } else {
            // Jawaban salah
            if (this.shieldActive) {
                this.shieldActive = false;
            } else {
                this.lives = Math.max(0, (this.lives || 5) - 1);
                this.combo = 0;
            }

            if (!wasAlreadyAnswered) {
                isNewUniqueWrong = true;
            } else {
                isDuplicate = true;
            }

            if (!wasAlreadyCorrect) {
                this.uniqueAnswers[qId] = {
                    id: qId,
                    stageId: Number(this.currentStageId),
                    isCorrect: false,
                    chosenIdx: chosenIdx,
                    answeredAt: new Date().toISOString(),
                    attempts: (prevAnswer ? (prevAnswer.attempts || 1) : 0) + 1
                };
            } else {
                // Pernah benar sebelumnya, namun terpleset di sesi pengulangan ini
                this.uniqueAnswers[qId].attempts = (this.uniqueAnswers[qId].attempts || 1) + 1;
            }
        }

        q.isAnswered = true;
        q.userAnswer = chosenIdx;
        q.isCorrect = isCorrect;

        const stage = this.getCurrentStage();
        const totalQ = (stage && stage.questions) ? stage.questions.length : 6;
        const isStageFinished = this.isStageComplete();
        const currentCorrect = Number(this.stageCorrectCount) || 0;
        const stageScorePct = Math.round((currentCorrect / totalQ) * 100);

        const isPassed = isStageFinished && (stageScorePct >= 80) && (this.lives > 0);
        if (isPassed) {
            this.handleStageCompletion();
        }

        this.saveProgress();

        const uStats = this.getUniqueStats();

        if (typeof MacroActivityLogger !== 'undefined') {
            const stageNum = this.currentStageId || 1;
            const qNum = this.currentQuestionIdx + 1;
            const stageTitle = stage ? stage.title : `Level ${stageNum}`;
            MacroActivityLogger.updateCurrentPage(`Stage ${stageNum}: ${stageTitle} (Soal ${qNum}/${totalQ})`);

            let logNote = '';
            if (isCorrect) {
                logNote = isDuplicate 
                    ? `Soal ${qNum}/${totalQ} (${qId}): Benar [Duplikat Sesi - Nilai Unik Dipertahankan]` 
                    : `Soal ${qNum}/${totalQ} (${qId}): Benar (+XP) [Unik Benar ke-${uStats.correctCount}]`;
            } else {
                logNote = isDuplicate 
                    ? `Soal ${qNum}/${totalQ} (${qId}): Salah [Duplikat Sesi] (Sisa nyawa: ${this.lives})` 
                    : `Soal ${qNum}/${totalQ} (${qId}): Salah [Unik Salah ke-${uStats.wrongCount}] (Sisa nyawa: ${this.lives})`;
            }

            MacroActivityLogger.logActivity('ANSWER_QUESTION', logNote);
        }

        return {
            isCorrect: isCorrect,
            isDuplicate: isDuplicate,
            isNewUniqueCorrect: isNewUniqueCorrect,
            isNewUniqueWrong: isNewUniqueWrong,
            uniqueCorrectTotal: uStats.correctCount,
            uniqueWrongTotal: uStats.wrongCount,
            uniqueTotalAnswered: uStats.totalAnswered,
            uniqueAccuracyPct: uStats.accuracyPct,
            correctIdx: q.correct,
            chosenIdx: chosenIdx,
            debrief: q.debrief,
            theoryKey: q.theoryKey,
            theoryTitle: q.theoryTitle,
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
        const uStats = this.getUniqueStats();
        return {
            stageId: curId,
            stageTitle: stage.title,
            correctCount: correct,
            totalQuestions: totalQ,
            scorePct: pct,
            isPassed: isPassed,
            nextStageId: nextStageId,
            nextStageTitle: nextStage ? nextStage.title : null,
            isAllStagesCompleted: (curId === this.stages.length) && isPassed,
            uniqueCorrectTotal: uStats.correctCount,
            uniqueWrongTotal: uStats.wrongCount,
            uniqueTotalAnswered: uStats.totalAnswered,
            uniqueAccuracyPct: uStats.accuracyPct
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
            if (!this.stageResetsRemaining) this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3, 11: 3 };
            this.stageResetsRemaining[nextStageId] = 3;
        }

        // Unlocks for Level 12: Lab Mekanisme Pasar
        if (curId >= 11) {
            this.advanceUnlocked.econGames = true;
            if (!this.unlockedStageIds.map(Number).includes(12)) {
                this.unlockedStageIds.push(12);
            }
        }

        this.saveProgress();

        if (typeof MacroActivityLogger !== 'undefined') {
            MacroActivityLogger.logActivity(
                'STAGE_PASS',
                `🎉 LULUS STAGE ${curId}! Membuka akses ke Stage ${nextStageId}.`
            );
        }
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
            if (!this.stageResetsRemaining) this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3, 11: 3 };
            this.stageResetsRemaining[curId] = newRemaining;
            this.restartStage();
            this.saveProgress();
            if (typeof MacroActivityLogger !== 'undefined') {
                MacroActivityLogger.logActivity('STAGE_RESET', `Reset Stage ${curId} (Sisa kesempatan: ${newRemaining}x)`);
            }
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
                if (!this.stageResetsRemaining) this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3, 11: 3 };
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
                if (!this.stageResetsRemaining) this.stageResetsRemaining = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3, 11: 3 };
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
        this.unlockedStageIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
    window.MacroUserManager = MacroUserManager;
    window.MacroActivityLogger = MacroActivityLogger;
    window.macroTriviaEngine = new MacroTriviaEngine();
}
