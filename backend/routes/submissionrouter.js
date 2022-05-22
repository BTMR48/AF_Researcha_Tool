const router = require("express").Router();
const { viewSubmission,addSubmission} = require('../controllers/submissioncontroller.js')

router.get('/:id', viewSubmission);
router.post('/add', addSubmission);

module.exports = router;