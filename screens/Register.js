import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const Register = () => {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [])

    const [user, setUser] = useState("")
    const [pwd, setPwd] = useState("")
    const [repwd, setRepwd] = useState("")
    const [APIKey, setAPIKey] = useState("")

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative">
            <View className="flex-row px-[7%] mt-[2%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[24px] leading-[28.8px]">Fiction Home</Text>
            </View>
            <View className="flex-row mt-[5%] items-center justify-center px-[20%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[32px] leading-[28.8px] text-center">Home of your imagination</Text>
            </View>
            <View className="flex-row items-center justify-center px-[25%]">
                <Text style={{fontFamily: "LexendExtraLight"}} className="text-[16px] leading-[16px]">Manage your home anywhere, anytime</Text>
            </View>
            <View className="flex-col mx-[7%] bg-semiblue mt-[3%] rounded-[20px]">
                <View className="flex-col mx-[5%] py-[4%] border-b-[1px]">
                    <Text style={{fontFamily: "LexendRegular"}} className="text-[20px] leading-[21px]">Tên đăng nhập:</Text>
                    <TextInput
                        onChangeText={(value) => setUser(value)}
                        value={user}
                        placeholder={"Tên đăng nhập của bạn"}
                        style={{fontFamily: "LexendRegular"}}
                        className="text-[18px] leading-[19px] mt-[2%]"
                    />
                </View>
                <View className="flex-col mx-[5%] py-[4%] border-b-[1px]">
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
                <View className="flex-col mx-[5%] py-[4%] border-b-[1px]">
                    <Text style={{fontFamily: "LexendRegular"}} className="text-[20px] leading-[21px]">Nhập lại mật khẩu:</Text>
                    <TextInput
                        onChangeText={(value) => setRepwd(value)}
                        secureTextEntry={true}
                        value={repwd}
                        placeholder={"Xác minh lại mật khẩu"}
                        style={{fontFamily: "LexendRegular"}}
                        className="text-[18px] leading-[19px] mt-[2%]"
                    />
                </View>
                <View className="flex-col mx-[5%] py-[4%]">
                    <Text style={{fontFamily: "LexendRegular"}} className="text-[20px] leading-[21px]">Mã API (Adafruit Server):</Text>
                    <TextInput
                        onChangeText={(value) => setAPIKey(value)}
                        value={APIKey}
                        placeholder={"Nhập mã API của bạn"}
                        style={{fontFamily: "LexendRegular"}}
                        className="text-[18px] leading-[19px] mt-[2%]"
                    />
                </View>    
            </View> 
            <View className="flex-row justify-center mt-[3%]">
                <TouchableOpacity className="rounded-[50px] bg-white items-center justify-center border-[3px] w-[141px] h-[49px]"
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] leading-[30px] text-black">Regiter</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-[10%]">
                <Text style={{fontFamily: "LexendExtraLight"}} className="text-[16px] leading-[16px]">Đã có tài khoản? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[16px] leading-[16px] text-blue text-center">Đăng nhập</Text>
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

export default Register