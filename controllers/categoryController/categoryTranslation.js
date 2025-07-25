const db = require('../../Models/dbConfig/db.Config')
const asyncHandler = require("express-async-handler");

const categoryTranslation = asyncHandler ( async (req,res)=>{

    const SQL = `SELECT * FROM category_translations`;  
    db.query(SQL,(error , result)=>{
  
        res.send(result);
    })
  })

  module.exports = categoryTranslation;