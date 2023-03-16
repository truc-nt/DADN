import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Input from '../components/Input';

const Login = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[8%] items-center" >
            <View className="flex-row h-[17%] w-[100%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[24px] leading-[28.8px]">Fiction Home</Text>
            </View>
            <View className="flex-row w-[70%] justify-center h-[10%]">
                <Text style={{fontFamily: "LexendBold"}}  className="text-[32px] leading-[28.8px] text-center ">Home of your imagination</Text>
            </View>
            <View className="flex-row w-[60%] justify-center h-[11%]">
                <Text style={{fontFamily: "LexendExtraLight"}}  className="text-[16px] leading-[16px] text-center">Manage your home anywhere, anytime</Text>
            </View>
            <View className="h-[26%] w-[100%]">
                <ScrollView className="w-[100%] bg-semiblue rounded-[20px]">
                    <Input
                        handleChange={(value) => setUser(value)}
                        value={user}
                        placeholder={"Tên đăng nhập của bạn"}
                        className="text-[18px] leading-[19px] mt-[2%]"
                        border={true}
                        label={"Tên đăng nhập:"}
                    />
                    <Input
                        handleChange={(value) => setPwd(value)}
                        secureTextEntry={true}
                        value={pwd}
                        placeholder={"Mật khẩu của bạn"}
                        border={false}
                        label={"Mật khẩu:"}
                    />   
                </ScrollView> 
            </View>
            <View className="flex-row justify-center h-[20%] items-center">
                <TouchableOpacity className="rounded-[50px] bg-black items-center justify-center w-[141px] h-[49px] mt-[10%]" 
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] leading-[30px] text-white text-center">Log in</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center h-[16%] items-center">
                <Text style={{fontFamily: "LexendExtraLight"}} className="text-[16px] leading-[16px]">Chưa có tài khoản? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[16px] leading-[16px] text-blue text-center">Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-col bottom-[6%] absolute left-[8%]">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login