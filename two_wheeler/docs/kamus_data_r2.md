# 🏍️ Dokumen Arsitektur & Kamus Data Sekunder Industri Roda Dua Indonesia (1990 - 2026)
*Dokumentasi Teknis & Metodologi Sistem Intelijen Basis Data I2W-DIS*

**Disusun Oleh:** Senior Data Systems Architect & Industry Intelligence Lead  
**Cakupan Data:** Seluruh Kategori Sepeda Motor (Internal Combustion Engine & Electric Two-Wheeler)  
**Periode Deret Waktu:** 1990 – 2026 (Historis, Terkini, dan Proyeksi)

---

## 🏛️ 1. Landasan Provenans & Silsilah Data (Data Provenance & Lineage)

Portal **Indonesia 2-Wheeler Industry Data & Intelligence System (I2W-DIS)** dirancang sebagai repositori data sekunder satu pintu (*single secondary truth source*) untuk memantau siklus industri otomotif roda dua Indonesia selama lebih dari 36 tahun.

### Sumber Data Primer & Sekunder yang Direkonsiliasi:
1. **Kementerian Perindustrian (Kemenperin):**
   - Basis data Sertifikasi Tingkat Komponen Dalam Negeri (TKDN - Ditjen ILMATE & Pusat P3DN).
   - Platform SISAPIRa (Sistem Informasi Pemberian Bantuan Pembelian Kendaraan Bermotor Listrik Berbasis Baterai).
   - Data kapasitas produksi terpasang dan utilisasi pabrikan manufaktur.
2. **Asosiasi Industri Sepedamotor Indonesia (AISI):**
   - Data distribusi pabrik ke dealer (*wholesales*) bulanan dan tahunan lima anggota utama (Honda, Yamaha, Suzuki, Kawasaki, TVS).
   - Data ekspor Completely Built-Up (CBU) dan Completely Knocked Down (CKD).
3. **Korlantas Polri (Electronic Registration and Identification / ERI):**
   - Jumlah populasi kendaraan bermotor roda dua aktif terdaftar di seluruh Polda / Samsat 38 provinsi di Indonesia.
4. **Badan Pusat Statistik (BPS):**
   - Publikasi tahunan *Statistik Transportasi Darat Indonesia*.
   - Data ekspor-impor otomotif kode HS 8711.
5. **Kementerian Perhubungan (Kemenhub):**
   - Data Sertifikasi Uji Tipe (SUT) dan Sertifikat Registrasi Uji Tipe (SRUT) kendaraan roda dua konvensional dan listrik.
   - Pendaftaran bengkel konversi motor listrik tersertifikasi (PM 39/2023).
6. **Kementerian ESDM:**
   - Direktori Stasiun Pengisian Kendaraan Listrik Umum (SPKLU) dan Stasiun Penukaran Baterai Kendaraan Listrik Umum (SPBKLU).
   - Penyaluran bantuan pemerintah konversi motor listrik Rp 10 juta.
7. **Lembaga Riset Independen & Media Terpercaya:**
   - LPEM FEB Universitas Indonesia (Riset Kelayakan Ekonomi EV & Elastisitas Subsidi).
   - Institut Teknologi Bandung / Pusat Penelitian Transportasi & Logistik.
   - PwC Indonesia Automotive Executive Survey.
   - Arsip media kredibel: Kompas Otomotif, Bisnis Indonesia, Kontan, Tempo, CNBC Indonesia, Antara News.

---

## 📊 2. Taksonomi Kategori Kendaraan R2 Indonesia

