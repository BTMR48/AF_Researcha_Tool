const Submission = require('../models/submission');

exports.viewSubmission= async(req,res) => {
    let supervisorid = req.params.id;
    console.log(supervisorid);
    try {
        console.log("element");
        const studentList = await Submission.find({supervisorid}).populate({path:'supervisorid', select:['studentID']});
        studentList.forEach(element =>{
            console.log(element);
            const submissionList = Submission.find({element,progressName}).select('groupName','imgUrl');
                }
              );
              
        
        //success message
        res.status(200).json({success: true,result:submissionList})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching product", error: error.message})
    }
}