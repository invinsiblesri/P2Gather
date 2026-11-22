import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function ACloserLook() {
  const screens = [
    { title: 'ROOM', id: '01' },
    { title: 'SEARCH', id: '02' },
    { title: 'QUEUE', id: '03' },
    { title: 'CHAT', id: '04' },
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="py-32 px-6 w-full max-w-4xl mx-auto">
      <h2 className="text-display font-bold text-4xl mb-32 text-center">SEE THE ROOM.</h2>
      
      <div className="relative">
        <div className="aspect-[9/16] max-w-[300px] mx-auto bg-bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 flex items-center justify-center text-text-muted font-mono text-xs">
             {screens[active].title} UI
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-24">
          <button onClick={() => setActive(prev => (prev - 1 + screens.length) % screens.length)} className="p-8 border border-white/10 rounded">
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-mono text-text-muted">{screens[active].id} / {screens[active].title}</span>
          <button onClick={() => setActive(prev => (prev + 1) % screens.length)} className="p-8 border border-white/10 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
