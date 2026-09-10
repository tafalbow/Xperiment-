// ==============================================================================
// WEEKLY HIGH-FREQUENCY DATA OBSERVATORY (2014 – 2026)
// Kompilasi Data Mingguan Resmi Kementerian & Lembaga Republik Indonesia:
// 1. Bank Indonesia (BI): ITEMs — Indikator Terpilih Moneter & Sistem Pembayaran
// 2. Kementerian Keuangan RI (DJPb): Laporan Kinerja APBN Mingguan & Kas BUN
// 3. Otoritas Jasa Keuangan (OJK): Statistik Pasar Modal Mingguan & IHSG
// 4. Badan Pangan Nasional (Bapanas): Harga Pangan Strategis (Daily -> Weekly)
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

export class WeeklyView {
  constructor(containerId) {
    this.containerId = containerId;
    this.institutionId = 'ALL'; // ALL | BI | DJPB | OJK | BAPANAS
    this.viewMode = 'annual'; // 'annual' (2014-2026) | 'weekly' (W01-W52)
    this.year = 2026;
    this.searchKeyword = '';

    this.institutions = [];
    this.matrixData = null;
    this.isLoading = false;
    this.activeTrendData = null;
    this.trendHoverIndex = -1;
  }

  async init() {
    try {
      const res = await ApiClient.fetchWeeklyInstitutions();
      this.institutions = res.institutions || [];
    } catch (e) {
      console.warn('Gagal memuat metadata lembaga mingguan:', e);
    }
    await this.loadAndRender();
  }

