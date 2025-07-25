"use strict";
const express = require("express");
const router = express.Router();
const { createHistory, browseHistory, } = require("../../controllers/browseHistory/browseHistory");
router.post("/createhistory", createHistory);
router.post("/browsehistory", browseHistory);
module.exports = router;
