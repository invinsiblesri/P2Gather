export function ListenerStrip() {
  const listeners = [
    { id: '1', name: 'Alice', status: 'online' },
    { id: '2', name: 'Bob', status: 'online' },
    { id: '3', name: 'Carol', status: 'away' },
  ];

  return (
    <div className="bg-bg-surface border border-white/10 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Listeners</h3>
        <span className="text-xs font-mono text-brand-mint">3 SYNCED</span>
      </div>
      <div className="space-y-2">
        {listeners.map(l => (
          <div key={l.id} className="flex items-center justify-between text-sm">
            <span className="text-text-primary">{l.name}</span>
            <span className="text-xs text-text-muted">{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
