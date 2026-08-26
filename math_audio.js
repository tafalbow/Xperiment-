/**
 * ============================================================
 * MATH TUG OF WAR - AUDIO SYNTHESIZER (Web Audio API)
 * Efek suara peluit, tarikan tali, jawaban benar/salah,
 * sorak penonton, dan mars turnamen ceria tanpa file audio eksternal.
 * ============================================================
 */

class MathTugAudio {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isBgmMuted = false;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmStep = 0;
        this.masterVolume = 0.28;

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

    // Suara Hitung Mundur Aba-aba (3, 2, 1, TARIK!)
    playCountdownBeep(isFinal = false, countNum = 3) {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        if (isFinal) {
            // Suara Peluit Panjang + Fanfare Start "MULAI / TARIK!"
            this.playWhistle();
            
            // Jingle Mulai
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1046.5, now); // C6
            gain.gain.setValueAtTime(this.masterVolume * 0.7, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);
        } else {
            // Denting Beep Imut Ceria 3, 2, 1
            const freqs = { 3: 523.25, 2: 659.25, 1: 783.99 };
            const freq = freqs[countNum] || 659.25;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.7, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.29);
        }
    }

    // Suara Peluit Wasit (Referee Whistle)
    playWhistle() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // 2 Nada peluit bergetar (Trill)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();

        // LFO untuk vibrato peluit
        lfo.frequency.setValueAtTime(25, now);
        lfoGain.gain.setValueAtTime(90, now);
        lfo.connect(osc.frequency);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2400, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(this.masterVolume * 0.7, now + 0.05);
        gain.gain.setValueAtTime(this.masterVolume * 0.7, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        lfo.start(now);
        osc.start(now);
        osc.stop(now + 0.56);
        lfo.stop(now + 0.56);
    }

    // Suara Jawaban Benar (Happy Sparkle Chime)
    playCorrect() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteTime = now + (i * 0.04);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0, noteTime);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.6, noteTime + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.22);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + 0.23);
        });
    }

    // Suara Jawaban Salah / Terpeleset (Boing Wobble)
    playWrong() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

        gain.gain.setValueAtTime(this.masterVolume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.27);
    }

    // Suara Hentakan Tarikan Tali ("Hup! Pull!")
    playTugPull(isCombo = false) {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const startFreq = isCombo ? 480 : 320;
        const endFreq = isCombo ? 160 : 120;
        const duration = isCombo ? 0.18 : 0.12;

        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

        gain.gain.setValueAtTime(this.masterVolume * (isCombo ? 0.9 : 0.6), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    }

    // Suara Kemenangan Juara (Victory Fanfare)
    playVictory() {
        if (this.isMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Mars kemenangan ceria
        const melody = [
            { f: 523.25, d: 0.12 }, // C5
            { f: 523.25, d: 0.12 }, // C5
            { f: 523.25, d: 0.12 }, // C5
            { f: 659.25, d: 0.28 }, // E5
            { f: 587.33, d: 0.14 }, // D5
            { f: 659.25, d: 0.14 }, // E5
            { f: 783.99, d: 0.45 }, // G5
            { f: 1046.5, d: 0.70 }  // C6
        ];

        let offset = 0;
        melody.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteTime = now + offset;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.f, noteTime);

            gain.gain.setValueAtTime(0, noteTime);
            gain.gain.linearRampToValueAtTime(this.masterVolume * 0.75, noteTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, noteTime + note.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + note.d + 0.05);

            offset += note.d * 0.85;
        });
    }

    // BGM Mars Olahraga Ceria (Sports Festival Loop)
    startBgm() {
        if (this.bgmPlaying || this.isBgmMuted) return;
        this.ensureContext();
        if (!this.ctx) return;

        this.bgmPlaying = true;
        this.bgmStep = 0;

        const melody = [
            523.25, 523.25, 659.25, 783.99,
            880.00, 783.99, 659.25, 523.25,
            587.33, 587.33, 659.25, 783.99,
            659.25, 587.33, 523.25, null,
            659.25, 783.99, 880.00, 1046.50,
            987.77, 880.00, 783.99, 659.25,
            587.33, 659.25, 783.99, 880.00,
            783.99, 659.25, 523.25, null
        ];

        const bass = [
            261.63, 392.00, 261.63, 392.00,
            349.23, 392.00, 261.63, 392.00,
            293.66, 392.00, 293.66, 392.00,
            261.63, 392.00, 261.63, null
        ];

        const tempoMs = 150; // Bouncy 100 BPM rhythm

        this.bgmTimer = setInterval(() => {
            if (!this.bgmPlaying || this.isBgmMuted) return;
            this.ensureContext();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const melNote = melody[this.bgmStep % melody.length];
            const bassNote = bass[Math.floor(this.bgmStep / 2) % bass.length];

            if (melNote) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(melNote, now);

                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(this.masterVolume * 0.16, now + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 0.3);
            }

            if (this.bgmStep % 2 === 0 && bassNote) {
                const bOsc = this.ctx.createOscillator();
                const bGain = this.ctx.createGain();

                bOsc.type = 'triangle';
                bOsc.frequency.setValueAtTime(bassNote, now);

                bGain.gain.setValueAtTime(this.masterVolume * 0.11, now);
                bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

                bOsc.connect(bGain);
                bGain.connect(this.ctx.destination);

                bOsc.start(now);
                bOsc.stop(now + 0.25);
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

const mathAudio = new MathTugAudio();
