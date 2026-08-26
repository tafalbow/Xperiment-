/**
 * =========================================================
 * KAWAII MOCHI BLOCKS - GAME ENGINE
 * Visual Tetris Imut dengan Karakter Mochi Hidup, Efek Kenyal,
 * Partikel Berkilau, dan Mekanik Modern Tetris Lengkap.
 * =========================================================
 */

// --- Konstanta & Dimensi ---
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30; // 300 x 600 board

// Definisi Karakter Mochi & Bentuk Tetromino
const MOCHI_TYPES = {
    I: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        name: 'Minty Slime',
        color: '#55efc4',
        darkColor: '#00b894',
        blushColor: '#ff7675',
        faceType: 'happy'
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        name: 'Blueberry Pop',
        color: '#74b9ff',
        darkColor: '#0984e3',
        blushColor: '#ff7675',
        faceType: 'cute'
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        name: 'Peach Kitty',
        color: '#ffbe76',
        darkColor: '#f0932b',
        blushColor: '#ff7675',
        faceType: 'cat'
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        name: 'Custard Chick',
        color: '#ffeaa7',
        darkColor: '#fdcb6e',
        blushColor: '#ff7675',
        faceType: 'chick'
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        name: 'Matcha Froggy',
        color: '#55e6c1',
        darkColor: '#26de81',
        blushColor: '#ff9ff3',
        faceType: 'smile'
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        name: 'Taro Jelly',
        color: '#d8b4f8',
        darkColor: '#a29bfe',
        blushColor: '#ff7675',
        faceType: 'wink'
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        name: 'Sakura Berry',
        color: '#ff9ff3',
        darkColor: '#f368e0',
        blushColor: '#ff6b6b',
        faceType: 'love'
    }
};

const PIECE_KEYS = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

// Dialog & Maskot Mood
const MASCOT_MOODS = {
    idle: [
        { avatar: '🐰', text: 'Yuk tumpuk mochi! ✨' },
        { avatar: '🐱', text: 'Semangat yaa~ 🌸' },
        { avatar: '🐻', text: 'Fokus dan santai~ 🍡' }
    ],
    clear1: [
        { avatar: '🐱', text: 'Yummy! Baris pecah! 🍬' },
        { avatar: '🐰', text: 'Bagus! Lanjut terus~ ✨' }
    ],
    clearMulti: [
        { avatar: '🦄', text: 'SUGOI!! 4-LINE CLEAR!! 💖' },
        { avatar: '🌟', text: 'MOCHI MAGIC! Hebat!! ⭐' }
    ],
    combo: [
        { avatar: '🐻', text: 'COMBO STREAK!! 🔥' },
        { avatar: '🐱', text: 'Mantap banget! 🍓' }
    ],
    danger: [
        { avatar: '🐥', text: 'Awaas, mochi hampir penuh! 💦' },
        { avatar: '🥺', text: 'Hati-hati yaa! 😱' }
    ],
    gameover: [
        { avatar: '🥺', text: 'Yah, penuh! Main lagi yuk? 🌸' }
    ]
};

// --- Game Engine Class ---
class KawaiiTetris {
    constructor() {
        // Canvases & Contexts
        this.boardCanvas = document.getElementById('gameBoard');
        this.ctx = this.boardCanvas.getContext('2d');
        
        this.holdCanvas = document.getElementById('holdCanvas');
        this.holdCtx = this.holdCanvas.getContext('2d');
        
        this.nextCanvas = document.getElementById('nextCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');

        // UI Elements
        this.scoreEl = document.getElementById('scoreVal');
        this.highScoreEl = document.getElementById('highScoreVal');
        this.levelEl = document.getElementById('levelVal');
        this.linesEl = document.getElementById('linesVal');
        this.mascotAvatarEl = document.getElementById('mascotAvatar');
        this.mascotSpeechEl = document.getElementById('mascotSpeech');

        this.startModal = document.getElementById('startModal');
        this.pauseModal = document.getElementById('pauseModal');
        this.gameOverModal = document.getElementById('gameOverModal');
        this.finalScoreEl = document.getElementById('finalScore');
        this.finalHighScoreEl = document.getElementById('finalHighScore');

        this.btnMusic = document.getElementById('btnMusic');
        this.btnSound = document.getElementById('btnSound');
        this.btnPause = document.getElementById('btnPause');
        this.btnSidePause = document.getElementById('btnSidePause');
        this.btnTouchPause = document.getElementById('btnTouchPause');

        // State Game
        this.grid = this.createEmptyGrid();
        this.bag = [];
        this.currentPiece = null;
        this.holdPiece = null;
        this.canHold = true;
        this.nextQueue = [];

        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('kawaii_mochi_highscore') || '0', 10);
        this.level = 1;
        this.lines = 0;
        this.combo = -1;

