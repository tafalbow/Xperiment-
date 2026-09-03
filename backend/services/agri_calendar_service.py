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
