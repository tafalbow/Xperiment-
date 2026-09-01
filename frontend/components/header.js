export const SOLE_ADMIN_EMAIL = 'lubis.tania@dewanekonomi.go.id';

export function renderHeader(containerId, { onOpenDictionary, onOpenRegistry, onOpenCrosswalk, onOpenIngestion }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Retrieve existing registered email & timestamp from localStorage
  let registeredUser = null;
  try {
    const raw = localStorage.getItem('registered_researcher_access');
    if (raw) registeredUser = JSON.parse(raw);
  } catch (e) {}

  const isAdmin = registeredUser?.email?.trim().toLowerCase() === SOLE_ADMIN_EMAIL.toLowerCase();

  container.innerHTML = `
    <!-- Top System Notice Banner (Google Analytics Style) -->
    <div class="bg-[#F8F9FA] text-[#3C4043] text-xs px-4 lg:px-8 py-2 border-b border-[#DADCE0] flex items-center justify-between flex-wrap gap-2.5 font-mono font-medium shadow-2xs">
      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex items-center gap-1.5 font-mono text-[11px]">
          <span class="inline-block w-2 h-2 rounded-full bg-[#1E8E3E] animate-pulse"></span>
          <span class="font-bold text-[#202124]">REPOSITORY STATUS: ONLINE</span>
          <span class="text-[#BDC1C6]">|</span>
          <span class="text-[#5F6368] font-semibold">CAKUPAN: TINGKAT NASIONAL (INDONESIA)</span>
        </div>

        <div class="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[#3C4043] bg-white px-2 py-0.5 rounded border border-[#DADCE0]">
          <span>🕒 Terakhir Diperbarui:</span>
          <strong class="text-[#202124]">28 Januari 2025</strong>
          <span class="text-[#5F6368]">(Siklus Tgl 8, 17, 28)</span>
        </div>
      </div>

      <!-- Right: Restricted License Notice & Email Access Registration Button -->
      <div class="flex items-center gap-2 flex-wrap font-mono text-[11px]">
        <span class="text-[#C5221F] bg-[#FCE8E6] border border-[#FAD2CF] px-2 py-0.5 rounded text-[10.5px] font-medium">
          ⚠️ Penggunaan Data Terbatas (Restricted) — Wajib Sitasi
        </span>

        <button 
          type="button" 
          id="btn-header-email-reg" 
          class="px-2.5 py-0.5 rounded font-mono text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${isAdmin ? 'bg-[#FEF7E0] text-[#B06000] border border-[#F9AB00] font-bold' : (registeredUser ? 'bg-[#E6F4EA] hover:bg-[#CEEAD6] text-[#137333] border border-[#CEEAD6]' : 'bg-[#1A73E8] hover:bg-[#174EA6] text-white border border-[#1A73E8] font-medium')}"
          title="Daftarkan email pengguna untuk pelacakan dan otorisasi pengambilan data"
        >
          ${isAdmin ? `
            <span>👑</span>
            <span>Sole Admin: <strong class="truncate max-w-[150px] inline-block align-bottom text-amber-950">${registeredUser.email}</strong></span>
          ` : (registeredUser ? `
            <span>🟢</span>
            <span>Akses Terdaftar: <strong class="truncate max-w-[130px] inline-block align-bottom">${registeredUser.email}</strong></span>
          ` : `
            <span>🔑</span>
            <span>Registrasi Email Akses Data</span>
          `)}
        </button>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="bg-white border-b border-[#DADCE0] px-4 lg:px-8 py-3 flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3.5">
        <div class="w-9 h-9 rounded-lg bg-[#E8F0FE] flex items-center justify-center text-[#1A73E8] font-bold text-lg font-mono shadow-xs border border-[#D2E3FC] shrink-0">
          🇮🇩
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-lg font-bold text-slate-900 tracking-tight leading-none">
              Pergerakan Ekonomi Indonesia
            </h1>
            <span class="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              v1.0 Nat-Gov
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">
            Pusat Basis Data Data Sekunder & Repositori Statistik Resmi Nasional (Audit Kemenkeu, BPS, Bank Indonesia)
          </p>
        </div>
      </div>

      <!-- Action Navigation Buttons -->
      <div class="flex items-center gap-2 flex-wrap">
        <button id="btn-header-dict" class="gov-btn text-xs font-medium">
          <svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          Kamus Metadata
        </button>

        <button id="btn-header-registry" class="gov-btn text-xs font-medium">
          <svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          Source Registry
        </button>

        <button id="btn-header-crosswalk" class="gov-btn text-xs font-medium">
          <svg class="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
          Crosswalk
        </button>

        <button id="btn-header-ingest" class="gov-btn gov-btn-primary text-xs font-medium">
          <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Ingestion & Audit Log
        </button>
      </div>
    </header>
  `;

  document.getElementById('btn-header-dict')?.addEventListener('click', onOpenDictionary);
  document.getElementById('btn-header-registry')?.addEventListener('click', onOpenRegistry);
  document.getElementById('btn-header-crosswalk')?.addEventListener('click', onOpenCrosswalk);
  document.getElementById('btn-header-ingest')?.addEventListener('click', onOpenIngestion);

  // Email registration modal trigger
  document.getElementById('btn-header-email-reg')?.addEventListener('click', () => {
    openEmailRegistrationModal(() => {
      renderHeader(containerId, { onOpenDictionary, onOpenRegistry, onOpenCrosswalk, onOpenIngestion });
    });
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

  // Remove any existing modal
  document.getElementById('email-reg-modal')?.remove();

  const modalEl = document.createElement('div');
  modalEl.id = 'email-reg-modal';
  modalEl.className = 'gov-modal-overlay';
  modalEl.innerHTML = `
    <div class="gov-modal-content max-w-lg">
      <div style="background-color: #BEBEBE;" class="flex items-center justify-between px-6 py-3.5 border-b border-[#B0B0B0] rounded-t-[5px]">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-950">
            🔑 REGISTRASI EMAIL & PELACAKAN AKSES DATA
          </span>
        </div>
        <button id="btn-close-reg-modal" class="text-slate-700 hover:text-slate-950 font-mono text-base font-bold cursor-pointer">
          ✕
        </button>
      </div>

      <div class="p-6 space-y-4 text-xs font-sans bg-slate-50 rounded-b-[5px]">
        <div class="bg-amber-50 border border-amber-200 text-amber-900 rounded p-3 text-[11px] leading-relaxed">
          <strong>${customNoticeText ? 'Verifikasi Akses Diperlukan:' : 'Kebijakan Penggunaan Data Terbatas:'}</strong> 
          ${customNoticeText || 'Repositori ini menyediakan data sekunder resmi untuk keperluan analisa riset kebijakan. Seluruh aktivitas akses dicatat berdasarkan email dan waktu pengambilan data (tanpa webmail OTP).'}
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

          <!-- Dynamic Other Reason Field (Max 100 characters) -->
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
              placeholder="Tuliskan alasan / tujuan penggunaan data secara spesifik (maks. 100 karakter)..."
            >${existing?.purpose_other || (existing?.purpose && !['Kajian Kebijakan Makroekonomi', 'Riset Akademik & Publikasi Ilmiah', 'Analisis Fiskal & Anggaran Negara', 'Perencanaan Bisnis & Investasi Sektor Riil'].includes(existing?.purpose) ? existing.purpose.replace(/^Lainnya:\s*/, '') : '')}</textarea>
          </div>

          <div class="pt-2 text-[10.5px] text-slate-500 font-mono">
            <span>⏱️ Waktu Akses: <strong>${new Date().toLocaleString('id-ID')} WIB</strong></span>
          </div>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button type="button" id="btn-cancel-reg" class="gov-btn text-xs font-medium">Batal</button>
            <button type="submit" class="gov-btn gov-btn-primary text-xs font-semibold px-4 shadow-sm">
              ✓ Simpan & Lanjutkan Download
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  const closeModal = () => modalEl.remove();
  document.getElementById('btn-close-reg-modal')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel-reg')?.addEventListener('click', closeModal);

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
      window.dispatchEvent(new CustomEvent('auth-updated', { detail: payload }));
      closeModal();
      if (onSuccessCallback) onSuccessCallback();
    }
  });
}