| Kategori Utama | Sub-Kategori / Tipe | Karakteristik Teknis | Model Acuan Pasar |
| :--- | :--- | :--- | :--- |
| **ICE - Underbone / Cub ("Bebek")** | Entry Bebek (110-125cc), Hyper Underbone (150cc) | Transmisi semi-otomatis rotary tanpa tuas kopling (atau manual kopling untuk hyper underbone), rangka pipa baja kokoh, roda ring 17 inci. | Honda Revo, Supra X 125, Yamaha Vega Force, Suzuki Satria F150. |
| **ICE - Scooter ("Skutik" / Matic)** | Entry-Level (110-125cc), Classy / Retro (125cc), Maxi Scooter (150-250cc) | Transmisi otomatis V-Belt CVT, dek rata atau punggung tangki tengah (Maxi), bagasi luas helm-in, posisi berkendara rileks. | Honda BeAT, Vario, Scoopy, PCX; Yamaha Mio, Fazzio, NMAX, XMAX. |
| **ICE - Sport & Adventure** | Naked Bike, Fairing (150-250cc), Dual Purpose / Trail, Retro Classic | Transmisi manual berkopling, tangki BBM di depan, suspensi monoshock/upside-down, pelek spoke/cast wheel. | Kawasaki Ninja Series, KLX 150/230, Honda CB150R, CRF150L, Yamaha WR 155 R. |
| **EV - Battery Swapping (E2W)** | Urban Moped & Scooter Listrik | Baterai standar dapat dilepas-pasang (*removable pack*), pengisian daya dilakukan via penukaran di lemari SPBKLU dalam hitungan detik. | Smoot Tempur, Smoot Zuzu, Volta 401, Gesits Raya (Swap). |
| **EV - Direct Cable Charging (E2W)** | Premium Smart Scooter Listrik | Baterai terpasang tetap (*fixed battery*) atau cabut colok port rumah tangga (AC charger 220V / DC Fast Charge). | Polytron Fox-R, ALVA One, ALVA Cervo, United TX3000. |
| **EV - Converted ICE-to-EV** | Konversi Motor Bebek / Skutik Lama | Penggantian mesin bakar lama, tangki, dan knalpot dengan kit konversi bersertifikat Kemenhub (BLDC motor, controller, battery pack, BMS). | Konversi bengkel resmi tersertifikasi Ditjen Hubdat & Ditjen EBTKE. |

---

## ⚖️ 3. Peta Regulasi Lintas Sektor (Regulatory Landscape)

1. **Insentif Fiskal & Subsidi:**
   - **Permenperin No. 21/2023:** Bantuan potongan harga Rp 7.000.000 per 1 NIK KTP untuk pembelian motor listrik bersyarat TKDN minimal 40% terverifikasi SISAPIRa.
   - **Perpres No. 79/2023:** Pembebasan bea masuk dan PPnBM impor CBU/CKD dengan komitmen investasi pabrik perakitan fisik lokal.
   - **Permen ESDM No. 1/2023 jo. No. 3/2024:** Bantuan biaya konversi motor bensin menjadi motor listrik sebesar Rp 10.000.000 per unit.
2. **Kepatuhan Rantai Pasok Lokal:**
   - **Permenperin No. 6/2022:** Formula pembobotan TKDN (Baterai 35%, Powertrain 20%, Bodi/Sasis 15%, Tenaga Kerja & R&D 15%).
3. **Standar Emisi & Keselamatan Jalan:**
   - **UU No. 22/2009 (LLAJ):** Legalitas pengoperasian sepeda motor, helm SNI, dan Daytime Running Light (DRL).
   - **Permen LH No. 23/2012:** Ambang batas baku mutu emisi gas buang Euro 3 untuk seluruh motor bensin baru.
   - **Permenhub No. PM 39/2023:** Tata cara konversi motor bakar menjadi motor listrik dan sertifikasi kelaikan teknis bengkel.
4. **Insentif Pajak Daerah & Korlantas:**
   - **Perkap Polri No. 7/2021:** Pemberian pelat nomor lis biru sebagai tanda registrasi resmi KBLBB di basis data ERI.
   - **Pergub DKI Jakarta No. 3/2020:** Pembebasan 100% BBNKB dan pembebasan ganjil-genap untuk motor listrik.

---

## 👥 4. Matriks Persona Konsumen R2 Indonesia

