const  File = require("../model/file");
const cloudinary = require('cloudinary').v2


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

function isFileSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

//upload to cloudinary
async function uploadToCloudinary(file,folder, quality){
    const options ={folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality= quality;
    }

    options.resource_type="auto";//imp part
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload
exports.imageUpload = async(req,res)=>{
    try{
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes =["jpg","jpeg","png"];
        const fileType= file.name.split('.')[1].toLowerCase();

        console.log("filetype", fileType);
        if(!isFileSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:" Not a Supported type",
            })
        }

        //if file format is supported 

console.log("Uploading to cloudinary in folder Neha");

const response = await uploadToCloudinary(file , "Neha");
console.log(response);

const fileSchema = await File.create({

    name,
    tags,
    email,
    imageUrl: response.secure_url,
})

res.json({
    success:true,
    message:"Image Uploaded succesfully",
    imageUrl:response.secure_url,

})

        

    }catch (err) {
        console.error("Error in uploading:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.videoUpload = async (req,res)=>{
    try{
        const{name, tags, email}= req.body;
        console.log(name, tags,email);

        const file = req.files.videoFile;

        //validation
        const supportedTypes=["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }
        console.log("Uploading to Neha");

        const response = await uploadToCloudinary(file, "Neha");

        //Db creaton
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        });

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:"Video Successfully uploaded"
        })

           

    } catch(err){
        console.log("Error occured"+ err);
        
    }
}

exports.imageReducer = async(req,res)=>{
    try{
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes =["jpg","jpeg","png"];
        const fileType= file.name.split('.')[1].toLowerCase();

        console.log("filetype", fileType);
        if(!isFileSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:" Not a Supported type",
            })
        }

        //if file format is supported 

console.log("Uploading to cloudinary in folder Neha");

const response = await uploadToCloudinary(file , "Neha", 70);
console.log(response);

const fileSchema = await File.create({

    name,
    tags,
    email,
    imageUrl: response.secure_url,
})

res.json({
    success:true,
    message:"Image Uploaded succesfully",
    imageUrl:response.secure_url,

})

        

    }catch (err) {
        console.error("Error in uploading:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

