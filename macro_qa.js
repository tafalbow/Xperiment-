/**
 * ==============================================================================
 * MACROMASTER DEN - INTERACTIVE Q&A & AI TUTOR ENGINE (macro_qa.js)
 * Fitur: Asisten Cerdas Tanya Jawab Teori, Analogi Bisnis & Kebijakan Makro.
 * ==============================================================================
 */

class MacroQAEngine {
    constructor() {
        // 1. Anti-Cheat: HANYA mendeteksi permintaan eksplisit bocoran kunci kuis/ujian
        this.antiCheatPatterns = [
            /kunci\s+(jawaban|soal|kuis|ujian|uts|uas)/i,
            /bocoran\s+(kunci|jawaban|soal|kuis)/i,
            /apakah\s+(opsi|pilihan|jawabannya)\s+[a-d]\b/i,
            /pilih\s+(opsi|pilihan)?\s*[a-d]\b/i,
            /(jawaban|kunci)\s+nomor\s+\d+/i,
            /(jawaban|kunci)\s+no\s+\d+/i,
            /kasih\s+tahu\s+jawaban\s+(kuis|ujian|soal)/i,
            /bocorin\s+jawaban/i
        ];

        // 2. Knowledge Base Komprehensif: Menjawab Langsung & Konseptual
        this.knowledgeBase = [
            {
                id: "ad_mendingin_inflasi",
                title: "Mengapa Permintaan Agregat yang Mendingin Menjinakkan Inflasi?",
                keywords: ["mendingin", "permintaan agregat mendingin", "menjinakkan inflasi", "perlambatan belanja", "menekan produsen", "ad mendingin"],
                answer: `<strong>💡 Mengapa Permintaan Agregat yang Mendingin Berhasil Menjinakkan Inflasi?</strong><br><br>
Mekanisme ekonominya bekerja melalui interaksi pasar barang dan penyesuaian harga oleh produsen:<br>
1. <strong>Pengetatan Likuiditas (Suku Bunga Naik):</strong> Saat Bank Indonesia menaikkan BI-Rate, bunga pinjaman bank menjadi mahal dan bunga tabungan menjadi menarik. Masyarakat cenderung menahan belanja konsumsi konsumtif dan perusahaan menunda proyek ekspansi.<br>
2. <strong>Belanja Agregat (AD) Melambat:</strong> Akibatnya, total pesanan pembelian barang dan jasa di tingkat nasional berkurang atau 'mendingin' ($AD < Y^*$).<br>
3. <strong>Stok Menumpuk di Gudang Produsen:</strong> Pabrik, distributor, dan toko mendapati barang dagangannya tidak laku secepat biasanya jika mereka mematok harga mahal.<br>
4. <strong>Produsen Menahan Kenaikan Harga (Bahkan Memberi Diskon):</strong> Demi menghabiskan stok dan menjaga arus kas (cash flow), produsen terpaksa menahan diri untuk tidak menaikkan harga jual produk, atau bahkan memberikan potongan harga promosi.<br>
5. <strong>Hasil Akhir:</strong> Kenaikan harga-harga barang kebutuhan pokok secara umum melambat, sehingga <strong>laju inflasi berhasil dijinakkan kembali ke target stabil (misal 2,5% ± 1%)</strong>.<br><br>
💼 <em>Kacamata Manajer Bisnis:</em> Dalam fase ini, manajer penjualan tidak bisa sembarangan menaikkan harga produk (*pricing power* menurun). Fokus bisnis beralih ke efisiensi biaya operasional dan mempertahankan pelanggan setia.`
            },
            {
                id: "kurs_tertopang_capital_inflow",
                title: "Mengapa Kenaikan Suku Bunga Menopang Kurs Rupiah (Capital Inflow)?",
                keywords: ["kurs rupiah tertopang", "tertopang", "capital inflow", "selisih bunga", "interest rate differential", "modal asing", "obligasi negara", "aliran modal"],
                answer: `<strong>💵 Mengapa Kurs Rupiah Tertopang saat Suku Bunga Acuan Naik?</strong><br><br>
Fenomena ini berakar pada pergerakan modal keuangan global (<em>global capital flow</em>):<br>
1. <strong>Investor Global Memburu Imbal Hasil (Yield):</strong> Para manajer investasi dan dana pensiun global selalu mencari negara yang menawarkan suku bunga riil paling menarik dengan risiko terukur.<br>
2. <strong>Pelebaran Selisih Suku Bunga (Spread):</strong> Ketika Bank Indonesia menaikkan BI-Rate, imbal hasil Surat Berharga Negara (SBN / obligasi pemerintah Indonesia) ikut terkerek naik. Selisih bunga (*interest rate differential*) antara Indonesia dengan suku bunga The Fed AS menjadi lebih lebar dan menggiurkan.<br>
3. <strong>Aliran Modal Asing Masuk (Capital Inflow):</strong> Investor luar negeri berbondong-bondong membawa mata uang Dolar AS (USD) mereka masuk ke pasar finansial Indonesia untuk memborong obligasi SBN berimbal hasil tinggi.<br>
4. <strong>Permintaan Mata Uang Rupiah Melonjak:</strong> Untuk bisa membeli obligasi SBN di bursa Indonesia, investor asing harus <em>menukarkan Dolar mereka menjadi Rupiah</em> di pasar valuta asing.<br>
5. <strong>Hasil Akhir:</strong> Lonjakan permintaan terhadap Rupiah menahan pelemahan nilai tukar dan <strong>menopang kurs Rupiah agar tetap kokoh dan stabil</strong> terhadap Dolar AS.<br><br>
💡 <em>Catatan Lapangan:</em> Mekanisme ini adalah pilar utama pertahanan moneter Bank Indonesia saat menghadapi guncangan global (kebijakan *pro-market interest rate*).`
            },
            {
                id: "transmisi_moneter_lengkap",
                title: "Bagaimana Jalur Lengkap Transmisi Kebijakan Moneter BI-Rate?",
                keywords: ["transmisi", "jalur transmisi", "transmisi moneter", "cara kerja bi-rate", "kenaikan bi-rate", "mekanisme moneter"],
                answer: `<strong>🏛️ 5 Tahapan Mekanisme Transmisi Suku Bunga BI-Rate:</strong><br><br>
Ketika Rapat Dewan Gubernur (RDG) Bank Indonesia memutuskan mengubah suku bunga acuan, dampaknya merambat ke ekonomi riil melalui 5 tahap berantai:<br>
1. <strong>Tahap 1: Sektor Perbankan (Kuartal 1):</strong> Bunga pasar uang antarbank (PUAB) dan bunga deposito naik seketika, diikuti kenaikan suku bunga kredit pinjaman bank umum.<br>
2. <strong>Tahap 2: Sektor Finansial & Valas (Kuartal 1-2):</strong> Selisih bunga menarik modal asing masuk (*capital inflow*), sehingga depresiasi kurs Rupiah tertahan dan harga obligasi menyesuaikan.<br>
3. <strong>Tahap 3: Keputusan Dunia Usaha & Rumah Tangga (Kuartal 2-3):</strong> Bunga kredit yang mahal membuat pengusaha menunda pinjaman modal kerja / ekspansi pabrik (Investasi $I$ melambat). Masyarakat memilih menabung di deposito (Konsumsi $C$ melandai).<br>
4. <strong>Tahap 4: Permintaan Agregat (AD) Mendingin (Kuartal 3-4):</strong> Belanja total masyarakat melandai, menekan produsen agar tidak menaikkan harga barang.<br>
5. <strong>Tahap 5: Inflasi Jinak & Stabil (Kuartal 4 ke atas):</strong> Target inflasi tercapai, daya beli masyarakat jangka panjang terlindungi.<br><br>
⏳ <em>Lag Waktu (Time Lag):</em> Kebijakan suku bunga membutuhkan waktu <strong>6 hingga 18 bulan</strong> untuk berdampak penuh ke sektor riil.`
            },
            {
                id: "mikro_vs_makro",
                title: "Perbedaan Mikroekonomi vs Makroekonomi untuk Manajer Bisnis",
                keywords: ["mikro", "makro", "beda mikro", "perbedaan mikro", "manajemen", "perusahaan vs negara", "omzet"],
                answer: `<strong>💼 Sudut Pandang Manajer: Membedakan Mikroekonomi vs Makroekonomi</strong><br><br>
Dalam mengelola bisnis dan organisasi, manajer harus membedakan mana faktor internal dan mana faktor eksternal:<br>
1. <strong>Mikroekonomi (Kendali Internal Perusahaan):</strong><br>
   - Menentukan harga jual produk per unit (Pricing Strategy).<br>
   - Menghemat biaya bahan baku dan operasional toko (Cost of Goods Sold).<br>
   - Menetapkan gaji karyawan dan struktur kompensasi tim.<br>
   - Membeli mesin pabrik baru untuk menambah kapasitas produksi sendiri.<br>
   - <em>Sasaran:</em> Efisiensi internal, kepuasan konsumen, dan laba perusahaan.<br><br>
2. <strong>Makroekonomi (Iklim Eksternal / Lingkungan PESTEL):</strong><br>
   - Suku Bunga Acuan (BI-Rate): Biaya bunga pinjaman modal kerja seluruh bank.<br>
   - Inflasi Nasional: Kenaikan harga barang pokok dan tuntutan kenaikan UMR buruh.<br>
   - PDB (Produk Domestik Bruto): Total daya beli seluruh masyarakat di pasar.<br>
   - Nilai Tukar (Kurs USD/IDR): Biaya impor bahan baku dan daya saing ekspor.<br>
   - <em>Sasaran:</em> Stabilitas harga, penciptaan lapangan kerja, dan pertumbuhan nasional.<br><br>
💡 <em>Analogi Sederhana:</em> Mikroekonomi adalah keahlian mengemudikan perahu bisnis Anda, sedangkan Makroekonomi adalah arus laut, cuaca, dan ombak yang menentukan apakah perahu Anda bisa berlayar lancar atau karam.`
            },
            {
                id: "kenapa_tidak_cetak_uang",
                title: "Mengapa Negara Tidak Mencetak Uang Sebanyak-banyaknya untuk Bayar Utang / Bagi-Bagi Rakyat?",
                keywords: ["cetak uang", "mencetak uang", "kenapa tidak cetak", "uang banyak", "bagi-bagi uang", "bayar utang cetak"],
                answer: `<strong>💸 Mengapa Negara Dilarang Mencetak Uang Tanpa Kendali?</strong><br><br>
Pertanyaan klasik yang sangat logis! Jawabannya terletak pada hakikat nilai uang:<br>
1. <strong>Uang Adalah Alat Tukar, Bukan Kekayaan Fisik Riil:</strong> Kekayaan riil suatu bangsa diukur dari <em>jumlah barang dan jasa fisik</em> yang berhasil diproduksi (padi, baju, mobil, rumah, obat-obatan), bukan dari lembaran kertasnya.<br>
2. <strong>Teori Kuantitas Uang ($M \cdot V = P \cdot Y$):</strong> Jika jumlah uang beredar ($M$) digandakan 10 kali lipat sementara jumlah beras dan mobil ($Y$) di pasar tidak bertambah, maka masyarakat memegang banyak uang untuk memperebutkan barang yang jumlahnya sama.<br>
3. <strong>Terjadinya Hiperinflasi Brutal:</strong> Produsen dan pedagang akan langsung menaikkan harga 10 kali lipat bahkan 100 kali lipat. Uang kertas kehilangan nilainya sama sekali dan menjadi sampah tak berharga.<br>
4. <strong>Contoh Sejarah Nyata:</strong><br>
   - <em>Jerman 1923 (Republik Weimar):</em> Harga roti mencapai miliaran Mark; orang membawa uang menggunakan gerobak dorong.<br>
   - <em>Indonesia 1965:</em> Inflasi menembus 650% per tahun; harga beras melompat harian.<br>
   - <em>Zimbabwe 2008:</em> Pecahan uang mencapai 100 Triliun Dolar Zimbabwe namun tidak cukup membeli sebutir telur.<br><br>
🎯 <em>Kesimpulan Teknokratik:</em> Satu-satunya cara mensejahterakan rakyat secara hakiki adalah meningkatkan produksi barang/jasa riil ($Y$), bukan mencetak uang kertas semata!`
            },
            {
                id: "deflator_pdb_vs_ihk",
                title: "Apa Perbedaan Deflator PDB dengan Indeks Harga Konsumen (IHK / Inflasi)?",
                keywords: ["deflator", "ihk", "beda deflator", "indeks harga", "inflasi ihk", "keranjang belanja"],
                answer: `<strong>📊 Perbedaan Mendasar: Deflator PDB vs Inflasi IHK</strong><br><br>
Keduanya mengukur laju kenaikan harga, namun dengan cakupan barang yang berbeda:<br>
1. <strong>Indeks Harga Konsumen (IHK / CPI):</strong><br>
   - Mengukur biaya 'Keranjang Belanja Tetap' (sekitar 800+ komoditas) yang rutin dibeli oleh rumah tangga konsumen (makanan, sewa rumah, pulsa, bensin).<br>
   - Memasukkan barang impor konsumsi (seperti buah impor, mobil impor, gandum).<br>
   - <em>Kegunaan:</em> Tolok ukur daya beli masyarakat sehari-hari dan target resmi Bank Indonesia.<br><br>
2. <strong>Deflator PDB:</strong><br>
   - Mengukur tingkat harga <strong>seluruh barang dan jasa akhir yang diproduksi di dalam negeri</strong> (termasuk mesin pabrik, jembatan tol, kapal kargo, persenjataan).<br>
   - Tidak memasukkan barang impor sama sekali (hanya produksi lokal murni).<br>
   - Komposisi barangnya berubah setiap tahun mengikuti perubahan produksi riil.<br>
   - <em>Rumus:</em> $\text{Deflator PDB} = (\text{PDB Nominal} / \text{PDB Riil}) \times 100$.<br><br>
💡 <em>Ringkasan:</em> IHK mengukur apa yang <em>dibeli konsumen</em>, sedangkan Deflator PDB mengukur apa yang <em>dihasilkan pabrik dalam negeri</em>.`
            },
            {
                id: "pdb_nominal_vs_riil",
                title: "Bagaimana Cara Membedakan PDB Nominal dan PDB Riil?",
                keywords: ["pdb nominal", "pdb riil", "beda pdb", "harga konstan", "harga berlaku", "output riil"],
                answer: `<strong>📈 PDB Nominal vs PDB Riil: Mana yang Mencerminkan Kemakmuran Sejati?</strong><br><br>
1. <strong>PDB Nominal (Harga Berlaku):</strong> Dihitung berdasarkan tingkat harga pasar yang berlaku di tahun tersebut. Kelemahan: Jika produksi mobil tetap 1.000 unit tapi harganya naik 20%, PDB nominal seolah-olah tumbuh 20%, padahal fisiknya tidak bertambah sama sekali!<br>
2. <strong>PDB Riil (Harga Konstan Tahun Dasar):</strong> Dihitung menggunakan harga tetap dari tahun acuan tertentu (tahun dasar). PDB Riil mengisolasi dan membuang efek kenaikan harga (inflasi), sehingga murni mencerminkan <strong>pertambahan kuantitas fisik output dan jasa</strong> yang dinikmati rakyat.<br><br>
📐 <em>Formula Kunci:</em><br>
$$\text{PDB Riil} = \frac{\text{PDB Nominal}}{\text{Deflator PDB} / 100}$$<br>
$$\text{Pertumbuhan Ekonomi (\%)} = \frac{\text{PDB Riil}_{t} - \text{PDB Riil}_{t-1}}{\text{PDB Riil}_{t-1}} \times 100\%$$<br><br>
🎯 <em>Kesimpulan:</em> Angka pertumbuhan ekonomi nasional yang diumumkan BPS tiap kuartal selalu mengacu pada <strong>PDB Riil</strong>!`
            },
            {
                id: "fisher_nominal_riil",
                title: "Apa Hubungan Suku Bunga Nominal, Suku Bunga Riil, dan Inflasi (Persamaan Fisher)?",
                keywords: ["fisher", "suku bunga riil", "bunga nominal", "persamaan fisher", "rumus fisher", "bunga riil"],
                answer: `<strong>⚖️ Persamaan Fisher: Bunga Nominal vs Bunga Riil</strong><br><br>
Uang yang disimpan di bank bertambah nilainya dalam nominal rupiah, namun inflasi menggerus daya belinya:<br>
$$\text{Suku Bunga Riil } (r) = \text{Suku Bunga Nominal } (i) - \text{Ekspektasi Inflasi } (\pi)$$<br>
Atau ditulis: $i = r + \pi$<br><br>
💡 <em>Contoh Praktis Lapangan:</em><br>
- Anda menaruh uang di deposito bank dengan bunga <strong>6% per tahun</strong> (Bunga Nominal $i = 6\%$).<br>
- Selama tahun tersebut, harga barang kebutuhan pokok naik rata-rata <strong>3%</strong> (Inflasi $\pi = 3\%$).<br>
- Maka pertambahan kekayaan dan daya beli riil Anda sesungguhnya hanyalah <strong>6% - 3% = 3%</strong> (Bunga Riil $r = 3\%$).<br><br>
⚠️ <em>Bahaya Suku Bunga Riil Negatif:</em> Jika bunga bank 4% tetapi inflasi meledak ke 7%, bunga riil Anda adalah <strong>-3%</strong>! Menabung di bank justru membuat Anda semakin miskin secara daya beli.`
            },
            {
                id: "crowding_out",
                title: "Apa itu Efek Desakan (Crowding-Out Effect)?",
                keywords: ["crowding out", "desakan", "utang obligasi", "sbn", "pasar dana pinjaman", "investasi swasta terdesak"],
                answer: `<strong>⚖️ Efek Desakan (Crowding-Out Effect)</strong><br><br>
Efek desakan terjadi ketika pemerintah memacu belanja secara agresif menggunakan utang obligasi dalam jumlah masif:<br>
1. Pemerintah menerbitkan Surat Berharga Negara (SBN) dalam nilai ratusan triliun untuk mendanai defisit APBN.<br>
2. Agar laku dibeli, pemerintah menawarkan kupon bunga SBN yang tinggi dan bebas risiko gagal bayar (risk-free).<br>
3. Bank dan investor institusi lebih memilih memborong obligasi pemerintah ketimbang menyalurkan kredit modal ke pengusaha swasta.<br>
4. Pasokan likuiditas tabungan di pasar dana pinjaman tersedot oleh kas negara.<br>
5. <strong>Dampaknya:</strong> Suku bunga pinjaman kredit di pasar merangkak naik, sehingga pengusaha swasta dan pelaku UMKM kesulitan mendapatkan modal murah untuk berekspansi (investasi swasta terdesak / <em>crowded out</em>).<br><br>
🎯 <em>Pelajaran:</em> Belanja stimulus pemerintah harus terukur dan proporsional agar tidak mematikan mesin investasi swasta.`
            },
            {
                id: "uu17_disiplin_fiskal",
                title: "Mengapa Ada Aturan Batas Defisit APBN 3% dan Utang 60% PDB (UU No. 17/2003)?",
                keywords: ["uu 17", "batas defisit", "3%", "60%", "utang negara", "disiplin fiskal", "keuangan negara"],
                answer: `<strong>📜 Landasan Keramat Disiplin Fiskal Indonesia (UU No. 17/2003)</strong><br><br>
Pasca-trauma Krisis Moneter 1998 di mana rasio utang Indonesia meledak melampaui 90% PDB dan memicu kebangkrutan sovereign, Indonesia mengesahkan UU No. 17 Tahun 2003 tentang Keuangan Negara:<br>
- <strong>Batas Maksimal Defisit APBN:</strong> Maksimal <strong>3,0% dari PDB</strong> per tahun anggaran.<br>
- <strong>Batas Maksimal Akumulasi Utang:</strong> Maksimal <strong>60,0% dari PDB</strong>.<br><br>
🎯 <em>Tiga Alasan Utama Diberlakukannya Aturan Ini:</em><br>
1. <strong>Mencegah Kebangkrutan Finansial Negara:</strong> Menjaga kesinambungan utang (*debt sustainability*) agar kas negara tidak habis hanya untuk membayar bunga pinjaman masa lalu.<br>
2. <strong>Mempertahankan Peringkat Investasi (Investment Grade):</strong> Menjamin kepercayaan kreditur internasional sehingga biaya bunga pinjaman Indonesia tetap rendah.<br>
3. <strong>Mencegah Populisme Berbahaya:</strong> Membatasi agar politisi tidak menerbitkan utang gila-gilaan hanya untuk membiayai program bansos sesaat menjelang pemilu.`
            },
            {
                id: "multiplier_keynes",
                title: "Bagaimana Rumus Angka Pengganda (Multiplier) Belanja Pemerintah?",
                keywords: ["multiplier", "pengganda", "mpc", "mps", "rumus multiplier", "stimulus belanja"],
                answer: `<strong>📐 Formula Angka Pengganda Keynesian (Spending Multiplier)</strong><br><br>
Ketika pemerintah membelanjakan Rp 100 Triliun untuk membangun jalan tol, uang tersebut tidak berhenti di kontraktor, melainkan mengalir berantai:<br>
1. Kontraktor membeli semen dari pabrik lokal dan menggaji buruh konstruksi.<br>
2. Buruh membelanjakan gajinya untuk membeli beras, pakaian, dan menyekolahkan anak.<br>
3. Pedagang beras dan penjahit menerima penghasilan baru dan membelanjakannya kembali ke toko lain.<br><br>
- <strong>Marginal Propensity to Consume (MPC):</strong> Porsi dari setiap tambahan pendapatan yang dibelanjakan untuk konsumsi.<br>
- <strong>Rumus Pengganda Belanja ($k_G$):</strong><br>
$$k_G = \frac{1}{1 - MPC} = \frac{1}{MPS}$$<br>
- <em>Contoh:</em> Jika $MPC = 0,80$, maka $k_G = 1 / (1 - 0,80) = 5$. Stimulus belanja pemerintah sebesar Rp 100 T akan menghasilkan tambahan PDB nasional sebesar $5 \times 100\text{ T} = \text{Rp } 500\text{ T}$.`
            },
            {
                id: "stagflasi_dilema",
                title: "Apa itu Stagflasi dan Mengapa Sangat Ditakuti Bank Sentral?",
                keywords: ["stagflasi", "stagnasi", "supply shock", "guncangan penawaran", "minyak", "dilema stagflasi"],
                answer: `<strong>💥 Stagflasi: Kombinasi Mematikan Resesi dan Inflasi</strong><br><br>
Stagflasi adalah kondisi terburuk dalam ekonomi makro di mana dua penyakit terjadi secara bersamaan:<br>
1. <strong>Stagnasi Pertumbuhan:</strong> Ekonomi lesu, pabrik tutup, dan angka pengangguran melonjak tinggi.<br>
2. <strong>Inflasi Tinggi:</strong> Harga-harga kebutuhan pokok melambung mahal.<br><br>
Pemicunya hampir selalu berupa <strong>Guncangan Penawaran Negatif (Adverse Supply Shock)</strong>, seperti kenaikan harga minyak mentah global 150% atau gagal panen pangan massal yang menggeser kurva SRAS ke kiri atas.<br><br>
⚡ <em>Dilema Kebijakan:</em><br>
- Jika Bank Sentral <strong>menaikkan bunga</strong> untuk meredam inflasi $\to$ Sektor riil yang sedang sekarat akan langsung bangkrut massal.<br>
- Jika Bank Sentral <strong>menurunkan bunga</strong> untuk menolong pertumbuhan $\to$ Inflasi akan meledak liar tak terkendali.<br><br>
🛡️ <em>Solusi Teknokratik:</em> Bukan mengandalkan kebijakan moneter murni, melainkan <strong>Kebijakan Sisi Penawaran (Supply-Side)</strong>: deregulasi izin usaha, subsidi input pupuk/energi terarah, perbaikan jalur logistik pelabuhan, dan pemotongan friksi biaya bisnis.`
            },
            {
                id: "kurva_ad_miring",
                title: "Mengapa Kurva Permintaan Agregat (AD) Memiliki Kemiringan Menurun (Downward Sloping)?",
                keywords: ["kurva ad", "kemiringan ad", "downward sloping", "pigou", "kekayaan", "permintaan agregat miring"],
                answer: `<strong>📉 3 Landasan Teoretis Mengapa Kurva AD Miring ke Bawah:</strong><br><br>
1. <strong>Efek Kekayaan Pigou (Wealth Effect):</strong> Saat tingkat harga umum ($P$) turun, nilai riil saldo uang tunai yang dipegang konsumen meningkat. Konsumen merasa lebih kaya dan meningkatkan belanja konsumsi ($C$ naik).<br>
2. <strong>Efek Suku Bunga Keynes (Interest Rate Effect):</strong> Saat harga barang murah, masyarakat membutuhkan lebih sedikit uang tunai untuk transaksi belanja harian. Sisa kelebihan dana disimpan di perbankan, menekan suku bunga riil turun ($r$ turun), yang kemudian memacu ledakan investasi modal pabrik ($I$ naik).<br>
3. <strong>Efek Nilai Tukar Mundell-Fleming (Exchange Rate Effect):</strong> Turunnya suku bunga domestik mendorong investor memindahkan dana ke luar negeri. Nilai tukar mata uang lokal melemah secara wajar, membuat produk ekspor domestik murah di pasar internasional dan ekspor neto melonjak ($NX$ naik).`
            },
            {
                id: "kurva_phillips_nairu",
                title: "Apa itu Kurva Phillips dan Mengapa Trade-off Hilang di Jangka Panjang (NAIRU)?",
                keywords: ["phillips", "kurva phillips", "nairu", "pengangguran alami", "trade off phillips"],
                answer: `<strong>📈 Hubungan Kurva Phillips: Jangka Pendek vs Jangka Panjang</strong><br><br>
- <strong>Jangka Pendek:</strong> Terdapat hubungan terbalik (*trade-off*) antara inflasi dan pengangguran. Ketika pemerintah memompa stimulus moneter/fiskal, permintaan barang melonjak, pabrik menambah jam lembur dan merekrut buruh baru (pengangguran turun), namun harga-harga barang terdorong naik (inflasi naik).<br>
- <strong>Jangka Panjang (Konsep NAIRU):</strong> Para pekerja dan serikat buruh sadar bahwa kenaikan harga menggerus upah riil mereka. Mereka menuntut kenaikan upah nominal setara dengan ekspektasi inflasi. Biaya produksi pabrik naik, margin laba ternetralisir, dan pabrik mengurangi kembali jumlah pekerja hingga tingkat pengangguran berbalik ke <strong>Tingkat Pengangguran Alamiah (NAIRU)</strong>.<br><br>
🎯 <em>Kesimpulan:</em> Dalam jangka panjang, kurva Phillips berbentuk <strong>garis tegak lurus vertikal</strong> pada tingkat pengangguran alamiah (NAIRU). Anda tidak bisa menipu pasar selamanya hanya dengan mencetak inflasi!`
            },
            {
                id: "rupiah_melemah_dampak",
                title: "Siapa yang Diuntungkan dan Dirugikan Saat Kurs Rupiah Melemah (Depresiasi)?",
                keywords: ["kurs melemah", "rupiah melemah", "depresiasi", "untung rugi rupiah", "dolar naik", "eksportir vs importir"],
                answer: `<strong>💵 Siapa Untung dan Siapa Rugi Saat Kurs Rupiah Melemah?</strong><br><br>
1. <strong>Pihak yang Dirugikan (Tertekan):</strong><br>
   - <em>Importir Bahan Baku & Obat-obatan:</em> Biaya pengadaan bahan baku impor meroket, menekan margin keuntungan pabrik (*imported inflation*).<br>
   - <em>Perusahaan dengan Utang Valas USD:</em> Beban cicilan pokok dan bunga dalam Rupiah membengkak drastis.<br>
   - <em>Masyarakat Konsumen:</em> Harga barang impor (kedelai tempe, gandum mie instan, gadget) ikut naik.<br>
   - <em>Pemerintah (APBN):</em> Beban subsidi minyak mentah impor membengkak.<br><br>
2. <strong>Pihak yang Diuntungkan:</strong><br>
   - <em>Eksportir Komoditas & Manufaktur:</em> Produk lokal menjadi sangat murah dan kompetitif di luar negeri, sementara devisa Dolar yang diterima bernilai Rupiah lebih besar.<br>
   - <em>Sektor Pariwisata Domestik:</em> Turis asing membanjiri destinasi wisata lokal karena biaya liburan menjadi sangat murah bagi mereka.`
            },
            {
                id: "trilema_kebijakan",
                title: "Apa itu Trilema Kebijakan Moneter (The Impossible Trinity)?",
                keywords: ["trilema", "impossible trinity", "mundell fleming", "tiga pilar moneter", "kurs tetap vs mengambang"],
                answer: `<strong>🌐 Trilema Mundell-Fleming: The Impossible Trinity</strong><br><br>
Dalam ekonomi moneter internasional, suatu negara <strong>hanya dapat memilih 2 dari 3</strong> target berikut secara bersamaan:<br>
1. <strong>Arus Lalu Lintas Modal Devisa Bebas (Free Capital Mobility)</strong><br>
2. <strong>Stabilitas Nilai Tukar / Kurs Tetap (Fixed Exchange Rate)</strong><br>
3. <strong>Independensi Kebijakan Moneter Domestik (Independent Monetary Policy)</strong><br><br>
🇮🇩 <em>Pilihan Strategis Indonesia:</em><br>
Indonesia memilih <strong>Devisa Bebas (#1) + Independensi Moneter (#3)</strong>. Konsekuensi logisnya, Indonesia harus merelakan nilai tukar Rupiah berfluktuasi secara mengambang fleksibel (*managed floating*). Jika BI ingin kurs tetap kaku, BI harus menutup pintu arus modal asing atau kehilangan hak menetapkan suku bunga sendiri!`
            },
            {
                id: "krismon_1998",
                title: "Apa Pelajaran Utama dari Tragedi Krisis Moneter Asia 1998?",
                keywords: ["1998", "krismon", "krisis 1998", "penyebab 1998", "currency mismatch", "bank run"],
                answer: `<strong>🌪️ Tiga Kerapuhan Struktural Pemicu Krisis Moneter 1998:</strong><br><br>
1. <strong>Currency Mismatch & Maturity Mismatch:</strong> Korporasi swasta berutang dalam valas Dolar AS jangka pendek dengan bunga murah, namun menginvestasikannya ke proyek properti dalam negeri yang menghasilkan Rupiah jangka panjang tanpa lindung nilai (*hedging*).<br>
2. <strong>Rezim Kurs Mengambang Terkendali Semu:</strong> Rupiah dipatok ketat terhadap Dolar sehingga pelaku usaha lengah. Ketika badai spekulasi menyerang, cadangan devisa Bank Indonesia terkuras habis dan kurs Rupiah terjun bebas dari Rp 2.500 ke Rp 16.000 per USD.<br>
3. <strong>Kepanikan Perbankan Massal (Bank Run):</strong> Banyak bank komersial kolaps karena kredit macet dan penarikan dana panik oleh nasabah, memaksa suntikan likuiditas darurat BLBI.<br><br>
🛡️ <em>Reformasi Pasca-1998:</em> Independensi Bank Indonesia diperkuat, cadangan devisa dipertebal, pengawasan OJK diperketat, dan UU Disiplin Fiskal disahkan.`
            },
            {
                id: "hukum_okun",
                title: "Bagaimana Hubungan Pertumbuhan Ekonomi dan Pengangguran (Hukum Okun)?",
                keywords: ["okun", "hukum okun", "pengangguran dan pdb", "pertumbuhan pengangguran"],
                answer: `<strong>👥 Hukum Okun (Okun's Law)</strong><br><br>
Hukum Okun membuktikan adanya korelasi negatif yang kuat antara deviasi pertumbuhan PDB riil dengan tingkat pengangguran:<br>
$$\Delta U = -\beta (g - g^*)$$<br>
- $g$: Pertumbuhan PDB riil aktual.<br>
- $g^*$: Pertumbuhan tren potensial (di Indonesia sekitar 5%).<br>
- $\beta$: Koefisien Okun (umumnya bernilai sekitar 0,3 hingga 0,5).<br><br>
💡 <em>Arti Praktisnya:</em> Perekonomian harus tumbuh di atas pertumbuhan potensialnya (di atas 5%) agar lapangan kerja baru tercipta lebih cepat daripada laju pertambahan angkatan kerja baru yang lulus sekolah/kuliah tiap tahunnya!`
            },
            {
                id: "cara_main_game",
                title: "Bagaimana Cara Mengendalikan 7 Tuas Kebijakan di Game Ini?",
                keywords: ["cara main", "tuas", "7 tuas", "sidang kabinet", "kebijakan game", "menang"],
                answer: `<strong>🕹️ Panduan Pengendalian 7 Tuas Kebijakan di Sidang Kabinet:</strong><br><br>
1. <strong>BI-Rate (%):</strong> Rem atau gas likuiditas moneter. Naikkan jika inflasi overheat; turunkan jika ekonomi lesu.<br>
2. <strong>Giro Wajib Minimum / GWM (%):</strong> Cadangan likuiditas bank umum di BI. Menaikkan GWM menyedot dana dari perbankan.<br>
3. <strong>Intervensi Devisa ($ B):</strong> Beli/jual cadangan valas untuk menjaga kurs Rupiah dari serangan spekulasi global.<br>
4. <strong>Belanja Pengadaan & Modal (G):</strong> Stimulus belanja langsung untuk mendorong omzet PDB riil.<br>
5. <strong>Tarif Pajak Efektif (T):</strong> Sumber kas negara, namun memotong daya beli konsumen jika dinaikkan terlalu tinggi.<br>
6. <strong>Subsidi Energi (BBM & Listrik):</strong> Bantalan agar harga pokok tidak melonjak, namun membebani APBN jika berlebihan.<br>
7. <strong>Target Defisit APBN:</strong> Batas legal maksimal 3,0% PDB sesuai UU No. 17/2003 demi kesinambungan utang.`
            }
        ];
    }

