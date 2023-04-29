const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    console.log("coookie", cookies)
    if (!cookies?.refreshToken) return res.sendStatus(401)
    const refreshToken = cookies.refreshToken

    res.clearCookie('resfreshToken', { httpOnly: true, sameSite: 'None', secure: true })

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
        
        const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
        
        // Refresh token was still valid
        const newRefreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

        user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
        await user.save()
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 7 })

        res.status(200).json({ accessToken: accessToken })
    })
}

module.exports = {handleRefreshToken}