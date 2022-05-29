import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';

import './UserHome.css'


function Users() {

    const [isAdmin,setIsAdmin]=useState(false)
    const history = useHistory()

    useEffect(() => {        
        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
          }else{
            setIsAdmin(false)
          }
            
    }, [isAdmin])

    function Students() {
        history.push(`/users/studentlist`)
      }
    function Supervisors() {
        history.push(`/users/supervisorlist`)
      }
    function Coupervisors() {
        history.push(`/users/cosupervisorlist`)
      }
    function Panelmembers() {
        history.push(`/users/panelmemberlist`)
      }


    return (
        <div className="container">
             <div align="center">
                <div>
                    <h1>User Management</h1>
                </div>
                   
            </div>
            {isAdmin &&
            <div> 
                <div align="center">
                    <button className="UsersBtn" style={{backgroundColor:'#0376c4'}} onClick={Students}> Students </button>
                </div>

                <div align="center">
                    <button className="UsersBtn" style={{backgroundColor:'#0376c4'}} onClick={Supervisors}> Supervisors </button>
                </div>

                <div align="center">
                    <button className="UsersBtn" style={{backgroundColor:'#0376c4'}} onClick={Coupervisors}> Co-Supervisors </button>
                </div>

                <div align="center">
                    <button className="UsersBtn" style={{backgroundColor:'#0376c4'}} onClick={Panelmembers}> Panelmembers </button>
                </div>
            </div>    
            } 
            <br/>   
        </div>
    )
}

export default Users