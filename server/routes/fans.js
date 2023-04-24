const express = require('express')
const router = express.Router()

const {verifyAccessToken} = require('../middlewares/authMiddleware')
const {handleChangeValue} = require('../controllers/fanController')

router.use(verifyAccessToken)

router.put('/value/:id', handleChangeValue)

module.exports = router