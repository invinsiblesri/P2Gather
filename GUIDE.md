# P2Gather — Build & Deploy Guide

This guide walks you through building the P2Gather application locally, running the dev servers, and deploying to **Vercel** (frontend) and **Render** (backend) on their free tiers.

---

## 1️⃣ Local Development

### 1.1 Prerequisites
- **Node.js** ≥ 18.x (LTS)
- **npm** (v10) or **pnpm** (if you prefer; a `pnpm` binary may not be available on Windows, so `npm` is used here)
- **Git**
- **GitHub CLI** (`gh`) – optional, only needed for repo creation/pushing

### 1.2 Install dependencies
```bash
# From the project root (p2gather/)
npm install
```
> The first run will install all workspace packages (`@p2gather/web`, `@p2gather/server`, `@p2gather/shared`). Expect a few seconds; you'll see some deprecation warnings that are safe to ignore.

### 1.3 Start dev servers
```bash
npm run dev
```
- **What happens**: `concurrently` launches **Vite** (frontend on `http://localhost:5173`) and **nodemon** + Express + Socket.io (backend on `http://localhost:3001`) simultaneously.
- **Verify**: Open `http://localhost:5173` in a browser. You should see the P2Gather landing page.
- **Health check**: The page automatically calls `/api/health`. Open the browser console → you should see JSON `{status:"ok",timestamp:"2026-…"}`. Or manually:
  ```bash
  curl http://localhost:3001/health
  ```

### 1.4 Environment variables
Create `.env` files (they’re already present as examples):

- **`apps/server/.env.example`** – `PORT`, `YOUTUBE_API_KEY`, `FRONTEND_URL`
- **`apps/web/.env.example`** – `VITE_API_URL`

Copy each to the real `.env` file and fill in the values (especially `YOUTUBE_API_KEY` – **never commit this to the repo**; it’s listed in `.gitignore`).

---

## 2️⃣ Phase Overview (from the Prompt Pack)

| Phase | Goal | Rough Scope |
|------|------|-------------|
| **Phase 0** | Scaffold monorepo, TypeScript, pnpm workspaces, Tailwind, fonts, `.env.example`, health route, shared schemas | ✅ Done |
| **Phase 1** | Static UI shell (landing page, room UI, fake data) | Next |
| **Phase 2** | YouTube + Audio adapters, search, queue, autoplay overlay |
| **Phase 3** | Real‑time rooms (code generator, socket handlers, drift correction) |
| **Phase 4** | Chat, avatars, invite links, wake lock |
| **Phase 5** | Production deploy, hardening, load testing |

You can continue by **pasting the next Phase prompt** after the current one, and I’ll generate the code chunk, explain it, and give you a “try on your own” task.

---

## 3️⃣ Deploying to Vercel (frontend)

1. **Push code to GitHub** (see Section 4).
2. In the Vercel dashboard:
   - **New Project** → *Import Repository* → select the GitHub repo you just created.
   - **Framework Preset**: *Vite* (auto‑detected).
   - **Root Directory**: leave **empty** (Vercel will automatically find the `apps/web` Vite config inside the monorepo).
   - **Build Command**: `npm run build` (taken from the root `package.json`).
   - **Output Directory**: leave blank (Vercel infers it from the Vite build).
3. **Add Environment Variables** (Project → Settings → Environment Variables):
   - `VITE_API_URL=https://<your‑render‑app>.onrender.com/api`
4. Click **Deploy**. Vercel will run the build script, output the static assets, and give you a URL like `https://p2gather.vercel.app`.

### 3.1 Vercel “Cold‑start” note
Render’s free tier puts the backend to sleep after 15 min of inactivity. The `/health` endpoint will quickly “wake” it; the pack mentions a screen that can show “Waking the server… this can take up to 30 seconds on free hosting”. The landing page already displays a health‑status indicator that reflects this.

---

## 4️⃣ Deploying to Render (backend)

1. **Create a new Web Service** on Render:
   - **GitHub** → select the same repo.
   - **Environment**: *Node*.
   - **Build Command**: `npm ci` (installs exactly what’s in `package-lock.json`/`npm shrinkwrap`).
   - **Start Command**: `npm run dev` **or** `node dist/index.js` (if you prefer a plain start script).
2. **Add Environment Variables** under “Environment” → “Add Variable”:
   - `PORT=10000` (Render assigns this port automatically; the Express server reads `process.env.PORT || 3001` so it will work either way).
   - `YOUTUBE_API_KEY=your_youtube_api_key_here` (keep secret – never commit).
   - `FRONTEND_URL=https://<your‑vercel‑app>.vercel.app` (used to lock CORS).
3. **CORS hardening** – In `apps/server/src/index.ts` (or edit at runtime) set the origin to the exact Vercel URL:

   ```ts
   import cors from 'cors';
   app.use(
     cors({
       origin: process.env.FRONTEND_URL, // e.g. "https://p2gather.vercel.app"
     })
   );
   ```
4. **Deploy**. Render will give you a URL like `https://p2gather-abc123.onrender.com`.

### 4.1 Render “Cold‑start” note
The free tier sleeps after 15 min. The `/health` endpoint will auto‑wake the service. The landing page’s health indicator will show the delayed response on first access after a sleep period.

---

## 5️⃣ Verifying the Deploy

Once both services are live, run these quick checks:

```bash
# Health check (from anywhere)
curl https://your-vercel-app.vercel.app/api/health
# → {"status":"ok","timestamp":"2026-…"}

# Landing page
open https://your-vercel-app.vercel.app
# → you should see the P2Gather UI, no horizontal scroll at 360 px,
#   and a Lighthouse accessibility score ≥ 95.
```

If the JSON payload appears and the page loads without horizontal scroll, you’re ready to move on to the next phase.

---

## 6️⃣ Next Steps

- Continue with **Phase 1** (static UI shell) by pasting the next prompt from the pack.
- When you’re ready to **deploy**, follow Sections 3 & 4 above.
- If you hit any roadblocks (CORS errors, missing env vars, build failures), just let me know the exact error message and I’ll help troubleshoot.

---

*Happy building! 🎧🚀*