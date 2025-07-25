const db = require("../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");

const allCountries = asyncHandler(async (req, res) => {
  const categoryId = req.body.CategoryID;
  const sqlGet = `SELECT * FROM countries`;
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

module.exports = allCountries;
