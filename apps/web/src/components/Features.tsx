import { useReveal } from '../hooks/useReveal';
import { useSpotlight } from '../hooks/useSpotlight';
import { Users, Search, MessageCircle, Radio, Shield, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Radio,
    title: 'Synchronized Playback',
    desc: 'Everyone hears the same beat at the same millisecond. The host controls playback, and drift correction keeps everyone in sync.',
    demo: <SyncDemo />,
  },
  {
    icon: Users,
    title: 'Listen Together Rooms',
    desc: 'Create a room with a 6-character code. Share it via any messaging app. Up to 25 listeners per room, no account needed.',
    demo: <RoomDemo />,
  },
  {
    icon: Search,
    title: 'YouTube + Audius Search',
    desc: 'Search millions of tracks across YouTube and Audius. Thumbnails, artist names, and one-tap add to the shared queue.',
    demo: <SearchDemo />,
  },
  {
    icon: MessageCircle,
    title: 'Real-Time Chat',
    desc: 'Built-in lightweight chat in every room. Coordinate song picks, react to tracks, and talk without leaving the app.',
    demo: <ChatDemo />,
  },
  {
    icon: Shield,
    title: 'Zero Friction, Zero Tracking',
    desc: 'No accounts, no installs, no analytics SDK. Guest names live in localStorage. Rooms expire automatically. Chat is never logged.',
    demo: <PrivacyDemo />,
  },
  {
    icon: Zap,
    title: 'Open Source',
    desc: 'MIT-licensed. Fork it, extend it, self-host it. The entire codebase is on GitHub. No ads, no paywall, no catch.',
    demo: <OpenSourceDemo />,
  },
];

