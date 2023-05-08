import { Text, View, ScrollView, Image } from 'react-native';
import Profile from '../components/Profile';
import Device from '../components/Device';
import NavBar from '../components/NavBar';
import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import useWeather from '../hooks/useWeather';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import * as _Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import {useGetDevices} from '../hooks/useDevice'

const Weather = ({ weather }) => {
    return (
        <View className="flex-row h-[120px] w-[100%] rounded-[20px] bg-blue items-center justify-between px-[5%]">
            <View className="flex-col">
                <Text
                    style={{ fontFamily: 'LexendMedium' }}
                    className={`text-[14px] leading-[21px]`}
                >
                    {weather?.text}
                </Text>
                <Text
                    style={{ fontFamily: 'LexendSemiBold' }}
                    className={`text-[25px]`}
                >
                    {weather?.temp}°C
                </Text>
                <Text
                    style={{ fontFamily: 'LexendRegular' }}
                    className={`text-[12px] leading-[21px]`}
                >
                    Độ ẩm {weather?.humid}%
                </Text>
            </View>
            <View>
                <Image
                    source={{uri :`https:${weather?.image}`}}
                    className="w-[100px] h-[100px]"
                />
            </View>
        </View>
    );
};

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        };
    },
});

export default function Home() {
    const weather = useWeather();

    const axiosPrivate = useAxiosPrivate();

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [devices, _] = useGetDevices()

    useEffect(() => {
        registerForPushNotificationsAsync().then(async (token) => {
            setExpoPushToken(token);
            await axiosPrivate.post(`/noti`, { token: token });
        });

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, [notification]);


    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%]">
            <Profile />
            <View className="h-[75%] w-[100%]">
                <ScrollView>
                    <Weather weather={weather}></Weather>
                    <View className="h-[50px] justify-center">
                        <Text
                            style={{ fontFamily: 'LexendRegular' }}
                            className={`text-[18px] leading-[27px]`}
                        >
                            Các thiết bị
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

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            //importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });

        await Notifications.setNotificationChannelAsync('alert', {
            name: 'alert',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: 'Tornado_Siren_II-Delilah-747233690.mp3',
        });
    }

    if (_Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (
            await Notifications.getExpoPushTokenAsync({
                projectId: '5c0e6007-62fc-4d44-88bc-50909f8fd193',
            })
        ).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}
