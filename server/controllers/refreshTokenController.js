const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const handleRefreshToken = async (req, res) => {
    const {refreshToken} = req.body
    const user = await User.findOne({refreshToken})

    // Detected refresh token reuse!
    if (!user) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({message: "wht"})
            console.log('attempted refresh token reuse!')
            const hackedUser = await User.findOne({ _id: decoded._id });
            hackedUser.refreshToken = [];
            await hackedUser.save()
        })
        return res.status(403).json({message: "why"})
    }
    
    const newRefreshTokenArray = user.refreshToken.filter(rt => rt !== refreshToken)

    //evaluate
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            console.log('expired refresh token')
            user.refreshToken = [...newRefreshTokenArray]
            await user.save()
        }

        if (err || user._id.toString() !== decoded._id) return res.status(403)
        
        const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'})
        
        // Refresh token was still valid
        const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

        user.refreshToken = [...newRefreshTokenArray, refreshToken]

        res.status(200).json({ accessToken: accessToken })
    })
}

module.exports = {handleRefreshToken}