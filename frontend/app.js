// ==============================================================================
// MAIN APP CONTROLLER
// Pusat Basis Data Data Sekunder: Pergerakan Ekonomi Indonesia
// ==============================================================================

import { ApiClient } from './services/api_client.js';
import { renderHeader } from './components/header.js';
import { SearchBar } from './components/search_bar.js';
import { FilterPanel } from './components/filter_panel.js';
import { SidebarExtras } from './components/sidebar_extras.js';
import { renderKPICards } from './components/kpi_cards.js';
import { ChartModule } from './components/chart_module.js';
import { DataGrid } from './components/data_grid.js';
import { ContextualMap } from './components/contextual_map.js';
import { VariablesInventory } from './components/variables_inventory.js';
import { CommodityTrackerComponent } from './components/commodity_tracker.js';
import { HomeView } from './components/home_view.js';
import { AgriCalendarComponent } from './components/agri_calendar.js';
import { AboutView } from './components/about_view.js';
import { ModalManager } from './components/modals.js';

class App {
  constructor() {
    this.homeView = null;
    this.agriCalendar = null;
    this.aboutView = null;
    this.searchBar = null;
    this.filterPanel = null;
    this.sidebarExtras = null;
    this.chartModule = null;
    this.dataGrid = null;
    this.contextualMap = null;
    this.variablesInventory = null;
    this.commodityTracker = null;
    this.activeMainTab = 'home'; // 7 Primary Sections: 'home' | 'analytics' | 'agri' | 'calendar' | 'production' | 'inventory' | 'about'

    this.currentQueryState = {
      sector: '',
      category: '',
      subcategory: '',
      indicator_id: 'IND-GDP-GROWTH-YOY',
      start_year: 1990, // Default 37 titik tahunan (1990 - 2026)
      end_year: 2026,
      source_id: '',
      status: '',
      search_keyword: '',
      limit: 5,         // Fix 5 data per halaman
      offset: 0,
      sort_by: 'period',
      sort_order: 'DESC'
    };

    this.init();
  }

  async init() {
    // 1. Render Header
    renderHeader('app-header', {
      onOpenDictionary: () => ModalManager.showDictionaryModal(),
      onOpenRegistry: () => ModalManager.showRegistryModal(),
      onOpenCrosswalk: () => ModalManager.showCrosswalkModal(),
      onOpenIngestion: () => ModalManager.showIngestionModal()
    });

    // 2. Setup Main Tab Navigation
    this.setupMainTabs();

    // 3. Fetch Initial Filter Options
    try {
      const filterOpts = await ApiClient.fetchFilterOptions();

      // Store available indicators list
      this.allIndicators = filterOpts.indicators || [];

      // 4. Initialize Global Search Bar
      this.searchBar = new SearchBar('global-search-container', {
        onSelectIndicator: (selectedIndId) => {
          this.selectVariableAndSwitchToDashboard(selectedIndId);
        },
        onSearchChange: (kw) => {
          // Live search sync
        }
      });
      if (this.allIndicators.length > 0) {
        this.searchBar.setIndicators(this.allIndicators);
      }

      // 5. Initialize Sidebar Filtering Panel
      this.filterPanel = new FilterPanel('filter-panel-container', filterOpts, (newState) => {
        this.handleFilterChange(newState);
      });

      // 6. Initialize Sidebar Extras (Tab Sumber Data, Contact Person, Ownership & Upgrade Slot)
      this.sidebarExtras = new SidebarExtras('sidebar-extras-container', {
        totalVariables: this.allIndicators.length || 47,
        onSwitchToInventory: () => {
          this.switchMainTab('inventory');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

      // 7. Initialize Contextual GIS Map
      this.contextualMap = new ContextualMap('contextual-map-container', async (selectedSeriesIdx) => {
        if (this.chartModule) {
          await this.chartModule.activateSeriesTab(selectedSeriesIdx);
        }
      });

      // 8. Initialize Chart Module with available indicators & live bidirectional sync
      this.chartModule = new ChartModule('chart-module-container', {
        onRangeShortcutChange: (startYear, endYear) => {
          this.currentQueryState.start_year = startYear;
          this.currentQueryState.end_year = endYear;
          if (this.filterPanel) {
            this.filterPanel.updateYearInputs(startYear, endYear);
          }
          this.loadData();
        },
        onChartHoverYear: (year, sIdx) => {
          if (this.contextualMap) {
            this.contextualMap.syncWithHoverPoint(year, sIdx);
          }
        },
        onActiveSeriesChange: (seriesList, sIdx) => {
          if (this.contextualMap) {
            this.contextualMap.setSeriesList(seriesList, sIdx);
          }
        }
      });

      if (this.allIndicators.length > 0) {
        this.chartModule.setAvailableIndicators(this.allIndicators);
      }

      // 9. Initialize Data Grid
      this.dataGrid = new DataGrid('data-grid-container', {
        onSortChange: (col, order) => {
          this.currentQueryState.sort_by = col;
          this.currentQueryState.sort_order = order;
          this.loadData();
        },
        onPageChange: (newPage) => {
          this.currentQueryState.offset = (newPage - 1) * this.currentQueryState.limit;
          this.loadData();
        },
        onLimitChange: (newLimit) => {
          this.currentQueryState.limit = newLimit;
          this.currentQueryState.offset = 0;
          this.loadData();
        },
        onViewProvenance: (obsId) => ModalManager.showProvenanceModal(obsId),
        onViewMetadata: (indId) => ModalManager.showDictionaryModal(indId),
        onViewRevision: (indId) => ModalManager.showProvenanceModal(indId)
      });

      // 10. Initialize Dedicated Variables Inventory Component
      this.variablesInventory = new VariablesInventory('variables-inventory-container', {
        onSelectVariableForDashboard: (selectedIndId) => {
          this.selectVariableAndSwitchToDashboard(selectedIndId);
        }
      });

      // 11. Initialize Home View
      this.homeView = new HomeView('home-view-container', {
        onNavigate: (targetTab) => this.switchMainTab(targetTab),
        onOpenCrosswalk: () => ModalManager.showClassificationDocumentModal()
      });
      await this.homeView.render();

      // 12. Initialize Agricultural Calendar
      this.agriCalendar = new AgriCalendarComponent('agri-calendar-container');

      // 13. Initialize About View
      this.aboutView = new AboutView('about-view-container');

      // 14. Setup Keyboard Shortcut Ctrl+K for Global Search (Section 5)
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
          e.preventDefault();
          ModalManager.showGlobalSearchModal();
        }
      });

      // 15. Initial Data Fetch for Indicators
      await this.loadData();

      // Set default landing tab to Home
      this.switchMainTab('home');

    } catch (err) {
      console.error('App initialization error:', err);
      const appMain = document.getElementById('app-main');
      if (appMain) {
        appMain.innerHTML = `
          <div class="gov-card p-8 text-center text-rose-700 bg-rose-50 font-mono text-xs">
            <h3 class="font-bold text-sm mb-1">Gagal Menghubungkan ke Backend Repositori</h3>
            <p>${err.message}</p>
          </div>
        `;
      }
    }
  }

