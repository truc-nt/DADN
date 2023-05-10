const sharp = require('sharp');
const User = require('../models/UserModel');
const axios = require('axios');

const handleChangeAvatar = async (req, res) => {
    try {
        const avatarBuffer = req.file.buffer;
        const { width, height } = await sharp(avatarBuffer).metadata();
        const avatar = await sharp(avatarBuffer)
            .resize(Math.round(width * 0.5), Math.round(height * 0.5))
            .toBuffer();

        await User.findByIdAndUpdate(req.user._id, { avatar });
        res.status(201).json({
            success: true,
            message: 'Avatar is updated',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server failed! try again',
        });
        console.log(err);
    }
};

const handleGetWeather = async (req, res) => {
    const { io_username, io_key } = req.user;
    if (!io_key) return res.send('error');
    try {
        const humid = await axios.get(
            `https://io.adafruit.com/api/v2/${io_username}/feeds/bbc-humi?x-aio-key=${io_key}`
        );
        const temp = await axios.get(
            `https://io.adafruit.com/api/v2/${io_username}/feeds/bbc-temp?x-aio-key=${io_key}`
        );
        const weather = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=07583b2f86d040e8ae2183924230105&q=vietnam`
        );
        const condition = weather.data.current.condition;
        return res.status(200).json({
            text: condition.text,
            image: condition.icon,
            temp: temp.data.last_value,
            humid: humid.data.last_value,
        });
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
};

const handleChangeUsername = async (req, res) => {
    const { data } = req.body;
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });
    user.username = data;
    await user.save();
    res.status(200).json('successfully');
};

const handleChangePassword = async (req, res) => {
    const { oldPw, newPw } = req.body;
    const { _id } = req.user;
    const user = await User.findOne({ _id: _id });
    const matched = await user.comparePassword(oldPw);
    if (!matched) return res.status(403).json('Password không đúng');
    if (newPw === '' || newPw.length < 7 || newPw.length > 20)
        return res
            .status(403)
            .json('Password must be within 8 to 20 characters!!!');
    user.password = newPw;
    await user.save();
    res.status(200).json('successfully');
};

module.exports = {
    handleChangeAvatar,
    handleGetWeather,
    handleChangeUsername,
    handleChangePassword,
};
