// ==============================================================================
// FISCAL HEALTH DASHBOARD COMPONENT (1990 – 2026 YTD)
// 1. 10 Core KPIs (2x5 Box Grid with YoY, MoM & Economic Impact Notes)
// 2. Multi-Variable Comparison Chart (Max 3 Variables, Bar/Line, Min 12 Years)
// 3. Detail KPI 7 Statutory Fiscal Health Dimensions (Hover Provenance 1990-2026)
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

export class FiscalHealthView {
  constructor(containerId) {
    this.containerId = containerId;
    this.kpis = [];
    this.dimensions = [];
    this.availableVariables = [];
    this.activeDimensionId = 'REVENUE_CAPACITY';

    // Comparison Chart State
    this.selectedVar1 = 'fiscal_balance_gdp';
    this.chartType1 = 'line';
    this.selectedVar2 = 'debt_gdp';
    this.chartType2 = 'line';
    this.selectedVar3 = 'tax_ratio';
    this.chartType3 = 'bar';
    this.startYear = 2014;
    this.endYear = 2026;

    this.chartInstance = null;
    this.dimensionCharts = {};
    this.isLoading = false;
  }

  async init() {
    this.isLoading = true;
    this.renderLoading();

    try {
      const [kpiRes, dimRes, varsRes] = await Promise.all([
        ApiClient.fetchFiscalHealthKPIs(),
        ApiClient.fetchFiscalHealthDimensions(1990, 2026),
        ApiClient.fetchFiscalHealthComparisonVariables()
      ]);

      this.kpis = kpiRes.kpis || [];
      this.dimensions = dimRes.dimensions || [];
      this.availableVariables = varsRes.variables || [];
    } catch (err) {
      this.renderError(err.message);
      this.isLoading = false;
      return;
    }

    this.isLoading = false;
    this.render();
  }

