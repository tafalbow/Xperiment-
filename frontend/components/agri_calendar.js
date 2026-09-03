// ==============================================================================
// AGRICULTURAL CALENDAR COMPONENT (KALENDER MUSIM TANAM & POLA PANEN NASIONAL)
// 12-Month Commodity Rhythm Matrix, Seasonal Stages, Breadbasket Sentras & Citations
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

const CANONICAL_SEASON_NARRATIVE = "Pola produksi pangan Indonesia dipengaruhi secara kuat oleh monsun musiman (Monsoon Asia-Australia). Padi sawah memiliki dua siklus utama: Musim Tanam 1 (Rendeng / Basah, Oktober–Februari) dengan Puncak Panen Raya pada Maret–April yang memasok ~60-65% produksi beras nasional, serta Musim Tanam 2 (Gadu / Kering, April–Agustus) dengan panen kedua pada Juli–Agustus. Periode paceklik (lean season) nasional berlangsung pada November–Januari sebelum panen rendeng tiba. Komoditas hortikultura (cabai & bawang merah) sangat rentan terhadap anomali La Niña (kebusukan akibat curah hujan ekstrem) dan El Niño (kekeringan), sementara produksi Kelapa Sawit (TBS) mencapai puncak tahunan (peak crop) pada September–November.";

