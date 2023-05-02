const Device = require('../models/DeviceModel');
const Timer = require('../models/TimerModel');
const schedule = require('node-schedule');
const User = require('../models/UserModel');

const { Expo } = require('expo-server-sdk');
const expo = new Expo();

const { publishData } = require('../controllers/mqttController');

const timer_map = {};

const scheduleAction = async (user, device, timer) => {
    const taskStart = schedule.scheduleJob(
        {
            hour: timer.from.getHours(),
            minute: timer.from.getMinutes(),
            tz: 'Asia/Ho_Chi_Minh',
        },
        () => {
            if (timer.mode === 'Bật') {
                publishData(user._id, device.key, timer.value);
            }

            let messages = [];
            user.pushToken.forEach((token) =>
                messages.push({
                    to: token,
                    sound: 'default',
                    title: 'Thiết bị được bật',
                    body: 'Thiết bị đã được bật thành công',
                    priority: "high",
                })
            );
            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            (async () => {
                for (let chunk of chunks) {
                    let ticketChunk = await expo.sendPushNotificationsAsync(
                        chunk
                    );
                    tickets.push(...ticketChunk);
                }
            })();
            console.log(tickets)
        }
    );
    timer_map[`${timer._id}from`] = taskStart;
    const taskEnd = schedule.scheduleJob(
        {
            hour: timer.to.getHours(),
            minute: timer.to.getMinutes(),
            tz: 'Asia/Ho_Chi_Minh',
        },
        () => {
            if (timer.mode === 'Bật') {
                publishData(user._id, device.key, 0);
            }

            let messages = [];
            user.pushToken.forEach((token) =>
                messages.push({
                    to: token,
                    sound: 'default',
                    title: 'Thiết bị được tắt',
                    body: 'Thiết bị đã được tắt thành công',
                    priority: "high",
                })
            );
            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            (async () => {
                for (let chunk of chunks) {
                    let ticketChunk = await expo.sendPushNotificationsAsync(
                        chunk
                    );
                    tickets.push(...ticketChunk);
                }
            })();
            let receiptIds = [];
for (let ticket of tickets) {
  // NOTE: Not all tickets have IDs; for example, tickets for notifications
  // that could not be enqueued will have error information and no receipt ID.
  if (ticket.id) {
    receiptIds.push(ticket.id);
  }
}

let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
(async () => {
  // Like sending notifications, there are different strategies you could use
  // to retrieve batches of receipts from the Expo service.
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log(receipts);

      // The receipts specify whether Apple or Google successfully received the
      // notification and information about an error, if one occurred.
      for (let receiptId in receipts) {
        let { status, message, details } = receipts[receiptId];
        if (status === 'ok') {
          continue;
        } else if (status === 'error') {
          console.error(
            `There was an error sending a notification: ${message}`
          );
          if (details && details.error) {
            // The error codes are listed in the Expo documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            // You must handle the errors appropriately.
            console.error(`The error code is ${details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
})();
        }
    );
    timer_map[`${timer._id}from`] = taskStart;
    timer_map[`${timer._id}to`] = taskEnd;
};

exports.scheduleActions = async () => {
    const timers = await Timer.find({});
    timers.forEach(async (timer) => {
        if (timer.status) {
            const device = await Device.findOne({ _id: timer.deviceId });
            const user = await User.findOne({ _id: device.userId });
            scheduleAction(user, device, timer);
        }
    });
};

exports.handleGetTimers = async (req, res) => {
    const id = req.params.deviceId;
    const timers = await Timer.find({ deviceId: id }, { __v: 0, deviceId: 0 });
    res.send(timers);
};

exports.handleAddTimer = async (req, res) => {
    const id = req.params.deviceId;
    const { from, to } = req.body;
    if (req.body.mode) {
        try {
            const device = await Device.findOne({ _id: id });
            const timer = await Timer({
                from: from,
                to: to,
                mode: req.body.mode,
                deviceId: id,
            });
            timer.value = req.body.value ? req.body.value : 100;
            timer.save();
            await scheduleAction(req.user, device, timer);
            return res.status(202).json({ id: timer._id });
        } catch (err) {
            console.log('err');
        }
    }
    res.status(202).json('successfully');
};

exports.handleChangeTimerStatus = async (req, res) => {
    const id = req.params.timerId;
    console.log(id);
    try {
        const timer = await Timer.findOne({ _id: id });
        if (timer.status) {
            timer_map[`${timer._id}from`].cancel();
            timer_map[`${timer._id}to`].cancel();
        } else {
            //reschedule lai
        }
        timer.status = !timer.status;
        timer.save();
    } catch (err) {
        console.log(err);
    }
    res.send('successful');
};
