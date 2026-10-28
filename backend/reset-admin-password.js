const path = require("node:path");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const mongoose = require("mongoose");
const Admin = require("./src/models/Admin");
const { connectDatabase } = require("./src/config/database");

dotenv.config({ path: path.join(__dirname, ".env") });

async function resetAdminPassword() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
  }
  if (!z.string().email().safeParse(email).success) {
    throw new Error("ADMIN_EMAIL must be a valid email address.");
  }
  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
  }

  await connectDatabase(process.env.MONGODB_URI);
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await Admin.findOneAndUpdate(
    { email },
    { $set: { passwordHash }, $unset: { hashedPassword: 1 } },
    { new: true, runValidators: true },
  );
  if (!admin) {
    throw new Error("No administrator exists for the configured ADMIN_EMAIL.");
  }

  console.info("Administrator password updated.");
}

resetAdminPassword()
  .catch((error) => {
    console.error("Admin password reset failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
