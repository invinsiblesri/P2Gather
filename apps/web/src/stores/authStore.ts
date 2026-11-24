import { create } from 'zustand';

export interface User {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
  provider: 'google' | 'email';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedLanguages: string[];
  selectedArtists: string[];
  hasCompletedOnboarding: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLanguages: (langs: string[]) => void;
  setArtists: (artists: string[]) => void;
  completeOnboarding: () => void;
}

const STORAGE_KEY = 'p2gather-auth';

function loadPersistedState(): Partial<AuthState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    return {
      user: data.user ?? null,
      isAuthenticated: !!data.user,
      selectedLanguages: data.selectedLanguages ?? [],
      selectedArtists: data.selectedArtists ?? [],
      hasCompletedOnboarding: data.hasCompletedOnboarding ?? false,
    };
  } catch {
    return {};
  }
}

function persist(state: AuthState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: state.user,
        selectedLanguages: state.selectedLanguages,
        selectedArtists: state.selectedArtists,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    );
  } catch {
    // quota exceeded – silently ignore
  }
}

export const useAuthStore = create<AuthState>()((set, get) => {
  const persisted = loadPersistedState();

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    selectedLanguages: [],
    selectedArtists: [],
    hasCompletedOnboarding: false,
    ...persisted,

    login: (user) => {
      set({ user, isAuthenticated: true });
      persist(get());
    },

    logout: () => {
      set({
        user: null,
        isAuthenticated: false,
        selectedLanguages: [],
        selectedArtists: [],
        hasCompletedOnboarding: false,
      });
      localStorage.removeItem(STORAGE_KEY);
    },

    setLanguages: (langs) => {
      set({ selectedLanguages: langs });
      persist(get());
    },

    setArtists: (artists) => {
      set({ selectedArtists: artists });
      persist(get());
    },

    completeOnboarding: () => {
      set({ hasCompletedOnboarding: true });
      persist(get());
    },
  };
});
