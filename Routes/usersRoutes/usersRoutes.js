const db = require("../../Models/dbConfig/db.Config");
const express = require("express");
const router = express.Router();

const AccountType = require("../../controllers/usersController/settings/AccountType");
const updateAccountType = require("../../controllers/usersController/settings/updateAccountType");
const MyCoupon = require("../../controllers/usersController/settings/MyCoupon");

const {
  getUser,
  login,
  logout,
  register,
  updateUser,
} = require("../../controllers/usersController/Account/user");
const {
  getAddress,
  createAddress,
  deleteAddress,
  updateAddress,
  setDefaultAddress,
} = require("../../controllers/usersController/Address/Address");
const {
  forgetPassword,
  confirmOTP,
  resetPassword,
  deleteUser,
} = require("../../controllers/usersController/Auth/Auth");
const user = require("../../controllers/usersController/userController");

const {
  follow,
  getFollowers,
} = require("../../controllers/usersController/follow/follow");

//user routes
router.post("/login", login);
router.post("/logout", logout);
router.post("/createaccount", register);
router.post("/getuser", getUser);
router.post("/updateuser", updateUser);

//followers routes
router.post("/follow", follow);
router.post("/getFollowers", getFollowers);

//Auth route
router.post("/forgetpassword", forgetPassword);
router.post("/confirmotp", confirmOTP);
router.post("/updatepassword", resetPassword);
router.post("/deleteaccount", deleteUser);

router.post("/account_type", AccountType);
router.post("/updateaccount_type", updateAccountType);
router.post("/mycoupon_code", MyCoupon);

//Address routes
router.post("/youraddresses", getAddress);
router.post("/createaddress", createAddress);
router.post("/deleteaddress", deleteAddress);
router.delete("/updateaddress", updateAddress);
router.post("/setdefaultaddress", setDefaultAddress);

router.post("/users", (req, res) => {
  const LMT = req.body.LMT;
  const SQL = req.body.sql.toString();

  db.query(SQL, (error, result) => {
    console.log(SQL);
    res.send(result);
  });
});

router.put("/users", (req, res) => {
  const id = JSON.stringify(req.body.id);
  const name = JSON.stringify(req.body.name);
  const email = JSON.stringify(req.body.email);
  const address = JSON.stringify(req.body.address);

  const SQL = `UPDATE users SET name=${name} , email=${email} , address=${address}  WHERE id = ${id}`;

  db.query(SQL, (error, result) => {
    res.send(SQL);
  });
});

router.get("/user", (req, res) => {
  const sqlGet = "SELECT * FROM users";

  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

module.exports = router;
