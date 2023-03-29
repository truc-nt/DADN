const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const axios = require('axios')

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: Buffer,
        },
        APIKey: {
            type: String,
            required: true,
            unique: true
        },
        refreshToken: [String],
    },
    { timestamps: true }
);

UserSchema.statics.isValidUsername = async function(username) {
    if (!username) throw new Error()
    try {
        const user = await this.findOne({username})
        if (user) return false
        return true
    } catch (err) {
        console.log('error inside email in use', err.message)
        return false
    }
}

UserSchema.statics.isValidAPIKey = async function(APIKey) {
    if (!APIKey) throw new Error()
    try {
        const result = await axios.get(`https://io.adafruit.com/api/v2/NhanHuynh/feeds?x-aio-key=${APIKey}`)
        const user = await this.findOne({APIKey})
        if (user) return []
        return result.data
    } catch (err) {
        console.log('error inside apikey in use', err.message)
        return []
    }
}

UserSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is empty')
    try {
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (error) {
        console.log('Error while comparing password', error.message)
    }
}

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)   
    }
    next()
})

module.exports = mongoose.model('User',UserSchema);
