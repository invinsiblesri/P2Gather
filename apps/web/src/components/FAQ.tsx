import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Do I need an account?', a: 'No. P2Gather is zero-friction. Rooms are temporary and your data is never stored.' },
  { q: 'Why can\'t I hear anything?', a: 'Browsers often block autoplay. Look for the "Tap to Sync" overlay if you join a room mid-playback.' },
  { q: 'What if my screen locks?', a: 'On some mobile browsers playback may pause. We request a Wake Lock to keep the session alive.' },
  { q: 'Which music services work?', a: 'Any public YouTube video and millions of Audius tracks. No unofficial streams or extractors.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="py-16 px-6 max-w-2xl mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8 text-center">Questions?</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="glass rounded-card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left glass-hover"
            >
              <h4 className="text-text-primary font-medium text-sm">{faq.q}</h4>
              <ChevronDown size={16} className={`text-text-muted flex-shrink-0 ml-4 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-4 pb-4">
                <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
