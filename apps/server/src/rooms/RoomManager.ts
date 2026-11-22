import { RoomState, Track, Listener } from '@p2gather/shared';

// Room code alphabet: no 0/O, 1/I/L
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const CODE_LENGTH = 6;
const MAX_LISTENERS = 25;
const MAX_QUEUE = 100;
const IDLE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

interface PingRound {
  server: number;
  client: number;
  rtt: number;
}

export function generateCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `${code.slice(0, 3)}-${code.slice(3)}`;
}

function estimateClockOffset(rounds: PingRound[]): number {
  // Simple median of (serverTime - clientTime - rtt/2) over multiple pings
  const offsets = rounds.map(r => r.server - r.client - r.rtt / 2);
  offsets.sort((a, b) => a - b);
  return offsets[Math.floor(offsets.length / 2)];
}

export class RoomManager {
  private rooms = new Map<string, RoomState>();
  private pingHistory = new Map<string, PingRound[][]>();

  createRoom(hostId: string): RoomState {
    let code = generateCode();
    while (this.rooms.has(code)) code = generateCode();

    const now = Date.now();
    const room: RoomState = {
      roomCode: code,
      hostId,
      listeners: {},
      currentTrack: null,
      isPlaying: false,
      positionSec: 0,
      updatedAtServerMs: now,
      queue: [],
      createdAt: now,
      lastActivityAt: now,
    };
    this.rooms.set(code, room);
    return room;
  }

  joinRoom(roomCode: string, listenerId: string, listenerName: string): RoomState | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;
    if (Object.keys(room.listeners).length >= MAX_LISTENERS) return null;

    room.listeners[listenerId] = {
      id: listenerId,
      name: listenerName,
      joinedAt: Date.now(),
    };
    room.lastActivityAt = Date.now();
    return room;
  }

  leaveRoom(roomCode: string, listenerId: string): RoomState | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;
    delete room.listeners[listenerId];
    room.lastActivityAt = Date.now();

    // Host transfer: promote longest-connected listener
    if (room.hostId === listenerId) {
      const remaining = Object.values(room.listeners);
      if (remaining.length > 0) {
        remaining.sort((a, b) => a.joinedAt - b.joinedAt);
        room.hostId = remaining[0].id;
      }
    }
    return room;
  }

  getRoom(roomCode: string): RoomState | undefined {
    return this.rooms.get(roomCode);
  }

  setPlayerState(roomCode: string, patch: Partial<RoomState>): RoomState | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;
    Object.assign(room, patch, { updatedAtServerMs: Date.now(), lastActivityAt: Date.now() });
    return room;
  }

  addToQueue(roomCode: string, track: Track): RoomState | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;
    if (room.queue.length >= MAX_QUEUE) return null;
    
    const exists = room.queue.some(t => t.id === track.id);
    if (!exists) {
      room.queue.push(track);
      room.lastActivityAt = Date.now();
    }
    return room;
  }

  removeFromQueue(roomCode: string, trackId: string): RoomState | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;
    room.queue = room.queue.filter(t => t.id === trackId);
    room.lastActivityAt = Date.now();
    return room;
  }

  cleanupIdle(): void {
    const now = Date.now();
    for (const [code, room] of this.rooms.entries()) {
      if (now - room.lastActivityAt > IDLE_TTL_MS) {
        this.rooms.delete(code);
      }
    }
  }
}

// Singleton instance
export const roomManager = new RoomManager();

// Start idle sweeper
setInterval(() => roomManager.cleanupIdle(), 60 * 60 * 1000);