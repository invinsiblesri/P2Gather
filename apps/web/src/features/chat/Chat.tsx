import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send } from 'lucide-react';

export function Chat({ roomCode }: { roomCode: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');
    setSocket(s);
    s.emit('room:join', { roomCode, name: 'Listener' });
    s.on('chat:message', (msg: any) => setMessages(prev => [...prev, msg]));
    return () => { s.close(); };
  }, [roomCode]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    socket?.emit('chat:message', { text: input, roomCode });
    setInput('');
  };

  return (
    <div className="glass-strong rounded-glass flex flex-col h-[480px] shadow-glass">
      <div className="px-4 py-3 border-b border-white/[0.04] flex items-center justify-between">
        <h3 className="text-sm font-display font-bold text-text-primary">Chat</h3>
        <span className="text-[10px] font-mono text-text-muted">{messages.length} msg</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {messages.map((m, i) => (
          <div key={i} className="text-sm animate-slide-up" style={{ animationDuration: '0.3s' }}>
            <span className="text-brand-lime font-medium">{m.user}</span>
            <span className="text-text-muted mx-1">&middot;</span>
            <span className="text-text-primary">{m.text}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-text-muted gap-2">
            <span className="text-2xl">💬</span>
            <p className="text-sm">Say hello to the room</p>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-white/[0.04]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            className="flex-1 px-3 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-button text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-brand-lime/30 focus:ring-2 focus:ring-brand-lime/10 transition-all"
            placeholder="Message..."
            maxLength={280}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-2.5 rounded-button bg-brand-lime text-bg-canvas hover:brightness-110 disabled:opacity-30 transition-all"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
