import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import DeviceItemsList from '../components/DeviceItemsList';
import NavBar from '../components/NavBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useFocusEffect } from '@react-navigation/native';

const TypeList = ({ route }) => {
    const { type } = route.params;
    const [list, setList] = useState();
    const axiosPrivate = useAxiosPrivate();

    const name = {
        light: 'Đèn',
        fan: 'Quạt',
        siren: 'Chống trộm',
    };

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useFocusEffect(
      useCallback(() => {
          let isMounted = true;
          const controller = new AbortController();
          const getList = async (type) => {
              try {
                  const res = await axiosPrivate.get(`devices/${type}/all`, {
                      signal: controller.signal,
                  });

                  isMounted && setList(res.data);
              } catch (err) {
                  console.log(err);
              }
          };
          getList(type);

          return () => {
              isMounted = false;
              controller.abort();
          };
      }, [])
  );

    return (
        <SafeAreaView className="flex-1 bg-lightblue relative px-[5%] items-center">
            <View className="flex top-[58px] left-[5%] absolute">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <View className="flex-row w-[50%] h-[8%] justify-center mb-[5%]">
                <Text
                    style={{ fontFamily: 'LexendSemiBold' }}
                    className="text-[30px]"
                >
                    {name[type]}
                </Text>
            </View>
            <DeviceItemsList devicesList={list} />
            <NavBar />
        </SafeAreaView>
    );
};

export default TypeList;
