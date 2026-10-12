// ==============================================================================
// NEWS & ECONOMIC THEORY OBSERVATORY VIEW
// Kompilasi Top 3 Berita pada 9 Kategori Strategis + Link Resmi + Teori Ekonomi
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

export class NewsTheoryView {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.data = null;
    this.activeCategory = 'all';
    this.searchKeyword = '';
  }

  async init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;
    await this.loadAndRender();
  }

  async loadAndRender() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    try {
      const response = await ApiClient.fetchNewsTheory();
      if (response && response.categories) {
        this.data = response;
      }
    } catch (e) {
      console.warn('Fallback to embedded NewsTheory data:', e);
    }

    this.render();
  }

  getFilteredCategories() {
    const allCategories = this.data?.categories || [];
    return allCategories
      .filter(cat => this.activeCategory === 'all' || cat.category_id === this.activeCategory)
      .map(cat => {
        if (!this.searchKeyword.trim()) return cat;
        const kw = this.searchKeyword.trim().toLowerCase();
        const matchedItems = (cat.items || []).filter(item => {
          const paraText = Array.isArray(item.paragraphs) ? item.paragraphs.join(' ').toLowerCase() : '';
          return (
            item.title.toLowerCase().includes(kw) ||
            (item.summary || '').toLowerCase().includes(kw) ||
            paraText.includes(kw) ||
            item.theory_name.toLowerCase().includes(kw) ||
            item.theory_explanation.toLowerCase().includes(kw) ||
            item.source_name.toLowerCase().includes(kw) ||
            cat.category_title.toLowerCase().includes(kw)
          );
        });
        return { ...cat, items: matchedItems };
      })
      .filter(cat => (cat.items || []).length > 0);
  }

  render() {
    if (!this.container) return;

    const allCategories = this.data?.categories || [];
    const filteredCategories = this.getFilteredCategories();
    const totalNewsCount = filteredCategories.reduce((acc, c) => acc + (c.items?.length || 0), 0);

    this.container.innerHTML = `
      <div class="space-y-4">
        
        <!-- 1. HEADER BANNER -->
        <div class="gov-card p-5 sm:p-6 bg-gradient-to-r from-[#0F3D56] via-[#125B78] to-[#0038A8] text-white rounded-xl shadow-xs">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-4xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/25 text-[11px] font-mono font-bold text-amber-300">
                <span>📰</span>
                <span>OBSERVATORIUM BERITA STRATEGIS & KAJIAN TEORI EKONOMI</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                Kompilasi Top 3 Berita Utama (9 Sektor Strategis) & Landasan Teori Ekonomi
              </h1>
              <p class="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                Menyajikan masing-masing <strong>Top 3 Berita</strong> pada 9 kategori strategis internasional dan nasional lengkap dengan <strong>isi berita (2 paragraf)</strong> dan <strong>tautan rujukan resmi</strong> di sisi kiri (<em>Berita</em>), serta <strong>teori ekonomi terkait beserta penjelasannya</strong> di sisi kanan (<em>Penjelasan</em>).
              </p>
            </div>

            <!-- Summary Pill Right -->
            <div class="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-3.5 font-mono text-xs shrink-0 space-y-1">
              <div class="text-amber-300 font-bold flex items-center gap-1.5">
                <span>📊</span>
                <span>Cakupan Kurasi: 9 Kategori</span>
              </div>
              <div class="text-white font-bold text-sm">
                27 Berita Lengkap & 27 Teori Ekonomi
              </div>
              <div class="text-[10.5px] text-slate-200">
                2 Paragraf per Berita + Link Resmi
              </div>
            </div>
          </div>
        </div>

        <!-- 2. FILTER BAR (9 KATEGORI + PENCARIAN) -->
        <div class="gov-card p-4 bg-white border border-[#E8DCCF] rounded-xl shadow-2xs space-y-3">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold uppercase text-[#2C2420]">Filter Kategori Berita:</span>
              <span class="px-2 py-0.5 rounded bg-[#EBF1FC] text-[#0038A8] font-mono text-[10.5px] font-bold">
                Menampilkan ${filteredCategories.length} Kategori (${totalNewsCount} Berita)
              </span>
            </div>

            <!-- Search Box -->
            <div class="relative w-full md:w-80">
              <input
                type="text"
                id="news-theory-search-input"
                value="${this.searchKeyword}"
                placeholder="Cari berita, teori ekonomi, atau sumber..."
                class="w-full pl-8 pr-7 py-1.5 text-xs font-sans bg-[#FAF7F2] border border-[#D8C8B8] rounded-lg focus:outline-none focus:border-[#125B78] focus:bg-white text-[#2C2420]"
              />
              <span class="absolute left-2.5 top-2 text-xs text-slate-400">🔍</span>
              ${this.searchKeyword ? `
                <button id="news-theory-clear-search" class="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕</button>
              ` : ''}
            </div>
          </div>

          <!-- Category Pills -->
          <div class="flex items-center gap-1.5 flex-wrap pt-1">
            <button
              type="button"
              data-cat="all"
              class="news-cat-pill px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                this.activeCategory === 'all'
                  ? 'bg-[#125B78] text-white font-bold shadow-2xs'
                  : 'bg-[#FAF7F2] text-[#5D4037] hover:bg-[#EFE6DC] border border-[#E5DACF] font-medium'
              }"
            >
              Semua Kategori (9)
            </button>
            ${allCategories.map(cat => `
              <button
                type="button"
                data-cat="${cat.category_id}"
                class="news-cat-pill px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${
                  this.activeCategory === cat.category_id
                    ? 'bg-[#125B78] text-white font-bold shadow-2xs'
                    : 'bg-[#FAF7F2] text-[#5D4037] hover:bg-[#EFE6DC] border border-[#E5DACF] font-medium'
                }"
              >
                <span>${cat.icon}</span>
                <span>${cat.category_number}. ${cat.category_title.replace('Top 3 Berita ', '')}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 3. CATEGORIES & TWO-COLUMN TABLE SECTIONS (BERITA | PENJELASAN) -->
        ${filteredCategories.length === 0 ? `
          <div class="gov-card p-8 text-center bg-white border border-slate-200 rounded-xl space-y-2">
            <div class="text-2xl">🔎</div>
            <div class="text-sm font-bold text-slate-800 font-mono">Tidak ada berita atau teori ekonomi yang cocok dengan kata kunci "${this.searchKeyword}"</div>
            <button id="news-theory-reset-btn" class="px-3 py-1.5 rounded bg-[#125B78] text-white text-xs font-mono font-bold cursor-pointer">
              Reset Filter & Pencarian
            </button>
          </div>
        ` : filteredCategories.map(cat => this.renderCategorySection(cat)).join('')}

      </div>
    `;

    this.bindEvents();
  }

  renderCategorySection(cat) {
    return `
      <div class="gov-card bg-white border border-[#D5DCE6] rounded-xl shadow-xs overflow-hidden space-y-0">
        
        <!-- Category Title Bar -->
        <div class="px-4 py-3 bg-[#F8FAFC] border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#125B78] text-white font-mono text-xs font-bold">
              ${cat.category_number}
            </span>
            <span class="text-base">${cat.icon}</span>
            <h2 class="text-sm sm:text-base font-serif font-bold text-[#1E293B] tracking-tight">
              ${cat.category_title}
            </h2>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold bg-[#E6F0F5] text-[#125B78] border border-[#B8D4E3]">
            ${cat.category_badge} • Top ${cat.items.length} Berita
          </span>
        </div>

        <!-- Table Structure Matching User Attached Image: Header [Berita | Penjelasan] + Alternating Rows -->
        <div class="w-full overflow-x-auto">
          <div class="min-w-[680px]">
            
            <!-- HEADER ROW: Deep Teal (#125B78) with White Text & Vertical Divider -->
            <div class="grid grid-cols-12 bg-[#125B78] text-white font-sans font-bold text-sm sm:text-base">
              <div class="col-span-7 lg:col-span-8 px-4 py-3 border-r-2 border-white flex items-center justify-between">
                <span>Berita</span>
                <span class="text-[11px] font-mono font-normal text-sky-100">Headline, Isi Berita (2 Paragraf) & Link Resmi</span>
              </div>
              <div class="col-span-5 lg:col-span-4 px-4 py-3 flex items-center justify-between">
                <span>Penjelasan</span>
                <span class="text-[11px] font-mono font-normal text-sky-100">Teori Ekonomi Terkait</span>
              </div>
            </div>

            <!-- BODY ROWS: Alternating Slate-Grey (#CFD5E2) and Light Grey-Blue (#E9ECF2) with White Borders -->
            ${cat.items.map((item, idx) => {
              const rowBg = idx % 2 === 0 ? 'bg-[#CFD5E2]/85' : 'bg-[#E9ECF2]';
              const paragraphs = (Array.isArray(item.paragraphs) && item.paragraphs.length > 0)
                ? item.paragraphs.slice(0, 2)
                : (item.summary ? item.summary.split('\n\n').slice(0, 2) : []);

              return `
                <div class="grid grid-cols-12 ${rowBg} border-t-2 border-white transition-colors hover:bg-[#C5CEE0]/90">
                  
                  <!-- LEFT COLUMN: BERITA (HEADLINE + 2 PARAGRAF ISI BERITA + LINK RESMI) -->
                  <div class="col-span-7 lg:col-span-8 p-4 sm:p-5 border-r-2 border-white flex flex-col justify-between space-y-3">
                    <div class="space-y-2.5">
                      <!-- Metadata Badges -->
                      <div class="flex flex-wrap items-center gap-2">
                        <span class="px-2 py-0.5 rounded bg-[#125B78] text-white font-mono text-[10px] font-bold">
                          Berita #${item.rank}
                        </span>
                        <span class="px-2 py-0.5 rounded bg-white/90 text-[#1E293B] font-mono text-[10.5px] font-bold border border-slate-300/80">
                          🏛️ ${item.source_name}
                        </span>
                        <span class="text-[10.5px] font-mono text-slate-600 font-medium">
                          📅 ${item.date}
                        </span>
                      </div>

                      <!-- Headline -->
                      <h3 class="text-sm sm:text-[15.5px] font-bold text-[#0F172A] font-serif leading-snug">
                        ${item.title}
                      </h3>

                      <!-- Isi Berita Lengkap (Maksimal 2 Paragraf) -->
                      <div class="bg-white/80 p-3 sm:p-3.5 rounded-lg border border-white space-y-2.5 shadow-2xs">
                        ${paragraphs.map(para => `
                          <p class="text-xs sm:text-[13px] text-slate-800 font-sans leading-relaxed text-justify">
                            ${para}
                          </p>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Official Link Box (Link Resmi) -->
                    <div class="pt-2 border-t border-slate-400/30 flex flex-wrap items-center justify-between gap-2">
                      <div class="flex items-center gap-2 flex-wrap">
                        <a
                          href="${item.official_url}"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#125B78] hover:bg-[#0B3F54] text-white font-mono text-[11px] font-bold shadow-2xs transition-all cursor-pointer"
                          title="Buka portal sumber resmi di tab baru"
                        >
                          <span>🔗</span>
                          <span>Link Resmi Sumber</span>
                          <span>↗</span>
                        </a>
                        <a
                          href="${item.official_url}"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-[11px] font-mono text-[#0038A8] hover:underline font-semibold break-all"
                        >
                          ${item.official_url}
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- RIGHT COLUMN: PENJELASAN TEORI EKONOMI TERKAIT -->
                  <div class="col-span-5 lg:col-span-4 p-4 sm:p-5 flex flex-col justify-between space-y-2.5">
                    <div class="space-y-2">
                      <!-- Theory Badge & Name -->
                      <div class="space-y-1">
                        <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100/90 text-amber-950 border border-amber-300 font-mono text-[9.5px] font-bold uppercase tracking-wider">
                          <span>📚</span>
                          <span>Teori Ekonomi Terkait</span>
                        </div>
                        <h4 class="text-xs sm:text-sm font-bold text-[#0F3D56] font-serif leading-snug">
                          ${item.theory_name}
                        </h4>
                        <div class="text-[10.5px] font-mono text-slate-600 italic">
                          Tokoh: ${item.economist}
                        </div>
                      </div>

                      <!-- Theory Explanation -->
                      <div class="text-xs text-slate-800 font-sans leading-relaxed text-justify bg-white/75 p-2.5 rounded-lg border border-white">
                        ${item.theory_explanation}
                      </div>
                    </div>

                    <!-- Policy Implication for Indonesia -->
                    <div class="p-2 rounded-lg bg-[#125B78]/10 border border-[#125B78]/25 text-[11px] font-sans text-[#0F172A] leading-snug">
                      <span class="font-mono font-bold text-[#125B78] uppercase text-[10px] block mb-0.5">
                        💡 Makna & Implikasi Kebijakan:
                      </span>
                      <span>${item.policy_implication}</span>
                    </div>
                  </div>

                </div>
              `;
            }).join('')}

          </div>
        </div>

      </div>
    `;
  }

  bindEvents() {
    // Category pills
    const catBtns = this.container.querySelectorAll('.news-cat-pill');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.getAttribute('data-cat') || 'all';
        this.render();
      });
    });

    // Search input
    const searchInput = document.getElementById('news-theory-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchKeyword = e.target.value;
        const cursorPosition = e.target.selectionStart;
        this.render();
        const newInput = document.getElementById('news-theory-search-input');
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(cursorPosition, cursorPosition);
        }
      });
    }

    // Clear search
    document.getElementById('news-theory-clear-search')?.addEventListener('click', () => {
      this.searchKeyword = '';
      this.render();
    });

    // Reset button
    document.getElementById('news-theory-reset-btn')?.addEventListener('click', () => {
      this.activeCategory = 'all';
      this.searchKeyword = '';
      this.render();
    });
  }
}
