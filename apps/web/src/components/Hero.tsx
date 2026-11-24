import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Radio, Zap, Users } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative text-center px-6 pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Decorative accent rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-brand-lime/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[800px] md:h-[800px] rounded-full border border-brand-indigo/5 pointer-events-none" />

      {/* Floating badges */}
      <div className="hidden md:flex absolute top-32 left-[12%] items-center gap-2 glass rounded-pill px-4 py-2 animate-float">
        <Radio size={14} className="text-brand-lime" />
        <span className="text-xs text-text-secondary">Live Sync</span>
      </div>
      <div className="hidden md:flex absolute top-48 right-[10%] items-center gap-2 glass rounded-pill px-4 py-2 animate-float-delayed">
        <Zap size={14} className="text-brand-coral" />
        <span className="text-xs text-text-secondary">Zero Latency</span>
      </div>
      <div className="hidden md:flex absolute bottom-24 left-[18%] items-center gap-2 glass rounded-pill px-4 py-2 animate-float-delayed">
        <Users size={14} className="text-brand-mint" />
        <span className="text-xs text-text-secondary">25 Listeners</span>
      </div>

      <div className="relative animate-slide-up">
        <div className="inline-flex items-center gap-2 glass rounded-pill px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
          <span className="text-xs font-medium text-text-secondary">Synchronized Music Rooms</span>
        </div>

        <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.95]">
          <span className="text-text-primary">Listen</span>
          <br />
          <span className="gradient-text">Together.</span>
        </h1>

        <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
          Create a room, share the code, and everyone hears the same song at the same moment.
          <span className="text-text-muted"> No account. No install.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => { window.location.href = '/join'; }} size="lg">
            Start Listening
          </Button>
          <Link
            to="/join"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
          >
            Join with a code
            <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
