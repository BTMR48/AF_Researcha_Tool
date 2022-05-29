const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const FeedbackSchema=new Schema({
    
    grpId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'studentGroups',
        required:true
    },
    proId:{
        type:String,
        required:true,
        ref:'stProgress'
    },

    description:{
        type:String,
        required:true
    },

})

const Feedback=mongoose.model("feedbacks",FeedbackSchema);
module.exports=Feedback;