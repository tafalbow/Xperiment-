// ==============================================================================
// CHART MODULE COMPONENT (Multi-Series Comparison 1-3 Variables, Dual Y-Axis, Line/Bar/100% Stacked)
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { ExcelExporter } from '../services/excel_exporter.js';
import { openEmailRegistrationModal } from './header.js';

export class ChartModule {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);

    if (typeof options === 'function') {
      this.onRangeShortcutChange = options;
      this.onChartHoverYear = () => {};
      this.onActiveSeriesChange = () => {};
    } else {
      this.onRangeShortcutChange = options.onRangeShortcutChange || (() => {});
      this.onChartHoverYear = options.onChartHoverYear || (() => {});
      this.onActiveSeriesChange = options.onActiveSeriesChange || (() => {});
    }

    this.activeRangePreset = 'all'; // '5y' | '10y' | 'all'
    this.startYear = 1990;
    this.endYear = 2026;

    this.availableIndicators = [];
    this.contextualDrivers = [];

    // Comparative Multi-Series Config (Max 3 Series)
    this.seriesConfigs = [
      {
        id: 'series-1',
        indicatorId: 'IND-GDP-GROWTH-YOY',
        name: 'Laju Pertumbuhan PDB Riil',
        unit: 'Persen (%)',
        effectiveUnit: 'Persen (%)',
        color: '#0284C7', // Sky Blue
        axis: 'primary',  // 'primary' (Sumbu Kiri) | 'secondary' (Sumbu Kanan)
        type: 'line',     // 'line' | 'bar'
        barMode: 'grouped', // 'grouped' | 'stacked100'
        transformation: 'RAW', // 'RAW' | 'YOY' | 'MOM' | 'AVG_L3M' | 'AVG_L6M' | 'AVG_L3Y' | 'AVG_L6Y'
        rawData: [],
        data: []
      }
    ];

    this.activeSeriesTab = 0; // 0, 1, 2
    this.hoveredYear = null;
    this.timeSlots = []; // Array of { year, x, width }

    this.renderContainer();
  }

  getAvailableTransformations(indicatorMeta, rawData = []) {
    const list = [{ id: 'RAW', label: 'Data Asli (Raw)' }];
    const count = rawData.length || 24;
    const freq = ((indicatorMeta && indicatorMeta.frequency) || '').toLowerCase();
    const isMonthly = freq.includes('bulan') || freq.includes('month');
    const name = ((indicatorMeta && indicatorMeta.name) || '').toLowerCase();
    const isAlreadyRate = name.includes('yoy') || name.includes('laju pertumbuhan') || (indicatorMeta && indicatorMeta.unit === 'Persen (%)' && !name.includes('inflasi'));

    // YoY (% Pertumbuhan Tahunan) - Available for volume/value indicators with >= 7 historical points
    if (!isAlreadyRate && count >= 7) {
      list.push({ id: 'YOY', label: 'YoY (% Pertumbuhan Tahunan)' });
    }

    // Monthly-specific granularities
    if (isMonthly) {
      if (count >= 7) {
        list.push({ id: 'MOM', label: 'MoM (% Pertumbuhan Bulanan)' });
      }
      if (count >= 8) {
        list.push({ id: 'AVG_L3M', label: 'AVG L3M (Rata-rata 3 Bulan)' });
      }
      if (count >= 11) {
        list.push({ id: 'AVG_L6M', label: 'AVG L6M (Rata-rata 6 Bulan)' });
      }
    }

    // Multi-Year Moving Averages (Requires >= 8 points for L3Y, >= 11 points for L6Y)
    if (count >= 8) {
      list.push({ id: 'AVG_L3Y', label: 'AVG L3Y (Rata-rata 3 Tahun)' });
    }
    if (count >= 11) {
      list.push({ id: 'AVG_L6Y', label: 'AVG L6Y (Rata-rata 6 Tahun)' });
    }

    return list;
  }

  computeTransformation(sortedRaw, trans, baseUnit) {
    if (!sortedRaw || sortedRaw.length === 0) return [];
    if (trans === 'RAW') return sortedRaw;

    return sortedRaw.map((obs, idx) => {
      const val = Number(obs.value);
      if (isNaN(val) || obs.value === null || obs.status === 'N/A') {
        return { ...obs, value: null };
      }

      let calculated = null;

      if (trans === 'YOY') {
        // YoY: Look back 1 annual point
        if (idx >= 1) {
          const prev = Number(sortedRaw[idx - 1]?.value);
          if (!isNaN(prev) && prev !== 0 && sortedRaw[idx - 1]?.value !== null) {
            calculated = ((val - prev) / Math.abs(prev)) * 100;
          }
        }
      } else if (trans === 'MOM') {
        // MoM: Look back 1 monthly point
        if (idx >= 1) {
          const prev = Number(sortedRaw[idx - 1]?.value);
          if (!isNaN(prev) && prev !== 0 && sortedRaw[idx - 1]?.value !== null) {
            calculated = ((val - prev) / Math.abs(prev)) * 100;
          }
        }
      } else if (trans === 'AVG_L3M' || trans === 'AVG_L3Y') {
        if (idx >= 2) {
          const w = [sortedRaw[idx - 2], sortedRaw[idx - 1], sortedRaw[idx]];
          const valid = w.map(x => Number(x?.value)).filter(v => !isNaN(v) && v !== null);
          if (valid.length === 3) {
            calculated = valid.reduce((a, b) => a + b, 0) / 3;
          }
        }
      } else if (trans === 'AVG_L6M' || trans === 'AVG_L6Y') {
        if (idx >= 5) {
          const w = sortedRaw.slice(idx - 5, idx + 1);
          const valid = w.map(x => Number(x?.value)).filter(v => !isNaN(v) && v !== null);
          if (valid.length === 6) {
            calculated = valid.reduce((a, b) => a + b, 0) / 6;
          }
        }
      }

      return {
        ...obs,
        value: calculated !== null ? Math.round(calculated * 100) / 100 : null,
        raw_original_value: obs.value,
        is_transformed: true,
        transformation_type: trans
      };
    });
  }

  recalculateSeriesData(series) {
    if (!series) return;
    const trans = series.transformation || 'RAW';
    const raw = (series.rawData && series.rawData.length > 0) ? series.rawData : (series.data || []);
    
    // Sort raw chronologically
    const sortedRaw = [...raw].sort((a, b) => String(a.period).localeCompare(String(b.period)));
    
    // Compute transformations over entire historical range
    const transformed = this.computeTransformation(sortedRaw, trans, series.unit);
    
    // Filter to active range
    series.data = transformed.filter(d => {
      const yr = parseInt(d.period);
      return isNaN(yr) || (yr >= this.startYear && yr <= this.endYear);
    });

    // Update effective unit
    if (trans === 'YOY' || trans === 'MOM') {
      series.effectiveUnit = 'Persen (%)';
    } else if (trans === 'AVG_L3Y') {
      series.effectiveUnit = `${series.unit} (AVG 3 Thn)`;
    } else if (trans === 'AVG_L6Y') {
      series.effectiveUnit = `${series.unit} (AVG 6 Thn)`;
    } else if (trans === 'AVG_L3M') {
      series.effectiveUnit = `${series.unit} (AVG 3 Bln)`;
    } else if (trans === 'AVG_L6M') {
      series.effectiveUnit = `${series.unit} (AVG 6 Bln)`;
    } else {
      series.effectiveUnit = series.unit;
    }
  }

  setAvailableIndicators(indicatorsList) {
    if (indicatorsList && indicatorsList.length > 0) {
      this.availableIndicators = indicatorsList;
      this.renderControls();
      requestAnimationFrame(() => this.drawChart());
      this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
    }
  }

  async setData(primaryObservations, indicatorInfo, contextualDrivers = [], allIndicators = []) {
    if (allIndicators && allIndicators.length > 0) {
      this.availableIndicators = allIndicators;
    }

    this.contextualDrivers = contextualDrivers || [];

    // Update Series 1 with full historical data
    if (this.seriesConfigs[0]) {
      if (indicatorInfo) {
        this.seriesConfigs[0].indicatorId = indicatorInfo.id;
        this.seriesConfigs[0].name = indicatorInfo.name;
        this.seriesConfigs[0].unit = indicatorInfo.unit;
      }
      
      try {
        const fullRes = await ApiClient.fetchObservations({
          indicator_id: this.seriesConfigs[0].indicatorId,
          start_year: 1990,
          end_year: 2026,
          limit: 500,
          sort_by: 'period',
          sort_order: 'ASC'
        });
        this.seriesConfigs[0].rawData = (fullRes.records || []).sort((a, b) => String(a.period).localeCompare(String(b.period)));
      } catch (err) {
        this.seriesConfigs[0].rawData = (primaryObservations || []).sort((a, b) => String(a.period).localeCompare(String(b.period)));
      }

      this.recalculateSeriesData(this.seriesConfigs[0]);
    }

    // Refresh any other active comparison series (Series 2 / Series 3)
    await this.refreshAllSeriesData();
    this.renderControls();
    requestAnimationFrame(() => this.drawChart());
    this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
  }

  async refreshAllSeriesData() {
    for (let i = 1; i < this.seriesConfigs.length; i++) {
      const s = this.seriesConfigs[i];
      if (s.indicatorId) {
        try {
          const res = await ApiClient.fetchObservations({
            indicator_id: s.indicatorId,
            start_year: 1990,
            end_year: 2026,
            limit: 500,
            sort_by: 'period',
            sort_order: 'ASC'
          });
          s.rawData = (res.records || []).sort((a, b) => String(a.period).localeCompare(String(b.period)));
          this.recalculateSeriesData(s);
        } catch (err) {
          console.error(`Error loading series ${i + 1}:`, err);
        }
      }
    }
  }

  async activateSeriesTab(idx) {
    if (idx >= this.seriesConfigs.length) {
      while (this.seriesConfigs.length <= idx && this.seriesConfigs.length < 3) {
        await this.addComparisonSeries();
      }
    }
    this.activeSeriesTab = Math.min(idx, this.seriesConfigs.length - 1);
    this.renderControls();
    requestAnimationFrame(() => this.drawChart());
    this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
  }

  async addComparisonSeries() {
    if (this.seriesConfigs.length >= 3) return;

    const newIdx = this.seriesConfigs.length;
    // Pick an indicator not yet selected
    const selectedIds = this.seriesConfigs.map(s => s.indicatorId);
    const candidate = this.availableIndicators.find(ind => !selectedIds.includes(ind.id)) || this.availableIndicators[0];

    const colors = ['#0284C7', '#10B981', '#F59E0B']; // Blue, Green, Amber
    const defaultAxis = candidate && candidate.unit !== this.seriesConfigs[0].unit ? 'secondary' : 'primary';

    const newSeries = {
      id: `series-${newIdx + 1}`,
      indicatorId: candidate ? candidate.id : '',
      name: candidate ? candidate.name : `Variabel ${newIdx + 1}`,
      unit: candidate ? candidate.unit : '',
      effectiveUnit: candidate ? candidate.unit : '',
      color: colors[newIdx] || '#8B5CF6',
      axis: defaultAxis,
      type: 'line',
      barMode: 'grouped',
      transformation: 'RAW',
      rawData: [],
      data: []
    };

    this.seriesConfigs.push(newSeries);
    this.activeSeriesTab = newIdx;

    if (newSeries.indicatorId) {
      try {
        const res = await ApiClient.fetchObservations({
          indicator_id: newSeries.indicatorId,
          start_year: 1990,
          end_year: 2026,
          limit: 500,
          sort_by: 'period',
          sort_order: 'ASC'
        });
        newSeries.rawData = (res.records || []).sort((a, b) => String(a.period).localeCompare(String(b.period)));
        this.recalculateSeriesData(newSeries);
      } catch (err) {
        console.error('Error fetching new series data:', err);
      }
    }

    this.renderControls();
    requestAnimationFrame(() => this.drawChart());
    this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
  }

  removeComparisonSeries(idx) {
    if (idx === 0 || this.seriesConfigs.length <= 1) return; // Cannot remove Series 1
    this.seriesConfigs.splice(idx, 1);
    this.activeSeriesTab = Math.min(this.activeSeriesTab, this.seriesConfigs.length - 1);
    this.renderControls();
    requestAnimationFrame(() => this.drawChart());
    this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
  }

  async updateSeriesIndicator(idx, newIndicatorId) {
    const s = this.seriesConfigs[idx];
    if (!s) return;

    const indMeta = this.availableIndicators.find(i => i.id === newIndicatorId);
    s.indicatorId = newIndicatorId;
    s.transformation = 'RAW'; // Reset to RAW on indicator switch
    if (indMeta) {
      s.name = indMeta.name;
      s.unit = indMeta.unit;
      s.effectiveUnit = indMeta.unit;
      if (idx > 0 && s.unit !== this.seriesConfigs[0].unit) {
        s.axis = 'secondary';
      }
    }

    try {
      const res = await ApiClient.fetchObservations({
        indicator_id: newIndicatorId,
        start_year: 1990,
        end_year: 2026,
        limit: 500,
        sort_by: 'period',
        sort_order: 'ASC'
      });
      s.rawData = (res.records || []).sort((a, b) => String(a.period).localeCompare(String(b.period)));
      this.recalculateSeriesData(s);
    } catch (err) {
      console.error(`Error updating series ${idx} indicator:`, err);
    }

    this.renderControls();
    requestAnimationFrame(() => this.drawChart());
    this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
  }

  renderContainer() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="gov-card p-3 space-y-2 min-h-[430px] flex flex-col justify-between overflow-hidden shadow-xs">
        <!-- Main Top Bar: Title & Range Preset Buttons -->
        <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-1.5 shrink-0">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">TREN & DISTRIBUSI DESKRIPTIF TINGKAT NASIONAL</span>
              <span class="text-[9.5px] font-mono bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.5 rounded">
                ${this.seriesConfigs.length > 1 ? `Mode Komparasi (${this.seriesConfigs.length} Variabel)` : 'Mode Tunggal'}
              </span>
            </div>
            <p class="text-[10.5px] text-slate-500 mt-0.5">
              Bandingkan 1 hingga 3 variabel data lintas lembaga dengan konfigurasi Sumbu Y Kiri/Kanan, Line, Bar, dan 100% Stacked Bar.
            </p>
          </div>

          <!-- Time Range Presets & Download Excel Button -->
          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400 font-mono text-[9.5px] uppercase">Rentang:</span>
              <div class="inline-flex rounded-sm border border-slate-200 p-0.5 bg-slate-50 text-[10.5px] font-mono">
                <button id="btn-range-5y" class="px-2 py-0.5 ${this.activeRangePreset === '5y' ? 'bg-white font-semibold text-slate-900 shadow-xs border border-slate-200 rounded-sm' : 'text-slate-600 hover:text-slate-900'}">5 Thn</button>
                <button id="btn-range-10y" class="px-2 py-0.5 ${this.activeRangePreset === '10y' ? 'bg-white font-semibold text-slate-900 shadow-xs border border-slate-200 rounded-sm' : 'text-slate-600 hover:text-slate-900'}">10 Thn</button>
                <button id="btn-range-all" class="px-2 py-0.5 ${this.activeRangePreset === 'all' ? 'bg-white font-semibold text-slate-900 shadow-xs border border-slate-200 rounded-sm' : 'text-slate-600 hover:text-slate-900'}">1990-2026</button>
              </div>
            </div>

            <!-- Single-Click Excel Download Button (Max 3 Vars, Max 12 Years / 24 Months) -->
            <button 
              type="button" 
              id="btn-chart-download-excel" 
              class="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-[10.5px] font-bold flex items-center gap-1.5 shadow-xs border border-emerald-600 transition-all cursor-pointer"
              title="Unduh Data Mentah & Keterangan Lineage sebagai File Excel (.xlsx) (Max 3 Variabel, Max 12 Tahun / 24 Bulan)"
            >
              <span>📥</span>
              <span>Download Excel (.xlsx)</span>
            </button>
          </div>
        </div>

        <!-- Series Configuration Deck (Compact Proportional) -->
        <div id="chart-series-deck" class="space-y-1.5 shrink-0"></div>

        <!-- Canvas & Interactive Hover Tooltip Container (Compact Fixed Locked Height) -->
        <div class="relative w-full h-[270px] min-h-[270px] max-h-[270px] flex items-center justify-center select-none bg-white rounded border border-slate-200 p-1.5 overflow-hidden shrink-0" id="chart-wrapper">
          <canvas id="gov-analytics-canvas" class="cursor-crosshair block w-full h-full"></canvas>
          <div id="chart-tooltip" class="hidden absolute pointer-events-none z-50 transition-opacity duration-75"></div>
        </div>

        <!-- Dual-Axis Legend & Footnote -->
        <div class="flex items-center justify-between text-[9.5px] text-slate-500 font-mono pt-1 border-t border-slate-100 flex-wrap gap-2 shrink-0">
          <div id="chart-legend-strip" class="flex items-center gap-2 flex-wrap"></div>
          <div>
            * Sumbu Kiri (Utama) • Sumbu Kanan (Sekunder) • Arahkan kursor untuk komparasi pergerakan YoY
          </div>
        </div>
      </div>
    `;

    this.renderControls();
    this.attachEvents();
    requestAnimationFrame(() => this.drawChart());
  }

  renderControls() {
    const deck = document.getElementById('chart-series-deck');
    const legendStrip = document.getElementById('chart-legend-strip');
    if (!deck) return;

    const active = this.seriesConfigs[this.activeSeriesTab] || this.seriesConfigs[0];

    // Series Tabs Strip with Integrated Axis Placement Menu
    let tabsHtml = `
      <div class="flex items-center justify-between flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded border border-slate-200">
        <div class="flex items-center gap-1.5 flex-wrap">
          ${this.seriesConfigs.map((s, idx) => `
            <button 
              type="button"
              class="btn-series-tab px-2 py-0.5 text-[11px] font-mono rounded flex items-center gap-1.5 border transition-all cursor-pointer ${this.activeSeriesTab === idx ? 'bg-white font-bold text-slate-900 border-slate-400 shadow-xs ring-2 ring-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}"
              data-idx="${idx}"
            >
              <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${s.color}"></span>
              <span>Var ${idx + 1}: <strong class="truncate max-w-[110px] inline-block align-bottom">${s.name || 'Pilih Indikator'}</strong></span>
              <span class="text-[8.5px] px-1 py-0.2 rounded font-semibold ${s.axis === 'primary' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'}">
                ${s.axis === 'primary' ? 'Kiri' : 'Kanan'}
              </span>
              ${idx > 0 ? `
                <span class="btn-remove-series text-slate-400 hover:text-rose-600 font-bold ml-0.5 text-xs" data-idx="${idx}" title="Hapus Variabel Ini">✕</span>
              ` : ''}
            </button>
          `).join('')}

          ${this.seriesConfigs.length < 3 ? `
            <button type="button" id="btn-add-series" class="px-2 py-0.5 text-[10.5px] font-mono rounded bg-white hover:bg-sky-50 text-sky-700 border border-dashed border-sky-400 font-semibold flex items-center gap-1 shadow-2xs cursor-pointer">
              <span class="font-bold">➕</span> Tambah Var ${this.seriesConfigs.length + 1}
            </button>
          ` : ''}
        </div>

        <!-- Axis Placement Menu Moved to Top Bar near Variable Selection -->
        <div class="flex items-center gap-2 font-mono text-[10.5px]">
          <div class="flex items-center gap-1">
            <span class="text-slate-600 font-bold uppercase text-[9.5px]">Sumbu (Var ${this.activeSeriesTab + 1}):</span>
            <div class="inline-flex rounded border border-slate-300 p-0.5 bg-slate-200/80">
              <button 
                type="button"
                id="btn-axis-primary" 
                class="py-0.5 px-2 text-center rounded transition-all cursor-pointer text-[10px] ${active.axis === 'primary' ? 'bg-sky-700 text-white font-bold shadow-xs ring-1 ring-sky-900' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300'}"
                title="Tempatkan Variabel ${this.activeSeriesTab + 1} pada Sumbu Kiri (Utama)"
              >
                ← Sumbu Kiri
              </button>
              <button 
                type="button"
                id="btn-axis-secondary" 
                class="py-0.5 px-2 text-center rounded transition-all cursor-pointer text-[10px] ${active.axis === 'secondary' ? 'bg-emerald-700 text-white font-bold shadow-xs ring-1 ring-emerald-900' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300'}"
                title="Tempatkan Variabel ${this.activeSeriesTab + 1} pada Sumbu Kanan (Sekunder)"
              >
                Sumbu Kanan →
              </button>
            </div>
          </div>
          <span class="text-slate-300">|</span>
          <span class="text-[9.5px] text-slate-400">Maks. 3 Var</span>
        </div>
      </div>
    `;

    // Active Series Parameter Control Panel (Streamlined without Axis box)
    if (active) {
      const activeMeta = this.availableIndicators.find(i => i.id === active.indicatorId);
      const availableTransformations = this.getAvailableTransformations(activeMeta, active.rawData);

      tabsHtml += `
        <div class="bg-white p-2 rounded border border-slate-200 space-y-1.5 text-[11px] font-mono shadow-2xs">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
            <!-- 1. Indicator Selector (6 Cols) -->
            <div class="md:col-span-6 space-y-0.5">
              <label class="text-[9.5px] uppercase font-bold text-slate-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full" style="background-color: ${active.color}"></span>
                Indikator (Var ${this.activeSeriesTab + 1}):
              </label>
              <select id="select-series-indicator" class="gov-select w-full text-[11px] font-mono py-1 font-medium">
                ${this.availableIndicators.map(ind => `
                  <option value="${ind.id}" ${ind.id === active.indicatorId ? 'selected' : ''}>
                    ${ind.name} [${ind.unit}] (${ind.source_name || ind.sector || 'Nasional'})
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 2. Data Transformation Granularity: RAW, YOY, MOM, AVG L3M/L6M/L3Y/L6Y (3 Cols) -->
            <div class="md:col-span-3 space-y-0.5">
              <label class="text-[9.5px] uppercase font-bold text-slate-700 flex items-center justify-between">
                <span>Granularitas Olahan:</span>
                <span class="text-[8.5px] text-sky-700 bg-sky-50 px-1 rounded border border-sky-200">≥ 6 Titik</span>
              </label>
              <select id="select-series-transformation" class="gov-select w-full text-[11px] font-mono py-1 font-semibold ${availableTransformations.length > 1 ? 'bg-amber-50/50 border-amber-300 text-slate-900' : 'bg-slate-50 text-slate-600'}">
                ${availableTransformations.map(t => `
                  <option value="${t.id}" ${t.id === (active.transformation || 'RAW') ? 'selected' : ''}>
                    ${t.label}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 3. Visual Type: Line vs Bar (3 Cols) -->
            <div class="md:col-span-3 space-y-0.5">
              <label class="text-[9.5px] uppercase font-bold text-slate-700">
                Tipe Visual:
              </label>
              <div class="inline-flex rounded border border-slate-300 p-0.5 bg-slate-100 w-full text-[10.5px]">
                <button 
                  type="button"
                  id="btn-series-type-line" 
                  class="flex-1 py-0.5 text-center rounded transition-all cursor-pointer ${active.type === 'line' ? 'bg-slate-800 text-white font-bold shadow-xs' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'}"
                >
                  📈 Line
                </button>
                <button 
                  type="button"
                  id="btn-series-type-bar" 
                  class="flex-1 py-0.5 text-center rounded transition-all cursor-pointer ${active.type === 'bar' ? 'bg-slate-800 text-white font-bold shadow-xs' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'}"
                >
                  📊 Bar
                </button>
              </div>
            </div>
          </div>

          ${active.type === 'bar' ? `
            <div class="flex items-center gap-2 pt-1 border-t border-slate-100">
              <span class="text-[9.5px] uppercase font-bold text-slate-700">Mode Bar:</span>
              <select id="select-bar-mode" class="gov-select text-[11px] font-mono py-0.5 px-2">
                <option value="grouped" ${active.barMode === 'grouped' ? 'selected' : ''}>Normal Bar</option>
                <option value="stacked100" ${active.barMode === 'stacked100' ? 'selected' : ''}>100% Stacked</option>
              </select>
            </div>
          ` : ''}
        </div>
      `;
    }

    deck.innerHTML = tabsHtml;

    // Render Interactive Legend Strip
    if (legendStrip) {
      legendStrip.innerHTML = this.seriesConfigs.map((s, idx) => `
        <div class="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded border border-slate-300 text-[10.5px] font-mono">
          <span class="w-2 h-2 rounded-full" style="background-color: ${s.color}"></span>
          <span class="font-bold text-slate-900">${s.name || `Var ${idx + 1}`}</span>
          <span class="text-slate-600 font-normal">(${s.effectiveUnit || s.unit || ''})</span>
          ${s.transformation && s.transformation !== 'RAW' ? `
            <span class="text-[9px] px-1 py-0.2 rounded font-bold bg-amber-200 text-amber-900 border border-amber-300">
              ${s.transformation}
            </span>
          ` : ''}
          <button 
            type="button"
            class="btn-toggle-axis px-1.5 py-0.5 rounded font-mono text-[9.5px] font-bold border transition-all cursor-pointer shadow-2xs ${s.axis === 'primary' ? 'bg-sky-100 text-sky-900 border-sky-300 hover:bg-sky-200' : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'}"
            data-idx="${idx}"
            title="Klik untuk mengubah Sumbu Y Variabel ${idx + 1} (${s.axis === 'primary' ? 'Sumbu Kiri ➔ Pindah ke Kanan' : 'Sumbu Kanan ➔ Pindah ke Kiri'})"
          >
            ${s.axis === 'primary' ? '← Kiri' : 'Kanan →'} ⇄
          </button>
          <button 
            type="button"
            class="btn-toggle-type px-1.5 py-0.5 rounded font-mono text-[9.5px] bg-white text-slate-800 hover:bg-slate-200 border border-slate-300 cursor-pointer shadow-2xs"
            data-idx="${idx}"
            title="Klik untuk ubah format Line ⇄ Bar"
          >
            ${s.type.toUpperCase()}${s.type === 'bar' && s.barMode === 'stacked100' ? ' 100%' : ''}
          </button>
        </div>
      `).join('');
    }

    this.attachDynamicControlsEvents();
  }

  attachDynamicControlsEvents() {
    // Switch active series tab
    const tabBtns = this.container.querySelectorAll('.btn-series-tab');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove-series')) return;
        const idx = parseInt(btn.getAttribute('data-idx'));
        this.activeSeriesTab = idx;
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
        this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
      });
    });

    // Remove series
    const removeBtns = this.container.querySelectorAll('.btn-remove-series');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'));
        this.removeComparisonSeries(idx);
      });
    });

    // Add series button
    const btnAdd = document.getElementById('btn-add-series');
    btnAdd?.addEventListener('click', () => {
      this.addComparisonSeries();
    });

    // Select indicator for active series
    const selectInd = document.getElementById('select-series-indicator');
    selectInd?.addEventListener('change', (e) => {
      this.updateSeriesIndicator(this.activeSeriesTab, e.target.value);
    });

    // Transformation selector for active series
    const selectTrans = document.getElementById('select-series-transformation');
    selectTrans?.addEventListener('change', (e) => {
      const activeSeries = this.seriesConfigs[this.activeSeriesTab];
      if (activeSeries) {
        activeSeries.transformation = e.target.value;
        this.recalculateSeriesData(activeSeries);
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
        this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
      }
    });

    // Axis buttons for active tab
    const btnPrimary = document.getElementById('btn-axis-primary');
    const btnSecondary = document.getElementById('btn-axis-secondary');

    btnPrimary?.addEventListener('click', () => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].axis = 'primary';
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
        this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
      }
    });

    btnSecondary?.addEventListener('click', () => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].axis = 'secondary';
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
        this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
      }
    });

    // Direct axis toggle from legend pills
    const axisToggles = this.container.querySelectorAll('.btn-toggle-axis');
    axisToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'));
        if (this.seriesConfigs[idx]) {
          this.seriesConfigs[idx].axis = this.seriesConfigs[idx].axis === 'primary' ? 'secondary' : 'primary';
          this.renderControls();
          requestAnimationFrame(() => this.drawChart());
          this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
        }
      });
    });

    // Direct type toggle from legend pills
    const typeToggles = this.container.querySelectorAll('.btn-toggle-type');
    typeToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'));
        if (this.seriesConfigs[idx]) {
          this.seriesConfigs[idx].type = this.seriesConfigs[idx].type === 'line' ? 'bar' : 'line';
          this.renderControls();
          requestAnimationFrame(() => this.drawChart());
          this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
        }
      });
    });

    // Visual type buttons
    const btnLine = document.getElementById('btn-series-type-line');
    const btnBar = document.getElementById('btn-series-type-bar');

    btnLine?.addEventListener('click', () => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].type = 'line';
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
        this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
      }
    });

    btnBar?.addEventListener('click', () => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].type = 'bar';
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
        this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
      }
    });

    // Bar Mode selector
    const selectBarMode = document.getElementById('select-bar-mode');
    selectBarMode?.addEventListener('change', (e) => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].barMode = e.target.value;
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
        this.onActiveSeriesChange(this.seriesConfigs, this.activeSeriesTab);
      }
    });
  }

  attachEvents() {
    const btn5y = document.getElementById('btn-range-5y');
    const btn10y = document.getElementById('btn-range-10y');
    const btnAll = document.getElementById('btn-range-all');
    const canvas = document.getElementById('gov-analytics-canvas');
    const wrapper = document.getElementById('chart-wrapper');

    const updatePresetButtons = (preset, sYear, eYear) => {
      this.activeRangePreset = preset;
      this.startYear = sYear;
      this.endYear = eYear;
      this.seriesConfigs.forEach(s => this.recalculateSeriesData(s));
      this.renderControls();
      requestAnimationFrame(() => this.drawChart());
      this.onRangeShortcutChange(sYear, eYear);
    };

    btn5y?.addEventListener('click', () => updatePresetButtons('5y', 2021, 2026));
    btn10y?.addEventListener('click', () => updatePresetButtons('10y', 2016, 2026));
    btnAll?.addEventListener('click', () => updatePresetButtons('all', 1990, 2026));

    document.getElementById('btn-chart-download-excel')?.addEventListener('click', () => {
      const raw = localStorage.getItem('registered_researcher_access');
      if (!raw) {
        // Prompt login/registration modal first
        openEmailRegistrationModal(() => {
          ExcelExporter.exportSeriesToExcel(this.seriesConfigs, this.activeRangePreset, 'Indikator_Ekonomi');
        }, 'Silakan daftarkan / konfirmasi email Anda terlebih dahulu sebelum mengunduh file data Excel (.xlsx). Setelah tersimpan, file akan langsung otomatis diunduh.');
      } else {
        // Already registered, download directly
        ExcelExporter.exportSeriesToExcel(this.seriesConfigs, this.activeRangePreset, 'Indikator_Ekonomi');
      }
    });

    if (canvas) {
      canvas.addEventListener('mousemove', (e) => this.handleCanvasMouseMove(e));
      canvas.addEventListener('mouseleave', () => this.handleCanvasMouseLeave());
      canvas.addEventListener('click', () => {
        if (this.hoveredYear) {
          this.onChartHoverYear(this.hoveredYear, this.activeSeriesTab);
        }
      });
    }

    // Auto-redraw on width resize only (prevents vertical feedback loops)
    if (window.ResizeObserver && wrapper) {
      if (this._resizeObserver) this._resizeObserver.disconnect();
      this._lastObservedWidth = Math.floor(wrapper.clientWidth);
      this._resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newWidth = Math.floor(entry.contentRect.width);
          if (Math.abs(newWidth - (this._lastObservedWidth || 0)) > 3) {
            this._lastObservedWidth = newWidth;
            requestAnimationFrame(() => this.drawChart());
          }
        }
      });
      this._resizeObserver.observe(wrapper);
    }
  }

  handleCanvasMouseMove(e) {
    const canvas = document.getElementById('gov-analytics-canvas');
    const tooltip = document.getElementById('chart-tooltip');
    if (!canvas || !tooltip || this.timeSlots.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Find nearest time slot
    let nearestSlot = null;
    let minDist = Infinity;

    for (const slot of this.timeSlots) {
      const dist = Math.abs(slot.x - mouseX);
      if (dist < minDist) {
        minDist = dist;
        nearestSlot = slot;
      }
    }

    if (nearestSlot && minDist < 45) {
      this.hoveredYear = nearestSlot.year;
      this.showComparativeTooltip(mouseX, mouseY, nearestSlot.year, rect);
      this.drawChart(); // Redraw with vertical crosshair
      this.onChartHoverYear(nearestSlot.year, this.activeSeriesTab);
    } else {
      this.handleCanvasMouseLeave();
    }
  }

  handleCanvasMouseLeave() {
    const tooltip = document.getElementById('chart-tooltip');
    if (tooltip) tooltip.classList.add('hidden');
    if (this.hoveredYear !== null) {
      this.hoveredYear = null;
      this.drawChart();
      this.onChartHoverYear(null, this.activeSeriesTab);
    }
  }

  showComparativeTooltip(mouseX, mouseY, year, canvasRect) {
    const tooltip = document.getElementById('chart-tooltip');
    if (!tooltip) return;

    // Extract observations for each series at this year
    const seriesRows = this.seriesConfigs.map((s, idx) => {
      const obs = s.data.find(d => d.period === year || d.period === String(year));
      // Find previous year for YoY diff
      const prevYear = String(parseInt(year) - 1);
      const prevObs = s.data.find(d => d.period === prevYear);

      let valStr = 'N/A';
      let yoyStr = '—';
      let yoyColor = 'text-slate-400';
      let statusBadge = '';

      if (obs && obs.value !== null && obs.value !== undefined) {
        valStr = `${Number(obs.value).toLocaleString('id-ID', { maximumFractionDigits: 2 })} ${s.effectiveUnit || s.unit}`;
        const st = (obs.status || 'N/A').toLowerCase();
        if (st === 'observed') {
          statusBadge = '<span class="status-badge status-observed text-[9px] px-1 py-0.2">Final</span>';
        } else if (st === 'provisional') {
          statusBadge = '<span class="status-badge status-provisional text-[9px] px-1 py-0.2">Sementara</span>';
        } else if (st === 'revised') {
          statusBadge = '<span class="status-badge status-revised text-[9px] px-1 py-0.2">Revisi</span>';
        } else {
          statusBadge = `<span class="status-badge status-na text-[9px] px-1 py-0.2">${obs.status || 'N/A'}</span>`;
        }

        if (prevObs && prevObs.value !== null && prevObs.value !== undefined && prevObs.value !== 0) {
          const diff = obs.value - prevObs.value;
          const diffPct = (diff / Math.abs(prevObs.value)) * 100;
          const isUp = diff > 0;
          const isDown = diff < 0;
          yoyStr = `${isUp ? '▲ +' : (isDown ? '▼ ' : '— ')}${Math.abs(diffPct).toFixed(2)}% (${diff > 0 ? '+' : ''}${Number(diff).toLocaleString('id-ID', { maximumFractionDigits: 2 })})`;
          yoyColor = isUp ? 'text-emerald-700 bg-emerald-100 font-bold' : (isDown ? 'text-rose-700 bg-rose-100 font-bold' : 'text-slate-700 bg-slate-100');
        }
      }

      return {
        series: s,
        idx,
        obs,
        valStr,
        yoyStr,
        yoyColor,
        statusBadge
      };
    });

    // Check regional driver note
    const matchedDriver = this.contextualDrivers.find(
      cd => cd.period === year || (cd.period && cd.period.startsWith(year))
    );

    tooltip.innerHTML = `
      <div class="bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xl rounded-md p-3 max-w-[360px] space-y-2 backdrop-blur-md">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-400 pb-1.5">
          <div class="font-mono font-bold text-[11px] text-slate-950 flex items-center gap-1">
            <span>📅</span> TA: ${year} [Nasional]
          </div>
          <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-900 border border-slate-400 font-bold">
            ${this.seriesConfigs.length} Var
          </span>
        </div>

        <!-- Comparative Multi-Series Matrix -->
        <div class="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5 scrollbar-thin">
          ${seriesRows.map(row => `
            <div class="bg-white text-slate-900 rounded p-2 border border-slate-300 text-[11px] font-mono space-y-1 shadow-xs">
              <!-- Series Title & Axis Badge -->
              <div class="flex items-center justify-between border-b border-slate-200 pb-0.5">
                <div class="flex items-center gap-1.5 truncate max-w-[220px]">
                  <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${row.series.color}"></span>
                  <span class="font-bold text-slate-900 truncate" title="${row.series.name}">${row.series.name}</span>
                  ${row.series.transformation && row.series.transformation !== 'RAW' ? `
                    <span class="text-[8px] px-1 py-0.2 rounded font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      ${row.series.transformation}
                    </span>
                  ` : ''}
                </div>
                <span class="text-[8.5px] px-1 py-0.2 rounded font-semibold ${row.series.axis === 'primary' ? 'bg-sky-100 text-sky-800 border border-sky-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}">
                  ${row.series.axis === 'primary' ? 'Kiri' : 'Kanan'}
                </span>
              </div>

              <!-- Value, YoY & Status -->
              <div class="flex items-baseline justify-between pt-0.5">
                <span class="text-slate-500 text-[9px] uppercase font-semibold">Nilai:</span>
                <span class="font-bold text-slate-900 tabular-nums text-xs">${row.valStr}</span>
              </div>
              <div class="flex items-center justify-between text-[9px] pt-0.5 border-t border-slate-100">
                <span class="text-slate-500">YoY:</span>
                <span class="px-1 py-0.2 rounded ${row.yoyColor}">${row.yoyStr}</span>
                <div>${row.statusBadge}</div>
              </div>

              <!-- Exact Provenance & Statutory Document Citations -->
              ${row.obs ? `
                <div class="bg-slate-50 rounded p-1.5 border border-slate-200 text-[9px] font-mono text-slate-800 space-y-0.5">
                  <div class="font-bold text-slate-900 truncate" title="${row.obs.publication_title}">
                    📜 ${row.obs.publication_title || 'Publikasi Resmi'}
                  </div>
                  <div class="text-[8.5px] text-slate-600 truncate">
                    🏛️ ${row.obs.source_institution || 'Kemenkeu RI'} ${row.obs.page_reference ? `• ${row.obs.page_reference}` : ''}
                  </div>
                  ${row.obs.document_url ? `
                    <div class="pt-0.5">
                      <a 
                        href="${row.obs.document_url}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="text-sky-700 hover:text-sky-900 underline font-semibold inline-flex items-center gap-0.5"
                      >
                        <span>🔗 Dokumen Resmi Asli</span>
                        <svg class="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        ${matchedDriver ? `
          <div class="bg-sky-900/40 border border-sky-700/60 rounded p-1.5 text-[9.5px] text-slate-200 space-y-0.5 font-sans">
            <div class="font-mono font-bold text-sky-300 flex items-center gap-1 text-[9.5px]">
              <span>📍</span> Pendorong (${matchedDriver.province_name}):
            </div>
            <p class="leading-tight text-slate-300 text-[9px] line-clamp-2">${matchedDriver.explanation}</p>
          </div>
        ` : ''}
      </div>
    `;

    tooltip.classList.remove('hidden');

    const tooltipWidth = 360;
    const tooltipHeight = 260;
    let left = mouseX + 15;
    let top = mouseY - 20;

    if (left + tooltipWidth > canvasRect.width) {
      left = mouseX - tooltipWidth - 15;
    }
    if (left < 10) left = 10;
    if (top + tooltipHeight > canvasRect.height) {
      top = Math.max(10, canvasRect.height - tooltipHeight - 10);
    }
    if (top < 10) top = 10;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  drawChart() {
    const canvas = document.getElementById('gov-analytics-canvas');
    if (!canvas) return;

    const wrapper = document.getElementById('chart-wrapper') || canvas.parentElement;
    const width = Math.max(Math.floor(wrapper.clientWidth) - 16, 400);
    const height = 260; // Compact fixed chart drawing height

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // 1. Gather all unique years from active series
    const allYearsSet = new Set();
    this.seriesConfigs.forEach(s => {
      if (s.data && s.data.length > 0) {
        s.data.forEach(d => {
          if (d.period) allYearsSet.add(String(d.period));
        });
      }
    });

    // If empty or fewer than 2 years, generate standard range years
    if (allYearsSet.size < 2) {
      for (let y = this.startYear; y <= this.endYear; y++) {
        allYearsSet.add(String(y));
      }
    }

    const sortedYears = Array.from(allYearsSet).sort((a, b) => a.localeCompare(b));

    // 2. Compute Primary & Secondary Series
    const primarySeries = this.seriesConfigs.filter(s => s.axis === 'primary');
    const secondarySeries = this.seriesConfigs.filter(s => s.axis === 'secondary');

    // Dual-axis is active only if both sides have at least 1 series
    const hasSecondaryAxis = secondarySeries.length > 0 && primarySeries.length > 0;

    const padding = {
      top: 22,
      right: hasSecondaryAxis ? 75 : 24,
      bottom: 22,
      left: 75
    };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Left (Primary) Axis Scale
    let primaryMin = 0;
    let primaryMax = 10;

    const primaryVals = [];
    primarySeries.forEach(s => {
      (s.data || []).forEach(d => {
        if (d.value !== null && d.value !== undefined && d.status !== 'N/A') {
          const v = Number(d.value);
          if (!isNaN(v)) primaryVals.push(v);
        }
      });
    });

    if (primaryVals.length > 0) {
      const rawMin = Math.min(...primaryVals);
      const rawMax = Math.max(...primaryVals);
      const span = (rawMax - rawMin) === 0 ? (Math.abs(rawMax) || 10) : (rawMax - rawMin);

      if (rawMin >= 0) {
        primaryMin = 0; // Baseline zero
        primaryMax = rawMax + span * 0.12; // 12% headroom so points don't touch ceiling
      } else {
        primaryMin = rawMin - span * 0.08;
        primaryMax = rawMax + span * 0.12;
      }
      if (primaryMin === primaryMax) primaryMax += 10;
    }

    // Right (Secondary) Axis Scale
    let secondaryMin = 0;
    let secondaryMax = 10;

    const secondaryVals = [];
    secondarySeries.forEach(s => {
      (s.data || []).forEach(d => {
        if (d.value !== null && d.value !== undefined && d.status !== 'N/A') {
          const v = Number(d.value);
          if (!isNaN(v)) secondaryVals.push(v);
        }
      });
    });

    if (secondaryVals.length > 0) {
      const rawMin = Math.min(...secondaryVals);
      const rawMax = Math.max(...secondaryVals);
      const span = (rawMax - rawMin) === 0 ? (Math.abs(rawMax) || 10) : (rawMax - rawMin);

      if (rawMin >= 0) {
        secondaryMin = 0;
        secondaryMax = rawMax + span * 0.12;
      } else {
        secondaryMin = rawMin - span * 0.08;
        secondaryMax = rawMax + span * 0.12;
      }
      if (secondaryMin === secondaryMax) secondaryMax += 10;
    }

    // Fallback: If all series were moved to secondary, copy scale to left axis
    if (primaryVals.length === 0 && secondaryVals.length > 0) {
      primaryMin = secondaryMin;
      primaryMax = secondaryMax;
    }

    // Check 100% Stacked bar modes
    const isPrimaryStacked100 = primarySeries.some(s => s.type === 'bar' && s.barMode === 'stacked100');
    if (isPrimaryStacked100) {
      primaryMin = 0;
      primaryMax = 100;
    }

    const isSecondaryStacked100 = secondarySeries.some(s => s.type === 'bar' && s.barMode === 'stacked100');
    if (isSecondaryStacked100) {
      secondaryMin = 0;
      secondaryMax = 100;
    }

    // 4. Calculate Time Slots Positions
    const numPoints = sortedYears.length;
    const stepX = numPoints > 1 ? chartW / (numPoints - 1) : chartW / 2;

    this.timeSlots = sortedYears.map((yr, idx) => ({
      year: yr,
      x: padding.left + idx * stepX,
      width: stepX
    }));

    // 5. Draw Background Grid Lines & Left Y-Axis Labels
    const yTicks = 5;
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748B';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';

    for (let i = 0; i <= yTicks; i++) {
      const ratio = i / yTicks;
      const y = padding.top + chartH - ratio * chartH;
      const val = primaryMin + ratio * (primaryMax - primaryMin);

      // Horizontal grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Left axis tick label
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'right';
      const labelText = isPrimaryStacked100 ? `${val.toFixed(0)}%` : Number(val).toLocaleString('id-ID', { maximumFractionDigits: 1 });
      ctx.fillText(labelText, padding.left - 8, y + 3.5);

      // Right axis tick label (if secondary axis active)
      if (hasSecondaryAxis) {
        const secVal = secondaryMin + ratio * (secondaryMax - secondaryMin);
        ctx.fillStyle = '#059669';
        ctx.textAlign = 'left';
        const secLabelText = isSecondaryStacked100 ? `${secVal.toFixed(0)}%` : Number(secVal).toLocaleString('id-ID', { maximumFractionDigits: 1 });
        ctx.fillText(secLabelText, width - padding.right + 8, y + 3.5);
      }
    }

    // Axis Title Headers
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillStyle = '#0284C7';
    ctx.textAlign = 'left';
    const leftUnit = primarySeries[0] 
      ? (isPrimaryStacked100 ? 'Proporsi (%)' : (primarySeries[0].effectiveUnit || primarySeries[0].unit)) 
      : (secondarySeries[0] ? (secondarySeries[0].effectiveUnit || secondarySeries[0].unit) : '');
    ctx.fillText(`← Sumbu Kiri (Utama): ${leftUnit}`, padding.left, padding.top - 10);

    if (hasSecondaryAxis) {
      ctx.fillStyle = '#059669';
      ctx.textAlign = 'right';
      const rightUnit = secondarySeries[0] ? (isSecondaryStacked100 ? 'Proporsi (%)' : (secondarySeries[0].effectiveUnit || secondarySeries[0].unit)) : '';
      ctx.fillText(`${rightUnit} : Sumbu Kanan (Sekunder) →`, width - padding.right, padding.top - 10);
    }

    // 6. Draw X-Axis Year Labels (Non-overlapping)
    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'center';
    ctx.font = '10px JetBrains Mono, monospace';

    const minLabelSpacing = 44;
    let lastDrawnX = -Infinity;

    this.timeSlots.forEach((slot, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === this.timeSlots.length - 1;
      const hasEnoughSpace = (slot.x - lastDrawnX) >= minLabelSpacing;

      if (isFirst) {
        ctx.fillText(slot.year, slot.x, height - padding.bottom + 16);
        lastDrawnX = slot.x;
      } else if (isLast) {
        if (slot.x - lastDrawnX >= 34) {
          ctx.fillText(slot.year, slot.x, height - padding.bottom + 16);
        }
      } else if (hasEnoughSpace) {
        const lastSlot = this.timeSlots[this.timeSlots.length - 1];
        if (!lastSlot || (lastSlot.x - slot.x) >= 34) {
          ctx.fillText(slot.year, slot.x, height - padding.bottom + 16);
          lastDrawnX = slot.x;
        }
      }
    });

    // 7. Draw Vertical Hover Crosshair Line
    if (this.hoveredYear) {
      const activeSlot = this.timeSlots.find(s => s.year === this.hoveredYear);
      if (activeSlot) {
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(activeSlot.x, padding.top);
        ctx.lineTo(activeSlot.x, padding.top + chartH);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Helper to format values strictly with XX.XXX,XX format
    const formatAnchorValue = (v) => {
      if (v === null || v === undefined || isNaN(Number(v))) return '-';
      return Number(v).toLocaleString('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };

    // 8. Render Bar Series (Grouped or 100% Stacked)
    const barSeries = this.seriesConfigs.filter(s => s.type === 'bar');
    if (barSeries.length > 0) {
      const barSlotWidth = Math.min(40, stepX * 0.75);

      this.timeSlots.forEach((slot) => {
        const yr = slot.year;
        const isStacked100 = barSeries.some(s => s.barMode === 'stacked100');

        if (isStacked100) {
          let totalSum = 0;
          barSeries.forEach(s => {
            const obs = (s.data || []).find(d => String(d.period) === String(yr));
            if (obs && obs.value !== null && obs.value > 0) {
              totalSum += Number(obs.value);
            }
          });

          if (totalSum > 0) {
            let currentPctBottom = 0;
            barSeries.forEach(s => {
              const obs = (s.data || []).find(d => String(d.period) === String(yr));
              if (obs && obs.value !== null && obs.value > 0) {
                const pct = (Number(obs.value) / totalSum) * 100;
                const yBottom = padding.top + chartH - (currentPctBottom / 100) * chartH;
                const barH = (pct / 100) * chartH;
                const yTop = yBottom - barH;

                ctx.fillStyle = s.color;
                ctx.fillRect(slot.x - barSlotWidth / 2, yTop, barSlotWidth, barH);
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 0.75;
                ctx.strokeRect(slot.x - barSlotWidth / 2, yTop, barSlotWidth, barH);

                currentPctBottom += pct;
              }
            });
          }
        } else {
          // Grouped / Side-by-Side Bars
          const subBarWidth = barSlotWidth / barSeries.length;
          barSeries.forEach((s, bIdx) => {
            const obs = (s.data || []).find(d => String(d.period) === String(yr));
            if (obs && obs.value !== null && obs.value !== undefined && obs.status !== 'N/A') {
              const axisMin = s.axis === 'secondary' ? secondaryMin : primaryMin;
              const axisMax = s.axis === 'secondary' ? secondaryMax : primaryMax;
              const range = axisMax - axisMin || 1;

              const barH = Math.max(2, ((Number(obs.value) - axisMin) / range) * chartH);
              const barX = (slot.x - barSlotWidth / 2) + bIdx * subBarWidth;
              const barY = padding.top + chartH - barH;

              ctx.fillStyle = s.color;
              ctx.fillRect(barX + 1, barY, subBarWidth - 2, barH);
            }
          });
        }
      });
    }

    // 9. Collect Points and Draw Polylines for Line Series
    const lineSeries = this.seriesConfigs.filter(s => s.type === 'line');
    const allBadges = [];

    lineSeries.forEach((s, sIdx) => {
      const axisMin = s.axis === 'secondary' ? secondaryMin : primaryMin;
      const axisMax = s.axis === 'secondary' ? secondaryMax : primaryMax;
      const range = axisMax - axisMin || 1;

      const points = [];

      this.timeSlots.forEach((slot) => {
        const obs = (s.data || []).find(d => String(d.period) === String(slot.year));
        if (obs && obs.value !== null && obs.value !== undefined && obs.status !== 'N/A') {
          const valNum = Number(obs.value);
          if (!isNaN(valNum)) {
            const y = padding.top + chartH - ((valNum - axisMin) / range) * chartH;
            points.push({ x: slot.x, y, obs, val: valNum, year: slot.year });
          }
        }
      });

      if (points.length > 1) {
        // Draw Polyline
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        points.forEach((pt, pIdx) => {
          if (pIdx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Draw Data Points
        points.forEach(pt => {
          const isHovered = this.hoveredYear === pt.year;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isHovered ? 6 : 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = s.color;
          ctx.lineWidth = isHovered ? 3 : 2;
          ctx.stroke();

          if (isHovered) {
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      } else if (points.length === 1) {
        const pt = points[0];
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Collect 4 Anchor Points for this series: Awal, Akhir, Min, Max
      if (points.length > 0) {
        const firstPt = points[0];
        const lastPt = points[points.length - 1];
        const minPt = points.reduce((min, p) => (p.val < min.val ? p : min), points[0]);
        const maxPt = points.reduce((max, p) => (p.val > max.val ? p : max), points[0]);

        const anchorMap = new Map();

        const registerAnchor = (pt, role, isTop) => {
          if (!pt) return;
          const key = `${pt.year}`;
          if (!anchorMap.has(key)) {
            anchorMap.set(key, { pt, roles: [role], isTop });
          } else {
            const entry = anchorMap.get(key);
            if (!entry.roles.includes(role)) {
              entry.roles.push(role);
            }
            if (role === 'Max') entry.isTop = true;
            if (role === 'Min') entry.isTop = false;
          }
        };

        registerAnchor(firstPt, 'Awal', false);
        registerAnchor(minPt, 'Min', false);
        registerAnchor(maxPt, 'Max', true);
        registerAnchor(lastPt, 'Akhir', true);

        ctx.font = 'bold 9px JetBrains Mono, monospace';

        anchorMap.forEach(({ pt, roles, isTop }) => {
          const roleText = roles.join('/');
          const valFormatted = formatAnchorValue(pt.val);
          const text = `${roleText}: ${valFormatted}`;
          const textWidth = ctx.measureText(text).width;
          const padX = 4.5;
          const w = textWidth + padX * 2 + 7; // extra space for indicator dot
          const h = 14.5;

          // Initial placement
          let x = pt.x - w / 2;
          let y = isTop ? (pt.y - h - 7) : (pt.y + 7);

          allBadges.push({
            series: s,
            sIdx,
            pt,
            roles,
            isTop,
            text,
            valFormatted,
            w,
            h,
            x,
            y,
            anchorX: pt.x,
            anchorY: pt.y,
            color: s.color
          });
        });
      }
    });

    // 10. UNIFIED COLLISION RESOLUTION ENGINE (Multi-Pass Non-Overlapping Solver)
    // Sort all badges horizontally then vertically
    allBadges.sort((a, b) => a.anchorX - b.anchorX || a.anchorY - b.anchorY);

    for (let pass = 0; pass < 12; pass++) {
      let collided = false;
      for (let i = 0; i < allBadges.length; i++) {
        for (let j = i + 1; j < allBadges.length; j++) {
          const b1 = allBadges[i];
          const b2 = allBadges[j];

          // Check AABB collision with margin
          const overlapX = (b1.x < b2.x + b2.w + 3) && (b1.x + b1.w + 3 > b2.x);
          const overlapY = (b1.y < b2.y + b2.h + 3) && (b1.y + b1.h + 3 > b2.y);

          if (overlapX && overlapY) {
            collided = true;
            const diffY = (b2.y + b2.h / 2) - (b1.y + b1.h / 2);
            const neededY = (b1.h + b2.h) / 2 + 5 - Math.abs(diffY);

            if (diffY >= 0) {
              b1.y -= neededY / 2;
              b2.y += neededY / 2;
            } else {
              b1.y += neededY / 2;
              b2.y -= neededY / 2;
            }

            // Slight horizontal stagger if points are at the exact same anchor
            if (Math.abs(b1.anchorX - b2.anchorX) < 12) {
              if (b1.sIdx < b2.sIdx) {
                b1.x -= 7;
                b2.x += 7;
              } else {
                b1.x += 7;
                b2.x -= 7;
              }
            }
          }
        }
      }
      if (!collided) break;
    }

    // Strict boundary clamping
    allBadges.forEach(b => {
      if (b.x < padding.left + 2) b.x = padding.left + 2;
      if (b.x + b.w > width - padding.right - 2) b.x = width - padding.right - b.w - 2;
      if (b.y < padding.top + 2) b.y = padding.top + 2;
      if (b.y + b.h > height - padding.bottom - 2) b.y = height - padding.bottom - b.h - 2;
    });

    // 11. Render Leader Lines for Displaced Badges
    allBadges.forEach(b => {
      const dist = Math.hypot(b.x + b.w / 2 - b.anchorX, b.y + b.h / 2 - b.anchorY);
      if (dist > 14) {
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(b.anchorX, b.anchorY);
        const targetY = b.y > b.anchorY ? b.y : b.y + b.h;
        const targetX = Math.max(b.x + 4, Math.min(b.x + b.w - 4, b.anchorX));
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // 12. Highlight Anchor Point Circles on Line Series
    allBadges.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.anchorX, b.anchorY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 13. Render Badges with Drop Shadow & Contrast
    allBadges.forEach(b => {
      // White Pill with Color Border
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 1.3;

      const r = 3;
      ctx.beginPath();
      ctx.moveTo(b.x + r, b.y);
      ctx.lineTo(b.x + b.w - r, b.y);
      ctx.quadraticCurveTo(b.x + b.w, b.y, b.x + b.w, b.y + r);
      ctx.lineTo(b.x + b.w, b.y + b.h - r);
      ctx.quadraticCurveTo(b.x + b.w, b.y + b.h, b.x + b.w - r, b.y + b.h);
      ctx.lineTo(b.x + r, b.y + b.h);
      ctx.quadraticCurveTo(b.x, b.y + b.h, b.x, b.y + b.h - r);
      ctx.lineTo(b.x, b.y + r);
      ctx.quadraticCurveTo(b.x, b.y, b.x + r, b.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Colored Indicator Dot inside Badge
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x + 6, b.y + b.h / 2, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Badge Text
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.fillStyle = '#0F172A';
      ctx.textAlign = 'left';
      ctx.fillText(b.text, b.x + 11, b.y + b.h - 4);
    });
  }
}
