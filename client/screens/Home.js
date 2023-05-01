import { Text, View, ScrollView, Image } from 'react-native';
import Profile from '../components/Profile';
import Device from '../components/Device';
import NavBar from '../components/NavBar';
import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import useTemp from '../hooks/useTemp';
import useHumid from '../hooks/useHumid';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Weather = ({ humid, temp }) => {
    return (
        <View className="flex-row h-[120px] w-[100%] rounded-[20px] bg-blue items-center justify-between px-[5%]">
            <View className="flex-col">
                <Text
                    style={{ fontFamily: 'LexendMedium' }}
                    className={`text-[14px] leading-[21px]`}
                >
                    Trời nhiều mây
                </Text>
                <Text
                    style={{ fontFamily: 'LexendSemiBold' }}
                    className={`text-[25px]`}
                >
                    {temp}°C
                </Text>
                <Text
                    style={{ fontFamily: 'LexendRegular' }}
                    className={`text-[12px] leading-[21px]`}
                >
                    Độ ẩm {humid}%
                </Text>
            </View>
            <View>
                <Image
                    source={require('../assets/image/SunnyWeather.png')}
                    className="w-[90px] h-[80px]"
                />
            </View>
        </View>
    );
};

export default function Home({ navigation }) {
    const temp = useTemp();
    const humid = useHumid();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const axiosPrivate = useAxiosPrivate();
    const [devices, setDevices] = useState([
        {
            icon: 'lightbulb-outline',
            name: 'Đèn',
            type: 'light',
        },
        {
            icon: 'fan',
            name: 'Quạt',
            type: 'fan',
        },
        {
            icon: 'bell-alert-outline',
            name: 'Chống trộm',
            type: 'siren',
        },
    ]);

    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();
            const getAmount = async () => {
                try {
                    const res = await axiosPrivate.get(`devices/amount`, {
                        signal: controller.signal,
                    });
                    let newDevices = [...devices];
                    newDevices.forEach((device) => {
                        device['amount'] = res.data[device.type]['amount'];
                        device['enabled'] = res.data[device.type]['enabled'];
                    });
                    setDevices(newDevices);
                } catch (err) {
                    console.log(err);
                }
            };
            getAmount();

            return () => {
                controller.abort();
            };
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%]">
            <Profile />
            <View className="h-[75%] w-[100%]">
                <ScrollView>
                    <Weather humid={humid} temp={temp}></Weather>
                    <View className="h-[50px] justify-center">
                        <Text
                            style={{ fontFamily: 'LexendRegular' }}
                            className={`text-[18px] leading-[27px]`}
                        >
                            Các thiết bị kết nối
                        </Text>
                    </View>
                    <View className="flex-row flex-wrap justify-between w-[100%]">
                        {devices.map((device, index) => (
                            <Device key={index} props={device}></Device>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <NavBar home />
        </SafeAreaView>
    );
}
