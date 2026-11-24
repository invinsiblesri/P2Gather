import { create } from 'zustand';
import { Track } from '@p2gather/shared';

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  trackIds: string[];
  artworkUrl?: string;
  artworkUrls: string[];
  createdAt: number;
}

interface LibraryState {
  playlists: Playlist[];
  recentSearches: string[];
  activeFilter: 'playlists' | 'albums' | 'artists';
  viewMode: 'grid' | 'list';
  sortBy: 'date' | 'name';

  createPlaylist: (name: string) => void;
  deletePlaylist: (id: string) => void;
  addToPlaylist: (playlistId: string, track: Track) => void;
  removeFromPlaylist: (playlistId: string, trackId: string) => void;
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setActiveFilter: (filter: 'playlists' | 'albums' | 'artists') => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sort: 'date' | 'name') => void;
}

const STORAGE_KEY = 'p2gather-library';
const RECENT_SEARCHES_MAX = 20;

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadPersistedState(): Partial<LibraryState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    return {
      playlists: data.playlists ?? [],
      recentSearches: data.recentSearches ?? [],
    };
  } catch {
    return {};
  }
}

function persist(state: LibraryState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        playlists: state.playlists,
        recentSearches: state.recentSearches,
      }),
    );
  } catch {}
}

export const useLibraryStore = create<LibraryState>()((set, get) => {
  const persisted = loadPersistedState();

  return {
    playlists: [],
    recentSearches: [],
    activeFilter: 'playlists' as const,
    viewMode: 'grid' as const,
    sortBy: 'date' as const,
    ...persisted,

    createPlaylist: (name) => {
      const playlist: Playlist = {
        id: generateId(),
        name,
        tracks: [],
        trackIds: [],
        artworkUrls: [],
        createdAt: Date.now(),
      };
      set((s) => ({ playlists: [...s.playlists, playlist] }));
      persist(get());
    },

    deletePlaylist: (id) => {
      set((s) => ({ playlists: s.playlists.filter((p) => p.id !== id) }));
      persist(get());
    },

    addToPlaylist: (playlistId, track) => {
      set((s) => ({
        playlists: s.playlists.map((p) => {
          if (p.id !== playlistId) return p;
          if (p.trackIds.includes(track.id)) return p;
          const tracks = [...p.tracks, track];
          const trackIds = [...p.trackIds, track.id];
          const artworkUrls = track.artworkUrl
            ? [...p.artworkUrls, track.artworkUrl]
            : p.artworkUrls;
          return { ...p, tracks, trackIds, artworkUrls };
        }),
      }));
      persist(get());
    },

    removeFromPlaylist: (playlistId, trackId) => {
      set((s) => ({
        playlists: s.playlists.map((p) => {
          if (p.id !== playlistId) return p;
          const removedTrack = p.tracks.find((t) => t.id === trackId);
          const tracks = p.tracks.filter((t) => t.id !== trackId);
          const trackIds = p.trackIds.filter((id) => id !== trackId);
          const artworkUrls = removedTrack?.artworkUrl
            ? p.artworkUrls.filter((url) => url !== removedTrack.artworkUrl)
            : p.artworkUrls;
          return { ...p, tracks, trackIds, artworkUrls };
        }),
      }));
      persist(get());
    },

    addRecentSearch: (query) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      set((s) => {
        const filtered = s.recentSearches.filter((q) => q !== trimmed);
        const next = [trimmed, ...filtered];
        return {
          recentSearches:
            next.length > RECENT_SEARCHES_MAX ? next.slice(0, RECENT_SEARCHES_MAX) : next,
        };
      });
      persist(get());
    },

    removeRecentSearch: (query) => {
      set((s) => ({
        recentSearches: s.recentSearches.filter((q) => q !== query),
      }));
      persist(get());
    },

    clearRecentSearches: () => {
      set({ recentSearches: [] });
      persist(get());
    },

    setActiveFilter: (filter) => set({ activeFilter: filter }),
    setViewMode: (mode) => set({ viewMode: mode }),
    setSortBy: (sort) => set({ sortBy: sort }),
  };
});
