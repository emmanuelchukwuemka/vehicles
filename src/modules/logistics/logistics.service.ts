import pool from "../../config/database/db";

export const testMethod = async (data: any) => {
  const { name } = data;
  return { name };
};
