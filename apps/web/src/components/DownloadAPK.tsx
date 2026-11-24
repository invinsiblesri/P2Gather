import { useReveal } from '../hooks/useReveal';
import { useSpotlight } from '../hooks/useSpotlight';
import { Download, ArrowUpRight, Smartphone, Wifi, Shield } from 'lucide-react';

const APK_URL = 'https://github.com/invinsiblesri/P2Gather/releases/latest/download/P2Gather-v2.0.0.apk';
const APK_SIZE = '6.12 MB';
const VERSION = 'v2.0.0';

export function DownloadAPK() {
  const heading = useReveal();
  const card = useReveal();
  const { onMouseMove } = useSpotlight();

  return (
    <section id="download" className="scroll-mt-14 border-t border-edge px-5 pt-8 pb-20 sm:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left: heading */}
        <div ref={heading} className="rv lg:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-500">06 — Download</p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-bone-50 sm:text-5xl">
            Get P2Gather<br />for Android
          </h2>
          <p className="mt-4 text-sm text-bone-300 max-w-md leading-relaxed">
            Take the listening room with you. Same features as the web app, wrapped as a native Android app.
            Direct APK download — no Play Store required.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={APK_URL}
              download
              className="btn-solid"
            >
              <Download size={16} />
              Download APK ({APK_SIZE})
            </a>
            <a
              href="https://github.com/invinsiblesri/P2Gather/releases"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              All Releases
              <ArrowUpRight size={14} />
            </a>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-edge pt-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em]">
            <div>
              <dt className="text-bone-500">Version</dt>
              <dd className="mt-1 text-bone-200">{VERSION}</dd>
            </div>
            <div>
              <dt className="text-bone-500">Min Android</dt>
              <dd className="mt-1 text-bone-200">7.0+</dd>
            </div>
            <div>
              <dt className="text-bone-500">Architecture</dt>
              <dd className="mt-1 text-bone-200">Universal</dd>
            </div>
            <div>
              <dt className="text-bone-500">License</dt>
              <dd className="mt-1 text-bone-200">MIT</dd>
            </div>
          </dl>
        </div>

        {/* Right: APK card */}
        <div ref={card} className="rv lg:col-span-6 lg:col-start-7" style={{ transitionDelay: '150ms' } as React.CSSProperties}>
          <div
            className="spot border border-edge p-6 sm:p-8 rounded-spot backdrop-blur-sm bg-ink-950/60"
            onMouseMove={onMouseMove}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/logo.jpg" alt="P2Gather" className="h-12 w-12 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-bone-50">P2Gather</h3>
                  <p className="font-mono text-[11px] text-bone-400">Synchronized listening rooms</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  { icon: Smartphone, text: 'Native Android app with WebView engine' },
                  { icon: Wifi, text: 'Real-time sync with the same backend' },
                  { icon: Shield, text: 'No ads, no tracking, no analytics SDK' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-edge-hi text-bone-300">
                        <Icon size={14} />
                      </div>
                      <span className="text-sm text-bone-300 pt-1.5">{item.text}</span>
                    </li>
                  );
                })}
              </ul>

              <a
                href={APK_URL}
                download
                className="btn-solid w-full text-center"
              >
                <Download size={16} />
                Download APK ({APK_SIZE})
              </a>

              <p className="mt-4 text-center font-mono text-[9px] text-bone-500 uppercase tracking-wider">
                Direct APK &middot; No store required &middot; Open source
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
