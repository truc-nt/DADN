import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import { Ionicons } from '@expo/vector-icons';
import TextChangeModal from './TextChangeModal';
import TimeArrange from './TimeArrange';
import PercentageBar from './PercentageBar';

const OnOffDeviceDetail = (props) => {

    const navigation = useNavigation();
    
    const ledColor = ["red", "green", "blue", "orange"]

    const itemDetail = {
        'id': props.id,
        'pos': 'Phòng khách',
        'control': false,
        'on': true,  
        'name': "Đèn 1",     
        'value': 40, //chi so manh yeu cua quat
        'color': 1 //chi so mau sac cua den (1:red, 2:green, 3:blue. 4:orange)
    }

    const [name, setName] = useState(itemDetail.name)
    const [pos, setPos] = useState(itemDetail.pos)
    const [control, setControl] = useState(itemDetail.control)
    const [isEnabled, setIsEnabled] = useState(itemDetail.on)
    const [modalName, setModalName] = useState(false)
    const [modalPos, setModalPos] = useState(false) 
    const [lightModal, setLightModal] = useState(false)
    const [fanModal, setFanModal] = useState(false)
    const [fanVal, setFanVal] = useState(itemDetail.value)
    const [lightColor, setLightColor] = useState(itemDetail.color)

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%] items-center">
            <View className="flex top-[58px] left-[5%] absolute">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <View className="flex-row w-[50%] h-[70px] justify-center mb-[5%]">
                <Text numberOfLines={1} style={{fontFamily: "LexendSemiBold"}} className="text-[30px]">{name}</Text>
            </View>
            <View className="h-[77%] w-[100%]">
                <ScrollView>
                    <View className="flex-row w-[100%] h-[65px] bg-semiblue rounded-[20px] items-center px-[5%] mb-[25px]">
                        <View className="flex-row w-[70%] items-center">
                            <Text numberOfLines={1} style={{fontFamily: "LexendSemiBold"}} className="text-[22px] pr-[10px]">{name}</Text>
                            <TouchableOpacity
                                onPress={()=>setModalName(true)}
                            >
                                <Ionicons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Switch
                            trackColor={{false: 'white', true: '#5AC2DA'}}
                            thumbColor={'#F4FAFF'}
                            onValueChange={() => {
                                setControl(1);
                                setIsEnabled(previousState => !previousState);
                                //change on/off of device in server
                                //change control
                            }}
                            value={isEnabled}
                            className="ml-[auto]"
                        />
                    </View>
                    <View className="w-[100%] bg-semiblue rounded-[20px] items-center px-[5%]  mb-[25px]">
                        <View className="flex-row w-[100%] justify-between h-[65px] items-center border-b-[1px]">
                            <Text numberOfLines={1} style={{fontFamily: "LexendMedium"}} className="w-[80%] text-[17px]">Vị trí: {pos}</Text>
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
                                    selectedValue={control}
                                    onValueChange={(itemValue, itemIndex) => setControl(itemValue)}
                                    style={{fontFamily: "LexendBold", fontSize: 17, color: '#5AC2DA'}}
                                >
                                    <Picker.Item label="Tự động" value={false} color={control?"black":"#5AC2DA"}/>
                                    <Picker.Item label="Thủ công" value={true} color={control?"#5AC2DA":"black"}/>
                                </Picker>    
                            </View>                       
                        </View>
                        {props.fan && 
                            <TouchableOpacity 
                                className="flex-row w-[100%] justify-between h-[65px] items-center"
                                onPress={()=>setFanModal(true)}
                            >
                                <Text numberOfLines={1} style={{fontFamily: "LexendMedium"}} className="w-[60%] text-[17px]">{"Tốc độ: " + fanVal + '%'}</Text>
                                <AntDesign name="right" size={24} color="black" />
                            </TouchableOpacity>}
                        {props.light &&
                            <View className="flex-row w-[100%] h-[65px] items-center">
                                <Text numberOfLines={1} style={{fontFamily: "LexendMedium"}} className="text-[17px]">Màu sắc: </Text>
                                <View className="flex-1">
                                    <Picker
                                        selectedValue={lightColor}
                                        onValueChange={(itemValue, itemIndex) => setLightColor(itemValue)}
                                        style={{fontFamily: "LexendBold", fontSize: 17, color: `${ledColor[lightColor-1]}`}}
                                    >
                                        <Picker.Item label="Đỏ" value={1} color="red"/>
                                        <Picker.Item label="Xanh lá" value={2} color="green"/>
                                        <Picker.Item label="Xanh biển" value={3} color="blue"/>
                                        <Picker.Item label="Cam" value={4} color="orange"/>
                                    </Picker>    
                                </View>                       
                            </View>
                        }
                    </View>
                    <TimeArrange light={props.light?true:false} fan={props.fan?true:false} thief={props.thief?true:false} id={props.id}/>
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
                        setText={setPos}
                        text={pos}
                        label="Vị trí thiết bị"
                    />
                    <PercentageBar 
                        visible={fanModal}
                        setModal={setFanModal}
                        id={itemDetail.id}
                        setVal={setFanVal}
                    />
                </ScrollView>
            </View>
            <NavBar />
        </SafeAreaView>
    )
}

export default OnOffDeviceDetail