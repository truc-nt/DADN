import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import TextChangeModal from '../components/TextChangeModal';
import DeviceInfo from '../components/DeviceInfo';
import TimeArrange from '../components/TimeArrange';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const DeviceDetail = ({ route, navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    //const { detail } = route.params;
    const [detail, setDetail] = useState(route.params.detail)
    //const [name, setName] = useState(detail.name);
    //const [status, setStatus] = useState(detail.status);
    const [modalName, setModalName] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const updateStatus = async (id) => {
        try {
            const res = await axiosPrivate.put(`devices/status/${id}`);
            console.log(res.data);
            //setStatus((previousState) => !previousState);

            setDetail({...detail, status: !detail.status})
            //item.status = !isEnabled
            //setIsEnabled(!isEnabled)
            
            if (detail.mode == "Tự động") setDetail({...detail, mode: "Thủ công"})
        } catch (err) {
            console.log(err.status);
        }
    };


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
                    {detail.name}
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
                                {detail.name}
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
                            onValueChange={() => {updateStatus(detail._id)}}
                            value={detail.status}
                            className="ml-[auto]"
                        />
                    </View>
                    <DeviceInfo detail={detail} setDetail={setDetail}></DeviceInfo>
                    <TimeArrange device={detail} id={detail._id} />
                    <TextChangeModal
                        visible={modalName}
                        setModal={setModalName}
                        //setText={setName}
                        setText={setDetail}
                        text={detail.name}
                        label="Tên thiết bị"
                        resource="name"
                        deviceId={detail._id}
                        detail={detail}
                    />
                </ScrollView>
            </View>
            <NavBar />
        </SafeAreaView>
    );
};

export default DeviceDetail;
