import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import TextChangeModal from './TextChangeModal';
import PercentageBar from './PercentageBar';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { AntDesign } from '@expo/vector-icons';

import {useEffect} from 'react'

const DeviceInfo = (props) => {
    const [detail, setDetail] = useState(props.detail);
    const [modalPosition, setModalPosition] = useState(false);
    const [fanModal, setFanModal] = useState(false);

    useEffect(() => {
        setDetail(props.detail)
    }, [props.detail])

    const ledColor = ['red', 'green', 'blue', 'orange'];
    const changeMode = async () => {
        try {
            const res = await axiosPrivate.put(
                `devices/mode/${props.detail._id}`
            );
            console.log(res.data);
            if (detail.mode === 'Thủ công')
                setDetail({ ...detail, mode: 'Tự động' });
            else setDetail({ ...detail, mode: 'Thủ công' });
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
            setDetail({ ...detail, value: value });
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
                        Vị trí: {detail.position}
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
                                selectedValue={detail.mode}
                                onValueChange={() => {
                                    changeMode();
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
                                        detail.mode === 'Thủ công'
                                            ? '#5AC2DA'
                                            : 'black'
                                    }
                                />
                                <Picker.Item
                                    label="Tự động"
                                    value={'Tự động'}
                                    color={
                                        detail.mode === 'Tự động'
                                            ? '#5AC2DA'
                                            : 'black'
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
                                selectedValue={detail.status ? detail.value : 0}
                                onValueChange={(itemValue) => {
                                    changeColor(itemValue);
                                }}
                                style={{
                                    fontFamily: 'LexendBold',
                                    fontSize: 17,
                                    color: `${ledColor[props.value - 1]}`,
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
                            {'Tốc độ: ' + (detail.status ? detail.value : 0) + '%'}
                        </Text>
                        <AntDesign name="right" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <TextChangeModal
                visible={modalPosition}
                setModal={setModalPosition}
                setText={setDetail}
                text={detail.position}
                label="Vị trí thiết bị"
                resource="position"
                deviceId={props.detail._id}
                detail={detail}
            />
            <PercentageBar
                visible={fanModal}
                setModal={setFanModal}
                id={props.detail._id}
                setDetail={setDetail}
                detail={detail}
            />
        </>
    );
};

export default DeviceInfo;
