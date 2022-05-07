const router = require("express").Router();
const { addProgress, deleteProgress, updateProgress,viewAllProgress, viewOneProgress, viewPUBLISHProgress } = require('../controllers/progresscontroller.js')
 
//add new Progress
router.post('/add', addProgress);
 
//delete existing Progress
router.delete('/delete/:id', deleteProgress);
 
//update Progress
router.put('/update/:id', updateProgress);
 
//view all Progress
router.get('/',viewAllProgress);

//view Publish Progress
router.get('/PUBLISH',viewPUBLISHProgress);

//view one Progress
router.get('/level/:id', viewOneProgress);
 
module.exports = router;