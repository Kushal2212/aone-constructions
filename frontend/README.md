# A.one Brain Construction — Frontend

React 19 + Vite single-page app for the public website and the admin panel. Data comes from the Express API in [`../backend`](../backend).

## Local development

```sh
cp .env.example .env
npm install
npm run dev
```

`.env` values:

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | API base URL including `/api`. Use `/api` to go through the Vite dev proxy, or the full deployed API URL. |
| `VITE_API_PROXY_TARGET` | Only used by the dev proxy; defaults to `http://localhost:5000`. |

The dev server proxies `/api` to the backend (see `vite.config.js`), so `VITE_API_URL=/api` works without CORS configuration locally.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server on http://localhost:5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

## Deploy to Vercel

1. Import the repository in Vercel.
2. Set **Root Directory** to `frontend` (skip if this repo only contains the frontend).
3. Framework preset: **Vite**. Build command `npm run build`, output `dist` (already set in `vercel.json`).
4. Add environment variable `VITE_API_URL=https://<your-api-host>/api`.
5. Deploy, then add the resulting domain to the backend's `CLIENT_ORIGIN` allowlist.

`vercel.json` also adds SPA rewrites (so `/admin/projects` works on refresh) and long-lived caching for hashed assets.
