/**
 * ==============================================================================
 * MACROMASTER DEN - MESIN SIMULASI EKONOMI MAKRO (ENGINE)
 * Model Matematika Kuantitatif: AD-AS, Transmisi Moneter, Efek Pengali Fiskal,
 * Kurva Phillips, Hukum Okun, Trilema Mundell-Fleming, & Canvas Visualizer.
 * ==============================================================================
 */

class MacroEngine {
    constructor() {
        // State awal standar (Mode Bebas / Sandbox)
        this.resetToDefaultState();

        // Canvas visualizers
        this.adasCanvas = null;
        this.adasCtx = null;
        this.phillipsCanvas = null;
        this.phillipsCtx = null;

        // Historical time series data for analytics
        this.history = [];

        // Active scenario
        this.activeScenario = null;

        // Academy Learning Progression State
        this.loadAcademyProgress();

        // Player Profile & Gamification State (XP, Level, Streak, Avatar)
        this.loadPlayerProfile();
    }

    loadPlayerProfile() {
        try {
            const saved = (typeof localStorage !== 'undefined') ? localStorage.getItem('macromaster_player_profile') : null;
            if (saved) {
                this.playerProfile = JSON.parse(saved);
            } else {
                this.resetPlayerProfile();
            }
        } catch (e) {
            this.resetPlayerProfile();
        }
    }

    resetPlayerProfile() {
        this.playerProfile = {
            avatar: "🧑‍💼",
            level: 1,
            xp: 0,
            title: "Calon Teknokrat",
            streak: 0,
            coins: 100,
            highestStreak: 0,
            starsEarned: 0
        };
        this.savePlayerProfile();
    }

