import { View, Text, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterSuccess = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className="flex-col w-[100%] h-[100%] bg-lightblue relative px-[5%] pb-[70px] items-center">
            <View className="flex-col w-[100%] h-[70%] items-center justify-between">
                <View className="flex-row w-[100%]">
                    <Text
                        style={{ fontFamily: 'LexendBold' }}
                        className="text-[22px] leading-[28.8px]"
                    >
                        Fiction Home
                    </Text>
                </View>
                <AntDesign name="checkcircleo" size={240} color="#5AC2DA" />
                <View className="flex-col w-[80%]">
                    <Text
                        style={{ fontFamily: 'LexendRegular' }}
                        className="text-[22px] text-center"
                    >
                        Đăng ký tài khoản thành công!
                    </Text>
                    <View className="flex-row w-[100%] items-center justify-center">
                        <Text
                            style={{ fontFamily: 'LexendRegular' }}
                            className="text-[22px]"
                        >
                            Đi đến{' '}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text
                                style={{ fontFamily: 'LexendSemiBold' }}
                                className="text-[22px] text-blue"
                            >
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterSuccess;
