import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Hero } from '../components/Hero';
import { SpecGrid } from '../components/SpecGrid';
import { LiveRoomPreview } from '../components/LiveRoomPreview';
import { HowItWorks } from '../components/HowItWorks';
import { ACloserLook } from '../components/ACloserLook';
import { JoinWithCode } from '../components/JoinWithCode';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { Search } from '../features/search/Search';
import { Player } from '../features/player/Player';
import { useQueue } from '../features/queue/Queue';

export function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track] = useState<any>({
    id: 'dQw4w9WgXcQ',
    source: 'youtube' as const,
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    artworkUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    durationSeconds: 213,
    positionSec: 72,
  });
  const queue = useQueue();

  return (
    <div className="min-h-screen bg-bg-canvas text-text-primary">
      <NavBar />
      <main className="pt-16">
        <Hero />
        <SpecGrid />
        <LiveRoomPreview />
        <HowItWorks />
        <ACloserLook />
        
        {/* Search Section */}
        <section className="py-12 px-6">
          <Search />
        </section>

        {/* Queue Section */}
        <section className="py-12 px-6">
          <h2 className="text-xl font-bold text-text-primary mb-6 text-center">Queue</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-sm font-medium text-text-secondary px-4 py-2">Track</th>
                  <th className="text-left text-sm font-medium text-text-secondary px-4 py-2">Artist</th>
                  <th className="text-left text-sm font-medium text-text-secondary px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {queue.queue.slice(0, 5).map((t, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="text-sm text-text-primary">{t.title}</td>
                    <td className="text-sm text-text-secondary">{t.artist}</td>
                    <td className="text-sm text-brand-mint text-center">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-text-muted text-sm mt-4">
            Max {queue.queue.length} items
          </p>
        </section>

        {/* Player */}
        <section className="py-12 px-6">
          <Player
            track={track}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(prev => !prev)}
            onSeek={() => {}}
            onNext={() => {}}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}