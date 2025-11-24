const express = require("express");
const app = express();
require("dotenv").config();


app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
);

app.use("/", (req, res) => {
    res.send("hi from server hh");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
});