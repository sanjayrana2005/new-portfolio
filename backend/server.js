const express = require("express");
const connectDB = require("./Config/ConnectDB");
const messageRouter = require("./routes/messageRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());
// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "/tmp/",
//     })
// );

app.use("/api",messageRouter);


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
