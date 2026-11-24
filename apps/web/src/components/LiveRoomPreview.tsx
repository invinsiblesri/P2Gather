import { Play, SkipForward, SkipBack } from 'lucide-react';

export function LiveRoomPreview() {
  return (
    <div className="py-16 px-6 max-w-2xl mx-auto w-full">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-indigo to-brand-mint rounded-card blur opacity-20 group-hover:opacity-30 transition duration-1000" />
        <div className="relative bg-bg-surface border border-white/10 rounded-card overflow-hidden">
          {/* Header bar */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-tighter text-text-muted uppercase">Illustrative Preview</span>
            <div className="flex items-center gap-2 bg-bg-canvas px-4 py-1.5 rounded-full border border-white/5">
              <div className="w-1.5 h-1.5 bg-brand-mint rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-text-primary">84K-2QP · 3 SYNCED</span>
            </div>
          </div>

          {/* Player body */}
          <div className="p-8 md:p-12 flex flex-col items-center">
            {/* Album art */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-lg bg-gradient-to-br from-brand-indigo/40 to-brand-mint/40 mb-8 shadow-2xl flex items-center justify-center">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Play size={32} className="text-white/30" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-text-primary mb-1">Demo Track</h3>
            <p className="text-text-secondary text-sm mb-8">P2Gather · UI preview</p>

            {/* Progress bar */}
            <div className="w-full space-y-2 mb-8">
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-indigo to-brand-mint w-1/3 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-text-muted">
                <span>01:12</span>
                <span>03:45</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8 text-text-primary">
              <SkipBack size={20} className="text-text-muted hover:text-text-primary cursor-pointer transition-colors" />
              <div className="w-14 h-14 bg-brand-indigo rounded-full flex items-center justify-center shadow-lg shadow-brand-indigo/20 hover:scale-105 transition-transform cursor-pointer">
                <Play size={24} fill="currentColor" />
              </div>
              <SkipForward size={20} className="hover:text-text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-[10px] font-mono text-text-muted uppercase tracking-widest">
        Interactive layout preview · No audio plays on this page
      </p>
    </div>
  );
}
