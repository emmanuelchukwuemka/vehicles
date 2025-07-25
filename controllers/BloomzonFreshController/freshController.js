const db = require("../..//Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const currentDate = require("../../util/Date/currentDate");

const getProduct = asyncHandler(async (req, res) => {
  const { categoryID } = req.body;

  //console.log(categoryID)

  const SQL = ` SELECT * FROM freshProducts WHERE categoryId = ${categoryID}`;

  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
      return;
    } else if (result != null) {
      res.status(201).json({ data: result, status: "success" });
    }
  });
});

module.exports = {
  getProduct,
};
