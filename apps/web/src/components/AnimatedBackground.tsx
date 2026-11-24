import { Music2 } from 'lucide-react';

const FLOAT_NOTES = [
  { left: '5%', top: '20%', size: 22, delay: '0s', duration: '13s' },
  { left: '86%', top: '26%', size: 18, delay: '-3s', duration: '16s' },
  { left: '14%', top: '66%', size: 16, delay: '-7s', duration: '14s' },
  { left: '78%', top: '62%', size: 24, delay: '-5s', duration: '18s' },
  { left: '48%', top: '10%', size: 14, delay: '-9s', duration: '15s' },
];

export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-bg-canvas"
      aria-hidden="true"
    >
      {/* Aurora glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-indigo/25 blur-[120px] anim-bg-aurora" />
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-brand-mint/20 blur-[140px] anim-bg-aurora-alt" />
      <div
        className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-[#2563EB]/20 blur-[110px] anim-bg-aurora"
        style={{ animationDelay: '-8s' }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        }}
      />

      {/* Floating music notes */}
      {FLOAT_NOTES.map((n, i) => (
        <Music2
          key={i}
          className="absolute anim-bg-float text-white/10"
          style={{
            left: n.left,
            top: n.top,
            width: n.size,
            height: n.size,
            animationDelay: n.delay,
            animationDuration: n.duration,
          }}
        />
      ))}
    </div>
  );
}
