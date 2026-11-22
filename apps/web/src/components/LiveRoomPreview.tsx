import { Play, SkipForward, SkipBack } from 'lucide-react';

export function LiveRoomPreview() {
  return (
    <div className="py-24 px-6 max-w-2xl mx-auto w-full">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-indigo to-brand-mint rounded-card blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-bg-surface border border-white/10 rounded-card overflow-hidden">
          <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-tighter text-text-muted uppercase">Illustrative Preview</span>
            <div className="flex items-center space-x-2 bg-bg-canvas px-8 py-2 rounded-full border border-white/5">
              <div className="w-1.5 h-1.5 bg-brand-mint rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono text-text-primary">84K-2QP · 3 SYNCED</span>
            </div>
          </div>
          
          <div className="p-24 flex flex-col items-center">
            <div className="w-48 h-48 rounded-lg bg-gradient-to-br from-brand-indigo/40 to-brand-mint/40 mb-16 shadow-2xl flex items-center justify-center">
               <div className="w-32 h-32 rounded bg-white/5 backdrop-blur-sm border border-white/10"></div>
            </div>
            
            <h3 className="text-xl font-semibold text-text-primary mb-2">Demo Track</h3>
            <p className="text-text-secondary text-sm mb-24">P2Gather · UI preview</p>
            
            <div className="w-full space-y-12 mb-24">
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand-indigo w-1/3 rounded-full"></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-text-muted">
                <span>01:12</span>
                <span>03:45</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-24 text-text-primary">
              <SkipBack size={20} className="text-text-muted" />
              <div className="w-14 h-14 bg-brand-indigo rounded-full flex items-center justify-center shadow-lg shadow-brand-indigo/20">
                <Play size={24} fill="currentColor" />
              </div>
              <SkipForward size={20} />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-12 text-center text-[10px] font-mono text-text-muted uppercase tracking-widest">
        Interactive layout preview. No audio plays on this page.
      </p>
    </div>
  );
}
