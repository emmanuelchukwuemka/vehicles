import pool from "../../../config/database/db";
import {
  errorResponse,
  successResponse,
} from "../../../globals/utility/apiResponse";

export const getStoreInfo = async (store_id: number) => {
  if (!store_id) {
    return errorResponse("Store ID is required", 400);
  }
  const [result]: any = await pool.execute(
    "SELECT * FROM stores_table WHERE id = ? LIMIT 1",
    [store_id]
  );

  const storeInfo = result.length ? result[0] : null;
  if (!storeInfo) {
    return errorResponse("Store with the provided id could not be found", 400);
  }

  return successResponse("Retrieved successful", storeInfo);
};
