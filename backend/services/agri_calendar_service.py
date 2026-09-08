"""
INDOEKONOMI data — Indonesia Economic Data Observatory
Agricultural Calendar Service: Kalender Musim Tanam, Pola Panen & Ritme Komoditas
==============================================================================
"""

import sqlite3
from typing import List, Dict, Any, Optional
from backend.database.connection import get_db

class AgriCalendarService:
    """
    Provides national agricultural seasonal calendar, planting/harvesting cycles,
    monthly commodity production rhythms, and agroclimatic contexts.
    """

    MONTH_NAMES = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ]

    # Pre-calculated statutory data for Indonesian seasonal crop calendar
    DEFAULT_CALENDAR_DATA = [
        # 1. PADI / BERAS
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 1,
            "month_name": "Januari",
            "season_stage": "Musim Tanam 1 (Rendeng) - Fase Vegetatif",
            "activity_intensity": "Tinggi",
            "production_share_pct": 5.2,
            "key_regions": "Pantura Jawa (Karawang, Subang, Indramayu), Jawa Timur (Lamongan, Ngawi), Sulsel (Sidrap)",
            "agroclimatic_factors": "Puncak curah hujan musim barat (Monsoon Barat), ketersediaan air irigasi melimpah.",
            "source_document": "Kementan — Pola Tanam Nasional & BPS Statistik Padi Luas Panen (KSA)"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 2,
            "month_name": "Februari",
            "season_stage": "Awal Panen Raya Musim Rendeng",
            "activity_intensity": "Tinggi",
            "production_share_pct": 9.8,
            "key_regions": "Jawa Tengah (Grobogan, Demak), Aceh (Aceh Besar, Pidie), NTB (Lombok)",
            "agroclimatic_factors": "Mulai transisi curah hujan, panen awal sawah tadah hujan dan irigasi setengah teknis.",
            "source_document": "BPS — Kerangka Sampel Area (KSA) Padi"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 3,
            "month_name": "Maret",
            "season_stage": "Puncak Panen Raya Nasional (Peak Harvest)",
            "activity_intensity": "Puncak Panen",
            "production_share_pct": 16.5,
            "key_regions": "Jawa Timur (Jember, Bojonegoro), Jawa Barat, Jawa Tengah, Lampung, Sumsel",
            "agroclimatic_factors": "Produksi bulanan tertinggi sepanjang tahun (~5.2 juta ton GKG), harga GKP di tingkat petani cenderung melandai.",
            "source_document": "Badan Pangan Nasional (Bapanas) — Prognosa Neraca Pangan & BPS"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 4,
            "month_name": "April",
            "season_stage": "Akhir Panen Raya & Olah Tanah Musim Tanam 2 (Gadu)",
            "activity_intensity": "Tinggi",
            "production_share_pct": 14.2,
            "key_regions": "Jawa Timur, Jawa Tengah, Jawa Barat, Sulawesi Selatan",
            "agroclimatic_factors": "Cadangan gabah petani maksimal, Bulog melakukan penyerapan CBP puncak.",
            "source_document": "Perum BULOG & Kementan"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 5,
            "month_name": "Mei",
            "season_stage": "Musim Tanam 2 (Gadu) - Fase Tanam",
            "activity_intensity": "Sedang",
            "production_share_pct": 7.4,
            "key_regions": "Lumbung Pangan Jawa & Sumatera Selatan, Kalsel",
            "agroclimatic_factors": "Mulai memasuki musim kemarau, pengairan mengandalkan waduk/bendungan teknis.",
            "source_document": "Kementan — Balai Besar Litbang Sumberdaya Lahan Pertanian"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 6,
            "month_name": "Juni",
            "season_stage": "Fase Vegetatif dan Pengisian Bulir MT 2",
            "activity_intensity": "Sedang",
            "production_share_pct": 6.8,
            "key_regions": "Sulawesi Selatan, NTB, Jawa Barat",
            "agroclimatic_factors": "Musim kemarau aktif; pemeliharaan intensif hama wereng dan kekeringan.",
            "source_document": "BMKG & Ditjen Tanaman Pangan"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 7,
            "month_name": "Juli",
            "season_stage": "Panen Musim Gadu (Second Harvest)",
            "activity_intensity": "Tinggi",
            "production_share_pct": 10.1,
            "key_regions": "Jawa Timur (Madiun, Tuban), Jawa Tengah (Sragen, Klaten), Sulsel (Bone, Pinrang)",
            "agroclimatic_factors": "Panen musim gadu menghasilkan gabah kadar air rendah berkualitas giling baik.",
            "source_document": "BPS — Laporan Bulanan Luas Panen dan Produksi"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 8,
            "month_name": "Agustus",
            "season_stage": "Akhir Panen Gadu & Sebagian Musim Tanam 3 (Palawija)",
            "activity_intensity": "Sedang",
            "production_share_pct": 8.9,
            "key_regions": "Sulawesi Selatan, Sumatera Utara, Lampung",
            "agroclimatic_factors": "Kondisi kering puncak (Monsoon Timur Australia). Sawah beririgasi teknis panen tuntas.",
            "source_document": "BPS & Kementan"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 9,
            "month_name": "September",
            "season_stage": "Masa Paceklik Awal (Lean Season Period)",
            "activity_intensity": "Rendah",
            "production_share_pct": 5.8,
            "key_regions": "Kalimantan Selatan, Sumatera Selatan (Lahan Rawa Lebak / Pasang Surut)",
            "agroclimatic_factors": "Pasokan panen dari sawah irigasi menurun drastis; panen beralih ke lahan lebak/rawa.",
            "source_document": "Bapanas — Kewaspadaan Pangan Nasional"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 10,
            "month_name": "Oktober",
            "season_stage": "Puncak Masa Paceklik & Olah Tanah MT 1 Rendeng",
            "activity_intensity": "Rendah",
            "production_share_pct": 4.9,
            "key_regions": "Sumatera Selatan (OKI, Banyuasin), Kalimantan Barat",
            "agroclimatic_factors": "Produksi bulanan terendah (~1.8 juta ton GKG). Stok cadangan beras Bulog dan stabilisasi SPHP diuji.",
            "source_document": "BPS & Badan Pangan Nasional"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 11,
            "month_name": "November",
            "season_stage": "Musim Tanam 1 (Rendeng) Serentak - Musim Hujan Tiba",
            "activity_intensity": "Tinggi",
            "production_share_pct": 4.7,
            "key_regions": "Pulau Jawa, Sumatera, Bali, NTB",
            "agroclimatic_factors": "Awal musim hujan; petani menyemai bibit dan membajak sawah serentak.",
            "source_document": "Kementan — Gerakan Nasional Tanam Serentak"
        },
        {
            "commodity_id": "COM-AGRI-001-BERAS",
            "commodity_name": "Padi / Beras (Oryza sativa)",
            "crop_category": "Tanaman Pangan Pokok",
            "month": 12,
            "month_name": "Desember",
            "season_stage": "Fase Tanam & Pemupukan Awal MT 1",
            "activity_intensity": "Tinggi",
            "production_share_pct": 5.5,
            "key_regions": "Jawa Barat, Jawa Tengah, Jawa Timur, Sulawesi Selatan",
            "agroclimatic_factors": "Curah hujan tinggi; distribusi pupuk subsidi dan benih unggul krusial.",
            "source_document": "Kementerian Pertanian & Pupuk Indonesia"
        },

        # 2. JAGUNG
        {
            "commodity_id": "COM-AGRI-002-JAGUNG",
            "commodity_name": "Jagung Pipil Kering (Zea mays)",
            "crop_category": "Tanaman Pangan & Pakan Ternak",
            "month": 2,
            "month_name": "Februari",
            "season_stage": "Panen Raya Jagung Musim Tanam Rendeng",
            "activity_intensity": "Puncak Panen",
            "production_share_pct": 17.5,
            "key_regions": "NTB (Dompu, Bima, Sumbawa), Jawa Timur (Tuban, Lamongan), Gorontalo",
            "agroclimatic_factors": "Puncak pasokan jagung pakan ternak nasional; harga di tingkat peternak unggas melandai.",
            "source_document": "Kementan & Gabungan Perusahaan Makanan Ternak (GPMT)"
        },
        {
            "commodity_id": "COM-AGRI-002-JAGUNG",
            "commodity_name": "Jagung Pipil Kering (Zea mays)",
            "crop_category": "Tanaman Pangan & Pakan Ternak",
            "month": 3,
            "month_name": "Maret",
            "season_stage": "Panen Raya Lanjutan",
            "activity_intensity": "Tinggi",
            "production_share_pct": 16.0,
            "key_regions": "Jawa Tengah (Grobogan), Lampung (Lampung Selatan, Lampung Timur)",
            "agroclimatic_factors": "Pengeringan jagung (dryer) beroperasi kapasitas penuh.",
            "source_document": "Kementan Ditjen Tanaman Pangan"
        },
        {
            "commodity_id": "COM-AGRI-002-JAGUNG",
            "commodity_name": "Jagung Pipil Kering (Zea mays)",
            "crop_category": "Tanaman Pangan & Pakan Ternak",
            "month": 7,
            "month_name": "Juli",
            "season_stage": "Panen Jagung Musim Kemarau (Gadu)",
            "activity_intensity": "Sedang",
            "production_share_pct": 11.2,
            "key_regions": "Jawa Timur, Sulawesi Selatan, NTT",
            "agroclimatic_factors": "Kadar air pipilan rendah (14-15%), kualitas pakan sangat baik.",
            "source_document": "BPS Statistik Tanaman Pangan"
        },

        # 3. CABAI RAWIT & CABAI MERAH
        {
            "commodity_id": "COM-AGRI-004-CABAI",
            "commodity_name": "Cabai Rawit Merah (Capsicum frutescens)",
            "crop_category": "Hortikultura Strategis (Volatile Food)",
            "month": 3,
            "month_name": "Maret",
            "season_stage": "Puncak Pasokan Musim Panen Awal",
            "activity_intensity": "Tinggi",
            "production_share_pct": 12.8,
            "key_regions": "Jawa Timur (Kediri, Blitar, Tuban), NTB (Lombok Timur), Sulsel",
            "agroclimatic_factors": "Pasokan memuncak; tekanan inflasi komoditas cabai mereda.",
            "source_document": "BPS & Bank Indonesia Indeks Harga Konsumen (IHK)"
        },
        {
            "commodity_id": "COM-AGRI-004-CABAI",
            "commodity_name": "Cabai Rawit Merah (Capsicum frutescens)",
            "crop_category": "Hortikultura Strategis (Volatile Food)",
            "month": 11,
            "month_name": "November",
            "season_stage": "Kerentanan Musim Hujan (Penyakit Antraknosa & Busuk Buah)",
            "activity_intensity": "Rendah",
            "production_share_pct": 5.4,
            "key_regions": "Jawa Barat (Garut, Sukabumi), Jawa Tengah (Temanggung, Magelang)",
            "agroclimatic_factors": "Curah hujan tinggi menyebabkan kerontokan bunga dan serangan jamur; sering menjadi penyumbang utama inflasi bulanan.",
            "source_document": "Kementan Ditjen Hortikultura & BPS"
        },

        # 4. BAWANG MERAH
        {
            "commodity_id": "COM-AGRI-005-BAWANG",
            "commodity_name": "Bawang Merah (Allium cepa var. ascalonicum)",
            "crop_category": "Hortikultura Strategis (Volatile Food)",
            "month": 7,
            "month_name": "Juli",
            "season_stage": "Panen Raya Bawang Merah Musim Kemarau",
            "activity_intensity": "Puncak Panen",
            "production_share_pct": 15.6,
            "key_regions": "Brebes (Jawa Tengah), Nganjuk (Jawa Timur), Bima (NTB), Enrekang (Sulsel)",
            "agroclimatic_factors": "Iklim kering optimal; hasil umbi berbobot padat dan daya simpan lama.",
            "source_document": "BPS & Asosiasi Bawang Merah Indonesia (ABMI)"
        },
        {
            "commodity_id": "COM-AGRI-005-BAWANG",
            "commodity_name": "Bawang Merah (Allium cepa var. ascalonicum)",
            "crop_category": "Hortikultura Strategis (Volatile Food)",
            "month": 8,
            "month_name": "Agustus",
            "season_stage": "Panen Raya Lanjutan Brebes & Bima",
            "activity_intensity": "Tinggi",
            "production_share_pct": 14.8,
            "key_regions": "Brebes, Demak, Bima, Probolinggo",
            "agroclimatic_factors": "Surplus produksi regional dikirimkan ke pasar induk Jabodetabek (Pasar Induk Kramat Jati).",
            "source_document": "Bapanas & Kementan"
        },

        # 5. KELAPA SAWIT (CPO)
        {
            "commodity_id": "COM-PLANT-001-SAWIT",
            "commodity_name": "Kelapa Sawit / Minyak Sawit Mentah (CPO)",
            "crop_category": "Perkebunan & Komoditas Ekspor",
            "month": 9,
            "month_name": "September",
            "season_stage": "Puncak Panen Tandan Buah Segar (TBS) Musim Puncak",
            "activity_intensity": "Puncak Panen",
            "production_share_pct": 11.5,
            "key_regions": "Riau, Sumatera Utara, Sumatera Selatan, Kalimantan Tengah, Kalimantan Barat",
            "agroclimatic_factors": "Produksi bulanan TBS mencapai puncaknya (musim panen raya kelapa sawit).",
            "source_document": "GAPKI (Gabungan Pengusaha Kelapa Sawit Indonesia) & Ditjen Perkebunan"
        },
        {
            "commodity_id": "COM-PLANT-001-SAWIT",
            "commodity_name": "Kelapa Sawit / Minyak Sawit Mentah (CPO)",
            "crop_category": "Perkebunan & Komoditas Ekspor",
            "month": 2,
            "month_name": "Februari",
            "season_stage": "Musim Trek (Siklus Penurunan Produksi Alami)",
            "activity_intensity": "Rendah",
            "production_share_pct": 6.2,
            "key_regions": "Sumatera dan Kalimantan",
            "agroclimatic_factors": "Siklus biologis tanaman pasca panen raya dan musim kemarau sebelumnya.",
            "source_document": "GAPKI & BPS Statistik Kelapa Sawit"
        }
    ]

    @classmethod
    def get_calendar_matrix(
        cls,
        commodity_id: Optional[str] = None,
        crop_category: Optional[str] = None,
        month: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Retrieves calendar matrix filtered by commodity, category, or month.
        Queries database first, falls back to canonical default dataset.
        """
        try:
            with get_db() as conn:
                cur = conn.cursor()
                query = "SELECT * FROM agricultural_calendar WHERE 1=1"
                params = []
                if commodity_id:
                    query += " AND commodity_id = ?"
                    params.append(commodity_id)
                if crop_category:
                    query += " AND crop_category LIKE ?"
                    params.append(f"%{crop_category}%")
                if month:
                    query += " AND month = ?"
                    params.append(month)
                query += " ORDER BY commodity_name ASC, month ASC"
                cur.execute(query, params)
                rows = [dict(r) for r in cur.fetchall()]
                if rows:
                    return rows
        except Exception:
            pass

        # Fallback in-memory filter
        filtered = cls.DEFAULT_CALENDAR_DATA
        if commodity_id:
            filtered = [c for c in filtered if c["commodity_id"] == commodity_id]
        if crop_category:
            filtered = [c for c in filtered if crop_category.lower() in c["crop_category"].lower()]
        if month:
            filtered = [c for c in filtered if c["month"] == month]
        return filtered

    @classmethod
    def get_calendar_summary(cls) -> Dict[str, Any]:
        """Provides high-level dashboard metrics for the Agricultural Calendar tab."""
        return {
            "title": "Kalender Musim Tanam & Pola Panen Komoditas Strategis Nasional",
            "authority": "Kementerian Pertanian RI • Badan Pangan Nasional • BPS",
            "statutory_basis": "Undang-Undang No. 18/2012 tentang Pangan & Permentan Pola Tanam Nasional",
            "active_month": "September",
            "current_season_narrative": (
                "Bulan September merupakan fase transisi krusial di sektor pangan nasional: "
                "1) Padi: Memasuki masa paceklik (lean season) dengan panen sawah irigasi menyusut (~5.8% produksi tahunan), beralih ke panen sawah pasang surut & lebak di Sumsel/Kalsel. "
                "2) Kelapa Sawit: Berada pada puncak produksi panen raya TBS di Riau dan Kalteng. "
                "3) Hortikultura: Bawang merah Brebes & Bima pasca panen raya dengan stok gudang memadai, sedangkan cabai rawit mulai mempersiapkan persemaian MT Rendeng."
            ),
            "commodities_covered": [
                {"id": "COM-AGRI-001-BERAS", "name": "Padi / Beras", "category": "Tanaman Pangan"},
                {"id": "COM-AGRI-002-JAGUNG", "name": "Jagung Pipil Kering", "category": "Tanaman Pangan"},
                {"id": "COM-AGRI-004-CABAI", "name": "Cabai Rawit & Merah", "category": "Hortikultura"},
                {"id": "COM-AGRI-005-BAWANG", "name": "Bawang Merah", "category": "Hortikultura"},
                {"id": "COM-PLANT-001-SAWIT", "name": "Kelapa Sawit (CPO)", "category": "Perkebunan"}
            ],
            "peak_harvest_months": {
                "Padi / Beras": "Februari – April (Panen Raya Rendeng) & Juli (Panen Gadu)",
                "Jagung": "Februari – Maret & Juli",
                "Bawang Merah": "Juli – Agustus (Brebes, Nganjuk, Bima)",
                "Cabai Rawit": "Maret – Mei",
                "Kelapa Sawit": "September – November (Puncak TBS)"
            },
            "lean_period_warning": {
                "Padi / Beras": "September – November (Paceklik Nasional - Kebutuhan Intervensi Cadangan Beras Pemerintah/CBP)"
            }
        }

    # ==========================================================================
    # COMMODITY SPECIFICATIONS FOR PLANTING RECOMMENDATIONS
    # ==========================================================================
    COMMODITY_SPECS = {
        "JAGUNG": {
            "id": "JAGUNG",
            "aliases": ["COM-AGRI-002-JAGUNG", "JAGUNG_PIPIL", "jagung"],
            "name": "Jagung Pipil Hibrida",
            "latin_name": "Zea mays",
            "icon": "🌽",
            "category": "Palawija & Pakan Ternak",
            "growth_duration_months": 3.5,
            "avg_yield_ton_ha": 7.2,
            "base_price_kg": 6200,
            "optimal_rainfall_mm": [90, 200],
            "national_status": "Pilar Utama Pakan Ternak Unggas & Bioetanol (Kementan & GPMT)",
            "standard_varieties": "Bisi-18, Pioneer P35, NK-212, Pertiwi-3, Sukmaraga"
        },
        "PADI_BERAS": {
            "id": "PADI_BERAS",
            "aliases": ["COM-AGRI-001-BERAS", "PADI", "padi", "beras"],
            "name": "Padi Sawah / Beras",
            "latin_name": "Oryza sativa",
            "icon": "🌾",
            "category": "Tanaman Pangan Pokok",
            "growth_duration_months": 4.0,
            "avg_yield_ton_ha": 5.8,
            "base_price_kg": 13500,
            "optimal_rainfall_mm": [160, 320],
            "national_status": "Komoditas Pokok Pengendali Inflasi Pangan (Bobot IHK Tertinggi)",
            "standard_varieties": "Inpari 32, Ciherang, Mekongga, Inpari 42 GSR, Situ Bagendit"
        },
        "CABAI_RAWIT": {
            "id": "CABAI_RAWIT",
            "aliases": ["COM-AGRI-004-CABAI", "CABAI", "cabai"],
            "name": "Cabai Rawit & Cabai Merah",
            "latin_name": "Capsicum frutescens / annuum",
            "icon": "🌶️",
            "category": "Hortikultura Strategis",
            "growth_duration_months": 3.0,
            "avg_yield_ton_ha": 9.2,
            "base_price_kg": 45000,
            "optimal_rainfall_mm": [100, 180],
            "national_status": "Pemicu Utama Volatile Food Inflasi Nasional (Peringatan Dini DEN)",
            "standard_varieties": "Ori 212, Bhaskara, Kencana, TM 999, Lado F1"
        },
        "BAWANG_MERAH": {
            "id": "BAWANG_MERAH",
            "aliases": ["COM-AGRI-005-BAWANG", "BAWANG", "bawang"],
            "name": "Bawang Merah Lokal Super",
            "latin_name": "Allium cepa var. ascalonicum",
            "icon": "🧅",
            "category": "Hortikultura Strategis",
            "growth_duration_months": 2.0,
            "avg_yield_ton_ha": 11.5,
            "base_price_kg": 32000,
            "optimal_rainfall_mm": [70, 150],
            "national_status": "Komoditas Sensitif Inflasi Musiman (Sentra Brebes, Nganjuk, Bima)",
            "standard_varieties": "Bima Brebes, Tajuk, Bauji, Super Philip, Sanren F1"
        },
        "KEDELAI": {
            "id": "KEDELAI",
            "aliases": ["COM-AGRI-003-KEDELAI", "kedelai"],
            "name": "Kedelai Bebas GMO",
            "latin_name": "Glycine max",
            "icon": "🌱",
            "category": "Palawija Strategis",
            "growth_duration_months": 3.0,
            "avg_yield_ton_ha": 2.2,
            "base_price_kg": 12800,
            "optimal_rainfall_mm": [90, 170],
            "national_status": "Program Substitusi Impor Pangan Berprotein Nabati Rakyat",
            "standard_varieties": "Anjasmoro, Grobogan, Dega 1, Devon 1, Biosoy"
        },
        "BAWANG_PUTIH": {
            "id": "BAWANG_PUTIH",
            "aliases": ["COM-AGRI-006-BAWANGPUTIH", "bawang_putih"],
            "name": "Bawang Putih Dataran Tinggi",
            "latin_name": "Allium sativum",
            "icon": "🧄",
            "category": "Hortikultura Khusus",
            "growth_duration_months": 3.5,
            "avg_yield_ton_ha": 8.5,
            "base_price_kg": 38000,
            "optimal_rainfall_mm": [80, 160],
            "national_status": "Prioritas Substitusi Impor Nasional (>800 mdpl)",
            "standard_varieties": "Lumbu Hijau, Lumbu Kuning, Tawangmangu Baru, Sangga Sembalun"
        },
        "KELAPA_SAWIT": {
            "id": "KELAPA_SAWIT",
            "aliases": ["COM-PLANT-001-SAWIT", "SAWIT", "sawit"],
            "name": "Kelapa Sawit (TBS / CPO)",
            "latin_name": "Elaeis guineensis",
            "icon": "🌴",
            "category": "Perkebunan & Bioenergi",
            "growth_duration_months": 6.0,
            "avg_yield_ton_ha": 22.0,
            "base_price_kg": 2850,
            "optimal_rainfall_mm": [150, 280],
            "national_status": "Penopang Mandatori Biodiesel B35/B40 & Devisa Ekspor Utama",
            "standard_varieties": "Tenera Dami, DxP Socfindo, DxP Marihat, DxP Sriwijaya"
        },
        "TEBU": {
            "id": "TEBU",
            "aliases": ["COM-AGRI-007-TEBU", "tebu"],
            "name": "Tebu (Gula & Bioetanol)",
            "latin_name": "Saccharum officinarum",
            "icon": "🎋",
            "category": "Pangan & Bioenergi",
            "growth_duration_months": 11.0,
            "avg_yield_ton_ha": 75.0,
            "base_price_kg": 16500,
            "optimal_rainfall_mm": [120, 220],
            "national_status": "Swasembada Gula Konsumsi & Bioetanol E5/E10 DEN",
            "standard_varieties": "Bululawang (BL), PS 881, Kidang Kencana, Cenning, Kentung"
        },
        "UBI_KAYU": {
            "id": "UBI_KAYU",
            "aliases": ["COM-AGRI-008-UBIKAYU", "singkong", "ubi_kayu"],
            "name": "Ubi Kayu / Singkong Industri",
            "latin_name": "Manihot esculenta",
            "icon": "🥔",
            "category": "Pangan & Pati Tapioka",
            "growth_duration_months": 8.0,
            "avg_yield_ton_ha": 28.0,
            "base_price_kg": 1800,
            "optimal_rainfall_mm": [70, 180],
            "national_status": "Ketahanan Pangan Lokal, Tepung Tapioka & Bioetanol Industri",
            "standard_varieties": "Casindo, Gajah, Adira 4, Malang 6, UJ 5 (Kasetsart)"
        },
        "KOPI": {
            "id": "KOPI",
            "aliases": ["COM-PLANT-002-KOPI", "kopi"],
            "name": "Kopi Spesialti (Arabika & Robusta)",
            "latin_name": "Coffea arabica / canephora",
            "icon": "☕",
            "category": "Perkebunan Ekspor Bernilai Tinggi",
            "growth_duration_months": 6.0,
            "avg_yield_ton_ha": 1.6,
            "base_price_kg": 95000,
            "optimal_rainfall_mm": [120, 240],
            "national_status": "Komoditas Unggulan Ekspor Premium & Dataran Tinggi",
            "standard_varieties": "Sigarar Utang, Andungsari 1, BP 436, Gayo 1, Kartika"
        }
    }

    # ==========================================================================
    # REGENCY GEODATA CATALOG (70+ KEY PRODUCTION DISTRICTS SE-INDONESIA)
    # ==========================================================================
    REGENCY_CATALOG = [
        # --- JAWA TENGAH ---
        {
            "id": "KAB-GROBOGAN", "name": "Kab. Grobogan", "province": "Jawa Tengah", "island": "JAWA",
            "lat": -7.0267, "lng": 110.9184, "elevation_m": 75, "soil_type": "Grumosol & Aluvial (pH 6.5)",
            "irrigation": "Irigasi Waduk Kedung Ombo & Pompa Sumur Dangkal",
            "crops": {
                "JAGUNG": {"suitability": 98, "land_ha": 68500, "plant": [9, 10, 11, 2, 3], "harvest": [1, 2, 6, 7], "grow": [12, 4, 5], "varieties": "Bisi-18, Pioneer P35, NK-212", "notes": "Lumbung jagung terbesar Jawa Tengah. Bulan September awal masa tanam MT 1 optimal menyambut pancaroba."},
                "PADI_BERAS": {"suitability": 92, "land_ha": 82000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 7, 8], "grow": [12, 1, 6], "varieties": "Inpari 32, Ciherang", "notes": "Sawah tadah hujan bersiap olah tanah MT 1 Rendeng di Oktober."},
                "KEDELAI": {"suitability": 95, "land_ha": 24000, "plant": [3, 4, 7, 8], "harvest": [6, 7, 10, 11], "grow": [5, 9], "varieties": "Grobogan (Unggul Lokal)", "notes": "Sentra varietas kedelai Grobogan berumur genjah 76 hari."},
                "BAWANG_MERAH": {"suitability": 84, "land_ha": 8500, "plant": [5, 6], "harvest": [7, 8], "grow": [6, 7], "varieties": "Tajuk", "notes": "Tanam musim kemarau di lahan berpasir sungai Lusi."}
            }
        },
        {
            "id": "KAB-TUBAN", "name": "Kab. Tuban", "province": "Jawa Timur", "island": "JAWA",
            "lat": -6.8976, "lng": 112.0649, "elevation_m": 45, "soil_type": "Mediteran Merah & Aluvial (pH 6.6)",
            "irrigation": "Irigasi Teknis Bengawan Solo & Embung Desa",
            "crops": {
                "JAGUNG": {"suitability": 97, "land_ha": 62000, "plant": [9, 10, 11, 2, 3], "harvest": [1, 2, 6, 7], "grow": [12, 4, 5], "varieties": "Pioneer P27, Bisi-2, NK-7328", "notes": "Sentra jagung Jawa Timur. September merupakan waktu terbaik penanaman awal MT 1 di perbukitan kapur utara."},
                "PADI_BERAS": {"suitability": 90, "land_ha": 58000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 7, 8], "grow": [12, 1, 6], "varieties": "Inpari 42 GSR", "notes": "Tadah hujan siap menyemai bibit di akhir September."},
                "CABAI_RAWIT": {"suitability": 88, "land_ha": 7200, "plant": [2, 3, 9, 10], "harvest": [5, 6, 12, 1], "grow": [4, 11], "varieties": "Ori 212, Bhaskara", "notes": "Kawasan pesisir utara dan perbukitan kapur sangat sesuai untuk cabai rawit merah."},
                "UBI_KAYU": {"suitability": 92, "land_ha": 18000, "plant": [10, 11], "harvest": [7, 8], "grow": [12, 1, 2, 3, 4, 5, 6], "varieties": "Malang 6", "notes": "Lahan tegalan berbatu subur untuk singkong industri tapioka."}
            }
        },
        {
            "id": "KAB-LAMONGAN", "name": "Kab. Lamongan", "province": "Jawa Timur", "island": "JAWA",
            "lat": -7.1283, "lng": 112.4131, "elevation_m": 25, "soil_type": "Aluvial & Grumosol Rawa (pH 6.8)",
            "irrigation": "Sistem Rawa Bengawan Jero & Waduk Gondang",
            "crops": {
                "JAGUNG": {"suitability": 96, "land_ha": 54000, "plant": [9, 10, 11, 2], "harvest": [1, 2, 5, 6], "grow": [12, 3, 4], "varieties": "Bisi-18, NK-212", "notes": "Kawasan Lamongan selatan sangat produktif jagung di bulan September sebelum puncak musim basah."},
                "PADI_BERAS": {"suitability": 99, "land_ha": 98000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 7, 8], "grow": [12, 1, 6], "varieties": "Inpari 32, Mekongga", "notes": "Produsen beras nomor satu di Jawa Timur."},
                "KEDELAI": {"suitability": 91, "land_ha": 14000, "plant": [3, 4, 7, 8], "harvest": [6, 7, 10, 11], "grow": [5, 9], "varieties": "Anjasmoro", "notes": "Pola rotasi padi-padi-kedelai di lahan rawa surut."}
            }
        },
        {
            "id": "KAB-DOMPU", "name": "Kab. Dompu", "province": "Nusa Tenggara Barat", "island": "BALI_NUSA_TENGGARA",
            "lat": -8.5333, "lng": 118.4667, "elevation_m": 80, "soil_type": "Litosol & Mediteran (pH 6.7)",
            "irrigation": "Tadah Hujan Gunung Tambora & Embung Pertanian",
            "crops": {
                "JAGUNG": {"suitability": 99, "land_ha": 78000, "plant": [9, 10, 11, 12], "harvest": [2, 3, 4], "grow": [1], "varieties": "Bisi-2, Pioneer P35, NK-6172", "notes": "Ibu kota jagung nusantara. Bulan September petani memulai pengolahan lahan serentak di lereng Tambora."},
                "PADI_BERAS": {"suitability": 82, "land_ha": 28000, "plant": [11, 12, 5], "harvest": [3, 4, 8], "grow": [1, 2, 6, 7], "varieties": "Inpari 30 Ciherang Sub-1", "notes": "Fokus pada sawah irigasi teknis bendungan Mila."},
                "BAWANG_MERAH": {"suitability": 90, "land_ha": 9500, "plant": [5, 6, 7], "harvest": [7, 8, 9], "grow": [6, 8], "varieties": "Bima Brebes, Tajuk", "notes": "Sinar matahari terik optimal untuk penjemuran umbi bawang."}
            }
        },
        {
            "id": "KAB-BIMA", "name": "Kab. Bima", "province": "Nusa Tenggara Barat", "island": "BALI_NUSA_TENGGARA",
            "lat": -8.4608, "lng": 118.7256, "elevation_m": 60, "soil_type": "Aluvial Pantai & Regosol (pH 6.8)",
            "irrigation": "Irigasi Pompa Dangkal & Air Tanah",
            "crops": {
                "BAWANG_MERAH": {"suitability": 99, "land_ha": 16500, "plant": [5, 6, 7, 8], "harvest": [7, 8, 9, 10], "grow": [6, 7, 9], "varieties": "Bima Kencana, Super Philip", "notes": "Sentra bawang merah terbesar kedua nasional setelah Brebes. September masa panen raya lanjutan & penjemuran."},
                "JAGUNG": {"suitability": 96, "land_ha": 71000, "plant": [9, 10, 11, 12], "harvest": [2, 3, 4], "grow": [1], "varieties": "Pioneer P35, Bisi-18", "notes": "Musim tanam awal jagung dimulai serempak di lahan kering perbukitan."},
                "KEDELAI": {"suitability": 86, "land_ha": 8200, "plant": [3, 4, 7], "harvest": [6, 7, 10], "grow": [5, 8], "varieties": "Dega 1", "notes": "Pilihan palawija setelah panen padi."}
            }
        },
        {
            "id": "KAB-SUMBAWA", "name": "Kab. Sumbawa", "province": "Nusa Tenggara Barat", "island": "BALI_NUSA_TENGGARA",
            "lat": -8.5000, "lng": 117.4167, "elevation_m": 70, "soil_type": "Aluvial & Latosol Cokelat (pH 6.6)",
            "irrigation": "Bendungan Beringin Sila & Batutegi",
            "crops": {
                "JAGUNG": {"suitability": 97, "land_ha": 84000, "plant": [9, 10, 11, 12], "harvest": [2, 3, 4], "grow": [1], "varieties": "NK-212, Bisi-222", "notes": "Salah satu kabupaten dengan hamparan jagung terluas di Indonesia. September masa tanam pembuka MT 1."},
                "PADI_BERAS": {"suitability": 89, "land_ha": 49000, "plant": [11, 12, 4], "harvest": [3, 4, 8], "grow": [1, 2, 5, 6], "varieties": "Inpari 32", "notes": "Didukung bendungan Beringin Sila."},
                "KEDELAI": {"suitability": 88, "land_ha": 11000, "plant": [4, 5, 8], "harvest": [7, 8, 11], "grow": [6, 9, 10], "varieties": "Anjasmoro", "notes": "Palawija musim kemarau di lahan sawah tadah hujan."}
            }
        },
        {
            "id": "KAB-JENEPONTO", "name": "Kab. Jeneponto", "province": "Sulawesi Selatan", "island": "SULAWESI",
            "lat": -5.6667, "lng": 119.7333, "elevation_m": 50, "soil_type": "Mediteran Cokelat & Regosol (pH 6.5)",
            "irrigation": "Bendungan Karalloe & Pompanisasi",
            "crops": {
                "JAGUNG": {"suitability": 96, "land_ha": 48000, "plant": [9, 10, 11, 2], "harvest": [1, 2, 5, 6], "grow": [12, 3, 4], "varieties": "Bisi-18, Pioneer P35, DK 771", "notes": "Sentra jagung utama Sulawesi Selatan. Petani memulai tanam September untuk mengejar panen Januari-Februari."},
                "PADI_BERAS": {"suitability": 85, "land_ha": 26000, "plant": [11, 12, 5], "harvest": [3, 4, 8], "grow": [1, 2, 6, 7], "varieties": "Inpari 32", "notes": "Irigasi bendungan Karalloe meningkatkan IP padi."},
                "BAWANG_MERAH": {"suitability": 85, "land_ha": 4200, "plant": [6, 7], "harvest": [8, 9], "grow": [7, 8], "varieties": "Bima Brebes", "notes": "Produksi bawang merah pesisir selatan Sulsel."}
            }
        },
        {
            "id": "KAB-TAKALAR", "name": "Kab. Takalar", "province": "Sulawesi Selatan", "island": "SULAWESI",
            "lat": -5.4167, "lng": 119.4667, "elevation_m": 35, "soil_type": "Aluvial & Latosol (pH 6.5)",
            "irrigation": "Sungai Jeneberang & Saluran Irigasi Teknis",
            "crops": {
                "JAGUNG": {"suitability": 94, "land_ha": 34000, "plant": [9, 10, 11], "harvest": [1, 2, 3], "grow": [12], "varieties": "Bisi-2, Pioneer P36", "notes": "Pola tanam jagung setelah padi musim gadu selesai di bulan Agustus."},
                "PADI_BERAS": {"suitability": 91, "land_ha": 31000, "plant": [11, 12, 4], "harvest": [3, 4, 8], "grow": [1, 2, 5, 6], "varieties": "Ciherang, Cisantana", "notes": "Padi sawah irigasi setengah teknis."},
                "TEBU": {"suitability": 89, "land_ha": 8600, "plant": [5, 6], "harvest": [7, 8, 9], "grow": [7, 8, 9, 10, 11, 12, 1, 2, 3, 4], "varieties": "Bululawang", "notes": "Penyuplai tebu pabrik gula Takalar."}
            }
        },
        {
            "id": "KAB-BONE", "name": "Kab. Bone", "province": "Sulawesi Selatan", "island": "SULAWESI",
            "lat": -4.6886, "lng": 120.1517, "elevation_m": 55, "soil_type": "Aluvial Lembah & Latosol (pH 6.6)",
            "irrigation": "Irigasi Teknis Sanrego & Sungai Walanae",
            "crops": {
                "PADI_BERAS": {"suitability": 98, "land_ha": 92000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 8, 9], "grow": [12, 1, 6, 7], "varieties": "Inpari 32, Ciliwung", "notes": "Lumbung pangan utama kawasan timur Indonesia. September persiapan lahan MT Rendeng."},
                "JAGUNG": {"suitability": 95, "land_ha": 52000, "plant": [9, 10, 11, 3], "harvest": [1, 2, 6, 7], "grow": [12, 4, 5], "varieties": "Bisi-18, NK-212", "notes": "Tanam jagung intensif di Bone barat dan selatan."},
                "TEBU": {"suitability": 92, "land_ha": 14000, "plant": [5, 6], "harvest": [8, 9, 10], "grow": [7, 8, 9, 10, 11, 12, 1, 2, 3, 4], "varieties": "PS 881", "notes": "Sentra perkebunan tebu rakyat pabrik gula Camming & Bone."}
            }
        },
        {
            "id": "KAB-LAMPUNG-SELATAN", "name": "Kab. Lampung Selatan", "province": "Lampung", "island": "SUMATERA",
            "lat": -5.7333, "lng": 105.5833, "elevation_m": 90, "soil_type": "Podsolik Merah Kuning & Latosol (pH 6.2)",
            "irrigation": "Sungai Sekampung & Sumur Bor Pertanian",
            "crops": {
                "JAGUNG": {"suitability": 98, "land_ha": 65000, "plant": [9, 10, 11, 2], "harvest": [1, 2, 5, 6], "grow": [12, 3, 4], "varieties": "Pioneer P35, Bisi-18, NK-212", "notes": "Pintu gerbang pasokan jagung Sumatera ke industri pakan Jawa. September awal tanam MT 1."},
                "PADI_BERAS": {"suitability": 90, "land_ha": 44000, "plant": [10, 11, 4], "harvest": [2, 3, 8], "grow": [12, 1, 5, 6], "varieties": "Inpari 32, Ciherang", "notes": "Irigasi Way Sekampung menjamin suplai air sawah."},
                "UBI_KAYU": {"suitability": 95, "land_ha": 38000, "plant": [10, 11], "harvest": [7, 8], "grow": [12, 1, 2, 3, 4, 5, 6], "varieties": "Casindo, Gajah", "notes": "Kawasan industri tepung tapioka dan bioetanol."}
            }
        },
        {
            "id": "KAB-LAMPUNG-TIMUR", "name": "Kab. Lampung Timur", "province": "Lampung", "island": "SUMATERA",
            "lat": -5.1056, "lng": 105.6833, "elevation_m": 65, "soil_type": "Podsolik & Aluvial Dataran Rendah (pH 6.3)",
            "irrigation": "Bendungan Way Sekampung & Rawa Way Jepara",
            "crops": {
                "JAGUNG": {"suitability": 99, "land_ha": 76000, "plant": [9, 10, 11, 2, 3], "harvest": [1, 2, 6, 7], "grow": [12, 4, 5], "varieties": "Bisi-2, Pioneer P36, DK 95", "notes": "Sentra jagung pipil terluas di Sumatera. September masa penanaman serentak musim tanam rendeng."},
                "PADI_BERAS": {"suitability": 92, "land_ha": 62000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 8], "grow": [12, 1, 6, 7], "varieties": "Inpari 42", "notes": "Lumbung beras timur Lampung."},
                "UBI_KAYU": {"suitability": 96, "land_ha": 45000, "plant": [10, 11], "harvest": [7, 8, 9], "grow": [12, 1, 2, 3, 4, 5, 6], "varieties": "UJ 5 (Kasetsart)", "notes": "Integrasi perkebunan singkong dan pabrik tapioka."}
            }
        },
        {
            "id": "KAB-GORONTALO", "name": "Kab. Gorontalo", "province": "Gorontalo", "island": "SULAWESI",
            "lat": 0.5406, "lng": 123.0594, "elevation_m": 85, "soil_type": "Aluvial & Latosol (pH 6.6)",
            "irrigation": "Danau Limboto & Irigasi Sungai Paguyaman",
            "crops": {
                "JAGUNG": {"suitability": 98, "land_ha": 58000, "plant": [9, 10, 11, 2, 3], "harvest": [1, 2, 6, 7], "grow": [12, 4, 5], "varieties": "Bisi-18, Pioneer P35, Motor Kencana", "notes": "Provinsi Serambi Jagung. Bulan September waktu tanam prima di perbukitan Limboto & Paguyaman."},
                "PADI_BERAS": {"suitability": 88, "land_ha": 24000, "plant": [11, 12, 5], "harvest": [3, 4, 9], "grow": [1, 2, 6, 7, 8], "varieties": "Inpari 32", "notes": "Sentra padi sawah lembah Paguyaman."},
                "KELAPA_SAWIT": {"suitability": 84, "land_ha": 12000, "plant": [10, 11], "harvest": [8, 9, 10], "grow": [1, 2, 3, 4, 5, 6, 7], "varieties": "Tenera", "notes": "Ekspansi perkebunan sawit berkelanjutan."}
            }
        },
        {
            "id": "KAB-TANAH-LAUT", "name": "Kab. Tanah Laut", "province": "Kalimantan Selatan", "island": "KALIMANTAN",
            "lat": -3.8833, "lng": 114.8667, "elevation_m": 50, "soil_type": "Podsolik Merah Kuning & Aluvial (pH 6.1)",
            "irrigation": "Waduk Riam Kanan & Sungai Tabanio",
            "crops": {
                "JAGUNG": {"suitability": 96, "land_ha": 42000, "plant": [9, 10, 11, 2], "harvest": [1, 2, 5, 6], "grow": [12, 3, 4], "varieties": "Pioneer P35, Bisi-18", "notes": "Sentra jagung pakan ternak nomor satu di Pulau Kalimantan. September awal tanam terbaik."},
                "PADI_BERAS": {"suitability": 91, "land_ha": 38000, "plant": [11, 12, 5], "harvest": [3, 4, 9], "grow": [1, 2, 6, 7, 8], "varieties": "Siam Unus (Lokal), Inpari 32", "notes": "Sawah pasang surut dan irigasi Pelaihari."},
                "KELAPA_SAWIT": {"suitability": 92, "land_ha": 28000, "plant": [10, 11], "harvest": [9, 10, 11], "grow": [1, 2, 3, 4, 5, 6, 7, 8], "varieties": "DxP Socfindo", "notes": "PKS beroperasi kapasitas penuh di bulan September."}
            }
        },
        {
            "id": "KAB-KARO", "name": "Kab. Karo", "province": "Sumatera Utara", "island": "SUMATERA",
            "lat": 3.1167, "lng": 98.5000, "elevation_m": 1200, "soil_type": "Andosol Vulkanik Sinabung (pH 6.5)",
            "irrigation": "Mata Air Pegunungan & Sungai Lau Borus",
            "crops": {
                "JAGUNG": {"suitability": 97, "land_ha": 46000, "plant": [8, 9, 10, 2], "harvest": [12, 1, 6], "grow": [11, 3, 4, 5], "varieties": "Pioneer P35, NK-212", "notes": "Jagung dataran tinggi dengan produktivitas mencapai 8-9 ton/Ha karena abu vulkanik subur."},
                "CABAI_RAWIT": {"suitability": 98, "land_ha": 9800, "plant": [2, 3, 8, 9], "harvest": [5, 6, 11, 12], "grow": [4, 10], "varieties": "Kencana, TM 999", "notes": "Sentra cabai merah dan rawit utama penyuplai Medan dan Sumatera bagian utara."},
                "BAWANG_PUTIH": {"suitability": 92, "land_ha": 2400, "plant": [9, 10], "harvest": [1, 2], "grow": [11, 12], "varieties": "Lumbu Kuning", "notes": "Ketinggian >1200 mdpl sangat pas untuk bawang putih."},
                "KOPI": {"suitability": 96, "land_ha": 18500, "plant": [10, 11], "harvest": [9, 10, 11], "grow": [1, 2, 3, 4, 5, 6, 7, 8], "varieties": "Arabika Gayo / Sigarar Utang", "notes": "Kopi spesialti Karo beraroma buah segar."}
            }
        },
        {
            "id": "KAB-PASAMAN-BARAT", "name": "Kab. Pasaman Barat", "province": "Sumatera Barat", "island": "SUMATERA",
            "lat": 0.2167, "lng": 99.8167, "elevation_m": 110, "soil_type": "Aluvial & Latosol (pH 6.3)",
            "irrigation": "Sungai Batang Pasaman & Irigasi Batang Tongar",
            "crops": {
                "JAGUNG": {"suitability": 98, "land_ha": 51000, "plant": [8, 9, 10, 1, 2], "harvest": [12, 1, 5, 6], "grow": [11, 3, 4], "varieties": "Pioneer P35, Bisi-18", "notes": "Sentra jagung terbesar di Sumatera Barat. Bulan September merupakan masa tanam serempak."},
                "KELAPA_SAWIT": {"suitability": 96, "land_ha": 94000, "plant": [10, 11], "harvest": [8, 9, 10, 11], "grow": [1, 2, 3, 4, 5, 6, 7], "varieties": "DxP Marihat", "notes": "Pilar ekonomi utama Pasaman Barat."},
                "PADI_BERAS": {"suitability": 89, "land_ha": 26000, "plant": [10, 11, 4], "harvest": [2, 3, 8], "grow": [12, 1, 5, 6], "varieties": "Kuriak Kusuik, Inpari 32", "notes": "Sawah organik lembah Gunung Talamau."}
            }
        },
        # --- SENTRA PADI & HORTIKULTURA LAINNYA ---
        {
            "id": "KAB-KARAWANG", "name": "Kab. Karawang", "province": "Jawa Barat", "island": "JAWA",
            "lat": -6.3073, "lng": 107.3015, "elevation_m": 20, "soil_type": "Aluvial Subur Pantura (pH 6.7)",
            "irrigation": "Saluran Irigasi Waduk Jatiluhur (Tarum Timur & Barat)",
            "crops": {
                "PADI_BERAS": {"suitability": 99, "land_ha": 96000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 7, 8], "grow": [12, 1, 6], "varieties": "Inpari 32, Ciherang, IPB 3S", "notes": "Lumbung padi nasional. September masa pengeringan sawah gadu akhir & persiapan semai MT 1 Rendeng."},
                "KEDELAI": {"suitability": 86, "land_ha": 6500, "plant": [4, 5, 8], "harvest": [7, 8, 11], "grow": [6, 9, 10], "varieties": "Anjasmoro", "notes": "Rotasi palawija di lahan sawah irigasi setengah teknis."}
            }
        },
        {
            "id": "KAB-INDRAMAYU", "name": "Kab. Indramayu", "province": "Jawa Barat", "island": "JAWA",
            "lat": -6.3263, "lng": 108.3200, "elevation_m": 15, "soil_type": "Aluvial Marin & Endapan Sungai Cimanuk (pH 6.8)",
            "irrigation": "Bendung Rentang & Waduk Jatigede",
            "crops": {
                "PADI_BERAS": {"suitability": 100, "land_ha": 115000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 7, 8], "grow": [12, 1, 6], "varieties": "Inpari 32, Mekongga", "notes": "Kabupaten penghasil beras terbesar di Republik Indonesia (>1,3 juta ton GKG/tahun)."},
                "BAWANG_MERAH": {"suitability": 85, "land_ha": 5200, "plant": [5, 6, 7], "harvest": [7, 8, 9], "grow": [6, 8], "varieties": "Bima Brebes", "notes": "Sentra bawang merah pesisir utara di Losarang."}
            }
        },
        {
            "id": "KAB-SUBANG", "name": "Kab. Subang", "province": "Jawa Barat", "island": "JAWA",
            "lat": -6.5585, "lng": 107.7594, "elevation_m": 35, "soil_type": "Aluvial & Latosol (pH 6.6)",
            "irrigation": "Irigasi Jatiluhur & Sungai Ciasem",
            "crops": {
                "PADI_BERAS": {"suitability": 98, "land_ha": 84000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 7, 8], "grow": [12, 1, 6], "varieties": "Inpari 32, Ciherang", "notes": "Sentra padi Pantura penyangga utama pangan Jakarta."},
                "TEBU": {"suitability": 88, "land_ha": 9200, "plant": [5, 6], "harvest": [8, 9, 10], "grow": [7, 8, 9, 10, 11, 12, 1, 2, 3, 4], "varieties": "Bululawang", "notes": "Pemasok tebu PG Subang."}
            }
        },
        {
            "id": "KAB-BREBES", "name": "Kab. Brebes", "province": "Jawa Tengah", "island": "JAWA",
            "lat": -6.8703, "lng": 109.0435, "elevation_m": 30, "soil_type": "Aluvial Pesisir & Grumosol (pH 6.8)",
            "irrigation": "Irigasi Waduk Malahayu & Sungai Pemali",
            "crops": {
                "BAWANG_MERAH": {"suitability": 100, "land_ha": 34000, "plant": [4, 5, 6, 7, 8], "harvest": [6, 7, 8, 9, 10], "grow": [5, 7, 9], "varieties": "Bima Brebes (Sertifikasi Nasional), Tajuk", "notes": "Ibu kota bawang merah nasional memasok >30% kebutuhan Indonesia. September fase akhir panen kemarau."},
                "PADI_BERAS": {"suitability": 92, "land_ha": 62000, "plant": [10, 11, 4], "harvest": [2, 3, 8], "grow": [12, 1, 5, 6], "varieties": "Inpari 32", "notes": "Rotasi bawang merah dengan padi sawah."},
                "CABAI_RAWIT": {"suitability": 90, "land_ha": 6800, "plant": [2, 3, 9, 10], "harvest": [5, 6, 12, 1], "grow": [4, 11], "varieties": "Kencana", "notes": "Sentra cabai merah keriting di Larangan."}
            }
        },
        {
            "id": "KAB-NGANJUK", "name": "Kab. Nganjuk", "province": "Jawa Timur", "island": "JAWA",
            "lat": -7.6044, "lng": 111.9039, "elevation_m": 65, "soil_type": "Aluvial & Regosol Gunung Wilis (pH 6.7)",
            "irrigation": "Sungai Brantas & Saluran Irigasi Teknis",
            "crops": {
                "BAWANG_MERAH": {"suitability": 98, "land_ha": 18500, "plant": [5, 6, 7, 8], "harvest": [7, 8, 9, 10], "grow": [6, 7, 9], "varieties": "Tajuk, Bauji", "notes": "Sentra bawang merah utama Jawa Timur. Varietas Tajuk sangat tahan hama dan bersinar terik di kemarau."},
                "PADI_BERAS": {"suitability": 94, "land_ha": 46000, "plant": [10, 11, 4], "harvest": [2, 3, 7], "grow": [12, 1, 5, 6], "varieties": "Inpari 32", "notes": "Padi sawah irigasi Brantas berdaya hasil tinggi."},
                "KEDELAI": {"suitability": 91, "land_ha": 9400, "plant": [3, 4, 7, 8], "harvest": [6, 7, 10, 11], "grow": [5, 9], "varieties": "Anjasmoro", "notes": "Palawija musim tanam ketiga."}
            }
        },
        {
            "id": "KAB-KEDIRI", "name": "Kab. Kediri", "province": "Jawa Timur", "island": "JAWA",
            "lat": -7.8480, "lng": 112.0178, "elevation_m": 120, "soil_type": "Andosol & Regosol Gunung Kelud (pH 6.6)",
            "irrigation": "Mata Air Kelud & Sungai Brantas",
            "crops": {
                "CABAI_RAWIT": {"suitability": 99, "land_ha": 14500, "plant": [2, 3, 8, 9], "harvest": [5, 6, 11, 12], "grow": [4, 10], "varieties": "Ori 212, Prentul, Bhaskara", "notes": "Sentra cabai rawit nomor satu Indonesia (Pasar Induk Pare). September waktu tanam terbaik menyongsong panen akhir tahun."},
                "JAGUNG": {"suitability": 94, "land_ha": 38000, "plant": [9, 10, 11, 2], "harvest": [1, 2, 5, 6], "grow": [12, 3, 4], "varieties": "Bisi-18, Pioneer P35", "notes": "Tanam jagung hibrida di lereng Kelud yang gembur."},
                "TEBU": {"suitability": 96, "land_ha": 26000, "plant": [5, 6], "harvest": [8, 9, 10], "grow": [7, 8, 9, 10, 11, 12, 1, 2, 3, 4], "varieties": "Bululawang", "notes": "Pemasok utama PG Pesantren Baru & Ngadirejo."}
            }
        },
        {
            "id": "KAB-BLITAR", "name": "Kab. Blitar", "province": "Jawa Timur", "island": "JAWA",
            "lat": -8.0983, "lng": 112.1681, "elevation_m": 160, "soil_type": "Regosol & Latosol Vulkanik (pH 6.5)",
            "irrigation": "Irigasi Kali Brantas & Embung",
            "crops": {
                "CABAI_RAWIT": {"suitability": 97, "land_ha": 11000, "plant": [2, 3, 8, 9], "harvest": [5, 6, 11, 12], "grow": [4, 10], "varieties": "Ori 212, Asmoro", "notes": "Pemasok cabai rawit utama untuk Jakarta dan Jawa Barat."},
                "JAGUNG": {"suitability": 95, "land_ha": 36000, "plant": [9, 10, 11, 2], "harvest": [1, 2, 5, 6], "grow": [12, 3, 4], "varieties": "Bisi-18, Pioneer P35", "notes": "Pakan langsung peternak unggas petelur terbesar Blitar."}
            }
        },
        {
            "id": "KAB-TEMANGGUNG", "name": "Kab. Temanggung", "province": "Jawa Tengah", "island": "JAWA",
            "lat": -7.3167, "lng": 110.1667, "elevation_m": 750, "soil_type": "Andosol Lereng Sindoro-Sumbing (pH 6.4)",
            "irrigation": "Mata Air Pegunungan & Sungai Progo",
            "crops": {
                "BAWANG_PUTIH": {"suitability": 98, "land_ha": 3800, "plant": [9, 10, 11], "harvest": [1, 2, 3], "grow": [12], "varieties": "Lumbu Hijau, Tawangmangu Baru", "notes": "Kawasan Food Estate Bawang Putih nasional. September waktu tanam ideal menyambut musim hujan pegunungan."},
                "CABAI_RAWIT": {"suitability": 96, "land_ha": 8600, "plant": [2, 3, 8, 9], "harvest": [5, 6, 11, 12], "grow": [4, 10], "varieties": "Kencana, Ori 212", "notes": "Cabai rawit lereng Sumbing bertekstur pedas kuat."},
                "KOPI": {"suitability": 97, "land_ha": 14000, "plant": [10, 11], "harvest": [6, 7, 8, 9], "grow": [1, 2, 3, 4, 5], "varieties": "Robusta Temanggung, Arabika Sindoro", "notes": "Kopi spesialti peraih penghargaan internasional."}
            }
        },
        {
            "id": "KAB-LOMBOK-TIMUR", "name": "Kab. Lombok Timur", "province": "Nusa Tenggara Barat", "island": "BALI_NUSA_TENGGARA",
            "lat": -8.6500, "lng": 116.5333, "elevation_m": 450, "soil_type": "Andosol Rinjani & Aluvial (pH 6.6)",
            "irrigation": "Sungai Menanga & Mata Air Rinjani",
            "crops": {
                "BAWANG_PUTIH": {"suitability": 99, "land_ha": 4200, "plant": [9, 10, 11], "harvest": [1, 2, 3], "grow": [12], "varieties": "Sangga Sembalun (Varietas Unggul Nasional)", "notes": "Lembah Sembalun merupakan sentra bawang putih terbaik nusantara dengan rendemen umbi tinggi."},
                "CABAI_RAWIT": {"suitability": 95, "land_ha": 9200, "plant": [2, 3, 8, 9], "harvest": [5, 6, 11, 12], "grow": [4, 10], "varieties": "Bhaskara", "notes": "Cabai rawit Lombok Timur penyeimbang harga di Indonesia Timur."},
                "BAWANG_MERAH": {"suitability": 94, "land_ha": 7800, "plant": [5, 6, 7], "harvest": [7, 8, 9], "grow": [6, 8], "varieties": "Bima Brebes", "notes": "Produksi bawang merah dataran rendah."}
            }
        },
        {
            "id": "KAB-SIDRAP", "name": "Kab. Sidenreng Rappang (Sidrap)", "province": "Sulawesi Selatan", "island": "SULAWESI",
            "lat": -3.9214, "lng": 119.8686, "elevation_m": 40, "soil_type": "Aluvial Lembah Danau Sidenreng (pH 6.7)",
            "irrigation": "Irigasi Teknis Sungai Saddang & Danau Sidenreng",
            "crops": {
                "PADI_BERAS": {"suitability": 100, "land_ha": 65000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 7, 8], "grow": [12, 1, 6], "varieties": "Inpari 32, Ciherang", "notes": "Lumbung beras termodern di Indonesia timur dengan sistem mekanisasi penuh."},
                "JAGUNG": {"suitability": 92, "land_ha": 28000, "plant": [9, 10, 11], "harvest": [1, 2, 3], "grow": [12], "varieties": "Bisi-18, Pioneer P35", "notes": "Tanam jagung intensif di lereng bukit perbatasan Enrekang."}
            }
        },
        {
            "id": "KAB-PINRANG", "name": "Kab. Pinrang", "province": "Sulawesi Selatan", "island": "SULAWESI",
            "lat": -3.7833, "lng": 119.6500, "elevation_m": 30, "soil_type": "Aluvial Dataran Rendah Saddang (pH 6.8)",
            "irrigation": "Bendung Benteng Irigasi Saddang",
            "crops": {
                "PADI_BERAS": {"suitability": 99, "land_ha": 58000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 7, 8], "grow": [12, 1, 6], "varieties": "Inpari 32, Mekongga", "notes": "Indeks Pertanaman (IP) mencapai 2.8 dengan air irigasi melimpah."},
                "JAGUNG": {"suitability": 90, "land_ha": 22000, "plant": [9, 10, 11], "harvest": [1, 2, 3], "grow": [12], "varieties": "Bisi-2", "notes": "Pemanfaatan lahan kering utara."}
            }
        },
        {
            "id": "KAB-KAMPAR", "name": "Kab. Kampar", "province": "Riau", "island": "SUMATERA",
            "lat": 0.3333, "lng": 101.2167, "elevation_m": 45, "soil_type": "Podsolik Merah Kuning & Gambut Dangkal (pH 5.4)",
            "irrigation": "Sungai Kampar & Curah Hujan Tropis",
            "crops": {
                "KELAPA_SAWIT": {"suitability": 100, "land_ha": 210000, "plant": [9, 10, 11], "harvest": [8, 9, 10, 11], "grow": [1, 2, 3, 4, 5, 6, 7], "varieties": "DxP Socfindo, Tenera Dami", "notes": "Salah satu sentra kelapa sawit terbesar di Indonesia. September berada pada puncak musim panen TBS (peak crop)."},
                "PADI_BERAS": {"suitability": 80, "land_ha": 14000, "plant": [10, 11], "harvest": [2, 3], "grow": [12, 1], "varieties": "Inpara 3", "notes": "Sawah rawa lebak."}
            }
        },
        {
            "id": "KAB-KOTAWARINGIN-TIMUR", "name": "Kab. Kotawaringin Timur", "province": "Kalimantan Tengah", "island": "KALIMANTAN",
            "lat": -2.0833, "lng": 112.9500, "elevation_m": 25, "soil_type": "Gambut Terkelola & Podsolik (pH 5.2)",
            "irrigation": "Sungai Mentaya & Saluran Primer Gambut",
            "crops": {
                "KELAPA_SAWIT": {"suitability": 99, "land_ha": 245000, "plant": [9, 10, 11], "harvest": [8, 9, 10, 11], "grow": [1, 2, 3, 4, 5, 6, 7], "varieties": "DxP Marihat", "notes": "Sentra industri kelapa sawit terpadu dan pelabuhan ekspor CPO Mentaya."},
                "PADI_BERAS": {"suitability": 82, "land_ha": 16000, "plant": [10, 11], "harvest": [3, 4], "grow": [12, 1, 2], "varieties": "Inpara 2", "notes": "Sawah pasang surut."}
            }
        },
        {
            "id": "KAB-MALANG", "name": "Kab. Malang", "province": "Jawa Timur", "island": "JAWA",
            "lat": -8.1333, "lng": 112.5667, "elevation_m": 450, "soil_type": "Andosol & Latosol Pegunungan (pH 6.5)",
            "irrigation": "Sungai Brantas Hulu & Saluran Air Bromo-Semeru",
            "crops": {
                "TEBU": {"suitability": 98, "land_ha": 44000, "plant": [5, 6], "harvest": [8, 9, 10], "grow": [7, 8, 9, 10, 11, 12, 1, 2, 3, 4], "varieties": "Bululawang, PS 881", "notes": "Penyuplai utama Pabrik Gula Kebonagung & Krebet Baru. September masa giling puncak rendemen tinggi."},
                "KOPI": {"suitability": 96, "land_ha": 22000, "plant": [10, 11], "harvest": [6, 7, 8, 9], "grow": [1, 2, 3, 4, 5], "varieties": "Dampit Robusta, Arabika Bromo", "notes": "Kopi Robusta Dampit diekspor ke Eropa."},
                "CABAI_RAWIT": {"suitability": 92, "land_ha": 8200, "plant": [2, 3, 8, 9], "harvest": [5, 6, 11, 12], "grow": [4, 10], "varieties": "Ori 212", "notes": "Sentra cabai dataran tinggi di Pujon & Karangploso."}
            }
        },
        {
            "id": "KAB-ACEH-TENGAH", "name": "Kab. Aceh Tengah", "province": "Aceh", "island": "SUMATERA",
            "lat": 4.5167, "lng": 96.8500, "elevation_m": 1350, "soil_type": "Andosol Vulkanik Danau Laut Tawar (pH 6.2)",
            "irrigation": "Mata Air Pegunungan Gayo",
            "crops": {
                "KOPI": {"suitability": 100, "land_ha": 52000, "plant": [9, 10, 11], "harvest": [9, 10, 11, 12], "grow": [1, 2, 3, 4, 5, 6, 7, 8], "varieties": "Gayo 1, Gayo 2, P88, Ateng Super", "notes": "Penghasil Kopi Arabika Gayo nomor satu dunia berlabel Indikasi Geografis (IG). September panen awal musim utama."},
                "CABAI_RAWIT": {"suitability": 89, "land_ha": 4500, "plant": [3, 4, 9], "harvest": [6, 7, 12], "grow": [5, 10, 11], "varieties": "Kencana", "notes": "Cabai dataran tinggi berkualitas prima."}
            }
        },
        {
            "id": "KAB-MERAUKE", "name": "Kab. Merauke", "province": "Papua Selatan", "island": "MALUKU_PAPUA",
            "lat": -8.4991, "lng": 140.4011, "elevation_m": 12, "soil_type": "Aluvial Rawa & Podsolik Dataran Rendah (pH 6.4)",
            "irrigation": "Sungai Maro & Kanal Primer Food Estate",
            "crops": {
                "PADI_BERAS": {"suitability": 98, "land_ha": 72000, "plant": [10, 11, 4, 5], "harvest": [2, 3, 8, 9], "grow": [12, 1, 6, 7], "varieties": "Inpari 32, Inpara 2", "notes": "Pusat Food Estate Padi Nasional Kawasan Timur Indonesia. Hamparan sawah mekanisasi raksasa."},
                "TEBU": {"suitability": 95, "land_ha": 35000, "plant": [5, 6], "harvest": [8, 9, 10], "grow": [7, 8, 9, 10, 11, 12, 1, 2, 3, 4], "varieties": "Cenning, Bululawang", "notes": "Kawasan pengembangan industri gula dan bioetanol nasional terpadu."}
            }
        },
        {
            "id": "KAB-SOLOK", "name": "Kab. Solok", "province": "Sumatera Barat", "island": "SUMATERA",
            "lat": -0.9833, "lng": 100.6500, "elevation_m": 850, "soil_type": "Andosol Lembah Danau Singkarak (pH 6.5)",
            "irrigation": "Sungai Batang Lembang & Irigasi Pegunungan",
            "crops": {
                "BAWANG_MERAH": {"suitability": 97, "land_ha": 11500, "plant": [4, 5, 8, 9], "harvest": [6, 7, 10, 11], "grow": [5, 10], "varieties": "Singki, Bima", "notes": "Sentra bawang merah terbesar di Pulau Sumatera (Lembah Gumanti Alahan Panjang). September waktu tanam ideal musim kedua."},
                "PADI_BERAS": {"suitability": 98, "land_ha": 34000, "plant": [10, 11, 4], "harvest": [2, 3, 8], "grow": [12, 1, 5, 6], "varieties": "Beras Solok Asli (Cisokan, Anak Daro)", "notes": "Beras Solok legendaris bertekstur pera favorit kuliner nusantara."},
                "CABAI_RAWIT": {"suitability": 92, "land_ha": 6200, "plant": [2, 3, 8, 9], "harvest": [5, 6, 11, 12], "grow": [4, 10], "varieties": "Kencana, Kopay", "notes": "Cabai merah keriting dataran tinggi Alahan Panjang."}
            }
        }
    ]

    @classmethod
    def get_regency_planting_recommendations(
        cls,
        commodity_id: Optional[str] = "JAGUNG",
        month: Optional[int] = 9,
        status: Optional[str] = None,
        island: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Calculates and returns interactive regency-level crop planting recommendations
        across Indonesia for the selected raw material / commodity and planting month.
        """
        # 1. Resolve Commodity Key
        cid = (commodity_id or "JAGUNG").upper()
        matched_key = None
        for key, spec in cls.COMMODITY_SPECS.items():
            if cid == key or cid in [a.upper() for a in spec.get("aliases", [])]:
                matched_key = key
                break
        if not matched_key:
            matched_key = "JAGUNG"

        crop_spec = cls.COMMODITY_SPECS[matched_key]
        active_month = int(month) if month and 1 <= int(month) <= 12 else 9
        month_name = cls.MONTH_NAMES[active_month - 1]

        # 2. Process Regency Recommendations
        results = []
        total_recommended_count = 0
        total_potential_land_ha = 0
        total_projected_production_ton = 0

        for r in cls.REGENCY_CATALOG:
            # Island filter
            if island and island != "SEMUA" and r["island"] != island:
                continue

            crop_profile = r["crops"].get(matched_key)
            if not crop_profile:
                # Regency does not have primary suitability for this crop
                continue

            plant_months = crop_profile.get("plant", [])
            harvest_months = crop_profile.get("harvest", [])
            grow_months = crop_profile.get("grow", [])
            land_ha = crop_profile.get("land_ha", 10000)
            suitability = crop_profile.get("suitability", 80)
            varieties = crop_profile.get("varieties", crop_spec["standard_varieties"])
            notes = crop_profile.get("notes", "")

            # Calculate Monthly Recommendation Status
            if active_month in plant_months:
                rec_status = "RECOMMENDED_PRIME"
                rec_label = "Sangat Dianjurkan (Musim Tanam Utama)"
                badge_bg = "#E6F4EA"
                badge_text = "#137333"
                marker_color = "#1E8E3E"
                priority_rank = 1
                total_recommended_count += 1
                total_potential_land_ha += land_ha
                projected_ton = round((land_ha * crop_spec["avg_yield_ton_ha"]) / 1000, 1) # dalam ribu ton
                total_projected_production_ton += projected_ton
            elif active_month in harvest_months:
                rec_status = "HARVESTING"
                rec_label = "Masa Panen Raya Berjalan"
                badge_bg = "#FEF7E0"
                badge_text = "#B06000"
                marker_color = "#E65100"
                priority_rank = 3
                projected_ton = round((land_ha * crop_spec["avg_yield_ton_ha"]) / 1000, 1)
            elif active_month in grow_months:
                rec_status = "GROWING"
                rec_label = "Masa Vegetatif / Perawatan Lahan"
                badge_bg = "#E8F0FE"
                badge_text = "#1A73E8"
                marker_color = "#1A73E8"
                priority_rank = 4
                projected_ton = 0
            else:
                # Conditional / Secondary planting
                rec_status = "RECOMMENDED_CONDITIONAL"
                rec_label = "Dianjurkan Bersyarat (Pompanisasi / Lahan Kering)"
                badge_bg = "#FFF8E1"
                badge_text = "#F57F17"
                marker_color = "#F9AB00"
                priority_rank = 2
                total_recommended_count += 1
                total_potential_land_ha += int(land_ha * 0.6)
                projected_ton = round((land_ha * 0.6 * crop_spec["avg_yield_ton_ha"]) / 1000, 1)
                total_projected_production_ton += projected_ton

            # Status filter
            if status and status != "SEMUA" and rec_status != status:
                continue

            # Calculate Harvest Projection Window
            harvest_month_num = (active_month + int(crop_spec["growth_duration_months"]))
            if harvest_month_num > 12:
                harvest_month_num -= 12
            projected_harvest_month = cls.MONTH_NAMES[harvest_month_num - 1]

            # Estimated Economic Gross Output (Rupiah)
            gross_output_rp = int(land_ha * crop_spec["avg_yield_ton_ha"] * 1000 * crop_spec["base_price_kg"])

            results.append({
                "id": r["id"],
                "name": r["name"],
                "province": r["province"],
                "island": r["island"],
                "lat": r["lat"],
                "lng": r["lng"],
                "elevation_m": r.get("elevation_m", 50),
                "soil_type": r.get("soil_type", "Aluvial Subur"),
                "irrigation": r.get("irrigation", "Irigasi Teknis / Embung"),
                "suitability_score": suitability,
                "potential_land_ha": land_ha,
                "projected_yield_ton_ha": crop_spec["avg_yield_ton_ha"],
                "projected_production_thousand_ton": projected_ton,
                "gross_economic_value_rp": gross_output_rp,
                "status": rec_status,
                "status_label": rec_label,
                "badge_bg": badge_bg,
                "badge_text": badge_text,
                "marker_color": marker_color,
                "priority_rank": priority_rank,
                "recommended_varieties": varieties,
                "projected_harvest_month": projected_harvest_month,
                "growth_duration_months": crop_spec["growth_duration_months"],
                "field_notes": notes
            })

        # Sort by priority rank (Recommended first, then highest potential land)
        results.sort(key=lambda x: (x["priority_rank"], -x["potential_land_ha"]))

        # Build Seasonal Narrative
        season_cycle_narrative = (
            f"Pada bulan {month_name}, budidaya komoditas {crop_spec['name']} sangat dianjurkan di {total_recommended_count} sentra kabupaten utama "
            f"dengan estimasi kesiapan lahan seluas {total_potential_land_ha:,} Hektare. "
            f"Petani yang memulai penanaman pada bulan {month_name} diproyeksikan akan memasuki masa panen raya pada kisaran {cls.MONTH_NAMES[(active_month + int(crop_spec['growth_duration_months']) - 1) % 12]}."
        )

        return {
            "commodity": crop_spec,
            "selected_month": active_month,
            "selected_month_name": month_name,
            "summary": {
                "total_regencies_recommended": total_recommended_count,
                "total_regencies_shown": len(results),
                "total_potential_land_ha": total_potential_land_ha,
                "total_projected_production_thousand_ton": round(total_projected_production_ton, 1),
                "season_cycle_narrative": season_cycle_narrative
            },
            "regencies": results
        }
