import { Sparkles } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    { num: '01', title: 'Create', desc: 'Spin up a private room instantly. No sign-up, no downloads.', gradient: 'from-brand-lime/20 to-brand-mint/10' },
    { num: '02', title: 'Share', desc: 'Send the 6-character code to friends via any messaging app.', gradient: 'from-brand-indigo/20 to-brand-violet/10' },
    { num: '03', title: 'Sync', desc: 'Everyone hears the same beat at the same millisecond. Magic.', gradient: 'from-brand-coral/20 to-brand-lime/10' },
  ];

  return (
    <div id="how" className="py-16 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass rounded-pill px-4 py-1.5 mb-4">
          <Sparkles size={14} className="text-brand-lime" />
          <span className="text-xs font-medium text-text-secondary">Simple as 1-2-3</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">How It Works</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map(step => (
          <div key={step.num} className="relative glass rounded-glass p-6 group glass-hover overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative">
              <span className="inline-block text-3xl font-display font-extrabold text-white/[0.06] mb-3">{step.num}</span>
              <h3 className="text-lg font-display font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
