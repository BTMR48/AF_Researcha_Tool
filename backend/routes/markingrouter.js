const router = require("express").Router();
const { viewMarking,addMarking } = require('../controllers/markingcontroller.js')


//add
router.post('/add', addMarking);

//view appointment
router.get('/view', viewMarking);

module.exports = router;
