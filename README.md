# A.one Brain Construction

Public website and admin CRM for **A.one Brain Construction Pvt. Ltd.** (Pathari-Shanischare-1, Morang, Nepal).

| Part | Stack | Location |
|---|---|---|
| Frontend | React 19, Vite, Redux Toolkit, Tailwind CSS 4 | [`frontend/`](./frontend) |
| API | Express 5, Mongoose, Zod, JWT | [`backend/`](./backend) |
| Database | MongoDB Atlas | external |
| Media | Cloudinary | external |
| Cache | Redis (optional) | external |

## Requirements

- Node.js 20+ (22 recommended)
- MongoDB Atlas connection string
- Cloudinary account (for media uploads)
- Redis (optional — the API runs without it, caching disabled)

## Local development

**1. Backend**

```sh
cd backend
cp .env.example .env      # fill in the values
npm install
npm run dev               # http://localhost:5000
```

`ADMIN_EMAIL` / `ADMIN_PASSWORD` create the first admin account on startup. `JWT_SECRET` must be at least 32 characters. See [`backend/README.md`](./backend/README.md) for every variable and endpoint.

**2. Frontend**

```sh
cd frontend
cp .env.example .env
npm install
npm run dev               # http://localhost:5173
```

**3. Redis (optional)**

```sh
docker run -d --name aone-redis -p 6379:6379 redis:7-alpine
```

Then set `REDIS_URL=redis://localhost:6379` in `backend/.env`.

## Checks

```sh
cd backend  && npm test        # 11 API tests
cd frontend && npm run lint    # oxlint
cd frontend && npm run build   # production build
```

## Deployment

The frontend and API deploy separately: Vercel for the static frontend, and any Node/Docker host (Render, Railway, Fly.io) for the API. The API cannot be a purely static host because it keeps a MongoDB connection and optionally a Redis connection.

### Frontend → Vercel

1. Import the repository (or the `A.one-construction` repository) in Vercel.
2. Root Directory: `frontend`. Framework: Vite (auto-detected via `frontend/vercel.json`).
3. Environment variable: `VITE_API_URL=https://<api-host>/api`.
4. Deploy.

### Backend → Render (blueprint included)

[`render.yaml`](./render.yaml) is ready to use: **New → Blueprint**, pick this repository, then fill in the secret values (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, Cloudinary keys, optional `REDIS_URL`, and `CLIENT_ORIGIN`).

### Backend → Railway / Fly.io / any Docker host

A production [`backend/Dockerfile`](./backend/Dockerfile) is included:

```sh
docker build -t aone-api ./backend
docker run -p 5000:5000 --env-file backend/.env aone-api
```

On Railway: create a service from the repo, set **Root Directory** to `backend`, and add the environment variables. Fly.io: `fly launch` inside `backend/`.

### Required production variables

| Variable | Notes |
|---|---|
| `NODE_ENV` | `production` |
| `CLIENT_ORIGIN` | Exact deployed frontend origin, e.g. `https://aone.vercel.app`. Comma-separate multiple origins. **Must be set — it is the CORS allowlist.** |
| `TRUST_PROXY` | `1` when behind Render/Railway/Fly/Vercel (default `1`) |
| `MONGODB_URI` | Atlas connection string (allow the host's IP, or `0.0.0.0/0`) |
| `JWT_SECRET` | 32+ random characters |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First-login admin credentials (password 12+ characters) |
| `CLOUDINARY_*` | Only needed for media uploads |
| `REDIS_URL` | Optional; use a `rediss://` URL for hosted Redis |

### Post-deploy checklist

- `GET https://<api-host>/api/health` → `{"status":"ok"}`
- `GET https://<api-host>/api/ready` → `{"status":"ready","database":"connected"}`
- `GET https://<api-host>/api/settings` → JSON settings
- Log in at `https://<frontend-host>/admin/login`
- Upload an image in the admin panel (verifies Cloudinary)
- Submit the contact form (verifies CORS + database write)

## Notes

- The frontend is also a standalone git repository (`.git` inside `frontend/`) while the root repository tracks the same files. Keep that in mind when committing — changes can end up staged in both repositories.
- `frontend/.env` and `backend/.env` are ignored and must never be committed.
