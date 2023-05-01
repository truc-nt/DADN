import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import { Ionicons } from '@expo/vector-icons';
import TextChangeModal from './TextChangeModal';
import TimeArrange from './TimeArrange';
import PercentageBar from './PercentageBar';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
const OnOffDeviceDetail = (props) => {
    const navigation = useNavigation();
    const axiosPrivate = useAxiosPrivate();

    const updateStatus = async (type, id) => {
        try {
            const res = await axiosPrivate.put(`devices/status/${type}/${id}`);
            console.log(res.data);
        } catch (err) {
            console.log(err.status);
        }
    };

    const changeMode = async (type, id) => {
        try {
            const res = await axiosPrivate.put(`devices/mode/${type}/${id}`);
            console.log(res.data);
        } catch (err) {
            console.log(err.status);
        }
    };

    const changeColor = async (value) => {
        try {
            const res = await axiosPrivate.put(
                `lights/color/${props.detail._id}`,
                {
                    value: value,
                }
            );
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const ledColor = ['red', 'green', 'blue', 'orange'];

    const [name, setName] = useState(props.detail.name);
    const [position, setPosition] = useState(props.detail.position);
    const [mode, setMode] = useState(props.detail.mode);
    const [isEnabled, setIsEnabled] = useState(props.detail.status);
    const [modalName, setModalName] = useState(false);
    const [modalPos, setModalPos] = useState(false);
    const [fanModal, setFanModal] = useState(false);
    const [fanVal, setFanVal] = useState(props.detail.value);
    const [lightColor, setLightColor] = useState(props.detail.value);

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%] items-center">
            <View className="flex-row w-[80%] h-[12%] justify-between items-center self-start">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
                <Text
                    style={{ fontFamily: 'LexendSemiBold' }}
                    className="text-[30px] w-[75%] text-center"
                >
                    {name}
                </Text>
            </View>
            <View className="h-[78%] w-[100%]">
                <ScrollView>
                    <View className="flex-row w-[100%] h-[65px] bg-semiblue rounded-[20px] items-center px-[5%] mb-[25px]">
                        <View className="flex-row w-[70%] items-center">
                            <Text
                                numberOfLines={1}
                                style={{ fontFamily: 'LexendSemiBold' }}
                                className="text-[22px] pr-[10px]"
                            >
                                {name}
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalName(true)}
                            >
                                <Ionicons
                                    name="pencil"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                        <Switch
                            trackColor={{ false: 'white', true: '#5AC2DA' }}
                            thumbColor={'#F4FAFF'}
                            onValueChange={() => {
                                updateStatus(
                                    props.detail.type,
                                    props.detail._id
                                );
                                setMode('Thủ công');
                                setIsEnabled((previousState) => !previousState);
                                //change on/off of device in server
                                //change control
                            }}
                            value={isEnabled}
                            className="ml-[auto]"
                        />
                    </View>
                    <View className="w-[100%] bg-semiblue rounded-[20px] items-center px-[5%]  mb-[25px]">
                        <View className="flex-row w-[100%] justify-between h-[65px] items-center border-b-[1px]">
                            <Text
                                numberOfLines={1}
                                style={{ fontFamily: 'LexendMedium' }}
                                className="w-[80%] text-[17px]"
                            >
                                Vị trí: {position}
                            </Text>
                            <TouchableOpacity onPress={() => setModalPos(true)}>
                                <Ionicons
                                    name="pencil"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row w-[100%] h-[65px] items-center border-b-[1px] ">
                            <Text
                                numberOfLines={1}
                                style={{ fontFamily: 'LexendMedium' }}
                                className="text-[17px]"
                            >
                                Chế độ:{' '}
                            </Text>
                            <View className="flex-1">
                                <Picker
                                    selectedValue={mode}
                                    onValueChange={(itemValue, itemIndex) => {
                                        changeMode(
                                            props.detail.type,
                                            props.detail._id
                                        );
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
                                            mode === 'Tự động'
                                                ? '#5AC2DA'
                                                : 'black'
                                        }
                                    />
                                </Picker>
                            </View>
                        </View>
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
                                    {'Tốc độ: ' + fanVal + '%'}
                                </Text>
                                <AntDesign
                                    name="right"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        )}
                        {props?.detail?.type === 'light' && (
                            <View className="flex-row w-[100%] h-[65px] items-center">
                                <Text
                                    numberOfLines={1}
                                    style={{ fontFamily: 'LexendMedium' }}
                                    className="text-[17px]"
                                >
                                    Màu sắc:{' '}
                                </Text>
                                <View className="flex-1">
                                    <Picker
                                        selectedValue={lightColor}
                                        onValueChange={(
                                            itemValue,
                                            itemIndex
                                        ) => {
                                            changeColor(itemValue);
                                            setLightColor(itemValue);
                                        }}
                                        style={{
                                            fontFamily: 'LexendBold',
                                            fontSize: 17,
                                            color: `${
                                                ledColor[lightColor - 1]
                                            }`,
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
                    </View>
                    <TimeArrange device={props?.detail} id={props.id} />
                    <TextChangeModal
                        visible={modalName}
                        setModal={setModalName}
                        setText={setName}
                        text={name}
                        label="Tên thiết bị"
                    />
                    <TextChangeModal
                        visible={modalPos}
                        setModal={setModalPos}
                        setText={setPosition}
                        text={position}
                        label="Vị trí thiết bị"
                    />
                    <PercentageBar
                        visible={fanModal}
                        setModal={setFanModal}
                        id={props.detail._id}
                        setVal={setFanVal}
                        value={fanVal}
                    />
                </ScrollView>
            </View>
            <NavBar />
        </SafeAreaView>
    );
};

export default OnOffDeviceDetail;
