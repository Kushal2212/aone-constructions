const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, trim: true, maxlength: 120, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

testimonialSchema.index({ published: 1, createdAt: -1 });
testimonialSchema.index({ clientName: "text", role: "text", message: "text" });

module.exports = mongoose.model("Testimonial", testimonialSchema);
