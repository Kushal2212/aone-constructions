const cloudinary = require("../config/cloudinary");

const OWNED_FOLDER_PREFIX = "aone-construction/";

function validateOwnedPublicId(publicId) {
  if (typeof publicId !== "string" || !publicId.startsWith(OWNED_FOLDER_PREFIX)) {
    const error = new Error("Only A.one Construction media assets can be removed.");
    error.statusCode = 400;
    throw error;
  }
}

async function removeMedia(media) {
  if (!media?.publicId) return;
  validateOwnedPublicId(media.publicId);
  const result = await cloudinary.deleteFromCloudinary(
    media.publicId,
    media.resourceType === "video" ? "video" : "image",
  );
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Cloudinary did not delete media asset (${result.result}).`);
  }
}

module.exports = { OWNED_FOLDER_PREFIX, validateOwnedPublicId, removeMedia };
