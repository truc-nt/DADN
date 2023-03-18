const express = require('express')
const router = express.Router()

const {handleChangeStatus} = require('../controllers/LightController')
const {verifyAccessToken} = require('../middlewares/authMiddleware')

router.post('/status', verifyAccessToken, handleChangeStatus)

module.exports = router