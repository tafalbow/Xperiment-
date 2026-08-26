/**
 * ============================================================
 * COCOK TANAM CUAN - SIMULATION & CALCULATION ENGINE
 * Mesin Peta GIS 38 Provinsi Indonesia (Leaflet.js), Analisis
 * Rekomendasi Tanam Multi-Tahun (Year to Year+5: 2026 - 2031),
 * Kalkulator Waktu Tanam ➔ Panen, Estimasi Cuan, & Inflasi DEN.
 * ============================================================
 */

class CocokTanamEngine {
    constructor() {
        // State
        this.selectedProvinceId = 'JATENG';
        this.selectedRegionId = 'JAWA_BALI';
        this.selectedCommodityId = 'PADI_BERAS';
        this.selectedSoilId = 'ALUVIAL';
        
        // Multi-Year Analysis State (Tahun Berjalan 2026 s/d Year+5 / 2031)
        this.selectedAnalysisMonth = 8; // Agustus
        this.selectedAnalysisYear = 2026; // 2026
        this.selectedPlantMonth = 8;
        this.selectedPlantYear = 2026;
        this.landAreaHa = 1.0;

        // Leaflet GIS Map & Markers Map
        this.gisMap = null;
        this.provinceMarkers = {};

        // Month Names in Indonesian
        this.monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        // Active Alert Status
        this.currentAlertIndex = 2; // Normal

        // Initialize UI Elements
        this.initUI();
        this.initEventListeners();
        this.initLeafletGisMap();
        this.selectProvince(this.selectedProvinceId, false);
        this.runPlantingCalculation();
        this.renderNationalCropSchedule();
        this.renderSoilRemediation();
    }

    initUI() {
        // Populate Commodity Select Options
        const cropSelect = document.getElementById('selectCommodity');
        if (cropSelect) {
            cropSelect.innerHTML = '';
            Object.values(AGRI_COMMODITIES).forEach(crop => {
                const opt = document.createElement('option');
                opt.value = crop.id;
                opt.textContent = `${crop.icon} ${crop.name} (${crop.growthDurationMonths} Bulan)`;
                cropSelect.appendChild(opt);
            });
            cropSelect.value = this.selectedCommodityId;
        }

        // Populate Region Select Options (38 Provinsi Grouped)
        const regionSelect = document.getElementById('selectRegion');
        if (regionSelect) {
            regionSelect.innerHTML = '';
            Object.values(PROVINCES_INDONESIA).forEach(prov => {
                const opt = document.createElement('option');
                opt.value = prov.id;
                opt.textContent = `📍 ${prov.name} (${prov.island})`;
                regionSelect.appendChild(opt);
            });
            regionSelect.value = this.selectedProvinceId;
        }

        // Populate Soil Select Options
        const soilSelect = document.getElementById('selectSoilType');
        if (soilSelect) {
            soilSelect.innerHTML = '';
            Object.values(AGRI_SOIL_SOLUTIONS).forEach(soil => {
                const opt = document.createElement('option');
                opt.value = soil.id;
                opt.textContent = `🌱 ${soil.name}`;
                soilSelect.appendChild(opt);
            });
            soilSelect.value = this.selectedSoilId;
        }

        // Populate Month Select Options in Calculator
        const monthSelect = document.getElementById('selectPlantMonth');
        if (monthSelect) {
            monthSelect.innerHTML = '';
            this.monthNames.forEach((name, idx) => {
                const opt = document.createElement('option');
                opt.value = idx + 1;
                opt.textContent = `Bulan ${idx + 1} - ${name}`;
                monthSelect.appendChild(opt);
            });
            monthSelect.value = this.selectedPlantMonth;
        }

        // Populate Plant Year in Calculator
        const yearSelect = document.getElementById('selectPlantYear');
        if (yearSelect) {
            yearSelect.value = this.selectedPlantYear;
        }
    }

