const express = require("express");
const router = express.Router()


const {getProduct} = require("../../Controllers/BloomzonFreshController/freshController")


  router.post("/freshproduct",getProduct)


 

  module.exports = router;