const Device = require('../models/DeviceModel');

exports.handleGetDevices = async (req, res) => {
    const { _id } = req.user;
    const devices = await Device.find({ userId: _id });
    const ans = {};
    devices.forEach((device) => {
        if (device.type in ans) {
            ans[device.type]['amount'] += 1;
            ans[device.type]['enabled'] |= device.status;
        } else ans[device.type] = { amount: 1, enabled: device.status };
    });
    console.log(ans);
    res.status(202).json(ans);
};

exports.handleAddDevices = async (feedsFromAdafruitServer, userId) => {
    feedsFromAdafruitServer.map(async (feed) => {
        const { id, key, name, last_value } = feed;
        const status = last_value > 0 ? true : false;
        const device = await Device({ key: id, name: name, userId: userId });
        if (
            key.toLowerCase().includes('led') ||
            key.toLowerCase().includes('fan')
        ) {
            device.value = last_value;
            device.status = status;
            device.type = 'light';
            device.mode = 'Thủ công';
            if (key.toLowerCase().includes('fan')) {
                device.type = 'fan';
            }
        } else if (key.toLowerCase().includes('anti')) {
            device.status = false;
            device.type = 'siren';
        }
        await device.save();
    });
};

exports.handleGetAmount = async (req, res) => {
    const { _id } = req.user;
    const { type } = req.params;
    if (type !== 'undefined') {
        const devices = await Device.find({ userId: _id, type: type });
        const status = devices.filter((device) => device.status).length;
        res.json({
            amount: devices.length,
            status: status > 0 ? true : false,
        });
    } else {
        res.send('failed');
    }
};

exports.handleGetAll = async (req, res) => {
    const { _id } = req.user;
    const { type } = req.params;
    //const type = req.params.type[0].toUpperCase() + req.params.type.slice(1)
    let list = await Device.find(
        { userId: _id, type: type },
        { __v: 0, userId: 0 }
    );
    //list = list.map(device => ({...device._doc, type: req.params.type} ))
    res.json(list);
};

exports.handleChangeStatus = async (req, res) => {
    const { _id, io_username, io_key } = req.user;
    const id = req.params.id;
    const updated = await Device.findOne({ _id: id, userId: _id });

    updated.changeStatus(io_username, io_key, !updated.status);
    res.send('successful');
};

exports.handleChangeMode = async (req, res) => {
    const { _id } = req.user;
    const id = req.params.id;
    
    let updated = await Device.findOne({ _id: id, userId: _id });
    updated.changeMode();

    res.send('successful');
};

exports.handleChangeAllStatus = async (req, res) => {
    const { _id, io_username, io_key } = req.user;
    const { type } = req.params;
    const { status } = req.body;
    //const updated = await Device.find({ userId: _id, status: !status })
    const collections = await Device.find({ userId: _id, type: type });
    collections.forEach((collection) => {
        collection.changeStatus(io_username, io_key, status);
    });
    //await Device.updateMany({ userId: _id, status: !status}, { $set: { status: status } })
    res.send('successful');
};

exports.handleChangeValue = async (req, res) => {
    const { _id, io_username, io_key } = req.user;
    const { value } = req.body;
    const id = req.params.id;
    const updated = await Device.findOne({ _id: id, userId: _id });

    updated.changeValue(io_username, io_key, value);
    res.send('successful');
};
