const mongoose = require("mongoose");

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    category: { type: String, trim: true, maxlength: 80, default: "General" },
    media: {
      url: { type: String, required: true, trim: true },
      publicId: { type: String, trim: true },
      resourceType: { type: String, enum: ["image", "video"], default: "image" },
      format: String,
      bytes: Number,
    },
    imageUrl: { type: String, trim: true },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

galleryItemSchema.index({ published: 1, order: 1, createdAt: -1 });
galleryItemSchema.index({ title: "text", category: "text" });

module.exports = mongoose.model("GalleryItem", galleryItemSchema);
