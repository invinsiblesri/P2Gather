import { useState } from 'react';
import { Track } from '@p2gather/shared';

export function useQueue() {
  const [queue, setQueue] = useState<Track[]>([]);

  const add = (track: Track) => {
    setQueue(prev => {
      // Prevent duplicates with same track ID
      const exists = prev.some(item => item.id === track.id);
      if (!exists) {
        return [...prev, track];
      }
      return prev;
    });
  };

  const remove = (trackId: string) => {
    setQueue(prev => prev.filter(t => t.id !== trackId));
  };

  const clear = () => setQueue([]);

  return { queue, add, remove, clear };
}