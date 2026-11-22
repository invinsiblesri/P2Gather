import { useSearch } from './useSearch';
import { YouTubeProvider } from '../../data/providers/youtube';
import { AudiusProvider } from '../../data/providers/audius';
import { useState } from 'react';

export function Search() {
  const [provider, setProvider] = useState<'youtube' | 'audius'>('youtube');
  const searchParams = useSearch(
    provider === 'youtube' ? new YouTubeProvider() : new AudiusProvider()
  );

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvider(e.target.value as 'youtube' | 'audius');
  };

  return (
    <div className="py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-text-primary">Search</h2>
        <select className="border border-white/10 px-3 py-2 rounded bg-bg-surface" onChange={handleProviderChange}>
          <option value="youtube">YouTube</option>
          <option value="audius">Audius</option>
        </select>
      </div>

      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search for tracks..."
          className="flex-1 px-4 py-2 border border-white/10 rounded-lg bg-bg-surface focus:outline-none focus:ring-2 focus:ring-brand-indigo"
          value={searchParams.query}
          onChange={(e) => searchParams.setQuery(e.target.value)}
        />
        <button
          onClick={() => searchParams.setQuery('')}
          className="px-4 py-2 bg-brand-mint text-white rounded hover:bg-mint-600"
          disabled={searchParams.loading}
        >
          {searchParams.loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchParams.loading && <p className="text-text-muted">Loading...</p>}
      {!searchParams.loading && searchParams.query && (
        <div className="space-y-4">
          {searchParams.results.length === 0 ? (
            <p className="text-text-muted">No results found</p>
          ) : (
            searchParams.results.map((track, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-bg-surface rounded"
              >
                <div className="w-16 h-16 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                  {track.artworkUrl && (
                    <img
                      src={track.artworkUrl}
                      alt={track.title}
                      className="w-full h-full object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex-1 pl-4">
                  <h3 className="text-sm font-medium text-text-primary">{track.title}</h3>
                  <p className="text-text-secondary text-xs">{track.artist}</p>
                  <button
                    onClick={() => searchParams.addToQueue(track)}
                    className="mt-1 text-brand-mint text-sm hover:underline"
                  >
                    Add to Queue
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}