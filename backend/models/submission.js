
const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const SubmissionSchema=new Schema({
    
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student',
        // type:String,
        required:true
    },
    // progressID:{
    //     // type: mongoose.Schema.Types.ObjectId,
    //     // ref:'progress',
    //     type:String,
    //     required:true
    // },

    name:{
        type:String,
        required: true
    },
    groupID :{
        type:String,
        required:true,
       
    },
    date:{
        type:String,
        required:true, 
    },
    imgUrl:{
        type:String,
        required:false, 
    }

})

const Submission=mongoose.model("stdsubmission",SubmissionSchema);
module.exports=Submission;

