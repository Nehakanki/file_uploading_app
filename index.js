const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json())

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir:'/tmp/'
    
}));

//DB connection

const db= require("./config/database");
db.connect();

//cloudinary Setup
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//routes
const Upload = require("./routes/Fileupload");
app.use("/api/v1/upload", Upload);

//server activation

app.listen(PORT , ()=>{
    console.log(`App started at ${PORT}`);
})

