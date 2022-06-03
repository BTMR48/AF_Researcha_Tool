import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';

import './allcosupervisors.css'


function AllCosupervisors() {

    const [cosupervisors, setCosupervisors] = useState([]);
    const [isAdmin,setIsAdmin]=useState(false)
    const history = useHistory()
   
 
    useEffect(() => {        
        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
          }else{
            setIsAdmin(false)
          }
          async function getCosupervisors() {
            axios.post(`https://af-research-tool.herokuapp.com/cosupervisor`).then((res) => {
              setCosupervisors(res.data)  
            }).catch((error) => {
              alert("Failed to fetch Co-Supervisors")
            })
          }
          if(isAdmin === true){
              getCosupervisors()
            }
            
    }, [isAdmin])

    async function onDelete(id) {
        const config = {
          headers: {
            "content-Type": "application/json"
          }
        };

        await axios.delete(`https://af-research-tool.herokuapp.com/cosupervisor/delete/${id}`, config).then(() => {
        alert("Co-Supervisor deleted successfully")
        setCosupervisors(cosupervisors.filter(element => element._id !== id))
        }).catch((error) => {
        alert(`Failed to delete the Co-Supervisor`)
        })
    }

    function filterContent (data, searchTerm){
        
        const result = data.filter((cosupervisor) =>
            cosupervisor.name.toLowerCase().includes(searchTerm) ||
            cosupervisor.fields.toString().toLowerCase().includes(searchTerm)
        )
        setCosupervisors(result)
    }

    function handleSearch(event){
      const searchTerm = event.currentTarget.value
      axios.post(`https://af-research-tool.herokuapp.com/cosupervisor`).then((res) => {
          filterContent(res.data, searchTerm.toLowerCase())
      }).catch((error)=>{
          alert("Failed to Search")
      })
    }

    function update(id) {
        history.push(`/cosupervisor/update/${id}`)
      }

    function addSupervisor(){
        history.push(`/cosupervisor/signup`)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                     <h2>Co-Supervisors</h2>
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
                            placeholder="Search Co-Supervisors"
                            onChange={handleSearch}
                            required
                        />
                    </div>
                </div>
            </div>
            {isAdmin && 
                <div align="center">
                    <button className="addStaffBtn" style={{backgroundColor:'#0376c4'}} onClick={()=>addSupervisor()}> Add Co-Supervisor </button>
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
                            {cosupervisors.map((Cosupervisor,key) => (
                            <tr key={key}>
                            
                                <td>
                                    {
                                      <h6>{Cosupervisor.title + " " + Cosupervisor.name}</h6>
                                    }
                                </td>
                            
                                <td>
                                    <h6>{Cosupervisor.email}</h6>
                                </td>

                                <td>
                                    {Cosupervisor.fields.map(fields => <h6>{fields}</h6>)}
                                </td>

                                <td>
                                    { isAdmin && 
                                        <div style={{verticalAlign:'middle'}}>
                                            {/* <IconButton onClick={() => update(Cosupervisor._id)}>
                                                <EditIcon style={{ color: grey[500] }} ></EditIcon>
                                            </IconButton> */}
                                            <IconButton onClick={() => onDelete(Cosupervisor._id)}>
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

export default AllCosupervisors