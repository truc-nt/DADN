import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DevicesList from './DevicesList';
import NavBar from './NavBar';

const OnOffDevice = (props) => {
    lightList = [
        {
            'id': 1,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 2,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 3,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 4,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 5,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 6,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 7,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 8,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 9,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 10,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 11,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 12,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 13,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 14,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 15,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 16,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 17,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 18,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
    ]

    fanList = [
        {
            'id': 1,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 2,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 3,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 4,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 5,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 6,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 7,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 8,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 9,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 10,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 11,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 12,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 13,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 14,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 15,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 16,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 17,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
        {
            'id': 18,
            'pos': 'Phòng khách',
            'control': false,
            'on': true            
        },
    ]

    const navigation = useNavigation();
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
                <Text style={{fontFamily: "LexendSemiBold"}} className="text-[30px]">{props.light?"Đèn":"Quạt"}</Text>
            </View>
            <DevicesList devicesList={props.light?lightList:fanList} light={props.light}/>
            <NavBar />
        </SafeAreaView>
    )
}

export default OnOffDevice