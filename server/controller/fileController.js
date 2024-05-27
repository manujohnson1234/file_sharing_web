const File = require('../models/fileModel');


const uploadFile = async (req, res)=>{

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const fileObj = {
        username: req.user.username,
        name: req.file.originalname,
        path: req.file.path
    }
    try{
        const file = await File.create(fileObj);
        console.log(req.file.originalname);
        res.status(200).json({ message: `${file.name} uploaded`});
    }catch(e){
        console.log(e.message);
        res.status(500).json({error : e.message});
    }
}

module.exports = uploadFile;