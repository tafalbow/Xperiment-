// ==============================================================================
// INDOEKONOMI data — Studio Custom Chart & Analisis Driver Kontekstual (1990 – 2026)
// Memungkinkan kombinasi hingga 5 variabel trend keuangan negara & indikator mingguan,
// dual vertical axis (Sumbu Kiri & Kanan), hitungan kustom (YoY %, 3Y-MA, Base 100, Raw),
// ragam visualisasi (Line, Bar, Stacked Bar), serta panel analisis driver interaktif.
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

export class CustomChartStudio {
  constructor(containerId) {
    this.containerId = containerId;
    this.variablesCatalog = [];
    this.startYear = 1990;
    this.endYear = 2026;
    
    // Up to 5 customizable variable slots
    this.slotColors = ['#1A73E8', '#E37400', '#137333', '#9334E6', '#D93025'];
    this.slots = [
      {
        id: 1,
        enabled: true,
        variable_id: 'LRA__REV_TOTAL',
        transformation: 'RAW', // RAW | YOY | AVG_3Y | BASE_100
        chart_type: 'bar',     // line | bar | stacked_bar
        axis: 'left',          // left | right
        color: this.slotColors[0]
      },
      {
        id: 2,
        enabled: true,
        variable_id: 'LRA__EXP_TOTAL',
        transformation: 'RAW',
        chart_type: 'bar',
        axis: 'left',
        color: this.slotColors[1]
      },
      {
        id: 3,
        enabled: true,
        variable_id: 'LRA__DEFISIT_ANGGARAN',
        transformation: 'RAW',
        chart_type: 'line',
        axis: 'left',
        color: this.slotColors[4] // Merah untuk defisit
      },
      {
        id: 4,
        enabled: false,
        variable_id: 'LRA__REV_TOTAL',
        transformation: 'YOY',
        chart_type: 'line',
        axis: 'right',
        color: this.slotColors[2]
      },
      {
        id: 5,
        enabled: false,
        variable_id: 'CUKAI__CUKAI_TOTAL',
        transformation: 'RAW',
        chart_type: 'stacked_bar',
        axis: 'left',
        color: this.slotColors[3]
      }
    ];

    // Data cache for active series
    this.seriesData = {}; // { slot_id: { variable_id, transformation, unit, series: [...] } }
    this.isLoading = false;
    this.hoveredYear = 2024; // Default hover / pointer highlight
    this.hoverPoint = null; // { x, y, year }
    this.driverData = null;
    this.driverCache = {};
    this.chartCanvas = null;
    this.chartCtx = null;
  }

  async init() {
    this.renderSkeleton();
    try {
      const res = await ApiClient.fetchCustomChartVariables();
      this.variablesCatalog = res.variables || [];
      await this.loadAllSeriesData();
      await this.fetchDriver(this.hoveredYear);
      this.render();
    } catch (err) {
      console.error('Gagal menginisialisasi Custom Chart Studio:', err);
      this.renderError(err.message);
    }
  }

  async loadAllSeriesData() {
    this.isLoading = true;
    const activeSlots = this.slots.filter(s => s.enabled && s.variable_id);
    
    await Promise.all(activeSlots.map(async (slot) => {
      try {
        const data = await ApiClient.fetchCustomChartSeries({
          variable_id: slot.variable_id,
          transformation: slot.transformation,
          start_year: this.startYear,
          end_year: this.endYear
        });
        this.seriesData[slot.id] = data;
      } catch (e) {
        console.warn(`Gagal memuat seri slot ${slot.id}:`, e);
      }
    }));

    this.isLoading = false;
  }

  async fetchDriver(year) {
    if (!year) return;
    this.hoveredYear = year;
    
    const activeVarIds = this.slots
      .filter(s => s.enabled && s.variable_id)
      .map(s => s.variable_id);

    if (activeVarIds.length === 0) return;

    const cacheKey = `${year}_${activeVarIds.sort().join('_')}`;
    if (this.driverCache[cacheKey]) {
      this.driverData = this.driverCache[cacheKey];
      this.renderDriverPanel();
      return;
    }

    try {
      const driver = await ApiClient.fetchCustomChartDriver(year, activeVarIds);
      this.driverCache[cacheKey] = driver;
      this.driverData = driver;
      this.renderDriverPanel();
    } catch (e) {
      console.warn('Gagal memuat driver analisis:', e);
    }
  }

