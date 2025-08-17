// src/modules/auth/auth.models.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database/sequelize";

export interface AuthAttributes {
  id: number;
  email: string;
  password: string;
  user_id:number
}

export class Auth extends Model<AuthAttributes> implements AuthAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public user_id!: number;
}

Auth.init(
  {
    id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    email: { type: DataTypes.STRING(255), allowNull: false},
    password: { type: DataTypes.STRING(255), allowNull: false},
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
  },
  {
    sequelize,
    tableName: "auth_table",
    modelName: "Auth",
    timestamps: false,
  }
);

export default Auth;
