const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const handleReusedRefreshToken = async (err, decoded) => {
    if (err) return res.status(403)
    console.log('attempted refresh token reuse!')
    const hackedUser = await User.findOne({ _id: decoded._id });
    const user = hackedUser.refreshToken = [];
    await user.save()
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.refreshToken) return res.status(401)
    const refreshToken = cookies.refreshToken
    res.clearCookie('resfreshToken', { httpOnly: true, sameSite: 'None', secure: true })

    const user = await User.findOne({refreshToken})

    // Detected refresh token reuse!
    if (!user) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, handleReusedRefreshToken)
        return res.status(403)
    }
    
    const newRefreshTokenArray = user.refreshToken.filter(rt => rt !== refreshToken)

    //evaluate
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            console.log('expired refresh token')
            user.refreshToken = [...newRefreshTokenArray]
            await user.save()
        }
        if (err || user._id !== decoded._id) return res.status(403)
        const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'})
        
        // Refresh token was still valid
        const newRefreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

        user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
        await user.save()
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

        res.json({ accessToken: accessToken })
    })
}

module.exports = {handleRefreshToken}