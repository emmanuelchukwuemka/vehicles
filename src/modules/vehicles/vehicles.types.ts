import { z } from 'zod';

// User types
export interface UserAttributes {
  id: number;
  email: string;
  password_hash: string;
  full_name: string | null;
  phone: string | null;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

// Vehicle types
export interface VehicleAttributes {
  id: number;
  user_id: number;
  title: string;
  brand: string;
  model: string | null;
  year: number | null;
  price: number;
  currency: string;
  mileage: number | null;
  condition: 'new' | 'used';
  transmission: 'manual' | 'automatic' | null;
  fuel_type: string | null;
  description: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  location: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface VehicleCreationAttributes extends Omit<VehicleAttributes, 'id' | 'created_at' | 'updated_at'> {}

// Vehicle Image types
export interface VehicleImageAttributes {
  id: number;
  vehicle_id: number | null;
  url: string;
  is_primary: boolean;
  created_at: Date;
}

export interface VehicleImageCreationAttributes extends Omit<VehicleImageAttributes, 'id' | 'created_at'> {}

// Favorite types
export interface FavoriteAttributes {
  id: number;
  user_id: number;
  vehicle_id: number;
}

export interface FavoriteCreationAttributes extends Omit<FavoriteAttributes, 'id'> {}

// Refresh Token types
export interface RefreshTokenAttributes {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Date;
}

export interface RefreshTokenCreationAttributes extends Omit<RefreshTokenAttributes, 'id' | 'created_at'> {}

// Input types
export interface RegisterInput {
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

// Zod schemas for validation
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const refreshSchema = z.object({
  refreshToken: z.string(),
});

export const logoutSchema = z.object({
  refreshToken: z.string(),
});

export const updateUserSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

// Vehicle schemas
export const createVehicleSchema = z.object({
  title: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().optional(),
  year: z.number().optional(),
  price: z.number().positive(),
  currency: z.string().default('USD'),
  mileage: z.number().optional(),
  condition: z.enum(['new', 'used']).default('used'),
  transmission: z.enum(['manual', 'automatic']).optional(),
  fuel_type: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
});

export const updateVehicleSchema = z.object({
  title: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  price: z.number().positive().optional(),
  currency: z.string().optional(),
  mileage: z.number().optional(),
  condition: z.enum(['new', 'used']).optional(),
  transmission: z.enum(['manual', 'automatic']).optional(),
  fuel_type: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
});

// Favorite schemas
export const addFavoriteSchema = z.object({
  vehicleId: z.number().positive(),
});

export const changeStatusSchema = z.object({
  status: z.enum(['approved', 'rejected', 'sold']),
});

// Listing types
export interface ListingAttributes {
  id: number;
  user_id: number;
  listing_type: 'car' | 'bike' | 'haulage' | 'spare_part';
  title: string;
  description?: string;
  price: number;
  currency: string;
  status: 'draft' | 'active' | 'inactive' | 'sold' | 'reserved';
  location?: string;
  latitude?: number;
  longitude?: number;
  view_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface ListingCreationAttributes extends Omit<ListingAttributes, 'id' | 'description' | 'location' | 'latitude' | 'longitude' | 'view_count' | 'created_at' | 'updated_at'> {}

// Car types
export interface CarAttributes {
  id: number;
  listing_id: number;
  make: string;
  model?: string;
  year?: number;
  mileage?: number;
  fuel_type?: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission?: 'manual' | 'automatic';
  engine_capacity?: number;
  body_type?: string;
  color?: string;
  condition: 'new' | 'used';
  created_at: Date;
  updated_at: Date;
}

export interface CarCreationAttributes extends Omit<CarAttributes, 'id' | 'model' | 'year' | 'mileage' | 'fuel_type' | 'transmission' | 'engine_capacity' | 'body_type' | 'color' | 'created_at' | 'updated_at'> {}

// Bike types
export interface BikeAttributes {
  id: number;
  listing_id: number;
  make: string;
  model?: string;
  year?: number;
  engine_capacity?: number;
  bike_type?: 'sport' | 'cruiser' | 'touring' | 'off-road' | 'scooter' | 'electric';
  mileage?: number;
  color?: string;
  condition: 'new' | 'used';
  created_at: Date;
  updated_at: Date;
}

export interface BikeCreationAttributes extends Omit<BikeAttributes, 'id' | 'model' | 'year' | 'engine_capacity' | 'bike_type' | 'mileage' | 'color' | 'created_at' | 'updated_at'> {}

// Haulage types
export interface HaulageAttributes {
  id: number;
  listing_id: number;
  make: string;
  model?: string;
  year?: number;
  axle_configuration?: string;
  engine_capacity?: number;
  body_type?: string;
  load_capacity?: number;
  mileage?: number;
  condition: 'new' | 'used';
  created_at: Date;
  updated_at: Date;
}

export interface HaulageCreationAttributes extends Omit<HaulageAttributes, 'id' | 'model' | 'year' | 'axle_configuration' | 'engine_capacity' | 'body_type' | 'load_capacity' | 'mileage' | 'created_at' | 'updated_at'> {}

// SparePart types
export interface SparePartAttributes {
  id: number;
  listing_id: number;
  category: string;
  brand?: string;
  part_number?: string;
  compatible_vehicles?: string;
  condition: 'new' | 'used' | 'refurbished';
  warranty?: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface SparePartCreationAttributes extends Omit<SparePartAttributes, 'id' | 'brand' | 'part_number' | 'compatible_vehicles' | 'warranty' | 'created_at' | 'updated_at'> {}

// Category types
export interface CategoryAttributes {
  id: number;
  name: string;
  description?: string;
  type: 'car' | 'bike' | 'haulage' | 'spare_part';
  parent_id?: number;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryCreationAttributes extends Omit<CategoryAttributes, 'id' | 'description' | 'parent_id' | 'sort_order' | 'is_active' | 'created_at' | 'updated_at'> {}

// Feature types
export interface FeatureAttributes {
  id: number;
  name: string;
  category: 'comfort' | 'safety' | 'sound' | 'performance' | 'utility';
  feature_type: 'boolean' | 'text' | 'number' | 'select';
  icon?: string;
  description?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FeatureCreationAttributes extends Omit<FeatureAttributes, 'id' | 'icon' | 'description' | 'is_active' | 'created_at' | 'updated_at'> {}

// ListingFeature types
export interface ListingFeatureAttributes {
  id: number;
  listing_id: number;
  feature_id: number;
  custom_value?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ListingFeatureCreationAttributes extends Omit<ListingFeatureAttributes, 'id' | 'custom_value' | 'created_at' | 'updated_at'> {}

// Media types
export interface MediaAttributes {
  id: number;
  listing_id: number;
  file_url: string;
  file_type: 'image' | 'video';
  file_size: number;
  dimensions?: string;
  is_primary: boolean;
  sort_order: number;
  alt_text?: string;
  created_at: Date;
  updated_at: Date;
}

export interface MediaCreationAttributes extends Omit<MediaAttributes, 'id' | 'is_primary' | 'sort_order' | 'alt_text' | 'created_at' | 'updated_at'> {}

// Keyword types
export interface KeywordAttributes {
  id: number;
  listing_id: number;
  keyword: string;
  relevance_score: number;
  created_at: Date;
}

export interface KeywordCreationAttributes extends Omit<KeywordAttributes, 'id' | 'relevance_score' | 'created_at'> {}

// Order types
export interface OrderAttributes {
  id: number;
  user_id: number;
  listing_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address?: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrderCreationAttributes extends Omit<OrderAttributes, 'id' | 'quantity' | 'shipping_address' | 'created_at' | 'updated_at'> {}

// OrderItem types
export interface OrderItemAttributes {
  id: number;
  order_id: number;
  listing_id: number;
  quantity: number;
  price: number;
  created_at: Date;
}

export interface OrderItemCreationAttributes extends Omit<OrderItemAttributes, 'id' | 'created_at'> {}

// Discount types
export interface DiscountAttributes {
  id: number;
  listing_id: number;
  discount_type: 'percentage' | 'fixed';
  value: number;
  min_quantity: number;
  start_date: Date;
  end_date: Date;
  usage_limit?: number;
  created_at: Date;
  updated_at: Date;
}

export interface DiscountCreationAttributes extends Omit<DiscountAttributes, 'id' | 'min_quantity' | 'usage_limit' | 'created_at' | 'updated_at'> {}

// Review types
export interface ReviewAttributes {
  id: number;
  order_id: number;
  rating: number;
  comment?: string;
  is_approved: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ReviewCreationAttributes extends Omit<ReviewAttributes, 'id' | 'comment' | 'is_approved' | 'created_at' | 'updated_at'> {}

// Message types
export interface MessageAttributes {
  id: number;
  sender_id: number;
  receiver_id: number;
  listing_id?: number;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MessageCreationAttributes extends Omit<MessageAttributes, 'id' | 'listing_id' | 'subject' | 'is_read' | 'created_at' | 'updated_at'> {}

// SavedSearch types
export interface SavedSearchAttributes {
  id: number;
  user_id: number;
  name: string;
  search_criteria: object;
  notification_enabled: boolean;
  last_notified_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SavedSearchCreationAttributes extends Omit<SavedSearchAttributes, 'id' | 'last_notified_at' | 'created_at' | 'updated_at'> {}

// Listing Input Types
export interface BaseListingInput {
  title: string;
  description?: string;
  price: number;
  currency?: string;
  location?: string;
  keywords?: string[];
  discounts?: DiscountInput[];
}

export interface CarInput {
  make: string;
  model?: string;
  year?: number;
  mileage?: number;
  fuel_type?: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission?: 'manual' | 'automatic';
  engine_capacity?: number;
  body_type?: string;
  color?: string;
  condition: 'new' | 'used';
}

export interface BikeInput {
  make: string;
  model?: string;
  year?: number;
  engine_capacity?: number;
  bike_type?: 'sport' | 'cruiser' | 'touring' | 'off-road' | 'scooter' | 'electric';
  mileage?: number;
  color?: string;
  condition: 'new' | 'used';
}

export interface HaulageInput {
  make: string;
  model?: string;
  year?: number;
  axle_configuration?: string;
  engine_capacity?: number;
  body_type?: string;
  load_capacity?: number;
  mileage?: number;
  condition: 'new' | 'used';
}

export interface SparePartInput {
  category: string;
  brand?: string;
  part_number?: string;
  compatible_vehicles?: string;
  condition: 'new' | 'used' | 'refurbished';
  warranty?: string;
  quantity: number;
}

export type VehicleSpecificInput = CarInput | BikeInput | HaulageInput | SparePartInput;

export interface ListingFeatureInput {
  featureId: number;
  custom_value?: string;
}

export interface DiscountInput {
  discount_type: 'percentage' | 'fixed';
  value: number;
  min_quantity?: number;
  start_date: Date;
  end_date: Date;
  usage_limit?: number;
}

export interface CreateListingInput extends BaseListingInput {
  listing_type: 'car' | 'bike' | 'haulage' | 'spare_part';
  vehicleData: VehicleSpecificInput;
  features: ListingFeatureInput[];
}

export interface UpdateListingInput {
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  features?: ListingFeatureInput[]; // For adding/updating
  keywords?: string[]; // For adding
  discounts?: DiscountInput[]; // For adding
  // Note: Media handled separately via files
}

// Zod Schemas for Listing
export const carInputSchema = z.object({
  make: z.string().min(1),
  model: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  mileage: z.number().min(0).optional(),
  fuel_type: z.enum(['petrol', 'diesel', 'electric', 'hybrid']).optional(),
  transmission: z.enum(['manual', 'automatic']).optional(),
  engine_capacity: z.number().min(0.1).max(10).optional(),
  body_type: z.string().optional(),
  color: z.string().optional(),
  condition: z.enum(['new', 'used']),
});

export const bikeInputSchema = z.object({
  make: z.string().min(1),
  model: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  engine_capacity: z.number().min(0.1).max(10).optional(),
  bike_type: z.enum(['sport', 'cruiser', 'touring', 'off-road', 'scooter', 'electric']).optional(),
  mileage: z.number().min(0).optional(),
  color: z.string().optional(),
  condition: z.enum(['new', 'used']),
});

export const haulageInputSchema = z.object({
  make: z.string().min(1),
  model: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  axle_configuration: z.string().optional(),
  engine_capacity: z.number().min(0.1).max(10).optional(),
  body_type: z.string().optional(),
  load_capacity: z.number().min(0).optional(),
  mileage: z.number().min(0).optional(),
  condition: z.enum(['new', 'used']),
});

export const sparePartInputSchema = z.object({
  category: z.string().min(1),
  brand: z.string().optional(),
  part_number: z.string().optional(),
  compatible_vehicles: z.string().optional(),
  condition: z.enum(['new', 'used', 'refurbished']),
  warranty: z.string().optional(),
  quantity: z.number().min(1),
});

export const listingFeatureInputSchema = z.object({
  featureId: z.number().positive(),
  custom_value: z.string().optional(),
});

export const discountInputSchema = z.object({
  discount_type: z.enum(['percentage', 'fixed']),
  value: z.number().positive(),
  min_quantity: z.number().min(1).optional(),
  start_date: z.date(),
  end_date: z.date(),
  usage_limit: z.number().min(0).optional(),
});

export const baseListingInputSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  price: z.number().positive(),
  currency: z.string().length(3).default('USD'),
  location: z.string().optional(),
  keywords: z.array(z.string().min(1).max(50)).max(20).optional(),
  discounts: z.array(discountInputSchema).max(5).optional(),
});

export const createListingSchema = z.discriminatedUnion('listing_type', [
  baseListingInputSchema.extend({
    listing_type: z.literal('car'),
    vehicleData: carInputSchema,
    features: z.array(listingFeatureInputSchema).min(1).max(50),
  }),
  baseListingInputSchema.extend({
    listing_type: z.literal('bike'),
    vehicleData: bikeInputSchema,
    features: z.array(listingFeatureInputSchema).min(1).max(50),
  }),
  baseListingInputSchema.extend({
    listing_type: z.literal('haulage'),
    vehicleData: haulageInputSchema,
    features: z.array(listingFeatureInputSchema).min(1).max(50),
  }),
  baseListingInputSchema.extend({
    listing_type: z.literal('spare_part'),
    vehicleData: sparePartInputSchema,
    features: z.array(listingFeatureInputSchema).min(1).max(50),
  }),
]);

export const updateListingSchema = baseListingInputSchema.partial().extend({
  features: z.array(listingFeatureInputSchema).optional(),
  keywords: z.array(z.string()).optional(),
  discounts: z.array(discountInputSchema).optional(),
});

export const addFeaturesSchema = z.object({
  features: z.array(listingFeatureInputSchema).min(1),
});

export const createDiscountSchema = discountInputSchema;

// Search listings by location schema
export const searchListingsByLocationSchema = z.object({
  location: z.string().min(1),
  radiusKm: z.number().positive().default(50),
  page: z.number().positive().default(1),
  limit: z.number().positive().max(100).default(20),
});
