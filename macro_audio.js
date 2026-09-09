/**
 * ==============================================================================
 * MACROMASTER DEN - AUDIO ENGINE (Web Audio API)
 * Mode Hening (Mute): Seluruh efek audio dinonaktifkan KECUALI suara bip jika salah.
 * - Efek visual konfeti & kartu tetap aktif 100%.
 * - Suara tombol klik, BGM, sukses, koin, level up, & palu di-mute total.
 * ==============================================================================
 */

class MacroAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isBgmMuted = true;
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
            this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
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

    // SATU-SATUNYA SUARA AKTIF: Suara Bip Khas Saat Jawaban Salah
    playWrong() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Bip pendek 160ms dengan gelombang sawtooth menurun frekuensinya
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.15);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.16);
    }

    // Alert dialihkan ke playWrong
    playAlert() {
        this.playWrong();
    }

    // SELURUH SUARA LAINNYA DI-MUTE TOTAL (HENING)
    playGavel() {}
    playTick() {}
    playClick() {}
    playSuccess() {}
    playLevelUp() {}
    playCoin() {}
    playFanfare() {}

    // BGM MUTE
    toggleBGM() { return false; }
    startBGM() {}
    stopBGM() {}
    playBGMStep() {}

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
}

// Export singleton instance
if (typeof window !== 'undefined') {
    window.macroAudio = new MacroAudioEngine();
}
