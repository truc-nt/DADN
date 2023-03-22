import { Text, View, ScrollView, Image } from 'react-native';
import Profile from '../components/Profile';
import Device from '../components/Device';
import NavBar from '../components/NavBar';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Weather = () => (
    <View className="flex-row h-[130px] w-[100%] rounded-[20px] bg-blue items-center justify-between px-[5%] my-[10px]">
        <View className="flex-col">
            <Text style={{fontFamily: 'LexendMedium'}} className={`text-[14px]`}>Trời nhiều mây</Text>
            <Text style={{fontFamily: 'LexendSemiBold'}} className={`text-[25px]`}>31°C</Text>
            <Text style={{fontFamily: 'LexendRegular'}} className={`text-[12px]`}>Độ ẩm 52%</Text>
        </View>
        <View>
            <Image 
                source={require('../assets/image/SunnyWeather.png')}
                className="w-[90px] h-[80px]"
            />
        </View>
    </View>
)

export default function Home({navigation}) {
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    const devices = [
        {
            'icon': "lightbulb-outline", 
            'name': 'Đèn',
            'amount': "8",
            'enabled': true,
            'type': 'light' 
        },
        {
            'icon': "fan",
            'name': 'Quạt',
            'amount': "7",
            'enabled': false,
            'type': 'fan'
        },
        {
            'icon': "bell-alert-outline",
            'name': 'Chống trộm',
            'amount': "1",
            'enabled': false,
        },
    ]
  return (
    <SafeAreaView className="flex-1 bg-lightblue relative px-[5%]">
        <Profile navigation={navigation} />
        <View className="h-[75%] w-[100%]">
            <ScrollView>
                <Weather></Weather>
                <View className="h-[50px] justify-center">
                    <Text style = {{fontFamily: "LexendRegular"}} className={`text-[18px] leading-[27px]`}>Các thiết bị kết nối:</Text>
                </View>
                <View className="flex-row flex-wrap justify-between w-[100%]">
                    {
                        devices.map((device, index) =>
                            <Device key={index} props={device}></Device>
                        )
                    }
                </View>
            </ScrollView>
        </View>
        <NavBar home/>
    </SafeAreaView>
  );
}