import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  GripVertical,
  X,
  Trash2,
  Play,
  Music2,
} from 'lucide-react';
import { usePlayerStore } from '../stores/playerStore';
import { cn } from '../utils/cn';
import type { Track } from '@p2gather/shared';

export function QueuePage() {
  const navigate = useNavigate();
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const queue = usePlayerStore((s) => s.queue);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const removeFromQueue = usePlayerStore((s) => s.removeFromQueue);
  const clearQueue = usePlayerStore((s) => s.clearQueue);

  // Drag-and-drop reorder state
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  const handleDragStart = useCallback((idx: number) => {
    dragItem.current = idx;
    setDragIdx(idx);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, idx: number) => {
      e.preventDefault();
      setOverIdx(idx);
    },
    [],
  );

  const handleDrop = useCallback(
    (idx: number) => {
      if (dragItem.current === null || dragItem.current === idx) {
        setDragIdx(null);
        setOverIdx(null);
        return;
      }

      const store = usePlayerStore.getState();
      const newQueue = [...store.queue];
      const [moved] = newQueue.splice(dragItem.current, 1);
      newQueue.splice(idx, 0, moved);

      // Direct state update since we need array reorder
      usePlayerStore.setState({ queue: newQueue });

      setDragIdx(null);
      setOverIdx(null);
      dragItem.current = null;
    },
    [],
  );

  const handleDragEnd = useCallback(() => {
    setDragIdx(null);
    setOverIdx(null);
    dragItem.current = null;
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-edge">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-bone-300 hover:text-bone-50 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-display text-lg font-semibold text-bone-50">
          Queue
        </h1>
        <button
          onClick={clearQueue}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors',
            queue.length > 0
              ? 'text-hot hover:bg-hot/10'
              : 'text-bone-500 cursor-default',
          )}
          disabled={queue.length === 0}
        >
          <Trash2 size={14} />
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Now Playing section */}
        {currentTrack && (
          <div className="px-4 pt-4 pb-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-electric mb-3">
              Now Playing
            </p>
            <QueueItem
              track={currentTrack}
              isActive
              isPlaying={isPlaying}
              onPlay={() => {}}
            />
          </div>
        )}

        {/* Up Next section */}
        <div className="px-4 pt-4 pb-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-bone-500 mb-3">
            Up Next · {queue.length} track{queue.length !== 1 ? 's' : ''}
          </p>

          {queue.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Music2 size={32} className="text-bone-500/40 mb-3" />
              <p className="text-bone-500 text-sm">Queue is empty</p>
              <p className="text-bone-500/60 text-xs mt-1">
                Search for tracks and add them to the queue
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {queue.map((track, idx) => (
                <div
                  key={track.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    'transition-all',
                    dragIdx === idx && 'opacity-40',
                    overIdx === idx &&
                      dragIdx !== idx &&
                      'border-t-2 border-electric',
                  )}
                >
                  <QueueItem
                    track={track}
                    onPlay={() => play(track)}
                    onRemove={() => removeFromQueue(track.id)}
                    showDragHandle
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QueueItem({
  track,
  isActive,
  isPlaying,
  onPlay,
  onRemove,
  showDragHandle,
}: {
  track: Track;
  isActive?: boolean;
  isPlaying?: boolean;
  onPlay: () => void;
  onRemove?: () => void;
  showDragHandle?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-2.5 rounded-xl transition-colors group',
        isActive
          ? 'bg-electric/10 border border-electric/20'
          : 'hover:bg-white/5',
      )}
    >
      {/* Drag handle */}
      {showDragHandle && (
        <div className="cursor-grab active:cursor-grabbing text-bone-500/40 hover:text-bone-400 transition-colors touch-none">
          <GripVertical size={16} />
        </div>
      )}

      {/* Artwork */}
      <button
        onClick={onPlay}
        className="relative flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden bg-ink-800 border border-edge group/art"
      >
        {track.artworkUrl ? (
          <img
            src={track.artworkUrl}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
            <Music2 size={16} className="text-bone-500" />
          </div>
        )}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/art:opacity-100 transition-opacity">
            <Play size={14} className="text-bone-50" fill="currentColor" />
          </div>
        )}
        {isActive && isPlaying && (
          <div className="absolute bottom-0.5 right-0.5">
            <div className="flex items-end gap-[1px] h-2.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-full bg-electric origin-bottom"
                  style={{
                    animation: `bar ${0.6 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </button>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm font-display font-medium truncate',
            isActive ? 'text-electric' : 'text-bone-50',
          )}
        >
          {track.title}
        </p>
        <p className="text-xs text-bone-400 truncate mt-0.5">
          {track.artist}
        </p>
      </div>

      {/* Source badge */}
      <span
        className={cn(
          'shrink-0 px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider',
          track.source === 'youtube'
            ? 'bg-red-500/10 text-red-400/60'
            : 'bg-purple-500/10 text-purple-400/60',
        )}
      >
        {track.source === 'youtube' ? 'YT' : 'AU'}
      </span>

      {/* Duration */}
      {track.durationSeconds && (
        <span className="shrink-0 font-mono text-[10px] text-bone-500 tabnum">
          {Math.floor(track.durationSeconds / 60)}:
          {String(Math.floor(track.durationSeconds % 60)).padStart(2, '0')}
        </span>
      )}

      {/* Remove button */}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="shrink-0 p-1.5 rounded-full text-bone-500 hover:text-hot hover:bg-hot/10 opacity-0 group-hover:opacity-100 transition-all"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