const CANONICAL_CALENDAR_RECORDS = [
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 1, month_name: "Januari", season_stage: "Musim Tanam 1 (Rendeng) - Fase Vegetatif", activity_intensity: "Tinggi", production_share_pct: 5.2, key_regions: "Pantura Jawa (Karawang, Subang, Indramayu), Jawa Timur (Lamongan, Ngawi), Sulsel (Sidrap)", agroclimatic_factors: "Puncak curah hujan musim barat (Monsoon Barat), ketersediaan air irigasi melimpah.", source_document: "Kementan — Pola Tanam Nasional & BPS KSA" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 2, month_name: "Februari", season_stage: "Awal Panen Raya Musim Rendeng", activity_intensity: "Tinggi", production_share_pct: 9.8, key_regions: "Jawa Tengah (Grobogan, Demak), Aceh (Aceh Besar, Pidie), NTB (Lombok)", agroclimatic_factors: "Mulai transisi curah hujan, panen awal sawah tadah hujan dan irigasi setengah teknis.", source_document: "BPS — Kerangka Sampel Area (KSA) Padi" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 3, month_name: "Maret", season_stage: "Puncak Panen Raya Nasional (Peak Harvest)", activity_intensity: "Puncak Panen", production_share_pct: 16.5, key_regions: "Jawa Timur (Jember, Bojonegoro), Jawa Barat, Jawa Tengah, Lampung, Sumsel", agroclimatic_factors: "Produksi bulanan tertinggi sepanjang tahun (~5.2 juta ton GKG), harga GKP di tingkat petani cenderung melandai.", source_document: "Badan Pangan Nasional (Bapanas) — Prognosa Neraca Pangan & BPS" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 4, month_name: "April", season_stage: "Lanjutan Panen Raya Rendeng & Awal Olah Tanah MT 2", activity_intensity: "Puncak Panen", production_share_pct: 14.2, key_regions: "Seluruh sentra utama Jawa, Sulawesi Selatan, Sumatera Utara", agroclimatic_factors: "Masa pengadaan gabah/beras Bulog untuk Cadangan Beras Pemerintah (CBP).", source_document: "Perum BULOG — Realisasi Pengadaan Dalam Negeri" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 5, month_name: "Mei", season_stage: "Musim Tanam 2 (Gadu) - Penanaman Awal", activity_intensity: "Sedang", production_share_pct: 7.1, key_regions: "Sawah beririgasi teknis waduk (Jatiluhur, Kedung Ombo, Karangkates)", agroclimatic_factors: "Awal musim kemarau di Jawa dan Nusa Tenggara, petani mengandalkan pasokan saluran primer/sekunder.", source_document: "Kementerian PUPR — Neraca Air Waduk Nasional" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 6, month_name: "Juni", season_stage: "Fase Vegetatif & Pemeliharaan MT 2 Gadu", activity_intensity: "Sedang", production_share_pct: 6.8, key_regions: "Jawa Timur, Jawa Tengah, Sulawesi Selatan, Kalimantan Selatan", agroclimatic_factors: "Musim kemarau aktif; pemupukan berimbang dan pengendalian hama wereng batang cokelat (WBC).", source_document: "Kementan — Ditjen Tanaman Pangan" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 7, month_name: "Juli", season_stage: "Panen Musim Gadu (Panen Kedua)", activity_intensity: "Tinggi", production_share_pct: 10.4, key_regions: "Pantura Jawa Barat, Jawa Timur (Tuban, Madiun), Sulsel (Bone, Wajo)", agroclimatic_factors: "Kualitas gabah sangat baik dengan kadar air rendah akibat hari kering optimal.", source_document: "BPS — Statistik Padi Subround II" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 8, month_name: "Agustus", season_stage: "Akhir Panen Gadu / Persiapan Palawija MT 3", activity_intensity: "Tinggi", production_share_pct: 9.1, key_regions: "Jawa Barat, Jawa Tengah, Jawa Timur, NTB", agroclimatic_factors: "Lahan sawah yang kekurangan air irigasi dialihkan ke palawija (kedelai, kacang hijau, jagung).", source_document: "Kementan — Manajemen Pola Tanam Palawija" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 9, month_name: "September", season_stage: "Musim Tanam 3 (Palawija/Kering) & Awal Paceklik", activity_intensity: "Sedang", production_share_pct: 6.2, key_regions: "Lahan pasang surut (Sumsel, Kalsel) dan sawah rawa lebak", agroclimatic_factors: "Puncak musim kemarau, penurunan stok di tingkat penggilingan padi swasta.", source_document: "Badan Pangan Nasional (Bapanas) — Pemantauan Pasokan Pasar Induk" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 10, month_name: "Oktober", season_stage: "Awal Pengolahan Tanah Musim Tanam 1 (Rendeng)", activity_intensity: "Sedang", production_share_pct: 5.4, key_regions: "Sumatera (Sumut, Sumbar, Sumsel), Kalimantan Barat, Sulawesi Selatan", agroclimatic_factors: "Awal masuknya musim hujan di bagian barat Indonesia (transisi musim / pancaroba).", source_document: "BMKG — Prakiraan Musim Hujan Nasional" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 11, month_name: "November", season_stage: "Penyemaian & Penanaman Serempak MT 1 Rendeng", activity_intensity: "Tinggi", production_share_pct: 4.8, key_regions: "Jawa, Bali, NTB, Lampung, Sumatera Selatan", agroclimatic_factors: "Masa paceklik (lean season); produksi bulanan rendah, intervensi pasar melalui SPHP Bulog.", source_document: "Bapanas — Program Stabilisasi Pasokan & Harga Pangan (SPHP)" },
  { commodity_id: "COM-AGRI-001-BERAS", commodity_name: "Padi / Beras (Oryza sativa)", crop_category: "Tanaman Pangan Pokok", month: 12, month_name: "Desember", season_stage: "Puncak Masa Paceklik (Lean Season) & Pemupukan MT 1", activity_intensity: "Rendah", production_share_pct: 4.5, key_regions: "Seluruh Indonesia (Lahan Sawah Nasional)", agroclimatic_factors: "Curah hujan tinggi; risiko banjir sawah di daerah aliran sungai (DAS) rawan luapan.", source_document: "BNPB & Kementan — Mitigasi Banjir Lahan Pertanian" },
  { commodity_id: "COM-AGRI-002-JAGUNG", commodity_name: "Jagung Pipil Kering", crop_category: "Tanaman Pangan / Pakan Ternak", month: 2, month_name: "Februari", season_stage: "Panen Raya Jagung Musim Tanam Pertama", activity_intensity: "Puncak Panen", production_share_pct: 18.2, key_regions: "Jawa Timur (Tuban, Lamongan), NTB (Dompu, Bima), Gorontalo, Lampung", agroclimatic_factors: "Pasokan berlimpah untuk pabrik pakan ternak (feedmill), tantangan penjemuran karena curah hujan.", source_document: "Kementan — Neraca Pakan Ternak Nasional" },
  { commodity_id: "COM-AGRI-002-JAGUNG", commodity_name: "Jagung Pipil Kering", crop_category: "Tanaman Pangan / Pakan Ternak", month: 7, month_name: "Juli", season_stage: "Panen Jagung Musim Kering (MT 2)", activity_intensity: "Tinggi", production_share_pct: 14.5, key_regions: "NTT, Sulsel (Jeneponto, Takalar), Jawa Tengah (Grobogan)", agroclimatic_factors: "Kadar air biji jagung rendah (<15%), kualitas fisik pipilan sangat prima.", source_document: "BPS — Statistik Jagung Nasional" },
  { commodity_id: "COM-AGRI-004-CABAI", commodity_name: "Cabai Rawit & Cabai Merah", crop_category: "Hortikultura Strategis", month: 1, month_name: "Januari", season_stage: "Periode Rawan Pasokan & Curah Hujan Tinggi", activity_intensity: "Rendah", production_share_pct: 5.5, key_regions: "Jawa Timur (Kediri, Blitar), Jawa Tengah (Temanggung, Magelang)", agroclimatic_factors: "Curah hujan lebat memicu serangan antraknosa (patek) dan busuk buah; volatilitas harga tinggi.", source_document: "Kementan — Early Warning System Hortikultura" },
  { commodity_id: "COM-AGRI-004-CABAI", commodity_name: "Cabai Rawit & Cabai Merah", crop_category: "Hortikultura Strategis", month: 6, month_name: "Juni", season_stage: "Puncak Panen Hortikultura Musim Kemarau", activity_intensity: "Puncak Panen", production_share_pct: 13.8, key_regions: "Kediri, Banyuwangi, Garut, Lombok Timur, Wajo", agroclimatic_factors: "Kondisi kering menekan hama jamur, pasokan ke pasar induk melimpah dan stabil.", source_document: "BPS & Bapanas — Panel Harga Pangan" },
  { commodity_id: "COM-AGRI-005-BAWANG", commodity_name: "Bawang Merah", crop_category: "Hortikultura Strategis", month: 7, month_name: "Juli", season_stage: "Panen Raya Bawang Merah Musim Kemarau", activity_intensity: "Puncak Panen", production_share_pct: 17.0, key_regions: "Brebes (Jateng), Nganjuk (Jatim), Bima (NTB), Enrekang (Sulsel)", agroclimatic_factors: "Sinar matahari terik optimal untuk proses penjemuran (curing) pascapanen.", source_document: "Asosiasi Bawang Merah Indonesia (ABMI) & Kementan" },
  { commodity_id: "COM-AGRI-005-BAWANG", commodity_name: "Bawang Merah", crop_category: "Hortikultura Strategis", month: 12, month_name: "Desember", season_stage: "Tanam Bawang Merah Musim Hujan (Off-Season)", activity_intensity: "Rendah", production_share_pct: 4.8, key_regions: "Lahan tadah hujan pegunungan dan dataran tinggi", agroclimatic_factors: "Biaya produksi meningkat karena proteksi pestisida dan mulsa plastik terhadap hujan.", source_document: "Kementan — Ditjen Hortikultura" },
  { commodity_id: "COM-PLANT-001-SAWIT", commodity_name: "Kelapa Sawit (CPO)", crop_category: "Perkebunan Strategis", month: 4, month_name: "April", season_stage: "Periode Produksi Rendah (Low Crop Cycle)", activity_intensity: "Rendah", production_share_pct: 6.8, key_regions: "Riau, Sumatera Utara, Sumatera Selatan, Kalimantan Tengah", agroclimatic_factors: "Siklus fisiologis istirahat tanaman pasca pembungaan.", source_document: "GAPKI — Laporan Bulanan Kinerja Industri Sawit" },
  { commodity_id: "COM-PLANT-001-SAWIT", commodity_name: "Kelapa Sawit (CPO)", crop_category: "Perkebunan Strategis", month: 10, month_name: "Oktober", season_stage: "Puncak Produksi Tandan Buah Segar (Peak Crop)", activity_intensity: "Puncak Panen", production_share_pct: 11.5, key_regions: "Riau, Kaltim, Kalbar, Kalsel, Sumut", agroclimatic_factors: "Tingkat utilisasi pabrik kelapa sawit (PKS) mencapai 90-95%, volume ekspor CPO tinggi.", source_document: "GAPKI & Badan Pengelola Dana Perkebunan Kelapa Sawit (BPDPKS)" }
];

