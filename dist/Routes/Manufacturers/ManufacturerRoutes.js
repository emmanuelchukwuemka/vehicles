"use strict";
const db = require("../../Models/dbConfig/db.Config");
const express = require("express");
const router = express.Router();
router.get("/manufacturers", (req, res) => {
    const sqlGet = "SELECT * FROM shops";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});
module.exports = router;
