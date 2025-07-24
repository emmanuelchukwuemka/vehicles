/**
 *
 * @param {Object} options
 * @param {Pool} options.pool - MySQL connection pool
 * @param {Object} [options.conditions={}] - Key-value WHERE conditions (e.g., { user_id: 1, role_id: 5 })
 * @param {string[]} [options.fields=['scope']] - Fields to return in addition to user_id
 *
 * @returns {Promise<Object>} Map: { user_id: [scopes or enriched objects] }
 */

module.exports.getStoreScope = async ({
  pool,
  conditions = {},
  fields = ["store_id", "scope"],
}) => {
  const allowedFields = ["store_id", "scope"];

  // Validate selected fields
  const selectedFields = [...new Set(fields)];
  const invalid = selectedFields.filter((f) => !allowedFields.includes(f));
  if (invalid.length) {
    throw new Error(`Invalid field(s) requested: ${invalid.join(", ")}`);
  }

  const selectClause = selectedFields.map((f) => `\`${f}\``).join(", ");

  // Build WHERE clause
  const whereClauseParts = [];
  const values = [];

  for (const [key, value] of Object.entries(conditions)) {
    if (!allowedFields.includes(key)) continue;

    if (Array.isArray(value)) {
      const placeholders = value.map(() => "?").join(", ");
      whereClauseParts.push(`\`${key}\` IN (${placeholders})`);
      values.push(...value);
    } else {
      whereClauseParts.push(`\`${key}\` = ?`);
      values.push(value);
    }
  }

  const whereClause = whereClauseParts.length
    ? `WHERE ${whereClauseParts.join(" AND ")}`
    : "";

  const query = `
    SELECT ${selectClause}
    FROM stores_scope
    ${whereClause}
  `;

  try {
    const [rows] = await pool.query(query, values);

    return rows; // ✅ now returns array of objects
  } catch (error) {
    console.error("Error in getStoreScopes:", error);
    throw error;
  }
};
