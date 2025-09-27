import { Request, Response } from "express";
import * as authServices from "./auth.services";
import { loginSchema } from "./auth.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const login = async (req: Request, res: Response) => {
  try {
    // And here i dey call the service layer
    const result = await authServices.login(req.body);

    if (!result.success || !result.data) {
      return errorResponse(res, {
        statusCode: 401,
        message: result.message,
      });
    }
    const { accessToken, refreshToken, userInfo } = result.data;

    // Seting cookies here
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || "localhost",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || "localhost",
    });

    return successResponse(res, {
      message: result.message,
      data: userInfo,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation error",
        details: err.issues,
      });
    }

    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
