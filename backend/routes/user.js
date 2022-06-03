const router = require("express").Router();
const{getUser} = require('../controllers/usercontroller')

//update existing request
router.get("/:id", getUser);

module.exports = router;