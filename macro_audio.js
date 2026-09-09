/**
 * ==============================================================================
 * MACROMASTER DEN - AUDIO ENGINE (Mode Hening Total / 100% Visual Saja)
 * Tidak ada audio atau suara sama sekali (Zero Sound Emission).
 * Seluruh metode didefinisikan aman sebagai no-op tanpa memicu Web Audio API.
 * Efek visual konfeti, animasi kartu, badge, dan transisi tetap aktif 100%.
 * ==============================================================================
 */

class MacroAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = true;
        this.isBgmMuted = true;
        this.bgmPlaying = false;
        this.masterGain = null;
        this.bgmGain = null;
    }

    initAudioContext() {
        // Hening total: AudioContext tidak dibuat
    }

    ensureContext() {
        // Hening total: no-op
    }

    // Seluruh efek suara di-mute total (Hening 100%)
    playWrong() {}
    playAlert() {}
    playGavel() {}
    playTick() {}
    playClick() {}
    playSuccess() {}
    playLevelUp() {}
    playCoin() {}
    playFanfare() {}

    // BGM Mute
    toggleBGM() { return false; }
    startBGM() {}
    stopBGM() {}
    playBGMStep() {}

    toggleMute() { return true; }
}

// Export singleton instance
if (typeof window !== 'undefined') {
    window.macroAudio = new MacroAudioEngine();
}
