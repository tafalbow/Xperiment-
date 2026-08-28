// ==============================================================================
// VARIABLES INVENTORY & RELEASE SCHEDULE COMPONENT (Jadwal Update Tgl 8, 17, 28)
// Pusat Basis Data Data Sekunder: Pergerakan Ekonomi Indonesia
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { ModalManager } from './modals.js';

export class VariablesInventory {
  constructor(containerId, { onSelectVariableForDashboard }) {
    this.container = document.getElementById(containerId);
    this.onSelectVariableForDashboard = onSelectVariableForDashboard;
    this.data = null;
    this.filteredVariables = [];
    this.currentSearchKeyword = '';
    this.activeFilterCategory = 'ALL';

    this.init();
  }

  async init() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="gov-card p-8 text-center text-slate-500 font-mono text-xs animate-pulse">
        <span>Memuat Katalog Detail Variabel & Kebijakan Jadwal Rilis Data...</span>
      </div>
    `;

    try {
      this.data = await ApiClient.fetchVariablesInventory();
      this.filteredVariables = this.data.variables || [];
      this.render();
    } catch (err) {
      console.error('Error loading variables inventory:', err);
      this.container.innerHTML = `
        <div class="gov-card p-6 text-center text-rose-700 bg-rose-50 font-mono text-xs">
          <h3 class="font-bold text-sm mb-1">Gagal Memuat Katalog Detail Variabel</h3>
          <p>${err.message}</p>
        </div>
      `;
    }
  }

  filterData() {
    if (!this.data || !this.data.variables) return;

    const kw = (this.currentSearchKeyword || '').toLowerCase().trim();
    const cat = this.activeFilterCategory;

    this.filteredVariables = this.data.variables.filter(v => {
      // Keyword match
      const matchKw = !kw || 
        (v.name && v.name.toLowerCase().includes(kw)) ||
        (v.unique_variable_code && v.unique_variable_code.toLowerCase().includes(kw)) ||
        (v.sector && v.sector.toLowerCase().includes(kw)) ||
        (v.publishing_institution && v.publishing_institution.toLowerCase().includes(kw)) ||
        (v.publication_document_name && v.publication_document_name.toLowerCase().includes(kw)) ||
        (v.official_law_basis && v.official_law_basis.toLowerCase().includes(kw));

      // Category match
      let matchCat = true;
      if (cat === 'TGL_8') matchCat = v.scheduled_cycle_day === 8;
      else if (cat === 'TGL_17') matchCat = v.scheduled_cycle_day === 17;
      else if (cat === 'TGL_28') matchCat = v.scheduled_cycle_day === 28;
      else if (cat === 'KEMENKEU') matchCat = (v.publishing_institution || '').includes('Kementerian Keuangan');
      else if (cat === 'BPS') matchCat = (v.publishing_institution || '').includes('Badan Pusat Statistik');
      else if (cat === 'BI') matchCat = (v.publishing_institution || '').includes('Bank Indonesia');
      else if (cat === 'LVL_1') matchCat = v.level_num === 1;
      else if (cat === 'LVL_2') matchCat = v.level_num === 2;
      else if (cat === 'LVL_3') matchCat = v.level_num === 3;
      else if (cat === 'LVL_4') matchCat = v.level_num === 4;

      return matchKw && matchCat;
    });

    this.renderTableOnly();
  }

  render() {
    if (!this.container || !this.data) return;

    const policy = this.data.schedule_policy || {};
    const stats = this.data.statistics || {};

    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- 1. OFFICIAL RELEASE SCHEDULE POLICY BANNER (High Contrast & Vibrant Highlights) -->
        <div style="background-color: #0F172A; color: #FFFFFF;" class="rounded-lg p-5 border border-slate-700 shadow-md">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div class="space-y-2.5 max-w-3xl">
              <!-- Highlight Badges -->
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase tracking-wide flex items-center gap-1.5 shadow-xs" style="background-color: #064E3B; color: #6EE7B7; border: 1px solid #059669;">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Siklus Pembaruan: Tanggal 8, 17, dan 28 Setiap Bulan
                </span>
                <span class="px-2.5 py-1 rounded text-[10.5px] font-mono font-semibold" style="background-color: #4C0519; color: #FDA4AF; border: 1px solid #E11D48;">
                  🛑 Auto-Update Real-Time Dinonaktifkan (Kepatuhan Audit Dokumen Resmi)
                </span>
              </div>

              <!-- Main Title -->
              <h2 class="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>🏛️</span>
                <span>Kebijakan Pembaruan & Kalender Rilis Data Berkala Nasional</span>
              </h2>

              <!-- High Contrast Description with Highlights -->
              <p class="text-xs leading-relaxed font-sans" style="color: #E2E8F0;">
                Pusat Basis Data menerapkan kebijakan rilis berkala pada <strong style="color: #FCD34D;">Tanggal 8, 17, dan 28 setiap bulannya</strong> sesuai kalender resmi <strong style="color: #7DD3FC;">Kementerian Keuangan RI</strong> (APBN KiTa & LKPP Audited BPK), <strong style="color: #7DD3FC;">Bank Indonesia</strong> (SEKI), dan <strong style="color: #7DD3FC;">Badan Pusat Statistik</strong> (BRS PDB/Inflasi). Pembaruan otomatis real-time dinonaktifkan agar seluruh data terjamin memiliki <strong style="color: #6EE7B7;">dasar hukum dan dokumen sumber resmi yang sah</strong>.
              </p>
            </div>

            <!-- Next Scheduled Release Box -->
            <div style="background-color: #1E293B; border: 1px solid #334155;" class="p-4 rounded-lg text-right shrink-0 w-full lg:w-72 shadow-inner">
              <div class="text-[10px] font-mono uppercase font-bold text-slate-300 tracking-wider">
                JADWAL RILIS TERDEKAT:
              </div>
              <div class="text-xl font-bold font-mono mt-1 tracking-tight" style="color: #FBBF24;">
                ${policy.next_release_date || '28 Agustus 2026'}
              </div>
              <div class="text-xs font-mono font-semibold mt-1" style="color: #7DD3FC;">
                ${policy.next_focus_sector || 'Sektor Makroekonomi & PDB'}
              </div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded mt-2.5 font-mono text-[11px] font-bold" style="background-color: #064E3B; color: #A7F3D0; border: 1px solid #059669;">
                <span>⏳</span>
                <span>Hitung Mundur: <strong>${policy.days_until_next_release || 1} Hari Lagi</strong></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. SUMMARY METRIC CARDS GRID -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Variables Card -->
          <div class="gov-card p-4 flex flex-col justify-between border-l-4 border-l-sky-600 bg-white">
            <div class="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span class="font-semibold">TOTAL VARIABEL RESMI</span>
              <span class="text-base">📊</span>
            </div>
            <div class="mt-2">
              <div class="text-2xl font-bold font-mono text-slate-900">${stats.total_variables || 47}</div>
              <p class="text-[11px] text-slate-500 mt-0.5">4 Level Klasifikasi Keuangan & Statistik</p>
            </div>
          </div>

          <!-- Batch Tgl 8 Card -->
          <div class="gov-card p-4 flex flex-col justify-between border-l-4 border-l-emerald-600 bg-white">
            <div class="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span class="font-semibold">RILIS TANGGAL 8</span>
              <span class="text-base">🏦</span>
            </div>
            <div class="mt-2">
              <div class="text-2xl font-bold font-mono text-emerald-700">${stats.total_batch_tgl_8 || 12} Variabel</div>
              <p class="text-[11px] text-slate-500 mt-0.5">Moneter, Cadangan Devisa, Suku Bunga (Bank Indonesia)</p>
            </div>
          </div>

          <!-- Batch Tgl 17 Card -->
          <div class="gov-card p-4 flex flex-col justify-between border-l-4 border-l-blue-600 bg-white">
            <div class="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span class="font-semibold">RILIS TANGGAL 17</span>
              <span class="text-base">🏛️</span>
            </div>
            <div class="mt-2">
              <div class="text-2xl font-bold font-mono text-blue-700">${stats.total_batch_tgl_17 || 23} Variabel</div>
              <p class="text-[11px] text-slate-500 mt-0.5">LKPP LO Audited, Pajak PPh/PPN/Cukai (Kemenkeu RI)</p>
            </div>
          </div>

          <!-- Batch Tgl 28 Card -->
          <div class="gov-card p-4 flex flex-col justify-between border-l-4 border-l-amber-600 bg-white">
            <div class="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span class="font-semibold">RILIS TANGGAL 28</span>
              <span class="text-base">📈</span>
            </div>
            <div class="mt-2">
              <div class="text-2xl font-bold font-mono text-amber-700">${stats.total_batch_tgl_28 || 12} Variabel</div>
              <p class="text-[11px] text-slate-500 mt-0.5">PDB Riil, Inflasi IHK, Komoditas Strategis (BPS)</p>
            </div>
          </div>
        </div>

        <!-- 3. SEARCH & FILTER TOOLBAR -->
        <div class="gov-card p-4 space-y-3 bg-white">
          <div class="flex flex-col md:flex-row items-center justify-between gap-3">
            <!-- Search Box -->
            <div class="relative w-full md:w-96">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                🔍
              </span>
              <input 
                type="text" 
                id="inventory-search-input" 
                class="gov-input pl-8 w-full text-xs font-mono" 
                placeholder="Cari nama variabel, kode VAR_..., sektor, atau dokumen..."
                value="${this.currentSearchKeyword}"
              />
            </div>

            <!-- Total Result Badge -->
            <div class="text-xs font-mono text-slate-500 shrink-0">
              Menampilkan: <strong id="inventory-count" class="text-slate-900">${this.filteredVariables.length}</strong> dari <strong>${stats.total_variables || 47}</strong> variabel
            </div>
          </div>

          <!-- Quick Filter Buttons -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-thin">
            <span class="text-slate-400 uppercase text-[10px] font-bold shrink-0">Filter Rilis:</span>
            <button class="btn-inv-filter px-2.5 py-1 rounded text-xs transition-all shrink-0 border ${this.activeFilterCategory === 'ALL' ? 'bg-slate-900 text-white font-bold border-slate-900' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}" data-cat="ALL">
              Semua (${stats.total_variables || 47})
            </button>
            <button class="btn-inv-filter px-2.5 py-1 rounded text-xs transition-all shrink-0 border ${this.activeFilterCategory === 'TGL_8' ? 'bg-emerald-700 text-white font-bold border-emerald-700' : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'}" data-cat="TGL_8">
              📅 Tgl 8 (Bank Indonesia)
            </button>
            <button class="btn-inv-filter px-2.5 py-1 rounded text-xs transition-all shrink-0 border ${this.activeFilterCategory === 'TGL_17' ? 'bg-blue-700 text-white font-bold border-blue-700' : 'bg-white text-blue-800 border-blue-300 hover:bg-blue-50'}" data-cat="TGL_17">
              📅 Tgl 17 (Kemenkeu RI)
            </button>
            <button class="btn-inv-filter px-2.5 py-1 rounded text-xs transition-all shrink-0 border ${this.activeFilterCategory === 'TGL_28' ? 'bg-amber-700 text-white font-bold border-amber-700' : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-50'}" data-cat="TGL_28">
              📅 Tgl 28 (BPS RI)
            </button>
            
            <span class="text-slate-300 shrink-0">|</span>
            <span class="text-slate-400 uppercase text-[10px] font-bold shrink-0">Level:</span>
            <button class="btn-inv-filter px-2 py-0.5 rounded text-[11px] transition-all shrink-0 border ${this.activeFilterCategory === 'LVL_1' ? 'bg-purple-700 text-white font-bold' : 'bg-slate-50 text-slate-600 border-slate-200'}" data-cat="LVL_1">Lvl 1 (Sektor)</button>
            <button class="btn-inv-filter px-2 py-0.5 rounded text-[11px] transition-all shrink-0 border ${this.activeFilterCategory === 'LVL_2' ? 'bg-purple-700 text-white font-bold' : 'bg-slate-50 text-slate-600 border-slate-200'}" data-cat="LVL_2">Lvl 2 (Kategori)</button>
            <button class="btn-inv-filter px-2 py-0.5 rounded text-[11px] transition-all shrink-0 border ${this.activeFilterCategory === 'LVL_3' ? 'bg-purple-700 text-white font-bold' : 'bg-slate-50 text-slate-600 border-slate-200'}" data-cat="LVL_3">Lvl 3 (Jenis)</button>
            <button class="btn-inv-filter px-2 py-0.5 rounded text-[11px] transition-all shrink-0 border ${this.activeFilterCategory === 'LVL_4' ? 'bg-purple-700 text-white font-bold' : 'bg-slate-50 text-slate-600 border-slate-200'}" data-cat="LVL_4">Lvl 4 (Rincian)</button>
          </div>
        </div>

        <!-- 4. DETAILED VARIABLES INVENTORY DATA TABLE CONTAINER -->
        <div class="gov-card overflow-hidden bg-white shadow-sm border border-slate-200" id="inventory-table-container">
          ${this.getTableHtml()}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  getTableHtml() {
    if (!this.filteredVariables || this.filteredVariables.length === 0) {
      return `
        <div class="p-12 text-center text-slate-400 font-mono text-xs">
          <p class="text-sm font-semibold text-slate-600 mb-1">Tidak ada variabel yang sesuai dengan filter/pencarian.</p>
          <p>Coba ubah kata kunci pencarian atau pilih kategori rilis lain.</p>
        </div>
      `;
    }

    return `
      <div class="overflow-x-auto">
        <table class="gov-table w-full text-left text-xs font-mono">
          <thead>
            <tr class="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[10px]">
              <th class="py-3 px-3 w-12 text-center">No</th>
              <th class="py-3 px-3">Kode & Nama Variabel</th>
              <th class="py-3 px-3">Klasifikasi & Level</th>
              <th class="py-3 px-3">Lembaga & Dokumen Resmi</th>
              <th class="py-3 px-3 bg-sky-50/70 border-x border-sky-100 text-sky-950 font-bold">
                🗓️ Terakhir Terupdate
              </th>
              <th class="py-3 px-3">Siklus Rilis Rutin</th>
              <th class="py-3 px-3">Update Berikutnya</th>
              <th class="py-3 px-3 text-center w-36">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${this.filteredVariables.map((v, idx) => {
              // Color badges based on release day
              let cycleBadgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
              let cycleIcon = '📈';
              if (v.scheduled_cycle_day === 8) {
                cycleBadgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                cycleIcon = '🏦';
              } else if (v.scheduled_cycle_day === 17) {
                cycleBadgeClass = 'bg-blue-50 text-blue-800 border-blue-200';
                cycleIcon = '🏛️';
              }

              // Level badge
              let levelBadge = 'bg-slate-100 text-slate-700 border-slate-200';
              if (v.level_num === 1) levelBadge = 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
              else if (v.level_num === 2) levelBadge = 'bg-indigo-50 text-indigo-800 border-indigo-200 font-semibold';
              else if (v.level_num === 3) levelBadge = 'bg-sky-50 text-sky-800 border-sky-200';

              return `
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <!-- 1. Number -->
                  <td class="py-2.5 px-3 text-center text-slate-400 text-[11px] font-bold">
                    ${idx + 1}
                  </td>

                  <!-- 2. Variable Name & Code -->
                  <td class="py-2.5 px-3">
                    <div class="font-sans font-bold text-slate-900 text-xs">
                      ${v.name}
                    </div>
                    <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span class="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                        ${v.unique_variable_code}
                      </span>
                      <span class="text-[10px] text-slate-600 font-semibold">
                        (${v.unit})
                      </span>
                    </div>
                  </td>

                  <!-- 3. Hierarchy & Level -->
                  <td class="py-2.5 px-3">
                    <span class="text-[10px] px-1.5 py-0.5 rounded border inline-block ${levelBadge}">
                      ${v.level_label}
                    </span>
                    <div class="text-[11px] text-slate-600 truncate max-w-[200px] mt-0.5" title="${v.sector} > ${v.category}">
                      ${v.category}
                    </div>
                  </td>

                  <!-- 4. Institution & Legal Document -->
                  <td class="py-2.5 px-3">
                    <div class="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                      <span>🏢</span>
                      <span>${v.publishing_institution}</span>
                    </div>
                    <div class="text-[10px] text-slate-500 truncate max-w-[220px] mt-0.5" title="${v.publication_document_name}">
                      📜 ${v.official_law_basis || v.publication_document_name}
                    </div>
                  </td>

                  <!-- 5. EXACT LAST UPDATED DATE -->
                  <td class="py-2.5 px-3 bg-sky-50/40 border-x border-sky-100 font-bold text-sky-900 text-[11px]">
                    <div class="flex items-center gap-1">
                      <span>✓</span>
                      <span>${v.last_updated_date}</span>
                    </div>
                    <span class="text-[9px] font-normal text-slate-500 block">
                      ${v.total_observations} Rekord (${v.period_range})
                    </span>
                  </td>

                  <!-- 6. Scheduled Routine Cycle -->
                  <td class="py-2.5 px-3">
                    <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${cycleBadgeClass}">
                      <span>${cycleIcon}</span>
                      <span>${v.scheduled_cycle_label}</span>
                    </span>
                  </td>

                  <!-- 7. Next Scheduled Update -->
                  <td class="py-2.5 px-3 text-slate-700 text-[11px] font-mono">
                    <span class="font-semibold text-slate-900">${v.next_scheduled_update}</span>
                    <span class="text-[9px] text-slate-400 block">Siklus Tgl ${v.scheduled_cycle_day}</span>
                  </td>

                  <!-- 8. Actions -->
                  <td class="py-2.5 px-3 text-center">
                    <div class="flex items-center justify-center gap-1.5">
                      <button 
                        type="button" 
                        class="btn-open-in-dash px-2 py-1 bg-sky-700 hover:bg-sky-800 text-white rounded text-[10px] font-semibold flex items-center gap-1 shadow-2xs transition-all"
                        data-ind-id="${v.indicator_id}"
                        title="Buka variabel ini di Dasbor Analitik & Grafik"
                      >
                        <span>📊</span> Buka
                      </button>
                      <button 
                        type="button" 
                        class="btn-view-inv-meta px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-[10px] font-semibold shadow-2xs transition-all"
                        data-ind-id="${v.indicator_id}"
                        title="Lihat 24 Atribut Kamus Metadata Resmi"
                      >
                        <span>📖</span>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  renderTableOnly() {
    const tableContainer = document.getElementById('inventory-table-container');
    const countBadge = document.getElementById('inventory-count');
    if (tableContainer) {
      tableContainer.innerHTML = this.getTableHtml();
    }
    if (countBadge) {
      countBadge.textContent = this.filteredVariables.length;
    }
    this.attachTableActionEvents();
  }

  attachEvents() {
    const searchInput = document.getElementById('inventory-search-input');
    searchInput?.addEventListener('input', (e) => {
      this.currentSearchKeyword = e.target.value;
      this.filterData();
    });

    const filterBtns = this.container.querySelectorAll('.btn-inv-filter');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = btn.getAttribute('data-cat');
        this.activeFilterCategory = cat;

        // Update active style
        filterBtns.forEach(b => {
          b.classList.remove('bg-slate-900', 'text-white', 'font-bold', 'bg-emerald-700', 'bg-blue-700', 'bg-amber-700', 'bg-purple-700');
          b.classList.add('bg-white', 'text-slate-700');
        });

        if (cat === 'ALL') {
          btn.classList.add('bg-slate-900', 'text-white', 'font-bold');
        } else if (cat === 'TGL_8') {
          btn.classList.add('bg-emerald-700', 'text-white', 'font-bold');
        } else if (cat === 'TGL_17') {
          btn.classList.add('bg-blue-700', 'text-white', 'font-bold');
        } else if (cat === 'TGL_28') {
          btn.classList.add('bg-amber-700', 'text-white', 'font-bold');
        } else {
          btn.classList.add('bg-purple-700', 'text-white', 'font-bold');
        }

        this.filterData();
      });
    });

    this.attachTableActionEvents();
  }

  attachTableActionEvents() {
    const openDashBtns = this.container.querySelectorAll('.btn-open-in-dash');
    openDashBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const indId = btn.getAttribute('data-ind-id');
        if (this.onSelectVariableForDashboard) {
          this.onSelectVariableForDashboard(indId);
        }
      });
    });

    const metaBtns = this.container.querySelectorAll('.btn-view-inv-meta');
    metaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const indId = btn.getAttribute('data-ind-id');
        ModalManager.showDictionaryModal(indId);
      });
    });
  }
}
