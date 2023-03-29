const express = require('express')
const router = express.Router()
const axios = require('axios')

const {verifyAccessToken} = require('../middlewares/authMiddleware')
const {handleGetAmount, handleGetAll, handleChangeAllStatus, handleChangeStatus, handleChangeMode} = require('../controllers/deviceController')

router.use(verifyAccessToken)

router.get('/amount/:type', handleGetAmount)
router.get('/all/:type', handleGetAll)

router.put('/status/:type', handleChangeAllStatus)
router.put('/status/:type/:id', handleChangeStatus)
router.put('/mode/:type/:id', handleChangeMode)

module.exports = router