import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, MoreVertical } from 'lucide-react';
import { Track } from '@p2gather/shared';
import { usePlayerStore } from '../stores/playerStore';
import { cn } from '../utils/cn';

function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={cn(
            'w-[2px] rounded-full bg-electric origin-bottom',
            `animate-bar-${i}`
          )}
          style={{ height: '14px' }}
        />
      ))}
    </div>
  );
}

function formatTimestamp(date: Date): string {
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function getDateGroup(index: number, total: number): string {
  if (index < Math.ceil(total * 0.4)) return 'Today';
  if (index < Math.ceil(total * 0.7)) return 'Yesterday';
  return 'Earlier this week';
}

function HistoryTrackRow({
  track,
  isCurrentlyPlaying,
  timestamp,
  onPlay,
  onRemove,
}: {
  track: Track;
  isCurrentlyPlaying: boolean;
  timestamp: string;
  onPlay: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-2 rounded-lg transition-colors group',
        isCurrentlyPlaying ? 'bg-electric/5' : 'hover:bg-ink-800/50'
      )}
    >
      <button
        onClick={onPlay}
        className="flex items-center gap-3 flex-1 min-w-0 text-left"
      >
        <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-ink-800 border border-edge">
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
          {isCurrentlyPlaying && (
            <div className="absolute inset-0 bg-ink-950/60 flex items-center justify-center">
              <EqBars />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-sm truncate leading-tight',
              isCurrentlyPlaying
                ? 'font-semibold text-electric'
                : 'font-medium text-bone-50'
            )}
          >
            {track.title}
          </p>
          <p className="text-xs text-bone-500 truncate mt-0.5">{track.artist}</p>
        </div>
      </button>
      <span className="text-[10px] font-mono text-bone-500 flex-shrink-0 tabnum">
        {timestamp}
      </span>
      <button
        onClick={onRemove}
        className="h-8 w-8 flex items-center justify-center text-bone-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
        title="Remove from history"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function HistoryPage() {
  const navigate = useNavigate();
  const history = usePlayerStore((s) => s.history);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const removeFromHistory = usePlayerStore((s) => s.removeFromHistory);
  const clearHistory = usePlayerStore((s) => s.clearHistory);

  const grouped = useMemo(() => {
    const groups: { label: string; tracks: { track: Track; timestamp: string }[] }[] = [];
    let currentGroup = '';

    history.forEach((entry, i) => {
      const group = getDateGroup(i, history.length);
      const time = new Date(entry.playedAt);

      if (group !== currentGroup) {
        currentGroup = group;
        groups.push({ label: group, tracks: [] });
      }
      groups[groups.length - 1].tracks.push({
        track: entry.track,
        timestamp: formatTimestamp(time),
      });
    });

    return groups;
  }, [history]);

  return (
    <div className="px-4 pt-3 pb-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-bone-50 hover:bg-ink-800/60 transition-colors"
          >
            <X size={20} />
          </button>
          <h1 className="font-display text-xl font-bold text-bone-50">
            Listening History
          </h1>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-red-400 hover:bg-ink-800/60 transition-colors"
            title="Clear history"
          >
            <Trash2 size={18} />
          </button>
        )}
      </header>

      {/* Stats subtitle */}
      <p className="text-xs font-mono text-bone-500 mb-5 ml-12">
        {history.length} recently played{' '}
        {history.length === 1 ? 'song' : 'songs'}
      </p>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex items-end gap-[3px] h-8 mb-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-bone-500/20"
                style={{ height: `${8 + Math.sin(i * 0.8) * 12}px` }}
              />
            ))}
          </div>
          <p className="text-bone-500 text-sm">No listening history yet</p>
          <p className="text-bone-500/60 text-xs mt-1">
            Songs you play will appear here
          </p>
        </div>
      )}

      {/* Grouped track list */}
      {grouped.map((group) => (
        <section key={group.label} className="mb-6">
          <h3 className="font-display text-sm font-semibold text-bone-300 mb-2 ml-1">
            {group.label}
          </h3>
          <div className="space-y-0.5">
            {group.tracks.map(({ track, timestamp }) => (
              <HistoryTrackRow
                key={track.id}
                track={track}
                isCurrentlyPlaying={
                  isPlaying && currentTrack?.id === track.id
                }
                timestamp={timestamp}
                onPlay={() => play(track)}
                onRemove={() => removeFromHistory(track.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
