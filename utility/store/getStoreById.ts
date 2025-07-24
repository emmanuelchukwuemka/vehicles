import { Pool } from "mysql2/promise";
import { Store } from "../../types/store";

export const getStoreById = async (
  pool: Pool,
  storeId: number
): Promise<Store | null> => {
  try {
    const [rows] = await pool.query<Store[]>(
      `
      SELECT id, name, logo, email, phone
      FROM stores_table
      WHERE id = ?
      LIMIT 1
      `,
      [storeId]
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching store by ID:", error);
    return null;
  }
};
