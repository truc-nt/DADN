const Light = require('../models/LightModel')
const Fan = require('../models/FanModel')
const Siren = require('../models/SirenModel')

const handleAddDevices = async (feedsFromAPIKey, userId) => {
    feedsFromAPIKey.map(async (feed) => {
        const {key, name, last_value}  = feed
        if (key.toLowerCase().includes("led")) {
            const light = await Light({key: key, name: name, value: last_value, userId: userId})
            await light.save()
        } else if (key.toLowerCase().includes("fan")) {
            const fan = await Fan({key: key, name: name, strength: last_value, userId: userId})
            await fan.save()
        } else if (key.toLowerCase().includes("anti")) {
            const siren = await Siren({key: key, name: name, userId: userId})
            await siren.save()
        }
    })
}

module.exports = {handleAddDevices}
