const { Router } = require("express");
const { z } = require("zod");
const Project = require("../models/Project");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { cachedGet, invalidateCache } = require("../utils/cache");
const { parsePagination, pageResult } = require("../utils/pagination");
const { removeMedia } = require("../utils/media");

const publicRouter = Router();
const adminRouter = Router();
const projectFields = {
  title: z.string().trim().min(1).max(160),
  location: z.string().trim().max(160).optional(),
  status: z.enum(["Completed", "Ongoing"]).optional(),
  category: z.string().trim().max(80).optional(),
  description: z.string().trim().max(4000).optional(),
  imageUrl: z.string().url().optional(),
  media: z.array(z.object({
    url: z.string().url(),
    publicId: z.string().optional(),
    resourceType: z.enum(["image", "video"]).default("image"),
    format: z.string().optional(),
    bytes: z.number().optional(),
  })).max(20).optional(),
  published: z.boolean().optional(),
};
const createSchema = z.object(projectFields);
const updateSchema = createSchema.partial();

function slugify(value) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 140);
}

publicRouter.get("/", cachedGet("projects:public", 60, async (req) => {
  const { page, limit, skip, q } = parsePagination(req.query);
  const filter = { published: true };
  if (q) filter.$text = { $search: q };
  const [items, total] = await Promise.all([
    Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Project.countDocuments(filter),
  ]);
  return pageResult(items, total, page, limit);
}));

publicRouter.get("/:id", cachedGet("project:public", 60, async (req) => {
  const project = await Project.findOne({ _id: req.params.id, published: true }).lean();
  if (!project) {
    const error = new Error("Project not found.");
    error.statusCode = 404;
    throw error;
  }
  return { item: project };
}));

adminRouter.use(authenticate);
adminRouter.get("/", asyncHandler(async (req, res) => {
  const { page, limit, skip, q, status } = parsePagination(req.query);
  const filter = {};
  if (status === "published" || status === "unpublished") filter.published = status === "published";
  if (q) filter.$text = { $search: q };
  const [items, total] = await Promise.all([
    Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Project.countDocuments(filter),
  ]);
  res.json(pageResult(items, total, page, limit));
}));

adminRouter.post("/", asyncHandler(async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const project = await Project.create({
    ...parsed.data,
    slug: req.body.slug ? slugify(req.body.slug) : slugify(parsed.data.title),
  });
  await invalidateCache("projects:public:*", "project:public:*");
  res.status(201).json({ item: project });
}));

adminRouter.patch("/:id", asyncHandler(async (req, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const changes = { ...parsed.data };
  if (req.body.slug && typeof req.body.slug === "string") changes.slug = slugify(req.body.slug);
  else if (changes.title) changes.slug = slugify(changes.title);
  const project = await Project.findByIdAndUpdate(req.params.id, changes, {
    new: true, runValidators: true,
  });
  if (!project) return res.status(404).json({ error: "Project not found." });
  await invalidateCache("projects:public:*", "project:public:*");
  res.json({ item: project });
}));

adminRouter.delete("/:id", asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found." });
  for (const media of project.media) await removeMedia(media);
  await project.deleteOne();
  await invalidateCache("projects:public:*", "project:public:*");
  res.json({ message: "Project deleted." });
}));

module.exports = { publicRouter, adminRouter };
