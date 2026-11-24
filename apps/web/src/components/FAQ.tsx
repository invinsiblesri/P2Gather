import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ArrowUpRight } from 'lucide-react';

const FAQS = [
  {
    num: '01',
    q: 'Do I need an account?',
    a: 'No. P2Gather is zero-friction. Enter a guest name, create or join a room, and start listening. No sign-ups, no emails, no passwords.',
  },
  {
    num: '02',
    q: "Why can't I hear anything?",
    a: 'Browsers block autoplay by default. Look for the "Tap to Sync" overlay if you join a room mid-playback. On mobile, make sure your device is not on silent.',
  },
  {
    num: '03',
    q: 'What if my screen locks?',
    a: 'On some mobile browsers playback may pause. We request a Wake Lock to keep the session alive, but this varies by device and browser.',
  },
  {
    num: '04',
    q: 'Which music services work?',
    a: 'Any public YouTube video and millions of Audius tracks. No unofficial streams, no extractors, no piracy.',
  },
  {
    num: '05',
    q: 'Is P2Gather open source?',
    a: 'Yes. The entire codebase is on GitHub. Fork it, extend it, self-host it. No ads, no paywall, no catch.',
  },
  {
    num: '06',
    q: 'How many people can join a room?',
    a: 'Up to 25 listeners per room. The host controls playback, and drift correction keeps everyone within 1.5 seconds.',
  },
];

export function FAQ() {
  const heading = useReveal();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-14 border-t border-edge px-5 pt-8 pb-20 sm:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <div ref={heading} className="rv lg:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-500">05 — FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-bone-50 sm:text-5xl">
            Reasonable<br />questions
          </h2>
          <p className="mt-4 text-sm text-bone-300">
            If the answer you need is not here, open an issue on GitHub.
          </p>
          <a
            href="https://github.com/invinsiblesri/P2Gather/issues"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400 hover:text-bone-50 transition-colors"
          >
            GitHub Issues <ArrowUpRight size={12} />
          </a>
        </div>

        <div className="lg:col-span-8 space-y-0">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.num} faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ faq, isOpen, onToggle }: {
  faq: typeof FAQS[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useReveal();

  return (
    <div ref={ref} className="rv border-b border-edge first:border-t">
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 py-6 text-left group"
      >
        <span className="font-mono text-[11px] text-bone-500 tabnum mt-1 shrink-0">{faq.num}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-bone-50 group-hover:text-bone-100 transition-colors">
            {faq.q}
          </h3>
          <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm leading-relaxed text-bone-300">{faq.a}</p>
          </div>
        </div>
        <span className={`font-mono text-bone-500 mt-1 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
    </div>
  );
}