  applyPreset(presetKey) {
    if (presetKey === 'POSTUR_APBN') {
      this.slots[0] = { id: 1, enabled: true, variable_id: 'LRA__REV_TOTAL', transformation: 'RAW', chart_type: 'bar', axis: 'left', color: '#1A73E8' };
      this.slots[1] = { id: 2, enabled: true, variable_id: 'LRA__EXP_TOTAL', transformation: 'RAW', chart_type: 'bar', axis: 'left', color: '#E37400' };
      this.slots[2] = { id: 3, enabled: true, variable_id: 'LRA__DEFISIT_ANGGARAN', transformation: 'RAW', chart_type: 'line', axis: 'left', color: '#D93025' };
      this.slots[3] = { id: 4, enabled: false, variable_id: 'LRA__REV_TOTAL', transformation: 'YOY', chart_type: 'line', axis: 'right', color: '#137333' };
      this.slots[4] = { id: 5, enabled: false, variable_id: 'CUKAI__CUKAI_TOTAL', transformation: 'RAW', chart_type: 'stacked_bar', axis: 'left', color: '#9334E6' };
    } else if (presetKey === 'CUKAI_BREAKDOWN') {
      this.slots[0] = { id: 1, enabled: true, variable_id: 'CUKAI__CUKAI_CHT', transformation: 'RAW', chart_type: 'stacked_bar', axis: 'left', color: '#1A73E8' };
      this.slots[1] = { id: 2, enabled: true, variable_id: 'CUKAI__CUKAI_MMEA', transformation: 'RAW', chart_type: 'stacked_bar', axis: 'left', color: '#E37400' };
      this.slots[2] = { id: 3, enabled: true, variable_id: 'CUKAI__CUKAI_EA', transformation: 'RAW', chart_type: 'stacked_bar', axis: 'left', color: '#9334E6' };
      this.slots[3] = { id: 4, enabled: true, variable_id: 'CUKAI__DBH_CHT_ALOKASI', transformation: 'RAW', chart_type: 'line', axis: 'left', color: '#137333' };
      this.slots[4] = { id: 5, enabled: false, variable_id: 'CUKAI__CUKAI_TOTAL', transformation: 'YOY', chart_type: 'line', axis: 'right', color: '#D93025' };
    } else if (presetKey === 'YOY_GROWTH_DUAL') {
      this.slots[0] = { id: 1, enabled: true, variable_id: 'LRA__REV_TOTAL', transformation: 'RAW', chart_type: 'bar', axis: 'left', color: '#1A73E8' };
      this.slots[1] = { id: 2, enabled: true, variable_id: 'LRA__EXP_TOTAL', transformation: 'RAW', chart_type: 'bar', axis: 'left', color: '#E37400' };
      this.slots[2] = { id: 3, enabled: true, variable_id: 'LRA__REV_TOTAL', transformation: 'YOY', chart_type: 'line', axis: 'right', color: '#137333' };
      this.slots[3] = { id: 4, enabled: true, variable_id: 'LRA__EXP_TOTAL', transformation: 'YOY', chart_type: 'line', axis: 'right', color: '#D93025' };
      this.slots[4] = { id: 5, enabled: false, variable_id: 'CUKAI__CUKAI_TOTAL', transformation: 'RAW', chart_type: 'line', axis: 'left', color: '#9334E6' };
    } else if (presetKey === 'NERACA_SOLVABILITAS') {
      this.slots[0] = { id: 1, enabled: true, variable_id: 'NERACA__AST_TOTAL', transformation: 'RAW', chart_type: 'line', axis: 'left', color: '#1A73E8' };
      this.slots[1] = { id: 2, enabled: true, variable_id: 'NERACA__KEW_TOTAL', transformation: 'RAW', chart_type: 'line', axis: 'left', color: '#D93025' };
      this.slots[2] = { id: 3, enabled: true, variable_id: 'NERACA__EKU_TOTAL', transformation: 'RAW', chart_type: 'bar', axis: 'left', color: '#137333' };
      this.slots[3] = { id: 4, enabled: false, variable_id: 'LRA__REV_TOTAL', transformation: 'AVG_3Y', chart_type: 'line', axis: 'left', color: '#E37400' };
      this.slots[4] = { id: 5, enabled: false, variable_id: 'LRA__EXP_TOTAL', transformation: 'AVG_3Y', chart_type: 'line', axis: 'left', color: '#9334E6' };
    } else if (presetKey === 'FISKAL_MONETER') {
      this.slots[0] = { id: 1, enabled: true, variable_id: 'LRA__EXP_MODAL', transformation: 'RAW', chart_type: 'bar', axis: 'left', color: '#1A73E8' };
      this.slots[1] = { id: 2, enabled: true, variable_id: 'WEEKLY__BI_M0', transformation: 'RAW', chart_type: 'line', axis: 'left', color: '#E37400' };
      this.slots[2] = { id: 3, enabled: true, variable_id: 'WEEKLY__BI_RATE', transformation: 'RAW', chart_type: 'line', axis: 'right', color: '#D93025' };
      this.slots[3] = { id: 4, enabled: false, variable_id: 'LRA__REV_TOTAL', transformation: 'RAW', chart_type: 'bar', axis: 'left', color: '#137333' };
      this.slots[4] = { id: 5, enabled: false, variable_id: 'LRA__EXP_TOTAL', transformation: 'RAW', chart_type: 'bar', axis: 'left', color: '#9334E6' };
    }
    
    this.refreshStudio();
  }

  async refreshStudio() {
    await this.loadAllSeriesData();
    await this.fetchDriver(this.hoveredYear);
    this.render();
  }

