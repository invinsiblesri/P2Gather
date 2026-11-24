import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

export function JoinWithCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const ref = useReveal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (val.length > 3) val = val.slice(0, 3) + '-' + val.slice(3, 6);
    else val = val.slice(0, 6);
    setCode(val);
  };

  const handleSubmit = () => {
    const clean = code.replace('-', '');
    if (clean.length === 6) navigate(`/r/${clean}`);
  };

  return (
    <section id="join" className="border-t border-edge px-5 py-20 sm:px-10">
      <div ref={ref} className="rv max-w-sm mx-auto">
        <div className="spot border border-edge p-8 rounded-spot backdrop-blur-sm bg-ink-950/60">
          <div className="relative z-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-500 mb-2">04 — Join</p>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-bone-50 mb-6">
              Have a room code?
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={code}
                onChange={handleChange}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="000-000"
                className="w-full bg-ink-900/60 border border-edge px-4 py-4 text-2xl font-mono text-center tracking-[0.3em] text-bone-50 placeholder:text-bone-500/40 focus:outline-none focus:border-electric/40 focus:ring-1 focus:ring-electric/20 transition-all"
                maxLength={7}
              />
              <button
                onClick={handleSubmit}
                disabled={code.replace('-', '').length !== 6}
                className="btn-solid w-full disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
