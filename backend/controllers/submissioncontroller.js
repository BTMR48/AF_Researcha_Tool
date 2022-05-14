const Cart = require('../models/submission');

exports.viewSubmission= async(req,res) => {
    //get patient id
    let patientID = req.params.id;
    //get cart type( Shopping or prescription )
    let type = req.params.type;

    try {
        //find cart by patient id and cart
        const cart = await Cart.find({patientID,type}).populate(
            {path:'itemid', select:['name','price','description','total','imgUrl']});
        //success message
        res.status(200).json({success: true,result:cart})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching product", error: error.message})
    }
}