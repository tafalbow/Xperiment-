/**
 * ==============================================================================
 * INDOEKONOMI data — Indonesia Economic Data Observatory
 * Component: ApbnEvalView
 * Komparasi Statutori RAPBN vs Target UU APBN vs Realisasi Bulanan & Akumulasi YTD
 * Source: Laporan Resmi APBN KiTa (Kinerja dan Fakta) Kementerian Keuangan RI
 * ==============================================================================
 */

export class ApbnEvalView {
  constructor(containerId = 'apbn-eval-view-container') {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.selectedYear = 2025;
    this.selectedUnit = 'TRILLION'; // 'TRILLION' | 'BILLION'
    this.selectedCategory = 'ALL';  // 'ALL' | 'PENDAPATAN' | 'BELANJA' | 'KESEIMBANGAN' | 'PEMBIAYAAN'
    this.selectedChartItem = 'REV_TOTAL';
    this.searchKeyword = '';

    // Filter Waktu & Komparasi Kustom
    this.timePreset = 'YTD'; // 'YTD' | 'Q1' | 'S1' | 'Q3' | 'FULL' | 'CUSTOM'
    this.startMonth = 1;
    this.endMonth = 3; // Disinkronkan dengan latest published month tahun berjalan
    this.showYoYComparison = false;

    this.yearsList = [];
    this.summaryData = null;
    this.matrixData = null;
    this.trajectoryData = null;

    this.chartCanvas = null;
    this.chartCtx = null;
    this.isLoading = false;
  }

