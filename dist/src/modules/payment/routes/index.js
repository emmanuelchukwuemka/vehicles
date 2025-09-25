"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paystack_1 = require("../controllers/paystack");
const router = (0, express_1.Router)();
router.post("/", paystack_1.paystactController.payment);
router.post("/charge/auth", paystack_1.paystactController.auth_charge);
exports.default = router;
