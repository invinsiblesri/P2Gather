import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Track } from '@p2gather/shared';
import { Player } from '../features/player/Player';
import { ListenerStrip } from '../features/room/ListenerStrip';
import { Chat } from '../features/chat/Chat';
import { Search } from '../features/search/Search';
import { io } from 'socket.io-client';
import { Copy, Check } from 'lucide-react';
import { Logo } from '../ui/Logo';

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
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-text-primary">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-bg-canvas/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-sm">P2GATHER</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-bg-surface px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 bg-brand-mint rounded-full animate-pulse" />
            <span className="text-xs font-mono text-text-primary">{roomCode}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded border border-white/10 hover:bg-bg-elevated transition-colors"
            title="Copy room code"
          >
            {copied ? <Check size={14} className="text-brand-mint" /> : <Copy size={14} className="text-text-muted" />}
          </button>
        </div>
      </nav>

      <main className="pt-14">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Top row: Player */}
          <div className="mb-6">
            <Player
              track={track}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(p => !p)}
              onSeek={() => {}}
              onNext={() => {}}
            />
          </div>

          {/* Two-column layout on desktop */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Search + Listeners */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-bg-surface/60 backdrop-blur-sm border border-white/10 rounded-card overflow-hidden">
                <Search />
              </div>
              <ListenerStrip />
            </div>

            {/* Right: Chat */}
            <div className="lg:col-span-1">
              <Chat roomCode={roomCode} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
