const User = require('../models/UserModel');
const { Expo } = require('expo-server-sdk');
const expo = new Expo();

exports.handleAddToken = async (req, res) => {
    const { _id } = req.user;
    const { token } = req.body;

    const user = await User.findOne({ _id: _id });

    if (!user.pushToken.includes(token) && Expo.isExpoPushToken(token)) {
        user.pushToken = [...user.pushToken, token];
        await user.save();
    }

    res.status(202).send('successful');
};


exports.pushNotification = async (user, title, body) => {
    const message = {
        to: user.pushToken,
        title: title,
        body: body,
        vibrate: [200, 100, 200],
        priority: title === 'Hẹn giờ' ? 'default' : 'high',
        channelId: title === 'Hẹn giờ' ? 'default' : 'alert',
    };

    try {
        const receipts = await expo.sendPushNotificationsAsync([message]);
        console.log(receipts);
    } catch (err) {
        console.log(err);
    }
};