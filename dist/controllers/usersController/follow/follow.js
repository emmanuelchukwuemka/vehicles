"use strict";
const db = require("../../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const currentDate = require("../../../utility/Date/currentDate");
const getFollowers = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    let SQL = `SELECT * from followers WHERE user_id=\'${userID}\'`;
    db.query(SQL, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error Querying database" });
        }
        if (data.length != 0) {
            return res.send(data).status(201);
        }
    });
});
//create a new user address
const follow = asyncHandler(async (req, res) => {
    const { userID, followerID } = req.body;
    const SQL = `SELECT * FROM followers WHERE user_id = \"${userID}\" AND follower_id = \"${followerID}\" `;
    db.query(SQL, (error, data) => {
        if (error) {
            console.log(error);
            return res
                .status(404)
                .json({ message: "Error Querying database", status: 404 });
        }
        if (data.length != 0) {
            const SQL = `DELETE FROM followers WHERE user_id = \"${userID}\" AND follower_id = \"${followerID}\" `;
            db.query(SQL, (err, data) => {
                if (err) {
                    return res.status(500).json({ message: "Error Querying database" });
                }
                else {
                    return res
                        .status(201)
                        .json({ message: "unfollowed successfully", status: 201 });
                }
            });
        }
        else {
            const SQL = `INSERT INTO followers(user_id,follower_id,date)VALUES(?,?,?)`;
            db.query(SQL, [userID, followerID, currentDate()], (err, data) => {
                if (err) {
                    return res.status(500).json({ message: "Error Querying database" });
                }
                else {
                    return res
                        .status(201)
                        .json({ message: "Follower created successfully", status: 201 });
                }
            });
        }
    });
});
module.exports = { getFollowers, follow };
