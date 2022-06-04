import { useState } from 'react';
import axios from 'axios';
import './AddProgress.css'
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TextField } from '@material-ui/core';
import { Document, Page } from 'react-pdf';




function AddProgress() {
    const[name,setName]=useState(""); 
    const[description,setDescription]=useState("");
    const[type,setType]=useState("");
    const[date,setDate]=useState("");

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
        
        let imgUrl
        

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "progress_pdfs")

           
            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newProgress = {name,description,type,date,imgUrl}
        
        try {
            await axios.post("https://af-research-tool.herokuapp.com/progress/add", newProgress , config)
            alert("Progress Added Successfully")  
            event.target.reset(); 
        }catch (error) {         
            alert("Progress can't be Added");
        }
    }
    
    return (
    <div className="container" align="center" >
        <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;Add New Progress Level</h2>
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
                            <div> 
                                <div className="col-md-8 mb-4">
                                    <div className="form-date">
                                        <OutlinedInput 
                                            type="date" id="date" placeholder="Progress Date" required fullWidth
                                            onChange={(e)=>setDate(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                            </div>                       
                            <div className="col-md-10 mb-4">
                                <div className="form-description">
                                    <TextField
                                        multiline rows={3}
                                        id="description" placeholder="Progress Description" 
                                        required fullWidth variant="outlined" 
                                        onChange={(e)=>setDescription(e.target.value)}
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="form-group">
                                 <div>
                                    <label><h6>Type</h6></label> &nbsp;
                                </div>
                                    <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" type="radio" name="Type" id="PUBLISH" value="PUBLISH" required
                                                onChange={(e)=>setType(e.target.value)}
                                            />
                                            <label className="form-check-label" for="PUBLISH">
                                            PUBLISH
                                            </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" type="radio" name="Type" id="UNPUBLISH" value="UNPUBLISH" required
                                                onChange={(e)=>setType(e.target.value)}
                                            />
                                            <label className="form-check-label" for="UNPUBLISH">
                                            UNPUBLISH
                                            </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <div>
                            {previewSource ? 
                                <img src={previewSource} alt="preview" className="previewImgProgress"/>
                            :
                                <img src="/images/progress.png" className="previewImgProgress" alt="progress pic"/>
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
