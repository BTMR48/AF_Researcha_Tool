import { useState } from 'react';
import axios from 'axios';
import './AddSubmission.css'
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';
import { Document, Page } from 'react-pdf';




function Submit(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const progressID = props.match.params.id;
    const studentID = user._id;
    const name = props.match.params.name;
    const[groupID,setGroupID]=useState("");

    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');

    //handling the pdf uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a preview of uploaded pdf
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    

    async function add(event){
        event.preventDefault();
        
        
        let imgUrl
        

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "submission_pdfs")

           
            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

       
        const newSubmission = {studentID,progressID, name, groupID, imgUrl}
        
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("studentAuthToken")}`
            }
        };

        axios.post("http://localhost:8070/submission/add", newSubmission , config).then((res)=>{
            alert("Submission Added")
        }).catch((error)=>{         
            if(error.response.status === 409){
                alert("Submission already exists")
            }else if(error.response.status === 401){
                alert("Please login")
            }
            else{
                alert("Submission can't be Added")
                console.log(error)     
            }        
        })
    }
    
    return (
    <div className="container" align="center" >
        <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;Add Submission</h2>
                </div>
            </div>
        </div>
        <br></br>
        <div className="create_progress">
            <form onSubmit={add} className="addProgress">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-md-8 mb-4">
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="name" placeholder="Progress Name" 
                                        required fullWidth readOnly 
                                            value={name}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                            </div>         
                            <div className="col-md-8 mb-4">
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="name" placeholder="GroupID" 
                                        required fullWidth
                                        onChange={(e)=>setGroupID(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                            </div>     
                        </div>
                        
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <div>
                            {previewSource ? 
                                <document src={previewSource} alt="preview" className="previewImgProgress"/>
                            :
                                <document src="/images/progress.png" className="previewImgProgress" alt="submission pdf"/>
                            }
                            <div className="form-group">
                                <label htmlFor="profilepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="profilepic"
                                        name="profilepic"
                                        type="file"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                    />

                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp; Upload Pdf
                                    </Button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-submit-btn" type="submit" value="Add Progress" />
                        </div>
                    </div>
                </div>
            </form>            
        </div>                    
    </div>


        
    )
}

export default Submit
