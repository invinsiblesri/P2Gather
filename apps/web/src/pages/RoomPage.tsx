import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueue } from '../features/queue/Queue';
import { Player } from '../features/player/Player';
import { ListenerStrip } from '../features/room/ListenerStrip';
import { Chat } from '../features/chat/Chat';
import { io } from 'socket.io-client';
import { useSearch } from '../features/search/useSearch';
import { YouTubeProvider } from '../data/providers/youtube';

export function RoomPage() {
  const { code } = useParams<{ code: string }>();
  const roomCode = code || '';
  const queue = useQueue();
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState<any>(null);
  const provider = new YouTubeProvider();

  const { query, setQuery, results, loading, addToQueue } = useSearch(provider);

  useEffect(() => {
    if (!roomCode) return;
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');

    socket.emit('room:join', { roomCode, name: 'Listener' });

    socket.on('room:state', (room: any) => {
      if (room.currentTrack) setTrack(room.currentTrack);
      if (room.isPlaying !== undefined) setIsPlaying(room.isPlaying);
    });

    return () => {
      socket.close();
    };
  }, [roomCode]);

  return (
    <div className="min-h-screen bg-bg-canvas text-text-primary">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-bg-canvas border-b border-white/10 flex items-center justify-between px-6 py-2 z-50">
        <span className="text-xl font-bold text-text-primary">P2GATHER</span>
        <div className="space-x-4 hidden sm:flex items-center">
          <span className="text-xs font-mono text-brand-mint">{roomCode}</span>
        </div>
      </nav>
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Room Info */}
          <div className="bg-bg-surface border border-white/10 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-text-primary font-mono font-semibold">{roomCode}</span>
              <button
                onClick={() => navigator.clipboard.writeText(roomCode)}
                className="text-sm text-brand-mint hover:text-brand-mint/90"
              >
                Copy code
              </button>
            </div>
            <p className="text-xs text-text-muted mt-2">Share this code to invite friends</p>
          </div>

          {/* Queue */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-text-primary mb-4 text-center">Queue</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-text-secondary px-4 py-2">Track</th>
                    <th className="text-left text-sm font-medium text-text-secondary px-4 py-2">Artist</th>
                    <th className="text-left text-sm font-medium text-text-secondary px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {queue.queue.slice(0, 5).map((t, i) => (
                    <tr key={i} className="border-b border-white/10">
                      <td className="text-sm text-text-primary">{t.title}</td>
                      <td className="text-sm text-text-secondary">{t.artist}</td>
                      <td className="text-sm text-brand-mint text-center">✓</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-text-muted text-sm mt-2">
              {queue.queue.length} items in queue
            </p>
          </div>

          {/* Player */}
          <Player
            track={track}
            isPlaying={isPlaying}
            onPlayPause={() => {}}
            onSeek={() => {}}
            onNext={() => {}}
          />

          {/* Listeners */}
          <div className="mt-8">
            <ListenerStrip />
          </div>

          {/* Chat */}
          <div className="mt-8">
            <Chat roomCode={roomCode} />
          </div>

          {/* Search */}
          <section className="py-8">
            <h2 className="text-xl font-bold text-text-primary mb-4 text-center">Search</h2>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search YouTube..."
                className="flex-1 px-4 py-2 border border-white/10 rounded-lg bg-bg-surface focus:outline-none focus:ring-2 focus:ring-brand-indigo text-text-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {loading && <p className="text-text-muted">Loading...</p>}
            {!loading && query && (
              <div className="space-y-2 mt-4">
                {results.length === 0 ? (
                  <p className="text-text-muted">No results found</p>
                ) : (
                  results.map((t, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-bg-surface rounded"
                    >
                      <div className="w-14 h-14 rounded bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        {t.artworkUrl && (
                          <img
                            src={t.artworkUrl}
                            alt={t.title}
                            className="w-full h-full object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="flex-1 pl-3">
                        <h3 className="text-sm font-medium text-text-primary">{t.title}</h3>
                        <p className="text-text-secondary text-xs">{t.artist}</p>
                      </div>
                      <button
                        onClick={() => addToQueue(t)}
                        className="mt-1 text-brand-mint text-sm hover:underline"
                      >
                        Add to Queue
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}