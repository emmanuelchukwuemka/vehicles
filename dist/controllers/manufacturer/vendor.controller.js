"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const service = require("../services/vendor.service");
require("dotenv").config();
router.get("/fetch-stores/:vendor_id", async (req, res) => {
    try {
        const result = await service.fetchStores(req);
        if (result && result.success) {
            res.json({
                success: true,
                data: result.data,
            });
        }
        else {
            const errorMessage = result.error || "Error connecting to the server";
            res.status(400).json({ success: false, error: errorMessage });
        }
    }
    catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;
