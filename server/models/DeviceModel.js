const mongoose = require('mongoose');
const axios = require('axios');
//const {publishData} = require('../controllers/mqttController')

const DeviceSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            default: 'Vị trí',
        },
        status: {
            type: Boolean,
        },
        mode: {
            type: String,
            enum: ['Thủ công', 'Tự động'],
        },
        value: {
            type: Number,
        },
        type: {
            type: String,
            enum: ['light', 'fan', 'siren'],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

DeviceSchema.methods.changeStatus = async function (
    io_username,
    io_key,
    status
) {
    try {
        if (status !== this.status) {
            if (this.type === 'light' || this.type === 'fan') {
                let value =
                    status && this.value > 0
                        ? this.value
                        : status && this.type === 'light'
                        ? 4
                        : status && this.type === 'fan'
                        ? 100
                        : 0;
                this.mode = 'Thủ công';
                this.value = value;
                this.status = status;
                await this.save();
                await axios.post(
                    `https://io.adafruit.com/api/v2/${io_username}/feeds/${this.key}/data?x-aio-key=${io_key}`,
                    {
                        value: value,
                    }
                );
            } else {
                this.status = status;
                await this.save();
            }
        }
    } catch (err) {
        console.log(err);
    }
};

DeviceSchema.methods.changeValue = async function (io_username, io_key, value) {
    try {
        this.value = value;
        await this.save();
        await axios.post(
            `https://io.adafruit.com/api/v2/${io_username}/feeds/${this.key}/data?x-aio-key=${io_key}`,
            {
                value: value,
            }
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports = mongoose.model('Device', DeviceSchema);
