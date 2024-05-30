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
    // whitewash: [{
    //     type: String, 
    //     trim: true, 
    //     unique: true 
    // }],
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const File = mongoose.model('file', fileSchema);

module.exports = File;