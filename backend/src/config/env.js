const path = require("node:path");
const dotenv = require("dotenv");

// Load environment variables before any other module reads process.env.
// Modules such as app.js (CORS allowlist) and routes/media.js (upload limit)
// read env values at require time, so this must run first.
dotenv.config({ path: path.join(__dirname, "..", "..", ".env"), quiet: true });
