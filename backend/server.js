const express = require("express");
const connectDB = require("./Config/ConnectDB");
const messageRouter = require("./routes/messageRoutes");
const userRouter = require("./routes/userRoutes");
const fileUpload = require("express-fileupload");

const app = express();
require("dotenv").config();

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api",messageRouter);
app.use("/api",userRouter);


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
