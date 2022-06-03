import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';




function Users() {

    const [isAdmin,setIsAdmin]=useState(false)
    const [isStudent,setIsStudent]=useState(false)
    const [isSupervisor,setIsSupervisor]=useState(false)
    const [isCosupervisor,setIsCosupervisor]=useState(false)
    const [isPanelmember,setIsPanelmember]=useState(false)
    const history = useHistory()

    useEffect(() => {        
        if(localStorage.getItem("adminAuthToken")){
            history.push(`/evolution/levels`)
          }
        if(localStorage.getItem("studentAuthToken")){
            history.push(`/evolution/levels`)
          }
        if(localStorage.getItem("supervisorAuthToken")){
            history.push(`/request/allrequest`)
          }
        if(localStorage.getItem("cosupervisorAuthToken")){
            history.push(`/request/allrequest`)
          }
        if(localStorage.getItem("panelmemberAuthToken")){
            history.push(`/topiceval/view`)
          }
            
    }, [isAdmin,isStudent,isSupervisor,isCosupervisor,isPanelmember])

    return(
        <div></div>
    )

}

export default Users