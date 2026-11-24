import { Play, SkipForward, SkipBack, Volume2 } from 'lucide-react';

export function LiveRoomPreview() {
  return (
    <div className="py-16 px-6 max-w-3xl mx-auto w-full">
      <div className="relative group">
        {/* Outer glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-brand-lime/20 via-brand-indigo/20 to-brand-mint/20 rounded-[24px] blur-xl opacity-40 group-hover:opacity-60 transition duration-700" />

        <div className="relative glass-strong rounded-glass overflow-hidden shadow-glass-lg">
          {/* Top bar */}
          <div className="px-5 py-3 border-b border-white/[0.04] flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase">Live Preview</span>
            <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1.5 rounded-pill">
              <div className="w-1.5 h-1.5 bg-brand-lime rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-text-primary">84K-2QP</span>
              <span className="text-[10px] text-text-muted">&middot;</span>
              <span className="text-[10px] font-mono text-brand-mint">3 synced</span>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col items-center">
            {/* Album art with glow */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/30 to-brand-indigo/30 rounded-2xl blur-2xl scale-110" />
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-2xl bg-gradient-to-br from-brand-lime/20 via-brand-indigo/15 to-brand-violet/20 shadow-glass-lg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm" />
                <div className="relative flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-white/[0.06] flex items-center justify-center">
                    <Volume2 size={28} className="text-brand-lime/60" />
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">Album Art</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-display font-bold text-text-primary mb-1">Demo Track</h3>
            <p className="text-text-secondary text-sm mb-8">P2Gather &middot; Preview</p>

            {/* Progress */}
            <div className="w-full max-w-sm space-y-2 mb-8">
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-brand-lime to-brand-mint" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-text-muted">
                <span>1:12</span>
                <span>3:45</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
                <SkipBack size={20} />
              </button>
              <button className="w-14 h-14 rounded-full bg-brand-lime text-bg-canvas flex items-center justify-center shadow-glow-lime hover:scale-105 active:scale-95 transition-transform">
                <Play size={22} fill="currentColor" className="ml-0.5" />
              </button>
              <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
                <SkipForward size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-[10px] font-mono text-text-muted uppercase tracking-widest">
        UI Preview &middot; No audio plays on this page
      </p>
    </div>
  );
}
