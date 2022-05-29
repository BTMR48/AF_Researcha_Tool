const Submission = require('../models/submissionDoc');

exports.viewSubmission = async (req, res) => {

  Submission.find().populate({ path: 'grpId proId', select: ['grpName', 'supId', 'progressName'] }).then((submission) => {
    let progressName=req.params.name;
    const result = submission.filter((submissions) =>
            submissions.proId.progressName.toLowerCase().includes(progressName))
    res.status(200).json({ success: true, result: result })

  }).catch((error) => {
    res.status(500).json({ message: "fetching failed", error: error.message });
  })

}

// //Add a submission
// exports.addSubmission = async(req,res) => {
//     const {studentID,name,groupID,imgUrl} = req.body;
//     // let today = new Date();
//     // const date = (today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());
//     try{
//         //creating a new submission
//         const submission = await Submission.create({studentID, name, groupID,imgUrl});


//         res.status(200).json ({success:true,message:"submission added",submission})
//      }catch(error){
//          res.status(500).json({message: "unable to add the submission",error:error.message});
//      }
// }

//add new Submission
exports.addSubmission = async (req, res) => {

  //constant variables for the attributes
  const { studentID, name, groupID, imgUrl } = req.body;
  let today = new Date();
  const date = (today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());


  //object
  const newSubmission = new Submission({
    //initializing properties
    // progressID,
    studentID,
    name,
    groupID,
    date,
    imgUrl
  })

  //saving the object to the db 
  newSubmission.save().then(() => {
    res.status(200).json({ status: "New Submission Added" });
  }).catch((error) => {
    res.status(500).json({ message: "Fail to Add Submission", error: error.message })
  })
}

// //Add a submission
// exports.addSubmission = async(req,res) => {
//     const {progressID,studentID,name,groupID,imgUrl} = req.body;
//     let today = new Date();
//     const date = (today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());

//     try {
//         //checking product already exists
//         const checkItem = await Submission.findOne({progressID,studentID})
//         if(checkItem)
//             return res.status(409).json({message: "Submission already submitted"})

//         //creating a new add submission
//         await Submission.create({progressID,studentID,name,groupID,date,imgUrl});
//         //success message
//         res.status(200).json({success: true,message:"Submission added"})

//     } catch (error) {
//         //error message
//         res.status(500).json({message: "can't added", error: error.message})
//     }
// }