  renderSkeleton() {
    const el = document.getElementById(this.containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="gov-card p-8 bg-white border border-[#DADCE0] rounded-lg text-center font-mono space-y-3">
        <div class="inline-block w-8 h-8 border-3 border-[#1A73E8] border-t-transparent rounded-full animate-spin"></div>
        <div class="text-sm font-bold text-[#202124]">Memuat Studio Custom Chart & Analisis Driver...</div>
        <div class="text-xs text-[#5F6368]">Mengkombinasikan 130 variabel dari 9 Tabel Keuangan Negara & Indikator Mingguan</div>
      </div>
    `;
  }

  renderError(msg) {
    const el = document.getElementById(this.containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="gov-card p-6 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 font-mono text-xs space-y-2">
        <div class="font-bold text-sm flex items-center gap-2">
          <span>⚠️</span>
          <span>Gagal Memuat Studio Custom Chart</span>
        </div>
        <p>${msg}</p>
        <button id="btn-retry-custom-chart" class="mt-2 px-3 py-1 bg-white border border-rose-300 rounded text-rose-700 hover:bg-rose-100 font-bold cursor-pointer">
          Coba Lagi
        </button>
      </div>
    `;
    document.getElementById('btn-retry-custom-chart')?.addEventListener('click', () => this.init());
  }

  render() {
    const el = document.getElementById(this.containerId);
    if (!el) return;

    el.innerHTML = `
      <div class="space-y-4">
        
        <!-- HEADER & PRESETS BAR -->
        <div class="gov-card p-4 bg-white border border-[#DADCE0] rounded-lg shadow-sm space-y-3">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#DADCE0] pb-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 text-[11px] font-mono font-bold bg-[#E8F0FE] text-[#1A73E8] rounded border border-[#D2E3FC]">
                  STUDIO CUSTOM CHART
                </span>
                <span class="text-xs font-mono font-bold text-[#202124] uppercase">
                  Multi-Variabel, Dual Y-Axis & Contextual Driver
                </span>
              </div>
              <p class="text-xs text-[#5F6368] mt-1 font-sans">
                Kombinasikan hingga 5 variabel dari 9 tabel Keuangan Negara (LRA, APBN, RAPBN, Cukai, LPSAL, Neraca, LO, LAK, LPE) & Data Mingguan dengan hitungan kustom (YoY %, 3Y-MA, Base 100, Nilai Asli).
              </p>
            </div>

            <!-- Curated Presets Buttons -->
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[11px] font-mono text-[#5F6368] font-semibold">Preset Cepat:</span>
              <button data-preset="POSTUR_APBN" class="btn-preset px-2.5 py-1 text-[11px] font-mono bg-[#F8F9FA] hover:bg-[#E8F0FE] hover:text-[#1A73E8] border border-[#DADCE0] rounded font-medium transition cursor-pointer">
                Postur APBN
              </button>
              <button data-preset="CUKAI_BREAKDOWN" class="btn-preset px-2.5 py-1 text-[11px] font-mono bg-[#F8F9FA] hover:bg-[#E8F0FE] hover:text-[#1A73E8] border border-[#DADCE0] rounded font-medium transition cursor-pointer">
                Cukai & DBH
              </button>
              <button data-preset="YOY_GROWTH_DUAL" class="btn-preset px-2.5 py-1 text-[11px] font-mono bg-[#F8F9FA] hover:bg-[#E8F0FE] hover:text-[#1A73E8] border border-[#DADCE0] rounded font-medium transition cursor-pointer">
                Dual Axis YoY %
              </button>
              <button data-preset="NERACA_SOLVABILITAS" class="btn-preset px-2.5 py-1 text-[11px] font-mono bg-[#F8F9FA] hover:bg-[#E8F0FE] hover:text-[#1A73E8] border border-[#DADCE0] rounded font-medium transition cursor-pointer">
                Neraca Negara
              </button>
              <button data-preset="FISKAL_MONETER" class="btn-preset px-2.5 py-1 text-[11px] font-mono bg-[#F8F9FA] hover:bg-[#E8F0FE] hover:text-[#1A73E8] border border-[#DADCE0] rounded font-medium transition cursor-pointer">
                Fiskal + Moneter
              </button>
            </div>
          </div>

          <!-- TIME RANGE SELECTOR -->
          <div class="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="text-[#5F6368] font-bold">Rentang Tahun:</span>
              <select id="select-chart-start-year" class="px-2 py-1 bg-white border border-[#DADCE0] rounded text-xs">
                ${Array.from({ length: 37 }, (_, i) => 1990 + i).map(y => `
                  <option value="${y}" ${y === this.startYear ? 'selected' : ''}>${y}</option>
                `).join('')}
              </select>
              <span class="text-[#5F6368]">s/d</span>
              <select id="select-chart-end-year" class="px-2 py-1 bg-white border border-[#DADCE0] rounded text-xs">
                ${Array.from({ length: 37 }, (_, i) => 1990 + i).map(y => `
                  <option value="${y}" ${y === this.endYear ? 'selected' : ''}>${y}</option>
                `).join('')}
              </select>
              <div class="flex items-center gap-1 ml-2">
                <button data-range="1990-2026" class="btn-range-quick px-2 py-0.5 text-[10.5px] bg-[#F1F3F4] hover:bg-[#E8F0FE] rounded border border-[#DADCE0] cursor-pointer">Semua</button>
                <button data-range="2004-2026" class="btn-range-quick px-2 py-0.5 text-[10.5px] bg-[#F1F3F4] hover:bg-[#E8F0FE] rounded border border-[#DADCE0] cursor-pointer">2004-2026</button>
                <button data-range="2015-2026" class="btn-range-quick px-2 py-0.5 text-[10.5px] bg-[#F1F3F4] hover:bg-[#E8F0FE] rounded border border-[#DADCE0] cursor-pointer">Akrual Penuh (2015+)</button>
                <button data-range="2020-2026" class="btn-range-quick px-2 py-0.5 text-[10.5px] bg-[#F1F3F4] hover:bg-[#E8F0FE] rounded border border-[#DADCE0] cursor-pointer">Pasca-Pandemi</button>
              </div>
            </div>

            <div class="text-[11px] text-[#5F6368] flex items-center gap-3">
              <span>💡 <em>Arahkan pointer ke titik chart mana saja untuk melihat analisis driver penyebabnya di bawah</em></span>
            </div>
          </div>
        </div>

        <!-- 5 VARIABLE CONFIGURATION SLOTS -->
        <div class="gov-card p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs font-mono font-bold text-[#202124] px-1">
            <span class="flex items-center gap-2">
              <span>⚙️</span>
              <span>KONFIGURASI HINGGA 5 VARIABEL TREND</span>
            </span>
            <span class="text-[11px] text-[#5F6368] font-normal">
              Pilih Sumber Tabel, Transformasi (YoY, 3Y-MA, Base 100), Tipe Chart, dan Sumbu (Kiri / Kanan)
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-2 font-mono text-xs">
            ${this.slots.map((slot, idx) => this.renderSlotCard(slot, idx)).join('')}
          </div>
        </div>

        <!-- MAIN CHART CONTAINER (DUAL Y-AXIS CANVAS) -->
        <div class="gov-card p-4 bg-white border border-[#DADCE0] rounded-lg shadow-sm space-y-3">
          <div class="flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div class="flex items-center gap-2" id="chart-legend-container">
              <!-- Active Legend Badges -->
              ${this.renderLegendBadges()}
            </div>
            <div class="flex items-center gap-3 text-[11px] text-[#5F6368]">
              <span class="flex items-center gap-1">
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#1A73E8]"></span>
                <span>Sumbu Kiri (Left Axis)</span>
              </span>
              <span class="flex items-center gap-1">
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#137333]"></span>
                <span>Sumbu Kanan (Right Axis)</span>
              </span>
            </div>
          </div>

          <!-- Interactive HTML5 Canvas -->
          <div class="relative w-full h-[400px] bg-white border border-[#F1F3F4] rounded select-none overflow-hidden" id="canvas-wrapper">
            <canvas id="custom-chart-canvas" class="w-full h-full cursor-crosshair"></canvas>
            
            <!-- Hover Crosshair Tooltip -->
            <div id="chart-hover-tooltip" class="absolute hidden pointer-events-none bg-[#202124] text-white p-2.5 rounded-md shadow-xl text-[11px] font-mono z-20 max-w-[280px]"></div>
          </div>
        </div>

        <!-- CONTEXTUAL DRIVER ANALYSIS PANEL (DIRECTLY BELOW CHART) -->
        <div id="contextual-driver-container" class="gov-card p-4 bg-white border border-[#DADCE0] rounded-lg shadow-sm space-y-3">
          ${this.renderDriverPanelHtml()}
        </div>

      </div>
    `;

    this.bindEvents();
    this.initCanvasChart();
  }

  renderSlotCard(slot, idx) {
    const isChecked = slot.enabled ? 'checked' : '';
    const color = slot.color;
    
    // Group variables by table
    const groups = {};
    for (const v of this.variablesCatalog) {
      if (!groups[v.table_name]) groups[v.table_name] = [];
      groups[v.table_name].push(v);
    }

    return `
      <div class="p-2.5 rounded border ${slot.enabled ? 'bg-white border-[#DADCE0] shadow-2xs' : 'bg-[#F1F3F4] border-dashed border-[#DADCE0] opacity-75'} flex flex-col justify-between space-y-2" style="border-top: 3px solid ${color};">
        
        <!-- Slot Header -->
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-1.5 cursor-pointer select-none">
            <input type="checkbox" data-slot-id="${slot.id}" class="slot-enable-check accent-[${color}] rounded" ${isChecked}>
            <span class="font-bold text-[11px]" style="color: ${color};">Slot ${slot.id}</span>
          </label>
          <span class="text-[10px] px-1.5 py-0.2 rounded font-mono ${slot.axis === 'left' ? 'bg-[#E8F0FE] text-[#1A73E8]' : 'bg-[#E6F4EA] text-[#137333]'}">
            ${slot.axis === 'left' ? 'Sumbu Kiri' : 'Sumbu Kanan'}
          </span>
        </div>

        <!-- Variable Selector Dropdown -->
        <div class="space-y-1">
          <label class="text-[10px] text-[#5F6368] block">Variabel:</label>
          <select data-slot-id="${slot.id}" class="slot-var-select w-full px-1.5 py-1 text-[11px] bg-white border border-[#DADCE0] rounded text-[#202124] focus:outline-none focus:ring-1 focus:ring-[#1A73E8]" ${!slot.enabled ? 'disabled' : ''}>
            ${Object.keys(groups).map(grpName => `
              <optgroup label="${grpName}">
                ${groups[grpName].map(v => `
                  <option value="${v.id}" ${v.id === slot.variable_id ? 'selected' : ''}>${v.name}</option>
                `).join('')}
              </optgroup>
            `).join('')}
          </select>
        </div>

        <!-- Transformation & Chart Type & Axis Controls -->
        <div class="grid grid-cols-3 gap-1 pt-1 border-t border-[#F1F3F4]">
          <div>
            <label class="text-[9.5px] text-[#5F6368] block">Hitungan:</label>
            <select data-slot-id="${slot.id}" class="slot-transform-select w-full px-1 py-0.5 text-[10px] bg-white border border-[#DADCE0] rounded" ${!slot.enabled ? 'disabled' : ''}>
              <option value="RAW" ${slot.transformation === 'RAW' ? 'selected' : ''}>Asli</option>
              <option value="YOY" ${slot.transformation === 'YOY' ? 'selected' : ''}>YoY %</option>
              <option value="AVG_3Y" ${slot.transformation === 'AVG_3Y' ? 'selected' : ''}>3Y-MA</option>
              <option value="BASE_100" ${slot.transformation === 'BASE_100' ? 'selected' : ''}>Idx 100</option>
            </select>
          </div>

          <div>
            <label class="text-[9.5px] text-[#5F6368] block">Bentuk:</label>
            <select data-slot-id="${slot.id}" class="slot-type-select w-full px-1 py-0.5 text-[10px] bg-white border border-[#DADCE0] rounded" ${!slot.enabled ? 'disabled' : ''}>
              <option value="bar" ${slot.chart_type === 'bar' ? 'selected' : ''}>Bar</option>
              <option value="stacked_bar" ${slot.chart_type === 'stacked_bar' ? 'selected' : ''}>Stack</option>
              <option value="line" ${slot.chart_type === 'line' ? 'selected' : ''}>Line</option>
            </select>
          </div>

          <div>
            <label class="text-[9.5px] text-[#5F6368] block">Axis:</label>
            <select data-slot-id="${slot.id}" class="slot-axis-select w-full px-1 py-0.5 text-[10px] bg-white border border-[#DADCE0] rounded" ${!slot.enabled ? 'disabled' : ''}>
              <option value="left" ${slot.axis === 'left' ? 'selected' : ''}>Kiri</option>
              <option value="right" ${slot.axis === 'right' ? 'selected' : ''}>Kanan</option>
            </select>
          </div>
        </div>

      </div>
    `;
  }

  renderLegendBadges() {
    const activeSlots = this.slots.filter(s => s.enabled);
    if (activeSlots.length === 0) {
      return `<span class="text-[#5F6368] italic">Tidak ada variabel aktif. Centang salah satu slot di atas.</span>`;
    }

    return activeSlots.map(slot => {
      const data = this.seriesData[slot.id];
      const name = data ? data.name : slot.variable_id;
      const unit = data ? data.unit : '';
      const transformLabel = slot.transformation !== 'RAW' ? ` (${slot.transformation})` : '';
      return `
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#DADCE0] bg-[#F8F9FA] text-[#202124]">
          <span class="inline-block w-2.5 h-2.5 rounded" style="background-color: ${slot.color};"></span>
          <span class="font-bold">${name}${transformLabel}</span>
          <span class="text-[#5F6368] text-[10px]">[${unit}]</span>
          <span class="text-[9.5px] px-1 rounded bg-[#E8EAED]">${slot.axis.toUpperCase()}</span>
        </span>
      `;
    }).join('');
  }

  renderDriverPanelHtml() {
    if (!this.driverData) {
      return `
        <div class="p-6 text-center text-[#5F6368] font-mono text-xs space-y-1">
          <div>💡 Arahkan pointer ke titik tahun di chart untuk memuat analisis driver kontekstual.</div>
        </div>
      `;
    }

    const d = this.driverData;
    const macro = d.macro_context || {};
    const varDrivers = d.variable_drivers || [];

    return `
      <div class="space-y-3">
        <!-- Driver Header -->
        <div class="flex items-center justify-between border-b border-[#DADCE0] pb-2 flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 text-xs font-mono font-bold bg-[#202124] text-white rounded">
              TAHUN ${d.year}
            </span>
            <span class="text-xs font-mono font-bold text-[#202124]">
              ${macro.title || `Dinamika Fiskal & Ekonomi TA ${d.year}`}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[10.5px] font-mono text-[#1A73E8] bg-[#E8F0FE] border border-[#D2E3FC] px-2 py-0.5 rounded">
              📜 ${macro.doc || `LHP BPK RI atas LKPP TA ${d.year}`}
            </span>
          </div>
        </div>

        <!-- Macro Context Summary -->
        <div class="bg-[#F8F9FA] p-3 rounded border border-[#DADCE0] text-xs font-sans text-[#3C4043] leading-relaxed">
          <strong>Konteks Makro & Kebijakan Fiskal TA ${d.year}:</strong> ${macro.summary || 'Pelaksanaan APBN berjalan sesuai dengan kerangka makroekonomi dan undang-undang anggaran terkait.'}
          ${macro.tags && macro.tags.length ? `
            <div class="flex items-center gap-1 mt-2">
              <span class="text-[10.5px] font-mono text-[#5F6368]">Fokus:</span>
              ${macro.tags.map(t => `<span class="text-[10px] font-mono bg-white border border-[#DADCE0] px-1.5 py-0.2 rounded text-[#5F6368]">${t}</span>`).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Variable Drivers Cards -->
        <div class="space-y-1.5">
          <div class="text-[11px] font-mono font-bold text-[#5F6368] uppercase">
            Penyebab Pergerakan YoY Tiap Variabel di Titik Ini (vs Tahun ${d.year - 1}):
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
            ${varDrivers.map(v => {
              const isUp = v.direction === 'NAIK';
              const isDown = v.direction === 'TURUN';
              const dirBadge = isUp 
                ? `<span class="text-[#137333] bg-[#E6F4EA] border border-[#CEEAD6] px-1.5 py-0.2 rounded font-bold">▲ Naik +${v.yoy_change_percent}%</span>`
                : isDown
                ? `<span class="text-[#D93025] bg-[#FCE8E6] border border-[#FAD2CF] px-1.5 py-0.2 rounded font-bold">▼ Turun ${v.yoy_change_percent}%</span>`
                : `<span class="text-[#5F6368] bg-[#F1F3F4] px-1.5 py-0.2 rounded font-bold">● Stabil</span>`;

              return `
                <div class="p-3 bg-white rounded border border-[#DADCE0] space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-2">
                      <span class="font-bold text-[#202124] text-[11.5px]">${v.name}</span>
                      ${dirBadge}
                    </div>
                    <div class="text-[10.5px] text-[#5F6368] mt-0.5">
                      Nilai: <strong class="text-[#202124]">${v.current_value !== null ? v.current_value.toLocaleString('id-ID') : '-'} ${v.unit}</strong>
                      ${v.previous_value !== null ? `(TA ${d.year - 1}: ${v.previous_value.toLocaleString('id-ID')} ${v.unit})` : ''}
                    </div>
                  </div>

                  <p class="text-[11.5px] font-sans text-[#3C4043] bg-[#F8F9FA] p-2 rounded border border-[#F1F3F4] leading-relaxed">
                    💡 <strong>Faktor Driver:</strong> ${v.explanation}
                  </p>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;
  }

  renderDriverPanel() {
    const el = document.getElementById('contextual-driver-container');
    if (el) {
      el.innerHTML = this.renderDriverPanelHtml();
    }
  }

  bindEvents() {
    // Range quick buttons
    document.querySelectorAll('.btn-range-quick').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const [s, end] = e.currentTarget.getAttribute('data-range').split('-');
        this.startYear = parseInt(s, 10);
        this.endYear = parseInt(end, 10);
        this.refreshStudio();
      });
    });

    // Preset buttons
    document.querySelectorAll('.btn-preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pKey = e.currentTarget.getAttribute('data-preset');
        this.applyPreset(pKey);
      });
    });

    // Year select inputs
    document.getElementById('select-chart-start-year')?.addEventListener('change', (e) => {
      this.startYear = parseInt(e.target.value, 10);
      if (this.startYear > this.endYear) this.endYear = this.startYear;
      this.refreshStudio();
    });

    document.getElementById('select-chart-end-year')?.addEventListener('change', (e) => {
      this.endYear = parseInt(e.target.value, 10);
      if (this.endYear < this.startYear) this.startYear = this.endYear;
      this.refreshStudio();
    });

    // Slot enable checkboxes
    document.querySelectorAll('.slot-enable-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const sId = parseInt(e.target.getAttribute('data-slot-id'), 10);
        const slot = this.slots.find(s => s.id === sId);
        if (slot) {
          slot.enabled = e.target.checked;
          this.refreshStudio();
        }
      });
    });

    // Slot variable selectors
    document.querySelectorAll('.slot-var-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const sId = parseInt(e.target.getAttribute('data-slot-id'), 10);
        const slot = this.slots.find(s => s.id === sId);
        if (slot) {
          slot.variable_id = e.target.value;
          this.refreshStudio();
        }
      });
    });

    // Slot transformation
    document.querySelectorAll('.slot-transform-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const sId = parseInt(e.target.getAttribute('data-slot-id'), 10);
        const slot = this.slots.find(s => s.id === sId);
        if (slot) {
          slot.transformation = e.target.value;
          this.refreshStudio();
        }
      });
    });

    // Slot chart type
    document.querySelectorAll('.slot-type-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const sId = parseInt(e.target.getAttribute('data-slot-id'), 10);
        const slot = this.slots.find(s => s.id === sId);
        if (slot) {
          slot.chart_type = e.target.value;
          this.drawCanvasChart();
        }
      });
    });

    // Slot axis
    document.querySelectorAll('.slot-axis-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const sId = parseInt(e.target.getAttribute('data-slot-id'), 10);
        const slot = this.slots.find(s => s.id === sId);
        if (slot) {
          slot.axis = e.target.value;
          this.drawCanvasChart();
        }
      });
    });
  }

  // ----------------------------------------------------------------------------
  // DUAL-AXIS CANVAS CHART ENGINE
  // ----------------------------------------------------------------------------
  initCanvasChart() {
    this.chartCanvas = document.getElementById('custom-chart-canvas');
    if (!this.chartCanvas) return;

    this.chartCtx = this.chartCanvas.getContext('2d');

    const handlePointer = (evt) => {
      const rect = this.chartCanvas.getBoundingClientRect();
      const x = (evt.clientX || (evt.touches && evt.touches[0].clientX)) - rect.left;
      const y = (evt.clientY || (evt.touches && evt.touches[0].clientY)) - rect.top;
      this.handleCanvasHover(x, y);
    };

    this.chartCanvas.addEventListener('mousemove', handlePointer);
    this.chartCanvas.addEventListener('touchmove', handlePointer, { passive: true });

    this.chartCanvas.addEventListener('mouseleave', () => {
      this.hoverPoint = null;
      document.getElementById('chart-hover-tooltip')?.classList.add('hidden');
      this.drawCanvasChart();
    });

    window.addEventListener('resize', () => this.drawCanvasChart());
    this.drawCanvasChart();
  }

  drawCanvasChart() {
    if (!this.chartCanvas || !this.chartCtx) return;

    const canvas = this.chartCanvas;
    const ctx = this.chartCtx;
    const wrapper = canvas.parentElement;

    const dpr = window.devicePixelRatio || 1;
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    // Filter active slots that have series data
    const activeSlots = this.slots.filter(s => s.enabled && this.seriesData[s.id]);
    if (activeSlots.length === 0) {
      ctx.fillStyle = '#5F6368';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Tidak ada variabel aktif terpilih.', w / 2, h / 2);
      return;
    }

    // Determine all years
    const years = [];
    for (let y = this.startYear; y <= this.endYear; y++) {
      years.push(y);
    }

    // Calculate bounding boxes & margins for Dual Y-Axis
    const padLeft = 65;
    const padRight = 65;
    const padTop = 30;
    const padBottom = 40;
    const chartW = w - padLeft - padRight;
    const chartH = h - padTop - padBottom;

    // Group active slots by axis
    const leftSlots = activeSlots.filter(s => s.axis === 'left');
    const rightSlots = activeSlots.filter(s => s.axis === 'right');

    // 1. Calculate Left Axis Min & Max
    let leftMin = 0;
    let leftMax = 0;
    if (leftSlots.length > 0) {
      // Check stacked bars sum or single values
      years.forEach(yr => {
        let posSum = 0;
        let negSum = 0;
        leftSlots.forEach(s => {
          const pt = (this.seriesData[s.id].series || []).find(p => p.year === yr);
          const v = pt ? pt.value : 0;
          if (s.chart_type === 'stacked_bar') {
            if (v >= 0) posSum += v;
            else negSum += v;
          } else {
            leftMin = Math.min(leftMin, v);
            leftMax = Math.max(leftMax, v);
          }
        });
        if (posSum > 0) leftMax = Math.max(leftMax, posSum);
        if (negSum < 0) leftMin = Math.min(leftMin, negSum);
      });
      // Safety padding
      leftMax = leftMax === 0 ? 100 : leftMax * 1.1;
      leftMin = leftMin < 0 ? leftMin * 1.1 : 0;
    }

    // 2. Calculate Right Axis Min & Max
    let rightMin = 0;
    let rightMax = 0;
    if (rightSlots.length > 0) {
      years.forEach(yr => {
        rightSlots.forEach(s => {
          const pt = (this.seriesData[s.id].series || []).find(p => p.year === yr);
          const v = pt ? pt.value : 0;
          rightMin = Math.min(rightMin, v);
          rightMax = Math.max(rightMax, v);
        });
      });
      rightMax = rightMax === 0 ? 10 : rightMax * 1.15;
      rightMin = rightMin < 0 ? rightMin * 1.15 : 0;
    }

    // Helpers to convert data to canvas pixel coordinates
    const getX = (yr) => {
      if (years.length <= 1) return padLeft + chartW / 2;
      const idx = yr - this.startYear;
      return padLeft + (idx / (years.length - 1)) * chartW;
    };

    const getYLeft = (val) => {
      const range = (leftMax - leftMin) || 1;
      return padTop + chartH - ((val - leftMin) / range) * chartH;
    };

    const getYRight = (val) => {
      const range = (rightMax - rightMin) || 1;
      return padTop + chartH - ((val - rightMin) / range) * chartH;
    };

    // Draw horizontal gridlines based on left axis
    ctx.strokeStyle = '#F1F3F4';
    ctx.lineWidth = 1;
    const gridSteps = 5;
    for (let i = 0; i <= gridSteps; i++) {
      const gVal = leftMin + ((leftMax - leftMin) / gridSteps) * i;
      const y = getYLeft(gVal);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(w - padRight, y);
      ctx.stroke();

      // Left axis label
      ctx.fillStyle = '#5F6368';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(gVal).toLocaleString('id-ID'), padLeft - 8, y + 3);

      // Right axis label (if right slots exist)
      if (rightSlots.length > 0) {
        const rVal = rightMin + ((rightMax - rightMin) / gridSteps) * i;
        ctx.fillStyle = '#137333';
        ctx.textAlign = 'left';
        ctx.fillText(rVal.toFixed(1) + '%', w - padRight + 8, y + 3);
      }
    }

    // Draw baseline zero if leftMin < 0
    if (leftMin < 0 && leftMax > 0) {
      const y0 = getYLeft(0);
      ctx.strokeStyle = '#BDC1C6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padLeft, y0);
      ctx.lineTo(w - padRight, y0);
      ctx.stroke();
    }

    // Draw X-axis years
    ctx.fillStyle = '#5F6368';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    const stepYear = years.length > 20 ? 4 : (years.length > 10 ? 2 : 1);
    years.forEach((yr, idx) => {
      if (idx % stepYear === 0 || yr === years[years.length - 1]) {
        const x = getX(yr);
        ctx.fillText(yr.toString(), x, padTop + chartH + 18);
      }
    });

    // --------------------------------------------------------------------------
    // RENDER BARS & STACKED BARS
    // --------------------------------------------------------------------------
    const barWidth = Math.max(3, Math.min(24, (chartW / years.length) * 0.55));

    // A. Stacked Bars
    const stackedSlots = activeSlots.filter(s => s.chart_type === 'stacked_bar');
    if (stackedSlots.length > 0) {
      years.forEach(yr => {
        const x = getX(yr) - barWidth / 2;
        let posAccum = 0;
        let negAccum = 0;

        stackedSlots.forEach(slot => {
          const pt = (this.seriesData[slot.id].series || []).find(p => p.year === yr);
          const val = pt ? pt.value : 0;
          const getY = slot.axis === 'right' ? getYRight : getYLeft;
          const y0 = getY(0);

          if (val >= 0) {
            const yTop = getY(posAccum + val);
            const yBottom = getY(posAccum);
            ctx.fillStyle = slot.color;
            ctx.fillRect(x, yTop, barWidth, yBottom - yTop);
            posAccum += val;
          } else {
            const yTop = getY(negAccum);
            const yBottom = getY(negAccum + val);
            ctx.fillStyle = slot.color;
            ctx.fillRect(x, yTop, barWidth, yBottom - yTop);
            negAccum += val;
          }
        });
      });
    }

    // B. Normal Clustered/Overlay Bars
    const normalBarSlots = activeSlots.filter(s => s.chart_type === 'bar');
    if (normalBarSlots.length > 0) {
      normalBarSlots.forEach(slot => {
        const getY = slot.axis === 'right' ? getYRight : getYLeft;
        const y0 = getY(0);
        
        years.forEach(yr => {
          const pt = (this.seriesData[slot.id].series || []).find(p => p.year === yr);
          if (!pt) return;
          const val = pt.value;
          const x = getX(yr) - barWidth / 2;
          const yVal = getY(val);

          ctx.fillStyle = slot.color;
          ctx.globalAlpha = 0.85;
          if (val >= 0) {
            ctx.fillRect(x, yVal, barWidth, y0 - yVal);
          } else {
            ctx.fillRect(x, y0, barWidth, yVal - y0);
          }
          ctx.globalAlpha = 1.0;
        });
      });
    }

    // --------------------------------------------------------------------------
    // RENDER LINES
    // --------------------------------------------------------------------------
    const lineSlots = activeSlots.filter(s => s.chart_type === 'line');
    lineSlots.forEach(slot => {
      const getY = slot.axis === 'right' ? getYRight : getYLeft;
      const pts = (this.seriesData[slot.id].series || []);
      if (pts.length === 0) return;

      ctx.strokeStyle = slot.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      pts.forEach((p, idx) => {
        const x = getX(p.year);
        const y = getY(p.value);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Vertex dots
      pts.forEach(p => {
        const x = getX(p.year);
        const y = getY(p.value);
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = slot.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    });

    // --------------------------------------------------------------------------
    // RENDER HOVER GUIDE & HIGHLIGHT
    // --------------------------------------------------------------------------
    if (this.hoveredYear && this.hoveredYear >= this.startYear && this.hoveredYear <= this.endYear) {
      const hx = getX(this.hoveredYear);

      // Vertical guide line
      ctx.strokeStyle = '#202124';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(hx, padTop);
      ctx.lineTo(hx, padTop + chartH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Highlight active points on this year
      activeSlots.forEach(slot => {
        const pt = (this.seriesData[slot.id].series || []).find(p => p.year === this.hoveredYear);
        if (!pt) return;
        const getY = slot.axis === 'right' ? getYRight : getYLeft;
        const hy = getY(pt.value);

        ctx.fillStyle = slot.color;
        ctx.beginPath();
        ctx.arc(hx, hy, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
  }

  handleCanvasHover(mouseX, mouseY) {
    const canvas = this.chartCanvas;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const padLeft = 65;
    const padRight = 65;
    const chartW = rect.width - padLeft - padRight;

    const years = [];
    for (let y = this.startYear; y <= this.endYear; y++) years.push(y);
    if (years.length === 0) return;

    // Calculate nearest year
    const ratio = Math.max(0, Math.min(1, (mouseX - padLeft) / chartW));
    const nearestIdx = Math.round(ratio * (years.length - 1));
    const year = years[nearestIdx];

    if (year !== this.hoveredYear) {
      this.hoveredYear = year;
      this.drawCanvasChart();
      this.fetchDriver(year);
    }

    // Update floating tooltip position and content
    const tooltip = document.getElementById('chart-hover-tooltip');
    if (tooltip) {
      const activeSlots = this.slots.filter(s => s.enabled && this.seriesData[s.id]);
      
      let tooltipContent = `
        <div class="font-bold border-b border-[#5F6368] pb-1 mb-1 text-[#8AB4F8] flex items-center justify-between">
          <span>TAHUN ${year}</span>
          <span class="text-[9.5px] text-[#BDC1C6] font-normal">Pointer Driver</span>
        </div>
      `;

      activeSlots.forEach(s => {
        const d = this.seriesData[s.id];
        const pt = (d.series || []).find(p => p.year === year);
        const valStr = pt ? pt.value.toLocaleString('id-ID') : '-';
        tooltipContent += `
          <div class="flex items-center justify-between gap-3 text-[10px] my-0.5">
            <span class="flex items-center gap-1">
              <span class="inline-block w-2 h-2 rounded" style="background-color: ${s.color};"></span>
              <span class="truncate max-w-[140px] text-white">${d.name}</span>
            </span>
            <strong class="text-white">${valStr} ${d.unit}</strong>
          </div>
        `;
      });

      tooltipContent += `
        <div class="mt-1.5 pt-1 border-t border-[#3C4043] text-[9px] text-[#9AA0A6] italic">
          💡 Lihat analisis driver tahun ${year} di bawah chart
        </div>
      `;

      tooltip.innerHTML = tooltipContent;
      tooltip.classList.remove('hidden');

      // Coordinate positioning inside bounds
      const tipX = Math.min(rect.width - 240, Math.max(10, mouseX + 15));
      const tipY = Math.min(rect.height - 120, Math.max(10, mouseY - 40));
      tooltip.style.left = `${tipX}px`;
      tooltip.style.top = `${tipY}px`;
    }
  }
}
