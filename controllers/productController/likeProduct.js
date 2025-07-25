const db = require("../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const currentDate = require("../../utility/Date/currentDate");
const e = require("express");

const likeProduct = asyncHandler(async (req, res) => {
  const { productID, userID } = req.body;
  console.log(productID);

  const SQL = `SELECT * FROM products WHERE id = \"${productID}\"`;
  db.query(SQL, (error, data) => {
    if (error) {
      console.log(error);
      return res
        .status(404)
        .json({ message: "Error Querying database", status: 404 });
    }
    if ((data != undefined) & (data.length != 0)) {
      const likes = data[0].likes;
      const SQL = `UPDATE  products SET likes = \"${
        Number(likes) + 1
      }\" WHERE id = \"${productID}\"`;
      db.query(SQL, (error, data) => {
        if (error) {
          console.log(error);
          return res
            .status(404)
            .json({ message: "Error Querying database", status: 404 });
        }
        console.log("Liked successfully");
      });
    }
  });
});

module.exports = likeProduct;
