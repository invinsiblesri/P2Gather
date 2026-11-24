export function SpecGrid() {
  const specs = [
    { label: 'SOURCE', value: 'YOUTUBE · AUDIUS', icon: '🎵' },
    { label: 'DRIFT LIMIT', value: '1.5 S', icon: '⏱️' },
    { label: 'ACCOUNT', value: 'NONE', icon: '🔓' },
    { label: 'ROOM SIZE', value: 'UP TO 25', icon: '👥' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-y border-white/10 divide-x divide-white/10 mt-8">
      {specs.map((spec) => (
        <div key={spec.label} className="p-6 md:p-8 flex flex-col gap-2 text-center">
          <span className="text-2xl mb-1">{spec.icon}</span>
          <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">{spec.label}</span>
          <span className="text-sm font-mono text-text-primary font-semibold">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}
