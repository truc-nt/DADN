const mqtt = require('mqtt')
const User = require('../models/UserModel')
const Device = require('../models/DeviceModel')

const clients = {}

const connectBroker = async (userId) => {
    const client = clients[userId]
    const devices = await Device.find({userId: userId})
    client.connect
        .on('connect', () => {
            console.log('connect')
            devices.forEach(device => {
                client.connect.subscribe(`${client.io_username}/f/${device.key}`)
            })
        })
                    
        .on('message', async (topic, message) => {
            console.log(`message: ${message}, topic: ${topic}`)
            const key = topic.substring(topic.lastIndexOf('/') + 1)
            const device = await Device.findOne({key: key, userId: userId})
            if (device.value !== parseInt(message)) {
                device.value = parseInt(message)
                await device.save()
            }
        })
}

exports.connectBrokers = async () => {
    try {
        const users = await User.find({ })
        users.forEach((user) => {
            clients[user._id] = {
                io_username: user.io_username, 
                connect: mqtt.connect(`mqtts://${user.io_username}:${user.io_key}@io.adafruit.com:8883`)
            }
            connectBroker(user._id)
        })
    } catch (err) {
        console.log(err)
    }
}

exports.publishData = (userId, deviceKey, data) => {
    const {io_username} = clients[userId]
    clients[userId].connect.publish(`${io_username}/f/${deviceKey}`, String(data))
}

exports.addBroker = (user) => {
    clients[user._id] = {
        io_username: user.io_username, 
        connect: mqtt.connect(`mqtts://${user.io_username}:${user.io_key}@io.adafruit.com:8883`)
    }
    connectBroker(user._id)
}
