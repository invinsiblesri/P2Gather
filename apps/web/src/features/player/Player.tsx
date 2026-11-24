import { Track } from '@p2gather/shared';
import { Play, Pause, SkipForward } from 'lucide-react';

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
    <div className="relative glass-strong rounded-glass p-5 w-full overflow-hidden">
      {/* Subtle background glow from artwork */}
      {currentTrack?.artworkUrl && (
        <div className="absolute inset-0 opacity-10">
          <img src={currentTrack.artworkUrl} alt="" className="w-full h-full object-cover blur-3xl scale-150" />
        </div>
      )}

      {currentTrack ? (
        <div className="relative flex items-center gap-4">
          {/* Artwork */}
          {currentTrack.artworkUrl ? (
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-brand-lime/20 rounded-xl blur-xl scale-110 opacity-30" />
              <img
                src={currentTrack.artworkUrl}
                alt={currentTrack.title}
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-white/[0.06]"
              />
            </div>
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-brand-lime/20 to-brand-indigo/20 border border-white/[0.06] flex-shrink-0" />
          )}

          {/* Info + progress */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-display font-bold text-text-primary truncate">{currentTrack.title}</h3>
            <p className="text-text-muted text-xs truncate mb-3">{currentTrack.artist}</p>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-text-muted tabular-nums w-8">{fmt(pos)}</span>
              <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden group cursor-pointer">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-lime to-brand-mint transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-text-muted tabular-nums w-8 text-right">{fmt(dur)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onPlayPause}
              className="w-11 h-11 rounded-full bg-brand-lime text-bg-canvas flex items-center justify-center shadow-glow-lime hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
            </button>
            <button
              onClick={onNext}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-text-muted hover:text-text-primary glass-hover"
            >
              <SkipForward size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative text-center py-8">
          {/* Equalizer bars placeholder */}
          <div className="flex items-end justify-center gap-1 mb-3 h-5">
            <div className="w-1 bg-brand-lime/30 rounded-full animate-equalizer-1" />
            <div className="w-1 bg-brand-lime/30 rounded-full animate-equalizer-2" />
            <div className="w-1 bg-brand-lime/30 rounded-full animate-equalizer-3" />
            <div className="w-1 bg-brand-lime/30 rounded-full animate-equalizer-1" style={{ animationDelay: '0.3s' }} />
            <div className="w-1 bg-brand-lime/30 rounded-full animate-equalizer-2" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-text-muted text-sm">Search for a track to start listening</p>
        </div>
      )}
    </div>
  );
}
