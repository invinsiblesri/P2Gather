import { cn } from '../utils/cn';

export function SpecGrid() {
  const specs = [
    { label: 'SOURCE', value: 'YOUTUBE · AUDIUS' },
    { label: 'DRIFT LIMIT', value: '1.5 S' },
    { label: 'ACCOUNT', value: 'NONE' },
    { label: 'ROOM SIZE', value: 'UP TO 25' },
  ];

  return (
    <div className="grid grid-cols-2 border-y border-white/10 divide-x divide-white/10 mt-24">
      {specs.map((spec) => (
        <div key={spec.label} className="p-16 flex flex-col space-y-4">
          <span className="text-xs font-mono tracking-widest text-text-muted">{spec.label}</span>
          <span className="text-sm font-mono text-text-primary">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}
