import { MusicProvider, Track } from '@p2gather/shared';

export class AudiusProvider implements MusicProvider {
  async search(q: string): Promise<Track[]> {
    const res = await fetch(`https://api.audius.co/search?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error('Search failed');
    const data = await res.json();
    return data.map((t: any) => ({
      id: t.id,
      source: 'audius' as const,
      title: t.title,
      artist: t.artist,
      artworkUrl: t.artwork_url,
      durationSeconds: t.duration,
      attributionUrl: `https://audius.co/track/${t.id}`,
    }));
  }

  async getTrack(_id: string): Promise<Track | null> {
    return null;
  }

  canPlay(t: Track): boolean {
    return t.source === 'audius';
  }
}