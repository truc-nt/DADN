const Device = require('../models/DeviceModel')
const Timer = require('../models/TimerModel')
const schedule = require('node-schedule')
const User = require('../models/UserModel')

const {publishData} = require('../controllers/mqttController')

const timer_map = {}

const scheduleAction = async(user, device, timer) => {
    const taskStart = schedule.scheduleJob({hour: timer.from.getHours(), minute: timer.from.getMinutes(), tz: 'Asia/Ho_Chi_Minh'}, () => {
        if (timer.mode === "Bật") {
            publishData(user._id, device.key, timer.value)
        }
    })
    timer_map[`${timer._id}from`] = taskStart
    const taskEnd = schedule.scheduleJob({hour: timer.to.getHours(), minute: timer.to.getMinutes(), tz: 'Asia/Ho_Chi_Minh'}, () => {
        if (timer.mode === "Bật") {
            publishData(user._id, device.key, 0)
        }
    })
    timer_map[`${timer._id}from`] = taskStart
    timer_map[`${timer._id}to`] = taskEnd
}

exports.scheduleActions = async () => {
    const timers = await Timer.find({})
    timers.forEach(async (timer) => {
        if (timer.status) {
            const device = await Device.findOne({_id: timer.deviceId})
            const user = await User.findOne({_id: device.userId})
            scheduleAction(user, device, timer)
        }
    })   
}

exports.handleGetTimers = async (req, res) => {
    const id = req.params.deviceId
    const timers = await Timer.find({deviceId: id}, {__v: 0, deviceId: 0})
    res.send(timers)
}

exports.handleAddTimer = async (req, res) => {
    const id = req.params.deviceId
    const {from, to} = req.body
    if (req.body.mode) {
        const device = await Device.findOne({_id: id})
        const timer = await Timer({from: from, to: to, mode: req.body.mode, deviceId: id}) 
        timer.value = req.body.value ? req.body.value : 100
        timer.save()
        await scheduleAction(req.user, device, timer)
    }
    res.send('successful')
}

exports.handleChangeTimerStatus = async (req, res) => {
    const id = req.params.timerId
    const timer = await Timer.findOne({_id: id})
    timer.status = !timer.status
    timer.save()
    res.send('successful')
}