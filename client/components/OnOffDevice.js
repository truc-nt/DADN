import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DeviceItemsList from './DeviceItemsList';
import NavBar from './NavBar';

const OnOffDevice = (props) => {
    const name = {
        light: 'Đèn',
        fan: 'Quạt',
        siren: 'Chống trộm',
    }
    
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%] items-center">
            <View className="flex top-[58px] left-[5%] absolute">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <View className="flex-row w-[50%] h-[8%] justify-center mb-[5%]">
                <Text style={{fontFamily: "LexendSemiBold"}} className="text-[30px]">{name[props?.list[0].type]}</Text>
            </View>
            <DeviceItemsList devicesList={props?.list}/>
            <NavBar />
        </SafeAreaView>
    )
}

export default OnOffDevice