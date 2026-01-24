const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: process.env.NODE_ENV === 'production',
});

/**
 *
 * @param {Express.Multer.File} file
 */
const uploadImageToCloudinary = async (file) => {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(file.buffer);
    });

    return uploadResult.url;
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadImageToCloudinary };
