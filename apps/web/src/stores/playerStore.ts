import { create } from 'zustand';
import { Track } from '@p2gather/shared';

export interface HistoryEntry {
  track: Track;
  playedAt: number;
}

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  positionSec: number;
  durationSec: number;
  volume: number;
  repeat: 'off' | 'one' | 'all';
  shuffle: boolean;
  bitrate: number;
  history: HistoryEntry[];
  likedTrackIds: Set<string>;

  play: (track?: Track) => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (pos: number) => void;
  setVolume: (vol: number) => void;
  next: () => void;
  previous: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  toggleLike: (trackId: string) => void;
  isLiked: (trackId: string) => boolean;
  setPosition: (pos: number) => void;
  setDuration: (dur: number) => void;
  setBitrate: (br: number) => void;
  removeFromHistory: (trackId: string) => void;
  clearHistory: () => void;
}

const STORAGE_KEY = 'p2gather-player';
const HISTORY_MAX = 100;

function loadPersistedState(): Partial<PlayerState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    return {
      queue: data.queue ?? [],
      history: data.history ?? [],
      likedTrackIds: new Set<string>(data.likedTrackIds ?? []),
      volume: data.volume ?? 0.8,
      repeat: data.repeat ?? 'off',
      shuffle: data.shuffle ?? false,
    };
  } catch {
    return {};
  }
}

function persist(state: PlayerState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        queue: state.queue,
        history: state.history,
        likedTrackIds: [...state.likedTrackIds],
        volume: state.volume,
        repeat: state.repeat,
        shuffle: state.shuffle,
      }),
    );
  } catch {
    // quota exceeded
  }
}

function pushHistory(history: HistoryEntry[], track: Track): HistoryEntry[] {
  const entry: HistoryEntry = { track, playedAt: Date.now() };
  const next = [entry, ...history];
  return next.length > HISTORY_MAX ? next.slice(0, HISTORY_MAX) : next;
}

export const usePlayerStore = create<PlayerState>()((set, get) => {
  const persisted = loadPersistedState();

  return {
    currentTrack: null,
    queue: [],
    isPlaying: false,
    positionSec: 0,
    durationSec: 0,
    volume: 0.8,
    repeat: 'off',
    shuffle: false,
    bitrate: 128,
    history: [],
    likedTrackIds: new Set<string>(),
    ...persisted,

    play: (track) => {
      if (track) {
        const state = get();
        const history = state.currentTrack
          ? pushHistory(state.history, state.currentTrack)
          : state.history;
        set({
          currentTrack: track,
          isPlaying: true,
          positionSec: 0,
          history,
        });
      } else {
        set({ isPlaying: true });
      }
      persist(get());
    },

    pause: () => set({ isPlaying: false }),

    togglePlay: () => {
      const { isPlaying, currentTrack } = get();
      if (currentTrack) set({ isPlaying: !isPlaying });
    },

    seek: (pos) => set({ positionSec: Math.max(0, pos) }),

    setVolume: (vol) => {
      set({ volume: Math.max(0, Math.min(1, vol)) });
      persist(get());
    },

    next: () => {
      const { currentTrack, queue, repeat, shuffle, history } = get();

      if (repeat === 'one' && currentTrack) {
        set({ positionSec: 0, isPlaying: true });
        return;
      }

      if (queue.length === 0) {
        if (repeat === 'all' && currentTrack) {
          set({ positionSec: 0, isPlaying: true });
        } else {
          set({ isPlaying: false });
        }
        return;
      }

      let nextIndex: number;
      if (shuffle) {
        nextIndex = Math.floor(Math.random() * queue.length);
      } else {
        nextIndex = 0;
      }

      const nextTrack = queue[nextIndex];
      const remainingQueue = queue.filter((_, i) => i !== nextIndex);
      const nextHistory = currentTrack
        ? pushHistory(history, currentTrack)
        : history;

      set({
        currentTrack: nextTrack,
        queue: remainingQueue,
        isPlaying: true,
        positionSec: 0,
        history: nextHistory,
      });
      persist(get());
    },

    previous: () => {
      const { history, currentTrack, queue } = get();

      if (get().positionSec > 3) {
        set({ positionSec: 0 });
        return;
      }

      if (history.length === 0) {
        set({ positionSec: 0 });
        return;
      }

      const [prev, ...rest] = history;
      const nextQueue = currentTrack ? [currentTrack, ...queue] : queue;

      set({
        currentTrack: prev.track,
        history: rest,
        queue: nextQueue,
        isPlaying: true,
        positionSec: 0,
      });
      persist(get());
    },

    addToQueue: (track) => {
      set((s) => ({ queue: [...s.queue, track] }));
      persist(get());
    },

    removeFromQueue: (trackId) => {
      set((s) => ({ queue: s.queue.filter((t) => t.id !== trackId) }));
      persist(get());
    },

    clearQueue: () => {
      set({ queue: [] });
      persist(get());
    },

    toggleRepeat: () => {
      const order: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
      const idx = order.indexOf(get().repeat);
      set({ repeat: order[(idx + 1) % order.length] });
      persist(get());
    },

    toggleShuffle: () => {
      set((s) => ({ shuffle: !s.shuffle }));
      persist(get());
    },

    toggleLike: (trackId) => {
      const liked = new Set(get().likedTrackIds);
      if (liked.has(trackId)) {
        liked.delete(trackId);
      } else {
        liked.add(trackId);
      }
      set({ likedTrackIds: liked });
      persist(get());
    },

    isLiked: (trackId) => get().likedTrackIds.has(trackId),

    setPosition: (pos) => set({ positionSec: Math.max(0, pos) }),

    setDuration: (dur) => set({ durationSec: Math.max(0, dur) }),

    setBitrate: (br) => set({ bitrate: br }),

    removeFromHistory: (trackId) => {
      set((s) => ({
        history: s.history.filter((entry) => entry.track.id !== trackId),
      }));
      persist(get());
    },

    clearHistory: () => {
      set({ history: [] });
      persist(get());
    },
  };
});
