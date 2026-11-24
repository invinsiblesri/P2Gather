import { Link } from 'react-router-dom';
import { Github, ArrowUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="space-y-4">
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Navigation</span>
          <nav className="flex flex-col gap-2 text-sm">
            <a href="/#how" className="text-text-secondary hover:text-text-primary transition-colors">How it works</a>
            <Link to="/join" className="text-text-secondary hover:text-text-primary transition-colors">Join Room</Link>
          </nav>
        </div>
        <div className="space-y-4 max-w-sm">
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Legal &amp; Code</span>
          <p className="text-[10px] text-text-muted leading-relaxed uppercase">
            P2Gather is an independent project and is not affiliated with YouTube, Google or Audius. YouTube is a trademark of Google LLC.
          </p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">Privacy &amp; Attributions</Link>
            <a href="https://github.com/invinsiblesri/P2Gather" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
              <Github size={14} /> Source code
            </a>
          </nav>
          <div className="flex justify-between items-center text-[10px] font-mono text-text-muted pt-4 border-t border-white/5">
            <span>© 2026 P2GATHER</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1 hover:text-text-primary transition-colors">
              BACK TO TOP <ArrowUp size={10} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
