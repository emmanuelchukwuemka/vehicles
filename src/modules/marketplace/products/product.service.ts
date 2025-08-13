import pool from "../../../config/database/db";

export const getAllProducts = async () => {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
};

export const createProduct = async (data: {
  name: string;
  price: number;
  description?: string;
}) => {
  const { name, price, description } = data;
  const [result]: any = await pool.query(
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
    [name, price, description || null]
  );
  return { id: result.insertId, name, price, description };
};
