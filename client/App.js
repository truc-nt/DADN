import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider from './context/AuthProvider';
import Home from './screens/Home';
import Login from './screens/Login';
import OnBoard from './screens/OnBoard';
import Register from './screens/Register';
import Setting from './screens/Setting';
import { useFonts, loadAsync } from 'expo-font';

import useAuth from './hooks/useAuth';
import DeviceList from './screens/DeviceList';
import DeviceDetail from './screens/DeviceDetail';

import React, { useEffect } from 'react';
const Stack = createNativeStackNavigator();

export default function App() {
    const [loaded] = useFonts({
        LexendExtraLight: require('./assets/font/static/Lexend-ExtraLight.ttf'),
        LexendRegular: require('./assets/font/static/Lexend-Regular.ttf'),
        LexendSemiBold: require('./assets/font/static/Lexend-SemiBold.ttf'),
        LexendBold: require('./assets/font/static/Lexend-Bold.ttf'),
        LexendMedium: require('./assets/font/static/Lexend-Medium.ttf'),
    });

    useEffect(() => {
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
                    <Stack.Screen name="DeviceList" component={DeviceList} />
                    <Stack.Screen
                        name="DeviceDetail"
                        component={DeviceDetail}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};