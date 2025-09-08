import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize"; // adjust path
import User from "../user/user.models";

// ✅ TypeScript interfaces
interface VendorAttributes {
  id: number;
  user_id: number;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

// For creation, `id`, `created_at`, `updated_at` are optional
type VendorCreationAttributes = Optional<
  VendorAttributes,
  "id" | "created_at" | "updated_at"
>;

// ✅ Model definition
export class Vendor
  extends Model<VendorAttributes, VendorCreationAttributes>
  implements VendorAttributes
{
  public id!: number;
  public user_id!: number;
  public status!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// ✅ Initialize model
Vendor.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true, // Enforces 1:1 User ↔ Vendor
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1, // Active by default
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "vendors_table",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// ✅ Optional associations (if you have a User model)

Vendor.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasOne(Vendor, {
  foreignKey: "user_id",
  as: "vendor",
});

export default Vendor;
