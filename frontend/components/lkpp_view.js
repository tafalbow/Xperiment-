// ==============================================================================
// LKPP TIME-SERIES STATUTORY STATEMENTS OBSERVATORY (1990 – 2026)
// Kompilasi 6 Laporan Keuangan Pokok Republik Indonesia:
// 1. Laporan Realisasi Anggaran (LRA)
// 2. Laporan Perubahan Saldo Anggaran Lebih (LPSAL)
// 3. Neraca Pemerintah Pusat
// 4. Laporan Operasional (LO)
// 5. Laporan Arus Kas (LAK)
// 6. Laporan Perubahan Ekuitas (LPE)
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

export class LKPPView {
  constructor(containerId) {
    this.containerId = containerId;
    this.tableId = 'LRA';
    this.startYear = 1990;
    this.endYear = 2026;
    this.unit = 'TRILLION'; // TRILLION | BILLION | MILLION
    this.searchKeyword = '';
    
    this.tableList = [];
    this.matrixData = null;
    this.glossaryData = null;
    this.isLoading = false;
    this.activeTrendData = null;
    this.trendHoverIndex = -1;
  }

  async init() {
    try {
      const res = await ApiClient.fetchLKPPTableList();
      this.tableList = res.tables || [];
    } catch (e) {
      console.warn('Gagal memuat registry tabel LKPP:', e);
    }
    await this.loadAndRender();
  }