    checkCheatingAttempt(query) {
        const qLower = query.toLowerCase().trim();
        for (const pattern of this.antiCheatPatterns) {
            if (pattern.test(qLower)) {
                return true;
            }
        }
        return false;
    }

    generateSocraticClue(query) {
        const qLower = query.toLowerCase();
        if (qLower.includes('deflator') || qLower.includes('pdb riil') || qLower.includes('nominal')) {
            return 'Perhatikan rumus dasar Deflator PDB: Deflator = (PDB Nominal / PDB Riil) * 100. Untuk mencari PDB Riil, bagilah PDB Nominal dengan indeks harga deflator (Deflator / 100)!';
        }
        if (qLower.includes('fisher') || qLower.includes('m * v') || qLower.includes('kuantitas uang')) {
            return 'Gunakan Persamaan Pertukaran Fisher: M * V = P * Y. Dalam bentuk persentase perubahan: %ΔM + %ΔV = %ΔP + %ΔY. Coba masukkan angka pertumbuhan output riil dan target inflasi yang diinginkan!';
        }
        if (qLower.includes('multiplier') || qLower.includes('pengganda') || qLower.includes('mpc')) {
            return 'Ingat rumus Multiplier Belanja Keynesian: k_G = 1 / (1 - MPC). Jika pemerintah menaikkan belanja dan menaikkan pajak dalam jumlah yang persis sama, angka pengganda anggaran berimbangnya bernilai tepat 1!';
        }
        if (qLower.includes('okun') || qLower.includes('pengangguran')) {
            return 'Hukum Okun menunjukkan hubungan negatif antara deviasi pertumbuhan PDB terhadap pengangguran. Ketika PDB tumbuh melebihi pertumbuhan tren potensialnya, angka pengangguran akan turun sebanding dengan koefisien beta!';
        }
        if (qLower.includes('phillips') || qLower.includes('nairu')) {
            return 'Bedakan antara jangka pendek dan jangka panjang! Dalam jangka panjang, ekspektasi pekerja beradaptasi penuh terhadap inflasi, sehingga tidak ada trade-off dan kurva Phillips menjadi vertikal pada tingkat pengangguran alamiah (NAIRU).';
        }
        if (qLower.includes('uu') || qLower.includes('defisit') || qLower.includes('utang')) {
            return 'Ingat aturan disiplin fiskal pasca-krisis 1998 di Indonesia: Defisit APBN maksimal 3% dari PDB, dan total utang pemerintah maksimal 60% dari PDB.';
        }
        return 'Coba telaah kembali mekanisme transmisi antara variabel riil (output fisik & tenaga kerja) vs variabel nominal (harga & uang), serta periksa formula dasar di Modul Akademi Teori atau Kitab Glosarium!';
    }

