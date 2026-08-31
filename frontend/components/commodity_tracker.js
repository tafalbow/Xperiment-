// ==============================================================================
// NERACA KOMODITAS, PANGAN & HASIL BUMI TRACKER COMPONENT
// Tracking Produksi, Konsumsi, Ekspor, Impor, Kode HS & Klasifikasi APBN/LKPP
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { ExcelExporter } from '../services/excel_exporter.js';

export class CommodityTrackerComponent {
  constructor(containerId = 'tab-content-commodities') {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.chartInstance = null;

    // State
    this.categoriesData = null;
    this.activeDivision = 'PERTANIAN_PETERNAKAN'; // 'PERTANIAN_PETERNAKAN' | 'HASIL_BUMI'
    this.activeGroup = 'ALL';
    this.activeHsChapter = 'ALL';
    this.activeApbnCategory = 'ALL';
    this.activeViewMode = 'DETAIL'; // 'DETAIL' | 'MATRIX'
    this.activeChartMode = 'VOLUME'; // 'VOLUME' | 'APBN'
    this.selectedCommodityId = 'COM-AGRI-001-BERAS';
    this.selectedYear = '2024';
    this.startYear = 2018;
    this.endYear = 2024;
    this.balanceData = null;
    this.matrixData = null;
    this.isLoading = false;
  }

  async init() {
    if (!this.container) return;
    try {
      this.isLoading = true;
      this.renderSkeleton();

      // Fetch master metadata structure
      this.categoriesData = await ApiClient.fetchCommodityCategories();
      await this.loadBalanceData(this.selectedCommodityId);
      this.isLoading = false;
      this.render();
    } catch (err) {
      console.error('Error initializing CommodityTracker:', err);
      this.renderError(err.message);
    }
  }

  renderSkeleton() {
    this.container.innerHTML = `
      <div class="p-8 text-center space-y-3 font-mono text-slate-500">
        <div class="inline-block w-8 h-8 border-4 border-slate-300 border-t-emerald-700 rounded-full animate-spin"></div>
        <div class="text-xs">Memuat Basis Data Neraca Komoditas, Kode HS & Pemetaan APBN/LKPP...</div>
      </div>
    `;
  }

  renderError(msg) {
    this.container.innerHTML = `
      <div class="p-6 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs font-mono">
        <div class="font-bold mb-1">❌ Gagal Memuat Data Neraca Komoditas</div>
        <div>${msg}</div>
        <button id="btn-retry-commodity" class="mt-3 px-3 py-1 bg-rose-700 text-white rounded text-xs font-bold">Coba Lagi</button>
      </div>
    `;
    document.getElementById('btn-retry-commodity')?.addEventListener('click', () => this.init());
  }

  async loadBalanceData(commodityId) {
    this.selectedCommodityId = commodityId;
    this.balanceData = await ApiClient.fetchCommodityBalance(commodityId, this.startYear, this.endYear);
  }

  async loadMatrixData() {
    const params = {
      year: this.selectedYear
    };
    if (this.activeDivision !== 'ALL') params.division = this.activeDivision;
    if (this.activeGroup !== 'ALL') params.group = this.activeGroup;
    if (this.activeHsChapter !== 'ALL') params.hs_chapter = this.activeHsChapter;
    if (this.activeApbnCategory !== 'ALL') params.apbn_category = this.activeApbnCategory;

    this.matrixData = await ApiClient.fetchCommodityMatrix(params);
  }

  async setDivision(division) {
    this.activeDivision = division;
    this.activeGroup = 'ALL';
    if (!this.categoriesData) {
      await this.init();
      return;
    }
    const first = this.categoriesData.commodities.find(c => c.division === division);
    if (first) {
      await this.loadBalanceData(first.id);
    }
    if (this.activeViewMode === 'MATRIX') {
      await this.loadMatrixData();
    }
    this.render();
  }

