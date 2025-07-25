"use strict";
const express = require("express");
const router = express.Router();
const { upload } = require('../../Middleware/Multer');
const { createProduct, updateProduct, uploadShopAvatar, uploadShopID, uploadProfilePhoto, createRealEstatePost, editRealEstatePost } = require('../../Controllers/upload/upload');
//upload avatar
router.post("/uploadavatar", upload.array('photo', 3), uploadShopAvatar);
router.post("/uploadid", upload.array('photo', 3), uploadShopID);
router.post("/profilephoto", upload.array('photo', 3), uploadProfilePhoto);
router.post("/updateproduct", upload.array('image', 10), updateProduct);
router.post("/createproduct", upload.array('image', 10), createProduct);
router.post("/createRealEstatePost", upload.array('image', 10), createRealEstatePost);
router.post("/editRealEstatePost", upload.array('image', 10), editRealEstatePost);
module.exports = router;
