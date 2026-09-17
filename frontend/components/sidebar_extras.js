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
        
        <!-- CONTACT PERSON & SERVICE DESK (Aligned with Ringkasan Metrik Deskriptif) -->
        <div class="gov-card p-3.5 bg-white shadow-2xs space-y-2 rounded-lg mt-auto">
          <div class="flex items-center justify-between pb-1.5">
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
    // No shortcuts remaining in sidebar
  }
}
