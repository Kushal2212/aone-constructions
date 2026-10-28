const cloudinary = require("cloudinary").v2;

function configureCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.warn("Cloudinary is not configured; media upload endpoints will return an error.");
    return false;
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  return true;
}

function uploadToCloudinary(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
      } else if (!result) {
        reject(new Error("Cloudinary returned no upload result."));
      } else {
        resolve(result);
      }
    });
    stream.end(buffer);
  });
}

async function deleteFromCloudinary(publicId, resourceType) {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

module.exports = { cloudinary, configureCloudinary, uploadToCloudinary, deleteFromCloudinary };
