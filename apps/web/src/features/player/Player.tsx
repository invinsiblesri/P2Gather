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

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div className="relative bg-bg-surface border border-white/10 rounded-card p-6 w-full max-w-3xl mx-auto overflow-hidden">
      {/* Glow behind the card */}
      <div className="absolute -inset-px bg-gradient-to-r from-brand-indigo/10 to-brand-mint/10 rounded-card blur-sm -z-10" />

      {currentTrack ? (
        <div className="flex items-center gap-5">
          {/* Artwork */}
          {currentTrack.artworkUrl ? (
            <img
              src={currentTrack.artworkUrl}
              alt={currentTrack.title}
              className="w-16 h-16 rounded-lg object-cover border border-white/10 flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brand-indigo/40 to-brand-mint/40 border border-white/10 flex-shrink-0" />
          )}

          {/* Info + progress */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text-primary truncate">{currentTrack.title}</h3>
            <p className="text-text-secondary text-xs truncate mb-2">{currentTrack.artist}</p>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-indigo to-brand-mint rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-text-muted tabular-nums whitespace-nowrap">
                {fmt(pos)} / {fmt(dur)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onPlayPause}
              className="w-10 h-10 rounded-full bg-brand-indigo flex items-center justify-center text-white hover:bg-[#4F46E5] transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            </button>
            <button
              onClick={onNext}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors"
            >
              <SkipForward size={14} />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-text-muted text-sm text-center py-6">Nothing playing yet. Search and add a track to the queue.</p>
      )}
    </div>
  );
}
