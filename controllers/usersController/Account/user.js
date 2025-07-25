const db = require("../../../Models/dbConfig/db.Config");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../email/email");
const currentDate = require("../../../util/Date/currentDate");
var validator = require("validator");

//create new user or signup
const register = asyncHandler(async (req, res) => {
  const userName = req.body.userName;
  const userEmail = req.body.email.toString().toLowerCase();
  const phone = req.body.phone.toString();
  const PassCode = req.body.passCode.toString();
  const password_hash = bcrypt.hash(`${PassCode}`, 10);
  const user_type = req.body.user_type.toString();
  const country = req.body.country.toString();
  const acceptTerms = req.body.acceptTerms;
  console.log(acceptTerms);
  const subscription = req.body.subscription;
  const SQL = `SELECT * from users where email=\'${userEmail}\'`;

  db.query(SQL, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error Querying database" });
    } else {
      if (result.length != 0) {
        return res.status(401).json({
          message: "An account with this email already existed please login",
          status: 404,
        });
      } else if (validator.isEmail(userEmail) === false) {
        return res
          .status(401)
          .json({ message: "Email address is invalid", status: 404 });
      } else if (validator.isEmail(userEmail)) {
        const SQL = `INSERT INTO users(user_type,name,email,phone,password,country,acceptTerms)VALUES(?,?,?,?,?,?,?)`;

        db.query(
          SQL,
          [
            user_type,
            userName,
            userEmail,
            phone,
            password_hash,
            country,
            acceptTerms,
          ],
          (err, result) => {
            if (err) {
              console.log("error", err);
            } else {
              if (user_type === "seller") {
                const SQL = `SELECT * from users where email=\'${userEmail}\'`;
                db.query(SQL, (err, result) => {
                  if (err) {
                    return res
                      .status(500)
                      .json({ message: "Error Querying database" });
                  } else {
                    const user = result[0];
                    const { id, name } = user;
                    const SQL = `INSERT INTO sellers(user_id)VALUES(?)`;
                    db.query(SQL, [id], (err, result) => {
                      if (err) {
                        console.log("error", err);
                      } else {
                      }
                    });
                    const SQL1 = `INSERT INTO shops(user_id,name)VALUES(?,?)`;
                    db.query(SQL1, [id, name], (err, result) => {
                      if (err) {
                        console.log("error", err);
                      } else {
                      }
                    });
                    const data = {
                      email: `${userEmail}`,
                      subject: "Bloomzon E-commerce",
                      text: `Welcome to bloomzon international , your shop has been created successfully, please login to your account to complete shop registration`,
                    };
                    sendEmail(data);
                    return res.status(201).json({
                      message: "Account Created Successfully",
                      status: 1,
                    });
                  }
                });
              } else {
                const data = {
                  email: `${userEmail}`,
                  subject: "Bloomzon E-commerce",
                  text: `Welcome to bloomzon international , your one stop shopping mall`,
                };
                sendEmail(data);
                return res
                  .status(201)
                  .json({ message: "Account Created Successfully", status: 1 });
              }
            }
          }
        );
      }
    }
  });
});

//Login user
const login = asyncHandler(async (req, res) => {
  const userName = req.body.userName;
  const PassCode = req.body.passCode;
  const SQL = `SELECT * FROM users WHERE email=\'${userName}\'`;
  db.query(SQL, (error, data) => {
    if (error) {
      console.log(error);
      return res
        .status(404)
        .json({ message: "Error Querying database", status: 404 });
    } else if ((data != undefined) & (data.length != 0)) {
      const user = data[0];
      const { password, email, loggedIN } = user;
      const passwordCheck = bcrypt.compare(PassCode, password);
      if (passwordCheck && loggedIN === 0) {
        const SQL = `UPDATE  users SET loggedIN=1 WHERE email=\'${userName}\'`;
        db.query(SQL, (error, result) => {
          if (error) {
            return res
              .status(404)
              .json({ message: "Error Querying database", status: 404 });
          }
          const data = {
            email: `${email}`,
            subject: "Bloomzon Account Login",
            text: `A device just login into your bloomzon account at ${currentDate()}`,
          };
          sendEmail(data);
        });
        return res
          .status(202)
          .json({ message: "Accepted", user: user, status: 202 });
      } else if (passwordCheck === false) {
        return res
          .status(401)
          .json({ message: "Incorrect password", status: 401 });
      } else if (loggedIN === 1) {
        return res.status(403).json({
          message: "Your account is already logged-in in another device",
          status: 403,
        });
      }
    } else {
      return res.status(404).json({
        message: "No account found with this email,please signup",
        status: 404,
      });
    }
  });
});

//Logout user
const logout = asyncHandler(async (req, res) => {
  const userName = req.body.userName;
  console.log(userName);
  const SQL = `UPDATE  users SET loggedIN=0 WHERE email=\'${userName}\'`;
  db.query(SQL, (error, result) => {
    if (error) {
      return res
        .status(404)
        .json({ message: "Error Querying database", status: 404 });
    }
    const data = {
      email: `${userName}`,
      subject: "Bloomzon Account Logout",
      text: `You just logout from your bloomzon account at ${currentDate()}`,
    };
    sendEmail(data);
  });

  return res.status(202).json({ message: "Logout successfully", status: 409 });
});

//find a user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const SQL = `SELECT * FROM users WHERE id=\'${id}\'`;
  db.query(SQL, (error, data) => {
    if (error) {
      console.log(error);
      return res
        .status(404)
        .json({ message: "Error Querying database", status: 404 });
    } else if ((data != undefined) & (data.length != 0)) {
      return res.send(data).status(201);
    }
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { userID, fieldName, fieldData } = req.body;

  const SQL = `UPDATE users SET  ${fieldName} = \'${fieldData}\'  WHERE id=${userID}`;

  db.query(SQL, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error Querying database", status: 500 });
    } else {
      return res
        .status(201)
        .json({ message: "Record updated successfully", status: 201 });
    }
  });
});
module.exports = { getUser, login, logout, register, updateUser };