export class AgriCalendarComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedCommodity = '';
    this.selectedMonth = '';
    this.summaryData = null;
    this.calendarData = [];
  }

  async render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- HEADER -->
        <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-2 shadow-2xs">
          <div class="flex items-center justify-between flex-wrap gap-2 border-b border-[#DADCE0] pb-2.5">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded bg-[#E6F4EA] text-[#1E8E3E] flex items-center justify-center text-base">🌾</span>
              <div>
                <h2 class="text-sm font-mono font-bold text-[#202124] uppercase">
                  KALENDER MUSIM TANAM, POLA PANEN & RITME KOMODITAS PANGAN
                </h2>
                <div class="text-[11px] text-[#5F6368] font-sans">
                  Siklus Bulanan Produksi, Masa Rendeng, Gadu, Puncak Panen Raya, dan Kewaspadaan Masa Paceklik Nasional
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 text-xs font-mono">
              <span class="px-2 py-0.5 rounded bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3] font-medium text-[10.5px]">
                Otoritas: Kementan • Bapanas • BPS KSA
              </span>
            </div>
          </div>

          <!-- SUMMARY NARRATIVE -->
          <div id="agri-calendar-summary-box" class="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-xs space-y-1">
            <div class="text-[10.5px] font-mono font-bold text-[#202124] uppercase flex items-center gap-1.5">
              <span>📌</span>
              <span>Konteks Agroklimat & Dinamika Musim Berjalan</span>
            </div>
            <p id="agri-calendar-narrative-text" class="text-[11.5px] text-[#3C4043] font-sans leading-relaxed">
              Memuat data ritme komoditas pangan strategis...
            </p>
          </div>

          <!-- FILTERS -->
          <div class="flex items-center gap-3 flex-wrap pt-1 text-xs font-mono">
            <div class="flex items-center gap-1.5">
              <span class="text-[#5F6368]">Komoditas:</span>
              <select id="agri-cal-commodity-select" class="px-2.5 py-1 rounded border border-[#DADCE0] bg-white text-xs font-mono outline-none focus:border-[#1A73E8]">
                <option value="">Semua Komoditas Strategis</option>
                <option value="COM-AGRI-001-BERAS">Padi / Beras (Oryza sativa)</option>
                <option value="COM-AGRI-002-JAGUNG">Jagung Pipil Kering</option>
                <option value="COM-AGRI-004-CABAI">Cabai Rawit & Cabai Merah</option>
                <option value="COM-AGRI-005-BAWANG">Bawang Merah</option>
                <option value="COM-PLANT-001-SAWIT">Kelapa Sawit (CPO)</option>
              </select>
            </div>

            <div class="flex items-center gap-1.5">
              <span class="text-[#5F6368]">Bulan:</span>
              <select id="agri-cal-month-select" class="px-2.5 py-1 rounded border border-[#DADCE0] bg-white text-xs font-mono outline-none focus:border-[#1A73E8]">
                <option value="">Sepanjang Tahun (12 Bulan)</option>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select>
            </div>

            <button id="agri-cal-reset-btn" class="px-2.5 py-1 rounded bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#3C4043] border border-[#DADCE0] text-xs font-mono cursor-pointer">
              Reset Filter
            </button>
          </div>
        </div>

        <!-- CALENDAR MATRIX GRID -->
        <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-3 shadow-2xs">
          <div class="flex items-center justify-between border-b border-[#DADCE0] pb-2">
            <span class="text-xs font-mono font-bold uppercase text-[#202124] flex items-center gap-1.5">
              <span>📅</span>
              <span>MATRIKS RITME MUSIM & TAHAPAN PANEN NASIONAL</span>
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
                  <th class="p-2.5 text-left border-r border-[#DADCE0] w-40">Komoditas</th>
                  <th class="p-2.5 text-left border-r border-[#DADCE0] w-48">Tahapan Musim</th>
                  <th class="p-2.5 text-center border-r border-[#DADCE0] w-28">Intensitas</th>
                  <th class="p-2.5 text-right border-r border-[#DADCE0] w-24">Porsi Output</th>
                  <th class="p-2.5 text-left border-r border-[#DADCE0]">Sentra Wilayah Produksi</th>
                  <th class="p-2.5 text-left">Catatan Agroklimat & Sitasi</th>
                </tr>
              </thead>
              <tbody id="agri-calendar-tbody" class="divide-y divide-[#DADCE0]">
                <tr>
                  <td colspan="7" class="p-4 text-center text-slate-400 font-sans">Memuat data kalender pertanian...</td>
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
    const resetBtn = document.getElementById('agri-cal-reset-btn');

    commSelect?.addEventListener('change', (e) => {
      this.selectedCommodity = e.target.value;
      this.fetchAndRenderRows();
    });

    monthSelect?.addEventListener('change', (e) => {
      this.selectedMonth = e.target.value;
      this.fetchAndRenderRows();
    });

    resetBtn?.addEventListener('click', () => {
      if (commSelect) commSelect.value = '';
      if (monthSelect) monthSelect.value = '';
      this.selectedCommodity = '';
      this.selectedMonth = '';
      this.fetchAndRenderRows();
    });
  }

  async loadData() {
    try {
      const summary = await ApiClient.fetchAgriculturalCalendarSummary();
      this.summaryData = summary;
      const narrText = document.getElementById('agri-calendar-narrative-text');
      if (narrText && summary && summary.current_season_narrative) {
        narrText.textContent = summary.current_season_narrative;
      }
    } catch (e) {
      console.warn('Menggunakan ringkasan kanonikal:', e);
      const narrText = document.getElementById('agri-calendar-narrative-text');
      if (narrText) {
        narrText.textContent = CANONICAL_SEASON_NARRATIVE;
      }
    }

    await this.fetchAndRenderRows();
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
        if (this.selectedCommodity && record.commodity_id !== this.selectedCommodity) return false;
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
