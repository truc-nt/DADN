import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DeviceItemsList from './DeviceItemsList';
import NavBar from './NavBar';

const OnOffDeviceDetail = (props) => {

    const navigation = useNavigation();
    
    const itemDetail = {
        'id': props.id,
        'pos': 'Phòng khách',
        'control': false,
        'on': true,  
        'name': "Đèn 1"          
    }

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%] items-center">
            <View className="flex top-[4%] left-[5%] absolute">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <View className="flex-row w-[50%] h-[8%] justify-center mb-[2%]">
                <Text style={{fontFamily: "LexendSemiBold"}} className="text-[30px]">{itemDetail.id}</Text>
            </View>
            
        </SafeAreaView>
    )
}

export default OnOffDeviceDetail