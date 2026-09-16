// ==============================================================================
// MAIN APP CONTROLLER
// Pusat Basis Data Data Sekunder: Pergerakan Ekonomi Indonesia
// ==============================================================================

import { ApiClient } from './services/api_client.js';
import { renderHeader, openEmailRegistrationModal } from './components/header.js';
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
import { LKPPView } from './components/lkpp_view.js';
import { WeeklyView } from './components/weekly_view.js';
import { CustomChartStudio } from './components/custom_chart_studio.js';
import { CukaiBpsView } from './components/cukai_bps_view.js?v=11.2.0';
import { AdminView } from './components/admin_view.js?v=11.3.0';
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
    this.agriCommodityTracker = null;
    this.productionCommodityTracker = null;
    this.commodityTracker = null;
    this.agriCalendar = null;
    this.activeAgriSubTab = 'balance'; // 'balance' | 'calendar'
    this.lkppView = null;
    this.weeklyView = null;
    this.customChartStudio = null;
    this.cukaiBpsView = null;
    this.adminView = null;
    this.activeMainTab = 'home'; // Primary Sections: 'home' | 'analytics' | 'agri' | 'production' | 'lkpp' | 'weekly' | 'custom-chart' | 'cukai-bps' | 'inventory' | 'about' | 'admin'


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

      // 16. Check Master Admin Session & Setup Reactive Listeners
      this.checkAdminVisibility();
      window.addEventListener('master-admin-login', () => {
        this.checkAdminVisibility();
        this.switchMainTab('admin');
      });
      window.addEventListener('master-admin-logout', () => {
        this.checkAdminVisibility();
        this.switchMainTab('home');
      });

      // Set default landing tab to Home
      this.switchMainTab('home');

      // 17. Persistent Statutory Section & Footer Listeners
      window.openEmailRegistrationModal = openEmailRegistrationModal;
      document.getElementById('btn-statutory-register')?.addEventListener('click', () => {
        openEmailRegistrationModal(() => {
          // Success callback
        });
      });
      document.getElementById('footer-link-about')?.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchMainTab('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

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

  checkAdminVisibility() {
    const btnAdmin = document.getElementById('tab-btn-admin');
    if (!btnAdmin) return;
    let isMaster = false;
    try {
      const sess = JSON.parse(localStorage.getItem('master_admin_session') || '{}');
      const email = sess.email?.trim().toLowerCase();
      if (email === 'taniafatimahlubis@gmail.com' || email === 'lubistaniafatimah@gmail.com' || email === 'lubis.tania@dewanekonomi.go.id') {
        isMaster = true;
      }
    } catch (e) {}

    if (isMaster) {
      btnAdmin.classList.remove('hidden');
    } else {
      btnAdmin.classList.add('hidden');
    }
  }

  setupMainTabs() {
    const btnHome = document.getElementById('tab-btn-home');
    const btnAnalytics = document.getElementById('tab-btn-analytics');
    const btnAgri = document.getElementById('tab-btn-agri');
    const btnProduction = document.getElementById('tab-btn-production');
    const btnLkpp = document.getElementById('tab-btn-lkpp');
    const btnWeekly = document.getElementById('tab-btn-weekly');
    const btnCustomChart = document.getElementById('tab-btn-custom-chart');
    const btnCukaiBps = document.getElementById('tab-btn-cukai-bps');
    const btnInventory = document.getElementById('tab-btn-inventory');
    const btnAbout = document.getElementById('tab-btn-about');

    // Sub-tab buttons inside Pertanian & Peternakan
    const btnAgriBalance = document.getElementById('agri-subtab-btn-balance');
    const btnAgriCalendar = document.getElementById('agri-subtab-btn-calendar');

    btnHome?.addEventListener('click', () => this.switchMainTab('home'));
    btnAnalytics?.addEventListener('click', () => this.switchMainTab('analytics'));
    btnAgri?.addEventListener('click', () => this.switchMainTab('agri'));
    btnProduction?.addEventListener('click', () => this.switchMainTab('production'));
    btnLkpp?.addEventListener('click', () => this.switchMainTab('lkpp'));
    btnWeekly?.addEventListener('click', () => this.switchMainTab('weekly'));
    btnCustomChart?.addEventListener('click', () => this.switchMainTab('custom-chart'));
    btnCukaiBps?.addEventListener('click', () => this.switchMainTab('cukai-bps'));
    btnInventory?.addEventListener('click', () => this.switchMainTab('inventory'));
    btnAbout?.addEventListener('click', () => this.switchMainTab('about'));

    const btnAdmin = document.getElementById('tab-btn-admin');
    btnAdmin?.addEventListener('click', () => this.switchMainTab('admin'));

    btnAgriBalance?.addEventListener('click', () => this.switchAgriSubTab('balance'));
    btnAgriCalendar?.addEventListener('click', () => this.switchAgriSubTab('calendar'));
  }

  async switchAgriSubTab(subTabName) {
    this.activeAgriSubTab = subTabName;
    const btnBalance = document.getElementById('agri-subtab-btn-balance');
    const btnCalendar = document.getElementById('agri-subtab-btn-calendar');
    const contentBalance = document.getElementById('agri-subcontent-balance');
    const contentCalendar = document.getElementById('agri-subcontent-calendar');

    if (subTabName === 'balance') {
      btnBalance?.classList.add('bg-white', 'text-[#0038A8]', 'font-bold', 'shadow-2xs');
      btnBalance?.classList.remove('text-[#5F6368]', 'font-medium');
      btnBalance?.setAttribute('aria-selected', 'true');

      btnCalendar?.classList.remove('bg-white', 'text-[#0038A8]', 'font-bold', 'shadow-2xs');
      btnCalendar?.classList.add('text-[#5F6368]', 'font-medium');
      btnCalendar?.setAttribute('aria-selected', 'false');

      contentBalance?.classList.remove('hidden');
      contentCalendar?.classList.add('hidden');

      if (!this.agriCommodityTracker) {
        this.agriCommodityTracker = new CommodityTrackerComponent('agri-subcontent-balance', 'PERTANIAN_PETERNAKAN');
        await this.agriCommodityTracker.init();
      } else {
        await this.agriCommodityTracker.setDivision('PERTANIAN_PETERNAKAN');
      }
      setTimeout(() => {
        this.agriCommodityTracker?.drawChart();
        this.agriCommodityTracker?.invalidateMapSize();
      }, 70);
    } else if (subTabName === 'calendar') {
      btnCalendar?.classList.add('bg-white', 'text-[#0038A8]', 'font-bold', 'shadow-2xs');
      btnCalendar?.classList.remove('text-[#5F6368]', 'font-medium');
      btnCalendar?.setAttribute('aria-selected', 'true');

      btnBalance?.classList.remove('bg-white', 'text-[#0038A8]', 'font-bold', 'shadow-2xs');
      btnBalance?.classList.add('text-[#5F6368]', 'font-medium');
      btnBalance?.setAttribute('aria-selected', 'false');

      contentCalendar?.classList.remove('hidden');
      contentBalance?.classList.add('hidden');

      if (!this.agriCalendar) {
        this.agriCalendar = new AgriCalendarComponent('agri-calendar-container');
      }
      await this.agriCalendar.render();
      setTimeout(() => {
        if (this.agriCalendar && this.agriCalendar.mapInstance) {
          this.agriCalendar.mapInstance.invalidateSize();
        }
      }, 200);
    }
  }

  async switchMainTab(tabName, division = null, subTab = null) {
    // Backward compatibility: If 'calendar' is requested, redirect to 'agri' with 'calendar' subtab
    if (tabName === 'calendar') {
      return this.switchMainTab('agri', null, 'calendar');
    }

    this.activeMainTab = tabName;
    const btnHome = document.getElementById('tab-btn-home');
    const btnAnalytics = document.getElementById('tab-btn-analytics');
    const btnAgri = document.getElementById('tab-btn-agri');
    const btnProduction = document.getElementById('tab-btn-production');
    const btnLkpp = document.getElementById('tab-btn-lkpp');
    const btnWeekly = document.getElementById('tab-btn-weekly');
    const btnCustomChart = document.getElementById('tab-btn-custom-chart');
    const btnCukaiBps = document.getElementById('tab-btn-cukai-bps');
    const btnInventory = document.getElementById('tab-btn-inventory');
    const btnAbout = document.getElementById('tab-btn-about');
    const btnAdmin = document.getElementById('tab-btn-admin');

    const contentHome = document.getElementById('tab-content-home');
    const contentAnalytics = document.getElementById('tab-content-analytics');
    const contentAgri = document.getElementById('tab-content-agri');
    const contentProduction = document.getElementById('tab-content-production');
    const contentLkpp = document.getElementById('tab-content-lkpp');
    const contentWeekly = document.getElementById('tab-content-weekly');
    const contentCustomChart = document.getElementById('tab-content-custom-chart');
    const contentCukaiBps = document.getElementById('tab-content-cukai-bps');
    const contentInventory = document.getElementById('tab-content-inventory');
    const contentAbout = document.getElementById('tab-content-about');
    const contentAdmin = document.getElementById('tab-content-admin');

    const resetBtn = (btn) => {
      btn?.classList.remove('border-[#1A73E8]', 'border-[#0038A8]', 'border-slate-900', 'bg-white', 'text-[#1A73E8]', 'text-[#0038A8]', 'text-slate-900', 'font-bold', 'shadow-2xs');
      btn?.classList.add('border-transparent', 'text-[#5D4037]', 'font-medium');
      btn?.setAttribute('aria-selected', 'false');
    };

    const activateBtn = (btn) => {
      btn?.classList.add('border-[#0038A8]', 'bg-white', 'text-[#0038A8]', 'font-bold', 'shadow-2xs', 'outline-none');
      btn?.classList.remove('border-transparent', 'text-[#5D4037]', 'text-[#5F6368]', 'text-slate-600', 'font-medium');
      btn?.setAttribute('aria-selected', 'true');
    };

    // Hide all contents and reset all buttons
    [contentHome, contentAnalytics, contentAgri, contentProduction, contentLkpp, contentWeekly, contentCustomChart, contentCukaiBps, contentInventory, contentAbout, contentAdmin].forEach(c => c?.classList.add('hidden'));
    [btnHome, btnAnalytics, btnAgri, btnProduction, btnLkpp, btnWeekly, btnCustomChart, btnCukaiBps, btnInventory, btnAbout, btnAdmin].forEach(b => resetBtn(b));

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
      if (this.contextualMap && this.contextualMap.mapInstance) {
        setTimeout(() => {
          if (this.contextualMap && this.contextualMap.mapInstance) {
            this.contextualMap.mapInstance.invalidateSize();
          }
        }, 150);
        setTimeout(() => {
          if (this.contextualMap && this.contextualMap.mapInstance) {
            this.contextualMap.mapInstance.invalidateSize();
          }
        }, 400);
      }
    } else if (tabName === 'agri') {
      contentAgri?.classList.remove('hidden');
      activateBtn(btnAgri);
      const targetSub = subTab || this.activeAgriSubTab || 'balance';
      await this.switchAgriSubTab(targetSub);
    } else if (tabName === 'production') {
      contentProduction?.classList.remove('hidden');
      activateBtn(btnProduction);
      if (!this.productionCommodityTracker) {
        this.productionCommodityTracker = new CommodityTrackerComponent('production-commodities-container', 'HASIL_BUMI');
        await this.productionCommodityTracker.init();
      } else {
        await this.productionCommodityTracker.setDivision('HASIL_BUMI');
      }
      setTimeout(() => {
        this.productionCommodityTracker?.drawChart();
        this.productionCommodityTracker?.invalidateMapSize();
      }, 70);
    } else if (tabName === 'lkpp') {
      contentLkpp?.classList.remove('hidden');
      activateBtn(btnLkpp);
      if (!this.lkppView) {
        this.lkppView = new LKPPView('lkpp-view-container');
        await this.lkppView.init();
      } else {
        await this.lkppView.loadAndRender();
      }
    } else if (tabName === 'weekly') {
      contentWeekly?.classList.remove('hidden');
      activateBtn(btnWeekly);
      if (!this.weeklyView) {
        this.weeklyView = new WeeklyView('weekly-view-container');
        await this.weeklyView.init();
      } else {
        await this.weeklyView.loadAndRender();
      }
    } else if (tabName === 'custom-chart') {
      contentCustomChart?.classList.remove('hidden');
      activateBtn(btnCustomChart);
      if (!this.customChartStudio) {
        this.customChartStudio = new CustomChartStudio('custom-chart-container');
        await this.customChartStudio.init();
      } else {
        await this.customChartStudio.refreshStudio();
      }
    } else if (tabName === 'cukai-bps' || tabName === 'cukai') {
      contentCukaiBps?.classList.remove('hidden');
      activateBtn(btnCukaiBps);
      if (!this.cukaiBpsView) {
        this.cukaiBpsView = new CukaiBpsView('cukai-bps-view-container');
        await this.cukaiBpsView.init();
      }
    } else if (tabName === 'inventory' || tabName === 'catalog') {
      contentInventory?.classList.remove('hidden');
      activateBtn(btnInventory);
    } else if (tabName === 'about') {
      contentAbout?.classList.remove('hidden');
      activateBtn(btnAbout);
      if (this.aboutView) {
        this.aboutView.render();
      }
    } else if (tabName === 'admin') {
      contentAdmin?.classList.remove('hidden');
      activateBtn(btnAdmin);
      if (!this.adminView) {
        this.adminView = new AdminView('admin-view-container');
        await this.adminView.init();
      } else {
        await this.adminView.refresh();
      }
    }

    // Telemetry logging
    ApiClient.logTraffic(tabName);

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
