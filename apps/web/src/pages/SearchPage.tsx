import { useState, useCallback } from 'react';
import {
  Search as SearchIcon,
  Mic,
  Clock,
  X,
  ArrowUpRight,
  Loader2,
  Plus,
  MoreVertical,
} from 'lucide-react';
import { Track } from '@p2gather/shared';
import { useSearch } from '../features/search/useSearch';
import { YouTubeProvider } from '../data/providers/youtube';
import { AudiusProvider } from '../data/providers/audius';
import { usePlayerStore } from '../stores/playerStore';
import { useLibraryStore } from '../stores/libraryStore';
import { cn } from '../utils/cn';

const youtubeProvider = new YouTubeProvider();
const audiusProvider = new AudiusProvider();

function RecentSearchItem({
  term,
  onTap,
  onRemove,
}: {
  term: string;
  onTap: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 group">
      <Clock size={16} className="text-bone-500 flex-shrink-0" />
      <button
        onClick={onTap}
        className="flex-1 text-left text-sm text-bone-200 truncate hover:text-bone-50 transition-colors"
      >
        {term}
      </button>
      <button
        onClick={onRemove}
        className="h-7 w-7 flex items-center justify-center text-bone-500 hover:text-bone-300 opacity-0 group-hover:opacity-100 transition-all"
      >
        <X size={14} />
      </button>
      <button
        onClick={onTap}
        className="h-7 w-7 flex items-center justify-center text-bone-500 hover:text-electric transition-colors"
      >
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}

function RecentlyPlayedScroll({ tracks }: { tracks: Track[] }) {
  const play = usePlayerStore((s) => s.play);

  if (tracks.length === 0) return null;

  return (
    <section className="mb-6">
      <h3 className="font-display text-base font-semibold text-bone-50 mb-3">
        Recently played
      </h3>
      <div
        className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => play(track)}
            className="flex-shrink-0 w-[120px] group"
          >
            <div className="w-[120px] h-[120px] rounded-lg overflow-hidden bg-ink-800 border border-edge mb-2">
              {track.artworkUrl ? (
                <img
                  src={track.artworkUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-electric/20 to-hot/10 flex items-center justify-center">
                  <span className="text-bone-400 text-2xl">♪</span>
                </div>
              )}
            </div>
            <p className="text-xs font-medium text-bone-200 truncate">{track.title}</p>
            <p className="text-[10px] text-bone-500 truncate mt-0.5">{track.artist}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function SearchResultRow({
  track,
  onPlay,
  onAdd,
}: {
  track: Track;
  onPlay: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-800/50 transition-colors group">
      <button onClick={onPlay} className="flex items-center gap-3 flex-1 min-w-0 text-left">
        <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-ink-800 border border-edge">
          {track.artworkUrl ? (
            <img
              src={track.artworkUrl}
              alt={track.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-electric/20 to-hot/10 flex items-center justify-center text-bone-500 text-xs">
              ♪
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-bone-50 truncate">{track.title}</p>
          <p className="text-xs text-bone-500 truncate mt-0.5">{track.artist}</p>
        </div>
      </button>
      <button
        onClick={onAdd}
        className="h-8 w-8 flex items-center justify-center text-bone-500 hover:text-electric transition-colors opacity-0 group-hover:opacity-100"
        title="Add to queue"
      >
        <Plus size={16} />
      </button>
      <button className="h-8 w-8 flex items-center justify-center text-bone-500 hover:text-bone-300 transition-colors opacity-0 group-hover:opacity-100">
        <MoreVertical size={16} />
      </button>
    </div>
  );
}

export function SearchPage() {
  const [provider, setProvider] = useState<'youtube' | 'audius'>('youtube');
  const {
    query,
    setQuery,
    results,
    loading,
    error,
    runSearch,
    addToQueue,
  } = useSearch(
    provider === 'youtube' ? youtubeProvider : audiusProvider
  );

  const history = usePlayerStore((s) => s.history);
  const play = usePlayerStore((s) => s.play);
  const addToQueueStore = usePlayerStore((s) => s.addToQueue);
  const recentSearches = useLibraryStore((s) => s.recentSearches);
  const addRecentSearch = useLibraryStore((s) => s.addRecentSearch);
  const removeRecentSearch = useLibraryStore((s) => s.removeRecentSearch);
  const clearRecentSearches = useLibraryStore((s) => s.clearRecentSearches);

  const hasQuery = query.trim().length > 0;
  const hasResults = !loading && !error && results.length > 0;
  const noResults = !loading && !error && hasQuery && results.length === 0;

  const handleSearch = useCallback(
    (term: string) => {
      setQuery(term);
      if (term.trim()) {
        addRecentSearch(term.trim());
      }
    },
    [setQuery, addRecentSearch]
  );

  const handleSubmit = useCallback(() => {
    if (query.trim()) {
      addRecentSearch(query.trim());
      runSearch();
    }
  }, [query, addRecentSearch, runSearch]);

  const handlePlayResult = useCallback(
    (track: Track) => {
      play(track);
      if (query.trim()) addRecentSearch(query.trim());
    },
    [play, query, addRecentSearch]
  );

  return (
    <div className="px-4 pt-3 pb-4">
      {/* Search bar */}
      <div className="relative mb-5">
        <SearchIcon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-bone-500"
        />
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          className="w-full pl-11 pr-12 py-3.5 rounded-full bg-ink-900/60 border border-edge text-sm text-bone-50 placeholder:text-bone-500/60 focus:outline-none focus:border-electric/40 focus:ring-1 focus:ring-electric/20 transition-all"
        />
        <Mic
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-bone-500"
        />
      </div>

      {/* Provider tabs (shown when searching) */}
      {hasQuery && (
        <div className="flex gap-0 mb-4 border border-edge rounded-lg overflow-hidden w-fit">
          {(['youtube', 'audius'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={cn(
                'px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors',
                provider === p
                  ? 'bg-electric text-white'
                  : 'text-bone-400 hover:text-bone-50 hover:bg-ink-800/40'
              )}
            >
              {p === 'youtube' ? 'YouTube' : 'Audius'}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 gap-2 text-bone-500 text-sm">
          <Loader2 size={18} className="animate-spin text-electric" />
          Searching...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-red-500/30 bg-red-500/10 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Search results */}
      {hasResults && (
        <div className="space-y-0.5 mb-6">
          {results.map((track, i) => (
            <SearchResultRow
              key={`${track.id}-${i}`}
              track={track}
              onPlay={() => handlePlayResult(track)}
              onAdd={() => addToQueueStore(track)}
            />
          ))}
        </div>
      )}

      {noResults && (
        <p className="text-bone-500 text-sm text-center py-12">
          No results found for "{query}"
        </p>
      )}

      {/* Pre-search content */}
      {!hasQuery && (
        <>
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-base font-semibold text-bone-50">
                  Recent searches
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs font-mono text-bone-500 hover:text-electric transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="divide-y divide-edge">
                {recentSearches.slice(0, 8).map((term) => (
                  <RecentSearchItem
                    key={term}
                    term={term}
                    onTap={() => handleSearch(term)}
                    onRemove={() => removeRecentSearch(term)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Recently played */}
          <RecentlyPlayedScroll tracks={history.slice(0, 10).map((e) => e.track)} />
        </>
      )}
    </div>
  );
}
