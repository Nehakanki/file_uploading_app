const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const fs = require('fs');


const fileSchema = new mongoose.Schema({
        name:{
            type:String,
            required: true,
        },
        imageUrl:{
            type:String,

        },

        tags:{
            type:String,
        },
        email:{
            type:String,
        }
});



//post middleware for email 
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC:"+ doc);

        //transporter

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
              }

        })


        //send mail

        let info = await transporter.sendMail({
            from: `Neha Kanki`,
            to: doc.email,
            subject:"New file Uploaded on cloudinary",
            html:`<h2>Cloudinary Uploads</h2> <p>Your image uploaded successfully</p>`,
           
        });
        console.log("Info"+info)

    }catch(err){
            console.log("Error occured"+err);
    }

})

const File = mongoose.model('File', fileSchema);
module.exports = File;