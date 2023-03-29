const Fan = require('../models/FanModel')

exports.handleChangeStrength = async (req, res) => {
    const {_id, APIKey} = req.user
    const {strength} = req.body
    const id = req.params.id

    const updated = await Fan.findOne({_id: id, userId: _id})

    updated.changeStrength(APIKey, strength)
    res.send('successful')
}