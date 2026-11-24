import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AppLayout } from './layouts/AppLayout';
import { useAuthStore } from './stores/authStore';
import { useAudio } from './hooks/useAudio';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';
import { HistoryPage } from './pages/HistoryPage';
import { NowPlayingPage } from './pages/NowPlayingPage';
import { QueuePage } from './pages/QueuePage';
import { RoomPage } from './pages/RoomPage';
import { JoinPage } from './pages/JoinPage';
import { PrivacyPage } from './pages/PrivacyPage';

function AudioManager() {
  useAudio();
  return null;
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasCompletedOnboarding = useAuthStore((s) => s.hasCompletedOnboarding);

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (!hasCompletedOnboarding) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AudioManager />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<><AnimatedBackground /><LandingPage /></>} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* App routes with bottom nav + mini player */}
        <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/r/:code" element={<RoomPage />} />
        </Route>

        {/* Full-screen overlays (no bottom nav) */}
        <Route path="/now-playing" element={<AuthGuard><NowPlayingPage /></AuthGuard>} />
        <Route path="/queue" element={<AuthGuard><QueuePage /></AuthGuard>} />
        <Route path="/join" element={<JoinPage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
