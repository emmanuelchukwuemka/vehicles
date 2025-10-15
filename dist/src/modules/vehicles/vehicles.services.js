"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitListing = exports.createListingDiscount = exports.addListingMedia = exports.addListingFeatures = exports.deleteListing = exports.getListingById = exports.getUserListings = exports.updateListing = exports.createListing = exports.sendPasswordResetEmail = exports.sendVerificationEmail = exports.sendEmail = exports.resetPassword = exports.forgotPassword = exports.getStats = exports.updateVehicleStatus = exports.getAdminVehicles = exports.removeFavorite = exports.getFavorites = exports.addFavorite = exports.uploadImages = exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = exports.updateUserProfile = exports.getUserProfile = exports.logout = exports.refresh = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sequelize_1 = require("sequelize");
const vehicles_models_1 = require("./vehicles.models");
const vehicles_helpers_1 = require("./vehicles.helpers");
const register = async (data) => {
    try {
        const { email, password, fullName } = data;
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await vehicles_models_1.User.findOne({ where: { email: normalizedEmail } });
        if (existingUser)
            throw new Error('User already exists');
        const passwordHash = await (0, vehicles_helpers_1.hashPassword)(password);
        const user = await vehicles_models_1.User.create({
            email: normalizedEmail,
            password_hash: passwordHash,
            full_name: fullName || null,
            role: 'user',
            is_active: true,
        });
        const accessToken = (0, vehicles_helpers_1.generateAccessToken)({ id: user.id, email: user.email, role: user.role });
        const refreshToken = (0, vehicles_helpers_1.generateRefreshToken)({ id: user.id });
        const refreshTokenHash = await (0, vehicles_helpers_1.hashRefreshToken)(refreshToken);
        await vehicles_models_1.RefreshToken.create({
            user_id: user.id,
            token_hash: refreshTokenHash,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return {
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.full_name,
                    role: user.role,
                },
                accessToken,
                refreshToken,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Registration failed',
        };
    }
};
exports.register = register;
const login = async (data) => {
    try {
        const { email, password } = data;
        const normalizedEmail = email.trim().toLowerCase();
        const user = await vehicles_models_1.User.findOne({ where: { email: normalizedEmail } });
        if (!user)
            throw new Error('Invalid credentials');
        const isValid = await (0, vehicles_helpers_1.verifyPassword)(password, user.password_hash);
        if (!isValid)
            throw new Error('Invalid credentials');
        const accessToken = (0, vehicles_helpers_1.generateAccessToken)({ id: user.id, email: user.email, role: user.role });
        const refreshToken = (0, vehicles_helpers_1.generateRefreshToken)({ id: user.id });
        const refreshTokenHash = await (0, vehicles_helpers_1.hashRefreshToken)(refreshToken);
        await vehicles_models_1.RefreshToken.create({
            user_id: user.id,
            token_hash: refreshTokenHash,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return {
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.full_name,
                    role: user.role,
                },
                accessToken,
                refreshToken,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Login failed',
        };
    }
};
exports.login = login;
const refresh = async (refreshToken) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await (0, vehicles_helpers_1.getUserById)(decoded.id);
        if (!user)
            throw new Error('User not found');
        const tokenRecord = await vehicles_models_1.RefreshToken.findOne({
            where: {
                user_id: user.id,
                revoked_at: null,
            },
        });
        if (!tokenRecord)
            throw new Error('Invalid refresh token');
        const isValid = await bcryptjs_1.default.compare(refreshToken, tokenRecord.token_hash);
        if (!isValid)
            throw new Error('Invalid refresh token');
        const newAccessToken = (0, vehicles_helpers_1.generateAccessToken)({ id: user.id, email: user.email, role: user.role });
        const newRefreshToken = (0, vehicles_helpers_1.generateRefreshToken)({ id: user.id });
        await tokenRecord.update({ revoked_at: new Date() });
        const newTokenHash = await (0, vehicles_helpers_1.hashRefreshToken)(newRefreshToken);
        await vehicles_models_1.RefreshToken.create({
            user_id: user.id,
            token_hash: newTokenHash,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return {
            success: true,
            message: 'Token refreshed',
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Refresh failed',
        };
    }
};
exports.refresh = refresh;
const logout = async (refreshToken) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET);
        await vehicles_models_1.RefreshToken.update({ revoked_at: new Date() }, { where: { user_id: decoded.id, revoked_at: null } });
        return {
            success: true,
            message: 'Logged out successfully',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Logout failed',
        };
    }
};
exports.logout = logout;
const getUserProfile = async (userId) => {
    try {
        const user = await (0, vehicles_helpers_1.getUserById)(userId);
        if (!user)
            throw new Error('User not found');
        return {
            success: true,
            data: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                phone: user.phone,
                role: user.role,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to get profile',
        };
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (userId, data) => {
    try {
        const user = await (0, vehicles_helpers_1.getUserById)(userId);
        if (!user)
            throw new Error('User not found');
        await user.update(data);
        return {
            success: true,
            data: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                phone: user.phone,
                role: user.role,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to update profile',
        };
    }
};
exports.updateUserProfile = updateUserProfile;
const createVehicle = async (userId, data) => {
    try {
        const vehicle = await vehicles_models_1.Vehicle.create({
            ...data,
            user_id: userId,
            status: 'pending',
        });
        return {
            success: true,
            message: 'Vehicle created successfully',
            data: vehicle,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to create vehicle',
        };
    }
};
exports.createVehicle = createVehicle;
const getVehicles = async (query) => {
    try {
        const { page = 1, limit = 20, q, brand, minPrice, maxPrice, year, condition, sort } = query;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;
        const offset = (pageNum - 1) * limitNum;
        const where = { status: 'approved' };
        if (q)
            where[sequelize_1.Op.or] = [
                { title: { [sequelize_1.Op.like]: `%${q}%` } },
                { brand: { [sequelize_1.Op.like]: `%${q}%` } },
                { description: { [sequelize_1.Op.like]: `%${q}%` } },
            ];
        if (brand)
            where.brand = brand;
        if (minPrice)
            where.price = { ...where.price, [sequelize_1.Op.gte]: minPrice };
        if (maxPrice)
            where.price = { ...where.price, [sequelize_1.Op.lte]: maxPrice };
        if (year)
            where.year = year;
        if (condition)
            where.condition = condition;
        const order = [['created_at', 'DESC']];
        if (sort) {
            const [field, dir] = sort.split(':');
            order.unshift([field, dir.toUpperCase()]);
        }
        const { rows: items, count: total } = await vehicles_models_1.Vehicle.findAndCountAll({
            where,
            include: [
                {
                    model: vehicles_models_1.VehicleImage,
                    as: 'images',
                    where: { is_primary: true },
                    required: false,
                },
            ],
            limit: limitNum,
            offset,
            order,
        });
        return {
            success: true,
            data: {
                items,
                total,
                page: pageNum,
                limit: limitNum,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to get vehicles',
        };
    }
};
exports.getVehicles = getVehicles;
const getVehicleById = async (id) => {
    try {
        const vehicle = await vehicles_models_1.Vehicle.findByPk(id, {
            include: [
                {
                    model: vehicles_models_1.VehicleImage,
                    as: 'images',
                },
                {
                    model: vehicles_models_1.User,
                    as: 'owner',
                    attributes: ['id', 'full_name'],
                },
            ],
        });
        if (!vehicle)
            throw new Error('Vehicle not found');
        return {
            success: true,
            data: vehicle,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to get vehicle',
        };
    }
};
exports.getVehicleById = getVehicleById;
const updateVehicle = async (userId, id, data, isAdmin) => {
    try {
        const vehicle = await vehicles_models_1.Vehicle.findByPk(id);
        if (!vehicle)
            throw new Error('Vehicle not found');
        if (!isAdmin && vehicle.user_id !== userId)
            throw new Error('Unauthorized');
        const keyFields = ['price', 'description'];
        const hasKeyChange = keyFields.some(field => data[field] !== undefined && data[field] !== vehicle[field]);
        if (hasKeyChange && !isAdmin) {
            data.status = 'pending';
        }
        await vehicle.update(data);
        return {
            success: true,
            message: 'Vehicle updated successfully',
            data: vehicle,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to update vehicle',
        };
    }
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (userId, id, isAdmin) => {
    try {
        const vehicle = await vehicles_models_1.Vehicle.findByPk(id);
        if (!vehicle)
            throw new Error('Vehicle not found');
        if (!isAdmin && vehicle.user_id !== userId)
            throw new Error('Unauthorized');
        await vehicle.destroy();
        return {
            success: true,
            message: 'Vehicle deleted successfully',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to delete vehicle',
        };
    }
};
exports.deleteVehicle = deleteVehicle;
const uploadImages = async (files, vehicleId) => {
    try {
        const uploaded = [];
        for (const file of files) {
            const url = `/uploads/${file.filename}`;
            const image = await vehicles_models_1.VehicleImage.create({
                vehicle_id: vehicleId ?? null,
                url,
                is_primary: false,
            });
            uploaded.push({
                id: image.id,
                url,
                is_primary: image.is_primary,
            });
        }
        return {
            success: true,
            data: { uploaded },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to upload images',
        };
    }
};
exports.uploadImages = uploadImages;
const addFavorite = async (userId, vehicleId) => {
    try {
        const existing = await vehicles_models_1.Favorite.findOne({ where: { user_id: userId, vehicle_id: vehicleId } });
        if (existing)
            throw new Error('Already in favorites');
        const favorite = await vehicles_models_1.Favorite.create({ user_id: userId, vehicle_id: vehicleId });
        return {
            success: true,
            message: 'Added to favorites',
            data: favorite,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to add favorite',
        };
    }
};
exports.addFavorite = addFavorite;
const getFavorites = async (userId) => {
    try {
        const favorites = await vehicles_models_1.Favorite.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: vehicles_models_1.Vehicle,
                    as: 'vehicle',
                    include: [
                        {
                            model: vehicles_models_1.VehicleImage,
                            as: 'images',
                            where: { is_primary: true },
                            required: false,
                        },
                    ],
                },
            ],
        });
        return {
            success: true,
            data: favorites.map((f) => f.vehicle),
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to get favorites',
        };
    }
};
exports.getFavorites = getFavorites;
const removeFavorite = async (userId, id) => {
    try {
        const favorite = await vehicles_models_1.Favorite.findByPk(id);
        if (!favorite || favorite.user_id !== userId)
            throw new Error('Favorite not found');
        await favorite.destroy();
        return {
            success: true,
            message: 'Removed from favorites',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to remove favorite',
        };
    }
};
exports.removeFavorite = removeFavorite;
const getAdminVehicles = async (query) => {
    try {
        const { status, page = 1, limit = 20 } = query;
        const offset = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
        const { rows: items, count: total } = await vehicles_models_1.Vehicle.findAndCountAll({
            where,
            include: [
                {
                    model: vehicles_models_1.User,
                    as: 'owner',
                    attributes: ['id', 'full_name'],
                },
            ],
            limit,
            offset,
            order: [['created_at', 'DESC']],
        });
        return {
            success: true,
            data: {
                items,
                total,
                page,
                limit,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to get vehicles',
        };
    }
};
exports.getAdminVehicles = getAdminVehicles;
const updateVehicleStatus = async (id, status) => {
    try {
        const vehicle = await vehicles_models_1.Vehicle.findByPk(id);
        if (!vehicle)
            throw new Error('Vehicle not found');
        await vehicle.update({ status: status });
        return {
            success: true,
            message: 'Status updated successfully',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to update status',
        };
    }
};
exports.updateVehicleStatus = updateVehicleStatus;
const getStats = async () => {
    try {
        const usersCount = await vehicles_models_1.User.count();
        const vehiclesCount = await vehicles_models_1.Vehicle.count();
        const pending = await vehicles_models_1.Vehicle.count({ where: { status: 'pending' } });
        const approved = await vehicles_models_1.Vehicle.count({ where: { status: 'approved' } });
        return {
            success: true,
            data: {
                usersCount,
                vehiclesCount,
                pending,
                approved,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to get stats',
        };
    }
};
exports.getStats = getStats;
const forgotPassword = async (email) => {
    try {
        const normalizedEmail = email.trim().toLowerCase();
        const user = await vehicles_models_1.User.findOne({ where: { email: normalizedEmail } });
        if (!user) {
            return {
                success: true,
                message: 'If an account with that email exists, a reset link has been sent.',
            };
        }
        const resetToken = jsonwebtoken_1.default.sign({ id: user.id, type: 'reset' }, process.env.RESET_SECRET || process.env.JWT_SECRET, { expiresIn: '1h' });
        await (0, exports.sendPasswordResetEmail)(user.email, resetToken);
        return {
            success: true,
            message: 'Password reset link sent to your email.',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to send reset email',
        };
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (token, newPassword) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.RESET_SECRET || process.env.JWT_SECRET);
        if (decoded.type !== 'reset')
            throw new Error('Invalid token type');
        const user = await vehicles_models_1.User.findByPk(decoded.id);
        if (!user)
            throw new Error('User not found');
        const passwordHash = await (0, vehicles_helpers_1.hashPassword)(newPassword);
        await user.update({ password_hash: passwordHash });
        return {
            success: true,
            message: 'Password reset successfully',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Invalid or expired token',
        };
    }
};
exports.resetPassword = resetPassword;
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const html = `
    <h1>Verify Your Email</h1>
    <p>Click the link below to verify your email address:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `;
    await (0, exports.sendEmail)(email, 'Verify Your Email', html);
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const html = `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
  `;
    await (0, exports.sendEmail)(email, 'Reset Your Password', html);
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const createListing = async (userId, data) => {
    try {
        const { listing_type, vehicleData, features, files, keywords, discounts, ...listingData } = data;
        (0, vehicles_helpers_1.validateVehicleType)(listing_type, vehicleData);
        let latitude;
        let longitude;
        if (listingData.location) {
            const coords = await (0, vehicles_helpers_1.geocodeLocation)(listingData.location);
            latitude = coords.lat;
            longitude = coords.long;
        }
        const finalKeywords = keywords || (0, vehicles_helpers_1.generateKeywords)(listingData.title, listingData.description || '');
        const result = await vehicles_models_1.Listing.sequelize.transaction(async (transaction) => {
            const listing = await vehicles_models_1.Listing.create({
                listing_type,
                user_id: userId,
                title: listingData.title,
                price: listingData.price,
                currency: listingData.currency || 'USD',
                status: 'draft',
            }, { transaction });
            if (listingData.description || listingData.location || latitude || longitude) {
                const updateData = {};
                if (listingData.description)
                    updateData.description = listingData.description;
                if (listingData.location)
                    updateData.location = listingData.location;
                if (latitude)
                    updateData.latitude = latitude;
                if (longitude)
                    updateData.longitude = longitude;
                await listing.update(updateData, { transaction });
            }
            let subtype;
            switch (listing_type) {
                case 'car':
                    subtype = await vehicles_models_1.Car.create({ listing_id: listing.id, ...vehicleData }, { transaction });
                    break;
                case 'bike':
                    subtype = await vehicles_models_1.Bike.create({ listing_id: listing.id, ...vehicleData }, { transaction });
                    break;
                case 'haulage':
                    subtype = await vehicles_models_1.Haulage.create({ listing_id: listing.id, ...vehicleData }, { transaction });
                    break;
                case 'spare_part':
                    subtype = await vehicles_models_1.SparePart.create({ listing_id: listing.id, ...vehicleData }, { transaction });
                    break;
            }
            if (features && features.length > 0) {
                const featureData = features.map(f => ({ listing_id: listing.id, feature_id: f.featureId, custom_value: f.custom_value }));
                await vehicles_models_1.ListingFeature.bulkCreate(featureData, { transaction });
            }
            let mediaEntries = [];
            if (files && files.length > 0) {
                mediaEntries = await (0, vehicles_helpers_1.processMediaFiles)(files, listing.id);
            }
            if (finalKeywords.length > 0) {
                const keywordData = finalKeywords.map(k => ({ listing_id: listing.id, keyword: k, relevance_score: 1 }));
                await vehicles_models_1.Keyword.bulkCreate(keywordData, { transaction });
            }
            if (discounts && discounts.length > 0) {
                const discountData = discounts.map(d => ({ listing_id: listing.id, ...d }));
                await vehicles_models_1.Discount.bulkCreate(discountData, { transaction });
            }
            return { listing, subtype, mediaEntries };
        });
        return {
            success: true,
            message: 'Listing created successfully',
            data: result,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to create listing',
        };
    }
};
exports.createListing = createListing;
const updateListing = async (userId, listingId, data) => {
    try {
        const listing = await vehicles_models_1.Listing.findByPk(listingId);
        if (!listing)
            throw new Error('Listing not found');
        if (listing.user_id !== userId)
            throw new Error('Unauthorized');
        const { features, files, keywords, discounts, ...updateData } = data;
        if (updateData.location) {
            const coords = await (0, vehicles_helpers_1.geocodeLocation)(updateData.location);
            updateData.latitude = coords.lat;
            updateData.longitude = coords.long;
        }
        const result = await vehicles_models_1.Listing.sequelize.transaction(async (transaction) => {
            await listing.update(updateData, { transaction });
            if (features && features.length > 0) {
                const featureData = features.map(f => ({ listing_id: listing.id, feature_id: f.featureId, custom_value: f.custom_value }));
                await vehicles_models_1.ListingFeature.bulkCreate(featureData, { transaction });
            }
            let mediaEntries = [];
            if (files && files.length > 0) {
                mediaEntries = await (0, vehicles_helpers_1.processMediaFiles)(files, listing.id);
            }
            if (keywords && keywords.length > 0) {
                const keywordData = keywords.map(k => ({ listing_id: listing.id, keyword: k, relevance_score: 1 }));
                await vehicles_models_1.Keyword.bulkCreate(keywordData, { transaction });
            }
            if (discounts && discounts.length > 0) {
                const discountData = discounts.map(d => ({ listing_id: listing.id, ...d }));
                await vehicles_models_1.Discount.bulkCreate(discountData, { transaction });
            }
            return { listing, mediaEntries };
        });
        return {
            success: true,
            message: 'Listing updated successfully',
            data: result,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to update listing',
        };
    }
};
exports.updateListing = updateListing;
const getUserListings = async (userId, query) => {
    try {
        const { type, status } = query || {};
        const where = { user_id: userId };
        if (type)
            where.listing_type = type;
        if (status)
            where.status = status;
        const listings = await vehicles_models_1.Listing.findAll({
            where,
            include: [
                {
                    model: vehicles_models_1.Car,
                    as: 'car',
                    required: false,
                },
                {
                    model: vehicles_models_1.Bike,
                    as: 'bike',
                    required: false,
                },
                {
                    model: vehicles_models_1.Haulage,
                    as: 'haulage',
                    required: false,
                },
                {
                    model: vehicles_models_1.SparePart,
                    as: 'sparePart',
                    required: false,
                },
                {
                    model: vehicles_models_1.Media,
                    as: 'media',
                    limit: 5,
                    order: [['sort_order', 'ASC']],
                },
                {
                    model: vehicles_models_1.ListingFeature,
                    as: 'features',
                    include: [{ model: vehicles_models_1.Feature, as: 'feature' }],
                },
                {
                    model: vehicles_models_1.Keyword,
                    as: 'keywords',
                },
                {
                    model: vehicles_models_1.Discount,
                    as: 'discounts',
                },
            ],
            order: [['created_at', 'DESC']],
        });
        return {
            success: true,
            data: listings,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to get listings',
        };
    }
};
exports.getUserListings = getUserListings;
const getListingById = async (listingId, includeOwner) => {
    try {
        const includeArray = [
            {
                model: vehicles_models_1.Car,
                as: 'car',
                required: false,
            },
            {
                model: vehicles_models_1.Bike,
                as: 'bike',
                required: false,
            },
            {
                model: vehicles_models_1.Haulage,
                as: 'haulage',
                required: false,
            },
            {
                model: vehicles_models_1.SparePart,
                as: 'sparePart',
                required: false,
            },
            {
                model: vehicles_models_1.Media,
                as: 'media',
                order: [['sort_order', 'ASC']],
            },
            {
                model: vehicles_models_1.ListingFeature,
                as: 'features',
                include: [{ model: vehicles_models_1.Feature, as: 'feature' }],
            },
            {
                model: vehicles_models_1.Keyword,
                as: 'keywords',
            },
            {
                model: vehicles_models_1.Discount,
                as: 'discounts',
            },
        ];
        if (includeOwner) {
            includeArray.push({
                model: vehicles_models_1.User,
                as: 'owner',
                attributes: ['id', 'full_name', 'email'],
            });
        }
        const listing = await vehicles_models_1.Listing.findByPk(listingId, {
            include: includeArray,
        });
        if (!listing)
            throw new Error('Listing not found');
        return {
            success: true,
            data: listing,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to get listing',
        };
    }
};
exports.getListingById = getListingById;
const deleteListing = async (userId, listingId) => {
    try {
        const listing = await vehicles_models_1.Listing.findByPk(listingId);
        if (!listing)
            throw new Error('Listing not found');
        if (listing.user_id !== userId)
            throw new Error('Unauthorized');
        await listing.destroy();
        return {
            success: true,
            message: 'Listing deleted successfully',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to delete listing',
        };
    }
};
exports.deleteListing = deleteListing;
const addListingFeatures = async (listingId, features) => {
    try {
        const featureData = features.map(f => ({ listing_id: listingId, feature_id: f.featureId, custom_value: f.custom_value }));
        await vehicles_models_1.ListingFeature.bulkCreate(featureData);
        return {
            success: true,
            message: 'Features added successfully',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to add features',
        };
    }
};
exports.addListingFeatures = addListingFeatures;
const addListingMedia = async (listingId, files) => {
    try {
        const mediaEntries = await (0, vehicles_helpers_1.processMediaFiles)(files, listingId);
        return {
            success: true,
            message: 'Media added successfully',
            data: mediaEntries,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to add media',
        };
    }
};
exports.addListingMedia = addListingMedia;
const createListingDiscount = async (listingId, discountData) => {
    try {
        const discount = await vehicles_models_1.Discount.create({ listing_id: listingId, ...discountData });
        return {
            success: true,
            message: 'Discount created successfully',
            data: discount,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to create discount',
        };
    }
};
exports.createListingDiscount = createListingDiscount;
const submitListing = async (listingId, userId) => {
    try {
        const listing = await vehicles_models_1.Listing.findByPk(listingId);
        if (!listing)
            throw new Error('Listing not found');
        if (listing.user_id !== userId)
            throw new Error('Unauthorized');
        await listing.update({ status: 'active' });
        const user = await vehicles_models_1.User.findByPk(listing.user_id);
        const userEmail = user?.email || '';
        await (0, exports.sendEmail)(userEmail, 'Listing Submitted', 'Your listing has been submitted for approval.');
        return {
            success: true,
            message: 'Listing submitted for approval',
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to submit listing',
        };
    }
};
exports.submitListing = submitListing;
