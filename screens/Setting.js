import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import Profile from '../components/Profile'
import NavBar from '../components/NavBar'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextChangeModal from '../components/TextChangeModal';

const PasswordchangeModal = (props) => {
    const [oldPw, setOldPw] = useState("")
    const [newPw, setNewPw] = useState("")

    return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={props.visible}
          onRequestClose={() => {
              props.setModalPw(false)
              setNewPw("")
              setOldPw("")
          }}
      >
          <View className="flex-1 p-[5%] bg-black/[.5] justify-center">
              <View className="p-[5%] bg-white">
                  <Text style={{fontFamily: "LexendExtraLight"}} className="text-[17px]">Mật khẩu cũ</Text>
                  <TextInput 
                      value = {oldPw}
                      onChangeText = {(value) => setOldPw(value)}
                      style={{fontFamily: "LexendRegular"}}
                      className="text-[22px] mt-[10px] border-b-[1px] h-[50px]"
                      autoFocus={true}
                  />
                  <Text style={{fontFamily: "LexendExtraLight"}} className="text-[17px] mt-[20px]">Mật khẩu mới</Text>
                  <TextInput 
                      value = {newPw}
                      onChangeText = {(value) => setNewPw(value)}
                      style={{fontFamily: "LexendRegular"}}
                      className="text-[22px] mt-[10px] border-b-[1px] h-[50px]"
                  />
                  <TouchableOpacity className="items-center mt-[20px] ml-[auto]">
                      <Text style={{fontFamily: "LexendSemiBold"}} className="text-[20px] text-blue"
                          onPress={() => {
                              props.setModalPw(false)
                              props.setPassword(newPw)
                              setNewPw("")
                              setOldPw("")
                          }}
                      >Lưu</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
    )
}


const Setting = ({navigation}) => {

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
    }, [])

    const user = {
        username: "Fic Human",
        password: "toilanguoi"
    }

    const [username, setUsername] = useState(user.username)
    const [password, setPassword] = useState(user.password)
    const [modalName, setModalName] = useState(false)
    const [modalPw, setModalPw] = useState(false)

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%]">
            <Profile />
            <View className="w-[100%] h-[75%]">
                <ScrollView>
                    <View className="flex-col w-[100%] bg-semiblue rounded-[20px] items-center px-[5%] my-[30px]">
                        <View className="flex-col w-[100%] border-b-[1px] py-[10px]">
                            <Text numberOfLines={1} style={{fontFamily: "LexendRegular"}} className="text-[19px]">Tên người dùng</Text>
                            <View className="flex-row justify-between items-center my-[5px]">
                                <Text numberOfLines={1} style={{fontFamily: "LexendRegular"}} className="w-[80%] text-[17px] text-grey">{username}</Text>
                                <TouchableOpacity
                                    onPress={()=>setModalName(true)}
                                >
                                    <Ionicons name="pencil" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex-col w-[100%] border-b-[1px] py-[10px]">
                            <Text numberOfLines={1} style={{fontFamily: "LexendRegular"}} className="text-[19px]">Mật khẩu</Text>
                            <View className="flex-row justify-between items-center my-[5px]">
                                <Text numberOfLines={1} style={{fontFamily: "LexendRegular"}} className="w-[80%] text-[17px] text-grey">{"*".repeat(password.length)}</Text>
                                <TouchableOpacity
                                    onPress={()=>setModalPw(true)}
                                >
                                    <Ionicons name="pencil" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity 
                            className="flex-row w-[100%] h-[80px] border-b-[1px] py-[10px] justify-between items-center"
                            onPress={() => navigation.navigate('Setting')}
                        >
                            <Text numberOfLines={1} style={{fontFamily: "LexendRegular"}} className="text-[19px]">Liên hệ</Text>
                            <AntDesign name="right" size={28} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            className="flex-row w-[100%] h-[80px] py-[10px] justify-between items-center"
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text numberOfLines={1} style={{fontFamily: "LexendRegular"}} className="text-[19px] text-blue">Đăng xuất</Text>
                            <AntDesign name="logout" size={28} color="#5AC2DA" />
                        </TouchableOpacity>
                        <TextChangeModal 
                            visible={modalName}
                            setModal={setModalName}
                            setText={setUsername}
                            text={username}
                            label="Đổi tên đăng nhập"
                        />
                        <PasswordchangeModal 
                            visible={modalPw}
                            setModalPw={setModalPw}
                            setPassword={setPassword}
                        />
                    </View>
                </ScrollView>
            </View> 
            <NavBar setting/>
        </SafeAreaView>
    );
}

export default Setting