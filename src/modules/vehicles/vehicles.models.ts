import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database/sequelize';
import {
  UserAttributes, UserCreationAttributes,
  VehicleAttributes, VehicleCreationAttributes,
  VehicleImageAttributes, VehicleImageCreationAttributes,
  FavoriteAttributes, FavoriteCreationAttributes,
  RefreshTokenAttributes, RefreshTokenCreationAttributes,
  ListingAttributes, ListingCreationAttributes,
  CarAttributes, CarCreationAttributes,
  BikeAttributes, BikeCreationAttributes,
  HaulageAttributes, HaulageCreationAttributes,
  SparePartAttributes, SparePartCreationAttributes,
  CategoryAttributes, CategoryCreationAttributes,
  FeatureAttributes, FeatureCreationAttributes,
  ListingFeatureAttributes, ListingFeatureCreationAttributes,
  MediaAttributes, MediaCreationAttributes,
  KeywordAttributes, KeywordCreationAttributes,
  OrderAttributes, OrderCreationAttributes,
  OrderItemAttributes, OrderItemCreationAttributes,
  DiscountAttributes, DiscountCreationAttributes,
  ReviewAttributes, ReviewCreationAttributes,
  MessageAttributes, MessageCreationAttributes,
  SavedSearchAttributes, SavedSearchCreationAttributes
} from './vehicles.types';

// Association interfaces
interface UserAssociations {
  vehicles?: Vehicle[];
  favorites?: Favorite[];
  refreshTokens?: RefreshToken[];
  listings?: Listing[];
  orders?: Order[];
  sentMessages?: Message[];
  receivedMessages?: Message[];
  savedSearches?: SavedSearch[];
}

interface VehicleAssociations {
  owner?: User;
  images?: VehicleImage[];
  favorites?: Favorite[];
}

interface VehicleImageAssociations {
  vehicle?: Vehicle;
}

interface FavoriteAssociations {
  user?: User;
  vehicle?: Vehicle;
}

interface RefreshTokenAssociations {
  user?: User;
}

interface ListingAssociations {
  owner?: User;
  car?: Car;
  bike?: Bike;
  haulage?: Haulage;
  sparePart?: SparePart;
  media?: Media[];
  keywords?: Keyword[];
  features?: ListingFeature[];
  orders?: Order[];
  discounts?: Discount[];
  messages?: Message[];
}

interface CarAssociations {
  listing?: Listing;
}

interface BikeAssociations {
  listing?: Listing;
}

interface HaulageAssociations {
  listing?: Listing;
}

interface SparePartAssociations {
  listing?: Listing;
}

interface CategoryAssociations {
  parent?: Category;
  children?: Category[];
}

interface FeatureAssociations {
  listingFeatures?: ListingFeature[];
}

interface ListingFeatureAssociations {
  listing?: Listing;
  feature?: Feature;
}

interface MediaAssociations {
  listing?: Listing;
}

interface KeywordAssociations {
  listing?: Listing;
}

interface OrderAssociations {
  buyer?: User;
  listing?: Listing;
  items?: OrderItem[];
  review?: Review;
}

interface OrderItemAssociations {
  order?: Order;
  listing?: Listing;
}

interface DiscountAssociations {
  listing?: Listing;
}

interface ReviewAssociations {
  order?: Order;
}

interface MessageAssociations {
  sender?: User;
  receiver?: User;
  listing?: Listing;
}

interface SavedSearchAssociations {
  user?: User;
}

// User Model
export class User extends Model<UserAttributes & UserAssociations, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password_hash!: string;
  public full_name!: string | null;
  public phone!: string | null;
  public role!: 'user' | 'admin';
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Association mixins
  public readonly vehicles?: Vehicle[];
  public readonly favorites?: Favorite[];
  public readonly refreshTokens?: RefreshToken[];
  public readonly listings?: Listing[];
  public readonly orders?: Order[];
  public readonly sentMessages?: Message[];
  public readonly receivedMessages?: Message[];
  public readonly savedSearches?: SavedSearch[];
}