  async loadAndRender() {
    this.isLoading = true;
    this.renderLoading();

    try {
      this.matrixData = await ApiClient.fetchLKPPMatrix({
        table_id: this.tableId,
        start_year: this.startYear,
        end_year: this.endYear,
        unit: this.unit,
        q: this.searchKeyword
      });
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
        <div class="inline-block w-8 h-8 border-3 border-[#1A73E8] border-t-transparent rounded-full animate-spin"></div>
        <div class="text-xs font-mono font-medium text-[#5F6368]">
          Mengompilasi Data Trend Keuangan Negara ${this.tableId} (${this.startYear} – ${this.endYear})...
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
        <div class="font-bold text-sm">Gagal Memuat Data Trend Keuangan Negara</div>
        <p>${msg}</p>
        <button id="btn-lkpp-retry" class="gov-btn px-4 py-1.5 bg-rose-600 text-white hover:bg-rose-700 font-sans cursor-pointer">
          Coba Lagi
        </button>
      </div>
    `;
    document.getElementById('btn-lkpp-retry')?.addEventListener('click', () => this.loadAndRender());
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container || !this.matrixData) return;

    const meta = this.matrixData.table_meta;
    const filter = this.matrixData.filter;
    const years = this.matrixData.year_columns;
    const rows = this.matrixData.rows;

    container.innerHTML = `
      <div class="space-y-4 font-sans">
        
        <!-- 1. HEADER BANNER & ACTION TOOLBAR -->
        <div class="gov-card p-5 bg-white border border-[#DADCE0] shadow-2xs space-y-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-semibold bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]">
                  🏛️ Observatorium Trend Keuangan Negara (APBN, RAPBN & LKPP 1990 – 2026)
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]">
                  Standardisasi BAS PP 71/2010
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium bg-[#F1F3F4] text-[#5F6368]">
                  ${years.length} Titik Data Tahunan
                </span>
              </div>
              <h1 class="text-base sm:text-lg font-bold text-[#202124] tracking-tight">
                Deret Waktu ${meta.name}
              </h1>
              <p class="text-xs text-[#5F6368] leading-relaxed max-w-4xl font-mono">
                ${meta.description}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 flex-wrap shrink-0">
              <button 
                id="btn-lkpp-glossary"
                class="px-3 py-1.5 text-xs font-mono font-medium rounded border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-[#202124] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                title="Buka kamus perbandingan perubahan nama pos akun lintas era"
              >
                <span>📖</span>
                <span>Glosari Nomenklatur</span>
              </button>

              <button 
                id="btn-lkpp-export-excel"
                class="px-3 py-1.5 text-xs font-mono font-medium rounded border border-[#34A853] bg-[#E6F4EA] hover:bg-[#CEEAD6] text-[#137333] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                title="Unduh data tabel matriks dalam format Excel (.xlsx)"
              >
                <span>📥</span>
                <span>Excel (.xlsx)</span>
              </button>

              <button 
                id="btn-lkpp-export-csv"
                class="px-3 py-1.5 text-xs font-mono font-medium rounded border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-[#3C4043] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                title="Unduh data tabel matriks dalam format CSV"
              >
                <span>📄</span>
                <span>CSV</span>
              </button>

              <button 
                id="btn-lkpp-refresh"
                class="p-1.5 text-xs rounded border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-[#5F6368] cursor-pointer"
                title="Muat Ulang"
              >
                🔄
              </button>
            </div>
          </div>

          <!-- 2. FILTER CONTROLS BAR -->
          <div class="pt-4 border-t border-[#E8EAED] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
            
            <!-- Table Selector (5 cols) -->
            <div class="lg:col-span-4 space-y-1">
              <label class="block text-[11px] font-mono font-bold text-[#3C4043] uppercase tracking-wider">
                1. Pilihan Tabel Keuangan Negara (APBN, RAPBN & LKPP)
              </label>
              <select id="sel-lkpp-table" class="w-full text-xs font-sans px-2.5 py-1.5 rounded border border-[#DADCE0] bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]">
                ${this.tableList.map(t => `
                  <option value="${t.id}" ${t.id === this.tableId ? 'selected' : ''}>
                    ${t.number}. ${t.name} (${t.short_name})
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Timeframe Filter (3 cols) -->
            <div class="lg:col-span-3 space-y-1">
              <label class="block text-[11px] font-mono font-bold text-[#3C4043] uppercase tracking-wider">
                2. Kurun Waktu (Tahun)
              </label>
              <div class="flex items-center gap-2">
                <select id="sel-lkpp-start-year" class="w-1/2 text-xs font-mono px-2 py-1.5 rounded border border-[#DADCE0] bg-white text-[#202124]">
                  ${this.generateYearOptions(1990, 2026, this.startYear)}
                </select>
                <span class="text-xs font-mono text-[#5F6368]">s/d</span>
                <select id="sel-lkpp-end-year" class="w-1/2 text-xs font-mono px-2 py-1.5 rounded border border-[#DADCE0] bg-white text-[#202124]">
                  ${this.generateYearOptions(1990, 2026, this.endYear)}
                </select>
              </div>
            </div>

            <!-- Display Unit (2 cols) -->
            <div class="lg:col-span-2 space-y-1">
              <label class="block text-[11px] font-mono font-bold text-[#3C4043] uppercase tracking-wider">
                3. Satuan Angka
              </label>
              <select id="sel-lkpp-unit" class="w-full text-xs font-sans px-2 py-1.5 rounded border border-[#DADCE0] bg-white text-[#202124]">
                <option value="TRILLION" ${this.unit === 'TRILLION' ? 'selected' : ''}>Triliun Rp (Rp T)</option>
                <option value="BILLION" ${this.unit === 'BILLION' ? 'selected' : ''}>Miliar Rp (Rp M)</option>
                <option value="MILLION" ${this.unit === 'MILLION' ? 'selected' : ''}>Juta Rp (Rp Jt)</option>
              </select>
            </div>

            <!-- Quick Search Row (3 cols) -->
            <div class="lg:col-span-3 space-y-1">
              <label class="block text-[11px] font-mono font-bold text-[#3C4043] uppercase tracking-wider">
                4. Cari Kelompok Pos / Biaya
              </label>
              <div class="relative">
                <input 
                  type="text" 
                  id="input-lkpp-search" 
                  value="${this.searchKeyword}" 
                  placeholder="Misal: Pegawai, Bunga, Modal, SAL..."
                  class="w-full text-xs px-2.5 py-1.5 pl-7 rounded border border-[#DADCE0] bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                />
                <span class="absolute left-2.5 top-2 text-[11px] text-[#5F6368]">🔍</span>
                ${this.searchKeyword ? `
                  <button id="btn-lkpp-clear-search" class="absolute right-2 top-1.5 text-xs text-[#5F6368] hover:text-[#202124]">✕</button>
                ` : ''}
              </div>
            </div>

          </div>

          <!-- Quick Era Preset Badges -->
          <div class="flex items-center gap-2 flex-wrap pt-2 text-[11px] font-mono">
            <span class="text-[#5F6368] font-bold">Preset Era:</span>
            <button class="btn-era-preset px-2.5 py-0.5 rounded border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE] text-[#3C4043] hover:text-[#1A73E8] cursor-pointer transition-all" data-start="1990" data-end="2026">
              🏛️ Semua Era (1990–2026)
            </button>
            <button class="btn-era-preset px-2.5 py-0.5 rounded border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE] text-[#3C4043] hover:text-[#1A73E8] cursor-pointer transition-all" data-start="2015" data-end="2026">
              📊 SAP Akrual Penuh (2015–2026)
            </button>
            <button class="btn-era-preset px-2.5 py-0.5 rounded border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE] text-[#3C4043] hover:text-[#1A73E8] cursor-pointer transition-all" data-start="2005" data-end="2014">
              ⚖️ Kas Menuju Akrual (2005–2014)
            </button>
            <button class="btn-era-preset px-2.5 py-0.5 rounded border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE] text-[#3C4043] hover:text-[#1A73E8] cursor-pointer transition-all" data-start="1990" data-end="2004">
              📜 Dual Budgeting / PAN (1990–2004)
            </button>
          </div>
        </div>

        <!-- 3. STATUTORY METADATA SUMMARY STRIP -->
        <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono">
          <div class="space-y-0.5">
            <div>
              <span class="text-[#5F6368]">Dasar Hukum:</span> 
              <strong class="text-[#202124]">${meta.statutory_basis}</strong>
              <span class="mx-1 text-[#DADCE0]">|</span>
              <span class="text-[#5F6368]">Basis:</span> 
              <strong class="text-[#1A73E8]">${meta.accounting_basis}</strong>
            </div>
            <div class="text-[11px] text-[#5F6368]">
              Catatan: ${meta.coverage_note}
            </div>
          </div>

          <!-- Audit Status Legend -->
          <div class="flex items-center gap-3 shrink-0 text-[10.5px]">
            <span class="flex items-center gap-1">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span class="text-[#3C4043]">Audited BPK RI (1990-2024)</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span class="text-[#3C4043]">Sementara APBN KiTa (2025)</span>
            </span>
            <span class="flex items-center gap-1">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span class="text-[#3C4043]">Alokasi UU APBN (2026)</span>
            </span>
          </div>
        </div>

        <!-- 4. PIVOT MATRIX DATA TABLE (HORIZONTAL SCROLL) -->
        <div class="gov-card bg-white border border-[#DADCE0] shadow-2xs overflow-hidden">
          <div class="p-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between text-xs font-mono">
            <div class="flex items-center gap-2">
              <span class="font-bold text-[#202124]">Tabel Matriks Deret Waktu:</span>
              <span class="text-[#5F6368]">${meta.short_name} (${rows.length} Pos / Akun Terdaftar)</span>
            </div>
            <div class="text-[11px] text-[#5F6368]">
              💡 Klik baris atau tombol <span class="text-[#1A73E8] font-bold">[📈 Tren]</span> untuk melihat grafik & statistik pertumbuhan
            </div>
          </div>

          <div class="overflow-x-auto max-h-[650px] relative scrollbar-thin">
            <table class="w-full text-xs text-left border-collapse">
              
              <!-- Table Headers -->
              <thead class="bg-[#F1F3F4] text-[#202124] font-mono sticky top-0 z-30 shadow-2xs">
                <tr class="border-b border-[#DADCE0]">
                  <!-- Sticky Column 1: Akun -->
                  <th scope="col" class="py-2.5 px-3 font-bold text-center border-r border-[#DADCE0] sticky left-0 bg-[#F1F3F4] z-40 min-w-[70px]">
                    KODE
                  </th>
                  <!-- Sticky Column 2: Kelompok Biaya / Pos -->
                  <th scope="col" class="py-2.5 px-3 font-bold border-r border-[#DADCE0] sticky left-[70px] bg-[#F1F3F4] z-40 min-w-[280px]">
                    KELOMPOK POS / BIAYA KEUANGAN NEGARA
                  </th>
                  <!-- Sticky Column 3: Kategori -->
                  <th scope="col" class="py-2.5 px-3 font-bold border-r border-[#DADCE0] sticky left-[350px] bg-[#F1F3F4] z-40 min-w-[150px]">
                    KLASIFIKASI
                  </th>
                  <!-- Sticky Column 4: Aksi Tren -->
                  <th scope="col" class="py-2.5 px-2 font-bold text-center border-r border-[#DADCE0] sticky left-[500px] bg-[#F1F3F4] z-40 min-w-[70px]">
                    TREN
                  </th>

                  <!-- Dynamic Year Columns (1990 to 2026) -->
                  ${years.map(y => `
                    <th scope="col" class="py-2 px-3 text-right font-mono border-r border-[#DADCE0] min-w-[120px]">
                      <div class="font-bold text-xs text-[#202124]">${y.year}</div>
                      <div class="text-[9px] font-normal px-1 py-0.2 rounded inline-block mt-0.5 border ${y.badge_class}">
                        ${y.status === 'audited' ? 'Audited' : (y.status === 'provisional' ? 'Sementara' : 'Pagu UU')}
                      </div>
                    </th>
                  `).join('')}
                </tr>
              </thead>

              <!-- Table Body -->
              <tbody class="divide-y divide-[#E8EAED] font-mono">
                ${rows.length === 0 ? `
                  <tr>
                    <td colspan="${years.length + 4}" class="p-8 text-center text-[#5F6368]">
                      Tidak ada akun atau kelompok biaya yang cocok dengan pencarian "<strong>${this.searchKeyword}</strong>".
                    </td>
                  </tr>
                ` : rows.map(r => this.renderTableRow(r, years, filter.unit_symbol)).join('')}
              </tbody>

            </table>
          </div>

          <!-- Table Footer Strip -->
          <div class="p-3 bg-[#F8F9FA] border-t border-[#DADCE0] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5F6368] gap-2">
            <div>
              Sumber: UU APBN • Nota Keuangan RAPBN • LKPP Audited BPK RI (1990–2024) • Realisasi Sementara APBN KiTa (2025)
            </div>
            <div>
              Satuan Data: <strong class="text-[#202124]">${filter.unit_label}</strong>
            </div>
          </div>
        </div>

      </div>

      <!-- CONTAINER FOR MODALS (TREND & GLOSSARY) -->
      <div id="lkpp-modal-mount"></div>
    `;

    this.bindEvents();
  }

  renderTableRow(row, years, unitSymbol) {
    const isHdr = row.is_header;
    const isL1 = row.level === 1;
    const isL2 = row.level === 2;

    const rowBg = isHdr 
      ? 'bg-[#F1F3F4] hover:bg-[#E8EAED] font-bold text-[#202124]' 
      : 'bg-white hover:bg-[#F8F9FA] text-[#3C4043]';

    const stickyBg = isHdr ? 'bg-[#F1F3F4]' : 'bg-white';

    // Indentation for sub-items
    const indentClass = row.level === 2 ? 'pl-5' : (row.level >= 3 ? 'pl-8' : 'pl-3');

    return `
      <tr class="${rowBg} cursor-pointer transition-colors group lkpp-table-row" data-item-id="${row.id}">
        
        <!-- Sticky Col 1: Code -->
        <td class="py-2 px-3 text-center border-r border-[#DADCE0] sticky left-0 ${stickyBg} group-hover:bg-[#E8F0FE] z-20 font-bold text-[11px] text-[#1A73E8]">
          ${row.code || '-'}
        </td>

        <!-- Sticky Col 2: Name -->
        <td class="py-2 px-3 border-r border-[#DADCE0] sticky left-[70px] ${stickyBg} group-hover:bg-[#E8F0FE] z-20 ${indentClass}">
          <div class="flex items-center gap-1.5">
            ${isHdr ? '<span class="text-[#1A73E8]">▪</span>' : '<span class="text-[#BDC1C6]">•</span>'}
            <span class="${isHdr ? 'font-bold text-[#202124]' : 'font-medium'}">${row.name}</span>
          </div>
        </td>

        <!-- Sticky Col 3: Category -->
        <td class="py-2 px-3 border-r border-[#DADCE0] sticky left-[350px] ${stickyBg} group-hover:bg-[#E8F0FE] z-20 text-[11px] text-[#5F6368] truncate max-w-[150px]">
          ${row.category || '-'}
        </td>

        <!-- Sticky Col 4: Trend Button -->
        <td class="py-2 px-2 text-center border-r border-[#DADCE0] sticky left-[500px] ${stickyBg} group-hover:bg-[#E8F0FE] z-20">
          <button 
            class="btn-view-trend px-2 py-0.5 rounded text-[10.5px] font-mono font-medium border border-[#DADCE0] bg-white hover:bg-[#E8F0FE] hover:text-[#1A73E8] hover:border-[#1A73E8] text-[#3C4043] cursor-pointer transition-all"
            data-item-id="${row.id}"
            title="Lihat Grafik Tren Deret Waktu"
          >
            📈 Tren
          </button>
        </td>

        <!-- Dynamic Year Values -->
        ${years.map(y => {
          const val = row.values[y.year_str];
          const isNegative = val < 0;
          const valStr = val !== undefined && val !== null
            ? Number(val).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : '-';

          const numColor = isNegative ? 'text-rose-600 font-semibold' : (isHdr ? 'text-[#202124]' : 'text-[#3C4043]');

          return `
            <td class="py-2 px-3 text-right border-r border-[#DADCE0] ${numColor}">
              ${valStr}
            </td>
          `;
        }).join('')}

      </tr>
    `;
  }

  generateYearOptions(minY, maxY, selectedY) {
    let opts = '';
    for (let y = minY; y <= maxY; y++) {
      opts += `<option value="${y}" ${y === selectedY ? 'selected' : ''}>${y}</option>`;
    }
    return opts;
  }

  bindEvents() {
    // 1. Table Selector
    document.getElementById('sel-lkpp-table')?.addEventListener('change', (e) => {
      this.tableId = e.target.value;
      this.loadAndRender();
    });

    // 2. Start Year & End Year
    document.getElementById('sel-lkpp-start-year')?.addEventListener('change', (e) => {
      this.startYear = parseInt(e.target.value, 10);
      if (this.startYear > this.endYear) this.endYear = this.startYear;
      this.loadAndRender();
    });
    document.getElementById('sel-lkpp-end-year')?.addEventListener('change', (e) => {
      this.endYear = parseInt(e.target.value, 10);
      if (this.endYear < this.startYear) this.startYear = this.endYear;
      this.loadAndRender();
    });

    // 3. Era Presets
    document.querySelectorAll('.btn-era-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.startYear = parseInt(btn.dataset.start, 10);
        this.endYear = parseInt(btn.dataset.end, 10);
        this.loadAndRender();
      });
    });

    // 4. Unit Selector
    document.getElementById('sel-lkpp-unit')?.addEventListener('change', (e) => {
      this.unit = e.target.value;
      this.loadAndRender();
    });

    // 5. Search Input with live debounce
    let searchTimeout = null;
    const searchInput = document.getElementById('input-lkpp-search');
    searchInput?.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.searchKeyword = e.target.value.trim();
        this.loadAndRender();
      }, 350);
    });

    document.getElementById('btn-lkpp-clear-search')?.addEventListener('click', () => {
      this.searchKeyword = '';
      this.loadAndRender();
    });

    // 6. Action Toolbar Buttons
    document.getElementById('btn-lkpp-refresh')?.addEventListener('click', () => {
      this.loadAndRender();
    });

    document.getElementById('btn-lkpp-export-excel')?.addEventListener('click', () => {
      const url = ApiClient.getLKPPExportUrl({
        table_id: this.tableId,
        start_year: this.startYear,
        end_year: this.endYear,
        unit: this.unit,
        format: 'xlsx'
      });
      window.location.href = url;
    });

    document.getElementById('btn-lkpp-export-csv')?.addEventListener('click', () => {
      const url = ApiClient.getLKPPExportUrl({
        table_id: this.tableId,
        start_year: this.startYear,
        end_year: this.endYear,
        unit: this.unit,
        format: 'csv'
      });
      window.location.href = url;
    });

    document.getElementById('btn-lkpp-glossary')?.addEventListener('click', () => {
      this.openGlossaryModal();
    });

    // 7. Trend Modal triggers
    document.querySelectorAll('.btn-view-trend').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemId = btn.dataset.itemId;
        this.openTrendModal(itemId);
      });
    });

    document.querySelectorAll('.lkpp-table-row').forEach(tr => {
      tr.addEventListener('click', () => {
        const itemId = tr.dataset.itemId;
        this.openTrendModal(itemId);
      });
    });
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE LINE ITEM TREND MODAL (NATIVE CANVAS)
  // --------------------------------------------------------------------------
  async openTrendModal(itemId) {
    const mount = document.getElementById('lkpp-modal-mount');
    if (!mount) return;

    // Show initial loading modal
    mount.innerHTML = `
      <div class="gov-modal-overlay">
        <div class="gov-modal-content max-w-4xl p-8 bg-white text-center space-y-3 font-mono">
          <div class="inline-block w-8 h-8 border-3 border-[#1A73E8] border-t-transparent rounded-full animate-spin"></div>
          <div class="text-xs text-[#5F6368]">Memuat data tren deret waktu untuk ${itemId}...</div>
        </div>
      </div>
    `;

    try {
      this.activeTrendData = await ApiClient.fetchLKPPTrend({
        table_id: this.tableId,
        item_id: itemId,
        unit: this.unit
      });
    } catch (err) {
      mount.innerHTML = `
        <div class="gov-modal-overlay">
          <div class="gov-modal-content max-w-md p-6 bg-white space-y-3 font-mono text-xs">
            <div class="font-bold text-rose-600">Gagal Memuat Tren</div>
            <p>${err.message}</p>
            <button id="btn-close-trend-err" class="gov-btn px-4 py-1.5 bg-[#1A73E8] text-white">Tutup</button>
          </div>
        </div>
      `;
      document.getElementById('btn-close-trend-err')?.addEventListener('click', () => { mount.innerHTML = ''; });
      return;
    }

    const tData = this.activeTrendData;
    const stats = tData.statistics;
    const series = tData.series;

    mount.innerHTML = `
      <div class="gov-modal-overlay" id="trend-modal-overlay">
        <div class="gov-modal-content max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
          
          <!-- Modal Header -->
          <div class="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F0FE] text-[#1A73E8]">
                  KODE: ${tData.code || tData.item_id}
                </span>
                <span class="text-xs text-[#5F6368] font-mono font-medium">Tabel: ${tData.table_id} • ${tData.category}</span>
              </div>
              <h2 class="text-base font-bold text-[#202124]">
                ${tData.name} (1990 – 2026)
              </h2>
            </div>
            <button id="btn-close-trend-modal" class="text-[#5F6368] hover:text-[#202124] text-xl font-bold cursor-pointer px-2">
              ✕
            </button>
          </div>

          <!-- Modal Body Scrollable -->
          <div class="p-6 overflow-y-auto space-y-5">
            
            <!-- KPI Summary Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">Nilai Terkini (2026)</div>
                <div class="text-base font-bold text-[#1A73E8] font-mono">
                  ${Number(stats.latest_value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                  <span class="text-[10px] text-[#5F6368]">${tData.unit_symbol}</span>
                </div>
                <div class="text-[9.5px] font-mono text-[#1E8E3E]">Target Pagu APBN 2026</div>
              </div>

              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">Nilai Awal (1990)</div>
                <div class="text-base font-bold text-[#202124] font-mono">
                  ${Number(stats.start_value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                  <span class="text-[10px] text-[#5F6368]">${tData.unit_symbol}</span>
                </div>
                <div class="text-[9.5px] font-mono text-[#5F6368]">Era Dual Budgeting (PAN)</div>
              </div>

              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">CAGR Historis</div>
                <div class="text-base font-bold ${stats.cagr_percent >= 0 ? 'text-emerald-700' : 'text-rose-700'} font-mono">
                  ${stats.cagr_percent !== null ? `${stats.cagr_percent > 0 ? '+' : ''}${stats.cagr_percent}%` : 'N/A'}
                </div>
                <div class="text-[9.5px] font-mono text-[#5F6368]">Compound Annual Growth</div>
              </div>

              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">Nilai Puncak (Maks)</div>
                <div class="text-base font-bold text-[#D93025] font-mono">
                  ${Number(stats.max_value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                  <span class="text-[10px] text-[#5F6368]">${tData.unit_symbol}</span>
                </div>
                <div class="text-[9.5px] font-mono text-[#5F6368]">Tertinggi Sepanjang Masa</div>
              </div>

            </div>

            <!-- Historical Canvas Chart -->
            <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-2">
              <div class="flex items-center justify-between text-xs font-mono">
                <div class="font-bold text-[#202124] flex items-center gap-1.5">
                  <span>📈</span>
                  <span>Visualisasi Deret Waktu Multi-Tahun (${tData.unit_label})</span>
                </div>
                <div id="trend-chart-hover-info" class="text-[11px] text-[#1A73E8] font-bold">
                  Arahkan kursor ke titik grafik untuk detail tahun
                </div>
              </div>
              
              <div class="relative w-full h-[260px] bg-slate-50 rounded border border-[#E8EAED]">
                <canvas id="canvas-lkpp-trend" class="w-full h-full block cursor-crosshair"></canvas>
              </div>

              <div class="flex items-center justify-between text-[10.5px] font-mono text-[#5F6368] pt-1">
                <span>1990 (Dual Budgeting)</span>
                <span>2005 (Kas Menuju Akrual)</span>
                <span>2015 (Akrual Penuh)</span>
                <span>2026 (Pagu APBN)</span>
              </div>
            </div>

            <!-- Historical Note & Reconciliation Box -->
            <div class="p-3 bg-[#E8F0FE] rounded-lg border border-[#D2E3FC] text-xs font-mono text-[#174EA6] space-y-1">
              <div class="font-bold flex items-center gap-1">
                <span>ℹ️</span>
                <span>Catatan Akuntansi & Rekam Jejak Historis:</span>
              </div>
              <p class="leading-relaxed text-[11.5px]">
                ${tData.historical_note}
              </p>
            </div>

            <!-- Data Breakdown Mini-Table -->
            <div class="space-y-2">
              <div class="text-xs font-mono font-bold text-[#202124] flex items-center justify-between">
                <span>Rincian Pertumbuhan Tahunan (YoY Growth %):</span>
                <span class="text-[10.5px] font-normal text-[#5F6368]">Total ${series.length} Observasi</span>
              </div>
              
              <div class="overflow-x-auto max-h-[220px] rounded border border-[#DADCE0] scrollbar-thin">
                <table class="w-full text-xs text-left border-collapse font-mono">
                  <thead class="bg-[#F1F3F4] text-[#202124] sticky top-0 border-b border-[#DADCE0]">
                    <tr>
                      <th class="py-1.5 px-3">TAHUN</th>
                      <th class="py-1.5 px-3 text-right">NILAI (${tData.unit_symbol})</th>
                      ${series.some(s => s.apbn_target !== null && s.apbn_target !== undefined) ? `
                        <th class="py-1.5 px-3 text-right text-[#1A73E8]">TARGET APBN</th>
                        <th class="py-1.5 px-3 text-right text-[#137333]">CAPAIAN %</th>
                      ` : ''}
                      <th class="py-1.5 px-3 text-right">YOY %</th>
                      <th class="py-1.5 px-3 text-center">STATUS</th>
                      <th class="py-1.5 px-3">DOKUMEN STATUTORI SITASI</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E8EAED]">
                    ${series.slice().reverse().map(p => `
                      <tr class="hover:bg-[#F8F9FA]">
                        <td class="py-1.5 px-3 font-bold text-[#202124]">${p.year}</td>
                        <td class="py-1.5 px-3 text-right font-medium">
                          ${Number(p.value).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        ${series.some(s => s.apbn_target !== null && s.apbn_target !== undefined) ? `
                          <td class="py-1.5 px-3 text-right font-mono text-[#1A73E8]">
                            ${p.apbn_target !== null && p.apbn_target !== undefined ? Number(p.apbn_target).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
                          </td>
                          <td class="py-1.5 px-3 text-right font-mono ${p.achievement_percent !== null && p.achievement_percent !== undefined ? (p.achievement_percent >= 100 ? 'text-emerald-700 font-bold' : 'text-amber-700') : 'text-[#5F6368]'}">
                            ${p.achievement_percent !== null && p.achievement_percent !== undefined ? `${p.achievement_percent}%` : '-'}
                          </td>
                        ` : ''}
                        <td class="py-1.5 px-3 text-right font-medium ${p.yoy_percent !== null ? (p.yoy_percent >= 0 ? 'text-emerald-700' : 'text-rose-700') : 'text-[#5F6368]'}">
                          ${p.yoy_percent !== null ? `${p.yoy_percent > 0 ? '+' : ''}${p.yoy_percent}%` : '-'}
                        </td>
                        <td class="py-1.5 px-3 text-center">
                          <span class="px-1.5 py-0.2 rounded text-[9.5px] font-mono ${p.status === 'audited' ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : (p.status === 'provisional' ? 'bg-amber-50 text-amber-700 border border-amber-300' : 'bg-blue-50 text-blue-700 border border-blue-300')}">
                            ${p.status.toUpperCase()}
                          </span>
                        </td>
                        <td class="py-1.5 px-3 text-[10.5px] text-[#5F6368] truncate max-w-[280px]" title="${p.legal_doc}">
                          ${p.legal_doc}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-3 bg-[#F8F9FA] border-t border-[#DADCE0] flex items-center justify-between">
            <span class="text-[11px] font-mono text-[#5F6368]">
              Data Sumber Resmi Kementerian Keuangan RI & BPK RI
            </span>
            <button id="btn-close-trend-footer" class="px-4 py-1.5 rounded text-xs font-mono font-medium border border-[#DADCE0] bg-white hover:bg-[#F1F3F4] text-[#202124] cursor-pointer">
              Tutup
            </button>
          </div>

        </div>
      </div>
    `;

    // Bind Close events
    const closeModal = () => { mount.innerHTML = ''; };
    document.getElementById('btn-close-trend-modal')?.addEventListener('click', closeModal);
    document.getElementById('btn-close-trend-footer')?.addEventListener('click', closeModal);
    document.getElementById('trend-modal-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'trend-modal-overlay') closeModal();
    });

    // Draw canvas chart
    this.drawTrendCanvas();
    this.bindCanvasHover();
  }

  drawTrendCanvas() {
    const canvas = document.getElementById('canvas-lkpp-trend');
    if (!canvas || !this.activeTrendData) return;

    const series = this.activeTrendData.series;
    if (!series || series.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.floor(rect.width || 750);
    const height = Math.floor(rect.height || 260);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padLeft = 65;
    const padRight = 25;
    const padTop = 20;
    const padBottom = 35;

    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const values = series.map(s => s.value);
    let minVal = Math.min(...values);
    let maxVal = Math.max(...values);
    if (minVal === maxVal) {
      minVal -= 1;
      maxVal += 1;
    }
    // Buffer
    const valSpan = maxVal - minVal;
    minVal = minVal > 0 ? Math.max(0, minVal - valSpan * 0.1) : minVal - valSpan * 0.1;
    maxVal = maxVal + valSpan * 0.1;

    const getX = (idx) => padLeft + (idx / (series.length - 1)) * chartW;
    const getY = (val) => padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

    // 1. Draw horizontal grid lines & Y labels
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#5F6368';
    ctx.strokeStyle = '#E8EAED';
    ctx.lineWidth = 1;

    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const gVal = minVal + (i / gridSteps) * (maxVal - minVal);
      const yPos = getY(gVal);

      ctx.beginPath();
      ctx.moveTo(padLeft, yPos);
      ctx.lineTo(padLeft + chartW, yPos);
      ctx.stroke();

      const label = Number(gVal).toLocaleString('id-ID', { maximumFractionDigits: 1 });
      ctx.fillText(label, padLeft - 8, yPos);
    }

    // 2. Draw Zero-line if minVal < 0 < maxVal
    if (minVal < 0 && maxVal > 0) {
      const zeroY = getY(0);
      ctx.strokeStyle = '#D93025';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padLeft, zeroY);
      ctx.lineTo(padLeft + chartW, zeroY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 3. Draw gradient area under the curve
    const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
    grad.addColorStop(0, 'rgba(26, 115, 232, 0.25)');
    grad.addColorStop(1, 'rgba(26, 115, 232, 0.01)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(series[0].value));
    for (let i = 1; i < series.length; i++) {
      ctx.lineTo(getX(i), getY(series[i].value));
    }
    ctx.lineTo(getX(series.length - 1), padTop + chartH);
    ctx.lineTo(getX(0), padTop + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // 4. Draw line series
    ctx.beginPath();
    ctx.strokeStyle = '#1A73E8';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.moveTo(getX(0), getY(series[0].value));
    for (let i = 1; i < series.length; i++) {
      ctx.lineTo(getX(i), getY(series[i].value));
    }
    ctx.stroke();

    // 5. Draw data points
    series.forEach((pt, idx) => {
      const x = getX(idx);
      const y = getY(pt.value);

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = pt.status === 'audited' ? '#1E8E3E' : (pt.status === 'provisional' ? '#FBBC04' : '#1A73E8');
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 6. Draw X-axis Year labels at milestones
    ctx.fillStyle = '#5F6368';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const milestones = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024, 2026];
    series.forEach((pt, idx) => {
      if (milestones.includes(pt.year)) {
        ctx.fillText(String(pt.year), getX(idx), padTop + chartH + 8);
      }
    });

    // 7. Hover Indicator
    if (this.trendHoverIndex >= 0 && this.trendHoverIndex < series.length) {
      const hPt = series[this.trendHoverIndex];
      const hX = getX(this.trendHoverIndex);
      const hY = getY(hPt.value);

      // Vertical line
      ctx.strokeStyle = '#5F6368';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(hX, padTop);
      ctx.lineTo(hX, padTop + chartH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point highlight
      ctx.beginPath();
      ctx.arc(hX, hY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#1A73E8';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  bindCanvasHover() {
    const canvas = document.getElementById('canvas-lkpp-trend');
    const infoBox = document.getElementById('trend-chart-hover-info');
    if (!canvas || !this.activeTrendData) return;

    const series = this.activeTrendData.series;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const padLeft = 65;
      const padRight = 25;
      const chartW = rect.width - padLeft - padRight;

      if (mouseX < padLeft || mouseX > padLeft + chartW) {
        this.trendHoverIndex = -1;
        this.drawTrendCanvas();
        return;
      }

      const ratio = (mouseX - padLeft) / chartW;
      const idx = Math.min(series.length - 1, Math.max(0, Math.round(ratio * (series.length - 1))));
      this.trendHoverIndex = idx;
      this.drawTrendCanvas();

      const pt = series[idx];
      if (infoBox) {
        const valFormatted = Number(pt.value).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const yoyStr = pt.yoy_percent !== null ? ` • YoY: ${pt.yoy_percent > 0 ? '+' : ''}${pt.yoy_percent}%` : '';
        infoBox.innerHTML = `
          Tahun <strong class="text-[#202124]">${pt.year}</strong>: 
          <strong class="text-[#1A73E8]">${valFormatted} ${this.activeTrendData.unit_symbol}</strong>
          ${yoyStr}
          <span class="text-[10px] text-[#5F6368]">(${pt.badge_text})</span>
        `;
      }
    });

    canvas.addEventListener('mouseleave', () => {
      this.trendHoverIndex = -1;
      this.drawTrendCanvas();
      if (infoBox) {
        infoBox.innerText = 'Arahkan kursor ke titik grafik untuk detail tahun';
      }
    });
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE NOMENCLATURE & TERMINOLOGY GLOSSARY MODAL
  // --------------------------------------------------------------------------
  async openGlossaryModal() {
    const mount = document.getElementById('lkpp-modal-mount');
    if (!mount) return;

    // Show loading
    mount.innerHTML = `
      <div class="gov-modal-overlay">
        <div class="gov-modal-content max-w-2xl p-8 bg-white text-center space-y-3 font-mono">
          <div class="inline-block w-8 h-8 border-3 border-[#1A73E8] border-t-transparent rounded-full animate-spin"></div>
          <div class="text-xs text-[#5F6368]">Memuat Glosari Evolusi Nomenklatur LKPP...</div>
        </div>
      </div>
    `;

    try {
      if (!this.glossaryData) {
        this.glossaryData = await ApiClient.fetchLKPPGlossary();
      }
    } catch (err) {
      mount.innerHTML = `
        <div class="gov-modal-overlay">
          <div class="gov-modal-content max-w-md p-6 bg-white space-y-3 font-mono text-xs">
            <div class="font-bold text-rose-600">Gagal Memuat Glosari</div>
            <p>${err.message}</p>
            <button id="btn-close-gloss-err" class="gov-btn px-4 py-1.5 bg-[#1A73E8] text-white">Tutup</button>
          </div>
        </div>
      `;
      document.getElementById('btn-close-gloss-err')?.addEventListener('click', () => { mount.innerHTML = ''; });
      return;
    }

    const gData = this.glossaryData;
    const eras = gData.eras;
    const terms = gData.glossary;

    mount.innerHTML = `
      <div class="gov-modal-overlay" id="glossary-modal-overlay">
        <div class="gov-modal-content max-w-5xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
          
          <!-- Modal Header -->
          <div class="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F0FE] text-[#1A73E8]">
                  📖 Glosari Statutori
                </span>
                <span class="text-xs text-[#5F6368] font-mono">Bagan Akun Standar (PP 71/2010)</span>
              </div>
              <h2 class="text-base font-bold text-[#202124]">
                Rekam Jejak Evolusi Nomenklatur & Kelompok Biaya Keuangan Negara (1990 – 2026)
              </h2>
            </div>
            <button id="btn-close-glossary-modal" class="text-[#5F6368] hover:text-[#202124] text-xl font-bold cursor-pointer px-2">
              ✕
            </button>
          </div>

          <!-- Modal Body Scrollable -->
          <div class="p-6 overflow-y-auto space-y-6">
            
            <!-- 3 Accounting Eras Overview Cards -->
            <div class="space-y-2">
              <div class="text-xs font-mono font-bold text-[#202124] uppercase tracking-wider">
                Perjalanan Transformasi Standar Akuntansi Pemerintahan Indonesia
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${eras.map((era, idx) => `
                  <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1.5 flex flex-col justify-between">
                    <div class="space-y-1">
                      <div class="flex items-center gap-1.5">
                        <span class="w-5 h-5 rounded-full bg-[#E8F0FE] text-[#1A73E8] font-bold text-[10px] flex items-center justify-center font-mono">
                          ${idx + 1}
                        </span>
                        <strong class="text-xs text-[#202124] font-mono">${era.name}</strong>
                      </div>
                      <div class="text-[10px] font-mono text-[#1A73E8] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                        ${era.legal_statute}
                      </div>
                      <p class="text-[11px] text-[#5F6368] leading-relaxed pt-1">
                        ${era.characteristic}
                      </p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Search Filter for Glossary -->
            <div class="flex items-center justify-between gap-4 pt-2">
              <div class="text-xs font-mono font-bold text-[#202124]">
                Matriks Perbandingan Nomenklatur Pos Akun (${terms.length} Istilah):
              </div>
              <div class="w-72">
                <input 
                  type="text" 
                  id="input-glossary-filter" 
                  placeholder="Filter nama pos, kode, regulasi..."
                  class="w-full text-xs px-3 py-1.5 rounded border border-[#DADCE0] bg-white text-[#202124] font-mono focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                />
              </div>
            </div>

            <!-- Glossary Comparison Table -->
            <div class="overflow-x-auto rounded border border-[#DADCE0] scrollbar-thin">
              <table class="w-full text-xs text-left border-collapse font-sans" id="table-glossary-items">
                <thead class="bg-[#F1F3F4] text-[#202124] font-mono sticky top-0 border-b border-[#DADCE0]">
                  <tr>
                    <th class="py-2.5 px-3 border-r border-[#DADCE0] min-w-[60px] text-center">KODE</th>
                    <th class="py-2.5 px-3 border-r border-[#DADCE0] min-w-[200px]">ISTILAH BAS TERBARU (PP 71/2010)</th>
                    <th class="py-2.5 px-3 border-r border-[#DADCE0] min-w-[170px]">ERA DUAL BUDGETING (1990-2004)</th>
                    <th class="py-2.5 px-3 border-r border-[#DADCE0] min-w-[170px]">ERA CTA (2005-2014)</th>
                    <th class="py-2.5 px-3 border-r border-[#DADCE0] min-w-[180px]">DASAR HUKUM</th>
                    <th class="py-2.5 px-3 min-w-[280px]">CATATAN EVOLUSI & REKONSILIASI</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#E8EAED] font-mono">
                  ${terms.map(t => `
                    <tr class="hover:bg-[#F8F9FA] glossary-item-row" data-search="${(t.modern_term + ' ' + t.modern_code + ' ' + t.era_1990_2004 + ' ' + t.legal_basis + ' ' + t.evolution_summary).toLowerCase()}">
                      <td class="py-2 px-3 text-center border-r border-[#DADCE0] font-bold text-[#1A73E8]">
                        ${t.modern_code}
                      </td>
                      <td class="py-2 px-3 border-r border-[#DADCE0]">
                        <div class="font-bold text-[#202124]">${t.modern_term}</div>
                        <div class="text-[10px] text-[#5F6368]">${t.statement}</div>
                      </td>
                      <td class="py-2 px-3 border-r border-[#DADCE0] text-[#5F6368] text-[11px]">
                        ${t.era_1990_2004}
                      </td>
                      <td class="py-2 px-3 border-r border-[#DADCE0] text-[#5F6368] text-[11px]">
                        ${t.era_2005_2014}
                      </td>
                      <td class="py-2 px-3 border-r border-[#DADCE0] text-[10.5px] text-[#137333] font-medium">
                        ${t.legal_basis}
                      </td>
                      <td class="py-2 px-3 text-[11px] text-[#3C4043] leading-relaxed font-sans">
                        ${t.evolution_summary}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-3 bg-[#F8F9FA] border-t border-[#DADCE0] flex items-center justify-between">
            <span class="text-[11px] font-mono text-[#5F6368]">
              Disusun berdasarkan Bagan Akun Standar (BAS) Peraturan Menteri Keuangan RI
            </span>
            <button id="btn-close-glossary-footer" class="px-4 py-1.5 rounded text-xs font-mono font-medium border border-[#DADCE0] bg-white hover:bg-[#F1F3F4] text-[#202124] cursor-pointer">
              Tutup Glosari
            </button>
          </div>

        </div>
      </div>
    `;

    // Bind Close events
    const closeModal = () => { mount.innerHTML = ''; };
    document.getElementById('btn-close-glossary-modal')?.addEventListener('click', closeModal);
    document.getElementById('btn-close-glossary-footer')?.addEventListener('click', closeModal);
    document.getElementById('glossary-modal-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'glossary-modal-overlay') closeModal();
    });

    // Live search filter inside glossary
    const glossFilter = document.getElementById('input-glossary-filter');
    glossFilter?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.glossary-item-row').forEach(row => {
        const text = row.dataset.search || '';
        if (text.includes(q)) {
          row.classList.remove('hidden');
        } else {
          row.classList.add('hidden');
        }
      });
    });
  }
}
