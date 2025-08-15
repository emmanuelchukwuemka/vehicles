import pool from "../../config/database/db";

export const getUserByAuthId = async (authUserId: number) => {
  const [rows]: any = await pool.query(
    "SELECT id, first_name, last_name, email, phone FROM users_table WHERE id = ? LIMIT 1",
    [authUserId],
  );

  return rows.length ? rows[0] : null;
};
