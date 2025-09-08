import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { VariationAttributes } from "../types/variations.types";

// Fields allowed when creating a variation
export type VariationCreationAttributes = Optional<
  VariationAttributes,
  "id" | "status" | "metadata" | "created_at" | "updated_at"
>;

export class Variation
  extends Model<VariationAttributes, VariationCreationAttributes>
  implements VariationAttributes
{
  public id!: number;
  public product_id!: number;
  public sku!: string;

  public price!: number;
  public stock!: number;

  public status!: number;
  public metadata?: object;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Variation.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    stock: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
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
    tableName: "variations_table",
    timestamps: false,
  }
);

export default Variation;
