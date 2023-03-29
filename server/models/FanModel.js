const DeviceSchema = require('./DeviceModel')
const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')
const axios = require('axios')

const FanSchema = extendSchema(DeviceSchema, {
        mode: {
            type: String,
            enum: ['Thủ công', 'Tự động'],
            default: 'Thủ công',
        },
        strength: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

FanSchema.methods.changeStatus = async function(APIKey, status) {
    try {
        const data = status && this.value > 0 ? this.value : status ? 80 : 0
        await axios.post(`https://io.adafruit.com/api/v2/NhanHuynh/feeds/${this.key}/data?x-aio-key=${APIKey}`, {
            "value": data
        })
        this.status = status
        this.strength = data
        this.mode = "Thủ công"
        await this.save()
    } catch (err) {
        console.log(err)
    }
}

FanSchema.methods.changeMode = async function() {
    try {
        this.mode = this.mode == "Tự động" ? "Thủ công" : "Tự động"
        await this.save()
    } catch (err) {
        console.log(err)
    }
}

FanSchema.methods.changeStrength = async function(APIKey, strength) {
    try {
        await axios.post(`https://io.adafruit.com/api/v2/NhanHuynh/feeds/${this.key}/data?x-aio-key=${APIKey}`, {
                "value": strength
        })
        this.strength = strength
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoose.model('Fan',FanSchema);