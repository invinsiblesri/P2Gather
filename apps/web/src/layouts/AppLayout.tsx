import { Outlet } from 'react-router-dom';
import { MiniPlayer } from '../components/MiniPlayer';
import { BottomNav } from '../components/BottomNav';
import { usePlayerStore } from '../stores/playerStore';

export function AppLayout() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);

  return (
    <div className="relative min-h-screen bg-ink-950 text-bone-50">
      <div className="mesh-bg" />

      <main className={currentTrack ? 'pb-32' : 'pb-16'}>
        <Outlet />
      </main>

      <MiniPlayer />
      <BottomNav />
    </div>
  );
}
