const sharp = require('sharp');
const User = require('../models/UserModel');

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

module.exports = { handleChangeAvatar };
