import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnBoard = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[8%] items-center">
            <View className="flex-row h-[7%] w-[100%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[24px] leading-[28.8px]">Fiction Home</Text>
            </View>
            <View className="flex-row w-[70%] justify-center h-[10%]">
                <Text style={{fontFamily: "LexendBold"}}  className="text-[32px] leading-[28.8px] text-center ">Home of your imagination</Text>
            </View>
            <View className="flex-row w-[60%] justify-center h-[7%]">
                <Text style={{fontFamily: "LexendExtraLight"}}  className="text-[16px] leading-[16px] text-center">Manage your home anywhere, anytime</Text>
            </View>
            <View className="flex-row justify-center h-[60%] w-[100%]">
                <Image 
                    source={require('../assets/image/Home.png')}
                    className="w-[100%] h-[100%]  rounded-t-[180px] rounded-b-[90px]"
                />
            </View>
            <View className="flex-row items-center justify-between h-[16%] w-[90%]">
                <TouchableOpacity className="rounded-[50px] bg-black items-center justify-center w-[141px] h-[49px]" 
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] leading-[30px] text-white text-center">Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity className="rounded-[50px] bg-white items-center justify-center border-[3px] w-[141px] h-[49px]"
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] leading-[30px] text-black">Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OnBoard