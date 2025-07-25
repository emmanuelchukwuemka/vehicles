"use strict";
const db = require("../../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../email/email");
const validator = require("validator");
const forgetPassword = asyncHandler(async (req, res) => {
    const email = req.body.email.toString().toLowerCase();
    const SQL = `SELECT * from users`;
    db.query(SQL, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error Querying database" });
        }
        else if (validator.isEmail(email)) {
            const isExisted = data.filter((data) => data.email === email);
            if (isExisted[0]) {
                const otp = (Math.random() * 10000).toFixed();
                const otp_hash = bcrypt.hash(`${otp}`, 10);
                const SQL = `UPDATE users SET verification_code=\'${otp_hash}\' WHERE id=${isExisted[0].id}`;
                db.query(SQL, (error, result) => {
                    if (error)
                        console.log(error);
                    console.info(result);
                });
                const data = {
                    email: `${email}`,
                    subject: "Bloomzon Account OTP",
                    text: `Your OTP is ${otp}, please don't share with anyone `,
                };
                sendEmail(data);
                return res
                    .status(201)
                    .json({ message: "Otp Sent to email", status: 1, email: email });
            }
            else {
                return res
                    .status(401)
                    .json({
                    message: "No accound found with this email, please signup a new account",
                    status: 0,
                });
            }
        }
        else {
            return res
                .status(401)
                .json({
                message: "invalid email address , Please enter a valid email",
                status: 0,
            });
        }
    });
});
//confirm user OTP
const confirmOTP = asyncHandler(async (req, res) => {
    const email = req.body.email.toString().toLowerCase();
    const otp = req.body.otp;
    const SQL = `SELECT * FROM users`;
    db.query(SQL, (error, data) => {
        if (data != undefined) {
            const Data = data.filter((data) => data.email === email);
            const obj = Data[0];
            const response = bcrypt.compareSync(otp, obj.verification_code);
            if (response) {
                return res
                    .status(202)
                    .json({ message: "Authentication successful", status: 1 });
            }
            else {
                return res
                    .status(401)
                    .json({
                    message: "Incorrect Otp Please enter correct OTP",
                    status: 0,
                });
            }
        }
        else {
            console.log(result);
        }
    });
});
//confirm user OTP and delete account
const deleteUser = asyncHandler(async (req, res) => {
    const email = req.body.email.toString().toLowerCase();
    const otp = req.body.otp;
    const SQL = `SELECT * FROM users`;
    db.query(SQL, (error, data) => {
        if (data != undefined) {
            const Data = data.filter((data) => data.email === email);
            const obj = Data[0];
            const response = bcrypt.compareSync(otp, obj.verification_code);
            if (response) {
                const SQL = `DELETE  FROM users WHERE id = ${obj.id}`;
                db.query(SQL, (err, data) => {
                    if (err) {
                        return res.status(500).json({ message: "Error Querying database" });
                    }
                    else {
                        const data = {
                            email: `${email}`,
                            subject: "Bloomzon Delete",
                            text: `Your Bloomzon account was deleted successfully`,
                        };
                        sendEmail(data);
                        return res
                            .status(202)
                            .json({ message: "Account deleted successful", status: 1 });
                    }
                });
            }
            else {
                return res
                    .status(401)
                    .json({
                    message: "Incorrect Otp Please enter correct OTP",
                    status: 0,
                });
            }
        }
        else {
        }
    });
});
//Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const email = req.body.email.toString().toLowerCase();
    const password = req.body.password;
    const password_hash = bcrypt.hashSync(`${password}`, 10);
    const SQL = `SELECT * from users`;
    db.query(SQL, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error Querying database" });
        }
        else if (validator.isEmail(email)) {
            const isExisted = data.filter((data) => data.email === email);
            if (isExisted[0]) {
                const SQL = `UPDATE users SET password = \'${password_hash}\' , LoggedIN = 0 WHERE id=${isExisted[0].id}`;
                db.query(SQL, (error, data) => {
                    if (error) {
                        console.log(error);
                        console.info(data);
                    }
                    else {
                        const SQL = `UPDATE  users SET loggedIN=0 WHERE email=\'${email}\'`;
                        db.query(SQL, (error, result) => {
                            if (error) {
                                return res
                                    .status(404)
                                    .json({ message: "Error Querying database", status: 404 });
                            }
                            const data = {
                                email: `${email}`,
                                subject: "Reset Password",
                                text: `Your Bloomzon account password has been updated \n if this action was not from you please send us mail at itsupport@bloomzon.com`,
                            };
                            sendEmail(data);
                            return res
                                .status(201)
                                .json({ message: "Password updated", status: 1 });
                        });
                    }
                });
            }
            else {
                return res
                    .status(401)
                    .json({ message: "Failed to update password", status: 0 });
            }
        }
        else {
            return res
                .status(401)
                .json({
                message: "invalid email address , Please enter a valid email",
                status: 0,
            });
        }
    });
});
module.exports = { forgetPassword, confirmOTP, resetPassword, deleteUser };
