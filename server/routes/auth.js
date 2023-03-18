const express = require('express')
const router = express.Router()

const {handleRegister, handleLogin} = require('../controllers/AuthController')
const {validateUserRegister, validateUserLogin, validateResult} = require('../middlewares/validation/user')

router.post('/register', validateUserRegister, validateResult, handleRegister)
router.post('/login', validateUserLogin, validateResult, handleLogin)

module.exports = router