const mongoose=require('mongoose');

const Schema =mongoose.Schema;

//Model of feedback for submission document 
const FeedbackSchema=new Schema({
    
    grpId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'studentGroups',
        required:true
    },
    proId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'stProgress'
    },

    feedback:{
        type:String,
        required:true
    },

})

const Feedback=mongoose.model("feedbacks",FeedbackSchema);
module.exports=Feedback;