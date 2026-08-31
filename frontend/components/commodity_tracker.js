// ==============================================================================
// NERACA KOMODITAS, PANGAN & HASIL BUMI TRACKER COMPONENT
// Multi-Variable Comparative Chart Engine (1-3 Series, Dual Y-Axis, Granularity, Line/Bar)
// Tracking Produksi, Konsumsi, Ekspor, Impor, Kode HS & Klasifikasi APBN/LKPP (1990 - 2026)
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { ExcelExporter } from '../services/excel_exporter.js';
import { openEmailRegistrationModal } from './header.js';

export class CommodityTrackerComponent {
  constructor(containerId = 'tab-content-commodities') {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);

    // State
    this.categoriesData = null;
    this.activeDivision = 'PERTANIAN_PETERNAKAN'; // 'PERTANIAN_PETERNAKAN' | 'HASIL_BUMI'
    this.activeGroup = 'ALL';
    this.activeHsChapter = 'ALL';
    this.activeApbnCategory = 'ALL';
    this.activeViewMode = 'DETAIL'; // 'DETAIL' | 'MATRIX'
    this.selectedCommodityId = 'COM-AGRI-001-BERAS';
    this.selectedYear = '2024';
    this.activeRangePreset = 'all'; // '5y' | '10y' | 'all'
    this.startYear = 1990;
    this.endYear = 2026;
    this.balanceData = null;
    this.matrixData = null;
    this.isLoading = false;

