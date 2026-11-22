# P2Gather

Synchronized listening rooms. **Create a room. Share the code. Press play together.**

One person creates a private room and shares a 6-character code (like `84K-2QP`) or an invite link. Everyone who joins hears the same track at the same moment on their own device. No accounts. Rooms are temporary. The server relays room state only — it never proxies, downloads, or stores audio.

## Live

- **Frontend (Vercel):** https://p2gather.vercel.app
- **Backend (Render):** https://p2gather-server.onrender.com
- **Health check:** https://p2gather-server.onrender.com/health

Both services auto-deploy on every push to `main`.

## Stack

- **Frontend:** React 18, Vite, TypeScript (strict), Tailwind, Zustand — `apps/web`
- **Backend:** Node, Express, Socket.io, zod, helmet — `apps/server`
- **Shared:** types, zod schemas, event names, `MusicProvider` — `packages/shared`
- **Music:** YouTube Data API v3 (server search) + YouTube IFrame (playback), and Audius REST

## Quick start

```bash
npm install
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:3001/health

Copy `apps/server/.env.example` → `apps/server/.env` and add your `YOUTUBE_API_KEY` (kept server-side only).

## Scripts

```bash
npm run dev          # web + server together
npm run build        # shared -> web -> server
npm test             # room-code generator tests
```

## Deploy

- **Frontend → Vercel:** `vercel.json` is configured (builds shared + web, outputs `apps/web/dist`, SPA rewrites). Set `VITE_API_URL` to the Render URL.
- **Backend → Render:** use `render.yaml` or the commands in `GUIDE.md`. Set `YOUTUBE_API_KEY` and `FRONTEND_URL`.

See **[GUIDE.md](./GUIDE.md)** for the full step-by-step deployment guide.

## Status

MVP scaffolded through Phase 5 hardening: landing page, join/create flow, YouTube search with caching + rate limits, room manager with host transfer and idle expiry, Socket.io room events, chat, privacy/attributions page, and deployment configs. The real audio engines (YouTube IFrame / Audius `<audio>`) and full client drift correction are the next implementation step — see the roadmap in `GUIDE.md`.

## Legal

P2Gather is an independent project and is not affiliated with YouTube, Google, or Audius. YouTube is a trademark of Google LLC. Music remains the property of the respective artists.
