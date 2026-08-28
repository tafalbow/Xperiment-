// ==============================================================================
// DATA GRID COMPONENT (Interactive National Observation Table & Modals Trigger)
// ==============================================================================

export class DataGrid {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onSortChange = options.onSortChange || (() => {});
    this.onPageChange = options.onPageChange || (() => {});
    this.onLimitChange = options.onLimitChange || (() => {});
    this.onViewProvenance = options.onViewProvenance || (() => {});
    this.onViewMetadata = options.onViewMetadata || (() => {});
    this.onViewRevision = options.onViewRevision || (() => {});

    this.data = [];
    this.totalRecords = 0;
    this.currentPage = 1;
    this.pageSize = 5; // Fix 5 data
    this.sortBy = 'period';
    this.sortOrder = 'DESC';

    this.render();
  }

  updateData({ records, total_records, page, page_size, sort_by, sort_order }) {
    this.data = records || [];
    this.totalRecords = total_records || 0;
    this.currentPage = page || 1;
    this.pageSize = 5; // Fix 5 data
    this.sortBy = sort_by || this.sortBy;
    this.sortOrder = sort_order || this.sortOrder;
    this.render();
  }

  render() {
    if (!this.container) return;

    const totalPages = Math.ceil(this.totalRecords / this.pageSize) || 1;
    const startRecord = this.totalRecords > 0 ? (this.currentPage - 1) * this.pageSize + 1 : 0;
    const endRecord = Math.min(this.currentPage * this.pageSize, this.totalRecords);

    const getStatusBadge = (st) => {
      const s = (st || 'N/A').toLowerCase();
      let cls = 'status-na';
      let label = st || 'N/A';
      let hint = 'Data belum tersedia resmi dalam publikasi';
      
      if (s === 'observed') {
        cls = 'status-observed';
        label = 'Final';
        hint = 'Data Realisasi Final / Angka Tetap (Definitif pasca audit BPK/BPS)';
      } else if (s === 'provisional') {
        cls = 'status-provisional';
        label = 'Sementara';
        hint = 'Data Rilis Awal Resmi / Angka Sementara (Belum diaudit final BPK)';
      } else if (s === 'revised') {
        cls = 'status-revised';
        label = 'Revisi';
        hint = 'Data Historis Resmi yang Disesuaikan (Perubahan tahun dasar/metodologi)';
      } else if (s.includes('failed')) {
        cls = 'status-failed';
      }
      return `<span class="status-badge ${cls} cursor-help" title="${hint}">${label}</span>`;
    };

    const getSortIndicator = (col) => {
      if (this.sortBy !== col) return '<span class="text-slate-300 ml-1">⇅</span>';
      return this.sortOrder === 'ASC' ? '<span class="text-slate-900 ml-1 font-bold">▲</span>' : '<span class="text-slate-900 ml-1 font-bold">▼</span>';
    };

    this.container.innerHTML = `
      <div class="gov-card p-4 space-y-3">
        <!-- Table Header Controls -->
        <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">TABEL OBSERVASI TINGKAT NASIONAL</span>
            <span class="text-[11px] font-mono text-slate-500">(${this.totalRecords} Rekord Terverifikasi)</span>
          </div>

          <!-- Fixed 5 Data Indicator -->
          <div class="flex items-center gap-2 text-xs">
            <span class="text-slate-500 font-mono text-[11px]">Tampilkan:</span>
            <span class="bg-slate-100 text-slate-800 font-mono font-bold text-xs px-2.5 py-1 rounded border border-slate-300 shadow-2xs">
              5 Data (Fix)
            </span>
          </div>
        </div>

        <!-- Tabular Grid Wrapper (Compact & Dense Layout) -->
        <div class="gov-table-container">
          <table class="gov-table">
            <thead>
              <tr>
                <th class="cursor-pointer py-2.5 px-3" data-sort="indicator_name">
                  Indikator Nasional ${getSortIndicator('indicator_name')}
                </th>
                <th class="cursor-pointer text-center py-2.5 px-2" data-sort="period" style="width: 85px;">
                  Periode ${getSortIndicator('period')}
                </th>
                <th class="text-center py-2.5 px-2" style="width: 95px;">
                  Cakupan
                </th>
                <th class="cursor-pointer text-right py-2.5 px-3" data-sort="value" style="width: 140px;">
                  Nilai Observasi ${getSortIndicator('value')}
                </th>
                <th class="text-left py-2.5 px-2" style="width: 105px;">
                  Satuan
                </th>
                <th class="text-center py-2.5 px-3 whitespace-nowrap" style="min-width: 270px; width: 280px;">
                  Keterangan & Dokumen Sumber
                </th>
              </tr>
            </thead>
            <tbody class="font-mono text-xs">
              ${this.data.length === 0 ? `
                <tr>
                  <td colspan="6" class="text-center py-6 text-slate-400">
                    Tidak ada catatan observasi yang memenuhi kriteria pencarian.
                  </td>
                </tr>
              ` : this.data.map(row => `
                <tr data-obs-id="${row.id}" data-ind-id="${row.indicator_id}" class="hover:bg-slate-50/80 transition-colors">
                  <td class="font-sans font-medium text-slate-900 py-2 px-3">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="font-semibold text-slate-900">${row.indicator_name || row.indicator_id}</span>
                      <span class="text-[10px] font-mono text-slate-500 bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                        ${row.unique_variable_code || ''}
                      </span>
                    </div>
                  </td>
                  <td class="text-center font-bold text-slate-800 py-2 px-2">
                    ${row.period}
                  </td>
                  <td class="text-center text-slate-600 font-sans text-[11px] py-2 px-2">
                    <span class="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-mono">
                      🇮🇩 ${row.geography || 'Indonesia'}
                    </span>
                  </td>
                  <td class="text-right font-bold text-slate-900 tabular-nums py-2 px-3 text-xs">
                    ${row.value !== null && row.value !== undefined ? Number(row.value).toLocaleString('id-ID', { maximumFractionDigits: 2 }) : '<span class="text-slate-400 font-normal">N/A</span>'}
                  </td>
                  <td class="text-left text-slate-600 text-[11px] py-2 px-2">
                    ${row.unit}
                  </td>
                  <td class="text-center py-2 px-3 whitespace-nowrap">
                    <div class="inline-flex items-center justify-center gap-2 whitespace-nowrap">
                      ${getStatusBadge(row.status)}
                      <button 
                        class="gov-btn gov-btn-sm btn-action-lineage text-[11px] py-1 px-2.5 inline-flex items-center gap-1 font-semibold bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 shadow-2xs transition-all cursor-pointer whitespace-nowrap" 
                        data-obs-id="${row.id}" 
                        title="Lihat Publikasi: ${row.publication_title || 'Publikasi Resmi'} • Diterbitkan oleh: ${row.source_institution || 'Kementerian Keuangan RI'}"
                      >
                        <span>🔍</span>
                        <span>Keterangan & Sumber</span>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div class="flex items-center justify-between text-xs font-mono text-slate-600 pt-2 flex-wrap gap-2">
          <div>
            Menampilkan <strong>${startRecord}</strong> - <strong>${endRecord}</strong> dari <strong>${this.totalRecords}</strong> observasi nasional
          </div>

          <div class="flex items-center gap-1.5">
            <button id="btn-page-prev" class="gov-btn gov-btn-sm" ${this.currentPage <= 1 ? 'disabled' : ''}>
              ◀ Sebelumnya
            </button>
            <span class="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-slate-800 font-semibold">
              ${this.currentPage} / ${totalPages}
            </span>
            <button id="btn-page-next" class="gov-btn gov-btn-sm" ${this.currentPage >= totalPages ? 'disabled' : ''}>
              Berikutnya ▶
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // Sort headers
    this.container.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-sort');
        const order = (this.sortBy === col && this.sortOrder === 'ASC') ? 'DESC' : 'ASC';
        this.onSortChange(col, order);
      });
    });

    // Page size
    const pageSizeSel = document.getElementById('grid-page-size');
    pageSizeSel?.addEventListener('change', (e) => {
      this.onLimitChange(parseInt(e.target.value) || 50);
    });

    // Prev / Next
    document.getElementById('btn-page-prev')?.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.onPageChange(this.currentPage - 1);
      }
    });

    document.getElementById('btn-page-next')?.addEventListener('click', () => {
      const totalPages = Math.ceil(this.totalRecords / this.pageSize) || 1;
      if (this.currentPage < totalPages) {
        this.onPageChange(this.currentPage + 1);
      }
    });

    // Action button clicks
    this.container.querySelectorAll('.btn-action-lineage').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const obsId = parseInt(btn.getAttribute('data-obs-id'));
        this.onViewProvenance(obsId);
      });
    });
  }
}
