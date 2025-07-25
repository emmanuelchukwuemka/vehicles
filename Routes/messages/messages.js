const express = require("express");
const router = express.Router();
const { upload } = require("../../Middleware/Multer");

const {
  chatseller,
  messenger,
  getmessages,
  createmessage,
} = require("../../controllers/messages/messages");

router.post("/getmessages", getmessages);
router.post("/createmessage", upload.array("image", 10), createmessage);
router.post("/messenger", messenger);
router.post("/chatseller", chatseller);

module.exports = router;
