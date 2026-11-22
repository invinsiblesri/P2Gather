import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-canvas text-text-primary">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-bg-canvas border-b border-white/10 flex items-center px-6 z-50">
        <Link to="/" className="text-text-secondary hover:text-text-primary text-sm">
          ← Back to P2Gather
        </Link>
      </nav>
      <main className="pt-16 max-w-3xl mx-auto px-6 py-16 space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Privacy & Attributions</h1>
          <p className="text-text-secondary text-sm">Last updated: November 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Privacy</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            P2Gather does not require an account and does not store personal data. Rooms are held
            in memory on the server and expire automatically after a period of inactivity. We do not
            record chat messages, and chat is never written to logs.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            The guest name you enter is stored only in your browser&apos;s localStorage and is sent to the
            room you join so other listeners can see who is present. It is discarded when the room expires.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Audio is never proxied, downloaded, or stored by P2Gather. Playback happens in your own
            browser through the official YouTube IFrame Player and the Audius API.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Attributions</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Search is powered by the YouTube Data API v3. Playback uses the YouTube IFrame Player.
            YouTube is a trademark of Google LLC. P2Gather is not affiliated with YouTube or Google.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Music from Audius is provided by the Audius API and remains the property of the respective
            artists. Please support the artists you listen to.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Icons are provided by Lucide. Fonts are Barlow Condensed, Manrope, and DM Mono, served by
            Google Fonts.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Terms of use</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            P2Gather is an independent, non-commercial learning project. Use it responsibly and respect
            the terms of service of the music providers it links to.
          </p>
        </section>
      </main>
    </div>
  );
}