  async init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    this.renderSkeleton();
    await this.loadInitialData();
  }

  renderSkeleton() {
    this.container.innerHTML = `
      <div class="space-y-[6px]">
        <div class="gov-card p-6 bg-white rounded-lg text-center font-mono text-xs text-[#7D655C]">
          <div class="flex items-center justify-center gap-2">
            <span class="w-3 h-3 border-2 border-[#0038A8] border-t-transparent rounded-full animate-spin"></span>
            <span>Memuat Observatorium Komparasi RAPBN & Realisasi Bulanan APBN KiTa...</span>
          </div>
        </div>
      </div>
    `;
  }

  async loadInitialData() {
    this.isLoading = true;
    try {
      // 1. Fetch supported years
      const yRes = await fetch('/api/apbn-eval/years');
      const yData = await yRes.json();
      this.yearsList = yData.years || [];

      // Tentukan bulan akhir default berdasarkan tahun terpilih
      const curYrCfg = this.yearsList.find(y => y.year === this.selectedYear);
      if (curYrCfg && curYrCfg.latest_published_month) {
        this.endMonth = parseInt(curYrCfg.latest_published_month.replace('M', ''), 10);
      } else {
        this.endMonth = 12;
      }

      // 2. Fetch summary, matrix, trajectory concurrently
      await Promise.all([
        this.fetchSummary(),
        this.fetchMatrix(),
        this.fetchTrajectory()
      ]);

      this.render();
    } catch (err) {
      console.error('Failed to load APBN Evaluation data:', err);
      this.container.innerHTML = `
        <div class="gov-card p-6 bg-white text-center font-mono text-xs text-rose-700">
          Gagal memuat data evaluasi APBN: ${err.message}. Silakan muat ulang halaman.
        </div>
      `;
    } finally {
      this.isLoading = false;
    }
  }

  async fetchSummary() {
    const url = `/api/apbn-eval/summary?year=${this.selectedYear}&unit=${this.selectedUnit}&start_month=${this.startMonth}&end_month=${this.endMonth}`;
    const res = await fetch(url);
    this.summaryData = await res.json();
  }

  async fetchMatrix() {
    const qParam = encodeURIComponent(this.searchKeyword || '');
    const url = `/api/apbn-eval/matrix?year=${this.selectedYear}&category=${this.selectedCategory}&unit=${this.selectedUnit}&q=${qParam}&start_month=${this.startMonth}&end_month=${this.endMonth}`;
    const res = await fetch(url);
    this.matrixData = await res.json();
  }

  async fetchTrajectory() {
    const url = `/api/apbn-eval/trajectory?year=${this.selectedYear}&item_id=${this.selectedChartItem}&unit=${this.selectedUnit}`;
    const res = await fetch(url);
    this.trajectoryData = await res.json();
  }

  render() {
    if (!this.container) return;

    const s = this.summaryData || {};
    const kpi = s.kpi || {};
    const rev = kpi.revenue || {};
    const exp = kpi.expenditure || {};
    const def = kpi.deficit || {};
    const prim = kpi.primary_balance || {};
    const unitLabel = s.unit_label || (this.selectedUnit === 'TRILLION' ? 'Rp Triliun' : 'Rp Miliar');

    const tf = this.matrixData?.time_filter || {};
    const startMName = tf.start_month_name || 'Januari';
    const endMName = tf.end_month_name || s.latest_month_name || 'Maret';
    const isCustomTime = tf.is_custom_period;

    // Quick chart buttons definition
    const chartQuickItems = [
      { id: 'REV_TOTAL', label: 'Pendapatan Negara', icon: '🏛️', statusBadge: 'bg-emerald-50 text-emerald-700', badgeText: `${rev.pct_apbn || 0}% APBN` },
      { id: 'REV_TAX', label: 'Penerimaan Pajak', icon: '🧾', statusBadge: 'bg-emerald-50 text-emerald-700', badgeText: `${kpi.tax?.pct_apbn || 0}% APBN` },
      { id: 'REV_TAX_CUKAI', label: 'Cukai Hasil Tembakau', icon: '🏷️', statusBadge: 'bg-amber-50 text-amber-700', badgeText: 'Downtrading' },
      { id: 'REV_PNBP', label: 'Penerimaan PNBP', icon: '🪙', statusBadge: 'bg-emerald-50 text-emerald-700', badgeText: 'Dividen BUMN +' },
      { id: 'EXP_TOTAL', label: 'Belanja Negara', icon: '📦', statusBadge: 'bg-sky-50 text-sky-700', badgeText: `${exp.pct_apbn || 0}% APBN` },
      { id: 'EXP_BPP_MODAL', label: 'Belanja Modal K/L', icon: '🏗️', statusBadge: 'bg-amber-50 text-amber-700', badgeText: 'Lelang Dini' },
      { id: 'EXP_TKD', label: 'Transfer Daerah (TKD)', icon: '🗺️', statusBadge: 'bg-emerald-50 text-emerald-700', badgeText: `${kpi.tkd?.pct_apbn || 0}% APBN` },
      { id: 'DEFISIT_ANGGARAN', label: 'Defisit Anggaran', icon: '⚖️', statusBadge: 'bg-sky-50 text-sky-700', badgeText: `${def.pct_gdp_ytd || 0}% PDB` }
    ];

    const currentTrajectoryDrivers = this.trajectoryData?.drivers || {};
    const posDrivers = currentTrajectoryDrivers.positive || [];
    const negDrivers = currentTrajectoryDrivers.negative || [];
    const policyNote = currentTrajectoryDrivers.policy_note || 'Disiplin anggaran dan monitoring serapan secara berkala.';
    const trajSourceOrg = this.trajectoryData?.source_org || 'Kementerian Keuangan RI';

    this.container.innerHTML = `
      <div class="space-y-[6px]">

        <!-- 1. HEADER BANNER & ACTION CONTROLS (Google Analytics Clean Style - Strictly Borderless) -->
        <div class="gov-card p-4 sm:p-5 bg-white rounded-lg shadow-2xs space-y-[6px]">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#EBF1FC] text-[#0038A8]">
                  🏛️ APBN KiTa & RAPBN
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-semibold bg-[#EBF5EE] text-[#2D684C]">
                  ${s.status_label || 'Publikasi Kemenkeu RI'}
                </span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-mono text-[#7D655C] bg-[#FAF7F2]">
                  Bulan Berjalan Resmi: <strong>${s.latest_month_name || 'Maret'}</strong> (${s.latest_month})
                </span>
                ${isCustomTime ? `
                  <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-[#FDF3E9] text-[#A45517]">
                    ⏳ Filter Periode Kustom: ${startMName} – ${endMName}
                  </span>
                ` : ''}
              </div>
              <h1 class="text-base sm:text-lg font-bold text-[#2C2420] tracking-tight">
                Komparasi Statutori RAPBN vs Target UU APBN vs Realisasi Bulanan & YTD (${this.selectedYear})
              </h1>
              <p class="text-xs text-[#7D655C] font-sans leading-relaxed max-w-4xl">
                Harmonisasi komparasi target usulan pemerintah (Nota Keuangan RAPBN), target definitif DPR RI (UU APBN), realisasi bulanan kas negara, serta akumulasi Year-to-Date (YTD) bersumber dari publikasi resmi <strong>APBN KiTa (Kinerja dan Fakta)</strong> Kementerian Keuangan RI.
              </p>
            </div>

            <!-- Controls: Year Selector, Unit Toggle & Single-Click Downloads -->
            <div class="flex items-center gap-2 flex-wrap shrink-0">
              <!-- Year Selector -->
              <div class="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-md text-xs font-mono">
                <span class="text-[#7D655C] pl-1 font-semibold">Tahun:</span>
                <select id="apbn-eval-year-select" class="bg-white border-0 text-[#2C2420] font-bold px-2.5 py-1 rounded text-xs shadow-2xs cursor-pointer outline-none">
                  ${this.yearsList.map(y => `
                    <option value="${y.year}" ${y.year === this.selectedYear ? 'selected' : ''}>
                      TA ${y.year} ${y.is_running_year ? '(Berjalan)' : ''}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Unit Toggle -->
              <div class="inline-flex rounded-md p-0.5 bg-[#FAF7F2] text-xs font-mono">
                <button 
                  id="apbn-eval-unit-trillion" 
                  class="px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${this.selectedUnit === 'TRILLION' ? 'bg-white text-[#0038A8] shadow-2xs' : 'text-[#7D655C] hover:text-[#2C2420]'}"
                >
                  Rp Triliun
                </button>
                <button 
                  id="apbn-eval-unit-billion" 
                  class="px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${this.selectedUnit === 'BILLION' ? 'bg-white text-[#0038A8] shadow-2xs' : 'text-[#7D655C] hover:text-[#2C2420]'}"
                >
                  Rp Miliar
                </button>
              </div>

              <!-- Excel & CSV Export (Biru Benhur #0038A8) -->
              <div class="inline-flex rounded shadow-xs overflow-hidden shrink-0">
                <button 
                  type="button" 
                  id="btn-apbn-eval-download-excel" 
                  class="px-3 py-1.5 bg-[#0038A8] hover:bg-[#002B82] text-white font-mono text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  title="Unduh Buku Kerja Excel 3 Sheet Berizin (Data Bulanan + YTD, Target Evaluasi, Sumber Instansi)"
                >
                  <span>📥</span>
                  <span>Excel (.xlsx)</span>
                </button>
                <button 
                  type="button" 
                  id="btn-apbn-eval-download-csv" 
                  class="px-2.5 py-1.5 bg-[#002B82] hover:bg-[#001D5A] text-white font-mono text-[10.5px] font-medium border-l border-[#0038A8]/60 cursor-pointer shadow-2xs"
                  title="Unduh Data Format CSV RFC-4180 dengan Info Sumber Instansi"
                >
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. BILAH FILTER WAKTU & KUSTOMISASI KOMPARASI (Universal Period Comparison Toolbar) -->
        <div class="gov-card p-3 sm:p-4 bg-white rounded-lg shadow-2xs space-y-[6px]">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
            
            <!-- Left: Preset Buttons (YTD, Q1, S1, Q3, Full Year) -->
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[11px] font-mono font-bold text-[#2C2420] flex items-center gap-1 pr-1">
                <span>⏱️</span>
                <span>Filter Waktu Komparasi:</span>
              </span>
              <button 
                type="button" 
                data-preset="YTD" 
                class="btn-time-preset px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${this.timePreset === 'YTD' ? 'bg-[#0038A8] text-white shadow-2xs' : 'bg-[#FAF7F2] text-[#5D4037] hover:bg-[#EBF1FC] hover:text-[#0038A8]'}"
                title="Akumulasi hingga bulan rilis resmi terakhir"
              >
                s/d Bulan Berjalan (${s.latest_month_name || 'YTD'})
              </button>
              <button 
                type="button" 
                data-preset="Q1" 
                class="btn-time-preset px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${this.timePreset === 'Q1' ? 'bg-[#0038A8] text-white shadow-2xs' : 'bg-[#FAF7F2] text-[#5D4037] hover:bg-[#EBF1FC] hover:text-[#0038A8]'}"
                title="Triwulan I (Januari s/d Maret)"
              >
                Q1 (Jan - Mar)
              </button>
              <button 
                type="button" 
                data-preset="S1" 
                class="btn-time-preset px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${this.timePreset === 'S1' ? 'bg-[#0038A8] text-white shadow-2xs' : 'bg-[#FAF7F2] text-[#5D4037] hover:bg-[#EBF1FC] hover:text-[#0038A8]'}"
                title="Semester I (Januari s/d Juni)"
              >
                Semester 1 (Jan - Jun)
              </button>
              <button 
                type="button" 
                data-preset="Q3" 
                class="btn-time-preset px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${this.timePreset === 'Q3' ? 'bg-[#0038A8] text-white shadow-2xs' : 'bg-[#FAF7F2] text-[#5D4037] hover:bg-[#EBF1FC] hover:text-[#0038A8]'}"
                title="Hingga Triwulan III (Januari s/d September)"
              >
                Q3 (Jan - Sep)
              </button>
              <button 
                type="button" 
                data-preset="FULL" 
                class="btn-time-preset px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${this.timePreset === 'FULL' ? 'bg-[#0038A8] text-white shadow-2xs' : 'bg-[#FAF7F2] text-[#5D4037] hover:bg-[#EBF1FC] hover:text-[#0038A8]'}"
                title="Satu Tahun Anggaran Penuh (Januari s/d Desember)"
              >
                Jan - Des (Full)
              </button>
            </div>

            <!-- Right: Custom Month Range Dropdowns -->
            <div class="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span class="text-[#7D655C] font-semibold">Rentang Kustom:</span>
              <div class="flex items-center gap-1 bg-[#FAF7F2] p-0.5 rounded-md">
                <span class="text-[#7D655C] px-1 text-[11px]">Dari:</span>
                <select id="apbn-eval-start-month" class="bg-white border-0 text-[#2C2420] font-semibold px-2 py-0.5 rounded text-xs cursor-pointer outline-none">
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => `
                    <option value="${m}" ${m === this.startMonth ? 'selected' : ''}>
                      M${m.toString().padStart(2, '0')} (${this.getMonthName(m)})
                    </option>
                  `).join('')}
                </select>
                <span class="text-[#7D655C] px-1 text-[11px]">s/d:</span>
                <select id="apbn-eval-end-month" class="bg-white border-0 text-[#2C2420] font-semibold px-2 py-0.5 rounded text-xs cursor-pointer outline-none">
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => `
                    <option value="${m}" ${m === this.endMonth ? 'selected' : ''}>
                      M${m.toString().padStart(2, '0')} (${this.getMonthName(m)})
                    </option>
                  `).join('')}
                </select>
                <button 
                  type="button" 
                  id="btn-apply-custom-time" 
                  class="px-2.5 py-0.5 bg-[#0038A8] hover:bg-[#002B82] text-white rounded font-bold text-xs cursor-pointer shadow-2xs ml-0.5"
                >
                  Terapkan
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- 3. EXECUTIVE KPI STRIP (5 BORDERLESS STATUTORY CARDS) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 font-mono">
          <!-- KPI 1: Pendapatan Negara -->
          <div class="gov-card p-3.5 bg-white rounded-lg shadow-2xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-[#7D655C] uppercase tracking-wider font-bold">I. Pendapatan Negara</span>
              <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold bg-[#EBF5EE] text-[#2D684C]">
                ${rev.pct_apbn || 0}% APBN
              </span>
            </div>
            <div class="text-lg font-bold text-[#2D684C]">
              ${Number(rev.ytd || 0).toLocaleString('id-ID')} <span class="text-xs font-normal text-[#7D655C]">${this.selectedUnit === 'TRILLION' ? 'T' : 'M'}</span>
            </div>
            <div class="text-[10.5px] text-[#5D4037] flex items-center justify-between">
              <span>Target UU APBN:</span>
              <span class="font-bold">${Number(rev.apbn || 0).toLocaleString('id-ID')}</span>
            </div>
            <div class="text-[10px] text-[#7D655C] flex items-center justify-between pt-0.5 border-t border-[#FAF7F2]">
              <span>RAPBN: ${Number(rev.rapbn || 0).toLocaleString('id-ID')}</span>
              <span class="text-[#2D684C] font-semibold">${rev.pct_rapbn || 0}% RAPBN</span>
            </div>
          </div>

          <!-- KPI 2: Belanja Negara -->
          <div class="gov-card p-3.5 bg-white rounded-lg shadow-2xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-[#7D655C] uppercase tracking-wider font-bold">II. Belanja Negara</span>
              <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold bg-[#EBF1FC] text-[#0038A8]">
                ${exp.pct_apbn || 0}% APBN
              </span>
            </div>
            <div class="text-lg font-bold text-[#0038A8]">
              ${Number(exp.ytd || 0).toLocaleString('id-ID')} <span class="text-xs font-normal text-[#7D655C]">${this.selectedUnit === 'TRILLION' ? 'T' : 'M'}</span>
            </div>
            <div class="text-[10.5px] text-[#5D4037] flex items-center justify-between">
              <span>Pagu UU APBN:</span>
              <span class="font-bold">${Number(exp.apbn || 0).toLocaleString('id-ID')}</span>
            </div>
            <div class="text-[10px] text-[#7D655C] flex items-center justify-between pt-0.5 border-t border-[#FAF7F2]">
              <span>RAPBN: ${Number(exp.rapbn || 0).toLocaleString('id-ID')}</span>
              <span class="text-[#0038A8] font-semibold">${exp.pct_rapbn || 0}% RAPBN</span>
            </div>
          </div>

          <!-- KPI 3: Keseimbangan Primer -->
          <div class="gov-card p-3.5 bg-white rounded-lg shadow-2xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-[#7D655C] uppercase tracking-wider font-bold">Keseimbangan Primer</span>
              <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold bg-[#FAF7F2] text-[#5D4037]">
                ${startMName}–${endMName}
              </span>
            </div>
            <div class="text-lg font-bold ${(prim.ytd || 0) >= 0 ? 'text-[#2D684C]' : 'text-[#B76E79]'}">
              ${(prim.ytd || 0) >= 0 ? '+' : ''}${Number(prim.ytd || 0).toLocaleString('id-ID')} <span class="text-xs font-normal text-[#7D655C]">${this.selectedUnit === 'TRILLION' ? 'T' : 'M'}</span>
            </div>
            <div class="text-[10.5px] text-[#5D4037] flex items-center justify-between">
              <span>Target APBN:</span>
              <span class="font-bold">${Number(prim.apbn || 0).toLocaleString('id-ID')}</span>
            </div>
            <div class="text-[10px] text-[#7D655C] flex items-center justify-between pt-0.5 border-t border-[#FAF7F2]">
              <span>RAPBN:</span>
              <span>${Number(prim.rapbn || 0).toLocaleString('id-ID')}</span>
            </div>
          </div>

          <!-- KPI 4: Surplus / Defisit Anggaran -->
          <div class="gov-card p-3.5 bg-white rounded-lg shadow-2xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-[#7D655C] uppercase tracking-wider font-bold">Defisit Anggaran</span>
              <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold bg-[#FDF3E9] text-[#A45517]">
                ${def.pct_gdp_ytd || 0}% PDB
              </span>
            </div>
            <div class="text-lg font-bold ${(def.ytd || 0) <= 0 ? 'text-[#B76E79]' : 'text-[#2D684C]'}">
              ${Number(def.ytd || 0).toLocaleString('id-ID')} <span class="text-xs font-normal text-[#7D655C]">${this.selectedUnit === 'TRILLION' ? 'T' : 'M'}</span>
            </div>
            <div class="text-[10.5px] text-[#5D4037] flex items-center justify-between">
              <span>Pagu Defisit APBN:</span>
              <span class="font-bold">${Number(def.apbn || 0).toLocaleString('id-ID')} (${def.pct_gdp_apbn || 0}%)</span>
            </div>
            <div class="text-[10px] text-[#7D655C] flex items-center justify-between pt-0.5 border-t border-[#FAF7F2]">
              <span>RAPBN:</span>
              <span>${Number(def.rapbn || 0).toLocaleString('id-ID')}</span>
            </div>
          </div>

          <!-- KPI 5: Run-Rate & Benchmark Berjalan -->
          <div class="gov-card p-3.5 bg-white rounded-lg shadow-2xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-[#7D655C] uppercase tracking-wider font-bold">Run-Rate Benchmark</span>
              <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold bg-[#EBF1FC] text-[#0038A8]">
                M${this.endMonth.toString().padStart(2, '0')}
              </span>
            </div>
            <div class="text-lg font-bold text-[#2C2420]">
              ${s.benchmark_run_rate || 25.0}% <span class="text-xs font-normal text-[#7D655C]">Linier</span>
            </div>
            <div class="text-[10.5px] text-[#5D4037]">
              Pencapaian vs Standar Ideal Linier 8.33% / Bulan
            </div>
            <div class="text-[10px] text-[#2D684C] font-semibold pt-0.5 border-t border-[#FAF7F2]">
              Kondisi Fiskal: Terjaga & Disiplin
            </div>
          </div>
        </div>

        <!-- 4. INTERACTIVE TRAJECTORY, S-CURVE & DRIVERS ANALYSIS SECTION -->
        <div class="gov-card p-4 sm:p-5 bg-white rounded-lg shadow-2xs space-y-[6px]">
          
          <!-- Chart Header Bar: Title + Item Select -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#FAF7F2]">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#2C2420] flex items-center gap-1.5">
                <span>📈</span>
                <span>TRAJECTORY BULANAN & S-CURVE CAPAIAN (JANUARI – DESEMBER)</span>
              </span>
              <span class="text-[10px] font-mono bg-[#EBF1FC] text-[#0038A8] px-2 py-0.5 rounded font-semibold">
                ${this.trajectoryData?.item_name || 'PENDAPATAN NEGARA'}
              </span>
              <span class="text-[10px] font-mono bg-[#FAF7F2] text-[#5D4037] px-2 py-0.5 rounded border border-[#E2E8F0]">
                🏛️ ${trajSourceOrg}
              </span>
            </div>

            <!-- Pos Selector for Trajectory Chart -->
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[11px] font-mono text-[#7D655C] font-semibold">Pilih Pos Grafik:</span>
              <select id="apbn-eval-chart-item-select" class="bg-[#FAF7F2] text-[#2C2420] font-mono text-xs font-bold px-2.5 py-1 rounded border-0 shadow-2xs cursor-pointer outline-none">
                <option value="REV_TOTAL" ${this.selectedChartItem === 'REV_TOTAL' ? 'selected' : ''}>Pendapatan Negara (Total)</option>
                <option value="REV_TAX" ${this.selectedChartItem === 'REV_TAX' ? 'selected' : ''}>Penerimaan Perpajakan</option>
                <option value="REV_TAX_CUKAI" ${this.selectedChartItem === 'REV_TAX_CUKAI' ? 'selected' : ''}>Cukai (CHT, MMEA, EA)</option>
                <option value="REV_PNBP" ${this.selectedChartItem === 'REV_PNBP' ? 'selected' : ''}>Penerimaan PNBP</option>
                <option value="REV_PNBP_SDA" ${this.selectedChartItem === 'REV_PNBP_SDA' ? 'selected' : ''}>PNBP SDA (Migas & Minerba)</option>
                <option value="EXP_TOTAL" ${this.selectedChartItem === 'EXP_TOTAL' ? 'selected' : ''}>Belanja Negara (Total)</option>
                <option value="EXP_BPP" ${this.selectedChartItem === 'EXP_BPP' ? 'selected' : ''}>Belanja Pemerintah Pusat (BPP)</option>
                <option value="EXP_BPP_MODAL" ${this.selectedChartItem === 'EXP_BPP_MODAL' ? 'selected' : ''}>Belanja Modal</option>
                <option value="EXP_TKD" ${this.selectedChartItem === 'EXP_TKD' ? 'selected' : ''}>Transfer ke Daerah (TKD)</option>
                <option value="DEFISIT_ANGGARAN" ${this.selectedChartItem === 'DEFISIT_ANGGARAN' ? 'selected' : ''}>Defisit Anggaran</option>
              </select>
            </div>
          </div>

          <!-- Quick Chart Item Buttons (Direct Click with Driver Indicators) -->
          <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span class="text-[10px] font-mono text-[#7D655C] font-bold uppercase tracking-wider pr-1">Akses Cepat:</span>
            ${chartQuickItems.map(item => `
              <button 
                type="button" 
                data-item-id="${item.id}" 
                class="btn-quick-chart px-2 py-1 rounded text-[11px] font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${this.selectedChartItem === item.id ? 'bg-[#0038A8] text-white shadow-2xs font-bold' : 'bg-[#FAF7F2] text-[#2C2420] hover:bg-[#EBF1FC] hover:text-[#0038A8]'}"
              >
                <span>${item.icon}</span>
                <span>${item.label}</span>
                <span class="text-[9px] px-1 py-0.2 rounded font-bold ${this.selectedChartItem === item.id ? 'bg-white/20 text-white' : item.statusBadge}">
                  ${item.badgeText}
                </span>
              </button>
            `).join('')}
          </div>

          <!-- KETERANGAN DRIVER PENCAPAIAN (+/-) PANEL (Dedicated Institutional Card) -->
          <div class="gov-card p-3.5 bg-[#FAF7F2]/70 rounded-lg border-0 space-y-2 font-mono text-xs">
            <div class="flex items-center justify-between flex-wrap gap-1 border-b border-[#E2E8F0] pb-1.5">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#0038A8] animate-pulse"></span>
                <span class="font-bold text-[#2C2420] text-xs uppercase tracking-wide">
                  Analisis Driver Pencapaian (+/-): ${this.trajectoryData?.item_name || 'Pos Anggaran'}
                </span>
              </div>
              <div class="text-[10.5px] text-[#7D655C]">
                Capaian YTD: <strong class="text-[#0038A8]">${Number(this.trajectoryData?.ytd_total || 0).toLocaleString('id-ID')} ${unitLabel} (${this.trajectoryData?.pct_apbn || 0}% APBN)</strong>
              </div>
            </div>

            <!-- Two-column Drivers Grid: Positive (+) vs Negative (-) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-0.5">
              
              <!-- Column 1: Faktor Pendorong Positif (+) -->
              <div class="p-2.5 bg-white rounded-md shadow-2xs space-y-1.5">
                <div class="flex items-center gap-1.5 text-[#2D684C] font-bold text-[11px] uppercase tracking-wider">
                  <span>🟢</span>
                  <span>Faktor Pendorong Capaian Positif (+)</span>
                </div>
                <ul class="space-y-1 text-[11px] text-[#2C2420] font-sans leading-relaxed">
                  ${posDrivers.map(d => `
                    <li class="flex items-start gap-1.5">
                      <span class="text-[#2D684C] font-bold mt-0.5">✔</span>
                      <span>${d}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Column 2: Faktor Penekan / Penghambat Negatif (-) -->
              <div class="p-2.5 bg-white rounded-md shadow-2xs space-y-1.5">
                <div class="flex items-center gap-1.5 text-[#A45517] font-bold text-[11px] uppercase tracking-wider">
                  <span>🔴</span>
                  <span>Faktor Penekan / Kendala Realisasi (-)</span>
                </div>
                <ul class="space-y-1 text-[11px] text-[#2C2420] font-sans leading-relaxed">
                  ${negDrivers.map(d => `
                    <li class="flex items-start gap-1.5">
                      <span class="text-[#B76E79] font-bold mt-0.5">✖</span>
                      <span>${d}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

            </div>

            <!-- Bottom Note & Provenance -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#E2E8F0] text-[10.5px]">
              <div class="text-[#5D4037] flex items-center gap-1">
                <span class="font-bold text-[#0038A8]">💡 Implikasi Kebijakan:</span>
                <span>${policyNote}</span>
              </div>
              <div class="text-[#7D655C] shrink-0 font-mono text-[10px]">
                Dasar Evaluasi: Laporan Resmi APBN KiTa & Nota Keuangan TA ${this.selectedYear}
              </div>
            </div>
          </div>

          <!-- Chart Sub-info & Legend -->
          <div class="flex items-center justify-between flex-wrap gap-2 text-[10.5px] font-mono text-[#7D655C] pt-1">
            <div class="flex items-center gap-3 flex-wrap">
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-[#0038A8] inline-block"></span>
                <span>Akumulasi YTD Aktual (${this.selectedYear})</span>
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-1 bg-[#4E878C] inline-block"></span>
                <span>Target Linier APBN (${this.selectedYear})</span>
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-0.5 bg-[#9E8A82] border-t border-dashed border-[#9E8A82] inline-block"></span>
                <span>Realisasi TA ${this.selectedYear - 1} YTD</span>
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-sm bg-[#93B5E1] inline-block"></span>
                <span>Realisasi Bulanan</span>
              </span>
            </div>
            <div class="text-[10px] text-[#7D655C]">
              Pagu UU APBN: <strong>${Number(this.trajectoryData?.apbn_total || 0).toLocaleString('id-ID')} ${unitLabel}</strong> | YTD: <strong>${Number(this.trajectoryData?.ytd_total || 0).toLocaleString('id-ID')} (${this.trajectoryData?.pct_apbn || 0}%)</strong>
            </div>
          </div>

          <!-- Canvas Container -->
          <div class="relative w-full h-[250px] sm:h-[290px]">
            <canvas id="apbn-eval-canvas" class="w-full h-full block"></canvas>
            <div id="apbn-eval-hover-tooltip" class="hidden absolute pointer-events-none bg-white p-2.5 rounded shadow-lg border border-[#BCD0F7] text-xs font-mono text-[#2C2420] z-30 max-w-[280px]"></div>
          </div>
        </div>

        <!-- 5. STATUTORY COMPARISON MATRIX TABLE (RAPBN vs UU APBN vs 12 MONTHS vs YTD vs SUMBER DATA) -->
        <div class="gov-card p-4 sm:p-5 bg-white rounded-lg shadow-2xs space-y-[6px]">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-1 border-b border-[#FAF7F2]">
            
            <!-- Category Filter Tabs -->
            <div class="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-md text-xs font-mono flex-wrap" role="tablist">
              <button data-category="ALL" class="btn-apbn-cat px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${this.selectedCategory === 'ALL' ? 'bg-white text-[#0038A8] shadow-2xs' : 'text-[#7D655C] hover:text-[#2C2420]'}">
                Semua Pos
              </button>
              <button data-category="PENDAPATAN" class="btn-apbn-cat px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${this.selectedCategory === 'PENDAPATAN' ? 'bg-white text-[#0038A8] shadow-2xs' : 'text-[#7D655C] hover:text-[#2C2420]'}">
                Pendapatan
              </button>
              <button data-category="BELANJA" class="btn-apbn-cat px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${this.selectedCategory === 'BELANJA' ? 'bg-white text-[#0038A8] shadow-2xs' : 'text-[#7D655C] hover:text-[#2C2420]'}">
                Belanja
              </button>
              <button data-category="KESEIMBANGAN" class="btn-apbn-cat px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${this.selectedCategory === 'KESEIMBANGAN' ? 'bg-white text-[#0038A8] shadow-2xs' : 'text-[#7D655C] hover:text-[#2C2420]'}">
                Defisit & Primer
              </button>
              <button data-category="PEMBIAYAAN" class="btn-apbn-cat px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${this.selectedCategory === 'PEMBIAYAAN' ? 'bg-white text-[#0038A8] shadow-2xs' : 'text-[#7D655C] hover:text-[#2C2420]'}">
                Pembiayaan
              </button>
            </div>

            <!-- Instant Search Box -->
            <div class="relative w-full sm:w-64">
              <input 
                type="text" 
                id="apbn-eval-search-input" 
                value="${this.searchKeyword}" 
                placeholder="Cari pos anggaran / kode..." 
                class="w-full bg-[#FAF7F2] text-xs font-mono px-3 py-1.5 rounded text-[#2C2420] placeholder-[#9E8A82] border-0 outline-none focus:ring-1 focus:ring-[#BCD0F7]"
              />
              ${this.searchKeyword ? `<button id="apbn-eval-clear-search" class="absolute right-2 top-1.5 text-xs text-[#7D655C] hover:text-[#2C2420] cursor-pointer">✕</button>` : ''}
            </div>
          </div>

          <!-- Table Container (Horizontal Scroll) -->
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr class="bg-[#FAF7F2] text-[#5D4037] text-[10.5px] uppercase border-b border-[#FAF7F2]">
                  <th class="py-2.5 px-2 font-bold w-12 text-center">Kode</th>
                  <th class="py-2.5 px-2.5 font-bold min-w-[220px]">Pos Anggaran Postur APBN</th>
                  <th class="py-2.5 px-2 font-bold text-right">RAPBN</th>
                  <th class="py-2.5 px-2 font-bold text-right text-[#0038A8]">UU APBN</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(1) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Jan</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(2) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Feb</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(3) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Mar</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(4) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Apr</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(5) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Mei</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(6) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Jun</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(7) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Jul</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(8) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Agu</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(9) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Sep</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(10) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Okt</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(11) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Nov</th>
                  <th class="py-2.5 px-1.5 font-medium text-right ${this.isMonthInFilter(12) ? 'bg-[#EBF1FC] text-[#0038A8] font-bold' : ''}">Des</th>
                  <th class="py-2.5 px-2.5 font-bold text-right bg-[#FAF7F2] text-[#0038A8] whitespace-nowrap">
                    ${isCustomTime ? `Capaian (M${this.startMonth}-M${this.endMonth})` : `YTD (${s.latest_month})`}
                  </th>
                  <th class="py-2.5 px-2 font-bold text-center text-[#2D684C]">% APBN</th>
                  <th class="py-2.5 px-2 font-bold text-center text-[#7D655C]">% RAPBN</th>
                  <th class="py-2.5 px-2 font-medium text-right text-[#7D655C]">Sisa Pagu</th>
                  <th class="py-2.5 px-2 font-bold text-center">Status</th>
                  <th class="py-2.5 px-1.5 text-center">Grafik & Driver</th>
                  <!-- KOLOM PALING KANAN: Sumber Data / Instansi Pengampu -->
                  <th class="py-2.5 px-3 font-bold text-left min-w-[200px] text-[#0038A8] bg-[#FAF7F2]/80">
                    Sumber Data / Instansi Pengampu
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#FAF7F2]">
                ${this.renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    this.attachEvents();
    this.renderChart();
  }

  isMonthInFilter(mIdx) {
    return mIdx >= this.startMonth && mIdx <= this.endMonth;
  }

  getMonthName(mIdx) {
    const names = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return names[mIdx - 1] || `M${mIdx}`;
  }

  renderTableRows() {
    const rows = this.matrixData?.rows || [];
    if (rows.length === 0) {
      return `
        <tr>
          <td colspan="23" class="py-8 text-center text-xs font-mono text-[#7D655C]">
            Tidak ada pos anggaran yang cocok dengan kata kunci "${this.searchKeyword}".
          </td>
        </tr>
      `;
    }

    const latestIdx = parseInt((this.summaryData?.latest_month || 'M03').replace('M', ''), 10);
    const isCustomTime = this.matrixData?.time_filter?.is_custom_period;

    return rows.map(r => {
      const isHdr = r.is_header;
      const isTopLvl = r.level === 1;
      const padLeft = r.level === 1 ? 'pl-2' : (r.level === 2 ? 'pl-4' : 'pl-7');
      const fontWeight = isTopLvl ? 'font-bold text-[#2C2420]' : (isHdr ? 'font-semibold text-[#2C2420]' : 'text-[#5D4037]');
      const rowBg = isTopLvl ? 'bg-[#FAF7F2]/50 hover:bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]/30';

      const formatNum = (v) => {
        if (v === null || v === undefined) return '-';
        return Number(v).toLocaleString('id-ID', { maximumFractionDigits: 1 });
      };

      const renderMonthCell = (mIdx) => {
        const mCode = `M${mIdx.toString().padStart(2, '0')}`;
        const val = r.monthly?.[mCode];
        const isCurrentOrPast = mIdx <= latestIdx;
        const inFilter = this.isMonthInFilter(mIdx);
        let cellClass = isCurrentOrPast ? 'text-[#2C2420] font-medium' : 'text-[#9E8A82] italic';
        if (inFilter) {
          cellClass += ' bg-[#EBF1FC]/40 font-bold text-[#0038A8]';
        }
        return `<td class="py-2 px-1.5 text-right ${cellClass}">${formatNum(val)}</td>`;
      };

      const actualDisplay = isCustomTime ? r.period_actual : r.ytd_actual;
      const pctApbnDisplay = isCustomTime ? r.period_pct_apbn : r.pct_apbn;
      const pctRapbnDisplay = isCustomTime ? r.period_pct_rapbn : r.pct_rapbn;
      const varianceDisplay = isCustomTime ? r.period_variance : r.variance_apbn;

      return `
        <tr class="${rowBg} transition-colors">
          <td class="py-2 px-2 text-center text-[10px] text-[#7D655C] font-mono">${r.code}</td>
          <td class="py-2 px-2.5 ${padLeft} ${fontWeight} text-[11.5px]">
            <span class="cursor-pointer hover:text-[#0038A8] transition-colors btn-row-trajectory" data-item-id="${r.id}" title="Klik untuk memvisualisasikan grafik & driver pos ini">
              ${r.name}
            </span>
          </td>
          <td class="py-2 px-2 text-right font-medium text-[#7D655C]">${formatNum(r.rapbn)}</td>
          <td class="py-2 px-2 text-right font-bold text-[#0038A8]">${formatNum(r.apbn)}</td>
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => renderMonthCell(i)).join('')}
          <td class="py-2 px-2.5 text-right font-bold bg-[#FAF7F2]/80 text-[#0038A8]">${formatNum(actualDisplay)}</td>
          <td class="py-2 px-2 text-center font-bold text-[#2D684C]">${pctApbnDisplay}%</td>
          <td class="py-2 px-2 text-center text-[#7D655C]">${pctRapbnDisplay}%</td>
          <td class="py-2 px-2 text-right text-[11px] text-[#7D655C]">${formatNum(varianceDisplay)}</td>
          <td class="py-2 px-2 text-center">
            <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold ${r.perf_badge}">
              ${r.perf_status}
            </span>
          </td>
          <td class="py-2 px-1.5 text-center">
            <button 
              type="button" 
              class="btn-row-trajectory px-1.5 py-0.5 rounded bg-[#EBF1FC] hover:bg-[#D2E3FC] text-[#0038A8] text-[11px] font-mono font-bold cursor-pointer transition-transform hover:scale-105 inline-flex items-center gap-1" 
              data-item-id="${r.id}"
              title="Buka Kurva S-Curve dan Analisis Driver (+/-) pos ini"
            >
              <span>📈</span>
              <span>Driver</span>
            </button>
          </td>
          <!-- KOLOM PALING KANAN: Sumber Data / Instansi Pengampu -->
          <td class="py-2 px-3 text-left text-[10.5px] text-[#5D4037] font-mono whitespace-nowrap bg-[#FAF7F2]/40">
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] shadow-2xs font-medium text-[#2C2420]">
              <span class="text-[#0038A8]">🏛️</span>
              <span>${r.source_org || 'Kementerian Keuangan RI'}</span>
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  attachEvents() {
    // Year Selector
    const selYear = document.getElementById('apbn-eval-year-select');
    selYear?.addEventListener('change', async (e) => {
      this.selectedYear = parseInt(e.target.value, 10);
      const curYrCfg = this.yearsList.find(y => y.year === this.selectedYear);
      if (curYrCfg && curYrCfg.latest_published_month) {
        this.endMonth = parseInt(curYrCfg.latest_published_month.replace('M', ''), 10);
      } else {
        this.endMonth = 12;
      }
      this.startMonth = 1;
      this.timePreset = 'YTD';
      await this.refreshAll();
    });

    // Unit Toggles
    const btnTri = document.getElementById('apbn-eval-unit-trillion');
    const btnBil = document.getElementById('apbn-eval-unit-billion');
    btnTri?.addEventListener('click', async () => {
      if (this.selectedUnit !== 'TRILLION') {
        this.selectedUnit = 'TRILLION';
        await this.refreshAll();
      }
    });
    btnBil?.addEventListener('click', async () => {
      if (this.selectedUnit !== 'BILLION') {
        this.selectedUnit = 'BILLION';
        await this.refreshAll();
      }
    });

    // Excel & CSV Download
    const btnExcel = document.getElementById('btn-apbn-eval-download-excel');
    const btnCsv = document.getElementById('btn-apbn-eval-download-csv');
    btnExcel?.addEventListener('click', () => {
      window.location.href = `/api/apbn-eval/export?year=${this.selectedYear}&unit=${this.selectedUnit}&format=xlsx`;
    });
    btnCsv?.addEventListener('click', () => {
      window.location.href = `/api/apbn-eval/export?year=${this.selectedYear}&unit=${this.selectedUnit}&format=csv`;
    });

    // Time Preset Buttons (YTD, Q1, S1, Q3, FULL)
    const presetBtns = document.querySelectorAll('.btn-time-preset');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const preset = e.currentTarget.getAttribute('data-preset');
        this.timePreset = preset;
        const curYrCfg = this.yearsList.find(y => y.year === this.selectedYear);
        const maxM = curYrCfg?.latest_published_month ? parseInt(curYrCfg.latest_published_month.replace('M', ''), 10) : 12;

        if (preset === 'YTD') {
          this.startMonth = 1;
          this.endMonth = maxM;
        } else if (preset === 'Q1') {
          this.startMonth = 1;
          this.endMonth = 3;
        } else if (preset === 'S1') {
          this.startMonth = 1;
          this.endMonth = 6;
        } else if (preset === 'Q3') {
          this.startMonth = 1;
          this.endMonth = 9;
        } else if (preset === 'FULL') {
          this.startMonth = 1;
          this.endMonth = 12;
        }

        await Promise.all([this.fetchSummary(), this.fetchMatrix()]);
        this.render();
      });
    });

    // Custom Month Range Apply Button
    const btnApplyCustom = document.getElementById('btn-apply-custom-time');
    btnApplyCustom?.addEventListener('click', async () => {
      const sM = parseInt(document.getElementById('apbn-eval-start-month')?.value || '1', 10);
      const eM = parseInt(document.getElementById('apbn-eval-end-month')?.value || '12', 10);
      if (sM > eM) {
        alert('Bulan mulai tidak boleh lebih besar dari bulan selesai.');
        return;
      }
      this.startMonth = sM;
      this.endMonth = eM;
      this.timePreset = 'CUSTOM';
      await Promise.all([this.fetchSummary(), this.fetchMatrix()]);
      this.render();
    });

    // Category Filter Pills
    const catBtns = document.querySelectorAll('.btn-apbn-cat');
    catBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const cat = e.currentTarget.getAttribute('data-category');
        if (cat && cat !== this.selectedCategory) {
          this.selectedCategory = cat;
          await this.fetchMatrix();
          this.render();
        }
      });
    });

    // Search Input
    const searchInput = document.getElementById('apbn-eval-search-input');
    const clearSearch = document.getElementById('apbn-eval-clear-search');
    let searchDebounce = null;
    searchInput?.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(async () => {
        this.searchKeyword = e.target.value;
        await this.fetchMatrix();
        this.render();
      }, 250);
    });
    clearSearch?.addEventListener('click', async () => {
      this.searchKeyword = '';
      await this.fetchMatrix();
      this.render();
    });

    // Chart Item Dropdown Selector
    const selChartItem = document.getElementById('apbn-eval-chart-item-select');
    selChartItem?.addEventListener('change', async (e) => {
      this.selectedChartItem = e.target.value;
      await this.fetchTrajectory();
      this.render();
    });

    // Quick Chart Buttons
    const quickChartBtns = document.querySelectorAll('.btn-quick-chart');
    quickChartBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const itemId = e.currentTarget.getAttribute('data-item-id');
        if (itemId && itemId !== this.selectedChartItem) {
          this.selectedChartItem = itemId;
          await this.fetchTrajectory();
          this.render();
        }
      });
    });

    // Click on Row / Trajectory icon to chart & view drivers
    const rowBtns = document.querySelectorAll('.btn-row-trajectory');
    rowBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const itemId = e.currentTarget.getAttribute('data-item-id');
        if (itemId) {
          this.selectedChartItem = itemId;
          await this.fetchTrajectory();
          this.render();
          const canvasEl = document.getElementById('apbn-eval-canvas');
          canvasEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  async refreshAll() {
    this.renderSkeleton();
    await Promise.all([
      this.fetchSummary(),
      this.fetchMatrix(),
      this.fetchTrajectory()
    ]);
    this.render();
  }

  renderChart() {
    const canvas = document.getElementById('apbn-eval-canvas');
    if (!canvas || !this.trajectoryData) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const padLeft = 60;
    const padRight = 35;
    const padTop = 25;
    const padBottom = 35;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    const series = this.trajectoryData.series || {};
    const linearCurve = series.linear_curve || [];
    const actualCurve = series.actual_curve || [];
    const priorCurve = series.prior_curve || [];
    const monthlyBars = series.monthly_bars || [];

    // Hitung Min dan Max Nilai
    let allVals = [];
    linearCurve.forEach(p => allVals.push(p.value));
    actualCurve.forEach(p => allVals.push(p.value));
    priorCurve.forEach(p => allVals.push(p.value));
    monthlyBars.forEach(p => allVals.push(p.value));

    let minVal = Math.min(0, ...allVals);
    let maxVal = Math.max(10, ...allVals) * 1.12;
    const valRange = (maxVal - minVal) || 1;

    const getX = (idx) => padLeft + (idx / 11) * plotW;
    const getY = (val) => padTop + plotH - ((val - minVal) / valRange) * plotH;

    // 1. Grid Lines (5 Garis Horizontal)
    ctx.strokeStyle = '#F1F3F4';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#7D655C';
    ctx.font = "10px 'Tahoma', Geneva, Verdana, sans-serif";
    ctx.textAlign = 'right';

    for (let i = 0; i <= 4; i++) {
      const frac = i / 4;
      const yVal = minVal + frac * valRange;
      const yPos = getY(yVal);

      ctx.beginPath();
      ctx.moveTo(padLeft, yPos);
      ctx.lineTo(w - padRight, yPos);
      ctx.stroke();

      ctx.fillText(Number(yVal.toFixed(0)).toLocaleString('id-ID'), padLeft - 6, yPos + 3.5);
    }

    // Baseline 0 jika minVal < 0
    if (minVal < 0) {
      const y0 = getY(0);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(padLeft, y0);
      ctx.lineTo(w - padRight, y0);
      ctx.stroke();
    }

    // Highlight visual untuk rentang waktu bulan yang difilter
    if (this.startMonth > 1 || this.endMonth < 12) {
      const xStart = getX(this.startMonth - 1) - 14;
      const xEnd = getX(this.endMonth - 1) + 14;
      ctx.fillStyle = 'rgba(235, 241, 252, 0.4)';
      ctx.fillRect(xStart, padTop, xEnd - xStart, plotH);
    }

    // 2. Render Monthly Actual Bars (Latar Belakang Biru Muda Transparan)
    const barWidth = Math.max(8, (plotW / 12) * 0.45);
    monthlyBars.forEach((bar, idx) => {
      const bx = getX(idx) - barWidth / 2;
      const yTop = getY(bar.value);
      const yBase = getY(0);
      const barH = yBase - yTop;

      const inSelectedWindow = this.isMonthInFilter(idx + 1);
      if (bar.is_observed) {
        ctx.fillStyle = inSelectedWindow ? 'rgba(0, 56, 168, 0.65)' : 'rgba(147, 181, 225, 0.45)';
      } else {
        ctx.fillStyle = inSelectedWindow ? 'rgba(164, 85, 23, 0.35)' : 'rgba(229, 231, 235, 0.35)';
      }
      ctx.fillRect(bx, yTop, barWidth, barH);

      // Label Bulan di Bawah
      ctx.fillStyle = inSelectedWindow ? '#0038A8' : '#7D655C';
      ctx.font = inSelectedWindow ? "bold 10px 'Tahoma', Geneva, Verdana, sans-serif" : "10px 'Tahoma', Geneva, Verdana, sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(bar.label, getX(idx), h - 12);
    });

    // 3. Render Prior Year Curve (Garis Abu-abu Putus-putus)
    if (priorCurve.length > 1) {
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#9E8A82';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(priorCurve[0].value));
      priorCurve.forEach((p, idx) => ctx.lineTo(getX(idx), getY(p.value)));
      ctx.stroke();
      ctx.restore();
    }

    // 4. Render Linear Target APBN Trajectory (Teal #4E878C)
    if (linearCurve.length > 1) {
      ctx.strokeStyle = '#4E878C';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(linearCurve[0].value));
      linearCurve.forEach((p, idx) => ctx.lineTo(getX(idx), getY(p.value)));
      ctx.stroke();
    }

    // 5. Render Current Year Actual YTD Curve (Biru Benhur #0038A8)
    const latestIdx = this.trajectoryData.latest_month_idx || 3;
    const observedCurve = actualCurve.slice(0, latestIdx);
    const prognosaCurve = actualCurve.slice(latestIdx - 1);

    // Bagian Observed (Solid Biru Benhur)
    if (observedCurve.length > 0) {
      ctx.strokeStyle = '#0038A8';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(observedCurve[0].value));
      observedCurve.forEach((p, idx) => ctx.lineTo(getX(idx), getY(p.value)));
      ctx.stroke();

      // Anchor dots
      observedCurve.forEach((p, idx) => {
        ctx.fillStyle = '#0038A8';
        ctx.beginPath();
        ctx.arc(getX(idx), getY(p.value), 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Highlight titik YTD terakhir
      const lastPt = observedCurve[observedCurve.length - 1];
      const lastIdx = observedCurve.length - 1;
      const lx = getX(lastIdx);
      const ly = getY(lastPt.value);

      ctx.fillStyle = '#0038A8';
      ctx.font = "bold 10px 'Tahoma', Geneva, Verdana, sans-serif";
      ctx.textAlign = 'left';
      ctx.fillText(
        `YTD: ${Number(lastPt.value).toLocaleString('id-ID')}`,
        lx + 8,
        ly - 4
      );
    }

    // Bagian Prognosa (Dotted Biru Muda)
    if (prognosaCurve.length > 1) {
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#93B5E1';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(getX(latestIdx - 1), getY(prognosaCurve[0].value));
      prognosaCurve.forEach((p, idx) => ctx.lineTo(getX(latestIdx - 1 + idx), getY(p.value)));
      ctx.stroke();
      ctx.restore();
    }

    // Interactive Hover Crosshair & Tooltip with Monthly Driver Note
    const tooltip = document.getElementById('apbn-eval-hover-tooltip');
    canvas.onmousemove = (e) => {
      const cRect = canvas.getBoundingClientRect();
      const mx = e.clientX - cRect.left;
      const my = e.clientY - cRect.top;

      let nearestIdx = 0;
      let minDistance = Infinity;
      for (let i = 0; i < 12; i++) {
        const dist = Math.abs(getX(i) - mx);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = i;
        }
      }

      if (minDistance < 25 && tooltip) {
        const actPt = actualCurve[nearestIdx];
        const linPt = linearCurve[nearestIdx];
        const barPt = monthlyBars[nearestIdx];
        const priorPt = priorCurve[nearestIdx];
        const mDriver = barPt?.monthly_driver || '';

        tooltip.classList.remove('hidden');
        tooltip.style.left = `${Math.min(w - 240, Math.max(10, getX(nearestIdx) + 12))}px`;
        tooltip.style.top = `${Math.min(h - 120, Math.max(10, my - 20))}px`;

        tooltip.innerHTML = `
          <div class="font-bold text-[#0038A8] border-b border-[#FAF7F2] pb-0.5 mb-1 flex items-center justify-between">
            <span>Bulan: ${barPt?.label} (${barPt?.month})</span>
            <span class="text-[10px] px-1 py-0.2 rounded ${barPt?.is_observed ? 'bg-[#EBF5EE] text-[#2D684C]' : 'bg-[#FAF7F2] text-[#7D655C]'}">
              ${barPt?.is_observed ? 'Observed' : 'Prognosa'}
            </span>
          </div>
          <div>Realisasi Bulan Ini: <strong>${Number(barPt?.value || 0).toLocaleString('id-ID')}</strong></div>
          <div>Akumulasi YTD: <strong class="text-[#0038A8]">${Number(actPt?.value || 0).toLocaleString('id-ID')}</strong></div>
          <div>Target Linier APBN: <strong>${Number(linPt?.value || 0).toLocaleString('id-ID')}</strong></div>
          <div class="text-[#7D655C]">Realisasi TA Lalu: ${Number(priorPt?.value || 0).toLocaleString('id-ID')}</div>
          ${mDriver ? `
            <div class="mt-1.5 pt-1 border-t border-[#E2E8F0] text-[10px] text-[#2D684C] font-semibold leading-snug">
              💡 Driver Musiman: ${mDriver}
            </div>
          ` : ''}
        `;
      }
    };

    canvas.onmouseleave = () => {
      if (tooltip) tooltip.classList.add('hidden');
    };
  }
}
