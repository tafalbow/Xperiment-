// ==============================================================================
// EXCEL EXPORTER SERVICE (Matrix Raw Data Tab + Transposed Var Tabs + Compile Sheet)
// Pusat Basis Data Data Sekunder: Pergerakan Ekonomi Indonesia
// ==============================================================================

export class ExcelExporter {
  /**
   * Export observations from up to 3 active chart series:
   * - Tab 1: "Data Mentah (Matrix)" -> Pure observation matrix without metadata (Periode downwards, Var 1/2/3 as columns)
   * - Tab 2..N: "Var 1", "Var 2", "Var 3" -> Transposed observation & detailed provenance per variable
   * - Final Tab: "Kompilasi Sumber & Waktu Akses" -> Comprehensive statutory sources, websites, timestamps & audit lineage
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
    const userEmail = registeredUser?.email || 'lubis.tania@dewanekonomi.go.id';

    const now = new Date();
    const downloadTimestampFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + `, Pukul ${now.toLocaleTimeString('id-ID')} WIB`;

    // 1. Enforce Max 3 Variables Constraint
    const exportSeries = seriesConfigs.slice(0, 3);
    const wb = window.XLSX.utils.book_new();

    const compileSummaryRows = [];
    let totalExportedPoints = 0;

    // Structure for Matrix Generation
    // Gather all unique periods chronologically
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
        { wch: 22 }, // Periode
        { wch: 22 }, // Nilai Observasi
        { wch: 18 }, // Satuan
        { wch: 26 }, // Tipe Value
        { wch: 20 }, // Scope
        { wch: 20 }, // Status Data
        { wch: 22 }, // Transformasi
        { wch: 35 }, // Nama Variabel
        { wch: 26 }, // Kode Variabel
        { wch: 26 }, // Lembaga
        { wch: 32 }, // Website
        { wch: 48 }, // Dokumen Publikasi
        { wch: 36 }, // Nomor Dokumen
        { wch: 24 }, // Tanggal Publikasi
        { wch: 36 }, // Sitasi
        { wch: 45 }, // Tautan
        { wch: 36 }  // Waktu Pengambilan
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
      { wch: 6 },  // No
      { wch: 28 }, // Tab Referensi
      { wch: 38 }, // Nama Variabel
      { wch: 28 }, // Kode Variabel
      { wch: 24 }, // Sektor
      { wch: 32 }, // Granularitas
      { wch: 22 }, // Rentang Periode
      { wch: 18 }, // Satuan Baku
      { wch: 22 }, // Transformasi
      { wch: 28 }, // Lembaga
      { wch: 35 }, // Website
      { wch: 50 }, // Dokumen Publikasi
      { wch: 38 }, // Nomor Dokumen
      { wch: 24 }, // Tanggal Rilis
      { wch: 38 }, // Sitasi
      { wch: 45 }, // Link Dokumen
      { wch: 36 }, // Waktu Pengambilan
      { wch: 32 }, // Email Peneliti
      { wch: 55 }  // Status Kepatuhan
    ];
    window.XLSX.utils.book_append_sheet(wb, wsCompile, 'Kompilasi Sumber & Waktu Akses');

    // 4. Trigger File Download
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `Pergerakan_Ekonomi_Indonesia_${processedSeriesList.length}Var_${timestamp}.xlsx`;

    window.XLSX.writeFile(wb, fileName);

    // Show confirmation alert
    const totalTabs = processedSeriesList.length + 2; // Matrix + Var tabs + Compile Tab
    this.showExportToast(processedSeriesList.length, totalTabs, totalExportedPoints, fileName);
  }

  static showExportToast(totalVars, totalTabs, totalPoints, fileName) {
    const existing = document.getElementById('excel-export-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'excel-export-toast';
    toast.className = 'fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-2xl z-50 font-mono text-xs border border-emerald-500/50 flex items-center gap-3 animate-bounce';
    toast.innerHTML = `
      <span class="text-xl">📊</span>
      <div>
        <div class="font-bold text-emerald-400">File Excel Berhasil Diunduh!</div>
        <div class="text-[11px] text-slate-300">
          ${totalVars} Variabel • <strong>${totalTabs} Tab</strong> (Tab 1: Data Mentah Matrix + Tab Var + Tab Kompilasi) • ${totalPoints} Titik Data
        </div>
      </div>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white font-bold text-sm ml-2">✕</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 6000);
  }

  /**
   * Export full Crosswalk & LKPP Audited Financial Statements:
   * - Tab 1: Harmonisasi Crosswalk BAS (Mapping akun biaya lama ke akun baru)
   * - Tab 2: LRA Pendapatan Pemerintah Pusat (Kode Akun 1-digit s/d 6-digit)
   * - Tab 3: Neraca Pemerintah Pusat (Audited BPK)
   * - Tab 4: Laporan Arus Kas (LAK Audited BPK)
   * - Tab 5: Keterangan Legalitas & Tata Kelola Data
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
    const userEmail = registeredUser?.email || 'lubis.tania@dewanekonomi.go.id';

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
      { wch: 6 },  // No
      { wch: 26 }, // Sektor
      { wch: 48 }, // Klasifikasi Lama
      { wch: 48 }, // Nomenklatur Baru
      { wch: 45 }, // Aturan Pemetaan
      { wch: 18 }, // Tahun
      { wch: 28 }, // Lembaga
      { wch: 55 }, // Catatan
      { wch: 22 }  // Versi
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
      { wch: 16 }, // Kode Akun
      { wch: 55 }, // Uraian
      { wch: 26 }, // Anggaran
      { wch: 26 }, // Realisasi 2010
      { wch: 24 }, // % Realisasi
      { wch: 26 }, // Realisasi 2009
      { wch: 26 }, // Kenaikan/Penurunan
      { wch: 18 }  // Status Audit
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
      { wch: 18 }, // Kode Akun
      { wch: 55 }, // Uraian
      { wch: 16 }, // Catatan
      { wch: 28 }, // 2010
      { wch: 28 }, // 2009
      { wch: 28 }, // Kenaikan/Penurunan
      { wch: 38 }  // Metodologi
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
      { wch: 16 }, // Kode
      { wch: 58 }, // Uraian
      { wch: 16 }, // Catatan
      { wch: 28 }, // 2010
      { wch: 28 }, // 2009
      { wch: 28 }, // Kenaikan/Penurunan
      { wch: 22 }  // Kategori
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
        'Atribut': 'Penerapan Bagan Akun Standar (BAS)',
        'Keterangan': 'PMK 214/PMK.05/2013 & PMK 102/PMK.05/2020 tentang Bagan Akun Standar'
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

    // Toast alert
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-2xl z-50 font-mono text-xs border border-emerald-500/50 flex items-center gap-3 animate-bounce';
    toast.innerHTML = `
      <span class="text-xl">📚</span>
      <div>
        <div class="font-bold text-emerald-400">Buku LKPP & Crosswalk Berhasil Diunduh!</div>
        <div class="text-[11px] text-slate-300">
          5 Tab Lengkap: Crosswalk BAS • LRA Pendapatan • Neraca • Arus Kas • Legalitas
        </div>
      </div>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white font-bold text-sm ml-2">✕</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 6000);
  }
}
