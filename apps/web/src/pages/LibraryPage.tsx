import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Users,
  User,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  Plus,
  Heart,
  Music,
} from 'lucide-react';
import { useLibraryStore, Playlist } from '../stores/libraryStore';
import { usePlayerStore } from '../stores/playerStore';
import { Logo } from '../ui/Logo';
import { cn } from '../utils/cn';

const FILTER_CHIPS = ['playlists', 'albums', 'artists'] as const;

function PlaylistCard({
  playlist,
  onClick,
}: {
  playlist: Playlist;
  onClick: () => void;
}) {
  const isLiked = playlist.id === 'liked';
  const artworks = playlist.artworkUrls.slice(0, 4);
  const count = playlist.trackIds.length;

  return (
    <button
      onClick={onClick}
      className="flex flex-col text-left group"
    >
      <div className="aspect-square w-full rounded-xl overflow-hidden bg-ink-800 border border-edge mb-2 relative">
        {isLiked ? (
          <div className="w-full h-full bg-gradient-to-br from-hot/30 via-electric/20 to-ink-900 flex items-center justify-center">
            <Heart size={40} className="text-hot" fill="currentColor" />
          </div>
        ) : artworks.length >= 4 ? (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
            {artworks.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        ) : artworks.length > 0 ? (
          <img
            src={artworks[0]}
            alt={playlist.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-electric/10 to-ink-900 flex items-center justify-center">
            <Music size={32} className="text-bone-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-colors" />
      </div>
      <p className="text-sm font-medium text-bone-50 truncate">{playlist.name}</p>
      <p className="text-xs text-bone-500 mt-0.5">
        {count} {count === 1 ? 'song' : 'songs'}
      </p>
    </button>
  );
}

export function LibraryPage() {
  const navigate = useNavigate();
  const playlists = useLibraryStore((s) => s.playlists);
  const activeFilter = useLibraryStore((s) => s.activeFilter);
  const setActiveFilter = useLibraryStore((s) => s.setActiveFilter);
  const viewMode = useLibraryStore((s) => s.viewMode);
  const setViewMode = useLibraryStore((s) => s.setViewMode);
  const sortBy = useLibraryStore((s) => s.sortBy);
  const setSortBy = useLibraryStore((s) => s.setSortBy);
  const createPlaylist = useLibraryStore((s) => s.createPlaylist);
  const likedTrackIds = usePlayerStore((s) => s.likedTrackIds);

  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [newName, setNewName] = useState('');

  const likedPlaylist = playlists.find((p) => p.id === 'liked');
  const userPlaylists = playlists.filter((p) => p.id !== 'liked');

  const sortedPlaylists = [...userPlaylists].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return b.createdAt - a.createdAt;
  });

  const handleCreate = () => {
    if (newName.trim()) {
      createPlaylist(newName.trim());
      setNewName('');
      setShowNewPlaylist(false);
    }
  };

  return (
    <div className="px-4 pt-3 pb-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <h1 className="font-display text-xl font-bold text-bone-50">Library</h1>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('/history')}
            className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-bone-50 hover:bg-ink-800/60 transition-colors"
          >
            <Clock size={18} />
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-bone-50 hover:bg-ink-800/60 transition-colors">
            <Users size={18} />
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-full text-bone-400 hover:text-bone-50 hover:bg-ink-800/60 transition-colors">
            <User size={18} />
          </button>
        </div>
      </header>

      {/* Filter chips */}
      <div
        className="flex gap-2 mb-4 overflow-x-auto -mx-4 px-4 pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            className={cn(
              'px-4 py-1.5 rounded-full font-mono text-xs tracking-wider capitalize whitespace-nowrap transition-colors border',
              activeFilter === chip
                ? 'bg-electric text-white border-electric'
                : 'border-edge text-bone-400 hover:text-bone-50 hover:border-edge-hi'
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Sort + view controls */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setSortBy(sortBy === 'date' ? 'name' : 'date')}
          className="flex items-center gap-1.5 text-xs font-mono text-bone-400 hover:text-bone-50 transition-colors"
        >
          {sortBy === 'date' ? 'Date added' : 'Name'}
          <ChevronDown size={14} />
        </button>
        <div className="flex items-center gap-1">
          <button className="h-8 w-8 flex items-center justify-center text-bone-500 hover:text-bone-50 transition-colors">
            <Search size={16} />
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="h-8 w-8 flex items-center justify-center text-bone-500 hover:text-bone-50 transition-colors"
          >
            {viewMode === 'grid' ? <List size={16} /> : <LayoutGrid size={16} />}
          </button>
        </div>
      </div>

      {/* Playlists content */}
      {activeFilter === 'playlists' && (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4">
              {likedPlaylist && (
                <PlaylistCard
                  playlist={{
                    ...likedPlaylist,
                    trackIds: Array.from(likedTrackIds),
                  }}
                  onClick={() => {}}
                />
              )}
              {sortedPlaylists.map((pl) => (
                <PlaylistCard key={pl.id} playlist={pl} onClick={() => {}} />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {likedPlaylist && (
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-800/50 transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-hot/30 via-electric/20 to-ink-900 flex items-center justify-center flex-shrink-0 border border-edge">
                    <Heart size={20} className="text-hot" fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-bone-50">Liked</p>
                    <p className="text-xs text-bone-500 mt-0.5">
                      {likedTrackIds.size} songs
                    </p>
                  </div>
                </div>
              )}
              {sortedPlaylists.map((pl) => (
                <div
                  key={pl.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-800/50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-ink-800 border border-edge flex-shrink-0">
                    {pl.artworkUrls.length > 0 ? (
                      <img
                        src={pl.artworkUrls[0]}
                        alt={pl.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-electric/10 to-ink-900 flex items-center justify-center">
                        <Music size={18} className="text-bone-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-bone-50 truncate">
                      {pl.name}
                    </p>
                    <p className="text-xs text-bone-500 mt-0.5">
                      {pl.trackIds.length} songs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeFilter === 'albums' && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Music size={40} className="text-bone-500/40 mb-3" />
          <p className="text-bone-500 text-sm">No albums yet</p>
          <p className="text-bone-500/60 text-xs mt-1">
            Albums from your playlists will appear here
          </p>
        </div>
      )}

      {activeFilter === 'artists' && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users size={40} className="text-bone-500/40 mb-3" />
          <p className="text-bone-500 text-sm">No artists yet</p>
          <p className="text-bone-500/60 text-xs mt-1">
            Artists you listen to will appear here
          </p>
        </div>
      )}

      {/* New playlist dialog */}
      {showNewPlaylist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/80 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm bg-ink-900 border border-edge rounded-2xl p-6 shadow-2xl">
            <h3 className="font-display text-lg font-semibold text-bone-50 mb-4">
              New playlist
            </h3>
            <input
              type="text"
              placeholder="Playlist name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreate();
              }}
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-ink-800/60 border border-edge text-sm text-bone-50 placeholder:text-bone-500/60 focus:outline-none focus:border-electric/40 focus:ring-1 focus:ring-electric/20 mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowNewPlaylist(false);
                  setNewName('');
                }}
                className="px-4 py-2 text-sm font-medium text-bone-400 hover:text-bone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim()}
                className="px-5 py-2 text-sm font-medium bg-electric text-white rounded-full hover:bg-electric/90 disabled:opacity-40 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setShowNewPlaylist(true)}
        className="fixed bottom-24 right-5 z-40 h-14 w-14 rounded-full bg-electric text-white shadow-lg shadow-electric/30 flex items-center justify-center hover:bg-electric/90 active:scale-95 transition-all"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
