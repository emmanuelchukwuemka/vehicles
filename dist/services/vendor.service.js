"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { pool } = require("../connection/db");
module.exports.fetchStores = async (req) => {
    const { vendor_id } = req.params;
    try {
        const [stores] = await pool.query("SELECT * FROM stores_table WHERE vendor_id = ? AND status = 1", [vendor_id]);
        if (stores.length > 0) {
            console.log(stores);
            return {
                success: true,
                data: stores,
            };
        }
        return {
            success: false,
            error: `No store avaiable in the business account`,
        };
    }
    catch (error) {
        console.log("Error==>", error);
    }
};
