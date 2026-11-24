import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Track } from '@p2gather/shared';
import { Player } from '../features/player/Player';
import { ListenerStrip } from '../features/room/ListenerStrip';
import { Chat } from '../features/chat/Chat';
import { Search } from '../features/search/Search';
import { io } from 'socket.io-client';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

export function RoomPage() {
  const { code } = useParams<{ code: string }>();
  const roomCode = code || '';
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState<Track | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!roomCode) return;
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');
    socket.emit('room:join', { roomCode, name: 'Listener' });
    socket.on('room:state', (room: any) => {
      if (room.currentTrack) setTrack(room.currentTrack);
      if (room.isPlaying !== undefined) setIsPlaying(room.isPlaying);
    });
    return () => { socket.close(); };
  }, [roomCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-bone-50">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-ink-950/90 backdrop-blur-md border-b border-edge z-50">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-electric flex items-center justify-center">
              <span className="text-white font-display font-bold text-[9px]">P2</span>
            </div>
            <span className="font-display font-semibold text-sm hidden sm:inline">P2Gather</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 border border-edge bg-ink-950 px-3 py-1.5 font-mono text-[11px] rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-electric animate-blink" />
              <span className="text-bone-200 tracking-wider">{roomCode}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex h-8 w-8 items-center justify-center border border-edge text-bone-400 hover:text-bone-50 hover:border-edge-hi transition-colors"
              title="Copy invite link"
            >
              {copied ? <Check size={14} className="text-electric" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-14">
        <div className="max-w-6xl mx-auto px-4 py-5">
          {/* Player - full width */}
          <div className="mb-5">
            <Player
              track={track}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(p => !p)}
              onSeek={() => {}}
              onNext={() => {}}
            />
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-5 gap-5">
            {/* Left: Search + Listeners */}
            <div className="lg:col-span-3 space-y-5">
              <div className="spot border border-edge rounded-spot overflow-hidden backdrop-blur-sm bg-ink-950/60">
                <Search />
              </div>
              <ListenerStrip />
            </div>

            {/* Right: Chat */}
            <div className="lg:col-span-2">
              <Chat roomCode={roomCode} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
