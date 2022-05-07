const router=require("express").Router();
const { signinSupervisor, signupSupervisor, updateSupervisor, deleteSupervisor } =require('../controllers/supervisorcontroller.js');
const { fetchAll, fetchOne} =require('../controllers/supervisorcontroller.js');

router.post('/signup',signupSupervisor);

router.post('/signin',signinSupervisor);

router.put('/update/:id',updateSupervisor);

router.delete('/delete/:id', deleteSupervisor);

router.post('/',fetchAll);

router.get('/:id',fetchOne);

module.exports = router;