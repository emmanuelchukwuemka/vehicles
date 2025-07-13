/**
 * Gets basic product sample information
 * @param {Pool} pool - Database connection pool
 * @param {string[]} [fields=['*']] - Fields to select
 * @param {number} [limit=16] - Maximum records to return
 * @returns {Promise<Array>} - Array of product samples
 */

// module.exports.getBasicProductSamples = async (pool, fields = ['*'], limit = 16) => {

//     try {
//         // Define valid fields for this table
//         const validFields = [
//             'id', 'store_id', 'product_id', 'ppu', 'min_qty'
//         ];

//         // Handle field selection
//         let selectedFields;
//         if (fields.includes('*')) {
//             selectedFields = '*';
//         } else {
//             // Filter only valid fields
//             const filteredFields = fields.filter(field =>
//                 validFields.includes(field));
//             selectedFields = filteredFields.length > 0
//                 ? filteredFields.join(', ')
//                 : '*';
//         }

//         // Execute query
//         const [samples] = await pool.query(`
//             SELECT ${selectedFields}
//             FROM product_sample LIMIT ?
//         `, [limit]);

//         return samples;
//     } catch (error) {
//         console.error('Error in getBasicProductSamples:', error);
//         throw error;
//     }
// };

module.exports.getBasicProductSamples = async ({
  pool,
  fields = ["*"],
  limit = 16,
  conditions = {}, // e.g. { store_id: 5 }
}) => {
  const validFields = [
    "id",
    "store_id",
    "product_id",
    "ppu",
    "min_qty",
    "created_at",
  ];
  const selected = fields.includes("*")
    ? "*"
    : fields.filter((f) => validFields.includes(f)).join(", ") || "*";

  // Build WHERE clause if conditions passed
  const whereParts = [];
  const params = [];

  for (const [key, val] of Object.entries(conditions)) {
    if (!validFields.includes(key)) continue;
    whereParts.push(`\`${key}\` = ?`);
    params.push(val);
  }

  params.push(limit); // for LIMIT ?
  const where = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";

  const [rows] = await pool.query(
    `SELECT ${selected} FROM product_sample ${where} ORDER BY id DESC LIMIT ?`,
    params
  );
  return rows;
};
