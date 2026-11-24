import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <div className="relative text-center px-6 py-20 md:py-32">
      {/* Decorative accent rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand-indigo/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-brand-mint/5 pointer-events-none" />

      <h1 className="relative font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-text-primary via-brand-indigo to-brand-mint bg-clip-text text-transparent">
        Listen Together.
      </h1>
      <p className="relative text-text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
        Create a room, share the code, and everyone hears the same song at the same moment. No account. No install.
      </p>
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button onClick={() => { window.location.href = '/join'; }} size="lg">
          Create a room
        </Button>
        <Link to="/join" className="text-text-secondary hover:text-text-primary transition-colors">
          Join with a code ↓
        </Link>
      </div>
    </div>
  );
}
