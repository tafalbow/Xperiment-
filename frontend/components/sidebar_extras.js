// ==============================================================================
// SIDEBAR EXTRAS COMPONENT (Tab Sumber Data, Contact Person, Ownership & Upgrade Space)
// ==============================================================================

export class SidebarExtras {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onSwitchToInventory = options.onSwitchToInventory || (() => {});
    this.totalVariables = options.totalVariables || 47;
    this.render();
  }

  updateStats(total) {
    this.totalVariables = total || this.totalVariables;
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-3 font-mono text-xs flex flex-col justify-between h-full">
        
        <!-- 1. TAB KE KOMPILASI SUMBER DATA & JADWAL RILIS (Updated to #CDCDCD Gray) -->
        <div style="background-color: #CDCDCD;" class="gov-card p-3.5 text-slate-950 border border-slate-400 shadow-sm space-y-2 rounded">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-slate-900 tracking-wider uppercase flex items-center gap-1.5">
              <span>📅</span> SIKLUS RILIS TGL 8, 17, 28
            </span>
            <span class="text-[9px] px-1.5 py-0.2 rounded bg-emerald-900 text-emerald-100 border border-emerald-950 font-bold">
              ${this.totalVariables} Variabel
            </span>
          </div>

          <div>
            <h3 class="font-bold text-xs text-slate-950 leading-snug">
              Kompilasi Sumber Data & Jadwal Rilis
            </h3>
            <p class="text-[11px] text-slate-900 font-sans mt-0.5 leading-relaxed">
              Daftar inventori 47 variabel data resmi, dasar hukum UU, dan jadwal update berkala.
            </p>
          </div>

          <div class="pt-1 space-y-1.5">
            <button 
              type="button" 
              id="btn-sidebar-open-inventory" 
              class="w-full py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>📑</span>
              <span>Katalog Sumber Data ➔</span>
            </button>

            <button 
              type="button" 
              id="btn-sidebar-open-commodities" 
              class="w-full py-1.5 px-3 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer border border-emerald-900"
            >
              <span>🌾</span>
              <span>Neraca Komoditas & Hasil Bumi ➔</span>
            </button>
          </div>
        </div>

        <!-- 2. CONTACT PERSON & SERVICE DESK (Aligned with Ringkasan Metrik Deskriptif) -->
        <div class="gov-card p-3.5 bg-white border border-slate-300 shadow-2xs space-y-2 rounded mt-auto">
          <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
            <div class="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 uppercase">
              <span>👤</span>
              <span>Contact Person & Helpdesk</span>
            </div>
            <span class="text-[9px] bg-sky-50 text-sky-800 px-1.5 py-0.2 rounded border border-sky-200 font-bold">
              Resmi
            </span>
          </div>

          <div class="space-y-1 text-[11px] text-slate-700">
            <div>
              <span class="text-slate-400 text-[10px] uppercase block">Unit Pengelola Basis Data:</span>
              <strong class="text-slate-900 font-sans">Tim Tata Kelola & Analisis Data Makroekonomi Nasional</strong>
            </div>

            <div class="pt-1 border-t border-slate-100">
              <div class="flex items-center gap-1.5">
                <span class="text-slate-500 text-xs">📧</span>
                <a href="mailto:lubis.tania@dewanekonomi.go.id" class="text-sky-700 hover:text-sky-900 underline font-mono text-[11px] font-semibold">
                  lubis.tania@dewanekonomi.go.id
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    document.getElementById('btn-sidebar-open-inventory')?.addEventListener('click', () => {
      this.onSwitchToInventory();
    });

    document.getElementById('btn-sidebar-open-commodities')?.addEventListener('click', () => {
      window.__govApp?.switchMainTab('commodities');
    });
  }
}
