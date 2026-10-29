const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    company: {
      name: { type: String, default: "A.one Brain Construction Pvt. Ltd." },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "Pathari-Shanischare-1, Morang, Nepal" },
      website: { type: String, default: "" },
    },
    social: { type: mongoose.Schema.Types.Mixed, default: { linkedin: "" } },
    notifications: {
      newEnquiry: { type: Boolean, default: true },
      newClient: { type: Boolean, default: true },
      testimonial: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Setting", settingSchema);
