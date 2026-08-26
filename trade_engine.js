/**
 * ============================================================
 * GLOBAL TRADE TYCOON - SIMULATION & MULTIPLAYER ENGINE
 * Mesin Simulasi Rantai Pasok 1-10 Pemain, Papan Komoditas Depan,
 * Wizard Keputusan 4 Langkah, Peta Skala Adaptif, dan Teori Dagang.
 * ============================================================
 */

class GlobalTradeEngine {
    constructor() {
        // Canvases & Contexts
        this.mapCanvas = document.getElementById('worldTradeCanvas');
        this.mapCtx = this.mapCanvas.getContext('2d');

        // Set Map Canvas Resolution
        this.mapCanvas.width = 1000;
        this.mapCanvas.height = 540;

        // Multiplayer State (1 to 10 Players)
        this.playerCount = 2;
        this.activePlayerIndex = 0;
        this.players = [];
        this.roundNumber = 1;

        // Colors palette for up to 10 players
        this.playerColors = [
            '#00f5d4', '#3a86ff', '#ffd166', '#ff3366', '#06d6a0',
            '#8338ec', '#ff9f1c', '#f72585', '#4cc9f0', '#70e000'
        ];

        // Market Commodity Dynamic Prices
        this.marketPrices = {};
        this.priceTrends = {};
        this.initMarketPrices();

        // Calendar & Clock
        this.gameMonth = 1;
        this.gameYear = 1;

        // Current Active Geographic Map Scale
        this.currentMapScale = 'CITY';
        this.activeNodes = {};

        // Active UI Tab
        this.currentTab = 'tabDashboard';

        // Decision Wizard Temporary State
        this.wizardState = {
            step: 1,
            commodityId: 'PALM_OIL_RAW',
            sourceNodeId: 'CITY_FARMS',
            buyAmount: 25,
            destNodeId: 'CITY_MARKET',
            vehicleType: 'truck',
            domesticPct: 100
        };

        // News Feed
        this.newsFeed = [
            '🌐 Selamat datang di Global Trade Tycoon! Permainan rantai pasok multi-perusahaan dimulai.',
            '💡 Manfaatkan Wizard Keputusan di Papan Utama untuk memandu langkah bisnis Anda.',
            '📈 Peta otomatis menyesuaikan skala lokal kota hingga dunia sesuai level yang dicapai.'
        ];

        this.initMultiplayerSetup();
        this.initEventListeners();

        // Start Animation Loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    // --- SETUP MULTIPLAYER 1-10 PEMAIN ---
    initMultiplayerSetup() {
        const container = document.getElementById('playerListInputContainer');
        const countBtns = document.querySelectorAll('.btn-pcount');

        const updateInputs = (count) => {
            this.playerCount = count;
            container.innerHTML = '';
            const defaultNames = [
                'PT Nusantara Logistik', 'Global Maritime Corp', 'Singa Trade Express',
                'Pacific Supply Line', 'Sinar Megah Logistics', 'EuroAsia Freight Ltd',
                'Nippon Cargo Lines', 'Arabian Petro Energy', 'Amazonia Agro Supply', 'Swiss Precision Trade'
            ];

            for (let i = 0; i < count; i++) {
                const row = document.createElement('div');
                row.className = 'p-input-row';
                row.innerHTML = `
                    <div class="p-color-picker" style="background:${this.playerColors[i]};"></div>
                    <span style="font-weight:700; font-size:0.85rem; width:80px;">Pemain ${i + 1}:</span>
                    <input type="text" class="p-name-field" id="inputPName_${i}" value="${defaultNames[i] || `Perusahaan ${i+1}`}">
                `;
                container.appendChild(row);
            }
        };

        countBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                countBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                updateInputs(parseInt(btn.dataset.count, 10));
            });
        });

        updateInputs(2);

        // Start Game Button
        const btnStart = document.getElementById('btnStartGameSetup');
        btnStart.addEventListener('click', () => {
            this.players = [];
            for (let i = 0; i < this.playerCount; i++) {
                const nameInput = document.getElementById(`inputPName_${i}`);
                const name = nameInput ? nameInput.value.trim() : `Perusahaan ${i+1}`;
                this.players.push({
                    id: i + 1,
                    name: name || `Perusahaan ${i+1}`,
                    color: this.playerColors[i],
                    capital: 60000,
                    level: 1,
                    inventory: {
                        PALM_OIL_RAW: 35,
                        NICKEL_ORE: 25,
                        SOYBEAN: 20,
                        CRUDE_OIL: 0,
                        IRON_ORE: 0,
                        LITHIUM_RAW: 0,
                        BATTERY_CELLS: 0,
                        PETROCHEMICALS: 0,
                        REFINED_STEEL: 0,
                        MICROCHIPS: 0,
                        PRECISION_MOTORS: 0,
                        ELECTRIC_VEHICLES: 0,
                        SMARTPHONES: 0,
                        MEDICAL_INSTRUMENTS: 0,
                        AEROSPACE_PARTS: 0
                    },
                    factories: [],
                    activeShipments: [],
                    totalTradeVolume: 0,
                    lifetimeProfit: 0,
                    levelProgressProfit: 0,
                    levelProgressVolume: 0,
                    gdpContribution: 0,
                    esgScore: 90
                });
            }

            document.getElementById('multiplayerSetupModal').classList.remove('active');
            this.activePlayerIndex = 0;
            this.updateActiveMapScale();
            this.updateHeaderStats();
            this.renderAllTabs();
            tradeAudio.startBgm();
        });
    }

    getCurrentPlayer() {
        return this.players[this.activePlayerIndex] || this.players[0];
    }

    updateActiveMapScale() {
        const player = this.getCurrentPlayer();
        const lvlDef = TRADE_LEVELS[player.level - 1];
        this.currentMapScale = lvlDef.mapScale || 'GLOBAL';
        const mapData = MULTI_SCALE_MAPS[this.currentMapScale] || MULTI_SCALE_MAPS.GLOBAL;
        this.activeNodes = JSON.parse(JSON.stringify(mapData.nodes));

        const mapTitleEl = document.getElementById('mapScaleTitleDisplay');
        if (mapTitleEl) {
            mapTitleEl.textContent = `📍 ${mapData.title}`;
        }
    }

    initMarketPrices() {
        Object.keys(TRADE_COMMODITIES).forEach(id => {
            const def = TRADE_COMMODITIES[id];
            this.marketPrices[id] = def.basePrice;
            this.priceTrends[id] = 0;
        });
    }

    initEventListeners() {
        // Tab Navigation
        const tabBtns = document.querySelectorAll('.nav-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.dataset.tab;

                document.querySelectorAll('.tab-view-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                const targetPanel = document.getElementById(this.currentTab);
                if (targetPanel) targetPanel.classList.add('active');

                this.renderCurrentTab();
            });
        });

        // End Turn Button
        const btnEndTurn = document.getElementById('btnEndTurn');
        btnEndTurn.addEventListener('click', () => this.endTurn());

        // Hero Button Wizard Trigger
        const btnHeroWizard = document.getElementById('btnStartWizard');
        btnHeroWizard.addEventListener('click', () => this.openDecisionWizard());

        // Audio Controls
        const btnMusic = document.getElementById('btnTradeMusic');
        btnMusic.addEventListener('click', () => {
            const isMuted = tradeAudio.toggleBgmMute();
            btnMusic.textContent = isMuted ? '🔇' : '🎵';
        });

        const btnSound = document.getElementById('btnTradeSound');
        btnSound.addEventListener('click', () => {
            const isMuted = tradeAudio.toggleMute();
            btnSound.textContent = isMuted ? '🔈' : '🔊';
        });

        // Map Click Detection
        this.mapCanvas.addEventListener('click', (e) => {
            const rect = this.mapCanvas.getBoundingClientRect();
            const scaleX = this.mapCanvas.width / rect.width;
            const scaleY = this.mapCanvas.height / rect.height;
            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;

            Object.values(this.activeNodes).forEach(node => {
                const dist = Math.hypot(clickX - node.coords.x, clickY - node.coords.y);
                if (dist <= 30) {
                    this.wizardState.sourceNodeId = node.id;
                    this.openDecisionWizard();
                }
            });
        });

        // Wizard Navigation Buttons
        document.getElementById('btnWizardNext').addEventListener('click', () => this.wizardNextStep());
        document.getElementById('btnWizardPrev').addEventListener('click', () => this.wizardPrevStep());
        document.getElementById('btnWizardCancel').addEventListener('click', () => {
            document.getElementById('decisionWizardModal').classList.remove('active');
        });

        // Close Direct Trade Modal
        const modalClose = document.getElementById('btnTradeModalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                document.getElementById('tradeActionModal').classList.remove('active');
            });
        }
    }

    // --- ROTASI GILIRAN MULTIPEMAIN (TURN-BASED ROUNDS) ---
    endTurn() {
        const prevPlayer = this.getCurrentPlayer();
        this.activePlayerIndex++;

        // Jika semua pemain sudah mengambil giliran -> Maju ke Bulan Baru!
        if (this.activePlayerIndex >= this.playerCount) {
            this.activePlayerIndex = 0;
            this.gameMonth++;
            if (this.gameMonth > 12) {
                this.gameMonth = 1;
                this.gameYear++;
            }
            this.roundNumber++;

            // Jalankan Siklus Bulanan: Pengiriman, Pabrik, & Fluktuasi Pasar
            this.executeMonthlyGlobalTick();
        }

        const curPlayer = this.getCurrentPlayer();
        this.updateActiveMapScale();
        this.updateHeaderStats();
        this.renderAllTabs();

        tradeAudio.playCashRegister();
        this.pushNews(`👑 Giliran beralih ke Pemain ${curPlayer.id}: "${curPlayer.name}".`);
    }

    executeMonthlyGlobalTick() {
        // 1. Advance Active Shipments for All Players
        this.players.forEach(p => {
            for (let i = p.activeShipments.length - 1; i >= 0; i--) {
                const ship = p.activeShipments[i];
                ship.progress += 0.5; // Tiba dalam 2 bulan

                if (ship.progress >= 1.0) {
                    this.completePlayerShipment(p, ship);
                    p.activeShipments.splice(i, 1);
                }
            }

            // 2. Factory Production
            p.factories.forEach(f => {
                const recipe = TRADE_COMMODITIES[f.outputId].recipe;
                let canProduce = true;
                if (recipe) {
                    Object.entries(recipe).forEach(([mat, req]) => {
                        if ((p.inventory[mat] || 0) < req) canProduce = false;
                    });
                }

                if (canProduce) {
                    if (recipe) {
                        Object.entries(recipe).forEach(([mat, req]) => {
                            p.inventory[mat] -= req;
                        });
                    }
                    p.inventory[f.outputId] = (p.inventory[f.outputId] || 0) + (f.rate * 2);
                    p.gdpContribution += (f.rate * TRADE_COMMODITIES[f.outputId].basePrice * 0.2);
                }
            });

            // 3. Cek Syarat Naik Level Pemain
            this.checkPlayerLevelProgress(p);
        });

        // 4. Fluktuasi Harga Pasar Komoditas
        Object.keys(this.marketPrices).forEach(id => {
            const changePct = (Math.random() - 0.48) * 0.10;
            const oldPrice = this.marketPrices[id];
            const newPrice = Math.max(20, Math.round(oldPrice * (1 + changePct)));
            this.marketPrices[id] = newPrice;
            this.priceTrends[id] = newPrice - oldPrice;
        });

        // 5. Peristiwa Geopolitik Acak
        if (Math.random() < 0.4) {
            this.triggerRandomEvent();
        }
    }

    completePlayerShipment(player, ship) {
        const toNode = this.activeNodes[ship.toCountryId] || Object.values(this.activeNodes)[0];
        const comm = TRADE_COMMODITIES[ship.commodityId];

        let sellPrice = this.marketPrices[ship.commodityId];
        if (toNode.deficits && toNode.deficits.includes(ship.commodityId)) {
            sellPrice = Math.round(sellPrice * 1.25);
        }

        const grossIncome = sellPrice * ship.amount;
        const tariff = Math.round(grossIncome * (toNode.tariffRate || 0.04));
        const netIncome = grossIncome - tariff;
        const netProfit = netIncome - ship.cost;

        player.capital += netIncome;
        player.lifetimeProfit += netProfit;
        player.levelProgressProfit += netProfit;
        player.totalTradeVolume += ship.amount;
        player.levelProgressVolume += ship.amount;
        player.gdpContribution += Math.round(grossIncome * 0.15);

        this.pushNews(`🚢 [${player.name}] Kargo ${ship.amount} ${comm.unit} ${comm.name} tiba di ${toNode.name}! Laba Bersih: +$${netProfit.toLocaleString()}`);
    }

    checkPlayerLevelProgress(player) {
        if (player.level >= 17) return;

        const currentLvlDef = TRADE_LEVELS[player.level - 1];
        if (player.levelProgressProfit >= currentLvlDef.targetProfit && player.levelProgressVolume >= currentLvlDef.targetVolume) {
            player.level++;
            player.capital += currentLvlDef.rewardCapital;
            player.levelProgressProfit = 0;
            player.levelProgressVolume = 0;

            if (player.id === this.getCurrentPlayer().id) {
                this.updateActiveMapScale();
                this.showLevelUpModal(player.level);
            }

            tradeAudio.playLevelUp();
            this.pushNews(`🎉 SELAMAT! [${player.name}] naik ke Level ${player.level}: "${TRADE_LEVELS[player.level - 1].title}"!`);
        }
    }

    showLevelUpModal(levelNum) {
        const lvl = TRADE_LEVELS[levelNum - 1];
        const modal = document.getElementById('levelUpModal');
        const titleEl = document.getElementById('levelUpTitle');
        const descEl = document.getElementById('levelUpDesc');
        const impactEl = document.getElementById('levelUpImpact');

        if (modal) {
            titleEl.textContent = `LEVEL ${levelNum}: ${lvl.title.toUpperCase()}`;
            descEl.innerHTML = `
                <strong>Skala Geografi Baru:</strong> ${lvl.mapName}<br>
                <strong>Landasan Teori Ekonomi:</strong> ${lvl.economicPrinciple}<br>
                <p style="margin-top:6px;">${lvl.desc}</p>
            `;
            impactEl.textContent = `🎯 Sasaran Dampak: ${lvl.impactGoal}`;
            modal.classList.add('active');
        }
    }

    // --- WIZARD KEPUTUSAN 4 LANGKAH POP-UP ---
    openDecisionWizard() {
        this.wizardState.step = 1;
        document.getElementById('decisionWizardModal').classList.add('active');
        this.renderWizardStep();
    }

    renderWizardStep() {
        const player = this.getCurrentPlayer();
        const body = document.getElementById('wizardStepBody');
        const title = document.getElementById('wizardStepTitle');
        const btnPrev = document.getElementById('btnWizardPrev');
        const btnNext = document.getElementById('btnWizardNext');

        // Update Step Indicators
        document.querySelectorAll('.w-step').forEach(el => {
            const stepNum = parseInt(el.dataset.step, 10);
            el.className = 'w-step';
            if (stepNum === this.wizardState.step) el.classList.add('active');
            else if (stepNum < this.wizardState.step) el.classList.add('done');
        });

        btnPrev.style.display = this.wizardState.step > 1 ? 'block' : 'none';

        if (this.wizardState.step === 1) {
            // LANGKAH 1: PILIH KOMODITAS & SUMBER PASOKAN (SOURCING)
            title.textContent = 'Langkah 1: Analisis Keunggulan Komparatif & Beli Pasokan';
            btnNext.textContent = 'Lanjut ke Pemilihan Logistik ➡️';

            const allowedComm = TRADE_LEVELS[player.level - 1].unlockedCommodities || Object.keys(TRADE_COMMODITIES);
            
            body.innerHTML = `
                <div style="font-size:0.85rem; color:var(--text-muted);">
                    Pilihlah komoditas yang memiliki harga murah di lokasi produsen untuk memperoleh marjin keuntungan optimal (Teori David Ricardo).
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div>
                        <label style="font-size:0.82rem; font-weight:700;">1. Pilih Komoditas:</label>
                        <select id="wzCommoditySelect" style="width:100%; padding:8px; border-radius:10px; background:#1c2541; color:#fff; border:1px solid var(--border-light); margin-top:4px;">
                            ${allowedComm.map(id => `
                                <option value="${id}" ${id === this.wizardState.commodityId ? 'selected' : ''}>
                                    ${TRADE_COMMODITIES[id].icon} ${TRADE_COMMODITIES[id].name} ($${this.marketPrices[id]}/${TRADE_COMMODITIES[id].unit})
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.82rem; font-weight:700;">2. Lokasi Produsen / Sumber Pasokan:</label>
                        <select id="wzSourceSelect" style="width:100%; padding:8px; border-radius:10px; background:#1c2541; color:#fff; border:1px solid var(--border-light); margin-top:4px;">
                            ${Object.values(this.activeNodes).map(node => `
                                <option value="${node.id}" ${node.id === this.wizardState.sourceNodeId ? 'selected' : ''}>
                                    ${node.flag} ${node.name} ${node.advantages && node.advantages.includes(this.wizardState.commodityId) ? '🔥 (Diskon 30%)' : ''}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                <div>
                    <label style="font-size:0.82rem; font-weight:700;">3. Jumlah Pembelian (Ton / Unit):</label>
                    <input type="number" id="wzAmountInput" value="${this.wizardState.buyAmount}" min="5" max="500" style="width:100%; padding:8px; border-radius:10px; background:#1c2541; color:#fff; border:1px solid var(--border-light); margin-top:4px;">
                </div>
                <div id="wzStep1PricePreview" style="background:rgba(8,13,26,0.8); padding:10px; border-radius:10px; font-size:0.82rem; display:flex; justify-content:space-between;">
                    <span>Modal Perusahaan Anda: <strong style="color:var(--accent-gold);">$${player.capital.toLocaleString()}</strong></span>
                    <span>Estimasi Biaya Beli: <strong id="wzTotalCostPreview" style="color:var(--accent-cyan);">$0</strong></span>
                </div>
            `;

            const updateStep1Cost = () => {
                const cId = document.getElementById('wzCommoditySelect').value;
                const sId = document.getElementById('wzSourceSelect').value;
                const amt = parseInt(document.getElementById('wzAmountInput').value, 10) || 10;
                const sNode = this.activeNodes[sId] || Object.values(this.activeNodes)[0];
                const unitPrice = GLOBAL_TRADE_ECONOMICS.calcComparativePrice(this.marketPrices[cId], sNode, cId);
                const total = unitPrice * amt;
                document.getElementById('wzTotalCostPreview').textContent = `$${total.toLocaleString()}`;
            };

            document.getElementById('wzCommoditySelect').addEventListener('change', (e) => {
                this.wizardState.commodityId = e.target.value;
                this.renderWizardStep();
            });
            document.getElementById('wzSourceSelect').addEventListener('change', (e) => {
                this.wizardState.sourceNodeId = e.target.value;
                updateStep1Cost();
            });
            document.getElementById('wzAmountInput').addEventListener('input', updateStep1Cost);
            updateStep1Cost();

        } else if (this.wizardState.step === 2) {
            // LANGKAH 2: TENTUKAN LOGISTIK & TUJUAN
            title.textContent = 'Langkah 2: Rute Logistik & Skala Pengiriman';
            btnNext.textContent = 'Lanjut ke Alokasi Pasar ➡️';

            const comm = TRADE_COMMODITIES[this.wizardState.commodityId];
            body.innerHTML = `
                <div style="font-size:0.85rem; color:var(--text-muted);">
                    Model Gravitasi & Skala Paul Krugman: Pilih pasar tujuan dengan harga jual terbaik dan pilih moda transportasi yang paling efisien.
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div>
                        <label style="font-size:0.82rem; font-weight:700;">Pasar / Destinasi Tujuan Pembeli:</label>
                        <select id="wzDestSelect" style="width:100%; padding:8px; border-radius:10px; background:#1c2541; color:#fff; border:1px solid var(--border-light); margin-top:4px;">
                            ${Object.values(this.activeNodes).map(node => `
                                <option value="${node.id}" ${node.id === this.wizardState.destNodeId ? 'selected' : ''}>
                                    ${node.flag} ${node.name} ${node.deficits && node.deficits.includes(this.wizardState.commodityId) ? '🔥 (Permintaan Defisit +25%)' : ''}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.82rem; font-weight:700;">Moda Logistik & Kendaraan:</label>
                        <select id="wzVehicleSelect" style="width:100%; padding:8px; border-radius:10px; background:#1c2541; color:#fff; border:1px solid var(--border-light); margin-top:4px;">
                            <option value="truck">🚚 Truk Darat (Cepat, Skala Lokal)</option>
                            <option value="ship">🚢 Kapal Kargo Feeder / Kontainer (Kapasitas Besar)</option>
                            <option value="plane">✈️ Pesawat Kargo Udara (Ekspres Internasional)</option>
                        </select>
                    </div>
                </div>
                <div style="background:rgba(8,13,26,0.8); padding:10px; border-radius:10px; font-size:0.82rem;">
                    <div>Muatan yang Diangkut: <strong>${this.wizardState.buyAmount} ${comm.unit} ${comm.name}</strong></div>
                    <div style="margin-top:4px; color:var(--accent-cyan);">
                        Skala Ekonomis Aktif: Pengiriman dalam jumlah besar memangkas biaya per ton hingga 30%!
                    </div>
                </div>
            `;

        } else if (this.wizardState.step === 3) {
            // LANGKAH 3: ALOKASI PASAR (DOMESTIK DMO VS EKSPOR)
            title.textContent = 'Langkah 3: Alokasi Pasar & Domestic Market Obligation (DMO)';
            btnNext.textContent = 'Lanjut ke Ringkasan Eksekusi ➡️';

            body.innerHTML = `
                <div style="font-size:0.85rem; color:var(--text-muted);">
                    Aturlah proporsi penjualan ke pasar lokal untuk menjaga stabilitas harga dan kepatuhan regulasi pemerintah (DMO).
                </div>
                <div style="margin:10px 0;">
                    <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.88rem;">
                        <span>Alokasi Pasar Domestik / Lokal: <span id="wzDomVal" style="color:var(--accent-cyan);">80%</span></span>
                        <span>Alokasi Ekspor Luar Wilayah: <span id="wzExpVal" style="color:var(--accent-gold);">20%</span></span>
                    </div>
                    <input type="range" id="wzDmoSlider" min="10" max="100" value="${this.wizardState.domesticPct}" style="width:100%; margin-top:8px;">
                </div>
                <div id="wzDmoStatusBox" style="background:rgba(6,214,160,0.15); border:1px solid var(--accent-green); border-radius:10px; padding:10px; font-size:0.82rem; color:var(--accent-green);">
                    ✅ Pasokan pasar domestik aman (&ge;25%). Perusahaan mendapatkan insentif subsidi ekspor 2%.
                </div>
            `;

            const slider = document.getElementById('wzDmoSlider');
            slider.addEventListener('input', (e) => {
                const domVal = parseInt(e.target.value, 10);
                this.wizardState.domesticPct = domVal;
                document.getElementById('wzDomVal').textContent = `${domVal}%`;
                document.getElementById('wzExpVal').textContent = `${100 - domVal}%`;

                const box = document.getElementById('wzDmoStatusBox');
                if (domVal < 25) {
                    box.style.background = 'rgba(255,51,102,0.15)';
                    box.style.borderColor = 'var(--accent-red)';
                    box.style.color = 'var(--accent-red)';
                    box.innerHTML = '⚠️ Peringatan DMO: Pasokan domestik <25%! Inflasi lokal berisiko naik & terkena denda bea keluar.';
                } else {
                    box.style.background = 'rgba(6,214,160,0.15)';
                    box.style.borderColor = 'var(--accent-green)';
                    box.style.color = 'var(--accent-green)';
                    box.innerHTML = '✅ Pasokan pasar domestik aman (&ge;25%). Perusahaan mendapatkan insentif subsidi ekspor 2%.';
                }
            });

        } else if (this.wizardState.step === 4) {
            // LANGKAH 4: RINGKASAN EKSEKUSI & DAMPAK SOSIAL-EKONOMI
            title.textContent = 'Langkah 4: Konfirmasi Eksekusi & Laporan Dampak';
            btnNext.textContent = '🚀 Eksekusi Pengiriman Kargo!';

            const comm = TRADE_COMMODITIES[this.wizardState.commodityId];
            const sNode = this.activeNodes[this.wizardState.sourceNodeId] || Object.values(this.activeNodes)[0];
            const dNode = this.activeNodes[this.wizardState.destNodeId] || Object.values(this.activeNodes)[1] || sNode;

            const unitCost = GLOBAL_TRADE_ECONOMICS.calcComparativePrice(this.marketPrices[this.wizardState.commodityId], sNode, this.wizardState.commodityId);
            const totalBuyCost = unitCost * this.wizardState.buyAmount;
            const transportCost = GLOBAL_TRADE_ECONOMICS.calcGravityTransportCost(sNode, dNode, this.wizardState.buyAmount);

            let sellPrice = this.marketPrices[this.wizardState.commodityId];
            if (dNode.deficits && dNode.deficits.includes(this.wizardState.commodityId)) {
                sellPrice = Math.round(sellPrice * 1.25);
            }
            const grossRevenue = sellPrice * this.wizardState.buyAmount;
            const estimatedProfit = grossRevenue - totalBuyCost - transportCost;

            body.innerHTML = `
                <div style="font-size:0.85rem; color:var(--text-muted);">
                    Tinjau seluruh parameter operasional sebelum armada kargo diberangkatkan:
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div style="background:rgba(8,13,26,0.7); padding:10px; border-radius:10px; font-size:0.82rem;">
                        <div style="font-weight:700; color:var(--accent-cyan); margin-bottom:4px;">📊 Ringkasan Finansial:</div>
                        <div>Biaya Pembelian: <strong>$${totalBuyCost.toLocaleString()}</strong></div>
                        <div>Biaya Transportasi: <strong>$${transportCost.toLocaleString()}</strong></div>
                        <div>Proyeksi Pendapatan: <strong style="color:var(--accent-gold);">$${grossRevenue.toLocaleString()}</strong></div>
                        <div style="margin-top:4px; font-weight:800; color:var(--accent-green); font-size:0.92rem;">
                            Estimasi Laba Bersih: +$${estimatedProfit.toLocaleString()}
                        </div>
                    </div>
                    <div style="background:rgba(8,13,26,0.7); padding:10px; border-radius:10px; font-size:0.82rem;">
                        <div style="font-weight:700; color:var(--accent-green); margin-bottom:4px;">🌱 Dampak Wilayah / Negara:</div>
                        <div>Penciptaan Lapangan Kerja: <strong>+${Math.max(2, Math.round(this.wizardState.buyAmount * 0.4))} Pekerja</strong></div>
                        <div>Sumbangan Devisa/PDB: <strong>+$${Math.round(grossRevenue * 0.18).toLocaleString()}</strong></div>
                        <div>Pajak Kas Negara: <strong>+$${Math.round(grossRevenue * 0.05).toLocaleString()}</strong></div>
                        <div>Peringkat ESG: <strong style="color:var(--accent-cyan);">94/100 (Berkelanjutan)</strong></div>
                    </div>
                </div>
            `;
        }
    }

    wizardNextStep() {
        if (this.wizardState.step === 1) {
            this.wizardState.commodityId = document.getElementById('wzCommoditySelect').value;
            this.wizardState.sourceNodeId = document.getElementById('wzSourceSelect').value;
            this.wizardState.buyAmount = parseInt(document.getElementById('wzAmountInput').value, 10) || 10;
            this.wizardState.step = 2;
            this.renderWizardStep();
        } else if (this.wizardState.step === 2) {
            this.wizardState.destNodeId = document.getElementById('wzDestSelect').value;
            this.wizardState.vehicleType = document.getElementById('wzVehicleSelect').value;
            this.wizardState.step = 3;
            this.renderWizardStep();
        } else if (this.wizardState.step === 3) {
            this.wizardState.step = 4;
            this.renderWizardStep();
        } else if (this.wizardState.step === 4) {
            // EKSEKUSI PENGIRIMAN
            this.executeWizardShipment();
            document.getElementById('decisionWizardModal').classList.remove('active');
        }
    }

    wizardPrevStep() {
        if (this.wizardState.step > 1) {
            this.wizardState.step--;
            this.renderWizardStep();
        }
    }

    executeWizardShipment() {
        const player = this.getCurrentPlayer();
        const sNode = this.activeNodes[this.wizardState.sourceNodeId] || Object.values(this.activeNodes)[0];
        const dNode = this.activeNodes[this.wizardState.destNodeId] || Object.values(this.activeNodes)[1] || sNode;
        const comm = TRADE_COMMODITIES[this.wizardState.commodityId];

        const unitCost = GLOBAL_TRADE_ECONOMICS.calcComparativePrice(this.marketPrices[this.wizardState.commodityId], sNode, this.wizardState.commodityId);
        const totalBuyCost = unitCost * this.wizardState.buyAmount;
        const transportCost = GLOBAL_TRADE_ECONOMICS.calcGravityTransportCost(sNode, dNode, this.wizardState.buyAmount);
        const totalRequired = totalBuyCost + transportCost;

        if (player.capital < totalRequired) {
            alert(`Modal Anda tidak mencukupi ($${player.capital.toLocaleString()} < $${totalRequired.toLocaleString()})!`);
            return;
        }

        player.capital -= totalRequired;

        const dist = Math.hypot(dNode.coords.x - sNode.coords.x, dNode.coords.y - sNode.coords.y);
        const speed = Math.max(0.005, 0.015 - (dist * 0.00001));

        player.activeShipments.push({
            id: 'SHIP-' + Date.now(),
            fromCountryId: sNode.id,
            toCountryId: dNode.id,
            commodityId: this.wizardState.commodityId,
            amount: this.wizardState.buyAmount,
            progress: 0,
            speed: speed,
            cost: transportCost + totalBuyCost,
            vehicleType: this.wizardState.vehicleType
        });

        tradeAudio.playShipHorn();
        this.pushNews(`🚀 [${player.name}] Memberangkatkan kargo ${this.wizardState.buyAmount} ${comm.unit} ${comm.name} dari ${sNode.name} menuju ${dNode.name}.`);
        this.updateHeaderStats();
        this.renderAllTabs();
    }

    triggerRandomEvent() {
        const events = [
            { text: '⚡ Permintaan Sel Baterai EV & Nikel Melonjak +30% di Pasar Global!', comm: 'BATTERY_CELLS', mult: 1.3 },
            { text: '🌾 Musim Panen Raya Kedelai! Pasokan melimpah, harga pangan stabil.', comm: 'SOYBEAN', mult: 0.8 },
            { text: '💾 Krisis Pasokan Semikonduktor! Harga Mikrochip naik +25%.', comm: 'MICROCHIPS', mult: 1.25 },
            { text: '🛢️ Kesepakatan Kuota Minyak Mentah! Harga bahan bakar stabil.', comm: 'CRUDE_OIL', mult: 1.1 }
        ];

        const ev = events[Math.floor(Math.random() * events.length)];
        if (ev.comm && this.marketPrices[ev.comm]) {
            this.marketPrices[ev.comm] = Math.round(this.marketPrices[ev.comm] * ev.mult);
        }
        tradeAudio.playMarketAlert();
        this.pushNews(`📢 PERISTIWA DUNIA: ${ev.text}`);
    }

    pushNews(text) {
        this.newsFeed.unshift(text);
        if (this.newsFeed.length > 8) this.newsFeed.pop();
        const tickerEl = document.getElementById('newsTickerText');
        if (tickerEl) tickerEl.textContent = this.newsFeed.join('   ✦   ');
    }

    updateHeaderStats() {
        const player = this.getCurrentPlayer();
        const capitalEl = document.getElementById('headerCapitalVal');
        const levelBadge = document.getElementById('headerLevelVal');
        const dateEl = document.getElementById('headerDateVal');
        const pBadge = document.getElementById('playerTurnBadge');
        const pName = document.getElementById('playerTurnName');
        const pRound = document.getElementById('playerTurnRound');

        if (capitalEl) capitalEl.textContent = `$${player.capital.toLocaleString()}`;
        if (levelBadge) levelBadge.textContent = `Lvl ${player.level}: ${TRADE_LEVELS[player.level - 1].title}`;
        if (dateEl) dateEl.textContent = `Thn ${this.gameYear}, Bln ${this.gameMonth}`;

        if (pBadge) {
            pBadge.textContent = `P${player.id}`;
            pBadge.style.background = player.color;
        }
        if (pName) pName.textContent = player.name;
        if (pRound) pRound.textContent = `Giliran Ronde ${this.roundNumber} (Pemain ${this.activePlayerIndex + 1} dari ${this.playerCount})`;
    }

    renderCurrentTab() {
        if (this.currentTab === 'tabDashboard') this.renderUpfrontDashboard();
        if (this.currentTab === 'tabMarket') this.renderCommodityMarket();
        if (this.currentTab === 'tabFactories') this.renderFactories();
        if (this.currentTab === 'tabImpact') this.renderCountryImpactDashboard();
        if (this.currentTab === 'tabLeaderboard') this.renderLeaderboard();
        if (this.currentTab === 'tabRoadmap') this.renderLevelRoadmap();
    }

    renderAllTabs() {
        this.renderUpfrontDashboard();
        this.renderCommodityMarket();
        this.renderFactories();
        this.renderCountryImpactDashboard();
        this.renderLeaderboard();
        this.renderLevelRoadmap();
        this.renderEconomicsPrinciplesCard();
    }

    // --- TAB 1: UPFRONT DASHBOARD RENDERING ---
    renderUpfrontDashboard() {
        const player = this.getCurrentPlayer();

        // 1. Render Gudang Komoditas
        const wContainer = document.getElementById('upfrontWarehouseList');
        const totalItemsEl = document.getElementById('warehouseTotalItems');
        if (wContainer) {
            wContainer.innerHTML = '';
            let heldCount = 0;

            Object.keys(player.inventory).forEach(id => {
                const qty = player.inventory[id];
                if (qty > 0) {
                    heldCount++;
                    const comm = TRADE_COMMODITIES[id];
                    const estValue = qty * (this.marketPrices[id] || comm.basePrice);
                    const row = document.createElement('div');
                    row.className = 'warehouse-item-row';
                    row.innerHTML = `
                        <div class="w-item-info">
                            <span class="w-item-icon">${comm.icon}</span>
                            <div>
                                <div class="w-item-name">${comm.name}</div>
                                <div class="w-item-stock">${qty} ${comm.unit} (Nilai: $${estValue.toLocaleString()})</div>
                            </div>
                        </div>
                        <button class="btn-trade-action" style="padding:4px 10px; font-size:0.75rem;" onclick="window.tradeEngine.openWizardForCommodity('${id}')">Jual / Kirim</button>
                    `;
                    wContainer.appendChild(row);
                }
            });

            if (heldCount === 0) {
                wContainer.innerHTML = `
                    <div style="text-align:center; color:var(--text-muted); padding:15px; font-size:0.82rem;">
                        Gudang Anda saat ini kosong.<br>Klik tombol <strong>Wizard Keputusan</strong> di atas untuk membeli pasokan awal!
                    </div>
                `;
            }
            if (totalItemsEl) totalItemsEl.textContent = `${heldCount} Jenis Barang`;
        }

        // 2. Render Peluang Dagang Terpanas
        const oppContainer = document.getElementById('upfrontOpportunitiesList');
        if (oppContainer) {
            oppContainer.innerHTML = '';
            const opportunities = [
                {
                    commId: 'PALM_OIL_RAW',
                    from: 'Sentra Tani Timur',
                    to: 'Pasar Induk Kota',
                    buyPrice: Math.round(this.marketPrices['PALM_OIL_RAW'] * 0.7),
                    sellPrice: this.marketPrices['PALM_OIL_RAW'],
                    margin: '+43%'
                },
                {
                    commId: 'NICKEL_ORE',
                    from: 'Dermaga Pesisir Utara',
                    to: 'Kawasan Industri Selatan',
                    buyPrice: Math.round(this.marketPrices['NICKEL_ORE'] * 0.7),
                    sellPrice: Math.round(this.marketPrices['NICKEL_ORE'] * 1.25),
                    margin: '+78%'
                },
                {
                    commId: 'SOYBEAN',
                    from: 'Sentra Tani Timur',
                    to: 'Pasar Induk Kota',
                    buyPrice: Math.round(this.marketPrices['SOYBEAN'] * 0.7),
                    sellPrice: this.marketPrices['SOYBEAN'],
                    margin: '+42%'
                }
            ];

            opportunities.forEach(opp => {
                const comm = TRADE_COMMODITIES[opp.commId];
                const card = document.createElement('div');
                card.className = 'opportunity-card';
                card.innerHTML = `
                    <div class="opp-route">
                        <span>${comm.icon} ${comm.name}</span>
                        <span class="opp-margin-badge">Marjin ${opp.margin}</span>
                    </div>
                    <div style="font-size:0.78rem; color:var(--text-muted);">
                        Beli di ${opp.from} ($${opp.buyPrice}) ➔ Jual di ${opp.to} ($${opp.sellPrice})
                    </div>
                `;
                oppContainer.appendChild(card);
            });
        }

        // 3. Render Target Level & Teori Ekonomi
        const targetBox = document.getElementById('upfrontLevelTargetBox');
        const econBox = document.getElementById('upfrontEconomicsBox');
        const lvlTag = document.getElementById('upfrontLevelTag');
        const lvlDef = TRADE_LEVELS[player.level - 1];

        if (lvlTag) lvlTag.textContent = `Level ${player.level}`;
        if (targetBox) {
            const profitPct = Math.min(100, Math.round((player.levelProgressProfit / lvlDef.targetProfit) * 100));
            const volPct = Math.min(100, Math.round((player.levelProgressVolume / lvlDef.targetVolume) * 100));

            targetBox.innerHTML = `
                <div style="font-weight:700; color:#ffffff;">${lvlDef.title}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${lvlDef.desc}</div>
                <div style="margin-top:4px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                        <span>Target Laba: $${player.levelProgressProfit.toLocaleString()} / $${lvlDef.targetProfit.toLocaleString()}</span>
                        <span>${profitPct}%</span>
                    </div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${profitPct}%;"></div></div>
                </div>
                <div style="margin-top:4px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                        <span>Target Volume: ${player.levelProgressVolume.toLocaleString()} / ${lvlDef.targetVolume.toLocaleString()} Ton</span>
                        <span>${volPct}%</span>
                    </div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${volPct}%;"></div></div>
                </div>
            `;
        }

        if (econBox) {
            econBox.innerHTML = `
                <strong style="color:var(--accent-gold);">${lvlDef.economicPrinciple}</strong><br>
                ${lvlDef.economicDesc}
            `;
        }
    }

    openWizardForCommodity(commId) {
        this.wizardState.commodityId = commId;
        this.wizardState.step = 2; // Langsung ke langkah logistik
        document.getElementById('decisionWizardModal').classList.add('active');
        this.renderWizardStep();
    }

    // --- TAB 6: MULTIPLAYER LEADERBOARD TABLE ---
    renderLeaderboard() {
        const tbody = document.getElementById('leaderboardTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';
        // Sort players by Net Worth
        const sorted = [...this.players].sort((a, b) => (b.capital + b.lifetimeProfit) - (a.capital + a.lifetimeProfit));

        sorted.forEach((p, idx) => {
            const netWorth = p.capital + p.lifetimeProfit;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight:800; color:${idx === 0 ? 'var(--accent-gold)' : (idx === 1 ? '#e0e1dd' : (idx === 2 ? '#cd7f32' : 'var(--text-muted)'))}">
                    ${idx === 0 ? '🥇 1' : (idx === 1 ? '🥈 2' : (idx === 2 ? '🥉 3' : `#${idx + 1}`))}
                </td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="width:12px; height:12px; border-radius:50%; background:${p.color}; display:inline-block;"></span>
                        <strong style="color:#ffffff;">${p.name}</strong>
                    </div>
                </td>
                <td><span class="badge-pill">Lvl ${p.level}</span></td>
                <td style="font-family:'Chakra Petch'; font-weight:700; color:var(--accent-gold);">$${netWorth.toLocaleString()}</td>
                <td style="font-family:'Chakra Petch';">${p.totalTradeVolume.toLocaleString()} Ton</td>
                <td style="font-family:'Chakra Petch'; color:var(--accent-green);">+$${p.gdpContribution.toLocaleString()}</td>
                <td><span style="color:var(--accent-cyan); font-weight:700;">${p.esgScore}/100</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    renderEconomicsPrinciplesCard() {
        const container = document.getElementById('economicsPrincipleDisplay');
        if (!container) return;

        const player = this.getCurrentPlayer();
        const lvl = TRADE_LEVELS[player.level - 1];
        container.innerHTML = `
            <div style="font-size:0.85rem; font-weight:700; color:var(--accent-gold); margin-bottom:3px;">
                📚 ${lvl.economicPrinciple}
            </div>
            <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">
                ${lvl.economicDesc}
            </p>
        `;
    }

    renderCommodityMarket() {
        const grid = document.getElementById('commoditiesMarketGrid');
        if (!grid) return;

        grid.innerHTML = '';
        const player = this.getCurrentPlayer();
        const allowedComm = TRADE_LEVELS[player.level - 1].unlockedCommodities || Object.keys(TRADE_COMMODITIES);

        Object.keys(TRADE_COMMODITIES).forEach(id => {
            const def = TRADE_COMMODITIES[id];
            const isUnlocked = allowedComm.includes(id);
            const price = this.marketPrices[id] || def.basePrice;
            const trend = this.priceTrends[id] || 0;
            const stock = player.inventory[id] || 0;

            const card = document.createElement('div');
            card.className = `commodity-card ${isUnlocked ? '' : 'locked'}`;
            card.innerHTML = `
                <div class="comm-header">
                    <div class="comm-title-box">
                        <span class="comm-icon">${def.icon}</span>
                        <div>
                            <div class="comm-name">${def.name}</div>
                            <span class="comm-cat-badge cat-${def.category}">${def.category.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
                <div class="comm-price-row">
                    <div>
                        <div class="metric-label">Harga Pasar</div>
                        <div class="comm-price-val">$${price.toLocaleString()} / ${def.unit}</div>
                    </div>
                    <div class="comm-change-pill ${trend >= 0 ? 'up' : 'down'}">
                        ${trend >= 0 ? '▲' : '▼'} $${Math.abs(trend)}
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted); display:flex; justify-content:space-between;">
                    <span>Gudang Anda:</span>
                    <strong style="color:var(--accent-cyan);">${stock} ${def.unit}</strong>
                </div>
                <div class="comm-actions-row">
                    <button class="btn-trade-action" onclick="window.tradeEngine.openWizardForCommodity('${id}')">Buka Wizard</button>
                    <button class="btn-trade-action sell-btn" onclick="window.tradeEngine.openWizardForCommodity('${id}')" ${stock > 0 ? '' : 'disabled'}>Kirim / Jual</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    renderFactories() {
        const grid = document.getElementById('factoriesListGrid');
        if (!grid) return;

        grid.innerHTML = '';
        const player = this.getCurrentPlayer();
        if (player.factories.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align:center; padding: 30px; color: var(--text-muted);">
                    Belum ada fasilitas pabrik atau smelter yang dibangun oleh [${player.name}].<br>
                    <button class="btn-produce" style="margin-top:12px;" onclick="window.tradeEngine.openBuildFactoryDialog()">+ Bangun Fasilitas Pabrik Hilirisasi Pertama ($150,000)</button>
                </div>
            `;
            return;
        }

        player.factories.forEach(f => {
            const comm = TRADE_COMMODITIES[f.outputId];
            const node = this.activeNodes[f.countryId] || Object.values(this.activeNodes)[0];
            const card = document.createElement('div');
            card.className = 'factory-card';
            card.innerHTML = `
                <div class="factory-header">
                    <span class="factory-name">${f.name}</span>
                    <span style="font-size: 0.8rem; color:var(--accent-gold);">${node.flag} ${node.name}</span>
                </div>
                <div class="recipe-box">
                    <span style="font-weight:700;">Output Produksi Bulanan:</span>
                    <span style="color:var(--accent-green);">+${f.rate * 2} ${comm.unit} ${comm.name} / bulan</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">
                    Status: <span style="color:var(--accent-cyan); font-weight:700;">Beroperasi Aktif</span>
                </div>
            `;
            grid.appendChild(card);
        });

        const addCard = document.createElement('div');
        addCard.className = 'factory-card';
        addCard.style.display = 'flex';
        addCard.style.justifyContent = 'center';
        addCard.style.alignItems = 'center';
        addCard.innerHTML = `<button class="btn-produce" onclick="window.tradeEngine.openBuildFactoryDialog()">+ Bangun Pabrik Baru ($150,000)</button>`;
        grid.appendChild(addCard);
    }

    renderCountryImpactDashboard() {
        const grid = document.getElementById('countriesImpactGrid');
        if (!grid) return;

        grid.innerHTML = '';
        Object.values(this.activeNodes).forEach(node => {
            const card = document.createElement('div');
            card.className = 'country-impact-card';
            card.innerHTML = `
                <div class="country-card-header">
                    <div class="c-flag-title">
                        <span>${node.flag}</span>
                        <span>${node.name}</span>
                    </div>
                    <span style="font-size: 0.75rem; color:var(--text-muted);">${node.hubPort}</span>
                </div>
                <div class="c-stat-row">
                    <span class="c-stat-label">Sumbangan PDB:</span>
                    <span class="c-stat-val" style="color:var(--accent-green);">+$${(node.impact?.gdpContribution || 0).toLocaleString()}</span>
                </div>
                <div class="c-stat-row">
                    <span class="c-stat-label">Lapangan Kerja:</span>
                    <span class="c-stat-val" style="color:var(--accent-cyan);">+${(node.impact?.jobsCreated || 0).toLocaleString()} Pekerja</span>
                </div>
                <div class="c-stat-row">
                    <span class="c-stat-label">Neraca Dagang:</span>
                    <span class="c-stat-val" style="color:${(node.impact?.tradeSurplus || 0) >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'}">
                        ${(node.impact?.tradeSurplus || 0) >= 0 ? '+' : ''}$${(node.impact?.tradeSurplus || 0).toLocaleString()}
                    </span>
                </div>
                <div class="c-stat-row">
                    <span class="c-stat-label">Setoran Pajak & Devisa:</span>
                    <span class="c-stat-val" style="color:var(--accent-gold);">$${(node.impact?.taxPaid || 0).toLocaleString()}</span>
                </div>
                <div style="margin-top:4px;">
                    <div class="c-stat-row">
                        <span class="c-stat-label">Indeks Keberlanjutan (ESG):</span>
                        <span class="c-stat-val">${node.impact?.esgScore || 85}/100</span>
                    </div>
                    <div class="esg-meter-bar">
                        <div class="esg-meter-fill" style="width: ${node.impact?.esgScore || 85}%;"></div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    renderLevelRoadmap() {
        const container = document.getElementById('levelRoadmapContainer');
        if (!container) return;

        container.innerHTML = '';
        const player = this.getCurrentPlayer();

        TRADE_LEVELS.forEach(lvl => {
            const isCompleted = lvl.level < player.level;
            const isCurrent = lvl.level === player.level;
            const isLocked = lvl.level > player.level;

            const item = document.createElement('div');
            item.className = `level-roadmap-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`;
            item.innerHTML = `
                <div class="level-num-circle">${lvl.level}</div>
                <div class="level-info-content">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="level-item-title">${lvl.badge} ${lvl.title}</span>
                        <span style="font-size:0.75rem; color:var(--accent-cyan); font-weight:700;">${lvl.mapName}</span>
                    </div>
                    <div class="level-item-desc">${lvl.desc}</div>
                    <div style="font-size:0.78rem; color:var(--accent-gold); margin-top:2px;">
                        <strong>Landasan Ekonomi:</strong> ${lvl.economicPrinciple}
                    </div>
                    <div class="level-targets-row">
                        <span>🎯 Target Laba: $${lvl.targetProfit.toLocaleString()}</span>
                        <span>📦 Target Volume: ${lvl.targetVolume.toLocaleString()} Ton</span>
                        <span>🌱 Sasaran Dampak: ${lvl.impactGoal}</span>
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    openBuildFactoryDialog() {
        const modal = document.getElementById('tradeActionModal');
        const modalTitle = document.getElementById('tradeModalTitle');
        const modalBody = document.getElementById('tradeModalBody');

        modalTitle.textContent = 'Bangun Fasilitas Hilirisasi ($150,000)';
        modalBody.innerHTML = `
            <div style="text-align:left; display:flex; flex-direction:column; gap:10px;">
                <label style="font-size:0.85rem; font-weight:700;">Pilih Lokasi Fasilitas:</label>
                <select id="selectFactoryCountry" style="padding:8px; border-radius:10px; background:#1c2541; color:#fff; border:1px solid var(--border-light);">
                    ${Object.values(this.activeNodes).map(node => `<option value="${node.id}">${node.flag} ${node.name}</option>`).join('')}
                </select>
                <label style="font-size:0.85rem; font-weight:700;">Produk Hilirisasi yang Dihasilkan:</label>
                <select id="selectFactoryOutput" style="padding:8px; border-radius:10px; background:#1c2541; color:#fff; border:1px solid var(--border-light);">
                    <option value="BATTERY_CELLS">🔋 Sel Baterai EV (Olah Nikel + Lithium)</option>
                    <option value="PETROCHEMICALS">🧪 Petrokimia (Olah Minyak Mentah)</option>
                    <option value="REFINED_STEEL">🏗️ Baja Berkualitas Tinggi (Olah Bijih Besi)</option>
                    <option value="ELECTRIC_VEHICLES">🚗 Mobil Listrik EV (Olah Baterai + Baja + Mesin)</option>
                </select>
                <button class="btn-produce" style="margin-top:10px;" onclick="window.tradeEngine.executeBuildFactory()">Konfirmasi Konstruksi Pabrik</button>
            </div>
        `;
        modal.classList.add('active');
    }

    executeBuildFactory() {
        const nodeId = document.getElementById('selectFactoryCountry').value;
        const outputId = document.getElementById('selectFactoryOutput').value;
        const player = this.getCurrentPlayer();
        const buildCost = 150000;

        if (player.capital < buildCost) {
            alert(`Biaya konstruksi pabrik adalah $${buildCost.toLocaleString()}! Modal Anda kurang.`);
            return;
        }

        player.capital -= buildCost;
        const comm = TRADE_COMMODITIES[outputId];
        const node = this.activeNodes[nodeId];

        player.factories.push({
            id: 'FAC-' + Date.now(),
            name: `Pabrik ${comm.name} (${node.name})`,
            outputId: outputId,
            countryId: nodeId,
            rate: 2
        });

        tradeAudio.playLevelUp();
        this.pushNews(`🏭 [${player.name}] Membangun Pabrik Hilirisasi ${comm.name} di ${node.name}!`);
        this.updateHeaderStats();
        this.renderFactories();
        document.getElementById('tradeActionModal').classList.remove('active');
    }

    // --- CANVAS MAP RENDERING ---
    drawMap() {
        const ctx = this.mapCtx;
        const W = this.mapCanvas.width;
        const H = this.mapCanvas.height;

        ctx.clearRect(0, 0, W, H);

        if (this.currentMapScale === 'CITY') {
            ctx.fillStyle = '#0a1128';
            ctx.fillRect(0, 0, W, H);

            ctx.strokeStyle = 'rgba(58, 134, 255, 0.15)';
            ctx.lineWidth = 1.5;
            for (let x = 80; x < W; x += 100) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = 60; y < H; y += 80) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }
            ctx.strokeStyle = '#0077b6';
            ctx.lineWidth = 24;
            ctx.beginPath();
            ctx.moveTo(0, 80);
            ctx.bezierCurveTo(400, 140, 600, 60, W, 120);
            ctx.stroke();

        } else if (this.currentMapScale === 'INTERCITY') {
            ctx.fillStyle = '#051923';
            ctx.fillRect(0, 0, W, H);

            ctx.fillStyle = '#003554';
            ctx.beginPath();
            ctx.moveTo(100, 300);
            ctx.quadraticCurveTo(500, 220, 900, 300);
            ctx.lineTo(880, 420);
            ctx.quadraticCurveTo(500, 440, 120, 400);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = '#ffd166';
            ctx.lineWidth = 4;
            ctx.setLineDash([8, 4]);
            ctx.beginPath();
            ctx.moveTo(220, 260); ctx.lineTo(290, 350); ctx.lineTo(520, 270); ctx.lineTo(780, 280);
            ctx.stroke();
            ctx.setLineDash([]);

        } else if (this.currentMapScale === 'NATIONAL') {
            ctx.fillStyle = '#03071e';
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = '#1b4332';
            ctx.beginPath(); ctx.ellipse(190, 220, 60, 130, -0.4, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(380, 360, 130, 30, 0.1, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(420, 200, 90, 70, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(640, 260, 40, 80, 0.2, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(860, 260, 90, 60, -0.1, 0, Math.PI * 2); ctx.fill();

        } else if (this.currentMapScale === 'REGIONAL_ASEAN') {
            ctx.fillStyle = '#03045e';
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = '#2d6a4f';
            ctx.beginPath(); ctx.ellipse(450, 120, 130, 60, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(410, 240, 35, 70, -0.3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(490, 380, 150, 40, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(710, 160, 40, 80, 0.2, 0, Math.PI * 2); ctx.fill();

        } else {
            ctx.fillStyle = '#050b18';
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(58, 134, 255, 0.08)';
            ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 60) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = 0; y < H; y += 60) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }
        }

        // Active Shipments from all players
        this.players.forEach(p => {
            p.activeShipments.forEach(ship => {
                const fromNode = this.activeNodes[ship.fromCountryId];
                const toNode = this.activeNodes[ship.toCountryId];
                if (!fromNode || !toNode) return;

                const midX = (fromNode.coords.x + toNode.coords.x) / 2;
                const midY = (fromNode.coords.y + toNode.coords.y) / 2 - 35;

                ctx.strokeStyle = p.color;
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(fromNode.coords.x, fromNode.coords.y);
                ctx.quadraticCurveTo(midX, midY, toNode.coords.x, toNode.coords.y);
                ctx.stroke();
                ctx.setLineDash([]);

                const t = ship.progress;
                const curX = (1 - t) * (1 - t) * fromNode.coords.x + 2 * (1 - t) * t * midX + t * t * toNode.coords.x;
                const curY = (1 - t) * (1 - t) * fromNode.coords.y + 2 * (1 - t) * t * midY + t * t * toNode.coords.y;

                ctx.save();
                ctx.translate(curX, curY);
                ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();
                ctx.font = '13px sans-serif';
                ctx.textAlign = 'center';
                const icon = ship.vehicleType === 'truck' ? '🚚' : (ship.vehicleType === 'plane' ? '✈️' : '🚢');
                ctx.fillText(icon, 0, -8);
                ctx.restore();
            });
        });

        // Nodes
        Object.values(this.activeNodes).forEach(node => {
            ctx.save();
            ctx.translate(node.coords.x, node.coords.y);

            const pulse = (Math.sin(Date.now() * 0.003 + node.coords.x) + 1) * 3 + 10;
            ctx.fillStyle = 'rgba(0, 245, 212, 0.22)';
            ctx.beginPath(); ctx.arc(0, 0, pulse, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#3a86ff';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

            ctx.font = 'bold 12px "Plus Jakarta Sans"';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${node.flag} ${node.name}`, 0, 22);

            ctx.restore();
        });
    }

    animate() {
        this.drawMap();
        requestAnimationFrame(this.animate);
    }
}

// Inisialisasi saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
    window.tradeEngine = new GlobalTradeEngine();
});
