// ==============================================================================
// HOME VIEW COMPONENT: INDONESIA ECONOMIC DATA OBSERVATORY
// Platform Overview, Macroeconomic Pulse, Headline Chart & Quick Discovery
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { INDONESIA_ARCHIPELAGO_PATH } from '../data/map_asset.js';

export class HomeView {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.pulseData = null;
  }

  async render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- 1. MACROECONOMIC PULSE 5 KPI CARDS (TOP STRIP - SEAMLESS BORDERLESS) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" id="home-pulse-cards">
          <!-- 1. PDB Growth -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Pertumbuhan PDB</div>
            <div class="text-xl font-mono font-bold text-[#3D7B5E]">5.05%</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: +5.05% • QoQ: +0.72%</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Kuartal IV-2024 (1 Okt – 31 Des) • BPS</div>
          </div>

          <!-- 2. Inflasi IHK -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Inflasi IHK</div>
            <div class="text-xl font-mono font-bold text-[#0038A8]">1.55%</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: 1.55% • MoM: +0.28%</div>
            <div class="text-[10px] font-mono text-[#7D655C]">1 – 31 Jan 2025 • Target BI: 2.5±1%</div>
          </div>

          <!-- 3. BI-Rate -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">BI-Rate (7-Day RR)</div>
            <div class="text-xl font-mono font-bold text-[#2C2420]">6.00%</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: 0 bps (Tetap) • MoM: 0 bps</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Posisi 1 – 31 Jan 2025 • RDG BI</div>
          </div>

          <!-- 4. Cadangan Devisa -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Cadangan Devisa</div>
            <div class="text-xl font-mono font-bold text-[#2C2420]">USD 150.2 M</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: +3.52% • MoM: +0.20%</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Posisi Akhir 31 Jan 2025 • 6.5 Bln Impor</div>
          </div>

          <!-- 5. Pendapatan APBN -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Pendapatan APBN 2024</div>
            <div class="text-xl font-mono font-bold text-[#3D7B5E]">Rp 3.028 T</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: +9.16% • MoM: +12.4%</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Akumulasi 1 Jan – 31 Des 2024 (100.8%)</div>
          </div>
        </div>

        <!-- 2. EXPLORATION & DATA SERVICES STRIP (OCEAN TEAL #4E878C) -->
        <div class="bg-[#4E878C] rounded-lg shadow-2xs overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
            
            <!-- Left Column: Brand Statement & Access -->
            <div class="lg:col-span-3 p-5 sm:p-6 flex flex-col justify-between bg-[#4E878C]">
              <div class="space-y-2">
                <h2 class="text-2xl font-serif font-bold text-white tracking-tight leading-snug">
                  Layanan Data
                </h2>
                <p class="text-[10px] font-mono uppercase tracking-widest text-white/80 font-bold">
                  OBSERVATORIUM RESMI STATUTORI
                </p>
                <p class="text-xs text-white/90 font-sans leading-relaxed pt-1">
                  Kompilasi dan harmonisasi publikasi statistik resmi ekonomi, pangan, fiskal, dan moneter Indonesia.
                </p>
              </div>

              <div class="pt-5">
                <button id="home-btn-explore-guide" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/40 hover:border-white bg-white hover:bg-[#F0F7F6] text-[#244E51] text-[11px] font-mono font-bold tracking-wide transition-all shadow-2xs cursor-pointer">
                  <span>Panduan & Metadata</span>
                  <span>↗</span>
                </button>
              </div>
            </div>

            <!-- Right Columns: 4 Flat Interactive Cards -->
            <div class="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20 bg-[#4E878C]">
              
              <!-- 1. Indikator Makro -->
              <div id="home-card-indicators" class="p-5 flex flex-col items-center text-center justify-between cursor-pointer group hover:bg-white/10 transition-all duration-150">
                <div class="flex flex-col items-center space-y-3 w-full">
                  <div class="w-12 h-12 rounded-full bg-white border border-white/40 flex items-center justify-center text-[#4E878C] group-hover:text-[#244E51] group-hover:scale-105 transition-all shadow-2xs">
                    <!-- Icon Peta Kepulauan Indonesia (Authentic High-Detail Archipelago Vector) -->
                    <svg class="w-[38px] fill-current transition-transform duration-150 group-hover:scale-105" viewBox="0 0 1000 368">
                      <path d="${INDONESIA_ARCHIPELAGO_PATH}" />
                    </svg>
                  </div>
                  <div class="space-y-1">
                    <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-white group-hover:text-[#E0EFEF] transition-colors">
                      Indikator Makro
                    </h3>
                    <p class="text-[11px] text-white/90 font-sans leading-relaxed">
                      Publikasi makroekonomi, PDB, inflasi, ketenagakerjaan, dan sektor moneter BPS, BI, Kemenkeu.
                    </p>
                  </div>
                </div>
                <div class="pt-4 text-[10.5px] font-mono font-bold text-[#D8F0EC] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>Buka Modul</span>
                  <span>→</span>
                </div>
              </div>

              <!-- 2. Pertanian & Hasil Bumi -->
              <div id="home-card-agri" class="p-5 flex flex-col items-center text-center justify-between cursor-pointer group hover:bg-white/10 transition-all duration-150">
                <div class="flex flex-col items-center space-y-3 w-full">
                  <div class="w-12 h-12 rounded-full bg-white border border-white/40 flex items-center justify-center text-[#4E878C] group-hover:text-[#244E51] group-hover:scale-105 transition-all shadow-2xs">
                    <!-- Icon Pucuk Daun (Tender Leaf Sprout / Seedling) -->
                    <svg class="w-6 h-6 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
                      <path d="M6 21H18" stroke-linecap="round" />
                      <path d="M12 21V7" stroke-linecap="round" />
                      <path d="M12 13C15.5 13 18.5 11 19.5 6.5C15.5 5.5 13 7.5 12 9" fill="currentColor" fill-opacity="0.2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 10C8.5 10 5.5 8 4.5 3.5C8.5 2.5 11 4.5 12 6" fill="currentColor" fill-opacity="0.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div class="space-y-1">
                    <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-white group-hover:text-[#E0EFEF] transition-colors">
                      Pertanian & Hasil Bumi
                    </h3>
                    <p class="text-[11px] text-white/90 font-sans leading-relaxed">
                      Kalender musim tanam & panen komoditas pangan, sentra produksi, dan pergerakan harga pasar.
                    </p>
                  </div>
                </div>
                <div class="pt-4 text-[10.5px] font-mono font-bold text-[#D8F0EC] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>Buka Modul</span>
                  <span>→</span>
                </div>
              </div>

              <!-- 3. Trend Keuangan Negara -->
              <div id="home-card-lkpp" class="p-5 flex flex-col items-center text-center justify-between cursor-pointer group hover:bg-white/10 transition-all duration-150">
                <div class="flex flex-col items-center space-y-3 w-full">
                  <div class="w-12 h-12 rounded-full bg-white border border-white/40 flex items-center justify-center text-[#4E878C] group-hover:text-[#244E51] group-hover:scale-105 transition-all shadow-2xs">
                    <!-- Icon Panah Chart Ke Atas & Logo Rupiah (Rp) -->
                    <svg class="w-6 h-6 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
                      <!-- Coin badge with Rupiah Logo -->
                      <circle cx="7.5" cy="7.5" r="5" fill="currentColor" fill-opacity="0.12" stroke-width="1.2" />
                      <text x="4.3" y="9.8" font-family="'JetBrains Mono', 'Segoe UI', sans-serif" font-size="6.2" font-weight="900" fill="currentColor" stroke="none">Rp</text>
                      <!-- Upward Trending Chart Arrow -->
                      <path d="M2.5 20.5L8 15L12.5 18L21.5 8" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M16 8H21.5V13.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div class="space-y-1">
                    <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-white group-hover:text-[#E0EFEF] transition-colors">
                      Trend Keuangan Negara
                    </h3>
                    <p class="text-[11px] text-white/90 font-sans leading-relaxed">
                      Realisasi APBN, pendapatan, belanja K/L, transfer daerah, dan neraca LKPP lintas era 1990–2026.
                    </p>
                  </div>
                </div>
                <div class="pt-4 text-[10.5px] font-mono font-bold text-[#D8F0EC] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>Buka Modul</span>
                  <span>→</span>
                </div>
              </div>

              <!-- 4. Data Mingguan Lembaga -->
              <div id="home-card-weekly" class="p-5 flex flex-col items-center text-center justify-between cursor-pointer group hover:bg-white/10 transition-all duration-150">
                <div class="flex flex-col items-center space-y-3 w-full">
                  <div class="w-12 h-12 rounded-full bg-white border border-white/40 flex items-center justify-center text-[#4E878C] group-hover:text-[#244E51] group-hover:scale-105 transition-all shadow-2xs">
                    <!-- Icon Kalender (Weekly Frequency Calendar) -->
                    <svg class="w-6 h-6 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"></rect>
                      <line x1="16" y1="2" x2="16" y2="6" stroke-linecap="round"></line>
                      <line x1="8" y1="2" x2="8" y2="6" stroke-linecap="round"></line>
                      <line x1="3" y1="10" x2="21" y2="10" stroke-linecap="round"></line>
                      <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none"></circle>
                      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none"></circle>
                      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none"></circle>
                      <circle cx="8" cy="17.5" r="1" fill="currentColor" stroke="none"></circle>
                      <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none"></circle>
                      <circle cx="16" cy="17.5" r="1" fill="currentColor" stroke="none"></circle>
                    </svg>
                  </div>
                  <div class="space-y-1">
                    <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-white group-hover:text-[#E0EFEF] transition-colors">
                      Data Mingguan Lembaga
                    </h3>
                    <p class="text-[11px] text-white/90 font-sans leading-relaxed">
                      Pemantauan berkala harga komoditas strategis, inflasi mingguan, dan survei antar-lembaga.
                    </p>
                  </div>
                </div>
                <div class="pt-4 text-[10.5px] font-mono font-bold text-[#D8F0EC] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>Buka Modul</span>
                  <span>→</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- 3. PLATFORM CORE PILLARS (EDITORIAL SEAMLESS QUOTE STRIP - POSISI 1 DI CAPTURE) -->
        <div class="py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            <!-- Pillar 1 -->
            <div class="flex flex-col items-center text-center space-y-3 px-4">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-8 h-8 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12.5px] text-[#5D4037] font-sans leading-relaxed max-w-sm mx-auto">
                Mengintegrasikan data yang sebelumnya terpecah di berbagai dokumen PDF APBN, LKPP BPK RI, BRS BPS, dan SEKI Bank Indonesia menjadi struktur time series analitis berstandar nasional.
              </p>
              <div class="pt-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Penemuan & Harmonisasi Terpadu
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="flex flex-col items-center text-center space-y-3 px-4 pt-6 md:pt-0">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-8 h-8 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12.5px] text-[#5D4037] font-sans leading-relaxed max-w-sm mx-auto">
                Setiap titik grafik dan baris data terhubung langsung ke institusi penerbit, judul publikasi resmi, tanggal rilis, nomor tabel, dan halaman sumber aslinya. Tidak ada angka tanpa sitasi.
              </p>
              <div class="pt-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Jejak Asal-Usul (Observation Provenance)
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="flex flex-col items-center text-center space-y-3 px-4 pt-6 md:pt-0">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-8 h-8 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12.5px] text-[#5D4037] font-sans leading-relaxed max-w-sm mx-auto">
                Menerapkan 8 status akses data statutori secara ketat di tingkat server, pembatasan unduh berizin, serta format ekspor Excel multi-sheet mandiri dengan kunci provenans (provenance key).
              </p>
              <div class="pt-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Tata Kelola & Lisensi Statutori
              </div>
            </div>

          </div>
        </div>

        <!-- 4. RECENT STATUTORY PUBLICATIONS & DOCUMENT SERIES (SEAMLESS LAYOUT - POSISI 2 DI CAPTURE) -->
        <div class="space-y-3 pt-1">
          <div class="flex items-center justify-between pb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold uppercase text-[#2C2420] flex items-center gap-1.5">
                <span>📚</span>
                <span>PUBLIKASI RESMI TERBARU & SERI DOKUMEN APBN / LKPP / BRS</span>
              </span>
            </div>
            <span class="text-[10px] font-mono bg-white text-[#7D655C] border border-[#E5DACF] px-2 py-0.5 rounded">
              Pembaruan Tgl 8, 17, 28 Bulanan
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <!-- 1. APBN KITA (MINT GREEN #B8D8BA) -->
            <div class="p-4 rounded-lg bg-[#B8D8BA] space-y-2 transition-all shadow-2xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-[#1B4D3E] text-[13px]">APBN KITA (Realisasi Bulanan APBN)</span>
                <span class="text-[10px] bg-white/90 text-[#1B4D3E] px-2 py-0.5 rounded font-bold shadow-2xs">Bulanan</span>
              </div>
              <p class="text-[11.5px] text-[#1F2937] font-sans leading-relaxed font-medium">
                Laporan pelaksanaan APBN berbasis kas dari Kementerian Keuangan RI. Menyajikan realisasi pendapatan pajak, bea cukai, PNBP, belanja K/L, dan pembiayaan anggaran.
              </p>
              <div class="pt-1 text-[10px] text-[#2E4F42] font-medium">Terbit: 15 Januari 2025 • Status: Realisasi Sementara</div>
            </div>

            <!-- 2. LKPP AUDITED BPK RI (MINT GREEN #B8D8BA) -->
            <div class="p-4 rounded-lg bg-[#B8D8BA] space-y-2 transition-all shadow-2xs flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-[#1B4D3E] text-[13px]">LKPP AUDITED BPK RI (Laporan Keuangan)</span>
                  <span class="text-[10px] bg-white/90 text-[#1B4D3E] px-2 py-0.5 rounded font-bold shadow-2xs">Tahunan Audited</span>
                </div>
                <p class="text-[11.5px] text-[#1F2937] font-sans leading-relaxed font-medium">
                  Dokumen pertanggungjawaban APBN final yang diaudit oleh BPK RI. Mencakup LRA, Neraca, Laporan Arus Kas (LAK), dan Catatan atas Laporan Keuangan (CaLK).
                </p>
              </div>
              <div class="pt-2 flex items-center justify-between border-t border-[#9FC5A1]">
                <div class="text-[10px] text-[#2E4F42] font-medium">Terbit: Juni 2024 • Status: Realisasi Final Audited</div>
                <button id="home-btn-lkpp-card" class="px-3 py-1 text-[11px] font-mono rounded bg-[#1B4D3E] hover:bg-[#123B2E] text-white font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs">
                  <span>🏛️ Buka Matriks LKPP</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners for horizontal navigation cards & guide
    document.getElementById('home-btn-explore-guide')?.addEventListener('click', () => {
      if (this.options.onOpenDictionary) {
        this.options.onOpenDictionary();
      } else if (this.options.onNavigate) {
        this.options.onNavigate('about');
      }
    });
    document.getElementById('home-card-indicators')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('analytics');
    });
    document.getElementById('home-card-agri')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('agri');
    });
    document.getElementById('home-card-lkpp')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('lkpp');
    });
    document.getElementById('home-card-weekly')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('weekly');
    });
    document.getElementById('home-btn-lkpp-card')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('lkpp');
    });
  }
}
