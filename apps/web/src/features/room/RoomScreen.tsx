import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Player } from '../player/Player';
import { ListenerStrip } from './ListenerStrip';
import { useQueue } from '../queue/Queue';

export function RoomScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const queue = useQueue();
  const [track, setTrack] = useState<any>(null);

  const handlePlayPause = () => setIsPlaying(prev => !prev);
  const handleSeek = () => {};
  const handleNext = () => {};

  return (
    <div className="min-h-screen bg-bg-canvas text-text-primary p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <Player track={track} isPlaying={isPlaying} onPlayPause={handlePlayPause} onSeek={handleSeek} onNext={handleNext} />
        <ListenerStrip />
      </div>
    </div>
  );
}
