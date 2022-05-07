const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const ProgressSchema = new Schema({      
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    imgUrl: {
        type: String,
        required: false
    },
    
});

const Progress = mongoose.model("progress",ProgressSchema) 
module.exports = Progress