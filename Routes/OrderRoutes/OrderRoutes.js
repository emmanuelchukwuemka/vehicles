const express = require("express")
const router = express.Router()

const { orderDetails,searchOrders,orders,placeOrder,buyAgain,placeOrderCart} = require("../../Controllers/orders/orders")

router.post("/orders", orders)
router.post("/placeorders", placeOrder)
router.post("/buyagain", buyAgain)
router.post("/placeorderscart",placeOrderCart)
router.post("/searchorder",searchOrders)
router.post("/orderdetails",orderDetails)

  
 module.exports = router;
