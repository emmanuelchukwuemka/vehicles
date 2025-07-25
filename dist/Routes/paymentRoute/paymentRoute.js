"use strict";
const express = require("express");
const router = express.Router();
const { stripePayment, stripeXPayment, getStripeIntent, } = require("../../controllers/paymentController/paymentController");
//router endpoints
router.post("/intents", stripePayment);
router.post("/stripeintents", stripeXPayment);
router.post("/getintents", getStripeIntent);
module.exports = router;
