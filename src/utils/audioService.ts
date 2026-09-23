/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Elegant Web Audio API Synthesizer
 * Generates gentle romantic ambient music and delicate cosmetic interaction sounds
 * without relying on external MP3 assets that could fail to load or violate CORS.
 */

class AudioService {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private ambientInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Gentle romantic music box notes (Dreamy Pentatonic/Lydian chords: F#3, A#3, C#4, D#4, F4, G#4, A#4)
  private romanticNotes = [
    277.18, // C#4
    311.13, // D#4
    349.23, // F4
    415.30, // G#4
    466.16, // A#4
    554.37, // C#5
    622.25, // D#5
    698.46, // F5
    830.61  // G#5
  ];

  public toggleMusic(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx || !this.musicGain) return;
    this.isMusicPlaying = true;

    let step = 0;
    const playNextNote = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      
      const noteFreq = this.romanticNotes[step % this.romanticNotes.length];
      const now = this.ctx.currentTime;

      // Soft sine + triangle bell
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = step % 3 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(noteFreq, now);

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.18, now + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      osc.connect(noteGain);
      noteGain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + 3.0);

      // Harmonizing pad note every 4 steps
      if (step % 4 === 0) {
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(noteFreq / 2, now);
        subGain.gain.setValueAtTime(0, now);
        subGain.gain.linearRampToValueAtTime(0.12, now + 0.5);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);
        subOsc.connect(subGain);
        subGain.connect(this.musicGain);
        subOsc.start(now);
        subOsc.stop(now + 4.8);
      }

      // Vary cadence organically
      const nextDelay = [1400, 1800, 1200, 2200][step % 4];
      step++;
      this.ambientInterval = window.setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.ambientInterval !== null) {
      clearTimeout(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  // Tactile sound: luxury magnetic lipstick cap click / uncouple
  public playLipstickCapClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // High frequency metallic snap
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(1450, now);
    clickOsc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

    clickGain.gain.setValueAtTime(0.22, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    clickOsc.connect(clickGain);
    clickGain.connect(this.masterGain);
    clickOsc.start(now);
    clickOsc.stop(now + 0.1);

    // Subtle pneumatic air pop
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(180, now + 0.02);
    subOsc.frequency.exponentialRampToValueAtTime(60, now + 0.14);

    subGain.gain.setValueAtTime(0.18, now + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now + 0.02);
    subOsc.stop(now + 0.16);
  }

  // Tactile sound: smooth mechanical lipstick elevator twist
  public playLipstickTwist() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    
    // Warm continuous mechanical glide
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.linearRampToValueAtTime(640, now + 0.25);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.32);

    // Subtle micro-ratchet click at end of twist
    const tickOsc = this.ctx.createOscillator();
    const tickGain = this.ctx.createGain();
    tickOsc.type = 'triangle';
    tickOsc.frequency.setValueAtTime(1200, now + 0.28);
    tickGain.gain.setValueAtTime(0.08, now + 0.28);
    tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
    tickOsc.connect(tickGain);
    tickGain.connect(this.masterGain);
    tickOsc.start(now + 0.28);
    tickOsc.stop(now + 0.35);
  }

  // Tactile sound: creamy lipstick swatch glide
  public playLipstickGlide() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(1400, now + 0.2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.42);
  }

  // Tactile sound: compact mirror golden clasp open
  public playCompactOpen() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Tactile sound: subtle mist atomizer spritz
  public playPerfumeSpritz() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Filtered noise simulating fine fragrant mist
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2500, now);
    filter.Q.setValueAtTime(1.8, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.35);
  }

  // Tactile sound: paper envelope open rustle
  public playLetterOpen() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.linearRampToValueAtTime(660, now + 0.18);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.32);
  }

  // Tactile sound: silk ribbon untie
  public playRibbonUntie() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.0);
    });
  }
}

export const audio = new AudioService();
