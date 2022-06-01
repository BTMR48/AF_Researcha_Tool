const router = require("express").Router();
const{addConversation,getConversation,getTwoUserConversation} = require('../controllers/conversationcontroller')

//add new request
router.post('/', addConversation);

//update existing request
router.get("/:userId", getConversation);

// view request
router.get("/find/:firstUserId&:secondUserId", getTwoUserConversation);

module.exports = router;