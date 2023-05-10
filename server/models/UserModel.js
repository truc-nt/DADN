const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const axios = require('axios');

const Database = require('./db');

const db = new Database();

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: Buffer,
        },
        io_username: {
            type: String,
            required: true,
            unique: true,
        },
        io_key: {
            type: String,
            required: true,
            unique: true,
        },
        refreshToken: [String],
        pushToken: [String],
    },
    { timestamps: true }
);

UserSchema.statics.isValidUsername = async function (username) {
    if (!username) throw new Error();
    try {
        const user = await this.findOne({ username });
        if (user) return false;
        return true;
    } catch (err) {
        console.log('error inside email in use', err.message);
        return false;
    }
    return true;
};

UserSchema.statics.isValidAdafruitServer = async function (
    io_username,
    io_key
) {
    if (!io_key) throw new Error();
    try {
        const result = await axios.get(
            `https://io.adafruit.com/api/v2/${io_username}/feeds?x-aio-key=${io_key}`
        );
        const user = await this.findOne({ io_key });
        if (user) return [];
        return result.data;
    } catch (err) {
        console.log('error inside valid in use', err.message);
        return [];
    }
};

UserSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is empty');
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password', error.message);
    }
};

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

module.exports = db.getModel('User', UserSchema);
