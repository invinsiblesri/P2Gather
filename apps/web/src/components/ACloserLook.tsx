import { useState, useRef, useEffect, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ArrowLeft, ArrowRight, Music, Search, ListMusic, MessageCircle } from 'lucide-react';

const SCREENS = [
  {
    id: 0,
    label: 'Room View',
    icon: Music,
    color: 'from-electric/30 via-electric/5 to-transparent',
    caption: 'The main room: synced playback, listeners, and controls all in one place.',
  },
  {
    id: 1,
    label: 'Search & Queue',
    icon: Search,
    color: 'from-hot/30 via-hot/5 to-transparent',
    caption: 'Search YouTube or Audius. One tap to add any track to the shared queue.',
  },
  {
    id: 2,
    label: 'Queue Manager',
    icon: ListMusic,
    color: 'from-electric/20 via-ink-900/80 to-transparent',
    caption: 'Collaborative queue. Anyone in the room can add tracks. Up to 50 items.',
  },
  {
    id: 3,
    label: 'Live Chat',
    icon: MessageCircle,
    color: 'from-hot/20 via-ink-900/80 to-transparent',
    caption: 'Real-time chat with everyone in the room. React to songs, coordinate picks.',
  },
];

export function ACloserLook() {
  const heading = useReveal();
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((index: number) => {
    setActive(index);
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = 200 + 24;
    const center = track.clientWidth / 2 - 100;
    track.scrollTo({ left: index * slideWidth - center + 100, behavior: 'smooth' });
  }, []);

  const prev = () => scrollTo((active - 1 + SCREENS.length) % SCREENS.length);
  const next = () => scrollTo((active + 1) % SCREENS.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(a => {
        const next = (a + 1) % SCREENS.length;
        scrollTo(next);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [scrollTo]);

  const screen = SCREENS[active];

  return (
    <section className="border-t border-edge py-12 overflow-hidden">
      <div ref={heading} className="rv px-5 sm:px-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-500">A closer look</p>
        <h2 className="mt-3 font-display text-4xl font-semibold uppercase tracking-[-0.03em] text-bone-50 sm:text-5xl">
          Inside the room.
        </h2>
        <p className="mt-4 text-sm text-bone-300">Four screens, one seamless experience.</p>
      </div>

      {/* Phone carousel */}
      <div className="relative mt-10" style={{ height: 440 }}>
        <div
          ref={trackRef}
          className="flex items-center gap-6 h-full overflow-x-auto scrollbar-none px-[calc(50%-100px)]"
          style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
        >
          {SCREENS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            return (
              <div
                key={s.id}
                className={`flex-shrink-0 w-[200px] h-[400px] border border-edge rounded-[24px] overflow-hidden transition-all duration-500 cursor-pointer ${
                  isActive ? 'scale-100 opacity-100 shadow-2xl' : 'scale-90 opacity-40'
                }`}
                style={{ scrollSnapAlign: 'center' }}
                onClick={() => scrollTo(i)}
              >
                <div className="h-7 flex items-center justify-center border-b border-edge/60">
                  <div className="w-16 h-1 rounded-full bg-bone-500/20" />
                </div>
                <div className={`flex-1 flex flex-col items-center justify-center p-6 h-[calc(100%-28px)] bg-gradient-to-b ${s.color} bg-ink-950`}>
                  <div className="p-3 border border-edge-hi text-bone-100 mb-4">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-sm font-semibold text-bone-50 text-center">{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption + nav */}
      <div className="text-center px-5 mt-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-500">
          {String(active + 1).padStart(2, '0')} / {String(SCREENS.length).padStart(2, '0')} &middot; {screen.label}
        </p>
        <p className="mt-3 font-display text-lg font-medium text-bone-100 max-w-md mx-auto">
          {screen.caption}
        </p>
      </div>

      <div className="flex justify-center items-center gap-5 mt-6">
        <button onClick={prev} className="h-10 w-10 grid place-items-center border border-edge text-bone-300 hover:bg-ink-800 hover:text-bone-50 transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div className="flex items-center gap-[3px]">
          {SCREENS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-9 grid place-items-center transition-all duration-300 ${i === active ? 'w-[34px]' : 'w-6'}`}
            >
              <span className={`block h-[5px] rounded-full transition-all duration-300 ${
                i === active ? 'w-[25px] bg-hot' : 'w-[5px] bg-bone-500'
              }`} />
            </button>
          ))}
        </div>
        <button onClick={next} className="h-10 w-10 grid place-items-center border border-edge text-bone-300 hover:bg-ink-800 hover:text-bone-50 transition-colors">
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
