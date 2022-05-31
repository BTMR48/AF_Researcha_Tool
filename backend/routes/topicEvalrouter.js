const router = require('express').Router();
const { addTopicEval , viewTopicEval , viewOneTopicEval, updateTopicEval} = require('../controllers/topicEvalcontroller');

//add
router.post('/add', addTopicEval);

//view
router.get('/view', viewTopicEval);

//view One
router.get('/view/:id', viewOneTopicEval);

//update
router.put('/update/:id', updateTopicEval);

module.exports = router;