  async loadAndRender() {
    this.isLoading = true;
    this.renderLoading();

    try {
      this.matrixData = await ApiClient.fetchWeeklyMatrix({
        institution_id: this.institutionId,
        view_mode: this.viewMode,
        year: this.year,
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
          Mengompilasi Data Mingguan Lembaga (${this.institutionId} • Mode: ${this.viewMode.toUpperCase()})...
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
        <div class="font-bold text-sm">Gagal Memuat Data Mingguan</div>
        <p>${msg}</p>
        <button id="btn-weekly-retry" class="gov-btn px-4 py-1.5 bg-rose-600 text-white hover:bg-rose-700 font-sans cursor-pointer">
          Coba Lagi
        </button>
      </div>
    `;
    document.getElementById('btn-weekly-retry')?.addEventListener('click', () => this.loadAndRender());
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container || !this.matrixData) return;

    const cols = this.matrixData.columns || [];
    const rows = this.matrixData.rows || [];
    const isWeekly = this.viewMode === 'weekly';

    container.innerHTML = `
      <div class="space-y-4 font-sans">
        
        <!-- 1. HEADER BANNER & ACTION TOOLBAR -->
        <div class="gov-card p-5 bg-white border border-[#DADCE0] shadow-2xs space-y-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-semibold bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]">
                  ⚡ Data Frekuensi Tinggi (High-Frequency Weekly)
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]">
                  Tracking 13 Tahun (2014 – 2026)
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]">
                  4 Kementerian & Lembaga
                </span>
              </div>
              <h1 class="text-base sm:text-lg font-bold text-[#202124] tracking-tight">
                Observatorium Data Mingguan Lembaga & Kementerian Indonesia (2014 – 2026)
              </h1>
              <p class="text-xs text-[#5F6368] leading-relaxed max-w-4xl font-mono">
                Kompilasi pemantauan reguler mingguan: <strong>Bank Indonesia</strong> (ITEMs Moneter & RTGS), 
                <strong>Kemenkeu DJPb</strong> (Realisasi Kinerja APBN & Lelang SBN), <strong>OJK</strong> (Statistik Pasar Modal & IHSG), 
                serta <strong>Badan Pangan Nasional</strong> (Harga Pangan Strategis Harian diolah Mingguan).
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 flex-wrap shrink-0">
              <button 
                id="btn-weekly-export-excel"
                class="px-3 py-1.5 text-xs font-mono font-medium rounded border border-[#34A853] bg-[#E6F4EA] hover:bg-[#CEEAD6] text-[#137333] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                title="Unduh data tabel dalam format Excel (.xlsx)"
              >
                <span>📥</span>
                <span>Excel (.xlsx)</span>
              </button>

              <button 
                id="btn-weekly-export-csv"
                class="px-3 py-1.5 text-xs font-mono font-medium rounded border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-[#3C4043] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                title="Unduh data tabel dalam format CSV"
              >
                <span>📄</span>
                <span>CSV</span>
              </button>

              <button 
                id="btn-weekly-refresh"
                class="p-1.5 text-xs rounded border border-[#DADCE0] bg-white hover:bg-[#F8F9FA] text-[#5F6368] cursor-pointer"
                title="Muat Ulang"
              >
                🔄
              </button>
            </div>
          </div>

          <!-- 2. FILTER CONTROLS BAR -->
          <div class="pt-4 border-t border-[#E8EAED] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
            
            <!-- Institution Selector (4 cols) -->
            <div class="lg:col-span-4 space-y-1">
              <label class="block text-[11px] font-mono font-bold text-[#3C4043] uppercase tracking-wider">
                1. Lembaga / Sumber Data
              </label>
              <select id="sel-weekly-inst" class="w-full text-xs font-sans px-2.5 py-1.5 rounded border border-[#DADCE0] bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]">
                ${this.institutions.map(inst => `
                  <option value="${inst.id}" ${inst.id === this.institutionId ? 'selected' : ''}>
                    ${inst.short_name} ${inst.frequency ? `(${inst.frequency})` : ''}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- View Mode (Annual vs 52 Weeks) (3 cols) -->
            <div class="lg:col-span-3 space-y-1">
              <label class="block text-[11px] font-mono font-bold text-[#3C4043] uppercase tracking-wider">
                2. Mode Tampilan
              </label>
              <div class="flex items-center gap-1.5">
                <button 
                  id="btn-mode-annual" 
                  class="flex-1 px-2.5 py-1.5 text-xs font-mono rounded border ${this.viewMode === 'annual' ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8] font-bold shadow-2xs' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:bg-[#F8F9FA]'} cursor-pointer transition-all text-center"
                >
                  📅 13 Thn (2014–2026)
                </button>
                <button 
                  id="btn-mode-weekly" 
                  class="flex-1 px-2.5 py-1.5 text-xs font-mono rounded border ${this.viewMode === 'weekly' ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8] font-bold shadow-2xs' : 'border-[#DADCE0] bg-white text-[#5F6368] hover:bg-[#F8F9FA]'} cursor-pointer transition-all text-center"
                >
                  ⏱️ 52 Minggu (Per Tahun)
                </button>
              </div>
            </div>

            <!-- Target Year for Weekly Mode (2 cols) -->
            <div class="lg:col-span-2 space-y-1">
              <label class="block text-[11px] font-mono font-bold text-[#3C4043] uppercase tracking-wider">
                3. Tahun Observasi
              </label>
              <select id="sel-weekly-year" class="w-full text-xs font-mono px-2 py-1.5 rounded border border-[#DADCE0] bg-white text-[#202124] ${this.viewMode === 'annual' ? 'opacity-50 cursor-not-allowed' : ''}" ${this.viewMode === 'annual' ? 'disabled' : ''}>
                ${Array.from({ length: 13 }, (_, i) => 2026 - i).map(y => `
                  <option value="${y}" ${y === this.year ? 'selected' : ''}>${y}</option>
                `).join('')}
              </select>
            </div>

            <!-- Quick Search Input (3 cols) -->
            <div class="lg:col-span-3 space-y-1">
              <label class="block text-[11px] font-mono font-bold text-[#3C4043] uppercase tracking-wider">
                4. Cari Indikator
              </label>
              <div class="relative">
                <input 
                  type="text" 
                  id="input-weekly-search" 
                  value="${this.searchKeyword}" 
                  placeholder="Misal: RTGS, M0, Beras, IHSG, SBN..."
                  class="w-full text-xs px-2.5 py-1.5 pl-7 rounded border border-[#DADCE0] bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                />
                <span class="absolute left-2.5 top-2 text-[11px] text-[#5F6368]">🔍</span>
                ${this.searchKeyword ? `
                  <button id="btn-weekly-clear-search" class="absolute right-2 top-1.5 text-xs text-[#5F6368] hover:text-[#202124]">✕</button>
                ` : ''}
              </div>
            </div>

          </div>

          <!-- Quick Preset Badges for 4 Institutions -->
          <div class="flex items-center gap-2 flex-wrap pt-2 text-[11px] font-mono">
            <span class="text-[#5F6368] font-bold">Pilihan Cepat Lembaga:</span>
            <button class="btn-inst-preset px-2.5 py-0.5 rounded border ${this.institutionId === 'ALL' ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8] font-bold' : 'border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#F8F9FA] text-[#3C4043]'} cursor-pointer transition-all" data-inst="ALL">
              🌐 Semua Lembaga (29 Indikator)
            </button>
            <button class="btn-inst-preset px-2.5 py-0.5 rounded border ${this.institutionId === 'BI' ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8] font-bold' : 'border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#F8F9FA] text-[#3C4043]'} cursor-pointer transition-all" data-inst="BI">
              🏛️ Bank Indonesia (ITEMs Moneter & RTGS)
            </button>
            <button class="btn-inst-preset px-2.5 py-0.5 rounded border ${this.institutionId === 'DJPB' ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8] font-bold' : 'border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#F8F9FA] text-[#3C4043]'} cursor-pointer transition-all" data-inst="DJPB">
              💰 Kemenkeu DJPb (Kinerja APBN & SBN)
            </button>
            <button class="btn-inst-preset px-2.5 py-0.5 rounded border ${this.institutionId === 'OJK' ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8] font-bold' : 'border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#F8F9FA] text-[#3C4043]'} cursor-pointer transition-all" data-inst="OJK">
              📈 OJK (Pasar Modal & IHSG)
            </button>
            <button class="btn-inst-preset px-2.5 py-0.5 rounded border ${this.institutionId === 'BAPANAS' ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8] font-bold' : 'border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#F8F9FA] text-[#3C4043]'} cursor-pointer transition-all" data-inst="BAPANAS">
              🌾 Bapanas (Harga Pangan Strategis)
            </button>
          </div>
        </div>

        <!-- 3. MAIN DATA TABLE MATRIKS (Google Analytics & Financial Terminal Style) -->
        <div class="gov-card bg-white border border-[#DADCE0] rounded-lg shadow-2xs overflow-hidden">
          <div class="overflow-x-auto max-h-[640px] relative scrollbar-thin">
            <table class="w-full text-xs text-left border-collapse">
              
              <!-- Sticky Table Header -->
              <thead class="bg-[#F1F3F4] text-[#202124] font-mono text-[11px] sticky top-0 z-30 shadow-xs">
                <tr class="border-b border-[#DADCE0]">
                  <!-- Sticky Column 1: Kode -->
                  <th scope="col" class="py-2.5 px-3 font-bold text-center border-r border-[#DADCE0] sticky left-0 bg-[#F1F3F4] z-40 min-w-[90px]">
                    KODE
                  </th>
                  <!-- Sticky Column 2: Indikator -->
                  <th scope="col" class="py-2.5 px-3 font-bold border-r border-[#DADCE0] sticky left-[90px] bg-[#F1F3F4] z-40 min-w-[280px]">
                    NAMA INDIKATOR MINGGUAN
                  </th>
                  <!-- Sticky Column 3: Lembaga -->
                  <th scope="col" class="py-2.5 px-3 font-bold border-r border-[#DADCE0] sticky left-[370px] bg-[#F1F3F4] z-40 min-w-[150px]">
                    LEMBAGA
                  </th>
                  <!-- Sticky Column 4: Satuan -->
                  <th scope="col" class="py-2.5 px-2 font-bold text-center border-r border-[#DADCE0] sticky left-[520px] bg-[#F1F3F4] z-40 min-w-[90px]">
                    SATUAN
                  </th>
                  <!-- Sticky Column 5: Aksi Tren -->
                  <th scope="col" class="py-2.5 px-2 font-bold text-center border-r border-[#DADCE0] sticky left-[610px] bg-[#F1F3F4] z-40 min-w-[70px]">
                    TREN
                  </th>

                  <!-- Dynamic Columns (Years or Weeks) -->
                  ${cols.map(c => `
                    <th scope="col" class="py-2 px-3 text-right font-mono border-r border-[#DADCE0] min-w-[100px]">
                      <div class="font-bold text-xs text-[#202124]">${c.label}</div>
                      <div class="text-[9px] font-normal text-[#5F6368] truncate">${c.sublabel}</div>
                    </th>
                  `).join('')}
                </tr>
              </thead>

              <!-- Table Body -->
              <tbody class="divide-y divide-[#E8EAED] font-mono">
                ${rows.length === 0 ? `
                  <tr>
                    <td colspan="${cols.length + 5}" class="p-8 text-center text-[#5F6368]">
                      Tidak ada indikator mingguan yang cocok dengan pencarian "<strong>${this.searchKeyword}</strong>".
                    </td>
                  </tr>
                ` : rows.map(r => this.renderTableRow(r, cols)).join('')}
              </tbody>

            </table>
          </div>

          <!-- Table Footer Strip -->
          <div class="p-3 bg-[#F8F9FA] border-t border-[#DADCE0] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5F6368] gap-2">
            <div>
              Sumber Resmi: 
              <a href="https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx" target="_blank" class="text-[#1A73E8] hover:underline">BI ITEMs</a> • 
              <a href="https://djpb.kemenkeu.go.id/" target="_blank" class="text-[#1A73E8] hover:underline">DJPb Kemenkeu</a> • 
              <a href="https://ojk.go.id/id/kanal/pasar-modal/data-dan-statistik/statistik-pasar-modal/default.aspx" target="_blank" class="text-[#1A73E8] hover:underline">OJK Pasar Modal</a> • 
              <a href="https://badanpangan.go.id/" target="_blank" class="text-[#1A73E8] hover:underline">Bapanas SPHT</a>
            </div>
            <div>
              Mode Aktif: <strong class="text-[#202124]">${isWeekly ? `52 Minggu Kalender Tahun ${this.year}` : 'Deret Rata-rata 13 Tahun (2014–2026)'}</strong>
            </div>
          </div>
        </div>

      </div>

      <!-- Modal Mount Container -->
      <div id="weekly-modal-mount"></div>
    `;

    this.bindEvents();
  }

  renderTableRow(row, cols) {
    return `
      <tr class="hover:bg-[#F8F9FA] cursor-pointer transition-colors group weekly-table-row" data-ind-id="${row.id}">
        <!-- Sticky Col 1: Kode -->
        <td class="py-2 px-3 text-center font-bold text-[#5F6368] group-hover:text-[#1A73E8] border-r border-[#DADCE0] sticky left-0 bg-white group-hover:bg-[#F8F9FA] z-20">
          ${row.code}
        </td>

        <!-- Sticky Col 2: Nama Indikator -->
        <td class="py-2 px-3 border-r border-[#DADCE0] sticky left-[90px] bg-white group-hover:bg-[#F8F9FA] z-20">
          <div class="font-bold text-[#202124] group-hover:text-[#1A73E8] transition-colors">
            ${row.name}
          </div>
          <div class="text-[10px] text-[#5F6368] font-normal truncate max-w-[270px]">
            ${row.category}
          </div>
        </td>

        <!-- Sticky Col 3: Lembaga -->
        <td class="py-2 px-3 border-r border-[#DADCE0] sticky left-[370px] bg-white group-hover:bg-[#F8F9FA] z-20">
          <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${row.institution_id === 'BI' ? 'bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]' : (row.institution_id === 'DJPB' ? 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]' : (row.institution_id === 'OJK' ? 'bg-[#FCE8E6] text-[#C5221F] border border-[#FAD2CF]' : 'bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]'))}">
            ${row.institution_name}
          </span>
        </td>

        <!-- Sticky Col 4: Satuan -->
        <td class="py-2 px-2 text-center text-[#5F6368] text-[11px] border-r border-[#DADCE0] sticky left-[520px] bg-white group-hover:bg-[#F8F9FA] z-20">
          ${row.unit_short}
        </td>

        <!-- Sticky Col 5: Aksi Grafik -->
        <td class="py-2 px-2 text-center border-r border-[#DADCE0] sticky left-[610px] bg-white group-hover:bg-[#F8F9FA] z-20">
          <button class="btn-view-weekly-trend px-2 py-0.5 rounded text-[10.5px] bg-[#E8F0FE] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white transition-colors cursor-pointer" title="Lihat Grafik Tren Mingguan">
            📈 Tren
          </button>
        </td>

        <!-- Dynamic Value Columns -->
        ${cols.map(c => {
          const val = row.values ? row.values[c.key] : null;
          const formatted = val !== null && val !== undefined
            ? Number(val).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })
            : '-';
          return `
            <td class="py-2 px-3 text-right font-mono border-r border-[#E8EAED] text-[#202124] group-hover:bg-[#F1F3F4]/50">
              ${formatted}
            </td>
          `;
        }).join('')}
      </tr>
    `;
  }

  bindEvents() {
    // 1. Institution dropdown
    document.getElementById('sel-weekly-inst')?.addEventListener('change', (e) => {
      this.institutionId = e.target.value;
      this.loadAndRender();
    });

    // 2. View Mode Buttons
    document.getElementById('btn-mode-annual')?.addEventListener('click', () => {
      if (this.viewMode !== 'annual') {
        this.viewMode = 'annual';
        this.loadAndRender();
      }
    });

    document.getElementById('btn-mode-weekly')?.addEventListener('click', () => {
      if (this.viewMode !== 'weekly') {
        this.viewMode = 'weekly';
        this.loadAndRender();
      }
    });

    // 3. Year dropdown
    document.getElementById('sel-weekly-year')?.addEventListener('change', (e) => {
      this.year = parseInt(e.target.value, 10);
      this.loadAndRender();
    });

    // 4. Institution preset buttons
    document.querySelectorAll('.btn-inst-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const inst = btn.dataset.inst;
        if (inst && inst !== this.institutionId) {
          this.institutionId = inst;
          this.loadAndRender();
        }
      });
    });

    // 5. Search input
    const searchInput = document.getElementById('input-weekly-search');
    let searchTimeout = null;
    searchInput?.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.searchKeyword = e.target.value;
        this.loadAndRender();
      }, 300);
    });

    document.getElementById('btn-weekly-clear-search')?.addEventListener('click', () => {
      this.searchKeyword = '';
      this.loadAndRender();
    });

    // 6. Refresh button
    document.getElementById('btn-weekly-refresh')?.addEventListener('click', () => {
      this.loadAndRender();
    });

    // 7. Export Excel
    document.getElementById('btn-weekly-export-excel')?.addEventListener('click', () => {
      const url = ApiClient.getWeeklyExportUrl({
        institution_id: this.institutionId,
        view_mode: this.viewMode,
        year: this.year,
        format: 'xlsx'
      });
      window.open(url, '_blank');
    });

    // 8. Export CSV
    document.getElementById('btn-weekly-export-csv')?.addEventListener('click', () => {
      const url = ApiClient.getWeeklyExportUrl({
        institution_id: this.institutionId,
        view_mode: this.viewMode,
        year: this.year,
        format: 'csv'
      });
      window.open(url, '_blank');
    });

    // 9. Row Click -> Trend Modal
    document.querySelectorAll('.weekly-table-row').forEach(tr => {
      tr.addEventListener('click', (e) => {
        const indId = tr.dataset.indId;
        if (indId) {
          this.openWeeklyTrendModal(indId);
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // WEEKLY TREND MODAL & CANVAS CHART
  // --------------------------------------------------------------------------
  async openWeeklyTrendModal(indicatorId) {
    const mount = document.getElementById('weekly-modal-mount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="gov-modal-overlay">
        <div class="gov-modal-content max-w-4xl p-8 bg-white text-center space-y-3 font-mono">
          <div class="inline-block w-8 h-8 border-3 border-[#1A73E8] border-t-transparent rounded-full animate-spin"></div>
          <div class="text-xs text-[#5F6368]">Memuat data tren mingguan untuk ${indicatorId}...</div>
        </div>
      </div>
    `;

    try {
      this.activeTrendData = await ApiClient.fetchWeeklyTrend({
        indicator_id: indicatorId,
        year: this.viewMode === 'weekly' ? this.year : null
      });
    } catch (err) {
      mount.innerHTML = `
        <div class="gov-modal-overlay">
          <div class="gov-modal-content max-w-md p-6 bg-white space-y-3 font-mono text-xs">
            <div class="font-bold text-rose-600">Gagal Memuat Tren Mingguan</div>
            <p>${err.message}</p>
            <button id="btn-close-trend-err" class="gov-btn px-4 py-1.5 bg-[#1A73E8] text-white">Tutup</button>
          </div>
        </div>
      `;
      document.getElementById('btn-close-trend-err')?.addEventListener('click', () => { mount.innerHTML = ''; });
      return;
    }

    const tData = this.activeTrendData;
    const ind = tData.indicator;
    const stats = tData.statistics;
    const series = tData.series;

    mount.innerHTML = `
      <div class="gov-modal-overlay" id="weekly-trend-modal-overlay">
        <div class="gov-modal-content max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
          
          <!-- Modal Header -->
          <div class="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F0FE] text-[#1A73E8]">
                  KODE: ${ind.code}
                </span>
                <span class="text-xs text-[#5F6368] font-mono font-medium">${ind.institution_name} • ${ind.category}</span>
              </div>
              <h2 class="text-base font-bold text-[#202124]">
                ${ind.name}
              </h2>
            </div>
            <button id="btn-close-weekly-modal" class="text-[#5F6368] hover:text-[#202124] text-xl font-bold cursor-pointer px-2">
              ✕
            </button>
          </div>

          <!-- Modal Body Scrollable -->
          <div class="p-6 overflow-y-auto space-y-5">
            
            <!-- KPI Summary Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
              
              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase">Nilai Terkini</div>
                <div class="text-base font-bold text-[#1A73E8]">
                  ${Number(stats.latest_value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </div>
                <div class="text-[9px] text-[#5F6368]">${ind.unit_short}</div>
              </div>

              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase">Rata-rata 13 Thn</div>
                <div class="text-base font-bold text-[#202124]">
                  ${Number(stats.average_value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </div>
                <div class="text-[9px] text-[#5F6368]">${ind.unit_short}</div>
              </div>

              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase">Puncak Tertinggi</div>
                <div class="text-base font-bold text-[#D93025]">
                  ${Number(stats.max_value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </div>
                <div class="text-[9px] text-[#5F6368]">Maksimum</div>
              </div>

              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase">Titik Terendah</div>
                <div class="text-base font-bold text-[#1E8E3E]">
                  ${Number(stats.min_value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </div>
                <div class="text-[9px] text-[#5F6368]">Minimum</div>
              </div>

              <div class="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase">Perubahan 4-Pekan</div>
                <div class="text-base font-bold ${stats.change_4w_percent >= 0 ? 'text-emerald-700' : 'text-rose-700'}">
                  ${stats.change_4w_percent !== null ? `${stats.change_4w_percent > 0 ? '+' : ''}${stats.change_4w_percent}%` : '-'}
                </div>
                <div class="text-[9px] text-[#5F6368]">4 Weeks Momentum</div>
              </div>

            </div>

            <!-- Historical Canvas Chart -->
            <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-2">
              <div class="flex items-center justify-between text-xs font-mono">
                <div class="font-bold text-[#202124] flex items-center gap-1.5">
                  <span>📈</span>
                  <span>Deret Waktu Mingguan (${ind.unit})</span>
                </div>
                <div id="weekly-chart-hover-info" class="text-[11px] text-[#1A73E8] font-bold">
                  Arahkan kursor ke grafik untuk info pekan
                </div>
              </div>
              
              <div class="relative w-full h-[250px] bg-slate-50 rounded border border-[#E8EAED]">
                <canvas id="canvas-weekly-trend" class="w-full h-full block cursor-crosshair"></canvas>
              </div>

              <div class="flex items-center justify-between text-[10.5px] font-mono text-[#5F6368] pt-1">
                <span>${series[0]?.period_label || '2014-W01'}</span>
                <span>Total ${stats.total_observations} Pekan Observasi</span>
                <span>${series[series.length - 1]?.period_label || '2026-W52'}</span>
              </div>
            </div>

            <!-- Contextual Source & Methodology Box -->
            <div class="p-3.5 bg-[#E8F0FE] rounded-lg border border-[#D2E3FC] text-xs font-mono text-[#174EA6] space-y-1.5">
              <div class="font-bold flex items-center justify-between">
                <span class="flex items-center gap-1">
                  <span>🏛️</span>
                  <span>Metodologi & Sumber Diseminasi Resmi:</span>
                </span>
                <a href="${ind.source_url}" target="_blank" class="text-[#1A73E8] hover:underline font-bold flex items-center gap-1 text-[11px]">
                  <span>Buka Portal Resmi</span>
                  <span>↗</span>
                </a>
              </div>
              <p class="leading-relaxed text-[11.5px] text-[#202124]">
                ${ind.description}
              </p>
              <div class="text-[10.5px] text-[#5F6368]">
                <strong>Dokumen Rujukan:</strong> ${ind.source_doc}
              </div>
            </div>

            <!-- Weekly Observations Breakdown Table -->
            <div class="space-y-2">
              <div class="text-xs font-mono font-bold text-[#202124] flex items-center justify-between">
                <span>Rincian Observasi Mingguan & Pertumbuhan WoW (Week-on-Week %):</span>
                <span class="text-[10.5px] font-normal text-[#5F6368]">50 Pekan Terakhir Disajikan</span>
              </div>
              
              <div class="overflow-x-auto max-h-[220px] rounded border border-[#DADCE0] scrollbar-thin">
                <table class="w-full text-xs text-left border-collapse font-mono">
                  <thead class="bg-[#F1F3F4] text-[#202124] sticky top-0 border-b border-[#DADCE0]">
                    <tr>
                      <th class="py-1.5 px-3">PEKAN / PERIODE</th>
                      <th class="py-1.5 px-3 text-right">NILAI (${ind.unit_short})</th>
                      <th class="py-1.5 px-3 text-right">PERTUMBUHAN WOW %</th>
                      <th class="py-1.5 px-3 text-center">ARAH TREN</th>
                      <th class="py-1.5 px-3">LEMBAGA PENERBIT</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E8EAED]">
                    ${series.slice(-50).reverse().map(p => `
                      <tr class="hover:bg-[#F8F9FA]">
                        <td class="py-1.5 px-3 font-bold text-[#202124]">${p.period_label}</td>
                        <td class="py-1.5 px-3 text-right font-medium">
                          ${Number(p.value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                        </td>
                        <td class="py-1.5 px-3 text-right font-medium ${p.wow_percent !== null ? (p.wow_percent >= 0 ? 'text-emerald-700' : 'text-rose-700') : 'text-[#5F6368]'}">
                          ${p.wow_percent !== null ? `${p.wow_percent > 0 ? '+' : ''}${p.wow_percent}%` : '-'}
                        </td>
                        <td class="py-1.5 px-3 text-center">
                          <span class="px-1.5 py-0.2 rounded text-[9.5px] font-mono ${p.wow_percent !== null ? (p.wow_percent > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : (p.wow_percent < 0 ? 'bg-rose-50 text-rose-700 border border-rose-300' : 'bg-slate-100 text-slate-700')) : 'bg-slate-100 text-slate-700'}">
                            ${p.wow_percent !== null ? (p.wow_percent > 0 ? '▲ NAIK' : (p.wow_percent < 0 ? '▼ TURUN' : '► TETAP')) : '—'}
                          </span>
                        </td>
                        <td class="py-1.5 px-3 text-[10.5px] text-[#5F6368] truncate max-w-[240px]">
                          ${ind.institution_name}
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
              Diseminasi Resmi: Sesuai Siklus Kalender Rilis Lembaga 2026
            </span>
            <button id="btn-close-weekly-footer" class="px-4 py-1.5 rounded text-xs font-mono font-medium border border-[#DADCE0] bg-white hover:bg-[#F1F3F4] text-[#202124] cursor-pointer">
              Tutup
            </button>
          </div>

        </div>
      </div>
    `;

    // Bind Close events
    const closeModal = () => { mount.innerHTML = ''; };
    document.getElementById('btn-close-weekly-modal')?.addEventListener('click', closeModal);
    document.getElementById('btn-close-weekly-footer')?.addEventListener('click', closeModal);

    // Render Canvas Chart
    requestAnimationFrame(() => {
      this.drawWeeklyCanvasChart(series, ind.unit_short);
    });
  }

  drawWeeklyCanvasChart(series, unitSymbol) {
    const canvas = document.getElementById('canvas-weekly-trend');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const padLeft = 60;
    const padRight = 20;
    const padTop = 25;
    const padBottom = 30;

    const plotWidth = width - padLeft - padRight;
    const plotHeight = height - padTop - padBottom;

    ctx.clearRect(0, 0, width, height);

    if (series.length < 2) return;

    const vals = series.map(s => s.value);
    const minVal = Math.min(...vals);
    const maxVal = Math.max(...vals);
    const valRange = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    // Grid lines (4 horizontal)
    ctx.strokeStyle = '#E8EAED';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#5F6368';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';

    for (let i = 0; i <= 4; i++) {
      const yNorm = i / 4;
      const yPos = padTop + plotHeight * (1 - yNorm);
      const gridVal = minVal + valRange * yNorm;

      ctx.beginPath();
      ctx.moveTo(padLeft, yPos);
      ctx.lineTo(width - padRight, yPos);
      ctx.stroke();

      ctx.fillText(
        gridVal >= 1000 ? (gridVal / 1000).toFixed(1) + 'k' : gridVal.toFixed(1),
        padLeft - 8,
        yPos + 3
      );
    }

    // Points mapping
    const pts = series.map((s, idx) => {
      const x = padLeft + (idx / (series.length - 1)) * plotWidth;
      const y = padTop + plotHeight * (1 - (s.value - minVal) / valRange);
      return { x, y, ...s };
    });

    // Draw Gradient Area
    const grad = ctx.createLinearGradient(0, padTop, 0, padTop + plotHeight);
    grad.addColorStop(0, 'rgba(26, 115, 232, 0.25)');
    grad.addColorStop(1, 'rgba(26, 115, 232, 0.01)');

    ctx.beginPath();
    ctx.moveTo(pts[0].x, padTop + plotHeight);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, padTop + plotHeight);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw Main Trend Line
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = '#1A73E8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mousemove crosshair interaction
    const hoverInfo = document.getElementById('weekly-chart-hover-info');

    canvas.onmousemove = (e) => {
      const cRect = canvas.getBoundingClientRect();
      const mx = e.clientX - cRect.left;

      // Find nearest point
      let nearestIdx = 0;
      let minDistance = Infinity;
      pts.forEach((p, idx) => {
        const dist = Math.abs(p.x - mx);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = idx;
        }
      });

      const p = pts[nearestIdx];
      if (!p) return;

      // Redraw canvas
      ctx.clearRect(0, 0, width, height);

      // Redraw grid
      for (let i = 0; i <= 4; i++) {
        const yNorm = i / 4;
        const yPos = padTop + plotHeight * (1 - yNorm);
        ctx.beginPath();
        ctx.strokeStyle = '#E8EAED';
        ctx.moveTo(padLeft, yPos);
        ctx.lineTo(width - padRight, yPos);
        ctx.stroke();
      }

      // Redraw line
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.strokeStyle = '#1A73E8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Crosshair lines
      ctx.strokeStyle = '#9AA0A6';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      ctx.beginPath();
      ctx.moveTo(p.x, padTop);
      ctx.lineTo(p.x, padTop + plotHeight);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(padLeft, p.y);
      ctx.lineTo(width - padRight, p.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Highlight active point
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#1A73E8';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Update hover label
      if (hoverInfo) {
        const wowStr = p.wow_percent !== null ? `(${p.wow_percent > 0 ? '+' : ''}${p.wow_percent}% WoW)` : '';
        hoverInfo.innerHTML = `Pekan: <strong class="text-[#202124]">${p.period_label}</strong> | Nilai: <strong class="text-[#1A73E8]">${Number(p.value).toLocaleString('id-ID')} ${unitSymbol}</strong> ${wowStr}`;
      }
    };

    canvas.onmouseleave = () => {
      // Restore clean chart
      this.drawWeeklyCanvasChart(series, unitSymbol);
      if (hoverInfo) {
        hoverInfo.textContent = 'Arahkan kursor ke grafik untuk info pekan';
      }
    };
  }
}
