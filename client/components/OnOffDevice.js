import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DeviceItemsList from './DeviceItemsList';
import NavBar from './NavBar';

const OnOffDevice = (props) => {
    lightList = [
        {
            'id': 1,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 1"           
        },
        {
            'id': 2,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 2"           
        },
        {
            'id': 3,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 3"           
        },
        {
            'id': 4,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 4"           
        },
        {
            'id': 5,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 5"           
        },
        {
            'id': 6,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 6"           
        },
        {
            'id': 7,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 7 "           
        },
        {
            'id': 8,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 8"           
        },
        {
            'id': 9,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 9"           
        },
        {
            'id': 10,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 10"            
        },
        {
            'id': 11,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 11"            
        },
        {
            'id': 12,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 12"            
        },
        {
            'id': 13,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 13"            
        },
        {
            'id': 14,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 14"            
        },
        {
            'id': 15,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 15"            
        },
        {
            'id': 16,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 16"            
        },
        {
            'id': 17,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 17"            
        },
        {
            'id': 18,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Đèn 18"            
        },
    ]

    fanList = [
        {
            'id': 1,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 1"            
        },
        {
            'id': 2,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 2"            
        },
        {
            'id': 3,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 3"            
        },
        {
            'id': 4,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 4"            
        },
        {
            'id': 5,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 5"            
        },
        {
            'id': 6,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 6"            
        },
        {
            'id': 7,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 7"            
        },
        {
            'id': 8,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 8"            
        },
        {
            'id': 9,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 9"            
        },
        {
            'id': 10,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 10"            
        },
        {
            'id': 11,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 11"            
        },
        {
            'id': 12,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 12"            
        },
        {
            'id': 13,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 13"            
        },
        {
            'id': 14,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 14"            
        },
        {
            'id': 15,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 15"            
        },
        {
            'id': 16,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 16"            
        },
        {
            'id': 17,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 17"            
        },
        {
            'id': 18,
            'pos': 'Phòng khách',
            'control': false,
            'on': true,
            'name': "Quạt 18"            
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
            <DeviceItemsList devicesList={props.light?lightList:fanList} light={props.light}/>
            <NavBar />
        </SafeAreaView>
    )
}

export default OnOffDevice