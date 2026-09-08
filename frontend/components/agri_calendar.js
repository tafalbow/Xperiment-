/**
 * INDOEKONOMI data — Indonesia Economic Data Observatory
 * Component: AgriCalendarComponent (Kalender Musim Tanam, Pola Panen & Peta Rekomendasi Spasial Kabupaten)
 * ==============================================================================
 */

import { ApiClient } from '../services/api_client.js';

// Canonical Fallback Seasonal Narrative
const CANONICAL_SEASON_NARRATIVE = 
  "Bulan September merupakan fase transisi krusial di sektor pangan nasional: 1) Padi: Memasuki masa paceklik (lean season) dengan panen sawah irigasi menyusut (~5.8% produksi tahunan), beralih ke panen sawah pasang surut & lebak di Sumsel/Kalsel. 2) Kelapa Sawit: Berada pada puncak produksi panen raya TBS di Riau dan Kalteng. 3) Hortikultura: Bawang merah Brebes & Bima pasca panen raya dengan stok gudang memadai, sedangkan cabai rawit mulai mempersiapkan persemaian MT Rendeng.";

// Canonical Fallback 12-Month Calendar Matrix
const CANONICAL_CALENDAR_RECORDS = [
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 1, month_name: "Januari", season_stage: "Musim Tanam 1 (Rendeng) - Fase Vegetatif", activity_intensity: "Tinggi", production_share_pct: 5.2, key_regions: "Pantura Jawa (Karawang, Subang, Indramayu), Jawa Timur (Lamongan, Ngawi), Sulsel (Sidrap)", agroclimatic_factors: "Puncak curah hujan musim barat (Monsoon Barat), air irigasi melimpah.", source_document: "Kementan — Pola Tanam Nasional & BPS KSA" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 2, month_name: "Februari", season_stage: "Awal Panen Raya Musim Rendeng", activity_intensity: "Tinggi", production_share_pct: 9.8, key_regions: "Jawa Tengah (Grobogan, Demak), Aceh (Aceh Besar, Pidie), NTB (Lombok)", agroclimatic_factors: "Mulai transisi curah hujan, panen awal sawah tadah hujan.", source_document: "BPS — Kerangka Sampel Area (KSA) Padi" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 3, month_name: "Maret", season_stage: "Puncak Panen Raya Nasional (Peak Harvest)", activity_intensity: "Puncak Panen", production_share_pct: 16.5, key_regions: "Jawa Timur (Jember, Bojonegoro), Jawa Barat, Jawa Tengah, Lampung, Sumsel", agroclimatic_factors: "Produksi bulanan tertinggi sepanjang tahun (~5.2 juta ton GKG).", source_document: "Badan Pangan Nasional (Bapanas) & BPS" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 4, month_name: "April", season_stage: "Akhir Panen Raya & Olah Tanah MT 2 (Gadu)", activity_intensity: "Tinggi", production_share_pct: 14.2, key_regions: "Jawa Timur, Jawa Tengah, Jawa Barat, Sulawesi Selatan", agroclimatic_factors: "Cadangan gabah petani maksimal, Bulog penyerapan CBP puncak.", source_document: "Perum BULOG & Kementan" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 5, month_name: "Mei", season_stage: "Musim Tanam 2 (Gadu) - Penanaman Awal", activity_intensity: "Sedang", production_share_pct: 7.1, key_regions: "Sawah beririgasi teknis waduk (Jatiluhur, Kedung Ombo, Karangkates)", agroclimatic_factors: "Awal musim kemarau di Jawa dan Nusa Tenggara, petani mengandalkan pasokan saluran primer.", source_document: "Kementerian PUPR — Neraca Air Waduk Nasional" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 6, month_name: "Juni", season_stage: "Fase Vegetatif & Pemeliharaan MT 2 Gadu", activity_intensity: "Sedang", production_share_pct: 6.8, key_regions: "Jawa Timur, Jawa Tengah, Sulawesi Selatan, Kalimantan Selatan", agroclimatic_factors: "Musim kemarau aktif; pemupukan berimbang dan pengendalian wereng.", source_document: "Kementan — Ditjen Tanaman Pangan" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 7, month_name: "Juli", season_stage: "Panen Musim Gadu (Panen Kedua)", activity_intensity: "Tinggi", production_share_pct: 10.4, key_regions: "Pantura Jawa Barat, Jawa Timur (Tuban, Madiun), Sulsel (Bone, Wajo)", agroclimatic_factors: "Kualitas gabah sangat baik dengan kadar air rendah akibat hari kering optimal.", source_document: "BPS — Statistik Padi Subround II" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 8, month_name: "Agustus", season_stage: "Akhir Panen Gadu / Persiapan Palawija MT 3", activity_intensity: "Tinggi", production_share_pct: 9.1, key_regions: "Jawa Barat, Jawa Tengah, Jawa Timur, NTB", agroclimatic_factors: "Lahan sawah yang kekurangan air irigasi dialihkan ke palawija (kedelai, jagung).", source_document: "Kementan — Pola Tanam Palawija" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 9, month_name: "September", season_stage: "Musim Tanam 3 (Palawija/Kering) & Awal Paceklik", activity_intensity: "Sedang", production_share_pct: 6.2, key_regions: "Lahan pasang surut (Sumsel, Kalsel) dan sawah rawa lebak", agroclimatic_factors: "Puncak musim kemarau, penurunan stok di penggilingan padi swasta.", source_document: "Badan Pangan Nasional (Bapanas)" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 10, month_name: "Oktober", season_stage: "Awal Pengolahan Tanah Musim Tanam 1 (Rendeng)", activity_intensity: "Sedang", production_share_pct: 5.4, key_regions: "Sumatera (Sumut, Sumbar, Sumsel), Kalimantan Barat, Sulawesi Selatan", agroclimatic_factors: "Awal masuknya musim hujan di bagian barat Indonesia (transisi pancaroba).", source_document: "BMKG — Prakiraan Musim Hujan" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 11, month_name: "November", season_stage: "Penyemaian & Penanaman Serempak MT 1 Rendeng", activity_intensity: "Tinggi", production_share_pct: 4.8, key_regions: "Jawa, Bali, NTB, Lampung, Sumatera Selatan", agroclimatic_factors: "Masa paceklik (lean season); produksi bulanan rendah, intervensi pasar SPHP Bulog.", source_document: "Bapanas — SPHP Bulog" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 12, month_name: "Desember", season_stage: "Puncak Masa Paceklik (Lean Season) & Pemupukan MT 1", activity_intensity: "Rendah", production_share_pct: 4.5, key_regions: "Seluruh Indonesia (Lahan Sawah Nasional)", agroclimatic_factors: "Curah hujan tinggi; risiko banjir sawah di daerah aliran sungai rawan luapan.", source_document: "BNPB & Kementan" },
  { commodity_id: "COM-AGRI-002-JAGUNG", commodity_name: "Jagung Pipil Kering", crop_category: "Tanaman Pangan / Pakan Ternak", month: 2, month_name: "Februari", season_stage: "Panen Raya Jagung Musim Tanam Pertama", activity_intensity: "Puncak Panen", production_share_pct: 18.2, key_regions: "Jawa Timur (Tuban, Lamongan), NTB (Dompu, Bima), Gorontalo, Lampung", agroclimatic_factors: "Pasokan berlimpah untuk pabrik pakan ternak (feedmill).", source_document: "Kementan — Neraca Pakan Ternak" },
  { commodity_id: "COM-AGRI-002-JAGUNG", commodity_name: "Jagung Pipil Kering", crop_category: "Tanaman Pangan / Pakan Ternak", month: 7, month_name: "Juli", season_stage: "Panen Jagung Musim Kering (MT 2)", activity_intensity: "Tinggi", production_share_pct: 14.5, key_regions: "NTT, Sulsel (Jeneponto, Takalar), Jawa Tengah (Grobogan)", agroclimatic_factors: "Kadar air biji jagung rendah (<15%), kualitas fisik pipilan prima.", source_document: "BPS — Statistik Jagung" },
  { commodity_id: "COM-AGRI-002-JAGUNG", commodity_name: "Jagung Pipil Kering", crop_category: "Tanaman Pangan / Pakan Ternak", month: 9, month_name: "September", season_stage: "Musim Tanam 1 Awal (Menyambut Pancaroba)", activity_intensity: "Tinggi", production_share_pct: 7.2, key_regions: "Grobogan, Tuban, Dompu, Bima, Sumbawa, Jeneponto, Lampung", agroclimatic_factors: "Awal penanaman serentak di sentra tegalan dan lahan kering menyongsong musim basah.", source_document: "Kementan — Katam Terpadu" },
  { commodity_id: "COM-AGRI-004-CABAI", commodity_name: "Cabai Rawit & Cabai Merah", crop_category: "Hortikultura Strategis", month: 1, month_name: "Januari", season_stage: "Periode Rawan Pasokan & Curah Hujan Tinggi", activity_intensity: "Rendah", production_share_pct: 5.5, key_regions: "Jawa Timur (Kediri, Blitar), Jawa Tengah (Temanggung, Magelang)", agroclimatic_factors: "Curah hujan lebat memicu serangan antraknosa (patek); volatilitas harga tinggi.", source_document: "Kementan — EWS Hortikultura" },
  { commodity_id: "COM-AGRI-004-CABAI", commodity_name: "Cabai Rawit & Cabai Merah", crop_category: "Hortikultura Strategis", month: 6, month_name: "Juni", season_stage: "Puncak Panen Hortikultura Musim Kemarau", activity_intensity: "Puncak Panen", production_share_pct: 13.8, key_regions: "Kediri, Banyuwangi, Garut, Lombok Timur, Wajo", agroclimatic_factors: "Kondisi kering menekan hama jamur, pasokan pasar induk melimpah.", source_document: "BPS & Bapanas" },
  { commodity_id: "COM-AGRI-005-BAWANG", commodity_name: "Bawang Merah", crop_category: "Hortikultura Strategis", month: 7, month_name: "Juli", season_stage: "Panen Raya Bawang Merah Musim Kemarau", activity_intensity: "Puncak Panen", production_share_pct: 17.0, key_regions: "Brebes (Jateng), Nganjuk (Jatim), Bima (NTB), Enrekang (Sulsel)", agroclimatic_factors: "Sinar matahari terik optimal untuk proses penjemuran (curing) pascapanen.", source_document: "Asosiasi Bawang Merah Indonesia (ABMI)" },
  { commodity_id: "COM-AGRI-005-BAWANG", commodity_name: "Bawang Merah", crop_category: "Hortikultura Strategis", month: 12, month_name: "Desember", season_stage: "Tanam Bawang Merah Musim Hujan (Off-Season)", activity_intensity: "Rendah", production_share_pct: 4.8, key_regions: "Lahan tadah hujan pegunungan dan dataran tinggi", agroclimatic_factors: "Biaya produksi meningkat karena proteksi mulsa plastik dan fungisida.", source_document: "Kementan — Ditjen Hortikultura" },
  { commodity_id: "COM-PLANT-001-SAWIT", commodity_name: "Kelapa Sawit (CPO)", crop_category: "Perkebunan Strategis", month: 4, month_name: "April", season_stage: "Periode Produksi Rendah (Low Crop Cycle)", activity_intensity: "Rendah", production_share_pct: 6.8, key_regions: "Riau, Sumatera Utara, Sumatera Selatan, Kalimantan Tengah", agroclimatic_factors: "Siklus fisiologis istirahat tanaman pasca pembungaan.", source_document: "GAPKI" },
  { commodity_id: "COM-PLANT-001-SAWIT", commodity_name: "Kelapa Sawit (CPO)", crop_category: "Perkebunan Strategis", month: 10, month_name: "Oktober", season_stage: "Puncak Produksi Tandan Buah Segar (Peak Crop)", activity_intensity: "Puncak Panen", production_share_pct: 11.5, key_regions: "Riau, Kaltim, Kalbar, Kalsel, Sumut", agroclimatic_factors: "Tingkat utilisasi PKS mencapai 90-95%, volume ekspor CPO tinggi.", source_document: "GAPKI & BPDPKS" }
];

