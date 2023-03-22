import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import { Ionicons } from '@expo/vector-icons';
import MyModal from './MyModal';
import TimeArrange from './TimeArrange';

import useAxiosPrivate from '../hooks/useAxiosPrivate'
const OnOffDeviceDetail = (props) => {
    const navigation = useNavigation()
    const axiosPrivate = useAxiosPrivate()

    console.log(props)

    const updateStatus = async (type, id) => {
        try {
            const res = await axiosPrivate.put(`devices/status/${type}/${id}`)
            console.log(res.data)
        } catch (err) {
            console.log(err.status)
        }
    }

    const changeMode = async (type, id) => {
        try {
            const res = await axiosPrivate.put(`devices/mode/${type}/${id}`)
            console.log(res.data)
        } catch (err) {
            console.log(err.status)
        }
    }

    const [name, setName] = useState(props.detail.name)
    const [position, setPosition] = useState(props.detail.pos)
    const [mode, setMode] = useState(props.detail.mode)
    const [isEnabled, setIsEnabled] = useState(props.detail.status)
    const [modalName, setModalName] = useState(false)
    const [modalPos, setModalPos] = useState(false) 

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%] items-center">
            <View className="flex top-[4.5%] left-[5%] absolute">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <View className="flex-row w-[50%] h-[8%] justify-center mb-[5%]">
                <Text numberOfLines={1} style={{fontFamily: "LexendSemiBold"}} className="text-[30px]">{name}</Text>
            </View>
            <View className="h-[77%] w-[100%]">
                <ScrollView>
                    <View className="flex-row w-[100%] h-[65px] bg-semiblue rounded-[20px] items-center px-[5%] mb-[25px]">
                        <Text numberOfLines={1} style={{fontFamily: "LexendSemiBold"}} className="max-w-[40%] text-[20px] pr-[2%]">{name}</Text>
                        <TouchableOpacity
                            onPress={()=>setModalName(true)}
                        >
                            <Ionicons name="pencil" size={24} color="black" />
                        </TouchableOpacity>
                        <Switch
                            trackColor={{false: 'white', true: '#5AC2DA'}}
                            thumbColor={'#F4FAFF'}
                            onValueChange={() => {
                                updateStatus(props.detail.type, props.detail._id)
                                setMode("Thủ công");
                                setIsEnabled(previousState => !previousState);
                                //change on/off of device in server
                                //change control
                            }}
                            value={isEnabled}
                            className="ml-[auto]"
                        />
                    </View>
                    <MyModal 
                        visible={modalName}
                        setModal={setModalName}
                        setText={setName}
                        text={name}
                        label="Tên thiết bị"
                    />
                    <MyModal 
                        visible={modalPos}
                        setModal={setModalPos}
                        setText={setPosition}
                        text={position}
                        label="Vị trí thiết bị"
                    />
                    <View className="w-[100%] bg-semiblue rounded-[20px] items-center px-[5%]  mb-[25px]">
                        <View className="flex-row w-[100%] justify-between h-[65px] items-center border-b-[1px]">
                            <Text numberOfLines={1} style={{fontFamily: "LexendMedium"}} className="w-[60%] text-[17px]">Vị trí: {position}</Text>
                            <TouchableOpacity
                                onPress={()=>setModalPos(true)}
                            >
                                <Ionicons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row w-[100%] h-[65px] items-center border-b-[1px] ">
                            <Text numberOfLines={1} style={{fontFamily: "LexendMedium"}} className="text-[17px]">Chế độ: </Text>
                            <View className="flex-1">
                                <Picker
                                    selectedValue={mode}
                                    onValueChange={(itemValue, itemIndex) => {
                                        changeMode(props.detail.type, props.detail._id)
                                        setMode(itemValue)
                                    }}
                                    style={{fontFamily: "LexendBold", fontSize: 17, color: '#5AC2DA'}}
                                >
                                    <Picker.Item label="Thủ công" value={"Thủ công"} color={mode === "Thủ công"?"#5AC2DA":"black"}/>
                                    <Picker.Item label="Tự động" value={"Tự động"} color={mode === "Tự động"?"#5AC2DA":"black"}/>
                                    
                                </Picker>    
                            </View>                       
                        </View>
                        <TouchableOpacity className="flex-row w-[100%] justify-between h-[65px] items-center">
                            <Text numberOfLines={1} style={{fontFamily: "LexendMedium"}} className="w-[60%] text-[17px]">{props?.detail?.type === "light"?"Màu sắc":"Tốc độ"}</Text>
                            <TouchableOpacity
                                onPress={()=>setModalPos(true)}
                            >
                                <AntDesign name="right" size={24} color="black" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <TimeArrange light={props.light?true:false} fan={props.fan?true:false} thief={props.thief?true:false} id={props.id}/>
                </ScrollView>
            </View>
            <NavBar />
        </SafeAreaView>
    )
}

export default OnOffDeviceDetail