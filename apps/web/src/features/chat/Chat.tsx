import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export function Chat({ roomCode }: { roomCode: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('room:join', { roomCode, name: 'Listener' });

    newSocket.on('chat:message', (msg: any) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      newSocket.close();
    };
  }, [roomCode]);

  const send = () => {
    if (!input.trim()) return;
    socket?.emit('chat:message', { text: input, roomCode });
    setInput('');
  };

  return (
    <div className="bg-bg-surface border border-white/10 rounded-lg h-96 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-semibold text-text-primary">Chat</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <span className="text-brand-indigo font-medium">{m.user}: </span>
            <span className="text-text-primary">{m.text}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-text-muted text-sm">Say hello to the room.</p>
        )}
      </div>
      <div className="p-4 border-t border-white/10">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          className="w-full px-4 py-2 border border-white/10 rounded bg-bg-canvas focus:outline-none focus:ring-2 focus:ring-brand-indigo text-text-primary"
          placeholder="Message (max 280 chars)"
          maxLength={280}
        />
      </div>
    </div>
  );
}