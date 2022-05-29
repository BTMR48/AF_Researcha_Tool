const router = require("express").Router();
const { viewSubmission,addSubmission,addFeedback} = require('../controllers/submissioncontroller.js')

router.get('/:name', viewSubmission);
router.post('/add', addSubmission);
router.post('/:grpId&:proId', addFeedback);
module.exports = router;