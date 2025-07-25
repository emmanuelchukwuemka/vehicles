"use strict";
const db = require("../../Models/dbConfig/db.Config");
const express = require("express");
const router = express.Router();
router.get("/getPrimeServices", (req, res) => {
    const sqlGet = "SELECT * FROM prime";
    db.query(sqlGet, (error, result) => {
        res.send(result);
        console.log(result);
    });
});
module.exports = router;
