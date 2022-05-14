import React,{useEffect, useState} from 'react';
import { Document, Page } from 'react-pdf';

import { useHistory  } from 'react-router';
import '../Levels/Levels.css'
import './SingleLevel.css'
import axios from 'axios'
import {orange,blue,red } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
//import {Submit} from './../../SubmissionManagement/AddSubmission/AddSubmissionstd'


function ProgressDetails(props) { 
    const [isAdmin,setIsAdmin]=useState(false)
    const[id,setId]=useState("");
    const[name,setName]=useState("");
    const[description,setDescription]=useState("");
    const[date,setDate]=useState("");
    const[imgUrl,setImgUrl]=useState("");
    const [progresses, setProgresses] = useState([])
    const history=useHistory()
    const [user, setUser] = useState("");

    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        
        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
        }
        //get one progress details
      async function getProgressDetails() {
        axios.get(`http://localhost:8070/progress/level/${props.match.params.id}`).then((res) => {
          setId(res.data.progress._id)   
          setName(res.data.progress.name)
          setDescription(res.data.progress.description)
          setDate(res.data.progress.date)   
          setImgUrl(res.data.progress.imgUrl)
        }).catch((err) => {
          alert("Failed to Fetch Progress")
        })
      }
      getProgressDetails();

    }, [props]);

     //delete progress
    async function deleteProgress(id){        
        await axios.delete(`http://localhost:8070/progress/delete/${id}`,config).then(() => {
            alert("Level deleted successfully")
            history.push('/evolution/levels')
        }).catch((error) => {
            alert(`Failed to delete the progress\n${error.message}`)
        }) 
    } 
         

    
   
    function update(uid){
        history.push(`/evolution/level/updateProgress/${uid}`)
    }
    
    function submit(){
        // navigate(`/patient/buyPayment/${id}/${date}`)
        history.push(`/submission/addSubmission/${id}`)
    }
    
   
    return (
        <div className = "container" align="center">
            <div className="detailProgress" >     
                <div className="detailProgress">
                                <img src={`${imgUrl}`} alt="progressDetails" />
                    <div className="box-detailProgress">
                            <div className="row">
                                <h2>{name}</h2>
                            </div>
                            <h5>{date}</h5>
                            <p className="text-muted">{description}</p>
                    </div>           
                </div> 
                <table className="singleLevelBtn" >  
                    <div> 
                        {isAdmin === true ?
                            <div>
                                <button className="mx-2 progressBtn" style={{backgroundColor:blue[400]}} onClick={()=>update(id)}>
                                Update <EditIcon/>
                                </button>
                                <button className="mx-2 progressBtn" style={{backgroundColor:red[500]}} onClick={()=>deleteProgress(id)} >
                                Delete <DeleteForeverIcon/>
                                </button>
                            </div>
                            : 
                            <div>
                                <button className="mx-2 progressBtn" style={{backgroundColor:red[500]}} 
                                            onClick={()=>submit()}>
                                            Submit Project
                                        </button> 
                            </div>  
                        }
                    </div>
                </table>               
            </div>
           
        </div>          
    )
}

export default ProgressDetails
