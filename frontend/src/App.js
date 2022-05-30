import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import PrivateRoute from './Routes/PrivateRoute';
import StudentPrivateRoute from './Routes/StudentPrivateRoute';

import AdminSignIn from './components/AdminManagement/AdminLogin';
import StudentSignIn from './components/StudentManagement/StudentSignIn/StudentSignIn'; 
import StudentSignUp from './components/StudentManagement/StudentSignUp/StudentSignUp'; 
import SupervisorSignIn from './components/SupervisorManagement/SupervisorSignIn/SupervisorSignIn'; 
import SupervisorSignUp from './components/SupervisorManagement/SupervisorSignUp/SupervisorSignUp'; 
import CosupervisorSignIn from './components/CosupervisorManagement/CosupervisorSignIn/CosupervisorSignIn'; 
import CosupervisorSignUp from './components/CosupervisorManagement/CosupervisorSignUp/CosupervisorSignUp'; 
import PanelmemberSignIn from './components/PanelmemberManagement/PanelmemberSignIn/PanelmemberSignIn'; 
import PanelmemberSignUp from './components/PanelmemberManagement/PanelmemberSignUp/PanelmemberSignUp'; 
import AddProgress from './components/ProgressManagement/AddProgress/AddProgress';

import Levels from './components/ProgressManagement/Levels/Levels';
import SingleLevel from './components/ProgressManagement/SingleLevel/SingleLevel';
import UpdateProgress from './components/ProgressManagement/UpdateProgress/UpdateProgress';
import AddSubmission from './components/SubmissionManagement/AddSubmission/AddSubmissionstd';
import Footer from './components/Footer/Footer';

import ViewSubmission from './components/SubmissionManagement/ViewSubmission/ViewSubmission';
import UsersHome from './components/UserManagement/UserHome'; 
import AllSupervisors from './components/UserManagement/SupervisorList/allsupervisors'; 

import AllCosupervisors from './components/UserManagement/CosupervisorList/allcosupervisors'; 
import AllPanelmembers from './components/UserManagement/PanelmemberList/allpanelmembers'; 
import AllStudents from './components/UserManagement/GroupList/allgroups'; 
import UpdateStudent from './components/StudentManagement/UpdateStudent/UpdateStudent'; 
import AssignPanelmember from './components/UserManagement/AssignPanelmember/AssignPanelmember';

import ViewSupervisor from './components/SupervisorManagement/ViewSupervisor/ViewSupervisor';
import AddRequest from './components/RequestManagement/AddRequest';
import ViewRequest from './components/RequestManagement/ViewRequests/ViewRequest';
import ViewCoSupervisor from './components/CosupervisorManagement/ViewCoSupervior/ViewCoSupervior';
import ViewPanelMember from './components/PanelmemberManagement/ViewPanelMembers/ViewPanelMember';
import SingleRequest from './components/RequestManagement/SingleRequest/SingleRequest';
import UpdateRequest from './components/RequestManagement/UpdateRequest/UpdateRequest';
import AddCoRequest from './components/CoSupervisorRequest/AddCoRequest';
import ViewCorequest from './components/CoSupervisorRequest/ViewCorequest';
import UpdateCoRequest from './components/CoSupervisorRequest/UpdateCoRequest';

import UpdateSupervisor from './components/SupervisorManagement/UpdateSupervisor/UpdateSupervisor';
import UpdateCosupervisor from './components/CosupervisorManagement/UpdateCosupervisor/UpdateCosupervisor';
import UpdatePanelmember from './components/PanelmemberManagement/UpdatePanelmember/UpdatePanelmember';

import AddMarking from './components/MarkingSchemeManagement/AddMarking';
import TopicSubmission from './components/TopicEvaluation/TopicSubmission';
import UpdateTopicSubmission from './components/TopicEvaluation/UpdateTopicSubmission';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Header/>
            
            <Route path="/admin/signin" exact component={AdminSignIn} />

            <Route path="/" exact component = {StudentSignIn}/>
            <Route path="/student/signup" exact component = {StudentSignUp}/>
            <Route path="/supervisor/signin" exact component = {SupervisorSignIn}/>
            <Route path="/supervisor/signup" exact component = {SupervisorSignUp}/>
            <Route path="/cosupervisor/signin" exact component = {CosupervisorSignIn}/>
            <Route path="/cosupervisor/signup" exact component = {CosupervisorSignUp}/>
            <Route path="/panelmember/signin" exact component = {PanelmemberSignIn}/>
            <Route path="/panelmember/signup" exact component = {PanelmemberSignUp}/>

            <Route path="/users" exact component = {UsersHome}/>
            <Route path="/users/supervisorlist" exact component = {AllSupervisors}/>

            <Route path="/users/cosupervisorlist" exact component = {AllCosupervisors}/>
            <Route path="/users/panelmemberlist" exact component = {AllPanelmembers}/>
            <Route path="/users/studentlist" exact component = {AllStudents}/>
            <Route path="/student/update/:id" exact component = {UpdateStudent}/>
            <Route path="/supervisor/update/:id" exact component = {UpdateSupervisor}/>
            <Route path="/cosupervisor/update/:id" exact component = {UpdateCosupervisor}/>
            <Route path="/panelmember/update/:id" exact component = {UpdatePanelmember}/>
            <Route path="/users/addpanel/:id" exact component = {AssignPanelmember}/>

            <Route path="/submission/viewSubmission/:id" exact component = {ViewSubmission}/>

            <Route path="/marking/add" exact component = {AddMarking}/>

            <Route path="/evolution/addProgress"exact component={AddProgress}/>
            <Route path="/evolution/levels" exact component={Levels}/>
            <Route path="/evolution/level/:id" exact component={SingleLevel}/>
            <Route path="/evolution/level/updateProgress/:id" exact component={UpdateProgress}/>
            
            <Route path="/supervisor/ViewSupervisor" exact component={ViewSupervisor}/>
            <Route path="/student/request/:id" exact component={AddRequest}/>
            <Route path ='/cosupervisor/ViewCosupervisors' exact component={ViewCoSupervisor}/>
            <Route path ='/panelmember/ViewPanelMember' exact component={ViewPanelMember}/>

            <StudentPrivateRoute path="/submission/addSubmission/:id/:name" exact component= {AddSubmission}/>

            <Route path="/request/allrequest" exact component={ViewRequest} />
            <Route path = "/request/:id" exact component={SingleRequest} />
            <Route path = '/request/update/:id' exact component={UpdateRequest} />
            <Route path = '/cosupervisor/request/:id' exact component={AddCoRequest} />
            <Route path = '/corequest/allcorequest' exact component={ViewCorequest} />
            <Route path = '/corequest/update/:id' exact component = {UpdateCoRequest} />
            <Route path = '/topiceval/add' exact component={TopicSubmission} />
            <Route path = '/topiceval/update/:id' exact component={UpdateTopicSubmission} />

            <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
