const Marking = require('../models/marking');

exports.viewMarking= async(req,res) => {
    Marking.find().then((marking) => {
        res.status(200).json(marking )
      }).catch((error) => {
        res.status(500).json({ message: "Error with fetching marking", error: error.message });
      })
}
