import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { ProductAttributes } from "../types/baseProduct.types";

type ProductCreationAttributes = Optional<
  ProductAttributes,
  | "id"
  | "subcategory_id"
  | "collection_id"
  | "subdomain_id"
  | "metadata"
  | "status"
>;

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public store_id!: number;
  public subdomain_id!: number;
  public product_code!: string;
  public subcategory_id!: number;
  public collection_id!: number;
  public name!: string;
  public description!: string;
  public base_price!: number;
  public currency_id!: number;
  public metadata!: any | null;
  public status!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Product.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    store_id: { type: DataTypes.BIGINT, allowNull: false },
    subdomain_id: { type: DataTypes.INTEGER, allowNull: false },
    product_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    subcategory_id: { type: DataTypes.BIGINT, allowNull: true },
    collection_id: { type: DataTypes.BIGINT, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    base_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency_id: { type: DataTypes.INTEGER, allowNull: false },
    metadata: { type: DataTypes.JSON, allowNull: true },
    status: { type: DataTypes.TINYINT, defaultValue: 0 },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "products_table",
    timestamps: false,
  }
);
