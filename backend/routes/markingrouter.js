const router = require("express").Router();
const { viewMarking } = require('../controllers/markingcontroller.js')

//view appointment
router.get('/view', viewMarking);

module.exports = router;
