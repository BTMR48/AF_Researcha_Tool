import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { red, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';

import './allgroups.css'


function AllStudents() {

    const [students, setStudents] = useState([]);
    const [isAdmin,setIsAdmin]=useState(false);
    const history = useHistory()
    const [user, setUser] =  useState("");
    
    
    useEffect(() => {  
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem('user')))
          }
          if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
            console.log(isAdmin)
          }
        
        async function getStudents() {
            axios.post(`http://localhost:8070/student`).then((res) => {
                setStudents(res.data) 
            }).catch((error) => {
                alert("Failed to fetch Students")
            })
        }
        

        if(isAdmin === true){
            getStudents()
        }
        
    }, [isAdmin])

    async function onDelete(id) {
        const config = {
          headers: {
            "content-Type": "application/json"
          }
        };

        await axios.delete(`http://localhost:8070/student/delete/${id}`, config).then(() => {
        alert("Student deleted successfully")
        setStudents(students.filter(element => element._id !== id))
        }).catch((error) => {
        alert(error)
        })
    }

    function filterContent (data, searchTerm){
        
        const result = data.filter((student) =>
            student.groupname.toLowerCase().includes(searchTerm)             
        )
        setStudents(result)
    }

    function handleSearch(event){
      const searchTerm = event.currentTarget.value
      axios.post(`http://localhost:8070/student`).then((res) => {
          filterContent(res.data, searchTerm.toLowerCase())
      }).catch((error)=>{
          alert("Failed to Search")
      })
    }

    function update(id) {
        history.push(`/users/addpanel/${id}`)
      }

    // function addStudent(){
    //     history.push(`/student/signup`)
    // }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                     <h2>Students</h2>
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
                            placeholder="Search Students"
                            onChange={handleSearch}
                            required
                        />
                    </div>
                </div>
            </div>
            {/* {isAdmin && 
                <div align="center">
                    <button className="addStudentBtn" style={{backgroundColor:'#0376c4'}} onClick={()=>addStudent()}> Add Student </button>
                </div>
            } */}
            <br/>

            <div className="blue-table">
                <div className="blue-table, box-view-list">
                    <table>
                        <thead >
                            <tr>
                                <th style={{ textAlign: 'center' }}>Group Name</th>
                                <th style={{ textAlign: 'center' }}>Email</th>
                                <th style={{ textAlign: 'center' }}>Panel Member</th>
                                <th style={{ textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {students.map((Student,key) => (
                            <tr key={key}>
                            
                                <td>
                                    {
                                      <h6>{Student.groupname}</h6>
                                    }
                                </td>
                            
                                <td>
                                    <h6>{Student.email}</h6>
                                </td>

                                <td>
                                    <h6>{Student.panelmember}</h6>
                                </td>

                                <td>
                                    { isAdmin && 
                                        <div style={{verticalAlign:'middle'}}>
                                            <button className="addPanelBtn" style={{backgroundColor:'#0000'}} onClick={()=>update(Student._id)}>
                                                 <AddIcon style={{ color: grey[500] }} ></AddIcon> 
                                                 Add Panelmember
                                            </button>
                                            <IconButton onClick={() => onDelete(Student._id)}>
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

export default AllStudents