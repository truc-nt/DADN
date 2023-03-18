const DeviceSchema = require('./DeviceModel')
const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')

const LightSchema = extendSchema(DeviceSchema, {
        mode: {
            type: String, 
            default: 'Thủ công'
        },
        value: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Light',LightSchema);