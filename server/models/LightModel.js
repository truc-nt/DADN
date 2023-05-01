const DeviceSchema = require('./DeviceModel');
const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const axios = require('axios');

const LightSchema = extendSchema(
    DeviceSchema,
    {
        mode: {
            type: String,
            enum: ['Thủ công', 'Tự động'],
            default: 'Thủ công',
        },
        value: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

LightSchema.methods.changeStatus = async function (
    io_username,
    io_key,
    status
) {
    try {
        if (status !== this.status) {
            const data = status && this.value > 0 ? this.value : status ? 4 : 0;
            /*await axios.post(`https://io.adafruit.com/api/v2/${io_username}/feeds/${this.key}/data?x-aio-key=${io_key}`, {
                "value": data
            })*/
            this.status = status;
            this.value = data;
        }
        this.mode = 'Thủ công';
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

LightSchema.methods.changeMode = async function () {
    try {
        this.mode = this.mode == 'Tự động' ? 'Thủ công' : 'Tự động';
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

LightSchema.methods.changeValue = async function (io_username, io_key, value) {
    try {
        await axios.post(
            `https://io.adafruit.com/api/v2/${io_username}/feeds/${this.key}/data?x-aio-key=${io_key}`,
            {
                value: value,
            }
        );
        this.value = value;
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

module.exports = mongoose.model('Light', LightSchema);
