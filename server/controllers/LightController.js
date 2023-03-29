const Light = require('../models/LightModel')

exports.handleChangeColor = async (req, res) => {
    const {_id, APIKey} = req.user
    const {value} = req.body
    const id = req.params.id

    const updated = await Light.findOne({_id: id, userId: _id})

    updated.changeColor(APIKey, value)
    res.send('successful')
}