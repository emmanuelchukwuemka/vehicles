"use strict";
/**
 * Universal Store Query Utility
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
module.exports.getStores = async ({ pool, fields = ['*'], conditions = {}, limit, offset, orderBy, orderDirection = 'ASC' }) => {
    try {
        // Validate fields
        const validFields = [
            'id', 'name', 'description', 'is_verified', 'created_at',
            'updated_at', 'owner_id', 'logo_url', 'banner_url'
        ];
        let selectedFields;
        if (fields.length === 1 && fields[0] === '*') {
            selectedFields = '*';
        }
        else {
            const filteredFields = fields.filter(field => validFields.includes(field));
            if (filteredFields.length === 0) {
                return {
                    success: false,
                    error: 'No valid fields specified'
                };
            }
            selectedFields = filteredFields.map(f => `\`${f}\``).join(', ');
        }
        // Build WHERE clause
        const whereClauses = [];
        const params = [];
        Object.entries(conditions).forEach(([key, value]) => {
            if (validFields.includes(key)) {
                if (Array.isArray(value)) {
                    whereClauses.push(`\`${key}\` IN (${value.map(() => '?').join(',')})`);
                    params.push(...value);
                }
                else {
                    whereClauses.push(`\`${key}\` = ?`);
                    params.push(value);
                }
            }
        });
        const whereClause = whereClauses.length > 0
            ? `WHERE ${whereClauses.join(' AND ')}`
            : '';
        // Build ORDER BY clause
        let orderByClause = '';
        if (orderBy && validFields.includes(orderBy)) {
            orderByClause = `ORDER BY \`${orderBy}\` ${orderDirection}`;
        }
        // Build LIMIT/OFFSET clause
        let limitClause = '';
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
      FROM \`stores_table\`
      ${whereClause}
      ${orderByClause}
      ${limitClause}
    `;
        const [rows] = await pool.query(query, params);
        return {
            success: true,
            data: rows
        };
    }
    catch (error) {
        console.error('Error in storeQueryUtil:', error);
        return {
            success: false,
            error: 'Failed to fetch store data'
        };
    }
};
