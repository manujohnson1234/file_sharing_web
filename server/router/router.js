const express = require('express');
const { signup, login } = require('../controller/authController');
const {userVerification } = require('../middelwares/AuthMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/upload',userVerification);

module.exports = router;