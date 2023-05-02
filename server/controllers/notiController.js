const User = require('../models/UserModel');

exports.addToken = async (req, res) => {
    const { _id } = req.user;
    const { token } = req.body;

    const user = await User.findOne({ _id: _id });

    if (!user.pushToken.includes(token)) {
        user.pushToken = [...user.pushToken, token];
        await user.save();
    }
    
    res.send('successful');
};
