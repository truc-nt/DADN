const Light = require('../models/LightModel')

exports.handleChangeValue = async (req, res) => {
    const {_id, io_username, io_key} = req.user
    const {value} = req.body
    const id = req.params.id

    const updated = await Light.findOne({_id: id, userId: _id})

    updated.changeValue(io_username, io_key, value)
    res.send('successful')
}