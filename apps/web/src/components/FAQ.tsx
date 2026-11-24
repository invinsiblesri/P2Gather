import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Do I need an account?', a: 'No. P2Gather is designed for zero-friction listening. Rooms are temporary and your data is never stored.' },
  { q: 'Why can\'t I hear anything?', a: 'Browsers often block autoplay. If you join a room that is already playing, look for the "Tap to Sync" overlay.' },
  { q: 'What happens if my screen locks?', a: 'On some mobile browsers, playback may pause. We request a Screen Wake Lock to help keep the session active.' },
  { q: 'Which music works?', a: 'Any public video from YouTube and millions of tracks from Audius. No unofficial streams or extractors are used.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="py-16 px-6 max-w-3xl mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-10 text-center uppercase tracking-tight">FAQ</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-bg-surface border border-white/10 rounded-card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-elevated/50 transition-colors"
            >
              <h4 className="text-text-primary font-semibold text-sm">{faq.q}</h4>
              <ChevronDown size={16} className={`text-text-muted transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
