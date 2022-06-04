const Submission = require('../models/submissionDoc');
const SubmissionDoc = require('../models/submission');
const Feedback = require('../models/feedback');
const Mark = require('../models/marks');


//Fetch submission details
exports.viewSubmission = async (req, res) => {

  Submission.find().populate({ path: 'grpId proId', select: ['grpName', 'supId', 'progressName'] }).then((submission) => {
    let progressName = req.params.name;
    const result = submission.filter((submissions) =>
      submissions.proId.progressName.toLowerCase().includes(progressName))

    res.status(200).json({ success: true, result: result })

  }).catch((error) => {
    res.status(500).json({ message: "fetching failed", error: error.message });
  })

}

//Add a submission
exports.addSubmission = async (req, res) => {
  const { progressID, studentID, name, groupID, imgUrl } = req.body;
  let today = new Date();
  const date = (today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());


  try {
    //checking product already exists
    const checkItem = await Submission.findOne({ progressID, studentID })
    if (checkItem)
      return res.status(409).json({ message: "Submission already submitted" })

    //creating a new add submission
    await Submission.create({ progressID, studentID, name, groupID, date, imgUrl });
    //success message
    res.status(200).json({ success: true, message: "Submission added" })

  } catch (error) {
    //error message
    res.status(500).json({ message: "can't added", error: error.message })
  }
}

//Add submission feedback
exports.addFeedback = async (req, res) => {

  const { mark, feedback } = req.body;

  let grpId = req.params.grpId;
  let proId = req.params.proId;

  const newFeedback = new Feedback({
    feedback,
    grpId,
    proId
  })
  const newMark = new Mark({
    mark,
    grpId,
    proId
  })
  await newMark.save();
  await newFeedback.save();
  //saving the object to the db 
  res.status(201).json({ success: true, result: newMark });

}


