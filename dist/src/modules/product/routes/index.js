"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get("/:id", controllers_1.ProductController.getSingleProduct);
router.get("/unit/:id", controllers_1.ProductUnitController.getSingleUnit);
exports.default = router;
