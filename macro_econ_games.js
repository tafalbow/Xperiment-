/**
 * ==============================================================================
 * DIVETOMAKRO - ECONOMICS-GAMES.COM SIMULATION EXPERIMENTS (macro_econ_games.js)
 * Fitur: Eksperimen Pasar Interaktif & Laboratorium Kebijakan Berbasis Teori x Eksekusi:
 * 1. The Speculative Asset Bubble Game (Vernon Smith Nobel 2002, Greater Fool Theory, Minsky Moment)
 * 2. The Market Competition & Capacity Game (Oligopoli, Paradoks Bertrand, Cost-Volume-Profit, Perang Tarif)
 * 3. The Macroeconomic Policy Shock Lab (Model AD-AS, Taylor Rule, Multiplier Fiskal, Studi Kasus Nyata)
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
            initialNetWorth: 800000,
            endgameSummary: null
        };

        // --- State Game 2: The Market Competition Game ---
        this.compState = {
            round: 1,
            maxRounds: 5,
            capital: 150000000,
            initialCapital: 150000000,
            history: [],
            isFinished: false,
            fixedCost: 40000000,
            marginalCost: 35000,
            endgameSummary: null
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
        this.initCompGame();
    }

    // ==========================================================================
    // GAME 1: THE SPECULATIVE ASSET BUBBLE GAME (VERNON SMITH NOBEL 2002)
    // ==========================================================================
    initBubbleGame() {
        this.bubbleState.round = 1;
        this.bubbleState.cash = 500000;
        this.bubbleState.shares = 5;
        this.bubbleState.isFinished = false;
        this.bubbleState.endgameSummary = null;
        this.bubbleState.history = [
            {
                round: 0,
                price: 60000,
                fundamental: 60000,
                bubbleRatio: 1.0,
                dividend: 0,
                playerAction: "Posisi Awal",
                actionType: "init",
                shares: 5,
                cash: 500000,
                netWorth: 800000,
                clueTitle: "Pasar Baru Dibuka",
                clueDetail: "Saham diperdagangkan tepat di nilai fundamental Rp 60.000 (ekspektasi dividen 6 putaran x Rp 10.000).",
                realCase: "Kondisi pasar efisien di mana harga mencerminkan estimasi arus kas masa depan.",
                isWise: true
            }
        ];
    }

    getCurrentBubbleFundamental(round = null) {
        const r = round !== null ? round : this.bubbleState.round;
        const remainingRounds = Math.max(0, this.bubbleState.maxRounds - r + 1);
        return remainingRounds * 10000;
    }

    getCurrentBubbleMarketPrice(round = null) {
        const r = round !== null ? round : this.bubbleState.round;
        const fund = this.getCurrentBubbleFundamental(r);
        // Profil gelembung spekulatif Vernon Smith
        if (r === 1) return Math.round(fund * 1.05);  // Rp 63.000 (Fair / Sedikit Optimis)
        if (r === 2) return Math.round(fund * 1.35);  // Rp 67.500 (Gelembung Mulai Terbentuk)
        if (r === 3) return Math.round(fund * 1.75);  // Rp 70.000 (Euforia Spekulasi Menguat)
        if (r === 4) return Math.round(fund * 2.25);  // Rp 67.500 (Puncak Gelembung Ekstrem)
        if (r === 5) return Math.round(fund * 0.85);  // Rp 17.000 (CRASH / Minsky Moment Meletus)
        if (r === 6) return Math.round(fund * 0.70);  // Rp 7.000  (Likuiditas Beku / Menuju Rp 0)
        return fund;
    }

    getBubbleMarketStateInfo(round = null) {
        const r = round !== null ? round : this.bubbleState.round;
        const fund = this.getCurrentBubbleFundamental(r);
        const price = this.getCurrentBubbleMarketPrice(r);
        const ratio = fund > 0 ? (price / fund) : (price > 0 ? 99 : 1);

        let badge = "Nilai Wajar";
        let color = "#16a34a";
        let phaseDesc = "Harga mencerminkan nilai wajar dividen.";

        if (r === 2) {
            badge = "Gelembung Awal";
            color = "#0284c7";
            phaseDesc = "Spekulan mulai memompa harga di atas fundamental.";
        } else if (r === 3) {
            badge = "Euforia Spekulatif";
            color = "#d97706";
            phaseDesc = "Investor bertaruh pada momentum (Greater Fool Theory).";
        } else if (r === 4) {
            badge = "Puncak Gelembung Kritis";
            color = "#dc2626";
            phaseDesc = "Harga melesat +125% di atas nilai wajar. Waspada crash!";
        } else if (r === 5) {
            badge = "BUBBLE BURST (CRASH!)";
            color = "#991b1b";
            phaseDesc = "Gelembung meletus! Penjual panik membanting harga ke bawah nilai wajar.";
        } else if (r === 6) {
            badge = "Likuidasi Aset (Rp 0)";
            color = "#475569";
            phaseDesc = "Putaran terakhir. Seluruh saham akan bernilai Rp 0 setelah dividen dibagi.";
        }

        return {
            round: r,
            fundamental: fund,
            marketPrice: price,
            bubbleRatio: parseFloat(ratio.toFixed(2)),
            badge: badge,
            color: color,
            phaseDesc: phaseDesc
        };
    }

    playBubbleRound(action) {
        if (this.bubbleState.isFinished) return null;

        const r = this.bubbleState.round;
        const fundamental = this.getCurrentBubbleFundamental(r);
        const marketPrice = this.getCurrentBubbleMarketPrice(r);
        const ratio = fundamental > 0 ? (marketPrice / fundamental) : 1;

        // Dividen acak kuartal berjalan (rata-rata 10.000, rentang 7.000 - 13.000)
        const dividend = Math.floor(Math.random() * 6000) + 7000;

        let execShares = 0;
        let note = "Tahan Aset (Hold)";
        let isWise = false;
        let clueTitle = "";
        let clueDetail = "";
        let realCase = "";

        if (action === "buy") {
            const qtyToBuy = 2;
            const cost = qtyToBuy * marketPrice;
            if (this.bubbleState.cash >= cost) {
                this.bubbleState.cash -= cost;
                this.bubbleState.shares += qtyToBuy;
                execShares = qtyToBuy;
                note = `Beli +${qtyToBuy} Saham @ Rp ${marketPrice.toLocaleString('id-ID')}`;

                if (r <= 2) {
                    isWise = true;
                    clueTitle = "✅ Langkah Masuk Dini yang Masuk Akal";
                    clueDetail = `Anda mengakumulasi saham saat rasio harga terhadap fundamental masih terukur (${ratio.toFixed(2)}x). Anda mengamankan arus dividen putaran awal.`;
                    realCase = "Mirip investor *value investing* yang membeli saham berfundamental sehat pada fase awal ekspansi pasar.";
                } else if (r >= 3 && r <= 4) {
                    isWise = false;
                    clueTitle = "❌ Terjebak FOMO / Greater Fool Trap";
                    clueDetail = `Anda MEMBELI di puncak gelembung dengan harga ${ratio.toFixed(2)}x lipat di atas nilai wajar fundamental! Secara teori perilaku keuangan, Anda bertaruh akan ada 'orang yang lebih bodoh' yang bersedia membeli lebih mahal sebelum crash.`;
                    realCase = "Persis jebakan investor ritel pada puncak *Dot-com Bubble 2000* (membeli saham Pets.com) atau *Crypto Frenzy 2021* menjelang pengetatan suku bunga global.";
                } else {
                    isWise = false;
                    clueTitle = "💥 Menangkap Pisau Jatuh (Catching Falling Knife)";
                    clueDetail = `Anda membeli aset saat gelembung sedang meletus menuju likuidasi putaran 6 di mana nilai intrinsik sisa dividen mendekati Rp 0.`;
                    realCase = "Mirip spekulan yang terus membeli saham Lehman Brothers atau Enron saat harga terjun bebas menjelang kebangkrutan.";
                }
            } else {
                note = "Gagal Beli (Saldo Kas Tidak Mencukupi)";
                clueTitle = "⚠️ Likuiditas Kas Tidak Cukup";
                clueDetail = "Anda tidak memiliki cukup uang tunai untuk mengeksekusi pembelian 2 lot saham di harga pasar saat ini.";
                realCase = "Kendala likuiditas kas (*liquidity constraint*) sering kali menyelamatkan investor dari aksi spekulasi berlebihan.";
            }
        } else if (action === "sell") {
            const qtyToSell = Math.min(2, this.bubbleState.shares);
            if (qtyToSell > 0) {
                const proceeds = qtyToSell * marketPrice;
                this.bubbleState.cash += proceeds;
                this.bubbleState.shares -= qtyToSell;
                execShares = -qtyToSell;
                note = `Jual -${qtyToSell} Saham @ Rp ${marketPrice.toLocaleString('id-ID')}`;

                if (r >= 3 && r <= 4) {
                    isWise = true;
                    clueTitle = "🏆 Eksekusi Brilian: Smart Profit-Taking!";
                    clueDetail = `Anda merealisasikan keuntungan (*take profit*) di harga puncak gelembung spekulatif saat harga overvalued ${ratio.toFixed(2)}x lipat. Kas yang Anda kunci aman dari kehancuran crash putaran berikutnya!`;
                    realCase = "Sama persis dengan strategi investor kawakan Bernard Baruch yang selamat dari *Great Crash 1929* dengan prinsip: 'Saya menjadi kaya karena selalu menjual terlalu cepat.'";
                } else if (r <= 2) {
                    isWise = false;
                    clueTitle = "⚠️ Menjual Terlalu Dini";
                    clueDetail = "Anda melepas saham saat gelembung baru mulai terbentuk dan membuang hak dividen putaran mendatang saat harga masih mendekati nilai fundamental.";
                    realCase = "Mirip investor yang melepas aset produktif terlalu awal sebelum siklus pertumbuhan modal terealisasi penuh.";
                } else {
                    isWise = true;
                    clueTitle = "🛡️ Cut Loss / Penyelamatan Likuiditas Terakhir";
                    clueDetail = "Anda menjual sisa saham saat crash untuk mengamankan kas sebelum seluruh aset kehilangan nilai di akhir putaran 6.";
                    realCase = "Manajemen risiko disiplin (*stop-loss*) untuk mencegah modal menguap menjadi nol.";
                }
            } else {
                note = "Gagal Jual (Tidak Memiliki Saham)";
                clueTitle = "ℹ️ Anda Sudah Tidak Memiliki Saham";
                clueDetail = "Seluruh posisi saham Anda sudah terlikuidasi menjadi kas tunai murni.";
                realCase = "Memegang 100% kas tunai saat pasar saham mengalami badai kehancuran (*cash is king*).";
            }
        } else {
            // HOLD
            note = "Tahan Posisi (Hold)";
            if (r >= 3 && r <= 4 && this.bubbleState.shares > 0) {
                isWise = false;
                clueTitle = "⚠️ Menunggangi Gelembung (Riding the Bubble)";
                clueDetail = `Anda memilih menahan ${this.bubbleState.shares} lot saham saat harga pasar sudah ${ratio.toFixed(2)}x di atas fundamental. Anda menikmati dividen, namun menanggung risiko kejatuhan modal (*capital loss*) dahsyat saat crash tiba.`;
                realCase = "Kondisi fisikawan jenius Sir Isaac Newton dalam *South Sea Bubble 1720*: menolak menjual saat harga mahal hingga akhirnya kehilangan kekayaannya saat gelembung pecah.";
            } else if (r === 5 && this.bubbleState.shares > 0) {
                isWise = false;
                clueTitle = "💥 Terjebak Bagholder!";
                clueDetail = "Gelembung meletus! Harga pasar anjlok drastis dan Anda menelan penurunan nilai kekayaan bersih secara langsung.";
                realCase = "Fenomena *bagholder* di mana investor ritel enggan menjual saat rugi (*loss aversion*) hingga nilai aset habis terbakar.";
            } else {
                isWise = true;
                clueTitle = "✅ Bertahan Netral & Disiplin";
                clueDetail = "Anda mempertahankan posisi yang seimbang antara kas dan kepemilikan saham sesuai fase siklus pasar.";
                realCase = "Menjaga stabilitas portofolio saat volatilitas jangka pendek meningkat.";
            }
        }

        // Penerimaan dividen putaran berjalan untuk saham yang dipegang
        const dividendIncome = this.bubbleState.shares * dividend;
        this.bubbleState.cash += dividendIncome;

        // Total kekayaan bersih (Net Worth)
        const totalNetWorth = this.bubbleState.cash + (this.bubbleState.shares * marketPrice);

        this.bubbleState.history.push({
            round: r,
            price: marketPrice,
            fundamental: fundamental,
            bubbleRatio: parseFloat(ratio.toFixed(2)),
            dividend: dividend,
            playerAction: note,
            actionType: action,
            shares: this.bubbleState.shares,
            cash: this.bubbleState.cash,
            netWorth: totalNetWorth,
            isWise: isWise,
            clueTitle: clueTitle,
            clueDetail: clueDetail,
            realCase: realCase
        });

        this.bubbleState.round++;
        const isFinished = this.bubbleState.round > this.bubbleState.maxRounds;
        if (isFinished) {
            this.bubbleState.isFinished = true;
            this.bubbleState.endgameSummary = this.calculateBubbleEndgameScorecard();
        }

        return {
            round: r,
            marketPrice: marketPrice,
            fundamental: fundamental,
            bubbleRatio: parseFloat(ratio.toFixed(2)),
            dividend: dividend,
            actionNote: note,
            isWise: isWise,
            clueTitle: clueTitle,
            clueDetail: clueDetail,
            realCase: realCase,
            totalNetWorth: totalNetWorth,
            isCrash: r === 5,
            isFinished: isFinished,
            endgameSummary: this.bubbleState.endgameSummary
        };
    }

    calculateBubbleEndgameScorecard() {
        const hist = this.bubbleState.history;
        const finalNetWorth = hist[hist.length - 1].netWorth;
        const initial = this.bubbleState.initialNetWorth; // 800000
        const profit = finalNetWorth - initial;
        const returnPct = Math.round((profit / initial) * 100);

        // Simulasi benchmark strategi pasif Buy & Hold: tidak pernah jual 5 lot awal
        const passiveNetWorth = 585000;

        let grade = "C";
        let title = "Korban Gelembung Spekulatif (Bagholder)";
        let badgeColor = "#dc2626";
        let evaluationText = "Anda menelan kerugian karena memegang aset berisiko saat gelembung spekulatif meletus. Anda terjebak 'Greater Fool Theory' dan gagal merealisasikan kas sebelum crash tiba.";

        if (finalNetWorth >= 950000) {
            grade = "A";
            title = "Master Market Timing & Value Investor";
            badgeColor = "#16a34a";
            evaluationText = "Luar biasa! Anda memahami psikologi pasar Vernon Smith secara sempurna. Anda berhasil menjual di puncak euforia gelembung dan mengamankan kas berlimpah saat pasar ambruk!";
        } else if (finalNetWorth >= 800000) {
            grade = "B";
            title = "Investor Spekulan Moderat";
            badgeColor = "#0284c7";
            evaluationText = "Cukup baik! Modal awal Anda tetap utuh dan mencatat imbal hasil positif. Namun, Anda masih bisa mengoptimalkan waktu penjualan di puncak gelembung (putaran 3-4) untuk meraup laba maksimal.";
        }

        return {
            grade: grade,
            title: title,
            badgeColor: badgeColor,
            finalNetWorth: finalNetWorth,
            initialNetWorth: initial,
            profit: profit,
            returnPct: returnPct,
            passiveNetWorth: passiveNetWorth,
            passiveProfit: passiveNetWorth - initial,
            evaluationText: evaluationText,
            history: hist.filter(h => h.round > 0)
        };
    }

    // ==========================================================================
    // GAME 2: THE MARKET COMPETITION & CAPACITY GAME (OLIGOPOLI & STRUKTUR PASAR)
    // ==========================================================================
    initCompGame() {
        this.compState.round = 1;
        this.compState.capital = 150000000;
        this.compState.history = [];
        this.compState.isFinished = false;
        this.compState.endgameSummary = null;
    }

    calculateBreakevenPrice(qty) {
        const q = Math.max(500, Number(qty) || 3500);
        // P_BE = MC + (FC / Q)
        const bePrice = this.compState.marginalCost + Math.round(this.compState.fixedCost / q);
        return bePrice;
    }

    playCompRound(playerQty, playerPrice) {
        if (this.compState.isFinished) return null;

        const r = this.compState.round;
        const bePrice = this.calculateBreakevenPrice(playerQty);
        
        // 3 Kompetitor menetapkan strategi harga & kuantitas
        const comp1Price = Math.round(52000 + (Math.random() * 8000 - 4000));  // Pesaing Biaya Rendah
        const comp2Price = Math.round(62000 + (Math.random() * 10000 - 5000)); // Pesaing Moderat
        const comp3Price = Math.round(72000 + (Math.random() * 8000 - 4000));  // Pesaing Kualitas Premium
        
        const avgMarketPrice = Math.round((playerPrice + comp1Price + comp2Price + comp3Price) / 4);
        
        // Fungsi Permintaan Agregat Industri: Q_D = 26.000 - (0.22 * avgMarketPrice)
        const totalMarketDemand = Math.max(3000, Math.round(26000 - (0.22 * avgMarketPrice)));
        
        // Pangsa pasar ditentukan oleh elastisitas harga silang terhadap rata-rata industri
        let priceRatio = avgMarketPrice / Math.max(10000, playerPrice);
        let playerShare = 0.25 * Math.pow(priceRatio, 1.45);
        playerShare = Math.min(0.55, Math.max(0.06, playerShare));
        
        const potentialDemand = Math.round(totalMarketDemand * playerShare);
        const actualSold = Math.min(playerQty, potentialDemand);
        const unsoldInventory = Math.max(0, playerQty - actualSold);
        
        const revenue = actualSold * playerPrice;
        const varCost = playerQty * this.compState.marginalCost; // Biaya variabel melekat pada jumlah yang diproduksi
        const totalCost = this.compState.fixedCost + varCost;
        const netProfit = revenue - totalCost;
        
        this.compState.capital += netProfit;

        // Diagnosa Manajerial Teori x Eksekusi
        let isWise = netProfit > 0;
        let diagnosisTitle = "";
        let diagnosisDetail = "";
        let realCase = "";

        if (playerPrice < bePrice) {
            isWise = false;
            diagnosisTitle = "❌ Terjebak Perang Harga Destruktif (Bertrand Trap)";
            diagnosisDetail = `Harga jual Anda (Rp ${playerPrice.toLocaleString('id-ID')}) berada di bawah Titik Impas (Rp ${bePrice.toLocaleString('id-ID')}). Setiap unit yang Anda produksi dan jual menghasilkan kerugian bersih karena marjin kotor tidak mampu menutup Biaya Tetap Rp 40 Juta!`;
            realCase = "Persis seperti *Perang Tarif Maskapai Penerbangan LCC Indonesia* di era 2000-an (Bouraq, Sempati, Adam Air) yang menjual tiket di bawah struktur biaya operasional hingga akhirnya ambruk dan ditertibkan Kemenhub melalui batas Tarif Batas Bawah (TBB).";
        } else if (unsoldInventory > (playerQty * 0.35)) {
            isWise = false;
            diagnosisTitle = "⚠️ Jebakan Kapasitas Menganggur (Idle Capacity Waste)";
            diagnosisDetail = `Anda memproduksi ${playerQty.toLocaleString('id-ID')} unit tetapi hanya terserap ${actualSold.toLocaleString('id-ID')} unit (${unsoldInventory.toLocaleString('id-ID')} unit mengendap sia-sia). Harga Anda terlalu mahal dibanding rival (Rata-rata Pasar: Rp ${avgMarketPrice.toLocaleString('id-ID')}).`;
            realCase = "Mirip krisis *overcapacity industri semen dan baja nasional*, di mana utilitas pabrik anjlok di bawah 60% akibat ekspansi kapasitas agresif yang tidak diimbangi daya serap pasar riil.";
        } else if (netProfit >= 15000000) {
            isWise = true;
            diagnosisTitle = "🏆 Strategi Optimal: Market Leader & Profit Maximizer!";
            diagnosisDetail = `Bagus sekali! Anda menyeimbangkan kapasitas ${playerQty.toLocaleString('id-ID')} unit dengan harga Rp ${playerPrice.toLocaleString('id-ID')} yang kompetitif terhadap 3 rival. Kapasitas terserap optimal (${Math.round((actualSold/playerQty)*100)}%) dan membukukan laba bersih Rp ${Math.round(netProfit/1000000)} Juta!`;
            realCase = "Model keberhasilan korporasi oligopoli yang menjaga marjin sehat tanpa memicu perang harga berdarah (misalnya strategi penetapan harga industri otomotif multi-brand Toyota & Honda di Indonesia).";
        } else {
            isWise = true;
            diagnosisTitle = "✅ Beroperasi dengan Laba Moderat";
            diagnosisDetail = `Pabrik beroperasi menutup seluruh biaya tetap dan mencetak laba bersih Rp ${Math.round(netProfit/1000000)} Juta. Efisiensi kapasitas mencapai ${Math.round((actualSold/playerQty)*100)}%.`;
            realCase = "Strategi operasional yang stabil dalam pasar persaingan oligopoli matang.";
        }

        this.compState.history.push({
            round: r,
            playerPrice: playerPrice,
            playerQty: playerQty,
            bePrice: bePrice,
            avgMarketPrice: avgMarketPrice,
            actualSold: actualSold,
            unsold: unsoldInventory,
            revenue: revenue,
            totalCost: totalCost,
            netProfit: netProfit,
            capital: this.compState.capital,
            marketSharePct: Math.round(playerShare * 100),
            isWise: isWise,
            diagnosisTitle: diagnosisTitle,
            diagnosisDetail: diagnosisDetail,
            realCase: realCase
        });

        this.compState.round++;
        const isFinished = this.compState.round > this.compState.maxRounds;
        if (isFinished) {
            this.compState.isFinished = true;
            this.compState.endgameSummary = this.calculateCompEndgameScorecard();
        }

        return {
            round: r,
            playerPrice: playerPrice,
            playerQty: playerQty,
            bePrice: bePrice,
            avgMarketPrice: avgMarketPrice,
            actualSold: actualSold,
            unsold: unsoldInventory,
            revenue: revenue,
            netProfit: netProfit,
            capital: this.compState.capital,
            marketSharePct: Math.round(playerShare * 100),
            isWise: isWise,
            diagnosisTitle: diagnosisTitle,
            diagnosisDetail: diagnosisDetail,
            realCase: realCase,
            isFinished: isFinished,
            endgameSummary: this.compState.endgameSummary
        };
    }

    calculateCompEndgameScorecard() {
        const hist = this.compState.history;
        const finalCapital = this.compState.capital;
        const initial = this.compState.initialCapital; // 150000000
        const totalProfit = finalCapital - initial;
        const avgShare = Math.round(hist.reduce((acc, h) => acc + h.marketSharePct, 0) / hist.length);

        let grade = "C";
        let title = "Korban Perang Harga / Kapasitas Mubazir";
        let badgeColor = "#dc2626";
        let evaluation = "Pabrik Anda mengalami penurunan modal kas akibat penetapan harga di bawah titik impas atau kapasitas produksi yang tidak terserap pasar.";

        if (finalCapital >= 200000000) {
            grade = "A";
            title = "Pemimpin Pasar & Pengendali Oligopoli (Market Leader)";
            badgeColor = "#16a34a";
            evaluation = "Hebat! Anda berhasil menavigasi struktur pasar oligopoli dengan kalkulasi titik impas presisi, menghindari jebakan perang tarif Bertrand, dan memperbesar kas pabrik secara signifikan.";
        } else if (finalCapital >= 150000000) {
            grade = "B";
            title = "Produsen Bertahan Sehat (Resilient Competitor)";
            badgeColor = "#0284c7";
            evaluation = "Pabrik Anda sukses mempertahankan modal dan menghasilkan laba positif. Anda dapat meningkatkan utilisasi kapasitas dan menguji marjin harga yang sedikit lebih berani.";
        }

        return {
            grade: grade,
            title: title,
            badgeColor: badgeColor,
            finalCapital: finalCapital,
            initialCapital: initial,
            totalProfit: totalProfit,
            avgShare: avgShare,
            evaluation: evaluation,
            history: hist
        };
    }

    // ==========================================================================
    // GAME 3: THE MACRO POLICY SHOCK LAB (MODEL AD-AS & TEKNIKAL BAURAN)
    // ==========================================================================
    getShockScenario(round) {
        const scenarios = [
            {
                id: 1,
                title: "🛢️ Skenario 1: Adverse Supply Shock (Lonjakan Harga Minyak Dunia 120%)",
                eyebrow: "GUNCANGAN PENAWARAN AGREGAT (COST-PUSH SHOCK)",
                desc: "Perang geopolitik meletus. Harga minyak mentah dunia melompat di atas $110/barel. Biaya transportasi logistik, pupuk, dan bahan bakar pabrik membengkak tajam. Kurva Penawaran Agregat Jangka Pendek (SRAS) bergeser drastis ke kiri atas.",
                baseInflation: 7.8,
                baseGrowth: 2.1,
                targetNote: "Jangkar ekspektasi inflasi agar tidak menjadi hiperinflasi spiral, namun berikan bantalan fiskal terarah agar daya beli masyarakat miskin tidak runtuh.",
                optimalMix: {
                    biRate: 6.75,
                    govSpending: 3500,
                    taxRate: 11.0,
                    label: "Bauran: Pengetatan Moneter Terukur + Bantalan Fiskal Targeted"
                },
                whyTheory: "Kurva SRAS yang bergeser ke kiri memicu dilema Stagflasi (Inflasi tinggi 7.8% sekaligus pertumbuhan lesu 2.1%). Bank sentral harus menaikkan BI-Rate secara terukur (+75 bps ke 6.75%) untuk memutus ekspektasi inflasi putaran kedua (second-round effect). Secara simultan, Pemerintah menaikkan Belanja G ke Rp 3.500 T khusus untuk subsidi energi terarah dan bantuan pangan (shock absorber) agar konsumsi riil tidak anjlok ke jurang resesi.",
                historicalCase: {
                    title: "Lonjakan Minyak Dunia 2022 & Kebijakan Bantalan APBN Indonesia",
                    detail: "Saat perang Rusia-Ukraina meletus tahun 2022, harga minyak ICP melesat di atas $100/barel. Pemerintah dan DPR memperbesar anggaran subsidi & kompensasi energi APBN hingga mencapai rekor Rp 502,4 Triliun untuk menahan lonjakan harga Pertalite dan Solar. Bank Indonesia menaikkan BI7DRR bertahap 225 bps ke 5.75% dipadu dengan intervensi stabilisasi valas. Hasilnya: Inflasi Indonesia 2022 terkendali di 5.51% (salah satu terendah di antara negara G20) dan PDB tetap tumbuh tangguh 5.31%!"
                }
            },
            {
                id: 2,
                title: "📉 Skenario 2: Collapse of Aggregate Demand (Pesimisme Konsumen & Dunia Usaha)",
                eyebrow: "GUNCANGAN PERMINTAAN AGREGAT (DEMAND DEFICIT)",
                desc: "Ketidakpastian ekonomi global membuat masyarakat menahan belanja dan dunia usaha membekukan ekspansi. Konsumsi swasta (C) dan investasi (I) anjlok 30%. Kurva Permintaan Agregat (AD) runtuh ke kiri bawah memicu ancaman resesi deflasioner.",
                baseInflation: 1.2,
                baseGrowth: 1.4,
                targetNote: "Pacu kembali agregat belanja domestik (AD) secara agresif sebelum gelombang PHK massal dan kebangkrutan usaha meluas.",
                optimalMix: {
                    biRate: 4.25,
                    govSpending: 3900,
                    taxRate: 9.5,
                    label: "Bauran: Kebijakan Makroekonomi Ekspansif Ganda (Fiskal & Moneter Berani)"
                },
                whyTheory: "Ketika sektor swasta mengalami fenomena 'Paradoks Berhemat' (Paradox of Thrift), hanya negara yang memiliki neraca untuk menggerakkan roda ekonomi. Pemerintah harus mengeksekusi ekspansi fiskal masif (G dinaikkan ke Rp 3.900 T) dan memangkas tarif pajak efektif ke 9.5% untuk memanfaatkan Pengganda Fiskal (Fiscal Multiplier). Bank sentral wajib melonggarkan moneter dengan memangkas BI-Rate ke 4.25% dan menyuntikkan likuiditas perbankan (Quantitative Easing) guna menekan biaya pinjaman modal kerja.",
                historicalCase: {
                    title: "Krisis Pandemi COVID-19 2020 & Skema Bersejarah Burden Sharing",
                    detail: "Aktivitas masyarakat lumpuh total pada 2020. Pemerintah menerbitkan UU No. 2/2020 untuk secara legal melonggarkan batas defisit APBN di atas 3% PDB (mencapai 6.13% PDB) guna mendanai Program Pemulihan Ekonomi Nasional (PEN) senilai Rp 695 Triliun. Bank Indonesia melakukan langkah luar biasa 'Burden Sharing' dengan membeli Surat Berharga Negara (SBN) langsung di pasar perdana senilai Rp 397,5 Triliun dan memangkas BI-Rate ke titik terendah dalam sejarah (3.50%). Indonesia terhindar dari krisis sistemik dan pulih cepat berbentuk V-Shape pada 2021."
                }
            },
            {
                id: 3,
                title: "💵 Skenario 3: Global Monetary Tightening (The Fed Rate Hike & Capital Outflow)",
                eyebrow: "GUNCANGAN SEKTOR EKSTERNAL & KURS VALAS",
                desc: "Bank Sentral AS (The Fed) menaikkan suku bunga acuan 400 basis poin untuk memadamkan inflasi domestiknya. Aliran modal asing keluar deras dari negara berkembang (capital flight), menekan kurs Rupiah terdepresiasi tajam dan memicu risiko Imported Inflation.",
                baseInflation: 5.6,
                baseGrowth: 3.7,
                targetNote: "Jaga stabilitas nilai tukar Rupiah dan ketahanan cadangan devisa tanpa mencekik likuiditas kredit perbankan domestik.",
                optimalMix: {
                    biRate: 6.50,
                    govSpending: 3100,
                    taxRate: 11.0,
                    label: "Bauran: Kenaikan Suku Bunga Preemptive + Disiplin Pengeluaran APBN"
                },
                whyTheory: "Diferensiasi suku bunga (interest rate differential) antara SBN dan US Treasury menyempit, memicu investor global melepas aset Rupiah. BI harus menaikkan BI-Rate ke 6.50% untuk menjaga daya tarik imbal hasil aset domestik dan meredam pelemahan kurs. Pemerintah wajib menjaga disiplin APBN (G Rp 3.100 T) untuk mengirimkan sinyal kredibilitas fiskal yang kuat kepada lembaga pemeringkat kredit internasional (S&P, Moody's, Fitch).",
                historicalCase: {
                    title: "Siklus Kenaikan Suku Bunga The Fed Tercepat 2022-2023 & Inovasi SRBI",
                    detail: "The Fed menaikkan bunga dari 0.25% ke 5.50%. Menghindari kenaikan bunga ekstrem yang bisa memukul UMKM, Bank Indonesia berinovasi meluncurkan Sekuritas Rupiah Bank Indonesia (SRBI) dan Sekuritas Valas (SVBI) berimbal hasil pro-market untuk menarik dana asing (capital inflow) tanpa menaikkan BI-Rate terlalu tinggi. Di saat yang sama, Pemerintah menerbitkan PP No. 36/2023 tentang Devisa Hasil Ekspor (DHE SDA) untuk memarkir devisa di dalam negeri."
                }
            },
            {
                id: 4,
                title: "🌟 Skenario 4: Export Commodity Boom & Threat of Overheating",
                eyebrow: "REZEKI NOMPLOK KOMODITAS & ANCAMAN PENYAKIT BELANDA",
                desc: "Harga komoditas ekspor unggulan (nikel, batu bara, CPO) meroket di pasar internasional. Ekspor surplus mencatat rekor tertinggi, penerimaan pajak melonjak, namun likuiditas yang melimpah berisiko memicu Overheating dan gelembung spekulasi aset properti.",
                baseInflation: 6.4,
                baseGrowth: 6.7,
                targetNote: "Redam risiko ekonomi terlalu panas (Overheating), cegah Penyakit Belanda (Dutch Disease), dan tabung rezeki nomplok untuk masa depan.",
                optimalMix: {
                    biRate: 6.25,
                    govSpending: 2950,
                    taxRate: 12.0,
                    label: "Bauran: Kebijakan Fiskal Kontra-Siklikal (Konsolidasi Fiskal Cepat)"
                },
                whyTheory: "Saat ekonomi mengalami ledakan pendapatan akibat komoditas eksternal, kurva AD terdorong ke kanan melampaui output potensial (LRAS), memicu inflasi tarikan permintaan (demand-pull). Kebijakan terbaik adalah Fiskal Kontra-Siklikal: Pemerintah justru menahan belanja (G Rp 2.950 T) dan memungut penerimaan komoditas optimal (Pajak 12.0%) untuk mempercepat penurunan defisit anggaran dan menabung surplus ke dalam sovereign wealth fund / saldo kas cadangan.",
                historicalCase: {
                    title: "Windfall Komoditas 2021-2022 & Keberhasilan Konsolidasi Fiskal Cepat",
                    detail: "Booming harga batu bara dan sawit menyumbang lonjakan penerimaan negara ratusan triliun rupiah. Pemerintah Indonesia tidak tergoda membelanjakan seluruh uang tersebut untuk belanja rutin, melainkan mempercepat penyehatan APBN: defisit anggaran 2022 berhasil ditekan ke 2.38% PDB—setahun penuh lebih cepat dari mandat UU No. 2/2020! Sisa surplus ditabung ke Saldo Anggaran Lebih (SAL) dan dialokasikan ke Dana Abadi Pendidikan (LPDP) untuk investasi jangka panjang generasi mendatang."
                }
            }
        ];
        return scenarios[(round - 1) % scenarios.length];
    }

    evaluatePolicyMix(shock, biRate, govSpending, taxRate) {
        let growth = shock.baseGrowth;
        let inflation = shock.baseInflation;

        // Deviasi dari bauran ideal
        const opt = shock.optimalMix;
        const biDiff = biRate - opt.biRate;
        const gDiff = (govSpending - opt.govSpending) / 1000;
        const tDiff = taxRate - opt.taxRate;

        // Model transmisi makroekonomi
        growth += (gDiff * 1.35) - (biDiff * 0.55) - (tDiff * 0.40);
        inflation += (gDiff * 0.95) - (biDiff * 0.85) - (tDiff * 0.25);

        // Deviasi absolut dari target bauran optimal
        const biError = Math.abs(biRate - opt.biRate);
        const gError = Math.abs(govSpending - opt.govSpending);
        const tError = Math.abs(taxRate - opt.taxRate);

        // Skor penalti Taylor Loss
        const totalErrorScore = (biError * 22) + ((gError / 100) * 12) + (tError * 14);

        let grade = "A";
        let gradeLabel = "Eksekusi Teknokratik Sempurna (Nilai: A)";
        let badgeColor = "#16a34a";
        let feedbackSummary = "Bauran kebijakan moneter dan fiskal Anda sangat presisi! Anda berhasil menyeimbangkan stabilitas harga tanpa mengorbankan pertumbuhan ekonomi sektor riil.";

        if (totalErrorScore > 65) {
            grade = "C";
            gradeLabel = "Bauran Kurang Tepat / Berisiko (Nilai: C)";
            badgeColor = "#dc2626";
            feedbackSummary = "Bauran kebijakan mengalami deviasi besar dari jalur optimal. Anda menghadapi risiko inflasi yang tidak terkendali atau kontraksi ekonomi yang terlalu dalam akibat kombinasi instrumen yang kurang selaras.";
        } else if (totalErrorScore > 30) {
            grade = "B";
            gradeLabel = "Cukup Baik & Terarah (Nilai: B)";
            badgeColor = "#0284c7";
            feedbackSummary = "Keputusan makro Anda sudah berada pada arah yang benar, namun kalibrasi besaran suku bunga atau belanja negara masih dapat diperketat agar stabilitas dan pemulihan tercapai lebih cepat.";
        }

        const evaluationResult = {
            round: shock.id,
            shockTitle: shock.title,
            grade: grade,
            gradeLabel: gradeLabel,
            badgeColor: badgeColor,
            feedbackSummary: feedbackSummary,
            simulatedGrowth: parseFloat(Math.max(0.2, growth).toFixed(2)),
            simulatedInflation: parseFloat(Math.max(0.5, inflation).toFixed(2)),
            userInputs: { biRate, govSpending, taxRate },
            optimalMix: opt,
            whyTheory: shock.whyTheory,
            historicalCase: shock.historicalCase
        };

        this.shockState.history.push(evaluationResult);
        return evaluationResult;
    }
}

// Inisialisasi global engine
if (typeof window !== 'undefined') {
    window.econGamesEngine = new EconomicsGamesEngine();
}
