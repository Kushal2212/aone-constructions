require("./src/config/env");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./src/routes/auth");
const projectRoutes = require("./src/routes/projects");
const testimonialRoutes = require("./src/routes/testimonials");
const galleryRoutes = require("./src/routes/gallery");
const enquiryRoutes = require("./src/routes/enquiries");
const clientRoutes = require("./src/routes/clients");
const dashboardRoutes = require("./src/routes/dashboard");
const settingsRoutes = require("./src/routes/settings");
const mediaRoutes = require("./src/routes/media");
const { notFound, errorHandler } = require("./src/middleware/errors");

const app = express();
const origins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (process.env.NODE_ENV === "production" && !process.env.CLIENT_ORIGIN) {
  console.warn(
    "CLIENT_ORIGIN is not set; set it to your deployed frontend origin."
  );
}


app.disable("x-powered-by");
// The API always runs behind a reverse proxy in production (Render, Railway,
// Fly, Vercel), so trust exactly one proxy hop. Without this, express-rate-limit
// cannot read the real client IP and every visitor shares one rate limit bucket.
app.set("trust proxy", Number(process.env.TRUST_PROXY ?? 1));
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || origins.includes(origin)) return callback(null, true);
    const error = new Error("Origin is not allowed by CORS.");
    error.statusCode = 403;
    callback(error);
  },
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
}));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.get("/api/ready", (req, res) => {
  const mongoose = require("mongoose");
  const databaseReady = mongoose.connection.readyState === 1;
  res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? "ready" : "starting",
    database: databaseReady ? "connected" : "disconnected",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes.publicRouter);
app.use("/api/admin/projects", projectRoutes.adminRouter);
app.use("/api/testimonials", testimonialRoutes.publicRouter);
app.use("/api/admin/testimonials", testimonialRoutes.adminRouter);
app.use("/api/gallery", galleryRoutes.publicRouter);
app.use("/api/admin/gallery", galleryRoutes.adminRouter);
app.use("/api/enquiries", enquiryRoutes.publicRouter);
app.use("/api/admin/enquiries", enquiryRoutes.adminRouter);
app.use("/api/admin/clients", clientRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes.publicRouter);
app.use("/api/admin/settings", settingsRoutes.adminRouter);
app.use("/api/admin/media", mediaRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
