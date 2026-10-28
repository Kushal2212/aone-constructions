const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    email: { type: String, trim: true, lowercase: true, maxlength: 254, default: "" },
    address: { type: String, trim: true, maxlength: 300, default: "" },
    status: { type: String, enum: ["lead", "active", "completed"], default: "lead" },
    notes: { type: String, trim: true, maxlength: 5000, default: "" },
    enquiries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enquiry" }],
  },
  { timestamps: true },
);

clientSchema.index({ name: "text", phone: "text", email: "text" });

module.exports = mongoose.model("Client", clientSchema);
