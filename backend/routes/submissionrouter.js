const router = require("express").Router();
const { viewCart, viewOneCart} = require('../controllers/submissioncontroller.js')
const patientauth = require('../middleware/patientauth');

router.get('/:id&:type', viewCart);

router.get('/:id', viewOneCart);

module.exports = router;