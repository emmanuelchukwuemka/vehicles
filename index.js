const express = require('express');
const bodyParser = require('body-parser');
//const http = require('http');
require('dotenv').config();
const axios = require('axios');
const userRouter = require("./controllers/users.controller")
const sellerRouter = require("./controllers/seller.controller")
const productRouter = require("./controllers/product.controller")
const categoryRouter = require("./controllers/categories.controller")
const adminRouter = require("./controllers/admin.controller")
const { jwtValidator, checkPayload } = require("./mw/middlewares");

const app = express();
const port = process.env.APP_PORT_NUMBER;

// Middleware to parse JSON
app.use(bodyParser.json({ limit: '200kb' }));

app.use(checkPayload)

app.use("/user", userRouter);

app.use("/seller", sellerRouter);

app.use("/product", productRouter);

app.use("/category", categoryRouter);

app.use("/admin", adminRouter);

app.listen(port, () => {
    console.log(`Listening in port ${port}`)
})