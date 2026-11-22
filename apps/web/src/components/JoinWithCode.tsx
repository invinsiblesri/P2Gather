import { useState } from 'react';
import { Button } from '../ui/Button';

export function JoinWithCode() {
  const [code, setCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (val.length > 3) {
      val = val.slice(0, 3) + '-' + val.slice(3, 6);
    } else {
        val = val.slice(0, 6);
    }
    setCode(val);
  };

  return (
    <div id="join" className="py-32 px-6 border-y border-white/10 text-center w-full">
       <span className="text-xs font-mono text-text-muted tracking-widest uppercase mb-16 block">Have a room code?</span>
       <div className="max-w-xs mx-auto space-y-16">
         <input 
           type="text" 
           value={code}
           onChange={handleChange}
           placeholder="000-000"
           className="w-full bg-bg-surface border border-white/10 rounded-button px-16 py-12 text-2xl font-mono text-center tracking-widest text-text-primary focus:outline-none focus:border-brand-indigo transition-colors"
           maxLength={7}
         />
         <Button className="w-full" disabled={code.replace('-', '').length !== 6}>Join Room</Button>
       </div>
    </div>
  );
}
