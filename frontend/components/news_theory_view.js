// ==============================================================================
// BERITA TERKINI & TEORI EKONOMI TERKAIT VIEW
// Kompilasi Top 3 Berita pada 9 Kategori Strategis + Judul Berupa Link Resmi + Teori Ekonomi
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

// Palet warna harmonis (Slate-Blue / Cool Coastal) untuk membedakan antar section tematik berita
const SECTION_BG_PALETTE = [
  'bg-[#CFD8E6]', // 1. Ekonomi Internasional
  'bg-[#E4E9F2]', // 2. Politik Internasional
  'bg-[#C6D2E2]', // 3. Ekonomi Nasional
  'bg-[#E8EDF5]', // 4. Politik Nasional
  'bg-[#CDD8E7]', // 5. Teknologi Nasional
  'bg-[#E1E7F0]', // 6. Investasi Nasional
  'bg-[#C5D1E1]', // 7. Industri Rokok + Tembakau
  'bg-[#E6EBF3]', // 8. Sustainable Energi
  'bg-[#CFD9E7]'  // 9. Sosial
];

export class NewsTheoryView {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.data = null;
    this.activeCategory = 'all';
    this.searchKeyword = '';
    this.isSyncing = false;
  }

  async init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;
    if (this.data && this.data.categories) {
      this.render();
      return;
    }
    await this.loadAndRender();
  }

  /**
   * Dipanggil otomatis setiap pertama kali masuk web (initial web load)
   * untuk mengupdate halaman Berita Terkini selama 7 hari kebelakang.
   */
  async syncInitial7Days() {
    this.container = document.getElementById(this.containerId);
    this.isSyncing = true;
    try {
      const response = await ApiClient.syncNewsTheory7Days(7);
      if (response && response.categories) {
        this.data = response;
        window.__latestNewsTheory7Days = response;
      }
    } catch (e) {
      try {
        const fallbackRes = await ApiClient.fetchNewsTheory({ days_back: 7, refresh: true });
        if (fallbackRes && fallbackRes.categories) {
          this.data = fallbackRes;
          window.__latestNewsTheory7Days = fallbackRes;
        }
      } catch (innerErr) {
        console.warn('Fallback to embedded NewsTheory 7-day data:', innerErr);
      }
    } finally {
      this.isSyncing = false;
    }

    if (this.container) {
      this.render();
    }
    return this.data;
  }

  async loadAndRender(forceSync = false) {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    if (forceSync || !this.data) {
      await this.syncInitial7Days();
      return;
    }

    this.render();
  }

  setCategoryFilter(catId) {
    this.activeCategory = catId || 'all';
    this.render();
  }

  setSearchKeyword(kw) {
    this.searchKeyword = kw || '';
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

    const filteredCategories = this.getFilteredCategories();

    this.container.innerHTML = `
      <div class="w-full">
        ${filteredCategories.length === 0 ? `
          <div class="p-8 text-center bg-[#E4E9F2] rounded-xl space-y-2">
            <div class="text-2xl">🔎</div>
            <div class="text-sm font-bold text-slate-800 font-mono">Tidak ada berita atau teori ekonomi yang cocok dengan pencarian "${this.searchKeyword}"</div>
            <button id="news-theory-reset-btn" class="px-3 py-1.5 rounded bg-[#125B78] text-white text-xs font-mono font-bold cursor-pointer">
              Reset Filter & Pencarian
            </button>
          </div>
        ` : `
          <div class="rounded-xl overflow-hidden">
            ${filteredCategories.map((cat, sectionIdx) => this.renderCategorySection(cat, sectionIdx)).join('')}
          </div>
        `}
      </div>
    `;

    this.bindEvents();
  }

  renderCategorySection(cat, sectionIdx) {
    const paletteIndex = ((cat.category_number || (sectionIdx + 1)) - 1) % SECTION_BG_PALETTE.length;
    const sectionBg = SECTION_BG_PALETTE[paletteIndex];

    return `
      <section class="${sectionBg} px-4 sm:px-5 py-4 transition-colors" aria-label="${cat.category_title}">
        
        <!-- Thematic Label (Tanpa Header Row Tabel) -->
        <div class="pb-2.5 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#125B78] text-white font-mono text-[11px] font-bold">
              ${cat.category_number}
            </span>
            <span class="text-sm">${cat.icon}</span>
            <h2 class="text-sm sm:text-base font-serif font-bold text-[#0F2942] tracking-tight">
              ${cat.category_title}
            </h2>
          </div>
          <span class="text-[10.5px] font-mono font-semibold text-[#125B78]">
            ${cat.category_badge}
          </span>
        </div>

        <!-- News & Theory Items (Tanpa Header Row [Berita | Penjelasan]) -->
        <div class="w-full overflow-x-auto">
          <div class="min-w-[680px] space-y-2">
            ${cat.items.map((item) => {
              const paragraphs = (Array.isArray(item.paragraphs) && item.paragraphs.length > 0)
                ? item.paragraphs.slice(0, 2)
                : (item.summary ? item.summary.split('\n\n').slice(0, 2) : []);

              return `
                <div class="grid grid-cols-12 bg-white/45 hover:bg-white/65 rounded-lg transition-colors">
                  
                  <!-- KOLOM KIRI: BERITA (JUDUL SEBAGAI LINK RESMI + 2 PARAGRAF ISI BERITA) -->
                  <div class="col-span-7 lg:col-span-8 p-4 flex flex-col justify-between space-y-2.5">
                    <div class="space-y-2">
                      <!-- Metadata Badges -->
                      <div class="flex flex-wrap items-center gap-2">
                        <span class="px-2 py-0.5 rounded bg-[#125B78] text-white font-mono text-[10px] font-bold">
                          Berita #${item.rank}
                        </span>
                        <span class="px-2 py-0.5 rounded bg-white/80 text-[#1E293B] font-mono text-[10.5px] font-bold">
                          🏛️ ${item.source_name}
                        </span>
                        <span class="px-2 py-0.5 rounded bg-white/80 text-[#0F3D56] text-[10.5px] font-mono font-semibold">
                          📅 ${item.date}
                        </span>
                      </div>

                      <!-- Judul Artikel sebagai Link Resmi Berita (Tanpa Tombol Link Terpisah) -->
                      <h3 class="text-sm sm:text-[15.5px] font-bold font-serif leading-snug">
                        <a
                          href="${item.official_url}"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-[#0F3D56] hover:text-[#0038A8] underline decoration-[#125B78]/50 hover:decoration-[#0038A8] underline-offset-2 transition-colors inline-flex items-start gap-1.5 group cursor-pointer"
                          title="Buka artikel resmi di ${item.source_name}"
                        >
                          <span>${item.title}</span>
                          <span class="text-xs text-[#0038A8] shrink-0 mt-0.5">↗</span>
                        </a>
                      </h3>

                      <!-- Isi Berita Lengkap (Maksimal 2 Paragraf) -->
                      <div class="bg-white/75 p-3 sm:p-3.5 rounded-lg space-y-2">
                        ${paragraphs.map(para => `
                          <p class="text-xs sm:text-[13px] text-slate-800 font-sans leading-relaxed text-justify">
                            ${para}
                          </p>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <!-- KOLOM KANAN: PENJELASAN TEORI EKONOMI TERKAIT -->
                  <div class="col-span-5 lg:col-span-4 p-4 flex flex-col justify-between space-y-2.5 bg-white/25 rounded-r-lg">
                    <div class="space-y-2">
                      <!-- Theory Badge & Name -->
                      <div class="space-y-1">
                        <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#125B78]/15 text-[#0F3D56] font-mono text-[9.5px] font-bold uppercase tracking-wider">
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
                      <div class="text-xs text-slate-800 font-sans leading-relaxed text-justify bg-white/75 p-2.5 rounded-lg">
                        ${item.theory_explanation}
                      </div>
                    </div>

                    <!-- Policy Implication for Indonesia -->
                    <div class="p-2.5 rounded-lg bg-[#125B78]/10 text-[11px] font-sans text-[#0F172A] leading-snug">
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

      </section>
    `;
  }

  bindEvents() {
    // Reset button when search returns 0 items
    document.getElementById('news-theory-reset-btn')?.addEventListener('click', () => {
      this.activeCategory = 'all';
      this.searchKeyword = '';
      if (window.__govApp && window.__govApp.searchBar) {
        window.__govApp.searchBar.setMode('news', 'all');
      }
      this.render();
    });
  }
}

