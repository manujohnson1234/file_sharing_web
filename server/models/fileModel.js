const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    
    name: {
        type: String,
        required: true,
    },
    path:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const File = mongoose.model('file', fileSchema);

module.exports = File;