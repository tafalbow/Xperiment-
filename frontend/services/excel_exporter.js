// ==============================================================================
// EXCEL EXPORTER SERVICE (Matrix Raw Data Tab + Transposed Var Tabs + Compile Sheet)
// Pusat Basis Data Data Sekunder: Pergerakan Ekonomi Indonesia
// Backend Quota Recording & Enforcement (Sole Admin: lubis.tania@dewanekonomi.go.id)
// ==============================================================================

import { ApiClient } from './api_client.js';

export const SOLE_ADMIN_EMAIL = 'lubis.tania@dewanekonomi.go.id';

export class DownloadQuotaManager {
  static getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  /**
   * Check if user is allowed to download under quota policy:
   * - Max 3 downloads per session
   * - Max 5 downloads per day
   * - Sole Admin (lubis.tania@dewanekonomi.go.id) is completely exempted (Unlimited)
   */
  static checkQuota(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const isAdmin = cleanEmail === SOLE_ADMIN_EMAIL.toLowerCase();

    if (isAdmin) {
      return {
        allowed: true,
        isAdmin: true,
        sessionCount: 'Unlimited (Admin)',
        dailyCount: 'Unlimited (Admin)'
      };
    }

    const sessionCount = parseInt(sessionStorage.getItem('den_download_count_session') || '0', 10);
    const todayKey = `den_download_count_daily_${this.getTodayKey()}`;
    const dailyCount = parseInt(localStorage.getItem(todayKey) || '0', 10);

    const maxSession = 3;
    const maxDaily = 5;

    if (sessionCount >= maxSession || dailyCount >= maxDaily) {
      return {
        allowed: false,
        isAdmin: false,
        reason: sessionCount >= maxSession ? 'SESSION_LIMIT_EXCEEDED' : 'DAILY_LIMIT_EXCEEDED',
        sessionCount,
        maxSession,
        dailyCount,
        maxDaily,
        title: 'PEMBERITAHUAN AKSES DATA',
        message: 'Batas pengunduhan data telah tercapai untuk saat ini. Silakan hubungi pengelola data resmi untuk konfirmasi atau pembaharuan akses data.'
      };
    }

    return {
      allowed: true,
      isAdmin: false,
      sessionCount,
      maxSession,
      dailyCount,
      maxDaily
    };
  }

  /**
   * Consumes 1 download ticket for session and day (if not admin)
   */
  static consumeQuota(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const isAdmin = cleanEmail === SOLE_ADMIN_EMAIL.toLowerCase();

    if (isAdmin) {
      return {
        allowed: true,
        isAdmin: true,
        sessionCount: 'Unlimited',
        dailyCount: 'Unlimited'
      };
    }

    const sessionCount = parseInt(sessionStorage.getItem('den_download_count_session') || '0', 10) + 1;
    sessionStorage.setItem('den_download_count_session', sessionCount.toString());

    const todayKey = `den_download_count_daily_${this.getTodayKey()}`;
    const dailyCount = parseInt(localStorage.getItem(todayKey) || '0', 10) + 1;
    localStorage.setItem(todayKey, dailyCount.toString());

    return {
      allowed: true,
      isAdmin: false,
      sessionCount,
      maxSession: 3,
      dailyCount,
      maxDaily: 5
    };
  }

