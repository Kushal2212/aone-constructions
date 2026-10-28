const { Router } = require("express");
const { z } = require("zod");
const Setting = require("../models/Setting");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { cachedGet, invalidateCache } = require("../utils/cache");

const publicRouter = Router();
const adminRouter = Router();
const settingsSchema = z.object({
  company: z.object({
    name: z.string().trim().min(1).max(160).optional(),
    email: z.string().trim().email().max(254).or(z.literal("")).optional(),
    phone: z.string().trim().max(40).optional(),
    address: z.string().trim().max(300).optional(),
    website: z.string().trim().max(300).optional(),
  }).partial().optional(),
  social: z.record(z.string(), z.string().max(300)).optional(),
  notifications: z.object({
    newEnquiry: z.boolean().optional(),
    newClient: z.boolean().optional(),
    testimonial: z.boolean().optional(),
  }).partial().optional(),
}).strict();

publicRouter.get("/", cachedGet("settings:public", 300, async () => {
  const setting = await Setting.findOne({ key: "site" }).lean();
  return { company: setting?.company, social: setting?.social };
}));

adminRouter.get("/", authenticate, asyncHandler(async (req, res) => {
  let setting = await Setting.findOne({ key: "site" });
  if (!setting) setting = await Setting.create({ key: "site" });
  res.json({ item: setting });
}));

adminRouter.patch("/", authenticate, asyncHandler(async (req, res) => {
  const parsed = settingsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const changes = {};
  for (const section of ["company", "social", "notifications"]) {
    for (const [field, value] of Object.entries(parsed.data[section] || {})) {
      changes[`${section}.${field}`] = value;
    }
  }
  if (!Object.keys(changes).length) {
    return res.status(400).json({ error: "Provide at least one setting to update." });
  }
  const setting = await Setting.findOneAndUpdate(
    { key: "site" },
    {
      $set: changes,
      $setOnInsert: { key: "site" },
    },
    { new: true, upsert: true, runValidators: true },
  );
  await invalidateCache("settings:public:*");
  res.json({ item: setting });
}));

module.exports = { publicRouter, adminRouter };