User.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    full_name: { type: DataTypes.STRING(255), allowNull: true },
    phone: { type: DataTypes.STRING(50), allowNull: true },
    role: { type: DataTypes.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user' },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Vehicle Model
export class Vehicle extends Model<VehicleAttributes & VehicleAssociations, VehicleCreationAttributes> implements VehicleAttributes {
  public id!: number;
  public user_id!: number;
  public title!: string;
  public brand!: string;
  public model!: string | null;
  public year!: number | null;
  public price!: number;
  public currency!: string;
  public mileage!: number | null;
  public condition!: 'new' | 'used';
  public transmission!: 'manual' | 'automatic' | null;
  public fuel_type!: string | null;
  public description!: string | null;
  public status!: 'pending' | 'approved' | 'rejected' | 'sold';
  public location!: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Association mixins
  public readonly owner?: User;
  public readonly images?: VehicleImage[];
  public readonly favorites?: Favorite[];
}

Vehicle.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    title: { type: DataTypes.STRING(255), allowNull: false },
    brand: { type: DataTypes.STRING(100), allowNull: false },
    model: { type: DataTypes.STRING(100), allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: true },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: DataTypes.CHAR(3), allowNull: false, defaultValue: 'USD' },
    mileage: { type: DataTypes.INTEGER, allowNull: true },
    condition: { type: DataTypes.ENUM('new', 'used'), allowNull: false, defaultValue: 'used' },
    transmission: { type: DataTypes.ENUM('manual', 'automatic'), allowNull: true },
    fuel_type: { type: DataTypes.STRING(50), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected', 'sold'), allowNull: false, defaultValue: 'pending' },
    location: { type: DataTypes.STRING(255), allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'vehicles',
    modelName: 'Vehicle',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['brand'] },
      { fields: ['year'] },
      { fields: ['price'] },
      { fields: ['title', 'description'], type: 'FULLTEXT' },
    ],
  }
);

// Vehicle Image Model
export class VehicleImage extends Model<VehicleImageAttributes & VehicleImageAssociations, VehicleImageCreationAttributes> implements VehicleImageAttributes {
  public id!: number;
  public vehicle_id!: number | null;
  public url!: string;
  public is_primary!: boolean;
  public readonly created_at!: Date;
}

VehicleImage.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    vehicle_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: Vehicle, key: 'id' } },
    url: { type: DataTypes.STRING(1024), allowNull: false },
    is_primary: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'vehicle_images',
    modelName: 'VehicleImage',
    timestamps: false,
  }
);

// Favorite Model
export class Favorite extends Model<FavoriteAttributes & FavoriteAssociations, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public user_id!: number;
  public vehicle_id!: number;
}

Favorite.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    vehicle_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Vehicle, key: 'id' } },
  },
  {
    sequelize,
    tableName: 'favorites',
    modelName: 'Favorite',
    timestamps: false,
    indexes: [
      { fields: ['user_id', 'vehicle_id'], unique: true },
    ],
  }
);

// Refresh Token Model
export class RefreshToken extends Model<RefreshTokenAttributes & RefreshTokenAssociations, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
  public id!: number;
  public user_id!: number;
  public token_hash!: string;
  public expires_at!: Date;
  public revoked_at!: Date | null;
  public readonly created_at!: Date;
}

RefreshToken.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    token_hash: { type: DataTypes.STRING(255), allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    revoked_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'refresh_tokens',
    modelName: 'RefreshToken',
    timestamps: false,
  }
);

// Listing Model
export class Listing extends Model<ListingAttributes & ListingAssociations, ListingCreationAttributes> implements ListingAttributes {
  public id!: number;
  public user_id!: number;
  public listing_type!: 'car' | 'bike' | 'haulage' | 'spare_part';
  public title!: string;
  public description?: string;
  public price!: number;
  public currency!: string;
  public status!: 'draft' | 'active' | 'inactive' | 'sold' | 'reserved';
  public location?: string;
  public latitude?: number;
  public longitude?: number;
  public view_count!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Listing.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    listing_type: { type: DataTypes.ENUM('car', 'bike', 'haulage', 'spare_part'), allowNull: false },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: DataTypes.CHAR(3), allowNull: false, defaultValue: 'USD' },
    status: { type: DataTypes.ENUM('draft', 'active', 'inactive', 'sold', 'reserved'), allowNull: false, defaultValue: 'draft' },
    location: { type: DataTypes.STRING(255), allowNull: true },
    latitude: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    longitude: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    view_count: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'listings',
    modelName: 'Listing',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['listing_type'] },
      { fields: ['status'] },
      { fields: ['price'] },
      { fields: ['location'] },
      { fields: ['latitude', 'longitude'] },
      { fields: ['title', 'description'], type: 'FULLTEXT' },
    ],
  }
);

