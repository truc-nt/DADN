const express = require('express')
const router = express.Router()

const {verifyAccessToken} = require('../middlewares/authMiddleware')
const {handleChangeStrength} = require('../controllers/fanController')

router.use(verifyAccessToken)

router.put('/strength/:id', handleChangeStrength)

module.exports = router