import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="relative min-h-screen text-text-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass-strong rounded-glass p-8 shadow-glass-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-2xl font-display font-bold text-text-primary mb-1">Join a Room</h1>
            <p className="text-text-secondary text-sm">Enter the 6-character room code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="room-code" className="block text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
                Room Code
              </label>
              <input
                id="room-code"
                type="text"
                value={code}
                onChange={handleChange}
                placeholder="000-000"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-button px-4 py-4 text-2xl font-mono text-center tracking-[0.3em] text-text-primary placeholder:text-text-muted/30 focus:outline-none focus:border-brand-lime/40 focus:ring-2 focus:ring-brand-lime/10 transition-all"
                maxLength={7}
                autoFocus
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={code.replace('-', '').length !== 6}>
              Join Room
            </Button>
          </form>

          <p className="mt-6 text-center text-text-muted text-sm">
            Don&apos;t have a code?{' '}
            <Link to="/" className="text-brand-lime hover:underline">Create a room</Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-secondary text-sm transition-colors">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
