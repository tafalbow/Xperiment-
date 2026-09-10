# 🏛️ INDOEKONOMI data — Indonesia Economic Data Observatory

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB.svg?style=flat&logo=python&logoColor=white)](https://www.python.org)
[![Server](https://img.shields.io/badge/Server-Uvicorn%20(Port%208028)-499848.svg?style=flat)](http://localhost:8028/)
[![Tests](https://img.shields.io/badge/Tests-75%20Passed%20(100%25)-success.svg?style=flat)]()
[![Status](https://img.shields.io/badge/Status-Active%20%26%20Production%20Ready-brightgreen.svg?style=flat)]()

**INDOEKONOMI data** adalah platform analitik dan repositori basis data sekunder ekonomi nasional terintegrasi Republik Indonesia. Platform ini menyatukan serial waktu ekonomi makro dan fiskal jangka panjang (LKPP 1990–2026), pemantauan indikator frekuensi tinggi mingguan (*Weekly High-Frequency Observatory 2014–2026*), sistem informasi geospasial kalender pertanian & peternakan, serta studio perancang grafik kustom multi-variabel.

---

## 🚀 Akses Cepat Platform

Buka link berikut di peramban web (Google Chrome, Microsoft Edge, Firefox, Safari):

| Akses | URL / Tautan | Keterangan |
|---|---|---|
| **🏢 Dashboard Utama (Lokal)** | **[http://localhost:8028/](http://localhost:8028/)** | Akses penuh seluruh database sekunder, analitik mingguan, dan studio grafik |
| **🌐 Web Launchpad Portal** | **[https://tafalbow.github.io/Xperiment-/](https://tafalbow.github.io/Xperiment-/)** | Halaman peluncuran cerdas & modul edukasi interaktif daring |
| **🐙 Repositori GitHub** | **[https://github.com/tafalbow/Xperiment-](https://github.com/tafalbow/Xperiment-)** | Kode sumber, skrip otomasi, dokumentasi, dan changelog |
| **📑 Dokumentasi API Interaktif** | **[http://localhost:8028/docs](http://localhost:8028/docs)** | Swagger UI OpenAPI v3 untuk eksplorasi dan integrasi API |

> **💡 Catatan Akses:** Server di laptop ini telah dikonfigurasi untuk **berjalan otomatis di latar belakang Windows** pada port **`8028`**. Anda dapat langsung mengklik tautan `http://localhost:8028/` kapan pun tanpa perlu membuka Antigravity.

---

## 💻 Cara Menjalankan & Mengelola Server

Server dapat dijalankan secara mandiri dengan berbagai metode yang sangat mudah (1-klik):

### 1. Berjalan Otomatis Saat Laptop Dinyalakan (Auto-Start)
Skrip startup telah terpasang di folder `Startup` Windows user (`INDOEKONOMI_Server.vbs`). Setiap kali laptop dinyalakan atau login Windows, server otomatis aktif di latar belakang tanpa jendela terminal mengganggu.

### 2. Menjalankan secara Manual (Bila Server Belum Berjalan)
Tersedia berkas skrip siap pakai di direktori utama:
- **Mode Latar Belakang (*Silent / Background*)**:
  Dobel-klik file **`start_background.vbs`**. Server akan langsung aktif tanpa memunculkan jendela konsol hitam.
- **Mode Terminal (*Console Logs & Live Reload*)**:
  Dobel-klik file **`run_server.bat`** atau jalankan perintah PowerShell:
  ```powershell
  .\run_server.ps1
  ```
  *(Jendela terminal akan menampilkan log request HTTP secara langsung).*
- **Menghentikan Server**:
  Dobel-klik file **`stop_server.bat`**. Proses uvicorn pada port 8028 akan ditutup secara bersih.

---

## 🌟 Fitur Unggulan Platform

### 1. 📊 Basis Data Historis LKPP (1990 – 2026)
- **47+ Indikator Resmi**: Meliputi Produk Domestik Bruto (PDB Nominal/Riil), Pertumbuhan Ekonomi (%), Inflasi IHK, Realisasi Pendapatan Negara (Perpajakan & PNBP), Realisasi Belanja Pemerintah Pusat & TKD, Keseimbangan Primer, Defisit Anggaran (% PDB), serta Rasio Utang Pemerintah terhadap PDB.
- **Analisis Lintas Dekade**: Dilengkapi fitur komparasi antar periode kepemimpinan dan visualisasi tren multi-dekade.
- **Ekspor Data Sekunder**: Unduh data dalam format CSV, Excel, dan format kutipan standar.

### 2. ⏱️ Weekly High-Frequency Observatory (2014 – 2026)
- **Pemantauan Lintas Lembaga**: Agregasi data berkala mingguan dari **Bank Indonesia (BI)**, **Kementerian Keuangan RI (DJPb)**, **Otoritas Jasa Keuangan (OJK)**, dan **Badan Pangan Nasional (Bapanas)**.
- **5 Kartu Ringkasan Metrik Terkini**:
  1. **Nilai Terkini (*Latest Value*)** beserta tanggal rilis resmi.
  2. **Rata-rata 3 Bulan Terakhir (*Average L3M*)**.
  3. **Nilai Terendah 12 Minggu Terakhir (*Min L12W*)**.
  4. **Nilai Tertinggi 12 Minggu Terakhir (*Max L12W*)**.
  5. **Triple Pertumbuhan**: *Week-on-Week* (WoW %), *Month-on-Month* (MoM %), dan *Year-on-Year* (YoY %).
- **Median Trend Dinamis (Data Olahan)**: Menampilkan garis tren median yang dihitung secara dinamis dari nilai olahan mingguan.
- **Rincian Observasi 36 Minggu**: Tabel audit mingguan kronologis yang menampilkan historis 36 minggu terakhir beserta laju fluktuasi WoW.

### 3. 🌾 Pertanian & Peternakan
- **Kalender Musim Tanam & Panen**: Visualisasi siklus panen komoditas pangan pokok (Padi, Jagung, Kedelai, Cabai Merah, Bawang Merah, Daging Sapi, Minyak Goreng).
- **Sistem Informasi Geospasial (GIS)**: Peta sebaran komoditas unggulan dan sentra produksi pangan per provinsi di Indonesia.
- **Neraca Ketersediaan Pangan**: Pemantauan surplus/defisit pasokan komoditas pangan strategis.

### 4. 📈 Studio Grafik Kustom (Custom Chart Studio)
- Fasilitas pembuatan grafik dinamis multi-seri bebas dengan penggabungan indikator makro, harga komoditas, dan data mingguan.
- Mendukung berbagai tipe visualisasi: *Line Chart*, *Area Chart*, *Bar Chart*, dan *Dual Y-Axis*.
- Ekspor visualisasi grafik siap presentasi beresolusi tinggi (PNG, SVG) dan tabel data olahan.

### 5. 🎮 Mini-Apps & Modul Edukasi Interaktif
Dapat dijalankan langsung di browser tanpa instalasi tambahan:
- [🌾 **Simulator Cocok Tanam** (`cocok_tanam.html`)](cocok_tanam.html) — Simulasi kalender pertanian dan strategi manajemen risiko iklim.
- [📈 **Macroeconomic Policy Game** (`macro_game.html`)](macro_game.html) — Simulasi bauran kebijakan suku bunga BI-Rate dan stimulus fiskal APBN.
- [🚢 **International Trade Simulator** (`trade_game.html`)](trade_game.html) — Simulasi ekspor-impor, neraca perdagangan, dan cadangan devisa.
- [🎯 **Math Tug-of-War Battle** (`math_tug.html`)](math_tug.html) — Arena kompetisi kuis kuantitatif dan analisis angka ekonomi.
- [🍡 **Game Mochi** (`mochi_game.html`)](mochi_game.html) — Permainan interaktif edukatif santai.

---

## 🏗️ Arsitektur Sistem & Struktur Repositori

Platform dibangun menggunakan arsitektur modular modern berbasis **FastAPI (Clean Architecture)** dengan pemisahan tanggung jawab yang tegas:

```
ProjectDEN/
├── backend/
│   ├── app.py                      # FastAPI Application Entrypoint & SPA Mount
│   ├── config.py                   # Parameter Konfigurasi Global & Resolusi Path
│   ├── core/                       # In-memory Caching, Database Engine & Logging
│   │   ├── cache.py
│   │   └── database.py
│   ├── models/                     # Skema Pydantic & Data Transfer Objects (DTO)
│   ├── routers/                    # Modular Endpoint Controllers (11 Routers)
│   │   ├── system.py               # /api/health, /api/ready, /api/metadata
│   │   ├── lkpp.py                 # /api/lkpp/timeseries, /api/lkpp/indicators
│   │   ├── weekly.py               # /api/weekly/matrix, /api/weekly/trend
│   │   ├── custom_chart.py         # /api/custom-chart/series, /api/custom-chart/presets
│   │   ├── commodities.py          # /api/commodities/prices, /api/commodities/balance
│   │   ├── agri_calendar.py        # /api/agriculture/calendar, /api/agriculture/gis
│   │   ├── crosswalk.py            # /api/crosswalk/mapping
│   │   ├── search.py               # /api/search/indicators
│   │   ├── audit_export.py         # /api/export/lkpp, /api/export/weekly
│   │   └── ingestion.py            # /api/ingest/pipeline
│   ├── services/                   # Domain Business Logic & Analytic Engine
│   │   ├── lkpp_service.py
│   │   ├── weekly_service.py
│   │   ├── custom_chart_service.py
│   │   ├── commodities_service.py
│   │   └── audit_service.py
│   └── tests/                      # Automated Unit Tests (100% Passed)
│       ├── test_lkpp.py
│       ├── test_weekly.py
│       ├── test_custom_chart.py
│       └── test_system.py
├── frontend/                       # Modern Responsive Web UI (Vanilla JS + CSS3)
├── data/                           # Berkas Database Sekunder & Excel LKPP
├── index.html                      # Smart Launchpad Portal & Auto-Redirect
├── run_server.bat                  # Skrip Launcher Mode Terminal
├── run_server.ps1                  # Skrip Launcher PowerShell
├── start_background.vbs            # Skrip Launcher Mode Latar Belakang (Silent)
└── stop_server.bat                 # Skrip Penghenti Server
```

---

## 📡 Ringkasan API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Status kesehatan server, total indikator, dan dataset |
| `GET` | `/api/lkpp/timeseries` | Serial waktu data LKPP (1990–2026) |
| `GET` | `/api/weekly/institutions` | Daftar institusi rilis mingguan (BI, DJPb, OJK, Bapanas) |
| `GET` | `/api/weekly/matrix` | Matriks pivot indikator mingguan |
| `GET` | `/api/weekly/trend` | Tren mingguan, Median Olahan, L3M, L12W Min/Max, WoW/MoM/YoY |
| `GET` | `/api/custom-chart/series` | Data seri terintegrasi untuk studio grafik |
| `GET` | `/api/commodities/prices` | Harga harian & mingguan komoditas pangan pokok |
| `GET` | `/api/agriculture/calendar` | Kalender musim tanam dan panen komoditas nasional |

---

## 🧪 Pengujian Otomatis

Seluruh modul backend telah dilengkapi pengujian otomatis menggunakan `pytest`:
```bash
# Menjalankan seluruh pengujian unit
.venv\Scripts\python.exe -m pytest backend/tests/ -v
```
**Hasil**: `75 passed in 0.85s (100% SUCCESS)`

---

## 🏛️ Lisensi & Hak Cipta

&copy; 2026 **INDOEKONOMI data** &middot; Republik Indonesia. Seluruh hak cipta dilindungi undang-undang.
*Digunakan untuk mendukung perumusan rekomendasi kebijakan ekonomi nasional berbasis bukti (evidence-based policymaking).*
