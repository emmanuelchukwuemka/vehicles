// store.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { StoreAttributes } from "../types/store.types";

interface StoreCreationAttributes
  extends Optional<
    StoreAttributes,
    "id" | "status" | "is_verified" | "metadata"
  > {}

export class Store
  extends Model<StoreAttributes, StoreCreationAttributes>
  implements StoreAttributes
{
  public id!: number;
  public vendor_id!: number;
  public subdomain_id!: number;
  public name!: string;
  public slogan!: string;
  public city_id!: number;
  public address!: string;
  public code!: string;
  public status!: number;
  public is_verified!: number; // ✅
  public metadata!: Record<string, any>;
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
    vendor_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    subdomain_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slogan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    is_verified: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "stores_table",
    timestamps: false,
  }
);
