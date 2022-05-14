const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required:true
    },

    supervisorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'supervisor',
        required: true
    },

    field:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'field',
        required: true
    },

    topic:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'field',
        required: true
    },

    time: {
        type: String,
        required: true
      },
    
    date: {
        type: String,
        required: true
      }
});

const Request = mongoose.model("request", RequestSchema)
module.exports = Request