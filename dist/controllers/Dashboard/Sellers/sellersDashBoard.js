"use strict";
const db = require("../../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const dashboard = asyncHandler(async (req, res) => {
    let products = 0;
    let orders = 0;
    let sales = [];
    let messages = 0;
    let users = 0;
    let sellers = 0;
    let followers = 0;
    let customers = 0;
    let wallet = 0;
    let isAdmin = false;
    let Staff_level = 0;
    const { user_id } = req.body;
    //get admin product record
    let SQL = `SELECT * FROM Staff WHERE staff_id=${user_id}`;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        else if (result.length != 0) {
            //if user is a bloomzon admin staff user
            isAdmin = true;
            Staff_level = result[0].level;
            const SQL = `SELECT id FROM products`;
            db.query(SQL, (error, result) => {
                if (error) {
                    console.error(error);
                    return;
                }
                if (result.length != 0) {
                    products = result.length;
                }
                const SQL = `SELECT total FROM orders`;
                db.query(SQL, (error, data) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    if (data.length != 0) {
                        orders = data.length;
                    }
                    const SQL = `SELECT id FROM messages`;
                    db.query(SQL, (error, data) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        if (data.length != 0) {
                            messages = data.length;
                        }
                        const SQL = `SELECT total FROM orders WHERE payment_status = "paid"`;
                        db.query(SQL, (error, data) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            if (data.length != 0) {
                                sales = data;
                            }
                            const SQL = `SELECT id FROM users`;
                            db.query(SQL, (error, data) => {
                                if (error) {
                                    console.error(error);
                                    return;
                                }
                                if (data.length != 0) {
                                    users = data.length;
                                }
                                const SQL = `SELECT id FROM shops`;
                                db.query(SQL, (error, data) => {
                                    if (error) {
                                        console.error(error);
                                        return;
                                    }
                                    if (data.length != 0) {
                                        sellers = data.length;
                                        res.status(201).json({
                                            products: products,
                                            orders: orders,
                                            messages: messages,
                                            sales: sales,
                                            sellers: sellers,
                                            users: users,
                                            isAdmin: isAdmin,
                                            Staff_level: Staff_level,
                                        });
                                    }
                                    else {
                                        res.status(201).json({
                                            products: products,
                                            orders: orders,
                                            messages: messages,
                                            sales: sales,
                                            sellers: sellers,
                                            users: users,
                                            isAdmin: isAdmin,
                                            Staff_level: Staff_level,
                                        });
                                    }
                                });
                            });
                        });
                    });
                });
            });
        }
        else {
            const SQL = `SELECT * FROM products WHERE sellerId = ${user_id} `;
            console.log(user_id);
            db.query(SQL, (error, data) => {
                if (error) {
                    console.error(error);
                    return;
                }
                if (data.length != 0) {
                    products = data.length;
                }
                const SQL = `SELECT id FROM orders WHERE sellerId=${user_id}`;
                db.query(SQL, (error, data) => {
                    if (error) {
                        console.error(error);
                        res.send("Error Quering database").status(401);
                    }
                    console.log(data);
                    if (data.length != 0) {
                        orders = data.length;
                    }
                    console.log(orders);
                    const SQL = `SELECT id FROM messages WHERE sender_id =${user_id} OR receiver_id =${user_id} `;
                    db.query(SQL, (error, data) => {
                        if (error) {
                            console.error(error);
                            res.send("Error Quering database").status(401);
                        }
                        if (data.length != 0) {
                            messages = data.length;
                        }
                        const SQL = `SELECT total FROM orders WHERE  sellerId = ${user_id} AND payment_status = "paid"`;
                        db.query(SQL, (error, data) => {
                            if (error) {
                                console.error(error);
                                res.send("Error Quering database").status(401);
                            }
                            if (data.length != 0) {
                                sales = data;
                            }
                            const SQL = `SELECT user_id FROM orders WHERE  sellerId = ${user_id} `;
                            db.query(SQL, (error, data) => {
                                if (error) {
                                    console.error(error);
                                    res.send("Error Quering database").status(401);
                                }
                                if (data.length != 0) {
                                    customers = data.length;
                                }
                                const SQL = `SELECT id FROM followers WHERE  user_id = ${user_id} `;
                                db.query(SQL, (error, data) => {
                                    if (error) {
                                        console.error(error);
                                        res.send("Error Quering database").status(401);
                                    }
                                    if (data.length != 0) {
                                        followers = data.length;
                                        const SQL = `SELECT balance FROM wallet WHERE user_id = ${user_id}`;
                                        db.query(SQL, (error, data) => {
                                            if (error) {
                                                console.error(error);
                                                return;
                                            }
                                            if (data.length != 0) {
                                                console.log("wallet = " + data);
                                                res.status(201).json({
                                                    products: products,
                                                    orders: orders,
                                                    messages: messages,
                                                    sales: sales,
                                                    customers: customers,
                                                    followers: followers,
                                                });
                                            }
                                            else {
                                                res.status(201).json({
                                                    products: products,
                                                    orders: orders,
                                                    messages: messages,
                                                    sales: sales,
                                                    customers: customers,
                                                    followers: followers,
                                                });
                                            }
                                        });
                                        //res.status(201).json({products:products,orders:orders,messages:messages,sales:sales,customers:customers,followers:followers})
                                    }
                                    else {
                                        const SQL = `SELECT balance FROM wallet WHERE user_id = ${user_id}`;
                                        db.query(SQL, (error, data) => {
                                            if (error) {
                                                console.error(error);
                                                return;
                                            }
                                            if (data.length != 0) {
                                                console.log("wallet = " + data[0].balance);
                                                wallet = data[0].balance;
                                                res.status(201).json({
                                                    products: products,
                                                    orders: orders,
                                                    messages: messages,
                                                    sales: sales,
                                                    customers: customers,
                                                    followers: followers,
                                                    wallet: wallet,
                                                });
                                            }
                                            else {
                                                res.status(201).json({
                                                    products: products,
                                                    orders: orders,
                                                    messages: messages,
                                                    sales: sales,
                                                    customers: customers,
                                                    followers: followers,
                                                    wallet: wallet,
                                                });
                                            }
                                        });
                                        //res.status(201).json({products:products,orders:orders,messages:messages,sales:sales,customers:customers,followers:followers})
                                    }
                                });
                            });
                        });
                    });
                });
            });
        }
    });
    //get admin record
});
const shopprofile = asyncHandler(async (req, res) => {
    const { user_id } = req.body;
    let SQL = `SELECT * FROM shops WHERE user_id = ${user_id}`;
    db.query(SQL, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error Querying database" });
        }
        else {
            res.send(data[0]).status(201);
        }
    });
});
const editshopprofile = asyncHandler(async (req, res) => {
    const { user_id, column_name, data } = req.body;
    const SQL = `UPDATE shops SET ${column_name} = \'${data}\'  WHERE user_id= ${user_id}`;
    console.log(column_name);
    console.log(data);
    db.query(SQL, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Error Querying database", status: 500 });
        }
        else {
            return res
                .status(201)
                .json({ message: "Record updated successfully", status: 201 });
        }
    });
});
const sales = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    const SQL = `SELECT * FROM Staff WHERE staff_id=${userID}`;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            res.send("Error Quering database").status(401);
        }
        else if (result.length != 0) {
            //if user is an admin user
            const SQL = `SELECT * FROM orders WHERE payment_status = "paid"`;
            db.query(SQL, (err, data) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "Error Querying database", status: 500 });
                }
                else {
                    res.status(201).send(data);
                }
            });
        }
        else {
            console.log("Hi");
            const SQL = `SELECT * FROM orders WHERE  sellerId=${userID} AND payment_status = "paid"`;
            db.query(SQL, (err, data) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "Error Querying database", status: 500 });
                }
                else {
                    res.status(201).send(data);
                }
            });
        }
    });
});
const purchaseHistory = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    console.log(userID);
    const SQL = `SELECT * FROM Staff WHERE staff_id=${userID}`;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            res.send("Error Quering database").status(401);
        }
        else if (result.length != 0) {
            //if user is an admin user
            const SQL = `SELECT * FROM orders`;
            db.query(SQL, (err, data) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "Error Querying database", status: 500 });
                }
                else {
                    res.status(201).send(data);
                }
            });
        }
        else {
            console.log(userID);
            const SQL = `SELECT * FROM orders WHERE  sellerId=${userID}`;
            db.query(SQL, (err, data) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "Error Querying database", status: 500 });
                }
                else {
                    res.status(201).send(data);
                }
            });
        }
    });
});
const followers = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    const SQL = `SELECT * FROM followers WHERE user_id=${userID}`;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            res.send("Error Quering database").status(401);
        }
        else if (result.length === null || result.length === 0) {
            res.status(201).json([]);
        }
        else {
        }
    });
});
const customers = asyncHandler(async (req, res) => {
    let user = [];
    let counter = 0;
    const { userID } = req.body;
    const SQL = `SELECT user_id FROM orders WHERE sellerId=${userID}`;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            res.send("Error Quering database").status(401);
        }
        else if (result.length === null || result.length === 0) {
            res.status(201).json([]);
        }
        else {
            const users = result;
            const size = users.length;
            users.map((data, index) => {
                const SQL = `SELECT * FROM users WHERE id = ${data.user_id}`;
                db.query(SQL, (error, data) => {
                    if (error) {
                        console.error(error);
                        res.send("Error Quering database").status(401);
                    }
                    else if (data.length !== 0) {
                        console.log("Hi");
                        user = [...user, data[0]];
                        counter = counter + 1;
                        console.log("index ->" + size);
                        console.log("counter->" + counter);
                        if (counter === size) {
                            console.log(user);
                            res.status(201).json(user);
                        }
                    }
                });
            });
        }
    });
});
const AdminUsers = asyncHandler(async (req, res) => {
    const SQL = `SELECT * FROM users `;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            res.status(401).json({ message: "Error Quering database" }).status(401);
        }
        else if (result.length === null || result.length === 0) {
            res.status(201).json([]);
        }
        else {
            res.status(201).json(result);
        }
    });
});
const AdminSellers = asyncHandler(async (req, res) => {
    const SQL = `SELECT * FROM shops `;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            res.status(401).json({ message: "Error Quering database" }).status(401);
        }
        else if (result.length === null || result.length === 0) {
            res.status(201).json([]);
        }
        else {
            res.status(201).json(result);
        }
    });
});
const VerifySellers = asyncHandler(async (req, res) => {
    const sellerId = req.body.sellerId;
    console.log("H");
    const SQL = `UPDATE shops SET verificationStatus = "verified" WHERE user_id = ${sellerId} `;
    db.query(SQL, (error, result) => {
        if (error) {
            console.error(error);
            res.status(401).json({ message: "Error Quering database" }).status(401);
        }
        else if (result.length === null || result.length === 0) {
            res.status(201).json([]);
        }
        else {
            res.status(201).json(result);
        }
    });
});
module.exports = {
    AdminSellers,
    AdminUsers,
    customers,
    followers,
    purchaseHistory,
    sales,
    shopprofile,
    dashboard,
    editshopprofile,
    VerifySellers,
};
