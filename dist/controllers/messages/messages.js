"use strict";
const db = require("../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const currentDate = require("../../utility/Date/currentDate");
const date = currentDate();
require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.cloudinaryName,
    api_key: process.env.cloudinaryAPI_KEY,
    api_secret: process.env.cloudinaryAPI_SECRET,
    secure: true,
});
const createUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
};
const getPublicID = (imageUrl) => {
    const id = imageUrl;
    const str = id.slice(-24);
    const removeJPG = str.replace(/.jpg/g, "");
    const removePNG = removeJPG.replace(/.png/g, "");
    const removeJPG2 = removePNG.replace(/.JPG/g, "");
    const removePNG2 = removeJPG2.replace(/.PNG/g, "");
    const result = removePNG2;
    return result;
};
const deleteUpload = async (publicID) => {
    const res = await cloudinary.uploader.destroy(getPublicID(publicID), (error, result) => {
        if (error) {
            console.log(error);
            return error;
        }
        console.log("Deleted");
        return result;
    });
};
const messenger = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    const SQL = `SELECT shops.user_id,logo,name,sender_id,receiver_id,conversations.updated_at FROM shops INNER JOIN conversations ON conversations.receiver_id=shops.user_id AND conversations.sender_id = ${userID}`;
    //const SQL =   `SELECT logo,name,message FROM shops INNER JOIN messages ON messages.receiver_id=shops.user_id AND messages.sender_id = ${userID}`;
    db.query(SQL, (error, data) => {
        if (error) {
            console.error(error);
            res.send("Error Quering database").status(401);
        }
        //const result = data.filter((d)=>d)
        res.send(data);
    });
});
const getmessages = asyncHandler(async (req, res) => {
    const { userID, shopID } = req.body;
    const SQL = `SELECT * FROM messages WHERE sender_id=${userID} AND receiver_id=${shopID} OR sender_id=${shopID} AND receiver_id=${userID} `;
    db.query(SQL, (error, data) => {
        if (error) {
            console.error(error);
            res.send("Error Quering database").status(401);
        }
        res.send(data);
    });
});
const chatseller = asyncHandler(async (req, res) => {
    const { userID, shopID } = req.body;
    const SQL = `SELECT * FROM shops WHERE user_id=${shopID} `;
    db.query(SQL, (error, data) => {
        if (error) {
            console.error(error);
            res.send("Error Quering database").status(401);
        }
        res.send(data);
    });
});
const createmessage = asyncHandler(async (req, res) => {
    const img = req.files;
    console.log(img);
    const { userID, shopID, message, messageType } = req.body;
    console.log(shopID);
    if (messageType === "image") {
        try {
            let b64 = Buffer.from(img[0].buffer).toString("base64");
            let dataURI = "data:" + img[0].mimetype + ";base64," + b64;
            let cldRes = await createUpload(dataURI);
            let imageUrl = cldRes.secure_url;
            console.log(cldRes);
            console.log(imageUrl);
            console.log("starting upload....");
            const message = imageUrl;
            const SQL = `SELECT * from conversations WHERE sender_id = ${userID} AND receiver_id =${shopID} OR sender_id = ${shopID} AND receiver_id =${userID}  `;
            db.query(SQL, (error, result) => {
                if (error) {
                    console.error(error);
                    return;
                }
                if (result.length === 0) {
                    const SQL = `INSERT INTO conversations(sender_id,receiver_id,created_at,updated_at)VALUES(?,?,?,?)`;
                    db.query(SQL, [userID, shopID, date, date], (error, data) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        const SQL = `INSERT INTO messages (sender_id,receiver_id,message,messageType,creator_id,date)VALUES(?,?,?,?,?,?)`;
                        db.query(SQL, [userID, shopID, message, messageType, userID, date], (error, data) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            const SQL = `SELECT * FROM messages WHERE sender_id=${userID} AND receiver_id=${shopID} OR sender_id=${shopID} AND receiver_id=${userID} `;
                            db.query(SQL, (error, data) => {
                                if (error) {
                                    console.error(error);
                                    return;
                                }
                                console.log(data);
                                res.send(data);
                            });
                        });
                    });
                }
                else {
                    const SQL = `SELECT count from conversations  WHERE sender_id = ${userID} AND receiver_id =${shopID} OR sender_id = ${shopID} AND receiver_id =${userID} `;
                    db.query(SQL, (error, result) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        const count = Number(result[0].count);
                        const SQL = `UPDATE conversations SET count = ${count + 1} WHERE sender_id = ${userID} AND receiver_id =${shopID} OR sender_id = ${shopID} AND receiver_id =${userID} `;
                        db.query(SQL, (error, result) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            const SQL = `INSERT INTO messages (sender_id,receiver_id,message,messageType,creator_id,date)VALUES(?,?,?,?,?,?)`;
                            db.query(SQL, [userID, shopID, message, messageType, userID, date], (error, data) => {
                                if (error) {
                                    console.error(error);
                                    return;
                                }
                                const SQL = `SELECT * FROM messages WHERE sender_id=${userID} AND receiver_id=${shopID} OR sender_id=${shopID} AND receiver_id=${userID} `;
                                db.query(SQL, (error, data) => {
                                    if (error) {
                                        console.error(error);
                                        return;
                                    }
                                    res.send(data);
                                });
                            });
                        });
                    });
                }
            });
        }
        catch (error) {
            console.log(error);
            res.send({
                message: error.message,
            });
        }
    }
    else {
        const SQL = `SELECT * from conversations WHERE sender_id = ${userID} AND receiver_id =${shopID} OR sender_id = ${shopID} AND receiver_id =${userID}  `;
        db.query(SQL, (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            if (result.length === 0) {
                const SQL = `INSERT INTO conversations(sender_id,receiver_id,created_at,updated_at)VALUES(?,?,?,?)`;
                db.query(SQL, [userID, shopID, date, date], (error, data) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    const SQL = `INSERT INTO messages (sender_id,receiver_id,message,messageType,creator_id,date)VALUES(?,?,?,?,?,?)`;
                    db.query(SQL, [userID, shopID, message, messageType, userID, date], (error, data) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        const SQL = `SELECT * FROM messages WHERE sender_id=${userID} AND receiver_id=${shopID} OR sender_id=${shopID} AND receiver_id=${userID} `;
                        db.query(SQL, (error, data) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            console.log(data);
                            res.send(data);
                        });
                    });
                });
            }
            else {
                const SQL = `SELECT count from conversations  WHERE sender_id = ${userID} AND receiver_id =${shopID} OR sender_id = ${shopID} AND receiver_id =${userID} `;
                db.query(SQL, (error, result) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    const count = Number(result[0].count);
                    const SQL = `UPDATE conversations SET count = ${count + 1} WHERE sender_id = ${userID} AND receiver_id =${shopID} OR sender_id = ${shopID} AND receiver_id =${userID} `;
                    db.query(SQL, (error, result) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        const SQL = `INSERT INTO messages (sender_id,receiver_id,message,messageType,creator_id,date)VALUES(?,?,?,?,?,?)`;
                        db.query(SQL, [userID, shopID, message, messageType, userID, date], (error, data) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            const SQL = `SELECT * FROM messages WHERE sender_id=${userID} AND receiver_id=${shopID} OR sender_id=${shopID} AND receiver_id=${userID} `;
                            db.query(SQL, (error, data) => {
                                if (error) {
                                    console.error(error);
                                    return;
                                }
                                res.send(data);
                            });
                        });
                    });
                });
            }
        });
    }
});
module.exports = { chatseller, getmessages, createmessage, messenger };
