// ==============================================================================
// KPI CARDS COMPONENT (Strictly Descriptive Metrics - No Predictive AI)
// ==============================================================================

export function renderKPICards(containerId, kpiData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!kpiData || !kpiData.indicator_id) {
    container.innerHTML = `
      <div class="gov-card p-6 text-center text-slate-400 font-mono text-xs">
        Pilih indikator spesifik untuk menampilkan ringkasan metrik deskriptif nasional.
      </div>
    `;
    return;
  }

  const formatNumber = (val) => {
    if (val === null || val === undefined) return '<span class="text-slate-400">N/A</span>';
    return Number(val).toLocaleString('id-ID', { maximumFractionDigits: 2 });
  };

  const getStatusBadge = (st) => {
    if (!st) return '';
    const stLower = st.toLowerCase();
    let cls = 'status-na';
    let label = st;
    if (stLower === 'observed') {
      cls = 'status-observed';
      label = 'Final';
    } else if (stLower === 'provisional') {
      cls = 'status-provisional';
      label = 'Sementara';
    } else if (stLower === 'revised') {
      cls = 'status-revised';
      label = 'Revisi';
    }
    return `<span class="status-badge ${cls}">${label}</span>`;
  };

  const yoyPct = kpiData.yoy_change_pct;
  const isPositive = yoyPct !== null && yoyPct > 0;
  const isNegative = yoyPct !== null && yoyPct < 0;
  const yoyColorClass = isPositive ? 'text-emerald-700' : (isNegative ? 'text-rose-700' : 'text-slate-700');
  const yoyArrow = isPositive ? '▲' : (isNegative ? '▼' : '—');

  container.innerHTML = `
    <div class="space-y-2">
      <!-- Section Title -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">RINGKASAN METRIK DESKRIPTIF NASIONAL</span>
          <span class="text-[11px] font-mono text-slate-500">[${kpiData.indicator_id}]</span>
        </div>
        <span class="text-[11px] font-mono text-slate-400">SATUAN: ${kpiData.unit || '—'}</span>
      </div>

      <!-- Metric Cards 6-Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <!-- 1. Nilai Terkini -->
        <div class="gov-card p-2.5 flex flex-col justify-between h-[92px] min-h-[92px] max-h-[92px]">
          <div class="text-[10px] font-mono uppercase text-slate-500 tracking-wider truncate">Nilai Terkini (${kpiData.latest_period || '—'})</div>
          <div class="text-lg font-bold font-mono tracking-tight text-slate-900 my-0.5 tabular-nums truncate">
            ${formatNumber(kpiData.latest_value)}
          </div>
          <div class="flex items-center justify-between text-[11px]">
            <span class="text-slate-400 font-mono text-[9.5px] truncate">${kpiData.unit}</span>
            ${getStatusBadge(kpiData.latest_status)}
          </div>
        </div>

        <!-- 2. Periode Sebelumnya -->
        <div class="gov-card p-2.5 flex flex-col justify-between h-[92px] min-h-[92px] max-h-[92px]">
          <div class="text-[10px] font-mono uppercase text-slate-500 tracking-wider truncate">Periode Sblm (${kpiData.previous_period || '—'})</div>
          <div class="text-lg font-semibold font-mono tracking-tight text-slate-700 my-0.5 tabular-nums truncate">
            ${formatNumber(kpiData.previous_value)}
          </div>
          <div class="text-[9.5px] text-slate-400 font-mono">
            Perbandingan t vs t-1
          </div>
        </div>

        <!-- 3. Pertumbuhan YoY -->
        <div class="gov-card p-2.5 flex flex-col justify-between h-[92px] min-h-[92px] max-h-[92px]">
          <div class="text-[10px] font-mono uppercase text-slate-500 tracking-wider truncate">Laju YoY (%)</div>
          <div class="text-lg font-bold font-mono tracking-tight ${yoyColorClass} my-0.5 tabular-nums flex items-center gap-1">
            <span>${yoyArrow}</span>
            <span>${yoyPct !== null ? `${Math.abs(yoyPct).toFixed(2)}%` : '—'}</span>
          </div>
          <div class="text-[9.5px] text-slate-500 font-mono truncate">
            Selisih: ${kpiData.yoy_change_abs !== null ? `${kpiData.yoy_change_abs > 0 ? '+' : ''}${formatNumber(kpiData.yoy_change_abs)}` : '—'}
          </div>
        </div>

        <!-- 4. Nilai Tertinggi Historis -->
        <div class="gov-card p-2.5 flex flex-col justify-between h-[92px] min-h-[92px] max-h-[92px]">
          <div class="text-[10px] font-mono uppercase text-slate-500 tracking-wider truncate">Nilai Tertinggi</div>
          <div class="text-lg font-bold font-mono tracking-tight text-slate-900 my-0.5 tabular-nums truncate">
            ${formatNumber(kpiData.highest_value)}
          </div>
          <div class="text-[9.5px] text-slate-500 font-mono truncate">
            Tercatat: <strong>${kpiData.highest_period || '—'}</strong>
          </div>
        </div>

        <!-- 5. Nilai Terendah Historis -->
        <div class="gov-card p-2.5 flex flex-col justify-between h-[92px] min-h-[92px] max-h-[92px]">
          <div class="text-[10px] font-mono uppercase text-slate-500 tracking-wider truncate">Nilai Terendah</div>
          <div class="text-lg font-bold font-mono tracking-tight text-slate-900 my-0.5 tabular-nums truncate">
            ${formatNumber(kpiData.lowest_value)}
          </div>
          <div class="text-[9.5px] text-slate-500 font-mono truncate">
            Tercatat: <strong>${kpiData.lowest_period || '—'}</strong>
          </div>
        </div>

        <!-- 6. Rata-Rata Nasional -->
        <div class="gov-card p-2.5 flex flex-col justify-between h-[92px] min-h-[92px] max-h-[92px]">
          <div class="text-[10px] font-mono uppercase text-slate-500 tracking-wider truncate">Rata-Rata Nasional</div>
          <div class="text-lg font-bold font-mono tracking-tight text-slate-900 my-0.5 tabular-nums truncate">
            ${formatNumber(kpiData.national_mean)}
          </div>
          <div class="text-[9.5px] text-slate-500 font-mono truncate">
            Dari ${kpiData.total_observed_periods} periode
          </div>
        </div>
      </div>
    </div>
  `;
}
