const  File = require("../model/file");

//localfileupload --> handler function


exports.localFileUpload = async(req, res)=>{
    try{
        //fetch file
        const file = req.files.file;
        console.log("File ===>", file);
        //__dirname == current dir

        //server's path   //add .jpg 
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        console.log("Path -->", path)

        file.mv(path, (err)=>{
            console.log(err)
        });


        res.json({
            success: true,
            message:"file upload into local successfully"
        })

    }
   catch (error) {
        console.error(error); // Log the error if it occurs
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}