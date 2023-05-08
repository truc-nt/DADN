const express = require('express');
const router = express.Router();
const axios = require('axios');

const { verifyAccessToken } = require('../middlewares/authMiddleware');
const { handleGetWeather } = require('../controllers/userController')

router.get('/', verifyAccessToken, handleGetWeather);

module.exports = router;