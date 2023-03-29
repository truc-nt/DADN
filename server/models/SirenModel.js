const DeviceSchema = require('./DeviceModel')
const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')
const axios = require('axios')

const SirenSchema = extendSchema(DeviceSchema, {

    },
    { timestamps: true }
)

SirenSchema.methods.changeStatus = async function(APIKey, status) {
    this.status = status
    await this.save()
}

module.exports = mongoose.model('Siren',SirenSchema);