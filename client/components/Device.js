import React, {useState} from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Device({props}) {
    const [isEnabled, setIsEnabled] = useState(props.enabled);
    const navigation = useNavigation();
    return (
        <TouchableOpacity className={`rounded-[20px] ${isEnabled?"bg-blue":"bg-white"} px-[4%] py-[4%] w-[45%] my-[3%]`}
            onPress={() => navigation.navigate(`${props.type=='light'?"Light":"Fan"}`)}
        >
            <MaterialCommunityIcons name={props.icon} size={30} color={`${isEnabled ? "white" : "black"}`} />
            <View className="mt-[20%]">
                <Text style = {{fontFamily: "LexendSemiBold"}} className={`text-[17px] leading-[21px] ${isEnabled ? "text-white" : "text-black"}`}>{props.name}</Text>
                <Text style ={{fontFamily: "LexendRegular"}} className={`text-[13px] leading-[21px] ${isEnabled ? "text-white" : "text-black"}`}>{props.amount} thiết bị</Text>
            </View>
            <View className="flex-row justify-between mt-[6%]">
                <Text style ={{fontFamily: "LexendMedium"}} className={`text-[17px] leading-[21px] self-center ${isEnabled ? "text-white" : "text-grey"}`}>{isEnabled ? "On" : "Off"}</Text>
                <Switch
                    trackColor={{false: '#DAE9F6', true: 'black'}}
                    thumbColor={'#F4FAFF'}
                    onValueChange={() => {
                        setIsEnabled(previousState => !previousState)
                        //change on/off of device in server
                    }}
                    value={isEnabled}
                />
            </View>
        </TouchableOpacity>
    );
}
