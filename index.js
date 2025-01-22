const express = require('express');
const bodyParser = require('body-parser');
//const http = require('http');
require('dotenv').config();
const axios = require('axios');
const userRouter = require("./controllers/users.controller")
const sellerRouter = require("./controllers/seller.controller")
const { jwtValidator, checkPayload } = require("./mw/middlewares");

const app = express();
const port = process.env.APP_PORT_NUMBER;

// Middleware to parse JSON
app.use(bodyParser.json({ limit: '2kb' }));

app.use(checkPayload)

app.use("/api/user", userRouter);

app.use("/api/seller", sellerRouter);

app.listen(port, () => {
    console.log(`Listening in port ${port}`)
})