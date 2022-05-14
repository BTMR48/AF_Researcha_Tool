const router=require("express").Router();
const { signinPanelmember, signupPanelmember, updatePanelmember, deletePanelmember } =require('../controllers/panelmembercontroller.js');
const { fetchAll, fetchOne} =require('../controllers/panelmembercontroller.js');

router.post('/signup',signupPanelmember);

router.post('/signin',signinPanelmember);

router.put('/update/:id',updatePanelmember);

router.delete('/delete/:id', deletePanelmember);

router.post('/',fetchAll);

router.get('/:id',fetchOne);

module.exports = router;