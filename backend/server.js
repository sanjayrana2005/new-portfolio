const express = require("express");
const connectDB = require("./Config/ConnectDB");
const app = express();
require("dotenv").config();


// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "/tmp/",
//     })
// );

app.use("/", (req, res) => {
    res.send("hi from server hh");
});


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
