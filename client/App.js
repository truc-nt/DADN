import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider from './context/AuthProvider';
import Home from './screens/Home';
import Login from './screens/Login';
import OnBoard from './screens/OnBoard';
import Register from './screens/Register';
import Setting from './screens/Setting';
import Light from './screens/Light';
import Fan from './screens/Fan';
import Siren from './screens/Siren';
import LightItemDetail from './screens/LightItemDetail';
import FanItemDetail from './screens/FanItemDetail';
import { useFonts, loadAsync } from 'expo-font';

import useAuth from './hooks/useAuth';

import TypeList from './screens/TypeList';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    const [loaded] = useFonts({
        LexendExtraLight: require('./assets/font/static/Lexend-ExtraLight.ttf'),
        LexendRegular: require('./assets/font/static/Lexend-Regular.ttf'),
        LexendSemiBold: require('./assets/font/static/Lexend-SemiBold.ttf'),
        LexendBold: require('./assets/font/static/Lexend-Bold.ttf'),
        LexendMedium: require('./assets/font/static/Lexend-Medium.ttf'),
    });

    //if (!fontLoaded) return null

    /*const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()*/

    useEffect(() => {
        /*registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
      console.log("hello")
    })

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification, "hello")
    })*/
        const subscription = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log(notification);
                // Xử lý push notification ở đây
            }
        );

        async function loadFonts() {
            await loadAsync({
                LexendExtraLight: require('./assets/font/static/Lexend-ExtraLight.ttf'),
                LexendRegular: require('./assets/font/static/Lexend-Regular.ttf'),
                LexendSemiBold: require('./assets/font/static/Lexend-SemiBold.ttf'),
                LexendBold: require('./assets/font/static/Lexend-Bold.ttf'),
                LexendMedium: require('./assets/font/static/Lexend-Medium.ttf'),
            });
        }
        loadFonts();
        return () => {
            //Notifications.removeNotificationSubscription(notificationListener.current)
            //Notifications.removeNotificationSubscription(responseListener.current)
            subscription.remove();
        };
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <MainNavigation></MainNavigation>
            </NavigationContainer>
        </AuthProvider>
        /*<View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <Button
        title="Press to cancle a notification"
        onPress={async () => {
          await Notifications.cancelAllScheduledNotificationsAsync()
        }}
      />
    </View>*/
    );
}

const MainNavigation = () => {
    const { auth } = useAuth();
    return (
        <Stack.Navigator>
            {!auth?.username ? (
                <>
                    <Stack.Screen name="OnBoard" component={OnBoard} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Setting" component={Setting} />
                    <Stack.Screen name="TypeList" component={TypeList} />
                    <Stack.Screen name="Light" component={Light} />
                    <Stack.Screen name="Fan" component={Fan} />
                    <Stack.Screen name="Siren" component={Siren} />
                    <Stack.Screen
                        name="LightItemDetail"
                        component={LightItemDetail}
                    />
                    <Stack.Screen
                        name="FanItemDetail"
                        component={FanItemDetail}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

/*async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { 
      hour: 11,
      minute: 40,
      repeats: true,
    },
  });
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

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    //alert('Must use physical device for Push Notifications');
  }

  return token;
}*/
