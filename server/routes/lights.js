const express = require('express')
const router = express.Router()

const {verifyAccessToken} = require('../middlewares/authMiddleware')
const {handleChangeValue} = require('../controllers/lightController')

router.use(verifyAccessToken)

router.put('/value/:id', handleChangeValue)

module.exports = router