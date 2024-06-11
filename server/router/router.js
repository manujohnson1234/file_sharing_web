const express = require('express');
const { signup, login } = require('../controller/authController');
const {userVerification } = require('../middelwares/AuthMiddleware');
const upload = require("../util/upload");
const uploadFile = require('../controller/fileController');
const showFile = require('../controller/uploadController');
const preview = require('../controller/preview');
const showDownload = require('../controller/downloadController');
const downloadFile = require('../controller/downloadFileController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/upload',userVerification, showFile);

router.post('/uploadfile',userVerification, upload.single('file'),uploadFile);

router.get('/preview/:fileID/:username',preview);

router.post('/download', userVerification, showDownload);

router.get('/download/:fileID/:userName', downloadFile);


module.exports = router;