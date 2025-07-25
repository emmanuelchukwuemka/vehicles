"use strict";
const express = require("express");
const router = express.Router();
const { getProduct, } = require("../../controllers/BloomzonFreshController/freshController");
router.post("/freshproduct", getProduct);
module.exports = router;
