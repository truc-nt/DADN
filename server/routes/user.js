const express = require('express')
const router = express.Router()

const {verifyAccessToken} = require('../middlewares/authMiddleware')
const {upload} = require('../middlewares/validation/image')
const {handleChangeAvatar} = require('../controllers/UserController')

router.post('/avatar', verifyAccessToken, upload.single('avatar'), handleChangeAvatar)

module.exports = router