"use strict";
const { pool } = require("../connection/db");
const crypto = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports.checkPayload = (err, req, res, next) => {
    console.error("Payload Error:", err);
    if (err.type === "entity.too.large") {
        return res
            .status(413)
            .json({ success: false, error: "Request payload size is too large" });
    }
    next(err);
};
module.exports.requestTimer = (req, res, next) => {
    req.setTimeout(10000, () => {
        console.warn(`⏳ Request timed out: ${req.method} ${req.originalUrl}`);
        if (!res.headersSent) {
            res.status(408).json({
                success: false,
                error: "Request has timed out. Please try again.",
            });
        }
    });
    next();
};
module.exports.jwtValidator = (req, res, next) => {
    const accessToken = req.headers["x-auth-token"];
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            error: "Unknown request sources origin",
        });
    }
    try {
        const decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET);
        //console.log("x-auth-token header:", decodedUser);
        req.user = decodedUser;
        // console.log("gooder==>", decodedUser)
        next();
    }
    catch (error) {
        console.log("Error==>", error.message);
        // Token verification failed
        return res.status(403).json({
            success: false,
            error: "Invalid or expired authorization token",
        });
    }
};
