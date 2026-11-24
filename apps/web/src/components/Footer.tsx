import { Link } from 'react-router-dom';
import { Github, ArrowUp, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.04] w-full">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div>
            <span className="text-text-primary font-display font-bold text-lg">P2Gather</span>
            <p className="text-text-muted text-xs mt-2 max-w-xs leading-relaxed">
              Synchronized listening rooms. No accounts, no installs, no tracking.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-3">Navigate</span>
              <nav className="flex flex-col gap-2 text-sm">
                <a href="/#how" className="text-text-secondary hover:text-text-primary transition-colors">How it works</a>
                <Link to="/join" className="text-text-secondary hover:text-text-primary transition-colors">Join Room</Link>
                <Link to="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">Privacy</Link>
              </nav>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase block mb-3">Code</span>
              <nav className="flex flex-col gap-2 text-sm">
                <a href="https://github.com/invinsiblesri/P2Gather" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
                  <Github size={13} /> Source
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/[0.04]">
          <p className="text-[10px] text-text-muted">
            Not affiliated with YouTube, Google, or Audius. YouTube is a trademark of Google LLC.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-text-muted inline-flex items-center gap-1">
              Made with <Heart size={10} className="text-brand-coral" /> &copy; 2026
            </span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-1.5 glass rounded-lg hover:bg-white/[0.06] transition-colors">
              <ArrowUp size={12} className="text-text-muted" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
