"use strict";
module.exports.getVideoInteractionMap = async (pool, videoIds) => {
    if (!videoIds || !Array.isArray(videoIds) || videoIds.length === 0) {
        return {};
    }
    try {
        const [rows] = await pool.query(`SELECT target_id, COUNT(*) AS total
         FROM interactions
         WHERE target_type = 'product' AND target_id IN (?)
         GROUP BY target_id`, [videoIds]);
        const map = {};
        for (const row of rows) {
            map[row.target_id] = row.total;
        }
        console.log("interactions=>", map);
        return map;
    }
    catch (error) {
        console.error("Error fetching video interactions:", error);
        return {};
    }
};
