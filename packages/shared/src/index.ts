import { z } from 'zod';

export const TrackSchema = z.object({
  id: z.string(),
  source: z.enum(['youtube', 'audius']),
  title: z.string(),
  artist: z.string(),
  artworkUrl: z.string().optional(),
  durationSeconds: z.number().optional(),
  attributionUrl: z.string().optional(),
});

export type Track = z.infer<typeof TrackSchema>;

export const ListenerSchema = z.object({
  id: z.string(),
  name: z.string(),
  joinedAt: z.number(),
});

export type Listener = z.infer<typeof ListenerSchema>;

export const RoomStateSchema = z.object({
  roomCode: z.string(),
  hostId: z.string(),
  listeners: z.record(z.string(), ListenerSchema),
  currentTrack: TrackSchema.nullable(),
  isPlaying: z.boolean(),
  positionSec: z.number(),
  updatedAtServerMs: z.number(),
  queue: z.array(TrackSchema),
  createdAt: z.number(),
  lastActivityAt: z.number(),
});

export type RoomState = z.infer<typeof RoomStateSchema>;

export const Events = {
  ROOM_CREATE: 'room:create',
  ROOM_JOIN: 'room:join',
  ROOM_STATE: 'room:state',
  PLAYER_PLAY: 'player:play',
  PLAYER_PAUSE: 'player:pause',
  PLAYER_SEEK: 'player:seek',
  PLAYER_NEXT: 'player:next',
  ROOM_HEARTBEAT: 'room:heartbeat',
  QUEUE_ADD: 'queue:add',
  QUEUE_REMOVE: 'queue:remove',
  CHAT_MESSAGE: 'chat:message',
  PRESENCE_UPDATE: 'presence:update',
  ERROR: 'error',
} as const;
