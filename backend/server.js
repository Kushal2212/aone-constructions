require("./src/config/env");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const app = require("./app");
const Admin = require("./src/models/Admin");
const Setting = require("./src/models/Setting");
const { connectDatabase } = require("./src/config/database");
const { connectRedis, closeRedis } = require("./src/config/redis");
const { configureCloudinary } = require("./src/config/cloudinary");

async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD are required to bootstrap the admin account.",
    );
  }
  if (!z.string().email().safeParse(email).success) {
    throw new Error("ADMIN_EMAIL must be a valid email address.");
  }
  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
  }

  const existing = await Admin.findOne({ email });
  if (existing) return;
  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ email, passwordHash, name: "Administrator" });
  console.info(`Created initial administrator account for ${email}.`);
}

async function ensureSiteSettings() {
  await Setting.findOneAndUpdate(
    { key: "site" },
    { $setOnInsert: { key: "site" } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

async function start() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be set to at least 32 characters.");
  }
  await connectDatabase(process.env.MONGODB_URI);
  await ensureAdmin();
  await ensureSiteSettings();
  configureCloudinary();
  await connectRedis(process.env.REDIS_URL);

  const port = Number(process.env.PORT || 5000);
  const server = app.listen(port, () => {
    console.info(`A.one Construction API listening on port ${port}.`);
  });

  async function shutdown(signal) {
    console.info(`${signal} received; shutting down.`);
    server.close(async (error) => {
      if (error) {
        console.error("HTTP server shutdown failed:", error);
        process.exitCode = 1;
      }
      await closeRedis();
      const mongoose = require("mongoose");
      await mongoose.disconnect();
      process.exit();
    });
  }

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((error) => {
  console.error("API startup failed:", error);
  process.exitCode = 1;
});
