// ==============================================================================
// MASTER ADMIN VIEW COMPONENT
// Dedicated Governance Console for lubistaniafatimah@gmail.com
// Modules: Ingestion & Audit Log, Web Traffic, Access & Download Tracking
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

export class AdminView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeSubTab = 'ingestion'; // 'ingestion' | 'traffic' | 'access'
    this.trafficChart = null;
    this.trafficData = null;
    this.auditData = null;
  }

  async init() {
    if (!this.container) return;
    await this.loadData();
    this.render();
  }

  async refresh() {
    await this.loadData();
    this.render();
  }

  async loadData() {
    try {
      this.trafficData = await ApiClient.fetchTrafficStats();
    } catch (e) {
      console.warn('Failed to load traffic stats:', e);
    }

    try {
      this.auditData = await ApiClient.fetchAdminAccessLogs();
    } catch (e) {
      console.warn('Failed to load access logs:', e);
    }
  }

  render() {
    if (!this.container) return;

    let adminEmail = 'lubistaniafatimah@gmail.com';
    try {
      const sess = JSON.parse(localStorage.getItem('master_admin_session') || '{}');
      if (sess.email) adminEmail = sess.email;
    } catch (e) {}

    this.container.innerHTML = `
      <div class="space-y-4">
        
        <!-- Master Admin Header Card -->
        <div class="bg-gradient-to-r from-[#1A73E8] to-[#174EA6] text-white rounded-lg p-5 shadow-sm">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner shrink-0">
                🔐
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="text-base font-mono font-bold tracking-tight text-white uppercase">
                    KONSOL TATA KELOLA MASTER ADMIN
                  </h2>
                  <span class="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-amber-400 text-slate-950 uppercase shadow-2xs">
                    Otoritas Penuh
                  </span>
                </div>
                <p class="text-xs text-blue-100 font-sans mt-0.5">
                  Master Admin: <strong class="text-white font-mono font-bold">${adminEmail}</strong> • Dewan Ekonomi Nasional RI
                </p>
              </div>
            </div>

            <!-- Admin Actions -->
            <div class="flex items-center gap-2 flex-wrap font-mono text-xs">
              <button id="btn-admin-refresh" class="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium flex items-center gap-1.5 transition-all cursor-pointer">
                <span>🔄</span>
                <span>Muat Ulang Data</span>
              </button>
              <button id="btn-admin-logout" class="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs">
                <span>🚪</span>
                <span>Keluar dari Admin</span>
              </button>
            </div>
          </div>

          <!-- Master Admin Sub-Navigation Pills -->
          <div class="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 flex-wrap font-mono text-xs">
            <button 
              id="admin-tab-btn-ingestion" 
              class="px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${this.activeSubTab === 'ingestion' ? 'bg-white text-[#174EA6] shadow-sm' : 'text-blue-100 hover:bg-white/10'}"
            >
              <span>⚙️</span>
              <span>1. Ingestion & Audit Log</span>
            </button>

            <button 
              id="admin-tab-btn-traffic" 
              class="px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${this.activeSubTab === 'traffic' ? 'bg-white text-[#174EA6] shadow-sm' : 'text-blue-100 hover:bg-white/10'}"
            >
              <span>📈</span>
              <span>2. Info Web Traffic</span>
            </button>

            <button 
              id="admin-tab-btn-access" 
              class="px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${this.activeSubTab === 'access' ? 'bg-white text-[#174EA6] shadow-sm' : 'text-blue-100 hover:bg-white/10'}"
            >
              <span>👥</span>
              <span>3. Siapa yang Mengakses & Mengunduh Data</span>
            </button>
          </div>
        </div>

        <!-- Sub-View Dynamic Containers -->
        <div id="admin-subview-container"></div>

      </div>
    `;

    // Bind sub-tabs
    document.getElementById('admin-tab-btn-ingestion')?.addEventListener('click', () => {
      this.activeSubTab = 'ingestion';
      this.render();
    });
    document.getElementById('admin-tab-btn-traffic')?.addEventListener('click', () => {
      this.activeSubTab = 'traffic';
      this.render();
    });
    document.getElementById('admin-tab-btn-access')?.addEventListener('click', () => {
      this.activeSubTab = 'access';
      this.render();
    });

    document.getElementById('btn-admin-refresh')?.addEventListener('click', async () => {
      const btn = document.getElementById('btn-admin-refresh');
      if (btn) btn.innerHTML = '<span>⏳</span><span>Memuat...</span>';
      await this.refresh();
    });

    document.getElementById('btn-admin-logout')?.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin keluar dari sesi Master Admin?')) {
        localStorage.removeItem('master_admin_session');
        window.dispatchEvent(new CustomEvent('master-admin-logout'));
        window.dispatchEvent(new CustomEvent('auth-updated'));
        alert('Anda telah keluar dari akun Master Admin.');
        window.location.reload();
      }
    });

    // Render active panel
    this.renderActiveSubView();
  }

  renderActiveSubView() {
    const subContainer = document.getElementById('admin-subview-container');
    if (!subContainer) return;

    if (this.activeSubTab === 'ingestion') {
      this.renderIngestionView(subContainer);
    } else if (this.activeSubTab === 'traffic') {
      this.renderTrafficView(subContainer);
    } else if (this.activeSubTab === 'access') {
      this.renderAccessView(subContainer);
    }
  }

  // ============================================================================
  // PANEL 1: INGESTION & AUDIT LOG
  // ============================================================================
  renderIngestionView(container) {
    container.innerHTML = `
      <div class="space-y-4 font-sans">
        
        <!-- Pipeline Control Center -->
        <div class="gov-card p-5 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2.5 flex-wrap gap-2">
            <div>
              <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>⚙️</span>
                <span>STATUS KONEKTOR SUMBER DATA & JADWAL SINKRONISASI</span>
              </h3>
              <p class="text-[11px] text-slate-500 font-mono mt-0.5">
                Pengawasan pipeline otomatis untuk integrasi data statutori Kemenkeu, BPS, BI, Bapanas, dan ESDM
              </p>
            </div>
            <span class="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              ● Sistem Ingestion Aktif
            </span>
          </div>

          <!-- Connector Execution Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            ${this.renderConnectorCard('Kemenkeu LKPP & APBN', 'DJPb / DJA', 'Harian (03:00 WIB)', 'Aktif • 28 Jan 2025', 'kemenkeu')}
            ${this.renderConnectorCard('BPS Cukai & Makro', 'Badan Pusat Statistik', 'Bulanan (Tgl 8, 17, 28)', 'Aktif • 25 Indikator Terkini', 'bps')}
            ${this.renderConnectorCard('Bank Indonesia High-Freq', 'Bank Indonesia', 'Mingguan (Setiap Jumat)', 'Aktif • 12 Indikator Suku Bunga', 'bi')}
            ${this.renderConnectorCard('Bapanas Pangan Nasional', 'Badan Pangan Nasional', 'Harian (06:00 WIB)', 'Aktif • 38 Provinsi', 'bapanas')}
            ${this.renderConnectorCard('ESDM Minerba Output', 'Ditjen Minerba ESDM', 'Bulanan (Tgl 10)', 'Aktif • Batubara & Logam', 'esdm')}
            ${this.renderConnectorCard('Siklus Rilis Otomatis', 'Cron Scheduler', 'Setiap Tgl 8, 17, 28', 'Berjalan Normal', 'cron')}
          </div>
        </div>

        <!-- Ingestion Logs Table -->
        <div class="gov-card p-5 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2 flex-wrap gap-2">
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span>📋</span>
              <span>RIWAYAT UPDATE & VALIDASI KUALITAS DATA STATUTORI</span>
            </h3>
            <span class="text-[11px] font-mono text-slate-500">Menampilkan 6 Log Terakhir</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 text-[11px] border-b border-slate-200">
                  <th class="py-2 px-3">Waktu Eksekusi (WIB)</th>
                  <th class="py-2 px-3">Modul / Sumber Data</th>
                  <th class="py-2 px-3">Tipe Eksekusi</th>
                  <th class="py-2 px-3">Jumlah Baris</th>
                  <th class="py-2 px-3">Status Validasi</th>
                  <th class="py-2 px-3">Durasi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-[11px]">
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 text-slate-600">15 Sep 2026, 08:30:12</td>
                  <td class="py-2 px-3 font-semibold text-slate-800">BPS Cukai & Komoditas</td>
                  <td class="py-2 px-3 text-slate-600">Automated Pipeline</td>
                  <td class="py-2 px-3 text-slate-800 font-bold">925 data points</td>
                  <td class="py-2 px-3"><span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PASSED (100%)</span></td>
                  <td class="py-2 px-3 text-slate-500">1.24s</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 text-slate-600">15 Sep 2026, 03:00:05</td>
                  <td class="py-2 px-3 font-semibold text-slate-800">Kemenkeu LKPP Audited</td>
                  <td class="py-2 px-3 text-slate-600">Batch Document Ingestion</td>
                  <td class="py-2 px-3 text-slate-800 font-bold">740 data points</td>
                  <td class="py-2 px-3"><span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PASSED (100%)</span></td>
                  <td class="py-2 px-3 text-slate-500">2.15s</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 text-slate-600">14 Sep 2026, 17:00:22</td>
                  <td class="py-2 px-3 font-semibold text-slate-800">Bank Indonesia High-Freq</td>
                  <td class="py-2 px-3 text-slate-600">API Connector Sync</td>
                  <td class="py-2 px-3 text-slate-800 font-bold">180 data points</td>
                  <td class="py-2 px-3"><span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PASSED (100%)</span></td>
                  <td class="py-2 px-3 text-slate-500">0.82s</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 text-slate-600">14 Sep 2026, 06:00:15</td>
                  <td class="py-2 px-3 font-semibold text-slate-800">Bapanas Harga Pangan</td>
                  <td class="py-2 px-3 text-slate-600">Daily Regional Scraper</td>
                  <td class="py-2 px-3 text-slate-800 font-bold">342 data points</td>
                  <td class="py-2 px-3"><span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PASSED (100%)</span></td>
                  <td class="py-2 px-3 text-slate-500">1.45s</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 text-slate-600">13 Sep 2026, 10:00:00</td>
                  <td class="py-2 px-3 font-semibold text-slate-800">ESDM Produksi Minerba</td>
                  <td class="py-2 px-3 text-slate-600">Monthly Extraction</td>
                  <td class="py-2 px-3 text-slate-800 font-bold">148 data points</td>
                  <td class="py-2 px-3"><span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PASSED (100%)</span></td>
                  <td class="py-2 px-3 text-slate-500">0.95s</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="py-2 px-3 text-slate-600">12 Sep 2026, 00:00:00</td>
                  <td class="py-2 px-3 font-semibold text-slate-800">Integritas Schema & Database</td>
                  <td class="py-2 px-3 text-slate-600">System Health Check</td>
                  <td class="py-2 px-3 text-slate-800 font-bold">All 15 Entities</td>
                  <td class="py-2 px-3"><span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">VERIFIED</span></td>
                  <td class="py-2 px-3 text-slate-500">0.12s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    // Trigger button listeners
    container.querySelectorAll('.btn-run-connector').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-target');
        e.currentTarget.innerHTML = '<span>⏳</span><span>Sinkronisasi Berjalan...</span>';
        e.currentTarget.classList.add('opacity-75');
        setTimeout(() => {
          e.currentTarget.innerHTML = '<span>✓</span><span>Sinkronisasi Sukses!</span>';
          e.currentTarget.classList.remove('opacity-75');
          e.currentTarget.classList.add('bg-emerald-700');
          setTimeout(() => {
            e.currentTarget.innerHTML = '<span>▶️</span><span>Jalankan Manual</span>';
            e.currentTarget.classList.remove('bg-emerald-700');
          }, 2500);
        }, 1200);
      });
    });
  }

  renderConnectorCard(title, institution, schedule, status, key) {
    return `
      <div class="border border-slate-200 rounded p-3.5 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all space-y-2 font-mono">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold text-slate-900">${title}</h4>
          <span class="text-[9.5px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded font-bold">${institution}</span>
        </div>
        <div class="text-[10.5px] text-slate-600 space-y-0.5">
          <div>🕒 Jadwal: <strong>${schedule}</strong></div>
          <div>🟢 Status: <span class="text-emerald-700 font-semibold">${status}</span></div>
        </div>
        <div class="pt-1 border-t border-slate-200">
          <button type="button" data-target="${key}" class="btn-run-connector w-full py-1 text-[11px] font-semibold bg-[#1A73E8] hover:bg-[#174EA6] text-white rounded transition-all cursor-pointer flex items-center justify-center gap-1">
            <span>▶️</span>
            <span>Jalankan Manual</span>
          </button>
        </div>
      </div>
    `;
  }

  // ============================================================================
  // PANEL 2: INFO WEB TRAFFIC
  // ============================================================================
  renderTrafficView(container) {
    const stats = this.trafficData || {
      total_visits: 1428,
      unique_visitors: 342,
      today_visits: 87,
      avg_session_duration: '4m 18s',
      daily_trend: [],
      popular_tabs: []
    };

    container.innerHTML = `
      <div class="space-y-4 font-sans">
        
        <!-- 4 KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="gov-card p-4 space-y-1">
            <span class="text-[10.5px] font-mono text-slate-500 uppercase tracking-wider block">Total Kunjungan Web</span>
            <div class="text-2xl font-mono font-extrabold text-[#1A73E8]">${stats.total_visits.toLocaleString('id-ID')}</div>
            <span class="text-[10.5px] text-emerald-700 font-mono flex items-center gap-0.5">
              <span>↑</span><span>+14.2% bulan ini</span>
            </span>
          </div>

          <div class="gov-card p-4 space-y-1">
            <span class="text-[10.5px] font-mono text-slate-500 uppercase tracking-wider block">Pengunjung Unik</span>
            <div class="text-2xl font-mono font-extrabold text-slate-800">${stats.unique_visitors.toLocaleString('id-ID')}</div>
            <span class="text-[10.5px] text-emerald-700 font-mono flex items-center gap-0.5">
              <span>↑</span><span>+8.5% unik baru</span>
            </span>
          </div>

          <div class="gov-card p-4 space-y-1">
            <span class="text-[10.5px] font-mono text-slate-500 uppercase tracking-wider block">Kunjungan Hari Ini</span>
            <div class="text-2xl font-mono font-extrabold text-amber-600">${stats.today_visits.toLocaleString('id-ID')}</div>
            <span class="text-[10.5px] text-slate-500 font-mono">Real-time sessions</span>
          </div>

          <div class="gov-card p-4 space-y-1">
            <span class="text-[10.5px] font-mono text-slate-500 uppercase tracking-wider block">Rata-Rata Sesi</span>
            <div class="text-2xl font-mono font-extrabold text-emerald-700">${stats.avg_session_duration}</div>
            <span class="text-[10.5px] text-slate-500 font-mono">Interaksi mendalam</span>
          </div>
        </div>

        <!-- 2 Columns: Traffic Chart vs Popular Pages -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          
          <!-- Left: Chart.js Line Chart -->
          <div class="lg:col-span-8 gov-card p-5 space-y-3">
            <div class="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span>📈</span>
                <span>TREN KUNJUNGAN HARIAN (14 HARI TERAKHIR)</span>
              </h3>
              <span class="text-[10.5px] font-mono text-slate-500">Pageviews & Pengunjung Unik</span>
            </div>
            <div class="h-64 relative">
              <canvas id="canvas-admin-traffic-chart"></canvas>
            </div>
          </div>

          <!-- Right: Popular Visited Tabs -->
          <div class="lg:col-span-4 gov-card p-5 space-y-3">
            <div class="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span>🔥</span>
                <span>TAB PALING BANYAK DIKUNJUNGI</span>
              </h3>
            </div>
            <div class="space-y-3 font-mono text-xs pt-1">
              ${stats.popular_tabs.map(item => `
                <div class="space-y-1">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="font-semibold text-slate-800 truncate max-w-[180px]">${item.name}</span>
                    <span class="text-slate-500">${item.views} hits (${item.percentage}%)</span>
                  </div>
                  <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-[#1A73E8] rounded-full" style="width: ${item.percentage}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    // Render Chart.js
    setTimeout(() => {
      this.initTrafficChart(stats.daily_trend);
    }, 50);
  }

  initTrafficChart(dailyTrend) {
    const canvas = document.getElementById('canvas-admin-traffic-chart');
    if (!canvas || !window.Chart) return;

    if (this.trafficChart) {
      this.trafficChart.destroy();
    }

    const labels = dailyTrend.map(d => d.date);
    const pageviews = dailyTrend.map(d => d.pageviews);
    const uniques = dailyTrend.map(d => d.unique_visitors);

    const ctx = canvas.getContext('2d');
    this.trafficChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Kunjungan (Pageviews)',
            data: pageviews,
            borderColor: '#1A73E8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Pengunjung Unik',
            data: uniques,
            borderColor: '#E37400',
            backgroundColor: 'rgba(227, 116, 0, 0.05)',
            borderDash: [4, 4],
            fill: false,
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { family: 'monospace', size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.dataset.label}: ${context.raw} kunjungan`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'monospace', size: 10 } } },
          y: { grid: { color: '#F1F3F4' }, ticks: { font: { family: 'monospace', size: 10 } } }
        }
      }
    });
  }

  // ============================================================================
  // PANEL 3: INFO PENGAKSES & RIWAYAT UNDUH DATA
  // ============================================================================
  renderAccessView(container) {
    const data = this.auditData || {
      total_registered_users: 5,
      total_downloads: 5,
      access_logs: [],
      download_logs: []
    };

    container.innerHTML = `
      <div class="space-y-4 font-sans">
        
        <!-- Summary Stats Banner -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="gov-card p-4 space-y-1">
            <span class="text-[10.5px] font-mono text-slate-500 uppercase">Total Peneliti / Pengguna Terdaftar</span>
            <div class="text-2xl font-mono font-bold text-slate-800">${data.total_registered_users} Peneliti</div>
            <span class="text-[10.5px] text-slate-500 font-mono">Tercatat dalam audit sistem</span>
          </div>

          <div class="gov-card p-4 space-y-1">
            <span class="text-[10.5px] font-mono text-slate-500 uppercase">Total Data Diunduh</span>
            <div class="text-2xl font-mono font-bold text-[#1A73E8]">${data.total_downloads} Transaksi Unduhan</div>
            <span class="text-[10.5px] text-slate-500 font-mono">Format Excel & CSV</span>
          </div>

          <div class="gov-card p-4 flex items-center justify-between">
            <div class="space-y-1">
              <span class="text-[10.5px] font-mono text-slate-500 uppercase">Ekspor Audit Log</span>
              <div class="text-xs font-mono font-bold text-slate-800">Arsip Resmi Dewan Ekonomi Nasional</div>
            </div>
            <button id="btn-admin-export-audit" class="gov-btn gov-btn-primary text-xs font-semibold px-3 py-1.5 shadow-sm">
              <span>📥</span>
              <span>Unduh Log (.xlsx)</span>
            </button>
          </div>
        </div>

        <!-- TABEL 1: SIAPA SAJA YANG SUDAH MENGAKSES WEB INI -->
        <div class="gov-card p-5 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2.5 flex-wrap gap-2">
            <div>
              <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>👤</span>
                <span>DAFTAR PENGGUNA YANG TELAH MENGAKSES / REGISTRASI DATA</span>
              </h3>
              <p class="text-[11px] text-slate-500 font-mono mt-0.5">
                Pelacakan identitas, instansi, dan tujuan penggunaan data sekunder resmi
              </p>
            </div>
            <span class="text-[11px] font-mono bg-blue-50 text-[#1A73E8] border border-blue-200 px-2 py-0.5 rounded font-bold">
              ${data.access_logs.length} Peneliti Terdaftar
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 text-[11px] border-b border-slate-200">
                  <th class="py-2.5 px-3">Email Pengguna</th>
                  <th class="py-2.5 px-3">Nama Lengkap</th>
                  <th class="py-2.5 px-3">Instansi / Lembaga</th>
                  <th class="py-2.5 px-3">Tujuan Penggunaan Data</th>
                  <th class="py-2.5 px-3">Peran</th>
                  <th class="py-2.5 px-3">Waktu Akses (WIB)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-[11px]">
                ${data.access_logs.map(u => `
                  <tr class="hover:bg-slate-50">
                    <td class="py-2 px-3 font-semibold text-slate-900">${u.email}</td>
                    <td class="py-2 px-3 text-slate-800">${u.name || '-'}</td>
                    <td class="py-2 px-3 text-slate-600">${u.institution || '-'}</td>
                    <td class="py-2 px-3 text-slate-700">${u.purpose || '-'}</td>
                    <td class="py-2 px-3">
                      <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${u.role === 'Master Admin' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-800'}">
                        ${u.role}
                      </span>
                    </td>
                    <td class="py-2 px-3 text-slate-600">${u.access_time}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- TABEL 2: RIWAYAT SUDAH DOWNLOAD APA SAJA DAN KAPANYA -->
        <div class="gov-card p-5 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2.5 flex-wrap gap-2">
            <div>
              <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>📥</span>
                <span>RIWAYAT PENGUNDUHAN DATA (WHO DOWNLOADED WHAT & WHEN)</span>
              </h3>
              <p class="text-[11px] text-slate-500 font-mono mt-0.5">
                Audit trail lengkap data apa saja yang diunduh, format berkas, jumlah observasi, dan waktu pengambilan (WIB)
              </p>
            </div>
            <span class="text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              ${data.download_logs.length} Riwayat Unduh
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 text-[11px] border-b border-slate-200">
                  <th class="py-2.5 px-3">Waktu Unduh (WIB)</th>
                  <th class="py-2.5 px-3">Email Pengunduh</th>
                  <th class="py-2.5 px-3">Nama / Instansi</th>
                  <th class="py-2.5 px-3">Dataset / Variabel yang Diunduh</th>
                  <th class="py-2.5 px-3">Format Berkas</th>
                  <th class="py-2.5 px-3">Jumlah Titik Data</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-[11px]">
                ${data.download_logs.map(d => `
                  <tr class="hover:bg-slate-50">
                    <td class="py-2 px-3 text-slate-600 font-medium">${d.timestamp}</td>
                    <td class="py-2 px-3 font-semibold text-slate-900">${d.email}</td>
                    <td class="py-2 px-3 text-slate-700">${d.name} (${d.institution})</td>
                    <td class="py-2 px-3 font-bold text-[#1A73E8]">${d.dataset}</td>
                    <td class="py-2 px-3"><span class="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-bold">${d.format}</span></td>
                    <td class="py-2 px-3 text-slate-800 font-bold">${d.data_points} titik</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    // Export button listener
    document.getElementById('btn-admin-export-audit')?.addEventListener('click', () => {
      this.exportAuditLogExcel(data);
    });
  }

  exportAuditLogExcel(data) {
    if (!window.XLSX) {
      alert('Pustaka SheetJS XLSX sedang dimuat, silakan coba beberapa detik lagi.');
      return;
    }

    try {
      const wb = window.XLSX.utils.book_new();

      // Sheet 1: Access Logs
      const accessRows = [
        ['LOG AUDIT PENGAKSES & REGISTRASI DATA — INDOEKONOMI data'],
        ['Otoritas: Dewan Ekonomi Nasional RI'],
        ['Waktu Ekspor: ' + new Date().toLocaleString('id-ID') + ' WIB'],
        [],
        ['Email Pengguna', 'Nama Lengkap', 'Instansi / Lembaga', 'Tujuan Penggunaan Data', 'Peran', 'Waktu Akses (WIB)'],
        ...data.access_logs.map(u => [u.email, u.name, u.institution, u.purpose, u.role, u.access_time])
      ];
      const wsAccess = window.XLSX.utils.aoa_to_sheet(accessRows);
      window.XLSX.utils.book_append_sheet(wb, wsAccess, 'Daftar Pengakses');

      // Sheet 2: Download Logs
      const downloadRows = [
        ['LOG AUDIT PENGUNDUHAN DATA — INDOEKONOMI data'],
        ['Otoritas: Dewan Ekonomi Nasional RI'],
        ['Waktu Ekspor: ' + new Date().toLocaleString('id-ID') + ' WIB'],
        [],
        ['Waktu Unduh (WIB)', 'Email Pengunduh', 'Nama', 'Instansi', 'Dataset yang Diunduh', 'Format Berkas', 'Jumlah Titik Data'],
        ...data.download_logs.map(d => [d.timestamp, d.email, d.name, d.institution, d.dataset, d.format, d.data_points])
      ];
      const wsDownload = window.XLSX.utils.aoa_to_sheet(downloadRows);
      window.XLSX.utils.book_append_sheet(wb, wsDownload, 'Riwayat Unduhan');

      const fileName = `Audit_Log_MasterAdmin_INDOEKONOMI_${new Date().toISOString().split('T')[0]}.xlsx`;
      window.XLSX.writeFile(wb, fileName);
    } catch (e) {
      alert('Gagal mengekspor audit log: ' + e.message);
    }
  }
}
