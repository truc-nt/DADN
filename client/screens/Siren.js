import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeArrange from '../components/TimeArrange';
import NavBar from '../components/NavBar';
import React, { useState, useLayoutEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

const Siren = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const itemDetail = {
    'id': 0,
    'on': true,  
    'name': "Chống trộm",     
  }

  const [isEnabled, setIsEnabled] = useState(itemDetail.on)

  return (
    <SafeAreaView className="flex-1 bg-lightblue relative px-[5%] items-center">
      <View className="flex top-[4.5%] left-[5%] absolute">
          <TouchableOpacity
              onPress={() => navigation.goBack()}
          >
              <AntDesign name="left" size={35} color="black" />
          </TouchableOpacity>
      </View>
      <View className="flex-row w-[50%] h-[8%] justify-center mb-[5%]">
          <Text numberOfLines={1} style={{fontFamily: "LexendSemiBold"}} className="text-[30px]">{itemDetail.name}</Text>
      </View>
      <View className="h-[77%] w-[100%]">
        <ScrollView>
          <View className="flex-row w-[100%] h-[65px] bg-semiblue rounded-[20px] items-center justify-between px-[5%] mb-[25px]">
              <Text numberOfLines={1} style={{fontFamily: "LexendSemiBold"}} className="text-[22px]">Trạng thái</Text>
              <Switch
                  trackColor={{false: 'white', true: '#5AC2DA'}}
                  thumbColor={'#F4FAFF'}
                  onValueChange={() => {
                      setIsEnabled(previousState => !previousState);
                  }}
                  value={isEnabled}
                  className="ml-[auto]"
              />
          </View> 
          <TimeArrange />
        </ScrollView>
      </View>
      <NavBar />
    </SafeAreaView>
  )
}

export default Siren