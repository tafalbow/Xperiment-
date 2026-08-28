// ==============================================================================
// CONTEXTUAL MAP COMPONENT (Connected to Chart Multi-Series & Hover Points)
// Explanatory Regional Drivers ground-truthed from Official Publications
// ==============================================================================

import { ApiClient } from '../services/api_client.js';

export class ContextualMap {
  constructor(containerId, onSelectSeriesCallback = () => {}) {
    this.container = document.getElementById(containerId);
    this.onSelectSeriesCallback = onSelectSeriesCallback;

    this.activeSeriesList = [
      { id: 'series-1', indicatorId: 'IND-GDP-GROWTH-YOY', name: 'Laju Pertumbuhan PDB Riil', color: '#0284C7' }
    ];
    this.activeSeriesIndex = 0;

    this.drivers = [];
    this.selectedDriver = null;
    this.focusedYear = null;

    this.mapInstance = null;
    this.markersLayer = null;
    this.activeCircle = null;

    this.render();
  }

  setSeriesList(seriesConfigs, activeIndex = 0) {
    if (!seriesConfigs || seriesConfigs.length === 0) return;
    this.activeSeriesList = seriesConfigs;
    if (activeIndex !== undefined && activeIndex !== null) {
      this.activeSeriesIndex = Math.min(activeIndex, this.activeSeriesList.length - 1);
    }
    this.fetchDriversForActiveSeries();
  }

  async fetchDriversForActiveSeries() {
    const activeSeries = this.activeSeriesList[this.activeSeriesIndex] || this.activeSeriesList[0];
    if (!activeSeries || !activeSeries.indicatorId) {
      this.drivers = [];
      this.selectedDriver = null;
      this.render();
      return;
    }

    try {
      const drivers = await ApiClient.fetchContextualDrivers(activeSeries.indicatorId);
      this.drivers = drivers || [];
      this.selectedDriver = this.drivers.length > 0 ? this.drivers[0] : null;
      this.render();
    } catch (err) {
      console.error('Error fetching drivers for series:', err);
    }
  }

  setDrivers(driversList) {
    this.drivers = driversList || [];
    this.selectedDriver = this.drivers.length > 0 ? this.drivers[0] : null;
    this.render();
  }

  syncWithHoverPoint(year, seriesIndex = null) {
    if (seriesIndex !== null && seriesIndex !== this.activeSeriesIndex && this.activeSeriesList[seriesIndex]) {
      this.activeSeriesIndex = seriesIndex;
      this.fetchDriversForActiveSeries().then(() => {
        this.applyYearFocus(year);
      });
      return;
    }

    this.applyYearFocus(year);
  }

  applyYearFocus(year) {
    this.focusedYear = year;
    if (!year) {
      this.render(false);
      return;
    }

    // Check if there is a specific driver matching this year
    const matched = this.drivers.find(
      d => d.period === String(year) || (d.period && d.period.startsWith(String(year)))
    );

    if (matched) {
      this.selectedDriver = matched;
      this.render(false);
      this.focusMapOnDriver(matched);
    } else {
      this.render(false);
    }
  }

