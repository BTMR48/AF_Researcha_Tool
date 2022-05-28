import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';

import './allsupervisors.css'


function AllSupervisors() {

    const [supervisors, setSupervisors] = useState([]);
    const [isAdmin,setIsAdmin]=useState(false)
    const history = useHistory()
   
 
    useEffect(() => {        
        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
          }else{
            setIsAdmin(false)
          }
          async function getSupervisors() {
            axios.post(`http://localhost:8070/supervisor`).then((res) => {
              setSupervisors(res.data)  
            }).catch((error) => {
              alert("Failed to fetch Supervisors")
            })
          }
          
          if(isAdmin === true){
              getSupervisors()
            }
            
    }, [isAdmin])

    async function onDelete(id) {
        const config = {
          headers: {
            "content-Type": "application/json"
          }
        };

        await axios.delete(`http://localhost:8070/supervisor/delete/${id}`, config).then(() => {
        alert("Supervisor deleted successfully")
        setSupervisors(supervisors.filter(element => element._id !== id))
        }).catch((error) => {
        alert(`Failed to delete the Supervisor`)
        })
    }

    function filterContent (data, searchTerm){
        
        const result = data.filter((supervisor) =>
            supervisor.name.toLowerCase().includes(searchTerm) ||
            supervisor.fields.toString().toLowerCase().includes(searchTerm)
        )
        setSupervisors(result)
    }

    function handleSearch(event){
      const searchTerm = event.currentTarget.value
      axios.post(`http://localhost:8070/supervisor`).then((res) => {
          filterContent(res.data, searchTerm.toLowerCase())
      }).catch((error)=>{
          alert("Failed to Search")
      })
    }

    function update(id) {
        history.push(`/supervisor/update/${id}`)
      }

    function addSupervisor(){
        history.push(`/supervisor/signup`)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                     <h2>Supervisors</h2>
                    </div>
                   
                </div>

                <br/>

                <div className="col-3">
                </div>

                <div className="col-5">
                    <div className="px-3 search" align="center">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Supervisors"
                            onChange={handleSearch}
                            required
                        />
                    </div>
                </div>
            </div>
            {isAdmin && 
                <div align="center">
                    <button className="addStaffBtn" style={{backgroundColor:'#0376c4'}} onClick={()=>addSupervisor()}> Add Supervisor </button>
                </div>
            } 
            <br/>

            <div className="blue-table">
                <div className="blue-table, box-view-list">
                    <table>
                        <thead >
                            <tr>
                                <th style={{ textAlign: 'center' }}>Name</th>
                                <th style={{ textAlign: 'center' }}>Email</th>
                                <th style={{ textAlign: 'center' }}>Research Field</th>
                                <th style={{ textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {supervisors.map((Supervisor,key) => (
                            <tr key={key}>
                            
                                <td>
                                    {
                                      <h6>{Supervisor.title + " " + Supervisor.name}</h6>
                                    }
                                </td>
                            
                                <td>
                                    <h6>{Supervisor.email}</h6>
                                </td>

                                <td>
                                    {Supervisor.fields.map(fields => <h6>{fields}</h6>)}
                                </td>

                                <td>
                                    { isAdmin &&
                                        <div style={{verticalAlign:'middle'}}>
                                            {/* <IconButton onClick={() => update(Supervisor._id)}>
                                                <EditIcon style={{ color: grey[500] }} ></EditIcon>
                                            </IconButton> */}
                                            <IconButton onClick={() => onDelete(Supervisor._id)}>
                                                <DeleteIcon style={{ color: red[500] }} ></DeleteIcon>
                                            </IconButton>
                                        </div>
                                    }
                                </td>
                                
                            </tr> 
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    )
}

export default AllSupervisors