/**
 * ==============================================================================
 * MACROMASTER DEN - AUDIO ENGINE (Web Audio API)
 * Synthesizer audio prosedural tanpa file eksternal:
 * - Ketok Palu Sidang Kabinet (Executive Gavel)
 * - Ticker Indikator & Slider Click
 * - Alert Sirene Krisis Makro
 * - Jingle Kemenangan & Keberhasilan Target
 * - Ambient Focus Drone BGM (Suasana Ruang Kendali Teknokratik)
 * ==============================================================================
 */

class MacroAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isBgmMuted = false;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.masterGain = null;
        this.bgmGain = null;
        this.step = 0;

        this.initAudioContext();
    }

    initAudioContext() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx && !this.ctx) {
            this.ctx = new AudioCtx();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);

            this.bgmGain = this.ctx.createGain();
            this.bgmGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            this.bgmGain.connect(this.masterGain);
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

    // Suara Ketok Palu Sidang Kabinet (Deep Cabinet Gavel Strike)
    playGavel() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        
        // 1. Transient impact click
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(320, now);
        clickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
        clickGain.gain.setValueAtTime(0.7, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        clickOsc.connect(clickGain);
        clickGain.connect(this.masterGain);
        clickOsc.start(now);
        clickOsc.stop(now + 0.1);

        // 2. Heavy wooden body resonance
        const woodOsc = this.ctx.createOscillator();
        const woodGain = this.ctx.createGain();
        woodOsc.type = 'sine';
        woodOsc.frequency.setValueAtTime(140, now);
        woodOsc.frequency.exponentialRampToValueAtTime(55, now + 0.4);
        woodGain.gain.setValueAtTime(0.8, now);
        woodGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        woodOsc.connect(woodGain);
        woodGain.connect(this.masterGain);
        woodOsc.start(now);
        woodOsc.stop(now + 0.5);

        // 3. Second delayed echo strike (double gavel tap)
        setTimeout(() => {
            if (this.isMuted || !this.ctx) return;
            const now2 = this.ctx.currentTime;
            const echoOsc = this.ctx.createOscillator();
            const echoGain = this.ctx.createGain();
            echoOsc.type = 'sine';
            echoOsc.frequency.setValueAtTime(130, now2);
            echoOsc.frequency.exponentialRampToValueAtTime(50, now2 + 0.35);
            echoGain.gain.setValueAtTime(0.5, now2);
            echoGain.gain.exponentialRampToValueAtTime(0.001, now2 + 0.38);
            echoOsc.connect(echoGain);
            echoGain.connect(this.masterGain);
            echoOsc.start(now2);
            echoOsc.stop(now2 + 0.4);
        }, 180);
    }

    // Suara Ticker Indikator / Penyesuaian Slider
    playTick() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.03);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.04);
    }

    // Suara Tombol Klik Umum
    playClick() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.06);
    }

    // Suara Alert Peringatan Krisis (Krisis Moneter, Stagflasi, Defisit)
    playAlert() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        for (let i = 0; i < 2; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const startTime = now + (i * 0.16);

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(660, startTime);
            osc.frequency.linearRampToValueAtTime(880, startTime + 0.08);
            osc.frequency.linearRampToValueAtTime(550, startTime + 0.15);

            gain.gain.setValueAtTime(0.2, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(startTime);
            osc.stop(startTime + 0.16);
        }
    }

    // Suara Sukses / Capaian Target / Jawaban Kuis Benar
    playSuccess() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + (idx * 0.09);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.22, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.28);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(noteStart);
            osc.stop(noteStart + 0.3);
        });
    }

    // Suara Jawaban Kuis Salah
    playWrong() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [280, 240];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + (idx * 0.14);

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.18, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.2);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(noteStart);
            osc.stop(noteStart + 0.22);
        });
    }

    // Suara Level Up (Arpeggio Triumphant Khas Game RPG)
    playLevelUp() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A4, C#5, E5, A5, C#6, E6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + (idx * 0.08);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.25, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.35);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(noteStart);
            osc.stop(noteStart + 0.38);
        });
    }

    // Suara Koin PDB / XP Bertambah (Coin Chime)
    playCoin() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [987.77, 1318.51]; // B5, E6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + (idx * 0.07);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.2, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(noteStart);
            osc.stop(noteStart + 0.28);
        });
    }

    // Suara Fanfare Kemenangan Besar (Boss Defeated / Quiz Cleared)
    playFanfare() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const melody = [
            { f: 523.25, d: 0.12 }, // C5
            { f: 523.25, d: 0.12 }, // C5
            { f: 523.25, d: 0.12 }, // C5
            { f: 659.25, d: 0.36 }, // E5
            { f: 587.33, d: 0.12 }, // D5
            { f: 783.99, d: 0.48 }  // G5
        ];

        let offset = 0;
        melody.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + offset;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.f, noteStart);

            gain.gain.setValueAtTime(0.28, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + item.d);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(noteStart);
            osc.stop(noteStart + item.d + 0.05);

            offset += item.d * 0.85;
        });
    }

    // Background Music (Ambient Command Room Drone & Chords)
    toggleBGM() {
        this.ensureContext();
        if (this.bgmPlaying) {
            this.stopBGM();
        } else {
            this.startBGM();
        }
        return this.bgmPlaying;
    }

    startBGM() {
        if (this.bgmPlaying || !this.ctx) return;
        this.bgmPlaying = true;
        this.playBGMStep();
        this.bgmTimer = setInterval(() => {
            this.playBGMStep();
        }, 3200); // Tiap birama 3.2 detik
    }

    stopBGM() {
        this.bgmPlaying = false;
        if (this.bgmTimer) {
            clearInterval(this.bgmTimer);
            this.bgmTimer = null;
        }
    }

    playBGMStep() {
        if (!this.bgmPlaying || this.isBgmMuted || !this.ctx) return;
        const now = this.ctx.currentTime;

        // Sequence akord ambient tenang bertema keuangan & data (Am, F, C, G)
        const chordProgression = [
            [220, 261.63, 329.63, 440], // Am (A3, C4, E4, A4)
            [174.61, 220, 261.63, 349.23], // Fmaj (F3, A3, C4, F4)
            [130.81, 164.81, 196.00, 261.63], // Cmaj (C3, E3, G3, C4)
            [196.00, 246.94, 293.66, 392.00]  // Gmaj (G3, B3, D4, G4)
        ];

        const chord = chordProgression[this.step % chordProgression.length];
        this.step++;

        chord.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = idx === 0 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, now);

            // Lembut dan melayang (ambient pad)
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.04, now + 1.2);
            gain.gain.linearRampToValueAtTime(0.03, now + 2.4);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.15);

            osc.connect(gain);
            gain.connect(this.bgmGain);
            osc.start(now);
            osc.stop(now + 3.2);
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.3, this.ctx.currentTime);
        }
        return this.isMuted;
    }
}

// Export singleton instance
if (typeof window !== 'undefined') {
    window.macroAudio = new MacroAudioEngine();
}
