const TopicEval = require('../models/topicEval');

//add new Topic evaluation request
exports.addTopicEval = async (req, res) =>{

    const{groupname, supervisorName, cosupervisorName,submissionDoc, topic, type, feedback} = req.body;

    const newTopicEval = new TopicEval({
        groupname,
        supervisorName,
        cosupervisorName,
        submissionDoc,
        topic,
        type,
        feedback
    })

    newTopicEval.save().then(() => {
        res.status(200).json({status: "New Topic Evaluation Request Added"});
    }).catch((error) => {
        res.status(500).json({message:"Failed to add Request", error:error.message})
    })
}

//view evaluation request
exports.viewTopicEval= async(req,res) => {
    TopicEval.find().then((topicEval) => {
        res.status(200).json(topicEval )
      }).catch((error) => {
        res.status(500).json({ message: "Error with fetching Submission", error: error.message });
      })
}

//view one evaluation request
exports.viewOneTopicEval = async (req, res) => {
    let topicEvalID =req.params.id;

    await TopicEval.findById(topicEvalID).then((topicEval) => {
            res.status(200).json({success: true, status:"Submission fetched", topicEval});
        }).catch((error) =>{
            res.status(500).json({success:false, status:"fetching Submission failed", error: error.message});
        })
}

//update requests
exports.updateTopicEval = async (req, res) =>{
    let topicEvalID = req.params.id;

    const {topic, groupname, supervisorName , cosupervisorName, submissionDoc, feedback, type} = req.body;

    const updateTopicEval = {
        groupname,
        supervisorName,
        cosupervisorName,
        submissionDoc,
        topic,
        feedback,
        type
    }
    try{
        await TopicEval.findByIdAndUpdate(topicEvalID, updateTopicEval);

        res.status(200).json({ success: true, message: "Updated" })
    }catch(error){
        res.status(500).json({ message: "Error with Updating", error: error.message });
    }
}