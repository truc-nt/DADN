const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/authMiddleware');
const { handleAddToken } = require('../controllers/notiController');

router.post('/', verifyAccessToken, handleAddToken);

module.exports = router;
