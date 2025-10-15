"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendVerificationEmail = exports.sendEmail = exports.resetPassword = exports.forgotPassword = exports.getStats = exports.updateVehicleStatus = exports.getAdminVehicles = exports.removeFavorite = exports.getFavorites = exports.addFavorite = exports.uploadImages = exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = exports.updateUserProfile = exports.getUserProfile = exports.logout = exports.refresh = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
const helpers_1 = require("./helpers");
const register = async (data) => {
    try {
        const { email, password, fullName } = data;
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await models_1.User.findOne({ where: { email: normalizedEmail } });
        if (existingUser)
            throw new Error('User already exists');
        const passwordHash = await (0, helpers_1.hashPassword)(password);
        const user = await models_1.User.create({
            email: normalizedEmail,
            password_hash: passwordHash,
            full_name: fullName || null,
            role: 'user',
            is_active: true,
        });
        const accessToken = (0, helpers_1.generateAccessToken)({ id: user.id, email: user.email, role: user.role });
        const refreshToken = (0, helpers_1.generateRefreshToken)({ id: user.id });
        const refreshTokenHash = await (0, helpers_1.hashRefreshToken)(refreshToken);
        await models_1.RefreshToken.create({
            user_id: user.id,
            token_hash: refreshTokenHash,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
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
        const user = await models_1.User.findOne({ where: { email: normalizedEmail } });
        if (!user)
            throw new Error('Invalid credentials');
        const isValid = await (0, helpers_1.verifyPassword)(password, user.password_hash);
        if (!isValid)
            throw new Error('Invalid credentials');
        const accessToken = (0, helpers_1.generateAccessToken)({ id: user.id, email: user.email, role: user.role });
        const refreshToken = (0, helpers_1.generateRefreshToken)({ id: user.id });
        const refreshTokenHash = await (0, helpers_1.hashRefreshToken)(refreshToken);
        await models_1.RefreshToken.create({
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
        const user = await (0, helpers_1.getUserById)(decoded.id);
        if (!user)
            throw new Error('User not found');
        const tokenRecord = await models_1.RefreshToken.findOne({
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
        // Rotate token
        const newAccessToken = (0, helpers_1.generateAccessToken)({ id: user.id, email: user.email, role: user.role });
        const newRefreshToken = (0, helpers_1.generateRefreshToken)({ id: user.id });
        // Revoke old
        await tokenRecord.update({ revoked_at: new Date() });
        // Create new
        const newTokenHash = await (0, helpers_1.hashRefreshToken)(newRefreshToken);
        await models_1.RefreshToken.create({
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
        await models_1.RefreshToken.update({ revoked_at: new Date() }, { where: { user_id: decoded.id, revoked_at: null } });
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
        const user = await (0, helpers_1.getUserById)(userId);
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
        const user = await (0, helpers_1.getUserById)(userId);
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
// Vehicle services
const createVehicle = async (userId, data) => {
    try {
        const vehicle = await models_1.Vehicle.create({
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
        const { rows: items, count: total } = await models_1.Vehicle.findAndCountAll({
            where,
            include: [
                {
                    model: models_1.VehicleImage,
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
        const vehicle = await models_1.Vehicle.findByPk(id, {
            include: [
                {
                    model: models_1.VehicleImage,
                    as: 'images',
                },
                {
                    model: models_1.User,
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
        const vehicle = await models_1.Vehicle.findByPk(id);
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
        const vehicle = await models_1.Vehicle.findByPk(id);
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
// Upload services
const uploadImages = async (files, vehicleId) => {
    try {
        const uploaded = [];
        for (const file of files) {
            const url = `/uploads/${file.filename}`;
            const image = await models_1.VehicleImage.create({
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
// Favorites services
const addFavorite = async (userId, vehicleId) => {
    try {
        const existing = await models_1.Favorite.findOne({ where: { user_id: userId, vehicle_id: vehicleId } });
        if (existing)
            throw new Error('Already in favorites');
        const favorite = await models_1.Favorite.create({ user_id: userId, vehicle_id: vehicleId });
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
        const favorites = await models_1.Favorite.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: models_1.Vehicle,
                    as: 'vehicle',
                    include: [
                        {
                            model: models_1.VehicleImage,
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
        const favorite = await models_1.Favorite.findByPk(id);
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
// Admin services
const getAdminVehicles = async (query) => {
    try {
        const { status, page = 1, limit = 20 } = query;
        const offset = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
        const { rows: items, count: total } = await models_1.Vehicle.findAndCountAll({
            where,
            include: [
                {
                    model: models_1.User,
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
        const vehicle = await models_1.Vehicle.findByPk(id);
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
        const usersCount = await models_1.User.count();
        const vehiclesCount = await models_1.Vehicle.count();
        const pending = await models_1.Vehicle.count({ where: { status: 'pending' } });
        const approved = await models_1.Vehicle.count({ where: { status: 'approved' } });
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
// Password reset services
const forgotPassword = async (email) => {
    try {
        const normalizedEmail = email.trim().toLowerCase();
        const user = await models_1.User.findOne({ where: { email: normalizedEmail } });
        if (!user) {
            // Don't reveal if user exists
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
        const user = await models_1.User.findByPk(decoded.id);
        if (!user)
            throw new Error('User not found');
        const passwordHash = await (0, helpers_1.hashPassword)(newPassword);
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
// Email services
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
