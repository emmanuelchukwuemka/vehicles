"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moduleControllers = __importStar(require("./controllers/domain.controllers"));
const module_middlewares_1 = require("./module.middlewares");
const submodule_controllers_1 = require("./controllers/submodule.controllers");
const router = (0, express_1.Router)();
router.post("/", module_middlewares_1.validateModuleCreate, moduleControllers.createModule);
// Create a submodule
router.post("/subdomain", module_middlewares_1.validatesubdomainCreate, submodule_controllers_1.SubmoduleController.create);
// Update a submodule
router.put("/submodule/:id", submodule_controllers_1.SubmoduleController.update);
// Get single submodule by ID
router.get("/submodule/:id", submodule_controllers_1.SubmoduleController.getById);
// Get all submodules (optionally filter by module_id)
router.get("/submodule", submodule_controllers_1.SubmoduleController.getAll);
// Delete a submodule
router.delete("/submodule/:id", submodule_controllers_1.SubmoduleController.delete);
exports.default = router;
