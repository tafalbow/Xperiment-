// ==============================================================================
// HOME VIEW COMPONENT: INDONESIA ECONOMIC DATA OBSERVATORY
// Platform Overview, Macroeconomic Pulse, Headline Chart & Quick Discovery
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { INDONESIA_ARCHIPELAGO_PATH } from '../data/map_asset.js';
import { MASTER_ADMIN_EMAIL, ALL_ADMIN_EMAILS, openEmailRegistrationModal } from './header.js';

export class HomeView {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.pulseData = null;
  }

  async render() {
    if (!this.container) return;

    // Check existing researcher & master admin sessions
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

    const isMasterAdmin = Boolean(
      masterAdminSession && 
      ALL_ADMIN_EMAILS.map(e => e.toLowerCase()).includes(masterAdminSession.email?.toLowerCase())
    );

    const pendingToken = localStorage.getItem('master_admin_pending_token') || 'ADM-CONFIRM-29ED9B2739A8';

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

        <!-- 2. ACCESS & AUTHENTICATION GATEWAY (FRONTPAGE LOGIN & OTORITAS) -->
        ${isMasterAdmin ? `
          <!-- Active Master Admin Executive Banner -->
          <div class="bg-[#FDF8F5] border border-[#F0D5BE] rounded-lg p-4 sm:p-5 shadow-2xs font-mono space-y-3" id="home-auth-section">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  👑
                </div>
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#8C4710]">Sesi Otoritas Master Admin Aktif</span>
                    <span class="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold">● Terotentikasi</span>
                    <span class="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-bold">Dewan Ekonomi Nasional</span>
                  </div>
                  <div class="text-sm sm:text-base font-bold text-[#2C2420]">${masterAdminSession.email}</div>
                  <div class="text-[11.5px] text-[#5D4037] font-sans">
                    Hak Akses Penuh: Konsol Ingestion Pipeline, Audit Trail Statutori, Pemantauan Web Traffic, dan Bypass Kuota Unduh Tak Terbatas.
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2 w-full md:w-auto shrink-0 flex-wrap">
                <button id="home-btn-goto-admin" class="px-4 py-2 bg-[#0038A8] hover:bg-[#002B82] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5 transition-all cursor-pointer">
                  <span>🚀 Buka Konsol Master Admin</span>
                  <span>→</span>
                </button>
                <button id="home-btn-admin-logout" class="px-3 py-2 bg-white hover:bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold rounded shadow-2xs transition-all cursor-pointer" title="Keluar dari sesi Master Admin">
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </div>
        ` : `
          <!-- Frontpage Login & Access Module -->
          <div class="bg-white border border-[#E5DACF] rounded-lg p-4 sm:p-5 shadow-2xs font-mono space-y-3.5" id="home-auth-section">
            <div class="flex items-center justify-between border-b border-[#E5DACF] pb-2.5 flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <span class="text-base">🔐</span>
                <span class="text-xs font-bold uppercase tracking-wider text-[#2C2420]">
                  Akses Masuk & Login Repositori Data Ekonomi Nasional
                </span>
              </div>
              <div class="text-[10px] text-[#7D655C] bg-[#FAF7F2] border border-[#E5DACF] px-2.5 py-0.5 rounded font-medium">
                Otoritas Dewan Ekonomi Nasional & Peneliti Terdaftar
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <!-- Col 1: Master Admin Quick Login & Password Setup (Span 7) -->
              <div class="lg:col-span-7 bg-[#FAF7F2] border border-[#E5DACF] rounded-lg p-4 space-y-3">
                <div class="flex items-center justify-between border-b border-[#E5DACF] pb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">👑</span>
                    <div>
                      <h3 class="text-xs font-bold uppercase tracking-wider text-[#2C2420]">Login Otoritas Master Admin</h3>
                      <p class="text-[10.5px] text-[#7D655C] font-sans">Dewan Ekonomi Nasional • Tata Kelola Penuh</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                    DEN RI
                  </span>
                </div>

                <!-- Quick Login Form -->
                <form id="home-form-admin-login" class="space-y-2.5">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label class="block text-[10px] font-bold uppercase text-[#5D4037] mb-1">Email Master Admin</label>
                      <input 
                        type="email" 
                        id="home-admin-login-email" 
                        required 
                        class="w-full text-xs font-mono px-2.5 py-1.5 rounded border border-[#C8B6A6] bg-white text-[#2C2420] focus:border-[#0038A8] focus:ring-1 focus:ring-[#0038A8] outline-none" 
                        value="${MASTER_ADMIN_EMAIL}" 
                      />
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold uppercase text-[#5D4037] mb-1">Kata Sandi</label>
                      <input 
                        type="password" 
                        id="home-admin-login-password" 
                        required 
                        placeholder="Masukkan kata sandi..." 
                        class="w-full text-xs font-mono px-2.5 py-1.5 rounded border border-[#C8B6A6] bg-white text-[#2C2420] focus:border-[#0038A8] focus:ring-1 focus:ring-[#0038A8] outline-none" 
                      />
                    </div>
                  </div>

                  <div id="home-admin-login-error" class="hidden text-[11px] text-rose-700 bg-rose-50 border border-rose-200 rounded p-2"></div>
                  <div id="home-admin-login-success" class="hidden text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2"></div>

                  <div class="flex items-center justify-between flex-wrap gap-2 pt-1">
                    <button 
                      type="button" 
                      id="home-btn-toggle-setup-pw" 
                      class="text-[11px] text-[#0038A8] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>🔑</span>
                      <span id="home-toggle-pw-text">Belum buat password? Buat Sandi & Masukkan Token</span>
                    </button>

                    <button 
                      type="submit" 
                      id="home-btn-submit-login" 
                      class="px-4 py-1.5 bg-[#0038A8] hover:bg-[#002B82] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>🔐</span>
                      <span>Masuk Master Admin</span>
                    </button>
                  </div>
                </form>

                <!-- Expandable Setup Password Form with Token -->
                <div id="home-admin-setup-pw-wrapper" class="hidden border-t border-[#E5DACF] pt-3 mt-2 space-y-2.5">
                  <div class="bg-amber-50 border border-amber-200 rounded p-2.5 text-[10.5px] font-sans text-amber-950 leading-relaxed">
                    <strong>Aktivasi Kata Sandi Baru Master Admin:</strong><br>
                    Gunakan token konfirmasi resmi yang telah diterbitkan untuk menetapkan kata sandi akun Anda.
                  </div>

                  <form id="home-form-admin-setup-pw" class="space-y-2.5 font-mono text-xs">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label class="block text-[10px] font-bold text-[#5D4037] mb-1">Token Konfirmasi</label>
                        <input 
                          type="text" 
                          id="home-admin-token-input" 
                          required 
                          placeholder="ADM-CONFIRM-XXXX" 
                          value="${pendingToken}"
                          class="w-full text-xs font-mono px-2 py-1 rounded border border-[#C8B6A6] bg-white uppercase font-bold text-[#2C2420]" 
                        />
                      </div>
                      <div>
                        <label class="block text-[10px] font-bold text-[#5D4037] mb-1">Kata Sandi Baru</label>
                        <input 
                          type="password" 
                          id="home-admin-new-pw" 
                          required 
                          minlength="6" 
                          placeholder="Min. 6 karakter" 
                          class="w-full text-xs font-mono px-2 py-1 rounded border border-[#C8B6A6] bg-white" 
                        />
                      </div>
                      <div>
                        <label class="block text-[10px] font-bold text-[#5D4037] mb-1">Ulangi Sandi</label>
                        <input 
                          type="password" 
                          id="home-admin-confirm-pw" 
                          required 
                          minlength="6" 
                          placeholder="Konfirmasi sandi" 
                          class="w-full text-xs font-mono px-2 py-1 rounded border border-[#C8B6A6] bg-white" 
                        />
                      </div>
                    </div>

                    <div id="home-admin-setup-msg" class="hidden text-[11px] rounded p-2"></div>

                    <div class="flex items-center justify-between flex-wrap gap-2 pt-1">
                      <button 
                        type="button" 
                        id="home-btn-request-token" 
                        class="text-[10.5px] text-[#5D4037] hover:text-[#0038A8] underline cursor-pointer"
                      >
                        ✉️ Terbitkan / Kirim Ulang Token Resmi
                      </button>
                      <button 
                        type="submit" 
                        class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded shadow-xs cursor-pointer transition-all"
                      >
                        ✓ Simpan Kata Sandi & Konfirmasi
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Col 2: Researcher & Analyst Access (Span 5) -->
              <div class="lg:col-span-5 bg-[#FAF7F2] border border-[#E5DACF] rounded-lg p-4 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between border-b border-[#E5DACF] pb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-lg">👤</span>
                      <div>
                        <h3 class="text-xs font-bold uppercase tracking-wider text-[#2C2420]">Akses Peneliti & Analis</h3>
                        <p class="text-[10.5px] text-[#7D655C] font-sans">Kementerian/Lembaga, Universitas & Peneliti</p>
                      </div>
                    </div>
                    <span class="text-[10px] font-bold text-slate-700 bg-white border border-[#E5DACF] px-2 py-0.5 rounded">
                      Statutori
                    </span>
                  </div>

                  <p class="text-xs text-[#5D4037] font-sans leading-relaxed">
                    ${registeredUser ? `
                      Sesi terdaftar aktif: <strong>${registeredUser.email}</strong> (${registeredUser.name || 'Peneliti'}). Seluruh hak unduh format Excel (.xlsx) dan CSV data statutori telah terbuka.
                    ` : `
                      Repositori ini menerapkan tata kelola akses terbatas (<em>restricted</em>). Daftarkan email institusi Anda untuk membuka kuota unduhan matriks LKPP, APBN, BPS, dan data komoditas pangan.
                    `}
                  </p>
                </div>

                <div class="pt-2 border-t border-[#E5DACF] flex items-center justify-between flex-wrap gap-2">
                  <div class="text-[10.5px] text-[#7D655C]">
                    ${registeredUser ? '🟢 Status: <strong>Akses Aktif</strong>' : '⚪ Status: <strong>Tamu (Belum Terdaftar)</strong>'}
                  </div>
                  <button 
                    id="home-btn-open-researcher-reg" 
                    type="button" 
                    class="px-3.5 py-1.5 bg-white hover:bg-[#F0F7F6] border border-[#C8B6A6] text-[#2C2420] hover:text-[#0038A8] text-xs font-bold rounded shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>${registeredUser ? '⚙️ Perbarui Profil Akses' : '👤 Buka Formulir Akses'}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `}

        <!-- 3. EXPLORATION & DATA SERVICES STRIP (OCEAN TEAL #4E878C) -->
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

    // Event listeners for Frontpage Login & Access Module
    document.getElementById('home-btn-goto-admin')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('admin');
    });

    document.getElementById('home-btn-admin-logout')?.addEventListener('click', () => {
      if (confirm('Apakah Anda ingin keluar dari akun Master Admin?')) {
        localStorage.removeItem('master_admin_session');
        window.dispatchEvent(new CustomEvent('master-admin-logout'));
        window.dispatchEvent(new CustomEvent('auth-updated'));
        this.render();
      }
    });

    // Toggle setup password form
    const btnToggleSetup = document.getElementById('home-btn-toggle-setup-pw');
    const setupWrapper = document.getElementById('home-admin-setup-pw-wrapper');
    const toggleText = document.getElementById('home-toggle-pw-text');
    btnToggleSetup?.addEventListener('click', () => {
      if (!setupWrapper) return;
      const isHidden = setupWrapper.classList.contains('hidden');
      if (isHidden) {
        setupWrapper.classList.remove('hidden');
        if (toggleText) toggleText.textContent = 'Tutup Formulir Buat Sandi ▲';
      } else {
        setupWrapper.classList.add('hidden');
        if (toggleText) toggleText.textContent = 'Belum buat password? Buat Sandi & Masukkan Token';
      }
    });

    // Frontpage Master Admin login submission
    const formLogin = document.getElementById('home-form-admin-login');
    formLogin?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('home-admin-login-email')?.value?.trim();
      const password = document.getElementById('home-admin-login-password')?.value;
      const errorDiv = document.getElementById('home-admin-login-error');
      const successDiv = document.getElementById('home-admin-login-success');
      const submitBtn = document.getElementById('home-btn-submit-login');

      if (errorDiv) errorDiv.classList.add('hidden');
      if (successDiv) successDiv.classList.add('hidden');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳</span><span>Memverifikasi...</span>';
      }

      try {
        const res = await ApiClient.adminLogin(email, password);
        if (res.success) {
          const sessionPayload = {
            email: res.email || MASTER_ADMIN_EMAIL,
            role: 'MASTER_ADMIN',
            token: res.token,
            logged_in_at: new Date().toISOString()
          };
          localStorage.setItem('master_admin_session', JSON.stringify(sessionPayload));
          localStorage.setItem('registered_researcher_access', JSON.stringify({
            email: sessionPayload.email,
            name: 'Tania Fatimah Lubis, S.E., M.P.P.',
            purpose: 'Otoritas Tata Kelola & Evaluasi Kebijakan Fiskal',
            registered_at: new Date().toISOString(),
            registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
          }));

          window.dispatchEvent(new CustomEvent('master-admin-login', { detail: sessionPayload }));
          window.dispatchEvent(new CustomEvent('auth-updated', { detail: sessionPayload }));

          if (successDiv) {
            successDiv.textContent = '✓ Login Master Admin berhasil! Membuka panel kontrol...';
            successDiv.classList.remove('hidden');
          }

          setTimeout(() => {
            if (this.options.onNavigate) {
              this.options.onNavigate('admin');
            } else {
              this.render();
            }
          }, 400);
        }
      } catch (err) {
        if (errorDiv) {
          errorDiv.textContent = err.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.';
          errorDiv.classList.remove('hidden');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>🔐</span><span>Masuk Master Admin</span>';
        }
      }
    });

    // Frontpage Master Admin password creation & token verification
    const formSetup = document.getElementById('home-form-admin-setup-pw');
    formSetup?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const token = document.getElementById('home-admin-token-input')?.value?.trim();
      const newPw = document.getElementById('home-admin-new-pw')?.value;
      const confirmPw = document.getElementById('home-admin-confirm-pw')?.value;
      const targetEmail = document.getElementById('home-admin-login-email')?.value?.trim() || MASTER_ADMIN_EMAIL;
      const msgDiv = document.getElementById('home-admin-setup-msg');

      if (!msgDiv) return;

      if (newPw !== confirmPw) {
        msgDiv.className = 'text-[11px] text-rose-700 bg-rose-50 border border-rose-200 rounded p-2';
        msgDiv.textContent = 'Konfirmasi kata sandi tidak cocok. Silakan periksa kembali.';
        msgDiv.classList.remove('hidden');
        return;
      }

      try {
        const res = await ApiClient.setAdminPassword(token, newPw, targetEmail);
        if (res.success) {
          msgDiv.className = 'text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2';
          msgDiv.textContent = '✓ Kata sandi Master Admin berhasil dibuat & dikonfirmasi! Sedang masuk otomatis...';
          msgDiv.classList.remove('hidden');

          // Auto-login immediately
          const loginRes = await ApiClient.adminLogin(targetEmail, newPw);
          if (loginRes.success) {
            const sessionPayload = {
              email: loginRes.email || targetEmail,
              role: 'MASTER_ADMIN',
              token: loginRes.token,
              logged_in_at: new Date().toISOString()
            };
            localStorage.setItem('master_admin_session', JSON.stringify(sessionPayload));
            localStorage.setItem('registered_researcher_access', JSON.stringify({
              email: sessionPayload.email,
              name: 'Tania Fatimah Lubis, S.E., M.P.P.',
              purpose: 'Otoritas Tata Kelola & Evaluasi Kebijakan Fiskal',
              registered_at: new Date().toISOString(),
              registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
            }));

            window.dispatchEvent(new CustomEvent('master-admin-login', { detail: sessionPayload }));
            window.dispatchEvent(new CustomEvent('auth-updated', { detail: sessionPayload }));

            setTimeout(() => {
              if (this.options.onNavigate) {
                this.options.onNavigate('admin');
              } else {
                this.render();
              }
            }, 500);
          }
        }
      } catch (err) {
        msgDiv.className = 'text-[11px] text-rose-700 bg-rose-50 border border-rose-200 rounded p-2';
        msgDiv.textContent = err.message || 'Gagal menyimpan kata sandi. Periksa token Anda.';
        msgDiv.classList.remove('hidden');
      }
    });

    // Request new token button
    document.getElementById('home-btn-request-token')?.addEventListener('click', async () => {
      const targetEmail = document.getElementById('home-admin-login-email')?.value?.trim() || MASTER_ADMIN_EMAIL;
      const msgDiv = document.getElementById('home-admin-setup-msg');
      try {
        const res = await ApiClient.sendAdminConfirmation(targetEmail);
        if (res.success) {
          const tokenInput = document.getElementById('home-admin-token-input');
          if (tokenInput) tokenInput.value = res.token;
          localStorage.setItem('master_admin_pending_token', res.token);
          if (msgDiv) {
            msgDiv.className = 'text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2';
            msgDiv.textContent = `✓ Token baru (${res.token}) telah diterbitkan dan otomatis diisikan ke kolom token.`;
            msgDiv.classList.remove('hidden');
          }
        }
      } catch (err) {
        if (msgDiv) {
          msgDiv.className = 'text-[11px] text-rose-700 bg-rose-50 border border-rose-200 rounded p-2';
          msgDiv.textContent = err.message || 'Gagal menerbitkan token.';
          msgDiv.classList.remove('hidden');
        }
      }
    });

    // Open researcher registration modal
    document.getElementById('home-btn-open-researcher-reg')?.addEventListener('click', () => {
      openEmailRegistrationModal(() => {
        this.render();
      }, null, 'researcher');
    });
  }
}
