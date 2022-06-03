const User = require("../models/user");

//get conv of a user

exports.getUser =  async (req, res) => {
     let id=req.params.id;
//     console.log(req.params.id)

  User.find({id}).then((marking) => {
    res.status(200).json(marking )
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching marking", error: error.message });
  })
}

