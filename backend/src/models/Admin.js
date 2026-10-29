const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    hashedPassword: { type: String, select: false },
    name: { type: String, default: "Administrator", trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Admin", adminSchema);
