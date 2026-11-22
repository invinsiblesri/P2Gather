import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function JoinPage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (val.length > 3) {
      val = val.slice(0, 3) + '-' + val.slice(3, 6);
    } else {
      val = val.slice(0, 6);
    }
    setCode(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.replace('-', '');
    if (cleanCode.length === 6) {
      navigate(`/r/${cleanCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-bg-canvas text-text-primary flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-bg-surface border border-white/10 rounded-lg p-12">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Join a Room</h1>
          <p className="text-text-secondary text-sm">Enter the 6-character room code</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="room-code" className="block text-sm font-medium text-text-secondary mb-4">
              Room Code
            </label>
            <input
              id="room-code"
              type="text"
              value={code}
              onChange={handleChange}
              placeholder="000-000"
              className="w-full bg-bg-canvas border border-white/10 rounded-button px-6 py-4 text-2xl font-mono text-center tracking-widest text-text-primary focus:outline-none focus:border-brand-indigo transition-colors"
              maxLength={7}
              autoFocus
            />
          </div>

          <Button type="submit" className="w-full" disabled={code.replace('-', '').length !== 6}>
            Join Room
          </Button>
        </form>

        <p className="mt-8 text-center text-text-muted text-sm">
          Don&apos;t have a code?{' '}
          <a href="/" className="text-brand-mint hover:underline">
            Create a room
          </a>
        </p>
      </div>
    </div>
  );
}