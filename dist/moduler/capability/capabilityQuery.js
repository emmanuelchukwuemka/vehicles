"use strict";
/**
 * Fetches capabilities with selected fields
 * @param {Pool} pool - Database connection pool
 * @param {string[]} [fields=['id','name','description']] - Fields to select
 * @returns {Promise<Array>} - Array of capability objects
 */
module.exports.fetchCapabilities = async (pool, fields = ['id', 'name', 'description']) => {
    try {
        // Validate and prepare fields
        const validFields = [
            'id', 'name', 'description',
            'created_at', 'updated_at'
        ];
        const selectedFields = fields
            .filter(field => validFields.includes(field))
            .map(f => `\`${f}\``)
            .join(', ') || '*';
        // Execute query
        const [capabilities] = await pool.query(`SELECT ${selectedFields} FROM capabilities_table`);
        return capabilities;
    }
    catch (error) {
        console.error('Error in fetchCapabilities:', error);
        throw error; // Throw for the caller to handle
    }
};
