const { Router } = require("express");
const { z } = require("zod");
const rateLimit = require("express-rate-limit");
const Enquiry = require("../models/Enquiry");
const Client = require("../models/Client");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { parsePagination, pageResult } = require("../utils/pagination");

const publicRouter = Router();
const adminRouter = Router();
const enquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.union([z.string().trim().email().max(254), z.literal("")]).optional(),
  phone: z.string().trim().min(8).max(40),
  message: z.string().trim().min(10).max(5000),
});

publicRouter.post(
  "/",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false }),
  asyncHandler(async (req, res) => {
    const parsed = enquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message || "Invalid enquiry details." });
    }

    const data = { ...parsed.data, email: parsed.data.email?.toLowerCase() || "" };
    const identity = data.email ? { $or: [{ email: data.email }, { phone: data.phone }] } : { phone: data.phone };
    let client = await Client.findOne(identity);
    if (!client) {
      client = await Client.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: "lead",
      });
    } else {
      client.name = data.name;
      if (data.email) client.email = data.email;
      client.phone = data.phone;
      await client.save();
    }

    const enquiry = await Enquiry.create({ ...data, client: client._id });
    await Client.updateOne({ _id: client._id }, { $addToSet: { enquiries: enquiry._id } });
    res.status(201).json({ message: "Enquiry received.", item: enquiry });
  }),
);

adminRouter.use(authenticate);
adminRouter.get("/", asyncHandler(async (req, res) => {
  const { page, limit, skip, q, status } = parsePagination(req.query);
  const filter = {};
  if (status) {
    if (!["new", "contacted", "converted", "closed"].includes(status)) {
      return res.status(400).json({ error: "Unsupported enquiry status." });
    }
    filter.status = status;
  }
  if (q) filter.$text = { $search: q };
  const [items, total] = await Promise.all([
    Enquiry.find(filter).populate("client", "name status").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Enquiry.countDocuments(filter),
  ]);
  res.json(pageResult(items, total, page, limit));
}));

adminRouter.patch("/:id", asyncHandler(async (req, res) => {
  const parsed = z.object({
    status: z.enum(["new", "contacted", "converted", "closed"]).optional(),
    message: z.string().trim().min(10).max(5000).optional(),
  }).strict().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const item = await Enquiry.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true, runValidators: true,
  });
  if (!item) return res.status(404).json({ error: "Enquiry not found." });
  if (parsed.data.status === "converted" && item.client) {
    await Client.updateOne({ _id: item.client }, { $set: { status: "active" } });
  }
  res.json({ item });
}));

adminRouter.delete("/:id", asyncHandler(async (req, res) => {
  const item = await Enquiry.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Enquiry not found." });
  if (item.client) {
    await Client.updateOne({ _id: item.client }, { $pull: { enquiries: item._id } });
  }
  res.json({ message: "Enquiry deleted." });
}));

module.exports = { publicRouter, adminRouter };