// Car Model
export class Car extends Model<CarAttributes & CarAssociations, CarCreationAttributes> implements CarAttributes {
  public id!: number;
  public listing_id!: number;
  public make!: string;
  public model?: string;
  public year?: number;
  public mileage?: number;
  public fuel_type?: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  public transmission?: 'manual' | 'automatic';
  public engine_capacity?: number;
  public body_type?: string;
  public color?: string;
  public condition!: 'new' | 'used';
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Car.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    make: { type: DataTypes.STRING(100), allowNull: false },
    model: { type: DataTypes.STRING(100), allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: true },
    mileage: { type: DataTypes.INTEGER, allowNull: true },
    fuel_type: { type: DataTypes.ENUM('petrol', 'diesel', 'electric', 'hybrid'), allowNull: true },
    transmission: { type: DataTypes.ENUM('manual', 'automatic'), allowNull: true },
    engine_capacity: { type: DataTypes.DECIMAL(4, 2), allowNull: true },
    body_type: { type: DataTypes.STRING(50), allowNull: true },
    color: { type: DataTypes.STRING(50), allowNull: true },
    condition: { type: DataTypes.ENUM('new', 'used'), allowNull: false, defaultValue: 'used' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'cars',
    modelName: 'Car',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['listing_id'], unique: true },
      { fields: ['make'] },
      { fields: ['model'] },
      { fields: ['year'] },
    ],
  }
);

// Bike Model
export class Bike extends Model<BikeAttributes & BikeAssociations, BikeCreationAttributes> implements BikeAttributes {
  public id!: number;
  public listing_id!: number;
  public make!: string;
  public model?: string;
  public year?: number;
  public engine_capacity?: number;
  public bike_type?: 'sport' | 'cruiser' | 'touring' | 'off-road' | 'scooter' | 'electric';
  public mileage?: number;
  public color?: string;
  public condition!: 'new' | 'used';
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Bike.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    make: { type: DataTypes.STRING(100), allowNull: false },
    model: { type: DataTypes.STRING(100), allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: true },
    engine_capacity: { type: DataTypes.DECIMAL(4, 2), allowNull: true },
    bike_type: { type: DataTypes.ENUM('sport', 'cruiser', 'touring', 'off-road', 'scooter', 'electric'), allowNull: true },
    mileage: { type: DataTypes.INTEGER, allowNull: true },
    color: { type: DataTypes.STRING(50), allowNull: true },
    condition: { type: DataTypes.ENUM('new', 'used'), allowNull: false, defaultValue: 'used' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'bikes',
    modelName: 'Bike',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['listing_id'], unique: true },
      { fields: ['make'] },
      { fields: ['bike_type'] },
      { fields: ['year'] },
    ],
  }
);

// Haulage Model
export class Haulage extends Model<HaulageAttributes & HaulageAssociations, HaulageCreationAttributes> implements HaulageAttributes {
  public id!: number;
  public listing_id!: number;
  public make!: string;
  public model?: string;
  public year?: number;
  public axle_configuration?: string;
  public engine_capacity?: number;
  public body_type?: string;
  public load_capacity?: number;
  public mileage?: number;
  public condition!: 'new' | 'used';
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Haulage.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    make: { type: DataTypes.STRING(100), allowNull: false },
    model: { type: DataTypes.STRING(100), allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: true },
    axle_configuration: { type: DataTypes.STRING(50), allowNull: true },
    engine_capacity: { type: DataTypes.DECIMAL(4, 2), allowNull: true },
    body_type: { type: DataTypes.STRING(50), allowNull: true },
    load_capacity: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
    mileage: { type: DataTypes.INTEGER, allowNull: true },
    condition: { type: DataTypes.ENUM('new', 'used'), allowNull: false, defaultValue: 'used' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'haulage',
    modelName: 'Haulage',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['listing_id'], unique: true },
      { fields: ['make'] },
      { fields: ['body_type'] },
      { fields: ['year'] },
    ],
  }
);

// SparePart Model
export class SparePart extends Model<SparePartAttributes & SparePartAssociations, SparePartCreationAttributes> implements SparePartAttributes {
  public id!: number;
  public listing_id!: number;
  public category!: string;
  public brand?: string;
  public part_number?: string;
  public compatible_vehicles?: string;
  public condition!: 'new' | 'used' | 'refurbished';
  public warranty?: string;
  public quantity!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

SparePart.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    category: { type: DataTypes.STRING(100), allowNull: false },
    brand: { type: DataTypes.STRING(100), allowNull: true },
    part_number: { type: DataTypes.STRING(100), allowNull: true },
    compatible_vehicles: { type: DataTypes.TEXT, allowNull: true },
    condition: { type: DataTypes.ENUM('new', 'used', 'refurbished'), allowNull: false, defaultValue: 'new' },
    warranty: { type: DataTypes.STRING(100), allowNull: true },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'spare_parts',
    modelName: 'SparePart',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['listing_id'], unique: true },
      { fields: ['category'] },
      { fields: ['brand'] },
      { fields: ['part_number'] },
    ],
  }
);

