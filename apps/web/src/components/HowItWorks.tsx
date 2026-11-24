import { useReveal } from '../hooks/useReveal';
import { useSpotlight } from '../hooks/useSpotlight';

const STEPS = [
  {
    num: '01',
    title: 'Create a Room',
    desc: 'Hit "Create Room" and get a 6-character code instantly. No sign-up, no email, no waiting.',
    accent: 'text-electric',
  },
  {
    num: '02',
    title: 'Share the Code',
    desc: 'Send the code to friends via WhatsApp, Discord, or any messaging app. Or share the direct link.',
    accent: 'text-hot',
  },
  {
    num: '03',
    title: 'Press Play Together',
    desc: 'Search for a track, add it to the queue, and everyone hears the same song at the same moment.',
    accent: 'text-bone-50',
  },
];

export function HowItWorks() {
  const heading = useReveal();

  return (
    <section id="how" className="relative scroll-mt-14 border-t border-edge px-5 pt-8 pb-20 sm:px-10">
      <div ref={heading} className="rv mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-500">03 — How It Works</p>
        <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-bone-50 sm:text-5xl">
          Three steps.<br />Zero friction.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <StepCard key={step.num} step={step} delay={i * 100} />
        ))}
      </div>

      {/* Visual connector line */}
      <div className="hidden md:block relative mt-[-180px] mb-[120px] mx-auto max-w-4xl">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-edge to-transparent" />
      </div>
    </section>
  );
}

function StepCard({ step, delay }: { step: typeof STEPS[0]; delay: number }) {
  const ref = useReveal();
  const { onMouseMove } = useSpotlight();

  return (
    <div
      ref={ref}
      className="rv spot border border-edge p-8 rounded-spot backdrop-blur-sm bg-ink-950/60"
      style={{ transitionDelay: `${delay}ms` } as React.CSSProperties}
      onMouseMove={onMouseMove}
    >
      <div className="relative z-10">
        <span className={`font-display text-5xl font-bold ${step.accent} opacity-20`}>
          {step.num}
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-bone-50">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-bone-300">
          {step.desc}
        </p>
      </div>
    </div>
  );
}
