# A.one Construction API

Express API for the A.one Brain Construction website and admin panel. MongoDB Atlas stores application records, Cloudinary stores uploaded photos and videos, and Redis caches public read responses when configured.

## Requirements

- Node.js 20+
- MongoDB Atlas connection string
- Cloudinary account credentials for media uploads
- Redis URL for response caching (optional for local development)

## Run locally

1. Copy `.env.example` to `.env` and set your MongoDB Atlas URI, a random JWT secret of at least 32 characters, and an administrator email/password. The initial admin password must be at least 12 characters.
2. Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` for media uploads. Set `REDIS_URL` to enable caching; without it, the API reports that caching is disabled and continues without cache.
3. Install and start the API:

   ```sh
   npm install
   npm run dev
   ```

The API listens on port `5000` by default. `CLIENT_ORIGIN` is a comma-separated allowlist and defaults to `http://localhost:5173`. On the first run, the configured administrator is created; a later start will not reset that account's password. Keep `.env` private.

Quote `ADMIN_PASSWORD` in `.env` if it contains `#` (or spaces), so dotenv reads the full value rather than treating part of it as a comment.

The configured `ADMIN_EMAIL` and `ADMIN_PASSWORD` can also authenticate the matching admin account directly if its stored password hash is stale. Restart the API after changing these values so it loads the updated credentials.

Login supports existing administrator records that store the bcrypt hash as either `passwordHash` or the legacy `hashedPassword` field.

To explicitly apply the `ADMIN_PASSWORD` from `backend/.env` to the existing account matching `ADMIN_EMAIL`, run `npm run reset-admin-password` from the `backend` directory, then sign in again. This command changes only that account's password and fails if the account does not exist; restarting the API does not change admin credentials.

## API conventions

- JSON APIs use the `/api` prefix. A successful collection response is `{ "items": [...], "pagination": { "page": 1, "limit": 20, "total": 0, "pages": 0 } }`.
- Collection endpoints accept `page`, `limit` (maximum 100), and `q` search parameters. Admin collection endpoints also accept `status`.
- Admin endpoints require `Authorization: Bearer <token>` from `POST /api/auth/login`. Login attempts are limited to 10 per 15 minutes per client IP.
- Errors return `{ "error": "..." }`. Public collection endpoints cache their responses in Redis for 60 seconds; public settings cache for 5 minutes. Writes invalidate matching keys.

## Endpoints

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | Public | Liveness check |
| GET | `/api/ready` | Public | Readiness check (503 until MongoDB is connected) |
| POST | `/api/auth/login` | Public, rate-limited | Admin login |
| GET | `/api/auth/me` | Admin | Current admin identity |
| PATCH | `/api/auth/me` | Admin | Update current admin name/email |
| GET | `/api/projects` | Public | Published projects |
| GET | `/api/projects/:id` | Public | Published project details |
| GET, POST | `/api/admin/projects` | Admin | List/manage projects |
| PATCH, DELETE | `/api/admin/projects/:id` | Admin | Update/delete project |
| GET | `/api/gallery` | Public | Published gallery media |
| GET, POST | `/api/admin/gallery` | Admin | List/create gallery items |
| PATCH, DELETE | `/api/admin/gallery/:id` | Admin | Update/delete gallery items |
| GET | `/api/testimonials` | Public | Published testimonials |
| POST | `/api/testimonials` | Public, rate-limited | Submit a testimonial for admin review |
| GET, POST | `/api/admin/testimonials` | Admin | List/create testimonials |
| PATCH, DELETE | `/api/admin/testimonials/:id` | Admin | Edit/publish/delete testimonials |
| POST | `/api/enquiries` | Public, rate-limited | Submit a contact enquiry and associate it with a CRM lead |
| GET, PATCH, DELETE | `/api/admin/enquiries[/:id]` | Admin | Search and manage enquiries |
| GET, POST | `/api/admin/clients` | Admin | List/create CRM clients |
| GET, PATCH, DELETE | `/api/admin/clients/:id` | Admin | View/update/delete a client and its enquiry history |
| GET | `/api/admin/dashboard` | Admin | Enquiry, client, testimonial, and gallery summary |
| GET | `/api/settings` | Public | Public company and social settings |
| GET, PATCH | `/api/admin/settings` | Admin | Read/update company, social, and notification settings |
| POST, DELETE | `/api/admin/media/upload` | Admin | Upload photo/video or delete an owned Cloudinary asset |

### Media upload

Send `multipart/form-data` to `/api/admin/media/upload` with a `file` field and optional `folder=gallery` or `folder=projects`. The upload limit defaults to 100 MB and can be changed with `MEDIA_MAX_FILE_SIZE_MB`. The response contains a `media` object (`url`, `publicId`, `resourceType`, `format`, and `bytes`); pass this object when creating a gallery item or project. Both images and videos are supported. Deletion is restricted to public IDs under the `aone-construction/` Cloudinary folder.

### Example requests

```sh
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-strong-password"}'

curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Ramesh Sharma","phone":"9800000001","email":"ramesh@example.com","message":"I want to build a two-storey house."}'

curl -X POST http://localhost:5000/api/admin/media/upload \
  -H "Authorization: Bearer <token>" \
  -F "folder=gallery" \
  -F "file=@./construction-site.mp4"
```

The Vite frontend uses `/api` by default and proxies API requests to `http://localhost:5000` during development. Copy `frontend/.env.example` to `frontend/.env.local` for local setup. For a deployed frontend, set `VITE_API_URL` to the backend API base URL (including `/api`) and set the backend `CLIENT_ORIGIN` to the frontend's exact origin.

## Tests

```sh
npm test
```

Eleven tests cover login fallbacks, Redis-less operation, health, auth guards, validation, pagination, and media auth. They run offline against the Express app — no MongoDB or Redis needed.

## Deployment

The API is a long-running Node process (MongoDB connection + optional Redis client), so it belongs on a Node or Docker host, not a static host.

**Render:** [`../render.yaml`](../render.yaml) defines the service (`rootDir: backend`, `npm ci --omit=dev`, health check `/api/health`). Fill in the secret env vars in the dashboard.

**Railway / Fly.io / VPS:** use the included `Dockerfile`:

```sh
docker build -t aone-api .
docker run -p 5000:5000 --env-file .env aone-api
```

Production environment:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `CLIENT_ORIGIN` | Exact frontend origin(s), comma-separated. Required — this is the CORS allowlist. |
| `TRUST_PROXY` | `1` behind Render/Railway/Fly/Vercel |
| `MONGODB_URI` | Atlas URI; allowlist the host IP or `0.0.0.0/0` |
| `JWT_SECRET` | 32+ random characters |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Bootstrap admin (password 12+ characters) |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Media uploads |
| `REDIS_URL` | Optional; `rediss://` for hosted Redis |

Environment variables are loaded by `src/config/env.js`, which every entry point requires first, so values such as `CLIENT_ORIGIN` and `MEDIA_MAX_FILE_SIZE_MB` are read after `.env` is applied. Do not require modules before it.

`app.set("trust proxy", TRUST_PROXY)` is applied so `express-rate-limit` reads the real client IP behind a platform proxy. Leave `TRUST_PROXY=1` unless you add more proxy hops.
