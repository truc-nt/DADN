const DeviceSchema = require('./DeviceModel')
const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')

const SirenSchema = extendSchema(DeviceSchema, {
        status: {
            type: String, 
            default: 'Off'
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Siren',SirenSchema);