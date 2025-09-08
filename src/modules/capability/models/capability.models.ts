import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";

export interface CapabilityAttributes {
  id: number;
  name: string;
  description?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface CapabilityCreationAttributes
  extends Optional<CapabilityAttributes, "id" | "created_at" | "updated_at"> {}

export class Capability
  extends Model<CapabilityAttributes, CapabilityCreationAttributes>
  implements CapabilityAttributes
{
  public id!: number;
  public name!: string;
  public description?: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Capability.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Capability",
    tableName: "capabilities_table",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
