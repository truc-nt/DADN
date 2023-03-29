const express = require('express')
const router = express.Router()

const {verifyAccessToken} = require('../middlewares/authMiddleware')
const {handleChangeColor} = require('../controllers/lightController')

router.use(verifyAccessToken)

router.put('/color/:id', handleChangeColor)

module.exports = router