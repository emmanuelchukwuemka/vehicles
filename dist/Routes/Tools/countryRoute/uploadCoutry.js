"use strict";
const db = require('../../../Models/dbConfig/db.Config');
const express = require("express");
const router = express.Router();
const countries = require("./countryData");
router.get("/ups", (req, res) => {
    countries.map((data) => {
        let name = data.name;
        let code = data.code;
        let value = data.name;
        let label = data.name;
        const SQL = `INSERT INTO countries(name,code,value,label)VALUES(?,?,?,?)`;
        db.query(SQL, [name, code, value, label], (err, result) => {
        });
    });
});
module.exports = router;
