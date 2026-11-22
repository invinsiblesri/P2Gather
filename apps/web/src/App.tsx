import { useEffect, useState } from 'react'

function App() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-display font-bold text-6xl mb-8">P2GATHER</h1>
      <div className="bg-bg-surface p-24 rounded-card border border-white/10">
        <p className="text-text-secondary mb-4">Server Status:</p>
        {health ? (
          <pre className="bg-bg-canvas p-16 rounded font-mono text-brand-mint">
            {JSON.stringify(health, null, 2)}
          </pre>
        ) : (
          <p className="text-status-warning">Connecting to server...</p>
        )}
      </div>
    </div>
  )
}

export default App
