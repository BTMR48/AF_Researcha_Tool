import React,{useEffect, useState} from 'react'
import { useHistory  } from 'react-router';
import axios from 'axios';
import './UpdateProgress.css'
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';


function UpdateProgress(props){
   
    const [name,setName]= useState("");
    const [description,setDescription]= useState("");
    const [date,setDate]= useState("");
    const [type,setType]= useState("");
    const history=useHistory();
    const[imgUrl,setImgUrl]=useState("");

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();
    const types = [
        { value: 'PUBLISH', label: 'PUBLISH',},
        { value: 'UNPUBLISH', label: 'UNPUBLISH',},];
        
    useEffect(()=>{

      async function fetchProgress(){
        await axios.get(`http://localhost:8070/progress/level/${props.match.params.id}`).then((res)=>{
           setName(res.data.progress.name)
           setDescription(res.data.progress.description)
           setDate(res.data.progress.date)
           setType(res.data.progress.type)
           setImgUrl(res.data.progress.imgUrl)
        }).catch((error)=>{
          alert("Failed to fetch progress data")
        })
        
      }
      fetchProgress()
    },[props]);

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
      //update the progress
    async function Update(event){

        event.preventDefault();
        
        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "progress_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbmr/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const updatedprogress = {name,description,date,type,imgUrl}

        const config = {
          headers: {
            "content-Type": "application/json",
          }
        };
        
        try {
          await axios.put(`http://localhost:8070/progress/update/${props.match.params.id}`,updatedprogress, config);
          alert("progress Updated Successfully")
          history.push('/evolution/levels')
        } catch (error) {
          alert("Progress Updating Failed")
        }
    } 

    return (
        <div className="container" align="center" >
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Update Progress</h2>
                    </div>
                </div>
            </div>
            <div className="update_progress">
                <form onSubmit={Update} className="updateProgress">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-8 mb-4">
                                    <div className="form-name">
                                        <OutlinedInput
                                            type="text" id="name" placeholder="Progress Name" 
                                            required fullWidth 
                                            value={name}
                                            onChange={(event)=> {setName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div> 
                                    <div className="col-md-8 mb-4">
                                        <div className="form-date">
                                            <OutlinedInput 
                                                type="date" id="date" placeholder="Progress Date"
                                                required fullWidth value={date}
                                                onChange={(event)=> {setDate(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                </div>  
                                <div>
                                    <br></br>                                   
                                    <div className="col-md-10 mb-4">
                                        <div className="form-description">
                                            <TextField
                                                multiline rows={5}
                                                id="description" placeholder="Progress Description" 
                                                required fullWidth variant="outlined" value={description}
                                                onChange={(event)=> {setDescription(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <TextField 
                                            id="type"
                                            select
                                            SelectProps={{
                                            native: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            value={type}
                                            onChange={(event)=> {setType(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                            >
                                            {types.map((option) => (
                                            <option key={option.value} value={option.value}>
                                            {option.label}
                                            </option>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                {previewSource ? 
                                    <img src={previewSource} alt="preview" className="previewImgProgress"/>
                                :
                                    <img src={`${imgUrl}`} className="updatePreviewImgProgress" alt="progress pic"/>
                                }
                                <div className="form-group">
                                    <label htmlFor="progressImg">
                                        <input
                                            style={{ display: 'none' }}
                                            id="progressImg"
                                            name="progressImg"
                                            type="file"
                                            onChange={handleFileInputChange}
                                            value={fileInputState}
                                        />
                                        <Button color="primary" variant="contained" component="span">
                                            <AddAPhotoIcon/> &nbsp; Update Image
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn" type="submit" value="Update Progress" />  
                            </div>
                        </div>
                    </div>   
                </form>             
            </div>                    
        </div> 
    )
}
export default UpdateProgress
