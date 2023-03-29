const express = require('express')
const router = express.Router()
const axios = require('axios')

const {verifyAccessToken} = require('../middlewares/authMiddleware')

router.get('/', verifyAccessToken, async (req, res) => {
    const {APIKey} = req.user
    if (!APIKey) res.send('error')
    try {
        const result = await axios.get(`https://io.adafruit.com/api/v2/NhanHuynh/feeds/bbc-humi?x-aio-key=${APIKey}`)
        res.send(result.data.last_value)
    } catch (err) {
        console.log(err)
        res.send('error')
    }
})

module.exports = router