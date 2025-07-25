"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const currentDate = require("./util/Date/currentDate");
const getTimeLeft = require("./util/Date/getTimeLeft");
const SubCategory = require("./Routes/SubCategorydata.json");
const ProductRoute = require("./Routes/products/ProductRoutes");
const userRoute = require("./Routes/usersRoutes/usersRoutes"); //create user Router
const categoryRoute = require("./Routes/categoryRoutes/categoryRoutes");
const cartRoute = require("./Routes/cartRoutes/cartRoutes"); //cartRoute
const primeRoute = require("./Routes/PrimeRoutes/PrimeRoutes");
const manufacturersRoute = require("./Routes/Manufacturers/ManufacturerRoutes");
const orderRoute = require("./Routes/OrderRoutes/OrderRoutes");
const dashboardRoutes = require("./Routes/Dashboard/DashboardRoutes");
const browseHistory = require("./Routes/browseHistory/browseHistory");
const GiftCards = require("./Routes/GiftCards/GiftCard");
const paymentRoute = require("./Routes/paymentRoute/paymentRoute");
const upload = require("./Routes/uploadRoute/uploadRoute");
const messages = require("./Routes/messages/messages");
const freshRoute = require("./Routes/BloomzonFresh/freshRoute");
const RealEstate = require("./Routes/RealEstate/RealEstate");
const bannerRoute = require("./Routes/bannerRoute/bannerRouter");
const { upDateDealEndDate, } = require("./controllers/categoryController/allCategory");
const marketRouter = require("./controllers/markets.controller");
const userRouter = require("./controllers/users.controller");
const cartRouter = require("./controllers/cart.controller");
const sellerRouter = require("./controllers/seller.controller");
const vendorRouter = require("./controllers/vendor.controller");
const productRouter = require("./controllers/product.controller");
const categoryRouter = require("./controllers/categories.controller");
const adminRouter = require("./controllers/admin.controller");
const chatRouter = require("./controllers/chat.controller");
const { jwtValidator, checkPayload } = require("./mw/middlewares");
const { pool } = require("./connection/db");
const port = process.env.APP_PORT_NUMBER;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // In production, replace with your frontend URL
        methods: ["GET", "POST"],
    },
});
app.set("io", io);
// Middleware to parse JSON
app.use(body_parser_1.default.json({ limit: "500kb" }));
app.use(checkPayload);
//app.use(requestTimer)
///////////////////////////////////////////////////////
app.use("/market", marketRouter);
app.use("/user", userRouter);
app.use("/cart", jwtValidator, cartRouter);
app.use("/seller", sellerRouter);
app.use("/vendor", vendorRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/admin", adminRouter);
app.use("/chat", chatRouter);
///////////////////////////////////////////////////////////
///const uploadallproducts = require("./Routes/Tools/UploadAllProductsOnceRoute")//Tools
const uploadcountries = require("./Routes/Tools/countryRoute/uploadCoutry"); //upload countries
//MiddleWares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use(express_1.default.static("./public"));
app.use(ProductRoute);
app.use(userRoute); //Users Router Middleware
app.use(categoryRoute); //CategoryRoute Middleware
app.use(cartRoute); //cartRoute
app.use(primeRoute); //primeRoute
app.use(manufacturersRoute); //get resquest to show all manufactures
app.use(orderRoute);
app.use(uploadcountries); //upload countries
app.use(dashboardRoutes); //dashboard routes and controllers access
app.use(browseHistory);
app.use(GiftCards);
app.use(paymentRoute);
app.use(upload);
app.use(messages);
app.use(freshRoute);
app.use(RealEstate);
app.use(bannerRoute);
//update deal time left
//setInterval(()=>{ upDateDealEndDate();},1000)
const date = currentDate();
console.log(date);
const timeLeft = getTimeLeft("Sun Sep 18 2024 06:47:31 GMT-0700");
console.log(timeLeft);
app.get("/SubCategory", (req, res) => {
    res.send(SubCategory);
    // res.send("Texting....")
});
//////////////////////////////////////////////////////////
(0, socket_1.initSocket)(io, pool);
// Start server
server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
