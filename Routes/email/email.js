const express = require("express");
const router = express.Router();

const Mailer = require("../../controllers/email/email");

router.post("/sendMail", Mailer);

module.exports = router;
