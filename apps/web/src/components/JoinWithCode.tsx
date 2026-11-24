import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function JoinWithCode() {
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

  const handleSubmit = () => {
    const clean = code.replace('-', '');
    if (clean.length === 6) {
      navigate(`/r/${clean}`);
    }
  };

  return (
    <div id="join" className="py-16 px-6 border-y border-white/10 text-center w-full">
      <span className="text-xs font-mono text-text-muted tracking-widest uppercase mb-6 block">Have a room code?</span>
      <div className="max-w-xs mx-auto space-y-4">
        <input
          type="text"
          value={code}
          onChange={handleChange}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="000-000"
          className="w-full bg-bg-surface border border-white/10 rounded-button px-4 py-3 text-2xl font-mono text-center tracking-widest text-text-primary focus:outline-none focus:border-brand-indigo transition-colors"
          maxLength={7}
        />
        <Button className="w-full" disabled={code.replace('-', '').length !== 6} onClick={handleSubmit}>
          Join Room
        </Button>
      </div>
    </div>
  );
}
