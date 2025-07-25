const db = require("../../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");

const AccountType = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const SQL = `SELECT * FROM users WHERE id=${id}`;
  db.query(SQL, (error, result) => {
    if (error) {
      console.log(error);
      return res
        .status(404)
        .json({ message: "Error Querying database", status: 404 });
    } else if ((result != undefined) & (result.length != 0)) {
      const user = result[0];
      return res
        .status(202)
        .json({ message: "Accepted", userType: user.user_type, status: 202 });
    }
  });
});

module.exports = AccountType;
