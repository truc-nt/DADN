import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth'
import Input from '../components/Input';
import axios from '../api/axios'
import {login} from '../screens/Login'

const register = async (setAuth, username, password, repwd, APIKey) => {
    try {
        const res = await axios.post('/register', 
            JSON.stringify({username, password, repwd, APIKey}), 
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
        console.log('register')
        if (res.data.success) {
            login(setAuth, username, password)
        }
    } catch (err) {
        console.log(err)
    }
}
const Register = ({navigation}) => {
    const {auth, setAuth} = useAuth()
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
        <SafeAreaView className="flex-1 bg-lightblue relative px-[8%] items-center">
            <View className="flex-row h-[7%] w-[100%]">
                <Text style={{fontFamily: "LexendBold"}} className="text-[24px] leading-[28.8px]">Fiction Home</Text>
            </View>
            <View className="flex-row w-[70%] justify-center h-[10%]">
                <Text style={{fontFamily: "LexendBold"}}  className="text-[32px] leading-[28.8px] text-center ">Home of your imagination</Text>
            </View>
            <View className="flex-row w-[60%] justify-center h-[9%]">
                <Text style={{fontFamily: "LexendExtraLight"}}  className="text-[16px] leading-[16px] text-center">Manage your home anywhere, anytime</Text>
            </View>
            <View className="h-[41%] w-[100%]">
                <ScrollView className="w-[100%] bg-semiblue rounded-[20px]">
                    <Input
                        label={"Tên đăng nhập:"}
                        handleChange={(value) => setUser(value)}
                        value={user}
                        placeholder={"Tên đăng nhập của bạn"}
                        secureTextEntry={false}
                        border={true}
                    />
                    <Input
                        label={"Mật khẩu:"}
                        handleChange={(value) => setPwd(value)}
                        secureTextEntry={true}
                        value={pwd}
                        placeholder={"Mật khẩu của bạn"}
                        border={true}
                    />
                    <Input
                        label={"Nhập lại mật khẩu:"}
                        handleChange={(value) => setRepwd(value)}
                        secureTextEntry={true}
                        value={repwd}
                        placeholder={"Xác minh lại mật khẩu"}
                        border={true}
                    />
                    <Input
                        label={"Mã API (Adafruit Server):"}
                        handleChange={(value) => setAPIKey(value)}
                        value={APIKey}
                        placeholder={"Nhập mã API của bạn"}
                        secureTextEntry={false}
                        border={false}
                    />  
                </ScrollView> 
            </View>
            <View className="flex-row justify-center h-[17%] items-center ">
                <TouchableOpacity className="rounded-[50px] bg-white items-center justify-center border-[3px] w-[141px] h-[49px]"
                    onPress={() => register(setAuth, user, pwd, repwd, APIKey)}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] leading-[30px] text-black">Register</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center h-[16%] items-center ">
                <Text style={{fontFamily: "LexendExtraLight"}} className="text-[16px] leading-[16px]">Đã có tài khoản? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={{fontFamily: "LexendSemiBold"}} className="text-[16px] leading-[16px] text-blue text-center">Đăng nhập</Text>
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

export default Register