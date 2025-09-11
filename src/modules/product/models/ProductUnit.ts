import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { ProductUnitAttributes } from "../types/media.types";

type ProductUnitCreation = Optional<
  ProductUnitAttributes,
  "id" | "metadata" | "status" | "created_at" | "updated_at"
>;

// -------------------------------
// 3️⃣ Sequelize Model definition
// -------------------------------
export class ProductUnit
  extends Model<ProductUnitAttributes, ProductUnitCreation>
  implements ProductUnitAttributes
{
  public id!: number;
  public product_id!: number;
  public name!: string;
  public value!: string;
  public price!: number;
  public stock!: number;
  public metadata?: object | null;
  public status?: number;

  // timestamps
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// -------------------------------
// 4️⃣ Initialize with mapping to DB
// -------------------------------
ProductUnit.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
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
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
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
    tableName: "product_units",
    timestamps: true,
    underscored: true,
  }
);