        this.isPlaying = false;
        this.isPaused = false;
        this.isGameOver = false;

        // Timing & Gravity
        this.dropCounter = 0;
        this.dropInterval = 800; // ms
        this.lastTime = 0;
        this.lockTimer = 0;
        this.lockDelay = 500; // ms
        this.isLocking = false;

        // Juice & Effects
        this.particles = [];
        this.screenShake = 0;
        this.squishX = 1;
        this.squishY = 1;
        this.clearingLines = []; // Baris yang sedang dalam animasi hancur
        this.clearAnimTimer = 0;

        // Inisialisasi High Score di UI
        this.highScoreEl.textContent = this.highScore.toLocaleString();

        this.initControls();
        this.initButtons();
        this.fillNextQueue();
    }

    createEmptyGrid() {
        const grid = [];
        for (let r = 0; r < ROWS; r++) {
            grid.push(new Array(COLS).fill(null));
        }
        return grid;
    }

    // 7-Bag Randomizer
    getNewBag() {
        const pieces = [...PIECE_KEYS];
        // Fisher-Yates Shuffle
        for (let i = pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        }
        return pieces;
    }

    getNextPieceType() {
        if (this.bag.length === 0) {
            this.bag = this.getNewBag();
        }
        return this.bag.pop();
    }

    fillNextQueue() {
        while (this.nextQueue.length < 3) {
            this.nextQueue.push(this.getNextPieceType());
        }
    }

    spawnPiece() {
        const type = this.nextQueue.shift();
        this.fillNextQueue();

        const mochiDef = MOCHI_TYPES[type];
        const matrix = mochiDef.shape.map(row => [...row]);

        this.currentPiece = {
            type: type,
            matrix: matrix,
            x: Math.floor(COLS / 2) - Math.ceil(matrix[0].length / 2),
            y: 0,
            color: mochiDef.color,
            darkColor: mochiDef.darkColor,
            blushColor: mochiDef.blushColor,
            faceType: mochiDef.faceType,
            blinkOffset: Math.floor(Math.random() * 3000)
        };

        this.canHold = true;
        this.isLocking = false;
        this.lockTimer = 0;
        this.squishX = 1;
        this.squishY = 1;

        // Cek Game Over saat spawn
        if (this.checkCollision(this.currentPiece.matrix, this.currentPiece.x, this.currentPiece.y)) {
            this.handleGameOver();
        }

        this.updateDangerMascot();
        this.drawHoldPiece();
        this.drawNextPieces();
    }

    // Rotasi Matriks
    rotateMatrix(matrix, dir = 1) {
        const N = matrix.length;
        const result = matrix.map((row, i) =>
            row.map((val, j) => (dir > 0 ? matrix[N - 1 - j][i] : matrix[j][N - 1 - i]))
        );
        return result;
    }

    // Cek Tabrakan Grid & Dinding
    checkCollision(matrix, offsetX, offsetY) {
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] !== 0) {
                    const nextX = offsetX + c;
                    const nextY = offsetY + r;

                    if (nextX < 0 || nextX >= COLS || nextY >= ROWS) {
                        return true;
                    }
                    if (nextY >= 0 && this.grid[nextY][nextX] !== null) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Gerakan Kiri/Kanan
    move(dir) {
        if (!this.isPlaying || this.isPaused || this.isGameOver || !this.currentPiece) return;

        if (!this.checkCollision(this.currentPiece.matrix, this.currentPiece.x + dir, this.currentPiece.y)) {
            this.currentPiece.x += dir;
            kawaiiAudio.playMove();
            if (this.isLocking) {
                this.lockTimer = 0; // Reset lock delay saat geser
            }
        }
    }

    // Rotasi dengan Wall Kicks sederhana
    rotate(dir = 1) {
        if (!this.isPlaying || this.isPaused || this.isGameOver || !this.currentPiece) return;

        const rotated = this.rotateMatrix(this.currentPiece.matrix, dir);
        const originalX = this.currentPiece.x;

        // Offset kicks untuk dinding & rintangan
        const offsets = [0, 1, -1, 2, -2];
        let rotatedSuccess = false;

        for (const offset of offsets) {
            if (!this.checkCollision(rotated, originalX + offset, this.currentPiece.y)) {
                this.currentPiece.matrix = rotated;
                this.currentPiece.x += offset;
                rotatedSuccess = true;
                kawaiiAudio.playRotate();
                if (this.isLocking) {
                    this.lockTimer = 0;
                }
                break;
            }
        }
    }

    // Soft Drop
    softDrop() {
        if (!this.isPlaying || this.isPaused || this.isGameOver || !this.currentPiece) return;

        if (!this.checkCollision(this.currentPiece.matrix, this.currentPiece.x, this.currentPiece.y + 1)) {
            this.currentPiece.y++;
            this.score += 1;
            this.updateScoreUI();
            this.dropCounter = 0;
        } else {
            this.lockPiece();
        }
    }

    // Hard Drop Instan dengan Efek Kenyal
    hardDrop() {
        if (!this.isPlaying || this.isPaused || this.isGameOver || !this.currentPiece) return;

        let droppedDistance = 0;
        while (!this.checkCollision(this.currentPiece.matrix, this.currentPiece.x, this.currentPiece.y + 1)) {
            this.currentPiece.y++;
            droppedDistance++;
        }

        this.score += droppedDistance * 2;
        this.updateScoreUI();

        // Screen shake & efek squish
        this.screenShake = Math.min(droppedDistance * 0.8, 8);
        this.squishY = 0.7;
        this.squishX = 1.3;

        // Partikel impact
        this.spawnLandingParticles(this.currentPiece);
        kawaiiAudio.playLand(true);

        this.lockPiece();
    }

    // Ghost Piece Position (Bayangan di dasar)
    getGhostY() {
        if (!this.currentPiece) return 0;
        let ghostY = this.currentPiece.y;
        while (!this.checkCollision(this.currentPiece.matrix, this.currentPiece.x, ghostY + 1)) {
            ghostY++;
        }
        return ghostY;
    }

    // Simpan Balok (Hold)
    hold() {
        if (!this.isPlaying || this.isPaused || this.isGameOver || !this.canHold || !this.currentPiece) return;

        kawaiiAudio.playHold();
        const currentType = this.currentPiece.type;

        if (this.holdPiece === null) {
            this.holdPiece = currentType;
            this.spawnPiece();
        } else {
            const temp = this.holdPiece;
            this.holdPiece = currentType;
            
            const mochiDef = MOCHI_TYPES[temp];
            const matrix = mochiDef.shape.map(row => [...row]);
            this.currentPiece = {
                type: temp,
                matrix: matrix,
                x: Math.floor(COLS / 2) - Math.ceil(matrix[0].length / 2),
                y: 0,
                color: mochiDef.color,
                darkColor: mochiDef.darkColor,
                blushColor: mochiDef.blushColor,
                faceType: mochiDef.faceType,
                blinkOffset: Math.floor(Math.random() * 3000)
            };
        }

        this.canHold = false;
        this.drawHoldPiece();
    }

    // Mengunci Balok ke Grid
    lockPiece() {
        if (!this.currentPiece) return;

        const { matrix, x, y, type, color, darkColor, blushColor, faceType } = this.currentPiece;

        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] !== 0) {
                    const gridY = y + r;
                    const gridX = x + c;
                    if (gridY >= 0 && gridY < ROWS && gridX >= 0 && gridX < COLS) {
                        this.grid[gridY][gridX] = {
                            type: type,
                            color: color,
                            darkColor: darkColor,
                            blushColor: blushColor,
                            faceType: faceType,
                            blinkOffset: Math.floor(Math.random() * 3500),
                            scaleAnim: 1.15 // Sedikit mengembang saat mendarat
                        };
                    }
                }
            }
        }

        kawaiiAudio.playLand(false);
        this.currentPiece = null;
        this.checkLineClears();
    }

    // Memeriksa dan Menghancurkan Baris Lengkap
    checkLineClears() {
        const fullRows = [];
        for (let r = 0; r < ROWS; r++) {
            if (this.grid[r].every(cell => cell !== null)) {
                fullRows.push(r);
            }
        }

        if (fullRows.length > 0) {
            this.clearingLines = fullRows;
            this.clearAnimTimer = 220; // Durasi animasi meletup dalam ms
            this.combo++;

            // Hitung Skor
            const lineScores = [0, 100, 300, 500, 800];
            const basePoints = (lineScores[fullRows.length] || 100) * this.level;
            const comboBonus = Math.max(0, this.combo) * 50 * this.level;
            this.score += basePoints + comboBonus;

            this.lines += fullRows.length;
            const newLevel = Math.floor(this.lines / 10) + 1;
            if (newLevel > this.level) {
                this.level = newLevel;
                this.dropInterval = Math.max(120, 800 - (this.level - 1) * 70);
                kawaiiAudio.playLevelUp();
                this.spawnFloatingText("🌟 LEVEL UP! 🌟", 150, 200, '#ffd166');
            }

            this.updateScoreUI();
            kawaiiAudio.playLineClear(fullRows.length);

            // Partikel Bintang & Hati
            fullRows.forEach(r => {
                this.spawnRowParticles(r);
            });

            // Reaksi Maskot & Popup Teks Imut
            if (fullRows.length >= 4) {
                this.triggerMascot('clearMulti');
                this.spawnFloatingText("💖 4-LINE MEGA POP! 💖", 150, 250, '#ff3385');
                this.screenShake = 12;
            } else if (this.combo > 0) {
                this.triggerMascot('combo');
                this.spawnFloatingText(`✨ COMBO x${this.combo + 1}! ✨`, 150, 250, '#ff758c');
            } else {
                this.triggerMascot('clear1');
                this.spawnFloatingText("🍡 POP! 🍡", 150, 250, '#48cae4');
            }

        } else {
            this.combo = -1;
            this.spawnPiece();
        }
    }

    // Eksekusi penghapusan baris setelah animasi meletup
    finishLineClear() {
        this.clearingLines.sort((a, b) => a - b);
        for (const row of this.clearingLines) {
            this.grid.splice(row, 1);
            this.grid.unshift(new Array(COLS).fill(null));
        }
        this.clearingLines = [];
        this.spawnPiece();
    }

    // Partikel saat baris hancur
    spawnRowParticles(row) {
        const y = row * BLOCK_SIZE + BLOCK_SIZE / 2;
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * (COLS * BLOCK_SIZE);
            const types = ['star', 'heart', 'sparkle', 'bubble'];
            const colors = ['#ffd166', '#ff758c', '#55efc4', '#a29bfe', '#ff9ff3', '#74b9ff'];
            this.particles.push({
                x: x,
                y: y + (Math.random() * 20 - 10),
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.7) * 7,
                size: Math.random() * 14 + 10,
                type: types[Math.floor(Math.random() * types.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.015
            });
        }
    }

    // Partikel saat balok mendarat keras
    spawnLandingParticles(piece) {
        const { matrix, x, y } = piece;
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] !== 0) {
                    const px = (x + c) * BLOCK_SIZE + BLOCK_SIZE / 2;
                    const py = (y + r + 1) * BLOCK_SIZE;
                    for (let i = 0; i < 3; i++) {
                        this.particles.push({
                            x: px,
                            y: py,
                            vx: (Math.random() - 0.5) * 4,
                            vy: -Math.random() * 3,
                            size: Math.random() * 8 + 4,
                            type: 'bubble',
                            color: piece.color,
                            rot: 0,
                            rotSpeed: 0,
                            life: 1.0,
                            decay: 0.04
                        });
                    }
                }
            }
        }
    }

    // Popup Teks Mengambang di Atas Papan
    spawnFloatingText(text, x, y, color) {
        const container = document.querySelector('.board-container');
        if (!container) return;

        const popup = document.createElement('div');
        popup.className = 'combo-popup';
        popup.textContent = text;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        popup.style.color = color;
        container.appendChild(popup);

        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 1200);
    }

    // Maskot State & Mood
    triggerMascot(mood) {
        const options = MASCOT_MOODS[mood] || MASCOT_MOODS.idle;
        const item = options[Math.floor(Math.random() * options.length)];
        this.mascotAvatarEl.textContent = item.avatar;
        this.mascotSpeechEl.textContent = item.text;
    }

    updateDangerMascot() {
        // Cek ketinggian tumpukan balok
        let highestRow = ROWS;
        for (let r = 0; r < ROWS; r++) {
            if (this.grid[r].some(cell => cell !== null)) {
                highestRow = r;
                break;
            }
        }

        if (highestRow <= 6) {
            this.triggerMascot('danger');
        } else if (Math.random() < 0.15) {
            this.triggerMascot('idle');
        }
    }

    updateScoreUI() {
        this.scoreEl.textContent = this.score.toLocaleString();
        this.levelEl.textContent = this.level;
        this.linesEl.textContent = this.lines;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('kawaii_mochi_highscore', this.highScore.toString());
            this.highScoreEl.textContent = this.highScore.toLocaleString();
        }
    }

    // --- Menggambar Blok Mochi Berkarakter Lucu ---
    drawMochiCell(ctx, x, y, size, cell, isGhost = false, isDanger = false) {
        const radius = size * 0.28;

        ctx.save();
        ctx.translate(x, y);

        if (cell.scaleAnim && cell.scaleAnim > 1) {
            ctx.scale(cell.scaleAnim, cell.scaleAnim);
            cell.scaleAnim -= 0.02;
            if (cell.scaleAnim < 1) cell.scaleAnim = 1;
        }

        // 1. Badan Mochi Berwarna Pastel dengan Gradien Halus
        ctx.beginPath();
        ctx.roundRect(1, 1, size - 2, size - 2, radius);

        if (isGhost) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.strokeStyle = cell.color;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([3, 3]);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
            return;
        }

        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, cell.color);
        grad.addColorStop(1, cell.darkColor);
        ctx.fillStyle = grad;
        ctx.fill();

        // Garis tepi halus
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 2. Kilau Glossy di Sudut Kiri Atas
        ctx.beginPath();
        ctx.ellipse(size * 0.3, size * 0.28, size * 0.16, size * 0.09, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fill();

        // 3. Pipi Merona (Rosy Blush)
        ctx.beginPath();
        ctx.arc(size * 0.24, size * 0.64, size * 0.11, 0, Math.PI * 2);
        ctx.arc(size * 0.76, size * 0.64, size * 0.11, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 118, 117, 0.45)';
        ctx.fill();

        // 4. Mata & Ekspresi Wajah Mochi
        const now = Date.now() + (cell.blinkOffset || 0);
        const isBlinking = (now % 3500) < 160;

        ctx.fillStyle = '#2d3436';
        ctx.strokeStyle = '#2d3436';
        ctx.lineWidth = 1.6;

        const eyeLeftX = size * 0.32;
        const eyeRightX = size * 0.68;
        const eyeY = size * 0.52;

        if (isDanger) {
            // Wajah Kaget / Berkeringat saat bahaya
            ctx.beginPath();
            ctx.arc(eyeLeftX, eyeY, size * 0.09, 0, Math.PI * 2);
            ctx.arc(eyeRightX, eyeY, size * 0.09, 0, Math.PI * 2);
            ctx.fill();

            // Mulut "O" kecil
            ctx.beginPath();
            ctx.arc(size * 0.5, size * 0.7, size * 0.08, 0, Math.PI * 2);
            ctx.stroke();

            // Keringat di dahi
            ctx.fillStyle = '#74b9ff';
            ctx.beginPath();
            ctx.arc(size * 0.8, size * 0.28, size * 0.06, 0, Math.PI * 2);
            ctx.fill();

        } else if (isBlinking) {
            // Mata Berkedip Lengkung Senyum (^_^)
            ctx.beginPath();
            ctx.arc(eyeLeftX, eyeY + 1, size * 0.08, Math.PI, 0);
            ctx.arc(eyeRightX, eyeY + 1, size * 0.08, Math.PI, 0);
            ctx.stroke();

            // Mulut Senyum
            ctx.beginPath();
            ctx.arc(size * 0.5, size * 0.66, size * 0.07, 0, Math.PI);
            ctx.stroke();

        } else if (cell.faceType === 'wink') {
            // Mata Berkedip sebelah (;
            ctx.beginPath();
            ctx.arc(eyeLeftX, eyeY, size * 0.08, 0, Math.PI * 2);
            ctx.fill();
            // Mata kanan lengkung
            ctx.beginPath();
            ctx.arc(eyeRightX, eyeY + 1, size * 0.08, Math.PI, 0);
            ctx.stroke();

            // Mulut Senyum
            ctx.beginPath();
            ctx.arc(size * 0.5, size * 0.64, size * 0.06, 0, Math.PI);
            ctx.stroke();

        } else {
            // Mata Normal Berbintang & Bersinar
            ctx.beginPath();
            ctx.arc(eyeLeftX, eyeY, size * 0.08, 0, Math.PI * 2);
            ctx.arc(eyeRightX, eyeY, size * 0.08, 0, Math.PI * 2);
            ctx.fill();

            // Titik kilau putih di pupil
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(eyeLeftX - 1, eyeY - 1, size * 0.03, 0, Math.PI * 2);
            ctx.arc(eyeRightX - 1, eyeY - 1, size * 0.03, 0, Math.PI * 2);
            ctx.fill();

            // Mulut Senyum Manis
            ctx.strokeStyle = '#2d3436';
            ctx.beginPath();
            ctx.arc(size * 0.5, size * 0.64, size * 0.06, 0, Math.PI);
            ctx.stroke();
        }

        ctx.restore();
    }

    // Menggambar Partikel
    drawParticles(ctx) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // gravitasi
            p.rot += p.rotSpeed;
            p.life -= p.decay;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.globalAlpha = Math.max(0, p.life);

            if (p.type === 'star') {
                this.drawStar(ctx, 0, 0, 5, p.size, p.size / 2, p.color);
            } else if (p.type === 'heart') {
                this.drawHeart(ctx, 0, 0, p.size, p.color);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }

            ctx.restore();
        }
    }

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    drawHeart(ctx, x, y, size, color) {
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        // Kurva kiri
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
        // Kurva kanan
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Render Papan Utama
    render() {
        this.ctx.clearRect(0, 0, this.boardCanvas.width, this.boardCanvas.height);

        this.ctx.save();

        // Screen Shake
        if (this.screenShake > 0) {
            const shakeX = (Math.random() - 0.5) * this.screenShake * 2;
            const shakeY = (Math.random() - 0.5) * this.screenShake * 2;
            this.ctx.translate(shakeX, shakeY);
            this.screenShake -= 0.6;
            if (this.screenShake < 0) this.screenShake = 0;
        }

        // Latar Belakang Grid Halus
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        this.ctx.lineWidth = 1;
        for (let r = 0; r <= ROWS; r++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, r * BLOCK_SIZE);
            this.ctx.lineTo(COLS * BLOCK_SIZE, r * BLOCK_SIZE);
            this.ctx.stroke();
        }
        for (let c = 0; c <= COLS; c++) {
            this.ctx.beginPath();
            this.ctx.moveTo(c * BLOCK_SIZE, 0);
            this.ctx.lineTo(c * BLOCK_SIZE, ROWS * BLOCK_SIZE);
            this.ctx.stroke();
        }

        // Gambar Grid yang sudah terkunci
        for (let r = 0; r < ROWS; r++) {
            const isClearing = this.clearingLines.includes(r);
            for (let c = 0; c < COLS; c++) {
                const cell = this.grid[r][c];
                if (cell) {
                    if (isClearing) {
                        // Flash putih saat hancur
                        this.ctx.fillStyle = '#ffffff';
                        this.ctx.beginPath();
                        this.ctx.roundRect(c * BLOCK_SIZE + 2, r * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4, 8);
                        this.ctx.fill();
                    } else {
                        const isHighDanger = r < 6;
                        this.drawMochiCell(this.ctx, c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, cell, false, isHighDanger);
                    }
                }
            }
        }

        // Gambar Ghost Piece
        if (this.currentPiece && !this.isGameOver) {
            const ghostY = this.getGhostY();
            const { matrix, x, color, darkColor, blushColor, faceType } = this.currentPiece;
            for (let r = 0; r < matrix.length; r++) {
                for (let c = 0; c < matrix[r].length; c++) {
                    if (matrix[r][c] !== 0) {
                        const cell = { color, darkColor, blushColor, faceType };
                        this.drawMochiCell(this.ctx, (x + c) * BLOCK_SIZE, (ghostY + r) * BLOCK_SIZE, BLOCK_SIZE, cell, true);
                    }
                }
            }
        }

        // Gambar Balok Aktif dengan Animasi Squash & Stretch
        if (this.currentPiece && !this.isGameOver) {
            const { matrix, x, y, color, darkColor, blushColor, faceType, blinkOffset } = this.currentPiece;

            // Ease squish back to 1
            this.squishX += (1 - this.squishX) * 0.15;
            this.squishY += (1 - this.squishY) * 0.15;

            for (let r = 0; r < matrix.length; r++) {
                for (let c = 0; c < matrix[r].length; c++) {
                    if (matrix[r][c] !== 0) {
                        const cell = { color, darkColor, blushColor, faceType, blinkOffset };
                        const px = (x + c) * BLOCK_SIZE;
                        const py = (y + r) * BLOCK_SIZE;

                        this.ctx.save();
                        this.ctx.translate(px + BLOCK_SIZE / 2, py + BLOCK_SIZE / 2);
                        this.ctx.scale(this.squishX, this.squishY);
                        this.ctx.translate(-(px + BLOCK_SIZE / 2), -(py + BLOCK_SIZE / 2));

                        this.drawMochiCell(this.ctx, px, py, BLOCK_SIZE, cell);
                        this.ctx.restore();
                    }
                }
            }
        }

        // Gambar Partikel
        this.drawParticles(this.ctx);

        this.ctx.restore();
    }

    // Render Preview Hold Piece
    drawHoldPiece() {
        this.holdCtx.clearRect(0, 0, this.holdCanvas.width, this.holdCanvas.height);
        if (!this.holdPiece) return;

        const def = MOCHI_TYPES[this.holdPiece];
        const matrix = def.shape;
        const cellSize = 22;
        const offsetX = (this.holdCanvas.width - matrix[0].length * cellSize) / 2;
        const offsetY = (this.holdCanvas.height - matrix.length * cellSize) / 2;

        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] !== 0) {
                    const cell = {
                        color: def.color,
                        darkColor: def.darkColor,
                        blushColor: def.blushColor,
                        faceType: def.faceType,
                        blinkOffset: 0
                    };
                    this.drawMochiCell(this.holdCtx, offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cell);
                }
            }
        }
    }

    // Render Preview 3 Next Pieces
    drawNextPieces() {
        this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        const cellSize = 20;
        const startY = 15;
        const gapY = 75;

        this.nextQueue.slice(0, 3).forEach((type, idx) => {
            const def = MOCHI_TYPES[type];
            const matrix = def.shape;
            const offsetX = (this.nextCanvas.width - matrix[0].length * cellSize) / 2;
            const offsetY = startY + idx * gapY + (gapY - matrix.length * cellSize) / 2 - 10;

            for (let r = 0; r < matrix.length; r++) {
                for (let c = 0; c < matrix[r].length; c++) {
                    if (matrix[r][c] !== 0) {
                        const cell = {
                            color: def.color,
                            darkColor: def.darkColor,
                            blushColor: def.blushColor,
                            faceType: def.faceType,
                            blinkOffset: idx * 800
                        };
                        this.drawMochiCell(this.nextCtx, offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cell);
                    }
                }
            }
        });
    }

    // Main Game Loop
    update(time = 0) {
        if (!this.isPlaying) return;

        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        if (!this.isPaused && !this.isGameOver) {
            // Handle Animasi Line Clears
            if (this.clearingLines.length > 0) {
                this.clearAnimTimer -= deltaTime;
                if (this.clearAnimTimer <= 0) {
                    this.finishLineClear();
                }
            } else if (this.currentPiece) {
                this.dropCounter += deltaTime;

                // Handle Lock Delay
                const isTouchingBottom = this.checkCollision(
                    this.currentPiece.matrix,
                    this.currentPiece.x,
                    this.currentPiece.y + 1
                );

                if (isTouchingBottom) {
                    this.isLocking = true;
                    this.lockTimer += deltaTime;
                    if (this.lockTimer >= this.lockDelay) {
                        this.lockPiece();
                    }
                } else {
                    this.isLocking = false;
                    this.lockTimer = 0;

                    if (this.dropCounter > this.dropInterval) {
                        this.currentPiece.y++;
                        this.dropCounter = 0;
                    }
                }
            }
        }

        this.render();
        requestAnimationFrame(this.update.bind(this));
    }

    start() {
        this.grid = this.createEmptyGrid();
        this.bag = [];
        this.nextQueue = [];
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.combo = -1;
        this.holdPiece = null;
        this.canHold = true;
        this.isPlaying = true;
        this.isPaused = false;
        this.isGameOver = false;
        this.dropInterval = 800;
        this.particles = [];
        this.clearingLines = [];

        this.updateScoreUI();
        this.fillNextQueue();
        this.spawnPiece();

        this.startModal.classList.remove('active');
        this.pauseModal.classList.remove('active');
        this.gameOverModal.classList.remove('active');

        kawaiiAudio.startBgm();
        this.triggerMascot('idle');

        this.lastTime = performance.now();
        requestAnimationFrame(this.update.bind(this));
    }

    pause() {
        if (!this.isPlaying || this.isGameOver) return;
        this.isPaused = !this.isPaused;

        const pauseIcon = this.btnPause ? this.btnPause.querySelector('.pause-icon') : null;
        const pauseLabel = this.btnPause ? this.btnPause.querySelector('.pause-label') : null;

        if (this.isPaused) {
            this.pauseModal.classList.add('active');
            if (pauseIcon) pauseIcon.textContent = '▶️';
            if (pauseLabel) pauseLabel.textContent = 'LANJUT';
            if (this.btnPause) this.btnPause.classList.add('is-paused');

            if (this.btnSidePause) {
                this.btnSidePause.innerHTML = '<span>▶️</span> LANJUTKAN';
                this.btnSidePause.classList.add('is-paused');
            }
            if (this.btnTouchPause) {
                this.btnTouchPause.textContent = '▶️';
            }
            this.triggerMascot('idle');
            this.mascotSpeechEl.textContent = 'Zzz... Game dijeda~ 💤';
        } else {
            this.pauseModal.classList.remove('active');
            if (pauseIcon) pauseIcon.textContent = '⏸️';
            if (pauseLabel) pauseLabel.textContent = 'JEDA';
            if (this.btnPause) this.btnPause.classList.remove('is-paused');

            if (this.btnSidePause) {
                this.btnSidePause.innerHTML = '<span>⏸️</span> JEDA GAME';
                this.btnSidePause.classList.remove('is-paused');
            }
            if (this.btnTouchPause) {
                this.btnTouchPause.textContent = '⏸️';
            }
            this.mascotSpeechEl.textContent = 'Yuk lanjut tumpuk mochi! ✨';
            this.lastTime = performance.now();
        }
    }

    handleGameOver() {
        this.isGameOver = true;
        this.isPlaying = false;
        kawaiiAudio.stopBgm();
        kawaiiAudio.playGameOver();

        this.finalScoreEl.textContent = this.score.toLocaleString();
        this.finalHighScoreEl.textContent = this.highScore.toLocaleString();
        this.gameOverModal.classList.add('active');
        this.triggerMascot('gameover');
    }

    // Inisialisasi Kontrol Keyboard & Touch
    initControls() {
        window.addEventListener('keydown', (e) => {
            // Hindari scroll browser dengan tombol panah dan spasi
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }

            if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
                this.pause();
                return;
            }

            if (!this.isPlaying || this.isPaused || this.isGameOver) return;

            switch (e.key) {
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    this.move(-1);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.move(1);
                    break;
                case 'ArrowUp':
                case 'w':
                case 'W':
                case 'x':
                case 'X':
                    this.rotate(1);
                    break;
                case 'z':
                case 'Z':
                    this.rotate(-1);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    this.softDrop();
                    break;
                case ' ':
                    this.hardDrop();
                    break;
                case 'c':
                case 'C':
                case 'Shift':
                    this.hold();
                    break;
            }
        });

        // Touch Buttons
        const bindTouch = (id, action) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                action();
            });
        };

        bindTouch('btnTouchLeft', () => this.move(-1));
        bindTouch('btnTouchRight', () => this.move(1));
        bindTouch('btnTouchRotate', () => this.rotate(1));
        bindTouch('btnTouchDown', () => this.softDrop());
        bindTouch('btnTouchHardDrop', () => this.hardDrop());
        bindTouch('btnTouchHold', () => this.hold());
        bindTouch('btnTouchPause', () => this.pause());
    }

    initButtons() {
        document.getElementById('btnStart').addEventListener('click', () => this.start());
        document.getElementById('btnResume').addEventListener('click', () => this.pause());
        document.getElementById('btnRestart').addEventListener('click', () => this.start());
        document.getElementById('btnRestartPause').addEventListener('click', () => this.start());
        if (this.btnPause) this.btnPause.addEventListener('click', () => this.pause());
        if (this.btnSidePause) this.btnSidePause.addEventListener('click', () => this.pause());
        if (this.btnTouchPause) this.btnTouchPause.addEventListener('click', () => this.pause());

        this.btnMusic.addEventListener('click', () => {
            const isMuted = kawaiiAudio.toggleBgmMute();
            this.btnMusic.textContent = isMuted ? '🔇' : '🎵';
        });

        this.btnSound.addEventListener('click', () => {
            const isMuted = kawaiiAudio.toggleMute();
            this.btnSound.textContent = isMuted ? '🔈' : '🔊';
        });
    }
}

// Jalankan game saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
    window.game = new KawaiiTetris();
});
