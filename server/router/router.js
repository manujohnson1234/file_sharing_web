const express = require('express');
const { signup, login } = require('../controller/authController');
const {userVerification } = require('../middelwares/AuthMiddleware');
const upload = require("../util/upload");
const uploadFile = require('../controller/fileController');
const showFile = require('../controller/uploadController');
const preview = require('../controller/preview');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/upload',userVerification, showFile);

router.post('/uploadfile',userVerification, upload.single('file'),uploadFile);

router.get('/preview/:fileID/:username',preview);


module.exports = router;