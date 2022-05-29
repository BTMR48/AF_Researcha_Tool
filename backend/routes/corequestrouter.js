const router = require("express").Router();
const{addRequest, updateRequest, viewAllRequest, deleteRequest, viewOneRequest} = require('../controllers/coRequestController.js')

//add new request
router.post('/add', addRequest);

//update existing request
router.put('/update/:id', updateRequest);

// view request
router.get('/', viewAllRequest);

//delete request
router.delete('/delete/:id', deleteRequest);

//view one request
router.get('/:id',viewOneRequest);

module.exports = router;