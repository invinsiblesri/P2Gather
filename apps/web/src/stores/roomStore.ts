import { create } from 'zustand';
import { type Socket } from 'socket.io-client';
import { Listener } from '@p2gather/shared';
import { io } from 'socket.io-client';

interface RoomState {
  roomCode: string | null;
  isHost: boolean;
  listeners: Record<string, Listener>;
  socket: Socket | null;

  createRoom: (name: string) => void;
  joinRoom: (code: string, name: string) => void;
  leaveRoom: () => void;
  setSocket: (socket: Socket) => void;
}

const API_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) ||
  'http://localhost:3001';

function connectSocket(): Socket {
  return io(API_URL, { autoConnect: true });
}

export const useRoomStore = create<RoomState>()((set, get) => ({
  roomCode: null,
  isHost: false,
  listeners: {},
  socket: null,

  createRoom: (name) => {
    const existing = get().socket;
    const socket = existing ?? connectSocket();

    socket.emit('room:create', { name });

    socket.on('room:state', (room: any) => {
      set({
        roomCode: room.roomCode,
        isHost: room.hostId === socket.id,
        listeners: room.listeners ?? {},
      });
    });

    if (!existing) set({ socket });
  },

  joinRoom: (code, name) => {
    const existing = get().socket;
    const socket = existing ?? connectSocket();

    socket.emit('room:join', { roomCode: code, name });

    socket.on('room:state', (room: any) => {
      set({
        roomCode: room.roomCode,
        isHost: room.hostId === socket.id,
        listeners: room.listeners ?? {},
      });
    });

    if (!existing) set({ socket });
  },

  leaveRoom: () => {
    const { socket } = get();
    if (socket) {
      socket.removeAllListeners();
      socket.close();
    }
    set({
      roomCode: null,
      isHost: false,
      listeners: {},
      socket: null,
    });
  },

  setSocket: (socket) => set({ socket }),
}));
