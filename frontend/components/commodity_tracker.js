// ==============================================================================
// NERACA KOMODITAS, PANGAN & HASIL BUMI TRACKER COMPONENT
// Tracking Produksi, Konsumsi, Ekspor, Impor, Kode HS & Klasifikasi APBN/LKPP (2000 - 2025)
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
    this.activeChartMode = 'APBN_RUPIAH'; // 'APBN_RUPIAH' | 'VOLUME_STANDARD' | 'VOLUME_KG' | 'EKSPOR_USD'
    this.activeChartType = 'bar'; // 'bar' | 'line'
    this.selectedCommodityId = 'COM-AGRI-001-BERAS';
    this.selectedYear = '2024';
    this.startYear = 2000;
    this.endYear = 2025;
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
      
      // Default selection depending on division
      if (!this.selectedCommodityId || this.selectedCommodityId.startsWith('ALL_')) {
        this.selectedCommodityId = this.activeDivision === 'HASIL_BUMI' ? 'ALL_HASIL_BUMI' : 'COM-AGRI-001-BERAS';
      }

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
        <div class="text-xs">Memuat Basis Data Neraca Komoditas, Kode HS & Pemetaan APBN/LKPP (2000 - 2025)...</div>
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
    this.activeHsChapter = 'ALL';

    if (division === 'HASIL_BUMI') {
      this.selectedCommodityId = 'ALL_HASIL_BUMI';
    } else {
      this.selectedCommodityId = 'COM-AGRI-001-BERAS';
    }

    if (!this.categoriesData) {
      await this.init();
      return;
    }

    await this.loadBalanceData(this.selectedCommodityId);
    if (this.activeViewMode === 'MATRIX') {
      await this.loadMatrixData();
    }
    this.render();
  }

  // Get available HS chapters strictly for current division
  getDivisionHsChapters() {
    if (!this.categoriesData) return [];
    const divComms = this.categoriesData.commodities.filter(c => {
      if (this.activeDivision === 'ALL') return true;
      return c.division === this.activeDivision;
    });
    const chapters = [...new Set(divComms.map(c => c.hs_chapter))];
    return chapters.sort();
  }

  render() {
    if (!this.categoriesData || !this.balanceData) return;

    const comm = this.balanceData.commodity;
    const kpis = this.balanceData.kpis;
    const records = this.balanceData.records;

    const isHasilBumi = this.activeDivision === 'HASIL_BUMI';
    const isAggregate = this.selectedCommodityId === 'ALL_HASIL_BUMI' || this.selectedCommodityId === 'ALL_PERTANIAN';

    // Filter available commodities for current division and optional group / HS
    let availableCommodities = this.categoriesData.commodities.filter(c => {
      if (this.activeDivision === 'ALL') return true;
      return c.division === this.activeDivision;
    });

    if (this.activeGroup !== 'ALL') {
      availableCommodities = availableCommodities.filter(c => c.group === this.activeGroup);
    }
    if (this.activeHsChapter !== 'ALL') {
      availableCommodities = availableCommodities.filter(c => c.hs_chapter === this.activeHsChapter);
    }

    // HS chapters scoped to active division
    const scopedHsChapters = this.getDivisionHsChapters();

    this.container.innerHTML = `
      <div class="space-y-4 font-sans text-slate-900">
        
        <!-- 1. HEADER TITLE BANNER -->
        <div class="bg-gradient-to-r ${isHasilBumi ? 'from-stone-900 via-stone-800 to-amber-950' : 'from-slate-900 via-emerald-950 to-slate-900'} text-white p-4 sm:p-5 rounded-lg border border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xl">${isHasilBumi ? '⛏️' : '🌾'}</span>
              <h2 class="text-base sm:text-lg font-bold tracking-tight font-mono text-white">
                ${isHasilBumi ? 'NERACA HASIL BUMI & REALISASI ANGGARAN APBN (2000 - 2025)' : 'NERACA HASIL PERTANIAN & PETERNAKAN TERHUBUNG APBN (2000 - 2025)'}
              </h2>
            </div>
            <p class="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
              ${isHasilBumi 
                ? 'Pusat integrasi neraca produksi, konsumsi domestik, ekspor mineral & energi (2000-2025), klasifikasi BTKI 8-digit, dan realisasi penerimaan negara bukan pajak (PNBP SDA Minerba, Migas & Kehutanan LKPP).'
                : 'Pusat data sekunder neraca pangan nasional (2000-2025): produksi domestik, konsumsi per kapita, kuota impor, rasio swasembada (SSR), klasifikasi HS Code BTKI 8-digit, serta belanja ketahanan pangan APBN/LKPP.'}
            </p>
          </div>

          <!-- View Mode Toggle Buttons (Detail Komoditas vs Matriks Perbandingan) -->
          <div class="flex items-center gap-1 bg-white/10 p-1 rounded-lg border border-white/20 shrink-0 font-mono text-xs">
            <button 
              type="button" 
              class="btn-view-mode px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${this.activeViewMode === 'DETAIL' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-200 hover:text-white'}"
              data-mode="DETAIL"
            >
              🔍 Detail Neraca
            </button>
            <button 
              type="button" 
              class="btn-view-mode px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${this.activeViewMode === 'MATRIX' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-200 hover:text-white'}"
              data-mode="MATRIX"
            >
              📋 Matriks Sektor
            </button>
          </div>
        </div>

        <!-- 3. MULTI-DIMENSIONAL FILTER CONTROLS (Harmonized & Synchronized) -->
        <div class="bg-white p-3 rounded-lg border border-slate-300 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <!-- Filter 1: Pilih Komoditas Aktif (Includes "Semua Komoditas" option) -->
          <div class="space-y-1">
            <label class="font-bold text-slate-700 uppercase text-[10.5px]">
              ${isHasilBumi ? '⛏️ Komoditas Hasil Bumi:' : '🌾 Komoditas Terpilih:'}
            </label>
            <select id="select-active-commodity" class="w-full bg-white border-2 border-slate-400 rounded px-2.5 py-1.5 font-bold text-slate-900 focus:outline-emerald-700 shadow-2xs cursor-pointer">
              <!-- Special Aggregate Option -->
              <option value="${isHasilBumi ? 'ALL_HASIL_BUMI' : 'ALL_PERTANIAN'}" ${isAggregate ? 'selected' : ''} class="font-bold text-indigo-950 bg-indigo-50">
                ⭐ ${isHasilBumi ? 'Semua Hasil Bumi (Ditambang & Tidak Ditambang)' : 'Semua Pertanian & Peternakan (Darat & Air)'}
              </option>
              
              <optgroup label="Daftar Komoditas Individu:">
                ${availableCommodities.map(c => `
                  <option value="${c.id}" ${c.id === this.selectedCommodityId ? 'selected' : ''}>
                    ${c.name} (${c.hs_code.split('(')[0].trim()}) [${c.unit}]
                  </option>
                `).join('')}
              </optgroup>
            </select>
          </div>

          <!-- Filter 2: Rentang Tahun & Presets (2000 - 2025) -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="font-bold text-slate-700 uppercase text-[10.5px]">📅 Rentang Tahun (2000-2025):</label>
              <div class="flex items-center gap-1">
                <button type="button" id="commodity-preset-5y" class="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[9.5px] font-mono font-bold cursor-pointer">5 Thn</button>
                <button type="button" id="commodity-preset-10y" class="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[9.5px] font-mono font-bold cursor-pointer">10 Thn</button>
                <button type="button" id="commodity-preset-all" class="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[9.5px] font-mono font-bold cursor-pointer">2000-2025</button>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <input type="number" id="commodity-start-year" class="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-xs font-mono font-bold text-slate-900 text-center" min="2000" max="2025" value="${this.startYear}">
              <span class="text-slate-400 font-bold text-xs">s/d</span>
              <input type="number" id="commodity-end-year" class="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-xs font-mono font-bold text-slate-900 text-center" min="2000" max="2025" value="${this.endYear}">
            </div>
          </div>

          <!-- Filter 3: Sub-Kelompok Sektor -->
          <div class="space-y-1">
            <label class="font-bold text-slate-700 uppercase text-[10.5px]">🏷️ Sub-Kelompok / Realm:</label>
            <select id="select-filter-group" class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-bold text-slate-900 focus:outline-emerald-700 shadow-2xs cursor-pointer">
              <option value="ALL">Semua Sub-Kelompok</option>
              ${this.categoriesData.divisions.find(d => d.id === this.activeDivision)?.groups.map(g => `
                <option value="${g.id}" ${this.activeGroup === g.id ? 'selected' : ''}>${g.label}</option>
              `).join('') || ''}
            </select>
          </div>

          <!-- Filter 4: Bab HS Code (Synchronized strictly to current division & selection) -->
          <div class="space-y-1">
            <label class="font-bold text-slate-700 uppercase text-[10.5px]">📑 Bab HS (BTKI):</label>
            <select id="select-filter-hs" class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-bold text-slate-900 focus:outline-emerald-700 shadow-2xs cursor-pointer">
              <option value="ALL">Semua Bab HS ${isHasilBumi ? 'Hasil Bumi' : 'Pertanian'}</option>
              ${scopedHsChapters.map(h => `
                <option value="${h}" ${this.activeHsChapter === h ? 'selected' : ''}>${h}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- MAIN VIEW (DETAIL OR MATRIX) -->
        ${this.activeViewMode === 'DETAIL' ? this.renderDetailView(comm, kpis, records, availableCommodities, isAggregate) : this.renderMatrixView()}

      </div>
    `;

    this.attachEvents();
    if (this.activeViewMode === 'DETAIL') {
      this.renderChart(records, comm.unit, isAggregate);
    }
  }

  renderDetailView(comm, kpis, records, availableCommodities = [], isAggregate = false) {
    const latest = records.length ? records[records.length - 1] : {};

    return `
      <!-- 4. SELECTED COMMODITY STATUTORY SPECIFICATION & PROVENANCE -->
      <div class="bg-slate-50 rounded-lg p-4 border border-slate-300 space-y-3">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-base font-bold text-slate-950">${isAggregate ? '⭐ ' + comm.name : comm.name}</span>
              <span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-white text-slate-800 border border-slate-300">
                Satuan: <strong>${comm.unit}</strong>
              </span>
              <span class="px-2 py-0.5 rounded text-[10.5px] font-bold ${comm.realm === 'DARAT' ? 'bg-amber-100 text-amber-900 border border-amber-300' : (comm.realm?.includes('AIR') ? 'bg-sky-100 text-sky-900 border border-sky-300' : 'bg-stone-100 text-stone-900 border border-stone-300')}">
                Realm: ${comm.realm_label}
              </span>
              ${isAggregate ? `
                <span class="px-2 py-0.5 rounded text-[10.5px] font-bold bg-indigo-100 text-indigo-950 border border-indigo-300">
                  Mode Stacking Bar YoY (2000-2025)
                </span>
              ` : ''}
            </div>
            <p class="text-[11px] text-slate-600 font-sans">${comm.description}</p>
          </div>

          <div class="text-right shrink-0">
            <div class="text-[10px] text-slate-500 font-bold uppercase">Status Neraca / Ketahanan (${this.endYear}):</div>
            <div class="text-xs font-bold ${latest.surplus_deficit >= 0 ? 'text-emerald-800' : 'text-rose-800'} mt-0.5">
              ${kpis.status_headline || 'Terpantau'}
            </div>
          </div>
        </div>

        <!-- HS Code & APBN / LKPP Mapping Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
          <div class="bg-white p-2.5 rounded border border-slate-200 space-y-0.5">
            <span class="text-[10px] text-slate-400 font-bold uppercase">🏷️ KODE HS (BTKI 8-DIGIT)</span>
            <div class="font-bold text-slate-900 truncate" title="${comm.hs_code}">${comm.hs_code}</div>
            <div class="text-[10px] text-slate-500 truncate" title="${comm.hs_chapter}">${comm.hs_chapter}</div>
          </div>

          <div class="bg-white p-2.5 rounded border border-slate-200 space-y-0.5">
            <span class="text-[10px] text-slate-400 font-bold uppercase">🏛️ PENGELOMPOKAN APBN</span>
            <div class="font-bold text-slate-900 truncate" title="${comm.apbn_classification}">${comm.apbn_classification}</div>
            <div class="text-[10px] text-slate-500 truncate" title="${comm.lkpp_classification}">${comm.lkpp_classification}</div>
          </div>

          <div class="bg-white p-2.5 rounded border border-slate-200 space-y-0.5">
            <span class="text-[10px] text-slate-400 font-bold uppercase">📑 KODE AKUN BAS / LKPP AUDITED</span>
            <div class="font-bold text-emerald-900 truncate" title="${comm.lkpp_account_code}">${comm.lkpp_account_code}</div>
            <div class="text-[10px] text-slate-500 truncate">Laporan Operasional (LO) & LRA</div>
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
          <span class="text-[10px] font-bold text-slate-500 uppercase">${isAggregate ? 'TOTAL PNBP APBN' : 'PRODUKSI (' + this.endYear + ')'}</span>
          <div class="text-sm lg:text-base font-bold text-indigo-950 font-mono">
            ${isAggregate 
              ? 'Rp ' + Number(latest.apbn_realization_idr_billion || 0).toLocaleString('id-ID') + ' M'
              : Number(latest.production || 0).toLocaleString('id-ID')
            }
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${isAggregate ? 'Realisasi TA ' + this.endYear : comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">${isAggregate ? 'TARGET APBN (' + this.endYear + ')' : 'KONSUMSI (' + this.endYear + ')'}</span>
          <div class="text-sm lg:text-base font-bold text-purple-950 font-mono">
            ${isAggregate 
              ? 'Rp ' + Number(latest.apbn_target_idr_billion || 0).toLocaleString('id-ID') + ' M'
              : Number(latest.consumption || 0).toLocaleString('id-ID')
            }
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${isAggregate ? 'Pagu UU APBN' : comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">EKSPOR (${this.endYear})</span>
          <div class="text-sm lg:text-base font-bold text-sky-800 font-mono">
            ${latest.export_value_usd_million ? '$' + Number(latest.export_value_usd_million).toLocaleString('id-ID') + 'M' : Number(latest.export_volume || 0).toLocaleString('id-ID')}
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${isAggregate ? 'Total Devisa Ekspor' : comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">IMPOR (${this.endYear})</span>
          <div class="text-sm lg:text-base font-bold text-amber-700 font-mono">
            ${latest.import_value_usd_million ? '$' + Number(latest.import_value_usd_million).toLocaleString('id-ID') + 'M' : Number(latest.import_volume || 0).toLocaleString('id-ID')}
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${isAggregate ? 'Total Devisa Impor' : comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">SURPLUS / DEFISIT</span>
          <div class="text-sm lg:text-base font-bold ${latest.surplus_deficit >= 0 ? 'text-emerald-700' : 'text-rose-700'} font-mono">
            ${latest.surplus_deficit >= 0 ? '+' : ''}${isAggregate ? '$' + Number(latest.surplus_deficit).toLocaleString('id-ID') + 'M' : Number(latest.surplus_deficit).toLocaleString('id-ID')}
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${isAggregate ? 'Net Trade Balance' : comm.unit}</div>
        </div>

        <div class="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">${isAggregate ? 'CAPAIAN APBN' : 'SWASEMBADA (SSR)'}</span>
          <div class="text-sm lg:text-base font-bold ${latest.apbn_achievement_rate_percent >= 95 || latest.ssr_percent >= 100 ? 'text-emerald-700' : 'text-amber-700'} font-mono">
            ${isAggregate ? latest.apbn_achievement_rate_percent + '%' : latest.ssr_percent + '%'}
          </div>
          <div class="text-[10px] text-slate-400 font-sans">${isAggregate ? 'Daya Serap APBN' : 'Self-Sufficiency'}</div>
        </div>
      </div>

      <!-- 6. INTERACTIVE BALANCE BAR / LINE / STACKED BAR CHART -->
      ${this.renderTimeSeriesChartCard(comm, records, availableCommodities, isAggregate)}

      <!-- 7. FULL DATA TABLE: ANNUAL COMMODITY BALANCE SHEET -->
      ${this.renderTableCard(comm, records, isAggregate)}
    `;
  }

  renderTimeSeriesChartCard(comm, records, availableCommodities = [], isAggregate = false) {
    const isHasilBumi = this.activeDivision === 'HASIL_BUMI';

    return `
      <!-- 6. INTERACTIVE BALANCE BAR / LINE CHART (KG, STANDARD, AND APBN FINANCIAL MODES) -->
      <div class="bg-white p-4 rounded-lg border border-slate-300 shadow-2xs space-y-3">
        
        <!-- CHART HEADER CONTROLS BAR (COMMODITY SELECTOR + YEAR FILTER + CHART TYPE + MODES) -->
        <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          
          <!-- Left: Title & Quick Commodity Selector Dropdown -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-base">${this.activeChartType === 'bar' ? '📊' : '📈'}</span>
            <div class="flex items-center gap-1.5">
              <label for="select-chart-commodity" class="font-bold text-xs text-slate-950 whitespace-nowrap">Pilih Komoditas:</label>
              <select id="select-chart-commodity" class="bg-white border-2 border-slate-400 rounded px-2 py-1 text-xs font-bold text-slate-950 focus:outline-emerald-700 shadow-2xs cursor-pointer">
                <option value="${isHasilBumi ? 'ALL_HASIL_BUMI' : 'ALL_PERTANIAN'}" ${isAggregate ? 'selected' : ''} class="font-bold text-indigo-950 bg-indigo-50">
                  ⭐ ${isHasilBumi ? 'Semua Hasil Bumi (Ditambang & Tidak Ditambang)' : 'Semua Pertanian & Peternakan (Darat & Air)'}
                </option>
                ${availableCommodities.map(c => `
                  <option value="${c.id}" ${c.id === this.selectedCommodityId ? 'selected' : ''}>
                    ${c.name} (${c.hs_code.split('(')[0].trim()}) [${c.unit}]
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Right: Year Range + Chart Type (Bar/Line) + Mode Switcher -->
          <div class="flex items-center gap-2 flex-wrap justify-end">
            <!-- Year Range Preset on Chart -->
            <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded border border-slate-300 font-mono text-xs">
              <span class="text-[10px] font-bold text-slate-600 uppercase">Tahun:</span>
              <input type="number" id="chart-start-year" class="w-14 text-center bg-white border border-slate-300 rounded px-1 py-0.5 text-xs font-bold text-slate-900" min="2000" max="2025" value="${this.startYear}">
              <span class="text-slate-400 text-[10px]">s/d</span>
              <input type="number" id="chart-end-year" class="w-14 text-center bg-white border border-slate-300 rounded px-1 py-0.5 text-xs font-bold text-slate-900" min="2000" max="2025" value="${this.endYear}">
            </div>

            <!-- Chart Type Switcher: Bar vs Line -->
            <div class="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-300 font-mono text-[10.5px]">
              <button 
                type="button" 
                class="btn-chart-type px-2 py-1 rounded font-bold transition-all cursor-pointer ${this.activeChartType === 'bar' ? 'bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}"
                data-chart-type="bar"
                title="Tampilkan Diagram Batang (Bar / Stacking Bar Chart)"
              >
                📊 ${isAggregate ? 'Stacking Bar YoY' : 'Bar'}
              </button>
              <button 
                type="button" 
                class="btn-chart-type px-2 py-1 rounded font-bold transition-all cursor-pointer ${this.activeChartType === 'line' ? 'bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}"
                data-chart-type="line"
                title="Tampilkan Grafik Garis (Line Chart)"
              >
                📈 Line
              </button>
            </div>

            <!-- Mode Selector -->
            <div class="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-300 font-mono text-[10.5px]">
              <button 
                type="button" 
                class="btn-chart-mode px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${this.activeChartMode === 'APBN_RUPIAH' ? 'bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}"
                data-chart-mode="APBN_RUPIAH"
                title="Tampilkan Angka APBN / PNBP dalam Rupiah (Rp Miliar)"
              >
                🏛️ ${isHasilBumi ? '1. PNBP SDA APBN (Rp M)' : '1. Belanja APBN (Rp M)'}
              </button>
              
              <button 
                type="button" 
                class="btn-chart-mode px-2 py-1 rounded font-bold transition-all cursor-pointer ${this.activeChartMode === 'EKSPOR_USD' ? 'bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}"
                data-chart-mode="EKSPOR_USD"
                title="Tampilkan Nilai Ekspor dalam Dollar ($M USD)"
              >
                🚢 2. Nilai Ekspor ($M)
              </button>

              ${!isAggregate ? `
                <button 
                  type="button" 
                  class="btn-chart-mode px-2 py-1 rounded font-bold transition-all cursor-pointer ${this.activeChartMode === 'VOLUME_STANDARD' ? 'bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}"
                  data-chart-mode="VOLUME_STANDARD"
                  title="Tampilkan dalam Satuan Standar (${comm.unit})"
                >
                  📦 3. Satuan Standar (${comm.unit})
                </button>
              ` : ''}

              <button 
                type="button" 
                class="btn-chart-mode px-2 py-1 rounded font-bold transition-all cursor-pointer ${this.activeChartMode === 'VOLUME_KG' ? 'bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}"
                data-chart-mode="VOLUME_KG"
                title="Tampilkan dalam Satuan Kilogram (Kg)"
              >
                ⚖️ ${isAggregate ? '3. Fisik: Kg' : '4. Satuan KG'}
              </button>
            </div>
          </div>
        </div>

        ${this.renderChartInnerControlsAndCanvas(comm, records, isAggregate)}
      </div>
    `;
  }

  renderChartInnerControlsAndCanvas(comm, records, isAggregate = false) {
    let subtitleText = '';
    let legendHtml = '';

    if (isAggregate) {
      // In Aggregate Stacking Bar mode
      const breakdownItems = records[0]?.breakdown || [];
      const colors = ['#334155', '#0284c7', '#d97706', '#e11d48', '#059669', '#854d0e', '#0891b2', '#7c3aed', '#4f46e5', '#16a34a', '#dc2626'];

      if (this.activeChartMode === 'APBN_RUPIAH') {
        subtitleText = `Visualisasi <strong>Stacking Bar YoY (Nilai Absolut/Bukan 100%)</strong>: Kontribusi Realisasi PNBP SDA / APBN per Komoditas (${this.startYear} - ${this.endYear}) dalam satuan <strong>Rp Miliar</strong>. Tinggi total bar menunjukkan tren aggregate YoY.`;
      } else if (this.activeChartMode === 'EKSPOR_USD') {
        subtitleText = `Visualisasi <strong>Stacking Bar YoY (Nilai Absolut)</strong>: Kontribusi Devisa Nilai Ekspor per Komoditas (${this.startYear} - ${this.endYear}) dalam satuan <strong>Juta USD ($M)</strong>.`;
      } else {
        subtitleText = `Visualisasi <strong>Stacking Bar YoY (Nilai Absolut)</strong>: Volume Fisik Produksi Terkonversi per Komoditas (${this.startYear} - ${this.endYear}) dalam satuan <strong>Kilogram (Kg)</strong>.`;
      }

      legendHtml = `
        <div class="flex items-center gap-2 text-[10px] flex-wrap justify-end">
          ${breakdownItems.map((b, idx) => `
            <span class="inline-flex items-center gap-1">
              <span class="w-2.5 h-2.5 rounded-xs" style="background-color: ${colors[idx % colors.length]};"></span>
              <span>${b.commodity_name.split('(')[0].trim()}</span>
            </span>
          `).join('')}
        </div>
      `;
    } else {
      // Single Commodity Mode
      if (this.activeChartMode === 'VOLUME_KG') {
        subtitleText = `Perbandingan volume fisik (${this.startYear} - ${this.endYear}) dalam satuan <strong>Kilogram (Kg)</strong>: Produksi, Konsumsi, Impor, dan Ekspor.`;
        legendHtml = `
          <div class="flex items-center gap-2.5 text-[10.5px]">
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-emerald-600"></span> Produksi (Kg)</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-rose-600"></span> Konsumsi (Kg)</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-amber-500"></span> Impor (Kg)</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-sky-600"></span> Ekspor (Kg)</span>
          </div>
        `;
      } else if (this.activeChartMode === 'EKSPOR_USD') {
        subtitleText = `Nilai Perdagangan Internasional (${this.startYear} - ${this.endYear}): Ekspor vs Impor dalam satuan <strong>Juta USD ($M)</strong>.`;
        legendHtml = `
          <div class="flex items-center gap-2.5 text-[10.5px]">
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-sky-600"></span> Nilai Ekspor ($M)</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-amber-600"></span> Nilai Impor ($M)</span>
          </div>
        `;
      } else if (this.activeChartMode === 'VOLUME_STANDARD') {
        subtitleText = `Perbandingan volume fisik (${this.startYear} - ${this.endYear}) dalam satuan <strong>${comm.unit}</strong>: Produksi, Konsumsi, Impor, dan Ekspor.`;
        legendHtml = `
          <div class="flex items-center gap-2.5 text-[10.5px]">
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-emerald-600"></span> Produksi</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-rose-600"></span> Konsumsi</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-amber-500"></span> Impor</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-sky-600"></span> Ekspor</span>
          </div>
        `;
      } else {
        // APBN_RUPIAH
        subtitleText = `Perbandingan Keuangan Terhubung APBN: <strong>🎯 Target Pagu UU APBN</strong> vs <strong>🏛️ Realisasi LKPP Audited BPK RI</strong> untuk <strong>${records[0]?.apbn_item_name || comm.apbn_classification}</strong> (Satuan: <strong>Rp Miliar</strong>).`;
        legendHtml = `
          <div class="flex items-center gap-2.5 text-[10.5px]">
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-purple-600"></span> 🎯 Target UU APBN (Rp M)</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-indigo-700"></span> 🏛️ Realisasi LKPP Audited (Rp M)</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-sky-600"></span> Nilai Ekspor ($M)</span>
            <span class="inline-flex items-center gap-1"><span class="${this.activeChartType === 'bar' ? 'w-2.5 h-2.5 rounded-xs' : 'w-3 h-1 rounded-full'} bg-amber-600"></span> Nilai Impor ($M)</span>
          </div>
        `;
      }
    }

    return `
      <!-- Chart Subtitle & Legend Bar -->
      <div class="flex items-center justify-between text-[11px] font-mono flex-wrap gap-2">
        <div class="text-[10.5px] text-slate-600 font-sans max-w-2xl">
          ${subtitleText}
        </div>

        <div class="text-right">
          ${legendHtml}
        </div>
      </div>

      <div class="relative w-full h-[320px]">
        <canvas id="commodity-balance-chart"></canvas>
      </div>
    `;
  }

  renderTableCard(comm, records, isAggregate = false) {
    const isKg = this.activeChartMode === 'VOLUME_KG';
    const unitLabel = isKg ? 'Kg' : comm.unit;

    return `
      <!-- 7. FULL DATA TABLE: ANNUAL COMMODITY BALANCE SHEET (2000 - 2025) -->
      <div class="bg-white rounded-lg border border-slate-300 shadow-2xs overflow-hidden">
        <div class="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <span class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
            <span>📑</span>
            <span>Tabel Neraca & Realisasi Anggaran APBN (2000 - 2025): ${comm.name}</span>
          </span>
          <div class="flex items-center gap-3">
            <span class="text-[10.5px] text-slate-600 font-mono font-bold">
              Pos LKPP: ${comm.lkpp_account_code}
            </span>
            <button 
              id="btn-export-commodity-excel" 
              class="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded text-[10.5px] font-bold font-mono flex items-center gap-1 shadow-2xs cursor-pointer transition-all"
              title="Unduh data neraca komoditas dalam format Excel (.csv)"
            >
              <span>📥</span>
              <span>Unduh Excel</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto max-h-[480px]">
          <table class="w-full text-left border-collapse text-[11px] font-mono">
            <thead class="sticky top-0 z-10 shadow-2xs">
              <tr class="bg-slate-100 border-b border-slate-200 text-slate-700">
                <th class="py-2 px-3">Tahun</th>
                <th class="py-2 px-3 text-left">Dasar UU APBN</th>
                <th class="py-2 px-3 text-right text-purple-950 font-bold bg-purple-50/50">Target APBN (Rp M)</th>
                <th class="py-2 px-3 text-right text-indigo-950 font-bold bg-indigo-50/50">Realisasi APBN (Rp M)</th>
                <th class="py-2 px-3 text-center">Daya Serap (%)</th>
                <th class="py-2 px-3 text-right">Nilai Ekspor ($M)</th>
                <th class="py-2 px-3 text-right">Nilai Impor ($M)</th>
                <th class="py-2 px-3 text-right">Surplus/Defisit</th>
                ${!isAggregate ? `
                  <th class="py-2 px-3 text-right">Produksi (${unitLabel})</th>
                  <th class="py-2 px-3 text-right">Konsumsi (${unitLabel})</th>
                  <th class="py-2 px-3 text-center">SSR (%)</th>
                  <th class="py-2 px-3 text-center">IDR (%)</th>
                ` : `
                  <th class="py-2 px-3 text-center">Jml Komoditas</th>
                `}
                <th class="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${records.map(r => {
                const prodVal = isKg ? (r.production_kg || r.production * 1000000) : r.production;
                const consVal = isKg ? (r.consumption_kg || r.consumption * 1000000) : r.consumption;

                return `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-2 px-3 font-bold text-slate-950">${r.period}</td>
                    <td class="py-2 px-3 text-slate-700 text-[10px] max-w-[190px] truncate" title="${r.apbn_statute_law || ''}">
                      ${r.apbn_statute_law || 'UU APBN'}
                    </td>
                    <td class="py-2 px-3 text-right font-bold text-purple-900 bg-purple-50/50">
                      Rp ${Number(r.apbn_target_idr_billion || 0).toLocaleString('id-ID')} M
                    </td>
                    <td class="py-2 px-3 text-right font-bold text-indigo-900 bg-indigo-50/50">
                      Rp ${Number(r.apbn_realization_idr_billion || 0).toLocaleString('id-ID')} M
                    </td>
                    <td class="py-2 px-3 text-center font-bold">
                      <span class="px-1.5 py-0.5 rounded text-[10px] ${r.apbn_achievement_rate_percent >= 95 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : (r.apbn_achievement_rate_percent >= 80 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-800')}">
                        ${r.apbn_achievement_rate_percent || 0}%
                      </span>
                    </td>
                    <td class="py-2 px-3 text-right text-sky-800 font-semibold">$${Number(r.export_value_usd_million || 0).toLocaleString('id-ID')}M</td>
                    <td class="py-2 px-3 text-right text-amber-800">$${Number(r.import_value_usd_million || 0).toLocaleString('id-ID')}M</td>
                    <td class="py-2 px-3 text-right font-bold ${r.surplus_deficit >= 0 ? 'text-emerald-700' : 'text-rose-700'}">
                      ${r.surplus_deficit >= 0 ? '+' : ''}${isAggregate ? '$' + Number(r.surplus_deficit).toLocaleString('id-ID') + 'M' : Number(r.surplus_deficit).toLocaleString('id-ID')}
                    </td>
                    ${!isAggregate ? `
                      <td class="py-2 px-3 text-right font-semibold text-emerald-950">${Number(prodVal).toLocaleString('id-ID')}</td>
                      <td class="py-2 px-3 text-right text-slate-900">${Number(consVal).toLocaleString('id-ID')}</td>
                      <td class="py-2 px-3 text-center font-bold ${r.ssr_percent >= 100 ? 'text-emerald-700' : 'text-rose-700'}">${r.ssr_percent}%</td>
                      <td class="py-2 px-3 text-center ${r.idr_percent > 40 ? 'text-rose-700 font-bold' : 'text-slate-600'}">${r.idr_percent}%</td>
                    ` : `
                      <td class="py-2 px-3 text-center font-bold text-slate-700">${r.breakdown?.length || 0} Komoditas</td>
                    `}
                    <td class="py-2 px-3 text-center">
                      <span class="px-1.5 py-0.2 rounded text-[10px] font-bold ${r.status === 'SURPLUS' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'}">
                        ${r.status}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderMatrixView() {
    const list = this.matrixData || this.categoriesData.commodities;
    const yearsList = [];
    for (let y = 2025; y >= 2000; y--) {
      yearsList.push(String(y));
    }

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
              ${yearsList.map(y => `
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

    // 2. Commodity Dropdown Selection (Synchronizes Bab HS and Sub-Kelompok)
    const handleCommoditySelection = async (newId) => {
      this.selectedCommodityId = newId;
      
      // Auto-sync Bab HS and Group if selecting an individual commodity
      if (!newId.startsWith('ALL_') && this.categoriesData) {
        const selected = this.categoriesData.commodities.find(c => c.id === newId);
        if (selected) {
          this.activeHsChapter = selected.hs_chapter;
          this.activeGroup = selected.group;
        }
      } else {
        this.activeHsChapter = 'ALL';
        this.activeGroup = 'ALL';
      }

      await this.loadBalanceData(newId);
      this.render();
    };

    document.getElementById('select-active-commodity')?.addEventListener('change', (e) => {
      handleCommoditySelection(e.target.value);
    });

    document.getElementById('select-chart-commodity')?.addEventListener('change', (e) => {
      handleCommoditySelection(e.target.value);
    });

    // 3. Year Range Presets (2000-2025)
    document.getElementById('commodity-preset-5y')?.addEventListener('click', async () => {
      this.startYear = 2020;
      this.endYear = 2025;
      await this.loadBalanceData(this.selectedCommodityId);
      this.render();
    });

    document.getElementById('commodity-preset-10y')?.addEventListener('click', async () => {
      this.startYear = 2015;
      this.endYear = 2025;
      await this.loadBalanceData(this.selectedCommodityId);
      this.render();
    });

    document.getElementById('commodity-preset-all')?.addEventListener('click', async () => {
      this.startYear = 2000;
      this.endYear = 2025;
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

    // 5. Group Filter (Filters commodity options)
    const selectGroup = document.getElementById('select-filter-group');
    selectGroup?.addEventListener('change', async (e) => {
      this.activeGroup = e.target.value;
      
      // Auto select first commodity in group
      if (this.activeGroup !== 'ALL' && this.categoriesData) {
        const match = this.categoriesData.commodities.find(c => c.division === this.activeDivision && c.group === this.activeGroup);
        if (match) {
          this.selectedCommodityId = match.id;
          this.activeHsChapter = match.hs_chapter;
          await this.loadBalanceData(match.id);
        }
      }

      if (this.activeViewMode === 'MATRIX') {
        await this.loadMatrixData();
      }
      this.render();
    });

    // 6. HS Chapter Filter (Filters commodity options based on selected HS)
    const selectHs = document.getElementById('select-filter-hs');
    selectHs?.addEventListener('change', async (e) => {
      this.activeHsChapter = e.target.value;

      if (this.activeHsChapter !== 'ALL' && this.categoriesData) {
        const match = this.categoriesData.commodities.find(c => c.division === this.activeDivision && c.hs_chapter === this.activeHsChapter);
        if (match) {
          this.selectedCommodityId = match.id;
          this.activeGroup = match.group;
          await this.loadBalanceData(match.id);
        }
      } else {
        // Reset to aggregate
        this.selectedCommodityId = this.activeDivision === 'HASIL_BUMI' ? 'ALL_HASIL_BUMI' : 'ALL_PERTANIAN';
        await this.loadBalanceData(this.selectedCommodityId);
      }

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

    // 10. Chart Type Selector (Bar vs Line)
    this.container.querySelectorAll('.btn-chart-type').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.currentTarget.getAttribute('data-chart-type');
        this.activeChartType = type;
        this.render();
      });
    });

    // 11. Chart Mode / Unit Selector
    this.container.querySelectorAll('.btn-chart-mode').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-chart-mode');
        this.activeChartMode = mode;
        this.render();
      });
    });
  }

  renderChart(records, unit, isAggregate = false) {
    const canvas = document.getElementById('commodity-balance-chart');
    if (!canvas) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }

    const labels = records.map(r => r.period);
    const isKg = this.activeChartMode === 'VOLUME_KG';
    const isEkspor = this.activeChartMode === 'EKSPOR_USD';
    const isStandard = this.activeChartMode === 'VOLUME_STANDARD';
    const isApbn = this.activeChartMode === 'APBN_RUPIAH';
    const isLine = this.activeChartType === 'line';

    const unitText = isKg ? 'Kg' : (isEkspor ? '$M USD' : (isApbn ? 'Rp Miliar' : unit));

    // Palette for stacking bar
    const stackColors = [
      '#334155', '#0284c7', '#d97706', '#e11d48', '#059669', 
      '#854d0e', '#0891b2', '#7c3aed', '#4f46e5', '#16a34a', '#dc2626'
    ];

    if (window.Chart) {
      let datasets = [];

      if (isAggregate) {
        // ====================================================================
        // STACKED BAR CHART MODE FOR ALL COMMODITIES (NON-100% / ABSOLUTE VALUE)
        // ====================================================================
        const breakdownItems = records[0]?.breakdown || [];

        datasets = breakdownItems.map((commItem, idx) => {
          const color = stackColors[idx % stackColors.length];
          let itemData = [];

          if (isApbn) {
            itemData = records.map(r => {
              const b = r.breakdown?.find(x => x.commodity_id === commItem.commodity_id);
              return b ? b.apbn_realization_idr_billion : 0;
            });
          } else if (isEkspor) {
            itemData = records.map(r => {
              const b = r.breakdown?.find(x => x.commodity_id === commItem.commodity_id);
              return b ? b.export_value_usd_million : 0;
            });
          } else {
            // Volume in Kg
            itemData = records.map(r => {
              const b = r.breakdown?.find(x => x.commodity_id === commItem.commodity_id);
              return b ? b.production_kg : 0;
            });
          }

          if (isLine) {
            return {
              label: commItem.commodity_name.split('(')[0].trim(),
              data: itemData,
              borderColor: color,
              backgroundColor: 'transparent',
              borderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 5,
              tension: 0.25,
              fill: false
            };
          } else {
            return {
              label: commItem.commodity_name.split('(')[0].trim(),
              data: itemData,
              backgroundColor: color,
              borderColor: color,
              borderWidth: 0.5,
              stack: 'all_commodities_stack'
            };
          }
        });

      } else {
        // ====================================================================
        // SINGLE COMMODITY TIME-SERIES MODE
        // ====================================================================
        if (isKg || isStandard) {
          const prodData = records.map(r => isKg ? (r.production_kg || r.production * 1000000) : r.production);
          const consData = records.map(r => isKg ? (r.consumption_kg || r.consumption * 1000000) : r.consumption);
          const impData = records.map(r => isKg ? (r.import_volume_kg || r.import_volume * 1000000) : r.import_volume);
          const expData = records.map(r => isKg ? (r.export_volume_kg || r.export_volume * 1000000) : r.export_volume);

          if (isLine) {
            datasets = [
              {
                label: `Produksi Domestik (${unitText})`,
                data: prodData,
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.25,
                fill: false
              },
              {
                label: `Konsumsi Domestik (${unitText})`,
                data: consData,
                borderColor: 'rgb(225, 29, 72)',
                backgroundColor: 'rgba(225, 29, 72, 0.08)',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.25,
                fill: false
              },
              {
                label: `Volume Impor (${unitText})`,
                data: impData,
                borderColor: 'rgb(245, 158, 11)',
                backgroundColor: 'transparent',
                borderDash: [4, 3],
                borderWidth: 1.8,
                pointRadius: 3,
                tension: 0.25,
                fill: false
              },
              {
                label: `Volume Ekspor (${unitText})`,
                data: expData,
                borderColor: 'rgb(2, 132, 199)',
                backgroundColor: 'transparent',
                borderWidth: 1.8,
                pointRadius: 3,
                tension: 0.25,
                fill: false
              }
            ];
          } else {
            datasets = [
              {
                label: `Produksi Domestik (${unitText})`,
                data: prodData,
                backgroundColor: 'rgba(16, 185, 129, 0.85)',
                borderColor: 'rgb(16, 185, 129)',
                borderWidth: 0.5,
                borderRadius: 1
              },
              {
                label: `Konsumsi Domestik (${unitText})`,
                data: consData,
                backgroundColor: 'rgba(225, 29, 72, 0.85)',
                borderColor: 'rgb(225, 29, 72)',
                borderWidth: 0.5,
                borderRadius: 1
              },
              {
                label: `Volume Impor (${unitText})`,
                data: impData,
                backgroundColor: 'rgba(245, 158, 11, 0.85)',
                borderColor: 'rgb(245, 158, 11)',
                borderWidth: 0.5,
                borderRadius: 1
              },
              {
                label: `Volume Ekspor (${unitText})`,
                data: expData,
                backgroundColor: 'rgba(2, 132, 199, 0.85)',
                borderColor: 'rgb(2, 132, 199)',
                borderWidth: 0.5,
                borderRadius: 1
              }
            ];
          }
        } else if (isEkspor) {
          const expValData = records.map(r => r.export_value_usd_million || 0);
          const impValData = records.map(r => r.import_value_usd_million || 0);

          if (isLine) {
            datasets = [
              {
                label: `Nilai Ekspor ($M USD)`,
                data: expValData,
                borderColor: 'rgb(2, 132, 199)',
                borderWidth: 2,
                pointRadius: 3.5,
                tension: 0.2,
                fill: false
              },
              {
                label: `Nilai Impor ($M USD)`,
                data: impValData,
                borderColor: 'rgb(217, 119, 6)',
                borderDash: [4, 3],
                borderWidth: 2,
                pointRadius: 3.5,
                tension: 0.2,
                fill: false
              }
            ];
          } else {
            datasets = [
              {
                label: `Nilai Ekspor ($M USD)`,
                data: expValData,
                backgroundColor: 'rgba(2, 132, 199, 0.85)',
                borderColor: 'rgb(2, 132, 199)',
                borderWidth: 0.5,
                borderRadius: 1
              },
              {
                label: `Nilai Impor ($M USD)`,
                data: impValData,
                backgroundColor: 'rgba(217, 119, 6, 0.85)',
                borderColor: 'rgb(217, 119, 6)',
                borderWidth: 0.5,
                borderRadius: 1
              }
            ];
          }
        } else {
          // APBN RUPIAH: TARGET (UU APBN) VS REALISASI (LKPP AUDITED)
          const targetData = records.map(r => r.apbn_target_idr_billion || 0);
          const realData = records.map(r => r.apbn_realization_idr_billion || 0);
          const expValData = records.map(r => r.export_value_usd_million || 0);

          if (isLine) {
            datasets = [
              {
                label: `🎯 Target Pagu UU APBN (Rp Miliar)`,
                data: targetData,
                borderColor: 'rgb(147, 51, 234)',
                borderDash: [5, 3],
                borderWidth: 2,
                pointRadius: 3.5,
                tension: 0.2,
                fill: false
              },
              {
                label: `🏛️ Realisasi LKPP Audited (Rp Miliar)`,
                data: realData,
                borderColor: 'rgb(67, 56, 202)',
                borderWidth: 2.5,
                pointRadius: 4,
                tension: 0.2,
                fill: false
              },
              {
                label: `🚢 Nilai Ekspor ($M USD)`,
                data: expValData,
                borderColor: 'rgb(2, 132, 199)',
                borderWidth: 1.8,
                pointRadius: 3,
                tension: 0.25,
                fill: false
              }
            ];
          } else {
            datasets = [
              {
                label: `🎯 Target Pagu UU APBN (Rp Miliar)`,
                data: targetData,
                backgroundColor: 'rgba(147, 51, 234, 0.75)',
                borderColor: 'rgb(126, 34, 206)',
                borderWidth: 0.5,
                borderRadius: 1
              },
              {
                label: `🏛️ Realisasi LKPP Audited (Rp Miliar)`,
                data: realData,
                backgroundColor: 'rgba(67, 56, 202, 0.9)',
                borderColor: 'rgb(55, 48, 163)',
                borderWidth: 0.5,
                borderRadius: 1
              },
              {
                label: `🚢 Nilai Ekspor ($M USD)`,
                data: expValData,
                backgroundColor: 'rgba(2, 132, 199, 0.85)',
                borderColor: 'rgb(2, 132, 199)',
                borderWidth: 0.5,
                borderRadius: 1
              }
            ];
          }
        }
      }

      this.chartInstance = new window.Chart(canvas.getContext('2d'), {
        type: isLine ? 'line' : 'bar',
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
                title: function(ctx) {
                  const idx = ctx[0].dataIndex;
                  const r = records[idx];
                  if (isAggregate) {
                    const tot = isApbn 
                      ? `Rp ${Number(r.apbn_realization_idr_billion || 0).toLocaleString('id-ID')} M`
                      : (isEkspor ? `$${Number(r.export_value_usd_million || 0).toLocaleString('id-ID')}M` : `${Number(r.production_kg || 0).toLocaleString('id-ID')} Kg`);
                    return `Tahun ${r.period} (Total YoY: ${tot})`;
                  }
                  if (isApbn && r) {
                    return `Tahun ${r.period} [${r.apbn_statute_law || ''}]`;
                  }
                  return `Tahun ${ctx[0].label}`;
                },
                label: function(ctx) {
                  const val = ctx.raw !== null ? Number(ctx.raw).toLocaleString('id-ID') : '0';
                  const prefix = isApbn ? 'Rp ' : (isEkspor ? '$' : '');
                  const suffix = isApbn ? ' M' : (isEkspor ? 'M' : (isKg ? ' Kg' : ''));
                  return ` ${ctx.dataset.label}: ${prefix}${val}${suffix}`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: isAggregate && !isLine,
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: { 
                font: { family: 'monospace', size: 9 },
                maxRotation: 45,
                minRotation: 0
              }
            },
            y: {
              stacked: isAggregate && !isLine,
              grid: { color: 'rgba(226, 232, 240, 0.6)' },
              ticks: {
                font: { family: 'monospace', size: 9 },
                callback: function(v) { return Number(v).toLocaleString('id-ID'); }
              }
            }
          }
        }
      });
    } else {
      // Direct Canvas 2D Fallback Chart
      this.drawCanvasFallback(canvas, records, unit, isAggregate);
    }
  }

  drawCanvasFallback(canvas, records, unit, isAggregate = false) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio || 800;
    canvas.height = rect.height * window.devicePixelRatio || 320;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const w = rect.width || 800;
    const h = rect.height || 320;
    const padding = { top: 25, right: 20, bottom: 35, left: 65 };

    ctx.clearRect(0, 0, w, h);

    const isKg = this.activeChartMode === 'VOLUME_KG';
    const isEkspor = this.activeChartMode === 'EKSPOR_USD';
    const isApbn = this.activeChartMode === 'APBN_RUPIAH';
    const isLine = this.activeChartType === 'line';

    const plotW = w - padding.left - padding.right;
    const plotH = h - padding.top - padding.bottom;

    if (isAggregate && !isLine) {
      const stackColors = ['#334155', '#0284c7', '#d97706', '#e11d48', '#059669', '#854d0e', '#0891b2', '#7c3aed'];
      let maxVal = 100;
      
      records.forEach(r => {
        const tot = isApbn ? r.apbn_realization_idr_billion : (isEkspor ? r.export_value_usd_million : r.production_kg);
        if (tot > maxVal) maxVal = tot;
      });
      maxVal = Math.ceil(maxVal * 1.15);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.font = '9px monospace';
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

      const barW = Math.max(6, (plotW / records.length) * 0.65);
      const groupW = plotW / records.length;

      records.forEach((r, idx) => {
        const x = padding.left + idx * groupW + (groupW - barW) / 2;
        let currentY = padding.top + plotH;

        r.breakdown?.forEach((b, bIdx) => {
          const val = isApbn ? b.apbn_realization_idr_billion : (isEkspor ? b.export_value_usd_million : b.production_kg);
          const segH = (val / maxVal) * plotH;
          currentY -= segH;

          ctx.fillStyle = stackColors[bIdx % stackColors.length];
          ctx.fillRect(x, currentY, barW, segH);
        });

        if (idx % 2 === 0 || records.length <= 15) {
          ctx.fillStyle = '#0f172a';
          ctx.font = '8.5px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(r.period, x + barW / 2, h - 10);
        }
      });

    } else {
      const seriesKeys = isApbn
        ? [
            { key: 'apbn_target_idr_billion', label: 'Target UU', color: '#8b5cf6' },
            { key: 'apbn_realization_idr_billion', label: 'Realisasi LKPP', color: '#4338ca' },
            { key: 'export_value_usd_million', label: 'Ekspor ($M)', color: '#0284c7' }
          ]
        : [
            { key: isKg ? 'production_kg' : 'production', label: 'Produksi', color: '#10b981' },
            { key: isKg ? 'consumption_kg' : 'consumption', label: 'Konsumsi', color: '#e11d48' },
            { key: isKg ? 'import_volume_kg' : 'import_volume', label: 'Impor', color: '#f59e0b' },
            { key: isKg ? 'export_volume_kg' : 'export_volume', label: 'Ekspor', color: '#0284c7' }
          ];

      let maxVal = 100;
      records.forEach(r => {
        seriesKeys.forEach(s => {
          const val = Number(r[s.key] || 0);
          if (val > maxVal) maxVal = val;
        });
      });
      maxVal = Math.ceil(maxVal * 1.15);

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.font = '9px monospace';
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

      const groupW = plotW / records.length;
      const barW = Math.max(2.5, (groupW * 0.75) / seriesKeys.length);

      records.forEach((r, idx) => {
        const groupX = padding.left + idx * groupW + (groupW * 0.12);

        seriesKeys.forEach((s, sIdx) => {
          const val = Number(r[s.key] || 0);
          const barH = (val / maxVal) * plotH;
          const x = groupX + sIdx * barW;
          const y = padding.top + plotH - barH;

          ctx.fillStyle = s.color;
          ctx.fillRect(x, y, barW - 0.5, barH);
        });

        if (idx % 2 === 0 || records.length <= 15) {
          ctx.fillStyle = '#0f172a';
          ctx.font = '8.5px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(r.period, groupX + (seriesKeys.length * barW) / 2, h - 10);
        }
      });
    }
  }

  async handleExportExcel() {
    try {
      if (!this.balanceData) return;
      const comm = this.balanceData.commodity;
      const records = this.balanceData.records;

      const user = JSON.parse(localStorage.getItem('den_researcher_user') || 'null');
      if (!user) {
        if (window.openEmailRegistrationModal) {
          window.openEmailRegistrationModal('Verifikasi Email Peneliti diperlukan sebelum mengunduh Neraca Komoditas.');
        } else {
          alert('Silakan daftarkan email peneliti terlebih dahulu di menu registrasi.');
        }
        return;
      }

      const quotaCheck = ExcelExporter.checkAndConsumeDownloadQuota(user.email);
      if (!quotaCheck.allowed) {
        ExcelExporter.showQuotaExceededModal(quotaCheck);
        return;
      }

      const isKg = this.activeChartMode === 'VOLUME_KG';
      const unitLabel = isKg ? 'Kg' : comm.unit;

      const rows = [
        ['PUSAT BASIS DATA DATA SEKUNDER: PERGERAKAN EKONOMI INDONESIA'],
        ['NERACA KOMODITAS, PANGAN & HASIL BUMI NASIONAL (2000 - 2025)'],
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
        ['TAHUN', 'DASAR UU APBN (TARGET)', 'TARGET APBN (RP MILIAR)', 'REALISASI LKPP (RP MILIAR)', 'DAYA SERAP (%)', `PRODUKSI (${unitLabel})`, `KONSUMSI (${unitLabel})`, `VOLUME IMPOR (${unitLabel})`, 'NILAI IMPOR ($M)', `VOLUME EKSPOR (${unitLabel})`, 'NILAI EKSPOR ($M)', 'SURPLUS / DEFISIT', 'RASIO SWASEMBADA (SSR %)', 'RASIO IMPOR (IDR %)', 'STATUS']
      ];

      records.forEach(r => {
        const prodVal = isKg ? (r.production_kg || r.production * 1000000) : r.production;
        const consVal = isKg ? (r.consumption_kg || r.consumption * 1000000) : r.consumption;
        const impVal = isKg ? (r.import_volume_kg || r.import_volume * 1000000) : r.import_volume;
        const expVal = isKg ? (r.export_volume_kg || r.export_volume * 1000000) : r.export_volume;
        const surplusVal = isKg ? (prodVal - consVal) : r.surplus_deficit;

        rows.push([
          r.period,
          r.apbn_statute_law || 'UU APBN',
          r.apbn_target_idr_billion || 0,
          r.apbn_realization_idr_billion || 0,
          `${r.apbn_achievement_rate_percent || 0}%`,
          prodVal,
          consVal,
          impVal,
          r.import_value_usd_million || 0,
          expVal,
          r.export_value_usd_million || 0,
          surplusVal,
          r.ssr_percent,
          r.idr_percent,
          r.status
        ]);
      });

      const cleanName = comm.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      ExcelExporter.downloadCSV(`neraca_komoditas_${cleanName}_${this.startYear}_${this.endYear}.csv`, rows);
    } catch (err) {
      console.error('Error exporting commodity balance Excel:', err);
      alert('Gagal mengekspor data Excel neraca komoditas.');
    }
  }
}
