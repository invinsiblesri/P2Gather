import { useState } from 'react';
import { useSearch } from './useSearch';
import { YouTubeProvider } from '../../data/providers/youtube';
import { AudiusProvider } from '../../data/providers/audius';
import { Search as SearchIcon, Plus, Loader2 } from 'lucide-react';

export function Search() {
  const [provider, setProvider] = useState<'youtube' | 'audius'>('youtube');
  const {
    query, setQuery, results, loading, error, runSearch, addToQueue,
  } = useSearch(
    provider === 'youtube' ? new YouTubeProvider() : new AudiusProvider()
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); runSearch(); }
  };

  const hasResults = !loading && !error && results.length > 0;
  const noResults = !loading && !error && query.trim().length > 0 && results.length === 0;

  return (
    <div className="p-5 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-base font-semibold text-bone-50">Search</h2>
        <div className="flex gap-0 border border-edge font-mono text-[10px]">
          {(['youtube', 'audius'] as const).map(p => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={`px-3 py-1.5 uppercase tracking-wider transition-colors ${
                provider === p ? 'bg-electric text-white' : 'text-bone-400 hover:text-bone-50'
              }`}
            >
              {p === 'youtube' ? 'YT' : 'AU'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone-500" />
          <input
            type="text"
            placeholder="Search tracks, artists..."
            className="w-full pl-9 pr-4 py-2.5 bg-ink-900/60 border border-edge text-sm text-bone-50 placeholder:text-bone-500/50 focus:outline-none focus:border-electric/40 focus:ring-1 focus:ring-electric/20 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={() => runSearch()}
          className="btn-solid text-xs px-4 py-2.5 disabled:opacity-30"
          disabled={loading || !query.trim()}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <SearchIcon size={14} />}
          Go
        </button>
      </div>

      {error && (
        <div className="border border-red-500/30 bg-red-500/10 p-3 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-10 gap-2 text-bone-500 text-sm">
          <Loader2 size={16} className="animate-spin text-electric" />
          Searching...
        </div>
      )}

      {noResults && (
        <p className="text-bone-500 text-sm text-center py-8">No results found</p>
      )}

      {hasResults && (
        <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
          {results.map((track, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 hover:bg-ink-800/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-ink-800 border border-edge flex-shrink-0 overflow-hidden">
                {track.artworkUrl ? (
                  <img src={track.artworkUrl} alt={track.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-electric/20 to-hot/10 flex items-center justify-center text-bone-500 text-xs">&#9835;</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-bone-50 truncate">{track.title}</h3>
                <p className="text-bone-500 text-xs truncate">{track.artist}</p>
              </div>
              <button
                onClick={() => addToQueue(track)}
                className="flex-shrink-0 h-7 w-7 grid place-items-center border border-edge text-bone-500 hover:text-electric hover:border-electric/40 transition-colors opacity-0 group-hover:opacity-100"
                title="Add to queue"
              >
                <Plus size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
