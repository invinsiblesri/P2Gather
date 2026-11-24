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
    <div className="spot border border-edge rounded-spot overflow-hidden backdrop-blur-sm bg-ink-950/60 flex flex-col h-[480px]">
      <div className="relative z-10 px-5 py-3.5 border-b border-edge flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-bone-50">Chat</h3>
        <span className="font-mono text-[10px] text-bone-500 tabnum">{messages.length} msg</span>
      </div>
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm animate-swap-in">
            <span className="text-electric font-medium font-mono text-[11px]">{m.user}</span>
            <span className="text-bone-500 mx-1.5">&middot;</span>
            <span className="text-bone-200">{m.text}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-bone-500 gap-2">
            <span className="text-2xl">&#128172;</span>
            <p className="text-sm">Say hello to the room</p>
          </div>
        )}
      </div>
      <div className="relative z-10 p-3 border-t border-edge">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            className="flex-1 px-3 py-2.5 bg-ink-900/60 border border-edge text-sm text-bone-50 placeholder:text-bone-500/40 focus:outline-none focus:border-electric/40 focus:ring-1 focus:ring-electric/20 transition-all"
            placeholder="Message (max 280)"
            maxLength={280}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="flex h-10 w-10 items-center justify-center bg-bone-50 text-ink-950 disabled:opacity-30 transition-colors hover:bg-white"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
