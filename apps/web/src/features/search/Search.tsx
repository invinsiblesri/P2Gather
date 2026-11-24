import { useState } from 'react';
import { useSearch } from './useSearch';
import { YouTubeProvider } from '../../data/providers/youtube';
import { AudiusProvider } from '../../data/providers/audius';
import { SearchIcon, Plus, Loader2 } from 'lucide-react';

export function Search() {
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
    provider === 'youtube' ? new YouTubeProvider() : new AudiusProvider()
  );

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvider(e.target.value as 'youtube' | 'audius');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch();
    }
  };

  const hasResults = !loading && !error && results.length > 0;
  const noResults = !loading && !error && query.trim().length > 0 && results.length === 0;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-text-primary">Search</h2>
        <select
          className="border border-white/10 px-3 py-1.5 rounded-lg bg-bg-surface text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          value={provider}
          onChange={handleProviderChange}
        >
          <option value="youtube">YouTube</option>
          <option value="audius">Audius</option>
        </select>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search for tracks..."
            className="w-full pl-9 pr-4 py-2.5 border border-white/10 rounded-lg bg-bg-canvas text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={() => runSearch()}
          className="px-5 py-2.5 bg-brand-indigo text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] disabled:opacity-50 transition-colors flex items-center gap-2"
          disabled={loading || !query.trim()}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <SearchIcon size={14} />}
          {loading ? 'Searching' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="bg-status-error/10 border border-status-error/20 rounded-lg p-3 mb-4">
          <p className="text-status-error text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8 gap-2 text-text-muted text-sm">
          <Loader2 size={16} className="animate-spin" />
          Searching {provider === 'youtube' ? 'YouTube' : 'Audius'}...
        </div>
      )}

      {noResults && (
        <p className="text-text-muted text-sm text-center py-6">No results found. Try a different search.</p>
      )}

      {hasResults && (
        <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
          {results.map((track, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-bg-elevated/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex-shrink-0 overflow-hidden">
                {track.artworkUrl ? (
                  <img
                    src={track.artworkUrl}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-indigo/30 to-brand-mint/30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text-primary truncate">{track.title}</h3>
                <p className="text-text-muted text-xs truncate">{track.artist}</p>
              </div>
              <button
                onClick={() => addToQueue(track)}
                className="flex-shrink-0 p-2 rounded-lg border border-white/10 text-text-muted hover:text-brand-mint hover:border-brand-mint/30 transition-colors opacity-0 group-hover:opacity-100"
                title="Add to queue"
              >
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
