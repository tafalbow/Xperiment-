import { ModalManager } from './modals.js';
import { ApiClient } from '../services/api_client.js';

export const MASTER_ADMIN_EMAIL = 'taniafatimahlubis@gmail.com';
export const SOLE_ADMIN_EMAIL = 'taniafatimahlubis@gmail.com'; // Backward compatibility
export const ALL_ADMIN_EMAILS = [
  'taniafatimahlubis@gmail.com',
  'lubistaniafatimah@gmail.com',
  'lubis.tania@dewanekonomi.go.id'
];

export function isAdminEmail(email) {
  if (!email) return false;
  return ALL_ADMIN_EMAILS.map(e => e.trim().toLowerCase()).includes(email.trim().toLowerCase());
}

export function renderHeader(containerId, { onOpenDictionary, onOpenRegistry, onOpenCrosswalk, onOpenIngestion }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Retrieve existing registered email & timestamp from localStorage
  let registeredUser = null;
  try {
    const raw = localStorage.getItem('registered_researcher_access');
    if (raw) registeredUser = JSON.parse(raw);
  } catch (e) {}

  // Retrieve master admin session
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

  // Retrieve saved collapse state for fix drop down header (default: expanded / visible)
  const isDropdownHidden = localStorage.getItem('indoekonomi_fix_dropdown_hidden') === 'true';

  container.innerHTML = `
    <!-- 1. @FIXHEADER: TOP ACTION NAVIGATION TOOLBAR (STICKY TOP) -->
    <header id="fixheader" class="bg-[#F5EBE1] px-[7px] py-2 flex items-center justify-between flex-wrap gap-2 select-none border-b border-[#E8DCCF]/80">
      <!-- Website Monogram Logo Icon + Status Line + Fix Drop Down Toggle Button -->
      <div class="flex items-center gap-2.5 flex-wrap">
        <a href="#" class="flex items-center group cursor-pointer" title="INDOEKONOMI data" aria-label="INDOEKONOMI data">
          <img src="/static/assets/logo.png" alt="INDOEKONOMI Logo" class="h-7 w-7 sm:h-8 sm:w-8 object-contain">
        </a>
        <div class="flex items-center gap-2 flex-wrap text-[11px] font-mono uppercase tracking-widest text-[#5D4037] font-bold">
          <span>Kompilasi Data Indonesia</span>
          <span>•</span>
          <span class="inline-flex items-center gap-1.5 text-[#1B4D3E] normal-case font-bold">
            <span class="inline-block w-2 h-2 rounded-full bg-[#1B4D3E] animate-pulse"></span>
            <span>Status: Online</span>
          </span>
        </div>

        <!-- FIX DROP DOWN HEADER TOGGLE BUTTON WITH STATE ICON (▲ = Dropped / ▼ = Hidden) -->
        <button 
          id="btn-toggle-fix-dropdown" 
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#BCD0F7] bg-white text-[#0038A8] hover:bg-[#EBF1FC] hover:border-[#0038A8] text-[11px] font-mono font-bold shadow-2xs cursor-pointer transition-all ml-1 group"
          title="${isDropdownHidden ? 'Buka Header Observatorium (Scroll Down)' : 'Tutup Header Observatorium (Scroll Up)'}"
          aria-expanded="${!isDropdownHidden}"
          aria-controls="fix-dropdown-header"
        >
          <span id="label-toggle-fix-dropdown">${isDropdownHidden ? 'Buka Header (Scroll Down)' : 'Tutup Header (Scroll Up)'}</span>
          <span id="icon-toggle-fix-dropdown" class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#EBF1FC] text-[#0038A8] text-[10px] font-bold transition-transform duration-200 group-hover:scale-110">
            ${isDropdownHidden ? '▼' : '▲'}
          </span>
        </button>
      </div>

      <!-- Action Navigation Buttons -->
      <div class="flex items-center gap-2 flex-wrap ml-auto">
        <button id="btn-header-crosswalk-doc" class="gov-btn text-xs font-medium bg-white text-[#0038A8] hover:bg-[#FAF7F2]">
          <span>ℹ️</span>
          <span>Riwayat Klasifikasi APBN</span>
        </button>

        <button id="btn-header-dict" class="gov-btn text-xs font-medium bg-white text-[#2C2420] hover:bg-[#FAF7F2]">
          <svg class="w-3.5 h-3.5 text-[#2C2420]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          <span>Kamus Metadata</span>
        </button>

        <button id="btn-header-registry" class="gov-btn text-xs font-medium bg-white text-[#2C2420] hover:bg-[#FAF7F2]">
          <svg class="w-3.5 h-3.5 text-[#2C2420]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <span>Source Registry</span>
        </button>

        <button id="btn-header-crosswalk" class="gov-btn text-xs font-medium bg-white text-[#2C2420] hover:bg-[#FAF7F2]">
          <svg class="w-3.5 h-3.5 text-[#2C2420]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
          <span>Crosswalk</span>
        </button>

        <!-- Direct Login / Admin Access Button in Top Toolbar -->
        ${isMasterAdmin ? `
          <div class="flex items-center gap-1.5">
            <button id="btn-header-login-quick" class="gov-btn text-xs font-bold bg-[#FDF3E9] text-[#8C4710] hover:bg-[#FBE8D5] border border-[#F0D5BE] shadow-xs flex items-center gap-1.5 cursor-pointer" title="Sesi Master Admin Aktif: ${masterAdminSession.email}">
              <span>👑</span>
              <span class="truncate max-w-[130px]">Master Admin</span>
            </button>
            <button id="btn-header-logout-quick" class="px-2 py-1 text-[11px] font-mono rounded bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold cursor-pointer shadow-2xs transition-all" title="Keluar dari akun">
              Keluar
            </button>
          </div>
        ` : (registeredUser && registeredUser.email) ? `
          <div class="flex items-center gap-1.5">
            <button id="btn-header-login-quick" class="gov-btn text-xs font-bold bg-[#F0F7F6] text-[#006874] hover:bg-[#E0EFEF] border border-[#B8D8D8] shadow-xs flex items-center gap-1.5 cursor-pointer" title="Sesi Peneliti: ${registeredUser.email}">
              <span>👤</span>
              <span class="truncate max-w-[130px]">${registeredUser.name || registeredUser.email}</span>
            </button>
            <button id="btn-header-logout-quick" class="px-2 py-1 text-[11px] font-mono rounded bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold cursor-pointer shadow-2xs transition-all" title="Keluar dari akun">
              Keluar
            </button>
          </div>
        ` : isGuest ? `
          <div class="flex items-center gap-1.5">
            <button id="btn-header-login-quick" class="gov-btn text-xs font-bold bg-[#EBF1FC] text-[#0038A8] hover:bg-[#DCE7F9] border border-[#BCD0F7] shadow-xs flex items-center gap-1.5 cursor-pointer" title="Mode Tamu Terbuka">
              <span>🌐</span>
              <span>Tamu (Publik)</span>
            </button>
            <button id="btn-header-logout-quick" class="px-2 py-1 text-[11px] font-mono rounded bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold cursor-pointer shadow-2xs transition-all" title="Keluar / Ganti Akun">
              Keluar
            </button>
          </div>
        ` : `
          <button id="btn-header-login-quick" class="gov-btn text-xs font-bold bg-[#0038A8] text-white hover:bg-[#002B82] shadow-xs flex items-center gap-1.5 cursor-pointer" title="Masuk / Login (Admin, Pengguna, atau Tamu)">
            <span>🔐</span>
            <span>Masuk / Login</span>
          </button>
        `}
      </div>
    </header>

    <!-- 2. FIX DROP DOWN HEADER: OBSERVATORIUM STATUTORI & TATA KELOLA REPOSITORI (SOFT BEIGE #F5EBE1) -->
    <div id="fix-dropdown-header" class="${isDropdownHidden ? 'is-hidden' : 'is-open'}">
      <section class="bg-[#F5EBE1] px-3.5 py-2 font-mono" aria-label="Observatorium Statutori & Tata Kelola Repositori">
        <div class="w-full">
          <!-- 4-Column Grid with compact vertical footprint -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-5 items-start">
            
            <!-- Col 1: Brand, Misi Data & Catatan Verifikasi (Span 5) -->
            <div class="lg:col-span-5 space-y-1.5">
              <div class="flex items-center gap-2.5">
                <!-- Website Monogram Logo Icon -->
                <a href="#" class="flex items-center shrink-0 group cursor-pointer" title="INDOEKONOMI data" aria-label="INDOEKONOMI data">
                  <img src="/static/assets/logo.png" alt="INDOEKONOMI Logo" class="h-9 w-9 sm:h-10 sm:w-10 object-contain">
                </a>
                <div class="px-2.5 py-0.5 rounded bg-white shadow-2xs inline-flex items-center">
                  <span class="text-sm sm:text-base font-mono font-black text-[#0038A8] tracking-wider uppercase">
                    INDOEKONOMI.DATA.GO.ID
                  </span>
                </div>
              </div>
              <p class="text-[11px] text-[#5D4037] font-sans leading-[1.4] text-justify">
                Website ini dibangun untuk meningkatkan akses publik terhadap data pemerintah guna analisis kebijakan dan kebutuhan publik. <strong>DEN-Data</strong> menghimpun dan mengompilasi data sekunder resmi dari kementerian dan lembaga pemerintah dengan mencantumkan sumber rujukan demi menjamin keterlacakan dan verifikasi.
              </p>
              <div class="px-2 py-1 rounded bg-[#EFE3D5] text-[10px] text-[#6D4C41] font-sans leading-tight border-l-2 border-[#0038A8]">
                <span class="font-bold text-[#2C2420]">Catatan Verifikasi:</span> Data disajikan dari hasil kompilasi sumber resmi. Kendati akurasi diupayakan maksimal, potensi kekeliruan teknis tetap dimungkinkan; pengguna disarankan merujuk sumber asli yang tercantum untuk keperluan formal.
              </div>
            </div>

            <!-- Col 2: Otoritas Sumber Data (Span 2) -->
            <div class="lg:col-span-2 space-y-1">
              <h4 class="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Otoritas Sumber Data
              </h4>
              <ul class="text-[11px] text-[#5D4037] font-sans space-y-0.5 font-medium">
                <li><a href="https://kemenkeu.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1"><span>Kemenkeu RI</span></a></li>
                <li><a href="https://bps.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1"><span>BPS</span></a></li>
                <li><a href="https://bi.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1"><span>Bank Indonesia</span></a></li>
                <li><a href="https://bpk.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1"><span>BPK RI</span></a></li>
                <li><a href="https://satudata.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1"><span>Satu Data Indonesia</span></a></li>
              </ul>
            </div>

            <!-- Col 3: Tata Kelola & Batasan Akses (Span 2) -->
            <div class="lg:col-span-2 space-y-1">
              <h4 class="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Tata Kelola & Batasan
              </h4>
              <p class="text-[11px] text-[#5D4037] font-sans leading-[1.4]">
                Akses dibatasi (<em>restricted</em>) untuk analisis kebijakan publik, perumusan regulasi, dan riset resmi terdaftar dengan kewajiban sitasi resmi.
              </p>
              <p class="text-[10px] text-[#8D6E63] font-sans font-medium leading-tight">
                ⚠️ Dilarang menyalin atau mendistribusikan ulang massal tanpa izin tertulis.
              </p>
            </div>

            <!-- Col 4: Layanan Akses Data (Span 3) -->
            <div class="lg:col-span-3 space-y-1.5 flex flex-col justify-between">
              <div class="space-y-1">
                <h4 class="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                  Layanan Akses Data
                </h4>
                <p class="text-[11px] text-[#5D4037] font-sans leading-[1.4]">
                  Pembaruan berkala tgl 8, 17, & 28 setiap bulan. Validasi 100% data riil audited BPK & BRS BPS resmi.
                </p>
                <div class="flex items-center gap-1.5 text-[10.5px] text-[#7D655C]">
                  <span>🕒 Terakhir Diperbarui: <strong class="text-[#2C2420]">28 Januari 2025</strong></span>
                </div>
              </div>
            </div>

          </div>

          <!-- Bottom Bar Info (Tanpa garis bidang dan tanpa tombol penutup dalam) -->
          <div class="mt-2 pt-1 flex items-center gap-2 text-[10.5px] font-mono text-[#7D655C]">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#0038A8]"></span>
            <span class="font-sans">Observatorium Statutori & Tata Kelola Repositori Data Nasional (Dewan Ekonomi Nasional)</span>
          </div>
        </div>
      </section>
    </div>
  `;

  // Fix Drop Down Header Toggle Logic & Listeners
  const dropdownSection = document.getElementById('fix-dropdown-header');
  const toggleBtn = document.getElementById('btn-toggle-fix-dropdown');
  const labelToggle = document.getElementById('label-toggle-fix-dropdown');
  const iconToggle = document.getElementById('icon-toggle-fix-dropdown');

  function updateDropdownUI(hidden) {
    if (!dropdownSection) return;
    if (hidden) {
      dropdownSection.classList.remove('is-open');
      dropdownSection.classList.add('is-hidden');
      
      // Top toolbar button
      if (labelToggle) labelToggle.textContent = 'Buka Header (Scroll Down)';
      if (iconToggle) iconToggle.textContent = '▼';
      toggleBtn?.setAttribute('title', 'Buka Header (Scroll Down)');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    } else {
      dropdownSection.classList.remove('is-hidden');
      dropdownSection.classList.add('is-open');

      // Top toolbar button
      if (labelToggle) labelToggle.textContent = 'Tutup Header (Scroll Up)';
      if (iconToggle) iconToggle.textContent = '▲';
      toggleBtn?.setAttribute('title', 'Tutup Header (Scroll Up)');
      toggleBtn?.setAttribute('aria-expanded', 'true');
    }
  }

  function toggleDropdown(e) {
    if (e) e.preventDefault();
    const currentlyHidden = dropdownSection?.classList.contains('is-hidden');
    const newStateHidden = !currentlyHidden;
    localStorage.setItem('indoekonomi_fix_dropdown_hidden', newStateHidden ? 'true' : 'false');
    updateDropdownUI(newStateHidden);
  }

  toggleBtn?.addEventListener('click', toggleDropdown);

  document.getElementById('btn-header-crosswalk-doc')?.addEventListener('click', () => {
    if (!isAuthenticated) {
      if (window.__govApp) {
        window.__govApp.showLoginRequiredPrompt('Riwayat Klasifikasi APBN');
      }
      return;
    }
    ModalManager.showClassificationDocumentModal();
  });

  document.getElementById('btn-header-dict')?.addEventListener('click', () => {
    if (!isAuthenticated) {
      if (window.__govApp) {
        window.__govApp.showLoginRequiredPrompt('Kamus Metadata');
      }
      return;
    }
    if (onOpenDictionary) onOpenDictionary();
  });

  document.getElementById('btn-header-registry')?.addEventListener('click', () => {
    if (!isAuthenticated) {
      if (window.__govApp) {
        window.__govApp.showLoginRequiredPrompt('Source Registry');
      }
      return;
    }
    if (onOpenRegistry) onOpenRegistry();
  });

  document.getElementById('btn-header-crosswalk')?.addEventListener('click', () => {
    if (!isAuthenticated) {
      if (window.__govApp) {
        window.__govApp.showLoginRequiredPrompt('Tabel Crosswalk');
      }
      return;
    }
    if (onOpenCrosswalk) onOpenCrosswalk();
  });

  // Direct login / admin quick trigger in top toolbar
  document.getElementById('btn-header-login-quick')?.addEventListener('click', () => {
    if (isMasterAdmin) {
      const adminTabBtn = document.getElementById('tab-btn-admin');
      if (adminTabBtn) {
        adminTabBtn.classList.remove('hidden');
        adminTabBtn.click();
      }
    } else if (registeredUser && registeredUser.email) {
      const homeTabBtn = document.getElementById('tab-btn-home');
      if (homeTabBtn) homeTabBtn.click();
    } else {
      // Unauthenticated or Guest: Scroll to landing single gateway (NO POPUP)
      if (window.__govApp) {
        window.__govApp.showLoginRequiredPrompt('Akses Masuk Repositori');
      }
    }
  });

  // Direct logout trigger in top toolbar
  document.getElementById('btn-header-logout-quick')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (confirm('Apakah Anda ingin keluar dari sesi saat ini dan kembali ke Halaman Pintu Masuk?')) {
      localStorage.removeItem('master_admin_session');
      localStorage.removeItem('registered_researcher_access');
      localStorage.removeItem('app_guest_session');
      window.dispatchEvent(new CustomEvent('master-admin-logout'));
      window.dispatchEvent(new CustomEvent('auth-updated'));
      const homeTabBtn = document.getElementById('tab-btn-home');
      if (homeTabBtn) homeTabBtn.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Global listener for auth-updated event
  window.addEventListener('auth-updated', () => {
    renderHeader(containerId, { onOpenDictionary, onOpenRegistry, onOpenCrosswalk, onOpenIngestion });
  });
}

export function openEmailRegistrationModal(onSuccessCallback, customNoticeText = null) {
  window.openEmailRegistrationModal = openEmailRegistrationModal;
  let existing = null;
  try {
    const raw = localStorage.getItem('registered_researcher_access');
    if (raw) existing = JSON.parse(raw);
  } catch (e) {}

  let masterSession = null;
  try {
    const rawSess = localStorage.getItem('master_admin_session');
    if (rawSess) masterSession = JSON.parse(rawSess);
  } catch (e) {}

  // Remove any existing modal
  document.getElementById('email-reg-modal')?.remove();

  const modalEl = document.createElement('div');
  const pendingToken = localStorage.getItem('master_admin_pending_token') || 'ADM-CONFIRM-29ED9B2739A8';

  modalEl.id = 'email-reg-modal';
  modalEl.className = 'gov-modal-overlay';
  modalEl.innerHTML = `
    <div class="gov-modal-content max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
      
      <!-- Modal Header (Single Unified Gateway) -->
      <div style="background-color: #BEBEBE;" class="flex items-center justify-between px-6 py-3 border-b border-[#B0B0B0] rounded-t-[5px] shrink-0">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
            <span>🔑</span>
            <span>OTORISASI & AKSES MASUK REPOSITORI DATA</span>
          </span>
        </div>
        <button id="btn-close-reg-modal" class="text-slate-700 hover:text-slate-950 font-mono text-base font-bold cursor-pointer">
          ✕
        </button>
      </div>

      <div class="overflow-y-auto flex-1 bg-slate-50 p-5 sm:p-6 space-y-4 text-xs font-sans">
        
        <!-- Notice Banner -->
        <div class="bg-blue-50 border border-blue-200 text-blue-900 rounded p-3 text-[11px] leading-relaxed">
          <strong>${customNoticeText ? 'Verifikasi Akses Diperlukan:' : 'Akses Terpadu Repositori Data:'}</strong> 
          ${customNoticeText || 'Masukkan alamat email Anda untuk mengakses repositori. Sistem akan otomatis menampilkan halaman admin jika Anda menggunakan email Dewan Ekonomi Nasional, atau halaman analitik untuk email pengguna umum.'}
        </div>

        <!-- Single Unified Gateway Form -->
        <form id="form-unified-modal-login" class="space-y-3.5 font-mono">
          
          <!-- 1. Email Input -->
          <div>
            <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">
              Alamat Email <span class="text-rose-600">*</span>
            </label>
            <input 
              type="email" 
              id="modal-unified-email" 
              required 
              class="gov-input w-full text-xs font-mono bg-white" 
              placeholder="nama@instansi.go.id atau email admin..."
              value="${existing?.email || ''}"
              autofocus
            />
            <!-- Dynamic Role Hint -->
            <div id="modal-unified-role-hint" class="mt-1.5 text-[10.5px] hidden font-mono"></div>
          </div>

          <!-- 2. Password Field (Dynamic: appears for admin email) -->
          <div id="modal-unified-password-wrapper" class="space-y-1.5 hidden p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
            <div class="flex items-center justify-between">
              <label class="block text-[11px] font-bold uppercase text-amber-900">
                Kata Sandi Master Admin <span class="text-rose-600">*</span>
              </label>
              <span class="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold font-mono">Khusus Otoritas</span>
            </div>
            <input 
              type="password" 
              id="modal-unified-password" 
              class="gov-input w-full text-xs font-mono bg-white border-amber-300" 
              placeholder="Masukkan kata sandi Master Admin..."
            />
            
            <!-- Setup Password with Token Collapsible for Admin -->
            <div class="pt-1">
              <button type="button" id="modal-btn-toggle-setup-pw" class="text-[10.5px] text-[#0038A8] hover:underline font-mono cursor-pointer">
                <span id="modal-toggle-pw-text">Belum buat password? Masukkan token otoritas ▼</span>
              </button>
              
              <div id="modal-setup-pw-box" class="hidden mt-2 p-2.5 bg-white border border-amber-200 rounded space-y-2">
                <div class="text-[10px] font-bold text-amber-950">Aktivasi Kata Sandi Baru</div>
                <input type="text" id="modal-admin-token" placeholder="Kode Token (ADM-CONFIRM-...)" value="${pendingToken}" class="gov-input w-full text-[11px] font-mono" />
                <div class="grid grid-cols-2 gap-2">
                  <input type="password" id="modal-admin-new-pw" placeholder="Sandi baru..." class="gov-input w-full text-[11px] font-mono" />
                  <input type="password" id="modal-admin-confirm-pw" placeholder="Ulangi sandi..." class="gov-input w-full text-[11px] font-mono" />
                </div>
                <div class="flex items-center gap-2 pt-1">
                  <button type="button" id="modal-btn-save-token-pw" class="flex-1 py-1 px-2 bg-amber-800 hover:bg-amber-900 text-white rounded font-bold text-[10.5px] cursor-pointer">
                    Simpan Sandi Baru
                  </button>
                  <button type="button" id="modal-btn-req-token" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded text-[10px] cursor-pointer">
                    Minta Token
                  </button>
                </div>
                <div id="modal-token-msg" class="hidden text-[10.5px] p-1 rounded"></div>
              </div>
            </div>
          </div>

          <!-- 3. Nama Lengkap & Instansi (Optional) -->
          <div>
            <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">
              Nama Lengkap & Instansi / Lembaga <span class="text-slate-400 font-normal lowercase">(opsional)</span>
            </label>
            <input 
              type="text" 
              id="modal-unified-name" 
              class="gov-input w-full text-xs font-mono bg-white" 
              placeholder="Contoh: Dr. Budi Santoso — Bappenas / Universitas"
              value="${existing?.name || ''}"
            />
          </div>

          <!-- 4. Tujuan Penggunaan Data -->
          <div>
            <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">
              Tujuan Penggunaan Data
            </label>
            <select id="modal-unified-purpose" class="gov-select w-full text-xs font-mono bg-white">
              <option value="Kajian Kebijakan Makroekonomi" ${existing?.purpose === 'Kajian Kebijakan Makroekonomi' ? 'selected' : ''}>Kajian Kebijakan Makroekonomi</option>
              <option value="Riset Akademik & Publikasi Ilmiah" ${existing?.purpose === 'Riset Akademik & Publikasi Ilmiah' ? 'selected' : ''}>Riset Akademik & Publikasi Ilmiah</option>
              <option value="Analisis Fiskal & Anggaran Negara" ${existing?.purpose === 'Analisis Fiskal & Anggaran Negara' ? 'selected' : ''}>Analisis Fiskal & Anggaran Negara</option>
              <option value="Perencanaan Bisnis & Investasi Sektor Riil" ${existing?.purpose === 'Perencanaan Bisnis & Investasi Sektor Riil' ? 'selected' : ''}>Perencanaan Bisnis & Investasi Sektor Riil</option>
              <option value="Lainnya" ${(existing?.purpose === 'Lainnya' || existing?.purpose_other) ? 'selected' : ''}>Lainnya</option>
            </select>
          </div>

          <!-- Error / Message Box -->
          <div id="modal-unified-msg" class="hidden text-[11px] font-mono rounded p-2"></div>

          <!-- Submit Buttons -->
          <div class="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
            <button type="button" id="btn-cancel-reg" class="gov-btn text-xs font-medium cursor-pointer">Batal</button>
            <button type="submit" id="modal-unified-submit-btn" class="gov-btn gov-btn-primary text-xs font-semibold px-4 py-2 shadow-sm flex items-center gap-1.5 cursor-pointer">
              <span>🚀</span>
              <span>Masuk ke Repositori</span>
            </button>
          </div>

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
            id="modal-unified-btn-guest" 
            class="w-full py-2 px-3 rounded bg-white hover:bg-slate-100 border border-slate-300 text-[#2C2420] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>🌐</span>
            <span>Masuk Sebagai Tamu (Akses Publik Langsung)</span>
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  const closeModal = () => modalEl.remove();
  document.getElementById('btn-close-reg-modal')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel-reg')?.addEventListener('click', closeModal);

  // Dynamic role hint and password wrapper check
  const emailInput = document.getElementById('modal-unified-email');
  const roleHint = document.getElementById('modal-unified-role-hint');
  const pwWrapper = document.getElementById('modal-unified-password-wrapper');
  const pwInput = document.getElementById('modal-unified-password');

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

  // Form Submission (Single Gateway)
  document.getElementById('form-unified-modal-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput?.value?.trim();
    const name = document.getElementById('modal-unified-name')?.value?.trim();
    const purpose = document.getElementById('modal-unified-purpose')?.value;
    const password = pwInput?.value;
    const msgDiv = document.getElementById('modal-unified-msg');
    const submitBtn = document.getElementById('modal-unified-submit-btn');

    if (!email) return;

    if (isAdminEmail(email)) {
      // MASTER ADMIN LOGIN
      if (!password) {
        if (pwWrapper) pwWrapper.classList.remove('hidden');
        if (pwInput) pwInput.focus();
        if (msgDiv) {
          msgDiv.className = 'text-[11px] font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded p-2';
          msgDiv.textContent = 'Kata sandi diperlukan untuk otentikasi Master Admin.';
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
            purpose: purpose || 'Otoritas Tata Kelola & Evaluasi Kebijakan Fiskal',
            registered_at: new Date().toISOString(),
            registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
          }));
          localStorage.removeItem('app_guest_session');

          window.dispatchEvent(new CustomEvent('master-admin-login', { detail: sessionPayload }));
          window.dispatchEvent(new CustomEvent('auth-updated', { detail: sessionPayload }));
          closeModal();
          if (onSuccessCallback) onSuccessCallback();

          // Automatically switch to admin page as requested by user!
          const adminTabBtn = document.getElementById('tab-btn-admin');
          if (adminTabBtn) {
            adminTabBtn.classList.remove('hidden');
            adminTabBtn.click();
          }
        }
      } catch (err) {
        if (msgDiv) {
          msgDiv.className = 'text-[11px] font-mono text-rose-700 bg-rose-50 border border-rose-200 rounded p-2';
          msgDiv.textContent = err.message || 'Login Master Admin gagal. Periksa kata sandi.';
          msgDiv.classList.remove('hidden');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>🚀</span><span>Masuk ke Repositori</span>';
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
        purpose: purpose || 'Kajian Kebijakan Makroekonomi',
        registered_at: new Date().toISOString(),
        registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
      };
      localStorage.setItem('registered_researcher_access', JSON.stringify(payload));
      ApiClient.recordResearcher(payload);

      window.dispatchEvent(new CustomEvent('auth-updated', { detail: payload }));
      closeModal();
      if (onSuccessCallback) onSuccessCallback();

      // Ensure admin tab is hidden
      const adminTabBtn = document.getElementById('tab-btn-admin');
      if (adminTabBtn) {
        adminTabBtn.classList.add('hidden');
      }
    }
  });

  // Guest Direct Login from Modal
  document.getElementById('modal-unified-btn-guest')?.addEventListener('click', () => {
    localStorage.removeItem('master_admin_session');
    localStorage.removeItem('registered_researcher_access');
    localStorage.setItem('app_guest_session', 'true');

    window.dispatchEvent(new CustomEvent('auth-updated'));
    closeModal();
    if (onSuccessCallback) onSuccessCallback();

    const adminTabBtn = document.getElementById('tab-btn-admin');
    if (adminTabBtn) {
      adminTabBtn.classList.add('hidden');
    }
  });

  // Admin Setup Password Collapsible
  const btnToggleSetup = document.getElementById('modal-btn-toggle-setup-pw');
  const setupBox = document.getElementById('modal-setup-pw-box');
  const toggleText = document.getElementById('modal-toggle-pw-text');
  btnToggleSetup?.addEventListener('click', () => {
    if (!setupBox) return;
    const isHidden = setupBox.classList.contains('hidden');
    if (isHidden) {
      setupBox.classList.remove('hidden');
      if (toggleText) toggleText.textContent = 'Tutup Formulir Sandi Baru ▲';
    } else {
      setupBox.classList.add('hidden');
      if (toggleText) toggleText.textContent = 'Belum buat password? Masukkan token otoritas ▼';
    }
  });

  // Save New Password with Token
  document.getElementById('modal-btn-save-token-pw')?.addEventListener('click', async () => {
    const token = document.getElementById('modal-admin-token')?.value?.trim();
    const pw1 = document.getElementById('modal-admin-new-pw')?.value;
    const pw2 = document.getElementById('modal-admin-confirm-pw')?.value;
    const targetEmail = emailInput?.value?.trim() || MASTER_ADMIN_EMAIL;
    const msgBox = document.getElementById('modal-token-msg');

    if (!msgBox) return;
    if (pw1 !== pw2) {
      msgBox.className = 'text-[10px] text-rose-700 bg-rose-50 border border-rose-200 rounded p-1';
      msgBox.textContent = 'Konfirmasi sandi tidak cocok.';
      msgBox.classList.remove('hidden');
      return;
    }

    try {
      const res = await ApiClient.setAdminPassword(token, pw1, targetEmail);
      if (res.success) {
        msgBox.className = 'text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-1';
        msgBox.textContent = '✓ Sandi berhasil disimpan! Masuk otomatis...';
        msgBox.classList.remove('hidden');

        if (pwInput) pwInput.value = pw1;
        document.getElementById('form-unified-modal-login')?.requestSubmit();
      }
    } catch (err) {
      msgBox.className = 'text-[10px] text-rose-700 bg-rose-50 border border-rose-200 rounded p-1';
      msgBox.textContent = err.message || 'Gagal menyimpan sandi.';
      msgBox.classList.remove('hidden');
    }
  });

  // Request Token for Admin
  document.getElementById('modal-btn-req-token')?.addEventListener('click', async () => {
    const targetEmail = emailInput?.value?.trim() || MASTER_ADMIN_EMAIL;
    const msgBox = document.getElementById('modal-token-msg');
    try {
      const res = await ApiClient.sendAdminConfirmation(targetEmail);
      if (res.success) {
        const tokenInput = document.getElementById('modal-admin-token');
        if (tokenInput) tokenInput.value = res.token;
        if (msgBox) {
          msgBox.className = 'text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-1';
          msgBox.textContent = `✓ Token baru (${res.token}) telah diisikan.`;
          msgBox.classList.remove('hidden');
        }
      }
    } catch (err) {
      if (msgBox) {
        msgBox.className = 'text-[10px] text-rose-700 bg-rose-50 border border-rose-200 rounded p-1';
        msgBox.textContent = err.message || 'Gagal menerbitkan token.';
        msgBox.classList.remove('hidden');
      }
    }
  });

  // Enter key support
  ['modal-unified-email', 'modal-unified-password', 'modal-unified-name'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('form-unified-modal-login')?.requestSubmit();
      }
    });
  });
}
