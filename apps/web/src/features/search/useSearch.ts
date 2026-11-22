import { useState, useEffect, useCallback } from 'react';
import { MusicProvider, Track } from '@p2gather/shared';
import { debounce } from 'lodash';

export function useSearch(provider: MusicProvider) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);

  const addToQueue = (track: Track) => {
    setQueue(prev => {
      const exists = prev.some(item => item.id === track.id);
      if (!exists) {
        return [...prev, track];
      }
      return prev;
    });
  };

  const removeFromQueue = (trackId: string) => {
    setQueue(prev => prev.filter(t => t.id !== trackId));
  };

  const handleSearch = useCallback(async (q: string) => {
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await provider.search(q);
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [provider]);

  const debouncedSearch = useCallback(
    debounce((q: string) => handleSearch(q), 300),
    [handleSearch]
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setResults([]);
    }
  }, [query, debouncedSearch]);

  return {
    query,
    setQuery,
    results,
    loading,
    addToQueue,
    removeFromQueue,
    queue,
  };
}