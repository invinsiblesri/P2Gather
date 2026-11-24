import { useEffect, useRef, useCallback } from 'react';
import { AudioEngine } from '../engine/AudioEngine';
import { usePlayerStore } from '../stores/playerStore';

export function useAudio() {
  const engine = useRef<AudioEngine>(AudioEngine.getInstance());
  const frequencyData = useRef<Uint8Array>(new Uint8Array(128));
  const waveformData = useRef<Uint8Array>(new Uint8Array(128));
  const prevTrackId = useRef<string | null>(null);
  const rafId = useRef<number | null>(null);

  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const volume = usePlayerStore((s) => s.volume);

  const setPosition = usePlayerStore((s) => s.setPosition);
  const setDuration = usePlayerStore((s) => s.setDuration);
  const setBitrate = usePlayerStore((s) => s.setBitrate);
  const next = usePlayerStore((s) => s.next);
  const previous = usePlayerStore((s) => s.previous);
  const pause = usePlayerStore((s) => s.pause);
  const togglePlay = usePlayerStore((s) => s.togglePlay);

  // Visualization loop — read frequency/waveform at 60fps
  const updateVisualization = useCallback(() => {
    frequencyData.current = engine.current.getFrequencyData();
    waveformData.current = engine.current.getWaveformData();
    rafId.current = requestAnimationFrame(updateVisualization);
  }, []);

  // Set up engine callbacks on mount
  useEffect(() => {
    const e = engine.current;

    e.onTimeUpdate = (position, duration) => {
      setPosition(position);
      if (duration > 0) setDuration(duration);
    };

    e.onEnded = () => {
      next();
    };

    e.onError = (error) => {
      console.error('[AudioEngine]', error);
    };

    e.onBitrateDetected = (kbps) => {
      setBitrate(kbps);
    };

    // Media Session handlers
    e.setMediaSessionHandlers({
      onPlay: () => togglePlay(),
      onPause: () => pause(),
      onPrev: () => previous(),
      onNext: () => next(),
    });

    // Start visualization loop
    rafId.current = requestAnimationFrame(updateVisualization);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [setPosition, setDuration, setBitrate, next, previous, pause, togglePlay, updateVisualization]);

  // Play new tracks
  useEffect(() => {
    if (!currentTrack) {
      prevTrackId.current = null;
      return;
    }
    if (currentTrack.id === prevTrackId.current) return;
    prevTrackId.current = currentTrack.id;
    engine.current.playTrack(currentTrack);
  }, [currentTrack]);

  // Pause / resume
  useEffect(() => {
    if (!currentTrack) return;
    if (isPlaying) {
      engine.current.resume();
    } else {
      engine.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Volume sync
  useEffect(() => {
    engine.current.setVolume(volume);
  }, [volume]);

  return {
    frequencyData: frequencyData.current,
    waveformData: waveformData.current,
    engine: engine.current,
  };
}
