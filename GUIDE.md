# P2Gather — Build & Deploy Guide

P2Gather is a synchronized listening room: create a room, share a 6-character code, and everyone hears the same track at the same moment. No accounts, no installs. The server relays room state only — it never proxies, downloads, or stores audio.

This guide covers local development, the architecture, and deployment to **Vercel** (frontend) and **Render** (backend) on their free tiers.

---

## 1. Project structure

```
p2gather/
├── apps/
│   ├── web/                 # React 18 + Vite + TypeScript + Tailwind + Zustand
│   │   └── src/
│   │       ├── pages/       # LandingPage, RoomPage, JoinPage, PrivacyPage
│   │       ├── components/  # Hero, NavBar, SpecGrid, LiveRoomPreview, FAQ, Footer...
│   │       ├── features/    # search, queue, player, room, chat
│   │       ├── data/providers/  # YouTubeProvider, AudiusProvider
│   │       ├── ui/          # Button, Logo
│   │       └── styles/      # tokens.css, fonts.css
│   └── server/              # Node + Express + Socket.io + zod + helmet + rate-limit
│       └── src/
│           ├── rooms/       # RoomManager (codes, TTL sweeper, host transfer)
│           ├── index.ts     # HTTP + Socket.io handlers
│           └── rooms/roomCode.test.ts
├── packages/shared/         # Track, RoomState, Listener, MusicProvider, Events, zod schemas
├── vercel.json              # Vercel build + SPA rewrites
├── render.yaml              # Render web service definition
├── GUIDE.md                 # this file
└── package.json             # npm workspaces + scripts
```

---

## 2. Local development

### Prerequisites
- Node.js ≥ 18 (LTS)
- npm (v10) — this repo uses npm workspaces (pnpm works too if you have it)

### Install
```bash
npm install
```

### Environment variables
Copy the examples and fill them in:

```bash
# apps/server/.env
PORT=3001
YOUTUBE_API_KEY=your_youtube_data_api_v3_key
FRONTEND_URL=http://localhost:5173

# apps/web/.env
VITE_API_URL=http://localhost:3001
```

> `YOUTUBE_API_KEY` stays on the server only. It is never shipped to the browser bundle, and `.env` is gitignored.

### Run both apps
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend:  http://localhost:3001
- Health:   http://localhost:3001/health

### Build & test
```bash
npm run build   # builds shared -> web -> server
npm test        # runs the vitest suite (room code generator)
```

---

## 3. What is implemented

| Area | Status |
|------|--------|
| Landing page (nav, hero, spec grid, live preview, how-it-works, closer look, join code, FAQ, footer) | ✅ |
| Design tokens, 3 fonts, dark theme, responsive down to 360px | ✅ |
| Custom SVG logo + favicon + Open Graph meta | ✅ |
| Create/join flow, `/join`, `/r/:code`, `/privacy` routes | ✅ |
| YouTube search via Data API v3 (server-side, 5-min cache, rate-limited) | ✅ |
| Audius provider adapter | ✅ |
| Debounced (300ms) search + local queue (dedupe) | ✅ |
| Room manager: 6-char code (no 0/O/1/I/L), 25 listeners, 100 queue, host transfer, idle sweeper | ✅ |
| Socket.io events: create, join, play, pause, seek, next, queue add/remove, chat, heartbeat, presence | ✅ |
| Chat: 280 chars, HTML-stripped, never logged | ✅ |
| Security: helmet, CORS allow-list, rate limits, 10kb JSON cap | ✅ |
| Privacy & attributions page | ✅ |
| Vitest suite for the room code generator | ✅ |

### Known free-tier limitations (by design)
- YouTube can show ads to some listeners; the heartbeat drift-correction window is 1.5s.
- Some videos block embedding (errors 101/150) — the UI should toast and skip.
- Phone browsers may pause playback on screen lock; a wake lock is requested where supported.
- Render free tier sleeps after 15 min idle; `/health` wakes it (cold start up to ~30s).
- Active rooms live in memory and are lost on server restart.

---

## 4. Deploy the frontend to Vercel

1. Push the repo to GitHub (already at `https://github.com/invinsiblesri/P2Gather`).
2. In Vercel: **New Project → Import** the repo.
3. **Root Directory**: leave empty (repo root). `vercel.json` handles everything:
   - Install: `npm install`
   - Build: `npm run build -w @p2gather/shared && npm run build -w @p2gather/web`
   - Output: `apps/web/dist`
   - SPA rewrites to `index.html`
4. **Environment variable** (Project → Settings → Environment Variables):
   - `VITE_API_URL = https://<your-render-service>.onrender.com`
5. Deploy. Vercel gives you `https://<project>.vercel.app`.

> Note: the frontend calls `/api/*` relative to its own origin in local dev (Vite proxy). In production it calls the Render URL via `VITE_API_URL`. If you prefer to keep calls relative, add a Vercel rewrite to the Render URL instead.

---

## 5. Deploy the backend to Render

1. Render dashboard: **New → Web Service**.
2. Connect the same GitHub repo.
3. **Root Directory**: repo root.
4. **Build Command**:
   ```bash
   npm install && npm run build -w @p2gather/shared && npm run build -w @p2gather/server
   ```
5. **Start Command**:
   ```bash
   node apps/server/dist/index.js
   ```
6. **Health Check Path**: `/health`
7. **Environment variables**:
   - `YOUTUBE_API_KEY` = your key (secret)
   - `FRONTEND_URL` = `https://<your-vercel-app>.vercel.app`
   - `NODE_VERSION` = `20.11.0`
8. Deploy. Render gives you `https://<service>.onrender.com`.

> `render.yaml` in the repo can also be used via Render Blueprints; it defines the same build/start commands and marks the secrets as `sync: false` so you enter them in the dashboard.

### CORS
The server locks CORS to `FRONTEND_URL`. Set it to your exact Vercel origin (no trailing slash). During local dev it falls back to `*` only if `FRONTEND_URL` is unset.

---

## 6. Verify the deployment

```bash
# Health (wakes a sleeping free instance)
curl https://<your-render>.onrender.com/health
# → {"status":"ok","timestamp":"..."}

# YouTube search through the server
curl "https://<your-render>.onrender.com/api/search?q=daft%20punk"
# → JSON array of YouTube search results
```

Open the Vercel URL and check:
- Landing page loads with no horizontal scroll at 360px.
- "Join with a code" navigates to `/join` and formats as `ABC-123`.
- `/privacy` renders.
- Creating a room and joining from a second browser keeps play/pause/seek in sync.

---

## 7. Security notes

- Provider keys live only in backend environment variables.
- Chat is sanitized (HTML stripped) and never logged.
- Limits: 25 listeners/room, 100 queue items, 280-char messages.
- Rate limits: 30 searches/min, 100 API requests/min.
- `.env` files are gitignored; `.env.example` files are committed.

---

## 8. Roadmap / next improvements

- Replace the mock track in the room UI with the real YouTube IFrame Player and Audius `<audio>` engine.
- Add clock-offset ping/pong rounds and client-side drift correction (server timestamps are already emitted).
- Add the autoplay-unlock "Tap to Join & Sync Audio" overlay.
- Add presence avatars from initials on deterministic gradients.
- Add the idle-room cold-start screen and reconnection backoff UI.

---

*Built as a learning project. P2Gather is independent and not affiliated with YouTube, Google, or Audius. YouTube is a trademark of Google LLC.*
