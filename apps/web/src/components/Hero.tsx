import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export function Hero() {
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  return (
    <section id="index" className="relative scroll-mt-0 overflow-hidden">
      <div className="relative px-5 pb-16 pt-24 sm:px-10 lg:pt-32">
        {/* Status bar */}
        <div ref={r1} className="rv">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
            <span className="flex items-center gap-2 text-bone-300">
              <span className="h-1.5 w-1.5 bg-hot animate-blink" />
              Live &middot; Synchronized Rooms
            </span>
            <span>No Account Required</span>
            <span className="hidden sm:inline">YouTube + Audius</span>
            <span className="hidden md:inline">Open Source &middot; Free</span>
          </div>
        </div>

        {/* Main heading with mask-line reveal */}
        <h1 className="mt-10 font-display text-[clamp(2.8rem,9.5vw,8.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em] text-bone-50">
          <span className="sr-only">P2Gather — synchronized listening rooms for the web.</span>
          <span className="block">
            <span className="mask-line">
              <span className="rv rv-in" style={{ transitionDelay: '100ms' }}>One Room.</span>
            </span>
            <span className="mask-line">
              <span className="rv rv-in" style={{ transitionDelay: '200ms' }}>One Beat.</span>
            </span>
            <span className="mask-line">
              <span className="rv rv-in" style={{ transitionDelay: '300ms' }}>Everyone In Sync.</span>
            </span>
          </span>
        </h1>

        {/* Two-column body */}
        <div className="mt-12 grid gap-10 border-t border-edge pt-8 lg:grid-cols-12">
          <div ref={r2} className="rv lg:col-span-6" style={{ transitionDelay: '300ms' } as React.CSSProperties}>
            <p className="max-w-lg text-[17px] leading-relaxed text-bone-200">
              Create a room, share the code, and everyone hears the same song at the same moment.
              No sign-ups. No downloads. Just music, together.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/join" className="btn-solid">
                Start Listening
              </Link>
              <a
                href="https://github.com/invinsiblesri/P2Gather"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" />
                </svg>
                View Source
                <ArrowUpRight size={14} />
              </a>
              <a href="#features" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400 hover:text-bone-50 px-2 py-2 transition-colors">
                Features <ArrowDown size={14} />
              </a>
            </div>

            {/* Stat strip */}
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 border-t border-edge pt-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:grid-cols-4">
              <div className="min-w-0">
                <dt className="text-bone-500 truncate">Source</dt>
                <dd className="mt-1 text-bone-200 truncate">YouTube + Audius</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-bone-500 truncate">Drift</dt>
                <dd className="mt-1 text-bone-200 truncate">&lt; 1.5 seconds</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-bone-500 truncate">Room Size</dt>
                <dd className="mt-1 text-bone-200 truncate">Up to 25 listeners</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-bone-500 truncate">Account</dt>
                <dd className="mt-1 text-bone-200 truncate">None needed</dd>
              </div>
            </dl>
          </div>

          {/* Right side: Player mockup */}
          <div ref={r3} className="rv min-w-0 w-full lg:col-span-5 lg:col-start-8" style={{ transitionDelay: '400ms' } as React.CSSProperties}>
            <PlayerMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayerMockup() {
  return (
    <div className="spot border border-edge bg-ink-900/90 p-5 sm:p-7 overflow-hidden shadow-2xl">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-edge pb-3.5">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-400">
          <span className="h-3.5 w-3.5 text-bone-200">&#9835;</span>
          Now Playing
        </span>
        <span className="flex items-center gap-1.5 border border-edge-hi bg-ink-950 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-bone-200 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-hot animate-blink" />
          SYNCED
        </span>
      </div>

      {/* Track info */}
      <div className="mt-5 flex items-center gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center border border-edge-hi bg-gradient-to-br from-ink-800 via-ink-850 to-ink-950 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-hot/10" />
          <span className="relative text-bone-300 text-lg">&#9835;</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold tracking-tight text-bone-50 truncate">
            Demo Track
          </p>
          <p className="font-mono text-[11px] text-bone-400 truncate">
            P2Gather &middot; Preview Room
          </p>
        </div>
      </div>

      {/* Waveform visualizer */}
      <div className="mt-5 border border-edge bg-ink-950/90 p-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-bone-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-blink" />
            WAVEFORM
          </span>
          <span className="text-bone-300 tabnum">01:35 / 03:36</span>
        </div>
        <div className="mt-3 flex items-end justify-center gap-[3px] h-8">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full bg-electric/60 origin-bottom"
              style={{
                height: `${Math.max(4, Math.sin(i * 0.5) * 20 + Math.random() * 12)}px`,
                animation: `bar ${0.6 + Math.random() * 0.8}s ease-in-out ${Math.random() * 0.5}s infinite alternate`,
                opacity: i < 10 ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="relative h-1.5 w-full overflow-hidden bg-ink-800">
          <div className="h-full bg-electric transition-all duration-300" style={{ width: '44%' }} />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[9px] uppercase tracking-wider text-bone-500">
          <span>01:35</span>
          <span>UI Preview</span>
          <span>03:36</span>
        </div>
      </div>

      {/* Controls + room badge */}
      <div className="mt-4 flex items-center justify-between border-t border-edge/80 pt-3">
        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center text-bone-400 hover:text-bone-50 transition-colors">&#9198;</button>
          <button className="flex h-9 w-9 items-center justify-center border border-edge-hi bg-ink-850 text-bone-50 hover:bg-ink-800 transition-colors">&#9654;</button>
          <button className="flex h-8 w-8 items-center justify-center text-bone-400 hover:text-bone-50 transition-colors">&#9197;</button>
        </div>
        <div className="flex items-center gap-2 border border-edge bg-ink-950 px-2.5 py-1 font-mono text-[10px] text-bone-400 rounded-full">
          <span className="text-bone-300 font-medium">#84K2QP</span>
          <span className="text-bone-500">&middot;</span>
          <span className="text-bone-400">3 SYNCED</span>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] text-bone-500">
        Interactive preview. No audio plays on this page.
      </p>
    </div>
  );
}
