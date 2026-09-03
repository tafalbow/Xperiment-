/**
 * ==============================================================================
 * MACROMASTER DEN - ECONOMICS-GAMES.COM SIMULATION EXPERIMENTS (macro_econ_games.js)
 * Fitur: Eksperimen Pasar Interaktif ala Economics-games.com:
 * 1. The Asset Bubble Game (Gelembung Spekulasi & Crash Finansial)
 * 2. The Market Competition & Capacity Game (Persaingan Pasar & Perang Harga)
 * 3. The Macroeconomic Policy Shock Lab (Bauran Kebijakan & Guncangan AD-AS)
 * ==============================================================================
 */

class EconomicsGamesEngine {
    constructor() {
        this.activeGame = "bubble"; // 'bubble', 'competition', 'macro_shock'
        
        // --- State Game 1: The Asset Bubble Game ---
        this.bubbleState = {
            round: 1,
            maxRounds: 6,
            cash: 500000,
            shares: 5,
            history: [],
            isFinished: false,
            currentMarketPrice: 65000,
            fundamentalValue: 60000,
            dividendHistory: []
        };

        // --- State Game 2: The Market Competition Game ---
        this.compState = {
            round: 1,
            maxRounds: 5,
            capital: 150000000,
            history: [],
            isFinished: false,
            fixedCost: 40000000,
            marginalCost: 35000
        };

        // --- State Game 3: Macro Policy Shock Lab ---
        this.shockState = {
            round: 1,
            maxRounds: 4,
            currentShock: null,
            history: [],
            isFinished: false
        };

        this.initBubbleGame();
    }

    // ==========================================================================
    // GAME 1: THE SPECULATIVE ASSET BUBBLE GAME
    // ==========================================================================
    initBubbleGame() {
        this.bubbleState.round = 1;
        this.bubbleState.cash = 500000;
        this.bubbleState.shares = 5;
        this.bubbleState.isFinished = false;
        this.bubbleState.history = [
            { round: 0, price: 60000, fundamental: 60000, dividend: 0, playerAction: "Awal", netWorth: 800000 }
        ];
    }

    playBubbleRound(action, orderPrice) {
        if (this.bubbleState.isFinished) return null;

        const r = this.bubbleState.round;
        const remainingRounds = this.bubbleState.maxRounds - r + 1;
        const fundamental = remainingRounds * 10000;
        
        // Simulasikan dividen acak kuartal ini (rata-rata 10.000, rentang 6.000 - 14.000)
        const dividend = Math.floor(Math.random() * 8000) + 6000;

        // Simulasi pembentukan harga pasar oleh spekulan momentum ala economics-games.com
        let marketPrice = fundamental;
        if (r === 1) marketPrice = Math.round(fundamental * 1.05);
        else if (r === 2) marketPrice = Math.round(fundamental * 1.35);
        else if (r === 3) marketPrice = Math.round(fundamental * 1.70); // Gelembung terbentuk
        else if (r === 4) marketPrice = Math.round(fundamental * 2.15); // Puncak euforia spekulasi
        else if (r === 5) marketPrice = Math.round(fundamental * 0.90); // Crash / Gelembung meletus
        else if (r === 6) marketPrice = Math.round(fundamental * 0.75); // Likuiditas kering

        // Terapkan eksekusi order pemain
        let execShares = 0;
        let note = "Tahan Aset (Hold)";

        if (action === "buy") {
            const qtyToBuy = 2;
            const cost = qtyToBuy * marketPrice;
            if (this.bubbleState.cash >= cost) {
                this.bubbleState.cash -= cost;
                this.bubbleState.shares += qtyToBuy;
                execShares = qtyToBuy;
                note = `Beli +${qtyToBuy} Saham @ Rp ${marketPrice.toLocaleString('id-ID')}`;
            } else {
                note = "Gagal Beli (Kas Tidak Cukup)";
            }
        } else if (action === "sell") {
            const qtyToSell = Math.min(2, this.bubbleState.shares);
            if (qtyToSell > 0) {
                const proceeds = qtyToSell * marketPrice;
                this.bubbleState.cash += proceeds;
                this.bubbleState.shares -= qtyToSell;
                execShares = -qtyToSell;
                note = `Jual -${qtyToSell} Saham @ Rp ${marketPrice.toLocaleString('id-ID')}`;
            } else {
                note = "Gagal Jual (Tidak Punya Saham)";
            }
        }

        // Penerimaan dividen putaran berjalan untuk saham yang dipegang
        const dividendIncome = this.bubbleState.shares * dividend;
        this.bubbleState.cash += dividendIncome;

        // Hitung total kekayaan bersih (Net Worth)
        const totalNetWorth = this.bubbleState.cash + (this.bubbleState.shares * marketPrice);

        this.bubbleState.history.push({
            round: r,
            price: marketPrice,
            fundamental: fundamental,
            dividend: dividend,
            playerAction: note,
            shares: this.bubbleState.shares,
            cash: this.bubbleState.cash,
            netWorth: totalNetWorth
        });

        this.bubbleState.round++;
        if (this.bubbleState.round > this.bubbleState.maxRounds) {
            this.bubbleState.isFinished = true;
        }

        return {
            round: r,
            marketPrice: marketPrice,
            fundamental: fundamental,
            dividend: dividend,
            totalNetWorth: totalNetWorth,
            isCrash: r === 5,
            isFinished: this.bubbleState.isFinished
        };
    }

