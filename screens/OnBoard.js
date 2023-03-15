import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnBoard = () => {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative">
            <View className="flex-row px-[7%] mt-[2%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[24px] leading-[28.8px]">Fiction Home</Text>
            </View>
            <View className="flex-row mt-[4%] items-center justify-center px-[20%]">
                <Text style={{fontFamily: "LexendBold"}}  className="text-[32px] leading-[28.8px] text-center">Home of your imagination</Text>
            </View>
            <View className="flex-row items-center justify-center px-[25%]">
                <Text style={{fontFamily: "LexendExtraLight"}}  className="text-[16px] leading-[16px]">Manage your home anywhere, anytime</Text>
            </View>
            <View className="flex-row items-center justify-center mt-[3%] px-[7%]">
                <Image 
                    source={require('../assets/image/home.png')}
                    className=" object-cover"
                />
            </View>
            <View className="flex-row items-center justify-between mt-[4%] px-[13%]">
                <TouchableOpacity className="rounded-[50px] bg-black items-center justify-center w-[141px] h-[49px]" 
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] leading-[30px] text-white text-center">Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity className="rounded-[50px] bg-white items-center justify-center border-[3px] w-[141px] h-[49px]"
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] leading-[30px] text-black">Regiter</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OnBoard