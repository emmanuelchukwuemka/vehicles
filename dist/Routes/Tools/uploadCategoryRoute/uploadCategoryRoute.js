"use strict";
const db = require('../../../Models/dbConfig/db.Config');
const express = require("express");
const router = express.Router();
const data = require("./CategoryData");
router.get("/uploadallcategory", (req, res) => {
    data.map((data) => {
        let title = data.title;
        let image = data.image;
        let isActive = data.isActive;
        let SubCategory = data.SubCategory;
        let sqlInsert = `INSERT INTO Category(title,image,isActive,SubCategory)VALUES(?,?,?,?)`;
        db.query(sqlInsert, [title, image, isActive, SubCategory], (err, result) => {
            console.log("error", err);
            console.log("result", result);
        });
    });
});
module.exports = router;
