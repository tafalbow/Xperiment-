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
      { id: 'series-1', indicatorId: 'IND-GDP-GROWTH-YOY', name: 'Laju Pertumbuhan PDB Riil', color: '#1A73E8' }
    ];
    this.activeSeriesIndex = 0;

    this.drivers = [];
    this.selectedDriver = null;
    this.focusedYear = null;

    this.mapInstance = null;
    this.markersLayer = null;
    this.activeCircle = null;
    this.markersMap = new Map();

    this.render(true);
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
      this.render(true);
      return;
    }

    try {
      const drivers = await ApiClient.fetchContextualDrivers(activeSeries.indicatorId);
      this.drivers = drivers || [];
      this.selectedDriver = this.drivers.length > 0 ? this.drivers[0] : null;
      this.render(true);
    } catch (err) {
      console.error('Error fetching drivers for series:', err);
    }
  }

  setDrivers(driversList) {
    this.drivers = driversList || [];
    this.selectedDriver = this.drivers.length > 0 ? this.drivers[0] : null;
    this.render(true);
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
    const yearBadge = document.getElementById('gis-active-period-badge');
    if (yearBadge) {
      yearBadge.textContent = year ? `TA ${year}` : 'Semua Periode';
    }

    if (!year) return;

    // Check if there is a specific driver matching this year
    const matched = this.drivers.find(
      d => d.period === String(year) || (d.period && d.period.startsWith(String(year)))
    );

    if (matched) {
      this.selectDriver(matched);
    }
  }

  selectDriver(driver) {
    if (!driver) return;
    this.selectedDriver = driver;

    // 1. Update the numbered list UI without re-creating the map DOM
    this.updateDriverListUI();

    // 2. Focus and fly map to driver coordinates instantly
    this.focusMapOnDriver(driver);
  }

  renderDriverNumberedListHtml(selected) {
    if (!this.drivers || this.drivers.length === 0) return '';
    return this.drivers.map((d, idx) => {
      const isSelected = selected && selected.id === d.id;
      return `
        <div 
          class="btn-select-driver cursor-pointer p-3 rounded-md border transition-all ${isSelected ? 'bg-[#E8F0FE] border-[#1A73E8] ring-2 ring-[#D2E3FC] shadow-xs' : 'bg-slate-50 border-[#DADCE0] hover:bg-white hover:border-slate-300'}"
          data-driver-id="${d.id}"
          data-idx="${idx}"
          role="button"
          tabindex="0"
          title="Klik untuk memindahkan fokus peta ke ${d.geo_target_name || d.province_name}"
        >
          <div class="flex items-start justify-between gap-2.5">
            <div class="flex items-start gap-2.5">
              <span class="w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${isSelected ? 'bg-[#1A73E8] text-white shadow-2xs' : 'bg-slate-200 text-slate-700'}">
                ${idx + 1}
              </span>
              <div class="space-y-1">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="font-bold text-xs ${isSelected ? 'text-[#1A73E8] font-mono underline decoration-[#1A73E8] decoration-2 underline-offset-2' : 'text-slate-900 font-mono hover:text-sky-700'}">
                    ${d.geo_target_name || d.province_name}
                  </span>
                  <span class="text-[9.5px] font-mono px-1.5 py-0.2 rounded font-semibold ${isSelected ? 'bg-[#D2E3FC] text-[#174EA6]' : 'bg-slate-200 text-slate-700'}">
                    ${d.province_name.toUpperCase()} (${d.geo_level || 'Provinsi'})
                  </span>
                </div>
                <div class="text-[11px] leading-snug ${isSelected ? 'text-[#202124] font-bold' : 'text-slate-700 font-semibold'}">
                  ${d.driver_role}
                </div>
              </div>
            </div>
            <div class="shrink-0 text-right">
              <span class="text-[10.5px] font-mono font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-[#1A73E8] text-white shadow-2xs' : 'bg-white text-slate-800 border border-slate-300'}">
                TA ${d.period}
              </span>
            </div>
          </div>

          ${isSelected ? `
            <!-- Detailed Narrative & Provenance (Expanded for Selected Driver) -->
            <div class="mt-2.5 pt-2 border-t border-[#D2E3FC] space-y-2">
              <blockquote class="text-[11px] text-slate-800 bg-white p-2 rounded border-l-3 border-[#1A73E8] font-sans italic leading-relaxed shadow-2xs">
                "${d.explanation}"
              </blockquote>
              <div class="space-y-0.5 text-[9.5px] text-slate-500 font-mono pt-0.5">
                <div class="truncate" title="${d.publication_title}">
                  <strong>Publikasi:</strong> ${d.publication_title}
                </div>
                <div>
                  <strong>Sumber:</strong> ${d.source_name || 'Lembaga Pemerintah'} (${d.page_reference || 'Ref Resmi'})
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  updateDriverListUI() {
    const listContainer = document.getElementById('driver-numbered-list');
    if (listContainer) {
      listContainer.innerHTML = this.renderDriverNumberedListHtml(this.selectedDriver);
      this.attachDriverClickEvents();
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
      const defaultColors = ['#1A73E8', '#E37400', '#1E8E3E'];
      const color = series ? (series.color || defaultColors[i]) : defaultColors[i];

      if (series) {
        return `
          <button 
            type="button"
            class="btn-focus-series cursor-pointer px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 border transition-all ${isActive ? 'bg-[#1A73E8] text-white font-bold border-[#1A73E8] shadow-xs ring-2 ring-[#D2E3FC]' : 'bg-white text-[#3C4043] border-[#DADCE0] hover:bg-[#F8F9FA] hover:border-[#BDC1C6]'}"
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
            class="btn-focus-series cursor-pointer px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 border border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-700 hover:border-[#1A73E8] transition-all"
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
        <div class="flex items-center justify-between border-b border-[#DADCE0] pb-2.5 flex-wrap gap-2 shrink-0">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">INFORMASI PENDORONG KONTEKSTUAL (GIS CONTEXT)</span>
              <span class="text-[10px] font-mono bg-[#E8F0FE] text-[#1A73E8] border border-[#D2E3FC] px-1.5 py-0.5 rounded">TERHUBUNG KE GRAFIK</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">
              Penjelasan pendorong geoekonomi resmi yang terhubung dengan variabel dan titik data grafik di sebelah kiri.
            </p>
          </div>
          <span class="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-[#DADCE0]">
            Bukan Basis Data Provinsi
          </span>
        </div>

        <!-- 1. VARIABLE FOCUS SELECTOR (Var 1 / Var 2 / Var 3 Buttons) -->
        <div class="flex items-center justify-between bg-slate-50 p-2 rounded border border-[#DADCE0] text-xs font-mono flex-wrap gap-2 shrink-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Penjelas untuk:</span>
            <div class="flex items-center gap-1.5 flex-wrap" id="focus-series-container">
              ${slotPillsHtml}
            </div>
          </div>

          <div class="text-[10px] font-mono text-slate-500 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-[#DADCE0]">
            <span>📅</span>
            <span>Titik Aktif: <strong id="gis-active-period-badge" class="text-slate-900">${this.focusedYear ? `TA ${this.focusedYear}` : 'Semua Periode'}</strong></span>
          </div>
        </div>

        <!-- 2. MAIN CONTENT AREA: SIDE-BY-SIDE (Left List vs Right Map) OR EMPTY STATE -->
        ${hasDrivers ? `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
            
            <!-- KOLOM KIRI: DAFTAR SENTRA PENDORONG (Numbered List) -->
            <div class="lg:col-span-5 flex flex-col bg-white border border-[#DADCE0] rounded p-3.5 space-y-3 h-full">
              <div class="flex items-center justify-between border-b border-[#DADCE0] pb-2 flex-wrap gap-1 shrink-0">
                <div class="font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span>📍</span>
                  <span>DAFTAR SENTRA PENDORONG (${this.drivers.length} Lokasi):</span>
                </div>
                <span class="text-[10px] font-mono text-slate-500">Klik item untuk fokus peta</span>
              </div>

              <!-- Numbered List Items -->
              <div class="space-y-2 flex-1 overflow-y-auto max-h-[460px] pr-0.5 scrollbar-thin" id="driver-numbered-list">
                ${this.renderDriverNumberedListHtml(selected)}
              </div>

              <div class="p-1.5 bg-slate-50 rounded border border-[#DADCE0] text-[9.5px] text-slate-500 font-mono text-center shrink-0">
                * Terhubung langsung dengan titik pergerakan ${activeSeries ? activeSeries.name : 'indikator nasional'}.
              </div>
            </div>

            <!-- KOLOM KANAN: MAP AREA (Posisi teratas sama setara dengan sentra pendorong) -->
            <div class="lg:col-span-7 flex flex-col bg-slate-50 border border-[#DADCE0] rounded p-2.5 space-y-2 h-full min-h-[440px]">
              <!-- Leaflet Container -->
              <div id="gis-leaflet-container" class="w-full flex-1 min-h-[380px] rounded bg-slate-100 overflow-hidden relative z-0 border border-[#DADCE0]"></div>

              <!-- Map Controls Overlay -->
              <div class="flex items-center justify-between text-[10px] font-mono text-slate-600 pt-1 px-1 shrink-0 flex-wrap gap-2">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 bg-white border border-[#DADCE0] px-2 py-0.5 rounded shadow-2xs text-[10px]">
                    <span class="w-2 h-2 rounded-full bg-[#1A73E8] animate-pulse"></span>
                    <span id="gis-active-level">${selected ? (selected.geo_level || 'Level Provinsi') : 'Nasional'}</span>
                  </span>
                  <span class="text-slate-500 text-[10px] font-mono" id="gis-coords-badge">
                    ${selected && selected.latitude ? `${selected.latitude.toFixed(2)}°, ${selected.longitude.toFixed(2)}°` : 'Indonesia'}
                  </span>
                </div>
                <button id="btn-reset-map-zoom" class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded shadow-2xs font-semibold flex items-center gap-1 text-[10px] cursor-pointer" title="Kembalikan Tampilan Penuh ke Seluruh Kepulauan Indonesia">
                  <span>🇮🇩</span> Zoom Nusantara Penuh
                </button>
              </div>
            </div>

          </div>
        ` : `
          <!-- Empty State when no regional drivers exist -->
          <div class="w-full flex flex-col items-center justify-center text-center p-8 space-y-2.5 bg-white/70 border border-dashed border-slate-300 rounded min-h-[220px]">
            <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xl text-slate-500 shadow-2xs">
              🗺️
            </div>
            <div class="space-y-1 max-w-sm">
              <div class="font-bold text-xs text-slate-800 font-mono">
                Tidak Ada Data atau Driver yang Signifikan secara Indeks Wilayah
              </div>
              <p class="text-[11px] text-slate-500 font-sans leading-relaxed">
                Variabel <strong>${activeSeries ? activeSeries.name : 'ini'}</strong> merupakan indikator makroekonomi/fiskal nasional tanpa konsentrasi pendorong spasial atau anomali regional khusus pada publikasi resmi pemerintah.
              </p>
            </div>
            <span class="inline-flex items-center gap-1 text-[9.5px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-[#DADCE0]">
              <span>🏛️</span> Cakupan: Konsolidasi Nasional (Seluruh Indonesia)
            </span>
          </div>
        `}
      </div>
    `;

    // Attach DOM events immediately
    this.attachEvents();

    // Initialize Leaflet Map
    if (reinitMap && hasDrivers) {
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
      try {
        this.mapInstance.remove();
      } catch (e) {}
      this.mapInstance = null;
    }

    this.markersMap.clear();

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
            <div class="w-6 h-6 rounded-full ${isSelected ? 'bg-[#1A73E8] ring-4 ring-[#D2E3FC] shadow-md' : 'bg-[#5F6368] ring-2 ring-white shadow'} flex items-center justify-center text-white text-[10px] font-bold">
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
        this.markersMap.set(d.id, marker);

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
          this.selectDriver(d);
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

    setTimeout(() => {
      if (this.mapInstance) {
        this.mapInstance.invalidateSize();
      }
    }, 150);
  }

  updateMarkersHighlight(activeDriver) {
    if (!this.markersMap || this.markersMap.size === 0) return;
    this.markersMap.forEach((marker, dId) => {
      const d = this.drivers.find(x => x.id === dId);
      if (!d) return;
      const isSelected = activeDriver && activeDriver.id === d.id;
      const iconHtml = `
        <div class="relative flex items-center justify-center">
          <div class="w-6 h-6 rounded-full ${isSelected ? 'bg-[#1A73E8] ring-4 ring-[#D2E3FC] shadow-md' : 'bg-[#5F6368] ring-2 ring-white shadow'} flex items-center justify-center text-white text-[10px] font-bold">
            ${d.geo_level === 'Kabupaten/Kota' ? '🏢' : '📍'}
          </div>
          ${isSelected ? '<div class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></div>' : ''}
        </div>
      `;
      marker.setIcon(L.divIcon({
        html: iconHtml,
        className: 'custom-gov-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      }));
      if (isSelected) {
        marker.openPopup();
      }
    });
  }

  focusMapOnDriver(driver) {
    if (!this.mapInstance || !driver || !driver.latitude || !driver.longitude) return;

    const targetZoom = driver.zoom_level || (driver.geo_level === 'Kabupaten/Kota' ? 9.5 : 6.5);
    
    // Smooth and instant pan/zoom to target coordinates
    this.mapInstance.flyTo([driver.latitude, driver.longitude], targetZoom, {
      duration: 0.85,
      easeLinearity: 0.3
    });

    if (this.activeCircle) {
      try {
        this.mapInstance.removeLayer(this.activeCircle);
      } catch (e) {}
    }

    const radiusMeters = driver.geo_level === 'Kabupaten/Kota' ? 18000 : 75000;
    this.activeCircle = L.circle([driver.latitude, driver.longitude], {
      radius: radiusMeters,
      color: '#1A73E8',
      fillColor: '#1A73E8',
      fillOpacity: 0.18,
      weight: 2,
      dashArray: '4, 4'
    }).addTo(this.mapInstance);

    const levelBadge = document.getElementById('gis-active-level');
    const coordsBadge = document.getElementById('gis-coords-badge');
    if (levelBadge) levelBadge.textContent = driver.geo_level || 'Level Provinsi';
    if (coordsBadge) coordsBadge.textContent = `${driver.latitude.toFixed(2)}°, ${driver.longitude.toFixed(2)}°`;

    this.updateMarkersHighlight(driver);
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

    // Driver list click events
    this.attachDriverClickEvents();

    // Reset map zoom button to Full Archipelago View
    const btnReset = document.getElementById('btn-reset-map-zoom');
    btnReset?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.mapInstance) {
        this.mapInstance.fitBounds([[-10.5, 95.0], [5.8, 141.0]], {
          padding: [10, 10],
          duration: 0.8
        });
        const levelBadge = document.getElementById('gis-active-level');
        const coordsBadge = document.getElementById('gis-coords-badge');
        if (levelBadge) levelBadge.textContent = 'Seluruh Kepulauan Indonesia';
        if (coordsBadge) coordsBadge.textContent = 'Sabang — Merauke';
      }
    });
  }

  attachDriverClickEvents() {
    const driverBtns = this.container.querySelectorAll('.btn-select-driver');
    driverBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const driverId = parseInt(btn.getAttribute('data-driver-id'), 10);
        const found = this.drivers.find(d => d.id === driverId);
        if (found) {
          this.selectDriver(found);
        }
      });
    });
  }
}
