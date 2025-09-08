import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { StoreAttributes } from "../store.types";

export type StoreCreationAttributes = Optional<
  StoreAttributes,
  | "id"
  | "slogan"
  | "logo"
  | "staff_count"
  | "is_verified"
  | "verified_date"
  | "status"
  | "created_at"
  | "updated_at"
>;

export class Store
  extends Model<StoreAttributes, StoreCreationAttributes>
  implements StoreAttributes
{
  public id!: number;
  public vendor_id!: number;
  public subdomain_id!: number;
  public name!: string;
  public slogan?: string;
  public city_id!: number;
  public banner!: string;
  public picture!: string;
  public logo?: string;
  public net_worth!: number;
  public staff_count?: number;
  public address!: string;
  public floor_space!: number;
  public code!: string;
  public is_verified?: number;
  public verified_date?: Date | null;
  public status!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Store.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    vendor_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    subdomain_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    slogan: { type: DataTypes.STRING(255), allowNull: true },
    city_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    banner: { type: DataTypes.TEXT, allowNull: false },
    picture: { type: DataTypes.TEXT, allowNull: false },
    logo: { type: DataTypes.TEXT, allowNull: true },
    net_worth: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    staff_count: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
    address: { type: DataTypes.STRING(255), allowNull: false },
    floor_space: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    is_verified: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    verified_date: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "stores_table",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
