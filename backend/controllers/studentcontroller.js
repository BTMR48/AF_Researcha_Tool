const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Student = require('../models/student');
const sendEmail = require("../utils/sendEmail")

//student sign in controller
exports.studentsignin = async(req, res) => {
    const {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password)
        return res.status(400).json({message: "Please provide an email and password" });

    try{
        //finding student by email
        const student = await Student.findOne({email}).select("+password");
        
        //if student doesn't exist
        if (!student) 
            return res.status(404).json({message: "User doesn't exist"});

        //compare the provided password with the password in the database
        const ispasswordCorrect = await bcrypt.compare(password, student.password);

        //if passwords don't match
        if (!ispasswordCorrect)
            return res.status(400).json({message: "Invalid credentials"});

        //creating a token
        const token = jwt.sign({email: student.email, id: student._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the student object and token as the response
        res.status(200).json({success: true, result: student, token})
    }catch(error){
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}


//student sign up controller
exports.studentsignup = async(req,res) => {
    const {firstname, lastname, email, gender, nic, phone, address, password} = req.body;
    const dob = new Date(req.body.dob)

    const today = new Date().getFullYear()
    const year = dob.getFullYear()
    const age = today - year

    try {
        //checking email already exists
        const checkEmail = await Student.findOne({email})
        const checkNIC = await Student.findOne({nic})

        if(checkEmail)
            return res.status(409).json({message: "User with this email already exists"})
        
        if(checkNIC)
            return res.status(409).json({message: "User with this NIC already exists"})

        //creating a new student
        const student = await Student.create({firstname, lastname, email, dob, age, gender, nic, phone, address, password});

        //creating a token
        const token = jwt.sign({email: student.email, id: student._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the student object and token as the response
        res.status(200).json({success: true, result: student, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//update student controller
exports.updateStudent = async(req,res) => {
    let studentID = req.params.id;

    const {firstname, lastname, email, phone, address, bloodGroup} = req.body;
    const weight = Number(req.body.weight)
    const height = Number(req.body.height)
    const bloodPressure = Number(req.body.bloodPressure)
    const sugarLevel = Number(req.body.sugarLevel)
    let bmi

    if(weight != undefined && height != undefined){
        bmi = weight / (height * height)
        bmi = bmi.toFixed(2);
    }

    //object with provided data
    const updateStudent = {
        firstname, lastname, email, phone, address,
        weight, height, bloodPressure, bloodGroup, sugarLevel, bmi
    }

    try {
        //find student by studentID and update the student with provided data
        await Student.findByIdAndUpdate(studentID, updateStudent);

        //sending the status message successful
        res.status(200).json({success: true, message: "Profile updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

//delete student controller
exports.deleteStudent = async(req,res) => {
    let studentID = req.params.id;

    try {
        //find student by studentID and delete it
        await Student.findByIdAndDelete(studentID);

        //sending the status message successful
        res.status(200).json({success: true, message: "Student deleted"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

//Forgot Password controller
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
        //finding student by email
        const student = await Student.findOne({ email });
  
        //if student doesn't exist
        if (!student)
            return res.status(404).json({message: "No user with this email"});
  
        // Reset Token Gen and add to database hashed (private) version of token
        const resetPasswordToken = student.getResetPasswordToken();
    
        await student.save();
    
        // Create reset url to email to provided email
        const resetPasswordUrl = `http://localhost:3000/student/passwordreset/${resetPasswordToken}`;
    
        // HTML Message
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${resetPasswordUrl} clicktracking=off>${resetPasswordUrl}</a>
        `;
    
        try {
            //sending the the email
            await sendEmail({to: student.email, subject: "Password Reset Request", text: message});
    
            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (error) {
            
            //if the email sending failed remove reset token
            student.resetPasswordToken = undefined;
            student.resetPasswordExpire = undefined;
    
            await student.save();
    
            res.status(500).json({message: "Email could not be sent", error: error.message});
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};

//Reset Password controller
exports.resetPassword = async (req, res) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetPasswordToken).digest("hex");
  
    try {
        //check whether a user exists with same reset password token and expiration time greater than current time
        const student = await Student.findOne({resetPasswordToken,resetPasswordExpire: { $gt: Date.now() },});
  
        if (!student)
            return res.status(400).json({message: "Invalid Token", error: error.message});

        //saving the new password
        student.password = req.body.password;

        //remove the reset password token
        student.resetPasswordToken = undefined;
        student.resetPasswordExpire = undefined;
    
        await student.save();

        //creating a token
        const token = jwt.sign({email: student.email, id: student._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    
        res.status(201).json({success: true, result: student, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};

//fetch students controller
exports.fetchAll = async(req,res) => {

    try {
        //find all students in the database
        const students = await Student.find();

        res.status(200).json({success: true, result: students})
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong", error: error.message});
    }
}

//fetch one Student controller
exports.fetchOne = async(req,res) => {
    let studentID = req.params.id;

    try {
        //find student with the specific id
        const student = await Student.findById(studentID);

        res.status(200).json({success: true, result: student})
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong", error: error.message});
    }
}