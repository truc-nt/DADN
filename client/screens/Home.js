import { Text, View, ScrollView, Image } from 'react-native';
import Profile from '../components/Profile';
import Device from '../components/Device';
import NavBar from '../components/NavBar';
import React, { useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import useTemp from '../hooks/useTemp'
import useHumid from '../hooks/useHumid'
import useGetAmount from '../hooks/useDevice'

const Weather = () => {
    const temp = useTemp()
    const humid = useHumid()
    return (
    <View className="flex-row h-[120px] w-[100%] rounded-[20px] bg-blue items-center justify-between px-[5%]">
        <View className="flex-col">
            <Text style={{fontFamily: 'LexendMedium'}} className={`text-[14px] leading-[21px]`}>Trời nhiều mây</Text>
            <Text style={{fontFamily: 'LexendSemiBold'}} className={`text-[25px]`}>{temp}'C</Text>
            <Text style={{fontFamily: 'LexendRegular'}} className={`text-[12px] leading-[21px]`}>Độ ẩm {humid}%</Text>
        </View>
        <View>
            <Image 
                source={require('../assets/image/SunnyWeather.png')}
                className="w-[90px] h-[80px]"
            />
        </View>
    </View>
    )
}

export default function Home({navigation}) {
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    let devices = [
        {
            'icon': "lightbulb-outline", 
            'name': 'Đèn',
            'type': 'light' 
        },
        {
            'icon': "fan",
            'name': 'Quạt',
            'type': 'fan'
        },
        {
            'icon': "bell-alert-outline",
            'name': 'Chống trộm',
            'type': 'siren'
        },
    ]

    devices.forEach((device, index) => {
        const res = useGetAmount(device.type)
        if (res) {
            devices[index].amount = res.amount
            devices[index].enabled = res.status
        }
    })
  return (
    <SafeAreaView className="flex-1 bg-lightblue relative px-[5%]">
        <Profile />
        <View className="h-[75%] w-[100%]">
            <ScrollView>
                <Weather></Weather>
                <View className="h-[45px] justify-end">
                    <Text style = {{fontFamily: "LexendRegular"}} className={`text-[18px] leading-[27px]`}>Các thiết bị kết nối</Text>
                </View>
                <View className="flex-row flex-wrap justify-between w-[100%]">
                    {
                        devices.map((device, index) => (
                            device?.amount && <Device key={index} props={device}></Device>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
        <NavBar home/>
    </SafeAreaView>
  );
}
