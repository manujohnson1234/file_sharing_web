const mongoose = require("mongoose");

const sharedFileSchema = new mongoose.Schema({
    receiverName: {
        type: String,
        required: true
    },

    senderName:{
        type: String,
        required: true
    },
    
    fileName: {
        type: String,
        required: true,
    },

    filePath:{
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date(),
    },

});

const sharedFile = mongoose.model('sharedFile', sharedFileSchema);

module.exports = sharedFile;