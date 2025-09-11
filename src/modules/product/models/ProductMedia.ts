import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { ProductMediaAttributes } from "../types/retailer/productMedia.types";

type ProductMediaCreation = Optional<
  ProductMediaAttributes,
  "id" | "unit_id" | "description" | "metadata" | "status"
>;

export class ProductMedia
  extends Model<ProductMediaAttributes, ProductMediaCreation>
  implements ProductMediaAttributes
{
  public id!: number;
  public product_id!: number;
  public unit_id!: number | null;
  public url!: string;
  public type!: string;
  public description!: string | null;
  public metadata!: object | null;
  public status!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ProductMedia.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.BIGINT, allowNull: false },
    unit_id: { type: DataTypes.BIGINT, allowNull: true },
    url: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
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
    status: { type: DataTypes.TINYINT, defaultValue: 1 },
  },
  {
    sequelize,
    tableName: "products_media",
    timestamps: false,
  }
);