  renderLoading() {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="gov-card p-12 text-center space-y-3">
        <div class="inline-block w-8 h-8 border-3 border-[#0038A8] border-t-transparent rounded-full animate-spin"></div>
        <div class="text-xs font-mono font-medium text-slate-600">
          Mengompilasi Indikator Kesehatan Fiskal Nasional (10 Core KPI & 7 Dimensi 1990–2026)...
        </div>
      </div>
    `;
  }

  renderError(msg) {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="gov-card p-8 text-center bg-rose-50 border border-rose-200 text-rose-800 space-y-3 font-mono text-xs">
        <div class="text-2xl">⚠️</div>
        <div class="font-bold text-sm">Gagal Memuat Fiscal Health Dashboard</div>
        <p>${msg}</p>
        <button id="btn-fiscal-retry" class="gov-btn px-4 py-1.5 bg-rose-600 text-white hover:bg-rose-700 font-sans cursor-pointer">
          Coba Lagi
        </button>
      </div>
    `;
    document.getElementById('btn-fiscal-retry')?.addEventListener('click', () => this.init());
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-6 font-sans">
        
        <!-- HEADER EXECUTIVE BANNER -->
        <div class="bg-gradient-to-r from-[#0038A8] via-[#0B2545] to-[#134074] text-white rounded-xl p-5 sm:p-6 shadow-xs relative overflow-hidden space-y-2">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[11px] font-mono font-semibold tracking-wider text-amber-300">
              <span>🩺</span>
              <span>FISCAL HEALTH OBSERVATORY & SOVEREIGN BUDGET DIAGNOSTIC</span>
            </div>
            <div class="text-[11px] font-mono text-slate-200 bg-white/10 px-2.5 py-0.5 rounded">
              Posisi Terakhir: <strong>APBN 2026 YTD</strong> (Kompilasi LRA & Neraca 1990–2026)
            </div>
          </div>
          <h2 class="text-xl sm:text-2xl font-serif font-black tracking-tight text-white">
            Dasbor Kesehatan Fiskal & Keberlanjutan Anggaran Negara
          </h2>
          <p class="text-xs sm:text-sm text-slate-200 font-sans max-w-4xl leading-relaxed">
            Menganalisis daya tahan fiskal pemerintah Indonesia melalui 10 Indikator Kunci (Core KPI), matriks komparasi variabel kustom dengan rentang waktu fleksibel (min. 12 tahun), serta 7 dimensi terperinci mencakup kapasitas penerimaan, kualitas belanja, kesinambungan utang, likuiditas BUN, hingga kemandirian fiskal daerah.
          </p>
        </div>

        <!-- 1. 10 CORE FISCAL KPIS (BOX VERTICAL 2X5 GRID) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between pb-1 border-b border-slate-200">
            <div>
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#0038A8] flex items-center gap-1.5">
                <span>🎯</span>
                <span>10 CORE FISCAL KPI (RINGKASAN EKSEKUTIF 2026 YTD)</span>
              </div>
              <p class="text-[11px] text-slate-500 font-sans">
                Tersusun dalam formasi 2 kolom × 5 baris dengan kalkulasi YoY, MoM, dan catatan makna dampak bagi perekonomian Indonesia.
              </p>
            </div>
            <span class="text-[10px] font-mono bg-blue-50 text-[#0038A8] border border-blue-200 px-2 py-0.5 rounded font-bold">
              10 Indikator Pokok
            </span>
          </div>

          <!-- 2x5 Grid Cards -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
            ${this.kpis.map(k => this.renderCoreKPICard(k)).join('')}
          </div>
        </div>

        <!-- 2. MULTI-VARIABLE COMPARISON CHART (MAX 3 VARIABLES, BAR/LINE, MIN 12 YEARS) -->
        <div class="gov-card p-5 bg-white border border-[#DADCE0] shadow-2xs space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200">
            <div>
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#0038A8] flex items-center gap-1.5">
                <span>📈</span>
                <span>STUDIO KOMPARASI MULTI-VARIABEL FISKAL (MAKS. 3 VARIABEL)</span>
              </div>
              <p class="text-[11px] text-slate-500 font-sans">
                Kombinasikan grafik batang (bar) dan garis (line) lintas indikator fiskal dengan rentang waktu kustom (minimal 12 tahun).
              </p>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
              <span>⏱️ Rentang Waktu: <strong id="lbl-timeline-span">${this.endYear - this.startYear + 1} Tahun</strong> (Min. 12 Tahun)</span>
            </div>
          </div>

          <!-- Controls Bar -->
          <div class="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-3 font-mono text-xs">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              <!-- Variable 1 -->
              <div class="space-y-1.5 p-2.5 bg-white rounded border border-blue-200 shadow-2xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-[#0038A8] flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#0038A8] inline-block"></span>
                    <span>Variabel 1 (Sumbu Utama)</span>
                  </span>
                  <select id="sel-chart-type-1" class="text-[11px] px-1.5 py-0.5 rounded border border-slate-300 bg-white font-sans">
                    <option value="line" ${this.chartType1 === 'line' ? 'selected' : ''}>Line (Garis)</option>
                    <option value="bar" ${this.chartType1 === 'bar' ? 'selected' : ''}>Bar (Batang)</option>
                  </select>
                </div>
                <select id="sel-compare-var-1" class="w-full text-xs px-2 py-1.5 rounded border border-slate-300 bg-white font-sans">
                  ${this.renderVariableOptions(this.selectedVar1)}
                </select>
              </div>

              <!-- Variable 2 -->
              <div class="space-y-1.5 p-2.5 bg-white rounded border border-emerald-200 shadow-2xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-emerald-800 flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                    <span>Variabel 2</span>
                  </span>
                  <select id="sel-chart-type-2" class="text-[11px] px-1.5 py-0.5 rounded border border-slate-300 bg-white font-sans">
                    <option value="line" ${this.chartType2 === 'line' ? 'selected' : ''}>Line (Garis)</option>
                    <option value="bar" ${this.chartType2 === 'bar' ? 'selected' : ''}>Bar (Batang)</option>
                  </select>
                </div>
                <select id="sel-compare-var-2" class="w-full text-xs px-2 py-1.5 rounded border border-slate-300 bg-white font-sans">
                  <option value="">(Tidak Ada / Non-aktif)</option>
                  ${this.renderVariableOptions(this.selectedVar2)}
                </select>
              </div>

              <!-- Variable 3 -->
              <div class="space-y-1.5 p-2.5 bg-white rounded border border-amber-200 shadow-2xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-amber-800 flex items-center gap-1">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span>Variabel 3</span>
                  </span>
                  <select id="sel-chart-type-3" class="text-[11px] px-1.5 py-0.5 rounded border border-slate-300 bg-white font-sans">
                    <option value="bar" ${this.chartType3 === 'bar' ? 'selected' : ''}>Bar (Batang)</option>
                    <option value="line" ${this.chartType3 === 'line' ? 'selected' : ''}>Line (Garis)</option>
                  </select>
                </div>
                <select id="sel-compare-var-3" class="w-full text-xs px-2 py-1.5 rounded border border-slate-300 bg-white font-sans">
                  <option value="">(Tidak Ada / Non-aktif)</option>
                  ${this.renderVariableOptions(this.selectedVar3)}
                </select>
              </div>

            </div>

            <!-- Timeline Range Selector (Min 12 Years Rule) -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-bold text-slate-700">Pilih Rentang Waktu:</span>
                <select id="sel-timeline-start" class="px-2 py-1 rounded border border-slate-300 bg-white text-xs">
                  ${this.renderYearOptions(1990, 2015, this.startYear)}
                </select>
                <span class="text-slate-500 font-bold">s/d</span>
                <select id="sel-timeline-end" class="px-2 py-1 rounded border border-slate-300 bg-white text-xs">
                  ${this.renderYearOptions(2002, 2026, this.endYear)}
                </select>
                <span id="timeline-validation-msg" class="text-[10.5px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded hidden">
                  ⚠️ Minimal rentang waktu adalah 12 tahun.
                </span>
              </div>

              <!-- Presets -->
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-slate-500 text-[11px]">Preset:</span>
                <button type="button" class="btn-timeline-preset px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 text-[10.5px] font-semibold cursor-pointer" data-start="2015" data-end="2026">
                  12 Thn Terakhir (2015–2026)
                </button>
                <button type="button" class="btn-timeline-preset px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 text-[10.5px] font-semibold cursor-pointer" data-start="2007" data-end="2026">
                  20 Thn (2007–2026)
                </button>
                <button type="button" class="btn-timeline-preset px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 text-[10.5px] font-semibold cursor-pointer" data-start="1998" data-end="2026">
                  Reformasi (1998–2026)
                </button>
                <button type="button" class="btn-timeline-preset px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 text-[10.5px] font-semibold cursor-pointer" data-start="1990" data-end="2026">
                  Semua (1990–2026)
                </button>
              </div>
            </div>

          </div>

          <!-- Chart Canvas Container -->
          <div class="relative bg-white rounded-lg p-2 border border-slate-100 min-h-[360px] flex items-center justify-center">
            <canvas id="canvas-fiscal-comparison" height="110"></canvas>
          </div>
          
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
            <span>💡 <strong>Tip Sumbu Ganda:</strong> Variabel rasio (%) akan diplot pada sumbu kiri (Y), sedangkan variabel nominal rupiah (Rp T) pada sumbu kanan (Y1).</span>
            <span>Arahkan kursor pada batang/titik garis untuk melihat rincian sumber.</span>
          </div>
        </div>

        <!-- 3. DETAIL KPI FISCAL HEALTH DASHBOARD (7 STATUTORY DIMENSIONS) -->
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1 border-b border-slate-200">
            <div>
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#0038A8] flex items-center gap-1.5">
                <span>📊</span>
                <span>DETAIL KPI FISCAL HEALTH DASHBOARD (7 DIMENSI 1990 – 2026 YTD)</span>
              </div>
              <p class="text-[11px] text-slate-500 font-sans">
                Hitungan deret waktu 37 tahun historis. Saat kursor diarahkan ke titik angka grafik (hover), sistem akan memunculkan rincian komponen sumber angka perhitungannya.
              </p>
            </div>
            <span class="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded font-bold">
              Provenance Data Terverifikasi
            </span>
          </div>

          <!-- Dimension Pills Navigation -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-thin">
            ${this.dimensions.map((dim, idx) => `
              <button 
                type="button" 
                class="btn-dimension-tab px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${dim.id === this.activeDimensionId ? 'bg-[#0038A8] border-[#0038A8] text-white shadow-xs' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}"
                data-dim-id="${dim.id}"
              >
                <span>${['📈', '⚖️', '🚀', '🏗️', '🛡️', '💧', '🏛️'][idx] || '📊'}</span>
                <span>${dim.name}</span>
                <span class="text-[10px] opacity-75">(${dim.metrics.length})</span>
              </button>
            `).join('')}
          </div>

          <!-- Active Dimension Content Container -->
          <div id="dimension-detail-container" class="space-y-4">
            ${this.renderActiveDimensionDetail()}
          </div>
        </div>

      </div>
    `;

    this.attachEvents();
    this.renderComparisonChart();
    this.renderDimensionSparklines();
  }

  // Render individual 10 Core KPI Card
  renderCoreKPICard(k) {
    const isEmerald = k.status_color === 'emerald';
    const isAmber = k.status_color === 'amber';
    const badgeColorClass = isEmerald ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : isAmber ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-blue-50 text-[#0038A8] border-blue-200';

    return `
      <div class="gov-card p-4 bg-white border border-[#DADCE0] hover:border-[#0038A8] shadow-2xs space-y-3 transition-all rounded-xl">
        <!-- Top Row -->
        <div class="flex items-start justify-between gap-2">
          <div class="space-y-0.5">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="w-5 h-5 rounded-full bg-[#0038A8] text-white flex items-center justify-center font-mono text-[11px] font-bold">
                ${k.index}
              </span>
              <span class="font-mono font-bold text-sm text-[#202124]">${k.name}</span>
              <span class="text-[10.5px] font-mono text-slate-500 italic">(${k.guiding_question})</span>
            </div>
            <div class="text-[10.5px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded inline-block">
              Rumus: <strong>${k.formula}</strong>
            </div>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${badgeColorClass} shrink-0">
            ${k.status_badge}
          </span>
        </div>

        <!-- Middle Metric Figures -->
        <div class="flex items-baseline justify-between pt-1 border-t border-slate-100">
          <div class="space-y-0.5">
            <div class="text-[10.5px] font-mono text-slate-500 uppercase tracking-wider">${k.period}</div>
            <div class="text-2xl font-mono font-black text-[#0038A8] tracking-tight">
              ${k.formatted_value}
            </div>
          </div>

          <div class="flex items-center gap-2 font-mono text-xs">
            <div class="text-right p-1.5 rounded bg-slate-50 border border-slate-200">
              <div class="text-[9.5px] text-slate-500 uppercase">YoY</div>
              <div class="font-bold ${k.yoy_change > 0 ? (k.id.includes('DEBT') || k.id.includes('INTEREST') ? 'text-rose-700' : 'text-emerald-700') : (k.id.includes('DEBT') || k.id.includes('INTEREST') ? 'text-emerald-700' : 'text-rose-700')}">
                ${k.yoy_formatted}
              </div>
            </div>
            <div class="text-right p-1.5 rounded bg-slate-50 border border-slate-200">
              <div class="text-[9.5px] text-slate-500 uppercase">MoM</div>
              <div class="font-bold ${k.mom_change > 0 ? (k.id.includes('DEBT') || k.id.includes('INTEREST') ? 'text-rose-700' : 'text-emerald-700') : (k.id.includes('DEBT') || k.id.includes('INTEREST') ? 'text-emerald-700' : 'text-rose-700')}">
                ${k.mom_formatted}
              </div>
            </div>
          </div>
        </div>

        <!-- 1 Point Economic Impact Contekan Makna -->
        <div class="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/90 text-xs space-y-1">
          <div class="text-[10.5px] font-mono font-bold text-amber-950 flex items-center gap-1">
            <span>💡</span>
            <span>Contekan Makna & Dampak bagi Indonesia:</span>
          </div>
          <p class="text-[11.5px] text-slate-800 font-sans leading-relaxed">
            ${k.impact_point}
          </p>
        </div>

        <!-- Footnote Provenance -->
        <div class="text-[10px] font-mono text-slate-500 pt-0.5 flex items-center gap-1 truncate" title="${k.calculation_provenance}">
          <span>🔍</span>
          <span class="truncate">${k.calculation_provenance}</span>
        </div>

      </div>
    `;
  }

  // Render dropdown options for variables
  renderVariableOptions(selectedVal) {
    return this.availableVariables.map(v => `
      <option value="${v.id}" ${v.id === selectedVal ? 'selected' : ''}>
        ${v.name} (${v.unit}) — [${v.dimension_name}]
      </option>
    `).join('');
  }

  // Render year options for timeline
  renderYearOptions(start, end, current) {
    let opts = '';
    for (let y = start; y <= end; y++) {
      opts += `<option value="${y}" ${y === current ? 'selected' : ''}>${y}</option>`;
    }
    return opts;
  }

  // Render active dimension detail view with sparklines & full hover provenance
  renderActiveDimensionDetail() {
    const dim = this.dimensions.find(d => d.id === this.activeDimensionId) || this.dimensions[0];
    if (!dim) return '';

    return `
      <div class="space-y-4">
        <!-- Dimension Description Banner -->
        <div class="p-3 bg-blue-50/80 border border-blue-200 rounded-lg text-xs font-mono text-blue-950 flex items-start gap-2">
          <span class="text-base shrink-0">ℹ️</span>
          <div>
            <div class="font-bold text-sm">${dim.name}</div>
            <div class="text-[11.5px] font-sans text-slate-700 leading-relaxed">${dim.description}</div>
          </div>
        </div>

        <!-- Grid of Metrics inside Dimension -->
        <div class="grid grid-cols-1 ${dim.metrics.length > 2 ? 'md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'} gap-4">
          ${dim.metrics.map(m => {
            const vals = Object.values(m.values);
            const latestVal = vals[vals.length - 1];
            const minVal = Math.min(...vals);
            const maxVal = Math.max(...vals);
            const avgVal = roundNum(vals.reduce((a, b) => a + b, 0) / (vals.length || 1), 2);

            return `
              <div class="gov-card p-4 bg-white border border-[#DADCE0] rounded-xl shadow-2xs space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="font-bold text-sm text-[#202124]">${m.name}</h3>
                    <div class="text-[10.5px] font-mono text-slate-500">${m.benchmark_target || 'Target Resmi APBN'}</div>
                  </div>
                  <span class="text-xs font-mono font-bold text-[#0038A8] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Posisi 2026: ${latestVal} ${m.unit}
                  </span>
                </div>

                <!-- Hover Provenance Note Box -->
                <div class="p-2 rounded bg-slate-50 border border-slate-200 text-[10.5px] font-mono text-slate-700 leading-tight">
                  <span class="font-bold text-slate-900">Komponen Perhitungan & Sumber:</span> ${m.source_provenance}
                </div>

                <!-- Mini Chart Canvas -->
                <div class="relative bg-slate-50/60 p-2 rounded border border-slate-200 min-h-[160px]">
                  <canvas id="canvas-dim-${m.id}" height="90"></canvas>
                </div>

                <!-- Stats Footer -->
                <div class="grid grid-cols-4 gap-1.5 text-center font-mono text-[10.5px] pt-1 border-t border-slate-100">
                  <div class="p-1 rounded bg-slate-50">
                    <span class="text-slate-400 block text-[9.5px]">MIN</span>
                    <strong class="text-slate-800">${minVal}</strong>
                  </div>
                  <div class="p-1 rounded bg-slate-50">
                    <span class="text-slate-400 block text-[9.5px]">RATA-RATA</span>
                    <strong class="text-slate-800">${avgVal}</strong>
                  </div>
                  <div class="p-1 rounded bg-slate-50">
                    <span class="text-slate-400 block text-[9.5px]">MAKS</span>
                    <strong class="text-slate-800">${maxVal}</strong>
                  </div>
                  <div class="p-1 rounded bg-blue-50">
                    <span class="text-blue-600 block text-[9.5px]">2026 YTD</span>
                    <strong class="text-[#0038A8]">${latestVal}</strong>
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  attachEvents() {
    // 1. Comparison Variable 1, 2, 3 changes
    document.getElementById('sel-compare-var-1')?.addEventListener('change', (e) => {
      this.selectedVar1 = e.target.value;
      this.renderComparisonChart();
    });
    document.getElementById('sel-compare-var-2')?.addEventListener('change', (e) => {
      this.selectedVar2 = e.target.value;
      this.renderComparisonChart();
    });
    document.getElementById('sel-compare-var-3')?.addEventListener('change', (e) => {
      this.selectedVar3 = e.target.value;
      this.renderComparisonChart();
    });

    // 2. Chart type changes
    document.getElementById('sel-chart-type-1')?.addEventListener('change', (e) => {
      this.chartType1 = e.target.value;
      this.renderComparisonChart();
    });
    document.getElementById('sel-chart-type-2')?.addEventListener('change', (e) => {
      this.chartType2 = e.target.value;
      this.renderComparisonChart();
    });
    document.getElementById('sel-chart-type-3')?.addEventListener('change', (e) => {
      this.chartType3 = e.target.value;
      this.renderComparisonChart();
    });

    // 3. Timeline range change (enforcing min 12 years)
    const startSel = document.getElementById('sel-timeline-start');
    const endSel = document.getElementById('sel-timeline-end');
    const validationMsg = document.getElementById('timeline-validation-msg');

    const handleTimelineChange = () => {
      let s = parseInt(startSel.value, 10);
      let e = parseInt(endSel.value, 10);

      // Validate minimum 12 years span
      if ((e - s) < 11) {
        if (validationMsg) validationMsg.classList.remove('hidden');
        s = Math.max(1990, e - 11);
        startSel.value = s;
        setTimeout(() => {
          if (validationMsg) validationMsg.classList.add('hidden');
        }, 3000);
      } else {
        if (validationMsg) validationMsg.classList.add('hidden');
      }

      this.startYear = s;
      this.endYear = e;
      const spanLbl = document.getElementById('lbl-timeline-span');
      if (spanLbl) spanLbl.textContent = `${e - s + 1} Tahun`;
      this.renderComparisonChart();
    };

    startSel?.addEventListener('change', handleTimelineChange);
    endSel?.addEventListener('change', handleTimelineChange);

    // Preset buttons
    document.querySelectorAll('.btn-timeline-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = parseInt(btn.getAttribute('data-start'), 10);
        const e = parseInt(btn.getAttribute('data-end'), 10);
        this.startYear = s;
        this.endYear = e;
        if (startSel) startSel.value = s;
        if (endSel) endSel.value = e;
        const spanLbl = document.getElementById('lbl-timeline-span');
        if (spanLbl) spanLbl.textContent = `${e - s + 1} Tahun`;
        this.renderComparisonChart();
      });
    });

    // 4. Dimension tabs
    document.querySelectorAll('.btn-dimension-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeDimensionId = btn.getAttribute('data-dim-id');
        const detailContainer = document.getElementById('dimension-detail-container');
        if (detailContainer) {
          detailContainer.innerHTML = this.renderActiveDimensionDetail();
          this.renderDimensionSparklines();
        }
        // Update active button styling
        document.querySelectorAll('.btn-dimension-tab').forEach(b => {
          if (b.getAttribute('data-dim-id') === this.activeDimensionId) {
            b.className = 'btn-dimension-tab px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer bg-[#0038A8] border-[#0038A8] text-white shadow-xs';
          } else {
            b.className = 'btn-dimension-tab px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer bg-white border-slate-300 text-slate-700 hover:bg-slate-100';
          }
        });
      });
    });
  }

  async renderComparisonChart() {
    const canvas = document.getElementById('canvas-fiscal-comparison');
    if (!canvas || !window.Chart) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }

    const varIds = [this.selectedVar1, this.selectedVar2, this.selectedVar3].filter(v => v);

    try {
      const dataRes = await ApiClient.fetchFiscalHealthComparisonData(varIds, this.startYear, this.endYear);
      const years = dataRes.years || [];
      const datasetsData = dataRes.datasets || [];

      // Map chart type per variable
      const chartTypes = [this.chartType1, this.chartType2, this.chartType3];

      let hasRightAxis = false;
      const datasets = datasetsData.map((d, idx) => {
        const type = chartTypes[idx] || 'line';
        const isBar = type === 'bar';
        
        // Multi-axis determination: if mixed units, give nominal rupiah its own axis
        const isRupiah = d.unit.includes('Rp') || d.unit.includes('T') || d.unit.includes('Miliar');
        const axisId = (idx > 0 && isRupiah) ? 'y1' : 'y';
        if (axisId === 'y1') hasRightAxis = true;

        return {
          type: type,
          label: d.label,
          data: d.data,
          borderColor: d.borderColor,
          backgroundColor: isBar ? d.backgroundColor : 'transparent',
          borderWidth: isBar ? 1 : 2.5,
          tension: 0.25,
          pointRadius: isBar ? 0 : 3.5,
          pointHoverRadius: 6,
          yAxisID: axisId,
          source_provenance: d.source_provenance
        };
      });

      this.chartInstance = new Chart(canvas, {
        data: {
          labels: years,
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
              position: 'top',
              labels: {
                boxWidth: 14,
                font: { family: "'Tahoma', Geneva, Verdana, sans-serif", size: 11, weight: 'bold' }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              titleFont: { family: "'Tahoma', Geneva, sans-serif", size: 12, weight: 'bold' },
              bodyFont: { family: "'Tahoma', Geneva, sans-serif", size: 11 },
              padding: 10,
              boxPadding: 4,
              callbacks: {
                afterBody: (items) => {
                  const item = items[0];
                  if (!item) return '';
                  const ds = datasets[item.datasetIndex];
                  return ds?.source_provenance ? `\n📌 ${ds.source_provenance}` : '';
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { family: "'Tahoma', Geneva, sans-serif", size: 10 } }
            },
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Rasio / Persentase (%)',
                font: { size: 10, weight: 'bold' }
              },
              grid: { color: '#F1F5F9' },
              ticks: { font: { family: "'Tahoma', Geneva, sans-serif", size: 10 } }
            },
            ...(hasRightAxis ? {
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                  display: true,
                  text: 'Nominal (Rp Triliun)',
                  font: { size: 10, weight: 'bold' }
                },
                grid: { drawOnChartArea: false },
                ticks: { font: { family: "'Tahoma', Geneva, sans-serif", size: 10 } }
              }
            } : {})
          }
        }
      });

    } catch (e) {
      console.warn('Gagal merender grafik komparasi fiskal:', e);
    }
  }

  // Render individual sparklines for all metrics in the active dimension with on-hover provenance
  renderDimensionSparklines() {
    const dim = this.dimensions.find(d => d.id === this.activeDimensionId) || this.dimensions[0];
    if (!dim || !window.Chart) return;

    // Destroy existing dimension charts
    Object.values(this.dimensionCharts).forEach(c => c?.destroy());
    this.dimensionCharts = {};

    dim.metrics.forEach(m => {
      const canvas = document.getElementById(`canvas-dim-${m.id}`);
      if (!canvas) return;

      const years = Object.keys(m.values);
      const values = Object.values(m.values);

      this.dimensionCharts[m.id] = new Chart(canvas, {
        type: 'line',
        data: {
          labels: years,
          datasets: [{
            label: m.name,
            data: values,
            borderColor: '#0038A8',
            backgroundColor: 'rgba(0, 56, 168, 0.08)',
            fill: true,
            borderWidth: 2,
            tension: 0.25,
            pointRadius: 2,
            pointHoverRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              padding: 10,
              callbacks: {
                label: (ctx) => `Nilai: ${ctx.parsed.y} ${m.unit}`,
                afterLabel: () => `\n📌 Komponen Sumber:\n${m.source_provenance}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { maxTicksLimit: 7, font: { size: 9 } }
            },
            y: {
              grid: { color: '#F1F5F9' },
              ticks: { font: { size: 9 } }
            }
          }
        }
      });
    });
  }
}

function roundNum(num, dec = 2) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}
