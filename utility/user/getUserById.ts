import { Pool } from "mysql2/promise";
import { User } from "../../types/user";

export const getUserById = async (
  pool: Pool,
  userId: number
): Promise<User | null> => {
  const [rows] = await pool.query<User[]>(
    `SELECT * FROM users_table WHERE id = ? LIMIT 1`,
    [userId]
  );

  return rows.length > 0 ? rows[0] : null;
};
