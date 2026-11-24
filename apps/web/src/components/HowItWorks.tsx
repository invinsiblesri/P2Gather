export function HowItWorks() {
  const steps = [
    { num: '01', title: 'Create', desc: 'Start a private room in one click. No sign-up needed.' },
    { num: '02', title: 'Share', desc: 'Send the 6-character code to friends via any app.' },
    { num: '03', title: 'Press play', desc: 'Everyone syncs the moment you hit play.' },
  ];

  return (
    <div id="how" className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-12 text-center uppercase tracking-tight">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map(step => (
          <div key={step.num} className="relative bg-bg-surface border border-white/10 rounded-card p-6 hover:border-brand-indigo/30 transition-colors group">
            <span className="text-xs font-mono text-brand-indigo mb-3 block">{step.num} /</span>
            <h3 className="text-lg font-bold text-text-primary uppercase tracking-tight mb-2">{step.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-indigo to-brand-mint opacity-0 group-hover:opacity-100 transition-opacity rounded-b-card" />
          </div>
        ))}
      </div>
    </div>
  );
}