// Category Model
export class Category extends Model<CategoryAttributes & CategoryAssociations, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public type!: 'car' | 'bike' | 'haulage' | 'spare_part';
  public parent_id?: number;
  public sort_order!: number;
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Category.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    type: { type: DataTypes.ENUM('car', 'bike', 'haulage', 'spare_part'), allowNull: false },
    parent_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: Category, key: 'id' } },
    sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['type'] },
      { fields: ['parent_id'] },
      { fields: ['is_active'] },
    ],
  }
);

// Feature Model
export class Feature extends Model<FeatureAttributes & FeatureAssociations, FeatureCreationAttributes> implements FeatureAttributes {
  public id!: number;
  public name!: string;
  public category!: 'comfort' | 'safety' | 'sound' | 'performance' | 'utility';
  public feature_type!: 'boolean' | 'text' | 'number' | 'select';
  public icon?: string;
  public description?: string;
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Feature.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    category: { type: DataTypes.ENUM('comfort', 'safety', 'sound', 'performance', 'utility'), allowNull: false },
    feature_type: { type: DataTypes.ENUM('boolean', 'text', 'number', 'select'), allowNull: false, defaultValue: 'boolean' },
    icon: { type: DataTypes.STRING(100), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'features',
    modelName: 'Feature',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['category'] },
      { fields: ['feature_type'] },
      { fields: ['is_active'] },
    ],
  }
);

// ListingFeature Model
export class ListingFeature extends Model<ListingFeatureAttributes & ListingFeatureAssociations, ListingFeatureCreationAttributes> implements ListingFeatureAttributes {
  public id!: number;
  public listing_id!: number;
  public feature_id!: number;
  public custom_value?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ListingFeature.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    feature_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Feature, key: 'id' } },
    custom_value: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'listing_features',
    modelName: 'ListingFeature',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['feature_id'] },
      { fields: ['listing_id', 'feature_id'], unique: true },
    ],
  }
);

// Media Model
export class Media extends Model<MediaAttributes & MediaAssociations, MediaCreationAttributes> implements MediaAttributes {
  public id!: number;
  public listing_id!: number;
  public file_url!: string;
  public file_type!: 'image' | 'video';
  public file_size!: number;
  public dimensions?: string;
  public is_primary!: boolean;
  public sort_order!: number;
  public alt_text?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Media.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    file_url: { type: DataTypes.STRING(500), allowNull: false },
    file_type: { type: DataTypes.ENUM('image', 'video'), allowNull: false },
    file_size: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    dimensions: { type: DataTypes.STRING(50), allowNull: true },
    is_primary: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    sort_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    alt_text: { type: DataTypes.STRING(255), allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'media',
    modelName: 'Media',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['file_type'] },
      { fields: ['is_primary'] },
    ],
  }
);

// Keyword Model
export class Keyword extends Model<KeywordAttributes & KeywordAssociations, KeywordCreationAttributes> implements KeywordAttributes {
  public id!: number;
  public listing_id!: number;
  public keyword!: string;
  public relevance_score!: number;
  public readonly created_at!: Date;
}

Keyword.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    keyword: { type: DataTypes.STRING(100), allowNull: false },
    relevance_score: { type: DataTypes.DECIMAL(3, 2), allowNull: false, defaultValue: 1.0 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'keywords',
    modelName: 'Keyword',
    timestamps: false,
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['keyword'] },
    ],
  }
);

// Order Model
export class Order extends Model<OrderAttributes & OrderAssociations, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public user_id!: number;
  public listing_id!: number;
  public quantity!: number;
  public unit_price!: number;
  public total_price!: number;
  public status!: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  public payment_status!: 'pending' | 'paid' | 'failed' | 'refunded';
  public shipping_address?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Order.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    unit_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    total_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'), allowNull: false, defaultValue: 'pending' },
    payment_status: { type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'), allowNull: false, defaultValue: 'pending' },
    shipping_address: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'orders',
    modelName: 'Order',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['listing_id'] },
      { fields: ['status'] },
      { fields: ['payment_status'] },
    ],
  }
);

// OrderItem Model
export class OrderItem extends Model<OrderItemAttributes & OrderItemAssociations, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number;
  public order_id!: number;
  public listing_id!: number;
  public quantity!: number;
  public price!: number;
  public readonly created_at!: Date;
}

OrderItem.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Order, key: 'id' } },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'order_items',
    modelName: 'OrderItem',
    timestamps: false,
    indexes: [
      { fields: ['order_id'] },
      { fields: ['listing_id'] },
    ],
  }
);

