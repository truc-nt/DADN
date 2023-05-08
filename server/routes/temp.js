const express = require('express');
const router = express.Router();
const axios = require('axios');

const { verifyAccessToken } = require('../middlewares/authMiddleware');

router.get('/', verifyAccessToken, async (req, res) => {
    const { io_username, io_key } = req.user;
    if (!io_key) return res.send('error help');
    console.log(io_username, io_key);
    try {
        const result = await axios.get(
            `https://io.adafruit.com/api/v2/${io_username}/feeds/bbc-temp?x-aio-key=${io_key}`,
            { timeout: 60000 }
        );
        return res.send(result.data.last_value);
    } catch (err) {
        //console.log(err)
        return res.send('error cứu');
    }
});

module.exports = router;
