import { Pool } from "mysql2/promise";

interface CheckVendorOptions {
  pool: Pool;
  user_id: number;
}

interface VendorRecord {
  id: number;
  user_id: number;
  access_token: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export const checkVendorByUserId = async ({
  pool,
  user_id,
}: CheckVendorOptions): Promise<VendorRecord | null> => {
  if (!user_id) {
    throw new Error("user_id is required");
  }

  const query = `
    SELECT * FROM vendors_table
    WHERE user_id = ?
    LIMIT 1
  `;

  try {
    const [rows] = await pool.query(query, [user_id]);
    const result = rows as VendorRecord[];
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error checking vendor by user_id:", error);
    throw error;
  }
};
