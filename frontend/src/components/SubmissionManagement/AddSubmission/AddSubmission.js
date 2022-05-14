import React,{useState} from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import './AddSubmission.css';
import { OutlinedInput,InputAdornment} from "@material-ui/core";

export default function BuyPayment(props){
    const user = JSON.parse(localStorage.getItem('user'));
    //const { id } = useParams("626433f3b077cbe677711a24");
    const studentID = user._id;
    const progressId = props.match.params.id
    const date = props.match.params.date
    const history = useHistory()
    const[name,setProgressName]=useState("");
    const[groupName,setGroupName]=useState("");

    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');

   
     //handling the image uploading
     const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    async function sendData(e){
        e.preventDefault();

        let imgUrl
        

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "submission")

           
            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }
        
        const newSubmission={
            studentID,
            progressId,
            name,
            groupName,
            imgUrl    
        }
    
       

        //getting data from backend
        await axios.post("http://localhost:8070/submission/add",newSubmission).then((res)=>{
            alert("Submission Submitted Successful")
           // const paymentID = res.data.payment._id

            //header with authorization token
            const config = {
                headers: {
                    "content-Type": "application/json",
                    Authorization: `${localStorage.getItem("studentAuthToken")}`,
                }
            };
        }).catch((error)=>{
            alert("adding failed")
        }) 
        
    }
    
    return(
        <div className="container" align="center">
            <div className="card-form">
                <form onSubmit={sendData} className="boxAddPayment">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <h3>Project Submission</h3>
                                {/* <div className="col-12">
                                <img src="/images/payment.png" height="50px" width="180px" alt="payment" />
                                </div> */}
                                <br></br>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="amount" placeholder="Total Amount" 
                                            required fullWidth readOnly 
                                            value={date}
                                            inputProps={{style: {padding: 12}}}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    LKR
                                                </InputAdornment>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4 mt-4">
                                    <div className="form-group">
                                        <OutlinedInput
                                            type="text" id="name" placeholder="Group Name" 
                                            required fullWidth
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="Expire Date" placeholder="Expiry Date" 
                                            required fullWidth  
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>  */}
                            </div>
                        </div> 
                    </div>                       
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn" type="submit" value="Add Submit " />
                            </div>
                        </div>
                    </div>       
                </form>                  
            </div>
        </div>               
    )
}
 
    
    

