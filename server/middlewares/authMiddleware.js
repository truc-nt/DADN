const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

exports.verifyAccessToken = async (req, res, next) => {
    try {
        if (req?.headers?.authorization) {
            const accessToken = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findById(decode._id)
            if (!user) return res.status(401).json({
                success: false,
                message: 'Unathorized'
            })
            req.user = user
            next()
        } else {
            res.json({
                success: false,
                message: 'Unathorized'
            })
        }
    } catch (err) {
        console.log(err.name)
        if (err.name === 'JsonWebTokenError') 
            return res.status(401).json({
                success: false,
                message: 'Unathorized'
            })
        if (err.name === 'TokenExpiredError')
            return res.status(403).json({
                success: false,
                message: 'Session expired! Try login again'
            })
        res.json({
            success: false,
            message: 'Server error!'
        })
    }
}