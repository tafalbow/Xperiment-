# Arsitektur Sistem: Pusat Basis Data Data Sekunder "Pergerakan Ekonomi Indonesia"

## 1. Ringkasan Eksekutif

Platform **Pergerakan Ekonomi Indonesia** dirancang sebagai repositori terpusat data sekunder tingkat nasional yang memenuhi prinsip **Data Governance, Keterlacakan (Provenance), dan Transparansi Metodologi**.

Target pengguna:
- Analis Kebijakan Pemerintah
- Peneliti Ekonomi & Sektoral
- Policy Analyst
- Data Analyst

---

## 2. Diagram Alur Data & Tata Kelola

```text
+-------------------------------------------------------------------------------+
|                         SUMBER RESMI PEMERINTAH RI                           |
| BPS • Kemenkeu (DJP/DJBC/BKF) • Bank Indonesia • LKPP • UU APBN • Kementan... |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                       INGESTION & GOVERNANCE PIPELINE                         |
|                                                                               |
|  1. Source Registry (Katalog Sumber Resmi & Frekuensi)                        |
|  2. Connectors (API, CSV, Excel, PDF Table Extractor, Web HTML)               |
|  3. Data Validator (10 Aturan Mutu: Format, Scope, Unit, Logika, Anti-AI)    |
|  4. Classification Crosswalk (Harmonisasi Klasifikasi Historis APBN)          |
|  5. Versioning Engine (Audit Lineage Revisi Data Tanpa Hapus Nilai Lama)      |
|  6. Audit Logger (Pencatatan Update Logs & Validation Logs)                   |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                      BASIS DATA NASIONAL (SQLite RELASIONAL)                  |
|  - sources & publications          - observations (National Scope Only)      |
|  - datasets & indicators           - contextual_driver_information (GIS Notes)|
|  - metadata (24 Atribut)           - classification_crosswalk & data_versions |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                       APPLICATION & REST API LAYER (FastAPI)                  |
|  - /api/observations (Filtering, Sorting, Pagination)                         |
|  - /api/kpi/{id} (Descriptive KPIs, No Fabricated Surplus/Deficit)            |
|  - /api/provenance/{id} (Telusur Asal-Usul Angka & Sitasi Resmi)              |
|  - /api/contextual-drivers (Catatan Wilayah Penjelas Data Nasional)           |
|  - /api/metadata & /api/crosswalk & /api/sources                              |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                     PRESENTATION LAYER ("Barely There UI")                    |
|  - Header GovTech & Live Sync Indicator                                       |
|  - Panel Filter Multidimensi (Sektor -> Kategori -> Subkategori -> Indikator) |
|  - Kartu Ringkasan KPI Deskriptif                                             |
|  - Visualisasi Grafik Garis Tren & Grafik Batang Komparasi                    |
|  - Peta Interaktif Kontekstual GIS (Highlight Provinsi Pendorong)             |
|  - Tabular Data Grid dengan Tombol Lineage & Metadata Modal                   |
+-------------------------------------------------------------------------------+
```

---

## 3. Prinsip Kunci Data Governance

1. **National Scope Enforcement**: Seluruh observasi pada tabel `observations` dijamin berada pada tingkat nasional (`Indonesia`). Tidak ada rekaman tingkat provinsi atau kabupaten pada tabel observasi utama.
2. **Contextual Drivers as Explanatory Notes**: Informasi provinsi hanya disimpan pada tabel `contextual_driver_information` apabila publikasi resmi secara eksplisit menyebutkan provinsi tertentu sebagai pendorong perubahan angka nasional.
3. **Strict Prohibition of Estimations**: Tidak ada peramalan (forecasting), proyeksi masa depan, imputasi otomatis, atau interpolasi. Periode kosong ditandai `N/A — Data belum tersedia`.
4. **Data Provenance & Traceability**: Setiap angka dapat ditelusuri ke dokumen publikasi resmi, nomor dokumen, lembaga penerbit, tanggal rilis, tautan web resmi, nomor halaman, dan nomor tabel.
5. **Audited APBN vs Provisional APBN Kita**:
   - Realisasi tahun lampau bersumber dari **LKPP Audited BPK RI** (Status: `Observed`).
   - Realisasi tahun berjalan bersumber dari **APBN KiTa Kemenkeu** (Status: `Provisional`).
   - Perubahan nilai otomatis dicatat pada tabel `data_versions`.
