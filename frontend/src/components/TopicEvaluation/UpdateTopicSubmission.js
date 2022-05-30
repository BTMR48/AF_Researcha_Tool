import React ,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';

function UpdateTopicSubmission(props) {

    const [groupname, setGroupname] = useState("");
    const [supervisorName, setSupervisorName] = useState("");
    const [cosupervisorName, setCoSupervisorName] = useState("");
    const [topic, setTopic] = useState("");
    const [type, setType] = useState("");
    const [feedback, setFeedback] = useState("");
    const history=useHistory();

    const types = [
        { value: '', label: '',},
        { value: 'Approve', label: 'Approve',},
        { value: 'Reject', label: 'Reject',},];


    useEffect(()=>{
        async function fetchSubmission(){
          await axios.get(`http://localhost:8070/topiceval/view/${props.match.params.id}`).then((res)=>{
            setGroupname(res.data.topiceval.groupname)
            setSupervisorName(res.data.topiceval.supervisorName)
            setCoSupervisorName(res.data.topiceval.cosupervisorName)
            setTopic(res.data.topiceval.topic)
            setType(res.data.topiceval.type)
            setFeedback(res.data.topiceval.feedback)
          }).catch((error)=>{
            alert("Failed to fetch Submission")
          })
        }
        fetchSubmission()
    },[props]);

    async function Update(event){

        event.preventDefault();

        const updateSubmission = {groupname, supervisorName, cosupervisorName ,topic,feedback, type}

        const config = {
            headers: {
              "content-Type": "application/json",
            }
        };

        try{
            await axios.put(`http://localhost:8070/topiceval/update/${props.match.params.id}`, updateSubmission, config);
            alert("Updated")
            // history.push('/topiceval/allrequest')
        }catch(error){
            alert("updating Failed")
        }

    }


  return (
    <div>UpdateTopicSubmission</div>
  )
}

export default UpdateTopicSubmission