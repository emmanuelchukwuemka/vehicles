"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//import { fileTypeFromBuffer } from "file-type";
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
    const { fileTypeFromBuffer } = await Promise.resolve().then(() => __importStar(require("file-type")));
    const detected = await fileTypeFromBuffer(file.buffer);
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
