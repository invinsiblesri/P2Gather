import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import axios from 'axios';
import { roomManager } from './rooms/RoomManager.js';
import { RoomState } from '@p2gather/shared';

dotenv.config();

const app = express();
// Render (and most hosts) sit behind a proxy; this makes rate-limit and
// secure-cookie handling read the real client IP from X-Forwarded-For.
app.set('trust proxy', 1);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
  },
});

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '10kb' }));

// Rate limiters
const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many search requests. Please try again later.' },
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Please slow down.' },
});

app.use('/api', generalLimiter);
app.use('/api/search', searchLimiter);

// YouTube Search API (with in-memory cache)
const searchCache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

app.get('/api/search', async (req, res) => {
  const q = req.query.q as string;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  // Check cache
  const cacheKey = q.toLowerCase().trim();
  const cached = searchCache.get(cacheKey);
  if (cached && cached.expiry > Date.now()) {
    return res.json(cached.data);
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q,
        key: process.env.YOUTUBE_API_KEY,
        type: 'video',
        maxResults: 10,
      },
      timeout: 10000,
    });

    searchCache.set(cacheKey, {
      data: response.data.items,
      expiry: Date.now() + CACHE_TTL_MS,
    });

    res.json(response.data.items);
  } catch (error: any) {
    const reason = error?.response?.data?.error?.errors?.[0]?.reason;
    const detail = error?.response?.data?.error?.message;
    console.error('YouTube API Error:', error?.message, '| reason:', reason, '| detail:', detail);
    res.status(500).json({ error: 'Failed to search YouTube', reason, detail });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io handlers
io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  // Room Join
  socket.on('room:join', (data: { roomCode: string; name: string }) => {
    const { roomCode, name } = data;
    const listenerId = socket.id;

    const room = roomManager.joinRoom(roomCode, listenerId, name);
    if (!room) {
      socket.emit('error', { message: 'Room not found or full' });
      return;
    }

    socket.join(roomCode);
    io.to(roomCode).emit('room:state', room);
    io.to(roomCode).emit('presence:update', { listeners: room.listeners });
  });

  // Room Create
  socket.on('room:create', (data: { name: string }) => {
    const room = roomManager.createRoom(socket.id);
    socket.join(room.roomCode);
    socket.emit('room:state', room);
    socket.emit('presence:update', { listeners: room.listeners });
  });

  // Player controls (host only)
  const playerEvents = ['player:play', 'player:pause', 'player:seek', 'player:next'] as const;
  playerEvents.forEach(event => {
    socket.on(event, (payload: any) => {
      const room = Array.from(socket.rooms).find(r => r !== socket.id);
      if (!room) return;

      const roomState = roomManager.getRoom(room);
      if (!roomState || roomState.hostId !== socket.id) return;

      const update: Partial<RoomState> = { updatedAtServerMs: Date.now() };

      if (event === 'player:play') {
        update.isPlaying = true;
      } else if (event === 'player:pause') {
        update.isPlaying = false;
      } else if (event === 'player:seek') {
        update.positionSec = payload.positionSec;
      } else if (event === 'player:next') {
        const nextTrack = roomState.queue.shift() || null;
        update.currentTrack = nextTrack;
        update.positionSec = 0;
      }

      const updatedRoom = roomManager.setPlayerState(room, update);
      if (updatedRoom) {
        io.to(room).emit('room:state', updatedRoom);
      }
    });
  });

  // Queue add (anyone)
  socket.on('queue:add', (track: any) => {
    const room = Array.from(socket.rooms).find(r => r !== socket.id);
    if (!room) return;

    const result = roomManager.addToQueue(room, track);
    if (result) {
      io.to(room).emit('room:state', result);
    }
  });

  // Queue remove (host only)
  socket.on('queue:remove', (trackId: string) => {
    const room = Array.from(socket.rooms).find(r => r !== socket.id);
    if (!room) return;

    const roomState = roomManager.getRoom(room);
    if (!roomState || roomState.hostId !== socket.id) return;

    const result = roomManager.removeFromQueue(room, trackId);
    if (result) {
      io.to(room).emit('room:state', result);
    }
  });

  // Chat message (sanitized, rate-limited by length)
  socket.on('chat:message', (data: { text: string; roomCode: string }) => {
    const { text, roomCode } = data;
    if (typeof text !== 'string' || text.length > 280) return;

    const room = roomManager.getRoom(roomCode);
    if (!room || !room.listeners[socket.id]) return;

    // Sanitize: strip HTML tags to prevent XSS
    const sanitized = text.replace(/<[^>]*>/g, '');

    io.to(roomCode).emit('chat:message', {
      user: room.listeners[socket.id].name,
      text: sanitized,
      timestamp: Date.now(),
    });
  });

  // Heartbeat for clock sync (host only)
  socket.on('room:heartbeat', () => {
    const room = Array.from(socket.rooms).find(r => r !== socket.id);
    if (!room) return;

    const roomState = roomManager.getRoom(room);
    if (!roomState || roomState.hostId !== socket.id) return;

    roomManager.setPlayerState(room, { updatedAtServerMs: Date.now() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const roomCode of socket.rooms) {
      if (roomCode === socket.id) continue;
      const room = roomManager.leaveRoom(roomCode, socket.id);
      if (room) {
        io.to(roomCode).emit('room:state', room);
        io.to(roomCode).emit('presence:update', { listeners: room.listeners });
      }
    }
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});