  render() {
    if (!this.categoriesData || !this.balanceData) return;

    const isAgri = this.activeDivision === 'PERTANIAN_PETERNAKAN';
    const divisionCommodities = this.categoriesData.commodities.filter(c => c.division === this.activeDivision);

    // Ensure selected commodity belongs to active division
    if (divisionCommodities.length > 0 && !divisionCommodities.some(c => c.id === this.selectedCommodityId)) {
      this.selectedCommodityId = divisionCommodities[0].id;
      this.loadBalanceData(this.selectedCommodityId).then(() => this.render());
      return;
    }

    const comm = this.balanceData.commodity;
    const kpis = this.balanceData.kpis;
    const records = this.balanceData.records;

    // Filter available commodities by active sub-filters
    const availableCommodities = divisionCommodities.filter(c => {
      if (this.activeGroup !== 'ALL' && c.group !== this.activeGroup) return false;
      if (this.activeHsChapter !== 'ALL' && c.hs_chapter !== this.activeHsChapter) return false;
      if (this.activeApbnCategory !== 'ALL' && c.lkpp_classification !== this.activeApbnCategory) return false;
      return true;
    });

    // Unique filter options for this division only
    const divisionHsChapters = Array.from(new Set(divisionCommodities.map(c => c.hs_chapter))).sort();
    const divisionApbnCategories = Array.from(new Set(divisionCommodities.map(c => c.lkpp_classification))).sort();

    this.container.innerHTML = `
      <div class="space-y-4 font-mono text-xs text-slate-800">
        
        <!-- 1. TOP HEADER BANNER (Themed with #CDCDCD) -->
        <div style="background-color: #CDCDCD;" class="rounded-lg p-4 border border-slate-400 shadow-sm">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-4xl">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-0.5 rounded text-[10.5px] font-mono font-bold ${isAgri ? 'bg-emerald-900 text-emerald-100 border border-emerald-950' : 'bg-slate-900 text-white'}">
                  ${isAgri ? '🌾 NERACA KOMODITAS PERTANIAN, PETERNAKAN & PERIKANAN' : '⛏️ NERACA KOMODITAS BARANG HASIL BUMI'}
                </span>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
                  KODE HS (BTKI) & HARMONISASI APBN / LKPP
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-900 border border-slate-300">
                  Cakupan: 2018 - 2024
                </span>
              </div>

              <h2 class="text-base font-bold text-slate-950 tracking-tight flex items-center gap-2">
                <span>${isAgri ? '🌾' : '⛏️'}</span>
                <span>${isAgri ? 'Tracking Produksi, Konsumsi, Ekspor & Impor Hasil Pertanian & Peternakan' : 'Tracking Produksi, Konsumsi, Ekspor & Impor Barang Hasil Bumi'}</span>
              </h2>

              <p class="text-[11.5px] text-slate-900 font-sans leading-relaxed">
                ${isAgri 
                  ? 'Pemantauan komprehensif neraca fisik dan neraca perdagangan komoditas: <strong>Hasil Pertanian Pangan Pokok, Hortikultura, Perkebunan, Peternakan Darat, dan Perikanan (Air Laut & Budidaya Tawar/Payau)</strong> dengan integrasi pos anggaran belanja ketahanan pangan APBN dan kepabeanan impor/ekspor.'
                  : 'Pemantauan komprehensif neraca fisik dan neraca perdagangan komoditas: <strong>Barang Hasil Bumi Ditambang (Mineral Logam, Batubara, Minyak Bumi & Gas Alam)</strong> serta <strong>Hasil Bumi Tidak Ditambang (Kehutanan, Rumput Laut, Panas Bumi)</strong> dengan integrasi pos PNBP Sumber Daya Alam (SDA) LKPP Audited.'
                }
              </p>
            </div>

            <!-- Export Full Balance Sheet Button -->
            <div class="shrink-0 flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
              <button 
                type="button" 
                id="btn-export-commodity-excel"
                class="w-full lg:w-auto px-3.5 py-2 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer border border-emerald-900"
                title="Unduh dataset neraca komoditas lengkap dalam format Microsoft Excel (.xlsx)"
              >
                <span>📥</span>
                <span>Unduh Neraca (${isAgri ? 'Pertanian' : 'Hasil Bumi'}) .xlsx</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 2. SECTION HEADER & VIEW MODE SWITCHER -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-slate-300 shadow-2xs">
          <div class="text-xs font-bold text-slate-950 flex items-center gap-2">
            <span>${isAgri ? '🌾' : '⛏️'}</span>
            <span>${isAgri ? 'Katalog Neraca: Pertanian, Peternakan & Perikanan (Darat & Air)' : 'Katalog Neraca: Barang Hasil Bumi (Ditambang & Tidak Ditambang)'}</span>
            <span class="px-2 py-0.2 rounded bg-slate-100 text-slate-700 text-[10.5px] border border-slate-300 font-bold">
              ${divisionCommodities.length} Komoditas
            </span>
          </div>

          <!-- View Mode (Detail Neraca vs Matriks Komparatif) -->
          <div class="flex items-center gap-1 shrink-0 bg-slate-100 p-1 rounded border border-slate-300">
            <button 
              type="button" 
              class="btn-view-mode px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${this.activeViewMode === 'DETAIL' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              data-mode="DETAIL"
            >
              📈 Detail Komoditas
            </button>
            <button 
              type="button" 
              class="btn-view-mode px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${this.activeViewMode === 'MATRIX' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              data-mode="MATRIX"
            >
              📋 Matriks Komparatif (${divisionCommodities.length})
            </button>
          </div>
        </div>

        <!-- 3. MULTI-DIMENSIONAL FILTER CONTROLS (Harmonized with Indikator Ekonomi) -->
        <div class="bg-white p-3 rounded-lg border border-slate-300 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <!-- Select Commodity (Only in Detail View) -->
          <div class="${this.activeViewMode === 'DETAIL' ? 'block' : 'hidden'}">
            <label class="block text-[10.5px] font-bold uppercase text-slate-700 mb-1">
              Pilih Komoditas <span class="text-emerald-700">(${availableCommodities.length})</span>:
            </label>
            <select id="select-active-commodity" class="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs font-semibold text-slate-900 focus:outline-emerald-700">
              ${availableCommodities.map(c => `
                <option value="${c.id}" ${c.id === this.selectedCommodityId ? 'selected' : ''}>
                  ${c.name} [${c.unit}]
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Group Filter -->
          <div>
            <label class="block text-[10.5px] font-bold uppercase text-slate-700 mb-1">
              Sub-Sektor / Realm:
            </label>
            <select id="select-filter-group" class="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs font-semibold text-slate-900 focus:outline-emerald-700">
              <option value="ALL" ${this.activeGroup === 'ALL' ? 'selected' : ''}>Semua Sub-Sektor</option>
              ${isAgri ? `
                <option value="PANGAN_POKOK" ${this.activeGroup === 'PANGAN_POKOK' ? 'selected' : ''}>🍚 Pangan Pokok (Darat)</option>
                <option value="HORTIKULTURA" ${this.activeGroup === 'HORTIKULTURA' ? 'selected' : ''}>🧅 Hortikultura & Sayur (Darat)</option>
                <option value="PERKEBUNAN" ${this.activeGroup === 'PERKEBUNAN' ? 'selected' : ''}>🌴 Perkebunan Komersial (Darat)</option>
                <option value="PETERNAKAN" ${this.activeGroup === 'PETERNAKAN' ? 'selected' : ''}>🥩 Peternakan & Hasil Ternak (Darat)</option>
                <option value="PERIKANAN" ${this.activeGroup === 'PERIKANAN' ? 'selected' : ''}>🐟 Perikanan (Air Laut & Tawar)</option>
              ` : `
                <option value="TAMBANG_MINERAL_ENERGI" ${this.activeGroup === 'TAMBANG_MINERAL_ENERGI' ? 'selected' : ''}>💎 Ditambang (Mineral, Batubara, Migas)</option>
                <option value="NON_TAMBANG_HAYATI" ${this.activeGroup === 'NON_TAMBANG_HAYATI' ? 'selected' : ''}>🌲 Tidak Ditambang (Kehutanan, Rumput Laut, Panas Bumi)</option>
              `}
            </select>
          </div>

          <!-- HS Chapter Filter -->
          <div>
            <label class="block text-[10.5px] font-bold uppercase text-slate-700 mb-1">
              Bab Klasifikasi HS (BTKI):
            </label>
            <select id="select-filter-hs" class="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs font-semibold text-slate-900 focus:outline-emerald-700">
              <option value="ALL" ${this.activeHsChapter === 'ALL' ? 'selected' : ''}>Semua Bab HS</option>
              ${divisionHsChapters.map(h => `
                <option value="${h}" ${this.activeHsChapter === h ? 'selected' : ''}>${h}</option>
              `).join('')}
            </select>
          </div>

          <!-- Rentang Tahun Filter (Matching Indikator Ekonomi Standard) -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="text-[10.5px] font-bold uppercase text-slate-700">
                Rentang Tahun:
              </label>
              <div class="flex items-center gap-1">
                <button type="button" id="commodity-preset-3y" class="px-1.5 py-0.5 rounded text-[9.5px] font-mono border transition-all cursor-pointer ${this.startYear === 2022 && this.endYear === 2024 ? 'bg-slate-800 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                  3 Thn
                </button>
                <button type="button" id="commodity-preset-5y" class="px-1.5 py-0.5 rounded text-[9.5px] font-mono border transition-all cursor-pointer ${this.startYear === 2020 && this.endYear === 2024 ? 'bg-slate-800 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                  5 Thn
                </button>
                <button type="button" id="commodity-preset-all" class="px-1.5 py-0.5 rounded text-[9.5px] font-mono border transition-all cursor-pointer ${this.startYear === 2018 && this.endYear === 2024 ? 'bg-slate-800 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                  Semua
                </button>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <input type="number" id="commodity-start-year" class="gov-input text-xs font-mono text-center w-full py-0.5" min="2018" max="2025" value="${this.startYear}">
              <span class="text-slate-400 text-xs font-mono">s/d</span>
              <input type="number" id="commodity-end-year" class="gov-input text-xs font-mono text-center w-full py-0.5" min="2018" max="2025" value="${this.endYear}">
            </div>
          </div>
        </div>

        ${this.activeViewMode === 'DETAIL' ? this.renderDetailView(comm, kpis, records, availableCommodities) : this.renderMatrixView()}

      </div>
    `;

    this.attachEvents();
    if (this.activeViewMode === 'DETAIL') {
      this.renderChart(records, comm.unit);
    }
  }

  renderDetailView(comm, kpis, records, availableCommodities = []) {
    const latest = records.length ? records[records.length - 1] : {};

    return `
      <!-- 4. SELECTED COMMODITY STATUTORY SPECIFICATION & PROVENANCE -->
      <div class="bg-slate-50 rounded-lg p-4 border border-slate-300 space-y-3">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-base font-bold text-slate-950">${comm.name}</span>
              <span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-white text-slate-800 border border-slate-300">
                Satuan: <strong>${comm.unit}</strong>
              </span>
              <span class="px-2 py-0.5 rounded text-[10.5px] font-bold ${comm.realm === 'DARAT' ? 'bg-amber-100 text-amber-900 border border-amber-300' : (comm.realm.includes('AIR') ? 'bg-sky-100 text-sky-900 border border-sky-300' : 'bg-stone-100 text-stone-900 border border-stone-300')}">
                Realm: ${comm.realm_label}
              </span>
            </div>
            <p class="text-[11px] text-slate-600 font-sans">${comm.description}</p>
          </div>

          <div class="text-right shrink-0">
            <div class="text-[10px] text-slate-500 font-bold uppercase">Status Ketahanan Pangan/Energi (${this.endYear}):</div>
            <div class="text-xs font-bold ${latest.ssr_percent >= 100 ? 'text-emerald-800' : 'text-rose-800'} mt-0.5">
              ${kpis.status_headline || 'Terpantau'}
            </div>
          </div>
        </div>

        <!-- HS Code & APBN / LKPP Mapping Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
          <div class="bg-white p-2.5 rounded border border-slate-200 space-y-0.5">
            <span class="text-[10px] text-slate-400 font-bold uppercase">🏷️ KODE HS (BTKI 8-DIGIT)</span>
            <div class="font-bold text-slate-900 truncate" title="${comm.hs_code}">${comm.hs_code}</div>
            <div class="text-[10px] text-slate-500">${comm.hs_chapter}</div>
          </div>

          <div class="bg-white p-2.5 rounded border border-slate-200 space-y-0.5">
            <span class="text-[10px] text-slate-400 font-bold uppercase">🏛️ PENGELOMPOKAN APBN</span>
            <div class="font-bold text-slate-900 truncate" title="${comm.apbn_classification}">${comm.apbn_classification}</div>
            <div class="text-[10px] text-slate-500">${comm.lkpp_classification}</div>
          </div>

          <div class="bg-white p-2.5 rounded border border-slate-200 space-y-0.5">
            <span class="text-[10px] text-slate-400 font-bold uppercase">📑 KODE AKUN BAS / LKPP AUDITED</span>
            <div class="font-bold text-emerald-900 truncate" title="${comm.lkpp_account_code}">${comm.lkpp_account_code}</div>
            <div class="text-[10px] text-slate-500">Laporan Operasional (LO) & LRA</div>
          </div>

          <div class="bg-white p-2.5 rounded border border-slate-200 space-y-0.5">
            <span class="text-[10px] text-slate-400 font-bold uppercase">⚖️ DASAR HUKUM / SUMBER RESMI</span>
            <div class="font-bold text-slate-900 truncate" title="${comm.legal_basis}">${comm.source_institution}</div>
            <div class="text-[10px] text-slate-500 truncate" title="${comm.legal_basis}">${comm.legal_basis}</div>
          </div>
        </div>
      </div>

      <!-- 5. SUMMARY METRIC KPI CARDS -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">PRODUKSI (${this.endYear})</span>
          <div class="text-sm lg:text-base font-bold text-slate-950 font-mono">
            ${Number(latest.production || 0).toLocaleString('id-ID')}
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">KONSUMSI (${this.endYear})</span>
          <div class="text-sm lg:text-base font-bold text-slate-950 font-mono">
            ${Number(latest.consumption || 0).toLocaleString('id-ID')}
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">IMPOR (${this.endYear})</span>
          <div class="text-sm lg:text-base font-bold text-amber-700 font-mono">
            ${Number(latest.import_volume || 0).toLocaleString('id-ID')}
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${latest.import_value_usd_million ? '$' + Number(latest.import_value_usd_million).toLocaleString('id-ID') + 'M' : comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">EKSPOR (${this.endYear})</span>
          <div class="text-sm lg:text-base font-bold text-sky-800 font-mono">
            ${Number(latest.export_volume || 0).toLocaleString('id-ID')}
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${latest.export_value_usd_million ? '$' + Number(latest.export_value_usd_million).toLocaleString('id-ID') + 'M' : comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">SWASEMBADA (SSR)</span>
          <div class="text-sm lg:text-base font-bold ${latest.ssr_percent >= 100 ? 'text-emerald-700' : 'text-rose-700'} font-mono">
            ${latest.ssr_percent}%
          </div>
          <div class="text-[10px] text-slate-400 font-sans">Self-Sufficiency</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">KETERGANTUNGAN IMPOR</span>
          <div class="text-sm lg:text-base font-bold ${latest.idr_percent > 40 ? 'text-rose-700' : 'text-slate-800'} font-mono">
            ${latest.idr_percent}%
          </div>
          <div class="text-[10px] text-slate-400 font-sans">Import Dependency</div>
        </div>
      </div>

      <!-- 6. INTERACTIVE BALANCE BAR CHART (VOLUME & APBN FINANCIAL MODES) -->
      <div class="bg-white p-4 rounded-lg border border-slate-300 shadow-2xs space-y-3">
        
        <!-- CHART HEADER CONTROLS BAR (COMMODITY SELECTOR + YEAR FILTER + MODES) -->
        <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          
          <!-- Left: Title & Quick Commodity Selector Dropdown -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-base">📊</span>
            <div class="flex items-center gap-1.5">
              <label for="select-chart-commodity" class="font-bold text-xs text-slate-950 whitespace-nowrap">Pilih Komoditas:</label>
              <select id="select-chart-commodity" class="bg-white border-2 border-slate-400 rounded px-2 py-1 text-xs font-bold text-slate-950 focus:outline-emerald-700 shadow-2xs cursor-pointer">
                ${availableCommodities.map(c => `
                  <option value="${c.id}" ${c.id === this.selectedCommodityId ? 'selected' : ''}>
                    ${c.name} (${c.hs_code.split('(')[0].trim()}) [${c.unit}]
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Right: Mode Switcher & Year Range Selector (Matching Indikator Ekonomi) -->
          <div class="flex items-center gap-2 flex-wrap justify-end">
            <!-- Year Range Preset on Chart -->
            <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded border border-slate-300 font-mono text-xs">
              <span class="text-[10px] font-bold text-slate-600 uppercase">Tahun:</span>
              <input type="number" id="chart-start-year" class="w-14 text-center bg-white border border-slate-300 rounded px-1 py-0.5 text-xs font-bold text-slate-900" min="2018" max="2025" value="${this.startYear}">
              <span class="text-slate-400 text-[10px]">s/d</span>
              <input type="number" id="chart-end-year" class="w-14 text-center bg-white border border-slate-300 rounded px-1 py-0.5 text-xs font-bold text-slate-900" min="2018" max="2025" value="${this.endYear}">
            </div>

            <!-- Mode Selector -->
            <div class="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-300 font-mono text-[10.5px]">
              <button 
                type="button" 
                class="btn-chart-mode px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${this.activeChartMode === 'VOLUME' ? 'bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}"
                data-chart-mode="VOLUME"
              >
                📊 1. Volume Fisik (${comm.unit})
              </button>
              <button 
                type="button" 
                class="btn-chart-mode px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${this.activeChartMode === 'APBN' ? 'bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}"
                data-chart-mode="APBN"
              >
                🏛️ 2. Terhubung APBN (Rp Miliar)
              </button>
            </div>
          </div>
        </div>

        <!-- Chart Subtitle & Legend Bar -->
        <div class="flex items-center justify-between text-[11px] font-mono flex-wrap gap-2">
          <div class="text-[10.5px] text-slate-600 font-sans">
            ${this.activeChartMode === 'VOLUME' 
              ? `Perbandingan volume fisik (${this.startYear} - ${this.endYear}) dalam satuan <strong>${comm.unit}</strong>: Produksi, Konsumsi, Impor, dan Ekspor.`
              : `Angka realisasi anggaran terhubung APBN/LKPP: <strong>${records[0]?.apbn_item_name || comm.apbn_classification}</strong> (Satuan: <strong>Rp Miliar</strong>).`
            }
          </div>

          <div class="text-right">
            ${this.activeChartMode === 'VOLUME' ? `
              <div class="flex items-center gap-2.5 text-[10.5px]">
                <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 bg-emerald-600 rounded-xs"></span> Produksi</span>
                <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 bg-rose-600 rounded-xs"></span> Konsumsi</span>
                <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 bg-amber-500 rounded-xs"></span> Impor</span>
                <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 bg-sky-600 rounded-xs"></span> Ekspor</span>
              </div>
            ` : `
              <div class="flex items-center gap-2.5 text-[10.5px]">
                <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 bg-indigo-700 rounded-xs"></span> Realisasi APBN</span>
                <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 bg-sky-600 rounded-xs"></span> Nilai Ekspor ($M)</span>
                <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 bg-amber-600 rounded-xs"></span> Nilai Impor ($M)</span>
              </div>
            `}
          </div>
        </div>

        <div class="relative w-full h-[280px]">
          <canvas id="commodity-balance-chart"></canvas>
        </div>
      </div>

      <!-- 7. FULL DATA TABLE: ANNUAL COMMODITY BALANCE SHEET WITH APBN CONNECTION -->
      <div class="bg-white rounded-lg border border-slate-300 shadow-2xs overflow-hidden">
        <div class="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <span class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
            <span>📑</span>
            <span>Tabel Neraca & Realisasi Anggaran APBN: ${comm.name} (${comm.hs_code})</span>
          </span>
          <span class="text-[10.5px] text-slate-600 font-mono font-bold">
            Pos LKPP: ${comm.lkpp_account_code}
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-[11px] font-mono">
            <thead>
              <tr class="bg-slate-100 border-b border-slate-200 text-slate-700">
                <th class="py-2 px-3">Tahun</th>
                <th class="py-2 px-3 text-right">Produksi</th>
                <th class="py-2 px-3 text-right">Konsumsi</th>
                <th class="py-2 px-3 text-right">Vol Impor</th>
                <th class="py-2 px-3 text-right">Vol Ekspor</th>
                <th class="py-2 px-3 text-right">Surplus/Defisit</th>
                <th class="py-2 px-3 text-center">SSR (%)</th>
                <th class="py-2 px-3 text-center">IDR (%)</th>
                <th class="py-2 px-3 text-right text-indigo-950 font-bold bg-indigo-50/50">Realisasi APBN (Rp M)</th>
                <th class="py-2 px-3 text-left">Publikasi APBN Terkait</th>
                <th class="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${records.map(r => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="py-2 px-3 font-bold text-slate-950">${r.period}</td>
                  <td class="py-2 px-3 text-right font-semibold text-emerald-950">${Number(r.production).toLocaleString('id-ID')}</td>
                  <td class="py-2 px-3 text-right text-slate-900">${Number(r.consumption).toLocaleString('id-ID')}</td>
                  <td class="py-2 px-3 text-right text-amber-800">${Number(r.import_volume).toLocaleString('id-ID')}</td>
                  <td class="py-2 px-3 text-right text-sky-800 font-semibold">${Number(r.export_volume).toLocaleString('id-ID')}</td>
                  <td class="py-2 px-3 text-right font-bold ${r.surplus_deficit >= 0 ? 'text-emerald-700' : 'text-rose-700'}">
                    ${r.surplus_deficit >= 0 ? '+' : ''}${Number(r.surplus_deficit).toLocaleString('id-ID')}
                  </td>
                  <td class="py-2 px-3 text-center font-bold ${r.ssr_percent >= 100 ? 'text-emerald-700' : 'text-rose-700'}">${r.ssr_percent}%</td>
                  <td class="py-2 px-3 text-center ${r.idr_percent > 40 ? 'text-rose-700 font-bold' : 'text-slate-600'}">${r.idr_percent}%</td>
                  <td class="py-2 px-3 text-right font-bold text-indigo-900 bg-indigo-50/50">
                    Rp ${Number(r.apbn_realization_idr_billion || 0).toLocaleString('id-ID')} M
                  </td>
                  <td class="py-2 px-3 text-slate-600 text-[10px] max-w-[220px] truncate" title="${r.apbn_publication_source}">
                    ${r.apbn_publication_source || 'LKPP Audited'}
                  </td>
                  <td class="py-2 px-3 text-center">
                    <span class="px-1.5 py-0.2 rounded text-[10px] font-bold ${r.status === 'SURPLUS' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'}">
                      ${r.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderMatrixView() {
    const list = this.matrixData || this.categoriesData.commodities;

    return `
      <!-- 8. MATRIX COMPARATIVE VIEW OF ALL COMMODITIES -->
      <div class="bg-white rounded-lg border border-slate-300 shadow-2xs overflow-hidden space-y-2">
        <div class="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 class="font-bold text-xs text-slate-950 flex items-center gap-1.5">
              <span>📋</span>
              <span>Matriks Komparatif Seluruh Komoditas (${this.selectedYear})</span>
            </h3>
            <p class="text-[10.5px] text-slate-500 font-sans">
              Menampilkan tingkat swasembada (SSR), rasio ketergantungan impor (IDR), Kode HS, dan Pos Akun APBN/LKPP untuk setiap komoditas.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-[10.5px] font-bold text-slate-700 uppercase">Tahun:</label>
            <select id="select-matrix-year" class="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-bold text-slate-900">
              ${['2024', '2023', '2022', '2021', '2020', '2019', '2018'].map(y => `
                <option value="${y}" ${this.selectedYear === y ? 'selected' : ''}>${y}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-[11px] font-mono">
            <thead>
              <tr class="bg-slate-100 border-b border-slate-200 text-slate-700">
                <th class="py-2.5 px-3">Komoditas & Sektor</th>
                <th class="py-2.5 px-3">Kode HS (BTKI)</th>
                <th class="py-2.5 px-3">Pos APBN / LKPP</th>
                <th class="py-2.5 px-3 text-right">Produksi</th>
                <th class="py-2.5 px-3 text-right">Konsumsi</th>
                <th class="py-2.5 px-3 text-right">Impor</th>
                <th class="py-2.5 px-3 text-right">Ekspor</th>
                <th class="py-2.5 px-3 text-right">Surplus/Defisit</th>
                <th class="py-2.5 px-3 text-center">SSR (%)</th>
                <th class="py-2.5 px-3 text-center">IDR (%)</th>
                <th class="py-2.5 px-3 text-center">Status Neraca</th>
                <th class="py-2.5 px-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${list.map(c => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="py-2.5 px-3">
                    <div class="font-bold text-slate-950">${c.name || c.commodity_name}</div>
                    <div class="text-[10px] text-slate-500">${c.realm || c.realm_label || ''} • Satuan: <strong>${c.unit}</strong></div>
                  </td>
                  <td class="py-2.5 px-3 font-semibold text-slate-800">
                    <div class="truncate max-w-[130px]" title="${c.hs_code}">${c.hs_code}</div>
                    <div class="text-[10px] text-slate-500">${c.hs_chapter || ''}</div>
                  </td>
                  <td class="py-2.5 px-3 text-[10.5px]">
                    <div class="font-semibold text-emerald-950 truncate max-w-[150px]" title="${c.apbn_classification}">${c.apbn_classification}</div>
                    <div class="text-[10px] text-slate-500 truncate max-w-[150px]" title="${c.lkpp_account_code}">${c.lkpp_account_code}</div>
                  </td>
                  <td class="py-2.5 px-3 text-right font-semibold text-slate-900">${Number(c.latest_production || c.production || 0).toLocaleString('id-ID')}</td>
                  <td class="py-2.5 px-3 text-right text-slate-800">${Number(c.latest_consumption || c.consumption || 0).toLocaleString('id-ID')}</td>
                  <td class="py-2.5 px-3 text-right text-amber-800">${Number(c.latest_import || c.import_volume || 0).toLocaleString('id-ID')}</td>
                  <td class="py-2.5 px-3 text-right text-sky-800 font-semibold">${Number(c.latest_export || c.export_volume || 0).toLocaleString('id-ID')}</td>
                  <td class="py-2.5 px-3 text-right font-bold ${(c.latest_surplus || c.surplus_deficit || 0) >= 0 ? 'text-emerald-700' : 'text-rose-700'}">
                    ${(c.latest_surplus || c.surplus_deficit || 0) >= 0 ? '+' : ''}${Number(c.latest_surplus || c.surplus_deficit || 0).toLocaleString('id-ID')}
                  </td>
                  <td class="py-2.5 px-3 text-center font-bold ${(c.ssr_percent || 0) >= 100 ? 'text-emerald-700' : 'text-rose-700'}">
                    ${c.ssr_percent}%
                  </td>
                  <td class="py-2.5 px-3 text-center ${(c.idr_percent || 0) > 40 ? 'text-rose-700 font-bold' : 'text-slate-600'}">
                    ${c.idr_percent}%
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${(c.ssr_percent || 0) >= 100 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'}">
                      ${(c.ssr_percent || 0) >= 100 ? 'SWASEMBADA' : 'DEFISIT / IMPOR'}
                    </span>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <button 
                      class="btn-inspect-commodity px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[10.5px] font-bold cursor-pointer transition-all"
                      data-id="${c.id || c.commodity_id}"
                    >
                      Buka Tren ➔
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // 1. View Mode Switcher
    this.container.querySelectorAll('.btn-view-mode').forEach(btn => {
      btn.addEventListener('click', async () => {
        const mode = btn.getAttribute('data-mode');
        this.activeViewMode = mode;
        if (mode === 'MATRIX') {
          await this.loadMatrixData();
        }
        this.render();
      });
    });

    // 2. Commodity Dropdown Selectors (Both Top Panel and Chart Menu Bar)
    const handleCommoditySelection = async (newId) => {
      this.selectedCommodityId = newId;
      await this.loadBalanceData(newId);
      this.render();
    };

    document.getElementById('select-active-commodity')?.addEventListener('change', (e) => {
      handleCommoditySelection(e.target.value);
    });

    document.getElementById('select-chart-commodity')?.addEventListener('change', (e) => {
      handleCommoditySelection(e.target.value);
    });

    // 3. Year Range Presets (Harmonized with Indikator Ekonomi)
    document.getElementById('commodity-preset-3y')?.addEventListener('click', async () => {
      this.startYear = 2022;
      this.endYear = 2024;
      await this.loadBalanceData(this.selectedCommodityId);
      this.render();
    });

    document.getElementById('commodity-preset-5y')?.addEventListener('click', async () => {
      this.startYear = 2020;
      this.endYear = 2024;
      await this.loadBalanceData(this.selectedCommodityId);
      this.render();
    });

    document.getElementById('commodity-preset-all')?.addEventListener('click', async () => {
      this.startYear = 2018;
      this.endYear = 2024;
      await this.loadBalanceData(this.selectedCommodityId);
      this.render();
    });

    // 4. Year Range Inputs (Panel and Chart)
    const handleYearInputChange = async (sYear, eYear) => {
      const s = parseInt(sYear, 10);
      const e = parseInt(eYear, 10);
      if (!isNaN(s) && !isNaN(e) && s <= e) {
        this.startYear = s;
        this.endYear = e;
        await this.loadBalanceData(this.selectedCommodityId);
        this.render();
      }
    };

    document.getElementById('commodity-start-year')?.addEventListener('change', (e) => {
      handleYearInputChange(e.target.value, this.endYear);
    });

    document.getElementById('commodity-end-year')?.addEventListener('change', (e) => {
      handleYearInputChange(this.startYear, e.target.value);
    });

    document.getElementById('chart-start-year')?.addEventListener('change', (e) => {
      handleYearInputChange(e.target.value, this.endYear);
    });

    document.getElementById('chart-end-year')?.addEventListener('change', (e) => {
      handleYearInputChange(this.startYear, e.target.value);
    });

    // 5. Group Filter
    const selectGroup = document.getElementById('select-filter-group');
    selectGroup?.addEventListener('change', async (e) => {
      this.activeGroup = e.target.value;
      if (this.activeViewMode === 'MATRIX') {
        await this.loadMatrixData();
      }
      this.render();
    });

    // 6. HS Chapter Filter
    const selectHs = document.getElementById('select-filter-hs');
    selectHs?.addEventListener('change', async (e) => {
      this.activeHsChapter = e.target.value;
      if (this.activeViewMode === 'MATRIX') {
        await this.loadMatrixData();
      }
      this.render();
    });

    // 7. Matrix Year Selector
    const selectMatrixYear = document.getElementById('select-matrix-year');
    selectMatrixYear?.addEventListener('change', async (e) => {
      this.selectedYear = e.target.value;
      await this.loadMatrixData();
      this.render();
    });

    // 8. Inspect button from Matrix
    this.container.querySelectorAll('.btn-inspect-commodity').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        this.activeViewMode = 'DETAIL';
        await this.loadBalanceData(id);
        this.render();
      });
    });

    // 9. Export Excel Button
    document.getElementById('btn-export-commodity-excel')?.addEventListener('click', () => {
      this.handleExportExcel();
    });

    // 10. Chart Mode Selector (Volume vs APBN Realization)
    this.container.querySelectorAll('.btn-chart-mode').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-chart-mode');
        this.activeChartMode = mode;
        this.render();
      });
    });
  }

  renderChart(records, unit) {
    const canvas = document.getElementById('commodity-balance-chart');
    if (!canvas) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }

    const labels = records.map(r => r.period);

    // If Chart.js library is loaded
    if (window.Chart) {
      let datasets = [];

      if (this.activeChartMode === 'VOLUME') {
        datasets = [
          {
            label: `Produksi Domestik (${unit})`,
            data: records.map(r => r.production),
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1,
            borderRadius: 2
          },
          {
            label: `Konsumsi Domestik (${unit})`,
            data: records.map(r => r.consumption),
            backgroundColor: 'rgba(225, 29, 72, 0.85)',
            borderColor: 'rgb(225, 29, 72)',
            borderWidth: 1,
            borderRadius: 2
          },
          {
            label: `Volume Impor (${unit})`,
            data: records.map(r => r.import_volume),
            backgroundColor: 'rgba(245, 158, 11, 0.85)',
            borderColor: 'rgb(245, 158, 11)',
            borderWidth: 1,
            borderRadius: 2
          },
          {
            label: `Volume Ekspor (${unit})`,
            data: records.map(r => r.export_volume),
            backgroundColor: 'rgba(2, 132, 199, 0.85)',
            borderColor: 'rgb(2, 132, 199)',
            borderWidth: 1,
            borderRadius: 2
          }
        ];
      } else {
        // APBN FINANCIAL REALIZATION MODE
        datasets = [
          {
            label: `Realisasi Anggaran APBN (Rp Miliar)`,
            data: records.map(r => r.apbn_realization_idr_billion || 0),
            backgroundColor: 'rgba(79, 70, 229, 0.85)',
            borderColor: 'rgb(79, 70, 229)',
            borderWidth: 1,
            borderRadius: 2
          },
          {
            label: `Nilai Ekspor ($M USD)`,
            data: records.map(r => r.export_value_usd_million || 0),
            backgroundColor: 'rgba(2, 132, 199, 0.85)',
            borderColor: 'rgb(2, 132, 199)',
            borderWidth: 1,
            borderRadius: 2
          },
          {
            label: `Nilai Impor ($M USD)`,
            data: records.map(r => r.import_value_usd_million || 0),
            backgroundColor: 'rgba(245, 158, 11, 0.85)',
            borderColor: 'rgb(245, 158, 11)',
            borderWidth: 1,
            borderRadius: 2
          }
        ];
      }

      this.chartInstance = new window.Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#CDCDCD',
              titleColor: '#020617',
              bodyColor: '#020617',
              borderColor: '#94a3b8',
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(ctx) {
                  const val = ctx.raw !== null ? Number(ctx.raw).toLocaleString('id-ID') : '0';
                  return ` ${ctx.dataset.label}: ${val}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: { font: { family: 'monospace', size: 10 } }
            },
            y: {
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: {
                font: { family: 'monospace', size: 10 },
                callback: function(v) { return Number(v).toLocaleString('id-ID'); }
              }
            }
          }
        }
      });
    } else {
      // Direct Canvas 2D Fallback Bar Chart
      this.drawCanvasFallback(canvas, records, unit);
    }
  }

