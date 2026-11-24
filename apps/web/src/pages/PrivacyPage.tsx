import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="relative min-h-screen text-text-primary">
      <nav className="fixed top-0 left-0 right-0 h-14 glass-strong z-50 flex items-center px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-sm transition-colors">
          <ArrowLeft size={16} /> Back to P2Gather
        </Link>
      </nav>
      <main className="pt-14 max-w-3xl mx-auto px-6 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">Privacy &amp; Attributions</h1>
          <p className="text-text-muted text-sm">Last updated: November 2026</p>
        </div>
        <section className="space-y-3">
          <h2 className="text-xl font-display font-semibold">Privacy</h2>
          <p className="text-text-secondary text-sm leading-relaxed">P2Gather does not require an account and does not store personal data. Rooms are held in memory and expire after inactivity. Chat is never logged.</p>
          <p className="text-text-secondary text-sm leading-relaxed">Your guest name lives only in localStorage and is sent to the room for presence display. It is discarded when the room expires.</p>
          <p className="text-text-secondary text-sm leading-relaxed">Audio is never proxied, downloaded, or stored. Playback uses the YouTube IFrame Player and the Audius API in your own browser.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-display font-semibold">Attributions</h2>
          <p className="text-text-secondary text-sm leading-relaxed">Search powered by YouTube Data API v3. YouTube is a trademark of Google LLC. P2Gather is not affiliated with YouTube or Google.</p>
          <p className="text-text-secondary text-sm leading-relaxed">Audius music is provided by the Audius API and remains the property of the respective artists.</p>
          <p className="text-text-secondary text-sm leading-relaxed">Icons by Lucide. Fonts: Inter, Plus Jakarta Sans, JetBrains Mono via Google Fonts.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-display font-semibold">Terms</h2>
          <p className="text-text-secondary text-sm leading-relaxed">P2Gather is a non-commercial learning project. Use it responsibly and respect the terms of the music providers it links to.</p>
        </section>
      </main>
    </div>
  );
}
