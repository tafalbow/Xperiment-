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
    const res = await fetch(`/api/apbn-eval/summary?year=${this.selectedYear}&unit=${this.selectedUnit}`);
    this.summaryData = await res.json();
  }

  async fetchMatrix() {
    const qParam = encodeURIComponent(this.searchKeyword || '');
    const res = await fetch(
      `/api/apbn-eval/matrix?year=${this.selectedYear}&category=${this.selectedCategory}&unit=${this.selectedUnit}&q=${qParam}`
    );
    this.matrixData = await res.json();
  }

  async fetchTrajectory() {
    const res = await fetch(
      `/api/apbn-eval/trajectory?year=${this.selectedYear}&item_id=${this.selectedChartItem}&unit=${this.selectedUnit}`
    );
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
                  Bulan Berjalan: <strong>${s.latest_month_name || 'Maret'}</strong> (${s.latest_month})
                </span>
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
                  title="Unduh Buku Kerja Excel 3 Sheet Berizin (Data Bulanan + YTD, Target Evaluasi, Provenans)"
                >
                  <span>📥</span>
                  <span>Excel (.xlsx)</span>
                </button>
                <button 
                  type="button" 
                  id="btn-apbn-eval-download-csv" 
                  class="px-2.5 py-1.5 bg-[#002B82] hover:bg-[#001D5A] text-white font-mono text-[10.5px] font-medium border-l border-[#0038A8]/60 cursor-pointer shadow-2xs"
                  title="Unduh Data Format CSV RFC-4180"
                >
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. EXECUTIVE KPI STRIP (5 BORDERLESS STATUTORY CARDS) -->
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
              <span>Target APBN:</span>
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
              <span>Pagu APBN:</span>
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
                YTD
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
                Bulan ${s.latest_month}
              </span>
            </div>
            <div class="text-lg font-bold text-[#2C2420]">
              ${s.benchmark_run_rate || 25.0}% <span class="text-xs font-normal text-[#7D655C]">Linier</span>
            </div>
            <div class="text-[10.5px] text-[#5D4037]">
              Pencapaian ${s.latest_month_name} vs Benchmark Rata-Rata Linier 8.33% / Bulan
            </div>
            <div class="text-[10px] text-[#2D684C] font-semibold pt-0.5 border-t border-[#FAF7F2]">
              Kondisi Fiskal: Terjaga & On-Track
            </div>
          </div>
        </div>

        <!-- 3. INTERACTIVE TRAJECTORY & S-CURVE SECTION -->
        <div class="gov-card p-4 sm:p-5 bg-white rounded-lg shadow-2xs space-y-[6px]">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#FAF7F2]">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#2C2420] flex items-center gap-1.5">
                <span>📈</span>
                <span>TRAJECTORY BULANAN & KURVA S-CURVE AKUMULATIF (JANUARI – DESEMBER)</span>
              </span>
              <span class="text-[10px] font-mono bg-[#EBF1FC] text-[#0038A8] px-2 py-0.5 rounded font-semibold">
                ${this.trajectoryData?.item_name || 'PENDAPATAN NEGARA'}
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
                <option value="EXP_TOTAL" ${this.selectedChartItem === 'EXP_TOTAL' ? 'selected' : ''}>Belanja Negara (Total)</option>
                <option value="EXP_BPP" ${this.selectedChartItem === 'EXP_BPP' ? 'selected' : ''}>Belanja Pemerintah Pusat (BPP)</option>
                <option value="EXP_TKD" ${this.selectedChartItem === 'EXP_TKD' ? 'selected' : ''}>Transfer ke Daerah (TKD)</option>
                <option value="DEFISIT_ANGGARAN" ${this.selectedChartItem === 'DEFISIT_ANGGARAN' ? 'selected' : ''}>Defisit Anggaran</option>
              </select>
            </div>
          </div>

          <!-- Chart Sub-info & Legend -->
          <div class="flex items-center justify-between flex-wrap gap-2 text-[10.5px] font-mono text-[#7D655C]">
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
              Pagu APBN: <strong>${Number(this.trajectoryData?.apbn_total || 0).toLocaleString('id-ID')} ${unitLabel}</strong> | YTD: <strong>${Number(this.trajectoryData?.ytd_total || 0).toLocaleString('id-ID')} (${this.trajectoryData?.pct_apbn || 0}%)</strong>
            </div>
          </div>

          <!-- Canvas Container -->
          <div class="relative w-full h-[240px] sm:h-[280px]">
            <canvas id="apbn-eval-canvas" class="w-full h-full block"></canvas>
            <div id="apbn-eval-hover-tooltip" class="hidden absolute pointer-events-none bg-white p-2 rounded shadow-md border border-[#BCD0F7] text-xs font-mono text-[#2C2420] z-20"></div>
          </div>
        </div>

        <!-- 4. STATUTORY COMPARISON MATRIX TABLE (RAPBN vs UU APBN vs 12 MONTHS vs YTD) -->
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

          <!-- Table Container -->
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr class="bg-[#FAF7F2] text-[#5D4037] text-[10.5px] uppercase border-b border-[#FAF7F2]">
                  <th class="py-2.5 px-2.5 font-bold w-12 text-center">Kode</th>
                  <th class="py-2.5 px-2.5 font-bold min-w-[220px]">Pos Anggaran Postur APBN</th>
                  <th class="py-2.5 px-2 font-bold text-right">RAPBN</th>
                  <th class="py-2.5 px-2 font-bold text-right text-[#0038A8]">UU APBN</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Jan</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Feb</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Mar</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Apr</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Mei</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Jun</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Jul</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Agu</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Sep</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Okt</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Nov</th>
                  <th class="py-2.5 px-1.5 font-medium text-right">Des</th>
                  <th class="py-2.5 px-2.5 font-bold text-right bg-[#FAF7F2] text-[#0038A8]">YTD (${s.latest_month})</th>
                  <th class="py-2.5 px-2 font-bold text-center text-[#2D684C]">% APBN</th>
                  <th class="py-2.5 px-2 font-bold text-center text-[#7D655C]">% RAPBN</th>
                  <th class="py-2.5 px-2 font-medium text-right text-[#7D655C]">Sisa Pagu</th>
                  <th class="py-2.5 px-2 font-bold text-center">Status</th>
                  <th class="py-2.5 px-1.5 text-center">Grafik</th>
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

  renderTableRows() {
    const rows = this.matrixData?.rows || [];
    if (rows.length === 0) {
      return `
        <tr>
          <td colspan="22" class="py-8 text-center text-xs font-mono text-[#7D655C]">
            Tidak ada pos anggaran yang cocok dengan kata kunci "${this.searchKeyword}".
          </td>
        </tr>
      `;
    }

    const latestIdx = parseInt((this.summaryData?.latest_month || 'M03').replace('M', ''), 10);

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
        const cellClass = isCurrentOrPast ? 'text-[#2C2420] font-medium' : 'text-[#9E8A82] italic';
        return `<td class="py-2 px-1.5 text-right ${cellClass}">${formatNum(val)}</td>`;
      };

      return `
        <tr class="${rowBg} transition-colors">
          <td class="py-2 px-2 text-center text-[10px] text-[#7D655C] font-mono">${r.code}</td>
          <td class="py-2 px-2.5 ${padLeft} ${fontWeight} text-[11.5px]">
            <span class="cursor-pointer hover:text-[#0038A8] transition-colors btn-row-trajectory" data-item-id="${r.id}">
              ${r.name}
            </span>
          </td>
          <td class="py-2 px-2 text-right font-medium text-[#7D655C]">${formatNum(r.rapbn)}</td>
          <td class="py-2 px-2 text-right font-bold text-[#0038A8]">${formatNum(r.apbn)}</td>
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => renderMonthCell(i)).join('')}
          <td class="py-2 px-2.5 text-right font-bold bg-[#FAF7F2]/80 text-[#0038A8]">${formatNum(r.ytd_actual)}</td>
          <td class="py-2 px-2 text-center font-bold text-[#2D684C]">${r.pct_apbn}%</td>
          <td class="py-2 px-2 text-center text-[#7D655C]">${r.pct_rapbn}%</td>
          <td class="py-2 px-2 text-right text-[11px] text-[#7D655C]">${formatNum(r.variance_apbn)}</td>
          <td class="py-2 px-2 text-center">
            <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold ${r.perf_badge}">
              ${r.perf_status}
            </span>
          </td>
          <td class="py-2 px-1.5 text-center">
            <button 
              type="button" 
              class="btn-row-trajectory text-xs text-[#0038A8] hover:text-[#002B82] p-1 cursor-pointer transition-transform hover:scale-110" 
              data-item-id="${r.id}"
              title="Lihat Kurva Trajectory & S-Curve pos ini"
            >
              📈
            </button>
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

    // Chart Item Selector
    const selChartItem = document.getElementById('apbn-eval-chart-item-select');
    selChartItem?.addEventListener('change', async (e) => {
      this.selectedChartItem = e.target.value;
      await this.fetchTrajectory();
      this.render();
    });

    // Click on Row / Trajectory icon to chart
    const rowBtns = document.querySelectorAll('.btn-row-trajectory');
    rowBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const itemId = e.currentTarget.getAttribute('data-item-id');
        if (itemId && itemId !== this.selectedChartItem) {
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

    // 2. Render Monthly Actual Bars (Latar Belakang Biru Muda Transparan)
    const barWidth = Math.max(8, (plotW / 12) * 0.45);
    monthlyBars.forEach((bar, idx) => {
      const bx = getX(idx) - barWidth / 2;
      const yTop = getY(bar.value);
      const yBase = getY(0);
      const barH = yBase - yTop;

      ctx.fillStyle = bar.is_observed ? 'rgba(147, 181, 225, 0.45)' : 'rgba(229, 231, 235, 0.35)';
      ctx.fillRect(bx, yTop, barWidth, barH);

      // Label Bulan di Bawah
      ctx.fillStyle = '#7D655C';
      ctx.font = "10px 'Tahoma', Geneva, Verdana, sans-serif";
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

    // Interactive Hover Crosshair
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

        tooltip.classList.remove('hidden');
        tooltip.style.left = `${Math.min(w - 180, Math.max(10, getX(nearestIdx) + 12))}px`;
        tooltip.style.top = `${Math.min(h - 90, Math.max(10, my - 20))}px`;

        tooltip.innerHTML = `
          <div class="font-bold text-[#0038A8] border-b border-[#FAF7F2] pb-0.5 mb-1">
            Bulan: ${barPt?.label} (${barPt?.month})
          </div>
          <div>Realisasi Bulanan: <strong>${Number(barPt?.value || 0).toLocaleString('id-ID')}</strong></div>
          <div>Akumulasi YTD: <strong class="text-[#0038A8]">${Number(actPt?.value || 0).toLocaleString('id-ID')}</strong></div>
          <div>Target Linier: <strong>${Number(linPt?.value || 0).toLocaleString('id-ID')}</strong></div>
          <div class="text-[#7D655C]">Tahun Lalu YTD: ${Number(priorPt?.value || 0).toLocaleString('id-ID')}</div>
        `;
      }
    };

    canvas.onmouseleave = () => {
      if (tooltip) tooltip.classList.add('hidden');
    };
  }
}
