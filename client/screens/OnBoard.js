import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnBoard = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className="flex-col h-[100%] w-[100%] bg-lightblue relative px-[8%] pt-[10px] pb-[50px] items-center justify-between">
            <View className="flex-row w-[100%]">
                <Text
                    style={{ fontFamily: 'LexendBold' }}
                    className="text-[22px] leading-[28.8px]"
                >
                    Fiction Home
                </Text>
            </View>
            <View className="flex-col w-[80%] justify-center">
                <Text
                    style={{ fontFamily: 'LexendBold' }}
                    className="text-[30px] leading-[28.8px] text-center "
                >
                    Home of your imagination
                </Text>
                <Text
                    style={{ fontFamily: 'LexendExtraLight' }}
                    className="text-[16px] leading-[16px] text-center"
                >
                    Manage your home anywhere, anytime
                </Text>
            </View>
            <View className="flex-row justify-center h-[60%] w-[100%]">
                <Image
                    source={require('../assets/image/Home.png')}
                    className="w-[100%] h-[100%]  rounded-t-[180px] rounded-b-[90px]"
                />
            </View>
            <View className="flex-row justify-between w-[90%]">
                <TouchableOpacity
                    className="rounded-[50px] bg-black w-[141px] h-[49px] justify-center"
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text
                        style={{ fontFamily: 'LexendSemiBold' }}
                        className="text-[20px] text-white text-center"
                    >
                        Log in
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="rounded-[50px] bg-white border-[3px] w-[141px] h-[49px] justify-center"
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text
                        style={{ fontFamily: 'LexendSemiBold' }}
                        className="text-[20px] text-center text-black"
                    >
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OnBoard;
