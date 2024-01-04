const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
       // sslValidate: false, // Set this to false if using a self-signed certificate
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(()=>{
        console.log("DB connected successfully");
    })
    .catch((error)=>{
        console.log("Error"+error)
    })
}
