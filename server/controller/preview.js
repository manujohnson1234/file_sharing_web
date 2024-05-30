const File = require('../models/fileModel');
const path = require('path');
const fs = require('fs');

const preview = async (req, res) => {
    const file = await File.findById(req.params.fileID);

    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }

    if(file.username != req.params.username){
        return res.status(401).json({ message: 'file is not allowed' });
    }

    const filePath = path.join(file.path);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
    }

    let contentType = '';
    const ext = path.extname(file.path).toLowerCase();
    switch (ext) {
        case '.pdf':
            contentType = 'application/pdf';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.docx':
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        // Add more cases for other file types if needed
        default:
            contentType = 'application/octet-stream'; // Default to binary data
            break;
    }

    // Set appropriate content type for the file
    res.writeHead(200, {
        'Content-Type': contentType,
    });

    // Stream the file content to the response
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
};

module.exports = preview;
