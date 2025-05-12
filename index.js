const express = require('express');
const bodyParser = require('body-parser');
//const http = require('http');
require('dotenv').config();
const axios = require('axios');
const userRouter = require("./controllers/users.controller")
const cartRouter = require("./controllers/cart.controller")
const sellerRouter = require("./controllers/seller.controller")
const productRouter = require("./controllers/product.controller")
const categoryRouter = require("./controllers/categories.controller")
const adminRouter = require("./controllers/admin.controller")
const { jwtValidator, checkPayload, requestTimer } = require("./mw/middlewares");

const app = express();
const port = process.env.APP_PORT_NUMBER;


// Middleware to parse JSON
app.use(bodyParser.json({ limit: '500kb' }));

app.use(checkPayload)
//app.use(requestTimer)

app.use("/user", userRouter);

app.use("/cart", cartRouter);

app.use("/seller", sellerRouter);

app.use("/product", productRouter);

app.use("/category", categoryRouter);

app.use("/admin", adminRouter);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
