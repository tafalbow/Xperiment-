import { ModalManager } from './modals.js';
import { ApiClient } from '../services/api_client.js';

export const MASTER_ADMIN_EMAIL = 'lubistaniafatimah@gmail.com';
export const SOLE_ADMIN_EMAIL = 'lubistaniafatimah@gmail.com'; // Backward compatibility

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
    (masterAdminSession.email?.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase() || 
     masterAdminSession.email?.toLowerCase() === 'lubis.tania@dewanekonomi.go.id')
  );

  container.innerHTML = `
    <!-- 1. TOP ACTION NAVIGATION TOOLBAR (FIX HEADER) -->
    <header class="bg-[#F5EBE1] px-[7px] pt-2.5 pb-1 flex items-center justify-between flex-wrap gap-2">
      <!-- Website Monogram Logo Icon + Status Line -->
      <div class="flex items-center gap-3">
        <a href="#" class="flex items-center group cursor-pointer" title="INDOEKONOMI data" aria-label="INDOEKONOMI data">
          <img src="/static/assets/logo.png" alt="INDOEKONOMI Logo" class="h-8 w-8 object-contain bg-white rounded shadow-2xs">
        </a>
        <div class="flex items-center gap-2 flex-wrap text-[11px] font-mono uppercase tracking-widest text-[#5D4037] font-bold">
          <span>STANDAR STATUTORI NASIONAL</span>
          <span>•</span>
          <span class="inline-flex items-center gap-1.5 text-[#1B4D3E] normal-case font-bold">
            <span class="inline-block w-2 h-2 rounded-full bg-[#1B4D3E] animate-pulse"></span>
            <span>Status: Online</span>
          </span>
        </div>
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
      </div>
    </header>

    <!-- 2. OBSERVATORIUM STATUTORI & TATA KELOLA REPOSITORI (SOFT BEIGE #F5EBE1) -->
    <section class="bg-[#F5EBE1] px-[7px] pt-1 pb-6 font-mono" aria-label="Observatorium Statutori & Tata Kelola Repositori">
      <div class="w-full">
        <!-- 4-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          <!-- Col 1: Brand & Statutori Mission (Span 4) -->
          <div class="lg:col-span-4 space-y-2.5">
            <div class="flex items-center gap-3.5">
              <!-- Website Monogram Logo Icon -->
              <a href="#" class="flex items-center shrink-0 group cursor-pointer" title="INDOEKONOMI data" aria-label="INDOEKONOMI data">
                <img src="/static/assets/logo.png" alt="INDOEKONOMI Logo" class="h-16 w-16 sm:h-20 sm:w-20 object-contain bg-white rounded-md shadow-xs p-1">
              </a>
              <div class="flex flex-col gap-1.5 justify-center">
                <div class="px-3.5 py-1 rounded-md bg-white shadow-xs inline-flex items-center">
                  <span class="text-base sm:text-lg font-mono font-black text-[#0038A8] tracking-widest uppercase">
                    INDOEKONOMI.DATA.GO.ID
                  </span>
                </div>
                <div class="px-2.5 py-0.5 rounded bg-white shadow-2xs text-[10px] font-mono font-semibold inline-flex items-center gap-1 text-[#5D4037] w-fit">
                  <span class="text-[#7D655C] font-normal lowercase">supported by</span>
                  <span class="font-bold uppercase text-[#2C2420]">Dewan Ekonomi Nasional</span>
                </div>
              </div>
            </div>
            <p class="text-xs text-[#5D4037] font-sans leading-relaxed">
              Repositori kompilasi dan harmonisasi statistik resmi pergerakan ekonomi Indonesia lintas institusi statutori untuk perumusan kebijakan publik dan riset kredibel.
            </p>
            <div class="pt-1 text-[10.5px] text-[#7D655C]">
              Pengawasan & Kemitraan: <strong>Kementerian Keuangan RI • BPS • Bank Indonesia • BPK RI</strong>
            </div>
          </div>

          <!-- Col 2: Otoritas Sumber Data (Span 2) -->
          <div class="lg:col-span-2 space-y-2.5">
            <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-[#2C2420]">
              Otoritas Sumber Data
            </h4>
            <ul class="text-xs text-[#5D4037] font-sans space-y-1.5 font-medium">
              <li><a href="https://kemenkeu.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1.5"><span>Kementerian Keuangan RI</span></a></li>
              <li><a href="https://bps.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1.5"><span>Badan Pusat Statistik (BPS)</span></a></li>
              <li><a href="https://bi.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1.5"><span>Bank Indonesia (BI)</span></a></li>
              <li><a href="https://bpk.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1.5"><span>BPK Republik Indonesia</span></a></li>
              <li><a href="https://satudata.go.id" target="_blank" rel="noreferrer" class="hover:text-[#0038A8] hover:underline transition-colors flex items-center gap-1.5"><span>Portal Satu Data Indonesia</span></a></li>
            </ul>
          </div>

          <!-- Col 3: Tata Kelola & Batasan Akses (Span 3) -->
          <div class="lg:col-span-3 space-y-2.5">
            <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-[#2C2420]">
              Tata Kelola & Batasan Akses
            </h4>
            <p class="text-xs text-[#5D4037] font-sans leading-relaxed">
              Penggunaan data dibatasi (<em>restricted</em>) untuk peruntukan analisis kebijakan publik, perumusan regulasi, dan riset resmi terdaftar. Wajib mencantumkan repositori ini sebagai sumber sitasi resmi.
            </p>
            <p class="text-[11px] text-[#8D6E63] font-sans font-medium">
              ⚠️ Dilarang menyalin, mendistribusikan ulang massal, atau mengkomersialkan data tanpa izin statutori tertulis.
            </p>
          </div>

          <!-- Col 4: Layanan Akses Data (Span 3) -->
          <div class="lg:col-span-3 space-y-2.5 flex flex-col justify-between">
            <div class="space-y-1.5">
              <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-[#2C2420]">
                Layanan Akses Data
              </h4>
              <p class="text-xs text-[#5D4037] font-sans leading-relaxed">
                Pembaruan berkala tgl 8, 17, dan 28 setiap bulan. Validasi 100% data riil audited BPK & BRS BPS resmi.
              </p>
              <div class="flex items-center gap-1.5 text-[11px] text-[#7D655C]">
                <span>🕒 Terakhir Diperbarui: <strong class="text-[#2C2420]">28 Januari 2025</strong></span>
              </div>
              <div class="text-[11px] text-[#7D655C]">
                Helpdesk: <a href="mailto:lubis.tania@dewanekonomi.go.id" class="text-[#0038A8] hover:underline font-bold">lubis.tania@dewanekonomi.go.id</a>
              </div>
            </div>

            <div class="pt-2">
              <button 
                type="button" 
                id="btn-statutory-register" 
                class="w-full sm:w-auto px-6 py-2.5 rounded-full ${isMasterAdmin ? 'bg-[#FDF3E9] hover:bg-[#FBE8D5] text-[#8C4710] font-bold shadow-xs' : (registeredUser ? 'bg-[#EBF5EE] hover:bg-[#D8EEDE] text-[#2D684C] shadow-xs font-semibold' : 'bg-[#1A202C] hover:bg-[#0038A8] text-white shadow-xs')} text-xs font-mono font-medium tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer group"
                title="${isMasterAdmin ? 'Sesi Master Admin Aktif' : (registeredUser ? 'Akses Terdaftar' : 'Registrasi Akses Data atau Login Master Admin')}"
              >
                ${isMasterAdmin ? `
                  <span>👑</span>
                  <span>Master Admin: <strong class="truncate max-w-[160px] inline-block align-bottom text-amber-950">${masterAdminSession.email}</strong></span>
                  <span id="btn-admin-statutory-logout" class="ml-1 text-[10px] underline text-amber-800 hover:text-rose-700" title="Keluar dari Master Admin">[Keluar]</span>
                ` : (registeredUser ? `
                  <span>🟢</span>
                  <span>Akses Terdaftar: <strong class="truncate max-w-[140px] inline-block align-bottom">${registeredUser.email}</strong></span>
                ` : `
                  <span>Registrasi Akses Data</span>
                  <span class="group-hover:translate-x-0.5 transition-transform">→</span>
                `)}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  document.getElementById('btn-header-crosswalk-doc')?.addEventListener('click', () => {
    ModalManager.showClassificationDocumentModal();
  });
  document.getElementById('btn-header-dict')?.addEventListener('click', onOpenDictionary);
  document.getElementById('btn-header-registry')?.addEventListener('click', onOpenRegistry);
  document.getElementById('btn-header-crosswalk')?.addEventListener('click', onOpenCrosswalk);

  // Single registration button trigger in Statutory Section
  document.getElementById('btn-statutory-register')?.addEventListener('click', (e) => {
    if (e.target.closest('#btn-admin-statutory-logout')) return;
    openEmailRegistrationModal(() => {
      renderHeader(containerId, { onOpenDictionary, onOpenRegistry, onOpenCrosswalk, onOpenIngestion });
    });
  });

  // Master Admin logout trigger
  document.getElementById('btn-admin-statutory-logout')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (confirm('Apakah Anda ingin keluar dari akun Master Admin?')) {
      localStorage.removeItem('master_admin_session');
      window.dispatchEvent(new CustomEvent('master-admin-logout'));
      window.dispatchEvent(new CustomEvent('auth-updated'));
      window.location.reload();
    }
  });

  // Global listener for auth-updated event
  window.addEventListener('auth-updated', () => {
    renderHeader(containerId, { onOpenDictionary, onOpenRegistry, onOpenCrosswalk, onOpenIngestion });
  });
}

export function openEmailRegistrationModal(onSuccessCallback, customNoticeText = null) {
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
  modalEl.id = 'email-reg-modal';
  modalEl.className = 'gov-modal-overlay';
  modalEl.innerHTML = `
    <div class="gov-modal-content max-w-lg">
      
      <!-- Modal Header with Tab Navigation -->
      <div style="background-color: #BEBEBE;" class="flex items-center justify-between px-6 py-3 border-b border-[#B0B0B0] rounded-t-[5px]">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-950">
            🔑 OTORISASI & REGISTRASI AKSES DATA
          </span>
        </div>
        <button id="btn-close-reg-modal" class="text-slate-700 hover:text-slate-950 font-mono text-base font-bold cursor-pointer">
          ✕
        </button>
      </div>

      <!-- Tab Buttons: Peneliti vs Master Admin -->
      <div class="flex items-center border-b border-slate-200 bg-white px-6 pt-2 font-mono text-xs">
        <button 
          id="tab-btn-modal-researcher" 
          type="button"
          class="px-4 py-2 border-b-2 border-[#1A73E8] font-bold text-[#1A73E8] transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>👤</span>
          <span>Peneliti & Analis</span>
        </button>
        <button 
          id="tab-btn-modal-admin" 
          type="button"
          class="px-4 py-2 border-b-2 border-transparent font-medium text-slate-500 hover:text-slate-900 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>🔐</span>
          <span>Login Master Admin</span>
        </button>
      </div>

      <!-- TAB 1: FORM PENELITI / ANALIS -->
      <div id="modal-content-researcher" class="p-6 space-y-4 text-xs font-sans bg-slate-50 rounded-b-[5px]">
        <div class="bg-amber-50 border border-amber-200 text-amber-900 rounded p-3 text-[11px] leading-relaxed">
          <strong>${customNoticeText ? 'Verifikasi Akses Diperlukan:' : 'Kebijakan Penggunaan Data Terbatas:'}</strong> 
          ${customNoticeText || 'Repositori ini menyediakan data sekunder resmi untuk analisa riset kebijakan. Seluruh aktivitas akses dicatat berdasarkan email dan waktu pengambilan data.'}
        </div>

        <form id="form-researcher-reg" class="space-y-3 font-mono">
          <div>
            <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">
              Alamat Email Peneliti / Analis <span class="text-rose-600">*</span>
            </label>
            <input 
              type="email" 
              id="reg-email" 
              required 
              class="gov-input w-full text-xs font-mono" 
              placeholder="nama@institusi.go.id / analis@univ.ac.id"
              value="${existing?.email || ''}"
              autofocus
            />
          </div>

          <div>
            <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">
              Nama Lengkap & Instansi / Lembaga
            </label>
            <input 
              type="text" 
              id="reg-name" 
              class="gov-input w-full text-xs font-mono" 
              placeholder="Dr. Budi Santoso — Badan Riset Nasional"
              value="${existing?.name || ''}"
            />
          </div>

          <div>
            <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">
              Tujuan Penggunaan Data
            </label>
            <select id="reg-purpose" class="gov-select w-full text-xs font-mono">
              <option value="Kajian Kebijakan Makroekonomi" ${existing?.purpose === 'Kajian Kebijakan Makroekonomi' ? 'selected' : ''}>Kajian Kebijakan Makroekonomi</option>
              <option value="Riset Akademik & Publikasi Ilmiah" ${existing?.purpose === 'Riset Akademik & Publikasi Ilmiah' ? 'selected' : ''}>Riset Akademik & Publikasi Ilmiah</option>
              <option value="Analisis Fiskal & Anggaran Negara" ${existing?.purpose === 'Analisis Fiskal & Anggaran Negara' ? 'selected' : ''}>Analisis Fiskal & Anggaran Negara</option>
              <option value="Perencanaan Bisnis & Investasi Sektor Riil" ${existing?.purpose === 'Perencanaan Bisnis & Investasi Sektor Riil' ? 'selected' : ''}>Perencanaan Bisnis & Investasi Sektor Riil</option>
              <option value="Lainnya" ${(existing?.purpose === 'Lainnya' || existing?.purpose_other || (existing?.purpose && !['Kajian Kebijakan Makroekonomi', 'Riset Akademik & Publikasi Ilmiah', 'Analisis Fiskal & Anggaran Negara', 'Perencanaan Bisnis & Investasi Sektor Riil'].includes(existing?.purpose))) ? 'selected' : ''}>Lainnya</option>
            </select>
          </div>

          <div id="wrapper-purpose-other" class="${(existing?.purpose === 'Lainnya' || existing?.purpose_other || (existing?.purpose && !['Kajian Kebijakan Makroekonomi', 'Riset Akademik & Publikasi Ilmiah', 'Analisis Fiskal & Anggaran Negara', 'Perencanaan Bisnis & Investasi Sektor Riil'].includes(existing?.purpose))) ? '' : 'hidden'} space-y-1">
            <div class="flex items-center justify-between">
              <label class="block text-[10.5px] font-bold uppercase text-slate-700">
                Uraian Alasan / Kebutuhan Lainnya <span class="text-rose-600">*</span>
              </label>
              <span id="purpose-other-counter" class="text-[10px] text-slate-400 font-mono">0 / 100</span>
            </div>
            <textarea 
              id="reg-purpose-other" 
              maxlength="100" 
              rows="2" 
              class="gov-input w-full text-xs font-mono py-1.5 resize-none" 
              placeholder="Tuliskan alasan spesifik (maks. 100 karakter)..."
            >${existing?.purpose_other || (existing?.purpose && !['Kajian Kebijakan Makroekonomi', 'Riset Akademik & Publikasi Ilmiah', 'Analisis Fiskal & Anggaran Negara', 'Perencanaan Bisnis & Investasi Sektor Riil'].includes(existing?.purpose) ? existing.purpose.replace(/^Lainnya:\s*/, '') : '')}</textarea>
          </div>

          <div class="pt-2 text-[10.5px] text-slate-500 font-mono">
            <span>⏱️ Waktu Akses: <strong>${new Date().toLocaleString('id-ID')} WIB</strong></span>
          </div>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button type="button" id="btn-cancel-reg" class="gov-btn text-xs font-medium">Batal</button>
            <button type="submit" class="gov-btn gov-btn-primary text-xs font-semibold px-4 shadow-sm">
              ✓ Simpan & Lanjutkan
            </button>
          </div>
        </form>
      </div>

      <!-- TAB 2: MASTER ADMIN LOGIN & CONFIRMATION FLOW -->
      <div id="modal-content-admin" class="hidden p-6 space-y-4 text-xs font-sans bg-slate-50 rounded-b-[5px]">
        
        <!-- Info Banner Master Admin -->
        <div class="bg-blue-50 border border-blue-200 text-blue-900 rounded p-3 text-[11px] leading-relaxed">
          <strong>Otoritas Master Admin:</strong> 
          Hak akses tata kelola penuh diberikan khusus kepada alamat email resmi <strong>${MASTER_ADMIN_EMAIL}</strong> (Dewan Ekonomi Nasional).
        </div>

        <!-- Section 1: Confirmation Email & Password Setup -->
        <div class="border border-slate-200 rounded p-3.5 bg-white space-y-3 font-mono">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="font-bold text-slate-800 text-[11px]">1. Konfirmasi Email & Buat Kata Sandi</span>
            <span class="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-semibold">Khusus Master Admin</span>
          </div>

          <p class="text-[10.5px] text-slate-600">
            Klik tombol di bawah untuk meminta pengiriman email konfirmasi resmi dan kode token pembuatan kata sandi ke <strong>${MASTER_ADMIN_EMAIL}</strong>.
          </p>

          <button 
            type="button" 
            id="btn-send-admin-confirmation" 
            class="w-full py-1.5 px-3 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <span>✉️</span>
            <span>Kirim Email Konfirmasi & Setup Password ke ${MASTER_ADMIN_EMAIL}</span>
          </button>

          <!-- Dynamic Notice after email sent -->
          <div id="admin-confirm-result" class="hidden space-y-2 pt-2 border-t border-slate-100">
            <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded p-2.5 text-[10.5px] leading-relaxed">
              <div class="font-bold">✓ Email Konfirmasi Resmi Terkirim!</div>
              <div id="admin-confirm-msg" class="mt-0.5 text-slate-700"></div>
            </div>

            <!-- Password creation form -->
            <form id="form-admin-set-password" class="space-y-2 pt-1">
              <div>
                <label class="block text-[10.5px] font-bold text-slate-700 mb-0.5">Kode Token Konfirmasi</label>
                <input type="text" id="admin-token-input" required class="gov-input w-full text-xs font-mono" placeholder="ADM-CONFIRM-XXXX" />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-[10.5px] font-bold text-slate-700 mb-0.5">Kata Sandi Baru</label>
                  <input type="password" id="admin-new-pw" required minlength="6" class="gov-input w-full text-xs font-mono" placeholder="Minimal 6 karakter" />
                </div>
                <div>
                  <label class="block text-[10.5px] font-bold text-slate-700 mb-0.5">Konfirmasi Sandi</label>
                  <input type="password" id="admin-confirm-pw" required minlength="6" class="gov-input w-full text-xs font-mono" placeholder="Ulangi kata sandi" />
                </div>
              </div>
              <button type="submit" class="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs transition-all cursor-pointer">
                ✓ Simpan Kata Sandi & Konfirmasi Master Admin
              </button>
            </form>
          </div>
        </div>

        <!-- Section 2: Form Login Master Admin -->
        <div class="border border-slate-200 rounded p-3.5 bg-white space-y-3 font-mono">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="font-bold text-slate-800 text-[11px]">2. Masuk sebagai Master Admin</span>
            <span class="text-[10px] text-emerald-700 font-semibold">● Akses Tata Kelola</span>
          </div>

          <form id="form-admin-login" class="space-y-3">
            <div>
              <label class="block text-[10.5px] font-bold uppercase text-slate-700 mb-1">
                Alamat Email Master Admin
              </label>
              <input 
                type="email" 
                id="admin-login-email" 
                required 
                class="gov-input w-full text-xs font-mono bg-slate-50" 
                value="${MASTER_ADMIN_EMAIL}"
                readonly
              />
            </div>

            <div>
              <label class="block text-[10.5px] font-bold uppercase text-slate-700 mb-1">
                Kata Sandi Master Admin
              </label>
              <input 
                type="password" 
                id="admin-login-password" 
                required 
                class="gov-input w-full text-xs font-mono" 
                placeholder="Masukkan kata sandi..."
              />
            </div>

            <div id="admin-login-error" class="hidden text-rose-600 bg-rose-50 border border-rose-200 rounded p-2 text-[10.5px]"></div>

            <div class="pt-1 flex items-center justify-between">
              <span class="text-[10px] text-slate-500">Otoritas: Dewan Ekonomi Nasional</span>
              <button type="submit" class="gov-btn gov-btn-primary text-xs font-bold px-4 py-1.5 shadow-sm">
                🔐 Masuk sebagai Master Admin
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modalEl);

  const closeModal = () => modalEl.remove();
  document.getElementById('btn-close-reg-modal')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel-reg')?.addEventListener('click', closeModal);

  // Tab switching inside modal
  const tabBtnResearcher = document.getElementById('tab-btn-modal-researcher');
  const tabBtnAdmin = document.getElementById('tab-btn-modal-admin');
  const contentResearcher = document.getElementById('modal-content-researcher');
  const contentAdmin = document.getElementById('modal-content-admin');

  tabBtnResearcher?.addEventListener('click', () => {
    tabBtnResearcher.classList.add('border-[#1A73E8]', 'font-bold', 'text-[#1A73E8]');
    tabBtnResearcher.classList.remove('border-transparent', 'font-medium', 'text-slate-500');
    tabBtnAdmin.classList.remove('border-[#1A73E8]', 'font-bold', 'text-[#1A73E8]');
    tabBtnAdmin.classList.add('border-transparent', 'font-medium', 'text-slate-500');
    contentResearcher?.classList.remove('hidden');
    contentAdmin?.classList.add('hidden');
  });

  tabBtnAdmin?.addEventListener('click', () => {
    tabBtnAdmin.classList.add('border-[#1A73E8]', 'font-bold', 'text-[#1A73E8]');
    tabBtnAdmin.classList.remove('border-transparent', 'font-medium', 'text-slate-500');
    tabBtnResearcher.classList.remove('border-[#1A73E8]', 'font-bold', 'text-[#1A73E8]');
    tabBtnResearcher.classList.add('border-transparent', 'font-medium', 'text-slate-500');
    contentAdmin?.classList.remove('hidden');
    contentResearcher?.classList.add('hidden');
  });

  // Purpose 'Lainnya' dynamic counter
  const selectPurpose = document.getElementById('reg-purpose');
  const wrapperOther = document.getElementById('wrapper-purpose-other');
  const inputOther = document.getElementById('reg-purpose-other');
  const counterOther = document.getElementById('purpose-other-counter');

  const updateCharCounter = () => {
    const len = inputOther?.value?.length || 0;
    if (counterOther) {
      counterOther.textContent = `${len} / 100`;
      if (len >= 100) {
        counterOther.className = 'text-[10px] text-rose-600 font-mono font-bold';
      } else {
        counterOther.className = 'text-[10px] text-slate-400 font-mono';
      }
    }
  };

  const updateOtherVisibility = () => {
    if (selectPurpose?.value === 'Lainnya') {
      wrapperOther?.classList.remove('hidden');
      inputOther?.setAttribute('required', 'true');
      inputOther?.focus();
    } else {
      wrapperOther?.classList.add('hidden');
      inputOther?.removeAttribute('required');
    }
    updateCharCounter();
  };

  selectPurpose?.addEventListener('change', updateOtherVisibility);
  inputOther?.addEventListener('input', updateCharCounter);
  updateCharCounter();

  // 1. Submit Researcher Form
  document.getElementById('form-researcher-reg')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email')?.value?.trim();
    const name = document.getElementById('reg-name')?.value?.trim();
    const purposeVal = selectPurpose?.value;
    const purposeOtherVal = inputOther?.value?.trim() || '';

    let effectivePurpose = purposeVal;
    if (purposeVal === 'Lainnya') {
      effectivePurpose = purposeOtherVal ? `Lainnya: ${purposeOtherVal.slice(0, 100)}` : 'Lainnya';
    }

    if (email) {
      const payload = {
        email,
        name: name || 'Peneliti Terdaftar',
        purpose: effectivePurpose,
        purpose_other: purposeVal === 'Lainnya' ? purposeOtherVal.slice(0, 100) : '',
        registered_at: new Date().toISOString(),
        registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
      };
      localStorage.setItem('registered_researcher_access', JSON.stringify(payload));
      ApiClient.recordResearcher(payload);
      window.dispatchEvent(new CustomEvent('auth-updated', { detail: payload }));
      closeModal();
      if (onSuccessCallback) onSuccessCallback();
    }
  });

  // 2. Trigger Send Admin Confirmation Email
  document.getElementById('btn-send-admin-confirmation')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-send-admin-confirmation');
    if (btn) btn.innerHTML = '<span>⏳</span><span>Mengirim email konfirmasi...</span>';

    try {
      const res = await ApiClient.sendAdminConfirmation(MASTER_ADMIN_EMAIL);
      const resultDiv = document.getElementById('admin-confirm-result');
      const msgDiv = document.getElementById('admin-confirm-msg');
      const tokenInput = document.getElementById('admin-token-input');

      if (resultDiv && msgDiv) {
        resultDiv.classList.remove('hidden');
        msgDiv.innerHTML = `
          Surat resmi telah diterbitkan ke <strong>${res.recipient}</strong>.<br/>
          Kode Token: <strong class="text-emerald-950 font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-300">${res.token}</strong>
        `;
      }
      if (tokenInput && res.token) {
        tokenInput.value = res.token;
      }
      if (btn) btn.innerHTML = '<span>✓</span><span>Email Konfirmasi Terkirim</span>';
    } catch (err) {
      alert('Gagal mengirim konfirmasi: ' + err.message);
      if (btn) btn.innerHTML = '<span>✉️</span><span>Kirim Ulang Konfirmasi</span>';
    }
  });

  // 3. Set Master Admin Password
  document.getElementById('form-admin-set-password')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = document.getElementById('admin-token-input')?.value?.trim();
    const pw1 = document.getElementById('admin-new-pw')?.value;
    const pw2 = document.getElementById('admin-confirm-pw')?.value;

    if (pw1 !== pw2) {
      alert('Kata sandi baru dan konfirmasi kata sandi tidak cocok!');
      return;
    }

    try {
      const res = await ApiClient.setAdminPassword(token, pw1, MASTER_ADMIN_EMAIL);
      alert(res.message || 'Kata sandi berhasil disimpan! Silakan masuk pada form di bawah.');
      const loginPwInput = document.getElementById('admin-login-password');
      if (loginPwInput) {
        loginPwInput.value = pw1;
        loginPwInput.focus();
      }
    } catch (err) {
      alert('Gagal mengatur kata sandi: ' + err.message);
    }
  });

  // 4. Submit Master Admin Login
  document.getElementById('form-admin-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('admin-login-email')?.value?.trim();
    const password = document.getElementById('admin-login-password')?.value;
    const errorDiv = document.getElementById('admin-login-error');

    if (errorDiv) errorDiv.classList.add('hidden');

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
        
        // Also register researcher access for governance recording
        localStorage.setItem('registered_researcher_access', JSON.stringify({
          email: MASTER_ADMIN_EMAIL,
          name: 'Tania Fatimah Lubis, S.E., M.P.P.',
          purpose: 'Otoritas Tata Kelola & Evaluasi Kebijakan Fiskal',
          registered_at: new Date().toISOString(),
          registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
        }));

        window.dispatchEvent(new CustomEvent('master-admin-login', { detail: sessionPayload }));
        window.dispatchEvent(new CustomEvent('auth-updated', { detail: sessionPayload }));
        closeModal();

        // Switch to Master Admin Tab
        const adminTabBtn = document.getElementById('tab-btn-admin');
        if (adminTabBtn) {
          adminTabBtn.classList.remove('hidden');
          adminTabBtn.click();
        }
      }
    } catch (err) {
      if (errorDiv) {
        errorDiv.textContent = err.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.';
        errorDiv.classList.remove('hidden');
      }
    }
  });
}
