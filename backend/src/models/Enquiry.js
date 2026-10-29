const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254, default: "" },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ["new", "contacted", "converted", "closed"], default: "new" },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  },
  { timestamps: true },
);

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ name: "text", email: "text", phone: "text", message: "text" });

module.exports = mongoose.model("Enquiry", enquirySchema);
