const db = require("../../Models/dbConfig/db.Config")
const express = require("express")
const router = express.Router()

const {GiftCards,GiftCard} = require("../../Controllers/GiftCards/GiftCards")



//user routes
router.post("/giftcards",GiftCards);
router.post("/giftcard",GiftCard);

module.exports = router;


