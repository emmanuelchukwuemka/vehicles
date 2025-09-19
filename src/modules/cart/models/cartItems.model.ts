import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";

// -----------------------------------------------------
// Attributes
// -----------------------------------------------------
export interface CartItemAttributes {
  id: number;
  cart_id: number;
  store_id: number;
  subdomain_id: number;
  product_id: number;
  unit_id?: number | null;
  quantity: number;
  price: number;
  currency_id: number;
  metadata?: any | null;
  created_at: Date;
  updated_at: Date;
}

// Fields that can be optional when creating
export type CartItemCreationAttributes = Optional<
  CartItemAttributes,
  "id" | "unit_id" | "metadata" | "created_at" | "updated_at"
>;

// -----------------------------------------------------
// Model
// -----------------------------------------------------
export class CartItem
  extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes
{
  public id!: number;
  public cart_id!: number;
  public store_id!: number;
  public subdomain_id!: number;
  public product_id!: number;
  public unit_id!: number | null;
  public quantity!: number;
  public price!: number;
  public currency_id!: number;
  public metadata!: any | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// -----------------------------------------------------
// Init
// -----------------------------------------------------
CartItem.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    store_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    subdomain_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    unit_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      get() {
        const raw = this.getDataValue("metadata");
        if (typeof raw === "string") {
          try {
            return JSON.parse(raw);
          } catch {
            return raw;
          }
        }
        return raw;
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "cart_items",
    timestamps: false,
    underscored: true,
  }
);
