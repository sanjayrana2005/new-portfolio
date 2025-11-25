const express = require("express");
const connectDB = require("./Config/ConnectDB");
const messageRouter = require("./routes/messageRoutes");
const userRouter = require("./routes/userRoutes");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const timeLineRouter = require("./routes/timeLineRoute");
const softwareRouter = require("./routes/softwareRoute");
const skillRouter = require("./routes/skillsRoute");

const app = express();
require("dotenv").config();
app.use(cookieParser());

app.use(express.json());                                                        
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);


app.use("/",messageRouter);
app.use("/",userRouter);
app.use("/",timeLineRouter);
app.use("/",softwareRouter);
app.use("/",skillRouter);


connectDB()
    .then(() => {
        console.log("Database connected!!");
        app.listen(process.env.PORT, () => {
            console.log(`Server running at port ${process.env.PORT}!!`);
        });
    })
    .catch((error)=>{
        console.log("Database can not connected!!")
    })
