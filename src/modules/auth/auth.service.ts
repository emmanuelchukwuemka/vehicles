import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../config/database/db"; // Raw SQL pool

import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

import { LoginRequest } from "./auth.types";
import { getUserByAuthId } from "../users/user.helper";

export const loginService = async (payload: LoginRequest) => {
  const { email, password } = payload;

  if (!email || !password) {
    return errorResponse("Email and password are required", 422);
  }

  const [rows]: any = await pool.query(
    "SELECT * FROM auth_table WHERE email = ? LIMIT 1",
    [email],
  );

  const userAuth = rows.length ? rows[0] : null;
  if (!userAuth) {
    return errorResponse("User does not exist", 401);
  }

  const isMatch = await bcrypt.compare(password, userAuth.password);
  if (!isMatch) {
    return errorResponse("Incorrect email or password", 401);
  }

  // Fetch user info from users_table
  const userInfo = await getUserByAuthId(userAuth.user_id);
  if (!userInfo) {
    return errorResponse("User profile not found", 404);
  }

  const token = jwt.sign(
    { id: userAuth.user_id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  return successResponse("Login successful", { token, user: userInfo });
};
