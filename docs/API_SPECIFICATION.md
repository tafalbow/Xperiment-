# Spesifikasi REST API: Pusat Basis Data Data Sekunder

Seluruh endpoint REST API diimplementasikan menggunakan framework **FastAPI** dengan dokumentasi interaktif Swagger UI pada `/docs`.

---

## 1. System Health
- **`GET /api/health`**
  - Mengembalikan status kesehatan basis data, total observasi, indikator master, dan dataset aktif.

## 2. Filtering & Observations
- **`GET /api/filter-options`**
  - Mengembalikan hierarki: `Sektor` $\rightarrow$ `Kategori` $\rightarrow$ `Subkategori` $\rightarrow$ `Indikator`, serta daftar lembaga sumber resmi.
- **`GET /api/observations`**
  - **Query Parameters:**
    - `sector` (string, optional)
    - `category` (string, optional)
    - `subcategory` (string, optional)
    - `indicator_id` (string, optional)
    - `start_year` (integer, optional)
    - `end_year` (integer, optional)
    - `source_id` (string, optional)
    - `status` (string, optional: `Observed`, `Provisional`, `Revised`, `N/A`)
    - `search_keyword` (string, optional)
    - `limit` (integer, default 50)
    - `offset` (integer, default 0)
    - `sort_by` (string: `period`, `value`, `indicator_name`, `status`)
    - `sort_order` (string: `ASC`, `DESC`)
  - **Response:** Total records, page info, dan daftar observasi tingkat nasional bersitasi lengkap.

## 3. Analytics & KPIs
- **`GET /api/kpi/{indicator_id}`**
  - Mengembalikan ringkasan KPI deskriptif: Nilai Terkini, Periode Sebelumnya, Pertumbuhan YoY (%), YoY Absolut, Nilai Tertinggi, Nilai Terendah, dan Rata-Rata Nasional.

## 4. Data Provenance & Metadata
- **`GET /api/provenance/{observation_id}`**
  - Menelusuri rantai asal-usul data: Observasi $\rightarrow$ Indikator $\rightarrow$ Publikasi $\rightarrow$ Lembaga Sumber $\rightarrow$ URL $\rightarrow$ Halaman/Tabel $\rightarrow$ Riwayat Versi.
- **`GET /api/metadata/{indicator_id}`**
  - Mengembalikan 24 atribut metadata terstandarisasi.
- **`GET /api/metadata/catalog`**
  - Mengembalikan katalog metadata seluruh indikator.

## 5. Source Registry, Crosswalk, & Contextual GIS
- **`GET /api/sources`**
  - Daftar lembaga sumber resmi, format berkas, frekuensi, dan metode pembaruan.
- **`GET /api/contextual-drivers`**
  - Catatan wilayah pendorong kontekstual dari dokumen resmi (bukan data observasi provinsi).
- **`GET /api/crosswalk`**
  - Aturan harmonisasi klasifikasi APBN/LKPP pra-2005 dan pasca-2005.

## 6. Audit Trails & Ingestion
- **`GET /api/revision-history`**
  - Log audit versi revisi nilai.
- **`GET /api/validation-logs`**
  - Log audit mutu data hasil validasi.
- **`GET /api/update-logs`**
  - Log riwayat eksekusi pipeline ingestion.
- **`POST /api/ingestion/run`**
  - Memicu eksekusi konektor ingestion resmi (API, CSV, PDF).
- **`POST /api/ingestion/batch`**
  - Mengirim payload batch kustom untuk divalidasi dan disimpan ke repositori.
