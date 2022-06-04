import React, { useEffect, useState } from 'react';

import { red, grey, lightBlue } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import '../ViewSubmission/ViewSubmission.css';


function ViewSubmission(props) {

    const [submission1Arr, setSubmission1Arr] = useState([])
    const [submission2Arr, setSubmission2Arr] = useState([])
    const [MarkingArr, setMarkingArr] = useState([])
    const [isSupervisor, setIsSupervisor] = useState(false)
    const history = useHistory()


    useEffect(() => {
        if (localStorage.getItem("supervisorAuthToken")) {
            setIsSupervisor(true)
        } else {
            setIsSupervisor(false)
        }

//Fetch submission details
        async function getSubmission1() {
            await axios.get(`https://af-research-tool.herokuapp.com/submission/progress_1`).then((res) => {
                const result = res.data.result.filter((submission) =>
                    submission.grpId.supId.toLowerCase().includes(props.match.params.id.toLowerCase()))
                setSubmission1Arr(result)

            }).catch((error) => {
                alert("Failed to fetch the submission details")
            })
        }
        getSubmission1()
        async function getSubmission2() {
            await axios.get(`https://af-research-tool.herokuapp.com/submission/progress_2`).then((res) => {
                const result = res.data.result.filter((submission) =>
                    submission.grpId.supId.toLowerCase().includes(props.match.params.id.toLowerCase()))
                setSubmission2Arr(result)

            }).catch((error) => {
                alert("Failed to fetch the submission details")
            })
        }
        getSubmission2()
        async function getMarking() {
            await axios.get(`https://af-research-tool.herokuapp.com/marking/view`).then((res) => {
                setMarkingArr(res.data)
            }).catch((error) => {
                alert("Failed to fetch the Marking details")
            })
        }
        getMarking()
    }, [props])

//Open pdf url in another window
    function viewPdf(markingUrl) {
        console.log(markingUrl)
        window.open(markingUrl);

    }
//navigate to feedback page
    function giveFeedback(grpId, proId) {
        console.log(grpId + "Hello Friend" + proId)
        history.push(`/submission/feedback/${grpId}/${proId}`)
    }
//Open submission documents
    function viewSubmissionDoc(submissionUrl) {
        console.log(submissionUrl)
        window.open(submissionUrl);
    }

    function filterContent1(data, searchTerm) {
        const result = data.filter((submission) =>
            submission.grpId.grpName.toLowerCase().includes(searchTerm))
        setSubmission1Arr(result)
    }
//Handle search
    function handleSearch1(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`https://af-research-tool.herokuapp.com/submission/progress_1`).then((res) => {
            filterContent1(res.data.result, searchTerm.toLowerCase())
            console.log(res.data.result)
        }).catch((error) => {
            alert("Failed to search student group with the given keyword")
        })
    }
    function viewSubmissionDoc(submissionUrl) {
        console.log(submissionUrl)
        window.open(submissionUrl);
    }

    function filterContent2(data, searchTerm) {
        const result = data.filter((submission) =>
            submission.grpId.grpName.toLowerCase().includes(searchTerm))
        setSubmission2Arr(result)
    }

    function handleSearch2(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`https://af-research-tool.herokuapp.com/submission/progress_2`).then((res) => {
            filterContent2(res.data.result, searchTerm.toLowerCase())
            console.log(res.data.result)
        }).catch((error) => {
            alert("Failed to search student group with the given keyword")
        })
    }

    return (

        <div className="container">
            <div className="col-4">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>Marking criteria</h2>
                </div>
            </div>
            <div className="productGrid"  >
                {MarkingArr.map((marking, key) => (
                    <div key={key}>
                        <div className="productCard" align="center">
                            <IconButton onClick={() => viewPdf(marking.submission_doc)}>
                                <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center' }} ></PictureAsPdfIcon>
                            </IconButton>
                            <div className="p-3">
                                <h6>{marking.progress_name}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <br /><br />


            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Submissions</h2>
                    </div>
                </div>
                <div className="col-3">
                </div>
                <br /> <br /><br /> <br />
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h4>Progress 1</h4>
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
                            onChange={handleSearch1}
                            required
                        />
                        <br />
                    </div>
                </div>


                <div className="blue-table ">
                    <div className="blue-table, box-view-prescription">
                        <table>
                            < thead >
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Student Group</th>
                                    <th style={{ textAlign: 'center' }}>Progress_1</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {submission1Arr.map((submission1, key) => (
                                    <tr key={key}>
                                        <td>
                                            {submission1.grpId.grpName}
                                            {console.log("group Id" + submission1.grpId._id)}
                                        </td>
                                        <td>
                                            <div>
                                                <IconButton onClick={() => viewSubmissionDoc(submission1.submissionUrl)}>
                                                    <AssignmentIcon style={{ color: red[500] }} ></AssignmentIcon>
                                                </IconButton>
                                                <IconButton onClick={() => giveFeedback(submission1.grpId._id, submission1.proId._id)}>
                                                    <FeedbackIcon style={{ color: grey[500] }} ></FeedbackIcon>
                                                </IconButton>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-3">
                </div>
                <br /> <br />
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h4>Progress 2</h4>
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
                            onChange={handleSearch2}
                            required
                        />
                        <br />
                    </div>
                </div>
                <div className="blue-table ">
                    <div className="blue-table, box-view-prescription">
                        <table>
                            < thead >
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Student Group</th>
                                    <th style={{ textAlign: 'center' }}>Progress_2</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {submission2Arr.map((submission2, key) => (
                                    <tr key={key}>
                                        <td>
                                            {submission2.grpId.grpName}
                                        </td>
                                        <td>
                                            <div>
                                                <IconButton onClick={() => viewSubmissionDoc(submission2.submissionUrl)}>
                                                    <AssignmentIcon style={{ color: red[500] }} ></AssignmentIcon>
                                                </IconButton>
                                                <IconButton onClick={() => giveFeedback(submission2.grpId._id, submission2.proId._id)}>
                                                    <FeedbackIcon style={{ color: grey[500] }} ></FeedbackIcon>
                                                </IconButton>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewSubmission
