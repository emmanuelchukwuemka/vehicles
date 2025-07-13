/**
 * Universal Product Query Utility
 * @param {Object} params
 * @param {Pool} params.pool - Database connection pool
 * @param {string[]} [params.fields=['*']] - Fields to select
 * @param {Object} [params.conditions={}] - WHERE conditions (key-value pairs)
 * @param {number} [params.limit] - Limit results
 * @param {number} [params.offset] - Offset for pagination
 * @param {string} [params.orderBy] - Column to order by
 * @param {'ASC'|'DESC'} [params.orderDirection='ASC'] - Sort direction
 * @returns {Promise<{success: boolean, data?: any[], error?: string}>}
 */
module.exports.universalQuery = async ({
  pool,
  fields = ["*"],
  conditions = {},
  limit,
  offset,
  orderBy,
  orderDirection = "ASC",
}) => {
  try {
    // Only allow safe fields
    const validFields = [
      "id",
      "store_id",
      "name",
      "description",
      "price",
      "status",
      "created_at",
      "updated_at",
    ];

    let selectedFields;
    if (fields.length === 1 && fields[0] === "*") {
      selectedFields = "*";
    } else {
      const filteredFields = fields.filter((f) => validFields.includes(f));
      if (!filteredFields.length) {
        return {
          success: false,
          error: "No valid fields specified",
        };
      }
      selectedFields = filteredFields.map((f) => `\`${f}\``).join(", ");
    }

    // Build WHERE clause
    const whereClauses = [];
    const params = [];

    for (const [key, value] of Object.entries(conditions)) {
      if (validFields.includes(key)) {
        if (Array.isArray(value)) {
          whereClauses.push(
            `\`${key}\` IN (${value.map(() => "?").join(",")})`
          );
          params.push(...value);
        } else {
          whereClauses.push(`\`${key}\` = ?`);
          params.push(value);
        }
      }
    }

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // ORDER BY
    let orderByClause = "";
    if (orderBy && validFields.includes(orderBy)) {
      orderByClause = `ORDER BY \`${orderBy}\` ${orderDirection}`;
    } else {
      orderByClause = `ORDER BY \`created_at\` DESC`; // default
    }

    // LIMIT / OFFSET
    let limitClause = "";
    if (limit !== undefined) {
      limitClause = `LIMIT ?`;
      params.push(limit);
      if (offset !== undefined) {
        limitClause += ` OFFSET ?`;
        params.push(offset);
      }
    }

    const query = `
        SELECT ${selectedFields}
        FROM \`products_table\`
        ${whereClause}
        ${orderByClause}
        ${limitClause}
      `;

    const [rows] = await pool.query(query, params);

    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error("Error in getProducts:", error);
    return {
      success: false,
      error: "Failed to fetch products",
    };
  }
};
