import React,{useEffect, useState} from 'react'
import { useHistory, useParams  } from 'react-router';
import '../Levels/Levels.css'
import './SingleLevel.css'
import axios from 'axios'
import {orange,blue,red } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
//import {AddSubmission} from '../../../Utils/SubmissionUtils'


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
          alert("Failed to Fetch Progress1")
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
        history.push(`/Submission/AddSubmission/${id}/${name}`)
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
                                 <button className="mx-2 progressBtn" style={{backgroundColor:orange[500]}} 
                                onClick={()=>submit(id, user._id)}>
                                    Submit Project <ShoppingCartIcon/>
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
