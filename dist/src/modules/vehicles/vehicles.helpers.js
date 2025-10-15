"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateListingOwner = exports.validateVehicleType = exports.generateKeywords = exports.geocodeLocation = exports.processMediaFiles = exports.getUserById = exports.hashRefreshToken = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = exports.verifyPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const vehicles_models_1 = require("./vehicles.models");
const hashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, hash) => {
    return await bcryptjs_1.default.compare(password, hash);
};
exports.verifyPassword = verifyPassword;
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
const hashRefreshToken = async (token) => {
    return await bcryptjs_1.default.hash(token, 10);
};
exports.hashRefreshToken = hashRefreshToken;
const getUserById = async (id) => {
    return await vehicles_models_1.User.findByPk(id);
};
exports.getUserById = getUserById;
// Listing-specific helpers
const processMediaFiles = async (files, listingId) => {
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    }
    const mediaEntries = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = file.mimetype.startsWith('image/') ? 'image' : 'video';
        const fileUrl = `/uploads/${file.filename}`;
        const fileSize = file.size;
        // Placeholder for dimensions (integrate sharp later if needed)
        const dimensions = fileType === 'image' ? '1920x1080' : undefined; // Mock dimensions
        const media = await vehicles_models_1.Media.create({
            listing_id: listingId,
            file_url: fileUrl,
            file_type: fileType,
            file_size: fileSize,
            dimensions,
        });
        // Set additional properties after creation
        media.is_primary = i === 0; // First file as primary
        media.sort_order = i;
        media.alt_text = undefined;
        await media.save();
        mediaEntries.push(media);
    }
    return mediaEntries;
};
exports.processMediaFiles = processMediaFiles;
const geocodeLocation = async (location) => {
    // Placeholder: Return mock coordinates. Integrate google-maps-services-js for real geocoding.
    // Example: const client = new Client({}); const response = await client.geocode({ address: location });
    return { lat: 40.7128, long: -74.0060 }; // NYC mock
};
exports.geocodeLocation = geocodeLocation;
const generateKeywords = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    const words = text.match(/\b\w{3,}\b/g) || []; // Extract words >= 3 chars
    const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'an', 'a', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them']);
    const filtered = words.filter(word => !commonWords.has(word));
    const unique = [...new Set(filtered)].slice(0, 20); // Max 20 unique keywords
    return unique;
};
exports.generateKeywords = generateKeywords;
const validateVehicleType = (listingType, data) => {
    const requiredFields = {
        car: ['make', 'condition'],
        bike: ['make', 'condition'],
        haulage: ['make', 'condition'],
        spare_part: ['category', 'condition'],
    };
    const fields = requiredFields[listingType];
    if (!fields)
        throw new Error(`Invalid listing type: ${listingType}`);
    for (const field of fields) {
        if (!data[field])
            throw new Error(`Missing required field: ${field} for ${listingType}`);
    }
};
exports.validateVehicleType = validateVehicleType;
const authenticateListingOwner = async (userId, listingId) => {
    const listing = await vehicles_models_1.Listing.findByPk(listingId);
    return listing ? listing.user_id === userId : false;
};
exports.authenticateListingOwner = authenticateListingOwner;
