import React, { useState, useEffect } from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect} from '@react-navigation/native';

import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function Device({props}) {    
    const [device, setIsEnabled] = useState(props)
    const navigation = useNavigation()
    const axiosPrivate = useAxiosPrivate()

    console.log("colen", props, device)
    const updateStatusAll = async (type, status) => {        
        try {
            await axiosPrivate.put(`devices/${type}/status`, 
                {
                    status: status,
                }, 
            )
        } catch (err) {
            console.log(err)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            setIsEnabled(props)
        },[])
    )
    
    return (
        <TouchableOpacity className={`rounded-[20px] ${device.enabled?"bg-blue":"bg-white"} px-[4%] py-[4%] w-[45%] my-[3%]`}
            onPress={() => navigation.navigate(`${props.type[0].toUpperCase() + props.type.slice(1)}`)}
        >
            <MaterialCommunityIcons name={props.icon} size={30} color={`${device.enabled ? "white" : "black"}`} />
            <View className="mt-[20%]">
                <Text style = {{fontFamily: "LexendSemiBold"}} className={`text-[17px] leading-[21px] ${device.enabled ? "text-white" : "text-black"}`}>{props.name}</Text>
                <Text style ={{fontFamily: "LexendRegular"}} className={`text-[13px] leading-[21px] ${device.enabled ? "text-white" : "text-black"}`}>{props.amount} thiết bị</Text>
            </View>
            <View className="flex-row justify-between mt-[6%]">
                <Text style ={{fontFamily: "LexendMedium"}} className={`text-[17px] leading-[21px] self-center ${device.enabled ? "text-white" : "text-grey"}`}>{device.enabled ? "On" : "Off"}</Text>
                <Switch
                    trackColor={{false: '#DAE9F6', true: 'black'}}
                    thumbColor={'#F4FAFF'}
                    onValueChange={() => {
                        updateStatusAll(props.type, !device.enabled)
                        setIsEnabled({...device, "enabled": !device.enabled})
                    }}
                    value={device.enabled}
                />
            </View>
        </TouchableOpacity>
    );
}