1. **The Urban Commuter (42,5% Pasar):** Pekerja kantoran kota besar, mengutamakan konsumsi bensin hemat (>50 km/liter), kenyamanan transmisi matik, kepraktisan bagasi, dan skema cicilan kredit terjangkau (Rp 700rb - 1.2jt/bulan).
2. **Gig Economy Warrior / Ojol (18,0% Pasar):** Pengemudi ojek online & kurir logistik dengan jarak tempuh harian 85-140 km. Mengutamakan ketersediaan suku cadang murah, durabilitas jalan rusak, dan skema tukar baterai cepat (swap 9 detik).
3. **Youth & Gen Z Lifestyle (16,5% Pasar):** Pelajar dan mahasiswa, mengutamakan estetika bodi klasik/retro, warna pastel, konektivitas smartphone, dan paling terbuka mengadopsi motor listrik hijau.
4. **The Rural Agro-Harvester (14,0% Pasar):** Petani dan pekebun di daerah pedesaan, membutuhkan torsi tanjakan kuat, ground clearance tinggi bebas lumpur, dan kemudahan servis mekanik tradisional tanpa komputer.
5. **The Maxi & Sport Enthusiast (9,0% Pasar):** Penggemar motor bongsor 150-250cc dan motor sport hobi untuk touring akhir pekan (*sunmori*), mengutamakan gengsi komunitas dan kapasitas tangki bahan bakar besar.

---

## 🗺️ 5. Analisis Spasial & Disparitas 38 Provinsi

Populasi kendaraan roda dua di Indonesia menunjukkan tingkat konsentrasi geografis yang sangat tinggi:
1. **Gugus Pulau Jawa (61,8% Populasi Nasional):** Didominasi Jawa Timur (19,8 juta unit), Jawa Barat (18,9 juta unit), DKI Jakarta (17,8 juta unit), dan Jawa Tengah (16,4 juta unit). Menjadi target utama adopsi motor listrik karena densitas SPBKLU/SPKLU yang rapat.
2. **Gugus Pulau Sumatera (19,3% Populasi Nasional):** Dipimpin oleh Sumatera Utara (7,1 juta unit), Sumatera Selatan (4,3 juta unit), dan Riau (4,1 juta unit). Permintaan sangat elastis terhadap siklus komoditas sawit dan karet.
3. **Gugus Kalimantan & Sulawesi (~14% Populasi Nasional):** Didorong oleh aktivitas tambang batu bara, hilirisasi nikel (Morowali, Konawe), dan perkebunan.
4. **Bali, Nusa Tenggara, Maluku & Papua (~5% Populasi Nasional):** Pasar pariwisata sewa motor (Bali) serta kebutuhan motor tangguh penjelajah medan terjal (Papua & NTT).

---

## ⚡ 6. Kerangka Verifikasi Penyaluran Subsidi SISAPIRa

- **Payung Hukum:** Permenperin No. 21 Tahun 2023.
- **Besaran Bantuan:** Rp 7.000.000 dipotong langsung pada harga on-the-road (OTR) di faktur penjualan dealer.
- **Mekanisme Verifikasi:** Dealer menginput Nomor Induk Kependudukan (NIK) pembeli ke platform digital SISAPIRa. Sistem memvalidasi apakah NIK tersebut telah pernah menerima subsidi atau belum (prinsip *1 NIK untuk 1 unit motor listrik seumur hidup*).
- **Syarat Mutlak Kendaraan:** Wajib dirakit di fasilitas dalam negeri dan telah mengantongi Sertifikat TKDN minimal 40% dari Pusat P3DN Kementerian Perindustrian.

---

## 📰 7. Rekam Jejak Media Bereputasi Baik (Media Lineage)

Data sekunder dilengkapi catatan kurasi liputan berita investigatif dan laporan utama dari:
- **Harian Kompas & Kompas Otomotif:** Rekor penjualan 1 juta unit (1995), dampak deregulasi, dan pelat nomor lis biru.
- **Bisnis Indonesia & Kontan:** Analisis kejatuhan pasar saat Krismon 1998 (-76%), penetapan uang muka kredit 20-25% oleh BI (2012), dan operasionalisasi pabrik sel baterai HLI Green Power Karawang (2024).
- **Tempo & CNBC Indonesia:** Liputan mendalam revisi Perpres 79/2023, restrukturisasi aturan subsidi SISAPIRa, serta dinamika rantai pasok nikel IBC.
- **Warta Ekonomi & SWA:** Studi kasus invasi motor China (Mocin) awal tahun 2000-an dan pergeseran selera konsumen ke transmisi matik.

