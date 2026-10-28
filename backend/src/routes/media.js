const { Router } = require("express");
const multer = require("multer");
const { z } = require("zod");
const { authenticate } = require("../middleware/auth");
const { cloudinary, uploadToCloudinary } = require("../config/cloudinary");
const { validateOwnedPublicId } = require("../utils/media");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: Number(process.env.MEDIA_MAX_FILE_SIZE_MB || 100) * 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (!file.mimetype.startsWith("image/") && !file.mimetype.startsWith("video/")) {
      const error = new Error("Only image and video files are accepted.");
      error.statusCode = 400;
      return callback(error);
    }
    callback(null, true);
  },
});

router.use(authenticate);
router.post(
  "/upload",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
      return res.status(503).json({ error: "Cloudinary is not configured." });
    }
    if (!req.file) return res.status(400).json({ error: "Choose an image or video file to upload." });
    const folderResult = z.enum(["gallery", "projects"]).safeParse(req.body.folder || "gallery");
    if (!folderResult.success) return res.status(400).json({ error: "Folder must be gallery or projects." });

    const resourceType = req.file.mimetype.startsWith("video/") ? "video" : "image";
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: `aone-construction/${folderResult.data}`,
      resource_type: resourceType,
      use_filename: false,
      unique_filename: true,
      overwrite: false,
    });
    res.status(201).json({
      media: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        bytes: result.bytes,
      },
    });
  }),
);

router.delete("/", asyncHandler(async (req, res) => {
  if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
    return res.status(503).json({ error: "Cloudinary is not configured." });
  }
  const parsed = z.object({
    publicId: z.string().min(1),
    resourceType: z.enum(["image", "video"]).default("image"),
  }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  validateOwnedPublicId(parsed.data.publicId);
  const result = await cloudinary.uploader.destroy(parsed.data.publicId, {
    resource_type: parsed.data.resourceType,
  });
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Cloudinary did not delete media asset (${result.result}).`);
  }
  res.json({ message: "Media asset deleted." });
}));

module.exports = router;
