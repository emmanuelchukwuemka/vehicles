"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMethod = void 0;
const apiResponse_1 = require("../../globals/utility/apiResponse");
const testMethod = async () => {
    try {
        return (0, apiResponse_1.successResponse)("Retrieved successfully", { data: null });
    }
    catch (error) {
        console.error(error);
        return (0, apiResponse_1.errorResponse)("Error occurred", 404);
    }
};
exports.testMethod = testMethod;
