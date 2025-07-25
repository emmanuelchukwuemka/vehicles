const db = require("../../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const { sendEmail } = require("../../email/email");
const currentDate = require("../../../utility/Date/currentDate");
const UpdateAccount_type = asyncHandler(async (req, res) => {
  const { id, user_type } = req.body;
  let SQL = `SELECT * from users WHERE id=\'${id}\'`;

  db.query(SQL, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error Querying database" });
    } else {
      if (result.length != 0) {
        const user = result[0];
        const { id, email } = user;
        SQL = `UPDATE users SET user_type = \'${user_type}\' WHERE id=${id}`;
        db.query(SQL, (error, result) => {
          if (error) console.log(error);
          console.info(result);
        });
        if (user_type === "Sellers") {
          SQL = `SELECT * from sellers WHERE user_id=\'${id}\'`;
          db.query(SQL, (err, data) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error Querying database" });
            } else {
              if (data.length != 0) {
              } else {
                SQL = `INSERT INTO sellers(user_id)VALUES(?)`;
                db.query(SQL, [id], (err, data) => {
                  if (err)
                    return res
                      .status(500)
                      .json({ message: "Error Querying database" });
                });

                SQL = `INSERT INTO shops(user_id)VALUES(?)`;
                db.query(SQL, [id], (err, data) => {
                  if (err)
                    return res
                      .status(500)
                      .json({ message: "Error Querying database" });
                });
              }
            }
          });
        } else if (user_type === "Buyers") {
          SQL = `SELECT * from sellers WHERE user_id=\'${id}\'`;
          db.query(SQL, (err, data) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error Querying database" });
            } else {
              if (data.length != 0) {
                SQL = `DELETE FROM sellers WHERE user_id=\'${id}\'`;
                db.query(SQL, (err, data) => {
                  if (err)
                    return res
                      .status(500)
                      .json({ message: "Error Querying database" });
                });

                SQL = `DELETE FROM shops WHERE user_id=\'${id}\'`;
                db.query(SQL, [id], (err, data) => {
                  if (err)
                    return res
                      .status(500)
                      .json({ message: "Error Querying database" });
                });

                const data = {
                  email: `${email}`,
                  subject: "Account update",
                  text: `Your Seller account has been deleted ${currentDate()}`,
                };
                sendEmail(data);
              } else {
              }
            }
          });
        }
        const data = {
          email: `${email}`,
          subject: "Bloomzon Account Update",
          text: `You just made an update to your account at ${currentDate()}`,
        };
        sendEmail(data);
        return res
          .status(201)
          .json({
            message: "Account usertype updated successfully",
            status: 201,
          });
      } else {
        return res
          .status(401)
          .json({ message: "Failed to update account type", status: 401 });
      }
    }
  });
});

module.exports = UpdateAccount_type;
