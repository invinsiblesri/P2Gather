import { MusicProvider, Track } from '@p2gather/shared';

const AUDIUS_API = 'https://discoveryprovider.audius.co/v1';

export class AudiusProvider implements MusicProvider {
  async search(q: string): Promise<Track[]> {
    const res = await fetch(`${AUDIUS_API}/tracks/search?query=${encodeURIComponent(q)}&limit=20`);
    if (!res.ok) throw new Error('Audius search failed');
    const json = await res.json();
    const data = json.data || [];
    return data.map((t: any) => ({
      id: t.id,
      source: 'audius' as const,
      title: t.title || 'Untitled',
      artist: t.user?.name || 'Unknown',
      artworkUrl: t.artwork?.['480x480'] || t.artwork?.['150x150'] || undefined,
      durationSeconds: t.duration || undefined,
      attributionUrl: t.permalink ? `https://audius.co${t.permalink}` : undefined,
    }));
  }

  async getTrack(id: string): Promise<Track | null> {
    try {
      const res = await fetch(`${AUDIUS_API}/tracks/${id}`);
      if (!res.ok) return null;
      const json = await res.json();
      const t = json.data;
      if (!t) return null;
      return {
        id: t.id,
        source: 'audius',
        title: t.title || 'Untitled',
        artist: t.user?.name || 'Unknown',
        artworkUrl: t.artwork?.['480x480'] || t.artwork?.['150x150'] || undefined,
        durationSeconds: t.duration || undefined,
        attributionUrl: t.permalink ? `https://audius.co${t.permalink}` : undefined,
      };
    } catch {
      return null;
    }
  }

  canPlay(t: Track): boolean {
    return t.source === 'audius';
  }
}
