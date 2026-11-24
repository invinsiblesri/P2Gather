import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-edge px-5 py-14 sm:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-7 w-7 rounded-full bg-electric flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs">P2</span>
            </div>
            <span className="font-display text-sm font-semibold tracking-tight text-bone-50">P2Gather</span>
          </div>
          <p className="text-sm text-bone-400 max-w-xs leading-relaxed">
            An open-source synchronized listening room for the web. No accounts, no installs, no tracking.
          </p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-500 block mb-3">Navigate</span>
            <nav className="flex flex-col gap-2">
              <a href="#features" className="text-sm text-bone-400 hover:text-bone-50 transition-colors">Features</a>
              <a href="#how" className="text-sm text-bone-400 hover:text-bone-50 transition-colors">How It Works</a>
              <a href="#join" className="text-sm text-bone-400 hover:text-bone-50 transition-colors">Join Room</a>
              <a href="#faq" className="text-sm text-bone-400 hover:text-bone-50 transition-colors">FAQ</a>
            </nav>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-500 block mb-3">Legal</span>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-bone-400 hover:text-bone-50 transition-colors">Privacy Policy</Link>
            </nav>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-500 block mb-3">Code</span>
            <nav className="flex flex-col gap-2">
              <a href="https://github.com/invinsiblesri/P2Gather" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-bone-400 hover:text-bone-50 transition-colors">
                GitHub <ArrowUpRight size={12} />
              </a>
              <a href="https://github.com/invinsiblesri/P2Gather/releases" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-bone-400 hover:text-bone-50 transition-colors">
                Releases <ArrowUpRight size={12} />
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-edge flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-[10px] text-bone-500 max-w-lg leading-relaxed">
          Disclaimer: P2Gather is an independent project and is not affiliated with YouTube, Google LLC, or Audius.
          YouTube is a trademark of Google LLC. Music remains the property of the respective artists.
        </p>
        <div className="flex items-center gap-4">
          <p className="font-mono text-[10px] text-bone-500">&copy; 2026 P2Gather</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-400 hover:text-bone-50 transition-colors"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>

      {/* Credits */}
      <div className="mt-6 pt-4 border-t border-edge/60">
        <p className="text-[10px] text-bone-500 leading-relaxed max-w-2xl">
          UI design inspired by{' '}
          <a href="https://github.com/Shreyanshh071/Auralis" target="_blank" rel="noreferrer" className="text-bone-400 hover:text-bone-50 underline underline-offset-4 transition-colors">
            Auralis
          </a>{' '}
          by @Shreyanshh071 — a beautifully crafted open-source music player for Android. Full credit to the Auralis team for the design language that inspired this project.
        </p>
      </div>
    </footer>
  );
}