    savePlayerProfile() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('macromaster_player_profile', JSON.stringify(this.playerProfile));
            }
        } catch (e) {
            // storage error ignored
        }
    }

    cycleAvatar() {
        const avatars = ["🧑‍💼", "👩‍💼", "🦸", "🧙‍♂️", "👑"];
        const currentIdx = avatars.indexOf(this.playerProfile.avatar);
        const nextIdx = (currentIdx + 1) % avatars.length;
        this.playerProfile.avatar = avatars[nextIdx];
        this.savePlayerProfile();
        return this.playerProfile.avatar;
    }

    calculateLevel(xp) {
        if (xp >= 1500) return 5;
        if (xp >= 800) return 4;
        if (xp >= 400) return 3;
        if (xp >= 150) return 2;
        return 1;
    }

    getTitleForLevel(level) {
        const titles = {
            1: "Calon Teknokrat",
            2: "Analis Kebijakan Makro",
            3: "Anggota Ahli DEN",
            4: "Deputi Gubernur Bank Sentral",
            5: "Menteri Koordinator Perekonomian"
        };
        return titles[level] || "Teknokrat Legendaris";
    }

    getNextLevelThreshold(level) {
        const thresholds = { 1: 150, 2: 400, 3: 800, 4: 1500, 5: 3000 };
        return thresholds[level] || 3000;
    }

    getPrevLevelThreshold(level) {
        const thresholds = { 1: 0, 2: 150, 3: 400, 4: 800, 5: 1500 };
        return thresholds[level] || 0;
    }

    addXP(amount) {
        const prevLevel = this.playerProfile.level;
        this.playerProfile.xp += amount;
        const newLevel = this.calculateLevel(this.playerProfile.xp);
        let leveledUp = false;
        if (newLevel > prevLevel) {
            this.playerProfile.level = newLevel;
            this.playerProfile.title = this.getTitleForLevel(newLevel);
            leveledUp = true;
        }
        this.savePlayerProfile();
        return {
            xp: this.playerProfile.xp,
            level: this.playerProfile.level,
            title: this.playerProfile.title,
            leveledUp,
            added: amount
        };
    }

    addCoins(amount) {
        this.playerProfile.coins = (this.playerProfile.coins || 0) + amount;
        this.savePlayerProfile();
        return this.playerProfile.coins;
    }

    incrementStreak() {
        this.playerProfile.streak = (this.playerProfile.streak || 0) + 1;
        if (this.playerProfile.streak > (this.playerProfile.highestStreak || 0)) {
            this.playerProfile.highestStreak = this.playerProfile.streak;
        }
        this.savePlayerProfile();
        return this.playerProfile.streak;
    }

    resetStreak() {
        this.playerProfile.streak = 0;
        this.savePlayerProfile();
        return 0;
    }

    loadAcademyProgress() {
        try {
            const saved = (typeof localStorage !== 'undefined') ? localStorage.getItem('macromaster_academy_progress') : null;
            if (saved) {
                this.academyState = JSON.parse(saved);
            } else {
                this.resetAcademyProgress();
            }
        } catch (e) {
            this.resetAcademyProgress();
        }
    }

    resetAcademyProgress() {
        this.academyState = {
            activeModuleId: 1,
            unlockedModuleIds: [1],
            completedModuleIds: [],
            isCapstoneUnlocked: false
        };
        this.saveAcademyProgress();
    }

    saveAcademyProgress() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('macromaster_academy_progress', JSON.stringify(this.academyState));
            }
        } catch (e) {
            // storage error ignored
        }
    }

    completeModule(moduleId) {
        if (!this.academyState.completedModuleIds.includes(moduleId)) {
            this.academyState.completedModuleIds.push(moduleId);
        }
        const nextId = moduleId + 1;
        if (nextId <= 5) {
            if (!this.academyState.unlockedModuleIds.includes(nextId)) {
                this.academyState.unlockedModuleIds.push(nextId);
            }
            this.academyState.activeModuleId = nextId;
        } else {
            this.academyState.isCapstoneUnlocked = true;
        }
        this.saveAcademyProgress();
    }

    unlockAllModules() {
        this.academyState = {
            activeModuleId: 5,
            unlockedModuleIds: [1, 2, 3, 4, 5],
            completedModuleIds: [1, 2, 3, 4, 5],
            isCapstoneUnlocked: true
        };
        this.saveAcademyProgress();
    }

    resetToDefaultState() {
        this.state = {
            quarter: 1,
            year: 1,
            maxQuarters: 12, // 3 Tahun masa jabatan default

            // PDB & Pertumbuhan
            gdpNominal: 21500,       // Triliun Rupiah
            gdpGrowth: 5.05,         // % YoY
            potentialGrowth: 5.20,   // % Potensial Output Y*
            outputGap: -0.15,        // % Output Gap

            // Inflasi & Pengangguran
            inflation: 2.80,         // % IHK YoY
            coreInflation: 2.30,     // % Inti
            unemployment: 5.40,      // % Tingkat Pengangguran
            nairu: 5.00,             // Natural Rate of Unemployment

            // Kebijakan Moneter (Bank Sentral)
            biRate: 6.00,            // % Suku Bunga Acuan
            gwmRate: 9.00,           // % Giro Wajib Minimum
            fxIntervention: 0,       // Miliar USD (intervensi / akumulasi kuartal ini)
            fedRate: 5.25,           // % US Fed Fund Rate (Benchmark Luar Negeri)
            riskPremium: 1.80,       // % Premi Risiko Negara

            // Kebijakan Fiskal (APBN / Kemenkeu)
            taxRate: 11.00,          // % Rasio Pajak Efektif
            govSpending: 3300,       // Triliun Rupiah/tahun (Belanja Pemerintah G)
            energySubsidy: 330,      // Triliun Rupiah/tahun (Subsidi Energi BBM & Listrik)
            spendingPriority: 'balanced', // 'infrastructure', 'social', 'balanced'

            // Neraca APBN & Utang
            taxRevenue: 2365,        // Triliun Rupiah
            totalExpenditure: 3850,  // Triliun Rupiah (termasuk bunga utang)
            fiscalBalance: -515,     // Defisit Triliun Rupiah
            deficitToGdp: 2.40,      // % Defisit terhadap PDB (Maksimal UU 3.0%)
            debtNominal: 8400,       // Triliun Rupiah Total Utang
            debtToGdp: 39.07,        // % Rasio Utang terhadap PDB (Maksimal UU 60.0%)

            // Sektor Eksternal & Valas
            exchangeRate: 15650,     // IDR per USD
            fxReserves: 140.5,       // Miliar USD Cadangan Devisa
            currentAccount: -0.80,   // % PDB Neraca Transaksi Berjalan

            // Indeks Kesejahteraan & Kredibilitas
            approvalRating: 72,      // % Kepuasan Publik (Approval Rating)
            marketConfidence: 78,    // % Keyakinan Investor / Pasar Keuangan

            // Policy Lag Queues (Outside Lag Moneter 2 kuartal)
            biRateLagQueue: [6.00, 6.00],
            govSpendingLagQueue: [3300, 3300],

            // Active Shocks / Peristiwa Dunia
            activeShock: null
        };

        this.history = [];
        this.recordHistory();
    }

    // Memuat Skenario Tertentu
    loadScenario(scenarioId) {
        const sc = MACRO_THEORY_DATA.scenarios.find(s => s.id === scenarioId);
        if (!sc) return false;

        this.activeScenario = sc;
        const init = sc.initialState;

        this.state = {
            ...this.state,
            quarter: init.quarter || 1,
            year: init.year || 1,
            maxQuarters: sc.duration || 8,
            gdpGrowth: init.gdpGrowth,
            potentialGrowth: init.potentialGrowth,
            outputGap: init.gdpGrowth - init.potentialGrowth,
            inflation: init.inflation,
            unemployment: init.unemployment,
            biRate: init.biRate,
            fedRate: init.fedRate,
            exchangeRate: init.exchangeRate,
            fxReserves: init.fxReserves,
            taxRate: init.taxRate,
            govSpending: init.govSpending,
            energySubsidy: init.energySubsidy,
            debtToGdp: init.debtToGdp,
            deficitToGdp: init.deficitToGdp,
            approvalRating: init.approvalRating,
            biRateLagQueue: [init.biRate, init.biRate],
            govSpendingLagQueue: [init.govSpending, init.govSpending],
            activeShock: null
        };

        // Recalculate nominals based on realistic scale
        this.state.gdpNominal = Math.round(21500 * (1 + (this.state.gdpGrowth - 5.0) / 100));
        this.state.taxRevenue = Math.round((this.state.taxRate / 100) * this.state.gdpNominal);
        this.state.totalExpenditure = Math.round(this.state.govSpending + this.state.energySubsidy + (this.state.debtToGdp * 0.06 * this.state.gdpNominal / 100));
        this.state.fiscalBalance = this.state.taxRevenue - this.state.totalExpenditure;
        this.state.debtNominal = Math.round((this.state.debtToGdp / 100) * this.state.gdpNominal);

        this.history = [];
        this.recordHistory();
        return true;
    }

    recordHistory() {
        this.history.push({
            quarter: this.state.quarter,
            year: this.state.year,
            label: `Thn ${this.state.year} Q${this.state.quarter}`,
            gdpGrowth: this.state.gdpGrowth,
            inflation: this.state.inflation,
            unemployment: this.state.unemployment,
            biRate: this.state.biRate,
            deficitToGdp: this.state.deficitToGdp,
            debtToGdp: this.state.debtToGdp,
            exchangeRate: this.state.exchangeRate,
            fxReserves: this.state.fxReserves,
            approvalRating: this.state.approvalRating
        });
    }

    /**
     * =========================================================================
     * INTI SIMULASI EKONOMI MAKRO: MENJALANKAN 1 KUARTAL (ADVANCE QUARTER)
     * =========================================================================
     */
    advanceQuarter(policyDecisions) {
        // Simpan state lama untuk evaluasi teori vs praktek
        const prevState = JSON.parse(JSON.stringify(this.state));

        // 1. Terapkan Kebijakan Pemain
        if (policyDecisions) {
            if (policyDecisions.biRate !== undefined) this.state.biRate = Number(policyDecisions.biRate);
            if (policyDecisions.gwmRate !== undefined) this.state.gwmRate = Number(policyDecisions.gwmRate);
            if (policyDecisions.taxRate !== undefined) this.state.taxRate = Number(policyDecisions.taxRate);
            if (policyDecisions.govSpending !== undefined) this.state.govSpending = Number(policyDecisions.govSpending);
            if (policyDecisions.energySubsidy !== undefined) this.state.energySubsidy = Number(policyDecisions.energySubsidy);
            if (policyDecisions.spendingPriority !== undefined) this.state.spendingPriority = policyDecisions.spendingPriority;
            if (policyDecisions.fxIntervention !== undefined) this.state.fxIntervention = Number(policyDecisions.fxIntervention);
        }

        // 2. Transmisi Waktu Kebijakan (Policy Outside Lag)
        // Bunga moneter butuh waktu: 30% efek instan, 45% efek 1 kuartal lalu, 25% efek 2 kuartal lalu
        const lag1Rate = this.state.biRateLagQueue[0];
        const lag2Rate = this.state.biRateLagQueue[1];
        const effectiveBiRate = (0.35 * this.state.biRate) + (0.45 * lag1Rate) + (0.20 * lag2Rate);

        // Update queue
        this.state.biRateLagQueue.unshift(this.state.biRate);
        if (this.state.biRateLagQueue.length > 2) this.state.biRateLagQueue.pop();

        // 3. Model Sektor Eksternal, Aliran Modal & Kurs Rupiah
        // Trilema Mundell-Fleming: Selisih bunga (Interest Differential) vs US Fed
        const interestSpread = this.state.biRate - this.state.fedRate;
        // Premi risiko dipengaruhi oleh defisit APBN dan inflasi
        let sovereignRisk = 1.5 + Math.max(0, (this.state.deficitToGdp - 3.0) * 0.8) + Math.max(0, (this.state.inflation - 4.0) * 0.4);
        const netAttractiveness = interestSpread - sovereignRisk;

        // Perubahan Kurs
        // Daya tarik positif menarik modal asing (IDR terapresiasi / angka kurs turun)
        // Daya tarik negatif memicu capital flight (IDR terdepresiasi / angka kurs naik)
        let fxDelta = - (netAttractiveness * 180);

        // Efek intervensi devisa dari cadangan devisa (Guyur valas = kurangi tekanan kurs)
        if (this.state.fxIntervention !== 0) {
            // Jika intervensi positif (jual valas untuk perkuat Rupiah)
            fxDelta -= (this.state.fxIntervention * 45);
            this.state.fxReserves -= (this.state.fxIntervention * 0.8);
        } else {
            // Akumulasi devisa organik jika neraca baik
            if (netAttractiveness > 0) this.state.fxReserves += 1.2;
        }

        // Batasi cadangan devisa minimum 30 Miliar USD
        this.state.fxReserves = Math.max(30, Math.min(250, this.state.fxReserves));

        // Terapkan pergerakan kurs
        this.state.exchangeRate = Math.round(this.state.exchangeRate + fxDelta);
        // Fluktuasi acak pasar valas wajar (+/- Rp 60)
        this.state.exchangeRate += Math.round((Math.random() - 0.5) * 120);

        // 4. Model Permintaan Agregat (AD) & Pertumbuhan PDB
        // AD = C + I + G + NX
        // - Konsumsi C: Tertekan bunga riil tinggi, terdorong subsidi & bansos
        // - Investasi I: Sangat sensitif terhadap effectiveBiRate dan crowding-out defisit APBN
        // - Belanja G: Pengali fiskal Keynesian k = 1 / (1 - MPC*(1 - t)) ~ 1.3 s/d 1.8
        const realRate = effectiveBiRate - this.state.inflation;
        const interestDrag = (realRate - 2.5) * 0.35; // Bunga riil netral Indonesia ~ 2.5%

        // Pengali Belanja Pemerintah
        const spendingDelta = (this.state.govSpending - prevState.govSpending) / 1000;
        let fiscalMultiplier = 1.35;
        if (this.state.spendingPriority === 'infrastructure') fiscalMultiplier = 1.65;
        if (this.state.spendingPriority === 'social') fiscalMultiplier = 1.25;

        // Efek Crowding-Out jika defisit > 3% atau rasio utang > 45%
        let crowdingOut = 0;
        if (this.state.deficitToGdp > 3.0) {
            crowdingOut += (this.state.deficitToGdp - 3.0) * 0.3;
        }
        if (this.state.debtToGdp > 50.0) {
            crowdingOut += (this.state.debtToGdp - 50.0) * 0.04;
        }

        // Efek Pajak
        const taxDrag = (this.state.taxRate - 11.0) * 0.25;

        // Efek Ekspor Neto (Rupiah melemah mendorong ekspor, menekan impor)
        const fxDepreciationRate = (this.state.exchangeRate - prevState.exchangeRate) / prevState.exchangeRate;
        const netExportBoost = fxDepreciationRate * 1.5;

        // Hitung Pertumbuhan PDB Baru
        let growthNew = this.state.potentialGrowth 
                        - interestDrag 
                        + (spendingDelta * fiscalMultiplier) 
                        - crowdingOut 
                        - taxDrag 
                        + netExportBoost;

        // Dynamic shock injection if active
        if (this.state.activeShock) {
            growthNew += (this.state.activeShock.growthImpact || 0);
        }

        // Smoothing inertia
        this.state.gdpGrowth = Number(((this.state.gdpGrowth * 0.35) + (growthNew * 0.65)).toFixed(2));
        this.state.outputGap = Number((this.state.gdpGrowth - this.state.potentialGrowth).toFixed(2));

        // Update PDB Nominal
        this.state.gdpNominal = Math.round(this.state.gdpNominal * (1 + ((this.state.gdpGrowth + this.state.inflation) / 400)));

        // 5. Model Inflasi (Demand-Pull + Cost-Push + Ekspektasi)
        // - Demand-pull: driven by positive Output Gap (Y > Y*)
        // - Cost-push: driven by Imported Inflation (Kurs Rupiah terdepresiasi) & Pemotongan Subsidi Energi
        let demandPull = 0;
        if (this.state.outputGap > 0) {
            demandPull = this.state.outputGap * 0.55; // Overheating
        } else {
            demandPull = this.state.outputGap * 0.25; // Disinflasi resesi
        }

        // Imported inflation dari pelemahan kurs (Pass-through ~ 10-15%)
        const importedInflation = Math.max(0, fxDepreciationRate * 100 * 0.15);

        // Cost-push dari subsidi energi
        const subsidyChange = (this.state.energySubsidy - prevState.energySubsidy);
        let energyPricePush = 0;
        if (subsidyChange < -20) {
            // Subsidi dipangkas -> harga BBM/tarif listrik naik -> inflasi
            energyPricePush = Math.abs(subsidyChange) / 80;
        }

        // Inflasi ekspektasi & jangkar moneter BI-Rate
        const monetaryTighteningEffect = (effectiveBiRate - 6.0) * 0.28;

        let targetInflation = 2.80 + demandPull + importedInflation + energyPricePush - monetaryTighteningEffect;
        if (this.state.activeShock) {
            targetInflation += (this.state.activeShock.inflationImpact || 0);
        }

        this.state.inflation = Number(Math.max(0.5, ((this.state.inflation * 0.4) + (targetInflation * 0.6))).toFixed(2));

        // 6. Model Pengangguran (Hukum Okun & Kurva Phillips)
        // Delta U = -0.38 * (Growth - PotentialGrowth)
        const okunDelta = -0.38 * this.state.outputGap;
        this.state.unemployment = Number(Math.max(2.5, Math.min(18.0, this.state.unemployment + (okunDelta * 0.35))).toFixed(2));

        // 7. APBN, Defisit, & Akumulasi Utang
        this.state.taxRevenue = Math.round((this.state.taxRate / 100) * this.state.gdpNominal);
        
        // Bunga Utang yang harus dibayar negara = Suku bunga pasar (BI-rate + risk) * Utang
        const debtInterestRate = (this.state.biRate + sovereignRisk) / 100;
        const interestPaymentAnnual = Math.round(this.state.debtNominal * debtInterestRate);
        const quarterlyInterest = Math.round(interestPaymentAnnual / 4);

        this.state.totalExpenditure = Math.round((this.state.govSpending / 4) + (this.state.energySubsidy / 4) + quarterlyInterest);
        const quarterlyTax = Math.round(this.state.taxRevenue / 4);
        
        const quarterlyDeficit = this.state.totalExpenditure - quarterlyTax;
        this.state.fiscalBalance = -quarterlyDeficit * 4; // Ditransformasi ke run-rate tahunan
        this.state.deficitToGdp = Number((Math.max(0, -this.state.fiscalBalance) / this.state.gdpNominal * 100).toFixed(2));

        // Tambah akumulasi utang nominal jika defisit
        if (quarterlyDeficit > 0) {
            this.state.debtNominal += quarterlyDeficit;
        }
        this.state.debtToGdp = Number((this.state.debtNominal / this.state.gdpNominal * 100).toFixed(2));

        // 8. Indeks Kepuasan Publik (Approval Rating) & Kredibilitas Pasar
        let approvalDelta = 0;
        // Penalti inflasi: rakyat sangat sensitif terhadap harga sembako & BBM
        if (this.state.inflation > 4.5) approvalDelta -= (this.state.inflation - 4.5) * 2.5;
        if (this.state.inflation < 3.5 && this.state.inflation > 1.8) approvalDelta += 1.5;
        
        // Penalti pengangguran
        if (this.state.unemployment > 6.0) approvalDelta -= (this.state.unemployment - 6.0) * 2.0;
        if (this.state.gdpGrowth > 5.2) approvalDelta += (this.state.gdpGrowth - 5.2) * 2.2;
        
        // Penalti jika defisit jebol 3% (berita heboh di media)
        if (this.state.deficitToGdp > 3.0) approvalDelta -= 4;

        if (this.state.activeShock && this.state.activeShock.approvalImpact) {
            approvalDelta += this.state.activeShock.approvalImpact;
        }

        this.state.approvalRating = Math.max(10, Math.min(95, Math.round(this.state.approvalRating + approvalDelta)));

        // 9. Kemajuan Waktu (Kuartal & Tahun)
        this.state.quarter++;
        if (this.state.quarter > 4) {
            this.state.quarter = 1;
            this.state.year++;
        }

        // Catat riwayat baru
        this.recordHistory();

        // 10. Susun Laporan Evaluasi Teori vs Praktek Kuartal Ini
        const debriefing = this.generateQuarterlyDebrief(prevState);

        // Bersihkan active shock untuk kuartal depan
        this.state.activeShock = null;

        return debriefing;
    }

    /**
     * Menghasilkan Penjelasan Evaluatif "Teori vs Praktek" untuk Pemain
     */
    generateQuarterlyDebrief(prev) {
        const biDiff = this.state.biRate - prev.biRate;
        const spendDiff = this.state.govSpending - prev.govSpending;
        const infDiff = this.state.inflation - prev.inflation;
        const growthDiff = this.state.gdpGrowth - prev.gdpGrowth;
        const fxDiff = this.state.exchangeRate - prev.exchangeRate;

        const highlights = [];

        // 1. Analisis Kebijakan Moneter
        if (Math.abs(biDiff) >= 0.25) {
            if (biDiff > 0) {
                highlights.push({
                    title: `🏦 Kenaikan Suku Bunga BI-Rate (+${biDiff.toFixed(2)}%)`,
                    theory: `Menurut Teori Transmisi Moneter & Efek Fisher, menaikkan BI-Rate meningkatkan biaya modal pinjaman, mengerem laju kredit, dan menurunkan permintaan agregat (AD) untuk menstabilkan inflasi.`,
                    practice: `Dalam Realita Lapangan: Terjadi Outside Lag transmisi perbankan selama 2-4 kuartal. Kenaikan bunga hari ini belum menurunkan inflasi seketika, namun sudah mulai menahan pelarian modal asing dan meredam depresiasi Rupiah.`
                });
            } else {
                highlights.push({
                    title: `🏦 Penurunan Suku Bunga BI-Rate (${biDiff.toFixed(2)}%)`,
                    theory: `Kebijakan moneter ekspansif melonggarkan likuiditas, memangkas suku bunga kredit, merangsang investasi swasta (I), dan menggeser kurva AD ke kanan.`,
                    practice: `Dalam Realita Lapangan: Perbankan sering bersikap hati-hati (sticky downward) menurunkan bunga pinjaman jika persepsi risiko kredit macet (NPL) masih tinggi. Selisih bunga terhadap US Fed juga menyempit sehingga menuntut pengawasan terhadap kurs Rupiah.`
                });
            }
        }

        // 2. Analisis Kebijakan Fiskal
        if (Math.abs(spendDiff) >= 100) {
            if (spendDiff > 0) {
                highlights.push({
                    title: `🏛️ Ekspansi Belanja Pemerintah (+Rp ${spendDiff} Triliun)`,
                    theory: `Menurut Model Pengali Fiskal Keynesian, belanja pemerintah langsung menyuntikkan permintaan ke perekonomian dengan efek berantai: k = 1 / (1 - MPC).`,
                    practice: `Dalam Realita Lapangan: Defisit APBN melebar menjadi ${this.state.deficitToGdp}%. Jika defisit mendekati atau melewati batas legal 3% PDB (UU No. 17/2003), imbal hasil obligasi negara (SBN) akan naik karena efek Crowding-Out membebani pembiayaan swasta.`
                });
            } else {
                highlights.push({
                    title: `🏛️ Konsolidasi & Penghematan Fiskal (-Rp ${Math.abs(spendDiff)} Triliun)`,
                    theory: `Disiplin fiskal menurunkan beban defisit, menekan rasio utang/PDB, dan memulihkan ruang fiskal (fiscal space).`,
                    practice: `Dalam Realita Lapangan: Pengurangan belanja proyek langsung menurunkan laju pertumbuhan ekonomi jangka pendek dan memicu komplain dari kontraktor dan penerima bansos.`
                });
            }
        }

        // 3. Analisis Kurs & Devisa
        if (Math.abs(fxDiff) >= 200) {
            if (fxDiff > 0) {
                highlights.push({
                    title: `💵 Pelemahan Nilai Tukar Rupiah (+Rp ${fxDiff} / USD)`,
                    theory: `Berdasarkan Kondisi Marshall-Lerner, depresiasi mata uang membuat barang ekspor lebih murah dan barang impor lebih mahal, sehingga dalam jangka panjang memperbaiki neraca dagang.`,
                    practice: `Dalam Realita Lapangan: Indonesia bergantung pada impor minyak mentah dan bahan baku industri pangan. Pelemahan Rupiah langsung memicu Imported Inflation (inflasi barang impor) sebelum industri ekspor sempat meningkatkan kapasitasnya (J-Curve Effect).`
                });
            }
        }

        // 4. Analisis Ketenagakerjaan & Hukum Okun
        highlights.push({
            title: `📊 Dinamika Pengangguran (${this.state.unemployment}%) & Hukum Okun`,
            theory: `Hukum Okun menyatakan bahwa setiap pertumbuhan ekonomi di atas kapasitas potensial (${this.state.potentialGrowth}%) akan menyerap tenaga kerja dan menurunkan angka pengangguran.`,
            practice: `Di Indonesia, sebagian besar tenaga kerja berada di sektor informal. Pertumbuhan ekonomi berbasis industri padat modal belum tentu langsung menyerap jutaan lulusan baru jika tidak didukung sektor padat karya dan UMKM.`
        });

        return {
            quarter: prev.quarter,
            year: prev.year,
            gdpGrowth: this.state.gdpGrowth,
            inflation: this.state.inflation,
            unemployment: this.state.unemployment,
            deficitToGdp: this.state.deficitToGdp,
            exchangeRate: this.state.exchangeRate,
            approvalRating: this.state.approvalRating,
            highlights: highlights,
            isTenureFinished: (this.history.length >= this.state.maxQuarters),
            isDeficitBreached: (this.state.deficitToGdp > 3.0),
            isDebtBreached: (this.state.debtToGdp > 60.0)
        };
    }

    /**
     * =========================================================================
     * VISUALISASI CANVAS INTERAKTIF: KURVA AD-AS (AGGREGATE DEMAND & SUPPLY)
     * =========================================================================
     */
    initAdAsCanvas(canvasId) {
        this.adasCanvas = document.getElementById(canvasId);
        if (this.adasCanvas) {
            this.adasCtx = this.adasCanvas.getContext('2d');
            this.renderAdAsCanvas();
        }
    }

    renderAdAsCanvas(previewState = null) {
        if (!this.adasCanvas || !this.adasCtx) return;
        const ctx = this.adasCtx;
        const w = this.adasCanvas.width;
        const h = this.adasCanvas.height;

        const s = previewState || this.state;

        // Bersihkan latar belakang dengan tema terang modern
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);

        // Gambar Garis Grid Lembut
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 1;
        const gridSteps = 6;
        for (let i = 1; i < gridSteps; i++) {
            const x = (w / gridSteps) * i;
            const y = (h / gridSteps) * i;
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, h - 35);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(45, y);
            ctx.lineTo(w - 20, y);
            ctx.stroke();
        }

        // Sumbu X & Y
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Sumbu Y (Tingkat Harga Umum P)
        ctx.moveTo(45, 20);
        ctx.lineTo(45, h - 35);
        // Sumbu X (PDB Riil Y)
        ctx.lineTo(w - 20, h - 35);
        ctx.stroke();

        // Label Sumbu
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 11px "Chakra Petch", sans-serif';
        ctx.fillText('Tingkat Harga (P)', 50, 25);
        ctx.fillText('Output Riil / PDB (Y)', w - 130, h - 15);

        // Hitung Pergeseran Kurva Berdasarkan Variabel Simulasi
        // AD bergeser ke kanan jika: Belanja G naik, Pajak turun, Bunga BI turun
        const adShift = ((s.govSpending - 3300) / 40) - ((s.biRate - 6.0) * 15) - ((s.taxRate - 11.0) * 10);
        
        // SRAS bergeser ke kiri jika: Inflasi impor tinggi, subsidi dipangkas drastis
        const asShift = - ((s.inflation - 2.8) * 12);

        // Output Potensial (LRAS) pada garis vertikal
        const lrasX = (w * 0.52);

        // Gambar Kurva LRAS (Garis Putus-putus)
        ctx.strokeStyle = '#64748b';
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lrasX, 25);
        ctx.lineTo(lrasX, h - 35);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('LRAS (Y*)', lrasX - 25, 20);

        // Gambar Kurva AD (Merah Gelap / Rose) - Melandai ke bawah
        // Dari kiri-atas ke kanan-bawah
        const adStartX = 60 + adShift;
        const adStartY = 45;
        const adEndX = (w - 60) + adShift;
        const adEndY = h - 55;

        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(adStartX, adStartY);
        ctx.lineTo(adEndX, adEndY);
        ctx.stroke();

        ctx.fillStyle = '#e11d48';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('AD', Math.min(w - 40, adEndX + 5), adEndY);

        // Gambar Kurva SRAS (Biru Sky) - Melandai ke atas
        // Dari kiri-bawah ke kanan-atas
        const asStartX = 60 + asShift;
        const asStartY = h - 55;
        const asEndX = (w - 60) + asShift;
        const asEndY = 45;

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(asStartX, asStartY);
        ctx.lineTo(asEndX, asEndY);
        ctx.stroke();

        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('SRAS', Math.min(w - 45, asEndX + 5), asEndY);

        // Titik Ekuilibrium (Persilangan AD dan SRAS)
        // Persamaan garis:
        // AD: y - y1 = m_ad * (x - x1)  =>  y = m_ad * x + c_ad
        // AS: y - y1 = m_as * (x - x1)  =>  y = m_as * x + c_as
        const mAd = (adEndY - adStartY) / (adEndX - adStartX);
        const cAd = adStartY - (mAd * adStartX);

        const mAs = (asEndY - asStartY) / (asEndX - asStartX);
        const cAs = asStartY - (mAs * asStartX);

        // x_eq = (cAs - cAd) / (mAd - mAs)
        const eqX = (cAs - cAd) / (mAd - mAs);
        const eqY = (mAd * eqX) + cAd;

        if (eqX >= 45 && eqX <= w - 20 && eqY >= 20 && eqY <= h - 35) {
            // Garis putus-putus ke sumbu X dan Y
            ctx.strokeStyle = '#d97706';
            ctx.setLineDash([3, 3]);
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(45, eqY);
            ctx.lineTo(eqX, eqY);
            ctx.lineTo(eqX, h - 35);
            ctx.stroke();
            ctx.setLineDash([]);

            // Titik Koordinat
            ctx.fillStyle = '#d97706';
            ctx.beginPath();
            ctx.arc(eqX, eqY, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(217, 119, 6, 0.2)';
            ctx.beginPath();
            ctx.arc(eqX, eqY, 12, 0, Math.PI * 2);
            ctx.fill();

            // Keterangan status gap
            ctx.font = 'bold 11px sans-serif';
            ctx.fillStyle = '#b45309';
            const gap = eqX - lrasX;
            if (gap > 15) {
                ctx.fillText('⚠️ Overheating (Y > Y*)', Math.min(w - 150, eqX + 10), eqY - 10);
                ctx.fillStyle = '#dc2626';
                ctx.fillText('Tekanan Inflasi Tinggi!', Math.min(w - 150, eqX + 10), eqY + 6);
            } else if (gap < -15) {
                ctx.fillText('📉 Resesi (Y < Y*)', Math.min(w - 150, eqX + 10), eqY - 10);
                ctx.fillStyle = '#16a34a';
                ctx.fillText('Kapasitas Menganggur', Math.min(w - 150, eqX + 10), eqY + 6);
            } else {
                ctx.fillText('✅ Ekuilibrium Seimbang', Math.min(w - 150, eqX + 10), eqY - 10);
            }
        }
    }

    /**
     * =========================================================================
     * VISUALISASI CANVAS INTERAKTIF: KURVA PHILLIPS (INFLASI VS PENGANGGURAN)
     * =========================================================================
     */
    initPhillipsCanvas(canvasId) {
        this.phillipsCanvas = document.getElementById(canvasId);
        if (this.phillipsCanvas) {
            this.phillipsCtx = this.phillipsCanvas.getContext('2d');
            this.renderPhillipsCanvas();
        }
    }

    renderPhillipsCanvas() {
        if (!this.phillipsCanvas || !this.phillipsCtx) return;
        const ctx = this.phillipsCtx;
        const w = this.phillipsCanvas.width;
        const h = this.phillipsCanvas.height;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);

        // Grid
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 1;
        for (let i = 1; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo((w / 6) * i, 20);
            ctx.lineTo((w / 6) * i, h - 35);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(45, (h / 6) * i);
            ctx.lineTo(w - 20, (h / 6) * i);
            ctx.stroke();
        }

        // Sumbu
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(45, 20);
        ctx.lineTo(45, h - 35);
        ctx.lineTo(w - 20, h - 35);
        ctx.stroke();

        ctx.fillStyle = '#334155';
        ctx.font = 'bold 11px "Chakra Petch", sans-serif';
        ctx.fillText('Inflasi (π %)', 50, 25);
        ctx.fillText('Tingkat Pengangguran (u %)', w - 150, h - 15);

        // Garis NAIRU (Natural Rate of Unemployment ~ 5.0%)
        const nairuX = 45 + ((5.0 / 12.0) * (w - 70));
        ctx.strokeStyle = '#7e22ce';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nairuX, 25);
        ctx.lineTo(nairuX, h - 35);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#7e22ce';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('NAIRU (5.0%)', nairuX - 30, 20);

        // Kurva Phillips Jangka Pendek (SR-PC) - Kurva Melengkung
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let u = 3.2; u <= 11.0; u += 0.2) {
            const piEst = 1.0 + (12.0 / Math.max(1.0, u - 1.5));
            const px = 45 + ((u / 12.0) * (w - 70));
            const py = (h - 35) - ((piEst / 14.0) * (h - 60));
            if (u === 3.2) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.fillStyle = '#b45309';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('Kurva Phillips (SR)', w - 120, 50);

        // Gambar Jejak Sejarah Titik-titik Kuartal (Historical Trace)
        if (this.history.length > 1) {
            ctx.strokeStyle = 'rgba(22, 163, 74, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            this.history.forEach((pt, idx) => {
                const px = 45 + ((pt.unemployment / 12.0) * (w - 70));
                const py = (h - 35) - ((pt.inflation / 14.0) * (h - 60));
                if (idx === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();
        }

        // Gambar Titik Berjalan Saat Ini
        const curU = this.state.unemployment;
        const curPi = this.state.inflation;
        const curX = 45 + ((curU / 12.0) * (w - 70));
        const curY = (h - 35) - ((curPi / 14.0) * (h - 60));

        if (curX >= 45 && curX <= w - 20 && curY >= 20 && curY <= h - 35) {
            ctx.fillStyle = '#16a34a';
            ctx.beginPath();
            ctx.arc(curX, curY, 7, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(22, 163, 74, 0.25)';
            ctx.beginPath();
            ctx.arc(curX, curY, 14, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#15803d';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText(`Posisi Sekarang (u:${curU}%, π:${curPi}%)`, Math.min(w - 160, curX + 12), Math.max(35, curY - 10));
        }
    }

    /**
     * Evaluasi Keberhasilan Skenario di Akhir Masa Jabatan
     */
    evaluateScenarioCompletion() {
        if (!this.activeScenario) {
            return {
                isVictory: true,
                title: "Masa Jabatan Selesai (Mode Bebas)",
                grade: "Teknokrat Mandiri",
                summary: "Anda telah menyelesaikan masa jabatan pengambil kebijakan ekonomi makro. Pertahankan disiplin APBN dan stabilitas inflasi untuk kemakmuran bangsa!"
            };
        }

        const sc = this.activeScenario;
        const goals = sc.targetGoals;
        let passedGoals = 0;
        let totalGoals = 0;
        const breakdown = [];

        if (goals.minGdpGrowth !== undefined) {
            totalGoals++;
            const pass = this.state.gdpGrowth >= goals.minGdpGrowth;
            if (pass) passedGoals++;
            breakdown.push({ label: `Pertumbuhan PDB >= ${goals.minGdpGrowth}%`, current: `${this.state.gdpGrowth}%`, pass });
        }

        if (goals.maxInflation !== undefined) {
            totalGoals++;
            const pass = this.state.inflation <= goals.maxInflation;
            if (pass) passedGoals++;
            breakdown.push({ label: `Inflasi IHK <= ${goals.maxInflation}%`, current: `${this.state.inflation}%`, pass });
        }

        if (goals.maxDeficit !== undefined) {
            totalGoals++;
            const pass = this.state.deficitToGdp <= goals.maxDeficit;
            if (pass) passedGoals++;
            breakdown.push({ label: `Defisit APBN <= ${goals.maxDeficit}% PDB`, current: `${this.state.deficitToGdp}%`, pass });
        }

        if (goals.minApproval !== undefined) {
            totalGoals++;
            const pass = this.state.approvalRating >= goals.minApproval;
            if (pass) passedGoals++;
            breakdown.push({ label: `Kepuasan Publik >= ${goals.minApproval}%`, current: `${this.state.approvalRating}%`, pass });
        }

        if (goals.maxExchangeRate !== undefined) {
            totalGoals++;
            const pass = this.state.exchangeRate <= goals.maxExchangeRate;
            if (pass) passedGoals++;
            breakdown.push({ label: `Kurs Rupiah <= Rp ${goals.maxExchangeRate.toLocaleString()}`, current: `Rp ${this.state.exchangeRate.toLocaleString()}`, pass });
        }

        const winRate = passedGoals / Math.max(1, totalGoals);
        let isVictory = winRate >= 0.75;
        let grade = "C";
        if (winRate === 1.0) grade = "A+ (Summa Cum Laude)";
        else if (winRate >= 0.75) grade = "A (Teknokrat Teladan)";
        else if (winRate >= 0.50) grade = "B (Cukup Stabil)";
        else grade = "D (Krisis Berkelanjutan)";

        return {
            isVictory,
            grade,
            scenarioName: sc.name,
            passedGoals,
            totalGoals,
            breakdown,
            summary: isVictory 
                ? `Selamat! Anda berhasil menavigasi krisis ${sc.name} dengan memadukan instrumen moneter dan fiskal secara bijaksana.`
                : `Masa jabatan berakhir dengan beberapa target vital yang belum tercapai. Pelajari kembali mekanisme transmisi dan evaluasi kebijakan Anda!`
        };
    }
}

// Export singleton instance
if (typeof window !== 'undefined') {
    window.macroEngine = new MacroEngine();
}
