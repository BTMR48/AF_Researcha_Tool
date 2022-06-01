const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    following: {
      type: Array,
    },
   
    rId :{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
       
    },
    role:{
        type:String,
        required:true, 
    },
    imgUrl:{
        type:String,
        required:false, 
    },
    name:{
        type:String,
        required:true, 
    }
}
  
);

module.exports = mongoose.model("users", UserSchema);