  setupMainTabs() {
    const btnHome = document.getElementById('tab-btn-home');
    const btnAnalytics = document.getElementById('tab-btn-analytics');
    const btnAgri = document.getElementById('tab-btn-agri');
    const btnCalendar = document.getElementById('tab-btn-calendar');
    const btnProduction = document.getElementById('tab-btn-production');
    const btnInventory = document.getElementById('tab-btn-inventory');
    const btnAbout = document.getElementById('tab-btn-about');

    btnHome?.addEventListener('click', () => this.switchMainTab('home'));
    btnAnalytics?.addEventListener('click', () => this.switchMainTab('analytics'));
    btnAgri?.addEventListener('click', () => this.switchMainTab('agri'));
    btnCalendar?.addEventListener('click', () => this.switchMainTab('calendar'));
    btnProduction?.addEventListener('click', () => this.switchMainTab('production'));
    btnInventory?.addEventListener('click', () => this.switchMainTab('inventory'));
    btnAbout?.addEventListener('click', () => this.switchMainTab('about'));
  }

  async switchMainTab(tabName, division = null) {
    this.activeMainTab = tabName;
    const btnHome = document.getElementById('tab-btn-home');
    const btnAnalytics = document.getElementById('tab-btn-analytics');
    const btnAgri = document.getElementById('tab-btn-agri');
    const btnCalendar = document.getElementById('tab-btn-calendar');
    const btnProduction = document.getElementById('tab-btn-production');
    const btnInventory = document.getElementById('tab-btn-inventory');
    const btnAbout = document.getElementById('tab-btn-about');

    const contentHome = document.getElementById('tab-content-home');
    const contentAnalytics = document.getElementById('tab-content-analytics');
    const contentCommodities = document.getElementById('tab-content-commodities');
    const contentCalendar = document.getElementById('tab-content-calendar');
    const contentInventory = document.getElementById('tab-content-inventory');
    const contentAbout = document.getElementById('tab-content-about');

    const resetBtn = (btn) => {
      btn?.classList.remove('border-[#1A73E8]', 'border-slate-900', 'bg-white', 'text-[#1A73E8]', 'text-slate-900', 'font-bold', 'shadow-2xs');
      btn?.classList.add('border-transparent', 'text-[#5F6368]', 'font-medium');
      btn?.setAttribute('aria-selected', 'false');
    };

    const activateBtn = (btn) => {
      btn?.classList.add('border-[#1A73E8]', 'bg-white', 'text-[#1A73E8]', 'font-bold', 'shadow-2xs', 'outline-none');
      btn?.classList.remove('border-transparent', 'text-[#5F6368]', 'text-slate-600', 'font-medium');
      btn?.setAttribute('aria-selected', 'true');
    };

    // Hide all contents and reset all buttons
    [contentHome, contentAnalytics, contentCommodities, contentCalendar, contentInventory, contentAbout].forEach(c => c?.classList.add('hidden'));
    [btnHome, btnAnalytics, btnAgri, btnCalendar, btnProduction, btnInventory, btnAbout].forEach(b => resetBtn(b));

    if (tabName === 'home') {
      contentHome?.classList.remove('hidden');
      activateBtn(btnHome);
      if (this.homeView) this.homeView.render();
    } else if (tabName === 'analytics' || tabName === 'indicators') {
      contentAnalytics?.classList.remove('hidden');
      activateBtn(btnAnalytics);
      if (this.chartModule) {
        requestAnimationFrame(() => this.chartModule.drawChart());
      }
    } else if (tabName === 'agri') {
      contentCommodities?.classList.remove('hidden');
      activateBtn(btnAgri);
      if (!this.commodityTracker) {
        this.commodityTracker = new CommodityTrackerComponent('tab-content-commodities');
        await this.commodityTracker.init();
      }
      await this.commodityTracker.setDivision('PERTANIAN_PETERNAKAN');
    } else if (tabName === 'calendar') {
      contentCalendar?.classList.remove('hidden');
      activateBtn(btnCalendar);
      if (this.agriCalendar) {
        await this.agriCalendar.render();
      }
    } else if (tabName === 'production') {
      contentCommodities?.classList.remove('hidden');
      activateBtn(btnProduction);
      if (!this.commodityTracker) {
        this.commodityTracker = new CommodityTrackerComponent('tab-content-commodities');
        await this.commodityTracker.init();
      }
      await this.commodityTracker.setDivision('HASIL_BUMI');
    } else if (tabName === 'inventory' || tabName === 'catalog') {
      contentInventory?.classList.remove('hidden');
      activateBtn(btnInventory);
    } else if (tabName === 'about') {
      contentAbout?.classList.remove('hidden');
      activateBtn(btnAbout);
      if (this.aboutView) {
        this.aboutView.render();
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async selectVariableAndSwitchToDashboard(indId) {
    // 1. Switch back to Dasbor Analitik
    this.switchMainTab('analytics');

    // 2. Set Indicator ID
    this.currentQueryState.indicator_id = indId;

    // 3. Find matching indicator info to populate sector/category
    const ind = (this.allIndicators || []).find(i => i.id === indId);
    if (ind) {
      this.currentQueryState.sector = ind.sector || '';
      this.currentQueryState.category = ind.category || '';
    }

    // 4. Update Filter Panel UI
    if (this.filterPanel && ind) {
      this.filterPanel.setFilterValues({
        sector: ind.sector || '',
        category: ind.category || '',
        indicator_id: indId
      });
    }

    // 5. Reload Data
    await this.loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async handleFilterChange(newState) {
    this.currentQueryState = {
      ...this.currentQueryState,
      ...newState,
      offset: 0 // Reset pagination on filter change
    };
    await this.loadData();
  }

  async loadData() {
    try {
      // 1. Fetch Observations
      const obsResponse = await ApiClient.fetchObservations(this.currentQueryState);
      this.dataGrid.updateData({
        records: obsResponse.records,
        total_records: obsResponse.total_records,
        page: obsResponse.page,
        page_size: obsResponse.page_size,
        sort_by: this.currentQueryState.sort_by,
        sort_order: this.currentQueryState.sort_order
      });

      // 2. Fetch Indicator Metadata & KPIs if indicator selected
      const targetIndId = this.currentQueryState.indicator_id || (obsResponse.records[0] ? obsResponse.records[0].indicator_id : null);
      if (targetIndId) {
        const kpi = await ApiClient.fetchKPISummary(targetIndId);
        renderKPICards('kpi-cards-container', kpi);

        // Fetch observations for chart (with selected indicator)
        const chartObsRes = await ApiClient.fetchObservations({
          indicator_id: targetIndId,
          start_year: this.currentQueryState.start_year,
          end_year: this.currentQueryState.end_year,
          limit: 500,
          sort_by: 'period',
          sort_order: 'ASC'
        });

        // 3. Fetch Contextual Driver GIS Information
        const drivers = await ApiClient.fetchContextualDrivers(targetIndId);
        this.contextualMap.setDrivers(drivers);

        this.chartModule.setData(chartObsRes.records, {
          id: targetIndId,
          name: kpi.indicator_name,
          unit: kpi.unit
        }, drivers, this.allIndicators);
      } else {
        renderKPICards('kpi-cards-container', null);
        this.contextualMap.setDrivers([]);
        this.chartModule.setData([], null, []);
      }

    } catch (err) {
      console.error('Error loading data:', err);
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.__govApp = new App();
});
