"use strict";
const db = require("../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const GiftCards = asyncHandler(async (req, res) => {
    const LMT = req.body.LMT;
    const SQL = req.body.sql.toString();
    db.query(SQL, (error, result) => {
        res.send(result);
    });
});
const GiftCard = asyncHandler(async (req, res) => {
    const userID = req.body.user_id;
    const SQL = `SELECT * FROM GiftCards WHERE user_id = ${userID}`;
    db.query(SQL, (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.status(201).send(result);
        }
    });
});
module.exports = { GiftCards, GiftCard };
