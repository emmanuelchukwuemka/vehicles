import { Request, Response } from "express";

require("dotenv").config();
const express = require("express");
const router = express.Router();
const service = require("../services/markets.service");
const jwt = require("jsonwebtoken");

// Load manufacturers market
router.post("/retailers", async (req: Request, res: Response) => {
  try {
    const result = await service.sellerMarket(req);

    if (result && result.success) {
      res.status(200).json({
        success: result.success,
        data: result.data,
      });
    } else {
      const errorMessage = result.error || "Unknown server occurred";
      res.status(400).json({ success: false, error: errorMessage });
    }
  } catch (error) {
    console.error("Error loading retail market:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Load manufacturers market
router.post("/manufacturers", async (req: Request, res: Response) => {
  try {
    const result = await service.loadManufacturer(req);

    if (result && result.success) {
      res.status(200).json({
        success: result.success,
        data: result.data,
      });
    } else {
      const errorMessage = result.error || "Unknown server occurred";
      res.status(400).json({ success: false, error: errorMessage });
    }
  } catch (error) {
    console.error("Error lading resources:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default router;
