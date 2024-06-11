const fs = require('fs');
const path = require('path');
const sharedFile = require('../models/sharedFilesModel');

const saveFile = (fileBuffer, fileName, receiverName, senderName, callback) => {
  const buffer = Buffer.from(new Uint8Array(fileBuffer));
  const filePath = path.join(__dirname, '..', 'uploads', 'sharedfiles', receiverName, `${Date.now()}-${fileName}`);

  fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
    if (err) {
      return callback(err);
    }

    fs.writeFile(filePath, buffer, async (err) => {
      if (err) {
        return callback(err);
      }

      const fileObj = {
        receiverName: receiverName,
        senderName: senderName,
        fileName: fileName,
        filePath: filePath,
      };

      try {
        const file = new sharedFile(fileObj);
        await file.save();
        console.log(`File saved: ${filePath}`);
        callback(null, { receiverName, fileName, filePath });
      } catch (err) {
        callback(err);
      }
    });
  });
};

module.exports = { saveFile };
