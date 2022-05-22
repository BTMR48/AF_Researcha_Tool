const router = require("express").Router();
const { viewSubmission} = require('../controllers/submissioncontroller.js')

router.get('/:id', viewSubmission);

module.exports = router;