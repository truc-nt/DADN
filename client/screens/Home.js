import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Profile from '../components/Profile';
import Device from '../components/Device';
import NavBar from '../components/NavBar';
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useFocusEffect, useIsFocused} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import useTemp from '../hooks/useTemp'
import useHumid from '../hooks/useHumid'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useGetAmount, useGetDevices } from '../hooks/useDevice'


const Weather = ({humid, temp}) => {
    return (
    <View className="flex-row h-[120px] w-[100%] rounded-[20px] bg-blue items-center justify-between px-[5%]">
        <View className="flex-col">
            <Text style={{fontFamily: 'LexendMedium'}} className={`text-[14px] leading-[21px]`}>Trời nhiều mây</Text>
            <Text style={{fontFamily: 'LexendSemiBold'}} className={`text-[25px]`}>{temp}°C</Text>
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

const DeviceList = ({devices}) => {
    console.log("List", devices)
    return (
        devices.map((device, index) => (
            <Device key={index} props={device}></Device>
        ))
    )
}

export default function Home({navigation}) {
    const temp = useTemp()
    const humid = useHumid()

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    const axiosPrivate = useAxiosPrivate()
    const [devices, setDevices] = useState([
        {
            'icon': "lightbulb-outline", 
            'name': 'Đèn',
            'type': 'light',
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
    ])

    useFocusEffect(
        useCallback(() => {
            let isMounted = true
            const controller = new AbortController()
            const getAmount = async (type) => {
            
                try {
                    const res = await axiosPrivate.get(`devices/${type}/amount`, 
                    {
                        signal: controller.signal,
                    })
                    return res.data
                } catch (err) {
                    console.log(err)
                }
            }

            let temp = [...devices]
            temp.forEach(async (device, index) => {
                const res = await getAmount(device.type)
                //console.log(device.type, res)
                temp[index].amount = res?.amount
                temp[index].enabled = res?.status
            })
            console.log("hellu")
            isMounted && setDevices(temp)
            console.log(isMounted, temp)
            return () => {
                controller.abort()
                isMounted = false
            }
        },[])
    )

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%]">
            <Profile />
            <View className="h-[75%] w-[100%]">
                <ScrollView>
                    <Weather humid = {humid} temp = {temp}></Weather>
                    <View className="h-[50px] justify-center">
                        <Text style = {{fontFamily: "LexendRegular"}} className={`text-[18px] leading-[27px]`}>Các thiết bị kết nối</Text>
                    </View>
                    <View className="flex-row flex-wrap justify-between w-[100%]"> 
                        {
                            devices.map((device, index) => (
                                <Device key={index} props={device}></Device>
                            ))
                        } 
                    </View>
                </ScrollView>
            </View>
            <NavBar home/>
        </SafeAreaView>
    );
}
