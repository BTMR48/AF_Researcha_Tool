const router = require("express").Router();
const studentauth = require('../middleware/studentauth');
const { studentsignup, studentsignin, updateStudent, deleteStudent} = require('../controllers/studentcontroller.js');
const { forgotPassword, resetPassword, fetchAll, fetchOne} = require('../controllers/studentcontroller.js')

//patient sign up
router.post('/signup', studentsignup);

//patient sign in
router.post('/signin', studentsignin);

//patient update profile
router.put('/updategroup/:id', studentauth, updateStudent);

//patient delete profile
router.delete('/deletegroup/:id',studentauth, deleteStudent);

//patient forgotPassword
router.post('/forgotpassword', forgotPassword);

//patient resetPassword
router.put('/resetpassword/:resetPasswordToken', resetPassword);

//find all patients
router.get('/', fetchAll);

//find one patient
router.get('/:id', fetchOne);


module.exports = router;