    // 3. Smart Excerpt Parser (Menjawab Cuplikan / Copas Materi Pengguna)
    parseCopiedExcerpt(query) {
        const qLower = query.toLowerCase();

        // Kasus: User copas Poin 4 & 5 dari Transmisi Moneter Modul 2
        const hasPoint4 = qLower.includes('permintaan agregat mendingin') || (qLower.includes('mendingin') && qLower.includes('inflasi'));
        const hasPoint5 = qLower.includes('kurs rupiah tertopang') || (qLower.includes('tertopang') && qLower.includes('bunga'));

        if (hasPoint4 && hasPoint5) {
            return `📋 <strong>Penjelasan Lengkap Mengenai Poin Transmisi Moneter yang Anda Tanyakan:</strong><br><br>
<strong>1. Mengapa Poin 4: "Permintaan Agregat Mendingin" Bisa Menjinakkan Inflasi?</strong><br>
Ketika Bank Indonesia menaikkan suku bunga BI-Rate, bunga pinjaman bank menjadi lebih mahal dan bunga deposito menjadi lebih menggiurkan. Akibatnya, masyarakat menahan belanja dan pengusaha menunda ekspansi pabrik. Total belanja di perekonomian (AD) pun 'mendingin' (melambat).<br>
Di sisi produsen, barang dagangan mulai menumpuk di gudang karena pesanan berkurang. Agar barang tidak rusak atau basi, produsen terpaksa menahan diri untuk tidak menaikkan harga jual (bahkan memberikan diskon promosi). <strong>Inilah mekanisme yang membuat laju kenaikan harga-harga (inflasi) berhasil diredam!</strong><br><br>
<strong>2. Mengapa Poin 5: "Kurs Rupiah Tertopang" Berkat Selisih Bunga (Interest Rate Differential)?</strong><br>
Investor keuangan global (fund manager dunia) selalu memindahkan uangnya ke negara yang menawarkan bunga paling menguntungkan. Ketika BI-Rate dinaikkan, imbal hasil obligasi negara (SBN) Indonesia menjadi lebih tinggi daripada bunga di luar negeri (selisih spread melebar).<br>
Investor asing berbondong-bondong membawa modal Dolar masuk (<em>capital inflow</em>) ke Indonesia untuk membeli obligasi SBN. Untuk membelinya, mereka harus menukarkan Dolar menjadi Rupiah. <strong>Banjir permintaan mata uang Rupiah inilah yang menopang nilai tukar Rupiah agar tidak terperosok melemah terhadap Dolar AS</strong>.<br><br>
💼 <strong>Relevansi bagi Manajer & Pelaku Usaha:</strong><br>
Bagi dunia usaha, kenaikan BI-Rate memang menaikkan biaya bunga pinjaman bank, namun menguntungkan karena harga bahan baku impor (seperti gandum, kedelai, atau mesin pabrik) menjadi stabil karena kurs Rupiah terjaga.`;
        }

        if (hasPoint4) {
            return this.knowledgeBase.find(k => k.id === 'ad_mendingin_inflasi').answer;
        }

        if (hasPoint5) {
            return this.knowledgeBase.find(k => k.id === 'kurs_tertopang_capital_inflow').answer;
        }

        return null;
    }

