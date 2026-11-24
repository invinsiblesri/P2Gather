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
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-display font-bold text-text-primary">Search</h2>
        <div className="flex gap-1 p-0.5 glass rounded-pill">
          {(['youtube', 'audius'] as const).map(p => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={`px-3 py-1 rounded-pill text-xs font-medium transition-all duration-200 ${
                provider === p ? 'bg-brand-lime text-bg-canvas' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {p === 'youtube' ? 'YouTube' : 'Audius'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <SearchIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search tracks, artists..."
            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-brand-lime/30 focus:ring-2 focus:ring-brand-lime/10 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={() => runSearch()}
          className="px-4 py-2.5 bg-brand-lime text-bg-canvas rounded-button text-sm font-semibold hover:brightness-110 disabled:opacity-40 transition-all flex items-center gap-1.5"
          disabled={loading || !query.trim()}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <SearchIcon size={14} />}
          Go
        </button>
      </div>

      {error && (
        <div className="bg-status-error/10 border border-status-error/20 rounded-card p-3 mb-4">
          <p className="text-status-error text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-10 gap-2 text-text-muted text-sm">
          <Loader2 size={16} className="animate-spin text-brand-lime" />
          Searching...
        </div>
      )}

      {noResults && (
        <p className="text-text-muted text-sm text-center py-8">No results found</p>
      )}

      {hasResults && (
        <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
          {results.map((track, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-card glass-hover group cursor-default"
            >
              <div className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/[0.04] flex-shrink-0 overflow-hidden">
                {track.artworkUrl ? (
                  <img src={track.artworkUrl} alt={track.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-lime/20 to-brand-indigo/20" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary truncate">{track.title}</h3>
                <p className="text-text-muted text-xs truncate">{track.artist}</p>
              </div>
              <button
                onClick={() => addToQueue(track)}
                className="flex-shrink-0 w-8 h-8 rounded-lg glass flex items-center justify-center text-text-muted hover:text-brand-lime hover:border-brand-lime/20 transition-all opacity-0 group-hover:opacity-100"
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
