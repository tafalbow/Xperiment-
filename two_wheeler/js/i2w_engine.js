/**
 * ==============================================================================
 * ENGINE & INTERACTIVE LOGIC: INDONESIA 2-WHEELER INTELLIGENCE (I2W-DIS)
 * Features: Multi-dimensional Query Engine, Chart.js Visualizer, Data Grid,
 * Multi-format Exporter (CSV/Excel/JSON), and Deep-Dive Modal System.
 * ==============================================================================
 */

(function () {
  'use strict';

  // State Management
  const AppState = {
    activeTab: 'overview',
    searchQuery: '',
    yearRange: 'all',
    segmentFilter: 'all',
    institutionFilter: 'all',
    sortColumn: 'year',
    sortDirection: 'desc',
    currentPage: 1,
    pageSize: 10,
    charts: {}
  };

  // Utility: Format Numbers in Indonesian locale
  function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return 'N/A';
    return new Intl.NumberFormat('id-ID').format(num);
  }

  function formatPercent(num) {
    if (num === null || num === undefined || isNaN(num)) return 'N/A';
    return (num > 0 ? '+' : '') + num.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }

  function formatCurrency(num) {
    if (num === null || num === undefined || isNaN(num)) return 'N/A';
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(num);
  }

  // DOM Elements cache
  let dom = {};

  function initDOMElements() {
    dom = {
      // Tabs
      tabButtons: document.querySelectorAll('.nav-tab-btn'),
      tabPanels: document.querySelectorAll('.tab-panel-content'),
      // Metric elements
      metricTotalPop: document.getElementById('metricTotalPop'),
      metricSalesLatest: document.getElementById('metricSalesLatest'),
      metricSalesGrowth: document.getElementById('metricSalesGrowth'),
      metricExportLatest: document.getElementById('metricExportLatest'),
      metricEvLatest: document.getElementById('metricEvLatest'),
      metricScooterShare: document.getElementById('metricScooterShare'),
      // Filters
      searchInput: document.getElementById('globalSearchInput'),
      yearRangeSelect: document.getElementById('yearRangeSelect'),
      segmentSelect: document.getElementById('segmentSelect'),
      institutionSelect: document.getElementById('institutionSelect'),
      btnResetFilter: document.getElementById('btnResetFilter'),
      recordCountBadge: document.getElementById('recordCountBadge'),
      // Table & Pagination
      timeSeriesTableBody: document.getElementById('timeSeriesTableBody'),
      paginationControls: document.getElementById('paginationControls'),
      paginationInfo: document.getElementById('paginationInfo'),
      pageSizeSelect: document.getElementById('pageSizeSelect'),
      // Regulations
      regulationsContainer: document.getElementById('regulationsGridContainer'),
      // Manufacturers
      manufacturersContainer: document.getElementById('manufacturersGridContainer'),
      // Personas
      personasContainer: document.getElementById('personasGridContainer'),
      // TCO & Simulator
      tcoTableBody: document.getElementById('tcoTableBody'),
      typesComparisonTableBody: document.getElementById('typesComparisonTableBody'),
      simDailyKmInput: document.getElementById('simDailyKmInput'),
      simDailyKmVal: document.getElementById('simDailyKmVal'),
      simFuelSelect: document.getElementById('simFuelSelect'),
      simFuelTypeVal: document.getElementById('simFuelTypeVal'),
      simAnnualSavingText: document.getElementById('simAnnualSavingText'),
      simMonthlySavingText: document.getElementById('simMonthlySavingText'),
      // Spasial & Regional
      provincialTableBody: document.getElementById('provincialTableBody'),
      islandFilterButtons: document.querySelectorAll('.island-filter-btn'),
      // Subsidy SISAPIRa
      subsidyTableBody: document.getElementById('subsidyTableBody'),
      // Media Archives
      mediaContainer: document.getElementById('mediaGridContainer'),
      // Dictionary
      dictionaryContainer: document.getElementById('dictionaryGridContainer'),
      // Modal
      modalOverlay: document.getElementById('detailModalOverlay'),
      modalTitle: document.getElementById('modalTitle'),
      modalBody: document.getElementById('modalBody'),
      modalCloseBtn: document.getElementById('modalCloseBtn'),
      // Exports
      btnExportCSV: document.getElementById('btnExportCSV'),
      btnExportExcel: document.getElementById('btnExportExcel'),
      btnExportJSON: document.getElementById('btnExportJSON'),
      btnPrintReport: document.getElementById('btnPrintReport')
    };
  }

  // Filter time series data based on current state
  function getFilteredTimeSeries() {
    let dataset = [...I2W_DATA.timeSeries];

    // Filter by Year Range
    if (AppState.yearRange !== 'all') {
      const [start, end] = AppState.yearRange.split('-').map(Number);
      dataset = dataset.filter(item => item.year >= start && item.year <= end);
    }

    // Filter by Search Query
    if (AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase();
      dataset = dataset.filter(item => {
        return (
          item.year.toString().includes(q) ||
          item.macroContext.toLowerCase().includes(q) ||
          item.primarySource.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q)
        );
      });
    }

    // Sort dataset
    dataset.sort((a, b) => {
      let valA = a[AppState.sortColumn];
      let valB = b[AppState.sortColumn];
      if (typeof valA === 'string') {
        return AppState.sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return AppState.sortDirection === 'asc' ? valA - valB : valB - valA;
    });

    return dataset;
  }

  // Filter Regulations based on state
  function getFilteredRegulations() {
    let dataset = [...I2W_DATA.regulations];

    if (AppState.institutionFilter !== 'all') {
      dataset = dataset.filter(r => r.institution.toLowerCase().includes(AppState.institutionFilter.toLowerCase()));
    }

    if (AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase();
      dataset = dataset.filter(r => {
        return (
          r.number.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.keyPoints.some(pt => pt.toLowerCase().includes(q)) ||
          r.impactOnIndustry.toLowerCase().includes(q)
        );
      });
    }

    return dataset;
  }

  // Render Top KPI Metrics Cards
  function renderMetrics() {
    const latestYearData = I2W_DATA.timeSeries[I2W_DATA.timeSeries.length - 2]; // 2025 or 2024 observed
    const priorYearData = I2W_DATA.timeSeries[I2W_DATA.timeSeries.length - 3];

    if (dom.metricTotalPop) {
      dom.metricTotalPop.textContent = formatNumber(latestYearData.totalNationalPopulation) + ' Unit';
    }
    if (dom.metricSalesLatest) {
      dom.metricSalesLatest.textContent = formatNumber(latestYearData.domesticSales) + ' Unit';
    }
    if (dom.metricSalesGrowth) {
      dom.metricSalesGrowth.textContent = formatPercent(latestYearData.growthYoY) + ' YoY';
      dom.metricSalesGrowth.className = `metric-badge ${latestYearData.growthYoY >= 0 ? 'green' : 'amber'}`;
    }
    if (dom.metricExportLatest) {
      dom.metricExportLatest.textContent = formatNumber(latestYearData.exportSales) + ' Unit';
    }
    if (dom.metricEvLatest) {
      dom.metricEvLatest.textContent = formatNumber(latestYearData.evSalesVolume) + ' Unit';
    }
    if (dom.metricScooterShare) {
      dom.metricScooterShare.textContent = latestYearData.shareScooter.toFixed(1) + '%';
    }
  }

  // Render Time Series Data Grid Table
  function renderTable() {
    const filtered = getFilteredTimeSeries();
    const totalRecords = filtered.length;

    if (dom.recordCountBadge) {
      dom.recordCountBadge.textContent = `${totalRecords} deret tahun ditemukan`;
    }

    // Pagination slice
    let page = AppState.currentPage;
    let size = AppState.pageSize === 'all' ? totalRecords : parseInt(AppState.pageSize, 10);
    let totalPages = Math.ceil(totalRecords / size) || 1;
    if (page > totalPages) page = totalPages;
    AppState.currentPage = page;

    let startIndex = (page - 1) * size;
    let endIndex = AppState.pageSize === 'all' ? totalRecords : Math.min(startIndex + size, totalRecords);
    let pageItems = filtered.slice(startIndex, endIndex);

    if (!dom.timeSeriesTableBody) return;
    dom.timeSeriesTableBody.innerHTML = '';

    if (pageItems.length === 0) {
      dom.timeSeriesTableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align:center; padding: 32px; color: var(--text-muted);">
            Tidak ditemukan data deret waktu yang sesuai dengan kriteria filter.
          </td>
        </tr>
      `;
      return;
    }

    pageItems.forEach(item => {
      const tr = document.createElement('tr');
      const growthClass = item.growthYoY >= 0 ? 'positive' : 'negative';
      const statusClass = item.status.toLowerCase();

      tr.innerHTML = `
        <td class="cell-mono cell-bold" style="color: var(--accent-bright-blue); font-size: 13px;">${item.year}</td>
        <td class="cell-mono" style="font-weight: 700;">${formatNumber(item.domesticSales)}</td>
        <td class="cell-mono" style="color: #475569;">${formatNumber(item.exportSales)}</td>
        <td>
          <span class="growth-pill ${growthClass}">
            ${item.growthYoY > 0 ? '▲' : '▼'} ${Math.abs(item.growthYoY).toFixed(1)}%
          </span>
        </td>
        <td class="cell-mono">${item.shareScooter.toFixed(1)}%</td>
        <td class="cell-mono">${item.shareCub.toFixed(1)}%</td>
        <td class="cell-mono">${item.shareSport.toFixed(1)}%</td>
        <td class="cell-mono" style="font-weight: 600; color: ${item.evSalesVolume > 0 ? '#059669' : '#94A3B8'};">
          ${item.evSalesVolume > 0 ? formatNumber(item.evSalesVolume) : '-'}
        </td>
        <td style="max-width: 320px; white-space: normal; font-size: 12px; line-height: 1.4; color: #334155;">
          ${item.macroContext}
        </td>
        <td>
          <span class="status-badge ${statusClass}">${item.status}</span>
        </td>
      `;

      // Click to open detail modal
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', () => openYearDetailModal(item));

      dom.timeSeriesTableBody.appendChild(tr);
    });

    renderPaginationControls(totalRecords, totalPages, page, startIndex, endIndex);
  }

  // Render Pagination Buttons
  function renderPaginationControls(totalRecords, totalPages, page, startIndex, endIndex) {
    if (!dom.paginationControls || !dom.paginationInfo) return;

    dom.paginationInfo.textContent = `Menampilkan ${totalRecords === 0 ? 0 : startIndex + 1} - ${endIndex} dari ${totalRecords} baris data`;
    dom.paginationControls.innerHTML = '';

    if (totalPages <= 1) return;

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = '◀';
    prevBtn.disabled = page === 1;
    prevBtn.addEventListener('click', () => {
      if (AppState.currentPage > 1) {
        AppState.currentPage--;
        renderTable();
      }
    });
    dom.paginationControls.appendChild(prevBtn);

    // Page numbers
    for (let p = 1; p <= totalPages; p++) {
      if (totalPages > 7 && Math.abs(p - page) > 2 && p !== 1 && p !== totalPages) {
        if (p === 2 || p === totalPages - 1) {
          const ellipsis = document.createElement('span');
          ellipsis.textContent = '...';
          ellipsis.style.padding = '4px 6px';
          dom.paginationControls.appendChild(ellipsis);
        }
        continue;
      }

      const pBtn = document.createElement('button');
      pBtn.className = `page-btn ${p === page ? 'active' : ''}`;
      pBtn.textContent = p;
      pBtn.addEventListener('click', () => {
        AppState.currentPage = p;
        renderTable();
      });
      dom.paginationControls.appendChild(pBtn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = '▶';
    nextBtn.disabled = page === totalPages;
    nextBtn.addEventListener('click', () => {
      if (AppState.currentPage < totalPages) {
        AppState.currentPage++;
        renderTable();
      }
    });
    dom.paginationControls.appendChild(nextBtn);
  }

  // Render Regulations Cards
  function renderRegulations() {
    if (!dom.regulationsContainer) return;
    const regs = getFilteredRegulations();
    dom.regulationsContainer.innerHTML = '';

    if (regs.length === 0) {
      dom.regulationsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); background: #FFF; border-radius: 8px;">
          Tidak ada dokumen regulasi atau kebijakan yang cocok dengan kriteria filter.
        </div>
      `;
      return;
    }

    regs.forEach(reg => {
      const card = document.createElement('div');
      card.className = 'reg-card';

      const keyPointsHtml = reg.keyPoints.map(pt => `<li>${pt}</li>`).join('');

      card.innerHTML = `
        <div>
          <div class="reg-header">
            <div class="reg-badge-group">
              <span class="reg-inst-badge">${reg.institution}</span>
              <span class="reg-cat-badge">${reg.category}</span>
            </div>
            <span class="status-badge observed">${reg.year}</span>
          </div>
          <div class="reg-number">${reg.number}</div>
          <div class="reg-title">${reg.title}</div>
          
          <ul class="reg-points-list">
            ${keyPointsHtml}
          </ul>
          
          <div class="reg-impact-box">
            <strong>Dampak Industri:</strong> ${reg.impactOnIndustry}
          </div>
        </div>

        <div class="reg-footer">
          <span>Target: <strong>${reg.targetScope}</strong></span>
          <span style="font-family: var(--font-mono); color: #0284C7; cursor: pointer;" class="btn-read-reg">Pelajari Sitasi ↗</span>
        </div>
      `;

      card.querySelector('.btn-read-reg').addEventListener('click', () => openRegulationDetailModal(reg));
      dom.regulationsContainer.appendChild(card);
    });
  }

  // Render Manufacturers & Battery Ecosystem Directory
  function renderManufacturers() {
    if (!dom.manufacturersContainer) return;
    dom.manufacturersContainer.innerHTML = '';

    I2W_DATA.manufacturers.forEach(mfg => {
      const card = document.createElement('div');
      card.className = 'mfg-card';

      const investorsHtml = mfg.investors.map(inv => `
        <div style="display:flex; justify-content:space-between; margin-bottom: 2px;">
          <span>${inv.name}</span>
          <span style="font-family:var(--font-mono); font-weight:700;">${inv.share}</span>
        </div>
      `).join('');

      const plantsHtml = mfg.plantLocations.map(pl => `<li>${pl}</li>`).join('');

      card.innerHTML = `
        <div>
          <div class="mfg-header">
            <div>
              <div class="mfg-brand-name">${mfg.brandName}</div>
              <div class="mfg-company-name">${mfg.companyName}</div>
            </div>
            <span class="mfg-cap-badge">${typeof mfg.totalAnnualCapacity === 'number' ? formatNumber(mfg.totalAnnualCapacity) + ' Unit/Thn' : mfg.totalAnnualCapacity}</span>
          </div>

          <div class="mfg-stats-row">
            <div class="mfg-stat-item">
              <span class="mfg-stat-label">Status Penanaman Modal</span>
              <span class="mfg-stat-val">${mfg.statusInvestasi}</span>
            </div>
            <div class="mfg-stat-item">
              <span class="mfg-stat-label">Tenaga Kerja Terlibat</span>
              <span class="mfg-stat-val">${formatNumber(mfg.manpower)} Orang</span>
            </div>
          </div>

          <div class="tkdn-progress-wrap">
            <div class="tkdn-label-row">
              <span style="color:var(--text-muted);">Sertifikasi & Kepatuhan TKDN</span>
              <span style="color:var(--accent-emerald);">${mfg.tkdnStatus.split(';')[0]}</span>
            </div>
          </div>

          <div class="mfg-investor-list">
            <div class="mfg-investor-title">Struktur Pemegang Saham:</div>
            ${investorsHtml}
          </div>

          <div style="font-size:12px; margin-bottom: 12px;">
            <div style="font-weight:700; color:var(--text-muted); font-size:11px; text-transform:uppercase; margin-bottom:4px;">Lokasi Fasilitas Pabrik:</div>
            <ul style="padding-left:16px; color:#475569; line-height: 1.4;">
              ${plantsHtml}
            </ul>
          </div>
        </div>

        <div style="font-size:11.5px; background:#F1F5F9; padding:10px; border-radius:6px; color:#334155; margin-top:8px;">
          <strong>Catatan Strategis:</strong> ${mfg.historicalNote}
        </div>
      `;

      dom.manufacturersContainer.appendChild(card);
    });
  }

  // Render Consumer Profiles
  function renderPersonas() {
    if (!dom.personasContainer) return;
    dom.personasContainer.innerHTML = '';

    I2W_DATA.consumerProfiles.forEach(p => {
      const card = document.createElement('div');
      card.className = 'persona-card';

      const driversHtml = p.keyPurchaseDrivers.map(d => `<li>${d}</li>`).join('');

      card.innerHTML = `
        <div>
          <div class="persona-header">
            <div>
              <div class="persona-title">${p.personaName}</div>
              <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">${p.personaId}</div>
            </div>
            <span class="persona-share-pill">${p.targetShareOfMarket} Populasi</span>
          </div>

          <div class="persona-demog">
            <strong>Demografi:</strong> ${p.primaryDemographics}<br>
            <strong>Cakupan Wilayah:</strong> ${p.geography}
          </div>

          <div class="persona-feature-box">
            <strong>Karakteristik Mobilitas & Unit Pilihan:</strong>
            <div>Jarak Tempuh Rata-rata: <strong>${p.dailyMileageKm}</strong></div>
            <div>Model Kendaraan Paling Populer: <strong>${p.currentVehicleChoice}</strong></div>
            <div>Tujuan Utama: ${p.primaryUsage}</div>
          </div>

          <div style="font-size:12px; margin-bottom:14px;">
            <strong style="color:var(--primary-navy); display:block; margin-bottom:4px;">Faktor Kunci Keputusan Pembelian:</strong>
            <ul style="padding-left:16px; color:#475569; line-height:1.4;">
              ${driversHtml}
            </ul>
          </div>

          <div style="font-size:12px; margin-bottom:14px;">
            <strong>Perilaku Pembiayaan / Multifinance:</strong>
            <p style="color:#475569; margin-top:2px;">${p.financingBehavior}</p>
          </div>
        </div>

        <div class="persona-ev-verdict">
          <strong>⚡ Sikap & Respon Terhadap Motor Listrik (EV):</strong>
          <p style="margin-top:4px;">${p.evAdoptionAttitude}</p>
        </div>
      `;

      dom.personasContainer.appendChild(card);
    });
  }

  // Render Total Cost of Ownership (TCO) Table
  function renderTCOTable() {
    if (!dom.tcoTableBody) return;
    dom.tcoTableBody.innerHTML = '';

    I2W_DATA.tcoComparison.forEach(tco => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--primary-navy);">${tco.vehicleType}</td>
        <td class="cell-mono">${formatCurrency(tco.purchasePrice)}</td>
        <td class="cell-mono">${formatCurrency(tco.energyCostPer10kKm)}</td>
        <td class="cell-mono">${formatCurrency(tco.maintenanceCostPer10kKm)}</td>
        <td class="cell-mono">${formatCurrency(tco.taxAdminPerYear)}</td>
        <td class="cell-mono">${formatCurrency(tco.depreciationYear1)}</td>
        <td class="cell-mono" style="font-weight:800; color: var(--accent-cobalt);">${formatCurrency(tco.totalCostYear1)}</td>
        <td class="cell-mono" style="font-weight:800; color: ${tco.costPerKm < 600 ? '#059669' : '#D97706'};">
          ${formatCurrency(tco.costPerKm)} / km
        </td>
      `;
      dom.tcoTableBody.appendChild(tr);
    });
  }

  // Render Data Dictionary Cards
  function renderDataDictionary() {
    if (!dom.dictionaryContainer) return;
    dom.dictionaryContainer.innerHTML = '';

    I2W_DATA.dataDictionary.forEach(dict => {
      const card = document.createElement('div');
      card.className = 'dict-card';
      card.innerHTML = `
        <div class="dict-header">
          <span class="dict-code">${dict.fieldId}</span>
          <span class="metric-badge blue">${dict.unit}</span>
        </div>
        <div class="dict-title">${dict.variableName}</div>
        <div class="dict-def">${dict.definition}</div>
        <div class="dict-meta-list">
          <div><strong>Sumber Lembaga:</strong> ${dict.dataOwner}</div>
          <div><strong>Frekuensi Rilis:</strong> ${dict.frequency}</div>
          <div><strong>Metodologi:</strong> ${dict.methodology}</div>
          <div><strong>Keandalan (Reliability):</strong> <span style="color:var(--accent-emerald); font-weight:700;">${dict.reliabilityRating}</span></div>
        </div>
      `;
      dom.dictionaryContainer.appendChild(card);
    });
  }

  // Render 6-Types Comparison Matrix Table
  function renderTypesComparisonTable() {
    if (!dom.typesComparisonTableBody || !I2W_DATA.typesComparison) return;
    dom.typesComparisonTableBody.innerHTML = '';

    I2W_DATA.typesComparison.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--primary-navy);">
          ${t.category}
          <div style="font-size: 11px; color: var(--text-muted); font-weight: normal;">${t.subTypes}</div>
        </td>
        <td style="font-size: 12px; color: #334155;">${t.engineSpec}</td>
        <td class="cell-mono" style="font-weight: 600; color: var(--accent-cobalt);">${t.fuelOrEnergy}</td>
        <td class="cell-mono" style="font-weight: 700;">${t.priceRange}</td>
        <td style="font-size: 12px; color: #047857; max-width: 220px; white-space: normal;">${t.pros}</td>
        <td style="font-size: 12px; color: #B91C1C; max-width: 220px; white-space: normal;">${t.cons}</td>
        <td style="font-size: 12px; color: #475569; max-width: 200px; white-space: normal;">${t.idealBuyer}</td>
      `;
      dom.typesComparisonTableBody.appendChild(tr);
    });
  }

  // Render Provincial Data Grid
  function renderProvincialTable(filterIsland = 'all') {
    if (!dom.provincialTableBody || !I2W_DATA.provincialData) return;
    dom.provincialTableBody.innerHTML = '';

    let list = [...I2W_DATA.provincialData];
    if (filterIsland !== 'all') {
      list = list.filter(p => p.island === filterIsland);
    }

    list.sort((a, b) => b.motorcyclePop - a.motorcyclePop);

    list.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="cell-mono" style="color: var(--text-muted); font-weight: 700;">${p.code}</td>
        <td style="font-weight: 700; color: var(--primary-navy);">${p.province}</td>
        <td><span class="reg-cat-badge">${p.island}</span></td>
        <td class="cell-mono" style="font-weight: 700;">${formatNumber(p.motorcyclePop)}</td>
        <td class="cell-mono" style="font-weight: 700; color: var(--accent-bright-blue);">${p.nationalShare.toFixed(2)}%</td>
        <td style="font-size: 12px; color: #334155;">${p.dominantType}</td>
        <td style="font-size: 12px; color: #059669; font-weight: 600;">${p.bbnkbEvIncentive}</td>
      `;
      dom.provincialTableBody.appendChild(tr);
    });
  }

  // Render Subsidy SISAPIRa Table
  function renderSubsidyTable() {
    if (!dom.subsidyTableBody || !I2W_DATA.subsidyTracker) return;
    dom.subsidyTableBody.innerHTML = '';

    I2W_DATA.subsidyTracker.topBeneficiaryModels.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--primary-navy);">${m.brand}</td>
        <td style="font-weight: 600; color: #1E293B;">${m.model}</td>
        <td>
          <span class="growth-pill positive">${m.tkdnPercent.toFixed(1)}% TKDN</span>
        </td>
        <td class="cell-mono" style="font-weight: 700; color: var(--accent-cobalt);">${formatNumber(m.registeredUnits)} Unit</td>
        <td class="cell-mono" style="font-weight: 800; color: #059669;">${m.priceAfterSubsidy}</td>
      `;
      dom.subsidyTableBody.appendChild(tr);
    });
  }

  // Render Media Archives
  function renderMediaArchives() {
    if (!dom.mediaContainer || !I2W_DATA.mediaArchives) return;
    dom.mediaContainer.innerHTML = '';

    I2W_DATA.mediaArchives.forEach(med => {
      const card = document.createElement('div');
      card.className = 'media-card';
      card.innerHTML = `
        <div>
          <div class="media-header">
            <span class="media-badge">${med.media}</span>
            <span class="media-year">${med.year} &middot; ${med.category}</span>
          </div>
          <div class="media-headline">${med.headline}</div>
          <div class="media-summary">${med.summary}</div>
        </div>
        <div class="media-ref">Sitasi: <strong>${med.citationRef}</strong></div>
      `;
      dom.mediaContainer.appendChild(card);
    });
  }

  // Interactive TCO Fuel Saving Simulator
  function setupTcoSimulator() {
    if (!dom.simDailyKmInput) return;

    function updateSimulation() {
      const dailyKm = parseInt(dom.simDailyKmInput.value, 10);
      const fuelPrice = parseInt(dom.simFuelSelect.value, 10);

      if (dom.simDailyKmVal) {
        dom.simDailyKmVal.textContent = `${dailyKm} km / hari`;
      }
      if (dom.simFuelTypeVal) {
        const fuelName = dom.simFuelSelect.options[dom.simFuelSelect.selectedIndex].text.split('-')[0].trim();
        dom.simFuelTypeVal.textContent = `${fuelName} (${formatCurrency(fuelPrice)}/L)`;
      }

      // Calculations:
      // ICE scooter travels 48 km per liter on average
      // EV cost per km is ~Rp 120/km (mix of home charging & battery swap)
      const annualKm = dailyKm * 365;
      const iceFuelLiters = annualKm / 48;
      const iceAnnualFuelCost = iceFuelLiters * fuelPrice;
      const evAnnualEnergyCost = annualKm * 120;

      const annualSaving = Math.max(0, Math.round(iceAnnualFuelCost - evAnnualEnergyCost));
      const monthlySaving = Math.round(annualSaving / 12);

      if (dom.simAnnualSavingText) {
        dom.simAnnualSavingText.textContent = `${formatCurrency(annualSaving)} / Thn`;
      }
      if (dom.simMonthlySavingText) {
        dom.simMonthlySavingText.textContent = `Hemat ~${formatCurrency(monthlySaving)} setiap bulan`;
      }
    }

    dom.simDailyKmInput.addEventListener('input', updateSimulation);
    dom.simFuelSelect.addEventListener('change', updateSimulation);
    updateSimulation();
  }

  // ==========================================================================
  // CHART.JS INITIALIZATION & VISUALIZATION
  // ==========================================================================
  function initCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js library is not loaded. Skipping chart rendering.');
      return;
    }

    // Set Global Chart Defaults
    Chart.defaults.font.family = "'Plus Jakarta Sans', system-ui, sans-serif";
    Chart.defaults.color = '#64748B';

    initSalesTrendChart();
    initSegmentShiftChart();
    initBrandShareChart();
    initTcoBarChart();
    initConsumerRadarChart();
    initSpasialChart();
  }

  // Chart 1: Sales & Export Trends (1990 - 2026)
  function initSalesTrendChart() {
    const ctx = document.getElementById('chartSalesTrendCanvas');
    if (!ctx) return;

    if (AppState.charts.salesTrend) {
      AppState.charts.salesTrend.destroy();
    }

    const labels = I2W_DATA.timeSeries.map(d => d.year);
    const domesticData = I2W_DATA.timeSeries.map(d => d.domesticSales);
    const exportData = I2W_DATA.timeSeries.map(d => d.exportSales);
    const evData = I2W_DATA.timeSeries.map(d => d.evSalesVolume);

    AppState.charts.salesTrend = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Penjualan Domestik (Unit)',
            data: domesticData,
            backgroundColor: 'rgba(37, 99, 235, 0.75)',
            hoverBackgroundColor: 'rgba(30, 64, 175, 1)',
            borderRadius: 3,
            yAxisID: 'y'
          },
          {
            type: 'line',
            label: 'Ekspor CBU (Unit)',
            data: exportData,
            borderColor: '#D97706',
            backgroundColor: '#D97706',
            borderWidth: 2.5,
            pointRadius: 2,
            tension: 0.3,
            yAxisID: 'y'
          },
          {
            type: 'line',
            label: 'Penjualan Motor Listrik (E2W)',
            data: evData,
            borderColor: '#059669',
            backgroundColor: '#059669',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#10B981',
            tension: 0.3,
            yAxisID: 'y'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { boxWidth: 12, font: { size: 11, weight: '600' } }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + formatNumber(context.raw) + ' unit';
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (val) {
                return (val / 1000000).toFixed(1) + ' Jt';
              }
            },
            grid: { color: '#E2E8F0' }
          }
        }
      }
    });
  }

  // Chart 2: Segment Evolution Stacked Area (Cub vs Scooter vs Sport vs EV)
  function initSegmentShiftChart() {
    const ctx = document.getElementById('chartSegmentShiftCanvas');
    if (!ctx) return;

    if (AppState.charts.segmentShift) {
      AppState.charts.segmentShift.destroy();
    }

    const labels = I2W_DATA.timeSeries.map(d => d.year);
    const cubShare = I2W_DATA.timeSeries.map(d => d.shareCub);
    const scooterShare = I2W_DATA.timeSeries.map(d => d.shareScooter);
    const sportShare = I2W_DATA.timeSeries.map(d => d.shareSport);
    const evShare = I2W_DATA.timeSeries.map(d => d.shareEV);

    AppState.charts.segmentShift = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Skutik (Matic)',
            data: scooterShare,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.45)',
            fill: true,
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: 'Cub (Bebek)',
            data: cubShare,
            borderColor: '#0284C7',
            backgroundColor: 'rgba(2, 132, 199, 0.35)',
            fill: true,
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: 'Sport / Trail',
            data: sportShare,
            borderColor: '#E11D48',
            backgroundColor: 'rgba(225, 29, 72, 0.25)',
            fill: true,
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: 'Electric (EV / E2W)',
            data: evShare,
            borderColor: '#059669',
            backgroundColor: 'rgba(5, 150, 105, 0.65)',
            fill: true,
            tension: 0.3,
            pointRadius: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.raw.toFixed(1) + '%';
              }
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: {
            stacked: true,
            max: 100,
            ticks: {
              callback: function (val) { return val + '%'; }
            }
          }
        }
      }
    });
  }

  // Chart 3: Brand Market Share Doughnut (ICE & EV)
  function initBrandShareChart() {
    const ctx = document.getElementById('chartBrandShareCanvas');
    if (!ctx) return;

    if (AppState.charts.brandShare) {
      AppState.charts.brandShare.destroy();
    }

    const brands = I2W_DATA.brandMarketShare.iceShare;

    AppState.charts.brandShare = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: brands.map(b => b.brand),
        datasets: [{
          data: brands.map(b => b.sharePercent),
          backgroundColor: [
            '#E11D48', // Honda Red
            '#1D4ED8', // Yamaha Deep Blue
            '#059669', // Kawasaki Green
            '#0284C7', // Suzuki Blue
            '#D97706'  // TVS Amber
          ],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, font: { size: 10.5 } } },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}% (${formatNumber(brands[context.dataIndex].annualVolumeUnits)} unit)`;
              }
            }
          }
        },
        cutout: '62%'
      }
    });
  }

  // Chart 4: TCO Cost per KM Bar Chart
  function initTcoBarChart() {
    const ctx = document.getElementById('chartTcoCanvas');
    if (!ctx) return;

    if (AppState.charts.tco) {
      AppState.charts.tco.destroy();
    }

    const labels = I2W_DATA.tcoComparison.map(t => t.vehicleType.split('(')[0].trim());
    const costPerKm = I2W_DATA.tcoComparison.map(t => t.costPerKm);
    const totalYear1 = I2W_DATA.tcoComparison.map(t => t.totalCostYear1);

    AppState.charts.tco = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Biaya Tahun 1 (Rp Juta)',
            data: totalYear1.map(v => (v / 1000000).toFixed(2)),
            backgroundColor: [
              'rgba(37, 99, 235, 0.75)',
              'rgba(29, 78, 216, 0.85)',
              'rgba(5, 150, 105, 0.85)',
              'rgba(16, 185, 129, 0.85)'
            ],
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return `Total Biaya: Rp ${ctx.raw} Juta / tahun (${formatCurrency(costPerKm[ctx.dataIndex])} / km)`;
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Biaya Tahunan (Juta Rupiah per 10.000 km)', font: { size: 11 } }
          }
        }
      }
    });
  }

  // Chart 5: Consumer Decision Factors Radar Chart
  function initConsumerRadarChart() {
    const ctx = document.getElementById('chartConsumerRadarCanvas');
    if (!ctx) return;

    if (AppState.charts.consumerRadar) {
      AppState.charts.consumerRadar.destroy();
    }

    AppState.charts.consumerRadar = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Biaya Bahan Bakar/Energi',
          'Akses Cicilan/DP Murah',
          'Harga Jual Kembali (Resale)',
          'Keberadaan Bengkel Resmi',
          'Kepraktisan Bagasi & Fitur',
          'Gengsi & Gaya Desain'
        ],
        datasets: [
          {
            label: 'Konsumen Urban Commuter',
            data: [92, 88, 85, 90, 84, 68],
            fill: true,
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            borderColor: '#2563EB',
            pointBackgroundColor: '#2563EB',
            pointBorderColor: '#fff'
          },
          {
            label: 'Pengemudi Gig / Ojol',
            data: [98, 95, 70, 96, 75, 40],
            fill: true,
            backgroundColor: 'rgba(5, 150, 105, 0.2)',
            borderColor: '#059669',
            pointBackgroundColor: '#059669',
            pointBorderColor: '#fff'
          },
          {
            label: 'Gen Z / Mahasiswa',
            data: [75, 72, 60, 70, 85, 95],
            fill: true,
            backgroundColor: 'rgba(225, 29, 72, 0.2)',
            borderColor: '#E11D48',
            pointBackgroundColor: '#E11D48',
            pointBorderColor: '#fff'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: { line: { borderWidth: 2 } },
        scales: {
          r: {
            angleLines: { color: '#E2E8F0' },
            grid: { color: '#E2E8F0' },
            suggestedMin: 30,
            suggestedMax: 100,
            pointLabels: { font: { size: 10.5, weight: '600' } }
          }
        },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } }
        }
      }
    });
  }

  // Chart 6: Spasial Island Share Pie Chart
  function initSpasialChart() {
    const ctx = document.getElementById('chartSpasialCanvas');
    if (!ctx) return;

    if (AppState.charts.spasial) {
      AppState.charts.spasial.destroy();
    }

    const islandLabels = ['Pulau Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara', 'Maluku & Papua'];
    const islandShares = [61.8, 19.3, 7.1, 6.8, 3.5, 1.5];

    AppState.charts.spasial = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: islandLabels,
        datasets: [{
          data: islandShares,
          backgroundColor: [
            '#1E40AF', // Jawa Blue
            '#0284C7', // Sumatera Light Blue
            '#059669', // Kalimantan Emerald
            '#D97706', // Sulawesi Amber
            '#E11D48', // Bali Rose
            '#7C3AED'  // Papua Purple
          ],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return `${ctx.label}: ${ctx.raw}% dari Total Populasi Nasional`;
              }
            }
          }
        }
      }
    });
  }

  // ==========================================================================
  // MODAL LOGIC
  // ==========================================================================
  function openYearDetailModal(item) {
    if (!dom.modalOverlay) return;
    dom.modalTitle.textContent = `Analisis Historis Industri Sepeda Motor Tahun ${item.year}`;

    dom.modalBody.innerHTML = `
      <div style="margin-bottom: 18px;">
        <span class="status-badge ${item.status.toLowerCase()}">${item.status}</span>
        <span style="font-size:12px; color:var(--text-muted); margin-left: 10px;">Sumber Resmi: <strong>${item.primarySource}</strong></span>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px;">
        <div style="background:#F8FAFC; padding:12px; border-radius:8px;">
          <div style="font-size:11px; color:var(--text-muted);">Penjualan Domestik</div>
          <div style="font-family:var(--font-mono); font-size:18px; font-weight:800; color:var(--accent-bright-blue);">${formatNumber(item.domesticSales)} unit</div>
        </div>
        <div style="background:#F8FAFC; padding:12px; border-radius:8px;">
          <div style="font-size:11px; color:var(--text-muted);">Ekspor CBU</div>
          <div style="font-family:var(--font-mono); font-size:18px; font-weight:800; color:#D97706;">${formatNumber(item.exportSales)} unit</div>
        </div>
        <div style="background:#F8FAFC; padding:12px; border-radius:8px;">
          <div style="font-size:11px; color:var(--text-muted);">Pertumbuhan YoY</div>
          <div style="font-family:var(--font-mono); font-size:18px; font-weight:800; color:${item.growthYoY >= 0 ? '#059669' : '#E11D48'};">${formatPercent(item.growthYoY)}</div>
        </div>
        <div style="background:#F8FAFC; padding:12px; border-radius:8px;">
          <div style="font-size:11px; color:var(--text-muted);">Total Populasi Nasional</div>
          <div style="font-family:var(--font-mono); font-size:18px; font-weight:800; color:var(--primary-navy);">${formatNumber(item.totalNationalPopulation)} unit</div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <strong style="display:block; margin-bottom: 6px; color:var(--primary-navy);">Pangsa Segmen:</strong>
        <div style="display:flex; gap:16px; font-size:13px;">
          <span>Skutik: <strong>${item.shareScooter.toFixed(1)}%</strong></span>
          <span>Bebek (Cub): <strong>${item.shareCub.toFixed(1)}%</strong></span>
          <span>Sport: <strong>${item.shareSport.toFixed(1)}%</strong></span>
          <span>EV (Listrik): <strong>${item.shareEV.toFixed(1)}%</strong></span>
        </div>
      </div>

      <div style="background:#EFF6FF; border-left: 4px solid var(--accent-bright-blue); padding:14px; border-radius: 0 6px 6px 0; margin-bottom: 16px;">
        <strong style="color:var(--accent-cobalt); font-size: 13px;">Konteks Makroekonomi & Dinamika Industri:</strong>
        <p style="font-size:13px; color:#1E293B; margin-top:4px; line-height: 1.5;">${item.macroContext}</p>
      </div>

      <div style="font-size:12px; color:var(--text-light); text-align:right;">
        ID Rekam: I2W-${item.year} &middot; Badan Registrasi: Korlantas / BPS / AISI
      </div>
    `;

    dom.modalOverlay.classList.add('open');
  }

  function openRegulationDetailModal(reg) {
    if (!dom.modalOverlay) return;
    dom.modalTitle.textContent = `${reg.number} — ${reg.institution}`;

    const pointsHtml = reg.keyPoints.map(pt => `<li style="margin-bottom:6px;">${pt}</li>`).join('');

    dom.modalBody.innerHTML = `
      <div style="margin-bottom: 14px;">
        <span class="reg-inst-badge">${reg.institution}</span>
        <span class="reg-cat-badge">${reg.category}</span>
        <span class="status-badge observed">${reg.status}</span>
      </div>

      <div style="font-size: 15px; font-weight: 700; color: var(--primary-navy); margin-bottom: 14px; line-height: 1.4;">
        ${reg.title}
      </div>

      <div style="font-size:12.5px; color:var(--text-muted); margin-bottom:16px;">
        Tanggal Penetapan: <strong>${reg.dateEnacted}</strong> &middot; Tingkatan: <strong>${reg.legalLevel}</strong> &middot; Target: <strong>${reg.targetScope}</strong>
      </div>

      <div style="margin-bottom: 16px;">
        <strong style="color:var(--primary-navy); font-size:13px; display:block; margin-bottom:8px;">Pokok-Pokok Ketentuan:</strong>
        <ul style="padding-left:20px; font-size:13px; color:#334155; line-height:1.5;">
          ${pointsHtml}
        </ul>
      </div>

      <div style="background:#F0FDF4; border:1px solid #BBF7D0; padding:12px; border-radius:6px; margin-bottom:16px;">
        <strong style="color:#166534; font-size:12.5px;">Dampak Terhadap Industri & Pasar Roda Dua:</strong>
        <p style="font-size:12.5px; color:#14532D; margin-top:4px;">${reg.impactOnIndustry}</p>
      </div>

      <div style="font-size:11.5px; background:#F8FAFC; padding:10px; border-radius:6px; color:#64748B;">
        <strong>Sitasi Resmi / Lembaran Negara:</strong><br>
        <code>${reg.sourceCitation}</code>
      </div>
    `;

    dom.modalOverlay.classList.add('open');
  }

  function closeModal() {
    if (dom.modalOverlay) {
      dom.modalOverlay.classList.remove('open');
    }
  }

  // ==========================================================================
  // EXPORT ENGINE: CSV, EXCEL, JSON
  // ==========================================================================
  function exportToCSV() {
    const filtered = getFilteredTimeSeries();
    if (filtered.length === 0) {
      alert('Tidak ada data untuk diekspor.');
      return;
    }

    const headers = [
      'Tahun',
      'Penjualan_Domestik_Unit',
      'Ekspor_CBU_Unit',
      'Pertumbuhan_YoY_Persen',
      'Pangsa_Skutik_Persen',
      'Pangsa_Bebek_Persen',
      'Pangsa_Sport_Persen',
      'Volume_Motor_Listrik_E2W',
      'Total_Populasi_Nasional',
      'Status_Data',
      'Konteks_Makroekonomi',
      'Sumber_Resmi'
    ];

    const rows = filtered.map(item => [
      item.year,
      item.domesticSales,
      item.exportSales,
      item.growthYoY,
      item.shareScooter,
      item.shareCub,
      item.shareSport,
      item.evSalesVolume,
      item.totalNationalPopulation,
      `"${item.status}"`,
      `"${item.macroContext.replace(/"/g, '""')}"`,
      `"${item.primarySource.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
    downloadBlob(csvContent, 'text/csv;charset=utf-8;', `I2W_Data_Industri_R2_Indonesia_${new Date().toISOString().slice(0, 10)}.csv`);
  }

  function exportToExcel() {
    const filtered = getFilteredTimeSeries();
    if (filtered.length === 0) {
      alert('Tidak ada data untuk diekspor.');
      return;
    }

    let tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <style>
          th { background-color: #0A192F; color: #FFFFFF; font-weight: bold; border: 1px solid #CBD5E1; }
          td { border: 1px solid #CBD5E1; }
        </style>
      </head>
      <body>
        <h3>${I2W_DATA.systemMetadata.systemName}</h3>
        <p>Tanggal Ekspor: ${new Date().toLocaleDateString('id-ID')}</p>
        <table>
          <thead>
            <tr>
              <th>Tahun</th>
              <th>Penjualan Domestik (Unit)</th>
              <th>Ekspor CBU (Unit)</th>
              <th>Pertumbuhan YoY (%)</th>
              <th>Skutik (%)</th>
              <th>Bebek (%)</th>
              <th>Sport (%)</th>
              <th>Volume EV (Unit)</th>
              <th>Populasi Nasional (Unit)</th>
              <th>Status Data</th>
              <th>Konteks Makroekonomi</th>
              <th>Sumber Resmi</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(r => `
              <tr>
                <td>${r.year}</td>
                <td>${r.domesticSales}</td>
                <td>${r.exportSales}</td>
                <td>${r.growthYoY}%</td>
                <td>${r.shareScooter}%</td>
                <td>${r.shareCub}%</td>
                <td>${r.shareSport}%</td>
                <td>${r.evSalesVolume}</td>
                <td>${r.totalNationalPopulation}</td>
                <td>${r.status}</td>
                <td>${r.macroContext}</td>
                <td>${r.primarySource}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    downloadBlob(tableHtml, 'application/vnd.ms-excel;charset=utf-8;', `I2W_Data_Industri_R2_Indonesia_${new Date().toISOString().slice(0, 10)}.xls`);
  }

  function exportToJSON() {
    const payload = {
      metadata: I2W_DATA.systemMetadata,
      exportTimestamp: new Date().toISOString(),
      timeSeries: getFilteredTimeSeries(),
      brandMarketShare: I2W_DATA.brandMarketShare,
      regulations: getFilteredRegulations(),
      manufacturers: I2W_DATA.manufacturers,
      consumerProfiles: I2W_DATA.consumerProfiles,
      tcoComparison: I2W_DATA.tcoComparison
    };

    const jsonStr = JSON.stringify(payload, null, 2);
    downloadBlob(jsonStr, 'application/json;charset=utf-8;', `I2W_Intelligence_Dataset_${new Date().toISOString().slice(0, 10)}.json`);
  }

  function downloadBlob(content, mimeType, filename) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ==========================================================================
  // EVENT LISTENERS & SETUP
  // ==========================================================================
  function setupEventListeners() {
    // Navigation Tabs Switcher
    if (dom.tabButtons) {
      dom.tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const tabId = btn.getAttribute('data-tab');
          switchTab(tabId);
        });
      });
    }

    // Search Input with debounce
    if (dom.searchInput) {
      let debounceTimer;
      dom.searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          AppState.searchQuery = e.target.value;
          AppState.currentPage = 1;
          renderTable();
          renderRegulations();
        }, 200);
      });
    }

    // Year Range Select
    if (dom.yearRangeSelect) {
      dom.yearRangeSelect.addEventListener('change', (e) => {
        AppState.yearRange = e.target.value;
        AppState.currentPage = 1;
        renderTable();
      });
    }

    // Institution Filter
    if (dom.institutionSelect) {
      dom.institutionSelect.addEventListener('change', (e) => {
        AppState.institutionFilter = e.target.value;
        renderRegulations();
      });
    }

    // Page Size Select
    if (dom.pageSizeSelect) {
      dom.pageSizeSelect.addEventListener('change', (e) => {
        AppState.pageSize = e.target.value;
        AppState.currentPage = 1;
        renderTable();
      });
    }

    // Reset Filters
    if (dom.btnResetFilter) {
      dom.btnResetFilter.addEventListener('click', () => {
        AppState.searchQuery = '';
        AppState.yearRange = 'all';
        AppState.institutionFilter = 'all';
        AppState.currentPage = 1;
        if (dom.searchInput) dom.searchInput.value = '';
        if (dom.yearRangeSelect) dom.yearRangeSelect.value = 'all';
        if (dom.institutionSelect) dom.institutionSelect.value = 'all';
        renderTable();
        renderRegulations();
      });
    }

    // Modal Close
    if (dom.modalCloseBtn) {
      dom.modalCloseBtn.addEventListener('click', closeModal);
    }
    if (dom.modalOverlay) {
      dom.modalOverlay.addEventListener('click', (e) => {
        if (e.target === dom.modalOverlay) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Table Header Sorting
    document.querySelectorAll('.i2w-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-sort');
        if (AppState.sortColumn === col) {
          AppState.sortDirection = AppState.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          AppState.sortColumn = col;
          AppState.sortDirection = 'desc';
        }
        renderTable();
      });
    });

    // Island Filter Buttons for Spasial Data
    if (dom.islandFilterButtons) {
      dom.islandFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          dom.islandFilterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const island = btn.getAttribute('data-island');
          renderProvincialTable(island);
        });
      });
    }

    // Export Action Buttons
    if (dom.btnExportCSV) dom.btnExportCSV.addEventListener('click', exportToCSV);
    if (dom.btnExportExcel) dom.btnExportExcel.addEventListener('click', exportToExcel);
    if (dom.btnExportJSON) dom.btnExportJSON.addEventListener('click', exportToJSON);
    if (dom.btnPrintReport) dom.btnPrintReport.addEventListener('click', () => window.print());
  }

  function switchTab(tabId) {
    AppState.activeTab = tabId;

    if (dom.tabButtons) {
      dom.tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    if (dom.tabPanels) {
      dom.tabPanels.forEach(panel => {
        if (panel.id === `tab-${tabId}`) {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      });
    }

    // Trigger chart resize / re-render if switching to charts
    setTimeout(() => {
      if (tabId === 'overview' || tabId === 'timeseries') {
        if (AppState.charts.salesTrend) AppState.charts.salesTrend.resize();
        if (AppState.charts.segmentShift) AppState.charts.segmentShift.resize();
      }
      if (tabId === 'consumers') {
        if (AppState.charts.consumerRadar) AppState.charts.consumerRadar.resize();
        if (AppState.charts.tco) AppState.charts.tco.resize();
      }
      if (tabId === 'spasial') {
        if (AppState.charts.spasial) AppState.charts.spasial.resize();
      }
    }, 50);
  }

  // Main Initialize function
  function init() {
    initDOMElements();
    setupEventListeners();
    renderMetrics();
    renderTable();
    renderRegulations();
    renderManufacturers();
    renderPersonas();
    renderTCOTable();
    renderTypesComparisonTable();
    renderProvincialTable('all');
    renderSubsidyTable();
    renderMediaArchives();
    setupTcoSimulator();
    renderDataDictionary();
    initCharts();
    switchTab('overview');
    console.log(`${I2W_DATA.systemMetadata.systemName} v${I2W_DATA.systemMetadata.version} loaded successfully.`);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
