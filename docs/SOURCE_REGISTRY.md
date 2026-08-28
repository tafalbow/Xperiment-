# Source Registry: Katalog Lembaga Sumber Resmi

Modul **Source Registry** mencatat seluruh instansi resmi penyedia data sekunder tingkat nasional yang terhubung ke platform:

| Source ID | Nama Lembaga | Tipe Institusi | Dataset Utama | Tipe Format | Frekuensi | Metode Update | Status |
|---|---|---|---|---|---|---|---|
| `SRC-BPS` | Badan Pusat Statistik (BPS) | LPNK | PDB, Inflasi, Tenaga Kerja, Perdagangan | API | Bulanan / Triwulanan / Tahunan | Automated Ingestion | Active |
| `SRC-KEMENKEU-DJP` | Ditjen Pajak - Kemenkeu | Ditjen Kementerian | Penerimaan Perpajakan Nasional | CSV | Bulanan / Tahunan | Batch Import | Active |
| `SRC-KEMENKEU-LKPP` | Kementerian Keuangan RI | Kementerian Negara | LKPP Audited BPK (Lampiran 1.A) | PDF | Tahunan | PDF Extractor | Active |
| `SRC-DPR-UUAPBN` | DPR RI & Presiden RI | Lembaga Negara | Alokasi & Target UU APBN | PDF | Tahunan | Legal Extraction | Active |
| `SRC-KEMENKEU-BKF` | Badan Kebijakan Fiskal | Badan Kementerian | Realisasi APBN KiTa Tahun Berjalan | PDF | Bulanan | Provisional Tracker | Active |
| `SRC-BI` | Bank Indonesia | Bank Sentral | SEKI, Cadangan Devisa, Suku Bunga | API | Bulanan | Automated Ingestion | Active |
| `SRC-KEMENTAN` | Kementerian Pertanian RI | Kementerian Negara | Produksi Pangan Pokok (KSA) | Excel | Tahunan | Batch Import | Active |
| `SRC-ESDM` | Kementerian ESDM RI | Kementerian Negara | Lifting Migas, Minerba & Kelistrikan | HTML/Web | Bulanan / Tahunan | Web Parser | Active |
| `SRC-WORLDBANK` | World Bank Group | Lembaga Internasional | WDI Indonesia Macro Series | API | Tahunan | External Pull | Active |
