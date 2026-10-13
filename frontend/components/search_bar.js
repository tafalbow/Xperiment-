// ==============================================================================
// GLOBAL SEARCH BAR COMPONENT (Persistent Full-Width Search & Quick Indicators)
// ==============================================================================

export class SearchBar {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onSelectIndicator = options.onSelectIndicator || (() => {});
    this.onSearchChange = options.onSearchChange || (() => {});
    this.onNewsCategoryChange = options.onNewsCategoryChange || (() => {});
    this.onNewsSearchChange = options.onNewsSearchChange || (() => {});
    this.indicators = [];
    this.searchQuery = '';
    this.activeCategory = 'ALL'; // 'ALL' | 'FISKAL' | 'MONETER' | 'MAKRO'
    this.isDropdownOpen = false;

    // Mode: 'default' | 'news' (khusus halaman Berita Terkini)
    this.mode = 'default';
    this.activeNewsCategory = 'all';
    this.newsCategories = [
      { category_id: 'ekonomi_internasional', category_number: 1, icon: '🌐', label: '1. Ekonomi Internasional' },
      { category_id: 'politik_internasional', category_number: 2, icon: '🏛️', label: '2. Politik Internasional' },
      { category_id: 'ekonomi_nasional', category_number: 3, icon: '🇮🇩', label: '3. Ekonomi Nasional' },
      { category_id: 'politik_nasional', category_number: 4, icon: '⚖️', label: '4. Politik Nasional' },
      { category_id: 'teknologi_nasional', category_number: 5, icon: '💻', label: '5. Teknologi Nasional' },
      { category_id: 'investasi_nasional', category_number: 6, icon: '📈', label: '6. Investasi Nasional' },
      { category_id: 'industri_rokok_tembakau', category_number: 7, icon: '🏭', label: '7. Industri Rokok + Tembakau' },
      { category_id: 'sustainable_energi', category_number: 8, icon: '🌱', label: '8. Sustainable Energi' },
      { category_id: 'sosial', category_number: 9, icon: '🤝', label: '9. Sosial' }
    ];

