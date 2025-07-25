"use strict";
const express = require("express");
const router = express.Router();
const Mailer = require("../../Controllers/email/email");
router.post("/sendMail", Mailer);
module.exports = router;
