import { useState } from 'react';
import axios from 'axios';
import './AddMarking'
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TextField } from '@material-ui/core';
import { Document, Page } from 'react-pdf';




function AddProgress() {
    const[progress_name,setName]=useState(""); 


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
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };
        
        let submission_doc
        

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "progress_pdfs")

           
            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) =>{
                    submission_doc = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newMarking = {progress_name,submission_doc}
        
        try {
            await axios.post("http://localhost:8070/marking/add", newMarking , config)
            alert("Marking Added Successfully")  
            event.target.reset(); 
        }catch (error) {         
            alert("Marking can't be Added");
        }
    }
    
    return (
        <div className="container" align="center" >
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>&nbsp;Add Marking Scheme</h2>
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
                                        required fullWidth
                                        onChange={(e)=>setName(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                            </div>                   
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                {previewSource ? 
                                    <img src={previewSource} alt="preview" className="previewMarking"/>
                                :
                                    <img src="/images/progress.png" className="previewMarking" alt="marking"/>
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
                                            <PictureAsPdfIcon/> &nbsp; Upload Pdf
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

export default AddProgress
