# A.one Construction frontend

## Local development

1. Start the backend by following [the backend setup guide](../backend/README.md).
2. In `frontend`, install dependencies and start Vite:

   ```sh
   npm install
   npm run dev
   ```

Vite proxies `/api` requests to `http://localhost:5000` by default, so the browser uses the backend without a separate CORS setup in development. To use a different local API host, set `VITE_API_PROXY_TARGET` before starting Vite.

Copy `.env.example` to `.env.local` if you want to set `VITE_API_URL`. Keep `/api` for local development; for deployment, set it to the full backend API URL, such as `https://api.example.com/api`. The backend's `CLIENT_ORIGIN` must include the deployed frontend origin.

The admin login uses the account bootstrapped by the backend from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Project and gallery file uploads require Cloudinary credentials in the backend environment.
