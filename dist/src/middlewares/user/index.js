"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserMatch = exports.checkUserStatus = void 0;
const checkUserStatus = (req, res, next) => {
    const user = req.user;
    if (!user) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            statusCode: 401,
        });
        return;
    }
    if (user.status !== 1) {
        res.status(403).json({
            success: false,
            message: "Account inactive or blocked",
            statusCode: 403,
        });
        return;
    }
    next();
};
exports.checkUserStatus = checkUserStatus;
const checkUserMatch = (req, res, next) => {
    const loggedInUser = req.user;
    if (!loggedInUser) {
        res.status(401).json({
            success: false,
            message: "Unauthorized lara",
            statusCode: 401,
        });
        return;
    }
    const paramId = req.params.id ? Number(req.params.id) : undefined;
    const bodyId = req.body?.user_id ? Number(req.body.user_id) : undefined;
    const queryId = req.query?.user_id ? Number(req.query.user_id) : undefined;
    const userId = paramId ?? bodyId ?? queryId;
    if (userId === undefined || isNaN(userId)) {
        res.status(400).json({
            success: false,
            message: "User ID not provided in request",
            statusCode: 400,
        });
        return;
    }
    if (userId !== loggedInUser.id) {
        res.status(403).json({
            success: false,
            message: "Access denied: user mismatch",
            statusCode: 403,
        });
        return;
    }
    next();
};
exports.checkUserMatch = checkUserMatch;
