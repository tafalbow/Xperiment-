# 🌾 Panduan & Master Prompt Pengembangan Website Basis Data (Data Sekunder)

**Disusun Oleh:** Senior Software Architect & Lead Data Engineer  
**Tujuan Dokumen:** Menyediakan struktur prompt ideal agar draf pertama (Draft #1) aplikasi website database data sekunder dapat langsung berhasil dengan akurasi fungsional tinggi, terstruktur, dan siap pakai.

---

## 🎯 1. Mengapa Prompt untuk Database Data Sekunder Berbeda?

Aplikasi web untuk **Data Sekunder** (seperti data BPS, Kementerian/Lembaga, Bank Indonesia, Bank Dunia, iklim BMKG, energi DEN, dan statistik pertanian) memiliki kebutuhan arsitektur yang sangat berbeda dibandingkan database transaksi e-commerce atau CRUD standar:

1. **Aspek Provenans & Sitasi (Data Provenance & Lineage):** Setiap angka/indikator harus memiliki jejak sumber resmi, tanggal rilis/pembaruan, dan metodologi survei.
2. **Variasi Granularitas Spasial & Temporal:** Data tersusun menurut hierarki wilayah (Nasional $\rightarrow$ 38 Provinsi $\rightarrow$ Kabupaten Sentra) serta deret waktu (Bulanan, Kuartalan, Tahunan, hingga Proyeksi Multi-Tahun).
3. **Kebutuhan Kamus Data (Data Dictionary) & Metadata:** Penjelasan definisi operasional, satuan ukuran (Ton, Ribu Rp/Kg, Persen, BOE), dan rumus agregasi.
4. **Fitur Eksplorasi Cepat (Multi-Filter, Live Search, Pivot, Visualisasi Interaktif, & Ekspor Multi-Format):** Pengguna datang untuk menganalisis dan mengunduh data sesuai kebutuhan spesifik mereka.

---

## 🏛️ 2. Framework 7 Elemen Emas untuk Prompt Database Data Sekunder

| Elemen Emas | Fungsi & Komponen Kunci | Contoh Instruksi Spesifik |
| :--- | :--- | :--- |
| **1. Persona & Peran Spesifik** | Menetapkan tingkat keahlian AI sebagai Senior Web Architect dan Data Engineer. | *"Bertindaklah sebagai Senior Full-Stack Web Developer & Data Architect profesional yang ahli dalam perancangan portal statistik publik dan Business Intelligence (BI)."* |
| **2. Konteks & Tujuan Bisnis** | Menjelaskan domain data, pengguna akhir (analis, pimpinan lembaga, publik), dan fungsi utama. | *"Bangun aplikasi portal database satu pintu untuk memantau data sekunder statistik ketahanan pangan, inflasi harga komoditas, dan neraca energi nasional Indonesia..."* |
| **3. Taksonomi & Arsitektur Data** | Menentukan skema metadata, relasi antar-entitas, hierarki wilayah, dan satuan baku. | *"Setiap record data harus memiliki metadata: ID Indikator, Nama Variabel, Sektor, Sumber Lembaga, Tahun Deret Waktu, Cakupan Wilayah (38 Provinsi), Satuan, dan Status Keandalan."* |
| **4. Fitur Inti (Core Specifications)** | Menjabarkan alur fitur: pencarian instan, filter bertingkat, tabel interaktif, chart deret waktu, dan ekspor. | *"Sediakan bilah pencarian fuzzy, filter multi-dropdown bertingkat, Data Grid table dengan sorting & pagination, Line/Bar Chart interaktif, dan tombol Export CSV/Excel/JSON."* |
| **5. Desain UI/UX & Kerapian** | Menentukan tema antarmuka, kontras warna, kepadatan data (data-dense), dan responsivitas. | *"Gunakan gaya GovTech modern minimalis yang bersih, kontras warna WCAG AAA, sidebar filter fleksibel, kartu metrik KPI ringkas, dan 100% responsif mobile/desktop."* |
| **6. Standar Teknis & Performa** | Menentukan format berkas, kemudahan eksekusi mandiri tanpa instalasi berat. | *"Gunakan Vanilla JavaScript modern dan pustaka visualisasi client-side (misal Chart.js / Leaflet.js), modular, cepat, dan simpan state filter pada browser."* |
| **7. Penanganan Edge Cases** | Aturan penanganan data hilang (null/NA), indikator anomali, dan peringatan disparitas. | *"Jika data pada tahun tertentu belum dipublikasikan, tampilkan badge N/A abu-abu dengan catatan metodologi tanpa menyebabkan grafik atau tabel crash."* |

---

## 📋 3. Master Prompt Template (Siap Pakai & Bisa Di-edit)

```text
[IDENTITAS & PERAN]
Bertindaklah sebagai Senior Full-Stack Software Engineer dan Lead Data Architect profesional. Bantu saya merancang dan membangun aplikasi website portal "Pusat Basis Data Data Sekunder" yang berkinerja tinggi, berestetika bersih (GovTech modern), dan siap pakai.

[KONTEKS & SEKTOR DATA]
Aplikasi ini berfungsi sebagai repositori sentral untuk mengumpulkan, mengkategorisasikan, menelusuri, menganalisis, dan mengekspor data sekunder nasional di sektor [ISI SEKTOR: Ketahanan Pangan, Agroklimat, dan Neraca Energi Nasional].
Target pengguna utama meliputi: Analis Kebijakan Pemerintah, Peneliti, Pelaku Usaha, dan Publik.

[SKEMA METADATA DATASET]
Setiap entitas data sekunder di dalam aplikasi wajib memuat metadata terstandarisasi:
1. ID Indikator & Kode Variabel Unik
2. Nama Indikator / Judul Variabel (Bahasa Indonesia yang jelas)
3. Sektor & Kategori Hierarkis (misal: Pangan Pokok, Hortikultura, Perkebunan, Bioenergi)
4. Sumber Data Sekunder Resmi (misal: BPS, Kementan, BMKG, Bank Indonesia, Kementerian ESDM, World Bank)
5. Deret Waktu (Time Series): Data historis [misal: 2020 - 2026] dan proyeksi [misal: 2027 - 2031]
6. Granularitas Spasial: Nasional, 38 Provinsi Indonesia, serta Kabupaten Sentra Lumbung
7. Satuan Ukuran Resmi: Ton, Ribu Rupiah/Kg, Persen YoY, Hektar, Mm/Tahun
8. Frekuensi Rilis (Bulanan / Triwulanan / Tahunan) & Tanggal Pembaruan Terakhir
9. Kamus Definisi & Catatan Metodologi Pengumpulan Data

[FITUR-FITUR WAJIB DALAM APLIKASI]
1. HEADER & KONTROL NAVIGASI:
   - Logo instansi resmi, judul sistem database, indikator status sinkronisasi data live, serta tombol unduh kamus metadata lengkap.

2. PANEL FILTER MULTIDIMENSI (QUERY ENGINE):
   - Bilah pencarian instan (Live Search) untuk mencari nama indikator atau komoditas.
   - Filter dropdown bertingkat:
     * Kategori Sektor -> Pilih Indikator Spesifik
     * Cakupan Wilayah (Pilihan Seluruh Indonesia atau filter per Provinsi)
     * Rentang Tahun Awal -> Tahun Akhir (termasuk proyeksi masa depan)
     * Sumber Lembaga Penerbit
   - Tombol 'Reset Filter' dan indikator jumlah record yang cocok secara real-time.

3. TABEL DATA INTERAKTIF (DATA GRID VIEWER):
   - Menampilkan data sekunder dalam format tabular yang bersih dan padat informasi.
   - Fitur sorting (pengurutan ASC/DESC) pada setiap kolom angka dan teks.
   - Badge status data: Normal (Hijau), Anomali/Waspada (Kuning/Merah), atau Estimasi (Biru).
   - Pengaturan jumlah baris per halaman (Paginasi: 10, 25, 50 baris).

4. MODUL ANALITIK & GRAFIK VISUALISASI:
   - Line Chart deret waktu interaktif untuk membaca tren fluktuasi, inflasi, atau hasil panen.
   - Bar Chart komparasi nilai indikator antar-provinsi atau antar-komoditas.
   - Kartu Metrik Ringkasan (Summary KPI Cards): Nilai Rata-rata Nasional, Nilai Tertinggi (Surplus), Nilai Terendah (Defisit), dan Laju Pertumbuhan YoY (%).

5. MODUL PETA SPASIAL / GIS WILAYAH:
   - Peta visual wilayah (38 Provinsi Indonesia) dengan pewarnaan zona atau marker interaktif yang menampilkan data sekunder provinsi saat diklik.

6. PUSAT EKSPOR & DISEMINASI DATA:
   - Tombol ekspor instan untuk mengunduh subset data yang sedang difilter ke format:
     * File CSV (format koma/titik koma standar)
     * File Excel (.xlsx / tabular format)
     * Format Ringkasan JSON untuk kebutuhan integrasi API sistem lain.

7. KAMUS DATA & CATATAN METODOLOGI:
   - Modal pop-up atau tab khusus yang menerangkan definisi konsep setiap variabel, batasan data, rumus perhitungan, dan sitasi dokumen sumber aslinya.

[STANDAR DESAIN UI/UX & ARSITEKTUR KODE]
- Layout: Desain antarmuka GovTech modern yang bersih, kontras tinggi (WCAG AAA), tata letak kartu yang rapi, dan navigasi intuitif.
- Responsivitas: Nyaman diakses dan responsif sempurna baik di layar ponsel (mobile-friendly dengan table horizontal scroll) maupun monitor laptop lebar.
- Arsitektur Berkas: Buat kode yang bersih, modular, dan terdokumentasi rapi (misal memisahkan data JS, stylesheet CSS, dan engine interaktif).
- Penanganan Data Kosong: Jika ada sel data yang belum dirilis pada periode tertentu, tampilkan teks 'N/A' abu-abu tanpa merusak visualisasi grafik atau tabel.

[OUTPUT YANG DIINGINKAN]
Berikan kode sumber lengkap dan fungsional (HTML, CSS, JavaScript) yang langsung dapat dijalankan di browser, lengkap dengan kumpulan sampel data sekunder realistis Indonesia yang siap diuji coba.
```

---

## ✅ 4. Checklist Evaluasi Kualitas Hasil Draft Pertama (QA Checklist)

| Aspek Pengujian | Kriteria Keberhasilan | Hasil Uji |
| :--- | :--- | :--- |
| **1. Validitas Struktur Metadata** | Apakah setiap baris data memiliki keterangan sumber resmi, tahun rilis, dan satuan yang jelas? | [ ] Lolos |
| **2. Responsivitas Filter** | Apakah saat dropdown provinsi atau rentang tahun diubah, isi tabel, grafik, dan kartu KPI langsung diperbarui tanpa error di konsol browser? | [ ] Lolos |
| **3. Interaktivitas Visualisasi** | Apakah grafik memiliki sumbu X/Y yang proporsional, label satuan, dan tooltip nilai saat kursor diarahkan ke titik data? | [ ] Lolos |
| **4. Fungsionalitas Ekspor File** | Apakah tombol unduh CSV/Excel menghasilkan berkas yang rapi dan sesuai dengan filter yang sedang aktif? | [ ] Lolos |
| **5. Tampilan di Perangkat Bergerak** | Apakah tabel data memiliki pembungkus scroll horizontal sehingga tidak terpotong pada layar ponsel? | [ ] Lolos |

---

## 🚀 5. Tips Tambahan untuk Mendapatkan Hasil 10x Lebih Akurat

1. **Sertakan Contoh 3-5 Baris Data Nyata Anda:** Salin contoh baris tabel data Anda ke dalam prompt agar AI langsung memahami nama kolom, format tanggal, dan tipe nilai yang Anda gunakan.
2. **Gunakan Pemisah Ribuan Standar Indonesia:** Ingatkan AI untuk menggunakan format mata uang dan angka Indonesia (titik untuk ribuan `Rp 15.000` dan koma untuk desimal `5,8%`).
3. **Minta Pemisahan Modul Berkas:** Jika proyek cukup besar, minta AI memisahkan data sekunder ke dalam berkas `data_sekunder.js`, logika ke `engine.js`, gaya ke `style.css`, dan tampilan ke `index.html` agar mudah Anda kelola dan edit di masa mendatang.
