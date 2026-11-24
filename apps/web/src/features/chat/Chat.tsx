import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send } from 'lucide-react';

export function Chat({ roomCode }: { roomCode: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');
    setSocket(newSocket);
    newSocket.emit('room:join', { roomCode, name: 'Listener' });
    newSocket.on('chat:message', (msg: any) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => { newSocket.close(); };
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
    <div className="bg-bg-surface/60 backdrop-blur-sm border border-white/10 rounded-card flex flex-col h-[480px]">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Chat</h3>
        <span className="text-[10px] font-mono text-text-muted">{messages.length} messages</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <span className="text-brand-indigo font-medium">{m.user}: </span>
            <span className="text-text-primary">{m.text}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-text-muted">
            <p className="text-sm">Say hello to the room 👋</p>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            className="flex-1 px-3 py-2 border border-white/10 rounded-lg bg-bg-canvas text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent transition-all"
            placeholder="Message (max 280 chars)"
            maxLength={280}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-2 rounded-lg bg-brand-indigo text-white hover:bg-[#4F46E5] disabled:opacity-40 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
