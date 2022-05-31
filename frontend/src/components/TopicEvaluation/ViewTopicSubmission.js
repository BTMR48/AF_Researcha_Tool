import React ,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import axios from 'axios'
import { Button } from '@material-ui/core';
import { blue, red, green } from '@mui/material/colors';
import './UpdateTopicSubmission';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


function ViewTopicSubmission() {

    const [isAdmin,setIsAdmin]= useState(false)
    const [topiceval, setTopiceval] = useState([])
    const [viewPdf, setViewPdf] = useState("")
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] =  useState("");

    useEffect(() => { 
        if(localStorage.getItem("user")){
          setUser(JSON.parse(localStorage.getItem('user')))
        }
        if(localStorage.getItem("adminAuthToken")){
          setIsAdmin(true)
        }

        async function getAllTopiceval() {
          axios.get(`http://localhost:8070/topiceval/view`).then((res) => {
            setTopiceval(res.data)  
          }).catch((error) => {
            alert("Failed to fetch submissions")
          })
        }

        if(isAdmin === true){
            getAllTopiceval();
          }else{
            getAllTopiceval();
          }
    }, [location,isAdmin])

    function fetchPdf(submissionDoc) {
        window.open(submissionDoc);
    }

    function UpdateTopicSubmission(){
        history.push(`/topiceval/update/:id`)
      }

  return (
    <div className="container" align ="center" >
        <div className="row">
            <div className="col-4">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>Topic Evaluations</h2>
                </div>
            </div>

            <div className="col-5">
                {/* {isAdmin === true ?
                <div className="px-3 search" align="right">
                    <input 
                    type="text" 
                    name="search" 
                    id="search"
                    placeholder="Search" 
                    onChange={handleSearchAll} 
                    required 
                    />
                </div>
                :
                <div className="px-3 search" align="right">
                    <input 
                        type="text" 
                        name="search" 
                        id="search"
                        placeholder="Search" 
                        onChange={handleSearch} 
                        required 
                    />
                </div> 
                }   */}
            </div>
        </div>
        <div className="progressGrid"  > 
            {/* {isAdmin && 
            <Button  className="mx-2 progressBtn" style={{backgroundColor:blue[400],color:'white'}} onClick={()=>addProgress()}>
            Add Progress 
            </Button>  
            } */}
            {topiceval.map((TopicEval,key)=>( 
                <div key={key}> 
                    <div className="SubmissionCard" >
                        
                        <div className="p-3">
                            <div className='detailBox'>
                                <div align='left'>
                                    <h5>Group Name&nbsp;: {TopicEval.groupname}</h5>
                                    <h5>Topic  : {TopicEval.topic}</h5>
                                    <h6 style={{ color: blue[500] }}>Supervisor    : {TopicEval.supervisorName}</h6>
                                    <h6 style={{ color: blue[500] }}>Co-Supervisor : {TopicEval.cosupervisorName}</h6>
                                    <h6>feedback      : {TopicEval.feedback}</h6>
                                    <h5 style={{ color: green[500] }}>Status        : {TopicEval.type}</h5>
                                </div>
                            </div>
                            <div align="right">
                                <span> 
                                    <span >
                                    <IconButton onClick={() => fetchPdf(`${TopicEval.submissionDoc}`)}>
                                        <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'left', fontSize: "100px" }} ></PictureAsPdfIcon>
                                    </IconButton>
                                    </span>
                                    &nbsp;&nbsp;&nbsp;
                                    <button className="progressBtn" style={{backgroundColor:red[400]}} onClick={()=>UpdateTopicSubmission(topiceval._id)}> Update </button>
                                </span> 
                            </div>
                        </div>
                    </div>
                </div>
            ))} 
        </div>
    </div>
    )
}

export default ViewTopicSubmission