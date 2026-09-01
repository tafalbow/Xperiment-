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
        
        <!-- 1. TAB KE KOMPILASI SUMBER DATA & JADWAL RILIS (Google Analytics Style) -->
        <div class="gov-card p-3.5 bg-white border border-[#DADCE0] shadow-sm space-y-2 rounded-lg">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-[#1A73E8] tracking-wider uppercase flex items-center gap-1.5">
              <span>📅</span> SIKLUS RILIS TGL 8, 17, 28
            </span>
            <span class="text-[9px] px-1.5 py-0.2 rounded bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] font-bold">
              ${this.totalVariables} Variabel
            </span>
          </div>

          <div>
            <h3 class="font-bold text-xs text-[#202124] leading-snug">
              Kompilasi Sumber Data & Jadwal Rilis
            </h3>
            <p class="text-[11px] text-[#5F6368] font-sans mt-0.5 leading-relaxed">
              Daftar inventori 47 variabel data resmi, dasar hukum UU, dan jadwal update berkala.
            </p>
          </div>

          <div class="pt-1 space-y-1.5">
            <button 
              type="button" 
              id="btn-sidebar-open-inventory" 
              class="w-full py-1.5 px-3 rounded bg-[#1A73E8] hover:bg-[#174EA6] text-white font-medium text-xs font-mono flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>📑</span>
              <span>Katalog Sumber Data ➔</span>
            </button>

            <button 
              type="button" 
              id="btn-sidebar-open-commodities" 
              class="w-full py-1.5 px-3 rounded bg-[#1E8E3E] hover:bg-[#137333] text-white font-medium text-xs font-mono flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>🌾</span>
              <span>Neraca Komoditas & Hasil Bumi ➔</span>
            </button>
          </div>
        </div>

        <!-- 2. CONTACT PERSON & SERVICE DESK (Aligned with Ringkasan Metrik Deskriptif) -->
        <div class="gov-card p-3.5 bg-white border border-[#DADCE0] shadow-2xs space-y-2 rounded-lg mt-auto">
          <div class="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
            <div class="flex items-center gap-1.5 text-[11px] font-bold text-[#202124] uppercase">
              <span>👤</span>
              <span>Contact Person & Helpdesk</span>
            </div>
            <span class="text-[9px] bg-[#E8F0FE] text-[#1A73E8] px-1.5 py-0.2 rounded border border-[#D2E3FC] font-bold">
              Resmi
            </span>
          </div>

          <div class="space-y-1 text-[11px] text-[#3C4043]">
            <div>
              <span class="text-[#5F6368] text-[10px] uppercase block">Unit Pengelola Basis Data:</span>
              <strong class="text-[#202124] font-sans">Tim Tata Kelola & Analisis Data Makroekonomi Nasional</strong>
            </div>

            <div class="pt-1 border-t border-[#E8EAED]">
              <div class="flex items-center gap-1.5">
                <span class="text-[#5F6368] text-xs">📧</span>
                <a href="mailto:lubis.tania@dewanekonomi.go.id" class="text-[#1A73E8] hover:text-[#174EA6] underline font-mono text-[11px] font-medium">
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
