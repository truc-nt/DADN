const DeviceSchema = require('./DeviceModel')
const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')

const FanSchema = extendSchema(DeviceSchema, {
        mode: {
            type: String, 
            default: 'Thủ công',
        },
        strength: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Fan',FanSchema);