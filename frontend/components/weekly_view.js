// WEEKLY HIGH-FREQUENCY DATA OBSERVATORY (1990 – 2026)
// Kompilasi Data Mingguan Resmi Kementerian & Lembaga Republik Indonesia:
// 1. Bank Indonesia (BI): ITEMs — Indikator Terpilih Moneter & Sistem Pembayaran
// 2. Kementerian Keuangan RI (DJPb): Laporan Kinerja APBN Mingguan & Kas BUN
// 3. Otoritas Jasa Keuangan (OJK): Statistik Pasar Modal Mingguan & IHSG
// 4. Badan Pangan Nasional (Bapanas): Harga Pangan Strategis (Daily -> Weekly)
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { openEmailRegistrationModal } from './header.js';

export class WeeklyView {
  constructor(containerId) {
    this.containerId = containerId;
    this.institutionId = 'ALL'; // ALL | BI | DJPB | OJK | BAPANAS
    this.viewMode = 'annual'; // 'annual' (startYear - endYear) | 'weekly' (W01 - W52)
    this.startYear = 1990;
    this.endYear = 2026;
    this.year = 2026;
    this.wtdWeek = 'W12'; // Default Week-to-Date e.g. "W12 2026"
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
        start_year: this.startYear,
        end_year: this.endYear,
        wtd_week: this.wtdWeek,
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

  generateYearOptions(minY, maxY, selectedY) {
    let opts = '';
    for (let y = maxY; y >= minY; y--) {
      opts += `<option value="${y}" ${y === selectedY ? 'selected' : ''}>${y}</option>`;
    }
    return opts;
  }

  isUserLoggedIn() {
    let registeredUser = null;
    try {
      const raw = localStorage.getItem('registered_researcher_access');
      if (raw) registeredUser = JSON.parse(raw);
    } catch (e) {}

    let masterAdminSession = null;
    try {
      const rawSess = localStorage.getItem('master_admin_session');
      if (rawSess) masterAdminSession = JSON.parse(rawSess);
    } catch (e) {}

    return Boolean((masterAdminSession && masterAdminSession.token) || (registeredUser && registeredUser.email));
  }

  renderLoading() {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="gov-card p-12 text-center space-y-3">
        <div class="inline-block w-8 h-8 border-3 border-[#1A73E8] border-t-transparent rounded-full animate-spin"></div>
        <div class="text-xs font-mono font-medium text-[#5F6368]">
          Mengompilasi Data Mingguan Lembaga (${this.institutionId} • Timeframe: ${this.viewMode.toUpperCase()})...
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
    const wtdLabel = this.matrixData.wtd_label || `${this.wtdWeek} ${isWeekly ? this.year : this.endYear}`;

    container.innerHTML = `
      <div class="space-y-4 font-sans">
        
        <!-- 1. HEADER BANNER & ACTION TOOLBAR -->
        <div class="gov-card p-5 bg-white shadow-2xs space-y-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-semibold bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]">
                  ⚡ Data Frekuensi Tinggi (High-Frequency Weekly)
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC]">
                  Tracking 37 Tahun (1990 – 2026)
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium bg-[#E6F4EA] text-[#137333]">
                  4 Kementerian & Lembaga
                </span>
              </div>
              <h1 class="text-base sm:text-lg font-bold text-[#202124] tracking-tight">
                Observatorium Data Mingguan Lembaga & Kementerian Indonesia (1990 – 2026)
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
                class="px-3 py-1.5 text-xs font-mono font-bold rounded bg-[#0038A8] hover:bg-[#002B82] text-white flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                title="Unduh data tabel dalam format Excel (.xlsx) - Maks. 24 Tahun"
              >
                <span>📥</span>
                <span>Excel (.xlsx)</span>
              </button>

              <button 
                id="btn-weekly-export-csv"
                class="px-3 py-1.5 text-xs font-mono font-medium rounded bg-[#002B82] hover:bg-[#001D5A] text-white flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                title="Unduh data tabel dalam format CSV - Maks. 24 Tahun"
              >
                <span>📄</span>
                <span>CSV</span>
              </button>

              <button 
                id="btn-weekly-refresh"
                class="p-1.5 text-xs rounded bg-white hover:bg-[#F8F9FA] text-[#5F6368] border border-slate-200 cursor-pointer shadow-2xs"
                title="Muat Ulang"
              >
                🔄
              </button>
            </div>
          </div>

          <!-- 2. FILTER CONTROLS BAR (Clean & Unnumbered, with Start-End Timeframe) -->
          <div class="p-3.5 bg-[#FAF8F5] border border-[#E8DFD5] rounded-lg shadow-2xs space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
              
              <!-- Institution Selector (4 cols) -->
              <div class="lg:col-span-4 space-y-1">
                <label class="block text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wider">
                  Lembaga / Sumber Data
                </label>
                <select id="sel-weekly-inst" class="w-full text-xs font-sans px-2.5 py-1.5 rounded border border-slate-300 bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#0038A8] shadow-2xs">
                  ${this.institutions.map(inst => `
                    <option value="${inst.id}" ${inst.id === this.institutionId ? 'selected' : ''}>
                      ${inst.short_name} ${inst.frequency ? `(${inst.frequency})` : ''}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Timeframe with Start and End Controls (5 cols) -->
              <div class="lg:col-span-5 space-y-1">
                <label class="block text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wider">
                  Timeframe
                </label>
                <div class="flex items-center gap-2">
                  <select id="sel-weekly-start-year" class="w-1/2 text-xs font-mono px-2.5 py-1.5 rounded border border-slate-300 bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#0038A8] shadow-2xs">
                    ${this.generateYearOptions(1990, 2026, this.startYear)}
                  </select>
                  <span class="text-xs font-mono text-slate-500 font-semibold shrink-0">s/d</span>
                  <select id="sel-weekly-end-year" class="w-1/2 text-xs font-mono px-2.5 py-1.5 rounded border border-slate-300 bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#0038A8] shadow-2xs">
                    ${this.generateYearOptions(1990, 2026, this.endYear)}
                  </select>
                </div>
              </div>

              <!-- Quick Search Input (3 cols) -->
              <div class="lg:col-span-3 space-y-1">
                <label class="block text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wider">
                  Cari Indikator
                </label>
                <div class="relative">
                  <input 
                    type="text" 
                    id="input-weekly-search" 
                    value="${this.searchKeyword}" 
                    placeholder="Misal: RTGS, M0, Beras, IHSG, SBN..."
                    class="w-full text-xs px-2.5 py-1.5 pl-7 rounded border border-slate-300 bg-white text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#0038A8] shadow-2xs"
                  />
                  <span class="absolute left-2.5 top-2 text-[11px] text-[#7D655C]">🔍</span>
                  ${this.searchKeyword ? `
                    <button id="btn-weekly-clear-search" class="absolute right-2 top-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer">✕</button>
                  ` : ''}
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- 3. MAIN DATA TABLE MATRIKS (Compact Sticky Columns + WTD + WoW/MoM/YoY) -->
        <div class="gov-card bg-white rounded-lg shadow-2xs overflow-hidden">
          <div class="overflow-x-auto max-h-[640px] relative scrollbar-thin">
            <table class="w-full text-xs text-left border-collapse">
              
              <!-- Sticky Table Header (Merged Lembaga/Satuan/Tren -> Col 1; Unified WTD & Pergerakan -> Col 2) -->
              <thead class="bg-[#F1F3F4] text-[#202124] font-mono text-[11px] sticky top-0 z-30 shadow-xs">
                <tr>
                  <!-- Sticky Col 1: Indikator + Lembaga + Satuan + Tren (Matching Image 2) -->
                  <th scope="col" class="py-2.5 px-3 font-bold sticky left-0 bg-[#F1F3F4] z-40 min-w-[340px] border-r border-slate-300">
                    NAMA INDIKATOR MINGGUAN
                  </th>

                  <!-- Summary Col 2: Week to Date (WTD) & Pergerakan (Matching Image 3) -->
                  <th scope="col" class="py-2.5 px-3 text-right font-mono min-w-[240px] bg-[#E8F0FE]/70 border-r border-[#BCD0F7]">
                    <div class="font-bold text-xs text-[#0038A8]">${wtdLabel} (Week-to-Date)</div>
                    <div class="text-[9px] text-[#1A73E8] font-semibold">WoW (1 Pekan) • MoM (4 Pekan) • YoY (52 Pekan)</div>
                  </th>

                  <!-- Dynamic Timeframe Columns (Years) -->
                  ${cols.map(c => `
                    <th scope="col" class="py-2 px-3 text-right font-mono min-w-[95px] border-r border-slate-200">
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
                    <td colspan="${cols.length + 2}" class="p-8 text-center text-[#5F6368]">
                      Tidak ada indikator mingguan yang cocok dengan pencarian "<strong>${this.searchKeyword}</strong>".
                    </td>
                  </tr>
                ` : rows.map(r => this.renderTableRow(r, cols)).join('')}
              </tbody>

            </table>
          </div>

          <!-- Table Footer Strip -->
          <div class="p-3 bg-[#F8F9FA] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5F6368] gap-2">
            <div>
              Sumber Resmi: 
              <a href="https://www.bi.go.id/id/statistik/ekonomi-keuangan/items/default.aspx" target="_blank" class="text-[#1A73E8] hover:underline">BI ITEMs</a> • 
              <a href="https://djpb.kemenkeu.go.id/" target="_blank" class="text-[#1A73E8] hover:underline">DJPb Kemenkeu</a> • 
              <a href="https://ojk.go.id/id/kanal/pasar-modal/data-dan-statistik/statistik-pasar-modal/default.aspx" target="_blank" class="text-[#1A73E8] hover:underline">OJK Pasar Modal</a> • 
              <a href="https://badanpangan.go.id/" target="_blank" class="text-[#1A73E8] hover:underline">Bapanas SPHT</a>
            </div>
            <div>
              Timeframe: <strong class="text-[#202124]">Deret Rata-rata ${this.startYear}–${this.endYear}</strong>
            </div>
          </div>
        </div>

      </div>

      <!-- Modal Mount Container -->
      <div id="weekly-modal-mount"></div>
    `;

    this.bindEvents();
  }

  formatCellValue(val, row) {
    if (val === null || val === undefined) return '<span class="text-slate-400 font-normal">N/A</span>';
    const num = Number(val);
    const unit = (row.unit || row.unit_short || '').toLowerCase();
    
    // Percentage format
    if (unit.includes('%') || unit.includes('persen')) {
      return `${num.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
    }
    
    // Rupiah / Kg format
    if (unit.includes('/ kg') || unit.includes('/ liter')) {
      return `Rp ${Math.round(num).toLocaleString('id-ID')}`;
    }

    // Default numeric with id-ID locale
    return num.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  }

  formatWtdValue(val, row) {
    if (val === null || val === undefined) return '—';
    const num = Number(val);
    const unit = (row.unit || row.unit_short || '').toLowerCase();
    
    if (unit.includes('%') || unit.includes('persen')) {
      return `${num.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
    }
    
    if (unit.includes('/ kg') || unit.includes('/ liter')) {
      return `Rp ${Math.round(num).toLocaleString('id-ID')}`;
    }

    return num.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  }

  getUnitLabel(row) {
    const unit = (row.unit || row.unit_short || '').toLowerCase();
    if (unit.includes('%') || unit.includes('persen')) return '% YoY';
    if (unit.includes('triliun')) return 'Rp T';
    if (unit.includes('miliar')) return 'Rp M';
    if (unit.includes('usd')) return 'Juta USD';
    if (unit.includes('/ kg')) return '/ Kg';
    if (unit.includes('/ liter')) return '/ Liter';
    if (unit.includes('poin')) return 'Poin';
    return row.unit_short || row.unit || '';
  }

  formatMovementSummary(row) {
    const wow = row.wow_percent;
    const mom = row.mom_percent;
    const yoy = row.yoy_percent;
    const prevYear = row.prev_year || (this.endYear - 1);
    const prevVal = row.prev_year_val !== undefined && row.prev_year_val !== null ? this.formatWtdValue(row.prev_year_val, row) : '—';

    const fmtSign = (val) => {
      if (val === null || val === undefined) return '0.00%';
      const num = Number(val);
      const sign = num > 0 ? '+' : '';
      return `${sign}${num.toFixed(2)}%`;
    };

    const wowStr = `${fmtSign(wow)} WoW`;
    const momStr = `${fmtSign(mom)} MoM`;
    const yoyStr = `${fmtSign(yoy)} vs LY (${prevYear}: ${prevVal})`;

    return `${wowStr} • ${momStr} • ${yoyStr}`;
  }

  renderTableRow(row, cols) {
    const formattedWtdValue = this.formatWtdValue(row.wtd_value, row);
    const unitLabel = this.getUnitLabel(row);
    const movementSummary = this.formatMovementSummary(row);

    return `
      <tr class="hover:bg-[#F8F9FA] cursor-pointer transition-colors group weekly-table-row" data-ind-id="${row.id}" data-code="${row.code}">
        <!-- Sticky Col 1: Nama Indikator + Lembaga + Satuan + Tren (Image 2) -->
        <td class="py-2.5 px-3 sticky left-0 bg-white group-hover:bg-[#F8F9FA] z-20 border-r border-slate-200">
          <div class="flex items-start justify-between gap-2">
            <div class="space-y-0.5">
              <div class="font-bold text-[#111827] group-hover:text-[#0038A8] transition-colors leading-tight text-xs">
                ${row.name}
              </div>
              <div class="text-[10px] text-slate-500 font-sans">
                ${row.category}
              </div>
              <div class="font-bold text-[10.5px] text-slate-900 font-sans pt-0.5">
                Source : ${row.institution_id} - Satuan : ${row.unit || row.unit_short}
              </div>
            </div>
            <button class="btn-view-weekly-trend px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F0FE] text-[#0038A8] hover:bg-[#0038A8] hover:text-white transition-colors cursor-pointer shadow-2xs shrink-0 mt-0.5" title="Lihat Grafik Tren & Metodologi Lengkap">
              📈 Tren
            </button>
          </div>
        </td>

        <!-- Col 2: Week to Date & Pergerakan (Image 3) -->
        <td class="py-2 px-3 text-right font-mono bg-[#F1F5FD]/50 border-r border-[#BCD0F7]">
          <div class="space-y-1">
            <!-- Value & Unit matching Top of Image 3 -->
            <div class="flex items-baseline justify-end gap-1.5 font-mono">
              <span class="text-base font-black text-[#0038A8] tracking-tight">
                ${formattedWtdValue}
              </span>
              <span class="text-[10px] text-slate-500 font-medium font-mono">
                ${unitLabel}
              </span>
            </div>

            <!-- Movement Box matching Bottom of Image 3 -->
            <div class="p-1.5 rounded bg-slate-50 border border-slate-200/80 font-mono text-[9.5px] text-slate-700 leading-tight space-y-0.5 text-right shadow-2xs">
              <div class="text-slate-500 font-bold uppercase text-[8.5px] flex items-center justify-end gap-1">
                <span>📊</span>
                <span>PERGERAKAN:</span>
              </div>
              <div class="text-slate-900 font-semibold text-[9.5px]">
                ${movementSummary}
              </div>
            </div>
          </div>
        </td>

        <!-- Dynamic Value Columns (Years) formatted with Economic Indicators rules -->
        ${cols.map(c => {
          const val = row.values ? row.values[c.key] : null;
          const formatted = this.formatCellValue(val, row);
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

    // 3. Timeframe Start & End Year dropdowns
    document.getElementById('sel-weekly-start-year')?.addEventListener('change', (e) => {
      this.startYear = parseInt(e.target.value, 10);
      if (this.startYear > this.endYear) {
        this.endYear = this.startYear;
      }
      this.loadAndRender();
    });

    document.getElementById('sel-weekly-end-year')?.addEventListener('change', (e) => {
      this.endYear = parseInt(e.target.value, 10);
      if (this.endYear < this.startYear) {
        this.startYear = this.endYear;
      }
      this.loadAndRender();
    });

    // 4. Target Year & WTD Week for Weekly Mode
    document.getElementById('sel-weekly-year')?.addEventListener('change', (e) => {
      this.year = parseInt(e.target.value, 10);
      this.loadAndRender();
    });

    document.getElementById('sel-weekly-wtd-week')?.addEventListener('change', (e) => {
      this.wtdWeek = e.target.value;
      this.loadAndRender();
    });

    // 5. Search input with live debounce
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

    // 7. Export Excel with Login Check and 24-Year Limit
    document.getElementById('btn-weekly-export-excel')?.addEventListener('click', () => {
      this.handleExport('xlsx');
    });

    // 8. Export CSV with Login Check and 24-Year Limit
    document.getElementById('btn-weekly-export-csv')?.addEventListener('click', () => {
      this.handleExport('csv');
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

  handleExport(format) {
    // 1. Cek login: jika belum login, tampilkan modal arahan login / daftar
    if (!this.isUserLoggedIn()) {
      this.showAuthRequiredModal();
      return;
    }

    // 2. Cek kuota rentang data: tidak boleh ambil total data dalam 1 tabel, max 24 tahun
    if (this.viewMode === 'annual') {
      const spanYears = this.endYear - this.startYear + 1;
      if (spanYears > 24) {
        this.showMax24YearsModal(format);
        return;
      }
    }

    // 3. User sudah login dan rentang <= 24 tahun: unduh langsung
    this.executeDownload(format, this.startYear, this.endYear);
  }

  showAuthRequiredModal() {
    const mount = document.getElementById('weekly-modal-mount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="gov-modal-overlay">
        <div class="gov-modal-content max-w-md p-6 bg-white rounded-xl shadow-2xl space-y-4 font-sans text-xs">
          <div class="flex items-center gap-2 text-amber-600 font-mono font-bold text-sm">
            <span class="text-xl">🔒</span>
            <span>Akses Unduh Data Dibatasi</span>
          </div>
          <p class="text-slate-700 leading-relaxed font-mono">
            Unduh data hanya bisa dilakukan setelah login. Silakan masuk atau daftar akun terlebih dahulu untuk mendapatkan akses pengunduhan berkas data resmi (.xlsx / .csv).
          </p>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button id="btn-cancel-auth-download" class="px-3.5 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 font-mono font-bold cursor-pointer">
              Batal
            </button>
            <button id="btn-proceed-auth-login" class="px-4 py-1.5 rounded bg-[#0038A8] hover:bg-[#002B82] text-white font-mono font-bold cursor-pointer shadow-2xs">
              Masuk / Daftar Akun ↗
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-cancel-auth-download')?.addEventListener('click', () => { mount.innerHTML = ''; });
    document.getElementById('btn-proceed-auth-login')?.addEventListener('click', () => {
      mount.innerHTML = '';
      if (typeof openEmailRegistrationModal === 'function') {
        openEmailRegistrationModal();
      } else if (window.openEmailRegistrationModal) {
        window.openEmailRegistrationModal();
      } else if (window.__govApp) {
        window.__govApp.showLoginRequiredPrompt('weekly');
      }
    });
  }

  showMax24YearsModal(format) {
    const mount = document.getElementById('weekly-modal-mount');
    if (!mount) return;

    const spanYears = this.endYear - this.startYear + 1;
    const clampedStart = Math.max(1990, this.endYear - 23);

    mount.innerHTML = `
      <div class="gov-modal-overlay">
        <div class="gov-modal-content max-w-lg p-6 bg-white rounded-xl shadow-2xl space-y-4 font-sans text-xs">
          <div class="flex items-center gap-2 text-[#0038A8] font-mono font-bold text-sm">
            <span class="text-xl">⚠️</span>
            <span>Batas Rentang Unduh: Maksimal 24 Tahun</span>
          </div>
          <div class="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 leading-relaxed font-mono text-[11.5px] space-y-2">
            <div>
              Sesuai ketentuan tata kelola data observatorium, Anda <strong>tidak boleh mengambil total data dalam 1 tabel</strong> sekaligus. Pengunduhan dibatasi <strong>maksimal 24 tahun</strong> per berkas.
            </div>
            <div class="text-slate-700">
              Rentang aktif yang dipilih saat ini: <strong>${this.startYear} – ${this.endYear} (${spanYears} tahun)</strong>.
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2">
            <button id="btn-close-24y-modal" class="px-3.5 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 font-mono font-bold cursor-pointer">
              Atur Kurun Waktu
            </button>
            <button id="btn-download-24y-clamped" class="px-4 py-1.5 rounded bg-[#0038A8] hover:bg-[#002B82] text-white font-mono font-bold cursor-pointer shadow-2xs">
              Unduh 24 Thn Terakhir (${clampedStart}–${this.endYear}) 📥
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-close-24y-modal')?.addEventListener('click', () => { mount.innerHTML = ''; });
    document.getElementById('btn-download-24y-clamped')?.addEventListener('click', () => {
      mount.innerHTML = '';
      this.executeDownload(format, clampedStart, this.endYear);
    });
  }

  executeDownload(format, startY, endY) {
    const url = ApiClient.getWeeklyExportUrl({
      institution_id: this.institutionId,
      view_mode: this.viewMode,
      year: this.year,
      start_year: startY,
      end_year: endY,
      format: format
    });
    window.open(url, '_blank');
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
          <div class="px-6 py-4 bg-[#F8F9FA]  flex items-center justify-between">
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
            
            <!-- KPI Summary Cards (5 Kotak Refined) -->
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
              
              <!-- Kotak 1: Nilai Terkini -->
              <div class="bg-[#F8F9FA] p-3 rounded-lg  space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase font-bold">Nilai Terkini</div>
                <div class="text-base font-bold text-[#1A73E8]">
                  ${Number(stats.latest_value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </div>
                <div class="text-[9px] text-[#5F6368]">${ind.unit_short} (Pekan Berjalan)</div>
              </div>

              <!-- Kotak 2: Average L3Months -->
              <div class="bg-[#F8F9FA] p-3 rounded-lg  space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase font-bold">Average L3Months</div>
                <div class="text-base font-bold text-[#202124]">
                  ${Number(stats.average_l3m).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </div>
                <div class="text-[9px] text-[#5F6368]">Rata-rata 12 Minggu Terakhir</div>
              </div>

              <!-- Kotak 3: Max L12W -->
              <div class="bg-[#F8F9FA] p-3 rounded-lg  space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase font-bold">Max L12W</div>
                <div class="text-base font-bold text-[#D93025]">
                  ${Number(stats.max_l12w).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </div>
                <div class="text-[9px] text-[#5F6368]">Tertinggi 12 Minggu Terakhir</div>
              </div>

              <!-- Kotak 4: Min L12W -->
              <div class="bg-[#F8F9FA] p-3 rounded-lg  space-y-1">
                <div class="text-[10px] text-[#5F6368] uppercase font-bold">Min L12W</div>
                <div class="text-base font-bold text-[#1E8E3E]">
                  ${Number(stats.min_l12w).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                </div>
                <div class="text-[9px] text-[#5F6368]">Terendah 12 Minggu Terakhir</div>
              </div>

              <!-- Kotak 5: 3 Info (WoW, MoM, YoY) -->
              <div class="bg-[#F8F9FA] p-2.5 rounded-lg  flex flex-col justify-between space-y-1">
                <div class="text-[9px] text-[#5F6368] uppercase font-bold border-b border-[#E8EAED] pb-0.5">Momentum Pertumbuhan</div>
                <div class="space-y-0.5 text-[10px]">
                  <div class="flex items-center justify-between">
                    <span class="text-[#5F6368]">WoW:</span>
                    <strong class="${stats.wow_percent !== null && stats.wow_percent >= 0 ? 'text-emerald-700' : 'text-rose-700'}">
                      ${stats.wow_percent !== null ? `${stats.wow_percent > 0 ? '+' : ''}${stats.wow_percent}%` : '-'}
                    </strong>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[#5F6368]">MoM:</span>
                    <strong class="${stats.mom_percent !== null && stats.mom_percent >= 0 ? 'text-emerald-700' : 'text-rose-700'}">
                      ${stats.mom_percent !== null ? `${stats.mom_percent > 0 ? '+' : ''}${stats.mom_percent}%` : '-'}
                    </strong>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[#5F6368]">YoY:</span>
                    <strong class="${stats.yoy_percent !== null && stats.yoy_percent >= 0 ? 'text-emerald-700' : 'text-rose-700'}">
                      ${stats.yoy_percent !== null ? `${stats.yoy_percent > 0 ? '+' : ''}${stats.yoy_percent}%` : '-'}
                    </strong>
                  </div>
                </div>
              </div>

            </div>

            <!-- Historical Canvas Chart with Legend -->
            <div class="bg-white p-4 rounded-lg  space-y-2">
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div class="flex items-center gap-3">
                  <div class="font-bold text-[#202124] flex items-center gap-1.5">
                    <span>📈</span>
                    <span>Deret Waktu Mingguan (${ind.unit})</span>
                  </div>
                  <!-- Visual Legend -->
                  <div class="flex items-center gap-2 text-[10.5px]">
                    <div class="flex items-center gap-1.5 bg-[#F1F3F4] px-2 py-0.5 rounded ">
                      <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#1A73E8]"></span>
                      <span class="text-[#202124] font-medium">Nilai Mingguan</span>
                    </div>
                    <div class="flex items-center gap-1.5 bg-[#FEF7E0] px-2 py-0.5 rounded border border-[#FEEFC3]">
                      <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#E37400]"></span>
                      <span class="text-[#B06000] font-bold">Tren Median Olahan</span>
                    </div>
                  </div>
                </div>
                <div id="weekly-chart-hover-info" class="text-[11px] text-[#1A73E8] font-bold">
                  Arahkan kursor ke grafik untuk info pekan & tren median
                </div>
              </div>
              
              <div class="relative w-full h-[250px] bg-slate-50 rounded border border-[#E8EAED]">
                <canvas id="canvas-weekly-trend" class="w-full h-full block cursor-crosshair"></canvas>
              </div>

              <div class="flex items-center justify-between text-[10.5px] font-mono text-[#5F6368] pt-1">
                <span>${series[0]?.period_label || '1990-W01'}</span>
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

            <!-- Weekly Observations Breakdown Table (Last 36 Weeks) -->
            <div class="space-y-2">
              <div class="text-xs font-mono font-bold text-[#202124] flex items-center justify-between">
                <span>Rincian Observasi Mingguan & Pertumbuhan WoW (Week-on-Week %):</span>
                <span class="text-[10.5px] font-semibold text-[#1A73E8] bg-[#E8F0FE] px-2 py-0.5 rounded border border-[#D2E3FC]">
                  36 Pekan Terakhir Disajikan (Last 36 Weeks)
                </span>
              </div>
              
              <div class="overflow-x-auto max-h-[220px] rounded  scrollbar-thin">
                <table class="w-full text-xs text-left border-collapse font-mono">
                  <thead class="bg-[#F1F3F4] text-[#202124] sticky top-0 ">
                    <tr>
                      <th class="py-1.5 px-3">PEKAN / PERIODE</th>
                      <th class="py-1.5 px-3 text-right">NILAI (${ind.unit_short})</th>
                      <th class="py-1.5 px-3 text-right">TREN MEDIAN OLAHAN</th>
                      <th class="py-1.5 px-3 text-right">DEVIASI MEDIAN</th>
                      <th class="py-1.5 px-3 text-right">PERTUMBUHAN WOW %</th>
                      <th class="py-1.5 px-3 text-center">ARAH TREN</th>
                      <th class="py-1.5 px-3">LEMBAGA PENERBIT</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E8EAED]">
                    ${series.slice(-36).reverse().map(p => `
                      <tr class="hover:bg-[#F8F9FA]">
                        <td class="py-1.5 px-3 font-bold text-[#202124]">${p.period_label}</td>
                        <td class="py-1.5 px-3 text-right font-semibold text-[#1A73E8]">
                          ${Number(p.value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                        </td>
                        <td class="py-1.5 px-3 text-right font-medium text-[#E37400]">
                          ${p.median_trend !== undefined && p.median_trend !== null ? Number(p.median_trend).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) : '-'}
                        </td>
                        <td class="py-1.5 px-3 text-right font-medium ${p.deviation_to_median_percent !== undefined && p.deviation_to_median_percent !== null ? (p.deviation_to_median_percent >= 0 ? 'text-amber-700' : 'text-slate-600') : 'text-[#5F6368]'}">
                          ${p.deviation_to_median_percent !== undefined && p.deviation_to_median_percent !== null ? `${p.deviation_to_median_percent > 0 ? '+' : ''}${p.deviation_to_median_percent}%` : '-'}
                        </td>
                        <td class="py-1.5 px-3 text-right font-medium ${p.wow_percent !== null ? (p.wow_percent >= 0 ? 'text-emerald-700' : 'text-rose-700') : 'text-[#5F6368]'}">
                          ${p.wow_percent !== null ? `${p.wow_percent > 0 ? '+' : ''}${p.wow_percent}%` : '-'}
                        </td>
                        <td class="py-1.5 px-3 text-center">
                          <span class="px-1.5 py-0.2 rounded text-[9.5px] font-mono ${p.wow_percent !== null ? (p.wow_percent > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : (p.wow_percent < 0 ? 'bg-rose-50 text-rose-700 border border-rose-300' : 'bg-slate-100 text-slate-700')) : 'bg-slate-100 text-slate-700'}">
                            ${p.wow_percent !== null ? (p.wow_percent > 0 ? '▲ NAIK' : (p.wow_percent < 0 ? '▼ TURUN' : '► TETAP')) : '—'}
                          </span>
                        </td>
                        <td class="py-1.5 px-3 text-[10.5px] text-[#5F6368] truncate max-w-[200px]">
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
          <div class="px-6 py-3 bg-[#F8F9FA]  flex items-center justify-between">
            <span class="text-[11px] font-mono text-[#5F6368]">
              Diseminasi Resmi: Sesuai Siklus Kalender Rilis Lembaga 2026
            </span>
            <button id="btn-close-weekly-footer" class="px-4 py-1.5 rounded text-xs font-mono font-medium  bg-white hover:bg-[#F1F3F4] text-[#202124] cursor-pointer">
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

    const allVals = [];
    series.forEach(s => {
      if (s.value !== undefined && s.value !== null) allVals.push(s.value);
      if (s.median_trend !== undefined && s.median_trend !== null) allVals.push(s.median_trend);
    });
    const minVal = Math.min(...allVals);
    const maxVal = Math.max(...allVals);
    const valRange = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    // Grid lines (4 horizontal)
    ctx.strokeStyle = '#E8EAED';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#5F6368';
    ctx.font = "10px 'Tahoma', Geneva, Verdana, sans-serif";
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
      const hasMed = s.median_trend !== undefined && s.median_trend !== null;
      const yMed = hasMed ? padTop + plotHeight * (1 - (s.median_trend - minVal) / valRange) : null;
      return { x, y, yMed, ...s };
    });

    // 1. Draw Gradient Area for Raw Weekly Values
    const grad = ctx.createLinearGradient(0, padTop, 0, padTop + plotHeight);
    grad.addColorStop(0, 'rgba(26, 115, 232, 0.20)');
    grad.addColorStop(1, 'rgba(26, 115, 232, 0.01)');

    ctx.beginPath();
    ctx.moveTo(pts[0].x, padTop + plotHeight);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, padTop + plotHeight);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // 2. Draw Raw Weekly Value Line (Blue)
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = '#1A73E8';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // 3. Draw Median Trend Line (Amber / Orange: #E37400)
    const validMedPts = pts.filter(p => p.yMed !== null);
    if (validMedPts.length > 1) {
      ctx.beginPath();
      ctx.moveTo(validMedPts[0].x, validMedPts[0].yMed);
      validMedPts.forEach(p => ctx.lineTo(p.x, p.yMed));
      ctx.strokeStyle = '#E37400';
      ctx.lineWidth = 2.4;
      ctx.stroke();
    }

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

      // Redraw canvas clean
      ctx.clearRect(0, 0, width, height);

      // Redraw grid
      ctx.strokeStyle = '#E8EAED';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#5F6368';
      ctx.font = "10px 'Tahoma', Geneva, Verdana, sans-serif";
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

      // Redraw area
      ctx.beginPath();
      ctx.moveTo(pts[0].x, padTop + plotHeight);
      pts.forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.lineTo(pts[pts.length - 1].x, padTop + plotHeight);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Redraw raw line
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.strokeStyle = '#1A73E8';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Redraw median line
      if (validMedPts.length > 1) {
        ctx.beginPath();
        ctx.moveTo(validMedPts[0].x, validMedPts[0].yMed);
        validMedPts.forEach(pt => ctx.lineTo(pt.x, pt.yMed));
        ctx.strokeStyle = '#E37400';
        ctx.lineWidth = 2.4;
        ctx.stroke();
      }

      // Crosshair lines
      ctx.strokeStyle = '#9AA0A6';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      // Vertical crosshair
      ctx.beginPath();
      ctx.moveTo(p.x, padTop);
      ctx.lineTo(p.x, padTop + plotHeight);
      ctx.stroke();

      // Horizontal crosshair to value
      ctx.beginPath();
      ctx.moveTo(padLeft, p.y);
      ctx.lineTo(width - padRight, p.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Highlight active raw value point (Blue)
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#1A73E8';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Highlight active median point (Amber) if exists
      if (p.yMed !== null) {
        ctx.beginPath();
        ctx.arc(p.x, p.yMed, 4.5, 0, 2 * Math.PI);
        ctx.fillStyle = '#E37400';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Update hover label
      if (hoverInfo) {
        const valStr = Number(p.value).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
        const wowStr = p.wow_percent !== null ? `(${p.wow_percent > 0 ? '+' : ''}${p.wow_percent}% WoW)` : '';
        const medStr = p.median_trend !== undefined && p.median_trend !== null
          ? ` | Median Olahan: <strong class="text-[#E37400]">${Number(p.median_trend).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}</strong>`
          : '';
        const devStr = p.deviation_to_median_percent !== undefined && p.deviation_to_median_percent !== null
          ? ` <span class="text-xs text-[#5F6368]">(${p.deviation_to_median_percent > 0 ? '+' : ''}${p.deviation_to_median_percent}% deviasi)</span>`
          : '';
        hoverInfo.innerHTML = `Pekan: <strong class="text-[#202124]">${p.period_label}</strong> | Nilai: <strong class="text-[#1A73E8]">${valStr} ${unitSymbol}</strong> ${wowStr}${medStr}${devStr}`;
      }
    };

    canvas.onmouseleave = () => {
      // Restore clean chart
      this.drawWeeklyCanvasChart(series, unitSymbol);
      if (hoverInfo) {
        hoverInfo.textContent = 'Arahkan kursor ke grafik untuk info pekan & tren median';
      }
    };
  }
}
