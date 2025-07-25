const db = require("../../../Models/dbConfig/db.Config")
const express = require("express")
const router = express.Router()

const data = [
    {"id":1,"title":"Andre Brut - 75cl, 10.45% Acl","prime":"1","description":"DetailsThe term Brut refers to the dryness of the bubbles. Brut California Champagne is the driest tasting Champagne. This Brut sparkling wine features a medium to the dry blend of white wine grapes, resulting in a fruity flavor somewhere between green apples and sweet lemons. Brut can be used as a mixer in your favorite cocktail or served to enjoy chilled.Key FeaturesDryness And Light mouthfeelAlcohol: 10.45%Size: 75clSingle Bottle","images":"https://bloomzon.com/public/uploads/all/8MyS1eZNtL45e0SOD2BDVCHrvQDICPcQSxJ2xY4r.jpg,https://bloomzon.com/public/uploads/all/4K57KrWp4DxSBxRyZk85XFTe4gP7Zmm40Ba8j2HR.jpg,https://bloomzon.com/public/uploads/all/hYKEcIdewvBVRRPEC3GIRmP1LaslgD2FWllBGTz0.jpg,https://bloomzon.com/public/uploads/all/FvsElh9osu4t1enLESs6mjAMPjU78jQE1FUA9QoR.jpg","price":"14.45","categoryId":71,"sellerId":9,"moq":1,"video":null,"countryId":null,"stateId":null,"colors":"#556B2F","size":"","rating":0}

]
router.get("/upload-to-cart",(req,res)=>{

   data.map((data)=> 
    {
       let user_id = 1
       let title = data.title
       let prime = data.prime
       let description = data.description
       let images = data.images
       let price = data.price
       let categoryId = data.categoryId
       let sellerId = data.sellerId
       let moq = data.moq
       let colors = data.colors
       let size = data.size
       let rating = data.rating
       let video = data.video
       let countryId = data.countryId
       let stateId = data.stateId
      let sqlInsert = `INSERT INTO cart(user_id,title,prime,description,images,price,categoryId,sellerId,moq,video,countryId,stateId,colors,size,rating)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      
      db.query(sqlInsert,[user_id,title,prime,description,images,price,categoryId,sellerId,moq,video,countryId,stateId,colors,size,rating],(err,result)=>
      {
        console.log("error",err);
        console.log("result",result);
      });
  })
  });    
  
  module.exports = router;