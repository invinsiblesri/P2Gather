/// <reference path="./youtube.d.ts" />

import { Track } from '@p2gather/shared';
import { createYouTubePlayer } from './youtube';

const YT_CONTAINER_ID = 'yt-player-hidden';

export class AudioEngine {
  private static instance: AudioEngine;

  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private audio!: HTMLAudioElement;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private youtubePlayer: YT.Player | null = null;
  private ytReady = false;
  private currentSource: 'youtube' | 'audius' | null = null;
  private rafId: number | null = null;
  private simSeed = 0;
  private destroyed = false;

  onTimeUpdate: (position: number, duration: number) => void = () => {};
  onEnded: () => void = () => {};
  onError: (error: string) => void = () => {};
  onBitrateDetected: (kbps: number) => void = () => {};

  private constructor() {
    this.initAudio();
  }

  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  private initAudio() {
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'auto';

    this.audio.addEventListener('ended', () => this.onEnded());
    this.audio.addEventListener('error', () => {
      const msg = this.audio.error?.message || 'Audio playback error';
      this.onError(msg);
    });
  }

  private ensureAudioContext() {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      this.analyser.connect(this.audioContext.destination);
      this.sourceNode = null;
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  private connectAudioSource() {
    this.ensureAudioContext();
    if (!this.sourceNode) {
      try {
        this.sourceNode = this.audioContext.createMediaElementSource(this.audio);
        this.sourceNode.connect(this.analyser);
      } catch {
        // Already connected — MediaElementSource can only be created once per element
      }
    }
  }

  private async ensureYouTubePlayer(): Promise<YT.Player> {
    if (this.youtubePlayer && this.ytReady) return this.youtubePlayer;

    this.youtubePlayer = await createYouTubePlayer(YT_CONTAINER_ID, {
      events: {
        onStateChange: (e) => this.handleYTStateChange(e),
        onError: (e) => this.onError(`YouTube error: ${e.data}`),
      },
    });
    this.ytReady = true;
    return this.youtubePlayer;
  }

  private handleYTStateChange(e: YT.OnStateChangeEvent) {
    if (e.data === YT.PlayerState.ENDED) {
      this.stopUpdateLoop();
      this.onEnded();
    }
  }

  async playTrack(track: Track): Promise<void> {
    this.stopUpdateLoop();

    if (track.source === 'youtube') {
      await this.playYouTube(track);
    } else {
      await this.playAudius(track);
    }

    this.updateMediaSession(track);
    this.startUpdateLoop();
  }

  private async playYouTube(track: Track) {
    // Stop any Audius playback
    this.audio.pause();
    this.audio.src = '';

    this.currentSource = 'youtube';
    this.simSeed = hashCode(track.id);

    try {
      const player = await this.ensureYouTubePlayer();
      player.loadVideoById(track.id);
      player.setVolume(this.audio.volume * 100);
      this.onBitrateDetected(128);
    } catch (err: any) {
      this.onError(err.message || 'Failed to load YouTube player');
    }
  }

  private async playAudius(track: Track) {
    // Stop any YouTube playback
    if (this.youtubePlayer && this.ytReady) {
      try { this.youtubePlayer.stopVideo(); } catch {}
    }

    this.currentSource = 'audius';
    this.connectAudioSource();

    const streamUrl = `https://discoveryprovider.audius.co/v1/tracks/${track.id}/stream`;
    this.audio.src = streamUrl;

    try {
      await this.audio.play();
      this.onBitrateDetected(320);
    } catch (err: any) {
      this.onError(err.message || 'Failed to play Audius track');
    }
  }

  pause() {
    if (this.currentSource === 'youtube') {
      if (this.youtubePlayer && this.ytReady) {
        try { this.youtubePlayer.pauseVideo(); } catch {}
      }
    } else {
      this.audio.pause();
    }
  }

  resume() {
    if (this.currentSource === 'youtube') {
      if (this.youtubePlayer && this.ytReady) {
        try { this.youtubePlayer.playVideo(); } catch {}
      }
    } else {
      this.ensureAudioContext();
      this.audio.play().catch(() => {});
    }
  }

  seek(position: number) {
    if (this.currentSource === 'youtube') {
      if (this.youtubePlayer && this.ytReady) {
        try { this.youtubePlayer.seekTo(position, true); } catch {}
      }
    } else {
      this.audio.currentTime = position;
    }
  }

  setVolume(volume: number) {
    const v = Math.max(0, Math.min(1, volume));
    this.audio.volume = v;
    if (this.youtubePlayer && this.ytReady) {
      try { this.youtubePlayer.setVolume(v * 100); } catch {}
    }
  }

  // ── Audio analysis ──

  getFrequencyData(): Uint8Array {
    if (this.currentSource === 'youtube') {
      return this.getSimulatedFrequency();
    }

    if (!this.analyser) return new Uint8Array(128);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  getWaveformData(): Uint8Array {
    if (this.currentSource === 'youtube') {
      return this.getSimulatedWaveform();
    }

    if (!this.analyser) return new Uint8Array(128);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(data);
    return data;
  }

  private getSimulatedFrequency(): Uint8Array {
    const size = 128;
    const data = new Uint8Array(size);
    const t = performance.now() / 1000;
    const seed = this.simSeed;

    for (let i = 0; i < size; i++) {
      const freq = i / size;
      const bass = Math.max(0, 1 - freq * 3);
      const mid = Math.exp(-((freq - 0.3) ** 2) / 0.02);
      const high = Math.exp(-((freq - 0.7) ** 2) / 0.05) * 0.4;

      const beat1 = Math.sin(t * 2.1 + seed) * 0.5 + 0.5;
      const beat2 = Math.sin(t * 3.7 + seed * 1.3 + i * 0.1) * 0.3 + 0.5;
      const beat3 = Math.sin(t * 5.3 + i * 0.05) * 0.2 + 0.5;

      const val = (bass * beat1 + mid * beat2 + high * beat3) * 180 + 20;
      data[i] = Math.min(255, Math.max(0, val | 0));
    }
    return data;
  }

  private getSimulatedWaveform(): Uint8Array {
    const size = 128;
    const data = new Uint8Array(size);
    const t = performance.now() / 1000;
    const seed = this.simSeed;

    for (let i = 0; i < size; i++) {
      const phase = (i / size) * Math.PI * 2;
      const wave =
        Math.sin(phase * 4 + t * 3 + seed) * 40 +
        Math.sin(phase * 7 + t * 5.5) * 20 +
        Math.sin(phase * 11 + t * 2.3 + seed * 0.7) * 10;
      data[i] = Math.min(255, Math.max(0, (128 + wave) | 0));
    }
    return data;
  }

  // ── Update loop ──

  private startUpdateLoop() {
    const tick = () => {
      if (this.destroyed) return;
      this.emitTime();
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private stopUpdateLoop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private emitTime() {
    if (this.currentSource === 'youtube') {
      if (this.youtubePlayer && this.ytReady) {
        try {
          const pos = this.youtubePlayer.getCurrentTime() || 0;
          const dur = this.youtubePlayer.getDuration() || 0;
          this.onTimeUpdate(pos, dur);
        } catch {}
      }
    } else {
      this.onTimeUpdate(this.audio.currentTime, this.audio.duration || 0);
    }
  }

  // ── Media Session API ──

  private updateMediaSession(track: Track) {
    if (!('mediaSession' in navigator)) return;

    const artwork: MediaImage[] = [];
    if (track.artworkUrl) {
      artwork.push({ src: track.artworkUrl, sizes: '512x512', type: 'image/jpeg' });
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      artwork,
    });

    navigator.mediaSession.setActionHandler('play', () => this.resume());
    navigator.mediaSession.setActionHandler('pause', () => this.pause());
    navigator.mediaSession.setActionHandler('previoustrack', null);
    navigator.mediaSession.setActionHandler('nexttrack', null);
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime != null) this.seek(details.seekTime);
    });
  }

  setMediaSessionHandlers(handlers: {
    onPlay?: () => void;
    onPause?: () => void;
    onPrev?: () => void;
    onNext?: () => void;
  }) {
    if (!('mediaSession' in navigator)) return;
    if (handlers.onPlay)
      navigator.mediaSession.setActionHandler('play', handlers.onPlay);
    if (handlers.onPause)
      navigator.mediaSession.setActionHandler('pause', handlers.onPause);
    if (handlers.onPrev)
      navigator.mediaSession.setActionHandler('previoustrack', handlers.onPrev);
    if (handlers.onNext)
      navigator.mediaSession.setActionHandler('nexttrack', handlers.onNext);
  }

  destroy() {
    this.destroyed = true;
    this.stopUpdateLoop();
    this.audio.pause();
    this.audio.src = '';
    if (this.youtubePlayer && this.ytReady) {
      try { this.youtubePlayer.destroy(); } catch {}
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
  }
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return h;
}