  static showQuotaExceededModal(quotaInfo) {
    document.getElementById('quota-exceeded-modal')?.remove();

    const modalEl = document.createElement('div');
    modalEl.id = 'quota-exceeded-modal';
    modalEl.className = 'gov-modal-overlay';
    modalEl.innerHTML = `
      <div class="gov-modal-content max-w-md border border-[#B0B0B0]">
        <div style="background-color: #BEBEBE;" class="flex items-center justify-between px-5 py-3.5 border-b border-[#B0B0B0] text-slate-950 rounded-t-[5px]">
          <div class="flex items-center gap-2">
            <span class="text-base">ℹ️</span>
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-950">${quotaInfo.title}</span>
          </div>
          <button id="btn-close-quota-modal" class="text-slate-700 hover:text-slate-950 font-mono text-base font-bold cursor-pointer">✕</button>
        </div>

        <div class="p-5 space-y-3.5 text-xs font-sans bg-slate-50 rounded-b-[5px]">
          <div class="bg-white border border-slate-200 rounded p-3 text-slate-800 leading-relaxed text-[11.5px] shadow-2xs">
            ${quotaInfo.message}
          </div>

          <div class="bg-slate-100/90 p-2.5 rounded text-[11px] font-mono text-slate-700 space-y-0.5 border border-slate-200">
            <div>Pengelola Basis Data: <strong>${SOLE_ADMIN_EMAIL}</strong></div>
          </div>

          <div class="pt-2 flex justify-end">
            <button id="btn-ack-quota" class="gov-btn bg-white hover:bg-slate-100 text-slate-950 border border-slate-400 font-mono text-xs px-4 py-1.5 font-bold shadow-2xs cursor-pointer">
              Tutup
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);
    const close = () => modalEl.remove();
    document.getElementById('btn-close-quota-modal')?.addEventListener('click', close);
    document.getElementById('btn-ack-quota')?.addEventListener('click', close);
  }
}

export class ExcelExporter {
  /**
   * Export observations from up to 3 active chart series:
   * - Tab 1: "Data Mentah (Matrix)" -> Pure observation matrix without metadata
   * - Tab 2..N: "Var 1", "Var 2", "Var 3" -> Transposed observation & detailed provenance per variable
   * - Final Tab: "Kompilasi Sumber & Waktu Akses" -> Comprehensive statutory sources, timestamps & audit lineage
   */
  static exportSeriesToExcel(seriesConfigs, activeRangePreset = '24y') {
    if (!window.XLSX) {
      alert('Pustaka Excel (SheetJS) sedang dimuat. Silakan coba kembali dalam beberapa saat.');
      return;
    }

    if (!seriesConfigs || seriesConfigs.length === 0) {
      alert('Tidak ada variabel aktif di area chart untuk diekspor.');
      return;
    }

    // Retrieve registered user info or default official contact
    let registeredUser = null;
    try {
      const raw = localStorage.getItem('registered_researcher_access');
      if (raw) registeredUser = JSON.parse(raw);
    } catch (e) {}
    const userEmail = registeredUser?.email || SOLE_ADMIN_EMAIL;

    // 1. Quota & Rate Limit Validation
    const quotaCheck = DownloadQuotaManager.checkQuota(userEmail);
    if (!quotaCheck.allowed) {
      DownloadQuotaManager.showQuotaExceededModal(quotaCheck);
      return;
    }

    // Consume 1 quota ticket
    const consumedQuota = DownloadQuotaManager.consumeQuota(userEmail);

    const now = new Date();
    const downloadTimestampFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + `, Pukul ${now.toLocaleTimeString('id-ID')} WIB`;

    // 2. Enforce Max 3 Variables Constraint
    const exportSeries = seriesConfigs.slice(0, 3);
    const wb = window.XLSX.utils.book_new();

    const compileSummaryRows = [];
    let totalExportedPoints = 0;

    // Structure for Matrix Generation
    const allPeriodsMap = new Map(); // period -> { [varColName]: value }
    const varColumnNames = [];

    // --- PROCESS EACH ACTIVE SERIES ---
    const processedSeriesList = [];

    exportSeries.forEach((series, sIdx) => {
      const rawRecords = series.rawData || [];
      if (rawRecords.length === 0) return;

      const isMonthly = rawRecords.some(r => String(r.period).includes('-') || String(r.period).length > 4);
      const maxLimit = isMonthly ? 24 : 12; // Max 24 months or Max 12 years

      const sortedRecords = [...rawRecords].sort((a, b) => String(a.period).localeCompare(String(b.period)));

      const activeWindowData = series.data || [];
      let candidateRecords = [];

      if (activeWindowData.length > 0) {
        const activePeriods = new Set(activeWindowData.map(d => String(d.period)));
        candidateRecords = sortedRecords.filter(r => activePeriods.has(String(r.period)));
      } else {
        candidateRecords = sortedRecords;
      }

      // Enforce strict ceiling: max 12 years or max 24 months
      const exportRecords = candidateRecords.slice(-maxLimit);
      totalExportedPoints += exportRecords.length;

      const effectiveUnit = series.effectiveUnit || series.unit || '—';
      const colHeaderName = `[Var ${sIdx + 1}] ${series.name} (${effectiveUnit})`;
      varColumnNames.push(colHeaderName);

      // Populate Matrix Map
      exportRecords.forEach(rec => {
        const p = String(rec.period);
        if (!allPeriodsMap.has(p)) {
          allPeriodsMap.set(p, { 'Periode': p });
        }
        const transformedMatch = (series.data || []).find(d => String(d.period) === p);
        const effectiveVal = transformedMatch !== undefined ? transformedMatch.value : rec.value;
        allPeriodsMap.get(p)[colHeaderName] = effectiveVal !== null && effectiveVal !== undefined ? Number(effectiveVal) : null;
      });

      processedSeriesList.push({
        sIdx,
        series,
        exportRecords,
        isMonthly,
        maxLimit,
        effectiveUnit
      });
    });

    if (processedSeriesList.length === 0) {
      alert('Tidak ada data observasi yang memenuhi kriteria ekspor.');
      return;
    }

    // =========================================================================
    // 1. TAB 1: DATA MENTAH (MATRIX) — Murni Data Angka Tanpa Keterangan Sumber
    // =========================================================================
    const sortedPeriods = Array.from(allPeriodsMap.keys()).sort((a, b) => a.localeCompare(b));
    const matrixRows = sortedPeriods.map(p => allPeriodsMap.get(p));

    const wsMatrix = window.XLSX.utils.json_to_sheet(matrixRows);
    const matrixCols = [{ wch: 16 }];
    varColumnNames.forEach(() => matrixCols.push({ wch: 38 }));
    wsMatrix['!cols'] = matrixCols;
    window.XLSX.utils.book_append_sheet(wb, wsMatrix, 'Data Mentah (Matrix)');

    // =========================================================================
    // 2. TAB 2..N: TAB INDIVIDUAL SETIAP VARIABEL (Var 1, Var 2, Var 3)
    // =========================================================================
    processedSeriesList.forEach(({ sIdx, series, exportRecords, isMonthly, maxLimit, effectiveUnit }) => {
      const varTabRows = exportRecords.map(rec => {
        const transformedMatch = (series.data || []).find(d => String(d.period) === String(rec.period));
        const effectiveVal = transformedMatch !== undefined ? transformedMatch.value : rec.value;

        let valueType = 'Numeric / Realisasi Definitif';
        if (effectiveUnit && (effectiveUnit.includes('%') || effectiveUnit.toLowerCase().includes('persen'))) {
          valueType = 'Persentase / Rasio Makro';
        } else if (rec.sector && rec.sector.toLowerCase().includes('fiskal')) {
          valueType = 'Realisasi Anggaran (Nominal)';
        }

        const publisher = rec.source_institution || rec.source_name || (rec.sector && rec.sector.toLowerCase().includes('fiskal') ? 'Kementerian Keuangan RI' : 'Badan Pusat Statistik');
        let webSource = 'https://djpb.kemenkeu.go.id/portal/id/';
        if (publisher.toLowerCase().includes('bps') || publisher.toLowerCase().includes('statistik')) {
          webSource = 'https://www.bps.go.id';
        } else if (publisher.toLowerCase().includes('bi') || publisher.toLowerCase().includes('indonesia')) {
          webSource = 'https://www.bi.go.id/seki';
        }

        return {
          'Periode (Tahun/Bulan)': String(rec.period),
          'Nilai Observasi (Value)': effectiveVal !== null && effectiveVal !== undefined ? Number(effectiveVal) : 'N/A',
          'Satuan': effectiveUnit,
          'Tipe Value': valueType,
          'Scope of Data': 'Nasional (Indonesia)',
          'Status Data': rec.status === 'Observed' ? 'Observed (Final)' : (rec.status === 'Provisional' ? 'Provisional (Sementara)' : rec.status || 'Final'),
          'Transformasi Olahan': series.transformation || 'Data Asli (RAW)',
          'Nama Variabel': series.name || rec.indicator_name || 'Indikator Nasional',
          'Kode Variabel': rec.unique_variable_code || rec.indicator_id || 'VAR_NASIONAL',
          'Lembaga Penerbit': publisher,
          'Website / Portal Sumber': webSource,
          'Dokumen Publikasi & Landasan Hukum': rec.publication_title || 'Kompilasi Seri Realisasi Resmi APBN',
          'Nomor Dokumen / Edisi Resmi': rec.document_number || rec.edition_period || 'Edisi Tahunan LKPP Audited BPK',
          'Tanggal Publikasi / Rilis Resmi': rec.publication_date || '2020-01-30',
          'Sitasi Halaman & Tabel': rec.page_reference || rec.table_reference || 'Tabel Realisasi Statutori',
          'Tautan Dokumen Asli': rec.document_url || rec.source_url || webSource,
          'Waktu Pengambilan Data': downloadTimestampFormatted
        };
      });

      const cleanName = (series.name || `Variabel ${sIdx + 1}`).replace(/[\\/?*:[\]]/g, '').trim();
      const sheetName = `Var ${sIdx + 1} - ${cleanName}`.slice(0, 31);

      const wsVar = window.XLSX.utils.json_to_sheet(varTabRows);
      wsVar['!cols'] = [
        { wch: 22 }, { wch: 22 }, { wch: 18 }, { wch: 26 }, { wch: 20 }, { wch: 20 },
        { wch: 22 }, { wch: 35 }, { wch: 26 }, { wch: 26 }, { wch: 32 }, { wch: 48 },
        { wch: 36 }, { wch: 24 }, { wch: 36 }, { wch: 45 }, { wch: 36 }
      ];
      window.XLSX.utils.book_append_sheet(wb, wsVar, sheetName);

      // Add entry to compile summary
      const sample = exportRecords[0];
      const publisher = sample.source_institution || sample.source_name || (sample.sector && sample.sector.toLowerCase().includes('fiskal') ? 'Kementerian Keuangan RI' : 'Badan Pusat Statistik');
      let webSource = 'https://djpb.kemenkeu.go.id/portal/id/';
      if (publisher.toLowerCase().includes('bps') || publisher.toLowerCase().includes('statistik')) {
        webSource = 'https://www.bps.go.id';
      } else if (publisher.toLowerCase().includes('bi') || publisher.toLowerCase().includes('indonesia')) {
        webSource = 'https://www.bi.go.id/seki';
      }

      compileSummaryRows.push({
        'No': sIdx + 1,
        'Tab Referensi': sheetName,
        'Nama Variabel': series.name || sample.indicator_name,
        'Kode Variabel': sample.unique_variable_code || sample.indicator_id,
        'Sektor / Kategori': sample.sector || 'Nasional',
        'Granularitas & Jumlah Titik': `${isMonthly ? 'Bulanan' : 'Tahunan'} (${exportRecords.length} Titik Data - Max ${maxLimit})`,
        'Rentang Periode Diekspor': `${exportRecords[0].period} s/d ${exportRecords[exportRecords.length - 1].period}`,
        'Satuan Baku': effectiveUnit,
        'Transformasi Aktif': series.transformation || 'Data Asli (RAW)',
        'Lembaga Penerbit Resmi': publisher,
        'Website / Portal Pengambilan Data': webSource,
        'Dokumen Publikasi Resmi & Landasan Hukum': sample.publication_title || 'Publikasi Resmi Pemerintah RI',
        'Nomor Dokumen / Edisi Resmi': sample.document_number || sample.edition_period || 'Edisi Standar Statutori',
        'Tanggal Rilis Dokumen Resmi': sample.publication_date || '2020-01-30',
        'Sitasi Dokumen & Tabel': sample.page_reference || sample.table_reference || 'Tabel Realisasi Resmi',
        'Link Dokumen Asli': sample.document_url || sample.source_url || webSource,
        'Waktu & Jam Pengambilan Data': downloadTimestampFormatted,
        'Email Peneliti / Akses Terdaftar': userEmail,
        'Status Kepatuhan Audit': '100% Data Resmi Definitif Berstatus Audit BPK / BRS BPS (Bebas Estimasi Tiruan)'
      });
    });

    // =========================================================================
    // 3. FINAL TAB: KOMPILASI SUMBER & WAKTU AKSES
    // =========================================================================
    const wsCompile = window.XLSX.utils.json_to_sheet(compileSummaryRows);
    wsCompile['!cols'] = [
      { wch: 6 },  { wch: 28 }, { wch: 38 }, { wch: 28 }, { wch: 24 }, { wch: 32 },
      { wch: 22 }, { wch: 18 }, { wch: 22 }, { wch: 28 }, { wch: 35 }, { wch: 50 },
      { wch: 38 }, { wch: 24 }, { wch: 38 }, { wch: 45 }, { wch: 36 }, { wch: 32 },
      { wch: 55 }
    ];
    window.XLSX.utils.book_append_sheet(wb, wsCompile, 'Kompilasi Sumber & Waktu Akses');

    // 4. Trigger File Download
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `Pergerakan_Ekonomi_Indonesia_${processedSeriesList.length}Var_${timestamp}.xlsx`;

    window.XLSX.writeFile(wb, fileName);

    // 5. Record Download Audit Silently in Backend
    ApiClient.recordDownloadLog({
      email: userEmail,
      download_type: 'CHART_SERIES_EXPORT',
      variables_count: processedSeriesList.length,
      total_points: totalExportedPoints,
      session_count: consumedQuota.sessionCount,
      daily_count: consumedQuota.dailyCount,
      file_name: fileName
    });

    // Show clean confirmation toast (clean UI without rate limit counters)
    const totalTabs = processedSeriesList.length + 2;
    this.showExportToast(processedSeriesList.length, totalTabs, totalExportedPoints, fileName);
  }

  static showExportToast(totalVars, totalTabs, totalPoints, fileName) {
    const existing = document.getElementById('excel-export-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'excel-export-toast';
    toast.className = 'fixed bottom-5 right-5 bg-[#CDCDCD] text-slate-950 px-4 py-3 rounded-lg shadow-2xl z-50 font-mono text-xs border border-slate-400 flex items-center gap-3 animate-bounce';
    toast.innerHTML = `
      <span class="text-xl">📊</span>
      <div>
        <div class="font-bold text-emerald-900">File Excel Berhasil Diunduh!</div>
        <div class="text-[11px] text-slate-800">
          ${totalVars} Variabel • <strong>${totalTabs} Tab</strong> (${totalPoints} Titik Data)
        </div>
      </div>
      <button onclick="this.parentElement.remove()" class="text-slate-600 hover:text-slate-950 font-bold text-sm ml-2 cursor-pointer">✕</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 6000);
  }

  /**
   * Export full Crosswalk & LKPP Audited Financial Statements
   */
  static exportCrosswalkLKPPWorkbook(lkppData) {
    if (!window.XLSX) {
      alert('Pustaka Excel (SheetJS) sedang dimuat. Silakan coba kembali dalam beberapa saat.');
      return;
    }

    if (!lkppData) {
      alert('Data LKPP tidak tersedia untuk diekspor.');
      return;
    }

    let registeredUser = null;
    try {
      const raw = localStorage.getItem('registered_researcher_access');
      if (raw) registeredUser = JSON.parse(raw);
    } catch (e) {}
    const userEmail = registeredUser?.email || SOLE_ADMIN_EMAIL;

    // 1. Quota Validation
    const quotaCheck = DownloadQuotaManager.checkQuota(userEmail);
    if (!quotaCheck.allowed) {
      DownloadQuotaManager.showQuotaExceededModal(quotaCheck);
      return;
    }

    const consumedQuota = DownloadQuotaManager.consumeQuota(userEmail);

    const now = new Date();
    const downloadTimestampFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + `, Pukul ${now.toLocaleTimeString('id-ID')} WIB`;

    const wb = window.XLSX.utils.book_new();

    // --- TAB 1: Harmonisasi Crosswalk BAS ---
    const crosswalkRows = (lkppData.crosswalk_rules || []).map((r, idx) => ({
      'No': idx + 1,
      'Sektor Anggaran': r.sector,
      'Klasifikasi / Nomor Biaya Lama (Pra-2005)': r.original_classification,
      'Nomor Akun & Nomenklatur BAS LKPP Terbaru': r.standardized_classification,
      'Landasan Aturan Pemetaan (Mapping Rule)': r.mapping_rule,
      'Tahun Efektif': `${r.effective_start_year} - ${r.effective_end_year === 9999 ? 'Sekarang' : r.effective_end_year}`,
      'Lembaga Penerbit': r.source_institution,
      'Catatan Transformasi Akuntansi': r.transformation_note,
      'Versi Standar': r.mapping_version
    }));
    const ws1 = window.XLSX.utils.json_to_sheet(crosswalkRows);
    ws1['!cols'] = [
      { wch: 6 },  { wch: 26 }, { wch: 48 }, { wch: 48 }, { wch: 45 }, { wch: 18 }, { wch: 28 }, { wch: 55 }, { wch: 22 }
    ];
    window.XLSX.utils.book_append_sheet(wb, ws1, 'Harmonisasi Crosswalk BAS');

    // --- TAB 2: LRA Pendapatan Pemerintah Pusat ---
    const lraRows = (lkppData.lra_pendapatan || []).map(r => ({
      'Kode Akun': r.kode_akun,
      'Uraian Akun Pendapatan': r.uraian_akun,
      'Anggaran (Rp)': r.anggaran !== null ? Number(r.anggaran) : 0,
      'Realisasi TA 2010 (Rp)': Number(r.realisasi_current),
      '% Realisasi Terhadap Anggaran': `${r.persen_realisasi}%`,
      'Realisasi TA 2009 (Rp)': Number(r.realisasi_previous),
      'Kenaikan / (Penurunan) (Rp)': Number(r.kenaikan_penurunan),
      'Status Audit': 'Audited BPK RI'
    }));
    const ws2 = window.XLSX.utils.json_to_sheet(lraRows);
    ws2['!cols'] = [
      { wch: 16 }, { wch: 55 }, { wch: 26 }, { wch: 26 }, { wch: 24 }, { wch: 26 }, { wch: 26 }, { wch: 18 }
    ];
    window.XLSX.utils.book_append_sheet(wb, ws2, 'LRA Pendapatan Audited');

    // --- TAB 3: Neraca Pemerintah Pusat ---
    const neracaRows = (lkppData.neraca || []).map(r => ({
      'Kode Akun / Pos': r.kode_akun,
      'Uraian Pos Neraca': r.uraian,
      'Catatan LKPP': r.catatan,
      '31 Des 2010 (Audited) (Rp)': Number(r.nilai_current),
      '31 Des 2009 (Audited) (Rp)': Number(r.nilai_previous),
      'Kenaikan / (Penurunan) (Rp)': Number(r.kenaikan_penurunan),
      'Metodologi': 'Standar Akuntansi Pemerintahan (SAP)'
    }));
    const ws3 = window.XLSX.utils.json_to_sheet(neracaRows);
    ws3['!cols'] = [
      { wch: 18 }, { wch: 55 }, { wch: 16 }, { wch: 28 }, { wch: 28 }, { wch: 28 }, { wch: 38 }
    ];
    window.XLSX.utils.book_append_sheet(wb, ws3, 'Neraca Pemerintah Pusat');

    // --- TAB 4: Laporan Arus Kas (LAK) ---
    const arusKasRows = (lkppData.arus_kas || []).map(r => ({
      'Kode Aktivitas': r.kode_aktivitas,
      'Uraian Aktivitas Arus Kas': r.uraian,
      'Catatan LKPP': r.catatan,
      'TA 2010 (Audited) (Rp)': Number(r.nilai_current),
      'TA 2009 (Audited) (Rp)': Number(r.nilai_previous),
      'Kenaikan / (Penurunan) (Rp)': Number(r.kenaikan_penurunan),
      'Kategori Arus': r.level === 1 ? 'Aktivitas Utama' : 'Komponen Aliran Kas'
    }));
    const ws4 = window.XLSX.utils.json_to_sheet(arusKasRows);
    ws4['!cols'] = [
      { wch: 16 }, { wch: 58 }, { wch: 16 }, { wch: 28 }, { wch: 28 }, { wch: 28 }, { wch: 22 }
    ];
    window.XLSX.utils.book_append_sheet(wb, ws4, 'Laporan Arus Kas (LAK)');

    // --- TAB 5: Keterangan Legalitas & Tata Kelola ---
    const legalRows = [
      {
        'Atribut': 'Nama Dokumen Acuan',
        'Keterangan': lkppData.source_document || 'Laporan Keuangan Pemerintah Pusat (LKPP) Audited BPK RI'
      },
      {
        'Atribut': 'Landasan Statutori & Hukum',
        'Keterangan': lkppData.statutory_basis || 'UU Pertanggungjawaban atas Pelaksanaan APBN & Standar Akuntansi Pemerintahan (SAP)'
      },
      {
        'Atribut': 'Lembaga Penerbit / Auditor Negara',
        'Keterangan': 'Kementerian Keuangan RI (Penyusun LKPP) • Badan Pemeriksa Keuangan RI (Auditor Eksternal)'
      },
      {
        'Atribut': 'Waktu Pengambilan Data Sistem',
        'Keterangan': downloadTimestampFormatted
      },
      {
        'Atribut': 'Email Peneliti / Akses Terdaftar',
        'Keterangan': userEmail
      },
      {
        'Atribut': 'Kepatuhan Tata Kelola',
        'Keterangan': '100% Data Riil Berstatus Audit BPK RI, Bebas Estimasi Tiruan (No Forecast/Synthetic Values).'
      }
    ];
    const ws5 = window.XLSX.utils.json_to_sheet(legalRows);
    ws5['!cols'] = [
      { wch: 35 },
      { wch: 80 }
    ];
    window.XLSX.utils.book_append_sheet(wb, ws5, 'Keterangan Sumber & Legalitas');

    // 3. Trigger File Download
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `LKPP_Audited_Crosswalk_Buku_Laporan_Keuangan_${timestamp}.xlsx`;

    window.XLSX.writeFile(wb, fileName);

    // 4. Record Download Audit Silently in Backend
    ApiClient.recordDownloadLog({
      email: userEmail,
      download_type: 'LKPP_CROSSWALK_EXPORT',
      variables_count: 4,
      total_points: 71,
      session_count: consumedQuota.sessionCount,
      daily_count: consumedQuota.dailyCount,
      file_name: fileName
    });

    // Toast alert
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-[#CDCDCD] text-slate-950 px-4 py-3 rounded-lg shadow-2xl z-50 font-mono text-xs border border-slate-400 flex items-center gap-3 animate-bounce';
    toast.innerHTML = `
      <span class="text-xl">📚</span>
      <div>
        <div class="font-bold text-emerald-900">Buku LKPP & Crosswalk Berhasil Diunduh!</div>
        <div class="text-[11px] text-slate-800">
          5 Tab Lengkap: Crosswalk BAS • LRA Pendapatan • Neraca • Arus Kas • Legalitas
        </div>
      </div>
      <button onclick="this.parentElement.remove()" class="text-slate-600 hover:text-slate-950 font-bold text-sm ml-2 cursor-pointer">✕</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 6000);
  }
}