    // ==========================================================================
    // GAME 2: THE MARKET COMPETITION & CAPACITY GAME
    // ==========================================================================
    playCompRound(playerQty, playerPrice) {
        const r = this.compState.round;
        
        // 3 Kompetitor Komputer menetapkan harga & kapasitas
        const comp1Price = Math.round(55000 + (Math.random() * 15000 - 7500));
        const comp2Price = Math.round(50000 + (Math.random() * 12000 - 6000));
        const comp3Price = Math.round(60000 + (Math.random() * 10000 - 5000));
        
        const avgPrice = Math.round((playerPrice + comp1Price + comp2Price + comp3Price) / 4);
        
        // Fungsi Permintaan Industri: Q_D = 24.000 - (0.2 * avgPrice)
        const totalMarketDemand = Math.max(2000, Math.round(24000 - (0.2 * avgPrice)));
        
        // Pangsa pasar ditentukan oleh seberapa murah harga pemain dibanding rata-rata pasar
        let playerShare = (avgPrice / playerPrice) * 0.25;
        playerShare = Math.min(0.60, Math.max(0.08, playerShare));
        
        const potentialDemand = Math.round(totalMarketDemand * playerShare);
        const actualSold = Math.min(playerQty, potentialDemand);
        const unsoldInventory = Math.max(0, playerQty - actualSold);
        
        const revenue = actualSold * playerPrice;
        const varCost = playerQty * this.compState.marginalCost;
        const totalCost = this.compState.fixedCost + varCost;
        const netProfit = revenue - totalCost;
        
        this.compState.capital += netProfit;

        this.compState.history.push({
            round: r,
            playerPrice: playerPrice,
            playerQty: playerQty,
            actualSold: actualSold,
            unsold: unsoldInventory,
            revenue: revenue,
            totalCost: totalCost,
            netProfit: netProfit,
            capital: this.compState.capital,
            marketAvgPrice: avgPrice
        });

        this.compState.round++;
        if (this.compState.round > this.compState.maxRounds) {
            this.compState.isFinished = true;
        }

        return {
            round: r,
            actualSold: actualSold,
            unsold: unsoldInventory,
            revenue: revenue,
            netProfit: netProfit,
            capital: this.compState.capital,
            isFinished: this.compState.isFinished
        };
    }

