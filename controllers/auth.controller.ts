import dotenv from "dotenv";
dotenv.config();
import express from "express";
const router = express.Router();
import { Request, Response } from "express";
const service = require("../services/auth.service");
//const jwt = require("jsonwebtoken");
//const { jwtValidator } = require("../mw/middlewares");

router.post("/register", async (req, res) => {
  try {
    const result = await service.create_account(req);

    if (result && result.success) {
      res.json({
        success: true,
        data: result.data,
      });
    } else {
      const errorMessage = result.error || "Error connecting to the server";
      res.status(400).json({ success: false, error: errorMessage });
    }
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const result = await service.login_User(req);

    if (result && result.success) {
      res.status(200).json({
        success: result.success,
        data: result.data,
      });
    } else {
      const errorMessage = result.error || "Unknown server server occurred";
      res.status(400).json({ success: false, error: errorMessage });
    }
  } catch (error) {
    console.error("Error Loging in:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
