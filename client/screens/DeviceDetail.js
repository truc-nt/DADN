import React, { useLayoutEffect, useState } from 'react';
import OnOffDeviceDetail from '../components/OnOffDeviceDetail';
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
    const { detail } = route.params;
    const [name, setName] = useState(detail.name);
    const [status, setStatus] = useState(detail.status);
    const [modalName, setModalName] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const updateStatus = async (type, id) => {
        console.log(detail.type, detail._id, type, id);
        try {
            const res = await axiosPrivate.put(`devices/status/${id}`);
            console.log(res.data);
        } catch (err) {
            console.log(err.status);
        }
    };

    //return <OnOffDeviceDetail light detail={detail} />;
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
                                updateStatus(detail.type, detail._id);
                                //setMode('Thủ công');
                                setStatus((previousState) => !previousState);
                                //change on/off of device in server
                                //change control
                            }}
                            value={status}
                            className="ml-[auto]"
                        />
                    </View>
                    <DeviceInfo detail={detail}></DeviceInfo>
                    <TimeArrange device={detail} id={detail._id} />
                    <TextChangeModal
                        visible={modalName}
                        setModal={setModalName}
                        setText={setName}
                        text={name}
                        label="Tên thiết bị"
                    />
                </ScrollView>
            </View>
            <NavBar />
        </SafeAreaView>
    );
};

export default DeviceDetail;
