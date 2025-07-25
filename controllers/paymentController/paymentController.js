const asyncHandler = require("express-async-handler");
const db = require("../../Models/dbConfig/db.Config");
const currentDate = require("../../utility/Date/currentDate");

const stripe = require("stripe")(
  "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"
);

const date = currentDate();

const stripePayment = asyncHandler(async (req, res) => {
  let paymentIntent = "";

  const userID = req.body.userID;
  const token = req.body.token;
  console.log(userID);
  console.log(token);
  try {
    // create a PaymentIntent
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(Number(req.body.amount) * 100), // Integer, usd -> pennies, eur -> cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the secr

    const SQL = `INSERT INTO stripe_intent(user_id,paymentIntent,token,date)VALUES(?,?,?,?)`;
    db.query(
      SQL,
      [userID, paymentIntent.client_secret, token, date],
      (error, result) => {
        if (error) {
          console.log(error);
        }

        console.log(paymentIntent.client_secret);
      }
    );
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

const stripeXPayment = asyncHandler(async (req, res) => {
  let paymentIntent = "";
  const userID = req.body.userID;
  console.log(userID);
  try {
    // create a PaymentIntent
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(Number(req.body.amount) * 100), // Integer, usd -> pennies, eur -> cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the secret

    res
      .json({ status: "202", paymentIntent: paymentIntent.client_secret })
      .status(201);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

const getStripeIntent = asyncHandler(async (req, res) => {
  const userID = req.body.userID;
  const token = req.body.token;
  let stripeIntent = "";
  console.log("the token = " + token);

  SQL = `SELECT * FROM stripe_intent WHERE user_id = ${userID} AND token = ${token} `;

  db.query(SQL, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error Querying database" });
    } else if ((result != undefined) & (result.length != 0)) {
      stripeIntent = result[0].paymentIntent;
      console.log(stripeIntent);
      SQL = `DELETE FROM stripe_intent WHERE user_id = ${userID}`;
      db.query(SQL, (error, result) => {
        if (err) {
          console.log(error);
          return res
            .status(404)
            .json({ message: "Error Querying database", status: 404 });
        } else {
          return res
            .status(202)
            .json({ stripeIntent: stripeIntent, status: 202 });
        }
      });
    }
  });
});

module.exports = {
  stripePayment,
  stripeXPayment,
  getStripeIntent,
};
