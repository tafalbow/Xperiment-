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
      <div class="space-y-4 font-mono text-xs">
        
        <!-- 1. TAB KE KOMPILASI SUMBER DATA & JADWAL RILIS -->
        <div class="gov-card p-3.5 bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 shadow-sm space-y-2.5 rounded">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-amber-300 tracking-wider uppercase flex items-center gap-1.5">
              <span>📅</span> SIKLUS RILIS TGL 8, 17, 28
            </span>
            <span class="text-[9px] px-1.5 py-0.2 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-600 font-bold">
              ${this.totalVariables} Variabel
            </span>
          </div>

          <div>
            <h3 class="font-bold text-xs text-white leading-snug">
              Kompilasi Sumber Data & Jadwal Rilis
            </h3>
            <p class="text-[11px] text-slate-300 font-sans mt-1 leading-relaxed">
              Daftar inventori 47 variabel data resmi, dasar hukum UU, dan jadwal update berkala.
            </p>
          </div>

          <button 
            type="button" 
            id="btn-sidebar-open-inventory" 
            class="w-full py-2 px-3 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>📑</span>
            <span>Buka Katalog Sumber Data ➔</span>
          </button>
        </div>

        <!-- 2. CONTACT PERSON & SERVICE DESK -->
        <div class="gov-card p-3.5 bg-white border border-slate-300 shadow-2xs space-y-2.5 rounded">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2">
            <div class="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 uppercase">
              <span>👤</span>
              <span>Contact Person & Helpdesk</span>
            </div>
            <span class="text-[9px] bg-sky-50 text-sky-800 px-1.5 py-0.2 rounded border border-sky-200 font-bold">
              Resmi
            </span>
          </div>

          <div class="space-y-1.5 text-[11px] text-slate-700">
            <div>
              <span class="text-slate-400 text-[10px] uppercase block">Unit Pengelola Basis Data:</span>
              <strong class="text-slate-900 font-sans">Tim Tata Kelola & Analisis Data Makroekonomi Nasional</strong>
            </div>

            <div class="pt-1 border-t border-slate-100 space-y-1">
              <div class="flex items-center gap-1.5">
                <span class="text-slate-500">📧</span>
                <a href="mailto:lubis.tania@dewanekonomi.go.id" class="text-sky-700 hover:text-sky-900 underline font-mono text-[10.5px] font-semibold">
                  lubis.tania@dewanekonomi.go.id
                </a>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-slate-500">☎️</span>
                <span class="text-slate-800 font-mono text-[10.5px]">+62 (021) 384-0888 (Ext. 420)</span>
              </div>
              <div class="flex items-center gap-1.5 text-slate-500 text-[10px]">
                <span>🕒</span>
                <span>Senin – Jumat: 08:30 – 16:30 WIB</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. SPACE KOSONG UNTUK UTILISASI / UPGRADE SELANJUTNYA + INFO OWNERSHIP WEBSITE -->
        <div class="gov-card p-3.5 bg-slate-50/80 border border-dashed border-slate-300 shadow-2xs space-y-2.5 rounded">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2">
            <div class="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 uppercase">
              <span>🏛️</span>
              <span>Info Ownership & Tata Kelola</span>
            </div>
            <span class="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-bold">
              Hak Cipta RI
            </span>
          </div>

          <div class="space-y-2 text-[11px] text-slate-600 font-sans leading-relaxed">
            <p>
              Hak Cipta Repositori <strong>Pusat Basis Data Data Sekunder: Pergerakan Ekonomi Indonesia</strong> dimiliki sepenuhnya oleh <strong>Pemerintah Republik Indonesia</strong>.
            </p>
            <div class="p-2 rounded bg-amber-50/80 border border-amber-200 text-amber-900 text-[10.5px] font-mono">
              ⚠️ Penggunaan data dibatasi (restricted) untuk analisis resmi terdaftar. Wajib mencantumkan repositori ini sebagai sumber sitasi.
            </div>
          </div>

          <!-- Future Upgrade Placeholder Slot -->
          <div class="pt-2 border-t border-slate-200">
            <div class="p-2 rounded bg-white border border-slate-200 text-slate-500 text-[10px] font-mono text-center">
              <span class="text-slate-400">⚡ Slot Modular:</span>
              <strong class="text-slate-700">API Webhook & Data Pipeline Automation</strong>
              <span class="block text-slate-400 text-[9px] mt-0.5">(Tersedia pada Pembaruan Fase II)</span>
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
  }
}