// Discount Model
export class Discount extends Model<DiscountAttributes & DiscountAssociations, DiscountCreationAttributes> implements DiscountAttributes {
  public id!: number;
  public listing_id!: number;
  public discount_type!: 'percentage' | 'fixed';
  public value!: number;
  public min_quantity!: number;
  public start_date!: Date;
  public end_date!: Date;
  public usage_limit?: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Discount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    discount_type: { type: DataTypes.ENUM('percentage', 'fixed'), allowNull: false },
    value: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    min_quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    usage_limit: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'discounts',
    modelName: 'Discount',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['listing_id'] },
      { fields: ['start_date'] },
      { fields: ['end_date'] },
    ],
  }
);

// Review Model
export class Review extends Model<ReviewAttributes & ReviewAssociations, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public order_id!: number;
  public rating!: number;
  public comment?: string;
  public is_approved!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Review.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Order, key: 'id' } },
    rating: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT, allowNull: true },
    is_approved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'reviews',
    modelName: 'Review',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['order_id'] },
      { fields: ['rating'] },
      { fields: ['is_approved'] },
    ],
  }
);

// Message Model
export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public sender_id!: number;
  public receiver_id!: number;
  public listing_id?: number;
  public subject?: string;
  public message!: string;
  public is_read!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Message.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    sender_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    receiver_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    listing_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: Listing, key: 'id' } },
    subject: { type: DataTypes.STRING(255), allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    is_read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'messages',
    modelName: 'Message',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['sender_id'] },
      { fields: ['receiver_id'] },
      { fields: ['listing_id'] },
      { fields: ['is_read'] },
    ],
  }
);

// SavedSearch Model
export class SavedSearch extends Model<SavedSearchAttributes, SavedSearchCreationAttributes> implements SavedSearchAttributes {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public search_criteria!: object;
  public notification_enabled!: boolean;
  public last_notified_at?: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

SavedSearch.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    name: { type: DataTypes.STRING(255), allowNull: false },
    search_criteria: { type: DataTypes.JSON, allowNull: false },
    notification_enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    last_notified_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'saved_searches',
    modelName: 'SavedSearch',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['notification_enabled'] },
    ],
  }
);

// Associations
User.hasMany(Vehicle, { foreignKey: 'user_id', as: 'vehicles' });
Vehicle.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

Vehicle.hasMany(VehicleImage, { foreignKey: 'vehicle_id', as: 'images' });
VehicleImage.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Vehicle.hasMany(Favorite, { foreignKey: 'vehicle_id', as: 'favorites' });
Favorite.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

User.hasMany(RefreshToken, { foreignKey: 'user_id', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// New associations for polymorphic listings
User.hasMany(Listing, { foreignKey: 'user_id', as: 'listings' });
Listing.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

Listing.hasOne(Car, { foreignKey: 'listing_id', as: 'car' });
Car.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Listing.hasOne(Bike, { foreignKey: 'listing_id', as: 'bike' });
Bike.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Listing.hasOne(Haulage, { foreignKey: 'listing_id', as: 'haulage' });
Haulage.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Listing.hasOne(SparePart, { foreignKey: 'listing_id', as: 'sparePart' });
SparePart.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Listing.hasMany(Media, { foreignKey: 'listing_id', as: 'media' });
Media.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Listing.hasMany(Keyword, { foreignKey: 'listing_id', as: 'keywords' });
Keyword.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Listing.hasMany(ListingFeature, { foreignKey: 'listing_id', as: 'features' });
ListingFeature.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Feature.hasMany(ListingFeature, { foreignKey: 'feature_id', as: 'listingFeatures' });
ListingFeature.belongsTo(Feature, { foreignKey: 'feature_id', as: 'feature' });

Listing.hasMany(Order, { foreignKey: 'listing_id', as: 'orders' });
Order.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Listing.hasMany(Discount, { foreignKey: 'listing_id', as: 'discounts' });
Discount.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'buyer' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

Order.hasOne(Review, { foreignKey: 'order_id', as: 'review' });
Review.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

Listing.hasMany(Message, { foreignKey: 'listing_id', as: 'messages' });
Message.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

User.hasMany(SavedSearch, { foreignKey: 'user_id', as: 'savedSearches' });
SavedSearch.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Category.hasMany(Category, { foreignKey: 'parent_id', as: 'children' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });

export default {
  User,
  Vehicle,
  VehicleImage,
  Favorite,
  RefreshToken,
  Listing,
  Car,
  Bike,
  Haulage,
  SparePart,
  Category,
  Feature,
  ListingFeature,
  Media,
  Keyword,
  Order,
  OrderItem,
  Discount,
  Review,
  Message,
  SavedSearch
};
