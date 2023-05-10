const Device = require('../models/DeviceModel');
const Timer = require('../models/TimerModel');
const schedule = require('node-schedule');
const User = require('../models/UserModel');

const { publishData } = require('./mqttController');
const { pushNotification } = require('./notiController');

//const soundFile = fs.readFileSync(path.join(path.dirname(__dirname), 'assets/sounds/Tornado_Siren_II-Delilah-747233690.mp3'), { encoding: 'base64' }).toString('base64');

const timer_map = {};

const ledColor = ['đỏ', 'xanh lá', 'xanh dương', 'cam'];

const scheduleAction = async (user, device, timer) => {
    for (let time of [
        [timer.from, 'from'],
        [timer.to, 'to'],
    ]) {
        const task = schedule.scheduleJob(
            {
                hour: time[0].getHours(),
                minute: time[0].getMinutes(),
                tz: 'Asia/Ho_Chi_Minh',
            },
            async () => {
                let body = '';
                console.log('hi', timer, timer?.mode === 'Thủ công');
                if (timer?.mode === 'Thủ công') {
                    if (device.type !== 'siren') device.mode = 'Thủ công';
                    if (time[1] === 'from') {
                        publishData(user._id, device.key, timer.value);
                        if (device.type === 'light')
                            body = `Thiết bị ${device.name} đã đổi thành màu ${
                                ledColor[timer.value - 1]
                            }`;
                        else
                            body = `Thiết bị ${device.name} đã đổi thành tốc độ ${timer.value}`;
                    } else {
                        publishData(user._id, device.key, 0);
                        body = `Thiết bị ${device.name} đã tắt`;
                    }
                } else {
                    if (device.type !== 'siren') device.mode = 'Tự động';
                    if (time[1] === 'from') {
                        body = `Thiết bị ${device.name} bật tính năng tự động`;
                        if (device.type !== 'siren') device.value = timer.value;
                        else {
                            device.value = 0;
                            device.status = true;
                        }
                    } else {
                        body = `Thiết bị ${device.name} tắt tính năng tự động`;
                        if (device.type !== 'siren') device.value = 0;
                        else {
                            device.value = 0;
                            device.status = false;
                        }
                    }
                }
                pushNotification(user, 'Hẹn giờ', body);
                await device.save();
            }
        );
        timer_map[`${timer._id}${time[1]}`] = task;
    }
};

const scheduleActions = async () => {
    const timers = await Timer.find({});
    timers.forEach(async (timer) => {
        if (timer.status) {
            const device = await Device.findOne({ _id: timer.deviceId });
            const user = await User.findOne({ _id: device.userId });
            scheduleAction(user, device, timer);
        }
    });
};

const handleGetTimers = async (req, res) => {
    const id = req.params.deviceId;
    const timers = await Timer.find({ deviceId: id }, { __v: 0, deviceId: 0 });
    res.status(202).json(timers);
};

const handleAddTimer = async (req, res) => {
    const id = req.params.deviceId;
    const { from, to } = req.body;
    const device = await Device.findOne({ _id: id });
    let timer = '';
    try {
        if (req?.body?.mode) {
            timer = await Timer({
                from: from,
                to: to,
                mode: req.body.mode,
                deviceId: id,
                type: device.type,
            });
            timer.value = req.body.value ? req.body.value : 100;
        } else {
            timer = await Timer({
                from: from,
                to: to,
                deviceId: id,
            });
        }
        timer.save();
        await scheduleAction(req.user, device, timer);
    } catch (err) {
        console.log('err');
    }
    res.status(202).json({ id: timer._id });
};

const handleDeleteTimer = async (req, res) => {
    const id = req.params.timerId;
    const timer = await Timer.findByIdAndDelete(id);
    console.log(timer);
    if (`${timer._id}from` in timer_map) {
        timer_map[`${timer._id}from`].cancel();
        timer_map[`${timer._id}to`].cancel();
        delete timer_map[`${timer._id}from`];
        delete timer_map[`${timer._id}to`];
    }
    res.status(202).json('successfully');
};

const handleChangeTimerStatus = async (req, res) => {
    const id = req.params.timerId;
    console.log(id);
    try {
        const timer = await Timer.findOne({ _id: id });
        if (timer.status) {
            timer_map[`${timer._id}from`].cancel();
            timer_map[`${timer._id}to`].cancel();
        } else {
            const device = await Device.findOne({ _id: timer.deviceId });
            const user = await User.findOne({ _id: device.userId });
            scheduleAction(user, device, timer);
            //reschedule lai
        }
        timer.status = !timer.status;
        timer.save();
    } catch (err) {
        console.log(err);
    }
    res.status(202).json('successful');
};

module.exports = {
    scheduleActions,
    handleGetTimers,
    handleAddTimer,
    handleDeleteTimer,
    handleChangeTimerStatus,
};
