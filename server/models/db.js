const mongoose = require('mongoose');
const mqtt = require('mqtt');

const User = require('../models/UserModel');

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log('err', err);
    });

/*const connectBrokers = async () => {
    let brokers = []
    const users = await User.find({ })
    users.forEach((user) => {
        brokers = [...brokers, {io_username: user.io_username, broker: mqtt.connect(`mqtts://${user.io_username}:${user.io_key}@io.adafruit.com:8883`)}]
    })
    const client = mqtt.connect("mqtts://NhanHuynh:aio_hIUx48oBVOP2TsNLn07BbAc9mQAa@io.adafruit.com:8883")
        client
        .on('connect', () =>{
        })
        .subscribe(`NhanHuynh/feeds/+`)
        .publish("NhanHuynh/feeds/bbc-led", '4')
        

        .on('message', (topic, message) => {
            console.log(`message: ${message}, topic: ${topic}`); 
        })

    brokers.forEach((item) => {
        const {io_username, broker} = item
            console.log(Object.getOwnPropertyNames(mqtt))
            broker
                .on('connect', () => {
                    console.log('connect')
                })
                .subscribe(`${io_username}/f/+`)
                .on('message', (topic, message) => {
                    console.log(`message: ${message}, topic: ${topic}`)
                })
        }
    )
}

connectBrokers()

exports.module = {connectBrokers}*/
