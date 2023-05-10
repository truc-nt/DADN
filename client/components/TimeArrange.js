import {
    Alert,
    View,
    Text,
    Switch,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useGetTimers from '../hooks/useTimer';
import { Ionicons } from '@expo/vector-icons';

import PercentageBar from './PercentageBar';

const formatTime = (date) => {
    date = new Date(date);
    return `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
        date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`;
};

const sortTime = (timers) => {
    if (!timers) return [];
    return timers.sort((a, b) => {
        const aDate = new Date(a.from);
        const bDate = new Date(b.from);
        const aTime = aDate.getHours() * 60 + aDate.getMinutes();
        const bTime = bDate.getHours() * 60 + bDate.getMinutes();
        if (aTime < bTime) {
            return -1;
        } else if (aTime > bTime) {
            return 1;
        } else {
            return 0;
        }
    });
};

const TimePick = (props) => {
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [fromPick, setFromPick] = useState(false);
    const [toPick, setToPick] = useState(false);
    const [mode, setMode] = useState('Thủ công');
    const [value, setValue] = useState(props.device.type === 'light' ? 1 : 100);
    const [fanModal, setFanModal] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const checkValidTimeRange = () => {
        if (from.getTime() < to.getTime()) return true;
        else return false;
    };

    const addTimer = async () => {
        props.setOpen(false);
        let res = '';
        if (checkValidTimeRange()) {
            try {
                if (
                    props.device.type === 'light' ||
                    props.device.type === 'fan'
                )
                    res = await axiosPrivate.post(
                        `timers/${props.device._id}`,
                        JSON.stringify({ from, to, mode, value })
                    );
                else {
                    res = await axiosPrivate.post(
                        `timers/${props.device._id}`,
                        JSON.stringify({ from, to })
                    );
                }
                const newTimer = res.data;
                props.setTimers(
                    sortTime([
                        ...props.timers,
                        {
                            _id: newTimer['id'],
                            from: from,
                            to: to,
                            status: true,
                            value: value,
                            mode: mode,
                            type: props.device.type,
                        },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        } else {
            Alert.alert('Error', 'Hãy chọn khoảng thời gian phù hợp');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.setOpen(false)}
            onBackdropPress={() => props.setOpen(false)}
        >
            <View className="flex-1 p-[5%] bg-black/[.5] justify-center">
                <View className="p-[5%] bg-white">
                    <Text
                        style={{ fontFamily: 'LexendMedium' }}
                        className="text-[17px] mb-[10px]"
                    >
                        Chọn giờ
                    </Text>
                    <View className="flex-row items-center w-[100%]">
                        <Text
                            style={{ fontFamily: 'LexendRegular' }}
                            className="text-[19px] text-blue w-[50%]"
                        >
                            Từ:
                        </Text>
                        <Text
                            style={{ fontFamily: 'LexendRegular' }}
                            className="text-[19px] text-blue w-[50%]"
                        >
                            Đến:
                        </Text>
                    </View>
                    <View className="flex-row w-[100%]">
                        <View className="w-[50%]">
                            <TouchableOpacity
                                onPress={() => setFromPick(true)}
                                className=" h-[30px] justify-center"
                            >
                                <Text
                                    style={{ fontFamily: 'LexendRegular' }}
                                    className="text-[19px]"
                                >
                                    {(from.getHours() < 10 ? '0' : '') +
                                        from.getHours() +
                                        ':' +
                                        (from.getMinutes() < 10 ? '0' : '') +
                                        from.getMinutes()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="w-[50%]">
                            <TouchableOpacity
                                onPress={() => setToPick(true)}
                                className=" h-[30px] justify-center"
                            >
                                <Text
                                    style={{ fontFamily: 'LexendRegular' }}
                                    className="text-[19px]"
                                >
                                    {(to.getHours() < 10 ? '0' : '') +
                                        to.getHours() +
                                        ':' +
                                        (to.getMinutes() < 10 ? '0' : '') +
                                        to.getMinutes()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {(props.device.type === 'light' ||
                        props.device.type === 'fan') && (
                        <>
                            <View className="flex-row items-center w-[100%]">
                                <Text
                                    style={{ fontFamily: 'LexendRegular' }}
                                    className="text-[19px] text-blue w-[50%]"
                                >
                                    Chế độ:
                                </Text>
                                <View className="text-[19px] text-blue w-[50%]">
                                    <Picker
                                        selectedValue={mode}
                                        onValueChange={(itemValue) =>
                                            setMode(itemValue)
                                        }
                                        className="text-[19px] text-blue"
                                        style={{
                                            fontFamily: 'LexendRegular',
                                            marginLeft: -16,
                                            color: 'black',
                                        }}
                                    >
                                        <Picker.Item
                                            label="Thủ công"
                                            value={'Thủ công'}
                                            color={
                                                mode === 'Thủ công'
                                                    ? '#5AC2DA'
                                                    : 'black'
                                            }
                                        />
                                        <Picker.Item
                                            label="Tự động"
                                            value={'Tự động'}
                                        />
                                    </Picker>
                                </View>
                            </View>
                            {props.device.type === 'light' && (
                                <View className="flex-row items-center w-[100%]">
                                    <Text
                                        style={{ fontFamily: 'LexendRegular' }}
                                        className="text-[19px] text-blue w-[50%]"
                                    >
                                        Màu sắc
                                    </Text>
                                    <View className="flex-1">
                                        <Picker
                                            selectedValue={value}
                                            onValueChange={(itemValue) =>
                                                setValue(itemValue)
                                            }
                                            className="text-[19px] text-blue"
                                            style={{
                                                fontFamily: 'LexendRegular',
                                                marginLeft: -16,
                                                color: 'black',
                                            }}
                                        >
                                            <Picker.Item
                                                label="Đỏ"
                                                value={1}
                                                color="red"
                                            />
                                            <Picker.Item
                                                label="Xanh lá"
                                                value={2}
                                                color="green"
                                            />
                                            <Picker.Item
                                                label="Xanh biển"
                                                value={3}
                                                color="blue"
                                            />
                                            <Picker.Item
                                                label="Cam"
                                                value={4}
                                                color="orange"
                                            />
                                        </Picker>
                                    </View>
                                </View>
                            )}
                            {props?.device?.type === 'fan' && (
                                <View className="flex-row items-center w-[100%]">
                                    <Text
                                        style={{ fontFamily: 'LexendRegular' }}
                                        className="text-[19px] text-blue w-[50%]"
                                    >
                                        Tốc độ
                                    </Text>
                                    <View className="flex-1">
                                        <TouchableOpacity
                                            className="flex-row w-[100%] justify-between h-[65px] items-center"
                                            onPress={() => setFanModal(true)}
                                        >
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    fontFamily: 'LexendRegular',
                                                }}
                                                className="w-[60%] text-[17px]"
                                            >
                                                {value + '%'}
                                            </Text>
                                            <AntDesign
                                                name="right"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </>
                    )}
                    <TouchableOpacity className="items-center mt-[20px] ml-[auto]">
                        <Text
                            style={{ fontFamily: 'LexendSemiBold' }}
                            className="text-[20px] text-blue"
                            onPress={() => addTimer()}
                        >
                            Lưu
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {fromPick && (
                <DateTimePicker
                    testID="from"
                    value={from}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(e, selectedDate) => {
                        setFrom(selectedDate);
                        setFromPick(false);
                    }}
                />
            )}
            {toPick && (
                <DateTimePicker
                    testID="to"
                    value={to}
                    mode="time"
                    is24Hour={true}
                    onChange={(e, selectedDate) => {
                        setTo(selectedDate);
                        setToPick(false);
                    }}
                />
            )}

            <PercentageBar
                visible={fanModal}
                setModal={setFanModal}
                id={props.device._id}
                setValue={setValue}
                detail={{ value: value }}
            />
        </Modal>
    );
};

const TimeArrange = (props) => {
    const [timers, setTimers] = useGetTimers(props.device._id);
    const [timePick, setTimePick] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const ledColor = ['Đỏ', 'Xanh lá', 'Xanh dương', 'Cam'];

    const changeTimerStatus = async (timerId) => {
        try {
            const res = await axiosPrivate.patch(`timers/${timerId}`);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTimer = async (timerId) => {
        console.log(timerId);
        try {
            const res = await axiosPrivate.delete(`timers/${timerId}`);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View className="flex w-[100%] bg-semiblue rounded-[20px] items-center px-[5%] mb-[25px]">
            {timers.map((time, index) => (
                <View
                    key={index}
                    className={
                        'flex-row w-[100%] justify-between items-center border-b-[1px]'
                    }
                >
                    <View className={'w-[10%] justify-between items-start'}>
                        <TouchableOpacity
                            onPress={() => {
                                deleteTimer(time._id);
                                setTimers(
                                    sortTime(
                                        timers.filter(
                                            (item) => item._id !== time._id
                                        )
                                    )
                                );
                            }}
                        >
                            <Ionicons
                                name="trash-bin-sharp"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className={'w-[90%] justify-between items-end'}>
                        <View
                            className={
                                'flex-row w-[100%] justify-between items-center mb-[-7px]'
                            }
                        >
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: `${
                                        time.status
                                            ? 'LexendRegular'
                                            : 'LexendExtraLight'
                                    }`,
                                }}
                                className="text-[17px]"
                            >
                                {formatTime(time.from)} - {formatTime(time.to)}
                            </Text>
                            <Switch
                                trackColor={{ false: 'white', true: '#5AC2DA' }}
                                thumbColor={'#F4FAFF'}
                                onValueChange={() => {
                                    time.status = !time.status;
                                    setTimers(sortTime([...timers]));
                                    changeTimerStatus(time._id);
                                }}
                                value={time.status}
                            />
                        </View>
                        <View
                            className={
                                'flex-row w-[100%] justify-between items-center mb-[10px]'
                            }
                        >
                            <Text className="text-[14px]">{time.mode}</Text>
                            {time.value && (
                                <Text className="text-[14px]">
                                    {time?.type === 'fan'
                                        ? time.value
                                        : ledColor[time.value - 1]}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            ))}
            <View
                className={
                    'flex-row w-[100%] justify-between h-[65px] items-center'
                }
            >
                <Text
                    numberOfLines={1}
                    style={{ fontFamily: 'LexendSemiBold' }}
                    className="text-[17px]"
                >
                    Hẹn giờ
                </Text>
                <TouchableOpacity onPress={() => setTimePick(true)}>
                    <AntDesign name="pluscircle" size={24} color="#5AC2DA" />
                </TouchableOpacity>
            </View>
            {timePick && (
                <TimePick
                    setOpen={setTimePick}
                    setTimers={setTimers}
                    timers={timers}
                    device={props.device}
                />
            )}
        </View>
    );
};

export default TimeArrange;
