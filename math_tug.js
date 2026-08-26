/**
 * ============================================================
 * MATH TUG OF WAR (TARIK TAMBANG CERIA SD) - GAME ENGINE
 * Logika Permainan 2 Grup Bersamaan, Aba-Aba Countdown 3-2-1,
 * Visualisasi Taman Outdoor Imut (Chibi Panda vs Chibi Kelinci),
 * dan Fisika Tarikan Tali Real-Time.
 * ============================================================
 */

class MathTugGame {
    constructor() {
        // Canvases & Context
        this.canvas = document.getElementById('tugCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Setup Resolution
        this.canvas.width = 900;
        this.canvas.height = 220;

        // UI Header Elements
        this.timerDisplay = document.getElementById('roundTimerDisplay');
        this.levelDisplay = document.getElementById('levelBadgeDisplay');
        this.btnMusic = document.getElementById('btnMusicTug');
        this.btnSound = document.getElementById('btnSoundTug');
        this.btnPause = document.getElementById('btnPauseTug');

        // Team 1 (Red / Panda) UI Elements
        this.redTeamNameEl = document.getElementById('redTeamNameDisplay');
        this.redScoreEl = document.getElementById('redScoreDisplay');
        this.redComboEl = document.getElementById('redComboDisplay');
        this.redCatEl = document.getElementById('redCategoryDisplay');
        this.redQuestionEl = document.getElementById('redQuestionDisplay');
        this.redChoicesContainer = document.getElementById('redChoicesGrid');
        this.redPenaltyOverlay = document.getElementById('redPenaltyOverlay');
        this.redPenaltyTimerEl = document.getElementById('redPenaltyTimer');

        // Team 2 (Blue / Bunny) UI Elements
        this.blueTeamNameEl = document.getElementById('blueTeamNameDisplay');
        this.blueScoreEl = document.getElementById('blueScoreDisplay');
        this.blueComboEl = document.getElementById('blueComboDisplay');
        this.blueCatEl = document.getElementById('blueCategoryDisplay');
        this.blueQuestionEl = document.getElementById('blueQuestionDisplay');
        this.blueChoicesContainer = document.getElementById('blueChoicesGrid');
        this.bluePenaltyOverlay = document.getElementById('bluePenaltyOverlay');
        this.bluePenaltyTimerEl = document.getElementById('bluePenaltyTimer');

        // Gauge Pointer
        this.gaugePointer = document.getElementById('tugGaugePointer');

        // Countdown Aba-Aba Elements
        this.countdownOverlay = document.getElementById('countdownOverlay');
        this.countdownNumber = document.getElementById('countdownNumber');
        this.countdownLabel = document.getElementById('countdownLabel');

        // Modals
        this.setupModal = document.getElementById('setupModal');
        this.pauseModal = document.getElementById('pauseModal');
        this.victoryModal = document.getElementById('victoryModal');
        this.winnerMascotEl = document.getElementById('winnerMascotDisplay');
        this.winnerTitleEl = document.getElementById('winnerTitleDisplay');
        this.winnerSubtitleEl = document.getElementById('winnerSubtitleDisplay');
        this.redTotalCorrectEl = document.getElementById('redTotalCorrect');
        this.blueTotalCorrectEl = document.getElementById('blueTotalCorrect');

        // Buttons
        this.btnStartMatch = document.getElementById('btnStartMatch');
        this.btnResume = document.getElementById('btnResumeTug');
        this.btnRestartPause = document.getElementById('btnRestartPauseTug');
        this.btnPlayAgain = document.getElementById('btnPlayAgain');

        // Game Configuration & Settings
        this.selectedLevel = 1; // 1 = Kelas 1-2, 2 = Kelas 3-4, 3 = Kelas 5-6, 4 = Campuran
        this.roundDuration = 60; // seconds (0 = unlimited)
        this.redTeamName = 'Tim Merah 🐼';
        this.blueTeamName = 'Tim Biru 🐰';

        // Game States
        this.isPlaying = false;
        this.isCountingDown = false;
        this.isPaused = false;
        this.timeLeft = 60;
        this.timerInterval = null;

        // Rope Physics
        // -100 = Red Team Win, +100 = Blue Team Win, 0 = Center
        this.ropePos = 0;
        this.displayRopePos = 0;

        // Team States
        this.redState = {
            score: 0,
            combo: 0,
            totalCorrect: 0,
            totalWrong: 0,
            isLocked: false,
            lockTimer: 0,
            currentQuestion: null,
            pullAnim: 0
        };

        this.blueState = {
            score: 0,
            combo: 0,
            totalCorrect: 0,
            totalWrong: 0,
            isLocked: false,
            lockTimer: 0,
            currentQuestion: null,
            pullAnim: 0
        };

        // Static Outdoor Park Flowers
        this.parkFlowers = [];
        for (let i = 0; i < 28; i++) {
            this.parkFlowers.push({
                x: Math.random() * 880 + 10,
                y: Math.random() * 50 + 155,
                type: ['daisy', 'tulip', 'star'][Math.floor(Math.random() * 3)],
                color: ['#ffffff', '#ffd166', '#ff9ff3', '#ff758f', '#74b9ff'][Math.floor(Math.random() * 5)],
                size: Math.random() * 4 + 4
            });
        }

        // Particles & Confetti
        this.particles = [];

        this.initEventListeners();
        this.initSettingsModal();
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    initSettingsModal() {
        // Level selection buttons
        const levelBtns = document.querySelectorAll('.btn-level-select');
        levelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                levelBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedLevel = parseInt(btn.dataset.level, 10);
            });
        });

        // Time selection buttons
        const timeBtns = document.querySelectorAll('.btn-time-select');
        timeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                timeBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.roundDuration = parseInt(btn.dataset.time, 10);
            });
        });

        // Start Match Button -> Mulai Countdown Aba-aba
        this.btnStartMatch.addEventListener('click', () => {
            const inputRed = document.getElementById('inputRedTeamName').value.trim();
            const inputBlue = document.getElementById('inputBlueTeamName').value.trim();
            if (inputRed) this.redTeamName = inputRed;
            if (inputBlue) this.blueTeamName = inputBlue;

            this.startCountdown();
        });
    }

    initEventListeners() {
        // Pause and Controls
        this.btnPause.addEventListener('click', () => this.togglePause());
        this.btnResume.addEventListener('click', () => this.togglePause());
        this.btnRestartPause.addEventListener('click', () => this.openSetupModal());
        this.btnPlayAgain.addEventListener('click', () => this.openSetupModal());

        this.btnMusic.addEventListener('click', () => {
            const isMuted = mathAudio.toggleBgmMute();
            this.btnMusic.textContent = isMuted ? '🔇' : '🎵';
        });

        this.btnSound.addEventListener('click', () => {
            const isMuted = mathAudio.toggleMute();
            this.btnSound.textContent = isMuted ? '🔈' : '🔊';
        });

        // Keyboard Multi-Group Input
        window.addEventListener('keydown', (e) => {
            if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
                if (this.isPlaying && !this.isCountingDown) this.togglePause();
                return;
            }

            if (!this.isPlaying || this.isPaused || this.isCountingDown) return;

            const key = e.key.toLowerCase();

            // Grup 1 (Tim Merah): 1, 2, 3, 4 ATAU Q, W, A, S
            if (!this.redState.isLocked) {
                if (key === '1' || key === 'q') this.handleChoiceSelect('red', 0);
                else if (key === '2' || key === 'w') this.handleChoiceSelect('red', 1);
                else if (key === '3' || key === 'a') this.handleChoiceSelect('red', 2);
                else if (key === '4' || key === 's') this.handleChoiceSelect('red', 3);
            }

            // Grup 2 (Tim Biru): 7, 8, 9, 0 ATAU U, I, J, K
            if (!this.blueState.isLocked) {
                if (key === '7' || key === 'u') this.handleChoiceSelect('blue', 0);
                else if (key === '8' || key === 'i') this.handleChoiceSelect('blue', 1);
                else if (key === '9' || key === 'j') this.handleChoiceSelect('blue', 2);
                else if (key === '0' || key === 'k') this.handleChoiceSelect('blue', 3);
            }
        });
    }

    openSetupModal() {
        this.isPlaying = false;
        this.isCountingDown = false;
        if (this.timerInterval) clearInterval(this.timerInterval);
        mathAudio.stopBgm();

        this.countdownOverlay.classList.remove('active');
        this.pauseModal.classList.remove('active');
        this.victoryModal.classList.remove('active');
        this.setupModal.classList.add('active');
    }

    // --- ABA-ABA COUNTDOWN (3, 2, 1, TARIK!) ---
    startCountdown() {
        this.setupModal.classList.remove('active');
        this.pauseModal.classList.remove('active');
        this.victoryModal.classList.remove('active');

        // Reset States
        this.isPlaying = true;
        this.isCountingDown = true;
        this.isPaused = false;
        this.ropePos = 0;
        this.displayRopePos = 0;
        this.timeLeft = this.roundDuration;
        this.particles = [];

        this.redState = {
            score: 0,
            combo: 0,
            totalCorrect: 0,
            totalWrong: 0,
            isLocked: false,
            lockTimer: 0,
            currentQuestion: null,
            pullAnim: 0
        };

        this.blueState = {
            score: 0,
            combo: 0,
            totalCorrect: 0,
            totalWrong: 0,
            isLocked: false,
            lockTimer: 0,
            currentQuestion: null,
            pullAnim: 0
        };

        // Update UI Info
        this.redTeamNameEl.textContent = this.redTeamName;
        this.blueTeamNameEl.textContent = this.blueTeamName;
        this.updateTeamStatsUI('red');
        this.updateTeamStatsUI('blue');

        const levelNames = ['', 'Kelas 1-2 SD', 'Kelas 3-4 SD', 'Kelas 5-6 SD', 'Semua Kelas'];
        this.levelDisplay.textContent = levelNames[this.selectedLevel] || 'Semua Kelas';

        // Tampilkan Soal Awal di background
        this.nextQuestion('red');
        this.nextQuestion('blue');

        // Mulai Overlay Countdown
        this.countdownOverlay.classList.add('active');
        this.triggerCountStep(3);
    }

    triggerCountStep(count) {
        if (count > 0) {
            this.countdownNumber.textContent = count;
            this.countdownNumber.className = 'countdown-digit pop-anim';

            const labels = {
                3: 'SIAP-SIAP! 🚩',
                2: 'PEGANG ERAT TALINYA! 🪢',
                1: 'SATU... DUA... TIGA... ✨'
            };
            this.countdownLabel.textContent = labels[count] || 'BERSIAP! 🚩';
            mathAudio.playCountdownBeep(false, count);

            setTimeout(() => {
                this.triggerCountStep(count - 1);
            }, 1000);

        } else {
            // STEP TERAKHIR: "TARIK! 💨"
            this.countdownNumber.textContent = 'TARIK! 💨';
            this.countdownNumber.className = 'countdown-digit pop-anim';
            this.countdownLabel.textContent = 'AYO TARIK SEKUAT TENAGA! 🏆';
            mathAudio.playCountdownBeep(true);

            setTimeout(() => {
                this.countdownOverlay.classList.remove('active');
                this.isCountingDown = false;
                this.startMatchTimer();
            }, 800);
        }
    }

    startMatchTimer() {
        mathAudio.startBgm();

        // Start Timer
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.roundDuration > 0) {
            this.timerDisplay.textContent = `⏱️ ${this.timeLeft}s`;
            this.timerInterval = setInterval(() => {
                if (!this.isPlaying || this.isPaused || this.isCountingDown) return;
                this.timeLeft--;
                this.timerDisplay.textContent = `⏱️ ${this.timeLeft}s`;

                if (this.timeLeft <= 0) {
                    this.handleTimeUp();
                }
            }, 1000);
        } else {
            this.timerDisplay.textContent = '⏱️ ∞ (Bebas)';
        }
    }

    togglePause() {
        if (!this.isPlaying || this.isCountingDown) return;
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.pauseModal.classList.add('active');
            this.btnPause.innerHTML = '<span>▶️</span> Lanjut';
        } else {
            this.pauseModal.classList.remove('active');
            this.btnPause.innerHTML = '<span>⏸️</span> Jeda';
        }
    }

    // Generate Soal Baru untuk Tim Tertentu
    nextQuestion(team) {
        const q = mathGen.getQuestion(this.selectedLevel);
        const state = team === 'red' ? this.redState : this.blueState;
        state.currentQuestion = q;

        const catEl = team === 'red' ? this.redCatEl : this.blueCatEl;
        const qEl = team === 'red' ? this.redQuestionEl : this.blueQuestionEl;
        const container = team === 'red' ? this.redChoicesContainer : this.blueChoicesContainer;

        catEl.textContent = q.category;
        qEl.textContent = q.text;

        // Render 4 Tombol Pilihan
        container.innerHTML = '';
        const keyHints = team === 'red' ? ['1 / Q', '2 / W', '3 / A', '4 / S'] : ['7 / U', '8 / I', '9 / J', '0 / K'];

        q.choices.forEach((choice, idx) => {
            const btn = document.createElement('button');
            btn.className = 'btn-choice';
            btn.innerHTML = `<span class="key-hint">${keyHints[idx]}</span>${choice}`;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleChoiceSelect(team, idx);
            });
            container.appendChild(btn);
        });
    }

    // Handle Saat Pilihan Jawaban Dipilih
    handleChoiceSelect(team, choiceIndex) {
        if (!this.isPlaying || this.isPaused || this.isCountingDown) return;
        const state = team === 'red' ? this.redState : this.blueState;
        if (state.isLocked || !state.currentQuestion) return;

        const selectedVal = state.currentQuestion.choices[choiceIndex];
        const isCorrect = (selectedVal === state.currentQuestion.answer);
        const container = team === 'red' ? this.redChoicesContainer : this.blueChoicesContainer;
        const buttons = container.querySelectorAll('.btn-choice');
        const clickedBtn = buttons[choiceIndex];

        if (isCorrect) {
            // --- JAWABAN BENAR ---
            state.score += 10;
            state.combo++;
            state.totalCorrect++;
            state.pullAnim = 1.0;

            if (clickedBtn) clickedBtn.classList.add('correct-flash');

            // Hitung Kekuatan Tarikan (Bonus Combo jika >= 2)
            const isCombo = state.combo >= 2;
            const tugPower = isCombo ? 20 : 12;

            if (team === 'red') {
                this.ropePos = Math.max(-100, this.ropePos - tugPower);
                this.spawnTugDust(150, 165);
                this.spawnCheerHearts(180, 120, '#ff758f');
            } else {
                this.ropePos = Math.min(100, this.ropePos + tugPower);
                this.spawnTugDust(750, 165);
                this.spawnCheerHearts(720, 120, '#48cae4');
            }

            mathAudio.playCorrect();
            mathAudio.playTugPull(isCombo);

            this.updateTeamStatsUI(team);

            // Cek Kemenangan Knockout
            if (this.ropePos <= -85) {
                this.handleVictory('red', 'Knockout Tarikan Penuh!');
                return;
            } else if (this.ropePos >= 85) {
                this.handleVictory('blue', 'Knockout Tarikan Penuh!');
                return;
            }

            // Ganti soal berikutnya setelah delay kilat
            setTimeout(() => {
                if (this.isPlaying) this.nextQuestion(team);
            }, 180);

        } else {
            // --- JAWABAN SALAH ---
            state.combo = 0;
            state.totalWrong++;
            state.isLocked = true;
            state.lockTimer = 1.3; // 1.3 detik penalty lockout

            if (clickedBtn) clickedBtn.classList.add('wrong-flash');
            mathAudio.playWrong();

            // Lawan dapat keuntungan tarikan kecil
            if (team === 'red') {
                this.ropePos = Math.min(100, this.ropePos + 4);
            } else {
                this.ropePos = Math.max(-100, this.ropePos - 4);
            }

            this.updateTeamStatsUI(team);

            // Tampilkan Overlay Penalti Terpeleset
            const overlay = team === 'red' ? this.redPenaltyOverlay : this.bluePenaltyOverlay;
            const timerEl = team === 'red' ? this.redPenaltyTimerEl : this.bluePenaltyTimerEl;
            overlay.classList.add('active');

            const lockInterval = setInterval(() => {
                state.lockTimer -= 0.1;
                timerEl.textContent = `${Math.max(0, state.lockTimer).toFixed(1)}s`;
                if (state.lockTimer <= 0) {
                    clearInterval(lockInterval);
                    state.isLocked = false;
                    overlay.classList.remove('active');
                    this.nextQuestion(team);
                }
            }, 100);
        }
    }

    updateTeamStatsUI(team) {
        if (team === 'red') {
            this.redScoreEl.textContent = `⭐ ${this.redState.score}`;
            if (this.redState.combo >= 2) {
                this.redComboEl.textContent = `🔥 COMBO x${this.redState.combo}!`;
                this.redComboEl.classList.add('active');
            } else {
                this.redComboEl.classList.remove('active');
            }
        } else {
            this.blueScoreEl.textContent = `⭐ ${this.blueState.score}`;
            if (this.blueState.combo >= 2) {
                this.blueComboEl.textContent = `🔥 COMBO x${this.blueState.combo}!`;
                this.blueComboEl.classList.add('active');
            } else {
                this.blueComboEl.classList.remove('active');
            }
        }
    }

    handleTimeUp() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        if (this.ropePos < -5) {
            this.handleVictory('red', 'Waktu Habis (Tali Lebih Dekat ke Tim Merah)!');
        } else if (this.ropePos > 5) {
            this.handleVictory('blue', 'Waktu Habis (Tali Lebih Dekat ke Tim Biru)!');
        } else {
            this.handleVictory('draw', 'Pertandingan Berakhir Imbang!');
        }
    }

    handleVictory(winner, reason) {
        this.isPlaying = false;
        if (this.timerInterval) clearInterval(this.timerInterval);

        mathAudio.stopBgm();
        mathAudio.playVictory();

        this.redTotalCorrectEl.textContent = this.redState.totalCorrect;
        this.blueTotalCorrectEl.textContent = this.blueState.totalCorrect;

        if (winner === 'red') {
            this.winnerMascotEl.textContent = '🏆 🐼 🏆';
            this.winnerTitleEl.textContent = `SELAMAT, ${this.redTeamName.toUpperCase()} MENANG!`;
            this.winnerSubtitleEl.textContent = reason;
        } else if (winner === 'blue') {
            this.winnerMascotEl.textContent = '🏆 🐰 🏆';
            this.winnerTitleEl.textContent = `SELAMAT, ${this.blueTeamName.toUpperCase()} MENANG!`;
            this.winnerSubtitleEl.textContent = reason;
        } else {
            this.winnerMascotEl.textContent = '🤝 🐼 🐰 🤝';
            this.winnerTitleEl.textContent = 'HASIL IMBANG!';
            this.winnerSubtitleEl.textContent = 'Kedua tim sama-sama hebat dan tangguh!';
        }

        // Spawn Confetti Kemenangan
        for (let i = 0; i < 70; i++) {
            this.particles.push({
                x: 450,
                y: 90,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 0.8) * 11,
                size: Math.random() * 12 + 6,
                color: ['#ffd166', '#ff3366', '#0096c7', '#52b788', '#ff9ff3'][Math.floor(Math.random() * 5)],
                rot: Math.random() * Math.PI * 2,
                type: 'confetti',
                life: 1.0,
                decay: 0.012
            });
        }

        this.victoryModal.classList.add('active');
    }

    spawnTugDust(x, y) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x + (Math.random() * 40 - 20),
                y: y + (Math.random() * 16 - 8),
                vx: (Math.random() - 0.5) * 4,
                vy: -Math.random() * 3,
                size: Math.random() * 10 + 6,
                color: 'rgba(255, 255, 255, 0.75)',
                type: 'dust',
                rot: 0,
                life: 1.0,
                decay: 0.04
            });
        }
    }

    spawnCheerHearts(x, y, color) {
        for (let i = 0; i < 4; i++) {
            this.particles.push({
                x: x + (Math.random() * 30 - 15),
                y: y + (Math.random() * 20 - 10),
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 3 - 1,
                size: Math.random() * 10 + 8,
                color: color,
                type: 'heart',
                rot: 0,
                life: 1.0,
                decay: 0.025
            });
        }
    }

    // --- RENDER ARENA TAMAN OUTDOOR DI CANVAS ---
    drawArena() {
        const W = this.canvas.width;
        const H = this.canvas.height;
        const ctx = this.ctx;

        ctx.clearRect(0, 0, W, H);

        // Smooth Lerp Posisi Tali
        this.displayRopePos += (this.ropePos - this.displayRopePos) * 0.12;

        // Update Gauge Pointer di DOM
        const gaugePct = Math.max(0, Math.min(100, (this.displayRopePos + 100) / 2));
        this.gaugePointer.style.left = `${gaugePct}%`;

        // 1. Langit Biru & Bukit Taman Rumput
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, '#90e0ef');
        skyGrad.addColorStop(0.35, '#caf0f8');
        skyGrad.addColorStop(0.36, '#70e000');
        skyGrad.addColorStop(0.7, '#38b000');
        skyGrad.addColorStop(1, '#2d6a4f');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // 2. Pagar Kayu Taman (Wooden Picket Fence di Background)
        ctx.fillStyle = '#f8edeb';
        ctx.strokeStyle = '#d8e2dc';
        ctx.lineWidth = 1.5;
        const fenceY = 55;
        for (let fx = 15; fx < W; fx += 28) {
            ctx.beginPath();
            ctx.moveTo(fx, fenceY + 28);
            ctx.lineTo(fx, fenceY + 6);
            ctx.lineTo(fx + 7, fenceY);
            ctx.lineTo(fx + 14, fenceY + 6);
            ctx.lineTo(fx + 14, fenceY + 28);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        // Palang kayu horizontal pagar
        ctx.fillStyle = '#fae1dd';
        ctx.fillRect(10, fenceY + 8, W - 20, 5);
        ctx.fillRect(10, fenceY + 18, W - 20, 5);

        // 3. Garis Lapangan & Batas Menang
        // Garis batas tengah
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 6]);

        ctx.beginPath();
        ctx.moveTo(W / 2, 75);
        ctx.lineTo(W / 2, H - 10);
        ctx.stroke();

        // Garis Menang Merah & Biru
        ctx.strokeStyle = 'rgba(255, 51, 102, 0.55)';
        ctx.beginPath();
        ctx.moveTo(W / 2 - 180, 75);
        ctx.lineTo(W / 2 - 180, H - 10);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 150, 199, 0.55)';
        ctx.beginPath();
        ctx.moveTo(W / 2 + 180, 75);
        ctx.lineTo(W / 2 + 180, H - 10);
        ctx.stroke();
        ctx.setLineDash([]);

        // 4. Bunga-Bunga Rumput Cantik
        this.parkFlowers.forEach(fl => {
            ctx.fillStyle = fl.color;
            ctx.beginPath();
            ctx.arc(fl.x, fl.y, fl.size, 0, Math.PI * 2);
            ctx.fill();
            // Pusat kuning bunga
            ctx.fillStyle = '#ffd166';
            ctx.beginPath();
            ctx.arc(fl.x, fl.y, fl.size * 0.45, 0, Math.PI * 2);
            ctx.fill();
        });

        // Posisi X Pusat Tali (Center X + Offset)
        const ropeCenterX = (W / 2) + (this.displayRopePos * 2.2);
        const ropeY = H * 0.68;

        // 5. Tali Tambang Anyaman Tebal
        ctx.strokeStyle = '#d4a373';
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ropeCenterX - 360, ropeY);
        ctx.lineTo(ropeCenterX + 360, ropeY);
        ctx.stroke();

        // Pola Tekstur Anyaman Tali
        ctx.strokeStyle = '#bc6c25';
        ctx.lineWidth = 4;
        for (let rx = ropeCenterX - 350; rx <= ropeCenterX + 350; rx += 14) {
            ctx.beginPath();
            ctx.moveTo(rx, ropeY - 6);
            ctx.lineTo(rx + 8, ropeY + 6);
            ctx.stroke();
        }

        // 6. Pita & Bendera Tengah Tali
        ctx.fillStyle = '#e63946';
        ctx.beginPath();
        ctx.arc(ropeCenterX, ropeY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Pita Bendera Segitiga Emas
        ctx.fillStyle = '#ffb703';
        ctx.beginPath();
        ctx.moveTo(ropeCenterX - 8, ropeY);
        ctx.lineTo(ropeCenterX + 8, ropeY);
        ctx.lineTo(ropeCenterX, ropeY + 24);
        ctx.closePath();
        ctx.fill();

        // 7. Karakter Chibi Tim Merah (Panda Squad)
        const redSquadPositions = [ropeCenterX - 180, ropeCenterX - 250, ropeCenterX - 320];
        redSquadPositions.forEach((px, i) => {
            this.drawChibiPanda(ctx, px, ropeY, i, this.redState);
        });

        // 8. Karakter Chibi Tim Biru (Bunny Squad)
        const blueSquadPositions = [ropeCenterX + 180, ropeCenterX + 250, ropeCenterX + 320];
        blueSquadPositions.forEach((px, i) => {
            this.drawChibiBunny(ctx, px, ropeY, i, this.blueState);
        });

        // 9. Render Partikel, Hati, & Debu
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;

            if (p.type === 'heart') {
                this.drawHeart(ctx, p.x, p.y, p.size, p.color);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // --- MENGGAMBAR CHIBI PANDA IMUT (TIM MERAH) ---
    drawChibiPanda(ctx, x, y, index, state) {
        ctx.save();
        ctx.translate(x, y);

        // Animasi Badan Menarik ke Belakang (Lean Backwards)
        let leanAngle = -0.22;
        if (state.pullAnim > 0) {
            leanAngle -= 0.16;
            state.pullAnim -= 0.05;
        }
        if (state.isLocked) {
            leanAngle = 0.16; // Terpeleset ke depan
        }

        ctx.rotate(leanAngle);

        // Ekor Belang Panda Lucu di belakang
        ctx.fillStyle = '#d90429';
        ctx.beginPath();
        ctx.ellipse(-24, 6, 8, 5, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Kaki Gembul & Sepatu
        ctx.fillStyle = '#2b2d42';
        ctx.beginPath();
        ctx.ellipse(-14, 20, 10, 6, 0, 0, Math.PI * 2);
        ctx.ellipse(14, 20, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Badan Gembul Chibi (Baju Jersey Merah)
        ctx.fillStyle = '#ff3366';
        ctx.beginPath();
        ctx.roundRect(-20, -12, 40, 32, 14);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Patch Bintang / Nomor di Jersey
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 4, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#c9184a';
        ctx.font = 'bold 11px Fredoka';
        ctx.textAlign = 'center';
        ctx.fillText(`${index + 1}`, 0, 8);

        // Kepala Panda Bulat Imut
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -28, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#2b2d42';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Telinga Bulat Hitam Panda + Bagian Dalam Putih
        ctx.fillStyle = '#2b2d42';
        ctx.beginPath();
        ctx.arc(-16, -44, 7, 0, Math.PI * 2);
        ctx.arc(16, -44, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-16, -44, 3, 0, Math.PI * 2);
        ctx.arc(16, -44, 3, 0, Math.PI * 2);
        ctx.fill();

        // Headband Merah Olahraga di Dahi
        ctx.fillStyle = '#ff3366';
        ctx.beginPath();
        ctx.roundRect(-19, -40, 38, 7, 3);
        ctx.fill();

        // Pipi Merona Pink (Rosy Blush)
        ctx.fillStyle = 'rgba(255, 118, 117, 0.6)';
        ctx.beginPath();
        ctx.arc(-12, -22, 4.5, 0, Math.PI * 2);
        ctx.arc(12, -22, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Mata Besar Berkilau
        if (state.isLocked) {
            // Mata Pusing X
            ctx.fillStyle = '#c9184a';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('✕', -7, -26);
            ctx.fillText('✕', 7, -26);
        } else {
            // Lingkaran Hitam Panda
            ctx.fillStyle = '#2b2d42';
            ctx.beginPath();
            ctx.ellipse(-8, -28, 6, 5, -0.2, 0, Math.PI * 2);
            ctx.ellipse(8, -28, 6, 5, 0.2, 0, Math.PI * 2);
            ctx.fill();

            // Pupil Berbintang Putih Besar
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(-7, -29, 2.5, 0, Math.PI * 2);
            ctx.arc(7, -29, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(-9, -27, 1.2, 0, Math.PI * 2);
            ctx.arc(9, -27, 1.2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Hidung & Senyum Manis
        ctx.fillStyle = '#2b2d42';
        ctx.beginPath();
        ctx.arc(0, -21, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#2b2d42';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(0, -18, 3, 0, Math.PI);
        ctx.stroke();

        // Tangan Menggenggam Tali Erat
        ctx.fillStyle = '#2b2d42';
        ctx.beginPath();
        ctx.arc(16, 2, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // --- MENGGAMBAR CHIBI KELINCI IMUT (TIM BIRU) ---
    drawChibiBunny(ctx, x, y, index, state) {
        ctx.save();
        ctx.translate(x, y);

        // Animasi Badan Menarik ke Belakang
        let leanAngle = 0.22;
        if (state.pullAnim > 0) {
            leanAngle += 0.16;
            state.pullAnim -= 0.05;
        }
        if (state.isLocked) {
            leanAngle = -0.16; // Terpeleset ke depan
        }

        ctx.rotate(leanAngle);

        // Ekor Kapas Bulat Kelinci di Belakang
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(24, 6, 7, 0, Math.PI * 2);
        ctx.fill();

        // Kaki Gembul Kelinci
        ctx.fillStyle = '#023e8a';
        ctx.beginPath();
        ctx.ellipse(-14, 20, 10, 6, 0, 0, Math.PI * 2);
        ctx.ellipse(14, 20, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Badan Gembul Chibi (Baju Jersey Biru)
        ctx.fillStyle = '#0096c7';
        ctx.beginPath();
        ctx.roundRect(-20, -12, 40, 32, 14);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Patch Bintang / Nomor di Jersey
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 4, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#023e8a';
        ctx.font = 'bold 11px Fredoka';
        ctx.textAlign = 'center';
        ctx.fillText(`${index + 1}`, 0, 8);

        // Telinga Panjang Kelinci (Panjang & Goyang)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(-9, -52, 6, 17, -0.15, 0, Math.PI * 2);
        ctx.ellipse(9, -52, 6, 17, 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffccd5';
        ctx.beginPath();
        ctx.ellipse(-9, -52, 3, 11, -0.15, 0, Math.PI * 2);
        ctx.ellipse(9, -52, 3, 11, 0.15, 0, Math.PI * 2);
        ctx.fill();

        // Kepala Kelinci Putih Bulat
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -28, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#023e8a';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Headband Biru Olahraga di Dahi
        ctx.fillStyle = '#0096c7';
        ctx.beginPath();
        ctx.roundRect(-19, -40, 38, 7, 3);
        ctx.fill();

        // Pipi Merona Pink (Rosy Blush)
        ctx.fillStyle = 'rgba(255, 118, 117, 0.6)';
        ctx.beginPath();
        ctx.arc(-12, -22, 4.5, 0, Math.PI * 2);
        ctx.arc(12, -22, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Mata Besar Berkilau
        if (state.isLocked) {
            // Mata Pusing X
            ctx.fillStyle = '#023e8a';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('✕', -7, -26);
            ctx.fillText('✕', 7, -26);
        } else {
            ctx.fillStyle = '#2b2d42';
            ctx.beginPath();
            ctx.arc(-8, -28, 4.5, 0, Math.PI * 2);
            ctx.arc(8, -28, 4.5, 0, Math.PI * 2);
            ctx.fill();

            // Pupil Berbintang Putih
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(-7, -29, 2.2, 0, Math.PI * 2);
            ctx.arc(7, -29, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(-9, -27, 1.2, 0, Math.PI * 2);
            ctx.arc(9, -27, 1.2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Hidung Pink & Senyum
        ctx.fillStyle = '#ff758f';
        ctx.beginPath();
        ctx.arc(0, -21, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#2b2d42';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(0, -18, 3, 0, Math.PI);
        ctx.stroke();

        // Tangan Menggenggam Tali Erat
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-16, 2, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#023e8a';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
    }

    drawHeart(ctx, x, y, size, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = color;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
        ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.5, 0, size);
        ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.5, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
        ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    animate() {
        this.drawArena();
        requestAnimationFrame(this.animate);
    }
}

// Inisialisasi saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
    window.mathTug = new MathTugGame();
});
