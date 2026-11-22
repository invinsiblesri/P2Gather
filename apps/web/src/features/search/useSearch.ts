import { useState, useCallback, useEffect, useRef } from 'react';
import { MusicProvider, Track } from '@p2gather/shared';
import { debounce } from 'lodash';
import { useQueue } from '../queue/Queue';

export function useSearch(provider: MusicProvider) {
  const addToQueue = useQueue().add;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (q: string) => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await provider.search(term);
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
      setError('Could not reach the music service. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [provider]);

  const debouncedRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    const d = debounce((q: string) => handleSearch(q), 350);
    debouncedRef.current = d;
    return () => d.cancel();
  }, [handleSearch]);

  useEffect(() => {
    if (query.trim()) {
      debouncedRef.current?.(query);
    } else {
      setResults([]);
      setError(null);
      setLoading(false);
    }
  }, [query]);

  const runSearch = useCallback(() => {
    debouncedRef.current?.cancel();
    handleSearch(query);
  }, [handleSearch, query]);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return { query, setQuery, results, loading, error, runSearch, clear, addToQueue };
}
