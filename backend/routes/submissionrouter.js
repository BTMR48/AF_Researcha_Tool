const router = require("express").Router();
const { viewSubmission,addSubmission} = require('../controllers/submissioncontroller.js')

router.get('/:name', viewSubmission);
router.post('/add', addSubmission);

module.exports = router;