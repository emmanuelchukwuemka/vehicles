import { ApiResponse } from "../../types/apiResponse";

export const successResponse = <T>(
  message: string,
  data?: T,
  statusCode = 200
): ApiResponse<T> => ({
  success: true,
  message,
  data,
  statusCode,
});

export const errorResponse = (
  message: string,
  statusCode = 400,
  error?: string
): ApiResponse => ({
  success: false,
  message,
  error,
  statusCode,
});
