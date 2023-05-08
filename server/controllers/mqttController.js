const mqtt = require('mqtt');
const User = require('../models/UserModel');
const Device = require('../models/DeviceModel');

const clients = {};

const {pushNotification} = require('./notiController')

const connectPublisher = async (userId) => {
    const client = clients[userId];
    const devices = await Device.find({ userId: userId });
    client.connect
        .on('connect', () => {
            console.log('connect');
            devices.forEach((device) => {
                client.connect.subscribe(
                    `${client.io_username}/f/${device.key}`
                );
            });
        })

        .on('message', async (topic, message) => {
            console.log(`message: ${message}, topic: ${topic}`);
            const key = topic.substring(topic.lastIndexOf('/') + 1);
            const device = await Device.findOne({ key: key, userId: userId });
            if (device) {
                if (device.status &&  message.toString() === 'WARNING' && device.value === 0) {
                    device.value = 1
                    const user = await User.findOne({_id: userId})
                    pushNotification(user, 'Cảnh báo', `${device.position} đang có người`);
                    const devices = await Device.find({ userId: userId })
                    devices.forEach(device => {
                        
                        if (device.type !== 'siren' && device.mode === 'Tự động' && !device.status) publishData(userId, device.key, device.value)
                    })
                } else if (device.status && message.toString() === 'NONE' && device.value === 1) {
                    device.value = 0
                    const devices = await Device.find({ userId: userId })
                    devices.forEach(device => {
                        console.log(device.type !== 'siren' && device.mode === 'Tự động')
                        if (device.type !== 'siren' && device.mode === 'Tự động' && device.value !== '0') publishData(userId, device.key, 0)
                    })
                } else if (device.type !== 'siren') {
                    if (parseInt(message) === 0) {
                        device.status = false
                    } else {
                        device.value = parseInt(message);
                        device.status = parseInt(message) > 0 ? true : false
                    }
                }
                await device.save();
            }
        });
};

const connectPublishers = async () => {
    try {
        const users = await User.find({});
        users.forEach((user) => {
            clients[user._id] = {
                io_username: user.io_username,
                connect: mqtt.connect(
                    `mqtts://${user.io_username}:${user.io_key}@io.adafruit.com:8883`
                ),
            };
            connectPublisher(user._id);
        });
    } catch (err) {
        console.log(err);
    }
};

const publishData = (userId, deviceKey, data) => {
    const { io_username } = clients[userId];
    clients[userId].connect.publish(
        `${io_username}/f/${deviceKey}`,
        String(data)
    );
};

const addPublisher = (user) => {
    clients[user._id] = {
        io_username: user.io_username,
        connect: mqtt.connect(
            `mqtts://${user.io_username}:${user.io_key}@io.adafruit.com:8883`
        ),
    };
    connectPublisher(user._id);
};

module.exports = {
    connectPublishers,
    publishData,
    addPublisher,
};
