const User = require('../models/UserModel');

exports.addToken = async (req, res) => {
    const { _id } = req.user;
    const { token } = req.body;

    const user = await User.findOne({ _id: _id });

    console.log(user.pushToken, token, user.pushToken.includes(token));
    if (!user.pushToken.includes(token)) {
        user.pushToken = [...user.pushToken, token];
        await user.save();
    }

    console.log(_id, token);
    res.send('successful');
};
