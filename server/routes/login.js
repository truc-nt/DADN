const express = require('express');
const router = express.Router();

const { handleLogin } = require('../controllers/authController');
const {
    validateUserLogin,
    validateResult,
} = require('../middlewares/validation/user');

router.post('/', validateUserLogin, validateResult, handleLogin);

module.exports = router;
