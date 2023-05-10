const mongoose = require('mongoose');

const Database = require('./db');

const db = new Database();

const TimerSchema = new mongoose.Schema(
    {
        from: {
            type: Date,
            required: true,
        },
        to: {
            type: Date,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        value: {
            type: Number,
        },
        mode: {
            type: String,
            enum: ['Thủ công', 'Tự động'],
        },
        value: {
            type: Number,
        },
        deviceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Device',
        },
        type: {
            type: String,
            enum: ['light', 'fan', 'siren'],
        },
    },
    { timestamps: true }
);

//module.exports = mongoose.model('Timer', TimerSchema);
module.exports = db.getModel('Timer', TimerSchema);
