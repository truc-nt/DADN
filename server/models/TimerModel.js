const mongoose = require('mongoose');

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
            enum: ['Bật', 'Tự động'],
        },
        value: {
            type: Number,
        },
        deviceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Device',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Timer', TimerSchema);
