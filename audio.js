/**
 * Kawaii Web Audio Synthesizer
 * Menghasilkan suara imut, gelembung pop, sparkle chime, dan BGM melody ceria
 * secara native tanpa membutuhkan file audio eksternal.
 */

class KawaiiAudio {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isBgmMuted = false;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmStep = 0;
        this.masterVolume = 0.25;

        // Inisialisasi AudioContext saat interaksi user
        this.initAudioContext();
    }

    initAudioContext() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx && !this.ctx) {
            this.ctx = new AudioCtx();
        }
    }

    ensureContext() {
        if (!this.ctx) {
            this.initAudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Suara gelembung saat geser balok
    playMove() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.05);

        gain.gain.setValueAtTime(this.masterVolume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    // Suara pop lucu saat rotasi balok
    playRotate() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.08); // G5

        gain.gain.setValueAtTime(this.masterVolume * 0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
    }

    // Suara kenyal / squishy thud saat balok mendarat (soft/hard drop)
    playLand(hard = false) {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        const startFreq = hard ? 220 : 180;
        const endFreq = hard ? 80 : 100;
        const duration = hard ? 0.12 : 0.08;

        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

        gain.gain.setValueAtTime(this.masterVolume * (hard ? 0.8 : 0.5), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    }

    // Suara simpan balok (Hold)
    playHold() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06); // A5

        gain.gain.setValueAtTime(this.masterVolume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
    }

    // Suara sparkle / chime arpeggio saat menghancurkan baris
    playLineClear(lines = 1) {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        // Tangga nada ceria Pentatonik / Lydian
        const notesMap = {
            1: [523.25, 659.25],                   // C5, E5
            2: [523.25, 659.25, 783.99],           // C5, E5, G5
            3: [523.25, 659.25, 783.99, 1046.50],  // C5, E5, G5, C6
            4: [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51] // Fanfare Tetris Super!
        };

        const notes = notesMap[lines] || notesMap[1];
        const now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteTime = now + (idx * 0.05);

            osc.type = lines >= 4 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0, noteTime);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.7, noteTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + 0.26);
        });
    }

    // Level Up Jingle
    playLevelUp() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const melody = [523.25, 659.25, 783.99, 1046.5, 1318.51];
        const now = this.ctx.currentTime;

        melody.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteTime = now + (idx * 0.08);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(this.masterVolume * 0.6, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + 0.2);
        });
    }

    // Game Over sad mochi whine
    playGameOver() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const tones = [587.33, 523.25, 493.88, 440.00];

        tones.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteTime = now + (idx * 0.18);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, noteTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.9, noteTime + 0.25);

            gain.gain.setValueAtTime(this.masterVolume * 0.5, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.28);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + 0.3);
        });
    }

    // BGM Kawaii Lo-fi Chime Melody (Procedural loop)
    startBgm() {
        if (this.bgmPlaying || this.isBgmMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        this.bgmPlaying = true;
        this.bgmStep = 0;

        // Pola melodi ceria & manis (C Major / G Major cute vibes)
        const melody = [
            523.25, null, 659.25, 783.99,  // C5, -, E5, G5
            880.00, 783.99, 659.25, null,  // A5, G5, E5, -
            587.33, null, 659.25, 783.99,  // D5, -, E5, G5
            659.25, 587.33, 523.25, null,  // E5, D5, C5, -
            659.25, 783.99, 880.00, 1046.5,// E5, G5, A5, C6
            987.77, 880.00, 783.99, 659.25,// B5, A5, G5, E5
            587.33, 659.25, 783.99, 880.00,// D5, E5, G5, A5
            783.99, null, 523.25, null     // G5, -, C5, -
        ];

        const bassline = [
            261.63, 261.63, 329.63, 329.63,
            349.23, 349.23, 261.63, 261.63,
            293.66, 293.66, 329.63, 329.63,
            392.00, 392.00, 261.63, 261.63
        ];

        const tempoMs = 175; // ~85 BPM cute bouncy feel

        this.bgmTimer = setInterval(() => {
            if (!this.bgmPlaying || this.isBgmMuted) return;
            this.ensureContext();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const noteIndex = this.bgmStep % melody.length;
            const bassIndex = Math.floor((this.bgmStep / 2) % bassline.length);

            const melFreq = melody[noteIndex];
            const bassFreq = (this.bgmStep % 2 === 0) ? bassline[bassIndex] : null;

            // Mainkan not melodi (Music Box / Bell chime lembut)
            if (melFreq) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(melFreq, now);

                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(this.masterVolume * 0.18, now + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 0.36);
            }

            // Mainkan bass lembut (Pizzicato / Marimba bass)
            if (bassFreq) {
                const bOsc = this.ctx.createOscillator();
                const bGain = this.ctx.createGain();

                bOsc.type = 'triangle';
                bOsc.frequency.setValueAtTime(bassFreq, now);

                bGain.gain.setValueAtTime(this.masterVolume * 0.12, now);
                bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

                bOsc.connect(bGain);
                bGain.connect(this.ctx.destination);

                bOsc.start(now);
                bOsc.stop(now + 0.3);
            }

            this.bgmStep++;
        }, tempoMs);
    }

    stopBgm() {
        this.bgmPlaying = false;
        if (this.bgmTimer) {
            clearInterval(this.bgmTimer);
            this.bgmTimer = null;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    toggleBgmMute() {
        this.isBgmMuted = !this.isBgmMuted;
        if (this.isBgmMuted) {
            this.stopBgm();
        } else {
            this.startBgm();
        }
        return this.isBgmMuted;
    }
}

// Instance global
const kawaiiAudio = new KawaiiAudio();
