import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { Op, Transaction } from 'sequelize';
import { User, RefreshToken, Vehicle, VehicleImage, Favorite, Listing, Car, Bike, Haulage, SparePart, ListingFeature, Media, Keyword, Discount, Feature } from './vehicles.models';
import { hashPassword, verifyPassword, generateAccessToken, generateRefreshToken, hashRefreshToken, getUserById, processMediaFiles, geocodeLocation, generateKeywords, validateVehicleType, authenticateListingOwner } from './vehicles.helpers';
import { RegisterInput, LoginInput, CreateListingInput, UpdateListingInput, CarInput, BikeInput, HaulageInput, SparePartInput } from './vehicles.types';

export const register = async (data: RegisterInput) => {
  try {
    const { email, password, fullName } = data;
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) throw new Error('User already exists');

    const passwordHash = await hashPassword(password);
    const user = await User.create({
      email: normalizedEmail,
      password_hash: passwordHash,
      full_name: fullName || null,
      role: 'user',
      is_active: true,
    });

    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    const refreshTokenHash = await hashRefreshToken(refreshToken);
    await RefreshToken.create({
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Registration failed',
    };
  }
};

export const login = async (data: LoginInput) => {
  try {
    const { email, password } = data;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) throw new Error('Invalid credentials');

    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    const refreshTokenHash = await hashRefreshToken(refreshToken);
    await RefreshToken.create({
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Login failed',
    };
  }
};

export const refresh = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as { id: number };
    const user = await getUserById(decoded.id);
    if (!user) throw new Error('User not found');

    const tokenRecord = await RefreshToken.findOne({
      where: {
        user_id: user.id,
        revoked_at: null,
      },
    });
    if (!tokenRecord) throw new Error('Invalid refresh token');

    const isValid = await bcrypt.compare(refreshToken, tokenRecord.token_hash);
    if (!isValid) throw new Error('Invalid refresh token');

    // Rotate token
    const newAccessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user.id });

    // Revoke old
    await tokenRecord.update({ revoked_at: new Date() });

    // Create new
    const newTokenHash = await hashRefreshToken(newRefreshToken);
    await RefreshToken.create({
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Refresh failed',
    };
  }
};

export const logout = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as { id: number };
    await RefreshToken.update(
      { revoked_at: new Date() },
      { where: { user_id: decoded.id, revoked_at: null } }
    );

    return {
      success: true,
      message: 'Logged out successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Logout failed',
    };
  }
};

export const getUserProfile = async (userId: number) => {
  try {
    const user = await getUserById(userId);
    if (!user) throw new Error('User not found');

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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get profile',
    };
  }
};

export const updateUserProfile = async (userId: number, data: { fullName?: string; phone?: string }) => {
  try {
    const user = await getUserById(userId);
    if (!user) throw new Error('User not found');

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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to update profile',
    };
  }
};

// Vehicle services
export const createVehicle = async (userId: number, data: any) => {
  try {
    const vehicle = await Vehicle.create({
      ...data,
      user_id: userId,
      status: 'pending',
    });

    return {
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to create vehicle',
    };
  }
};

export const getVehicles = async (query: any) => {
  try {
    const { page = 1, limit = 20, q, brand, minPrice, maxPrice, year, condition, sort } = query;
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 20;
    const offset = (pageNum - 1) * limitNum;

    const where: any = { status: 'approved' };
    if (q) where[Op.or] = [
      { title: { [Op.like]: `%${q}%` } },
      { brand: { [Op.like]: `%${q}%` } },
      { description: { [Op.like]: `%${q}%` } },
    ];
    if (brand) where.brand = brand;
    if (minPrice) where.price = { ...where.price, [Op.gte]: minPrice };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice };
    if (year) where.year = year;
    if (condition) where.condition = condition;

    const order: any = [['created_at', 'DESC']];
    if (sort) {
      const [field, dir] = sort.split(':');
      order.unshift([field, dir.toUpperCase()]);
    }

    const { rows: items, count: total } = await Vehicle.findAndCountAll({
      where,
      include: [
        {
          model: VehicleImage,
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get vehicles',
    };
  }
};

export const getVehicleById = async (id: number) => {
  try {
    const vehicle = await Vehicle.findByPk(id, {
      include: [
        {
          model: VehicleImage,
          as: 'images',
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name'],
        },
      ],
    });
    if (!vehicle) throw new Error('Vehicle not found');

    return {
      success: true,
      data: vehicle,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get vehicle',
    };
  }
};

export const updateVehicle = async (userId: number, id: number, data: any, isAdmin: boolean) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) throw new Error('Vehicle not found');

    if (!isAdmin && vehicle.user_id !== userId) throw new Error('Unauthorized');

    const keyFields = ['price', 'description'];
    const hasKeyChange = keyFields.some(field => data[field] !== undefined && data[field] !== vehicle[field as keyof Vehicle]);

    if (hasKeyChange && !isAdmin) {
      data.status = 'pending';
    }

    await vehicle.update(data);

    return {
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to update vehicle',
    };
  }
};

