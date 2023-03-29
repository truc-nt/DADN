const express = require('express')
const router = express.Router()

const {handleRegister} = require('../controllers/authController')
const {validateUserRegister, validateResult} = require('../middlewares/validation/user')

router.post('/', validateUserRegister, validateResult, handleRegister)

module.exports = router