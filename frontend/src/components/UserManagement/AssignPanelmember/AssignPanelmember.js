import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from '@material-ui/icons/Add';
import { red, grey } from '@material-ui/core/colors';
import axios from 'axios';
import './AssignPanelmember.css';

function AssignPanelmember(props) {
    
    // const [groupname,setGroupName] = useState("");
    // const [email,setEmail] = useState("");
    // const [phone,setPhone] = useState("");
    // const [member1name,setMember1Name] = useState("");
    // const [member2name,setMember2Name] = useState("");
    // const [member3name,setMember3Name] = useState("");
    // const [member4name,setMember4Name] = useState("");
    // const [member1reg,setMember1Reg] = useState("");
    // const [member2reg,setMember2Reg] = useState("");
    // const [member3reg,setMember3Reg] = useState("");
    // const [member4reg,setMember4Reg] = useState("");
    const [studentID,setStudentID] = useState(props.match.params.id);
    const [panelmembers,setPanelmembers] = useState([]);
    const [isAdmin,setIsAdmin]=useState(false)

    const history = useHistory();

    //fetching user data
    // useEffect(()=>{
    //     async function fetchUser(){
    //         await axios.get(`https://af-research-tool.herokuapp.com/student/${props.match.params.id}`).then((res)=>{
    //             // setStudentID(res.data.result._id)
    //             // setEmail(res.data.result.email)
    //             // setPhone(res.data.result.phone)
    //             // setMember1Name(res.data.result.member1name)
    //             // setMember1Reg(res.data.result.member1reg)
    //             // setMember2Name(res.data.result.member2name)
    //             // setMember2Reg(res.data.result.member2reg)
    //             // setMember3Name(res.data.result.member3name)
    //             // setMember3Reg(res.data.result.member3reg)
    //             // setMember4Name(res.data.result.member4name)
    //             // setMember4Reg(res.data.result.member4reg)
    //             // setUserImg(res.data.result.imgUrl)
    //         }).catch((error)=>{
    //             alert("Failed to fetch student data")
    //         })
    //     }
    //     fetchUser()
    // },[props]);
    console.log(studentID)

    //fetching panelmember data
    useEffect(()=>{

        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
          }else{
            setIsAdmin(false)
          }

        async function fetchPanelmember(){
            await axios.post(`https://af-research-tool.herokuapp.com/panelmember`).then((res)=>{
                setPanelmembers(res.data)
                
            }).catch((error)=>{
                alert("Failed to fetch panelmember data")
            })
        }
        fetchPanelmember()
    }, [isAdmin])


    //update the user
    async function Update(name, id){

        // event.preventDefault();
        let panelmember = name;
        let panelmemberID = id;
        const addPanel = {panelmember}

        Assign(panelmemberID)
        // header with authorization token
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("adminAuthToken")}`,
            }
        };

        try {
            await axios.put(`https://af-research-tool.herokuapp.com/student/update/${props.match.params.id}`,addPanel, config); 
                alert("Assigned Successfully")
                history.push('/users/studentlist')
        } catch (error) {
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/student/signin')
            } else{
                alert("Assigning Failed")
            }
        }    
    }

    //assign the panelmember
    async function Assign(id){

        // event.preventDefault();
        let panelmemberID = id;
        const assignPanel = {panelmemberID, studentID}

        try {
            await axios.post(`https://af-research-tool.herokuapp.com/pnlgroup/add`,assignPanel); 
        } catch (error) {
            alert("This panelmember is already assigned to this group")
        }    
    }

    return (
        <div className="container" align="center">
            <div className="row">
                <div className="col-1">
                </div>
                 <div className="col-11">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2></h2>
                    </div>
                </div>
            </div>
            <div className="blue-table">
                <div className="blue-table, box-view-list">
                    <table>
                        
                        <tbody style={{ textAlign: 'center' }}>
                            {panelmembers.map((Panelmember,key) => (
                            <tr key={key}>
                            
                                <td>
                                    {
                                      <h6>{Panelmember.title + " " + Panelmember.name}</h6>
                                    }
                                </td>

                                <td>
                                    { isAdmin &&
                                        <div style={{verticalAlign:'middle'}}>
                                            <button className="addPanelBtn" style={{backgroundColor:'#0000'}} onClick={()=>Update(Panelmember.name, Panelmember._id)}>
                                                 <AddIcon style={{ color: grey[500] }} ></AddIcon> 
                                                 Assign
                                            </button>
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

export default AssignPanelmember
