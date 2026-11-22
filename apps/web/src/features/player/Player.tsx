import { Track } from '@p2gather/shared';

export function Player({ 
  track: currentTrack,
  isPlaying,
  onPlayPause,
  onSeek,
  onNext 
}: {
  track?: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (pos: number) => void;
  onNext: () => void;
}) {
  const pos = currentTrack?.positionSec || 0;
  const dur = currentTrack?.durationSeconds || 1;

  return (
    <div className="relative bg-bg-surface border border-white/10 rounded-lg p-6 w-full max-w-3xl mx-auto">
      <div className="absolute top-3 right-3">
        <button onClick={onNext} className="text-text-secondary hover:text-text-primary text-sm">
          Skip Forward
        </button>
      </div>
      
      {currentTrack && (
        <>
          <div className="mb-3">
            <h3 className="text-lg font-bold text-text-primary">{currentTrack.title}</h3>
            <p className="text-text-secondary text-sm">{currentTrack.artist}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-indigo to-brand-mint rounded-full"
                  style={{ width: `${(pos / dur) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs font-mono text-text-muted tabular-nums">
                {Math.floor(pos / 60)}:{String(Math.floor(pos % 60)).padStart(2, '0')} / 
                {Math.floor(dur / 60)}:{String(Math.floor(dur % 60)).padStart(2, '0')}
              </div>
            </div>
            <button onClick={onPlayPause} className="ml-4 px-4 py-2 rounded bg-brand-indigo text-white text-sm">
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </>
      )}
      {!currentTrack && (
        <p className="text-text-muted text-sm text-center py-8">Nothing playing yet. Add a track to the queue.</p>
      )}
    </div>
  );
}