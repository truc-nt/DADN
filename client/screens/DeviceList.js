import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import NavBar from '../components/NavBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useFocusEffect } from '@react-navigation/native';
import DeviceItem from '../components/DeviceItem';

import {useGetList} from '../hooks/useDevice' 

const DeviceList = ({ navigation, route }) => {
    const { type } = route.params;
    const list = useGetList(type)

    const name = {
        light: 'Đèn',
        fan: 'Quạt',
        siren: 'Chống trộm',
    };

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%] items-center">
            <View className="flex-row w-[80%] h-[12%] justify-between items-center self-start">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
                <Text
                    style={{ fontFamily: 'LexendSemiBold' }}
                    className="text-[30px] w-[75%] text-center"
                >
                    {name[type]}
                </Text>
            </View>
            <View className="h-[78%] w-[100%]">
                <ScrollView className="w-[100%]">
                    <View className="w-[100%] bg-semiblue rounded-[20px]">
                        {list.map((device, index) => (
                            <DeviceItem
                                key={index}
                                item={device}
                                border={index == list.length - 1 ? false : true}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
            <NavBar />
        </SafeAreaView>
    );
};

export default DeviceList;
