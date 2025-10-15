"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPayload = void 0;
const checkPayload = (err, res, next) => {
    console.error("Payload Error:", err);
    if (err.type === "entity.too.large") {
        res
            .status(413)
            .json({ success: false, error: "Request payload size is too large" });
        return;
    }
    next(err);
};
exports.checkPayload = checkPayload;
