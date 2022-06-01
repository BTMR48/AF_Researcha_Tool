const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

app.use(express.static('public'));
//limiting image size to 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const Markingrouter = require("./routes/markingrouter");
const AdminRouter = require("./routes/adminrouter.js");
const StudentRouter = require("./routes/studentrouter.js");
const ProgressRouter = require("./routes/progressrouter.js");
const SupervisorRouter = require("./routes/supervisorrouter");
const PanelmemberRouter = require("./routes/panelmemberrouter");
const CoSupervisorrouter = require("./routes/cosupervisorrouter");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const SubmissionRouter = require("./routes/submissionrouter");
const Submission = require("./routes/submissionrouter");
const RequestRouter = require("./routes/requestrouter");
const CoRequestRouter = require("./routes/corequestrouter");
const PanelgroupRouter = require("./routes/panelgrouprouter");
const userRoute = require("./routes/user");
const TopicEvalRouter = require('./routes/topicEvalrouter.js');


//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL,{
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: true,
})

//database connection
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("Research tool db connection success");
}); 


//when http://localhost:8070/admin ran it will execute adminrouter.js file
app.use("/admin",AdminRouter);
//when http://localhost:8070/student ran it will execute StudentRouter.js file
 app.use("/student",StudentRouter);
 //when http://localhost:8070/student ran it will execute StudentRouter.js file
 app.use("/progress",ProgressRouter);
//when http://localhost:8070/supervisor ran it will execute supervisorrouter.js file
app.use("/supervisor",SupervisorRouter);
//when http://localhost:8070/panelmember ran it will execute panelmemberrouter.js file
app.use("/panelmember",PanelmemberRouter);
//when http://localhost:8070/supervisor ran it will execute supervisorrouter.js file
app.use("/cosupervisor",CoSupervisorrouter);

//when http://localhost:8070/submission ran it will execute submissionrouter.js file
app.use("/submission",SubmissionRouter);
//when http://localhost:8070/marking ran it will execute markingrouter.js file
app.use("/marking",Markingrouter);

//when http://localhost:8070/submission ran it will execute supervisorrouter.js file
app.use("/submission",Submission);
//when http://localhost:8070/request ran it will execute requestrouter.js file
app.use("/request",RequestRouter);
//when http://localhost:8070/request ran it will execute co-requestrouter.js file
app.use("/corequest", CoRequestRouter);
//when http://localhost:8070/pnlgroup ran it will execute panelgrouprouter.js file
app.use("/pnlgroup",PanelgroupRouter);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/user", userRoute);
//when http://localhost:8070/pnlgroup ran it will execute panelgrouprouter.js file
app.use("/topiceval",TopicEvalRouter);





//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT,() =>{
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
