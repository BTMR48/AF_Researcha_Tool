const router = require("express").Router();
const studentauth = require('../middleware/studentauth');
const { studentsignup, studentsignin, updateStudent, deleteStudent} = require('../controllers/studentcontroller.js');
const { forgotPassword, resetPassword, fetchAll, fetchOne} = require('../controllers/studentcontroller.js')

//student sign up
router.post('/signup', studentsignup);

//student sign in
router.post('/signin', studentsignin);

//student update profile
router.put('/updategroup/:id', studentauth, updateStudent);

//student delete profile
router.delete('/deletegroup/:id',studentauth, deleteStudent);

//student forgotPassword
router.post('/forgotpassword', forgotPassword);

//student resetPassword
router.put('/resetpassword/:resetPasswordToken', resetPassword);

//find all students
router.get('/', fetchAll);

//find one student
router.get('/:id', fetchOne);


module.exports = router;