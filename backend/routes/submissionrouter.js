const router=require("express").Router();
const{ addSubmission  }=require('../controllers/submissioncontroller');
//const{ fetchAll, fetchOne }=require('../controllers/submissioncontroller.js');

router.post('/add', addSubmission);


module.exports =router;