export class AgriCalendarComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    
    // Primary Filter State
    this.selectedCommodity = 'JAGUNG'; // Default: Jagung as requested
    this.selectedMonth = 9;            // Default: September (bulan berjalan)
    this.selectedIsland = 'SEMUA';
    this.selectedStatus = 'SEMUA';
    
    // Data Caches
    this.summaryData = null;
    this.calendarData = [];
    this.regenciesData = null;
    this.activeRegency = null;

    // Leaflet GIS Map Instances
    this.mapInstance = null;
    this.markersLayer = null;
    this.circlesLayer = null;
    this.markersMap = new Map();

    this.monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
  }

  async render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- 1. HEADER & OFFICIAL CONTEXT -->
        <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-3 shadow-2xs">
          <div class="flex items-center justify-between flex-wrap gap-2 border-b border-[#DADCE0] pb-2.5">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded bg-[#E6F4EA] text-[#1E8E3E] flex items-center justify-center text-lg shadow-2xs">🌾</span>
              <div>
                <h2 class="text-sm font-mono font-bold text-[#202124] uppercase tracking-wide">
                  KALENDER MUSIM TANAM, POLA PANEN & PETA REKOMENDASI SPASIAL KABUPATEN
                </h2>
                <div class="text-[11px] text-[#5F6368] font-sans">
                  Siklus Bulanan Produksi, Rekomendasi Kesesuaian Agroklimat Tanam, dan Pemetaan Sentra Kabupaten Se-Indonesia
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="px-2.5 py-1 rounded bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3] font-semibold text-[10.5px]">
                Otoritas: Kementan (Katam Terpadu) • Bapanas • BMKG • BPS KSA
              </span>
            </div>
          </div>

          <!-- SUMMARY NARRATIVE BANNER -->
          <div id="agri-calendar-summary-box" class="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-xs space-y-1">
            <div class="text-[10.5px] font-mono font-bold text-[#202124] uppercase flex items-center gap-1.5">
              <span>📌</span>
              <span>Konteks Agroklimat & Dinamika Musim Berjalan</span>
            </div>
            <p id="agri-calendar-narrative-text" class="text-[11.5px] text-[#3C4043] font-sans leading-relaxed">
              Memuat data ritme komoditas pangan strategis...
            </p>
          </div>

          <!-- 2. INTERACTIVE CONTROLS BAR -->
          <div class="p-3 bg-white rounded border border-[#DADCE0] space-y-2.5">
            <div class="flex items-center justify-between flex-wrap gap-2 border-b border-[#F1F3F4] pb-2">
              <span class="text-xs font-mono font-bold text-[#202124] uppercase flex items-center gap-1.5">
                <span>🎯</span>
                <span>Filter Bahan Baku Komoditas & Wilayah Tanam</span>
              </span>
              <span id="agri-active-criteria-badge" class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E8F0FE] text-[#1A73E8] font-semibold">
                Komoditas: Jagung Hibrida • Bulan: September
              </span>
            </div>

            <div class="flex items-center gap-3 flex-wrap text-xs font-mono">
              <!-- Filter: Bahan Baku / Komoditas -->
              <div class="flex items-center gap-1.5">
                <label for="agri-cal-commodity-select" class="text-[#5F6368] font-medium">Bahan Baku Tanam:</label>
                <select id="agri-cal-commodity-select" class="px-2.5 py-1.5 rounded border border-[#DADCE0] bg-white text-xs font-mono font-semibold text-[#202124] outline-none focus:border-[#1A73E8] shadow-2xs">
                  <option value="JAGUNG" selected>🌽 Jagung Pipil Hibrida (Zea mays)</option>
                  <option value="PADI_BERAS">🌾 Padi Sawah / Beras (Oryza sativa)</option>
                  <option value="CABAI_RAWIT">🌶️ Cabai Rawit & Keriting (Capsicum)</option>
                  <option value="BAWANG_MERAH">🧅 Bawang Merah Super (Allium ascalonicum)</option>
                  <option value="KEDELAI">🌱 Kedelai Bebas GMO (Glycine max)</option>
                  <option value="BAWANG_PUTIH">🧄 Bawang Putih Dataran Tinggi (Allium sativum)</option>
                  <option value="KELAPA_SAWIT">🌴 Kelapa Sawit TBS / CPO (Elaeis guineensis)</option>
                  <option value="TEBU">🎋 Tebu Gula & Bioetanol (Saccharum)</option>
                  <option value="UBI_KAYU">🥔 Ubi Kayu / Singkong (Manihot esculenta)</option>
                  <option value="KOPI">☕ Kopi Spesialti (Arabika & Robusta)</option>
                </select>
              </div>

              <!-- Filter: Bulan Tanam -->
              <div class="flex items-center gap-1.5">
                <label for="agri-cal-month-select" class="text-[#5F6368] font-medium">Bulan Tanam:</label>
                <select id="agri-cal-month-select" class="px-2.5 py-1.5 rounded border border-[#DADCE0] bg-white text-xs font-mono font-semibold text-[#202124] outline-none focus:border-[#1A73E8] shadow-2xs">
                  <option value="1">Bulan 1 - Januari</option>
                  <option value="2">Bulan 2 - Februari</option>
                  <option value="3">Bulan 3 - Maret</option>
                  <option value="4">Bulan 4 - April</option>
                  <option value="5">Bulan 5 - Mei</option>
                  <option value="6">Bulan 6 - Juni</option>
                  <option value="7">Bulan 7 - Juli</option>
                  <option value="8">Bulan 8 - Agustus</option>
                  <option value="9" selected>Bulan 9 - September (Bulan Berjalan)</option>
                  <option value="10">Bulan 10 - Oktober</option>
                  <option value="11">Bulan 11 - November</option>
                  <option value="12">Bulan 12 - Desember</option>
                </select>
              </div>

              <!-- Filter: Wilayah Pulau -->
              <div class="flex items-center gap-1.5">
                <label for="agri-cal-island-select" class="text-[#5F6368] font-medium">Pulau:</label>
                <select id="agri-cal-island-select" class="px-2.5 py-1.5 rounded border border-[#DADCE0] bg-white text-xs font-mono text-[#202124] outline-none focus:border-[#1A73E8]">
                  <option value="SEMUA" selected>Semua Pulau (Nasional)</option>
                  <option value="JAWA">Pulau Jawa</option>
                  <option value="SUMATERA">Pulau Sumatera</option>
                  <option value="SULAWESI">Pulau Sulawesi</option>
                  <option value="BALI_NUSA_TENGGARA">Bali & Nusa Tenggara</option>
                  <option value="KALIMANTAN">Pulau Kalimantan</option>
                  <option value="MALUKU_PAPUA">Maluku & Papua</option>
                </select>
              </div>

              <!-- Filter: Status Rekomendasi -->
              <div class="flex items-center gap-1.5">
                <label for="agri-cal-status-select" class="text-[#5F6368] font-medium">Status Rekomendasi:</label>
                <select id="agri-cal-status-select" class="px-2.5 py-1.5 rounded border border-[#DADCE0] bg-white text-xs font-mono text-[#202124] outline-none focus:border-[#1A73E8]">
                  <option value="SEMUA" selected>Semua Status</option>
                  <option value="RECOMMENDED_PRIME">🟢 Sangat Dianjurkan (Musim Utama)</option>
                  <option value="RECOMMENDED_CONDITIONAL">🟡 Dianjurkan Bersyarat (Pompanisasi)</option>
                  <option value="GROWING">🔵 Masa Vegetatif / Pemeliharaan</option>
                  <option value="HARVESTING">🟠 Masa Panen Raya Berjalan</option>
                </select>
              </div>

              <!-- Reset Button -->
              <button id="agri-cal-reset-btn" class="px-3 py-1.5 rounded bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#3C4043] border border-[#DADCE0] text-xs font-mono cursor-pointer transition-colors shadow-2xs">
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <!-- 3. KPI INFOGRAPHIC METRICS BANNER -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <!-- KPI 1 -->
          <div class="bg-white p-3.5 rounded-lg border border-[#DADCE0] shadow-2xs space-y-1">
            <div class="text-[10.5px] font-mono text-[#5F6368] uppercase flex items-center justify-between">
              <span>Kabupaten Dianjurkan</span>
              <span>📍</span>
            </div>
            <div id="kpi-regencies-count" class="text-xl font-mono font-bold text-[#1E8E3E]">
              -
            </div>
            <div id="kpi-regencies-sub" class="text-[11px] text-[#5F6368] font-sans truncate">
              Kesesuaian Agroklimat Optimal
            </div>
          </div>

          <!-- KPI 2 -->
          <div class="bg-white p-3.5 rounded-lg border border-[#DADCE0] shadow-2xs space-y-1">
            <div class="text-[10.5px] font-mono text-[#5F6368] uppercase flex items-center justify-between">
              <span>Estimasi Luas Tanam</span>
              <span>📐</span>
            </div>
            <div id="kpi-potential-land" class="text-xl font-mono font-bold text-[#202124]">
              -
            </div>
            <div class="text-[11px] text-[#5F6368] font-sans">
              Hektare Lahan Siap Tanam
            </div>
          </div>

          <!-- KPI 3 -->
          <div class="bg-white p-3.5 rounded-lg border border-[#DADCE0] shadow-2xs space-y-1">
            <div class="text-[10.5px] font-mono text-[#5F6368] uppercase flex items-center justify-between">
              <span>Proyeksi Produksi</span>
              <span>🎯</span>
            </div>
            <div id="kpi-projected-production" class="text-xl font-mono font-bold text-[#1A73E8]">
              -
            </div>
            <div class="text-[11px] text-[#5F6368] font-sans">
              Ribu Ton Gabah / Pipil / Basah
            </div>
          </div>

          <!-- KPI 4 -->
          <div class="bg-white p-3.5 rounded-lg border border-[#DADCE0] shadow-2xs space-y-1">
            <div class="text-[10.5px] font-mono text-[#5F6368] uppercase flex items-center justify-between">
              <span>Siklus Tanam ➔ Panen</span>
              <span>⏱️</span>
            </div>
            <div id="kpi-harvest-window" class="text-base font-mono font-bold text-[#E37400] pt-1">
              -
            </div>
            <div id="kpi-growth-duration" class="text-[11px] text-[#5F6368] font-sans">
              Durasi masa tanam standar
            </div>
          </div>
        </div>

        <!-- 4. SPATIAL MAP & INFOGRAPHIC DETAIL PANEL -->
        <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-3 shadow-2xs">
          <div class="flex items-center justify-between flex-wrap gap-2 border-b border-[#DADCE0] pb-2.5">
            <div>
              <h3 class="text-xs font-mono font-bold uppercase text-[#202124] flex items-center gap-1.5">
                <span>🗺️</span>
                <span>PETA INFOGRAFIS SPASIAL REKOMENDASI TANAM TINGKAT KABUPATEN SE-INDONESIA</span>
              </h3>
              <div class="text-[11px] text-[#5F6368] font-sans">
                Arahkan kursor atau klik pin kabupaten pada peta untuk menelaah profil agroklimat, varietas benih, dan jadwal panen.
              </div>
            </div>

            <!-- View Action Controls -->
            <div class="flex items-center gap-2 text-xs font-mono">
              <button id="agri-map-reset-zoom-btn" class="px-2.5 py-1 rounded bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#3C4043] border border-[#DADCE0] text-[11px] font-mono flex items-center gap-1 cursor-pointer">
                <span>🔍</span>
                <span>Reset Peta Nasional</span>
              </button>
            </div>
          </div>

          <!-- 2-Column Responsive Layout: Map (Left) + Detail Card (Right) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <!-- Left: Leaflet Interactive Map Container (8 cols) -->
            <div class="lg:col-span-8 flex flex-col space-y-2">
              <div id="agri-map-container" class="w-full h-[520px] rounded-lg bg-[#F8F9FA] border border-[#DADCE0] overflow-hidden relative z-0 shadow-inner">
                <!-- Map Canvas rendered by Leaflet -->
              </div>

              <!-- Map Legend Bar -->
              <div class="p-2.5 bg-[#F8F9FA] rounded border border-[#DADCE0] flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                <div class="flex items-center gap-1 text-[#5F6368] font-bold uppercase text-[10px]">
                  <span>Legenda Status:</span>
                </div>
                <div class="flex items-center gap-4 flex-wrap">
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-[#1E8E3E] ring-2 ring-emerald-100 inline-block"></span>
                    <span class="text-[#202124]">Sangat Dianjurkan (MT Utama)</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-[#F9AB00] ring-2 ring-amber-100 inline-block"></span>
                    <span class="text-[#202124]">Dianjurkan Bersyarat (Pompanisasi)</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-[#1A73E8] ring-2 ring-blue-100 inline-block"></span>
                    <span class="text-[#202124]">Masa Vegetatif / Perawatan</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-[#E65100] ring-2 ring-orange-100 inline-block"></span>
                    <span class="text-[#202124]">Panen Raya</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Detailed Infographic Panel & Regency List (4 cols) -->
            <div class="lg:col-span-4 flex flex-col space-y-3">
              <!-- Selected Regency Detailed Card -->
              <div id="agri-regency-detail-panel" class="p-4 bg-white rounded-lg border border-[#DADCE0] shadow-sm space-y-3 min-h-[320px]">
                <div class="text-center py-12 text-[#5F6368] font-sans text-xs space-y-2">
                  <div class="text-2xl">🌾</div>
                  <p class="font-medium">Pilih salah satu kabupaten pada peta atau dari daftar di bawah untuk melihat rincian infografis tanam.</p>
                </div>
              </div>

              <!-- Fast Regency Picker List -->
              <div class="p-3 bg-[#F8F9FA] rounded-lg border border-[#DADCE0] space-y-2 flex-1 flex flex-col">
                <div class="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
                  <span class="text-[11px] font-mono font-bold text-[#202124] uppercase flex items-center gap-1">
                    <span>📋</span>
                    <span>Daftar Kabupaten Terpilih</span>
                  </span>
                  <span id="agri-regencies-list-count" class="text-[10px] font-mono text-[#5F6368]">
                    0 Kabupaten
                  </span>
                </div>

                <div id="agri-regencies-list-container" class="space-y-1.5 max-h-[175px] overflow-y-auto pr-1 scrollbar-thin">
                  <!-- Populated dynamically with regency items -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. CALENDAR MATRIX GRID (TABEL POLA RITME NASIONAL) -->
        <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-3 shadow-2xs">
          <div class="flex items-center justify-between border-b border-[#DADCE0] pb-2">
            <span class="text-xs font-mono font-bold uppercase text-[#202124] flex items-center gap-1.5">
              <span>📅</span>
              <span>MATRIKS RITME MUSIM & TAHAPAN PANEN NASIONAL (STATUTORI 12 BULAN)</span>
            </span>
            <span id="agri-cal-count" class="text-[10.5px] font-mono text-[#5F6368]">
              Menampilkan data ritme...
            </span>
          </div>

          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full text-xs font-mono border border-[#DADCE0] border-collapse">
              <thead class="bg-[#F8F9FA] text-[#3C4043] border-b border-[#DADCE0]">
                <tr>
                  <th class="p-2.5 text-left border-r border-[#DADCE0] w-24">Bulan</th>
                  <th class="p-2.5 text-left border-r border-[#DADCE0] w-44">Komoditas</th>
                  <th class="p-2.5 text-left border-r border-[#DADCE0] w-48">Tahapan Musim</th>
                  <th class="p-2.5 text-center border-r border-[#DADCE0] w-28">Intensitas</th>
                  <th class="p-2.5 text-right border-r border-[#DADCE0] w-24">Porsi Output</th>
                  <th class="p-2.5 text-left border-r border-[#DADCE0]">Sentra Wilayah Produksi</th>
                  <th class="p-2.5 text-left">Catatan Agroklimat & Sitasi</th>
                </tr>
              </thead>
              <tbody id="agri-calendar-tbody" class="divide-y divide-[#DADCE0] bg-white text-[#202124]">
                <tr>
                  <td colspan="7" class="p-6 text-center text-slate-400 font-sans">
                    Memuat matriks ritme panen...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    await this.loadData();
  }

  attachEventListeners() {
    const commSelect = document.getElementById('agri-cal-commodity-select');
    const monthSelect = document.getElementById('agri-cal-month-select');
    const islandSelect = document.getElementById('agri-cal-island-select');
    const statusSelect = document.getElementById('agri-cal-status-select');
    const resetBtn = document.getElementById('agri-cal-reset-btn');
    const resetZoomBtn = document.getElementById('agri-map-reset-zoom-btn');

    commSelect?.addEventListener('change', (e) => {
      this.selectedCommodity = e.target.value;
      this.updateActiveCriteriaBadge();
      this.loadRegencyRecommendations();
      this.fetchAndRenderRows();
    });

    monthSelect?.addEventListener('change', (e) => {
      this.selectedMonth = parseInt(e.target.value);
      this.updateActiveCriteriaBadge();
      this.loadRegencyRecommendations();
      this.fetchAndRenderRows();
    });

    islandSelect?.addEventListener('change', (e) => {
      this.selectedIsland = e.target.value;
      this.loadRegencyRecommendations();
    });

    statusSelect?.addEventListener('change', (e) => {
      this.selectedStatus = e.target.value;
      this.loadRegencyRecommendations();
    });

    resetBtn?.addEventListener('click', () => {
      if (commSelect) commSelect.value = 'JAGUNG';
      if (monthSelect) monthSelect.value = '9';
      if (islandSelect) islandSelect.value = 'SEMUA';
      if (statusSelect) statusSelect.value = 'SEMUA';

      this.selectedCommodity = 'JAGUNG';
      this.selectedMonth = 9;
      this.selectedIsland = 'SEMUA';
      this.selectedStatus = 'SEMUA';

      this.updateActiveCriteriaBadge();
      this.loadRegencyRecommendations();
      this.fetchAndRenderRows();
    });

    resetZoomBtn?.addEventListener('click', () => {
      if (this.mapInstance) {
        this.mapInstance.setView([-2.2, 118.0], 5);
      }
    });
  }

  updateActiveCriteriaBadge() {
    const badge = document.getElementById('agri-active-criteria-badge');
    if (!badge) return;
    const commSelect = document.getElementById('agri-cal-commodity-select');
    const commText = commSelect ? commSelect.options[commSelect.selectedIndex].text.split('(')[0] : this.selectedCommodity;
    const monthText = this.monthNames[(this.selectedMonth || 9) - 1];
    badge.textContent = `Komoditas: ${commText.trim()} • Bulan: ${monthText}`;
  }

  async loadData() {
    // 1. Fetch High-Level Summary Narrative
    try {
      const summary = await ApiClient.fetchAgriculturalCalendarSummary();
      this.summaryData = summary;
      const narrText = document.getElementById('agri-calendar-narrative-text');
      if (narrText && summary && summary.current_season_narrative) {
        narrText.textContent = summary.current_season_narrative;
      }
    } catch (e) {
      console.warn('Menggunakan ringkasan agroklimat kanonikal:', e);
      const narrText = document.getElementById('agri-calendar-narrative-text');
      if (narrText) narrText.textContent = CANONICAL_SEASON_NARRATIVE;
    }

    // 2. Load Regency-Level Map Recommendations
    await this.loadRegencyRecommendations();

    // 3. Load Calendar Matrix Table
    await this.fetchAndRenderRows();
  }

  async loadRegencyRecommendations() {
    const params = {
      commodity_id: this.selectedCommodity || 'JAGUNG',
      month: this.selectedMonth || 9
    };
    if (this.selectedIsland && this.selectedIsland !== 'SEMUA') {
      params.island = this.selectedIsland;
    }
    if (this.selectedStatus && this.selectedStatus !== 'SEMUA') {
      params.status = this.selectedStatus;
    }

    try {
      const data = await ApiClient.fetchRegencyPlantingRecommendations(params);
      this.regenciesData = data;
      this.renderKPIs(data);
      this.renderRegenciesList(data.regencies);
      this.renderLeafletMap(data);

      // Auto-select first recommended regency for detail card
      if (data.regencies && data.regencies.length > 0) {
        this.selectRegency(data.regencies[0], false);
      }
    } catch (e) {
      console.error('Error fetching regency recommendations:', e);
    }
  }

  renderKPIs(data) {
    const countEl = document.getElementById('kpi-regencies-count');
    const landEl = document.getElementById('kpi-potential-land');
    const prodEl = document.getElementById('kpi-projected-production');
    const harvestEl = document.getElementById('kpi-harvest-window');
    const durationEl = document.getElementById('kpi-growth-duration');

    const summary = data?.summary || {};
    const commodity = data?.commodity || {};

    if (countEl) countEl.textContent = `${summary.total_regencies_recommended || 0} Kabupaten`;
    if (landEl) landEl.textContent = `${(summary.total_potential_land_ha || 0).toLocaleString('id-ID')} Ha`;
    if (prodEl) prodEl.textContent = `${(summary.total_projected_production_thousand_ton || 0).toLocaleString('id-ID')} Ribu Ton`;

    const activeM = data?.selected_month || 9;
    const dur = Math.round(commodity.growth_duration_months || 3.5);
    const harvestMonthName = this.monthNames[(activeM + dur - 1) % 12];

    if (harvestEl) harvestEl.textContent = `Tanam ${data?.selected_month_name} ➔ Panen ${harvestMonthName}`;
    if (durationEl) durationEl.textContent = `Masa Tanam: ~${commodity.growth_duration_months || 3.5} Bulan`;
  }

  renderRegenciesList(regencies = []) {
    const container = document.getElementById('agri-regencies-list-container');
    const countBadge = document.getElementById('agri-regencies-list-count');
    if (!container) return;

    if (countBadge) countBadge.textContent = `${regencies.length} Kabupaten`;

    if (!regencies || regencies.length === 0) {
      container.innerHTML = `
        <div class="p-3 text-center text-slate-400 font-sans text-xs">
          Tidak ada kabupaten yang memenuhi kriteria filter.
        </div>
      `;
      return;
    }

    container.innerHTML = regencies.map((r, idx) => {
      const isSelected = this.activeRegency && this.activeRegency.id === r.id;
      return `
        <div class="regency-list-item p-2 rounded border ${isSelected ? 'border-[#1A73E8] bg-[#F1F3F4]' : 'border-[#DADCE0] bg-white hover:bg-[#F8F9FA]'} cursor-pointer transition-all flex items-center justify-between" data-regency-id="${r.id}">
          <div class="flex items-center gap-2 truncate">
            <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${r.marker_color};"></span>
            <div class="truncate">
              <div class="font-mono text-xs font-bold text-[#202124] truncate">${r.name}</div>
              <div class="text-[10px] text-[#5F6368] font-sans truncate">${r.province} • ${r.potential_land_ha.toLocaleString('id-ID')} Ha</div>
            </div>
          </div>
          <span class="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0" style="background-color: ${r.badge_bg}; color: ${r.badge_text};">
            ${r.suitability_score}%
          </span>
        </div>
      `;
    }).join('');

    // Attach click handlers
    container.querySelectorAll('.regency-list-item').forEach(el => {
      el.addEventListener('click', () => {
        const regId = el.getAttribute('data-regency-id');
        const reg = regencies.find(item => item.id === regId);
        if (reg) this.selectRegency(reg, true);
      });
    });
  }

  initLeafletMap() {
    const mapContainer = document.getElementById('agri-map-container');
    if (!mapContainer) return false;
    if (typeof L === 'undefined') {
      console.warn('Leaflet library is still loading...');
      return false;
    }

    if (this.mapInstance) {
      try {
        this.mapInstance.remove();
      } catch (e) {}
      this.mapInstance = null;
    }

    this.markersMap.clear();

    // Default center in central Indonesia archipelago
    this.mapInstance = L.map('agri-map-container', {
      center: [-2.2, 118.0],
      zoom: 5,
      minZoom: 4,
      maxZoom: 14,
      zoomControl: true,
      attributionControl: false
    });

    // Standard OpenStreetMap TileLayer (Same as other pages, No API key required)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapInstance);

    this.circlesLayer = L.layerGroup().addTo(this.mapInstance);
    this.markersLayer = L.layerGroup().addTo(this.mapInstance);

    return true;
  }

  renderLeafletMap(data) {
    if (!this.initLeafletMap()) return;

    const regencies = data.regencies || [];
    const commodity = data.commodity || { icon: '🌾' };

    if (regencies.length === 0) {
      this.mapInstance.setView([-2.2, 118.0], 5);
      return;
    }

    const bounds = [];

    regencies.forEach(r => {
      if (!r.lat || !r.lng) return;

      const isPrime = r.status === 'RECOMMENDED_PRIME';
      const isSelected = this.activeRegency && this.activeRegency.id === r.id;

      // 1. Interactive Area Circles for Suitability Footprint
      const radiusMeters = Math.min(Math.max(r.potential_land_ha * 0.45, 12000), 45000);
      const circle = L.circle([r.lat, r.lng], {
        radius: radiusMeters,
        color: r.marker_color,
        fillColor: r.marker_color,
        fillOpacity: isPrime ? 0.22 : 0.12,
        weight: isPrime ? 1.5 : 1,
        dashArray: isPrime ? null : '3, 4'
      }).addTo(this.circlesLayer);

      // 2. Custom Infographic Pin Marker
      const iconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          ${isPrime ? `
            <div class="absolute -inset-1.5 rounded-full opacity-60 animate-ping" style="background-color: ${r.marker_color};"></div>
          ` : ''}
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md border-2 border-white transition-transform transform group-hover:scale-125" style="background-color: ${r.marker_color};">
            <span>${commodity.icon || '🌾'}</span>
          </div>
          <div class="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 text-[#202124] text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded shadow border border-[#DADCE0] whitespace-nowrap pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all">
            ${r.name.replace('Kab. ', '')}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'agri-custom-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([r.lat, r.lng], { icon: customIcon }).addTo(this.markersLayer);
      this.markersMap.set(r.id, marker);

      // Popup Content
      const popupHtml = `
        <div class="p-3 font-sans text-xs space-y-2 bg-white text-[#202124] rounded-lg max-w-[270px] shadow-sm">
          <div class="border-b border-[#DADCE0] pb-1.5">
            <div class="flex items-center justify-between gap-1">
              <strong class="font-mono text-xs text-[#202124]">${r.name}</strong>
              <span class="text-[9.5px] font-mono px-1.5 py-0.2 rounded font-bold" style="background-color: ${r.badge_bg}; color: ${r.badge_text};">
                ${r.suitability_score}%
              </span>
            </div>
            <div class="text-[10.5px] text-[#5F6368] font-sans">${r.province} (${r.island})</div>
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-[#5F6368]">Status Tanam:</span>
              <span class="font-mono font-bold" style="color: ${r.marker_color};">${r.status_label.split('(')[0]}</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-[#5F6368]">Potensi Lahan:</span>
              <span class="font-mono font-bold text-[#202124]">${r.potential_land_ha.toLocaleString('id-ID')} Ha</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-[#5F6368]">Jadwal Panen:</span>
              <span class="font-mono font-semibold text-[#1A73E8]">${r.projected_harvest_month}</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-[#5F6368]">Benih Anjuran:</span>
              <span class="font-mono text-[10px] text-[#202124] truncate max-w-[140px]">${r.recommended_varieties}</span>
            </div>
          </div>

          <div class="pt-1 border-t border-[#F1F3F4] text-center">
            <button class="w-full py-1 rounded bg-[#E8F0FE] text-[#1A73E8] hover:bg-[#D2E3FC] text-[10.5px] font-mono font-bold transition-colors">
              Lihat Analisis Lengkap ➔
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        this.selectRegency(r, false);
      });

      bounds.push([r.lat, r.lng]);
    });

    if (bounds.length > 0) {
      this.mapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
    }

    setTimeout(() => {
      if (this.mapInstance) this.mapInstance.invalidateSize();
    }, 150);
  }

  selectRegency(regency, panMap = true) {
    this.activeRegency = regency;
    const detailPanel = document.getElementById('agri-regency-detail-panel');
    if (!detailPanel) return;

    const commodity = this.regenciesData?.commodity || { name: 'Komoditas', icon: '🌾' };

    detailPanel.innerHTML = `
      <div class="space-y-3">
        <!-- Header Info -->
        <div class="border-b border-[#DADCE0] pb-2">
          <div class="flex items-center justify-between gap-1">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E8F0FE] text-[#1A73E8] font-bold">
              ${regency.island}
            </span>
            <span class="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded" style="background-color: ${regency.badge_bg}; color: ${regency.badge_text};">
              Skor Kesesuaian: ${regency.suitability_score}/100
            </span>
          </div>
          <h4 class="text-sm font-mono font-bold text-[#202124] mt-1.5">
            ${regency.name}
          </h4>
          <div class="text-xs text-[#5F6368] font-sans">
            Provinsi ${regency.province} • Elevasi ${regency.elevation_m} mdpl
          </div>
        </div>

        <!-- Status Box -->
        <div class="p-2.5 rounded border text-xs space-y-1" style="background-color: ${regency.badge_bg}; border-color: ${regency.marker_color};">
          <div class="font-mono text-[10px] uppercase font-bold" style="color: ${regency.badge_text};">
            Rekomendasi Musim Tanam Bulan ${this.regenciesData?.selected_month_name || 'Ini'}
          </div>
          <div class="font-mono font-bold text-xs" style="color: ${regency.marker_color};">
            ${regency.status_label}
          </div>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-2 gap-2 text-xs font-mono">
          <div class="p-2 bg-[#F8F9FA] rounded border border-[#DADCE0]">
            <div class="text-[10px] text-[#5F6368]">Kesiapan Lahan</div>
            <div class="font-bold text-[#202124] text-xs">${regency.potential_land_ha.toLocaleString('id-ID')} Ha</div>
          </div>
          <div class="p-2 bg-[#F8F9FA] rounded border border-[#DADCE0]">
            <div class="text-[10px] text-[#5F6368]">Target Produktivitas</div>
            <div class="font-bold text-[#1E8E3E] text-xs">${regency.projected_yield_ton_ha} Ton / Ha</div>
          </div>
          <div class="p-2 bg-[#F8F9FA] rounded border border-[#DADCE0]">
            <div class="text-[10px] text-[#5F6368]">Proyeksi Panen</div>
            <div class="font-bold text-[#1A73E8] text-xs">Bulan ${regency.projected_harvest_month}</div>
          </div>
          <div class="p-2 bg-[#F8F9FA] rounded border border-[#DADCE0]">
            <div class="text-[10px] text-[#5F6368]">Estimasi Output Bruto</div>
            <div class="font-bold text-[#B06000] text-xs truncate">Rp ${(regency.gross_economic_value_rp / 1000000000).toFixed(1)} M</div>
          </div>
        </div>

        <!-- Agronomy Specifications -->
        <div class="space-y-1.5 text-xs font-sans">
          <div>
            <span class="font-mono text-[10.5px] font-bold text-[#202124]">Varietas Benih Kementan:</span>
            <div class="text-[11.5px] text-[#1A73E8] font-mono mt-0.5 bg-[#E8F0FE] p-1.5 rounded">
              ${regency.recommended_varieties}
            </div>
          </div>
          <div>
            <span class="font-mono text-[10.5px] font-bold text-[#202124]">Karakteristik Lahan & Irigasi:</span>
            <div class="text-[11px] text-[#3C4043] leading-relaxed">
              ${regency.soil_type} • ${regency.irrigation}
            </div>
          </div>
          <div>
            <span class="font-mono text-[10.5px] font-bold text-[#202124]">Catatan Lapangan & Rekomendasi:</span>
            <div class="text-[11px] text-[#5F6368] leading-relaxed italic">
              "${regency.field_notes || 'Lahan sangat siap untuk penanaman komoditas strategis sesuai siklus agroklimat.'}"
            </div>
          </div>
        </div>
      </div>
    `;

    // Highlight selected item in list
    document.querySelectorAll('.regency-list-item').forEach(el => {
      if (el.getAttribute('data-regency-id') === regency.id) {
        el.classList.add('border-[#1A73E8]', 'bg-[#F1F3F4]');
        el.classList.remove('border-[#DADCE0]', 'bg-white');
      } else {
        el.classList.remove('border-[#1A73E8]', 'bg-[#F1F3F4]');
        el.classList.add('border-[#DADCE0]', 'bg-white');
      }
    });

    // Pan map to regency if requested
    if (panMap && this.mapInstance && regency.lat && regency.lng) {
      this.mapInstance.setView([regency.lat, regency.lng], 9, { animate: true });
      const marker = this.markersMap.get(regency.id);
      if (marker) marker.openPopup();
    }
  }

  async fetchAndRenderRows() {
    const tbody = document.getElementById('agri-calendar-tbody');
    const countEl = document.getElementById('agri-cal-count');
    if (!tbody) return;

    let items = [];

    try {
      const params = {};
      if (this.selectedCommodity) params.commodity_id = this.selectedCommodity;
      if (this.selectedMonth) params.month = parseInt(this.selectedMonth);

      items = await ApiClient.fetchAgriculturalCalendar(params);
      this.calendarData = items;
    } catch (e) {
      console.warn('Menggunakan basis data kalender kanonikal resmi:', e);
      items = CANONICAL_CALENDAR_RECORDS.filter(record => {
        if (this.selectedCommodity && !record.commodity_id.includes(this.selectedCommodity)) return false;
        if (this.selectedMonth && record.month !== parseInt(this.selectedMonth)) return false;
        return true;
      });
      this.calendarData = items;
    }

    if (countEl) {
      countEl.textContent = `${items.length} catatan tahapan musim`;
    }

    if (!items || items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="p-6 text-center text-slate-400 font-sans">
            Tidak ada catatan musim tanam untuk kombinasi filter ini.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = items.map(item => {
      let intensityBadge = 'bg-slate-100 text-slate-700';
      if (item.activity_intensity === 'Puncak Panen') {
        intensityBadge = 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] font-bold';
      } else if (item.activity_intensity === 'Tinggi') {
        intensityBadge = 'bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC] font-semibold';
      } else if (item.activity_intensity === 'Rendah') {
        intensityBadge = 'bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]';
      }

      return `
        <tr class="hover:bg-[#F8F9FA] transition-colors">
          <td class="p-2.5 border-r border-[#DADCE0] font-bold text-[#202124]">
            ${item.month_name}
          </td>
          <td class="p-2.5 border-r border-[#DADCE0] font-semibold text-[#1A73E8]">
            ${item.commodity_name}
            <div class="text-[10px] text-[#5F6368] font-normal">${item.crop_category}</div>
          </td>
          <td class="p-2.5 border-r border-[#DADCE0] text-[#202124] font-medium">
            ${item.season_stage}
          </td>
          <td class="p-2.5 border-r border-[#DADCE0] text-center">
            <span class="px-2 py-0.5 rounded text-[10px] ${intensityBadge}">
              ${item.activity_intensity}
            </span>
          </td>
          <td class="p-2.5 border-r border-[#DADCE0] text-right font-bold text-[#202124]">
            ${item.production_share_pct ? item.production_share_pct + '%' : '-'}
          </td>
          <td class="p-2.5 border-r border-[#DADCE0] text-[#3C4043] font-sans text-[11px] leading-relaxed">
            ${item.key_regions}
          </td>
          <td class="p-2.5 text-[#5F6368] font-sans text-[11px] leading-relaxed">
            <div>${item.agroclimatic_factors || '-'}</div>
            <div class="text-[10px] text-[#1A73E8] mt-1 font-mono">
              Sumber: ${item.source_document || 'Kementan & BPS'}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }
}
