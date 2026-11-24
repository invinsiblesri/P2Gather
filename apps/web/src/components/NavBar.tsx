import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Headphones } from 'lucide-react';

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass-strong z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <span className="text-text-primary font-display font-bold text-lg tracking-tight">P2Gather</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/join"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-pill glass glass-hover text-sm text-text-secondary hover:text-text-primary"
          >
            <Headphones size={14} />
            Join Room
          </Link>
          <Link
            to="/join"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-brand-lime text-bg-canvas text-sm font-semibold hover:brightness-110 active:scale-95 transition-all"
          >
            Create Room
          </Link>
        </div>
      </div>
    </nav>
  );
}
