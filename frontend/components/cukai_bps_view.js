// ==============================================================================
// DATA BPS VIEW COMPONENT
// INDOEKONOMI data — Indonesia Economic Data Observatory
// Layout & Compilations Styled Exactly Like the "Indikator Ekonomi" Tab
// Timeframe: 1990 - 2026 (37 Annual Points)
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { BpsDataProvider } from '../data/bps_data.js?v=11.2.0';

export class CukaiBpsView {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = null;
    this.chartInstance = null;

    this.state = {
      category: 'ALL',
      selectedIndicatorId: 'BPS_PDB_GROWTH',
      startYear: 1990,
      endYear: 2026,
      chartType: 'line', // 'line' | 'bar'
      transformMode: 'raw', // 'raw' | 'yoy' | 'index'
      searchQuery: '',
      matrixData: null,
      indicatorsMetadata: null,
      loading: false
    };
  }

  async init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    this.renderSkeleton();
    await this.loadInitialData();
  }

  renderSkeleton() {
    this.container.innerHTML = `
      <div class="space-y-4">
        
        <!-- HEADER: Title & Download Actions -->
        <div class="gov-card p-4 bg-white border border-[#DADCE0] rounded-lg shadow-2xs">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center text-xs font-bold">📋</span>
                <h2 class="text-xs font-mono font-bold uppercase tracking-wider text-[#202124]">
                  DATA BPS — KOMPILASI INDIKATOR STATUTORI BADAN PUSAT STATISTIK (1990 – 2026)
                </h2>
                <span class="text-[10px] font-mono bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] px-2 py-0.5 rounded font-bold">
                  25 INDIKATOR &middot; 37 TAHUNAN
                </span>
              </div>
              <p class="text-[11.5px] text-[#5F6368] font-sans">
                Kompilasi serial waktu resmi Badan Pusat Statistik (BPS) Republik Indonesia mencakup Asumsi Makro, Susenas, Industri IBS, Pertanian/Perkebunan, Perdagangan Luar Negeri, Sakernas, dan Fiskal Terkait.
              </p>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono">
              <button id="btn-export-bps-excel" class="px-3 py-1.5 bg-[#1E8E3E] text-white rounded hover:bg-[#137333] font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition">
                <span>📊</span>
                <span>Unduh Excel (.xlsx)</span>
              </button>
              <button id="btn-export-bps-csv" class="px-3 py-1.5 bg-white border border-[#DADCE0] text-[#3C4043] rounded hover:bg-[#F1F3F4] font-medium flex items-center gap-1.5 shadow-2xs cursor-pointer transition">
                <span>📑</span>
                <span>Unduh CSV</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ROW 1: 2-COLUMN BALANCED MAIN LAYOUT (Similar to Indikator Ekonomi Tab) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          
          <!-- KOLOM KIRI (Sidebar Filtering & Metadata Indikator BPS) -->
          <aside class="lg:col-span-4 xl:col-span-3.5 flex flex-col justify-between space-y-3 h-full">
            <div class="gov-card p-4 bg-white border border-[#DADCE0] rounded-lg space-y-3.5 shadow-2xs">
              <div class="flex items-center justify-between border-b border-[#DADCE0] pb-2">
                <span class="text-xs font-mono font-bold text-[#202124] uppercase flex items-center gap-1.5">
                  <span>🔍</span>
                  <span>FILTER & PILIH INDIKATOR BPS</span>
                </span>
                <span class="text-[10px] font-mono text-[#5F6368]" id="bps-sidebar-count">25 Indikator</span>
              </div>

              <!-- 1. Kategori BPS Selector -->
              <div class="space-y-1 text-xs font-mono">
                <label class="font-bold text-[#3C4043] text-[11px] block">Kategori Data BPS:</label>
                <select id="bps-category-select" class="w-full p-2 border border-[#DADCE0] rounded bg-[#F8F9FA] text-xs text-[#202124] focus:bg-white focus:outline-none focus:border-[#1A73E8]">
                  <option value="ALL">Semua Kategori (25 Indikator)</option>
                  <option value="BPS_MAKRO">Asumsi Makro BPS</option>
                  <option value="BPS_SUSENAS">Konsumsi Susenas BPS</option>
                  <option value="BPS_INDUSTRI">Industri Manufaktur (BPS IBS)</option>
                  <option value="BPS_PERKEBUNAN">Pertanian & Perkebunan BPS</option>
                  <option value="BPS_EKSPOR_IMPOR">Perdagangan Luar Negeri BPS</option>
                  <option value="BPS_SAKERNAS">Ketenagakerjaan BPS Sakernas</option>
                  <option value="DJBC_LKPP">Historis Produksi & Cukai</option>
                </select>
              </div>

              <!-- 2. Indikator Dropdown -->
              <div class="space-y-1 text-xs font-mono">
                <label class="font-bold text-[#3C4043] text-[11px] block">Pilih Indikator BPS:</label>
                <select id="bps-indicator-select" class="w-full p-2 border border-[#DADCE0] rounded bg-[#F8F9FA] text-xs text-[#202124] focus:bg-white focus:outline-none focus:border-[#1A73E8]">
                  <!-- Rendered dynamically -->
                </select>
              </div>

              <!-- 3. Rentang Waktu (1990 - 2026) & Shortcut Range -->
              <div class="space-y-1.5 text-xs font-mono pt-1 border-t border-[#DADCE0]">
                <label class="font-bold text-[#3C4043] text-[11px] block">Rentang Waktu Analisis:</label>
                <div class="grid grid-cols-2 gap-1.5">
                  <button data-range="all" class="bps-range-btn px-2 py-1 text-[10.5px] font-mono rounded bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC] font-bold cursor-pointer transition">
                    Semua (1990–2026)
                  </button>
                  <button data-range="10" class="bps-range-btn px-2 py-1 text-[10.5px] font-mono rounded bg-white text-[#5F6368] border border-[#DADCE0] hover:bg-[#F1F3F4] cursor-pointer transition">
                    10 Thn (2017–2026)
                  </button>
                  <button data-range="5" class="bps-range-btn px-2 py-1 text-[10.5px] font-mono rounded bg-white text-[#5F6368] border border-[#DADCE0] hover:bg-[#F1F3F4] cursor-pointer transition">
                    5 Thn (2022–2026)
                  </button>
                  <button data-range="3" class="bps-range-btn px-2 py-1 text-[10.5px] font-mono rounded bg-white text-[#5F6368] border border-[#DADCE0] hover:bg-[#F1F3F4] cursor-pointer transition">
                    3 Thn (2024–2026)
                  </button>
                </div>
              </div>

              <!-- 4. Kartu Metadata Indikator Terpilih -->
              <div id="bps-meta-card" class="bg-[#F8F9FA] p-3 rounded border border-[#DADCE0] space-y-1.5 text-[11px] font-mono">
                <!-- Rendered dynamically -->
              </div>
            </div>
          </aside>

          <!-- KOLOM KANAN (Main Analytics: Chart Area & Ringkasan Metrik Deskriptif) -->
          <div class="lg:col-span-8 xl:col-span-8.5 flex flex-col justify-between space-y-3 h-full">
            
            <!-- 1. Chart Area Module -->
            <div class="gov-card p-4 bg-white border border-[#DADCE0] rounded-lg space-y-3 shadow-2xs">
              <div class="flex items-center justify-between border-b border-[#DADCE0] pb-2.5 flex-wrap gap-2">
                <div>
                  <h3 id="bps-chart-title" class="text-xs font-mono font-bold text-[#202124] uppercase">
                    Grafik Tren Indikator BPS (1990–2026)
                  </h3>
                  <div id="bps-chart-subtitle" class="text-[11px] font-sans text-[#5F6368]">
                    Serial Waktu Tahunan
                  </div>
                </div>

                <!-- Chart Controls: Type & Transform -->
                <div class="flex items-center gap-1.5 text-xs font-mono">
                  <!-- Type Toggle -->
                  <div class="inline-flex rounded border border-[#DADCE0] p-0.5 bg-[#F1F3F4]">
                    <button id="btn-chart-line" class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-white text-[#1A73E8] shadow-2xs cursor-pointer">
                      Garis
                    </button>
                    <button id="btn-chart-bar" class="px-2 py-0.5 rounded text-[10.5px] font-medium text-[#5F6368] hover:text-[#202124] cursor-pointer">
                      Batang
                    </button>
                  </div>

                  <!-- Transform Toggle -->
                  <select id="bps-transform-select" class="p-1 border border-[#DADCE0] rounded bg-[#F8F9FA] text-[10.5px] text-[#3C4043] focus:bg-white focus:outline-none">
                    <option value="raw">Nilai Asli (Level)</option>
                    <option value="yoy">Pertumbuhan YoY (%)</option>
                    <option value="index">Indeks (Tahun Awal = 100)</option>
                  </select>
                </div>
              </div>

              <!-- Chart Canvas -->
              <div class="h-64 w-full relative">
                <canvas id="bps-chart-canvas"></canvas>
              </div>
            </div>

            <!-- 2. RINGKASAN METRIK DESKRIPTIF BPS (5 Kotak KPI) -->
            <div class="space-y-1.5 mt-auto">
              <div class="flex items-center justify-between border-b border-slate-200 pb-1">
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <span>📊</span>
                  <span>RINGKASAN METRIK DESKRIPTIF STATUTORI BPS</span>
                </span>
                <span class="text-[10.5px] font-mono text-slate-500" id="bps-kpi-period-label">Periode 1990 - 2026</span>
              </div>
              
              <!-- 5 KPI Cards Grid -->
              <div id="bps-kpi-container" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 font-mono">
                <!-- Rendered dynamically by updateKPIs -->
              </div>
            </div>

          </div>

        </div>

        <!-- ROW 2: TABEL MATRIKS KOMPILASI SELURUH INDIKATOR BPS (1990 - 2026) -->
        <div class="gov-card p-4 bg-white border border-[#DADCE0] rounded-lg space-y-3 shadow-2xs">
          <div class="flex items-center justify-between flex-wrap gap-2 border-b border-[#DADCE0] pb-2.5">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#1A73E8]"></span>
              <h3 class="text-xs font-mono font-bold text-[#202124] uppercase">
                MATRIKS KOMPILASI DATA BPS (1990 – 2026)
              </h3>
              <span class="text-[10.5px] font-mono text-[#5F6368]" id="bps-matrix-count">(25 Indikator)</span>
            </div>
            
            <div class="flex items-center gap-2 text-xs font-mono">
              <input 
                type="text" 
                id="bps-search-input" 
                placeholder="Cari indikator BPS..." 
                class="px-3 py-1 border border-[#DADCE0] rounded bg-[#F8F9FA] text-xs text-[#202124] focus:bg-white focus:outline-none focus:border-[#1A73E8] w-48 sm:w-64"
              >
            </div>
          </div>

          <!-- Responsive Data Matrix Table -->
          <div class="border border-[#DADCE0] rounded-lg overflow-hidden bg-white">
            <div class="overflow-x-auto max-h-[480px] scrollbar-thin">
              <table class="w-full text-left text-xs font-mono border-collapse" id="bps-matrix-table">
                <thead class="sticky top-0 bg-[#F8F9FA] text-[#5F6368] border-b border-[#DADCE0] z-10 shadow-2xs" id="bps-table-head">
                  <!-- Rendered dynamically -->
                </thead>
                <tbody class="divide-y divide-[#E8EAED]" id="bps-table-body">
                  <!-- Rendered dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const categorySelect = document.getElementById('bps-category-select');
    const indicatorSelect = document.getElementById('bps-indicator-select');
    const transformSelect = document.getElementById('bps-transform-select');
    const btnLine = document.getElementById('btn-chart-line');
    const btnBar = document.getElementById('btn-chart-bar');
    const searchInput = document.getElementById('bps-search-input');
    const btnExcel = document.getElementById('btn-export-bps-excel');
    const btnCsv = document.getElementById('btn-export-bps-csv');

    // Category Change
    categorySelect?.addEventListener('change', (e) => {
      this.state.category = e.target.value;
      this.populateIndicatorSelect();
      this.loadMatrixData();
    });

    // Indicator Change
    indicatorSelect?.addEventListener('change', (e) => {
      this.state.selectedIndicatorId = e.target.value;
      this.renderSelectedIndicatorAnalytics();
      this.renderTable();
    });

    // Transform Change
    transformSelect?.addEventListener('change', (e) => {
      this.state.transformMode = e.target.value;
      this.updateChart();
    });

    // Chart Type Toggle
    btnLine?.addEventListener('click', () => {
      this.state.chartType = 'line';
      btnLine.className = 'px-2 py-0.5 rounded text-[10.5px] font-bold bg-white text-[#1A73E8] shadow-2xs cursor-pointer';
      btnBar.className = 'px-2 py-0.5 rounded text-[10.5px] font-medium text-[#5F6368] hover:text-[#202124] cursor-pointer';
      this.updateChart();
    });

    btnBar?.addEventListener('click', () => {
      this.state.chartType = 'bar';
      btnBar.className = 'px-2 py-0.5 rounded text-[10.5px] font-bold bg-white text-[#1A73E8] shadow-2xs cursor-pointer';
      btnLine.className = 'px-2 py-0.5 rounded text-[10.5px] font-medium text-[#5F6368] hover:text-[#202124] cursor-pointer';
      this.updateChart();
    });

    // Range Shortcuts
    const rangeBtns = document.querySelectorAll('.bps-range-btn');
    rangeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        rangeBtns.forEach(b => {
          b.className = 'bps-range-btn px-2 py-1 text-[10.5px] font-mono rounded bg-white text-[#5F6368] border border-[#DADCE0] hover:bg-[#F1F3F4] cursor-pointer transition';
        });
        btn.className = 'bps-range-btn px-2 py-1 text-[10.5px] font-mono rounded bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC] font-bold cursor-pointer transition';

        const range = btn.getAttribute('data-range');
        if (range === 'all') {
          this.state.startYear = 1990;
        } else if (range === '10') {
          this.state.startYear = 2017;
        } else if (range === '5') {
          this.state.startYear = 2022;
        } else if (range === '3') {
          this.state.startYear = 2024;
        }
        this.state.endYear = 2026;
        this.loadMatrixData();
      });
    });

    // Search Input
    searchInput?.addEventListener('input', (e) => {
      this.state.searchQuery = e.target.value.trim();
      this.loadMatrixData();
    });

    // Export Buttons (Direct client-side SheetJS / CSV download with API fallback)
    btnExcel?.addEventListener('click', () => {
      try {
        BpsDataProvider.downloadExcel({
          category: this.state.category,
          startYear: this.state.startYear,
          endYear: this.state.endYear
        });
      } catch (err) {
        const url = ApiClient.getCukaiBpsExportExcelUrl({
          category: this.state.category,
          start_year: this.state.startYear,
          end_year: this.state.endYear
        });
        window.open(url, '_blank');
      }
    });

    btnCsv?.addEventListener('click', () => {
      try {
        BpsDataProvider.downloadCsv({
          category: this.state.category,
          startYear: this.state.startYear,
          endYear: this.state.endYear
        });
      } catch (err) {
        const url = ApiClient.getCukaiBpsExportCsvUrl({
          category: this.state.category,
          start_year: this.state.startYear,
          end_year: this.state.endYear
        });
        window.open(url, '_blank');
      }
    });
  }

  async loadInitialData() {
    try {
      this.state.loading = true;

      // 1. Instantly populate from canonical BpsDataProvider so UI is NEVER empty
      this.state.indicatorsMetadata = BpsDataProvider.getMetadata();
      this.state.matrixData = BpsDataProvider.getMatrix({
        category: this.state.category,
        startYear: this.state.startYear,
        endYear: this.state.endYear,
        q: this.state.searchQuery
      });

      this.populateIndicatorSelect();
      this.renderSelectedIndicatorAnalytics();
      this.renderTable();

      // 2. Try fetching from backend API in background if available
      try {
        const [metaResp, matrixResp] = await Promise.all([
          ApiClient.fetchCukaiBpsIndicators(),
          ApiClient.fetchCukaiBpsMatrix({
            category: this.state.category,
            start_year: this.state.startYear,
            end_year: this.state.endYear,
            q: this.state.searchQuery
          })
        ]);
        if (metaResp && metaResp.status === 'SUCCESS' && metaResp.indicators) {
          this.state.indicatorsMetadata = metaResp;
        }
        if (matrixResp && matrixResp.status === 'SUCCESS' && matrixResp.indicators) {
          this.state.matrixData = matrixResp;
          this.populateIndicatorSelect();
          this.renderSelectedIndicatorAnalytics();
          this.renderTable();
        }
      } catch (apiErr) {
        // Graceful fallback to authoritative canonical provider
        console.info('BPS View: Menggunakan repositori data statutori lokal (offline / canonical mode).');
      }
    } catch (err) {
      console.error('Gagal memuat data awal BPS:', err);
    } finally {
      this.state.loading = false;
    }
  }

  async loadMatrixData() {
    try {
      // 1. Try API first
      let loaded = false;
      try {
        const matrixResp = await ApiClient.fetchCukaiBpsMatrix({
          category: this.state.category,
          start_year: this.state.startYear,
          end_year: this.state.endYear,
          q: this.state.searchQuery
        });
        if (matrixResp && matrixResp.status === 'SUCCESS' && matrixResp.indicators) {
          this.state.matrixData = matrixResp;
          loaded = true;
        }
      } catch (apiErr) {
        // Fall through to local provider
      }

      // 2. Canonical BpsDataProvider fallback
      if (!loaded) {
        this.state.matrixData = BpsDataProvider.getMatrix({
          category: this.state.category,
          startYear: this.state.startYear,
          endYear: this.state.endYear,
          q: this.state.searchQuery
        });
      }

      this.renderTable();
      this.renderSelectedIndicatorAnalytics();
    } catch (err) {
      console.error('Gagal memuat matriks data:', err);
    }
  }

  populateIndicatorSelect() {
    const select = document.getElementById('bps-indicator-select');
    const countBadge = document.getElementById('bps-sidebar-count');
    if (!select) return;

    const indicators = (this.state.indicatorsMetadata && this.state.indicatorsMetadata.indicators)
      ? this.state.indicatorsMetadata.indicators
      : (BpsDataProvider.getMetadata().indicators || []);

    const filtered = this.state.category === 'ALL'
      ? indicators
      : indicators.filter(i => i.category === this.state.category);

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Indikator`;
    }

    select.innerHTML = filtered.map(i => {
      const displayLabel = i.name.endsWith(`(${i.unit})`) ? i.name : `${i.name} (${i.unit})`;
      return `
        <option value="${i.id}" ${i.id === this.state.selectedIndicatorId ? 'selected' : ''}>
          ${displayLabel}
        </option>
      `;
    }).join('');

    // Ensure selected indicator is valid in current list
    if (filtered.length > 0 && !filtered.some(i => i.id === this.state.selectedIndicatorId)) {
      this.state.selectedIndicatorId = filtered[0].id;
      select.value = filtered[0].id;
    } else if (filtered.length > 0) {
      select.value = this.state.selectedIndicatorId;
    }
  }

  renderSelectedIndicatorAnalytics() {
    if (!this.state.matrixData) return;

    const indList = this.state.matrixData.indicators || [];
    if (indList.length === 0) return;

    let ind = indList.find(i => i.id === this.state.selectedIndicatorId);
    if (!ind) {
      ind = indList[0];
      this.state.selectedIndicatorId = ind.id;
      const select = document.getElementById('bps-indicator-select');
      if (select) select.value = ind.id;
    }

    // Update Titles
    const displayTitle = ind.name.endsWith(`(${ind.unit})`) ? ind.name : `${ind.name} (${ind.unit})`;
    const title = document.getElementById('bps-chart-title');
    const subtitle = document.getElementById('bps-chart-subtitle');
    if (title) title.textContent = displayTitle;
    if (subtitle) subtitle.textContent = `Sumber: ${ind.source} · Kategori: ${ind.category_label}`;

    // Update Metadata Card
    const metaCard = document.getElementById('bps-meta-card');
    if (metaCard) {
      metaCard.innerHTML = `
        <div class="flex items-center justify-between border-b border-[#DADCE0] pb-1">
          <span class="text-[#1A73E8] font-bold text-xs">${ind.name}</span>
          <span class="px-1.5 py-0.2 rounded bg-white border border-[#DADCE0] text-[10px] text-[#5F6368]">${ind.unit}</span>
        </div>
        <div class="text-[10.5px] text-[#3C4043] leading-relaxed pt-0.5">
          ${ind.description || ind.statutory_note || 'Indikator resmi BPS Indonesia.'}
        </div>
        <div class="pt-1 border-t border-[#DADCE0] text-[10px] text-[#5F6368] flex items-center justify-between">
          <span>Sumber: <strong>${ind.source}</strong></span>
          <span>Frekuensi: <strong>Tahunan</strong></span>
        </div>
      `;
    }

    // Update 5 KPI Cards
    this.updateKPIs(ind);

    // Update Chart
    this.updateChart(ind);
  }

  updateKPIs(ind) {
    const kpiContainer = document.getElementById('bps-kpi-container');
    const periodLabel = document.getElementById('bps-kpi-period-label');
    if (!kpiContainer || !ind) return;

    if (periodLabel) {
      periodLabel.textContent = `Periode Observasi: ${this.state.startYear} - ${this.state.endYear}`;
    }

    const fmt = (val) => {
      if (val === undefined || val === null || isNaN(val)) return '-';
      return ind.unit === 'Rupiah' || ind.unit === 'Unit'
        ? Math.round(val).toLocaleString('id-ID')
        : val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const yoyGrowthText = ind.yoy_growth !== undefined && ind.yoy_growth !== null && !isNaN(ind.yoy_growth)
      ? `${ind.yoy_growth >= 0 ? '+' : ''}${ind.yoy_growth.toFixed(2)}%`
      : '-';
    const yoyColor = ind.yoy_growth >= 0 ? 'text-[#1E8E3E]' : 'text-[#D93025]';

    kpiContainer.innerHTML = `
      <!-- Kotak 1: Nilai Terkini -->
      <div class="bg-white p-2.5 rounded border border-[#DADCE0] shadow-2xs space-y-1">
        <div class="text-[10px] text-[#5F6368] uppercase font-bold">Nilai Terkini (${this.state.endYear})</div>
        <div class="text-sm sm:text-base font-bold text-[#1A73E8] truncate">
          ${fmt(ind.latest_val)}
        </div>
        <div class="text-[9.5px] text-[#80868B] truncate">${ind.unit}</div>
      </div>

      <!-- Kotak 2: Rata-rata 3 Tahun Terakhir -->
      <div class="bg-white p-2.5 rounded border border-[#DADCE0] shadow-2xs space-y-1">
        <div class="text-[10px] text-[#5F6368] uppercase font-bold">Rata-rata L3Y</div>
        <div class="text-sm sm:text-base font-bold text-[#202124] truncate">
          ${fmt(ind.l3y_avg)}
        </div>
        <div class="text-[9.5px] text-[#80868B] truncate">3 Tahun Terakhir</div>
      </div>

      <!-- Kotak 3: Nilai Terendah -->
      <div class="bg-white p-2.5 rounded border border-[#DADCE0] shadow-2xs space-y-1">
        <div class="text-[10px] text-[#5F6368] uppercase font-bold">Nilai Min</div>
        <div class="text-sm sm:text-base font-bold text-[#B06000] truncate">
          ${fmt(ind.min_val)}
        </div>
        <div class="text-[9.5px] text-[#80868B] truncate">Terendah Periode</div>
      </div>

      <!-- Kotak 4: Nilai Tertinggi -->
      <div class="bg-white p-2.5 rounded border border-[#DADCE0] shadow-2xs space-y-1">
        <div class="text-[10px] text-[#5F6368] uppercase font-bold">Nilai Max</div>
        <div class="text-sm sm:text-base font-bold text-[#137333] truncate">
          ${fmt(ind.max_val)}
        </div>
        <div class="text-[9.5px] text-[#80868B] truncate">Tertinggi Periode</div>
      </div>

      <!-- Kotak 5: Pertumbuhan Terakhir YoY -->
      <div class="bg-white p-2.5 rounded border border-[#DADCE0] shadow-2xs space-y-1 col-span-2 sm:col-span-1">
        <div class="text-[10px] text-[#5F6368] uppercase font-bold">Pertumbuhan YoY</div>
        <div class="text-sm sm:text-base font-bold ${yoyColor} truncate">
          ${yoyGrowthText}
        </div>
        <div class="text-[9.5px] text-[#80868B] truncate">vs Tahun Sebelumnya</div>
      </div>
    `;
  }

  updateChart(indicator = null) {
    const canvas = document.getElementById('bps-chart-canvas');
    if (!canvas || !this.state.matrixData) return;

    const indList = this.state.matrixData.indicators || [];
    const ind = indicator || indList.find(i => i.id === this.state.selectedIndicatorId) || indList[0];
    if (!ind) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }

    const years = this.state.matrixData.years || [];
    const rawValues = years.map(y => ind.values[y] !== undefined ? ind.values[y] : null);

    // Compute transformation
    let chartValues = rawValues;
    const displayLabel = ind.name.endsWith(`(${ind.unit})`) ? ind.name : `${ind.name} (${ind.unit})`;
    let yAxisTitle = displayLabel;

    if (this.state.transformMode === 'yoy') {
      yAxisTitle = 'Laju Pertumbuhan (% YoY)';
      chartValues = rawValues.map((val, idx) => {
        if (idx === 0 || val === null || rawValues[idx - 1] === null || rawValues[idx - 1] === 0) {
          return 0;
        }
        return parseFloat((((val - rawValues[idx - 1]) / rawValues[idx - 1]) * 100.0).toFixed(2));
      });
    } else if (this.state.transformMode === 'index') {
      yAxisTitle = 'Indeks Relatif (Tahun Awal = 100)';
      const baseVal = rawValues[0] || 1;
      chartValues = rawValues.map(val => {
        if (val === null) return 100;
        return parseFloat(((val / baseVal) * 100.0).toFixed(2));
      });
    }

    const isBar = this.state.chartType === 'bar';

    if (typeof Chart === 'undefined') {
      console.warn('Chart.js belum siap.');
      return;
    }

    this.chartInstance = new Chart(canvas.getContext('2d'), {
      type: this.state.chartType,
      data: {
        labels: years,
        datasets: [
          {
            label: displayLabel,
            data: chartValues,
            borderColor: '#1A73E8',
            backgroundColor: isBar ? 'rgba(26, 115, 232, 0.75)' : 'rgba(26, 115, 232, 0.08)',
            borderWidth: isBar ? 0 : 2.5,
            pointRadius: isBar ? 0 : (years.length > 20 ? 2 : 3.5),
            pointHoverRadius: 5,
            fill: !isBar,
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'monospace', size: 10 }, maxTicksLimit: 14 }
          },
          y: {
            title: { display: true, text: yAxisTitle, font: { family: 'monospace', size: 10 } },
            ticks: {
              font: { family: 'monospace', size: 10 },
              callback: (val) => {
                return ind.unit === 'Rupiah' ? val.toLocaleString('id-ID') : val;
              }
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            titleFont: { family: 'monospace', size: 11 },
            bodyFont: { family: 'monospace', size: 11 },
            callbacks: {
              label: (ctx) => {
                const val = ctx.raw;
                return ` Nilai: ${ind.unit === 'Rupiah' ? val.toLocaleString('id-ID') : val.toLocaleString('id-ID', { minimumFractionDigits: 2 })} ${ind.unit}`;
              }
            }
          }
        }
      }
    });
  }

  renderTable() {
    const tableHead = document.getElementById('bps-table-head');
    const tableBody = document.getElementById('bps-table-body');
    const countBadge = document.getElementById('bps-matrix-count');
    if (!tableHead || !tableBody || !this.state.matrixData) return;

    const years = this.state.matrixData.years || [];
    const indicators = this.state.matrixData.indicators || [];

    if (countBadge) countBadge.textContent = `(${indicators.length} Indikator BPS)`;

    // Header with sticky columns
    tableHead.innerHTML = `
      <tr>
        <th class="p-2.5 w-10 text-center">No</th>
        <th class="p-2.5 min-w-[240px]">Indikator Resmi BPS</th>
        <th class="p-2.5 min-w-[130px]">Kategori BPS</th>
        <th class="p-2.5 w-20 text-center">Satuan</th>
        <th class="p-2.5 min-w-[160px]">Sumber Survei BPS</th>
        <th class="p-2.5 text-right min-w-[90px]">Min</th>
        <th class="p-2.5 text-right min-w-[90px]">Max</th>
        <th class="p-2.5 text-right min-w-[90px] font-bold text-[#1A73E8]">Terkini</th>
        ${years.map(y => `<th class="p-2.5 text-right min-w-[72px]">${y}</th>`).join('')}
      </tr>
    `;

    if (indicators.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="${8 + years.length}" class="p-8 text-center text-[#5F6368] font-mono">
            Tidak ada indikator BPS yang cocok dengan filter atau kata kunci pencarian.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = indicators.map((ind, idx) => {
      const isEven = idx % 2 === 0;
      const isSelected = ind.id === this.state.selectedIndicatorId;
      const rowBg = isSelected 
        ? 'bg-[#E8F0FE]/60 border-l-4 border-l-[#1A73E8]' 
        : (isEven ? 'bg-white' : 'bg-[#F8F9FA]');

      const fmt = (val) => {
        if (val === undefined || val === null) return '-';
        return ind.unit === 'Rupiah' || ind.unit === 'Unit'
          ? Math.round(val).toLocaleString('id-ID')
          : val.toLocaleString('id-ID', { minimumFractionDigits: 2 });
      };

      return `
        <tr class="hover:bg-[#E8F0FE]/40 transition cursor-pointer ${rowBg}" data-ind-id="${ind.id}">
          <td class="p-2.5 text-center text-[#5F6368] font-mono">${idx + 1}</td>
          <td class="p-2.5 font-mono">
            <div class="font-bold text-[#202124] hover:text-[#1A73E8]">${ind.name}</div>
            <div class="text-[10px] text-[#5F6368] line-clamp-1">${ind.description || ind.statutory_note}</div>
          </td>
          <td class="p-2.5 font-mono text-[11px]">
            <span class="px-2 py-0.5 rounded bg-[#F1F3F4] text-[#3C4043] border border-[#DADCE0]">
              ${ind.category_label}
            </span>
          </td>
          <td class="p-2.5 text-center font-mono text-[#5F6368] text-[11px]">${ind.unit}</td>
          <td class="p-2.5 font-mono text-[#5F6368] text-[11px]">${ind.source}</td>
          <td class="p-2.5 text-right font-mono text-[#B06000]">${fmt(ind.min_val)}</td>
          <td class="p-2.5 text-right font-mono text-[#137333]">${fmt(ind.max_val)}</td>
          <td class="p-2.5 text-right font-mono font-bold text-[#1A73E8]">${fmt(ind.latest_val)}</td>
          ${years.map(y => {
            const val = ind.values[y];
            return `<td class="p-2.5 text-right font-mono text-[#202124]">${fmt(val)}</td>`;
          }).join('')}
        </tr>
      `;
    }).join('');

    // Row click syncs with main chart
    tableBody.querySelectorAll('tr[data-ind-id]').forEach(row => {
      row.addEventListener('click', () => {
        const indId = row.getAttribute('data-ind-id');
        this.state.selectedIndicatorId = indId;
        const select = document.getElementById('bps-indicator-select');
        if (select) select.value = indId;
        this.renderSelectedIndicatorAnalytics();
        this.renderTable();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      });
    });
  }
}
