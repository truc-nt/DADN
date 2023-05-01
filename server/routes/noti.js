const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/authMiddleware');
const { addToken } = require('../controllers/notiController');

router.post('/', verifyAccessToken, addToken);

module.exports = router;
