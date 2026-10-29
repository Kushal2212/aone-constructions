const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { timingSafeEqual } = require("node:crypto");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const rateLimit = require("express-rate-limit");
const Admin = require("../models/Admin");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();
const loginSchema = z.object({
  email: z.string().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(200),
});

function securelyMatches(value, expected) {
  if (typeof expected !== "string") return false;
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return valueBuffer.length === expectedBuffer.length
    && timingSafeEqual(valueBuffer, expectedBuffer);
}

router.post(
  "/login",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false }),
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message || "Invalid login details." });
    }

    const admin = await Admin.findOne({ email: parsed.data.email })
      .select("+passwordHash +hashedPassword");
    const storedPasswordHash = admin?.passwordHash || admin?.hashedPassword;
    const matchesStoredHash = storedPasswordHash
      ? await bcrypt.compare(parsed.data.password, storedPasswordHash)
      : false;
    const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const matchesConfiguredCredentials = securelyMatches(parsed.data.email, configuredEmail)
      && securelyMatches(parsed.data.password, process.env.ADMIN_PASSWORD);
    const matches = matchesStoredHash || matchesConfiguredCredentials;
    if (!matches) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    const token = jwt.sign(
      { sub: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
    );
    res.json({
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  }),
);

router.get(
  "/me",
  authenticate,
  (req, res) => res.json({ admin: { id: req.admin.id, email: req.admin.email, name: req.admin.name } }),
);

router.patch(
  "/me",
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = z.object({
      name: z.string().trim().min(1).max(120).optional(),
      email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()).optional(),
    }).strict().safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
    if (!Object.keys(parsed.data).length) {
      return res.status(400).json({ error: "Provide a name or email to update." });
    }

    Object.assign(req.admin, parsed.data);
    await req.admin.save();
    res.json({ admin: { id: req.admin.id, email: req.admin.email, name: req.admin.name } });
  }),
);

module.exports = router;
