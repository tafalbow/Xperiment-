/**
 * ============================================================
 * GLOBAL TRADE TYCOON - AUDIO ENGINE (Web Audio API)
 * Synthesizer klakson kapal kontainer, transaksi bursa kas,
 * dengung pabrik hilirisasi, dan mars korporat global.
 * ============================================================
 */

class TradeAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isBgmMuted = false;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmStep = 0;
        this.masterVolume = 0.26;

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

    // Suara Klakson Kapal Laut / Pelabuhan (Deep Cargo Foghorn)
    playShipHorn() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(110, now); // A2
        osc2.frequency.setValueAtTime(112, now); // Sedikit detune untuk efek gema laut

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.masterVolume * 0.7, now + 0.15);
        gain.gain.setValueAtTime(this.masterVolume * 0.7, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.22);
        osc2.stop(now + 1.22);
    }

    // Suara Transaksi Berhasil / Laba Penjualan (Cash & Coin Chime)
    playCashRegister() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [783.99, 1046.5, 1318.51, 1567.98]; // G5, C6, E6, G6

        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteTime = now + (idx * 0.04);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0, noteTime);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.65, noteTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + 0.26);
        });
    }

    // Suara Pabrik / Mesin Produksi (Industrial Machine Hum)
    playFactoryProduce() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

        gain.gain.setValueAtTime(this.masterVolume * 0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
    }

    // Suara Peringatan Peristiwa Pasar / Krisis (Market Alert Alarm)
    playMarketAlert() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(350, now + 0.1);
        osc.frequency.setValueAtTime(440, now + 0.2);

        gain.gain.setValueAtTime(this.masterVolume * 0.55, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.36);
    }

    // Suara Naik Level 17 (Corporate Empire Level Up Fanfare)
    playLevelUp() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteTime = now + (idx * 0.07);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0, noteTime);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.7, noteTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + 0.31);
        });
    }

    // BGM Pelayaran Global (Ambient Strategic Global Trade Theme)
    startBgm() {
        if (this.bgmPlaying || this.isBgmMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        this.bgmPlaying = true;
        this.bgmStep = 0;

        // Melodi petualangan korporasi modern (D minor / G minor epic vibe)
        const melody = [
            440.00, 523.25, 587.33, 659.25,
            587.33, 523.25, 440.00, null,
            392.00, 440.00, 523.25, 587.33,
            523.25, 440.00, 392.00, null,
            587.33, 659.25, 783.99, 880.00,
            783.99, 659.25, 587.33, 523.25,
            440.00, 523.25, 587.33, 659.25,
            587.33, null, 440.00, null
        ];

        const bass = [
            146.83, 146.83, 174.61, 174.61, // D3, F3
            130.81, 130.81, 146.83, 146.83, // C3, D3
            196.00, 196.00, 220.00, 220.00, // G3, A3
            146.83, 146.83, 146.83, null
        ];

        const tempoMs = 210;

        this.bgmTimer = setInterval(() => {
            if (!this.bgmPlaying || this.isBgmMuted) return;
            this.ensureContext();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const melFreq = melody[this.bgmStep % melody.length];
            const bassFreq = bass[Math.floor(this.bgmStep / 2) % bass.length];

            if (melFreq) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(melFreq, now);

                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(this.masterVolume * 0.16, now + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 0.4);
            }

            if (this.bgmStep % 2 === 0 && bassFreq) {
                const bOsc = this.ctx.createOscillator();
                const bGain = this.ctx.createGain();

                bOsc.type = 'triangle';
                bOsc.frequency.setValueAtTime(bassFreq, now);

                bGain.gain.setValueAtTime(this.masterVolume * 0.13, now);
                bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

                bOsc.connect(bGain);
                bGain.connect(this.ctx.destination);

                bOsc.start(now);
                bOsc.stop(now + 0.36);
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

const tradeAudio = new TradeAudioEngine();
