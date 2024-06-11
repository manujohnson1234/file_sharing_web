const File = require('../models/sharedFilesModel');

const download = async(req, res)=>{
    try{
        const fileObj = await File.findById(req.params.fileID);
        if(req.params.userName === fileObj.receiverName){
            res.download(fileObj.filePath, fileObj.fileName);
        }else{
            throw new Error('You are not authorized to download this file');
        }
            
    }catch(err){
        console.log(err.message);
        return res.status(500).json({error : err.message});
    }
    

}

module.exports = download;