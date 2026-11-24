import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Users,
  User,
  BarChart3,
  Play,
  MoreVertical,
  ChevronRight,
} from 'lucide-react';
import { Track } from '@p2gather/shared';
import { usePlayerStore } from '../stores/playerStore';
import { Logo } from '../ui/Logo';
import { cn } from '../utils/cn';

const PLACEHOLDER_TRACKS: Track[] = [
  {
    id: 'demo-1',
    source: 'youtube',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    artworkUrl: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/mqdefault.jpg',
    durationSeconds: 203,
  },
  {
    id: 'demo-2',
    source: 'youtube',
    title: 'Levitating',
    artist: 'Dua Lipa',
    artworkUrl: 'https://i.ytimg.com/vi/TUVcZfQe-Kw/mqdefault.jpg',
    durationSeconds: 203,
  },
  {
    id: 'demo-3',
    source: 'audius',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    artworkUrl: 'https://i.ytimg.com/vi/XXYlFuWEuKI/mqdefault.jpg',
    durationSeconds: 215,
  },
  {
    id: 'demo-4',
    source: 'youtube',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    artworkUrl: 'https://i.ytimg.com/vi/kTJczUoc26U/mqdefault.jpg',
    durationSeconds: 141,
  },
  {
    id: 'demo-5',
    source: 'audius',
    title: 'Peaches',
    artist: 'Justin Bieber ft. Daniel Caesar',
    artworkUrl: 'https://i.ytimg.com/vi/tQ0yjYUFKAE/mqdefault.jpg',
    durationSeconds: 198,
  },
  {
    id: 'demo-6',
    source: 'youtube',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    artworkUrl: 'https://i.ytimg.com/vi/gNi_6U5Pm_o/mqdefault.jpg',
    durationSeconds: 178,
  },
];

function SpeedDialCarousel({ tracks }: { tracks: Track[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const play = usePlayerStore((s) => s.play);

  const items = tracks.length > 0 ? tracks : PLACEHOLDER_TRACKS.slice(0, 6);
  const totalDots = Math.max(1, items.length - 2);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const idx = Math.round(el.scrollLeft / 166);
      setActiveIndex(Math.min(idx, totalDots - 1));
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [totalDots]);

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3 -mx-4 px-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((track) => (
          <button
            key={track.id}
            onClick={() => play(track)}
            className="snap-start flex-shrink-0 w-[150px] group"
          >
            <div className="relative w-[150px] h-[150px] rounded-xl overflow-hidden bg-ink-800 border border-edge">
              {track.artworkUrl ? (
                <img
                  src={track.artworkUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-electric/20 to-hot/10 flex items-center justify-center">
                  <span className="text-bone-400 text-3xl">♪</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-xs font-medium text-bone-50 truncate leading-tight">
                  {track.title}
                </p>
                <p className="text-[10px] text-bone-400 truncate mt-0.5">
                  {track.artist}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-10 w-10 rounded-full bg-electric/90 flex items-center justify-center shadow-lg">
                  <Play size={18} className="text-white ml-0.5" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Dot indicators */}
      {totalDots > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {Array.from({ length: totalDots }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1 rounded-full transition-all duration-300',
                i === activeIndex
                  ? 'w-4 bg-electric'
                  : 'w-1 bg-bone-500/40'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TrackRow({
  track,
  onPlay,
}: {
  track: Track;
  onPlay: () => void;
}) {
  return (
    <button
      onClick={onPlay}
      className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-ink-800/50 transition-colors group text-left"
    >
      <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-ink-800 border border-edge">
        {track.artworkUrl ? (
          <img
            src={track.artworkUrl}
            alt={track.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-electric/20 to-hot/10 flex items-center justify-center">
            <span className="text-bone-400 text-sm">♪</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-bone-50 truncate">{track.title}</p>
        <p className="text-xs text-bone-500 truncate mt-0.5">{track.artist}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-8 w-8 flex items-center justify-center text-bone-500 hover:text-bone-300 opacity-0 group-hover:opacity-100 transition-all"
      >
        <MoreVertical size={16} />
      </button>
    </button>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const history = usePlayerStore((s) => s.history);
  const play = usePlayerStore((s) => s.play);

  const recentTracks = history.slice(0, 8).map((h) => h.track);
  const speedDialTracks = recentTracks.length > 0
    ? recentTracks.filter(
        (t, i, arr) => arr.findIndex((a) => a.artist === t.artist) === i
      ).slice(0, 6)
    : PLACEHOLDER_TRACKS.slice(0, 6);

  const quickPicks = recentTracks.length > 0
    ? PLACEHOLDER_TRACKS.filter((t) => !recentTracks.some((r) => r.id === t.id))
    : PLACEHOLDER_TRACKS;

  return (
    <div className="px-4 pt-3 pb-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <h1 className="font-display text-xl font-bold text-bone-50">Home</h1>
        </div>
        <div className="flex items-center gap-1">
          <button className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-bone-50 hover:bg-ink-800/60 transition-colors">
            <BarChart3 size={18} />
          </button>
          <button
            onClick={() => navigate('/history')}
            className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-bone-50 hover:bg-ink-800/60 transition-colors"
          >
            <Clock size={18} />
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-bone-50 hover:bg-ink-800/60 transition-colors">
            <Users size={18} />
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-bone-50 hover:bg-ink-800/60 transition-colors">
            <User size={18} />
          </button>
        </div>
      </header>

      {/* Speed Dial */}
      <section className="mb-8">
        <SpeedDialCarousel tracks={speedDialTracks} />
      </section>

      {/* Quick Picks */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-bone-50">
            Quick picks
          </h2>
          <button
            onClick={() => {
              quickPicks.forEach((t) => play(t));
            }}
            className="flex items-center gap-1 text-xs font-mono text-electric hover:text-electric/80 transition-colors"
          >
            <Play size={12} /> Play all
          </button>
        </div>
        <div className="space-y-0.5">
          {quickPicks.slice(0, 6).map((track) => (
            <TrackRow key={track.id} track={track} onPlay={() => play(track)} />
          ))}
        </div>
      </section>

      {/* Keep Listening */}
      {recentTracks.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-bone-50">
              Keep listening
            </h2>
            <button
              onClick={() => navigate('/history')}
              className="flex items-center gap-0.5 text-xs font-mono text-bone-400 hover:text-bone-50 transition-colors"
            >
              See all <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-0.5">
            {recentTracks.slice(0, 5).map((track) => (
              <TrackRow
                key={track.id}
                track={track}
                onPlay={() => play(track)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
