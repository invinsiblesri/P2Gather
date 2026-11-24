import { ChevronLeft, ChevronRight, Music, Search, ListMusic, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const screens = [
  {
    title: 'ROOM',
    id: '01',
    icon: Music,
    description: 'See who is listening, the current track, and playback controls \u2014 all synced in real time.',
    color: 'from-brand-indigo/60 to-brand-indigo/20',
  },
  {
    title: 'SEARCH',
    id: '02',
    icon: Search,
    description: 'Search YouTube or Audius. Results appear instantly with thumbnails and one-tap queue.',
    color: 'from-brand-mint/60 to-brand-mint/20',
  },
  {
    title: 'QUEUE',
    id: '03',
    icon: ListMusic,
    description: 'Collaborative queue — anyone in the room can add tracks. Up to 50 items.',
    color: 'from-[#2563EB]/60 to-brand-indigo/20',
  },
  {
    title: 'CHAT',
    id: '04',
    icon: MessageCircle,
    description: 'Lightweight real-time chat. React to tracks and coordinate with friends.',
    color: 'from-[#F2674B]/50 to-brand-mint/20',
  },
];

export function ACloserLook() {
  const [active, setActive] = useState(0);
  const screen = screens[active];
  const Icon = screen.icon;

  return (
    <div className="py-16 px-6 w-full max-w-4xl mx-auto">
      <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 text-center uppercase tracking-tight text-text-primary">See The Room.</h2>

      <div className="relative">
        {/* Phone mockup */}
        <div className="aspect-[9/16] max-w-[280px] mx-auto bg-bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative">
          {/* Status bar */}
          <div className="h-8 bg-bg-elevated flex items-center justify-center">
            <div className="w-16 h-1 rounded-full bg-white/10" />
          </div>
          {/* Screen content */}
          <div className={`flex-1 flex flex-col items-center justify-center p-6 h-full bg-gradient-to-b ${screen.color}`}>
            <Icon size={48} className="text-white/40 mb-4" />
            <span className="text-lg font-bold text-text-primary mb-2">{screen.title}</span>
            <p className="text-text-secondary text-xs text-center leading-relaxed max-w-[200px]">{screen.description}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-xs mx-auto">
          <button
            onClick={() => setActive(prev => (prev - 1 + screens.length) % screens.length)}
            className="p-2 border border-white/10 rounded-lg hover:bg-bg-elevated transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-brand-indigo w-6' : 'bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActive(prev => (prev + 1) % screens.length)}
            className="p-2 border border-white/10 rounded-lg hover:bg-bg-elevated transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <p className="text-center text-xs font-mono text-text-muted mt-4">{screen.id} / {screen.title}</p>
      </div>
    </div>
  );
}
