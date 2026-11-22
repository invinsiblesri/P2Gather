import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="py-32 px-6 border-t border-white/10 w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-32">
        <div className="space-y-16">
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Navigation</span>
          <nav className="flex flex-col space-y-8 text-sm">
             <a href="/#how" className="text-text-secondary hover:text-text-primary">How it works</a>
             <Link to="/join" className="text-text-secondary hover:text-text-primary">Join Room</Link>
          </nav>
        </div>
        <div className="space-y-16 max-w-sm">
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Legal & Code</span>
          <p className="text-[10px] text-text-muted leading-relaxed uppercase">
            P2Gather is an independent project and is not affiliated with YouTube, Google or Audius. YouTube is a trademark of Google LLC.
          </p>
          <nav className="flex flex-col space-y-8 text-sm">
            <Link to="/privacy" className="text-text-secondary hover:text-text-primary">Privacy & Attributions</Link>
            <a href="https://github.com/invinsiblesri/P2Gather" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary">Source code</a>
          </nav>
          <div className="flex justify-between items-center text-[10px] font-mono text-text-muted">
            <span>© 2026 P2GATHER</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
}