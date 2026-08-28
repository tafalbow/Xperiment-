# Modul Harmonisasi Klasifikasi APBN (Classification Crosswalk)

## 1. Latar Belakang Perubahan Struktur APBN Indonesia

Sebelum berlakunya **Undang-Undang Nomor 17 Tahun 2003 tentang Keuangan Negara**, struktur APBN Indonesia menggunakan klasifikasi tradisional:
1. **Belanja Rutin**: Belanja Pegawai, Belanja Barang, Subsidi, Bunga Utang, dan Pengeluaran Rutin Lainnya.
2. **Belanja Pembangunan**: Proyek-proyek fisik sektoral, bantuan pembangunan daerah (Inpres), dan pembiayaan proyek.

Pasca berlakunya UU 17/2003 dan implementasi *Government Finance Statistics (GFS)* modern mulai TA 2005, anggaran disatukan (*unified budget*) menjadi klasifikasi ekonomi 8 jenis belanja:
1. Belanja Pegawai (Akun 51)
2. Belanja Barang (Akun 52)
3. Belanja Modal (Akun 53)
4. Pembayaran Bunga Utang (Akun 54)
5. Belanja Subsidi (Akun 55)
6. Belanja Hibah (Akun 56)
7. Bantuan Sosial (Akun 57)
8. Belanja Lain-lain (Akun 58)
serta komponen terpisah **Transfer ke Daerah dan Dana Desa (TKD)**.

---

## 2. Tabel Pemetaan Harmonisasi (Crosswalk Mapping)

| Sektor | Klasifikasi Dokumen Asli (Pra-2005) | Klasifikasi Standar Modern | Aturan Pemetaan (Mapping Rule) | Periode Berlaku | Catatan Transformasi |
|---|---|---|---|---|---|
| Fiskal / Belanja Negara | Belanja Rutin - Belanja Pegawai | Belanja Pegawai (Jenis Belanja 51) | Harmonisasi UU 17/2003 | 1993 - 2004 | Mencakup gaji pokok, tunjangan, dan honorarium tetap kementerian/lembaga. |
| Fiskal / Belanja Negara | Belanja Rutin - Belanja Barang | Belanja Barang (Jenis Belanja 52) | Harmonisasi UU 17/2003 | 1993 - 2004 | Mencakup belanja operasional perkantoran, pemeliharaan gedung/kendaraan, dan dinas. |
| Fiskal / Belanja Negara | Belanja Pembangunan - Proyek Fisik | Belanja Modal (Jenis Belanja 53) | Harmonisasi UU 17/2003 | 1993 - 2004 | Reklasifikasi anggaran proyek fisik penambah aset tetap negara menjadi belanja modal. |
| Fiskal / Belanja Negara | Belanja Rutin - Subsidi Komoditas | Belanja Subsidi (Jenis Belanja 55) | Harmonisasi UU 17/2003 | 1993 - 2004 | Pemisahan pos subsidi energi (BBM/LPG/Listrik) dan non-energi (Pupuk/PSO). |
| Fiskal / Belanja Negara | Pengeluaran Pembangunan - Bantuan Daerah | Transfer ke Daerah (TKD) | Harmonisasi UU 33/2004 | 1993 - 2004 | Transformasi Dana Inpres sektoral menjadi DAU, DBH, DAK, dan Otsus. |

---

## 3. Prinsip Perlindungan Integritas Data

> **Prinsip:** `Original Source Data -> Standardized National Data`

Data asli dokumen bersejarah **tidak pernah dihapus atau ditimpa**. Sistem menyimpan catatan klasifikasi asli beserta versi pemetaan (*mapping version*) sehingga analis kebijakan dapat memverifikasi dasar konversi kapan saja.
