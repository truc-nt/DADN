const DeviceSchema = require('./DeviceModel')
const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')
const axios = require('axios')

const LightSchema = extendSchema(DeviceSchema, {
        mode: {
            type: String,
            enum: ['Thủ công', 'Tự động'],
            default: 'Thủ công',
        },
        value: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
)

LightSchema.methods.changeStatus = async function(APIKey, status) {
    try {
        if (status !== this.status) {
            const data = status && this.value > 0 ? this.value : status ? 4 : 0
            await axios.post(`https://io.adafruit.com/api/v2/NhanHuynh/feeds/${this.key}/data?x-aio-key=${APIKey}`, {
                "value": data
            })
            this.status = status
            this.value = data
        }
        this.mode = "Thủ công"
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

LightSchema.methods.changeMode = async function() {
    try {
        this.mode = this.mode == "Tự động" ? "Thủ công" : "Tự động"
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

LightSchema.methods.changeColor = async function(APIKey, value) {
    try {
        await axios.post(`https://io.adafruit.com/api/v2/NhanHuynh/feeds/${this.key}/data?x-aio-key=${APIKey}`, {
                "value": value
        })
        this.value = value
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoose.model('Light',LightSchema);