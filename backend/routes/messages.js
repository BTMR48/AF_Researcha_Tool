const router = require("express").Router();
const{addMessage,getMessage} = require('../controllers/messageController')

//add new request
router.post("/", addMessage);

//update existing request
router.get("/:conversationId", getMessage);

module.exports = router;