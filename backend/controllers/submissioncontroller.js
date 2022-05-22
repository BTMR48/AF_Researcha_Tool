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


//Add a submission
exports.addSubmission = async(req,res) => {
    const {progressID,studentID,name,groupID,imgUrl} = req.body;
    let today = new Date();
    const date = (today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());

    try {
        //checking product already exists
        const checkItem = await Submission.findOne({progressID,studentID})
        if(checkItem)
            return res.status(409).json({message: "Submission already submitted"})

        //creating a new add submission
        await Submission.create({progressID,studentID,name,groupID,date,imgUrl});
        //success message
        res.status(200).json({success: true,message:"Submission added"})

    } catch (error) {
        //error message
        res.status(500).json({message: "can't added", error: error.message})
    }
}


