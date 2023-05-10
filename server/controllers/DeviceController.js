const Device = require('../models/DeviceModel');

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

const handleGetDevices = async (req, res) => {
    const { _id } = req.user;
    const devices = await Device.find({ userId: _id });
    const ans = {};
    devices.forEach((device) => {
        if (device.type in ans) {
            ans[device.type]['amount'] += 1;
            ans[device.type]['enabled'] |= device.status;
        } else ans[device.type] = { amount: 1, enabled: device.status };
    });
    res.status(202).json(ans);
};

const handleGetDevice = async (req, res) => {
    const { _id } = req.user;
    const id = req.params.id;
    console.log(_id, id)
    //const device = await Device.findOne({ _id: id, userId: _id });
    return res.status(202).json(_id);
};

const handleGetAll = async (req, res) => {
    const { _id } = req.user;
    const { type } = req.params;
    let list = await Device.find(
        { userId: _id, type: type },
        { __v: 0, userId: 0 }
    );
    res.status(202).json(list);
};

const handleChangeStatus = async (req, res) => {
    const { _id, io_username, io_key } = req.user;
    const id = req.params.id;
    const updated = await Device.findOne({ _id: id, userId: _id });
    updated.changeStatus(io_username, io_key, !updated.status);
    res.status(202).json('successful');
};

const handleChangeMode = async (req, res) => {
    const { _id } = req.user;
    const id = req.params.id;

    let updated = await Device.findOne({ _id: id, userId: _id });
    updated.changeMode();
    res.status(202).json('successful');
};

const handleChangeAllStatus = async (req, res) => {
    const { _id, io_username, io_key } = req.user;
    const { type } = req.params;
    const { status } = req.body;
    const collections = await Device.find({ userId: _id, type: type });
    collections.forEach((collection) => {
        collection.changeStatus(io_username, io_key, status);
    });
    res.status(202).json('successful');
};

const handleChangeValue = async (req, res) => {
    const { _id, io_username, io_key } = req.user;
    const { value } = req.body;
    const id = req.params.id;
    const updated = await Device.findOne({ _id: id, userId: _id });

    updated.changeValue(io_username, io_key, value);
    res.status(202).json('successful');
};

const handleChangeName = async (req, res) => {
    const { _id } = req.user;
    const id = req.params.id;
    const { data } = req.body;
    await Device.findOneAndUpdate({ _id: id, userId: _id }, { name: data });
    res.status(200).json('successful');
};

const handleChangePosition = async (req, res) => {
    const { _id } = req.user;
    const id = req.params.id;
    const { data } = req.body;
    await Device.findOneAndUpdate({ _id: id, userId: _id }, { position: data });
    res.status(200).json('successful');
};

module.exports = {
    handleGetDevices,
    handleGetDevice,
    handleGetAll,
    handleChangeStatus,
    handleChangeMode,
    handleChangeAllStatus,
    handleChangeValue,
    handleChangeName,
    handleChangePosition,
};
