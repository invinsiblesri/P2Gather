import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="relative min-h-screen text-bone-50">
      <nav className="fixed top-0 left-0 right-0 h-14 bg-ink-950/90 backdrop-blur-md border-b border-edge flex items-center px-6 z-50">
        <Link to="/" className="inline-flex items-center gap-1.5 text-bone-400 hover:text-bone-50 text-sm transition-colors">
          <ArrowLeft size={16} /> Back to P2Gather
        </Link>
      </nav>
      <main className="pt-14 max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-bone-50 mb-1">Privacy &amp; Attributions</h1>
          <p className="text-bone-500 text-sm font-mono">Last updated: November 2026</p>
        </div>

        <div className="space-y-10">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-bone-50">Privacy</h2>
            <p className="text-bone-300 text-sm leading-relaxed">P2Gather does not require an account and does not store personal data. Rooms are held in memory and expire after inactivity. Chat messages are never logged or stored.</p>
            <p className="text-bone-300 text-sm leading-relaxed">Your guest name lives only in your browser&apos;s localStorage and is sent to the room for presence display. It is discarded when the room expires.</p>
            <p className="text-bone-300 text-sm leading-relaxed">Audio is never proxied, downloaded, or stored. Playback uses the YouTube IFrame Player and the Audius API in your own browser.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-bone-50">Attributions</h2>
            <p className="text-bone-300 text-sm leading-relaxed">Search powered by YouTube Data API v3. YouTube is a trademark of Google LLC. P2Gather is not affiliated with YouTube or Google.</p>
            <p className="text-bone-300 text-sm leading-relaxed">Audius music is provided by the Audius API and remains the property of the respective artists.</p>
            <p className="text-bone-300 text-sm leading-relaxed">Icons by Lucide. Fonts: Inter, Space Grotesk, IBM Plex Mono via Google Fonts.</p>
            <p className="text-bone-300 text-sm leading-relaxed">
              UI design inspired by{' '}
              <a href="https://github.com/Shreyanshh071/Auralis" target="_blank" rel="noreferrer" className="text-electric hover:underline underline-offset-4">
                Auralis
              </a>{' '}
              by @Shreyanshh071.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-bone-50">Terms</h2>
            <p className="text-bone-300 text-sm leading-relaxed">P2Gather is a non-commercial learning project. Use it responsibly and respect the terms of the music providers it links to.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
