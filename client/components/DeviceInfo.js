import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import TextChangeModal from './TextChangeModal';
import TimeArrange from './TimeArrange';
import PercentageBar from './PercentageBar';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { AntDesign } from '@expo/vector-icons';

const DeviceInfo = (props) => {
    const [position, setPosition] = useState(props.detail.position);
    const [modalPosition, setModalPosition] = useState(false);

    const [mode, setMode] = useState(props.detail.mode);
    const [value, setValue] = useState(props.detail.value);
    const [fanModal, setFanModal] = useState(false);

    const ledColor = ['red', 'green', 'blue', 'orange'];
    const changeMode = async () => {
        try {
            const res = await axiosPrivate.put(
                `devices/mode/${props.detail._id}`
            );
            console.log(res.data);
        } catch (err) {
            console.log(err.status);
        }
    };

    const axiosPrivate = useAxiosPrivate();

    const changeColor = async (value) => {
        try {
            const res = await axiosPrivate.put(
                `devices/value/${props.detail._id}`,
                {
                    value: value,
                }
            );
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <View className="w-[100%] bg-semiblue rounded-[20px] items-center px-[5%]  mb-[25px]">
                <View
                    className={`flex-row w-[100%] justify-between h-[65px] items-center ${
                        props?.detail?.type !== 'siren' && 'border-b-[1px]'
                    }`}
                >
                    <Text
                        numberOfLines={1}
                        style={{ fontFamily: 'LexendMedium' }}
                        className="w-[80%] text-[17px]"
                    >
                        Vị trí: {position}
                    </Text>
                    <TouchableOpacity onPress={() => setModalPosition(true)}>
                        <Ionicons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {props?.detail?.type !== 'siren' && (
                    <View className="flex-row w-[100%] h-[65px] items-center border-b-[1px] ">
                        <Text
                            numberOfLines={1}
                            style={{ fontFamily: 'LexendMedium' }}
                            className="text-[17px]"
                        >
                            Chế độ:
                        </Text>
                        <View className="flex-1">
                            <Picker
                                selectedValue={mode}
                                onValueChange={(itemValue) => {
                                    changeMode();
                                    setMode(itemValue);
                                }}
                                style={{
                                    fontFamily: 'LexendBold',
                                    fontSize: 17,
                                    color: '#5AC2DA',
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
                                    color={
                                        mode === 'Tự động' ? '#5AC2DA' : 'black'
                                    }
                                />
                            </Picker>
                        </View>
                    </View>
                )}
                {props?.detail?.type === 'light' && (
                    <View className="flex-row w-[100%] h-[65px] items-center">
                        <Text
                            numberOfLines={1}
                            style={{ fontFamily: 'LexendMedium' }}
                            className="text-[17px]"
                        >
                            Màu sắc:
                        </Text>
                        <View className="flex-1">
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) => {
                                    changeColor(itemValue);
                                    setValue(itemValue);
                                }}
                                style={{
                                    fontFamily: 'LexendBold',
                                    fontSize: 17,
                                    color: `${ledColor[value - 1]}`,
                                }}
                            >
                                <Picker.Item
                                    label="Tắt"
                                    value={0}
                                    color="black"
                                    enabled={false}
                                />
                                <Picker.Item label="Đỏ" value={1} color="red" />
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
                {props?.detail?.type === 'fan' && (
                    <TouchableOpacity
                        className="flex-row w-[100%] justify-between h-[65px] items-center"
                        onPress={() => setFanModal(true)}
                    >
                        <Text
                            numberOfLines={1}
                            style={{ fontFamily: 'LexendMedium' }}
                            className="w-[60%] text-[17px]"
                        >
                            {'Tốc độ: ' + value + '%'}
                        </Text>
                        <AntDesign name="right" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <TextChangeModal
                visible={modalPosition}
                setModal={setModalPosition}
                setText={setPosition}
                text={position}
                label="Vị trí thiết bị"
            />
            <PercentageBar
                visible={fanModal}
                setModal={setFanModal}
                id={props.detail._id}
                setValue={setValue}
                value={value}
            />
        </>
    );
};

export default DeviceInfo;