    ask(query) {
        if (!query || query.trim().length === 0) {
            return {
                isCheatAttempt: false,
                text: 'Silakan ajukan pertanyaan seputar konsep ekonomi makro, rumus, instrumen kebijakan, atau studi kasus di game ini Yang Mulia Teknokrat!'
            };
        }

        const cleanQuery = query.trim();

        // 1. CEK DETEKSI KECURANGAN (HANYA JIKA MEMINTA KUNCI / JAWABAN KUIS EKSPLISIT)
        if (this.checkCheatingAttempt(cleanQuery)) {
            const clue = this.generateSocraticClue(cleanQuery);
            return {
                isCheatAttempt: true,
                text: `🛡️ <strong>Protokol Integritas Akademis Dewan Ekonomi Nasional:</strong><br><br>
Mohon maaf Yang Mulia! Sebagai Asisten Ahli DEN, saya <strong>dilarang membocorkan kunci jawaban atau pilihan opsi (A/B/C/D)</strong> soal kuis secara langsung demi melatih kompetensi teknokrat Anda.<br><br>
Namun, saya dengan senang hati memberikan <strong>petunjuk pemikiran (clue)</strong> berikut:<br><br>
💡 <strong>Petunjuk Teori:</strong><br>
${clue}<br><br>
<em>Gunakan petunjuk di atas untuk menganalisis dan memilih jawaban terbaik Anda secara mandiri di lembar ujian!</em>`
            };
        }

        // 2. CEK APAKAH PERTANYAAN MERUPAKAN CUPLIKAN / COPAS TEKS MODUL
        const excerptExplanation = this.parseCopiedExcerpt(cleanQuery);
        if (excerptExplanation) {
            return {
                isCheatAttempt: false,
                text: excerptExplanation
            };
        }

        // 3. PENCARIAN PADA KNOWLEDGE BASE UTAMA DENGAN SCORING BOBOT
        const qLower = cleanQuery.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        for (const item of this.knowledgeBase) {
            let score = 0;
            for (const kw of item.keywords) {
                if (qLower.includes(kw)) {
                    score += kw.length * 2;
                }
            }
            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        }

        if (bestMatch && highestScore >= 6) {
            return {
                isCheatAttempt: false,
                text: bestMatch.answer
            };
        }

        // 4. PENCARIAN DINAMIS DI ENSIKLOPEDIA (KITAB GLOSARIUM)
        if (typeof MACRO_THEORY_DATA !== 'undefined' && MACRO_THEORY_DATA.encyclopedia) {
            for (const enc of MACRO_THEORY_DATA.encyclopedia) {
                const titleLower = enc.title.toLowerCase();
                const idLower = enc.id.toLowerCase();
                if (qLower.includes(titleLower) || qLower.includes(idLower) || titleLower.split(' ').some(w => w.length > 4 && qLower.includes(w))) {
                    return {
                        isCheatAttempt: false,
                        text: `<strong>📚 Kitab Glosarium: ${enc.title}</strong><br><br>
${enc.theory}<br><br>
${enc.formula ? `📐 <strong>Formula Matematis:</strong> <code>${enc.formula}</code><br><br>` : ''}
💼 <strong>Praktik & Realita Lapangan:</strong><br>${enc.practice}<br><br>
🎯 <strong>Poin Kunci:</strong> ${enc.keyTakeaway}`
                    };
                }
            }
        }

        // 5. PENCARIAN DINAMIS DI MODUL BELAJAR (LEARNING MODULES)
        if (typeof MACRO_THEORY_DATA !== 'undefined' && MACRO_THEORY_DATA.learningModules) {
            for (const mod of MACRO_THEORY_DATA.learningModules) {
                const titleLower = mod.title.toLowerCase();
                if (qLower.includes(titleLower) || (mod.subtitle && qLower.includes(mod.subtitle.toLowerCase()))) {
                    return {
                        isCheatAttempt: false,
                        text: `<strong>📖 ${mod.title}</strong><br>
<em>${mod.subtitle}</em><br><br>
${mod.analogy}<br><br>
${mod.practiceText}<br><br>
📐 <strong>Formula:</strong> <code>${mod.formula}</code>`
                    };
                }
            }
        }

        // 6. FALLBACK EDUKATIF LANGSUNG SESUAI KONTEKS PERTANYAAN
        return {
            isCheatAttempt: false,
            text: `💡 <strong>Analisis Konseptual atas Pertanyaan Anda:</strong><br><br>
Pertanyaan Yang Mulia: <em>"${cleanQuery}"</em> berkaitan erat dengan interaksi variabel makroekonomi nasional.<br><br>
Dalam kerangka kerja teknokrat Dewan Ekonomi Nasional (DEN), setiap kebijakan atau fenomena ekonomi dianalisis melalui 3 dimensi:<br>
1. <strong>Dimensi Sebab:</strong> Apakah dipicu oleh perubahan belanja agregat (sisi permintaan AD) atau gangguan ongkos produksi/pasokan (sisi penawaran AS)?<br>
2. <strong>Dimensi Dampak:</strong> Bagaimana pengaruhnya terhadap stabilitas harga (inflasi), pertumbuhan produksi fisik (PDB Riil), dan ketahanan kurs Rupiah?<br>
3. <strong>Dimensi Solusi:</strong> Apakah instrumen yang tepat berada di ranah Bank Indonesia (moneter: BI-Rate & GWM) atau Kementerian Keuangan (fiskal: belanja APBN & insentif pajak)?<br><br>
🎯 <em>Saran Eksplorasi:</em> Anda juga dapat menguji dampak variabel ini langsung di menu <strong>🧪 Lab Pasar</strong> atau membaca definisi resminya di <strong>📖 Kitab Glosarium</strong>!`
        };
    }

