const Progress = require("../models/progress");

//add new Progress
exports.addProgress = async (req, res) => {
 
  //constant variables for the attributes
  const {name, description, type, date,imgUrl} = req.body;
 
  //object
  const newProgress= new Progress({
    //initializing properties
    name,     
    description, 
    type, 
    date,
    imgUrl
  
  })
 
  //saving the object to the db 
  newProgress.save().then(() => {
    res.status(200).json({ status: "New Progress Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Progress Item",error:error.message})
  })
}

//delete existing Progress
exports.deleteProgress = async (req, res) => {
  let progressId = req.params.id;
 
  await Progress.findByIdAndDelete(progressId).then(() => {
    res.status(200).json({ status: "Progress Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting Progress", error: error.message });
  })
}
 
//update Progress
exports.updateProgress = async (req, res) => { 
  //fetch id from url
  let progressId = req.params.id;
 
  const {name, description,type, date,imgUrl} = req.body;
 
  const updateProgress = {
    name,
    description,
    type,
    date, 
    imgUrl
  }

  //check whether there's a Progress for the ID
  try {
    await Progress.findByIdAndUpdate(progressId, updateProgress);

    //sending the successful status
    res.status(200).json({ success: true, message: "Progress Updated" })
  } catch (error) {
    res.status(500).json({ message: "Error with Updating Progress", error: error.message });
  }
}

//view Progress
exports.viewAllProgress = async (req, res) => { 
 
  //calling Progress model
  Progress.find().then((progress) => {
    res.status(200).json(progress)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching Progress", error: error.message });
  })
}

//view Only PUBLISH progress
exports.viewPUBLISHProgress = async(req,res) => {

  let type = "PUBLISH"
  try {
      //find type by product id and type
      const progress = await Progress.find({type});
      //success message
      res.status(200).json({success: true,result:progress})
  }catch(error){
      //error message
      res.status(500).json({message: "Error with fetching progress", error: error.message})
  }
}
 
//view oneProgress
exports.viewOneProgress = async (req, res) => {
  let progressId = req.params.id;

  await Progress.findById(progressId).then((progress) => {
    res.status(200).json({ status: "Progress fetched", progress });
  }).catch((error) => {
    res.status(500).json({ status: "Error with fetching progress", error: error.message });
  })
}