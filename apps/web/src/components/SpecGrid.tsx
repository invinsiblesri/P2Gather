import { Music, Shield, Clock, Users } from 'lucide-react';

export function SpecGrid() {
  const specs = [
    { label: 'SOURCE', value: 'YouTube + Audius', icon: Music, color: 'text-brand-lime' },
    { label: 'DRIFT', value: '< 1.5 seconds', icon: Clock, color: 'text-brand-coral' },
    { label: 'ACCOUNT', value: 'None required', icon: Shield, color: 'text-brand-mint' },
    { label: 'ROOM SIZE', value: 'Up to 25', icon: Users, color: 'text-brand-violet' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {specs.map((spec) => {
          const Icon = spec.icon;
          return (
            <div key={spec.label} className="glass rounded-card p-5 text-center group glass-hover">
              <div className={`inline-flex p-2.5 rounded-xl bg-white/[0.03] mb-3 ${spec.color}`}>
                <Icon size={20} />
              </div>
              <div className="text-[10px] font-mono tracking-widest text-text-muted uppercase mb-1">{spec.label}</div>
              <div className="text-sm font-semibold text-text-primary">{spec.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
