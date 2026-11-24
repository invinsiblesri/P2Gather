import { Track } from '@p2gather/shared';
import { Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';

export function Player({
  track: currentTrack,
  isPlaying,
  onPlayPause,
  onSeek,
  onNext,
}: {
  track?: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (pos: number) => void;
  onNext: () => void;
}) {
  const pos = currentTrack?.positionSec || 0;
  const dur = currentTrack?.durationSeconds || 1;
  const pct = Math.min((pos / dur) * 100, 100);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div className="spot border border-edge p-5 sm:p-7 rounded-spot overflow-hidden backdrop-blur-sm bg-ink-950/60 shadow-2xl">
      {currentTrack ? (
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            {/* Artwork */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center border border-edge-hi bg-gradient-to-br from-ink-800 via-ink-850 to-ink-950 shadow-inner overflow-hidden">
              {currentTrack.artworkUrl ? (
                <img src={currentTrack.artworkUrl} alt={currentTrack.title} className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-hot/10" />
                  <span className="relative text-bone-300 text-lg">&#9835;</span>
                </>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-base font-semibold tracking-tight text-bone-50 truncate">{currentTrack.title}</p>
                <button className="shrink-0 p-1 text-bone-500 hover:text-bone-300 transition-colors">
                  <Heart size={16} />
                </button>
              </div>
              <p className="font-mono text-[11px] text-bone-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="relative h-1.5 w-full overflow-hidden bg-ink-800">
              <div className="h-full bg-electric transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[9px] uppercase tracking-wider text-bone-500">
              <span className="tabnum">{fmt(pos)}</span>
              <span className="tabnum">{fmt(dur)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center text-bone-400 hover:text-bone-50 transition-colors">
              <SkipBack size={16} />
            </button>
            <button
              onClick={onPlayPause}
              className="flex h-10 w-10 items-center justify-center border border-edge-hi bg-ink-850 text-bone-50 hover:bg-ink-800 hover:border-bone-200 transition-colors"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={onNext}
              className="flex h-8 w-8 items-center justify-center text-bone-400 hover:text-bone-50 transition-colors"
            >
              <SkipForward size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center py-6">
          <div className="flex items-end justify-center gap-[3px] h-6 mb-3">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-electric/30 origin-bottom"
                style={{
                  height: `${4 + Math.sin(i * 0.5) * 10}px`,
                  animation: `bar ${0.6 + Math.random() * 0.6}s ease-in-out ${i * 0.08}s infinite alternate`,
                }}
              />
            ))}
          </div>
          <p className="text-bone-500 text-sm">Search for a track to start listening</p>
        </div>
      )}
    </div>
  );
}
