"use strict";
const db = require('../../Models/dbConfig/db.Config');
async function deleteUser(data) {
    const userID = data;
    const sqlInsert = `DELETE FROM user WHERE id= ${userID}`;
    db.query(sqlInsert, (err, result) => {
        console.log("error", err);
        console.log("result", result);
    });
}
module.exports = {
    deleteUser,
};
