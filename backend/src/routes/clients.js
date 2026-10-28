const { Router } = require("express");
const { z } = require("zod");
const Client = require("../models/Client");
const Enquiry = require("../models/Enquiry");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { parsePagination, pageResult } = require("../utils/pagination");

const router = Router();
const clientSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(40).optional(),
  email: z.union([z.string().trim().email().max(254), z.literal("")]).optional(),
  address: z.string().trim().max(300).optional(),
  status: z.enum(["lead", "active", "completed"]).optional(),
  notes: z.string().trim().max(5000).optional(),
});

router.use(authenticate);
router.get("/", asyncHandler(async (req, res) => {
  const { page, limit, skip, q, status } = parsePagination(req.query);
  const filter = {};
  if (status) {
    if (!["lead", "active", "completed"].includes(status)) {
      return res.status(400).json({ error: "Unsupported client status." });
    }
    filter.status = status;
  }
  if (q) filter.$text = { $search: q };
  const [items, total] = await Promise.all([
    Client.find(filter).populate("enquiries", "status message createdAt").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Client.countDocuments(filter),
  ]);
  res.json(pageResult(items, total, page, limit));
}));

router.post("/", asyncHandler(async (req, res) => {
  const parsed = clientSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const item = await Client.create({
    ...parsed.data,
    email: parsed.data.email?.toLowerCase() || "",
  });
  res.status(201).json({ item });
}));

router.get("/:id", asyncHandler(async (req, res) => {
  const item = await Client.findById(req.params.id).populate("enquiries").lean();
  if (!item) return res.status(404).json({ error: "Client not found." });
  res.json({ item });
}));

router.patch("/:id", asyncHandler(async (req, res) => {
  const parsed = clientSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const changes = { ...parsed.data };
  if (changes.email) changes.email = changes.email.toLowerCase();
  const item = await Client.findByIdAndUpdate(req.params.id, changes, {
    new: true, runValidators: true,
  });
  if (!item) return res.status(404).json({ error: "Client not found." });
  res.json({ item });
}));

router.delete("/:id", asyncHandler(async (req, res) => {
  const item = await Client.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Client not found." });
  await Enquiry.updateMany({ client: item._id }, { $unset: { client: "" } });
  res.json({ message: "Client deleted." });
}));

module.exports = router;
