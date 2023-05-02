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
import { useFocusEffect } from '@react-navigation/native';

import useTemp from '../hooks/useTemp';
import useHumid from '../hooks/useHumid';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import * as _Device from 'expo-device';
import * as Notifications from 'expo-notifications';

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

Notifications.setNotificationHandler({
    handleNotification: async () => {
        //console.log('help');
        //Alert.alert('cuu t');
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        };
    },
});

export default function Home({ navigation }) {
    const temp = useTemp();
    const humid = useHumid();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const axiosPrivate = useAxiosPrivate();

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

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

    useEffect(() => {
        registerForPushNotificationsAsync().then(async (token) => {
            setExpoPushToken(token);
            const res = await axiosPrivate.post(`/noti`, { token: token });
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

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
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
