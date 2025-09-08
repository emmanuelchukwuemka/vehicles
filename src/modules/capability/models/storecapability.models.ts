import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";

export interface StoreCapabilityAttributes {
  id: number;
  store_id: number;
  capability_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface StoreCapabilityCreationAttributes
  extends Optional<
    StoreCapabilityAttributes,
    "id" | "created_at" | "updated_at"
  > {}

export class StoreCapability
  extends Model<StoreCapabilityAttributes, StoreCapabilityCreationAttributes>
  implements StoreCapabilityAttributes
{
  public id!: number;
  public store_id!: number;
  public capability_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

StoreCapability.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    store_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    capability_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "StoreCapability",
    tableName: "store_capabilities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
