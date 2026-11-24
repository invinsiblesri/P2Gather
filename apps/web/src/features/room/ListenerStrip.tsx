export function ListenerStrip() {
  const listeners = [
    { id: '1', name: 'Alice', status: 'online' },
    { id: '2', name: 'Bob', status: 'online' },
    { id: '3', name: 'Carol', status: 'away' },
  ];

  return (
    <div className="spot border border-edge p-4 rounded-spot backdrop-blur-sm bg-ink-950/60">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold text-bone-50">Listeners</h3>
          <div className="flex items-center gap-1.5 border border-edge bg-ink-950 px-2.5 py-1 font-mono text-[10px] rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-blink" />
            <span className="text-electric">{listeners.filter(l => l.status === 'online').length} synced</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {listeners.map(l => (
            <div key={l.id} className="inline-flex items-center gap-2 border border-edge bg-ink-900/50 px-3 py-2 font-mono text-[11px] rounded-full">
              <div className={`w-1.5 h-1.5 rounded-full ${l.status === 'online' ? 'bg-electric' : 'bg-bone-500'}`} />
              <span className="text-bone-200">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
