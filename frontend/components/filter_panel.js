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
      start_year: 1990, // Default 37 points (1990 - 2026)
      end_year: 2026,
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
      <div class="gov-card p-3.5 space-y-2.5 bg-[#FDE2D2] border border-[#F5C7B3] rounded-lg shadow-sm">
        <!-- Panel Header -->
        <div class="flex items-center justify-between border-b border-[#F5C7B3] pb-2">
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#3E2723] flex items-center gap-1.5">
              <span>🎛️</span>
              <span>FILTERING SECTION</span>
            </span>
          </div>
          <button 
            id="btn-reset-filter" 
            class="gov-btn gov-btn-sm text-[10.5px] py-0.5 px-2 text-[#5D4037] hover:text-[#3E2723] border-[#F5C7B3] bg-white hover:bg-[#FCD5C0] flex items-center gap-1 shadow-2xs transition-colors cursor-pointer" 
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
            <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E2723] mb-0.5">
              1. Sektor / Kegiatan Utama
            </label>
            <select id="filter-sector" class="gov-select w-full text-xs font-mono py-1 bg-white border border-[#F5C7B3] text-[#202124]">
              <option value="">-- Semua Sektor / Kegiatan --</option>
              ${sectors.map(s => `<option value="${s}" ${this.state.sector === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>

          <!-- Level 2: Kategori Akun -->
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E2723] mb-0.5">
              2. Kategori / Kelompok Akun
            </label>
            <select id="filter-category" class="gov-select w-full text-xs font-mono py-1 bg-white border border-[#F5C7B3] text-[#202124]" ${categories.length === 0 ? 'disabled' : ''}>
              <option value="">-- Semua Kategori / Kelompok --</option>
              ${categories.map(c => `<option value="${c}" ${this.state.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>

          <!-- Level 3: Sub-Kategori -->
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E2723] mb-0.5">
              3. Sub-Kategori / Jenis Pos
            </label>
            <select id="filter-subcategory" class="gov-select w-full text-xs font-mono py-1 bg-white border border-[#F5C7B3] text-[#202124]" ${subcategories.length === 0 ? 'disabled' : ''}>
              <option value="">-- Semua Sub-Kategori --</option>
              ${subcategories.map(sc => `<option value="${sc}" ${this.state.subcategory === sc ? 'selected' : ''}>${sc}</option>`).join('')}
            </select>
          </div>

          <!-- Level 4: Indikator Spesifik -->
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E2723] mb-0.5">
              4. Indikator Spesifik (${uniqueIndicators.length} Pilihan)
            </label>
            <select id="filter-indicator" class="gov-select w-full text-xs font-mono py-1 font-bold bg-white border border-[#F5C7B3] text-[#202124]">
              <option value="">-- Pilih Indikator Spesifik --</option>
              ${uniqueIndicators.map(i => `<option value="${i.id}" ${this.state.indicator_id === i.id ? 'selected' : ''}>${i.name} (${i.unit})</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Filter Sumber Data Resmi -->
        <div class="pt-1.5 border-t border-[#F5C7B3]">
          <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E2723] mb-0.5">
            Sumber Data Statutori:
          </label>
          <select id="filter-source" class="gov-select w-full text-xs font-mono py-1 bg-white border border-[#F5C7B3] text-[#202124]">
            <option value="">-- Seluruh Lembaga Pemerintah --</option>
            ${this.sources.map(s => `<option value="${s.id}" ${this.state.source_id === s.id ? 'selected' : ''}>${s.institution_name}</option>`).join('')}
          </select>
        </div>

        <!-- Rentang Tahun & Quick Presets -->
        <div class="pt-1.5 border-t border-[#F5C7B3] space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E2723]">
              Rentang Tahun:
            </label>
            <div class="flex items-center gap-1">
              <button type="button" id="filter-preset-5y" class="px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${this.state.start_year === 2021 && this.state.end_year === 2026 ? 'bg-[#0038A8] text-white border-[#0038A8] font-bold shadow-2xs' : 'bg-white text-[#5D4037] border-[#F5C7B3] hover:bg-[#FCD5C0]'}">
                5 Thn
              </button>
              <button type="button" id="filter-preset-10y" class="px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${this.state.start_year === 2016 && this.state.end_year === 2026 ? 'bg-[#0038A8] text-white border-[#0038A8] font-bold shadow-2xs' : 'bg-white text-[#5D4037] border-[#F5C7B3] hover:bg-[#FCD5C0]'}">
                10 Thn
              </button>
              <button type="button" id="filter-preset-all" class="px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${this.state.start_year === 1990 && this.state.end_year === 2026 ? 'bg-[#0038A8] text-white border-[#0038A8] font-bold shadow-2xs' : 'bg-white text-[#5D4037] border-[#F5C7B3] hover:bg-[#FCD5C0]'}">
                1990-2026
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input type="number" id="filter-start-year" class="gov-input text-xs font-mono text-center w-full py-0.5 bg-white border border-[#F5C7B3] text-[#202124]" min="1990" max="2026" value="${this.state.start_year}">
            <span class="text-[#7D655C] text-xs font-mono font-medium">s/d</span>
            <input type="number" id="filter-end-year" class="gov-input text-xs font-mono text-center w-full py-0.5 bg-white border border-[#F5C7B3] text-[#202124]" min="1990" max="2026" value="${this.state.end_year}">
          </div>
        </div>

        <!-- Metadata Footnote -->
        <div class="pt-1.5 border-t border-[#F5C7B3] flex items-center justify-between text-[9.5px] font-mono text-[#7D655C]">
          <span>Cakupan: <strong class="text-[#3E2723]">1990 - 2026 (Angka Sementara 2026)</strong></span>
          <span>Granularitas: <strong class="text-[#3E2723]">Nasional</strong></span>
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
    document.getElementById('filter-preset-5y')?.addEventListener('click', () => {
      this.state.start_year = 2021;
      this.state.end_year = 2026;
      this.render();
      this.onFilterChange(this.state);
    });

    document.getElementById('filter-preset-10y')?.addEventListener('click', () => {
      this.state.start_year = 2016;
      this.state.end_year = 2026;
      this.render();
      this.onFilterChange(this.state);
    });

    document.getElementById('filter-preset-all')?.addEventListener('click', () => {
      this.state.start_year = 1990;
      this.state.end_year = 2026;
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