  render(reinitMap = true) {
    if (!this.container) return;

    const hasDrivers = this.drivers && this.drivers.length > 0;
    const selected = this.selectedDriver || (hasDrivers ? this.drivers[0] : null);
    const activeSeries = this.activeSeriesList[this.activeSeriesIndex] || this.activeSeriesList[0];

    // Build the 3 slots for Var 1, Var 2, Var 3
    const slotPillsHtml = [0, 1, 2].map(i => {
      const series = this.activeSeriesList[i];
      const isActive = this.activeSeriesIndex === i;
      const defaultColors = ['#0284C7', '#10B981', '#F59E0B'];
      const color = series ? (series.color || defaultColors[i]) : defaultColors[i];

      if (series) {
        return `
          <button 
            type="button"
            class="btn-focus-series cursor-pointer px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 border transition-all ${isActive ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-xs ring-2 ring-sky-400' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400'}"
            data-idx="${i}"
            data-action="select"
            title="Pilih Penjelasan Geoekonomi untuk Variabel ${i + 1}: ${series.name || ''}"
          >
            <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${color}"></span>
            <span>Var ${i + 1}: <strong class="truncate max-w-[120px] inline-block align-bottom font-bold">${series.name || 'Indikator'}</strong></span>
          </button>
        `;
      } else {
        return `
          <button 
            type="button"
            class="btn-focus-series cursor-pointer px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 border border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 transition-all"
            data-idx="${i}"
            data-action="add"
            title="Klik untuk menambahkan dan menganalisis Variabel ${i + 1}"
          >
            <span>➕</span>
            <span>Var ${i + 1}</span>
          </button>
        `;
      }
    }).join('');

    this.container.innerHTML = `
      <div class="gov-card p-4 space-y-3 flex flex-col justify-between overflow-hidden shadow-xs">
        <!-- Section Header -->
        <div class="flex items-center justify-between border-b border-slate-200 pb-2.5 flex-wrap gap-2 shrink-0">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">INFORMASI PENDORONG KONTEKSTUAL (GIS CONTEXT)</span>
              <span class="text-[10px] font-mono bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.5 rounded">TERHUBUNG KE GRAFIK</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">
              Penjelasan pendorong geoekonomi resmi yang terhubung dengan variabel dan titik data grafik di sebelah kiri.
            </p>
          </div>
          <span class="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Bukan Basis Data Provinsi
          </span>
        </div>

        <!-- 1. VARIABLE FOCUS SELECTOR (Var 1 / Var 2 / Var 3 Buttons) -->
        <div class="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200 text-xs font-mono flex-wrap gap-2 shrink-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Penjelas untuk:</span>
            <div class="flex items-center gap-1.5 flex-wrap" id="focus-series-container">
              ${slotPillsHtml}
            </div>
          </div>

          <div class="text-[10px] font-mono text-slate-500 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
            <span>📅</span>
            <span>Titik Aktif: <strong class="text-slate-900">${this.focusedYear ? `TA ${this.focusedYear}` : 'Semua Periode'}</strong></span>
          </div>
        </div>

        ${hasDrivers ? `
          <!-- Driver Quick Selector Pills (If multiple regional drivers exist for this variable) -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-thin shrink-0">
            <span class="text-slate-400 text-[10px] uppercase font-semibold shrink-0">Sentra Driver:</span>
            ${this.drivers.map((d, idx) => `
              <button 
                type="button"
                class="btn-select-driver cursor-pointer px-2.5 py-1 rounded-sm text-xs transition-all shrink-0 flex items-center gap-1.5 border ${selected && selected.id === d.id ? 'bg-slate-700 text-white font-bold border-slate-600 shadow-xs ring-1 ring-sky-400' : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'}"
                data-driver-id="${d.id}"
                data-idx="${idx}"
              >
                <span>📍</span>
                <span>${d.geo_target_name ? d.geo_target_name.split(',')[0] : d.province_name}</span>
                <span class="text-[9px] px-1 py-0.2 rounded font-semibold ${selected && selected.id === d.id ? 'bg-sky-400 text-slate-900' : 'bg-slate-100 text-slate-600'}">
                  TA ${d.period}
                </span>
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- 2. FULL-WIDTH TOP GIS MAP (Widescreen Archipelago View) -->
        <div class="bg-slate-50 border border-slate-200 rounded p-2 relative flex flex-col h-[270px] min-h-[270px] max-h-[270px] w-full shrink-0">
          <!-- Leaflet Container -->
          <div id="gis-leaflet-container" class="w-full h-[225px] rounded bg-slate-100 overflow-hidden relative z-0"></div>

          <!-- Map Controls Overlay -->
          <div class="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 px-1">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs text-[10px]">
                <span class="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
                <span id="gis-active-level">${selected ? (selected.geo_level || 'Level Provinsi') : 'Nasional'}</span>
              </span>
              <span class="text-slate-400 hidden sm:inline" id="gis-coords-badge">
                ${selected && selected.latitude ? `${selected.latitude.toFixed(2)}°, ${selected.longitude.toFixed(2)}°` : 'Indonesia'}
              </span>
            </div>
            <button id="btn-reset-map-zoom" class="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded shadow-2xs font-semibold flex items-center gap-1 text-[10px]" title="Kembalikan Tampilan Penuh ke Seluruh Kepulauan Indonesia">
              <span>🇮🇩</span> Zoom Nusantara Penuh
            </button>
          </div>
        </div>

        <!-- 3. BOTTOM CONTEXTUAL NARRATIVE & CITATION PANEL (Fixed Height Scrollable Overflow) -->
        <div class="bg-white border border-slate-200 rounded p-3 flex flex-col justify-between h-[150px] min-h-[150px] max-h-[150px] overflow-y-auto space-y-2 shrink-0">
          ${selected ? `
            <div class="space-y-2">
              <!-- Location Header & Period -->
              <div class="flex items-center justify-between border-b border-slate-100 pb-1">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-[10px] font-mono font-bold bg-sky-100 text-sky-900 px-1.5 py-0.5 rounded">
                    ${selected.province_name.toUpperCase()}
                  </span>
                  <span class="text-[10px] font-mono bg-slate-100 text-slate-700 px-1 py-0.5 rounded font-semibold">
                    ${selected.geo_level || 'Provinsi'}
                  </span>
                  <span class="text-slate-400 font-mono text-[10px] hidden sm:inline">•</span>
                  <span class="text-slate-600 font-mono text-[11px] truncate max-w-[200px]" title="${selected.geo_target_name || selected.province_name}">
                    ${selected.geo_target_name || selected.province_name}
                  </span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-xs font-mono font-bold text-slate-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                    TA ${selected.period}
                  </span>
                </div>
              </div>

              <!-- Driver Role -->
              <div class="font-bold text-slate-900 text-xs leading-snug">
                ${selected.driver_role}
              </div>

              <!-- Official Document Grounded Narrative Quote -->
              <blockquote class="text-[11px] text-slate-800 bg-slate-50 border-l-3 border-sky-500 p-2 rounded-r font-sans italic leading-relaxed">
                "${selected.explanation}"
              </blockquote>

              <!-- Provenance & Official Citation -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-slate-500 font-mono pt-1.5 border-t border-slate-100">
                <div class="truncate" title="${selected.publication_title}">
                  <strong>Publikasi:</strong> ${selected.publication_title}
                </div>
                <div class="sm:text-right">
                  <strong>Sumber:</strong> ${selected.source_name || 'Lembaga Pemerintah'} (${selected.page_reference || 'Ref Resmi'})
                </div>
              </div>
            </div>

            <!-- Footer Governance Notice -->
            <div class="p-1.5 bg-slate-50 rounded border border-slate-200 text-[9px] text-slate-500 leading-tight">
              * Terhubung langsung dengan titik pergerakan ${activeSeries ? activeSeries.name : 'indikator nasional'}.
            </div>
          ` : `
            <div class="h-full flex flex-col items-center justify-center text-center p-4 space-y-2.5 my-auto max-w-[380px] mx-auto">
              <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shadow-2xs">
                🏛️
              </div>
              <div class="space-y-1">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-mono text-[11px] font-semibold">
                  <span class="w-2 h-2 rounded-full" style="background-color: ${activeSeries ? (activeSeries.color || '#0284C7') : '#0284C7'}"></span>
                  <span>Variabel: <strong class="text-slate-900">${activeSeries ? activeSeries.name : 'Indikator Terpilih'}</strong></span>
                </div>
                <div class="font-bold text-xs text-slate-800 pt-1">
                  Agregasi Kinerja Makroekonomi Tingkat Nasional
                </div>
              </div>
              <p class="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200 text-left">
                ${this.focusedYear 
                  ? `Pada variabel <strong>${activeSeries ? activeSeries.name : 'indikator aktif'}</strong> untuk <strong>Tahun Anggaran ${this.focusedYear}</strong>, data disajikan sebagai angka agregat nasional dan tidak terdapat catatan sentra pendorong geoekonomi spesifik dalam publikasi resmi pemerintah.`
                  : `Pada variabel <strong>${activeSeries ? activeSeries.name : 'indikator aktif'}</strong>, seluruh seri data historis merupakan angka terkonsolidasi tingkat nasional tanpa sentra wilayah khusus. Arahkan kursor ke titik tahun tertentu pada grafik di sebelah kiri untuk memeriksa catatan geoekonomi yang tersedia.`}
              </p>
              <div class="text-[9.5px] font-mono text-slate-400">
                * Sumber Data: LKPP Audited BPK RI / BPS / Bank Indonesia
              </div>
            </div>
          `}
        </div>
      </div>
    `;

    // Attach DOM events immediately
    this.attachEvents();

    // Initialize or Update Leaflet Map
    if (reinitMap) {
      setTimeout(() => {
        this.initLeafletMap(selected);
      }, 50);
    }
  }

  initLeafletMap(activeDriver) {
    const mapContainer = document.getElementById('gis-leaflet-container');
    if (!mapContainer) return;

    if (typeof L === 'undefined') {
      console.warn('Leaflet library is loading...');
      return;
    }

    // Clean up previous map instance if re-rendering
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    const defaultCenter = [-2.2, 118.0];
    const defaultZoom = 4;

    this.mapInstance = L.map('gis-leaflet-container', {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 3.5,
      maxZoom: 14,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.mapInstance);

    this.markersLayer = L.layerGroup().addTo(this.mapInstance);

    // Render Markers for all available drivers
    if (this.drivers && this.drivers.length > 0) {
      this.drivers.forEach(d => {
        if (!d.latitude || !d.longitude) return;

        const isSelected = activeDriver && activeDriver.id === d.id;

        const iconHtml = `
          <div class="relative flex items-center justify-center">
            <div class="w-6 h-6 rounded-full ${isSelected ? 'bg-sky-600 ring-4 ring-sky-300 shadow-md' : 'bg-slate-700 ring-2 ring-white shadow'} flex items-center justify-center text-white text-[10px] font-bold">
              ${d.geo_level === 'Kabupaten/Kota' ? '🏢' : '📍'}
            </div>
            ${isSelected ? '<div class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></div>' : ''}
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-gov-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([d.latitude, d.longitude], { icon: customIcon }).addTo(this.markersLayer);

        const popupContent = `
          <div class="p-2 font-sans text-xs space-y-1 bg-white text-slate-900 rounded">
            <div class="font-bold text-slate-900 font-mono text-[11px]">${d.geo_target_name || d.province_name}</div>
            <div class="text-[10px] text-sky-800 font-bold leading-tight">${d.driver_role}</div>
            <div class="text-[9px] text-slate-600 font-mono pt-0.5 border-t border-slate-100">
              Level: <strong class="text-slate-800">${d.geo_level || 'Provinsi'}</strong> (TA ${d.period})
            </div>
          </div>
        `;
        marker.bindPopup(popupContent);

        marker.on('click', () => {
          this.selectedDriver = d;
          this.render();
        });
      });

      if (activeDriver && activeDriver.latitude && activeDriver.longitude) {
        this.focusMapOnDriver(activeDriver);
      } else {
        this.mapInstance.fitBounds([[-10.5, 95.0], [5.8, 141.0]]);
      }
    } else {
      this.mapInstance.fitBounds([[-10.5, 95.0], [5.8, 141.0]]);
    }
  }

  focusMapOnDriver(driver) {
    if (!this.mapInstance || !driver || !driver.latitude || !driver.longitude) return;

    const targetZoom = driver.zoom_level || (driver.geo_level === 'Kabupaten/Kota' ? 9.5 : 6.5);
    this.mapInstance.flyTo([driver.latitude, driver.longitude], targetZoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });

    if (this.activeCircle) {
      this.mapInstance.removeLayer(this.activeCircle);
    }

    const radiusMeters = driver.geo_level === 'Kabupaten/Kota' ? 18000 : 75000;
    this.activeCircle = L.circle([driver.latitude, driver.longitude], {
      radius: radiusMeters,
      color: '#0284C7',
      fillColor: '#38BDF8',
      fillOpacity: 0.15,
      weight: 2,
      dashArray: '4, 4'
    }).addTo(this.mapInstance);
  }

  attachEvents() {
    // Variable focus buttons (Var 1 / Var 2 / Var 3)
    const focusBtns = this.container.querySelectorAll('.btn-focus-series');
    focusBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-idx'));
        
        this.activeSeriesIndex = idx;
        
        if (this.onSelectSeriesCallback) {
          await this.onSelectSeriesCallback(idx);
        }
        
        await this.fetchDriversForActiveSeries();
      });
    });

    // Driver selector buttons
    const driverBtns = this.container.querySelectorAll('.btn-select-driver');
    driverBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const driverId = parseInt(btn.getAttribute('data-driver-id'));
        const found = this.drivers.find(d => d.id === driverId);
        if (found) {
          this.selectedDriver = found;
          this.render();
        }
      });
    });

    // Reset map zoom button to Full Archipelago View
    const btnReset = document.getElementById('btn-reset-map-zoom');
    btnReset?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.mapInstance) {
        this.mapInstance.fitBounds([[-10.5, 95.0], [5.8, 141.0]], {
          padding: [10, 10],
          duration: 1.0
        });
        const levelBadge = document.getElementById('gis-active-level');
        const coordsBadge = document.getElementById('gis-coords-badge');
        if (levelBadge) levelBadge.textContent = 'Seluruh Kepulauan Indonesia';
        if (coordsBadge) coordsBadge.textContent = 'Sabang — Merauke';
      }
    });
  }
}
