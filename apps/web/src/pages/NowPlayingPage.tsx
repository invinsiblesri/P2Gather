import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  MoreHorizontal,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  ListMusic,
  Users,
  Plus,
  Music2,
} from 'lucide-react';
import { usePlayerStore } from '../stores/playerStore';
import { useAudio } from '../hooks/useAudio';
import { BeatVisualizer } from '../components/BeatVisualizer';
import { cn } from '../utils/cn';

function fmt(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

export function NowPlayingPage() {
  const navigate = useNavigate();
  const { frequencyData } = useAudio();

  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const positionSec = usePlayerStore((s) => s.positionSec);
  const durationSec = usePlayerStore((s) => s.durationSec);
  const volume = usePlayerStore((s) => s.volume);
  const repeat = usePlayerStore((s) => s.repeat);
  const shuffle = usePlayerStore((s) => s.shuffle);
  const bitrate = usePlayerStore((s) => s.bitrate);
  const likedTrackIds = usePlayerStore((s) => s.likedTrackIds);

  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const seek = usePlayerStore((s) => s.seek);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const next = usePlayerStore((s) => s.next);
  const previous = usePlayerStore((s) => s.previous);
  const toggleRepeat = usePlayerStore((s) => s.toggleRepeat);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
  const toggleLike = usePlayerStore((s) => s.toggleLike);

  const isLiked = currentTrack ? likedTrackIds.has(currentTrack.id) : false;

  // Seek bar drag state
  const seekBarRef = useRef<HTMLDivElement>(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPos, setSeekPos] = useState(0);

  const displayPos = isSeeking ? seekPos : positionSec;
  const progress = durationSec > 0 ? (displayPos / durationSec) * 100 : 0;

  const calcSeekPos = useCallback(
    (clientX: number) => {
      const bar = seekBarRef.current;
      if (!bar || durationSec <= 0) return 0;
      const rect = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return pct * durationSec;
    },
    [durationSec],
  );

  const handleSeekStart = useCallback(
    (clientX: number) => {
      setIsSeeking(true);
      setSeekPos(calcSeekPos(clientX));
    },
    [calcSeekPos],
  );

  const handleSeekMove = useCallback(
    (clientX: number) => {
      if (!isSeeking) return;
      setSeekPos(calcSeekPos(clientX));
    },
    [isSeeking, calcSeekPos],
  );

  const handleSeekEnd = useCallback(() => {
    if (!isSeeking) return;
    seek(seekPos);
    setIsSeeking(false);
  }, [isSeeking, seekPos, seek]);

  // Mouse events for seek bar
  useEffect(() => {
    if (!isSeeking) return;
    const onMove = (e: MouseEvent) => handleSeekMove(e.clientX);
    const onUp = () => handleSeekEnd();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isSeeking, handleSeekMove, handleSeekEnd]);

  // Marquee scroll
  const marqueeText = currentTrack
    ? `♪ ${currentTrack.title} — ${currentTrack.artist}   ·   `
    : '♪ No track playing   ·   ';

  if (!currentTrack) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950">
        <div className="text-center px-6">
          <Music2 size={48} className="mx-auto text-bone-500 mb-4" />
          <p className="font-display text-lg text-bone-300">No track playing</p>
          <p className="text-bone-500 text-sm mt-1">Search for music to get started</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2.5 rounded-full bg-electric text-bone-50 font-display text-sm font-semibold hover:bg-electric/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden">
      {/* Blurred background artwork */}
      {currentTrack.artworkUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentTrack.artworkUrl})` }}
        >
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-[60px]" />
        </div>
      )}
      {!currentTrack.artworkUrl && (
        <div className="absolute inset-0 bg-ink-950" />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-safe-top py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-bone-300 hover:text-bone-50 hover:bg-white/10 transition-colors"
          >
            <ChevronDown size={24} />
          </button>
          <span
            className={cn(
              'px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest',
              currentTrack.source === 'youtube'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
            )}
          >
            {currentTrack.source}
          </span>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-bone-300 hover:text-bone-50 hover:bg-white/10 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Scrollable center area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 min-h-0">
          {/* Beat Visualizer + Artwork */}
          <div className="mb-8">
            <BeatVisualizer
              frequencyData={frequencyData}
              artworkUrl={currentTrack.artworkUrl}
              size={typeof window !== 'undefined' && window.innerWidth >= 640 ? 400 : 280}
              variant="circle"
            />
          </div>

          {/* Track info */}
          <div className="w-full max-w-md text-center">
            <h1 className="font-display text-xl font-bold text-bone-50 truncate">
              {currentTrack.title}
            </h1>
            <p className="text-bone-300 text-sm mt-1 truncate">
              {currentTrack.artist}
            </p>
            {bitrate > 0 && (
              <span className="inline-block mt-2 px-2.5 py-0.5 bg-ink-800/80 border border-edge rounded-full font-mono text-[10px] text-bone-400 tabnum">
                {bitrate} kbps
              </span>
            )}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="px-6 pb-4 w-full max-w-md mx-auto">
          {/* Seek bar */}
          <div className="mb-4">
            <div
              ref={seekBarRef}
              className="relative h-6 flex items-center cursor-pointer group"
              onMouseDown={(e) => handleSeekStart(e.clientX)}
              onTouchStart={(e) => handleSeekStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleSeekMove(e.touches[0].clientX)}
              onTouchEnd={handleSeekEnd}
            >
              {/* Track background */}
              <div className="absolute left-0 right-0 h-1 group-hover:h-1.5 bg-white/10 rounded-full transition-all">
                {/* Progress fill */}
                <div
                  className="h-full bg-bone-50 rounded-full relative"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  {/* Thumb */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-bone-50 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                </div>
              </div>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-bone-500 tabnum -mt-1">
              <span>{fmt(displayPos)}</span>
              <span>-{fmt(Math.max(0, durationSec - displayPos))}</span>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={toggleShuffle}
              className={cn(
                'p-2 rounded-full transition-colors',
                shuffle ? 'text-electric' : 'text-bone-400 hover:text-bone-50',
              )}
            >
              <Shuffle size={20} />
            </button>
            <button
              onClick={previous}
              className="p-2 text-bone-50 hover:text-white transition-colors"
            >
              <SkipBack size={24} fill="currentColor" />
            </button>
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-bone-50 text-ink-950 hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-0.5" />}
            </button>
            <button
              onClick={next}
              className="p-2 text-bone-50 hover:text-white transition-colors"
            >
              <SkipForward size={24} fill="currentColor" />
            </button>
            <button
              onClick={toggleRepeat}
              className={cn(
                'p-2 rounded-full transition-colors relative',
                repeat !== 'off' ? 'text-electric' : 'text-bone-400 hover:text-bone-50',
              )}
            >
              {repeat === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
              {repeat === 'one' && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-electric" />
              )}
            </button>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              className="text-bone-400 hover:text-bone-50 transition-colors"
            >
              {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 appearance-none bg-white/10 rounded-full outline-none
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bone-50 [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-bone-50 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>

          {/* Bottom action bar */}
          <div className="flex items-center justify-around py-2 border-t border-white/5">
            <button className="flex flex-col items-center gap-1 p-2 text-bone-400 hover:text-bone-50 transition-colors">
              <Music2 size={18} />
              <span className="text-[9px] font-mono uppercase tracking-wider">Lyrics</span>
            </button>
            <button
              onClick={() => navigate('/queue')}
              className="flex flex-col items-center gap-1 p-2 text-bone-400 hover:text-bone-50 transition-colors"
            >
              <ListMusic size={18} />
              <span className="text-[9px] font-mono uppercase tracking-wider">Queue</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 text-bone-400 hover:text-bone-50 transition-colors">
              <Users size={18} />
              <span className="text-[9px] font-mono uppercase tracking-wider">Together</span>
            </button>
            <button
              onClick={() => currentTrack && toggleLike(currentTrack.id)}
              className={cn(
                'flex flex-col items-center gap-1 p-2 transition-colors',
                isLiked ? 'text-hot' : 'text-bone-400 hover:text-bone-50',
              )}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              <span className="text-[9px] font-mono uppercase tracking-wider">Like</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 text-bone-400 hover:text-bone-50 transition-colors">
              <Plus size={18} />
              <span className="text-[9px] font-mono uppercase tracking-wider">Add</span>
            </button>
          </div>

          {/* Scrolling marquee */}
          <div className="overflow-hidden mt-2 mb-2">
            <div className="whitespace-nowrap animate-marquee font-mono text-[10px] text-bone-500/50">
              <span>{marqueeText.repeat(4)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee animation keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
        .pt-safe-top {
          padding-top: max(env(safe-area-inset-top, 0px), 8px);
        }
      `}</style>
    </div>
  );
}
