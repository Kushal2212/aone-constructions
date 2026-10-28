const { Router } = require("express");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const Client = require("../models/Client");
const Enquiry = require("../models/Enquiry");
const GalleryItem = require("../models/GalleryItem");
const Testimonial = require("../models/Testimonial");

const router = Router();

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const [
    newEnquiries,
    totalEnquiries,
    leads,
    activeClients,
    completedClients,
    testimonials,
    galleryItems,
    recentEnquiries,
  ] = await Promise.all([
    Enquiry.countDocuments({ status: "new" }),
    Enquiry.countDocuments(),
    Client.countDocuments({ status: "lead" }),
    Client.countDocuments({ status: "active" }),
    Client.countDocuments({ status: "completed" }),
    Testimonial.countDocuments(),
    GalleryItem.countDocuments(),
    Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  res.json({
    summary: {
      newEnquiries,
      totalEnquiries,
      clients: { leads, active: activeClients, completed: completedClients },
      testimonials,
      galleryItems,
    },
    recentEnquiries,
  });
}));

module.exports = router;