export function Features() {
  const heading = useReveal();
  const sub = useReveal();

  return (
    <section id="features" className="relative scroll-mt-14 border-t border-edge px-5 pt-8 pb-20 sm:px-10 sm:pt-10 sm:pb-28">
      <div className="grid gap-6 border-b border-edge pb-8 lg:grid-cols-12 lg:items-end">
        <div ref={heading} className="rv lg:col-span-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-500">02 — Features</p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-bone-50 sm:text-6xl">
            Built for<br />shared listening
          </h2>
        </div>
        <div ref={sub} className="rv lg:col-span-5" style={{ transitionDelay: '120ms' } as React.CSSProperties}>
          <p className="max-w-md text-[15px] leading-relaxed text-bone-300 lg:ml-auto lg:text-right">
            Rooms, search, chat, and sync — with no accounts, no ads, and no analytics SDK.
          </p>
        </div>
      </div>

      <div className="grid gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }: { feature: typeof FEATURES[0]; delay: number }) {
  const ref = useReveal();
  const { onMouseMove } = useSpotlight();
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className="rv spot flex flex-col justify-between border border-edge p-6 sm:p-8 rounded-spot overflow-hidden backdrop-blur-sm bg-ink-950/60"
      style={{ transitionDelay: `${delay}ms` } as React.CSSProperties}
      onMouseMove={onMouseMove}
    >
      <div className="relative z-10">
        <div className="flex h-10 w-10 items-center justify-center border border-edge-hi text-bone-100">
          <Icon size={20} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-bone-50">
          {feature.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-bone-300">
          {feature.desc}
        </p>
      </div>
      <div className="relative z-10 mt-8">
        {feature.demo}
      </div>
    </div>
  );
}

function SyncDemo() {
  return (
    <div className="border border-edge bg-ink-900/60 p-4 font-mono text-[11px] rounded-spot">
      <div className="flex items-center gap-2 text-bone-500">
        <span className="h-1.5 w-1.5 rounded-full bg-electric animate-blink" />
        <span>SYNC ENGINE</span>
      </div>
      <div className="mt-3 flex items-end justify-center gap-[3px] h-6">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-electric/50 origin-bottom"
            style={{
              height: `${4 + Math.sin(i * 0.6) * 12 + Math.random() * 8}px`,
              animation: `bar ${0.6 + Math.random() * 0.6}s ease-in-out ${i * 0.05}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9px] text-bone-500">
        <span>HOST &rarr; GUESTS</span>
        <span className="text-electric">&lt; 1.5s DRIFT</span>
      </div>
    </div>
  );
}

function RoomDemo() {
  return (
    <div className="border border-edge bg-ink-900/60 p-4 font-mono text-[11px] rounded-spot">
      <div className="flex items-center justify-between text-bone-400">
        <span>ROOM: #84K2QP</span>
        <span className="text-bone-300 font-medium">3 SYNCED</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="border border-edge-hi bg-ink-850 px-2.5 py-1 text-[10px] text-bone-100 rounded-full">HOST</span>
        <span className="border border-edge bg-ink-950 px-2 py-1 text-[10px] text-bone-400 rounded-full">GUEST 01</span>
        <span className="border border-edge bg-ink-950 px-2 py-1 text-[10px] text-bone-400 rounded-full">GUEST 02</span>
      </div>
    </div>
  );
}

function SearchDemo() {
  return (
    <div className="border border-edge bg-ink-900/60 p-4 font-mono text-[11px] rounded-spot">
      <div className="flex items-center gap-2 text-bone-500">
        <Search size={12} />
        <span className="text-bone-300">lofi beats</span>
        <span className="ml-auto text-[9px] text-electric">3 results</span>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-bone-400">
          <div className="w-5 h-5 bg-ink-800 border border-edge flex items-center justify-center text-[8px]">&#9835;</div>
          <span className="text-bone-200 text-[10px] truncate">Lofi Chill Beats</span>
          <span className="ml-auto text-[9px]">+ queue</span>
        </div>
        <div className="flex items-center gap-2 text-bone-400">
          <div className="w-5 h-5 bg-ink-800 border border-edge flex items-center justify-center text-[8px]">&#9835;</div>
          <span className="text-bone-200 text-[10px] truncate">Late Night Study</span>
          <span className="ml-auto text-[9px]">+ queue</span>
        </div>
      </div>
    </div>
  );
}

function ChatDemo() {
  return (
    <div className="border border-edge bg-ink-900/60 p-4 font-mono text-[11px] rounded-spot">
      <div className="flex items-center gap-2 text-bone-500 mb-2">
        <MessageCircle size={12} />
        <span>ROOM CHAT</span>
      </div>
      <div className="space-y-1">
        <p><span className="text-electric">alice:</span> <span className="text-bone-300">this track is fire 🔥</span></p>
        <p><span className="text-hot">bob:</span> <span className="text-bone-300">add more lofi pls</span></p>
        <p><span className="text-bone-200">carol:</span> <span className="text-bone-400">on it ✨</span></p>
      </div>
    </div>
  );
}

function PrivacyDemo() {
  return (
    <div className="border border-edge bg-ink-900/60 p-4 font-mono text-[11px] rounded-spot">
      <div className="text-bone-500 text-[10px]">// privacy summary</div>
      <div className="mt-1 space-y-0.5 text-[10px]">
        <p className="text-bone-400">data_handling {'{'}</p>
        <p className="text-bone-300 pl-4">accounts: <span className="text-electric">none</span>,</p>
        <p className="text-bone-300 pl-4">analytics: <span className="text-electric">none</span>,</p>
        <p className="text-bone-300 pl-4">chat_logs: <span className="text-electric">never stored</span>,</p>
        <p className="text-bone-400">{'}'}</p>
      </div>
    </div>
  );
}

function OpenSourceDemo() {
  return (
    <div className="border border-edge bg-ink-900/60 p-4 font-mono text-[11px] rounded-spot">
      <div className="text-bone-500 text-[10px]">$ git clone</div>
      <p className="mt-1 text-bone-300 text-[10px] break-words">github.com/invinsiblesri/P2Gather</p>
      <div className="mt-2 flex items-center gap-3 text-[9px] text-bone-500">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-electric" /> TypeScript</span>
        <span>MIT License</span>
        <span>React + Express</span>
      </div>
    </div>
  );
}