  drawCanvasFallback(canvas, records, unit) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio || 800;
    canvas.height = rect.height * window.devicePixelRatio || 280;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const w = rect.width || 800;
    const h = rect.height || 280;
    const padding = { top: 25, right: 20, bottom: 35, left: 65 };

    ctx.clearRect(0, 0, w, h);

    const isVolume = this.activeChartMode === 'VOLUME';
    const seriesKeys = isVolume
      ? [
          { key: 'production', label: 'Produksi', color: '#10b981' },
          { key: 'consumption', label: 'Konsumsi', color: '#e11d48' },
          { key: 'import_volume', label: 'Impor', color: '#f59e0b' },
          { key: 'export_volume', label: 'Ekspor', color: '#0284c7' }
        ]
      : [
          { key: 'apbn_realization_idr_billion', label: 'APBN (Rp M)', color: '#4f46e5' },
          { key: 'export_value_usd_million', label: 'Ekspor ($M)', color: '#0284c7' },
          { key: 'import_value_usd_million', label: 'Impor ($M)', color: '#f59e0b' }
        ];

    // Find max value
    let maxVal = 100;
    records.forEach(r => {
      seriesKeys.forEach(s => {
        const val = Number(r[s.key] || 0);
        if (val > maxVal) maxVal = val;
      });
    });
    maxVal = Math.ceil(maxVal * 1.15);

