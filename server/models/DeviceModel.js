const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
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
            default: 'Vị trí'
        },
        status: {
            type: Boolean,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = DeviceSchema