    // Multi-Series Comparative Config for Chart (Max 3 Variables)
    this.seriesConfigs = [];
    this.activeSeriesTab = 0; // 0, 1, 2
    this.hoveredYear = null;
    this.timeSlots = [];
    this.commodityBalancesCache = {}; // Cache commodityId -> balance data
  }

  async init() {
    if (!this.container) return;
    try {
      this.isLoading = true;
      this.renderSkeleton();

      // Fetch master metadata structure
      this.categoriesData = await ApiClient.fetchCommodityCategories();
      
      // Default selection depending on division
      if (!this.selectedCommodityId || this.selectedCommodityId.startsWith('ALL_') || this.selectedCommodityId.startsWith('AGG_')) {
        this.selectedCommodityId = this.activeDivision === 'HASIL_BUMI' ? 'ALL_HASIL_BUMI' : 'COM-AGRI-001-BERAS';
      }

      await this.loadBalanceData(this.selectedCommodityId);
      this.initSeriesConfigs();
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
        <div class="text-xs">Memuat Basis Data Neraca Komoditas, Kode HS & Pemetaan APBN/LKPP (1990 - 2026)...</div>
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
    if (!this.commodityBalancesCache[commodityId]) {
      this.commodityBalancesCache[commodityId] = await ApiClient.fetchCommodityBalance(commodityId, 1990, 2026);
    }
    this.balanceData = this.commodityBalancesCache[commodityId];
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
    this.initSeriesConfigs();
    if (this.activeViewMode === 'MATRIX') {
      await this.loadMatrixData();
    }
    this.render();
  }

  // Generate standard list of indicators/variables available for comparison
  getAvailableIndicatorsList() {
    if (!this.categoriesData) return [];
    const isHasilBumi = this.activeDivision === 'HASIL_BUMI';
    const list = [];

    // 1. Aggregates
    if (isHasilBumi) {
      list.push(
        { id: 'ALL_HASIL_BUMI::apbn_realization_idr_billion', name: '⭐ Semua Hasil Bumi - Realisasi PNBP SDA', unit: 'Rp Miliar', commodityId: 'ALL_HASIL_BUMI', metricKey: 'apbn_realization_idr_billion', isAggregate: true, group: 'Agregat Hasil Bumi' },
        { id: 'AGG_TAMBANG::apbn_realization_idr_billion', name: '⛏️ Komposisi Komoditas Tambang - PNBP SDA', unit: 'Rp Miliar', commodityId: 'AGG_TAMBANG', metricKey: 'apbn_realization_idr_billion', isAggregate: true, group: 'Agregat Hasil Bumi' },
        { id: 'AGG_NON_TAMBANG::apbn_realization_idr_billion', name: '🌿 Komposisi Non-Tambang - PNBP Kehutanan/EBT', unit: 'Rp Miliar', commodityId: 'AGG_NON_TAMBANG', metricKey: 'apbn_realization_idr_billion', isAggregate: true, group: 'Agregat Hasil Bumi' }
      );
    } else {
      list.push(
        { id: 'ALL_PERTANIAN::apbn_realization_idr_billion', name: '⭐ Semua Pertanian & Peternakan - Realisasi APBN', unit: 'Rp Miliar', commodityId: 'ALL_PERTANIAN', metricKey: 'apbn_realization_idr_billion', isAggregate: true, group: 'Agregat Pertanian' },
        { id: 'AGG_PERTANIAN_TANAMAN::apbn_realization_idr_billion', name: '🌾 Komoditas Pertanian - Realisasi APBN Pangan', unit: 'Rp Miliar', commodityId: 'AGG_PERTANIAN_TANAMAN', metricKey: 'apbn_realization_idr_billion', isAggregate: true, group: 'Agregat Pertanian' },
        { id: 'AGG_PERAIRAN::apbn_realization_idr_billion', name: '🐟 Komoditas Perairan - PNBP & Sarpras KKP', unit: 'Rp Miliar', commodityId: 'AGG_PERAIRAN', metricKey: 'apbn_realization_idr_billion', isAggregate: true, group: 'Agregat Pertanian' },
        { id: 'AGG_PETERNAKAN::apbn_realization_idr_billion', name: '🐄 Komoditas Peternakan - Bantuan Ternak APBN', unit: 'Rp Miliar', commodityId: 'AGG_PETERNAKAN', metricKey: 'apbn_realization_idr_billion', isAggregate: true, group: 'Agregat Pertanian' }
      );
    }

    // 2. Individual Commodity Metrics
    const divComms = this.categoriesData.commodities.filter(c => c.division === this.activeDivision);

    divComms.forEach(c => {
      const gName = `${c.name} (${c.unit})`;
      list.push(
        { id: `${c.id}::production`, name: `${c.name} - Volume Produksi`, unit: c.unit, commodityId: c.id, metricKey: 'production', group: gName },
        { id: `${c.id}::consumption`, name: `${c.name} - Volume Konsumsi`, unit: c.unit, commodityId: c.id, metricKey: 'consumption', group: gName },
        { id: `${c.id}::import_volume`, name: `${c.name} - Volume Impor`, unit: c.unit, commodityId: c.id, metricKey: 'import_volume', group: gName },
        { id: `${c.id}::export_volume`, name: `${c.name} - Volume Ekspor`, unit: c.unit, commodityId: c.id, metricKey: 'export_volume', group: gName },
        { id: `${c.id}::export_value_usd_million`, name: `${c.name} - Nilai Ekspor ($M)`, unit: '$M USD', commodityId: c.id, metricKey: 'export_value_usd_million', group: gName },
        { id: `${c.id}::import_value_usd_million`, name: `${c.name} - Nilai Impor ($M)`, unit: '$M USD', commodityId: c.id, metricKey: 'import_value_usd_million', group: gName },
        { id: `${c.id}::apbn_realization_idr_billion`, name: `${c.name} - Realisasi APBN/PNBP`, unit: 'Rp Miliar', commodityId: c.id, metricKey: 'apbn_realization_idr_billion', group: gName },
        { id: `${c.id}::apbn_target_idr_billion`, name: `${c.name} - Target Pagu UU APBN`, unit: 'Rp Miliar', commodityId: c.id, metricKey: 'apbn_target_idr_billion', group: gName },
        { id: `${c.id}::ssr_percent`, name: `${c.name} - Rasio Swasembada (SSR)`, unit: 'Persen (%)', commodityId: c.id, metricKey: 'ssr_percent', group: gName },
        { id: `${c.id}::idr_percent`, name: `${c.name} - Ketergantungan Impor (IDR)`, unit: 'Persen (%)', commodityId: c.id, metricKey: 'idr_percent', group: gName }
      );
    });

    return list;
  }

  initSeriesConfigs() {
    const available = this.getAvailableIndicatorsList();
    const isHasilBumi = this.activeDivision === 'HASIL_BUMI';

    let defaultIndicatorId = '';
    if (this.selectedCommodityId.startsWith('ALL_') || this.selectedCommodityId.startsWith('AGG_')) {
      defaultIndicatorId = `${this.selectedCommodityId}::apbn_realization_idr_billion`;
    } else {
      defaultIndicatorId = `${this.selectedCommodityId}::production`;
    }

    const defaultMeta = available.find(i => i.id === defaultIndicatorId) || available[0];

    this.seriesConfigs = [
      {
        id: 'series-1',
        indicatorId: defaultMeta.id,
        commodityId: defaultMeta.commodityId,
        metricKey: defaultMeta.metricKey,
        name: defaultMeta.name,
        unit: defaultMeta.unit,
        effectiveUnit: defaultMeta.unit,
        color: '#0284C7', // Sky Blue
        axis: 'primary',
        type: (defaultMeta.isAggregate || this.selectedCommodityId.startsWith('ALL_') || this.selectedCommodityId.startsWith('AGG_')) ? 'bar' : 'line',
        barMode: 'grouped',
        transformation: 'RAW',
        rawData: [],
        data: []
      }
    ];

    this.activeSeriesTab = 0;
    this.recalculateSeriesData(this.seriesConfigs[0]);
  }

  getAvailableTransformations(indicatorMeta, rawData = []) {
    const list = [{ id: 'RAW', label: 'Data Asli (Raw)' }];
    const count = rawData.length || 37;
    const name = ((indicatorMeta && indicatorMeta.name) || '').toLowerCase();
    const isRate = name.includes('rasio') || name.includes('persen') || (indicatorMeta && indicatorMeta.unit === 'Persen (%)');

    if (!isRate && count >= 6) {
      list.push({ id: 'YOY', label: 'YoY (% Pertumbuhan Tahunan)' });
    }
    if (count >= 6) {
      list.push({ id: 'AVG_L3Y', label: 'AVG L3Y (Rata-rata 3 Tahun)' });
    }
    if (count >= 10) {
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
        if (idx >= 1) {
          const prev = Number(sortedRaw[idx - 1]?.value);
          if (!isNaN(prev) && prev !== 0 && sortedRaw[idx - 1]?.value !== null) {
            calculated = ((val - prev) / Math.abs(prev)) * 100;
          }
        }
      } else if (trans === 'AVG_L3Y') {
        if (idx >= 2) {
          const w = [sortedRaw[idx - 2], sortedRaw[idx - 1], sortedRaw[idx]];
          const valid = w.map(x => Number(x?.value)).filter(v => !isNaN(v) && v !== null);
          if (valid.length === 3) {
            calculated = valid.reduce((a, b) => a + b, 0) / 3;
          }
        }
      } else if (trans === 'AVG_L6Y') {
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
    const balance = this.commodityBalancesCache[series.commodityId];
    if (!balance || !balance.records) {
      series.rawData = [];
      series.data = [];
      return;
    }

    // Build raw point series from records
    series.rawData = balance.records.map(r => {
      let val = null;
      if (series.metricKey === 'production') val = r.production;
      else if (series.metricKey === 'consumption') val = r.consumption;
      else if (series.metricKey === 'import_volume') val = r.import_volume;
      else if (series.metricKey === 'export_volume') val = r.export_volume;
      else if (series.metricKey === 'export_value_usd_million') val = r.export_value_usd_million;
      else if (series.metricKey === 'import_value_usd_million') val = r.import_value_usd_million;
      else if (series.metricKey === 'apbn_realization_idr_billion') val = r.apbn_realization_idr_billion;
      else if (series.metricKey === 'apbn_target_idr_billion') val = r.apbn_target_idr_billion;
      else if (series.metricKey === 'ssr_percent') val = r.ssr_percent;
      else if (series.metricKey === 'idr_percent') val = r.idr_percent;
      else val = r.production;

      return {
        period: r.period,
        value: val,
        status: r.period === '2026' ? 'Provisional' : 'Observed',
        publication_title: r.apbn_statute_law || balance.commodity.legal_basis,
        source_institution: balance.commodity.source_institution,
        document_url: null,
        breakdown: r.breakdown
      };
    }).sort((a, b) => String(a.period).localeCompare(String(b.period)));

    const trans = series.transformation || 'RAW';
    const transformed = this.computeTransformation(series.rawData, trans, series.unit);

    series.data = transformed.filter(d => {
      const yr = parseInt(d.period);
      return isNaN(yr) || (yr >= this.startYear && yr <= this.endYear);
    });

    if (trans === 'YOY') {
      series.effectiveUnit = 'Persen (%)';
    } else if (trans === 'AVG_L3Y') {
      series.effectiveUnit = `${series.unit} (AVG 3 Thn)`;
    } else if (trans === 'AVG_L6Y') {
      series.effectiveUnit = `${series.unit} (AVG 6 Thn)`;
    } else {
      series.effectiveUnit = series.unit;
    }
  }

  async addComparisonSeries() {
    if (this.seriesConfigs.length >= 3) return; // Maks. 3 Variabel Rule

    const newIdx = this.seriesConfigs.length;
    const available = this.getAvailableIndicatorsList();
    const selectedIds = this.seriesConfigs.map(s => s.indicatorId);
    const candidate = available.find(ind => !selectedIds.includes(ind.id)) || available[0];

    const colors = ['#0284C7', '#10B981', '#F59E0B']; // Sky Blue, Emerald, Amber
    const defaultAxis = candidate && candidate.unit !== this.seriesConfigs[0].unit ? 'secondary' : 'primary';

    const newSeries = {
      id: `series-${newIdx + 1}`,
      indicatorId: candidate.id,
      commodityId: candidate.commodityId,
      metricKey: candidate.metricKey,
      name: candidate.name,
      unit: candidate.unit,
      effectiveUnit: candidate.unit,
      color: colors[newIdx] || '#8B5CF6',
      axis: defaultAxis,
      type: candidate.isAggregate ? 'bar' : 'line',
      barMode: 'grouped',
      transformation: 'RAW',
      rawData: [],
      data: []
    };

    if (!this.commodityBalancesCache[newSeries.commodityId]) {
      this.commodityBalancesCache[newSeries.commodityId] = await ApiClient.fetchCommodityBalance(newSeries.commodityId, 1990, 2026);
    }

    this.seriesConfigs.push(newSeries);
    this.activeSeriesTab = newIdx;
    this.recalculateSeriesData(newSeries);

    this.renderControls();
    requestAnimationFrame(() => this.drawChart());
  }

  removeComparisonSeries(idx) {
    if (idx === 0 || this.seriesConfigs.length <= 1) return;
    this.seriesConfigs.splice(idx, 1);
    this.activeSeriesTab = Math.min(this.activeSeriesTab, this.seriesConfigs.length - 1);
    this.renderControls();
    requestAnimationFrame(() => this.drawChart());
  }

  async updateSeriesIndicator(idx, newIndicatorId) {
    const s = this.seriesConfigs[idx];
    if (!s) return;

    const available = this.getAvailableIndicatorsList();
    const indMeta = available.find(i => i.id === newIndicatorId);
    if (!indMeta) return;

    s.indicatorId = newIndicatorId;
    s.commodityId = indMeta.commodityId;
    s.metricKey = indMeta.metricKey;
    s.name = indMeta.name;
    s.unit = indMeta.unit;
    s.effectiveUnit = indMeta.unit;
    s.transformation = 'RAW';

    if (idx > 0 && s.unit !== this.seriesConfigs[0].unit) {
      s.axis = 'secondary';
    }

    if (!this.commodityBalancesCache[s.commodityId]) {
      this.commodityBalancesCache[s.commodityId] = await ApiClient.fetchCommodityBalance(s.commodityId, 1990, 2026);
    }

    this.recalculateSeriesData(s);
    this.renderControls();
    requestAnimationFrame(() => this.drawChart());
  }

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
    const isAggregate = this.selectedCommodityId?.startsWith('ALL_') || this.selectedCommodityId?.startsWith('AGG_');

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

    const scopedHsChapters = this.getDivisionHsChapters();

    const renderAggregateOptions = () => {
      if (isHasilBumi) {
        return `
          <optgroup label="📊 Pilihan Komposisi Stacking Bar YoY:">
            <option value="ALL_HASIL_BUMI" ${this.selectedCommodityId === 'ALL_HASIL_BUMI' ? 'selected' : ''} class="font-bold text-indigo-950 bg-indigo-50">
              ⭐ Semua Hasil Bumi (Ditambang & Tidak Ditambang)
            </option>
            <option value="AGG_TAMBANG" ${this.selectedCommodityId === 'AGG_TAMBANG' ? 'selected' : ''} class="font-bold text-amber-950 bg-amber-50">
              ⛏️ 1. Komposisi Komoditas Tambang (Batubara, Nikel, Tembaga, Minyak, Gas)
            </option>
            <option value="AGG_NON_TAMBANG" ${this.selectedCommodityId === 'AGG_NON_TAMBANG' ? 'selected' : ''} class="font-bold text-emerald-950 bg-emerald-50">
              🌿 2. Komposisi Hasil Bumi Non-Tambang (Kehutanan, Rumput Laut, Panas Bumi)
            </option>
          </optgroup>
        `;
      } else {
        return `
          <optgroup label="📊 Pilihan Komposisi Stacking Bar YoY:">
            <option value="ALL_PERTANIAN" ${this.selectedCommodityId === 'ALL_PERTANIAN' ? 'selected' : ''} class="font-bold text-indigo-950 bg-indigo-50">
              ⭐ Semua Pertanian & Peternakan (Darat & Air)
            </option>
            <option value="AGG_PERTANIAN_TANAMAN" ${this.selectedCommodityId === 'AGG_PERTANIAN_TANAMAN' ? 'selected' : ''} class="font-bold text-emerald-950 bg-emerald-50">
              🌾 1. Komoditas Pertanian (Beras, Jagung, Kedelai, Gula, Bawang, Sawit)
            </option>
            <option value="AGG_PERAIRAN" ${this.selectedCommodityId === 'AGG_PERAIRAN' ? 'selected' : ''} class="font-bold text-sky-950 bg-sky-50">
              🐟 2. Komoditas Perairan (Laut & Darat: Ikan Tuna/TCT & Udang)
            </option>
            <option value="AGG_PETERNAKAN" ${this.selectedCommodityId === 'AGG_PETERNAKAN' ? 'selected' : ''} class="font-bold text-purple-950 bg-purple-50">
              🐄 3. Komoditas Peternakan (Daging Sapi/Kerbau & Daging Ayam Ras)
            </option>
          </optgroup>
        `;
      }
    };

    this.container.innerHTML = `
      <div class="space-y-4 font-sans text-slate-900">
        
        <!-- 1. HEADER TITLE BANNER -->
        <div class="bg-gradient-to-r ${isHasilBumi ? 'from-stone-900 via-stone-800 to-amber-950' : 'from-slate-900 via-emerald-950 to-slate-900'} text-white p-4 sm:p-5 rounded-lg border border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xl">${isHasilBumi ? '⛏️' : '🌾'}</span>
              <h2 class="text-base sm:text-lg font-bold tracking-tight font-mono text-white">
                ${isHasilBumi ? 'NERACA HASIL BUMI & REALISASI ANGGARAN APBN (1990 - 2026)' : 'NERACA HASIL PERTANIAN & PETERNAKAN TERHUBUNG APBN (1990 - 2026)'}
              </h2>
            </div>
            <p class="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
              ${isHasilBumi 
                ? 'Pusat integrasi neraca produksi, konsumsi domestik, ekspor mineral & energi (1990-2026), klasifikasi BTKI 8-digit, dan realisasi penerimaan negara bukan pajak (PNBP SDA Minerba, Migas & Kehutanan LKPP).'
                : 'Pusat data sekunder neraca pangan nasional (1990-2026): produksi domestik, konsumsi per kapita, kuota impor, rasio swasembada (SSR), klasifikasi HS Code BTKI 8-digit, serta belanja ketahanan pangan APBN/LKPP.'}
            </p>
          </div>

          <!-- View Mode Toggle Buttons -->
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

        <!-- 3. MULTI-DIMENSIONAL FILTER CONTROLS -->
        <div class="bg-white p-3 rounded-lg border border-slate-300 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          <!-- Filter 1: Pilih Komoditas Aktif -->
          <div class="space-y-1">
            <label class="font-bold text-slate-700 uppercase text-[10.5px]">
              ${isHasilBumi ? '⛏️ Komoditas / Komposisi Hasil Bumi:' : '🌾 Komoditas / Komposisi Terpilih:'}
            </label>
            <select id="select-active-commodity" class="w-full bg-white border-2 border-slate-400 rounded px-2.5 py-1.5 font-bold text-slate-900 focus:outline-emerald-700 shadow-2xs cursor-pointer">
              ${renderAggregateOptions()}
              
              <optgroup label="📋 Daftar Komoditas Individu:">
                ${availableCommodities.map(c => `
                  <option value="${c.id}" ${c.id === this.selectedCommodityId ? 'selected' : ''}>
                    ${c.name} (${c.hs_code.split('(')[0].trim()}) [${c.unit}]
                  </option>
                `).join('')}
              </optgroup>
            </select>
          </div>

          <!-- Filter 2: Rentang Tahun & Presets (1990 - 2026) -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="font-bold text-slate-700 uppercase text-[10.5px]">📅 Rentang Tahun (1990-2026):</label>
              <div class="flex items-center gap-1">
                <button type="button" id="commodity-preset-5y" class="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[9.5px] font-mono font-bold cursor-pointer">5 Thn</button>
                <button type="button" id="commodity-preset-10y" class="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[9.5px] font-mono font-bold cursor-pointer">10 Thn</button>
                <button type="button" id="commodity-preset-all" class="px-1.5 py-0.2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[9.5px] font-mono font-bold cursor-pointer">1990-2026</button>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <input type="number" id="commodity-start-year" class="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-xs font-mono font-bold text-slate-900 text-center" min="1990" max="2026" value="${this.startYear}">
              <span class="text-slate-400 font-bold text-xs">s/d</span>
              <input type="number" id="commodity-end-year" class="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-xs font-mono font-bold text-slate-900 text-center" min="1990" max="2026" value="${this.endYear}">
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

          <!-- Filter 4: Bab HS Code -->
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
        ${this.activeViewMode === 'DETAIL' ? this.renderDetailView(comm, kpis, records, availableCommodities, isAggregate, renderAggregateOptions) : this.renderMatrixView()}

      </div>
    `;

    this.attachEvents();
    if (this.activeViewMode === 'DETAIL') {
      this.renderControls();
      requestAnimationFrame(() => this.drawChart());
    }
  }

  renderDetailView(comm, kpis, records, availableCommodities = [], isAggregate = false, renderAggregateOptions = () => '') {
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
                  Mode Stacking Bar YoY (1990-2026)
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
          <div class="text-[10px] text-slate-400 font-sans">${isAggregate ? 'Realisasi/Pagu TA ' + this.endYear : comm.unit}</div>
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

      <!-- 6. MULTI-VARIABLE COMPARATIVE CHART (1-3 SERIES, DUAL Y-AXIS, LINE/BAR/STACKED) -->
      ${this.renderComparativeChartCard()}

      <!-- 7. FULL DATA TABLE: ANNUAL COMMODITY BALANCE SHEET -->
      ${this.renderTableCard(comm, records, isAggregate)}
    `;
  }

  renderComparativeChartCard() {
    return `
      <!-- CHART CARD (HARMONIZED EXACTLY WITH INDIKATOR EKONOMI) -->
      <div class="gov-card p-3 space-y-2 min-h-[430px] flex flex-col justify-between overflow-hidden shadow-xs bg-white rounded-lg border border-slate-300">
        
        <!-- Main Top Bar: Title & Range Preset Buttons & Excel Download -->
        <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-1.5 shrink-0">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">TREN & DISTRIBUSI DESKRIPTIF TINGKAT NASIONAL</span>
              <span class="text-[9.5px] font-mono bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.5 rounded font-bold">
                ${this.seriesConfigs.length > 1 ? `Mode Komparasi (${this.seriesConfigs.length} Variabel)` : 'Mode Tunggal'}
              </span>
            </div>
            <p class="text-[10.5px] text-slate-500 mt-0.5">
              Bandingkan 1 hingga 3 variabel data lintas lembaga dengan konfigurasi Sumbu Y Kiri/Kanan, Line, Bar, dan 100% Stacked Bar.
            </p>
          </div>

          <!-- Time Range Presets & Download Excel Button (Max 3 Vars, Max 12 Years / 37 Years Policy) -->
          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400 font-mono text-[9.5px] uppercase">RENTANG:</span>
              <div class="inline-flex rounded-sm border border-slate-200 p-0.5 bg-slate-50 text-[10.5px] font-mono">
                <button id="btn-chart-range-5y" class="px-2 py-0.5 cursor-pointer ${this.activeRangePreset === '5y' ? 'bg-white font-semibold text-slate-900 shadow-xs border border-slate-200 rounded-sm' : 'text-slate-600 hover:text-slate-900'}">5 Thn</button>
                <button id="btn-chart-range-10y" class="px-2 py-0.5 cursor-pointer ${this.activeRangePreset === '10y' ? 'bg-white font-semibold text-slate-900 shadow-xs border border-slate-200 rounded-sm' : 'text-slate-600 hover:text-slate-900'}">10 Thn</button>
                <button id="btn-chart-range-all" class="px-2 py-0.5 cursor-pointer ${this.activeRangePreset === 'all' ? 'bg-white font-semibold text-slate-900 shadow-xs border border-slate-200 rounded-sm' : 'text-slate-600 hover:text-slate-900'}">1990-2026</button>
              </div>
            </div>

            <!-- Single-Click Excel Download Button with Quota Protection -->
            <button 
              type="button" 
              id="btn-chart-download-excel-xlsx" 
              class="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-[10.5px] font-bold flex items-center gap-1.5 shadow-xs border border-emerald-600 transition-all cursor-pointer"
              title="Unduh Data Mentah & Keterangan Lineage sebagai File Excel (.xlsx) (Max 3 Variabel)"
            >
              <span>📥</span>
              <span>Download Excel (.xlsx)</span>
            </button>
          </div>
        </div>

        <!-- Series Configuration Deck (Tabs + Axis Menu + Indikator Selector + Granularitas + Visual Type) -->
        <div id="commodity-chart-series-deck" class="space-y-1.5 shrink-0"></div>

        <!-- Canvas & Interactive Hover Tooltip Container -->
        <div class="relative w-full h-[270px] min-h-[270px] max-h-[270px] flex items-center justify-center select-none bg-white rounded border border-slate-200 p-1.5 overflow-hidden shrink-0" id="commodity-chart-wrapper">
          <canvas id="commodity-analytics-canvas" class="cursor-crosshair block w-full h-full"></canvas>
          <div id="commodity-chart-tooltip" class="hidden absolute pointer-events-none z-50 transition-opacity duration-75"></div>
        </div>

        <!-- Dual-Axis Legend Strip & Footnote -->
        <div class="flex items-center justify-between text-[9.5px] text-slate-500 font-mono pt-1 border-t border-slate-100 flex-wrap gap-2 shrink-0">
          <div id="commodity-chart-legend-strip" class="flex items-center gap-2 flex-wrap"></div>
          <div>
            * Sumbu Kiri (Utama) • Sumbu Kanan (Sekunder) • Arahkan kursor untuk komparasi pergerakan YoY
          </div>
        </div>
      </div>
    `;
  }

  renderControls() {
    const deck = document.getElementById('commodity-chart-series-deck');
    const legendStrip = document.getElementById('commodity-chart-legend-strip');
    if (!deck) return;

    const active = this.seriesConfigs[this.activeSeriesTab] || this.seriesConfigs[0];
    const available = this.getAvailableIndicatorsList();

    // Group indicators by group name for clean <optgroup>
    const grouped = {};
    available.forEach(ind => {
      if (!grouped[ind.group]) grouped[ind.group] = [];
      grouped[ind.group].push(ind);
    });

    // 1. Series Tabs Strip with Integrated Axis Placement Menu (Maks. 3 Var Rule)
    let tabsHtml = `
      <div class="flex items-center justify-between flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded border border-slate-200">
        <div class="flex items-center gap-1.5 flex-wrap">
          ${this.seriesConfigs.map((s, idx) => `
            <button 
              type="button"
              class="btn-commodity-series-tab px-2 py-0.5 text-[11px] font-mono rounded flex items-center gap-1.5 border transition-all cursor-pointer ${this.activeSeriesTab === idx ? 'bg-white font-bold text-slate-900 border-slate-400 shadow-xs ring-2 ring-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}"
              data-idx="${idx}"
            >
              <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${s.color}"></span>
              <span>Var ${idx + 1}: <strong class="truncate max-w-[120px] inline-block align-bottom">${s.name || 'Pilih Indikator'}</strong></span>
              <span class="text-[8.5px] px-1 py-0.2 rounded font-semibold ${s.axis === 'primary' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'}">
                ${s.axis === 'primary' ? 'Kiri' : 'Kanan'}
              </span>
              ${idx > 0 ? `
                <span class="btn-remove-commodity-series text-slate-400 hover:text-rose-600 font-bold ml-0.5 text-xs" data-idx="${idx}" title="Hapus Variabel Ini">✕</span>
              ` : ''}
            </button>
          `).join('')}

          ${this.seriesConfigs.length < 3 ? `
            <button type="button" id="btn-add-commodity-series" class="px-2 py-0.5 text-[10.5px] font-mono rounded bg-white hover:bg-sky-50 text-sky-700 border border-dashed border-sky-400 font-semibold flex items-center gap-1 shadow-2xs cursor-pointer">
              <span class="font-bold">➕</span> Tambah Var ${this.seriesConfigs.length + 1}
            </button>
          ` : ''}
        </div>

        <!-- Axis Placement Menu for Active Variable -->
        <div class="flex items-center gap-2 font-mono text-[10.5px]">
          <div class="flex items-center gap-1">
            <span class="text-slate-600 font-bold uppercase text-[9.5px]">SUMBU (VAR ${this.activeSeriesTab + 1}):</span>
            <div class="inline-flex rounded border border-slate-300 p-0.5 bg-slate-200/80">
              <button 
                type="button"
                id="btn-commodity-axis-primary" 
                class="py-0.5 px-2 text-center rounded transition-all cursor-pointer text-[10px] ${active.axis === 'primary' ? 'bg-sky-700 text-white font-bold shadow-xs ring-1 ring-sky-900' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300'}"
                title="Tempatkan Variabel ${this.activeSeriesTab + 1} pada Sumbu Kiri (Utama)"
              >
                ← Sumbu Kiri
              </button>
              <button 
                type="button"
                id="btn-commodity-axis-secondary" 
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

    // 2. Active Series Parameter Control Panel
    if (active) {
      const activeMeta = available.find(i => i.id === active.indicatorId);
      const availableTransformations = this.getAvailableTransformations(activeMeta, active.rawData);

      tabsHtml += `
        <div class="bg-white p-2 rounded border border-slate-200 space-y-1.5 text-[11px] font-mono shadow-2xs">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
            
            <!-- A. Indicator Selector (6 Cols) -->
            <div class="md:col-span-6 space-y-0.5">
              <label class="text-[9.5px] uppercase font-bold text-slate-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full" style="background-color: ${active.color}"></span>
                Indikator (Var ${this.activeSeriesTab + 1}):
              </label>
              <select id="select-commodity-series-indicator" class="gov-select w-full text-[11px] font-mono py-1 font-medium bg-white border border-slate-300 rounded px-2 cursor-pointer">
                ${Object.keys(grouped).map(grp => `
                  <optgroup label="${grp}">
                    ${grouped[grp].map(ind => `
                      <option value="${ind.id}" ${ind.id === active.indicatorId ? 'selected' : ''}>
                        ${ind.name} [${ind.unit}]
                      </option>
                    `).join('')}
                  </optgroup>
                `).join('')}
              </select>
            </div>

            <!-- B. Data Transformation Granularity (3 Cols) -->
            <div class="md:col-span-3 space-y-0.5">
              <label class="text-[9.5px] uppercase font-bold text-slate-700 flex items-center justify-between">
                <span>Granularitas Olahan:</span>
                <span class="text-[8.5px] text-sky-700 bg-sky-50 px-1 rounded border border-sky-200">≥ 6 Titik</span>
              </label>
              <select id="select-commodity-series-transformation" class="gov-select w-full text-[11px] font-mono py-1 font-semibold border rounded px-2 cursor-pointer ${availableTransformations.length > 1 ? 'bg-amber-50/50 border-amber-300 text-slate-900' : 'bg-slate-50 text-slate-600'}">
                ${availableTransformations.map(t => `
                  <option value="${t.id}" ${t.id === (active.transformation || 'RAW') ? 'selected' : ''}>
                    ${t.label}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- C. Visual Type: Line vs Bar (3 Cols) -->
            <div class="md:col-span-3 space-y-0.5">
              <label class="text-[9.5px] uppercase font-bold text-slate-700">
                Tipe Visual:
              </label>
              <div class="inline-flex rounded border border-slate-300 p-0.5 bg-slate-100 w-full text-[10.5px]">
                <button 
                  type="button" 
                  id="btn-commodity-series-type-line" 
                  class="flex-1 py-0.5 text-center rounded transition-all cursor-pointer ${active.type === 'line' ? 'bg-slate-800 text-white font-bold shadow-xs' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'}"
                >
                  📈 Line
                </button>
                <button 
                  type="button" 
                  id="btn-commodity-series-type-bar" 
                  class="flex-1 py-0.5 text-center rounded transition-all cursor-pointer ${active.type === 'bar' ? 'bg-slate-800 text-white font-bold shadow-xs' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'}"
                >
                  📊 Bar
                </button>
              </div>
            </div>

          </div>
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
            class="btn-commodity-toggle-axis px-1.5 py-0.5 rounded font-mono text-[9.5px] font-bold border transition-all cursor-pointer shadow-2xs ${s.axis === 'primary' ? 'bg-sky-100 text-sky-900 border-sky-300 hover:bg-sky-200' : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'}"
            data-idx="${idx}"
            title="Ubah Sumbu Y (${s.axis === 'primary' ? 'Sumbu Kiri ➔ Pindah ke Kanan' : 'Sumbu Kanan ➔ Pindah ke Kiri'})"
          >
            ${s.axis === 'primary' ? '← Kiri' : 'Kanan →'} ⇄
          </button>
          <button 
            type="button"
            class="btn-commodity-toggle-type px-1.5 py-0.5 rounded font-mono text-[9.5px] bg-white text-slate-800 hover:bg-slate-200 border border-slate-300 cursor-pointer shadow-2xs"
            data-idx="${idx}"
            title="Klik untuk ubah format Line ⇄ Bar"
          >
            ${s.type.toUpperCase()}
          </button>
        </div>
      `).join('');
    }

    this.attachDynamicControlsEvents();
  }

  attachDynamicControlsEvents() {
    // 1. Switch series tab
    this.container.querySelectorAll('.btn-commodity-series-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove-commodity-series')) return;
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        this.activeSeriesTab = idx;
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
      });
    });

    // 2. Remove series button
    this.container.querySelectorAll('.btn-remove-commodity-series').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        this.removeComparisonSeries(idx);
      });
    });

    // 3. Add series button (Max 3)
    document.getElementById('btn-add-commodity-series')?.addEventListener('click', () => {
      this.addComparisonSeries();
    });

    // 4. Select indicator for active series
    document.getElementById('select-commodity-series-indicator')?.addEventListener('change', (e) => {
      this.updateSeriesIndicator(this.activeSeriesTab, e.target.value);
    });

    // 5. Select transformation for active series
    document.getElementById('select-commodity-series-transformation')?.addEventListener('change', (e) => {
      const activeSeries = this.seriesConfigs[this.activeSeriesTab];
      if (activeSeries) {
        activeSeries.transformation = e.target.value;
        this.recalculateSeriesData(activeSeries);
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
      }
    });

    // 6. Axis buttons for active series
    document.getElementById('btn-commodity-axis-primary')?.addEventListener('click', () => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].axis = 'primary';
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
      }
    });

    document.getElementById('btn-commodity-axis-secondary')?.addEventListener('click', () => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].axis = 'secondary';
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
      }
    });

    // 7. Visual type buttons (Line vs Bar)
    document.getElementById('btn-commodity-series-type-line')?.addEventListener('click', () => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].type = 'line';
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
      }
    });

    document.getElementById('btn-commodity-series-type-bar')?.addEventListener('click', () => {
      if (this.seriesConfigs[this.activeSeriesTab]) {
        this.seriesConfigs[this.activeSeriesTab].type = 'bar';
        this.renderControls();
        requestAnimationFrame(() => this.drawChart());
      }
    });

    // 8. Legend strip direct toggles
    this.container.querySelectorAll('.btn-commodity-toggle-axis').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (this.seriesConfigs[idx]) {
          this.seriesConfigs[idx].axis = this.seriesConfigs[idx].axis === 'primary' ? 'secondary' : 'primary';
          this.renderControls();
          requestAnimationFrame(() => this.drawChart());
        }
      });
    });

    this.container.querySelectorAll('.btn-commodity-toggle-type').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (this.seriesConfigs[idx]) {
          this.seriesConfigs[idx].type = this.seriesConfigs[idx].type === 'line' ? 'bar' : 'line';
          this.renderControls();
          requestAnimationFrame(() => this.drawChart());
        }
      });
    });
  }

  attachEvents() {
    // 1. View Mode Switcher (Detail vs Matrix)
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

    // 2. Main Commodity Dropdown Selection
    const handleCommoditySelection = async (newId) => {
      this.selectedCommodityId = newId;
      
      if (!newId.startsWith('ALL_') && !newId.startsWith('AGG_') && this.categoriesData) {
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
      this.initSeriesConfigs();
      this.render();
    };

    document.getElementById('select-active-commodity')?.addEventListener('change', (e) => {
      handleCommoditySelection(e.target.value);
    });

    // 3. Global Year Range Presets (1990-2026)
    const updateTimeRange = async (preset, sYear, eYear) => {
      this.activeRangePreset = preset;
      this.startYear = sYear;
      this.endYear = eYear;
      await this.loadBalanceData(this.selectedCommodityId);
      this.seriesConfigs.forEach(s => this.recalculateSeriesData(s));
      this.render();
    };

    document.getElementById('commodity-preset-5y')?.addEventListener('click', () => updateTimeRange('5y', 2021, 2026));
    document.getElementById('commodity-preset-10y')?.addEventListener('click', () => updateTimeRange('10y', 2016, 2026));
    document.getElementById('commodity-preset-all')?.addEventListener('click', () => updateTimeRange('all', 1990, 2026));

    document.getElementById('btn-chart-range-5y')?.addEventListener('click', () => updateTimeRange('5y', 2021, 2026));
    document.getElementById('btn-chart-range-10y')?.addEventListener('click', () => updateTimeRange('10y', 2016, 2026));
    document.getElementById('btn-chart-range-all')?.addEventListener('click', () => updateTimeRange('all', 1990, 2026));

    // 4. Download Excel (.xlsx) button matching Indikator Ekonomi
    document.getElementById('btn-chart-download-excel-xlsx')?.addEventListener('click', () => {
      const tabName = this.activeDivision === 'HASIL_BUMI' ? 'Hasil_Bumi' : 'Pertanian_Peternakan';
      const raw = localStorage.getItem('registered_researcher_access');
      if (!raw) {
        openEmailRegistrationModal(() => {
          ExcelExporter.exportSeriesToExcel(this.seriesConfigs, this.activeRangePreset, tabName);
        }, 'Silakan daftarkan / konfirmasi email Anda terlebih dahulu sebelum mengunduh file data Excel (.xlsx). Setelah tersimpan, file akan langsung otomatis diunduh.');
      } else {
        ExcelExporter.exportSeriesToExcel(this.seriesConfigs, this.activeRangePreset, tabName);
      }
    });

    // 5. Year Inputs
    const handleYearInputChange = async (sYear, eYear) => {
      const s = parseInt(sYear, 10);
      const e = parseInt(eYear, 10);
      if (!isNaN(s) && !isNaN(e) && s <= e) {
        this.startYear = s;
        this.endYear = e;
        await this.loadBalanceData(this.selectedCommodityId);
        this.seriesConfigs.forEach(sc => this.recalculateSeriesData(sc));
        this.render();
      }
    };

    document.getElementById('commodity-start-year')?.addEventListener('change', (e) => {
      handleYearInputChange(e.target.value, this.endYear);
    });

    document.getElementById('commodity-end-year')?.addEventListener('change', (e) => {
      handleYearInputChange(this.startYear, e.target.value);
    });

    // 6. Sub-Kelompok Filter
    document.getElementById('select-filter-group')?.addEventListener('change', async (e) => {
      this.activeGroup = e.target.value;
      if (this.activeGroup !== 'ALL' && this.categoriesData) {
        const match = this.categoriesData.commodities.find(c => c.division === this.activeDivision && c.group === this.activeGroup);
        if (match) {
          this.selectedCommodityId = match.id;
          this.activeHsChapter = match.hs_chapter;
          await this.loadBalanceData(match.id);
          this.initSeriesConfigs();
        }
      }
      if (this.activeViewMode === 'MATRIX') {
        await this.loadMatrixData();
      }
      this.render();
    });

    // 7. Bab HS Filter
    document.getElementById('select-filter-hs')?.addEventListener('change', async (e) => {
      this.activeHsChapter = e.target.value;
      if (this.activeHsChapter !== 'ALL' && this.categoriesData) {
        const match = this.categoriesData.commodities.find(c => c.division === this.activeDivision && c.hs_chapter === this.activeHsChapter);
        if (match) {
          this.selectedCommodityId = match.id;
          this.activeGroup = match.group;
          await this.loadBalanceData(match.id);
          this.initSeriesConfigs();
        }
      } else {
        this.selectedCommodityId = this.activeDivision === 'HASIL_BUMI' ? 'ALL_HASIL_BUMI' : 'ALL_PERTANIAN';
        await this.loadBalanceData(this.selectedCommodityId);
        this.initSeriesConfigs();
      }
      if (this.activeViewMode === 'MATRIX') {
        await this.loadMatrixData();
      }
      this.render();
    });

    // 8. Matrix Year Selector
    document.getElementById('select-matrix-year')?.addEventListener('change', async (e) => {
      this.selectedYear = e.target.value;
      await this.loadMatrixData();
      this.render();
    });

    // 9. Inspect from matrix
    this.container.querySelectorAll('.btn-inspect-commodity').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        this.activeViewMode = 'DETAIL';
        await this.loadBalanceData(id);
        this.initSeriesConfigs();
        this.render();
      });
    });

    // 10. Table Export CSV/Excel
    document.getElementById('btn-export-commodity-excel')?.addEventListener('click', () => {
      this.handleExportExcel();
    });

    // 11. Canvas Interaction Events (MouseMove & MouseLeave)
    const canvas = document.getElementById('commodity-analytics-canvas');
    if (canvas) {
      canvas.addEventListener('mousemove', (e) => this.handleCanvasMouseMove(e));
      canvas.addEventListener('mouseleave', () => this.handleCanvasMouseLeave());
    }
  }

  handleCanvasMouseMove(e) {
    const canvas = document.getElementById('commodity-analytics-canvas');
    const tooltip = document.getElementById('commodity-chart-tooltip');
    if (!canvas || !tooltip || this.timeSlots.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

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
      this.drawChart();
    } else {
      this.handleCanvasMouseLeave();
    }
  }

  handleCanvasMouseLeave() {
    const tooltip = document.getElementById('commodity-chart-tooltip');
    if (tooltip) tooltip.classList.add('hidden');
    if (this.hoveredYear !== null) {
      this.hoveredYear = null;
      this.drawChart();
    }
  }

  showComparativeTooltip(mouseX, mouseY, year, canvasRect) {
    const tooltip = document.getElementById('commodity-chart-tooltip');
    if (!tooltip) return;

    const seriesRows = this.seriesConfigs.map((s, idx) => {
      const obs = s.data.find(d => String(d.period) === String(year));
      const prevYear = String(parseInt(year) - 1);
      const prevObs = s.data.find(d => String(d.period) === prevYear);

      let valStr = 'N/A';
      let yoyStr = '—';
      let yoyColor = 'text-slate-400';
      let statusBadge = '';

      if (obs && obs.value !== null && obs.value !== undefined) {
        const prefix = s.unit === 'Rp Miliar' ? 'Rp ' : (s.unit === '$M USD' ? '$' : '');
        const suffix = s.unit === 'Rp Miliar' ? ' M' : (s.unit === '$M USD' ? 'M' : (s.effectiveUnit ? ` ${s.effectiveUnit}` : ''));
        valStr = `${prefix}${Number(obs.value).toLocaleString('id-ID', { maximumFractionDigits: 2 })}${suffix}`;

        const st = (obs.status || 'N/A').toLowerCase();
        if (st === 'observed') {
          statusBadge = '<span class="status-badge status-observed text-[9px] px-1 py-0.2">Final</span>';
        } else if (st === 'provisional' || year === '2026') {
          statusBadge = '<span class="status-badge status-provisional text-[9px] px-1 py-0.2">Sementara</span>';
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

    tooltip.innerHTML = `
      <div class="bg-[#CDCDCD] text-slate-950 border border-slate-400 shadow-2xl rounded-md p-3 max-w-[360px] space-y-2 backdrop-blur-md">
        <div class="flex items-center justify-between border-b border-slate-400 pb-1.5">
          <div class="font-mono font-bold text-[11px] text-slate-950 flex items-center gap-1">
            <span>📅</span> TA: ${year} [Nasional]
          </div>
          <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-900 border border-slate-400 font-bold">
            ${this.seriesConfigs.length} Var
          </span>
        </div>

        <div class="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5 scrollbar-thin">
          ${seriesRows.map(row => `
            <div class="bg-white text-slate-900 rounded p-2 border border-slate-300 text-[11px] font-mono space-y-1 shadow-xs">
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

              <div class="flex items-baseline justify-between pt-0.5">
                <span class="text-slate-500 text-[9px] uppercase font-semibold">Nilai:</span>
                <span class="font-bold text-slate-900 tabular-nums text-xs">${row.valStr}</span>
              </div>
              <div class="flex items-center justify-between text-[9px] pt-0.5 border-t border-slate-100">
                <span class="text-slate-500">YoY:</span>
                <span class="px-1 py-0.2 rounded ${row.yoyColor}">${row.yoyStr}</span>
                <div>${row.statusBadge}</div>
              </div>

              ${row.obs ? `
                <div class="bg-slate-50 rounded p-1.5 border border-slate-200 text-[9px] font-mono text-slate-800 space-y-0.5">
                  <div class="font-bold text-slate-900 truncate" title="${row.obs.publication_title}">
                    📜 ${row.obs.publication_title || 'Publikasi Resmi'}
                  </div>
                  <div class="text-[8.5px] text-slate-600 truncate">
                    🏛️ ${row.obs.source_institution || 'Kementerian / Lembaga'}
                  </div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
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
    const canvas = document.getElementById('commodity-analytics-canvas');
    if (!canvas) return;

    const wrapper = document.getElementById('commodity-chart-wrapper') || canvas.parentElement;
    const width = Math.max(Math.floor(wrapper.clientWidth) - 16, 400);
    const height = 260;

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

    // 1. Gather all sorted years
    const allYearsSet = new Set();
    this.seriesConfigs.forEach(s => {
      (s.data || []).forEach(d => {
        if (d.period) allYearsSet.add(String(d.period));
      });
    });

    if (allYearsSet.size < 2) {
      for (let y = this.startYear; y <= this.endYear; y++) {
        allYearsSet.add(String(y));
      }
    }

    const sortedYears = Array.from(allYearsSet).sort((a, b) => a.localeCompare(b));

    // 2. Primary and Secondary series
    const primarySeries = this.seriesConfigs.filter(s => s.axis === 'primary');
    const secondarySeries = this.seriesConfigs.filter(s => s.axis === 'secondary');
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
        primaryMin = 0;
        primaryMax = rawMax + span * 0.15;
      } else {
        primaryMin = rawMin - span * 0.08;
        primaryMax = rawMax + span * 0.15;
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
        secondaryMax = rawMax + span * 0.15;
      } else {
        secondaryMin = rawMin - span * 0.08;
        secondaryMax = rawMax + span * 0.15;
      }
      if (secondaryMin === secondaryMax) secondaryMax += 10;
    }

    // Coordinate helpers
    const getX = (idx) => padding.left + (idx / Math.max(sortedYears.length - 1, 1)) * chartW;
    const getY = (val, axis = 'primary') => {
      const min = axis === 'primary' ? primaryMin : secondaryMin;
      const max = axis === 'primary' ? primaryMax : secondaryMax;
      const pct = (val - min) / (max - min);
      return padding.top + chartH - pct * chartH;
    };

    // Calculate time slots for hover detection
    this.timeSlots = sortedYears.map((yr, idx) => ({
      year: yr,
      x: getX(idx),
      width: chartW / sortedYears.length
    }));

    // 3. Draw Grid Lines & Ticks
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.font = '9px monospace';
    ctx.fillStyle = '#64748b';

    for (let i = 0; i <= 4; i++) {
      const yFrac = i / 4;
      const y = padding.top + chartH - yFrac * chartH;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.stroke();

      // Left axis tick label
      const leftVal = primaryMin + yFrac * (primaryMax - primaryMin);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#0284c7';
      ctx.fillText(Number(Math.round(leftVal * 10) / 10).toLocaleString('id-ID'), padding.left - 6, y + 3);

      // Right axis tick label
      if (hasSecondaryAxis) {
        const rightVal = secondaryMin + yFrac * (secondaryMax - secondaryMin);
        ctx.textAlign = 'left';
        ctx.fillStyle = '#10b981';
        ctx.fillText(Number(Math.round(rightVal * 10) / 10).toLocaleString('id-ID'), padding.left + chartW + 6, y + 3);
      }
    }

    // Draw X-Axis Year Labels
    ctx.fillStyle = '#0f172a';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    const skipStep = sortedYears.length > 20 ? 3 : (sortedYears.length > 10 ? 2 : 1);

    sortedYears.forEach((yr, idx) => {
      if (idx % skipStep === 0 || idx === sortedYears.length - 1) {
        const x = getX(idx);
        ctx.fillText(yr, x, height - 6);
      }
    });

    // 4. Draw Hover Vertical Crosshair Line
    if (this.hoveredYear) {
      const hSlot = this.timeSlots.find(s => s.year === this.hoveredYear);
      if (hSlot) {
        ctx.save();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(hSlot.x, padding.top);
        ctx.lineTo(hSlot.x, padding.top + chartH);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 5. Draw Bars and Lines for Active Series
    const barSeriesList = this.seriesConfigs.filter(s => s.type === 'bar');
    const lineSeriesList = this.seriesConfigs.filter(s => s.type === 'line');

    // Draw Bars
    if (barSeriesList.length > 0) {
      const slotW = chartW / sortedYears.length;
      const barW = Math.max(3, (slotW * 0.7) / barSeriesList.length);

      sortedYears.forEach((yr, yIdx) => {
        const slotX = padding.left + (yIdx / Math.max(sortedYears.length - 1, 1)) * chartW - (slotW * 0.35);

        barSeriesList.forEach((s, bIdx) => {
          const obs = (s.data || []).find(d => String(d.period) === String(yr));
          if (obs && obs.value !== null && obs.value !== undefined) {
            const yTop = getY(Number(obs.value), s.axis);
            const yZero = getY(0, s.axis);
            const bX = slotX + bIdx * barW;
            const bY = Math.min(yTop, yZero);
            const bH = Math.abs(yTop - yZero);

            ctx.fillStyle = s.color;
            ctx.fillRect(bX, bY, barW - 1, Math.max(bH, 1));
          }
        });
      });
    }

    // Draw Lines
    lineSeriesList.forEach(s => {
      ctx.save();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      let started = false;
      sortedYears.forEach((yr, yIdx) => {
        const obs = (s.data || []).find(d => String(d.period) === String(yr));
        if (obs && obs.value !== null && obs.value !== undefined) {
          const x = getX(yIdx);
          const y = getY(Number(obs.value), s.axis);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();

      // Draw Data Points
      sortedYears.forEach((yr, yIdx) => {
        const obs = (s.data || []).find(d => String(d.period) === String(yr));
        if (obs && obs.value !== null && obs.value !== undefined) {
          const x = getX(yIdx);
          const y = getY(Number(obs.value), s.axis);

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x, y, yr === this.hoveredYear ? 5 : 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = s.color;
          ctx.lineWidth = yr === this.hoveredYear ? 2.5 : 1.5;
          ctx.stroke();
        }
      });
      ctx.restore();
    });
  }

  renderTableCard(comm, records, isAggregate = false) {
    return `
      <!-- 7. FULL DATA TABLE: ANNUAL COMMODITY BALANCE SHEET (1990 - 2026) -->
      <div class="bg-white rounded-lg border border-slate-300 shadow-2xs overflow-hidden">
        <div class="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <span class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
            <span>📑</span>
            <span>Tabel Neraca & Realisasi Anggaran APBN (1990 - 2026): ${comm.name}</span>
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
                  <th class="py-2 px-3 text-right">Produksi (${comm.unit})</th>
                  <th class="py-2 px-3 text-right">Konsumsi (${comm.unit})</th>
                  <th class="py-2 px-3 text-center">SSR (%)</th>
                  <th class="py-2 px-3 text-center">IDR (%)</th>
                ` : `
                  <th class="py-2 px-3 text-center">Jml Komoditas</th>
                `}
                <th class="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${records.map(r => `
                <tr class="hover:bg-slate-50 transition-colors ${r.period === '2026' ? 'bg-amber-50/40' : ''}">
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
                    <td class="py-2 px-3 text-right font-semibold text-emerald-950">${Number(r.production).toLocaleString('id-ID')}</td>
                    <td class="py-2 px-3 text-right text-slate-900">${Number(r.consumption).toLocaleString('id-ID')}</td>
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
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderMatrixView() {
    const list = this.matrixData || this.categoriesData.commodities;
    const yearsList = [];
    for (let y = 2026; y >= 1990; y--) {
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
                <option value="${y}" ${this.selectedYear === y ? 'selected' : ''}>${y} ${y === '2026' ? '(Sementara)' : ''}</option>
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

      const rows = [
        ['PUSAT BASIS DATA DATA SEKUNDER: PERGERAKAN EKONOMI INDONESIA'],
        ['NERACA KOMODITAS, PANGAN & HASIL BUMI NASIONAL (1990 - 2026)'],
        ['Cakupan Geografis: Indonesia (Nasional) | Harmonisasi APBN & LKPP (2026: Angka Sementara)'],
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
        ['TAHUN', 'DASAR UU APBN (TARGET)', 'TARGET APBN (RP MILIAR)', 'REALISASI LKPP (RP MILIAR)', 'DAYA SERAP (%)', `PRODUKSI (${comm.unit})`, `KONSUMSI (${comm.unit})`, `VOLUME IMPOR (${comm.unit})`, 'NILAI IMPOR ($M)', `VOLUME EKSPOR (${comm.unit})`, 'NILAI EKSPOR ($M)', 'SURPLUS / DEFISIT', 'RASIO SWASEMBADA (SSR %)', 'RASIO IMPOR (IDR %)', 'STATUS']
      ];

      records.forEach(r => {
        rows.push([
          r.period,
          r.apbn_statute_law || 'UU APBN',
          r.apbn_target_idr_billion || 0,
          r.apbn_realization_idr_billion || 0,
          `${r.apbn_achievement_rate_percent || 0}%`,
          r.production,
          r.consumption,
          r.import_volume,
          r.import_value_usd_million || 0,
          r.export_volume,
          r.export_value_usd_million || 0,
          r.surplus_deficit,
          r.ssr_percent,
          r.idr_percent,
          r.status
        ]);
      });

      const tabName = this.activeDivision === 'HASIL_BUMI' ? 'Hasil_Bumi' : 'Pertanian_Peternakan';
      const shortTs = ExcelExporter.getShortTimestamp();
      const cleanName = comm.name.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').trim();
      ExcelExporter.downloadCSV(`${tabName}_${cleanName}_${this.startYear}-${this.endYear}_${shortTs}.csv`, rows);
    } catch (err) {
      console.error('Error exporting commodity balance Excel:', err);
      alert('Gagal mengekspor data Excel neraca komoditas.');
    }
  }
}
