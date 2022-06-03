import React ,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import axios from 'axios'
import { Button } from '@material-ui/core';
import { blue, red, green } from '@mui/material/colors';
import './UpdateTopicSubmission';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


function ViewTopicSubmission() {

    const [isPanelmember,setIsPanelmember]= useState(false)
    const [isStudent,setIsStudent]= useState(false)
    const [topiceval, setTopiceval] = useState([])
    const [viewPdf, setViewPdf] = useState("")
    const history = useHistory()
    const location = useLocation()

    useEffect(() => { 
        if(localStorage.getItem("panelmemberAuthToken")){
            setIsPanelmember(true)
          }else{
            setIsPanelmember(false)
          }

        if(localStorage.getItem("studentAuthToken")){
            setIsStudent(true)
          }else{
            setIsStudent(false)
          }

        async function getAllTopiceval() {
          axios.get(`https://af-research-tool.herokuapp.com/topiceval/view`).then((res) => {
            setTopiceval(res.data)  
          }).catch((error) => {
            alert("Failed to fetch submissions")
          })
        }
   
        getAllTopiceval();
          
    }, [location])

    function fetchPdf(submissionDoc) {
        window.open(submissionDoc);
    }

    function UpdateTopicSubmission(id){
        history.push(`/topiceval/update/${id}`)
      }

    function TopicSubmission(){
        history.push(`/topiceval/add`)
    }

  return (
    <div className="container" align ="center" >
        <div className="row">
            <div className="col-4">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>Topic Evaluations</h2>
                </div>
            </div>
            { isStudent &&
                <div className="col-8">
                    <div className="px-3 search" align="right">
                        <Button onClick={()=>TopicSubmission(topiceval._id)} color="primary" variant="contained" component="span" align="left">
                                <PictureAsPdfIcon/> &nbsp; Topic Submission
                        </Button>
                    </div> 
                </div>
            }
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
                                    <ul>
                                        <h5>&nbsp;Group Name&nbsp;: {TopicEval.groupname}</h5>
                                        <h5>&nbsp;Topic&nbsp;  : {TopicEval.topic}</h5>
                                        <h6 style={{ color: blue[500] }}>&nbsp;Supervisor &nbsp;   : {TopicEval.supervisorName}</h6>
                                        <h6 style={{ color: blue[500] }}>&nbsp;Co-Supervisor&nbsp; : {TopicEval.cosupervisorName}</h6>
                                        <h6 style={{ color: red[500] }}>&nbsp;feedback  &nbsp;    : {TopicEval.feedback}</h6>
                                        <h5 style={{ color: green[500] }}>&nbsp;Status &nbsp;       : {TopicEval.type}</h5>
                                    </ul>
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
                                    { isPanelmember &&
                                        <button className="progressBtn" style={{backgroundColor:red[400]}} onClick={()=>UpdateTopicSubmission(TopicEval._id)}> Feedback </button>
                                    }    
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