export const deleteVehicle = async (userId: number, id: number, isAdmin: boolean) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) throw new Error('Vehicle not found');

    if (!isAdmin && vehicle.user_id !== userId) throw new Error('Unauthorized');

    await vehicle.destroy();

    return {
      success: true,
      message: 'Vehicle deleted successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to delete vehicle',
    };
  }
};

// Upload services
export const uploadImages = async (files: any[], vehicleId?: number) => {
  try {
    const uploaded = [];
    for (const file of files) {
      const url = `/uploads/${file.filename}`;
      const image = await VehicleImage.create({
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to upload images',
    };
  }
};

// Favorites services
export const addFavorite = async (userId: number, vehicleId: number) => {
  try {
    const existing = await Favorite.findOne({ where: { user_id: userId, vehicle_id: vehicleId } });
    if (existing) throw new Error('Already in favorites');

    const favorite = await Favorite.create({ user_id: userId, vehicle_id: vehicleId });

    return {
      success: true,
      message: 'Added to favorites',
      data: favorite,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to add favorite',
    };
  }
};

export const getFavorites = async (userId: number) => {
  try {
    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Vehicle,
          as: 'vehicle',
          include: [
            {
              model: VehicleImage,
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
      data: favorites.map((f: any) => f.vehicle),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get favorites',
    };
  }
};

export const removeFavorite = async (userId: number, id: number) => {
  try {
    const favorite = await Favorite.findByPk(id);
    if (!favorite || favorite.user_id !== userId) throw new Error('Favorite not found');

    await favorite.destroy();

    return {
      success: true,
      message: 'Removed from favorites',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to remove favorite',
    };
  }
};

// Admin services
export const getAdminVehicles = async (query: any) => {
  try {
    const { status, page = 1, limit = 20 } = query;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;

    const { rows: items, count: total } = await Vehicle.findAndCountAll({
      where,
      include: [
        {
          model: User,
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get vehicles',
    };
  }
};

export const updateVehicleStatus = async (id: number, status: string) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) throw new Error('Vehicle not found');

    await vehicle.update({ status: status as 'pending' | 'approved' | 'rejected' | 'sold' });

    return {
      success: true,
      message: 'Status updated successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to update status',
    };
  }
};

export const getStats = async () => {
  try {
    const usersCount = await User.count();
    const vehiclesCount = await Vehicle.count();
    const pending = await Vehicle.count({ where: { status: 'pending' } });
    const approved = await Vehicle.count({ where: { status: 'approved' } });

    return {
      success: true,
      data: {
        usersCount,
        vehiclesCount,
        pending,
        approved,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get stats',
    };
  }
};

// Password reset services
export const forgotPassword = async (email: string) => {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      // Don't reveal if user exists
      return {
        success: true,
        message: 'If an account with that email exists, a reset link has been sent.',
      };
    }

    const resetToken = jwt.sign(
      { id: user.id, type: 'reset' },
      process.env.RESET_SECRET || process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    await sendPasswordResetEmail(user.email, resetToken);

    return {
      success: true,
      message: 'Password reset link sent to your email.',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to send reset email',
    };
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const decoded = jwt.verify(token, process.env.RESET_SECRET || process.env.JWT_SECRET!) as { id: number; type: string };
    if (decoded.type !== 'reset') throw new Error('Invalid token type');

    const user = await User.findByPk(decoded.id);
    if (!user) throw new Error('User not found');

    const passwordHash = await hashPassword(newPassword);
    await user.update({ password_hash: passwordHash });

    return {
      success: true,
      message: 'Password reset successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Invalid or expired token',
    };
  }
};

// Email services
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const html = `
    <h1>Verify Your Email</h1>
    <p>Click the link below to verify your email address:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `;
  await sendEmail(email, 'Verify Your Email', html);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const html = `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
  `;
  await sendEmail(email, 'Reset Your Password', html);
};

// Listing services
export const createListing = async (userId: number, data: CreateListingInput & { files?: Express.Multer.File[] }) => {
  try {
    const { listing_type, vehicleData, features, files, keywords, discounts, ...listingData } = data;

    // Validate vehicle type
    validateVehicleType(listing_type, vehicleData);

    // Geocode location if provided
    let latitude: number | undefined;
    let longitude: number | undefined;
    if (listingData.location) {
      const coords = await geocodeLocation(listingData.location);
      latitude = coords.lat;
      longitude = coords.long;
    }

    // Generate keywords if not provided
    const finalKeywords = keywords || generateKeywords(listingData.title, listingData.description || '');

    const result = await Listing.sequelize!.transaction(async (transaction: Transaction) => {
      // Create listing
      const listing = await Listing.create({
        listing_type,
        user_id: userId,
        title: listingData.title,
        price: listingData.price,
        currency: listingData.currency || 'USD',
        status: 'draft',
      }, { transaction });

      // Update with optional fields if provided
      if (listingData.description || listingData.location || latitude || longitude) {
        const updateData: any = {};
        if (listingData.description) updateData.description = listingData.description;
        if (listingData.location) updateData.location = listingData.location;
        if (latitude) updateData.latitude = latitude;
        if (longitude) updateData.longitude = longitude;
        await listing.update(updateData, { transaction });
      }

      // Create subtype
      let subtype;
      switch (listing_type) {
        case 'car':
          subtype = await Car.create({ listing_id: listing.id, ...(vehicleData as CarInput) }, { transaction });
          break;
        case 'bike':
          subtype = await Bike.create({ listing_id: listing.id, ...(vehicleData as BikeInput) }, { transaction });
          break;
        case 'haulage':
          subtype = await Haulage.create({ listing_id: listing.id, ...(vehicleData as HaulageInput) }, { transaction });
          break;
        case 'spare_part':
          subtype = await SparePart.create({ listing_id: listing.id, ...(vehicleData as SparePartInput) }, { transaction });
          break;
      }

      // Bulk create features
      if (features && features.length > 0) {
        const featureData = features.map(f => ({ listing_id: listing.id, feature_id: f.featureId, custom_value: f.custom_value }));
        await ListingFeature.bulkCreate(featureData, { transaction });
      }

      // Process media files
      let mediaEntries: Media[] = [];
      if (files && files.length > 0) {
        mediaEntries = await processMediaFiles(files, listing.id);
      }

      // Bulk create keywords
      if (finalKeywords.length > 0) {
        const keywordData = finalKeywords.map(k => ({ listing_id: listing.id, keyword: k, relevance_score: 1 }));
        await Keyword.bulkCreate(keywordData, { transaction });
      }

      // Bulk create discounts
      if (discounts && discounts.length > 0) {
        const discountData = discounts.map(d => ({ listing_id: listing.id, ...d }));
        await Discount.bulkCreate(discountData, { transaction });
      }

      return { listing, subtype, mediaEntries };
    });

    return {
      success: true,
      message: 'Listing created successfully',
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to create listing',
    };
  }
};

export const updateListing = async (userId: number, listingId: number, data: UpdateListingInput & { files?: Express.Multer.File[] }) => {
  try {
    const listing = await Listing.findByPk(listingId);
    if (!listing) throw new Error('Listing not found');
    if (listing.user_id !== userId) throw new Error('Unauthorized');

    const { features, files, keywords, discounts, ...updateData } = data;

    // Geocode location if provided
    if (updateData.location) {
      const coords = await geocodeLocation(updateData.location);
      (updateData as any).latitude = coords.lat;
      (updateData as any).longitude = coords.long;
    }

    const result = await Listing.sequelize!.transaction(async (transaction: Transaction) => {
      // Update listing
      await listing.update(updateData, { transaction });

      // Add new features if provided
      if (features && features.length > 0) {
        const featureData = features.map(f => ({ listing_id: listing.id, feature_id: f.featureId, custom_value: f.custom_value }));
        await ListingFeature.bulkCreate(featureData, { transaction });
      }

      // Process new media files
      let mediaEntries: Media[] = [];
      if (files && files.length > 0) {
        mediaEntries = await processMediaFiles(files, listing.id);
      }

      // Add new keywords if provided
      if (keywords && keywords.length > 0) {
        const keywordData = keywords.map(k => ({ listing_id: listing.id, keyword: k, relevance_score: 1 }));
        await Keyword.bulkCreate(keywordData, { transaction });
      }

      // Add new discounts if provided
      if (discounts && discounts.length > 0) {
        const discountData = discounts.map(d => ({ listing_id: listing.id, ...d }));
        await Discount.bulkCreate(discountData, { transaction });
      }

      return { listing, mediaEntries };
    });

    return {
      success: true,
      message: 'Listing updated successfully',
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to update listing',
    };
  }
};

export const getAllListings = async (query?: { type?: string; status?: string; page?: number; limit?: number }) => {
  try {
    const { type, status, page = 1, limit = 20 } = query || {};
    const pageNum = parseInt(page as any) || 1;
    const limitNum = parseInt(limit as any) || 20;
    const offset = (pageNum - 1) * limitNum;

    const where: any = { status: 'active' };
    if (type) where.listing_type = type;
    if (status) where.status = status;

    const { rows: listings, count: total } = await Listing.findAndCountAll({
      where,
      include: [
        {
          model: Car,
          as: 'car',
          required: false,
        },
        {
          model: Bike,
          as: 'bike',
          required: false,
        },
        {
          model: Haulage,
          as: 'haulage',
          required: false,
        },
        {
          model: SparePart,
          as: 'sparePart',
          required: false,
        },
        {
          model: Media,
          as: 'media',
          limit: 5,
          order: [['sort_order', 'ASC']],
        },
        {
          model: ListingFeature,
          as: 'features',
          include: [{ model: Feature, as: 'feature' }],
        },
        {
          model: Keyword,
          as: 'keywords',
        },
        {
          model: Discount,
          as: 'discounts',
        },
      ],
      limit: limitNum,
      offset,
      order: [['created_at', 'DESC']],
    });

    return {
      success: true,
      data: {
        items: listings,
        total,
        page: pageNum,
        limit: limitNum,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get listings',
    };
  }
};

export const getUserListings = async (userId: number, query?: { type?: string; status?: string }) => {
  try {
    const { type, status } = query || {};
    const where: any = { user_id: userId };
    if (type) where.listing_type = type;
    if (status) where.status = status;

    const listings = await Listing.findAll({
      where,
      include: [
        {
          model: Car,
          as: 'car',
          required: false,
        },
        {
          model: Bike,
          as: 'bike',
          required: false,
        },
        {
          model: Haulage,
          as: 'haulage',
          required: false,
        },
        {
          model: SparePart,
          as: 'sparePart',
          required: false,
        },
        {
          model: Media,
          as: 'media',
          limit: 5,
          order: [['sort_order', 'ASC']],
        },
        {
          model: ListingFeature,
          as: 'features',
          include: [{ model: Feature, as: 'feature' }],
        },
        {
          model: Keyword,
          as: 'keywords',
        },
        {
          model: Discount,
          as: 'discounts',
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return {
      success: true,
      data: listings,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get listings',
    };
  }
};

export const getListingById = async (listingId: number, includeOwner?: boolean) => {
  try {
    const includeArray: any[] = [
      {
        model: Car,
        as: 'car',
        required: false,
      },
      {
        model: Bike,
        as: 'bike',
        required: false,
      },
      {
        model: Haulage,
        as: 'haulage',
        required: false,
      },
      {
        model: SparePart,
        as: 'sparePart',
        required: false,
      },
      {
        model: Media,
        as: 'media',
        order: [['sort_order', 'ASC']],
      },
      {
        model: ListingFeature,
        as: 'features',
        include: [{ model: Feature, as: 'feature' }],
      },
      {
        model: Keyword,
        as: 'keywords',
      },
      {
        model: Discount,
        as: 'discounts',
      },
    ];

    if (includeOwner) {
      includeArray.push({
        model: User,
        as: 'owner',
        attributes: ['id', 'full_name', 'email'],
      });
    }

    const listing = await Listing.findByPk(listingId, {
      include: includeArray,
    });

    if (!listing) throw new Error('Listing not found');

    return {
      success: true,
      data: listing,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to get listing',
    };
  }
};

export const deleteListing = async (userId: number, listingId: number) => {
  try {
    const listing = await Listing.findByPk(listingId);
    if (!listing) throw new Error('Listing not found');
    if (listing.user_id !== userId) throw new Error('Unauthorized');

    await listing.destroy();

    return {
      success: true,
      message: 'Listing deleted successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to delete listing',
    };
  }
};

export const addListingFeatures = async (listingId: number, features: { featureId: number; custom_value?: string }[]) => {
  try {
    const featureData = features.map(f => ({ listing_id: listingId, feature_id: f.featureId, custom_value: f.custom_value }));
    await ListingFeature.bulkCreate(featureData);

    return {
      success: true,
      message: 'Features added successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to add features',
    };
  }
};

export const addListingMedia = async (listingId: number, files: Express.Multer.File[]) => {
  try {
    const mediaEntries = await processMediaFiles(files, listingId);

    return {
      success: true,
      message: 'Media added successfully',
      data: mediaEntries,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to add media',
    };
  }
};

export const createListingDiscount = async (listingId: number, discountData: any) => {
  try {
    const discount = await Discount.create({ listing_id: listingId, ...discountData });

    return {
      success: true,
      message: 'Discount created successfully',
      data: discount,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to create discount',
    };
  }
};

export const submitListing = async (listingId: number, userId: number) => {
  try {
    const listing = await Listing.findByPk(listingId);
    if (!listing) throw new Error('Listing not found');
    if (listing.user_id !== userId) throw new Error('Unauthorized');

    await listing.update({ status: 'active' });

    // Get user email to send notification
    const user = await User.findByPk(listing.user_id);
    const userEmail = user?.email || '';

    // Send approval email (placeholder)
    await sendEmail(userEmail, 'Listing Submitted', 'Your listing has been submitted for approval.');

    return {
      success: true,
      message: 'Listing submitted for approval',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to submit listing',
    };
  }
};
