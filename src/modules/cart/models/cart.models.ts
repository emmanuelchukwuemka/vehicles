import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { CartItem } from "./cartItems.model";

// -----------------------------------------------------
// Attributes
// -----------------------------------------------------
export interface CartAttributes {
  id: number;
  user_id: number; // FK → users (no guest carts in DB)
  created_at: Date;
  updated_at: Date;
}

// Fields that can be optional when creating
export type CartCreationAttributes = Optional<
  CartAttributes,
  "id" | "created_at" | "updated_at"
>;

// -----------------------------------------------------
// Model
// -----------------------------------------------------
export class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public user_id!: number;
  public items?: CartItem[];
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// -----------------------------------------------------
// Init
// -----------------------------------------------------
Cart.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "FK → users (no guest carts in DB)",
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
    tableName: "carts_table",
    underscored: true,
    timestamps: false,
  }
);
