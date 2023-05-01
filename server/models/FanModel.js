const DeviceSchema = require('./DeviceModel');
const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const axios = require('axios');

const FanSchema = extendSchema(DeviceSchema, {}, { timestamps: true });

FanSchema.methods.changeStatus = async function (io_username, io_key, status) {
    try {
        const data = status && this.value > 0 ? this.value : status ? 100 : 0;
        await axios.post(
            `https://io.adafruit.com/api/v2/${io_username}/feeds/${this.key}/data?x-aio-key=${io_key}`,
            {
                value: data,
            }
        );
        this.status = status;
        this.value = data;
        this.mode = 'Thủ công';
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

FanSchema.methods.changeMode = async function () {
    try {
        this.mode = this.mode == 'Tự động' ? 'Thủ công' : 'Tự động';
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

FanSchema.methods.changeValue = async function (io_username, io_key, value) {
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

module.exports = mongoose.model('Fan', FanSchema);
