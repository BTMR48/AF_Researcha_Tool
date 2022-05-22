const router = require("express").Router();
const{addRequest, viewAllRequest, deleteRequest} = require('../controllers/requestcontroller.js')
const { viewOneRequest } = require('../controllers/requestcontroller.js')

//add new request
router.post('/add', addRequest);

//update existing request
// router.put('/update/:id', updateRequest);

// view request
router.get('/', viewAllRequest);

//view one request
// router.get('/view/:id',viewOneRequest);

//delete request
router.delete('/delete/:id', deleteRequest);

module.exports = router;