    // --- 1. INITIALIZE HIGH-PRECISION LEAFLET GIS MAP (38 PROVINSI) ---
    initLeafletGisMap() {
        const mapEl = document.getElementById('indonesiaGisMap');
        if (!mapEl || typeof L === 'undefined') return;

        try {
            // Inisialisasi Peta Leaflet Berpusat di Indonesia
            this.gisMap = L.map('indonesiaGisMap', {
                center: [-2.2, 118.0],
                zoom: 5,
                minZoom: 4,
                maxZoom: 10,
                scrollWheelZoom: true
            });

            // Tile Layer Kartografi Berkualitas Tinggi (CartoDB Voyager)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | DEN RI Agritrade',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(this.gisMap);

            // Tambahkan Marker Pin untuk Seluruh 38 Provinsi Indonesia
            Object.values(PROVINCES_INDONESIA).forEach(prov => {
                const primaryCrop = AGRI_COMMODITIES[prov.bestCrops[0]] || { icon: '🌾' };
                
                // Custom DivIcon HTML Marker
                const customIcon = L.divIcon({
                    className: 'custom-agri-marker',
                    html: `
                        <div class="leaf-marker-pin-wrap" id="marker-prov-${prov.id}">
                            <div class="leaf-marker-bubble">
                                <span>${primaryCrop.icon}</span>
                                <span>${prov.name}</span>
                            </div>
                            <div class="leaf-marker-dot"></div>
                        </div>
                    `,
                    iconSize: [110, 36],
                    iconAnchor: [55, 36]
                });

                const marker = L.marker([prov.lat, prov.lng], { icon: customIcon }).addTo(this.gisMap);

                // Popup Konten Detail Agroklimat
                const cropsHtml = prov.bestCrops.map(cid => {
                    const c = AGRI_COMMODITIES[cid];
                    return `<span class="crop-mini-tag" style="display:inline-block; margin:2px 3px 2px 0;">${c ? c.icon + ' ' + c.name.split(' ')[0] : cid}</span>`;
                }).join('');

                const popupContent = `
                    <div style="min-width:200px;">
                        <h4 style="margin:0; font-size:1.05rem; color:#0f5132; font-weight:800;">📍 ${prov.name}</h4>
                        <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">Ibukota: <strong>${prov.capital}</strong></div>
                        <div style="margin:6px 0; font-size:0.8rem; line-height:1.4;">
                            🌧️ Curah Hujan: <strong>${prov.rainfallMm}</strong><br>
                            🌱 Jenis Tanah: <strong>${AGRI_SOIL_SOLUTIONS[prov.soil]?.name || prov.soil}</strong><br>
                            ☀️ Musim: <strong>${prov.season}</strong>
                        </div>
                        <div style="margin-top:6px;">
                            <strong style="font-size:0.75rem; color:#0f172a;">Komoditas Unggulan:</strong><br>
                            ${cropsHtml}
                        </div>
                    </div>
                `;

                marker.bindPopup(popupContent);

                // Event Klik Marker
                marker.on('click', () => {
                    this.selectProvince(prov.id, false);
                });

                this.provinceMarkers[prov.id] = marker;
            });

        } catch (err) {
            console.error('Error initializing Leaflet GIS map:', err);
        }
    }

