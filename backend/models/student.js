const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
// const crypto = require("crypto");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    
    groupname: {
        type: String,
        unique: true,
        require: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    
    phone: {
        type: String,
        required: true,
        match: /^(?:7|0|(?:\+94))[0-9]{9,10}$/
    },
    
    member1name: {
        type: String,
        require: true
    },

    member1reg: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z|A-Z]{2}[0-9]{8})$/
    },
    
    member2name: {
        type: String,
        require: true
    },

    member2reg: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z|A-Z]{2}[0-9]{8})$/
    },
    
    member3name: {
        type: String,
        require: true
    },
    
    member3reg: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z|A-Z]{2}[0-9]{8})$/
    },

    member4name: {
        type: String,
        require: true
    },

    member4reg: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z|A-Z]{2}[0-9]{8})$/
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        //select set to false so password doesn't come when querying automatically
        select: false
    },

    panelmember: {
        type: String,
        default: '',
        require: false
    },

})

//this function run before saving data to database
StudentSchema.pre("save", async function(next){

    //hashing the password
    //checking if the password is already hashed
    if (!this.isModified("password")){
        next();
    }

    //hashing the with difficulty level 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
})


// //reset password token
// StudentSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");
  
//     // Hash token (private key) and save to database
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
//     // Set token expire date
//     this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
//     return resetToken;
// };  


const Student = mongoose.model("student",StudentSchema)
module.exports = Student