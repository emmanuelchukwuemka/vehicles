"use strict";
const db = require('../../../Models/dbConfig/db.Config');
const asyncHandler = require("express-async-handler");
const getAddress = asyncHandler(async (req, res) => {
    const { id } = req.body;
    let SQL = `SELECT * from addresses WHERE user_id=\'${id}\'`;
    db.query(SQL, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error Querying database" });
        }
        else {
            if (data.length != 0) {
                return res.send(data).status(201);
            }
            else {
                return res.send(data).status(401);
            }
        }
    });
});
//create a new user address
const createAddress = asyncHandler(async (req, res) => {
    const { user_id, name, address, country, state, city, postal_code, phone } = req.body;
    const SQL = `INSERT INTO addresses(user_id,name,address,country,state,city,postal_code,phone)VALUES(?,?,?,?,?,?,?,?)`;
    db.query(SQL, [user_id, name, address, country, state, city, postal_code, phone], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error Querying database" });
        }
        else {
            return res.status(201).json({ message: "Address created successfully", status: 201 });
        }
    });
});
//delete an address
const deleteAddress = asyncHandler(async (req, res) => {
    const { id, userID } = req.body;
    const SQL = `DELETE FROM addresses WHERE  id=${id}`;
    db.query(SQL, (err, data) => {
        if (err) {
            return res.send("Server Error").status(500);
        }
        else {
            const SQL = `SELECT * from addresses WHERE user_id=\'${userID}\'`;
            db.query(SQL, (err, data) => {
                if (err) {
                    return res.status(500).json({ message: "Error Querying database" });
                }
                else {
                    if (data.length != 0) {
                        return res.send(data).status(201);
                    }
                    else {
                        return res.send(data).status(401);
                    }
                }
            });
        }
    });
});
const updateAddress = asyncHandler(async (req, res) => {
    const { id, name, address, country, state, city, postal_code, phone } = req.body;
    const SQL = `UPDATE addresses SET name = \'${name}\' , address = \'${address}\'  , country = \'${country}\' , state = \'${state}\' , city = \'${city}\' , postal_code = \'${postal_code}\' WHERE id=${id}`;
    db.query(SQL, (err, data) => {
        if (err) {
            return res.send("Server Error").status(500);
        }
        else {
            return res.send("address updated successfully").status(202);
        }
    });
});
const setDefaultAddress = asyncHandler(async (req, res) => {
    const { id, userID } = req.body;
    const SQL = `SELECT * from addresses WHERE user_id=\'${userID}\' AND set_default=1`;
    db.query(SQL, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error Querying database" });
        }
        else {
            if (data.length != 0) {
                const address = data[0];
                const SQL = `UPDATE addresses SET set_default = 0  WHERE id=${address.id}`;
                db.query(SQL, (err, data) => {
                    if (err) {
                        return res.send("Server Error").status(500);
                    }
                    else {
                        const SQL = `UPDATE addresses SET set_default = 1  WHERE id=${id}`;
                        db.query(SQL, (err, data) => {
                            if (err) {
                                return res.send("Server Error").status(500);
                            }
                            else {
                                const SQL = `SELECT * from addresses WHERE user_id=\'${userID}\'`;
                                db.query(SQL, (err, data) => {
                                    if (err) {
                                        return res.status(500).json({ message: "Error Querying database" });
                                    }
                                    else {
                                        if (data.length != 0) {
                                            return res.send(data).status(201);
                                        }
                                        else {
                                            return res.send(data).status(401);
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else {
                const SQL = `UPDATE addresses SET set_default = 1  WHERE id=${id}`;
                db.query(SQL, (err, data) => {
                    if (err) {
                        return res.status(500).json({ message: "Error Querying database" });
                    }
                    else {
                        const SQL = `SELECT * from addresses WHERE user_id=\'${userID}\'`;
                        db.query(SQL, (err, data) => {
                            if (err) {
                                return res.status(500).json({ message: "Error Querying database" });
                            }
                            else {
                                if (data.length != 0) {
                                    return res.send(data).status(201);
                                }
                                else {
                                    return res.send(data).status(401);
                                }
                            }
                        });
                    }
                });
            }
        }
    });
});
module.exports = { getAddress, createAddress, deleteAddress, updateAddress, setDefaultAddress };
