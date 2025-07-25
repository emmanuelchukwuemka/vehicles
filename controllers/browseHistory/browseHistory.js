const db = require("../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const currentDate = require("../../utility/Date/currentDate");

const createHistory = asyncHandler(async (req, res) => {
  const { productID, userID } = req.body;
  let date = currentDate();
  console.log(date);
});

const browseHistory = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  const SQL5 = `SELECT * FROM browse_history_products WHERE user_id=${userID}`;
  db.query(SQL5, (error, result) => {
    if (error) {
      console.log(error);
      return;
    } else {
      let browse_history_data = result;
      res.status(201).send(browse_history_data);
    }
  });
});

module.exports = {
  createHistory,
  browseHistory,
};