    getQuickChips() {
        return [
            { label: '💼 Beda Mikro vs Makro', query: 'Apa perbedaan mikroekonomi dan makroekonomi dari kacamata manajer bisnis?' },
            { label: '🏛️ Cara Kerja BI-Rate', query: 'Bagaimana kenaikan suku bunga BI-Rate memengaruhi inflasi dan omzet bisnis?' },
            { label: '⚖️ Apa itu Crowding-Out?', query: 'Jelaskan apa yang dimaksud dengan Efek Desakan (Crowding-Out Effect)!' },
            { label: '📜 Batas Defisit 3% APBN', query: 'Mengapa UU No. 17/2003 membatasi defisit APBN 3% dan utang 60% PDB?' },
            { label: '💥 Solusi Stagflasi', query: 'Bagaimana cara menghadapi krisis stagflasi saat inflasi dan pengangguran tinggi bersamaan?' },
            { label: '🌐 Trilema Mundell-Fleming', query: 'Jelaskan konsep Trilema Kebijakan Moneter Mundell-Fleming!' },
            { label: '📐 Rumus Multiplier Belanja', query: 'Bagaimana rumus angka pengganda multiplier belanja Keynesian?' },
            { label: '💵 Dampak Pelemahan Kurs', query: 'Siapa yang diuntungkan dan dirugikan saat kurs rupiah melemah terhadap dolar?' }
        ];
    }
}

if (typeof window !== 'undefined') {
    window.macroQAEngine = new MacroQAEngine();
}
