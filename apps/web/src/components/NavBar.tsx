import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { num: '01', label: 'Index', href: '#index' },
  { num: '02', label: 'Features', href: '#features' },
  { num: '03', label: 'How It Works', href: '#how' },
  { num: '04', label: 'Download', href: '#download' },
  { num: '05', label: 'Join', href: '#join' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-edge bg-ink-950/90 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <a href="#index" className="flex items-center gap-2.5 group">
            <img src="/images/logo.jpg" alt="P2Gather" className="h-8 w-8 rounded-xl object-cover" />
            <span className="font-display text-sm font-semibold tracking-tight text-bone-50">
              P2Gather
              <span className="hidden sm:block font-mono text-[9px] font-normal uppercase tracking-[0.22em] text-bone-500">
                Listen Together
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <a
                key={item.num}
                href={item.href}
                className="group flex items-baseline gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-400 hover:text-bone-50 transition-colors duration-300"
              >
                <span className="tabnum text-bone-500 group-hover:text-electric transition-colors">{item.num}</span>
                <span className="hot-link">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/join"
              className="btn-solid text-xs px-5 py-2.5"
            >
              Create Room
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex md:hidden h-9 w-9 items-center justify-center border border-edge-hi text-bone-100"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-b border-edge bg-ink-950 px-6 py-8">
            <ul className="space-y-3">
              {NAV_ITEMS.map(item => (
                <li key={item.num}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-bone-300 hover:text-bone-50"
                  >
                    <span className="tabnum text-bone-500">{item.num}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-edge">
              <a
                href="https://github.com/invinsiblesri/P2Gather"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-bone-300 hover:text-bone-50"
              >
                GitHub <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
