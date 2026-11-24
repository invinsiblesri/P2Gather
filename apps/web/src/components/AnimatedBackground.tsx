import { Music2 } from 'lucide-react';

const FLOAT_NOTES = [
  { left: '6%', top: '18%', size: 20, delay: '0s', duration: '14s' },
  { left: '88%', top: '24%', size: 16, delay: '-4s', duration: '17s' },
  { left: '12%', top: '68%', size: 14, delay: '-8s', duration: '15s' },
  { left: '76%', top: '58%', size: 22, delay: '-6s', duration: '19s' },
  { left: '50%', top: '8%', size: 12, delay: '-10s', duration: '16s' },
  { left: '32%', top: '82%', size: 18, delay: '-2s', duration: '13s' },
  { left: '64%', top: '42%', size: 10, delay: '-12s', duration: '18s' },
];

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg-canvas" aria-hidden="true">
      {/* Primary aurora blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-lime/15 blur-[160px] anim-aurora" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-indigo/12 blur-[180px] anim-aurora-alt" />
      <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-brand-violet/10 blur-[140px] anim-aurora" style={{ animationDelay: '-7s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-brand-mint/8 blur-[120px] anim-aurora-alt" style={{ animationDelay: '-12s' }} />

      {/* Dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)',
      }} />

      {/* Floating music notes */}
      {FLOAT_NOTES.map((n, i) => (
        <Music2
          key={i}
          className="anim-float-note text-white/[0.06]"
          style={{ left: n.left, top: n.top, width: n.size, height: n.size, animationDelay: n.delay, animationDuration: n.duration }}
        />
      ))}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-canvas to-transparent" />
    </div>
  );
}
