import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const DeviceItem = (props) => {
    const [isEnabled, setIsEnabled] = useState(props.on);
    const [control, setControl] = useState(props.control);
    const navigation = useNavigation();

    return (
        <TouchableOpacity className={`flex mx-[22px] py-[15px] ${props.border?"border-b-[1px]":""} h-[90px]`}
            onPress={() => navigation.navigate(props.light?"LightItemDetail":"FanItemDetail", {id: props.id})}
        >
            <View className="flex-row justify-between items-center">
                <Text style={{fontFamily: "LexendMedium"}} className="text-[20px] leading-[21px]">{props.name}</Text>
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
                />
            </View>
            <View className="flex-row justify-between">
                <Text style={{fontFamily: "LexendRegular"}} className="text-[13px] leading-[21px] text-grey">{props.pos}</Text>
                <Text style={{fontFamily: "LexendRegular"}} className="text-[13px] leading-[21px] text-grey">{control?"Thủ công":"Tự động"}</Text>
            </View>
        </TouchableOpacity>
    )
}

const DeviceItemsList = (props) => {
  return (
    <View className="h-[77%] w-[100%]">
        <ScrollView className="w-[100%] bg-semiblue rounded-[20px] ">
            {props.devicesList.map((device, index) => 
                <DeviceItem 
                    id = {device.id}
                    light = {props.light}
                    pos = {device.pos}
                    control = {device.control}
                    on = {device.on}
                    border = {index == props.devicesList.length-1?false:true}
                    name = {device.name}
                    key = {index}
                />
            )} 
        </ScrollView> 
    </View>
  )
}

export default DeviceItemsList