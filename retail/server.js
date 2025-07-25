const express  = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT||5500
const os = require("os")
const db = require('./Models/dbConfig/db.Config')
const fs = require('fs')
const helmet  =  require("helmet")

const currentDate = require("./util/Date/currentDate")
const getTimeLeft = require("./util/Date/getTimeLeft")
const SubCategory = require("./Routes/SubCategorydata.json");
const ProductRoute = require("./Routes/products/ProductRoutes")
const userRoute = require('./Routes/usersRoutes/usersRoutes') //create user Router 
const categoryRoute = require("./Routes/categoryRoutes/categoryRoutes")
const cartRoute = require("./Routes/cartRoutes/cartRoutes")//cartRoute
const primeRoute = require("./Routes/PrimeRoutes/PrimeRoutes")
const manufacturersRoute = require("./Routes/Manufacturers/ManufacturerRoutes")
const orderRoute = require("./Routes/OrderRoutes/OrderRoutes")
const dashboardRoutes = require("./Routes/Dashboard/DashboardRoutes")
const browseHistory = require("./Routes/browseHistory/browseHistory")
const GiftCards = require("./Routes/GiftCards/GiftCard")
const paymentRoute = require('./Routes/paymentRoute/paymentRoute')
const upload = require('./Routes/uploadRoute/uploadRoute')
const messages = require('./Routes/messages/messages')
const freshRoute = require("./Routes/BloomzonFresh/freshRoute")
const RealEstate = require("./Routes/RealEstate/RealEstate")
const bannerRoute = require("./Routes/bannerRoute/bannerRouter")
const { upDateDealEndDate } = require("./Controllers/categoryController/allCategory")



///const uploadallproducts = require("./Routes/Tools/UploadAllProductsOnceRoute")//Tools
const uploadcountries = require("./Routes/Tools/countryRoute/uploadCoutry")//upload countries
//MiddleWares
app.use(cors({"Access-Control-Expose-Headers": "Content-Range"}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(helmet())
app.use(express.static("./public"))
app.use(ProductRoute)
app.use(userRoute)//Users Router Middleware 
app.use(categoryRoute)//CategoryRoute Middleware
app.use(cartRoute)//cartRoute
app.use(primeRoute)//primeRoute
app.use(manufacturersRoute)//get resquest to show all manufactures
app.use(orderRoute);
app.use(uploadcountries);//upload countries
app.use(dashboardRoutes);//dashboard routes and controllers access
app.use(browseHistory)
app.use(GiftCards)
app.use(paymentRoute)
app.use(upload)
app.use(messages)
app.use(freshRoute)
app.use(RealEstate)
app.use(bannerRoute)


//update deal time left
//setInterval(()=>{ upDateDealEndDate();},1000)



const date = currentDate()
console.log(date)





const timeLeft = getTimeLeft("Sun Sep 18 2024 06:47:31 GMT-0700");

console.log(timeLeft);

app.get("/SubCategory",(req,res)=>{
    res.send(SubCategory)
   // res.send("Texting....")
})




app.listen(port, () => {
  console.log(`Examples app  very listening at http://localhost:${port}`);
});

module.exports = app;