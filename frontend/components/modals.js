// ==============================================================================
// MODALS COMPONENT (Data Provenance, Kamus Metadata, Registry, Crosswalk, Ingestion)
// ==============================================================================

import { ApiClient } from '../services/api_client.js';
import { ExcelExporter } from '../services/excel_exporter.js';

export class ModalManager {
  static openModal(title, contentHtml) {
    this.closeModal();

    const modalEl = document.createElement('div');
    modalEl.id = 'gov-active-modal';
    modalEl.className = 'gov-modal-overlay';
    modalEl.innerHTML = `
      <div class="gov-modal-content">
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">${title}</span>
          </div>
          <button id="btn-modal-close" class="text-slate-400 hover:text-slate-700 font-mono text-base font-bold">
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto max-h-[75vh] space-y-4 text-xs">
          ${contentHtml}
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button id="btn-modal-dismiss" class="gov-btn text-xs font-medium">Tutup</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    document.getElementById('btn-modal-close')?.addEventListener('click', () => this.closeModal());
    document.getElementById('btn-modal-dismiss')?.addEventListener('click', () => this.closeModal());
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) this.closeModal();
    });
  }

  static closeModal() {
    const existing = document.getElementById('gov-active-modal');
    if (existing) existing.remove();
  }

  // 1. Provenance & Lineage Modal
  static async showProvenanceModal(observationId) {
    try {
      const p = await ApiClient.fetchProvenanceTrace(observationId);
      const valStr = p.value !== null ? Number(p.value).toLocaleString('id-ID', { maximumFractionDigits: 2 }) : 'N/A';

      const revisionsHtml = p.revision_history && p.revision_history.length > 0
        ? `
          <div class="mt-4 pt-3 border-t border-slate-200">
            <h4 class="font-mono font-bold text-slate-800 text-[11px] uppercase mb-2">Riwayat Revisi Nilai Resmi</h4>
            <table class="gov-table text-[11px] font-mono">
              <thead>
                <tr>
                  <th>Versi</th>
                  <th>Nilai Sebelumnya</th>
                  <th>Nilai Baru</th>
                  <th>Alasan Perubahan</th>
                  <th>Tanggal Revisi</th>
                </tr>
              </thead>
              <tbody>
                ${p.revision_history.map(r => `
                  <tr>
                    <td class="text-center font-bold">v${r.version_number}</td>
                    <td class="text-right">${r.previous_value !== null ? Number(r.previous_value).toLocaleString('id-ID') : 'N/A'}</td>
                    <td class="text-right font-bold text-slate-900">${r.new_value !== null ? Number(r.new_value).toLocaleString('id-ID') : 'N/A'}</td>
                    <td class="font-sans">${r.change_reason}</td>
                    <td class="text-center">${r.revision_date}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `
        : '<p class="text-[11px] text-slate-400 font-mono mt-3">Data ini belum mengalami revisi sejak observasi awal.</p>';

      const content = `
        <div class="space-y-4">
          <!-- Banner Lineage -->
          <div class="bg-sky-50 border border-sky-200 rounded p-3 text-sky-900">
            <div class="font-bold text-xs font-mono">TELUSUR ASAL-USUL ANGKA (DATA PROVENANCE & LINEAGE)</div>
            <div class="text-[11px] mt-0.5">Setiap angka dalam sistem dapat dijawab secara transparan mengenai publikasi dan tabel resminya.</div>
          </div>

          <!-- Step-by-step Lineage Flow -->
          <div class="border border-slate-200 rounded bg-white p-4 space-y-3 font-mono">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span class="text-slate-400 text-[10px] uppercase">Nilai Observasi Nasional</span>
                <div class="text-lg font-bold text-slate-900 tabular-nums">${valStr} ${p.unit}</div>
                <div class="text-[11px] text-slate-500">Periode: <strong>${p.period}</strong> | Status: <strong>${p.status}</strong></div>
              </div>
              <div>
                <span class="text-slate-400 text-[10px] uppercase">Indikator & Kode Variabel</span>
                <div class="font-bold text-slate-900">${p.indicator_name}</div>
                <div class="text-[11px] text-slate-500">Kode: <span class="bg-slate-100 px-1 py-0.5 rounded">${p.unique_variable_code || p.indicator_id}</span></div>
              </div>
            </div>

            <div class="border-t border-slate-100 pt-3 space-y-2.5 text-xs">
              <div>
                <span class="text-slate-400 text-[10px] uppercase">Dokumen Publikasi Resmi & Landasan Hukum</span>
                <div class="font-sans font-bold text-slate-900 text-sm">📜 ${p.publication_title}</div>
                <div class="text-[11px] text-slate-600 font-mono mt-0.5">Nomor / Edisi Resmi: <strong>${p.document_number || '—'}</strong> | Tanggal Rilis: <strong>${p.publication_date}</strong></div>
              </div>

              <div>
                <span class="text-slate-400 text-[10px] uppercase">Lembaga Penerbit & Sitasi Halaman / Tabel</span>
                <div class="text-slate-900 font-semibold">🏛️ Diterbitkan oleh: <strong>${p.source_institution}</strong> (${p.institution_type || 'Kementerian/Lembaga RI'})</div>
                <div class="text-[11px] text-slate-700 bg-slate-100 p-2 rounded border border-slate-200 mt-1 font-mono">
                  📍 Sitasi Dokumen: <strong>${p.page_reference || 'Halaman N/A'}</strong> ${p.table_reference ? `• <strong>${p.table_reference}</strong>` : ''}
                </div>
              </div>

              <div>
                <span class="text-slate-400 text-[10px] uppercase">Tautan Dokumen Resmi Asli</span>
                <div class="mt-1 flex items-center gap-2.5 flex-wrap">
                  <a href="${p.document_url || p.source_url || '#'}" target="_blank" rel="noopener noreferrer" class="gov-btn gov-btn-sm inline-flex items-center gap-1.5 text-sky-800 font-bold bg-sky-50 hover:bg-sky-100 border border-sky-300 shadow-2xs">
                    <span>🔗 Unduh / Buka Dokumen Asli Resmi</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                  ${p.official_institution_url ? `
                    <a href="${p.official_institution_url}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-slate-500 hover:text-slate-800 underline font-mono">
                      Portal Lembaga Penerbit ↗
                    </a>
                  ` : ''}
                </div>
              </div>

              <div class="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                <span>Tanggal Akses/Retrieval: ${p.retrieval_date || p.updated_at}</span>
                <span>Versi Rekord: v${p.version_id || 1}</span>
              </div>
            </div>
          </div>

          <!-- Status Definition Guide Box -->
          <div class="gov-card p-3.5 bg-slate-50 border border-slate-200 text-xs space-y-2.5">
            <div class="font-mono font-bold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
              <span>📖</span> Penjelasan Arti Status Data (Tata Kelola Data Resmi):
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px]">
              <!-- Provisional -->
              <div class="p-2.5 bg-white rounded border border-amber-200 space-y-1 shadow-2xs">
                <div class="flex items-center justify-between">
                  <span class="status-badge status-provisional font-bold">Sementara</span>
                  <span class="text-[10px] text-amber-800 font-mono font-semibold">Angka Berjalan</span>
                </div>
                <p class="text-slate-600 font-sans leading-relaxed">
                  <strong>Artinya:</strong> Data rilis awal resmi dari laporan berkala tahun berjalan (seperti <em>APBN KiTa</em> atau <em>BRS BPS Triwulanan</em>). Data ini sah digunakan untuk analisis kebijakan terkini, namun berstatus <strong>sementara</strong> karena masih menunggu audit final Badan Pemeriksa Keuangan (BPK) atau penetapan Angka Tetap.
                </p>
              </div>

              <!-- Observed -->
              <div class="p-2.5 bg-white rounded border border-emerald-200 space-y-1 shadow-2xs">
                <div class="flex items-center justify-between">
                  <span class="status-badge status-observed font-bold">Final</span>
                  <span class="text-[10px] text-emerald-800 font-mono font-semibold">Angka Definitif</span>
                </div>
                <p class="text-slate-600 font-sans leading-relaxed">
                  <strong>Artinya:</strong> Data realisasi definitif yang telah melalui audit resmi lembaga pemeriksa negara (seperti <em>Laporan Keuangan Pemerintah Pusat / LKPP Audited BPK RI</em> atau <em>Angka Tetap / ATAP BPS</em>). Data ini bersifat <strong>final, tetap, dan mengikat</strong> sebagai rujukan baku.
                </p>
              </div>

              <!-- Revised -->
              <div class="p-2.5 bg-white rounded border border-indigo-200 space-y-1 shadow-2xs">
                <div class="flex items-center justify-between">
                  <span class="status-badge status-revised font-bold">Revisi</span>
                  <span class="text-[10px] text-indigo-800 font-mono font-semibold">Angka Disesuaikan</span>
                </div>
                <p class="text-slate-600 font-sans leading-relaxed">
                  <strong>Artinya:</strong> Data historis resmi yang telah disesuaikan kembali oleh kementerian/lembaga penerbit karena adanya pemutakhiran tahun dasar (misal: penyelarasan PDB 2000 ke 2010) atau penyempurnaan metode sensus (seperti metode KSA pertanian 2018).
                </p>
              </div>

              <!-- N/A -->
              <div class="p-2.5 bg-white rounded border border-slate-200 space-y-1 shadow-2xs">
                <div class="flex items-center justify-between">
                  <span class="status-badge status-na font-bold">Belum Tersedia (N/A)</span>
                  <span class="text-[10px] text-slate-500 font-mono font-semibold">Tanpa Estimasi</span>
                </div>
                <p class="text-slate-600 font-sans leading-relaxed">
                  <strong>Artinya:</strong> Angka resmi pada periode tersebut belum dipublikasikan oleh instansi terkait. Sistem berpegang pada asas tata kelola ketat: <strong>dilarang membuat angka estimasi/ramalan tiruan</strong> untuk mengisi kekosongan.
                </p>
              </div>
            </div>
          </div>

          ${revisionsHtml}
        </div>
      `;

      this.openModal(`KETERANGAN LENGKAP & JEJAK ASAL-USUL DATA (LINEAGE): OBS #${observationId}`, content);
    } catch (err) {
      this.openModal('Error', `<div class="text-rose-600 font-mono">${err.message}</div>`);
    }
  }

  // 2. Data Dictionary Modal (24 Standardized Attributes)
  static async showDictionaryModal(indicatorId = null) {
    try {
      let content = '';
      if (indicatorId) {
        const m = await ApiClient.fetchIndicatorMetadata(indicatorId);
        content = `
          <div class="space-y-4">
            <div class="bg-slate-100 border border-slate-200 p-3 rounded">
              <div class="text-xs font-bold text-slate-900 font-mono">[${m.indicator_id}] ${m.indicator_name}</div>
              <div class="text-[11px] text-slate-600 font-mono mt-0.5">Kode Variabel: ${m.unique_variable_code} | Sektor: ${m.sector} > ${m.category} > ${m.subcategory}</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2 border border-slate-200 p-3 rounded bg-white">
                <h4 class="font-bold text-slate-800 text-[11px] uppercase font-mono">1. Definisi Operasional</h4>
                <p class="text-slate-700 text-xs font-sans leading-relaxed">${m.definition}</p>
                
                <h4 class="font-bold text-slate-800 text-[11px] uppercase font-mono mt-3">2. Formula Perhitungan</h4>
                <div class="bg-slate-50 p-2 rounded font-mono text-slate-800 text-[11px] border border-slate-200">
                  ${m.calculation_formula || 'Data primer langsung dari pencatatan resmi / agregasi neraca.'}
                </div>

                <h4 class="font-bold text-slate-800 text-[11px] uppercase font-mono mt-3">3. Batasan & Limitasi Data</h4>
                <p class="text-slate-600 text-[11px] font-sans leading-relaxed">${m.data_limitations || 'Cakupan terbatas pada statistik resmi tingkat nasional.'}</p>
              </div>

              <div class="space-y-2 border border-slate-200 p-3 rounded bg-white font-mono text-[11px]">
                <h4 class="font-bold text-slate-800 uppercase">4. Metadata Teknis & Standarisasi</h4>
                <div><strong>Lembaga Penerbit:</strong> ${m.publishing_institution}</div>
                <div><strong>Nama Dokumen:</strong> ${m.publication_document_name}</div>
                <div><strong>Cakupan Geografis:</strong> ${m.geographic_scope}</div>
                <div><strong>Rentang Periode:</strong> ${m.data_period_coverage}</div>
                <div><strong>Frekuensi Rilis:</strong> ${m.frequency}</div>
                <div><strong>Satuan Baku:</strong> ${m.unit}</div>
                <div><strong>Kebijakan Status:</strong> ${m.data_status_policy}</div>
                <div><strong>Referensi Tabel:</strong> ${m.reference_page_table || '—'}</div>
                <div><strong>Metodologi:</strong> <span class="font-sans">${m.methodology}</span></div>
                <div><strong>Catatan Metodologi:</strong> <span class="font-sans">${m.methodology_notes || '—'}</span></div>
                <div><strong>Catatan Revisi:</strong> <span class="font-sans">${m.revision_notes || '—'}</span></div>
                <div class="pt-2 border-t border-slate-100">
                  <strong>Tautan Sumber:</strong> <a href="${m.source_url}" target="_blank" class="text-sky-700 hover:underline break-all">${m.source_url}</a>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        const catalog = await ApiClient.fetchMetadataCatalog();
        content = `
          <div class="space-y-3">
            <p class="text-slate-600 font-sans text-xs">
              Katalog master 24 atribut metadata terstandarisasi untuk seluruh indikator basis data sekunder nasional.
            </p>
            <div class="gov-table-container">
              <table class="gov-table text-[11px] font-mono">
                <thead>
                  <tr>
                    <th>Indikator</th>
                    <th>Sektor & Kategori</th>
                    <th>Lembaga Sumber</th>
                    <th>Satuan</th>
                    <th>Frekuensi</th>
                    <th>Cakupan Periode</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  ${catalog.map(c => `
                    <tr>
                      <td class="font-sans font-semibold text-slate-900">
                        ${c.indicator_name}
                        <div class="text-[10px] font-mono text-slate-400">${c.unique_variable_code}</div>
                      </td>
                      <td class="font-sans">${c.sector} > ${c.category}</td>
                      <td>${c.publishing_institution}</td>
                      <td>${c.unit}</td>
                      <td>${c.frequency}</td>
                      <td>${c.data_period_coverage}</td>
                      <td>
                        <button class="gov-btn gov-btn-sm btn-view-single-meta" data-ind-id="${c.indicator_id}">
                          Detail 24 Atribut
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      this.openModal(indicatorId ? `KAMUS METADATA: ${indicatorId}` : 'KAMUS METADATA MASTER (24 ATRIBUT)', content);

      // Attach single meta view handlers if in catalog view
      if (!indicatorId) {
        document.querySelectorAll('.btn-view-single-meta').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-ind-id');
            this.showDictionaryModal(id);
          });
        });
      }
    } catch (err) {
      this.openModal('Error', `<div class="text-rose-600 font-mono">${err.message}</div>`);
    }
  }

  // 3. Source Registry Modal
  static async showRegistryModal() {
    try {
      const sources = await ApiClient.fetchSourcesRegistry();
      const content = `
        <div class="space-y-3">
          <p class="text-slate-600 font-sans text-xs">
            Katalog lembaga dan institusi resmi pemerintah penyedia basis data sekunder tingkat nasional Indonesia.
          </p>
          <div class="gov-table-container">
            <table class="gov-table text-[11px] font-mono">
              <thead>
                <tr>
                  <th>Source ID</th>
                  <th>Institusi / Lembaga</th>
                  <th>Tipe Format</th>
                  <th>Frekuensi</th>
                  <th>Metode Pembaruan</th>
                  <th>Status Registry</th>
                  <th>Pembaruan Terakhir</th>
                </tr>
              </thead>
              <tbody>
                ${sources.map(s => `
                  <tr>
                    <td class="font-bold text-slate-900">${s.id}</td>
                    <td class="font-sans">
                      <strong>${s.institution_name}</strong>
                      <div class="text-[10px] text-slate-500 font-mono">${s.dataset_name}</div>
                    </td>
                    <td><span class="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-bold">${s.source_type}</span></td>
                    <td>${s.frequency}</td>
                    <td>${s.update_method}</td>
                    <td><span class="status-badge status-observed">${s.status}</span></td>
                    <td class="text-slate-500">${s.last_successful_update || s.last_retrieval_date || '—'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      this.openModal('SOURCE REGISTRY RESMI (LEMBAGA PEMERINTAH)', content);
    } catch (err) {
      this.openModal('Error', `<div class="text-rose-600 font-mono">${err.message}</div>`);
    }
  }

  // 4. Classification Crosswalk & LKPP Financial Statements Modal
  static async showCrosswalkModal() {
    try {
      const lkpp = await ApiClient.fetchLkppFinancialStatements(2010);
      const rules = lkpp.crosswalk_rules || [];
      const lra = lkpp.lra_pendapatan || [];
      const neraca = lkpp.neraca || [];
      const arusKas = lkpp.arus_kas || [];

      const formatRp = (num) => {
        if (num === null || num === undefined || num === 0) return '0';
        return Number(num).toLocaleString('id-ID');
      };

      const content = `
        <div class="space-y-4 font-sans text-xs">
          <!-- Banner & Action Controls -->
          <div class="bg-slate-900 text-white rounded-lg p-4 flex items-center justify-between flex-wrap gap-3 border border-slate-700 shadow-md">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">HARMONISASI BAGAN AKUN STANDAR (BAS) & LAPORAN KEUANGAN LKPP AUDITED</span>
                <span class="bg-emerald-900/80 text-emerald-200 border border-emerald-500 text-[10px] font-mono px-2 py-0.5 rounded font-bold">BPK RI AUDITED</span>
              </div>
              <p class="text-[11px] text-slate-300 font-mono mt-1">
                Penyesuaian nomor biaya & pos historis ke nomor akun LKPP terbaru (PMK 214/2013 & PMK 102/2020) terintegrasi 1 file buku kerja.
              </p>
            </div>
            <button id="btn-export-crosswalk-excel" class="gov-btn bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-2 px-3.5 py-2 rounded shadow-lg transition-all cursor-pointer">
              <span>📥</span>
              <span>Download Buku LKPP & Crosswalk (.xlsx)</span>
            </button>
          </div>

          <!-- Sub-Tab Navigation -->
          <div class="flex items-center gap-2 border-b border-slate-200 pb-2 flex-wrap font-mono text-xs">
            <button class="cw-tab-btn px-3 py-1.5 rounded font-bold bg-slate-900 text-white shadow-xs" data-target="cw-tab-rules">
              🔀 1. Harmonisasi Crosswalk BAS
            </button>
            <button class="cw-tab-btn px-3 py-1.5 rounded font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors" data-target="cw-tab-lra">
              📜 2. LRA Pendapatan LKPP
            </button>
            <button class="cw-tab-btn px-3 py-1.5 rounded font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors" data-target="cw-tab-neraca">
              ⚖️ 3. Neraca Pemerintah Pusat
            </button>
            <button class="cw-tab-btn px-3 py-1.5 rounded font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors" data-target="cw-tab-aruskas">
              💵 4. Laporan Arus Kas (LAK)
            </button>
          </div>

          <!-- TAB CONTENT 1: CROSSWALK RULES -->
          <div id="cw-tab-rules" class="cw-tab-panel space-y-3">
            <div class="bg-amber-50 border border-amber-200 rounded p-3 text-amber-900 text-[11.5px]">
              <strong>Pedoman Penyesuaian Nomor Biaya:</strong> Mengelompokkan setiap komponen anggaran era dual-budgeting pra-2005 (Belanja Rutin & Pembangunan) serta pos penerimaan ke dalam nomor akun 6-digit Bagan Akun Standar (BAS) modern LKPP.
            </div>
            <div class="gov-table-container max-h-[50vh]">
              <table class="gov-table text-[11px] font-mono">
                <thead>
                  <tr>
                    <th>Sektor Anggaran</th>
                    <th>Klasifikasi / Nomor Biaya Lama (Pra-2005)</th>
                    <th>Nomor Akun & Nomenklatur BAS LKPP Terbaru</th>
                    <th>Aturan Pemetaan (Mapping Rule)</th>
                    <th>Tahun Berlaku</th>
                    <th>Catatan Transformasi Akuntansi</th>
                  </tr>
                </thead>
                <tbody>
                  ${rules.map(r => `
                    <tr>
                      <td class="font-sans font-medium text-slate-800">${r.sector}</td>
                      <td class="font-semibold text-rose-900 bg-rose-50/50">${r.original_classification}</td>
                      <td class="font-semibold text-emerald-900 bg-emerald-50/50">${r.standardized_classification}</td>
                      <td class="font-sans text-slate-600">${r.mapping_rule}</td>
                      <td class="text-center font-bold text-slate-700">${r.effective_start_year} - ${r.effective_end_year === 9999 ? 'Sekarang' : r.effective_end_year}</td>
                      <td class="font-sans text-[10.5px] text-slate-500">${r.transformation_note}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB CONTENT 2: LRA PENDAPATAN -->
          <div id="cw-tab-lra" class="cw-tab-panel hidden space-y-3">
            <div class="flex items-center justify-between text-xs font-mono text-slate-600">
              <div><strong>LAPORAN REALISASI ANGGARAN PENDAPATAN PEMERINTAH PUSAT</strong> (Dalam Rupiah)</div>
              <div class="text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Sumber: Daftar LRA-187 Audited BPK RI</div>
            </div>
            <div class="gov-table-container max-h-[50vh]">
              <table class="gov-table text-[11px] font-mono">
                <thead>
                  <tr>
                    <th>Kode Akun</th>
                    <th>Uraian Akun</th>
                    <th class="text-right">Anggaran (Rp)</th>
                    <th class="text-right">Realisasi TA 2010 (Rp)</th>
                    <th class="text-center">% Realisasi</th>
                    <th class="text-right">Realisasi TA 2009 (Rp)</th>
                    <th class="text-right">Kenaikan / (Penurunan) (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  ${lra.map(r => {
                    const indentClass = r.level === 1 ? 'font-bold text-slate-950 bg-slate-100' : (r.level === 2 ? 'font-bold text-slate-900 pl-3 bg-slate-50' : (r.level === 3 ? 'font-semibold text-slate-800 pl-6' : (r.level === 4 ? 'pl-8' : 'pl-10 text-slate-600')));
                    return `
                      <tr class="${r.level === 1 ? 'border-t-2 border-slate-300' : ''}">
                        <td class="font-bold ${r.level === 1 ? 'text-slate-950' : 'text-slate-700'}">${r.kode_akun}</td>
                        <td class="${indentClass} font-sans">${r.uraian_akun}</td>
                        <td class="text-right tabular-nums ${r.level <= 2 ? 'font-bold' : ''}">${r.anggaran ? formatRp(r.anggaran) : '—'}</td>
                        <td class="text-right tabular-nums font-bold text-slate-900">${formatRp(r.realisasi_current)}</td>
                        <td class="text-center font-bold text-emerald-800">${r.persen_realisasi}%</td>
                        <td class="text-right tabular-nums text-slate-600">${formatRp(r.realisasi_previous)}</td>
                        <td class="text-right tabular-nums ${r.kenaikan_penurunan >= 0 ? 'text-emerald-700' : 'text-rose-700'} font-semibold">
                          ${r.kenaikan_penurunan >= 0 ? '+' : ''}${formatRp(r.kenaikan_penurunan)}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB CONTENT 3: NERACA PEMERINTAH PUSAT -->
          <div id="cw-tab-neraca" class="cw-tab-panel hidden space-y-3">
            <div class="flex items-center justify-between text-xs font-mono text-slate-600">
              <div><strong>NERACA PEMERINTAH PUSAT (AUDITED BPK RI)</strong> (Dalam Rupiah)</div>
              <div class="text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Per 31 Desember 2010 dan 2009</div>
            </div>
            <div class="gov-table-container max-h-[50vh]">
              <table class="gov-table text-[11px] font-mono">
                <thead>
                  <tr>
                    <th>Kode Pos</th>
                    <th>Uraian Akun Pos Neraca</th>
                    <th class="text-center">Catatan</th>
                    <th class="text-right">31 Des 2010 (Audited) (Rp)</th>
                    <th class="text-right">31 Des 2009 (Audited) (Rp)</th>
                    <th class="text-right">Kenaikan / (Penurunan) (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  ${neraca.map(r => {
                    const indentClass = r.level === 1 ? 'font-bold text-slate-950 bg-slate-100 text-xs' : (r.level === 2 ? 'font-bold text-slate-900 pl-3 bg-slate-50' : (r.level === 3 ? 'font-semibold text-slate-800 pl-6' : 'pl-9 text-slate-600'));
                    return `
                      <tr class="${r.level === 1 ? 'border-t-2 border-slate-400 font-bold' : ''}">
                        <td class="font-bold">${r.kode_akun}</td>
                        <td class="${indentClass} font-sans">${r.uraian}</td>
                        <td class="text-center text-slate-500">${r.catatan}</td>
                        <td class="text-right tabular-nums font-bold text-slate-900">${formatRp(r.nilai_current)}</td>
                        <td class="text-right tabular-nums text-slate-600">${formatRp(r.nilai_previous)}</td>
                        <td class="text-right tabular-nums ${r.kenaikan_penurunan >= 0 ? 'text-emerald-700' : 'text-rose-700'} font-semibold">
                          ${r.kenaikan_penurunan >= 0 ? '+' : ''}${formatRp(r.kenaikan_penurunan)}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- TAB CONTENT 4: LAPORAN ARUS KAS -->
          <div id="cw-tab-aruskas" class="cw-tab-panel hidden space-y-3">
            <div class="flex items-center justify-between text-xs font-mono text-slate-600">
              <div><strong>LAPORAN ARUS KAS (LAK AUDITED BPK RI)</strong> (Dalam Rupiah)</div>
              <div class="text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Metode Langsung (Direct Method) SAP</div>
            </div>
            <div class="gov-table-container max-h-[50vh]">
              <table class="gov-table text-[11px] font-mono">
                <thead>
                  <tr>
                    <th>Kode Aktivitas</th>
                    <th>Uraian Aktivitas Arus Kas</th>
                    <th class="text-center">Catatan</th>
                    <th class="text-right">TA 2010 (Audited) (Rp)</th>
                    <th class="text-right">TA 2009 (Audited) (Rp)</th>
                    <th class="text-right">Kenaikan / (Penurunan) (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  ${arusKas.map(r => {
                    const indentClass = r.level === 1 ? 'font-bold text-slate-950 bg-slate-100' : (r.level === 2 ? 'font-bold text-slate-900 pl-3 bg-slate-50' : (r.level === 3 ? 'font-semibold text-slate-800 pl-6' : 'pl-9 text-slate-600'));
                    return `
                      <tr class="${r.level === 1 ? 'border-t-2 border-slate-300' : ''}">
                        <td class="font-bold">${r.kode_aktivitas}</td>
                        <td class="${indentClass} font-sans">${r.uraian}</td>
                        <td class="text-center text-slate-500">${r.catatan}</td>
                        <td class="text-right tabular-nums font-bold text-slate-900">${formatRp(r.nilai_current)}</td>
                        <td class="text-right tabular-nums text-slate-600">${formatRp(r.nilai_previous)}</td>
                        <td class="text-right tabular-nums ${r.kenaikan_penurunan >= 0 ? 'text-emerald-700' : 'text-rose-700'} font-semibold">
                          ${r.kenaikan_penurunan >= 0 ? '+' : ''}${formatRp(r.kenaikan_penurunan)}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;

      this.openModal('CROSSWALK: HARMONISASI BAS & LAPORAN KEUANGAN LKPP AUDITED', content);

      // Attach sub-tab switching handlers
      document.querySelectorAll('.cw-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-target');
          document.querySelectorAll('.cw-tab-panel').forEach(p => p.classList.add('hidden'));
          document.querySelectorAll('.cw-tab-btn').forEach(b => {
            b.classList.remove('bg-slate-900', 'text-white');
            b.classList.add('bg-slate-100', 'text-slate-700');
          });

          document.getElementById(targetId)?.classList.remove('hidden');
          btn.classList.remove('bg-slate-100', 'text-slate-700');
          btn.classList.add('bg-slate-900', 'text-white');
        });
      });

      // Attach Excel Download handler
      document.getElementById('btn-export-crosswalk-excel')?.addEventListener('click', () => {
        ExcelExporter.exportCrosswalkLKPPWorkbook(lkpp);
      });
    } catch (err) {
      this.openModal('Error', `<div class="text-rose-600 font-mono">${err.message}</div>`);
    }
  }

  // 5. Ingestion & Validation Sandbox Modal
  static async showIngestionModal() {
    try {
      const valLogs = await ApiClient.fetchValidationLogs(10);
      const updLogs = await ApiClient.fetchUpdateLogs(10);

      const content = `
        <div class="space-y-4 font-sans text-xs">
          <!-- Trigger Connectors -->
          <div class="gov-card p-4 bg-slate-50 border border-slate-200 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-bold font-mono text-slate-900 text-xs">SIMULASI KONEKTOR DATA INGESTION</h4>
                <p class="text-[11px] text-slate-500 font-mono">Uji pipa ingestion: Source Registry -> Parser -> DataValidator -> Versioning -> Audit Log</p>
              </div>
              <span class="text-[10px] font-mono bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded font-semibold">
                DEMO CONNECTOR
              </span>
            </div>

            <div class="flex items-center gap-3 flex-wrap pt-2">
              <button id="btn-run-ingest-api" class="gov-btn gov-btn-primary font-mono text-xs">
                ▶ Jalankan Konektor API (BPS)
              </button>
              <button id="btn-run-ingest-csv" class="gov-btn font-mono text-xs">
                ▶ Jalankan Konektor CSV (Kemenkeu Pajak)
              </button>
              <button id="btn-run-ingest-pdf" class="gov-btn font-mono text-xs">
                ▶ Jalankan Ekstraksi PDF (LKPP Audited)
              </button>
            </div>
            <div id="ingestion-result-box" class="hidden font-mono text-xs p-3 rounded bg-white border border-slate-200"></div>
          </div>

          <!-- Live Audit Logs 2-Column -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Validation Logs -->
            <div class="space-y-2">
              <h4 class="font-bold font-mono text-slate-800 text-[11px] uppercase">10 Log Validasi Terakhir (Data Quality)</h4>
              <div class="gov-table-container max-h-[220px]">
                <table class="gov-table text-[10px] font-mono">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Rule</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${valLogs.map(l => `
                      <tr>
                        <td>
                          <span class="status-badge ${l.status === 'PASSED' ? 'status-observed' : (l.status === 'FAILED' ? 'status-failed' : 'status-provisional')}">
                            ${l.status}
                          </span>
                        </td>
                        <td class="font-bold">${l.validation_rule}</td>
                        <td class="truncate max-w-[140px]" title="${l.error_details || ''}">${l.error_details || '—'}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Ingestion Update Logs -->
            <div class="space-y-2">
              <h4 class="font-bold font-mono text-slate-800 text-[11px] uppercase">10 Log Pembaruan Terakhir (Update Logs)</h4>
              <div class="gov-table-container max-h-[220px]">
                <table class="gov-table text-[10px] font-mono">
                  <thead>
                    <tr>
                      <th>Sumber</th>
                      <th>Status</th>
                      <th>Rekord</th>
                      <th>Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${updLogs.map(u => `
                      <tr>
                        <td class="font-bold">${u.source_id}</td>
                        <td><span class="status-badge ${u.status === 'SUCCESS' ? 'status-observed' : 'status-failed'}">${u.status}</span></td>
                        <td>+${u.records_inserted} ins, ${u.records_updated} rev</td>
                        <td class="text-slate-500">${u.execution_time_ms}ms</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `;

      this.openModal('INGESTION PIPELINE & AUDIT LOG VIEWER', content);

      // Attach ingestion run triggers
      const resultBox = document.getElementById('ingestion-result-box');
      const runTrigger = async (sourceId, type) => {
        if (!resultBox) return;
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = '<span class="text-slate-500">Menjalankan pipeline ingestion & validation engine...</span>';
        try {
          const res = await ApiClient.runConnectorIngestion(sourceId, type);
          resultBox.innerHTML = `
            <div class="space-y-1">
              <div class="font-bold ${res.success ? 'text-emerald-700' : 'text-rose-700'}">
                ${res.success ? '✓ Ingestion Pipeline Selesai:' : '✗ Ingestion Gagal:'} Batch ID: ${res.batch_id} (${res.status})
              </div>
              <div class="text-[11px] text-slate-700">
                Diproses: ${res.records_total} | Disisipkan: ${res.records_inserted} | Direvisi: ${res.records_updated} | Gagal Validasi: ${res.records_failed}
              </div>
              <div class="text-[10px] text-slate-400">Durasi Eksekusi: ${res.execution_time_ms} ms</div>
            </div>
          `;
        } catch (err) {
          resultBox.innerHTML = `<span class="text-rose-600">Error: ${err.message}</span>`;
        }
      };

      document.getElementById('btn-run-ingest-api')?.addEventListener('click', () => runTrigger('SRC-BPS', 'api'));
      document.getElementById('btn-run-ingest-csv')?.addEventListener('click', () => runTrigger('SRC-KEMENKEU-DJP', 'csv'));
      document.getElementById('btn-run-ingest-pdf')?.addEventListener('click', () => runTrigger('SRC-KEMENKEU-LKPP', 'pdf'));
    } catch (err) {
      this.openModal('Error', `<div class="text-rose-600 font-mono">${err.message}</div>`);
    }
  }
}
