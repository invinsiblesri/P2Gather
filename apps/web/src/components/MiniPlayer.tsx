import { useNavigate } from 'react-router-dom';
import { Play, Pause, Heart, Users, ListPlus } from 'lucide-react';
import { usePlayerStore } from '../stores/playerStore';
import { cn } from '../utils/cn';

export function MiniPlayer() {
  const navigate = useNavigate();
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const positionSec = usePlayerStore((s) => s.positionSec);
  const durationSec = usePlayerStore((s) => s.durationSec);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const toggleLike = usePlayerStore((s) => s.toggleLike);
  const likedTrackIds = usePlayerStore((s) => s.likedTrackIds);

  if (!currentTrack) return null;

  const pct = durationSec > 0 ? Math.min((positionSec / durationSec) * 100, 100) : 0;
  const liked = likedTrackIds.has(currentTrack.id);

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 bg-ink-900/95 backdrop-blur-xl border-t border-edge">
      {/* Progress bar */}
      <div className="h-[2px] w-full bg-ink-800">
        <div
          className="h-full bg-electric transition-all duration-300 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center h-16 px-3 gap-3">
        {/* Artwork + info — tappable to open Now Playing */}
        <button
          onClick={() => navigate('/now-playing')}
          className="flex items-center gap-3 flex-1 min-w-0 text-left"
        >
          <div className="relative h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-ink-800 border border-edge">
            {currentTrack.artworkUrl ? (
              <img
                src={currentTrack.artworkUrl}
                alt={currentTrack.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-electric/20 to-hot/10 flex items-center justify-center">
                <span className="text-bone-400 text-sm">♪</span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-bone-50 truncate leading-tight">
              {currentTrack.title}
            </p>
            <p className="text-xs text-bone-500 truncate leading-tight mt-0.5">
              {currentTrack.artist}
            </p>
          </div>
        </button>

        {/* Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-bone-50 hover:bg-ink-800 transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(currentTrack.id);
            }}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
              liked ? 'text-hot' : 'text-bone-500 hover:text-bone-300'
            )}
          >
            <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full text-bone-500 hover:text-bone-300 transition-colors"
          >
            <Users size={16} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full text-bone-500 hover:text-bone-300 transition-colors"
          >
            <ListPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
