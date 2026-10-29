const { Router } = require("express");
const { z } = require("zod");
const Testimonial = require("../models/Testimonial");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { cachedGet, invalidateCache } = require("../utils/cache");
const { parsePagination, pageResult } = require("../utils/pagination");
const rateLimit = require("express-rate-limit");

const publicRouter = Router();
const adminRouter = Router();
const testimonialSchema = z.object({
  clientName: z.string().trim().min(1).max(120),
  role: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1).max(3000),
  rating: z.number().int().min(1).max(5).optional(),
  published: z.boolean().optional(),
});

publicRouter.get("/", cachedGet("testimonials:public", 60, async (req) => {
  const { page, limit, skip } = parsePagination(req.query);
  const filter = { published: true };
  const [items, total] = await Promise.all([
    Testimonial.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Testimonial.countDocuments(filter),
  ]);
  return pageResult(items, total, page, limit);
}));

publicRouter.post(
  "/",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: "draft-8", legacyHeaders: false }),
  asyncHandler(async (req, res) => {
    const parsed = testimonialSchema.omit({ published: true }).safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
    const item = await Testimonial.create({ ...parsed.data, published: false });
    res.status(201).json({ message: "Testimonial submitted for review.", item });
  }),
);

adminRouter.use(authenticate);
adminRouter.get("/", asyncHandler(async (req, res) => {
  const { page, limit, skip, q, status } = parsePagination(req.query);
  const filter = {};
  if (status === "published" || status === "unpublished") filter.published = status === "published";
  if (q) filter.$text = { $search: q };
  const [items, total] = await Promise.all([
    Testimonial.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Testimonial.countDocuments(filter),
  ]);
  res.json(pageResult(items, total, page, limit));
}));

adminRouter.post("/", asyncHandler(async (req, res) => {
  const parsed = testimonialSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const item = await Testimonial.create(parsed.data);
  await invalidateCache("testimonials:public:*");
  res.status(201).json({ item });
}));

adminRouter.patch("/:id", asyncHandler(async (req, res) => {
  const parsed = testimonialSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const item = await Testimonial.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true, runValidators: true,
  });
  if (!item) return res.status(404).json({ error: "Testimonial not found." });
  await invalidateCache("testimonials:public:*");
  res.json({ item });
}));

adminRouter.delete("/:id", asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Testimonial not found." });
  await invalidateCache("testimonials:public:*");
  res.json({ message: "Testimonial deleted." });
}));

module.exports = { publicRouter, adminRouter };
