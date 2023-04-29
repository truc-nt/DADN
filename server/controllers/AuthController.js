const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const {addBroker} = require('./mqttController')
const {handleAddDevices} = require('./deviceController')

const handleRegister = async (req, res) => {
    const {username, password, io_username, io_key} = await req.body
    const isValidUsername = await User.isValidUsername(username)
    if (!isValidUsername) return res.json({
        success: false,
        message: 'Username đã được dùng rồi, vui lòng sử dụng username khác'
    })

    const feedsFromAdafruitServer = await User.isValidAdafruitServer(io_username, io_key, res)
    if (!feedsFromAdafruitServer.length) return res.json({
        success: false,
        message: 'Adafruit Server tương ứng không tồn tại hoặc đã được đăng kí'
    })
    console.log(username, password, io_username, io_key)

    const user = await User({username: username, password: password, io_username: io_username, io_key: io_key})
    await user.save()
    addBroker(user)
    handleAddDevices(feedsFromAdafruitServer, user._id)
    res.status(201).json({
        success: true,
        user: user
    })
}

const handleLogin = async (req, res) => {
    const cookies = req.cookies
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (!user) return res.json({
        success: false,
        message: 'User not found with username'
    })
    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) return res.json({
        success: false,
        message: 'Password not matched'
    })
    
    const newRefreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
    
    const newRefreshTokenArray = cookies?.refreshToken ? user.refreshToken.filter(rt => rt !== cookies.refreshToken) : user.refreshToken
    
    if (cookies?.refreshToken) {
        res.clearCookie('resfreshToken', { httpOnly: true, sameSite: 'None', secure: true })
    }

    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
    //user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
    //const result = await user.save()
    //console.log(result)

    const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'}) 
    
    res.status(202).json({
        success: true,
        message: 'Login successfully!',
        user: {
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            io_username: user.io_username,
            io_key: user.io_key,
            accessToken: accessToken
        },
    })
}

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.sendStatus(204);
    
    const refreshToken = cookies.refreshToken
    const user = await User.findOne({refreshToken})

    if (!user) {
        res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true})
        return res.sendStatus(204)
    }

    user.refreshToken = user.refreshToken.filter(rt => rt !== refreshToken)
    const result = await user.save()
    console.log(result)
    res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true})
    res.sendStatus(202)
}

module.exports = {handleRegister, handleLogin, handleLogout}