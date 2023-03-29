const express = require('express')
const router = express.Router()

const {verifyAccessToken} = require('../middlewares/authMiddleware')
const {handleLogout} = require('../controllers/authController')

router.post('/', verifyAccessToken, handleLogout)

module.exports = router