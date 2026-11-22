import { MusicProvider, Track } from '@p2gather/shared';

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export class YouTubeProvider implements MusicProvider {
  async search(q: string): Promise<Track[]> {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error('Search failed');
    const items = await res.json();
    return items.map((item: any) => ({
      id: item.id.videoId,
      source: 'youtube' as const,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      artworkUrl: item.snippet.thumbnails.medium?.url,
      durationSeconds: undefined,
      attributionUrl: `https://youtube.com/watch?v=${item.id.videoId}`,
    }));
  }

  async getTrack(_id: string): Promise<Track | null> {
    return null;
  }

  canPlay(t: Track): boolean {
    return t.source === 'youtube';
  }
}