    // --- 2. SELECT & INSPECT PROVINCE WITH MONTH/YEAR RECOGNITION ---
    selectProvince(provId, flyCamera = true) {
        const prov = PROVINCES_INDONESIA[provId];
        if (!prov) return;

        this.selectedProvinceId = provId;
        this.selectedRegionId = prov.island;
        this.selectedSoilId = prov.soil;

        // Update Side Panel Header
        const provNameEl = document.getElementById('provinceDetailName');
        const provCapEl = document.getElementById('provinceCapitalName');
        const provRainEl = document.getElementById('provinceRainfallVal');
        const provKeyRegEl = document.getElementById('provinceKeyRegencyVal');
        const provSoilEl = document.getElementById('provinceSoilVal');
        const provIslandBadge = document.getElementById('provinceIslandBadge');
        const provElNinoBadge = document.getElementById('provinceElNinoBadge');

        if (provNameEl) provNameEl.textContent = prov.name;
        if (provCapEl) provCapEl.textContent = prov.capital;
        if (provRainEl) provRainEl.textContent = prov.rainfallMm;
        if (provKeyRegEl) provKeyRegEl.textContent = prov.keyRegency;
        if (provSoilEl) provSoilEl.textContent = AGRI_SOIL_SOLUTIONS[prov.soil]?.name || prov.soil;
        if (provIslandBadge) provIslandBadge.textContent = `ZONA ${prov.island.replace('_', ' ')}`;
        
        if (provElNinoBadge) {
            provElNinoBadge.textContent = `El Niño: ${prov.elNino}`;
            if (prov.elNino.includes('Tinggi')) {
                provElNinoBadge.style.background = '#fee2e2';
                provElNinoBadge.style.color = '#991b1b';
            } else if (prov.elNino.includes('Sedang')) {
                provElNinoBadge.style.background = '#fef3c7';
                provElNinoBadge.style.color = '#92400e';
            } else {
                provElNinoBadge.style.background = '#d1fae5';
                provElNinoBadge.style.color = '#065f46';
            }
        }

        // --- TIMEHORIZON CALCULATION (Year to Year+5) ---
        const startMonth = this.selectedAnalysisMonth; // 1 - 12
        const startYear = this.selectedAnalysisYear; // 2026 - 2031
        const startMonthName = this.monthNames[startMonth - 1];

        // Next Month & Year calculation
        const nextMonth = (startMonth % 12) + 1;
        const nextYear = startMonth === 12 ? startYear + 1 : startYear;
        const nextMonthName = this.monthNames[nextMonth - 1];

        // Inflation Factors
        const yearDiff1 = Math.max(0, startYear - 2026);
        const inflationFactor1 = Math.pow(1.04, yearDiff1); // 4% per year
        const costFactor1 = Math.pow(1.035, yearDiff1); // 3.5% per year

        const yearDiff2 = Math.max(0, nextYear - 2026);
        const inflationFactor2 = Math.pow(1.04, yearDiff2);
        const costFactor2 = Math.pow(1.035, yearDiff2);

        // Update Dynamic Header Labels in Cards
        document.querySelectorAll('.lbl-this-month-name').forEach(el => {
            el.textContent = `${startMonthName} ${startYear}`;
        });
        document.querySelectorAll('.lbl-next-month-name').forEach(el => {
            el.textContent = `${nextMonthName} ${nextYear}`;
        });

        // 1. Evaluasi Komoditas Terbaik untuk Bulan Pilihan (Card 1)
        let crop1 = null;
        let bestScore1 = -999;
        let harvestMonth1 = 1;
        let harvestYear1 = startYear;
        let projPrice1 = 0;
        let projHpp1 = 0;
        let marginPct1 = 0;

        prov.bestCrops.forEach(cid => {
            const crop = AGRI_COMMODITIES[cid];
            if (!crop) return;
            const totalMonths = startMonth + Math.round(crop.growthDurationMonths);
            const hMonth = ((totalMonths - 1) % 12) + 1;
            const hYear = startYear + Math.floor((totalMonths - 1) / 12);
            const priceMult = crop.monthlyPriceIndex[hMonth - 1] || 1.0;
            const price = Math.round(crop.basePriceKg * priceMult * inflationFactor1);
            const hpp = Math.round(crop.costPerKg * costFactor1);
            const margin = Math.round(((price - hpp) / hpp) * 100);

            if (margin > bestScore1) {
                bestScore1 = margin;
                crop1 = crop;
                harvestMonth1 = hMonth;
                harvestYear1 = hYear;
                projPrice1 = price;
                projHpp1 = hpp;
                marginPct1 = margin;
            }
        });

        if (!crop1 && prov.bestCrops.length > 0) {
            crop1 = AGRI_COMMODITIES[prov.bestCrops[0]];
            const totalMonths = startMonth + Math.round(crop1.growthDurationMonths);
            harvestMonth1 = ((totalMonths - 1) % 12) + 1;
            harvestYear1 = startYear + Math.floor((totalMonths - 1) / 12);
            projPrice1 = Math.round(crop1.basePriceKg * inflationFactor1);
            projHpp1 = Math.round(crop1.costPerKg * costFactor1);
            marginPct1 = Math.round(((projPrice1 - projHpp1) / projHpp1) * 100);
        }

        // Render Card 1 (Bulan Pilihan)
        const hero1El = document.getElementById('thisMonthCropHero');
        const details1El = document.getElementById('thisMonthCropDetails');
        const badge1El = document.getElementById('thisMonthProfitBadge');

        if (hero1El && crop1) {
            hero1El.innerHTML = `
                <div class="rec-crop-icon-box">${crop1.icon}</div>
                <div>
                    <div class="rec-crop-name">${crop1.name}</div>
                    <div class="rec-crop-subtitle">Masa Tanam: <strong>${crop1.growthDurationMonths} Bulan</strong> (${crop1.avgYieldTonPerHa} Ton/Ha)</div>
                </div>
            `;
        }

        if (details1El && crop1) {
            const hMonthName = this.monthNames[harvestMonth1 - 1];
            details1El.innerHTML = `
                <div class="rec-detail-item">
                    <span class="rec-detail-lbl">📅 Waktu Panen</span>
                    <span class="rec-detail-val" style="color:#0f5132;">${hMonthName} ${harvestYear1}</span>
                </div>
                <div class="rec-detail-item">
                    <span class="rec-detail-lbl">💰 Proyeksi Harga Jual</span>
                    <span class="rec-detail-val">Rp ${projPrice1.toLocaleString('id-ID')} / Kg</span>
                </div>
                <div class="rec-detail-item">
                    <span class="rec-detail-lbl">💵 Biaya Pokok (HPP)</span>
                    <span class="rec-detail-val">Rp ${projHpp1.toLocaleString('id-ID')} / Kg</span>
                </div>
                <div class="rec-detail-item">
                    <span class="rec-detail-lbl">📈 Estimasi Margin Laba</span>
                    <span class="rec-detail-val" style="color:#15803d; font-weight:800;">+${marginPct1}% Bersih</span>
                </div>
            `;
        }

        if (badge1El) {
            badge1El.textContent = `🔥 Margin +${marginPct1}%`;
        }

        // 2. Evaluasi Komoditas Terbaik untuk Bulan Berikutnya (Card 2)
        let crop2 = null;
        let bestScore2 = -999;
        let harvestMonth2 = 1;
        let harvestYear2 = nextYear;
        let projPrice2 = 0;
        let projHpp2 = 0;
        let marginPct2 = 0;

        prov.bestCrops.forEach(cid => {
            const crop = AGRI_COMMODITIES[cid];
            if (!crop) return;
            const totalMonths = nextMonth + Math.round(crop.growthDurationMonths);
            const hMonth = ((totalMonths - 1) % 12) + 1;
            const hYear = nextYear + Math.floor((totalMonths - 1) / 12);
            const priceMult = crop.monthlyPriceIndex[hMonth - 1] || 1.0;
            const price = Math.round(crop.basePriceKg * priceMult * inflationFactor2);
            const hpp = Math.round(crop.costPerKg * costFactor2);
            const margin = Math.round(((price - hpp) / hpp) * 100);

            // Berikan bobot rotasi tanaman variatif
            const score = margin + (crop.id !== crop1?.id ? 25 : 0);
            if (score > bestScore2) {
                bestScore2 = score;
                crop2 = crop;
                harvestMonth2 = hMonth;
                harvestYear2 = hYear;
                projPrice2 = price;
                projHpp2 = hpp;
                marginPct2 = margin;
            }
        });

        if (!crop2 && prov.bestCrops.length > 0) {
            crop2 = AGRI_COMMODITIES[prov.bestCrops[prov.bestCrops.length > 1 ? 1 : 0]];
            const totalMonths = nextMonth + Math.round(crop2.growthDurationMonths);
            harvestMonth2 = ((totalMonths - 1) % 12) + 1;
            harvestYear2 = nextYear + Math.floor((totalMonths - 1) / 12);
            projPrice2 = Math.round(crop2.basePriceKg * inflationFactor2);
            projHpp2 = Math.round(crop2.costPerKg * costFactor2);
            marginPct2 = Math.round(((projPrice2 - projHpp2) / projHpp2) * 100);
        }

        // Render Card 2 (Bulan Berikutnya)
        const hero2El = document.getElementById('nextMonthCropHero');
        const details2El = document.getElementById('nextMonthCropDetails');
        const badge2El = document.getElementById('nextMonthProfitBadge');

        if (hero2El && crop2) {
            hero2El.innerHTML = `
                <div class="rec-crop-icon-box" style="background:#fffbeb;">${crop2.icon}</div>
                <div>
                    <div class="rec-crop-name">${crop2.name}</div>
                    <div class="rec-crop-subtitle">Masa Tanam: <strong>${crop2.growthDurationMonths} Bulan</strong> (${crop2.avgYieldTonPerHa} Ton/Ha)</div>
                </div>
            `;
        }

        if (details2El && crop2) {
            const hMonthName = this.monthNames[harvestMonth2 - 1];
            details2El.innerHTML = `
                <div class="rec-detail-item">
                    <span class="rec-detail-lbl">📅 Waktu Panen</span>
                    <span class="rec-detail-val" style="color:#b45309;">${hMonthName} ${harvestYear2}</span>
                </div>
                <div class="rec-detail-item">
                    <span class="rec-detail-lbl">💰 Proyeksi Harga Jual</span>
                    <span class="rec-detail-val">Rp ${projPrice2.toLocaleString('id-ID')} / Kg</span>
                </div>
                <div class="rec-detail-item">
                    <span class="rec-detail-lbl">💵 Biaya Pokok (HPP)</span>
                    <span class="rec-detail-val">Rp ${projHpp2.toLocaleString('id-ID')} / Kg</span>
                </div>
                <div class="rec-detail-item">
                    <span class="rec-detail-lbl">📈 Estimasi Margin Laba</span>
                    <span class="rec-detail-val" style="color:#b45309; font-weight:800;">+${marginPct2}% Bersih</span>
                </div>
            `;
        }

        if (badge2El) {
            badge2El.textContent = `✨ Margin +${marginPct2}%`;
        }

        // Store recommended crops for quick action buttons
        this.thisMonthRecommendedCropId = crop1?.id || 'PADI_BERAS';
        this.nextMonthRecommendedCropId = crop2?.id || 'JAGUNG_PIPIL';

        // Sync with Calculator Dropdowns
        const regSelect = document.getElementById('selectRegion');
        if (regSelect) regSelect.value = provId;

        const soilSelect = document.getElementById('selectSoilType');
        if (soilSelect) soilSelect.value = prov.soil;

        const cropSelect = document.getElementById('selectCommodity');
        if (cropSelect) cropSelect.value = this.thisMonthRecommendedCropId;

        // Fly Camera if requested
        if (flyCamera && this.gisMap) {
            this.gisMap.flyTo([prov.lat, prov.lng], 7, { duration: 1.2 });
            const marker = this.provinceMarkers[provId];
            if (marker) marker.openPopup();
        }

        this.runPlantingCalculation();
        this.renderSoilRemediation();
    }

