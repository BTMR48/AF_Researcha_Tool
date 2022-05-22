import React, { useEffect, useState } from 'react';

import { red, grey, lightBlue } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { lighten } from '@mui/material';
import { Document, Page } from 'react-pdf';

function ViewSubmission(props) {
    
    const [submissionArr, setSubmissionArr] = useState([])
    const [MarkingArr, setMarkingArr] = useState([])
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isSupervisor, setIsSupervisor] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("supervisorAuthToken")) {
            setIsSupervisor(true)
        } else {
            setIsSupervisor(false)
        }

        // async function getSubmission() {
        //     console.log("element");
        //     await axios.get(`http://localhost:8070/submission/viewSubmission/${props.match.params.id}`).then((res) => {
        //         setSubmissionArr(res.data.result)
        //     }).catch((error) => {
        //         alert("Failed to fetch the submission details")
        //     })
        // }
        // getSubmission()
        async function  getMarking() {
            await axios.get(`http://localhost:8070/marking/view`).then((res) => {
                setMarkingArr(res.data)
            }).catch((error) => {
                alert("Failed to fetch the Marking details")
            })
        }
        getMarking()
    }, [props])

    function viewPdf(markingUrl) {
        console.log(markingUrl)
        window.open(markingUrl);

    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    

    function giveFeedback(id) {

    }
    function viewSubmissionDoc(id) {

    }

    function filterContent(data, searchTerm) {
        const result = data.filter((submission) =>
        submission.groupName.toLowerCase().includes(searchTerm))
        setSubmissionArr(result)
    }

    function handleSearch(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/submission/${props.match.params.id}`).then((res) => {
            filterContent(res.data.result, searchTerm.toLowerCase())
            console.log(res.data.result)
        }).catch((error) => {
            alert("Failed to search student group with the given key word")
        })
    }

    return (
        
        <div className="container">
             <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Marking criteria</h2>
                    </div>
                </div>
             <div className="blue-table ">
                <div>
                    <table style={ {border:'1px solid black'}}>
                        
                        <thead >
                        {MarkingArr.map((Marking, key) => (
                            <tr style={ {border:'1px solid black'}} key={key}>
                                
                                <th  style={{ textAlign: 'center',border:'1px solid black',backgroundColor: 'powderblue',color:'blue'}}> {Marking.progress_name}</th>
                               
                                <th>
                                <IconButton onClick={() => viewPdf(Marking.submission_doc)}>
                                                <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center'}} ></PictureAsPdfIcon>
                                            </IconButton>
                                </th>
                            </tr>
                            ))}
                        </thead>
                  
                    </table>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Submissions</h2>
                    </div>
                </div>
                <div className="col-3">
                </div>
                <div className="col-5">
                    <div className="px-3 search" align="center">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search submissions"
                            onChange={handleSearch}
                            required
                        />
                    </div>
                </div>
            </div>
           
            <div className="blue-table ">
                <div className="blue-table, box-view-prescription">
                    <table>
                        <thead >
                            <tr>
                                <th style={{ textAlign: 'center' }}>Student Group</th>
                                <th style={{ textAlign: 'center' }}>Submission 1</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {submissionArr.map((submission, key) => (
                                <tr key={key}>

                                    <td>
                                        {submission.groupName}
                                    </td>
                                    <td>
                                        <div>
                                            <IconButton onClick={() => viewSubmissionDoc(submission.imgUrl)}>
                                                <AssignmentIcon style={{ color: red[500] }} ></AssignmentIcon>
                                            </IconButton>
                                            <Popup trigger={<IconButton onClick={() => giveFeedback(submission.groupName)}>
                                                <FeedbackIcon style={{ color: grey[500] }} ></FeedbackIcon>
                                            </IconButton>} position="right center">
                                                <div>Popup content here !!</div>
                                            </Popup>

                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div> */}
        </div>
    )
}

export default ViewSubmission
