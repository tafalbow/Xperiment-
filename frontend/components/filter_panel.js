// ==============================================================================
// FILTER PANEL COMPONENT (Multidimensional Cascading Filter - Sidebar Format)
// ==============================================================================

export class FilterPanel {
  constructor(containerId, options = {}, onFilterChange = () => {}) {
    this.container = document.getElementById(containerId);
    this.hierarchy = options.hierarchy || {};
    this.sources = options.sources || [];
    this.stats = options.statistics || {};
    this.onFilterChange = onFilterChange;

    this.state = {
      search_keyword: '',
      sector: '',
      category: '',
      subcategory: '',
      indicator_id: 'IND-GDP-GROWTH-YOY', // Default national indicator
      start_year: 2001, // Default 24 points
      end_year: 2024,
      source_id: '',
      status: '',
      limit: 24
    };

    this.render();
  }

  updateHierarchy(newHierarchy, newSources, newStats) {
    this.hierarchy = newHierarchy || this.hierarchy;
    this.sources = newSources || this.sources;
    this.stats = newStats || this.stats;
    this.render();
  }

  updateYearInputs(startYear, endYear) {
    this.state.start_year = startYear;
    this.state.end_year = endYear;
    const startEl = document.getElementById('filter-start-year');
    const endEl = document.getElementById('filter-end-year');
    if (startEl) startEl.value = startYear;
    if (endEl) endEl.value = endYear;
  }

  setFilterValues({ sector = '', category = '', subcategory = '', indicator_id = '' }) {
    if (sector) this.state.sector = sector;
    if (category) this.state.category = category;
    if (subcategory) this.state.subcategory = subcategory;
    if (indicator_id) this.state.indicator_id = indicator_id;
    this.render();
  }

  setIndicator(indicatorId) {
    this.state.indicator_id = indicatorId;
    this.render();
  }

