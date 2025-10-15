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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchListingsByLocationController = exports.submitListingController = exports.createDiscountController = exports.uploadMediaController = exports.addFeaturesController = exports.deleteListingController = exports.getListingController = exports.getListingsController = exports.updateListingController = exports.createListingController = exports.resetPassword = exports.forgotPassword = exports.healthCheck = exports.getStats = exports.updateVehicleStatus = exports.getAdminVehicles = exports.removeFavorite = exports.getFavorites = exports.addFavorite = exports.uploadImages = exports.deleteVehicle = exports.updateVehicle = exports.getVehicle = exports.getVehicles = exports.createVehicle = exports.updateProfile = exports.getProfile = exports.logout = exports.refresh = exports.login = exports.register = void 0;
const services = __importStar(require("./vehicles.services"));
const vehicles_types_1 = require("./vehicles.types");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const register = async (req, res) => {
    try {
        const validated = vehicles_types_1.registerSchema.parse(req.body);
        const result = await services.register(validated);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const validated = vehicles_types_1.loginSchema.parse(req.body);
        const result = await services.login(validated);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 401, message: result.message });
        }
        res.cookie('accessToken', result.data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refreshToken', result.data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.login = login;
const refresh = async (req, res) => {
    try {
        const validated = vehicles_types_1.refreshSchema.parse(req.body);
        const result = await services.refresh(validated.refreshToken);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 401, message: result.message });
        }
        res.cookie('accessToken', result.data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refreshToken', result.data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.refresh = refresh;
const logout = async (req, res) => {
    try {
        const validated = vehicles_types_1.logoutSchema.parse(req.body);
        const result = await services.logout(validated.refreshToken);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.logout = logout;
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await services.getUserProfile(userId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Profile retrieved', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const validated = vehicles_types_1.updateUserSchema.parse(req.body);
        const userId = req.user.id;
        const result = await services.updateUserProfile(userId, validated);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Profile updated', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.updateProfile = updateProfile;
const createVehicle = async (req, res) => {
    try {
        const validated = vehicles_types_1.createVehicleSchema.parse(req.body);
        const userId = req.user.id;
        const result = await services.createVehicle(userId, validated);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.createVehicle = createVehicle;
const getVehicles = async (req, res) => {
    try {
        const result = await services.getVehicles(req.query);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Vehicles retrieved', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.getVehicles = getVehicles;
const getVehicle = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await services.getVehicleById(id);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Vehicle retrieved', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.getVehicle = getVehicle;
const updateVehicle = async (req, res) => {
    try {
        const validated = vehicles_types_1.updateVehicleSchema.parse(req.body);
        const id = parseInt(req.params.id);
        const userId = req.user.id;
        const isAdmin = req.user.role === 'admin';
        const result = await services.updateVehicle(userId, id, validated, isAdmin);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user.id;
        const isAdmin = req.user.role === 'admin';
        const result = await services.deleteVehicle(userId, id, isAdmin);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.deleteVehicle = deleteVehicle;
const uploadImages = async (req, res) => {
    try {
        const files = req.files;
        const vehicleId = req.body.vehicleId ? parseInt(req.body.vehicleId) : undefined;
        const result = await services.uploadImages(files, vehicleId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Images uploaded', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.uploadImages = uploadImages;
const addFavorite = async (req, res) => {
    try {
        const validated = vehicles_types_1.addFavoriteSchema.parse(req.body);
        const userId = req.user.id;
        const result = await services.addFavorite(userId, validated.vehicleId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.addFavorite = addFavorite;
const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await services.getFavorites(userId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Favorites retrieved', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.getFavorites = getFavorites;
const removeFavorite = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user.id;
        const result = await services.removeFavorite(userId, id);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.removeFavorite = removeFavorite;
const getAdminVehicles = async (req, res) => {
    try {
        const result = await services.getAdminVehicles(req.query);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Admin vehicles retrieved', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.getAdminVehicles = getAdminVehicles;
const updateVehicleStatus = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;
        const result = await services.updateVehicleStatus(id, status);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.updateVehicleStatus = updateVehicleStatus;
const getStats = async (req, res) => {
    try {
        const result = await services.getStats();
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Stats retrieved', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.getStats = getStats;
const healthCheck = async (req, res) => {
    return (0, apiResponse_1.successResponse)(res, { message: 'Service is healthy', data: { timestamp: new Date().toISOString() } });
};
exports.healthCheck = healthCheck;
const forgotPassword = async (req, res) => {
    try {
        const validated = vehicles_types_1.forgotPasswordSchema.parse(req.body);
        const result = await services.forgotPassword(validated.email);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const validated = vehicles_types_1.resetPasswordSchema.parse(req.body);
        const result = await services.resetPassword(validated.token, validated.password);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.resetPassword = resetPassword;
const createListingController = async (req, res) => {
    try {
        const validated = vehicles_types_1.createListingSchema.parse(req.body);
        const userId = req.user.id;
        const files = req.files;
        const result = await services.createListing(userId, { ...validated, files });
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.createListingController = createListingController;
const updateListingController = async (req, res) => {
    try {
        const validated = vehicles_types_1.updateListingSchema.parse(req.body);
        const listingId = parseInt(req.params.id);
        const userId = req.user.id;
        const files = req.files;
        const result = await services.updateListing(userId, listingId, { ...validated, files });
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.updateListingController = updateListingController;
const getListingsController = async (req, res) => {
    try {
        const query = req.query;
        const result = await services.getAllListings(query);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Listings retrieved', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.getListingsController = getListingsController;
const getListingController = async (req, res) => {
    try {
        const listingId = parseInt(req.params.id);
        const includeOwner = req.user?.role === 'admin';
        const result = await services.getListingById(listingId, includeOwner);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Listing retrieved', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.getListingController = getListingController;
const deleteListingController = async (req, res) => {
    try {
        const listingId = parseInt(req.params.id);
        const userId = req.user.id;
        const result = await services.deleteListing(userId, listingId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.deleteListingController = deleteListingController;
const addFeaturesController = async (req, res) => {
    try {
        const validated = vehicles_types_1.addFeaturesSchema.parse(req.body);
        const listingId = parseInt(req.params.id);
        const result = await services.addListingFeatures(listingId, validated.features);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.addFeaturesController = addFeaturesController;
const uploadMediaController = async (req, res) => {
    try {
        const files = req.files;
        const listingId = parseInt(req.params.id);
        const result = await services.addListingMedia(listingId, files);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.uploadMediaController = uploadMediaController;
const createDiscountController = async (req, res) => {
    try {
        const validated = vehicles_types_1.createDiscountSchema.parse(req.body);
        const listingId = parseInt(req.params.id);
        const result = await services.createListingDiscount(listingId, validated);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message, data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.createDiscountController = createDiscountController;
const submitListingController = async (req, res) => {
    try {
        const listingId = parseInt(req.params.id);
        const userId = req.user.id;
        const result = await services.submitListing(listingId, userId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: 'Unexpected error' });
    }
};
exports.submitListingController = submitListingController;
const searchListingsByLocationController = async (req, res) => {
    try {
        const validated = vehicles_types_1.searchListingsByLocationSchema.parse(req.query);
        const result = await services.searchListingsByLocation(validated.location, validated.radiusKm, validated.page, validated.limit);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 500, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, { message: 'Listings searched by location', data: result.data });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: 'Validation error', details: error.issues });
    }
};
exports.searchListingsByLocationController = searchListingsByLocationController;
