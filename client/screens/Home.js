import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Profile from '../components/Profile';
import Device from '../components/Device';
import NavBar from '../components/NavBar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer,useFocusEffect, useIsFocused} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import useTemp from '../hooks/useTemp'
import useHumid from '../hooks/useHumid'
import {useGetAmount} from '../hooks/useDevice'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Weather = () => {
    const temp = useTemp()
    const humid = useHumid()
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

const DevicesList = ({devices}) => (
    <>
        {console.log(devices)}
        {
            
            devices?.map((device, index) => (
                <Device key={index} props={device}></Device>
            ))
        }
    </>
)

export default function Home({navigation}) {
    const axiosPrivate = useAxiosPrivate()

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

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    devices.forEach((device, index) => {
        const res = useGetAmount(device.type)
        if (res) {
            devices[index].amount = res?.amount
            devices[index].enabled = res?.status
        }
    })

    const getUser = async () => {
        try {
            let user = await AsyncStorage.getItem('user')
            console.log(user)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    /*useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                let temp = devices
                console.log(temp)
                temp = devices.map((device, index) => {
                    const get = async () => {
                        const res = await axiosPrivate.get(`devices/amount/${device.type}`)
                        console.log({...device}, res.data, temp)
                        if (res.data) {
                            const {amount, status} = res.data.amount
                            return {...device, amount: amount, enabled: status}
                        }
                        else return temp

                    }
                    
                })
                setDevices(temp)
                //isMounted && setDevices(temp);
            } catch (err) {
                console.log(err)
            }
        })

        return unsubscribe
    }, [navigation])

    /*useFocusEffect(
        React.useCallback(() => {
            let isMounted = true
            const controller = new AbortController();
        
            const getAmount = async () => {
                try {
                    let temp = devices
                    devices.forEach(async (device, index) => {
                        const res = await axiosPrivate.get(`devices/amount/${device.type}`, 
                        {
                            signal: controller.signal,
                        })
                        if (res.data) {
                            temp[index].amount = res.data.amount
                            temp[index].enabled = res.data.status
                        }
                    })
                    isMounted && setDevices(temp);
                } catch (err) {
                    console.log(err)
                }
            }
            getAmount()

            return () => {
                isMounted = false;
                controller.abort();
            }
        },[devices])
    )

    useEffect(() => {
        console.log('f', isFocused)
        if (isFocused) {
            const getAmount = async () => {
                try {
                    let temp = devices
                    devices.forEach(async (device, index) => {
                        const res = await axiosPrivate.get(`devices/amount/${device.type}`, 
                        {
                            //signal: controller.signal,
                        })
                        if (res.data) {
                            temp[index].amount = res.data.amount
                            temp[index].enabled = res.data.status
                        }
                    })
                    console.log(temp)
                    setDevices(temp);
                } catch (err) {
                    console.log(err)
                }
            }
            getAmount()
        }
    }, [isFocused])*/
  return (
    <SafeAreaView className="flex-1 bg-lightblue relative px-[5%]">
        <Profile />
        <View className="h-[75%] w-[100%]">
            <ScrollView>
                <Weather></Weather>
                <View className="h-[50px] justify-center">
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