    initEventListeners() {
        // Calculation Inputs Change Listeners
        const inputs = ['selectCommodity', 'selectSoilType', 'selectPlantMonth', 'selectPlantYear', 'inputLandArea'];
        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => this.handleInputChange());
                el.addEventListener('input', () => this.handleInputChange());
            }
        });

        // Region / Province Select Dropdown in Calculator
        const regSelect = document.getElementById('selectRegion');
        if (regSelect) {
            regSelect.addEventListener('change', () => {
                const provId = regSelect.value;
                this.selectProvince(provId, true);
            });
        }

        // Month & Year Selector in Right Box Panel
        const analysisMonthSelect = document.getElementById('selectAnalysisMonth');
        if (analysisMonthSelect) {
            analysisMonthSelect.addEventListener('change', (e) => {
                this.selectedAnalysisMonth = parseInt(e.target.value, 10);
                this.selectProvince(this.selectedProvinceId, false);
            });
        }

        const analysisYearSelect = document.getElementById('selectAnalysisYear');
        if (analysisYearSelect) {
            analysisYearSelect.addEventListener('change', (e) => {
                this.selectedAnalysisYear = parseInt(e.target.value, 10);
                this.selectProvince(this.selectedProvinceId, false);
            });
        }

        // Reset to Current Month & Year Button
        const btnResetPeriod = document.getElementById('btnResetToCurrentMonth');
        if (btnResetPeriod) {
            btnResetPeriod.addEventListener('click', () => {
                this.selectedAnalysisMonth = 8; // Agustus
                this.selectedAnalysisYear = 2026;
                if (analysisMonthSelect) analysisMonthSelect.value = 8;
                if (analysisYearSelect) analysisYearSelect.value = 2026;
                this.selectProvince(this.selectedProvinceId, false);
            });
        }

        // Live Province Search Input
        const searchInput = document.getElementById('inputProvinceSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const q = e.target.value.toLowerCase().trim();
                if (q.length < 2) return;

                const found = Object.values(PROVINCES_INDONESIA).find(p => 
                    p.name.toLowerCase().includes(q) || 
                    p.capital.toLowerCase().includes(q) || 
                    p.keyRegency.toLowerCase().includes(q)
                );

                if (found) {
                    this.selectProvince(found.id, true);
                }
            });
        }

        // Quick Island Filter / Zoom Buttons
        const zoomBtns = document.querySelectorAll('[data-zoom-target]');
        zoomBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                zoomBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const target = btn.dataset.zoomTarget;
                if (!this.gisMap) return;

                switch (target) {
                    case 'JAWA_BALI':
                        this.gisMap.flyTo([-7.5, 110.0], 6.5, { duration: 1.2 });
                        this.selectProvince('JATENG', false);
                        break;
                    case 'SUMATERA':
                        this.gisMap.flyTo([0.5, 101.5], 6, { duration: 1.2 });
                        this.selectProvince('SUMUT', false);
                        break;
                    case 'NUSA_TENGGARA':
                        this.gisMap.flyTo([-8.6, 118.5], 7, { duration: 1.2 });
                        this.selectProvince('NTB', false);
                        break;
                    case 'SULAWESI':
                        this.gisMap.flyTo([-2.0, 121.0], 6.5, { duration: 1.2 });
                        this.selectProvince('SULSEL', false);
                        break;
                    case 'KALIMANTAN':
                        this.gisMap.flyTo([-0.5, 114.0], 6, { duration: 1.2 });
                        this.selectProvince('KALSEL', false);
                        break;
                    case 'MALUKU_PAPUA':
                        this.gisMap.flyTo([-3.5, 134.0], 5.5, { duration: 1.2 });
                        this.selectProvince('PAPUA_SELATAN', false);
                        break;
                }
            });
        });

        // Reset Map Zoom Button
        const btnReset = document.getElementById('btnResetMapZoom');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                if (this.gisMap) {
                    this.gisMap.flyTo([-2.2, 118.0], 5, { duration: 1.2 });
                }
            });
        }

        // Plant This Month Quick Action Button
        const btnPlantThis = document.getElementById('btnPlantThisMonth');
        if (btnPlantThis) {
            btnPlantThis.addEventListener('click', () => {
                this.selectedPlantMonth = this.selectedAnalysisMonth;
                this.selectedPlantYear = this.selectedAnalysisYear;
                this.selectedCommodityId = this.thisMonthRecommendedCropId || 'PADI_BERAS';
                
                const mSelect = document.getElementById('selectPlantMonth');
                if (mSelect) mSelect.value = this.selectedPlantMonth;

                const ySelect = document.getElementById('selectPlantYear');
                if (ySelect) ySelect.value = this.selectedPlantYear;

                const cSelect = document.getElementById('selectCommodity');
                if (cSelect) cSelect.value = this.selectedCommodityId;

                this.runPlantingCalculation();

                const calcSection = document.getElementById('kalkulator');
                if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Plant Next Month Quick Action Button
        const btnPlantNext = document.getElementById('btnPlantNextMonth');
        if (btnPlantNext) {
            btnPlantNext.addEventListener('click', () => {
                const nextM = (this.selectedAnalysisMonth % 12) + 1;
                const nextY = this.selectedAnalysisMonth === 12 ? this.selectedAnalysisYear + 1 : this.selectedAnalysisYear;

                this.selectedPlantMonth = nextM;
                this.selectedPlantYear = nextY;
                this.selectedCommodityId = this.nextMonthRecommendedCropId || 'JAGUNG_PIPIL';
                
                const mSelect = document.getElementById('selectPlantMonth');
                if (mSelect) mSelect.value = nextM;

                const ySelect = document.getElementById('selectPlantYear');
                if (ySelect) ySelect.value = nextY;

                const cSelect = document.getElementById('selectCommodity');
                if (cSelect) cSelect.value = this.selectedCommodityId;

                this.runPlantingCalculation();

                const calcSection = document.getElementById('kalkulator');
                if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Weather Alert Button Dialog Trigger
        const btnWeatherAlert = document.getElementById('btnOpenWeatherModal');
        if (btnWeatherAlert) {
            btnWeatherAlert.addEventListener('click', () => this.openWeatherSituationModal());
        }

        // Modal Close Button
        const modalClose = document.getElementById('btnAlertModalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                document.getElementById('weatherSituationModal').classList.remove('active');
            });
        }

        // Consultation Form Submit
        const formConsult = document.getElementById('agriConsultForm');
        if (formConsult) {
            formConsult.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleConsultationSubmit();
            });
        }
    }

    handleInputChange() {
        const cropEl = document.getElementById('selectCommodity');
        const soilEl = document.getElementById('selectSoilType');
        const monthEl = document.getElementById('selectPlantMonth');
        const yearEl = document.getElementById('selectPlantYear');
        const areaEl = document.getElementById('inputLandArea');

        if (cropEl) this.selectedCommodityId = cropEl.value;
        if (soilEl) this.selectedSoilId = soilEl.value;
        if (monthEl) this.selectedPlantMonth = parseInt(monthEl.value, 10);
        if (yearEl) this.selectedPlantYear = parseInt(yearEl.value, 10);
        if (areaEl) this.landAreaHa = parseFloat(areaEl.value) || 1.0;

        this.runPlantingCalculation();
        this.renderSoilRemediation();
    }

    // --- 3. KALKULATOR TANGGAL TANAM ➔ BULAN & TAHUN PANEN & ESTIMASI CUAN ---
    runPlantingCalculation() {
        const crop = AGRI_COMMODITIES[this.selectedCommodityId] || AGRI_COMMODITIES['PADI_BERAS'];
        const soil = AGRI_SOIL_SOLUTIONS[this.selectedSoilId] || AGRI_SOIL_SOLUTIONS['ALUVIAL'];

        // 1. Hitung Waktu Panen (Bulan & Tahun)
        const plantMonth = this.selectedPlantMonth;
        const plantYear = this.selectedPlantYear || 2026;
        const totalMonths = plantMonth + Math.round(crop.growthDurationMonths);
        const harvestMonthIndex = ((totalMonths - 1) % 12);
        const harvestMonthNumber = harvestMonthIndex + 1;
        const harvestYear = plantYear + Math.floor((totalMonths - 1) / 12);
        
        const harvestMonthName = this.monthNames[harvestMonthIndex];
        const plantMonthName = this.monthNames[plantMonth - 1];

        // 2. Inflasi Multi-Tahun (Year to Year+5)
        const yearDiff = Math.max(0, plantYear - 2026);
        const inflationFactor = Math.pow(1.04, yearDiff);
        const costFactor = Math.pow(1.035, yearDiff);

        // 3. Estimasi Hasil Panen (Ton & Kuintal)
        const soilMultiplier = soil ? soil.yieldMultiplier : 1.0;
        const totalYieldTon = crop.avgYieldTonPerHa * this.landAreaHa * soilMultiplier;
        const totalYieldKg = totalYieldTon * 1000;
        const totalYieldKuintal = totalYieldTon * 10;

        // 4. Proyeksi Harga Jual Per Kilogram di Bulan & Tahun Panen
        const seasonalMultiplier = crop.monthlyPriceIndex[harvestMonthIndex] || 1.0;
        const projectedPricePerKg = Math.round(crop.basePriceKg * seasonalMultiplier * inflationFactor);
        const projectedCostPerKg = Math.round(crop.costPerKg * costFactor);

        // 5. Perhitungan Keuangan
        const grossRevenue = totalYieldKg * projectedPricePerKg;
        const baseProductionCost = totalYieldKg * projectedCostPerKg;
        const landMaintenanceCost = this.landAreaHa * (3500000 * costFactor);
        const totalCost = baseProductionCost + landMaintenanceCost;
        const netProfit = grossRevenue - totalCost;
        const roiPct = totalCost > 0 ? Math.round((netProfit / totalCost) * 100) : 0;

        // 6. Update UI Kalkulator
        const resPlantMonth = document.getElementById('calcResPlantMonth');
        const resHarvestMonth = document.getElementById('calcResHarvestMonth');
        const resDuration = document.getElementById('calcResDuration');
        const resPricePerKg = document.getElementById('calcResPricePerKg');
        const resYieldVolume = document.getElementById('calcResYieldVolume');
        const resGrossRevenue = document.getElementById('calcResGrossRevenue');
        const resNetProfit = document.getElementById('calcResNetProfit');
        const resRoi = document.getElementById('calcResRoi');
        const resAdvisory = document.getElementById('calcResAdvisory');

        if (resPlantMonth) resPlantMonth.textContent = `${plantMonthName} ${plantYear}`;
        if (resHarvestMonth) resHarvestMonth.textContent = `${harvestMonthName} ${harvestYear} (${crop.growthDurationMonths} Bln)`;
        if (resDuration) resDuration.textContent = `${crop.growthDurationMonths} Bulan`;
        if (resPricePerKg) resPricePerKg.textContent = `Rp ${projectedPricePerKg.toLocaleString('id-ID')} / Kg`;
        if (resYieldVolume) resYieldVolume.textContent = `${totalYieldTon.toFixed(1)} Ton (${totalYieldKuintal.toFixed(0)} Kuintal)`;
        if (resGrossRevenue) resGrossRevenue.textContent = `Rp ${Math.round(grossRevenue).toLocaleString('id-ID')}`;
        
        if (resNetProfit) {
            resNetProfit.textContent = `Rp ${Math.round(netProfit).toLocaleString('id-ID')}`;
            resNetProfit.style.color = netProfit >= 0 ? '#10b981' : '#ef4444';
        }

        if (resRoi) {
            resRoi.textContent = `${roiPct}%`;
            resRoi.className = `metric-badge ${roiPct >= 30 ? 'badge-success' : (roiPct >= 0 ? 'badge-warning' : 'badge-danger')}`;
        }

        if (resAdvisory) {
            let advisoryText = '';
            if (seasonalMultiplier >= 1.15) {
                advisoryText = `🌟 <strong>Momen Panen Emas!</strong> Panen di bulan <strong>${harvestMonthName} ${harvestYear}</strong> bertepatan dengan pasokan pasar yang ketat / menjelang hari besar nasional. Harga diproyeksikan <strong>+${Math.round((seasonalMultiplier - 1) * 100)}% lebih tinggi</strong> dari harga acuan dasar!`;
            } else if (seasonalMultiplier <= 0.90) {
                advisoryText = `⚠️ <strong>Peringatan Panen Raya:</strong> Bulan <strong>${harvestMonthName} ${harvestYear}</strong> merupakan puncak panen raya. Disarankan menggunakan fasilitas pengeringan (dryer) & silo penyimpanan atau menjual ke industri olahan agar harga tidak anjlok.`;
            } else {
                advisoryText = `✅ <strong>Kondisi Stabil:</strong> Harga di bulan <strong>${harvestMonthName} ${harvestYear}</strong> berada pada rentang stabil nasional. Cocok untuk serapan pasar lokal maupun perdagangan antar-provinsi.`;
            }
            resAdvisory.innerHTML = advisoryText;
        }

        // Update Ringkasan Potensi Ekspor
        const exportEl = document.getElementById('calcResExportPotential');
        if (exportEl) {
            exportEl.innerHTML = `<strong>Peluang Perdagangan:</strong> ${crop.exportPotential}`;
        }
    }

    // --- 4. JADWAL TANAM SALING MELENGKAPI (ANTI-OVER SUPPLY / ANTI-INFLASI) ---
    renderNationalCropSchedule() {
        const scheduleContainer = document.getElementById('nationalScheduleTableBody');
        if (!scheduleContainer) return;

        scheduleContainer.innerHTML = '';
        const schedules = [
            {
                crop: 'Cabai Rawit Merah 🌶️',
                jawaBulan: 'Tanam: Okt ➔ Panen: Jan (Penyangga Tahun Baru)',
                sumateraBulan: 'Tanam: Jan ➔ Panen: Apr (Pasokan Lebaran)',
                sulawesiBulan: 'Tanam: Apr ➔ Panen: Jul (Kawasan Timur)',
                status: 'Saling Melengkapi (Harga Terjaga)'
            },
            {
                crop: 'Bawang Merah 🧅',
                jawaBulan: 'Tanam: Jun (Brebes) ➔ Panen: Agt',
                sumateraBulan: 'Tanam: Agt (Solok) ➔ Panen: Okt',
                sulawesiBulan: 'Tanam: Mar (Bima/Enrekang) ➔ Panen: Mei',
                status: 'Rotasi Terdistribusi Bebas Impor'
            },
            {
                crop: 'Padi Sawah (Beras) 🌾',
                jawaBulan: 'Rendengan: Okt ➔ Panen: Feb/Mar',
                sumateraBulan: 'Gadu: Mei ➔ Panen: Agt/Sep',
                sulawesiBulan: 'IP 300: Jan, Mei, Sep (Sepanjang Tahun)',
                status: 'Cadangan Beras Bulog Maksimal'
            },
            {
                crop: 'Jagung Hibrida 🌽',
                jawaBulan: 'Tanam: Nov ➔ Panen: Feb',
                sumateraBulan: 'Tanam: Mar ➔ Panen: Jun',
                sulawesiBulan: 'Tanam: Jul (Gorontalo) ➔ Panen: Okt',
                status: 'Pasokan Pakan Ternak Stabil'
            }
        ];

        schedules.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong style="color:var(--primary-emerald);">${item.crop}</strong></td>
                <td>${item.jawaBulan}</td>
                <td>${item.sumateraBulan}</td>
                <td>${item.sulawesiBulan}</td>
                <td><span class="badge-pill" style="background:#d1fae5; color:#065f46; font-weight:700; padding:3px 8px; border-radius:6px;">${item.status}</span></td>
            `;
            scheduleContainer.appendChild(tr);
        });
    }

    // --- 5. SOLUSI PERLAKUAN TANAH & FORMULA MAX-YIELD ---
    renderSoilRemediation() {
        const soil = AGRI_SOIL_SOLUTIONS[this.selectedSoilId];
        const container = document.getElementById('soilSolutionDetailBox');
        if (!soil || !container) return;

        container.innerHTML = `
            <div class="soil-detail-header">
                <div>
                    <h3 style="color:var(--primary-emerald); font-size:1.15rem; font-weight:800;">${soil.name}</h3>
                    <p style="font-size:0.84rem; color:var(--text-muted); margin-top:2px;">${soil.desc}</p>
                </div>
                <div class="soil-ph-badge">
                    <span style="font-size:0.7rem; text-transform:uppercase;">pH Alami</span>
                    <strong>${soil.defaultPH}</strong>
                </div>
            </div>

            <div style="margin-top:14px;">
                <h4 style="font-size:0.92rem; font-weight:700; color:var(--text-dark); margin-bottom:8px;">
                    📋 Langkah Remediasi & Aplikasi Pupuk Presisi (Per Hektar):
                </h4>
                <div class="soil-steps-grid">
                    ${soil.treatmentSteps.map(step => `
                        <div class="soil-step-card">
                            <div style="font-weight:700; color:var(--primary-emerald); font-size:0.88rem;">${step.title}</div>
                            <div style="font-size:0.82rem; color:var(--text-muted); margin-top:4px; line-height:1.4;">${step.action}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="soil-yield-boost-banner">
                <span>🚀 Potensi Peningkatan Hasil Panen: <strong>+${Math.round((soil.yieldMultiplier - 1) * 100)}% Lebih Tinggi</strong> dengan penerapan formula di atas!</span>
            </div>
        `;
    }

    // --- 6. POP-UP SITUASI DATA & STASIUN CUACA BMKG ---
    openWeatherSituationModal() {
        const modal = document.getElementById('weatherSituationModal');
        const alertObj = BMKG_WEATHER_ALERTS[this.currentAlertIndex];
        const modalBody = document.getElementById('weatherSituationModalBody');

        if (modal && modalBody) {
            modalBody.innerHTML = `
                <div style="background:${alertObj.color}18; border:1.5px solid ${alertObj.color}; border-radius:14px; padding:14px; text-align:left;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3 style="font-size:1.1rem; color:${alertObj.color}; font-weight:800;">${alertObj.title}</h3>
                        <span style="background:${alertObj.color}; color:#fff; font-size:0.72rem; font-weight:800; padding:3px 8px; border-radius:6px;">${alertObj.level}</span>
                    </div>
                    <p style="font-size:0.85rem; color:var(--text-dark); margin-top:8px; line-height:1.4;">
                        <strong>Wilayah Terdampak:</strong> ${alertObj.affectedRegions.map(rid => AGRI_REGIONS_INDONESIA[rid]?.name || rid).join(', ')}
                    </p>
                    <div style="background:#ffffff; border-radius:10px; padding:10px; margin-top:10px; font-size:0.83rem; line-height:1.4;">
                        <strong style="color:var(--primary-emerald);">SOP Mitigasi DEN & Kementan:</strong><br>
                        ${alertObj.recommendation}
                    </div>
                </div>

                <div style="text-align:left; margin-top:12px; font-size:0.8rem; color:var(--text-muted);">
                    Status Jaringan Stasiun Cuaca BMKG: <strong style="color:#10b981;">98.4% Online Terintegrasi</strong><br>
                    Pembaruan Data Otomatis: Setiap 1 Jam via Satelit Himawari-9 & Radar Cuaca.
                </div>
            `;
            modal.classList.add('active');
        }
    }

    // --- 7. FORM KONSULTASI PENYULUH & HOTLINE DEN ---
    handleConsultationSubmit() {
        const nameInput = document.getElementById('consultName').value.trim();
        const phoneInput = document.getElementById('consultPhone').value.trim();
        const regionInput = document.getElementById('consultRegion').value;
        const problemInput = document.getElementById('consultProblem').value.trim();

        if (!nameInput || !phoneInput || !problemInput) {
            alert('Mohon lengkapi seluruh data nama, nomor WhatsApp, dan kendala lahan Anda.');
            return;
        }

        const ticketId = 'DEN-AGRI-' + Math.floor(100000 + Math.random() * 900000);
        const waMessage = `Halo Tim Ahli DEN & Penyuluh Pertanian,%0A%0ASaya ingin konsultasi budidaya dan solusi lahan:%0A- No Tiket: ${ticketId}%0A- Nama: ${encodeURIComponent(nameInput)}%0A- Wilayah: ${encodeURIComponent(regionInput)}%0A- Kendala: ${encodeURIComponent(problemInput)}%0A%0AMohon panduannya agar hasil panen maksimal dan cuan. Terima kasih!`;
        const waUrl = `https://wa.me/6281234567890?text=${waMessage}`;

        const resBox = document.getElementById('consultationSuccessBox');
        if (resBox) {
            resBox.innerHTML = `
                <div style="background:#d1fae5; border:1px solid #10b981; border-radius:12px; padding:14px; text-align:center; color:#065f46;">
                    <div style="font-size:1.4rem;">✅</div>
                    <strong>Tiket Konsultasi Berhasil Dibuat: #${ticketId}</strong>
                    <p style="font-size:0.85rem; margin-top:4px;">Penyuluh agraria DEN wilayah Anda akan segera menghubungi Anda, atau klik tombol di bawah untuk langsung terhubung via WhatsApp resmi:</p>
                    <a href="${waUrl}" target="_blank" class="btn-wa-direct" style="display:inline-block; margin-top:8px; background:#10b981; color:#ffffff; padding:8px 18px; border-radius:8px; font-weight:700; text-decoration:none;">
                        💬 Lanjut Chat WhatsApp Ahli DEN
                    </a>
                </div>
            `;
            resBox.style.display = 'block';
        }
    }
}

// Inisialisasi saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
    window.cocokTanamApp = new CocokTanamEngine();
});
