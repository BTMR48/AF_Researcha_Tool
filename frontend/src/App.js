import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header'
// import PrivateRoute from './Routes/PrivateRoute';
// import StudentPrivateRoute from './Routes/StudentPrivateRoute';


import AdminSignIn from './components/AdminManagement/AdminLogin';
import AddProgress from './components/ProgressManagement/AddProgress/AddProgress';
import Levels from './components/ProgressManagement/Levels/Levels';
import SingleLevel from './components/ProgressManagement/SingleLevel/SingleLevel';
import UpdateProgress from './components/ProgressManagement/UpdateProgress/UpdateProgress';
import AddSubmission from './components/SubmissionManagement/AddSubmission/AddSubmission';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
            {/* <Header/> */}
              <Route path="/admin/signin" exact component={AdminSignIn} />
              <Route  path="/evolution/addProgress"exact component={AddProgress}/>
              <Route  path="/evolution/levels" exact component={Levels}/>
              <Route  path="/evolution/level/:id" exact component={SingleLevel}/>
              <Route  path="/evolution/level/updateProgress/:id" exact component={UpdateProgress}/>

              <Route path="/submission/addSubmission/:id" exact component= {AddSubmission}/>
           
        </div>
      </Router>
    </div>
  );
}

export default App;
