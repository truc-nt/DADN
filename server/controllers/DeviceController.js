const Light = require('../models/LightModel')
const Fan = require('../models/FanModel')
const Siren = require('../models/SirenModel')

const devices = ["Light", "Fan", "Siren"]

exports.handleAddDevices = async (feedsFromAPIKey, userId) => {
    feedsFromAPIKey.map(async (feed) => {
        const {key, name, last_value}  = feed
        const status = last_value > 0 ? true : false
        if (key.toLowerCase().includes("led")) {
            const light = await Light({key: key, name: name, value: last_value, status: status, userId: userId})
            await light.save()
        } else if (key.toLowerCase().includes("fan")) {
            const fan = await Fan({key: key, name: name, strength: last_value, status: status, userId: userId})
            await fan.save()
        } else if (key.toLowerCase().includes("anti")) {
            const siren = await Siren({key: key, name: name, status: false, userId: userId})
            await siren.save()
        }
    })
}

exports.handleGetAmount = async (req, res) => {
    const {_id} = req.user
    const type = req.params.type[0].toUpperCase() + req.params.type.slice(1)
    if (type !== 'Undefined') {
    let Device = require(`../models/${type}Model`)
    const devices = await Device.find({userId : _id})
    const status = devices.filter(device => device.status).length
    console.log('okei')
    res.json({
        amount: devices.length,
        status: status > 0 ? true : false   
    })
    } else {
        res.send('failed')
    }
}

exports.handleGetAll = async (req, res) => {
    const {_id} = req.user
    const type = req.params.type[0].toUpperCase() + req.params.type.slice(1)
    let Device = require(`../models/${type}Model`)
    let list = await Device.find({userId : _id}, {__v: 0, userId: 0})
    list = list.map(device => ({...device._doc, type: req.params.type} ))
    
    res.json({
        list: list,
        type: req.params.type,
    })
}

exports.handleChangeStatus = async (req, res) => {
    const {_id, APIKey} = req.user
    const id = req.params.id
    const type = req.params.type[0].toUpperCase() + req.params.type.slice(1)
    let Device = require(`../models/${type}Model`)
    const updated = await Device.findOne({_id: id, userId: _id})

    updated.changeStatus(APIKey, !updated.status)
    res.send('successful')
}

exports.handleChangeMode = async (req, res) => {
    const {_id} = req.user
    const id = req.params.id
    const type = req.params.type[0].toUpperCase() + req.params.type.slice(1)
    let Device = require(`../models/${type}Model`)
    const updated = await Device.findOneAndUpdate({_id: id, userId: _id})

    updated.changeMode()
    res.send('successful')
}

exports.handleChangeAllStatus = async (req, res) => {
    const {_id, APIKey} = req.user
    const type = req.params.type[0].toUpperCase() + req.params.type.slice(1)
    const {status} = req.body
    let Device = require(`../models/${type}Model`)
    //const updated = await Device.find({ userId: _id, status: !status })
    const updated = await Device.find({userId: _id})
    updated.forEach(collection => {
        collection.changeStatus(APIKey, status)
    })
    //await Device.updateMany({ userId: _id, status: !status}, { $set: { status: status } })
    res.send('successful')
}
