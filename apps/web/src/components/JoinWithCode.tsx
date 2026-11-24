import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function JoinWithCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

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
    <div id="join" className="py-16 px-6 text-center w-full">
      <div className="max-w-sm mx-auto glass rounded-glass p-8">
        <span className="text-xs font-mono text-text-muted tracking-widest uppercase mb-2 block">Have a room code?</span>
        <h3 className="text-xl font-display font-bold text-text-primary mb-6">Join a Room</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={handleChange}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="000-000"
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-button px-4 py-3.5 text-2xl font-mono text-center tracking-[0.3em] text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-brand-lime/40 focus:ring-2 focus:ring-brand-lime/10 transition-all"
            maxLength={7}
          />
          <Button className="w-full" disabled={code.replace('-', '').length !== 6} onClick={handleSubmit}>
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
}
