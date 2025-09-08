import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { Variation } from "./variation.models";
import { MediaAttributes } from "../types/media.types";

// Attributes used when creating a new row
export type MediaCreationAttributes = Optional<
  MediaAttributes,
  "id" | "variation_id" | "metadata" | "status" | "created_at" | "updated_at"
>;

export class Media
  extends Model<MediaAttributes, MediaCreationAttributes>
  implements MediaAttributes
{
  public id!: number;
  public product_id!: number;
  public variation_id!: number | null;
  public metadata!: object;
  public url!: string;
  public type!: string;
  public status!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Media.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    variation_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
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
    tableName: "product_media",
    sequelize,
    timestamps: false,
    indexes: [
      { fields: ["product_id"] },
      { fields: ["variation_id"] },
      { fields: ["type"] },
      { fields: ["status"] },
    ],
  }
);

// Associations
Media.belongsTo(Variation, { foreignKey: "variation_id", as: "variation" });