    // ==========================================================================
    // GAME 3: THE MACRO POLICY SHOCK LAB
    // ==========================================================================
    getShockScenario(round) {
        const scenarios = [
            {
                id: 1,
                title: "🛢️ Guncangan Pasokan Negatif (Adverse Supply Shock)",
                desc: "Harga minyak mentah dunia melonjak 120% akibat eskalasi geopolitik. Biaya produksi pabrik dan BBM meroket tajam! Kurva SRAS bergeser tajam ke kiri atas.",
                baseInflation: 7.8,
                baseGrowth: 2.1,
                target: "Kendalikan inflasi tanpa memicu kebangkrutan massal sektor riil."
            },
            {
                id: 2,
                title: "📉 Guncangan Permintaan Agregat Lesu (Consumer Pessimism)",
                desc: "Masyarakat menahan belanja karena ketidakpastian global. Konsumsi swasta (C) dan investasi (I) anjlok 30%. Kurva AD bergeser ke kiri bawah.",
                baseInflation: 1.2,
                baseGrowth: 1.5,
                target: "Pacu kembali permintaan agregat (AD) agar pengangguran tidak melonjak."
            },
            {
                id: 3,
                title: "💵 Lonjakan Suku Bunga Global (The Fed Rate Hike Shock)",
                desc: "Bank Sentral AS menaikkan suku bunga agresif. Aliran modal asing keluar deras (capital flight), menekan kurs Rupiah terdepresiasi 8%.",
                baseInflation: 5.5,
                baseGrowth: 3.8,
                target: "Pertahankan stabilitas kurs Rupiah dengan menaikkan BI-Rate atau intervensi devisa."
            },
            {
                id: 4,
                title: "🌟 Booming Harga Komoditas Ekspor (Windfall Demand Boom)",
                desc: "Harga nikel dan kelapa sawit dunia melompat tinggi. Ekspor surplus besar-besaran, namun memicu ancaman Overheating dan kenaikan harga properti.",
                baseInflation: 6.2,
                baseGrowth: 6.8,
                target: "Redam risiko Overheating dan tampung rezeki nomplok ke cadangan devisa produktif."
            }
        ];
        return scenarios[(round - 1) % scenarios.length];
    }

    evaluatePolicyMix(shock, biRate, govSpending, taxRate) {
        // Model simulasi interaktif bauran kebijakan makro
        let growth = shock.baseGrowth;
        let inflation = shock.baseInflation;

        // Efek Moneter (BI-Rate): baseline 6.0%
        const biDiff = biRate - 6.0;
        growth -= (biDiff * 0.45);
        inflation -= (biDiff * 0.85);

        // Efek Fiskal (Belanja G): baseline 3200 Triliun
        const gDiff = (govSpending - 3200) / 1000;
        growth += (gDiff * 1.2);
        inflation += (gDiff * 0.9);

        // Efek Pajak (T): baseline 11.0%
        const tDiff = taxRate - 11.0;
        growth -= (tDiff * 0.35);
        inflation -= (tDiff * 0.25);

        // Hitung Taylor Loss Score: Loss = (Inflasi - 2.5)^2 + (Pertumbuhan - 5.0)^2
        const inflationGap = Math.abs(inflation - 2.5);
        const growthGap = Math.abs(growth - 5.0);
        const lossScore = Math.round((inflationGap * 1.5 + growthGap * 1.2) * 10);
        
        let grade = "Sangat Baik (A)";
        if (lossScore > 60) grade = "Kurang Tepat (C)";
        else if (lossScore > 35) grade = "Cukup Baik (B)";

        return {
            growth: parseFloat(growth.toFixed(2)),
            inflation: parseFloat(inflation.toFixed(2)),
            lossScore: lossScore,
            grade: grade,
            inflationGap: parseFloat(inflationGap.toFixed(2)),
            growthGap: parseFloat(growthGap.toFixed(2))
        };
    }
}

// Inisialisasi global
if (typeof window !== 'undefined') {
    window.econGamesEngine = new EconomicsGamesEngine();
}
