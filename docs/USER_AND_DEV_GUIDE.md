# Panduan Pengguna & Pengembang (User & Developer Guide)

Aplikasi **"Pergerakan Ekonomi Indonesia"** dirancang siap dijalankan langsung secara lokal menggunakan runtime Python 3.12 (via `uv` atau Python standar) dengan arsitektur modular terpisah antara Backend (FastAPI), Data Layer (SQLite), dan Frontend (Barely-There UI GovTech).

---

## 1. Persyaratan Sistem

- **Sistem Operasi:** Windows / Linux / macOS
- **Runtime:** Python 3.10+ (atau via launcher `uv`)
- **Web Browser:** Google Chrome, Microsoft Edge, Mozilla Firefox, Safari (Modern ES Modules supported)

---

## 2. Struktur Direktori Proyek

```text
ProjectDEN/
├── backend/
│   ├── app.py                      # Router utama REST API & Static files mount
│   ├── config.py                   # Konfigurasi sistem & batas status
│   ├── database/
│   │   ├── connection.py           # SQLite manager dengan WAL mode
│   │   ├── schema.sql              # DDL 11 tabel utama
│   │   └── seed_data.py            # Seeder data historis nasional 1993-2024+
│   ├── models/schemas.py           # Skema Pydantic request/response
│   ├── validation/                 # Engine & 10 Aturan Validasi Kualitas
│   ├── ingestion/                  # Konektor Ingestion (API, CSV, PDF)
│   ├── services/                   # Service layer (Search, Metadata, Crosswalk, Audit)
│   └── tests/                      # Pytest automated test suites
├── frontend/
│   ├── index.html                  # Antarmuka GovTech "Barely There UI"
│   ├── styles/style.css            # Tipografi arsitektural & grid minimalis
│   ├── components/                 # Modul UI (Header, Filter, KPI, Chart, Data Grid, GIS Map, Modals)
│   ├── services/api_client.js      # Client komunikasi API
│   └── app.js                      # Controller utama frontend
├── data/
│   ├── national_data.db            # Basis data SQLite aktif
│   ├── sample/                     # Ekspor data sampel JSON 1993-2024+
│   └── metadata/                   # Kamus metadata master
├── docs/                           # Dokumentasi arsitektur, API, kamus data & crosswalk
└── run_server.py                   # Launcher server mandiri
```

---

## 3. Petunjuk Menjalankan Server Lokal (Run Instructions)

Jalankan perintah berikut di terminal:

```powershell
# Jalankan server dengan Python via uv
& "C:\Users\lubis\AppData\Local\Programs\Anki\uv.exe" run --python 3.12 --with fastapi --with uvicorn python run_server.py
```

Atau menggunakan python standar:

```bash
python run_server.py
```

Setelah server aktif:
- **Aplikasi Web:** Buka browser dan akses **`http://127.0.0.1:8000`**
- **Dokumentasi Interaktif API (Swagger UI):** Akses **`http://127.0.0.1:8000/docs`**

---

## 4. Petunjuk Pengujian Otomatis (Testing Instructions)

Untuk menjalankan seluruh rangkaian uji otomatis (API, aturan validasi, penolakan estimasi/forecast, scope nasional, dan crosswalk APBN):

```powershell
$env:PYTHONPATH="."
& "C:\Users\lubis\AppData\Local\Programs\Anki\uv.exe" run --python 3.12 --with fastapi --with uvicorn --with httpx --with pytest python -m pytest backend/tests/ -v
```

Hasil uji yang diharapkan:
- `test_health_check`: Memastikan koneksi database dan scope nasional
- `test_filter_options`: Memastikan pemuatan hierarki multisektor
- `test_query_observations`: Memastikan seluruh observasi berlevel `Indonesia`
- `test_kpi_summary`: Memastikan perhitungan KPI deskriptif akurat
- `test_provenance_trace`: Memastikan keterlacakan data ke publikasi resmi
- `test_national_geography_validator`: Memastikan penolakan level provinsi pada tabel observasi
- `test_status_validator_prohibits_forecast`: Memastikan penolakan status `Estimated`/`Forecast`
- `test_crosswalk_retrieval`: Memastikan aturan harmonisasi APBN pra-2005 termuat
