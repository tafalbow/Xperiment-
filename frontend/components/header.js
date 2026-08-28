// ==============================================================================
// HEADER COMPONENT (GovTech Minimalist, Last Update Notice, Restricted License, Email Access Tracking)
// ==============================================================================

export function renderHeader(containerId, { onOpenDictionary, onOpenRegistry, onOpenCrosswalk, onOpenIngestion }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Retrieve existing registered email & timestamp from localStorage
  let registeredUser = null;
  try {
    const raw = localStorage.getItem('registered_researcher_access');
    if (raw) registeredUser = JSON.parse(raw);
  } catch (e) {}

  container.innerHTML = `
    <!-- Top System Notice Banner (Last Update, License Restriction & Email Access Tracking) -->
    <div class="bg-slate-900 text-slate-200 text-xs px-4 lg:px-8 py-2 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2.5">
      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex items-center gap-1.5 font-mono text-[11px]">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-bold text-white">REPOSITORY STATUS: ONLINE</span>
          <span class="text-slate-500">|</span>
          <span class="text-slate-300">CAKUPAN: TINGKAT NASIONAL (INDONESIA)</span>
        </div>

        <div class="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-amber-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
          <span>🕒 Terakhir Diperbarui:</span>
          <strong class="text-amber-200">28 Januari 2025</strong>
          <span class="text-slate-400">(Siklus Tgl 8, 17, 28)</span>
        </div>
      </div>

      <!-- Right: Restricted License Notice & Email Access Registration Button -->
      <div class="flex items-center gap-2 flex-wrap font-mono text-[11px]">
        <span class="text-rose-300 bg-rose-950/80 border border-rose-800 px-2 py-0.5 rounded text-[10.5px]">
          ⚠️ Penggunaan Data Terbatas (Restricted untuk Analisa) — Wajib Sitasi
        </span>

        <button 
          type="button" 
          id="btn-header-email-reg" 
          class="px-2.5 py-0.5 rounded font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${registeredUser ? 'bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 border border-emerald-500' : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-300 font-bold'}"
          title="Daftarkan email pengguna untuk pelacakan dan otorisasi pengambilan data"
        >
          ${registeredUser ? `
            <span>🟢</span>
            <span>Akses Terdaftar: <strong class="truncate max-w-[130px] inline-block align-bottom">${registeredUser.email}</strong></span>
          ` : `
            <span>🔑</span>
            <span>Registrasi Email Akses Data</span>
          `}
        </button>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="bg-white border-b border-slate-200 px-4 lg:px-8 py-3 flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3.5">
        <div class="w-10 h-10 rounded bg-slate-900 flex items-center justify-center text-white font-bold text-xl font-mono shadow-sm shrink-0">
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
}

function openEmailRegistrationModal(onSuccessCallback) {
  let existing = null;
  try {
    const raw = localStorage.getItem('registered_researcher_access');
    if (raw) existing = JSON.parse(raw);
  } catch (e) {}

  const modalEl = document.createElement('div');
  modalEl.id = 'email-reg-modal';
  modalEl.className = 'gov-modal-overlay';
  modalEl.innerHTML = `
    <div class="gov-modal-content max-w-lg">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
            🔑 REGISTRASI EMAIL & PELACAKAN AKSES DATA
          </span>
        </div>
        <button id="btn-close-reg-modal" class="text-slate-400 hover:text-slate-700 font-mono text-base font-bold">
          ✕
        </button>
      </div>

      <div class="p-6 space-y-4 text-xs font-sans">
        <div class="bg-amber-50 border border-amber-200 text-amber-900 rounded p-3 text-[11px] leading-relaxed">
          <strong>Kebijakan Penggunaan Data Terbatas:</strong> Repositori ini menyediakan data sekunder resmi untuk keperluan analisa riset kebijakan. Seluruh aktivitas akses dicatat berdasarkan email dan waktu pengambilan data (tanpa webmail OTP).
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
              <option value="Lainnya" ${existing?.purpose === 'Lainnya' ? 'selected' : ''}>Lainnya</option>
            </select>
          </div>

          <div class="pt-2 text-[10.5px] text-slate-500 font-mono">
            <span>⏱️ Waktu Akses: <strong>${new Date().toLocaleString('id-ID')} WIB</strong></span>
          </div>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button type="button" id="btn-cancel-reg" class="gov-btn text-xs font-medium">Batal</button>
            <button type="submit" class="gov-btn gov-btn-primary text-xs font-semibold px-4">
              ✓ Simpan & Otorisasi Akses
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

  document.getElementById('form-researcher-reg')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email')?.value?.trim();
    const name = document.getElementById('reg-name')?.value?.trim();
    const purpose = document.getElementById('reg-purpose')?.value;

    if (email) {
      const payload = {
        email,
        name: name || 'Peneliti Terdaftar',
        purpose,
        registered_at: new Date().toISOString(),
        registered_at_formatted: new Date().toLocaleString('id-ID') + ' WIB'
      };
      localStorage.setItem('registered_researcher_access', JSON.stringify(payload));
      closeModal();
      if (onSuccessCallback) onSuccessCallback();
    }
  });
}