  render() {
    if (!this.container) return;

    const sectors = Object.keys(this.hierarchy);
    const categories = this.state.sector && this.hierarchy[this.state.sector]
      ? Object.keys(this.hierarchy[this.state.sector])
      : [];
    const subcategories = this.state.sector && this.state.category && this.hierarchy[this.state.sector][this.state.category]
      ? Object.keys(this.hierarchy[this.state.sector][this.state.category])
      : [];

    let availableIndicators = [];
    if (this.state.sector && this.state.category && this.state.subcategory && this.hierarchy[this.state.sector][this.state.category][this.state.subcategory]) {
      availableIndicators = this.hierarchy[this.state.sector][this.state.category][this.state.subcategory];
    } else if (this.state.sector && this.state.category && this.hierarchy[this.state.sector][this.state.category]) {
      Object.values(this.hierarchy[this.state.sector][this.state.category]).forEach(subList => {
        availableIndicators.push(...subList);
      });
    } else if (this.state.sector && this.hierarchy[this.state.sector]) {
      Object.values(this.hierarchy[this.state.sector]).forEach(catList => {
        Object.values(catList).forEach(subList => {
          availableIndicators.push(...subList);
        });
      });
    } else {
      // Gather all indicators
      Object.values(this.hierarchy).forEach(cats => {
        Object.values(cats).forEach(subcats => {
          Object.values(subcats).forEach(indList => {
            availableIndicators.push(...indList);
          });
        });
      });
    }

    // STRICT UNIQUE MAP BY ID
    const uniqueIndicators = Array.from(
      new Map(availableIndicators.map(item => [item.id, item])).values()
    );

    this.container.innerHTML = `
      <div class="gov-card p-3 space-y-2 bg-white border border-slate-300 shadow-xs">
        <!-- Panel Header -->
        <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1">
              <span>🎛️</span>
              <span>FILTERING SECTION</span>
            </span>
          </div>
          <button 
            id="btn-reset-filter" 
            class="gov-btn gov-btn-sm text-[10.5px] py-0.5 px-2 text-slate-600 hover:text-slate-900 flex items-center gap-1 shadow-2xs" 
            title="Reset Semua Filter ke Pengaturan Awal"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Reset
          </button>
        </div>

        <!-- 4-Level Cascading Financial / Macro Hierarchy -->
        <div class="space-y-1.5">
          <!-- Level 1: Sektor Utama -->
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-0.5">
              1. Sektor / Kegiatan Utama
            </label>
            <select id="filter-sector" class="gov-select w-full text-xs font-mono py-1">
              <option value="">-- Semua Sektor / Kegiatan --</option>
              ${sectors.map(s => `<option value="${s}" ${this.state.sector === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>

          <!-- Level 2: Kategori Akun -->
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-0.5">
              2. Kategori / Kelompok Akun
            </label>
            <select id="filter-category" class="gov-select w-full text-xs font-mono py-1" ${categories.length === 0 ? 'disabled' : ''}>
              <option value="">-- Semua Kategori / Kelompok --</option>
              ${categories.map(c => `<option value="${c}" ${this.state.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>

          <!-- Level 3: Jenis Akun -->
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-0.5">
              3. Sub-Kategori / Jenis Akun
            </label>
            <select id="filter-subcategory" class="gov-select w-full text-xs font-mono py-1" ${subcategories.length === 0 ? 'disabled' : ''}>
              <option value="">-- Semua Jenis Akun --</option>
              ${subcategories.map(sc => `<option value="${sc}" ${this.state.subcategory === sc ? 'selected' : ''}>${sc}</option>`).join('')}
            </select>
          </div>

          <!-- Level 4: Rincian Indikator / Akun Spesifik -->
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-0.5">
              4. Indikator Spesifik / Rincian Akun
            </label>
            <select id="filter-indicator" class="gov-select w-full text-xs font-mono py-1 font-medium">
              <option value="">-- Pilih Rincian Indikator / Akun --</option>
              ${uniqueIndicators.map(ind => `<option value="${ind.id}" ${this.state.indicator_id === ind.id ? 'selected' : ''}>${ind.name} (${ind.unit})</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Lembaga Sumber Resmi -->
        <div class="pt-1.5 border-t border-slate-100">
          <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 mb-0.5">
            Lembaga Sumber Resmi
          </label>
          <select id="filter-source" class="gov-select w-full text-xs font-mono py-1">
            <option value="">-- Seluruh Lembaga Pemerintah --</option>
            ${this.sources.map(s => `<option value="${s.id}" ${this.state.source_id === s.id ? 'selected' : ''}>${s.institution_name}</option>`).join('')}
          </select>
        </div>

        <!-- Rentang Tahun & Quick Presets -->
        <div class="pt-1.5 border-t border-slate-100 space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700">
              Rentang Tahun:
            </label>
            <div class="flex items-center gap-1">
              <button type="button" id="filter-preset-6y" class="px-1.5 py-0.5 rounded text-[9.5px] font-mono border transition-all cursor-pointer ${this.state.start_year === 2019 && this.state.end_year === 2024 ? 'bg-slate-800 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                6 Thn
              </button>
              <button type="button" id="filter-preset-24y" class="px-1.5 py-0.5 rounded text-[9.5px] font-mono border transition-all cursor-pointer ${this.state.start_year === 2001 && this.state.end_year === 2024 ? 'bg-slate-800 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                24 Thn
              </button>
              <button type="button" id="filter-preset-all" class="px-1.5 py-0.5 rounded text-[9.5px] font-mono border transition-all cursor-pointer ${this.state.start_year === 1993 && this.state.end_year === 2024 ? 'bg-slate-800 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                Semua
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input type="number" id="filter-start-year" class="gov-input text-xs font-mono text-center w-full py-0.5" min="1993" max="2025" value="${this.state.start_year}">
            <span class="text-slate-400 text-xs font-mono">s/d</span>
            <input type="number" id="filter-end-year" class="gov-input text-xs font-mono text-center w-full py-0.5" min="1993" max="2025" value="${this.state.end_year}">
          </div>
        </div>

        <!-- Metadata Footnote -->
        <div class="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-mono text-slate-400">
          <span>Cakupan: <strong>1993 - 2024+</strong></span>
          <span>Granularitas: <strong>Nasional</strong></span>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const sectorSel = document.getElementById('filter-sector');
    const catSel = document.getElementById('filter-category');
    const subcatSel = document.getElementById('filter-subcategory');
    const indSel = document.getElementById('filter-indicator');
    const startYrInp = document.getElementById('filter-start-year');
    const endYrInp = document.getElementById('filter-end-year');
    const sourceSel = document.getElementById('filter-source');
    const resetBtn = document.getElementById('btn-reset-filter');

    // Preset buttons
    document.getElementById('filter-preset-6y')?.addEventListener('click', () => {
      this.state.start_year = 2019;
      this.state.end_year = 2024;
      this.render();
      this.onFilterChange(this.state);
    });

    document.getElementById('filter-preset-24y')?.addEventListener('click', () => {
      this.state.start_year = 2001;
      this.state.end_year = 2024;
      this.render();
      this.onFilterChange(this.state);
    });

    document.getElementById('filter-preset-all')?.addEventListener('click', () => {
      this.state.start_year = 1993;
      this.state.end_year = 2024;
      this.render();
      this.onFilterChange(this.state);
    });

    // Cascading Sector Change
    sectorSel?.addEventListener('change', (e) => {
      this.state.sector = e.target.value;
      this.state.category = '';
      this.state.subcategory = '';
      this.state.indicator_id = '';
      this.render();
      this.onFilterChange(this.state);
    });

    // Cascading Category Change
    catSel?.addEventListener('change', (e) => {
      this.state.category = e.target.value;
      this.state.subcategory = '';
      this.state.indicator_id = '';
      this.render();
      this.onFilterChange(this.state);
    });

    // Cascading Subcategory Change
    subcatSel?.addEventListener('change', (e) => {
      this.state.subcategory = e.target.value;
      this.state.indicator_id = '';
      this.render();
      this.onFilterChange(this.state);
    });

    // Indicator Change
    indSel?.addEventListener('change', (e) => {
      this.state.indicator_id = e.target.value;
      this.onFilterChange(this.state);
    });

    // Year Inputs
    const onYearChange = () => {
      const s = parseInt(startYrInp?.value) || 1993;
      const end = parseInt(endYrInp?.value) || 2024;
      if (s <= end) {
        this.state.start_year = s;
        this.state.end_year = end;
        this.onFilterChange(this.state);
      }
    };
    startYrInp?.addEventListener('change', onYearChange);
    endYrInp?.addEventListener('change', onYearChange);

    // Source
    sourceSel?.addEventListener('change', (e) => {
      this.state.source_id = e.target.value;
      this.onFilterChange(this.state);
    });

    // Reset
    resetBtn?.addEventListener('click', () => {
      this.state = {
        search_keyword: '',
        sector: '',
        category: '',
        subcategory: '',
        indicator_id: 'IND-GDP-GROWTH-YOY',
        start_year: 2001,
        end_year: 2024,
        source_id: '',
        status: '',
        limit: 24
      };
      this.render();
      this.onFilterChange(this.state);
    });
  }
}
