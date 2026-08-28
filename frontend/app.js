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
import { ModalManager } from './components/modals.js';

class App {
  constructor() {
    this.searchBar = null;
    this.filterPanel = null;
    this.sidebarExtras = null;
    this.chartModule = null;
    this.dataGrid = null;
    this.contextualMap = null;
    this.variablesInventory = null;
    this.activeMainTab = 'analytics'; // 'analytics' or 'inventory'

    this.currentQueryState = {
      sector: '',
      category: '',
      subcategory: '',
      indicator_id: 'IND-GDP-GROWTH-YOY',
      start_year: 2001, // Default 24 titik tahunan (2001 - 2024)
      end_year: 2024,
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

      // 11. Initial Data Fetch
      await this.loadData();

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
    const btnAnalytics = document.getElementById('tab-btn-analytics');
    const btnInventory = document.getElementById('tab-btn-inventory');
    const contentAnalytics = document.getElementById('tab-content-analytics');
    const contentInventory = document.getElementById('tab-content-inventory');

    btnAnalytics?.addEventListener('click', () => {
      this.switchMainTab('analytics');
    });

    btnInventory?.addEventListener('click', () => {
      this.switchMainTab('inventory');
    });
  }

  switchMainTab(tabName) {
    this.activeMainTab = tabName;
    const btnAnalytics = document.getElementById('tab-btn-analytics');
    const btnInventory = document.getElementById('tab-btn-inventory');
    const contentAnalytics = document.getElementById('tab-content-analytics');
    const contentInventory = document.getElementById('tab-content-inventory');

    if (tabName === 'analytics') {
      contentAnalytics?.classList.remove('hidden');
      contentInventory?.classList.add('hidden');

      btnAnalytics?.classList.add('border-slate-900', 'bg-white', 'text-slate-900', 'font-bold', 'shadow-2xs');
      btnAnalytics?.classList.remove('border-transparent', 'text-slate-600', 'font-medium');

      btnInventory?.classList.remove('border-slate-900', 'bg-white', 'text-slate-900', 'font-bold', 'shadow-2xs');
      btnInventory?.classList.add('border-transparent', 'text-slate-600', 'font-medium');

      // Re-trigger chart canvas draw after becoming visible
      if (this.chartModule) {
        requestAnimationFrame(() => this.chartModule.drawChart());
      }
    } else {
      contentAnalytics?.classList.add('hidden');
      contentInventory?.classList.remove('hidden');

      btnInventory?.classList.add('border-slate-900', 'bg-white', 'text-slate-900', 'font-bold', 'shadow-2xs');
      btnInventory?.classList.remove('border-transparent', 'text-slate-600', 'font-medium');

      btnAnalytics?.classList.remove('border-slate-900', 'bg-white', 'text-slate-900', 'font-bold', 'shadow-2xs');
      btnAnalytics?.classList.add('border-transparent', 'text-slate-600', 'font-medium');
    }
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
