export function ListenerStrip() {
  const listeners = [
    { id: '1', name: 'Alice', status: 'online' },
    { id: '2', name: 'Bob', status: 'online' },
    { id: '3', name: 'Carol', status: 'away' },
  ];

  return (
    <div className="bg-bg-surface/60 backdrop-blur-sm border border-white/10 rounded-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-primary">Listeners</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-brand-mint rounded-full animate-pulse" />
          <span className="text-xs font-mono text-brand-mint">{listeners.filter(l => l.status === 'online').length} SYNCED</span>
        </div>
      </div>
      <div className="flex gap-3">
        {listeners.map(l => (
          <div key={l.id} className="flex items-center gap-2 bg-bg-canvas/50 px-3 py-2 rounded-lg border border-white/5">
            <div className={`w-2 h-2 rounded-full ${l.status === 'online' ? 'bg-brand-mint' : 'bg-text-muted'}`} />
            <span className="text-sm text-text-primary">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
