const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true },
    resourceType: { type: String, enum: ["image", "video"], default: "image" },
    format: String,
    bytes: Number,
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    location: { type: String, trim: true, maxlength: 160, default: "" },
    status: { type: String, enum: ["Completed", "Ongoing"], default: "Ongoing" },
    category: { type: String, trim: true, maxlength: 80, default: "General" },
    description: { type: String, trim: true, maxlength: 4000, default: "" },
    media: { type: [mediaSchema], default: [] },
    imageUrl: { type: String, trim: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

projectSchema.index({ published: 1, createdAt: -1 });
projectSchema.index({ title: "text", location: "text", category: "text" });

module.exports = mongoose.model("Project", projectSchema);
