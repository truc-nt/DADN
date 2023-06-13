const mongoose = require('mongoose');
const axios = require('axios');

const Database = require('./db');

const db = new Database();

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
                let value = status ? this.value : 0;
                this.mode = 'Thủ công';
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
                if (!status) this.value = 0
                await this.save();
            }
        }
    } catch (err) {
        console.log(err);
    }
};

DeviceSchema.methods.changeValue = async function (io_username, io_key, value) {
    try {
        if (this.type === 'light' && value > 4) value = 4;
        else if (this.type === 'fan') {
            if (value < 0) value = 0;
            else if (value > 100) value = 100;
        }
        this.value = value;
        if (this.mode === 'Thủ công') {
            if (!this.status) this.status = true;
            await axios.post(
                `https://io.adafruit.com/api/v2/${io_username}/feeds/${this.key}/data?x-aio-key=${io_key}`,
                {
                    value: value,
                }
            );
        }
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

DeviceSchema.methods.changeMode = async function () {
    try {
        if (this.mode == 'Thủ công') this.mode = 'Tự động';
        else this.mode = 'Thủ công';
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

module.exports = db.getModel('Device', DeviceSchema);
