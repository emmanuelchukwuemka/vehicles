"use strict";
const db = require("../../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const { sendEmail } = require("../../email/email");
const currentDate = require("../../../utility/Date/currentDate");
var validator = require("validator");
const getAdmins = asyncHandler(async (req, res) => {
    const SQL = `SELECT users.id, name , avatar , email ,enabled FROM users INNER JOIN Staff ON  users.id = Staff.staff_id`;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            res.status(401).json({ message: "Error Quering database" }).status(401);
        }
        else if (result.length === null || result.length === 0) {
            res.status(201).json([]);
        }
        else {
            console.log(result);
            res.status(201).json(result);
        }
    });
});
const createAdmins = asyncHandler(async (req, res) => {
    const creatorId = req.body.creatorID;
    const email = req.body.email.toString().toLowerCase();
    const SQL = `SELECT * from users where email=\'${email}\'`;
    db.query(SQL, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error Querying database" });
        }
        else {
            if (result.length === 0) {
                return res
                    .status(401)
                    .json({
                    message: "An account with this does not existed please signup",
                    status: 404,
                });
            }
            else if (validator.isEmail(email) === false) {
                return res
                    .status(401)
                    .json({ message: "Email address is invalid", status: 404 });
            }
            else if (validator.isEmail(email)) {
                const staff_id = result[0].id;
                const type = "SuperAdmin";
                const enabled = 1;
                const SQL = `INSERT INTO Staff(staff_id,type,enabled,createdBy_id,date)VALUES(?,?,?,?,?)`;
                db.query(SQL, [staff_id, type, enabled, creatorId, currentDate()], (err, result) => {
                    if (err) {
                        console.log("error", err);
                    }
                    else {
                        const data = {
                            email: `${email}`,
                            subject: "Bloomzon E-commerce",
                            text: `Your account has just been made an admin`,
                        };
                        sendEmail(data);
                        return res
                            .status(201)
                            .json({ message: "Account Created Successfully", status: 1 });
                    }
                });
            }
        }
    });
});
const deleteAdmin = asyncHandler(async (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const SQL = `DELETE FROM Staff WHERE staff_id=${id}`;
    db.query(SQL, (err, result) => {
        if (err) {
            console.log("error", err);
        }
        else {
            const data = {
                email: `${email}`,
                subject: "Bloomzon E-commerce",
                text: `Your account has just been remove from an admin`,
            };
            sendEmail(data);
            return res
                .status(201)
                .json({ message: "Account Created Successfully", status: 1 });
        }
    });
});
const suspendAdmin = asyncHandler(async (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const enabled = Number(req.body.enabled);
    console.log(enabled);
    if (enabled === 1) {
        const SQL = `UPDATE Staff SET enabled=0 WHERE staff_id=${id}`;
        db.query(SQL, (err, result) => {
            if (err) {
                console.log("error", err);
            }
            else {
                const data = {
                    email: `${email}`,
                    subject: "Bloomzon E-commerce",
                    text: `Your account has just been suspended from an admin`,
                };
                sendEmail(data);
                console.log("suspended");
                return res
                    .status(201)
                    .json({ message: "Account Created Successfully", status: 1 });
            }
        });
    }
    else {
        const SQL = `UPDATE Staff SET enabled=1 WHERE staff_id=${id}`;
        db.query(SQL, (err, result) => {
            if (err) {
                console.log("error", err);
            }
            else {
                const data = {
                    email: `${email}`,
                    subject: "Bloomzon E-commerce",
                    text: `Your account has just been reactivated back as an admin`,
                };
                sendEmail(data);
                console.log("suspended");
                return res
                    .status(201)
                    .json({ message: "Account Created Successfully", status: 1 });
            }
        });
    }
});
module.exports = { getAdmins, createAdmins, deleteAdmin, suspendAdmin };
