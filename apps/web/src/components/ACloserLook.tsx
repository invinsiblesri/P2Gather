import { ChevronLeft, ChevronRight, Music, Search, ListMusic, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const screens = [
  {
    title: 'ROOM',
    id: '01',
    icon: Music,
    description: 'Real-time synced playback with everyone in the room. See listeners, controls, and track info.',
    gradient: 'from-brand-lime/30 via-brand-lime/5 to-transparent',
    iconColor: 'text-brand-lime',
  },
  {
    title: 'SEARCH',
    id: '02',
    icon: Search,
    description: 'Search YouTube or Audius instantly. Thumbnails, artists, and one-tap add to queue.',
    gradient: 'from-brand-indigo/30 via-brand-indigo/5 to-transparent',
    iconColor: 'text-brand-indigo',
  },
  {
    title: 'QUEUE',
    id: '03',
    icon: ListMusic,
    description: 'Collaborative queue. Anyone in the room can add tracks. Up to 50 items.',
    gradient: 'from-brand-violet/30 via-brand-violet/5 to-transparent',
    iconColor: 'text-brand-violet',
  },
  {
    title: 'CHAT',
    id: '04',
    icon: MessageCircle,
    description: 'Real-time lightweight chat. Coordinate with friends and react to tracks.',
    gradient: 'from-brand-coral/30 via-brand-coral/5 to-transparent',
    iconColor: 'text-brand-coral',
  },
];

export function ACloserLook() {
  const [active, setActive] = useState(0);
  const screen = screens[active];
  const Icon = screen.icon;

  return (
    <div className="py-16 px-6 w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Inside The Room</h2>
        <p className="text-text-muted text-sm mt-2">Four screens, one seamless experience</p>
      </div>

      <div className="relative">
        {/* Phone mockup */}
        <div className="aspect-[9/16] max-w-[260px] mx-auto glass-strong rounded-[36px] overflow-hidden shadow-glass-lg relative">
          {/* Notch */}
          <div className="h-7 flex items-center justify-center">
            <div className="w-20 h-1.5 rounded-full bg-white/[0.06]" />
          </div>
          {/* Screen */}
          <div className={`flex-1 flex flex-col items-center justify-center p-8 h-[calc(100%-28px)] bg-gradient-to-b ${screen.gradient}`}>
            <div className={`p-4 rounded-2xl bg-white/[0.04] mb-5 ${screen.iconColor}`}>
              <Icon size={40} strokeWidth={1.5} />
            </div>
            <span className="text-lg font-display font-bold text-text-primary mb-2">{screen.title}</span>
            <p className="text-text-secondary text-xs text-center leading-relaxed">{screen.description}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-xs mx-auto">
          <button
            onClick={() => setActive(prev => (prev - 1 + screens.length) % screens.length)}
            className="p-2.5 glass rounded-xl glass-hover"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2 items-center">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-brand-lime' : 'w-1.5 bg-white/[0.15] hover:bg-white/[0.3]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setActive(prev => (prev + 1) % screens.length)}
            className="p-2.5 glass rounded-xl glass-hover"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
