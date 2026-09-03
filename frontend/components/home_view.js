// ==============================================================================
// HOME VIEW COMPONENT: INDONESIA ECONOMIC DATA OBSERVATORY
// Platform Overview, Macroeconomic Pulse, Headline Chart & Quick Discovery
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

export class HomeView {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.pulseData = null;
  }

  async render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- 1. HERO OBSERVATORY BANNER -->
        <div class="bg-gradient-to-r from-[#FFFFFF] via-[#F8F9FA] to-[#EDF2FC] border border-[#DADCE0] rounded-lg p-5 shadow-2xs relative overflow-hidden">
          <div class="max-w-3xl space-y-2">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold uppercase bg-[#1A73E8] text-white tracking-wide">
                OBSERVATORIUM RESMI STATUTORI
              </span>
              <span class="text-[11px] font-mono text-[#5F6368]">
                Domain: <strong class="text-[#202124]">indoekonomi.data.go.id</strong>
              </span>
            </div>

            <h2 class="text-2xl lg:text-3xl font-extrabold text-[#202124] tracking-tight leading-tight">
              INDOEKONOMI data — Indonesia Economic Data Observatory
            </h2>

            <p class="text-xs sm:text-sm text-[#3C4043] leading-relaxed">
              Repositori satu pintu untuk menemukan, memahami, membandingkan, menelusuri provenans asal-usul data, dan menganalisis publikasi ekonomi resmi Indonesia secara terharmonisasi.
            </p>

            <div class="pt-2 flex items-center gap-2 flex-wrap text-xs font-mono">
              <button id="home-btn-explore-indicators" class="px-3.5 py-1.5 rounded bg-[#1A73E8] hover:bg-[#174EA6] text-white font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                <span>📊</span>
                <span>Pantau Indikator Makro</span>
              </button>
              <button id="home-btn-explore-calendar" class="px-3.5 py-1.5 rounded bg-white hover:bg-[#F1F3F4] text-[#202124] border border-[#DADCE0] font-medium transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer">
                <span>🌾</span>
                <span>Kalender Tanam & Panen</span>
              </button>
              <button id="home-btn-explore-crosswalk" class="px-3.5 py-1.5 rounded bg-white hover:bg-[#F1F3F4] text-[#1A73E8] border border-[#DADCE0] font-medium transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer">
                <span>ℹ️</span>
                <span>Riwayat Klasifikasi APBN</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 2. MACROECONOMIC PULSE KPI CARDS -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between border-b border-[#DADCE0] pb-1">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#202124] flex items-center gap-1.5">
              <span>⚡</span>
              <span>DENYUT EKONOMI NASIONAL (INDONESIA MACROECONOMIC PULSE)</span>
            </span>
            <span class="text-[10.5px] font-mono text-[#5F6368]">Data Resmi Terkini BPS, Kemenkeu & Bank Indonesia</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" id="home-pulse-cards">
            <!-- Pulse Cards Injected -->
            <div class="bg-white p-3 rounded border border-[#DADCE0] space-y-1">
              <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">Pertumbuhan PDB (YoY)</div>
              <div class="text-lg font-mono font-bold text-[#1E8E3E]">5.05%</div>
              <div class="text-[10px] text-[#5F6368]">Kuartal IV-2024 • BPS BRS</div>
            </div>
            <div class="bg-white p-3 rounded border border-[#DADCE0] space-y-1">
              <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">Inflasi IHK (Headline YoY)</div>
              <div class="text-lg font-mono font-bold text-[#1A73E8]">1.55%</div>
              <div class="text-[10px] text-[#5F6368]">Januari 2025 • Sasaran BI: 2.5±1%</div>
            </div>
            <div class="bg-white p-3 rounded border border-[#DADCE0] space-y-1">
              <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">BI-Rate (7-Day Reverse Repo)</div>
              <div class="text-lg font-mono font-bold text-[#202124]">6.00%</div>
              <div class="text-[10px] text-[#5F6368]">RDG Bank Indonesia • Posisi Stabil</div>
            </div>
            <div class="bg-white p-3 rounded border border-[#DADCE0] space-y-1">
              <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">Cadangan Devisa</div>
              <div class="text-lg font-mono font-bold text-[#202124]">USD 150.2 M</div>
              <div class="text-[10px] text-[#5F6368]">Setara 6.5 Bulan Impor & Utang LN</div>
            </div>
            <div class="bg-white p-3 rounded border border-[#DADCE0] space-y-1">
              <div class="text-[10.5px] font-mono text-[#5F6368] uppercase">Pendapatan APBN 2024</div>
              <div class="text-lg font-mono font-bold text-[#1E8E3E]">Rp 3.028 T</div>
              <div class="text-[10px] text-[#5F6368]">Realisasi APBN Kita Sementara 100.8%</div>
            </div>
          </div>
        </div>

        <!-- 3. PLATFORM CORE PILLARS (FINDABLE, UNDERSTANDABLE, COMPARABLE, TRACEABLE) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-2">
            <div class="w-8 h-8 rounded bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center font-bold text-sm">
              🔍
            </div>
            <h3 class="text-xs font-mono font-bold text-[#202124] uppercase">1. Penemuan & Harmonisasi Terpadu</h3>
            <p class="text-[11.5px] text-[#5F6368] font-sans leading-relaxed">
              Mengintegrasikan data yang sebelumnya terpecah di berbagai dokumen PDF APBN, LKPP BPK RI, BRS BPS, dan SEKI Bank Indonesia menjadi struktur time series analitis berstandar nasional.
            </p>
          </div>

          <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-2">
            <div class="w-8 h-8 rounded bg-[#E6F4EA] text-[#1E8E3E] flex items-center justify-center font-bold text-sm">
              📑
            </div>
            <h3 class="text-xs font-mono font-bold text-[#202124] uppercase">2. Jejak Asal-Usul (Observation Provenance)</h3>
            <p class="text-[11.5px] text-[#5F6368] font-sans leading-relaxed">
              Setiap titik grafik dan baris data terhubung langsung ke institusi penerbit, judul publikasi resmi, tanggal rilis, nomor tabel, dan halaman sumber aslinya. Tidak ada angka tanpa sitasi.
            </p>
          </div>

          <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-2">
            <div class="w-8 h-8 rounded bg-[#FEF7E0] text-[#B06000] flex items-center justify-center font-bold text-sm">
              ⚖️
            </div>
            <h3 class="text-xs font-mono font-bold text-[#202124] uppercase">3. Tata Kelola & Lisensi Statutori</h3>
            <p class="text-[11.5px] text-[#5F6368] font-sans leading-relaxed">
              Menerapkan 8 status akses data statutori secara ketat di tingkat server, pembatasan unduh berizin, serta format ekspor Excel multi-sheet mandiri dengan kunci provenans (provenance key).
            </p>
          </div>
        </div>

        <!-- 4. RECENT STATUTORY PUBLICATIONS & DOCUMENT SERIES -->
        <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-3">
          <div class="flex items-center justify-between border-b border-[#DADCE0] pb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold uppercase text-[#202124] flex items-center gap-1.5">
                <span>📚</span>
                <span>PUBLIKASI RESMI TERBARU & SERI DOKUMEN APBN / LKPP / BRS</span>
              </span>
            </div>
            <span class="text-[10px] font-mono bg-[#F1F3F4] text-[#5F6368] px-2 py-0.5 rounded">
              Pembaruan Tgl 8, 17, 28
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div class="p-3 rounded border border-[#DADCE0] bg-[#F8F9FA] space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-[#1A73E8]">APBN KITA (Realisasi Bulanan APBN)</span>
                <span class="text-[10px] bg-[#E8F0FE] text-[#1A73E8] px-1.5 py-0.5 rounded">Bulanan</span>
              </div>
              <p class="text-[11px] text-[#3C4043] font-sans">
                Laporan pelaksanaan APBN berbasis kas dari Kementerian Keuangan RI. Menyajikan realisasi pendapatan pajak, bea cukai, PNBP, belanja K/L, dan pembiayaan anggaran.
              </p>
              <div class="text-[10px] text-[#5F6368]">Terbit: 15 Januari 2025 • Status: Realisasi Sementara</div>
            </div>

            <div class="p-3 rounded border border-[#DADCE0] bg-[#F8F9FA] space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-[#1E8E3E]">LKPP AUDITED BPK RI (Laporan Keuangan)</span>
                <span class="text-[10px] bg-[#E6F4EA] text-[#1E8E3E] px-1.5 py-0.5 rounded">Tahunan Audited</span>
              </div>
              <p class="text-[11px] text-[#3C4043] font-sans">
                Dokumen pertanggungjawaban APBN final yang diaudit oleh BPK RI. Mencakup LRA, Neraca, Laporan Arus Kas (LAK), dan Catatan atas Laporan Keuangan (CaLK).
              </p>
              <div class="text-[10px] text-[#5F6368]">Terbit: Juni 2024 • Status: Realisasi Final Audited</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners for navigation buttons
    document.getElementById('home-btn-explore-indicators')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('indicators');
    });
    document.getElementById('home-btn-explore-calendar')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('calendar');
    });
    document.getElementById('home-btn-explore-crosswalk')?.addEventListener('click', () => {
      if (this.options.onOpenCrosswalk) this.options.onOpenCrosswalk();
    });
  }
}
