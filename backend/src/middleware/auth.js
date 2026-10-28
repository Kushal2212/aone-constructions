const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

async function authenticate(req, res, next) {
  try {
    const token = req.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!token) {
      return res.status(401).json({ error: "Authentication required." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(payload.sub).select("email name");
    if (!admin) {
      return res.status(401).json({ error: "Admin account is no longer available." });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Invalid or expired authentication token." });
    }
    next(error);
  }
}

module.exports = { authenticate };
