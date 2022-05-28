import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import './UpdateCosupervisor.css';

function UpdateCosupervisor(props) {
    
    const [title,setTitle] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [fields,setFields] = useState([]);
    const [phoneno,setPhoneNo] = useState("");
    const [userImg, setUserImg] = useState("");
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    const history = useHistory();
    
    //fetching user data
    useEffect(()=>{
        async function fetchUser(){
            await axios.get(`http://localhost:8070/cosupervisor/${props.match.params.id}`).then((res)=>{
                console.log(res)
                setTitle(res.data.title)
                setName(res.data.name)
                setEmail(res.data.email)
                setFields(res.data.fields)
                setPhoneNo(res.data.phoneno)
                setUserImg(res.data.imgUrl)
            }).catch((error)=>{
                alert("Failed to fetch cosupervisor data")
            })
        }
        fetchUser()
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

    //update the user
    async function Update(event){

        

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "cosupervisor")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const updateCosupervisor = {title, name, email, fields, phoneno, imgUrl}

        //header with authorization token
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("cosupervisorAuthToken")}`,
            }
        };

        try {
            await axios.put(`http://localhost:8070/cosupervisor/update/${props.match.params.id}`,updateCosupervisor, config);
                alert("Updated Successfully")
        } catch (error) {
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/cosupervisor/signin')
            } else{
                alert("Updating Failed")
            }
        }    
    }

    const field = [
        'Internet of Things', 'Blockchain', 'Artificial Intelligence'
    ]

    const handleFieldsChange = (event) => {
        setFields(event.target.value);
    };

    return (
        <div className="container" align="center">
            <div className="row">
                <div className="col-1">
                </div>
                 <div className="col-11">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2>My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="">
                <form onSubmit={Update} encType="multipart/form-data" className="boxUpdate">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">

                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput
                                            type="text" id="name" placeholder="Name" required fullWidth
                                            value={name}
                                            onChange={(event)=> {setName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                
                                <div className="col-md-7 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="email" id="email" placeholder="Email" required fullWidth
                                            value={email}
                                            onChange={(event)=> {setEmail(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4" > 
                                    <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip"
                                        multiple fullWidth
                                        value={fields}
                                        onChange={handleFieldsChange}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                        <div >
                                            {selected.map((value) => (
                                                <Chip key={value} label={value}  />
                                            ))}
                                        </div>
                                        )}
                                        >
                                        {field.map((flds) => (
                                            <MenuItem key={flds} value={flds} >
                                            {flds}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="col-md-5 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="tel" id="phoneno" placeholder="phoneno" required fullWidth
                                            value={phoneno}
                                            onChange={(event)=> {setPhoneNo(event.target.value)}}
                                            inputProps={{style: {padding: 12}, pattern: "[0-9]{9}" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                { previewSource  ?
                                    <img src={previewSource} alt="preview" className="previewImg"/>
                                : userImg === ""? 
                                    <img src="/images/avatar.jpg" alt="preview" className="previewImg"/>
                                :
                                    <img src={`${userImg}`} className="previewImg" alt="profile pic"/>
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
                                            <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn mb-0" type="submit" value="Update" />
                            </div> 
                        </div>
                    </div> 
                </form>     
            </div>                    
        </div>
    )
}

export default UpdateCosupervisor
