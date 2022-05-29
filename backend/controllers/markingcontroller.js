const Marking = require('../models/marking');

//add 
exports.addMarking = async (req, res) => {
 
  //constant variables for the attributes
  const {progress_name,submission_doc} = req.body;
  
   
 
  //object
  const newMarking= new Marking({
    //initializing properties
    progress_name,     
    submission_doc
  
  })
 
  //saving the object to the db 
  newMarking.save().then(() => {
    res.status(200).json({ status: "New Marking schema Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Marking Item",error:error.message})
  })
}


//view
exports.viewMarking= async(req,res) => {
    Marking.find().then((marking) => {
        res.status(200).json(marking )
      }).catch((error) => {
        res.status(500).json({ message: "Error with fetching marking", error: error.message });
      })
}
