// ==============================================================================
// HOME VIEW COMPONENT: INDONESIA ECONOMIC DATA OBSERVATORY
// Platform Overview, Macroeconomic Pulse, Headline Chart & Single Login Gateway
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { INDONESIA_ARCHIPELAGO_PATH } from '../data/map_asset.js';
import { MASTER_ADMIN_EMAIL, ALL_ADMIN_EMAILS, isAdminEmail, openEmailRegistrationModal } from './header.js';

export class HomeView {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.pulseData = null;
    this.rollingKpis = null;
    this.rollingKpisMeta = null;
  }

  async render() {
    if (!this.container) return;

    // Load 3-Day Rolling KPIs every time web is accessed
    if (!this.rollingKpis) {
      try {
        const res = await ApiClient.fetchRollingKPIs();
        this.rollingKpis = res.kpis || [];
        this.rollingKpisMeta = res;
      } catch (e) {
        console.warn('Gagal memuat rolling KPIs:', e);
      }
    }

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

    const isGuest = localStorage.getItem('app_guest_session') === 'true';
    const isAuthenticated = Boolean(isMasterAdmin || (registeredUser && registeredUser.email) || isGuest);
    const pendingToken = localStorage.getItem('master_admin_pending_token') || 'ADM-CONFIRM-29ED9B2739A8';

    if (!isAuthenticated) {
      this.renderLandingPage(pendingToken);
      this.bindLandingEvents();
      return;
    }

    this.renderAuthenticatedDashboard(isMasterAdmin, masterAdminSession, registeredUser, isGuest);
    this.bindDashboardEvents();
  }

  // ============================================================================
  // ROLLING 3-DAY UPDATE KPI SECTION (RADAR INDIKATOR HARIAN & PEKANAN)
  // ============================================================================
  renderRollingKPISection() {
    const defaultKpis = [
      {
        id: "bi_rate",
        title: "BI Rate Today",
        icon: "🏛️",
        period: "Posisi Hari Ini / RDG BI",
        value: "6.00%",
        unit: "%",
        movement_summary: "Tetap (0 bps) vs LM • -25 bps vs LY",
        status_badge: "🟢 Kondusif",
        status_verdict: "Kondusif",
        status_type: "good",
        situation_note: "Siklus pelonggaran moneter terukur; menjaga stabilitas nilai tukar Rupiah sekaligus mendorong ruang likuiditas perbankan.",
        source: "Bank Indonesia (Rapat Dewan Gubernur)"
      },
      {
        id: "inflasi",
        title: "Inflasi Agu 2026",
        icon: "📊",
        period: "Realisasi BPS Agu 2026",
        value: "2.12%",
        unit: "% YoY",
        movement_summary: "-0.03% MoM • -0.45% vs LY (2025: 2.57%)",
        status_badge: "🟢 Sangat Baik",
        status_verdict: "Sangat Baik",
        status_type: "good",
        situation_note: "Terkendali kuat dalam koridor sasaran 2.5% ± 1% Bank Indonesia. Pasokan pangan melimpah dan daya beli masyarakat terlindungi.",
        source: "Badan Pusat Statistik (BRS Inflasi Bulanan)"
      },
      {
        id: "ikk",
        title: "IKK (Keyakinan Konsumen)",
        icon: "🛍️",
        period: "Survei Konsumen BI",
        value: "123.8 Poin",
        unit: "Poin",
        movement_summary: "+1.2 poin vs LM • +2.1 poin vs LY",
        status_badge: "🟢 Zona Optimis",
        status_verdict: "Optimis",
        status_type: "good",
        situation_note: "Solid di atas ambang batas 100 (zona optimis). Ekspektasi masyarakat terhadap penghasilan dan ketersediaan lapangan kerja menguat.",
        source: "Bank Indonesia (Survei Konsumen)"
      },
      {
        id: "pmi_manufaktur",
        title: "PMI Manufaktur",
        icon: "🏭",
        period: "S&P Global Rilis Terakhir",
        value: "51.2 Poin",
        unit: "Poin",
        movement_summary: "+0.8 poin vs LM • Rebound vs LY (49.8)",
        status_badge: "🟢 Zona Ekspansi",
        status_verdict: "Ekspansif",
        status_type: "good",
        situation_note: "Bertahan konsisten di atas batas 50 (fase ekspansi). Pesanan baru domestik menguat dan utilisasi kapasitas pabrik meningkat.",
        source: "S&P Global Indonesia PMI"
      },
      {
        id: "rupiah",
        title: "Rupiah (USD/IDR)",
        icon: "💵",
        period: "JISDOR / Spot Hari Ini",
        value: "Rp 15.680",
        unit: "/ USD",
        movement_summary: "Menguat Rp 55 vs LM • +1.20% vs LY",
        status_badge: "🟢 Terkendali",
        status_verdict: "Terkendali",
        status_type: "good",
        situation_note: "Volatilitas rendah dan nilai tukar menguat; ditopang cadangan devisa kuat (USD 154,8 M) dan arus modal masuk portofolio SBN.",
        source: "Bank Indonesia (JISDOR) & Pasar Spot"
      },
      {
        id: "ihsg",
        title: "IHSG (Pasar Saham)",
        icon: "📈",
        period: "Bursa Efek Indonesia",
        value: "7.742 Poin",
        unit: "Poin",
        movement_summary: "+1.45% vs LM • +7.80% vs LY",
        status_badge: "🟢 Positif",
        status_verdict: "Positif",
        status_type: "good",
        situation_note: "Sentimen pasar modal kondusif dengan net foreign buy. Kinerja laba emiten perbankan dan infrastruktur menopang indeks.",
        source: "PT Bursa Efek Indonesia (IDX)"
      },
      {
        id: "emas_antam",
        title: "Emas Antam /gram",
        icon: "🪙",
        period: "Per 22 Sep 2026",
        value: "Rp 1.485.000",
        unit: "/ gram",
        movement_summary: "+Rp 12.000 vs LM • +28.5% vs LY",
        status_badge: "🟢 Safe Haven Kuat",
        status_verdict: "Kuat / Safe Haven",
        status_type: "good",
        situation_note: "Menguat searah harga emas spot global (XAU/USD). Berfungsi sebagai instrumen lindung nilai (hedging) aset ritel terpercaya.",
        source: "PT Aneka Tambang Tbk (Logam Mulia)"
      },
      {
        id: "emas_buyback",
        title: "Emas Buyback /gram",
        icon: "🔄",
        period: "Beli Kembali Antam",
        value: "Rp 1.332.000",
        unit: "/ gram",
        movement_summary: "+Rp 10.000 vs LM • +27.8% vs LY",
        status_badge: "🟢 Menarik",
        status_verdict: "Menarik",
        status_type: "good",
        situation_note: "Likuiditas penebusan buyback optimal dengan spread wajar (~10,3%), memberi potensi keuntungan menarik bagi investor berjangka.",
        source: "PT Aneka Tambang Tbk (Logam Mulia)"
      }
    ];

    const kpis = (this.rollingKpis && this.rollingKpis.length > 0) ? this.rollingKpis : defaultKpis;
    const noteText = this.rollingKpisMeta?.edition_note || "Angka kunci pekan ini · harga emas Antam mengacu rilis Logam Mulia 22 September 2026; harga 23 September belum dirilis saat edisi ini disusun.";

    return `
      <!-- SECTION: RADAR INDIKATOR HARIAN & HARGA PASAR (UPDATE SETIAP 3 HARI SEKALI) -->
      <div class="gov-card p-5 sm:p-6 bg-white border border-[#BCD0F7]/90 rounded-xl shadow-xs space-y-4">
        
        <!-- Header Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 font-mono">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded text-[10.5px] font-bold bg-[#EBF1FC] text-[#0038A8] border border-[#BCD0F7] flex items-center gap-1.5 shadow-2xs">
                <span>⚡</span>
                <span>RADAR INDIKATOR BERKALA · UPDATE 3 HARI SEKALI</span>
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Aktif Dipantau</span>
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                Pemerintah & Bursa Keuangan
              </span>
            </div>
            <h3 class="text-base sm:text-lg font-bold font-serif text-[#2C2420] tracking-tight">
              8 Indikator Kunci Pekanan & Harian Ekonomi Indonesia
            </h3>
            <p class="text-xs text-[#5D4037] font-sans">
              Metrik frekuensi tinggi resmi pemerintah dan bursa: suku bunga BI, inflasi, keyakinan konsumen, manufaktur, kurs rupiah, pasar saham, dan emas Antam.
            </p>
          </div>

          <!-- Rolling Badge Right -->
          <div class="sm:text-right shrink-0 font-mono text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-0.5">
            <div class="font-bold text-[#0038A8] flex sm:justify-end items-center gap-1">
              <span>🕒</span>
              <span>Siklus: 3 Hari Sekali</span>
            </div>
            <div class="text-[10px] text-slate-500">
              Pembaruan Awal Akses Web
            </div>
          </div>
        </div>

        <!-- 8 KPI Cards Grid (4x2 on desktop) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          ${kpis.map(k => `
            <div class="bg-white hover:bg-slate-50/70 border border-slate-200 hover:border-[#0038A8] rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-2.5 group">
              
              <!-- Card Top -->
              <div class="flex items-start justify-between gap-1.5">
                <div class="flex items-center gap-1.5">
                  <span class="text-base">${k.icon || '📌'}</span>
                  <div>
                    <div class="text-xs font-mono font-bold text-slate-900 group-hover:text-[#0038A8] transition-colors leading-tight">
                      ${k.title}
                    </div>
                    <div class="text-[9.5px] font-mono text-slate-500">${k.period}</div>
                  </div>
                </div>
                <span class="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ${k.status_verdict || 'Kondusif'}
                </span>
              </div>

              <!-- Card Value -->
              <div class="py-0.5 border-t border-slate-100 flex items-baseline justify-between">
                <div class="text-2xl font-mono font-black text-[#0038A8] tracking-tight">
                  ${k.value}
                </div>
                <div class="text-[10px] font-mono text-slate-500 font-medium">
                  ${k.unit}
                </div>
              </div>

              <!-- Info Pergerakan vs LY, vs LM / last status (Font Lebih Kecil) -->
              <div class="p-1.5 rounded bg-slate-50 border border-slate-200/80 font-mono text-[10px] text-slate-700 leading-tight space-y-0.5">
                <div class="text-slate-500 font-bold uppercase text-[9px] flex items-center gap-1">
                  <span>📊</span>
                  <span>Pergerakan:</span>
                </div>
                <div class="text-slate-900 font-semibold">
                  ${k.movement_summary || `${k.movement_vs_lm} • ${k.movement_vs_ly}`}
                </div>
              </div>

              <!-- Info Singkat Situasi Saat Ini Bagus/Tidak -->
              <div class="p-2 rounded-lg bg-amber-50/60 border border-amber-200/70 text-[10.5px] font-sans leading-relaxed text-slate-800 space-y-0.5">
                <div class="font-mono font-bold text-amber-950 text-[10px] flex items-center gap-1">
                  <span>${k.status_badge?.includes('🟢') ? '🟢' : '🔵'}</span>
                  <span>Situasi: ${k.status_verdict || 'Kondusif'}</span>
                </div>
                <p class="text-[10.5px] text-slate-700 leading-snug">
                  ${k.situation_note}
                </p>
              </div>

            </div>
          `).join('')}
        </div>

        <!-- Section Footnote Note (User Specified) -->
        <div class="p-3 bg-amber-50/70 border border-amber-200/90 rounded-lg text-xs font-mono text-amber-950 flex items-start gap-2 leading-relaxed">
          <span class="text-base shrink-0">💡</span>
          <div class="space-y-0.5">
            <div class="font-bold text-[11px] text-amber-900">
              Catatan Edisi Pekan Ini:
            </div>
            <p class="text-[11px] text-slate-800 font-sans">
              ${noteText}
            </p>
          </div>
        </div>

      </div>
    `;
  }

  // ============================================================================
  // 1. SINGLE UNIFIED GATEWAY LANDING PAGE (BEFORE LOGIN / UNAUTHENTICATED)
  // ============================================================================
  renderLandingPage(pendingToken) {
    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- A. WELCOME HERO SECTION -->
        <div class="bg-gradient-to-r from-[#0B2545] via-[#134074] to-[#0038A8] text-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#0B2545]/20 relative overflow-hidden">
          <div class="relative z-10 max-w-4xl space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-mono font-semibold tracking-wider text-amber-300">
              <span>🏛️</span>
              <span>PORTAL STATUTORI REPOSITORI DATA EKONOMI NASIONAL</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-serif font-black tracking-tight leading-tight">
              Observatorium & Basis Data Terpadu Perekonomian Indonesia
            </h1>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans max-w-3xl">
              Harmonisasi publikasi statistik resmi, indikator makroekonomi, komoditas pangan & energi, realisasi APBN, laporan keuangan negara (LKPP), serta time series lintas dekade bersumber langsung dari Kemenkeu RI, BPS, Bank Indonesia, BPK RI, dan Bapanas.
            </p>
            <div class="pt-1 flex items-center gap-3 text-[11px] font-mono text-slate-300 flex-wrap">
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Sistem Aktif Online</span>
              <span>•</span>
              <span>Realisasi Audited & BRS s/d Agustus 2026</span>
              <span>•</span>
              <span>Akses Terpadu Satu Pintu Masuk</span>
            </div>
          </div>
        </div>

        <!-- 3-DAY ROLLING UPDATE: 8 KEY GOVERNMENT & MARKET KPIS -->
        ${this.renderRollingKPISection()}

        <!-- B. GATEWAY TITLE & CALL TO ACTION -->
        <div class="text-center space-y-1.5 py-1">
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#0038A8] bg-[#EBF1FC] px-3.5 py-1 rounded-full border border-[#BCD0F7] inline-block">
            🔐 PINTU GERBANG AKSES MASUK TERPADU
          </span>
          <h2 class="text-xl sm:text-2xl font-serif font-bold text-[#2C2420]">
            Akses Masuk Repositori Data Ekonomi Nasional
          </h2>
          <p class="text-xs text-[#5D4037] max-w-xl mx-auto font-sans">
            Cukup masukkan alamat email Anda di bawah ini untuk membuka seluruh repositori data. Sistem otomatis menampilkan menu admin jika Anda menggunakan email Dewan Ekonomi Nasional.
          </p>
        </div>

        <!-- C. SINGLE UNIFIED ACCESS GATEWAY (1 GATEWAY FOR ALL) -->
        <div class="max-w-xl mx-auto w-full" id="landing-gateway-cards">
          <div class="bg-white rounded-xl shadow-md border-2 border-[#BCD0F7] p-6 sm:p-7 space-y-4">
            
            <form id="landing-unified-login-form" class="space-y-3.5 font-mono">
              
              <!-- 1. Email Input -->
              <div>
                <label class="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Alamat Email <span class="text-rose-600">*</span>
                </label>
                <input 
                  type="email" 
                  id="landing-unified-email" 
                  required 
                  placeholder="nama@instansi.go.id atau email admin..."
                  class="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#0038A8] focus:ring-2 focus:ring-[#BCD0F7]"
                  autofocus
                />
                <!-- Dynamic Role Hint -->
                <div id="landing-email-role-hint" class="mt-1.5 text-[10.5px] font-mono hidden"></div>
              </div>

              <!-- 2. Password Field (Dynamic: appears for admin email) -->
              <div id="landing-password-wrapper" class="space-y-1.5 hidden p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <label class="block text-xs font-mono font-bold text-amber-900">
                    Kata Sandi Master Admin <span class="text-rose-600">*</span>
                  </label>
                  <span class="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold font-mono">Khusus Otoritas</span>
                </div>
                <input 
                  type="password" 
                  id="landing-unified-password" 
                  placeholder="Masukkan kata sandi Master Admin..."
                  class="w-full px-3.5 py-2 text-xs font-mono border border-amber-300 rounded-lg bg-white focus:outline-none focus:border-[#0038A8]"
                />
                
                <!-- Toggle Setup Password with Token for Admin -->
                <div class="pt-1">
                  <button type="button" id="landing-btn-toggle-setup-pw" class="text-[10.5px] text-[#0038A8] hover:underline font-mono cursor-pointer">
                    <span id="landing-toggle-pw-text">Belum buat password? Masukkan token otoritas ▼</span>
                  </button>

                  <!-- Hidden Token Setup Form -->
                  <div id="landing-admin-setup-pw-wrapper" class="hidden mt-2 p-2.5 bg-white border border-amber-200 rounded space-y-2 text-xs font-mono">
                    <div class="text-[10px] font-bold text-amber-950">Aktivasi Kata Sandi Baru</div>
                    <input type="text" id="landing-admin-token-input" value="${pendingToken}" placeholder="Token konfirmasi..." class="w-full px-2.5 py-1.5 text-xs font-mono border border-amber-300 rounded bg-white" />
                    <div class="grid grid-cols-2 gap-2">
                      <input type="password" id="landing-admin-new-pw" placeholder="Sandi baru..." class="w-full px-2.5 py-1.5 text-xs font-mono border border-amber-300 rounded bg-white" />
                      <input type="password" id="landing-admin-confirm-pw" placeholder="Ulangi sandi..." class="w-full px-2.5 py-1.5 text-xs font-mono border border-amber-300 rounded bg-white" />
                    </div>
                    <div class="flex items-center gap-2 pt-1">
                      <button type="button" id="landing-btn-save-token-pw" class="flex-1 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded cursor-pointer text-[10.5px]">Simpan & Masuk</button>
                      <button type="button" id="landing-btn-request-token" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded cursor-pointer text-[10px]">Minta Token</button>
                    </div>
                    <div id="landing-admin-setup-msg" class="hidden text-[10.5px] p-1.5 rounded"></div>
                  </div>
                </div>
              </div>

              <!-- 3. Nama Lengkap & Instansi (Opsional) -->
              <div>
                <label class="block text-xs font-mono font-bold text-slate-700 mb-1">
                  Nama Lengkap & Instansi / Lembaga <span class="text-slate-400 font-normal lowercase">(opsional)</span>
                </label>
                <input 
                  type="text" 
                  id="landing-unified-name" 
                  placeholder="Contoh: Dr. Budi Santoso — Bappenas / Universitas"
                  class="w-full px-3.5 py-2 text-xs font-mono border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#0038A8]"
                />
              </div>

              <!-- Message container -->
              <div id="landing-unified-msg" class="hidden text-xs font-mono rounded-lg p-2.5"></div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                id="landing-btn-submit-unified"
                class="w-full py-2.5 px-4 bg-[#0038A8] hover:bg-[#002B82] text-white text-xs sm:text-sm font-mono font-bold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🚀</span>
                <span>Masuk ke Repositori</span>
                <span>→</span>
              </button>
            </form>

            <!-- Alternative: Guest Login -->
            <div class="pt-1">
              <div class="relative flex py-1 items-center">
                <div class="flex-grow border-t border-slate-200"></div>
                <span class="flex-shrink mx-3 text-[10px] font-mono text-slate-500 uppercase">atau tanpa email</span>
                <div class="flex-grow border-t border-slate-200"></div>
              </div>
              <button 
                type="button" 
                id="landing-btn-login-guest" 
                class="w-full py-2 px-3 rounded bg-white hover:bg-slate-100 border border-slate-300 text-[#2C2420] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>🌐</span>
                <span>Masuk Sebagai Tamu (Akses Publik Langsung)</span>
              </button>
            </div>

            <div class="pt-1 text-center text-[10.5px] font-mono text-slate-500">
              🔒 Halaman Master Admin hanya ditampilkan secara otomatis jika login menggunakan email resmi DEN RI.
            </div>

          </div>
        </div>

        <!-- D. MACROECONOMIC PULSE 5 KPI CARDS (PREVIEW) -->
        <div class="space-y-2 pt-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold uppercase text-[#2C2420] flex items-center gap-1.5">
              <span>📈</span>
              <span>Denyut Makroekonomi Nasional (Posisi Rilis s/d Agustus 2026)</span>
            </span>
            <span class="text-[10px] font-mono bg-white text-[#7D655C] border border-[#E5DACF] px-2 py-0.5 rounded">
              5 Indikator Pokok BPS & Bank Indonesia
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <!-- 1. PDB Growth -->
            <div class="bg-white p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs border border-[#E8DCCF]">
              <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Pertumbuhan PDB</div>
              <div class="text-xl font-mono font-bold text-[#3D7B5E]">5.20%</div>
              <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: +5.20% • QoQ: +3.79%</div>
              <div class="text-[10px] font-mono text-[#7D655C]">Kuartal II-2026 • BPS</div>
            </div>

            <!-- 2. Inflasi IHK -->
            <div class="bg-white p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs border border-[#E8DCCF]">
              <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Inflasi IHK</div>
              <div class="text-xl font-mono font-bold text-[#0038A8]">2.12%</div>
              <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: 2.12% • MoM: -0.03%</div>
              <div class="text-[10px] font-mono text-[#7D655C]">Agustus 2026 • Target BI: 2.5±1%</div>
            </div>

            <!-- 3. BI-Rate -->
            <div class="bg-white p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs border border-[#E8DCCF]">
              <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">BI-Rate (7-Day RR)</div>
              <div class="text-xl font-mono font-bold text-[#2C2420]">5.50%</div>
              <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: -50 bps • MoM: 0 bps (Tetap)</div>
              <div class="text-[10px] font-mono text-[#7D655C]">Posisi Akhir Agustus 2026 • RDG BI</div>
            </div>

            <!-- 4. Cadangan Devisa -->
            <div class="bg-white p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs border border-[#E8DCCF]">
              <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Cadangan Devisa</div>
              <div class="text-xl font-mono font-bold text-[#2C2420]">USD 154.8 M</div>
              <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: +4.25% • MoM: +0.65%</div>
              <div class="text-[10px] font-mono text-[#7D655C]">Posisi Akhir Agustus 2026 • 6.8 Bln Impor</div>
            </div>

            <!-- 5. Pendapatan APBN -->
            <div class="bg-white p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs border border-[#E8DCCF]">
              <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Pendapatan APBN 2026</div>
              <div class="text-xl font-mono font-bold text-[#3D7B5E]">Rp 2.132,0 T</div>
              <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">Realisasi 66,11% • On-Track (99,16%)</div>
              <div class="text-[10px] font-mono text-[#7D655C]">Akumulasi Jan – Agu 2026 • APBN KiTa</div>
            </div>
          </div>
        </div>

        <!-- E. PREVIEW OF AVAILABLE MODULES (LOCKED BEFORE LOGIN) -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold uppercase text-[#2C2420] flex items-center gap-1.5">
              <span>🔒</span>
              <span>MODUL DATA ANALITIK TERSEDIA (MASUKKAN EMAIL DI ATAS UNTUK MEMBUKA)</span>
            </span>
            <span class="text-[10px] font-mono text-[#0038A8] font-bold">10 Modul Siap Digunakan</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <!-- Locked Card 1 -->
            <div class="landing-locked-card p-4 rounded-lg bg-white border border-[#E8DCCF] hover:border-[#0038A8] space-y-2 cursor-pointer transition-all shadow-2xs group" data-module="Indikator Ekonomi">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-[#2C2420] group-hover:text-[#0038A8]">📊 Indikator Makro</span>
                <span class="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">🔒 Terkunci</span>
              </div>
              <p class="text-[11px] text-[#5D4037] font-sans leading-relaxed">
                Time series 1990–2026 PDB, inflasi komponen, ketenagakerjaan, dan moneter BI & Kemenkeu.
              </p>
              <div class="text-[10px] font-mono text-[#0038A8] font-semibold pt-1 flex items-center gap-1">
                <span>Klik untuk akses</span>
                <span>↑</span>
              </div>
            </div>

            <!-- Locked Card 2 -->
            <div class="landing-locked-card p-4 rounded-lg bg-white border border-[#E8DCCF] hover:border-[#0038A8] space-y-2 cursor-pointer transition-all shadow-2xs group" data-module="Pertanian & Peternakan">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-[#2C2420] group-hover:text-[#0038A8]">🌾 Pertanian & Hasil Bumi</span>
                <span class="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">🔒 Terkunci</span>
              </div>
              <p class="text-[11px] text-[#5D4037] font-sans leading-relaxed">
                Kalender musim tanam-panen komoditas pangan pokok, sentra produksi daerah, dan neraca pasokan.
              </p>
              <div class="text-[10px] font-mono text-[#0038A8] font-semibold pt-1 flex items-center gap-1">
                <span>Klik untuk akses</span>
                <span>↑</span>
              </div>
            </div>

            <!-- Locked Card 3 -->
            <div class="landing-locked-card p-4 rounded-lg bg-white border border-[#E8DCCF] hover:border-[#0038A8] space-y-2 cursor-pointer transition-all shadow-2xs group" data-module="Keuangan Negara">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-[#2C2420] group-hover:text-[#0038A8]">🏛️ LKPP Keuangan Negara</span>
                <span class="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">🔒 Terkunci</span>
              </div>
              <p class="text-[11px] text-[#5D4037] font-sans leading-relaxed">
                Realisasi APBN, pendapatan pajak, belanja K/L, transfer ke daerah, dan neraca LKPP audited BPK RI.
              </p>
              <div class="text-[10px] font-mono text-[#0038A8] font-semibold pt-1 flex items-center gap-1">
                <span>Klik untuk akses</span>
                <span>↑</span>
              </div>
            </div>

            <!-- Locked Card 4 -->
            <div class="landing-locked-card p-4 rounded-lg bg-white border border-[#E8DCCF] hover:border-[#0038A8] space-y-2 cursor-pointer transition-all shadow-2xs group" data-module="Data BPS">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-[#2C2420] group-hover:text-[#0038A8]">📋 Koneksi Data BPS</span>
                <span class="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">🔒 Terkunci</span>
              </div>
              <p class="text-[11px] text-[#5D4037] font-sans leading-relaxed">
                Integrasi Web API BPS resmi (3.200+ tabel statistik, ekspor-impor HS code, inflasi kota).
              </p>
              <div class="text-[10px] font-mono text-[#0038A8] font-semibold pt-1 flex items-center gap-1">
                <span>Klik untuk akses</span>
                <span>↑</span>
              </div>
            </div>

          </div>
        </div>

        <!-- F. PLATFORM CORE PILLARS -->
        <div class="py-6 border-t border-[#E8DCCF]/60">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div class="flex flex-col items-center text-center space-y-2 px-3">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-7 h-7 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12px] text-[#5D4037] font-sans leading-relaxed">
                Mengintegrasikan data yang sebelumnya terpecah di berbagai dokumen PDF APBN, LKPP BPK RI, BRS BPS, dan SEKI Bank Indonesia menjadi struktur time series analitis berstandar nasional.
              </p>
              <div class="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Penemuan & Harmonisasi Terpadu
              </div>
            </div>

            <div class="flex flex-col items-center text-center space-y-2 px-3">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-7 h-7 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12px] text-[#5D4037] font-sans leading-relaxed">
                Setiap titik grafik dan baris data terhubung langsung ke institusi penerbit, judul publikasi resmi, tanggal rilis, nomor tabel, dan halaman sumber aslinya. Tidak ada angka tanpa sitasi.
              </p>
              <div class="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Jejak Asal-Usul (Provenance)
              </div>
            </div>

            <div class="flex flex-col items-center text-center space-y-2 px-3">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-7 h-7 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12px] text-[#5D4037] font-sans leading-relaxed">
                Menerapkan status akses data statutori secara ketat di tingkat server, pembatasan unduh berizin, serta format ekspor Excel multi-sheet mandiri dengan kunci provenans statutori.
              </p>
              <div class="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Tata Kelola & Lisensi Statutori
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================================================
  // 2. BIND LANDING PAGE GATEWAY EVENTS (SINGLE GATEWAY LOGIC)
  // ============================================================================
  bindLandingEvents() {
    const emailInput = document.getElementById('landing-unified-email');
    const roleHint = document.getElementById('landing-email-role-hint');
    const pwWrapper = document.getElementById('landing-password-wrapper');
    const pwInput = document.getElementById('landing-unified-password');
    const msgDiv = document.getElementById('landing-unified-msg');
    const submitBtn = document.getElementById('landing-btn-submit-unified');

    // Dynamic role hint as user types email
    const checkEmailRole = () => {
      const val = emailInput?.value?.trim() || '';
      if (!val) {
        if (roleHint) roleHint.classList.add('hidden');
        if (pwWrapper) pwWrapper.classList.add('hidden');
        return;
      }
      if (isAdminEmail(val)) {
        if (roleHint) {
          roleHint.className = 'mt-1.5 p-2 bg-amber-50 border border-amber-300 text-amber-900 rounded text-[10.5px] font-mono font-semibold flex items-center gap-1.5';
          roleHint.innerHTML = '<span>👑</span><span>Email Master Admin (DEN RI) terdeteksi. Silakan masukkan kata sandi otoritas di bawah:</span>';
          roleHint.classList.remove('hidden');
        }
        if (pwWrapper) pwWrapper.classList.remove('hidden');
      } else {
        if (roleHint) {
          roleHint.className = 'mt-1.5 p-2 bg-teal-50 border border-teal-200 text-teal-900 rounded text-[10.5px] font-mono flex items-center gap-1.5';
          roleHint.innerHTML = '<span>👤</span><span>Email Pengguna / Peneliti Terdaftar. Halaman admin tidak akan tampil.</span>';
          roleHint.classList.remove('hidden');
        }
        if (pwWrapper) pwWrapper.classList.add('hidden');
      }
    };

    emailInput?.addEventListener('input', checkEmailRole);
    emailInput?.addEventListener('change', checkEmailRole);
    checkEmailRole();

    // Unified Form Submit
    document.getElementById('landing-unified-login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput?.value?.trim();
      const name = document.getElementById('landing-unified-name')?.value?.trim();
      const password = pwInput?.value;

      if (!email) return;

      if (isAdminEmail(email)) {
        // MASTER ADMIN LOGIN
        if (!password) {
          if (pwWrapper) pwWrapper.classList.remove('hidden');
          if (pwInput) pwInput.focus();
          if (msgDiv) {
            msgDiv.className = 'text-[11px] font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded p-2';
            msgDiv.textContent = 'Kata sandi diperlukan untuk akun Master Admin.';
            msgDiv.classList.remove('hidden');
          }
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>⏳</span><span>Memverifikasi Otoritas...</span>';
        }

        try {
          const res = await ApiClient.adminLogin(email, password);
          if (res.success) {
            const sessionPayload = {
              email: res.email || email,
              role: 'MASTER_ADMIN',
              token: res.token,
              logged_in_at: new Date().toISOString()
            };
            localStorage.setItem('master_admin_session', JSON.stringify(sessionPayload));
            localStorage.setItem('registered_researcher_access', JSON.stringify({
              email: sessionPayload.email,
              name: name || 'Tania Fatimah Lubis, S.E., M.P.P.',
              organization: 'Dewan Ekonomi Nasional (DEN RI)',
              purpose: 'Otoritas Tata Kelola & Evaluasi Kebijakan Fiskal',
              registered_at: new Date().toISOString(),
              registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
            }));
            localStorage.removeItem('app_guest_session');

            window.dispatchEvent(new CustomEvent('master-admin-login', { detail: sessionPayload }));
            window.dispatchEvent(new CustomEvent('auth-updated', { detail: sessionPayload }));

            if (msgDiv) {
              msgDiv.className = 'text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 rounded p-2';
              msgDiv.textContent = '✓ Login Master Admin berhasil! Membuka halaman admin...';
              msgDiv.classList.remove('hidden');
            }

            setTimeout(() => {
              if (this.options.onNavigate) {
                this.options.onNavigate('admin');
              } else {
                this.render();
              }
            }, 300);
          }
        } catch (err) {
          if (msgDiv) {
            msgDiv.className = 'text-[11px] font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded p-2';
            msgDiv.textContent = err.message || 'Login Master Admin gagal. Periksa kembali kata sandi Anda.';
            msgDiv.classList.remove('hidden');
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>🚀</span><span>Masuk ke Repositori</span><span>→</span>';
          }
        }
      } else {
        // NORMAL USER LOGIN (PAGE ADMIN TIDAK AKAN TAMPIL)
        localStorage.removeItem('master_admin_session');
        localStorage.removeItem('app_guest_session');

        const payload = {
          email: email,
          name: name || 'Peneliti Terdaftar',
          organization: name || 'Institusi Riset / Pengguna',
          purpose: 'Analisis Kebijakan & Riset Data Sekunder',
          registered_at: new Date().toISOString(),
          registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
        };

        localStorage.setItem('registered_researcher_access', JSON.stringify(payload));
        window.dispatchEvent(new CustomEvent('auth-updated', { detail: payload }));

        if (msgDiv) {
          msgDiv.className = 'text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2';
          msgDiv.textContent = `✓ Selamat datang, ${payload.name}! Membuka repositori...`;
          msgDiv.classList.remove('hidden');
        }

        setTimeout(() => {
          this.render();
        }, 300);
      }
    });

    // Guest login direct
    document.getElementById('landing-btn-login-guest')?.addEventListener('click', () => {
      localStorage.removeItem('master_admin_session');
      localStorage.removeItem('registered_researcher_access');
      localStorage.setItem('app_guest_session', 'true');
      window.dispatchEvent(new CustomEvent('auth-updated'));
      this.render();
    });

    // Toggle setup pw for admin
    const btnToggleSetup = document.getElementById('landing-btn-toggle-setup-pw');
    const setupWrapper = document.getElementById('landing-admin-setup-pw-wrapper');
    const toggleText = document.getElementById('landing-toggle-pw-text');
    btnToggleSetup?.addEventListener('click', () => {
      if (!setupWrapper) return;
      const isHidden = setupWrapper.classList.contains('hidden');
      if (isHidden) {
        setupWrapper.classList.remove('hidden');
        if (toggleText) toggleText.textContent = 'Tutup Formulir Sandi Baru ▲';
      } else {
        setupWrapper.classList.add('hidden');
        if (toggleText) toggleText.textContent = 'Belum buat password? Masukkan token otoritas ▼';
      }
    });

    // Save token password for admin
    document.getElementById('landing-btn-save-token-pw')?.addEventListener('click', async () => {
      const token = document.getElementById('landing-admin-token-input')?.value?.trim();
      const newPw = document.getElementById('landing-admin-new-pw')?.value;
      const confirmPw = document.getElementById('landing-admin-confirm-pw')?.value;
      const targetEmail = emailInput?.value?.trim() || MASTER_ADMIN_EMAIL;
      const msgDiv = document.getElementById('landing-admin-setup-msg');

      if (!msgDiv) return;
      if (newPw !== confirmPw) {
        msgDiv.className = 'text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded p-1';
        msgDiv.textContent = 'Konfirmasi kata sandi tidak cocok.';
        msgDiv.classList.remove('hidden');
        return;
      }

      try {
        const res = await ApiClient.setAdminPassword(token, newPw, targetEmail);
        if (res.success) {
          msgDiv.className = 'text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-1';
          msgDiv.textContent = '✓ Sandi berhasil disimpan! Masuk otomatis...';
          msgDiv.classList.remove('hidden');

          if (pwInput) pwInput.value = newPw;
          document.getElementById('landing-unified-login-form')?.requestSubmit();
        }
      } catch (err) {
        msgDiv.className = 'text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded p-1';
        msgDiv.textContent = err.message || 'Gagal menyimpan sandi.';
        msgDiv.classList.remove('hidden');
      }
    });

    // Request new token
    document.getElementById('landing-btn-request-token')?.addEventListener('click', async () => {
      const targetEmail = emailInput?.value?.trim() || MASTER_ADMIN_EMAIL;
      const msgDiv = document.getElementById('landing-admin-setup-msg');
      try {
        const res = await ApiClient.sendAdminConfirmation(targetEmail);
        if (res.success) {
          const tokenInput = document.getElementById('landing-admin-token-input');
          if (tokenInput) tokenInput.value = res.token;
          if (msgDiv) {
            msgDiv.className = 'text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-1';
            msgDiv.textContent = `✓ Token baru (${res.token}) telah diisikan.`;
            msgDiv.classList.remove('hidden');
          }
        }
      } catch (err) {
        if (msgDiv) {
          msgDiv.className = 'text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded p-1';
          msgDiv.textContent = err.message || 'Gagal menerbitkan token.';
          msgDiv.classList.remove('hidden');
        }
      }
    });

    // Locked Card Clicks
    document.querySelectorAll('.landing-locked-card').forEach(card => {
      card.addEventListener('click', () => {
        const moduleName = card.getAttribute('data-module') || 'Modul Data';
        if (window.__govApp) {
          window.__govApp.showLoginRequiredPrompt(moduleName);
        } else {
          const gatewayEl = document.getElementById('landing-gateway-cards');
          if (gatewayEl) {
            gatewayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            gatewayEl.classList.add('ring-4', 'ring-[#0038A8]', 'ring-offset-2');
            setTimeout(() => {
              gatewayEl.classList.remove('ring-4', 'ring-[#0038A8]', 'ring-offset-2');
            }, 1500);
            setTimeout(() => {
              document.getElementById('landing-unified-email')?.focus();
            }, 350);
          }
          this.showToast(`🔒 Akses Dibatasi: Segera Login untuk membuka modul ${moduleName}`);
        }
      });
    });
  }

  // ============================================================================
  // 3. AUTHENTICATED DASHBOARD VIEW (AFTER LOGIN)
  // ============================================================================
  renderAuthenticatedDashboard(isMasterAdmin, masterAdminSession, registeredUser, isGuest) {
    this.container.innerHTML = `
      <div class="space-y-6">
        <!-- 1. ACTIVE SESSION EXECUTIVE BANNER -->
        ${isMasterAdmin ? `
          <!-- Active Master Admin Executive Banner -->
          <div class="bg-[#FDF8F5] rounded-lg p-4 sm:p-5 shadow-2xs font-mono space-y-3 border border-[#E8DCCF]" id="home-auth-section">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  👑
                </div>
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#8C4710]">Sesi Otoritas Master Admin Aktif</span>
                    <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">● Terotentikasi</span>
                    <span class="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">Dewan Ekonomi Nasional</span>
                  </div>
                  <div class="text-sm sm:text-base font-bold text-[#2C2420]">${masterAdminSession?.email || MASTER_ADMIN_EMAIL}</div>
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
                <button id="home-btn-logout-session" class="px-3 py-2 bg-white hover:bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold rounded shadow-2xs transition-all cursor-pointer" title="Keluar dari sesi Master Admin">
                  <span>Keluar Sesi</span>
                </button>
              </div>
            </div>
          </div>
        ` : (registeredUser && registeredUser.email) ? `
          <!-- Active Researcher / User Executive Banner -->
          <div class="bg-[#F0F7F6] rounded-lg p-4 sm:p-5 shadow-2xs font-mono space-y-3 border border-[#D8E5E5]" id="home-auth-section">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  👤
                </div>
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#006874]">Sesi Pengguna Terdaftar Aktif</span>
                    <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">● Terverifikasi</span>
                    <span class="text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded font-bold">Akses Statutori Penuh</span>
                  </div>
                  <div class="text-sm sm:text-base font-bold text-[#2C2420]">${registeredUser.name || 'Peneliti'} (${registeredUser.email})</div>
                  <div class="text-[11.5px] text-[#5D4037] font-sans">
                    Hak Akses: Seluruh modul analitik, data LKPP, RAPBN vs Realisasi APBN, BPS, dan kuota unduh format Excel (.xlsx) / CSV resmi. Halaman admin tidak ditampilkan.
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2 w-full md:w-auto shrink-0 flex-wrap">
                <button id="home-btn-open-researcher-reg" class="px-3.5 py-2 bg-white hover:bg-slate-50 border border-[#C8B6A6] text-[#2C2420] text-xs font-semibold rounded shadow-2xs transition-all cursor-pointer">
                  <span>⚙️ Profil Akses</span>
                </button>
                <button id="home-btn-logout-session" class="px-3 py-2 bg-white hover:bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold rounded shadow-2xs transition-all cursor-pointer" title="Keluar dari sesi Pengguna">
                  <span>Keluar Sesi</span>
                </button>
              </div>
            </div>
          </div>
        ` : `
          <!-- Active Guest Session Banner -->
          <div class="bg-[#F2F8F4] rounded-lg p-4 sm:p-5 shadow-2xs font-mono space-y-3 border border-[#C7E3D0]" id="home-auth-section">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  🌐
                </div>
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold uppercase tracking-wider text-[#137333]">Sesi Tamu Aktif (Akses Eksplorasi Publik)</span>
                    <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">● Mode Tamu Terbuka</span>
                  </div>
                  <div class="text-sm sm:text-base font-bold text-[#2C2420]">Pengunjung Publik / Peninjau Data</div>
                  <div class="text-[11.5px] text-[#5D4037] font-sans">
                    Seluruh modul data dan dasbor analitik telah terbuka. Ingin kuota unduh tak terbatas atau akses tata kelola? Silakan masuk dengan email terdaftar.
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2 w-full md:w-auto shrink-0 flex-wrap">
                <button id="home-btn-switch-account" class="px-3.5 py-2 bg-[#0038A8] hover:bg-[#002B82] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5 transition-all cursor-pointer">
                  <span>🔑 Login dengan Email</span>
                </button>
                <button id="home-btn-logout-session" class="px-3 py-2 bg-white hover:bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold rounded shadow-2xs transition-all cursor-pointer" title="Keluar dari sesi Tamu">
                  <span>Keluar Sesi</span>
                </button>
              </div>
            </div>
          </div>
        `}

        <!-- 3-DAY ROLLING UPDATE: 8 KEY GOVERNMENT & MARKET KPIS -->
        ${this.renderRollingKPISection()}

        <!-- 2. MACROECONOMIC PULSE 5 KPI CARDS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" id="home-pulse-cards">
          <!-- 1. PDB Growth -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors border border-[#E8DCCF]/60">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Pertumbuhan PDB</div>
            <div class="text-xl font-mono font-bold text-[#3D7B5E]">5.20%</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: +5.20% • QoQ: +3.79%</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Kuartal II-2026 (1 Apr – 30 Jun) • BPS</div>
          </div>

          <!-- 2. Inflasi IHK -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors border border-[#E8DCCF]/60">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Inflasi IHK</div>
            <div class="text-xl font-mono font-bold text-[#0038A8]">2.12%</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: 2.12% • MoM: -0.03%</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Agustus 2026 • Target BI: 2.5±1%</div>
          </div>

          <!-- 3. BI-Rate -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors border border-[#E8DCCF]/60">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">BI-Rate (7-Day RR)</div>
            <div class="text-xl font-mono font-bold text-[#2C2420]">5.50%</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: -50 bps • MoM: 0 bps (Tetap)</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Posisi Akhir Agustus 2026 • RDG BI</div>
          </div>

          <!-- 4. Cadangan Devisa -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors border border-[#E8DCCF]/60">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Cadangan Devisa</div>
            <div class="text-xl font-mono font-bold text-[#2C2420]">USD 154.8 M</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">YoY: +4.25% • MoM: +0.65%</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Posisi Akhir Agustus 2026 • 6.8 Bln Impor</div>
          </div>

          <!-- 5. Pendapatan APBN -->
          <div class="bg-white hover:bg-[#F8F9FA] p-3.5 rounded-lg space-y-1 text-center flex flex-col items-center justify-center shadow-2xs transition-colors border border-[#E8DCCF]/60">
            <div class="text-[10.5px] font-mono text-[#7D655C] uppercase tracking-wider">Pendapatan APBN 2026</div>
            <div class="text-xl font-mono font-bold text-[#3D7B5E]">Rp 2.132,0 T</div>
            <div class="text-[10.5px] font-mono font-bold text-[#5D4037]">Realisasi 66,11% • On-Track (99,16%)</div>
            <div class="text-[10px] font-mono text-[#7D655C]">Akumulasi Jan – Agu 2026 • APBN KiTa</div>
          </div>
        </div>

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
                    <svg class="w-6 h-6 stroke-current fill-none stroke-[1.75]" viewBox="0 0 24 24">
                      <circle cx="7.5" cy="7.5" r="5" fill="currentColor" fill-opacity="0.12" stroke-width="1.2" />
                      <text x="4.3" y="9.8" font-family="'Tahoma', Geneva, Verdana, sans-serif" font-size="6.2" font-weight="900" fill="currentColor" stroke="none">Rp</text>
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

        <!-- 4. PLATFORM CORE PILLARS -->
        <div class="py-6 border-t border-[#E8DCCF]/60">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div class="flex flex-col items-center text-center space-y-2 px-3">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-7 h-7 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12px] text-[#5D4037] font-sans leading-relaxed">
                Mengintegrasikan data yang sebelumnya terpecah di berbagai dokumen PDF APBN, LKPP BPK RI, BRS BPS, dan SEKI Bank Indonesia menjadi struktur time series analitis berstandar nasional.
              </p>
              <div class="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Penemuan & Harmonisasi Terpadu
              </div>
            </div>

            <div class="flex flex-col items-center text-center space-y-2 px-3">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-7 h-7 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12px] text-[#5D4037] font-sans leading-relaxed">
                Setiap titik grafik dan baris data terhubung langsung ke institusi penerbit, judul publikasi resmi, tanggal rilis, nomor tabel, dan halaman sumber aslinya. Tidak ada angka tanpa sitasi.
              </p>
              <div class="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Jejak Asal-Usul (Provenance)
              </div>
            </div>

            <div class="flex flex-col items-center text-center space-y-2 px-3">
              <div class="text-[#0038A8] flex items-center justify-center">
                <svg class="w-7 h-7 fill-current opacity-85" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p class="text-[12px] text-[#5D4037] font-sans leading-relaxed">
                Menerapkan status akses data statutori secara ketat di tingkat server, pembatasan unduh berizin, serta format ekspor Excel multi-sheet mandiri dengan kunci provenans statutori.
              </p>
              <div class="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Tata Kelola & Lisensi Statutori
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================================================
  // 4. BIND AUTHENTICATED DASHBOARD EVENTS
  // ============================================================================
  bindDashboardEvents() {
    // Navigation cards
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

    // Executive Banner Action Buttons
    document.getElementById('home-btn-goto-admin')?.addEventListener('click', () => {
      if (this.options.onNavigate) this.options.onNavigate('admin');
    });

    document.getElementById('home-btn-open-researcher-reg')?.addEventListener('click', () => {
      openEmailRegistrationModal(() => {
        this.render();
      }, null);
    });

    document.getElementById('home-btn-switch-account')?.addEventListener('click', () => {
      localStorage.removeItem('app_guest_session');
      window.dispatchEvent(new CustomEvent('auth-updated'));
      this.render();
    });

    document.getElementById('home-btn-logout-session')?.addEventListener('click', () => {
      if (confirm('Apakah Anda ingin keluar dari sesi ini dan kembali ke Halaman Pintu Masuk?')) {
        localStorage.removeItem('master_admin_session');
        localStorage.removeItem('registered_researcher_access');
        localStorage.removeItem('app_guest_session');
        window.dispatchEvent(new CustomEvent('master-admin-logout'));
        window.dispatchEvent(new CustomEvent('auth-updated'));
        this.render();
      }
    });
  }

  // ============================================================================
  // 5. HELPER: TOAST NOTIFICATION
  // ============================================================================
  showToast(message) {
    let toast = document.getElementById('home-toast-popup');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'home-toast-popup';
      toast.className = 'fixed bottom-5 right-5 z-50 max-w-sm bg-[#2C2420] text-white p-3.5 rounded-lg shadow-xl border border-amber-400 font-mono text-xs flex items-center gap-2.5 transition-all duration-300';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div class="text-base">🔔</div>
      <div class="flex-1 font-sans text-xs">${message}</div>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white font-bold ml-1 cursor-pointer">✕</button>
    `;
    setTimeout(() => {
      if (toast && toast.parentElement) {
        toast.remove();
      }
    }, 4000);
  }
}
