import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function JoinPage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (val.length > 3) val = val.slice(0, 3) + '-' + val.slice(3, 6);
    else val = val.slice(0, 6);
    setCode(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.replace('-', '');
    if (clean.length === 6) navigate(`/r/${clean}`);
  };

  return (
    <div className="relative min-h-screen text-bone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="spot border border-edge p-8 rounded-spot backdrop-blur-sm bg-ink-950/60 shadow-2xl">
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="h-10 w-10 rounded-full bg-electric flex items-center justify-center">
                  <span className="text-white font-display font-bold text-sm">P2</span>
                </div>
              </div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-bone-50 mb-1">Join a Room</h1>
              <p className="text-bone-400 text-sm">Enter the 6-character room code</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="room-code" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-500 mb-2">
                  Room Code
                </label>
                <input
                  id="room-code"
                  type="text"
                  value={code}
                  onChange={handleChange}
                  placeholder="000-000"
                  className="w-full bg-ink-900/60 border border-edge px-4 py-4 text-2xl font-mono text-center tracking-[0.3em] text-bone-50 placeholder:text-bone-500/30 focus:outline-none focus:border-electric/40 focus:ring-1 focus:ring-electric/20 transition-all"
                  maxLength={7}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={code.replace('-', '').length !== 6}
                className="btn-solid w-full disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Join Room
              </button>
            </form>

            <p className="mt-6 text-center text-bone-400 text-sm">
              Don&apos;t have a code?{' '}
              <Link to="/" className="text-electric hover:underline underline-offset-4">Create a room</Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-bone-500 hover:text-bone-300 text-sm transition-colors">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
