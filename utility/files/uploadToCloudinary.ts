import dotenv from "dotenv";
dotenv.config();
import { fileTypeFromBuffer } from "file-type";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File
): Promise<{ url: string; type: string; name: string }> => {
  if (!file?.buffer) throw new Error("File buffer is empty");

  const detected = await fileTypeFromBuffer(file.buffer);

  const realMime = detected?.mime || file.mimetype;
  const isVideo = realMime.startsWith("video");
  const isImage = realMime.startsWith("image");

  const resourceType = isVideo ? "video" : isImage ? "image" : "raw";
  const publicId = uuid();

  return new Promise((resolve, reject) => {
    if (isVideo) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          public_id: publicId,
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            return reject(error || new Error("Upload failed"));
          }
          resolve({
            url: result.secure_url,
            type: result.resource_type,
            name: file.originalname ?? "video_attachment",
          });
        }
      );
      uploadStream.end(file.buffer);
    } else {
      const base64 = `data:${realMime};base64,${file.buffer.toString(
        "base64"
      )}`;
      cloudinary.uploader
        .upload(base64, {
          resource_type: resourceType,
          public_id: publicId,
        })
        .then((result) => {
          if (!result?.secure_url) throw new Error("Upload failed");
          resolve({
            url: result.secure_url,
            type: result.resource_type,
            name: file.originalname ?? "attachment",
          });
        })
        .catch((err) => reject(err));
    }
  });
};
