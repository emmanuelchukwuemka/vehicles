import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { User, Media, Listing } from './vehicles.models';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (user: { id: number; email: string; role: string }): string => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: { id: number }): string => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET!, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string): any => {
  return jwt.verify(token, process.env.REFRESH_SECRET!);
};

export const hashRefreshToken = async (token: string): Promise<string> => {
  return await bcrypt.hash(token, 10);
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};

// Listing-specific helpers
export const processMediaFiles = async (files: Express.Multer.File[], listingId: number): Promise<Media[]> => {
  const uploadDir = process.env.UPLOAD_DIR || 'uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const mediaEntries: Media[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileType = file.mimetype.startsWith('image/') ? 'image' : 'video';
    const fileUrl = `/uploads/${file.filename}`;
    const fileSize = file.size;

    // Placeholder for dimensions (integrate sharp later if needed)
    const dimensions = fileType === 'image' ? '1920x1080' : undefined; // Mock dimensions

    const media = await Media.create({
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

export const geocodeLocation = async (location: string): Promise<{ lat: number; long: number }> => {
  // Placeholder: Return mock coordinates. Integrate google-maps-services-js for real geocoding.
  // Example: const client = new Client({}); const response = await client.geocode({ address: location });
  return { lat: 40.7128, long: -74.0060 }; // NYC mock
};

export const generateKeywords = (title: string, description: string): string[] => {
  const text = `${title} ${description}`.toLowerCase();
  const words = text.match(/\b\w{3,}\b/g) || []; // Extract words >= 3 chars
  const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'an', 'a', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them']);
  const filtered = words.filter(word => !commonWords.has(word));
  const unique = [...new Set(filtered)].slice(0, 20); // Max 20 unique keywords
  return unique;
};

export const validateVehicleType = (listingType: string, data: any): void => {
  const requiredFields: Record<string, string[]> = {
    car: ['make', 'condition'],
    bike: ['make', 'condition'],
    haulage: ['make', 'condition'],
    spare_part: ['category', 'condition'],
  };
  const fields = requiredFields[listingType];
  if (!fields) throw new Error(`Invalid listing type: ${listingType}`);
  for (const field of fields) {
    if (!data[field]) throw new Error(`Missing required field: ${field} for ${listingType}`);
  }
};

export const authenticateListingOwner = async (userId: number, listingId: number): Promise<boolean> => {
  const listing = await Listing.findByPk(listingId);
  return listing ? listing.user_id === userId : false;
};
