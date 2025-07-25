const db = require('../../../Models/dbConfig/db.Config')
const asyncHandler = require("express-async-handler");

const MyCoupon = asyncHandler ( async (req,res)=>{

  const {id} = req.body
  let  SQL = `SELECT * from users WHERE id=\'${id}\'`

  db.query(SQL,(err,result)=>{
      if(err)
      {
        return res.status(500).json({message: "Error Querying database"});
      }else{
       if(result.length!=0){
        const user = result[0]
        const {coupon_code} = user
         return res.status(201).json({message: "Account usertype updated successfully",coupon_code:coupon_code,status:201});
            
       }else{
         
          return res.status(401).json({message: "Failed to get coupon",status:401});
     
       }}
     })
 
  })

  module.exports = MyCoupon;


