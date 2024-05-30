const File = require("../models/fileModel");

const showFile = async (req, res)=>{
    const user = req.user;
    try{
        const fileObj = await File.find({ username: user.username }).select('_id name');
        console.log(fileObj);
        
        const baseURL = 'http://localhost:8080/preview/';

        const files = fileObj.map(file => ({
            name: file.name,
            link: `${baseURL}${file._id}`
        }));


        return res.status(200).json({ success: true, user: user.username, files});
    }catch(error){
        console.error("Error fetching files:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
    
}

module.exports = showFile;