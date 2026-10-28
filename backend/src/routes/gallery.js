const { Router } = require("express");
const { z } = require("zod");
const GalleryItem = require("../models/GalleryItem");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { cachedGet, invalidateCache } = require("../utils/cache");
const { parsePagination, pageResult } = require("../utils/pagination");
const { removeMedia } = require("../utils/media");

const publicRouter = Router();
const adminRouter = Router();
const galleryFields = {
  title: z.string().trim().min(1).max(160),
  category: z.string().trim().max(80).optional(),
  media: z.object({
    url: z.string().url(),
    publicId: z.string().optional(),
    resourceType: z.enum(["image", "video"]).default("image"),
    format: z.string().optional(),
    bytes: z.number().optional(),
  }).optional(),
  imageUrl: z.string().url().optional(),
  published: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
};
const createSchema = z.object(galleryFields).refine((value) => value.media || value.imageUrl, {
  message: "A media object or imageUrl is required.",
});
const updateSchema = z.object(galleryFields).partial();

publicRouter.get("/", cachedGet("gallery:public", 60, async (req) => {
  const { page, limit, skip, q } = parsePagination(req.query);
  const filter = { published: true };
  if (q) filter.$text = { $search: q };
  const [items, total] = await Promise.all([
    GalleryItem.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    GalleryItem.countDocuments(filter),
  ]);
  return pageResult(items, total, page, limit);
}));

adminRouter.use(authenticate);
adminRouter.get("/", asyncHandler(async (req, res) => {
  const { page, limit, skip, q, status } = parsePagination(req.query);
  const filter = {};
  if (status === "published" || status === "unpublished") filter.published = status === "published";
  if (q) filter.$text = { $search: q };
  const [items, total] = await Promise.all([
    GalleryItem.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    GalleryItem.countDocuments(filter),
  ]);
  res.json(pageResult(items, total, page, limit));
}));

adminRouter.post("/", asyncHandler(async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const item = await GalleryItem.create(parsed.data);
  await invalidateCache("gallery:public:*");
  res.status(201).json({ item });
}));

adminRouter.patch("/:id", asyncHandler(async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true, runValidators: true,
  });
  if (!item) return res.status(404).json({ error: "Gallery item not found." });
  await invalidateCache("gallery:public:*");
  res.json({ item });
}));

adminRouter.delete("/:id", asyncHandler(async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Gallery item not found." });
  await removeMedia(item.media);
  await item.deleteOne();
  await invalidateCache("gallery:public:*");
  res.json({ message: "Gallery item deleted." });
}));

module.exports = { publicRouter, adminRouter };
