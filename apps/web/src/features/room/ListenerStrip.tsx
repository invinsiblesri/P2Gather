export function ListenerStrip() {
  const listeners = [
    { id: '1', name: 'Alice', status: 'online' },
    { id: '2', name: 'Bob', status: 'online' },
    { id: '3', name: 'Carol', status: 'away' },
  ];

  return (
    <div className="glass rounded-glass p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-display font-bold text-text-primary">Listeners</h3>
        <div className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded-pill">
          <div className="w-1.5 h-1.5 bg-brand-lime rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-brand-lime">{listeners.filter(l => l.status === 'online').length} synced</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {listeners.map(l => (
          <div key={l.id} className="inline-flex items-center gap-2 bg-white/[0.03] px-3 py-2 rounded-pill border border-white/[0.04]">
            <div className={`w-2 h-2 rounded-full ${l.status === 'online' ? 'bg-brand-lime' : 'bg-text-muted'}`} />
            <span className="text-sm text-text-primary">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
