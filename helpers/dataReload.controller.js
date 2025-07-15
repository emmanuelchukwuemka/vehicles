const { comparePasswords } = require("./hasher");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.reloadController = async (res, response) => {
  //const expiration = Math.floor(Date.now() / 1000) + (60 * 60);// 1 hour
  const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days

  const accessToken = jwt.sign(
    { ...response.data, exp: expiration },
    process.env.JWT_SECRET
  );

  const user_id = response.data.id;
  const firstName = response.data.first_name;
  const lastName = response.data.last_name;
  const phone = response.data.phone;
  const email = response.data.email;
  const is_verified = parseInt(response.data.is_verified);

  return res.status(200).json({
    success: true,
    user_id,
    firstName,
    lastName,
    phone,
    email,
    is_verified,
    token: accessToken,
    refreshToken: "rhiser76ssbds",
  });
};
