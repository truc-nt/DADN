import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const Login = () => {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative">
            <View className="flex-row px-[7%] mt-[2%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[24px] leading-[28.8px]">Fiction Home</Text>
            </View>
            <View className="flex-row mt-[13%] items-center justify-center px-[20%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[32px] leading-[28.8px] text-center">Home of your imagination</Text>
            </View>
            <View className="flex-row items-center justify-center px-[25%]">
                <Text style={{fontFamily: "LexendExtraLight"}} className="text-[16px] leading-[16px]">Manage your home anywhere, anytime</Text>
            </View>
            <View className="flex-col mx-[7%] bg-semiblue mt-[8%] rounded-[20px]">
                <View className="flex-col mx-[5%] py-[5%] border-b-[1px]">
                    <Text style={{fontFamily: "LexendRegular"}} className="text-[20px] leading-[21px]">Tên đăng nhập:</Text>
                    <TextInput
                        onChangeText={(value) => setUser(value)}
                        value={user}
                        placeholder={"Tên đăng nhập của bạn"}
                        style={{fontFamily: "LexendRegular"}}
                        className="text-[18px] leading-[19px] mt-[2%]"
                    />
                </View>
                <View className="flex-col px-[5%] py-[5%]">
                    <Text style={{fontFamily: "LexendRegular"}} className="text-[20px] leading-[21px]">Mật khẩu:</Text>
                    <TextInput
                        onChangeText={(value) => setPwd(value)}
                        secureTextEntry={true}
                        value={pwd}
                        placeholder={"Mật khẩu của bạn"}
                        style={{fontFamily: "LexendRegular"}}
                        className="text-[18px] leading-[19px] mt-[2%]"
                    />
                </View>    
            </View> 
            <View className="flex-row justify-center">
                <TouchableOpacity className="rounded-[50px] bg-black items-center justify-center w-[141px] h-[49px] mt-[10%]" 
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] leading-[30px] text-white text-center">Log in</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-[16%]">
                <Text style={{fontFamily: "LexendExtraLight"}} className="text-[16px] leading-[16px]">Chưa có tài khoản? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[16px] leading-[16px] text-blue text-center">Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-col mx-[7%] bottom-[10%] absolute">
                <TouchableOpacity
                    onPress={() => navigation.navigate("OnBoard")}
                >
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login