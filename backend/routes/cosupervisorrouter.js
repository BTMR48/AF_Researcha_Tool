const router=require("express").Router();
const { signinCosupervisor, signupCosupervisor, updateCosupervisor, deleteCosupervisor } =require('../controllers/cosupervisorcontroller.js');
const { fetchAll, fetchOne} =require('../controllers/cosupervisorcontroller.js');

router.post('/signup',signupCosupervisor);

router.post('/signin',signinCosupervisor);

router.put('/update/:id',updateCosupervisor);

router.delete('/delete/:id', deleteCosupervisor);

router.post('/',fetchAll);

router.get('/:id',fetchOne);

module.exports = router;