    this.render();
  }

  setIndicators(indicators) {
    this.indicators = indicators || [];
    this.render();
  }

  setMode(mode, activeNewsCat = null) {
    const nextMode = mode === 'news' ? 'news' : 'default';
    if (activeNewsCat !== null) {
      this.activeNewsCategory = activeNewsCat;
    }
    if (this.mode !== nextMode) {
      this.mode = nextMode;
      this.searchQuery = '';
      this.isDropdownOpen = false;
    }
    this.render();
  }

  render() {
    if (!this.container) return;

    const isNewsMode = this.mode === 'news';
    const filtered = isNewsMode ? [] : this.getFilteredSuggestions();
    const placeholderText = isNewsMode
      ? 'Cari berita terkini, teori ekonomi terkait, atau sumber resmi...'
      : 'Cari indikator ekonomi, kode VAR_..., sektor, dasar hukum UU, atau lembaga (Kemenkeu / BPS / BI)...';

    this.container.innerHTML = `
      <div class="gov-card p-2.5 bg-white border border-[#DADCE0] shadow-xs space-y-1.5">
        <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          <!-- Left: Main Search Input with Icon -->
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-3.5 w-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              id="global-search-input" 
              class="gov-input pl-8 pr-8 py-1.5 w-full font-mono text-xs text-slate-900 placeholder-slate-400 bg-slate-50/70 focus:bg-white border-[#DADCE0] focus:border-slate-800 transition-all rounded" 
              placeholder="${placeholderText}"
              value="${this.searchQuery}"
              autocomplete="off"
            />
            ${this.searchQuery ? `
              <button 
                type="button" 
                id="btn-global-clear-search" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 text-xs font-mono font-bold cursor-pointer"
                title="Bersihkan Pencarian"
              >
                ✕
              </button>
            ` : ''}

            <!-- Autocomplete Suggestion Dropdown (Hanya untuk mode indikator standar) -->
            <div id="search-suggestions-dropdown" class="absolute left-0 right-0 top-full mt-1 bg-white border border-[#DADCE0] rounded-md shadow-xl z-50 max-h-72 overflow-y-auto ${!isNewsMode && this.isDropdownOpen && this.searchQuery ? '' : 'hidden'}">
              ${filtered.length === 0 ? `
                <div class="p-4 text-center text-xs font-mono text-slate-500">
                  Tidak ditemukan variabel yang cocok dengan <strong>"${this.searchQuery}"</strong>.
                </div>
              ` : `
                <div class="p-1.5 bg-slate-50 border-b border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Ditemukan <strong>${filtered.length}</strong> variabel resmi:</span>
                  <span>Tekan item untuk langsung memuat ke grafik</span>
                </div>
                <div class="divide-y divide-slate-100">
                  ${filtered.slice(0, 8).map(item => `
                    <div 
                      class="search-suggestion-item p-2.5 hover:bg-sky-50 transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs"
                      data-ind-id="${item.id}"
                    >
                      <div class="space-y-0.5">
                        <div class="font-semibold text-slate-900 flex items-center gap-1.5">
                          <span>${item.name}</span>
                          <span class="text-[10px] font-mono bg-slate-100 text-slate-600 px-1 py-0.2 rounded border border-slate-200">
                            ${item.unique_variable_code || item.id}
                          </span>
                        </div>
                        <div class="text-[10.5px] text-slate-500 font-mono flex items-center gap-2">
                          <span>🏛️ ${item.source_name || item.publishing_institution || 'Nasional'}</span>
                          <span>•</span>
                          <span>Satuan: ${item.unit}</span>
                          <span>•</span>
                          <span class="text-sky-700">${item.sector || ''}</span>
                        </div>
                      </div>
                      <div class="shrink-0 text-right">
                        <span class="gov-btn gov-btn-sm text-[10.5px] py-0.5 px-2 bg-white hover:bg-sky-100 text-sky-800 border-sky-300 shadow-2xs font-semibold">
                          Pilih ➔
                        </span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>

          <!-- Right: Conditional Filter (News Dropdown Filter when on Berita Terkini vs Quick Category Pills on other pages) -->
          ${isNewsMode ? `
            <div class="flex items-center gap-2 shrink-0">
              <label for="global-news-category-select" class="text-[11px] font-mono font-bold text-[#125B78] whitespace-nowrap">
                Kategori Berita:
              </label>
              <select
                id="global-news-category-select"
                class="px-3 py-1.5 text-xs font-mono font-semibold bg-[#F4F7FA] hover:bg-white text-[#0F3D56] border border-[#B8D4E3] focus:border-[#125B78] rounded-lg shadow-2xs outline-none cursor-pointer transition-all"
              >
                <option value="all" ${this.activeNewsCategory === 'all' ? 'selected' : ''}>
                  📋 Semua Kategori Berita (9 Kategori)
                </option>
                ${this.newsCategories.map(c => `
                  <option value="${c.category_id}" ${this.activeNewsCategory === c.category_id ? 'selected' : ''}>
                    ${c.icon} ${c.label}
                  </option>
                `).join('')}
              </select>
            </div>
          ` : `
            <div class="flex items-center gap-1.5 flex-wrap shrink-0">
              <span class="text-[10.5px] font-mono text-slate-500 mr-1 hidden xl:inline">Kategori Cepat:</span>
              <button 
                type="button" 
                class="btn-quick-cat px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${this.activeCategory === 'ALL' ? 'bg-[#E8F0FE] text-[#1A73E8] font-bold border-[#1A73E8] shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'}"
                data-cat="ALL"
              >
                Semua (47)
              </button>
              <button 
                type="button" 
                class="btn-quick-cat px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${this.activeCategory === 'FISKAL' ? 'bg-sky-800 text-white font-bold border-sky-800 shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'}"
                data-cat="FISKAL"
              >
                🏛️ Fiskal (36)
              </button>
              <button 
                type="button" 
                class="btn-quick-cat px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${this.activeCategory === 'MAKRO' ? 'bg-emerald-800 text-white font-bold border-emerald-800 shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'}"
                data-cat="MAKRO"
              >
                📈 Makro & PDB (9)
              </button>
              <button 
                type="button" 
                class="btn-quick-cat px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${this.activeCategory === 'MONETER' ? 'bg-amber-800 text-white font-bold border-amber-800 shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'}"
                data-cat="MONETER"
              >
                🏦 Moneter BI (2)
              </button>
            </div>
          `}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  getFilteredSuggestions() {
    const q = (this.searchQuery || '').toLowerCase().trim();
    return this.indicators.filter(ind => {
      // Category match
      let matchCat = true;
      const src = (ind.source_name || ind.publishing_institution || '').toLowerCase();
      const sec = (ind.sector || '').toLowerCase();
      if (this.activeCategory === 'FISKAL') {
        matchCat = src.includes('kemenkeu') || src.includes('keuangan') || sec.includes('pendapatan') || sec.includes('belanja') || sec.includes('fiskal');
      } else if (this.activeCategory === 'MAKRO') {
        matchCat = src.includes('bps') || src.includes('statistik') || sec.includes('makro') || sec.includes('pdb');
      } else if (this.activeCategory === 'MONETER') {
        matchCat = src.includes('indonesia') || src.includes('bi') || sec.includes('moneter');
      }

      if (!q) return matchCat;

      const matchText = (ind.name && ind.name.toLowerCase().includes(q)) ||
        (ind.id && ind.id.toLowerCase().includes(q)) ||
        (ind.unique_variable_code && ind.unique_variable_code.toLowerCase().includes(q)) ||
        (ind.sector && ind.sector.toLowerCase().includes(q)) ||
        (ind.source_name && ind.source_name.toLowerCase().includes(q)) ||
        (ind.publication_document_name && ind.publication_document_name.toLowerCase().includes(q));

      return matchCat && matchText;
    });
  }

  attachEvents() {
    const input = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('btn-global-clear-search');
    const newsSelect = document.getElementById('global-news-category-select');

    input?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      if (this.mode === 'news') {
        this.onNewsSearchChange(this.searchQuery);
        return;
      }
      this.isDropdownOpen = this.searchQuery.length > 0;
      this.render();
      const newInput = document.getElementById('global-search-input');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
      this.onSearchChange(this.searchQuery);
    });

    input?.addEventListener('focus', () => {
      if (this.mode !== 'news' && this.searchQuery) {
        this.isDropdownOpen = true;
        const dd = document.getElementById('search-suggestions-dropdown');
        if (dd) dd.classList.remove('hidden');
      }
    });

    clearBtn?.addEventListener('click', () => {
      this.searchQuery = '';
      this.isDropdownOpen = false;
      this.render();
      if (this.mode === 'news') {
        this.onNewsSearchChange('');
      } else {
        this.onSearchChange('');
      }
    });

    newsSelect?.addEventListener('change', (e) => {
      this.activeNewsCategory = e.target.value || 'all';
      this.onNewsCategoryChange(this.activeNewsCategory);
    });

    // Handle Enter key on search input
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (this.mode === 'news') {
          this.onNewsSearchChange(this.searchQuery);
          return;
        }
        const filtered = this.getFilteredSuggestions();
        if (filtered.length > 0) {
          this.isDropdownOpen = false;
          this.onSelectIndicator(filtered[0].id);
        } else if (window.__govApp && !window.__govApp.isAuthenticated()) {
          window.__govApp.showLoginRequiredPrompt('Pencarian Indikator');
        }
      }
    });

    // Suggestion item selection
    this.container.querySelectorAll('.search-suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const indId = item.getAttribute('data-ind-id');
        this.isDropdownOpen = false;
        this.onSelectIndicator(indId);
        const dd = document.getElementById('search-suggestions-dropdown');
        if (dd) dd.classList.add('hidden');
      });
    });

    // Quick category buttons
    this.container.querySelectorAll('.btn-quick-cat').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.__govApp && !window.__govApp.isAuthenticated()) {
          const cat = btn.getAttribute('data-cat');
          window.__govApp.showLoginRequiredPrompt(`Kategori ${cat}`);
          return;
        }
        const cat = btn.getAttribute('data-cat');
        this.activeCategory = cat;
        this.render();
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.isDropdownOpen = false;
        const dd = document.getElementById('search-suggestions-dropdown');
        if (dd) dd.classList.add('hidden');
      }
    });
  }
}