    const plotW = w - padding.left - padding.right;
    const plotH = h - padding.top - padding.bottom;

    // Draw horizontal grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';

    for (let i = 0; i <= 4; i++) {
      const yVal = (maxVal / 4) * i;
      const yPos = padding.top + plotH - (i / 4) * plotH;
      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(w - padding.right, yPos);
      ctx.stroke();
      ctx.fillText(Number(Math.round(yVal)).toLocaleString('id-ID'), padding.left - 8, yPos + 3);
    }

    // Draw Grouped Bars
    const groupW = plotW / records.length;
    const barW = Math.max(4, (groupW * 0.7) / seriesKeys.length);

    records.forEach((r, idx) => {
      const groupX = padding.left + idx * groupW + (groupW * 0.15);

      seriesKeys.forEach((s, sIdx) => {
        const val = Number(r[s.key] || 0);
        const barH = (val / maxVal) * plotH;
        const x = groupX + sIdx * barW;
        const y = padding.top + plotH - barH;

        ctx.fillStyle = s.color;
        ctx.fillRect(x, y, barW - 1, barH);
      });

      // Year Label
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 10.5px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(r.period, groupX + (seriesKeys.length * barW) / 2, h - 12);
    });
  }

  async handleExportExcel() {
    try {
      if (!this.balanceData) return;
      const comm = this.balanceData.commodity;
      const records = this.balanceData.records;

      // Verify researcher access via registered email
      const user = JSON.parse(localStorage.getItem('den_researcher_user') || 'null');
      if (!user) {
        if (window.openEmailRegistrationModal) {
          window.openEmailRegistrationModal('Verifikasi Email Peneliti diperlukan sebelum mengunduh Neraca Komoditas.');
        } else {
          alert('Silakan daftarkan email peneliti terlebih dahulu di menu registrasi.');
        }
        return;
      }

      // Check Quota
      const quotaCheck = ExcelExporter.checkAndConsumeDownloadQuota(user.email);
      if (!quotaCheck.allowed) {
        ExcelExporter.showQuotaExceededModal(quotaCheck);
        return;
      }

      const rows = [
        ['PUSAT BASIS DATA DATA SEKUNDER: PERGERAKAN EKONOMI INDONESIA'],
        ['NERACA KOMODITAS, PANGAN & HASIL BUMI NASIONAL'],
        ['Cakupan Geografis: Indonesia (Nasional) | Harmonisasi APBN & LKPP'],
        [],
        ['KOMODITAS', comm.name],
        ['DIVISI / SEKTOR', comm.division_label],
        ['SUB-SEKTOR / REALM', comm.realm_label],
        ['KODE HS (BTKI)', comm.hs_code],
        ['BAB HS', comm.hs_chapter],
        ['PENGELOMPOKAN APBN', comm.apbn_classification],
        ['KODE AKUN LKPP (BAS)', comm.lkpp_account_code],
        ['LEMBAGA SUMBER', comm.source_institution],
        ['DASAR HUKUM', comm.legal_basis],
        ['DESKRIPSI', comm.description],
        [],
        ['TAHUN', 'PRODUKSI DOMESTIK', 'KONSUMSI DOMESTIK', 'VOLUME IMPOR', 'NILAI IMPOR ($M)', 'VOLUME EKSPOR', 'NILAI EKSPOR ($M)', 'SURPLUS / DEFISIT', 'RASIO SWASEMBADA (SSR %)', 'RASIO IMPOR (IDR %)', 'STOK CADANGAN', 'SATUAN', 'STATUS']
      ];

      records.forEach(r => {
        rows.push([
          r.period,
          r.production,
          r.consumption,
          r.import_volume,
          r.import_value_usd_million || 0,
          r.export_volume,
          r.export_value_usd_million || 0,
          r.surplus_deficit,
          r.ssr_percent,
          r.idr_percent,
          r.ending_stocks,
          r.unit,
          r.status
        ]);
      });

      // Build CSV/Excel Blob
      const csvContent = "\uFEFF" + rows.map(e => e.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(",")).join("\r\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const fileName = `Neraca_Komoditas_${comm.id}_${new Date().toISOString().slice(0, 10)}.csv`;
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Record Audit
      ApiClient.recordDownloadLog({
        user_email: user.email,
        session_count: quotaCheck.sessionCount,
        daily_count: quotaCheck.dailyCount,
        file_name: fileName
      });

      ExcelExporter.showExportToast(1, 1, records.length * 6, fileName);
    } catch (err) {
      console.error('Export commodity failed:', err);
      alert('Gagal mengunduh neraca komoditas: ' + err.message);
    }
  }
}
