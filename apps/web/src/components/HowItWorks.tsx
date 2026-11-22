export function HowItWorks() {
  const steps = [
    { num: '01', title: 'Create', desc: 'Start a private room in one click.' },
    { num: '02', title: 'Share', desc: 'Send the 6-character code to friends.' },
    { num: '03', title: 'Press play', desc: 'Sync starts the moment you hit play.' },
  ];

  return (
    <div className="py-24 px-6 grid md:grid-cols-3 gap-24 border-t border-white/10">
      {steps.map(step => (
        <div key={step.num} className="space-y-8">
          <span className="text-xs font-mono text-brand-indigo">{step.num} /</span>
          <h3 className="text-lg font-bold text-text-primary uppercase tracking-tight">{step.title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}
