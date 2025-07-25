"use strict";
const db = require('../../../Models/dbConfig/db.Config');
const express = require("express");
const data = require("./mockdata/mockusers");
const router = express.Router();
router.get("/demoUser", (req, res) => {
    data.map((data) => {
        let first_name = data.first_name;
        let last_name = data.last_name;
        let middle_name = data.middle_name;
        let email = data.email;
        let phone = data.phone;
        let password = data.password;
        let account_type = data.account_type;
        let prime = data.prime;
        let address = data.address;
        let photo = data.photo;
        let country = data.country;
        let state = data.state;
        let city = data.city;
        let wallet = data.wallet;
        let sqlInsert = `INSERT INTO users(first_name,last_name,middle_name,email,phone,password,account_type,prime,address,photo,country,state,city,wallet)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.query(sqlInsert, [first_name, last_name, middle_name, email, phone, password, account_type, prime, address, photo, country, state, city, wallet], (err, result) => {
            console.log("error", err);
            console.log("result", result);
        });
    });
});
module.exports = router;
