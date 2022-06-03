import React, { useState } from 'react'
import axios from 'axios';
import './TopicSubmission.css'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

function TopicSubmission() {

    const [groupname, setGroupname] = useState("");
    const [supervisorName, setSupervisorName] = useState("");
    const [cosupervisorName, setCoSupervisorName] = useState("");
    const [topic, setTopic] = useState("");
    const [type, setType] = useState("");
    const [feedback, setFeedback] = useState("");
    const history = useHistory()

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
        
        let submissionDoc
        

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "evaluation_pdfs")

           
            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) =>{
                    submissionDoc = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newTopicEval = { groupname, submissionDoc, supervisorName, cosupervisorName, topic, type, feedback}
        
        try {
            await axios.post("https://af-research-tool.herokuapp.com/topiceval/add", newTopicEval , config)
            alert("Document Submit Successfully") 
            history.push('/topiceval/view') 
            event.target.reset(); 
        }catch (error) {         
            alert("Document can't be Submitted");
        }
    }


  return (
    <div className='container' align='center'>
        <div className='row'>
            <div className='col-12'>
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;Topic Evaluation</h2>
                </div>
            </div>
            <br></br>
                <div>
                    <p align='left'>&#9888;Topic Evaluation Document should be include Topic details clearly. Rename the document with your groupID. Please wait until get a feedBack to submit new Evaluation. If you do multiple submission before the feedback <b>5 marks will be deduct from the full mark.</b></p>
                </div>
        </div>
        <br></br>
        <div className='create_evaluation'>
            <form onSubmit={add} className='addEvaluation'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='row'>
                            <div className='col-md-8 mb-4'>
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="groupname" placeholder="Group Name" 
                                        required fullWidth
                                        onChange={(e)=>setGroupname(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                                <br></br>
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="topic" placeholder="Topic" 
                                        required fullWidth
                                        onChange={(e)=>setTopic(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                                <br></br>
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="supervisorname" placeholder="Supervisor" 
                                        required fullWidth
                                        onChange={(e)=>setSupervisorName(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                                <br></br>
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="cosupervisorname" placeholder="Co-Supervisor" 
                                        required fullWidth
                                        onChange={(e)=>setCoSupervisorName(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className='col-4 d-flex justify-content-center'>
                            <div>
                                {previewSource ? 
                                    <img src={previewSource} alt="preview" className="previewMarking"/>
                                :
                                    <img src="/images/progress.png" className="previewMarking" alt="Topic Evaluation Doc"/>
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
                                <input className="form-submit-btn" type="submit" value="Submit" />
                            </div>
                        </div>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default TopicSubmission