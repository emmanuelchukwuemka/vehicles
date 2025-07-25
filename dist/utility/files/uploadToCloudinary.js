"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const file_type_1 = require("file-type");
const cloudinary_1 = require("cloudinary");
const uuid_1 = require("uuid");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = async (file) => {
    if (!file?.buffer)
        throw new Error("File buffer is empty");
    const detected = await (0, file_type_1.fileTypeFromBuffer)(file.buffer);
    const realMime = detected?.mime || file.mimetype;
    const isVideo = realMime.startsWith("video");
    const isImage = realMime.startsWith("image");
    const resourceType = isVideo ? "video" : isImage ? "image" : "raw";
    const publicId = (0, uuid_1.v4)();
    return new Promise((resolve, reject) => {
        if (isVideo) {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: "video",
                public_id: publicId,
            }, (error, result) => {
                if (error || !result?.secure_url) {
                    return reject(error || new Error("Upload failed"));
                }
                resolve({
                    url: result.secure_url,
                    type: result.resource_type,
                    name: file.originalname ?? "video_attachment",
                });
            });
            uploadStream.end(file.buffer);
        }
        else {
            const base64 = `data:${realMime};base64,${file.buffer.toString("base64")}`;
            cloudinary_1.v2.uploader
                .upload(base64, {
                resource_type: resourceType,
                public_id: publicId,
            })
                .then((result) => {
                if (!result?.secure_url)
                    throw new Error("Upload failed");
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
exports.uploadToCloudinary = uploadToCloudinary;
