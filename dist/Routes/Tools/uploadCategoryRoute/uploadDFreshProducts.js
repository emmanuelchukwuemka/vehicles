"use strict";
const db = require("../../Models/dbConfig/db.Config");
const express = require("express");
const router = express.Router();
const importedData = require("./Data");
router.get("uploadfruit", (req, res) => {
    function generateRandom(maxLimit = 10) {
        const rand = Math.random() * maxLimit;
        let RRand = Math.floor(rand); // 99
        return RRand;
    }
    importedData.map((data) => {
        let title = data.title;
        let prime = data.prime;
        let description = data.description;
        let images = data.images;
        let price = data.price;
        let categoryId = data.categoryId;
        let sellerId = data.sellerId;
        let rating = generateRandom(555) + Math.floor(Number(price));
        let countryId = data.countryId;
        let stateId = data.stateId;
        let slashPrice = (Number(data.price) + generateRandom(8));
        let percentageOff = 100 - ((Number(data.price) * 100) / slashPrice);
        let likes = generateRandom(10000);
        let sqlInsert = `INSERT INTO freshProducts(title,prime,description,images,price,categoryId,sellerId,countryId,stateId,rating,percentageOff,slashPrice,likes)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.query(sqlInsert, [title, prime, description, images, price, categoryId, sellerId, countryId, stateId, rating, percentageOff, slashPrice, likes], (err, result) => {
            console.log("error", err);
            console.log("result", result);
        });
    });
});
module.exports = router;
